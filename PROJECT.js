import * as THREE from 'three'
import { OrbitControls }   from 'three/examples/jsm/controls/OrbitControls'
import { DragControls }    from 'three/examples/jsm/controls/DragControls'
import { GLTFLoader }      from 'three/examples/jsm/loaders/GLTFLoader'
import { EffectComposer }  from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass }      from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { ShaderPass }      from 'three/examples/jsm/postprocessing/ShaderPass'
import { CopyShader }      from 'three/examples/jsm/shaders/CopyShader'
import GUI                 from 'lil-gui'

/* ----- Renderer ----- */

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled   = true
renderer.shadowMap.type      = THREE.PCFSoftShadowMap
renderer.outputColorSpace    = THREE.SRGBColorSpace
renderer.toneMapping         = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.0
document.body.style.margin   = '0'
document.body.style.overflow = 'hidden'
document.body.appendChild(renderer.domElement)

const scene  = new THREE.Scene()
scene.background = new THREE.Color(0x000000)

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 100)
camera.position.set(-0.4, 0.6, 3.8)

const canvas = renderer.domElement

/* ----- Lights and BloomPass ----- */

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

// positions are updated at load time to match the iMac center and lava lamp positions, respectively
const aquaLight = new THREE.PointLight(0x00d4ff, 10, 2) // blue to match imac 
aquaLight.castShadow = true
aquaLight.shadow.mapSize.set(512, 512)
scene.add(aquaLight)

const lavaLampLight = new THREE.PointLight(0xe66100, 10, 3) // warm orange
lavaLampLight.castShadow = true
lavaLampLight.shadow.mapSize.set(512, 512)
scene.add(lavaLampLight)

// Base intensity used by the flicker effect
let aquaBaseIntensity = 10
let aquaLightOn       = true   // toggled by clicking the mouse object

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight), 0.5, 0.4, 0.1
)

function toggleAquaLight() {
  aquaLightOn = !aquaLightOn
  aquaLight.intensity = aquaLightOn ? aquaBaseIntensity : 0
  bloomPass.enabled   = aquaLightOn
}

/* ---- Fish state management ---- */
// Each fish has its own independent state: position, direction, ellipse angle,
// animation mixer and click target
// noseOffsetY corrects the model-specific mismatch between the mesh's local
// forward axis and the swimming direction: clown fish (Math.PI / 2), blue fish (0)

function makeFishState(group, noseOffsetY = Math.PI / 2) {
  return {
    group,
    mixer:       null,
    sound:       null,
    pos:         new THREE.Vector3(),
    dir:         new THREE.Vector3(1, 0, 0),
    angle:       0,          // current angle along the ellipse
    active:      false,
    clickTarget: null,       // world-space target set by screen click
    pauseUntil:  0,          // clock time when the pause at target ends
    pausedDir:   new THREE.Vector3(),
    noseOffsetY,
  }
}

const fishStates = {}   // populated in loadModel(): { clown, blue }
let activeFish = null 

/* ---- Fish rotation constants ---- */
// Fish exported from Blender carry a native +90° rotation on the X axis
// We compose this with the yaw quaternion each frame so the fish always
// stays upright while turning horizontally

const Q_NATIVE = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2)
const Q_YAW    = new THREE.Quaternion()
const WORLD_Y  = new THREE.Vector3(0, 1, 0)

/* ------------ */

const tank = {
  radiusX: 0.16, radiusZ: 0.16, speed: 0.5,
  centerX: 0.0,  centerY: 0.0,  centerZ: 0.0,
}

const ARRIVE_DIST   = 0.03   // arrival threshold 
const TURN_SPEED    = 4.0    // angular interpolation speed (approx rad/s)
let   pauseDuration = 2.5    // seconds the fish pauses at click target

const raycaster  = new THREE.Raycaster()
const pointer    = new THREE.Vector2()

let imacMesh      = null
let keyboardMesh  = null
let mouseMesh     = null   
let glassMesh     = null
let shellMesh     = null

const cds            = {}   
const cdOrigins      = {}   // initial positions saved at load time
const cdOriginQuats  = {}   // initial quaternions saved at load time


/* ----- Audio ----- */

const audioListener = new THREE.AudioListener()
camera.add(audioListener)

function loadAudio(key, url) {
  const sound = new THREE.Audio(audioListener)
  new THREE.AudioLoader().load(
    url,
    buffer => { sound.setBuffer(buffer); sound.setLoop(true); },
    undefined,
    err => console.warn('Audio load failed:', err)
  )
  return sound
}

/* ----- Utility functions ----- */

function toNDC(e) { // Convert screen-space mouse coordinates to Normalized Device Coordinates for raycasting
  pointer.x =  (e.clientX / window.innerWidth)  * 2 - 1
  pointer.y = -(e.clientY / window.innerHeight)  * 2 + 1
}

function visibleCDs() {
  return Object.values(cds).filter(c => c?.visible)
}

/* ----- Event listeners ----- */

canvas.addEventListener('mousedown', e => {
  toNDC(e)
  raycaster.setFromCamera(pointer, camera)

  // Eject fish by clicking the keyboard keys
  if (keyboardMesh && activeFish) {
    if (raycaster.intersectObject(keyboardMesh, false).length > 0) {
      ejectFish(activeFish)
      return
    }
  }

  // Toggle aquarium light by clicking the mouse object
  if (mouseMesh) {
    if (raycaster.intersectObject(mouseMesh, false).length > 0) {
      toggleAquaLight()
      return
    }
  }

  // Direct the active fish toward a screen click
  if (activeFish) {
    const screenHits = raycaster.intersectObjects([glassMesh, shellMesh])
    if (screenHits.length > 0) {
      const p  = screenHits[0].point
      const fs = fishStates[activeFish]
      fs.clickTarget = new THREE.Vector3(
        THREE.MathUtils.clamp(p.x, tank.centerX - tank.radiusX, tank.centerX + tank.radiusX),
        tank.centerY,
        THREE.MathUtils.clamp(p.z, tank.centerZ - tank.radiusZ, tank.centerZ + tank.radiusZ)
      )
      fs.pauseUntil = 0
    }
  }
})

canvas.addEventListener('mousemove', e => {
  toNDC(e)
})

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

/* ----- Fish insertion/ejection and CD reset ----- */

function insertFish(key) {
  if (activeFish && activeFish !== key) ejectFish(activeFish)
  const fs = fishStates[key]
  if (!fs) return

  cds[key].visible = false

  // reset swim state
  fs.active = true; fs.angle = 0; fs.clickTarget = null; fs.pauseUntil = 0
  fs.pos.set(tank.centerX + tank.radiusX, tank.centerY, tank.centerZ)
  fs.dir.set(1, 0, 0)
  fs.group.position.copy(fs.pos)
  fs.group.visible = true

  if (fs.sound && !fs.sound.isPlaying) fs.sound.play()

  activeFish = key
}

function ejectFish(key) {
  const fs = fishStates[key]
  if (!fs) return

  fs.active = false; fs.clickTarget = null; fs.pauseUntil = 0
  fs.group.visible = false

  if (fs.sound && fs.sound.isPlaying) fs.sound.stop()
  resetCD(key)
  if (activeFish === key) activeFish = null
}

function resetCD(key) {
  const cd = cds[key]
  if (!cd) return
  cd.position.copy(cdOrigins[key])
  cd.quaternion.copy(cdOriginQuats[key])
  cd.visible = true
}

/* ----- Fish movement ----- */

function updateFish(fs, delta, t) {
  if (!fs.active || !fs.group) return

  let desiredDir = new THREE.Vector3()

  // swim toward click target
  if (fs.clickTarget && fs.pauseUntil <= t) {
    const toTarget = new THREE.Vector3().subVectors(fs.clickTarget, fs.pos)
    if (Math.hypot(toTarget.x, toTarget.z) < ARRIVE_DIST) {
      fs.pausedDir.copy(fs.dir)
      fs.pauseUntil  = t + pauseDuration
      fs.clickTarget = null
    } else {
      desiredDir.set(toTarget.x, 0, toTarget.z).normalize()
      fs.pos.addScaledVector(desiredDir, tank.speed * 0.35 * delta)
    }
  }

  // pause at target
  if (fs.pauseUntil > t) {
    desiredDir.copy(fs.pausedDir)
  } else if (fs.pauseUntil > 0) {
    // pause ended, re-sync ellipse angle to current position
    fs.angle      = Math.atan2(fs.pos.z - tank.centerZ, fs.pos.x - tank.centerX)
    fs.pauseUntil = 0
  }

  // free elliptical swim
  if (!fs.clickTarget && fs.pauseUntil <= t) {
    fs.angle += tank.speed * delta
    fs.pos.set(
      tank.centerX + Math.cos(fs.angle) * tank.radiusX,
      tank.centerY + Math.sin(fs.angle * 1.8) * 0.025,   // gentle vertical wobble
      tank.centerZ + Math.sin(fs.angle) * tank.radiusZ
    )
    desiredDir.set(
      -Math.sin(fs.angle) * tank.radiusX, 0,
       Math.cos(fs.angle) * tank.radiusZ
    ).normalize()
  }

  fs.group.position.copy(fs.pos)

  // Smoothly interpolate direction, then compose quaternions: yaw(world Y) * nativeRotation(X+90°)
  if (desiredDir.lengthSq() > 0.001) {
    fs.dir.lerp(desiredDir, Math.min(1, TURN_SPEED * delta)).normalize()
    Q_YAW.setFromAxisAngle(WORLD_Y, Math.atan2(fs.dir.x, fs.dir.z) + fs.noseOffsetY)
    fs.group.quaternion.multiplyQuaternions(Q_YAW, Q_NATIVE)
  }
}

/* ----- Material setup ----- */

function setupShadowsAndMaterials(root) {
  root.traverse(obj => {
    if (!obj.isMesh) return
    obj.castShadow    = true
    obj.receiveShadow = true

    const mat = obj.material
    if (!mat) return
    const n = (obj.name + mat.name).toLowerCase()

    if (n.includes('imac') || n.includes('flowerpot') || n.includes('plant')) {
      mat.transparent = true
      mat.alphaTest   = 0.1
      mat.side        = THREE.DoubleSide
      mat.depthWrite  = true
    }
  })
}

/* ----- Model loading ----- */

function loadModel() {
  return new GLTFLoader().loadAsync('/assets/models/aquarium/aquarium.gltf').then(gltf => {
    const root = gltf.scene
    setupShadowsAndMaterials(root)

    // Center the scene at the world origin
    const box    = new THREE.Box3().setFromObject(root)
    const center = box.getCenter(new THREE.Vector3())
    root.position.sub(center)

    // Derive tank swim bounds from the "water" mesh
    const waterMesh = root.getObjectByName('water')
    if (waterMesh) {
      const wb = new THREE.Box3().setFromObject(waterMesh)
      const wc = wb.getCenter(new THREE.Vector3())
      const ws = wb.getSize(new THREE.Vector3())
      tank.centerX = wc.x; tank.centerY = wc.y; tank.centerZ = wc.z
      tank.radiusX = ws.x * 0.28; tank.radiusZ = ws.z * 0.28
    }

    // Position aquarium light at iMac center
    const imacObj = root.getObjectByName('imac')
    if (imacObj) {
      const imacCenter = new THREE.Box3().setFromObject(imacObj).getCenter(new THREE.Vector3())
      aquaLight.position.copy(imacCenter)
    }

    const lavaLampObj = root.getObjectByName('Cone')
    if (lavaLampObj) {
      const lampCenter = new THREE.Box3().setFromObject(lavaLampObj).getCenter(new THREE.Vector3())
      lavaLampLight.position.copy(lampCenter)
    }

    // Interactive meshes
    imacMesh    = root.getObjectByName('imac')
    keyboardMesh   = root.getObjectByName('tasti')
    mouseMesh   = root.getObjectByName('mouse_1')   
    glassMesh   = root.getObjectByName('vetro')
    shellMesh   = root.getObjectByName('shell')

    // save initial CD transform for reset
    cds.clown = root.getObjectByName('cd-clown')
    cds.blue  = root.getObjectByName('cd-blu')
    for (const key of ['clown', 'blue']) {
      if (cds[key]) {
        cdOrigins[key]     = cds[key].position.clone()
        cdOriginQuats[key] = cds[key].quaternion.clone()
      }
    }

    // Fish: hidden at startup, shown when CD is inserted
    const clownRoot = root.getObjectByName('CLOWNFISH')
    const blueRoot  = root.getObjectByName('Blue_Tang_cv')

    if (clownRoot) { clownRoot.visible = false; fishStates.clown = makeFishState(clownRoot) }
    if (blueRoot)  { blueRoot.visible  = false; fishStates.blue  = makeFishState(blueRoot, 0) }

    if (fishStates.clown) fishStates.clown.sound = loadAudio('clown', '/assets/models/aquarium/audio/tottomori-restingsand.mp3')
    if (fishStates.blue)  fishStates.blue.sound  = loadAudio('blue',  '/assets/models/aquarium/audio/tottomori-temperatemud.mp3')

    if (gltf.animations.length > 0) {
      for (const key of ['clown', 'blue']) {
        if (!fishStates[key]) continue
        fishStates[key].mixer = new THREE.AnimationMixer(root)
        gltf.animations.forEach(clip => {
          fishStates[key].mixer.clipAction(clip).setLoop(THREE.LoopRepeat, Infinity).play()
        })
      }
    }

    return root
  })
}

/* ----- Post-processing ----- */

function setupComposer() {
  const composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))
  composer.addPass(bloomPass)
  const copy = new ShaderPass(CopyShader)
  copy.renderToScreen = true
  composer.addPass(copy)
  return composer
}

/* ----- GUI ----- */

function setupGUI() {
  const gui = new GUI({ title: 'Graphics Settings' })

  gui.addFolder('Ambient light')
     .add({ v: 0.5 }, 'v', 0, 5, 0.1).name('Intensity')
     .onChange(v => { ambientLight.intensity = v })

  const lf = gui.addFolder('Aquarium light')
  const lp = { on: true, intensity: 10, color: '#00d4ff' }
  lf.add(lp, 'on').name('Active').onChange(v => {
    aquaLightOn = v
    aquaLight.intensity = v ? aquaBaseIntensity : 0
    bloomPass.enabled   = v
  })
  lf.add(lp, 'intensity', 0, 40, 0.5).name('Intensity').onChange(v => {
    aquaBaseIntensity = v
    if (aquaLightOn) aquaLight.intensity = v
  })
  lf.addColor(lp, 'color').name('Color').onChange(v => aquaLight.color.set(v))

  const sf = gui.addFolder('Swimming')
  sf.add(tank, 'speed',   0,    2,    0.05).name('Speed')
  sf.add(tank, 'radiusX', 0.01, 0.5,  0.01).name('Radius X')
  sf.add(tank, 'radiusZ', 0.01, 0.5,  0.01).name('Radius Z')
  sf.add({ v: 2.5 }, 'v', 0.5, 5, 0.2).name('Pause duration (s)')
     .onChange(v => { pauseDuration = v })

  const bf = gui.addFolder('Bloom')
  bf.add({ on: true }, 'on').name('Active').onChange(v => { bloomPass.enabled = aquaLightOn && v })
  bf.add(bloomPass, 'strength',  0, 3,   0.05).name('Strength')
  bf.add(bloomPass, 'radius',    0, 1,   0.01).name('Radius')
  bf.add(bloomPass, 'threshold', 0, 1,   0.01).name('Threshold')

  gui.close()
}

// ─── Instructions overlay ────────────────────────────────────────────────────
 
function createInstructions() {
  const panel = document.createElement('div')
  panel.style.cssText = `
    position: absolute;
    bottom: 24px;
    left: 24px;
    color: #7dd3fc;
    font-family: 'Trebuchet MS', 'Frutiger', Arial, sans-serif;
    font-size: 12px;
    line-height: 1.7;
    background: linear-gradient(135deg, rgba(15,25,50,0.8) 0%, rgba(20,40,70,0.85) 100%);
    backdrop-filter: blur(10px);
    border: 2px solid rgba(100,180,255,0.5);
    border-radius: 16px;
    padding: 16px 20px;
    max-width: 300px;
    box-shadow: 
      0 8px 32px rgba(0,0,0,0.5),
      inset 1px 1px 0 rgba(100,180,255,0.3),
      inset -1px -1px 0 rgba(0,0,0,0.4);
    font-weight: 500;
    letter-spacing: 0.3px;
  `
  panel.innerHTML = `
    <div style="font-size:15px;font-weight:bold;margin-bottom:8px;color:#7dd3fc;">
      .✦ ݁˖ iMac Aquarium .✦ ݁˖
    </div>
    <div>- Drag a CD onto the iMac to insert it</div>
    <div>- Tap the glass to attract the fish</div>
    <div>- Click the keyboard keys to eject the CD</div>
    <div>- Click the mouse to toggle the aquarium light</div>
    <div>- Enjoy the music, made by <a href="https://tottomori.com/" target="_blank" style="color:#7dd3fc;text-decoration:underline;">Tottomori</a> ! </div>
    <div>- Made with <3 by Francesca Guzzi (<a href="https://github.com/francescaguzzi/imac-aquarium" target="_blank" style="color:#7dd3fc;text-decoration:underline;">Source code</a>) </div>
  `
  document.body.appendChild(panel)
}

/* ----- Render loop ----- */

const clock = new THREE.Clock()

function animate(composer, orbitControls) {
  requestAnimationFrame(() => animate(composer, orbitControls))

  const delta = clock.getDelta()
  const t     = clock.elapsedTime

  // Update skeletal animations for both fish (even when hidden, so they are
  // already mid-cycle when they appear)
  fishStates.clown?.mixer?.update(delta)
  fishStates.blue?.mixer?.update(delta)

  // Update swimming logic only for active fish
  if (fishStates.clown) updateFish(fishStates.clown, delta, t)
  if (fishStates.blue)  updateFish(fishStates.blue,  delta, t)

  // Flicker effect for aquarium light
  aquaLight.intensity = aquaLightOn
    ? aquaBaseIntensity + Math.sin(t * 5.1) * 0.3 + Math.sin(t * 2.7) * 0.15
    : 0

  orbitControls.update()
  composer.render()
}

/* ----- Bootstrap and Controls ----- */

loadModel().then(root => {
  scene.add(root)

  const orbitControls = new OrbitControls(camera, renderer.domElement)

  const dragControls = new DragControls(visibleCDs(), camera, renderer.domElement)

  dragControls.addEventListener('dragstart', e => {
    orbitControls.enabled = false
    const camDir = new THREE.Vector3()
    camera.getWorldDirection(camDir)
    e.object.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), camDir.negate())
  })

  dragControls.addEventListener('dragend', e => {
    orbitControls.enabled = true

    raycaster.setFromCamera(pointer, camera)
    const hits = raycaster.intersectObject(imacMesh, false)

    const key = e.object === cds.clown ? 'clown' : 'blue'
    if (hits.length > 0) {
      insertFish(key)
    } else {
      resetCD(key)
    }
  })

  createInstructions()
  setupGUI()
  animate(setupComposer(), orbitControls)

}).catch(err => console.error('Model load error:', err))
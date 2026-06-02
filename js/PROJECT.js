/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./samples/chapters/chapter-14/PROJECT.js"
/*!************************************************!*\
  !*** ./samples/chapters/chapter-14/PROJECT.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var three_examples_jsm_loaders_GLTFLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/loaders/GLTFLoader */ "./node_modules/three/examples/jsm/loaders/GLTFLoader.js");
/* harmony import */ var three_examples_jsm_postprocessing_EffectComposer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/jsm/postprocessing/EffectComposer */ "./node_modules/three/examples/jsm/postprocessing/EffectComposer.js");
/* harmony import */ var three_examples_jsm_postprocessing_RenderPass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three/examples/jsm/postprocessing/RenderPass */ "./node_modules/three/examples/jsm/postprocessing/RenderPass.js");
/* harmony import */ var three_examples_jsm_postprocessing_UnrealBloomPass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! three/examples/jsm/postprocessing/UnrealBloomPass */ "./node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js");
/* harmony import */ var three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! three/examples/jsm/postprocessing/ShaderPass */ "./node_modules/three/examples/jsm/postprocessing/ShaderPass.js");
/* harmony import */ var three_examples_jsm_shaders_CopyShader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! three/examples/jsm/shaders/CopyShader */ "./node_modules/three/examples/jsm/shaders/CopyShader.js");
/* harmony import */ var lil_gui__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lil-gui */ "./node_modules/lil-gui/dist/lil-gui.esm.js");










// ─── Renderer ────────────────────────────────────────────────────────────────

const renderer = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled   = true
renderer.shadowMap.type      = three__WEBPACK_IMPORTED_MODULE_0__.PCFSoftShadowMap
renderer.outputColorSpace    = three__WEBPACK_IMPORTED_MODULE_0__.SRGBColorSpace
renderer.toneMapping         = three__WEBPACK_IMPORTED_MODULE_0__.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.0
document.body.style.margin   = '0'
document.body.style.overflow = 'hidden'
document.body.appendChild(renderer.domElement)

// ─── Scene & Camera ──────────────────────────────────────────────────────────

const scene  = new three__WEBPACK_IMPORTED_MODULE_0__.Scene()
scene.background = new three__WEBPACK_IMPORTED_MODULE_0__.Color(0x000000)

const camera = new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 100)
camera.position.set(0, 0.5, 3)

// ─── Lights ──────────────────────────────────────────────────────────────────

const ambientLight = new three__WEBPACK_IMPORTED_MODULE_0__.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

// Aquarium point light — positioned at iMac center after model load
const aquaLight = new three__WEBPACK_IMPORTED_MODULE_0__.PointLight(0x00d4ff, 10, 2) // blue color, high intensity, short range
aquaLight.castShadow = true
aquaLight.shadow.mapSize.set(512, 512)
scene.add(aquaLight)

const lavaLampLight = new three__WEBPACK_IMPORTED_MODULE_0__.PointLight(0xe66100, 10, 3) // warm orange, high intensity, short range
lavaLampLight.castShadow = true
lavaLampLight.shadow.mapSize.set(512, 512)
scene.add(lavaLampLight)

// Base intensity used by the flicker effect.
// Kept separate from aquaLight.intensity to avoid per-frame accumulation.
let aquaBaseIntensity = 10
let aquaLightOn       = true   // toggled by clicking the mouse object

// ─── Fish rotation constants ──────────────────────────────────────────────────
// Fish exported from Blender carry a native +90° rotation on the X axis.
// We compose this with the yaw quaternion each frame so the fish always
// stays upright while turning horizontally.

const Q_NATIVE = new three__WEBPACK_IMPORTED_MODULE_0__.Quaternion().setFromAxisAngle(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(1, 0, 0), Math.PI / 2)
const Q_YAW    = new three__WEBPACK_IMPORTED_MODULE_0__.Quaternion()
const WORLD_Y  = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 1, 0)

// ─── Fish state ───────────────────────────────────────────────────────────────
//
// Each fish has its own independent state: position, direction, ellipse angle,
// animation mixer and click target.
//
// noseOffsetY corrects the model-specific mismatch between the mesh's local
// forward axis and the swimming direction:
//   CLOWNFISH  → Math.PI / 2  (default)
//   Blue Tang  → 0

function makeFishState(group, noseOffsetY = Math.PI / 2) {
  return {
    group,
    mixer:       null,
    sound:       null,
    pos:         new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(),
    dir:         new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(1, 0, 0),
    angle:       0,          // current angle along the ellipse
    active:      false,
    clickTarget: null,       // world-space target set by screen click
    pauseUntil:  0,          // clock time when the pause at target ends
    pausedDir:   new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(),
    noseOffsetY,
  }
}

const fishStates = {}   // populated in loadModel(): { clown, blue }

// ─── Tank parameters ─────────────────────────────────────────────────────────
// centerX/Y/Z and radiusX/Z are overwritten from the "water" mesh bounding box.

const tank = {
  radiusX: 0.16, radiusZ: 0.16, speed: 0.5,
  centerX: 0.0,  centerY: 0.0,  centerZ: 0.0,
}

const ARRIVE_DIST   = 0.03   // arrival threshold (world units)
const TURN_SPEED    = 4.0    // angular interpolation speed (approx rad/s)
let   pauseDuration = 2.5    // seconds the fish pauses at click target

// ─── Drag & drop state ───────────────────────────────────────────────────────

const raycaster  = new three__WEBPACK_IMPORTED_MODULE_0__.Raycaster()
const pointer    = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2()
const dragPlane  = new three__WEBPACK_IMPORTED_MODULE_0__.Plane()
const dragOffset = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3()

let imacMesh      = null
let keyboardMesh  = null
let mouseMesh     = null   // the 3D mouse object — toggles light/bloom on click

const cds            = {}   // { clown: Mesh, blue: Mesh }  — the draggable CDs
const cdOrigins      = {}   // initial positions saved at load time
const cdOriginQuats  = {}   // initial quaternions saved at load time

let dragging   = null   // 'clown' | 'blue' | null
let activeFish = null   // 'clown' | 'blue' | null

// ─── Audio ───────────────────────────────────────────────────────────────────
// THREE.Audio attaches to the camera via an AudioListener.
// The AudioLoader handles decoding; play/pause is managed by the Audio object.

const audioListener = new three__WEBPACK_IMPORTED_MODULE_0__.AudioListener()
camera.add(audioListener)

function loadAudio(key, url) {
  const sound = new three__WEBPACK_IMPORTED_MODULE_0__.Audio(audioListener)
  new three__WEBPACK_IMPORTED_MODULE_0__.AudioLoader().load(
    url,
    buffer => { sound.setBuffer(buffer); sound.setLoop(true); },
    undefined,
    err => console.warn('Audio load failed:', err)
  )
  return sound
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const canvas = renderer.domElement

function toNDC(e) {
  pointer.x =  (e.clientX / window.innerWidth)  * 2 - 1
  pointer.y = -(e.clientY / window.innerHeight)  * 2 + 1
}

function visibleCDs() {
  return Object.values(cds).filter(c => c?.visible)
}

// Returns world-space meshes whose names include any of the given substrings.
function getMeshesByName(...substrings) {
  const result = []
  scene.traverse(o => {
    if (!o.isMesh) return
    const n = o.name.toLowerCase()
    if (substrings.some(s => n.includes(s))) result.push(o)
  })
  return result
}

// ─── Light & bloom toggle ────────────────────────────────────────────────────

const bloomPass = new three_examples_jsm_postprocessing_UnrealBloomPass__WEBPACK_IMPORTED_MODULE_5__.UnrealBloomPass(
  new three__WEBPACK_IMPORTED_MODULE_0__.Vector2(window.innerWidth, window.innerHeight), 0.8, 0.4, 0.2
)

function toggleAquaLight() {
  aquaLightOn = !aquaLightOn
  aquaLight.intensity = aquaLightOn ? aquaBaseIntensity : 0
  bloomPass.enabled   = aquaLightOn
}

// ─── Mouse events ────────────────────────────────────────────────────────────

canvas.addEventListener('mousedown', e => {
  toNDC(e)
  raycaster.setFromCamera(pointer, camera)

  // 1. Drag a CD
  const cdHits = raycaster.intersectObjects(visibleCDs(), false)
  if (cdHits.length > 0) {
    const { object: mesh, point } = cdHits[0]
    dragging = mesh === cds.clown ? 'clown' : 'blue'
    dragPlane.setFromNormalAndCoplanarPoint(
      camera.getWorldDirection(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3()).negate(), point
    )
    dragOffset.subVectors(mesh.position, point)
    // Face the CD toward the camera while dragging
    const camDir = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3()
    camera.getWorldDirection(camDir)
    mesh.quaternion.setFromUnitVectors(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, -1), camDir.negate())
    canvas.style.cursor = 'grabbing'
    e.preventDefault()
    return
  }

  // 2. Eject fish by clicking the keyboard keys
  if (keyboardMesh && activeFish) {
    if (raycaster.intersectObject(keyboardMesh, false).length > 0) {
      ejectFish(activeFish)
      return
    }
  }

  const allHits = raycaster.intersectObjects(
    [...scene.children].flatMap(o => { const m = []; o.traverse(x => { if (x.isMesh) m.push(x) }); return m }), false
  )
  if (allHits.length > 0) console.log('Hit:', allHits[0].object.name)

  // 3. Toggle aquarium light by clicking the mouse object
  if (mouseMesh) {
    if (raycaster.intersectObject(mouseMesh, false).length > 0) {
      toggleAquaLight()
      return
    }
  }

  // 4. Direct the active fish toward a screen click
  if (activeFish) {
    const screenHits = raycaster.intersectObjects(
      getMeshesByName('imac', 'vetro', 'shell'), false
    )
    if (screenHits.length > 0) {
      const p  = screenHits[0].point
      const fs = fishStates[activeFish]
      fs.clickTarget = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(
        three__WEBPACK_IMPORTED_MODULE_0__.MathUtils.clamp(p.x, tank.centerX - tank.radiusX, tank.centerX + tank.radiusX),
        tank.centerY,
        three__WEBPACK_IMPORTED_MODULE_0__.MathUtils.clamp(p.z, tank.centerZ - tank.radiusZ, tank.centerZ + tank.radiusZ)
      )
      fs.pauseUntil = 0
    }
  }
})

canvas.addEventListener('mousemove', e => {
  toNDC(e)
  raycaster.setFromCamera(pointer, camera)
  if (!dragging) {
    const hover = raycaster.intersectObjects(visibleCDs(), false)
    canvas.style.cursor = hover.length > 0 ? 'grab' : 'default'
    return
  }
  const hit = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3()
  if (raycaster.ray.intersectPlane(dragPlane, hit)) {
    cds[dragging].position.copy(hit.add(dragOffset))
  }
})

canvas.addEventListener('mouseup', e => {
  if (!dragging) return
  toNDC(e)
  raycaster.setFromCamera(pointer, camera)
  if (imacMesh && raycaster.intersectObject(imacMesh, false).length > 0) {
    insertFish(dragging)
  } else {
    resetCD(dragging)
  }
  dragging = null
  canvas.style.cursor = 'default'
})

// ─── Fish insertion & ejection ───────────────────────────────────────────────

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

// ─── Fish movement ────────────────────────────────────────────────────────────

function updateFish(fs, delta, t) {
  if (!fs.active || !fs.group) return

  let desiredDir = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3()

  // State 1 — swim toward click target
  if (fs.clickTarget && fs.pauseUntil <= t) {
    const toTarget = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3().subVectors(fs.clickTarget, fs.pos)
    if (Math.hypot(toTarget.x, toTarget.z) < ARRIVE_DIST) {
      fs.pausedDir.copy(fs.dir)
      fs.pauseUntil  = t + pauseDuration
      fs.clickTarget = null
    } else {
      desiredDir.set(toTarget.x, 0, toTarget.z).normalize()
      fs.pos.addScaledVector(desiredDir, tank.speed * 0.35 * delta)
    }
  }

  // State 2 — pause at target
  if (fs.pauseUntil > t) {
    desiredDir.copy(fs.pausedDir)
  } else if (fs.pauseUntil > 0) {
    // Pause ended — re-sync ellipse angle to current position
    fs.angle      = Math.atan2(fs.pos.z - tank.centerZ, fs.pos.x - tank.centerX)
    fs.pauseUntil = 0
  }

  // State 3 — free elliptical swim
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

  // Smoothly interpolate direction, then compose quaternions:
  //   final = yaw(world Y) * nativeRotation(X+90°)
  if (desiredDir.lengthSq() > 0.001) {
    fs.dir.lerp(desiredDir, Math.min(1, TURN_SPEED * delta)).normalize()
    Q_YAW.setFromAxisAngle(WORLD_Y, Math.atan2(fs.dir.x, fs.dir.z) + fs.noseOffsetY)
    fs.group.quaternion.multiplyQuaternions(Q_YAW, Q_NATIVE)
  }
}

// ─── Material setup ───────────────────────────────────────────────────────────

function setupMaterials(root) {
  root.traverse(obj => {
    if (!obj.isMesh) return
    obj.castShadow    = true
    obj.receiveShadow = true
    obj.frustumCulled = false   // prevent pop-in when moving objects via code

    const mat = obj.material
    if (!mat) return
    const n = (obj.name + mat.name).toLowerCase()

    // Alpha cutout for the iMac screen decorations (plants, algae, etc.)
    if (n.includes('imac') || n.includes('flowerpot') || n.includes('plant')) {
      mat.transparent = true
      mat.alphaTest   = 0.1
      mat.side        = three__WEBPACK_IMPORTED_MODULE_0__.DoubleSide
      mat.depthWrite  = true
    }
  })
}

// ─── Model loading ────────────────────────────────────────────────────────────

function loadModel() {
  return new three_examples_jsm_loaders_GLTFLoader__WEBPACK_IMPORTED_MODULE_2__.GLTFLoader().loadAsync('/assets/models/aquarium/aquarium.gltf').then(gltf => {
    const root = gltf.scene
    setupMaterials(root)

    // Center the scene at the world origin
    const box    = new three__WEBPACK_IMPORTED_MODULE_0__.Box3().setFromObject(root)
    const center = box.getCenter(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3())
    const size   = box.getSize(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3())
    root.position.sub(center)

    // Fit camera to model size
    const maxDim = Math.max(size.x, size.y, size.z)
    camera.position.set(0, maxDim * 0.2, maxDim * 1.8)
    camera.near = maxDim * 0.01
    camera.far  = maxDim * 20
    camera.updateProjectionMatrix()

    // Derive tank swim bounds from the "water" mesh
    const waterMesh = root.getObjectByName('water')
    if (waterMesh) {
      const wb = new three__WEBPACK_IMPORTED_MODULE_0__.Box3().setFromObject(waterMesh)
      const wc = wb.getCenter(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3())
      const ws = wb.getSize(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3())
      tank.centerX = wc.x; tank.centerY = wc.y; tank.centerZ = wc.z
      tank.radiusX = ws.x * 0.28; tank.radiusZ = ws.z * 0.28
    }

    // Position aquarium light at iMac center
    const imacObj = root.getObjectByName('imac')
    if (imacObj) {
      const imacCenter = new three__WEBPACK_IMPORTED_MODULE_0__.Box3().setFromObject(imacObj).getCenter(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3())
      aquaLight.position.copy(imacCenter)
    }

    const lavaLampObj = root.getObjectByName('Cone')
    if (lavaLampObj) {
      const lampCenter = new three__WEBPACK_IMPORTED_MODULE_0__.Box3().setFromObject(lavaLampObj).getCenter(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3())
      lavaLampLight.position.copy(lampCenter)
    }

    // Interactive meshes
    imacMesh    = root.getObjectByName('imac')
    keyboardMesh   = root.getObjectByName('tasti')
    mouseMesh   = root.getObjectByName('mouse_1')   

    // CDs: save initial transform for reset
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

    // One AnimationMixer per fish on the shared root
    // (both mixers reference the same clips; each only drives its own joints)
    if (gltf.animations.length > 0) {
      for (const key of ['clown', 'blue']) {
        if (!fishStates[key]) continue
        fishStates[key].mixer = new three__WEBPACK_IMPORTED_MODULE_0__.AnimationMixer(root)
        gltf.animations.forEach(clip => {
          fishStates[key].mixer.clipAction(clip).setLoop(three__WEBPACK_IMPORTED_MODULE_0__.LoopRepeat, Infinity).play()
        })
      }
    }

    return root
  })
}

// ─── Post-processing ─────────────────────────────────────────────────────────

function setupComposer() {
  const composer = new three_examples_jsm_postprocessing_EffectComposer__WEBPACK_IMPORTED_MODULE_3__.EffectComposer(renderer)
  composer.addPass(new three_examples_jsm_postprocessing_RenderPass__WEBPACK_IMPORTED_MODULE_4__.RenderPass(scene, camera))
  composer.addPass(bloomPass)
  const copy = new three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_6__.ShaderPass(three_examples_jsm_shaders_CopyShader__WEBPACK_IMPORTED_MODULE_7__.CopyShader)
  copy.renderToScreen = true
  composer.addPass(copy)
  return composer
}

// ─── GUI ─────────────────────────────────────────────────────────────────────

function setupGUI() {
  const gui = new lil_gui__WEBPACK_IMPORTED_MODULE_8__["default"]({ title: 'Graphics Settings' })

  // Ambient light
  gui.addFolder('Ambient light')
     .add({ v: 0.5 }, 'v', 0, 5, 0.1).name('Intensity')
     .onChange(v => { ambientLight.intensity = v })

  // Aquarium light
  const lf = gui.addFolder('Aquarium light')
  const lp = { on: true, intensity: 10, color: '#00d4ff' }
  lf.add(lp, 'on').name('ON / OFF').onChange(v => {
    aquaLightOn = v
    aquaLight.intensity = v ? aquaBaseIntensity : 0
    bloomPass.enabled   = v
  })
  lf.add(lp, 'intensity', 0, 40, 0.5).name('Intensity').onChange(v => {
    aquaBaseIntensity = v
    if (aquaLightOn) aquaLight.intensity = v
  })
  lf.addColor(lp, 'color').name('Color').onChange(v => aquaLight.color.set(v))

  // Swimming parameters
  const sf = gui.addFolder('Swimming')
  sf.add(tank, 'speed',   0,    2,    0.05).name('Speed')
  sf.add(tank, 'radiusX', 0.01, 0.5,  0.01).name('Radius X')
  sf.add(tank, 'radiusZ', 0.01, 0.5,  0.01).name('Radius Z')
  sf.add({ v: 2.5 }, 'v', 0.5, 5, 0.2).name('Pause duration (s)')
     .onChange(v => { pauseDuration = v })

  // Bloom
  const bf = gui.addFolder('Bloom')
  bf.add({ on: true }, 'on').name('ON / OFF').onChange(v => { bloomPass.enabled = aquaLightOn && v })
  bf.add(bloomPass, 'strength',  0, 3,   0.05).name('Strength')
  bf.add(bloomPass, 'radius',    0, 1,   0.01).name('Radius')
  bf.add(bloomPass, 'threshold', 0, 1,   0.01).name('Threshold')

  gui.close()
}

// ─── Render loop ─────────────────────────────────────────────────────────────

const clock = new three__WEBPACK_IMPORTED_MODULE_0__.Clock()

function animate(composer, controls) {
  requestAnimationFrame(() => animate(composer, controls))

  const delta = clock.getDelta()
  const t     = clock.elapsedTime

  // Update skeletal animations for both fish (even when hidden, so they are
  // already mid-cycle when they appear)
  fishStates.clown?.mixer?.update(delta)
  fishStates.blue?.mixer?.update(delta)

  // Update swimming logic only for active fish
  if (fishStates.clown) updateFish(fishStates.clown, delta, t)
  if (fishStates.blue)  updateFish(fishStates.blue,  delta, t)

  // Flicker effect — only when the light is on
  aquaLight.intensity = aquaLightOn
    ? aquaBaseIntensity + Math.sin(t * 5.1) * 0.3 + Math.sin(t * 2.7) * 0.15
    : 0

  controls.update()
  composer.render()
}

// ─── Resize ──────────────────────────────────────────────────────────────────

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

// ─── Bootstrap ───────────────────────────────────────────────────────────────

// ─── Instructions overlay ────────────────────────────────────────────────────
 
function createInstructions() {
  const panel = document.createElement('div')
  panel.style.cssText = `
    position: absolute;
    bottom: 24px;
    left: 24px;
    color: #c8e6ff;
    font-family: 'Courier New', monospace;
    font-size: 13px;
    line-height: 1.8;
    background: rgba(0,0,0,0.55);
    backdrop-filter: blur(6px);
    border: 1px solid rgba(100,180,255,0.2);
    border-radius: 10px;
    padding: 14px 18px;
    pointer-events: none;
    max-width: 280px;
  `
  panel.innerHTML = `
    <div style="font-size:15px;font-weight:bold;margin-bottom:8px;color:#7dd3fc;">
      🐠 iMac Aquarium
    </div>
    <div>- <b>Drag</b> a CD onto the iMac<br>&nbsp;&nbsp;&nbsp;&nbsp;to insert it</div>
    <div>- <b>Tap</b> the glass to<br>&nbsp;&nbsp;&nbsp;&nbsp;attract the fish</div>
    <div>- <b>Click</b> the keyboard keys<br>&nbsp;&nbsp;&nbsp;&nbsp;to eject the CD</div>
    <div>- <b>Click</b> the mouse to<br>&nbsp;&nbsp;&nbsp;&nbsp;toggle the aquarium light</div>
    <div>- <b>Drag</b> to orbit · <b>Scroll</b> to zoom</div>

    <div> Enjoy the music, made with love by <a href="https://tottomori.com/" target="_blank" style="color:#7dd3fc;text-decoration:underline;">Tottomori</a> <3 </div>
  `
  document.body.appendChild(panel)
}


loadModel().then(root => {
  scene.add(root)

  const controls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1__.OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05

  // Disable orbit while dragging a CD
  canvas.addEventListener('mousedown', e => {
    toNDC(e)
    raycaster.setFromCamera(pointer, camera)
    if (raycaster.intersectObjects(visibleCDs(), false).length > 0)
      controls.enabled = false
  })
  canvas.addEventListener('mouseup', () => { controls.enabled = true })

  createInstructions()
  setupGUI()
  animate(setupComposer(), controls)
}).catch(err => console.error('Model load error:', err))

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"PROJECT": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkltjs_fourth"] = self["webpackChunkltjs_fourth"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","vendors-node_modules_three_examples_jsm_loaders_GLTFLoader_js","vendors-node_modules_three_examples_jsm_postprocessing_EffectComposer_js-node_modules_three_e-dd9777","vendors-node_modules_three_examples_jsm_postprocessing_UnrealBloomPass_js"], () => (__webpack_require__("./samples/chapters/chapter-14/PROJECT.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQSw0Rzs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTE0L1BST0pFQ1QuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcbmltcG9ydCB7IE9yYml0Q29udHJvbHMgfSAgIGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9jb250cm9scy9PcmJpdENvbnRyb2xzJ1xuaW1wb3J0IHsgR0xURkxvYWRlciB9ICAgICAgZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlcidcbmltcG9ydCB7IEVmZmVjdENvbXBvc2VyIH0gIGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9wb3N0cHJvY2Vzc2luZy9FZmZlY3RDb21wb3NlcidcbmltcG9ydCB7IFJlbmRlclBhc3MgfSAgICAgIGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9wb3N0cHJvY2Vzc2luZy9SZW5kZXJQYXNzJ1xuaW1wb3J0IHsgVW5yZWFsQmxvb21QYXNzIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL3Bvc3Rwcm9jZXNzaW5nL1VucmVhbEJsb29tUGFzcydcbmltcG9ydCB7IFNoYWRlclBhc3MgfSAgICAgIGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9wb3N0cHJvY2Vzc2luZy9TaGFkZXJQYXNzJ1xuaW1wb3J0IHsgQ29weVNoYWRlciB9ICAgICAgZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL3NoYWRlcnMvQ29weVNoYWRlcidcbmltcG9ydCBHVUkgICAgICAgICAgICAgICAgIGZyb20gJ2xpbC1ndWknXG5cbi8vIOKUgOKUgOKUgCBSZW5kZXJlciDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuY29uc3QgcmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcih7IGFudGlhbGlhczogdHJ1ZSB9KVxucmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KVxucmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyhNYXRoLm1pbih3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbywgMikpXG5yZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCAgID0gdHJ1ZVxucmVuZGVyZXIuc2hhZG93TWFwLnR5cGUgICAgICA9IFRIUkVFLlBDRlNvZnRTaGFkb3dNYXBcbnJlbmRlcmVyLm91dHB1dENvbG9yU3BhY2UgICAgPSBUSFJFRS5TUkdCQ29sb3JTcGFjZVxucmVuZGVyZXIudG9uZU1hcHBpbmcgICAgICAgICA9IFRIUkVFLkFDRVNGaWxtaWNUb25lTWFwcGluZ1xucmVuZGVyZXIudG9uZU1hcHBpbmdFeHBvc3VyZSA9IDEuMFxuZG9jdW1lbnQuYm9keS5zdHlsZS5tYXJnaW4gICA9ICcwJ1xuZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHJlbmRlcmVyLmRvbUVsZW1lbnQpXG5cbi8vIOKUgOKUgOKUgCBTY2VuZSAmIENhbWVyYSDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuY29uc3Qgc2NlbmUgID0gbmV3IFRIUkVFLlNjZW5lKClcbnNjZW5lLmJhY2tncm91bmQgPSBuZXcgVEhSRUUuQ29sb3IoMHgwMDAwMDApXG5cbmNvbnN0IGNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg0NSwgd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQsIDAuMDEsIDEwMClcbmNhbWVyYS5wb3NpdGlvbi5zZXQoMCwgMC41LCAzKVxuXG4vLyDilIDilIDilIAgTGlnaHRzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5jb25zdCBhbWJpZW50TGlnaHQgPSBuZXcgVEhSRUUuQW1iaWVudExpZ2h0KDB4ZmZmZmZmLCAwLjUpXG5zY2VuZS5hZGQoYW1iaWVudExpZ2h0KVxuXG4vLyBBcXVhcml1bSBwb2ludCBsaWdodCDigJQgcG9zaXRpb25lZCBhdCBpTWFjIGNlbnRlciBhZnRlciBtb2RlbCBsb2FkXG5jb25zdCBhcXVhTGlnaHQgPSBuZXcgVEhSRUUuUG9pbnRMaWdodCgweDAwZDRmZiwgMTAsIDIpIC8vIGJsdWUgY29sb3IsIGhpZ2ggaW50ZW5zaXR5LCBzaG9ydCByYW5nZVxuYXF1YUxpZ2h0LmNhc3RTaGFkb3cgPSB0cnVlXG5hcXVhTGlnaHQuc2hhZG93Lm1hcFNpemUuc2V0KDUxMiwgNTEyKVxuc2NlbmUuYWRkKGFxdWFMaWdodClcblxuY29uc3QgbGF2YUxhbXBMaWdodCA9IG5ldyBUSFJFRS5Qb2ludExpZ2h0KDB4ZTY2MTAwLCAxMCwgMykgLy8gd2FybSBvcmFuZ2UsIGhpZ2ggaW50ZW5zaXR5LCBzaG9ydCByYW5nZVxubGF2YUxhbXBMaWdodC5jYXN0U2hhZG93ID0gdHJ1ZVxubGF2YUxhbXBMaWdodC5zaGFkb3cubWFwU2l6ZS5zZXQoNTEyLCA1MTIpXG5zY2VuZS5hZGQobGF2YUxhbXBMaWdodClcblxuLy8gQmFzZSBpbnRlbnNpdHkgdXNlZCBieSB0aGUgZmxpY2tlciBlZmZlY3QuXG4vLyBLZXB0IHNlcGFyYXRlIGZyb20gYXF1YUxpZ2h0LmludGVuc2l0eSB0byBhdm9pZCBwZXItZnJhbWUgYWNjdW11bGF0aW9uLlxubGV0IGFxdWFCYXNlSW50ZW5zaXR5ID0gMTBcbmxldCBhcXVhTGlnaHRPbiAgICAgICA9IHRydWUgICAvLyB0b2dnbGVkIGJ5IGNsaWNraW5nIHRoZSBtb3VzZSBvYmplY3RcblxuLy8g4pSA4pSA4pSAIEZpc2ggcm90YXRpb24gY29uc3RhbnRzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuLy8gRmlzaCBleHBvcnRlZCBmcm9tIEJsZW5kZXIgY2FycnkgYSBuYXRpdmUgKzkwwrAgcm90YXRpb24gb24gdGhlIFggYXhpcy5cbi8vIFdlIGNvbXBvc2UgdGhpcyB3aXRoIHRoZSB5YXcgcXVhdGVybmlvbiBlYWNoIGZyYW1lIHNvIHRoZSBmaXNoIGFsd2F5c1xuLy8gc3RheXMgdXByaWdodCB3aGlsZSB0dXJuaW5nIGhvcml6b250YWxseS5cblxuY29uc3QgUV9OQVRJVkUgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpLnNldEZyb21BeGlzQW5nbGUobmV3IFRIUkVFLlZlY3RvcjMoMSwgMCwgMCksIE1hdGguUEkgLyAyKVxuY29uc3QgUV9ZQVcgICAgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpXG5jb25zdCBXT1JMRF9ZICA9IG5ldyBUSFJFRS5WZWN0b3IzKDAsIDEsIDApXG5cbi8vIOKUgOKUgOKUgCBGaXNoIHN0YXRlIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuLy9cbi8vIEVhY2ggZmlzaCBoYXMgaXRzIG93biBpbmRlcGVuZGVudCBzdGF0ZTogcG9zaXRpb24sIGRpcmVjdGlvbiwgZWxsaXBzZSBhbmdsZSxcbi8vIGFuaW1hdGlvbiBtaXhlciBhbmQgY2xpY2sgdGFyZ2V0LlxuLy9cbi8vIG5vc2VPZmZzZXRZIGNvcnJlY3RzIHRoZSBtb2RlbC1zcGVjaWZpYyBtaXNtYXRjaCBiZXR3ZWVuIHRoZSBtZXNoJ3MgbG9jYWxcbi8vIGZvcndhcmQgYXhpcyBhbmQgdGhlIHN3aW1taW5nIGRpcmVjdGlvbjpcbi8vICAgQ0xPV05GSVNIICDihpIgTWF0aC5QSSAvIDIgIChkZWZhdWx0KVxuLy8gICBCbHVlIFRhbmcgIOKGkiAwXG5cbmZ1bmN0aW9uIG1ha2VGaXNoU3RhdGUoZ3JvdXAsIG5vc2VPZmZzZXRZID0gTWF0aC5QSSAvIDIpIHtcbiAgcmV0dXJuIHtcbiAgICBncm91cCxcbiAgICBtaXhlcjogICAgICAgbnVsbCxcbiAgICBzb3VuZDogICAgICAgbnVsbCxcbiAgICBwb3M6ICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoKSxcbiAgICBkaXI6ICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoMSwgMCwgMCksXG4gICAgYW5nbGU6ICAgICAgIDAsICAgICAgICAgIC8vIGN1cnJlbnQgYW5nbGUgYWxvbmcgdGhlIGVsbGlwc2VcbiAgICBhY3RpdmU6ICAgICAgZmFsc2UsXG4gICAgY2xpY2tUYXJnZXQ6IG51bGwsICAgICAgIC8vIHdvcmxkLXNwYWNlIHRhcmdldCBzZXQgYnkgc2NyZWVuIGNsaWNrXG4gICAgcGF1c2VVbnRpbDogIDAsICAgICAgICAgIC8vIGNsb2NrIHRpbWUgd2hlbiB0aGUgcGF1c2UgYXQgdGFyZ2V0IGVuZHNcbiAgICBwYXVzZWREaXI6ICAgbmV3IFRIUkVFLlZlY3RvcjMoKSxcbiAgICBub3NlT2Zmc2V0WSxcbiAgfVxufVxuXG5jb25zdCBmaXNoU3RhdGVzID0ge30gICAvLyBwb3B1bGF0ZWQgaW4gbG9hZE1vZGVsKCk6IHsgY2xvd24sIGJsdWUgfVxuXG4vLyDilIDilIDilIAgVGFuayBwYXJhbWV0ZXJzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuLy8gY2VudGVyWC9ZL1ogYW5kIHJhZGl1c1gvWiBhcmUgb3ZlcndyaXR0ZW4gZnJvbSB0aGUgXCJ3YXRlclwiIG1lc2ggYm91bmRpbmcgYm94LlxuXG5jb25zdCB0YW5rID0ge1xuICByYWRpdXNYOiAwLjE2LCByYWRpdXNaOiAwLjE2LCBzcGVlZDogMC41LFxuICBjZW50ZXJYOiAwLjAsICBjZW50ZXJZOiAwLjAsICBjZW50ZXJaOiAwLjAsXG59XG5cbmNvbnN0IEFSUklWRV9ESVNUICAgPSAwLjAzICAgLy8gYXJyaXZhbCB0aHJlc2hvbGQgKHdvcmxkIHVuaXRzKVxuY29uc3QgVFVSTl9TUEVFRCAgICA9IDQuMCAgICAvLyBhbmd1bGFyIGludGVycG9sYXRpb24gc3BlZWQgKGFwcHJveCByYWQvcylcbmxldCAgIHBhdXNlRHVyYXRpb24gPSAyLjUgICAgLy8gc2Vjb25kcyB0aGUgZmlzaCBwYXVzZXMgYXQgY2xpY2sgdGFyZ2V0XG5cbi8vIOKUgOKUgOKUgCBEcmFnICYgZHJvcCBzdGF0ZSDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuY29uc3QgcmF5Y2FzdGVyICA9IG5ldyBUSFJFRS5SYXljYXN0ZXIoKVxuY29uc3QgcG9pbnRlciAgICA9IG5ldyBUSFJFRS5WZWN0b3IyKClcbmNvbnN0IGRyYWdQbGFuZSAgPSBuZXcgVEhSRUUuUGxhbmUoKVxuY29uc3QgZHJhZ09mZnNldCA9IG5ldyBUSFJFRS5WZWN0b3IzKClcblxubGV0IGltYWNNZXNoICAgICAgPSBudWxsXG5sZXQga2V5Ym9hcmRNZXNoICA9IG51bGxcbmxldCBtb3VzZU1lc2ggICAgID0gbnVsbCAgIC8vIHRoZSAzRCBtb3VzZSBvYmplY3Qg4oCUIHRvZ2dsZXMgbGlnaHQvYmxvb20gb24gY2xpY2tcblxuY29uc3QgY2RzICAgICAgICAgICAgPSB7fSAgIC8vIHsgY2xvd246IE1lc2gsIGJsdWU6IE1lc2ggfSAg4oCUIHRoZSBkcmFnZ2FibGUgQ0RzXG5jb25zdCBjZE9yaWdpbnMgICAgICA9IHt9ICAgLy8gaW5pdGlhbCBwb3NpdGlvbnMgc2F2ZWQgYXQgbG9hZCB0aW1lXG5jb25zdCBjZE9yaWdpblF1YXRzICA9IHt9ICAgLy8gaW5pdGlhbCBxdWF0ZXJuaW9ucyBzYXZlZCBhdCBsb2FkIHRpbWVcblxubGV0IGRyYWdnaW5nICAgPSBudWxsICAgLy8gJ2Nsb3duJyB8ICdibHVlJyB8IG51bGxcbmxldCBhY3RpdmVGaXNoID0gbnVsbCAgIC8vICdjbG93bicgfCAnYmx1ZScgfCBudWxsXG5cbi8vIOKUgOKUgOKUgCBBdWRpbyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcbi8vIFRIUkVFLkF1ZGlvIGF0dGFjaGVzIHRvIHRoZSBjYW1lcmEgdmlhIGFuIEF1ZGlvTGlzdGVuZXIuXG4vLyBUaGUgQXVkaW9Mb2FkZXIgaGFuZGxlcyBkZWNvZGluZzsgcGxheS9wYXVzZSBpcyBtYW5hZ2VkIGJ5IHRoZSBBdWRpbyBvYmplY3QuXG5cbmNvbnN0IGF1ZGlvTGlzdGVuZXIgPSBuZXcgVEhSRUUuQXVkaW9MaXN0ZW5lcigpXG5jYW1lcmEuYWRkKGF1ZGlvTGlzdGVuZXIpXG5cbmZ1bmN0aW9uIGxvYWRBdWRpbyhrZXksIHVybCkge1xuICBjb25zdCBzb3VuZCA9IG5ldyBUSFJFRS5BdWRpbyhhdWRpb0xpc3RlbmVyKVxuICBuZXcgVEhSRUUuQXVkaW9Mb2FkZXIoKS5sb2FkKFxuICAgIHVybCxcbiAgICBidWZmZXIgPT4geyBzb3VuZC5zZXRCdWZmZXIoYnVmZmVyKTsgc291bmQuc2V0TG9vcCh0cnVlKTsgfSxcbiAgICB1bmRlZmluZWQsXG4gICAgZXJyID0+IGNvbnNvbGUud2FybignQXVkaW8gbG9hZCBmYWlsZWQ6JywgZXJyKVxuICApXG4gIHJldHVybiBzb3VuZFxufVxuXG4vLyDilIDilIDilIAgSGVscGVycyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuY29uc3QgY2FudmFzID0gcmVuZGVyZXIuZG9tRWxlbWVudFxuXG5mdW5jdGlvbiB0b05EQyhlKSB7XG4gIHBvaW50ZXIueCA9ICAoZS5jbGllbnRYIC8gd2luZG93LmlubmVyV2lkdGgpICAqIDIgLSAxXG4gIHBvaW50ZXIueSA9IC0oZS5jbGllbnRZIC8gd2luZG93LmlubmVySGVpZ2h0KSAgKiAyICsgMVxufVxuXG5mdW5jdGlvbiB2aXNpYmxlQ0RzKCkge1xuICByZXR1cm4gT2JqZWN0LnZhbHVlcyhjZHMpLmZpbHRlcihjID0+IGM/LnZpc2libGUpXG59XG5cbi8vIFJldHVybnMgd29ybGQtc3BhY2UgbWVzaGVzIHdob3NlIG5hbWVzIGluY2x1ZGUgYW55IG9mIHRoZSBnaXZlbiBzdWJzdHJpbmdzLlxuZnVuY3Rpb24gZ2V0TWVzaGVzQnlOYW1lKC4uLnN1YnN0cmluZ3MpIHtcbiAgY29uc3QgcmVzdWx0ID0gW11cbiAgc2NlbmUudHJhdmVyc2UobyA9PiB7XG4gICAgaWYgKCFvLmlzTWVzaCkgcmV0dXJuXG4gICAgY29uc3QgbiA9IG8ubmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgaWYgKHN1YnN0cmluZ3Muc29tZShzID0+IG4uaW5jbHVkZXMocykpKSByZXN1bHQucHVzaChvKVxuICB9KVxuICByZXR1cm4gcmVzdWx0XG59XG5cbi8vIOKUgOKUgOKUgCBMaWdodCAmIGJsb29tIHRvZ2dsZSDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuY29uc3QgYmxvb21QYXNzID0gbmV3IFVucmVhbEJsb29tUGFzcyhcbiAgbmV3IFRIUkVFLlZlY3RvcjIod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCksIDAuOCwgMC40LCAwLjJcbilcblxuZnVuY3Rpb24gdG9nZ2xlQXF1YUxpZ2h0KCkge1xuICBhcXVhTGlnaHRPbiA9ICFhcXVhTGlnaHRPblxuICBhcXVhTGlnaHQuaW50ZW5zaXR5ID0gYXF1YUxpZ2h0T24gPyBhcXVhQmFzZUludGVuc2l0eSA6IDBcbiAgYmxvb21QYXNzLmVuYWJsZWQgICA9IGFxdWFMaWdodE9uXG59XG5cbi8vIOKUgOKUgOKUgCBNb3VzZSBldmVudHMg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBlID0+IHtcbiAgdG9OREMoZSlcbiAgcmF5Y2FzdGVyLnNldEZyb21DYW1lcmEocG9pbnRlciwgY2FtZXJhKVxuXG4gIC8vIDEuIERyYWcgYSBDRFxuICBjb25zdCBjZEhpdHMgPSByYXljYXN0ZXIuaW50ZXJzZWN0T2JqZWN0cyh2aXNpYmxlQ0RzKCksIGZhbHNlKVxuICBpZiAoY2RIaXRzLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCB7IG9iamVjdDogbWVzaCwgcG9pbnQgfSA9IGNkSGl0c1swXVxuICAgIGRyYWdnaW5nID0gbWVzaCA9PT0gY2RzLmNsb3duID8gJ2Nsb3duJyA6ICdibHVlJ1xuICAgIGRyYWdQbGFuZS5zZXRGcm9tTm9ybWFsQW5kQ29wbGFuYXJQb2ludChcbiAgICAgIGNhbWVyYS5nZXRXb3JsZERpcmVjdGlvbihuZXcgVEhSRUUuVmVjdG9yMygpKS5uZWdhdGUoKSwgcG9pbnRcbiAgICApXG4gICAgZHJhZ09mZnNldC5zdWJWZWN0b3JzKG1lc2gucG9zaXRpb24sIHBvaW50KVxuICAgIC8vIEZhY2UgdGhlIENEIHRvd2FyZCB0aGUgY2FtZXJhIHdoaWxlIGRyYWdnaW5nXG4gICAgY29uc3QgY2FtRGlyID0gbmV3IFRIUkVFLlZlY3RvcjMoKVxuICAgIGNhbWVyYS5nZXRXb3JsZERpcmVjdGlvbihjYW1EaXIpXG4gICAgbWVzaC5xdWF0ZXJuaW9uLnNldEZyb21Vbml0VmVjdG9ycyhuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAtMSksIGNhbURpci5uZWdhdGUoKSlcbiAgICBjYW52YXMuc3R5bGUuY3Vyc29yID0gJ2dyYWJiaW5nJ1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIHJldHVyblxuICB9XG5cbiAgLy8gMi4gRWplY3QgZmlzaCBieSBjbGlja2luZyB0aGUga2V5Ym9hcmQga2V5c1xuICBpZiAoa2V5Ym9hcmRNZXNoICYmIGFjdGl2ZUZpc2gpIHtcbiAgICBpZiAocmF5Y2FzdGVyLmludGVyc2VjdE9iamVjdChrZXlib2FyZE1lc2gsIGZhbHNlKS5sZW5ndGggPiAwKSB7XG4gICAgICBlamVjdEZpc2goYWN0aXZlRmlzaClcbiAgICAgIHJldHVyblxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGFsbEhpdHMgPSByYXljYXN0ZXIuaW50ZXJzZWN0T2JqZWN0cyhcbiAgICBbLi4uc2NlbmUuY2hpbGRyZW5dLmZsYXRNYXAobyA9PiB7IGNvbnN0IG0gPSBbXTsgby50cmF2ZXJzZSh4ID0+IHsgaWYgKHguaXNNZXNoKSBtLnB1c2goeCkgfSk7IHJldHVybiBtIH0pLCBmYWxzZVxuICApXG4gIGlmIChhbGxIaXRzLmxlbmd0aCA+IDApIGNvbnNvbGUubG9nKCdIaXQ6JywgYWxsSGl0c1swXS5vYmplY3QubmFtZSlcblxuICAvLyAzLiBUb2dnbGUgYXF1YXJpdW0gbGlnaHQgYnkgY2xpY2tpbmcgdGhlIG1vdXNlIG9iamVjdFxuICBpZiAobW91c2VNZXNoKSB7XG4gICAgaWYgKHJheWNhc3Rlci5pbnRlcnNlY3RPYmplY3QobW91c2VNZXNoLCBmYWxzZSkubGVuZ3RoID4gMCkge1xuICAgICAgdG9nZ2xlQXF1YUxpZ2h0KClcbiAgICAgIHJldHVyblxuICAgIH1cbiAgfVxuXG4gIC8vIDQuIERpcmVjdCB0aGUgYWN0aXZlIGZpc2ggdG93YXJkIGEgc2NyZWVuIGNsaWNrXG4gIGlmIChhY3RpdmVGaXNoKSB7XG4gICAgY29uc3Qgc2NyZWVuSGl0cyA9IHJheWNhc3Rlci5pbnRlcnNlY3RPYmplY3RzKFxuICAgICAgZ2V0TWVzaGVzQnlOYW1lKCdpbWFjJywgJ3ZldHJvJywgJ3NoZWxsJyksIGZhbHNlXG4gICAgKVxuICAgIGlmIChzY3JlZW5IaXRzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IHAgID0gc2NyZWVuSGl0c1swXS5wb2ludFxuICAgICAgY29uc3QgZnMgPSBmaXNoU3RhdGVzW2FjdGl2ZUZpc2hdXG4gICAgICBmcy5jbGlja1RhcmdldCA9IG5ldyBUSFJFRS5WZWN0b3IzKFxuICAgICAgICBUSFJFRS5NYXRoVXRpbHMuY2xhbXAocC54LCB0YW5rLmNlbnRlclggLSB0YW5rLnJhZGl1c1gsIHRhbmsuY2VudGVyWCArIHRhbmsucmFkaXVzWCksXG4gICAgICAgIHRhbmsuY2VudGVyWSxcbiAgICAgICAgVEhSRUUuTWF0aFV0aWxzLmNsYW1wKHAueiwgdGFuay5jZW50ZXJaIC0gdGFuay5yYWRpdXNaLCB0YW5rLmNlbnRlclogKyB0YW5rLnJhZGl1c1opXG4gICAgICApXG4gICAgICBmcy5wYXVzZVVudGlsID0gMFxuICAgIH1cbiAgfVxufSlcblxuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGUgPT4ge1xuICB0b05EQyhlKVxuICByYXljYXN0ZXIuc2V0RnJvbUNhbWVyYShwb2ludGVyLCBjYW1lcmEpXG4gIGlmICghZHJhZ2dpbmcpIHtcbiAgICBjb25zdCBob3ZlciA9IHJheWNhc3Rlci5pbnRlcnNlY3RPYmplY3RzKHZpc2libGVDRHMoKSwgZmFsc2UpXG4gICAgY2FudmFzLnN0eWxlLmN1cnNvciA9IGhvdmVyLmxlbmd0aCA+IDAgPyAnZ3JhYicgOiAnZGVmYXVsdCdcbiAgICByZXR1cm5cbiAgfVxuICBjb25zdCBoaXQgPSBuZXcgVEhSRUUuVmVjdG9yMygpXG4gIGlmIChyYXljYXN0ZXIucmF5LmludGVyc2VjdFBsYW5lKGRyYWdQbGFuZSwgaGl0KSkge1xuICAgIGNkc1tkcmFnZ2luZ10ucG9zaXRpb24uY29weShoaXQuYWRkKGRyYWdPZmZzZXQpKVxuICB9XG59KVxuXG5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGUgPT4ge1xuICBpZiAoIWRyYWdnaW5nKSByZXR1cm5cbiAgdG9OREMoZSlcbiAgcmF5Y2FzdGVyLnNldEZyb21DYW1lcmEocG9pbnRlciwgY2FtZXJhKVxuICBpZiAoaW1hY01lc2ggJiYgcmF5Y2FzdGVyLmludGVyc2VjdE9iamVjdChpbWFjTWVzaCwgZmFsc2UpLmxlbmd0aCA+IDApIHtcbiAgICBpbnNlcnRGaXNoKGRyYWdnaW5nKVxuICB9IGVsc2Uge1xuICAgIHJlc2V0Q0QoZHJhZ2dpbmcpXG4gIH1cbiAgZHJhZ2dpbmcgPSBudWxsXG4gIGNhbnZhcy5zdHlsZS5jdXJzb3IgPSAnZGVmYXVsdCdcbn0pXG5cbi8vIOKUgOKUgOKUgCBGaXNoIGluc2VydGlvbiAmIGVqZWN0aW9uIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5mdW5jdGlvbiBpbnNlcnRGaXNoKGtleSkge1xuICBpZiAoYWN0aXZlRmlzaCAmJiBhY3RpdmVGaXNoICE9PSBrZXkpIGVqZWN0RmlzaChhY3RpdmVGaXNoKVxuICBjb25zdCBmcyA9IGZpc2hTdGF0ZXNba2V5XVxuICBpZiAoIWZzKSByZXR1cm5cblxuICBjZHNba2V5XS52aXNpYmxlID0gZmFsc2VcblxuICAvLyByZXNldCBzd2ltIHN0YXRlXG4gIGZzLmFjdGl2ZSA9IHRydWU7IGZzLmFuZ2xlID0gMDsgZnMuY2xpY2tUYXJnZXQgPSBudWxsOyBmcy5wYXVzZVVudGlsID0gMFxuICBmcy5wb3Muc2V0KHRhbmsuY2VudGVyWCArIHRhbmsucmFkaXVzWCwgdGFuay5jZW50ZXJZLCB0YW5rLmNlbnRlclopXG4gIGZzLmRpci5zZXQoMSwgMCwgMClcbiAgZnMuZ3JvdXAucG9zaXRpb24uY29weShmcy5wb3MpXG4gIGZzLmdyb3VwLnZpc2libGUgPSB0cnVlXG5cbiAgaWYgKGZzLnNvdW5kICYmICFmcy5zb3VuZC5pc1BsYXlpbmcpIGZzLnNvdW5kLnBsYXkoKVxuXG4gIGFjdGl2ZUZpc2ggPSBrZXlcbn1cblxuZnVuY3Rpb24gZWplY3RGaXNoKGtleSkge1xuICBjb25zdCBmcyA9IGZpc2hTdGF0ZXNba2V5XVxuICBpZiAoIWZzKSByZXR1cm5cblxuICBmcy5hY3RpdmUgPSBmYWxzZTsgZnMuY2xpY2tUYXJnZXQgPSBudWxsOyBmcy5wYXVzZVVudGlsID0gMFxuICBmcy5ncm91cC52aXNpYmxlID0gZmFsc2VcblxuICBpZiAoZnMuc291bmQgJiYgZnMuc291bmQuaXNQbGF5aW5nKSBmcy5zb3VuZC5zdG9wKClcbiAgcmVzZXRDRChrZXkpXG4gIGlmIChhY3RpdmVGaXNoID09PSBrZXkpIGFjdGl2ZUZpc2ggPSBudWxsXG59XG5cbmZ1bmN0aW9uIHJlc2V0Q0Qoa2V5KSB7XG4gIGNvbnN0IGNkID0gY2RzW2tleV1cbiAgaWYgKCFjZCkgcmV0dXJuXG4gIGNkLnBvc2l0aW9uLmNvcHkoY2RPcmlnaW5zW2tleV0pXG4gIGNkLnF1YXRlcm5pb24uY29weShjZE9yaWdpblF1YXRzW2tleV0pXG4gIGNkLnZpc2libGUgPSB0cnVlXG59XG5cbi8vIOKUgOKUgOKUgCBGaXNoIG1vdmVtZW50IOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5mdW5jdGlvbiB1cGRhdGVGaXNoKGZzLCBkZWx0YSwgdCkge1xuICBpZiAoIWZzLmFjdGl2ZSB8fCAhZnMuZ3JvdXApIHJldHVyblxuXG4gIGxldCBkZXNpcmVkRGlyID0gbmV3IFRIUkVFLlZlY3RvcjMoKVxuXG4gIC8vIFN0YXRlIDEg4oCUIHN3aW0gdG93YXJkIGNsaWNrIHRhcmdldFxuICBpZiAoZnMuY2xpY2tUYXJnZXQgJiYgZnMucGF1c2VVbnRpbCA8PSB0KSB7XG4gICAgY29uc3QgdG9UYXJnZXQgPSBuZXcgVEhSRUUuVmVjdG9yMygpLnN1YlZlY3RvcnMoZnMuY2xpY2tUYXJnZXQsIGZzLnBvcylcbiAgICBpZiAoTWF0aC5oeXBvdCh0b1RhcmdldC54LCB0b1RhcmdldC56KSA8IEFSUklWRV9ESVNUKSB7XG4gICAgICBmcy5wYXVzZWREaXIuY29weShmcy5kaXIpXG4gICAgICBmcy5wYXVzZVVudGlsICA9IHQgKyBwYXVzZUR1cmF0aW9uXG4gICAgICBmcy5jbGlja1RhcmdldCA9IG51bGxcbiAgICB9IGVsc2Uge1xuICAgICAgZGVzaXJlZERpci5zZXQodG9UYXJnZXQueCwgMCwgdG9UYXJnZXQueikubm9ybWFsaXplKClcbiAgICAgIGZzLnBvcy5hZGRTY2FsZWRWZWN0b3IoZGVzaXJlZERpciwgdGFuay5zcGVlZCAqIDAuMzUgKiBkZWx0YSlcbiAgICB9XG4gIH1cblxuICAvLyBTdGF0ZSAyIOKAlCBwYXVzZSBhdCB0YXJnZXRcbiAgaWYgKGZzLnBhdXNlVW50aWwgPiB0KSB7XG4gICAgZGVzaXJlZERpci5jb3B5KGZzLnBhdXNlZERpcilcbiAgfSBlbHNlIGlmIChmcy5wYXVzZVVudGlsID4gMCkge1xuICAgIC8vIFBhdXNlIGVuZGVkIOKAlCByZS1zeW5jIGVsbGlwc2UgYW5nbGUgdG8gY3VycmVudCBwb3NpdGlvblxuICAgIGZzLmFuZ2xlICAgICAgPSBNYXRoLmF0YW4yKGZzLnBvcy56IC0gdGFuay5jZW50ZXJaLCBmcy5wb3MueCAtIHRhbmsuY2VudGVyWClcbiAgICBmcy5wYXVzZVVudGlsID0gMFxuICB9XG5cbiAgLy8gU3RhdGUgMyDigJQgZnJlZSBlbGxpcHRpY2FsIHN3aW1cbiAgaWYgKCFmcy5jbGlja1RhcmdldCAmJiBmcy5wYXVzZVVudGlsIDw9IHQpIHtcbiAgICBmcy5hbmdsZSArPSB0YW5rLnNwZWVkICogZGVsdGFcbiAgICBmcy5wb3Muc2V0KFxuICAgICAgdGFuay5jZW50ZXJYICsgTWF0aC5jb3MoZnMuYW5nbGUpICogdGFuay5yYWRpdXNYLFxuICAgICAgdGFuay5jZW50ZXJZICsgTWF0aC5zaW4oZnMuYW5nbGUgKiAxLjgpICogMC4wMjUsICAgLy8gZ2VudGxlIHZlcnRpY2FsIHdvYmJsZVxuICAgICAgdGFuay5jZW50ZXJaICsgTWF0aC5zaW4oZnMuYW5nbGUpICogdGFuay5yYWRpdXNaXG4gICAgKVxuICAgIGRlc2lyZWREaXIuc2V0KFxuICAgICAgLU1hdGguc2luKGZzLmFuZ2xlKSAqIHRhbmsucmFkaXVzWCwgMCxcbiAgICAgICBNYXRoLmNvcyhmcy5hbmdsZSkgKiB0YW5rLnJhZGl1c1pcbiAgICApLm5vcm1hbGl6ZSgpXG4gIH1cblxuICBmcy5ncm91cC5wb3NpdGlvbi5jb3B5KGZzLnBvcylcblxuICAvLyBTbW9vdGhseSBpbnRlcnBvbGF0ZSBkaXJlY3Rpb24sIHRoZW4gY29tcG9zZSBxdWF0ZXJuaW9uczpcbiAgLy8gICBmaW5hbCA9IHlhdyh3b3JsZCBZKSAqIG5hdGl2ZVJvdGF0aW9uKFgrOTDCsClcbiAgaWYgKGRlc2lyZWREaXIubGVuZ3RoU3EoKSA+IDAuMDAxKSB7XG4gICAgZnMuZGlyLmxlcnAoZGVzaXJlZERpciwgTWF0aC5taW4oMSwgVFVSTl9TUEVFRCAqIGRlbHRhKSkubm9ybWFsaXplKClcbiAgICBRX1lBVy5zZXRGcm9tQXhpc0FuZ2xlKFdPUkxEX1ksIE1hdGguYXRhbjIoZnMuZGlyLngsIGZzLmRpci56KSArIGZzLm5vc2VPZmZzZXRZKVxuICAgIGZzLmdyb3VwLnF1YXRlcm5pb24ubXVsdGlwbHlRdWF0ZXJuaW9ucyhRX1lBVywgUV9OQVRJVkUpXG4gIH1cbn1cblxuLy8g4pSA4pSA4pSAIE1hdGVyaWFsIHNldHVwIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5mdW5jdGlvbiBzZXR1cE1hdGVyaWFscyhyb290KSB7XG4gIHJvb3QudHJhdmVyc2Uob2JqID0+IHtcbiAgICBpZiAoIW9iai5pc01lc2gpIHJldHVyblxuICAgIG9iai5jYXN0U2hhZG93ICAgID0gdHJ1ZVxuICAgIG9iai5yZWNlaXZlU2hhZG93ID0gdHJ1ZVxuICAgIG9iai5mcnVzdHVtQ3VsbGVkID0gZmFsc2UgICAvLyBwcmV2ZW50IHBvcC1pbiB3aGVuIG1vdmluZyBvYmplY3RzIHZpYSBjb2RlXG5cbiAgICBjb25zdCBtYXQgPSBvYmoubWF0ZXJpYWxcbiAgICBpZiAoIW1hdCkgcmV0dXJuXG4gICAgY29uc3QgbiA9IChvYmoubmFtZSArIG1hdC5uYW1lKS50b0xvd2VyQ2FzZSgpXG5cbiAgICAvLyBBbHBoYSBjdXRvdXQgZm9yIHRoZSBpTWFjIHNjcmVlbiBkZWNvcmF0aW9ucyAocGxhbnRzLCBhbGdhZSwgZXRjLilcbiAgICBpZiAobi5pbmNsdWRlcygnaW1hYycpIHx8IG4uaW5jbHVkZXMoJ2Zsb3dlcnBvdCcpIHx8IG4uaW5jbHVkZXMoJ3BsYW50JykpIHtcbiAgICAgIG1hdC50cmFuc3BhcmVudCA9IHRydWVcbiAgICAgIG1hdC5hbHBoYVRlc3QgICA9IDAuMVxuICAgICAgbWF0LnNpZGUgICAgICAgID0gVEhSRUUuRG91YmxlU2lkZVxuICAgICAgbWF0LmRlcHRoV3JpdGUgID0gdHJ1ZVxuICAgIH1cbiAgfSlcbn1cblxuLy8g4pSA4pSA4pSAIE1vZGVsIGxvYWRpbmcg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmZ1bmN0aW9uIGxvYWRNb2RlbCgpIHtcbiAgcmV0dXJuIG5ldyBHTFRGTG9hZGVyKCkubG9hZEFzeW5jKCcvYXNzZXRzL21vZGVscy9hcXVhcml1bS9hcXVhcml1bS5nbHRmJykudGhlbihnbHRmID0+IHtcbiAgICBjb25zdCByb290ID0gZ2x0Zi5zY2VuZVxuICAgIHNldHVwTWF0ZXJpYWxzKHJvb3QpXG5cbiAgICAvLyBDZW50ZXIgdGhlIHNjZW5lIGF0IHRoZSB3b3JsZCBvcmlnaW5cbiAgICBjb25zdCBib3ggICAgPSBuZXcgVEhSRUUuQm94MygpLnNldEZyb21PYmplY3Qocm9vdClcbiAgICBjb25zdCBjZW50ZXIgPSBib3guZ2V0Q2VudGVyKG5ldyBUSFJFRS5WZWN0b3IzKCkpXG4gICAgY29uc3Qgc2l6ZSAgID0gYm94LmdldFNpemUobmV3IFRIUkVFLlZlY3RvcjMoKSlcbiAgICByb290LnBvc2l0aW9uLnN1YihjZW50ZXIpXG5cbiAgICAvLyBGaXQgY2FtZXJhIHRvIG1vZGVsIHNpemVcbiAgICBjb25zdCBtYXhEaW0gPSBNYXRoLm1heChzaXplLngsIHNpemUueSwgc2l6ZS56KVxuICAgIGNhbWVyYS5wb3NpdGlvbi5zZXQoMCwgbWF4RGltICogMC4yLCBtYXhEaW0gKiAxLjgpXG4gICAgY2FtZXJhLm5lYXIgPSBtYXhEaW0gKiAwLjAxXG4gICAgY2FtZXJhLmZhciAgPSBtYXhEaW0gKiAyMFxuICAgIGNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KClcblxuICAgIC8vIERlcml2ZSB0YW5rIHN3aW0gYm91bmRzIGZyb20gdGhlIFwid2F0ZXJcIiBtZXNoXG4gICAgY29uc3Qgd2F0ZXJNZXNoID0gcm9vdC5nZXRPYmplY3RCeU5hbWUoJ3dhdGVyJylcbiAgICBpZiAod2F0ZXJNZXNoKSB7XG4gICAgICBjb25zdCB3YiA9IG5ldyBUSFJFRS5Cb3gzKCkuc2V0RnJvbU9iamVjdCh3YXRlck1lc2gpXG4gICAgICBjb25zdCB3YyA9IHdiLmdldENlbnRlcihuZXcgVEhSRUUuVmVjdG9yMygpKVxuICAgICAgY29uc3Qgd3MgPSB3Yi5nZXRTaXplKG5ldyBUSFJFRS5WZWN0b3IzKCkpXG4gICAgICB0YW5rLmNlbnRlclggPSB3Yy54OyB0YW5rLmNlbnRlclkgPSB3Yy55OyB0YW5rLmNlbnRlclogPSB3Yy56XG4gICAgICB0YW5rLnJhZGl1c1ggPSB3cy54ICogMC4yODsgdGFuay5yYWRpdXNaID0gd3MueiAqIDAuMjhcbiAgICB9XG5cbiAgICAvLyBQb3NpdGlvbiBhcXVhcml1bSBsaWdodCBhdCBpTWFjIGNlbnRlclxuICAgIGNvbnN0IGltYWNPYmogPSByb290LmdldE9iamVjdEJ5TmFtZSgnaW1hYycpXG4gICAgaWYgKGltYWNPYmopIHtcbiAgICAgIGNvbnN0IGltYWNDZW50ZXIgPSBuZXcgVEhSRUUuQm94MygpLnNldEZyb21PYmplY3QoaW1hY09iaikuZ2V0Q2VudGVyKG5ldyBUSFJFRS5WZWN0b3IzKCkpXG4gICAgICBhcXVhTGlnaHQucG9zaXRpb24uY29weShpbWFjQ2VudGVyKVxuICAgIH1cblxuICAgIGNvbnN0IGxhdmFMYW1wT2JqID0gcm9vdC5nZXRPYmplY3RCeU5hbWUoJ0NvbmUnKVxuICAgIGlmIChsYXZhTGFtcE9iaikge1xuICAgICAgY29uc3QgbGFtcENlbnRlciA9IG5ldyBUSFJFRS5Cb3gzKCkuc2V0RnJvbU9iamVjdChsYXZhTGFtcE9iaikuZ2V0Q2VudGVyKG5ldyBUSFJFRS5WZWN0b3IzKCkpXG4gICAgICBsYXZhTGFtcExpZ2h0LnBvc2l0aW9uLmNvcHkobGFtcENlbnRlcilcbiAgICB9XG5cbiAgICAvLyBJbnRlcmFjdGl2ZSBtZXNoZXNcbiAgICBpbWFjTWVzaCAgICA9IHJvb3QuZ2V0T2JqZWN0QnlOYW1lKCdpbWFjJylcbiAgICBrZXlib2FyZE1lc2ggICA9IHJvb3QuZ2V0T2JqZWN0QnlOYW1lKCd0YXN0aScpXG4gICAgbW91c2VNZXNoICAgPSByb290LmdldE9iamVjdEJ5TmFtZSgnbW91c2VfMScpICAgXG5cbiAgICAvLyBDRHM6IHNhdmUgaW5pdGlhbCB0cmFuc2Zvcm0gZm9yIHJlc2V0XG4gICAgY2RzLmNsb3duID0gcm9vdC5nZXRPYmplY3RCeU5hbWUoJ2NkLWNsb3duJylcbiAgICBjZHMuYmx1ZSAgPSByb290LmdldE9iamVjdEJ5TmFtZSgnY2QtYmx1JylcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBbJ2Nsb3duJywgJ2JsdWUnXSkge1xuICAgICAgaWYgKGNkc1trZXldKSB7XG4gICAgICAgIGNkT3JpZ2luc1trZXldICAgICA9IGNkc1trZXldLnBvc2l0aW9uLmNsb25lKClcbiAgICAgICAgY2RPcmlnaW5RdWF0c1trZXldID0gY2RzW2tleV0ucXVhdGVybmlvbi5jbG9uZSgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRmlzaDogaGlkZGVuIGF0IHN0YXJ0dXAsIHNob3duIHdoZW4gQ0QgaXMgaW5zZXJ0ZWRcbiAgICBjb25zdCBjbG93blJvb3QgPSByb290LmdldE9iamVjdEJ5TmFtZSgnQ0xPV05GSVNIJylcbiAgICBjb25zdCBibHVlUm9vdCAgPSByb290LmdldE9iamVjdEJ5TmFtZSgnQmx1ZV9UYW5nX2N2JylcblxuICAgIGlmIChjbG93blJvb3QpIHsgY2xvd25Sb290LnZpc2libGUgPSBmYWxzZTsgZmlzaFN0YXRlcy5jbG93biA9IG1ha2VGaXNoU3RhdGUoY2xvd25Sb290KSB9XG4gICAgaWYgKGJsdWVSb290KSAgeyBibHVlUm9vdC52aXNpYmxlICA9IGZhbHNlOyBmaXNoU3RhdGVzLmJsdWUgID0gbWFrZUZpc2hTdGF0ZShibHVlUm9vdCwgMCkgfVxuXG4gICAgaWYgKGZpc2hTdGF0ZXMuY2xvd24pIGZpc2hTdGF0ZXMuY2xvd24uc291bmQgPSBsb2FkQXVkaW8oJ2Nsb3duJywgJy9hc3NldHMvbW9kZWxzL2FxdWFyaXVtL2F1ZGlvL3RvdHRvbW9yaS1yZXN0aW5nc2FuZC5tcDMnKVxuICAgIGlmIChmaXNoU3RhdGVzLmJsdWUpICBmaXNoU3RhdGVzLmJsdWUuc291bmQgID0gbG9hZEF1ZGlvKCdibHVlJywgICcvYXNzZXRzL21vZGVscy9hcXVhcml1bS9hdWRpby90b3R0b21vcmktdGVtcGVyYXRlbXVkLm1wMycpXG5cbiAgICAvLyBPbmUgQW5pbWF0aW9uTWl4ZXIgcGVyIGZpc2ggb24gdGhlIHNoYXJlZCByb290XG4gICAgLy8gKGJvdGggbWl4ZXJzIHJlZmVyZW5jZSB0aGUgc2FtZSBjbGlwczsgZWFjaCBvbmx5IGRyaXZlcyBpdHMgb3duIGpvaW50cylcbiAgICBpZiAoZ2x0Zi5hbmltYXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIFsnY2xvd24nLCAnYmx1ZSddKSB7XG4gICAgICAgIGlmICghZmlzaFN0YXRlc1trZXldKSBjb250aW51ZVxuICAgICAgICBmaXNoU3RhdGVzW2tleV0ubWl4ZXIgPSBuZXcgVEhSRUUuQW5pbWF0aW9uTWl4ZXIocm9vdClcbiAgICAgICAgZ2x0Zi5hbmltYXRpb25zLmZvckVhY2goY2xpcCA9PiB7XG4gICAgICAgICAgZmlzaFN0YXRlc1trZXldLm1peGVyLmNsaXBBY3Rpb24oY2xpcCkuc2V0TG9vcChUSFJFRS5Mb29wUmVwZWF0LCBJbmZpbml0eSkucGxheSgpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJvb3RcbiAgfSlcbn1cblxuLy8g4pSA4pSA4pSAIFBvc3QtcHJvY2Vzc2luZyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuZnVuY3Rpb24gc2V0dXBDb21wb3NlcigpIHtcbiAgY29uc3QgY29tcG9zZXIgPSBuZXcgRWZmZWN0Q29tcG9zZXIocmVuZGVyZXIpXG4gIGNvbXBvc2VyLmFkZFBhc3MobmV3IFJlbmRlclBhc3Moc2NlbmUsIGNhbWVyYSkpXG4gIGNvbXBvc2VyLmFkZFBhc3MoYmxvb21QYXNzKVxuICBjb25zdCBjb3B5ID0gbmV3IFNoYWRlclBhc3MoQ29weVNoYWRlcilcbiAgY29weS5yZW5kZXJUb1NjcmVlbiA9IHRydWVcbiAgY29tcG9zZXIuYWRkUGFzcyhjb3B5KVxuICByZXR1cm4gY29tcG9zZXJcbn1cblxuLy8g4pSA4pSA4pSAIEdVSSDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuZnVuY3Rpb24gc2V0dXBHVUkoKSB7XG4gIGNvbnN0IGd1aSA9IG5ldyBHVUkoeyB0aXRsZTogJ0dyYXBoaWNzIFNldHRpbmdzJyB9KVxuXG4gIC8vIEFtYmllbnQgbGlnaHRcbiAgZ3VpLmFkZEZvbGRlcignQW1iaWVudCBsaWdodCcpXG4gICAgIC5hZGQoeyB2OiAwLjUgfSwgJ3YnLCAwLCA1LCAwLjEpLm5hbWUoJ0ludGVuc2l0eScpXG4gICAgIC5vbkNoYW5nZSh2ID0+IHsgYW1iaWVudExpZ2h0LmludGVuc2l0eSA9IHYgfSlcblxuICAvLyBBcXVhcml1bSBsaWdodFxuICBjb25zdCBsZiA9IGd1aS5hZGRGb2xkZXIoJ0FxdWFyaXVtIGxpZ2h0JylcbiAgY29uc3QgbHAgPSB7IG9uOiB0cnVlLCBpbnRlbnNpdHk6IDEwLCBjb2xvcjogJyMwMGQ0ZmYnIH1cbiAgbGYuYWRkKGxwLCAnb24nKS5uYW1lKCdPTiAvIE9GRicpLm9uQ2hhbmdlKHYgPT4ge1xuICAgIGFxdWFMaWdodE9uID0gdlxuICAgIGFxdWFMaWdodC5pbnRlbnNpdHkgPSB2ID8gYXF1YUJhc2VJbnRlbnNpdHkgOiAwXG4gICAgYmxvb21QYXNzLmVuYWJsZWQgICA9IHZcbiAgfSlcbiAgbGYuYWRkKGxwLCAnaW50ZW5zaXR5JywgMCwgNDAsIDAuNSkubmFtZSgnSW50ZW5zaXR5Jykub25DaGFuZ2UodiA9PiB7XG4gICAgYXF1YUJhc2VJbnRlbnNpdHkgPSB2XG4gICAgaWYgKGFxdWFMaWdodE9uKSBhcXVhTGlnaHQuaW50ZW5zaXR5ID0gdlxuICB9KVxuICBsZi5hZGRDb2xvcihscCwgJ2NvbG9yJykubmFtZSgnQ29sb3InKS5vbkNoYW5nZSh2ID0+IGFxdWFMaWdodC5jb2xvci5zZXQodikpXG5cbiAgLy8gU3dpbW1pbmcgcGFyYW1ldGVyc1xuICBjb25zdCBzZiA9IGd1aS5hZGRGb2xkZXIoJ1N3aW1taW5nJylcbiAgc2YuYWRkKHRhbmssICdzcGVlZCcsICAgMCwgICAgMiwgICAgMC4wNSkubmFtZSgnU3BlZWQnKVxuICBzZi5hZGQodGFuaywgJ3JhZGl1c1gnLCAwLjAxLCAwLjUsICAwLjAxKS5uYW1lKCdSYWRpdXMgWCcpXG4gIHNmLmFkZCh0YW5rLCAncmFkaXVzWicsIDAuMDEsIDAuNSwgIDAuMDEpLm5hbWUoJ1JhZGl1cyBaJylcbiAgc2YuYWRkKHsgdjogMi41IH0sICd2JywgMC41LCA1LCAwLjIpLm5hbWUoJ1BhdXNlIGR1cmF0aW9uIChzKScpXG4gICAgIC5vbkNoYW5nZSh2ID0+IHsgcGF1c2VEdXJhdGlvbiA9IHYgfSlcblxuICAvLyBCbG9vbVxuICBjb25zdCBiZiA9IGd1aS5hZGRGb2xkZXIoJ0Jsb29tJylcbiAgYmYuYWRkKHsgb246IHRydWUgfSwgJ29uJykubmFtZSgnT04gLyBPRkYnKS5vbkNoYW5nZSh2ID0+IHsgYmxvb21QYXNzLmVuYWJsZWQgPSBhcXVhTGlnaHRPbiAmJiB2IH0pXG4gIGJmLmFkZChibG9vbVBhc3MsICdzdHJlbmd0aCcsICAwLCAzLCAgIDAuMDUpLm5hbWUoJ1N0cmVuZ3RoJylcbiAgYmYuYWRkKGJsb29tUGFzcywgJ3JhZGl1cycsICAgIDAsIDEsICAgMC4wMSkubmFtZSgnUmFkaXVzJylcbiAgYmYuYWRkKGJsb29tUGFzcywgJ3RocmVzaG9sZCcsIDAsIDEsICAgMC4wMSkubmFtZSgnVGhyZXNob2xkJylcblxuICBndWkuY2xvc2UoKVxufVxuXG4vLyDilIDilIDilIAgUmVuZGVyIGxvb3Ag4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmNvbnN0IGNsb2NrID0gbmV3IFRIUkVFLkNsb2NrKClcblxuZnVuY3Rpb24gYW5pbWF0ZShjb21wb3NlciwgY29udHJvbHMpIHtcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IGFuaW1hdGUoY29tcG9zZXIsIGNvbnRyb2xzKSlcblxuICBjb25zdCBkZWx0YSA9IGNsb2NrLmdldERlbHRhKClcbiAgY29uc3QgdCAgICAgPSBjbG9jay5lbGFwc2VkVGltZVxuXG4gIC8vIFVwZGF0ZSBza2VsZXRhbCBhbmltYXRpb25zIGZvciBib3RoIGZpc2ggKGV2ZW4gd2hlbiBoaWRkZW4sIHNvIHRoZXkgYXJlXG4gIC8vIGFscmVhZHkgbWlkLWN5Y2xlIHdoZW4gdGhleSBhcHBlYXIpXG4gIGZpc2hTdGF0ZXMuY2xvd24/Lm1peGVyPy51cGRhdGUoZGVsdGEpXG4gIGZpc2hTdGF0ZXMuYmx1ZT8ubWl4ZXI/LnVwZGF0ZShkZWx0YSlcblxuICAvLyBVcGRhdGUgc3dpbW1pbmcgbG9naWMgb25seSBmb3IgYWN0aXZlIGZpc2hcbiAgaWYgKGZpc2hTdGF0ZXMuY2xvd24pIHVwZGF0ZUZpc2goZmlzaFN0YXRlcy5jbG93biwgZGVsdGEsIHQpXG4gIGlmIChmaXNoU3RhdGVzLmJsdWUpICB1cGRhdGVGaXNoKGZpc2hTdGF0ZXMuYmx1ZSwgIGRlbHRhLCB0KVxuXG4gIC8vIEZsaWNrZXIgZWZmZWN0IOKAlCBvbmx5IHdoZW4gdGhlIGxpZ2h0IGlzIG9uXG4gIGFxdWFMaWdodC5pbnRlbnNpdHkgPSBhcXVhTGlnaHRPblxuICAgID8gYXF1YUJhc2VJbnRlbnNpdHkgKyBNYXRoLnNpbih0ICogNS4xKSAqIDAuMyArIE1hdGguc2luKHQgKiAyLjcpICogMC4xNVxuICAgIDogMFxuXG4gIGNvbnRyb2xzLnVwZGF0ZSgpXG4gIGNvbXBvc2VyLnJlbmRlcigpXG59XG5cbi8vIOKUgOKUgOKUgCBSZXNpemUg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XG4gIGNhbWVyYS5hc3BlY3QgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodFxuICBjYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpXG4gIHJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodClcbn0pXG5cbi8vIOKUgOKUgOKUgCBCb290c3RyYXAg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbi8vIOKUgOKUgOKUgCBJbnN0cnVjdGlvbnMgb3ZlcmxheSDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcbiBcbmZ1bmN0aW9uIGNyZWF0ZUluc3RydWN0aW9ucygpIHtcbiAgY29uc3QgcGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICBwYW5lbC5zdHlsZS5jc3NUZXh0ID0gYFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBib3R0b206IDI0cHg7XG4gICAgbGVmdDogMjRweDtcbiAgICBjb2xvcjogI2M4ZTZmZjtcbiAgICBmb250LWZhbWlseTogJ0NvdXJpZXIgTmV3JywgbW9ub3NwYWNlO1xuICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICBsaW5lLWhlaWdodDogMS44O1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMCwwLDAsMC41NSk7XG4gICAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDZweCk7XG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgxMDAsMTgwLDI1NSwwLjIpO1xuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgcGFkZGluZzogMTRweCAxOHB4O1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgIG1heC13aWR0aDogMjgwcHg7XG4gIGBcbiAgcGFuZWwuaW5uZXJIVE1MID0gYFxuICAgIDxkaXYgc3R5bGU9XCJmb250LXNpemU6MTVweDtmb250LXdlaWdodDpib2xkO21hcmdpbi1ib3R0b206OHB4O2NvbG9yOiM3ZGQzZmM7XCI+XG4gICAgICDwn5CgIGlNYWMgQXF1YXJpdW1cbiAgICA8L2Rpdj5cbiAgICA8ZGl2Pi0gPGI+RHJhZzwvYj4gYSBDRCBvbnRvIHRoZSBpTWFjPGJyPiZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwO3RvIGluc2VydCBpdDwvZGl2PlxuICAgIDxkaXY+LSA8Yj5UYXA8L2I+IHRoZSBnbGFzcyB0bzxicj4mbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDthdHRyYWN0IHRoZSBmaXNoPC9kaXY+XG4gICAgPGRpdj4tIDxiPkNsaWNrPC9iPiB0aGUga2V5Ym9hcmQga2V5czxicj4mbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDt0byBlamVjdCB0aGUgQ0Q8L2Rpdj5cbiAgICA8ZGl2Pi0gPGI+Q2xpY2s8L2I+IHRoZSBtb3VzZSB0bzxicj4mbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDt0b2dnbGUgdGhlIGFxdWFyaXVtIGxpZ2h0PC9kaXY+XG4gICAgPGRpdj4tIDxiPkRyYWc8L2I+IHRvIG9yYml0IMK3IDxiPlNjcm9sbDwvYj4gdG8gem9vbTwvZGl2PlxuXG4gICAgPGRpdj4gRW5qb3kgdGhlIG11c2ljLCBtYWRlIHdpdGggbG92ZSBieSA8YSBocmVmPVwiaHR0cHM6Ly90b3R0b21vcmkuY29tL1wiIHRhcmdldD1cIl9ibGFua1wiIHN0eWxlPVwiY29sb3I6IzdkZDNmYzt0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lO1wiPlRvdHRvbW9yaTwvYT4gPDMgPC9kaXY+XG4gIGBcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwYW5lbClcbn1cblxuXG5sb2FkTW9kZWwoKS50aGVuKHJvb3QgPT4ge1xuICBzY2VuZS5hZGQocm9vdClcblxuICBjb25zdCBjb250cm9scyA9IG5ldyBPcmJpdENvbnRyb2xzKGNhbWVyYSwgcmVuZGVyZXIuZG9tRWxlbWVudClcbiAgY29udHJvbHMuZW5hYmxlRGFtcGluZyA9IHRydWVcbiAgY29udHJvbHMuZGFtcGluZ0ZhY3RvciA9IDAuMDVcblxuICAvLyBEaXNhYmxlIG9yYml0IHdoaWxlIGRyYWdnaW5nIGEgQ0RcbiAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGUgPT4ge1xuICAgIHRvTkRDKGUpXG4gICAgcmF5Y2FzdGVyLnNldEZyb21DYW1lcmEocG9pbnRlciwgY2FtZXJhKVxuICAgIGlmIChyYXljYXN0ZXIuaW50ZXJzZWN0T2JqZWN0cyh2aXNpYmxlQ0RzKCksIGZhbHNlKS5sZW5ndGggPiAwKVxuICAgICAgY29udHJvbHMuZW5hYmxlZCA9IGZhbHNlXG4gIH0pXG4gIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKCkgPT4geyBjb250cm9scy5lbmFibGVkID0gdHJ1ZSB9KVxuXG4gIGNyZWF0ZUluc3RydWN0aW9ucygpXG4gIHNldHVwR1VJKClcbiAgYW5pbWF0ZShzZXR1cENvbXBvc2VyKCksIGNvbnRyb2xzKVxufSkuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoJ01vZGVsIGxvYWQgZXJyb3I6JywgZXJyKSkiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIlBST0pFQ1RcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rbHRqc19mb3VydGhcIl0gPSBzZWxmW1wid2VicGFja0NodW5rbHRqc19mb3VydGhcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2J1aWxkX3RocmVlX21vZHVsZV9qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX2NvbnRyb2xzX09yYml0Q29udHJvbHNfanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX2xpbC1ndWlfZGlzdF9saWwtZ3VpX2VzbV9qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX2xvYWRlcnNfR0xURkxvYWRlcl9qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX3Bvc3Rwcm9jZXNzaW5nX0VmZmVjdENvbXBvc2VyX2pzLW5vZGVfbW9kdWxlc190aHJlZV9lLWRkOTc3N1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX3Bvc3Rwcm9jZXNzaW5nX1VucmVhbEJsb29tUGFzc19qc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci0xNC9QUk9KRUNULmpzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
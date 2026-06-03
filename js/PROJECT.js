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
/* harmony import */ var three_examples_jsm_controls_DragControls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/controls/DragControls */ "./node_modules/three/examples/jsm/controls/DragControls.js");
/* harmony import */ var three_examples_jsm_loaders_GLTFLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/jsm/loaders/GLTFLoader */ "./node_modules/three/examples/jsm/loaders/GLTFLoader.js");
/* harmony import */ var three_examples_jsm_postprocessing_EffectComposer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three/examples/jsm/postprocessing/EffectComposer */ "./node_modules/three/examples/jsm/postprocessing/EffectComposer.js");
/* harmony import */ var three_examples_jsm_postprocessing_RenderPass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! three/examples/jsm/postprocessing/RenderPass */ "./node_modules/three/examples/jsm/postprocessing/RenderPass.js");
/* harmony import */ var three_examples_jsm_postprocessing_UnrealBloomPass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! three/examples/jsm/postprocessing/UnrealBloomPass */ "./node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js");
/* harmony import */ var three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! three/examples/jsm/postprocessing/ShaderPass */ "./node_modules/three/examples/jsm/postprocessing/ShaderPass.js");
/* harmony import */ var three_examples_jsm_shaders_CopyShader__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! three/examples/jsm/shaders/CopyShader */ "./node_modules/three/examples/jsm/shaders/CopyShader.js");
/* harmony import */ var lil_gui__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lil-gui */ "./node_modules/lil-gui/dist/lil-gui.esm.js");











/* ----- Renderer ----- */

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

const scene  = new three__WEBPACK_IMPORTED_MODULE_0__.Scene()
scene.background = new three__WEBPACK_IMPORTED_MODULE_0__.Color(0x000000)

const camera = new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 100)
camera.position.set(-0.4, 0.6, 3.8)

const canvas = renderer.domElement

/* ----- Lights and BloomPass ----- */

const ambientLight = new three__WEBPACK_IMPORTED_MODULE_0__.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

// positions are updated at load time to match the iMac center and lava lamp positions, respectively
const aquaLight = new three__WEBPACK_IMPORTED_MODULE_0__.PointLight(0x00d4ff, 10, 2) // blue to match imac 
aquaLight.castShadow = true
aquaLight.shadow.mapSize.set(512, 512)
scene.add(aquaLight)

const lavaLampLight = new three__WEBPACK_IMPORTED_MODULE_0__.PointLight(0xe66100, 10, 3) // warm orange
lavaLampLight.castShadow = true
lavaLampLight.shadow.mapSize.set(512, 512)
scene.add(lavaLampLight)

// Base intensity used by the flicker effect
let aquaBaseIntensity = 10
let aquaLightOn       = true   // toggled by clicking the mouse object

const bloomPass = new three_examples_jsm_postprocessing_UnrealBloomPass__WEBPACK_IMPORTED_MODULE_6__.UnrealBloomPass(
  new three__WEBPACK_IMPORTED_MODULE_0__.Vector2(window.innerWidth, window.innerHeight), 0.5, 0.4, 0.1
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
let activeFish = null 

/* ---- Fish rotation constants ---- */
// Fish exported from Blender carry a native +90° rotation on the X axis
// We compose this with the yaw quaternion each frame so the fish always
// stays upright while turning horizontally

const Q_NATIVE = new three__WEBPACK_IMPORTED_MODULE_0__.Quaternion().setFromAxisAngle(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(1, 0, 0), Math.PI / 2)
const Q_YAW    = new three__WEBPACK_IMPORTED_MODULE_0__.Quaternion()
const WORLD_Y  = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 1, 0)

/* ------------ */

const tank = {
  radiusX: 0.16, radiusZ: 0.16, speed: 0.5,
  centerX: 0.0,  centerY: 0.0,  centerZ: 0.0,
}

const ARRIVE_DIST   = 0.03   // arrival threshold 
const TURN_SPEED    = 4.0    // angular interpolation speed (approx rad/s)
let   pauseDuration = 2.5    // seconds the fish pauses at click target

const raycaster  = new three__WEBPACK_IMPORTED_MODULE_0__.Raycaster()
const pointer    = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2()

let imacMesh      = null
let keyboardMesh  = null
let mouseMesh     = null   
let glassMesh     = null
let shellMesh     = null

const cds            = {}   
const cdOrigins      = {}   // initial positions saved at load time
const cdOriginQuats  = {}   // initial quaternions saved at load time


/* ----- Audio ----- */

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

  let desiredDir = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3()

  // swim toward click target
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
      mat.side        = three__WEBPACK_IMPORTED_MODULE_0__.DoubleSide
      mat.depthWrite  = true
    }
  })
}

/* ----- Model loading ----- */

function loadModel() {
  return new three_examples_jsm_loaders_GLTFLoader__WEBPACK_IMPORTED_MODULE_3__.GLTFLoader().loadAsync('/assets/models/aquarium/aquarium.gltf').then(gltf => {
    const root = gltf.scene
    setupShadowsAndMaterials(root)

    // Center the scene at the world origin
    const box    = new three__WEBPACK_IMPORTED_MODULE_0__.Box3().setFromObject(root)
    const center = box.getCenter(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3())
    root.position.sub(center)

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
        fishStates[key].mixer = new three__WEBPACK_IMPORTED_MODULE_0__.AnimationMixer(root)
        gltf.animations.forEach(clip => {
          fishStates[key].mixer.clipAction(clip).setLoop(three__WEBPACK_IMPORTED_MODULE_0__.LoopRepeat, Infinity).play()
        })
      }
    }

    return root
  })
}

/* ----- Post-processing ----- */

function setupComposer() {
  const composer = new three_examples_jsm_postprocessing_EffectComposer__WEBPACK_IMPORTED_MODULE_4__.EffectComposer(renderer)
  composer.addPass(new three_examples_jsm_postprocessing_RenderPass__WEBPACK_IMPORTED_MODULE_5__.RenderPass(scene, camera))
  composer.addPass(bloomPass)
  const copy = new three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_7__.ShaderPass(three_examples_jsm_shaders_CopyShader__WEBPACK_IMPORTED_MODULE_8__.CopyShader)
  copy.renderToScreen = true
  composer.addPass(copy)
  return composer
}

/* ----- GUI ----- */

function setupGUI() {
  const gui = new lil_gui__WEBPACK_IMPORTED_MODULE_9__["default"]({ title: 'Graphics Settings' })

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

const clock = new three__WEBPACK_IMPORTED_MODULE_0__.Clock()

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

  const orbitControls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1__.OrbitControls(camera, renderer.domElement)

  const dragControls = new three_examples_jsm_controls_DragControls__WEBPACK_IMPORTED_MODULE_2__.DragControls(visibleCDs(), camera, renderer.domElement)

  dragControls.addEventListener('dragstart', e => {
    orbitControls.enabled = false
    const camDir = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3()
    camera.getWorldDirection(camDir)
    e.object.quaternion.setFromUnitVectors(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, 1), camDir.negate())
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

/***/ },

/***/ "./node_modules/three/examples/jsm/controls/DragControls.js"
/*!******************************************************************!*\
  !*** ./node_modules/three/examples/jsm/controls/DragControls.js ***!
  \******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DragControls: () => (/* binding */ DragControls)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");


const _plane = new three__WEBPACK_IMPORTED_MODULE_0__.Plane();
const _raycaster = new three__WEBPACK_IMPORTED_MODULE_0__.Raycaster();

const _pointer = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2();
const _offset = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();
const _intersection = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();
const _worldPosition = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();
const _inverseMatrix = new three__WEBPACK_IMPORTED_MODULE_0__.Matrix4();

class DragControls extends three__WEBPACK_IMPORTED_MODULE_0__.EventDispatcher {

	constructor( _objects, _camera, _domElement ) {

		super();

		_domElement.style.touchAction = 'none'; // disable touch scroll

		let _selected = null, _hovered = null;

		const _intersections = [];

		//

		const scope = this;

		function activate() {

			_domElement.addEventListener( 'pointermove', onPointerMove );
			_domElement.addEventListener( 'pointerdown', onPointerDown );
			_domElement.addEventListener( 'pointerup', onPointerCancel );
			_domElement.addEventListener( 'pointerleave', onPointerCancel );

		}

		function deactivate() {

			_domElement.removeEventListener( 'pointermove', onPointerMove );
			_domElement.removeEventListener( 'pointerdown', onPointerDown );
			_domElement.removeEventListener( 'pointerup', onPointerCancel );
			_domElement.removeEventListener( 'pointerleave', onPointerCancel );

			_domElement.style.cursor = '';

		}

		function dispose() {

			deactivate();

		}

		function getObjects() {

			return _objects;

		}

		function getRaycaster() {

			return _raycaster;

		}

		function onPointerMove( event ) {

			if ( scope.enabled === false ) return;

			updatePointer( event );

			_raycaster.setFromCamera( _pointer, _camera );

			if ( _selected ) {

				if ( _raycaster.ray.intersectPlane( _plane, _intersection ) ) {

					_selected.position.copy( _intersection.sub( _offset ).applyMatrix4( _inverseMatrix ) );

				}

				scope.dispatchEvent( { type: 'drag', object: _selected } );

				return;

			}

			// hover support

			if ( event.pointerType === 'mouse' || event.pointerType === 'pen' ) {

				_intersections.length = 0;

				_raycaster.setFromCamera( _pointer, _camera );
				_raycaster.intersectObjects( _objects, true, _intersections );

				if ( _intersections.length > 0 ) {

					const object = _intersections[ 0 ].object;

					_plane.setFromNormalAndCoplanarPoint( _camera.getWorldDirection( _plane.normal ), _worldPosition.setFromMatrixPosition( object.matrixWorld ) );

					if ( _hovered !== object && _hovered !== null ) {

						scope.dispatchEvent( { type: 'hoveroff', object: _hovered } );

						_domElement.style.cursor = 'auto';
						_hovered = null;

					}

					if ( _hovered !== object ) {

						scope.dispatchEvent( { type: 'hoveron', object: object } );

						_domElement.style.cursor = 'pointer';
						_hovered = object;

					}

				} else {

					if ( _hovered !== null ) {

						scope.dispatchEvent( { type: 'hoveroff', object: _hovered } );

						_domElement.style.cursor = 'auto';
						_hovered = null;

					}

				}

			}

		}

		function onPointerDown( event ) {

			if ( scope.enabled === false ) return;

			updatePointer( event );

			_intersections.length = 0;

			_raycaster.setFromCamera( _pointer, _camera );
			_raycaster.intersectObjects( _objects, true, _intersections );

			if ( _intersections.length > 0 ) {

				_selected = ( scope.transformGroup === true ) ? _objects[ 0 ] : _intersections[ 0 ].object;

				_plane.setFromNormalAndCoplanarPoint( _camera.getWorldDirection( _plane.normal ), _worldPosition.setFromMatrixPosition( _selected.matrixWorld ) );

				if ( _raycaster.ray.intersectPlane( _plane, _intersection ) ) {

					_inverseMatrix.copy( _selected.parent.matrixWorld ).invert();
					_offset.copy( _intersection ).sub( _worldPosition.setFromMatrixPosition( _selected.matrixWorld ) );

				}

				_domElement.style.cursor = 'move';

				scope.dispatchEvent( { type: 'dragstart', object: _selected } );

			}


		}

		function onPointerCancel() {

			if ( scope.enabled === false ) return;

			if ( _selected ) {

				scope.dispatchEvent( { type: 'dragend', object: _selected } );

				_selected = null;

			}

			_domElement.style.cursor = _hovered ? 'pointer' : 'auto';

		}

		function updatePointer( event ) {

			const rect = _domElement.getBoundingClientRect();

			_pointer.x = ( event.clientX - rect.left ) / rect.width * 2 - 1;
			_pointer.y = - ( event.clientY - rect.top ) / rect.height * 2 + 1;

		}

		activate();

		// API

		this.enabled = true;
		this.transformGroup = false;

		this.activate = activate;
		this.deactivate = deactivate;
		this.dispose = dispose;
		this.getObjects = getObjects;
		this.getRaycaster = getRaycaster;

	}

}




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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOztVQUVBO1VBQ0E7Ozs7O1dDL0JBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsK0JBQStCLHdDQUF3QztXQUN2RTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlCQUFpQixxQkFBcUI7V0FDdEM7V0FDQTtXQUNBLGtCQUFrQixxQkFBcUI7V0FDdkM7V0FDQTtXQUNBLEtBQUs7V0FDTDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRTs7Ozs7V0MzQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQSw0Rzs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTE0L1BST0pFQ1QuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9ub2RlX21vZHVsZXMvdGhyZWUvZXhhbXBsZXMvanNtL2NvbnRyb2xzL0RyYWdDb250cm9scy5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuaW1wb3J0IHsgT3JiaXRDb250cm9scyB9ICAgZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2NvbnRyb2xzL09yYml0Q29udHJvbHMnXG5pbXBvcnQgeyBEcmFnQ29udHJvbHMgfSAgICBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vY29udHJvbHMvRHJhZ0NvbnRyb2xzJ1xuaW1wb3J0IHsgR0xURkxvYWRlciB9ICAgICAgZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlcidcbmltcG9ydCB7IEVmZmVjdENvbXBvc2VyIH0gIGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9wb3N0cHJvY2Vzc2luZy9FZmZlY3RDb21wb3NlcidcbmltcG9ydCB7IFJlbmRlclBhc3MgfSAgICAgIGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9wb3N0cHJvY2Vzc2luZy9SZW5kZXJQYXNzJ1xuaW1wb3J0IHsgVW5yZWFsQmxvb21QYXNzIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL3Bvc3Rwcm9jZXNzaW5nL1VucmVhbEJsb29tUGFzcydcbmltcG9ydCB7IFNoYWRlclBhc3MgfSAgICAgIGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9wb3N0cHJvY2Vzc2luZy9TaGFkZXJQYXNzJ1xuaW1wb3J0IHsgQ29weVNoYWRlciB9ICAgICAgZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL3NoYWRlcnMvQ29weVNoYWRlcidcbmltcG9ydCBHVUkgICAgICAgICAgICAgICAgIGZyb20gJ2xpbC1ndWknXG5cbi8qIC0tLS0tIFJlbmRlcmVyIC0tLS0tICovXG5cbmNvbnN0IHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoeyBhbnRpYWxpYXM6IHRydWUgfSlcbnJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodClcbnJlbmRlcmVyLnNldFBpeGVsUmF0aW8oTWF0aC5taW4od2luZG93LmRldmljZVBpeGVsUmF0aW8sIDIpKVxucmVuZGVyZXIuc2hhZG93TWFwLmVuYWJsZWQgICA9IHRydWVcbnJlbmRlcmVyLnNoYWRvd01hcC50eXBlICAgICAgPSBUSFJFRS5QQ0ZTb2Z0U2hhZG93TWFwXG5yZW5kZXJlci5vdXRwdXRDb2xvclNwYWNlICAgID0gVEhSRUUuU1JHQkNvbG9yU3BhY2VcbnJlbmRlcmVyLnRvbmVNYXBwaW5nICAgICAgICAgPSBUSFJFRS5BQ0VTRmlsbWljVG9uZU1hcHBpbmdcbnJlbmRlcmVyLnRvbmVNYXBwaW5nRXhwb3N1cmUgPSAxLjBcbmRvY3VtZW50LmJvZHkuc3R5bGUubWFyZ2luICAgPSAnMCdcbmRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJ1xuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci5kb21FbGVtZW50KVxuXG5jb25zdCBzY2VuZSAgPSBuZXcgVEhSRUUuU2NlbmUoKVxuc2NlbmUuYmFja2dyb3VuZCA9IG5ldyBUSFJFRS5Db2xvcigweDAwMDAwMClcblxuY29uc3QgY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKDQ1LCB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodCwgMC4wMSwgMTAwKVxuY2FtZXJhLnBvc2l0aW9uLnNldCgtMC40LCAwLjYsIDMuOClcblxuY29uc3QgY2FudmFzID0gcmVuZGVyZXIuZG9tRWxlbWVudFxuXG4vKiAtLS0tLSBMaWdodHMgYW5kIEJsb29tUGFzcyAtLS0tLSAqL1xuXG5jb25zdCBhbWJpZW50TGlnaHQgPSBuZXcgVEhSRUUuQW1iaWVudExpZ2h0KDB4ZmZmZmZmLCAwLjUpXG5zY2VuZS5hZGQoYW1iaWVudExpZ2h0KVxuXG4vLyBwb3NpdGlvbnMgYXJlIHVwZGF0ZWQgYXQgbG9hZCB0aW1lIHRvIG1hdGNoIHRoZSBpTWFjIGNlbnRlciBhbmQgbGF2YSBsYW1wIHBvc2l0aW9ucywgcmVzcGVjdGl2ZWx5XG5jb25zdCBhcXVhTGlnaHQgPSBuZXcgVEhSRUUuUG9pbnRMaWdodCgweDAwZDRmZiwgMTAsIDIpIC8vIGJsdWUgdG8gbWF0Y2ggaW1hYyBcbmFxdWFMaWdodC5jYXN0U2hhZG93ID0gdHJ1ZVxuYXF1YUxpZ2h0LnNoYWRvdy5tYXBTaXplLnNldCg1MTIsIDUxMilcbnNjZW5lLmFkZChhcXVhTGlnaHQpXG5cbmNvbnN0IGxhdmFMYW1wTGlnaHQgPSBuZXcgVEhSRUUuUG9pbnRMaWdodCgweGU2NjEwMCwgMTAsIDMpIC8vIHdhcm0gb3JhbmdlXG5sYXZhTGFtcExpZ2h0LmNhc3RTaGFkb3cgPSB0cnVlXG5sYXZhTGFtcExpZ2h0LnNoYWRvdy5tYXBTaXplLnNldCg1MTIsIDUxMilcbnNjZW5lLmFkZChsYXZhTGFtcExpZ2h0KVxuXG4vLyBCYXNlIGludGVuc2l0eSB1c2VkIGJ5IHRoZSBmbGlja2VyIGVmZmVjdFxubGV0IGFxdWFCYXNlSW50ZW5zaXR5ID0gMTBcbmxldCBhcXVhTGlnaHRPbiAgICAgICA9IHRydWUgICAvLyB0b2dnbGVkIGJ5IGNsaWNraW5nIHRoZSBtb3VzZSBvYmplY3RcblxuY29uc3QgYmxvb21QYXNzID0gbmV3IFVucmVhbEJsb29tUGFzcyhcbiAgbmV3IFRIUkVFLlZlY3RvcjIod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCksIDAuNSwgMC40LCAwLjFcbilcblxuZnVuY3Rpb24gdG9nZ2xlQXF1YUxpZ2h0KCkge1xuICBhcXVhTGlnaHRPbiA9ICFhcXVhTGlnaHRPblxuICBhcXVhTGlnaHQuaW50ZW5zaXR5ID0gYXF1YUxpZ2h0T24gPyBhcXVhQmFzZUludGVuc2l0eSA6IDBcbiAgYmxvb21QYXNzLmVuYWJsZWQgICA9IGFxdWFMaWdodE9uXG59XG5cbi8qIC0tLS0gRmlzaCBzdGF0ZSBtYW5hZ2VtZW50IC0tLS0gKi9cbi8vIEVhY2ggZmlzaCBoYXMgaXRzIG93biBpbmRlcGVuZGVudCBzdGF0ZTogcG9zaXRpb24sIGRpcmVjdGlvbiwgZWxsaXBzZSBhbmdsZSxcbi8vIGFuaW1hdGlvbiBtaXhlciBhbmQgY2xpY2sgdGFyZ2V0XG4vLyBub3NlT2Zmc2V0WSBjb3JyZWN0cyB0aGUgbW9kZWwtc3BlY2lmaWMgbWlzbWF0Y2ggYmV0d2VlbiB0aGUgbWVzaCdzIGxvY2FsXG4vLyBmb3J3YXJkIGF4aXMgYW5kIHRoZSBzd2ltbWluZyBkaXJlY3Rpb246IGNsb3duIGZpc2ggKE1hdGguUEkgLyAyKSwgYmx1ZSBmaXNoICgwKVxuXG5mdW5jdGlvbiBtYWtlRmlzaFN0YXRlKGdyb3VwLCBub3NlT2Zmc2V0WSA9IE1hdGguUEkgLyAyKSB7XG4gIHJldHVybiB7XG4gICAgZ3JvdXAsXG4gICAgbWl4ZXI6ICAgICAgIG51bGwsXG4gICAgc291bmQ6ICAgICAgIG51bGwsXG4gICAgcG9zOiAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKCksXG4gICAgZGlyOiAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDEsIDAsIDApLFxuICAgIGFuZ2xlOiAgICAgICAwLCAgICAgICAgICAvLyBjdXJyZW50IGFuZ2xlIGFsb25nIHRoZSBlbGxpcHNlXG4gICAgYWN0aXZlOiAgICAgIGZhbHNlLFxuICAgIGNsaWNrVGFyZ2V0OiBudWxsLCAgICAgICAvLyB3b3JsZC1zcGFjZSB0YXJnZXQgc2V0IGJ5IHNjcmVlbiBjbGlja1xuICAgIHBhdXNlVW50aWw6ICAwLCAgICAgICAgICAvLyBjbG9jayB0aW1lIHdoZW4gdGhlIHBhdXNlIGF0IHRhcmdldCBlbmRzXG4gICAgcGF1c2VkRGlyOiAgIG5ldyBUSFJFRS5WZWN0b3IzKCksXG4gICAgbm9zZU9mZnNldFksXG4gIH1cbn1cblxuY29uc3QgZmlzaFN0YXRlcyA9IHt9ICAgLy8gcG9wdWxhdGVkIGluIGxvYWRNb2RlbCgpOiB7IGNsb3duLCBibHVlIH1cbmxldCBhY3RpdmVGaXNoID0gbnVsbCBcblxuLyogLS0tLSBGaXNoIHJvdGF0aW9uIGNvbnN0YW50cyAtLS0tICovXG4vLyBGaXNoIGV4cG9ydGVkIGZyb20gQmxlbmRlciBjYXJyeSBhIG5hdGl2ZSArOTDCsCByb3RhdGlvbiBvbiB0aGUgWCBheGlzXG4vLyBXZSBjb21wb3NlIHRoaXMgd2l0aCB0aGUgeWF3IHF1YXRlcm5pb24gZWFjaCBmcmFtZSBzbyB0aGUgZmlzaCBhbHdheXNcbi8vIHN0YXlzIHVwcmlnaHQgd2hpbGUgdHVybmluZyBob3Jpem9udGFsbHlcblxuY29uc3QgUV9OQVRJVkUgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpLnNldEZyb21BeGlzQW5nbGUobmV3IFRIUkVFLlZlY3RvcjMoMSwgMCwgMCksIE1hdGguUEkgLyAyKVxuY29uc3QgUV9ZQVcgICAgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpXG5jb25zdCBXT1JMRF9ZICA9IG5ldyBUSFJFRS5WZWN0b3IzKDAsIDEsIDApXG5cbi8qIC0tLS0tLS0tLS0tLSAqL1xuXG5jb25zdCB0YW5rID0ge1xuICByYWRpdXNYOiAwLjE2LCByYWRpdXNaOiAwLjE2LCBzcGVlZDogMC41LFxuICBjZW50ZXJYOiAwLjAsICBjZW50ZXJZOiAwLjAsICBjZW50ZXJaOiAwLjAsXG59XG5cbmNvbnN0IEFSUklWRV9ESVNUICAgPSAwLjAzICAgLy8gYXJyaXZhbCB0aHJlc2hvbGQgXG5jb25zdCBUVVJOX1NQRUVEICAgID0gNC4wICAgIC8vIGFuZ3VsYXIgaW50ZXJwb2xhdGlvbiBzcGVlZCAoYXBwcm94IHJhZC9zKVxubGV0ICAgcGF1c2VEdXJhdGlvbiA9IDIuNSAgICAvLyBzZWNvbmRzIHRoZSBmaXNoIHBhdXNlcyBhdCBjbGljayB0YXJnZXRcblxuY29uc3QgcmF5Y2FzdGVyICA9IG5ldyBUSFJFRS5SYXljYXN0ZXIoKVxuY29uc3QgcG9pbnRlciAgICA9IG5ldyBUSFJFRS5WZWN0b3IyKClcblxubGV0IGltYWNNZXNoICAgICAgPSBudWxsXG5sZXQga2V5Ym9hcmRNZXNoICA9IG51bGxcbmxldCBtb3VzZU1lc2ggICAgID0gbnVsbCAgIFxubGV0IGdsYXNzTWVzaCAgICAgPSBudWxsXG5sZXQgc2hlbGxNZXNoICAgICA9IG51bGxcblxuY29uc3QgY2RzICAgICAgICAgICAgPSB7fSAgIFxuY29uc3QgY2RPcmlnaW5zICAgICAgPSB7fSAgIC8vIGluaXRpYWwgcG9zaXRpb25zIHNhdmVkIGF0IGxvYWQgdGltZVxuY29uc3QgY2RPcmlnaW5RdWF0cyAgPSB7fSAgIC8vIGluaXRpYWwgcXVhdGVybmlvbnMgc2F2ZWQgYXQgbG9hZCB0aW1lXG5cblxuLyogLS0tLS0gQXVkaW8gLS0tLS0gKi9cblxuY29uc3QgYXVkaW9MaXN0ZW5lciA9IG5ldyBUSFJFRS5BdWRpb0xpc3RlbmVyKClcbmNhbWVyYS5hZGQoYXVkaW9MaXN0ZW5lcilcblxuZnVuY3Rpb24gbG9hZEF1ZGlvKGtleSwgdXJsKSB7XG4gIGNvbnN0IHNvdW5kID0gbmV3IFRIUkVFLkF1ZGlvKGF1ZGlvTGlzdGVuZXIpXG4gIG5ldyBUSFJFRS5BdWRpb0xvYWRlcigpLmxvYWQoXG4gICAgdXJsLFxuICAgIGJ1ZmZlciA9PiB7IHNvdW5kLnNldEJ1ZmZlcihidWZmZXIpOyBzb3VuZC5zZXRMb29wKHRydWUpOyB9LFxuICAgIHVuZGVmaW5lZCxcbiAgICBlcnIgPT4gY29uc29sZS53YXJuKCdBdWRpbyBsb2FkIGZhaWxlZDonLCBlcnIpXG4gIClcbiAgcmV0dXJuIHNvdW5kXG59XG5cbi8qIC0tLS0tIFV0aWxpdHkgZnVuY3Rpb25zIC0tLS0tICovXG5cbmZ1bmN0aW9uIHRvTkRDKGUpIHsgLy8gQ29udmVydCBzY3JlZW4tc3BhY2UgbW91c2UgY29vcmRpbmF0ZXMgdG8gTm9ybWFsaXplZCBEZXZpY2UgQ29vcmRpbmF0ZXMgZm9yIHJheWNhc3RpbmdcbiAgcG9pbnRlci54ID0gIChlLmNsaWVudFggLyB3aW5kb3cuaW5uZXJXaWR0aCkgICogMiAtIDFcbiAgcG9pbnRlci55ID0gLShlLmNsaWVudFkgLyB3aW5kb3cuaW5uZXJIZWlnaHQpICAqIDIgKyAxXG59XG5cbmZ1bmN0aW9uIHZpc2libGVDRHMoKSB7XG4gIHJldHVybiBPYmplY3QudmFsdWVzKGNkcykuZmlsdGVyKGMgPT4gYz8udmlzaWJsZSlcbn1cblxuLyogLS0tLS0gRXZlbnQgbGlzdGVuZXJzIC0tLS0tICovXG5cbmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBlID0+IHtcbiAgdG9OREMoZSlcbiAgcmF5Y2FzdGVyLnNldEZyb21DYW1lcmEocG9pbnRlciwgY2FtZXJhKVxuXG4gIC8vIEVqZWN0IGZpc2ggYnkgY2xpY2tpbmcgdGhlIGtleWJvYXJkIGtleXNcbiAgaWYgKGtleWJvYXJkTWVzaCAmJiBhY3RpdmVGaXNoKSB7XG4gICAgaWYgKHJheWNhc3Rlci5pbnRlcnNlY3RPYmplY3Qoa2V5Ym9hcmRNZXNoLCBmYWxzZSkubGVuZ3RoID4gMCkge1xuICAgICAgZWplY3RGaXNoKGFjdGl2ZUZpc2gpXG4gICAgICByZXR1cm5cbiAgICB9XG4gIH1cblxuICAvLyBUb2dnbGUgYXF1YXJpdW0gbGlnaHQgYnkgY2xpY2tpbmcgdGhlIG1vdXNlIG9iamVjdFxuICBpZiAobW91c2VNZXNoKSB7XG4gICAgaWYgKHJheWNhc3Rlci5pbnRlcnNlY3RPYmplY3QobW91c2VNZXNoLCBmYWxzZSkubGVuZ3RoID4gMCkge1xuICAgICAgdG9nZ2xlQXF1YUxpZ2h0KClcbiAgICAgIHJldHVyblxuICAgIH1cbiAgfVxuXG4gIC8vIERpcmVjdCB0aGUgYWN0aXZlIGZpc2ggdG93YXJkIGEgc2NyZWVuIGNsaWNrXG4gIGlmIChhY3RpdmVGaXNoKSB7XG4gICAgY29uc3Qgc2NyZWVuSGl0cyA9IHJheWNhc3Rlci5pbnRlcnNlY3RPYmplY3RzKFtnbGFzc01lc2gsIHNoZWxsTWVzaF0pXG4gICAgaWYgKHNjcmVlbkhpdHMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgcCAgPSBzY3JlZW5IaXRzWzBdLnBvaW50XG4gICAgICBjb25zdCBmcyA9IGZpc2hTdGF0ZXNbYWN0aXZlRmlzaF1cbiAgICAgIGZzLmNsaWNrVGFyZ2V0ID0gbmV3IFRIUkVFLlZlY3RvcjMoXG4gICAgICAgIFRIUkVFLk1hdGhVdGlscy5jbGFtcChwLngsIHRhbmsuY2VudGVyWCAtIHRhbmsucmFkaXVzWCwgdGFuay5jZW50ZXJYICsgdGFuay5yYWRpdXNYKSxcbiAgICAgICAgdGFuay5jZW50ZXJZLFxuICAgICAgICBUSFJFRS5NYXRoVXRpbHMuY2xhbXAocC56LCB0YW5rLmNlbnRlclogLSB0YW5rLnJhZGl1c1osIHRhbmsuY2VudGVyWiArIHRhbmsucmFkaXVzWilcbiAgICAgIClcbiAgICAgIGZzLnBhdXNlVW50aWwgPSAwXG4gICAgfVxuICB9XG59KVxuXG5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZSA9PiB7XG4gIHRvTkRDKGUpXG59KVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xuICBjYW1lcmEuYXNwZWN0ID0gd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKVxuICByZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpXG59KVxuXG4vKiAtLS0tLSBGaXNoIGluc2VydGlvbi9lamVjdGlvbiBhbmQgQ0QgcmVzZXQgLS0tLS0gKi9cblxuZnVuY3Rpb24gaW5zZXJ0RmlzaChrZXkpIHtcbiAgaWYgKGFjdGl2ZUZpc2ggJiYgYWN0aXZlRmlzaCAhPT0ga2V5KSBlamVjdEZpc2goYWN0aXZlRmlzaClcbiAgY29uc3QgZnMgPSBmaXNoU3RhdGVzW2tleV1cbiAgaWYgKCFmcykgcmV0dXJuXG5cbiAgY2RzW2tleV0udmlzaWJsZSA9IGZhbHNlXG5cbiAgLy8gcmVzZXQgc3dpbSBzdGF0ZVxuICBmcy5hY3RpdmUgPSB0cnVlOyBmcy5hbmdsZSA9IDA7IGZzLmNsaWNrVGFyZ2V0ID0gbnVsbDsgZnMucGF1c2VVbnRpbCA9IDBcbiAgZnMucG9zLnNldCh0YW5rLmNlbnRlclggKyB0YW5rLnJhZGl1c1gsIHRhbmsuY2VudGVyWSwgdGFuay5jZW50ZXJaKVxuICBmcy5kaXIuc2V0KDEsIDAsIDApXG4gIGZzLmdyb3VwLnBvc2l0aW9uLmNvcHkoZnMucG9zKVxuICBmcy5ncm91cC52aXNpYmxlID0gdHJ1ZVxuXG4gIGlmIChmcy5zb3VuZCAmJiAhZnMuc291bmQuaXNQbGF5aW5nKSBmcy5zb3VuZC5wbGF5KClcblxuICBhY3RpdmVGaXNoID0ga2V5XG59XG5cbmZ1bmN0aW9uIGVqZWN0RmlzaChrZXkpIHtcbiAgY29uc3QgZnMgPSBmaXNoU3RhdGVzW2tleV1cbiAgaWYgKCFmcykgcmV0dXJuXG5cbiAgZnMuYWN0aXZlID0gZmFsc2U7IGZzLmNsaWNrVGFyZ2V0ID0gbnVsbDsgZnMucGF1c2VVbnRpbCA9IDBcbiAgZnMuZ3JvdXAudmlzaWJsZSA9IGZhbHNlXG5cbiAgaWYgKGZzLnNvdW5kICYmIGZzLnNvdW5kLmlzUGxheWluZykgZnMuc291bmQuc3RvcCgpXG4gIHJlc2V0Q0Qoa2V5KVxuICBpZiAoYWN0aXZlRmlzaCA9PT0ga2V5KSBhY3RpdmVGaXNoID0gbnVsbFxufVxuXG5mdW5jdGlvbiByZXNldENEKGtleSkge1xuICBjb25zdCBjZCA9IGNkc1trZXldXG4gIGlmICghY2QpIHJldHVyblxuICBjZC5wb3NpdGlvbi5jb3B5KGNkT3JpZ2luc1trZXldKVxuICBjZC5xdWF0ZXJuaW9uLmNvcHkoY2RPcmlnaW5RdWF0c1trZXldKVxuICBjZC52aXNpYmxlID0gdHJ1ZVxufVxuXG4vKiAtLS0tLSBGaXNoIG1vdmVtZW50IC0tLS0tICovXG5cbmZ1bmN0aW9uIHVwZGF0ZUZpc2goZnMsIGRlbHRhLCB0KSB7XG4gIGlmICghZnMuYWN0aXZlIHx8ICFmcy5ncm91cCkgcmV0dXJuXG5cbiAgbGV0IGRlc2lyZWREaXIgPSBuZXcgVEhSRUUuVmVjdG9yMygpXG5cbiAgLy8gc3dpbSB0b3dhcmQgY2xpY2sgdGFyZ2V0XG4gIGlmIChmcy5jbGlja1RhcmdldCAmJiBmcy5wYXVzZVVudGlsIDw9IHQpIHtcbiAgICBjb25zdCB0b1RhcmdldCA9IG5ldyBUSFJFRS5WZWN0b3IzKCkuc3ViVmVjdG9ycyhmcy5jbGlja1RhcmdldCwgZnMucG9zKVxuICAgIGlmIChNYXRoLmh5cG90KHRvVGFyZ2V0LngsIHRvVGFyZ2V0LnopIDwgQVJSSVZFX0RJU1QpIHtcbiAgICAgIGZzLnBhdXNlZERpci5jb3B5KGZzLmRpcilcbiAgICAgIGZzLnBhdXNlVW50aWwgID0gdCArIHBhdXNlRHVyYXRpb25cbiAgICAgIGZzLmNsaWNrVGFyZ2V0ID0gbnVsbFxuICAgIH0gZWxzZSB7XG4gICAgICBkZXNpcmVkRGlyLnNldCh0b1RhcmdldC54LCAwLCB0b1RhcmdldC56KS5ub3JtYWxpemUoKVxuICAgICAgZnMucG9zLmFkZFNjYWxlZFZlY3RvcihkZXNpcmVkRGlyLCB0YW5rLnNwZWVkICogMC4zNSAqIGRlbHRhKVxuICAgIH1cbiAgfVxuXG4gIC8vIHBhdXNlIGF0IHRhcmdldFxuICBpZiAoZnMucGF1c2VVbnRpbCA+IHQpIHtcbiAgICBkZXNpcmVkRGlyLmNvcHkoZnMucGF1c2VkRGlyKVxuICB9IGVsc2UgaWYgKGZzLnBhdXNlVW50aWwgPiAwKSB7XG4gICAgLy8gcGF1c2UgZW5kZWQsIHJlLXN5bmMgZWxsaXBzZSBhbmdsZSB0byBjdXJyZW50IHBvc2l0aW9uXG4gICAgZnMuYW5nbGUgICAgICA9IE1hdGguYXRhbjIoZnMucG9zLnogLSB0YW5rLmNlbnRlclosIGZzLnBvcy54IC0gdGFuay5jZW50ZXJYKVxuICAgIGZzLnBhdXNlVW50aWwgPSAwXG4gIH1cblxuICAvLyBmcmVlIGVsbGlwdGljYWwgc3dpbVxuICBpZiAoIWZzLmNsaWNrVGFyZ2V0ICYmIGZzLnBhdXNlVW50aWwgPD0gdCkge1xuICAgIGZzLmFuZ2xlICs9IHRhbmsuc3BlZWQgKiBkZWx0YVxuICAgIGZzLnBvcy5zZXQoXG4gICAgICB0YW5rLmNlbnRlclggKyBNYXRoLmNvcyhmcy5hbmdsZSkgKiB0YW5rLnJhZGl1c1gsXG4gICAgICB0YW5rLmNlbnRlclkgKyBNYXRoLnNpbihmcy5hbmdsZSAqIDEuOCkgKiAwLjAyNSwgICAvLyBnZW50bGUgdmVydGljYWwgd29iYmxlXG4gICAgICB0YW5rLmNlbnRlclogKyBNYXRoLnNpbihmcy5hbmdsZSkgKiB0YW5rLnJhZGl1c1pcbiAgICApXG4gICAgZGVzaXJlZERpci5zZXQoXG4gICAgICAtTWF0aC5zaW4oZnMuYW5nbGUpICogdGFuay5yYWRpdXNYLCAwLFxuICAgICAgIE1hdGguY29zKGZzLmFuZ2xlKSAqIHRhbmsucmFkaXVzWlxuICAgICkubm9ybWFsaXplKClcbiAgfVxuXG4gIGZzLmdyb3VwLnBvc2l0aW9uLmNvcHkoZnMucG9zKVxuXG4gIC8vIFNtb290aGx5IGludGVycG9sYXRlIGRpcmVjdGlvbiwgdGhlbiBjb21wb3NlIHF1YXRlcm5pb25zOiB5YXcod29ybGQgWSkgKiBuYXRpdmVSb3RhdGlvbihYKzkwwrApXG4gIGlmIChkZXNpcmVkRGlyLmxlbmd0aFNxKCkgPiAwLjAwMSkge1xuICAgIGZzLmRpci5sZXJwKGRlc2lyZWREaXIsIE1hdGgubWluKDEsIFRVUk5fU1BFRUQgKiBkZWx0YSkpLm5vcm1hbGl6ZSgpXG4gICAgUV9ZQVcuc2V0RnJvbUF4aXNBbmdsZShXT1JMRF9ZLCBNYXRoLmF0YW4yKGZzLmRpci54LCBmcy5kaXIueikgKyBmcy5ub3NlT2Zmc2V0WSlcbiAgICBmcy5ncm91cC5xdWF0ZXJuaW9uLm11bHRpcGx5UXVhdGVybmlvbnMoUV9ZQVcsIFFfTkFUSVZFKVxuICB9XG59XG5cbi8qIC0tLS0tIE1hdGVyaWFsIHNldHVwIC0tLS0tICovXG5cbmZ1bmN0aW9uIHNldHVwU2hhZG93c0FuZE1hdGVyaWFscyhyb290KSB7XG4gIHJvb3QudHJhdmVyc2Uob2JqID0+IHtcbiAgICBpZiAoIW9iai5pc01lc2gpIHJldHVyblxuICAgIG9iai5jYXN0U2hhZG93ICAgID0gdHJ1ZVxuICAgIG9iai5yZWNlaXZlU2hhZG93ID0gdHJ1ZVxuXG4gICAgY29uc3QgbWF0ID0gb2JqLm1hdGVyaWFsXG4gICAgaWYgKCFtYXQpIHJldHVyblxuICAgIGNvbnN0IG4gPSAob2JqLm5hbWUgKyBtYXQubmFtZSkudG9Mb3dlckNhc2UoKVxuXG4gICAgaWYgKG4uaW5jbHVkZXMoJ2ltYWMnKSB8fCBuLmluY2x1ZGVzKCdmbG93ZXJwb3QnKSB8fCBuLmluY2x1ZGVzKCdwbGFudCcpKSB7XG4gICAgICBtYXQudHJhbnNwYXJlbnQgPSB0cnVlXG4gICAgICBtYXQuYWxwaGFUZXN0ICAgPSAwLjFcbiAgICAgIG1hdC5zaWRlICAgICAgICA9IFRIUkVFLkRvdWJsZVNpZGVcbiAgICAgIG1hdC5kZXB0aFdyaXRlICA9IHRydWVcbiAgICB9XG4gIH0pXG59XG5cbi8qIC0tLS0tIE1vZGVsIGxvYWRpbmcgLS0tLS0gKi9cblxuZnVuY3Rpb24gbG9hZE1vZGVsKCkge1xuICByZXR1cm4gbmV3IEdMVEZMb2FkZXIoKS5sb2FkQXN5bmMoJy9hc3NldHMvbW9kZWxzL2FxdWFyaXVtL2FxdWFyaXVtLmdsdGYnKS50aGVuKGdsdGYgPT4ge1xuICAgIGNvbnN0IHJvb3QgPSBnbHRmLnNjZW5lXG4gICAgc2V0dXBTaGFkb3dzQW5kTWF0ZXJpYWxzKHJvb3QpXG5cbiAgICAvLyBDZW50ZXIgdGhlIHNjZW5lIGF0IHRoZSB3b3JsZCBvcmlnaW5cbiAgICBjb25zdCBib3ggICAgPSBuZXcgVEhSRUUuQm94MygpLnNldEZyb21PYmplY3Qocm9vdClcbiAgICBjb25zdCBjZW50ZXIgPSBib3guZ2V0Q2VudGVyKG5ldyBUSFJFRS5WZWN0b3IzKCkpXG4gICAgcm9vdC5wb3NpdGlvbi5zdWIoY2VudGVyKVxuXG4gICAgLy8gRGVyaXZlIHRhbmsgc3dpbSBib3VuZHMgZnJvbSB0aGUgXCJ3YXRlclwiIG1lc2hcbiAgICBjb25zdCB3YXRlck1lc2ggPSByb290LmdldE9iamVjdEJ5TmFtZSgnd2F0ZXInKVxuICAgIGlmICh3YXRlck1lc2gpIHtcbiAgICAgIGNvbnN0IHdiID0gbmV3IFRIUkVFLkJveDMoKS5zZXRGcm9tT2JqZWN0KHdhdGVyTWVzaClcbiAgICAgIGNvbnN0IHdjID0gd2IuZ2V0Q2VudGVyKG5ldyBUSFJFRS5WZWN0b3IzKCkpXG4gICAgICBjb25zdCB3cyA9IHdiLmdldFNpemUobmV3IFRIUkVFLlZlY3RvcjMoKSlcbiAgICAgIHRhbmsuY2VudGVyWCA9IHdjLng7IHRhbmsuY2VudGVyWSA9IHdjLnk7IHRhbmsuY2VudGVyWiA9IHdjLnpcbiAgICAgIHRhbmsucmFkaXVzWCA9IHdzLnggKiAwLjI4OyB0YW5rLnJhZGl1c1ogPSB3cy56ICogMC4yOFxuICAgIH1cblxuICAgIC8vIFBvc2l0aW9uIGFxdWFyaXVtIGxpZ2h0IGF0IGlNYWMgY2VudGVyXG4gICAgY29uc3QgaW1hY09iaiA9IHJvb3QuZ2V0T2JqZWN0QnlOYW1lKCdpbWFjJylcbiAgICBpZiAoaW1hY09iaikge1xuICAgICAgY29uc3QgaW1hY0NlbnRlciA9IG5ldyBUSFJFRS5Cb3gzKCkuc2V0RnJvbU9iamVjdChpbWFjT2JqKS5nZXRDZW50ZXIobmV3IFRIUkVFLlZlY3RvcjMoKSlcbiAgICAgIGFxdWFMaWdodC5wb3NpdGlvbi5jb3B5KGltYWNDZW50ZXIpXG4gICAgfVxuXG4gICAgY29uc3QgbGF2YUxhbXBPYmogPSByb290LmdldE9iamVjdEJ5TmFtZSgnQ29uZScpXG4gICAgaWYgKGxhdmFMYW1wT2JqKSB7XG4gICAgICBjb25zdCBsYW1wQ2VudGVyID0gbmV3IFRIUkVFLkJveDMoKS5zZXRGcm9tT2JqZWN0KGxhdmFMYW1wT2JqKS5nZXRDZW50ZXIobmV3IFRIUkVFLlZlY3RvcjMoKSlcbiAgICAgIGxhdmFMYW1wTGlnaHQucG9zaXRpb24uY29weShsYW1wQ2VudGVyKVxuICAgIH1cblxuICAgIC8vIEludGVyYWN0aXZlIG1lc2hlc1xuICAgIGltYWNNZXNoICAgID0gcm9vdC5nZXRPYmplY3RCeU5hbWUoJ2ltYWMnKVxuICAgIGtleWJvYXJkTWVzaCAgID0gcm9vdC5nZXRPYmplY3RCeU5hbWUoJ3Rhc3RpJylcbiAgICBtb3VzZU1lc2ggICA9IHJvb3QuZ2V0T2JqZWN0QnlOYW1lKCdtb3VzZV8xJykgICBcbiAgICBnbGFzc01lc2ggICA9IHJvb3QuZ2V0T2JqZWN0QnlOYW1lKCd2ZXRybycpXG4gICAgc2hlbGxNZXNoICAgPSByb290LmdldE9iamVjdEJ5TmFtZSgnc2hlbGwnKVxuXG4gICAgLy8gc2F2ZSBpbml0aWFsIENEIHRyYW5zZm9ybSBmb3IgcmVzZXRcbiAgICBjZHMuY2xvd24gPSByb290LmdldE9iamVjdEJ5TmFtZSgnY2QtY2xvd24nKVxuICAgIGNkcy5ibHVlICA9IHJvb3QuZ2V0T2JqZWN0QnlOYW1lKCdjZC1ibHUnKVxuICAgIGZvciAoY29uc3Qga2V5IG9mIFsnY2xvd24nLCAnYmx1ZSddKSB7XG4gICAgICBpZiAoY2RzW2tleV0pIHtcbiAgICAgICAgY2RPcmlnaW5zW2tleV0gICAgID0gY2RzW2tleV0ucG9zaXRpb24uY2xvbmUoKVxuICAgICAgICBjZE9yaWdpblF1YXRzW2tleV0gPSBjZHNba2V5XS5xdWF0ZXJuaW9uLmNsb25lKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBGaXNoOiBoaWRkZW4gYXQgc3RhcnR1cCwgc2hvd24gd2hlbiBDRCBpcyBpbnNlcnRlZFxuICAgIGNvbnN0IGNsb3duUm9vdCA9IHJvb3QuZ2V0T2JqZWN0QnlOYW1lKCdDTE9XTkZJU0gnKVxuICAgIGNvbnN0IGJsdWVSb290ICA9IHJvb3QuZ2V0T2JqZWN0QnlOYW1lKCdCbHVlX1RhbmdfY3YnKVxuXG4gICAgaWYgKGNsb3duUm9vdCkgeyBjbG93blJvb3QudmlzaWJsZSA9IGZhbHNlOyBmaXNoU3RhdGVzLmNsb3duID0gbWFrZUZpc2hTdGF0ZShjbG93blJvb3QpIH1cbiAgICBpZiAoYmx1ZVJvb3QpICB7IGJsdWVSb290LnZpc2libGUgID0gZmFsc2U7IGZpc2hTdGF0ZXMuYmx1ZSAgPSBtYWtlRmlzaFN0YXRlKGJsdWVSb290LCAwKSB9XG5cbiAgICBpZiAoZmlzaFN0YXRlcy5jbG93bikgZmlzaFN0YXRlcy5jbG93bi5zb3VuZCA9IGxvYWRBdWRpbygnY2xvd24nLCAnL2Fzc2V0cy9tb2RlbHMvYXF1YXJpdW0vYXVkaW8vdG90dG9tb3JpLXJlc3RpbmdzYW5kLm1wMycpXG4gICAgaWYgKGZpc2hTdGF0ZXMuYmx1ZSkgIGZpc2hTdGF0ZXMuYmx1ZS5zb3VuZCAgPSBsb2FkQXVkaW8oJ2JsdWUnLCAgJy9hc3NldHMvbW9kZWxzL2FxdWFyaXVtL2F1ZGlvL3RvdHRvbW9yaS10ZW1wZXJhdGVtdWQubXAzJylcblxuICAgIGlmIChnbHRmLmFuaW1hdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgZm9yIChjb25zdCBrZXkgb2YgWydjbG93bicsICdibHVlJ10pIHtcbiAgICAgICAgaWYgKCFmaXNoU3RhdGVzW2tleV0pIGNvbnRpbnVlXG4gICAgICAgIGZpc2hTdGF0ZXNba2V5XS5taXhlciA9IG5ldyBUSFJFRS5BbmltYXRpb25NaXhlcihyb290KVxuICAgICAgICBnbHRmLmFuaW1hdGlvbnMuZm9yRWFjaChjbGlwID0+IHtcbiAgICAgICAgICBmaXNoU3RhdGVzW2tleV0ubWl4ZXIuY2xpcEFjdGlvbihjbGlwKS5zZXRMb29wKFRIUkVFLkxvb3BSZXBlYXQsIEluZmluaXR5KS5wbGF5KClcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcm9vdFxuICB9KVxufVxuXG4vKiAtLS0tLSBQb3N0LXByb2Nlc3NpbmcgLS0tLS0gKi9cblxuZnVuY3Rpb24gc2V0dXBDb21wb3NlcigpIHtcbiAgY29uc3QgY29tcG9zZXIgPSBuZXcgRWZmZWN0Q29tcG9zZXIocmVuZGVyZXIpXG4gIGNvbXBvc2VyLmFkZFBhc3MobmV3IFJlbmRlclBhc3Moc2NlbmUsIGNhbWVyYSkpXG4gIGNvbXBvc2VyLmFkZFBhc3MoYmxvb21QYXNzKVxuICBjb25zdCBjb3B5ID0gbmV3IFNoYWRlclBhc3MoQ29weVNoYWRlcilcbiAgY29weS5yZW5kZXJUb1NjcmVlbiA9IHRydWVcbiAgY29tcG9zZXIuYWRkUGFzcyhjb3B5KVxuICByZXR1cm4gY29tcG9zZXJcbn1cblxuLyogLS0tLS0gR1VJIC0tLS0tICovXG5cbmZ1bmN0aW9uIHNldHVwR1VJKCkge1xuICBjb25zdCBndWkgPSBuZXcgR1VJKHsgdGl0bGU6ICdHcmFwaGljcyBTZXR0aW5ncycgfSlcblxuICBndWkuYWRkRm9sZGVyKCdBbWJpZW50IGxpZ2h0JylcbiAgICAgLmFkZCh7IHY6IDAuNSB9LCAndicsIDAsIDUsIDAuMSkubmFtZSgnSW50ZW5zaXR5JylcbiAgICAgLm9uQ2hhbmdlKHYgPT4geyBhbWJpZW50TGlnaHQuaW50ZW5zaXR5ID0gdiB9KVxuXG4gIGNvbnN0IGxmID0gZ3VpLmFkZEZvbGRlcignQXF1YXJpdW0gbGlnaHQnKVxuICBjb25zdCBscCA9IHsgb246IHRydWUsIGludGVuc2l0eTogMTAsIGNvbG9yOiAnIzAwZDRmZicgfVxuICBsZi5hZGQobHAsICdvbicpLm5hbWUoJ0FjdGl2ZScpLm9uQ2hhbmdlKHYgPT4ge1xuICAgIGFxdWFMaWdodE9uID0gdlxuICAgIGFxdWFMaWdodC5pbnRlbnNpdHkgPSB2ID8gYXF1YUJhc2VJbnRlbnNpdHkgOiAwXG4gICAgYmxvb21QYXNzLmVuYWJsZWQgICA9IHZcbiAgfSlcbiAgbGYuYWRkKGxwLCAnaW50ZW5zaXR5JywgMCwgNDAsIDAuNSkubmFtZSgnSW50ZW5zaXR5Jykub25DaGFuZ2UodiA9PiB7XG4gICAgYXF1YUJhc2VJbnRlbnNpdHkgPSB2XG4gICAgaWYgKGFxdWFMaWdodE9uKSBhcXVhTGlnaHQuaW50ZW5zaXR5ID0gdlxuICB9KVxuICBsZi5hZGRDb2xvcihscCwgJ2NvbG9yJykubmFtZSgnQ29sb3InKS5vbkNoYW5nZSh2ID0+IGFxdWFMaWdodC5jb2xvci5zZXQodikpXG5cbiAgY29uc3Qgc2YgPSBndWkuYWRkRm9sZGVyKCdTd2ltbWluZycpXG4gIHNmLmFkZCh0YW5rLCAnc3BlZWQnLCAgIDAsICAgIDIsICAgIDAuMDUpLm5hbWUoJ1NwZWVkJylcbiAgc2YuYWRkKHRhbmssICdyYWRpdXNYJywgMC4wMSwgMC41LCAgMC4wMSkubmFtZSgnUmFkaXVzIFgnKVxuICBzZi5hZGQodGFuaywgJ3JhZGl1c1onLCAwLjAxLCAwLjUsICAwLjAxKS5uYW1lKCdSYWRpdXMgWicpXG4gIHNmLmFkZCh7IHY6IDIuNSB9LCAndicsIDAuNSwgNSwgMC4yKS5uYW1lKCdQYXVzZSBkdXJhdGlvbiAocyknKVxuICAgICAub25DaGFuZ2UodiA9PiB7IHBhdXNlRHVyYXRpb24gPSB2IH0pXG5cbiAgY29uc3QgYmYgPSBndWkuYWRkRm9sZGVyKCdCbG9vbScpXG4gIGJmLmFkZCh7IG9uOiB0cnVlIH0sICdvbicpLm5hbWUoJ0FjdGl2ZScpLm9uQ2hhbmdlKHYgPT4geyBibG9vbVBhc3MuZW5hYmxlZCA9IGFxdWFMaWdodE9uICYmIHYgfSlcbiAgYmYuYWRkKGJsb29tUGFzcywgJ3N0cmVuZ3RoJywgIDAsIDMsICAgMC4wNSkubmFtZSgnU3RyZW5ndGgnKVxuICBiZi5hZGQoYmxvb21QYXNzLCAncmFkaXVzJywgICAgMCwgMSwgICAwLjAxKS5uYW1lKCdSYWRpdXMnKVxuICBiZi5hZGQoYmxvb21QYXNzLCAndGhyZXNob2xkJywgMCwgMSwgICAwLjAxKS5uYW1lKCdUaHJlc2hvbGQnKVxuXG4gIGd1aS5jbG9zZSgpXG59XG5cbi8vIOKUgOKUgOKUgCBJbnN0cnVjdGlvbnMgb3ZlcmxheSDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcbiBcbmZ1bmN0aW9uIGNyZWF0ZUluc3RydWN0aW9ucygpIHtcbiAgY29uc3QgcGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICBwYW5lbC5zdHlsZS5jc3NUZXh0ID0gYFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBib3R0b206IDI0cHg7XG4gICAgbGVmdDogMjRweDtcbiAgICBjb2xvcjogIzdkZDNmYztcbiAgICBmb250LWZhbWlseTogJ1RyZWJ1Y2hldCBNUycsICdGcnV0aWdlcicsIEFyaWFsLCBzYW5zLXNlcmlmO1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICBsaW5lLWhlaWdodDogMS43O1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsIHJnYmEoMTUsMjUsNTAsMC44KSAwJSwgcmdiYSgyMCw0MCw3MCwwLjg1KSAxMDAlKTtcbiAgICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoMTBweCk7XG4gICAgYm9yZGVyOiAycHggc29saWQgcmdiYSgxMDAsMTgwLDI1NSwwLjUpO1xuICAgIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gICAgcGFkZGluZzogMTZweCAyMHB4O1xuICAgIG1heC13aWR0aDogMzAwcHg7XG4gICAgYm94LXNoYWRvdzogXG4gICAgICAwIDhweCAzMnB4IHJnYmEoMCwwLDAsMC41KSxcbiAgICAgIGluc2V0IDFweCAxcHggMCByZ2JhKDEwMCwxODAsMjU1LDAuMyksXG4gICAgICBpbnNldCAtMXB4IC0xcHggMCByZ2JhKDAsMCwwLDAuNCk7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICBsZXR0ZXItc3BhY2luZzogMC4zcHg7XG4gIGBcbiAgcGFuZWwuaW5uZXJIVE1MID0gYFxuICAgIDxkaXYgc3R5bGU9XCJmb250LXNpemU6MTVweDtmb250LXdlaWdodDpib2xkO21hcmdpbi1ib3R0b206OHB4O2NvbG9yOiM3ZGQzZmM7XCI+XG4gICAgICAu4pymIN2By5YgaU1hYyBBcXVhcml1bSAu4pymIN2By5ZcbiAgICA8L2Rpdj5cbiAgICA8ZGl2Pi0gRHJhZyBhIENEIG9udG8gdGhlIGlNYWMgdG8gaW5zZXJ0IGl0PC9kaXY+XG4gICAgPGRpdj4tIFRhcCB0aGUgZ2xhc3MgdG8gYXR0cmFjdCB0aGUgZmlzaDwvZGl2PlxuICAgIDxkaXY+LSBDbGljayB0aGUga2V5Ym9hcmQga2V5cyB0byBlamVjdCB0aGUgQ0Q8L2Rpdj5cbiAgICA8ZGl2Pi0gQ2xpY2sgdGhlIG1vdXNlIHRvIHRvZ2dsZSB0aGUgYXF1YXJpdW0gbGlnaHQ8L2Rpdj5cbiAgICA8ZGl2Pi0gRW5qb3kgdGhlIG11c2ljLCBtYWRlIGJ5IDxhIGhyZWY9XCJodHRwczovL3RvdHRvbW9yaS5jb20vXCIgdGFyZ2V0PVwiX2JsYW5rXCIgc3R5bGU9XCJjb2xvcjojN2RkM2ZjO3RleHQtZGVjb3JhdGlvbjp1bmRlcmxpbmU7XCI+VG90dG9tb3JpPC9hPiAhIDwvZGl2PlxuICAgIDxkaXY+LSBNYWRlIHdpdGggPDMgYnkgRnJhbmNlc2NhIEd1enppICg8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2ZyYW5jZXNjYWd1enppL2ltYWMtYXF1YXJpdW1cIiB0YXJnZXQ9XCJfYmxhbmtcIiBzdHlsZT1cImNvbG9yOiM3ZGQzZmM7dGV4dC1kZWNvcmF0aW9uOnVuZGVybGluZTtcIj5Tb3VyY2UgY29kZTwvYT4pIDwvZGl2PlxuICBgXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocGFuZWwpXG59XG5cbi8qIC0tLS0tIFJlbmRlciBsb29wIC0tLS0tICovXG5cbmNvbnN0IGNsb2NrID0gbmV3IFRIUkVFLkNsb2NrKClcblxuZnVuY3Rpb24gYW5pbWF0ZShjb21wb3Nlciwgb3JiaXRDb250cm9scykge1xuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gYW5pbWF0ZShjb21wb3Nlciwgb3JiaXRDb250cm9scykpXG5cbiAgY29uc3QgZGVsdGEgPSBjbG9jay5nZXREZWx0YSgpXG4gIGNvbnN0IHQgICAgID0gY2xvY2suZWxhcHNlZFRpbWVcblxuICAvLyBVcGRhdGUgc2tlbGV0YWwgYW5pbWF0aW9ucyBmb3IgYm90aCBmaXNoIChldmVuIHdoZW4gaGlkZGVuLCBzbyB0aGV5IGFyZVxuICAvLyBhbHJlYWR5IG1pZC1jeWNsZSB3aGVuIHRoZXkgYXBwZWFyKVxuICBmaXNoU3RhdGVzLmNsb3duPy5taXhlcj8udXBkYXRlKGRlbHRhKVxuICBmaXNoU3RhdGVzLmJsdWU/Lm1peGVyPy51cGRhdGUoZGVsdGEpXG5cbiAgLy8gVXBkYXRlIHN3aW1taW5nIGxvZ2ljIG9ubHkgZm9yIGFjdGl2ZSBmaXNoXG4gIGlmIChmaXNoU3RhdGVzLmNsb3duKSB1cGRhdGVGaXNoKGZpc2hTdGF0ZXMuY2xvd24sIGRlbHRhLCB0KVxuICBpZiAoZmlzaFN0YXRlcy5ibHVlKSAgdXBkYXRlRmlzaChmaXNoU3RhdGVzLmJsdWUsICBkZWx0YSwgdClcblxuICAvLyBGbGlja2VyIGVmZmVjdCBmb3IgYXF1YXJpdW0gbGlnaHRcbiAgYXF1YUxpZ2h0LmludGVuc2l0eSA9IGFxdWFMaWdodE9uXG4gICAgPyBhcXVhQmFzZUludGVuc2l0eSArIE1hdGguc2luKHQgKiA1LjEpICogMC4zICsgTWF0aC5zaW4odCAqIDIuNykgKiAwLjE1XG4gICAgOiAwXG5cbiAgb3JiaXRDb250cm9scy51cGRhdGUoKVxuICBjb21wb3Nlci5yZW5kZXIoKVxufVxuXG4vKiAtLS0tLSBCb290c3RyYXAgYW5kIENvbnRyb2xzIC0tLS0tICovXG5cbmxvYWRNb2RlbCgpLnRoZW4ocm9vdCA9PiB7XG4gIHNjZW5lLmFkZChyb290KVxuXG4gIGNvbnN0IG9yYml0Q29udHJvbHMgPSBuZXcgT3JiaXRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLmRvbUVsZW1lbnQpXG5cbiAgY29uc3QgZHJhZ0NvbnRyb2xzID0gbmV3IERyYWdDb250cm9scyh2aXNpYmxlQ0RzKCksIGNhbWVyYSwgcmVuZGVyZXIuZG9tRWxlbWVudClcblxuICBkcmFnQ29udHJvbHMuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgZSA9PiB7XG4gICAgb3JiaXRDb250cm9scy5lbmFibGVkID0gZmFsc2VcbiAgICBjb25zdCBjYW1EaXIgPSBuZXcgVEhSRUUuVmVjdG9yMygpXG4gICAgY2FtZXJhLmdldFdvcmxkRGlyZWN0aW9uKGNhbURpcilcbiAgICBlLm9iamVjdC5xdWF0ZXJuaW9uLnNldEZyb21Vbml0VmVjdG9ycyhuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAxKSwgY2FtRGlyLm5lZ2F0ZSgpKVxuICB9KVxuXG4gIGRyYWdDb250cm9scy5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgZSA9PiB7XG4gICAgb3JiaXRDb250cm9scy5lbmFibGVkID0gdHJ1ZVxuXG4gICAgcmF5Y2FzdGVyLnNldEZyb21DYW1lcmEocG9pbnRlciwgY2FtZXJhKVxuICAgIGNvbnN0IGhpdHMgPSByYXljYXN0ZXIuaW50ZXJzZWN0T2JqZWN0KGltYWNNZXNoLCBmYWxzZSlcblxuICAgIGNvbnN0IGtleSA9IGUub2JqZWN0ID09PSBjZHMuY2xvd24gPyAnY2xvd24nIDogJ2JsdWUnXG4gICAgaWYgKGhpdHMubGVuZ3RoID4gMCkge1xuICAgICAgaW5zZXJ0RmlzaChrZXkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc2V0Q0Qoa2V5KVxuICAgIH1cbiAgfSlcblxuICBjcmVhdGVJbnN0cnVjdGlvbnMoKVxuICBzZXR1cEdVSSgpXG4gIGFuaW1hdGUoc2V0dXBDb21wb3NlcigpLCBvcmJpdENvbnRyb2xzKVxuXG59KS5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcignTW9kZWwgbG9hZCBlcnJvcjonLCBlcnIpKSIsImltcG9ydCB7XG5cdEV2ZW50RGlzcGF0Y2hlcixcblx0TWF0cml4NCxcblx0UGxhbmUsXG5cdFJheWNhc3Rlcixcblx0VmVjdG9yMixcblx0VmVjdG9yM1xufSBmcm9tICd0aHJlZSc7XG5cbmNvbnN0IF9wbGFuZSA9IG5ldyBQbGFuZSgpO1xuY29uc3QgX3JheWNhc3RlciA9IG5ldyBSYXljYXN0ZXIoKTtcblxuY29uc3QgX3BvaW50ZXIgPSBuZXcgVmVjdG9yMigpO1xuY29uc3QgX29mZnNldCA9IG5ldyBWZWN0b3IzKCk7XG5jb25zdCBfaW50ZXJzZWN0aW9uID0gbmV3IFZlY3RvcjMoKTtcbmNvbnN0IF93b3JsZFBvc2l0aW9uID0gbmV3IFZlY3RvcjMoKTtcbmNvbnN0IF9pbnZlcnNlTWF0cml4ID0gbmV3IE1hdHJpeDQoKTtcblxuY2xhc3MgRHJhZ0NvbnRyb2xzIGV4dGVuZHMgRXZlbnREaXNwYXRjaGVyIHtcblxuXHRjb25zdHJ1Y3RvciggX29iamVjdHMsIF9jYW1lcmEsIF9kb21FbGVtZW50ICkge1xuXG5cdFx0c3VwZXIoKTtcblxuXHRcdF9kb21FbGVtZW50LnN0eWxlLnRvdWNoQWN0aW9uID0gJ25vbmUnOyAvLyBkaXNhYmxlIHRvdWNoIHNjcm9sbFxuXG5cdFx0bGV0IF9zZWxlY3RlZCA9IG51bGwsIF9ob3ZlcmVkID0gbnVsbDtcblxuXHRcdGNvbnN0IF9pbnRlcnNlY3Rpb25zID0gW107XG5cblx0XHQvL1xuXG5cdFx0Y29uc3Qgc2NvcGUgPSB0aGlzO1xuXG5cdFx0ZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG5cblx0XHRcdF9kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdwb2ludGVybW92ZScsIG9uUG9pbnRlck1vdmUgKTtcblx0XHRcdF9kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdwb2ludGVyZG93bicsIG9uUG9pbnRlckRvd24gKTtcblx0XHRcdF9kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdwb2ludGVydXAnLCBvblBvaW50ZXJDYW5jZWwgKTtcblx0XHRcdF9kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdwb2ludGVybGVhdmUnLCBvblBvaW50ZXJDYW5jZWwgKTtcblxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGRlYWN0aXZhdGUoKSB7XG5cblx0XHRcdF9kb21FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdwb2ludGVybW92ZScsIG9uUG9pbnRlck1vdmUgKTtcblx0XHRcdF9kb21FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdwb2ludGVyZG93bicsIG9uUG9pbnRlckRvd24gKTtcblx0XHRcdF9kb21FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdwb2ludGVydXAnLCBvblBvaW50ZXJDYW5jZWwgKTtcblx0XHRcdF9kb21FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdwb2ludGVybGVhdmUnLCBvblBvaW50ZXJDYW5jZWwgKTtcblxuXHRcdFx0X2RvbUVsZW1lbnQuc3R5bGUuY3Vyc29yID0gJyc7XG5cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBkaXNwb3NlKCkge1xuXG5cdFx0XHRkZWFjdGl2YXRlKCk7XG5cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBnZXRPYmplY3RzKCkge1xuXG5cdFx0XHRyZXR1cm4gX29iamVjdHM7XG5cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBnZXRSYXljYXN0ZXIoKSB7XG5cblx0XHRcdHJldHVybiBfcmF5Y2FzdGVyO1xuXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gb25Qb2ludGVyTW92ZSggZXZlbnQgKSB7XG5cblx0XHRcdGlmICggc2NvcGUuZW5hYmxlZCA9PT0gZmFsc2UgKSByZXR1cm47XG5cblx0XHRcdHVwZGF0ZVBvaW50ZXIoIGV2ZW50ICk7XG5cblx0XHRcdF9yYXljYXN0ZXIuc2V0RnJvbUNhbWVyYSggX3BvaW50ZXIsIF9jYW1lcmEgKTtcblxuXHRcdFx0aWYgKCBfc2VsZWN0ZWQgKSB7XG5cblx0XHRcdFx0aWYgKCBfcmF5Y2FzdGVyLnJheS5pbnRlcnNlY3RQbGFuZSggX3BsYW5lLCBfaW50ZXJzZWN0aW9uICkgKSB7XG5cblx0XHRcdFx0XHRfc2VsZWN0ZWQucG9zaXRpb24uY29weSggX2ludGVyc2VjdGlvbi5zdWIoIF9vZmZzZXQgKS5hcHBseU1hdHJpeDQoIF9pbnZlcnNlTWF0cml4ICkgKTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0c2NvcGUuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAnZHJhZycsIG9iamVjdDogX3NlbGVjdGVkIH0gKTtcblxuXHRcdFx0XHRyZXR1cm47XG5cblx0XHRcdH1cblxuXHRcdFx0Ly8gaG92ZXIgc3VwcG9ydFxuXG5cdFx0XHRpZiAoIGV2ZW50LnBvaW50ZXJUeXBlID09PSAnbW91c2UnIHx8IGV2ZW50LnBvaW50ZXJUeXBlID09PSAncGVuJyApIHtcblxuXHRcdFx0XHRfaW50ZXJzZWN0aW9ucy5sZW5ndGggPSAwO1xuXG5cdFx0XHRcdF9yYXljYXN0ZXIuc2V0RnJvbUNhbWVyYSggX3BvaW50ZXIsIF9jYW1lcmEgKTtcblx0XHRcdFx0X3JheWNhc3Rlci5pbnRlcnNlY3RPYmplY3RzKCBfb2JqZWN0cywgdHJ1ZSwgX2ludGVyc2VjdGlvbnMgKTtcblxuXHRcdFx0XHRpZiAoIF9pbnRlcnNlY3Rpb25zLmxlbmd0aCA+IDAgKSB7XG5cblx0XHRcdFx0XHRjb25zdCBvYmplY3QgPSBfaW50ZXJzZWN0aW9uc1sgMCBdLm9iamVjdDtcblxuXHRcdFx0XHRcdF9wbGFuZS5zZXRGcm9tTm9ybWFsQW5kQ29wbGFuYXJQb2ludCggX2NhbWVyYS5nZXRXb3JsZERpcmVjdGlvbiggX3BsYW5lLm5vcm1hbCApLCBfd29ybGRQb3NpdGlvbi5zZXRGcm9tTWF0cml4UG9zaXRpb24oIG9iamVjdC5tYXRyaXhXb3JsZCApICk7XG5cblx0XHRcdFx0XHRpZiAoIF9ob3ZlcmVkICE9PSBvYmplY3QgJiYgX2hvdmVyZWQgIT09IG51bGwgKSB7XG5cblx0XHRcdFx0XHRcdHNjb3BlLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2hvdmVyb2ZmJywgb2JqZWN0OiBfaG92ZXJlZCB9ICk7XG5cblx0XHRcdFx0XHRcdF9kb21FbGVtZW50LnN0eWxlLmN1cnNvciA9ICdhdXRvJztcblx0XHRcdFx0XHRcdF9ob3ZlcmVkID0gbnVsbDtcblxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICggX2hvdmVyZWQgIT09IG9iamVjdCApIHtcblxuXHRcdFx0XHRcdFx0c2NvcGUuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAnaG92ZXJvbicsIG9iamVjdDogb2JqZWN0IH0gKTtcblxuXHRcdFx0XHRcdFx0X2RvbUVsZW1lbnQuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuXHRcdFx0XHRcdFx0X2hvdmVyZWQgPSBvYmplY3Q7XG5cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdGlmICggX2hvdmVyZWQgIT09IG51bGwgKSB7XG5cblx0XHRcdFx0XHRcdHNjb3BlLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2hvdmVyb2ZmJywgb2JqZWN0OiBfaG92ZXJlZCB9ICk7XG5cblx0XHRcdFx0XHRcdF9kb21FbGVtZW50LnN0eWxlLmN1cnNvciA9ICdhdXRvJztcblx0XHRcdFx0XHRcdF9ob3ZlcmVkID0gbnVsbDtcblxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIG9uUG9pbnRlckRvd24oIGV2ZW50ICkge1xuXG5cdFx0XHRpZiAoIHNjb3BlLmVuYWJsZWQgPT09IGZhbHNlICkgcmV0dXJuO1xuXG5cdFx0XHR1cGRhdGVQb2ludGVyKCBldmVudCApO1xuXG5cdFx0XHRfaW50ZXJzZWN0aW9ucy5sZW5ndGggPSAwO1xuXG5cdFx0XHRfcmF5Y2FzdGVyLnNldEZyb21DYW1lcmEoIF9wb2ludGVyLCBfY2FtZXJhICk7XG5cdFx0XHRfcmF5Y2FzdGVyLmludGVyc2VjdE9iamVjdHMoIF9vYmplY3RzLCB0cnVlLCBfaW50ZXJzZWN0aW9ucyApO1xuXG5cdFx0XHRpZiAoIF9pbnRlcnNlY3Rpb25zLmxlbmd0aCA+IDAgKSB7XG5cblx0XHRcdFx0X3NlbGVjdGVkID0gKCBzY29wZS50cmFuc2Zvcm1Hcm91cCA9PT0gdHJ1ZSApID8gX29iamVjdHNbIDAgXSA6IF9pbnRlcnNlY3Rpb25zWyAwIF0ub2JqZWN0O1xuXG5cdFx0XHRcdF9wbGFuZS5zZXRGcm9tTm9ybWFsQW5kQ29wbGFuYXJQb2ludCggX2NhbWVyYS5nZXRXb3JsZERpcmVjdGlvbiggX3BsYW5lLm5vcm1hbCApLCBfd29ybGRQb3NpdGlvbi5zZXRGcm9tTWF0cml4UG9zaXRpb24oIF9zZWxlY3RlZC5tYXRyaXhXb3JsZCApICk7XG5cblx0XHRcdFx0aWYgKCBfcmF5Y2FzdGVyLnJheS5pbnRlcnNlY3RQbGFuZSggX3BsYW5lLCBfaW50ZXJzZWN0aW9uICkgKSB7XG5cblx0XHRcdFx0XHRfaW52ZXJzZU1hdHJpeC5jb3B5KCBfc2VsZWN0ZWQucGFyZW50Lm1hdHJpeFdvcmxkICkuaW52ZXJ0KCk7XG5cdFx0XHRcdFx0X29mZnNldC5jb3B5KCBfaW50ZXJzZWN0aW9uICkuc3ViKCBfd29ybGRQb3NpdGlvbi5zZXRGcm9tTWF0cml4UG9zaXRpb24oIF9zZWxlY3RlZC5tYXRyaXhXb3JsZCApICk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdF9kb21FbGVtZW50LnN0eWxlLmN1cnNvciA9ICdtb3ZlJztcblxuXHRcdFx0XHRzY29wZS5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdkcmFnc3RhcnQnLCBvYmplY3Q6IF9zZWxlY3RlZCB9ICk7XG5cblx0XHRcdH1cblxuXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gb25Qb2ludGVyQ2FuY2VsKCkge1xuXG5cdFx0XHRpZiAoIHNjb3BlLmVuYWJsZWQgPT09IGZhbHNlICkgcmV0dXJuO1xuXG5cdFx0XHRpZiAoIF9zZWxlY3RlZCApIHtcblxuXHRcdFx0XHRzY29wZS5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdkcmFnZW5kJywgb2JqZWN0OiBfc2VsZWN0ZWQgfSApO1xuXG5cdFx0XHRcdF9zZWxlY3RlZCA9IG51bGw7XG5cblx0XHRcdH1cblxuXHRcdFx0X2RvbUVsZW1lbnQuc3R5bGUuY3Vyc29yID0gX2hvdmVyZWQgPyAncG9pbnRlcicgOiAnYXV0byc7XG5cblx0XHR9XG5cblx0XHRmdW5jdGlvbiB1cGRhdGVQb2ludGVyKCBldmVudCApIHtcblxuXHRcdFx0Y29uc3QgcmVjdCA9IF9kb21FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG5cdFx0XHRfcG9pbnRlci54ID0gKCBldmVudC5jbGllbnRYIC0gcmVjdC5sZWZ0ICkgLyByZWN0LndpZHRoICogMiAtIDE7XG5cdFx0XHRfcG9pbnRlci55ID0gLSAoIGV2ZW50LmNsaWVudFkgLSByZWN0LnRvcCApIC8gcmVjdC5oZWlnaHQgKiAyICsgMTtcblxuXHRcdH1cblxuXHRcdGFjdGl2YXRlKCk7XG5cblx0XHQvLyBBUElcblxuXHRcdHRoaXMuZW5hYmxlZCA9IHRydWU7XG5cdFx0dGhpcy50cmFuc2Zvcm1Hcm91cCA9IGZhbHNlO1xuXG5cdFx0dGhpcy5hY3RpdmF0ZSA9IGFjdGl2YXRlO1xuXHRcdHRoaXMuZGVhY3RpdmF0ZSA9IGRlYWN0aXZhdGU7XG5cdFx0dGhpcy5kaXNwb3NlID0gZGlzcG9zZTtcblx0XHR0aGlzLmdldE9iamVjdHMgPSBnZXRPYmplY3RzO1xuXHRcdHRoaXMuZ2V0UmF5Y2FzdGVyID0gZ2V0UmF5Y2FzdGVyO1xuXG5cdH1cblxufVxuXG5leHBvcnQgeyBEcmFnQ29udHJvbHMgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiUFJPSkVDVFwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtsdGpzX2ZvdXJ0aFwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtsdGpzX2ZvdXJ0aFwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfYnVpbGRfdGhyZWVfbW9kdWxlX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fY29udHJvbHNfT3JiaXRDb250cm9sc19qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfbGlsLWd1aV9kaXN0X2xpbC1ndWlfZXNtX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fbG9hZGVyc19HTFRGTG9hZGVyX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fcG9zdHByb2Nlc3NpbmdfRWZmZWN0Q29tcG9zZXJfanMtbm9kZV9tb2R1bGVzX3RocmVlX2UtZGQ5Nzc3XCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fcG9zdHByb2Nlc3NpbmdfVW5yZWFsQmxvb21QYXNzX2pzXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTE0L1BST0pFQ1QuanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./samples/chapters/chapter-8/forest-solution.js"
/*!*******************************************************!*\
  !*** ./samples/chapters/chapter-8/forest-solution.js ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls.js */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var three_examples_jsm_libs_stats_module_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/libs/stats.module.js */ "./node_modules/three/examples/jsm/libs/stats.module.js");
/* harmony import */ var three_examples_jsm_utils_BufferGeometryUtils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/jsm/utils/BufferGeometryUtils.js */ "./node_modules/three/examples/jsm/utils/BufferGeometryUtils.js");
/* harmony import */ var lil_gui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lil-gui */ "./node_modules/lil-gui/dist/lil-gui.esm.js");
/**
 * Exercise: "Forest under a moving sun"
 * Topics: lighting, shadows, MeshStandardMaterial, geometry merging, instancing
 *
 * Your task: complete the six TODO blocks below so that all three implementations
 * render correctly.  Then switch between them in the GUI.
*/







// â”€â”€â”€ Constants (do not change) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const TREE_COUNT    = 100
const SPREAD        = 10
const TRUNK_H       = 2
const TRUNK_R_TOP   = 0.15
const TRUNK_R_BOT   = 0.25
const FOLIAGE_H     = 4
const FOLIAGE_R     = 1.5
const SEG           = 6

// â”€â”€â”€ Renderer â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const renderer = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
document.body.style.margin   = '0'
document.body.style.overflow = 'hidden'
document.body.appendChild(renderer.domElement)

renderer.shadowMap.enabled = true
renderer.shadowMap.shadowMapType = three__WEBPACK_IMPORTED_MODULE_0__.PCFSoftShadowMap

// â”€â”€â”€ Scene & Camera â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const scene  = new three__WEBPACK_IMPORTED_MODULE_0__.Scene()
scene.background = new three__WEBPACK_IMPORTED_MODULE_0__.Color(0x87ceeb)
// scene.fog        = new THREE.Fog(0x87ceeb, 90, 220) 
// â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// â”‚ QUESTION â€” Which buffer can be used to create fog?
// | Actually, ThreeJS uses a Vertex Shader + a Fragment Shader
// â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

window.scene = scene 

const camera = new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 30, 70)

const controls = new three_examples_jsm_controls_OrbitControls_js__WEBPACK_IMPORTED_MODULE_1__.OrbitControls(camera, renderer.domElement)
controls.target.set(0, 5, 0)
controls.update()

let raycaster = undefined
let intersected = null
let selectAll = false

let pointer = {
  x: -1,
  y: -1
}

window.pointer = pointer

raycaster = new three__WEBPACK_IMPORTED_MODULE_0__.Raycaster()


// â”€â”€â”€ Stats overlay â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const stats = (0,three_examples_jsm_libs_stats_module_js__WEBPACK_IMPORTED_MODULE_2__["default"])()
document.body.appendChild(stats.dom)

// â”€â”€â”€ Ambient light â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const ambient = new three__WEBPACK_IMPORTED_MODULE_0__.AmbientLight(0xffffff, 0.4)
scene.add(ambient)

// â”€â”€â”€ Sun (DirectionalLight) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const sun = new three__WEBPACK_IMPORTED_MODULE_0__.DirectionalLight(0xfff4e0, 2.5)
sun.position.set(80, 80, 20)

sun.castShadow = true
sun.shadow.mapSize.width  = 2048
sun.shadow.mapSize.height = 2048
sun.shadow.camera.near   = 1
sun.shadow.camera.far    = 400
sun.shadow.camera.left   = -110
sun.shadow.camera.right  =  110
sun.shadow.camera.top    =  110
sun.shadow.camera.bottom = -110
sun.shadow.bias = -0.001

scene.add(sun)
scene.add(sun.target)  // the target Object3D must be in the scene too

// â”€â”€â”€ Ground plane â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Roughness map reused from chapter-10 (texture-rougness-map.js) â€” the same
// marble texture that demonstrated roughnessMap there now makes grass look
// uneven under grazing light.  This is the direct Ch.10 â†’ Ch.8 connection.
const loader = new three__WEBPACK_IMPORTED_MODULE_0__.TextureLoader()

const roughnessMap = loader.load('/assets/textures/marble/marble_0008_roughness_2k.jpg', (t) => {
  t.wrapS = t.wrapT = three__WEBPACK_IMPORTED_MODULE_0__.RepeatWrapping
  t.repeat.set(12, 12)
})

const metalnessMap = loader.load('/assets/textures/marble/marble_0008_roughness_2k.jpg', (t) => {
  t.wrapS = t.wrapT = three__WEBPACK_IMPORTED_MODULE_0__.RepeatWrapping
  t.repeat.set(12, 12)
})

const groundMat = new three__WEBPACK_IMPORTED_MODULE_0__.MeshStandardMaterial({
  color:        0x4a7c3f,
  roughness:    0.9,
  metalness:    0.0,
  roughnessMap,
  metalnessMap
})

const ground = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(
  new three__WEBPACK_IMPORTED_MODULE_0__.PlaneGeometry((SPREAD + 5) * 2, (SPREAD + 5) * 2),
  groundMat
)
ground.rotation.x    = -Math.PI / 2
ground.receiveShadow = true
scene.add(ground)

// â”€â”€â”€ Shared prototype geometries (never mutate these) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const baseTrunkGeo   = new three__WEBPACK_IMPORTED_MODULE_0__.CylinderGeometry(TRUNK_R_TOP, TRUNK_R_BOT, TRUNK_H, SEG)
const baseFoliageGeo = new three__WEBPACK_IMPORTED_MODULE_0__.ConeGeometry(FOLIAGE_R, FOLIAGE_H, SEG)

let facePerCone = baseFoliageGeo.index.count / 3
let vertexPerCone = baseFoliageGeo.attributes.position.count

// â”€â”€â”€ Colour helpers (provided) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const randomGreen = () =>
  new three__WEBPACK_IMPORTED_MODULE_0__.Color(
    0.05 + Math.random() * 0.06,
    0.28 + Math.random() * 0.28,
    0.03 + Math.random() * 0.05
  )

const randomBrown = () =>
  new three__WEBPACK_IMPORTED_MODULE_0__.Color(
    0.28 + Math.random() * 0.22,
    0.12 + Math.random() * 0.10,
    0.01 + Math.random() * 0.04
  )

const randomPos = () => ({
  x: (Math.random() - 0.5) * 2 * SPREAD,
  z: (Math.random() - 0.5) * 2 * SPREAD
})

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
//  Implementation 1 â€” NAIVE
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function buildNaiveForest() {
  const root       = new three__WEBPACK_IMPORTED_MODULE_0__.Group()
  const trunkMat   = new three__WEBPACK_IMPORTED_MODULE_0__.MeshStandardMaterial({ color: 0x8b4513 })
  const foliageMat = new three__WEBPACK_IMPORTED_MODULE_0__.MeshStandardMaterial({ color: 0x228b22 })

  for (let i = 0; i < TREE_COUNT; i++) {
    const { x, z } = randomPos()
    const scale     = 0.7 + Math.random() * 0.6

    const tree = new three__WEBPACK_IMPORTED_MODULE_0__.Group()
    tree.position.set(x, 0, z)
    tree.scale.setScalar(scale)
    const trunk = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(baseTrunkGeo, trunkMat.clone())
    trunk.position.y = TRUNK_H / 2   
    trunk.castShadow    = true
    trunk.receiveShadow = true
    trunk.material.color.copy(randomBrown())

    const foliage = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(baseFoliageGeo, foliageMat.clone())
    foliage.position.y = TRUNK_H + FOLIAGE_H / 2  
    foliage.castShadow    = true
    foliage.receiveShadow = true
    foliage.material.color.copy(randomGreen())
    foliage.layers.enable(1)
    
    tree.add(trunk, foliage)
    root.add(tree)
  }
  return root
}

function intersectNaiveGeometry(){
  // console.log("intersection running")
  if (raycaster) {
    raycaster.setFromCamera(pointer, camera)
    const objs = scene.children
    const intersects = raycaster.intersectObjects(objs, true)

    raycaster.layers.set(1)
    
    console.log(intersects)

    if (intersects.length > 0) {
      if (intersected != intersects[0].object) {
        if (intersected) intersected.material.color.copy(randomGreen())
        intersected = intersects[0].object
        intersected.currentColor = intersected.material.color
        intersected.material.color.copy(randomBrown())
        console.log(intersects[0])
      }
    }
  }
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
//  Implementation 2 â€” MERGED
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function buildMergedForest() {
  const trunkGeos   = []
  const foliageGeos = []

  for (let i = 0; i < TREE_COUNT; i++) {
    const { x, z } = randomPos()
    const scale     = 0.7 + Math.random() * 0.6
    // step 1
    const tg = baseTrunkGeo.clone()
    tg.applyMatrix4(
      new three__WEBPACK_IMPORTED_MODULE_0__.Matrix4()
        .makeTranslation(x,  (TRUNK_H / 2) * scale,  z)
        .multiply(new three__WEBPACK_IMPORTED_MODULE_0__.Matrix4().makeScale(scale, scale, scale))
    )

    // step 2
    const col      = randomBrown()                 // (or randomGreen())
    const vertCount = tg.attributes.position.count
    const colorArr  = new Float32Array(vertCount * 3)
    for (let v = 0; v < vertCount; v++) {
      colorArr[v*3]   = col.r
      colorArr[v*3+1] = col.g
      colorArr[v*3+2] = col.b
    }
    tg.setAttribute('color', new three__WEBPACK_IMPORTED_MODULE_0__.BufferAttribute(colorArr, 3))
    trunkGeos.push(tg)

    // step 1
    const fg = baseFoliageGeo.clone()
    fg.applyMatrix4(
      new three__WEBPACK_IMPORTED_MODULE_0__.Matrix4()
        .makeTranslation(x, TRUNK_H + FOLIAGE_H / 2 * scale,  z)
        .multiply(new three__WEBPACK_IMPORTED_MODULE_0__.Matrix4().makeScale(scale, scale, scale))
    )

    // step 2
    const colf       = randomGreen()
    const vertCountf = fg.attributes.position.count
    const colorArrf  = new Float32Array(vertCountf * 3)
    for (let v = 0; v < vertCount; v++) {
      colorArrf[v*3]   = colf.r
      colorArrf[v*3+1] = colf.g
      colorArrf[v*3+2] = colf.b
    }

    fg.setAttribute('color', new three__WEBPACK_IMPORTED_MODULE_0__.BufferAttribute(colorArrf, 3))
    foliageGeos.push(fg)

  }

  const trunkMesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(
    (0,three_examples_jsm_utils_BufferGeometryUtils_js__WEBPACK_IMPORTED_MODULE_3__.mergeBufferGeometries)(trunkGeos),
    new three__WEBPACK_IMPORTED_MODULE_0__.MeshStandardMaterial({ vertexColors: true })
  )
  trunkMesh.castShadow    = true
  trunkMesh.receiveShadow = true

  const foliageMesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(
    (0,three_examples_jsm_utils_BufferGeometryUtils_js__WEBPACK_IMPORTED_MODULE_3__.mergeBufferGeometries)(foliageGeos),
    new three__WEBPACK_IMPORTED_MODULE_0__.MeshStandardMaterial({ vertexColors: true })
  )
  foliageMesh.castShadow    = true
  foliageMesh.receiveShadow = true
  foliageMesh.layers.enable(1)

  const root = new three__WEBPACK_IMPORTED_MODULE_0__.Group()
  root.add(trunkMesh, foliageMesh)
  
  return root

}

let hitFaceIndex = -1

function setTreeColor(foliageMesh, treeIndex, color) {

  const colorAttr = foliageMesh.geometry.attributes.color
  const start = treeIndex * vertexPerCone
  
  for (let v = start; v < start + vertexPerCone; v++) {
    colorAttr.setXYZ(v, color.r, color.g, color.b)
  }
  colorAttr.needsUpdate = true
}

function intersectMergedGeometry(){
  if (raycaster) {
    raycaster.setFromCamera(pointer, camera)
    const objs = scene.children
    const intersects = raycaster.intersectObjects(objs, true)

    raycaster.layers.set(1)

    let hitTreeIndex = -1

    if (intersects.length > 0) {

       hitFaceIndex = intersects[0].faceIndex

       hitTreeIndex = Math.floor(hitFaceIndex / facePerCone)

       console.log("Hit tree with index", hitTreeIndex)

      const foliageMesh = intersects[0].object
      
      if (hitTreeIndex !== -1)
        setTreeColor(foliageMesh, hitTreeIndex, randomBrown())

      
    }
  }
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
//  Implementation 3 â€” INSTANCED
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function buildInstancedForest() {
  const trunkMat   = new three__WEBPACK_IMPORTED_MODULE_0__.MeshStandardMaterial({ color: 0x8b4513 })
  const foliageMat = new three__WEBPACK_IMPORTED_MODULE_0__.MeshStandardMaterial({ color: 0xffffff })

  const trunkIM   = new three__WEBPACK_IMPORTED_MODULE_0__.InstancedMesh(baseTrunkGeo,   trunkMat,   TREE_COUNT)
  const foliageIM = new three__WEBPACK_IMPORTED_MODULE_0__.InstancedMesh(baseFoliageGeo, foliageMat, TREE_COUNT)

  trunkIM.castShadows = true
  trunkIM.receiveShadows = true

  const dummy = new three__WEBPACK_IMPORTED_MODULE_0__.Object3D()

  for (let i = 0; i < TREE_COUNT; i++) {
    const { x, z } = randomPos()
    const scale     = 0.7 + Math.random() * 0.6

    dummy.position.set(x,  (TRUNK_H / 2) * scale,  z)
    dummy.scale.setScalar(scale)
    dummy.updateMatrix()
    trunkIM.setMatrixAt(i, dummy.matrix)
  
    dummy.position.set(x,  (TRUNK_H + FOLIAGE_H / 2) * scale,  z)
    dummy.updateMatrix()          // scale is still set from above
    foliageIM.setMatrixAt(i, dummy.matrix)

    trunkIM.setColorAt(i,   randomBrown())
    foliageIM.setColorAt(i, randomGreen())
  }

  trunkIM.instanceMatrix.needsUpdate   = true
  foliageIM.instanceMatrix.needsUpdate = true
  trunkIM.instanceColor.needsUpdate    = true
  foliageIM.instanceColor.needsUpdate  = true

  const root = new three__WEBPACK_IMPORTED_MODULE_0__.Group()
  root.add(trunkIM, foliageIM)   
  return root
}

// â”€â”€â”€ Scene switching (provided) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
let forestGroup = null

function loadImplementation(name) {
  if (forestGroup) {
    scene.remove(forestGroup)
    forestGroup.traverse((obj) => {
      if (!obj.isMesh) return
      obj.geometry.dispose()
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
      mats.forEach((m) => m.dispose())
    })
  }

  console.time(name + ' build')
  switch (name) {
    case 'Naive':     forestGroup = buildNaiveForest();     break
    case 'Merged':    forestGroup = buildMergedForest();    break
    case 'Instanced': forestGroup = buildInstancedForest(); break
  }
  console.timeEnd(name + ' build')

  scene.add(forestGroup)
}

// â”€â”€â”€ GUI (provided) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const guiState = { implementation: 'Merged', sunSpeed: 0.12, shadows: true }

const gui = new lil_gui__WEBPACK_IMPORTED_MODULE_4__["default"]({ title: 'Forest Benchmark' })
gui.add(guiState, 'implementation', ['Naive', 'Merged', 'Instanced'])
   .name('Implementation')
   .onChange((v) => loadImplementation(v))
gui.add(guiState, 'sunSpeed', 0, 0.5, 0.01).name('Sun speed')
gui.add(guiState, 'shadows').name('Shadows on').onChange((v) => {
  renderer.shadowMap.enabled = v
  scene.traverse((obj) => { if (obj.isMesh) obj.material.needsUpdate = true })
})

// â”€â”€â”€ Benchmark stats panel (provided) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const bench = { fps: 0, drawCalls: 0, triangles: 0, geometries: 0 }
const bf    = gui.addFolder('Renderer stats â€” record these')
bf.add(bench, 'fps').listen().disable()
bf.add(bench, 'drawCalls').name('draw calls').listen().disable()
bf.add(bench, 'triangles').listen().disable()
bf.add(bench, 'geometries').listen().disable()
bf.open()

// â”€â”€â”€ Resize (provided) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

window.addEventListener('mousemove', (event) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
    })


// â”€â”€â”€ Animation loop â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const clock      = new three__WEBPACK_IMPORTED_MODULE_0__.Clock()
let frameCount   = 0
let fpsTimestamp = 0

function animate(now) {
  requestAnimationFrame(animate)
  frameCount++

  const t = clock.getElapsedTime()

  // Provided: colour-tint the sun warmer near the horizon, cooler at noon.
  const elev = sun.position.y / 100
  sun.color.setHSL(0.10 - elev * 0.04, 0.95, 0.45 + elev * 0.35)
  ambient.intensity = 0.15 + elev * 0.45

  controls.update()
  renderer.render(scene, camera)
  stats.update()

  if (now - fpsTimestamp >= 500) {
    bench.fps         = Math.round(frameCount * 2)
    bench.drawCalls   = renderer.info.render.calls
    bench.triangles   = renderer.info.render.triangles
    bench.geometries  = renderer.info.memory.geometries
    frameCount        = 0
    fpsTimestamp      = now
  }

  // intersectNaiveGeometry()
  intersectMergedGeometry()
}

// â”€â”€â”€ Boot â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
loadImplementation(guiState.implementation)
animate(0)

/***/ },

/***/ "./node_modules/three/examples/jsm/libs/stats.module.js"
/*!**************************************************************!*\
  !*** ./node_modules/three/examples/jsm/libs/stats.module.js ***!
  \**************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Stats = function () {

	var mode = 0;

	var container = document.createElement( 'div' );
	container.style.cssText = 'position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000';
	container.addEventListener( 'click', function ( event ) {

		event.preventDefault();
		showPanel( ++ mode % container.children.length );

	}, false );

	//

	function addPanel( panel ) {

		container.appendChild( panel.dom );
		return panel;

	}

	function showPanel( id ) {

		for ( var i = 0; i < container.children.length; i ++ ) {

			container.children[ i ].style.display = i === id ? 'block' : 'none';

		}

		mode = id;

	}

	//

	var beginTime = ( performance || Date ).now(), prevTime = beginTime, frames = 0;

	var fpsPanel = addPanel( new Stats.Panel( 'FPS', '#0ff', '#002' ) );
	var msPanel = addPanel( new Stats.Panel( 'MS', '#0f0', '#020' ) );

	if ( self.performance && self.performance.memory ) {

		var memPanel = addPanel( new Stats.Panel( 'MB', '#f08', '#201' ) );

	}

	showPanel( 0 );

	return {

		REVISION: 16,

		dom: container,

		addPanel: addPanel,
		showPanel: showPanel,

		begin: function () {

			beginTime = ( performance || Date ).now();

		},

		end: function () {

			frames ++;

			var time = ( performance || Date ).now();

			msPanel.update( time - beginTime, 200 );

			if ( time >= prevTime + 1000 ) {

				fpsPanel.update( ( frames * 1000 ) / ( time - prevTime ), 100 );

				prevTime = time;
				frames = 0;

				if ( memPanel ) {

					var memory = performance.memory;
					memPanel.update( memory.usedJSHeapSize / 1048576, memory.jsHeapSizeLimit / 1048576 );

				}

			}

			return time;

		},

		update: function () {

			beginTime = this.end();

		},

		// Backwards Compatibility

		domElement: container,
		setMode: showPanel

	};

};

Stats.Panel = function ( name, fg, bg ) {

	var min = Infinity, max = 0, round = Math.round;
	var PR = round( window.devicePixelRatio || 1 );

	var WIDTH = 80 * PR, HEIGHT = 48 * PR,
		TEXT_X = 3 * PR, TEXT_Y = 2 * PR,
		GRAPH_X = 3 * PR, GRAPH_Y = 15 * PR,
		GRAPH_WIDTH = 74 * PR, GRAPH_HEIGHT = 30 * PR;

	var canvas = document.createElement( 'canvas' );
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	canvas.style.cssText = 'width:80px;height:48px';

	var context = canvas.getContext( '2d' );
	context.font = 'bold ' + ( 9 * PR ) + 'px Helvetica,Arial,sans-serif';
	context.textBaseline = 'top';

	context.fillStyle = bg;
	context.fillRect( 0, 0, WIDTH, HEIGHT );

	context.fillStyle = fg;
	context.fillText( name, TEXT_X, TEXT_Y );
	context.fillRect( GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT );

	context.fillStyle = bg;
	context.globalAlpha = 0.9;
	context.fillRect( GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT );

	return {

		dom: canvas,

		update: function ( value, maxValue ) {

			min = Math.min( min, value );
			max = Math.max( max, value );

			context.fillStyle = bg;
			context.globalAlpha = 1;
			context.fillRect( 0, 0, WIDTH, GRAPH_Y );
			context.fillStyle = fg;
			context.fillText( round( value ) + ' ' + name + ' (' + round( min ) + '-' + round( max ) + ')', TEXT_X, TEXT_Y );

			context.drawImage( canvas, GRAPH_X + PR, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT, GRAPH_X, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT );

			context.fillRect( GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, GRAPH_HEIGHT );

			context.fillStyle = bg;
			context.globalAlpha = 0.9;
			context.fillRect( GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, round( ( 1 - ( value / maxValue ) ) * GRAPH_HEIGHT ) );

		}

	};

};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Stats);


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
/******/ 			"forest-solution": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","vendors-node_modules_three_examples_jsm_utils_BufferGeometryUtils_js"], () => (__webpack_require__("./samples/chapters/chapter-8/forest-solution.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ci04L2ZvcmVzdC1zb2x1dGlvbi5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL25vZGVfbW9kdWxlcy90aHJlZS9leGFtcGxlcy9qc20vbGlicy9zdGF0cy5tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEV4ZXJjaXNlOiBcIkZvcmVzdCB1bmRlciBhIG1vdmluZyBzdW5cIlxuICogVG9waWNzOiBsaWdodGluZywgc2hhZG93cywgTWVzaFN0YW5kYXJkTWF0ZXJpYWwsIGdlb21ldHJ5IG1lcmdpbmcsIGluc3RhbmNpbmdcbiAqXG4gKiBZb3VyIHRhc2s6IGNvbXBsZXRlIHRoZSBzaXggVE9ETyBibG9ja3MgYmVsb3cgc28gdGhhdCBhbGwgdGhyZWUgaW1wbGVtZW50YXRpb25zXG4gKiByZW5kZXIgY29ycmVjdGx5LiAgVGhlbiBzd2l0Y2ggYmV0d2VlbiB0aGVtIGluIHRoZSBHVUkuXG4qL1xuXG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcbmltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vY29udHJvbHMvT3JiaXRDb250cm9scy5qcydcbmltcG9ydCBTdGF0cyBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbGlicy9zdGF0cy5tb2R1bGUuanMnXG5pbXBvcnQgeyBtZXJnZUJ1ZmZlckdlb21ldHJpZXMgYXMgbWVyZ2VHZW9tZXRyaWVzIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL3V0aWxzL0J1ZmZlckdlb21ldHJ5VXRpbHMuanMnXG5pbXBvcnQgR1VJIGZyb20gJ2xpbC1ndWknXG5cbi8vIMOi4oCd4oKsw6LigJ3igqzDouKAneKCrCBDb25zdGFudHMgKGRvIG5vdCBjaGFuZ2UpIMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrFxuY29uc3QgVFJFRV9DT1VOVCAgICA9IDEwMFxuY29uc3QgU1BSRUFEICAgICAgICA9IDEwXG5jb25zdCBUUlVOS19IICAgICAgID0gMlxuY29uc3QgVFJVTktfUl9UT1AgICA9IDAuMTVcbmNvbnN0IFRSVU5LX1JfQk9UICAgPSAwLjI1XG5jb25zdCBGT0xJQUdFX0ggICAgID0gNFxuY29uc3QgRk9MSUFHRV9SICAgICA9IDEuNVxuY29uc3QgU0VHICAgICAgICAgICA9IDZcblxuLy8gw6LigJ3igqzDouKAneKCrMOi4oCd4oKsIFJlbmRlcmVyIMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqxcbmNvbnN0IHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoeyBhbnRpYWxpYXM6IHRydWUgfSlcbnJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodClcbnJlbmRlcmVyLnNldFBpeGVsUmF0aW8oTWF0aC5taW4od2luZG93LmRldmljZVBpeGVsUmF0aW8sIDIpKVxuZG9jdW1lbnQuYm9keS5zdHlsZS5tYXJnaW4gICA9ICcwJ1xuZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHJlbmRlcmVyLmRvbUVsZW1lbnQpXG5cbnJlbmRlcmVyLnNoYWRvd01hcC5lbmFibGVkID0gdHJ1ZVxucmVuZGVyZXIuc2hhZG93TWFwLnNoYWRvd01hcFR5cGUgPSBUSFJFRS5QQ0ZTb2Z0U2hhZG93TWFwXG5cbi8vIMOi4oCd4oKsw6LigJ3igqzDouKAneKCrCBTY2VuZSAmIENhbWVyYSDDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsXG5jb25zdCBzY2VuZSAgPSBuZXcgVEhSRUUuU2NlbmUoKVxuc2NlbmUuYmFja2dyb3VuZCA9IG5ldyBUSFJFRS5Db2xvcigweDg3Y2VlYilcbi8vIHNjZW5lLmZvZyAgICAgICAgPSBuZXcgVEhSRUUuRm9nKDB4ODdjZWViLCA5MCwgMjIwKSBcbi8vIMOi4oCdxZLDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsXG4vLyDDouKAneKAmiBRVUVTVElPTiDDouKCrOKAnSBXaGljaCBidWZmZXIgY2FuIGJlIHVzZWQgdG8gY3JlYXRlIGZvZz9cbi8vIHwgQWN0dWFsbHksIFRocmVlSlMgdXNlcyBhIFZlcnRleCBTaGFkZXIgKyBhIEZyYWdtZW50IFNoYWRlclxuLy8gw6LigJ3igJ3DouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsXG5cbndpbmRvdy5zY2VuZSA9IHNjZW5lIFxuXG5jb25zdCBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNjAsIHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0LCAwLjEsIDEwMDApXG5jYW1lcmEucG9zaXRpb24uc2V0KDAsIDMwLCA3MClcblxuY29uc3QgY29udHJvbHMgPSBuZXcgT3JiaXRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLmRvbUVsZW1lbnQpXG5jb250cm9scy50YXJnZXQuc2V0KDAsIDUsIDApXG5jb250cm9scy51cGRhdGUoKVxuXG5sZXQgcmF5Y2FzdGVyID0gdW5kZWZpbmVkXG5sZXQgaW50ZXJzZWN0ZWQgPSBudWxsXG5sZXQgc2VsZWN0QWxsID0gZmFsc2VcblxubGV0IHBvaW50ZXIgPSB7XG4gIHg6IC0xLFxuICB5OiAtMVxufVxuXG53aW5kb3cucG9pbnRlciA9IHBvaW50ZXJcblxucmF5Y2FzdGVyID0gbmV3IFRIUkVFLlJheWNhc3RlcigpXG5cblxuLy8gw6LigJ3igqzDouKAneKCrMOi4oCd4oKsIFN0YXRzIG92ZXJsYXkgw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsXG5jb25zdCBzdGF0cyA9IFN0YXRzKClcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc3RhdHMuZG9tKVxuXG4vLyDDouKAneKCrMOi4oCd4oKsw6LigJ3igqwgQW1iaWVudCBsaWdodCDDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqxcbmNvbnN0IGFtYmllbnQgPSBuZXcgVEhSRUUuQW1iaWVudExpZ2h0KDB4ZmZmZmZmLCAwLjQpXG5zY2VuZS5hZGQoYW1iaWVudClcblxuLy8gw6LigJ3igqzDouKAneKCrMOi4oCd4oKsIFN1biAoRGlyZWN0aW9uYWxMaWdodCkgw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsXG5jb25zdCBzdW4gPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGZmZjRlMCwgMi41KVxuc3VuLnBvc2l0aW9uLnNldCg4MCwgODAsIDIwKVxuXG5zdW4uY2FzdFNoYWRvdyA9IHRydWVcbnN1bi5zaGFkb3cubWFwU2l6ZS53aWR0aCAgPSAyMDQ4XG5zdW4uc2hhZG93Lm1hcFNpemUuaGVpZ2h0ID0gMjA0OFxuc3VuLnNoYWRvdy5jYW1lcmEubmVhciAgID0gMVxuc3VuLnNoYWRvdy5jYW1lcmEuZmFyICAgID0gNDAwXG5zdW4uc2hhZG93LmNhbWVyYS5sZWZ0ICAgPSAtMTEwXG5zdW4uc2hhZG93LmNhbWVyYS5yaWdodCAgPSAgMTEwXG5zdW4uc2hhZG93LmNhbWVyYS50b3AgICAgPSAgMTEwXG5zdW4uc2hhZG93LmNhbWVyYS5ib3R0b20gPSAtMTEwXG5zdW4uc2hhZG93LmJpYXMgPSAtMC4wMDFcblxuc2NlbmUuYWRkKHN1bilcbnNjZW5lLmFkZChzdW4udGFyZ2V0KSAgLy8gdGhlIHRhcmdldCBPYmplY3QzRCBtdXN0IGJlIGluIHRoZSBzY2VuZSB0b29cblxuLy8gw6LigJ3igqzDouKAneKCrMOi4oCd4oKsIEdyb3VuZCBwbGFuZSDDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrFxuLy8gUm91Z2huZXNzIG1hcCByZXVzZWQgZnJvbSBjaGFwdGVyLTEwICh0ZXh0dXJlLXJvdWduZXNzLW1hcC5qcykgw6LigqzigJ0gdGhlIHNhbWVcbi8vIG1hcmJsZSB0ZXh0dXJlIHRoYXQgZGVtb25zdHJhdGVkIHJvdWdobmVzc01hcCB0aGVyZSBub3cgbWFrZXMgZ3Jhc3MgbG9va1xuLy8gdW5ldmVuIHVuZGVyIGdyYXppbmcgbGlnaHQuICBUaGlzIGlzIHRoZSBkaXJlY3QgQ2guMTAgw6LigKDigJkgQ2guOCBjb25uZWN0aW9uLlxuY29uc3QgbG9hZGVyID0gbmV3IFRIUkVFLlRleHR1cmVMb2FkZXIoKVxuXG5jb25zdCByb3VnaG5lc3NNYXAgPSBsb2FkZXIubG9hZCgnL2Fzc2V0cy90ZXh0dXJlcy9tYXJibGUvbWFyYmxlXzAwMDhfcm91Z2huZXNzXzJrLmpwZycsICh0KSA9PiB7XG4gIHQud3JhcFMgPSB0LndyYXBUID0gVEhSRUUuUmVwZWF0V3JhcHBpbmdcbiAgdC5yZXBlYXQuc2V0KDEyLCAxMilcbn0pXG5cbmNvbnN0IG1ldGFsbmVzc01hcCA9IGxvYWRlci5sb2FkKCcvYXNzZXRzL3RleHR1cmVzL21hcmJsZS9tYXJibGVfMDAwOF9yb3VnaG5lc3NfMmsuanBnJywgKHQpID0+IHtcbiAgdC53cmFwUyA9IHQud3JhcFQgPSBUSFJFRS5SZXBlYXRXcmFwcGluZ1xuICB0LnJlcGVhdC5zZXQoMTIsIDEyKVxufSlcblxuY29uc3QgZ3JvdW5kTWF0ID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcbiAgY29sb3I6ICAgICAgICAweDRhN2MzZixcbiAgcm91Z2huZXNzOiAgICAwLjksXG4gIG1ldGFsbmVzczogICAgMC4wLFxuICByb3VnaG5lc3NNYXAsXG4gIG1ldGFsbmVzc01hcFxufSlcblxuY29uc3QgZ3JvdW5kID0gbmV3IFRIUkVFLk1lc2goXG4gIG5ldyBUSFJFRS5QbGFuZUdlb21ldHJ5KChTUFJFQUQgKyA1KSAqIDIsIChTUFJFQUQgKyA1KSAqIDIpLFxuICBncm91bmRNYXRcbilcbmdyb3VuZC5yb3RhdGlvbi54ICAgID0gLU1hdGguUEkgLyAyXG5ncm91bmQucmVjZWl2ZVNoYWRvdyA9IHRydWVcbnNjZW5lLmFkZChncm91bmQpXG5cbi8vIMOi4oCd4oKsw6LigJ3igqzDouKAneKCrCBTaGFyZWQgcHJvdG90eXBlIGdlb21ldHJpZXMgKG5ldmVyIG11dGF0ZSB0aGVzZSkgw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqxcbmNvbnN0IGJhc2VUcnVua0dlbyAgID0gbmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkoVFJVTktfUl9UT1AsIFRSVU5LX1JfQk9ULCBUUlVOS19ILCBTRUcpXG5jb25zdCBiYXNlRm9saWFnZUdlbyA9IG5ldyBUSFJFRS5Db25lR2VvbWV0cnkoRk9MSUFHRV9SLCBGT0xJQUdFX0gsIFNFRylcblxubGV0IGZhY2VQZXJDb25lID0gYmFzZUZvbGlhZ2VHZW8uaW5kZXguY291bnQgLyAzXG5sZXQgdmVydGV4UGVyQ29uZSA9IGJhc2VGb2xpYWdlR2VvLmF0dHJpYnV0ZXMucG9zaXRpb24uY291bnRcblxuLy8gw6LigJ3igqzDouKAneKCrMOi4oCd4oKsIENvbG91ciBoZWxwZXJzIChwcm92aWRlZCkgw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsXG5jb25zdCByYW5kb21HcmVlbiA9ICgpID0+XG4gIG5ldyBUSFJFRS5Db2xvcihcbiAgICAwLjA1ICsgTWF0aC5yYW5kb20oKSAqIDAuMDYsXG4gICAgMC4yOCArIE1hdGgucmFuZG9tKCkgKiAwLjI4LFxuICAgIDAuMDMgKyBNYXRoLnJhbmRvbSgpICogMC4wNVxuICApXG5cbmNvbnN0IHJhbmRvbUJyb3duID0gKCkgPT5cbiAgbmV3IFRIUkVFLkNvbG9yKFxuICAgIDAuMjggKyBNYXRoLnJhbmRvbSgpICogMC4yMixcbiAgICAwLjEyICsgTWF0aC5yYW5kb20oKSAqIDAuMTAsXG4gICAgMC4wMSArIE1hdGgucmFuZG9tKCkgKiAwLjA0XG4gIClcblxuY29uc3QgcmFuZG9tUG9zID0gKCkgPT4gKHtcbiAgeDogKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMiAqIFNQUkVBRCxcbiAgejogKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMiAqIFNQUkVBRFxufSlcblxuLy8gw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrFxuLy8gIEltcGxlbWVudGF0aW9uIDEgw6LigqzigJ0gTkFJVkVcbi8vIMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqxcbmZ1bmN0aW9uIGJ1aWxkTmFpdmVGb3Jlc3QoKSB7XG4gIGNvbnN0IHJvb3QgICAgICAgPSBuZXcgVEhSRUUuR3JvdXAoKVxuICBjb25zdCB0cnVua01hdCAgID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHsgY29sb3I6IDB4OGI0NTEzIH0pXG4gIGNvbnN0IGZvbGlhZ2VNYXQgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoeyBjb2xvcjogMHgyMjhiMjIgfSlcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IFRSRUVfQ09VTlQ7IGkrKykge1xuICAgIGNvbnN0IHsgeCwgeiB9ID0gcmFuZG9tUG9zKClcbiAgICBjb25zdCBzY2FsZSAgICAgPSAwLjcgKyBNYXRoLnJhbmRvbSgpICogMC42XG5cbiAgICBjb25zdCB0cmVlID0gbmV3IFRIUkVFLkdyb3VwKClcbiAgICB0cmVlLnBvc2l0aW9uLnNldCh4LCAwLCB6KVxuICAgIHRyZWUuc2NhbGUuc2V0U2NhbGFyKHNjYWxlKVxuICAgIGNvbnN0IHRydW5rID0gbmV3IFRIUkVFLk1lc2goYmFzZVRydW5rR2VvLCB0cnVua01hdC5jbG9uZSgpKVxuICAgIHRydW5rLnBvc2l0aW9uLnkgPSBUUlVOS19IIC8gMiAgIFxuICAgIHRydW5rLmNhc3RTaGFkb3cgICAgPSB0cnVlXG4gICAgdHJ1bmsucmVjZWl2ZVNoYWRvdyA9IHRydWVcbiAgICB0cnVuay5tYXRlcmlhbC5jb2xvci5jb3B5KHJhbmRvbUJyb3duKCkpXG5cbiAgICBjb25zdCBmb2xpYWdlID0gbmV3IFRIUkVFLk1lc2goYmFzZUZvbGlhZ2VHZW8sIGZvbGlhZ2VNYXQuY2xvbmUoKSlcbiAgICBmb2xpYWdlLnBvc2l0aW9uLnkgPSBUUlVOS19IICsgRk9MSUFHRV9IIC8gMiAgXG4gICAgZm9saWFnZS5jYXN0U2hhZG93ICAgID0gdHJ1ZVxuICAgIGZvbGlhZ2UucmVjZWl2ZVNoYWRvdyA9IHRydWVcbiAgICBmb2xpYWdlLm1hdGVyaWFsLmNvbG9yLmNvcHkocmFuZG9tR3JlZW4oKSlcbiAgICBmb2xpYWdlLmxheWVycy5lbmFibGUoMSlcbiAgICBcbiAgICB0cmVlLmFkZCh0cnVuaywgZm9saWFnZSlcbiAgICByb290LmFkZCh0cmVlKVxuICB9XG4gIHJldHVybiByb290XG59XG5cbmZ1bmN0aW9uIGludGVyc2VjdE5haXZlR2VvbWV0cnkoKXtcbiAgLy8gY29uc29sZS5sb2coXCJpbnRlcnNlY3Rpb24gcnVubmluZ1wiKVxuICBpZiAocmF5Y2FzdGVyKSB7XG4gICAgcmF5Y2FzdGVyLnNldEZyb21DYW1lcmEocG9pbnRlciwgY2FtZXJhKVxuICAgIGNvbnN0IG9ianMgPSBzY2VuZS5jaGlsZHJlblxuICAgIGNvbnN0IGludGVyc2VjdHMgPSByYXljYXN0ZXIuaW50ZXJzZWN0T2JqZWN0cyhvYmpzLCB0cnVlKVxuXG4gICAgcmF5Y2FzdGVyLmxheWVycy5zZXQoMSlcbiAgICBcbiAgICBjb25zb2xlLmxvZyhpbnRlcnNlY3RzKVxuXG4gICAgaWYgKGludGVyc2VjdHMubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKGludGVyc2VjdGVkICE9IGludGVyc2VjdHNbMF0ub2JqZWN0KSB7XG4gICAgICAgIGlmIChpbnRlcnNlY3RlZCkgaW50ZXJzZWN0ZWQubWF0ZXJpYWwuY29sb3IuY29weShyYW5kb21HcmVlbigpKVxuICAgICAgICBpbnRlcnNlY3RlZCA9IGludGVyc2VjdHNbMF0ub2JqZWN0XG4gICAgICAgIGludGVyc2VjdGVkLmN1cnJlbnRDb2xvciA9IGludGVyc2VjdGVkLm1hdGVyaWFsLmNvbG9yXG4gICAgICAgIGludGVyc2VjdGVkLm1hdGVyaWFsLmNvbG9yLmNvcHkocmFuZG9tQnJvd24oKSlcbiAgICAgICAgY29uc29sZS5sb2coaW50ZXJzZWN0c1swXSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8gw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrFxuLy8gIEltcGxlbWVudGF0aW9uIDIgw6LigqzigJ0gTUVSR0VEXG4vLyDDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsXG5mdW5jdGlvbiBidWlsZE1lcmdlZEZvcmVzdCgpIHtcbiAgY29uc3QgdHJ1bmtHZW9zICAgPSBbXVxuICBjb25zdCBmb2xpYWdlR2VvcyA9IFtdXG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBUUkVFX0NPVU5UOyBpKyspIHtcbiAgICBjb25zdCB7IHgsIHogfSA9IHJhbmRvbVBvcygpXG4gICAgY29uc3Qgc2NhbGUgICAgID0gMC43ICsgTWF0aC5yYW5kb20oKSAqIDAuNlxuICAgIC8vIHN0ZXAgMVxuICAgIGNvbnN0IHRnID0gYmFzZVRydW5rR2VvLmNsb25lKClcbiAgICB0Zy5hcHBseU1hdHJpeDQoXG4gICAgICBuZXcgVEhSRUUuTWF0cml4NCgpXG4gICAgICAgIC5tYWtlVHJhbnNsYXRpb24oeCwgIChUUlVOS19IIC8gMikgKiBzY2FsZSwgIHopXG4gICAgICAgIC5tdWx0aXBseShuZXcgVEhSRUUuTWF0cml4NCgpLm1ha2VTY2FsZShzY2FsZSwgc2NhbGUsIHNjYWxlKSlcbiAgICApXG5cbiAgICAvLyBzdGVwIDJcbiAgICBjb25zdCBjb2wgICAgICA9IHJhbmRvbUJyb3duKCkgICAgICAgICAgICAgICAgIC8vIChvciByYW5kb21HcmVlbigpKVxuICAgIGNvbnN0IHZlcnRDb3VudCA9IHRnLmF0dHJpYnV0ZXMucG9zaXRpb24uY291bnRcbiAgICBjb25zdCBjb2xvckFyciAgPSBuZXcgRmxvYXQzMkFycmF5KHZlcnRDb3VudCAqIDMpXG4gICAgZm9yIChsZXQgdiA9IDA7IHYgPCB2ZXJ0Q291bnQ7IHYrKykge1xuICAgICAgY29sb3JBcnJbdiozXSAgID0gY29sLnJcbiAgICAgIGNvbG9yQXJyW3YqMysxXSA9IGNvbC5nXG4gICAgICBjb2xvckFyclt2KjMrMl0gPSBjb2wuYlxuICAgIH1cbiAgICB0Zy5zZXRBdHRyaWJ1dGUoJ2NvbG9yJywgbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShjb2xvckFyciwgMykpXG4gICAgdHJ1bmtHZW9zLnB1c2godGcpXG5cbiAgICAvLyBzdGVwIDFcbiAgICBjb25zdCBmZyA9IGJhc2VGb2xpYWdlR2VvLmNsb25lKClcbiAgICBmZy5hcHBseU1hdHJpeDQoXG4gICAgICBuZXcgVEhSRUUuTWF0cml4NCgpXG4gICAgICAgIC5tYWtlVHJhbnNsYXRpb24oeCwgVFJVTktfSCArIEZPTElBR0VfSCAvIDIgKiBzY2FsZSwgIHopXG4gICAgICAgIC5tdWx0aXBseShuZXcgVEhSRUUuTWF0cml4NCgpLm1ha2VTY2FsZShzY2FsZSwgc2NhbGUsIHNjYWxlKSlcbiAgICApXG5cbiAgICAvLyBzdGVwIDJcbiAgICBjb25zdCBjb2xmICAgICAgID0gcmFuZG9tR3JlZW4oKVxuICAgIGNvbnN0IHZlcnRDb3VudGYgPSBmZy5hdHRyaWJ1dGVzLnBvc2l0aW9uLmNvdW50XG4gICAgY29uc3QgY29sb3JBcnJmICA9IG5ldyBGbG9hdDMyQXJyYXkodmVydENvdW50ZiAqIDMpXG4gICAgZm9yIChsZXQgdiA9IDA7IHYgPCB2ZXJ0Q291bnQ7IHYrKykge1xuICAgICAgY29sb3JBcnJmW3YqM10gICA9IGNvbGYuclxuICAgICAgY29sb3JBcnJmW3YqMysxXSA9IGNvbGYuZ1xuICAgICAgY29sb3JBcnJmW3YqMysyXSA9IGNvbGYuYlxuICAgIH1cblxuICAgIGZnLnNldEF0dHJpYnV0ZSgnY29sb3InLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKGNvbG9yQXJyZiwgMykpXG4gICAgZm9saWFnZUdlb3MucHVzaChmZylcblxuICB9XG5cbiAgY29uc3QgdHJ1bmtNZXNoID0gbmV3IFRIUkVFLk1lc2goXG4gICAgbWVyZ2VHZW9tZXRyaWVzKHRydW5rR2VvcyksXG4gICAgbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHsgdmVydGV4Q29sb3JzOiB0cnVlIH0pXG4gIClcbiAgdHJ1bmtNZXNoLmNhc3RTaGFkb3cgICAgPSB0cnVlXG4gIHRydW5rTWVzaC5yZWNlaXZlU2hhZG93ID0gdHJ1ZVxuXG4gIGNvbnN0IGZvbGlhZ2VNZXNoID0gbmV3IFRIUkVFLk1lc2goXG4gICAgbWVyZ2VHZW9tZXRyaWVzKGZvbGlhZ2VHZW9zKSxcbiAgICBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoeyB2ZXJ0ZXhDb2xvcnM6IHRydWUgfSlcbiAgKVxuICBmb2xpYWdlTWVzaC5jYXN0U2hhZG93ICAgID0gdHJ1ZVxuICBmb2xpYWdlTWVzaC5yZWNlaXZlU2hhZG93ID0gdHJ1ZVxuICBmb2xpYWdlTWVzaC5sYXllcnMuZW5hYmxlKDEpXG5cbiAgY29uc3Qgcm9vdCA9IG5ldyBUSFJFRS5Hcm91cCgpXG4gIHJvb3QuYWRkKHRydW5rTWVzaCwgZm9saWFnZU1lc2gpXG4gIFxuICByZXR1cm4gcm9vdFxuXG59XG5cbmxldCBoaXRGYWNlSW5kZXggPSAtMVxuXG5mdW5jdGlvbiBzZXRUcmVlQ29sb3IoZm9saWFnZU1lc2gsIHRyZWVJbmRleCwgY29sb3IpIHtcblxuICBjb25zdCBjb2xvckF0dHIgPSBmb2xpYWdlTWVzaC5nZW9tZXRyeS5hdHRyaWJ1dGVzLmNvbG9yXG4gIGNvbnN0IHN0YXJ0ID0gdHJlZUluZGV4ICogdmVydGV4UGVyQ29uZVxuICBcbiAgZm9yIChsZXQgdiA9IHN0YXJ0OyB2IDwgc3RhcnQgKyB2ZXJ0ZXhQZXJDb25lOyB2KyspIHtcbiAgICBjb2xvckF0dHIuc2V0WFlaKHYsIGNvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmIpXG4gIH1cbiAgY29sb3JBdHRyLm5lZWRzVXBkYXRlID0gdHJ1ZVxufVxuXG5mdW5jdGlvbiBpbnRlcnNlY3RNZXJnZWRHZW9tZXRyeSgpe1xuICBpZiAocmF5Y2FzdGVyKSB7XG4gICAgcmF5Y2FzdGVyLnNldEZyb21DYW1lcmEocG9pbnRlciwgY2FtZXJhKVxuICAgIGNvbnN0IG9ianMgPSBzY2VuZS5jaGlsZHJlblxuICAgIGNvbnN0IGludGVyc2VjdHMgPSByYXljYXN0ZXIuaW50ZXJzZWN0T2JqZWN0cyhvYmpzLCB0cnVlKVxuXG4gICAgcmF5Y2FzdGVyLmxheWVycy5zZXQoMSlcblxuICAgIGxldCBoaXRUcmVlSW5kZXggPSAtMVxuXG4gICAgaWYgKGludGVyc2VjdHMubGVuZ3RoID4gMCkge1xuXG4gICAgICAgaGl0RmFjZUluZGV4ID0gaW50ZXJzZWN0c1swXS5mYWNlSW5kZXhcblxuICAgICAgIGhpdFRyZWVJbmRleCA9IE1hdGguZmxvb3IoaGl0RmFjZUluZGV4IC8gZmFjZVBlckNvbmUpXG5cbiAgICAgICBjb25zb2xlLmxvZyhcIkhpdCB0cmVlIHdpdGggaW5kZXhcIiwgaGl0VHJlZUluZGV4KVxuXG4gICAgICBjb25zdCBmb2xpYWdlTWVzaCA9IGludGVyc2VjdHNbMF0ub2JqZWN0XG4gICAgICBcbiAgICAgIGlmIChoaXRUcmVlSW5kZXggIT09IC0xKVxuICAgICAgICBzZXRUcmVlQ29sb3IoZm9saWFnZU1lc2gsIGhpdFRyZWVJbmRleCwgcmFuZG9tQnJvd24oKSlcblxuICAgICAgXG4gICAgfVxuICB9XG59XG5cbi8vIMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqxcbi8vICBJbXBsZW1lbnRhdGlvbiAzIMOi4oKs4oCdIElOU1RBTkNFRFxuLy8gw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrFxuZnVuY3Rpb24gYnVpbGRJbnN0YW5jZWRGb3Jlc3QoKSB7XG4gIGNvbnN0IHRydW5rTWF0ICAgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoeyBjb2xvcjogMHg4YjQ1MTMgfSlcbiAgY29uc3QgZm9saWFnZU1hdCA9IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7IGNvbG9yOiAweGZmZmZmZiB9KVxuXG4gIGNvbnN0IHRydW5rSU0gICA9IG5ldyBUSFJFRS5JbnN0YW5jZWRNZXNoKGJhc2VUcnVua0dlbywgICB0cnVua01hdCwgICBUUkVFX0NPVU5UKVxuICBjb25zdCBmb2xpYWdlSU0gPSBuZXcgVEhSRUUuSW5zdGFuY2VkTWVzaChiYXNlRm9saWFnZUdlbywgZm9saWFnZU1hdCwgVFJFRV9DT1VOVClcblxuICB0cnVua0lNLmNhc3RTaGFkb3dzID0gdHJ1ZVxuICB0cnVua0lNLnJlY2VpdmVTaGFkb3dzID0gdHJ1ZVxuXG4gIGNvbnN0IGR1bW15ID0gbmV3IFRIUkVFLk9iamVjdDNEKClcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IFRSRUVfQ09VTlQ7IGkrKykge1xuICAgIGNvbnN0IHsgeCwgeiB9ID0gcmFuZG9tUG9zKClcbiAgICBjb25zdCBzY2FsZSAgICAgPSAwLjcgKyBNYXRoLnJhbmRvbSgpICogMC42XG5cbiAgICBkdW1teS5wb3NpdGlvbi5zZXQoeCwgIChUUlVOS19IIC8gMikgKiBzY2FsZSwgIHopXG4gICAgZHVtbXkuc2NhbGUuc2V0U2NhbGFyKHNjYWxlKVxuICAgIGR1bW15LnVwZGF0ZU1hdHJpeCgpXG4gICAgdHJ1bmtJTS5zZXRNYXRyaXhBdChpLCBkdW1teS5tYXRyaXgpXG4gIFxuICAgIGR1bW15LnBvc2l0aW9uLnNldCh4LCAgKFRSVU5LX0ggKyBGT0xJQUdFX0ggLyAyKSAqIHNjYWxlLCAgeilcbiAgICBkdW1teS51cGRhdGVNYXRyaXgoKSAgICAgICAgICAvLyBzY2FsZSBpcyBzdGlsbCBzZXQgZnJvbSBhYm92ZVxuICAgIGZvbGlhZ2VJTS5zZXRNYXRyaXhBdChpLCBkdW1teS5tYXRyaXgpXG5cbiAgICB0cnVua0lNLnNldENvbG9yQXQoaSwgICByYW5kb21Ccm93bigpKVxuICAgIGZvbGlhZ2VJTS5zZXRDb2xvckF0KGksIHJhbmRvbUdyZWVuKCkpXG4gIH1cblxuICB0cnVua0lNLmluc3RhbmNlTWF0cml4Lm5lZWRzVXBkYXRlICAgPSB0cnVlXG4gIGZvbGlhZ2VJTS5pbnN0YW5jZU1hdHJpeC5uZWVkc1VwZGF0ZSA9IHRydWVcbiAgdHJ1bmtJTS5pbnN0YW5jZUNvbG9yLm5lZWRzVXBkYXRlICAgID0gdHJ1ZVxuICBmb2xpYWdlSU0uaW5zdGFuY2VDb2xvci5uZWVkc1VwZGF0ZSAgPSB0cnVlXG5cbiAgY29uc3Qgcm9vdCA9IG5ldyBUSFJFRS5Hcm91cCgpXG4gIHJvb3QuYWRkKHRydW5rSU0sIGZvbGlhZ2VJTSkgICBcbiAgcmV0dXJuIHJvb3Rcbn1cblxuLy8gw6LigJ3igqzDouKAneKCrMOi4oCd4oKsIFNjZW5lIHN3aXRjaGluZyAocHJvdmlkZWQpIMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqxcbmxldCBmb3Jlc3RHcm91cCA9IG51bGxcblxuZnVuY3Rpb24gbG9hZEltcGxlbWVudGF0aW9uKG5hbWUpIHtcbiAgaWYgKGZvcmVzdEdyb3VwKSB7XG4gICAgc2NlbmUucmVtb3ZlKGZvcmVzdEdyb3VwKVxuICAgIGZvcmVzdEdyb3VwLnRyYXZlcnNlKChvYmopID0+IHtcbiAgICAgIGlmICghb2JqLmlzTWVzaCkgcmV0dXJuXG4gICAgICBvYmouZ2VvbWV0cnkuZGlzcG9zZSgpXG4gICAgICBjb25zdCBtYXRzID0gQXJyYXkuaXNBcnJheShvYmoubWF0ZXJpYWwpID8gb2JqLm1hdGVyaWFsIDogW29iai5tYXRlcmlhbF1cbiAgICAgIG1hdHMuZm9yRWFjaCgobSkgPT4gbS5kaXNwb3NlKCkpXG4gICAgfSlcbiAgfVxuXG4gIGNvbnNvbGUudGltZShuYW1lICsgJyBidWlsZCcpXG4gIHN3aXRjaCAobmFtZSkge1xuICAgIGNhc2UgJ05haXZlJzogICAgIGZvcmVzdEdyb3VwID0gYnVpbGROYWl2ZUZvcmVzdCgpOyAgICAgYnJlYWtcbiAgICBjYXNlICdNZXJnZWQnOiAgICBmb3Jlc3RHcm91cCA9IGJ1aWxkTWVyZ2VkRm9yZXN0KCk7ICAgIGJyZWFrXG4gICAgY2FzZSAnSW5zdGFuY2VkJzogZm9yZXN0R3JvdXAgPSBidWlsZEluc3RhbmNlZEZvcmVzdCgpOyBicmVha1xuICB9XG4gIGNvbnNvbGUudGltZUVuZChuYW1lICsgJyBidWlsZCcpXG5cbiAgc2NlbmUuYWRkKGZvcmVzdEdyb3VwKVxufVxuXG4vLyDDouKAneKCrMOi4oCd4oKsw6LigJ3igqwgR1VJIChwcm92aWRlZCkgw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrFxuY29uc3QgZ3VpU3RhdGUgPSB7IGltcGxlbWVudGF0aW9uOiAnTWVyZ2VkJywgc3VuU3BlZWQ6IDAuMTIsIHNoYWRvd3M6IHRydWUgfVxuXG5jb25zdCBndWkgPSBuZXcgR1VJKHsgdGl0bGU6ICdGb3Jlc3QgQmVuY2htYXJrJyB9KVxuZ3VpLmFkZChndWlTdGF0ZSwgJ2ltcGxlbWVudGF0aW9uJywgWydOYWl2ZScsICdNZXJnZWQnLCAnSW5zdGFuY2VkJ10pXG4gICAubmFtZSgnSW1wbGVtZW50YXRpb24nKVxuICAgLm9uQ2hhbmdlKCh2KSA9PiBsb2FkSW1wbGVtZW50YXRpb24odikpXG5ndWkuYWRkKGd1aVN0YXRlLCAnc3VuU3BlZWQnLCAwLCAwLjUsIDAuMDEpLm5hbWUoJ1N1biBzcGVlZCcpXG5ndWkuYWRkKGd1aVN0YXRlLCAnc2hhZG93cycpLm5hbWUoJ1NoYWRvd3Mgb24nKS5vbkNoYW5nZSgodikgPT4ge1xuICByZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IHZcbiAgc2NlbmUudHJhdmVyc2UoKG9iaikgPT4geyBpZiAob2JqLmlzTWVzaCkgb2JqLm1hdGVyaWFsLm5lZWRzVXBkYXRlID0gdHJ1ZSB9KVxufSlcblxuLy8gw6LigJ3igqzDouKAneKCrMOi4oCd4oKsIEJlbmNobWFyayBzdGF0cyBwYW5lbCAocHJvdmlkZWQpIMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsXG5jb25zdCBiZW5jaCA9IHsgZnBzOiAwLCBkcmF3Q2FsbHM6IDAsIHRyaWFuZ2xlczogMCwgZ2VvbWV0cmllczogMCB9XG5jb25zdCBiZiAgICA9IGd1aS5hZGRGb2xkZXIoJ1JlbmRlcmVyIHN0YXRzIMOi4oKs4oCdIHJlY29yZCB0aGVzZScpXG5iZi5hZGQoYmVuY2gsICdmcHMnKS5saXN0ZW4oKS5kaXNhYmxlKClcbmJmLmFkZChiZW5jaCwgJ2RyYXdDYWxscycpLm5hbWUoJ2RyYXcgY2FsbHMnKS5saXN0ZW4oKS5kaXNhYmxlKClcbmJmLmFkZChiZW5jaCwgJ3RyaWFuZ2xlcycpLmxpc3RlbigpLmRpc2FibGUoKVxuYmYuYWRkKGJlbmNoLCAnZ2VvbWV0cmllcycpLmxpc3RlbigpLmRpc2FibGUoKVxuYmYub3BlbigpXG5cbi8vIMOi4oCd4oKsw6LigJ3igqzDouKAneKCrCBSZXNpemUgKHByb3ZpZGVkKSDDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xuICBjYW1lcmEuYXNwZWN0ID0gd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKVxuICByZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpXG59KVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGV2ZW50KSA9PiB7XG4gICAgICBwb2ludGVyLnggPSAoZXZlbnQuY2xpZW50WCAvIHdpbmRvdy5pbm5lcldpZHRoKSAqIDIgLSAxXG4gICAgICBwb2ludGVyLnkgPSAtKGV2ZW50LmNsaWVudFkgLyB3aW5kb3cuaW5uZXJIZWlnaHQpICogMiArIDFcbiAgICB9KVxuXG5cbi8vIMOi4oCd4oKsw6LigJ3igqzDouKAneKCrCBBbmltYXRpb24gbG9vcCDDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsXG5jb25zdCBjbG9jayAgICAgID0gbmV3IFRIUkVFLkNsb2NrKClcbmxldCBmcmFtZUNvdW50ICAgPSAwXG5sZXQgZnBzVGltZXN0YW1wID0gMFxuXG5mdW5jdGlvbiBhbmltYXRlKG5vdykge1xuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSlcbiAgZnJhbWVDb3VudCsrXG5cbiAgY29uc3QgdCA9IGNsb2NrLmdldEVsYXBzZWRUaW1lKClcblxuICAvLyBQcm92aWRlZDogY29sb3VyLXRpbnQgdGhlIHN1biB3YXJtZXIgbmVhciB0aGUgaG9yaXpvbiwgY29vbGVyIGF0IG5vb24uXG4gIGNvbnN0IGVsZXYgPSBzdW4ucG9zaXRpb24ueSAvIDEwMFxuICBzdW4uY29sb3Iuc2V0SFNMKDAuMTAgLSBlbGV2ICogMC4wNCwgMC45NSwgMC40NSArIGVsZXYgKiAwLjM1KVxuICBhbWJpZW50LmludGVuc2l0eSA9IDAuMTUgKyBlbGV2ICogMC40NVxuXG4gIGNvbnRyb2xzLnVwZGF0ZSgpXG4gIHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhKVxuICBzdGF0cy51cGRhdGUoKVxuXG4gIGlmIChub3cgLSBmcHNUaW1lc3RhbXAgPj0gNTAwKSB7XG4gICAgYmVuY2guZnBzICAgICAgICAgPSBNYXRoLnJvdW5kKGZyYW1lQ291bnQgKiAyKVxuICAgIGJlbmNoLmRyYXdDYWxscyAgID0gcmVuZGVyZXIuaW5mby5yZW5kZXIuY2FsbHNcbiAgICBiZW5jaC50cmlhbmdsZXMgICA9IHJlbmRlcmVyLmluZm8ucmVuZGVyLnRyaWFuZ2xlc1xuICAgIGJlbmNoLmdlb21ldHJpZXMgID0gcmVuZGVyZXIuaW5mby5tZW1vcnkuZ2VvbWV0cmllc1xuICAgIGZyYW1lQ291bnQgICAgICAgID0gMFxuICAgIGZwc1RpbWVzdGFtcCAgICAgID0gbm93XG4gIH1cblxuICAvLyBpbnRlcnNlY3ROYWl2ZUdlb21ldHJ5KClcbiAgaW50ZXJzZWN0TWVyZ2VkR2VvbWV0cnkoKVxufVxuXG4vLyDDouKAneKCrMOi4oCd4oKsw6LigJ3igqwgQm9vdCDDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqzDouKAneKCrMOi4oCd4oKsw6LigJ3igqxcbmxvYWRJbXBsZW1lbnRhdGlvbihndWlTdGF0ZS5pbXBsZW1lbnRhdGlvbilcbmFuaW1hdGUoMCkiLCJ2YXIgU3RhdHMgPSBmdW5jdGlvbiAoKSB7XG5cblx0dmFyIG1vZGUgPSAwO1xuXG5cdHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuXHRjb250YWluZXIuc3R5bGUuY3NzVGV4dCA9ICdwb3NpdGlvbjpmaXhlZDt0b3A6MDtsZWZ0OjA7Y3Vyc29yOnBvaW50ZXI7b3BhY2l0eTowLjk7ei1pbmRleDoxMDAwMCc7XG5cdGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCAnY2xpY2snLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRzaG93UGFuZWwoICsrIG1vZGUgJSBjb250YWluZXIuY2hpbGRyZW4ubGVuZ3RoICk7XG5cblx0fSwgZmFsc2UgKTtcblxuXHQvL1xuXG5cdGZ1bmN0aW9uIGFkZFBhbmVsKCBwYW5lbCApIHtcblxuXHRcdGNvbnRhaW5lci5hcHBlbmRDaGlsZCggcGFuZWwuZG9tICk7XG5cdFx0cmV0dXJuIHBhbmVsO1xuXG5cdH1cblxuXHRmdW5jdGlvbiBzaG93UGFuZWwoIGlkICkge1xuXG5cdFx0Zm9yICggdmFyIGkgPSAwOyBpIDwgY29udGFpbmVyLmNoaWxkcmVuLmxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0Y29udGFpbmVyLmNoaWxkcmVuWyBpIF0uc3R5bGUuZGlzcGxheSA9IGkgPT09IGlkID8gJ2Jsb2NrJyA6ICdub25lJztcblxuXHRcdH1cblxuXHRcdG1vZGUgPSBpZDtcblxuXHR9XG5cblx0Ly9cblxuXHR2YXIgYmVnaW5UaW1lID0gKCBwZXJmb3JtYW5jZSB8fCBEYXRlICkubm93KCksIHByZXZUaW1lID0gYmVnaW5UaW1lLCBmcmFtZXMgPSAwO1xuXG5cdHZhciBmcHNQYW5lbCA9IGFkZFBhbmVsKCBuZXcgU3RhdHMuUGFuZWwoICdGUFMnLCAnIzBmZicsICcjMDAyJyApICk7XG5cdHZhciBtc1BhbmVsID0gYWRkUGFuZWwoIG5ldyBTdGF0cy5QYW5lbCggJ01TJywgJyMwZjAnLCAnIzAyMCcgKSApO1xuXG5cdGlmICggc2VsZi5wZXJmb3JtYW5jZSAmJiBzZWxmLnBlcmZvcm1hbmNlLm1lbW9yeSApIHtcblxuXHRcdHZhciBtZW1QYW5lbCA9IGFkZFBhbmVsKCBuZXcgU3RhdHMuUGFuZWwoICdNQicsICcjZjA4JywgJyMyMDEnICkgKTtcblxuXHR9XG5cblx0c2hvd1BhbmVsKCAwICk7XG5cblx0cmV0dXJuIHtcblxuXHRcdFJFVklTSU9OOiAxNixcblxuXHRcdGRvbTogY29udGFpbmVyLFxuXG5cdFx0YWRkUGFuZWw6IGFkZFBhbmVsLFxuXHRcdHNob3dQYW5lbDogc2hvd1BhbmVsLFxuXG5cdFx0YmVnaW46IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0YmVnaW5UaW1lID0gKCBwZXJmb3JtYW5jZSB8fCBEYXRlICkubm93KCk7XG5cblx0XHR9LFxuXG5cdFx0ZW5kOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdGZyYW1lcyArKztcblxuXHRcdFx0dmFyIHRpbWUgPSAoIHBlcmZvcm1hbmNlIHx8IERhdGUgKS5ub3coKTtcblxuXHRcdFx0bXNQYW5lbC51cGRhdGUoIHRpbWUgLSBiZWdpblRpbWUsIDIwMCApO1xuXG5cdFx0XHRpZiAoIHRpbWUgPj0gcHJldlRpbWUgKyAxMDAwICkge1xuXG5cdFx0XHRcdGZwc1BhbmVsLnVwZGF0ZSggKCBmcmFtZXMgKiAxMDAwICkgLyAoIHRpbWUgLSBwcmV2VGltZSApLCAxMDAgKTtcblxuXHRcdFx0XHRwcmV2VGltZSA9IHRpbWU7XG5cdFx0XHRcdGZyYW1lcyA9IDA7XG5cblx0XHRcdFx0aWYgKCBtZW1QYW5lbCApIHtcblxuXHRcdFx0XHRcdHZhciBtZW1vcnkgPSBwZXJmb3JtYW5jZS5tZW1vcnk7XG5cdFx0XHRcdFx0bWVtUGFuZWwudXBkYXRlKCBtZW1vcnkudXNlZEpTSGVhcFNpemUgLyAxMDQ4NTc2LCBtZW1vcnkuanNIZWFwU2l6ZUxpbWl0IC8gMTA0ODU3NiApO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdGltZTtcblxuXHRcdH0sXG5cblx0XHR1cGRhdGU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0YmVnaW5UaW1lID0gdGhpcy5lbmQoKTtcblxuXHRcdH0sXG5cblx0XHQvLyBCYWNrd2FyZHMgQ29tcGF0aWJpbGl0eVxuXG5cdFx0ZG9tRWxlbWVudDogY29udGFpbmVyLFxuXHRcdHNldE1vZGU6IHNob3dQYW5lbFxuXG5cdH07XG5cbn07XG5cblN0YXRzLlBhbmVsID0gZnVuY3Rpb24gKCBuYW1lLCBmZywgYmcgKSB7XG5cblx0dmFyIG1pbiA9IEluZmluaXR5LCBtYXggPSAwLCByb3VuZCA9IE1hdGgucm91bmQ7XG5cdHZhciBQUiA9IHJvdW5kKCB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxICk7XG5cblx0dmFyIFdJRFRIID0gODAgKiBQUiwgSEVJR0hUID0gNDggKiBQUixcblx0XHRURVhUX1ggPSAzICogUFIsIFRFWFRfWSA9IDIgKiBQUixcblx0XHRHUkFQSF9YID0gMyAqIFBSLCBHUkFQSF9ZID0gMTUgKiBQUixcblx0XHRHUkFQSF9XSURUSCA9IDc0ICogUFIsIEdSQVBIX0hFSUdIVCA9IDMwICogUFI7XG5cblx0dmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdjYW52YXMnICk7XG5cdGNhbnZhcy53aWR0aCA9IFdJRFRIO1xuXHRjYW52YXMuaGVpZ2h0ID0gSEVJR0hUO1xuXHRjYW52YXMuc3R5bGUuY3NzVGV4dCA9ICd3aWR0aDo4MHB4O2hlaWdodDo0OHB4JztcblxuXHR2YXIgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCAnMmQnICk7XG5cdGNvbnRleHQuZm9udCA9ICdib2xkICcgKyAoIDkgKiBQUiApICsgJ3B4IEhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmJztcblx0Y29udGV4dC50ZXh0QmFzZWxpbmUgPSAndG9wJztcblxuXHRjb250ZXh0LmZpbGxTdHlsZSA9IGJnO1xuXHRjb250ZXh0LmZpbGxSZWN0KCAwLCAwLCBXSURUSCwgSEVJR0hUICk7XG5cblx0Y29udGV4dC5maWxsU3R5bGUgPSBmZztcblx0Y29udGV4dC5maWxsVGV4dCggbmFtZSwgVEVYVF9YLCBURVhUX1kgKTtcblx0Y29udGV4dC5maWxsUmVjdCggR1JBUEhfWCwgR1JBUEhfWSwgR1JBUEhfV0lEVEgsIEdSQVBIX0hFSUdIVCApO1xuXG5cdGNvbnRleHQuZmlsbFN0eWxlID0gYmc7XG5cdGNvbnRleHQuZ2xvYmFsQWxwaGEgPSAwLjk7XG5cdGNvbnRleHQuZmlsbFJlY3QoIEdSQVBIX1gsIEdSQVBIX1ksIEdSQVBIX1dJRFRILCBHUkFQSF9IRUlHSFQgKTtcblxuXHRyZXR1cm4ge1xuXG5cdFx0ZG9tOiBjYW52YXMsXG5cblx0XHR1cGRhdGU6IGZ1bmN0aW9uICggdmFsdWUsIG1heFZhbHVlICkge1xuXG5cdFx0XHRtaW4gPSBNYXRoLm1pbiggbWluLCB2YWx1ZSApO1xuXHRcdFx0bWF4ID0gTWF0aC5tYXgoIG1heCwgdmFsdWUgKTtcblxuXHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSBiZztcblx0XHRcdGNvbnRleHQuZ2xvYmFsQWxwaGEgPSAxO1xuXHRcdFx0Y29udGV4dC5maWxsUmVjdCggMCwgMCwgV0lEVEgsIEdSQVBIX1kgKTtcblx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gZmc7XG5cdFx0XHRjb250ZXh0LmZpbGxUZXh0KCByb3VuZCggdmFsdWUgKSArICcgJyArIG5hbWUgKyAnICgnICsgcm91bmQoIG1pbiApICsgJy0nICsgcm91bmQoIG1heCApICsgJyknLCBURVhUX1gsIFRFWFRfWSApO1xuXG5cdFx0XHRjb250ZXh0LmRyYXdJbWFnZSggY2FudmFzLCBHUkFQSF9YICsgUFIsIEdSQVBIX1ksIEdSQVBIX1dJRFRIIC0gUFIsIEdSQVBIX0hFSUdIVCwgR1JBUEhfWCwgR1JBUEhfWSwgR1JBUEhfV0lEVEggLSBQUiwgR1JBUEhfSEVJR0hUICk7XG5cblx0XHRcdGNvbnRleHQuZmlsbFJlY3QoIEdSQVBIX1ggKyBHUkFQSF9XSURUSCAtIFBSLCBHUkFQSF9ZLCBQUiwgR1JBUEhfSEVJR0hUICk7XG5cblx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gYmc7XG5cdFx0XHRjb250ZXh0Lmdsb2JhbEFscGhhID0gMC45O1xuXHRcdFx0Y29udGV4dC5maWxsUmVjdCggR1JBUEhfWCArIEdSQVBIX1dJRFRIIC0gUFIsIEdSQVBIX1ksIFBSLCByb3VuZCggKCAxIC0gKCB2YWx1ZSAvIG1heFZhbHVlICkgKSAqIEdSQVBIX0hFSUdIVCApICk7XG5cblx0XHR9XG5cblx0fTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgU3RhdHM7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImZvcmVzdC1zb2x1dGlvblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtsdGpzX2ZvdXJ0aFwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtsdGpzX2ZvdXJ0aFwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfYnVpbGRfdGhyZWVfbW9kdWxlX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fY29udHJvbHNfT3JiaXRDb250cm9sc19qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfbGlsLWd1aV9kaXN0X2xpbC1ndWlfZXNtX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fdXRpbHNfQnVmZmVyR2VvbWV0cnlVdGlsc19qc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci04L2ZvcmVzdC1zb2x1dGlvbi5qc1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
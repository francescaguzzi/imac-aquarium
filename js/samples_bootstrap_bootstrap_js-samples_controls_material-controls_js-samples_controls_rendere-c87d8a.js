"use strict";
(self["webpackChunkltjs_fourth"] = self["webpackChunkltjs_fourth"] || []).push([["samples_bootstrap_bootstrap_js-samples_controls_material-controls_js-samples_controls_rendere-c87d8a"],{

/***/ "./samples/bootstrap/bootstrap.js"
/*!****************************************!*\
  !*** ./samples/bootstrap/bootstrap.js ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initScene: () => (/* binding */ initScene)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _controller_orbit_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controller/orbit-controller */ "./samples/controller/orbit-controller.js");
/* harmony import */ var _lighting__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lighting */ "./samples/bootstrap/lighting.js");
/* harmony import */ var _util_update_on_resize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/update-on-resize */ "./samples/util/update-on-resize.js");





const initScene = ({ backgroundColor, fogColor, disableShadows, disableLights, disableDefaultControls }) => {
  const init = (fn) => {
    // basic scene setup
    const scene = new three__WEBPACK_IMPORTED_MODULE_0__.Scene()
    if (backgroundColor) {
      scene.backgroundColor = backgroundColor
    }

    if (fogColor) {
      scene.fog = new three__WEBPACK_IMPORTED_MODULE_0__.Fog(fogColor, 0.0025, 50)
    }

    // setup camera and basic renderer
    const camera = new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer({ antialias: true })
    renderer.outputEncoding = three__WEBPACK_IMPORTED_MODULE_0__.sRGBEncoding
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = three__WEBPACK_IMPORTED_MODULE_0__.VSMShadowMap
    renderer.setClearColor(backgroundColor)

    ;(0,_util_update_on_resize__WEBPACK_IMPORTED_MODULE_3__.onResize)(camera, renderer)
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    // initialize orbit controls
    let orbitControls
    if (!disableDefaultControls) {
      orbitControls = (0,_controller_orbit_controller__WEBPACK_IMPORTED_MODULE_1__.initOrbitControls)(camera, renderer)
    }

    // add some basic lighting to the scene
    if (!disableLights ?? false) {
      (0,_lighting__WEBPACK_IMPORTED_MODULE_2__.initLighting)(scene, { disableShadows })
    }

    fn({ scene, camera, renderer, orbitControls })
  }

  return init
}


/***/ },

/***/ "./samples/bootstrap/lighting.js"
/*!***************************************!*\
  !*** ./samples/bootstrap/lighting.js ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initLighting: () => (/* binding */ initLighting)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");


const initLighting = (scene, { disableShadows }) => {
  // https://threejs.org/examples/?q=shado#webgl_shadowmap_vsm
  scene.add(new three__WEBPACK_IMPORTED_MODULE_0__.AmbientLight(0x666666))

  // const dirLight = new THREE.DirectionalLight(0xaaaaaa)
  const dirLight = new three__WEBPACK_IMPORTED_MODULE_0__.DirectionalLight(0xaaaaaa)
  dirLight.position.set(5, 12, 8)
  dirLight.castShadow = !disableShadows ? true : false
  dirLight.intensity = 1
  dirLight.shadow.camera.near = 0.1
  dirLight.shadow.camera.far = 200
  dirLight.shadow.camera.right = 10
  dirLight.shadow.camera.left = -10
  dirLight.shadow.camera.top = 10
  dirLight.shadow.camera.bottom = -10
  dirLight.shadow.mapSize.width = 2048
  dirLight.shadow.mapSize.height = 2048
  dirLight.shadow.radius = 4
  dirLight.shadow.bias = -0.00005

  scene.add(dirLight)
}


/***/ },

/***/ "./samples/controller/orbit-controller.js"
/*!************************************************!*\
  !*** ./samples/controller/orbit-controller.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initOrbitControls: () => (/* binding */ initOrbitControls)
/* harmony export */ });
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");


const initOrbitControls = (camera, renderer) => {
  const controller = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__.OrbitControls(camera, renderer.domElement)
  controller.enableDamping = true
  controller.dampingFactor = 0.05
  controller.minDistance = 1
  controller.maxDistance = 100
  controller.minPolarAngle = Math.PI / 4
  controller.maxPolarAngle = (3 * Math.PI) / 4

  return controller
}


/***/ },

/***/ "./samples/controls/material-controls.js"
/*!***********************************************!*\
  !*** ./samples/controls/material-controls.js ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initializeGuiLineBasicMaterial: () => (/* binding */ initializeGuiLineBasicMaterial),
/* harmony export */   initializeGuiLineDashedMaterial: () => (/* binding */ initializeGuiLineDashedMaterial),
/* harmony export */   initializeGuiMaterial: () => (/* binding */ initializeGuiMaterial),
/* harmony export */   initializeGuiMeshBasicMaterial: () => (/* binding */ initializeGuiMeshBasicMaterial),
/* harmony export */   initializeGuiMeshLambertMaterial: () => (/* binding */ initializeGuiMeshLambertMaterial),
/* harmony export */   initializeGuiMeshPhongMaterial: () => (/* binding */ initializeGuiMeshPhongMaterial),
/* harmony export */   initializeGuiMeshPhysicalMaterial: () => (/* binding */ initializeGuiMeshPhysicalMaterial),
/* harmony export */   initializeGuiMeshStandardMaterial: () => (/* binding */ initializeGuiMeshStandardMaterial),
/* harmony export */   initializeGuiMeshToonMaterial: () => (/* binding */ initializeGuiMeshToonMaterial),
/* harmony export */   initializeMeshDepthMaterial: () => (/* binding */ initializeMeshDepthMaterial),
/* harmony export */   initializeMeshNormalMaterial: () => (/* binding */ initializeMeshNormalMaterial),
/* harmony export */   initializePointsMaterial: () => (/* binding */ initializePointsMaterial),
/* harmony export */   initializeSpriteMaterial: () => (/* binding */ initializeSpriteMaterial)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _util_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/index.js */ "./samples/util/index.js");
/* harmony import */ var _util_modelUtil_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/modelUtil.js */ "./samples/util/modelUtil.js");
/* harmony import */ var three_examples_jsm_helpers_VertexNormalsHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/jsm/helpers/VertexNormalsHelper */ "./node_modules/three/examples/jsm/helpers/VertexNormalsHelper.js");
// adopted from https://github.com/mrdoob/three.js/blob/a24e9803738ce7aa571e0cea6a858ed0078a1004/docs/scenes/material-browser.html





const envMaps = (function () {
  const reflectionCube2 = new three__WEBPACK_IMPORTED_MODULE_0__.TextureLoader().load('/assets/equi.jpeg', (loaded) => {
    loaded.mapping = three__WEBPACK_IMPORTED_MODULE_0__.EquirectangularReflectionMapping
  })
  const refractionCube2 = new three__WEBPACK_IMPORTED_MODULE_0__.TextureLoader().load('/assets/equi.jpeg', (loaded) => {
    loaded.mapping = three__WEBPACK_IMPORTED_MODULE_0__.EquirectangularRefractionMapping
  })

  return {
    none: null,
    reflection: reflectionCube2,
    refraction: refractionCube2
  }
})()

const textureLoader = new three__WEBPACK_IMPORTED_MODULE_0__.TextureLoader()
const diffuseMaps = (function () {
  const parquet = textureLoader.load('/assets/textures/wood/floor-parquet-pattern-172292.jpg')
  parquet.encoding = three__WEBPACK_IMPORTED_MODULE_0__.sRGBEncoding
  parquet.wrapS = three__WEBPACK_IMPORTED_MODULE_0__.RepeatWrapping
  parquet.wrapT = three__WEBPACK_IMPORTED_MODULE_0__.RepeatWrapping
  parquet.repeat.set(9, 1)

  const antique = textureLoader.load('/assets/textures/wood/abstract-antique-backdrop-164005.jpg')
  antique.encoding = three__WEBPACK_IMPORTED_MODULE_0__.sRGBEncoding
  antique.wrapS = three__WEBPACK_IMPORTED_MODULE_0__.RepeatWrapping
  antique.wrapT = three__WEBPACK_IMPORTED_MODULE_0__.RepeatWrapping
  antique.repeat.set(9, 1)

  const marble = textureLoader.load('/assets/textures/marble/marble_0008_color_2k.jpg')
  marble.encoding = three__WEBPACK_IMPORTED_MODULE_0__.sRGBEncoding
  marble.wrapS = three__WEBPACK_IMPORTED_MODULE_0__.RepeatWrapping
  marble.wrapT = three__WEBPACK_IMPORTED_MODULE_0__.RepeatWrapping

  const ground = textureLoader.load('/assets/textures/ground/ground_0036_color_1k.jpg')
  marble.encoding = three__WEBPACK_IMPORTED_MODULE_0__.sRGBEncoding
  marble.wrapS = three__WEBPACK_IMPORTED_MODULE_0__.RepeatWrapping
  marble.wrapT = three__WEBPACK_IMPORTED_MODULE_0__.RepeatWrapping

  return {
    none: null,
    floorAntique: antique,
    floorParquet: parquet,
    marble: marble,
    ground: ground
  }
})()

const envMapKeys = (0,_util_index_js__WEBPACK_IMPORTED_MODULE_1__.getObjectsKeys)(envMaps)
const diffuseMapKeys = (0,_util_index_js__WEBPACK_IMPORTED_MODULE_1__.getObjectsKeys)(diffuseMaps)

const constants = {
  combine: {
    'THREE.MultiplyOperation': three__WEBPACK_IMPORTED_MODULE_0__.MultiplyOperation,
    'THREE.MixOperation': three__WEBPACK_IMPORTED_MODULE_0__.MixOperation,
    'THREE.AddOperation': three__WEBPACK_IMPORTED_MODULE_0__.AddOperation
  },

  side: {
    'THREE.FrontSide': three__WEBPACK_IMPORTED_MODULE_0__.FrontSide,
    'THREE.BackSide': three__WEBPACK_IMPORTED_MODULE_0__.BackSide,
    'THREE.DoubleSide': three__WEBPACK_IMPORTED_MODULE_0__.DoubleSide
  },

  blendingMode: {
    'THREE.NoBlending': three__WEBPACK_IMPORTED_MODULE_0__.NoBlending,
    'THREE.NormalBlending': three__WEBPACK_IMPORTED_MODULE_0__.NormalBlending,
    'THREE.AdditiveBlending': three__WEBPACK_IMPORTED_MODULE_0__.AdditiveBlending,
    'THREE.SubtractiveBlending': three__WEBPACK_IMPORTED_MODULE_0__.SubtractiveBlending,
    'THREE.MultiplyBlending': three__WEBPACK_IMPORTED_MODULE_0__.MultiplyBlending,
    'THREE.CustomBlending': three__WEBPACK_IMPORTED_MODULE_0__.CustomBlending
  },

  equations: {
    'THREE.AddEquation': three__WEBPACK_IMPORTED_MODULE_0__.AddEquation,
    'THREE.SubtractEquation': three__WEBPACK_IMPORTED_MODULE_0__.SubtractEquation,
    'THREE.ReverseSubtractEquation': three__WEBPACK_IMPORTED_MODULE_0__.ReverseSubtractEquation
  },

  destinationFactors: {
    'THREE.ZeroFactor': three__WEBPACK_IMPORTED_MODULE_0__.ZeroFactor,
    'THREE.OneFactor': three__WEBPACK_IMPORTED_MODULE_0__.OneFactor,
    'THREE.SrcColorFactor': three__WEBPACK_IMPORTED_MODULE_0__.SrcColorFactor,
    'THREE.OneMinusSrcColorFactor': three__WEBPACK_IMPORTED_MODULE_0__.OneMinusSrcColorFactor,
    'THREE.SrcAlphaFactor': three__WEBPACK_IMPORTED_MODULE_0__.SrcAlphaFactor,
    'THREE.OneMinusSrcAlphaFactor': three__WEBPACK_IMPORTED_MODULE_0__.OneMinusSrcAlphaFactor,
    'THREE.DstAlphaFactor': three__WEBPACK_IMPORTED_MODULE_0__.DstAlphaFactor,
    'THREE.OneMinusDstAlphaFactor': three__WEBPACK_IMPORTED_MODULE_0__.OneMinusDstAlphaFactor
  },

  sourceFactors: {
    'THREE.DstColorFactor': three__WEBPACK_IMPORTED_MODULE_0__.DstColorFactor,
    'THREE.OneMinusDstColorFactor': three__WEBPACK_IMPORTED_MODULE_0__.OneMinusDstColorFactor,
    'THREE.SrcAlphaSaturateFactor': three__WEBPACK_IMPORTED_MODULE_0__.SrcAlphaSaturateFactor
  }
}

const handleColorChange = (color) => {
  return function (value) {
    if (typeof value === 'string') {
      value = value.replace('#', '0x')
    }

    color.setHex(value)
  }
}

const initializeGuiMaterial = (gui, mesh, material) => {
  const regex = /THREE.*Material/
  const toRemove = []
  gui.folders.map((f) => {
    if (
      regex.test(f._title) ||
      f._title === 'THREE.Material' ||
      f._title === 'THREE.MeshBasicMaterial' ||
      f._title === 'THREE.LineBasicMaterial' ||
      f._title === 'THREE.MeshNormalMaterial'
    ) {
      toRemove.push(f)
    }
  })
  for (const p of toRemove) p.destroy()

  const folder = gui.addFolder('THREE.Material')

  folder.add(material, 'transparent').onChange(needsUpdate(material, mesh))
  folder.add(material, 'opacity', 0, 1).step(0.01)
  folder.add(material, 'blending', constants.blendingMode)
  folder.add(material, 'blendSrc', constants.destinationFactors)
  folder.add(material, 'blendDst', constants.destinationFactors)
  folder.add(material, 'blendEquation', constants.equations)
  folder.add(material, 'depthTest')
  folder.add(material, 'depthWrite')

  // Probably to complex to enable
  // folder.add( material, 'polygonOffset' );
  // folder.add( material, 'polygonOffsetFactor' );
  // folder.add( material, 'polygonOffsetUnits' );

  folder.add(material, 'alphaTest', 0, 1).step(0.01).onChange(needsUpdate(material, mesh))
  folder.add(material, 'visible')
  folder.add(material, 'side', constants.side).onChange(needsUpdate(material, mesh))

  return folder
}

const initializeMeshDepthMaterial = (gui, mesh, material) => {
  const folder = gui.addFolder('THREE.MeshDepthMaterial')
  folder.add(material, 'wireframe')
}

const initializeMeshNormalMaterial = (gui, mesh, material, scene) => {
  const props = {
    vertexHelpers: false
  }

  for (const child of scene.children) {
    if (child.name === 'VertexNormalHelper') scene.remove(child)
  }

  const folder = gui.addFolder('THREE.MeshNormalMaterial')
  folder.add(material, 'wireframe')
  folder.add(material, 'flatShading').onChange(needsUpdate(material, mesh))
  folder.add(props, 'vertexHelpers').onChange((enabled) => {
    if (enabled) {
      (0,_util_modelUtil_js__WEBPACK_IMPORTED_MODULE_2__.visitChildren)(mesh, (c) => {
        const helper = new three_examples_jsm_helpers_VertexNormalsHelper__WEBPACK_IMPORTED_MODULE_3__.VertexNormalsHelper(c, 0.1)
        helper.name = 'VertexNormalHelper'
        scene.add(helper)
      })
    } else {
      for (const child of scene.children) {
        if (child.name === 'VertexNormalHelper') scene.remove(child)
      }
    }
  })
}

const initializeGuiMeshLambertMaterial = (gui, mesh, material, title) => {
  const data = {
    color: material.color.getHex(),
    emissive: material.emissive.getHex(),
    envMaps: envMapKeys[0],
    map: diffuseMapKeys[0]
  }

  const folder = gui.addFolder(title ?? 'THREE.MeshLambertMaterial')
  folder.addColor(data, 'emissive').onChange(handleColorChange(material.emissive))
  folder.add(material, 'emissiveIntensity', 0, 3)
  addRecurringMaterialProps(folder, data, material, mesh)
}

const initializeGuiMeshPhongMaterial = (gui, mesh, material, title) => {
  const data = {
    color: material.color.getHex(),
    emissive: material.emissive.getHex(),
    specular: material.specular.getHex(),
    envMaps: envMapKeys[0],
    map: diffuseMapKeys[0]
  }

  const folder = gui.addFolder(title ?? 'THREE.MeshPhongMaterial')
  folder.addColor(data, 'emissive').onChange(handleColorChange(material.emissive))
  folder.add(material, 'emissiveIntensity', 0, 3)
  folder.addColor(data, 'specular').onChange(handleColorChange(material.specular))
  folder.add(material, 'shininess', 0, 100)
  addRecurringMaterialProps(folder, data, material, mesh)
}

const initializeGuiMeshPhysicalMaterial = (gui, mesh, material, title) => {
  const data = {
    color: material.color.getHex(),
    emissive: material.emissive.getHex(),
    envMaps: envMapKeys[0],
    map: diffuseMapKeys[0]
  }

  const folder = gui.addFolder(title ?? 'THREE.MeshPhysicalMaterial')
  folder.addColor(data, 'emissive').onChange(handleColorChange(material.emissive))
  folder.add(material, 'emissiveIntensity', 0, 3)
  folder.add(material, 'roughness', 0, 1)
  folder.add(material, 'metalness', 0, 1)
  folder.add(material, 'clearcoat', 0, 1)
  folder.add(material, 'clearcoatRoughness', 0, 1)
  addRecurringMaterialProps(folder, data, material, mesh)
}

const initializeGuiMeshStandardMaterial = (gui, mesh, material, title) => {
  const data = {
    color: material.color.getHex(),
    emissive: material.emissive.getHex(),
    envMaps: envMapKeys[0],
    map: diffuseMapKeys[0]
  }

  const folder = gui.addFolder(title ?? 'THREE.MeshStandardMaterial')
  folder.addColor(data, 'emissive').onChange(handleColorChange(material.emissive))
  folder.add(material, 'emissiveIntensity', 0, 3)
  folder.add(material, 'roughness', 0, 1)
  folder.add(material, 'metalness', 0, 1)
  addRecurringMaterialProps(folder, data, material, mesh, {})

  return folder
}

const initializeGuiMeshBasicMaterial = (gui, mesh, material, title) => {
  const data = {
    color: material.color.getHex(),
    envMaps: envMapKeys[0],
    map: diffuseMapKeys[0]
  }

  const folder = gui.addFolder(title ?? 'THREE.MeshBasicMaterial')
  addRecurringMaterialProps(folder, data, material, mesh, {})
}

const initializeGuiLineBasicMaterial = (gui, mesh, material, title) => {
  const data = {
    color: material.color.getHex()
  }

  const folder = gui.addFolder(title ?? 'THREE.LineBasicMaterial')
  folder.addColor(data, 'color').onChange(handleColorChange(material.color))
  folder.add(material, 'vertexColors').onChange(needsUpdate(material, mesh))
  folder.add(material, 'linewidth', 0, 5, 0.1)
}

const initializeGuiLineDashedMaterial = (gui, mesh, material, title) => {
  const data = {
    color: material.color.getHex()
  }

  const folder = gui.addFolder(title ?? 'THREE.LineDashedMaterial')
  folder.addColor(data, 'color').onChange(handleColorChange(material.color))
  folder.add(material, 'vertexColors').onChange(needsUpdate(material, mesh))
  folder.add(material, 'linewidth', 0, 5, 0.1)
  folder.add(material, 'scale', 0, 5, 0.1)
  folder.add(material, 'dashSize', 0, 5, 0.1)
  folder.add(material, 'gapSize', 0, 5, 0.1)
}

function addRecurringMaterialProps(folder, data, material, mesh, disableEnv) {
  folder.addColor(data, 'color').onChange(handleColorChange(material.color))
  folder.add(material, 'wireframe')
  folder.add(material, 'vertexColors').onChange(needsUpdate(material, mesh))
  if (disableEnv ?? true) {
    folder.add(data, 'envMaps', envMapKeys).onChange(updateTexture(material, 'envMap', envMaps))
    folder.add(data, 'map', diffuseMapKeys).onChange(updateTexture(material, 'map', diffuseMaps))
    folder.add(material, 'combine', constants.combine).onChange(updateCombine(material))
    if (material.reflectivity) folder.add(material, 'reflectivity', 0, 1)
    folder.add(material, 'refractionRatio', 0, 1)
  }
}

const initializeGuiMeshToonMaterial = (gui, mesh, material, title) => {
  const data = {
    color: material.color.getHex(),
    envMaps: envMapKeys[0],
    map: diffuseMapKeys[0]
  }

  const folder = gui.addFolder(title ?? 'THREE.MeshToonMaterial')
  addRecurringMaterialProps(folder, data, material, mesh, false)
}

const initializePointsMaterial = (gui, mesh, material, title) => {
  const data = {
    color: material.color.getHex(),
    size: 1,
    sizeAttenuation: false,
    vertexColors: true
  }

  const folder = gui.addFolder(title ?? 'THREE.PointsMaterial')
  folder.addColor(data, 'color').onChange(handleColorChange(material.color))
  folder.add(material, 'size', 0, 2, 0.01)
  folder.add(material, 'sizeAttenuation').onChange(needsUpdate(material, mesh))
  folder.add(material, 'vertexColors').onChange(needsUpdate(material, mesh))
}

const initializeSpriteMaterial = (gui, mesh, material, title) => {
  const data = {
    color: material.color.getHex(),
    size: 1,
    sizeAttenuation: false
  }

  const folder = gui.addFolder(title ?? 'THREE.SpriteMaterial')
  folder.addColor(data, 'color').onChange(handleColorChange(material.color))
  folder.add(material, 'sizeAttenuation').onChange(needsUpdate(material, mesh))
}

function needsUpdate(material, mesh) {
  return function () {
    material.side = parseInt(material.side) //Ensure number
    material.needsUpdate = true

    ;(0,_util_modelUtil_js__WEBPACK_IMPORTED_MODULE_2__.visitChildren)(mesh, (c) => {
      if (c.geometry) {
        c.geometry.attributes.position.needsUpdate = true
        if (c.geometry.attributes.normal) c.geometry.attributes.normal.needsUpdate = true
        if (c.geometry.attributes.color) c.geometry.attributes.color.needsUpdate = true
      }
    })
  }
}

function updateTexture(material, materialKey, textures) {
  return function (key) {
    material[materialKey] = textures[key]
    material.needsUpdate = true
  }
}

function updateCombine(material) {
  return function (combine) {
    material.combine = parseInt(combine)
    material.needsUpdate = true
  }
}




/***/ },

/***/ "./samples/controls/renderer-control.js"
/*!**********************************************!*\
  !*** ./samples/controls/renderer-control.js ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   intializeRendererControls: () => (/* binding */ intializeRendererControls)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");


const enums = {
  toneMappingOptions: {
    None: three__WEBPACK_IMPORTED_MODULE_0__.NoToneMapping,
    Linear: three__WEBPACK_IMPORTED_MODULE_0__.LinearToneMapping,
    Reinhard: three__WEBPACK_IMPORTED_MODULE_0__.ReinhardToneMapping,
    Cineon: three__WEBPACK_IMPORTED_MODULE_0__.CineonToneMapping,
    ACESFilmic: three__WEBPACK_IMPORTED_MODULE_0__.ACESFilmicToneMapping,
    Custom: three__WEBPACK_IMPORTED_MODULE_0__.CustomToneMapping,
  },
  shadowMapping: {
    Basic: three__WEBPACK_IMPORTED_MODULE_0__.BasicShadowMap,
    PCFS: three__WEBPACK_IMPORTED_MODULE_0__.PCFShadowMap,
    PCFSoft: three__WEBPACK_IMPORTED_MODULE_0__.PCFSoftShadowMap,
    VSM: three__WEBPACK_IMPORTED_MODULE_0__.VSMShadowMap,
  },
  outputEncodings: {
    Linear: three__WEBPACK_IMPORTED_MODULE_0__.LinearEncoding,
    sRGB: three__WEBPACK_IMPORTED_MODULE_0__.sRGBEncoding,
  },
};

const getPropertyHolder = (webGLRenderer) => {
  const clearColorHolder = new three__WEBPACK_IMPORTED_MODULE_0__.Color();
  webGLRenderer.getClearColor(clearColorHolder);

  const holder = {
    main: {
      outputEncoding: webGLRenderer.outputEncoding,
    },
    shadowMap: {
      enabled: webGLRenderer.shadowMap.enabled,
      autoUpdate: webGLRenderer.shadowMap.autoUpdate,
      needsUpdate: () => (webGLRenderer.shadowMap.needsUpdate = true),
      type: webGLRenderer.shadowMap.type,
    },
    toneMapping: {
      exposure: webGLRenderer.toneMappingExposure,
      toneMapping: webGLRenderer.toneMapping,
    },
    clearSettings: {
      autoClear: webGLRenderer.autoClear,
      clearColor: clearColorHolder.getStyle(),
    },
    advanced: {
      autoClearDepth: webGLRenderer.autoClearDepth,
      autoClearStencil: webGLRenderer.autoClearStencil,
      checkShaderErrors: webGLRenderer.debug.checkShaderErrors,
      sortObjects: webGLRenderer.sortObjects,
      localClippingEnabled: webGLRenderer.localClippingEnabled,
      physicallyCorrectLights: webGLRenderer.physicallyCorrectLights,
    },
  };

  return holder;
};

const intializeRendererControls = (gui, webGLRenderer) => {
  const propertiesObject = getPropertyHolder(webGLRenderer);
  const rendererFolder = gui.addFolder("WebGLRenderer");

  rendererFolder.onChange((_) => {
    updateWebGLRendererProperties(webGLRenderer, propertiesObject);
  });

  rendererFolder.add(
    propertiesObject.main,
    "outputEncoding",
    enums.outputEncodings
  );

  const shadowFolder = rendererFolder.addFolder("Shadow");
  shadowFolder.add(propertiesObject.shadowMap, "enabled");
  shadowFolder.add(propertiesObject.shadowMap, "autoUpdate");
  shadowFolder.add(propertiesObject.shadowMap, "needsUpdate");
  shadowFolder
    .add(propertiesObject.shadowMap, "type", enums.shadowMapping)
    .enable(false); // can't update the shadow mapping type in runtime

  const toneMappingFolder = rendererFolder.addFolder("ToneMapping");
  toneMappingFolder.add(propertiesObject.toneMapping, "exposure", 0, 2);
  toneMappingFolder.add(
    propertiesObject.toneMapping,
    "toneMapping",
    enums.toneMappingOptions
  );

  const clearSettingsFolder = rendererFolder.addFolder("clearSettings");
  clearSettingsFolder.add(propertiesObject.clearSettings, "autoClear");
  clearSettingsFolder.addColor(propertiesObject.clearSettings, "clearColor");

  rendererFolder.close();
};

const updateWebGLRendererProperties = (webGLRenderer, propertyHolder) => {
  webGLRenderer.shadowMap.enabled = propertyHolder.shadowMap.enabled;
  webGLRenderer.shadowMap.autoUpdate = propertyHolder.shadowMap.autoUpdate;
  webGLRenderer.shadowMap.needsUpdate = propertyHolder.shadowMap.needsUpdate;
  webGLRenderer.toneMapping = propertyHolder.toneMapping.toneMapping;
  webGLRenderer.toneMappingExposure = propertyHolder.toneMapping.exposure;
  webGLRenderer.autoClear = propertyHolder.clearSettings.autoClear;
  webGLRenderer.setClearColor(propertyHolder.clearSettings.clearColor);
  webGLRenderer.outputEncoding = propertyHolder.main.outputEncoding;

  webGLRenderer.needsUpdate = true;
};


/***/ },

/***/ "./samples/util/index.js"
/*!*******************************!*\
  !*** ./samples/util/index.js ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getObjectsKeys: () => (/* binding */ getObjectsKeys)
/* harmony export */ });
const getObjectsKeys = (obj) => {
  const keys = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      keys.push(key);
    }
  }

  return keys;
};


/***/ },

/***/ "./samples/util/modelUtil.js"
/*!***********************************!*\
  !*** ./samples/util/modelUtil.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyShadowsAndDepthWrite: () => (/* binding */ applyShadowsAndDepthWrite),
/* harmony export */   findChild: () => (/* binding */ findChild),
/* harmony export */   visitChildren: () => (/* binding */ visitChildren)
/* harmony export */ });
const visitChildren = (object, fn) => {
  if (object.children && object.children.length > 0) {
    for (const child of object.children) {
      visitChildren(child, fn)
    }
  } else {
    fn(object)
  }
}

const applyShadowsAndDepthWrite = (object) => {
  visitChildren(object, (child) => {
    if (child.material) {
      child.material.depthWrite = true
      child.castShadow = true
      child.receiveShadow = true
    }
  })
}

const findChild = (object, name) => {
  if (object.children && object.children.length > 0) {
    for (const child of object.children) {
      if (name === child.name) {
        return child
      } else {
        const res = findChild(child, name)
        if (res) {
          return res
        }
      }
    }
  } else {
    if (name === object.name) {
      return object
    } else {
      return undefined
    }
  }
}


/***/ },

/***/ "./samples/util/update-on-resize.js"
/*!******************************************!*\
  !*** ./samples/util/update-on-resize.js ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   onResize: () => (/* binding */ onResize)
/* harmony export */ });
const onResize = (camera, renderer) => {
  const resizer = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', resizer, false)
}


/***/ }

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvc2FtcGxlc19ib290c3RyYXBfYm9vdHN0cmFwX2pzLXNhbXBsZXNfY29udHJvbHNfbWF0ZXJpYWwtY29udHJvbHNfanMtc2FtcGxlc19jb250cm9sc19yZW5kZXJlLWM4N2Q4YS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUE4QjtBQUNvQztBQUN6QjtBQUNVOztBQUU1QyxxQkFBcUIsa0ZBQWtGO0FBQzlHO0FBQ0E7QUFDQSxzQkFBc0Isd0NBQVc7QUFDakM7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0JBQXNCLHNDQUFTO0FBQy9COztBQUVBO0FBQ0EsdUJBQXVCLG9EQUF1QjtBQUM5Qyx5QkFBeUIsZ0RBQW1CLEdBQUcsaUJBQWlCO0FBQ2hFLDhCQUE4QiwrQ0FBa0I7QUFDaEQ7QUFDQSw4QkFBOEIsK0NBQWtCO0FBQ2hEOztBQUVBLElBQUksaUVBQVE7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiwrRUFBaUI7QUFDdkM7O0FBRUE7QUFDQTtBQUNBLE1BQU0sdURBQVksVUFBVSxnQkFBZ0I7QUFDNUM7O0FBRUEsU0FBUyx3Q0FBd0M7QUFDakQ7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzVDOEI7O0FBRXZCLCtCQUErQixnQkFBZ0I7QUFDdEQ7QUFDQSxnQkFBZ0IsK0NBQWtCOztBQUVsQztBQUNBLHVCQUF1QixtREFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZCeUU7O0FBRWxFO0FBQ1AseUJBQXlCLG9GQUFhO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWkE7QUFDOEI7QUFDbUI7QUFDRztBQUNnQzs7QUFFcEY7QUFDQSw4QkFBOEIsZ0RBQW1CO0FBQ2pELHFCQUFxQixtRUFBc0M7QUFD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QUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7O0FBRXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMxR087QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVk87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDdkNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvYm9vdHN0cmFwL2Jvb3RzdHJhcC5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvYm9vdHN0cmFwL2xpZ2h0aW5nLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jb250cm9sbGVyL29yYml0LWNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NvbnRyb2xzL21hdGVyaWFsLWNvbnRyb2xzLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jb250cm9scy9yZW5kZXJlci1jb250cm9sLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy91dGlsL2luZGV4LmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy91dGlsL21vZGVsVXRpbC5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvdXRpbC91cGRhdGUtb24tcmVzaXplLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuaW1wb3J0IHsgaW5pdE9yYml0Q29udHJvbHMgfSBmcm9tICcuLi9jb250cm9sbGVyL29yYml0LWNvbnRyb2xsZXInXG5pbXBvcnQgeyBpbml0TGlnaHRpbmcgfSBmcm9tICcuL2xpZ2h0aW5nJ1xuaW1wb3J0IHsgb25SZXNpemUgfSBmcm9tICcuLi91dGlsL3VwZGF0ZS1vbi1yZXNpemUnXG5cbmV4cG9ydCBjb25zdCBpbml0U2NlbmUgPSAoeyBiYWNrZ3JvdW5kQ29sb3IsIGZvZ0NvbG9yLCBkaXNhYmxlU2hhZG93cywgZGlzYWJsZUxpZ2h0cywgZGlzYWJsZURlZmF1bHRDb250cm9scyB9KSA9PiB7XG4gIGNvbnN0IGluaXQgPSAoZm4pID0+IHtcbiAgICAvLyBiYXNpYyBzY2VuZSBzZXR1cFxuICAgIGNvbnN0IHNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKClcbiAgICBpZiAoYmFja2dyb3VuZENvbG9yKSB7XG4gICAgICBzY2VuZS5iYWNrZ3JvdW5kQ29sb3IgPSBiYWNrZ3JvdW5kQ29sb3JcbiAgICB9XG5cbiAgICBpZiAoZm9nQ29sb3IpIHtcbiAgICAgIHNjZW5lLmZvZyA9IG5ldyBUSFJFRS5Gb2coZm9nQ29sb3IsIDAuMDAyNSwgNTApXG4gICAgfVxuXG4gICAgLy8gc2V0dXAgY2FtZXJhIGFuZCBiYXNpYyByZW5kZXJlclxuICAgIGNvbnN0IGNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg3NSwgd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQsIDAuMSwgMTAwMClcbiAgICBjb25zdCByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHsgYW50aWFsaWFzOiB0cnVlIH0pXG4gICAgcmVuZGVyZXIub3V0cHV0RW5jb2RpbmcgPSBUSFJFRS5zUkdCRW5jb2RpbmdcbiAgICByZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IHRydWVcbiAgICByZW5kZXJlci5zaGFkb3dNYXAudHlwZSA9IFRIUkVFLlZTTVNoYWRvd01hcFxuICAgIHJlbmRlcmVyLnNldENsZWFyQ29sb3IoYmFja2dyb3VuZENvbG9yKVxuXG4gICAgb25SZXNpemUoY2FtZXJhLCByZW5kZXJlcilcbiAgICByZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci5kb21FbGVtZW50KVxuXG4gICAgLy8gaW5pdGlhbGl6ZSBvcmJpdCBjb250cm9sc1xuICAgIGxldCBvcmJpdENvbnRyb2xzXG4gICAgaWYgKCFkaXNhYmxlRGVmYXVsdENvbnRyb2xzKSB7XG4gICAgICBvcmJpdENvbnRyb2xzID0gaW5pdE9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlcilcbiAgICB9XG5cbiAgICAvLyBhZGQgc29tZSBiYXNpYyBsaWdodGluZyB0byB0aGUgc2NlbmVcbiAgICBpZiAoIWRpc2FibGVMaWdodHMgPz8gZmFsc2UpIHtcbiAgICAgIGluaXRMaWdodGluZyhzY2VuZSwgeyBkaXNhYmxlU2hhZG93cyB9KVxuICAgIH1cblxuICAgIGZuKHsgc2NlbmUsIGNhbWVyYSwgcmVuZGVyZXIsIG9yYml0Q29udHJvbHMgfSlcbiAgfVxuXG4gIHJldHVybiBpbml0XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcblxuZXhwb3J0IGNvbnN0IGluaXRMaWdodGluZyA9IChzY2VuZSwgeyBkaXNhYmxlU2hhZG93cyB9KSA9PiB7XG4gIC8vIGh0dHBzOi8vdGhyZWVqcy5vcmcvZXhhbXBsZXMvP3E9c2hhZG8jd2ViZ2xfc2hhZG93bWFwX3ZzbVxuICBzY2VuZS5hZGQobmV3IFRIUkVFLkFtYmllbnRMaWdodCgweDY2NjY2NikpXG5cbiAgLy8gY29uc3QgZGlyTGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGFhYWFhYSlcbiAgY29uc3QgZGlyTGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGFhYWFhYSlcbiAgZGlyTGlnaHQucG9zaXRpb24uc2V0KDUsIDEyLCA4KVxuICBkaXJMaWdodC5jYXN0U2hhZG93ID0gIWRpc2FibGVTaGFkb3dzID8gdHJ1ZSA6IGZhbHNlXG4gIGRpckxpZ2h0LmludGVuc2l0eSA9IDFcbiAgZGlyTGlnaHQuc2hhZG93LmNhbWVyYS5uZWFyID0gMC4xXG4gIGRpckxpZ2h0LnNoYWRvdy5jYW1lcmEuZmFyID0gMjAwXG4gIGRpckxpZ2h0LnNoYWRvdy5jYW1lcmEucmlnaHQgPSAxMFxuICBkaXJMaWdodC5zaGFkb3cuY2FtZXJhLmxlZnQgPSAtMTBcbiAgZGlyTGlnaHQuc2hhZG93LmNhbWVyYS50b3AgPSAxMFxuICBkaXJMaWdodC5zaGFkb3cuY2FtZXJhLmJvdHRvbSA9IC0xMFxuICBkaXJMaWdodC5zaGFkb3cubWFwU2l6ZS53aWR0aCA9IDIwNDhcbiAgZGlyTGlnaHQuc2hhZG93Lm1hcFNpemUuaGVpZ2h0ID0gMjA0OFxuICBkaXJMaWdodC5zaGFkb3cucmFkaXVzID0gNFxuICBkaXJMaWdodC5zaGFkb3cuYmlhcyA9IC0wLjAwMDA1XG5cbiAgc2NlbmUuYWRkKGRpckxpZ2h0KVxufVxuIiwiaW1wb3J0IHsgT3JiaXRDb250cm9scyB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9jb250cm9scy9PcmJpdENvbnRyb2xzJ1xuXG5leHBvcnQgY29uc3QgaW5pdE9yYml0Q29udHJvbHMgPSAoY2FtZXJhLCByZW5kZXJlcikgPT4ge1xuICBjb25zdCBjb250cm9sbGVyID0gbmV3IE9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlci5kb21FbGVtZW50KVxuICBjb250cm9sbGVyLmVuYWJsZURhbXBpbmcgPSB0cnVlXG4gIGNvbnRyb2xsZXIuZGFtcGluZ0ZhY3RvciA9IDAuMDVcbiAgY29udHJvbGxlci5taW5EaXN0YW5jZSA9IDFcbiAgY29udHJvbGxlci5tYXhEaXN0YW5jZSA9IDEwMFxuICBjb250cm9sbGVyLm1pblBvbGFyQW5nbGUgPSBNYXRoLlBJIC8gNFxuICBjb250cm9sbGVyLm1heFBvbGFyQW5nbGUgPSAoMyAqIE1hdGguUEkpIC8gNFxuXG4gIHJldHVybiBjb250cm9sbGVyXG59XG4iLCIvLyBhZG9wdGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9ibG9iL2EyNGU5ODAzNzM4Y2U3YWE1NzFlMGNlYTZhODU4ZWQwMDc4YTEwMDQvZG9jcy9zY2VuZXMvbWF0ZXJpYWwtYnJvd3Nlci5odG1sXG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcbmltcG9ydCB7IGdldE9iamVjdHNLZXlzIH0gZnJvbSAnLi4vdXRpbC9pbmRleC5qcydcbmltcG9ydCB7IHZpc2l0Q2hpbGRyZW4gfSBmcm9tICcuLi91dGlsL21vZGVsVXRpbC5qcydcbmltcG9ydCB7IFZlcnRleE5vcm1hbHNIZWxwZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vaGVscGVycy9WZXJ0ZXhOb3JtYWxzSGVscGVyJ1xuXG5jb25zdCBlbnZNYXBzID0gKGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgcmVmbGVjdGlvbkN1YmUyID0gbmV3IFRIUkVFLlRleHR1cmVMb2FkZXIoKS5sb2FkKCcvYXNzZXRzL2VxdWkuanBlZycsIChsb2FkZWQpID0+IHtcbiAgICBsb2FkZWQubWFwcGluZyA9IFRIUkVFLkVxdWlyZWN0YW5ndWxhclJlZmxlY3Rpb25NYXBwaW5nXG4gIH0pXG4gIGNvbnN0IHJlZnJhY3Rpb25DdWJlMiA9IG5ldyBUSFJFRS5UZXh0dXJlTG9hZGVyKCkubG9hZCgnL2Fzc2V0cy9lcXVpLmpwZWcnLCAobG9hZGVkKSA9PiB7XG4gICAgbG9hZGVkLm1hcHBpbmcgPSBUSFJFRS5FcXVpcmVjdGFuZ3VsYXJSZWZyYWN0aW9uTWFwcGluZ1xuICB9KVxuXG4gIHJldHVybiB7XG4gICAgbm9uZTogbnVsbCxcbiAgICByZWZsZWN0aW9uOiByZWZsZWN0aW9uQ3ViZTIsXG4gICAgcmVmcmFjdGlvbjogcmVmcmFjdGlvbkN1YmUyXG4gIH1cbn0pKClcblxuY29uc3QgdGV4dHVyZUxvYWRlciA9IG5ldyBUSFJFRS5UZXh0dXJlTG9hZGVyKClcbmNvbnN0IGRpZmZ1c2VNYXBzID0gKGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgcGFycXVldCA9IHRleHR1cmVMb2FkZXIubG9hZCgnL2Fzc2V0cy90ZXh0dXJlcy93b29kL2Zsb29yLXBhcnF1ZXQtcGF0dGVybi0xNzIyOTIuanBnJylcbiAgcGFycXVldC5lbmNvZGluZyA9IFRIUkVFLnNSR0JFbmNvZGluZ1xuICBwYXJxdWV0LndyYXBTID0gVEhSRUUuUmVwZWF0V3JhcHBpbmdcbiAgcGFycXVldC53cmFwVCA9IFRIUkVFLlJlcGVhdFdyYXBwaW5nXG4gIHBhcnF1ZXQucmVwZWF0LnNldCg5LCAxKVxuXG4gIGNvbnN0IGFudGlxdWUgPSB0ZXh0dXJlTG9hZGVyLmxvYWQoJy9hc3NldHMvdGV4dHVyZXMvd29vZC9hYnN0cmFjdC1hbnRpcXVlLWJhY2tkcm9wLTE2NDAwNS5qcGcnKVxuICBhbnRpcXVlLmVuY29kaW5nID0gVEhSRUUuc1JHQkVuY29kaW5nXG4gIGFudGlxdWUud3JhcFMgPSBUSFJFRS5SZXBlYXRXcmFwcGluZ1xuICBhbnRpcXVlLndyYXBUID0gVEhSRUUuUmVwZWF0V3JhcHBpbmdcbiAgYW50aXF1ZS5yZXBlYXQuc2V0KDksIDEpXG5cbiAgY29uc3QgbWFyYmxlID0gdGV4dHVyZUxvYWRlci5sb2FkKCcvYXNzZXRzL3RleHR1cmVzL21hcmJsZS9tYXJibGVfMDAwOF9jb2xvcl8yay5qcGcnKVxuICBtYXJibGUuZW5jb2RpbmcgPSBUSFJFRS5zUkdCRW5jb2RpbmdcbiAgbWFyYmxlLndyYXBTID0gVEhSRUUuUmVwZWF0V3JhcHBpbmdcbiAgbWFyYmxlLndyYXBUID0gVEhSRUUuUmVwZWF0V3JhcHBpbmdcblxuICBjb25zdCBncm91bmQgPSB0ZXh0dXJlTG9hZGVyLmxvYWQoJy9hc3NldHMvdGV4dHVyZXMvZ3JvdW5kL2dyb3VuZF8wMDM2X2NvbG9yXzFrLmpwZycpXG4gIG1hcmJsZS5lbmNvZGluZyA9IFRIUkVFLnNSR0JFbmNvZGluZ1xuICBtYXJibGUud3JhcFMgPSBUSFJFRS5SZXBlYXRXcmFwcGluZ1xuICBtYXJibGUud3JhcFQgPSBUSFJFRS5SZXBlYXRXcmFwcGluZ1xuXG4gIHJldHVybiB7XG4gICAgbm9uZTogbnVsbCxcbiAgICBmbG9vckFudGlxdWU6IGFudGlxdWUsXG4gICAgZmxvb3JQYXJxdWV0OiBwYXJxdWV0LFxuICAgIG1hcmJsZTogbWFyYmxlLFxuICAgIGdyb3VuZDogZ3JvdW5kXG4gIH1cbn0pKClcblxuY29uc3QgZW52TWFwS2V5cyA9IGdldE9iamVjdHNLZXlzKGVudk1hcHMpXG5jb25zdCBkaWZmdXNlTWFwS2V5cyA9IGdldE9iamVjdHNLZXlzKGRpZmZ1c2VNYXBzKVxuXG5jb25zdCBjb25zdGFudHMgPSB7XG4gIGNvbWJpbmU6IHtcbiAgICAnVEhSRUUuTXVsdGlwbHlPcGVyYXRpb24nOiBUSFJFRS5NdWx0aXBseU9wZXJhdGlvbixcbiAgICAnVEhSRUUuTWl4T3BlcmF0aW9uJzogVEhSRUUuTWl4T3BlcmF0aW9uLFxuICAgICdUSFJFRS5BZGRPcGVyYXRpb24nOiBUSFJFRS5BZGRPcGVyYXRpb25cbiAgfSxcblxuICBzaWRlOiB7XG4gICAgJ1RIUkVFLkZyb250U2lkZSc6IFRIUkVFLkZyb250U2lkZSxcbiAgICAnVEhSRUUuQmFja1NpZGUnOiBUSFJFRS5CYWNrU2lkZSxcbiAgICAnVEhSRUUuRG91YmxlU2lkZSc6IFRIUkVFLkRvdWJsZVNpZGVcbiAgfSxcblxuICBibGVuZGluZ01vZGU6IHtcbiAgICAnVEhSRUUuTm9CbGVuZGluZyc6IFRIUkVFLk5vQmxlbmRpbmcsXG4gICAgJ1RIUkVFLk5vcm1hbEJsZW5kaW5nJzogVEhSRUUuTm9ybWFsQmxlbmRpbmcsXG4gICAgJ1RIUkVFLkFkZGl0aXZlQmxlbmRpbmcnOiBUSFJFRS5BZGRpdGl2ZUJsZW5kaW5nLFxuICAgICdUSFJFRS5TdWJ0cmFjdGl2ZUJsZW5kaW5nJzogVEhSRUUuU3VidHJhY3RpdmVCbGVuZGluZyxcbiAgICAnVEhSRUUuTXVsdGlwbHlCbGVuZGluZyc6IFRIUkVFLk11bHRpcGx5QmxlbmRpbmcsXG4gICAgJ1RIUkVFLkN1c3RvbUJsZW5kaW5nJzogVEhSRUUuQ3VzdG9tQmxlbmRpbmdcbiAgfSxcblxuICBlcXVhdGlvbnM6IHtcbiAgICAnVEhSRUUuQWRkRXF1YXRpb24nOiBUSFJFRS5BZGRFcXVhdGlvbixcbiAgICAnVEhSRUUuU3VidHJhY3RFcXVhdGlvbic6IFRIUkVFLlN1YnRyYWN0RXF1YXRpb24sXG4gICAgJ1RIUkVFLlJldmVyc2VTdWJ0cmFjdEVxdWF0aW9uJzogVEhSRUUuUmV2ZXJzZVN1YnRyYWN0RXF1YXRpb25cbiAgfSxcblxuICBkZXN0aW5hdGlvbkZhY3RvcnM6IHtcbiAgICAnVEhSRUUuWmVyb0ZhY3Rvcic6IFRIUkVFLlplcm9GYWN0b3IsXG4gICAgJ1RIUkVFLk9uZUZhY3Rvcic6IFRIUkVFLk9uZUZhY3RvcixcbiAgICAnVEhSRUUuU3JjQ29sb3JGYWN0b3InOiBUSFJFRS5TcmNDb2xvckZhY3RvcixcbiAgICAnVEhSRUUuT25lTWludXNTcmNDb2xvckZhY3Rvcic6IFRIUkVFLk9uZU1pbnVzU3JjQ29sb3JGYWN0b3IsXG4gICAgJ1RIUkVFLlNyY0FscGhhRmFjdG9yJzogVEhSRUUuU3JjQWxwaGFGYWN0b3IsXG4gICAgJ1RIUkVFLk9uZU1pbnVzU3JjQWxwaGFGYWN0b3InOiBUSFJFRS5PbmVNaW51c1NyY0FscGhhRmFjdG9yLFxuICAgICdUSFJFRS5Ec3RBbHBoYUZhY3Rvcic6IFRIUkVFLkRzdEFscGhhRmFjdG9yLFxuICAgICdUSFJFRS5PbmVNaW51c0RzdEFscGhhRmFjdG9yJzogVEhSRUUuT25lTWludXNEc3RBbHBoYUZhY3RvclxuICB9LFxuXG4gIHNvdXJjZUZhY3RvcnM6IHtcbiAgICAnVEhSRUUuRHN0Q29sb3JGYWN0b3InOiBUSFJFRS5Ec3RDb2xvckZhY3RvcixcbiAgICAnVEhSRUUuT25lTWludXNEc3RDb2xvckZhY3Rvcic6IFRIUkVFLk9uZU1pbnVzRHN0Q29sb3JGYWN0b3IsXG4gICAgJ1RIUkVFLlNyY0FscGhhU2F0dXJhdGVGYWN0b3InOiBUSFJFRS5TcmNBbHBoYVNhdHVyYXRlRmFjdG9yXG4gIH1cbn1cblxuY29uc3QgaGFuZGxlQ29sb3JDaGFuZ2UgPSAoY29sb3IpID0+IHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoJyMnLCAnMHgnKVxuICAgIH1cblxuICAgIGNvbG9yLnNldEhleCh2YWx1ZSlcbiAgfVxufVxuXG5jb25zdCBpbml0aWFsaXplR3VpTWF0ZXJpYWwgPSAoZ3VpLCBtZXNoLCBtYXRlcmlhbCkgPT4ge1xuICBjb25zdCByZWdleCA9IC9USFJFRS4qTWF0ZXJpYWwvXG4gIGNvbnN0IHRvUmVtb3ZlID0gW11cbiAgZ3VpLmZvbGRlcnMubWFwKChmKSA9PiB7XG4gICAgaWYgKFxuICAgICAgcmVnZXgudGVzdChmLl90aXRsZSkgfHxcbiAgICAgIGYuX3RpdGxlID09PSAnVEhSRUUuTWF0ZXJpYWwnIHx8XG4gICAgICBmLl90aXRsZSA9PT0gJ1RIUkVFLk1lc2hCYXNpY01hdGVyaWFsJyB8fFxuICAgICAgZi5fdGl0bGUgPT09ICdUSFJFRS5MaW5lQmFzaWNNYXRlcmlhbCcgfHxcbiAgICAgIGYuX3RpdGxlID09PSAnVEhSRUUuTWVzaE5vcm1hbE1hdGVyaWFsJ1xuICAgICkge1xuICAgICAgdG9SZW1vdmUucHVzaChmKVxuICAgIH1cbiAgfSlcbiAgZm9yIChjb25zdCBwIG9mIHRvUmVtb3ZlKSBwLmRlc3Ryb3koKVxuXG4gIGNvbnN0IGZvbGRlciA9IGd1aS5hZGRGb2xkZXIoJ1RIUkVFLk1hdGVyaWFsJylcblxuICBmb2xkZXIuYWRkKG1hdGVyaWFsLCAndHJhbnNwYXJlbnQnKS5vbkNoYW5nZShuZWVkc1VwZGF0ZShtYXRlcmlhbCwgbWVzaCkpXG4gIGZvbGRlci5hZGQobWF0ZXJpYWwsICdvcGFjaXR5JywgMCwgMSkuc3RlcCgwLjAxKVxuICBmb2xkZXIuYWRkKG1hdGVyaWFsLCAnYmxlbmRpbmcnLCBjb25zdGFudHMuYmxlbmRpbmdNb2RlKVxuICBmb2xkZXIuYWRkKG1hdGVyaWFsLCAnYmxlbmRTcmMnLCBjb25zdGFudHMuZGVzdGluYXRpb25GYWN0b3JzKVxuICBmb2xkZXIuYWRkKG1hdGVyaWFsLCAnYmxlbmREc3QnLCBjb25zdGFudHMuZGVzdGluYXRpb25GYWN0b3JzKVxuICBmb2xkZXIuYWRkKG1hdGVyaWFsLCAnYmxlbmRFcXVhdGlvbicsIGNvbnN0YW50cy5lcXVhdGlvbnMpXG4gIGZvbGRlci5hZGQobWF0ZXJpYWwsICdkZXB0aFRlc3QnKVxuICBmb2xkZXIuYWRkKG1hdGVyaWFsLCAnZGVwdGhXcml0ZScpXG5cbiAgLy8gUHJvYmFibHkgdG8gY29tcGxleCB0byBlbmFibGVcbiAgLy8gZm9sZGVyLmFkZCggbWF0ZXJpYWwsICdwb2x5Z29uT2Zmc2V0JyApO1xuICAvLyBmb2xkZXIuYWRkKCBtYXRlcmlhbCwgJ3BvbHlnb25PZmZzZXRGYWN0b3InICk7XG4gIC8vIGZvbGRlci5hZGQoIG1hdGVyaWFsLCAncG9seWdvbk9mZnNldFVuaXRzJyApO1xuXG4gIGZvbGRlci5hZGQobWF0ZXJpYWwsICdhbHBoYVRlc3QnLCAwLCAxKS5zdGVwKDAuMDEpLm9uQ2hhbmdlKG5lZWRzVXBkYXRlKG1hdGVyaWFsLCBtZXNoKSlcbiAgZm9sZGVyLmFkZChtYXRlcmlhbCwgJ3Zpc2libGUnKVxuICBmb2xkZXIuYWRkKG1hdGVyaWFsLCAnc2lkZScsIGNvbnN0YW50cy5zaWRlKS5vbkNoYW5nZShuZWVkc1VwZGF0ZShtYXRlcmlhbCwgbWVzaCkpXG5cbiAgcmV0dXJuIGZvbGRlclxufVxuXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZU1lc2hEZXB0aE1hdGVyaWFsID0gKGd1aSwgbWVzaCwgbWF0ZXJpYWwpID0+IHtcbiAgY29uc3QgZm9sZGVyID0gZ3VpLmFkZEZvbGRlcignVEhSRUUuTWVzaERlcHRoTWF0ZXJpYWwnKVxuICBmb2xkZXIuYWRkKG1hdGVyaWFsLCAnd2lyZWZyYW1lJylcbn1cblxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVNZXNoTm9ybWFsTWF0ZXJpYWwgPSAoZ3VpLCBtZXNoLCBtYXRlcmlhbCwgc2NlbmUpID0+IHtcbiAgY29uc3QgcHJvcHMgPSB7XG4gICAgdmVydGV4SGVscGVyczogZmFsc2VcbiAgfVxuXG4gIGZvciAoY29uc3QgY2hpbGQgb2Ygc2NlbmUuY2hpbGRyZW4pIHtcbiAgICBpZiAoY2hpbGQubmFtZSA9PT0gJ1ZlcnRleE5vcm1hbEhlbHBlcicpIHNjZW5lLnJlbW92ZShjaGlsZClcbiAgfVxuXG4gIGNvbnN0IGZvbGRlciA9IGd1aS5hZGRGb2xkZXIoJ1RIUkVFLk1lc2hOb3JtYWxNYXRlcmlhbCcpXG4gIGZvbGRlci5hZGQobWF0ZXJpYWwsICd3aXJlZnJhbWUnKVxuICBmb2xkZXIuYWRkKG1hdGVyaWFsLCAnZmxhdFNoYWRpbmcnKS5vbkNoYW5nZShuZWVkc1VwZGF0ZShtYXRlcmlhbCwgbWVzaCkpXG4gIGZvbGRlci5hZGQocHJvcHMsICd2ZXJ0ZXhIZWxwZXJzJykub25DaGFuZ2UoKGVuYWJsZWQpID0+IHtcbiAgICBpZiAoZW5hYmxlZCkge1xuICAgICAgdmlzaXRDaGlsZHJlbihtZXNoLCAoYykgPT4ge1xuICAgICAgICBjb25zdCBoZWxwZXIgPSBuZXcgVmVydGV4Tm9ybWFsc0hlbHBlcihjLCAwLjEpXG4gICAgICAgIGhlbHBlci5uYW1lID0gJ1ZlcnRleE5vcm1hbEhlbHBlcidcbiAgICAgICAgc2NlbmUuYWRkKGhlbHBlcilcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAoY29uc3QgY2hpbGQgb2Ygc2NlbmUuY2hpbGRyZW4pIHtcbiAgICAgICAgaWYgKGNoaWxkLm5hbWUgPT09ICdWZXJ0ZXhOb3JtYWxIZWxwZXInKSBzY2VuZS5yZW1vdmUoY2hpbGQpXG4gICAgICB9XG4gICAgfVxuICB9KVxufVxuXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZUd1aU1lc2hMYW1iZXJ0TWF0ZXJpYWwgPSAoZ3VpLCBtZXNoLCBtYXRlcmlhbCwgdGl0bGUpID0+IHtcbiAgY29uc3QgZGF0YSA9IHtcbiAgICBjb2xvcjogbWF0ZXJpYWwuY29sb3IuZ2V0SGV4KCksXG4gICAgZW1pc3NpdmU6IG1hdGVyaWFsLmVtaXNzaXZlLmdldEhleCgpLFxuICAgIGVudk1hcHM6IGVudk1hcEtleXNbMF0sXG4gICAgbWFwOiBkaWZmdXNlTWFwS2V5c1swXVxuICB9XG5cbiAgY29uc3QgZm9sZGVyID0gZ3VpLmFkZEZvbGRlcih0aXRsZSA/PyAnVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCcpXG4gIGZvbGRlci5hZGRDb2xvcihkYXRhLCAnZW1pc3NpdmUnKS5vbkNoYW5nZShoYW5kbGVDb2xvckNoYW5nZShtYXRlcmlhbC5lbWlzc2l2ZSkpXG4gIGZvbGRlci5hZGQobWF0ZXJpYWwsICdlbWlzc2l2ZUludGVuc2l0eScsIDAsIDMpXG4gIGFkZFJlY3VycmluZ01hdGVyaWFsUHJvcHMoZm9sZGVyLCBkYXRhLCBtYXRlcmlhbCwgbWVzaClcbn1cblxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVHdWlNZXNoUGhvbmdNYXRlcmlhbCA9IChndWksIG1lc2gsIG1hdGVyaWFsLCB0aXRsZSkgPT4ge1xuICBjb25zdCBkYXRhID0ge1xuICAgIGNvbG9yOiBtYXRlcmlhbC5jb2xvci5nZXRIZXgoKSxcbiAgICBlbWlzc2l2ZTogbWF0ZXJpYWwuZW1pc3NpdmUuZ2V0SGV4KCksXG4gICAgc3BlY3VsYXI6IG1hdGVyaWFsLnNwZWN1bGFyLmdldEhleCgpLFxuICAgIGVudk1hcHM6IGVudk1hcEtleXNbMF0sXG4gICAgbWFwOiBkaWZmdXNlTWFwS2V5c1swXVxuICB9XG5cbiAgY29uc3QgZm9sZGVyID0gZ3VpLmFkZEZvbGRlcih0aXRsZSA/PyAnVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwnKVxuICBmb2xkZXIuYWRkQ29sb3IoZGF0YSwgJ2VtaXNzaXZlJykub25DaGFuZ2UoaGFuZGxlQ29sb3JDaGFuZ2UobWF0ZXJpYWwuZW1pc3NpdmUpKVxuICBmb2xkZXIuYWRkKG1hdGVyaWFsLCAnZW1pc3NpdmVJbnRlbnNpdHknLCAwLCAzKVxuICBmb2xkZXIuYWRkQ29sb3IoZGF0YSwgJ3NwZWN1bGFyJykub25DaGFuZ2UoaGFuZGxlQ29sb3JDaGFuZ2UobWF0ZXJpYWwuc3BlY3VsYXIpKVxuICBmb2xkZXIuYWRkKG1hdGVyaWFsLCAnc2hpbmluZXNzJywgMCwgMTAwKVxuICBhZGRSZWN1cnJpbmdNYXRlcmlhbFByb3BzKGZvbGRlciwgZGF0YSwgbWF0ZXJpYWwsIG1lc2gpXG59XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsaXplR3VpTWVzaFBoeXNpY2FsTWF0ZXJpYWwgPSAoZ3VpLCBtZXNoLCBtYXRlcmlhbCwgdGl0bGUpID0+IHtcbiAgY29uc3QgZGF0YSA9IHtcbiAgICBjb2xvcjogbWF0ZXJpYWwuY29sb3IuZ2V0SGV4KCksXG4gICAgZW1pc3NpdmU6IG1hdGVyaWFsLmVtaXNzaXZlLmdldEhleCgpLFxuICAgIGVudk1hcHM6IGVudk1hcEtleXNbMF0sXG4gICAgbWFwOiBkaWZmdXNlTWFwS2V5c1swXVxuICB9XG5cbiAgY29uc3QgZm9sZGVyID0gZ3VpLmFkZEZvbGRlcih0aXRsZSA/PyAnVEhSRUUuTWVzaFBoeXNpY2FsTWF0ZXJpYWwnKVxuICBmb2xkZXIuYWRkQ29sb3IoZGF0YSwgJ2VtaXNzaXZlJykub25DaGFuZ2UoaGFuZGxlQ29sb3JDaGFuZ2UobWF0ZXJpYWwuZW1pc3NpdmUpKVxuICBmb2xkZXIuYWRkKG1hdGVyaWFsLCAnZW1pc3NpdmVJbnRlbnNpdHknLCAwLCAzKVxuICBmb2xkZXIuYWRkKG1hdGVyaWFsLCAncm91Z2huZXNzJywgMCwgMSlcbiAgZm9sZGVyLmFkZChtYXRlcmlhbCwgJ21ldGFsbmVzcycsIDAsIDEpXG4gIGZvbGRlci5hZGQobWF0ZXJpYWwsICdjbGVhcmNvYXQnLCAwLCAxKVxuICBmb2xkZXIuYWRkKG1hdGVyaWFsLCAnY2xlYXJjb2F0Um91Z2huZXNzJywgMCwgMSlcbiAgYWRkUmVjdXJyaW5nTWF0ZXJpYWxQcm9wcyhmb2xkZXIsIGRhdGEsIG1hdGVyaWFsLCBtZXNoKVxufVxuXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZUd1aU1lc2hTdGFuZGFyZE1hdGVyaWFsID0gKGd1aSwgbWVzaCwgbWF0ZXJpYWwsIHRpdGxlKSA9PiB7XG4gIGNvbnN0IGRhdGEgPSB7XG4gICAgY29sb3I6IG1hdGVyaWFsLmNvbG9yLmdldEhleCgpLFxuICAgIGVtaXNzaXZlOiBtYXRlcmlhbC5lbWlzc2l2ZS5nZXRIZXgoKSxcbiAgICBlbnZNYXBzOiBlbnZNYXBLZXlzWzBdLFxuICAgIG1hcDogZGlmZnVzZU1hcEtleXNbMF1cbiAgfVxuXG4gIGNvbnN0IGZvbGRlciA9IGd1aS5hZGRGb2xkZXIodGl0bGUgPz8gJ1RIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsJylcbiAgZm9sZGVyLmFkZENvbG9yKGRhdGEsICdlbWlzc2l2ZScpLm9uQ2hhbmdlKGhhbmRsZUNvbG9yQ2hhbmdlKG1hdGVyaWFsLmVtaXNzaXZlKSlcbiAgZm9sZGVyLmFkZChtYXRlcmlhbCwgJ2VtaXNzaXZlSW50ZW5zaXR5JywgMCwgMylcbiAgZm9sZGVyLmFkZChtYXRlcmlhbCwgJ3JvdWdobmVzcycsIDAsIDEpXG4gIGZvbGRlci5hZGQobWF0ZXJpYWwsICdtZXRhbG5lc3MnLCAwLCAxKVxuICBhZGRSZWN1cnJpbmdNYXRlcmlhbFByb3BzKGZvbGRlciwgZGF0YSwgbWF0ZXJpYWwsIG1lc2gsIHt9KVxuXG4gIHJldHVybiBmb2xkZXJcbn1cblxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVHdWlNZXNoQmFzaWNNYXRlcmlhbCA9IChndWksIG1lc2gsIG1hdGVyaWFsLCB0aXRsZSkgPT4ge1xuICBjb25zdCBkYXRhID0ge1xuICAgIGNvbG9yOiBtYXRlcmlhbC5jb2xvci5nZXRIZXgoKSxcbiAgICBlbnZNYXBzOiBlbnZNYXBLZXlzWzBdLFxuICAgIG1hcDogZGlmZnVzZU1hcEtleXNbMF1cbiAgfVxuXG4gIGNvbnN0IGZvbGRlciA9IGd1aS5hZGRGb2xkZXIodGl0bGUgPz8gJ1RIUkVFLk1lc2hCYXNpY01hdGVyaWFsJylcbiAgYWRkUmVjdXJyaW5nTWF0ZXJpYWxQcm9wcyhmb2xkZXIsIGRhdGEsIG1hdGVyaWFsLCBtZXNoLCB7fSlcbn1cblxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVHdWlMaW5lQmFzaWNNYXRlcmlhbCA9IChndWksIG1lc2gsIG1hdGVyaWFsLCB0aXRsZSkgPT4ge1xuICBjb25zdCBkYXRhID0ge1xuICAgIGNvbG9yOiBtYXRlcmlhbC5jb2xvci5nZXRIZXgoKVxuICB9XG5cbiAgY29uc3QgZm9sZGVyID0gZ3VpLmFkZEZvbGRlcih0aXRsZSA/PyAnVEhSRUUuTGluZUJhc2ljTWF0ZXJpYWwnKVxuICBmb2xkZXIuYWRkQ29sb3IoZGF0YSwgJ2NvbG9yJykub25DaGFuZ2UoaGFuZGxlQ29sb3JDaGFuZ2UobWF0ZXJpYWwuY29sb3IpKVxuICBmb2xkZXIuYWRkKG1hdGVyaWFsLCAndmVydGV4Q29sb3JzJykub25DaGFuZ2UobmVlZHNVcGRhdGUobWF0ZXJpYWwsIG1lc2gpKVxuICBmb2xkZXIuYWRkKG1hdGVyaWFsLCAnbGluZXdpZHRoJywgMCwgNSwgMC4xKVxufVxuXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZUd1aUxpbmVEYXNoZWRNYXRlcmlhbCA9IChndWksIG1lc2gsIG1hdGVyaWFsLCB0aXRsZSkgPT4ge1xuICBjb25zdCBkYXRhID0ge1xuICAgIGNvbG9yOiBtYXRlcmlhbC5jb2xvci5nZXRIZXgoKVxuICB9XG5cbiAgY29uc3QgZm9sZGVyID0gZ3VpLmFkZEZvbGRlcih0aXRsZSA/PyAnVEhSRUUuTGluZURhc2hlZE1hdGVyaWFsJylcbiAgZm9sZGVyLmFkZENvbG9yKGRhdGEsICdjb2xvcicpLm9uQ2hhbmdlKGhhbmRsZUNvbG9yQ2hhbmdlKG1hdGVyaWFsLmNvbG9yKSlcbiAgZm9sZGVyLmFkZChtYXRlcmlhbCwgJ3ZlcnRleENvbG9ycycpLm9uQ2hhbmdlKG5lZWRzVXBkYXRlKG1hdGVyaWFsLCBtZXNoKSlcbiAgZm9sZGVyLmFkZChtYXRlcmlhbCwgJ2xpbmV3aWR0aCcsIDAsIDUsIDAuMSlcbiAgZm9sZGVyLmFkZChtYXRlcmlhbCwgJ3NjYWxlJywgMCwgNSwgMC4xKVxuICBmb2xkZXIuYWRkKG1hdGVyaWFsLCAnZGFzaFNpemUnLCAwLCA1LCAwLjEpXG4gIGZvbGRlci5hZGQobWF0ZXJpYWwsICdnYXBTaXplJywgMCwgNSwgMC4xKVxufVxuXG5mdW5jdGlvbiBhZGRSZWN1cnJpbmdNYXRlcmlhbFByb3BzKGZvbGRlciwgZGF0YSwgbWF0ZXJpYWwsIG1lc2gsIGRpc2FibGVFbnYpIHtcbiAgZm9sZGVyLmFkZENvbG9yKGRhdGEsICdjb2xvcicpLm9uQ2hhbmdlKGhhbmRsZUNvbG9yQ2hhbmdlKG1hdGVyaWFsLmNvbG9yKSlcbiAgZm9sZGVyLmFkZChtYXRlcmlhbCwgJ3dpcmVmcmFtZScpXG4gIGZvbGRlci5hZGQobWF0ZXJpYWwsICd2ZXJ0ZXhDb2xvcnMnKS5vbkNoYW5nZShuZWVkc1VwZGF0ZShtYXRlcmlhbCwgbWVzaCkpXG4gIGlmIChkaXNhYmxlRW52ID8/IHRydWUpIHtcbiAgICBmb2xkZXIuYWRkKGRhdGEsICdlbnZNYXBzJywgZW52TWFwS2V5cykub25DaGFuZ2UodXBkYXRlVGV4dHVyZShtYXRlcmlhbCwgJ2Vudk1hcCcsIGVudk1hcHMpKVxuICAgIGZvbGRlci5hZGQoZGF0YSwgJ21hcCcsIGRpZmZ1c2VNYXBLZXlzKS5vbkNoYW5nZSh1cGRhdGVUZXh0dXJlKG1hdGVyaWFsLCAnbWFwJywgZGlmZnVzZU1hcHMpKVxuICAgIGZvbGRlci5hZGQobWF0ZXJpYWwsICdjb21iaW5lJywgY29uc3RhbnRzLmNvbWJpbmUpLm9uQ2hhbmdlKHVwZGF0ZUNvbWJpbmUobWF0ZXJpYWwpKVxuICAgIGlmIChtYXRlcmlhbC5yZWZsZWN0aXZpdHkpIGZvbGRlci5hZGQobWF0ZXJpYWwsICdyZWZsZWN0aXZpdHknLCAwLCAxKVxuICAgIGZvbGRlci5hZGQobWF0ZXJpYWwsICdyZWZyYWN0aW9uUmF0aW8nLCAwLCAxKVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsaXplR3VpTWVzaFRvb25NYXRlcmlhbCA9IChndWksIG1lc2gsIG1hdGVyaWFsLCB0aXRsZSkgPT4ge1xuICBjb25zdCBkYXRhID0ge1xuICAgIGNvbG9yOiBtYXRlcmlhbC5jb2xvci5nZXRIZXgoKSxcbiAgICBlbnZNYXBzOiBlbnZNYXBLZXlzWzBdLFxuICAgIG1hcDogZGlmZnVzZU1hcEtleXNbMF1cbiAgfVxuXG4gIGNvbnN0IGZvbGRlciA9IGd1aS5hZGRGb2xkZXIodGl0bGUgPz8gJ1RIUkVFLk1lc2hUb29uTWF0ZXJpYWwnKVxuICBhZGRSZWN1cnJpbmdNYXRlcmlhbFByb3BzKGZvbGRlciwgZGF0YSwgbWF0ZXJpYWwsIG1lc2gsIGZhbHNlKVxufVxuXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZVBvaW50c01hdGVyaWFsID0gKGd1aSwgbWVzaCwgbWF0ZXJpYWwsIHRpdGxlKSA9PiB7XG4gIGNvbnN0IGRhdGEgPSB7XG4gICAgY29sb3I6IG1hdGVyaWFsLmNvbG9yLmdldEhleCgpLFxuICAgIHNpemU6IDEsXG4gICAgc2l6ZUF0dGVudWF0aW9uOiBmYWxzZSxcbiAgICB2ZXJ0ZXhDb2xvcnM6IHRydWVcbiAgfVxuXG4gIGNvbnN0IGZvbGRlciA9IGd1aS5hZGRGb2xkZXIodGl0bGUgPz8gJ1RIUkVFLlBvaW50c01hdGVyaWFsJylcbiAgZm9sZGVyLmFkZENvbG9yKGRhdGEsICdjb2xvcicpLm9uQ2hhbmdlKGhhbmRsZUNvbG9yQ2hhbmdlKG1hdGVyaWFsLmNvbG9yKSlcbiAgZm9sZGVyLmFkZChtYXRlcmlhbCwgJ3NpemUnLCAwLCAyLCAwLjAxKVxuICBmb2xkZXIuYWRkKG1hdGVyaWFsLCAnc2l6ZUF0dGVudWF0aW9uJykub25DaGFuZ2UobmVlZHNVcGRhdGUobWF0ZXJpYWwsIG1lc2gpKVxuICBmb2xkZXIuYWRkKG1hdGVyaWFsLCAndmVydGV4Q29sb3JzJykub25DaGFuZ2UobmVlZHNVcGRhdGUobWF0ZXJpYWwsIG1lc2gpKVxufVxuXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZVNwcml0ZU1hdGVyaWFsID0gKGd1aSwgbWVzaCwgbWF0ZXJpYWwsIHRpdGxlKSA9PiB7XG4gIGNvbnN0IGRhdGEgPSB7XG4gICAgY29sb3I6IG1hdGVyaWFsLmNvbG9yLmdldEhleCgpLFxuICAgIHNpemU6IDEsXG4gICAgc2l6ZUF0dGVudWF0aW9uOiBmYWxzZVxuICB9XG5cbiAgY29uc3QgZm9sZGVyID0gZ3VpLmFkZEZvbGRlcih0aXRsZSA/PyAnVEhSRUUuU3ByaXRlTWF0ZXJpYWwnKVxuICBmb2xkZXIuYWRkQ29sb3IoZGF0YSwgJ2NvbG9yJykub25DaGFuZ2UoaGFuZGxlQ29sb3JDaGFuZ2UobWF0ZXJpYWwuY29sb3IpKVxuICBmb2xkZXIuYWRkKG1hdGVyaWFsLCAnc2l6ZUF0dGVudWF0aW9uJykub25DaGFuZ2UobmVlZHNVcGRhdGUobWF0ZXJpYWwsIG1lc2gpKVxufVxuXG5mdW5jdGlvbiBuZWVkc1VwZGF0ZShtYXRlcmlhbCwgbWVzaCkge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIG1hdGVyaWFsLnNpZGUgPSBwYXJzZUludChtYXRlcmlhbC5zaWRlKSAvL0Vuc3VyZSBudW1iZXJcbiAgICBtYXRlcmlhbC5uZWVkc1VwZGF0ZSA9IHRydWVcblxuICAgIHZpc2l0Q2hpbGRyZW4obWVzaCwgKGMpID0+IHtcbiAgICAgIGlmIChjLmdlb21ldHJ5KSB7XG4gICAgICAgIGMuZ2VvbWV0cnkuYXR0cmlidXRlcy5wb3NpdGlvbi5uZWVkc1VwZGF0ZSA9IHRydWVcbiAgICAgICAgaWYgKGMuZ2VvbWV0cnkuYXR0cmlidXRlcy5ub3JtYWwpIGMuZ2VvbWV0cnkuYXR0cmlidXRlcy5ub3JtYWwubmVlZHNVcGRhdGUgPSB0cnVlXG4gICAgICAgIGlmIChjLmdlb21ldHJ5LmF0dHJpYnV0ZXMuY29sb3IpIGMuZ2VvbWV0cnkuYXR0cmlidXRlcy5jb2xvci5uZWVkc1VwZGF0ZSA9IHRydWVcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVRleHR1cmUobWF0ZXJpYWwsIG1hdGVyaWFsS2V5LCB0ZXh0dXJlcykge1xuICByZXR1cm4gZnVuY3Rpb24gKGtleSkge1xuICAgIG1hdGVyaWFsW21hdGVyaWFsS2V5XSA9IHRleHR1cmVzW2tleV1cbiAgICBtYXRlcmlhbC5uZWVkc1VwZGF0ZSA9IHRydWVcbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVDb21iaW5lKG1hdGVyaWFsKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoY29tYmluZSkge1xuICAgIG1hdGVyaWFsLmNvbWJpbmUgPSBwYXJzZUludChjb21iaW5lKVxuICAgIG1hdGVyaWFsLm5lZWRzVXBkYXRlID0gdHJ1ZVxuICB9XG59XG5cbmV4cG9ydCB7IGluaXRpYWxpemVHdWlNYXRlcmlhbCB9XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcblxuY29uc3QgZW51bXMgPSB7XG4gIHRvbmVNYXBwaW5nT3B0aW9uczoge1xuICAgIE5vbmU6IFRIUkVFLk5vVG9uZU1hcHBpbmcsXG4gICAgTGluZWFyOiBUSFJFRS5MaW5lYXJUb25lTWFwcGluZyxcbiAgICBSZWluaGFyZDogVEhSRUUuUmVpbmhhcmRUb25lTWFwcGluZyxcbiAgICBDaW5lb246IFRIUkVFLkNpbmVvblRvbmVNYXBwaW5nLFxuICAgIEFDRVNGaWxtaWM6IFRIUkVFLkFDRVNGaWxtaWNUb25lTWFwcGluZyxcbiAgICBDdXN0b206IFRIUkVFLkN1c3RvbVRvbmVNYXBwaW5nLFxuICB9LFxuICBzaGFkb3dNYXBwaW5nOiB7XG4gICAgQmFzaWM6IFRIUkVFLkJhc2ljU2hhZG93TWFwLFxuICAgIFBDRlM6IFRIUkVFLlBDRlNoYWRvd01hcCxcbiAgICBQQ0ZTb2Z0OiBUSFJFRS5QQ0ZTb2Z0U2hhZG93TWFwLFxuICAgIFZTTTogVEhSRUUuVlNNU2hhZG93TWFwLFxuICB9LFxuICBvdXRwdXRFbmNvZGluZ3M6IHtcbiAgICBMaW5lYXI6IFRIUkVFLkxpbmVhckVuY29kaW5nLFxuICAgIHNSR0I6IFRIUkVFLnNSR0JFbmNvZGluZyxcbiAgfSxcbn07XG5cbmNvbnN0IGdldFByb3BlcnR5SG9sZGVyID0gKHdlYkdMUmVuZGVyZXIpID0+IHtcbiAgY29uc3QgY2xlYXJDb2xvckhvbGRlciA9IG5ldyBUSFJFRS5Db2xvcigpO1xuICB3ZWJHTFJlbmRlcmVyLmdldENsZWFyQ29sb3IoY2xlYXJDb2xvckhvbGRlcik7XG5cbiAgY29uc3QgaG9sZGVyID0ge1xuICAgIG1haW46IHtcbiAgICAgIG91dHB1dEVuY29kaW5nOiB3ZWJHTFJlbmRlcmVyLm91dHB1dEVuY29kaW5nLFxuICAgIH0sXG4gICAgc2hhZG93TWFwOiB7XG4gICAgICBlbmFibGVkOiB3ZWJHTFJlbmRlcmVyLnNoYWRvd01hcC5lbmFibGVkLFxuICAgICAgYXV0b1VwZGF0ZTogd2ViR0xSZW5kZXJlci5zaGFkb3dNYXAuYXV0b1VwZGF0ZSxcbiAgICAgIG5lZWRzVXBkYXRlOiAoKSA9PiAod2ViR0xSZW5kZXJlci5zaGFkb3dNYXAubmVlZHNVcGRhdGUgPSB0cnVlKSxcbiAgICAgIHR5cGU6IHdlYkdMUmVuZGVyZXIuc2hhZG93TWFwLnR5cGUsXG4gICAgfSxcbiAgICB0b25lTWFwcGluZzoge1xuICAgICAgZXhwb3N1cmU6IHdlYkdMUmVuZGVyZXIudG9uZU1hcHBpbmdFeHBvc3VyZSxcbiAgICAgIHRvbmVNYXBwaW5nOiB3ZWJHTFJlbmRlcmVyLnRvbmVNYXBwaW5nLFxuICAgIH0sXG4gICAgY2xlYXJTZXR0aW5nczoge1xuICAgICAgYXV0b0NsZWFyOiB3ZWJHTFJlbmRlcmVyLmF1dG9DbGVhcixcbiAgICAgIGNsZWFyQ29sb3I6IGNsZWFyQ29sb3JIb2xkZXIuZ2V0U3R5bGUoKSxcbiAgICB9LFxuICAgIGFkdmFuY2VkOiB7XG4gICAgICBhdXRvQ2xlYXJEZXB0aDogd2ViR0xSZW5kZXJlci5hdXRvQ2xlYXJEZXB0aCxcbiAgICAgIGF1dG9DbGVhclN0ZW5jaWw6IHdlYkdMUmVuZGVyZXIuYXV0b0NsZWFyU3RlbmNpbCxcbiAgICAgIGNoZWNrU2hhZGVyRXJyb3JzOiB3ZWJHTFJlbmRlcmVyLmRlYnVnLmNoZWNrU2hhZGVyRXJyb3JzLFxuICAgICAgc29ydE9iamVjdHM6IHdlYkdMUmVuZGVyZXIuc29ydE9iamVjdHMsXG4gICAgICBsb2NhbENsaXBwaW5nRW5hYmxlZDogd2ViR0xSZW5kZXJlci5sb2NhbENsaXBwaW5nRW5hYmxlZCxcbiAgICAgIHBoeXNpY2FsbHlDb3JyZWN0TGlnaHRzOiB3ZWJHTFJlbmRlcmVyLnBoeXNpY2FsbHlDb3JyZWN0TGlnaHRzLFxuICAgIH0sXG4gIH07XG5cbiAgcmV0dXJuIGhvbGRlcjtcbn07XG5cbmV4cG9ydCBjb25zdCBpbnRpYWxpemVSZW5kZXJlckNvbnRyb2xzID0gKGd1aSwgd2ViR0xSZW5kZXJlcikgPT4ge1xuICBjb25zdCBwcm9wZXJ0aWVzT2JqZWN0ID0gZ2V0UHJvcGVydHlIb2xkZXIod2ViR0xSZW5kZXJlcik7XG4gIGNvbnN0IHJlbmRlcmVyRm9sZGVyID0gZ3VpLmFkZEZvbGRlcihcIldlYkdMUmVuZGVyZXJcIik7XG5cbiAgcmVuZGVyZXJGb2xkZXIub25DaGFuZ2UoKF8pID0+IHtcbiAgICB1cGRhdGVXZWJHTFJlbmRlcmVyUHJvcGVydGllcyh3ZWJHTFJlbmRlcmVyLCBwcm9wZXJ0aWVzT2JqZWN0KTtcbiAgfSk7XG5cbiAgcmVuZGVyZXJGb2xkZXIuYWRkKFxuICAgIHByb3BlcnRpZXNPYmplY3QubWFpbixcbiAgICBcIm91dHB1dEVuY29kaW5nXCIsXG4gICAgZW51bXMub3V0cHV0RW5jb2RpbmdzXG4gICk7XG5cbiAgY29uc3Qgc2hhZG93Rm9sZGVyID0gcmVuZGVyZXJGb2xkZXIuYWRkRm9sZGVyKFwiU2hhZG93XCIpO1xuICBzaGFkb3dGb2xkZXIuYWRkKHByb3BlcnRpZXNPYmplY3Quc2hhZG93TWFwLCBcImVuYWJsZWRcIik7XG4gIHNoYWRvd0ZvbGRlci5hZGQocHJvcGVydGllc09iamVjdC5zaGFkb3dNYXAsIFwiYXV0b1VwZGF0ZVwiKTtcbiAgc2hhZG93Rm9sZGVyLmFkZChwcm9wZXJ0aWVzT2JqZWN0LnNoYWRvd01hcCwgXCJuZWVkc1VwZGF0ZVwiKTtcbiAgc2hhZG93Rm9sZGVyXG4gICAgLmFkZChwcm9wZXJ0aWVzT2JqZWN0LnNoYWRvd01hcCwgXCJ0eXBlXCIsIGVudW1zLnNoYWRvd01hcHBpbmcpXG4gICAgLmVuYWJsZShmYWxzZSk7IC8vIGNhbid0IHVwZGF0ZSB0aGUgc2hhZG93IG1hcHBpbmcgdHlwZSBpbiBydW50aW1lXG5cbiAgY29uc3QgdG9uZU1hcHBpbmdGb2xkZXIgPSByZW5kZXJlckZvbGRlci5hZGRGb2xkZXIoXCJUb25lTWFwcGluZ1wiKTtcbiAgdG9uZU1hcHBpbmdGb2xkZXIuYWRkKHByb3BlcnRpZXNPYmplY3QudG9uZU1hcHBpbmcsIFwiZXhwb3N1cmVcIiwgMCwgMik7XG4gIHRvbmVNYXBwaW5nRm9sZGVyLmFkZChcbiAgICBwcm9wZXJ0aWVzT2JqZWN0LnRvbmVNYXBwaW5nLFxuICAgIFwidG9uZU1hcHBpbmdcIixcbiAgICBlbnVtcy50b25lTWFwcGluZ09wdGlvbnNcbiAgKTtcblxuICBjb25zdCBjbGVhclNldHRpbmdzRm9sZGVyID0gcmVuZGVyZXJGb2xkZXIuYWRkRm9sZGVyKFwiY2xlYXJTZXR0aW5nc1wiKTtcbiAgY2xlYXJTZXR0aW5nc0ZvbGRlci5hZGQocHJvcGVydGllc09iamVjdC5jbGVhclNldHRpbmdzLCBcImF1dG9DbGVhclwiKTtcbiAgY2xlYXJTZXR0aW5nc0ZvbGRlci5hZGRDb2xvcihwcm9wZXJ0aWVzT2JqZWN0LmNsZWFyU2V0dGluZ3MsIFwiY2xlYXJDb2xvclwiKTtcblxuICByZW5kZXJlckZvbGRlci5jbG9zZSgpO1xufTtcblxuY29uc3QgdXBkYXRlV2ViR0xSZW5kZXJlclByb3BlcnRpZXMgPSAod2ViR0xSZW5kZXJlciwgcHJvcGVydHlIb2xkZXIpID0+IHtcbiAgd2ViR0xSZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IHByb3BlcnR5SG9sZGVyLnNoYWRvd01hcC5lbmFibGVkO1xuICB3ZWJHTFJlbmRlcmVyLnNoYWRvd01hcC5hdXRvVXBkYXRlID0gcHJvcGVydHlIb2xkZXIuc2hhZG93TWFwLmF1dG9VcGRhdGU7XG4gIHdlYkdMUmVuZGVyZXIuc2hhZG93TWFwLm5lZWRzVXBkYXRlID0gcHJvcGVydHlIb2xkZXIuc2hhZG93TWFwLm5lZWRzVXBkYXRlO1xuICB3ZWJHTFJlbmRlcmVyLnRvbmVNYXBwaW5nID0gcHJvcGVydHlIb2xkZXIudG9uZU1hcHBpbmcudG9uZU1hcHBpbmc7XG4gIHdlYkdMUmVuZGVyZXIudG9uZU1hcHBpbmdFeHBvc3VyZSA9IHByb3BlcnR5SG9sZGVyLnRvbmVNYXBwaW5nLmV4cG9zdXJlO1xuICB3ZWJHTFJlbmRlcmVyLmF1dG9DbGVhciA9IHByb3BlcnR5SG9sZGVyLmNsZWFyU2V0dGluZ3MuYXV0b0NsZWFyO1xuICB3ZWJHTFJlbmRlcmVyLnNldENsZWFyQ29sb3IocHJvcGVydHlIb2xkZXIuY2xlYXJTZXR0aW5ncy5jbGVhckNvbG9yKTtcbiAgd2ViR0xSZW5kZXJlci5vdXRwdXRFbmNvZGluZyA9IHByb3BlcnR5SG9sZGVyLm1haW4ub3V0cHV0RW5jb2Rpbmc7XG5cbiAgd2ViR0xSZW5kZXJlci5uZWVkc1VwZGF0ZSA9IHRydWU7XG59O1xuIiwiZXhwb3J0IGNvbnN0IGdldE9iamVjdHNLZXlzID0gKG9iaikgPT4ge1xuICBjb25zdCBrZXlzID0gW107XG5cbiAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ga2V5cztcbn07XG4iLCJleHBvcnQgY29uc3QgdmlzaXRDaGlsZHJlbiA9IChvYmplY3QsIGZuKSA9PiB7XG4gIGlmIChvYmplY3QuY2hpbGRyZW4gJiYgb2JqZWN0LmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIG9iamVjdC5jaGlsZHJlbikge1xuICAgICAgdmlzaXRDaGlsZHJlbihjaGlsZCwgZm4pXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZuKG9iamVjdClcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgYXBwbHlTaGFkb3dzQW5kRGVwdGhXcml0ZSA9IChvYmplY3QpID0+IHtcbiAgdmlzaXRDaGlsZHJlbihvYmplY3QsIChjaGlsZCkgPT4ge1xuICAgIGlmIChjaGlsZC5tYXRlcmlhbCkge1xuICAgICAgY2hpbGQubWF0ZXJpYWwuZGVwdGhXcml0ZSA9IHRydWVcbiAgICAgIGNoaWxkLmNhc3RTaGFkb3cgPSB0cnVlXG4gICAgICBjaGlsZC5yZWNlaXZlU2hhZG93ID0gdHJ1ZVxuICAgIH1cbiAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IGZpbmRDaGlsZCA9IChvYmplY3QsIG5hbWUpID0+IHtcbiAgaWYgKG9iamVjdC5jaGlsZHJlbiAmJiBvYmplY3QuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgIGZvciAoY29uc3QgY2hpbGQgb2Ygb2JqZWN0LmNoaWxkcmVuKSB7XG4gICAgICBpZiAobmFtZSA9PT0gY2hpbGQubmFtZSkge1xuICAgICAgICByZXR1cm4gY2hpbGRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGZpbmRDaGlsZChjaGlsZCwgbmFtZSlcbiAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgIHJldHVybiByZXNcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAobmFtZSA9PT0gb2JqZWN0Lm5hbWUpIHtcbiAgICAgIHJldHVybiBvYmplY3RcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IG9uUmVzaXplID0gKGNhbWVyYSwgcmVuZGVyZXIpID0+IHtcbiAgY29uc3QgcmVzaXplciA9ICgpID0+IHtcbiAgICBjYW1lcmEuYXNwZWN0ID0gd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICBjYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpXG4gICAgcmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KVxuICB9XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemVyLCBmYWxzZSlcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
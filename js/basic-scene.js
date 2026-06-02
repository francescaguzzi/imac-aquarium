/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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

/***/ "./samples/bootstrap/floor.js"
/*!************************************!*\
  !*** ./samples/bootstrap/floor.js ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   floatingFloor: () => (/* binding */ floatingFloor),
/* harmony export */   foreverPlane: () => (/* binding */ foreverPlane)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");


const foreverPlane = (scene) => {
  const geo = new three__WEBPACK_IMPORTED_MODULE_0__.PlaneBufferGeometry(10000, 10000)
  const mat = new three__WEBPACK_IMPORTED_MODULE_0__.MeshLambertMaterial({
    color: 0xffffff
  })
  const mesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(geo, mat)
  mesh.position.set(0, -2, 0)
  mesh.rotation.set(Math.PI / -2, 0, 0)
  mesh.receiveShadow = true
  mesh.name = 'forever-floor'
  scene.add(mesh)

  return mesh
}

const floatingFloor = (scene, size) => {
  const s = size ? size : 6
  const geo = new three__WEBPACK_IMPORTED_MODULE_0__.BoxBufferGeometry(s, 0.25, s, 10, 10, 10)
  const mat = new three__WEBPACK_IMPORTED_MODULE_0__.MeshStandardMaterial({
    color: 0xdddddd
  })
  const mesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(geo, mat)
  mesh.position.set(0, -2, -1)
  mesh.receiveShadow = true
  mesh.name = 'floating-floor'
  scene.add(mesh)

  return mesh
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

/***/ "./samples/chapters/chapter-2/basic-scene.js"
/*!***************************************************!*\
  !*** ./samples/chapters/chapter-2/basic-scene.js ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lil_gui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lil-gui */ "./node_modules/lil-gui/dist/lil-gui.esm.js");
/* harmony import */ var _bootstrap_floor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../bootstrap/floor.js */ "./samples/bootstrap/floor.js");
/* harmony import */ var _controls_add_remove_cube_controls_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../controls/add-remove-cube-controls.js */ "./samples/controls/add-remove-cube-controls.js");
/* harmony import */ var _controls_helpers_control_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../controls/helpers-control.js */ "./samples/controls/helpers-control.js");
/* harmony import */ var _controls_scene_controls__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../controls/scene-controls */ "./samples/controls/scene-controls.js");
/* harmony import */ var _bootstrap_bootstrap_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../bootstrap/bootstrap.js */ "./samples/bootstrap/bootstrap.js");
/* harmony import */ var _controls_renderer_control_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../controls/renderer-control.js */ "./samples/controls/renderer-control.js");
/* harmony import */ var _util_stats__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../util/stats */ "./samples/util/stats.js");









const props = {
  backgroundColor: 0xffffff,
  fogColor: 0xffffff
}
const gui = new lil_gui__WEBPACK_IMPORTED_MODULE_0__["default"]()

;(0,_bootstrap_bootstrap_js__WEBPACK_IMPORTED_MODULE_5__.initScene)(props)(({ scene, camera, renderer, orbitControls }) => {
  camera.position.set(-7, 2, 5)
  orbitControls.update()

  ;(0,_bootstrap_floor_js__WEBPACK_IMPORTED_MODULE_1__.floatingFloor)(scene, 10)

  function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    _util_stats__WEBPACK_IMPORTED_MODULE_7__.stats.update()

    orbitControls.update()
  }
  animate()

  ;(0,_controls_renderer_control_js__WEBPACK_IMPORTED_MODULE_6__.intializeRendererControls)(gui, renderer)
  ;(0,_controls_helpers_control_js__WEBPACK_IMPORTED_MODULE_3__.initializeHelperControls)(gui, scene)
  ;(0,_controls_scene_controls__WEBPACK_IMPORTED_MODULE_4__.initializeSceneControls)(gui, scene, true)
  ;(0,_controls_add_remove_cube_controls_js__WEBPACK_IMPORTED_MODULE_2__.initializeAddRemoveCubeControls)(gui, scene)
})


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

/***/ "./samples/controls/add-remove-cube-controls.js"
/*!******************************************************!*\
  !*** ./samples/controls/add-remove-cube-controls.js ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initializeAddRemoveCubeControls: () => (/* binding */ initializeAddRemoveCubeControls)
/* harmony export */ });
/* harmony import */ var three_examples_jsm_utils_SceneUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/utils/SceneUtils */ "./node_modules/three/examples/jsm/utils/SceneUtils.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _util_colorUtil_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/colorUtil.js */ "./samples/util/colorUtil.js");
/* harmony import */ var _util_positionUtil_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/positionUtil.js */ "./samples/util/positionUtil.js");





const initializeAddRemoveCubeControls = (gui, parent, material) => {
  const addRemoveProps = {
    addCube: () => addCube(parent, material),
    removeCube: () => removeCube(parent)
  }

  gui.add(addRemoveProps, 'addCube')
  gui.add(addRemoveProps, 'removeCube')
}

const addCube = (parent, material) => {
  const color = (0,_util_colorUtil_js__WEBPACK_IMPORTED_MODULE_2__.randomColor)()
  const pos = (0,_util_positionUtil_js__WEBPACK_IMPORTED_MODULE_3__.randomVector)({
    xRange: { fromX: -4, toX: 4 },
    yRange: { fromY: -3, toY: 3 },
    zRange: { fromZ: -4, toZ: 4 }
  })

  const rotation = (0,_util_positionUtil_js__WEBPACK_IMPORTED_MODULE_3__.randomVector)({
    xRange: { fromX: 0, toX: Math.PI * 2 },
    yRange: { fromY: 0, toY: Math.PI * 2 },
    zRange: { fromZ: 0, toZ: Math.PI * 2 }
  })

  const geometry = new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(0.5, 0.5, 0.5)
  const cubeMaterial =
    material ??
    new three__WEBPACK_IMPORTED_MODULE_1__.MeshStandardMaterial({
      color: color,
      roughness: 0.1,
      metalness: 0.9
    })

  let cube

  if (Array.isArray(cubeMaterial)) {
    cube = three_examples_jsm_utils_SceneUtils__WEBPACK_IMPORTED_MODULE_0__.createMultiMaterialObject(geometry, cubeMaterial)
  } else {
    cube = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(geometry, cubeMaterial)
  }
  cube.name = 'cube-' + parent.children.length
  cube.position.copy(pos)
  cube.rotation.setFromVector3(rotation)
  cube.castShadow = true
  parent.add(cube)
}

const removeCube = (parent) => {
  parent.children.pop()
}


/***/ },

/***/ "./samples/controls/helpers-control.js"
/*!*********************************************!*\
  !*** ./samples/controls/helpers-control.js ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initializeHelperControls: () => (/* binding */ initializeHelperControls)
/* harmony export */ });
/* harmony import */ var _helpers_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/helpers */ "./samples/helpers/helpers.js");


const propertiesObject = (scene) => ({
  axisHelper: {
    toggle: () => {
      const currentHelper = scene.getObjectByName(_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__.axisHelperName);
      if (currentHelper) {
        scene.remove(currentHelper);
      } else {
        (0,_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__.axisHelper)(scene);
      }
    },
  },
  gridHelper: {
    toggle: () => removeOrAddToScene(_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__.gridHelperName, scene, _helpers_helpers__WEBPACK_IMPORTED_MODULE_0__.gridHelper),
  },
  polarGridHelper: {
    toggle: () =>
      removeOrAddToScene(_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__.polarGridHelperName, scene, _helpers_helpers__WEBPACK_IMPORTED_MODULE_0__.polarGridHelper),
  },
});

const initializeHelperControls = (gui, scene) => {
  const props = propertiesObject(scene);
  const helpers = gui.addFolder("Helpers");
  //   helpers.add('axisHelperEnabled', propertiesObject)
  helpers.add(props.axisHelper, "toggle").name("Toggle AxesHelper");
  helpers.add(props.gridHelper, "toggle").name("Toggle GridHelper");
  helpers.add(props.polarGridHelper, "toggle").name("Toggle PolarGridHelper");

  helpers.close();
};

const removeOrAddToScene = (name, scene, addFn) => {
  const currentObject = scene.getObjectByName(name);
  console.log(currentObject);
  if (currentObject) {
    scene.remove(currentObject);
  } else {
    addFn(scene);
  }
};


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

/***/ "./samples/controls/scene-controls.js"
/*!********************************************!*\
  !*** ./samples/controls/scene-controls.js ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initializeSceneControls: () => (/* binding */ initializeSceneControls)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");


const textureLoader = new three__WEBPACK_IMPORTED_MODULE_0__.TextureLoader()

const propertiesObject = (scene) => ({
  overrideMaterial: {
    toggle: () => {
      if (scene.overrideMaterial !== null) {
        scene.overrideMaterial = null
      } else {
        scene.overrideMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.MeshNormalMaterial()
      }
    }
  },
  backGround: 'White',
  environment: {
    toggle: () => {
      if (scene.environment !== null) {
        scene.environment = null
      } else {
        textureLoader.load('/assets/equi.jpeg', (loaded) => {
          loaded.mapping = three__WEBPACK_IMPORTED_MODULE_0__.EquirectangularReflectionMapping
          scene.environment = loaded
        })
      }
    }
  }
})

const fogProperties = (fog) => ({
  color: 0xffffff,
  near: fog.near,
  far: fog.far
})

const initializeSceneControls = (gui, scene, fogEnabled, isOpen) => {
  const props = propertiesObject(scene)
  const sceneControls = gui.addFolder('Scene')

  sceneControls
    .add(props, 'backGround', ['White', 'Black', 'Null', 'Color', 'Texture', 'Cubemap'])
    .onChange((event) => handleBackgroundChange(event, scene))
  sceneControls.add(props.overrideMaterial, 'toggle').name('Toggle Override Material')
  sceneControls.add(props.environment, 'toggle').name('Toggle Environment')

  if (fogEnabled) {
    const fogColor = new three__WEBPACK_IMPORTED_MODULE_0__.Color(0xffffff)
    const fog = new three__WEBPACK_IMPORTED_MODULE_0__.Fog(fogColor, 1, 20)
    scene.fog = fog
    const fogProps = fogProperties(fog)
    const fogControls = sceneControls.addFolder('Fog')
    fogControls.addColor(fogProps, 'color')
    fogControls.add(fogProps, 'near', 0, 10, 0.1)
    fogControls.add(fogProps, 'far', 0, 100, 0.1)

    fogControls.onChange(() => {
      fog.color = fogColor.setHex(fogProps.color)
      fog.near = fogProps.near
      fog.far = fogProps.far
    })
  }

  isOpen ? sceneControls.open() : sceneControls.close()
}

const handleBackgroundChange = (setting, scene) => {
  switch (setting) {
    case 'White':
      scene.background = new three__WEBPACK_IMPORTED_MODULE_0__.Color(0xffffff)
      break
    case 'Black':
      scene.background = new three__WEBPACK_IMPORTED_MODULE_0__.Color(0x000000)
      break
    case 'Null':
      scene.background = null
      break
    case 'Color':
      scene.background = new three__WEBPACK_IMPORTED_MODULE_0__.Color(0x44ff44)
      break
    case 'Texture':
      textureLoader.load('/assets/textures/wood/abstract-antique-backdrop-164005.jpg', (loaded) => {
        loaded.encoding = three__WEBPACK_IMPORTED_MODULE_0__.sRGBEncoding
        scene.background = loaded
        scene.environment = null
      })
      break
    case 'Cubemap':
      textureLoader.load('/assets/equi.jpeg', (loaded) => {
        loaded.mapping = three__WEBPACK_IMPORTED_MODULE_0__.EquirectangularReflectionMapping
        scene.background = loaded
        scene.environment = loaded
      })

      break
    default:
      break
  }
}


/***/ },

/***/ "./samples/helpers/helpers.js"
/*!************************************!*\
  !*** ./samples/helpers/helpers.js ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   axisHelper: () => (/* binding */ axisHelper),
/* harmony export */   axisHelperName: () => (/* binding */ axisHelperName),
/* harmony export */   gridHelper: () => (/* binding */ gridHelper),
/* harmony export */   gridHelperName: () => (/* binding */ gridHelperName),
/* harmony export */   polarGridHelper: () => (/* binding */ polarGridHelper),
/* harmony export */   polarGridHelperName: () => (/* binding */ polarGridHelperName)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");


const axisHelperName = 'axesHelper'
const gridHelperName = 'gridHelper'
const polarGridHelperName = 'polarGridHelper'

const axisHelper = (scene) => {
  const axesHelper = new three__WEBPACK_IMPORTED_MODULE_0__.AxesHelper(5)
  axesHelper.name = axisHelperName
  scene.add(axesHelper)
}

const gridHelper = (scene) => {
  const size = 10
  const divisions = 10
  const gridHelper = new three__WEBPACK_IMPORTED_MODULE_0__.GridHelper(size, divisions)
  gridHelper.name = gridHelperName
  scene.add(gridHelper)
}

const polarGridHelper = (scene) => {
  const radius = 10
  const radials = 16
  const circles = 8
  const divisions = 64
  const polarGridHelper = new three__WEBPACK_IMPORTED_MODULE_0__.PolarGridHelper(radius, radials, circles, divisions)
  polarGridHelper.name = polarGridHelperName
  scene.add(polarGridHelper)
}


/***/ },

/***/ "./samples/util/colorUtil.js"
/*!***********************************!*\
  !*** ./samples/util/colorUtil.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   randomColor: () => (/* binding */ randomColor)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");


const randomColor = () => {
  var r = Math.random(),
    g = Math.random(),
    b = Math.random()
  return new three__WEBPACK_IMPORTED_MODULE_0__.Color(r, g, b)
}


/***/ },

/***/ "./samples/util/positionUtil.js"
/*!**************************************!*\
  !*** ./samples/util/positionUtil.js ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   randomVector: () => (/* binding */ randomVector)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");


const randomVector = ({
  xRange: { fromX, toX },
  yRange: { fromY, toY },
  zRange: { fromZ, toZ },
}) => {
  const x = Math.random() * (toX - fromX) + fromX;
  const y = Math.random() * (toY - fromY) + fromY;
  const z = Math.random() * (toZ - fromZ) + fromZ;

  return new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(x, y, z);
};


/***/ },

/***/ "./samples/util/stats.js"
/*!*******************************!*\
  !*** ./samples/util/stats.js ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   stats: () => (/* binding */ stats)
/* harmony export */ });
/* harmony import */ var three_examples_jsm_libs_stats_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/libs/stats.module */ "./node_modules/three/examples/jsm/libs/stats.module.js");


const stats = (0,three_examples_jsm_libs_stats_module__WEBPACK_IMPORTED_MODULE_0__["default"])()
document.body.appendChild(stats.dom)




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


/***/ },

/***/ "./node_modules/three/examples/jsm/utils/SceneUtils.js"
/*!*************************************************************!*\
  !*** ./node_modules/three/examples/jsm/utils/SceneUtils.js ***!
  \*************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   attach: () => (/* binding */ attach),
/* harmony export */   createMeshesFromInstancedMesh: () => (/* binding */ createMeshesFromInstancedMesh),
/* harmony export */   createMeshesFromMultiMaterialMesh: () => (/* binding */ createMeshesFromMultiMaterialMesh),
/* harmony export */   createMultiMaterialObject: () => (/* binding */ createMultiMaterialObject),
/* harmony export */   detach: () => (/* binding */ detach)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _BufferGeometryUtils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BufferGeometryUtils.js */ "./node_modules/three/examples/jsm/utils/BufferGeometryUtils.js");




function createMeshesFromInstancedMesh( instancedMesh ) {

	const group = new three__WEBPACK_IMPORTED_MODULE_0__.Group();

	const count = instancedMesh.count;
	const geometry = instancedMesh.geometry;
	const material = instancedMesh.material;

	for ( let i = 0; i < count; i ++ ) {

		const mesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh( geometry, material );

		instancedMesh.getMatrixAt( i, mesh.matrix );
		mesh.matrix.decompose( mesh.position, mesh.quaternion, mesh.scale );

		group.add( mesh );

	}

	group.copy( instancedMesh );
	group.updateMatrixWorld(); // ensure correct world matrices of meshes

	return group;

}

function createMeshesFromMultiMaterialMesh( mesh ) {

	if ( Array.isArray( mesh.material ) === false ) {

		console.warn( 'THREE.SceneUtils.createMeshesFromMultiMaterialMesh(): The given mesh has no multiple materials.' );
		return mesh;

	}

	const object = new three__WEBPACK_IMPORTED_MODULE_0__.Group();
	object.copy( mesh );

	// merge groups (which automatically sorts them)

	const geometry = (0,_BufferGeometryUtils_js__WEBPACK_IMPORTED_MODULE_1__.mergeGroups)( mesh.geometry );

	const index = geometry.index;
	const groups = geometry.groups;
	const attributeNames = Object.keys( geometry.attributes );

	// create a mesh for each group by extracting the buffer data into a new geometry

	for ( let i = 0; i < groups.length; i ++ ) {

		const group = groups[ i ];

		const start = group.start;
		const end = start + group.count;

		const newGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.BufferGeometry();
		const newMaterial = mesh.material[ group.materialIndex ];

		// process all buffer attributes

		for ( let j = 0; j < attributeNames.length; j ++ ) {

			const name = attributeNames[ j ];
			const attribute = geometry.attributes[ name ];
			const itemSize = attribute.itemSize;

			const newLength = group.count * itemSize;
			const type = attribute.array.constructor;

			const newArray = new type( newLength );
			const newAttribute = new three__WEBPACK_IMPORTED_MODULE_0__.BufferAttribute( newArray, itemSize );

			for ( let k = start, n = 0; k < end; k ++, n ++ ) {

				const ind = index.getX( k );

				if ( itemSize >= 1 ) newAttribute.setX( n, attribute.getX( ind ) );
				if ( itemSize >= 2 ) newAttribute.setY( n, attribute.getY( ind ) );
				if ( itemSize >= 3 ) newAttribute.setZ( n, attribute.getZ( ind ) );
				if ( itemSize >= 4 ) newAttribute.setW( n, attribute.getW( ind ) );

			}


			newGeometry.setAttribute( name, newAttribute );

		}

		const newMesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh( newGeometry, newMaterial );
		object.add( newMesh );

	}

	return object;

}

function createMultiMaterialObject( geometry, materials ) {

	const group = new three__WEBPACK_IMPORTED_MODULE_0__.Group();

	for ( let i = 0, l = materials.length; i < l; i ++ ) {

		group.add( new three__WEBPACK_IMPORTED_MODULE_0__.Mesh( geometry, materials[ i ] ) );

	}

	return group;

}

function detach( child, parent, scene ) {

	console.warn( 'THREE.SceneUtils: detach() has been deprecated. Use scene.attach( child ) instead.' );

	scene.attach( child );

}

function attach( child, scene, parent ) {

	console.warn( 'THREE.SceneUtils: attach() has been deprecated. Use parent.attach( child ) instead.' );

	parent.attach( child );

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
/******/ 			"basic-scene": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","vendors-node_modules_three_examples_jsm_utils_BufferGeometryUtils_js"], () => (__webpack_require__("./samples/chapters/chapter-2/basic-scene.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QStCLHdDQUF3QztXQUN2RTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlCQUFpQixxQkFBcUI7V0FDdEM7V0FDQTtXQUNBLGtCQUFrQixxQkFBcUI7V0FDdkM7V0FDQTtXQUNBLEtBQUs7V0FDTDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRTs7Ozs7V0MzQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQSw0Rzs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9ib290c3RyYXAvYm9vdHN0cmFwLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9ib290c3RyYXAvZmxvb3IuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2Jvb3RzdHJhcC9saWdodGluZy5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci0yL2Jhc2ljLXNjZW5lLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jb250cm9sbGVyL29yYml0LWNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NvbnRyb2xzL2FkZC1yZW1vdmUtY3ViZS1jb250cm9scy5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY29udHJvbHMvaGVscGVycy1jb250cm9sLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jb250cm9scy9yZW5kZXJlci1jb250cm9sLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jb250cm9scy9zY2VuZS1jb250cm9scy5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvaGVscGVycy9oZWxwZXJzLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy91dGlsL2NvbG9yVXRpbC5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvdXRpbC9wb3NpdGlvblV0aWwuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL3V0aWwvc3RhdHMuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL3V0aWwvdXBkYXRlLW9uLXJlc2l6ZS5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL25vZGVfbW9kdWxlcy90aHJlZS9leGFtcGxlcy9qc20vbGlicy9zdGF0cy5tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9ub2RlX21vZHVsZXMvdGhyZWUvZXhhbXBsZXMvanNtL3V0aWxzL1NjZW5lVXRpbHMuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcbmltcG9ydCB7IGluaXRPcmJpdENvbnRyb2xzIH0gZnJvbSAnLi4vY29udHJvbGxlci9vcmJpdC1jb250cm9sbGVyJ1xuaW1wb3J0IHsgaW5pdExpZ2h0aW5nIH0gZnJvbSAnLi9saWdodGluZydcbmltcG9ydCB7IG9uUmVzaXplIH0gZnJvbSAnLi4vdXRpbC91cGRhdGUtb24tcmVzaXplJ1xuXG5leHBvcnQgY29uc3QgaW5pdFNjZW5lID0gKHsgYmFja2dyb3VuZENvbG9yLCBmb2dDb2xvciwgZGlzYWJsZVNoYWRvd3MsIGRpc2FibGVMaWdodHMsIGRpc2FibGVEZWZhdWx0Q29udHJvbHMgfSkgPT4ge1xuICBjb25zdCBpbml0ID0gKGZuKSA9PiB7XG4gICAgLy8gYmFzaWMgc2NlbmUgc2V0dXBcbiAgICBjb25zdCBzY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpXG4gICAgaWYgKGJhY2tncm91bmRDb2xvcikge1xuICAgICAgc2NlbmUuYmFja2dyb3VuZENvbG9yID0gYmFja2dyb3VuZENvbG9yXG4gICAgfVxuXG4gICAgaWYgKGZvZ0NvbG9yKSB7XG4gICAgICBzY2VuZS5mb2cgPSBuZXcgVEhSRUUuRm9nKGZvZ0NvbG9yLCAwLjAwMjUsIDUwKVxuICAgIH1cblxuICAgIC8vIHNldHVwIGNhbWVyYSBhbmQgYmFzaWMgcmVuZGVyZXJcbiAgICBjb25zdCBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNzUsIHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0LCAwLjEsIDEwMDApXG4gICAgY29uc3QgcmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcih7IGFudGlhbGlhczogdHJ1ZSB9KVxuICAgIHJlbmRlcmVyLm91dHB1dEVuY29kaW5nID0gVEhSRUUuc1JHQkVuY29kaW5nXG4gICAgcmVuZGVyZXIuc2hhZG93TWFwLmVuYWJsZWQgPSB0cnVlXG4gICAgcmVuZGVyZXIuc2hhZG93TWFwLnR5cGUgPSBUSFJFRS5WU01TaGFkb3dNYXBcbiAgICByZW5kZXJlci5zZXRDbGVhckNvbG9yKGJhY2tncm91bmRDb2xvcilcblxuICAgIG9uUmVzaXplKGNhbWVyYSwgcmVuZGVyZXIpXG4gICAgcmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocmVuZGVyZXIuZG9tRWxlbWVudClcblxuICAgIC8vIGluaXRpYWxpemUgb3JiaXQgY29udHJvbHNcbiAgICBsZXQgb3JiaXRDb250cm9sc1xuICAgIGlmICghZGlzYWJsZURlZmF1bHRDb250cm9scykge1xuICAgICAgb3JiaXRDb250cm9scyA9IGluaXRPcmJpdENvbnRyb2xzKGNhbWVyYSwgcmVuZGVyZXIpXG4gICAgfVxuXG4gICAgLy8gYWRkIHNvbWUgYmFzaWMgbGlnaHRpbmcgdG8gdGhlIHNjZW5lXG4gICAgaWYgKCFkaXNhYmxlTGlnaHRzID8/IGZhbHNlKSB7XG4gICAgICBpbml0TGlnaHRpbmcoc2NlbmUsIHsgZGlzYWJsZVNoYWRvd3MgfSlcbiAgICB9XG5cbiAgICBmbih7IHNjZW5lLCBjYW1lcmEsIHJlbmRlcmVyLCBvcmJpdENvbnRyb2xzIH0pXG4gIH1cblxuICByZXR1cm4gaW5pdFxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5cbmV4cG9ydCBjb25zdCBmb3JldmVyUGxhbmUgPSAoc2NlbmUpID0+IHtcbiAgY29uc3QgZ2VvID0gbmV3IFRIUkVFLlBsYW5lQnVmZmVyR2VvbWV0cnkoMTAwMDAsIDEwMDAwKVxuICBjb25zdCBtYXQgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7XG4gICAgY29sb3I6IDB4ZmZmZmZmXG4gIH0pXG4gIGNvbnN0IG1lc2ggPSBuZXcgVEhSRUUuTWVzaChnZW8sIG1hdClcbiAgbWVzaC5wb3NpdGlvbi5zZXQoMCwgLTIsIDApXG4gIG1lc2gucm90YXRpb24uc2V0KE1hdGguUEkgLyAtMiwgMCwgMClcbiAgbWVzaC5yZWNlaXZlU2hhZG93ID0gdHJ1ZVxuICBtZXNoLm5hbWUgPSAnZm9yZXZlci1mbG9vcidcbiAgc2NlbmUuYWRkKG1lc2gpXG5cbiAgcmV0dXJuIG1lc2hcbn1cblxuZXhwb3J0IGNvbnN0IGZsb2F0aW5nRmxvb3IgPSAoc2NlbmUsIHNpemUpID0+IHtcbiAgY29uc3QgcyA9IHNpemUgPyBzaXplIDogNlxuICBjb25zdCBnZW8gPSBuZXcgVEhSRUUuQm94QnVmZmVyR2VvbWV0cnkocywgMC4yNSwgcywgMTAsIDEwLCAxMClcbiAgY29uc3QgbWF0ID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcbiAgICBjb2xvcjogMHhkZGRkZGRcbiAgfSlcbiAgY29uc3QgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlbywgbWF0KVxuICBtZXNoLnBvc2l0aW9uLnNldCgwLCAtMiwgLTEpXG4gIG1lc2gucmVjZWl2ZVNoYWRvdyA9IHRydWVcbiAgbWVzaC5uYW1lID0gJ2Zsb2F0aW5nLWZsb29yJ1xuICBzY2VuZS5hZGQobWVzaClcblxuICByZXR1cm4gbWVzaFxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5cbmV4cG9ydCBjb25zdCBpbml0TGlnaHRpbmcgPSAoc2NlbmUsIHsgZGlzYWJsZVNoYWRvd3MgfSkgPT4ge1xuICAvLyBodHRwczovL3RocmVlanMub3JnL2V4YW1wbGVzLz9xPXNoYWRvI3dlYmdsX3NoYWRvd21hcF92c21cbiAgc2NlbmUuYWRkKG5ldyBUSFJFRS5BbWJpZW50TGlnaHQoMHg2NjY2NjYpKVxuXG4gIC8vIGNvbnN0IGRpckxpZ2h0ID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoMHhhYWFhYWEpXG4gIGNvbnN0IGRpckxpZ2h0ID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoMHhhYWFhYWEpXG4gIGRpckxpZ2h0LnBvc2l0aW9uLnNldCg1LCAxMiwgOClcbiAgZGlyTGlnaHQuY2FzdFNoYWRvdyA9ICFkaXNhYmxlU2hhZG93cyA/IHRydWUgOiBmYWxzZVxuICBkaXJMaWdodC5pbnRlbnNpdHkgPSAxXG4gIGRpckxpZ2h0LnNoYWRvdy5jYW1lcmEubmVhciA9IDAuMVxuICBkaXJMaWdodC5zaGFkb3cuY2FtZXJhLmZhciA9IDIwMFxuICBkaXJMaWdodC5zaGFkb3cuY2FtZXJhLnJpZ2h0ID0gMTBcbiAgZGlyTGlnaHQuc2hhZG93LmNhbWVyYS5sZWZ0ID0gLTEwXG4gIGRpckxpZ2h0LnNoYWRvdy5jYW1lcmEudG9wID0gMTBcbiAgZGlyTGlnaHQuc2hhZG93LmNhbWVyYS5ib3R0b20gPSAtMTBcbiAgZGlyTGlnaHQuc2hhZG93Lm1hcFNpemUud2lkdGggPSAyMDQ4XG4gIGRpckxpZ2h0LnNoYWRvdy5tYXBTaXplLmhlaWdodCA9IDIwNDhcbiAgZGlyTGlnaHQuc2hhZG93LnJhZGl1cyA9IDRcbiAgZGlyTGlnaHQuc2hhZG93LmJpYXMgPSAtMC4wMDAwNVxuXG4gIHNjZW5lLmFkZChkaXJMaWdodClcbn1cbiIsImltcG9ydCBHVUkgZnJvbSAnbGlsLWd1aSdcbmltcG9ydCB7IGZsb2F0aW5nRmxvb3IgfSBmcm9tICcuLi8uLi9ib290c3RyYXAvZmxvb3IuanMnXG5pbXBvcnQgeyBpbml0aWFsaXplQWRkUmVtb3ZlQ3ViZUNvbnRyb2xzIH0gZnJvbSAnLi4vLi4vY29udHJvbHMvYWRkLXJlbW92ZS1jdWJlLWNvbnRyb2xzLmpzJ1xuaW1wb3J0IHsgaW5pdGlhbGl6ZUhlbHBlckNvbnRyb2xzIH0gZnJvbSAnLi4vLi4vY29udHJvbHMvaGVscGVycy1jb250cm9sLmpzJ1xuaW1wb3J0IHsgaW5pdGlhbGl6ZVNjZW5lQ29udHJvbHMgfSBmcm9tICcuLi8uLi9jb250cm9scy9zY2VuZS1jb250cm9scydcbmltcG9ydCB7IGluaXRTY2VuZSB9IGZyb20gJy4uLy4uL2Jvb3RzdHJhcC9ib290c3RyYXAuanMnXG5pbXBvcnQgeyBpbnRpYWxpemVSZW5kZXJlckNvbnRyb2xzIH0gZnJvbSAnLi4vLi4vY29udHJvbHMvcmVuZGVyZXItY29udHJvbC5qcydcbmltcG9ydCB7IHN0YXRzIH0gZnJvbSAnLi4vLi4vdXRpbC9zdGF0cydcblxuY29uc3QgcHJvcHMgPSB7XG4gIGJhY2tncm91bmRDb2xvcjogMHhmZmZmZmYsXG4gIGZvZ0NvbG9yOiAweGZmZmZmZlxufVxuY29uc3QgZ3VpID0gbmV3IEdVSSgpXG5cbmluaXRTY2VuZShwcm9wcykoKHsgc2NlbmUsIGNhbWVyYSwgcmVuZGVyZXIsIG9yYml0Q29udHJvbHMgfSkgPT4ge1xuICBjYW1lcmEucG9zaXRpb24uc2V0KC03LCAyLCA1KVxuICBvcmJpdENvbnRyb2xzLnVwZGF0ZSgpXG5cbiAgZmxvYXRpbmdGbG9vcihzY2VuZSwgMTApXG5cbiAgZnVuY3Rpb24gYW5pbWF0ZSgpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSlcbiAgICByZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSlcbiAgICBzdGF0cy51cGRhdGUoKVxuXG4gICAgb3JiaXRDb250cm9scy51cGRhdGUoKVxuICB9XG4gIGFuaW1hdGUoKVxuXG4gIGludGlhbGl6ZVJlbmRlcmVyQ29udHJvbHMoZ3VpLCByZW5kZXJlcilcbiAgaW5pdGlhbGl6ZUhlbHBlckNvbnRyb2xzKGd1aSwgc2NlbmUpXG4gIGluaXRpYWxpemVTY2VuZUNvbnRyb2xzKGd1aSwgc2NlbmUsIHRydWUpXG4gIGluaXRpYWxpemVBZGRSZW1vdmVDdWJlQ29udHJvbHMoZ3VpLCBzY2VuZSlcbn0pXG4iLCJpbXBvcnQgeyBPcmJpdENvbnRyb2xzIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2NvbnRyb2xzL09yYml0Q29udHJvbHMnXG5cbmV4cG9ydCBjb25zdCBpbml0T3JiaXRDb250cm9scyA9IChjYW1lcmEsIHJlbmRlcmVyKSA9PiB7XG4gIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgT3JiaXRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLmRvbUVsZW1lbnQpXG4gIGNvbnRyb2xsZXIuZW5hYmxlRGFtcGluZyA9IHRydWVcbiAgY29udHJvbGxlci5kYW1waW5nRmFjdG9yID0gMC4wNVxuICBjb250cm9sbGVyLm1pbkRpc3RhbmNlID0gMVxuICBjb250cm9sbGVyLm1heERpc3RhbmNlID0gMTAwXG4gIGNvbnRyb2xsZXIubWluUG9sYXJBbmdsZSA9IE1hdGguUEkgLyA0XG4gIGNvbnRyb2xsZXIubWF4UG9sYXJBbmdsZSA9ICgzICogTWF0aC5QSSkgLyA0XG5cbiAgcmV0dXJuIGNvbnRyb2xsZXJcbn1cbiIsImltcG9ydCAqIGFzIFNjZW5lVXRpbHMgZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL3V0aWxzL1NjZW5lVXRpbHMnXG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcbmltcG9ydCB7IHJhbmRvbUNvbG9yIH0gZnJvbSAnLi4vdXRpbC9jb2xvclV0aWwuanMnXG5pbXBvcnQgeyByYW5kb21WZWN0b3IgfSBmcm9tICcuLi91dGlsL3Bvc2l0aW9uVXRpbC5qcydcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVBZGRSZW1vdmVDdWJlQ29udHJvbHMgPSAoZ3VpLCBwYXJlbnQsIG1hdGVyaWFsKSA9PiB7XG4gIGNvbnN0IGFkZFJlbW92ZVByb3BzID0ge1xuICAgIGFkZEN1YmU6ICgpID0+IGFkZEN1YmUocGFyZW50LCBtYXRlcmlhbCksXG4gICAgcmVtb3ZlQ3ViZTogKCkgPT4gcmVtb3ZlQ3ViZShwYXJlbnQpXG4gIH1cblxuICBndWkuYWRkKGFkZFJlbW92ZVByb3BzLCAnYWRkQ3ViZScpXG4gIGd1aS5hZGQoYWRkUmVtb3ZlUHJvcHMsICdyZW1vdmVDdWJlJylcbn1cblxuY29uc3QgYWRkQ3ViZSA9IChwYXJlbnQsIG1hdGVyaWFsKSA9PiB7XG4gIGNvbnN0IGNvbG9yID0gcmFuZG9tQ29sb3IoKVxuICBjb25zdCBwb3MgPSByYW5kb21WZWN0b3Ioe1xuICAgIHhSYW5nZTogeyBmcm9tWDogLTQsIHRvWDogNCB9LFxuICAgIHlSYW5nZTogeyBmcm9tWTogLTMsIHRvWTogMyB9LFxuICAgIHpSYW5nZTogeyBmcm9tWjogLTQsIHRvWjogNCB9XG4gIH0pXG5cbiAgY29uc3Qgcm90YXRpb24gPSByYW5kb21WZWN0b3Ioe1xuICAgIHhSYW5nZTogeyBmcm9tWDogMCwgdG9YOiBNYXRoLlBJICogMiB9LFxuICAgIHlSYW5nZTogeyBmcm9tWTogMCwgdG9ZOiBNYXRoLlBJICogMiB9LFxuICAgIHpSYW5nZTogeyBmcm9tWjogMCwgdG9aOiBNYXRoLlBJICogMiB9XG4gIH0pXG5cbiAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoMC41LCAwLjUsIDAuNSlcbiAgY29uc3QgY3ViZU1hdGVyaWFsID1cbiAgICBtYXRlcmlhbCA/P1xuICAgIG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7XG4gICAgICBjb2xvcjogY29sb3IsXG4gICAgICByb3VnaG5lc3M6IDAuMSxcbiAgICAgIG1ldGFsbmVzczogMC45XG4gICAgfSlcblxuICBsZXQgY3ViZVxuXG4gIGlmIChBcnJheS5pc0FycmF5KGN1YmVNYXRlcmlhbCkpIHtcbiAgICBjdWJlID0gU2NlbmVVdGlscy5jcmVhdGVNdWx0aU1hdGVyaWFsT2JqZWN0KGdlb21ldHJ5LCBjdWJlTWF0ZXJpYWwpXG4gIH0gZWxzZSB7XG4gICAgY3ViZSA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBjdWJlTWF0ZXJpYWwpXG4gIH1cbiAgY3ViZS5uYW1lID0gJ2N1YmUtJyArIHBhcmVudC5jaGlsZHJlbi5sZW5ndGhcbiAgY3ViZS5wb3NpdGlvbi5jb3B5KHBvcylcbiAgY3ViZS5yb3RhdGlvbi5zZXRGcm9tVmVjdG9yMyhyb3RhdGlvbilcbiAgY3ViZS5jYXN0U2hhZG93ID0gdHJ1ZVxuICBwYXJlbnQuYWRkKGN1YmUpXG59XG5cbmNvbnN0IHJlbW92ZUN1YmUgPSAocGFyZW50KSA9PiB7XG4gIHBhcmVudC5jaGlsZHJlbi5wb3AoKVxufVxuIiwiaW1wb3J0IHtcbiAgYXhpc0hlbHBlcixcbiAgYXhpc0hlbHBlck5hbWUsXG4gIGdyaWRIZWxwZXIsXG4gIGdyaWRIZWxwZXJOYW1lLFxuICBwb2xhckdyaWRIZWxwZXIsXG4gIHBvbGFyR3JpZEhlbHBlck5hbWUsXG59IGZyb20gXCIuLi9oZWxwZXJzL2hlbHBlcnNcIjtcblxuY29uc3QgcHJvcGVydGllc09iamVjdCA9IChzY2VuZSkgPT4gKHtcbiAgYXhpc0hlbHBlcjoge1xuICAgIHRvZ2dsZTogKCkgPT4ge1xuICAgICAgY29uc3QgY3VycmVudEhlbHBlciA9IHNjZW5lLmdldE9iamVjdEJ5TmFtZShheGlzSGVscGVyTmFtZSk7XG4gICAgICBpZiAoY3VycmVudEhlbHBlcikge1xuICAgICAgICBzY2VuZS5yZW1vdmUoY3VycmVudEhlbHBlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBheGlzSGVscGVyKHNjZW5lKTtcbiAgICAgIH1cbiAgICB9LFxuICB9LFxuICBncmlkSGVscGVyOiB7XG4gICAgdG9nZ2xlOiAoKSA9PiByZW1vdmVPckFkZFRvU2NlbmUoZ3JpZEhlbHBlck5hbWUsIHNjZW5lLCBncmlkSGVscGVyKSxcbiAgfSxcbiAgcG9sYXJHcmlkSGVscGVyOiB7XG4gICAgdG9nZ2xlOiAoKSA9PlxuICAgICAgcmVtb3ZlT3JBZGRUb1NjZW5lKHBvbGFyR3JpZEhlbHBlck5hbWUsIHNjZW5lLCBwb2xhckdyaWRIZWxwZXIpLFxuICB9LFxufSk7XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsaXplSGVscGVyQ29udHJvbHMgPSAoZ3VpLCBzY2VuZSkgPT4ge1xuICBjb25zdCBwcm9wcyA9IHByb3BlcnRpZXNPYmplY3Qoc2NlbmUpO1xuICBjb25zdCBoZWxwZXJzID0gZ3VpLmFkZEZvbGRlcihcIkhlbHBlcnNcIik7XG4gIC8vICAgaGVscGVycy5hZGQoJ2F4aXNIZWxwZXJFbmFibGVkJywgcHJvcGVydGllc09iamVjdClcbiAgaGVscGVycy5hZGQocHJvcHMuYXhpc0hlbHBlciwgXCJ0b2dnbGVcIikubmFtZShcIlRvZ2dsZSBBeGVzSGVscGVyXCIpO1xuICBoZWxwZXJzLmFkZChwcm9wcy5ncmlkSGVscGVyLCBcInRvZ2dsZVwiKS5uYW1lKFwiVG9nZ2xlIEdyaWRIZWxwZXJcIik7XG4gIGhlbHBlcnMuYWRkKHByb3BzLnBvbGFyR3JpZEhlbHBlciwgXCJ0b2dnbGVcIikubmFtZShcIlRvZ2dsZSBQb2xhckdyaWRIZWxwZXJcIik7XG5cbiAgaGVscGVycy5jbG9zZSgpO1xufTtcblxuY29uc3QgcmVtb3ZlT3JBZGRUb1NjZW5lID0gKG5hbWUsIHNjZW5lLCBhZGRGbikgPT4ge1xuICBjb25zdCBjdXJyZW50T2JqZWN0ID0gc2NlbmUuZ2V0T2JqZWN0QnlOYW1lKG5hbWUpO1xuICBjb25zb2xlLmxvZyhjdXJyZW50T2JqZWN0KTtcbiAgaWYgKGN1cnJlbnRPYmplY3QpIHtcbiAgICBzY2VuZS5yZW1vdmUoY3VycmVudE9iamVjdCk7XG4gIH0gZWxzZSB7XG4gICAgYWRkRm4oc2NlbmUpO1xuICB9XG59O1xuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5cbmNvbnN0IGVudW1zID0ge1xuICB0b25lTWFwcGluZ09wdGlvbnM6IHtcbiAgICBOb25lOiBUSFJFRS5Ob1RvbmVNYXBwaW5nLFxuICAgIExpbmVhcjogVEhSRUUuTGluZWFyVG9uZU1hcHBpbmcsXG4gICAgUmVpbmhhcmQ6IFRIUkVFLlJlaW5oYXJkVG9uZU1hcHBpbmcsXG4gICAgQ2luZW9uOiBUSFJFRS5DaW5lb25Ub25lTWFwcGluZyxcbiAgICBBQ0VTRmlsbWljOiBUSFJFRS5BQ0VTRmlsbWljVG9uZU1hcHBpbmcsXG4gICAgQ3VzdG9tOiBUSFJFRS5DdXN0b21Ub25lTWFwcGluZyxcbiAgfSxcbiAgc2hhZG93TWFwcGluZzoge1xuICAgIEJhc2ljOiBUSFJFRS5CYXNpY1NoYWRvd01hcCxcbiAgICBQQ0ZTOiBUSFJFRS5QQ0ZTaGFkb3dNYXAsXG4gICAgUENGU29mdDogVEhSRUUuUENGU29mdFNoYWRvd01hcCxcbiAgICBWU006IFRIUkVFLlZTTVNoYWRvd01hcCxcbiAgfSxcbiAgb3V0cHV0RW5jb2RpbmdzOiB7XG4gICAgTGluZWFyOiBUSFJFRS5MaW5lYXJFbmNvZGluZyxcbiAgICBzUkdCOiBUSFJFRS5zUkdCRW5jb2RpbmcsXG4gIH0sXG59O1xuXG5jb25zdCBnZXRQcm9wZXJ0eUhvbGRlciA9ICh3ZWJHTFJlbmRlcmVyKSA9PiB7XG4gIGNvbnN0IGNsZWFyQ29sb3JIb2xkZXIgPSBuZXcgVEhSRUUuQ29sb3IoKTtcbiAgd2ViR0xSZW5kZXJlci5nZXRDbGVhckNvbG9yKGNsZWFyQ29sb3JIb2xkZXIpO1xuXG4gIGNvbnN0IGhvbGRlciA9IHtcbiAgICBtYWluOiB7XG4gICAgICBvdXRwdXRFbmNvZGluZzogd2ViR0xSZW5kZXJlci5vdXRwdXRFbmNvZGluZyxcbiAgICB9LFxuICAgIHNoYWRvd01hcDoge1xuICAgICAgZW5hYmxlZDogd2ViR0xSZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCxcbiAgICAgIGF1dG9VcGRhdGU6IHdlYkdMUmVuZGVyZXIuc2hhZG93TWFwLmF1dG9VcGRhdGUsXG4gICAgICBuZWVkc1VwZGF0ZTogKCkgPT4gKHdlYkdMUmVuZGVyZXIuc2hhZG93TWFwLm5lZWRzVXBkYXRlID0gdHJ1ZSksXG4gICAgICB0eXBlOiB3ZWJHTFJlbmRlcmVyLnNoYWRvd01hcC50eXBlLFxuICAgIH0sXG4gICAgdG9uZU1hcHBpbmc6IHtcbiAgICAgIGV4cG9zdXJlOiB3ZWJHTFJlbmRlcmVyLnRvbmVNYXBwaW5nRXhwb3N1cmUsXG4gICAgICB0b25lTWFwcGluZzogd2ViR0xSZW5kZXJlci50b25lTWFwcGluZyxcbiAgICB9LFxuICAgIGNsZWFyU2V0dGluZ3M6IHtcbiAgICAgIGF1dG9DbGVhcjogd2ViR0xSZW5kZXJlci5hdXRvQ2xlYXIsXG4gICAgICBjbGVhckNvbG9yOiBjbGVhckNvbG9ySG9sZGVyLmdldFN0eWxlKCksXG4gICAgfSxcbiAgICBhZHZhbmNlZDoge1xuICAgICAgYXV0b0NsZWFyRGVwdGg6IHdlYkdMUmVuZGVyZXIuYXV0b0NsZWFyRGVwdGgsXG4gICAgICBhdXRvQ2xlYXJTdGVuY2lsOiB3ZWJHTFJlbmRlcmVyLmF1dG9DbGVhclN0ZW5jaWwsXG4gICAgICBjaGVja1NoYWRlckVycm9yczogd2ViR0xSZW5kZXJlci5kZWJ1Zy5jaGVja1NoYWRlckVycm9ycyxcbiAgICAgIHNvcnRPYmplY3RzOiB3ZWJHTFJlbmRlcmVyLnNvcnRPYmplY3RzLFxuICAgICAgbG9jYWxDbGlwcGluZ0VuYWJsZWQ6IHdlYkdMUmVuZGVyZXIubG9jYWxDbGlwcGluZ0VuYWJsZWQsXG4gICAgICBwaHlzaWNhbGx5Q29ycmVjdExpZ2h0czogd2ViR0xSZW5kZXJlci5waHlzaWNhbGx5Q29ycmVjdExpZ2h0cyxcbiAgICB9LFxuICB9O1xuXG4gIHJldHVybiBob2xkZXI7XG59O1xuXG5leHBvcnQgY29uc3QgaW50aWFsaXplUmVuZGVyZXJDb250cm9scyA9IChndWksIHdlYkdMUmVuZGVyZXIpID0+IHtcbiAgY29uc3QgcHJvcGVydGllc09iamVjdCA9IGdldFByb3BlcnR5SG9sZGVyKHdlYkdMUmVuZGVyZXIpO1xuICBjb25zdCByZW5kZXJlckZvbGRlciA9IGd1aS5hZGRGb2xkZXIoXCJXZWJHTFJlbmRlcmVyXCIpO1xuXG4gIHJlbmRlcmVyRm9sZGVyLm9uQ2hhbmdlKChfKSA9PiB7XG4gICAgdXBkYXRlV2ViR0xSZW5kZXJlclByb3BlcnRpZXMod2ViR0xSZW5kZXJlciwgcHJvcGVydGllc09iamVjdCk7XG4gIH0pO1xuXG4gIHJlbmRlcmVyRm9sZGVyLmFkZChcbiAgICBwcm9wZXJ0aWVzT2JqZWN0Lm1haW4sXG4gICAgXCJvdXRwdXRFbmNvZGluZ1wiLFxuICAgIGVudW1zLm91dHB1dEVuY29kaW5nc1xuICApO1xuXG4gIGNvbnN0IHNoYWRvd0ZvbGRlciA9IHJlbmRlcmVyRm9sZGVyLmFkZEZvbGRlcihcIlNoYWRvd1wiKTtcbiAgc2hhZG93Rm9sZGVyLmFkZChwcm9wZXJ0aWVzT2JqZWN0LnNoYWRvd01hcCwgXCJlbmFibGVkXCIpO1xuICBzaGFkb3dGb2xkZXIuYWRkKHByb3BlcnRpZXNPYmplY3Quc2hhZG93TWFwLCBcImF1dG9VcGRhdGVcIik7XG4gIHNoYWRvd0ZvbGRlci5hZGQocHJvcGVydGllc09iamVjdC5zaGFkb3dNYXAsIFwibmVlZHNVcGRhdGVcIik7XG4gIHNoYWRvd0ZvbGRlclxuICAgIC5hZGQocHJvcGVydGllc09iamVjdC5zaGFkb3dNYXAsIFwidHlwZVwiLCBlbnVtcy5zaGFkb3dNYXBwaW5nKVxuICAgIC5lbmFibGUoZmFsc2UpOyAvLyBjYW4ndCB1cGRhdGUgdGhlIHNoYWRvdyBtYXBwaW5nIHR5cGUgaW4gcnVudGltZVxuXG4gIGNvbnN0IHRvbmVNYXBwaW5nRm9sZGVyID0gcmVuZGVyZXJGb2xkZXIuYWRkRm9sZGVyKFwiVG9uZU1hcHBpbmdcIik7XG4gIHRvbmVNYXBwaW5nRm9sZGVyLmFkZChwcm9wZXJ0aWVzT2JqZWN0LnRvbmVNYXBwaW5nLCBcImV4cG9zdXJlXCIsIDAsIDIpO1xuICB0b25lTWFwcGluZ0ZvbGRlci5hZGQoXG4gICAgcHJvcGVydGllc09iamVjdC50b25lTWFwcGluZyxcbiAgICBcInRvbmVNYXBwaW5nXCIsXG4gICAgZW51bXMudG9uZU1hcHBpbmdPcHRpb25zXG4gICk7XG5cbiAgY29uc3QgY2xlYXJTZXR0aW5nc0ZvbGRlciA9IHJlbmRlcmVyRm9sZGVyLmFkZEZvbGRlcihcImNsZWFyU2V0dGluZ3NcIik7XG4gIGNsZWFyU2V0dGluZ3NGb2xkZXIuYWRkKHByb3BlcnRpZXNPYmplY3QuY2xlYXJTZXR0aW5ncywgXCJhdXRvQ2xlYXJcIik7XG4gIGNsZWFyU2V0dGluZ3NGb2xkZXIuYWRkQ29sb3IocHJvcGVydGllc09iamVjdC5jbGVhclNldHRpbmdzLCBcImNsZWFyQ29sb3JcIik7XG5cbiAgcmVuZGVyZXJGb2xkZXIuY2xvc2UoKTtcbn07XG5cbmNvbnN0IHVwZGF0ZVdlYkdMUmVuZGVyZXJQcm9wZXJ0aWVzID0gKHdlYkdMUmVuZGVyZXIsIHByb3BlcnR5SG9sZGVyKSA9PiB7XG4gIHdlYkdMUmVuZGVyZXIuc2hhZG93TWFwLmVuYWJsZWQgPSBwcm9wZXJ0eUhvbGRlci5zaGFkb3dNYXAuZW5hYmxlZDtcbiAgd2ViR0xSZW5kZXJlci5zaGFkb3dNYXAuYXV0b1VwZGF0ZSA9IHByb3BlcnR5SG9sZGVyLnNoYWRvd01hcC5hdXRvVXBkYXRlO1xuICB3ZWJHTFJlbmRlcmVyLnNoYWRvd01hcC5uZWVkc1VwZGF0ZSA9IHByb3BlcnR5SG9sZGVyLnNoYWRvd01hcC5uZWVkc1VwZGF0ZTtcbiAgd2ViR0xSZW5kZXJlci50b25lTWFwcGluZyA9IHByb3BlcnR5SG9sZGVyLnRvbmVNYXBwaW5nLnRvbmVNYXBwaW5nO1xuICB3ZWJHTFJlbmRlcmVyLnRvbmVNYXBwaW5nRXhwb3N1cmUgPSBwcm9wZXJ0eUhvbGRlci50b25lTWFwcGluZy5leHBvc3VyZTtcbiAgd2ViR0xSZW5kZXJlci5hdXRvQ2xlYXIgPSBwcm9wZXJ0eUhvbGRlci5jbGVhclNldHRpbmdzLmF1dG9DbGVhcjtcbiAgd2ViR0xSZW5kZXJlci5zZXRDbGVhckNvbG9yKHByb3BlcnR5SG9sZGVyLmNsZWFyU2V0dGluZ3MuY2xlYXJDb2xvcik7XG4gIHdlYkdMUmVuZGVyZXIub3V0cHV0RW5jb2RpbmcgPSBwcm9wZXJ0eUhvbGRlci5tYWluLm91dHB1dEVuY29kaW5nO1xuXG4gIHdlYkdMUmVuZGVyZXIubmVlZHNVcGRhdGUgPSB0cnVlO1xufTtcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuXG5jb25zdCB0ZXh0dXJlTG9hZGVyID0gbmV3IFRIUkVFLlRleHR1cmVMb2FkZXIoKVxuXG5jb25zdCBwcm9wZXJ0aWVzT2JqZWN0ID0gKHNjZW5lKSA9PiAoe1xuICBvdmVycmlkZU1hdGVyaWFsOiB7XG4gICAgdG9nZ2xlOiAoKSA9PiB7XG4gICAgICBpZiAoc2NlbmUub3ZlcnJpZGVNYXRlcmlhbCAhPT0gbnVsbCkge1xuICAgICAgICBzY2VuZS5vdmVycmlkZU1hdGVyaWFsID0gbnVsbFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2NlbmUub3ZlcnJpZGVNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTm9ybWFsTWF0ZXJpYWwoKVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgYmFja0dyb3VuZDogJ1doaXRlJyxcbiAgZW52aXJvbm1lbnQ6IHtcbiAgICB0b2dnbGU6ICgpID0+IHtcbiAgICAgIGlmIChzY2VuZS5lbnZpcm9ubWVudCAhPT0gbnVsbCkge1xuICAgICAgICBzY2VuZS5lbnZpcm9ubWVudCA9IG51bGxcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRleHR1cmVMb2FkZXIubG9hZCgnL2Fzc2V0cy9lcXVpLmpwZWcnLCAobG9hZGVkKSA9PiB7XG4gICAgICAgICAgbG9hZGVkLm1hcHBpbmcgPSBUSFJFRS5FcXVpcmVjdGFuZ3VsYXJSZWZsZWN0aW9uTWFwcGluZ1xuICAgICAgICAgIHNjZW5lLmVudmlyb25tZW50ID0gbG9hZGVkXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuXG5jb25zdCBmb2dQcm9wZXJ0aWVzID0gKGZvZykgPT4gKHtcbiAgY29sb3I6IDB4ZmZmZmZmLFxuICBuZWFyOiBmb2cubmVhcixcbiAgZmFyOiBmb2cuZmFyXG59KVxuXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZVNjZW5lQ29udHJvbHMgPSAoZ3VpLCBzY2VuZSwgZm9nRW5hYmxlZCwgaXNPcGVuKSA9PiB7XG4gIGNvbnN0IHByb3BzID0gcHJvcGVydGllc09iamVjdChzY2VuZSlcbiAgY29uc3Qgc2NlbmVDb250cm9scyA9IGd1aS5hZGRGb2xkZXIoJ1NjZW5lJylcblxuICBzY2VuZUNvbnRyb2xzXG4gICAgLmFkZChwcm9wcywgJ2JhY2tHcm91bmQnLCBbJ1doaXRlJywgJ0JsYWNrJywgJ051bGwnLCAnQ29sb3InLCAnVGV4dHVyZScsICdDdWJlbWFwJ10pXG4gICAgLm9uQ2hhbmdlKChldmVudCkgPT4gaGFuZGxlQmFja2dyb3VuZENoYW5nZShldmVudCwgc2NlbmUpKVxuICBzY2VuZUNvbnRyb2xzLmFkZChwcm9wcy5vdmVycmlkZU1hdGVyaWFsLCAndG9nZ2xlJykubmFtZSgnVG9nZ2xlIE92ZXJyaWRlIE1hdGVyaWFsJylcbiAgc2NlbmVDb250cm9scy5hZGQocHJvcHMuZW52aXJvbm1lbnQsICd0b2dnbGUnKS5uYW1lKCdUb2dnbGUgRW52aXJvbm1lbnQnKVxuXG4gIGlmIChmb2dFbmFibGVkKSB7XG4gICAgY29uc3QgZm9nQ29sb3IgPSBuZXcgVEhSRUUuQ29sb3IoMHhmZmZmZmYpXG4gICAgY29uc3QgZm9nID0gbmV3IFRIUkVFLkZvZyhmb2dDb2xvciwgMSwgMjApXG4gICAgc2NlbmUuZm9nID0gZm9nXG4gICAgY29uc3QgZm9nUHJvcHMgPSBmb2dQcm9wZXJ0aWVzKGZvZylcbiAgICBjb25zdCBmb2dDb250cm9scyA9IHNjZW5lQ29udHJvbHMuYWRkRm9sZGVyKCdGb2cnKVxuICAgIGZvZ0NvbnRyb2xzLmFkZENvbG9yKGZvZ1Byb3BzLCAnY29sb3InKVxuICAgIGZvZ0NvbnRyb2xzLmFkZChmb2dQcm9wcywgJ25lYXInLCAwLCAxMCwgMC4xKVxuICAgIGZvZ0NvbnRyb2xzLmFkZChmb2dQcm9wcywgJ2ZhcicsIDAsIDEwMCwgMC4xKVxuXG4gICAgZm9nQ29udHJvbHMub25DaGFuZ2UoKCkgPT4ge1xuICAgICAgZm9nLmNvbG9yID0gZm9nQ29sb3Iuc2V0SGV4KGZvZ1Byb3BzLmNvbG9yKVxuICAgICAgZm9nLm5lYXIgPSBmb2dQcm9wcy5uZWFyXG4gICAgICBmb2cuZmFyID0gZm9nUHJvcHMuZmFyXG4gICAgfSlcbiAgfVxuXG4gIGlzT3BlbiA/IHNjZW5lQ29udHJvbHMub3BlbigpIDogc2NlbmVDb250cm9scy5jbG9zZSgpXG59XG5cbmNvbnN0IGhhbmRsZUJhY2tncm91bmRDaGFuZ2UgPSAoc2V0dGluZywgc2NlbmUpID0+IHtcbiAgc3dpdGNoIChzZXR0aW5nKSB7XG4gICAgY2FzZSAnV2hpdGUnOlxuICAgICAgc2NlbmUuYmFja2dyb3VuZCA9IG5ldyBUSFJFRS5Db2xvcigweGZmZmZmZilcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnQmxhY2snOlxuICAgICAgc2NlbmUuYmFja2dyb3VuZCA9IG5ldyBUSFJFRS5Db2xvcigweDAwMDAwMClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnTnVsbCc6XG4gICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbnVsbFxuICAgICAgYnJlYWtcbiAgICBjYXNlICdDb2xvcic6XG4gICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbmV3IFRIUkVFLkNvbG9yKDB4NDRmZjQ0KVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdUZXh0dXJlJzpcbiAgICAgIHRleHR1cmVMb2FkZXIubG9hZCgnL2Fzc2V0cy90ZXh0dXJlcy93b29kL2Fic3RyYWN0LWFudGlxdWUtYmFja2Ryb3AtMTY0MDA1LmpwZycsIChsb2FkZWQpID0+IHtcbiAgICAgICAgbG9hZGVkLmVuY29kaW5nID0gVEhSRUUuc1JHQkVuY29kaW5nXG4gICAgICAgIHNjZW5lLmJhY2tncm91bmQgPSBsb2FkZWRcbiAgICAgICAgc2NlbmUuZW52aXJvbm1lbnQgPSBudWxsXG4gICAgICB9KVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdDdWJlbWFwJzpcbiAgICAgIHRleHR1cmVMb2FkZXIubG9hZCgnL2Fzc2V0cy9lcXVpLmpwZWcnLCAobG9hZGVkKSA9PiB7XG4gICAgICAgIGxvYWRlZC5tYXBwaW5nID0gVEhSRUUuRXF1aXJlY3Rhbmd1bGFyUmVmbGVjdGlvbk1hcHBpbmdcbiAgICAgICAgc2NlbmUuYmFja2dyb3VuZCA9IGxvYWRlZFxuICAgICAgICBzY2VuZS5lbnZpcm9ubWVudCA9IGxvYWRlZFxuICAgICAgfSlcblxuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgYnJlYWtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5cbmV4cG9ydCBjb25zdCBheGlzSGVscGVyTmFtZSA9ICdheGVzSGVscGVyJ1xuZXhwb3J0IGNvbnN0IGdyaWRIZWxwZXJOYW1lID0gJ2dyaWRIZWxwZXInXG5leHBvcnQgY29uc3QgcG9sYXJHcmlkSGVscGVyTmFtZSA9ICdwb2xhckdyaWRIZWxwZXInXG5cbmV4cG9ydCBjb25zdCBheGlzSGVscGVyID0gKHNjZW5lKSA9PiB7XG4gIGNvbnN0IGF4ZXNIZWxwZXIgPSBuZXcgVEhSRUUuQXhlc0hlbHBlcig1KVxuICBheGVzSGVscGVyLm5hbWUgPSBheGlzSGVscGVyTmFtZVxuICBzY2VuZS5hZGQoYXhlc0hlbHBlcilcbn1cblxuZXhwb3J0IGNvbnN0IGdyaWRIZWxwZXIgPSAoc2NlbmUpID0+IHtcbiAgY29uc3Qgc2l6ZSA9IDEwXG4gIGNvbnN0IGRpdmlzaW9ucyA9IDEwXG4gIGNvbnN0IGdyaWRIZWxwZXIgPSBuZXcgVEhSRUUuR3JpZEhlbHBlcihzaXplLCBkaXZpc2lvbnMpXG4gIGdyaWRIZWxwZXIubmFtZSA9IGdyaWRIZWxwZXJOYW1lXG4gIHNjZW5lLmFkZChncmlkSGVscGVyKVxufVxuXG5leHBvcnQgY29uc3QgcG9sYXJHcmlkSGVscGVyID0gKHNjZW5lKSA9PiB7XG4gIGNvbnN0IHJhZGl1cyA9IDEwXG4gIGNvbnN0IHJhZGlhbHMgPSAxNlxuICBjb25zdCBjaXJjbGVzID0gOFxuICBjb25zdCBkaXZpc2lvbnMgPSA2NFxuICBjb25zdCBwb2xhckdyaWRIZWxwZXIgPSBuZXcgVEhSRUUuUG9sYXJHcmlkSGVscGVyKHJhZGl1cywgcmFkaWFscywgY2lyY2xlcywgZGl2aXNpb25zKVxuICBwb2xhckdyaWRIZWxwZXIubmFtZSA9IHBvbGFyR3JpZEhlbHBlck5hbWVcbiAgc2NlbmUuYWRkKHBvbGFyR3JpZEhlbHBlcilcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuXG5leHBvcnQgY29uc3QgcmFuZG9tQ29sb3IgPSAoKSA9PiB7XG4gIHZhciByID0gTWF0aC5yYW5kb20oKSxcbiAgICBnID0gTWF0aC5yYW5kb20oKSxcbiAgICBiID0gTWF0aC5yYW5kb20oKVxuICByZXR1cm4gbmV3IFRIUkVFLkNvbG9yKHIsIGcsIGIpXG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcblxuZXhwb3J0IGNvbnN0IHJhbmRvbVZlY3RvciA9ICh7XG4gIHhSYW5nZTogeyBmcm9tWCwgdG9YIH0sXG4gIHlSYW5nZTogeyBmcm9tWSwgdG9ZIH0sXG4gIHpSYW5nZTogeyBmcm9tWiwgdG9aIH0sXG59KSA9PiB7XG4gIGNvbnN0IHggPSBNYXRoLnJhbmRvbSgpICogKHRvWCAtIGZyb21YKSArIGZyb21YO1xuICBjb25zdCB5ID0gTWF0aC5yYW5kb20oKSAqICh0b1kgLSBmcm9tWSkgKyBmcm9tWTtcbiAgY29uc3QgeiA9IE1hdGgucmFuZG9tKCkgKiAodG9aIC0gZnJvbVopICsgZnJvbVo7XG5cbiAgcmV0dXJuIG5ldyBUSFJFRS5WZWN0b3IzKHgsIHksIHopO1xufTtcbiIsImltcG9ydCBTdGF0cyBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbGlicy9zdGF0cy5tb2R1bGUnXG5cbmNvbnN0IHN0YXRzID0gU3RhdHMoKVxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzdGF0cy5kb20pXG5cbmV4cG9ydCB7IHN0YXRzIH1cbiIsImV4cG9ydCBjb25zdCBvblJlc2l6ZSA9IChjYW1lcmEsIHJlbmRlcmVyKSA9PiB7XG4gIGNvbnN0IHJlc2l6ZXIgPSAoKSA9PiB7XG4gICAgY2FtZXJhLmFzcGVjdCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0XG4gICAgY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKVxuICAgIHJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodClcbiAgfVxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzaXplciwgZmFsc2UpXG59XG4iLCJ2YXIgU3RhdHMgPSBmdW5jdGlvbiAoKSB7XG5cblx0dmFyIG1vZGUgPSAwO1xuXG5cdHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuXHRjb250YWluZXIuc3R5bGUuY3NzVGV4dCA9ICdwb3NpdGlvbjpmaXhlZDt0b3A6MDtsZWZ0OjA7Y3Vyc29yOnBvaW50ZXI7b3BhY2l0eTowLjk7ei1pbmRleDoxMDAwMCc7XG5cdGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCAnY2xpY2snLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRzaG93UGFuZWwoICsrIG1vZGUgJSBjb250YWluZXIuY2hpbGRyZW4ubGVuZ3RoICk7XG5cblx0fSwgZmFsc2UgKTtcblxuXHQvL1xuXG5cdGZ1bmN0aW9uIGFkZFBhbmVsKCBwYW5lbCApIHtcblxuXHRcdGNvbnRhaW5lci5hcHBlbmRDaGlsZCggcGFuZWwuZG9tICk7XG5cdFx0cmV0dXJuIHBhbmVsO1xuXG5cdH1cblxuXHRmdW5jdGlvbiBzaG93UGFuZWwoIGlkICkge1xuXG5cdFx0Zm9yICggdmFyIGkgPSAwOyBpIDwgY29udGFpbmVyLmNoaWxkcmVuLmxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0Y29udGFpbmVyLmNoaWxkcmVuWyBpIF0uc3R5bGUuZGlzcGxheSA9IGkgPT09IGlkID8gJ2Jsb2NrJyA6ICdub25lJztcblxuXHRcdH1cblxuXHRcdG1vZGUgPSBpZDtcblxuXHR9XG5cblx0Ly9cblxuXHR2YXIgYmVnaW5UaW1lID0gKCBwZXJmb3JtYW5jZSB8fCBEYXRlICkubm93KCksIHByZXZUaW1lID0gYmVnaW5UaW1lLCBmcmFtZXMgPSAwO1xuXG5cdHZhciBmcHNQYW5lbCA9IGFkZFBhbmVsKCBuZXcgU3RhdHMuUGFuZWwoICdGUFMnLCAnIzBmZicsICcjMDAyJyApICk7XG5cdHZhciBtc1BhbmVsID0gYWRkUGFuZWwoIG5ldyBTdGF0cy5QYW5lbCggJ01TJywgJyMwZjAnLCAnIzAyMCcgKSApO1xuXG5cdGlmICggc2VsZi5wZXJmb3JtYW5jZSAmJiBzZWxmLnBlcmZvcm1hbmNlLm1lbW9yeSApIHtcblxuXHRcdHZhciBtZW1QYW5lbCA9IGFkZFBhbmVsKCBuZXcgU3RhdHMuUGFuZWwoICdNQicsICcjZjA4JywgJyMyMDEnICkgKTtcblxuXHR9XG5cblx0c2hvd1BhbmVsKCAwICk7XG5cblx0cmV0dXJuIHtcblxuXHRcdFJFVklTSU9OOiAxNixcblxuXHRcdGRvbTogY29udGFpbmVyLFxuXG5cdFx0YWRkUGFuZWw6IGFkZFBhbmVsLFxuXHRcdHNob3dQYW5lbDogc2hvd1BhbmVsLFxuXG5cdFx0YmVnaW46IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0YmVnaW5UaW1lID0gKCBwZXJmb3JtYW5jZSB8fCBEYXRlICkubm93KCk7XG5cblx0XHR9LFxuXG5cdFx0ZW5kOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdGZyYW1lcyArKztcblxuXHRcdFx0dmFyIHRpbWUgPSAoIHBlcmZvcm1hbmNlIHx8IERhdGUgKS5ub3coKTtcblxuXHRcdFx0bXNQYW5lbC51cGRhdGUoIHRpbWUgLSBiZWdpblRpbWUsIDIwMCApO1xuXG5cdFx0XHRpZiAoIHRpbWUgPj0gcHJldlRpbWUgKyAxMDAwICkge1xuXG5cdFx0XHRcdGZwc1BhbmVsLnVwZGF0ZSggKCBmcmFtZXMgKiAxMDAwICkgLyAoIHRpbWUgLSBwcmV2VGltZSApLCAxMDAgKTtcblxuXHRcdFx0XHRwcmV2VGltZSA9IHRpbWU7XG5cdFx0XHRcdGZyYW1lcyA9IDA7XG5cblx0XHRcdFx0aWYgKCBtZW1QYW5lbCApIHtcblxuXHRcdFx0XHRcdHZhciBtZW1vcnkgPSBwZXJmb3JtYW5jZS5tZW1vcnk7XG5cdFx0XHRcdFx0bWVtUGFuZWwudXBkYXRlKCBtZW1vcnkudXNlZEpTSGVhcFNpemUgLyAxMDQ4NTc2LCBtZW1vcnkuanNIZWFwU2l6ZUxpbWl0IC8gMTA0ODU3NiApO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdGltZTtcblxuXHRcdH0sXG5cblx0XHR1cGRhdGU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0YmVnaW5UaW1lID0gdGhpcy5lbmQoKTtcblxuXHRcdH0sXG5cblx0XHQvLyBCYWNrd2FyZHMgQ29tcGF0aWJpbGl0eVxuXG5cdFx0ZG9tRWxlbWVudDogY29udGFpbmVyLFxuXHRcdHNldE1vZGU6IHNob3dQYW5lbFxuXG5cdH07XG5cbn07XG5cblN0YXRzLlBhbmVsID0gZnVuY3Rpb24gKCBuYW1lLCBmZywgYmcgKSB7XG5cblx0dmFyIG1pbiA9IEluZmluaXR5LCBtYXggPSAwLCByb3VuZCA9IE1hdGgucm91bmQ7XG5cdHZhciBQUiA9IHJvdW5kKCB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxICk7XG5cblx0dmFyIFdJRFRIID0gODAgKiBQUiwgSEVJR0hUID0gNDggKiBQUixcblx0XHRURVhUX1ggPSAzICogUFIsIFRFWFRfWSA9IDIgKiBQUixcblx0XHRHUkFQSF9YID0gMyAqIFBSLCBHUkFQSF9ZID0gMTUgKiBQUixcblx0XHRHUkFQSF9XSURUSCA9IDc0ICogUFIsIEdSQVBIX0hFSUdIVCA9IDMwICogUFI7XG5cblx0dmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdjYW52YXMnICk7XG5cdGNhbnZhcy53aWR0aCA9IFdJRFRIO1xuXHRjYW52YXMuaGVpZ2h0ID0gSEVJR0hUO1xuXHRjYW52YXMuc3R5bGUuY3NzVGV4dCA9ICd3aWR0aDo4MHB4O2hlaWdodDo0OHB4JztcblxuXHR2YXIgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCAnMmQnICk7XG5cdGNvbnRleHQuZm9udCA9ICdib2xkICcgKyAoIDkgKiBQUiApICsgJ3B4IEhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmJztcblx0Y29udGV4dC50ZXh0QmFzZWxpbmUgPSAndG9wJztcblxuXHRjb250ZXh0LmZpbGxTdHlsZSA9IGJnO1xuXHRjb250ZXh0LmZpbGxSZWN0KCAwLCAwLCBXSURUSCwgSEVJR0hUICk7XG5cblx0Y29udGV4dC5maWxsU3R5bGUgPSBmZztcblx0Y29udGV4dC5maWxsVGV4dCggbmFtZSwgVEVYVF9YLCBURVhUX1kgKTtcblx0Y29udGV4dC5maWxsUmVjdCggR1JBUEhfWCwgR1JBUEhfWSwgR1JBUEhfV0lEVEgsIEdSQVBIX0hFSUdIVCApO1xuXG5cdGNvbnRleHQuZmlsbFN0eWxlID0gYmc7XG5cdGNvbnRleHQuZ2xvYmFsQWxwaGEgPSAwLjk7XG5cdGNvbnRleHQuZmlsbFJlY3QoIEdSQVBIX1gsIEdSQVBIX1ksIEdSQVBIX1dJRFRILCBHUkFQSF9IRUlHSFQgKTtcblxuXHRyZXR1cm4ge1xuXG5cdFx0ZG9tOiBjYW52YXMsXG5cblx0XHR1cGRhdGU6IGZ1bmN0aW9uICggdmFsdWUsIG1heFZhbHVlICkge1xuXG5cdFx0XHRtaW4gPSBNYXRoLm1pbiggbWluLCB2YWx1ZSApO1xuXHRcdFx0bWF4ID0gTWF0aC5tYXgoIG1heCwgdmFsdWUgKTtcblxuXHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSBiZztcblx0XHRcdGNvbnRleHQuZ2xvYmFsQWxwaGEgPSAxO1xuXHRcdFx0Y29udGV4dC5maWxsUmVjdCggMCwgMCwgV0lEVEgsIEdSQVBIX1kgKTtcblx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gZmc7XG5cdFx0XHRjb250ZXh0LmZpbGxUZXh0KCByb3VuZCggdmFsdWUgKSArICcgJyArIG5hbWUgKyAnICgnICsgcm91bmQoIG1pbiApICsgJy0nICsgcm91bmQoIG1heCApICsgJyknLCBURVhUX1gsIFRFWFRfWSApO1xuXG5cdFx0XHRjb250ZXh0LmRyYXdJbWFnZSggY2FudmFzLCBHUkFQSF9YICsgUFIsIEdSQVBIX1ksIEdSQVBIX1dJRFRIIC0gUFIsIEdSQVBIX0hFSUdIVCwgR1JBUEhfWCwgR1JBUEhfWSwgR1JBUEhfV0lEVEggLSBQUiwgR1JBUEhfSEVJR0hUICk7XG5cblx0XHRcdGNvbnRleHQuZmlsbFJlY3QoIEdSQVBIX1ggKyBHUkFQSF9XSURUSCAtIFBSLCBHUkFQSF9ZLCBQUiwgR1JBUEhfSEVJR0hUICk7XG5cblx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gYmc7XG5cdFx0XHRjb250ZXh0Lmdsb2JhbEFscGhhID0gMC45O1xuXHRcdFx0Y29udGV4dC5maWxsUmVjdCggR1JBUEhfWCArIEdSQVBIX1dJRFRIIC0gUFIsIEdSQVBIX1ksIFBSLCByb3VuZCggKCAxIC0gKCB2YWx1ZSAvIG1heFZhbHVlICkgKSAqIEdSQVBIX0hFSUdIVCApICk7XG5cblx0XHR9XG5cblx0fTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgU3RhdHM7XG4iLCJpbXBvcnQge1xuXHRHcm91cCxcblx0TWVzaCxcblx0QnVmZmVyQXR0cmlidXRlLFxuXHRCdWZmZXJHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7IG1lcmdlR3JvdXBzIH0gZnJvbSAnLi9CdWZmZXJHZW9tZXRyeVV0aWxzLmpzJztcblxuZnVuY3Rpb24gY3JlYXRlTWVzaGVzRnJvbUluc3RhbmNlZE1lc2goIGluc3RhbmNlZE1lc2ggKSB7XG5cblx0Y29uc3QgZ3JvdXAgPSBuZXcgR3JvdXAoKTtcblxuXHRjb25zdCBjb3VudCA9IGluc3RhbmNlZE1lc2guY291bnQ7XG5cdGNvbnN0IGdlb21ldHJ5ID0gaW5zdGFuY2VkTWVzaC5nZW9tZXRyeTtcblx0Y29uc3QgbWF0ZXJpYWwgPSBpbnN0YW5jZWRNZXNoLm1hdGVyaWFsO1xuXG5cdGZvciAoIGxldCBpID0gMDsgaSA8IGNvdW50OyBpICsrICkge1xuXG5cdFx0Y29uc3QgbWVzaCA9IG5ldyBNZXNoKCBnZW9tZXRyeSwgbWF0ZXJpYWwgKTtcblxuXHRcdGluc3RhbmNlZE1lc2guZ2V0TWF0cml4QXQoIGksIG1lc2gubWF0cml4ICk7XG5cdFx0bWVzaC5tYXRyaXguZGVjb21wb3NlKCBtZXNoLnBvc2l0aW9uLCBtZXNoLnF1YXRlcm5pb24sIG1lc2guc2NhbGUgKTtcblxuXHRcdGdyb3VwLmFkZCggbWVzaCApO1xuXG5cdH1cblxuXHRncm91cC5jb3B5KCBpbnN0YW5jZWRNZXNoICk7XG5cdGdyb3VwLnVwZGF0ZU1hdHJpeFdvcmxkKCk7IC8vIGVuc3VyZSBjb3JyZWN0IHdvcmxkIG1hdHJpY2VzIG9mIG1lc2hlc1xuXG5cdHJldHVybiBncm91cDtcblxufVxuXG5mdW5jdGlvbiBjcmVhdGVNZXNoZXNGcm9tTXVsdGlNYXRlcmlhbE1lc2goIG1lc2ggKSB7XG5cblx0aWYgKCBBcnJheS5pc0FycmF5KCBtZXNoLm1hdGVyaWFsICkgPT09IGZhbHNlICkge1xuXG5cdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuU2NlbmVVdGlscy5jcmVhdGVNZXNoZXNGcm9tTXVsdGlNYXRlcmlhbE1lc2goKTogVGhlIGdpdmVuIG1lc2ggaGFzIG5vIG11bHRpcGxlIG1hdGVyaWFscy4nICk7XG5cdFx0cmV0dXJuIG1lc2g7XG5cblx0fVxuXG5cdGNvbnN0IG9iamVjdCA9IG5ldyBHcm91cCgpO1xuXHRvYmplY3QuY29weSggbWVzaCApO1xuXG5cdC8vIG1lcmdlIGdyb3VwcyAod2hpY2ggYXV0b21hdGljYWxseSBzb3J0cyB0aGVtKVxuXG5cdGNvbnN0IGdlb21ldHJ5ID0gbWVyZ2VHcm91cHMoIG1lc2guZ2VvbWV0cnkgKTtcblxuXHRjb25zdCBpbmRleCA9IGdlb21ldHJ5LmluZGV4O1xuXHRjb25zdCBncm91cHMgPSBnZW9tZXRyeS5ncm91cHM7XG5cdGNvbnN0IGF0dHJpYnV0ZU5hbWVzID0gT2JqZWN0LmtleXMoIGdlb21ldHJ5LmF0dHJpYnV0ZXMgKTtcblxuXHQvLyBjcmVhdGUgYSBtZXNoIGZvciBlYWNoIGdyb3VwIGJ5IGV4dHJhY3RpbmcgdGhlIGJ1ZmZlciBkYXRhIGludG8gYSBuZXcgZ2VvbWV0cnlcblxuXHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBncm91cHMubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0Y29uc3QgZ3JvdXAgPSBncm91cHNbIGkgXTtcblxuXHRcdGNvbnN0IHN0YXJ0ID0gZ3JvdXAuc3RhcnQ7XG5cdFx0Y29uc3QgZW5kID0gc3RhcnQgKyBncm91cC5jb3VudDtcblxuXHRcdGNvbnN0IG5ld0dlb21ldHJ5ID0gbmV3IEJ1ZmZlckdlb21ldHJ5KCk7XG5cdFx0Y29uc3QgbmV3TWF0ZXJpYWwgPSBtZXNoLm1hdGVyaWFsWyBncm91cC5tYXRlcmlhbEluZGV4IF07XG5cblx0XHQvLyBwcm9jZXNzIGFsbCBidWZmZXIgYXR0cmlidXRlc1xuXG5cdFx0Zm9yICggbGV0IGogPSAwOyBqIDwgYXR0cmlidXRlTmFtZXMubGVuZ3RoOyBqICsrICkge1xuXG5cdFx0XHRjb25zdCBuYW1lID0gYXR0cmlidXRlTmFtZXNbIGogXTtcblx0XHRcdGNvbnN0IGF0dHJpYnV0ZSA9IGdlb21ldHJ5LmF0dHJpYnV0ZXNbIG5hbWUgXTtcblx0XHRcdGNvbnN0IGl0ZW1TaXplID0gYXR0cmlidXRlLml0ZW1TaXplO1xuXG5cdFx0XHRjb25zdCBuZXdMZW5ndGggPSBncm91cC5jb3VudCAqIGl0ZW1TaXplO1xuXHRcdFx0Y29uc3QgdHlwZSA9IGF0dHJpYnV0ZS5hcnJheS5jb25zdHJ1Y3RvcjtcblxuXHRcdFx0Y29uc3QgbmV3QXJyYXkgPSBuZXcgdHlwZSggbmV3TGVuZ3RoICk7XG5cdFx0XHRjb25zdCBuZXdBdHRyaWJ1dGUgPSBuZXcgQnVmZmVyQXR0cmlidXRlKCBuZXdBcnJheSwgaXRlbVNpemUgKTtcblxuXHRcdFx0Zm9yICggbGV0IGsgPSBzdGFydCwgbiA9IDA7IGsgPCBlbmQ7IGsgKyssIG4gKysgKSB7XG5cblx0XHRcdFx0Y29uc3QgaW5kID0gaW5kZXguZ2V0WCggayApO1xuXG5cdFx0XHRcdGlmICggaXRlbVNpemUgPj0gMSApIG5ld0F0dHJpYnV0ZS5zZXRYKCBuLCBhdHRyaWJ1dGUuZ2V0WCggaW5kICkgKTtcblx0XHRcdFx0aWYgKCBpdGVtU2l6ZSA+PSAyICkgbmV3QXR0cmlidXRlLnNldFkoIG4sIGF0dHJpYnV0ZS5nZXRZKCBpbmQgKSApO1xuXHRcdFx0XHRpZiAoIGl0ZW1TaXplID49IDMgKSBuZXdBdHRyaWJ1dGUuc2V0WiggbiwgYXR0cmlidXRlLmdldFooIGluZCApICk7XG5cdFx0XHRcdGlmICggaXRlbVNpemUgPj0gNCApIG5ld0F0dHJpYnV0ZS5zZXRXKCBuLCBhdHRyaWJ1dGUuZ2V0VyggaW5kICkgKTtcblxuXHRcdFx0fVxuXG5cblx0XHRcdG5ld0dlb21ldHJ5LnNldEF0dHJpYnV0ZSggbmFtZSwgbmV3QXR0cmlidXRlICk7XG5cblx0XHR9XG5cblx0XHRjb25zdCBuZXdNZXNoID0gbmV3IE1lc2goIG5ld0dlb21ldHJ5LCBuZXdNYXRlcmlhbCApO1xuXHRcdG9iamVjdC5hZGQoIG5ld01lc2ggKTtcblxuXHR9XG5cblx0cmV0dXJuIG9iamVjdDtcblxufVxuXG5mdW5jdGlvbiBjcmVhdGVNdWx0aU1hdGVyaWFsT2JqZWN0KCBnZW9tZXRyeSwgbWF0ZXJpYWxzICkge1xuXG5cdGNvbnN0IGdyb3VwID0gbmV3IEdyb3VwKCk7XG5cblx0Zm9yICggbGV0IGkgPSAwLCBsID0gbWF0ZXJpYWxzLmxlbmd0aDsgaSA8IGw7IGkgKysgKSB7XG5cblx0XHRncm91cC5hZGQoIG5ldyBNZXNoKCBnZW9tZXRyeSwgbWF0ZXJpYWxzWyBpIF0gKSApO1xuXG5cdH1cblxuXHRyZXR1cm4gZ3JvdXA7XG5cbn1cblxuZnVuY3Rpb24gZGV0YWNoKCBjaGlsZCwgcGFyZW50LCBzY2VuZSApIHtcblxuXHRjb25zb2xlLndhcm4oICdUSFJFRS5TY2VuZVV0aWxzOiBkZXRhY2goKSBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2Ugc2NlbmUuYXR0YWNoKCBjaGlsZCApIGluc3RlYWQuJyApO1xuXG5cdHNjZW5lLmF0dGFjaCggY2hpbGQgKTtcblxufVxuXG5mdW5jdGlvbiBhdHRhY2goIGNoaWxkLCBzY2VuZSwgcGFyZW50ICkge1xuXG5cdGNvbnNvbGUud2FybiggJ1RIUkVFLlNjZW5lVXRpbHM6IGF0dGFjaCgpIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFVzZSBwYXJlbnQuYXR0YWNoKCBjaGlsZCApIGluc3RlYWQuJyApO1xuXG5cdHBhcmVudC5hdHRhY2goIGNoaWxkICk7XG5cbn1cblxuXG5cbmV4cG9ydCB7XG5cdGNyZWF0ZU1lc2hlc0Zyb21JbnN0YW5jZWRNZXNoLFxuXHRjcmVhdGVNZXNoZXNGcm9tTXVsdGlNYXRlcmlhbE1lc2gsXG5cdGNyZWF0ZU11bHRpTWF0ZXJpYWxPYmplY3QsXG5cdGRldGFjaCxcblx0YXR0YWNoLFxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiYmFzaWMtc2NlbmVcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rbHRqc19mb3VydGhcIl0gPSBzZWxmW1wid2VicGFja0NodW5rbHRqc19mb3VydGhcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2J1aWxkX3RocmVlX21vZHVsZV9qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX2NvbnRyb2xzX09yYml0Q29udHJvbHNfanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX2xpbC1ndWlfZGlzdF9saWwtZ3VpX2VzbV9qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX3V0aWxzX0J1ZmZlckdlb21ldHJ5VXRpbHNfanNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItMi9iYXNpYy1zY2VuZS5qc1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
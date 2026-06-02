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

/***/ "./samples/chapters/chapter-2/mesh-properties.js"
/*!*******************************************************!*\
  !*** ./samples/chapters/chapter-2/mesh-properties.js ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _bootstrap_bootstrap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../bootstrap/bootstrap.js */ "./samples/bootstrap/bootstrap.js");
/* harmony import */ var _bootstrap_floor_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../bootstrap/floor.js */ "./samples/bootstrap/floor.js");
/* harmony import */ var _controls_renderer_control_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../controls/renderer-control.js */ "./samples/controls/renderer-control.js");
/* harmony import */ var _controls_helpers_control_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../controls/helpers-control.js */ "./samples/controls/helpers-control.js");
/* harmony import */ var _controls_scene_controls__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../controls/scene-controls */ "./samples/controls/scene-controls.js");
/* harmony import */ var lil_gui__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lil-gui */ "./node_modules/lil-gui/dist/lil-gui.esm.js");
/* harmony import */ var _util_stats__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../util/stats */ "./samples/util/stats.js");
// TODO: - reuse most of the stuff from chapter 1 setup, and from the previous version of the book.
//       - rewrite using the new setup.

// explore all the scene options availabe.
// add the scene control










const props = { backgroundColor: 0xffffff, fogColor: 0xffffff }
const gui = new lil_gui__WEBPACK_IMPORTED_MODULE_6__["default"]()

// TODO: Move this to a shared part?
const addMeshProperties = (mesh) => {
  const props = {
    scaleX: mesh.scale.x,
    scaleY: mesh.scale.y,
    scaleZ: mesh.scale.z,
    rotationX: mesh.rotation.x,
    rotationY: mesh.rotation.y,
    rotationZ: mesh.rotation.z,
    positionX: mesh.position.x,
    positionY: mesh.position.y,
    positionZ: mesh.position.z,
    translateX: 0,
    translateY: 0,
    translateZ: 0,
    translate: () => {
      mesh.translateX(props.translateX)
      mesh.translateY(props.translateY)
      mesh.translateZ(props.translateZ)
      props.positionX = mesh.position.x
      props.positionY = mesh.position.y
      props.positionZ = mesh.position.z
    },
    lookAtX: 0,
    lookAtY: 0,
    lookAtZ: 0,
    lookAt: () => {
      mesh.lookAt(props.lookAtX, props.lookAtY, props.lookAtZ)
    },
    visible: mesh.visible,
    castShadow: mesh.castShadow,
    rotateOnWorldAxisX: () => {
      mesh.rotateOnWorldAxis(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(1, 0, 0), Math.PI / 4)
    },
    rotateOnWorldAxisY: () => {
      mesh.rotateOnWorldAxis(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 1, 0), Math.PI / 4)
    },
    rotateOnWorldAxisZ: () => {
      mesh.rotateOnWorldAxis(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, 1), Math.PI / 4)
    }
  }

  const meshFolder = gui.addFolder('Mesh')
  meshFolder.add(props, 'scaleX', 0, 5, 0.1)
  meshFolder.add(props, 'scaleY', 0, 5, 0.1)
  meshFolder.add(props, 'scaleZ', 0, 5, 0.1)
  meshFolder.add(props, 'rotationX', -Math.PI, Math.PI, 0.1)
  meshFolder.add(props, 'rotationY', -Math.PI, Math.PI, 0.1)
  meshFolder.add(props, 'rotationZ', -Math.PI, Math.PI, 0.1)
  meshFolder.add(props, 'positionX', -3, 3, 0.1).listen()
  meshFolder.add(props, 'positionY', -3, 3, 0.1).listen()
  meshFolder.add(props, 'positionZ', -3, 3, 0.1).listen()
  meshFolder.add(props, 'translateX', -3, 3, 0.1)
  meshFolder.add(props, 'translateY', -3, 3, 0.1)
  meshFolder.add(props, 'translateZ', -3, 3, 0.1)
  meshFolder.add(props, 'translate')
  meshFolder.add(props, 'lookAtX', -3, 3, 0.1)
  meshFolder.add(props, 'lookAtY', -3, 3, 0.1)
  meshFolder.add(props, 'lookAtZ', -3, 3, 0.1)
  meshFolder.add(props, 'lookAt')
  meshFolder.add(props, 'visible')
  meshFolder.add(props, 'castShadow')
  // TODO, we could add more here, or just show the axis.
  //       or just create a simple example with a parent object
  //       where we show the three different axis.
  // Also determine here if Three.js really uses object space as parent
  // https://javascript.tutorialink.com/rotate-object-on-specific-axis-anywhere-in-three-js-including-outside-of-mesh/
  meshFolder.add(props, 'rotateOnWorldAxisX')
  meshFolder.add(props, 'rotateOnWorldAxisY')
  meshFolder.add(props, 'rotateOnWorldAxisZ')
  meshFolder.onChange(() => {
    mesh.scale.set(props.scaleX, props.scaleY, props.scaleZ)
    mesh.rotation.set(props.rotationX, props.rotationY, props.rotationZ)
    mesh.position.set(props.positionX, props.positionY, props.positionZ)
    mesh.visible = props.visible
    mesh.castShadow = props.castShadow
  })
}

;(0,_bootstrap_bootstrap_js__WEBPACK_IMPORTED_MODULE_1__.initScene)(props)(({ scene, camera, renderer, orbitControls }) => {
  camera.position.set(-7, 2, 5)
  orbitControls.update()

  ;(0,_bootstrap_floor_js__WEBPACK_IMPORTED_MODULE_2__.floatingFloor)(scene, 10)

  const geom = new three__WEBPACK_IMPORTED_MODULE_0__.BoxGeometry(1, 2, 3)
  const meshMat = new three__WEBPACK_IMPORTED_MODULE_0__.MeshStandardMaterial({
    color: 0x00ff88,
    roughness: 0.1
  })
  const mesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(geom, meshMat)
  mesh.castShadow = true
  scene.add(mesh)

  // to explain object space. Better I think if we create a new
  // example for this.
  // mesh.add(new THREE.AxesHelper(10));
  // scene.add(new THREE.AxesHelper(10));

  function animate() {
    // lazy way, we just readd the complete object.
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    _util_stats__WEBPACK_IMPORTED_MODULE_7__.stats.update()
    orbitControls.update()
  }
  animate()

  ;(0,_controls_renderer_control_js__WEBPACK_IMPORTED_MODULE_3__.intializeRendererControls)(gui, renderer)
  ;(0,_controls_helpers_control_js__WEBPACK_IMPORTED_MODULE_4__.initializeHelperControls)(gui, scene)
  ;(0,_controls_scene_controls__WEBPACK_IMPORTED_MODULE_5__.initializeSceneControls)(gui, scene)

  addMeshProperties(mesh)
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
/******/ 			"mesh-properties": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js"], () => (__webpack_require__("./samples/chapters/chapter-2/mesh-properties.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUM7Ozs7Ozs7VUN0S3JCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7Ozs7V0MvQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSwrQkFBK0Isd0NBQXdDO1dBQ3ZFO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUJBQWlCLHFCQUFxQjtXQUN0QztXQUNBO1dBQ0Esa0JBQWtCLHFCQUFxQjtXQUN2QztXQUNBO1dBQ0EsS0FBSztXQUNMO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFOzs7OztXQzNCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdELEU7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBLDRHOzs7OztVRWhEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2Jvb3RzdHJhcC9ib290c3RyYXAuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2Jvb3RzdHJhcC9mbG9vci5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvYm9vdHN0cmFwL2xpZ2h0aW5nLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTIvbWVzaC1wcm9wZXJ0aWVzLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jb250cm9sbGVyL29yYml0LWNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NvbnRyb2xzL2hlbHBlcnMtY29udHJvbC5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY29udHJvbHMvcmVuZGVyZXItY29udHJvbC5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY29udHJvbHMvc2NlbmUtY29udHJvbHMuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2hlbHBlcnMvaGVscGVycy5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvdXRpbC9zdGF0cy5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvdXRpbC91cGRhdGUtb24tcmVzaXplLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vbm9kZV9tb2R1bGVzL3RocmVlL2V4YW1wbGVzL2pzbS9saWJzL3N0YXRzLm1vZHVsZS5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuaW1wb3J0IHsgaW5pdE9yYml0Q29udHJvbHMgfSBmcm9tICcuLi9jb250cm9sbGVyL29yYml0LWNvbnRyb2xsZXInXG5pbXBvcnQgeyBpbml0TGlnaHRpbmcgfSBmcm9tICcuL2xpZ2h0aW5nJ1xuaW1wb3J0IHsgb25SZXNpemUgfSBmcm9tICcuLi91dGlsL3VwZGF0ZS1vbi1yZXNpemUnXG5cbmV4cG9ydCBjb25zdCBpbml0U2NlbmUgPSAoeyBiYWNrZ3JvdW5kQ29sb3IsIGZvZ0NvbG9yLCBkaXNhYmxlU2hhZG93cywgZGlzYWJsZUxpZ2h0cywgZGlzYWJsZURlZmF1bHRDb250cm9scyB9KSA9PiB7XG4gIGNvbnN0IGluaXQgPSAoZm4pID0+IHtcbiAgICAvLyBiYXNpYyBzY2VuZSBzZXR1cFxuICAgIGNvbnN0IHNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKClcbiAgICBpZiAoYmFja2dyb3VuZENvbG9yKSB7XG4gICAgICBzY2VuZS5iYWNrZ3JvdW5kQ29sb3IgPSBiYWNrZ3JvdW5kQ29sb3JcbiAgICB9XG5cbiAgICBpZiAoZm9nQ29sb3IpIHtcbiAgICAgIHNjZW5lLmZvZyA9IG5ldyBUSFJFRS5Gb2coZm9nQ29sb3IsIDAuMDAyNSwgNTApXG4gICAgfVxuXG4gICAgLy8gc2V0dXAgY2FtZXJhIGFuZCBiYXNpYyByZW5kZXJlclxuICAgIGNvbnN0IGNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg3NSwgd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQsIDAuMSwgMTAwMClcbiAgICBjb25zdCByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHsgYW50aWFsaWFzOiB0cnVlIH0pXG4gICAgcmVuZGVyZXIub3V0cHV0RW5jb2RpbmcgPSBUSFJFRS5zUkdCRW5jb2RpbmdcbiAgICByZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IHRydWVcbiAgICByZW5kZXJlci5zaGFkb3dNYXAudHlwZSA9IFRIUkVFLlZTTVNoYWRvd01hcFxuICAgIHJlbmRlcmVyLnNldENsZWFyQ29sb3IoYmFja2dyb3VuZENvbG9yKVxuXG4gICAgb25SZXNpemUoY2FtZXJhLCByZW5kZXJlcilcbiAgICByZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci5kb21FbGVtZW50KVxuXG4gICAgLy8gaW5pdGlhbGl6ZSBvcmJpdCBjb250cm9sc1xuICAgIGxldCBvcmJpdENvbnRyb2xzXG4gICAgaWYgKCFkaXNhYmxlRGVmYXVsdENvbnRyb2xzKSB7XG4gICAgICBvcmJpdENvbnRyb2xzID0gaW5pdE9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlcilcbiAgICB9XG5cbiAgICAvLyBhZGQgc29tZSBiYXNpYyBsaWdodGluZyB0byB0aGUgc2NlbmVcbiAgICBpZiAoIWRpc2FibGVMaWdodHMgPz8gZmFsc2UpIHtcbiAgICAgIGluaXRMaWdodGluZyhzY2VuZSwgeyBkaXNhYmxlU2hhZG93cyB9KVxuICAgIH1cblxuICAgIGZuKHsgc2NlbmUsIGNhbWVyYSwgcmVuZGVyZXIsIG9yYml0Q29udHJvbHMgfSlcbiAgfVxuXG4gIHJldHVybiBpbml0XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcblxuZXhwb3J0IGNvbnN0IGZvcmV2ZXJQbGFuZSA9IChzY2VuZSkgPT4ge1xuICBjb25zdCBnZW8gPSBuZXcgVEhSRUUuUGxhbmVCdWZmZXJHZW9tZXRyeSgxMDAwMCwgMTAwMDApXG4gIGNvbnN0IG1hdCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHtcbiAgICBjb2xvcjogMHhmZmZmZmZcbiAgfSlcbiAgY29uc3QgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlbywgbWF0KVxuICBtZXNoLnBvc2l0aW9uLnNldCgwLCAtMiwgMClcbiAgbWVzaC5yb3RhdGlvbi5zZXQoTWF0aC5QSSAvIC0yLCAwLCAwKVxuICBtZXNoLnJlY2VpdmVTaGFkb3cgPSB0cnVlXG4gIG1lc2gubmFtZSA9ICdmb3JldmVyLWZsb29yJ1xuICBzY2VuZS5hZGQobWVzaClcblxuICByZXR1cm4gbWVzaFxufVxuXG5leHBvcnQgY29uc3QgZmxvYXRpbmdGbG9vciA9IChzY2VuZSwgc2l6ZSkgPT4ge1xuICBjb25zdCBzID0gc2l6ZSA/IHNpemUgOiA2XG4gIGNvbnN0IGdlbyA9IG5ldyBUSFJFRS5Cb3hCdWZmZXJHZW9tZXRyeShzLCAwLjI1LCBzLCAxMCwgMTAsIDEwKVxuICBjb25zdCBtYXQgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoe1xuICAgIGNvbG9yOiAweGRkZGRkZFxuICB9KVxuICBjb25zdCBtZXNoID0gbmV3IFRIUkVFLk1lc2goZ2VvLCBtYXQpXG4gIG1lc2gucG9zaXRpb24uc2V0KDAsIC0yLCAtMSlcbiAgbWVzaC5yZWNlaXZlU2hhZG93ID0gdHJ1ZVxuICBtZXNoLm5hbWUgPSAnZmxvYXRpbmctZmxvb3InXG4gIHNjZW5lLmFkZChtZXNoKVxuXG4gIHJldHVybiBtZXNoXG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcblxuZXhwb3J0IGNvbnN0IGluaXRMaWdodGluZyA9IChzY2VuZSwgeyBkaXNhYmxlU2hhZG93cyB9KSA9PiB7XG4gIC8vIGh0dHBzOi8vdGhyZWVqcy5vcmcvZXhhbXBsZXMvP3E9c2hhZG8jd2ViZ2xfc2hhZG93bWFwX3ZzbVxuICBzY2VuZS5hZGQobmV3IFRIUkVFLkFtYmllbnRMaWdodCgweDY2NjY2NikpXG5cbiAgLy8gY29uc3QgZGlyTGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGFhYWFhYSlcbiAgY29uc3QgZGlyTGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGFhYWFhYSlcbiAgZGlyTGlnaHQucG9zaXRpb24uc2V0KDUsIDEyLCA4KVxuICBkaXJMaWdodC5jYXN0U2hhZG93ID0gIWRpc2FibGVTaGFkb3dzID8gdHJ1ZSA6IGZhbHNlXG4gIGRpckxpZ2h0LmludGVuc2l0eSA9IDFcbiAgZGlyTGlnaHQuc2hhZG93LmNhbWVyYS5uZWFyID0gMC4xXG4gIGRpckxpZ2h0LnNoYWRvdy5jYW1lcmEuZmFyID0gMjAwXG4gIGRpckxpZ2h0LnNoYWRvdy5jYW1lcmEucmlnaHQgPSAxMFxuICBkaXJMaWdodC5zaGFkb3cuY2FtZXJhLmxlZnQgPSAtMTBcbiAgZGlyTGlnaHQuc2hhZG93LmNhbWVyYS50b3AgPSAxMFxuICBkaXJMaWdodC5zaGFkb3cuY2FtZXJhLmJvdHRvbSA9IC0xMFxuICBkaXJMaWdodC5zaGFkb3cubWFwU2l6ZS53aWR0aCA9IDIwNDhcbiAgZGlyTGlnaHQuc2hhZG93Lm1hcFNpemUuaGVpZ2h0ID0gMjA0OFxuICBkaXJMaWdodC5zaGFkb3cucmFkaXVzID0gNFxuICBkaXJMaWdodC5zaGFkb3cuYmlhcyA9IC0wLjAwMDA1XG5cbiAgc2NlbmUuYWRkKGRpckxpZ2h0KVxufVxuIiwiLy8gVE9ETzogLSByZXVzZSBtb3N0IG9mIHRoZSBzdHVmZiBmcm9tIGNoYXB0ZXIgMSBzZXR1cCwgYW5kIGZyb20gdGhlIHByZXZpb3VzIHZlcnNpb24gb2YgdGhlIGJvb2suXG4vLyAgICAgICAtIHJld3JpdGUgdXNpbmcgdGhlIG5ldyBzZXR1cC5cblxuLy8gZXhwbG9yZSBhbGwgdGhlIHNjZW5lIG9wdGlvbnMgYXZhaWxhYmUuXG4vLyBhZGQgdGhlIHNjZW5lIGNvbnRyb2xcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuaW1wb3J0IHsgaW5pdFNjZW5lIH0gZnJvbSAnLi4vLi4vYm9vdHN0cmFwL2Jvb3RzdHJhcC5qcydcbmltcG9ydCB7IGZsb2F0aW5nRmxvb3IsIGZvcmV2ZXJQbGFuZSB9IGZyb20gJy4uLy4uL2Jvb3RzdHJhcC9mbG9vci5qcydcbmltcG9ydCB7IGludGlhbGl6ZVJlbmRlcmVyQ29udHJvbHMgfSBmcm9tICcuLi8uLi9jb250cm9scy9yZW5kZXJlci1jb250cm9sLmpzJ1xuaW1wb3J0IHsgaW5pdGlhbGl6ZUhlbHBlckNvbnRyb2xzIH0gZnJvbSAnLi4vLi4vY29udHJvbHMvaGVscGVycy1jb250cm9sLmpzJ1xuaW1wb3J0IHsgaW5pdGlhbGl6ZVNjZW5lQ29udHJvbHMgfSBmcm9tICcuLi8uLi9jb250cm9scy9zY2VuZS1jb250cm9scydcbmltcG9ydCBHVUkgZnJvbSAnbGlsLWd1aSdcbmltcG9ydCB7IHN0YXRzIH0gZnJvbSAnLi4vLi4vdXRpbC9zdGF0cydcbmltcG9ydCB7IE1lc2hQaG9uZ01hdGVyaWFsIH0gZnJvbSAndGhyZWUnXG5cbmNvbnN0IHByb3BzID0geyBiYWNrZ3JvdW5kQ29sb3I6IDB4ZmZmZmZmLCBmb2dDb2xvcjogMHhmZmZmZmYgfVxuY29uc3QgZ3VpID0gbmV3IEdVSSgpXG5cbi8vIFRPRE86IE1vdmUgdGhpcyB0byBhIHNoYXJlZCBwYXJ0P1xuY29uc3QgYWRkTWVzaFByb3BlcnRpZXMgPSAobWVzaCkgPT4ge1xuICBjb25zdCBwcm9wcyA9IHtcbiAgICBzY2FsZVg6IG1lc2guc2NhbGUueCxcbiAgICBzY2FsZVk6IG1lc2guc2NhbGUueSxcbiAgICBzY2FsZVo6IG1lc2guc2NhbGUueixcbiAgICByb3RhdGlvblg6IG1lc2gucm90YXRpb24ueCxcbiAgICByb3RhdGlvblk6IG1lc2gucm90YXRpb24ueSxcbiAgICByb3RhdGlvblo6IG1lc2gucm90YXRpb24ueixcbiAgICBwb3NpdGlvblg6IG1lc2gucG9zaXRpb24ueCxcbiAgICBwb3NpdGlvblk6IG1lc2gucG9zaXRpb24ueSxcbiAgICBwb3NpdGlvblo6IG1lc2gucG9zaXRpb24ueixcbiAgICB0cmFuc2xhdGVYOiAwLFxuICAgIHRyYW5zbGF0ZVk6IDAsXG4gICAgdHJhbnNsYXRlWjogMCxcbiAgICB0cmFuc2xhdGU6ICgpID0+IHtcbiAgICAgIG1lc2gudHJhbnNsYXRlWChwcm9wcy50cmFuc2xhdGVYKVxuICAgICAgbWVzaC50cmFuc2xhdGVZKHByb3BzLnRyYW5zbGF0ZVkpXG4gICAgICBtZXNoLnRyYW5zbGF0ZVoocHJvcHMudHJhbnNsYXRlWilcbiAgICAgIHByb3BzLnBvc2l0aW9uWCA9IG1lc2gucG9zaXRpb24ueFxuICAgICAgcHJvcHMucG9zaXRpb25ZID0gbWVzaC5wb3NpdGlvbi55XG4gICAgICBwcm9wcy5wb3NpdGlvblogPSBtZXNoLnBvc2l0aW9uLnpcbiAgICB9LFxuICAgIGxvb2tBdFg6IDAsXG4gICAgbG9va0F0WTogMCxcbiAgICBsb29rQXRaOiAwLFxuICAgIGxvb2tBdDogKCkgPT4ge1xuICAgICAgbWVzaC5sb29rQXQocHJvcHMubG9va0F0WCwgcHJvcHMubG9va0F0WSwgcHJvcHMubG9va0F0WilcbiAgICB9LFxuICAgIHZpc2libGU6IG1lc2gudmlzaWJsZSxcbiAgICBjYXN0U2hhZG93OiBtZXNoLmNhc3RTaGFkb3csXG4gICAgcm90YXRlT25Xb3JsZEF4aXNYOiAoKSA9PiB7XG4gICAgICBtZXNoLnJvdGF0ZU9uV29ybGRBeGlzKG5ldyBUSFJFRS5WZWN0b3IzKDEsIDAsIDApLCBNYXRoLlBJIC8gNClcbiAgICB9LFxuICAgIHJvdGF0ZU9uV29ybGRBeGlzWTogKCkgPT4ge1xuICAgICAgbWVzaC5yb3RhdGVPbldvcmxkQXhpcyhuZXcgVEhSRUUuVmVjdG9yMygwLCAxLCAwKSwgTWF0aC5QSSAvIDQpXG4gICAgfSxcbiAgICByb3RhdGVPbldvcmxkQXhpc1o6ICgpID0+IHtcbiAgICAgIG1lc2gucm90YXRlT25Xb3JsZEF4aXMobmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMSksIE1hdGguUEkgLyA0KVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG1lc2hGb2xkZXIgPSBndWkuYWRkRm9sZGVyKCdNZXNoJylcbiAgbWVzaEZvbGRlci5hZGQocHJvcHMsICdzY2FsZVgnLCAwLCA1LCAwLjEpXG4gIG1lc2hGb2xkZXIuYWRkKHByb3BzLCAnc2NhbGVZJywgMCwgNSwgMC4xKVxuICBtZXNoRm9sZGVyLmFkZChwcm9wcywgJ3NjYWxlWicsIDAsIDUsIDAuMSlcbiAgbWVzaEZvbGRlci5hZGQocHJvcHMsICdyb3RhdGlvblgnLCAtTWF0aC5QSSwgTWF0aC5QSSwgMC4xKVxuICBtZXNoRm9sZGVyLmFkZChwcm9wcywgJ3JvdGF0aW9uWScsIC1NYXRoLlBJLCBNYXRoLlBJLCAwLjEpXG4gIG1lc2hGb2xkZXIuYWRkKHByb3BzLCAncm90YXRpb25aJywgLU1hdGguUEksIE1hdGguUEksIDAuMSlcbiAgbWVzaEZvbGRlci5hZGQocHJvcHMsICdwb3NpdGlvblgnLCAtMywgMywgMC4xKS5saXN0ZW4oKVxuICBtZXNoRm9sZGVyLmFkZChwcm9wcywgJ3Bvc2l0aW9uWScsIC0zLCAzLCAwLjEpLmxpc3RlbigpXG4gIG1lc2hGb2xkZXIuYWRkKHByb3BzLCAncG9zaXRpb25aJywgLTMsIDMsIDAuMSkubGlzdGVuKClcbiAgbWVzaEZvbGRlci5hZGQocHJvcHMsICd0cmFuc2xhdGVYJywgLTMsIDMsIDAuMSlcbiAgbWVzaEZvbGRlci5hZGQocHJvcHMsICd0cmFuc2xhdGVZJywgLTMsIDMsIDAuMSlcbiAgbWVzaEZvbGRlci5hZGQocHJvcHMsICd0cmFuc2xhdGVaJywgLTMsIDMsIDAuMSlcbiAgbWVzaEZvbGRlci5hZGQocHJvcHMsICd0cmFuc2xhdGUnKVxuICBtZXNoRm9sZGVyLmFkZChwcm9wcywgJ2xvb2tBdFgnLCAtMywgMywgMC4xKVxuICBtZXNoRm9sZGVyLmFkZChwcm9wcywgJ2xvb2tBdFknLCAtMywgMywgMC4xKVxuICBtZXNoRm9sZGVyLmFkZChwcm9wcywgJ2xvb2tBdFonLCAtMywgMywgMC4xKVxuICBtZXNoRm9sZGVyLmFkZChwcm9wcywgJ2xvb2tBdCcpXG4gIG1lc2hGb2xkZXIuYWRkKHByb3BzLCAndmlzaWJsZScpXG4gIG1lc2hGb2xkZXIuYWRkKHByb3BzLCAnY2FzdFNoYWRvdycpXG4gIC8vIFRPRE8sIHdlIGNvdWxkIGFkZCBtb3JlIGhlcmUsIG9yIGp1c3Qgc2hvdyB0aGUgYXhpcy5cbiAgLy8gICAgICAgb3IganVzdCBjcmVhdGUgYSBzaW1wbGUgZXhhbXBsZSB3aXRoIGEgcGFyZW50IG9iamVjdFxuICAvLyAgICAgICB3aGVyZSB3ZSBzaG93IHRoZSB0aHJlZSBkaWZmZXJlbnQgYXhpcy5cbiAgLy8gQWxzbyBkZXRlcm1pbmUgaGVyZSBpZiBUaHJlZS5qcyByZWFsbHkgdXNlcyBvYmplY3Qgc3BhY2UgYXMgcGFyZW50XG4gIC8vIGh0dHBzOi8vamF2YXNjcmlwdC50dXRvcmlhbGluay5jb20vcm90YXRlLW9iamVjdC1vbi1zcGVjaWZpYy1heGlzLWFueXdoZXJlLWluLXRocmVlLWpzLWluY2x1ZGluZy1vdXRzaWRlLW9mLW1lc2gvXG4gIG1lc2hGb2xkZXIuYWRkKHByb3BzLCAncm90YXRlT25Xb3JsZEF4aXNYJylcbiAgbWVzaEZvbGRlci5hZGQocHJvcHMsICdyb3RhdGVPbldvcmxkQXhpc1knKVxuICBtZXNoRm9sZGVyLmFkZChwcm9wcywgJ3JvdGF0ZU9uV29ybGRBeGlzWicpXG4gIG1lc2hGb2xkZXIub25DaGFuZ2UoKCkgPT4ge1xuICAgIG1lc2guc2NhbGUuc2V0KHByb3BzLnNjYWxlWCwgcHJvcHMuc2NhbGVZLCBwcm9wcy5zY2FsZVopXG4gICAgbWVzaC5yb3RhdGlvbi5zZXQocHJvcHMucm90YXRpb25YLCBwcm9wcy5yb3RhdGlvblksIHByb3BzLnJvdGF0aW9uWilcbiAgICBtZXNoLnBvc2l0aW9uLnNldChwcm9wcy5wb3NpdGlvblgsIHByb3BzLnBvc2l0aW9uWSwgcHJvcHMucG9zaXRpb25aKVxuICAgIG1lc2gudmlzaWJsZSA9IHByb3BzLnZpc2libGVcbiAgICBtZXNoLmNhc3RTaGFkb3cgPSBwcm9wcy5jYXN0U2hhZG93XG4gIH0pXG59XG5cbmluaXRTY2VuZShwcm9wcykoKHsgc2NlbmUsIGNhbWVyYSwgcmVuZGVyZXIsIG9yYml0Q29udHJvbHMgfSkgPT4ge1xuICBjYW1lcmEucG9zaXRpb24uc2V0KC03LCAyLCA1KVxuICBvcmJpdENvbnRyb2xzLnVwZGF0ZSgpXG5cbiAgZmxvYXRpbmdGbG9vcihzY2VuZSwgMTApXG5cbiAgY29uc3QgZ2VvbSA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSgxLCAyLCAzKVxuICBjb25zdCBtZXNoTWF0ID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcbiAgICBjb2xvcjogMHgwMGZmODgsXG4gICAgcm91Z2huZXNzOiAwLjFcbiAgfSlcbiAgY29uc3QgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlb20sIG1lc2hNYXQpXG4gIG1lc2guY2FzdFNoYWRvdyA9IHRydWVcbiAgc2NlbmUuYWRkKG1lc2gpXG5cbiAgLy8gdG8gZXhwbGFpbiBvYmplY3Qgc3BhY2UuIEJldHRlciBJIHRoaW5rIGlmIHdlIGNyZWF0ZSBhIG5ld1xuICAvLyBleGFtcGxlIGZvciB0aGlzLlxuICAvLyBtZXNoLmFkZChuZXcgVEhSRUUuQXhlc0hlbHBlcigxMCkpO1xuICAvLyBzY2VuZS5hZGQobmV3IFRIUkVFLkF4ZXNIZWxwZXIoMTApKTtcblxuICBmdW5jdGlvbiBhbmltYXRlKCkge1xuICAgIC8vIGxhenkgd2F5LCB3ZSBqdXN0IHJlYWRkIHRoZSBjb21wbGV0ZSBvYmplY3QuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpXG4gICAgcmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEpXG4gICAgc3RhdHMudXBkYXRlKClcbiAgICBvcmJpdENvbnRyb2xzLnVwZGF0ZSgpXG4gIH1cbiAgYW5pbWF0ZSgpXG5cbiAgaW50aWFsaXplUmVuZGVyZXJDb250cm9scyhndWksIHJlbmRlcmVyKVxuICBpbml0aWFsaXplSGVscGVyQ29udHJvbHMoZ3VpLCBzY2VuZSlcbiAgaW5pdGlhbGl6ZVNjZW5lQ29udHJvbHMoZ3VpLCBzY2VuZSlcblxuICBhZGRNZXNoUHJvcGVydGllcyhtZXNoKVxufSlcbiIsImltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vY29udHJvbHMvT3JiaXRDb250cm9scydcblxuZXhwb3J0IGNvbnN0IGluaXRPcmJpdENvbnRyb2xzID0gKGNhbWVyYSwgcmVuZGVyZXIpID0+IHtcbiAgY29uc3QgY29udHJvbGxlciA9IG5ldyBPcmJpdENvbnRyb2xzKGNhbWVyYSwgcmVuZGVyZXIuZG9tRWxlbWVudClcbiAgY29udHJvbGxlci5lbmFibGVEYW1waW5nID0gdHJ1ZVxuICBjb250cm9sbGVyLmRhbXBpbmdGYWN0b3IgPSAwLjA1XG4gIGNvbnRyb2xsZXIubWluRGlzdGFuY2UgPSAxXG4gIGNvbnRyb2xsZXIubWF4RGlzdGFuY2UgPSAxMDBcbiAgY29udHJvbGxlci5taW5Qb2xhckFuZ2xlID0gTWF0aC5QSSAvIDRcbiAgY29udHJvbGxlci5tYXhQb2xhckFuZ2xlID0gKDMgKiBNYXRoLlBJKSAvIDRcblxuICByZXR1cm4gY29udHJvbGxlclxufVxuIiwiaW1wb3J0IHtcbiAgYXhpc0hlbHBlcixcbiAgYXhpc0hlbHBlck5hbWUsXG4gIGdyaWRIZWxwZXIsXG4gIGdyaWRIZWxwZXJOYW1lLFxuICBwb2xhckdyaWRIZWxwZXIsXG4gIHBvbGFyR3JpZEhlbHBlck5hbWUsXG59IGZyb20gXCIuLi9oZWxwZXJzL2hlbHBlcnNcIjtcblxuY29uc3QgcHJvcGVydGllc09iamVjdCA9IChzY2VuZSkgPT4gKHtcbiAgYXhpc0hlbHBlcjoge1xuICAgIHRvZ2dsZTogKCkgPT4ge1xuICAgICAgY29uc3QgY3VycmVudEhlbHBlciA9IHNjZW5lLmdldE9iamVjdEJ5TmFtZShheGlzSGVscGVyTmFtZSk7XG4gICAgICBpZiAoY3VycmVudEhlbHBlcikge1xuICAgICAgICBzY2VuZS5yZW1vdmUoY3VycmVudEhlbHBlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBheGlzSGVscGVyKHNjZW5lKTtcbiAgICAgIH1cbiAgICB9LFxuICB9LFxuICBncmlkSGVscGVyOiB7XG4gICAgdG9nZ2xlOiAoKSA9PiByZW1vdmVPckFkZFRvU2NlbmUoZ3JpZEhlbHBlck5hbWUsIHNjZW5lLCBncmlkSGVscGVyKSxcbiAgfSxcbiAgcG9sYXJHcmlkSGVscGVyOiB7XG4gICAgdG9nZ2xlOiAoKSA9PlxuICAgICAgcmVtb3ZlT3JBZGRUb1NjZW5lKHBvbGFyR3JpZEhlbHBlck5hbWUsIHNjZW5lLCBwb2xhckdyaWRIZWxwZXIpLFxuICB9LFxufSk7XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsaXplSGVscGVyQ29udHJvbHMgPSAoZ3VpLCBzY2VuZSkgPT4ge1xuICBjb25zdCBwcm9wcyA9IHByb3BlcnRpZXNPYmplY3Qoc2NlbmUpO1xuICBjb25zdCBoZWxwZXJzID0gZ3VpLmFkZEZvbGRlcihcIkhlbHBlcnNcIik7XG4gIC8vICAgaGVscGVycy5hZGQoJ2F4aXNIZWxwZXJFbmFibGVkJywgcHJvcGVydGllc09iamVjdClcbiAgaGVscGVycy5hZGQocHJvcHMuYXhpc0hlbHBlciwgXCJ0b2dnbGVcIikubmFtZShcIlRvZ2dsZSBBeGVzSGVscGVyXCIpO1xuICBoZWxwZXJzLmFkZChwcm9wcy5ncmlkSGVscGVyLCBcInRvZ2dsZVwiKS5uYW1lKFwiVG9nZ2xlIEdyaWRIZWxwZXJcIik7XG4gIGhlbHBlcnMuYWRkKHByb3BzLnBvbGFyR3JpZEhlbHBlciwgXCJ0b2dnbGVcIikubmFtZShcIlRvZ2dsZSBQb2xhckdyaWRIZWxwZXJcIik7XG5cbiAgaGVscGVycy5jbG9zZSgpO1xufTtcblxuY29uc3QgcmVtb3ZlT3JBZGRUb1NjZW5lID0gKG5hbWUsIHNjZW5lLCBhZGRGbikgPT4ge1xuICBjb25zdCBjdXJyZW50T2JqZWN0ID0gc2NlbmUuZ2V0T2JqZWN0QnlOYW1lKG5hbWUpO1xuICBjb25zb2xlLmxvZyhjdXJyZW50T2JqZWN0KTtcbiAgaWYgKGN1cnJlbnRPYmplY3QpIHtcbiAgICBzY2VuZS5yZW1vdmUoY3VycmVudE9iamVjdCk7XG4gIH0gZWxzZSB7XG4gICAgYWRkRm4oc2NlbmUpO1xuICB9XG59O1xuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5cbmNvbnN0IGVudW1zID0ge1xuICB0b25lTWFwcGluZ09wdGlvbnM6IHtcbiAgICBOb25lOiBUSFJFRS5Ob1RvbmVNYXBwaW5nLFxuICAgIExpbmVhcjogVEhSRUUuTGluZWFyVG9uZU1hcHBpbmcsXG4gICAgUmVpbmhhcmQ6IFRIUkVFLlJlaW5oYXJkVG9uZU1hcHBpbmcsXG4gICAgQ2luZW9uOiBUSFJFRS5DaW5lb25Ub25lTWFwcGluZyxcbiAgICBBQ0VTRmlsbWljOiBUSFJFRS5BQ0VTRmlsbWljVG9uZU1hcHBpbmcsXG4gICAgQ3VzdG9tOiBUSFJFRS5DdXN0b21Ub25lTWFwcGluZyxcbiAgfSxcbiAgc2hhZG93TWFwcGluZzoge1xuICAgIEJhc2ljOiBUSFJFRS5CYXNpY1NoYWRvd01hcCxcbiAgICBQQ0ZTOiBUSFJFRS5QQ0ZTaGFkb3dNYXAsXG4gICAgUENGU29mdDogVEhSRUUuUENGU29mdFNoYWRvd01hcCxcbiAgICBWU006IFRIUkVFLlZTTVNoYWRvd01hcCxcbiAgfSxcbiAgb3V0cHV0RW5jb2RpbmdzOiB7XG4gICAgTGluZWFyOiBUSFJFRS5MaW5lYXJFbmNvZGluZyxcbiAgICBzUkdCOiBUSFJFRS5zUkdCRW5jb2RpbmcsXG4gIH0sXG59O1xuXG5jb25zdCBnZXRQcm9wZXJ0eUhvbGRlciA9ICh3ZWJHTFJlbmRlcmVyKSA9PiB7XG4gIGNvbnN0IGNsZWFyQ29sb3JIb2xkZXIgPSBuZXcgVEhSRUUuQ29sb3IoKTtcbiAgd2ViR0xSZW5kZXJlci5nZXRDbGVhckNvbG9yKGNsZWFyQ29sb3JIb2xkZXIpO1xuXG4gIGNvbnN0IGhvbGRlciA9IHtcbiAgICBtYWluOiB7XG4gICAgICBvdXRwdXRFbmNvZGluZzogd2ViR0xSZW5kZXJlci5vdXRwdXRFbmNvZGluZyxcbiAgICB9LFxuICAgIHNoYWRvd01hcDoge1xuICAgICAgZW5hYmxlZDogd2ViR0xSZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCxcbiAgICAgIGF1dG9VcGRhdGU6IHdlYkdMUmVuZGVyZXIuc2hhZG93TWFwLmF1dG9VcGRhdGUsXG4gICAgICBuZWVkc1VwZGF0ZTogKCkgPT4gKHdlYkdMUmVuZGVyZXIuc2hhZG93TWFwLm5lZWRzVXBkYXRlID0gdHJ1ZSksXG4gICAgICB0eXBlOiB3ZWJHTFJlbmRlcmVyLnNoYWRvd01hcC50eXBlLFxuICAgIH0sXG4gICAgdG9uZU1hcHBpbmc6IHtcbiAgICAgIGV4cG9zdXJlOiB3ZWJHTFJlbmRlcmVyLnRvbmVNYXBwaW5nRXhwb3N1cmUsXG4gICAgICB0b25lTWFwcGluZzogd2ViR0xSZW5kZXJlci50b25lTWFwcGluZyxcbiAgICB9LFxuICAgIGNsZWFyU2V0dGluZ3M6IHtcbiAgICAgIGF1dG9DbGVhcjogd2ViR0xSZW5kZXJlci5hdXRvQ2xlYXIsXG4gICAgICBjbGVhckNvbG9yOiBjbGVhckNvbG9ySG9sZGVyLmdldFN0eWxlKCksXG4gICAgfSxcbiAgICBhZHZhbmNlZDoge1xuICAgICAgYXV0b0NsZWFyRGVwdGg6IHdlYkdMUmVuZGVyZXIuYXV0b0NsZWFyRGVwdGgsXG4gICAgICBhdXRvQ2xlYXJTdGVuY2lsOiB3ZWJHTFJlbmRlcmVyLmF1dG9DbGVhclN0ZW5jaWwsXG4gICAgICBjaGVja1NoYWRlckVycm9yczogd2ViR0xSZW5kZXJlci5kZWJ1Zy5jaGVja1NoYWRlckVycm9ycyxcbiAgICAgIHNvcnRPYmplY3RzOiB3ZWJHTFJlbmRlcmVyLnNvcnRPYmplY3RzLFxuICAgICAgbG9jYWxDbGlwcGluZ0VuYWJsZWQ6IHdlYkdMUmVuZGVyZXIubG9jYWxDbGlwcGluZ0VuYWJsZWQsXG4gICAgICBwaHlzaWNhbGx5Q29ycmVjdExpZ2h0czogd2ViR0xSZW5kZXJlci5waHlzaWNhbGx5Q29ycmVjdExpZ2h0cyxcbiAgICB9LFxuICB9O1xuXG4gIHJldHVybiBob2xkZXI7XG59O1xuXG5leHBvcnQgY29uc3QgaW50aWFsaXplUmVuZGVyZXJDb250cm9scyA9IChndWksIHdlYkdMUmVuZGVyZXIpID0+IHtcbiAgY29uc3QgcHJvcGVydGllc09iamVjdCA9IGdldFByb3BlcnR5SG9sZGVyKHdlYkdMUmVuZGVyZXIpO1xuICBjb25zdCByZW5kZXJlckZvbGRlciA9IGd1aS5hZGRGb2xkZXIoXCJXZWJHTFJlbmRlcmVyXCIpO1xuXG4gIHJlbmRlcmVyRm9sZGVyLm9uQ2hhbmdlKChfKSA9PiB7XG4gICAgdXBkYXRlV2ViR0xSZW5kZXJlclByb3BlcnRpZXMod2ViR0xSZW5kZXJlciwgcHJvcGVydGllc09iamVjdCk7XG4gIH0pO1xuXG4gIHJlbmRlcmVyRm9sZGVyLmFkZChcbiAgICBwcm9wZXJ0aWVzT2JqZWN0Lm1haW4sXG4gICAgXCJvdXRwdXRFbmNvZGluZ1wiLFxuICAgIGVudW1zLm91dHB1dEVuY29kaW5nc1xuICApO1xuXG4gIGNvbnN0IHNoYWRvd0ZvbGRlciA9IHJlbmRlcmVyRm9sZGVyLmFkZEZvbGRlcihcIlNoYWRvd1wiKTtcbiAgc2hhZG93Rm9sZGVyLmFkZChwcm9wZXJ0aWVzT2JqZWN0LnNoYWRvd01hcCwgXCJlbmFibGVkXCIpO1xuICBzaGFkb3dGb2xkZXIuYWRkKHByb3BlcnRpZXNPYmplY3Quc2hhZG93TWFwLCBcImF1dG9VcGRhdGVcIik7XG4gIHNoYWRvd0ZvbGRlci5hZGQocHJvcGVydGllc09iamVjdC5zaGFkb3dNYXAsIFwibmVlZHNVcGRhdGVcIik7XG4gIHNoYWRvd0ZvbGRlclxuICAgIC5hZGQocHJvcGVydGllc09iamVjdC5zaGFkb3dNYXAsIFwidHlwZVwiLCBlbnVtcy5zaGFkb3dNYXBwaW5nKVxuICAgIC5lbmFibGUoZmFsc2UpOyAvLyBjYW4ndCB1cGRhdGUgdGhlIHNoYWRvdyBtYXBwaW5nIHR5cGUgaW4gcnVudGltZVxuXG4gIGNvbnN0IHRvbmVNYXBwaW5nRm9sZGVyID0gcmVuZGVyZXJGb2xkZXIuYWRkRm9sZGVyKFwiVG9uZU1hcHBpbmdcIik7XG4gIHRvbmVNYXBwaW5nRm9sZGVyLmFkZChwcm9wZXJ0aWVzT2JqZWN0LnRvbmVNYXBwaW5nLCBcImV4cG9zdXJlXCIsIDAsIDIpO1xuICB0b25lTWFwcGluZ0ZvbGRlci5hZGQoXG4gICAgcHJvcGVydGllc09iamVjdC50b25lTWFwcGluZyxcbiAgICBcInRvbmVNYXBwaW5nXCIsXG4gICAgZW51bXMudG9uZU1hcHBpbmdPcHRpb25zXG4gICk7XG5cbiAgY29uc3QgY2xlYXJTZXR0aW5nc0ZvbGRlciA9IHJlbmRlcmVyRm9sZGVyLmFkZEZvbGRlcihcImNsZWFyU2V0dGluZ3NcIik7XG4gIGNsZWFyU2V0dGluZ3NGb2xkZXIuYWRkKHByb3BlcnRpZXNPYmplY3QuY2xlYXJTZXR0aW5ncywgXCJhdXRvQ2xlYXJcIik7XG4gIGNsZWFyU2V0dGluZ3NGb2xkZXIuYWRkQ29sb3IocHJvcGVydGllc09iamVjdC5jbGVhclNldHRpbmdzLCBcImNsZWFyQ29sb3JcIik7XG5cbiAgcmVuZGVyZXJGb2xkZXIuY2xvc2UoKTtcbn07XG5cbmNvbnN0IHVwZGF0ZVdlYkdMUmVuZGVyZXJQcm9wZXJ0aWVzID0gKHdlYkdMUmVuZGVyZXIsIHByb3BlcnR5SG9sZGVyKSA9PiB7XG4gIHdlYkdMUmVuZGVyZXIuc2hhZG93TWFwLmVuYWJsZWQgPSBwcm9wZXJ0eUhvbGRlci5zaGFkb3dNYXAuZW5hYmxlZDtcbiAgd2ViR0xSZW5kZXJlci5zaGFkb3dNYXAuYXV0b1VwZGF0ZSA9IHByb3BlcnR5SG9sZGVyLnNoYWRvd01hcC5hdXRvVXBkYXRlO1xuICB3ZWJHTFJlbmRlcmVyLnNoYWRvd01hcC5uZWVkc1VwZGF0ZSA9IHByb3BlcnR5SG9sZGVyLnNoYWRvd01hcC5uZWVkc1VwZGF0ZTtcbiAgd2ViR0xSZW5kZXJlci50b25lTWFwcGluZyA9IHByb3BlcnR5SG9sZGVyLnRvbmVNYXBwaW5nLnRvbmVNYXBwaW5nO1xuICB3ZWJHTFJlbmRlcmVyLnRvbmVNYXBwaW5nRXhwb3N1cmUgPSBwcm9wZXJ0eUhvbGRlci50b25lTWFwcGluZy5leHBvc3VyZTtcbiAgd2ViR0xSZW5kZXJlci5hdXRvQ2xlYXIgPSBwcm9wZXJ0eUhvbGRlci5jbGVhclNldHRpbmdzLmF1dG9DbGVhcjtcbiAgd2ViR0xSZW5kZXJlci5zZXRDbGVhckNvbG9yKHByb3BlcnR5SG9sZGVyLmNsZWFyU2V0dGluZ3MuY2xlYXJDb2xvcik7XG4gIHdlYkdMUmVuZGVyZXIub3V0cHV0RW5jb2RpbmcgPSBwcm9wZXJ0eUhvbGRlci5tYWluLm91dHB1dEVuY29kaW5nO1xuXG4gIHdlYkdMUmVuZGVyZXIubmVlZHNVcGRhdGUgPSB0cnVlO1xufTtcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuXG5jb25zdCB0ZXh0dXJlTG9hZGVyID0gbmV3IFRIUkVFLlRleHR1cmVMb2FkZXIoKVxuXG5jb25zdCBwcm9wZXJ0aWVzT2JqZWN0ID0gKHNjZW5lKSA9PiAoe1xuICBvdmVycmlkZU1hdGVyaWFsOiB7XG4gICAgdG9nZ2xlOiAoKSA9PiB7XG4gICAgICBpZiAoc2NlbmUub3ZlcnJpZGVNYXRlcmlhbCAhPT0gbnVsbCkge1xuICAgICAgICBzY2VuZS5vdmVycmlkZU1hdGVyaWFsID0gbnVsbFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2NlbmUub3ZlcnJpZGVNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTm9ybWFsTWF0ZXJpYWwoKVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgYmFja0dyb3VuZDogJ1doaXRlJyxcbiAgZW52aXJvbm1lbnQ6IHtcbiAgICB0b2dnbGU6ICgpID0+IHtcbiAgICAgIGlmIChzY2VuZS5lbnZpcm9ubWVudCAhPT0gbnVsbCkge1xuICAgICAgICBzY2VuZS5lbnZpcm9ubWVudCA9IG51bGxcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRleHR1cmVMb2FkZXIubG9hZCgnL2Fzc2V0cy9lcXVpLmpwZWcnLCAobG9hZGVkKSA9PiB7XG4gICAgICAgICAgbG9hZGVkLm1hcHBpbmcgPSBUSFJFRS5FcXVpcmVjdGFuZ3VsYXJSZWZsZWN0aW9uTWFwcGluZ1xuICAgICAgICAgIHNjZW5lLmVudmlyb25tZW50ID0gbG9hZGVkXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuXG5jb25zdCBmb2dQcm9wZXJ0aWVzID0gKGZvZykgPT4gKHtcbiAgY29sb3I6IDB4ZmZmZmZmLFxuICBuZWFyOiBmb2cubmVhcixcbiAgZmFyOiBmb2cuZmFyXG59KVxuXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZVNjZW5lQ29udHJvbHMgPSAoZ3VpLCBzY2VuZSwgZm9nRW5hYmxlZCwgaXNPcGVuKSA9PiB7XG4gIGNvbnN0IHByb3BzID0gcHJvcGVydGllc09iamVjdChzY2VuZSlcbiAgY29uc3Qgc2NlbmVDb250cm9scyA9IGd1aS5hZGRGb2xkZXIoJ1NjZW5lJylcblxuICBzY2VuZUNvbnRyb2xzXG4gICAgLmFkZChwcm9wcywgJ2JhY2tHcm91bmQnLCBbJ1doaXRlJywgJ0JsYWNrJywgJ051bGwnLCAnQ29sb3InLCAnVGV4dHVyZScsICdDdWJlbWFwJ10pXG4gICAgLm9uQ2hhbmdlKChldmVudCkgPT4gaGFuZGxlQmFja2dyb3VuZENoYW5nZShldmVudCwgc2NlbmUpKVxuICBzY2VuZUNvbnRyb2xzLmFkZChwcm9wcy5vdmVycmlkZU1hdGVyaWFsLCAndG9nZ2xlJykubmFtZSgnVG9nZ2xlIE92ZXJyaWRlIE1hdGVyaWFsJylcbiAgc2NlbmVDb250cm9scy5hZGQocHJvcHMuZW52aXJvbm1lbnQsICd0b2dnbGUnKS5uYW1lKCdUb2dnbGUgRW52aXJvbm1lbnQnKVxuXG4gIGlmIChmb2dFbmFibGVkKSB7XG4gICAgY29uc3QgZm9nQ29sb3IgPSBuZXcgVEhSRUUuQ29sb3IoMHhmZmZmZmYpXG4gICAgY29uc3QgZm9nID0gbmV3IFRIUkVFLkZvZyhmb2dDb2xvciwgMSwgMjApXG4gICAgc2NlbmUuZm9nID0gZm9nXG4gICAgY29uc3QgZm9nUHJvcHMgPSBmb2dQcm9wZXJ0aWVzKGZvZylcbiAgICBjb25zdCBmb2dDb250cm9scyA9IHNjZW5lQ29udHJvbHMuYWRkRm9sZGVyKCdGb2cnKVxuICAgIGZvZ0NvbnRyb2xzLmFkZENvbG9yKGZvZ1Byb3BzLCAnY29sb3InKVxuICAgIGZvZ0NvbnRyb2xzLmFkZChmb2dQcm9wcywgJ25lYXInLCAwLCAxMCwgMC4xKVxuICAgIGZvZ0NvbnRyb2xzLmFkZChmb2dQcm9wcywgJ2ZhcicsIDAsIDEwMCwgMC4xKVxuXG4gICAgZm9nQ29udHJvbHMub25DaGFuZ2UoKCkgPT4ge1xuICAgICAgZm9nLmNvbG9yID0gZm9nQ29sb3Iuc2V0SGV4KGZvZ1Byb3BzLmNvbG9yKVxuICAgICAgZm9nLm5lYXIgPSBmb2dQcm9wcy5uZWFyXG4gICAgICBmb2cuZmFyID0gZm9nUHJvcHMuZmFyXG4gICAgfSlcbiAgfVxuXG4gIGlzT3BlbiA/IHNjZW5lQ29udHJvbHMub3BlbigpIDogc2NlbmVDb250cm9scy5jbG9zZSgpXG59XG5cbmNvbnN0IGhhbmRsZUJhY2tncm91bmRDaGFuZ2UgPSAoc2V0dGluZywgc2NlbmUpID0+IHtcbiAgc3dpdGNoIChzZXR0aW5nKSB7XG4gICAgY2FzZSAnV2hpdGUnOlxuICAgICAgc2NlbmUuYmFja2dyb3VuZCA9IG5ldyBUSFJFRS5Db2xvcigweGZmZmZmZilcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnQmxhY2snOlxuICAgICAgc2NlbmUuYmFja2dyb3VuZCA9IG5ldyBUSFJFRS5Db2xvcigweDAwMDAwMClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnTnVsbCc6XG4gICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbnVsbFxuICAgICAgYnJlYWtcbiAgICBjYXNlICdDb2xvcic6XG4gICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbmV3IFRIUkVFLkNvbG9yKDB4NDRmZjQ0KVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdUZXh0dXJlJzpcbiAgICAgIHRleHR1cmVMb2FkZXIubG9hZCgnL2Fzc2V0cy90ZXh0dXJlcy93b29kL2Fic3RyYWN0LWFudGlxdWUtYmFja2Ryb3AtMTY0MDA1LmpwZycsIChsb2FkZWQpID0+IHtcbiAgICAgICAgbG9hZGVkLmVuY29kaW5nID0gVEhSRUUuc1JHQkVuY29kaW5nXG4gICAgICAgIHNjZW5lLmJhY2tncm91bmQgPSBsb2FkZWRcbiAgICAgICAgc2NlbmUuZW52aXJvbm1lbnQgPSBudWxsXG4gICAgICB9KVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdDdWJlbWFwJzpcbiAgICAgIHRleHR1cmVMb2FkZXIubG9hZCgnL2Fzc2V0cy9lcXVpLmpwZWcnLCAobG9hZGVkKSA9PiB7XG4gICAgICAgIGxvYWRlZC5tYXBwaW5nID0gVEhSRUUuRXF1aXJlY3Rhbmd1bGFyUmVmbGVjdGlvbk1hcHBpbmdcbiAgICAgICAgc2NlbmUuYmFja2dyb3VuZCA9IGxvYWRlZFxuICAgICAgICBzY2VuZS5lbnZpcm9ubWVudCA9IGxvYWRlZFxuICAgICAgfSlcblxuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgYnJlYWtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5cbmV4cG9ydCBjb25zdCBheGlzSGVscGVyTmFtZSA9ICdheGVzSGVscGVyJ1xuZXhwb3J0IGNvbnN0IGdyaWRIZWxwZXJOYW1lID0gJ2dyaWRIZWxwZXInXG5leHBvcnQgY29uc3QgcG9sYXJHcmlkSGVscGVyTmFtZSA9ICdwb2xhckdyaWRIZWxwZXInXG5cbmV4cG9ydCBjb25zdCBheGlzSGVscGVyID0gKHNjZW5lKSA9PiB7XG4gIGNvbnN0IGF4ZXNIZWxwZXIgPSBuZXcgVEhSRUUuQXhlc0hlbHBlcig1KVxuICBheGVzSGVscGVyLm5hbWUgPSBheGlzSGVscGVyTmFtZVxuICBzY2VuZS5hZGQoYXhlc0hlbHBlcilcbn1cblxuZXhwb3J0IGNvbnN0IGdyaWRIZWxwZXIgPSAoc2NlbmUpID0+IHtcbiAgY29uc3Qgc2l6ZSA9IDEwXG4gIGNvbnN0IGRpdmlzaW9ucyA9IDEwXG4gIGNvbnN0IGdyaWRIZWxwZXIgPSBuZXcgVEhSRUUuR3JpZEhlbHBlcihzaXplLCBkaXZpc2lvbnMpXG4gIGdyaWRIZWxwZXIubmFtZSA9IGdyaWRIZWxwZXJOYW1lXG4gIHNjZW5lLmFkZChncmlkSGVscGVyKVxufVxuXG5leHBvcnQgY29uc3QgcG9sYXJHcmlkSGVscGVyID0gKHNjZW5lKSA9PiB7XG4gIGNvbnN0IHJhZGl1cyA9IDEwXG4gIGNvbnN0IHJhZGlhbHMgPSAxNlxuICBjb25zdCBjaXJjbGVzID0gOFxuICBjb25zdCBkaXZpc2lvbnMgPSA2NFxuICBjb25zdCBwb2xhckdyaWRIZWxwZXIgPSBuZXcgVEhSRUUuUG9sYXJHcmlkSGVscGVyKHJhZGl1cywgcmFkaWFscywgY2lyY2xlcywgZGl2aXNpb25zKVxuICBwb2xhckdyaWRIZWxwZXIubmFtZSA9IHBvbGFyR3JpZEhlbHBlck5hbWVcbiAgc2NlbmUuYWRkKHBvbGFyR3JpZEhlbHBlcilcbn1cbiIsImltcG9ydCBTdGF0cyBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbGlicy9zdGF0cy5tb2R1bGUnXG5cbmNvbnN0IHN0YXRzID0gU3RhdHMoKVxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzdGF0cy5kb20pXG5cbmV4cG9ydCB7IHN0YXRzIH1cbiIsImV4cG9ydCBjb25zdCBvblJlc2l6ZSA9IChjYW1lcmEsIHJlbmRlcmVyKSA9PiB7XG4gIGNvbnN0IHJlc2l6ZXIgPSAoKSA9PiB7XG4gICAgY2FtZXJhLmFzcGVjdCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0XG4gICAgY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKVxuICAgIHJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodClcbiAgfVxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzaXplciwgZmFsc2UpXG59XG4iLCJ2YXIgU3RhdHMgPSBmdW5jdGlvbiAoKSB7XG5cblx0dmFyIG1vZGUgPSAwO1xuXG5cdHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuXHRjb250YWluZXIuc3R5bGUuY3NzVGV4dCA9ICdwb3NpdGlvbjpmaXhlZDt0b3A6MDtsZWZ0OjA7Y3Vyc29yOnBvaW50ZXI7b3BhY2l0eTowLjk7ei1pbmRleDoxMDAwMCc7XG5cdGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCAnY2xpY2snLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRzaG93UGFuZWwoICsrIG1vZGUgJSBjb250YWluZXIuY2hpbGRyZW4ubGVuZ3RoICk7XG5cblx0fSwgZmFsc2UgKTtcblxuXHQvL1xuXG5cdGZ1bmN0aW9uIGFkZFBhbmVsKCBwYW5lbCApIHtcblxuXHRcdGNvbnRhaW5lci5hcHBlbmRDaGlsZCggcGFuZWwuZG9tICk7XG5cdFx0cmV0dXJuIHBhbmVsO1xuXG5cdH1cblxuXHRmdW5jdGlvbiBzaG93UGFuZWwoIGlkICkge1xuXG5cdFx0Zm9yICggdmFyIGkgPSAwOyBpIDwgY29udGFpbmVyLmNoaWxkcmVuLmxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0Y29udGFpbmVyLmNoaWxkcmVuWyBpIF0uc3R5bGUuZGlzcGxheSA9IGkgPT09IGlkID8gJ2Jsb2NrJyA6ICdub25lJztcblxuXHRcdH1cblxuXHRcdG1vZGUgPSBpZDtcblxuXHR9XG5cblx0Ly9cblxuXHR2YXIgYmVnaW5UaW1lID0gKCBwZXJmb3JtYW5jZSB8fCBEYXRlICkubm93KCksIHByZXZUaW1lID0gYmVnaW5UaW1lLCBmcmFtZXMgPSAwO1xuXG5cdHZhciBmcHNQYW5lbCA9IGFkZFBhbmVsKCBuZXcgU3RhdHMuUGFuZWwoICdGUFMnLCAnIzBmZicsICcjMDAyJyApICk7XG5cdHZhciBtc1BhbmVsID0gYWRkUGFuZWwoIG5ldyBTdGF0cy5QYW5lbCggJ01TJywgJyMwZjAnLCAnIzAyMCcgKSApO1xuXG5cdGlmICggc2VsZi5wZXJmb3JtYW5jZSAmJiBzZWxmLnBlcmZvcm1hbmNlLm1lbW9yeSApIHtcblxuXHRcdHZhciBtZW1QYW5lbCA9IGFkZFBhbmVsKCBuZXcgU3RhdHMuUGFuZWwoICdNQicsICcjZjA4JywgJyMyMDEnICkgKTtcblxuXHR9XG5cblx0c2hvd1BhbmVsKCAwICk7XG5cblx0cmV0dXJuIHtcblxuXHRcdFJFVklTSU9OOiAxNixcblxuXHRcdGRvbTogY29udGFpbmVyLFxuXG5cdFx0YWRkUGFuZWw6IGFkZFBhbmVsLFxuXHRcdHNob3dQYW5lbDogc2hvd1BhbmVsLFxuXG5cdFx0YmVnaW46IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0YmVnaW5UaW1lID0gKCBwZXJmb3JtYW5jZSB8fCBEYXRlICkubm93KCk7XG5cblx0XHR9LFxuXG5cdFx0ZW5kOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdGZyYW1lcyArKztcblxuXHRcdFx0dmFyIHRpbWUgPSAoIHBlcmZvcm1hbmNlIHx8IERhdGUgKS5ub3coKTtcblxuXHRcdFx0bXNQYW5lbC51cGRhdGUoIHRpbWUgLSBiZWdpblRpbWUsIDIwMCApO1xuXG5cdFx0XHRpZiAoIHRpbWUgPj0gcHJldlRpbWUgKyAxMDAwICkge1xuXG5cdFx0XHRcdGZwc1BhbmVsLnVwZGF0ZSggKCBmcmFtZXMgKiAxMDAwICkgLyAoIHRpbWUgLSBwcmV2VGltZSApLCAxMDAgKTtcblxuXHRcdFx0XHRwcmV2VGltZSA9IHRpbWU7XG5cdFx0XHRcdGZyYW1lcyA9IDA7XG5cblx0XHRcdFx0aWYgKCBtZW1QYW5lbCApIHtcblxuXHRcdFx0XHRcdHZhciBtZW1vcnkgPSBwZXJmb3JtYW5jZS5tZW1vcnk7XG5cdFx0XHRcdFx0bWVtUGFuZWwudXBkYXRlKCBtZW1vcnkudXNlZEpTSGVhcFNpemUgLyAxMDQ4NTc2LCBtZW1vcnkuanNIZWFwU2l6ZUxpbWl0IC8gMTA0ODU3NiApO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdGltZTtcblxuXHRcdH0sXG5cblx0XHR1cGRhdGU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0YmVnaW5UaW1lID0gdGhpcy5lbmQoKTtcblxuXHRcdH0sXG5cblx0XHQvLyBCYWNrd2FyZHMgQ29tcGF0aWJpbGl0eVxuXG5cdFx0ZG9tRWxlbWVudDogY29udGFpbmVyLFxuXHRcdHNldE1vZGU6IHNob3dQYW5lbFxuXG5cdH07XG5cbn07XG5cblN0YXRzLlBhbmVsID0gZnVuY3Rpb24gKCBuYW1lLCBmZywgYmcgKSB7XG5cblx0dmFyIG1pbiA9IEluZmluaXR5LCBtYXggPSAwLCByb3VuZCA9IE1hdGgucm91bmQ7XG5cdHZhciBQUiA9IHJvdW5kKCB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxICk7XG5cblx0dmFyIFdJRFRIID0gODAgKiBQUiwgSEVJR0hUID0gNDggKiBQUixcblx0XHRURVhUX1ggPSAzICogUFIsIFRFWFRfWSA9IDIgKiBQUixcblx0XHRHUkFQSF9YID0gMyAqIFBSLCBHUkFQSF9ZID0gMTUgKiBQUixcblx0XHRHUkFQSF9XSURUSCA9IDc0ICogUFIsIEdSQVBIX0hFSUdIVCA9IDMwICogUFI7XG5cblx0dmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdjYW52YXMnICk7XG5cdGNhbnZhcy53aWR0aCA9IFdJRFRIO1xuXHRjYW52YXMuaGVpZ2h0ID0gSEVJR0hUO1xuXHRjYW52YXMuc3R5bGUuY3NzVGV4dCA9ICd3aWR0aDo4MHB4O2hlaWdodDo0OHB4JztcblxuXHR2YXIgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCAnMmQnICk7XG5cdGNvbnRleHQuZm9udCA9ICdib2xkICcgKyAoIDkgKiBQUiApICsgJ3B4IEhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmJztcblx0Y29udGV4dC50ZXh0QmFzZWxpbmUgPSAndG9wJztcblxuXHRjb250ZXh0LmZpbGxTdHlsZSA9IGJnO1xuXHRjb250ZXh0LmZpbGxSZWN0KCAwLCAwLCBXSURUSCwgSEVJR0hUICk7XG5cblx0Y29udGV4dC5maWxsU3R5bGUgPSBmZztcblx0Y29udGV4dC5maWxsVGV4dCggbmFtZSwgVEVYVF9YLCBURVhUX1kgKTtcblx0Y29udGV4dC5maWxsUmVjdCggR1JBUEhfWCwgR1JBUEhfWSwgR1JBUEhfV0lEVEgsIEdSQVBIX0hFSUdIVCApO1xuXG5cdGNvbnRleHQuZmlsbFN0eWxlID0gYmc7XG5cdGNvbnRleHQuZ2xvYmFsQWxwaGEgPSAwLjk7XG5cdGNvbnRleHQuZmlsbFJlY3QoIEdSQVBIX1gsIEdSQVBIX1ksIEdSQVBIX1dJRFRILCBHUkFQSF9IRUlHSFQgKTtcblxuXHRyZXR1cm4ge1xuXG5cdFx0ZG9tOiBjYW52YXMsXG5cblx0XHR1cGRhdGU6IGZ1bmN0aW9uICggdmFsdWUsIG1heFZhbHVlICkge1xuXG5cdFx0XHRtaW4gPSBNYXRoLm1pbiggbWluLCB2YWx1ZSApO1xuXHRcdFx0bWF4ID0gTWF0aC5tYXgoIG1heCwgdmFsdWUgKTtcblxuXHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSBiZztcblx0XHRcdGNvbnRleHQuZ2xvYmFsQWxwaGEgPSAxO1xuXHRcdFx0Y29udGV4dC5maWxsUmVjdCggMCwgMCwgV0lEVEgsIEdSQVBIX1kgKTtcblx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gZmc7XG5cdFx0XHRjb250ZXh0LmZpbGxUZXh0KCByb3VuZCggdmFsdWUgKSArICcgJyArIG5hbWUgKyAnICgnICsgcm91bmQoIG1pbiApICsgJy0nICsgcm91bmQoIG1heCApICsgJyknLCBURVhUX1gsIFRFWFRfWSApO1xuXG5cdFx0XHRjb250ZXh0LmRyYXdJbWFnZSggY2FudmFzLCBHUkFQSF9YICsgUFIsIEdSQVBIX1ksIEdSQVBIX1dJRFRIIC0gUFIsIEdSQVBIX0hFSUdIVCwgR1JBUEhfWCwgR1JBUEhfWSwgR1JBUEhfV0lEVEggLSBQUiwgR1JBUEhfSEVJR0hUICk7XG5cblx0XHRcdGNvbnRleHQuZmlsbFJlY3QoIEdSQVBIX1ggKyBHUkFQSF9XSURUSCAtIFBSLCBHUkFQSF9ZLCBQUiwgR1JBUEhfSEVJR0hUICk7XG5cblx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gYmc7XG5cdFx0XHRjb250ZXh0Lmdsb2JhbEFscGhhID0gMC45O1xuXHRcdFx0Y29udGV4dC5maWxsUmVjdCggR1JBUEhfWCArIEdSQVBIX1dJRFRIIC0gUFIsIEdSQVBIX1ksIFBSLCByb3VuZCggKCAxIC0gKCB2YWx1ZSAvIG1heFZhbHVlICkgKSAqIEdSQVBIX0hFSUdIVCApICk7XG5cblx0XHR9XG5cblx0fTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgU3RhdHM7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1lc2gtcHJvcGVydGllc1wiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtsdGpzX2ZvdXJ0aFwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtsdGpzX2ZvdXJ0aFwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfYnVpbGRfdGhyZWVfbW9kdWxlX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fY29udHJvbHNfT3JiaXRDb250cm9sc19qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfbGlsLWd1aV9kaXN0X2xpbC1ndWlfZXNtX2pzXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTIvbWVzaC1wcm9wZXJ0aWVzLmpzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
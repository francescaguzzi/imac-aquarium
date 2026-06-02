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

/***/ "./samples/chapters/chapter-9/load-md2.js"
/*!************************************************!*\
  !*** ./samples/chapters/chapter-9/load-md2.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_standard_scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/standard-scene */ "./samples/chapters/chapter-9/util/standard-scene.js");
/* harmony import */ var three_examples_jsm_loaders_MD2Loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/loaders/MD2Loader */ "./node_modules/three/examples/jsm/loaders/MD2Loader.js");
/* harmony import */ var _util_modelUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/modelUtil */ "./samples/util/modelUtil.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _controls_animation_controls__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../controls/animation-controls */ "./samples/controls/animation-controls.js");







let animations = []
const loadModel = () => {
  const loader = new three_examples_jsm_loaders_MD2Loader__WEBPACK_IMPORTED_MODULE_1__.MD2Loader()
  return loader.loadAsync('/assets/models/ogre/ogro.md2').then((object) => {
    const mat = new three__WEBPACK_IMPORTED_MODULE_4__.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0,
      map: new three__WEBPACK_IMPORTED_MODULE_4__.TextureLoader().load('/assets/models/ogre/skins/skin.jpg')
    })

    animations = object.animations

    const mesh = new three__WEBPACK_IMPORTED_MODULE_4__.Mesh(object, mat)
    ;(0,_util_modelUtil__WEBPACK_IMPORTED_MODULE_2__.applyShadowsAndDepthWrite)(mesh)
    mesh.scale.setScalar(0.1)
    mesh.translateY(0.5)
    return mesh
  })
}

let mixer = undefined

;(0,_util_standard_scene__WEBPACK_IMPORTED_MODULE_0__.bootstrapMeshScene)({
  loadMesh: loadModel,
  addControls: (camera, renderer, scene, gui, mesh) => {
    const controls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_3__.OrbitControls(camera, renderer.domElement)
    console.log(mesh.animations)

    mixer = new three__WEBPACK_IMPORTED_MODULE_4__.AnimationMixer(mesh)
    const action = mixer.clipAction(animations[9])
    action.play()
    ;(0,_controls_animation_controls__WEBPACK_IMPORTED_MODULE_5__.initializeAnimationControls)(mixer, action, animations[0], gui)

    return controls
  },
  onRender: (clock) => {
    if (mixer) {
      mixer.update(clock.getDelta())
    }
  }
}).then()


/***/ },

/***/ "./samples/chapters/chapter-9/util/standard-scene.js"
/*!***********************************************************!*\
  !*** ./samples/chapters/chapter-9/util/standard-scene.js ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bootstrapMeshScene: () => (/* binding */ bootstrapMeshScene)
/* harmony export */ });
/* harmony import */ var _bootstrap_bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../bootstrap/bootstrap */ "./samples/bootstrap/bootstrap.js");
/* harmony import */ var _controls_renderer_control__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../controls/renderer-control */ "./samples/controls/renderer-control.js");
/* harmony import */ var lil_gui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lil-gui */ "./node_modules/lil-gui/dist/lil-gui.esm.js");
/* harmony import */ var _controls_scene_controls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../controls/scene-controls */ "./samples/controls/scene-controls.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _bootstrap_floor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../bootstrap/floor */ "./samples/bootstrap/floor.js");








const bootstrapMeshScene = async ({
  loadMesh,
  provideGui,
  hidefloor,
  floorSize,
  backgroundColor,
  onRender,
  addControls
}) => {
  const props = {
    backgroundColor: backgroundColor ?? 0xffffff,
    disableDefaultControls: true
  }

  const mesh = await loadMesh()

  const gui = new lil_gui__WEBPACK_IMPORTED_MODULE_2__["default"]()
  const clock = new three__WEBPACK_IMPORTED_MODULE_4__.Clock()

  const init = async () => {
    ;(0,_bootstrap_bootstrap__WEBPACK_IMPORTED_MODULE_0__.initScene)(props)(({ scene, camera, renderer }) => {
      renderer.shadowMap.type = three__WEBPACK_IMPORTED_MODULE_4__.PCFSoftShadowMap
      camera.position.x = -3
      camera.position.z = 8
      camera.position.y = 2

      hidefloor ?? (0,_bootstrap_floor__WEBPACK_IMPORTED_MODULE_5__.floatingFloor)(scene, floorSize ?? 8)

      if (mesh) scene.add(mesh)

      ;(0,_controls_renderer_control__WEBPACK_IMPORTED_MODULE_1__.intializeRendererControls)(gui, renderer)
      ;(0,_controls_scene_controls__WEBPACK_IMPORTED_MODULE_3__.initializeSceneControls)(gui, scene, false)

      if (provideGui) provideGui(gui, mesh, scene)
      let controls = undefined
      if (addControls) {
        controls = addControls(camera, renderer, scene, gui, mesh)
      }

      animate()

      function animate() {
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
        if (onRender) onRender(clock, controls, camera, scene)
      }
    })
  }

  init().then()
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

/***/ "./samples/controls/animation-controls.js"
/*!************************************************!*\
  !*** ./samples/controls/animation-controls.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initializeAnimationControls: () => (/* binding */ initializeAnimationControls)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");


const initializeAnimationControls = (mixer, action, clip, gui) => {
  const props = {
    repetitions: Infinity,
    // warp
    warpStartTimeScale: 1,
    warpEndTimeScale: 1,
    warpDurationInSeconds: 2,
    warp: function () {
      action.warp(props.warpStartTimeScale, props.warpEndTimeScale, props.warpDurationInSeconds)
    },
    fadeDurationInSeconds: 2,
    fadeIn: function () {
      action.fadeIn(props.fadeDurationInSeconds)
    },
    fadeOut: function () {
      action.fadeOut(props.fadeDurationInSeconds)
    }
  }

  const mixerFolder = gui.addFolder('AnimationMixer')
  mixerFolder.add(mixer, 'time').listen()
  mixerFolder.add(mixer, 'timeScale', 0, 5)
  mixerFolder.add(mixer, 'stopAllAction')

  const actionFolder = gui.addFolder('AnimationAction')

  actionFolder.add(action, 'clampWhenFinished').listen()
  actionFolder.add(action, 'enabled').listen()
  actionFolder.add(action, 'paused').listen()
  actionFolder
    .add(action, 'loop', {
      LoopRepeat: three__WEBPACK_IMPORTED_MODULE_0__.LoopRepeat,
      LoopOnce: three__WEBPACK_IMPORTED_MODULE_0__.LoopOnce,
      LoopPingPong: three__WEBPACK_IMPORTED_MODULE_0__.LoopPingPong
    })
    .onChange((e) => {
      if (e == three__WEBPACK_IMPORTED_MODULE_0__.LoopOnce || e == three__WEBPACK_IMPORTED_MODULE_0__.LoopPingPong) {
        action.reset()
        action.repetitions = undefined
        action.setLoop(parseInt(e), undefined)
      } else {
        action.setLoop(parseInt(e), action.repetitions)
      }
    })
  actionFolder
    .add(action, 'repetitions', 0, 100, 1)
    .listen()
    .onChange(function (e) {
      if (action.loop == three__WEBPACK_IMPORTED_MODULE_0__.LoopOnce || action.loop == three__WEBPACK_IMPORTED_MODULE_0__.LoopPingPong) {
        action.reset()
        action.repetitions = undefined
        action.setLoop(parseInt(action.loop), undefined)
      } else {
        action.setLoop(parseInt(e), action.repetitions)
      }
    })
  actionFolder.add(action, 'time', 0, clip.duration, 0.001).listen()
  actionFolder.add(action, 'timeScale', 0, 5, 0.1).listen()
  actionFolder.add(action, 'weight', 0, 1, 0.01).listen()
  actionFolder.add(action, 'zeroSlopeAtEnd').listen()
  actionFolder.add(action, 'zeroSlopeAtStart').listen()
  actionFolder.add(action, 'stop')
  actionFolder.add(action, 'play')
  actionFolder.add(action, 'reset')
  actionFolder.add(props, 'warpStartTimeScale', 0, 10, 0.01)
  actionFolder.add(props, 'warpEndTimeScale', 0, 10, 0.01)
  actionFolder.add(props, 'warpDurationInSeconds', 0, 10, 0.01)
  actionFolder.add(props, 'warp')
  actionFolder.add(props, 'fadeDurationInSeconds', 0, 10, 0.01)
  actionFolder.add(props, 'fadeIn')
  actionFolder.add(props, 'fadeOut')

  return {
    actionFolder,
    mixerFolder
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
/******/ 			"load-md2": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","vendors-node_modules_three_examples_jsm_loaders_MD2Loader_js"], () => (__webpack_require__("./samples/chapters/chapter-9/load-md2.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0EsNEc7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvYm9vdHN0cmFwL2Jvb3RzdHJhcC5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvYm9vdHN0cmFwL2Zsb29yLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9ib290c3RyYXAvbGlnaHRpbmcuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItOS9sb2FkLW1kMi5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci05L3V0aWwvc3RhbmRhcmQtc2NlbmUuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NvbnRyb2xsZXIvb3JiaXQtY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY29udHJvbHMvYW5pbWF0aW9uLWNvbnRyb2xzLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jb250cm9scy9yZW5kZXJlci1jb250cm9sLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jb250cm9scy9zY2VuZS1jb250cm9scy5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvdXRpbC9tb2RlbFV0aWwuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL3V0aWwvdXBkYXRlLW9uLXJlc2l6ZS5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuaW1wb3J0IHsgaW5pdE9yYml0Q29udHJvbHMgfSBmcm9tICcuLi9jb250cm9sbGVyL29yYml0LWNvbnRyb2xsZXInXG5pbXBvcnQgeyBpbml0TGlnaHRpbmcgfSBmcm9tICcuL2xpZ2h0aW5nJ1xuaW1wb3J0IHsgb25SZXNpemUgfSBmcm9tICcuLi91dGlsL3VwZGF0ZS1vbi1yZXNpemUnXG5cbmV4cG9ydCBjb25zdCBpbml0U2NlbmUgPSAoeyBiYWNrZ3JvdW5kQ29sb3IsIGZvZ0NvbG9yLCBkaXNhYmxlU2hhZG93cywgZGlzYWJsZUxpZ2h0cywgZGlzYWJsZURlZmF1bHRDb250cm9scyB9KSA9PiB7XG4gIGNvbnN0IGluaXQgPSAoZm4pID0+IHtcbiAgICAvLyBiYXNpYyBzY2VuZSBzZXR1cFxuICAgIGNvbnN0IHNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKClcbiAgICBpZiAoYmFja2dyb3VuZENvbG9yKSB7XG4gICAgICBzY2VuZS5iYWNrZ3JvdW5kQ29sb3IgPSBiYWNrZ3JvdW5kQ29sb3JcbiAgICB9XG5cbiAgICBpZiAoZm9nQ29sb3IpIHtcbiAgICAgIHNjZW5lLmZvZyA9IG5ldyBUSFJFRS5Gb2coZm9nQ29sb3IsIDAuMDAyNSwgNTApXG4gICAgfVxuXG4gICAgLy8gc2V0dXAgY2FtZXJhIGFuZCBiYXNpYyByZW5kZXJlclxuICAgIGNvbnN0IGNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg3NSwgd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQsIDAuMSwgMTAwMClcbiAgICBjb25zdCByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHsgYW50aWFsaWFzOiB0cnVlIH0pXG4gICAgcmVuZGVyZXIub3V0cHV0RW5jb2RpbmcgPSBUSFJFRS5zUkdCRW5jb2RpbmdcbiAgICByZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IHRydWVcbiAgICByZW5kZXJlci5zaGFkb3dNYXAudHlwZSA9IFRIUkVFLlZTTVNoYWRvd01hcFxuICAgIHJlbmRlcmVyLnNldENsZWFyQ29sb3IoYmFja2dyb3VuZENvbG9yKVxuXG4gICAgb25SZXNpemUoY2FtZXJhLCByZW5kZXJlcilcbiAgICByZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci5kb21FbGVtZW50KVxuXG4gICAgLy8gaW5pdGlhbGl6ZSBvcmJpdCBjb250cm9sc1xuICAgIGxldCBvcmJpdENvbnRyb2xzXG4gICAgaWYgKCFkaXNhYmxlRGVmYXVsdENvbnRyb2xzKSB7XG4gICAgICBvcmJpdENvbnRyb2xzID0gaW5pdE9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlcilcbiAgICB9XG5cbiAgICAvLyBhZGQgc29tZSBiYXNpYyBsaWdodGluZyB0byB0aGUgc2NlbmVcbiAgICBpZiAoIWRpc2FibGVMaWdodHMgPz8gZmFsc2UpIHtcbiAgICAgIGluaXRMaWdodGluZyhzY2VuZSwgeyBkaXNhYmxlU2hhZG93cyB9KVxuICAgIH1cblxuICAgIGZuKHsgc2NlbmUsIGNhbWVyYSwgcmVuZGVyZXIsIG9yYml0Q29udHJvbHMgfSlcbiAgfVxuXG4gIHJldHVybiBpbml0XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcblxuZXhwb3J0IGNvbnN0IGZvcmV2ZXJQbGFuZSA9IChzY2VuZSkgPT4ge1xuICBjb25zdCBnZW8gPSBuZXcgVEhSRUUuUGxhbmVCdWZmZXJHZW9tZXRyeSgxMDAwMCwgMTAwMDApXG4gIGNvbnN0IG1hdCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHtcbiAgICBjb2xvcjogMHhmZmZmZmZcbiAgfSlcbiAgY29uc3QgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlbywgbWF0KVxuICBtZXNoLnBvc2l0aW9uLnNldCgwLCAtMiwgMClcbiAgbWVzaC5yb3RhdGlvbi5zZXQoTWF0aC5QSSAvIC0yLCAwLCAwKVxuICBtZXNoLnJlY2VpdmVTaGFkb3cgPSB0cnVlXG4gIG1lc2gubmFtZSA9ICdmb3JldmVyLWZsb29yJ1xuICBzY2VuZS5hZGQobWVzaClcblxuICByZXR1cm4gbWVzaFxufVxuXG5leHBvcnQgY29uc3QgZmxvYXRpbmdGbG9vciA9IChzY2VuZSwgc2l6ZSkgPT4ge1xuICBjb25zdCBzID0gc2l6ZSA/IHNpemUgOiA2XG4gIGNvbnN0IGdlbyA9IG5ldyBUSFJFRS5Cb3hCdWZmZXJHZW9tZXRyeShzLCAwLjI1LCBzLCAxMCwgMTAsIDEwKVxuICBjb25zdCBtYXQgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoe1xuICAgIGNvbG9yOiAweGRkZGRkZFxuICB9KVxuICBjb25zdCBtZXNoID0gbmV3IFRIUkVFLk1lc2goZ2VvLCBtYXQpXG4gIG1lc2gucG9zaXRpb24uc2V0KDAsIC0yLCAtMSlcbiAgbWVzaC5yZWNlaXZlU2hhZG93ID0gdHJ1ZVxuICBtZXNoLm5hbWUgPSAnZmxvYXRpbmctZmxvb3InXG4gIHNjZW5lLmFkZChtZXNoKVxuXG4gIHJldHVybiBtZXNoXG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcblxuZXhwb3J0IGNvbnN0IGluaXRMaWdodGluZyA9IChzY2VuZSwgeyBkaXNhYmxlU2hhZG93cyB9KSA9PiB7XG4gIC8vIGh0dHBzOi8vdGhyZWVqcy5vcmcvZXhhbXBsZXMvP3E9c2hhZG8jd2ViZ2xfc2hhZG93bWFwX3ZzbVxuICBzY2VuZS5hZGQobmV3IFRIUkVFLkFtYmllbnRMaWdodCgweDY2NjY2NikpXG5cbiAgLy8gY29uc3QgZGlyTGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGFhYWFhYSlcbiAgY29uc3QgZGlyTGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGFhYWFhYSlcbiAgZGlyTGlnaHQucG9zaXRpb24uc2V0KDUsIDEyLCA4KVxuICBkaXJMaWdodC5jYXN0U2hhZG93ID0gIWRpc2FibGVTaGFkb3dzID8gdHJ1ZSA6IGZhbHNlXG4gIGRpckxpZ2h0LmludGVuc2l0eSA9IDFcbiAgZGlyTGlnaHQuc2hhZG93LmNhbWVyYS5uZWFyID0gMC4xXG4gIGRpckxpZ2h0LnNoYWRvdy5jYW1lcmEuZmFyID0gMjAwXG4gIGRpckxpZ2h0LnNoYWRvdy5jYW1lcmEucmlnaHQgPSAxMFxuICBkaXJMaWdodC5zaGFkb3cuY2FtZXJhLmxlZnQgPSAtMTBcbiAgZGlyTGlnaHQuc2hhZG93LmNhbWVyYS50b3AgPSAxMFxuICBkaXJMaWdodC5zaGFkb3cuY2FtZXJhLmJvdHRvbSA9IC0xMFxuICBkaXJMaWdodC5zaGFkb3cubWFwU2l6ZS53aWR0aCA9IDIwNDhcbiAgZGlyTGlnaHQuc2hhZG93Lm1hcFNpemUuaGVpZ2h0ID0gMjA0OFxuICBkaXJMaWdodC5zaGFkb3cucmFkaXVzID0gNFxuICBkaXJMaWdodC5zaGFkb3cuYmlhcyA9IC0wLjAwMDA1XG5cbiAgc2NlbmUuYWRkKGRpckxpZ2h0KVxufVxuIiwiaW1wb3J0IHsgYm9vdHN0cmFwTWVzaFNjZW5lIH0gZnJvbSAnLi91dGlsL3N0YW5kYXJkLXNjZW5lJ1xuaW1wb3J0IHsgTUQyTG9hZGVyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvTUQyTG9hZGVyJ1xuaW1wb3J0IHsgYXBwbHlTaGFkb3dzQW5kRGVwdGhXcml0ZSB9IGZyb20gJy4uLy4uL3V0aWwvbW9kZWxVdGlsJ1xuaW1wb3J0IHsgT3JiaXRDb250cm9scyB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9jb250cm9scy9PcmJpdENvbnRyb2xzJ1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5pbXBvcnQgeyBpbml0aWFsaXplQW5pbWF0aW9uQ29udHJvbHMgfSBmcm9tICcuLi8uLi9jb250cm9scy9hbmltYXRpb24tY29udHJvbHMnXG5cbmxldCBhbmltYXRpb25zID0gW11cbmNvbnN0IGxvYWRNb2RlbCA9ICgpID0+IHtcbiAgY29uc3QgbG9hZGVyID0gbmV3IE1EMkxvYWRlcigpXG4gIHJldHVybiBsb2FkZXIubG9hZEFzeW5jKCcvYXNzZXRzL21vZGVscy9vZ3JlL29ncm8ubWQyJykudGhlbigob2JqZWN0KSA9PiB7XG4gICAgY29uc3QgbWF0ID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcbiAgICAgIGNvbG9yOiAweGZmZmZmZixcbiAgICAgIG1ldGFsbmVzczogMCxcbiAgICAgIG1hcDogbmV3IFRIUkVFLlRleHR1cmVMb2FkZXIoKS5sb2FkKCcvYXNzZXRzL21vZGVscy9vZ3JlL3NraW5zL3NraW4uanBnJylcbiAgICB9KVxuXG4gICAgYW5pbWF0aW9ucyA9IG9iamVjdC5hbmltYXRpb25zXG5cbiAgICBjb25zdCBtZXNoID0gbmV3IFRIUkVFLk1lc2gob2JqZWN0LCBtYXQpXG4gICAgYXBwbHlTaGFkb3dzQW5kRGVwdGhXcml0ZShtZXNoKVxuICAgIG1lc2guc2NhbGUuc2V0U2NhbGFyKDAuMSlcbiAgICBtZXNoLnRyYW5zbGF0ZVkoMC41KVxuICAgIHJldHVybiBtZXNoXG4gIH0pXG59XG5cbmxldCBtaXhlciA9IHVuZGVmaW5lZFxuXG5ib290c3RyYXBNZXNoU2NlbmUoe1xuICBsb2FkTWVzaDogbG9hZE1vZGVsLFxuICBhZGRDb250cm9sczogKGNhbWVyYSwgcmVuZGVyZXIsIHNjZW5lLCBndWksIG1lc2gpID0+IHtcbiAgICBjb25zdCBjb250cm9scyA9IG5ldyBPcmJpdENvbnRyb2xzKGNhbWVyYSwgcmVuZGVyZXIuZG9tRWxlbWVudClcbiAgICBjb25zb2xlLmxvZyhtZXNoLmFuaW1hdGlvbnMpXG5cbiAgICBtaXhlciA9IG5ldyBUSFJFRS5BbmltYXRpb25NaXhlcihtZXNoKVxuICAgIGNvbnN0IGFjdGlvbiA9IG1peGVyLmNsaXBBY3Rpb24oYW5pbWF0aW9uc1s5XSlcbiAgICBhY3Rpb24ucGxheSgpXG4gICAgaW5pdGlhbGl6ZUFuaW1hdGlvbkNvbnRyb2xzKG1peGVyLCBhY3Rpb24sIGFuaW1hdGlvbnNbMF0sIGd1aSlcblxuICAgIHJldHVybiBjb250cm9sc1xuICB9LFxuICBvblJlbmRlcjogKGNsb2NrKSA9PiB7XG4gICAgaWYgKG1peGVyKSB7XG4gICAgICBtaXhlci51cGRhdGUoY2xvY2suZ2V0RGVsdGEoKSlcbiAgICB9XG4gIH1cbn0pLnRoZW4oKVxuIiwiaW1wb3J0IHsgaW5pdFNjZW5lIH0gZnJvbSAnLi4vLi4vLi4vYm9vdHN0cmFwL2Jvb3RzdHJhcCdcbmltcG9ydCB7IGludGlhbGl6ZVJlbmRlcmVyQ29udHJvbHMgfSBmcm9tICcuLi8uLi8uLi9jb250cm9scy9yZW5kZXJlci1jb250cm9sJ1xuXG5pbXBvcnQgR1VJIGZyb20gJ2xpbC1ndWknXG5pbXBvcnQgeyBpbml0aWFsaXplU2NlbmVDb250cm9scyB9IGZyb20gJy4uLy4uLy4uL2NvbnRyb2xzL3NjZW5lLWNvbnRyb2xzJ1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5pbXBvcnQgeyBmbG9hdGluZ0Zsb29yIH0gZnJvbSAnLi4vLi4vLi4vYm9vdHN0cmFwL2Zsb29yJ1xuXG5leHBvcnQgY29uc3QgYm9vdHN0cmFwTWVzaFNjZW5lID0gYXN5bmMgKHtcbiAgbG9hZE1lc2gsXG4gIHByb3ZpZGVHdWksXG4gIGhpZGVmbG9vcixcbiAgZmxvb3JTaXplLFxuICBiYWNrZ3JvdW5kQ29sb3IsXG4gIG9uUmVuZGVyLFxuICBhZGRDb250cm9sc1xufSkgPT4ge1xuICBjb25zdCBwcm9wcyA9IHtcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IGJhY2tncm91bmRDb2xvciA/PyAweGZmZmZmZixcbiAgICBkaXNhYmxlRGVmYXVsdENvbnRyb2xzOiB0cnVlXG4gIH1cblxuICBjb25zdCBtZXNoID0gYXdhaXQgbG9hZE1lc2goKVxuXG4gIGNvbnN0IGd1aSA9IG5ldyBHVUkoKVxuICBjb25zdCBjbG9jayA9IG5ldyBUSFJFRS5DbG9jaygpXG5cbiAgY29uc3QgaW5pdCA9IGFzeW5jICgpID0+IHtcbiAgICBpbml0U2NlbmUocHJvcHMpKCh7IHNjZW5lLCBjYW1lcmEsIHJlbmRlcmVyIH0pID0+IHtcbiAgICAgIHJlbmRlcmVyLnNoYWRvd01hcC50eXBlID0gVEhSRUUuUENGU29mdFNoYWRvd01hcFxuICAgICAgY2FtZXJhLnBvc2l0aW9uLnggPSAtM1xuICAgICAgY2FtZXJhLnBvc2l0aW9uLnogPSA4XG4gICAgICBjYW1lcmEucG9zaXRpb24ueSA9IDJcblxuICAgICAgaGlkZWZsb29yID8/IGZsb2F0aW5nRmxvb3Ioc2NlbmUsIGZsb29yU2l6ZSA/PyA4KVxuXG4gICAgICBpZiAobWVzaCkgc2NlbmUuYWRkKG1lc2gpXG5cbiAgICAgIGludGlhbGl6ZVJlbmRlcmVyQ29udHJvbHMoZ3VpLCByZW5kZXJlcilcbiAgICAgIGluaXRpYWxpemVTY2VuZUNvbnRyb2xzKGd1aSwgc2NlbmUsIGZhbHNlKVxuXG4gICAgICBpZiAocHJvdmlkZUd1aSkgcHJvdmlkZUd1aShndWksIG1lc2gsIHNjZW5lKVxuICAgICAgbGV0IGNvbnRyb2xzID0gdW5kZWZpbmVkXG4gICAgICBpZiAoYWRkQ29udHJvbHMpIHtcbiAgICAgICAgY29udHJvbHMgPSBhZGRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLCBzY2VuZSwgZ3VpLCBtZXNoKVxuICAgICAgfVxuXG4gICAgICBhbmltYXRlKClcblxuICAgICAgZnVuY3Rpb24gYW5pbWF0ZSgpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpXG4gICAgICAgIHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhKVxuICAgICAgICBpZiAob25SZW5kZXIpIG9uUmVuZGVyKGNsb2NrLCBjb250cm9scywgY2FtZXJhLCBzY2VuZSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgaW5pdCgpLnRoZW4oKVxufVxuIiwiaW1wb3J0IHsgT3JiaXRDb250cm9scyB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9jb250cm9scy9PcmJpdENvbnRyb2xzJ1xuXG5leHBvcnQgY29uc3QgaW5pdE9yYml0Q29udHJvbHMgPSAoY2FtZXJhLCByZW5kZXJlcikgPT4ge1xuICBjb25zdCBjb250cm9sbGVyID0gbmV3IE9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlci5kb21FbGVtZW50KVxuICBjb250cm9sbGVyLmVuYWJsZURhbXBpbmcgPSB0cnVlXG4gIGNvbnRyb2xsZXIuZGFtcGluZ0ZhY3RvciA9IDAuMDVcbiAgY29udHJvbGxlci5taW5EaXN0YW5jZSA9IDFcbiAgY29udHJvbGxlci5tYXhEaXN0YW5jZSA9IDEwMFxuICBjb250cm9sbGVyLm1pblBvbGFyQW5nbGUgPSBNYXRoLlBJIC8gNFxuICBjb250cm9sbGVyLm1heFBvbGFyQW5nbGUgPSAoMyAqIE1hdGguUEkpIC8gNFxuXG4gIHJldHVybiBjb250cm9sbGVyXG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVBbmltYXRpb25Db250cm9scyA9IChtaXhlciwgYWN0aW9uLCBjbGlwLCBndWkpID0+IHtcbiAgY29uc3QgcHJvcHMgPSB7XG4gICAgcmVwZXRpdGlvbnM6IEluZmluaXR5LFxuICAgIC8vIHdhcnBcbiAgICB3YXJwU3RhcnRUaW1lU2NhbGU6IDEsXG4gICAgd2FycEVuZFRpbWVTY2FsZTogMSxcbiAgICB3YXJwRHVyYXRpb25JblNlY29uZHM6IDIsXG4gICAgd2FycDogZnVuY3Rpb24gKCkge1xuICAgICAgYWN0aW9uLndhcnAocHJvcHMud2FycFN0YXJ0VGltZVNjYWxlLCBwcm9wcy53YXJwRW5kVGltZVNjYWxlLCBwcm9wcy53YXJwRHVyYXRpb25JblNlY29uZHMpXG4gICAgfSxcbiAgICBmYWRlRHVyYXRpb25JblNlY29uZHM6IDIsXG4gICAgZmFkZUluOiBmdW5jdGlvbiAoKSB7XG4gICAgICBhY3Rpb24uZmFkZUluKHByb3BzLmZhZGVEdXJhdGlvbkluU2Vjb25kcylcbiAgICB9LFxuICAgIGZhZGVPdXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGFjdGlvbi5mYWRlT3V0KHByb3BzLmZhZGVEdXJhdGlvbkluU2Vjb25kcylcbiAgICB9XG4gIH1cblxuICBjb25zdCBtaXhlckZvbGRlciA9IGd1aS5hZGRGb2xkZXIoJ0FuaW1hdGlvbk1peGVyJylcbiAgbWl4ZXJGb2xkZXIuYWRkKG1peGVyLCAndGltZScpLmxpc3RlbigpXG4gIG1peGVyRm9sZGVyLmFkZChtaXhlciwgJ3RpbWVTY2FsZScsIDAsIDUpXG4gIG1peGVyRm9sZGVyLmFkZChtaXhlciwgJ3N0b3BBbGxBY3Rpb24nKVxuXG4gIGNvbnN0IGFjdGlvbkZvbGRlciA9IGd1aS5hZGRGb2xkZXIoJ0FuaW1hdGlvbkFjdGlvbicpXG5cbiAgYWN0aW9uRm9sZGVyLmFkZChhY3Rpb24sICdjbGFtcFdoZW5GaW5pc2hlZCcpLmxpc3RlbigpXG4gIGFjdGlvbkZvbGRlci5hZGQoYWN0aW9uLCAnZW5hYmxlZCcpLmxpc3RlbigpXG4gIGFjdGlvbkZvbGRlci5hZGQoYWN0aW9uLCAncGF1c2VkJykubGlzdGVuKClcbiAgYWN0aW9uRm9sZGVyXG4gICAgLmFkZChhY3Rpb24sICdsb29wJywge1xuICAgICAgTG9vcFJlcGVhdDogVEhSRUUuTG9vcFJlcGVhdCxcbiAgICAgIExvb3BPbmNlOiBUSFJFRS5Mb29wT25jZSxcbiAgICAgIExvb3BQaW5nUG9uZzogVEhSRUUuTG9vcFBpbmdQb25nXG4gICAgfSlcbiAgICAub25DaGFuZ2UoKGUpID0+IHtcbiAgICAgIGlmIChlID09IFRIUkVFLkxvb3BPbmNlIHx8IGUgPT0gVEhSRUUuTG9vcFBpbmdQb25nKSB7XG4gICAgICAgIGFjdGlvbi5yZXNldCgpXG4gICAgICAgIGFjdGlvbi5yZXBldGl0aW9ucyA9IHVuZGVmaW5lZFxuICAgICAgICBhY3Rpb24uc2V0TG9vcChwYXJzZUludChlKSwgdW5kZWZpbmVkKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWN0aW9uLnNldExvb3AocGFyc2VJbnQoZSksIGFjdGlvbi5yZXBldGl0aW9ucylcbiAgICAgIH1cbiAgICB9KVxuICBhY3Rpb25Gb2xkZXJcbiAgICAuYWRkKGFjdGlvbiwgJ3JlcGV0aXRpb25zJywgMCwgMTAwLCAxKVxuICAgIC5saXN0ZW4oKVxuICAgIC5vbkNoYW5nZShmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKGFjdGlvbi5sb29wID09IFRIUkVFLkxvb3BPbmNlIHx8IGFjdGlvbi5sb29wID09IFRIUkVFLkxvb3BQaW5nUG9uZykge1xuICAgICAgICBhY3Rpb24ucmVzZXQoKVxuICAgICAgICBhY3Rpb24ucmVwZXRpdGlvbnMgPSB1bmRlZmluZWRcbiAgICAgICAgYWN0aW9uLnNldExvb3AocGFyc2VJbnQoYWN0aW9uLmxvb3ApLCB1bmRlZmluZWQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhY3Rpb24uc2V0TG9vcChwYXJzZUludChlKSwgYWN0aW9uLnJlcGV0aXRpb25zKVxuICAgICAgfVxuICAgIH0pXG4gIGFjdGlvbkZvbGRlci5hZGQoYWN0aW9uLCAndGltZScsIDAsIGNsaXAuZHVyYXRpb24sIDAuMDAxKS5saXN0ZW4oKVxuICBhY3Rpb25Gb2xkZXIuYWRkKGFjdGlvbiwgJ3RpbWVTY2FsZScsIDAsIDUsIDAuMSkubGlzdGVuKClcbiAgYWN0aW9uRm9sZGVyLmFkZChhY3Rpb24sICd3ZWlnaHQnLCAwLCAxLCAwLjAxKS5saXN0ZW4oKVxuICBhY3Rpb25Gb2xkZXIuYWRkKGFjdGlvbiwgJ3plcm9TbG9wZUF0RW5kJykubGlzdGVuKClcbiAgYWN0aW9uRm9sZGVyLmFkZChhY3Rpb24sICd6ZXJvU2xvcGVBdFN0YXJ0JykubGlzdGVuKClcbiAgYWN0aW9uRm9sZGVyLmFkZChhY3Rpb24sICdzdG9wJylcbiAgYWN0aW9uRm9sZGVyLmFkZChhY3Rpb24sICdwbGF5JylcbiAgYWN0aW9uRm9sZGVyLmFkZChhY3Rpb24sICdyZXNldCcpXG4gIGFjdGlvbkZvbGRlci5hZGQocHJvcHMsICd3YXJwU3RhcnRUaW1lU2NhbGUnLCAwLCAxMCwgMC4wMSlcbiAgYWN0aW9uRm9sZGVyLmFkZChwcm9wcywgJ3dhcnBFbmRUaW1lU2NhbGUnLCAwLCAxMCwgMC4wMSlcbiAgYWN0aW9uRm9sZGVyLmFkZChwcm9wcywgJ3dhcnBEdXJhdGlvbkluU2Vjb25kcycsIDAsIDEwLCAwLjAxKVxuICBhY3Rpb25Gb2xkZXIuYWRkKHByb3BzLCAnd2FycCcpXG4gIGFjdGlvbkZvbGRlci5hZGQocHJvcHMsICdmYWRlRHVyYXRpb25JblNlY29uZHMnLCAwLCAxMCwgMC4wMSlcbiAgYWN0aW9uRm9sZGVyLmFkZChwcm9wcywgJ2ZhZGVJbicpXG4gIGFjdGlvbkZvbGRlci5hZGQocHJvcHMsICdmYWRlT3V0JylcblxuICByZXR1cm4ge1xuICAgIGFjdGlvbkZvbGRlcixcbiAgICBtaXhlckZvbGRlclxuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcblxuY29uc3QgZW51bXMgPSB7XG4gIHRvbmVNYXBwaW5nT3B0aW9uczoge1xuICAgIE5vbmU6IFRIUkVFLk5vVG9uZU1hcHBpbmcsXG4gICAgTGluZWFyOiBUSFJFRS5MaW5lYXJUb25lTWFwcGluZyxcbiAgICBSZWluaGFyZDogVEhSRUUuUmVpbmhhcmRUb25lTWFwcGluZyxcbiAgICBDaW5lb246IFRIUkVFLkNpbmVvblRvbmVNYXBwaW5nLFxuICAgIEFDRVNGaWxtaWM6IFRIUkVFLkFDRVNGaWxtaWNUb25lTWFwcGluZyxcbiAgICBDdXN0b206IFRIUkVFLkN1c3RvbVRvbmVNYXBwaW5nLFxuICB9LFxuICBzaGFkb3dNYXBwaW5nOiB7XG4gICAgQmFzaWM6IFRIUkVFLkJhc2ljU2hhZG93TWFwLFxuICAgIFBDRlM6IFRIUkVFLlBDRlNoYWRvd01hcCxcbiAgICBQQ0ZTb2Z0OiBUSFJFRS5QQ0ZTb2Z0U2hhZG93TWFwLFxuICAgIFZTTTogVEhSRUUuVlNNU2hhZG93TWFwLFxuICB9LFxuICBvdXRwdXRFbmNvZGluZ3M6IHtcbiAgICBMaW5lYXI6IFRIUkVFLkxpbmVhckVuY29kaW5nLFxuICAgIHNSR0I6IFRIUkVFLnNSR0JFbmNvZGluZyxcbiAgfSxcbn07XG5cbmNvbnN0IGdldFByb3BlcnR5SG9sZGVyID0gKHdlYkdMUmVuZGVyZXIpID0+IHtcbiAgY29uc3QgY2xlYXJDb2xvckhvbGRlciA9IG5ldyBUSFJFRS5Db2xvcigpO1xuICB3ZWJHTFJlbmRlcmVyLmdldENsZWFyQ29sb3IoY2xlYXJDb2xvckhvbGRlcik7XG5cbiAgY29uc3QgaG9sZGVyID0ge1xuICAgIG1haW46IHtcbiAgICAgIG91dHB1dEVuY29kaW5nOiB3ZWJHTFJlbmRlcmVyLm91dHB1dEVuY29kaW5nLFxuICAgIH0sXG4gICAgc2hhZG93TWFwOiB7XG4gICAgICBlbmFibGVkOiB3ZWJHTFJlbmRlcmVyLnNoYWRvd01hcC5lbmFibGVkLFxuICAgICAgYXV0b1VwZGF0ZTogd2ViR0xSZW5kZXJlci5zaGFkb3dNYXAuYXV0b1VwZGF0ZSxcbiAgICAgIG5lZWRzVXBkYXRlOiAoKSA9PiAod2ViR0xSZW5kZXJlci5zaGFkb3dNYXAubmVlZHNVcGRhdGUgPSB0cnVlKSxcbiAgICAgIHR5cGU6IHdlYkdMUmVuZGVyZXIuc2hhZG93TWFwLnR5cGUsXG4gICAgfSxcbiAgICB0b25lTWFwcGluZzoge1xuICAgICAgZXhwb3N1cmU6IHdlYkdMUmVuZGVyZXIudG9uZU1hcHBpbmdFeHBvc3VyZSxcbiAgICAgIHRvbmVNYXBwaW5nOiB3ZWJHTFJlbmRlcmVyLnRvbmVNYXBwaW5nLFxuICAgIH0sXG4gICAgY2xlYXJTZXR0aW5nczoge1xuICAgICAgYXV0b0NsZWFyOiB3ZWJHTFJlbmRlcmVyLmF1dG9DbGVhcixcbiAgICAgIGNsZWFyQ29sb3I6IGNsZWFyQ29sb3JIb2xkZXIuZ2V0U3R5bGUoKSxcbiAgICB9LFxuICAgIGFkdmFuY2VkOiB7XG4gICAgICBhdXRvQ2xlYXJEZXB0aDogd2ViR0xSZW5kZXJlci5hdXRvQ2xlYXJEZXB0aCxcbiAgICAgIGF1dG9DbGVhclN0ZW5jaWw6IHdlYkdMUmVuZGVyZXIuYXV0b0NsZWFyU3RlbmNpbCxcbiAgICAgIGNoZWNrU2hhZGVyRXJyb3JzOiB3ZWJHTFJlbmRlcmVyLmRlYnVnLmNoZWNrU2hhZGVyRXJyb3JzLFxuICAgICAgc29ydE9iamVjdHM6IHdlYkdMUmVuZGVyZXIuc29ydE9iamVjdHMsXG4gICAgICBsb2NhbENsaXBwaW5nRW5hYmxlZDogd2ViR0xSZW5kZXJlci5sb2NhbENsaXBwaW5nRW5hYmxlZCxcbiAgICAgIHBoeXNpY2FsbHlDb3JyZWN0TGlnaHRzOiB3ZWJHTFJlbmRlcmVyLnBoeXNpY2FsbHlDb3JyZWN0TGlnaHRzLFxuICAgIH0sXG4gIH07XG5cbiAgcmV0dXJuIGhvbGRlcjtcbn07XG5cbmV4cG9ydCBjb25zdCBpbnRpYWxpemVSZW5kZXJlckNvbnRyb2xzID0gKGd1aSwgd2ViR0xSZW5kZXJlcikgPT4ge1xuICBjb25zdCBwcm9wZXJ0aWVzT2JqZWN0ID0gZ2V0UHJvcGVydHlIb2xkZXIod2ViR0xSZW5kZXJlcik7XG4gIGNvbnN0IHJlbmRlcmVyRm9sZGVyID0gZ3VpLmFkZEZvbGRlcihcIldlYkdMUmVuZGVyZXJcIik7XG5cbiAgcmVuZGVyZXJGb2xkZXIub25DaGFuZ2UoKF8pID0+IHtcbiAgICB1cGRhdGVXZWJHTFJlbmRlcmVyUHJvcGVydGllcyh3ZWJHTFJlbmRlcmVyLCBwcm9wZXJ0aWVzT2JqZWN0KTtcbiAgfSk7XG5cbiAgcmVuZGVyZXJGb2xkZXIuYWRkKFxuICAgIHByb3BlcnRpZXNPYmplY3QubWFpbixcbiAgICBcIm91dHB1dEVuY29kaW5nXCIsXG4gICAgZW51bXMub3V0cHV0RW5jb2RpbmdzXG4gICk7XG5cbiAgY29uc3Qgc2hhZG93Rm9sZGVyID0gcmVuZGVyZXJGb2xkZXIuYWRkRm9sZGVyKFwiU2hhZG93XCIpO1xuICBzaGFkb3dGb2xkZXIuYWRkKHByb3BlcnRpZXNPYmplY3Quc2hhZG93TWFwLCBcImVuYWJsZWRcIik7XG4gIHNoYWRvd0ZvbGRlci5hZGQocHJvcGVydGllc09iamVjdC5zaGFkb3dNYXAsIFwiYXV0b1VwZGF0ZVwiKTtcbiAgc2hhZG93Rm9sZGVyLmFkZChwcm9wZXJ0aWVzT2JqZWN0LnNoYWRvd01hcCwgXCJuZWVkc1VwZGF0ZVwiKTtcbiAgc2hhZG93Rm9sZGVyXG4gICAgLmFkZChwcm9wZXJ0aWVzT2JqZWN0LnNoYWRvd01hcCwgXCJ0eXBlXCIsIGVudW1zLnNoYWRvd01hcHBpbmcpXG4gICAgLmVuYWJsZShmYWxzZSk7IC8vIGNhbid0IHVwZGF0ZSB0aGUgc2hhZG93IG1hcHBpbmcgdHlwZSBpbiBydW50aW1lXG5cbiAgY29uc3QgdG9uZU1hcHBpbmdGb2xkZXIgPSByZW5kZXJlckZvbGRlci5hZGRGb2xkZXIoXCJUb25lTWFwcGluZ1wiKTtcbiAgdG9uZU1hcHBpbmdGb2xkZXIuYWRkKHByb3BlcnRpZXNPYmplY3QudG9uZU1hcHBpbmcsIFwiZXhwb3N1cmVcIiwgMCwgMik7XG4gIHRvbmVNYXBwaW5nRm9sZGVyLmFkZChcbiAgICBwcm9wZXJ0aWVzT2JqZWN0LnRvbmVNYXBwaW5nLFxuICAgIFwidG9uZU1hcHBpbmdcIixcbiAgICBlbnVtcy50b25lTWFwcGluZ09wdGlvbnNcbiAgKTtcblxuICBjb25zdCBjbGVhclNldHRpbmdzRm9sZGVyID0gcmVuZGVyZXJGb2xkZXIuYWRkRm9sZGVyKFwiY2xlYXJTZXR0aW5nc1wiKTtcbiAgY2xlYXJTZXR0aW5nc0ZvbGRlci5hZGQocHJvcGVydGllc09iamVjdC5jbGVhclNldHRpbmdzLCBcImF1dG9DbGVhclwiKTtcbiAgY2xlYXJTZXR0aW5nc0ZvbGRlci5hZGRDb2xvcihwcm9wZXJ0aWVzT2JqZWN0LmNsZWFyU2V0dGluZ3MsIFwiY2xlYXJDb2xvclwiKTtcblxuICByZW5kZXJlckZvbGRlci5jbG9zZSgpO1xufTtcblxuY29uc3QgdXBkYXRlV2ViR0xSZW5kZXJlclByb3BlcnRpZXMgPSAod2ViR0xSZW5kZXJlciwgcHJvcGVydHlIb2xkZXIpID0+IHtcbiAgd2ViR0xSZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IHByb3BlcnR5SG9sZGVyLnNoYWRvd01hcC5lbmFibGVkO1xuICB3ZWJHTFJlbmRlcmVyLnNoYWRvd01hcC5hdXRvVXBkYXRlID0gcHJvcGVydHlIb2xkZXIuc2hhZG93TWFwLmF1dG9VcGRhdGU7XG4gIHdlYkdMUmVuZGVyZXIuc2hhZG93TWFwLm5lZWRzVXBkYXRlID0gcHJvcGVydHlIb2xkZXIuc2hhZG93TWFwLm5lZWRzVXBkYXRlO1xuICB3ZWJHTFJlbmRlcmVyLnRvbmVNYXBwaW5nID0gcHJvcGVydHlIb2xkZXIudG9uZU1hcHBpbmcudG9uZU1hcHBpbmc7XG4gIHdlYkdMUmVuZGVyZXIudG9uZU1hcHBpbmdFeHBvc3VyZSA9IHByb3BlcnR5SG9sZGVyLnRvbmVNYXBwaW5nLmV4cG9zdXJlO1xuICB3ZWJHTFJlbmRlcmVyLmF1dG9DbGVhciA9IHByb3BlcnR5SG9sZGVyLmNsZWFyU2V0dGluZ3MuYXV0b0NsZWFyO1xuICB3ZWJHTFJlbmRlcmVyLnNldENsZWFyQ29sb3IocHJvcGVydHlIb2xkZXIuY2xlYXJTZXR0aW5ncy5jbGVhckNvbG9yKTtcbiAgd2ViR0xSZW5kZXJlci5vdXRwdXRFbmNvZGluZyA9IHByb3BlcnR5SG9sZGVyLm1haW4ub3V0cHV0RW5jb2Rpbmc7XG5cbiAgd2ViR0xSZW5kZXJlci5uZWVkc1VwZGF0ZSA9IHRydWU7XG59O1xuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5cbmNvbnN0IHRleHR1cmVMb2FkZXIgPSBuZXcgVEhSRUUuVGV4dHVyZUxvYWRlcigpXG5cbmNvbnN0IHByb3BlcnRpZXNPYmplY3QgPSAoc2NlbmUpID0+ICh7XG4gIG92ZXJyaWRlTWF0ZXJpYWw6IHtcbiAgICB0b2dnbGU6ICgpID0+IHtcbiAgICAgIGlmIChzY2VuZS5vdmVycmlkZU1hdGVyaWFsICE9PSBudWxsKSB7XG4gICAgICAgIHNjZW5lLm92ZXJyaWRlTWF0ZXJpYWwgPSBudWxsXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY2VuZS5vdmVycmlkZU1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hOb3JtYWxNYXRlcmlhbCgpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBiYWNrR3JvdW5kOiAnV2hpdGUnLFxuICBlbnZpcm9ubWVudDoge1xuICAgIHRvZ2dsZTogKCkgPT4ge1xuICAgICAgaWYgKHNjZW5lLmVudmlyb25tZW50ICE9PSBudWxsKSB7XG4gICAgICAgIHNjZW5lLmVudmlyb25tZW50ID0gbnVsbFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGV4dHVyZUxvYWRlci5sb2FkKCcvYXNzZXRzL2VxdWkuanBlZycsIChsb2FkZWQpID0+IHtcbiAgICAgICAgICBsb2FkZWQubWFwcGluZyA9IFRIUkVFLkVxdWlyZWN0YW5ndWxhclJlZmxlY3Rpb25NYXBwaW5nXG4gICAgICAgICAgc2NlbmUuZW52aXJvbm1lbnQgPSBsb2FkZWRcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pXG5cbmNvbnN0IGZvZ1Byb3BlcnRpZXMgPSAoZm9nKSA9PiAoe1xuICBjb2xvcjogMHhmZmZmZmYsXG4gIG5lYXI6IGZvZy5uZWFyLFxuICBmYXI6IGZvZy5mYXJcbn0pXG5cbmV4cG9ydCBjb25zdCBpbml0aWFsaXplU2NlbmVDb250cm9scyA9IChndWksIHNjZW5lLCBmb2dFbmFibGVkLCBpc09wZW4pID0+IHtcbiAgY29uc3QgcHJvcHMgPSBwcm9wZXJ0aWVzT2JqZWN0KHNjZW5lKVxuICBjb25zdCBzY2VuZUNvbnRyb2xzID0gZ3VpLmFkZEZvbGRlcignU2NlbmUnKVxuXG4gIHNjZW5lQ29udHJvbHNcbiAgICAuYWRkKHByb3BzLCAnYmFja0dyb3VuZCcsIFsnV2hpdGUnLCAnQmxhY2snLCAnTnVsbCcsICdDb2xvcicsICdUZXh0dXJlJywgJ0N1YmVtYXAnXSlcbiAgICAub25DaGFuZ2UoKGV2ZW50KSA9PiBoYW5kbGVCYWNrZ3JvdW5kQ2hhbmdlKGV2ZW50LCBzY2VuZSkpXG4gIHNjZW5lQ29udHJvbHMuYWRkKHByb3BzLm92ZXJyaWRlTWF0ZXJpYWwsICd0b2dnbGUnKS5uYW1lKCdUb2dnbGUgT3ZlcnJpZGUgTWF0ZXJpYWwnKVxuICBzY2VuZUNvbnRyb2xzLmFkZChwcm9wcy5lbnZpcm9ubWVudCwgJ3RvZ2dsZScpLm5hbWUoJ1RvZ2dsZSBFbnZpcm9ubWVudCcpXG5cbiAgaWYgKGZvZ0VuYWJsZWQpIHtcbiAgICBjb25zdCBmb2dDb2xvciA9IG5ldyBUSFJFRS5Db2xvcigweGZmZmZmZilcbiAgICBjb25zdCBmb2cgPSBuZXcgVEhSRUUuRm9nKGZvZ0NvbG9yLCAxLCAyMClcbiAgICBzY2VuZS5mb2cgPSBmb2dcbiAgICBjb25zdCBmb2dQcm9wcyA9IGZvZ1Byb3BlcnRpZXMoZm9nKVxuICAgIGNvbnN0IGZvZ0NvbnRyb2xzID0gc2NlbmVDb250cm9scy5hZGRGb2xkZXIoJ0ZvZycpXG4gICAgZm9nQ29udHJvbHMuYWRkQ29sb3IoZm9nUHJvcHMsICdjb2xvcicpXG4gICAgZm9nQ29udHJvbHMuYWRkKGZvZ1Byb3BzLCAnbmVhcicsIDAsIDEwLCAwLjEpXG4gICAgZm9nQ29udHJvbHMuYWRkKGZvZ1Byb3BzLCAnZmFyJywgMCwgMTAwLCAwLjEpXG5cbiAgICBmb2dDb250cm9scy5vbkNoYW5nZSgoKSA9PiB7XG4gICAgICBmb2cuY29sb3IgPSBmb2dDb2xvci5zZXRIZXgoZm9nUHJvcHMuY29sb3IpXG4gICAgICBmb2cubmVhciA9IGZvZ1Byb3BzLm5lYXJcbiAgICAgIGZvZy5mYXIgPSBmb2dQcm9wcy5mYXJcbiAgICB9KVxuICB9XG5cbiAgaXNPcGVuID8gc2NlbmVDb250cm9scy5vcGVuKCkgOiBzY2VuZUNvbnRyb2xzLmNsb3NlKClcbn1cblxuY29uc3QgaGFuZGxlQmFja2dyb3VuZENoYW5nZSA9IChzZXR0aW5nLCBzY2VuZSkgPT4ge1xuICBzd2l0Y2ggKHNldHRpbmcpIHtcbiAgICBjYXNlICdXaGl0ZSc6XG4gICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbmV3IFRIUkVFLkNvbG9yKDB4ZmZmZmZmKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdCbGFjayc6XG4gICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbmV3IFRIUkVFLkNvbG9yKDB4MDAwMDAwKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdOdWxsJzpcbiAgICAgIHNjZW5lLmJhY2tncm91bmQgPSBudWxsXG4gICAgICBicmVha1xuICAgIGNhc2UgJ0NvbG9yJzpcbiAgICAgIHNjZW5lLmJhY2tncm91bmQgPSBuZXcgVEhSRUUuQ29sb3IoMHg0NGZmNDQpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ1RleHR1cmUnOlxuICAgICAgdGV4dHVyZUxvYWRlci5sb2FkKCcvYXNzZXRzL3RleHR1cmVzL3dvb2QvYWJzdHJhY3QtYW50aXF1ZS1iYWNrZHJvcC0xNjQwMDUuanBnJywgKGxvYWRlZCkgPT4ge1xuICAgICAgICBsb2FkZWQuZW5jb2RpbmcgPSBUSFJFRS5zUkdCRW5jb2RpbmdcbiAgICAgICAgc2NlbmUuYmFja2dyb3VuZCA9IGxvYWRlZFxuICAgICAgICBzY2VuZS5lbnZpcm9ubWVudCA9IG51bGxcbiAgICAgIH0pXG4gICAgICBicmVha1xuICAgIGNhc2UgJ0N1YmVtYXAnOlxuICAgICAgdGV4dHVyZUxvYWRlci5sb2FkKCcvYXNzZXRzL2VxdWkuanBlZycsIChsb2FkZWQpID0+IHtcbiAgICAgICAgbG9hZGVkLm1hcHBpbmcgPSBUSFJFRS5FcXVpcmVjdGFuZ3VsYXJSZWZsZWN0aW9uTWFwcGluZ1xuICAgICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbG9hZGVkXG4gICAgICAgIHNjZW5lLmVudmlyb25tZW50ID0gbG9hZGVkXG4gICAgICB9KVxuXG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICBicmVha1xuICB9XG59XG4iLCJleHBvcnQgY29uc3QgdmlzaXRDaGlsZHJlbiA9IChvYmplY3QsIGZuKSA9PiB7XG4gIGlmIChvYmplY3QuY2hpbGRyZW4gJiYgb2JqZWN0LmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIG9iamVjdC5jaGlsZHJlbikge1xuICAgICAgdmlzaXRDaGlsZHJlbihjaGlsZCwgZm4pXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZuKG9iamVjdClcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgYXBwbHlTaGFkb3dzQW5kRGVwdGhXcml0ZSA9IChvYmplY3QpID0+IHtcbiAgdmlzaXRDaGlsZHJlbihvYmplY3QsIChjaGlsZCkgPT4ge1xuICAgIGlmIChjaGlsZC5tYXRlcmlhbCkge1xuICAgICAgY2hpbGQubWF0ZXJpYWwuZGVwdGhXcml0ZSA9IHRydWVcbiAgICAgIGNoaWxkLmNhc3RTaGFkb3cgPSB0cnVlXG4gICAgICBjaGlsZC5yZWNlaXZlU2hhZG93ID0gdHJ1ZVxuICAgIH1cbiAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IGZpbmRDaGlsZCA9IChvYmplY3QsIG5hbWUpID0+IHtcbiAgaWYgKG9iamVjdC5jaGlsZHJlbiAmJiBvYmplY3QuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgIGZvciAoY29uc3QgY2hpbGQgb2Ygb2JqZWN0LmNoaWxkcmVuKSB7XG4gICAgICBpZiAobmFtZSA9PT0gY2hpbGQubmFtZSkge1xuICAgICAgICByZXR1cm4gY2hpbGRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGZpbmRDaGlsZChjaGlsZCwgbmFtZSlcbiAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgIHJldHVybiByZXNcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAobmFtZSA9PT0gb2JqZWN0Lm5hbWUpIHtcbiAgICAgIHJldHVybiBvYmplY3RcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IG9uUmVzaXplID0gKGNhbWVyYSwgcmVuZGVyZXIpID0+IHtcbiAgY29uc3QgcmVzaXplciA9ICgpID0+IHtcbiAgICBjYW1lcmEuYXNwZWN0ID0gd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICBjYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpXG4gICAgcmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KVxuICB9XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemVyLCBmYWxzZSlcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibG9hZC1tZDJcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rbHRqc19mb3VydGhcIl0gPSBzZWxmW1wid2VicGFja0NodW5rbHRqc19mb3VydGhcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2J1aWxkX3RocmVlX21vZHVsZV9qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX2NvbnRyb2xzX09yYml0Q29udHJvbHNfanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX2xpbC1ndWlfZGlzdF9saWwtZ3VpX2VzbV9qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX2xvYWRlcnNfTUQyTG9hZGVyX2pzXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTkvbG9hZC1tZDIuanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
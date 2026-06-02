"use strict";
(self["webpackChunkltjs_fourth"] = self["webpackChunkltjs_fourth"] || []).push([["samples_chapters_chapter-12_util_standard-scene-empty_js"],{

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

/***/ "./samples/chapters/chapter-12/util/standard-scene-empty.js"
/*!******************************************************************!*\
  !*** ./samples/chapters/chapter-12/util/standard-scene-empty.js ***!
  \******************************************************************/
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







const bootstrapMeshScene = async ({ provideGui, backgroundColor, addControls, animate, initializeScene }) => {
  const props = {
    backgroundColor: backgroundColor ?? 0xffffff,
    disableDefaultControls: true
  }

  const gui = new lil_gui__WEBPACK_IMPORTED_MODULE_2__["default"]()

  const init = async () => {
    ;(0,_bootstrap_bootstrap__WEBPACK_IMPORTED_MODULE_0__.initScene)(props)(({ scene, camera, renderer }) => {
      console.log(scene, camera, renderer)

      renderer.shadowMap.type = three__WEBPACK_IMPORTED_MODULE_4__.PCFSoftShadowMap
      camera.position.x = -3
      camera.position.z = 8
      camera.position.y = 2

      if (initializeScene) initializeScene(scene)
      ;(0,_controls_renderer_control__WEBPACK_IMPORTED_MODULE_1__.intializeRendererControls)(gui, renderer)
      ;(0,_controls_scene_controls__WEBPACK_IMPORTED_MODULE_3__.initializeSceneControls)(gui, scene, false)

      if (provideGui) provideGui(gui)
      if (addControls) {
        addControls(camera, renderer, scene, gui)
      }

      animate(renderer, scene, camera)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvc2FtcGxlc19jaGFwdGVyc19jaGFwdGVyLTEyX3V0aWxfc3RhbmRhcmQtc2NlbmUtZW1wdHlfanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBOEI7QUFDb0M7QUFDekI7QUFDVTs7QUFFNUMscUJBQXFCLGtGQUFrRjtBQUM5RztBQUNBO0FBQ0Esc0JBQXNCLHdDQUFXO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQixzQ0FBUztBQUMvQjs7QUFFQTtBQUNBLHVCQUF1QixvREFBdUI7QUFDOUMseUJBQXlCLGdEQUFtQixHQUFHLGlCQUFpQjtBQUNoRSw4QkFBOEIsK0NBQWtCO0FBQ2hEO0FBQ0EsOEJBQThCLCtDQUFrQjtBQUNoRDs7QUFFQSxJQUFJLGlFQUFRO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsK0VBQWlCO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQSxNQUFNLHVEQUFZLFVBQVUsZ0JBQWdCO0FBQzVDOztBQUVBLFNBQVMsd0NBQXdDO0FBQ2pEOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1QzhCOztBQUV2QiwrQkFBK0IsZ0JBQWdCO0FBQ3REO0FBQ0EsZ0JBQWdCLCtDQUFrQjs7QUFFbEM7QUFDQSx1QkFBdUIsbURBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkJ3RDtBQUNzQjs7QUFFckQ7QUFDaUQ7QUFDNUM7O0FBRXZCLG9DQUFvQyxvRUFBb0U7QUFDL0c7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLCtDQUFHOztBQUVyQjtBQUNBLElBQUksZ0VBQVMsV0FBVyx5QkFBeUI7QUFDakQ7O0FBRUEsZ0NBQWdDLG1EQUFzQjtBQUN0RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNLHNGQUF5QjtBQUMvQixNQUFNLGtGQUF1Qjs7QUFFN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDeUU7O0FBRWxFO0FBQ1AseUJBQXlCLG9GQUFhO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDWitCOztBQUUvQjtBQUNBO0FBQ0EsVUFBVSxnREFBbUI7QUFDN0IsWUFBWSxvREFBdUI7QUFDbkMsY0FBYyxzREFBeUI7QUFDdkMsWUFBWSxvREFBdUI7QUFDbkMsZ0JBQWdCLHdEQUEyQjtBQUMzQyxZQUFZLG9EQUF1QjtBQUNuQyxHQUFHO0FBQ0g7QUFDQSxXQUFXLGlEQUFvQjtBQUMvQixVQUFVLCtDQUFrQjtBQUM1QixhQUFhLG1EQUFzQjtBQUNuQyxTQUFTLCtDQUFrQjtBQUMzQixHQUFHO0FBQ0g7QUFDQSxZQUFZLGlEQUFvQjtBQUNoQyxVQUFVLCtDQUFrQjtBQUM1QixHQUFHO0FBQ0g7O0FBRUE7QUFDQSwrQkFBK0Isd0NBQVc7QUFDMUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjs7QUFFcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxRzhCOztBQUU5QiwwQkFBMEIsZ0RBQW1COztBQUU3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSLHFDQUFxQyxxREFBd0I7QUFDN0Q7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsMkJBQTJCLG1FQUFzQztBQUNqRTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFTTtBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlCQUF5Qix3Q0FBVztBQUNwQyxvQkFBb0Isc0NBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLHdDQUFXO0FBQ3hDO0FBQ0E7QUFDQSw2QkFBNkIsd0NBQVc7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qix3Q0FBVztBQUN4QztBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsK0NBQWtCO0FBQzVDO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLG1FQUFzQztBQUMvRDtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNqR087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9ib290c3RyYXAvYm9vdHN0cmFwLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9ib290c3RyYXAvbGlnaHRpbmcuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItMTIvdXRpbC9zdGFuZGFyZC1zY2VuZS1lbXB0eS5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY29udHJvbGxlci9vcmJpdC1jb250cm9sbGVyLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jb250cm9scy9yZW5kZXJlci1jb250cm9sLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jb250cm9scy9zY2VuZS1jb250cm9scy5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvdXRpbC91cGRhdGUtb24tcmVzaXplLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuaW1wb3J0IHsgaW5pdE9yYml0Q29udHJvbHMgfSBmcm9tICcuLi9jb250cm9sbGVyL29yYml0LWNvbnRyb2xsZXInXG5pbXBvcnQgeyBpbml0TGlnaHRpbmcgfSBmcm9tICcuL2xpZ2h0aW5nJ1xuaW1wb3J0IHsgb25SZXNpemUgfSBmcm9tICcuLi91dGlsL3VwZGF0ZS1vbi1yZXNpemUnXG5cbmV4cG9ydCBjb25zdCBpbml0U2NlbmUgPSAoeyBiYWNrZ3JvdW5kQ29sb3IsIGZvZ0NvbG9yLCBkaXNhYmxlU2hhZG93cywgZGlzYWJsZUxpZ2h0cywgZGlzYWJsZURlZmF1bHRDb250cm9scyB9KSA9PiB7XG4gIGNvbnN0IGluaXQgPSAoZm4pID0+IHtcbiAgICAvLyBiYXNpYyBzY2VuZSBzZXR1cFxuICAgIGNvbnN0IHNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKClcbiAgICBpZiAoYmFja2dyb3VuZENvbG9yKSB7XG4gICAgICBzY2VuZS5iYWNrZ3JvdW5kQ29sb3IgPSBiYWNrZ3JvdW5kQ29sb3JcbiAgICB9XG5cbiAgICBpZiAoZm9nQ29sb3IpIHtcbiAgICAgIHNjZW5lLmZvZyA9IG5ldyBUSFJFRS5Gb2coZm9nQ29sb3IsIDAuMDAyNSwgNTApXG4gICAgfVxuXG4gICAgLy8gc2V0dXAgY2FtZXJhIGFuZCBiYXNpYyByZW5kZXJlclxuICAgIGNvbnN0IGNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg3NSwgd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQsIDAuMSwgMTAwMClcbiAgICBjb25zdCByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHsgYW50aWFsaWFzOiB0cnVlIH0pXG4gICAgcmVuZGVyZXIub3V0cHV0RW5jb2RpbmcgPSBUSFJFRS5zUkdCRW5jb2RpbmdcbiAgICByZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IHRydWVcbiAgICByZW5kZXJlci5zaGFkb3dNYXAudHlwZSA9IFRIUkVFLlZTTVNoYWRvd01hcFxuICAgIHJlbmRlcmVyLnNldENsZWFyQ29sb3IoYmFja2dyb3VuZENvbG9yKVxuXG4gICAgb25SZXNpemUoY2FtZXJhLCByZW5kZXJlcilcbiAgICByZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci5kb21FbGVtZW50KVxuXG4gICAgLy8gaW5pdGlhbGl6ZSBvcmJpdCBjb250cm9sc1xuICAgIGxldCBvcmJpdENvbnRyb2xzXG4gICAgaWYgKCFkaXNhYmxlRGVmYXVsdENvbnRyb2xzKSB7XG4gICAgICBvcmJpdENvbnRyb2xzID0gaW5pdE9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlcilcbiAgICB9XG5cbiAgICAvLyBhZGQgc29tZSBiYXNpYyBsaWdodGluZyB0byB0aGUgc2NlbmVcbiAgICBpZiAoIWRpc2FibGVMaWdodHMgPz8gZmFsc2UpIHtcbiAgICAgIGluaXRMaWdodGluZyhzY2VuZSwgeyBkaXNhYmxlU2hhZG93cyB9KVxuICAgIH1cblxuICAgIGZuKHsgc2NlbmUsIGNhbWVyYSwgcmVuZGVyZXIsIG9yYml0Q29udHJvbHMgfSlcbiAgfVxuXG4gIHJldHVybiBpbml0XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcblxuZXhwb3J0IGNvbnN0IGluaXRMaWdodGluZyA9IChzY2VuZSwgeyBkaXNhYmxlU2hhZG93cyB9KSA9PiB7XG4gIC8vIGh0dHBzOi8vdGhyZWVqcy5vcmcvZXhhbXBsZXMvP3E9c2hhZG8jd2ViZ2xfc2hhZG93bWFwX3ZzbVxuICBzY2VuZS5hZGQobmV3IFRIUkVFLkFtYmllbnRMaWdodCgweDY2NjY2NikpXG5cbiAgLy8gY29uc3QgZGlyTGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGFhYWFhYSlcbiAgY29uc3QgZGlyTGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGFhYWFhYSlcbiAgZGlyTGlnaHQucG9zaXRpb24uc2V0KDUsIDEyLCA4KVxuICBkaXJMaWdodC5jYXN0U2hhZG93ID0gIWRpc2FibGVTaGFkb3dzID8gdHJ1ZSA6IGZhbHNlXG4gIGRpckxpZ2h0LmludGVuc2l0eSA9IDFcbiAgZGlyTGlnaHQuc2hhZG93LmNhbWVyYS5uZWFyID0gMC4xXG4gIGRpckxpZ2h0LnNoYWRvdy5jYW1lcmEuZmFyID0gMjAwXG4gIGRpckxpZ2h0LnNoYWRvdy5jYW1lcmEucmlnaHQgPSAxMFxuICBkaXJMaWdodC5zaGFkb3cuY2FtZXJhLmxlZnQgPSAtMTBcbiAgZGlyTGlnaHQuc2hhZG93LmNhbWVyYS50b3AgPSAxMFxuICBkaXJMaWdodC5zaGFkb3cuY2FtZXJhLmJvdHRvbSA9IC0xMFxuICBkaXJMaWdodC5zaGFkb3cubWFwU2l6ZS53aWR0aCA9IDIwNDhcbiAgZGlyTGlnaHQuc2hhZG93Lm1hcFNpemUuaGVpZ2h0ID0gMjA0OFxuICBkaXJMaWdodC5zaGFkb3cucmFkaXVzID0gNFxuICBkaXJMaWdodC5zaGFkb3cuYmlhcyA9IC0wLjAwMDA1XG5cbiAgc2NlbmUuYWRkKGRpckxpZ2h0KVxufVxuIiwiaW1wb3J0IHsgaW5pdFNjZW5lIH0gZnJvbSAnLi4vLi4vLi4vYm9vdHN0cmFwL2Jvb3RzdHJhcCdcbmltcG9ydCB7IGludGlhbGl6ZVJlbmRlcmVyQ29udHJvbHMgfSBmcm9tICcuLi8uLi8uLi9jb250cm9scy9yZW5kZXJlci1jb250cm9sJ1xuXG5pbXBvcnQgR1VJIGZyb20gJ2xpbC1ndWknXG5pbXBvcnQgeyBpbml0aWFsaXplU2NlbmVDb250cm9scyB9IGZyb20gJy4uLy4uLy4uL2NvbnRyb2xzL3NjZW5lLWNvbnRyb2xzJ1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5cbmV4cG9ydCBjb25zdCBib290c3RyYXBNZXNoU2NlbmUgPSBhc3luYyAoeyBwcm92aWRlR3VpLCBiYWNrZ3JvdW5kQ29sb3IsIGFkZENvbnRyb2xzLCBhbmltYXRlLCBpbml0aWFsaXplU2NlbmUgfSkgPT4ge1xuICBjb25zdCBwcm9wcyA9IHtcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IGJhY2tncm91bmRDb2xvciA/PyAweGZmZmZmZixcbiAgICBkaXNhYmxlRGVmYXVsdENvbnRyb2xzOiB0cnVlXG4gIH1cblxuICBjb25zdCBndWkgPSBuZXcgR1VJKClcblxuICBjb25zdCBpbml0ID0gYXN5bmMgKCkgPT4ge1xuICAgIGluaXRTY2VuZShwcm9wcykoKHsgc2NlbmUsIGNhbWVyYSwgcmVuZGVyZXIgfSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coc2NlbmUsIGNhbWVyYSwgcmVuZGVyZXIpXG5cbiAgICAgIHJlbmRlcmVyLnNoYWRvd01hcC50eXBlID0gVEhSRUUuUENGU29mdFNoYWRvd01hcFxuICAgICAgY2FtZXJhLnBvc2l0aW9uLnggPSAtM1xuICAgICAgY2FtZXJhLnBvc2l0aW9uLnogPSA4XG4gICAgICBjYW1lcmEucG9zaXRpb24ueSA9IDJcblxuICAgICAgaWYgKGluaXRpYWxpemVTY2VuZSkgaW5pdGlhbGl6ZVNjZW5lKHNjZW5lKVxuICAgICAgaW50aWFsaXplUmVuZGVyZXJDb250cm9scyhndWksIHJlbmRlcmVyKVxuICAgICAgaW5pdGlhbGl6ZVNjZW5lQ29udHJvbHMoZ3VpLCBzY2VuZSwgZmFsc2UpXG5cbiAgICAgIGlmIChwcm92aWRlR3VpKSBwcm92aWRlR3VpKGd1aSlcbiAgICAgIGlmIChhZGRDb250cm9scykge1xuICAgICAgICBhZGRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLCBzY2VuZSwgZ3VpKVxuICAgICAgfVxuXG4gICAgICBhbmltYXRlKHJlbmRlcmVyLCBzY2VuZSwgY2FtZXJhKVxuICAgIH0pXG4gIH1cblxuICBpbml0KCkudGhlbigpXG59XG4iLCJpbXBvcnQgeyBPcmJpdENvbnRyb2xzIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2NvbnRyb2xzL09yYml0Q29udHJvbHMnXG5cbmV4cG9ydCBjb25zdCBpbml0T3JiaXRDb250cm9scyA9IChjYW1lcmEsIHJlbmRlcmVyKSA9PiB7XG4gIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgT3JiaXRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLmRvbUVsZW1lbnQpXG4gIGNvbnRyb2xsZXIuZW5hYmxlRGFtcGluZyA9IHRydWVcbiAgY29udHJvbGxlci5kYW1waW5nRmFjdG9yID0gMC4wNVxuICBjb250cm9sbGVyLm1pbkRpc3RhbmNlID0gMVxuICBjb250cm9sbGVyLm1heERpc3RhbmNlID0gMTAwXG4gIGNvbnRyb2xsZXIubWluUG9sYXJBbmdsZSA9IE1hdGguUEkgLyA0XG4gIGNvbnRyb2xsZXIubWF4UG9sYXJBbmdsZSA9ICgzICogTWF0aC5QSSkgLyA0XG5cbiAgcmV0dXJuIGNvbnRyb2xsZXJcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuXG5jb25zdCBlbnVtcyA9IHtcbiAgdG9uZU1hcHBpbmdPcHRpb25zOiB7XG4gICAgTm9uZTogVEhSRUUuTm9Ub25lTWFwcGluZyxcbiAgICBMaW5lYXI6IFRIUkVFLkxpbmVhclRvbmVNYXBwaW5nLFxuICAgIFJlaW5oYXJkOiBUSFJFRS5SZWluaGFyZFRvbmVNYXBwaW5nLFxuICAgIENpbmVvbjogVEhSRUUuQ2luZW9uVG9uZU1hcHBpbmcsXG4gICAgQUNFU0ZpbG1pYzogVEhSRUUuQUNFU0ZpbG1pY1RvbmVNYXBwaW5nLFxuICAgIEN1c3RvbTogVEhSRUUuQ3VzdG9tVG9uZU1hcHBpbmcsXG4gIH0sXG4gIHNoYWRvd01hcHBpbmc6IHtcbiAgICBCYXNpYzogVEhSRUUuQmFzaWNTaGFkb3dNYXAsXG4gICAgUENGUzogVEhSRUUuUENGU2hhZG93TWFwLFxuICAgIFBDRlNvZnQ6IFRIUkVFLlBDRlNvZnRTaGFkb3dNYXAsXG4gICAgVlNNOiBUSFJFRS5WU01TaGFkb3dNYXAsXG4gIH0sXG4gIG91dHB1dEVuY29kaW5nczoge1xuICAgIExpbmVhcjogVEhSRUUuTGluZWFyRW5jb2RpbmcsXG4gICAgc1JHQjogVEhSRUUuc1JHQkVuY29kaW5nLFxuICB9LFxufTtcblxuY29uc3QgZ2V0UHJvcGVydHlIb2xkZXIgPSAod2ViR0xSZW5kZXJlcikgPT4ge1xuICBjb25zdCBjbGVhckNvbG9ySG9sZGVyID0gbmV3IFRIUkVFLkNvbG9yKCk7XG4gIHdlYkdMUmVuZGVyZXIuZ2V0Q2xlYXJDb2xvcihjbGVhckNvbG9ySG9sZGVyKTtcblxuICBjb25zdCBob2xkZXIgPSB7XG4gICAgbWFpbjoge1xuICAgICAgb3V0cHV0RW5jb2Rpbmc6IHdlYkdMUmVuZGVyZXIub3V0cHV0RW5jb2RpbmcsXG4gICAgfSxcbiAgICBzaGFkb3dNYXA6IHtcbiAgICAgIGVuYWJsZWQ6IHdlYkdMUmVuZGVyZXIuc2hhZG93TWFwLmVuYWJsZWQsXG4gICAgICBhdXRvVXBkYXRlOiB3ZWJHTFJlbmRlcmVyLnNoYWRvd01hcC5hdXRvVXBkYXRlLFxuICAgICAgbmVlZHNVcGRhdGU6ICgpID0+ICh3ZWJHTFJlbmRlcmVyLnNoYWRvd01hcC5uZWVkc1VwZGF0ZSA9IHRydWUpLFxuICAgICAgdHlwZTogd2ViR0xSZW5kZXJlci5zaGFkb3dNYXAudHlwZSxcbiAgICB9LFxuICAgIHRvbmVNYXBwaW5nOiB7XG4gICAgICBleHBvc3VyZTogd2ViR0xSZW5kZXJlci50b25lTWFwcGluZ0V4cG9zdXJlLFxuICAgICAgdG9uZU1hcHBpbmc6IHdlYkdMUmVuZGVyZXIudG9uZU1hcHBpbmcsXG4gICAgfSxcbiAgICBjbGVhclNldHRpbmdzOiB7XG4gICAgICBhdXRvQ2xlYXI6IHdlYkdMUmVuZGVyZXIuYXV0b0NsZWFyLFxuICAgICAgY2xlYXJDb2xvcjogY2xlYXJDb2xvckhvbGRlci5nZXRTdHlsZSgpLFxuICAgIH0sXG4gICAgYWR2YW5jZWQ6IHtcbiAgICAgIGF1dG9DbGVhckRlcHRoOiB3ZWJHTFJlbmRlcmVyLmF1dG9DbGVhckRlcHRoLFxuICAgICAgYXV0b0NsZWFyU3RlbmNpbDogd2ViR0xSZW5kZXJlci5hdXRvQ2xlYXJTdGVuY2lsLFxuICAgICAgY2hlY2tTaGFkZXJFcnJvcnM6IHdlYkdMUmVuZGVyZXIuZGVidWcuY2hlY2tTaGFkZXJFcnJvcnMsXG4gICAgICBzb3J0T2JqZWN0czogd2ViR0xSZW5kZXJlci5zb3J0T2JqZWN0cyxcbiAgICAgIGxvY2FsQ2xpcHBpbmdFbmFibGVkOiB3ZWJHTFJlbmRlcmVyLmxvY2FsQ2xpcHBpbmdFbmFibGVkLFxuICAgICAgcGh5c2ljYWxseUNvcnJlY3RMaWdodHM6IHdlYkdMUmVuZGVyZXIucGh5c2ljYWxseUNvcnJlY3RMaWdodHMsXG4gICAgfSxcbiAgfTtcblxuICByZXR1cm4gaG9sZGVyO1xufTtcblxuZXhwb3J0IGNvbnN0IGludGlhbGl6ZVJlbmRlcmVyQ29udHJvbHMgPSAoZ3VpLCB3ZWJHTFJlbmRlcmVyKSA9PiB7XG4gIGNvbnN0IHByb3BlcnRpZXNPYmplY3QgPSBnZXRQcm9wZXJ0eUhvbGRlcih3ZWJHTFJlbmRlcmVyKTtcbiAgY29uc3QgcmVuZGVyZXJGb2xkZXIgPSBndWkuYWRkRm9sZGVyKFwiV2ViR0xSZW5kZXJlclwiKTtcblxuICByZW5kZXJlckZvbGRlci5vbkNoYW5nZSgoXykgPT4ge1xuICAgIHVwZGF0ZVdlYkdMUmVuZGVyZXJQcm9wZXJ0aWVzKHdlYkdMUmVuZGVyZXIsIHByb3BlcnRpZXNPYmplY3QpO1xuICB9KTtcblxuICByZW5kZXJlckZvbGRlci5hZGQoXG4gICAgcHJvcGVydGllc09iamVjdC5tYWluLFxuICAgIFwib3V0cHV0RW5jb2RpbmdcIixcbiAgICBlbnVtcy5vdXRwdXRFbmNvZGluZ3NcbiAgKTtcblxuICBjb25zdCBzaGFkb3dGb2xkZXIgPSByZW5kZXJlckZvbGRlci5hZGRGb2xkZXIoXCJTaGFkb3dcIik7XG4gIHNoYWRvd0ZvbGRlci5hZGQocHJvcGVydGllc09iamVjdC5zaGFkb3dNYXAsIFwiZW5hYmxlZFwiKTtcbiAgc2hhZG93Rm9sZGVyLmFkZChwcm9wZXJ0aWVzT2JqZWN0LnNoYWRvd01hcCwgXCJhdXRvVXBkYXRlXCIpO1xuICBzaGFkb3dGb2xkZXIuYWRkKHByb3BlcnRpZXNPYmplY3Quc2hhZG93TWFwLCBcIm5lZWRzVXBkYXRlXCIpO1xuICBzaGFkb3dGb2xkZXJcbiAgICAuYWRkKHByb3BlcnRpZXNPYmplY3Quc2hhZG93TWFwLCBcInR5cGVcIiwgZW51bXMuc2hhZG93TWFwcGluZylcbiAgICAuZW5hYmxlKGZhbHNlKTsgLy8gY2FuJ3QgdXBkYXRlIHRoZSBzaGFkb3cgbWFwcGluZyB0eXBlIGluIHJ1bnRpbWVcblxuICBjb25zdCB0b25lTWFwcGluZ0ZvbGRlciA9IHJlbmRlcmVyRm9sZGVyLmFkZEZvbGRlcihcIlRvbmVNYXBwaW5nXCIpO1xuICB0b25lTWFwcGluZ0ZvbGRlci5hZGQocHJvcGVydGllc09iamVjdC50b25lTWFwcGluZywgXCJleHBvc3VyZVwiLCAwLCAyKTtcbiAgdG9uZU1hcHBpbmdGb2xkZXIuYWRkKFxuICAgIHByb3BlcnRpZXNPYmplY3QudG9uZU1hcHBpbmcsXG4gICAgXCJ0b25lTWFwcGluZ1wiLFxuICAgIGVudW1zLnRvbmVNYXBwaW5nT3B0aW9uc1xuICApO1xuXG4gIGNvbnN0IGNsZWFyU2V0dGluZ3NGb2xkZXIgPSByZW5kZXJlckZvbGRlci5hZGRGb2xkZXIoXCJjbGVhclNldHRpbmdzXCIpO1xuICBjbGVhclNldHRpbmdzRm9sZGVyLmFkZChwcm9wZXJ0aWVzT2JqZWN0LmNsZWFyU2V0dGluZ3MsIFwiYXV0b0NsZWFyXCIpO1xuICBjbGVhclNldHRpbmdzRm9sZGVyLmFkZENvbG9yKHByb3BlcnRpZXNPYmplY3QuY2xlYXJTZXR0aW5ncywgXCJjbGVhckNvbG9yXCIpO1xuXG4gIHJlbmRlcmVyRm9sZGVyLmNsb3NlKCk7XG59O1xuXG5jb25zdCB1cGRhdGVXZWJHTFJlbmRlcmVyUHJvcGVydGllcyA9ICh3ZWJHTFJlbmRlcmVyLCBwcm9wZXJ0eUhvbGRlcikgPT4ge1xuICB3ZWJHTFJlbmRlcmVyLnNoYWRvd01hcC5lbmFibGVkID0gcHJvcGVydHlIb2xkZXIuc2hhZG93TWFwLmVuYWJsZWQ7XG4gIHdlYkdMUmVuZGVyZXIuc2hhZG93TWFwLmF1dG9VcGRhdGUgPSBwcm9wZXJ0eUhvbGRlci5zaGFkb3dNYXAuYXV0b1VwZGF0ZTtcbiAgd2ViR0xSZW5kZXJlci5zaGFkb3dNYXAubmVlZHNVcGRhdGUgPSBwcm9wZXJ0eUhvbGRlci5zaGFkb3dNYXAubmVlZHNVcGRhdGU7XG4gIHdlYkdMUmVuZGVyZXIudG9uZU1hcHBpbmcgPSBwcm9wZXJ0eUhvbGRlci50b25lTWFwcGluZy50b25lTWFwcGluZztcbiAgd2ViR0xSZW5kZXJlci50b25lTWFwcGluZ0V4cG9zdXJlID0gcHJvcGVydHlIb2xkZXIudG9uZU1hcHBpbmcuZXhwb3N1cmU7XG4gIHdlYkdMUmVuZGVyZXIuYXV0b0NsZWFyID0gcHJvcGVydHlIb2xkZXIuY2xlYXJTZXR0aW5ncy5hdXRvQ2xlYXI7XG4gIHdlYkdMUmVuZGVyZXIuc2V0Q2xlYXJDb2xvcihwcm9wZXJ0eUhvbGRlci5jbGVhclNldHRpbmdzLmNsZWFyQ29sb3IpO1xuICB3ZWJHTFJlbmRlcmVyLm91dHB1dEVuY29kaW5nID0gcHJvcGVydHlIb2xkZXIubWFpbi5vdXRwdXRFbmNvZGluZztcblxuICB3ZWJHTFJlbmRlcmVyLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbn07XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcblxuY29uc3QgdGV4dHVyZUxvYWRlciA9IG5ldyBUSFJFRS5UZXh0dXJlTG9hZGVyKClcblxuY29uc3QgcHJvcGVydGllc09iamVjdCA9IChzY2VuZSkgPT4gKHtcbiAgb3ZlcnJpZGVNYXRlcmlhbDoge1xuICAgIHRvZ2dsZTogKCkgPT4ge1xuICAgICAgaWYgKHNjZW5lLm92ZXJyaWRlTWF0ZXJpYWwgIT09IG51bGwpIHtcbiAgICAgICAgc2NlbmUub3ZlcnJpZGVNYXRlcmlhbCA9IG51bGxcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNjZW5lLm92ZXJyaWRlTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaE5vcm1hbE1hdGVyaWFsKClcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGJhY2tHcm91bmQ6ICdXaGl0ZScsXG4gIGVudmlyb25tZW50OiB7XG4gICAgdG9nZ2xlOiAoKSA9PiB7XG4gICAgICBpZiAoc2NlbmUuZW52aXJvbm1lbnQgIT09IG51bGwpIHtcbiAgICAgICAgc2NlbmUuZW52aXJvbm1lbnQgPSBudWxsXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZXh0dXJlTG9hZGVyLmxvYWQoJy9hc3NldHMvZXF1aS5qcGVnJywgKGxvYWRlZCkgPT4ge1xuICAgICAgICAgIGxvYWRlZC5tYXBwaW5nID0gVEhSRUUuRXF1aXJlY3Rhbmd1bGFyUmVmbGVjdGlvbk1hcHBpbmdcbiAgICAgICAgICBzY2VuZS5lbnZpcm9ubWVudCA9IGxvYWRlZFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxufSlcblxuY29uc3QgZm9nUHJvcGVydGllcyA9IChmb2cpID0+ICh7XG4gIGNvbG9yOiAweGZmZmZmZixcbiAgbmVhcjogZm9nLm5lYXIsXG4gIGZhcjogZm9nLmZhclxufSlcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVTY2VuZUNvbnRyb2xzID0gKGd1aSwgc2NlbmUsIGZvZ0VuYWJsZWQsIGlzT3BlbikgPT4ge1xuICBjb25zdCBwcm9wcyA9IHByb3BlcnRpZXNPYmplY3Qoc2NlbmUpXG4gIGNvbnN0IHNjZW5lQ29udHJvbHMgPSBndWkuYWRkRm9sZGVyKCdTY2VuZScpXG5cbiAgc2NlbmVDb250cm9sc1xuICAgIC5hZGQocHJvcHMsICdiYWNrR3JvdW5kJywgWydXaGl0ZScsICdCbGFjaycsICdOdWxsJywgJ0NvbG9yJywgJ1RleHR1cmUnLCAnQ3ViZW1hcCddKVxuICAgIC5vbkNoYW5nZSgoZXZlbnQpID0+IGhhbmRsZUJhY2tncm91bmRDaGFuZ2UoZXZlbnQsIHNjZW5lKSlcbiAgc2NlbmVDb250cm9scy5hZGQocHJvcHMub3ZlcnJpZGVNYXRlcmlhbCwgJ3RvZ2dsZScpLm5hbWUoJ1RvZ2dsZSBPdmVycmlkZSBNYXRlcmlhbCcpXG4gIHNjZW5lQ29udHJvbHMuYWRkKHByb3BzLmVudmlyb25tZW50LCAndG9nZ2xlJykubmFtZSgnVG9nZ2xlIEVudmlyb25tZW50JylcblxuICBpZiAoZm9nRW5hYmxlZCkge1xuICAgIGNvbnN0IGZvZ0NvbG9yID0gbmV3IFRIUkVFLkNvbG9yKDB4ZmZmZmZmKVxuICAgIGNvbnN0IGZvZyA9IG5ldyBUSFJFRS5Gb2coZm9nQ29sb3IsIDEsIDIwKVxuICAgIHNjZW5lLmZvZyA9IGZvZ1xuICAgIGNvbnN0IGZvZ1Byb3BzID0gZm9nUHJvcGVydGllcyhmb2cpXG4gICAgY29uc3QgZm9nQ29udHJvbHMgPSBzY2VuZUNvbnRyb2xzLmFkZEZvbGRlcignRm9nJylcbiAgICBmb2dDb250cm9scy5hZGRDb2xvcihmb2dQcm9wcywgJ2NvbG9yJylcbiAgICBmb2dDb250cm9scy5hZGQoZm9nUHJvcHMsICduZWFyJywgMCwgMTAsIDAuMSlcbiAgICBmb2dDb250cm9scy5hZGQoZm9nUHJvcHMsICdmYXInLCAwLCAxMDAsIDAuMSlcblxuICAgIGZvZ0NvbnRyb2xzLm9uQ2hhbmdlKCgpID0+IHtcbiAgICAgIGZvZy5jb2xvciA9IGZvZ0NvbG9yLnNldEhleChmb2dQcm9wcy5jb2xvcilcbiAgICAgIGZvZy5uZWFyID0gZm9nUHJvcHMubmVhclxuICAgICAgZm9nLmZhciA9IGZvZ1Byb3BzLmZhclxuICAgIH0pXG4gIH1cblxuICBpc09wZW4gPyBzY2VuZUNvbnRyb2xzLm9wZW4oKSA6IHNjZW5lQ29udHJvbHMuY2xvc2UoKVxufVxuXG5jb25zdCBoYW5kbGVCYWNrZ3JvdW5kQ2hhbmdlID0gKHNldHRpbmcsIHNjZW5lKSA9PiB7XG4gIHN3aXRjaCAoc2V0dGluZykge1xuICAgIGNhc2UgJ1doaXRlJzpcbiAgICAgIHNjZW5lLmJhY2tncm91bmQgPSBuZXcgVEhSRUUuQ29sb3IoMHhmZmZmZmYpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ0JsYWNrJzpcbiAgICAgIHNjZW5lLmJhY2tncm91bmQgPSBuZXcgVEhSRUUuQ29sb3IoMHgwMDAwMDApXG4gICAgICBicmVha1xuICAgIGNhc2UgJ051bGwnOlxuICAgICAgc2NlbmUuYmFja2dyb3VuZCA9IG51bGxcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnQ29sb3InOlxuICAgICAgc2NlbmUuYmFja2dyb3VuZCA9IG5ldyBUSFJFRS5Db2xvcigweDQ0ZmY0NClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnVGV4dHVyZSc6XG4gICAgICB0ZXh0dXJlTG9hZGVyLmxvYWQoJy9hc3NldHMvdGV4dHVyZXMvd29vZC9hYnN0cmFjdC1hbnRpcXVlLWJhY2tkcm9wLTE2NDAwNS5qcGcnLCAobG9hZGVkKSA9PiB7XG4gICAgICAgIGxvYWRlZC5lbmNvZGluZyA9IFRIUkVFLnNSR0JFbmNvZGluZ1xuICAgICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbG9hZGVkXG4gICAgICAgIHNjZW5lLmVudmlyb25tZW50ID0gbnVsbFxuICAgICAgfSlcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnQ3ViZW1hcCc6XG4gICAgICB0ZXh0dXJlTG9hZGVyLmxvYWQoJy9hc3NldHMvZXF1aS5qcGVnJywgKGxvYWRlZCkgPT4ge1xuICAgICAgICBsb2FkZWQubWFwcGluZyA9IFRIUkVFLkVxdWlyZWN0YW5ndWxhclJlZmxlY3Rpb25NYXBwaW5nXG4gICAgICAgIHNjZW5lLmJhY2tncm91bmQgPSBsb2FkZWRcbiAgICAgICAgc2NlbmUuZW52aXJvbm1lbnQgPSBsb2FkZWRcbiAgICAgIH0pXG5cbiAgICAgIGJyZWFrXG4gICAgZGVmYXVsdDpcbiAgICAgIGJyZWFrXG4gIH1cbn1cbiIsImV4cG9ydCBjb25zdCBvblJlc2l6ZSA9IChjYW1lcmEsIHJlbmRlcmVyKSA9PiB7XG4gIGNvbnN0IHJlc2l6ZXIgPSAoKSA9PiB7XG4gICAgY2FtZXJhLmFzcGVjdCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0XG4gICAgY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKVxuICAgIHJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodClcbiAgfVxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzaXplciwgZmFsc2UpXG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
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

/***/ "./samples/chapters/chapter-3/lens-flare.js"
/*!**************************************************!*\
  !*** ./samples/chapters/chapter-3/lens-flare.js ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var lil_gui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lil-gui */ "./node_modules/lil-gui/dist/lil-gui.esm.js");
/* harmony import */ var three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/loaders/GLTFLoader.js */ "./node_modules/three/examples/jsm/loaders/GLTFLoader.js");
/* harmony import */ var _bootstrap_bootstrap_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../bootstrap/bootstrap.js */ "./samples/bootstrap/bootstrap.js");
/* harmony import */ var _controls_renderer_control_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../controls/renderer-control.js */ "./samples/controls/renderer-control.js");
/* harmony import */ var three_examples_jsm_objects_Lensflare__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! three/examples/jsm/objects/Lensflare */ "./node_modules/three/examples/jsm/objects/Lensflare.js");
/* harmony import */ var _util_stats__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../util/stats */ "./samples/util/stats.js");
/* harmony import */ var _util_modelUtil_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../util/modelUtil.js */ "./samples/util/modelUtil.js");









const props = {
  backgroundColor: 0xcccccc,
  disableLights: true
}
const gui = new lil_gui__WEBPACK_IMPORTED_MODULE_1__["default"]()

const loadWaterfall = (scene) => {
  const loader = new three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_2__.GLTFLoader()
  loader.load('/assets/gltf/waterfall/scene.gltf', (loadedObject) => {
    // the nested
    const loadedScene = loadedObject.scene.children[0].children[0].children[0]
    ;(0,_util_modelUtil_js__WEBPACK_IMPORTED_MODULE_7__.visitChildren)(loadedScene, (c) => {
      c.receiveShadow = true
      c.castShadow = true
    })
    loadedScene.rotateX(-0.5 * Math.PI)
    scene.add(loadedScene)
  })
}

;(0,_bootstrap_bootstrap_js__WEBPACK_IMPORTED_MODULE_3__.initScene)(props)(({ scene, camera, renderer, orbitControls }) => {
  renderer.shadowMap.type = three__WEBPACK_IMPORTED_MODULE_0__.PCFSoftShadowMap
  camera.position.set(-4, 14, 4)
  orbitControls.update()

  loadWaterfall(scene)

  const pointLight = new three__WEBPACK_IMPORTED_MODULE_0__.PointLight()
  const pointLightHelper = new three__WEBPACK_IMPORTED_MODULE_0__.PointLightHelper(pointLight)
  scene.add(pointLightHelper)

  function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    _util_stats__WEBPACK_IMPORTED_MODULE_6__.stats.update()
    pointLightHelper.update()
    orbitControls.update()
  }

  const colorHolder = new three__WEBPACK_IMPORTED_MODULE_0__.Color(0xffffff)
  const light = new three__WEBPACK_IMPORTED_MODULE_0__.AmbientLight(0x222222)
  scene.add(light)

  pointLight.position.set(10, 14, 5)
  pointLight.castShadow = true
  pointLight.shadow.camera.near = 1
  pointLight.shadow.camera.far = 25
  pointLight.shadow.camera.right = 10
  pointLight.shadow.camera.left = -10
  pointLight.shadow.camera.top = 10
  pointLight.shadow.camera.bottom = -10
  pointLight.shadow.mapSize.width = 2048
  pointLight.shadow.mapSize.height = 2048
  pointLight.shadow.bias = -0.01

  const textureLoader = new three__WEBPACK_IMPORTED_MODULE_0__.TextureLoader()
  const textureFlare0 = textureLoader.load('/assets/textures/lens-flares/lensflare0.png')
  const textureFlare1 = textureLoader.load('/assets/textures/lens-flares/lensflare3.png')

  const lensFlare = new three_examples_jsm_objects_Lensflare__WEBPACK_IMPORTED_MODULE_5__.Lensflare()
  lensFlare.addElement(new three_examples_jsm_objects_Lensflare__WEBPACK_IMPORTED_MODULE_5__.LensflareElement(textureFlare0, 512, 0))
  lensFlare.addElement(new three_examples_jsm_objects_Lensflare__WEBPACK_IMPORTED_MODULE_5__.LensflareElement(textureFlare1, 60, 0.6))
  lensFlare.addElement(new three_examples_jsm_objects_Lensflare__WEBPACK_IMPORTED_MODULE_5__.LensflareElement(textureFlare1, 70, 0.7))
  lensFlare.addElement(new three_examples_jsm_objects_Lensflare__WEBPACK_IMPORTED_MODULE_5__.LensflareElement(textureFlare1, 120, 0.9))
  lensFlare.addElement(new three_examples_jsm_objects_Lensflare__WEBPACK_IMPORTED_MODULE_5__.LensflareElement(textureFlare1, 70, 1.0))

  pointLight.add(lensFlare)

  const props = {
    color: colorHolder.getStyle()
  }

  const spotLightFolder = gui.addFolder('Spotlight')
  spotLightFolder.addColor(props, 'color').onChange((c) => pointLight.color.setStyle(c))
  spotLightFolder.add(pointLight, 'intensity', 0, 5, 0.1)
  spotLightFolder.add(pointLight, 'decay', 0, 5, 0.01)
  spotLightFolder.add(pointLight.position, 'x', -30, 30, 0.1).name('positionX')
  spotLightFolder.add(pointLight.position, 'y', -30, 30, 0.1).name('positionY')
  spotLightFolder.add(pointLight.position, 'z', -30, 30, 0.1).name('positionZ')

  spotLightFolder.add(pointLight, 'castShadow')
  spotLightFolder.add(pointLightHelper, 'visible').name('pointlight-helper')

  scene.add(pointLight)

  ;(0,_controls_renderer_control_js__WEBPACK_IMPORTED_MODULE_4__.intializeRendererControls)(gui, renderer)

  animate()
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
/******/ 			"lens-flare": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","vendors-node_modules_three_examples_jsm_loaders_GLTFLoader_js","vendors-node_modules_three_examples_jsm_libs_stats_module_js-node_modules_three_examples_jsm_-d02c21"], () => (__webpack_require__("./samples/chapters/chapter-3/lens-flare.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7V0FDQTtXQUNBLGlCQUFpQixxQkFBcUI7V0FDdEM7V0FDQTtXQUNBLGtCQUFrQixxQkFBcUI7V0FDdkM7V0FDQTtXQUNBLEtBQUs7V0FDTDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRTs7Ozs7V0MzQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQSw0Rzs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9ib290c3RyYXAvYm9vdHN0cmFwLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9ib290c3RyYXAvbGlnaHRpbmcuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItMy9sZW5zLWZsYXJlLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jb250cm9sbGVyL29yYml0LWNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NvbnRyb2xzL3JlbmRlcmVyLWNvbnRyb2wuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL3V0aWwvbW9kZWxVdGlsLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy91dGlsL3N0YXRzLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy91dGlsL3VwZGF0ZS1vbi1yZXNpemUuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcbmltcG9ydCB7IGluaXRPcmJpdENvbnRyb2xzIH0gZnJvbSAnLi4vY29udHJvbGxlci9vcmJpdC1jb250cm9sbGVyJ1xuaW1wb3J0IHsgaW5pdExpZ2h0aW5nIH0gZnJvbSAnLi9saWdodGluZydcbmltcG9ydCB7IG9uUmVzaXplIH0gZnJvbSAnLi4vdXRpbC91cGRhdGUtb24tcmVzaXplJ1xuXG5leHBvcnQgY29uc3QgaW5pdFNjZW5lID0gKHsgYmFja2dyb3VuZENvbG9yLCBmb2dDb2xvciwgZGlzYWJsZVNoYWRvd3MsIGRpc2FibGVMaWdodHMsIGRpc2FibGVEZWZhdWx0Q29udHJvbHMgfSkgPT4ge1xuICBjb25zdCBpbml0ID0gKGZuKSA9PiB7XG4gICAgLy8gYmFzaWMgc2NlbmUgc2V0dXBcbiAgICBjb25zdCBzY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpXG4gICAgaWYgKGJhY2tncm91bmRDb2xvcikge1xuICAgICAgc2NlbmUuYmFja2dyb3VuZENvbG9yID0gYmFja2dyb3VuZENvbG9yXG4gICAgfVxuXG4gICAgaWYgKGZvZ0NvbG9yKSB7XG4gICAgICBzY2VuZS5mb2cgPSBuZXcgVEhSRUUuRm9nKGZvZ0NvbG9yLCAwLjAwMjUsIDUwKVxuICAgIH1cblxuICAgIC8vIHNldHVwIGNhbWVyYSBhbmQgYmFzaWMgcmVuZGVyZXJcbiAgICBjb25zdCBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNzUsIHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0LCAwLjEsIDEwMDApXG4gICAgY29uc3QgcmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcih7IGFudGlhbGlhczogdHJ1ZSB9KVxuICAgIHJlbmRlcmVyLm91dHB1dEVuY29kaW5nID0gVEhSRUUuc1JHQkVuY29kaW5nXG4gICAgcmVuZGVyZXIuc2hhZG93TWFwLmVuYWJsZWQgPSB0cnVlXG4gICAgcmVuZGVyZXIuc2hhZG93TWFwLnR5cGUgPSBUSFJFRS5WU01TaGFkb3dNYXBcbiAgICByZW5kZXJlci5zZXRDbGVhckNvbG9yKGJhY2tncm91bmRDb2xvcilcblxuICAgIG9uUmVzaXplKGNhbWVyYSwgcmVuZGVyZXIpXG4gICAgcmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocmVuZGVyZXIuZG9tRWxlbWVudClcblxuICAgIC8vIGluaXRpYWxpemUgb3JiaXQgY29udHJvbHNcbiAgICBsZXQgb3JiaXRDb250cm9sc1xuICAgIGlmICghZGlzYWJsZURlZmF1bHRDb250cm9scykge1xuICAgICAgb3JiaXRDb250cm9scyA9IGluaXRPcmJpdENvbnRyb2xzKGNhbWVyYSwgcmVuZGVyZXIpXG4gICAgfVxuXG4gICAgLy8gYWRkIHNvbWUgYmFzaWMgbGlnaHRpbmcgdG8gdGhlIHNjZW5lXG4gICAgaWYgKCFkaXNhYmxlTGlnaHRzID8/IGZhbHNlKSB7XG4gICAgICBpbml0TGlnaHRpbmcoc2NlbmUsIHsgZGlzYWJsZVNoYWRvd3MgfSlcbiAgICB9XG5cbiAgICBmbih7IHNjZW5lLCBjYW1lcmEsIHJlbmRlcmVyLCBvcmJpdENvbnRyb2xzIH0pXG4gIH1cblxuICByZXR1cm4gaW5pdFxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5cbmV4cG9ydCBjb25zdCBpbml0TGlnaHRpbmcgPSAoc2NlbmUsIHsgZGlzYWJsZVNoYWRvd3MgfSkgPT4ge1xuICAvLyBodHRwczovL3RocmVlanMub3JnL2V4YW1wbGVzLz9xPXNoYWRvI3dlYmdsX3NoYWRvd21hcF92c21cbiAgc2NlbmUuYWRkKG5ldyBUSFJFRS5BbWJpZW50TGlnaHQoMHg2NjY2NjYpKVxuXG4gIC8vIGNvbnN0IGRpckxpZ2h0ID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoMHhhYWFhYWEpXG4gIGNvbnN0IGRpckxpZ2h0ID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoMHhhYWFhYWEpXG4gIGRpckxpZ2h0LnBvc2l0aW9uLnNldCg1LCAxMiwgOClcbiAgZGlyTGlnaHQuY2FzdFNoYWRvdyA9ICFkaXNhYmxlU2hhZG93cyA/IHRydWUgOiBmYWxzZVxuICBkaXJMaWdodC5pbnRlbnNpdHkgPSAxXG4gIGRpckxpZ2h0LnNoYWRvdy5jYW1lcmEubmVhciA9IDAuMVxuICBkaXJMaWdodC5zaGFkb3cuY2FtZXJhLmZhciA9IDIwMFxuICBkaXJMaWdodC5zaGFkb3cuY2FtZXJhLnJpZ2h0ID0gMTBcbiAgZGlyTGlnaHQuc2hhZG93LmNhbWVyYS5sZWZ0ID0gLTEwXG4gIGRpckxpZ2h0LnNoYWRvdy5jYW1lcmEudG9wID0gMTBcbiAgZGlyTGlnaHQuc2hhZG93LmNhbWVyYS5ib3R0b20gPSAtMTBcbiAgZGlyTGlnaHQuc2hhZG93Lm1hcFNpemUud2lkdGggPSAyMDQ4XG4gIGRpckxpZ2h0LnNoYWRvdy5tYXBTaXplLmhlaWdodCA9IDIwNDhcbiAgZGlyTGlnaHQuc2hhZG93LnJhZGl1cyA9IDRcbiAgZGlyTGlnaHQuc2hhZG93LmJpYXMgPSAtMC4wMDAwNVxuXG4gIHNjZW5lLmFkZChkaXJMaWdodClcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuaW1wb3J0IEdVSSBmcm9tICdsaWwtZ3VpJ1xuaW1wb3J0IHsgR0xURkxvYWRlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXIuanMnXG5pbXBvcnQgeyBpbml0U2NlbmUgfSBmcm9tICcuLi8uLi9ib290c3RyYXAvYm9vdHN0cmFwLmpzJ1xuaW1wb3J0IHsgaW50aWFsaXplUmVuZGVyZXJDb250cm9scyB9IGZyb20gJy4uLy4uL2NvbnRyb2xzL3JlbmRlcmVyLWNvbnRyb2wuanMnXG5pbXBvcnQgeyBMZW5zZmxhcmUsIExlbnNmbGFyZUVsZW1lbnQgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vb2JqZWN0cy9MZW5zZmxhcmUnXG5pbXBvcnQgeyBzdGF0cyB9IGZyb20gJy4uLy4uL3V0aWwvc3RhdHMnXG5pbXBvcnQgeyB2aXNpdENoaWxkcmVuIH0gZnJvbSAnLi4vLi4vdXRpbC9tb2RlbFV0aWwuanMnXG5cbmNvbnN0IHByb3BzID0ge1xuICBiYWNrZ3JvdW5kQ29sb3I6IDB4Y2NjY2NjLFxuICBkaXNhYmxlTGlnaHRzOiB0cnVlXG59XG5jb25zdCBndWkgPSBuZXcgR1VJKClcblxuY29uc3QgbG9hZFdhdGVyZmFsbCA9IChzY2VuZSkgPT4ge1xuICBjb25zdCBsb2FkZXIgPSBuZXcgR0xURkxvYWRlcigpXG4gIGxvYWRlci5sb2FkKCcvYXNzZXRzL2dsdGYvd2F0ZXJmYWxsL3NjZW5lLmdsdGYnLCAobG9hZGVkT2JqZWN0KSA9PiB7XG4gICAgLy8gdGhlIG5lc3RlZFxuICAgIGNvbnN0IGxvYWRlZFNjZW5lID0gbG9hZGVkT2JqZWN0LnNjZW5lLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdXG4gICAgdmlzaXRDaGlsZHJlbihsb2FkZWRTY2VuZSwgKGMpID0+IHtcbiAgICAgIGMucmVjZWl2ZVNoYWRvdyA9IHRydWVcbiAgICAgIGMuY2FzdFNoYWRvdyA9IHRydWVcbiAgICB9KVxuICAgIGxvYWRlZFNjZW5lLnJvdGF0ZVgoLTAuNSAqIE1hdGguUEkpXG4gICAgc2NlbmUuYWRkKGxvYWRlZFNjZW5lKVxuICB9KVxufVxuXG5pbml0U2NlbmUocHJvcHMpKCh7IHNjZW5lLCBjYW1lcmEsIHJlbmRlcmVyLCBvcmJpdENvbnRyb2xzIH0pID0+IHtcbiAgcmVuZGVyZXIuc2hhZG93TWFwLnR5cGUgPSBUSFJFRS5QQ0ZTb2Z0U2hhZG93TWFwXG4gIGNhbWVyYS5wb3NpdGlvbi5zZXQoLTQsIDE0LCA0KVxuICBvcmJpdENvbnRyb2xzLnVwZGF0ZSgpXG5cbiAgbG9hZFdhdGVyZmFsbChzY2VuZSlcblxuICBjb25zdCBwb2ludExpZ2h0ID0gbmV3IFRIUkVFLlBvaW50TGlnaHQoKVxuICBjb25zdCBwb2ludExpZ2h0SGVscGVyID0gbmV3IFRIUkVFLlBvaW50TGlnaHRIZWxwZXIocG9pbnRMaWdodClcbiAgc2NlbmUuYWRkKHBvaW50TGlnaHRIZWxwZXIpXG5cbiAgZnVuY3Rpb24gYW5pbWF0ZSgpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSlcbiAgICByZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSlcbiAgICBzdGF0cy51cGRhdGUoKVxuICAgIHBvaW50TGlnaHRIZWxwZXIudXBkYXRlKClcbiAgICBvcmJpdENvbnRyb2xzLnVwZGF0ZSgpXG4gIH1cblxuICBjb25zdCBjb2xvckhvbGRlciA9IG5ldyBUSFJFRS5Db2xvcigweGZmZmZmZilcbiAgY29uc3QgbGlnaHQgPSBuZXcgVEhSRUUuQW1iaWVudExpZ2h0KDB4MjIyMjIyKVxuICBzY2VuZS5hZGQobGlnaHQpXG5cbiAgcG9pbnRMaWdodC5wb3NpdGlvbi5zZXQoMTAsIDE0LCA1KVxuICBwb2ludExpZ2h0LmNhc3RTaGFkb3cgPSB0cnVlXG4gIHBvaW50TGlnaHQuc2hhZG93LmNhbWVyYS5uZWFyID0gMVxuICBwb2ludExpZ2h0LnNoYWRvdy5jYW1lcmEuZmFyID0gMjVcbiAgcG9pbnRMaWdodC5zaGFkb3cuY2FtZXJhLnJpZ2h0ID0gMTBcbiAgcG9pbnRMaWdodC5zaGFkb3cuY2FtZXJhLmxlZnQgPSAtMTBcbiAgcG9pbnRMaWdodC5zaGFkb3cuY2FtZXJhLnRvcCA9IDEwXG4gIHBvaW50TGlnaHQuc2hhZG93LmNhbWVyYS5ib3R0b20gPSAtMTBcbiAgcG9pbnRMaWdodC5zaGFkb3cubWFwU2l6ZS53aWR0aCA9IDIwNDhcbiAgcG9pbnRMaWdodC5zaGFkb3cubWFwU2l6ZS5oZWlnaHQgPSAyMDQ4XG4gIHBvaW50TGlnaHQuc2hhZG93LmJpYXMgPSAtMC4wMVxuXG4gIGNvbnN0IHRleHR1cmVMb2FkZXIgPSBuZXcgVEhSRUUuVGV4dHVyZUxvYWRlcigpXG4gIGNvbnN0IHRleHR1cmVGbGFyZTAgPSB0ZXh0dXJlTG9hZGVyLmxvYWQoJy9hc3NldHMvdGV4dHVyZXMvbGVucy1mbGFyZXMvbGVuc2ZsYXJlMC5wbmcnKVxuICBjb25zdCB0ZXh0dXJlRmxhcmUxID0gdGV4dHVyZUxvYWRlci5sb2FkKCcvYXNzZXRzL3RleHR1cmVzL2xlbnMtZmxhcmVzL2xlbnNmbGFyZTMucG5nJylcblxuICBjb25zdCBsZW5zRmxhcmUgPSBuZXcgTGVuc2ZsYXJlKClcbiAgbGVuc0ZsYXJlLmFkZEVsZW1lbnQobmV3IExlbnNmbGFyZUVsZW1lbnQodGV4dHVyZUZsYXJlMCwgNTEyLCAwKSlcbiAgbGVuc0ZsYXJlLmFkZEVsZW1lbnQobmV3IExlbnNmbGFyZUVsZW1lbnQodGV4dHVyZUZsYXJlMSwgNjAsIDAuNikpXG4gIGxlbnNGbGFyZS5hZGRFbGVtZW50KG5ldyBMZW5zZmxhcmVFbGVtZW50KHRleHR1cmVGbGFyZTEsIDcwLCAwLjcpKVxuICBsZW5zRmxhcmUuYWRkRWxlbWVudChuZXcgTGVuc2ZsYXJlRWxlbWVudCh0ZXh0dXJlRmxhcmUxLCAxMjAsIDAuOSkpXG4gIGxlbnNGbGFyZS5hZGRFbGVtZW50KG5ldyBMZW5zZmxhcmVFbGVtZW50KHRleHR1cmVGbGFyZTEsIDcwLCAxLjApKVxuXG4gIHBvaW50TGlnaHQuYWRkKGxlbnNGbGFyZSlcblxuICBjb25zdCBwcm9wcyA9IHtcbiAgICBjb2xvcjogY29sb3JIb2xkZXIuZ2V0U3R5bGUoKVxuICB9XG5cbiAgY29uc3Qgc3BvdExpZ2h0Rm9sZGVyID0gZ3VpLmFkZEZvbGRlcignU3BvdGxpZ2h0JylcbiAgc3BvdExpZ2h0Rm9sZGVyLmFkZENvbG9yKHByb3BzLCAnY29sb3InKS5vbkNoYW5nZSgoYykgPT4gcG9pbnRMaWdodC5jb2xvci5zZXRTdHlsZShjKSlcbiAgc3BvdExpZ2h0Rm9sZGVyLmFkZChwb2ludExpZ2h0LCAnaW50ZW5zaXR5JywgMCwgNSwgMC4xKVxuICBzcG90TGlnaHRGb2xkZXIuYWRkKHBvaW50TGlnaHQsICdkZWNheScsIDAsIDUsIDAuMDEpXG4gIHNwb3RMaWdodEZvbGRlci5hZGQocG9pbnRMaWdodC5wb3NpdGlvbiwgJ3gnLCAtMzAsIDMwLCAwLjEpLm5hbWUoJ3Bvc2l0aW9uWCcpXG4gIHNwb3RMaWdodEZvbGRlci5hZGQocG9pbnRMaWdodC5wb3NpdGlvbiwgJ3knLCAtMzAsIDMwLCAwLjEpLm5hbWUoJ3Bvc2l0aW9uWScpXG4gIHNwb3RMaWdodEZvbGRlci5hZGQocG9pbnRMaWdodC5wb3NpdGlvbiwgJ3onLCAtMzAsIDMwLCAwLjEpLm5hbWUoJ3Bvc2l0aW9uWicpXG5cbiAgc3BvdExpZ2h0Rm9sZGVyLmFkZChwb2ludExpZ2h0LCAnY2FzdFNoYWRvdycpXG4gIHNwb3RMaWdodEZvbGRlci5hZGQocG9pbnRMaWdodEhlbHBlciwgJ3Zpc2libGUnKS5uYW1lKCdwb2ludGxpZ2h0LWhlbHBlcicpXG5cbiAgc2NlbmUuYWRkKHBvaW50TGlnaHQpXG5cbiAgaW50aWFsaXplUmVuZGVyZXJDb250cm9scyhndWksIHJlbmRlcmVyKVxuXG4gIGFuaW1hdGUoKVxufSlcbiIsImltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vY29udHJvbHMvT3JiaXRDb250cm9scydcblxuZXhwb3J0IGNvbnN0IGluaXRPcmJpdENvbnRyb2xzID0gKGNhbWVyYSwgcmVuZGVyZXIpID0+IHtcbiAgY29uc3QgY29udHJvbGxlciA9IG5ldyBPcmJpdENvbnRyb2xzKGNhbWVyYSwgcmVuZGVyZXIuZG9tRWxlbWVudClcbiAgY29udHJvbGxlci5lbmFibGVEYW1waW5nID0gdHJ1ZVxuICBjb250cm9sbGVyLmRhbXBpbmdGYWN0b3IgPSAwLjA1XG4gIGNvbnRyb2xsZXIubWluRGlzdGFuY2UgPSAxXG4gIGNvbnRyb2xsZXIubWF4RGlzdGFuY2UgPSAxMDBcbiAgY29udHJvbGxlci5taW5Qb2xhckFuZ2xlID0gTWF0aC5QSSAvIDRcbiAgY29udHJvbGxlci5tYXhQb2xhckFuZ2xlID0gKDMgKiBNYXRoLlBJKSAvIDRcblxuICByZXR1cm4gY29udHJvbGxlclxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5cbmNvbnN0IGVudW1zID0ge1xuICB0b25lTWFwcGluZ09wdGlvbnM6IHtcbiAgICBOb25lOiBUSFJFRS5Ob1RvbmVNYXBwaW5nLFxuICAgIExpbmVhcjogVEhSRUUuTGluZWFyVG9uZU1hcHBpbmcsXG4gICAgUmVpbmhhcmQ6IFRIUkVFLlJlaW5oYXJkVG9uZU1hcHBpbmcsXG4gICAgQ2luZW9uOiBUSFJFRS5DaW5lb25Ub25lTWFwcGluZyxcbiAgICBBQ0VTRmlsbWljOiBUSFJFRS5BQ0VTRmlsbWljVG9uZU1hcHBpbmcsXG4gICAgQ3VzdG9tOiBUSFJFRS5DdXN0b21Ub25lTWFwcGluZyxcbiAgfSxcbiAgc2hhZG93TWFwcGluZzoge1xuICAgIEJhc2ljOiBUSFJFRS5CYXNpY1NoYWRvd01hcCxcbiAgICBQQ0ZTOiBUSFJFRS5QQ0ZTaGFkb3dNYXAsXG4gICAgUENGU29mdDogVEhSRUUuUENGU29mdFNoYWRvd01hcCxcbiAgICBWU006IFRIUkVFLlZTTVNoYWRvd01hcCxcbiAgfSxcbiAgb3V0cHV0RW5jb2RpbmdzOiB7XG4gICAgTGluZWFyOiBUSFJFRS5MaW5lYXJFbmNvZGluZyxcbiAgICBzUkdCOiBUSFJFRS5zUkdCRW5jb2RpbmcsXG4gIH0sXG59O1xuXG5jb25zdCBnZXRQcm9wZXJ0eUhvbGRlciA9ICh3ZWJHTFJlbmRlcmVyKSA9PiB7XG4gIGNvbnN0IGNsZWFyQ29sb3JIb2xkZXIgPSBuZXcgVEhSRUUuQ29sb3IoKTtcbiAgd2ViR0xSZW5kZXJlci5nZXRDbGVhckNvbG9yKGNsZWFyQ29sb3JIb2xkZXIpO1xuXG4gIGNvbnN0IGhvbGRlciA9IHtcbiAgICBtYWluOiB7XG4gICAgICBvdXRwdXRFbmNvZGluZzogd2ViR0xSZW5kZXJlci5vdXRwdXRFbmNvZGluZyxcbiAgICB9LFxuICAgIHNoYWRvd01hcDoge1xuICAgICAgZW5hYmxlZDogd2ViR0xSZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCxcbiAgICAgIGF1dG9VcGRhdGU6IHdlYkdMUmVuZGVyZXIuc2hhZG93TWFwLmF1dG9VcGRhdGUsXG4gICAgICBuZWVkc1VwZGF0ZTogKCkgPT4gKHdlYkdMUmVuZGVyZXIuc2hhZG93TWFwLm5lZWRzVXBkYXRlID0gdHJ1ZSksXG4gICAgICB0eXBlOiB3ZWJHTFJlbmRlcmVyLnNoYWRvd01hcC50eXBlLFxuICAgIH0sXG4gICAgdG9uZU1hcHBpbmc6IHtcbiAgICAgIGV4cG9zdXJlOiB3ZWJHTFJlbmRlcmVyLnRvbmVNYXBwaW5nRXhwb3N1cmUsXG4gICAgICB0b25lTWFwcGluZzogd2ViR0xSZW5kZXJlci50b25lTWFwcGluZyxcbiAgICB9LFxuICAgIGNsZWFyU2V0dGluZ3M6IHtcbiAgICAgIGF1dG9DbGVhcjogd2ViR0xSZW5kZXJlci5hdXRvQ2xlYXIsXG4gICAgICBjbGVhckNvbG9yOiBjbGVhckNvbG9ySG9sZGVyLmdldFN0eWxlKCksXG4gICAgfSxcbiAgICBhZHZhbmNlZDoge1xuICAgICAgYXV0b0NsZWFyRGVwdGg6IHdlYkdMUmVuZGVyZXIuYXV0b0NsZWFyRGVwdGgsXG4gICAgICBhdXRvQ2xlYXJTdGVuY2lsOiB3ZWJHTFJlbmRlcmVyLmF1dG9DbGVhclN0ZW5jaWwsXG4gICAgICBjaGVja1NoYWRlckVycm9yczogd2ViR0xSZW5kZXJlci5kZWJ1Zy5jaGVja1NoYWRlckVycm9ycyxcbiAgICAgIHNvcnRPYmplY3RzOiB3ZWJHTFJlbmRlcmVyLnNvcnRPYmplY3RzLFxuICAgICAgbG9jYWxDbGlwcGluZ0VuYWJsZWQ6IHdlYkdMUmVuZGVyZXIubG9jYWxDbGlwcGluZ0VuYWJsZWQsXG4gICAgICBwaHlzaWNhbGx5Q29ycmVjdExpZ2h0czogd2ViR0xSZW5kZXJlci5waHlzaWNhbGx5Q29ycmVjdExpZ2h0cyxcbiAgICB9LFxuICB9O1xuXG4gIHJldHVybiBob2xkZXI7XG59O1xuXG5leHBvcnQgY29uc3QgaW50aWFsaXplUmVuZGVyZXJDb250cm9scyA9IChndWksIHdlYkdMUmVuZGVyZXIpID0+IHtcbiAgY29uc3QgcHJvcGVydGllc09iamVjdCA9IGdldFByb3BlcnR5SG9sZGVyKHdlYkdMUmVuZGVyZXIpO1xuICBjb25zdCByZW5kZXJlckZvbGRlciA9IGd1aS5hZGRGb2xkZXIoXCJXZWJHTFJlbmRlcmVyXCIpO1xuXG4gIHJlbmRlcmVyRm9sZGVyLm9uQ2hhbmdlKChfKSA9PiB7XG4gICAgdXBkYXRlV2ViR0xSZW5kZXJlclByb3BlcnRpZXMod2ViR0xSZW5kZXJlciwgcHJvcGVydGllc09iamVjdCk7XG4gIH0pO1xuXG4gIHJlbmRlcmVyRm9sZGVyLmFkZChcbiAgICBwcm9wZXJ0aWVzT2JqZWN0Lm1haW4sXG4gICAgXCJvdXRwdXRFbmNvZGluZ1wiLFxuICAgIGVudW1zLm91dHB1dEVuY29kaW5nc1xuICApO1xuXG4gIGNvbnN0IHNoYWRvd0ZvbGRlciA9IHJlbmRlcmVyRm9sZGVyLmFkZEZvbGRlcihcIlNoYWRvd1wiKTtcbiAgc2hhZG93Rm9sZGVyLmFkZChwcm9wZXJ0aWVzT2JqZWN0LnNoYWRvd01hcCwgXCJlbmFibGVkXCIpO1xuICBzaGFkb3dGb2xkZXIuYWRkKHByb3BlcnRpZXNPYmplY3Quc2hhZG93TWFwLCBcImF1dG9VcGRhdGVcIik7XG4gIHNoYWRvd0ZvbGRlci5hZGQocHJvcGVydGllc09iamVjdC5zaGFkb3dNYXAsIFwibmVlZHNVcGRhdGVcIik7XG4gIHNoYWRvd0ZvbGRlclxuICAgIC5hZGQocHJvcGVydGllc09iamVjdC5zaGFkb3dNYXAsIFwidHlwZVwiLCBlbnVtcy5zaGFkb3dNYXBwaW5nKVxuICAgIC5lbmFibGUoZmFsc2UpOyAvLyBjYW4ndCB1cGRhdGUgdGhlIHNoYWRvdyBtYXBwaW5nIHR5cGUgaW4gcnVudGltZVxuXG4gIGNvbnN0IHRvbmVNYXBwaW5nRm9sZGVyID0gcmVuZGVyZXJGb2xkZXIuYWRkRm9sZGVyKFwiVG9uZU1hcHBpbmdcIik7XG4gIHRvbmVNYXBwaW5nRm9sZGVyLmFkZChwcm9wZXJ0aWVzT2JqZWN0LnRvbmVNYXBwaW5nLCBcImV4cG9zdXJlXCIsIDAsIDIpO1xuICB0b25lTWFwcGluZ0ZvbGRlci5hZGQoXG4gICAgcHJvcGVydGllc09iamVjdC50b25lTWFwcGluZyxcbiAgICBcInRvbmVNYXBwaW5nXCIsXG4gICAgZW51bXMudG9uZU1hcHBpbmdPcHRpb25zXG4gICk7XG5cbiAgY29uc3QgY2xlYXJTZXR0aW5nc0ZvbGRlciA9IHJlbmRlcmVyRm9sZGVyLmFkZEZvbGRlcihcImNsZWFyU2V0dGluZ3NcIik7XG4gIGNsZWFyU2V0dGluZ3NGb2xkZXIuYWRkKHByb3BlcnRpZXNPYmplY3QuY2xlYXJTZXR0aW5ncywgXCJhdXRvQ2xlYXJcIik7XG4gIGNsZWFyU2V0dGluZ3NGb2xkZXIuYWRkQ29sb3IocHJvcGVydGllc09iamVjdC5jbGVhclNldHRpbmdzLCBcImNsZWFyQ29sb3JcIik7XG5cbiAgcmVuZGVyZXJGb2xkZXIuY2xvc2UoKTtcbn07XG5cbmNvbnN0IHVwZGF0ZVdlYkdMUmVuZGVyZXJQcm9wZXJ0aWVzID0gKHdlYkdMUmVuZGVyZXIsIHByb3BlcnR5SG9sZGVyKSA9PiB7XG4gIHdlYkdMUmVuZGVyZXIuc2hhZG93TWFwLmVuYWJsZWQgPSBwcm9wZXJ0eUhvbGRlci5zaGFkb3dNYXAuZW5hYmxlZDtcbiAgd2ViR0xSZW5kZXJlci5zaGFkb3dNYXAuYXV0b1VwZGF0ZSA9IHByb3BlcnR5SG9sZGVyLnNoYWRvd01hcC5hdXRvVXBkYXRlO1xuICB3ZWJHTFJlbmRlcmVyLnNoYWRvd01hcC5uZWVkc1VwZGF0ZSA9IHByb3BlcnR5SG9sZGVyLnNoYWRvd01hcC5uZWVkc1VwZGF0ZTtcbiAgd2ViR0xSZW5kZXJlci50b25lTWFwcGluZyA9IHByb3BlcnR5SG9sZGVyLnRvbmVNYXBwaW5nLnRvbmVNYXBwaW5nO1xuICB3ZWJHTFJlbmRlcmVyLnRvbmVNYXBwaW5nRXhwb3N1cmUgPSBwcm9wZXJ0eUhvbGRlci50b25lTWFwcGluZy5leHBvc3VyZTtcbiAgd2ViR0xSZW5kZXJlci5hdXRvQ2xlYXIgPSBwcm9wZXJ0eUhvbGRlci5jbGVhclNldHRpbmdzLmF1dG9DbGVhcjtcbiAgd2ViR0xSZW5kZXJlci5zZXRDbGVhckNvbG9yKHByb3BlcnR5SG9sZGVyLmNsZWFyU2V0dGluZ3MuY2xlYXJDb2xvcik7XG4gIHdlYkdMUmVuZGVyZXIub3V0cHV0RW5jb2RpbmcgPSBwcm9wZXJ0eUhvbGRlci5tYWluLm91dHB1dEVuY29kaW5nO1xuXG4gIHdlYkdMUmVuZGVyZXIubmVlZHNVcGRhdGUgPSB0cnVlO1xufTtcbiIsImV4cG9ydCBjb25zdCB2aXNpdENoaWxkcmVuID0gKG9iamVjdCwgZm4pID0+IHtcbiAgaWYgKG9iamVjdC5jaGlsZHJlbiAmJiBvYmplY3QuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgIGZvciAoY29uc3QgY2hpbGQgb2Ygb2JqZWN0LmNoaWxkcmVuKSB7XG4gICAgICB2aXNpdENoaWxkcmVuKGNoaWxkLCBmbilcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZm4ob2JqZWN0KVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBhcHBseVNoYWRvd3NBbmREZXB0aFdyaXRlID0gKG9iamVjdCkgPT4ge1xuICB2aXNpdENoaWxkcmVuKG9iamVjdCwgKGNoaWxkKSA9PiB7XG4gICAgaWYgKGNoaWxkLm1hdGVyaWFsKSB7XG4gICAgICBjaGlsZC5tYXRlcmlhbC5kZXB0aFdyaXRlID0gdHJ1ZVxuICAgICAgY2hpbGQuY2FzdFNoYWRvdyA9IHRydWVcbiAgICAgIGNoaWxkLnJlY2VpdmVTaGFkb3cgPSB0cnVlXG4gICAgfVxuICB9KVxufVxuXG5leHBvcnQgY29uc3QgZmluZENoaWxkID0gKG9iamVjdCwgbmFtZSkgPT4ge1xuICBpZiAob2JqZWN0LmNoaWxkcmVuICYmIG9iamVjdC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgZm9yIChjb25zdCBjaGlsZCBvZiBvYmplY3QuY2hpbGRyZW4pIHtcbiAgICAgIGlmIChuYW1lID09PSBjaGlsZC5uYW1lKSB7XG4gICAgICAgIHJldHVybiBjaGlsZFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcmVzID0gZmluZENoaWxkKGNoaWxkLCBuYW1lKVxuICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChuYW1lID09PSBvYmplY3QubmFtZSkge1xuICAgICAgcmV0dXJuIG9iamVjdFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgU3RhdHMgZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xpYnMvc3RhdHMubW9kdWxlJ1xuXG5jb25zdCBzdGF0cyA9IFN0YXRzKClcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc3RhdHMuZG9tKVxuXG5leHBvcnQgeyBzdGF0cyB9XG4iLCJleHBvcnQgY29uc3Qgb25SZXNpemUgPSAoY2FtZXJhLCByZW5kZXJlcikgPT4ge1xuICBjb25zdCByZXNpemVyID0gKCkgPT4ge1xuICAgIGNhbWVyYS5hc3BlY3QgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodFxuICAgIGNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KClcbiAgICByZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpXG4gIH1cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZXIsIGZhbHNlKVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJsZW5zLWZsYXJlXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2x0anNfZm91cnRoXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2x0anNfZm91cnRoXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9idWlsZF90aHJlZV9tb2R1bGVfanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9jb250cm9sc19PcmJpdENvbnRyb2xzX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc19saWwtZ3VpX2Rpc3RfbGlsLWd1aV9lc21fanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9sb2FkZXJzX0dMVEZMb2FkZXJfanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9saWJzX3N0YXRzX21vZHVsZV9qcy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtXy1kMDJjMjFcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItMy9sZW5zLWZsYXJlLmpzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
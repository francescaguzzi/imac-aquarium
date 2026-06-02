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

/***/ "./samples/chapters/chapter-4/model-template.js"
/*!******************************************************!*\
  !*** ./samples/chapters/chapter-4/model-template.js ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _bootstrap_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../bootstrap/bootstrap */ "./samples/bootstrap/bootstrap.js");
/* harmony import */ var _bootstrap_floor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../bootstrap/floor */ "./samples/bootstrap/floor.js");
/* harmony import */ var _controls_renderer_control__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../controls/renderer-control */ "./samples/controls/renderer-control.js");
/* harmony import */ var _controls_helpers_control__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../controls/helpers-control */ "./samples/controls/helpers-control.js");
/* harmony import */ var three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! three/examples/jsm/loaders/GLTFLoader.js */ "./node_modules/three/examples/jsm/loaders/GLTFLoader.js");
/* harmony import */ var lil_gui__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lil-gui */ "./node_modules/lil-gui/dist/lil-gui.esm.js");
/* harmony import */ var _util_modelUtil__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../util/modelUtil */ "./samples/util/modelUtil.js");










const props = {
  backgroundColor: 0xffffff,
  // fogColor: 0xfff6bc
  fogColor: 0xffffff
}

// const props = {
//   backgroundColor: 0x111111,
//   // fogColor: 0xfff6bc
//   fogColor: 0xffffff
// }

const gui = new lil_gui__WEBPACK_IMPORTED_MODULE_6__["default"]()

;(0,_bootstrap_bootstrap__WEBPACK_IMPORTED_MODULE_1__.initScene)(props)(({ scene, camera, renderer, orbitControls }) => {
  camera.position.x = -3
  camera.position.z = 8
  camera.position.y = 2
  orbitControls.update()

  const clock = new three__WEBPACK_IMPORTED_MODULE_0__.Clock()

  ;(0,_bootstrap_floor__WEBPACK_IMPORTED_MODULE_2__.floatingFloor)(scene)

  const loader = new three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_5__.GLTFLoader()
  let clipAction
  let mixer

  loader.load('/assets/gltf/windmill/scene.gltf', loadedObject => {
    const windmill = loadedObject.scene.children[0]
    ;(0,_util_modelUtil__WEBPACK_IMPORTED_MODULE_7__.visitChildren)(windmill, (el) => {
      if (el.type === 'Mesh') {
        el.material.transparent = false
        el.material.side = three__WEBPACK_IMPORTED_MODULE_0__.DoubleSide
        el.material.alphaTest = 0.1
        el.material.needsUpdate = true
        el.material.opacity = 1

        el.castShadow = true
        el.receiveShadow = true
        console.log(el.material)
        console.log(el.name)

        el.material = new three__WEBPACK_IMPORTED_MODULE_0__.MeshStandardMaterial({
          map: el.material.map,
          metalnessMap: el.material.metalnessMap,
          alphaMap: el.material.alphaMap,
          opacity: 1,
          transparent: true,
          side: three__WEBPACK_IMPORTED_MODULE_0__.FrontSide
        })
      }
    })
    windmill.scale.set(80, 80, 80)
    windmill.translateZ(-2)
    windmill.translateX(1)
    windmill.translateY(1)
    windmill.rotateZ(-1.2)
    scene.add(windmill)

    mixer = new three__WEBPACK_IMPORTED_MODULE_0__.AnimationMixer(windmill)
    clipAction = mixer.clipAction(loadedObject.animations[0])
    clipAction.play()
  })

  function animate () {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    orbitControls.update()
    if (clipAction) {
      mixer.update(clock.getDelta())
    }
  }
  animate()

  ;(0,_controls_renderer_control__WEBPACK_IMPORTED_MODULE_3__.intializeRendererControls)(gui, renderer)
  ;(0,_controls_helpers_control__WEBPACK_IMPORTED_MODULE_4__.initializeHelperControls)(gui, scene)
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
/******/ 			"model-template": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","vendors-node_modules_three_examples_jsm_loaders_GLTFLoader_js"], () => (__webpack_require__("./samples/chapters/chapter-4/model-template.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBLDRHOzs7OztVRWhEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2Jvb3RzdHJhcC9ib290c3RyYXAuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2Jvb3RzdHJhcC9mbG9vci5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvYm9vdHN0cmFwL2xpZ2h0aW5nLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTQvbW9kZWwtdGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NvbnRyb2xsZXIvb3JiaXQtY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY29udHJvbHMvaGVscGVycy1jb250cm9sLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jb250cm9scy9yZW5kZXJlci1jb250cm9sLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9oZWxwZXJzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL3V0aWwvbW9kZWxVdGlsLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy91dGlsL3VwZGF0ZS1vbi1yZXNpemUuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcbmltcG9ydCB7IGluaXRPcmJpdENvbnRyb2xzIH0gZnJvbSAnLi4vY29udHJvbGxlci9vcmJpdC1jb250cm9sbGVyJ1xuaW1wb3J0IHsgaW5pdExpZ2h0aW5nIH0gZnJvbSAnLi9saWdodGluZydcbmltcG9ydCB7IG9uUmVzaXplIH0gZnJvbSAnLi4vdXRpbC91cGRhdGUtb24tcmVzaXplJ1xuXG5leHBvcnQgY29uc3QgaW5pdFNjZW5lID0gKHsgYmFja2dyb3VuZENvbG9yLCBmb2dDb2xvciwgZGlzYWJsZVNoYWRvd3MsIGRpc2FibGVMaWdodHMsIGRpc2FibGVEZWZhdWx0Q29udHJvbHMgfSkgPT4ge1xuICBjb25zdCBpbml0ID0gKGZuKSA9PiB7XG4gICAgLy8gYmFzaWMgc2NlbmUgc2V0dXBcbiAgICBjb25zdCBzY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpXG4gICAgaWYgKGJhY2tncm91bmRDb2xvcikge1xuICAgICAgc2NlbmUuYmFja2dyb3VuZENvbG9yID0gYmFja2dyb3VuZENvbG9yXG4gICAgfVxuXG4gICAgaWYgKGZvZ0NvbG9yKSB7XG4gICAgICBzY2VuZS5mb2cgPSBuZXcgVEhSRUUuRm9nKGZvZ0NvbG9yLCAwLjAwMjUsIDUwKVxuICAgIH1cblxuICAgIC8vIHNldHVwIGNhbWVyYSBhbmQgYmFzaWMgcmVuZGVyZXJcbiAgICBjb25zdCBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNzUsIHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0LCAwLjEsIDEwMDApXG4gICAgY29uc3QgcmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcih7IGFudGlhbGlhczogdHJ1ZSB9KVxuICAgIHJlbmRlcmVyLm91dHB1dEVuY29kaW5nID0gVEhSRUUuc1JHQkVuY29kaW5nXG4gICAgcmVuZGVyZXIuc2hhZG93TWFwLmVuYWJsZWQgPSB0cnVlXG4gICAgcmVuZGVyZXIuc2hhZG93TWFwLnR5cGUgPSBUSFJFRS5WU01TaGFkb3dNYXBcbiAgICByZW5kZXJlci5zZXRDbGVhckNvbG9yKGJhY2tncm91bmRDb2xvcilcblxuICAgIG9uUmVzaXplKGNhbWVyYSwgcmVuZGVyZXIpXG4gICAgcmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocmVuZGVyZXIuZG9tRWxlbWVudClcblxuICAgIC8vIGluaXRpYWxpemUgb3JiaXQgY29udHJvbHNcbiAgICBsZXQgb3JiaXRDb250cm9sc1xuICAgIGlmICghZGlzYWJsZURlZmF1bHRDb250cm9scykge1xuICAgICAgb3JiaXRDb250cm9scyA9IGluaXRPcmJpdENvbnRyb2xzKGNhbWVyYSwgcmVuZGVyZXIpXG4gICAgfVxuXG4gICAgLy8gYWRkIHNvbWUgYmFzaWMgbGlnaHRpbmcgdG8gdGhlIHNjZW5lXG4gICAgaWYgKCFkaXNhYmxlTGlnaHRzID8/IGZhbHNlKSB7XG4gICAgICBpbml0TGlnaHRpbmcoc2NlbmUsIHsgZGlzYWJsZVNoYWRvd3MgfSlcbiAgICB9XG5cbiAgICBmbih7IHNjZW5lLCBjYW1lcmEsIHJlbmRlcmVyLCBvcmJpdENvbnRyb2xzIH0pXG4gIH1cblxuICByZXR1cm4gaW5pdFxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5cbmV4cG9ydCBjb25zdCBmb3JldmVyUGxhbmUgPSAoc2NlbmUpID0+IHtcbiAgY29uc3QgZ2VvID0gbmV3IFRIUkVFLlBsYW5lQnVmZmVyR2VvbWV0cnkoMTAwMDAsIDEwMDAwKVxuICBjb25zdCBtYXQgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7XG4gICAgY29sb3I6IDB4ZmZmZmZmXG4gIH0pXG4gIGNvbnN0IG1lc2ggPSBuZXcgVEhSRUUuTWVzaChnZW8sIG1hdClcbiAgbWVzaC5wb3NpdGlvbi5zZXQoMCwgLTIsIDApXG4gIG1lc2gucm90YXRpb24uc2V0KE1hdGguUEkgLyAtMiwgMCwgMClcbiAgbWVzaC5yZWNlaXZlU2hhZG93ID0gdHJ1ZVxuICBtZXNoLm5hbWUgPSAnZm9yZXZlci1mbG9vcidcbiAgc2NlbmUuYWRkKG1lc2gpXG5cbiAgcmV0dXJuIG1lc2hcbn1cblxuZXhwb3J0IGNvbnN0IGZsb2F0aW5nRmxvb3IgPSAoc2NlbmUsIHNpemUpID0+IHtcbiAgY29uc3QgcyA9IHNpemUgPyBzaXplIDogNlxuICBjb25zdCBnZW8gPSBuZXcgVEhSRUUuQm94QnVmZmVyR2VvbWV0cnkocywgMC4yNSwgcywgMTAsIDEwLCAxMClcbiAgY29uc3QgbWF0ID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcbiAgICBjb2xvcjogMHhkZGRkZGRcbiAgfSlcbiAgY29uc3QgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlbywgbWF0KVxuICBtZXNoLnBvc2l0aW9uLnNldCgwLCAtMiwgLTEpXG4gIG1lc2gucmVjZWl2ZVNoYWRvdyA9IHRydWVcbiAgbWVzaC5uYW1lID0gJ2Zsb2F0aW5nLWZsb29yJ1xuICBzY2VuZS5hZGQobWVzaClcblxuICByZXR1cm4gbWVzaFxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5cbmV4cG9ydCBjb25zdCBpbml0TGlnaHRpbmcgPSAoc2NlbmUsIHsgZGlzYWJsZVNoYWRvd3MgfSkgPT4ge1xuICAvLyBodHRwczovL3RocmVlanMub3JnL2V4YW1wbGVzLz9xPXNoYWRvI3dlYmdsX3NoYWRvd21hcF92c21cbiAgc2NlbmUuYWRkKG5ldyBUSFJFRS5BbWJpZW50TGlnaHQoMHg2NjY2NjYpKVxuXG4gIC8vIGNvbnN0IGRpckxpZ2h0ID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoMHhhYWFhYWEpXG4gIGNvbnN0IGRpckxpZ2h0ID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoMHhhYWFhYWEpXG4gIGRpckxpZ2h0LnBvc2l0aW9uLnNldCg1LCAxMiwgOClcbiAgZGlyTGlnaHQuY2FzdFNoYWRvdyA9ICFkaXNhYmxlU2hhZG93cyA/IHRydWUgOiBmYWxzZVxuICBkaXJMaWdodC5pbnRlbnNpdHkgPSAxXG4gIGRpckxpZ2h0LnNoYWRvdy5jYW1lcmEubmVhciA9IDAuMVxuICBkaXJMaWdodC5zaGFkb3cuY2FtZXJhLmZhciA9IDIwMFxuICBkaXJMaWdodC5zaGFkb3cuY2FtZXJhLnJpZ2h0ID0gMTBcbiAgZGlyTGlnaHQuc2hhZG93LmNhbWVyYS5sZWZ0ID0gLTEwXG4gIGRpckxpZ2h0LnNoYWRvdy5jYW1lcmEudG9wID0gMTBcbiAgZGlyTGlnaHQuc2hhZG93LmNhbWVyYS5ib3R0b20gPSAtMTBcbiAgZGlyTGlnaHQuc2hhZG93Lm1hcFNpemUud2lkdGggPSAyMDQ4XG4gIGRpckxpZ2h0LnNoYWRvdy5tYXBTaXplLmhlaWdodCA9IDIwNDhcbiAgZGlyTGlnaHQuc2hhZG93LnJhZGl1cyA9IDRcbiAgZGlyTGlnaHQuc2hhZG93LmJpYXMgPSAtMC4wMDAwNVxuXG4gIHNjZW5lLmFkZChkaXJMaWdodClcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuaW1wb3J0IHsgaW5pdFNjZW5lIH0gZnJvbSAnLi4vLi4vYm9vdHN0cmFwL2Jvb3RzdHJhcCdcbmltcG9ydCB7IGZsb2F0aW5nRmxvb3IgfSBmcm9tICcuLi8uLi9ib290c3RyYXAvZmxvb3InXG5pbXBvcnQgeyBpbnRpYWxpemVSZW5kZXJlckNvbnRyb2xzIH0gZnJvbSAnLi4vLi4vY29udHJvbHMvcmVuZGVyZXItY29udHJvbCdcbmltcG9ydCB7IGluaXRpYWxpemVIZWxwZXJDb250cm9scyB9IGZyb20gJy4uLy4uL2NvbnRyb2xzL2hlbHBlcnMtY29udHJvbCdcbmltcG9ydCB7IEdMVEZMb2FkZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzJ1xuXG5pbXBvcnQgR1VJIGZyb20gJ2xpbC1ndWknXG5pbXBvcnQgeyB2aXNpdENoaWxkcmVuIH0gZnJvbSAnLi4vLi4vdXRpbC9tb2RlbFV0aWwnXG5cbmNvbnN0IHByb3BzID0ge1xuICBiYWNrZ3JvdW5kQ29sb3I6IDB4ZmZmZmZmLFxuICAvLyBmb2dDb2xvcjogMHhmZmY2YmNcbiAgZm9nQ29sb3I6IDB4ZmZmZmZmXG59XG5cbi8vIGNvbnN0IHByb3BzID0ge1xuLy8gICBiYWNrZ3JvdW5kQ29sb3I6IDB4MTExMTExLFxuLy8gICAvLyBmb2dDb2xvcjogMHhmZmY2YmNcbi8vICAgZm9nQ29sb3I6IDB4ZmZmZmZmXG4vLyB9XG5cbmNvbnN0IGd1aSA9IG5ldyBHVUkoKVxuXG5pbml0U2NlbmUocHJvcHMpKCh7IHNjZW5lLCBjYW1lcmEsIHJlbmRlcmVyLCBvcmJpdENvbnRyb2xzIH0pID0+IHtcbiAgY2FtZXJhLnBvc2l0aW9uLnggPSAtM1xuICBjYW1lcmEucG9zaXRpb24ueiA9IDhcbiAgY2FtZXJhLnBvc2l0aW9uLnkgPSAyXG4gIG9yYml0Q29udHJvbHMudXBkYXRlKClcblxuICBjb25zdCBjbG9jayA9IG5ldyBUSFJFRS5DbG9jaygpXG5cbiAgZmxvYXRpbmdGbG9vcihzY2VuZSlcblxuICBjb25zdCBsb2FkZXIgPSBuZXcgR0xURkxvYWRlcigpXG4gIGxldCBjbGlwQWN0aW9uXG4gIGxldCBtaXhlclxuXG4gIGxvYWRlci5sb2FkKCcvYXNzZXRzL2dsdGYvd2luZG1pbGwvc2NlbmUuZ2x0ZicsIGxvYWRlZE9iamVjdCA9PiB7XG4gICAgY29uc3Qgd2luZG1pbGwgPSBsb2FkZWRPYmplY3Quc2NlbmUuY2hpbGRyZW5bMF1cbiAgICB2aXNpdENoaWxkcmVuKHdpbmRtaWxsLCAoZWwpID0+IHtcbiAgICAgIGlmIChlbC50eXBlID09PSAnTWVzaCcpIHtcbiAgICAgICAgZWwubWF0ZXJpYWwudHJhbnNwYXJlbnQgPSBmYWxzZVxuICAgICAgICBlbC5tYXRlcmlhbC5zaWRlID0gVEhSRUUuRG91YmxlU2lkZVxuICAgICAgICBlbC5tYXRlcmlhbC5hbHBoYVRlc3QgPSAwLjFcbiAgICAgICAgZWwubWF0ZXJpYWwubmVlZHNVcGRhdGUgPSB0cnVlXG4gICAgICAgIGVsLm1hdGVyaWFsLm9wYWNpdHkgPSAxXG5cbiAgICAgICAgZWwuY2FzdFNoYWRvdyA9IHRydWVcbiAgICAgICAgZWwucmVjZWl2ZVNoYWRvdyA9IHRydWVcbiAgICAgICAgY29uc29sZS5sb2coZWwubWF0ZXJpYWwpXG4gICAgICAgIGNvbnNvbGUubG9nKGVsLm5hbWUpXG5cbiAgICAgICAgZWwubWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoe1xuICAgICAgICAgIG1hcDogZWwubWF0ZXJpYWwubWFwLFxuICAgICAgICAgIG1ldGFsbmVzc01hcDogZWwubWF0ZXJpYWwubWV0YWxuZXNzTWFwLFxuICAgICAgICAgIGFscGhhTWFwOiBlbC5tYXRlcmlhbC5hbHBoYU1hcCxcbiAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgICAgIHNpZGU6IFRIUkVFLkZyb250U2lkZVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gICAgd2luZG1pbGwuc2NhbGUuc2V0KDgwLCA4MCwgODApXG4gICAgd2luZG1pbGwudHJhbnNsYXRlWigtMilcbiAgICB3aW5kbWlsbC50cmFuc2xhdGVYKDEpXG4gICAgd2luZG1pbGwudHJhbnNsYXRlWSgxKVxuICAgIHdpbmRtaWxsLnJvdGF0ZVooLTEuMilcbiAgICBzY2VuZS5hZGQod2luZG1pbGwpXG5cbiAgICBtaXhlciA9IG5ldyBUSFJFRS5BbmltYXRpb25NaXhlcih3aW5kbWlsbClcbiAgICBjbGlwQWN0aW9uID0gbWl4ZXIuY2xpcEFjdGlvbihsb2FkZWRPYmplY3QuYW5pbWF0aW9uc1swXSlcbiAgICBjbGlwQWN0aW9uLnBsYXkoKVxuICB9KVxuXG4gIGZ1bmN0aW9uIGFuaW1hdGUgKCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKVxuICAgIHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhKVxuICAgIG9yYml0Q29udHJvbHMudXBkYXRlKClcbiAgICBpZiAoY2xpcEFjdGlvbikge1xuICAgICAgbWl4ZXIudXBkYXRlKGNsb2NrLmdldERlbHRhKCkpXG4gICAgfVxuICB9XG4gIGFuaW1hdGUoKVxuXG4gIGludGlhbGl6ZVJlbmRlcmVyQ29udHJvbHMoZ3VpLCByZW5kZXJlcilcbiAgaW5pdGlhbGl6ZUhlbHBlckNvbnRyb2xzKGd1aSwgc2NlbmUpXG59KVxuIiwiaW1wb3J0IHsgT3JiaXRDb250cm9scyB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9jb250cm9scy9PcmJpdENvbnRyb2xzJ1xuXG5leHBvcnQgY29uc3QgaW5pdE9yYml0Q29udHJvbHMgPSAoY2FtZXJhLCByZW5kZXJlcikgPT4ge1xuICBjb25zdCBjb250cm9sbGVyID0gbmV3IE9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlci5kb21FbGVtZW50KVxuICBjb250cm9sbGVyLmVuYWJsZURhbXBpbmcgPSB0cnVlXG4gIGNvbnRyb2xsZXIuZGFtcGluZ0ZhY3RvciA9IDAuMDVcbiAgY29udHJvbGxlci5taW5EaXN0YW5jZSA9IDFcbiAgY29udHJvbGxlci5tYXhEaXN0YW5jZSA9IDEwMFxuICBjb250cm9sbGVyLm1pblBvbGFyQW5nbGUgPSBNYXRoLlBJIC8gNFxuICBjb250cm9sbGVyLm1heFBvbGFyQW5nbGUgPSAoMyAqIE1hdGguUEkpIC8gNFxuXG4gIHJldHVybiBjb250cm9sbGVyXG59XG4iLCJpbXBvcnQge1xuICBheGlzSGVscGVyLFxuICBheGlzSGVscGVyTmFtZSxcbiAgZ3JpZEhlbHBlcixcbiAgZ3JpZEhlbHBlck5hbWUsXG4gIHBvbGFyR3JpZEhlbHBlcixcbiAgcG9sYXJHcmlkSGVscGVyTmFtZSxcbn0gZnJvbSBcIi4uL2hlbHBlcnMvaGVscGVyc1wiO1xuXG5jb25zdCBwcm9wZXJ0aWVzT2JqZWN0ID0gKHNjZW5lKSA9PiAoe1xuICBheGlzSGVscGVyOiB7XG4gICAgdG9nZ2xlOiAoKSA9PiB7XG4gICAgICBjb25zdCBjdXJyZW50SGVscGVyID0gc2NlbmUuZ2V0T2JqZWN0QnlOYW1lKGF4aXNIZWxwZXJOYW1lKTtcbiAgICAgIGlmIChjdXJyZW50SGVscGVyKSB7XG4gICAgICAgIHNjZW5lLnJlbW92ZShjdXJyZW50SGVscGVyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF4aXNIZWxwZXIoc2NlbmUpO1xuICAgICAgfVxuICAgIH0sXG4gIH0sXG4gIGdyaWRIZWxwZXI6IHtcbiAgICB0b2dnbGU6ICgpID0+IHJlbW92ZU9yQWRkVG9TY2VuZShncmlkSGVscGVyTmFtZSwgc2NlbmUsIGdyaWRIZWxwZXIpLFxuICB9LFxuICBwb2xhckdyaWRIZWxwZXI6IHtcbiAgICB0b2dnbGU6ICgpID0+XG4gICAgICByZW1vdmVPckFkZFRvU2NlbmUocG9sYXJHcmlkSGVscGVyTmFtZSwgc2NlbmUsIHBvbGFyR3JpZEhlbHBlciksXG4gIH0sXG59KTtcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVIZWxwZXJDb250cm9scyA9IChndWksIHNjZW5lKSA9PiB7XG4gIGNvbnN0IHByb3BzID0gcHJvcGVydGllc09iamVjdChzY2VuZSk7XG4gIGNvbnN0IGhlbHBlcnMgPSBndWkuYWRkRm9sZGVyKFwiSGVscGVyc1wiKTtcbiAgLy8gICBoZWxwZXJzLmFkZCgnYXhpc0hlbHBlckVuYWJsZWQnLCBwcm9wZXJ0aWVzT2JqZWN0KVxuICBoZWxwZXJzLmFkZChwcm9wcy5heGlzSGVscGVyLCBcInRvZ2dsZVwiKS5uYW1lKFwiVG9nZ2xlIEF4ZXNIZWxwZXJcIik7XG4gIGhlbHBlcnMuYWRkKHByb3BzLmdyaWRIZWxwZXIsIFwidG9nZ2xlXCIpLm5hbWUoXCJUb2dnbGUgR3JpZEhlbHBlclwiKTtcbiAgaGVscGVycy5hZGQocHJvcHMucG9sYXJHcmlkSGVscGVyLCBcInRvZ2dsZVwiKS5uYW1lKFwiVG9nZ2xlIFBvbGFyR3JpZEhlbHBlclwiKTtcblxuICBoZWxwZXJzLmNsb3NlKCk7XG59O1xuXG5jb25zdCByZW1vdmVPckFkZFRvU2NlbmUgPSAobmFtZSwgc2NlbmUsIGFkZEZuKSA9PiB7XG4gIGNvbnN0IGN1cnJlbnRPYmplY3QgPSBzY2VuZS5nZXRPYmplY3RCeU5hbWUobmFtZSk7XG4gIGNvbnNvbGUubG9nKGN1cnJlbnRPYmplY3QpO1xuICBpZiAoY3VycmVudE9iamVjdCkge1xuICAgIHNjZW5lLnJlbW92ZShjdXJyZW50T2JqZWN0KTtcbiAgfSBlbHNlIHtcbiAgICBhZGRGbihzY2VuZSk7XG4gIH1cbn07XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcblxuY29uc3QgZW51bXMgPSB7XG4gIHRvbmVNYXBwaW5nT3B0aW9uczoge1xuICAgIE5vbmU6IFRIUkVFLk5vVG9uZU1hcHBpbmcsXG4gICAgTGluZWFyOiBUSFJFRS5MaW5lYXJUb25lTWFwcGluZyxcbiAgICBSZWluaGFyZDogVEhSRUUuUmVpbmhhcmRUb25lTWFwcGluZyxcbiAgICBDaW5lb246IFRIUkVFLkNpbmVvblRvbmVNYXBwaW5nLFxuICAgIEFDRVNGaWxtaWM6IFRIUkVFLkFDRVNGaWxtaWNUb25lTWFwcGluZyxcbiAgICBDdXN0b206IFRIUkVFLkN1c3RvbVRvbmVNYXBwaW5nLFxuICB9LFxuICBzaGFkb3dNYXBwaW5nOiB7XG4gICAgQmFzaWM6IFRIUkVFLkJhc2ljU2hhZG93TWFwLFxuICAgIFBDRlM6IFRIUkVFLlBDRlNoYWRvd01hcCxcbiAgICBQQ0ZTb2Z0OiBUSFJFRS5QQ0ZTb2Z0U2hhZG93TWFwLFxuICAgIFZTTTogVEhSRUUuVlNNU2hhZG93TWFwLFxuICB9LFxuICBvdXRwdXRFbmNvZGluZ3M6IHtcbiAgICBMaW5lYXI6IFRIUkVFLkxpbmVhckVuY29kaW5nLFxuICAgIHNSR0I6IFRIUkVFLnNSR0JFbmNvZGluZyxcbiAgfSxcbn07XG5cbmNvbnN0IGdldFByb3BlcnR5SG9sZGVyID0gKHdlYkdMUmVuZGVyZXIpID0+IHtcbiAgY29uc3QgY2xlYXJDb2xvckhvbGRlciA9IG5ldyBUSFJFRS5Db2xvcigpO1xuICB3ZWJHTFJlbmRlcmVyLmdldENsZWFyQ29sb3IoY2xlYXJDb2xvckhvbGRlcik7XG5cbiAgY29uc3QgaG9sZGVyID0ge1xuICAgIG1haW46IHtcbiAgICAgIG91dHB1dEVuY29kaW5nOiB3ZWJHTFJlbmRlcmVyLm91dHB1dEVuY29kaW5nLFxuICAgIH0sXG4gICAgc2hhZG93TWFwOiB7XG4gICAgICBlbmFibGVkOiB3ZWJHTFJlbmRlcmVyLnNoYWRvd01hcC5lbmFibGVkLFxuICAgICAgYXV0b1VwZGF0ZTogd2ViR0xSZW5kZXJlci5zaGFkb3dNYXAuYXV0b1VwZGF0ZSxcbiAgICAgIG5lZWRzVXBkYXRlOiAoKSA9PiAod2ViR0xSZW5kZXJlci5zaGFkb3dNYXAubmVlZHNVcGRhdGUgPSB0cnVlKSxcbiAgICAgIHR5cGU6IHdlYkdMUmVuZGVyZXIuc2hhZG93TWFwLnR5cGUsXG4gICAgfSxcbiAgICB0b25lTWFwcGluZzoge1xuICAgICAgZXhwb3N1cmU6IHdlYkdMUmVuZGVyZXIudG9uZU1hcHBpbmdFeHBvc3VyZSxcbiAgICAgIHRvbmVNYXBwaW5nOiB3ZWJHTFJlbmRlcmVyLnRvbmVNYXBwaW5nLFxuICAgIH0sXG4gICAgY2xlYXJTZXR0aW5nczoge1xuICAgICAgYXV0b0NsZWFyOiB3ZWJHTFJlbmRlcmVyLmF1dG9DbGVhcixcbiAgICAgIGNsZWFyQ29sb3I6IGNsZWFyQ29sb3JIb2xkZXIuZ2V0U3R5bGUoKSxcbiAgICB9LFxuICAgIGFkdmFuY2VkOiB7XG4gICAgICBhdXRvQ2xlYXJEZXB0aDogd2ViR0xSZW5kZXJlci5hdXRvQ2xlYXJEZXB0aCxcbiAgICAgIGF1dG9DbGVhclN0ZW5jaWw6IHdlYkdMUmVuZGVyZXIuYXV0b0NsZWFyU3RlbmNpbCxcbiAgICAgIGNoZWNrU2hhZGVyRXJyb3JzOiB3ZWJHTFJlbmRlcmVyLmRlYnVnLmNoZWNrU2hhZGVyRXJyb3JzLFxuICAgICAgc29ydE9iamVjdHM6IHdlYkdMUmVuZGVyZXIuc29ydE9iamVjdHMsXG4gICAgICBsb2NhbENsaXBwaW5nRW5hYmxlZDogd2ViR0xSZW5kZXJlci5sb2NhbENsaXBwaW5nRW5hYmxlZCxcbiAgICAgIHBoeXNpY2FsbHlDb3JyZWN0TGlnaHRzOiB3ZWJHTFJlbmRlcmVyLnBoeXNpY2FsbHlDb3JyZWN0TGlnaHRzLFxuICAgIH0sXG4gIH07XG5cbiAgcmV0dXJuIGhvbGRlcjtcbn07XG5cbmV4cG9ydCBjb25zdCBpbnRpYWxpemVSZW5kZXJlckNvbnRyb2xzID0gKGd1aSwgd2ViR0xSZW5kZXJlcikgPT4ge1xuICBjb25zdCBwcm9wZXJ0aWVzT2JqZWN0ID0gZ2V0UHJvcGVydHlIb2xkZXIod2ViR0xSZW5kZXJlcik7XG4gIGNvbnN0IHJlbmRlcmVyRm9sZGVyID0gZ3VpLmFkZEZvbGRlcihcIldlYkdMUmVuZGVyZXJcIik7XG5cbiAgcmVuZGVyZXJGb2xkZXIub25DaGFuZ2UoKF8pID0+IHtcbiAgICB1cGRhdGVXZWJHTFJlbmRlcmVyUHJvcGVydGllcyh3ZWJHTFJlbmRlcmVyLCBwcm9wZXJ0aWVzT2JqZWN0KTtcbiAgfSk7XG5cbiAgcmVuZGVyZXJGb2xkZXIuYWRkKFxuICAgIHByb3BlcnRpZXNPYmplY3QubWFpbixcbiAgICBcIm91dHB1dEVuY29kaW5nXCIsXG4gICAgZW51bXMub3V0cHV0RW5jb2RpbmdzXG4gICk7XG5cbiAgY29uc3Qgc2hhZG93Rm9sZGVyID0gcmVuZGVyZXJGb2xkZXIuYWRkRm9sZGVyKFwiU2hhZG93XCIpO1xuICBzaGFkb3dGb2xkZXIuYWRkKHByb3BlcnRpZXNPYmplY3Quc2hhZG93TWFwLCBcImVuYWJsZWRcIik7XG4gIHNoYWRvd0ZvbGRlci5hZGQocHJvcGVydGllc09iamVjdC5zaGFkb3dNYXAsIFwiYXV0b1VwZGF0ZVwiKTtcbiAgc2hhZG93Rm9sZGVyLmFkZChwcm9wZXJ0aWVzT2JqZWN0LnNoYWRvd01hcCwgXCJuZWVkc1VwZGF0ZVwiKTtcbiAgc2hhZG93Rm9sZGVyXG4gICAgLmFkZChwcm9wZXJ0aWVzT2JqZWN0LnNoYWRvd01hcCwgXCJ0eXBlXCIsIGVudW1zLnNoYWRvd01hcHBpbmcpXG4gICAgLmVuYWJsZShmYWxzZSk7IC8vIGNhbid0IHVwZGF0ZSB0aGUgc2hhZG93IG1hcHBpbmcgdHlwZSBpbiBydW50aW1lXG5cbiAgY29uc3QgdG9uZU1hcHBpbmdGb2xkZXIgPSByZW5kZXJlckZvbGRlci5hZGRGb2xkZXIoXCJUb25lTWFwcGluZ1wiKTtcbiAgdG9uZU1hcHBpbmdGb2xkZXIuYWRkKHByb3BlcnRpZXNPYmplY3QudG9uZU1hcHBpbmcsIFwiZXhwb3N1cmVcIiwgMCwgMik7XG4gIHRvbmVNYXBwaW5nRm9sZGVyLmFkZChcbiAgICBwcm9wZXJ0aWVzT2JqZWN0LnRvbmVNYXBwaW5nLFxuICAgIFwidG9uZU1hcHBpbmdcIixcbiAgICBlbnVtcy50b25lTWFwcGluZ09wdGlvbnNcbiAgKTtcblxuICBjb25zdCBjbGVhclNldHRpbmdzRm9sZGVyID0gcmVuZGVyZXJGb2xkZXIuYWRkRm9sZGVyKFwiY2xlYXJTZXR0aW5nc1wiKTtcbiAgY2xlYXJTZXR0aW5nc0ZvbGRlci5hZGQocHJvcGVydGllc09iamVjdC5jbGVhclNldHRpbmdzLCBcImF1dG9DbGVhclwiKTtcbiAgY2xlYXJTZXR0aW5nc0ZvbGRlci5hZGRDb2xvcihwcm9wZXJ0aWVzT2JqZWN0LmNsZWFyU2V0dGluZ3MsIFwiY2xlYXJDb2xvclwiKTtcblxuICByZW5kZXJlckZvbGRlci5jbG9zZSgpO1xufTtcblxuY29uc3QgdXBkYXRlV2ViR0xSZW5kZXJlclByb3BlcnRpZXMgPSAod2ViR0xSZW5kZXJlciwgcHJvcGVydHlIb2xkZXIpID0+IHtcbiAgd2ViR0xSZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IHByb3BlcnR5SG9sZGVyLnNoYWRvd01hcC5lbmFibGVkO1xuICB3ZWJHTFJlbmRlcmVyLnNoYWRvd01hcC5hdXRvVXBkYXRlID0gcHJvcGVydHlIb2xkZXIuc2hhZG93TWFwLmF1dG9VcGRhdGU7XG4gIHdlYkdMUmVuZGVyZXIuc2hhZG93TWFwLm5lZWRzVXBkYXRlID0gcHJvcGVydHlIb2xkZXIuc2hhZG93TWFwLm5lZWRzVXBkYXRlO1xuICB3ZWJHTFJlbmRlcmVyLnRvbmVNYXBwaW5nID0gcHJvcGVydHlIb2xkZXIudG9uZU1hcHBpbmcudG9uZU1hcHBpbmc7XG4gIHdlYkdMUmVuZGVyZXIudG9uZU1hcHBpbmdFeHBvc3VyZSA9IHByb3BlcnR5SG9sZGVyLnRvbmVNYXBwaW5nLmV4cG9zdXJlO1xuICB3ZWJHTFJlbmRlcmVyLmF1dG9DbGVhciA9IHByb3BlcnR5SG9sZGVyLmNsZWFyU2V0dGluZ3MuYXV0b0NsZWFyO1xuICB3ZWJHTFJlbmRlcmVyLnNldENsZWFyQ29sb3IocHJvcGVydHlIb2xkZXIuY2xlYXJTZXR0aW5ncy5jbGVhckNvbG9yKTtcbiAgd2ViR0xSZW5kZXJlci5vdXRwdXRFbmNvZGluZyA9IHByb3BlcnR5SG9sZGVyLm1haW4ub3V0cHV0RW5jb2Rpbmc7XG5cbiAgd2ViR0xSZW5kZXJlci5uZWVkc1VwZGF0ZSA9IHRydWU7XG59O1xuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5cbmV4cG9ydCBjb25zdCBheGlzSGVscGVyTmFtZSA9ICdheGVzSGVscGVyJ1xuZXhwb3J0IGNvbnN0IGdyaWRIZWxwZXJOYW1lID0gJ2dyaWRIZWxwZXInXG5leHBvcnQgY29uc3QgcG9sYXJHcmlkSGVscGVyTmFtZSA9ICdwb2xhckdyaWRIZWxwZXInXG5cbmV4cG9ydCBjb25zdCBheGlzSGVscGVyID0gKHNjZW5lKSA9PiB7XG4gIGNvbnN0IGF4ZXNIZWxwZXIgPSBuZXcgVEhSRUUuQXhlc0hlbHBlcig1KVxuICBheGVzSGVscGVyLm5hbWUgPSBheGlzSGVscGVyTmFtZVxuICBzY2VuZS5hZGQoYXhlc0hlbHBlcilcbn1cblxuZXhwb3J0IGNvbnN0IGdyaWRIZWxwZXIgPSAoc2NlbmUpID0+IHtcbiAgY29uc3Qgc2l6ZSA9IDEwXG4gIGNvbnN0IGRpdmlzaW9ucyA9IDEwXG4gIGNvbnN0IGdyaWRIZWxwZXIgPSBuZXcgVEhSRUUuR3JpZEhlbHBlcihzaXplLCBkaXZpc2lvbnMpXG4gIGdyaWRIZWxwZXIubmFtZSA9IGdyaWRIZWxwZXJOYW1lXG4gIHNjZW5lLmFkZChncmlkSGVscGVyKVxufVxuXG5leHBvcnQgY29uc3QgcG9sYXJHcmlkSGVscGVyID0gKHNjZW5lKSA9PiB7XG4gIGNvbnN0IHJhZGl1cyA9IDEwXG4gIGNvbnN0IHJhZGlhbHMgPSAxNlxuICBjb25zdCBjaXJjbGVzID0gOFxuICBjb25zdCBkaXZpc2lvbnMgPSA2NFxuICBjb25zdCBwb2xhckdyaWRIZWxwZXIgPSBuZXcgVEhSRUUuUG9sYXJHcmlkSGVscGVyKHJhZGl1cywgcmFkaWFscywgY2lyY2xlcywgZGl2aXNpb25zKVxuICBwb2xhckdyaWRIZWxwZXIubmFtZSA9IHBvbGFyR3JpZEhlbHBlck5hbWVcbiAgc2NlbmUuYWRkKHBvbGFyR3JpZEhlbHBlcilcbn1cbiIsImV4cG9ydCBjb25zdCB2aXNpdENoaWxkcmVuID0gKG9iamVjdCwgZm4pID0+IHtcbiAgaWYgKG9iamVjdC5jaGlsZHJlbiAmJiBvYmplY3QuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgIGZvciAoY29uc3QgY2hpbGQgb2Ygb2JqZWN0LmNoaWxkcmVuKSB7XG4gICAgICB2aXNpdENoaWxkcmVuKGNoaWxkLCBmbilcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZm4ob2JqZWN0KVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBhcHBseVNoYWRvd3NBbmREZXB0aFdyaXRlID0gKG9iamVjdCkgPT4ge1xuICB2aXNpdENoaWxkcmVuKG9iamVjdCwgKGNoaWxkKSA9PiB7XG4gICAgaWYgKGNoaWxkLm1hdGVyaWFsKSB7XG4gICAgICBjaGlsZC5tYXRlcmlhbC5kZXB0aFdyaXRlID0gdHJ1ZVxuICAgICAgY2hpbGQuY2FzdFNoYWRvdyA9IHRydWVcbiAgICAgIGNoaWxkLnJlY2VpdmVTaGFkb3cgPSB0cnVlXG4gICAgfVxuICB9KVxufVxuXG5leHBvcnQgY29uc3QgZmluZENoaWxkID0gKG9iamVjdCwgbmFtZSkgPT4ge1xuICBpZiAob2JqZWN0LmNoaWxkcmVuICYmIG9iamVjdC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgZm9yIChjb25zdCBjaGlsZCBvZiBvYmplY3QuY2hpbGRyZW4pIHtcbiAgICAgIGlmIChuYW1lID09PSBjaGlsZC5uYW1lKSB7XG4gICAgICAgIHJldHVybiBjaGlsZFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcmVzID0gZmluZENoaWxkKGNoaWxkLCBuYW1lKVxuICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChuYW1lID09PSBvYmplY3QubmFtZSkge1xuICAgICAgcmV0dXJuIG9iamVjdFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgY29uc3Qgb25SZXNpemUgPSAoY2FtZXJhLCByZW5kZXJlcikgPT4ge1xuICBjb25zdCByZXNpemVyID0gKCkgPT4ge1xuICAgIGNhbWVyYS5hc3BlY3QgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodFxuICAgIGNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KClcbiAgICByZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpXG4gIH1cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZXIsIGZhbHNlKVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtb2RlbC10ZW1wbGF0ZVwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtsdGpzX2ZvdXJ0aFwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtsdGpzX2ZvdXJ0aFwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfYnVpbGRfdGhyZWVfbW9kdWxlX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fY29udHJvbHNfT3JiaXRDb250cm9sc19qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfbGlsLWd1aV9kaXN0X2xpbC1ndWlfZXNtX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fbG9hZGVyc19HTFRGTG9hZGVyX2pzXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTQvbW9kZWwtdGVtcGxhdGUuanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
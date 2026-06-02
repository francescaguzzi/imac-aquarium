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

/***/ "./samples/chapters/chapter-3/rectarea-light.js"
/*!******************************************************!*\
  !*** ./samples/chapters/chapter-3/rectarea-light.js ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var lil_gui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lil-gui */ "./node_modules/lil-gui/dist/lil-gui.esm.js");
/* harmony import */ var _bootstrap_floor_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../bootstrap/floor.js */ "./samples/bootstrap/floor.js");
/* harmony import */ var three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/jsm/loaders/GLTFLoader.js */ "./node_modules/three/examples/jsm/loaders/GLTFLoader.js");
/* harmony import */ var _bootstrap_bootstrap_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../bootstrap/bootstrap.js */ "./samples/bootstrap/bootstrap.js");
/* harmony import */ var three_examples_jsm_helpers_RectAreaLightHelper_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! three/examples/jsm/helpers/RectAreaLightHelper.js */ "./node_modules/three/examples/jsm/helpers/RectAreaLightHelper.js");
/* harmony import */ var three_examples_jsm_lights_RectAreaLightUniformsLib_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! three/examples/jsm/lights/RectAreaLightUniformsLib.js */ "./node_modules/three/examples/jsm/lights/RectAreaLightUniformsLib.js");
/* harmony import */ var _util_stats__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../util/stats */ "./samples/util/stats.js");
/* harmony import */ var _util_modelUtil_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../util/modelUtil.js */ "./samples/util/modelUtil.js");










const props = {
  backgroundColor: 0xcccccc,
  disableLights: true
}
const gui = new lil_gui__WEBPACK_IMPORTED_MODULE_1__["default"]()

const loadIsland = (scene) => {
  const loader = new three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_3__.GLTFLoader()
  loader.load('/assets/gltf/flying_island/scene.gltf', (loadedObject) => {
    // the nested
    const loadedScene = loadedObject.scene.children[0].children[0].children[0]
    ;(0,_util_modelUtil_js__WEBPACK_IMPORTED_MODULE_8__.visitChildren)(loadedScene, (c) => {
      c.receiveShadow = true
      c.castShadow = true
    })
    loadedScene.scale.set(0.012, 0.012, 0.012)
    loadedScene.translateY(-3)
    scene.add(loadedScene)
  })
}

// TODO: Add the rotation and position controls here, that we've
//       seen earlier, to allow us to move the lights around.
;(0,_bootstrap_bootstrap_js__WEBPACK_IMPORTED_MODULE_4__.initScene)(props)(({ scene, camera, renderer, orbitControls }) => {
  camera.position.set(2, 7, -7)
  orbitControls.update()
  const floor = (0,_bootstrap_floor_js__WEBPACK_IMPORTED_MODULE_2__.floatingFloor)(scene, 10)
  floor.material.metalness = 0.2
  floor.material.roughness = 0.1

  const colorHolder = new three__WEBPACK_IMPORTED_MODULE_0__.Color(0x666666)
  const light = new three__WEBPACK_IMPORTED_MODULE_0__.AmbientLight(colorHolder, 1)
  scene.add(light)

  loadIsland(scene)

  three_examples_jsm_lights_RectAreaLightUniformsLib_js__WEBPACK_IMPORTED_MODULE_6__.RectAreaLightUniformsLib.init()

  const rectLight1 = new three__WEBPACK_IMPORTED_MODULE_0__.RectAreaLight(0xff0000, 5, 2, 5)
  const color1Holder = { color: rectLight1.color.getStyle() }
  rectLight1.position.set(-3, 0, 5)
  scene.add(rectLight1)

  const rectLight2 = new three__WEBPACK_IMPORTED_MODULE_0__.RectAreaLight(0x00ff00, 5, 2, 5)
  const color2Holder = { color: rectLight2.color.getStyle() }
  rectLight2.position.set(0, 0, 5)
  scene.add(rectLight2)

  const rectLight3 = new three__WEBPACK_IMPORTED_MODULE_0__.RectAreaLight(0x0000ff, 5, 2, 5)
  const color3Holder = { color: rectLight3.color.getStyle() }
  rectLight3.position.set(3, 0, 5)
  scene.add(rectLight3)

  scene.add(new three_examples_jsm_helpers_RectAreaLightHelper_js__WEBPACK_IMPORTED_MODULE_5__.RectAreaLightHelper(rectLight1))
  scene.add(new three_examples_jsm_helpers_RectAreaLightHelper_js__WEBPACK_IMPORTED_MODULE_5__.RectAreaLightHelper(rectLight2))
  scene.add(new three_examples_jsm_helpers_RectAreaLightHelper_js__WEBPACK_IMPORTED_MODULE_5__.RectAreaLightHelper(rectLight3))

  function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    _util_stats__WEBPACK_IMPORTED_MODULE_7__.stats.update()

    orbitControls.update()
  }

  setupRectGui(color1Holder, rectLight1, 'rect-light-1')
  setupRectGui(color2Holder, rectLight2, 'rect-light-2')
  setupRectGui(color3Holder, rectLight3, 'rect-light-3')
  animate()
})

function setupRectGui(colorHolder, light, folderName) {
  const rectAreaFolder = gui.addFolder(folderName)
  rectAreaFolder.addColor(colorHolder, 'color').onChange((c) => light.color.setStyle(c))
  rectAreaFolder.add(light, 'intensity', 0, 15, 0.1)
  rectAreaFolder.add(light, 'decay', 0, 5, 0.01)
  rectAreaFolder.add(light, 'width', 0, 20, 0.01)
  rectAreaFolder.add(light, 'height', 0, 20, 0.01)
  rectAreaFolder.add(light.position, 'x', -30, 30, 0.1).name('positionX')
  rectAreaFolder.add(light.position, 'y', -30, 30, 0.1).name('positionY')
  rectAreaFolder.add(light.position, 'z', -30, 30, 0.1).name('positionZ')
  rectAreaFolder.add(light.rotation, 'x', -2 * Math.PI, 2 * Math.PI, 0.1).name('rotationX')
  rectAreaFolder.add(light.rotation, 'y', -2 * Math.PI, 2 * Math.PI, 0.1).name('rotationY')
  rectAreaFolder.add(light.rotation, 'z', -2 * Math.PI, 2 * Math.PI, 0.1).name('rotationZ')
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
/******/ 			"rectarea-light": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","vendors-node_modules_three_examples_jsm_loaders_GLTFLoader_js","vendors-node_modules_three_examples_jsm_helpers_RectAreaLightHelper_js-node_modules_three_exa-b155fd"], () => (__webpack_require__("./samples/chapters/chapter-3/rectarea-light.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBOztXQUVBO1dBQ0E7V0FDQSw0Rzs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9ib290c3RyYXAvYm9vdHN0cmFwLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9ib290c3RyYXAvZmxvb3IuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2Jvb3RzdHJhcC9saWdodGluZy5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci0zL3JlY3RhcmVhLWxpZ2h0LmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jb250cm9sbGVyL29yYml0LWNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL3V0aWwvbW9kZWxVdGlsLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy91dGlsL3N0YXRzLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy91dGlsL3VwZGF0ZS1vbi1yZXNpemUuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcbmltcG9ydCB7IGluaXRPcmJpdENvbnRyb2xzIH0gZnJvbSAnLi4vY29udHJvbGxlci9vcmJpdC1jb250cm9sbGVyJ1xuaW1wb3J0IHsgaW5pdExpZ2h0aW5nIH0gZnJvbSAnLi9saWdodGluZydcbmltcG9ydCB7IG9uUmVzaXplIH0gZnJvbSAnLi4vdXRpbC91cGRhdGUtb24tcmVzaXplJ1xuXG5leHBvcnQgY29uc3QgaW5pdFNjZW5lID0gKHsgYmFja2dyb3VuZENvbG9yLCBmb2dDb2xvciwgZGlzYWJsZVNoYWRvd3MsIGRpc2FibGVMaWdodHMsIGRpc2FibGVEZWZhdWx0Q29udHJvbHMgfSkgPT4ge1xuICBjb25zdCBpbml0ID0gKGZuKSA9PiB7XG4gICAgLy8gYmFzaWMgc2NlbmUgc2V0dXBcbiAgICBjb25zdCBzY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpXG4gICAgaWYgKGJhY2tncm91bmRDb2xvcikge1xuICAgICAgc2NlbmUuYmFja2dyb3VuZENvbG9yID0gYmFja2dyb3VuZENvbG9yXG4gICAgfVxuXG4gICAgaWYgKGZvZ0NvbG9yKSB7XG4gICAgICBzY2VuZS5mb2cgPSBuZXcgVEhSRUUuRm9nKGZvZ0NvbG9yLCAwLjAwMjUsIDUwKVxuICAgIH1cblxuICAgIC8vIHNldHVwIGNhbWVyYSBhbmQgYmFzaWMgcmVuZGVyZXJcbiAgICBjb25zdCBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNzUsIHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0LCAwLjEsIDEwMDApXG4gICAgY29uc3QgcmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcih7IGFudGlhbGlhczogdHJ1ZSB9KVxuICAgIHJlbmRlcmVyLm91dHB1dEVuY29kaW5nID0gVEhSRUUuc1JHQkVuY29kaW5nXG4gICAgcmVuZGVyZXIuc2hhZG93TWFwLmVuYWJsZWQgPSB0cnVlXG4gICAgcmVuZGVyZXIuc2hhZG93TWFwLnR5cGUgPSBUSFJFRS5WU01TaGFkb3dNYXBcbiAgICByZW5kZXJlci5zZXRDbGVhckNvbG9yKGJhY2tncm91bmRDb2xvcilcblxuICAgIG9uUmVzaXplKGNhbWVyYSwgcmVuZGVyZXIpXG4gICAgcmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocmVuZGVyZXIuZG9tRWxlbWVudClcblxuICAgIC8vIGluaXRpYWxpemUgb3JiaXQgY29udHJvbHNcbiAgICBsZXQgb3JiaXRDb250cm9sc1xuICAgIGlmICghZGlzYWJsZURlZmF1bHRDb250cm9scykge1xuICAgICAgb3JiaXRDb250cm9scyA9IGluaXRPcmJpdENvbnRyb2xzKGNhbWVyYSwgcmVuZGVyZXIpXG4gICAgfVxuXG4gICAgLy8gYWRkIHNvbWUgYmFzaWMgbGlnaHRpbmcgdG8gdGhlIHNjZW5lXG4gICAgaWYgKCFkaXNhYmxlTGlnaHRzID8/IGZhbHNlKSB7XG4gICAgICBpbml0TGlnaHRpbmcoc2NlbmUsIHsgZGlzYWJsZVNoYWRvd3MgfSlcbiAgICB9XG5cbiAgICBmbih7IHNjZW5lLCBjYW1lcmEsIHJlbmRlcmVyLCBvcmJpdENvbnRyb2xzIH0pXG4gIH1cblxuICByZXR1cm4gaW5pdFxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5cbmV4cG9ydCBjb25zdCBmb3JldmVyUGxhbmUgPSAoc2NlbmUpID0+IHtcbiAgY29uc3QgZ2VvID0gbmV3IFRIUkVFLlBsYW5lQnVmZmVyR2VvbWV0cnkoMTAwMDAsIDEwMDAwKVxuICBjb25zdCBtYXQgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7XG4gICAgY29sb3I6IDB4ZmZmZmZmXG4gIH0pXG4gIGNvbnN0IG1lc2ggPSBuZXcgVEhSRUUuTWVzaChnZW8sIG1hdClcbiAgbWVzaC5wb3NpdGlvbi5zZXQoMCwgLTIsIDApXG4gIG1lc2gucm90YXRpb24uc2V0KE1hdGguUEkgLyAtMiwgMCwgMClcbiAgbWVzaC5yZWNlaXZlU2hhZG93ID0gdHJ1ZVxuICBtZXNoLm5hbWUgPSAnZm9yZXZlci1mbG9vcidcbiAgc2NlbmUuYWRkKG1lc2gpXG5cbiAgcmV0dXJuIG1lc2hcbn1cblxuZXhwb3J0IGNvbnN0IGZsb2F0aW5nRmxvb3IgPSAoc2NlbmUsIHNpemUpID0+IHtcbiAgY29uc3QgcyA9IHNpemUgPyBzaXplIDogNlxuICBjb25zdCBnZW8gPSBuZXcgVEhSRUUuQm94QnVmZmVyR2VvbWV0cnkocywgMC4yNSwgcywgMTAsIDEwLCAxMClcbiAgY29uc3QgbWF0ID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcbiAgICBjb2xvcjogMHhkZGRkZGRcbiAgfSlcbiAgY29uc3QgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlbywgbWF0KVxuICBtZXNoLnBvc2l0aW9uLnNldCgwLCAtMiwgLTEpXG4gIG1lc2gucmVjZWl2ZVNoYWRvdyA9IHRydWVcbiAgbWVzaC5uYW1lID0gJ2Zsb2F0aW5nLWZsb29yJ1xuICBzY2VuZS5hZGQobWVzaClcblxuICByZXR1cm4gbWVzaFxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5cbmV4cG9ydCBjb25zdCBpbml0TGlnaHRpbmcgPSAoc2NlbmUsIHsgZGlzYWJsZVNoYWRvd3MgfSkgPT4ge1xuICAvLyBodHRwczovL3RocmVlanMub3JnL2V4YW1wbGVzLz9xPXNoYWRvI3dlYmdsX3NoYWRvd21hcF92c21cbiAgc2NlbmUuYWRkKG5ldyBUSFJFRS5BbWJpZW50TGlnaHQoMHg2NjY2NjYpKVxuXG4gIC8vIGNvbnN0IGRpckxpZ2h0ID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoMHhhYWFhYWEpXG4gIGNvbnN0IGRpckxpZ2h0ID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoMHhhYWFhYWEpXG4gIGRpckxpZ2h0LnBvc2l0aW9uLnNldCg1LCAxMiwgOClcbiAgZGlyTGlnaHQuY2FzdFNoYWRvdyA9ICFkaXNhYmxlU2hhZG93cyA/IHRydWUgOiBmYWxzZVxuICBkaXJMaWdodC5pbnRlbnNpdHkgPSAxXG4gIGRpckxpZ2h0LnNoYWRvdy5jYW1lcmEubmVhciA9IDAuMVxuICBkaXJMaWdodC5zaGFkb3cuY2FtZXJhLmZhciA9IDIwMFxuICBkaXJMaWdodC5zaGFkb3cuY2FtZXJhLnJpZ2h0ID0gMTBcbiAgZGlyTGlnaHQuc2hhZG93LmNhbWVyYS5sZWZ0ID0gLTEwXG4gIGRpckxpZ2h0LnNoYWRvdy5jYW1lcmEudG9wID0gMTBcbiAgZGlyTGlnaHQuc2hhZG93LmNhbWVyYS5ib3R0b20gPSAtMTBcbiAgZGlyTGlnaHQuc2hhZG93Lm1hcFNpemUud2lkdGggPSAyMDQ4XG4gIGRpckxpZ2h0LnNoYWRvdy5tYXBTaXplLmhlaWdodCA9IDIwNDhcbiAgZGlyTGlnaHQuc2hhZG93LnJhZGl1cyA9IDRcbiAgZGlyTGlnaHQuc2hhZG93LmJpYXMgPSAtMC4wMDAwNVxuXG4gIHNjZW5lLmFkZChkaXJMaWdodClcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuaW1wb3J0IEdVSSBmcm9tICdsaWwtZ3VpJ1xuaW1wb3J0IHsgZmxvYXRpbmdGbG9vciB9IGZyb20gJy4uLy4uL2Jvb3RzdHJhcC9mbG9vci5qcydcbmltcG9ydCB7IEdMVEZMb2FkZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzJ1xuaW1wb3J0IHsgaW5pdFNjZW5lIH0gZnJvbSAnLi4vLi4vYm9vdHN0cmFwL2Jvb3RzdHJhcC5qcydcbmltcG9ydCB7IFJlY3RBcmVhTGlnaHRIZWxwZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vaGVscGVycy9SZWN0QXJlYUxpZ2h0SGVscGVyLmpzJ1xuaW1wb3J0IHsgUmVjdEFyZWFMaWdodFVuaWZvcm1zTGliIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xpZ2h0cy9SZWN0QXJlYUxpZ2h0VW5pZm9ybXNMaWIuanMnXG5pbXBvcnQgeyBzdGF0cyB9IGZyb20gJy4uLy4uL3V0aWwvc3RhdHMnXG5pbXBvcnQgeyB2aXNpdENoaWxkcmVuIH0gZnJvbSAnLi4vLi4vdXRpbC9tb2RlbFV0aWwuanMnXG5cbmNvbnN0IHByb3BzID0ge1xuICBiYWNrZ3JvdW5kQ29sb3I6IDB4Y2NjY2NjLFxuICBkaXNhYmxlTGlnaHRzOiB0cnVlXG59XG5jb25zdCBndWkgPSBuZXcgR1VJKClcblxuY29uc3QgbG9hZElzbGFuZCA9IChzY2VuZSkgPT4ge1xuICBjb25zdCBsb2FkZXIgPSBuZXcgR0xURkxvYWRlcigpXG4gIGxvYWRlci5sb2FkKCcvYXNzZXRzL2dsdGYvZmx5aW5nX2lzbGFuZC9zY2VuZS5nbHRmJywgKGxvYWRlZE9iamVjdCkgPT4ge1xuICAgIC8vIHRoZSBuZXN0ZWRcbiAgICBjb25zdCBsb2FkZWRTY2VuZSA9IGxvYWRlZE9iamVjdC5zY2VuZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5jaGlsZHJlblswXVxuICAgIHZpc2l0Q2hpbGRyZW4obG9hZGVkU2NlbmUsIChjKSA9PiB7XG4gICAgICBjLnJlY2VpdmVTaGFkb3cgPSB0cnVlXG4gICAgICBjLmNhc3RTaGFkb3cgPSB0cnVlXG4gICAgfSlcbiAgICBsb2FkZWRTY2VuZS5zY2FsZS5zZXQoMC4wMTIsIDAuMDEyLCAwLjAxMilcbiAgICBsb2FkZWRTY2VuZS50cmFuc2xhdGVZKC0zKVxuICAgIHNjZW5lLmFkZChsb2FkZWRTY2VuZSlcbiAgfSlcbn1cblxuLy8gVE9ETzogQWRkIHRoZSByb3RhdGlvbiBhbmQgcG9zaXRpb24gY29udHJvbHMgaGVyZSwgdGhhdCB3ZSd2ZVxuLy8gICAgICAgc2VlbiBlYXJsaWVyLCB0byBhbGxvdyB1cyB0byBtb3ZlIHRoZSBsaWdodHMgYXJvdW5kLlxuaW5pdFNjZW5lKHByb3BzKSgoeyBzY2VuZSwgY2FtZXJhLCByZW5kZXJlciwgb3JiaXRDb250cm9scyB9KSA9PiB7XG4gIGNhbWVyYS5wb3NpdGlvbi5zZXQoMiwgNywgLTcpXG4gIG9yYml0Q29udHJvbHMudXBkYXRlKClcbiAgY29uc3QgZmxvb3IgPSBmbG9hdGluZ0Zsb29yKHNjZW5lLCAxMClcbiAgZmxvb3IubWF0ZXJpYWwubWV0YWxuZXNzID0gMC4yXG4gIGZsb29yLm1hdGVyaWFsLnJvdWdobmVzcyA9IDAuMVxuXG4gIGNvbnN0IGNvbG9ySG9sZGVyID0gbmV3IFRIUkVFLkNvbG9yKDB4NjY2NjY2KVxuICBjb25zdCBsaWdodCA9IG5ldyBUSFJFRS5BbWJpZW50TGlnaHQoY29sb3JIb2xkZXIsIDEpXG4gIHNjZW5lLmFkZChsaWdodClcblxuICBsb2FkSXNsYW5kKHNjZW5lKVxuXG4gIFJlY3RBcmVhTGlnaHRVbmlmb3Jtc0xpYi5pbml0KClcblxuICBjb25zdCByZWN0TGlnaHQxID0gbmV3IFRIUkVFLlJlY3RBcmVhTGlnaHQoMHhmZjAwMDAsIDUsIDIsIDUpXG4gIGNvbnN0IGNvbG9yMUhvbGRlciA9IHsgY29sb3I6IHJlY3RMaWdodDEuY29sb3IuZ2V0U3R5bGUoKSB9XG4gIHJlY3RMaWdodDEucG9zaXRpb24uc2V0KC0zLCAwLCA1KVxuICBzY2VuZS5hZGQocmVjdExpZ2h0MSlcblxuICBjb25zdCByZWN0TGlnaHQyID0gbmV3IFRIUkVFLlJlY3RBcmVhTGlnaHQoMHgwMGZmMDAsIDUsIDIsIDUpXG4gIGNvbnN0IGNvbG9yMkhvbGRlciA9IHsgY29sb3I6IHJlY3RMaWdodDIuY29sb3IuZ2V0U3R5bGUoKSB9XG4gIHJlY3RMaWdodDIucG9zaXRpb24uc2V0KDAsIDAsIDUpXG4gIHNjZW5lLmFkZChyZWN0TGlnaHQyKVxuXG4gIGNvbnN0IHJlY3RMaWdodDMgPSBuZXcgVEhSRUUuUmVjdEFyZWFMaWdodCgweDAwMDBmZiwgNSwgMiwgNSlcbiAgY29uc3QgY29sb3IzSG9sZGVyID0geyBjb2xvcjogcmVjdExpZ2h0My5jb2xvci5nZXRTdHlsZSgpIH1cbiAgcmVjdExpZ2h0My5wb3NpdGlvbi5zZXQoMywgMCwgNSlcbiAgc2NlbmUuYWRkKHJlY3RMaWdodDMpXG5cbiAgc2NlbmUuYWRkKG5ldyBSZWN0QXJlYUxpZ2h0SGVscGVyKHJlY3RMaWdodDEpKVxuICBzY2VuZS5hZGQobmV3IFJlY3RBcmVhTGlnaHRIZWxwZXIocmVjdExpZ2h0MikpXG4gIHNjZW5lLmFkZChuZXcgUmVjdEFyZWFMaWdodEhlbHBlcihyZWN0TGlnaHQzKSlcblxuICBmdW5jdGlvbiBhbmltYXRlKCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKVxuICAgIHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhKVxuICAgIHN0YXRzLnVwZGF0ZSgpXG5cbiAgICBvcmJpdENvbnRyb2xzLnVwZGF0ZSgpXG4gIH1cblxuICBzZXR1cFJlY3RHdWkoY29sb3IxSG9sZGVyLCByZWN0TGlnaHQxLCAncmVjdC1saWdodC0xJylcbiAgc2V0dXBSZWN0R3VpKGNvbG9yMkhvbGRlciwgcmVjdExpZ2h0MiwgJ3JlY3QtbGlnaHQtMicpXG4gIHNldHVwUmVjdEd1aShjb2xvcjNIb2xkZXIsIHJlY3RMaWdodDMsICdyZWN0LWxpZ2h0LTMnKVxuICBhbmltYXRlKClcbn0pXG5cbmZ1bmN0aW9uIHNldHVwUmVjdEd1aShjb2xvckhvbGRlciwgbGlnaHQsIGZvbGRlck5hbWUpIHtcbiAgY29uc3QgcmVjdEFyZWFGb2xkZXIgPSBndWkuYWRkRm9sZGVyKGZvbGRlck5hbWUpXG4gIHJlY3RBcmVhRm9sZGVyLmFkZENvbG9yKGNvbG9ySG9sZGVyLCAnY29sb3InKS5vbkNoYW5nZSgoYykgPT4gbGlnaHQuY29sb3Iuc2V0U3R5bGUoYykpXG4gIHJlY3RBcmVhRm9sZGVyLmFkZChsaWdodCwgJ2ludGVuc2l0eScsIDAsIDE1LCAwLjEpXG4gIHJlY3RBcmVhRm9sZGVyLmFkZChsaWdodCwgJ2RlY2F5JywgMCwgNSwgMC4wMSlcbiAgcmVjdEFyZWFGb2xkZXIuYWRkKGxpZ2h0LCAnd2lkdGgnLCAwLCAyMCwgMC4wMSlcbiAgcmVjdEFyZWFGb2xkZXIuYWRkKGxpZ2h0LCAnaGVpZ2h0JywgMCwgMjAsIDAuMDEpXG4gIHJlY3RBcmVhRm9sZGVyLmFkZChsaWdodC5wb3NpdGlvbiwgJ3gnLCAtMzAsIDMwLCAwLjEpLm5hbWUoJ3Bvc2l0aW9uWCcpXG4gIHJlY3RBcmVhRm9sZGVyLmFkZChsaWdodC5wb3NpdGlvbiwgJ3knLCAtMzAsIDMwLCAwLjEpLm5hbWUoJ3Bvc2l0aW9uWScpXG4gIHJlY3RBcmVhRm9sZGVyLmFkZChsaWdodC5wb3NpdGlvbiwgJ3onLCAtMzAsIDMwLCAwLjEpLm5hbWUoJ3Bvc2l0aW9uWicpXG4gIHJlY3RBcmVhRm9sZGVyLmFkZChsaWdodC5yb3RhdGlvbiwgJ3gnLCAtMiAqIE1hdGguUEksIDIgKiBNYXRoLlBJLCAwLjEpLm5hbWUoJ3JvdGF0aW9uWCcpXG4gIHJlY3RBcmVhRm9sZGVyLmFkZChsaWdodC5yb3RhdGlvbiwgJ3knLCAtMiAqIE1hdGguUEksIDIgKiBNYXRoLlBJLCAwLjEpLm5hbWUoJ3JvdGF0aW9uWScpXG4gIHJlY3RBcmVhRm9sZGVyLmFkZChsaWdodC5yb3RhdGlvbiwgJ3onLCAtMiAqIE1hdGguUEksIDIgKiBNYXRoLlBJLCAwLjEpLm5hbWUoJ3JvdGF0aW9uWicpXG59XG4iLCJpbXBvcnQgeyBPcmJpdENvbnRyb2xzIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2NvbnRyb2xzL09yYml0Q29udHJvbHMnXG5cbmV4cG9ydCBjb25zdCBpbml0T3JiaXRDb250cm9scyA9IChjYW1lcmEsIHJlbmRlcmVyKSA9PiB7XG4gIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgT3JiaXRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLmRvbUVsZW1lbnQpXG4gIGNvbnRyb2xsZXIuZW5hYmxlRGFtcGluZyA9IHRydWVcbiAgY29udHJvbGxlci5kYW1waW5nRmFjdG9yID0gMC4wNVxuICBjb250cm9sbGVyLm1pbkRpc3RhbmNlID0gMVxuICBjb250cm9sbGVyLm1heERpc3RhbmNlID0gMTAwXG4gIGNvbnRyb2xsZXIubWluUG9sYXJBbmdsZSA9IE1hdGguUEkgLyA0XG4gIGNvbnRyb2xsZXIubWF4UG9sYXJBbmdsZSA9ICgzICogTWF0aC5QSSkgLyA0XG5cbiAgcmV0dXJuIGNvbnRyb2xsZXJcbn1cbiIsImV4cG9ydCBjb25zdCB2aXNpdENoaWxkcmVuID0gKG9iamVjdCwgZm4pID0+IHtcbiAgaWYgKG9iamVjdC5jaGlsZHJlbiAmJiBvYmplY3QuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgIGZvciAoY29uc3QgY2hpbGQgb2Ygb2JqZWN0LmNoaWxkcmVuKSB7XG4gICAgICB2aXNpdENoaWxkcmVuKGNoaWxkLCBmbilcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZm4ob2JqZWN0KVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBhcHBseVNoYWRvd3NBbmREZXB0aFdyaXRlID0gKG9iamVjdCkgPT4ge1xuICB2aXNpdENoaWxkcmVuKG9iamVjdCwgKGNoaWxkKSA9PiB7XG4gICAgaWYgKGNoaWxkLm1hdGVyaWFsKSB7XG4gICAgICBjaGlsZC5tYXRlcmlhbC5kZXB0aFdyaXRlID0gdHJ1ZVxuICAgICAgY2hpbGQuY2FzdFNoYWRvdyA9IHRydWVcbiAgICAgIGNoaWxkLnJlY2VpdmVTaGFkb3cgPSB0cnVlXG4gICAgfVxuICB9KVxufVxuXG5leHBvcnQgY29uc3QgZmluZENoaWxkID0gKG9iamVjdCwgbmFtZSkgPT4ge1xuICBpZiAob2JqZWN0LmNoaWxkcmVuICYmIG9iamVjdC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgZm9yIChjb25zdCBjaGlsZCBvZiBvYmplY3QuY2hpbGRyZW4pIHtcbiAgICAgIGlmIChuYW1lID09PSBjaGlsZC5uYW1lKSB7XG4gICAgICAgIHJldHVybiBjaGlsZFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcmVzID0gZmluZENoaWxkKGNoaWxkLCBuYW1lKVxuICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChuYW1lID09PSBvYmplY3QubmFtZSkge1xuICAgICAgcmV0dXJuIG9iamVjdFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgU3RhdHMgZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xpYnMvc3RhdHMubW9kdWxlJ1xuXG5jb25zdCBzdGF0cyA9IFN0YXRzKClcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc3RhdHMuZG9tKVxuXG5leHBvcnQgeyBzdGF0cyB9XG4iLCJleHBvcnQgY29uc3Qgb25SZXNpemUgPSAoY2FtZXJhLCByZW5kZXJlcikgPT4ge1xuICBjb25zdCByZXNpemVyID0gKCkgPT4ge1xuICAgIGNhbWVyYS5hc3BlY3QgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodFxuICAgIGNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KClcbiAgICByZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpXG4gIH1cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZXIsIGZhbHNlKVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJyZWN0YXJlYS1saWdodFwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtsdGpzX2ZvdXJ0aFwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtsdGpzX2ZvdXJ0aFwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfYnVpbGRfdGhyZWVfbW9kdWxlX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fY29udHJvbHNfT3JiaXRDb250cm9sc19qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfbGlsLWd1aV9kaXN0X2xpbC1ndWlfZXNtX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fbG9hZGVyc19HTFRGTG9hZGVyX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21faGVscGVyc19SZWN0QXJlYUxpZ2h0SGVscGVyX2pzLW5vZGVfbW9kdWxlc190aHJlZV9leGEtYjE1NWZkXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTMvcmVjdGFyZWEtbGlnaHQuanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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

/***/ "./samples/chapters/chapter-6/teapot-geometry.js"
/*!*******************************************************!*\
  !*** ./samples/chapters/chapter-6/teapot-geometry.js ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_standard_scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/standard-scene */ "./samples/chapters/chapter-6/util/standard-scene.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./samples/chapters/chapter-6/util/index.js");
/* harmony import */ var three_examples_jsm_geometries_TeapotGeometry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/geometries/TeapotGeometry */ "./node_modules/three/examples/jsm/geometries/TeapotGeometry.js");




const props = {
  size: 1,
  segments: 20,
  bottom: true,
  lid: true,
  body: true,
  fitLid: true,
  blinn: true // aspects
}

const updateGeometry = ({ size, segments, bottom, lid, body, fitLid, blinn }) => {
  return new three_examples_jsm_geometries_TeapotGeometry__WEBPACK_IMPORTED_MODULE_2__.TeapotGeometry(size, segments, bottom, lid, body, fitLid, blinn)
}

const geometry = updateGeometry(props)

;(0,_util_standard_scene__WEBPACK_IMPORTED_MODULE_0__.bootstrapGeometryScene)({
  geometry,
  provideGui: (gui, mesh) => {
    const folder = gui.addFolder('THREE.TeapotGeometry')
    folder.add(props, 'size', 0, 10, 0.01).onChange(() => (0,_util__WEBPACK_IMPORTED_MODULE_1__.updateMesh)(mesh, updateGeometry(props)))
    folder.add(props, 'segments', 1, 30, 1).onChange(() => (0,_util__WEBPACK_IMPORTED_MODULE_1__.updateMesh)(mesh, updateGeometry(props)))
    folder.add(props, 'bottom', 0, 10, 0.01).onChange(() => (0,_util__WEBPACK_IMPORTED_MODULE_1__.updateMesh)(mesh, updateGeometry(props)))
    folder.add(props, 'lid', 1, 20, 1).onChange(() => (0,_util__WEBPACK_IMPORTED_MODULE_1__.updateMesh)(mesh, updateGeometry(props)))
    folder.add(props, 'body', 0, 3, 0.01).onChange(() => (0,_util__WEBPACK_IMPORTED_MODULE_1__.updateMesh)(mesh, updateGeometry(props)))
    folder.add(props, 'fitLid', 0, 3, 0.01).onChange(() => (0,_util__WEBPACK_IMPORTED_MODULE_1__.updateMesh)(mesh, updateGeometry(props)))
    folder.add(props, 'blinn', 0, 3, 0.01).onChange(() => (0,_util__WEBPACK_IMPORTED_MODULE_1__.updateMesh)(mesh, updateGeometry(props)))
  }
}).then()


/***/ },

/***/ "./samples/chapters/chapter-6/util/index.js"
/*!**************************************************!*\
  !*** ./samples/chapters/chapter-6/util/index.js ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updateMesh: () => (/* binding */ updateMesh)
/* harmony export */ });
const updateMesh = (mesh, geometry) => {
  mesh.geometry.dispose()
  mesh.geometry = geometry
}


/***/ },

/***/ "./samples/chapters/chapter-6/util/standard-scene.js"
/*!***********************************************************!*\
  !*** ./samples/chapters/chapter-6/util/standard-scene.js ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bootstrapGeometryScene: () => (/* binding */ bootstrapGeometryScene)
/* harmony export */ });
/* harmony import */ var _bootstrap_bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../bootstrap/bootstrap */ "./samples/bootstrap/bootstrap.js");
/* harmony import */ var _controls_renderer_control__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../controls/renderer-control */ "./samples/controls/renderer-control.js");
/* harmony import */ var lil_gui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lil-gui */ "./node_modules/lil-gui/dist/lil-gui.esm.js");
/* harmony import */ var _controls_material_controls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../controls/material-controls */ "./samples/controls/material-controls.js");
/* harmony import */ var _controls_scene_controls__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../controls/scene-controls */ "./samples/controls/scene-controls.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _bootstrap_floor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../bootstrap/floor */ "./samples/bootstrap/floor.js");
/* harmony import */ var _controls_mesh_visible_controls__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../controls/mesh-visible-controls */ "./samples/controls/mesh-visible-controls.js");










const bootstrapGeometryScene = async ({ geometry, provideGui, hidefloor, overrideMaterial, useLine }) => {
  const props = {
    backgroundColor: 0xffffff,
    fogColor: 0xffffff
  }

  const gui = new lil_gui__WEBPACK_IMPORTED_MODULE_2__["default"]()

  const init = async () => {
    const material =
      overrideMaterial ??
      new three__WEBPACK_IMPORTED_MODULE_5__.MeshStandardMaterial({
        color: 0xffaa88
      })
    const mesh = useLine ? new three__WEBPACK_IMPORTED_MODULE_5__.LineSegments(geometry, material) : new three__WEBPACK_IMPORTED_MODULE_5__.Mesh(geometry, material)
    mesh.castShadow = true
    ;(0,_bootstrap_bootstrap__WEBPACK_IMPORTED_MODULE_0__.initScene)(props)(({ scene, camera, renderer, orbitControls }) => {
      renderer.shadowMap.type = three__WEBPACK_IMPORTED_MODULE_5__.PCFSoftShadowMap
      camera.position.x = -3
      camera.position.z = 8
      camera.position.y = 2
      orbitControls.update()

      function animate() {
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
        orbitControls.update()
      }

      animate()

      const plane = hidefloor ?? (0,_bootstrap_floor__WEBPACK_IMPORTED_MODULE_6__.foreverPlane)(scene)
      scene.add(mesh)
      ;(0,_controls_renderer_control__WEBPACK_IMPORTED_MODULE_1__.intializeRendererControls)(gui, renderer)
      ;(0,_controls_scene_controls__WEBPACK_IMPORTED_MODULE_4__.initializeSceneControls)(gui, scene, false)

      ;(0,_controls_material_controls__WEBPACK_IMPORTED_MODULE_3__.initializeGuiMaterial)(gui, mesh, material).close()
      overrideMaterial ?? (0,_controls_material_controls__WEBPACK_IMPORTED_MODULE_3__.initializeGuiMeshStandardMaterial)(gui, mesh, material).close()
      hidefloor ?? (0,_controls_mesh_visible_controls__WEBPACK_IMPORTED_MODULE_7__.initializeMeshVisibleControls)(gui, plane, 'Floor')
      provideGui(gui, mesh, scene)
    })
  }

  init().then()
}


/***/ },

/***/ "./samples/controls/mesh-visible-controls.js"
/*!***************************************************!*\
  !*** ./samples/controls/mesh-visible-controls.js ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initializeMeshVisibleControls: () => (/* binding */ initializeMeshVisibleControls)
/* harmony export */ });
const initializeMeshVisibleControls = (gui, mesh, title) => {
  const folder = gui.addFolder(title)
  folder.add(mesh, 'visible')
}


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
/******/ 			"teapot-geometry": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","vendors-node_modules_three_examples_jsm_geometries_TeapotGeometry_js-node_modules_three_examp-0f46e4","samples_bootstrap_bootstrap_js-samples_controls_material-controls_js-samples_controls_rendere-c87d8a"], () => (__webpack_require__("./samples/chapters/chapter-6/teapot-geometry.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDakdBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7Ozs7V0MvQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSwrQkFBK0Isd0NBQXdDO1dBQ3ZFO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUJBQWlCLHFCQUFxQjtXQUN0QztXQUNBO1dBQ0Esa0JBQWtCLHFCQUFxQjtXQUN2QztXQUNBO1dBQ0EsS0FBSztXQUNMO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFOzs7OztXQzNCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdELEU7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBLDRHOzs7OztVRWhEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2Jvb3RzdHJhcC9mbG9vci5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci02L3RlYXBvdC1nZW9tZXRyeS5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci02L3V0aWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItNi91dGlsL3N0YW5kYXJkLXNjZW5lLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jb250cm9scy9tZXNoLXZpc2libGUtY29udHJvbHMuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NvbnRyb2xzL3NjZW5lLWNvbnRyb2xzLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5cbmV4cG9ydCBjb25zdCBmb3JldmVyUGxhbmUgPSAoc2NlbmUpID0+IHtcbiAgY29uc3QgZ2VvID0gbmV3IFRIUkVFLlBsYW5lQnVmZmVyR2VvbWV0cnkoMTAwMDAsIDEwMDAwKVxuICBjb25zdCBtYXQgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7XG4gICAgY29sb3I6IDB4ZmZmZmZmXG4gIH0pXG4gIGNvbnN0IG1lc2ggPSBuZXcgVEhSRUUuTWVzaChnZW8sIG1hdClcbiAgbWVzaC5wb3NpdGlvbi5zZXQoMCwgLTIsIDApXG4gIG1lc2gucm90YXRpb24uc2V0KE1hdGguUEkgLyAtMiwgMCwgMClcbiAgbWVzaC5yZWNlaXZlU2hhZG93ID0gdHJ1ZVxuICBtZXNoLm5hbWUgPSAnZm9yZXZlci1mbG9vcidcbiAgc2NlbmUuYWRkKG1lc2gpXG5cbiAgcmV0dXJuIG1lc2hcbn1cblxuZXhwb3J0IGNvbnN0IGZsb2F0aW5nRmxvb3IgPSAoc2NlbmUsIHNpemUpID0+IHtcbiAgY29uc3QgcyA9IHNpemUgPyBzaXplIDogNlxuICBjb25zdCBnZW8gPSBuZXcgVEhSRUUuQm94QnVmZmVyR2VvbWV0cnkocywgMC4yNSwgcywgMTAsIDEwLCAxMClcbiAgY29uc3QgbWF0ID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcbiAgICBjb2xvcjogMHhkZGRkZGRcbiAgfSlcbiAgY29uc3QgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlbywgbWF0KVxuICBtZXNoLnBvc2l0aW9uLnNldCgwLCAtMiwgLTEpXG4gIG1lc2gucmVjZWl2ZVNoYWRvdyA9IHRydWVcbiAgbWVzaC5uYW1lID0gJ2Zsb2F0aW5nLWZsb29yJ1xuICBzY2VuZS5hZGQobWVzaClcblxuICByZXR1cm4gbWVzaFxufVxuIiwiaW1wb3J0IHsgYm9vdHN0cmFwR2VvbWV0cnlTY2VuZSB9IGZyb20gJy4vdXRpbC9zdGFuZGFyZC1zY2VuZSdcbmltcG9ydCB7IHVwZGF0ZU1lc2ggfSBmcm9tICcuL3V0aWwnXG5pbXBvcnQgeyBUZWFwb3RHZW9tZXRyeSB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9nZW9tZXRyaWVzL1RlYXBvdEdlb21ldHJ5J1xuXG5jb25zdCBwcm9wcyA9IHtcbiAgc2l6ZTogMSxcbiAgc2VnbWVudHM6IDIwLFxuICBib3R0b206IHRydWUsXG4gIGxpZDogdHJ1ZSxcbiAgYm9keTogdHJ1ZSxcbiAgZml0TGlkOiB0cnVlLFxuICBibGlubjogdHJ1ZSAvLyBhc3BlY3RzXG59XG5cbmNvbnN0IHVwZGF0ZUdlb21ldHJ5ID0gKHsgc2l6ZSwgc2VnbWVudHMsIGJvdHRvbSwgbGlkLCBib2R5LCBmaXRMaWQsIGJsaW5uIH0pID0+IHtcbiAgcmV0dXJuIG5ldyBUZWFwb3RHZW9tZXRyeShzaXplLCBzZWdtZW50cywgYm90dG9tLCBsaWQsIGJvZHksIGZpdExpZCwgYmxpbm4pXG59XG5cbmNvbnN0IGdlb21ldHJ5ID0gdXBkYXRlR2VvbWV0cnkocHJvcHMpXG5cbmJvb3RzdHJhcEdlb21ldHJ5U2NlbmUoe1xuICBnZW9tZXRyeSxcbiAgcHJvdmlkZUd1aTogKGd1aSwgbWVzaCkgPT4ge1xuICAgIGNvbnN0IGZvbGRlciA9IGd1aS5hZGRGb2xkZXIoJ1RIUkVFLlRlYXBvdEdlb21ldHJ5JylcbiAgICBmb2xkZXIuYWRkKHByb3BzLCAnc2l6ZScsIDAsIDEwLCAwLjAxKS5vbkNoYW5nZSgoKSA9PiB1cGRhdGVNZXNoKG1lc2gsIHVwZGF0ZUdlb21ldHJ5KHByb3BzKSkpXG4gICAgZm9sZGVyLmFkZChwcm9wcywgJ3NlZ21lbnRzJywgMSwgMzAsIDEpLm9uQ2hhbmdlKCgpID0+IHVwZGF0ZU1lc2gobWVzaCwgdXBkYXRlR2VvbWV0cnkocHJvcHMpKSlcbiAgICBmb2xkZXIuYWRkKHByb3BzLCAnYm90dG9tJywgMCwgMTAsIDAuMDEpLm9uQ2hhbmdlKCgpID0+IHVwZGF0ZU1lc2gobWVzaCwgdXBkYXRlR2VvbWV0cnkocHJvcHMpKSlcbiAgICBmb2xkZXIuYWRkKHByb3BzLCAnbGlkJywgMSwgMjAsIDEpLm9uQ2hhbmdlKCgpID0+IHVwZGF0ZU1lc2gobWVzaCwgdXBkYXRlR2VvbWV0cnkocHJvcHMpKSlcbiAgICBmb2xkZXIuYWRkKHByb3BzLCAnYm9keScsIDAsIDMsIDAuMDEpLm9uQ2hhbmdlKCgpID0+IHVwZGF0ZU1lc2gobWVzaCwgdXBkYXRlR2VvbWV0cnkocHJvcHMpKSlcbiAgICBmb2xkZXIuYWRkKHByb3BzLCAnZml0TGlkJywgMCwgMywgMC4wMSkub25DaGFuZ2UoKCkgPT4gdXBkYXRlTWVzaChtZXNoLCB1cGRhdGVHZW9tZXRyeShwcm9wcykpKVxuICAgIGZvbGRlci5hZGQocHJvcHMsICdibGlubicsIDAsIDMsIDAuMDEpLm9uQ2hhbmdlKCgpID0+IHVwZGF0ZU1lc2gobWVzaCwgdXBkYXRlR2VvbWV0cnkocHJvcHMpKSlcbiAgfVxufSkudGhlbigpXG4iLCJleHBvcnQgY29uc3QgdXBkYXRlTWVzaCA9IChtZXNoLCBnZW9tZXRyeSkgPT4ge1xuICBtZXNoLmdlb21ldHJ5LmRpc3Bvc2UoKVxuICBtZXNoLmdlb21ldHJ5ID0gZ2VvbWV0cnlcbn1cbiIsImltcG9ydCB7IGluaXRTY2VuZSB9IGZyb20gJy4uLy4uLy4uL2Jvb3RzdHJhcC9ib290c3RyYXAnXG5pbXBvcnQgeyBpbnRpYWxpemVSZW5kZXJlckNvbnRyb2xzIH0gZnJvbSAnLi4vLi4vLi4vY29udHJvbHMvcmVuZGVyZXItY29udHJvbCdcblxuaW1wb3J0IEdVSSBmcm9tICdsaWwtZ3VpJ1xuaW1wb3J0IHsgaW5pdGlhbGl6ZUd1aU1hdGVyaWFsLCBpbml0aWFsaXplR3VpTWVzaFN0YW5kYXJkTWF0ZXJpYWwgfSBmcm9tICcuLi8uLi8uLi9jb250cm9scy9tYXRlcmlhbC1jb250cm9scydcbmltcG9ydCB7IGluaXRpYWxpemVTY2VuZUNvbnRyb2xzIH0gZnJvbSAnLi4vLi4vLi4vY29udHJvbHMvc2NlbmUtY29udHJvbHMnXG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcbmltcG9ydCB7IGZvcmV2ZXJQbGFuZSB9IGZyb20gJy4uLy4uLy4uL2Jvb3RzdHJhcC9mbG9vcidcbmltcG9ydCB7IGluaXRpYWxpemVNZXNoVmlzaWJsZUNvbnRyb2xzIH0gZnJvbSAnLi4vLi4vLi4vY29udHJvbHMvbWVzaC12aXNpYmxlLWNvbnRyb2xzJ1xuXG5leHBvcnQgY29uc3QgYm9vdHN0cmFwR2VvbWV0cnlTY2VuZSA9IGFzeW5jICh7IGdlb21ldHJ5LCBwcm92aWRlR3VpLCBoaWRlZmxvb3IsIG92ZXJyaWRlTWF0ZXJpYWwsIHVzZUxpbmUgfSkgPT4ge1xuICBjb25zdCBwcm9wcyA9IHtcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IDB4ZmZmZmZmLFxuICAgIGZvZ0NvbG9yOiAweGZmZmZmZlxuICB9XG5cbiAgY29uc3QgZ3VpID0gbmV3IEdVSSgpXG5cbiAgY29uc3QgaW5pdCA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBtYXRlcmlhbCA9XG4gICAgICBvdmVycmlkZU1hdGVyaWFsID8/XG4gICAgICBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoe1xuICAgICAgICBjb2xvcjogMHhmZmFhODhcbiAgICAgIH0pXG4gICAgY29uc3QgbWVzaCA9IHVzZUxpbmUgPyBuZXcgVEhSRUUuTGluZVNlZ21lbnRzKGdlb21ldHJ5LCBtYXRlcmlhbCkgOiBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpXG4gICAgbWVzaC5jYXN0U2hhZG93ID0gdHJ1ZVxuICAgIGluaXRTY2VuZShwcm9wcykoKHsgc2NlbmUsIGNhbWVyYSwgcmVuZGVyZXIsIG9yYml0Q29udHJvbHMgfSkgPT4ge1xuICAgICAgcmVuZGVyZXIuc2hhZG93TWFwLnR5cGUgPSBUSFJFRS5QQ0ZTb2Z0U2hhZG93TWFwXG4gICAgICBjYW1lcmEucG9zaXRpb24ueCA9IC0zXG4gICAgICBjYW1lcmEucG9zaXRpb24ueiA9IDhcbiAgICAgIGNhbWVyYS5wb3NpdGlvbi55ID0gMlxuICAgICAgb3JiaXRDb250cm9scy51cGRhdGUoKVxuXG4gICAgICBmdW5jdGlvbiBhbmltYXRlKCkge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSlcbiAgICAgICAgcmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEpXG4gICAgICAgIG9yYml0Q29udHJvbHMudXBkYXRlKClcbiAgICAgIH1cblxuICAgICAgYW5pbWF0ZSgpXG5cbiAgICAgIGNvbnN0IHBsYW5lID0gaGlkZWZsb29yID8/IGZvcmV2ZXJQbGFuZShzY2VuZSlcbiAgICAgIHNjZW5lLmFkZChtZXNoKVxuICAgICAgaW50aWFsaXplUmVuZGVyZXJDb250cm9scyhndWksIHJlbmRlcmVyKVxuICAgICAgaW5pdGlhbGl6ZVNjZW5lQ29udHJvbHMoZ3VpLCBzY2VuZSwgZmFsc2UpXG5cbiAgICAgIGluaXRpYWxpemVHdWlNYXRlcmlhbChndWksIG1lc2gsIG1hdGVyaWFsKS5jbG9zZSgpXG4gICAgICBvdmVycmlkZU1hdGVyaWFsID8/IGluaXRpYWxpemVHdWlNZXNoU3RhbmRhcmRNYXRlcmlhbChndWksIG1lc2gsIG1hdGVyaWFsKS5jbG9zZSgpXG4gICAgICBoaWRlZmxvb3IgPz8gaW5pdGlhbGl6ZU1lc2hWaXNpYmxlQ29udHJvbHMoZ3VpLCBwbGFuZSwgJ0Zsb29yJylcbiAgICAgIHByb3ZpZGVHdWkoZ3VpLCBtZXNoLCBzY2VuZSlcbiAgICB9KVxuICB9XG5cbiAgaW5pdCgpLnRoZW4oKVxufVxuIiwiZXhwb3J0IGNvbnN0IGluaXRpYWxpemVNZXNoVmlzaWJsZUNvbnRyb2xzID0gKGd1aSwgbWVzaCwgdGl0bGUpID0+IHtcbiAgY29uc3QgZm9sZGVyID0gZ3VpLmFkZEZvbGRlcih0aXRsZSlcbiAgZm9sZGVyLmFkZChtZXNoLCAndmlzaWJsZScpXG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcblxuY29uc3QgdGV4dHVyZUxvYWRlciA9IG5ldyBUSFJFRS5UZXh0dXJlTG9hZGVyKClcblxuY29uc3QgcHJvcGVydGllc09iamVjdCA9IChzY2VuZSkgPT4gKHtcbiAgb3ZlcnJpZGVNYXRlcmlhbDoge1xuICAgIHRvZ2dsZTogKCkgPT4ge1xuICAgICAgaWYgKHNjZW5lLm92ZXJyaWRlTWF0ZXJpYWwgIT09IG51bGwpIHtcbiAgICAgICAgc2NlbmUub3ZlcnJpZGVNYXRlcmlhbCA9IG51bGxcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNjZW5lLm92ZXJyaWRlTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaE5vcm1hbE1hdGVyaWFsKClcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGJhY2tHcm91bmQ6ICdXaGl0ZScsXG4gIGVudmlyb25tZW50OiB7XG4gICAgdG9nZ2xlOiAoKSA9PiB7XG4gICAgICBpZiAoc2NlbmUuZW52aXJvbm1lbnQgIT09IG51bGwpIHtcbiAgICAgICAgc2NlbmUuZW52aXJvbm1lbnQgPSBudWxsXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZXh0dXJlTG9hZGVyLmxvYWQoJy9hc3NldHMvZXF1aS5qcGVnJywgKGxvYWRlZCkgPT4ge1xuICAgICAgICAgIGxvYWRlZC5tYXBwaW5nID0gVEhSRUUuRXF1aXJlY3Rhbmd1bGFyUmVmbGVjdGlvbk1hcHBpbmdcbiAgICAgICAgICBzY2VuZS5lbnZpcm9ubWVudCA9IGxvYWRlZFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxufSlcblxuY29uc3QgZm9nUHJvcGVydGllcyA9IChmb2cpID0+ICh7XG4gIGNvbG9yOiAweGZmZmZmZixcbiAgbmVhcjogZm9nLm5lYXIsXG4gIGZhcjogZm9nLmZhclxufSlcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVTY2VuZUNvbnRyb2xzID0gKGd1aSwgc2NlbmUsIGZvZ0VuYWJsZWQsIGlzT3BlbikgPT4ge1xuICBjb25zdCBwcm9wcyA9IHByb3BlcnRpZXNPYmplY3Qoc2NlbmUpXG4gIGNvbnN0IHNjZW5lQ29udHJvbHMgPSBndWkuYWRkRm9sZGVyKCdTY2VuZScpXG5cbiAgc2NlbmVDb250cm9sc1xuICAgIC5hZGQocHJvcHMsICdiYWNrR3JvdW5kJywgWydXaGl0ZScsICdCbGFjaycsICdOdWxsJywgJ0NvbG9yJywgJ1RleHR1cmUnLCAnQ3ViZW1hcCddKVxuICAgIC5vbkNoYW5nZSgoZXZlbnQpID0+IGhhbmRsZUJhY2tncm91bmRDaGFuZ2UoZXZlbnQsIHNjZW5lKSlcbiAgc2NlbmVDb250cm9scy5hZGQocHJvcHMub3ZlcnJpZGVNYXRlcmlhbCwgJ3RvZ2dsZScpLm5hbWUoJ1RvZ2dsZSBPdmVycmlkZSBNYXRlcmlhbCcpXG4gIHNjZW5lQ29udHJvbHMuYWRkKHByb3BzLmVudmlyb25tZW50LCAndG9nZ2xlJykubmFtZSgnVG9nZ2xlIEVudmlyb25tZW50JylcblxuICBpZiAoZm9nRW5hYmxlZCkge1xuICAgIGNvbnN0IGZvZ0NvbG9yID0gbmV3IFRIUkVFLkNvbG9yKDB4ZmZmZmZmKVxuICAgIGNvbnN0IGZvZyA9IG5ldyBUSFJFRS5Gb2coZm9nQ29sb3IsIDEsIDIwKVxuICAgIHNjZW5lLmZvZyA9IGZvZ1xuICAgIGNvbnN0IGZvZ1Byb3BzID0gZm9nUHJvcGVydGllcyhmb2cpXG4gICAgY29uc3QgZm9nQ29udHJvbHMgPSBzY2VuZUNvbnRyb2xzLmFkZEZvbGRlcignRm9nJylcbiAgICBmb2dDb250cm9scy5hZGRDb2xvcihmb2dQcm9wcywgJ2NvbG9yJylcbiAgICBmb2dDb250cm9scy5hZGQoZm9nUHJvcHMsICduZWFyJywgMCwgMTAsIDAuMSlcbiAgICBmb2dDb250cm9scy5hZGQoZm9nUHJvcHMsICdmYXInLCAwLCAxMDAsIDAuMSlcblxuICAgIGZvZ0NvbnRyb2xzLm9uQ2hhbmdlKCgpID0+IHtcbiAgICAgIGZvZy5jb2xvciA9IGZvZ0NvbG9yLnNldEhleChmb2dQcm9wcy5jb2xvcilcbiAgICAgIGZvZy5uZWFyID0gZm9nUHJvcHMubmVhclxuICAgICAgZm9nLmZhciA9IGZvZ1Byb3BzLmZhclxuICAgIH0pXG4gIH1cblxuICBpc09wZW4gPyBzY2VuZUNvbnRyb2xzLm9wZW4oKSA6IHNjZW5lQ29udHJvbHMuY2xvc2UoKVxufVxuXG5jb25zdCBoYW5kbGVCYWNrZ3JvdW5kQ2hhbmdlID0gKHNldHRpbmcsIHNjZW5lKSA9PiB7XG4gIHN3aXRjaCAoc2V0dGluZykge1xuICAgIGNhc2UgJ1doaXRlJzpcbiAgICAgIHNjZW5lLmJhY2tncm91bmQgPSBuZXcgVEhSRUUuQ29sb3IoMHhmZmZmZmYpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ0JsYWNrJzpcbiAgICAgIHNjZW5lLmJhY2tncm91bmQgPSBuZXcgVEhSRUUuQ29sb3IoMHgwMDAwMDApXG4gICAgICBicmVha1xuICAgIGNhc2UgJ051bGwnOlxuICAgICAgc2NlbmUuYmFja2dyb3VuZCA9IG51bGxcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnQ29sb3InOlxuICAgICAgc2NlbmUuYmFja2dyb3VuZCA9IG5ldyBUSFJFRS5Db2xvcigweDQ0ZmY0NClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnVGV4dHVyZSc6XG4gICAgICB0ZXh0dXJlTG9hZGVyLmxvYWQoJy9hc3NldHMvdGV4dHVyZXMvd29vZC9hYnN0cmFjdC1hbnRpcXVlLWJhY2tkcm9wLTE2NDAwNS5qcGcnLCAobG9hZGVkKSA9PiB7XG4gICAgICAgIGxvYWRlZC5lbmNvZGluZyA9IFRIUkVFLnNSR0JFbmNvZGluZ1xuICAgICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbG9hZGVkXG4gICAgICAgIHNjZW5lLmVudmlyb25tZW50ID0gbnVsbFxuICAgICAgfSlcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnQ3ViZW1hcCc6XG4gICAgICB0ZXh0dXJlTG9hZGVyLmxvYWQoJy9hc3NldHMvZXF1aS5qcGVnJywgKGxvYWRlZCkgPT4ge1xuICAgICAgICBsb2FkZWQubWFwcGluZyA9IFRIUkVFLkVxdWlyZWN0YW5ndWxhclJlZmxlY3Rpb25NYXBwaW5nXG4gICAgICAgIHNjZW5lLmJhY2tncm91bmQgPSBsb2FkZWRcbiAgICAgICAgc2NlbmUuZW52aXJvbm1lbnQgPSBsb2FkZWRcbiAgICAgIH0pXG5cbiAgICAgIGJyZWFrXG4gICAgZGVmYXVsdDpcbiAgICAgIGJyZWFrXG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwidGVhcG90LWdlb21ldHJ5XCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2x0anNfZm91cnRoXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2x0anNfZm91cnRoXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9idWlsZF90aHJlZV9tb2R1bGVfanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9jb250cm9sc19PcmJpdENvbnRyb2xzX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc19saWwtZ3VpX2Rpc3RfbGlsLWd1aV9lc21fanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9nZW9tZXRyaWVzX1RlYXBvdEdlb21ldHJ5X2pzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcC0wZjQ2ZTRcIixcInNhbXBsZXNfYm9vdHN0cmFwX2Jvb3RzdHJhcF9qcy1zYW1wbGVzX2NvbnRyb2xzX21hdGVyaWFsLWNvbnRyb2xzX2pzLXNhbXBsZXNfY29udHJvbHNfcmVuZGVyZS1jODdkOGFcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItNi90ZWFwb3QtZ2VvbWV0cnkuanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
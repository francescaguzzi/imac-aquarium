/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./samples/chapters/chapter-8/save-load-json.js"
/*!******************************************************!*\
  !*** ./samples/chapters/chapter-8/save-load-json.js ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_standard_scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/standard-scene */ "./samples/chapters/chapter-8/util/standard-scene.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _controls_mesh_controls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../controls/mesh-controls */ "./samples/controls/mesh-controls.js");




const modelAsync = () => {
  const mesh = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(
    new three__WEBPACK_IMPORTED_MODULE_1__.TorusKnotBufferGeometry(1, 0.1, 200, 10, 6, 7),
    new three__WEBPACK_IMPORTED_MODULE_1__.MeshStandardMaterial({ color: 0xffe65f })
  )

  mesh.castShadow = true
  return mesh
}

;(0,_util_standard_scene__WEBPACK_IMPORTED_MODULE_0__.bootstrapMeshScene)({
  loadMesh: modelAsync,
  provideGui: (gui, mesh, scene) => {
    ;(0,_controls_mesh_controls__WEBPACK_IMPORTED_MODULE_2__.addMeshProperties)(gui, mesh, 'Mesh')
    const folder = gui.addFolder('Save/load')
    const saveLoadProps = {
      load: () => {
        const fromStorage = localStorage.getItem('json')
        if (fromStorage) {
          const structure = JSON.parse(fromStorage)
          const loader = new three__WEBPACK_IMPORTED_MODULE_1__.ObjectLoader()
          const mesh = loader.parse(structure)
          mesh.material.color = new three__WEBPACK_IMPORTED_MODULE_1__.Color(0xff0000)
          scene.add(mesh)
        }
      },
      save: () => {
        const asJson = mesh.toJSON()
        localStorage.setItem('json', JSON.stringify(asJson))
        localStorage.setItem('scene', JSON.stringify(scene.toJSON()))
        console.log(scene.toJSON())
      }
    }
    folder.add(saveLoadProps, 'load')
    folder.add(saveLoadProps, 'save')
  }
}).then()


/***/ },

/***/ "./samples/controls/mesh-controls.js"
/*!*******************************************!*\
  !*** ./samples/controls/mesh-controls.js ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addMeshProperties: () => (/* binding */ addMeshProperties)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");


const addMeshProperties = (gui, mesh, title) => {
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

  const meshFolder = gui.addFolder(title)
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
/******/ 			"save-load-json": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","samples_chapters_chapter-8_util_standard-scene_js"], () => (__webpack_require__("./samples/chapters/chapter-8/save-load-json.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvc2F2ZS1sb2FkLWpzb24uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBMEQ7QUFDNUI7QUFDa0M7O0FBRWhFO0FBQ0EsbUJBQW1CLHVDQUFVO0FBQzdCLFFBQVEsMERBQTZCO0FBQ3JDLFFBQVEsdURBQTBCLEdBQUcsaUJBQWlCO0FBQ3REOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx5RUFBa0I7QUFDbEI7QUFDQTtBQUNBLElBQUksMkVBQWlCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QiwrQ0FBa0I7QUFDL0M7QUFDQSxvQ0FBb0Msd0NBQVc7QUFDL0M7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4QzZCOztBQUV2QjtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsMENBQWE7QUFDOUMsS0FBSztBQUNMO0FBQ0EsaUNBQWlDLDBDQUFhO0FBQzlDLEtBQUs7QUFDTDtBQUNBLGlDQUFpQywwQ0FBYTtBQUM5QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7O1VDOUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7Ozs7V0MvQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSwrQkFBK0Isd0NBQXdDO1dBQ3ZFO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUJBQWlCLHFCQUFxQjtXQUN0QztXQUNBO1dBQ0Esa0JBQWtCLHFCQUFxQjtXQUN2QztXQUNBO1dBQ0EsS0FBSztXQUNMO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFOzs7OztXQzNCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdELEU7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBLDRHOzs7OztVRWhEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItOC9zYXZlLWxvYWQtanNvbi5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY29udHJvbHMvbWVzaC1jb250cm9scy5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGJvb3RzdHJhcE1lc2hTY2VuZSB9IGZyb20gJy4vdXRpbC9zdGFuZGFyZC1zY2VuZSdcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuaW1wb3J0IHsgYWRkTWVzaFByb3BlcnRpZXMgfSBmcm9tICcuLi8uLi9jb250cm9scy9tZXNoLWNvbnRyb2xzJ1xuXG5jb25zdCBtb2RlbEFzeW5jID0gKCkgPT4ge1xuICBjb25zdCBtZXNoID0gbmV3IFRIUkVFLk1lc2goXG4gICAgbmV3IFRIUkVFLlRvcnVzS25vdEJ1ZmZlckdlb21ldHJ5KDEsIDAuMSwgMjAwLCAxMCwgNiwgNyksXG4gICAgbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHsgY29sb3I6IDB4ZmZlNjVmIH0pXG4gIClcblxuICBtZXNoLmNhc3RTaGFkb3cgPSB0cnVlXG4gIHJldHVybiBtZXNoXG59XG5cbmJvb3RzdHJhcE1lc2hTY2VuZSh7XG4gIGxvYWRNZXNoOiBtb2RlbEFzeW5jLFxuICBwcm92aWRlR3VpOiAoZ3VpLCBtZXNoLCBzY2VuZSkgPT4ge1xuICAgIGFkZE1lc2hQcm9wZXJ0aWVzKGd1aSwgbWVzaCwgJ01lc2gnKVxuICAgIGNvbnN0IGZvbGRlciA9IGd1aS5hZGRGb2xkZXIoJ1NhdmUvbG9hZCcpXG4gICAgY29uc3Qgc2F2ZUxvYWRQcm9wcyA9IHtcbiAgICAgIGxvYWQ6ICgpID0+IHtcbiAgICAgICAgY29uc3QgZnJvbVN0b3JhZ2UgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnanNvbicpXG4gICAgICAgIGlmIChmcm9tU3RvcmFnZSkge1xuICAgICAgICAgIGNvbnN0IHN0cnVjdHVyZSA9IEpTT04ucGFyc2UoZnJvbVN0b3JhZ2UpXG4gICAgICAgICAgY29uc3QgbG9hZGVyID0gbmV3IFRIUkVFLk9iamVjdExvYWRlcigpXG4gICAgICAgICAgY29uc3QgbWVzaCA9IGxvYWRlci5wYXJzZShzdHJ1Y3R1cmUpXG4gICAgICAgICAgbWVzaC5tYXRlcmlhbC5jb2xvciA9IG5ldyBUSFJFRS5Db2xvcigweGZmMDAwMClcbiAgICAgICAgICBzY2VuZS5hZGQobWVzaClcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNhdmU6ICgpID0+IHtcbiAgICAgICAgY29uc3QgYXNKc29uID0gbWVzaC50b0pTT04oKVxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnanNvbicsIEpTT04uc3RyaW5naWZ5KGFzSnNvbikpXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzY2VuZScsIEpTT04uc3RyaW5naWZ5KHNjZW5lLnRvSlNPTigpKSlcbiAgICAgICAgY29uc29sZS5sb2coc2NlbmUudG9KU09OKCkpXG4gICAgICB9XG4gICAgfVxuICAgIGZvbGRlci5hZGQoc2F2ZUxvYWRQcm9wcywgJ2xvYWQnKVxuICAgIGZvbGRlci5hZGQoc2F2ZUxvYWRQcm9wcywgJ3NhdmUnKVxuICB9XG59KS50aGVuKClcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuXG5leHBvcnQgY29uc3QgYWRkTWVzaFByb3BlcnRpZXMgPSAoZ3VpLCBtZXNoLCB0aXRsZSkgPT4ge1xuICBjb25zdCBwcm9wcyA9IHtcbiAgICBzY2FsZVg6IG1lc2guc2NhbGUueCxcbiAgICBzY2FsZVk6IG1lc2guc2NhbGUueSxcbiAgICBzY2FsZVo6IG1lc2guc2NhbGUueixcbiAgICByb3RhdGlvblg6IG1lc2gucm90YXRpb24ueCxcbiAgICByb3RhdGlvblk6IG1lc2gucm90YXRpb24ueSxcbiAgICByb3RhdGlvblo6IG1lc2gucm90YXRpb24ueixcbiAgICBwb3NpdGlvblg6IG1lc2gucG9zaXRpb24ueCxcbiAgICBwb3NpdGlvblk6IG1lc2gucG9zaXRpb24ueSxcbiAgICBwb3NpdGlvblo6IG1lc2gucG9zaXRpb24ueixcbiAgICB0cmFuc2xhdGVYOiAwLFxuICAgIHRyYW5zbGF0ZVk6IDAsXG4gICAgdHJhbnNsYXRlWjogMCxcbiAgICB0cmFuc2xhdGU6ICgpID0+IHtcbiAgICAgIG1lc2gudHJhbnNsYXRlWChwcm9wcy50cmFuc2xhdGVYKVxuICAgICAgbWVzaC50cmFuc2xhdGVZKHByb3BzLnRyYW5zbGF0ZVkpXG4gICAgICBtZXNoLnRyYW5zbGF0ZVoocHJvcHMudHJhbnNsYXRlWilcbiAgICAgIHByb3BzLnBvc2l0aW9uWCA9IG1lc2gucG9zaXRpb24ueFxuICAgICAgcHJvcHMucG9zaXRpb25ZID0gbWVzaC5wb3NpdGlvbi55XG4gICAgICBwcm9wcy5wb3NpdGlvblogPSBtZXNoLnBvc2l0aW9uLnpcbiAgICB9LFxuICAgIGxvb2tBdFg6IDAsXG4gICAgbG9va0F0WTogMCxcbiAgICBsb29rQXRaOiAwLFxuICAgIGxvb2tBdDogKCkgPT4ge1xuICAgICAgbWVzaC5sb29rQXQocHJvcHMubG9va0F0WCwgcHJvcHMubG9va0F0WSwgcHJvcHMubG9va0F0WilcbiAgICB9LFxuICAgIHZpc2libGU6IG1lc2gudmlzaWJsZSxcbiAgICBjYXN0U2hhZG93OiBtZXNoLmNhc3RTaGFkb3csXG4gICAgcm90YXRlT25Xb3JsZEF4aXNYOiAoKSA9PiB7XG4gICAgICBtZXNoLnJvdGF0ZU9uV29ybGRBeGlzKG5ldyBUSFJFRS5WZWN0b3IzKDEsIDAsIDApLCBNYXRoLlBJIC8gNClcbiAgICB9LFxuICAgIHJvdGF0ZU9uV29ybGRBeGlzWTogKCkgPT4ge1xuICAgICAgbWVzaC5yb3RhdGVPbldvcmxkQXhpcyhuZXcgVEhSRUUuVmVjdG9yMygwLCAxLCAwKSwgTWF0aC5QSSAvIDQpXG4gICAgfSxcbiAgICByb3RhdGVPbldvcmxkQXhpc1o6ICgpID0+IHtcbiAgICAgIG1lc2gucm90YXRlT25Xb3JsZEF4aXMobmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMSksIE1hdGguUEkgLyA0KVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG1lc2hGb2xkZXIgPSBndWkuYWRkRm9sZGVyKHRpdGxlKVxuICBtZXNoRm9sZGVyLmFkZChwcm9wcywgJ3NjYWxlWCcsIDAsIDUsIDAuMSlcbiAgbWVzaEZvbGRlci5hZGQocHJvcHMsICdzY2FsZVknLCAwLCA1LCAwLjEpXG4gIG1lc2hGb2xkZXIuYWRkKHByb3BzLCAnc2NhbGVaJywgMCwgNSwgMC4xKVxuICBtZXNoRm9sZGVyLmFkZChwcm9wcywgJ3JvdGF0aW9uWCcsIC1NYXRoLlBJLCBNYXRoLlBJLCAwLjEpXG4gIG1lc2hGb2xkZXIuYWRkKHByb3BzLCAncm90YXRpb25ZJywgLU1hdGguUEksIE1hdGguUEksIDAuMSlcbiAgbWVzaEZvbGRlci5hZGQocHJvcHMsICdyb3RhdGlvblonLCAtTWF0aC5QSSwgTWF0aC5QSSwgMC4xKVxuICBtZXNoRm9sZGVyLmFkZChwcm9wcywgJ3Bvc2l0aW9uWCcsIC0zLCAzLCAwLjEpLmxpc3RlbigpXG4gIG1lc2hGb2xkZXIuYWRkKHByb3BzLCAncG9zaXRpb25ZJywgLTMsIDMsIDAuMSkubGlzdGVuKClcbiAgbWVzaEZvbGRlci5hZGQocHJvcHMsICdwb3NpdGlvblonLCAtMywgMywgMC4xKS5saXN0ZW4oKVxuICBtZXNoRm9sZGVyLmFkZChwcm9wcywgJ3RyYW5zbGF0ZVgnLCAtMywgMywgMC4xKVxuICBtZXNoRm9sZGVyLmFkZChwcm9wcywgJ3RyYW5zbGF0ZVknLCAtMywgMywgMC4xKVxuICBtZXNoRm9sZGVyLmFkZChwcm9wcywgJ3RyYW5zbGF0ZVonLCAtMywgMywgMC4xKVxuICBtZXNoRm9sZGVyLmFkZChwcm9wcywgJ3RyYW5zbGF0ZScpXG4gIG1lc2hGb2xkZXIuYWRkKHByb3BzLCAnbG9va0F0WCcsIC0zLCAzLCAwLjEpXG4gIG1lc2hGb2xkZXIuYWRkKHByb3BzLCAnbG9va0F0WScsIC0zLCAzLCAwLjEpXG4gIG1lc2hGb2xkZXIuYWRkKHByb3BzLCAnbG9va0F0WicsIC0zLCAzLCAwLjEpXG4gIG1lc2hGb2xkZXIuYWRkKHByb3BzLCAnbG9va0F0JylcbiAgbWVzaEZvbGRlci5hZGQocHJvcHMsICd2aXNpYmxlJylcbiAgbWVzaEZvbGRlci5hZGQocHJvcHMsICdjYXN0U2hhZG93JylcbiAgLy8gVE9ETywgd2UgY291bGQgYWRkIG1vcmUgaGVyZSwgb3IganVzdCBzaG93IHRoZSBheGlzLlxuICAvLyAgICAgICBvciBqdXN0IGNyZWF0ZSBhIHNpbXBsZSBleGFtcGxlIHdpdGggYSBwYXJlbnQgb2JqZWN0XG4gIC8vICAgICAgIHdoZXJlIHdlIHNob3cgdGhlIHRocmVlIGRpZmZlcmVudCBheGlzLlxuICAvLyBBbHNvIGRldGVybWluZSBoZXJlIGlmIFRocmVlLmpzIHJlYWxseSB1c2VzIG9iamVjdCBzcGFjZSBhcyBwYXJlbnRcbiAgLy8gaHR0cHM6Ly9qYXZhc2NyaXB0LnR1dG9yaWFsaW5rLmNvbS9yb3RhdGUtb2JqZWN0LW9uLXNwZWNpZmljLWF4aXMtYW55d2hlcmUtaW4tdGhyZWUtanMtaW5jbHVkaW5nLW91dHNpZGUtb2YtbWVzaC9cbiAgbWVzaEZvbGRlci5hZGQocHJvcHMsICdyb3RhdGVPbldvcmxkQXhpc1gnKVxuICBtZXNoRm9sZGVyLmFkZChwcm9wcywgJ3JvdGF0ZU9uV29ybGRBeGlzWScpXG4gIG1lc2hGb2xkZXIuYWRkKHByb3BzLCAncm90YXRlT25Xb3JsZEF4aXNaJylcbiAgbWVzaEZvbGRlci5vbkNoYW5nZSgoKSA9PiB7XG4gICAgbWVzaC5zY2FsZS5zZXQocHJvcHMuc2NhbGVYLCBwcm9wcy5zY2FsZVksIHByb3BzLnNjYWxlWilcbiAgICBtZXNoLnJvdGF0aW9uLnNldChwcm9wcy5yb3RhdGlvblgsIHByb3BzLnJvdGF0aW9uWSwgcHJvcHMucm90YXRpb25aKVxuICAgIG1lc2gucG9zaXRpb24uc2V0KHByb3BzLnBvc2l0aW9uWCwgcHJvcHMucG9zaXRpb25ZLCBwcm9wcy5wb3NpdGlvblopXG4gICAgbWVzaC52aXNpYmxlID0gcHJvcHMudmlzaWJsZVxuICAgIG1lc2guY2FzdFNoYWRvdyA9IHByb3BzLmNhc3RTaGFkb3dcbiAgfSlcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwic2F2ZS1sb2FkLWpzb25cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rbHRqc19mb3VydGhcIl0gPSBzZWxmW1wid2VicGFja0NodW5rbHRqc19mb3VydGhcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2J1aWxkX3RocmVlX21vZHVsZV9qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX2NvbnRyb2xzX09yYml0Q29udHJvbHNfanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX2xpbC1ndWlfZGlzdF9saWwtZ3VpX2VzbV9qc1wiLFwic2FtcGxlc19jaGFwdGVyc19jaGFwdGVyLThfdXRpbF9zdGFuZGFyZC1zY2VuZV9qc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci04L3NhdmUtbG9hZC1qc29uLmpzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
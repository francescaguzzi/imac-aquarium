/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./samples/chapters/chapter-12/audio.js"
/*!**********************************************!*\
  !*** ./samples/chapters/chapter-12/audio.js ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _chapter_9_util_standard_scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../chapter-9/util/standard-scene */ "./samples/chapters/chapter-9/util/standard-scene.js");
/* harmony import */ var three_examples_jsm_loaders_GLTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/loaders/GLTFLoader */ "./node_modules/three/examples/jsm/loaders/GLTFLoader.js");
/* harmony import */ var _util_modelUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/modelUtil */ "./samples/util/modelUtil.js");
/* harmony import */ var three_examples_jsm_controls_FirstPersonControls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/jsm/controls/FirstPersonControls */ "./node_modules/three/examples/jsm/controls/FirstPersonControls.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");






const modelAsync = () => {
  const loader = new three_examples_jsm_loaders_GLTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader()
  return loader.loadAsync('/assets/models/medieval_fantasy_book/scene.gltf').then((structure) => {
    // position scene
    structure.scene.scale.setScalar(0.8, 0.8, 0.8)
    structure.scene.translateY(-1.8)
    structure.scene.translateX(-1.8)

    // make sure all cast shadows
    ;(0,_util_modelUtil__WEBPACK_IMPORTED_MODULE_2__.applyShadowsAndDepthWrite)(structure.scene)
    return structure.scene
  })
}

;(0,_chapter_9_util_standard_scene__WEBPACK_IMPORTED_MODULE_0__.bootstrapMeshScene)({
  loadMesh: modelAsync,
  hidefloor: true,
  addControls: (camera, renderer, scene, gui) => {
    const controls = new three_examples_jsm_controls_FirstPersonControls__WEBPACK_IMPORTED_MODULE_3__.FirstPersonControls(camera, renderer.domElement)
    controls.movementSpeed = 3
    controls.lookSpeed = 0.1

    const folder = gui.addFolder('First Person Controls')
    folder.add(controls, 'activeLook')
    folder.add(controls, 'autoForward')
    folder.add(controls, 'enabled')
    folder.add(controls, 'heightCoef', 0, 10, 0.1)
    folder.add(controls, 'heightMax', 0, 10, 0.1)
    folder.add(controls, 'heightMin', 0, 10, 0.1)
    folder.add(controls, 'heightSpeed')
    folder.add(controls, 'lookVertical')
    folder.add(controls, 'lookSpeed', 0, 0.2, 0.0001)
    folder.add(controls, 'movementSpeed', 0, 10, 0.1)
    folder.add(controls, 'verticalMax', 0, Math.PI, 0.1)
    folder.add(controls, 'verticalMin', 0, Math.PI, 0.1)

    const listener = new three__WEBPACK_IMPORTED_MODULE_4__.AudioListener()
    camera.add(listener)

    const posSound1 = new three__WEBPACK_IMPORTED_MODULE_4__.PositionalAudio(listener)
    const posSound2 = new three__WEBPACK_IMPORTED_MODULE_4__.PositionalAudio(listener)
    const posSound3 = new three__WEBPACK_IMPORTED_MODULE_4__.PositionalAudio(listener)

    const props = {
      enableSounds: () => {
        posSound1.play()
        posSound2.play()
        posSound3.play()
      }
    }
    folder.add(props, 'enableSounds')

    const mesh1 = new three__WEBPACK_IMPORTED_MODULE_4__.Mesh(new three__WEBPACK_IMPORTED_MODULE_4__.BoxGeometry(1, 1, 1), new three__WEBPACK_IMPORTED_MODULE_4__.MeshNormalMaterial({ visible: false }))
    mesh1.position.set(-4, -2, 10)
    scene.add(mesh1)

    const mesh2 = new three__WEBPACK_IMPORTED_MODULE_4__.Mesh(new three__WEBPACK_IMPORTED_MODULE_4__.BoxGeometry(1, 1, 1), new three__WEBPACK_IMPORTED_MODULE_4__.MeshNormalMaterial({ visible: false }))
    mesh2.position.set(11, -2, 10)
    scene.add(mesh2)

    const mesh3 = new three__WEBPACK_IMPORTED_MODULE_4__.Mesh(new three__WEBPACK_IMPORTED_MODULE_4__.BoxGeometry(1, 1, 1), new three__WEBPACK_IMPORTED_MODULE_4__.MeshNormalMaterial({ visible: false }))
    mesh3.position.set(15, -3, -4)
    scene.add(mesh3)

    const audioLoader = new three__WEBPACK_IMPORTED_MODULE_4__.AudioLoader()

    audioLoader.load('/assets/sounds/cows.mp3', function (buffer) {
      posSound1.setBuffer(buffer)
      posSound1.setRefDistance(1)
      posSound1.setRolloffFactor(3)
      posSound1.setLoop(true)

      mesh3.add(posSound1)
    })

    audioLoader.load('/assets/sounds/sheep.mp3', function (buffer) {
      posSound2.setBuffer(buffer)
      posSound2.setRefDistance(1)
      posSound2.setRolloffFactor(3)
      posSound2.setLoop(true)

      mesh2.add(posSound2)
    })

    audioLoader.load('/assets/sounds/water.mp3', function (buffer) {
      posSound3.setBuffer(buffer)
      posSound3.setRefDistance(1)
      posSound3.setRolloffFactor(3)
      posSound3.setLoop(true)

      mesh1.add(posSound3)
    })

    return controls
  },
  onRender: (clock, controls) => {
    controls.update(clock.getDelta())
  }
}).then()


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
/******/ 			"audio": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","vendors-node_modules_three_examples_jsm_loaders_GLTFLoader_js","samples_chapters_chapter-9_util_standard-scene_js-samples_util_modelUtil_js-node_modules_thre-3e1526"], () => (__webpack_require__("./samples/chapters/chapter-12/audio.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvYXVkaW8uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFxRTtBQUNIO0FBQ0Y7QUFDcUI7QUFDdkQ7O0FBRTlCO0FBQ0EscUJBQXFCLDZFQUFVO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLDJFQUF5QjtBQUM3QjtBQUNBLEdBQUc7QUFDSDs7QUFFQSxtRkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLGdHQUFtQjtBQUM1QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHlCQUF5QixnREFBbUI7QUFDNUM7O0FBRUEsMEJBQTBCLGtEQUFxQjtBQUMvQywwQkFBMEIsa0RBQXFCO0FBQy9DLDBCQUEwQixrREFBcUI7O0FBRS9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCLHVDQUFVLEtBQUssOENBQWlCLGVBQWUscURBQXdCLEdBQUcsZ0JBQWdCO0FBQ2hIO0FBQ0E7O0FBRUEsc0JBQXNCLHVDQUFVLEtBQUssOENBQWlCLGVBQWUscURBQXdCLEdBQUcsZ0JBQWdCO0FBQ2hIO0FBQ0E7O0FBRUEsc0JBQXNCLHVDQUFVLEtBQUssOENBQWlCLGVBQWUscURBQXdCLEdBQUcsZ0JBQWdCO0FBQ2hIO0FBQ0E7O0FBRUEsNEJBQTRCLDhDQUFpQjs7QUFFN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7OztVQ3hHRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOztVQUVBO1VBQ0E7Ozs7O1dDL0JBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsK0JBQStCLHdDQUF3QztXQUN2RTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlCQUFpQixxQkFBcUI7V0FDdEM7V0FDQTtXQUNBLGtCQUFrQixxQkFBcUI7V0FDdkM7V0FDQTtXQUNBLEtBQUs7V0FDTDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRTs7Ozs7V0MzQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQSw0Rzs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTEyL2F1ZGlvLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYm9vdHN0cmFwTWVzaFNjZW5lIH0gZnJvbSAnLi4vY2hhcHRlci05L3V0aWwvc3RhbmRhcmQtc2NlbmUnXG5pbXBvcnQgeyBHTFRGTG9hZGVyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlcidcbmltcG9ydCB7IGFwcGx5U2hhZG93c0FuZERlcHRoV3JpdGUgfSBmcm9tICcuLi8uLi91dGlsL21vZGVsVXRpbCdcbmltcG9ydCB7IEZpcnN0UGVyc29uQ29udHJvbHMgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vY29udHJvbHMvRmlyc3RQZXJzb25Db250cm9scydcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuXG5jb25zdCBtb2RlbEFzeW5jID0gKCkgPT4ge1xuICBjb25zdCBsb2FkZXIgPSBuZXcgR0xURkxvYWRlcigpXG4gIHJldHVybiBsb2FkZXIubG9hZEFzeW5jKCcvYXNzZXRzL21vZGVscy9tZWRpZXZhbF9mYW50YXN5X2Jvb2svc2NlbmUuZ2x0ZicpLnRoZW4oKHN0cnVjdHVyZSkgPT4ge1xuICAgIC8vIHBvc2l0aW9uIHNjZW5lXG4gICAgc3RydWN0dXJlLnNjZW5lLnNjYWxlLnNldFNjYWxhcigwLjgsIDAuOCwgMC44KVxuICAgIHN0cnVjdHVyZS5zY2VuZS50cmFuc2xhdGVZKC0xLjgpXG4gICAgc3RydWN0dXJlLnNjZW5lLnRyYW5zbGF0ZVgoLTEuOClcblxuICAgIC8vIG1ha2Ugc3VyZSBhbGwgY2FzdCBzaGFkb3dzXG4gICAgYXBwbHlTaGFkb3dzQW5kRGVwdGhXcml0ZShzdHJ1Y3R1cmUuc2NlbmUpXG4gICAgcmV0dXJuIHN0cnVjdHVyZS5zY2VuZVxuICB9KVxufVxuXG5ib290c3RyYXBNZXNoU2NlbmUoe1xuICBsb2FkTWVzaDogbW9kZWxBc3luYyxcbiAgaGlkZWZsb29yOiB0cnVlLFxuICBhZGRDb250cm9sczogKGNhbWVyYSwgcmVuZGVyZXIsIHNjZW5lLCBndWkpID0+IHtcbiAgICBjb25zdCBjb250cm9scyA9IG5ldyBGaXJzdFBlcnNvbkNvbnRyb2xzKGNhbWVyYSwgcmVuZGVyZXIuZG9tRWxlbWVudClcbiAgICBjb250cm9scy5tb3ZlbWVudFNwZWVkID0gM1xuICAgIGNvbnRyb2xzLmxvb2tTcGVlZCA9IDAuMVxuXG4gICAgY29uc3QgZm9sZGVyID0gZ3VpLmFkZEZvbGRlcignRmlyc3QgUGVyc29uIENvbnRyb2xzJylcbiAgICBmb2xkZXIuYWRkKGNvbnRyb2xzLCAnYWN0aXZlTG9vaycpXG4gICAgZm9sZGVyLmFkZChjb250cm9scywgJ2F1dG9Gb3J3YXJkJylcbiAgICBmb2xkZXIuYWRkKGNvbnRyb2xzLCAnZW5hYmxlZCcpXG4gICAgZm9sZGVyLmFkZChjb250cm9scywgJ2hlaWdodENvZWYnLCAwLCAxMCwgMC4xKVxuICAgIGZvbGRlci5hZGQoY29udHJvbHMsICdoZWlnaHRNYXgnLCAwLCAxMCwgMC4xKVxuICAgIGZvbGRlci5hZGQoY29udHJvbHMsICdoZWlnaHRNaW4nLCAwLCAxMCwgMC4xKVxuICAgIGZvbGRlci5hZGQoY29udHJvbHMsICdoZWlnaHRTcGVlZCcpXG4gICAgZm9sZGVyLmFkZChjb250cm9scywgJ2xvb2tWZXJ0aWNhbCcpXG4gICAgZm9sZGVyLmFkZChjb250cm9scywgJ2xvb2tTcGVlZCcsIDAsIDAuMiwgMC4wMDAxKVxuICAgIGZvbGRlci5hZGQoY29udHJvbHMsICdtb3ZlbWVudFNwZWVkJywgMCwgMTAsIDAuMSlcbiAgICBmb2xkZXIuYWRkKGNvbnRyb2xzLCAndmVydGljYWxNYXgnLCAwLCBNYXRoLlBJLCAwLjEpXG4gICAgZm9sZGVyLmFkZChjb250cm9scywgJ3ZlcnRpY2FsTWluJywgMCwgTWF0aC5QSSwgMC4xKVxuXG4gICAgY29uc3QgbGlzdGVuZXIgPSBuZXcgVEhSRUUuQXVkaW9MaXN0ZW5lcigpXG4gICAgY2FtZXJhLmFkZChsaXN0ZW5lcilcblxuICAgIGNvbnN0IHBvc1NvdW5kMSA9IG5ldyBUSFJFRS5Qb3NpdGlvbmFsQXVkaW8obGlzdGVuZXIpXG4gICAgY29uc3QgcG9zU291bmQyID0gbmV3IFRIUkVFLlBvc2l0aW9uYWxBdWRpbyhsaXN0ZW5lcilcbiAgICBjb25zdCBwb3NTb3VuZDMgPSBuZXcgVEhSRUUuUG9zaXRpb25hbEF1ZGlvKGxpc3RlbmVyKVxuXG4gICAgY29uc3QgcHJvcHMgPSB7XG4gICAgICBlbmFibGVTb3VuZHM6ICgpID0+IHtcbiAgICAgICAgcG9zU291bmQxLnBsYXkoKVxuICAgICAgICBwb3NTb3VuZDIucGxheSgpXG4gICAgICAgIHBvc1NvdW5kMy5wbGF5KClcbiAgICAgIH1cbiAgICB9XG4gICAgZm9sZGVyLmFkZChwcm9wcywgJ2VuYWJsZVNvdW5kcycpXG5cbiAgICBjb25zdCBtZXNoMSA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSgxLCAxLCAxKSwgbmV3IFRIUkVFLk1lc2hOb3JtYWxNYXRlcmlhbCh7IHZpc2libGU6IGZhbHNlIH0pKVxuICAgIG1lc2gxLnBvc2l0aW9uLnNldCgtNCwgLTIsIDEwKVxuICAgIHNjZW5lLmFkZChtZXNoMSlcblxuICAgIGNvbnN0IG1lc2gyID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLkJveEdlb21ldHJ5KDEsIDEsIDEpLCBuZXcgVEhSRUUuTWVzaE5vcm1hbE1hdGVyaWFsKHsgdmlzaWJsZTogZmFsc2UgfSkpXG4gICAgbWVzaDIucG9zaXRpb24uc2V0KDExLCAtMiwgMTApXG4gICAgc2NlbmUuYWRkKG1lc2gyKVxuXG4gICAgY29uc3QgbWVzaDMgPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuQm94R2VvbWV0cnkoMSwgMSwgMSksIG5ldyBUSFJFRS5NZXNoTm9ybWFsTWF0ZXJpYWwoeyB2aXNpYmxlOiBmYWxzZSB9KSlcbiAgICBtZXNoMy5wb3NpdGlvbi5zZXQoMTUsIC0zLCAtNClcbiAgICBzY2VuZS5hZGQobWVzaDMpXG5cbiAgICBjb25zdCBhdWRpb0xvYWRlciA9IG5ldyBUSFJFRS5BdWRpb0xvYWRlcigpXG5cbiAgICBhdWRpb0xvYWRlci5sb2FkKCcvYXNzZXRzL3NvdW5kcy9jb3dzLm1wMycsIGZ1bmN0aW9uIChidWZmZXIpIHtcbiAgICAgIHBvc1NvdW5kMS5zZXRCdWZmZXIoYnVmZmVyKVxuICAgICAgcG9zU291bmQxLnNldFJlZkRpc3RhbmNlKDEpXG4gICAgICBwb3NTb3VuZDEuc2V0Um9sbG9mZkZhY3RvcigzKVxuICAgICAgcG9zU291bmQxLnNldExvb3AodHJ1ZSlcblxuICAgICAgbWVzaDMuYWRkKHBvc1NvdW5kMSlcbiAgICB9KVxuXG4gICAgYXVkaW9Mb2FkZXIubG9hZCgnL2Fzc2V0cy9zb3VuZHMvc2hlZXAubXAzJywgZnVuY3Rpb24gKGJ1ZmZlcikge1xuICAgICAgcG9zU291bmQyLnNldEJ1ZmZlcihidWZmZXIpXG4gICAgICBwb3NTb3VuZDIuc2V0UmVmRGlzdGFuY2UoMSlcbiAgICAgIHBvc1NvdW5kMi5zZXRSb2xsb2ZmRmFjdG9yKDMpXG4gICAgICBwb3NTb3VuZDIuc2V0TG9vcCh0cnVlKVxuXG4gICAgICBtZXNoMi5hZGQocG9zU291bmQyKVxuICAgIH0pXG5cbiAgICBhdWRpb0xvYWRlci5sb2FkKCcvYXNzZXRzL3NvdW5kcy93YXRlci5tcDMnLCBmdW5jdGlvbiAoYnVmZmVyKSB7XG4gICAgICBwb3NTb3VuZDMuc2V0QnVmZmVyKGJ1ZmZlcilcbiAgICAgIHBvc1NvdW5kMy5zZXRSZWZEaXN0YW5jZSgxKVxuICAgICAgcG9zU291bmQzLnNldFJvbGxvZmZGYWN0b3IoMylcbiAgICAgIHBvc1NvdW5kMy5zZXRMb29wKHRydWUpXG5cbiAgICAgIG1lc2gxLmFkZChwb3NTb3VuZDMpXG4gICAgfSlcblxuICAgIHJldHVybiBjb250cm9sc1xuICB9LFxuICBvblJlbmRlcjogKGNsb2NrLCBjb250cm9scykgPT4ge1xuICAgIGNvbnRyb2xzLnVwZGF0ZShjbG9jay5nZXREZWx0YSgpKVxuICB9XG59KS50aGVuKClcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiYXVkaW9cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rbHRqc19mb3VydGhcIl0gPSBzZWxmW1wid2VicGFja0NodW5rbHRqc19mb3VydGhcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2J1aWxkX3RocmVlX21vZHVsZV9qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX2NvbnRyb2xzX09yYml0Q29udHJvbHNfanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX2xpbC1ndWlfZGlzdF9saWwtZ3VpX2VzbV9qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX2xvYWRlcnNfR0xURkxvYWRlcl9qc1wiLFwic2FtcGxlc19jaGFwdGVyc19jaGFwdGVyLTlfdXRpbF9zdGFuZGFyZC1zY2VuZV9qcy1zYW1wbGVzX3V0aWxfbW9kZWxVdGlsX2pzLW5vZGVfbW9kdWxlc190aHJlLTNlMTUyNlwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci0xMi9hdWRpby5qc1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
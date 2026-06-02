/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./samples/chapters/chapter-10/texture-repeat-mapping.js"
/*!***************************************************************!*\
  !*** ./samples/chapters/chapter-10/texture-repeat-mapping.js ***!
  \***************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _util_standard_scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/standard-scene */ "./samples/chapters/chapter-10/util/standard-scene.js");
/* harmony import */ var _controls_material_controls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../controls/material-controls */ "./samples/controls/material-controls.js");




// import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader'

// const exrLoader = new EXRLoader()
const colorTexture = new three__WEBPACK_IMPORTED_MODULE_0__.TextureLoader().load(
  '/assets/textures/red-bricks/red_bricks_04_diff_1k.jpg',
  (texture) => {
    texture.wrapS = three__WEBPACK_IMPORTED_MODULE_0__.RepeatWrapping
    texture.wrapT = three__WEBPACK_IMPORTED_MODULE_0__.RepeatWrapping
  }
)
const normalTexture = new three__WEBPACK_IMPORTED_MODULE_0__.TextureLoader().load(
  '/assets/textures/red-bricks/red_bricks_04_nor_gl_1k.jpg',
  (texture) => {
    texture.wrapS = three__WEBPACK_IMPORTED_MODULE_0__.RepeatWrapping
    texture.wrapT = three__WEBPACK_IMPORTED_MODULE_0__.RepeatWrapping
  }
)

// const roughnessTexture = new THREE.TextureLoader().load(
//   '/assets/textures/red-bricks/red_bricks_04_rough_gl_1k.jpg',
//   (texture) => {
//     texture.wrapS = THREE.RepeatWrapping
//     texture.wrapT = THREE.RepeatWrapping
//   }
// )

const material = new three__WEBPACK_IMPORTED_MODULE_0__.MeshStandardMaterial({ color: 0xffffff })
material.map = colorTexture
material.normalMap = normalTexture

const props = {
  material: material,
  withMaterialGui: true,
  provideGui: (gui, mesh, material) => {
    ;(0,_controls_material_controls__WEBPACK_IMPORTED_MODULE_2__.initializeGuiMeshStandardMaterial)(gui, mesh, material)

    gui.folders.map((f) => {
      if (f._title === 'Textures') {
        f.destroy()
      }
    })

    const wrappingTypes = {
      repeatWrapping: three__WEBPACK_IMPORTED_MODULE_0__.RepeatWrapping,
      clampToEdgeWrapping: three__WEBPACK_IMPORTED_MODULE_0__.ClampToEdgeWrapping,
      mirroredRepeatWrapping: three__WEBPACK_IMPORTED_MODULE_0__.MirroredRepeatWrapping
    }

    const props = {
      normalScaleX: 1,
      normalScaleY: 1,
      repeatX: 1,
      repeatY: 1,
      wrappingType: three__WEBPACK_IMPORTED_MODULE_0__.RepeatWrapping
    }
    const textureFolder = gui.addFolder('Textures')
    textureFolder.add(props, 'normalScaleX', 0, 5, 0.001).onChange(() => {
      material.normalScale.set(props.normalScaleX, props.normalScaleY)
      material.normalMap.needsUpdate = true
    })
    textureFolder.add(props, 'normalScaleY', 0, 5, 0.001).onChange(() => {
      material.normalScale.set(props.normalScaleX, props.normalScaleY)
      material.normalMap.needsUpdate = true
    })
    textureFolder.add(props, 'repeatX', 1, 10, 1).onChange(() => {
      material.normalScale.set(props.normalScaleX, props.normalScaleY)
      material.normalMap.needsUpdate = true
      material.normalMap.repeat.set(props.repeatX, props.repeatY)
      material.map.repeat.set(props.repeatX, props.repeatY)
    })
    textureFolder.add(props, 'repeatY', 1, 10, 1).onChange(() => {
      material.normalScale.set(props.normalScaleX, props.normalScaleY)
      material.normalMap.repeat.set(props.repeatX, props.repeatY)
      material.map.repeat.set(props.repeatX, props.repeatY)
    })
    textureFolder.add(props, 'wrappingType', wrappingTypes).onChange(() => {
      material.normalMap.wrapS = props.wrappingType
      material.normalMap.wrapT = props.wrappingType
      material.map.wrapS = props.wrappingType
      material.map.wrapT = props.wrappingType

      material.map.needsUpdate = true
      material.normalMap.needsUpdate = true
    })
  },
  onRender: (scene) => {
    const mesh = scene.getObjectByName('mesh')
    if (mesh) {
      mesh.rotation.y += 0.001
    }
  }
}

;(0,_util_standard_scene__WEBPACK_IMPORTED_MODULE_1__.bootstrapMaterialScene)(props).then()

// mention the other loaders in the text, and also explain RGBe and EXR. Don't show
// the loaders, but mention that we'll see them further down in the examples.


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
/******/ 			"texture-repeat-mapping": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","vendors-node_modules_three_examples_jsm_loaders_GLTFLoader_js","vendors-node_modules_three_examples_jsm_utils_BufferGeometryUtils_js","samples_bootstrap_bootstrap_js-samples_controls_material-controls_js-samples_controls_rendere-c87d8a","samples_chapters_chapter-10_util_standard-scene_js-node_modules_three_examples_jsm_helpers_Ve-fddbcb"], () => (__webpack_require__("./samples/chapters/chapter-10/texture-repeat-mapping.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvdGV4dHVyZS1yZXBlYXQtbWFwcGluZy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUE4QjtBQUNnQztBQUNzRDtBQUN0RTtBQUM5QyxZQUFZLFlBQVk7O0FBRXhCO0FBQ0EseUJBQXlCLGdEQUFtQjtBQUM1QztBQUNBO0FBQ0Esb0JBQW9CLGlEQUFvQjtBQUN4QyxvQkFBb0IsaURBQW9CO0FBQ3hDO0FBQ0E7QUFDQSwwQkFBMEIsZ0RBQW1CO0FBQzdDO0FBQ0E7QUFDQSxvQkFBb0IsaURBQW9CO0FBQ3hDLG9CQUFvQixpREFBb0I7QUFDeEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsdURBQTBCLEdBQUcsaUJBQWlCO0FBQ25FO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLCtGQUFpQzs7QUFFckM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0Esc0JBQXNCLGlEQUFvQjtBQUMxQywyQkFBMkIsc0RBQXlCO0FBQ3BELDhCQUE4Qix5REFBNEI7QUFDMUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixpREFBb0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDZFQUFzQjs7QUFFdEI7QUFDQTs7Ozs7OztVQ3BHQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOztVQUVBO1VBQ0E7Ozs7O1dDL0JBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsK0JBQStCLHdDQUF3QztXQUN2RTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlCQUFpQixxQkFBcUI7V0FDdEM7V0FDQTtXQUNBLGtCQUFrQixxQkFBcUI7V0FDdkM7V0FDQTtXQUNBLEtBQUs7V0FDTDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRTs7Ozs7V0MzQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQSw0Rzs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTEwL3RleHR1cmUtcmVwZWF0LW1hcHBpbmcuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcbmltcG9ydCB7IGJvb3RzdHJhcE1hdGVyaWFsU2NlbmUgfSBmcm9tICcuL3V0aWwvc3RhbmRhcmQtc2NlbmUnXG5pbXBvcnQgeyBpbml0aWFsaXplR3VpTWVzaFBob25nTWF0ZXJpYWwsIGluaXRpYWxpemVHdWlNZXNoU3RhbmRhcmRNYXRlcmlhbCB9IGZyb20gJy4uLy4uL2NvbnRyb2xzL21hdGVyaWFsLWNvbnRyb2xzJ1xuaW1wb3J0IHsgTWlycm9yZWRSZXBlYXRXcmFwcGluZyB9IGZyb20gJ3RocmVlJ1xuLy8gaW1wb3J0IHsgRVhSTG9hZGVyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvRVhSTG9hZGVyJ1xuXG4vLyBjb25zdCBleHJMb2FkZXIgPSBuZXcgRVhSTG9hZGVyKClcbmNvbnN0IGNvbG9yVGV4dHVyZSA9IG5ldyBUSFJFRS5UZXh0dXJlTG9hZGVyKCkubG9hZChcbiAgJy9hc3NldHMvdGV4dHVyZXMvcmVkLWJyaWNrcy9yZWRfYnJpY2tzXzA0X2RpZmZfMWsuanBnJyxcbiAgKHRleHR1cmUpID0+IHtcbiAgICB0ZXh0dXJlLndyYXBTID0gVEhSRUUuUmVwZWF0V3JhcHBpbmdcbiAgICB0ZXh0dXJlLndyYXBUID0gVEhSRUUuUmVwZWF0V3JhcHBpbmdcbiAgfVxuKVxuY29uc3Qgbm9ybWFsVGV4dHVyZSA9IG5ldyBUSFJFRS5UZXh0dXJlTG9hZGVyKCkubG9hZChcbiAgJy9hc3NldHMvdGV4dHVyZXMvcmVkLWJyaWNrcy9yZWRfYnJpY2tzXzA0X25vcl9nbF8xay5qcGcnLFxuICAodGV4dHVyZSkgPT4ge1xuICAgIHRleHR1cmUud3JhcFMgPSBUSFJFRS5SZXBlYXRXcmFwcGluZ1xuICAgIHRleHR1cmUud3JhcFQgPSBUSFJFRS5SZXBlYXRXcmFwcGluZ1xuICB9XG4pXG5cbi8vIGNvbnN0IHJvdWdobmVzc1RleHR1cmUgPSBuZXcgVEhSRUUuVGV4dHVyZUxvYWRlcigpLmxvYWQoXG4vLyAgICcvYXNzZXRzL3RleHR1cmVzL3JlZC1icmlja3MvcmVkX2JyaWNrc18wNF9yb3VnaF9nbF8xay5qcGcnLFxuLy8gICAodGV4dHVyZSkgPT4ge1xuLy8gICAgIHRleHR1cmUud3JhcFMgPSBUSFJFRS5SZXBlYXRXcmFwcGluZ1xuLy8gICAgIHRleHR1cmUud3JhcFQgPSBUSFJFRS5SZXBlYXRXcmFwcGluZ1xuLy8gICB9XG4vLyApXG5cbmNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHsgY29sb3I6IDB4ZmZmZmZmIH0pXG5tYXRlcmlhbC5tYXAgPSBjb2xvclRleHR1cmVcbm1hdGVyaWFsLm5vcm1hbE1hcCA9IG5vcm1hbFRleHR1cmVcblxuY29uc3QgcHJvcHMgPSB7XG4gIG1hdGVyaWFsOiBtYXRlcmlhbCxcbiAgd2l0aE1hdGVyaWFsR3VpOiB0cnVlLFxuICBwcm92aWRlR3VpOiAoZ3VpLCBtZXNoLCBtYXRlcmlhbCkgPT4ge1xuICAgIGluaXRpYWxpemVHdWlNZXNoU3RhbmRhcmRNYXRlcmlhbChndWksIG1lc2gsIG1hdGVyaWFsKVxuXG4gICAgZ3VpLmZvbGRlcnMubWFwKChmKSA9PiB7XG4gICAgICBpZiAoZi5fdGl0bGUgPT09ICdUZXh0dXJlcycpIHtcbiAgICAgICAgZi5kZXN0cm95KClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3Qgd3JhcHBpbmdUeXBlcyA9IHtcbiAgICAgIHJlcGVhdFdyYXBwaW5nOiBUSFJFRS5SZXBlYXRXcmFwcGluZyxcbiAgICAgIGNsYW1wVG9FZGdlV3JhcHBpbmc6IFRIUkVFLkNsYW1wVG9FZGdlV3JhcHBpbmcsXG4gICAgICBtaXJyb3JlZFJlcGVhdFdyYXBwaW5nOiBUSFJFRS5NaXJyb3JlZFJlcGVhdFdyYXBwaW5nXG4gICAgfVxuXG4gICAgY29uc3QgcHJvcHMgPSB7XG4gICAgICBub3JtYWxTY2FsZVg6IDEsXG4gICAgICBub3JtYWxTY2FsZVk6IDEsXG4gICAgICByZXBlYXRYOiAxLFxuICAgICAgcmVwZWF0WTogMSxcbiAgICAgIHdyYXBwaW5nVHlwZTogVEhSRUUuUmVwZWF0V3JhcHBpbmdcbiAgICB9XG4gICAgY29uc3QgdGV4dHVyZUZvbGRlciA9IGd1aS5hZGRGb2xkZXIoJ1RleHR1cmVzJylcbiAgICB0ZXh0dXJlRm9sZGVyLmFkZChwcm9wcywgJ25vcm1hbFNjYWxlWCcsIDAsIDUsIDAuMDAxKS5vbkNoYW5nZSgoKSA9PiB7XG4gICAgICBtYXRlcmlhbC5ub3JtYWxTY2FsZS5zZXQocHJvcHMubm9ybWFsU2NhbGVYLCBwcm9wcy5ub3JtYWxTY2FsZVkpXG4gICAgICBtYXRlcmlhbC5ub3JtYWxNYXAubmVlZHNVcGRhdGUgPSB0cnVlXG4gICAgfSlcbiAgICB0ZXh0dXJlRm9sZGVyLmFkZChwcm9wcywgJ25vcm1hbFNjYWxlWScsIDAsIDUsIDAuMDAxKS5vbkNoYW5nZSgoKSA9PiB7XG4gICAgICBtYXRlcmlhbC5ub3JtYWxTY2FsZS5zZXQocHJvcHMubm9ybWFsU2NhbGVYLCBwcm9wcy5ub3JtYWxTY2FsZVkpXG4gICAgICBtYXRlcmlhbC5ub3JtYWxNYXAubmVlZHNVcGRhdGUgPSB0cnVlXG4gICAgfSlcbiAgICB0ZXh0dXJlRm9sZGVyLmFkZChwcm9wcywgJ3JlcGVhdFgnLCAxLCAxMCwgMSkub25DaGFuZ2UoKCkgPT4ge1xuICAgICAgbWF0ZXJpYWwubm9ybWFsU2NhbGUuc2V0KHByb3BzLm5vcm1hbFNjYWxlWCwgcHJvcHMubm9ybWFsU2NhbGVZKVxuICAgICAgbWF0ZXJpYWwubm9ybWFsTWFwLm5lZWRzVXBkYXRlID0gdHJ1ZVxuICAgICAgbWF0ZXJpYWwubm9ybWFsTWFwLnJlcGVhdC5zZXQocHJvcHMucmVwZWF0WCwgcHJvcHMucmVwZWF0WSlcbiAgICAgIG1hdGVyaWFsLm1hcC5yZXBlYXQuc2V0KHByb3BzLnJlcGVhdFgsIHByb3BzLnJlcGVhdFkpXG4gICAgfSlcbiAgICB0ZXh0dXJlRm9sZGVyLmFkZChwcm9wcywgJ3JlcGVhdFknLCAxLCAxMCwgMSkub25DaGFuZ2UoKCkgPT4ge1xuICAgICAgbWF0ZXJpYWwubm9ybWFsU2NhbGUuc2V0KHByb3BzLm5vcm1hbFNjYWxlWCwgcHJvcHMubm9ybWFsU2NhbGVZKVxuICAgICAgbWF0ZXJpYWwubm9ybWFsTWFwLnJlcGVhdC5zZXQocHJvcHMucmVwZWF0WCwgcHJvcHMucmVwZWF0WSlcbiAgICAgIG1hdGVyaWFsLm1hcC5yZXBlYXQuc2V0KHByb3BzLnJlcGVhdFgsIHByb3BzLnJlcGVhdFkpXG4gICAgfSlcbiAgICB0ZXh0dXJlRm9sZGVyLmFkZChwcm9wcywgJ3dyYXBwaW5nVHlwZScsIHdyYXBwaW5nVHlwZXMpLm9uQ2hhbmdlKCgpID0+IHtcbiAgICAgIG1hdGVyaWFsLm5vcm1hbE1hcC53cmFwUyA9IHByb3BzLndyYXBwaW5nVHlwZVxuICAgICAgbWF0ZXJpYWwubm9ybWFsTWFwLndyYXBUID0gcHJvcHMud3JhcHBpbmdUeXBlXG4gICAgICBtYXRlcmlhbC5tYXAud3JhcFMgPSBwcm9wcy53cmFwcGluZ1R5cGVcbiAgICAgIG1hdGVyaWFsLm1hcC53cmFwVCA9IHByb3BzLndyYXBwaW5nVHlwZVxuXG4gICAgICBtYXRlcmlhbC5tYXAubmVlZHNVcGRhdGUgPSB0cnVlXG4gICAgICBtYXRlcmlhbC5ub3JtYWxNYXAubmVlZHNVcGRhdGUgPSB0cnVlXG4gICAgfSlcbiAgfSxcbiAgb25SZW5kZXI6IChzY2VuZSkgPT4ge1xuICAgIGNvbnN0IG1lc2ggPSBzY2VuZS5nZXRPYmplY3RCeU5hbWUoJ21lc2gnKVxuICAgIGlmIChtZXNoKSB7XG4gICAgICBtZXNoLnJvdGF0aW9uLnkgKz0gMC4wMDFcbiAgICB9XG4gIH1cbn1cblxuYm9vdHN0cmFwTWF0ZXJpYWxTY2VuZShwcm9wcykudGhlbigpXG5cbi8vIG1lbnRpb24gdGhlIG90aGVyIGxvYWRlcnMgaW4gdGhlIHRleHQsIGFuZCBhbHNvIGV4cGxhaW4gUkdCZSBhbmQgRVhSLiBEb24ndCBzaG93XG4vLyB0aGUgbG9hZGVycywgYnV0IG1lbnRpb24gdGhhdCB3ZSdsbCBzZWUgdGhlbSBmdXJ0aGVyIGRvd24gaW4gdGhlIGV4YW1wbGVzLlxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJ0ZXh0dXJlLXJlcGVhdC1tYXBwaW5nXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2x0anNfZm91cnRoXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2x0anNfZm91cnRoXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9idWlsZF90aHJlZV9tb2R1bGVfanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9jb250cm9sc19PcmJpdENvbnRyb2xzX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc19saWwtZ3VpX2Rpc3RfbGlsLWd1aV9lc21fanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9sb2FkZXJzX0dMVEZMb2FkZXJfanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV91dGlsc19CdWZmZXJHZW9tZXRyeVV0aWxzX2pzXCIsXCJzYW1wbGVzX2Jvb3RzdHJhcF9ib290c3RyYXBfanMtc2FtcGxlc19jb250cm9sc19tYXRlcmlhbC1jb250cm9sc19qcy1zYW1wbGVzX2NvbnRyb2xzX3JlbmRlcmUtYzg3ZDhhXCIsXCJzYW1wbGVzX2NoYXB0ZXJzX2NoYXB0ZXItMTBfdXRpbF9zdGFuZGFyZC1zY2VuZV9qcy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX2hlbHBlcnNfVmUtZmRkYmNiXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTEwL3RleHR1cmUtcmVwZWF0LW1hcHBpbmcuanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
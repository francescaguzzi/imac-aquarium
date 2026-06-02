/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./samples/chapters/chapter-11/multi-passes-2.js"
/*!*******************************************************!*\
  !*** ./samples/chapters/chapter-11/multi-passes-2.js ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_standard_scene_seahouse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/standard-scene-seahouse */ "./samples/chapters/chapter-11/util/standard-scene-seahouse.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var three_examples_jsm_postprocessing_EffectComposer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/postprocessing/EffectComposer */ "./node_modules/three/examples/jsm/postprocessing/EffectComposer.js");
/* harmony import */ var three_examples_jsm_postprocessing_OutlinePass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/jsm/postprocessing/OutlinePass */ "./node_modules/three/examples/jsm/postprocessing/OutlinePass.js");
/* harmony import */ var three_examples_jsm_postprocessing_RenderPass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three/examples/jsm/postprocessing/RenderPass */ "./node_modules/three/examples/jsm/postprocessing/RenderPass.js");
/* harmony import */ var three_examples_jsm_postprocessing_GlitchPass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! three/examples/jsm/postprocessing/GlitchPass */ "./node_modules/three/examples/jsm/postprocessing/GlitchPass.js");
/* harmony import */ var three_examples_jsm_postprocessing_HalftonePass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! three/examples/jsm/postprocessing/HalftonePass */ "./node_modules/three/examples/jsm/postprocessing/HalftonePass.js");
/* harmony import */ var three_examples_jsm_postprocessing_UnrealBloomPass__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! three/examples/jsm/postprocessing/UnrealBloomPass */ "./node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js");
/* harmony import */ var three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! three/examples/jsm/postprocessing/ShaderPass */ "./node_modules/three/examples/jsm/postprocessing/ShaderPass.js");
/* harmony import */ var three_examples_jsm_shaders_CopyShader_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! three/examples/jsm/shaders/CopyShader.js */ "./node_modules/three/examples/jsm/shaders/CopyShader.js");
/* harmony import */ var three_examples_jsm_shaders_GammaCorrectionShader__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! three/examples/jsm/shaders/GammaCorrectionShader */ "./node_modules/three/examples/jsm/shaders/GammaCorrectionShader.js");
/* harmony import */ var three_examples_jsm_postprocessing_TexturePass__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! three/examples/jsm/postprocessing/TexturePass */ "./node_modules/three/examples/jsm/postprocessing/TexturePass.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _util_pass_controls__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./util/pass-controls */ "./samples/chapters/chapter-11/util/pass-controls.js");

















const width = window.innerWidth || 2
const height = window.innerHeight || 2
const halfWidth = width / 2
const halfHeight = height / 2

const clock = new three__WEBPACK_IMPORTED_MODULE_12__.Clock()

const animate = (renderer, composers, mixer) => {
  renderer.clear()
  renderer.autoClear = false
  const delta = clock.getDelta()

  composers.renderedSceneComposer.render()

  renderer.setViewport(0, 0, halfWidth, halfHeight)
  composers.outlineComposer.render(delta)

  renderer.setViewport(halfWidth, 0, halfWidth, halfHeight)
  composers.glitchPassComposer.render(delta)

  renderer.setViewport(0, halfHeight, halfWidth, halfHeight)
  composers.unrealBloomPassComposer.render(delta)

  renderer.setViewport(halfWidth, halfHeight, halfWidth, halfHeight)
  composers.halftonePassComposer.render(delta)

  requestAnimationFrame(() => animate(renderer, composers, mixer))
}

let outlinePass = undefined
const unrealBloomPass = new three_examples_jsm_postprocessing_UnrealBloomPass__WEBPACK_IMPORTED_MODULE_7__.UnrealBloomPass(new three__WEBPACK_IMPORTED_MODULE_12__.Vector2(512, 512), 0.5)

console.log(unrealBloomPass)

const halftonePass = new three_examples_jsm_postprocessing_HalftonePass__WEBPACK_IMPORTED_MODULE_6__.HalftonePass()
const glitchPass = new three_examples_jsm_postprocessing_GlitchPass__WEBPACK_IMPORTED_MODULE_5__.GlitchPass()

let glitchPassComposer = undefined
let halftonePassComposer = undefined
let unrealBloomPassComposer = undefined

const setupComposer = (renderer, scene, camera, mesh) => {
  const effectCopy = new three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_8__.ShaderPass(three_examples_jsm_shaders_CopyShader_js__WEBPACK_IMPORTED_MODULE_9__.CopyShader)
  const renderedSceneComposer = new three_examples_jsm_postprocessing_EffectComposer__WEBPACK_IMPORTED_MODULE_2__.EffectComposer(renderer)
  renderedSceneComposer.addPass(new three_examples_jsm_postprocessing_RenderPass__WEBPACK_IMPORTED_MODULE_4__.RenderPass(scene, camera))
  renderedSceneComposer.addPass(new three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_8__.ShaderPass(three_examples_jsm_shaders_GammaCorrectionShader__WEBPACK_IMPORTED_MODULE_10__.GammaCorrectionShader))
  renderedSceneComposer.addPass(effectCopy)
  renderedSceneComposer.renderToScreen = false
  const texturePass = new three_examples_jsm_postprocessing_TexturePass__WEBPACK_IMPORTED_MODULE_11__.TexturePass(renderedSceneComposer.renderTarget2.texture)

  outlinePass = new three_examples_jsm_postprocessing_OutlinePass__WEBPACK_IMPORTED_MODULE_3__.OutlinePass(new three__WEBPACK_IMPORTED_MODULE_12__.Vector2(128, 128), scene, camera, [mesh])
  const outlineComposer = new three_examples_jsm_postprocessing_EffectComposer__WEBPACK_IMPORTED_MODULE_2__.EffectComposer(renderer)
  outlineComposer.addPass(texturePass)
  outlineComposer.addPass(outlinePass)

  halftonePassComposer = new three_examples_jsm_postprocessing_EffectComposer__WEBPACK_IMPORTED_MODULE_2__.EffectComposer(renderer)
  halftonePassComposer.addPass(texturePass)
  halftonePassComposer.addPass(halftonePass)

  glitchPassComposer = new three_examples_jsm_postprocessing_EffectComposer__WEBPACK_IMPORTED_MODULE_2__.EffectComposer(renderer)
  glitchPassComposer.addPass(texturePass)
  glitchPassComposer.addPass(glitchPass)

  unrealBloomPassComposer = new three_examples_jsm_postprocessing_EffectComposer__WEBPACK_IMPORTED_MODULE_2__.EffectComposer(renderer)
  unrealBloomPassComposer.addPass(texturePass)
  unrealBloomPassComposer.addPass(unrealBloomPass)
  unrealBloomPassComposer.addPass(effectCopy)

  const copyComposer = new three_examples_jsm_postprocessing_EffectComposer__WEBPACK_IMPORTED_MODULE_2__.EffectComposer(renderer)
  copyComposer.addPass(texturePass)
  copyComposer.addPass(effectCopy)

  return {
    renderedSceneComposer,
    outlineComposer,
    halftonePassComposer,
    unrealBloomPassComposer,
    glitchPassComposer,
    copyComposer
  }
}

;(0,_util_standard_scene_seahouse__WEBPACK_IMPORTED_MODULE_0__.bootstrapMeshScene)({
  addControls: (camera, renderer, scene, gui) => {
    const controls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1__.OrbitControls(camera, renderer.domElement)
    ;(0,_util_pass_controls__WEBPACK_IMPORTED_MODULE_13__.addGlitchPassControls)(gui, {}, (updated) => {
      glitchPassComposer.passes[1] = updated
    })
    ;(0,_util_pass_controls__WEBPACK_IMPORTED_MODULE_13__.addOutlinePassControls)(gui, {}, outlinePass)

    ;(0,_util_pass_controls__WEBPACK_IMPORTED_MODULE_13__.addUnrealBloomPassControls)(gui, {}, (updated) => {
      unrealBloomPassComposer.passes[1] = updated
    })

    ;(0,_util_pass_controls__WEBPACK_IMPORTED_MODULE_13__.addHalftonePassControls)(gui, { height: halfHeight, width: halfWidth }, (updated) => {
      halftonePassComposer.passes[1] = updated
    })

    return controls
  },
  initializeComposer: (renderer, scene, camera, mesh) => setupComposer(renderer, scene, camera, mesh),
  animate: (renderer, composer, mixer, clock) => animate(renderer, composer, mixer, clock)
}).then()


/***/ },

/***/ "./samples/chapters/chapter-11/util/standard-scene-seahouse.js"
/*!*********************************************************************!*\
  !*** ./samples/chapters/chapter-11/util/standard-scene-seahouse.js ***!
  \*********************************************************************/
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
/* harmony import */ var three_examples_jsm_loaders_GLTFLoader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! three/examples/jsm/loaders/GLTFLoader */ "./node_modules/three/examples/jsm/loaders/GLTFLoader.js");
/* harmony import */ var _util_modelUtil__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../util/modelUtil */ "./samples/util/modelUtil.js");









const bootstrapMeshScene = async ({ provideGui, backgroundColor, addControls, initializeComposer, animate }) => {
  const props = {
    backgroundColor: backgroundColor ?? 0xffffff,
    disableDefaultControls: true
  }

  const loader = new three_examples_jsm_loaders_GLTFLoader__WEBPACK_IMPORTED_MODULE_5__.GLTFLoader()
  const mesh = await loader.loadAsync('/assets/models/sea_house/scene.gltf').then((structure) => {
    structure.scene.scale.setScalar(0.03, 0.03, 0.03)
    ;(0,_util_modelUtil__WEBPACK_IMPORTED_MODULE_6__.visitChildren)(structure.scene, (child) => {
      if (child.material) {
        child.material.depthWrite = true
      }
    })
    return structure.scene
  })

  const gui = new lil_gui__WEBPACK_IMPORTED_MODULE_2__["default"]()

  const init = async () => {
    ;(0,_bootstrap_bootstrap__WEBPACK_IMPORTED_MODULE_0__.initScene)(props)(({ scene, camera, renderer }) => {
      renderer.shadowMap.type = three__WEBPACK_IMPORTED_MODULE_4__.PCFSoftShadowMap
      camera.position.x = -3
      camera.position.z = 8
      camera.position.y = 4

      if (mesh) scene.add(mesh)

      ;(0,_controls_renderer_control__WEBPACK_IMPORTED_MODULE_1__.intializeRendererControls)(gui, renderer)
      ;(0,_controls_scene_controls__WEBPACK_IMPORTED_MODULE_3__.initializeSceneControls)(gui, scene, false)

      const composer = initializeComposer(renderer, scene, camera, mesh)

      if (provideGui) provideGui(gui, mesh, scene)
      let controls = undefined
      if (addControls) {
        controls = addControls(camera, renderer, scene, gui, mesh)
      }

      animate(renderer, composer)
    })
  }

  init().then()
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
/******/ 			"multi-passes-2": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","vendors-node_modules_three_examples_jsm_loaders_GLTFLoader_js","vendors-node_modules_three_examples_jsm_postprocessing_EffectComposer_js-node_modules_three_e-dd9777","vendors-node_modules_three_examples_jsm_postprocessing_UnrealBloomPass_js","vendors-node_modules_three_examples_jsm_postprocessing_BloomPass_js-node_modules_three_exampl-9bde57","vendors-node_modules_three_examples_jsm_postprocessing_OutlinePass_js-node_modules_three_exam-02a26a","samples_bootstrap_bootstrap_js-samples_chapters_chapter-11_util_pass-controls_js-samples_cont-b2fed1"], () => (__webpack_require__("./samples/chapters/chapter-11/multi-passes-2.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDQTtXQUNBLGlCQUFpQixxQkFBcUI7V0FDdEM7V0FDQTtXQUNBLGtCQUFrQixxQkFBcUI7V0FDdkM7V0FDQTtXQUNBLEtBQUs7V0FDTDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRTs7Ozs7V0MzQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQSw0Rzs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTExL211bHRpLXBhc3Nlcy0yLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTExL3V0aWwvc3RhbmRhcmQtc2NlbmUtc2VhaG91c2UuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL3V0aWwvbW9kZWxVdGlsLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYm9vdHN0cmFwTWVzaFNjZW5lIH0gZnJvbSAnLi91dGlsL3N0YW5kYXJkLXNjZW5lLXNlYWhvdXNlJ1xuaW1wb3J0IHsgT3JiaXRDb250cm9scyB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9jb250cm9scy9PcmJpdENvbnRyb2xzJ1xuXG5pbXBvcnQgeyBFZmZlY3RDb21wb3NlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9wb3N0cHJvY2Vzc2luZy9FZmZlY3RDb21wb3NlcidcbmltcG9ydCB7IE91dGxpbmVQYXNzIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL3Bvc3Rwcm9jZXNzaW5nL091dGxpbmVQYXNzJ1xuaW1wb3J0IHsgUmVuZGVyUGFzcyB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9wb3N0cHJvY2Vzc2luZy9SZW5kZXJQYXNzJ1xuaW1wb3J0IHsgR2xpdGNoUGFzcyB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9wb3N0cHJvY2Vzc2luZy9HbGl0Y2hQYXNzJ1xuaW1wb3J0IHsgSGFsZnRvbmVQYXNzIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL3Bvc3Rwcm9jZXNzaW5nL0hhbGZ0b25lUGFzcydcbmltcG9ydCB7IFVucmVhbEJsb29tUGFzcyB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9wb3N0cHJvY2Vzc2luZy9VbnJlYWxCbG9vbVBhc3MnXG5pbXBvcnQgeyBTaGFkZXJQYXNzIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL3Bvc3Rwcm9jZXNzaW5nL1NoYWRlclBhc3MnXG5pbXBvcnQgeyBDb3B5U2hhZGVyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL3NoYWRlcnMvQ29weVNoYWRlci5qcydcbmltcG9ydCB7IEdhbW1hQ29ycmVjdGlvblNoYWRlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9zaGFkZXJzL0dhbW1hQ29ycmVjdGlvblNoYWRlcidcbmltcG9ydCB7IFRleHR1cmVQYXNzIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL3Bvc3Rwcm9jZXNzaW5nL1RleHR1cmVQYXNzJ1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5pbXBvcnQgeyBWZWN0b3IyIH0gZnJvbSAndGhyZWUnXG5pbXBvcnQge1xuICBhZGRHbGl0Y2hQYXNzQ29udHJvbHMsXG4gIGFkZEhhbGZ0b25lUGFzc0NvbnRyb2xzLFxuICBhZGRPdXRsaW5lUGFzc0NvbnRyb2xzLFxuICBhZGRVbnJlYWxCbG9vbVBhc3NDb250cm9sc1xufSBmcm9tICcuL3V0aWwvcGFzcy1jb250cm9scydcblxuY29uc3Qgd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCB8fCAyXG5jb25zdCBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgMlxuY29uc3QgaGFsZldpZHRoID0gd2lkdGggLyAyXG5jb25zdCBoYWxmSGVpZ2h0ID0gaGVpZ2h0IC8gMlxuXG5jb25zdCBjbG9jayA9IG5ldyBUSFJFRS5DbG9jaygpXG5cbmNvbnN0IGFuaW1hdGUgPSAocmVuZGVyZXIsIGNvbXBvc2VycywgbWl4ZXIpID0+IHtcbiAgcmVuZGVyZXIuY2xlYXIoKVxuICByZW5kZXJlci5hdXRvQ2xlYXIgPSBmYWxzZVxuICBjb25zdCBkZWx0YSA9IGNsb2NrLmdldERlbHRhKClcblxuICBjb21wb3NlcnMucmVuZGVyZWRTY2VuZUNvbXBvc2VyLnJlbmRlcigpXG5cbiAgcmVuZGVyZXIuc2V0Vmlld3BvcnQoMCwgMCwgaGFsZldpZHRoLCBoYWxmSGVpZ2h0KVxuICBjb21wb3NlcnMub3V0bGluZUNvbXBvc2VyLnJlbmRlcihkZWx0YSlcblxuICByZW5kZXJlci5zZXRWaWV3cG9ydChoYWxmV2lkdGgsIDAsIGhhbGZXaWR0aCwgaGFsZkhlaWdodClcbiAgY29tcG9zZXJzLmdsaXRjaFBhc3NDb21wb3Nlci5yZW5kZXIoZGVsdGEpXG5cbiAgcmVuZGVyZXIuc2V0Vmlld3BvcnQoMCwgaGFsZkhlaWdodCwgaGFsZldpZHRoLCBoYWxmSGVpZ2h0KVxuICBjb21wb3NlcnMudW5yZWFsQmxvb21QYXNzQ29tcG9zZXIucmVuZGVyKGRlbHRhKVxuXG4gIHJlbmRlcmVyLnNldFZpZXdwb3J0KGhhbGZXaWR0aCwgaGFsZkhlaWdodCwgaGFsZldpZHRoLCBoYWxmSGVpZ2h0KVxuICBjb21wb3NlcnMuaGFsZnRvbmVQYXNzQ29tcG9zZXIucmVuZGVyKGRlbHRhKVxuXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBhbmltYXRlKHJlbmRlcmVyLCBjb21wb3NlcnMsIG1peGVyKSlcbn1cblxubGV0IG91dGxpbmVQYXNzID0gdW5kZWZpbmVkXG5jb25zdCB1bnJlYWxCbG9vbVBhc3MgPSBuZXcgVW5yZWFsQmxvb21QYXNzKG5ldyBUSFJFRS5WZWN0b3IyKDUxMiwgNTEyKSwgMC41KVxuXG5jb25zb2xlLmxvZyh1bnJlYWxCbG9vbVBhc3MpXG5cbmNvbnN0IGhhbGZ0b25lUGFzcyA9IG5ldyBIYWxmdG9uZVBhc3MoKVxuY29uc3QgZ2xpdGNoUGFzcyA9IG5ldyBHbGl0Y2hQYXNzKClcblxubGV0IGdsaXRjaFBhc3NDb21wb3NlciA9IHVuZGVmaW5lZFxubGV0IGhhbGZ0b25lUGFzc0NvbXBvc2VyID0gdW5kZWZpbmVkXG5sZXQgdW5yZWFsQmxvb21QYXNzQ29tcG9zZXIgPSB1bmRlZmluZWRcblxuY29uc3Qgc2V0dXBDb21wb3NlciA9IChyZW5kZXJlciwgc2NlbmUsIGNhbWVyYSwgbWVzaCkgPT4ge1xuICBjb25zdCBlZmZlY3RDb3B5ID0gbmV3IFNoYWRlclBhc3MoQ29weVNoYWRlcilcbiAgY29uc3QgcmVuZGVyZWRTY2VuZUNvbXBvc2VyID0gbmV3IEVmZmVjdENvbXBvc2VyKHJlbmRlcmVyKVxuICByZW5kZXJlZFNjZW5lQ29tcG9zZXIuYWRkUGFzcyhuZXcgUmVuZGVyUGFzcyhzY2VuZSwgY2FtZXJhKSlcbiAgcmVuZGVyZWRTY2VuZUNvbXBvc2VyLmFkZFBhc3MobmV3IFNoYWRlclBhc3MoR2FtbWFDb3JyZWN0aW9uU2hhZGVyKSlcbiAgcmVuZGVyZWRTY2VuZUNvbXBvc2VyLmFkZFBhc3MoZWZmZWN0Q29weSlcbiAgcmVuZGVyZWRTY2VuZUNvbXBvc2VyLnJlbmRlclRvU2NyZWVuID0gZmFsc2VcbiAgY29uc3QgdGV4dHVyZVBhc3MgPSBuZXcgVGV4dHVyZVBhc3MocmVuZGVyZWRTY2VuZUNvbXBvc2VyLnJlbmRlclRhcmdldDIudGV4dHVyZSlcblxuICBvdXRsaW5lUGFzcyA9IG5ldyBPdXRsaW5lUGFzcyhuZXcgVmVjdG9yMigxMjgsIDEyOCksIHNjZW5lLCBjYW1lcmEsIFttZXNoXSlcbiAgY29uc3Qgb3V0bGluZUNvbXBvc2VyID0gbmV3IEVmZmVjdENvbXBvc2VyKHJlbmRlcmVyKVxuICBvdXRsaW5lQ29tcG9zZXIuYWRkUGFzcyh0ZXh0dXJlUGFzcylcbiAgb3V0bGluZUNvbXBvc2VyLmFkZFBhc3Mob3V0bGluZVBhc3MpXG5cbiAgaGFsZnRvbmVQYXNzQ29tcG9zZXIgPSBuZXcgRWZmZWN0Q29tcG9zZXIocmVuZGVyZXIpXG4gIGhhbGZ0b25lUGFzc0NvbXBvc2VyLmFkZFBhc3ModGV4dHVyZVBhc3MpXG4gIGhhbGZ0b25lUGFzc0NvbXBvc2VyLmFkZFBhc3MoaGFsZnRvbmVQYXNzKVxuXG4gIGdsaXRjaFBhc3NDb21wb3NlciA9IG5ldyBFZmZlY3RDb21wb3NlcihyZW5kZXJlcilcbiAgZ2xpdGNoUGFzc0NvbXBvc2VyLmFkZFBhc3ModGV4dHVyZVBhc3MpXG4gIGdsaXRjaFBhc3NDb21wb3Nlci5hZGRQYXNzKGdsaXRjaFBhc3MpXG5cbiAgdW5yZWFsQmxvb21QYXNzQ29tcG9zZXIgPSBuZXcgRWZmZWN0Q29tcG9zZXIocmVuZGVyZXIpXG4gIHVucmVhbEJsb29tUGFzc0NvbXBvc2VyLmFkZFBhc3ModGV4dHVyZVBhc3MpXG4gIHVucmVhbEJsb29tUGFzc0NvbXBvc2VyLmFkZFBhc3ModW5yZWFsQmxvb21QYXNzKVxuICB1bnJlYWxCbG9vbVBhc3NDb21wb3Nlci5hZGRQYXNzKGVmZmVjdENvcHkpXG5cbiAgY29uc3QgY29weUNvbXBvc2VyID0gbmV3IEVmZmVjdENvbXBvc2VyKHJlbmRlcmVyKVxuICBjb3B5Q29tcG9zZXIuYWRkUGFzcyh0ZXh0dXJlUGFzcylcbiAgY29weUNvbXBvc2VyLmFkZFBhc3MoZWZmZWN0Q29weSlcblxuICByZXR1cm4ge1xuICAgIHJlbmRlcmVkU2NlbmVDb21wb3NlcixcbiAgICBvdXRsaW5lQ29tcG9zZXIsXG4gICAgaGFsZnRvbmVQYXNzQ29tcG9zZXIsXG4gICAgdW5yZWFsQmxvb21QYXNzQ29tcG9zZXIsXG4gICAgZ2xpdGNoUGFzc0NvbXBvc2VyLFxuICAgIGNvcHlDb21wb3NlclxuICB9XG59XG5cbmJvb3RzdHJhcE1lc2hTY2VuZSh7XG4gIGFkZENvbnRyb2xzOiAoY2FtZXJhLCByZW5kZXJlciwgc2NlbmUsIGd1aSkgPT4ge1xuICAgIGNvbnN0IGNvbnRyb2xzID0gbmV3IE9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlci5kb21FbGVtZW50KVxuICAgIGFkZEdsaXRjaFBhc3NDb250cm9scyhndWksIHt9LCAodXBkYXRlZCkgPT4ge1xuICAgICAgZ2xpdGNoUGFzc0NvbXBvc2VyLnBhc3Nlc1sxXSA9IHVwZGF0ZWRcbiAgICB9KVxuICAgIGFkZE91dGxpbmVQYXNzQ29udHJvbHMoZ3VpLCB7fSwgb3V0bGluZVBhc3MpXG5cbiAgICBhZGRVbnJlYWxCbG9vbVBhc3NDb250cm9scyhndWksIHt9LCAodXBkYXRlZCkgPT4ge1xuICAgICAgdW5yZWFsQmxvb21QYXNzQ29tcG9zZXIucGFzc2VzWzFdID0gdXBkYXRlZFxuICAgIH0pXG5cbiAgICBhZGRIYWxmdG9uZVBhc3NDb250cm9scyhndWksIHsgaGVpZ2h0OiBoYWxmSGVpZ2h0LCB3aWR0aDogaGFsZldpZHRoIH0sICh1cGRhdGVkKSA9PiB7XG4gICAgICBoYWxmdG9uZVBhc3NDb21wb3Nlci5wYXNzZXNbMV0gPSB1cGRhdGVkXG4gICAgfSlcblxuICAgIHJldHVybiBjb250cm9sc1xuICB9LFxuICBpbml0aWFsaXplQ29tcG9zZXI6IChyZW5kZXJlciwgc2NlbmUsIGNhbWVyYSwgbWVzaCkgPT4gc2V0dXBDb21wb3NlcihyZW5kZXJlciwgc2NlbmUsIGNhbWVyYSwgbWVzaCksXG4gIGFuaW1hdGU6IChyZW5kZXJlciwgY29tcG9zZXIsIG1peGVyLCBjbG9jaykgPT4gYW5pbWF0ZShyZW5kZXJlciwgY29tcG9zZXIsIG1peGVyLCBjbG9jaylcbn0pLnRoZW4oKVxuIiwiaW1wb3J0IHsgaW5pdFNjZW5lIH0gZnJvbSAnLi4vLi4vLi4vYm9vdHN0cmFwL2Jvb3RzdHJhcCdcbmltcG9ydCB7IGludGlhbGl6ZVJlbmRlcmVyQ29udHJvbHMgfSBmcm9tICcuLi8uLi8uLi9jb250cm9scy9yZW5kZXJlci1jb250cm9sJ1xuXG5pbXBvcnQgR1VJIGZyb20gJ2xpbC1ndWknXG5pbXBvcnQgeyBpbml0aWFsaXplU2NlbmVDb250cm9scyB9IGZyb20gJy4uLy4uLy4uL2NvbnRyb2xzL3NjZW5lLWNvbnRyb2xzJ1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5pbXBvcnQgeyBHTFRGTG9hZGVyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlcidcbmltcG9ydCB7IHZpc2l0Q2hpbGRyZW4gfSBmcm9tICcuLi8uLi8uLi91dGlsL21vZGVsVXRpbCdcblxuZXhwb3J0IGNvbnN0IGJvb3RzdHJhcE1lc2hTY2VuZSA9IGFzeW5jICh7IHByb3ZpZGVHdWksIGJhY2tncm91bmRDb2xvciwgYWRkQ29udHJvbHMsIGluaXRpYWxpemVDb21wb3NlciwgYW5pbWF0ZSB9KSA9PiB7XG4gIGNvbnN0IHByb3BzID0ge1xuICAgIGJhY2tncm91bmRDb2xvcjogYmFja2dyb3VuZENvbG9yID8/IDB4ZmZmZmZmLFxuICAgIGRpc2FibGVEZWZhdWx0Q29udHJvbHM6IHRydWVcbiAgfVxuXG4gIGNvbnN0IGxvYWRlciA9IG5ldyBHTFRGTG9hZGVyKClcbiAgY29uc3QgbWVzaCA9IGF3YWl0IGxvYWRlci5sb2FkQXN5bmMoJy9hc3NldHMvbW9kZWxzL3NlYV9ob3VzZS9zY2VuZS5nbHRmJykudGhlbigoc3RydWN0dXJlKSA9PiB7XG4gICAgc3RydWN0dXJlLnNjZW5lLnNjYWxlLnNldFNjYWxhcigwLjAzLCAwLjAzLCAwLjAzKVxuICAgIHZpc2l0Q2hpbGRyZW4oc3RydWN0dXJlLnNjZW5lLCAoY2hpbGQpID0+IHtcbiAgICAgIGlmIChjaGlsZC5tYXRlcmlhbCkge1xuICAgICAgICBjaGlsZC5tYXRlcmlhbC5kZXB0aFdyaXRlID0gdHJ1ZVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHN0cnVjdHVyZS5zY2VuZVxuICB9KVxuXG4gIGNvbnN0IGd1aSA9IG5ldyBHVUkoKVxuXG4gIGNvbnN0IGluaXQgPSBhc3luYyAoKSA9PiB7XG4gICAgaW5pdFNjZW5lKHByb3BzKSgoeyBzY2VuZSwgY2FtZXJhLCByZW5kZXJlciB9KSA9PiB7XG4gICAgICByZW5kZXJlci5zaGFkb3dNYXAudHlwZSA9IFRIUkVFLlBDRlNvZnRTaGFkb3dNYXBcbiAgICAgIGNhbWVyYS5wb3NpdGlvbi54ID0gLTNcbiAgICAgIGNhbWVyYS5wb3NpdGlvbi56ID0gOFxuICAgICAgY2FtZXJhLnBvc2l0aW9uLnkgPSA0XG5cbiAgICAgIGlmIChtZXNoKSBzY2VuZS5hZGQobWVzaClcblxuICAgICAgaW50aWFsaXplUmVuZGVyZXJDb250cm9scyhndWksIHJlbmRlcmVyKVxuICAgICAgaW5pdGlhbGl6ZVNjZW5lQ29udHJvbHMoZ3VpLCBzY2VuZSwgZmFsc2UpXG5cbiAgICAgIGNvbnN0IGNvbXBvc2VyID0gaW5pdGlhbGl6ZUNvbXBvc2VyKHJlbmRlcmVyLCBzY2VuZSwgY2FtZXJhLCBtZXNoKVxuXG4gICAgICBpZiAocHJvdmlkZUd1aSkgcHJvdmlkZUd1aShndWksIG1lc2gsIHNjZW5lKVxuICAgICAgbGV0IGNvbnRyb2xzID0gdW5kZWZpbmVkXG4gICAgICBpZiAoYWRkQ29udHJvbHMpIHtcbiAgICAgICAgY29udHJvbHMgPSBhZGRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLCBzY2VuZSwgZ3VpLCBtZXNoKVxuICAgICAgfVxuXG4gICAgICBhbmltYXRlKHJlbmRlcmVyLCBjb21wb3NlcilcbiAgICB9KVxuICB9XG5cbiAgaW5pdCgpLnRoZW4oKVxufVxuIiwiZXhwb3J0IGNvbnN0IHZpc2l0Q2hpbGRyZW4gPSAob2JqZWN0LCBmbikgPT4ge1xuICBpZiAob2JqZWN0LmNoaWxkcmVuICYmIG9iamVjdC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgZm9yIChjb25zdCBjaGlsZCBvZiBvYmplY3QuY2hpbGRyZW4pIHtcbiAgICAgIHZpc2l0Q2hpbGRyZW4oY2hpbGQsIGZuKVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBmbihvYmplY3QpXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGFwcGx5U2hhZG93c0FuZERlcHRoV3JpdGUgPSAob2JqZWN0KSA9PiB7XG4gIHZpc2l0Q2hpbGRyZW4ob2JqZWN0LCAoY2hpbGQpID0+IHtcbiAgICBpZiAoY2hpbGQubWF0ZXJpYWwpIHtcbiAgICAgIGNoaWxkLm1hdGVyaWFsLmRlcHRoV3JpdGUgPSB0cnVlXG4gICAgICBjaGlsZC5jYXN0U2hhZG93ID0gdHJ1ZVxuICAgICAgY2hpbGQucmVjZWl2ZVNoYWRvdyA9IHRydWVcbiAgICB9XG4gIH0pXG59XG5cbmV4cG9ydCBjb25zdCBmaW5kQ2hpbGQgPSAob2JqZWN0LCBuYW1lKSA9PiB7XG4gIGlmIChvYmplY3QuY2hpbGRyZW4gJiYgb2JqZWN0LmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIG9iamVjdC5jaGlsZHJlbikge1xuICAgICAgaWYgKG5hbWUgPT09IGNoaWxkLm5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGNoaWxkXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCByZXMgPSBmaW5kQ2hpbGQoY2hpbGQsIG5hbWUpXG4gICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICByZXR1cm4gcmVzXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKG5hbWUgPT09IG9iamVjdC5uYW1lKSB7XG4gICAgICByZXR1cm4gb2JqZWN0XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICB9XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibXVsdGktcGFzc2VzLTJcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rbHRqc19mb3VydGhcIl0gPSBzZWxmW1wid2VicGFja0NodW5rbHRqc19mb3VydGhcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2J1aWxkX3RocmVlX21vZHVsZV9qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX2NvbnRyb2xzX09yYml0Q29udHJvbHNfanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX2xpbC1ndWlfZGlzdF9saWwtZ3VpX2VzbV9qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX2xvYWRlcnNfR0xURkxvYWRlcl9qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX3Bvc3Rwcm9jZXNzaW5nX0VmZmVjdENvbXBvc2VyX2pzLW5vZGVfbW9kdWxlc190aHJlZV9lLWRkOTc3N1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX3Bvc3Rwcm9jZXNzaW5nX1VucmVhbEJsb29tUGFzc19qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX3Bvc3Rwcm9jZXNzaW5nX0Jsb29tUGFzc19qcy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsLTliZGU1N1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX3Bvc3Rwcm9jZXNzaW5nX091dGxpbmVQYXNzX2pzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtLTAyYTI2YVwiLFwic2FtcGxlc19ib290c3RyYXBfYm9vdHN0cmFwX2pzLXNhbXBsZXNfY2hhcHRlcnNfY2hhcHRlci0xMV91dGlsX3Bhc3MtY29udHJvbHNfanMtc2FtcGxlc19jb250LWIyZmVkMVwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci0xMS9tdWx0aS1wYXNzZXMtMi5qc1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
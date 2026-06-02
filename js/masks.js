/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./samples/chapters/chapter-11/masks.js"
/*!**********************************************!*\
  !*** ./samples/chapters/chapter-11/masks.js ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_postprocessing_EffectComposer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/postprocessing/EffectComposer */ "./node_modules/three/examples/jsm/postprocessing/EffectComposer.js");
/* harmony import */ var three_examples_jsm_postprocessing_RenderPass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/postprocessing/RenderPass */ "./node_modules/three/examples/jsm/postprocessing/RenderPass.js");
/* harmony import */ var three_examples_jsm_postprocessing_MaskPass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/jsm/postprocessing/MaskPass */ "./node_modules/three/examples/jsm/postprocessing/MaskPass.js");
/* harmony import */ var three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three/examples/jsm/postprocessing/ShaderPass */ "./node_modules/three/examples/jsm/postprocessing/ShaderPass.js");
/* harmony import */ var three_examples_jsm_shaders_SepiaShader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! three/examples/jsm/shaders/SepiaShader */ "./node_modules/three/examples/jsm/shaders/SepiaShader.js");
/* harmony import */ var three_examples_jsm_shaders_ColorifyShader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! three/examples/jsm/shaders/ColorifyShader */ "./node_modules/three/examples/jsm/shaders/ColorifyShader.js");
/* harmony import */ var three_examples_jsm_shaders_CopyShader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! three/examples/jsm/shaders/CopyShader */ "./node_modules/three/examples/jsm/shaders/CopyShader.js");









const addEarth = (scene) => {
  var textureLoader = new three__WEBPACK_IMPORTED_MODULE_0__.TextureLoader()
  var planetMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.MeshPhongMaterial({
    map: textureLoader.load('/assets/textures/earth/Earth.png'),
    normalMap: textureLoader.load('/assets/textures/earth/EarthNormal.png'),
    specularMap: textureLoader.load('/assets/textures/earth/EarthSpec.png'),
    specular: new three__WEBPACK_IMPORTED_MODULE_0__.Color(0x4444aa),
    normalScale: new three__WEBPACK_IMPORTED_MODULE_0__.Vector2(6, 6),
    shininess: 0.5
  })

  var earth = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(new three__WEBPACK_IMPORTED_MODULE_0__.SphereGeometry(15, 40, 40), planetMaterial)
  scene.add(earth)
  var pivot = new three__WEBPACK_IMPORTED_MODULE_0__.Object3D()
  initDefaultLighting(pivot)
  scene.add(pivot)

  return { earth: earth, pivot: pivot }
}

const addMars = (scene) => {
  var textureLoader = new three__WEBPACK_IMPORTED_MODULE_0__.TextureLoader()
  var planetMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.MeshPhongMaterial({
    map: textureLoader.load('/assets/textures/mars/mars_1k_color.jpg'),
    normalMap: textureLoader.load('/assets/textures/mars/mars_1k_normal.jpg'),
    normalScale: new three__WEBPACK_IMPORTED_MODULE_0__.Vector2(6, 6),
    shininess: 0.5
  })

  var mars = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(new three__WEBPACK_IMPORTED_MODULE_0__.SphereGeometry(15, 40, 40), planetMaterial)
  scene.add(mars)
  var pivot = new three__WEBPACK_IMPORTED_MODULE_0__.Object3D()
  initDefaultLighting(pivot)
  scene.add(pivot)

  return { mars: mars, pivot: pivot }
}

const initDefaultLighting = (scene, initialPosition) => {
  var position = initialPosition !== undefined ? initialPosition : new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(-10, 30, 40)
  var spotLight = new three__WEBPACK_IMPORTED_MODULE_0__.SpotLight(0xffffff)
  spotLight.position.copy(position)
  spotLight.shadow.mapSize.width = 2048
  spotLight.shadow.mapSize.height = 2048
  spotLight.shadow.camera.fov = 15
  spotLight.castShadow = true
  spotLight.decay = 2
  spotLight.penumbra = 0.05
  spotLight.name = 'spotLight'

  scene.add(spotLight)

  var ambientLight = new three__WEBPACK_IMPORTED_MODULE_0__.AmbientLight(0x343434)
  ambientLight.name = 'ambientLight'
  scene.add(ambientLight)
}

const camera = new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.copy(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 20, 40))
camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, 0))

// create all the scenes we'll be rendering.
const sceneEarth = new three__WEBPACK_IMPORTED_MODULE_0__.Scene()
const sceneMars = new three__WEBPACK_IMPORTED_MODULE_0__.Scene()
const sceneBG = new three__WEBPACK_IMPORTED_MODULE_0__.Scene()

sceneBG.background = new three__WEBPACK_IMPORTED_MODULE_0__.TextureLoader().load('/assets/textures/bg/starry-deep-outer-space-galaxy.jpg')
const earthAndLight = addEarth(sceneEarth)
sceneEarth.translateX(-16)
sceneEarth.scale.set(1.2, 1.2, 1.2)
const marsAndLight = addMars(sceneMars)
sceneMars.translateX(12)
sceneMars.translateY(6)
sceneMars.scale.set(0.2, 0.2, 0.2)

// setup passes. First the main renderpasses. Note that
// only the bgRenderpass clears the screen.
const bgRenderPass = new three_examples_jsm_postprocessing_RenderPass__WEBPACK_IMPORTED_MODULE_2__.RenderPass(sceneBG, camera)
const earthRenderPass = new three_examples_jsm_postprocessing_RenderPass__WEBPACK_IMPORTED_MODULE_2__.RenderPass(sceneEarth, camera)
earthRenderPass.clear = false
const marsRenderPass = new three_examples_jsm_postprocessing_RenderPass__WEBPACK_IMPORTED_MODULE_2__.RenderPass(sceneMars, camera)
marsRenderPass.clear = false

// setup the mask
const clearMask = new three_examples_jsm_postprocessing_MaskPass__WEBPACK_IMPORTED_MODULE_3__.ClearMaskPass()
const marsMask = new three_examples_jsm_postprocessing_MaskPass__WEBPACK_IMPORTED_MODULE_3__.MaskPass(sceneMars, camera)
const earthMask = new three_examples_jsm_postprocessing_MaskPass__WEBPACK_IMPORTED_MODULE_3__.MaskPass(sceneEarth, camera)

// setup some effects to apply
const effectSepia = new three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_4__.ShaderPass(three_examples_jsm_shaders_SepiaShader__WEBPACK_IMPORTED_MODULE_5__.SepiaShader)
effectSepia.uniforms['amount'].value = 0.8
const effectColorify = new three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_4__.ShaderPass(three_examples_jsm_shaders_ColorifyShader__WEBPACK_IMPORTED_MODULE_6__.ColorifyShader)
effectColorify.uniforms['color'].value.setRGB(0.5, 0.5, 1)

const effectCopy = new three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_4__.ShaderPass(three_examples_jsm_shaders_CopyShader__WEBPACK_IMPORTED_MODULE_7__.CopyShader)
effectCopy.renderToScreen = true

const renderer = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer({ antialias: true })
renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_0__.Color(0x000000), 0)
renderer.autoClear = false
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

var composer = new three_examples_jsm_postprocessing_EffectComposer__WEBPACK_IMPORTED_MODULE_1__.EffectComposer(renderer)
composer.renderTarget1.stencilBuffer = true
composer.renderTarget2.stencilBuffer = true
composer.addPass(bgRenderPass)
composer.addPass(earthRenderPass)
composer.addPass(marsRenderPass)
composer.addPass(marsMask)
composer.addPass(effectColorify)
composer.addPass(clearMask)
composer.addPass(earthMask)
composer.addPass(effectSepia)
composer.addPass(clearMask)
composer.addPass(effectCopy)

const render = () => {
  earthAndLight.earth.rotation.y += 0.001
  earthAndLight.pivot.rotation.y += -0.0003
  marsAndLight.mars.rotation.y += -0.001
  marsAndLight.pivot.rotation.y += +0.0003

  // request next and render using composer
  requestAnimationFrame(render)
  renderer.clear()
  composer.render()
}

render()


/***/ },

/***/ "./node_modules/three/examples/jsm/shaders/ColorifyShader.js"
/*!*******************************************************************!*\
  !*** ./node_modules/three/examples/jsm/shaders/ColorifyShader.js ***!
  \*******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ColorifyShader: () => (/* binding */ ColorifyShader)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");


/**
 * Colorify shader
 */

const ColorifyShader = {

	uniforms: {

		'tDiffuse': { value: null },
		'color': { value: new three__WEBPACK_IMPORTED_MODULE_0__.Color( 0xffffff ) }

	},

	vertexShader: /* glsl */`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

	fragmentShader: /* glsl */`

		uniform vec3 color;
		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );
			float v = dot( texel.xyz, luma );

			gl_FragColor = vec4( v * color, texel.w );

		}`

};




/***/ },

/***/ "./node_modules/three/examples/jsm/shaders/SepiaShader.js"
/*!****************************************************************!*\
  !*** ./node_modules/three/examples/jsm/shaders/SepiaShader.js ***!
  \****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SepiaShader: () => (/* binding */ SepiaShader)
/* harmony export */ });
/**
 * Sepia tone shader
 * based on glfx.js sepia shader
 * https://github.com/evanw/glfx.js
 */

const SepiaShader = {

	uniforms: {

		'tDiffuse': { value: null },
		'amount': { value: 1.0 }

	},

	vertexShader: /* glsl */`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

	fragmentShader: /* glsl */`

		uniform float amount;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 color = texture2D( tDiffuse, vUv );
			vec3 c = color.rgb;

			color.r = dot( c, vec3( 1.0 - 0.607 * amount, 0.769 * amount, 0.189 * amount ) );
			color.g = dot( c, vec3( 0.349 * amount, 1.0 - 0.314 * amount, 0.168 * amount ) );
			color.b = dot( c, vec3( 0.272 * amount, 0.534 * amount, 1.0 - 0.869 * amount ) );

			gl_FragColor = vec4( min( vec3( 1.0 ), color.rgb ), color.a );

		}`

};




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
/******/ 			"masks": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_postprocessing_EffectComposer_js-node_modules_three_e-dd9777"], () => (__webpack_require__("./samples/chapters/chapter-11/masks.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBRUE7VUFDQTtVQUNBOztVQUVBO1VBQ0E7Ozs7O1dDL0JBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsK0JBQStCLHdDQUF3QztXQUN2RTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlCQUFpQixxQkFBcUI7V0FDdEM7V0FDQTtXQUNBLGtCQUFrQixxQkFBcUI7V0FDdkM7V0FDQTtXQUNBLEtBQUs7V0FDTDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRTs7Ozs7V0MzQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQSw0Rzs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTExL21hc2tzLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vbm9kZV9tb2R1bGVzL3RocmVlL2V4YW1wbGVzL2pzbS9zaGFkZXJzL0NvbG9yaWZ5U2hhZGVyLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vbm9kZV9tb2R1bGVzL3RocmVlL2V4YW1wbGVzL2pzbS9zaGFkZXJzL1NlcGlhU2hhZGVyLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5pbXBvcnQgeyBFZmZlY3RDb21wb3NlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9wb3N0cHJvY2Vzc2luZy9FZmZlY3RDb21wb3NlcidcbmltcG9ydCB7IFJlbmRlclBhc3MgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vcG9zdHByb2Nlc3NpbmcvUmVuZGVyUGFzcydcbmltcG9ydCB7IE1hc2tQYXNzLCBDbGVhck1hc2tQYXNzIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL3Bvc3Rwcm9jZXNzaW5nL01hc2tQYXNzJ1xuaW1wb3J0IHsgU2hhZGVyUGFzcyB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9wb3N0cHJvY2Vzc2luZy9TaGFkZXJQYXNzJ1xuaW1wb3J0IHsgU2VwaWFTaGFkZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vc2hhZGVycy9TZXBpYVNoYWRlcidcbmltcG9ydCB7IENvbG9yaWZ5U2hhZGVyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL3NoYWRlcnMvQ29sb3JpZnlTaGFkZXInXG5pbXBvcnQgeyBDb3B5U2hhZGVyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL3NoYWRlcnMvQ29weVNoYWRlcidcblxuY29uc3QgYWRkRWFydGggPSAoc2NlbmUpID0+IHtcbiAgdmFyIHRleHR1cmVMb2FkZXIgPSBuZXcgVEhSRUUuVGV4dHVyZUxvYWRlcigpXG4gIHZhciBwbGFuZXRNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCh7XG4gICAgbWFwOiB0ZXh0dXJlTG9hZGVyLmxvYWQoJy9hc3NldHMvdGV4dHVyZXMvZWFydGgvRWFydGgucG5nJyksXG4gICAgbm9ybWFsTWFwOiB0ZXh0dXJlTG9hZGVyLmxvYWQoJy9hc3NldHMvdGV4dHVyZXMvZWFydGgvRWFydGhOb3JtYWwucG5nJyksXG4gICAgc3BlY3VsYXJNYXA6IHRleHR1cmVMb2FkZXIubG9hZCgnL2Fzc2V0cy90ZXh0dXJlcy9lYXJ0aC9FYXJ0aFNwZWMucG5nJyksXG4gICAgc3BlY3VsYXI6IG5ldyBUSFJFRS5Db2xvcigweDQ0NDRhYSksXG4gICAgbm9ybWFsU2NhbGU6IG5ldyBUSFJFRS5WZWN0b3IyKDYsIDYpLFxuICAgIHNoaW5pbmVzczogMC41XG4gIH0pXG5cbiAgdmFyIGVhcnRoID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KDE1LCA0MCwgNDApLCBwbGFuZXRNYXRlcmlhbClcbiAgc2NlbmUuYWRkKGVhcnRoKVxuICB2YXIgcGl2b3QgPSBuZXcgVEhSRUUuT2JqZWN0M0QoKVxuICBpbml0RGVmYXVsdExpZ2h0aW5nKHBpdm90KVxuICBzY2VuZS5hZGQocGl2b3QpXG5cbiAgcmV0dXJuIHsgZWFydGg6IGVhcnRoLCBwaXZvdDogcGl2b3QgfVxufVxuXG5jb25zdCBhZGRNYXJzID0gKHNjZW5lKSA9PiB7XG4gIHZhciB0ZXh0dXJlTG9hZGVyID0gbmV3IFRIUkVFLlRleHR1cmVMb2FkZXIoKVxuICB2YXIgcGxhbmV0TWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwoe1xuICAgIG1hcDogdGV4dHVyZUxvYWRlci5sb2FkKCcvYXNzZXRzL3RleHR1cmVzL21hcnMvbWFyc18xa19jb2xvci5qcGcnKSxcbiAgICBub3JtYWxNYXA6IHRleHR1cmVMb2FkZXIubG9hZCgnL2Fzc2V0cy90ZXh0dXJlcy9tYXJzL21hcnNfMWtfbm9ybWFsLmpwZycpLFxuICAgIG5vcm1hbFNjYWxlOiBuZXcgVEhSRUUuVmVjdG9yMig2LCA2KSxcbiAgICBzaGluaW5lc3M6IDAuNVxuICB9KVxuXG4gIHZhciBtYXJzID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KDE1LCA0MCwgNDApLCBwbGFuZXRNYXRlcmlhbClcbiAgc2NlbmUuYWRkKG1hcnMpXG4gIHZhciBwaXZvdCA9IG5ldyBUSFJFRS5PYmplY3QzRCgpXG4gIGluaXREZWZhdWx0TGlnaHRpbmcocGl2b3QpXG4gIHNjZW5lLmFkZChwaXZvdClcblxuICByZXR1cm4geyBtYXJzOiBtYXJzLCBwaXZvdDogcGl2b3QgfVxufVxuXG5jb25zdCBpbml0RGVmYXVsdExpZ2h0aW5nID0gKHNjZW5lLCBpbml0aWFsUG9zaXRpb24pID0+IHtcbiAgdmFyIHBvc2l0aW9uID0gaW5pdGlhbFBvc2l0aW9uICE9PSB1bmRlZmluZWQgPyBpbml0aWFsUG9zaXRpb24gOiBuZXcgVEhSRUUuVmVjdG9yMygtMTAsIDMwLCA0MClcbiAgdmFyIHNwb3RMaWdodCA9IG5ldyBUSFJFRS5TcG90TGlnaHQoMHhmZmZmZmYpXG4gIHNwb3RMaWdodC5wb3NpdGlvbi5jb3B5KHBvc2l0aW9uKVxuICBzcG90TGlnaHQuc2hhZG93Lm1hcFNpemUud2lkdGggPSAyMDQ4XG4gIHNwb3RMaWdodC5zaGFkb3cubWFwU2l6ZS5oZWlnaHQgPSAyMDQ4XG4gIHNwb3RMaWdodC5zaGFkb3cuY2FtZXJhLmZvdiA9IDE1XG4gIHNwb3RMaWdodC5jYXN0U2hhZG93ID0gdHJ1ZVxuICBzcG90TGlnaHQuZGVjYXkgPSAyXG4gIHNwb3RMaWdodC5wZW51bWJyYSA9IDAuMDVcbiAgc3BvdExpZ2h0Lm5hbWUgPSAnc3BvdExpZ2h0J1xuXG4gIHNjZW5lLmFkZChzcG90TGlnaHQpXG5cbiAgdmFyIGFtYmllbnRMaWdodCA9IG5ldyBUSFJFRS5BbWJpZW50TGlnaHQoMHgzNDM0MzQpXG4gIGFtYmllbnRMaWdodC5uYW1lID0gJ2FtYmllbnRMaWdodCdcbiAgc2NlbmUuYWRkKGFtYmllbnRMaWdodClcbn1cblxuY29uc3QgY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKDQ1LCB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodCwgMC4xLCAxMDAwKVxuY2FtZXJhLnBvc2l0aW9uLmNvcHkobmV3IFRIUkVFLlZlY3RvcjMoMCwgMjAsIDQwKSlcbmNhbWVyYS5sb29rQXQobmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMCkpXG5cbi8vIGNyZWF0ZSBhbGwgdGhlIHNjZW5lcyB3ZSdsbCBiZSByZW5kZXJpbmcuXG5jb25zdCBzY2VuZUVhcnRoID0gbmV3IFRIUkVFLlNjZW5lKClcbmNvbnN0IHNjZW5lTWFycyA9IG5ldyBUSFJFRS5TY2VuZSgpXG5jb25zdCBzY2VuZUJHID0gbmV3IFRIUkVFLlNjZW5lKClcblxuc2NlbmVCRy5iYWNrZ3JvdW5kID0gbmV3IFRIUkVFLlRleHR1cmVMb2FkZXIoKS5sb2FkKCcvYXNzZXRzL3RleHR1cmVzL2JnL3N0YXJyeS1kZWVwLW91dGVyLXNwYWNlLWdhbGF4eS5qcGcnKVxuY29uc3QgZWFydGhBbmRMaWdodCA9IGFkZEVhcnRoKHNjZW5lRWFydGgpXG5zY2VuZUVhcnRoLnRyYW5zbGF0ZVgoLTE2KVxuc2NlbmVFYXJ0aC5zY2FsZS5zZXQoMS4yLCAxLjIsIDEuMilcbmNvbnN0IG1hcnNBbmRMaWdodCA9IGFkZE1hcnMoc2NlbmVNYXJzKVxuc2NlbmVNYXJzLnRyYW5zbGF0ZVgoMTIpXG5zY2VuZU1hcnMudHJhbnNsYXRlWSg2KVxuc2NlbmVNYXJzLnNjYWxlLnNldCgwLjIsIDAuMiwgMC4yKVxuXG4vLyBzZXR1cCBwYXNzZXMuIEZpcnN0IHRoZSBtYWluIHJlbmRlcnBhc3Nlcy4gTm90ZSB0aGF0XG4vLyBvbmx5IHRoZSBiZ1JlbmRlcnBhc3MgY2xlYXJzIHRoZSBzY3JlZW4uXG5jb25zdCBiZ1JlbmRlclBhc3MgPSBuZXcgUmVuZGVyUGFzcyhzY2VuZUJHLCBjYW1lcmEpXG5jb25zdCBlYXJ0aFJlbmRlclBhc3MgPSBuZXcgUmVuZGVyUGFzcyhzY2VuZUVhcnRoLCBjYW1lcmEpXG5lYXJ0aFJlbmRlclBhc3MuY2xlYXIgPSBmYWxzZVxuY29uc3QgbWFyc1JlbmRlclBhc3MgPSBuZXcgUmVuZGVyUGFzcyhzY2VuZU1hcnMsIGNhbWVyYSlcbm1hcnNSZW5kZXJQYXNzLmNsZWFyID0gZmFsc2VcblxuLy8gc2V0dXAgdGhlIG1hc2tcbmNvbnN0IGNsZWFyTWFzayA9IG5ldyBDbGVhck1hc2tQYXNzKClcbmNvbnN0IG1hcnNNYXNrID0gbmV3IE1hc2tQYXNzKHNjZW5lTWFycywgY2FtZXJhKVxuY29uc3QgZWFydGhNYXNrID0gbmV3IE1hc2tQYXNzKHNjZW5lRWFydGgsIGNhbWVyYSlcblxuLy8gc2V0dXAgc29tZSBlZmZlY3RzIHRvIGFwcGx5XG5jb25zdCBlZmZlY3RTZXBpYSA9IG5ldyBTaGFkZXJQYXNzKFNlcGlhU2hhZGVyKVxuZWZmZWN0U2VwaWEudW5pZm9ybXNbJ2Ftb3VudCddLnZhbHVlID0gMC44XG5jb25zdCBlZmZlY3RDb2xvcmlmeSA9IG5ldyBTaGFkZXJQYXNzKENvbG9yaWZ5U2hhZGVyKVxuZWZmZWN0Q29sb3JpZnkudW5pZm9ybXNbJ2NvbG9yJ10udmFsdWUuc2V0UkdCKDAuNSwgMC41LCAxKVxuXG5jb25zdCBlZmZlY3RDb3B5ID0gbmV3IFNoYWRlclBhc3MoQ29weVNoYWRlcilcbmVmZmVjdENvcHkucmVuZGVyVG9TY3JlZW4gPSB0cnVlXG5cbmNvbnN0IHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoeyBhbnRpYWxpYXM6IHRydWUgfSlcbnJlbmRlcmVyLnNldENsZWFyQ29sb3IobmV3IFRIUkVFLkNvbG9yKDB4MDAwMDAwKSwgMClcbnJlbmRlcmVyLmF1dG9DbGVhciA9IGZhbHNlXG5yZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHJlbmRlcmVyLmRvbUVsZW1lbnQpXG5cbnZhciBjb21wb3NlciA9IG5ldyBFZmZlY3RDb21wb3NlcihyZW5kZXJlcilcbmNvbXBvc2VyLnJlbmRlclRhcmdldDEuc3RlbmNpbEJ1ZmZlciA9IHRydWVcbmNvbXBvc2VyLnJlbmRlclRhcmdldDIuc3RlbmNpbEJ1ZmZlciA9IHRydWVcbmNvbXBvc2VyLmFkZFBhc3MoYmdSZW5kZXJQYXNzKVxuY29tcG9zZXIuYWRkUGFzcyhlYXJ0aFJlbmRlclBhc3MpXG5jb21wb3Nlci5hZGRQYXNzKG1hcnNSZW5kZXJQYXNzKVxuY29tcG9zZXIuYWRkUGFzcyhtYXJzTWFzaylcbmNvbXBvc2VyLmFkZFBhc3MoZWZmZWN0Q29sb3JpZnkpXG5jb21wb3Nlci5hZGRQYXNzKGNsZWFyTWFzaylcbmNvbXBvc2VyLmFkZFBhc3MoZWFydGhNYXNrKVxuY29tcG9zZXIuYWRkUGFzcyhlZmZlY3RTZXBpYSlcbmNvbXBvc2VyLmFkZFBhc3MoY2xlYXJNYXNrKVxuY29tcG9zZXIuYWRkUGFzcyhlZmZlY3RDb3B5KVxuXG5jb25zdCByZW5kZXIgPSAoKSA9PiB7XG4gIGVhcnRoQW5kTGlnaHQuZWFydGgucm90YXRpb24ueSArPSAwLjAwMVxuICBlYXJ0aEFuZExpZ2h0LnBpdm90LnJvdGF0aW9uLnkgKz0gLTAuMDAwM1xuICBtYXJzQW5kTGlnaHQubWFycy5yb3RhdGlvbi55ICs9IC0wLjAwMVxuICBtYXJzQW5kTGlnaHQucGl2b3Qucm90YXRpb24ueSArPSArMC4wMDAzXG5cbiAgLy8gcmVxdWVzdCBuZXh0IGFuZCByZW5kZXIgdXNpbmcgY29tcG9zZXJcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcilcbiAgcmVuZGVyZXIuY2xlYXIoKVxuICBjb21wb3Nlci5yZW5kZXIoKVxufVxuXG5yZW5kZXIoKVxuIiwiaW1wb3J0IHtcblx0Q29sb3Jcbn0gZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIENvbG9yaWZ5IHNoYWRlclxuICovXG5cbmNvbnN0IENvbG9yaWZ5U2hhZGVyID0ge1xuXG5cdHVuaWZvcm1zOiB7XG5cblx0XHQndERpZmZ1c2UnOiB7IHZhbHVlOiBudWxsIH0sXG5cdFx0J2NvbG9yJzogeyB2YWx1ZTogbmV3IENvbG9yKCAweGZmZmZmZiApIH1cblxuXHR9LFxuXG5cdHZlcnRleFNoYWRlcjogLyogZ2xzbCAqL2BcblxuXHRcdHZhcnlpbmcgdmVjMiB2VXY7XG5cblx0XHR2b2lkIG1haW4oKSB7XG5cblx0XHRcdHZVdiA9IHV2O1xuXHRcdFx0Z2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogbW9kZWxWaWV3TWF0cml4ICogdmVjNCggcG9zaXRpb24sIDEuMCApO1xuXG5cdFx0fWAsXG5cblx0ZnJhZ21lbnRTaGFkZXI6IC8qIGdsc2wgKi9gXG5cblx0XHR1bmlmb3JtIHZlYzMgY29sb3I7XG5cdFx0dW5pZm9ybSBzYW1wbGVyMkQgdERpZmZ1c2U7XG5cblx0XHR2YXJ5aW5nIHZlYzIgdlV2O1xuXG5cdFx0dm9pZCBtYWluKCkge1xuXG5cdFx0XHR2ZWM0IHRleGVsID0gdGV4dHVyZTJEKCB0RGlmZnVzZSwgdlV2ICk7XG5cblx0XHRcdHZlYzMgbHVtYSA9IHZlYzMoIDAuMjk5LCAwLjU4NywgMC4xMTQgKTtcblx0XHRcdGZsb2F0IHYgPSBkb3QoIHRleGVsLnh5eiwgbHVtYSApO1xuXG5cdFx0XHRnbF9GcmFnQ29sb3IgPSB2ZWM0KCB2ICogY29sb3IsIHRleGVsLncgKTtcblxuXHRcdH1gXG5cbn07XG5cbmV4cG9ydCB7IENvbG9yaWZ5U2hhZGVyIH07XG4iLCIvKipcbiAqIFNlcGlhIHRvbmUgc2hhZGVyXG4gKiBiYXNlZCBvbiBnbGZ4LmpzIHNlcGlhIHNoYWRlclxuICogaHR0cHM6Ly9naXRodWIuY29tL2V2YW53L2dsZnguanNcbiAqL1xuXG5jb25zdCBTZXBpYVNoYWRlciA9IHtcblxuXHR1bmlmb3Jtczoge1xuXG5cdFx0J3REaWZmdXNlJzogeyB2YWx1ZTogbnVsbCB9LFxuXHRcdCdhbW91bnQnOiB7IHZhbHVlOiAxLjAgfVxuXG5cdH0sXG5cblx0dmVydGV4U2hhZGVyOiAvKiBnbHNsICovYFxuXG5cdFx0dmFyeWluZyB2ZWMyIHZVdjtcblxuXHRcdHZvaWQgbWFpbigpIHtcblxuXHRcdFx0dlV2ID0gdXY7XG5cdFx0XHRnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiBtb2RlbFZpZXdNYXRyaXggKiB2ZWM0KCBwb3NpdGlvbiwgMS4wICk7XG5cblx0XHR9YCxcblxuXHRmcmFnbWVudFNoYWRlcjogLyogZ2xzbCAqL2BcblxuXHRcdHVuaWZvcm0gZmxvYXQgYW1vdW50O1xuXG5cdFx0dW5pZm9ybSBzYW1wbGVyMkQgdERpZmZ1c2U7XG5cblx0XHR2YXJ5aW5nIHZlYzIgdlV2O1xuXG5cdFx0dm9pZCBtYWluKCkge1xuXG5cdFx0XHR2ZWM0IGNvbG9yID0gdGV4dHVyZTJEKCB0RGlmZnVzZSwgdlV2ICk7XG5cdFx0XHR2ZWMzIGMgPSBjb2xvci5yZ2I7XG5cblx0XHRcdGNvbG9yLnIgPSBkb3QoIGMsIHZlYzMoIDEuMCAtIDAuNjA3ICogYW1vdW50LCAwLjc2OSAqIGFtb3VudCwgMC4xODkgKiBhbW91bnQgKSApO1xuXHRcdFx0Y29sb3IuZyA9IGRvdCggYywgdmVjMyggMC4zNDkgKiBhbW91bnQsIDEuMCAtIDAuMzE0ICogYW1vdW50LCAwLjE2OCAqIGFtb3VudCApICk7XG5cdFx0XHRjb2xvci5iID0gZG90KCBjLCB2ZWMzKCAwLjI3MiAqIGFtb3VudCwgMC41MzQgKiBhbW91bnQsIDEuMCAtIDAuODY5ICogYW1vdW50ICkgKTtcblxuXHRcdFx0Z2xfRnJhZ0NvbG9yID0gdmVjNCggbWluKCB2ZWMzKCAxLjAgKSwgY29sb3IucmdiICksIGNvbG9yLmEgKTtcblxuXHRcdH1gXG5cbn07XG5cbmV4cG9ydCB7IFNlcGlhU2hhZGVyIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1hc2tzXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2x0anNfZm91cnRoXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2x0anNfZm91cnRoXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9idWlsZF90aHJlZV9tb2R1bGVfanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9wb3N0cHJvY2Vzc2luZ19FZmZlY3RDb21wb3Nlcl9qcy1ub2RlX21vZHVsZXNfdGhyZWVfZS1kZDk3NzdcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItMTEvbWFza3MuanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
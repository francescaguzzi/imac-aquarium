/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./samples/chapters/chapter-14/ar.js"
/*!*******************************************!*\
  !*** ./samples/chapters/chapter-14/ar.js ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_webxr_ARButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/webxr/ARButton */ "./node_modules/three/examples/jsm/webxr/ARButton.js");



// basic scene setup
const scene = new three__WEBPACK_IMPORTED_MODULE_0__.Scene()
// setup camera
const camera = new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

// setup the renderer and attach to canvas
const renderer = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer({ antialias: true, alpha: true })
renderer.xr.enabled = true
renderer.outputEncoding = three__WEBPACK_IMPORTED_MODULE_0__.sRGBEncoding
renderer.shadowMap.enabled = true
renderer.shadowMap.type = three__WEBPACK_IMPORTED_MODULE_0__.VSMShadowMap
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.xr.enabled = true
document.body.appendChild(renderer.domElement)

scene.add(new three__WEBPACK_IMPORTED_MODULE_0__.AmbientLight(0x666666))
const dirLight = new three__WEBPACK_IMPORTED_MODULE_0__.DirectionalLight(0xaaaaaa)
dirLight.position.set(5, 12, 8)
dirLight.castShadow = true
dirLight.intensity = 1
dirLight.shadow.camera.near = 0.1
dirLight.shadow.camera.far = 200
dirLight.shadow.camera.right = 10
dirLight.shadow.camera.left = -10
dirLight.shadow.camera.top = 10
dirLight.shadow.camera.bottom = -10
dirLight.shadow.mapSize.width = 512
dirLight.shadow.mapSize.height = 512
dirLight.shadow.radius = 4
dirLight.shadow.bias = -0.0005

scene.add(dirLight)

// create a cube and torus knot and add them to the scene
const cubeGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.BoxGeometry()
const cubeMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.MeshPhongMaterial({ color: 0x0000ff })
const cube = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(cubeGeometry, cubeMaterial)

cube.position.z = -3
cube.castShadow = true
scene.add(cube)

const torusKnotGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.TorusKnotBufferGeometry(0.5, 0.2, 100, 100)
const torusKnotMat = new three__WEBPACK_IMPORTED_MODULE_0__.MeshStandardMaterial({
  color: 0x00ff88,
  roughness: 0.1
})
const torusKnotMesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(torusKnotGeometry, torusKnotMat)

torusKnotMesh.castShadow = true
torusKnotMesh.position.x = 2
torusKnotMesh.position.z = -3

scene.add(torusKnotMesh)

// add stats
document.body.appendChild(three_examples_jsm_webxr_ARButton__WEBPACK_IMPORTED_MODULE_1__.ARButton.createButton(renderer))

animate()

// render the scene
function animate() {
  torusKnotMesh.rotation.x += 0.002
  torusKnotMesh.rotation.y += 0.002
  cube.rotation.x += 0.002
  cube.rotation.y += 0.002
  renderer.setAnimationLoop(animate)
  renderer.render(scene, camera)
}


/***/ },

/***/ "./node_modules/three/examples/jsm/webxr/ARButton.js"
/*!***********************************************************!*\
  !*** ./node_modules/three/examples/jsm/webxr/ARButton.js ***!
  \***********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ARButton: () => (/* binding */ ARButton)
/* harmony export */ });
class ARButton {

	static createButton( renderer, sessionInit = {} ) {

		const button = document.createElement( 'button' );

		function showStartAR( /*device*/ ) {

			if ( sessionInit.domOverlay === undefined ) {

				const overlay = document.createElement( 'div' );
				overlay.style.display = 'none';
				document.body.appendChild( overlay );

				const svg = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' );
				svg.setAttribute( 'width', 38 );
				svg.setAttribute( 'height', 38 );
				svg.style.position = 'absolute';
				svg.style.right = '20px';
				svg.style.top = '20px';
				svg.addEventListener( 'click', function () {

					currentSession.end();

				} );
				overlay.appendChild( svg );

				const path = document.createElementNS( 'http://www.w3.org/2000/svg', 'path' );
				path.setAttribute( 'd', 'M 12,12 L 28,28 M 28,12 12,28' );
				path.setAttribute( 'stroke', '#fff' );
				path.setAttribute( 'stroke-width', 2 );
				svg.appendChild( path );

				if ( sessionInit.optionalFeatures === undefined ) {

					sessionInit.optionalFeatures = [];

				}

				sessionInit.optionalFeatures.push( 'dom-overlay' );
				sessionInit.domOverlay = { root: overlay };

			}

			//

			let currentSession = null;

			async function onSessionStarted( session ) {

				session.addEventListener( 'end', onSessionEnded );

				renderer.xr.setReferenceSpaceType( 'local' );

				await renderer.xr.setSession( session );

				button.textContent = 'STOP AR';
				sessionInit.domOverlay.root.style.display = '';

				currentSession = session;

			}

			function onSessionEnded( /*event*/ ) {

				currentSession.removeEventListener( 'end', onSessionEnded );

				button.textContent = 'START AR';
				sessionInit.domOverlay.root.style.display = 'none';

				currentSession = null;

			}

			//

			button.style.display = '';

			button.style.cursor = 'pointer';
			button.style.left = 'calc(50% - 50px)';
			button.style.width = '100px';

			button.textContent = 'START AR';

			button.onmouseenter = function () {

				button.style.opacity = '1.0';

			};

			button.onmouseleave = function () {

				button.style.opacity = '0.5';

			};

			button.onclick = function () {

				if ( currentSession === null ) {

					navigator.xr.requestSession( 'immersive-ar', sessionInit ).then( onSessionStarted );

				} else {

					currentSession.end();

				}

			};

		}

		function disableButton() {

			button.style.display = '';

			button.style.cursor = 'auto';
			button.style.left = 'calc(50% - 75px)';
			button.style.width = '150px';

			button.onmouseenter = null;
			button.onmouseleave = null;

			button.onclick = null;

		}

		function showARNotSupported() {

			disableButton();

			button.textContent = 'AR NOT SUPPORTED';

		}

		function showARNotAllowed( exception ) {

			disableButton();

			console.warn( 'Exception when trying to call xr.isSessionSupported', exception );

			button.textContent = 'AR NOT ALLOWED';

		}

		function stylizeElement( element ) {

			element.style.position = 'absolute';
			element.style.bottom = '20px';
			element.style.padding = '12px 6px';
			element.style.border = '1px solid #fff';
			element.style.borderRadius = '4px';
			element.style.background = 'rgba(0,0,0,0.1)';
			element.style.color = '#fff';
			element.style.font = 'normal 13px sans-serif';
			element.style.textAlign = 'center';
			element.style.opacity = '0.5';
			element.style.outline = 'none';
			element.style.zIndex = '999';

		}

		if ( 'xr' in navigator ) {

			button.id = 'ARButton';
			button.style.display = 'none';

			stylizeElement( button );

			navigator.xr.isSessionSupported( 'immersive-ar' ).then( function ( supported ) {

				supported ? showStartAR() : showARNotSupported();

			} ).catch( showARNotAllowed );

			return button;

		} else {

			const message = document.createElement( 'a' );

			if ( window.isSecureContext === false ) {

				message.href = document.location.href.replace( /^http:/, 'https:' );
				message.innerHTML = 'WEBXR NEEDS HTTPS'; // TODO Improve message

			} else {

				message.href = 'https://immersiveweb.dev/';
				message.innerHTML = 'WEBXR NOT AVAILABLE';

			}

			message.style.left = 'calc(50% - 90px)';
			message.style.width = '180px';
			message.style.textDecoration = 'none';

			stylizeElement( message );

			return message;

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
/******/ 			"ar": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js"], () => (__webpack_require__("./samples/chapters/chapter-14/ar.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQSw0Rzs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTE0L2FyLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vbm9kZV9tb2R1bGVzL3RocmVlL2V4YW1wbGVzL2pzbS93ZWJ4ci9BUkJ1dHRvbi5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuaW1wb3J0IHsgQVJCdXR0b24gfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vd2VieHIvQVJCdXR0b24nXG5cbi8vIGJhc2ljIHNjZW5lIHNldHVwXG5jb25zdCBzY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpXG4vLyBzZXR1cCBjYW1lcmFcbmNvbnN0IGNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg3NSwgd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQsIDAuMSwgMTAwMClcblxuLy8gc2V0dXAgdGhlIHJlbmRlcmVyIGFuZCBhdHRhY2ggdG8gY2FudmFzXG5jb25zdCByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHsgYW50aWFsaWFzOiB0cnVlLCBhbHBoYTogdHJ1ZSB9KVxucmVuZGVyZXIueHIuZW5hYmxlZCA9IHRydWVcbnJlbmRlcmVyLm91dHB1dEVuY29kaW5nID0gVEhSRUUuc1JHQkVuY29kaW5nXG5yZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IHRydWVcbnJlbmRlcmVyLnNoYWRvd01hcC50eXBlID0gVEhSRUUuVlNNU2hhZG93TWFwXG5yZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpXG5yZW5kZXJlci54ci5lbmFibGVkID0gdHJ1ZVxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci5kb21FbGVtZW50KVxuXG5zY2VuZS5hZGQobmV3IFRIUkVFLkFtYmllbnRMaWdodCgweDY2NjY2NikpXG5jb25zdCBkaXJMaWdodCA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4YWFhYWFhKVxuZGlyTGlnaHQucG9zaXRpb24uc2V0KDUsIDEyLCA4KVxuZGlyTGlnaHQuY2FzdFNoYWRvdyA9IHRydWVcbmRpckxpZ2h0LmludGVuc2l0eSA9IDFcbmRpckxpZ2h0LnNoYWRvdy5jYW1lcmEubmVhciA9IDAuMVxuZGlyTGlnaHQuc2hhZG93LmNhbWVyYS5mYXIgPSAyMDBcbmRpckxpZ2h0LnNoYWRvdy5jYW1lcmEucmlnaHQgPSAxMFxuZGlyTGlnaHQuc2hhZG93LmNhbWVyYS5sZWZ0ID0gLTEwXG5kaXJMaWdodC5zaGFkb3cuY2FtZXJhLnRvcCA9IDEwXG5kaXJMaWdodC5zaGFkb3cuY2FtZXJhLmJvdHRvbSA9IC0xMFxuZGlyTGlnaHQuc2hhZG93Lm1hcFNpemUud2lkdGggPSA1MTJcbmRpckxpZ2h0LnNoYWRvdy5tYXBTaXplLmhlaWdodCA9IDUxMlxuZGlyTGlnaHQuc2hhZG93LnJhZGl1cyA9IDRcbmRpckxpZ2h0LnNoYWRvdy5iaWFzID0gLTAuMDAwNVxuXG5zY2VuZS5hZGQoZGlyTGlnaHQpXG5cbi8vIGNyZWF0ZSBhIGN1YmUgYW5kIHRvcnVzIGtub3QgYW5kIGFkZCB0aGVtIHRvIHRoZSBzY2VuZVxuY29uc3QgY3ViZUdlb21ldHJ5ID0gbmV3IFRIUkVFLkJveEdlb21ldHJ5KClcbmNvbnN0IGN1YmVNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCh7IGNvbG9yOiAweDAwMDBmZiB9KVxuY29uc3QgY3ViZSA9IG5ldyBUSFJFRS5NZXNoKGN1YmVHZW9tZXRyeSwgY3ViZU1hdGVyaWFsKVxuXG5jdWJlLnBvc2l0aW9uLnogPSAtM1xuY3ViZS5jYXN0U2hhZG93ID0gdHJ1ZVxuc2NlbmUuYWRkKGN1YmUpXG5cbmNvbnN0IHRvcnVzS25vdEdlb21ldHJ5ID0gbmV3IFRIUkVFLlRvcnVzS25vdEJ1ZmZlckdlb21ldHJ5KDAuNSwgMC4yLCAxMDAsIDEwMClcbmNvbnN0IHRvcnVzS25vdE1hdCA9IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7XG4gIGNvbG9yOiAweDAwZmY4OCxcbiAgcm91Z2huZXNzOiAwLjFcbn0pXG5jb25zdCB0b3J1c0tub3RNZXNoID0gbmV3IFRIUkVFLk1lc2godG9ydXNLbm90R2VvbWV0cnksIHRvcnVzS25vdE1hdClcblxudG9ydXNLbm90TWVzaC5jYXN0U2hhZG93ID0gdHJ1ZVxudG9ydXNLbm90TWVzaC5wb3NpdGlvbi54ID0gMlxudG9ydXNLbm90TWVzaC5wb3NpdGlvbi56ID0gLTNcblxuc2NlbmUuYWRkKHRvcnVzS25vdE1lc2gpXG5cbi8vIGFkZCBzdGF0c1xuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChBUkJ1dHRvbi5jcmVhdGVCdXR0b24ocmVuZGVyZXIpKVxuXG5hbmltYXRlKClcblxuLy8gcmVuZGVyIHRoZSBzY2VuZVxuZnVuY3Rpb24gYW5pbWF0ZSgpIHtcbiAgdG9ydXNLbm90TWVzaC5yb3RhdGlvbi54ICs9IDAuMDAyXG4gIHRvcnVzS25vdE1lc2gucm90YXRpb24ueSArPSAwLjAwMlxuICBjdWJlLnJvdGF0aW9uLnggKz0gMC4wMDJcbiAgY3ViZS5yb3RhdGlvbi55ICs9IDAuMDAyXG4gIHJlbmRlcmVyLnNldEFuaW1hdGlvbkxvb3AoYW5pbWF0ZSlcbiAgcmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEpXG59XG4iLCJjbGFzcyBBUkJ1dHRvbiB7XG5cblx0c3RhdGljIGNyZWF0ZUJ1dHRvbiggcmVuZGVyZXIsIHNlc3Npb25Jbml0ID0ge30gKSB7XG5cblx0XHRjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnYnV0dG9uJyApO1xuXG5cdFx0ZnVuY3Rpb24gc2hvd1N0YXJ0QVIoIC8qZGV2aWNlKi8gKSB7XG5cblx0XHRcdGlmICggc2Vzc2lvbkluaXQuZG9tT3ZlcmxheSA9PT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRcdGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuXHRcdFx0XHRvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoIG92ZXJsYXkgKTtcblxuXHRcdFx0XHRjb25zdCBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdzdmcnICk7XG5cdFx0XHRcdHN2Zy5zZXRBdHRyaWJ1dGUoICd3aWR0aCcsIDM4ICk7XG5cdFx0XHRcdHN2Zy5zZXRBdHRyaWJ1dGUoICdoZWlnaHQnLCAzOCApO1xuXHRcdFx0XHRzdmcuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuXHRcdFx0XHRzdmcuc3R5bGUucmlnaHQgPSAnMjBweCc7XG5cdFx0XHRcdHN2Zy5zdHlsZS50b3AgPSAnMjBweCc7XG5cdFx0XHRcdHN2Zy5hZGRFdmVudExpc3RlbmVyKCAnY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0XHRjdXJyZW50U2Vzc2lvbi5lbmQoKTtcblxuXHRcdFx0XHR9ICk7XG5cdFx0XHRcdG92ZXJsYXkuYXBwZW5kQ2hpbGQoIHN2ZyApO1xuXG5cdFx0XHRcdGNvbnN0IHBhdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdwYXRoJyApO1xuXHRcdFx0XHRwYXRoLnNldEF0dHJpYnV0ZSggJ2QnLCAnTSAxMiwxMiBMIDI4LDI4IE0gMjgsMTIgMTIsMjgnICk7XG5cdFx0XHRcdHBhdGguc2V0QXR0cmlidXRlKCAnc3Ryb2tlJywgJyNmZmYnICk7XG5cdFx0XHRcdHBhdGguc2V0QXR0cmlidXRlKCAnc3Ryb2tlLXdpZHRoJywgMiApO1xuXHRcdFx0XHRzdmcuYXBwZW5kQ2hpbGQoIHBhdGggKTtcblxuXHRcdFx0XHRpZiAoIHNlc3Npb25Jbml0Lm9wdGlvbmFsRmVhdHVyZXMgPT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0XHRcdHNlc3Npb25Jbml0Lm9wdGlvbmFsRmVhdHVyZXMgPSBbXTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0c2Vzc2lvbkluaXQub3B0aW9uYWxGZWF0dXJlcy5wdXNoKCAnZG9tLW92ZXJsYXknICk7XG5cdFx0XHRcdHNlc3Npb25Jbml0LmRvbU92ZXJsYXkgPSB7IHJvb3Q6IG92ZXJsYXkgfTtcblxuXHRcdFx0fVxuXG5cdFx0XHQvL1xuXG5cdFx0XHRsZXQgY3VycmVudFNlc3Npb24gPSBudWxsO1xuXG5cdFx0XHRhc3luYyBmdW5jdGlvbiBvblNlc3Npb25TdGFydGVkKCBzZXNzaW9uICkge1xuXG5cdFx0XHRcdHNlc3Npb24uYWRkRXZlbnRMaXN0ZW5lciggJ2VuZCcsIG9uU2Vzc2lvbkVuZGVkICk7XG5cblx0XHRcdFx0cmVuZGVyZXIueHIuc2V0UmVmZXJlbmNlU3BhY2VUeXBlKCAnbG9jYWwnICk7XG5cblx0XHRcdFx0YXdhaXQgcmVuZGVyZXIueHIuc2V0U2Vzc2lvbiggc2Vzc2lvbiApO1xuXG5cdFx0XHRcdGJ1dHRvbi50ZXh0Q29udGVudCA9ICdTVE9QIEFSJztcblx0XHRcdFx0c2Vzc2lvbkluaXQuZG9tT3ZlcmxheS5yb290LnN0eWxlLmRpc3BsYXkgPSAnJztcblxuXHRcdFx0XHRjdXJyZW50U2Vzc2lvbiA9IHNlc3Npb247XG5cblx0XHRcdH1cblxuXHRcdFx0ZnVuY3Rpb24gb25TZXNzaW9uRW5kZWQoIC8qZXZlbnQqLyApIHtcblxuXHRcdFx0XHRjdXJyZW50U2Vzc2lvbi5yZW1vdmVFdmVudExpc3RlbmVyKCAnZW5kJywgb25TZXNzaW9uRW5kZWQgKTtcblxuXHRcdFx0XHRidXR0b24udGV4dENvbnRlbnQgPSAnU1RBUlQgQVInO1xuXHRcdFx0XHRzZXNzaW9uSW5pdC5kb21PdmVybGF5LnJvb3Quc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuXHRcdFx0XHRjdXJyZW50U2Vzc2lvbiA9IG51bGw7XG5cblx0XHRcdH1cblxuXHRcdFx0Ly9cblxuXHRcdFx0YnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnJztcblxuXHRcdFx0YnV0dG9uLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcblx0XHRcdGJ1dHRvbi5zdHlsZS5sZWZ0ID0gJ2NhbGMoNTAlIC0gNTBweCknO1xuXHRcdFx0YnV0dG9uLnN0eWxlLndpZHRoID0gJzEwMHB4JztcblxuXHRcdFx0YnV0dG9uLnRleHRDb250ZW50ID0gJ1NUQVJUIEFSJztcblxuXHRcdFx0YnV0dG9uLm9ubW91c2VlbnRlciA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRidXR0b24uc3R5bGUub3BhY2l0eSA9ICcxLjAnO1xuXG5cdFx0XHR9O1xuXG5cdFx0XHRidXR0b24ub25tb3VzZWxlYXZlID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdGJ1dHRvbi5zdHlsZS5vcGFjaXR5ID0gJzAuNSc7XG5cblx0XHRcdH07XG5cblx0XHRcdGJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdGlmICggY3VycmVudFNlc3Npb24gPT09IG51bGwgKSB7XG5cblx0XHRcdFx0XHRuYXZpZ2F0b3IueHIucmVxdWVzdFNlc3Npb24oICdpbW1lcnNpdmUtYXInLCBzZXNzaW9uSW5pdCApLnRoZW4oIG9uU2Vzc2lvblN0YXJ0ZWQgKTtcblxuXHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0Y3VycmVudFNlc3Npb24uZW5kKCk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9O1xuXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gZGlzYWJsZUJ1dHRvbigpIHtcblxuXHRcdFx0YnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnJztcblxuXHRcdFx0YnV0dG9uLnN0eWxlLmN1cnNvciA9ICdhdXRvJztcblx0XHRcdGJ1dHRvbi5zdHlsZS5sZWZ0ID0gJ2NhbGMoNTAlIC0gNzVweCknO1xuXHRcdFx0YnV0dG9uLnN0eWxlLndpZHRoID0gJzE1MHB4JztcblxuXHRcdFx0YnV0dG9uLm9ubW91c2VlbnRlciA9IG51bGw7XG5cdFx0XHRidXR0b24ub25tb3VzZWxlYXZlID0gbnVsbDtcblxuXHRcdFx0YnV0dG9uLm9uY2xpY2sgPSBudWxsO1xuXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc2hvd0FSTm90U3VwcG9ydGVkKCkge1xuXG5cdFx0XHRkaXNhYmxlQnV0dG9uKCk7XG5cblx0XHRcdGJ1dHRvbi50ZXh0Q29udGVudCA9ICdBUiBOT1QgU1VQUE9SVEVEJztcblxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHNob3dBUk5vdEFsbG93ZWQoIGV4Y2VwdGlvbiApIHtcblxuXHRcdFx0ZGlzYWJsZUJ1dHRvbigpO1xuXG5cdFx0XHRjb25zb2xlLndhcm4oICdFeGNlcHRpb24gd2hlbiB0cnlpbmcgdG8gY2FsbCB4ci5pc1Nlc3Npb25TdXBwb3J0ZWQnLCBleGNlcHRpb24gKTtcblxuXHRcdFx0YnV0dG9uLnRleHRDb250ZW50ID0gJ0FSIE5PVCBBTExPV0VEJztcblxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHN0eWxpemVFbGVtZW50KCBlbGVtZW50ICkge1xuXG5cdFx0XHRlbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcblx0XHRcdGVsZW1lbnQuc3R5bGUuYm90dG9tID0gJzIwcHgnO1xuXHRcdFx0ZWxlbWVudC5zdHlsZS5wYWRkaW5nID0gJzEycHggNnB4Jztcblx0XHRcdGVsZW1lbnQuc3R5bGUuYm9yZGVyID0gJzFweCBzb2xpZCAjZmZmJztcblx0XHRcdGVsZW1lbnQuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzRweCc7XG5cdFx0XHRlbGVtZW50LnN0eWxlLmJhY2tncm91bmQgPSAncmdiYSgwLDAsMCwwLjEpJztcblx0XHRcdGVsZW1lbnQuc3R5bGUuY29sb3IgPSAnI2ZmZic7XG5cdFx0XHRlbGVtZW50LnN0eWxlLmZvbnQgPSAnbm9ybWFsIDEzcHggc2Fucy1zZXJpZic7XG5cdFx0XHRlbGVtZW50LnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuXHRcdFx0ZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gJzAuNSc7XG5cdFx0XHRlbGVtZW50LnN0eWxlLm91dGxpbmUgPSAnbm9uZSc7XG5cdFx0XHRlbGVtZW50LnN0eWxlLnpJbmRleCA9ICc5OTknO1xuXG5cdFx0fVxuXG5cdFx0aWYgKCAneHInIGluIG5hdmlnYXRvciApIHtcblxuXHRcdFx0YnV0dG9uLmlkID0gJ0FSQnV0dG9uJztcblx0XHRcdGJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG5cdFx0XHRzdHlsaXplRWxlbWVudCggYnV0dG9uICk7XG5cblx0XHRcdG5hdmlnYXRvci54ci5pc1Nlc3Npb25TdXBwb3J0ZWQoICdpbW1lcnNpdmUtYXInICkudGhlbiggZnVuY3Rpb24gKCBzdXBwb3J0ZWQgKSB7XG5cblx0XHRcdFx0c3VwcG9ydGVkID8gc2hvd1N0YXJ0QVIoKSA6IHNob3dBUk5vdFN1cHBvcnRlZCgpO1xuXG5cdFx0XHR9ICkuY2F0Y2goIHNob3dBUk5vdEFsbG93ZWQgKTtcblxuXHRcdFx0cmV0dXJuIGJ1dHRvbjtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGNvbnN0IG1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnYScgKTtcblxuXHRcdFx0aWYgKCB3aW5kb3cuaXNTZWN1cmVDb250ZXh0ID09PSBmYWxzZSApIHtcblxuXHRcdFx0XHRtZXNzYWdlLmhyZWYgPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmLnJlcGxhY2UoIC9eaHR0cDovLCAnaHR0cHM6JyApO1xuXHRcdFx0XHRtZXNzYWdlLmlubmVySFRNTCA9ICdXRUJYUiBORUVEUyBIVFRQUyc7IC8vIFRPRE8gSW1wcm92ZSBtZXNzYWdlXG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0bWVzc2FnZS5ocmVmID0gJ2h0dHBzOi8vaW1tZXJzaXZld2ViLmRldi8nO1xuXHRcdFx0XHRtZXNzYWdlLmlubmVySFRNTCA9ICdXRUJYUiBOT1QgQVZBSUxBQkxFJztcblxuXHRcdFx0fVxuXG5cdFx0XHRtZXNzYWdlLnN0eWxlLmxlZnQgPSAnY2FsYyg1MCUgLSA5MHB4KSc7XG5cdFx0XHRtZXNzYWdlLnN0eWxlLndpZHRoID0gJzE4MHB4Jztcblx0XHRcdG1lc3NhZ2Uuc3R5bGUudGV4dERlY29yYXRpb24gPSAnbm9uZSc7XG5cblx0XHRcdHN0eWxpemVFbGVtZW50KCBtZXNzYWdlICk7XG5cblx0XHRcdHJldHVybiBtZXNzYWdlO1xuXG5cdFx0fVxuXG5cdH1cblxufVxuXG5leHBvcnQgeyBBUkJ1dHRvbiB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJhclwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtsdGpzX2ZvdXJ0aFwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtsdGpzX2ZvdXJ0aFwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfYnVpbGRfdGhyZWVfbW9kdWxlX2pzXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTE0L2FyLmpzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
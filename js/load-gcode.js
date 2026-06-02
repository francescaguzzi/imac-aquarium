/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./samples/chapters/chapter-8/load-gcode.js"
/*!**************************************************!*\
  !*** ./samples/chapters/chapter-8/load-gcode.js ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_standard_scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/standard-scene */ "./samples/chapters/chapter-8/util/standard-scene.js");
/* harmony import */ var three_examples_jsm_loaders_GCodeLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/loaders/GCodeLoader */ "./node_modules/three/examples/jsm/loaders/GCodeLoader.js");
/* harmony import */ var _util_modelUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/modelUtil */ "./samples/util/modelUtil.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");





const modelAsync = () => {
  const loader = new three_examples_jsm_loaders_GCodeLoader__WEBPACK_IMPORTED_MODULE_1__.GCodeLoader()

  return loader.loadAsync('/assets/models/benchy/benchy.gcode').then((model) => {
    model.translateZ(-1)
    model.translateX(-14)
    model.translateY(-16)

    model.scale.set(0.15, 0.15, 0.15)

    ;(0,_util_modelUtil__WEBPACK_IMPORTED_MODULE_2__.visitChildren)(model, (child) => {
      child.receiveShadow = true
      child.castShadow = true
      child.geometry.computeVertexNormals()
      child.material.color = new three__WEBPACK_IMPORTED_MODULE_3__.Color(0x000000)
      child.material.wireframe = true
    })

    return model
  })
}

;(0,_util_standard_scene__WEBPACK_IMPORTED_MODULE_0__.bootstrapMeshScene)({
  loadMesh: modelAsync
}).then()


/***/ },

/***/ "./node_modules/three/examples/jsm/loaders/GCodeLoader.js"
/*!****************************************************************!*\
  !*** ./node_modules/three/examples/jsm/loaders/GCodeLoader.js ***!
  \****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GCodeLoader: () => (/* binding */ GCodeLoader)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");


/**
 * GCodeLoader is used to load gcode files usually used for 3D printing or CNC applications.
 *
 * Gcode files are composed by commands used by machines to create objects.
 *
 * @class GCodeLoader
 * @param {Manager} manager Loading manager.
 */

class GCodeLoader extends three__WEBPACK_IMPORTED_MODULE_0__.Loader {

	constructor( manager ) {

		super( manager );

		this.splitLayer = false;

	}

	load( url, onLoad, onProgress, onError ) {

		const scope = this;

		const loader = new three__WEBPACK_IMPORTED_MODULE_0__.FileLoader( scope.manager );
		loader.setPath( scope.path );
		loader.setRequestHeader( scope.requestHeader );
		loader.setWithCredentials( scope.withCredentials );
		loader.load( url, function ( text ) {

			try {

				onLoad( scope.parse( text ) );

			} catch ( e ) {

				if ( onError ) {

					onError( e );

				} else {

					console.error( e );

				}

				scope.manager.itemError( url );

			}

		}, onProgress, onError );

	}

	parse( data ) {

		let state = { x: 0, y: 0, z: 0, e: 0, f: 0, extruding: false, relative: false };
		const layers = [];

		let currentLayer = undefined;

		const pathMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.LineBasicMaterial( { color: 0xFF0000 } );
		pathMaterial.name = 'path';

		const extrudingMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.LineBasicMaterial( { color: 0x00FF00 } );
		extrudingMaterial.name = 'extruded';

		function newLayer( line ) {

			currentLayer = { vertex: [], pathVertex: [], z: line.z };
			layers.push( currentLayer );

		}

		//Create lie segment between p1 and p2
		function addSegment( p1, p2 ) {

			if ( currentLayer === undefined ) {

				newLayer( p1 );

			}

			if ( state.extruding ) {

				currentLayer.vertex.push( p1.x, p1.y, p1.z );
				currentLayer.vertex.push( p2.x, p2.y, p2.z );

			} else {

				currentLayer.pathVertex.push( p1.x, p1.y, p1.z );
				currentLayer.pathVertex.push( p2.x, p2.y, p2.z );

			}

		}

		function delta( v1, v2 ) {

			return state.relative ? v2 : v2 - v1;

		}

		function absolute( v1, v2 ) {

			return state.relative ? v1 + v2 : v2;

		}

		const lines = data.replace( /;.+/g, '' ).split( '\n' );

		for ( let i = 0; i < lines.length; i ++ ) {

			const tokens = lines[ i ].split( ' ' );
			const cmd = tokens[ 0 ].toUpperCase();

			//Argumments
			const args = {};
			tokens.splice( 1 ).forEach( function ( token ) {

				if ( token[ 0 ] !== undefined ) {

					const key = token[ 0 ].toLowerCase();
					const value = parseFloat( token.substring( 1 ) );
					args[ key ] = value;

				}

			} );

			//Process commands
			//G0/G1 – Linear Movement
			if ( cmd === 'G0' || cmd === 'G1' ) {

				const line = {
					x: args.x !== undefined ? absolute( state.x, args.x ) : state.x,
					y: args.y !== undefined ? absolute( state.y, args.y ) : state.y,
					z: args.z !== undefined ? absolute( state.z, args.z ) : state.z,
					e: args.e !== undefined ? absolute( state.e, args.e ) : state.e,
					f: args.f !== undefined ? absolute( state.f, args.f ) : state.f,
				};

				//Layer change detection is or made by watching Z, it's made by watching when we extrude at a new Z position
				if ( delta( state.e, line.e ) > 0 ) {

					state.extruding = delta( state.e, line.e ) > 0;

					if ( currentLayer == undefined || line.z != currentLayer.z ) {

						newLayer( line );

					}

				}

				addSegment( state, line );
				state = line;

			} else if ( cmd === 'G2' || cmd === 'G3' ) {

				//G2/G3 - Arc Movement ( G2 clock wise and G3 counter clock wise )
				//console.warn( 'THREE.GCodeLoader: Arc command not supported' );

			} else if ( cmd === 'G90' ) {

				//G90: Set to Absolute Positioning
				state.relative = false;

			} else if ( cmd === 'G91' ) {

				//G91: Set to state.relative Positioning
				state.relative = true;

			} else if ( cmd === 'G92' ) {

				//G92: Set Position
				const line = state;
				line.x = args.x !== undefined ? args.x : line.x;
				line.y = args.y !== undefined ? args.y : line.y;
				line.z = args.z !== undefined ? args.z : line.z;
				line.e = args.e !== undefined ? args.e : line.e;

			} else {

				//console.warn( 'THREE.GCodeLoader: Command not supported:' + cmd );

			}

		}

		function addObject( vertex, extruding, i ) {

			const geometry = new three__WEBPACK_IMPORTED_MODULE_0__.BufferGeometry();
			geometry.setAttribute( 'position', new three__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute( vertex, 3 ) );
			const segments = new three__WEBPACK_IMPORTED_MODULE_0__.LineSegments( geometry, extruding ? extrudingMaterial : pathMaterial );
			segments.name = 'layer' + i;
			object.add( segments );

		}

		const object = new three__WEBPACK_IMPORTED_MODULE_0__.Group();
		object.name = 'gcode';

		if ( this.splitLayer ) {

			for ( let i = 0; i < layers.length; i ++ ) {

				const layer = layers[ i ];
				addObject( layer.vertex, true, i );
				addObject( layer.pathVertex, false, i );

			}

		} else {

			const vertex = [],
				pathVertex = [];

			for ( let i = 0; i < layers.length; i ++ ) {

				const layer = layers[ i ];
				const layerVertex = layer.vertex;
				const layerPathVertex = layer.pathVertex;

				for ( let j = 0; j < layerVertex.length; j ++ ) {

					vertex.push( layerVertex[ j ] );

				}

				for ( let j = 0; j < layerPathVertex.length; j ++ ) {

					pathVertex.push( layerPathVertex[ j ] );

				}

			}

			addObject( vertex, true, layers.length );
			addObject( pathVertex, false, layers.length );

		}

		object.quaternion.setFromEuler( new three__WEBPACK_IMPORTED_MODULE_0__.Euler( - Math.PI / 2, 0, 0 ) );

		return object;

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
/******/ 			"load-gcode": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","samples_chapters_chapter-8_util_standard-scene_js"], () => (__webpack_require__("./samples/chapters/chapter-8/load-gcode.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0EsRTs7Ozs7V0MzQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQSw0Rzs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTgvbG9hZC1nY29kZS5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL25vZGVfbW9kdWxlcy90aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HQ29kZUxvYWRlci5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGJvb3RzdHJhcE1lc2hTY2VuZSB9IGZyb20gJy4vdXRpbC9zdGFuZGFyZC1zY2VuZSdcbmltcG9ydCB7IEdDb2RlTG9hZGVyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0NvZGVMb2FkZXInXG5pbXBvcnQgeyB2aXNpdENoaWxkcmVuIH0gZnJvbSAnLi4vLi4vdXRpbC9tb2RlbFV0aWwnXG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcblxuY29uc3QgbW9kZWxBc3luYyA9ICgpID0+IHtcbiAgY29uc3QgbG9hZGVyID0gbmV3IEdDb2RlTG9hZGVyKClcblxuICByZXR1cm4gbG9hZGVyLmxvYWRBc3luYygnL2Fzc2V0cy9tb2RlbHMvYmVuY2h5L2JlbmNoeS5nY29kZScpLnRoZW4oKG1vZGVsKSA9PiB7XG4gICAgbW9kZWwudHJhbnNsYXRlWigtMSlcbiAgICBtb2RlbC50cmFuc2xhdGVYKC0xNClcbiAgICBtb2RlbC50cmFuc2xhdGVZKC0xNilcblxuICAgIG1vZGVsLnNjYWxlLnNldCgwLjE1LCAwLjE1LCAwLjE1KVxuXG4gICAgdmlzaXRDaGlsZHJlbihtb2RlbCwgKGNoaWxkKSA9PiB7XG4gICAgICBjaGlsZC5yZWNlaXZlU2hhZG93ID0gdHJ1ZVxuICAgICAgY2hpbGQuY2FzdFNoYWRvdyA9IHRydWVcbiAgICAgIGNoaWxkLmdlb21ldHJ5LmNvbXB1dGVWZXJ0ZXhOb3JtYWxzKClcbiAgICAgIGNoaWxkLm1hdGVyaWFsLmNvbG9yID0gbmV3IFRIUkVFLkNvbG9yKDB4MDAwMDAwKVxuICAgICAgY2hpbGQubWF0ZXJpYWwud2lyZWZyYW1lID0gdHJ1ZVxuICAgIH0pXG5cbiAgICByZXR1cm4gbW9kZWxcbiAgfSlcbn1cblxuYm9vdHN0cmFwTWVzaFNjZW5lKHtcbiAgbG9hZE1lc2g6IG1vZGVsQXN5bmNcbn0pLnRoZW4oKVxuIiwiaW1wb3J0IHtcblx0QnVmZmVyR2VvbWV0cnksXG5cdEV1bGVyLFxuXHRGaWxlTG9hZGVyLFxuXHRGbG9hdDMyQnVmZmVyQXR0cmlidXRlLFxuXHRHcm91cCxcblx0TGluZUJhc2ljTWF0ZXJpYWwsXG5cdExpbmVTZWdtZW50cyxcblx0TG9hZGVyXG59IGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBHQ29kZUxvYWRlciBpcyB1c2VkIHRvIGxvYWQgZ2NvZGUgZmlsZXMgdXN1YWxseSB1c2VkIGZvciAzRCBwcmludGluZyBvciBDTkMgYXBwbGljYXRpb25zLlxuICpcbiAqIEdjb2RlIGZpbGVzIGFyZSBjb21wb3NlZCBieSBjb21tYW5kcyB1c2VkIGJ5IG1hY2hpbmVzIHRvIGNyZWF0ZSBvYmplY3RzLlxuICpcbiAqIEBjbGFzcyBHQ29kZUxvYWRlclxuICogQHBhcmFtIHtNYW5hZ2VyfSBtYW5hZ2VyIExvYWRpbmcgbWFuYWdlci5cbiAqL1xuXG5jbGFzcyBHQ29kZUxvYWRlciBleHRlbmRzIExvYWRlciB7XG5cblx0Y29uc3RydWN0b3IoIG1hbmFnZXIgKSB7XG5cblx0XHRzdXBlciggbWFuYWdlciApO1xuXG5cdFx0dGhpcy5zcGxpdExheWVyID0gZmFsc2U7XG5cblx0fVxuXG5cdGxvYWQoIHVybCwgb25Mb2FkLCBvblByb2dyZXNzLCBvbkVycm9yICkge1xuXG5cdFx0Y29uc3Qgc2NvcGUgPSB0aGlzO1xuXG5cdFx0Y29uc3QgbG9hZGVyID0gbmV3IEZpbGVMb2FkZXIoIHNjb3BlLm1hbmFnZXIgKTtcblx0XHRsb2FkZXIuc2V0UGF0aCggc2NvcGUucGF0aCApO1xuXHRcdGxvYWRlci5zZXRSZXF1ZXN0SGVhZGVyKCBzY29wZS5yZXF1ZXN0SGVhZGVyICk7XG5cdFx0bG9hZGVyLnNldFdpdGhDcmVkZW50aWFscyggc2NvcGUud2l0aENyZWRlbnRpYWxzICk7XG5cdFx0bG9hZGVyLmxvYWQoIHVybCwgZnVuY3Rpb24gKCB0ZXh0ICkge1xuXG5cdFx0XHR0cnkge1xuXG5cdFx0XHRcdG9uTG9hZCggc2NvcGUucGFyc2UoIHRleHQgKSApO1xuXG5cdFx0XHR9IGNhdGNoICggZSApIHtcblxuXHRcdFx0XHRpZiAoIG9uRXJyb3IgKSB7XG5cblx0XHRcdFx0XHRvbkVycm9yKCBlICk7XG5cblx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoIGUgKTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0c2NvcGUubWFuYWdlci5pdGVtRXJyb3IoIHVybCApO1xuXG5cdFx0XHR9XG5cblx0XHR9LCBvblByb2dyZXNzLCBvbkVycm9yICk7XG5cblx0fVxuXG5cdHBhcnNlKCBkYXRhICkge1xuXG5cdFx0bGV0IHN0YXRlID0geyB4OiAwLCB5OiAwLCB6OiAwLCBlOiAwLCBmOiAwLCBleHRydWRpbmc6IGZhbHNlLCByZWxhdGl2ZTogZmFsc2UgfTtcblx0XHRjb25zdCBsYXllcnMgPSBbXTtcblxuXHRcdGxldCBjdXJyZW50TGF5ZXIgPSB1bmRlZmluZWQ7XG5cblx0XHRjb25zdCBwYXRoTWF0ZXJpYWwgPSBuZXcgTGluZUJhc2ljTWF0ZXJpYWwoIHsgY29sb3I6IDB4RkYwMDAwIH0gKTtcblx0XHRwYXRoTWF0ZXJpYWwubmFtZSA9ICdwYXRoJztcblxuXHRcdGNvbnN0IGV4dHJ1ZGluZ01hdGVyaWFsID0gbmV3IExpbmVCYXNpY01hdGVyaWFsKCB7IGNvbG9yOiAweDAwRkYwMCB9ICk7XG5cdFx0ZXh0cnVkaW5nTWF0ZXJpYWwubmFtZSA9ICdleHRydWRlZCc7XG5cblx0XHRmdW5jdGlvbiBuZXdMYXllciggbGluZSApIHtcblxuXHRcdFx0Y3VycmVudExheWVyID0geyB2ZXJ0ZXg6IFtdLCBwYXRoVmVydGV4OiBbXSwgejogbGluZS56IH07XG5cdFx0XHRsYXllcnMucHVzaCggY3VycmVudExheWVyICk7XG5cblx0XHR9XG5cblx0XHQvL0NyZWF0ZSBsaWUgc2VnbWVudCBiZXR3ZWVuIHAxIGFuZCBwMlxuXHRcdGZ1bmN0aW9uIGFkZFNlZ21lbnQoIHAxLCBwMiApIHtcblxuXHRcdFx0aWYgKCBjdXJyZW50TGF5ZXIgPT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0XHRuZXdMYXllciggcDEgKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIHN0YXRlLmV4dHJ1ZGluZyApIHtcblxuXHRcdFx0XHRjdXJyZW50TGF5ZXIudmVydGV4LnB1c2goIHAxLngsIHAxLnksIHAxLnogKTtcblx0XHRcdFx0Y3VycmVudExheWVyLnZlcnRleC5wdXNoKCBwMi54LCBwMi55LCBwMi56ICk7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0Y3VycmVudExheWVyLnBhdGhWZXJ0ZXgucHVzaCggcDEueCwgcDEueSwgcDEueiApO1xuXHRcdFx0XHRjdXJyZW50TGF5ZXIucGF0aFZlcnRleC5wdXNoKCBwMi54LCBwMi55LCBwMi56ICk7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGRlbHRhKCB2MSwgdjIgKSB7XG5cblx0XHRcdHJldHVybiBzdGF0ZS5yZWxhdGl2ZSA/IHYyIDogdjIgLSB2MTtcblxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGFic29sdXRlKCB2MSwgdjIgKSB7XG5cblx0XHRcdHJldHVybiBzdGF0ZS5yZWxhdGl2ZSA/IHYxICsgdjIgOiB2MjtcblxuXHRcdH1cblxuXHRcdGNvbnN0IGxpbmVzID0gZGF0YS5yZXBsYWNlKCAvOy4rL2csICcnICkuc3BsaXQoICdcXG4nICk7XG5cblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkgKysgKSB7XG5cblx0XHRcdGNvbnN0IHRva2VucyA9IGxpbmVzWyBpIF0uc3BsaXQoICcgJyApO1xuXHRcdFx0Y29uc3QgY21kID0gdG9rZW5zWyAwIF0udG9VcHBlckNhc2UoKTtcblxuXHRcdFx0Ly9Bcmd1bW1lbnRzXG5cdFx0XHRjb25zdCBhcmdzID0ge307XG5cdFx0XHR0b2tlbnMuc3BsaWNlKCAxICkuZm9yRWFjaCggZnVuY3Rpb24gKCB0b2tlbiApIHtcblxuXHRcdFx0XHRpZiAoIHRva2VuWyAwIF0gIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0XHRcdGNvbnN0IGtleSA9IHRva2VuWyAwIF0udG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHRjb25zdCB2YWx1ZSA9IHBhcnNlRmxvYXQoIHRva2VuLnN1YnN0cmluZyggMSApICk7XG5cdFx0XHRcdFx0YXJnc1sga2V5IF0gPSB2YWx1ZTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdH0gKTtcblxuXHRcdFx0Ly9Qcm9jZXNzIGNvbW1hbmRzXG5cdFx0XHQvL0cwL0cxIOKAkyBMaW5lYXIgTW92ZW1lbnRcblx0XHRcdGlmICggY21kID09PSAnRzAnIHx8IGNtZCA9PT0gJ0cxJyApIHtcblxuXHRcdFx0XHRjb25zdCBsaW5lID0ge1xuXHRcdFx0XHRcdHg6IGFyZ3MueCAhPT0gdW5kZWZpbmVkID8gYWJzb2x1dGUoIHN0YXRlLngsIGFyZ3MueCApIDogc3RhdGUueCxcblx0XHRcdFx0XHR5OiBhcmdzLnkgIT09IHVuZGVmaW5lZCA/IGFic29sdXRlKCBzdGF0ZS55LCBhcmdzLnkgKSA6IHN0YXRlLnksXG5cdFx0XHRcdFx0ejogYXJncy56ICE9PSB1bmRlZmluZWQgPyBhYnNvbHV0ZSggc3RhdGUueiwgYXJncy56ICkgOiBzdGF0ZS56LFxuXHRcdFx0XHRcdGU6IGFyZ3MuZSAhPT0gdW5kZWZpbmVkID8gYWJzb2x1dGUoIHN0YXRlLmUsIGFyZ3MuZSApIDogc3RhdGUuZSxcblx0XHRcdFx0XHRmOiBhcmdzLmYgIT09IHVuZGVmaW5lZCA/IGFic29sdXRlKCBzdGF0ZS5mLCBhcmdzLmYgKSA6IHN0YXRlLmYsXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0Ly9MYXllciBjaGFuZ2UgZGV0ZWN0aW9uIGlzIG9yIG1hZGUgYnkgd2F0Y2hpbmcgWiwgaXQncyBtYWRlIGJ5IHdhdGNoaW5nIHdoZW4gd2UgZXh0cnVkZSBhdCBhIG5ldyBaIHBvc2l0aW9uXG5cdFx0XHRcdGlmICggZGVsdGEoIHN0YXRlLmUsIGxpbmUuZSApID4gMCApIHtcblxuXHRcdFx0XHRcdHN0YXRlLmV4dHJ1ZGluZyA9IGRlbHRhKCBzdGF0ZS5lLCBsaW5lLmUgKSA+IDA7XG5cblx0XHRcdFx0XHRpZiAoIGN1cnJlbnRMYXllciA9PSB1bmRlZmluZWQgfHwgbGluZS56ICE9IGN1cnJlbnRMYXllci56ICkge1xuXG5cdFx0XHRcdFx0XHRuZXdMYXllciggbGluZSApO1xuXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRhZGRTZWdtZW50KCBzdGF0ZSwgbGluZSApO1xuXHRcdFx0XHRzdGF0ZSA9IGxpbmU7XG5cblx0XHRcdH0gZWxzZSBpZiAoIGNtZCA9PT0gJ0cyJyB8fCBjbWQgPT09ICdHMycgKSB7XG5cblx0XHRcdFx0Ly9HMi9HMyAtIEFyYyBNb3ZlbWVudCAoIEcyIGNsb2NrIHdpc2UgYW5kIEczIGNvdW50ZXIgY2xvY2sgd2lzZSApXG5cdFx0XHRcdC8vY29uc29sZS53YXJuKCAnVEhSRUUuR0NvZGVMb2FkZXI6IEFyYyBjb21tYW5kIG5vdCBzdXBwb3J0ZWQnICk7XG5cblx0XHRcdH0gZWxzZSBpZiAoIGNtZCA9PT0gJ0c5MCcgKSB7XG5cblx0XHRcdFx0Ly9HOTA6IFNldCB0byBBYnNvbHV0ZSBQb3NpdGlvbmluZ1xuXHRcdFx0XHRzdGF0ZS5yZWxhdGl2ZSA9IGZhbHNlO1xuXG5cdFx0XHR9IGVsc2UgaWYgKCBjbWQgPT09ICdHOTEnICkge1xuXG5cdFx0XHRcdC8vRzkxOiBTZXQgdG8gc3RhdGUucmVsYXRpdmUgUG9zaXRpb25pbmdcblx0XHRcdFx0c3RhdGUucmVsYXRpdmUgPSB0cnVlO1xuXG5cdFx0XHR9IGVsc2UgaWYgKCBjbWQgPT09ICdHOTInICkge1xuXG5cdFx0XHRcdC8vRzkyOiBTZXQgUG9zaXRpb25cblx0XHRcdFx0Y29uc3QgbGluZSA9IHN0YXRlO1xuXHRcdFx0XHRsaW5lLnggPSBhcmdzLnggIT09IHVuZGVmaW5lZCA/IGFyZ3MueCA6IGxpbmUueDtcblx0XHRcdFx0bGluZS55ID0gYXJncy55ICE9PSB1bmRlZmluZWQgPyBhcmdzLnkgOiBsaW5lLnk7XG5cdFx0XHRcdGxpbmUueiA9IGFyZ3MueiAhPT0gdW5kZWZpbmVkID8gYXJncy56IDogbGluZS56O1xuXHRcdFx0XHRsaW5lLmUgPSBhcmdzLmUgIT09IHVuZGVmaW5lZCA/IGFyZ3MuZSA6IGxpbmUuZTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHQvL2NvbnNvbGUud2FybiggJ1RIUkVFLkdDb2RlTG9hZGVyOiBDb21tYW5kIG5vdCBzdXBwb3J0ZWQ6JyArIGNtZCApO1xuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBhZGRPYmplY3QoIHZlcnRleCwgZXh0cnVkaW5nLCBpICkge1xuXG5cdFx0XHRjb25zdCBnZW9tZXRyeSA9IG5ldyBCdWZmZXJHZW9tZXRyeSgpO1xuXHRcdFx0Z2VvbWV0cnkuc2V0QXR0cmlidXRlKCAncG9zaXRpb24nLCBuZXcgRmxvYXQzMkJ1ZmZlckF0dHJpYnV0ZSggdmVydGV4LCAzICkgKTtcblx0XHRcdGNvbnN0IHNlZ21lbnRzID0gbmV3IExpbmVTZWdtZW50cyggZ2VvbWV0cnksIGV4dHJ1ZGluZyA/IGV4dHJ1ZGluZ01hdGVyaWFsIDogcGF0aE1hdGVyaWFsICk7XG5cdFx0XHRzZWdtZW50cy5uYW1lID0gJ2xheWVyJyArIGk7XG5cdFx0XHRvYmplY3QuYWRkKCBzZWdtZW50cyApO1xuXG5cdFx0fVxuXG5cdFx0Y29uc3Qgb2JqZWN0ID0gbmV3IEdyb3VwKCk7XG5cdFx0b2JqZWN0Lm5hbWUgPSAnZ2NvZGUnO1xuXG5cdFx0aWYgKCB0aGlzLnNwbGl0TGF5ZXIgKSB7XG5cblx0XHRcdGZvciAoIGxldCBpID0gMDsgaSA8IGxheWVycy5sZW5ndGg7IGkgKysgKSB7XG5cblx0XHRcdFx0Y29uc3QgbGF5ZXIgPSBsYXllcnNbIGkgXTtcblx0XHRcdFx0YWRkT2JqZWN0KCBsYXllci52ZXJ0ZXgsIHRydWUsIGkgKTtcblx0XHRcdFx0YWRkT2JqZWN0KCBsYXllci5wYXRoVmVydGV4LCBmYWxzZSwgaSApO1xuXG5cdFx0XHR9XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRjb25zdCB2ZXJ0ZXggPSBbXSxcblx0XHRcdFx0cGF0aFZlcnRleCA9IFtdO1xuXG5cdFx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBsYXllcnMubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0XHRcdGNvbnN0IGxheWVyID0gbGF5ZXJzWyBpIF07XG5cdFx0XHRcdGNvbnN0IGxheWVyVmVydGV4ID0gbGF5ZXIudmVydGV4O1xuXHRcdFx0XHRjb25zdCBsYXllclBhdGhWZXJ0ZXggPSBsYXllci5wYXRoVmVydGV4O1xuXG5cdFx0XHRcdGZvciAoIGxldCBqID0gMDsgaiA8IGxheWVyVmVydGV4Lmxlbmd0aDsgaiArKyApIHtcblxuXHRcdFx0XHRcdHZlcnRleC5wdXNoKCBsYXllclZlcnRleFsgaiBdICk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGZvciAoIGxldCBqID0gMDsgaiA8IGxheWVyUGF0aFZlcnRleC5sZW5ndGg7IGogKysgKSB7XG5cblx0XHRcdFx0XHRwYXRoVmVydGV4LnB1c2goIGxheWVyUGF0aFZlcnRleFsgaiBdICk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHRcdGFkZE9iamVjdCggdmVydGV4LCB0cnVlLCBsYXllcnMubGVuZ3RoICk7XG5cdFx0XHRhZGRPYmplY3QoIHBhdGhWZXJ0ZXgsIGZhbHNlLCBsYXllcnMubGVuZ3RoICk7XG5cblx0XHR9XG5cblx0XHRvYmplY3QucXVhdGVybmlvbi5zZXRGcm9tRXVsZXIoIG5ldyBFdWxlciggLSBNYXRoLlBJIC8gMiwgMCwgMCApICk7XG5cblx0XHRyZXR1cm4gb2JqZWN0O1xuXG5cdH1cblxufVxuXG5leHBvcnQgeyBHQ29kZUxvYWRlciB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJsb2FkLWdjb2RlXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2x0anNfZm91cnRoXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2x0anNfZm91cnRoXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9idWlsZF90aHJlZV9tb2R1bGVfanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9jb250cm9sc19PcmJpdENvbnRyb2xzX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc19saWwtZ3VpX2Rpc3RfbGlsLWd1aV9lc21fanNcIixcInNhbXBsZXNfY2hhcHRlcnNfY2hhcHRlci04X3V0aWxfc3RhbmRhcmQtc2NlbmVfanNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItOC9sb2FkLWdjb2RlLmpzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
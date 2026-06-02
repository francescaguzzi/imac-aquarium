/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./samples/chapters/chapter-8/load-prwm.js"
/*!*************************************************!*\
  !*** ./samples/chapters/chapter-8/load-prwm.js ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_standard_scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/standard-scene */ "./samples/chapters/chapter-8/util/standard-scene.js");
/* harmony import */ var three_examples_jsm_loaders_PRWMLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/loaders/PRWMLoader */ "./node_modules/three/examples/jsm/loaders/PRWMLoader.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");




const loadModel = () => {
  return new three_examples_jsm_loaders_PRWMLoader__WEBPACK_IMPORTED_MODULE_1__.PRWMLoader().loadAsync('/assets/models/cerberus/cerberus.be.prwm').then((model) => {
    const material = new three__WEBPACK_IMPORTED_MODULE_2__.MeshNormalMaterial()
    const mesh = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(model, material)
    mesh.castShadow = true
    mesh.scale.set(4, 4, 4)
    return mesh
  })
}

;(0,_util_standard_scene__WEBPACK_IMPORTED_MODULE_0__.bootstrapMeshScene)({
  loadMesh: loadModel
}).then()


/***/ },

/***/ "./node_modules/three/examples/jsm/loaders/PRWMLoader.js"
/*!***************************************************************!*\
  !*** ./node_modules/three/examples/jsm/loaders/PRWMLoader.js ***!
  \***************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PRWMLoader: () => (/* binding */ PRWMLoader)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");


/**
 * See https://github.com/kchapelier/PRWM for more informations about this file format
 */

let bigEndianPlatform = null;

/**
	 * Check if the endianness of the platform is big-endian (most significant bit first)
	 * @returns {boolean} True if big-endian, false if little-endian
	 */
function isBigEndianPlatform() {

	if ( bigEndianPlatform === null ) {

		const buffer = new ArrayBuffer( 2 ),
			uint8Array = new Uint8Array( buffer ),
			uint16Array = new Uint16Array( buffer );

		uint8Array[ 0 ] = 0xAA; // set first byte
		uint8Array[ 1 ] = 0xBB; // set second byte
		bigEndianPlatform = ( uint16Array[ 0 ] === 0xAABB );

	}

	return bigEndianPlatform;

}

// match the values defined in the spec to the TypedArray types
const InvertedEncodingTypes = [
	null,
	Float32Array,
	null,
	Int8Array,
	Int16Array,
	null,
	Int32Array,
	Uint8Array,
	Uint16Array,
	null,
	Uint32Array
];

// define the method to use on a DataView, corresponding the TypedArray type
const getMethods = {
	Uint16Array: 'getUint16',
	Uint32Array: 'getUint32',
	Int16Array: 'getInt16',
	Int32Array: 'getInt32',
	Float32Array: 'getFloat32',
	Float64Array: 'getFloat64'
};


function copyFromBuffer( sourceArrayBuffer, viewType, position, length, fromBigEndian ) {

	const bytesPerElement = viewType.BYTES_PER_ELEMENT;
	let result;

	if ( fromBigEndian === isBigEndianPlatform() || bytesPerElement === 1 ) {

		result = new viewType( sourceArrayBuffer, position, length );

	} else {

		const readView = new DataView( sourceArrayBuffer, position, length * bytesPerElement ),
			getMethod = getMethods[ viewType.name ],
			littleEndian = ! fromBigEndian;

		result = new viewType( length );

		for ( let i = 0; i < length; i ++ ) {

			result[ i ] = readView[ getMethod ]( i * bytesPerElement, littleEndian );

		}

	}

	return result;

}


function decodePrwm( buffer ) {

	const array = new Uint8Array( buffer ),
		version = array[ 0 ];

	let flags = array[ 1 ];

	const indexedGeometry = !! ( flags >> 7 & 0x01 ),
		indicesType = flags >> 6 & 0x01,
		bigEndian = ( flags >> 5 & 0x01 ) === 1,
		attributesNumber = flags & 0x1F;

	let valuesNumber = 0,
		indicesNumber = 0;

	if ( bigEndian ) {

		valuesNumber = ( array[ 2 ] << 16 ) + ( array[ 3 ] << 8 ) + array[ 4 ];
		indicesNumber = ( array[ 5 ] << 16 ) + ( array[ 6 ] << 8 ) + array[ 7 ];

	} else {

		valuesNumber = array[ 2 ] + ( array[ 3 ] << 8 ) + ( array[ 4 ] << 16 );
		indicesNumber = array[ 5 ] + ( array[ 6 ] << 8 ) + ( array[ 7 ] << 16 );

	}

	/** PRELIMINARY CHECKS **/

	if ( version === 0 ) {

		throw new Error( 'PRWM decoder: Invalid format version: 0' );

	} else if ( version !== 1 ) {

		throw new Error( 'PRWM decoder: Unsupported format version: ' + version );

	}

	if ( ! indexedGeometry ) {

		if ( indicesType !== 0 ) {

			throw new Error( 'PRWM decoder: Indices type must be set to 0 for non-indexed geometries' );

		} else if ( indicesNumber !== 0 ) {

			throw new Error( 'PRWM decoder: Number of indices must be set to 0 for non-indexed geometries' );

		}

	}

	/** PARSING **/

	let pos = 8;

	const attributes = {};

	for ( let i = 0; i < attributesNumber; i ++ ) {

		let attributeName = '';

		while ( pos < array.length ) {

			const char = array[ pos ];
			pos ++;

			if ( char === 0 ) {

				break;

			} else {

				attributeName += String.fromCharCode( char );

			}

		}

		flags = array[ pos ];

		const attributeType = flags >> 7 & 0x01;
		const cardinality = ( flags >> 4 & 0x03 ) + 1;
		const encodingType = flags & 0x0F;
		const arrayType = InvertedEncodingTypes[ encodingType ];

		pos ++;

		// padding to next multiple of 4
		pos = Math.ceil( pos / 4 ) * 4;

		const values = copyFromBuffer( buffer, arrayType, pos, cardinality * valuesNumber, bigEndian );

		pos += arrayType.BYTES_PER_ELEMENT * cardinality * valuesNumber;

		attributes[ attributeName ] = {
			type: attributeType,
			cardinality: cardinality,
			values: values
		};

	}

	pos = Math.ceil( pos / 4 ) * 4;

	let indices = null;

	if ( indexedGeometry ) {

		indices = copyFromBuffer(
			buffer,
			indicesType === 1 ? Uint32Array : Uint16Array,
			pos,
			indicesNumber,
			bigEndian
		);

	}

	return {
		version: version,
		attributes: attributes,
		indices: indices
	};

}

// Define the public interface

class PRWMLoader extends three__WEBPACK_IMPORTED_MODULE_0__.Loader {

	constructor( manager ) {

		super( manager );

	}

	load( url, onLoad, onProgress, onError ) {

		const scope = this;

		const loader = new three__WEBPACK_IMPORTED_MODULE_0__.FileLoader( scope.manager );
		loader.setPath( scope.path );
		loader.setResponseType( 'arraybuffer' );
		loader.setRequestHeader( scope.requestHeader );
		loader.setWithCredentials( scope.withCredentials );

		url = url.replace( /\*/g, isBigEndianPlatform() ? 'be' : 'le' );

		loader.load( url, function ( arrayBuffer ) {

			try {

				onLoad( scope.parse( arrayBuffer ) );

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

	parse( arrayBuffer ) {

		const data = decodePrwm( arrayBuffer ),
			attributesKey = Object.keys( data.attributes ),
			bufferGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.BufferGeometry();

		for ( let i = 0; i < attributesKey.length; i ++ ) {

			const attribute = data.attributes[ attributesKey[ i ] ];
			bufferGeometry.setAttribute( attributesKey[ i ], new three__WEBPACK_IMPORTED_MODULE_0__.BufferAttribute( attribute.values, attribute.cardinality, attribute.normalized ) );

		}

		if ( data.indices !== null ) {

			bufferGeometry.setIndex( new three__WEBPACK_IMPORTED_MODULE_0__.BufferAttribute( data.indices, 1 ) );

		}

		return bufferGeometry;

	}

	static isBigEndianPlatform() {

		return isBigEndianPlatform();

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
/******/ 			"load-prwm": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","samples_chapters_chapter-8_util_standard-scene_js"], () => (__webpack_require__("./samples/chapters/chapter-8/load-prwm.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBd0M7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdELEU7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBLDRHOzs7OztVRWhEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItOC9sb2FkLXByd20uanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9ub2RlX21vZHVsZXMvdGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvUFJXTUxvYWRlci5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGJvb3RzdHJhcE1lc2hTY2VuZSB9IGZyb20gJy4vdXRpbC9zdGFuZGFyZC1zY2VuZSdcbmltcG9ydCB7IFBSV01Mb2FkZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9QUldNTG9hZGVyJ1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5cbmNvbnN0IGxvYWRNb2RlbCA9ICgpID0+IHtcbiAgcmV0dXJuIG5ldyBQUldNTG9hZGVyKCkubG9hZEFzeW5jKCcvYXNzZXRzL21vZGVscy9jZXJiZXJ1cy9jZXJiZXJ1cy5iZS5wcndtJykudGhlbigobW9kZWwpID0+IHtcbiAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTm9ybWFsTWF0ZXJpYWwoKVxuICAgIGNvbnN0IG1lc2ggPSBuZXcgVEhSRUUuTWVzaChtb2RlbCwgbWF0ZXJpYWwpXG4gICAgbWVzaC5jYXN0U2hhZG93ID0gdHJ1ZVxuICAgIG1lc2guc2NhbGUuc2V0KDQsIDQsIDQpXG4gICAgcmV0dXJuIG1lc2hcbiAgfSlcbn1cblxuYm9vdHN0cmFwTWVzaFNjZW5lKHtcbiAgbG9hZE1lc2g6IGxvYWRNb2RlbFxufSkudGhlbigpXG4iLCJpbXBvcnQge1xuXHRCdWZmZXJBdHRyaWJ1dGUsXG5cdEJ1ZmZlckdlb21ldHJ5LFxuXHRGaWxlTG9hZGVyLFxuXHRMb2FkZXJcbn0gZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIFNlZSBodHRwczovL2dpdGh1Yi5jb20va2NoYXBlbGllci9QUldNIGZvciBtb3JlIGluZm9ybWF0aW9ucyBhYm91dCB0aGlzIGZpbGUgZm9ybWF0XG4gKi9cblxubGV0IGJpZ0VuZGlhblBsYXRmb3JtID0gbnVsbDtcblxuLyoqXG5cdCAqIENoZWNrIGlmIHRoZSBlbmRpYW5uZXNzIG9mIHRoZSBwbGF0Zm9ybSBpcyBiaWctZW5kaWFuIChtb3N0IHNpZ25pZmljYW50IGJpdCBmaXJzdClcblx0ICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgYmlnLWVuZGlhbiwgZmFsc2UgaWYgbGl0dGxlLWVuZGlhblxuXHQgKi9cbmZ1bmN0aW9uIGlzQmlnRW5kaWFuUGxhdGZvcm0oKSB7XG5cblx0aWYgKCBiaWdFbmRpYW5QbGF0Zm9ybSA9PT0gbnVsbCApIHtcblxuXHRcdGNvbnN0IGJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlciggMiApLFxuXHRcdFx0dWludDhBcnJheSA9IG5ldyBVaW50OEFycmF5KCBidWZmZXIgKSxcblx0XHRcdHVpbnQxNkFycmF5ID0gbmV3IFVpbnQxNkFycmF5KCBidWZmZXIgKTtcblxuXHRcdHVpbnQ4QXJyYXlbIDAgXSA9IDB4QUE7IC8vIHNldCBmaXJzdCBieXRlXG5cdFx0dWludDhBcnJheVsgMSBdID0gMHhCQjsgLy8gc2V0IHNlY29uZCBieXRlXG5cdFx0YmlnRW5kaWFuUGxhdGZvcm0gPSAoIHVpbnQxNkFycmF5WyAwIF0gPT09IDB4QUFCQiApO1xuXG5cdH1cblxuXHRyZXR1cm4gYmlnRW5kaWFuUGxhdGZvcm07XG5cbn1cblxuLy8gbWF0Y2ggdGhlIHZhbHVlcyBkZWZpbmVkIGluIHRoZSBzcGVjIHRvIHRoZSBUeXBlZEFycmF5IHR5cGVzXG5jb25zdCBJbnZlcnRlZEVuY29kaW5nVHlwZXMgPSBbXG5cdG51bGwsXG5cdEZsb2F0MzJBcnJheSxcblx0bnVsbCxcblx0SW50OEFycmF5LFxuXHRJbnQxNkFycmF5LFxuXHRudWxsLFxuXHRJbnQzMkFycmF5LFxuXHRVaW50OEFycmF5LFxuXHRVaW50MTZBcnJheSxcblx0bnVsbCxcblx0VWludDMyQXJyYXlcbl07XG5cbi8vIGRlZmluZSB0aGUgbWV0aG9kIHRvIHVzZSBvbiBhIERhdGFWaWV3LCBjb3JyZXNwb25kaW5nIHRoZSBUeXBlZEFycmF5IHR5cGVcbmNvbnN0IGdldE1ldGhvZHMgPSB7XG5cdFVpbnQxNkFycmF5OiAnZ2V0VWludDE2Jyxcblx0VWludDMyQXJyYXk6ICdnZXRVaW50MzInLFxuXHRJbnQxNkFycmF5OiAnZ2V0SW50MTYnLFxuXHRJbnQzMkFycmF5OiAnZ2V0SW50MzInLFxuXHRGbG9hdDMyQXJyYXk6ICdnZXRGbG9hdDMyJyxcblx0RmxvYXQ2NEFycmF5OiAnZ2V0RmxvYXQ2NCdcbn07XG5cblxuZnVuY3Rpb24gY29weUZyb21CdWZmZXIoIHNvdXJjZUFycmF5QnVmZmVyLCB2aWV3VHlwZSwgcG9zaXRpb24sIGxlbmd0aCwgZnJvbUJpZ0VuZGlhbiApIHtcblxuXHRjb25zdCBieXRlc1BlckVsZW1lbnQgPSB2aWV3VHlwZS5CWVRFU19QRVJfRUxFTUVOVDtcblx0bGV0IHJlc3VsdDtcblxuXHRpZiAoIGZyb21CaWdFbmRpYW4gPT09IGlzQmlnRW5kaWFuUGxhdGZvcm0oKSB8fCBieXRlc1BlckVsZW1lbnQgPT09IDEgKSB7XG5cblx0XHRyZXN1bHQgPSBuZXcgdmlld1R5cGUoIHNvdXJjZUFycmF5QnVmZmVyLCBwb3NpdGlvbiwgbGVuZ3RoICk7XG5cblx0fSBlbHNlIHtcblxuXHRcdGNvbnN0IHJlYWRWaWV3ID0gbmV3IERhdGFWaWV3KCBzb3VyY2VBcnJheUJ1ZmZlciwgcG9zaXRpb24sIGxlbmd0aCAqIGJ5dGVzUGVyRWxlbWVudCApLFxuXHRcdFx0Z2V0TWV0aG9kID0gZ2V0TWV0aG9kc1sgdmlld1R5cGUubmFtZSBdLFxuXHRcdFx0bGl0dGxlRW5kaWFuID0gISBmcm9tQmlnRW5kaWFuO1xuXG5cdFx0cmVzdWx0ID0gbmV3IHZpZXdUeXBlKCBsZW5ndGggKTtcblxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0cmVzdWx0WyBpIF0gPSByZWFkVmlld1sgZ2V0TWV0aG9kIF0oIGkgKiBieXRlc1BlckVsZW1lbnQsIGxpdHRsZUVuZGlhbiApO1xuXG5cdFx0fVxuXG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xuXG59XG5cblxuZnVuY3Rpb24gZGVjb2RlUHJ3bSggYnVmZmVyICkge1xuXG5cdGNvbnN0IGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoIGJ1ZmZlciApLFxuXHRcdHZlcnNpb24gPSBhcnJheVsgMCBdO1xuXG5cdGxldCBmbGFncyA9IGFycmF5WyAxIF07XG5cblx0Y29uc3QgaW5kZXhlZEdlb21ldHJ5ID0gISEgKCBmbGFncyA+PiA3ICYgMHgwMSApLFxuXHRcdGluZGljZXNUeXBlID0gZmxhZ3MgPj4gNiAmIDB4MDEsXG5cdFx0YmlnRW5kaWFuID0gKCBmbGFncyA+PiA1ICYgMHgwMSApID09PSAxLFxuXHRcdGF0dHJpYnV0ZXNOdW1iZXIgPSBmbGFncyAmIDB4MUY7XG5cblx0bGV0IHZhbHVlc051bWJlciA9IDAsXG5cdFx0aW5kaWNlc051bWJlciA9IDA7XG5cblx0aWYgKCBiaWdFbmRpYW4gKSB7XG5cblx0XHR2YWx1ZXNOdW1iZXIgPSAoIGFycmF5WyAyIF0gPDwgMTYgKSArICggYXJyYXlbIDMgXSA8PCA4ICkgKyBhcnJheVsgNCBdO1xuXHRcdGluZGljZXNOdW1iZXIgPSAoIGFycmF5WyA1IF0gPDwgMTYgKSArICggYXJyYXlbIDYgXSA8PCA4ICkgKyBhcnJheVsgNyBdO1xuXG5cdH0gZWxzZSB7XG5cblx0XHR2YWx1ZXNOdW1iZXIgPSBhcnJheVsgMiBdICsgKCBhcnJheVsgMyBdIDw8IDggKSArICggYXJyYXlbIDQgXSA8PCAxNiApO1xuXHRcdGluZGljZXNOdW1iZXIgPSBhcnJheVsgNSBdICsgKCBhcnJheVsgNiBdIDw8IDggKSArICggYXJyYXlbIDcgXSA8PCAxNiApO1xuXG5cdH1cblxuXHQvKiogUFJFTElNSU5BUlkgQ0hFQ0tTICoqL1xuXG5cdGlmICggdmVyc2lvbiA9PT0gMCApIHtcblxuXHRcdHRocm93IG5ldyBFcnJvciggJ1BSV00gZGVjb2RlcjogSW52YWxpZCBmb3JtYXQgdmVyc2lvbjogMCcgKTtcblxuXHR9IGVsc2UgaWYgKCB2ZXJzaW9uICE9PSAxICkge1xuXG5cdFx0dGhyb3cgbmV3IEVycm9yKCAnUFJXTSBkZWNvZGVyOiBVbnN1cHBvcnRlZCBmb3JtYXQgdmVyc2lvbjogJyArIHZlcnNpb24gKTtcblxuXHR9XG5cblx0aWYgKCAhIGluZGV4ZWRHZW9tZXRyeSApIHtcblxuXHRcdGlmICggaW5kaWNlc1R5cGUgIT09IDAgKSB7XG5cblx0XHRcdHRocm93IG5ldyBFcnJvciggJ1BSV00gZGVjb2RlcjogSW5kaWNlcyB0eXBlIG11c3QgYmUgc2V0IHRvIDAgZm9yIG5vbi1pbmRleGVkIGdlb21ldHJpZXMnICk7XG5cblx0XHR9IGVsc2UgaWYgKCBpbmRpY2VzTnVtYmVyICE9PSAwICkge1xuXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoICdQUldNIGRlY29kZXI6IE51bWJlciBvZiBpbmRpY2VzIG11c3QgYmUgc2V0IHRvIDAgZm9yIG5vbi1pbmRleGVkIGdlb21ldHJpZXMnICk7XG5cblx0XHR9XG5cblx0fVxuXG5cdC8qKiBQQVJTSU5HICoqL1xuXG5cdGxldCBwb3MgPSA4O1xuXG5cdGNvbnN0IGF0dHJpYnV0ZXMgPSB7fTtcblxuXHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBhdHRyaWJ1dGVzTnVtYmVyOyBpICsrICkge1xuXG5cdFx0bGV0IGF0dHJpYnV0ZU5hbWUgPSAnJztcblxuXHRcdHdoaWxlICggcG9zIDwgYXJyYXkubGVuZ3RoICkge1xuXG5cdFx0XHRjb25zdCBjaGFyID0gYXJyYXlbIHBvcyBdO1xuXHRcdFx0cG9zICsrO1xuXG5cdFx0XHRpZiAoIGNoYXIgPT09IDAgKSB7XG5cblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0YXR0cmlidXRlTmFtZSArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKCBjaGFyICk7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdGZsYWdzID0gYXJyYXlbIHBvcyBdO1xuXG5cdFx0Y29uc3QgYXR0cmlidXRlVHlwZSA9IGZsYWdzID4+IDcgJiAweDAxO1xuXHRcdGNvbnN0IGNhcmRpbmFsaXR5ID0gKCBmbGFncyA+PiA0ICYgMHgwMyApICsgMTtcblx0XHRjb25zdCBlbmNvZGluZ1R5cGUgPSBmbGFncyAmIDB4MEY7XG5cdFx0Y29uc3QgYXJyYXlUeXBlID0gSW52ZXJ0ZWRFbmNvZGluZ1R5cGVzWyBlbmNvZGluZ1R5cGUgXTtcblxuXHRcdHBvcyArKztcblxuXHRcdC8vIHBhZGRpbmcgdG8gbmV4dCBtdWx0aXBsZSBvZiA0XG5cdFx0cG9zID0gTWF0aC5jZWlsKCBwb3MgLyA0ICkgKiA0O1xuXG5cdFx0Y29uc3QgdmFsdWVzID0gY29weUZyb21CdWZmZXIoIGJ1ZmZlciwgYXJyYXlUeXBlLCBwb3MsIGNhcmRpbmFsaXR5ICogdmFsdWVzTnVtYmVyLCBiaWdFbmRpYW4gKTtcblxuXHRcdHBvcyArPSBhcnJheVR5cGUuQllURVNfUEVSX0VMRU1FTlQgKiBjYXJkaW5hbGl0eSAqIHZhbHVlc051bWJlcjtcblxuXHRcdGF0dHJpYnV0ZXNbIGF0dHJpYnV0ZU5hbWUgXSA9IHtcblx0XHRcdHR5cGU6IGF0dHJpYnV0ZVR5cGUsXG5cdFx0XHRjYXJkaW5hbGl0eTogY2FyZGluYWxpdHksXG5cdFx0XHR2YWx1ZXM6IHZhbHVlc1xuXHRcdH07XG5cblx0fVxuXG5cdHBvcyA9IE1hdGguY2VpbCggcG9zIC8gNCApICogNDtcblxuXHRsZXQgaW5kaWNlcyA9IG51bGw7XG5cblx0aWYgKCBpbmRleGVkR2VvbWV0cnkgKSB7XG5cblx0XHRpbmRpY2VzID0gY29weUZyb21CdWZmZXIoXG5cdFx0XHRidWZmZXIsXG5cdFx0XHRpbmRpY2VzVHlwZSA9PT0gMSA/IFVpbnQzMkFycmF5IDogVWludDE2QXJyYXksXG5cdFx0XHRwb3MsXG5cdFx0XHRpbmRpY2VzTnVtYmVyLFxuXHRcdFx0YmlnRW5kaWFuXG5cdFx0KTtcblxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHR2ZXJzaW9uOiB2ZXJzaW9uLFxuXHRcdGF0dHJpYnV0ZXM6IGF0dHJpYnV0ZXMsXG5cdFx0aW5kaWNlczogaW5kaWNlc1xuXHR9O1xuXG59XG5cbi8vIERlZmluZSB0aGUgcHVibGljIGludGVyZmFjZVxuXG5jbGFzcyBQUldNTG9hZGVyIGV4dGVuZHMgTG9hZGVyIHtcblxuXHRjb25zdHJ1Y3RvciggbWFuYWdlciApIHtcblxuXHRcdHN1cGVyKCBtYW5hZ2VyICk7XG5cblx0fVxuXG5cdGxvYWQoIHVybCwgb25Mb2FkLCBvblByb2dyZXNzLCBvbkVycm9yICkge1xuXG5cdFx0Y29uc3Qgc2NvcGUgPSB0aGlzO1xuXG5cdFx0Y29uc3QgbG9hZGVyID0gbmV3IEZpbGVMb2FkZXIoIHNjb3BlLm1hbmFnZXIgKTtcblx0XHRsb2FkZXIuc2V0UGF0aCggc2NvcGUucGF0aCApO1xuXHRcdGxvYWRlci5zZXRSZXNwb25zZVR5cGUoICdhcnJheWJ1ZmZlcicgKTtcblx0XHRsb2FkZXIuc2V0UmVxdWVzdEhlYWRlciggc2NvcGUucmVxdWVzdEhlYWRlciApO1xuXHRcdGxvYWRlci5zZXRXaXRoQ3JlZGVudGlhbHMoIHNjb3BlLndpdGhDcmVkZW50aWFscyApO1xuXG5cdFx0dXJsID0gdXJsLnJlcGxhY2UoIC9cXCovZywgaXNCaWdFbmRpYW5QbGF0Zm9ybSgpID8gJ2JlJyA6ICdsZScgKTtcblxuXHRcdGxvYWRlci5sb2FkKCB1cmwsIGZ1bmN0aW9uICggYXJyYXlCdWZmZXIgKSB7XG5cblx0XHRcdHRyeSB7XG5cblx0XHRcdFx0b25Mb2FkKCBzY29wZS5wYXJzZSggYXJyYXlCdWZmZXIgKSApO1xuXG5cdFx0XHR9IGNhdGNoICggZSApIHtcblxuXHRcdFx0XHRpZiAoIG9uRXJyb3IgKSB7XG5cblx0XHRcdFx0XHRvbkVycm9yKCBlICk7XG5cblx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoIGUgKTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0c2NvcGUubWFuYWdlci5pdGVtRXJyb3IoIHVybCApO1xuXG5cdFx0XHR9XG5cblx0XHR9LCBvblByb2dyZXNzLCBvbkVycm9yICk7XG5cblx0fVxuXG5cdHBhcnNlKCBhcnJheUJ1ZmZlciApIHtcblxuXHRcdGNvbnN0IGRhdGEgPSBkZWNvZGVQcndtKCBhcnJheUJ1ZmZlciApLFxuXHRcdFx0YXR0cmlidXRlc0tleSA9IE9iamVjdC5rZXlzKCBkYXRhLmF0dHJpYnV0ZXMgKSxcblx0XHRcdGJ1ZmZlckdlb21ldHJ5ID0gbmV3IEJ1ZmZlckdlb21ldHJ5KCk7XG5cblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBhdHRyaWJ1dGVzS2V5Lmxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0Y29uc3QgYXR0cmlidXRlID0gZGF0YS5hdHRyaWJ1dGVzWyBhdHRyaWJ1dGVzS2V5WyBpIF0gXTtcblx0XHRcdGJ1ZmZlckdlb21ldHJ5LnNldEF0dHJpYnV0ZSggYXR0cmlidXRlc0tleVsgaSBdLCBuZXcgQnVmZmVyQXR0cmlidXRlKCBhdHRyaWJ1dGUudmFsdWVzLCBhdHRyaWJ1dGUuY2FyZGluYWxpdHksIGF0dHJpYnV0ZS5ub3JtYWxpemVkICkgKTtcblxuXHRcdH1cblxuXHRcdGlmICggZGF0YS5pbmRpY2VzICE9PSBudWxsICkge1xuXG5cdFx0XHRidWZmZXJHZW9tZXRyeS5zZXRJbmRleCggbmV3IEJ1ZmZlckF0dHJpYnV0ZSggZGF0YS5pbmRpY2VzLCAxICkgKTtcblxuXHRcdH1cblxuXHRcdHJldHVybiBidWZmZXJHZW9tZXRyeTtcblxuXHR9XG5cblx0c3RhdGljIGlzQmlnRW5kaWFuUGxhdGZvcm0oKSB7XG5cblx0XHRyZXR1cm4gaXNCaWdFbmRpYW5QbGF0Zm9ybSgpO1xuXG5cdH1cblxufVxuXG5leHBvcnQgeyBQUldNTG9hZGVyIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImxvYWQtcHJ3bVwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtsdGpzX2ZvdXJ0aFwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtsdGpzX2ZvdXJ0aFwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfYnVpbGRfdGhyZWVfbW9kdWxlX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fY29udHJvbHNfT3JiaXRDb250cm9sc19qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfbGlsLWd1aV9kaXN0X2xpbC1ndWlfZXNtX2pzXCIsXCJzYW1wbGVzX2NoYXB0ZXJzX2NoYXB0ZXItOF91dGlsX3N0YW5kYXJkLXNjZW5lX2pzXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTgvbG9hZC1wcndtLmpzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
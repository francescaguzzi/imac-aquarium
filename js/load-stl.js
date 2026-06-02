/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./samples/chapters/chapter-8/load-stl.js"
/*!************************************************!*\
  !*** ./samples/chapters/chapter-8/load-stl.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_standard_scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/standard-scene */ "./samples/chapters/chapter-8/util/standard-scene.js");
/* harmony import */ var three_examples_jsm_loaders_STLLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/loaders/STLLoader */ "./node_modules/three/examples/jsm/loaders/STLLoader.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");




const modelAsync = () => {
  return new three_examples_jsm_loaders_STLLoader__WEBPACK_IMPORTED_MODULE_1__.STLLoader().loadAsync('/assets/models/astronaut/astronaut.stl').then((model) => {
    const material = new three__WEBPACK_IMPORTED_MODULE_2__.MeshNormalMaterial()
    const mesh = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(model, material)
    mesh.castShadow = true
    mesh.scale.set(0.1, 0.1, 0.1)
    mesh.translateY(-1.5)
    mesh.translateZ(-1)
    mesh.translateX(-2)
    mesh.rotateX(-0.5 * Math.PI)

    return mesh
  })
}

;(0,_util_standard_scene__WEBPACK_IMPORTED_MODULE_0__.bootstrapMeshScene)({
  loadMesh: modelAsync
}).then()


/***/ },

/***/ "./node_modules/three/examples/jsm/loaders/STLLoader.js"
/*!**************************************************************!*\
  !*** ./node_modules/three/examples/jsm/loaders/STLLoader.js ***!
  \**************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   STLLoader: () => (/* binding */ STLLoader)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");


/**
 * Description: A THREE loader for STL ASCII files, as created by Solidworks and other CAD programs.
 *
 * Supports both binary and ASCII encoded files, with automatic detection of type.
 *
 * The loader returns a non-indexed buffer geometry.
 *
 * Limitations:
 *  Binary decoding supports "Magics" color format (http://en.wikipedia.org/wiki/STL_(file_format)#Color_in_binary_STL).
 *  There is perhaps some question as to how valid it is to always assume little-endian-ness.
 *  ASCII decoding assumes file is UTF-8.
 *
 * Usage:
 *  const loader = new STLLoader();
 *  loader.load( './models/stl/slotted_disk.stl', function ( geometry ) {
 *    scene.add( new THREE.Mesh( geometry ) );
 *  });
 *
 * For binary STLs geometry might contain colors for vertices. To use it:
 *  // use the same code to load STL as above
 *  if (geometry.hasColors) {
 *    material = new THREE.MeshPhongMaterial({ opacity: geometry.alpha, vertexColors: true });
 *  } else { .... }
 *  const mesh = new THREE.Mesh( geometry, material );
 *
 * For ASCII STLs containing multiple solids, each solid is assigned to a different group.
 * Groups can be used to assign a different color by defining an array of materials with the same length of
 * geometry.groups and passing it to the Mesh constructor:
 *
 * const mesh = new THREE.Mesh( geometry, material );
 *
 * For example:
 *
 *  const materials = [];
 *  const nGeometryGroups = geometry.groups.length;
 *
 *  const colorMap = ...; // Some logic to index colors.
 *
 *  for (let i = 0; i < nGeometryGroups; i++) {
 *
 *		const material = new THREE.MeshPhongMaterial({
 *			color: colorMap[i],
 *			wireframe: false
 *		});
 *
 *  }
 *
 *  materials.push(material);
 *  const mesh = new THREE.Mesh(geometry, materials);
 */


class STLLoader extends three__WEBPACK_IMPORTED_MODULE_0__.Loader {

	constructor( manager ) {

		super( manager );

	}

	load( url, onLoad, onProgress, onError ) {

		const scope = this;

		const loader = new three__WEBPACK_IMPORTED_MODULE_0__.FileLoader( this.manager );
		loader.setPath( this.path );
		loader.setResponseType( 'arraybuffer' );
		loader.setRequestHeader( this.requestHeader );
		loader.setWithCredentials( this.withCredentials );

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

		function isBinary( data ) {

			const reader = new DataView( data );
			const face_size = ( 32 / 8 * 3 ) + ( ( 32 / 8 * 3 ) * 3 ) + ( 16 / 8 );
			const n_faces = reader.getUint32( 80, true );
			const expect = 80 + ( 32 / 8 ) + ( n_faces * face_size );

			if ( expect === reader.byteLength ) {

				return true;

			}

			// An ASCII STL data must begin with 'solid ' as the first six bytes.
			// However, ASCII STLs lacking the SPACE after the 'd' are known to be
			// plentiful.  So, check the first 5 bytes for 'solid'.

			// Several encodings, such as UTF-8, precede the text with up to 5 bytes:
			// https://en.wikipedia.org/wiki/Byte_order_mark#Byte_order_marks_by_encoding
			// Search for "solid" to start anywhere after those prefixes.

			// US-ASCII ordinal values for 's', 'o', 'l', 'i', 'd'

			const solid = [ 115, 111, 108, 105, 100 ];

			for ( let off = 0; off < 5; off ++ ) {

				// If "solid" text is matched to the current offset, declare it to be an ASCII STL.

				if ( matchDataViewAt( solid, reader, off ) ) return false;

			}

			// Couldn't find "solid" text at the beginning; it is binary STL.

			return true;

		}

		function matchDataViewAt( query, reader, offset ) {

			// Check if each byte in query matches the corresponding byte from the current offset

			for ( let i = 0, il = query.length; i < il; i ++ ) {

				if ( query[ i ] !== reader.getUint8( offset + i ) ) return false;

			}

			return true;

		}

		function parseBinary( data ) {

			const reader = new DataView( data );
			const faces = reader.getUint32( 80, true );

			let r, g, b, hasColors = false, colors;
			let defaultR, defaultG, defaultB, alpha;

			// process STL header
			// check for default color in header ("COLOR=rgba" sequence).

			for ( let index = 0; index < 80 - 10; index ++ ) {

				if ( ( reader.getUint32( index, false ) == 0x434F4C4F /*COLO*/ ) &&
					( reader.getUint8( index + 4 ) == 0x52 /*'R'*/ ) &&
					( reader.getUint8( index + 5 ) == 0x3D /*'='*/ ) ) {

					hasColors = true;
					colors = new Float32Array( faces * 3 * 3 );

					defaultR = reader.getUint8( index + 6 ) / 255;
					defaultG = reader.getUint8( index + 7 ) / 255;
					defaultB = reader.getUint8( index + 8 ) / 255;
					alpha = reader.getUint8( index + 9 ) / 255;

				}

			}

			const dataOffset = 84;
			const faceLength = 12 * 4 + 2;

			const geometry = new three__WEBPACK_IMPORTED_MODULE_0__.BufferGeometry();

			const vertices = new Float32Array( faces * 3 * 3 );
			const normals = new Float32Array( faces * 3 * 3 );

			for ( let face = 0; face < faces; face ++ ) {

				const start = dataOffset + face * faceLength;
				const normalX = reader.getFloat32( start, true );
				const normalY = reader.getFloat32( start + 4, true );
				const normalZ = reader.getFloat32( start + 8, true );

				if ( hasColors ) {

					const packedColor = reader.getUint16( start + 48, true );

					if ( ( packedColor & 0x8000 ) === 0 ) {

						// facet has its own unique color

						r = ( packedColor & 0x1F ) / 31;
						g = ( ( packedColor >> 5 ) & 0x1F ) / 31;
						b = ( ( packedColor >> 10 ) & 0x1F ) / 31;

					} else {

						r = defaultR;
						g = defaultG;
						b = defaultB;

					}

				}

				for ( let i = 1; i <= 3; i ++ ) {

					const vertexstart = start + i * 12;
					const componentIdx = ( face * 3 * 3 ) + ( ( i - 1 ) * 3 );

					vertices[ componentIdx ] = reader.getFloat32( vertexstart, true );
					vertices[ componentIdx + 1 ] = reader.getFloat32( vertexstart + 4, true );
					vertices[ componentIdx + 2 ] = reader.getFloat32( vertexstart + 8, true );

					normals[ componentIdx ] = normalX;
					normals[ componentIdx + 1 ] = normalY;
					normals[ componentIdx + 2 ] = normalZ;

					if ( hasColors ) {

						colors[ componentIdx ] = r;
						colors[ componentIdx + 1 ] = g;
						colors[ componentIdx + 2 ] = b;

					}

				}

			}

			geometry.setAttribute( 'position', new three__WEBPACK_IMPORTED_MODULE_0__.BufferAttribute( vertices, 3 ) );
			geometry.setAttribute( 'normal', new three__WEBPACK_IMPORTED_MODULE_0__.BufferAttribute( normals, 3 ) );

			if ( hasColors ) {

				geometry.setAttribute( 'color', new three__WEBPACK_IMPORTED_MODULE_0__.BufferAttribute( colors, 3 ) );
				geometry.hasColors = true;
				geometry.alpha = alpha;

			}

			return geometry;

		}

		function parseASCII( data ) {

			const geometry = new three__WEBPACK_IMPORTED_MODULE_0__.BufferGeometry();
			const patternSolid = /solid([\s\S]*?)endsolid/g;
			const patternFace = /facet([\s\S]*?)endfacet/g;
			let faceCounter = 0;

			const patternFloat = /[\s]+([+-]?(?:\d*)(?:\.\d*)?(?:[eE][+-]?\d+)?)/.source;
			const patternVertex = new RegExp( 'vertex' + patternFloat + patternFloat + patternFloat, 'g' );
			const patternNormal = new RegExp( 'normal' + patternFloat + patternFloat + patternFloat, 'g' );

			const vertices = [];
			const normals = [];

			const normal = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();

			let result;

			let groupCount = 0;
			let startVertex = 0;
			let endVertex = 0;

			while ( ( result = patternSolid.exec( data ) ) !== null ) {

				startVertex = endVertex;

				const solid = result[ 0 ];

				while ( ( result = patternFace.exec( solid ) ) !== null ) {

					let vertexCountPerFace = 0;
					let normalCountPerFace = 0;

					const text = result[ 0 ];

					while ( ( result = patternNormal.exec( text ) ) !== null ) {

						normal.x = parseFloat( result[ 1 ] );
						normal.y = parseFloat( result[ 2 ] );
						normal.z = parseFloat( result[ 3 ] );
						normalCountPerFace ++;

					}

					while ( ( result = patternVertex.exec( text ) ) !== null ) {

						vertices.push( parseFloat( result[ 1 ] ), parseFloat( result[ 2 ] ), parseFloat( result[ 3 ] ) );
						normals.push( normal.x, normal.y, normal.z );
						vertexCountPerFace ++;
						endVertex ++;

					}

					// every face have to own ONE valid normal

					if ( normalCountPerFace !== 1 ) {

						console.error( 'THREE.STLLoader: Something isn\'t right with the normal of face number ' + faceCounter );

					}

					// each face have to own THREE valid vertices

					if ( vertexCountPerFace !== 3 ) {

						console.error( 'THREE.STLLoader: Something isn\'t right with the vertices of face number ' + faceCounter );

					}

					faceCounter ++;

				}

				const start = startVertex;
				const count = endVertex - startVertex;

				geometry.addGroup( start, count, groupCount );
				groupCount ++;

			}

			geometry.setAttribute( 'position', new three__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute( vertices, 3 ) );
			geometry.setAttribute( 'normal', new three__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute( normals, 3 ) );

			return geometry;

		}

		function ensureString( buffer ) {

			if ( typeof buffer !== 'string' ) {

				return three__WEBPACK_IMPORTED_MODULE_0__.LoaderUtils.decodeText( new Uint8Array( buffer ) );

			}

			return buffer;

		}

		function ensureBinary( buffer ) {

			if ( typeof buffer === 'string' ) {

				const array_buffer = new Uint8Array( buffer.length );
				for ( let i = 0; i < buffer.length; i ++ ) {

					array_buffer[ i ] = buffer.charCodeAt( i ) & 0xff; // implicitly assumes little-endian

				}

				return array_buffer.buffer || array_buffer;

			} else {

				return buffer;

			}

		}

		// start

		const binData = ensureBinary( data );

		return isBinary( binData ) ? parseBinary( binData ) : parseASCII( ensureString( data ) );

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
/******/ 			"load-stl": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","samples_chapters_chapter-8_util_standard-scene_js"], () => (__webpack_require__("./samples/chapters/chapter-8/load-stl.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvbG9hZC1zdGwuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBMEQ7QUFDTTtBQUNsQzs7QUFFOUI7QUFDQSxhQUFhLDJFQUFTO0FBQ3RCLHlCQUF5QixxREFBd0I7QUFDakQscUJBQXFCLHVDQUFVO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFQSx5RUFBa0I7QUFDbEI7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDYmM7O0FBRWY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsNkNBQTZDO0FBQzVGLE1BQU0sT0FBTztBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0Esb0JBQW9CLHFCQUFxQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLHdCQUF3Qix5Q0FBTTs7QUFFOUI7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEscUJBQXFCLDZDQUFVO0FBQy9CO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLEtBQUs7O0FBRUw7O0FBRUE7O0FBRUEsTUFBTTs7QUFFTjs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsc0JBQXNCLFNBQVM7O0FBRS9COztBQUVBOztBQUVBOztBQUVBLG1EQUFtRDs7QUFFbkQ7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsdUNBQXVDLFFBQVE7O0FBRS9DOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHdCQUF3QixpQkFBaUI7O0FBRXpDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsd0JBQXdCLGlEQUFjOztBQUV0QztBQUNBOztBQUVBLHVCQUF1QixjQUFjOztBQUVyQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEscUJBQXFCLFFBQVE7O0FBRTdCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsMENBQTBDLGtEQUFlO0FBQ3pELHdDQUF3QyxrREFBZTs7QUFFdkQ7O0FBRUEsd0NBQXdDLGtEQUFlO0FBQ3ZEO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsd0JBQXdCLGlEQUFjO0FBQ3RDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxzQkFBc0IsMENBQU87O0FBRTdCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSwwQ0FBMEMseURBQXNCO0FBQ2hFLHdDQUF3Qyx5REFBc0I7O0FBRTlEOztBQUVBOztBQUVBOztBQUVBOztBQUVBLFdBQVcsOENBQVc7O0FBRXRCOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0EscUJBQXFCLG1CQUFtQjs7QUFFeEMsd0RBQXdEOztBQUV4RDs7QUFFQTs7QUFFQSxLQUFLOztBQUVMOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVxQjs7Ozs7OztVQzlZckI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQy9CQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLCtCQUErQix3Q0FBd0M7V0FDdkU7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQkFBaUIscUJBQXFCO1dBQ3RDO1dBQ0E7V0FDQSxrQkFBa0IscUJBQXFCO1dBQ3ZDO1dBQ0E7V0FDQSxLQUFLO1dBQ0w7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEU7Ozs7O1dDM0JBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QsRTs7Ozs7V0NOQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0EsNEc7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci04L2xvYWQtc3RsLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vbm9kZV9tb2R1bGVzL3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL1NUTExvYWRlci5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGJvb3RzdHJhcE1lc2hTY2VuZSB9IGZyb20gJy4vdXRpbC9zdGFuZGFyZC1zY2VuZSdcbmltcG9ydCB7IFNUTExvYWRlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL1NUTExvYWRlcidcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuXG5jb25zdCBtb2RlbEFzeW5jID0gKCkgPT4ge1xuICByZXR1cm4gbmV3IFNUTExvYWRlcigpLmxvYWRBc3luYygnL2Fzc2V0cy9tb2RlbHMvYXN0cm9uYXV0L2FzdHJvbmF1dC5zdGwnKS50aGVuKChtb2RlbCkgPT4ge1xuICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hOb3JtYWxNYXRlcmlhbCgpXG4gICAgY29uc3QgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKG1vZGVsLCBtYXRlcmlhbClcbiAgICBtZXNoLmNhc3RTaGFkb3cgPSB0cnVlXG4gICAgbWVzaC5zY2FsZS5zZXQoMC4xLCAwLjEsIDAuMSlcbiAgICBtZXNoLnRyYW5zbGF0ZVkoLTEuNSlcbiAgICBtZXNoLnRyYW5zbGF0ZVooLTEpXG4gICAgbWVzaC50cmFuc2xhdGVYKC0yKVxuICAgIG1lc2gucm90YXRlWCgtMC41ICogTWF0aC5QSSlcblxuICAgIHJldHVybiBtZXNoXG4gIH0pXG59XG5cbmJvb3RzdHJhcE1lc2hTY2VuZSh7XG4gIGxvYWRNZXNoOiBtb2RlbEFzeW5jXG59KS50aGVuKClcbiIsImltcG9ydCB7XG5cdEJ1ZmZlckF0dHJpYnV0ZSxcblx0QnVmZmVyR2VvbWV0cnksXG5cdEZpbGVMb2FkZXIsXG5cdEZsb2F0MzJCdWZmZXJBdHRyaWJ1dGUsXG5cdExvYWRlcixcblx0TG9hZGVyVXRpbHMsXG5cdFZlY3RvcjNcbn0gZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIERlc2NyaXB0aW9uOiBBIFRIUkVFIGxvYWRlciBmb3IgU1RMIEFTQ0lJIGZpbGVzLCBhcyBjcmVhdGVkIGJ5IFNvbGlkd29ya3MgYW5kIG90aGVyIENBRCBwcm9ncmFtcy5cbiAqXG4gKiBTdXBwb3J0cyBib3RoIGJpbmFyeSBhbmQgQVNDSUkgZW5jb2RlZCBmaWxlcywgd2l0aCBhdXRvbWF0aWMgZGV0ZWN0aW9uIG9mIHR5cGUuXG4gKlxuICogVGhlIGxvYWRlciByZXR1cm5zIGEgbm9uLWluZGV4ZWQgYnVmZmVyIGdlb21ldHJ5LlxuICpcbiAqIExpbWl0YXRpb25zOlxuICogIEJpbmFyeSBkZWNvZGluZyBzdXBwb3J0cyBcIk1hZ2ljc1wiIGNvbG9yIGZvcm1hdCAoaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9TVExfKGZpbGVfZm9ybWF0KSNDb2xvcl9pbl9iaW5hcnlfU1RMKS5cbiAqICBUaGVyZSBpcyBwZXJoYXBzIHNvbWUgcXVlc3Rpb24gYXMgdG8gaG93IHZhbGlkIGl0IGlzIHRvIGFsd2F5cyBhc3N1bWUgbGl0dGxlLWVuZGlhbi1uZXNzLlxuICogIEFTQ0lJIGRlY29kaW5nIGFzc3VtZXMgZmlsZSBpcyBVVEYtOC5cbiAqXG4gKiBVc2FnZTpcbiAqICBjb25zdCBsb2FkZXIgPSBuZXcgU1RMTG9hZGVyKCk7XG4gKiAgbG9hZGVyLmxvYWQoICcuL21vZGVscy9zdGwvc2xvdHRlZF9kaXNrLnN0bCcsIGZ1bmN0aW9uICggZ2VvbWV0cnkgKSB7XG4gKiAgICBzY2VuZS5hZGQoIG5ldyBUSFJFRS5NZXNoKCBnZW9tZXRyeSApICk7XG4gKiAgfSk7XG4gKlxuICogRm9yIGJpbmFyeSBTVExzIGdlb21ldHJ5IG1pZ2h0IGNvbnRhaW4gY29sb3JzIGZvciB2ZXJ0aWNlcy4gVG8gdXNlIGl0OlxuICogIC8vIHVzZSB0aGUgc2FtZSBjb2RlIHRvIGxvYWQgU1RMIGFzIGFib3ZlXG4gKiAgaWYgKGdlb21ldHJ5Lmhhc0NvbG9ycykge1xuICogICAgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwoeyBvcGFjaXR5OiBnZW9tZXRyeS5hbHBoYSwgdmVydGV4Q29sb3JzOiB0cnVlIH0pO1xuICogIH0gZWxzZSB7IC4uLi4gfVxuICogIGNvbnN0IG1lc2ggPSBuZXcgVEhSRUUuTWVzaCggZ2VvbWV0cnksIG1hdGVyaWFsICk7XG4gKlxuICogRm9yIEFTQ0lJIFNUTHMgY29udGFpbmluZyBtdWx0aXBsZSBzb2xpZHMsIGVhY2ggc29saWQgaXMgYXNzaWduZWQgdG8gYSBkaWZmZXJlbnQgZ3JvdXAuXG4gKiBHcm91cHMgY2FuIGJlIHVzZWQgdG8gYXNzaWduIGEgZGlmZmVyZW50IGNvbG9yIGJ5IGRlZmluaW5nIGFuIGFycmF5IG9mIG1hdGVyaWFscyB3aXRoIHRoZSBzYW1lIGxlbmd0aCBvZlxuICogZ2VvbWV0cnkuZ3JvdXBzIGFuZCBwYXNzaW5nIGl0IHRvIHRoZSBNZXNoIGNvbnN0cnVjdG9yOlxuICpcbiAqIGNvbnN0IG1lc2ggPSBuZXcgVEhSRUUuTWVzaCggZ2VvbWV0cnksIG1hdGVyaWFsICk7XG4gKlxuICogRm9yIGV4YW1wbGU6XG4gKlxuICogIGNvbnN0IG1hdGVyaWFscyA9IFtdO1xuICogIGNvbnN0IG5HZW9tZXRyeUdyb3VwcyA9IGdlb21ldHJ5Lmdyb3Vwcy5sZW5ndGg7XG4gKlxuICogIGNvbnN0IGNvbG9yTWFwID0gLi4uOyAvLyBTb21lIGxvZ2ljIHRvIGluZGV4IGNvbG9ycy5cbiAqXG4gKiAgZm9yIChsZXQgaSA9IDA7IGkgPCBuR2VvbWV0cnlHcm91cHM7IGkrKykge1xuICpcbiAqXHRcdGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKHtcbiAqXHRcdFx0Y29sb3I6IGNvbG9yTWFwW2ldLFxuICpcdFx0XHR3aXJlZnJhbWU6IGZhbHNlXG4gKlx0XHR9KTtcbiAqXG4gKiAgfVxuICpcbiAqICBtYXRlcmlhbHMucHVzaChtYXRlcmlhbCk7XG4gKiAgY29uc3QgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbHMpO1xuICovXG5cblxuY2xhc3MgU1RMTG9hZGVyIGV4dGVuZHMgTG9hZGVyIHtcblxuXHRjb25zdHJ1Y3RvciggbWFuYWdlciApIHtcblxuXHRcdHN1cGVyKCBtYW5hZ2VyICk7XG5cblx0fVxuXG5cdGxvYWQoIHVybCwgb25Mb2FkLCBvblByb2dyZXNzLCBvbkVycm9yICkge1xuXG5cdFx0Y29uc3Qgc2NvcGUgPSB0aGlzO1xuXG5cdFx0Y29uc3QgbG9hZGVyID0gbmV3IEZpbGVMb2FkZXIoIHRoaXMubWFuYWdlciApO1xuXHRcdGxvYWRlci5zZXRQYXRoKCB0aGlzLnBhdGggKTtcblx0XHRsb2FkZXIuc2V0UmVzcG9uc2VUeXBlKCAnYXJyYXlidWZmZXInICk7XG5cdFx0bG9hZGVyLnNldFJlcXVlc3RIZWFkZXIoIHRoaXMucmVxdWVzdEhlYWRlciApO1xuXHRcdGxvYWRlci5zZXRXaXRoQ3JlZGVudGlhbHMoIHRoaXMud2l0aENyZWRlbnRpYWxzICk7XG5cblx0XHRsb2FkZXIubG9hZCggdXJsLCBmdW5jdGlvbiAoIHRleHQgKSB7XG5cblx0XHRcdHRyeSB7XG5cblx0XHRcdFx0b25Mb2FkKCBzY29wZS5wYXJzZSggdGV4dCApICk7XG5cblx0XHRcdH0gY2F0Y2ggKCBlICkge1xuXG5cdFx0XHRcdGlmICggb25FcnJvciApIHtcblxuXHRcdFx0XHRcdG9uRXJyb3IoIGUgKTtcblxuXHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvciggZSApO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRzY29wZS5tYW5hZ2VyLml0ZW1FcnJvciggdXJsICk7XG5cblx0XHRcdH1cblxuXHRcdH0sIG9uUHJvZ3Jlc3MsIG9uRXJyb3IgKTtcblxuXHR9XG5cblx0cGFyc2UoIGRhdGEgKSB7XG5cblx0XHRmdW5jdGlvbiBpc0JpbmFyeSggZGF0YSApIHtcblxuXHRcdFx0Y29uc3QgcmVhZGVyID0gbmV3IERhdGFWaWV3KCBkYXRhICk7XG5cdFx0XHRjb25zdCBmYWNlX3NpemUgPSAoIDMyIC8gOCAqIDMgKSArICggKCAzMiAvIDggKiAzICkgKiAzICkgKyAoIDE2IC8gOCApO1xuXHRcdFx0Y29uc3Qgbl9mYWNlcyA9IHJlYWRlci5nZXRVaW50MzIoIDgwLCB0cnVlICk7XG5cdFx0XHRjb25zdCBleHBlY3QgPSA4MCArICggMzIgLyA4ICkgKyAoIG5fZmFjZXMgKiBmYWNlX3NpemUgKTtcblxuXHRcdFx0aWYgKCBleHBlY3QgPT09IHJlYWRlci5ieXRlTGVuZ3RoICkge1xuXG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXG5cdFx0XHR9XG5cblx0XHRcdC8vIEFuIEFTQ0lJIFNUTCBkYXRhIG11c3QgYmVnaW4gd2l0aCAnc29saWQgJyBhcyB0aGUgZmlyc3Qgc2l4IGJ5dGVzLlxuXHRcdFx0Ly8gSG93ZXZlciwgQVNDSUkgU1RMcyBsYWNraW5nIHRoZSBTUEFDRSBhZnRlciB0aGUgJ2QnIGFyZSBrbm93biB0byBiZVxuXHRcdFx0Ly8gcGxlbnRpZnVsLiAgU28sIGNoZWNrIHRoZSBmaXJzdCA1IGJ5dGVzIGZvciAnc29saWQnLlxuXG5cdFx0XHQvLyBTZXZlcmFsIGVuY29kaW5ncywgc3VjaCBhcyBVVEYtOCwgcHJlY2VkZSB0aGUgdGV4dCB3aXRoIHVwIHRvIDUgYnl0ZXM6XG5cdFx0XHQvLyBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9CeXRlX29yZGVyX21hcmsjQnl0ZV9vcmRlcl9tYXJrc19ieV9lbmNvZGluZ1xuXHRcdFx0Ly8gU2VhcmNoIGZvciBcInNvbGlkXCIgdG8gc3RhcnQgYW55d2hlcmUgYWZ0ZXIgdGhvc2UgcHJlZml4ZXMuXG5cblx0XHRcdC8vIFVTLUFTQ0lJIG9yZGluYWwgdmFsdWVzIGZvciAncycsICdvJywgJ2wnLCAnaScsICdkJ1xuXG5cdFx0XHRjb25zdCBzb2xpZCA9IFsgMTE1LCAxMTEsIDEwOCwgMTA1LCAxMDAgXTtcblxuXHRcdFx0Zm9yICggbGV0IG9mZiA9IDA7IG9mZiA8IDU7IG9mZiArKyApIHtcblxuXHRcdFx0XHQvLyBJZiBcInNvbGlkXCIgdGV4dCBpcyBtYXRjaGVkIHRvIHRoZSBjdXJyZW50IG9mZnNldCwgZGVjbGFyZSBpdCB0byBiZSBhbiBBU0NJSSBTVEwuXG5cblx0XHRcdFx0aWYgKCBtYXRjaERhdGFWaWV3QXQoIHNvbGlkLCByZWFkZXIsIG9mZiApICkgcmV0dXJuIGZhbHNlO1xuXG5cdFx0XHR9XG5cblx0XHRcdC8vIENvdWxkbid0IGZpbmQgXCJzb2xpZFwiIHRleHQgYXQgdGhlIGJlZ2lubmluZzsgaXQgaXMgYmluYXJ5IFNUTC5cblxuXHRcdFx0cmV0dXJuIHRydWU7XG5cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBtYXRjaERhdGFWaWV3QXQoIHF1ZXJ5LCByZWFkZXIsIG9mZnNldCApIHtcblxuXHRcdFx0Ly8gQ2hlY2sgaWYgZWFjaCBieXRlIGluIHF1ZXJ5IG1hdGNoZXMgdGhlIGNvcnJlc3BvbmRpbmcgYnl0ZSBmcm9tIHRoZSBjdXJyZW50IG9mZnNldFxuXG5cdFx0XHRmb3IgKCBsZXQgaSA9IDAsIGlsID0gcXVlcnkubGVuZ3RoOyBpIDwgaWw7IGkgKysgKSB7XG5cblx0XHRcdFx0aWYgKCBxdWVyeVsgaSBdICE9PSByZWFkZXIuZ2V0VWludDgoIG9mZnNldCArIGkgKSApIHJldHVybiBmYWxzZTtcblxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHBhcnNlQmluYXJ5KCBkYXRhICkge1xuXG5cdFx0XHRjb25zdCByZWFkZXIgPSBuZXcgRGF0YVZpZXcoIGRhdGEgKTtcblx0XHRcdGNvbnN0IGZhY2VzID0gcmVhZGVyLmdldFVpbnQzMiggODAsIHRydWUgKTtcblxuXHRcdFx0bGV0IHIsIGcsIGIsIGhhc0NvbG9ycyA9IGZhbHNlLCBjb2xvcnM7XG5cdFx0XHRsZXQgZGVmYXVsdFIsIGRlZmF1bHRHLCBkZWZhdWx0QiwgYWxwaGE7XG5cblx0XHRcdC8vIHByb2Nlc3MgU1RMIGhlYWRlclxuXHRcdFx0Ly8gY2hlY2sgZm9yIGRlZmF1bHQgY29sb3IgaW4gaGVhZGVyIChcIkNPTE9SPXJnYmFcIiBzZXF1ZW5jZSkuXG5cblx0XHRcdGZvciAoIGxldCBpbmRleCA9IDA7IGluZGV4IDwgODAgLSAxMDsgaW5kZXggKysgKSB7XG5cblx0XHRcdFx0aWYgKCAoIHJlYWRlci5nZXRVaW50MzIoIGluZGV4LCBmYWxzZSApID09IDB4NDM0RjRDNEYgLypDT0xPKi8gKSAmJlxuXHRcdFx0XHRcdCggcmVhZGVyLmdldFVpbnQ4KCBpbmRleCArIDQgKSA9PSAweDUyIC8qJ1InKi8gKSAmJlxuXHRcdFx0XHRcdCggcmVhZGVyLmdldFVpbnQ4KCBpbmRleCArIDUgKSA9PSAweDNEIC8qJz0nKi8gKSApIHtcblxuXHRcdFx0XHRcdGhhc0NvbG9ycyA9IHRydWU7XG5cdFx0XHRcdFx0Y29sb3JzID0gbmV3IEZsb2F0MzJBcnJheSggZmFjZXMgKiAzICogMyApO1xuXG5cdFx0XHRcdFx0ZGVmYXVsdFIgPSByZWFkZXIuZ2V0VWludDgoIGluZGV4ICsgNiApIC8gMjU1O1xuXHRcdFx0XHRcdGRlZmF1bHRHID0gcmVhZGVyLmdldFVpbnQ4KCBpbmRleCArIDcgKSAvIDI1NTtcblx0XHRcdFx0XHRkZWZhdWx0QiA9IHJlYWRlci5nZXRVaW50OCggaW5kZXggKyA4ICkgLyAyNTU7XG5cdFx0XHRcdFx0YWxwaGEgPSByZWFkZXIuZ2V0VWludDgoIGluZGV4ICsgOSApIC8gMjU1O1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBkYXRhT2Zmc2V0ID0gODQ7XG5cdFx0XHRjb25zdCBmYWNlTGVuZ3RoID0gMTIgKiA0ICsgMjtcblxuXHRcdFx0Y29uc3QgZ2VvbWV0cnkgPSBuZXcgQnVmZmVyR2VvbWV0cnkoKTtcblxuXHRcdFx0Y29uc3QgdmVydGljZXMgPSBuZXcgRmxvYXQzMkFycmF5KCBmYWNlcyAqIDMgKiAzICk7XG5cdFx0XHRjb25zdCBub3JtYWxzID0gbmV3IEZsb2F0MzJBcnJheSggZmFjZXMgKiAzICogMyApO1xuXG5cdFx0XHRmb3IgKCBsZXQgZmFjZSA9IDA7IGZhY2UgPCBmYWNlczsgZmFjZSArKyApIHtcblxuXHRcdFx0XHRjb25zdCBzdGFydCA9IGRhdGFPZmZzZXQgKyBmYWNlICogZmFjZUxlbmd0aDtcblx0XHRcdFx0Y29uc3Qgbm9ybWFsWCA9IHJlYWRlci5nZXRGbG9hdDMyKCBzdGFydCwgdHJ1ZSApO1xuXHRcdFx0XHRjb25zdCBub3JtYWxZID0gcmVhZGVyLmdldEZsb2F0MzIoIHN0YXJ0ICsgNCwgdHJ1ZSApO1xuXHRcdFx0XHRjb25zdCBub3JtYWxaID0gcmVhZGVyLmdldEZsb2F0MzIoIHN0YXJ0ICsgOCwgdHJ1ZSApO1xuXG5cdFx0XHRcdGlmICggaGFzQ29sb3JzICkge1xuXG5cdFx0XHRcdFx0Y29uc3QgcGFja2VkQ29sb3IgPSByZWFkZXIuZ2V0VWludDE2KCBzdGFydCArIDQ4LCB0cnVlICk7XG5cblx0XHRcdFx0XHRpZiAoICggcGFja2VkQ29sb3IgJiAweDgwMDAgKSA9PT0gMCApIHtcblxuXHRcdFx0XHRcdFx0Ly8gZmFjZXQgaGFzIGl0cyBvd24gdW5pcXVlIGNvbG9yXG5cblx0XHRcdFx0XHRcdHIgPSAoIHBhY2tlZENvbG9yICYgMHgxRiApIC8gMzE7XG5cdFx0XHRcdFx0XHRnID0gKCAoIHBhY2tlZENvbG9yID4+IDUgKSAmIDB4MUYgKSAvIDMxO1xuXHRcdFx0XHRcdFx0YiA9ICggKCBwYWNrZWRDb2xvciA+PiAxMCApICYgMHgxRiApIC8gMzE7XG5cblx0XHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0XHRyID0gZGVmYXVsdFI7XG5cdFx0XHRcdFx0XHRnID0gZGVmYXVsdEc7XG5cdFx0XHRcdFx0XHRiID0gZGVmYXVsdEI7XG5cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGZvciAoIGxldCBpID0gMTsgaSA8PSAzOyBpICsrICkge1xuXG5cdFx0XHRcdFx0Y29uc3QgdmVydGV4c3RhcnQgPSBzdGFydCArIGkgKiAxMjtcblx0XHRcdFx0XHRjb25zdCBjb21wb25lbnRJZHggPSAoIGZhY2UgKiAzICogMyApICsgKCAoIGkgLSAxICkgKiAzICk7XG5cblx0XHRcdFx0XHR2ZXJ0aWNlc1sgY29tcG9uZW50SWR4IF0gPSByZWFkZXIuZ2V0RmxvYXQzMiggdmVydGV4c3RhcnQsIHRydWUgKTtcblx0XHRcdFx0XHR2ZXJ0aWNlc1sgY29tcG9uZW50SWR4ICsgMSBdID0gcmVhZGVyLmdldEZsb2F0MzIoIHZlcnRleHN0YXJ0ICsgNCwgdHJ1ZSApO1xuXHRcdFx0XHRcdHZlcnRpY2VzWyBjb21wb25lbnRJZHggKyAyIF0gPSByZWFkZXIuZ2V0RmxvYXQzMiggdmVydGV4c3RhcnQgKyA4LCB0cnVlICk7XG5cblx0XHRcdFx0XHRub3JtYWxzWyBjb21wb25lbnRJZHggXSA9IG5vcm1hbFg7XG5cdFx0XHRcdFx0bm9ybWFsc1sgY29tcG9uZW50SWR4ICsgMSBdID0gbm9ybWFsWTtcblx0XHRcdFx0XHRub3JtYWxzWyBjb21wb25lbnRJZHggKyAyIF0gPSBub3JtYWxaO1xuXG5cdFx0XHRcdFx0aWYgKCBoYXNDb2xvcnMgKSB7XG5cblx0XHRcdFx0XHRcdGNvbG9yc1sgY29tcG9uZW50SWR4IF0gPSByO1xuXHRcdFx0XHRcdFx0Y29sb3JzWyBjb21wb25lbnRJZHggKyAxIF0gPSBnO1xuXHRcdFx0XHRcdFx0Y29sb3JzWyBjb21wb25lbnRJZHggKyAyIF0gPSBiO1xuXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cdFx0XHRnZW9tZXRyeS5zZXRBdHRyaWJ1dGUoICdwb3NpdGlvbicsIG5ldyBCdWZmZXJBdHRyaWJ1dGUoIHZlcnRpY2VzLCAzICkgKTtcblx0XHRcdGdlb21ldHJ5LnNldEF0dHJpYnV0ZSggJ25vcm1hbCcsIG5ldyBCdWZmZXJBdHRyaWJ1dGUoIG5vcm1hbHMsIDMgKSApO1xuXG5cdFx0XHRpZiAoIGhhc0NvbG9ycyApIHtcblxuXHRcdFx0XHRnZW9tZXRyeS5zZXRBdHRyaWJ1dGUoICdjb2xvcicsIG5ldyBCdWZmZXJBdHRyaWJ1dGUoIGNvbG9ycywgMyApICk7XG5cdFx0XHRcdGdlb21ldHJ5Lmhhc0NvbG9ycyA9IHRydWU7XG5cdFx0XHRcdGdlb21ldHJ5LmFscGhhID0gYWxwaGE7XG5cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGdlb21ldHJ5O1xuXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gcGFyc2VBU0NJSSggZGF0YSApIHtcblxuXHRcdFx0Y29uc3QgZ2VvbWV0cnkgPSBuZXcgQnVmZmVyR2VvbWV0cnkoKTtcblx0XHRcdGNvbnN0IHBhdHRlcm5Tb2xpZCA9IC9zb2xpZChbXFxzXFxTXSo/KWVuZHNvbGlkL2c7XG5cdFx0XHRjb25zdCBwYXR0ZXJuRmFjZSA9IC9mYWNldChbXFxzXFxTXSo/KWVuZGZhY2V0L2c7XG5cdFx0XHRsZXQgZmFjZUNvdW50ZXIgPSAwO1xuXG5cdFx0XHRjb25zdCBwYXR0ZXJuRmxvYXQgPSAvW1xcc10rKFsrLV0/KD86XFxkKikoPzpcXC5cXGQqKT8oPzpbZUVdWystXT9cXGQrKT8pLy5zb3VyY2U7XG5cdFx0XHRjb25zdCBwYXR0ZXJuVmVydGV4ID0gbmV3IFJlZ0V4cCggJ3ZlcnRleCcgKyBwYXR0ZXJuRmxvYXQgKyBwYXR0ZXJuRmxvYXQgKyBwYXR0ZXJuRmxvYXQsICdnJyApO1xuXHRcdFx0Y29uc3QgcGF0dGVybk5vcm1hbCA9IG5ldyBSZWdFeHAoICdub3JtYWwnICsgcGF0dGVybkZsb2F0ICsgcGF0dGVybkZsb2F0ICsgcGF0dGVybkZsb2F0LCAnZycgKTtcblxuXHRcdFx0Y29uc3QgdmVydGljZXMgPSBbXTtcblx0XHRcdGNvbnN0IG5vcm1hbHMgPSBbXTtcblxuXHRcdFx0Y29uc3Qgbm9ybWFsID0gbmV3IFZlY3RvcjMoKTtcblxuXHRcdFx0bGV0IHJlc3VsdDtcblxuXHRcdFx0bGV0IGdyb3VwQ291bnQgPSAwO1xuXHRcdFx0bGV0IHN0YXJ0VmVydGV4ID0gMDtcblx0XHRcdGxldCBlbmRWZXJ0ZXggPSAwO1xuXG5cdFx0XHR3aGlsZSAoICggcmVzdWx0ID0gcGF0dGVyblNvbGlkLmV4ZWMoIGRhdGEgKSApICE9PSBudWxsICkge1xuXG5cdFx0XHRcdHN0YXJ0VmVydGV4ID0gZW5kVmVydGV4O1xuXG5cdFx0XHRcdGNvbnN0IHNvbGlkID0gcmVzdWx0WyAwIF07XG5cblx0XHRcdFx0d2hpbGUgKCAoIHJlc3VsdCA9IHBhdHRlcm5GYWNlLmV4ZWMoIHNvbGlkICkgKSAhPT0gbnVsbCApIHtcblxuXHRcdFx0XHRcdGxldCB2ZXJ0ZXhDb3VudFBlckZhY2UgPSAwO1xuXHRcdFx0XHRcdGxldCBub3JtYWxDb3VudFBlckZhY2UgPSAwO1xuXG5cdFx0XHRcdFx0Y29uc3QgdGV4dCA9IHJlc3VsdFsgMCBdO1xuXG5cdFx0XHRcdFx0d2hpbGUgKCAoIHJlc3VsdCA9IHBhdHRlcm5Ob3JtYWwuZXhlYyggdGV4dCApICkgIT09IG51bGwgKSB7XG5cblx0XHRcdFx0XHRcdG5vcm1hbC54ID0gcGFyc2VGbG9hdCggcmVzdWx0WyAxIF0gKTtcblx0XHRcdFx0XHRcdG5vcm1hbC55ID0gcGFyc2VGbG9hdCggcmVzdWx0WyAyIF0gKTtcblx0XHRcdFx0XHRcdG5vcm1hbC56ID0gcGFyc2VGbG9hdCggcmVzdWx0WyAzIF0gKTtcblx0XHRcdFx0XHRcdG5vcm1hbENvdW50UGVyRmFjZSArKztcblxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHdoaWxlICggKCByZXN1bHQgPSBwYXR0ZXJuVmVydGV4LmV4ZWMoIHRleHQgKSApICE9PSBudWxsICkge1xuXG5cdFx0XHRcdFx0XHR2ZXJ0aWNlcy5wdXNoKCBwYXJzZUZsb2F0KCByZXN1bHRbIDEgXSApLCBwYXJzZUZsb2F0KCByZXN1bHRbIDIgXSApLCBwYXJzZUZsb2F0KCByZXN1bHRbIDMgXSApICk7XG5cdFx0XHRcdFx0XHRub3JtYWxzLnB1c2goIG5vcm1hbC54LCBub3JtYWwueSwgbm9ybWFsLnogKTtcblx0XHRcdFx0XHRcdHZlcnRleENvdW50UGVyRmFjZSArKztcblx0XHRcdFx0XHRcdGVuZFZlcnRleCArKztcblxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIGV2ZXJ5IGZhY2UgaGF2ZSB0byBvd24gT05FIHZhbGlkIG5vcm1hbFxuXG5cdFx0XHRcdFx0aWYgKCBub3JtYWxDb3VudFBlckZhY2UgIT09IDEgKSB7XG5cblx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoICdUSFJFRS5TVExMb2FkZXI6IFNvbWV0aGluZyBpc25cXCd0IHJpZ2h0IHdpdGggdGhlIG5vcm1hbCBvZiBmYWNlIG51bWJlciAnICsgZmFjZUNvdW50ZXIgKTtcblxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIGVhY2ggZmFjZSBoYXZlIHRvIG93biBUSFJFRSB2YWxpZCB2ZXJ0aWNlc1xuXG5cdFx0XHRcdFx0aWYgKCB2ZXJ0ZXhDb3VudFBlckZhY2UgIT09IDMgKSB7XG5cblx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoICdUSFJFRS5TVExMb2FkZXI6IFNvbWV0aGluZyBpc25cXCd0IHJpZ2h0IHdpdGggdGhlIHZlcnRpY2VzIG9mIGZhY2UgbnVtYmVyICcgKyBmYWNlQ291bnRlciApO1xuXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0ZmFjZUNvdW50ZXIgKys7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnN0IHN0YXJ0ID0gc3RhcnRWZXJ0ZXg7XG5cdFx0XHRcdGNvbnN0IGNvdW50ID0gZW5kVmVydGV4IC0gc3RhcnRWZXJ0ZXg7XG5cblx0XHRcdFx0Z2VvbWV0cnkuYWRkR3JvdXAoIHN0YXJ0LCBjb3VudCwgZ3JvdXBDb3VudCApO1xuXHRcdFx0XHRncm91cENvdW50ICsrO1xuXG5cdFx0XHR9XG5cblx0XHRcdGdlb21ldHJ5LnNldEF0dHJpYnV0ZSggJ3Bvc2l0aW9uJywgbmV3IEZsb2F0MzJCdWZmZXJBdHRyaWJ1dGUoIHZlcnRpY2VzLCAzICkgKTtcblx0XHRcdGdlb21ldHJ5LnNldEF0dHJpYnV0ZSggJ25vcm1hbCcsIG5ldyBGbG9hdDMyQnVmZmVyQXR0cmlidXRlKCBub3JtYWxzLCAzICkgKTtcblxuXHRcdFx0cmV0dXJuIGdlb21ldHJ5O1xuXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gZW5zdXJlU3RyaW5nKCBidWZmZXIgKSB7XG5cblx0XHRcdGlmICggdHlwZW9mIGJ1ZmZlciAhPT0gJ3N0cmluZycgKSB7XG5cblx0XHRcdFx0cmV0dXJuIExvYWRlclV0aWxzLmRlY29kZVRleHQoIG5ldyBVaW50OEFycmF5KCBidWZmZXIgKSApO1xuXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBidWZmZXI7XG5cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBlbnN1cmVCaW5hcnkoIGJ1ZmZlciApIHtcblxuXHRcdFx0aWYgKCB0eXBlb2YgYnVmZmVyID09PSAnc3RyaW5nJyApIHtcblxuXHRcdFx0XHRjb25zdCBhcnJheV9idWZmZXIgPSBuZXcgVWludDhBcnJheSggYnVmZmVyLmxlbmd0aCApO1xuXHRcdFx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBidWZmZXIubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0XHRcdFx0YXJyYXlfYnVmZmVyWyBpIF0gPSBidWZmZXIuY2hhckNvZGVBdCggaSApICYgMHhmZjsgLy8gaW1wbGljaXRseSBhc3N1bWVzIGxpdHRsZS1lbmRpYW5cblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGFycmF5X2J1ZmZlci5idWZmZXIgfHwgYXJyYXlfYnVmZmVyO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdHJldHVybiBidWZmZXI7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdC8vIHN0YXJ0XG5cblx0XHRjb25zdCBiaW5EYXRhID0gZW5zdXJlQmluYXJ5KCBkYXRhICk7XG5cblx0XHRyZXR1cm4gaXNCaW5hcnkoIGJpbkRhdGEgKSA/IHBhcnNlQmluYXJ5KCBiaW5EYXRhICkgOiBwYXJzZUFTQ0lJKCBlbnN1cmVTdHJpbmcoIGRhdGEgKSApO1xuXG5cdH1cblxufVxuXG5leHBvcnQgeyBTVExMb2FkZXIgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibG9hZC1zdGxcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rbHRqc19mb3VydGhcIl0gPSBzZWxmW1wid2VicGFja0NodW5rbHRqc19mb3VydGhcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2J1aWxkX3RocmVlX21vZHVsZV9qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX2NvbnRyb2xzX09yYml0Q29udHJvbHNfanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX2xpbC1ndWlfZGlzdF9saWwtZ3VpX2VzbV9qc1wiLFwic2FtcGxlc19jaGFwdGVyc19jaGFwdGVyLThfdXRpbF9zdGFuZGFyZC1zY2VuZV9qc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci04L2xvYWQtc3RsLmpzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
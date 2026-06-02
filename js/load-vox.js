/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./samples/chapters/chapter-8/load-vox.js"
/*!************************************************!*\
  !*** ./samples/chapters/chapter-8/load-vox.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_standard_scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/standard-scene */ "./samples/chapters/chapter-8/util/standard-scene.js");
/* harmony import */ var three_examples_jsm_loaders_VOXLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/loaders/VOXLoader */ "./node_modules/three/examples/jsm/loaders/VOXLoader.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");





const loadModel = () => {
  return new three_examples_jsm_loaders_VOXLoader__WEBPACK_IMPORTED_MODULE_1__.VOXLoader().loadAsync('/assets/models/vox/biome.vox').then((chunks) => {
    // return new VOXLoader().loadAsync('/assets/models/vox/monu9.vox').then((chunks) => {
    const group = new three__WEBPACK_IMPORTED_MODULE_2__.Group()
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i]
      const mesh = new three_examples_jsm_loaders_VOXLoader__WEBPACK_IMPORTED_MODULE_1__.VOXMesh(chunk)
      mesh.castShadow = true
      mesh.receiveShadow = true
      group.add(mesh)
    }

    group.scale.setScalar(0.1)
    return group
  })
}

;(0,_util_standard_scene__WEBPACK_IMPORTED_MODULE_0__.bootstrapMeshScene)({
  loadMesh: loadModel,
  hidefloor: true
}).then()


/***/ },

/***/ "./node_modules/three/examples/jsm/loaders/VOXLoader.js"
/*!**************************************************************!*\
  !*** ./node_modules/three/examples/jsm/loaders/VOXLoader.js ***!
  \**************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VOXData3DTexture: () => (/* binding */ VOXData3DTexture),
/* harmony export */   VOXLoader: () => (/* binding */ VOXLoader),
/* harmony export */   VOXMesh: () => (/* binding */ VOXMesh)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");


class VOXLoader extends three__WEBPACK_IMPORTED_MODULE_0__.Loader {

	load( url, onLoad, onProgress, onError ) {

		const scope = this;

		const loader = new three__WEBPACK_IMPORTED_MODULE_0__.FileLoader( scope.manager );
		loader.setPath( scope.path );
		loader.setResponseType( 'arraybuffer' );
		loader.setRequestHeader( scope.requestHeader );
		loader.load( url, function ( buffer ) {

			try {

				onLoad( scope.parse( buffer ) );

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

	parse( buffer ) {

		const data = new DataView( buffer );

		const id = data.getUint32( 0, true );
		const version = data.getUint32( 4, true );

		if ( id !== 542658390 || version !== 150 ) {

			console.error( 'Not a valid VOX file' );
			return;

		}

		const DEFAULT_PALETTE = [
			0x00000000, 0xffffffff, 0xffccffff, 0xff99ffff, 0xff66ffff, 0xff33ffff, 0xff00ffff, 0xffffccff,
			0xffccccff, 0xff99ccff, 0xff66ccff, 0xff33ccff, 0xff00ccff, 0xffff99ff, 0xffcc99ff, 0xff9999ff,
			0xff6699ff, 0xff3399ff, 0xff0099ff, 0xffff66ff, 0xffcc66ff, 0xff9966ff, 0xff6666ff, 0xff3366ff,
			0xff0066ff, 0xffff33ff, 0xffcc33ff, 0xff9933ff, 0xff6633ff, 0xff3333ff, 0xff0033ff, 0xffff00ff,
			0xffcc00ff, 0xff9900ff, 0xff6600ff, 0xff3300ff, 0xff0000ff, 0xffffffcc, 0xffccffcc, 0xff99ffcc,
			0xff66ffcc, 0xff33ffcc, 0xff00ffcc, 0xffffcccc, 0xffcccccc, 0xff99cccc, 0xff66cccc, 0xff33cccc,
			0xff00cccc, 0xffff99cc, 0xffcc99cc, 0xff9999cc, 0xff6699cc, 0xff3399cc, 0xff0099cc, 0xffff66cc,
			0xffcc66cc, 0xff9966cc, 0xff6666cc, 0xff3366cc, 0xff0066cc, 0xffff33cc, 0xffcc33cc, 0xff9933cc,
			0xff6633cc, 0xff3333cc, 0xff0033cc, 0xffff00cc, 0xffcc00cc, 0xff9900cc, 0xff6600cc, 0xff3300cc,
			0xff0000cc, 0xffffff99, 0xffccff99, 0xff99ff99, 0xff66ff99, 0xff33ff99, 0xff00ff99, 0xffffcc99,
			0xffcccc99, 0xff99cc99, 0xff66cc99, 0xff33cc99, 0xff00cc99, 0xffff9999, 0xffcc9999, 0xff999999,
			0xff669999, 0xff339999, 0xff009999, 0xffff6699, 0xffcc6699, 0xff996699, 0xff666699, 0xff336699,
			0xff006699, 0xffff3399, 0xffcc3399, 0xff993399, 0xff663399, 0xff333399, 0xff003399, 0xffff0099,
			0xffcc0099, 0xff990099, 0xff660099, 0xff330099, 0xff000099, 0xffffff66, 0xffccff66, 0xff99ff66,
			0xff66ff66, 0xff33ff66, 0xff00ff66, 0xffffcc66, 0xffcccc66, 0xff99cc66, 0xff66cc66, 0xff33cc66,
			0xff00cc66, 0xffff9966, 0xffcc9966, 0xff999966, 0xff669966, 0xff339966, 0xff009966, 0xffff6666,
			0xffcc6666, 0xff996666, 0xff666666, 0xff336666, 0xff006666, 0xffff3366, 0xffcc3366, 0xff993366,
			0xff663366, 0xff333366, 0xff003366, 0xffff0066, 0xffcc0066, 0xff990066, 0xff660066, 0xff330066,
			0xff000066, 0xffffff33, 0xffccff33, 0xff99ff33, 0xff66ff33, 0xff33ff33, 0xff00ff33, 0xffffcc33,
			0xffcccc33, 0xff99cc33, 0xff66cc33, 0xff33cc33, 0xff00cc33, 0xffff9933, 0xffcc9933, 0xff999933,
			0xff669933, 0xff339933, 0xff009933, 0xffff6633, 0xffcc6633, 0xff996633, 0xff666633, 0xff336633,
			0xff006633, 0xffff3333, 0xffcc3333, 0xff993333, 0xff663333, 0xff333333, 0xff003333, 0xffff0033,
			0xffcc0033, 0xff990033, 0xff660033, 0xff330033, 0xff000033, 0xffffff00, 0xffccff00, 0xff99ff00,
			0xff66ff00, 0xff33ff00, 0xff00ff00, 0xffffcc00, 0xffcccc00, 0xff99cc00, 0xff66cc00, 0xff33cc00,
			0xff00cc00, 0xffff9900, 0xffcc9900, 0xff999900, 0xff669900, 0xff339900, 0xff009900, 0xffff6600,
			0xffcc6600, 0xff996600, 0xff666600, 0xff336600, 0xff006600, 0xffff3300, 0xffcc3300, 0xff993300,
			0xff663300, 0xff333300, 0xff003300, 0xffff0000, 0xffcc0000, 0xff990000, 0xff660000, 0xff330000,
			0xff0000ee, 0xff0000dd, 0xff0000bb, 0xff0000aa, 0xff000088, 0xff000077, 0xff000055, 0xff000044,
			0xff000022, 0xff000011, 0xff00ee00, 0xff00dd00, 0xff00bb00, 0xff00aa00, 0xff008800, 0xff007700,
			0xff005500, 0xff004400, 0xff002200, 0xff001100, 0xffee0000, 0xffdd0000, 0xffbb0000, 0xffaa0000,
			0xff880000, 0xff770000, 0xff550000, 0xff440000, 0xff220000, 0xff110000, 0xffeeeeee, 0xffdddddd,
			0xffbbbbbb, 0xffaaaaaa, 0xff888888, 0xff777777, 0xff555555, 0xff444444, 0xff222222, 0xff111111
		];

		let i = 8;

		let chunk;
		const chunks = [];

		while ( i < data.byteLength ) {

			let id = '';

			for ( let j = 0; j < 4; j ++ ) {

				id += String.fromCharCode( data.getUint8( i ++ ) );

			}

			const chunkSize = data.getUint32( i, true ); i += 4;
			i += 4; // childChunks

			if ( id === 'SIZE' ) {

				const x = data.getUint32( i, true ); i += 4;
				const y = data.getUint32( i, true ); i += 4;
				const z = data.getUint32( i, true ); i += 4;

				chunk = {
					palette: DEFAULT_PALETTE,
					size: { x: x, y: y, z: z },
				};

				chunks.push( chunk );

				i += chunkSize - ( 3 * 4 );

			} else if ( id === 'XYZI' ) {

				const numVoxels = data.getUint32( i, true ); i += 4;
				chunk.data = new Uint8Array( buffer, i, numVoxels * 4 );

				i += numVoxels * 4;

			} else if ( id === 'RGBA' ) {

				const palette = [ 0 ];

				for ( let j = 0; j < 256; j ++ ) {

					palette[ j + 1 ] = data.getUint32( i, true ); i += 4;

				}

				chunk.palette = palette;

			} else {

				// console.log( id, chunkSize, childChunks );

				i += chunkSize;

			}

		}

		return chunks;

	}

}

class VOXMesh extends three__WEBPACK_IMPORTED_MODULE_0__.Mesh {

	constructor( chunk ) {

		const data = chunk.data;
		const size = chunk.size;
		const palette = chunk.palette;

		//

		const vertices = [];
		const colors = [];

		const nx = [ 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1 ];
		const px = [ 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0 ];
		const py = [ 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1 ];
		const ny = [ 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0 ];
		const nz = [ 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0 ];
		const pz = [ 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1 ];

		function add( tile, x, y, z, r, g, b ) {

			x -= size.x / 2;
			y -= size.z / 2;
			z += size.y / 2;

			for ( let i = 0; i < 18; i += 3 ) {

				vertices.push( tile[ i + 0 ] + x, tile[ i + 1 ] + y, tile[ i + 2 ] + z );
				colors.push( r, g, b );

			}

		}

		// Store data in a volume for sampling

		const offsety = size.x;
		const offsetz = size.x * size.y;

		const array = new Uint8Array( size.x * size.y * size.z );

		for ( let j = 0; j < data.length; j += 4 ) {

			const x = data[ j + 0 ];
			const y = data[ j + 1 ];
			const z = data[ j + 2 ];

			const index = x + ( y * offsety ) + ( z * offsetz );

			array[ index ] = 255;

		}

		// Construct geometry

		let hasColors = false;

		for ( let j = 0; j < data.length; j += 4 ) {

			const x = data[ j + 0 ];
			const y = data[ j + 1 ];
			const z = data[ j + 2 ];
			const c = data[ j + 3 ];

			const hex = palette[ c ];
			const r = ( hex >> 0 & 0xff ) / 0xff;
			const g = ( hex >> 8 & 0xff ) / 0xff;
			const b = ( hex >> 16 & 0xff ) / 0xff;

			if ( r > 0 || g > 0 || b > 0 ) hasColors = true;

			const index = x + ( y * offsety ) + ( z * offsetz );

			if ( array[ index + 1 ] === 0 || x === size.x - 1 ) add( px, x, z, - y, r, g, b );
			if ( array[ index - 1 ] === 0 || x === 0 ) add( nx, x, z, - y, r, g, b );
			if ( array[ index + offsety ] === 0 || y === size.y - 1 ) add( ny, x, z, - y, r, g, b );
			if ( array[ index - offsety ] === 0 || y === 0 ) add( py, x, z, - y, r, g, b );
			if ( array[ index + offsetz ] === 0 || z === size.z - 1 ) add( pz, x, z, - y, r, g, b );
			if ( array[ index - offsetz ] === 0 || z === 0 ) add( nz, x, z, - y, r, g, b );

		}

		const geometry = new three__WEBPACK_IMPORTED_MODULE_0__.BufferGeometry();
		geometry.setAttribute( 'position', new three__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute( vertices, 3 ) );
		geometry.computeVertexNormals();

		const material = new three__WEBPACK_IMPORTED_MODULE_0__.MeshStandardMaterial();

		if ( hasColors ) {

			geometry.setAttribute( 'color', new three__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute( colors, 3 ) );
			material.vertexColors = true;

		}

		super( geometry, material );

	}

}

class VOXData3DTexture extends three__WEBPACK_IMPORTED_MODULE_0__.Data3DTexture {

	constructor( chunk ) {

		const data = chunk.data;
		const size = chunk.size;

		const offsety = size.x;
		const offsetz = size.x * size.y;

		const array = new Uint8Array( size.x * size.y * size.z );

		for ( let j = 0; j < data.length; j += 4 ) {

			const x = data[ j + 0 ];
			const y = data[ j + 1 ];
			const z = data[ j + 2 ];

			const index = x + ( y * offsety ) + ( z * offsetz );

			array[ index ] = 255;

		}

		super( array, size.x, size.y, size.z );

		this.format = three__WEBPACK_IMPORTED_MODULE_0__.RedFormat;
		this.minFilter = three__WEBPACK_IMPORTED_MODULE_0__.NearestFilter;
		this.magFilter = three__WEBPACK_IMPORTED_MODULE_0__.LinearFilter;
		this.unpackAlignment = 1;
		this.needsUpdate = true;

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
/******/ 			"load-vox": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","samples_chapters_chapter-8_util_standard-scene_js"], () => (__webpack_require__("./samples/chapters/chapter-8/load-vox.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7O1VBRUE7VUFDQTs7Ozs7V0MvQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSwrQkFBK0Isd0NBQXdDO1dBQ3ZFO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUJBQWlCLHFCQUFxQjtXQUN0QztXQUNBO1dBQ0Esa0JBQWtCLHFCQUFxQjtXQUN2QztXQUNBO1dBQ0EsS0FBSztXQUNMO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFOzs7OztXQzNCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdELEU7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBLDRHOzs7OztVRWhEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItOC9sb2FkLXZveC5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL25vZGVfbW9kdWxlcy90aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9WT1hMb2FkZXIuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBib290c3RyYXBNZXNoU2NlbmUgfSBmcm9tICcuL3V0aWwvc3RhbmRhcmQtc2NlbmUnXG5pbXBvcnQgeyBWT1hMb2FkZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9WT1hMb2FkZXInXG5pbXBvcnQgeyBWT1hNZXNoIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvVk9YTG9hZGVyJ1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5cbmNvbnN0IGxvYWRNb2RlbCA9ICgpID0+IHtcbiAgcmV0dXJuIG5ldyBWT1hMb2FkZXIoKS5sb2FkQXN5bmMoJy9hc3NldHMvbW9kZWxzL3ZveC9iaW9tZS52b3gnKS50aGVuKChjaHVua3MpID0+IHtcbiAgICAvLyByZXR1cm4gbmV3IFZPWExvYWRlcigpLmxvYWRBc3luYygnL2Fzc2V0cy9tb2RlbHMvdm94L21vbnU5LnZveCcpLnRoZW4oKGNodW5rcykgPT4ge1xuICAgIGNvbnN0IGdyb3VwID0gbmV3IFRIUkVFLkdyb3VwKClcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNodW5rcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgY2h1bmsgPSBjaHVua3NbaV1cbiAgICAgIGNvbnN0IG1lc2ggPSBuZXcgVk9YTWVzaChjaHVuaylcbiAgICAgIG1lc2guY2FzdFNoYWRvdyA9IHRydWVcbiAgICAgIG1lc2gucmVjZWl2ZVNoYWRvdyA9IHRydWVcbiAgICAgIGdyb3VwLmFkZChtZXNoKVxuICAgIH1cblxuICAgIGdyb3VwLnNjYWxlLnNldFNjYWxhcigwLjEpXG4gICAgcmV0dXJuIGdyb3VwXG4gIH0pXG59XG5cbmJvb3RzdHJhcE1lc2hTY2VuZSh7XG4gIGxvYWRNZXNoOiBsb2FkTW9kZWwsXG4gIGhpZGVmbG9vcjogdHJ1ZVxufSkudGhlbigpXG4iLCJpbXBvcnQge1xuXHRCdWZmZXJHZW9tZXRyeSxcblx0RGF0YTNEVGV4dHVyZSxcblx0RmlsZUxvYWRlcixcblx0RmxvYXQzMkJ1ZmZlckF0dHJpYnV0ZSxcblx0TG9hZGVyLFxuXHRMaW5lYXJGaWx0ZXIsXG5cdE1lc2gsXG5cdE1lc2hTdGFuZGFyZE1hdGVyaWFsLFxuXHROZWFyZXN0RmlsdGVyLFxuXHRSZWRGb3JtYXRcbn0gZnJvbSAndGhyZWUnO1xuXG5jbGFzcyBWT1hMb2FkZXIgZXh0ZW5kcyBMb2FkZXIge1xuXG5cdGxvYWQoIHVybCwgb25Mb2FkLCBvblByb2dyZXNzLCBvbkVycm9yICkge1xuXG5cdFx0Y29uc3Qgc2NvcGUgPSB0aGlzO1xuXG5cdFx0Y29uc3QgbG9hZGVyID0gbmV3IEZpbGVMb2FkZXIoIHNjb3BlLm1hbmFnZXIgKTtcblx0XHRsb2FkZXIuc2V0UGF0aCggc2NvcGUucGF0aCApO1xuXHRcdGxvYWRlci5zZXRSZXNwb25zZVR5cGUoICdhcnJheWJ1ZmZlcicgKTtcblx0XHRsb2FkZXIuc2V0UmVxdWVzdEhlYWRlciggc2NvcGUucmVxdWVzdEhlYWRlciApO1xuXHRcdGxvYWRlci5sb2FkKCB1cmwsIGZ1bmN0aW9uICggYnVmZmVyICkge1xuXG5cdFx0XHR0cnkge1xuXG5cdFx0XHRcdG9uTG9hZCggc2NvcGUucGFyc2UoIGJ1ZmZlciApICk7XG5cblx0XHRcdH0gY2F0Y2ggKCBlICkge1xuXG5cdFx0XHRcdGlmICggb25FcnJvciApIHtcblxuXHRcdFx0XHRcdG9uRXJyb3IoIGUgKTtcblxuXHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvciggZSApO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRzY29wZS5tYW5hZ2VyLml0ZW1FcnJvciggdXJsICk7XG5cblx0XHRcdH1cblxuXHRcdH0sIG9uUHJvZ3Jlc3MsIG9uRXJyb3IgKTtcblxuXHR9XG5cblx0cGFyc2UoIGJ1ZmZlciApIHtcblxuXHRcdGNvbnN0IGRhdGEgPSBuZXcgRGF0YVZpZXcoIGJ1ZmZlciApO1xuXG5cdFx0Y29uc3QgaWQgPSBkYXRhLmdldFVpbnQzMiggMCwgdHJ1ZSApO1xuXHRcdGNvbnN0IHZlcnNpb24gPSBkYXRhLmdldFVpbnQzMiggNCwgdHJ1ZSApO1xuXG5cdFx0aWYgKCBpZCAhPT0gNTQyNjU4MzkwIHx8IHZlcnNpb24gIT09IDE1MCApIHtcblxuXHRcdFx0Y29uc29sZS5lcnJvciggJ05vdCBhIHZhbGlkIFZPWCBmaWxlJyApO1xuXHRcdFx0cmV0dXJuO1xuXG5cdFx0fVxuXG5cdFx0Y29uc3QgREVGQVVMVF9QQUxFVFRFID0gW1xuXHRcdFx0MHgwMDAwMDAwMCwgMHhmZmZmZmZmZiwgMHhmZmNjZmZmZiwgMHhmZjk5ZmZmZiwgMHhmZjY2ZmZmZiwgMHhmZjMzZmZmZiwgMHhmZjAwZmZmZiwgMHhmZmZmY2NmZixcblx0XHRcdDB4ZmZjY2NjZmYsIDB4ZmY5OWNjZmYsIDB4ZmY2NmNjZmYsIDB4ZmYzM2NjZmYsIDB4ZmYwMGNjZmYsIDB4ZmZmZjk5ZmYsIDB4ZmZjYzk5ZmYsIDB4ZmY5OTk5ZmYsXG5cdFx0XHQweGZmNjY5OWZmLCAweGZmMzM5OWZmLCAweGZmMDA5OWZmLCAweGZmZmY2NmZmLCAweGZmY2M2NmZmLCAweGZmOTk2NmZmLCAweGZmNjY2NmZmLCAweGZmMzM2NmZmLFxuXHRcdFx0MHhmZjAwNjZmZiwgMHhmZmZmMzNmZiwgMHhmZmNjMzNmZiwgMHhmZjk5MzNmZiwgMHhmZjY2MzNmZiwgMHhmZjMzMzNmZiwgMHhmZjAwMzNmZiwgMHhmZmZmMDBmZixcblx0XHRcdDB4ZmZjYzAwZmYsIDB4ZmY5OTAwZmYsIDB4ZmY2NjAwZmYsIDB4ZmYzMzAwZmYsIDB4ZmYwMDAwZmYsIDB4ZmZmZmZmY2MsIDB4ZmZjY2ZmY2MsIDB4ZmY5OWZmY2MsXG5cdFx0XHQweGZmNjZmZmNjLCAweGZmMzNmZmNjLCAweGZmMDBmZmNjLCAweGZmZmZjY2NjLCAweGZmY2NjY2NjLCAweGZmOTljY2NjLCAweGZmNjZjY2NjLCAweGZmMzNjY2NjLFxuXHRcdFx0MHhmZjAwY2NjYywgMHhmZmZmOTljYywgMHhmZmNjOTljYywgMHhmZjk5OTljYywgMHhmZjY2OTljYywgMHhmZjMzOTljYywgMHhmZjAwOTljYywgMHhmZmZmNjZjYyxcblx0XHRcdDB4ZmZjYzY2Y2MsIDB4ZmY5OTY2Y2MsIDB4ZmY2NjY2Y2MsIDB4ZmYzMzY2Y2MsIDB4ZmYwMDY2Y2MsIDB4ZmZmZjMzY2MsIDB4ZmZjYzMzY2MsIDB4ZmY5OTMzY2MsXG5cdFx0XHQweGZmNjYzM2NjLCAweGZmMzMzM2NjLCAweGZmMDAzM2NjLCAweGZmZmYwMGNjLCAweGZmY2MwMGNjLCAweGZmOTkwMGNjLCAweGZmNjYwMGNjLCAweGZmMzMwMGNjLFxuXHRcdFx0MHhmZjAwMDBjYywgMHhmZmZmZmY5OSwgMHhmZmNjZmY5OSwgMHhmZjk5ZmY5OSwgMHhmZjY2ZmY5OSwgMHhmZjMzZmY5OSwgMHhmZjAwZmY5OSwgMHhmZmZmY2M5OSxcblx0XHRcdDB4ZmZjY2NjOTksIDB4ZmY5OWNjOTksIDB4ZmY2NmNjOTksIDB4ZmYzM2NjOTksIDB4ZmYwMGNjOTksIDB4ZmZmZjk5OTksIDB4ZmZjYzk5OTksIDB4ZmY5OTk5OTksXG5cdFx0XHQweGZmNjY5OTk5LCAweGZmMzM5OTk5LCAweGZmMDA5OTk5LCAweGZmZmY2Njk5LCAweGZmY2M2Njk5LCAweGZmOTk2Njk5LCAweGZmNjY2Njk5LCAweGZmMzM2Njk5LFxuXHRcdFx0MHhmZjAwNjY5OSwgMHhmZmZmMzM5OSwgMHhmZmNjMzM5OSwgMHhmZjk5MzM5OSwgMHhmZjY2MzM5OSwgMHhmZjMzMzM5OSwgMHhmZjAwMzM5OSwgMHhmZmZmMDA5OSxcblx0XHRcdDB4ZmZjYzAwOTksIDB4ZmY5OTAwOTksIDB4ZmY2NjAwOTksIDB4ZmYzMzAwOTksIDB4ZmYwMDAwOTksIDB4ZmZmZmZmNjYsIDB4ZmZjY2ZmNjYsIDB4ZmY5OWZmNjYsXG5cdFx0XHQweGZmNjZmZjY2LCAweGZmMzNmZjY2LCAweGZmMDBmZjY2LCAweGZmZmZjYzY2LCAweGZmY2NjYzY2LCAweGZmOTljYzY2LCAweGZmNjZjYzY2LCAweGZmMzNjYzY2LFxuXHRcdFx0MHhmZjAwY2M2NiwgMHhmZmZmOTk2NiwgMHhmZmNjOTk2NiwgMHhmZjk5OTk2NiwgMHhmZjY2OTk2NiwgMHhmZjMzOTk2NiwgMHhmZjAwOTk2NiwgMHhmZmZmNjY2Nixcblx0XHRcdDB4ZmZjYzY2NjYsIDB4ZmY5OTY2NjYsIDB4ZmY2NjY2NjYsIDB4ZmYzMzY2NjYsIDB4ZmYwMDY2NjYsIDB4ZmZmZjMzNjYsIDB4ZmZjYzMzNjYsIDB4ZmY5OTMzNjYsXG5cdFx0XHQweGZmNjYzMzY2LCAweGZmMzMzMzY2LCAweGZmMDAzMzY2LCAweGZmZmYwMDY2LCAweGZmY2MwMDY2LCAweGZmOTkwMDY2LCAweGZmNjYwMDY2LCAweGZmMzMwMDY2LFxuXHRcdFx0MHhmZjAwMDA2NiwgMHhmZmZmZmYzMywgMHhmZmNjZmYzMywgMHhmZjk5ZmYzMywgMHhmZjY2ZmYzMywgMHhmZjMzZmYzMywgMHhmZjAwZmYzMywgMHhmZmZmY2MzMyxcblx0XHRcdDB4ZmZjY2NjMzMsIDB4ZmY5OWNjMzMsIDB4ZmY2NmNjMzMsIDB4ZmYzM2NjMzMsIDB4ZmYwMGNjMzMsIDB4ZmZmZjk5MzMsIDB4ZmZjYzk5MzMsIDB4ZmY5OTk5MzMsXG5cdFx0XHQweGZmNjY5OTMzLCAweGZmMzM5OTMzLCAweGZmMDA5OTMzLCAweGZmZmY2NjMzLCAweGZmY2M2NjMzLCAweGZmOTk2NjMzLCAweGZmNjY2NjMzLCAweGZmMzM2NjMzLFxuXHRcdFx0MHhmZjAwNjYzMywgMHhmZmZmMzMzMywgMHhmZmNjMzMzMywgMHhmZjk5MzMzMywgMHhmZjY2MzMzMywgMHhmZjMzMzMzMywgMHhmZjAwMzMzMywgMHhmZmZmMDAzMyxcblx0XHRcdDB4ZmZjYzAwMzMsIDB4ZmY5OTAwMzMsIDB4ZmY2NjAwMzMsIDB4ZmYzMzAwMzMsIDB4ZmYwMDAwMzMsIDB4ZmZmZmZmMDAsIDB4ZmZjY2ZmMDAsIDB4ZmY5OWZmMDAsXG5cdFx0XHQweGZmNjZmZjAwLCAweGZmMzNmZjAwLCAweGZmMDBmZjAwLCAweGZmZmZjYzAwLCAweGZmY2NjYzAwLCAweGZmOTljYzAwLCAweGZmNjZjYzAwLCAweGZmMzNjYzAwLFxuXHRcdFx0MHhmZjAwY2MwMCwgMHhmZmZmOTkwMCwgMHhmZmNjOTkwMCwgMHhmZjk5OTkwMCwgMHhmZjY2OTkwMCwgMHhmZjMzOTkwMCwgMHhmZjAwOTkwMCwgMHhmZmZmNjYwMCxcblx0XHRcdDB4ZmZjYzY2MDAsIDB4ZmY5OTY2MDAsIDB4ZmY2NjY2MDAsIDB4ZmYzMzY2MDAsIDB4ZmYwMDY2MDAsIDB4ZmZmZjMzMDAsIDB4ZmZjYzMzMDAsIDB4ZmY5OTMzMDAsXG5cdFx0XHQweGZmNjYzMzAwLCAweGZmMzMzMzAwLCAweGZmMDAzMzAwLCAweGZmZmYwMDAwLCAweGZmY2MwMDAwLCAweGZmOTkwMDAwLCAweGZmNjYwMDAwLCAweGZmMzMwMDAwLFxuXHRcdFx0MHhmZjAwMDBlZSwgMHhmZjAwMDBkZCwgMHhmZjAwMDBiYiwgMHhmZjAwMDBhYSwgMHhmZjAwMDA4OCwgMHhmZjAwMDA3NywgMHhmZjAwMDA1NSwgMHhmZjAwMDA0NCxcblx0XHRcdDB4ZmYwMDAwMjIsIDB4ZmYwMDAwMTEsIDB4ZmYwMGVlMDAsIDB4ZmYwMGRkMDAsIDB4ZmYwMGJiMDAsIDB4ZmYwMGFhMDAsIDB4ZmYwMDg4MDAsIDB4ZmYwMDc3MDAsXG5cdFx0XHQweGZmMDA1NTAwLCAweGZmMDA0NDAwLCAweGZmMDAyMjAwLCAweGZmMDAxMTAwLCAweGZmZWUwMDAwLCAweGZmZGQwMDAwLCAweGZmYmIwMDAwLCAweGZmYWEwMDAwLFxuXHRcdFx0MHhmZjg4MDAwMCwgMHhmZjc3MDAwMCwgMHhmZjU1MDAwMCwgMHhmZjQ0MDAwMCwgMHhmZjIyMDAwMCwgMHhmZjExMDAwMCwgMHhmZmVlZWVlZSwgMHhmZmRkZGRkZCxcblx0XHRcdDB4ZmZiYmJiYmIsIDB4ZmZhYWFhYWEsIDB4ZmY4ODg4ODgsIDB4ZmY3Nzc3NzcsIDB4ZmY1NTU1NTUsIDB4ZmY0NDQ0NDQsIDB4ZmYyMjIyMjIsIDB4ZmYxMTExMTFcblx0XHRdO1xuXG5cdFx0bGV0IGkgPSA4O1xuXG5cdFx0bGV0IGNodW5rO1xuXHRcdGNvbnN0IGNodW5rcyA9IFtdO1xuXG5cdFx0d2hpbGUgKCBpIDwgZGF0YS5ieXRlTGVuZ3RoICkge1xuXG5cdFx0XHRsZXQgaWQgPSAnJztcblxuXHRcdFx0Zm9yICggbGV0IGogPSAwOyBqIDwgNDsgaiArKyApIHtcblxuXHRcdFx0XHRpZCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKCBkYXRhLmdldFVpbnQ4KCBpICsrICkgKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBjaHVua1NpemUgPSBkYXRhLmdldFVpbnQzMiggaSwgdHJ1ZSApOyBpICs9IDQ7XG5cdFx0XHRpICs9IDQ7IC8vIGNoaWxkQ2h1bmtzXG5cblx0XHRcdGlmICggaWQgPT09ICdTSVpFJyApIHtcblxuXHRcdFx0XHRjb25zdCB4ID0gZGF0YS5nZXRVaW50MzIoIGksIHRydWUgKTsgaSArPSA0O1xuXHRcdFx0XHRjb25zdCB5ID0gZGF0YS5nZXRVaW50MzIoIGksIHRydWUgKTsgaSArPSA0O1xuXHRcdFx0XHRjb25zdCB6ID0gZGF0YS5nZXRVaW50MzIoIGksIHRydWUgKTsgaSArPSA0O1xuXG5cdFx0XHRcdGNodW5rID0ge1xuXHRcdFx0XHRcdHBhbGV0dGU6IERFRkFVTFRfUEFMRVRURSxcblx0XHRcdFx0XHRzaXplOiB7IHg6IHgsIHk6IHksIHo6IHogfSxcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRjaHVua3MucHVzaCggY2h1bmsgKTtcblxuXHRcdFx0XHRpICs9IGNodW5rU2l6ZSAtICggMyAqIDQgKTtcblxuXHRcdFx0fSBlbHNlIGlmICggaWQgPT09ICdYWVpJJyApIHtcblxuXHRcdFx0XHRjb25zdCBudW1Wb3hlbHMgPSBkYXRhLmdldFVpbnQzMiggaSwgdHJ1ZSApOyBpICs9IDQ7XG5cdFx0XHRcdGNodW5rLmRhdGEgPSBuZXcgVWludDhBcnJheSggYnVmZmVyLCBpLCBudW1Wb3hlbHMgKiA0ICk7XG5cblx0XHRcdFx0aSArPSBudW1Wb3hlbHMgKiA0O1xuXG5cdFx0XHR9IGVsc2UgaWYgKCBpZCA9PT0gJ1JHQkEnICkge1xuXG5cdFx0XHRcdGNvbnN0IHBhbGV0dGUgPSBbIDAgXTtcblxuXHRcdFx0XHRmb3IgKCBsZXQgaiA9IDA7IGogPCAyNTY7IGogKysgKSB7XG5cblx0XHRcdFx0XHRwYWxldHRlWyBqICsgMSBdID0gZGF0YS5nZXRVaW50MzIoIGksIHRydWUgKTsgaSArPSA0O1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjaHVuay5wYWxldHRlID0gcGFsZXR0ZTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHQvLyBjb25zb2xlLmxvZyggaWQsIGNodW5rU2l6ZSwgY2hpbGRDaHVua3MgKTtcblxuXHRcdFx0XHRpICs9IGNodW5rU2l6ZTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNodW5rcztcblxuXHR9XG5cbn1cblxuY2xhc3MgVk9YTWVzaCBleHRlbmRzIE1lc2gge1xuXG5cdGNvbnN0cnVjdG9yKCBjaHVuayApIHtcblxuXHRcdGNvbnN0IGRhdGEgPSBjaHVuay5kYXRhO1xuXHRcdGNvbnN0IHNpemUgPSBjaHVuay5zaXplO1xuXHRcdGNvbnN0IHBhbGV0dGUgPSBjaHVuay5wYWxldHRlO1xuXG5cdFx0Ly9cblxuXHRcdGNvbnN0IHZlcnRpY2VzID0gW107XG5cdFx0Y29uc3QgY29sb3JzID0gW107XG5cblx0XHRjb25zdCBueCA9IFsgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMCwgMSwgMSwgMCwgMSwgMCwgMCwgMCwgMSBdO1xuXHRcdGNvbnN0IHB4ID0gWyAxLCAwLCAwLCAxLCAxLCAwLCAxLCAwLCAxLCAxLCAxLCAxLCAxLCAwLCAxLCAxLCAxLCAwIF07XG5cdFx0Y29uc3QgcHkgPSBbIDAsIDAsIDEsIDEsIDAsIDEsIDAsIDEsIDEsIDEsIDEsIDEsIDAsIDEsIDEsIDEsIDAsIDEgXTtcblx0XHRjb25zdCBueSA9IFsgMCwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMCwgMSwgMSwgMCwgMSwgMCwgMCwgMCwgMSwgMCBdO1xuXHRcdGNvbnN0IG56ID0gWyAwLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAxLCAxLCAwLCAwLCAxLCAwLCAxLCAwLCAwLCAwIF07XG5cdFx0Y29uc3QgcHogPSBbIDAsIDEsIDEsIDEsIDEsIDEsIDAsIDEsIDAsIDEsIDEsIDAsIDAsIDEsIDAsIDEsIDEsIDEgXTtcblxuXHRcdGZ1bmN0aW9uIGFkZCggdGlsZSwgeCwgeSwgeiwgciwgZywgYiApIHtcblxuXHRcdFx0eCAtPSBzaXplLnggLyAyO1xuXHRcdFx0eSAtPSBzaXplLnogLyAyO1xuXHRcdFx0eiArPSBzaXplLnkgLyAyO1xuXG5cdFx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCAxODsgaSArPSAzICkge1xuXG5cdFx0XHRcdHZlcnRpY2VzLnB1c2goIHRpbGVbIGkgKyAwIF0gKyB4LCB0aWxlWyBpICsgMSBdICsgeSwgdGlsZVsgaSArIDIgXSArIHogKTtcblx0XHRcdFx0Y29sb3JzLnB1c2goIHIsIGcsIGIgKTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0Ly8gU3RvcmUgZGF0YSBpbiBhIHZvbHVtZSBmb3Igc2FtcGxpbmdcblxuXHRcdGNvbnN0IG9mZnNldHkgPSBzaXplLng7XG5cdFx0Y29uc3Qgb2Zmc2V0eiA9IHNpemUueCAqIHNpemUueTtcblxuXHRcdGNvbnN0IGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoIHNpemUueCAqIHNpemUueSAqIHNpemUueiApO1xuXG5cdFx0Zm9yICggbGV0IGogPSAwOyBqIDwgZGF0YS5sZW5ndGg7IGogKz0gNCApIHtcblxuXHRcdFx0Y29uc3QgeCA9IGRhdGFbIGogKyAwIF07XG5cdFx0XHRjb25zdCB5ID0gZGF0YVsgaiArIDEgXTtcblx0XHRcdGNvbnN0IHogPSBkYXRhWyBqICsgMiBdO1xuXG5cdFx0XHRjb25zdCBpbmRleCA9IHggKyAoIHkgKiBvZmZzZXR5ICkgKyAoIHogKiBvZmZzZXR6ICk7XG5cblx0XHRcdGFycmF5WyBpbmRleCBdID0gMjU1O1xuXG5cdFx0fVxuXG5cdFx0Ly8gQ29uc3RydWN0IGdlb21ldHJ5XG5cblx0XHRsZXQgaGFzQ29sb3JzID0gZmFsc2U7XG5cblx0XHRmb3IgKCBsZXQgaiA9IDA7IGogPCBkYXRhLmxlbmd0aDsgaiArPSA0ICkge1xuXG5cdFx0XHRjb25zdCB4ID0gZGF0YVsgaiArIDAgXTtcblx0XHRcdGNvbnN0IHkgPSBkYXRhWyBqICsgMSBdO1xuXHRcdFx0Y29uc3QgeiA9IGRhdGFbIGogKyAyIF07XG5cdFx0XHRjb25zdCBjID0gZGF0YVsgaiArIDMgXTtcblxuXHRcdFx0Y29uc3QgaGV4ID0gcGFsZXR0ZVsgYyBdO1xuXHRcdFx0Y29uc3QgciA9ICggaGV4ID4+IDAgJiAweGZmICkgLyAweGZmO1xuXHRcdFx0Y29uc3QgZyA9ICggaGV4ID4+IDggJiAweGZmICkgLyAweGZmO1xuXHRcdFx0Y29uc3QgYiA9ICggaGV4ID4+IDE2ICYgMHhmZiApIC8gMHhmZjtcblxuXHRcdFx0aWYgKCByID4gMCB8fCBnID4gMCB8fCBiID4gMCApIGhhc0NvbG9ycyA9IHRydWU7XG5cblx0XHRcdGNvbnN0IGluZGV4ID0geCArICggeSAqIG9mZnNldHkgKSArICggeiAqIG9mZnNldHogKTtcblxuXHRcdFx0aWYgKCBhcnJheVsgaW5kZXggKyAxIF0gPT09IDAgfHwgeCA9PT0gc2l6ZS54IC0gMSApIGFkZCggcHgsIHgsIHosIC0geSwgciwgZywgYiApO1xuXHRcdFx0aWYgKCBhcnJheVsgaW5kZXggLSAxIF0gPT09IDAgfHwgeCA9PT0gMCApIGFkZCggbngsIHgsIHosIC0geSwgciwgZywgYiApO1xuXHRcdFx0aWYgKCBhcnJheVsgaW5kZXggKyBvZmZzZXR5IF0gPT09IDAgfHwgeSA9PT0gc2l6ZS55IC0gMSApIGFkZCggbnksIHgsIHosIC0geSwgciwgZywgYiApO1xuXHRcdFx0aWYgKCBhcnJheVsgaW5kZXggLSBvZmZzZXR5IF0gPT09IDAgfHwgeSA9PT0gMCApIGFkZCggcHksIHgsIHosIC0geSwgciwgZywgYiApO1xuXHRcdFx0aWYgKCBhcnJheVsgaW5kZXggKyBvZmZzZXR6IF0gPT09IDAgfHwgeiA9PT0gc2l6ZS56IC0gMSApIGFkZCggcHosIHgsIHosIC0geSwgciwgZywgYiApO1xuXHRcdFx0aWYgKCBhcnJheVsgaW5kZXggLSBvZmZzZXR6IF0gPT09IDAgfHwgeiA9PT0gMCApIGFkZCggbnosIHgsIHosIC0geSwgciwgZywgYiApO1xuXG5cdFx0fVxuXG5cdFx0Y29uc3QgZ2VvbWV0cnkgPSBuZXcgQnVmZmVyR2VvbWV0cnkoKTtcblx0XHRnZW9tZXRyeS5zZXRBdHRyaWJ1dGUoICdwb3NpdGlvbicsIG5ldyBGbG9hdDMyQnVmZmVyQXR0cmlidXRlKCB2ZXJ0aWNlcywgMyApICk7XG5cdFx0Z2VvbWV0cnkuY29tcHV0ZVZlcnRleE5vcm1hbHMoKTtcblxuXHRcdGNvbnN0IG1hdGVyaWFsID0gbmV3IE1lc2hTdGFuZGFyZE1hdGVyaWFsKCk7XG5cblx0XHRpZiAoIGhhc0NvbG9ycyApIHtcblxuXHRcdFx0Z2VvbWV0cnkuc2V0QXR0cmlidXRlKCAnY29sb3InLCBuZXcgRmxvYXQzMkJ1ZmZlckF0dHJpYnV0ZSggY29sb3JzLCAzICkgKTtcblx0XHRcdG1hdGVyaWFsLnZlcnRleENvbG9ycyA9IHRydWU7XG5cblx0XHR9XG5cblx0XHRzdXBlciggZ2VvbWV0cnksIG1hdGVyaWFsICk7XG5cblx0fVxuXG59XG5cbmNsYXNzIFZPWERhdGEzRFRleHR1cmUgZXh0ZW5kcyBEYXRhM0RUZXh0dXJlIHtcblxuXHRjb25zdHJ1Y3RvciggY2h1bmsgKSB7XG5cblx0XHRjb25zdCBkYXRhID0gY2h1bmsuZGF0YTtcblx0XHRjb25zdCBzaXplID0gY2h1bmsuc2l6ZTtcblxuXHRcdGNvbnN0IG9mZnNldHkgPSBzaXplLng7XG5cdFx0Y29uc3Qgb2Zmc2V0eiA9IHNpemUueCAqIHNpemUueTtcblxuXHRcdGNvbnN0IGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoIHNpemUueCAqIHNpemUueSAqIHNpemUueiApO1xuXG5cdFx0Zm9yICggbGV0IGogPSAwOyBqIDwgZGF0YS5sZW5ndGg7IGogKz0gNCApIHtcblxuXHRcdFx0Y29uc3QgeCA9IGRhdGFbIGogKyAwIF07XG5cdFx0XHRjb25zdCB5ID0gZGF0YVsgaiArIDEgXTtcblx0XHRcdGNvbnN0IHogPSBkYXRhWyBqICsgMiBdO1xuXG5cdFx0XHRjb25zdCBpbmRleCA9IHggKyAoIHkgKiBvZmZzZXR5ICkgKyAoIHogKiBvZmZzZXR6ICk7XG5cblx0XHRcdGFycmF5WyBpbmRleCBdID0gMjU1O1xuXG5cdFx0fVxuXG5cdFx0c3VwZXIoIGFycmF5LCBzaXplLngsIHNpemUueSwgc2l6ZS56ICk7XG5cblx0XHR0aGlzLmZvcm1hdCA9IFJlZEZvcm1hdDtcblx0XHR0aGlzLm1pbkZpbHRlciA9IE5lYXJlc3RGaWx0ZXI7XG5cdFx0dGhpcy5tYWdGaWx0ZXIgPSBMaW5lYXJGaWx0ZXI7XG5cdFx0dGhpcy51bnBhY2tBbGlnbm1lbnQgPSAxO1xuXHRcdHRoaXMubmVlZHNVcGRhdGUgPSB0cnVlO1xuXG5cdH1cblxufVxuXG5leHBvcnQgeyBWT1hMb2FkZXIsIFZPWE1lc2gsIFZPWERhdGEzRFRleHR1cmUgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibG9hZC12b3hcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rbHRqc19mb3VydGhcIl0gPSBzZWxmW1wid2VicGFja0NodW5rbHRqc19mb3VydGhcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2J1aWxkX3RocmVlX21vZHVsZV9qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX2NvbnRyb2xzX09yYml0Q29udHJvbHNfanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX2xpbC1ndWlfZGlzdF9saWwtZ3VpX2VzbV9qc1wiLFwic2FtcGxlc19jaGFwdGVyc19jaGFwdGVyLThfdXRpbF9zdGFuZGFyZC1zY2VuZV9qc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci04L2xvYWQtdm94LmpzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
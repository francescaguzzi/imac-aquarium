/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./samples/chapters/chapter-8/load-pdb.js"
/*!************************************************!*\
  !*** ./samples/chapters/chapter-8/load-pdb.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_standard_scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/standard-scene */ "./samples/chapters/chapter-8/util/standard-scene.js");
/* harmony import */ var three_examples_jsm_loaders_PDBLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/loaders/PDBLoader */ "./node_modules/three/examples/jsm/loaders/PDBLoader.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");




const modelAsync = () => {
  return new three_examples_jsm_loaders_PDBLoader__WEBPACK_IMPORTED_MODULE_1__.PDBLoader().loadAsync('/assets/models/molecules/diamond.pdb').then((geometries) => {
    var group = new three__WEBPACK_IMPORTED_MODULE_2__.Object3D()

    // create the atoms
    const geometryAtoms = geometries.geometryAtoms
    console.log(geometryAtoms)
    for (let i = 0; i < geometryAtoms.attributes.position.count; i++) {
      let startPosition = new three__WEBPACK_IMPORTED_MODULE_2__.Vector3()
      startPosition.x = geometryAtoms.attributes.position.getX(i)
      startPosition.y = geometryAtoms.attributes.position.getY(i)
      startPosition.z = geometryAtoms.attributes.position.getZ(i)

      let color = new three__WEBPACK_IMPORTED_MODULE_2__.Color()
      color.r = geometryAtoms.attributes.color.getX(i)
      color.g = geometryAtoms.attributes.color.getY(i)
      color.b = geometryAtoms.attributes.color.getZ(i)

      let material = new three__WEBPACK_IMPORTED_MODULE_2__.MeshPhongMaterial({
        color: color
      })

      let sphere = new three__WEBPACK_IMPORTED_MODULE_2__.SphereGeometry(0.2)
      let mesh = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(sphere, material)
      mesh.position.copy(startPosition)
      group.add(mesh)
    }

    // create the bindings
    const geometryBonds = geometries.geometryBonds

    for (let j = 0; j < geometryBonds.attributes.position.count; j += 2) {
      let startPosition = new three__WEBPACK_IMPORTED_MODULE_2__.Vector3()
      startPosition.x = geometryBonds.attributes.position.getX(j)
      startPosition.y = geometryBonds.attributes.position.getY(j)
      startPosition.z = geometryBonds.attributes.position.getZ(j)

      let endPosition = new three__WEBPACK_IMPORTED_MODULE_2__.Vector3()
      endPosition.x = geometryBonds.attributes.position.getX(j + 1)
      endPosition.y = geometryBonds.attributes.position.getY(j + 1)
      endPosition.z = geometryBonds.attributes.position.getZ(j + 1)

      // use the start and end to create a curve, and use the curve to draw
      // a tube, which connects the atoms
      let path = new three__WEBPACK_IMPORTED_MODULE_2__.CatmullRomCurve3([startPosition, endPosition])
      let tube = new three__WEBPACK_IMPORTED_MODULE_2__.TubeGeometry(path, 1, 0.04)
      let material = new three__WEBPACK_IMPORTED_MODULE_2__.MeshPhongMaterial({
        color: 0xcccccc
      })
      let mesh = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(tube, material)
      group.add(mesh)
    }

    group.scale.set(0.5, 0.5, 0.5)
    return group
  })
}

;(0,_util_standard_scene__WEBPACK_IMPORTED_MODULE_0__.bootstrapMeshScene)({
  loadMesh: modelAsync,
  hidefloor: true
}).then()


/***/ },

/***/ "./node_modules/three/examples/jsm/loaders/PDBLoader.js"
/*!**************************************************************!*\
  !*** ./node_modules/three/examples/jsm/loaders/PDBLoader.js ***!
  \**************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PDBLoader: () => (/* binding */ PDBLoader)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");


class PDBLoader extends three__WEBPACK_IMPORTED_MODULE_0__.Loader {

	constructor( manager ) {

		super( manager );

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

	// Based on CanvasMol PDB parser

	parse( text ) {

		function trim( text ) {

			return text.replace( /^\s\s*/, '' ).replace( /\s\s*$/, '' );

		}

		function capitalize( text ) {

			return text.charAt( 0 ).toUpperCase() + text.slice( 1 ).toLowerCase();

		}

		function hash( s, e ) {

			return 's' + Math.min( s, e ) + 'e' + Math.max( s, e );

		}

		function parseBond( start, length, satom, i ) {

			const eatom = parseInt( lines[ i ].slice( start, start + length ) );

			if ( eatom ) {

				const h = hash( satom, eatom );

				if ( _bhash[ h ] === undefined ) {

					_bonds.push( [ satom - 1, eatom - 1, 1 ] );
					_bhash[ h ] = _bonds.length - 1;

				} else {

					// doesn't really work as almost all PDBs
					// have just normal bonds appearing multiple
					// times instead of being double/triple bonds
					// bonds[bhash[h]][2] += 1;

				}

			}

		}

		function buildGeometry() {

			const build = {
				geometryAtoms: new three__WEBPACK_IMPORTED_MODULE_0__.BufferGeometry(),
				geometryBonds: new three__WEBPACK_IMPORTED_MODULE_0__.BufferGeometry(),
				json: {
					atoms: atoms
				}
			};

			const geometryAtoms = build.geometryAtoms;
			const geometryBonds = build.geometryBonds;

			const verticesAtoms = [];
			const colorsAtoms = [];
			const verticesBonds = [];

			// atoms

			for ( let i = 0, l = atoms.length; i < l; i ++ ) {

				const atom = atoms[ i ];

				const x = atom[ 0 ];
				const y = atom[ 1 ];
				const z = atom[ 2 ];

				verticesAtoms.push( x, y, z );

				const r = atom[ 3 ][ 0 ] / 255;
				const g = atom[ 3 ][ 1 ] / 255;
				const b = atom[ 3 ][ 2 ] / 255;

				colorsAtoms.push( r, g, b );

			}

			// bonds

			for ( let i = 0, l = _bonds.length; i < l; i ++ ) {

				const bond = _bonds[ i ];

				const start = bond[ 0 ];
				const end = bond[ 1 ];

				const startAtom = _atomMap[ start ];
				const endAtom = _atomMap[ end ];

				let x = startAtom[ 0 ];
				let y = startAtom[ 1 ];
				let z = startAtom[ 2 ];

				verticesBonds.push( x, y, z );

				x = endAtom[ 0 ];
				y = endAtom[ 1 ];
				z = endAtom[ 2 ];

				verticesBonds.push( x, y, z );

			}

			// build geometry

			geometryAtoms.setAttribute( 'position', new three__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute( verticesAtoms, 3 ) );
			geometryAtoms.setAttribute( 'color', new three__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute( colorsAtoms, 3 ) );

			geometryBonds.setAttribute( 'position', new three__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute( verticesBonds, 3 ) );

			return build;

		}

		const CPK = { h: [ 255, 255, 255 ], he: [ 217, 255, 255 ], li: [ 204, 128, 255 ], be: [ 194, 255, 0 ], b: [ 255, 181, 181 ], c: [ 144, 144, 144 ], n: [ 48, 80, 248 ], o: [ 255, 13, 13 ], f: [ 144, 224, 80 ], ne: [ 179, 227, 245 ], na: [ 171, 92, 242 ], mg: [ 138, 255, 0 ], al: [ 191, 166, 166 ], si: [ 240, 200, 160 ], p: [ 255, 128, 0 ], s: [ 255, 255, 48 ], cl: [ 31, 240, 31 ], ar: [ 128, 209, 227 ], k: [ 143, 64, 212 ], ca: [ 61, 255, 0 ], sc: [ 230, 230, 230 ], ti: [ 191, 194, 199 ], v: [ 166, 166, 171 ], cr: [ 138, 153, 199 ], mn: [ 156, 122, 199 ], fe: [ 224, 102, 51 ], co: [ 240, 144, 160 ], ni: [ 80, 208, 80 ], cu: [ 200, 128, 51 ], zn: [ 125, 128, 176 ], ga: [ 194, 143, 143 ], ge: [ 102, 143, 143 ], as: [ 189, 128, 227 ], se: [ 255, 161, 0 ], br: [ 166, 41, 41 ], kr: [ 92, 184, 209 ], rb: [ 112, 46, 176 ], sr: [ 0, 255, 0 ], y: [ 148, 255, 255 ], zr: [ 148, 224, 224 ], nb: [ 115, 194, 201 ], mo: [ 84, 181, 181 ], tc: [ 59, 158, 158 ], ru: [ 36, 143, 143 ], rh: [ 10, 125, 140 ], pd: [ 0, 105, 133 ], ag: [ 192, 192, 192 ], cd: [ 255, 217, 143 ], in: [ 166, 117, 115 ], sn: [ 102, 128, 128 ], sb: [ 158, 99, 181 ], te: [ 212, 122, 0 ], i: [ 148, 0, 148 ], xe: [ 66, 158, 176 ], cs: [ 87, 23, 143 ], ba: [ 0, 201, 0 ], la: [ 112, 212, 255 ], ce: [ 255, 255, 199 ], pr: [ 217, 255, 199 ], nd: [ 199, 255, 199 ], pm: [ 163, 255, 199 ], sm: [ 143, 255, 199 ], eu: [ 97, 255, 199 ], gd: [ 69, 255, 199 ], tb: [ 48, 255, 199 ], dy: [ 31, 255, 199 ], ho: [ 0, 255, 156 ], er: [ 0, 230, 117 ], tm: [ 0, 212, 82 ], yb: [ 0, 191, 56 ], lu: [ 0, 171, 36 ], hf: [ 77, 194, 255 ], ta: [ 77, 166, 255 ], w: [ 33, 148, 214 ], re: [ 38, 125, 171 ], os: [ 38, 102, 150 ], ir: [ 23, 84, 135 ], pt: [ 208, 208, 224 ], au: [ 255, 209, 35 ], hg: [ 184, 184, 208 ], tl: [ 166, 84, 77 ], pb: [ 87, 89, 97 ], bi: [ 158, 79, 181 ], po: [ 171, 92, 0 ], at: [ 117, 79, 69 ], rn: [ 66, 130, 150 ], fr: [ 66, 0, 102 ], ra: [ 0, 125, 0 ], ac: [ 112, 171, 250 ], th: [ 0, 186, 255 ], pa: [ 0, 161, 255 ], u: [ 0, 143, 255 ], np: [ 0, 128, 255 ], pu: [ 0, 107, 255 ], am: [ 84, 92, 242 ], cm: [ 120, 92, 227 ], bk: [ 138, 79, 227 ], cf: [ 161, 54, 212 ], es: [ 179, 31, 212 ], fm: [ 179, 31, 186 ], md: [ 179, 13, 166 ], no: [ 189, 13, 135 ], lr: [ 199, 0, 102 ], rf: [ 204, 0, 89 ], db: [ 209, 0, 79 ], sg: [ 217, 0, 69 ], bh: [ 224, 0, 56 ], hs: [ 230, 0, 46 ], mt: [ 235, 0, 38 ], ds: [ 235, 0, 38 ], rg: [ 235, 0, 38 ], cn: [ 235, 0, 38 ], uut: [ 235, 0, 38 ], uuq: [ 235, 0, 38 ], uup: [ 235, 0, 38 ], uuh: [ 235, 0, 38 ], uus: [ 235, 0, 38 ], uuo: [ 235, 0, 38 ] };

		const atoms = [];

		const _bonds = [];
		const _bhash = {};
		const _atomMap = {};

		// parse

		const lines = text.split( '\n' );

		for ( let i = 0, l = lines.length; i < l; i ++ ) {

			if ( lines[ i ].slice( 0, 4 ) === 'ATOM' || lines[ i ].slice( 0, 6 ) === 'HETATM' ) {

				const x = parseFloat( lines[ i ].slice( 30, 37 ) );
				const y = parseFloat( lines[ i ].slice( 38, 45 ) );
				const z = parseFloat( lines[ i ].slice( 46, 53 ) );
				const index = parseInt( lines[ i ].slice( 6, 11 ) ) - 1;

				let e = trim( lines[ i ].slice( 76, 78 ) ).toLowerCase();

				if ( e === '' ) {

					e = trim( lines[ i ].slice( 12, 14 ) ).toLowerCase();

				}

				const atomData = [ x, y, z, CPK[ e ], capitalize( e ) ];

				atoms.push( atomData );
				_atomMap[ index ] = atomData;

			} else if ( lines[ i ].slice( 0, 6 ) === 'CONECT' ) {

				const satom = parseInt( lines[ i ].slice( 6, 11 ) );

				parseBond( 11, 5, satom, i );
				parseBond( 16, 5, satom, i );
				parseBond( 21, 5, satom, i );
				parseBond( 26, 5, satom, i );

			}

		}

		// build and return geometry

		return buildGeometry();

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
/******/ 			"load-pdb": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","samples_chapters_chapter-8_util_standard-scene_js"], () => (__webpack_require__("./samples/chapters/chapter-8/load-pdb.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1dBQ0EsS0FBSztXQUNMO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFOzs7OztXQzNCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdELEU7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBLDRHOzs7OztVRWhEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItOC9sb2FkLXBkYi5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL25vZGVfbW9kdWxlcy90aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9QREJMb2FkZXIuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBib290c3RyYXBNZXNoU2NlbmUgfSBmcm9tICcuL3V0aWwvc3RhbmRhcmQtc2NlbmUnXG5pbXBvcnQgeyBQREJMb2FkZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9QREJMb2FkZXInXG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcblxuY29uc3QgbW9kZWxBc3luYyA9ICgpID0+IHtcbiAgcmV0dXJuIG5ldyBQREJMb2FkZXIoKS5sb2FkQXN5bmMoJy9hc3NldHMvbW9kZWxzL21vbGVjdWxlcy9kaWFtb25kLnBkYicpLnRoZW4oKGdlb21ldHJpZXMpID0+IHtcbiAgICB2YXIgZ3JvdXAgPSBuZXcgVEhSRUUuT2JqZWN0M0QoKVxuXG4gICAgLy8gY3JlYXRlIHRoZSBhdG9tc1xuICAgIGNvbnN0IGdlb21ldHJ5QXRvbXMgPSBnZW9tZXRyaWVzLmdlb21ldHJ5QXRvbXNcbiAgICBjb25zb2xlLmxvZyhnZW9tZXRyeUF0b21zKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2VvbWV0cnlBdG9tcy5hdHRyaWJ1dGVzLnBvc2l0aW9uLmNvdW50OyBpKyspIHtcbiAgICAgIGxldCBzdGFydFBvc2l0aW9uID0gbmV3IFRIUkVFLlZlY3RvcjMoKVxuICAgICAgc3RhcnRQb3NpdGlvbi54ID0gZ2VvbWV0cnlBdG9tcy5hdHRyaWJ1dGVzLnBvc2l0aW9uLmdldFgoaSlcbiAgICAgIHN0YXJ0UG9zaXRpb24ueSA9IGdlb21ldHJ5QXRvbXMuYXR0cmlidXRlcy5wb3NpdGlvbi5nZXRZKGkpXG4gICAgICBzdGFydFBvc2l0aW9uLnogPSBnZW9tZXRyeUF0b21zLmF0dHJpYnV0ZXMucG9zaXRpb24uZ2V0WihpKVxuXG4gICAgICBsZXQgY29sb3IgPSBuZXcgVEhSRUUuQ29sb3IoKVxuICAgICAgY29sb3IuciA9IGdlb21ldHJ5QXRvbXMuYXR0cmlidXRlcy5jb2xvci5nZXRYKGkpXG4gICAgICBjb2xvci5nID0gZ2VvbWV0cnlBdG9tcy5hdHRyaWJ1dGVzLmNvbG9yLmdldFkoaSlcbiAgICAgIGNvbG9yLmIgPSBnZW9tZXRyeUF0b21zLmF0dHJpYnV0ZXMuY29sb3IuZ2V0WihpKVxuXG4gICAgICBsZXQgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwoe1xuICAgICAgICBjb2xvcjogY29sb3JcbiAgICAgIH0pXG5cbiAgICAgIGxldCBzcGhlcmUgPSBuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoMC4yKVxuICAgICAgbGV0IG1lc2ggPSBuZXcgVEhSRUUuTWVzaChzcGhlcmUsIG1hdGVyaWFsKVxuICAgICAgbWVzaC5wb3NpdGlvbi5jb3B5KHN0YXJ0UG9zaXRpb24pXG4gICAgICBncm91cC5hZGQobWVzaClcbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgdGhlIGJpbmRpbmdzXG4gICAgY29uc3QgZ2VvbWV0cnlCb25kcyA9IGdlb21ldHJpZXMuZ2VvbWV0cnlCb25kc1xuXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBnZW9tZXRyeUJvbmRzLmF0dHJpYnV0ZXMucG9zaXRpb24uY291bnQ7IGogKz0gMikge1xuICAgICAgbGV0IHN0YXJ0UG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygpXG4gICAgICBzdGFydFBvc2l0aW9uLnggPSBnZW9tZXRyeUJvbmRzLmF0dHJpYnV0ZXMucG9zaXRpb24uZ2V0WChqKVxuICAgICAgc3RhcnRQb3NpdGlvbi55ID0gZ2VvbWV0cnlCb25kcy5hdHRyaWJ1dGVzLnBvc2l0aW9uLmdldFkoailcbiAgICAgIHN0YXJ0UG9zaXRpb24ueiA9IGdlb21ldHJ5Qm9uZHMuYXR0cmlidXRlcy5wb3NpdGlvbi5nZXRaKGopXG5cbiAgICAgIGxldCBlbmRQb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKClcbiAgICAgIGVuZFBvc2l0aW9uLnggPSBnZW9tZXRyeUJvbmRzLmF0dHJpYnV0ZXMucG9zaXRpb24uZ2V0WChqICsgMSlcbiAgICAgIGVuZFBvc2l0aW9uLnkgPSBnZW9tZXRyeUJvbmRzLmF0dHJpYnV0ZXMucG9zaXRpb24uZ2V0WShqICsgMSlcbiAgICAgIGVuZFBvc2l0aW9uLnogPSBnZW9tZXRyeUJvbmRzLmF0dHJpYnV0ZXMucG9zaXRpb24uZ2V0WihqICsgMSlcblxuICAgICAgLy8gdXNlIHRoZSBzdGFydCBhbmQgZW5kIHRvIGNyZWF0ZSBhIGN1cnZlLCBhbmQgdXNlIHRoZSBjdXJ2ZSB0byBkcmF3XG4gICAgICAvLyBhIHR1YmUsIHdoaWNoIGNvbm5lY3RzIHRoZSBhdG9tc1xuICAgICAgbGV0IHBhdGggPSBuZXcgVEhSRUUuQ2F0bXVsbFJvbUN1cnZlMyhbc3RhcnRQb3NpdGlvbiwgZW5kUG9zaXRpb25dKVxuICAgICAgbGV0IHR1YmUgPSBuZXcgVEhSRUUuVHViZUdlb21ldHJ5KHBhdGgsIDEsIDAuMDQpXG4gICAgICBsZXQgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwoe1xuICAgICAgICBjb2xvcjogMHhjY2NjY2NcbiAgICAgIH0pXG4gICAgICBsZXQgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKHR1YmUsIG1hdGVyaWFsKVxuICAgICAgZ3JvdXAuYWRkKG1lc2gpXG4gICAgfVxuXG4gICAgZ3JvdXAuc2NhbGUuc2V0KDAuNSwgMC41LCAwLjUpXG4gICAgcmV0dXJuIGdyb3VwXG4gIH0pXG59XG5cbmJvb3RzdHJhcE1lc2hTY2VuZSh7XG4gIGxvYWRNZXNoOiBtb2RlbEFzeW5jLFxuICBoaWRlZmxvb3I6IHRydWVcbn0pLnRoZW4oKVxuIiwiaW1wb3J0IHtcblx0QnVmZmVyR2VvbWV0cnksXG5cdEZpbGVMb2FkZXIsXG5cdEZsb2F0MzJCdWZmZXJBdHRyaWJ1dGUsXG5cdExvYWRlclxufSBmcm9tICd0aHJlZSc7XG5cbmNsYXNzIFBEQkxvYWRlciBleHRlbmRzIExvYWRlciB7XG5cblx0Y29uc3RydWN0b3IoIG1hbmFnZXIgKSB7XG5cblx0XHRzdXBlciggbWFuYWdlciApO1xuXG5cdH1cblxuXHRsb2FkKCB1cmwsIG9uTG9hZCwgb25Qcm9ncmVzcywgb25FcnJvciApIHtcblxuXHRcdGNvbnN0IHNjb3BlID0gdGhpcztcblxuXHRcdGNvbnN0IGxvYWRlciA9IG5ldyBGaWxlTG9hZGVyKCBzY29wZS5tYW5hZ2VyICk7XG5cdFx0bG9hZGVyLnNldFBhdGgoIHNjb3BlLnBhdGggKTtcblx0XHRsb2FkZXIuc2V0UmVxdWVzdEhlYWRlciggc2NvcGUucmVxdWVzdEhlYWRlciApO1xuXHRcdGxvYWRlci5zZXRXaXRoQ3JlZGVudGlhbHMoIHNjb3BlLndpdGhDcmVkZW50aWFscyApO1xuXHRcdGxvYWRlci5sb2FkKCB1cmwsIGZ1bmN0aW9uICggdGV4dCApIHtcblxuXHRcdFx0dHJ5IHtcblxuXHRcdFx0XHRvbkxvYWQoIHNjb3BlLnBhcnNlKCB0ZXh0ICkgKTtcblxuXHRcdFx0fSBjYXRjaCAoIGUgKSB7XG5cblx0XHRcdFx0aWYgKCBvbkVycm9yICkge1xuXG5cdFx0XHRcdFx0b25FcnJvciggZSApO1xuXG5cdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKCBlICk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHNjb3BlLm1hbmFnZXIuaXRlbUVycm9yKCB1cmwgKTtcblxuXHRcdFx0fVxuXG5cdFx0fSwgb25Qcm9ncmVzcywgb25FcnJvciApO1xuXG5cdH1cblxuXHQvLyBCYXNlZCBvbiBDYW52YXNNb2wgUERCIHBhcnNlclxuXG5cdHBhcnNlKCB0ZXh0ICkge1xuXG5cdFx0ZnVuY3Rpb24gdHJpbSggdGV4dCApIHtcblxuXHRcdFx0cmV0dXJuIHRleHQucmVwbGFjZSggL15cXHNcXHMqLywgJycgKS5yZXBsYWNlKCAvXFxzXFxzKiQvLCAnJyApO1xuXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gY2FwaXRhbGl6ZSggdGV4dCApIHtcblxuXHRcdFx0cmV0dXJuIHRleHQuY2hhckF0KCAwICkudG9VcHBlckNhc2UoKSArIHRleHQuc2xpY2UoIDEgKS50b0xvd2VyQ2FzZSgpO1xuXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gaGFzaCggcywgZSApIHtcblxuXHRcdFx0cmV0dXJuICdzJyArIE1hdGgubWluKCBzLCBlICkgKyAnZScgKyBNYXRoLm1heCggcywgZSApO1xuXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gcGFyc2VCb25kKCBzdGFydCwgbGVuZ3RoLCBzYXRvbSwgaSApIHtcblxuXHRcdFx0Y29uc3QgZWF0b20gPSBwYXJzZUludCggbGluZXNbIGkgXS5zbGljZSggc3RhcnQsIHN0YXJ0ICsgbGVuZ3RoICkgKTtcblxuXHRcdFx0aWYgKCBlYXRvbSApIHtcblxuXHRcdFx0XHRjb25zdCBoID0gaGFzaCggc2F0b20sIGVhdG9tICk7XG5cblx0XHRcdFx0aWYgKCBfYmhhc2hbIGggXSA9PT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRcdFx0X2JvbmRzLnB1c2goIFsgc2F0b20gLSAxLCBlYXRvbSAtIDEsIDEgXSApO1xuXHRcdFx0XHRcdF9iaGFzaFsgaCBdID0gX2JvbmRzLmxlbmd0aCAtIDE7XG5cblx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdC8vIGRvZXNuJ3QgcmVhbGx5IHdvcmsgYXMgYWxtb3N0IGFsbCBQREJzXG5cdFx0XHRcdFx0Ly8gaGF2ZSBqdXN0IG5vcm1hbCBib25kcyBhcHBlYXJpbmcgbXVsdGlwbGVcblx0XHRcdFx0XHQvLyB0aW1lcyBpbnN0ZWFkIG9mIGJlaW5nIGRvdWJsZS90cmlwbGUgYm9uZHNcblx0XHRcdFx0XHQvLyBib25kc1tiaGFzaFtoXV1bMl0gKz0gMTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGJ1aWxkR2VvbWV0cnkoKSB7XG5cblx0XHRcdGNvbnN0IGJ1aWxkID0ge1xuXHRcdFx0XHRnZW9tZXRyeUF0b21zOiBuZXcgQnVmZmVyR2VvbWV0cnkoKSxcblx0XHRcdFx0Z2VvbWV0cnlCb25kczogbmV3IEJ1ZmZlckdlb21ldHJ5KCksXG5cdFx0XHRcdGpzb246IHtcblx0XHRcdFx0XHRhdG9tczogYXRvbXNcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0Y29uc3QgZ2VvbWV0cnlBdG9tcyA9IGJ1aWxkLmdlb21ldHJ5QXRvbXM7XG5cdFx0XHRjb25zdCBnZW9tZXRyeUJvbmRzID0gYnVpbGQuZ2VvbWV0cnlCb25kcztcblxuXHRcdFx0Y29uc3QgdmVydGljZXNBdG9tcyA9IFtdO1xuXHRcdFx0Y29uc3QgY29sb3JzQXRvbXMgPSBbXTtcblx0XHRcdGNvbnN0IHZlcnRpY2VzQm9uZHMgPSBbXTtcblxuXHRcdFx0Ly8gYXRvbXNcblxuXHRcdFx0Zm9yICggbGV0IGkgPSAwLCBsID0gYXRvbXMubGVuZ3RoOyBpIDwgbDsgaSArKyApIHtcblxuXHRcdFx0XHRjb25zdCBhdG9tID0gYXRvbXNbIGkgXTtcblxuXHRcdFx0XHRjb25zdCB4ID0gYXRvbVsgMCBdO1xuXHRcdFx0XHRjb25zdCB5ID0gYXRvbVsgMSBdO1xuXHRcdFx0XHRjb25zdCB6ID0gYXRvbVsgMiBdO1xuXG5cdFx0XHRcdHZlcnRpY2VzQXRvbXMucHVzaCggeCwgeSwgeiApO1xuXG5cdFx0XHRcdGNvbnN0IHIgPSBhdG9tWyAzIF1bIDAgXSAvIDI1NTtcblx0XHRcdFx0Y29uc3QgZyA9IGF0b21bIDMgXVsgMSBdIC8gMjU1O1xuXHRcdFx0XHRjb25zdCBiID0gYXRvbVsgMyBdWyAyIF0gLyAyNTU7XG5cblx0XHRcdFx0Y29sb3JzQXRvbXMucHVzaCggciwgZywgYiApO1xuXG5cdFx0XHR9XG5cblx0XHRcdC8vIGJvbmRzXG5cblx0XHRcdGZvciAoIGxldCBpID0gMCwgbCA9IF9ib25kcy5sZW5ndGg7IGkgPCBsOyBpICsrICkge1xuXG5cdFx0XHRcdGNvbnN0IGJvbmQgPSBfYm9uZHNbIGkgXTtcblxuXHRcdFx0XHRjb25zdCBzdGFydCA9IGJvbmRbIDAgXTtcblx0XHRcdFx0Y29uc3QgZW5kID0gYm9uZFsgMSBdO1xuXG5cdFx0XHRcdGNvbnN0IHN0YXJ0QXRvbSA9IF9hdG9tTWFwWyBzdGFydCBdO1xuXHRcdFx0XHRjb25zdCBlbmRBdG9tID0gX2F0b21NYXBbIGVuZCBdO1xuXG5cdFx0XHRcdGxldCB4ID0gc3RhcnRBdG9tWyAwIF07XG5cdFx0XHRcdGxldCB5ID0gc3RhcnRBdG9tWyAxIF07XG5cdFx0XHRcdGxldCB6ID0gc3RhcnRBdG9tWyAyIF07XG5cblx0XHRcdFx0dmVydGljZXNCb25kcy5wdXNoKCB4LCB5LCB6ICk7XG5cblx0XHRcdFx0eCA9IGVuZEF0b21bIDAgXTtcblx0XHRcdFx0eSA9IGVuZEF0b21bIDEgXTtcblx0XHRcdFx0eiA9IGVuZEF0b21bIDIgXTtcblxuXHRcdFx0XHR2ZXJ0aWNlc0JvbmRzLnB1c2goIHgsIHksIHogKTtcblxuXHRcdFx0fVxuXG5cdFx0XHQvLyBidWlsZCBnZW9tZXRyeVxuXG5cdFx0XHRnZW9tZXRyeUF0b21zLnNldEF0dHJpYnV0ZSggJ3Bvc2l0aW9uJywgbmV3IEZsb2F0MzJCdWZmZXJBdHRyaWJ1dGUoIHZlcnRpY2VzQXRvbXMsIDMgKSApO1xuXHRcdFx0Z2VvbWV0cnlBdG9tcy5zZXRBdHRyaWJ1dGUoICdjb2xvcicsIG5ldyBGbG9hdDMyQnVmZmVyQXR0cmlidXRlKCBjb2xvcnNBdG9tcywgMyApICk7XG5cblx0XHRcdGdlb21ldHJ5Qm9uZHMuc2V0QXR0cmlidXRlKCAncG9zaXRpb24nLCBuZXcgRmxvYXQzMkJ1ZmZlckF0dHJpYnV0ZSggdmVydGljZXNCb25kcywgMyApICk7XG5cblx0XHRcdHJldHVybiBidWlsZDtcblxuXHRcdH1cblxuXHRcdGNvbnN0IENQSyA9IHsgaDogWyAyNTUsIDI1NSwgMjU1IF0sIGhlOiBbIDIxNywgMjU1LCAyNTUgXSwgbGk6IFsgMjA0LCAxMjgsIDI1NSBdLCBiZTogWyAxOTQsIDI1NSwgMCBdLCBiOiBbIDI1NSwgMTgxLCAxODEgXSwgYzogWyAxNDQsIDE0NCwgMTQ0IF0sIG46IFsgNDgsIDgwLCAyNDggXSwgbzogWyAyNTUsIDEzLCAxMyBdLCBmOiBbIDE0NCwgMjI0LCA4MCBdLCBuZTogWyAxNzksIDIyNywgMjQ1IF0sIG5hOiBbIDE3MSwgOTIsIDI0MiBdLCBtZzogWyAxMzgsIDI1NSwgMCBdLCBhbDogWyAxOTEsIDE2NiwgMTY2IF0sIHNpOiBbIDI0MCwgMjAwLCAxNjAgXSwgcDogWyAyNTUsIDEyOCwgMCBdLCBzOiBbIDI1NSwgMjU1LCA0OCBdLCBjbDogWyAzMSwgMjQwLCAzMSBdLCBhcjogWyAxMjgsIDIwOSwgMjI3IF0sIGs6IFsgMTQzLCA2NCwgMjEyIF0sIGNhOiBbIDYxLCAyNTUsIDAgXSwgc2M6IFsgMjMwLCAyMzAsIDIzMCBdLCB0aTogWyAxOTEsIDE5NCwgMTk5IF0sIHY6IFsgMTY2LCAxNjYsIDE3MSBdLCBjcjogWyAxMzgsIDE1MywgMTk5IF0sIG1uOiBbIDE1NiwgMTIyLCAxOTkgXSwgZmU6IFsgMjI0LCAxMDIsIDUxIF0sIGNvOiBbIDI0MCwgMTQ0LCAxNjAgXSwgbmk6IFsgODAsIDIwOCwgODAgXSwgY3U6IFsgMjAwLCAxMjgsIDUxIF0sIHpuOiBbIDEyNSwgMTI4LCAxNzYgXSwgZ2E6IFsgMTk0LCAxNDMsIDE0MyBdLCBnZTogWyAxMDIsIDE0MywgMTQzIF0sIGFzOiBbIDE4OSwgMTI4LCAyMjcgXSwgc2U6IFsgMjU1LCAxNjEsIDAgXSwgYnI6IFsgMTY2LCA0MSwgNDEgXSwga3I6IFsgOTIsIDE4NCwgMjA5IF0sIHJiOiBbIDExMiwgNDYsIDE3NiBdLCBzcjogWyAwLCAyNTUsIDAgXSwgeTogWyAxNDgsIDI1NSwgMjU1IF0sIHpyOiBbIDE0OCwgMjI0LCAyMjQgXSwgbmI6IFsgMTE1LCAxOTQsIDIwMSBdLCBtbzogWyA4NCwgMTgxLCAxODEgXSwgdGM6IFsgNTksIDE1OCwgMTU4IF0sIHJ1OiBbIDM2LCAxNDMsIDE0MyBdLCByaDogWyAxMCwgMTI1LCAxNDAgXSwgcGQ6IFsgMCwgMTA1LCAxMzMgXSwgYWc6IFsgMTkyLCAxOTIsIDE5MiBdLCBjZDogWyAyNTUsIDIxNywgMTQzIF0sIGluOiBbIDE2NiwgMTE3LCAxMTUgXSwgc246IFsgMTAyLCAxMjgsIDEyOCBdLCBzYjogWyAxNTgsIDk5LCAxODEgXSwgdGU6IFsgMjEyLCAxMjIsIDAgXSwgaTogWyAxNDgsIDAsIDE0OCBdLCB4ZTogWyA2NiwgMTU4LCAxNzYgXSwgY3M6IFsgODcsIDIzLCAxNDMgXSwgYmE6IFsgMCwgMjAxLCAwIF0sIGxhOiBbIDExMiwgMjEyLCAyNTUgXSwgY2U6IFsgMjU1LCAyNTUsIDE5OSBdLCBwcjogWyAyMTcsIDI1NSwgMTk5IF0sIG5kOiBbIDE5OSwgMjU1LCAxOTkgXSwgcG06IFsgMTYzLCAyNTUsIDE5OSBdLCBzbTogWyAxNDMsIDI1NSwgMTk5IF0sIGV1OiBbIDk3LCAyNTUsIDE5OSBdLCBnZDogWyA2OSwgMjU1LCAxOTkgXSwgdGI6IFsgNDgsIDI1NSwgMTk5IF0sIGR5OiBbIDMxLCAyNTUsIDE5OSBdLCBobzogWyAwLCAyNTUsIDE1NiBdLCBlcjogWyAwLCAyMzAsIDExNyBdLCB0bTogWyAwLCAyMTIsIDgyIF0sIHliOiBbIDAsIDE5MSwgNTYgXSwgbHU6IFsgMCwgMTcxLCAzNiBdLCBoZjogWyA3NywgMTk0LCAyNTUgXSwgdGE6IFsgNzcsIDE2NiwgMjU1IF0sIHc6IFsgMzMsIDE0OCwgMjE0IF0sIHJlOiBbIDM4LCAxMjUsIDE3MSBdLCBvczogWyAzOCwgMTAyLCAxNTAgXSwgaXI6IFsgMjMsIDg0LCAxMzUgXSwgcHQ6IFsgMjA4LCAyMDgsIDIyNCBdLCBhdTogWyAyNTUsIDIwOSwgMzUgXSwgaGc6IFsgMTg0LCAxODQsIDIwOCBdLCB0bDogWyAxNjYsIDg0LCA3NyBdLCBwYjogWyA4NywgODksIDk3IF0sIGJpOiBbIDE1OCwgNzksIDE4MSBdLCBwbzogWyAxNzEsIDkyLCAwIF0sIGF0OiBbIDExNywgNzksIDY5IF0sIHJuOiBbIDY2LCAxMzAsIDE1MCBdLCBmcjogWyA2NiwgMCwgMTAyIF0sIHJhOiBbIDAsIDEyNSwgMCBdLCBhYzogWyAxMTIsIDE3MSwgMjUwIF0sIHRoOiBbIDAsIDE4NiwgMjU1IF0sIHBhOiBbIDAsIDE2MSwgMjU1IF0sIHU6IFsgMCwgMTQzLCAyNTUgXSwgbnA6IFsgMCwgMTI4LCAyNTUgXSwgcHU6IFsgMCwgMTA3LCAyNTUgXSwgYW06IFsgODQsIDkyLCAyNDIgXSwgY206IFsgMTIwLCA5MiwgMjI3IF0sIGJrOiBbIDEzOCwgNzksIDIyNyBdLCBjZjogWyAxNjEsIDU0LCAyMTIgXSwgZXM6IFsgMTc5LCAzMSwgMjEyIF0sIGZtOiBbIDE3OSwgMzEsIDE4NiBdLCBtZDogWyAxNzksIDEzLCAxNjYgXSwgbm86IFsgMTg5LCAxMywgMTM1IF0sIGxyOiBbIDE5OSwgMCwgMTAyIF0sIHJmOiBbIDIwNCwgMCwgODkgXSwgZGI6IFsgMjA5LCAwLCA3OSBdLCBzZzogWyAyMTcsIDAsIDY5IF0sIGJoOiBbIDIyNCwgMCwgNTYgXSwgaHM6IFsgMjMwLCAwLCA0NiBdLCBtdDogWyAyMzUsIDAsIDM4IF0sIGRzOiBbIDIzNSwgMCwgMzggXSwgcmc6IFsgMjM1LCAwLCAzOCBdLCBjbjogWyAyMzUsIDAsIDM4IF0sIHV1dDogWyAyMzUsIDAsIDM4IF0sIHV1cTogWyAyMzUsIDAsIDM4IF0sIHV1cDogWyAyMzUsIDAsIDM4IF0sIHV1aDogWyAyMzUsIDAsIDM4IF0sIHV1czogWyAyMzUsIDAsIDM4IF0sIHV1bzogWyAyMzUsIDAsIDM4IF0gfTtcblxuXHRcdGNvbnN0IGF0b21zID0gW107XG5cblx0XHRjb25zdCBfYm9uZHMgPSBbXTtcblx0XHRjb25zdCBfYmhhc2ggPSB7fTtcblx0XHRjb25zdCBfYXRvbU1hcCA9IHt9O1xuXG5cdFx0Ly8gcGFyc2VcblxuXHRcdGNvbnN0IGxpbmVzID0gdGV4dC5zcGxpdCggJ1xcbicgKTtcblxuXHRcdGZvciAoIGxldCBpID0gMCwgbCA9IGxpbmVzLmxlbmd0aDsgaSA8IGw7IGkgKysgKSB7XG5cblx0XHRcdGlmICggbGluZXNbIGkgXS5zbGljZSggMCwgNCApID09PSAnQVRPTScgfHwgbGluZXNbIGkgXS5zbGljZSggMCwgNiApID09PSAnSEVUQVRNJyApIHtcblxuXHRcdFx0XHRjb25zdCB4ID0gcGFyc2VGbG9hdCggbGluZXNbIGkgXS5zbGljZSggMzAsIDM3ICkgKTtcblx0XHRcdFx0Y29uc3QgeSA9IHBhcnNlRmxvYXQoIGxpbmVzWyBpIF0uc2xpY2UoIDM4LCA0NSApICk7XG5cdFx0XHRcdGNvbnN0IHogPSBwYXJzZUZsb2F0KCBsaW5lc1sgaSBdLnNsaWNlKCA0NiwgNTMgKSApO1xuXHRcdFx0XHRjb25zdCBpbmRleCA9IHBhcnNlSW50KCBsaW5lc1sgaSBdLnNsaWNlKCA2LCAxMSApICkgLSAxO1xuXG5cdFx0XHRcdGxldCBlID0gdHJpbSggbGluZXNbIGkgXS5zbGljZSggNzYsIDc4ICkgKS50b0xvd2VyQ2FzZSgpO1xuXG5cdFx0XHRcdGlmICggZSA9PT0gJycgKSB7XG5cblx0XHRcdFx0XHRlID0gdHJpbSggbGluZXNbIGkgXS5zbGljZSggMTIsIDE0ICkgKS50b0xvd2VyQ2FzZSgpO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb25zdCBhdG9tRGF0YSA9IFsgeCwgeSwgeiwgQ1BLWyBlIF0sIGNhcGl0YWxpemUoIGUgKSBdO1xuXG5cdFx0XHRcdGF0b21zLnB1c2goIGF0b21EYXRhICk7XG5cdFx0XHRcdF9hdG9tTWFwWyBpbmRleCBdID0gYXRvbURhdGE7XG5cblx0XHRcdH0gZWxzZSBpZiAoIGxpbmVzWyBpIF0uc2xpY2UoIDAsIDYgKSA9PT0gJ0NPTkVDVCcgKSB7XG5cblx0XHRcdFx0Y29uc3Qgc2F0b20gPSBwYXJzZUludCggbGluZXNbIGkgXS5zbGljZSggNiwgMTEgKSApO1xuXG5cdFx0XHRcdHBhcnNlQm9uZCggMTEsIDUsIHNhdG9tLCBpICk7XG5cdFx0XHRcdHBhcnNlQm9uZCggMTYsIDUsIHNhdG9tLCBpICk7XG5cdFx0XHRcdHBhcnNlQm9uZCggMjEsIDUsIHNhdG9tLCBpICk7XG5cdFx0XHRcdHBhcnNlQm9uZCggMjYsIDUsIHNhdG9tLCBpICk7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdC8vIGJ1aWxkIGFuZCByZXR1cm4gZ2VvbWV0cnlcblxuXHRcdHJldHVybiBidWlsZEdlb21ldHJ5KCk7XG5cblx0fVxuXG59XG5cbmV4cG9ydCB7IFBEQkxvYWRlciB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJsb2FkLXBkYlwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtsdGpzX2ZvdXJ0aFwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtsdGpzX2ZvdXJ0aFwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfYnVpbGRfdGhyZWVfbW9kdWxlX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fY29udHJvbHNfT3JiaXRDb250cm9sc19qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfbGlsLWd1aV9kaXN0X2xpbC1ndWlfZXNtX2pzXCIsXCJzYW1wbGVzX2NoYXB0ZXJzX2NoYXB0ZXItOF91dGlsX3N0YW5kYXJkLXNjZW5lX2pzXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTgvbG9hZC1wZGIuanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
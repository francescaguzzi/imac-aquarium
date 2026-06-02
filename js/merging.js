/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./samples/chapters/chapter-8/merging.js"
/*!***********************************************!*\
  !*** ./samples/chapters/chapter-8/merging.js ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_standard_scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/standard-scene */ "./samples/chapters/chapter-8/util/standard-scene.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_libs_stats_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/libs/stats.module */ "./node_modules/three/examples/jsm/libs/stats.module.js");
/* harmony import */ var _controls_mesh_controls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../controls/mesh-controls */ "./samples/controls/mesh-controls.js");
/* harmony import */ var three_examples_jsm_utils_BufferGeometryUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three/examples/jsm/utils/BufferGeometryUtils */ "./node_modules/three/examples/jsm/utils/BufferGeometryUtils.js");






const stats = (0,three_examples_jsm_libs_stats_module__WEBPACK_IMPORTED_MODULE_2__["default"])()
document.body.appendChild(stats.dom)

three_examples_jsm_utils_BufferGeometryUtils__WEBPACK_IMPORTED_MODULE_4__

const modelAsync = () => {
  const size = 1
  const amount = 500000
  const range = 20

  const mat = new three__WEBPACK_IMPORTED_MODULE_1__.MeshNormalMaterial()
  mat.blending = three__WEBPACK_IMPORTED_MODULE_1__.NormalBlending
  mat.opacity = 0.1
  mat.transparent = true

  const geoms = []

  for (let i = 0; i < amount; i++) {
    const x = Math.random() * range - range / 2
    const y = Math.random() * range - range / 2
    const z = Math.random() * range - range / 2

    const g = new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(size, size, size)
    g.translate(x, y, z)
    geoms.push(g)
  }

  const merged = three_examples_jsm_utils_BufferGeometryUtils__WEBPACK_IMPORTED_MODULE_4__.mergeBufferGeometries(geoms)
  const mesh = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(merged, mat)

  return mesh
}

;(0,_util_standard_scene__WEBPACK_IMPORTED_MODULE_0__.bootstrapMeshScene)({
  loadMesh: modelAsync,
  hidefloor: true,
  onRender: () => stats.update(),
  backgroundColor: 0x000000,
  provideGui: (gui, mesh) => {
    ;(0,_controls_mesh_controls__WEBPACK_IMPORTED_MODULE_3__.addMeshProperties)(gui, mesh, 'Group')
  }
}).then()


/***/ },

/***/ "./samples/controls/mesh-controls.js"
/*!*******************************************!*\
  !*** ./samples/controls/mesh-controls.js ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addMeshProperties: () => (/* binding */ addMeshProperties)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");


const addMeshProperties = (gui, mesh, title) => {
  const props = {
    scaleX: mesh.scale.x,
    scaleY: mesh.scale.y,
    scaleZ: mesh.scale.z,
    rotationX: mesh.rotation.x,
    rotationY: mesh.rotation.y,
    rotationZ: mesh.rotation.z,
    positionX: mesh.position.x,
    positionY: mesh.position.y,
    positionZ: mesh.position.z,
    translateX: 0,
    translateY: 0,
    translateZ: 0,
    translate: () => {
      mesh.translateX(props.translateX)
      mesh.translateY(props.translateY)
      mesh.translateZ(props.translateZ)
      props.positionX = mesh.position.x
      props.positionY = mesh.position.y
      props.positionZ = mesh.position.z
    },
    lookAtX: 0,
    lookAtY: 0,
    lookAtZ: 0,
    lookAt: () => {
      mesh.lookAt(props.lookAtX, props.lookAtY, props.lookAtZ)
    },
    visible: mesh.visible,
    castShadow: mesh.castShadow,
    rotateOnWorldAxisX: () => {
      mesh.rotateOnWorldAxis(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(1, 0, 0), Math.PI / 4)
    },
    rotateOnWorldAxisY: () => {
      mesh.rotateOnWorldAxis(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 1, 0), Math.PI / 4)
    },
    rotateOnWorldAxisZ: () => {
      mesh.rotateOnWorldAxis(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, 1), Math.PI / 4)
    }
  }

  const meshFolder = gui.addFolder(title)
  meshFolder.add(props, 'scaleX', 0, 5, 0.1)
  meshFolder.add(props, 'scaleY', 0, 5, 0.1)
  meshFolder.add(props, 'scaleZ', 0, 5, 0.1)
  meshFolder.add(props, 'rotationX', -Math.PI, Math.PI, 0.1)
  meshFolder.add(props, 'rotationY', -Math.PI, Math.PI, 0.1)
  meshFolder.add(props, 'rotationZ', -Math.PI, Math.PI, 0.1)
  meshFolder.add(props, 'positionX', -3, 3, 0.1).listen()
  meshFolder.add(props, 'positionY', -3, 3, 0.1).listen()
  meshFolder.add(props, 'positionZ', -3, 3, 0.1).listen()
  meshFolder.add(props, 'translateX', -3, 3, 0.1)
  meshFolder.add(props, 'translateY', -3, 3, 0.1)
  meshFolder.add(props, 'translateZ', -3, 3, 0.1)
  meshFolder.add(props, 'translate')
  meshFolder.add(props, 'lookAtX', -3, 3, 0.1)
  meshFolder.add(props, 'lookAtY', -3, 3, 0.1)
  meshFolder.add(props, 'lookAtZ', -3, 3, 0.1)
  meshFolder.add(props, 'lookAt')
  meshFolder.add(props, 'visible')
  meshFolder.add(props, 'castShadow')
  // TODO, we could add more here, or just show the axis.
  //       or just create a simple example with a parent object
  //       where we show the three different axis.
  // Also determine here if Three.js really uses object space as parent
  // https://javascript.tutorialink.com/rotate-object-on-specific-axis-anywhere-in-three-js-including-outside-of-mesh/
  meshFolder.add(props, 'rotateOnWorldAxisX')
  meshFolder.add(props, 'rotateOnWorldAxisY')
  meshFolder.add(props, 'rotateOnWorldAxisZ')
  meshFolder.onChange(() => {
    mesh.scale.set(props.scaleX, props.scaleY, props.scaleZ)
    mesh.rotation.set(props.rotationX, props.rotationY, props.rotationZ)
    mesh.position.set(props.positionX, props.positionY, props.positionZ)
    mesh.visible = props.visible
    mesh.castShadow = props.castShadow
  })
}


/***/ },

/***/ "./node_modules/three/examples/jsm/libs/stats.module.js"
/*!**************************************************************!*\
  !*** ./node_modules/three/examples/jsm/libs/stats.module.js ***!
  \**************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Stats = function () {

	var mode = 0;

	var container = document.createElement( 'div' );
	container.style.cssText = 'position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000';
	container.addEventListener( 'click', function ( event ) {

		event.preventDefault();
		showPanel( ++ mode % container.children.length );

	}, false );

	//

	function addPanel( panel ) {

		container.appendChild( panel.dom );
		return panel;

	}

	function showPanel( id ) {

		for ( var i = 0; i < container.children.length; i ++ ) {

			container.children[ i ].style.display = i === id ? 'block' : 'none';

		}

		mode = id;

	}

	//

	var beginTime = ( performance || Date ).now(), prevTime = beginTime, frames = 0;

	var fpsPanel = addPanel( new Stats.Panel( 'FPS', '#0ff', '#002' ) );
	var msPanel = addPanel( new Stats.Panel( 'MS', '#0f0', '#020' ) );

	if ( self.performance && self.performance.memory ) {

		var memPanel = addPanel( new Stats.Panel( 'MB', '#f08', '#201' ) );

	}

	showPanel( 0 );

	return {

		REVISION: 16,

		dom: container,

		addPanel: addPanel,
		showPanel: showPanel,

		begin: function () {

			beginTime = ( performance || Date ).now();

		},

		end: function () {

			frames ++;

			var time = ( performance || Date ).now();

			msPanel.update( time - beginTime, 200 );

			if ( time >= prevTime + 1000 ) {

				fpsPanel.update( ( frames * 1000 ) / ( time - prevTime ), 100 );

				prevTime = time;
				frames = 0;

				if ( memPanel ) {

					var memory = performance.memory;
					memPanel.update( memory.usedJSHeapSize / 1048576, memory.jsHeapSizeLimit / 1048576 );

				}

			}

			return time;

		},

		update: function () {

			beginTime = this.end();

		},

		// Backwards Compatibility

		domElement: container,
		setMode: showPanel

	};

};

Stats.Panel = function ( name, fg, bg ) {

	var min = Infinity, max = 0, round = Math.round;
	var PR = round( window.devicePixelRatio || 1 );

	var WIDTH = 80 * PR, HEIGHT = 48 * PR,
		TEXT_X = 3 * PR, TEXT_Y = 2 * PR,
		GRAPH_X = 3 * PR, GRAPH_Y = 15 * PR,
		GRAPH_WIDTH = 74 * PR, GRAPH_HEIGHT = 30 * PR;

	var canvas = document.createElement( 'canvas' );
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	canvas.style.cssText = 'width:80px;height:48px';

	var context = canvas.getContext( '2d' );
	context.font = 'bold ' + ( 9 * PR ) + 'px Helvetica,Arial,sans-serif';
	context.textBaseline = 'top';

	context.fillStyle = bg;
	context.fillRect( 0, 0, WIDTH, HEIGHT );

	context.fillStyle = fg;
	context.fillText( name, TEXT_X, TEXT_Y );
	context.fillRect( GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT );

	context.fillStyle = bg;
	context.globalAlpha = 0.9;
	context.fillRect( GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT );

	return {

		dom: canvas,

		update: function ( value, maxValue ) {

			min = Math.min( min, value );
			max = Math.max( max, value );

			context.fillStyle = bg;
			context.globalAlpha = 1;
			context.fillRect( 0, 0, WIDTH, GRAPH_Y );
			context.fillStyle = fg;
			context.fillText( round( value ) + ' ' + name + ' (' + round( min ) + '-' + round( max ) + ')', TEXT_X, TEXT_Y );

			context.drawImage( canvas, GRAPH_X + PR, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT, GRAPH_X, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT );

			context.fillRect( GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, GRAPH_HEIGHT );

			context.fillStyle = bg;
			context.globalAlpha = 0.9;
			context.fillRect( GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, round( ( 1 - ( value / maxValue ) ) * GRAPH_HEIGHT ) );

		}

	};

};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Stats);


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
/******/ 			"merging": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","vendors-node_modules_three_examples_jsm_utils_BufferGeometryUtils_js","samples_chapters_chapter-8_util_standard-scene_js"], () => (__webpack_require__("./samples/chapters/chapter-8/merging.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFxQjtXQUN2QztXQUNBO1dBQ0EsS0FBSztXQUNMO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFOzs7OztXQzNCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdELEU7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBLDRHOzs7OztVRWhEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItOC9tZXJnaW5nLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jb250cm9scy9tZXNoLWNvbnRyb2xzLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vbm9kZV9tb2R1bGVzL3RocmVlL2V4YW1wbGVzL2pzbS9saWJzL3N0YXRzLm1vZHVsZS5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGJvb3RzdHJhcE1lc2hTY2VuZSB9IGZyb20gJy4vdXRpbC9zdGFuZGFyZC1zY2VuZSdcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuaW1wb3J0IFN0YXRzIGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9saWJzL3N0YXRzLm1vZHVsZSdcbmltcG9ydCB7IGFkZE1lc2hQcm9wZXJ0aWVzIH0gZnJvbSAnLi4vLi4vY29udHJvbHMvbWVzaC1jb250cm9scydcbmltcG9ydCAqIGFzIEJ1ZmZlckdlb21ldHJ5VXRpbHMgZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL3V0aWxzL0J1ZmZlckdlb21ldHJ5VXRpbHMnXG5cbmNvbnN0IHN0YXRzID0gU3RhdHMoKVxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzdGF0cy5kb20pXG5cbkJ1ZmZlckdlb21ldHJ5VXRpbHNcblxuY29uc3QgbW9kZWxBc3luYyA9ICgpID0+IHtcbiAgY29uc3Qgc2l6ZSA9IDFcbiAgY29uc3QgYW1vdW50ID0gNTAwMDAwXG4gIGNvbnN0IHJhbmdlID0gMjBcblxuICBjb25zdCBtYXQgPSBuZXcgVEhSRUUuTWVzaE5vcm1hbE1hdGVyaWFsKClcbiAgbWF0LmJsZW5kaW5nID0gVEhSRUUuTm9ybWFsQmxlbmRpbmdcbiAgbWF0Lm9wYWNpdHkgPSAwLjFcbiAgbWF0LnRyYW5zcGFyZW50ID0gdHJ1ZVxuXG4gIGNvbnN0IGdlb21zID0gW11cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFtb3VudDsgaSsrKSB7XG4gICAgY29uc3QgeCA9IE1hdGgucmFuZG9tKCkgKiByYW5nZSAtIHJhbmdlIC8gMlxuICAgIGNvbnN0IHkgPSBNYXRoLnJhbmRvbSgpICogcmFuZ2UgLSByYW5nZSAvIDJcbiAgICBjb25zdCB6ID0gTWF0aC5yYW5kb20oKSAqIHJhbmdlIC0gcmFuZ2UgLyAyXG5cbiAgICBjb25zdCBnID0gbmV3IFRIUkVFLkJveEdlb21ldHJ5KHNpemUsIHNpemUsIHNpemUpXG4gICAgZy50cmFuc2xhdGUoeCwgeSwgeilcbiAgICBnZW9tcy5wdXNoKGcpXG4gIH1cblxuICBjb25zdCBtZXJnZWQgPSBCdWZmZXJHZW9tZXRyeVV0aWxzLm1lcmdlQnVmZmVyR2VvbWV0cmllcyhnZW9tcylcbiAgY29uc3QgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKG1lcmdlZCwgbWF0KVxuXG4gIHJldHVybiBtZXNoXG59XG5cbmJvb3RzdHJhcE1lc2hTY2VuZSh7XG4gIGxvYWRNZXNoOiBtb2RlbEFzeW5jLFxuICBoaWRlZmxvb3I6IHRydWUsXG4gIG9uUmVuZGVyOiAoKSA9PiBzdGF0cy51cGRhdGUoKSxcbiAgYmFja2dyb3VuZENvbG9yOiAweDAwMDAwMCxcbiAgcHJvdmlkZUd1aTogKGd1aSwgbWVzaCkgPT4ge1xuICAgIGFkZE1lc2hQcm9wZXJ0aWVzKGd1aSwgbWVzaCwgJ0dyb3VwJylcbiAgfVxufSkudGhlbigpXG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcblxuZXhwb3J0IGNvbnN0IGFkZE1lc2hQcm9wZXJ0aWVzID0gKGd1aSwgbWVzaCwgdGl0bGUpID0+IHtcbiAgY29uc3QgcHJvcHMgPSB7XG4gICAgc2NhbGVYOiBtZXNoLnNjYWxlLngsXG4gICAgc2NhbGVZOiBtZXNoLnNjYWxlLnksXG4gICAgc2NhbGVaOiBtZXNoLnNjYWxlLnosXG4gICAgcm90YXRpb25YOiBtZXNoLnJvdGF0aW9uLngsXG4gICAgcm90YXRpb25ZOiBtZXNoLnJvdGF0aW9uLnksXG4gICAgcm90YXRpb25aOiBtZXNoLnJvdGF0aW9uLnosXG4gICAgcG9zaXRpb25YOiBtZXNoLnBvc2l0aW9uLngsXG4gICAgcG9zaXRpb25ZOiBtZXNoLnBvc2l0aW9uLnksXG4gICAgcG9zaXRpb25aOiBtZXNoLnBvc2l0aW9uLnosXG4gICAgdHJhbnNsYXRlWDogMCxcbiAgICB0cmFuc2xhdGVZOiAwLFxuICAgIHRyYW5zbGF0ZVo6IDAsXG4gICAgdHJhbnNsYXRlOiAoKSA9PiB7XG4gICAgICBtZXNoLnRyYW5zbGF0ZVgocHJvcHMudHJhbnNsYXRlWClcbiAgICAgIG1lc2gudHJhbnNsYXRlWShwcm9wcy50cmFuc2xhdGVZKVxuICAgICAgbWVzaC50cmFuc2xhdGVaKHByb3BzLnRyYW5zbGF0ZVopXG4gICAgICBwcm9wcy5wb3NpdGlvblggPSBtZXNoLnBvc2l0aW9uLnhcbiAgICAgIHByb3BzLnBvc2l0aW9uWSA9IG1lc2gucG9zaXRpb24ueVxuICAgICAgcHJvcHMucG9zaXRpb25aID0gbWVzaC5wb3NpdGlvbi56XG4gICAgfSxcbiAgICBsb29rQXRYOiAwLFxuICAgIGxvb2tBdFk6IDAsXG4gICAgbG9va0F0WjogMCxcbiAgICBsb29rQXQ6ICgpID0+IHtcbiAgICAgIG1lc2gubG9va0F0KHByb3BzLmxvb2tBdFgsIHByb3BzLmxvb2tBdFksIHByb3BzLmxvb2tBdFopXG4gICAgfSxcbiAgICB2aXNpYmxlOiBtZXNoLnZpc2libGUsXG4gICAgY2FzdFNoYWRvdzogbWVzaC5jYXN0U2hhZG93LFxuICAgIHJvdGF0ZU9uV29ybGRBeGlzWDogKCkgPT4ge1xuICAgICAgbWVzaC5yb3RhdGVPbldvcmxkQXhpcyhuZXcgVEhSRUUuVmVjdG9yMygxLCAwLCAwKSwgTWF0aC5QSSAvIDQpXG4gICAgfSxcbiAgICByb3RhdGVPbldvcmxkQXhpc1k6ICgpID0+IHtcbiAgICAgIG1lc2gucm90YXRlT25Xb3JsZEF4aXMobmV3IFRIUkVFLlZlY3RvcjMoMCwgMSwgMCksIE1hdGguUEkgLyA0KVxuICAgIH0sXG4gICAgcm90YXRlT25Xb3JsZEF4aXNaOiAoKSA9PiB7XG4gICAgICBtZXNoLnJvdGF0ZU9uV29ybGRBeGlzKG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDEpLCBNYXRoLlBJIC8gNClcbiAgICB9XG4gIH1cblxuICBjb25zdCBtZXNoRm9sZGVyID0gZ3VpLmFkZEZvbGRlcih0aXRsZSlcbiAgbWVzaEZvbGRlci5hZGQocHJvcHMsICdzY2FsZVgnLCAwLCA1LCAwLjEpXG4gIG1lc2hGb2xkZXIuYWRkKHByb3BzLCAnc2NhbGVZJywgMCwgNSwgMC4xKVxuICBtZXNoRm9sZGVyLmFkZChwcm9wcywgJ3NjYWxlWicsIDAsIDUsIDAuMSlcbiAgbWVzaEZvbGRlci5hZGQocHJvcHMsICdyb3RhdGlvblgnLCAtTWF0aC5QSSwgTWF0aC5QSSwgMC4xKVxuICBtZXNoRm9sZGVyLmFkZChwcm9wcywgJ3JvdGF0aW9uWScsIC1NYXRoLlBJLCBNYXRoLlBJLCAwLjEpXG4gIG1lc2hGb2xkZXIuYWRkKHByb3BzLCAncm90YXRpb25aJywgLU1hdGguUEksIE1hdGguUEksIDAuMSlcbiAgbWVzaEZvbGRlci5hZGQocHJvcHMsICdwb3NpdGlvblgnLCAtMywgMywgMC4xKS5saXN0ZW4oKVxuICBtZXNoRm9sZGVyLmFkZChwcm9wcywgJ3Bvc2l0aW9uWScsIC0zLCAzLCAwLjEpLmxpc3RlbigpXG4gIG1lc2hGb2xkZXIuYWRkKHByb3BzLCAncG9zaXRpb25aJywgLTMsIDMsIDAuMSkubGlzdGVuKClcbiAgbWVzaEZvbGRlci5hZGQocHJvcHMsICd0cmFuc2xhdGVYJywgLTMsIDMsIDAuMSlcbiAgbWVzaEZvbGRlci5hZGQocHJvcHMsICd0cmFuc2xhdGVZJywgLTMsIDMsIDAuMSlcbiAgbWVzaEZvbGRlci5hZGQocHJvcHMsICd0cmFuc2xhdGVaJywgLTMsIDMsIDAuMSlcbiAgbWVzaEZvbGRlci5hZGQocHJvcHMsICd0cmFuc2xhdGUnKVxuICBtZXNoRm9sZGVyLmFkZChwcm9wcywgJ2xvb2tBdFgnLCAtMywgMywgMC4xKVxuICBtZXNoRm9sZGVyLmFkZChwcm9wcywgJ2xvb2tBdFknLCAtMywgMywgMC4xKVxuICBtZXNoRm9sZGVyLmFkZChwcm9wcywgJ2xvb2tBdFonLCAtMywgMywgMC4xKVxuICBtZXNoRm9sZGVyLmFkZChwcm9wcywgJ2xvb2tBdCcpXG4gIG1lc2hGb2xkZXIuYWRkKHByb3BzLCAndmlzaWJsZScpXG4gIG1lc2hGb2xkZXIuYWRkKHByb3BzLCAnY2FzdFNoYWRvdycpXG4gIC8vIFRPRE8sIHdlIGNvdWxkIGFkZCBtb3JlIGhlcmUsIG9yIGp1c3Qgc2hvdyB0aGUgYXhpcy5cbiAgLy8gICAgICAgb3IganVzdCBjcmVhdGUgYSBzaW1wbGUgZXhhbXBsZSB3aXRoIGEgcGFyZW50IG9iamVjdFxuICAvLyAgICAgICB3aGVyZSB3ZSBzaG93IHRoZSB0aHJlZSBkaWZmZXJlbnQgYXhpcy5cbiAgLy8gQWxzbyBkZXRlcm1pbmUgaGVyZSBpZiBUaHJlZS5qcyByZWFsbHkgdXNlcyBvYmplY3Qgc3BhY2UgYXMgcGFyZW50XG4gIC8vIGh0dHBzOi8vamF2YXNjcmlwdC50dXRvcmlhbGluay5jb20vcm90YXRlLW9iamVjdC1vbi1zcGVjaWZpYy1heGlzLWFueXdoZXJlLWluLXRocmVlLWpzLWluY2x1ZGluZy1vdXRzaWRlLW9mLW1lc2gvXG4gIG1lc2hGb2xkZXIuYWRkKHByb3BzLCAncm90YXRlT25Xb3JsZEF4aXNYJylcbiAgbWVzaEZvbGRlci5hZGQocHJvcHMsICdyb3RhdGVPbldvcmxkQXhpc1knKVxuICBtZXNoRm9sZGVyLmFkZChwcm9wcywgJ3JvdGF0ZU9uV29ybGRBeGlzWicpXG4gIG1lc2hGb2xkZXIub25DaGFuZ2UoKCkgPT4ge1xuICAgIG1lc2guc2NhbGUuc2V0KHByb3BzLnNjYWxlWCwgcHJvcHMuc2NhbGVZLCBwcm9wcy5zY2FsZVopXG4gICAgbWVzaC5yb3RhdGlvbi5zZXQocHJvcHMucm90YXRpb25YLCBwcm9wcy5yb3RhdGlvblksIHByb3BzLnJvdGF0aW9uWilcbiAgICBtZXNoLnBvc2l0aW9uLnNldChwcm9wcy5wb3NpdGlvblgsIHByb3BzLnBvc2l0aW9uWSwgcHJvcHMucG9zaXRpb25aKVxuICAgIG1lc2gudmlzaWJsZSA9IHByb3BzLnZpc2libGVcbiAgICBtZXNoLmNhc3RTaGFkb3cgPSBwcm9wcy5jYXN0U2hhZG93XG4gIH0pXG59XG4iLCJ2YXIgU3RhdHMgPSBmdW5jdGlvbiAoKSB7XG5cblx0dmFyIG1vZGUgPSAwO1xuXG5cdHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuXHRjb250YWluZXIuc3R5bGUuY3NzVGV4dCA9ICdwb3NpdGlvbjpmaXhlZDt0b3A6MDtsZWZ0OjA7Y3Vyc29yOnBvaW50ZXI7b3BhY2l0eTowLjk7ei1pbmRleDoxMDAwMCc7XG5cdGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCAnY2xpY2snLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRzaG93UGFuZWwoICsrIG1vZGUgJSBjb250YWluZXIuY2hpbGRyZW4ubGVuZ3RoICk7XG5cblx0fSwgZmFsc2UgKTtcblxuXHQvL1xuXG5cdGZ1bmN0aW9uIGFkZFBhbmVsKCBwYW5lbCApIHtcblxuXHRcdGNvbnRhaW5lci5hcHBlbmRDaGlsZCggcGFuZWwuZG9tICk7XG5cdFx0cmV0dXJuIHBhbmVsO1xuXG5cdH1cblxuXHRmdW5jdGlvbiBzaG93UGFuZWwoIGlkICkge1xuXG5cdFx0Zm9yICggdmFyIGkgPSAwOyBpIDwgY29udGFpbmVyLmNoaWxkcmVuLmxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0Y29udGFpbmVyLmNoaWxkcmVuWyBpIF0uc3R5bGUuZGlzcGxheSA9IGkgPT09IGlkID8gJ2Jsb2NrJyA6ICdub25lJztcblxuXHRcdH1cblxuXHRcdG1vZGUgPSBpZDtcblxuXHR9XG5cblx0Ly9cblxuXHR2YXIgYmVnaW5UaW1lID0gKCBwZXJmb3JtYW5jZSB8fCBEYXRlICkubm93KCksIHByZXZUaW1lID0gYmVnaW5UaW1lLCBmcmFtZXMgPSAwO1xuXG5cdHZhciBmcHNQYW5lbCA9IGFkZFBhbmVsKCBuZXcgU3RhdHMuUGFuZWwoICdGUFMnLCAnIzBmZicsICcjMDAyJyApICk7XG5cdHZhciBtc1BhbmVsID0gYWRkUGFuZWwoIG5ldyBTdGF0cy5QYW5lbCggJ01TJywgJyMwZjAnLCAnIzAyMCcgKSApO1xuXG5cdGlmICggc2VsZi5wZXJmb3JtYW5jZSAmJiBzZWxmLnBlcmZvcm1hbmNlLm1lbW9yeSApIHtcblxuXHRcdHZhciBtZW1QYW5lbCA9IGFkZFBhbmVsKCBuZXcgU3RhdHMuUGFuZWwoICdNQicsICcjZjA4JywgJyMyMDEnICkgKTtcblxuXHR9XG5cblx0c2hvd1BhbmVsKCAwICk7XG5cblx0cmV0dXJuIHtcblxuXHRcdFJFVklTSU9OOiAxNixcblxuXHRcdGRvbTogY29udGFpbmVyLFxuXG5cdFx0YWRkUGFuZWw6IGFkZFBhbmVsLFxuXHRcdHNob3dQYW5lbDogc2hvd1BhbmVsLFxuXG5cdFx0YmVnaW46IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0YmVnaW5UaW1lID0gKCBwZXJmb3JtYW5jZSB8fCBEYXRlICkubm93KCk7XG5cblx0XHR9LFxuXG5cdFx0ZW5kOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdGZyYW1lcyArKztcblxuXHRcdFx0dmFyIHRpbWUgPSAoIHBlcmZvcm1hbmNlIHx8IERhdGUgKS5ub3coKTtcblxuXHRcdFx0bXNQYW5lbC51cGRhdGUoIHRpbWUgLSBiZWdpblRpbWUsIDIwMCApO1xuXG5cdFx0XHRpZiAoIHRpbWUgPj0gcHJldlRpbWUgKyAxMDAwICkge1xuXG5cdFx0XHRcdGZwc1BhbmVsLnVwZGF0ZSggKCBmcmFtZXMgKiAxMDAwICkgLyAoIHRpbWUgLSBwcmV2VGltZSApLCAxMDAgKTtcblxuXHRcdFx0XHRwcmV2VGltZSA9IHRpbWU7XG5cdFx0XHRcdGZyYW1lcyA9IDA7XG5cblx0XHRcdFx0aWYgKCBtZW1QYW5lbCApIHtcblxuXHRcdFx0XHRcdHZhciBtZW1vcnkgPSBwZXJmb3JtYW5jZS5tZW1vcnk7XG5cdFx0XHRcdFx0bWVtUGFuZWwudXBkYXRlKCBtZW1vcnkudXNlZEpTSGVhcFNpemUgLyAxMDQ4NTc2LCBtZW1vcnkuanNIZWFwU2l6ZUxpbWl0IC8gMTA0ODU3NiApO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdGltZTtcblxuXHRcdH0sXG5cblx0XHR1cGRhdGU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0YmVnaW5UaW1lID0gdGhpcy5lbmQoKTtcblxuXHRcdH0sXG5cblx0XHQvLyBCYWNrd2FyZHMgQ29tcGF0aWJpbGl0eVxuXG5cdFx0ZG9tRWxlbWVudDogY29udGFpbmVyLFxuXHRcdHNldE1vZGU6IHNob3dQYW5lbFxuXG5cdH07XG5cbn07XG5cblN0YXRzLlBhbmVsID0gZnVuY3Rpb24gKCBuYW1lLCBmZywgYmcgKSB7XG5cblx0dmFyIG1pbiA9IEluZmluaXR5LCBtYXggPSAwLCByb3VuZCA9IE1hdGgucm91bmQ7XG5cdHZhciBQUiA9IHJvdW5kKCB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxICk7XG5cblx0dmFyIFdJRFRIID0gODAgKiBQUiwgSEVJR0hUID0gNDggKiBQUixcblx0XHRURVhUX1ggPSAzICogUFIsIFRFWFRfWSA9IDIgKiBQUixcblx0XHRHUkFQSF9YID0gMyAqIFBSLCBHUkFQSF9ZID0gMTUgKiBQUixcblx0XHRHUkFQSF9XSURUSCA9IDc0ICogUFIsIEdSQVBIX0hFSUdIVCA9IDMwICogUFI7XG5cblx0dmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdjYW52YXMnICk7XG5cdGNhbnZhcy53aWR0aCA9IFdJRFRIO1xuXHRjYW52YXMuaGVpZ2h0ID0gSEVJR0hUO1xuXHRjYW52YXMuc3R5bGUuY3NzVGV4dCA9ICd3aWR0aDo4MHB4O2hlaWdodDo0OHB4JztcblxuXHR2YXIgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCAnMmQnICk7XG5cdGNvbnRleHQuZm9udCA9ICdib2xkICcgKyAoIDkgKiBQUiApICsgJ3B4IEhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmJztcblx0Y29udGV4dC50ZXh0QmFzZWxpbmUgPSAndG9wJztcblxuXHRjb250ZXh0LmZpbGxTdHlsZSA9IGJnO1xuXHRjb250ZXh0LmZpbGxSZWN0KCAwLCAwLCBXSURUSCwgSEVJR0hUICk7XG5cblx0Y29udGV4dC5maWxsU3R5bGUgPSBmZztcblx0Y29udGV4dC5maWxsVGV4dCggbmFtZSwgVEVYVF9YLCBURVhUX1kgKTtcblx0Y29udGV4dC5maWxsUmVjdCggR1JBUEhfWCwgR1JBUEhfWSwgR1JBUEhfV0lEVEgsIEdSQVBIX0hFSUdIVCApO1xuXG5cdGNvbnRleHQuZmlsbFN0eWxlID0gYmc7XG5cdGNvbnRleHQuZ2xvYmFsQWxwaGEgPSAwLjk7XG5cdGNvbnRleHQuZmlsbFJlY3QoIEdSQVBIX1gsIEdSQVBIX1ksIEdSQVBIX1dJRFRILCBHUkFQSF9IRUlHSFQgKTtcblxuXHRyZXR1cm4ge1xuXG5cdFx0ZG9tOiBjYW52YXMsXG5cblx0XHR1cGRhdGU6IGZ1bmN0aW9uICggdmFsdWUsIG1heFZhbHVlICkge1xuXG5cdFx0XHRtaW4gPSBNYXRoLm1pbiggbWluLCB2YWx1ZSApO1xuXHRcdFx0bWF4ID0gTWF0aC5tYXgoIG1heCwgdmFsdWUgKTtcblxuXHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSBiZztcblx0XHRcdGNvbnRleHQuZ2xvYmFsQWxwaGEgPSAxO1xuXHRcdFx0Y29udGV4dC5maWxsUmVjdCggMCwgMCwgV0lEVEgsIEdSQVBIX1kgKTtcblx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gZmc7XG5cdFx0XHRjb250ZXh0LmZpbGxUZXh0KCByb3VuZCggdmFsdWUgKSArICcgJyArIG5hbWUgKyAnICgnICsgcm91bmQoIG1pbiApICsgJy0nICsgcm91bmQoIG1heCApICsgJyknLCBURVhUX1gsIFRFWFRfWSApO1xuXG5cdFx0XHRjb250ZXh0LmRyYXdJbWFnZSggY2FudmFzLCBHUkFQSF9YICsgUFIsIEdSQVBIX1ksIEdSQVBIX1dJRFRIIC0gUFIsIEdSQVBIX0hFSUdIVCwgR1JBUEhfWCwgR1JBUEhfWSwgR1JBUEhfV0lEVEggLSBQUiwgR1JBUEhfSEVJR0hUICk7XG5cblx0XHRcdGNvbnRleHQuZmlsbFJlY3QoIEdSQVBIX1ggKyBHUkFQSF9XSURUSCAtIFBSLCBHUkFQSF9ZLCBQUiwgR1JBUEhfSEVJR0hUICk7XG5cblx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gYmc7XG5cdFx0XHRjb250ZXh0Lmdsb2JhbEFscGhhID0gMC45O1xuXHRcdFx0Y29udGV4dC5maWxsUmVjdCggR1JBUEhfWCArIEdSQVBIX1dJRFRIIC0gUFIsIEdSQVBIX1ksIFBSLCByb3VuZCggKCAxIC0gKCB2YWx1ZSAvIG1heFZhbHVlICkgKSAqIEdSQVBIX0hFSUdIVCApICk7XG5cblx0XHR9XG5cblx0fTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgU3RhdHM7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1lcmdpbmdcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rbHRqc19mb3VydGhcIl0gPSBzZWxmW1wid2VicGFja0NodW5rbHRqc19mb3VydGhcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2J1aWxkX3RocmVlX21vZHVsZV9qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX2NvbnRyb2xzX09yYml0Q29udHJvbHNfanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX2xpbC1ndWlfZGlzdF9saWwtZ3VpX2VzbV9qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX3V0aWxzX0J1ZmZlckdlb21ldHJ5VXRpbHNfanNcIixcInNhbXBsZXNfY2hhcHRlcnNfY2hhcHRlci04X3V0aWxfc3RhbmRhcmQtc2NlbmVfanNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItOC9tZXJnaW5nLmpzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
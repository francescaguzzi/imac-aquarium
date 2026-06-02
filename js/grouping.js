/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./samples/chapters/chapter-8/grouping.js"
/*!************************************************!*\
  !*** ./samples/chapters/chapter-8/grouping.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_standard_scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/standard-scene */ "./samples/chapters/chapter-8/util/standard-scene.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_libs_stats_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/libs/stats.module */ "./node_modules/three/examples/jsm/libs/stats.module.js");
/* harmony import */ var _controls_mesh_controls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../controls/mesh-controls */ "./samples/controls/mesh-controls.js");





const stats = (0,three_examples_jsm_libs_stats_module__WEBPACK_IMPORTED_MODULE_2__["default"])()
document.body.appendChild(stats.dom)

const modelAsync = () => {
  const size = 1
  const amount = 5000
  const range = 20

  const group = new three__WEBPACK_IMPORTED_MODULE_1__.Group()
  const mat = new three__WEBPACK_IMPORTED_MODULE_1__.MeshNormalMaterial()
  mat.blending = three__WEBPACK_IMPORTED_MODULE_1__.NormalBlending
  mat.opacity = 0.1
  mat.transparent = true

  for (let i = 0; i < amount; i++) {
    const x = Math.random() * range - range / 2
    const y = Math.random() * range - range / 2
    const z = Math.random() * range - range / 2

    const g = new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(size, size, size)
    const m = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(g, mat)
    m.position.set(x, y, z)
    group.add(m)
  }

  return group
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
/******/ 			"grouping": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","samples_chapters_chapter-8_util_standard-scene_js"], () => (__webpack_require__("./samples/chapters/chapter-8/grouping.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0w7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEU7Ozs7O1dDM0JBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QsRTs7Ozs7V0NOQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0EsNEc7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci04L2dyb3VwaW5nLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jb250cm9scy9tZXNoLWNvbnRyb2xzLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vbm9kZV9tb2R1bGVzL3RocmVlL2V4YW1wbGVzL2pzbS9saWJzL3N0YXRzLm1vZHVsZS5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGJvb3RzdHJhcE1lc2hTY2VuZSB9IGZyb20gJy4vdXRpbC9zdGFuZGFyZC1zY2VuZSdcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuaW1wb3J0IFN0YXRzIGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9saWJzL3N0YXRzLm1vZHVsZSdcbmltcG9ydCB7IGFkZE1lc2hQcm9wZXJ0aWVzIH0gZnJvbSAnLi4vLi4vY29udHJvbHMvbWVzaC1jb250cm9scydcblxuY29uc3Qgc3RhdHMgPSBTdGF0cygpXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHN0YXRzLmRvbSlcblxuY29uc3QgbW9kZWxBc3luYyA9ICgpID0+IHtcbiAgY29uc3Qgc2l6ZSA9IDFcbiAgY29uc3QgYW1vdW50ID0gNTAwMFxuICBjb25zdCByYW5nZSA9IDIwXG5cbiAgY29uc3QgZ3JvdXAgPSBuZXcgVEhSRUUuR3JvdXAoKVxuICBjb25zdCBtYXQgPSBuZXcgVEhSRUUuTWVzaE5vcm1hbE1hdGVyaWFsKClcbiAgbWF0LmJsZW5kaW5nID0gVEhSRUUuTm9ybWFsQmxlbmRpbmdcbiAgbWF0Lm9wYWNpdHkgPSAwLjFcbiAgbWF0LnRyYW5zcGFyZW50ID0gdHJ1ZVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYW1vdW50OyBpKyspIHtcbiAgICBjb25zdCB4ID0gTWF0aC5yYW5kb20oKSAqIHJhbmdlIC0gcmFuZ2UgLyAyXG4gICAgY29uc3QgeSA9IE1hdGgucmFuZG9tKCkgKiByYW5nZSAtIHJhbmdlIC8gMlxuICAgIGNvbnN0IHogPSBNYXRoLnJhbmRvbSgpICogcmFuZ2UgLSByYW5nZSAvIDJcblxuICAgIGNvbnN0IGcgPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoc2l6ZSwgc2l6ZSwgc2l6ZSlcbiAgICBjb25zdCBtID0gbmV3IFRIUkVFLk1lc2goZywgbWF0KVxuICAgIG0ucG9zaXRpb24uc2V0KHgsIHksIHopXG4gICAgZ3JvdXAuYWRkKG0pXG4gIH1cblxuICByZXR1cm4gZ3JvdXBcbn1cblxuYm9vdHN0cmFwTWVzaFNjZW5lKHtcbiAgbG9hZE1lc2g6IG1vZGVsQXN5bmMsXG4gIGhpZGVmbG9vcjogdHJ1ZSxcbiAgb25SZW5kZXI6ICgpID0+IHN0YXRzLnVwZGF0ZSgpLFxuICBiYWNrZ3JvdW5kQ29sb3I6IDB4MDAwMDAwLFxuICBwcm92aWRlR3VpOiAoZ3VpLCBtZXNoKSA9PiB7XG4gICAgYWRkTWVzaFByb3BlcnRpZXMoZ3VpLCBtZXNoLCAnR3JvdXAnKVxuICB9XG59KS50aGVuKClcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuXG5leHBvcnQgY29uc3QgYWRkTWVzaFByb3BlcnRpZXMgPSAoZ3VpLCBtZXNoLCB0aXRsZSkgPT4ge1xuICBjb25zdCBwcm9wcyA9IHtcbiAgICBzY2FsZVg6IG1lc2guc2NhbGUueCxcbiAgICBzY2FsZVk6IG1lc2guc2NhbGUueSxcbiAgICBzY2FsZVo6IG1lc2guc2NhbGUueixcbiAgICByb3RhdGlvblg6IG1lc2gucm90YXRpb24ueCxcbiAgICByb3RhdGlvblk6IG1lc2gucm90YXRpb24ueSxcbiAgICByb3RhdGlvblo6IG1lc2gucm90YXRpb24ueixcbiAgICBwb3NpdGlvblg6IG1lc2gucG9zaXRpb24ueCxcbiAgICBwb3NpdGlvblk6IG1lc2gucG9zaXRpb24ueSxcbiAgICBwb3NpdGlvblo6IG1lc2gucG9zaXRpb24ueixcbiAgICB0cmFuc2xhdGVYOiAwLFxuICAgIHRyYW5zbGF0ZVk6IDAsXG4gICAgdHJhbnNsYXRlWjogMCxcbiAgICB0cmFuc2xhdGU6ICgpID0+IHtcbiAgICAgIG1lc2gudHJhbnNsYXRlWChwcm9wcy50cmFuc2xhdGVYKVxuICAgICAgbWVzaC50cmFuc2xhdGVZKHByb3BzLnRyYW5zbGF0ZVkpXG4gICAgICBtZXNoLnRyYW5zbGF0ZVoocHJvcHMudHJhbnNsYXRlWilcbiAgICAgIHByb3BzLnBvc2l0aW9uWCA9IG1lc2gucG9zaXRpb24ueFxuICAgICAgcHJvcHMucG9zaXRpb25ZID0gbWVzaC5wb3NpdGlvbi55XG4gICAgICBwcm9wcy5wb3NpdGlvblogPSBtZXNoLnBvc2l0aW9uLnpcbiAgICB9LFxuICAgIGxvb2tBdFg6IDAsXG4gICAgbG9va0F0WTogMCxcbiAgICBsb29rQXRaOiAwLFxuICAgIGxvb2tBdDogKCkgPT4ge1xuICAgICAgbWVzaC5sb29rQXQocHJvcHMubG9va0F0WCwgcHJvcHMubG9va0F0WSwgcHJvcHMubG9va0F0WilcbiAgICB9LFxuICAgIHZpc2libGU6IG1lc2gudmlzaWJsZSxcbiAgICBjYXN0U2hhZG93OiBtZXNoLmNhc3RTaGFkb3csXG4gICAgcm90YXRlT25Xb3JsZEF4aXNYOiAoKSA9PiB7XG4gICAgICBtZXNoLnJvdGF0ZU9uV29ybGRBeGlzKG5ldyBUSFJFRS5WZWN0b3IzKDEsIDAsIDApLCBNYXRoLlBJIC8gNClcbiAgICB9LFxuICAgIHJvdGF0ZU9uV29ybGRBeGlzWTogKCkgPT4ge1xuICAgICAgbWVzaC5yb3RhdGVPbldvcmxkQXhpcyhuZXcgVEhSRUUuVmVjdG9yMygwLCAxLCAwKSwgTWF0aC5QSSAvIDQpXG4gICAgfSxcbiAgICByb3RhdGVPbldvcmxkQXhpc1o6ICgpID0+IHtcbiAgICAgIG1lc2gucm90YXRlT25Xb3JsZEF4aXMobmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMSksIE1hdGguUEkgLyA0KVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG1lc2hGb2xkZXIgPSBndWkuYWRkRm9sZGVyKHRpdGxlKVxuICBtZXNoRm9sZGVyLmFkZChwcm9wcywgJ3NjYWxlWCcsIDAsIDUsIDAuMSlcbiAgbWVzaEZvbGRlci5hZGQocHJvcHMsICdzY2FsZVknLCAwLCA1LCAwLjEpXG4gIG1lc2hGb2xkZXIuYWRkKHByb3BzLCAnc2NhbGVaJywgMCwgNSwgMC4xKVxuICBtZXNoRm9sZGVyLmFkZChwcm9wcywgJ3JvdGF0aW9uWCcsIC1NYXRoLlBJLCBNYXRoLlBJLCAwLjEpXG4gIG1lc2hGb2xkZXIuYWRkKHByb3BzLCAncm90YXRpb25ZJywgLU1hdGguUEksIE1hdGguUEksIDAuMSlcbiAgbWVzaEZvbGRlci5hZGQocHJvcHMsICdyb3RhdGlvblonLCAtTWF0aC5QSSwgTWF0aC5QSSwgMC4xKVxuICBtZXNoRm9sZGVyLmFkZChwcm9wcywgJ3Bvc2l0aW9uWCcsIC0zLCAzLCAwLjEpLmxpc3RlbigpXG4gIG1lc2hGb2xkZXIuYWRkKHByb3BzLCAncG9zaXRpb25ZJywgLTMsIDMsIDAuMSkubGlzdGVuKClcbiAgbWVzaEZvbGRlci5hZGQocHJvcHMsICdwb3NpdGlvblonLCAtMywgMywgMC4xKS5saXN0ZW4oKVxuICBtZXNoRm9sZGVyLmFkZChwcm9wcywgJ3RyYW5zbGF0ZVgnLCAtMywgMywgMC4xKVxuICBtZXNoRm9sZGVyLmFkZChwcm9wcywgJ3RyYW5zbGF0ZVknLCAtMywgMywgMC4xKVxuICBtZXNoRm9sZGVyLmFkZChwcm9wcywgJ3RyYW5zbGF0ZVonLCAtMywgMywgMC4xKVxuICBtZXNoRm9sZGVyLmFkZChwcm9wcywgJ3RyYW5zbGF0ZScpXG4gIG1lc2hGb2xkZXIuYWRkKHByb3BzLCAnbG9va0F0WCcsIC0zLCAzLCAwLjEpXG4gIG1lc2hGb2xkZXIuYWRkKHByb3BzLCAnbG9va0F0WScsIC0zLCAzLCAwLjEpXG4gIG1lc2hGb2xkZXIuYWRkKHByb3BzLCAnbG9va0F0WicsIC0zLCAzLCAwLjEpXG4gIG1lc2hGb2xkZXIuYWRkKHByb3BzLCAnbG9va0F0JylcbiAgbWVzaEZvbGRlci5hZGQocHJvcHMsICd2aXNpYmxlJylcbiAgbWVzaEZvbGRlci5hZGQocHJvcHMsICdjYXN0U2hhZG93JylcbiAgLy8gVE9ETywgd2UgY291bGQgYWRkIG1vcmUgaGVyZSwgb3IganVzdCBzaG93IHRoZSBheGlzLlxuICAvLyAgICAgICBvciBqdXN0IGNyZWF0ZSBhIHNpbXBsZSBleGFtcGxlIHdpdGggYSBwYXJlbnQgb2JqZWN0XG4gIC8vICAgICAgIHdoZXJlIHdlIHNob3cgdGhlIHRocmVlIGRpZmZlcmVudCBheGlzLlxuICAvLyBBbHNvIGRldGVybWluZSBoZXJlIGlmIFRocmVlLmpzIHJlYWxseSB1c2VzIG9iamVjdCBzcGFjZSBhcyBwYXJlbnRcbiAgLy8gaHR0cHM6Ly9qYXZhc2NyaXB0LnR1dG9yaWFsaW5rLmNvbS9yb3RhdGUtb2JqZWN0LW9uLXNwZWNpZmljLWF4aXMtYW55d2hlcmUtaW4tdGhyZWUtanMtaW5jbHVkaW5nLW91dHNpZGUtb2YtbWVzaC9cbiAgbWVzaEZvbGRlci5hZGQocHJvcHMsICdyb3RhdGVPbldvcmxkQXhpc1gnKVxuICBtZXNoRm9sZGVyLmFkZChwcm9wcywgJ3JvdGF0ZU9uV29ybGRBeGlzWScpXG4gIG1lc2hGb2xkZXIuYWRkKHByb3BzLCAncm90YXRlT25Xb3JsZEF4aXNaJylcbiAgbWVzaEZvbGRlci5vbkNoYW5nZSgoKSA9PiB7XG4gICAgbWVzaC5zY2FsZS5zZXQocHJvcHMuc2NhbGVYLCBwcm9wcy5zY2FsZVksIHByb3BzLnNjYWxlWilcbiAgICBtZXNoLnJvdGF0aW9uLnNldChwcm9wcy5yb3RhdGlvblgsIHByb3BzLnJvdGF0aW9uWSwgcHJvcHMucm90YXRpb25aKVxuICAgIG1lc2gucG9zaXRpb24uc2V0KHByb3BzLnBvc2l0aW9uWCwgcHJvcHMucG9zaXRpb25ZLCBwcm9wcy5wb3NpdGlvblopXG4gICAgbWVzaC52aXNpYmxlID0gcHJvcHMudmlzaWJsZVxuICAgIG1lc2guY2FzdFNoYWRvdyA9IHByb3BzLmNhc3RTaGFkb3dcbiAgfSlcbn1cbiIsInZhciBTdGF0cyA9IGZ1bmN0aW9uICgpIHtcblxuXHR2YXIgbW9kZSA9IDA7XG5cblx0dmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XG5cdGNvbnRhaW5lci5zdHlsZS5jc3NUZXh0ID0gJ3Bvc2l0aW9uOmZpeGVkO3RvcDowO2xlZnQ6MDtjdXJzb3I6cG9pbnRlcjtvcGFjaXR5OjAuOTt6LWluZGV4OjEwMDAwJztcblx0Y29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoICdjbGljaycsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG5cblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHNob3dQYW5lbCggKysgbW9kZSAlIGNvbnRhaW5lci5jaGlsZHJlbi5sZW5ndGggKTtcblxuXHR9LCBmYWxzZSApO1xuXG5cdC8vXG5cblx0ZnVuY3Rpb24gYWRkUGFuZWwoIHBhbmVsICkge1xuXG5cdFx0Y29udGFpbmVyLmFwcGVuZENoaWxkKCBwYW5lbC5kb20gKTtcblx0XHRyZXR1cm4gcGFuZWw7XG5cblx0fVxuXG5cdGZ1bmN0aW9uIHNob3dQYW5lbCggaWQgKSB7XG5cblx0XHRmb3IgKCB2YXIgaSA9IDA7IGkgPCBjb250YWluZXIuY2hpbGRyZW4ubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0XHRjb250YWluZXIuY2hpbGRyZW5bIGkgXS5zdHlsZS5kaXNwbGF5ID0gaSA9PT0gaWQgPyAnYmxvY2snIDogJ25vbmUnO1xuXG5cdFx0fVxuXG5cdFx0bW9kZSA9IGlkO1xuXG5cdH1cblxuXHQvL1xuXG5cdHZhciBiZWdpblRpbWUgPSAoIHBlcmZvcm1hbmNlIHx8IERhdGUgKS5ub3coKSwgcHJldlRpbWUgPSBiZWdpblRpbWUsIGZyYW1lcyA9IDA7XG5cblx0dmFyIGZwc1BhbmVsID0gYWRkUGFuZWwoIG5ldyBTdGF0cy5QYW5lbCggJ0ZQUycsICcjMGZmJywgJyMwMDInICkgKTtcblx0dmFyIG1zUGFuZWwgPSBhZGRQYW5lbCggbmV3IFN0YXRzLlBhbmVsKCAnTVMnLCAnIzBmMCcsICcjMDIwJyApICk7XG5cblx0aWYgKCBzZWxmLnBlcmZvcm1hbmNlICYmIHNlbGYucGVyZm9ybWFuY2UubWVtb3J5ICkge1xuXG5cdFx0dmFyIG1lbVBhbmVsID0gYWRkUGFuZWwoIG5ldyBTdGF0cy5QYW5lbCggJ01CJywgJyNmMDgnLCAnIzIwMScgKSApO1xuXG5cdH1cblxuXHRzaG93UGFuZWwoIDAgKTtcblxuXHRyZXR1cm4ge1xuXG5cdFx0UkVWSVNJT046IDE2LFxuXG5cdFx0ZG9tOiBjb250YWluZXIsXG5cblx0XHRhZGRQYW5lbDogYWRkUGFuZWwsXG5cdFx0c2hvd1BhbmVsOiBzaG93UGFuZWwsXG5cblx0XHRiZWdpbjogZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRiZWdpblRpbWUgPSAoIHBlcmZvcm1hbmNlIHx8IERhdGUgKS5ub3coKTtcblxuXHRcdH0sXG5cblx0XHRlbmQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0ZnJhbWVzICsrO1xuXG5cdFx0XHR2YXIgdGltZSA9ICggcGVyZm9ybWFuY2UgfHwgRGF0ZSApLm5vdygpO1xuXG5cdFx0XHRtc1BhbmVsLnVwZGF0ZSggdGltZSAtIGJlZ2luVGltZSwgMjAwICk7XG5cblx0XHRcdGlmICggdGltZSA+PSBwcmV2VGltZSArIDEwMDAgKSB7XG5cblx0XHRcdFx0ZnBzUGFuZWwudXBkYXRlKCAoIGZyYW1lcyAqIDEwMDAgKSAvICggdGltZSAtIHByZXZUaW1lICksIDEwMCApO1xuXG5cdFx0XHRcdHByZXZUaW1lID0gdGltZTtcblx0XHRcdFx0ZnJhbWVzID0gMDtcblxuXHRcdFx0XHRpZiAoIG1lbVBhbmVsICkge1xuXG5cdFx0XHRcdFx0dmFyIG1lbW9yeSA9IHBlcmZvcm1hbmNlLm1lbW9yeTtcblx0XHRcdFx0XHRtZW1QYW5lbC51cGRhdGUoIG1lbW9yeS51c2VkSlNIZWFwU2l6ZSAvIDEwNDg1NzYsIG1lbW9yeS5qc0hlYXBTaXplTGltaXQgLyAxMDQ4NTc2ICk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0aW1lO1xuXG5cdFx0fSxcblxuXHRcdHVwZGF0ZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRiZWdpblRpbWUgPSB0aGlzLmVuZCgpO1xuXG5cdFx0fSxcblxuXHRcdC8vIEJhY2t3YXJkcyBDb21wYXRpYmlsaXR5XG5cblx0XHRkb21FbGVtZW50OiBjb250YWluZXIsXG5cdFx0c2V0TW9kZTogc2hvd1BhbmVsXG5cblx0fTtcblxufTtcblxuU3RhdHMuUGFuZWwgPSBmdW5jdGlvbiAoIG5hbWUsIGZnLCBiZyApIHtcblxuXHR2YXIgbWluID0gSW5maW5pdHksIG1heCA9IDAsIHJvdW5kID0gTWF0aC5yb3VuZDtcblx0dmFyIFBSID0gcm91bmQoIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDEgKTtcblxuXHR2YXIgV0lEVEggPSA4MCAqIFBSLCBIRUlHSFQgPSA0OCAqIFBSLFxuXHRcdFRFWFRfWCA9IDMgKiBQUiwgVEVYVF9ZID0gMiAqIFBSLFxuXHRcdEdSQVBIX1ggPSAzICogUFIsIEdSQVBIX1kgPSAxNSAqIFBSLFxuXHRcdEdSQVBIX1dJRFRIID0gNzQgKiBQUiwgR1JBUEhfSEVJR0hUID0gMzAgKiBQUjtcblxuXHR2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2NhbnZhcycgKTtcblx0Y2FudmFzLndpZHRoID0gV0lEVEg7XG5cdGNhbnZhcy5oZWlnaHQgPSBIRUlHSFQ7XG5cdGNhbnZhcy5zdHlsZS5jc3NUZXh0ID0gJ3dpZHRoOjgwcHg7aGVpZ2h0OjQ4cHgnO1xuXG5cdHZhciBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoICcyZCcgKTtcblx0Y29udGV4dC5mb250ID0gJ2JvbGQgJyArICggOSAqIFBSICkgKyAncHggSGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWYnO1xuXHRjb250ZXh0LnRleHRCYXNlbGluZSA9ICd0b3AnO1xuXG5cdGNvbnRleHQuZmlsbFN0eWxlID0gYmc7XG5cdGNvbnRleHQuZmlsbFJlY3QoIDAsIDAsIFdJRFRILCBIRUlHSFQgKTtcblxuXHRjb250ZXh0LmZpbGxTdHlsZSA9IGZnO1xuXHRjb250ZXh0LmZpbGxUZXh0KCBuYW1lLCBURVhUX1gsIFRFWFRfWSApO1xuXHRjb250ZXh0LmZpbGxSZWN0KCBHUkFQSF9YLCBHUkFQSF9ZLCBHUkFQSF9XSURUSCwgR1JBUEhfSEVJR0hUICk7XG5cblx0Y29udGV4dC5maWxsU3R5bGUgPSBiZztcblx0Y29udGV4dC5nbG9iYWxBbHBoYSA9IDAuOTtcblx0Y29udGV4dC5maWxsUmVjdCggR1JBUEhfWCwgR1JBUEhfWSwgR1JBUEhfV0lEVEgsIEdSQVBIX0hFSUdIVCApO1xuXG5cdHJldHVybiB7XG5cblx0XHRkb206IGNhbnZhcyxcblxuXHRcdHVwZGF0ZTogZnVuY3Rpb24gKCB2YWx1ZSwgbWF4VmFsdWUgKSB7XG5cblx0XHRcdG1pbiA9IE1hdGgubWluKCBtaW4sIHZhbHVlICk7XG5cdFx0XHRtYXggPSBNYXRoLm1heCggbWF4LCB2YWx1ZSApO1xuXG5cdFx0XHRjb250ZXh0LmZpbGxTdHlsZSA9IGJnO1xuXHRcdFx0Y29udGV4dC5nbG9iYWxBbHBoYSA9IDE7XG5cdFx0XHRjb250ZXh0LmZpbGxSZWN0KCAwLCAwLCBXSURUSCwgR1JBUEhfWSApO1xuXHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSBmZztcblx0XHRcdGNvbnRleHQuZmlsbFRleHQoIHJvdW5kKCB2YWx1ZSApICsgJyAnICsgbmFtZSArICcgKCcgKyByb3VuZCggbWluICkgKyAnLScgKyByb3VuZCggbWF4ICkgKyAnKScsIFRFWFRfWCwgVEVYVF9ZICk7XG5cblx0XHRcdGNvbnRleHQuZHJhd0ltYWdlKCBjYW52YXMsIEdSQVBIX1ggKyBQUiwgR1JBUEhfWSwgR1JBUEhfV0lEVEggLSBQUiwgR1JBUEhfSEVJR0hULCBHUkFQSF9YLCBHUkFQSF9ZLCBHUkFQSF9XSURUSCAtIFBSLCBHUkFQSF9IRUlHSFQgKTtcblxuXHRcdFx0Y29udGV4dC5maWxsUmVjdCggR1JBUEhfWCArIEdSQVBIX1dJRFRIIC0gUFIsIEdSQVBIX1ksIFBSLCBHUkFQSF9IRUlHSFQgKTtcblxuXHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSBiZztcblx0XHRcdGNvbnRleHQuZ2xvYmFsQWxwaGEgPSAwLjk7XG5cdFx0XHRjb250ZXh0LmZpbGxSZWN0KCBHUkFQSF9YICsgR1JBUEhfV0lEVEggLSBQUiwgR1JBUEhfWSwgUFIsIHJvdW5kKCAoIDEgLSAoIHZhbHVlIC8gbWF4VmFsdWUgKSApICogR1JBUEhfSEVJR0hUICkgKTtcblxuXHRcdH1cblxuXHR9O1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTdGF0cztcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiZ3JvdXBpbmdcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rbHRqc19mb3VydGhcIl0gPSBzZWxmW1wid2VicGFja0NodW5rbHRqc19mb3VydGhcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2J1aWxkX3RocmVlX21vZHVsZV9qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX2NvbnRyb2xzX09yYml0Q29udHJvbHNfanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX2xpbC1ndWlfZGlzdF9saWwtZ3VpX2VzbV9qc1wiLFwic2FtcGxlc19jaGFwdGVyc19jaGFwdGVyLThfdXRpbF9zdGFuZGFyZC1zY2VuZV9qc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci04L2dyb3VwaW5nLmpzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./samples/bootstrap/bootstrap.js"
/*!****************************************!*\
  !*** ./samples/bootstrap/bootstrap.js ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initScene: () => (/* binding */ initScene)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _controller_orbit_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controller/orbit-controller */ "./samples/controller/orbit-controller.js");
/* harmony import */ var _lighting__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lighting */ "./samples/bootstrap/lighting.js");
/* harmony import */ var _util_update_on_resize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/update-on-resize */ "./samples/util/update-on-resize.js");





const initScene = ({ backgroundColor, fogColor, disableShadows, disableLights, disableDefaultControls }) => {
  const init = (fn) => {
    // basic scene setup
    const scene = new three__WEBPACK_IMPORTED_MODULE_0__.Scene()
    if (backgroundColor) {
      scene.backgroundColor = backgroundColor
    }

    if (fogColor) {
      scene.fog = new three__WEBPACK_IMPORTED_MODULE_0__.Fog(fogColor, 0.0025, 50)
    }

    // setup camera and basic renderer
    const camera = new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer({ antialias: true })
    renderer.outputEncoding = three__WEBPACK_IMPORTED_MODULE_0__.sRGBEncoding
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = three__WEBPACK_IMPORTED_MODULE_0__.VSMShadowMap
    renderer.setClearColor(backgroundColor)

    ;(0,_util_update_on_resize__WEBPACK_IMPORTED_MODULE_3__.onResize)(camera, renderer)
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    // initialize orbit controls
    let orbitControls
    if (!disableDefaultControls) {
      orbitControls = (0,_controller_orbit_controller__WEBPACK_IMPORTED_MODULE_1__.initOrbitControls)(camera, renderer)
    }

    // add some basic lighting to the scene
    if (!disableLights ?? false) {
      (0,_lighting__WEBPACK_IMPORTED_MODULE_2__.initLighting)(scene, { disableShadows })
    }

    fn({ scene, camera, renderer, orbitControls })
  }

  return init
}


/***/ },

/***/ "./samples/bootstrap/lighting.js"
/*!***************************************!*\
  !*** ./samples/bootstrap/lighting.js ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initLighting: () => (/* binding */ initLighting)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");


const initLighting = (scene, { disableShadows }) => {
  // https://threejs.org/examples/?q=shado#webgl_shadowmap_vsm
  scene.add(new three__WEBPACK_IMPORTED_MODULE_0__.AmbientLight(0x666666))

  // const dirLight = new THREE.DirectionalLight(0xaaaaaa)
  const dirLight = new three__WEBPACK_IMPORTED_MODULE_0__.DirectionalLight(0xaaaaaa)
  dirLight.position.set(5, 12, 8)
  dirLight.castShadow = !disableShadows ? true : false
  dirLight.intensity = 1
  dirLight.shadow.camera.near = 0.1
  dirLight.shadow.camera.far = 200
  dirLight.shadow.camera.right = 10
  dirLight.shadow.camera.left = -10
  dirLight.shadow.camera.top = 10
  dirLight.shadow.camera.bottom = -10
  dirLight.shadow.mapSize.width = 2048
  dirLight.shadow.mapSize.height = 2048
  dirLight.shadow.radius = 4
  dirLight.shadow.bias = -0.00005

  scene.add(dirLight)
}


/***/ },

/***/ "./samples/chapters/chapter-3/hemisphere-light.js"
/*!********************************************************!*\
  !*** ./samples/chapters/chapter-3/hemisphere-light.js ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var lil_gui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lil-gui */ "./node_modules/lil-gui/dist/lil-gui.esm.js");
/* harmony import */ var three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/loaders/GLTFLoader.js */ "./node_modules/three/examples/jsm/loaders/GLTFLoader.js");
/* harmony import */ var _bootstrap_bootstrap_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../bootstrap/bootstrap.js */ "./samples/bootstrap/bootstrap.js");
/* harmony import */ var _util_stats__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/stats */ "./samples/util/stats.js");






const props = {
  backgroundColor: 0xcccccc,
  disableLights: true
}
const gui = new lil_gui__WEBPACK_IMPORTED_MODULE_1__["default"]()

const loadWaterfall = (scene) => {
  const loader = new three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_2__.GLTFLoader()
  loader.load('/assets/gltf/waterfall/scene.gltf', (loadedObject) => {
    // the nested
    const loadedScene = loadedObject.scene.children[0].children[0].children[0]
    loadedScene.rotateX(-Math.PI / 2)
    console.log(loadedScene)
    scene.add(loadedScene)
  })
}

;(0,_bootstrap_bootstrap_js__WEBPACK_IMPORTED_MODULE_3__.initScene)(props)(({ scene, camera, renderer, orbitControls }) => {
  camera.position.set(-7, 2, 5)
  orbitControls.update()

  loadWaterfall(scene)

  const skyColor = new three__WEBPACK_IMPORTED_MODULE_0__.Color(0xffffff)
  const groundColor = new three__WEBPACK_IMPORTED_MODULE_0__.Color(0xffffff)
  const light = new three__WEBPACK_IMPORTED_MODULE_0__.HemisphereLight(skyColor, groundColor, 1)
  const helper = new three__WEBPACK_IMPORTED_MODULE_0__.HemisphereLightHelper(light)
  light.position.setY(27)
  scene.add(helper)
  scene.add(light)

  function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    _util_stats__WEBPACK_IMPORTED_MODULE_4__.stats.update()
    helper.update()

    orbitControls.update()
  }

  const props = {
    color: skyColor.getStyle(),
    groundColor: groundColor.getStyle()
  }

  const hemisphereLightFolder = gui.addFolder('Hemisphere')
  hemisphereLightFolder.addColor(props, 'color').onChange((c) => light.color.setStyle(c))
  hemisphereLightFolder.addColor(props, 'groundColor').onChange((c) => light.groundColor.setStyle(c))
  hemisphereLightFolder.add(light, 'intensity', 0, 5, 0.1)
  hemisphereLightFolder.add(light.position, 'x', -30, 30, 0.1).name('positionX')
  hemisphereLightFolder.add(light.position, 'y', -30, 230, 0.1).name('positionY')
  hemisphereLightFolder.add(light.position, 'z', -30, 30, 0.1).name('positionZ')

  animate()
})


/***/ },

/***/ "./samples/controller/orbit-controller.js"
/*!************************************************!*\
  !*** ./samples/controller/orbit-controller.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initOrbitControls: () => (/* binding */ initOrbitControls)
/* harmony export */ });
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");


const initOrbitControls = (camera, renderer) => {
  const controller = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__.OrbitControls(camera, renderer.domElement)
  controller.enableDamping = true
  controller.dampingFactor = 0.05
  controller.minDistance = 1
  controller.maxDistance = 100
  controller.minPolarAngle = Math.PI / 4
  controller.maxPolarAngle = (3 * Math.PI) / 4

  return controller
}


/***/ },

/***/ "./samples/util/stats.js"
/*!*******************************!*\
  !*** ./samples/util/stats.js ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   stats: () => (/* binding */ stats)
/* harmony export */ });
/* harmony import */ var three_examples_jsm_libs_stats_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/libs/stats.module */ "./node_modules/three/examples/jsm/libs/stats.module.js");


const stats = (0,three_examples_jsm_libs_stats_module__WEBPACK_IMPORTED_MODULE_0__["default"])()
document.body.appendChild(stats.dom)




/***/ },

/***/ "./samples/util/update-on-resize.js"
/*!******************************************!*\
  !*** ./samples/util/update-on-resize.js ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   onResize: () => (/* binding */ onResize)
/* harmony export */ });
const onResize = (camera, renderer) => {
  const resizer = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', resizer, false)
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
/******/ 			"hemisphere-light": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","vendors-node_modules_three_examples_jsm_loaders_GLTFLoader_js"], () => (__webpack_require__("./samples/chapters/chapter-3/hemisphere-light.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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b3RzdHJhcC5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvYm9vdHN0cmFwL2xpZ2h0aW5nLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTMvaGVtaXNwaGVyZS1saWdodC5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY29udHJvbGxlci9vcmJpdC1jb250cm9sbGVyLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy91dGlsL3N0YXRzLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy91dGlsL3VwZGF0ZS1vbi1yZXNpemUuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9ub2RlX21vZHVsZXMvdGhyZWUvZXhhbXBsZXMvanNtL2xpYnMvc3RhdHMubW9kdWxlLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5pbXBvcnQgeyBpbml0T3JiaXRDb250cm9scyB9IGZyb20gJy4uL2NvbnRyb2xsZXIvb3JiaXQtY29udHJvbGxlcidcbmltcG9ydCB7IGluaXRMaWdodGluZyB9IGZyb20gJy4vbGlnaHRpbmcnXG5pbXBvcnQgeyBvblJlc2l6ZSB9IGZyb20gJy4uL3V0aWwvdXBkYXRlLW9uLXJlc2l6ZSdcblxuZXhwb3J0IGNvbnN0IGluaXRTY2VuZSA9ICh7IGJhY2tncm91bmRDb2xvciwgZm9nQ29sb3IsIGRpc2FibGVTaGFkb3dzLCBkaXNhYmxlTGlnaHRzLCBkaXNhYmxlRGVmYXVsdENvbnRyb2xzIH0pID0+IHtcbiAgY29uc3QgaW5pdCA9IChmbikgPT4ge1xuICAgIC8vIGJhc2ljIHNjZW5lIHNldHVwXG4gICAgY29uc3Qgc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKVxuICAgIGlmIChiYWNrZ3JvdW5kQ29sb3IpIHtcbiAgICAgIHNjZW5lLmJhY2tncm91bmRDb2xvciA9IGJhY2tncm91bmRDb2xvclxuICAgIH1cblxuICAgIGlmIChmb2dDb2xvcikge1xuICAgICAgc2NlbmUuZm9nID0gbmV3IFRIUkVFLkZvZyhmb2dDb2xvciwgMC4wMDI1LCA1MClcbiAgICB9XG5cbiAgICAvLyBzZXR1cCBjYW1lcmEgYW5kIGJhc2ljIHJlbmRlcmVyXG4gICAgY29uc3QgY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKDc1LCB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodCwgMC4xLCAxMDAwKVxuICAgIGNvbnN0IHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoeyBhbnRpYWxpYXM6IHRydWUgfSlcbiAgICByZW5kZXJlci5vdXRwdXRFbmNvZGluZyA9IFRIUkVFLnNSR0JFbmNvZGluZ1xuICAgIHJlbmRlcmVyLnNoYWRvd01hcC5lbmFibGVkID0gdHJ1ZVxuICAgIHJlbmRlcmVyLnNoYWRvd01hcC50eXBlID0gVEhSRUUuVlNNU2hhZG93TWFwXG4gICAgcmVuZGVyZXIuc2V0Q2xlYXJDb2xvcihiYWNrZ3JvdW5kQ29sb3IpXG5cbiAgICBvblJlc2l6ZShjYW1lcmEsIHJlbmRlcmVyKVxuICAgIHJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodClcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHJlbmRlcmVyLmRvbUVsZW1lbnQpXG5cbiAgICAvLyBpbml0aWFsaXplIG9yYml0IGNvbnRyb2xzXG4gICAgbGV0IG9yYml0Q29udHJvbHNcbiAgICBpZiAoIWRpc2FibGVEZWZhdWx0Q29udHJvbHMpIHtcbiAgICAgIG9yYml0Q29udHJvbHMgPSBpbml0T3JiaXRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyKVxuICAgIH1cblxuICAgIC8vIGFkZCBzb21lIGJhc2ljIGxpZ2h0aW5nIHRvIHRoZSBzY2VuZVxuICAgIGlmICghZGlzYWJsZUxpZ2h0cyA/PyBmYWxzZSkge1xuICAgICAgaW5pdExpZ2h0aW5nKHNjZW5lLCB7IGRpc2FibGVTaGFkb3dzIH0pXG4gICAgfVxuXG4gICAgZm4oeyBzY2VuZSwgY2FtZXJhLCByZW5kZXJlciwgb3JiaXRDb250cm9scyB9KVxuICB9XG5cbiAgcmV0dXJuIGluaXRcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuXG5leHBvcnQgY29uc3QgaW5pdExpZ2h0aW5nID0gKHNjZW5lLCB7IGRpc2FibGVTaGFkb3dzIH0pID0+IHtcbiAgLy8gaHR0cHM6Ly90aHJlZWpzLm9yZy9leGFtcGxlcy8/cT1zaGFkbyN3ZWJnbF9zaGFkb3dtYXBfdnNtXG4gIHNjZW5lLmFkZChuZXcgVEhSRUUuQW1iaWVudExpZ2h0KDB4NjY2NjY2KSlcblxuICAvLyBjb25zdCBkaXJMaWdodCA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4YWFhYWFhKVxuICBjb25zdCBkaXJMaWdodCA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4YWFhYWFhKVxuICBkaXJMaWdodC5wb3NpdGlvbi5zZXQoNSwgMTIsIDgpXG4gIGRpckxpZ2h0LmNhc3RTaGFkb3cgPSAhZGlzYWJsZVNoYWRvd3MgPyB0cnVlIDogZmFsc2VcbiAgZGlyTGlnaHQuaW50ZW5zaXR5ID0gMVxuICBkaXJMaWdodC5zaGFkb3cuY2FtZXJhLm5lYXIgPSAwLjFcbiAgZGlyTGlnaHQuc2hhZG93LmNhbWVyYS5mYXIgPSAyMDBcbiAgZGlyTGlnaHQuc2hhZG93LmNhbWVyYS5yaWdodCA9IDEwXG4gIGRpckxpZ2h0LnNoYWRvdy5jYW1lcmEubGVmdCA9IC0xMFxuICBkaXJMaWdodC5zaGFkb3cuY2FtZXJhLnRvcCA9IDEwXG4gIGRpckxpZ2h0LnNoYWRvdy5jYW1lcmEuYm90dG9tID0gLTEwXG4gIGRpckxpZ2h0LnNoYWRvdy5tYXBTaXplLndpZHRoID0gMjA0OFxuICBkaXJMaWdodC5zaGFkb3cubWFwU2l6ZS5oZWlnaHQgPSAyMDQ4XG4gIGRpckxpZ2h0LnNoYWRvdy5yYWRpdXMgPSA0XG4gIGRpckxpZ2h0LnNoYWRvdy5iaWFzID0gLTAuMDAwMDVcblxuICBzY2VuZS5hZGQoZGlyTGlnaHQpXG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcbmltcG9ydCBHVUkgZnJvbSAnbGlsLWd1aSdcbmltcG9ydCB7IEdMVEZMb2FkZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzJ1xuaW1wb3J0IHsgaW5pdFNjZW5lIH0gZnJvbSAnLi4vLi4vYm9vdHN0cmFwL2Jvb3RzdHJhcC5qcydcbmltcG9ydCB7IHN0YXRzIH0gZnJvbSAnLi4vLi4vdXRpbC9zdGF0cydcblxuY29uc3QgcHJvcHMgPSB7XG4gIGJhY2tncm91bmRDb2xvcjogMHhjY2NjY2MsXG4gIGRpc2FibGVMaWdodHM6IHRydWVcbn1cbmNvbnN0IGd1aSA9IG5ldyBHVUkoKVxuXG5jb25zdCBsb2FkV2F0ZXJmYWxsID0gKHNjZW5lKSA9PiB7XG4gIGNvbnN0IGxvYWRlciA9IG5ldyBHTFRGTG9hZGVyKClcbiAgbG9hZGVyLmxvYWQoJy9hc3NldHMvZ2x0Zi93YXRlcmZhbGwvc2NlbmUuZ2x0ZicsIChsb2FkZWRPYmplY3QpID0+IHtcbiAgICAvLyB0aGUgbmVzdGVkXG4gICAgY29uc3QgbG9hZGVkU2NlbmUgPSBsb2FkZWRPYmplY3Quc2NlbmUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF1cbiAgICBsb2FkZWRTY2VuZS5yb3RhdGVYKC1NYXRoLlBJIC8gMilcbiAgICBjb25zb2xlLmxvZyhsb2FkZWRTY2VuZSlcbiAgICBzY2VuZS5hZGQobG9hZGVkU2NlbmUpXG4gIH0pXG59XG5cbmluaXRTY2VuZShwcm9wcykoKHsgc2NlbmUsIGNhbWVyYSwgcmVuZGVyZXIsIG9yYml0Q29udHJvbHMgfSkgPT4ge1xuICBjYW1lcmEucG9zaXRpb24uc2V0KC03LCAyLCA1KVxuICBvcmJpdENvbnRyb2xzLnVwZGF0ZSgpXG5cbiAgbG9hZFdhdGVyZmFsbChzY2VuZSlcblxuICBjb25zdCBza3lDb2xvciA9IG5ldyBUSFJFRS5Db2xvcigweGZmZmZmZilcbiAgY29uc3QgZ3JvdW5kQ29sb3IgPSBuZXcgVEhSRUUuQ29sb3IoMHhmZmZmZmYpXG4gIGNvbnN0IGxpZ2h0ID0gbmV3IFRIUkVFLkhlbWlzcGhlcmVMaWdodChza3lDb2xvciwgZ3JvdW5kQ29sb3IsIDEpXG4gIGNvbnN0IGhlbHBlciA9IG5ldyBUSFJFRS5IZW1pc3BoZXJlTGlnaHRIZWxwZXIobGlnaHQpXG4gIGxpZ2h0LnBvc2l0aW9uLnNldFkoMjcpXG4gIHNjZW5lLmFkZChoZWxwZXIpXG4gIHNjZW5lLmFkZChsaWdodClcblxuICBmdW5jdGlvbiBhbmltYXRlKCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKVxuICAgIHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhKVxuICAgIHN0YXRzLnVwZGF0ZSgpXG4gICAgaGVscGVyLnVwZGF0ZSgpXG5cbiAgICBvcmJpdENvbnRyb2xzLnVwZGF0ZSgpXG4gIH1cblxuICBjb25zdCBwcm9wcyA9IHtcbiAgICBjb2xvcjogc2t5Q29sb3IuZ2V0U3R5bGUoKSxcbiAgICBncm91bmRDb2xvcjogZ3JvdW5kQ29sb3IuZ2V0U3R5bGUoKVxuICB9XG5cbiAgY29uc3QgaGVtaXNwaGVyZUxpZ2h0Rm9sZGVyID0gZ3VpLmFkZEZvbGRlcignSGVtaXNwaGVyZScpXG4gIGhlbWlzcGhlcmVMaWdodEZvbGRlci5hZGRDb2xvcihwcm9wcywgJ2NvbG9yJykub25DaGFuZ2UoKGMpID0+IGxpZ2h0LmNvbG9yLnNldFN0eWxlKGMpKVxuICBoZW1pc3BoZXJlTGlnaHRGb2xkZXIuYWRkQ29sb3IocHJvcHMsICdncm91bmRDb2xvcicpLm9uQ2hhbmdlKChjKSA9PiBsaWdodC5ncm91bmRDb2xvci5zZXRTdHlsZShjKSlcbiAgaGVtaXNwaGVyZUxpZ2h0Rm9sZGVyLmFkZChsaWdodCwgJ2ludGVuc2l0eScsIDAsIDUsIDAuMSlcbiAgaGVtaXNwaGVyZUxpZ2h0Rm9sZGVyLmFkZChsaWdodC5wb3NpdGlvbiwgJ3gnLCAtMzAsIDMwLCAwLjEpLm5hbWUoJ3Bvc2l0aW9uWCcpXG4gIGhlbWlzcGhlcmVMaWdodEZvbGRlci5hZGQobGlnaHQucG9zaXRpb24sICd5JywgLTMwLCAyMzAsIDAuMSkubmFtZSgncG9zaXRpb25ZJylcbiAgaGVtaXNwaGVyZUxpZ2h0Rm9sZGVyLmFkZChsaWdodC5wb3NpdGlvbiwgJ3onLCAtMzAsIDMwLCAwLjEpLm5hbWUoJ3Bvc2l0aW9uWicpXG5cbiAgYW5pbWF0ZSgpXG59KVxuIiwiaW1wb3J0IHsgT3JiaXRDb250cm9scyB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9jb250cm9scy9PcmJpdENvbnRyb2xzJ1xuXG5leHBvcnQgY29uc3QgaW5pdE9yYml0Q29udHJvbHMgPSAoY2FtZXJhLCByZW5kZXJlcikgPT4ge1xuICBjb25zdCBjb250cm9sbGVyID0gbmV3IE9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlci5kb21FbGVtZW50KVxuICBjb250cm9sbGVyLmVuYWJsZURhbXBpbmcgPSB0cnVlXG4gIGNvbnRyb2xsZXIuZGFtcGluZ0ZhY3RvciA9IDAuMDVcbiAgY29udHJvbGxlci5taW5EaXN0YW5jZSA9IDFcbiAgY29udHJvbGxlci5tYXhEaXN0YW5jZSA9IDEwMFxuICBjb250cm9sbGVyLm1pblBvbGFyQW5nbGUgPSBNYXRoLlBJIC8gNFxuICBjb250cm9sbGVyLm1heFBvbGFyQW5nbGUgPSAoMyAqIE1hdGguUEkpIC8gNFxuXG4gIHJldHVybiBjb250cm9sbGVyXG59XG4iLCJpbXBvcnQgU3RhdHMgZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xpYnMvc3RhdHMubW9kdWxlJ1xuXG5jb25zdCBzdGF0cyA9IFN0YXRzKClcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc3RhdHMuZG9tKVxuXG5leHBvcnQgeyBzdGF0cyB9XG4iLCJleHBvcnQgY29uc3Qgb25SZXNpemUgPSAoY2FtZXJhLCByZW5kZXJlcikgPT4ge1xuICBjb25zdCByZXNpemVyID0gKCkgPT4ge1xuICAgIGNhbWVyYS5hc3BlY3QgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodFxuICAgIGNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KClcbiAgICByZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpXG4gIH1cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZXIsIGZhbHNlKVxufVxuIiwidmFyIFN0YXRzID0gZnVuY3Rpb24gKCkge1xuXG5cdHZhciBtb2RlID0gMDtcblxuXHR2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2RpdicgKTtcblx0Y29udGFpbmVyLnN0eWxlLmNzc1RleHQgPSAncG9zaXRpb246Zml4ZWQ7dG9wOjA7bGVmdDowO2N1cnNvcjpwb2ludGVyO29wYWNpdHk6MC45O3otaW5kZXg6MTAwMDAnO1xuXHRjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lciggJ2NsaWNrJywgZnVuY3Rpb24gKCBldmVudCApIHtcblxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0c2hvd1BhbmVsKCArKyBtb2RlICUgY29udGFpbmVyLmNoaWxkcmVuLmxlbmd0aCApO1xuXG5cdH0sIGZhbHNlICk7XG5cblx0Ly9cblxuXHRmdW5jdGlvbiBhZGRQYW5lbCggcGFuZWwgKSB7XG5cblx0XHRjb250YWluZXIuYXBwZW5kQ2hpbGQoIHBhbmVsLmRvbSApO1xuXHRcdHJldHVybiBwYW5lbDtcblxuXHR9XG5cblx0ZnVuY3Rpb24gc2hvd1BhbmVsKCBpZCApIHtcblxuXHRcdGZvciAoIHZhciBpID0gMDsgaSA8IGNvbnRhaW5lci5jaGlsZHJlbi5sZW5ndGg7IGkgKysgKSB7XG5cblx0XHRcdGNvbnRhaW5lci5jaGlsZHJlblsgaSBdLnN0eWxlLmRpc3BsYXkgPSBpID09PSBpZCA/ICdibG9jaycgOiAnbm9uZSc7XG5cblx0XHR9XG5cblx0XHRtb2RlID0gaWQ7XG5cblx0fVxuXG5cdC8vXG5cblx0dmFyIGJlZ2luVGltZSA9ICggcGVyZm9ybWFuY2UgfHwgRGF0ZSApLm5vdygpLCBwcmV2VGltZSA9IGJlZ2luVGltZSwgZnJhbWVzID0gMDtcblxuXHR2YXIgZnBzUGFuZWwgPSBhZGRQYW5lbCggbmV3IFN0YXRzLlBhbmVsKCAnRlBTJywgJyMwZmYnLCAnIzAwMicgKSApO1xuXHR2YXIgbXNQYW5lbCA9IGFkZFBhbmVsKCBuZXcgU3RhdHMuUGFuZWwoICdNUycsICcjMGYwJywgJyMwMjAnICkgKTtcblxuXHRpZiAoIHNlbGYucGVyZm9ybWFuY2UgJiYgc2VsZi5wZXJmb3JtYW5jZS5tZW1vcnkgKSB7XG5cblx0XHR2YXIgbWVtUGFuZWwgPSBhZGRQYW5lbCggbmV3IFN0YXRzLlBhbmVsKCAnTUInLCAnI2YwOCcsICcjMjAxJyApICk7XG5cblx0fVxuXG5cdHNob3dQYW5lbCggMCApO1xuXG5cdHJldHVybiB7XG5cblx0XHRSRVZJU0lPTjogMTYsXG5cblx0XHRkb206IGNvbnRhaW5lcixcblxuXHRcdGFkZFBhbmVsOiBhZGRQYW5lbCxcblx0XHRzaG93UGFuZWw6IHNob3dQYW5lbCxcblxuXHRcdGJlZ2luOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdGJlZ2luVGltZSA9ICggcGVyZm9ybWFuY2UgfHwgRGF0ZSApLm5vdygpO1xuXG5cdFx0fSxcblxuXHRcdGVuZDogZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRmcmFtZXMgKys7XG5cblx0XHRcdHZhciB0aW1lID0gKCBwZXJmb3JtYW5jZSB8fCBEYXRlICkubm93KCk7XG5cblx0XHRcdG1zUGFuZWwudXBkYXRlKCB0aW1lIC0gYmVnaW5UaW1lLCAyMDAgKTtcblxuXHRcdFx0aWYgKCB0aW1lID49IHByZXZUaW1lICsgMTAwMCApIHtcblxuXHRcdFx0XHRmcHNQYW5lbC51cGRhdGUoICggZnJhbWVzICogMTAwMCApIC8gKCB0aW1lIC0gcHJldlRpbWUgKSwgMTAwICk7XG5cblx0XHRcdFx0cHJldlRpbWUgPSB0aW1lO1xuXHRcdFx0XHRmcmFtZXMgPSAwO1xuXG5cdFx0XHRcdGlmICggbWVtUGFuZWwgKSB7XG5cblx0XHRcdFx0XHR2YXIgbWVtb3J5ID0gcGVyZm9ybWFuY2UubWVtb3J5O1xuXHRcdFx0XHRcdG1lbVBhbmVsLnVwZGF0ZSggbWVtb3J5LnVzZWRKU0hlYXBTaXplIC8gMTA0ODU3NiwgbWVtb3J5LmpzSGVhcFNpemVMaW1pdCAvIDEwNDg1NzYgKTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRpbWU7XG5cblx0XHR9LFxuXG5cdFx0dXBkYXRlOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdGJlZ2luVGltZSA9IHRoaXMuZW5kKCk7XG5cblx0XHR9LFxuXG5cdFx0Ly8gQmFja3dhcmRzIENvbXBhdGliaWxpdHlcblxuXHRcdGRvbUVsZW1lbnQ6IGNvbnRhaW5lcixcblx0XHRzZXRNb2RlOiBzaG93UGFuZWxcblxuXHR9O1xuXG59O1xuXG5TdGF0cy5QYW5lbCA9IGZ1bmN0aW9uICggbmFtZSwgZmcsIGJnICkge1xuXG5cdHZhciBtaW4gPSBJbmZpbml0eSwgbWF4ID0gMCwgcm91bmQgPSBNYXRoLnJvdW5kO1xuXHR2YXIgUFIgPSByb3VuZCggd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMSApO1xuXG5cdHZhciBXSURUSCA9IDgwICogUFIsIEhFSUdIVCA9IDQ4ICogUFIsXG5cdFx0VEVYVF9YID0gMyAqIFBSLCBURVhUX1kgPSAyICogUFIsXG5cdFx0R1JBUEhfWCA9IDMgKiBQUiwgR1JBUEhfWSA9IDE1ICogUFIsXG5cdFx0R1JBUEhfV0lEVEggPSA3NCAqIFBSLCBHUkFQSF9IRUlHSFQgPSAzMCAqIFBSO1xuXG5cdHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnY2FudmFzJyApO1xuXHRjYW52YXMud2lkdGggPSBXSURUSDtcblx0Y2FudmFzLmhlaWdodCA9IEhFSUdIVDtcblx0Y2FudmFzLnN0eWxlLmNzc1RleHQgPSAnd2lkdGg6ODBweDtoZWlnaHQ6NDhweCc7XG5cblx0dmFyIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCggJzJkJyApO1xuXHRjb250ZXh0LmZvbnQgPSAnYm9sZCAnICsgKCA5ICogUFIgKSArICdweCBIZWx2ZXRpY2EsQXJpYWwsc2Fucy1zZXJpZic7XG5cdGNvbnRleHQudGV4dEJhc2VsaW5lID0gJ3RvcCc7XG5cblx0Y29udGV4dC5maWxsU3R5bGUgPSBiZztcblx0Y29udGV4dC5maWxsUmVjdCggMCwgMCwgV0lEVEgsIEhFSUdIVCApO1xuXG5cdGNvbnRleHQuZmlsbFN0eWxlID0gZmc7XG5cdGNvbnRleHQuZmlsbFRleHQoIG5hbWUsIFRFWFRfWCwgVEVYVF9ZICk7XG5cdGNvbnRleHQuZmlsbFJlY3QoIEdSQVBIX1gsIEdSQVBIX1ksIEdSQVBIX1dJRFRILCBHUkFQSF9IRUlHSFQgKTtcblxuXHRjb250ZXh0LmZpbGxTdHlsZSA9IGJnO1xuXHRjb250ZXh0Lmdsb2JhbEFscGhhID0gMC45O1xuXHRjb250ZXh0LmZpbGxSZWN0KCBHUkFQSF9YLCBHUkFQSF9ZLCBHUkFQSF9XSURUSCwgR1JBUEhfSEVJR0hUICk7XG5cblx0cmV0dXJuIHtcblxuXHRcdGRvbTogY2FudmFzLFxuXG5cdFx0dXBkYXRlOiBmdW5jdGlvbiAoIHZhbHVlLCBtYXhWYWx1ZSApIHtcblxuXHRcdFx0bWluID0gTWF0aC5taW4oIG1pbiwgdmFsdWUgKTtcblx0XHRcdG1heCA9IE1hdGgubWF4KCBtYXgsIHZhbHVlICk7XG5cblx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gYmc7XG5cdFx0XHRjb250ZXh0Lmdsb2JhbEFscGhhID0gMTtcblx0XHRcdGNvbnRleHQuZmlsbFJlY3QoIDAsIDAsIFdJRFRILCBHUkFQSF9ZICk7XG5cdFx0XHRjb250ZXh0LmZpbGxTdHlsZSA9IGZnO1xuXHRcdFx0Y29udGV4dC5maWxsVGV4dCggcm91bmQoIHZhbHVlICkgKyAnICcgKyBuYW1lICsgJyAoJyArIHJvdW5kKCBtaW4gKSArICctJyArIHJvdW5kKCBtYXggKSArICcpJywgVEVYVF9YLCBURVhUX1kgKTtcblxuXHRcdFx0Y29udGV4dC5kcmF3SW1hZ2UoIGNhbnZhcywgR1JBUEhfWCArIFBSLCBHUkFQSF9ZLCBHUkFQSF9XSURUSCAtIFBSLCBHUkFQSF9IRUlHSFQsIEdSQVBIX1gsIEdSQVBIX1ksIEdSQVBIX1dJRFRIIC0gUFIsIEdSQVBIX0hFSUdIVCApO1xuXG5cdFx0XHRjb250ZXh0LmZpbGxSZWN0KCBHUkFQSF9YICsgR1JBUEhfV0lEVEggLSBQUiwgR1JBUEhfWSwgUFIsIEdSQVBIX0hFSUdIVCApO1xuXG5cdFx0XHRjb250ZXh0LmZpbGxTdHlsZSA9IGJnO1xuXHRcdFx0Y29udGV4dC5nbG9iYWxBbHBoYSA9IDAuOTtcblx0XHRcdGNvbnRleHQuZmlsbFJlY3QoIEdSQVBIX1ggKyBHUkFQSF9XSURUSCAtIFBSLCBHUkFQSF9ZLCBQUiwgcm91bmQoICggMSAtICggdmFsdWUgLyBtYXhWYWx1ZSApICkgKiBHUkFQSF9IRUlHSFQgKSApO1xuXG5cdFx0fVxuXG5cdH07XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFN0YXRzO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJoZW1pc3BoZXJlLWxpZ2h0XCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2x0anNfZm91cnRoXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2x0anNfZm91cnRoXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9idWlsZF90aHJlZV9tb2R1bGVfanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9jb250cm9sc19PcmJpdENvbnRyb2xzX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc19saWwtZ3VpX2Rpc3RfbGlsLWd1aV9lc21fanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9sb2FkZXJzX0dMVEZMb2FkZXJfanNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItMy9oZW1pc3BoZXJlLWxpZ2h0LmpzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./samples/chapters/chapter-7/spritemap.js"
/*!*************************************************!*\
  !*** ./samples/chapters/chapter-7/spritemap.js ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_libs_stats_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/libs/stats.module */ "./node_modules/three/examples/jsm/libs/stats.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var lil_gui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lil-gui */ "./node_modules/lil-gui/dist/lil-gui.esm.js");





// Note: This is just a getting started example. For the other examples
// we reuse the basic components by extracting them to a set of common
// JavaScript modules / files.
const createSprite = (size, transparent, opacity, spriteNumber) => {
  const spriteMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.SpriteMaterial({
    opacity: opacity,
    color: 0xffffff,
    transparent: transparent,
    map: getTexture()
  })

  // we have 1 row, with five sprites
  spriteMaterial.map.offset = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2(0.2 * spriteNumber, 0)
  spriteMaterial.map.repeat = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2(1 / 5, 1)
  // make sure the object is always rendered at the front
  spriteMaterial.depthTest = false

  const sprite = new three__WEBPACK_IMPORTED_MODULE_0__.Sprite(spriteMaterial)
  sprite.scale.set(size, size, size)
  sprite.position.set(100, 50, -10)
  sprite.velocityX = 5
  sprite.name = 'Sprite'

  sceneOrtho.add(sprite)
}

const getTexture = () => {
  const texture = new three__WEBPACK_IMPORTED_MODULE_0__.TextureLoader().load('/assets/textures/particles/sprite-sheet.png')
  return texture
}

// we use two scenes
const scene = new three__WEBPACK_IMPORTED_MODULE_0__.Scene()
scene.backgroundColor = 0xffffff
scene.fog = new three__WEBPACK_IMPORTED_MODULE_0__.Fog(0xffffff, 0.0025, 50)

const sceneOrtho = new three__WEBPACK_IMPORTED_MODULE_0__.Scene()
sceneOrtho.backgroundColor = new three__WEBPACK_IMPORTED_MODULE_0__.Color(0x000000)

// and two cameras
const camera = new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(-3, 2, 8)

const cameraOrtho = new three__WEBPACK_IMPORTED_MODULE_0__.OrthographicCamera(0, window.innerWidth, window.innerHeight, 0, -10, 10)

// setup the renderer and attach to canvas
const renderer = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer({ antialias: true })
renderer.outputEncoding = three__WEBPACK_IMPORTED_MODULE_0__.sRGBEncoding
renderer.shadowMap.enabled = true
renderer.shadowMap.type = three__WEBPACK_IMPORTED_MODULE_0__.VSMShadowMap
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0xffffff)
document.body.appendChild(renderer.domElement)

// add a
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

// add orbitcontrols
const controller = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_2__.OrbitControls(camera, renderer.domElement)
controller.enableDamping = true
controller.dampingFactor = 0.05
controller.minDistance = 3
controller.maxDistance = 10
controller.minPolarAngle = Math.PI / 4
controller.maxPolarAngle = (3 * Math.PI) / 4

// create a cube and torus knot and add them to the scene
const cubeGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.BoxGeometry()
const cubeMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.MeshPhongMaterial({ color: 0x0000ff })
const cube = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(cubeGeometry, cubeMaterial)

cube.position.x = -1
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
scene.add(torusKnotMesh)

// create a very large ground plane
const groundGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.PlaneBufferGeometry(10000, 10000)
const groundMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.MeshLambertMaterial({
  color: 0xffffff
})
const groundMesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(groundGeometry, groundMaterial)
groundMesh.position.set(0, -2, 0)
groundMesh.rotation.set(Math.PI / -2, 0, 0)
groundMesh.receiveShadow = true
scene.add(groundMesh)

// add stats
const stats = (0,three_examples_jsm_libs_stats_module__WEBPACK_IMPORTED_MODULE_1__["default"])()
document.body.appendChild(stats.dom)

// add gui
const gui = new lil_gui__WEBPACK_IMPORTED_MODULE_3__["default"]()
const props = {
  cubeSpeed: 0.01,
  torusSpeed: 0.01,
  size: 200,
  sprite: 1,
  transparent: true,
  opacity: 0.6,
  redraw: () => {
    const sprite = sceneOrtho.getObjectByName('Sprite')
    if (sprite) sceneOrtho.remove(sprite)
    createSprite(props.size, props.transparent, props.opacity, props.sprite)
  }
}

gui.add(props, 'cubeSpeed', -0.2, 0.2, 0.01)
gui.add(props, 'torusSpeed', -0.2, 0.2, 0.01)
gui.add(props, 'sprite', 0, 4, 1).onChange(props.redraw)
gui.add(props, 'size', 0, 120, 1).onChange(props.redraw)
gui.add(props, 'transparent').onChange(props.redraw)
gui.add(props, 'opacity', 0, 1, 0.01).onChange(props.redraw)

createSprite(props.size, props.transparent, props.opacity, props.sprite)

renderer.render(scene, camera)

// render the scene
function animate() {
  requestAnimationFrame(animate)

  renderer.render(scene, camera)
  renderer.autoClear = false
  renderer.render(sceneOrtho, cameraOrtho)

  stats.update()
  cube.rotation.x += props.cubeSpeed
  cube.rotation.y += props.cubeSpeed
  cube.rotation.z += props.cubeSpeed

  torusKnotMesh.rotation.x -= props.torusSpeed
  torusKnotMesh.rotation.y += props.torusSpeed
  torusKnotMesh.rotation.z -= props.torusSpeed

  const sprite = sceneOrtho.getObjectByName('Sprite')
  if (sprite) {
    sprite.position.x = sprite.position.x + sprite.velocityX
    if (sprite.position.x > window.innerWidth) {
      sprite.velocityX = -5
      props.sprite += 1
      sprite.material.map.offset.set((1 / 5) * (props.sprite % 4), 0)
    }
    if (sprite.position.x < 0) {
      sprite.velocityX = 5
    }
  }

  controller.update()
}
animate()


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
/******/ 			"spritemap": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js"], () => (__webpack_require__("./samples/chapters/chapter-7/spritemap.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci03L3Nwcml0ZW1hcC5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL25vZGVfbW9kdWxlcy90aHJlZS9leGFtcGxlcy9qc20vbGlicy9zdGF0cy5tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcbmltcG9ydCBTdGF0cyBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbGlicy9zdGF0cy5tb2R1bGUnXG5pbXBvcnQgeyBPcmJpdENvbnRyb2xzIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2NvbnRyb2xzL09yYml0Q29udHJvbHMnXG5pbXBvcnQgR1VJIGZyb20gJ2xpbC1ndWknXG5cbi8vIE5vdGU6IFRoaXMgaXMganVzdCBhIGdldHRpbmcgc3RhcnRlZCBleGFtcGxlLiBGb3IgdGhlIG90aGVyIGV4YW1wbGVzXG4vLyB3ZSByZXVzZSB0aGUgYmFzaWMgY29tcG9uZW50cyBieSBleHRyYWN0aW5nIHRoZW0gdG8gYSBzZXQgb2YgY29tbW9uXG4vLyBKYXZhU2NyaXB0IG1vZHVsZXMgLyBmaWxlcy5cbmNvbnN0IGNyZWF0ZVNwcml0ZSA9IChzaXplLCB0cmFuc3BhcmVudCwgb3BhY2l0eSwgc3ByaXRlTnVtYmVyKSA9PiB7XG4gIGNvbnN0IHNwcml0ZU1hdGVyaWFsID0gbmV3IFRIUkVFLlNwcml0ZU1hdGVyaWFsKHtcbiAgICBvcGFjaXR5OiBvcGFjaXR5LFxuICAgIGNvbG9yOiAweGZmZmZmZixcbiAgICB0cmFuc3BhcmVudDogdHJhbnNwYXJlbnQsXG4gICAgbWFwOiBnZXRUZXh0dXJlKClcbiAgfSlcblxuICAvLyB3ZSBoYXZlIDEgcm93LCB3aXRoIGZpdmUgc3ByaXRlc1xuICBzcHJpdGVNYXRlcmlhbC5tYXAub2Zmc2V0ID0gbmV3IFRIUkVFLlZlY3RvcjIoMC4yICogc3ByaXRlTnVtYmVyLCAwKVxuICBzcHJpdGVNYXRlcmlhbC5tYXAucmVwZWF0ID0gbmV3IFRIUkVFLlZlY3RvcjIoMSAvIDUsIDEpXG4gIC8vIG1ha2Ugc3VyZSB0aGUgb2JqZWN0IGlzIGFsd2F5cyByZW5kZXJlZCBhdCB0aGUgZnJvbnRcbiAgc3ByaXRlTWF0ZXJpYWwuZGVwdGhUZXN0ID0gZmFsc2VcblxuICBjb25zdCBzcHJpdGUgPSBuZXcgVEhSRUUuU3ByaXRlKHNwcml0ZU1hdGVyaWFsKVxuICBzcHJpdGUuc2NhbGUuc2V0KHNpemUsIHNpemUsIHNpemUpXG4gIHNwcml0ZS5wb3NpdGlvbi5zZXQoMTAwLCA1MCwgLTEwKVxuICBzcHJpdGUudmVsb2NpdHlYID0gNVxuICBzcHJpdGUubmFtZSA9ICdTcHJpdGUnXG5cbiAgc2NlbmVPcnRoby5hZGQoc3ByaXRlKVxufVxuXG5jb25zdCBnZXRUZXh0dXJlID0gKCkgPT4ge1xuICBjb25zdCB0ZXh0dXJlID0gbmV3IFRIUkVFLlRleHR1cmVMb2FkZXIoKS5sb2FkKCcvYXNzZXRzL3RleHR1cmVzL3BhcnRpY2xlcy9zcHJpdGUtc2hlZXQucG5nJylcbiAgcmV0dXJuIHRleHR1cmVcbn1cblxuLy8gd2UgdXNlIHR3byBzY2VuZXNcbmNvbnN0IHNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKClcbnNjZW5lLmJhY2tncm91bmRDb2xvciA9IDB4ZmZmZmZmXG5zY2VuZS5mb2cgPSBuZXcgVEhSRUUuRm9nKDB4ZmZmZmZmLCAwLjAwMjUsIDUwKVxuXG5jb25zdCBzY2VuZU9ydGhvID0gbmV3IFRIUkVFLlNjZW5lKClcbnNjZW5lT3J0aG8uYmFja2dyb3VuZENvbG9yID0gbmV3IFRIUkVFLkNvbG9yKDB4MDAwMDAwKVxuXG4vLyBhbmQgdHdvIGNhbWVyYXNcbmNvbnN0IGNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg3NSwgd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQsIDAuMSwgMTAwMClcbmNhbWVyYS5wb3NpdGlvbi5zZXQoLTMsIDIsIDgpXG5cbmNvbnN0IGNhbWVyYU9ydGhvID0gbmV3IFRIUkVFLk9ydGhvZ3JhcGhpY0NhbWVyYSgwLCB3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0LCAwLCAtMTAsIDEwKVxuXG4vLyBzZXR1cCB0aGUgcmVuZGVyZXIgYW5kIGF0dGFjaCB0byBjYW52YXNcbmNvbnN0IHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoeyBhbnRpYWxpYXM6IHRydWUgfSlcbnJlbmRlcmVyLm91dHB1dEVuY29kaW5nID0gVEhSRUUuc1JHQkVuY29kaW5nXG5yZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IHRydWVcbnJlbmRlcmVyLnNoYWRvd01hcC50eXBlID0gVEhSRUUuVlNNU2hhZG93TWFwXG5yZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpXG5yZW5kZXJlci5zZXRDbGVhckNvbG9yKDB4ZmZmZmZmKVxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci5kb21FbGVtZW50KVxuXG4vLyBhZGQgYVxuY29uc3QgZGlyTGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGFhYWFhYSlcbmRpckxpZ2h0LnBvc2l0aW9uLnNldCg1LCAxMiwgOClcbmRpckxpZ2h0LmNhc3RTaGFkb3cgPSB0cnVlXG5kaXJMaWdodC5pbnRlbnNpdHkgPSAxXG5kaXJMaWdodC5zaGFkb3cuY2FtZXJhLm5lYXIgPSAwLjFcbmRpckxpZ2h0LnNoYWRvdy5jYW1lcmEuZmFyID0gMjAwXG5kaXJMaWdodC5zaGFkb3cuY2FtZXJhLnJpZ2h0ID0gMTBcbmRpckxpZ2h0LnNoYWRvdy5jYW1lcmEubGVmdCA9IC0xMFxuZGlyTGlnaHQuc2hhZG93LmNhbWVyYS50b3AgPSAxMFxuZGlyTGlnaHQuc2hhZG93LmNhbWVyYS5ib3R0b20gPSAtMTBcbmRpckxpZ2h0LnNoYWRvdy5tYXBTaXplLndpZHRoID0gNTEyXG5kaXJMaWdodC5zaGFkb3cubWFwU2l6ZS5oZWlnaHQgPSA1MTJcbmRpckxpZ2h0LnNoYWRvdy5yYWRpdXMgPSA0XG5kaXJMaWdodC5zaGFkb3cuYmlhcyA9IC0wLjAwMDVcbnNjZW5lLmFkZChkaXJMaWdodClcblxuLy8gYWRkIG9yYml0Y29udHJvbHNcbmNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgT3JiaXRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLmRvbUVsZW1lbnQpXG5jb250cm9sbGVyLmVuYWJsZURhbXBpbmcgPSB0cnVlXG5jb250cm9sbGVyLmRhbXBpbmdGYWN0b3IgPSAwLjA1XG5jb250cm9sbGVyLm1pbkRpc3RhbmNlID0gM1xuY29udHJvbGxlci5tYXhEaXN0YW5jZSA9IDEwXG5jb250cm9sbGVyLm1pblBvbGFyQW5nbGUgPSBNYXRoLlBJIC8gNFxuY29udHJvbGxlci5tYXhQb2xhckFuZ2xlID0gKDMgKiBNYXRoLlBJKSAvIDRcblxuLy8gY3JlYXRlIGEgY3ViZSBhbmQgdG9ydXMga25vdCBhbmQgYWRkIHRoZW0gdG8gdGhlIHNjZW5lXG5jb25zdCBjdWJlR2VvbWV0cnkgPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoKVxuY29uc3QgY3ViZU1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKHsgY29sb3I6IDB4MDAwMGZmIH0pXG5jb25zdCBjdWJlID0gbmV3IFRIUkVFLk1lc2goY3ViZUdlb21ldHJ5LCBjdWJlTWF0ZXJpYWwpXG5cbmN1YmUucG9zaXRpb24ueCA9IC0xXG5jdWJlLmNhc3RTaGFkb3cgPSB0cnVlXG5zY2VuZS5hZGQoY3ViZSlcblxuY29uc3QgdG9ydXNLbm90R2VvbWV0cnkgPSBuZXcgVEhSRUUuVG9ydXNLbm90QnVmZmVyR2VvbWV0cnkoMC41LCAwLjIsIDEwMCwgMTAwKVxuY29uc3QgdG9ydXNLbm90TWF0ID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcbiAgY29sb3I6IDB4MDBmZjg4LFxuICByb3VnaG5lc3M6IDAuMVxufSlcbmNvbnN0IHRvcnVzS25vdE1lc2ggPSBuZXcgVEhSRUUuTWVzaCh0b3J1c0tub3RHZW9tZXRyeSwgdG9ydXNLbm90TWF0KVxuXG50b3J1c0tub3RNZXNoLmNhc3RTaGFkb3cgPSB0cnVlXG50b3J1c0tub3RNZXNoLnBvc2l0aW9uLnggPSAyXG5zY2VuZS5hZGQodG9ydXNLbm90TWVzaClcblxuLy8gY3JlYXRlIGEgdmVyeSBsYXJnZSBncm91bmQgcGxhbmVcbmNvbnN0IGdyb3VuZEdlb21ldHJ5ID0gbmV3IFRIUkVFLlBsYW5lQnVmZmVyR2VvbWV0cnkoMTAwMDAsIDEwMDAwKVxuY29uc3QgZ3JvdW5kTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7XG4gIGNvbG9yOiAweGZmZmZmZlxufSlcbmNvbnN0IGdyb3VuZE1lc2ggPSBuZXcgVEhSRUUuTWVzaChncm91bmRHZW9tZXRyeSwgZ3JvdW5kTWF0ZXJpYWwpXG5ncm91bmRNZXNoLnBvc2l0aW9uLnNldCgwLCAtMiwgMClcbmdyb3VuZE1lc2gucm90YXRpb24uc2V0KE1hdGguUEkgLyAtMiwgMCwgMClcbmdyb3VuZE1lc2gucmVjZWl2ZVNoYWRvdyA9IHRydWVcbnNjZW5lLmFkZChncm91bmRNZXNoKVxuXG4vLyBhZGQgc3RhdHNcbmNvbnN0IHN0YXRzID0gU3RhdHMoKVxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzdGF0cy5kb20pXG5cbi8vIGFkZCBndWlcbmNvbnN0IGd1aSA9IG5ldyBHVUkoKVxuY29uc3QgcHJvcHMgPSB7XG4gIGN1YmVTcGVlZDogMC4wMSxcbiAgdG9ydXNTcGVlZDogMC4wMSxcbiAgc2l6ZTogMjAwLFxuICBzcHJpdGU6IDEsXG4gIHRyYW5zcGFyZW50OiB0cnVlLFxuICBvcGFjaXR5OiAwLjYsXG4gIHJlZHJhdzogKCkgPT4ge1xuICAgIGNvbnN0IHNwcml0ZSA9IHNjZW5lT3J0aG8uZ2V0T2JqZWN0QnlOYW1lKCdTcHJpdGUnKVxuICAgIGlmIChzcHJpdGUpIHNjZW5lT3J0aG8ucmVtb3ZlKHNwcml0ZSlcbiAgICBjcmVhdGVTcHJpdGUocHJvcHMuc2l6ZSwgcHJvcHMudHJhbnNwYXJlbnQsIHByb3BzLm9wYWNpdHksIHByb3BzLnNwcml0ZSlcbiAgfVxufVxuXG5ndWkuYWRkKHByb3BzLCAnY3ViZVNwZWVkJywgLTAuMiwgMC4yLCAwLjAxKVxuZ3VpLmFkZChwcm9wcywgJ3RvcnVzU3BlZWQnLCAtMC4yLCAwLjIsIDAuMDEpXG5ndWkuYWRkKHByb3BzLCAnc3ByaXRlJywgMCwgNCwgMSkub25DaGFuZ2UocHJvcHMucmVkcmF3KVxuZ3VpLmFkZChwcm9wcywgJ3NpemUnLCAwLCAxMjAsIDEpLm9uQ2hhbmdlKHByb3BzLnJlZHJhdylcbmd1aS5hZGQocHJvcHMsICd0cmFuc3BhcmVudCcpLm9uQ2hhbmdlKHByb3BzLnJlZHJhdylcbmd1aS5hZGQocHJvcHMsICdvcGFjaXR5JywgMCwgMSwgMC4wMSkub25DaGFuZ2UocHJvcHMucmVkcmF3KVxuXG5jcmVhdGVTcHJpdGUocHJvcHMuc2l6ZSwgcHJvcHMudHJhbnNwYXJlbnQsIHByb3BzLm9wYWNpdHksIHByb3BzLnNwcml0ZSlcblxucmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEpXG5cbi8vIHJlbmRlciB0aGUgc2NlbmVcbmZ1bmN0aW9uIGFuaW1hdGUoKSB7XG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKVxuXG4gIHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhKVxuICByZW5kZXJlci5hdXRvQ2xlYXIgPSBmYWxzZVxuICByZW5kZXJlci5yZW5kZXIoc2NlbmVPcnRobywgY2FtZXJhT3J0aG8pXG5cbiAgc3RhdHMudXBkYXRlKClcbiAgY3ViZS5yb3RhdGlvbi54ICs9IHByb3BzLmN1YmVTcGVlZFxuICBjdWJlLnJvdGF0aW9uLnkgKz0gcHJvcHMuY3ViZVNwZWVkXG4gIGN1YmUucm90YXRpb24ueiArPSBwcm9wcy5jdWJlU3BlZWRcblxuICB0b3J1c0tub3RNZXNoLnJvdGF0aW9uLnggLT0gcHJvcHMudG9ydXNTcGVlZFxuICB0b3J1c0tub3RNZXNoLnJvdGF0aW9uLnkgKz0gcHJvcHMudG9ydXNTcGVlZFxuICB0b3J1c0tub3RNZXNoLnJvdGF0aW9uLnogLT0gcHJvcHMudG9ydXNTcGVlZFxuXG4gIGNvbnN0IHNwcml0ZSA9IHNjZW5lT3J0aG8uZ2V0T2JqZWN0QnlOYW1lKCdTcHJpdGUnKVxuICBpZiAoc3ByaXRlKSB7XG4gICAgc3ByaXRlLnBvc2l0aW9uLnggPSBzcHJpdGUucG9zaXRpb24ueCArIHNwcml0ZS52ZWxvY2l0eVhcbiAgICBpZiAoc3ByaXRlLnBvc2l0aW9uLnggPiB3aW5kb3cuaW5uZXJXaWR0aCkge1xuICAgICAgc3ByaXRlLnZlbG9jaXR5WCA9IC01XG4gICAgICBwcm9wcy5zcHJpdGUgKz0gMVxuICAgICAgc3ByaXRlLm1hdGVyaWFsLm1hcC5vZmZzZXQuc2V0KCgxIC8gNSkgKiAocHJvcHMuc3ByaXRlICUgNCksIDApXG4gICAgfVxuICAgIGlmIChzcHJpdGUucG9zaXRpb24ueCA8IDApIHtcbiAgICAgIHNwcml0ZS52ZWxvY2l0eVggPSA1XG4gICAgfVxuICB9XG5cbiAgY29udHJvbGxlci51cGRhdGUoKVxufVxuYW5pbWF0ZSgpXG4iLCJ2YXIgU3RhdHMgPSBmdW5jdGlvbiAoKSB7XG5cblx0dmFyIG1vZGUgPSAwO1xuXG5cdHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuXHRjb250YWluZXIuc3R5bGUuY3NzVGV4dCA9ICdwb3NpdGlvbjpmaXhlZDt0b3A6MDtsZWZ0OjA7Y3Vyc29yOnBvaW50ZXI7b3BhY2l0eTowLjk7ei1pbmRleDoxMDAwMCc7XG5cdGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCAnY2xpY2snLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRzaG93UGFuZWwoICsrIG1vZGUgJSBjb250YWluZXIuY2hpbGRyZW4ubGVuZ3RoICk7XG5cblx0fSwgZmFsc2UgKTtcblxuXHQvL1xuXG5cdGZ1bmN0aW9uIGFkZFBhbmVsKCBwYW5lbCApIHtcblxuXHRcdGNvbnRhaW5lci5hcHBlbmRDaGlsZCggcGFuZWwuZG9tICk7XG5cdFx0cmV0dXJuIHBhbmVsO1xuXG5cdH1cblxuXHRmdW5jdGlvbiBzaG93UGFuZWwoIGlkICkge1xuXG5cdFx0Zm9yICggdmFyIGkgPSAwOyBpIDwgY29udGFpbmVyLmNoaWxkcmVuLmxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0Y29udGFpbmVyLmNoaWxkcmVuWyBpIF0uc3R5bGUuZGlzcGxheSA9IGkgPT09IGlkID8gJ2Jsb2NrJyA6ICdub25lJztcblxuXHRcdH1cblxuXHRcdG1vZGUgPSBpZDtcblxuXHR9XG5cblx0Ly9cblxuXHR2YXIgYmVnaW5UaW1lID0gKCBwZXJmb3JtYW5jZSB8fCBEYXRlICkubm93KCksIHByZXZUaW1lID0gYmVnaW5UaW1lLCBmcmFtZXMgPSAwO1xuXG5cdHZhciBmcHNQYW5lbCA9IGFkZFBhbmVsKCBuZXcgU3RhdHMuUGFuZWwoICdGUFMnLCAnIzBmZicsICcjMDAyJyApICk7XG5cdHZhciBtc1BhbmVsID0gYWRkUGFuZWwoIG5ldyBTdGF0cy5QYW5lbCggJ01TJywgJyMwZjAnLCAnIzAyMCcgKSApO1xuXG5cdGlmICggc2VsZi5wZXJmb3JtYW5jZSAmJiBzZWxmLnBlcmZvcm1hbmNlLm1lbW9yeSApIHtcblxuXHRcdHZhciBtZW1QYW5lbCA9IGFkZFBhbmVsKCBuZXcgU3RhdHMuUGFuZWwoICdNQicsICcjZjA4JywgJyMyMDEnICkgKTtcblxuXHR9XG5cblx0c2hvd1BhbmVsKCAwICk7XG5cblx0cmV0dXJuIHtcblxuXHRcdFJFVklTSU9OOiAxNixcblxuXHRcdGRvbTogY29udGFpbmVyLFxuXG5cdFx0YWRkUGFuZWw6IGFkZFBhbmVsLFxuXHRcdHNob3dQYW5lbDogc2hvd1BhbmVsLFxuXG5cdFx0YmVnaW46IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0YmVnaW5UaW1lID0gKCBwZXJmb3JtYW5jZSB8fCBEYXRlICkubm93KCk7XG5cblx0XHR9LFxuXG5cdFx0ZW5kOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdGZyYW1lcyArKztcblxuXHRcdFx0dmFyIHRpbWUgPSAoIHBlcmZvcm1hbmNlIHx8IERhdGUgKS5ub3coKTtcblxuXHRcdFx0bXNQYW5lbC51cGRhdGUoIHRpbWUgLSBiZWdpblRpbWUsIDIwMCApO1xuXG5cdFx0XHRpZiAoIHRpbWUgPj0gcHJldlRpbWUgKyAxMDAwICkge1xuXG5cdFx0XHRcdGZwc1BhbmVsLnVwZGF0ZSggKCBmcmFtZXMgKiAxMDAwICkgLyAoIHRpbWUgLSBwcmV2VGltZSApLCAxMDAgKTtcblxuXHRcdFx0XHRwcmV2VGltZSA9IHRpbWU7XG5cdFx0XHRcdGZyYW1lcyA9IDA7XG5cblx0XHRcdFx0aWYgKCBtZW1QYW5lbCApIHtcblxuXHRcdFx0XHRcdHZhciBtZW1vcnkgPSBwZXJmb3JtYW5jZS5tZW1vcnk7XG5cdFx0XHRcdFx0bWVtUGFuZWwudXBkYXRlKCBtZW1vcnkudXNlZEpTSGVhcFNpemUgLyAxMDQ4NTc2LCBtZW1vcnkuanNIZWFwU2l6ZUxpbWl0IC8gMTA0ODU3NiApO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdGltZTtcblxuXHRcdH0sXG5cblx0XHR1cGRhdGU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0YmVnaW5UaW1lID0gdGhpcy5lbmQoKTtcblxuXHRcdH0sXG5cblx0XHQvLyBCYWNrd2FyZHMgQ29tcGF0aWJpbGl0eVxuXG5cdFx0ZG9tRWxlbWVudDogY29udGFpbmVyLFxuXHRcdHNldE1vZGU6IHNob3dQYW5lbFxuXG5cdH07XG5cbn07XG5cblN0YXRzLlBhbmVsID0gZnVuY3Rpb24gKCBuYW1lLCBmZywgYmcgKSB7XG5cblx0dmFyIG1pbiA9IEluZmluaXR5LCBtYXggPSAwLCByb3VuZCA9IE1hdGgucm91bmQ7XG5cdHZhciBQUiA9IHJvdW5kKCB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxICk7XG5cblx0dmFyIFdJRFRIID0gODAgKiBQUiwgSEVJR0hUID0gNDggKiBQUixcblx0XHRURVhUX1ggPSAzICogUFIsIFRFWFRfWSA9IDIgKiBQUixcblx0XHRHUkFQSF9YID0gMyAqIFBSLCBHUkFQSF9ZID0gMTUgKiBQUixcblx0XHRHUkFQSF9XSURUSCA9IDc0ICogUFIsIEdSQVBIX0hFSUdIVCA9IDMwICogUFI7XG5cblx0dmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdjYW52YXMnICk7XG5cdGNhbnZhcy53aWR0aCA9IFdJRFRIO1xuXHRjYW52YXMuaGVpZ2h0ID0gSEVJR0hUO1xuXHRjYW52YXMuc3R5bGUuY3NzVGV4dCA9ICd3aWR0aDo4MHB4O2hlaWdodDo0OHB4JztcblxuXHR2YXIgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCAnMmQnICk7XG5cdGNvbnRleHQuZm9udCA9ICdib2xkICcgKyAoIDkgKiBQUiApICsgJ3B4IEhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmJztcblx0Y29udGV4dC50ZXh0QmFzZWxpbmUgPSAndG9wJztcblxuXHRjb250ZXh0LmZpbGxTdHlsZSA9IGJnO1xuXHRjb250ZXh0LmZpbGxSZWN0KCAwLCAwLCBXSURUSCwgSEVJR0hUICk7XG5cblx0Y29udGV4dC5maWxsU3R5bGUgPSBmZztcblx0Y29udGV4dC5maWxsVGV4dCggbmFtZSwgVEVYVF9YLCBURVhUX1kgKTtcblx0Y29udGV4dC5maWxsUmVjdCggR1JBUEhfWCwgR1JBUEhfWSwgR1JBUEhfV0lEVEgsIEdSQVBIX0hFSUdIVCApO1xuXG5cdGNvbnRleHQuZmlsbFN0eWxlID0gYmc7XG5cdGNvbnRleHQuZ2xvYmFsQWxwaGEgPSAwLjk7XG5cdGNvbnRleHQuZmlsbFJlY3QoIEdSQVBIX1gsIEdSQVBIX1ksIEdSQVBIX1dJRFRILCBHUkFQSF9IRUlHSFQgKTtcblxuXHRyZXR1cm4ge1xuXG5cdFx0ZG9tOiBjYW52YXMsXG5cblx0XHR1cGRhdGU6IGZ1bmN0aW9uICggdmFsdWUsIG1heFZhbHVlICkge1xuXG5cdFx0XHRtaW4gPSBNYXRoLm1pbiggbWluLCB2YWx1ZSApO1xuXHRcdFx0bWF4ID0gTWF0aC5tYXgoIG1heCwgdmFsdWUgKTtcblxuXHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSBiZztcblx0XHRcdGNvbnRleHQuZ2xvYmFsQWxwaGEgPSAxO1xuXHRcdFx0Y29udGV4dC5maWxsUmVjdCggMCwgMCwgV0lEVEgsIEdSQVBIX1kgKTtcblx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gZmc7XG5cdFx0XHRjb250ZXh0LmZpbGxUZXh0KCByb3VuZCggdmFsdWUgKSArICcgJyArIG5hbWUgKyAnICgnICsgcm91bmQoIG1pbiApICsgJy0nICsgcm91bmQoIG1heCApICsgJyknLCBURVhUX1gsIFRFWFRfWSApO1xuXG5cdFx0XHRjb250ZXh0LmRyYXdJbWFnZSggY2FudmFzLCBHUkFQSF9YICsgUFIsIEdSQVBIX1ksIEdSQVBIX1dJRFRIIC0gUFIsIEdSQVBIX0hFSUdIVCwgR1JBUEhfWCwgR1JBUEhfWSwgR1JBUEhfV0lEVEggLSBQUiwgR1JBUEhfSEVJR0hUICk7XG5cblx0XHRcdGNvbnRleHQuZmlsbFJlY3QoIEdSQVBIX1ggKyBHUkFQSF9XSURUSCAtIFBSLCBHUkFQSF9ZLCBQUiwgR1JBUEhfSEVJR0hUICk7XG5cblx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gYmc7XG5cdFx0XHRjb250ZXh0Lmdsb2JhbEFscGhhID0gMC45O1xuXHRcdFx0Y29udGV4dC5maWxsUmVjdCggR1JBUEhfWCArIEdSQVBIX1dJRFRIIC0gUFIsIEdSQVBIX1ksIFBSLCByb3VuZCggKCAxIC0gKCB2YWx1ZSAvIG1heFZhbHVlICkgKSAqIEdSQVBIX0hFSUdIVCApICk7XG5cblx0XHR9XG5cblx0fTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgU3RhdHM7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcInNwcml0ZW1hcFwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtsdGpzX2ZvdXJ0aFwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtsdGpzX2ZvdXJ0aFwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfYnVpbGRfdGhyZWVfbW9kdWxlX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fY29udHJvbHNfT3JiaXRDb250cm9sc19qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfbGlsLWd1aV9kaXN0X2xpbC1ndWlfZXNtX2pzXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTcvc3ByaXRlbWFwLmpzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
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

/***/ "./samples/chapters/chapter-3/light-probe.js"
/*!***************************************************!*\
  !*** ./samples/chapters/chapter-3/light-probe.js ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/loaders/GLTFLoader.js */ "./node_modules/three/examples/jsm/loaders/GLTFLoader.js");
/* harmony import */ var _bootstrap_bootstrap_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../bootstrap/bootstrap.js */ "./samples/bootstrap/bootstrap.js");
/* harmony import */ var three_examples_jsm_lights_LightProbeGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/jsm/lights/LightProbeGenerator */ "./node_modules/three/examples/jsm/lights/LightProbeGenerator.js");
/* harmony import */ var _util_stats__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/stats */ "./samples/util/stats.js");
/* harmony import */ var _util_modelUtil_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../util/modelUtil.js */ "./samples/util/modelUtil.js");







const props = {
  backgroundColor: 0xcccccc,
  disableLights: true
}
const loadIsland = (scene) => {
  const loader = new three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader()
  loader.load('/assets/gltf/flying_island/scene.gltf', (loadedObject) => {
    // the nested
    const loadedScene = loadedObject.scene.children[0].children[0].children[0]
    ;(0,_util_modelUtil_js__WEBPACK_IMPORTED_MODULE_5__.visitChildren)(loadedScene, (c) => {
      c.receiveShadow = true
      c.castShadow = true
    })
    loadedScene.scale.set(0.022, 0.022, 0.022)
    loadedScene.translateY(-7)
    scene.add(loadedScene)
  })
}

const loadCubeMap = (renderer, scene) => {
  const base = 'drachenfels'
  const ext = 'png'
  const urls = [
    '/assets/panorama/' + base + '/posx.' + ext,
    '/assets/panorama/' + base + '/negx.' + ext,
    '/assets/panorama/' + base + '/posy.' + ext,
    '/assets/panorama/' + base + '/negy.' + ext,
    '/assets/panorama/' + base + '/posz.' + ext,
    '/assets/panorama/' + base + '/negz.' + ext
  ]

  new three__WEBPACK_IMPORTED_MODULE_0__.CubeTextureLoader().load(urls, function (cubeTexture) {
    cubeTexture.encoding = three__WEBPACK_IMPORTED_MODULE_0__.sRGBEncoding
    scene.background = cubeTexture
    const lp = three_examples_jsm_lights_LightProbeGenerator__WEBPACK_IMPORTED_MODULE_3__.LightProbeGenerator.fromCubeTexture(cubeTexture)
    lp.intensity = 15
    scene.add(lp)
  })
}

;(0,_bootstrap_bootstrap_js__WEBPACK_IMPORTED_MODULE_2__.initScene)(props)(({ scene, camera, renderer, orbitControls }) => {
  camera.position.set(-7, 2, 5)
  orbitControls.update()

  loadIsland(scene)

  loadCubeMap(renderer, scene)

  const lightProbe = new three__WEBPACK_IMPORTED_MODULE_0__.LightProbe()
  scene.add(lightProbe)

  function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    _util_stats__WEBPACK_IMPORTED_MODULE_4__.stats.update()

    orbitControls.update()
  }

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

/***/ "./samples/util/modelUtil.js"
/*!***********************************!*\
  !*** ./samples/util/modelUtil.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyShadowsAndDepthWrite: () => (/* binding */ applyShadowsAndDepthWrite),
/* harmony export */   findChild: () => (/* binding */ findChild),
/* harmony export */   visitChildren: () => (/* binding */ visitChildren)
/* harmony export */ });
const visitChildren = (object, fn) => {
  if (object.children && object.children.length > 0) {
    for (const child of object.children) {
      visitChildren(child, fn)
    }
  } else {
    fn(object)
  }
}

const applyShadowsAndDepthWrite = (object) => {
  visitChildren(object, (child) => {
    if (child.material) {
      child.material.depthWrite = true
      child.castShadow = true
      child.receiveShadow = true
    }
  })
}

const findChild = (object, name) => {
  if (object.children && object.children.length > 0) {
    for (const child of object.children) {
      if (name === child.name) {
        return child
      } else {
        const res = findChild(child, name)
        if (res) {
          return res
        }
      }
    }
  } else {
    if (name === object.name) {
      return object
    } else {
      return undefined
    }
  }
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


/***/ },

/***/ "./node_modules/three/examples/jsm/lights/LightProbeGenerator.js"
/*!***********************************************************************!*\
  !*** ./node_modules/three/examples/jsm/lights/LightProbeGenerator.js ***!
  \***********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LightProbeGenerator: () => (/* binding */ LightProbeGenerator)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");


class LightProbeGenerator {

	// https://www.ppsloan.org/publications/StupidSH36.pdf
	static fromCubeTexture( cubeTexture ) {

		let totalWeight = 0;

		const coord = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();

		const dir = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();

		const color = new three__WEBPACK_IMPORTED_MODULE_0__.Color();

		const shBasis = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ];

		const sh = new three__WEBPACK_IMPORTED_MODULE_0__.SphericalHarmonics3();
		const shCoefficients = sh.coefficients;

		for ( let faceIndex = 0; faceIndex < 6; faceIndex ++ ) {

			const image = cubeTexture.image[ faceIndex ];

			const width = image.width;
			const height = image.height;

			const canvas = document.createElement( 'canvas' );

			canvas.width = width;
			canvas.height = height;

			const context = canvas.getContext( '2d' );

			context.drawImage( image, 0, 0, width, height );

			const imageData = context.getImageData( 0, 0, width, height );

			const data = imageData.data;

			const imageWidth = imageData.width; // assumed to be square

			const pixelSize = 2 / imageWidth;

			for ( let i = 0, il = data.length; i < il; i += 4 ) { // RGBA assumed

				// pixel color
				color.setRGB( data[ i ] / 255, data[ i + 1 ] / 255, data[ i + 2 ] / 255 );

				// convert to linear color space
				convertColorToLinear( color, cubeTexture.encoding );

				// pixel coordinate on unit cube

				const pixelIndex = i / 4;

				const col = - 1 + ( pixelIndex % imageWidth + 0.5 ) * pixelSize;

				const row = 1 - ( Math.floor( pixelIndex / imageWidth ) + 0.5 ) * pixelSize;

				switch ( faceIndex ) {

					case 0: coord.set( - 1, row, - col ); break;

					case 1: coord.set( 1, row, col ); break;

					case 2: coord.set( - col, 1, - row ); break;

					case 3: coord.set( - col, - 1, row ); break;

					case 4: coord.set( - col, row, 1 ); break;

					case 5: coord.set( col, row, - 1 ); break;

				}

				// weight assigned to this pixel

				const lengthSq = coord.lengthSq();

				const weight = 4 / ( Math.sqrt( lengthSq ) * lengthSq );

				totalWeight += weight;

				// direction vector to this pixel
				dir.copy( coord ).normalize();

				// evaluate SH basis functions in direction dir
				three__WEBPACK_IMPORTED_MODULE_0__.SphericalHarmonics3.getBasisAt( dir, shBasis );

				// accummuulate
				for ( let j = 0; j < 9; j ++ ) {

					shCoefficients[ j ].x += shBasis[ j ] * color.r * weight;
					shCoefficients[ j ].y += shBasis[ j ] * color.g * weight;
					shCoefficients[ j ].z += shBasis[ j ] * color.b * weight;

				}

			}

		}

		// normalize
		const norm = ( 4 * Math.PI ) / totalWeight;

		for ( let j = 0; j < 9; j ++ ) {

			shCoefficients[ j ].x *= norm;
			shCoefficients[ j ].y *= norm;
			shCoefficients[ j ].z *= norm;

		}

		return new three__WEBPACK_IMPORTED_MODULE_0__.LightProbe( sh );

	}

	static fromCubeRenderTarget( renderer, cubeRenderTarget ) {

		// The renderTarget must be set to RGBA in order to make readRenderTargetPixels works
		let totalWeight = 0;

		const coord = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();

		const dir = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();

		const color = new three__WEBPACK_IMPORTED_MODULE_0__.Color();

		const shBasis = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ];

		const sh = new three__WEBPACK_IMPORTED_MODULE_0__.SphericalHarmonics3();
		const shCoefficients = sh.coefficients;

		for ( let faceIndex = 0; faceIndex < 6; faceIndex ++ ) {

			const imageWidth = cubeRenderTarget.width; // assumed to be square
			const data = new Uint8Array( imageWidth * imageWidth * 4 );
			renderer.readRenderTargetPixels( cubeRenderTarget, 0, 0, imageWidth, imageWidth, data, faceIndex );

			const pixelSize = 2 / imageWidth;

			for ( let i = 0, il = data.length; i < il; i += 4 ) { // RGBA assumed

				// pixel color
				color.setRGB( data[ i ] / 255, data[ i + 1 ] / 255, data[ i + 2 ] / 255 );

				// convert to linear color space
				convertColorToLinear( color, cubeRenderTarget.texture.encoding );

				// pixel coordinate on unit cube

				const pixelIndex = i / 4;

				const col = - 1 + ( pixelIndex % imageWidth + 0.5 ) * pixelSize;

				const row = 1 - ( Math.floor( pixelIndex / imageWidth ) + 0.5 ) * pixelSize;

				switch ( faceIndex ) {

					case 0: coord.set( 1, row, - col ); break;

					case 1: coord.set( - 1, row, col ); break;

					case 2: coord.set( col, 1, - row ); break;

					case 3: coord.set( col, - 1, row ); break;

					case 4: coord.set( col, row, 1 ); break;

					case 5: coord.set( - col, row, - 1 ); break;

				}

				// weight assigned to this pixel

				const lengthSq = coord.lengthSq();

				const weight = 4 / ( Math.sqrt( lengthSq ) * lengthSq );

				totalWeight += weight;

				// direction vector to this pixel
				dir.copy( coord ).normalize();

				// evaluate SH basis functions in direction dir
				three__WEBPACK_IMPORTED_MODULE_0__.SphericalHarmonics3.getBasisAt( dir, shBasis );

				// accummuulate
				for ( let j = 0; j < 9; j ++ ) {

					shCoefficients[ j ].x += shBasis[ j ] * color.r * weight;
					shCoefficients[ j ].y += shBasis[ j ] * color.g * weight;
					shCoefficients[ j ].z += shBasis[ j ] * color.b * weight;

				}

			}

		}

		// normalize
		const norm = ( 4 * Math.PI ) / totalWeight;

		for ( let j = 0; j < 9; j ++ ) {

			shCoefficients[ j ].x *= norm;
			shCoefficients[ j ].y *= norm;
			shCoefficients[ j ].z *= norm;

		}

		return new three__WEBPACK_IMPORTED_MODULE_0__.LightProbe( sh );

	}

}

function convertColorToLinear( color, encoding ) {

	switch ( encoding ) {

		case three__WEBPACK_IMPORTED_MODULE_0__.sRGBEncoding:

			color.convertSRGBToLinear();
			break;

		case three__WEBPACK_IMPORTED_MODULE_0__.LinearEncoding:

			break;

		default:

			console.warn( 'WARNING: LightProbeGenerator convertColorToLinear() encountered an unsupported encoding.' );
			break;

	}

	return color;

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
/******/ 			"light-probe": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_three_examples_jsm_loaders_GLTFLoader_js"], () => (__webpack_require__("./samples/chapters/chapter-3/light-probe.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7V0FDQSxpQkFBaUIscUJBQXFCO1dBQ3RDO1dBQ0E7V0FDQSxrQkFBa0IscUJBQXFCO1dBQ3ZDO1dBQ0E7V0FDQSxLQUFLO1dBQ0w7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEU7Ozs7O1dDM0JBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QsRTs7Ozs7V0NOQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0EsNEc7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvYm9vdHN0cmFwL2Jvb3RzdHJhcC5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvYm9vdHN0cmFwL2xpZ2h0aW5nLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTMvbGlnaHQtcHJvYmUuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NvbnRyb2xsZXIvb3JiaXQtY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvdXRpbC9tb2RlbFV0aWwuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL3V0aWwvc3RhdHMuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL3V0aWwvdXBkYXRlLW9uLXJlc2l6ZS5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL25vZGVfbW9kdWxlcy90aHJlZS9leGFtcGxlcy9qc20vbGlicy9zdGF0cy5tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9ub2RlX21vZHVsZXMvdGhyZWUvZXhhbXBsZXMvanNtL2xpZ2h0cy9MaWdodFByb2JlR2VuZXJhdG9yLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5pbXBvcnQgeyBpbml0T3JiaXRDb250cm9scyB9IGZyb20gJy4uL2NvbnRyb2xsZXIvb3JiaXQtY29udHJvbGxlcidcbmltcG9ydCB7IGluaXRMaWdodGluZyB9IGZyb20gJy4vbGlnaHRpbmcnXG5pbXBvcnQgeyBvblJlc2l6ZSB9IGZyb20gJy4uL3V0aWwvdXBkYXRlLW9uLXJlc2l6ZSdcblxuZXhwb3J0IGNvbnN0IGluaXRTY2VuZSA9ICh7IGJhY2tncm91bmRDb2xvciwgZm9nQ29sb3IsIGRpc2FibGVTaGFkb3dzLCBkaXNhYmxlTGlnaHRzLCBkaXNhYmxlRGVmYXVsdENvbnRyb2xzIH0pID0+IHtcbiAgY29uc3QgaW5pdCA9IChmbikgPT4ge1xuICAgIC8vIGJhc2ljIHNjZW5lIHNldHVwXG4gICAgY29uc3Qgc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKVxuICAgIGlmIChiYWNrZ3JvdW5kQ29sb3IpIHtcbiAgICAgIHNjZW5lLmJhY2tncm91bmRDb2xvciA9IGJhY2tncm91bmRDb2xvclxuICAgIH1cblxuICAgIGlmIChmb2dDb2xvcikge1xuICAgICAgc2NlbmUuZm9nID0gbmV3IFRIUkVFLkZvZyhmb2dDb2xvciwgMC4wMDI1LCA1MClcbiAgICB9XG5cbiAgICAvLyBzZXR1cCBjYW1lcmEgYW5kIGJhc2ljIHJlbmRlcmVyXG4gICAgY29uc3QgY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKDc1LCB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodCwgMC4xLCAxMDAwKVxuICAgIGNvbnN0IHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoeyBhbnRpYWxpYXM6IHRydWUgfSlcbiAgICByZW5kZXJlci5vdXRwdXRFbmNvZGluZyA9IFRIUkVFLnNSR0JFbmNvZGluZ1xuICAgIHJlbmRlcmVyLnNoYWRvd01hcC5lbmFibGVkID0gdHJ1ZVxuICAgIHJlbmRlcmVyLnNoYWRvd01hcC50eXBlID0gVEhSRUUuVlNNU2hhZG93TWFwXG4gICAgcmVuZGVyZXIuc2V0Q2xlYXJDb2xvcihiYWNrZ3JvdW5kQ29sb3IpXG5cbiAgICBvblJlc2l6ZShjYW1lcmEsIHJlbmRlcmVyKVxuICAgIHJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodClcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHJlbmRlcmVyLmRvbUVsZW1lbnQpXG5cbiAgICAvLyBpbml0aWFsaXplIG9yYml0IGNvbnRyb2xzXG4gICAgbGV0IG9yYml0Q29udHJvbHNcbiAgICBpZiAoIWRpc2FibGVEZWZhdWx0Q29udHJvbHMpIHtcbiAgICAgIG9yYml0Q29udHJvbHMgPSBpbml0T3JiaXRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyKVxuICAgIH1cblxuICAgIC8vIGFkZCBzb21lIGJhc2ljIGxpZ2h0aW5nIHRvIHRoZSBzY2VuZVxuICAgIGlmICghZGlzYWJsZUxpZ2h0cyA/PyBmYWxzZSkge1xuICAgICAgaW5pdExpZ2h0aW5nKHNjZW5lLCB7IGRpc2FibGVTaGFkb3dzIH0pXG4gICAgfVxuXG4gICAgZm4oeyBzY2VuZSwgY2FtZXJhLCByZW5kZXJlciwgb3JiaXRDb250cm9scyB9KVxuICB9XG5cbiAgcmV0dXJuIGluaXRcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuXG5leHBvcnQgY29uc3QgaW5pdExpZ2h0aW5nID0gKHNjZW5lLCB7IGRpc2FibGVTaGFkb3dzIH0pID0+IHtcbiAgLy8gaHR0cHM6Ly90aHJlZWpzLm9yZy9leGFtcGxlcy8/cT1zaGFkbyN3ZWJnbF9zaGFkb3dtYXBfdnNtXG4gIHNjZW5lLmFkZChuZXcgVEhSRUUuQW1iaWVudExpZ2h0KDB4NjY2NjY2KSlcblxuICAvLyBjb25zdCBkaXJMaWdodCA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4YWFhYWFhKVxuICBjb25zdCBkaXJMaWdodCA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4YWFhYWFhKVxuICBkaXJMaWdodC5wb3NpdGlvbi5zZXQoNSwgMTIsIDgpXG4gIGRpckxpZ2h0LmNhc3RTaGFkb3cgPSAhZGlzYWJsZVNoYWRvd3MgPyB0cnVlIDogZmFsc2VcbiAgZGlyTGlnaHQuaW50ZW5zaXR5ID0gMVxuICBkaXJMaWdodC5zaGFkb3cuY2FtZXJhLm5lYXIgPSAwLjFcbiAgZGlyTGlnaHQuc2hhZG93LmNhbWVyYS5mYXIgPSAyMDBcbiAgZGlyTGlnaHQuc2hhZG93LmNhbWVyYS5yaWdodCA9IDEwXG4gIGRpckxpZ2h0LnNoYWRvdy5jYW1lcmEubGVmdCA9IC0xMFxuICBkaXJMaWdodC5zaGFkb3cuY2FtZXJhLnRvcCA9IDEwXG4gIGRpckxpZ2h0LnNoYWRvdy5jYW1lcmEuYm90dG9tID0gLTEwXG4gIGRpckxpZ2h0LnNoYWRvdy5tYXBTaXplLndpZHRoID0gMjA0OFxuICBkaXJMaWdodC5zaGFkb3cubWFwU2l6ZS5oZWlnaHQgPSAyMDQ4XG4gIGRpckxpZ2h0LnNoYWRvdy5yYWRpdXMgPSA0XG4gIGRpckxpZ2h0LnNoYWRvdy5iaWFzID0gLTAuMDAwMDVcblxuICBzY2VuZS5hZGQoZGlyTGlnaHQpXG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcbmltcG9ydCB7IEdMVEZMb2FkZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzJ1xuaW1wb3J0IHsgaW5pdFNjZW5lIH0gZnJvbSAnLi4vLi4vYm9vdHN0cmFwL2Jvb3RzdHJhcC5qcydcbmltcG9ydCB7IExpZ2h0UHJvYmVHZW5lcmF0b3IgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbGlnaHRzL0xpZ2h0UHJvYmVHZW5lcmF0b3InXG5pbXBvcnQgeyBzdGF0cyB9IGZyb20gJy4uLy4uL3V0aWwvc3RhdHMnXG5pbXBvcnQgeyB2aXNpdENoaWxkcmVuIH0gZnJvbSAnLi4vLi4vdXRpbC9tb2RlbFV0aWwuanMnXG5cbmNvbnN0IHByb3BzID0ge1xuICBiYWNrZ3JvdW5kQ29sb3I6IDB4Y2NjY2NjLFxuICBkaXNhYmxlTGlnaHRzOiB0cnVlXG59XG5jb25zdCBsb2FkSXNsYW5kID0gKHNjZW5lKSA9PiB7XG4gIGNvbnN0IGxvYWRlciA9IG5ldyBHTFRGTG9hZGVyKClcbiAgbG9hZGVyLmxvYWQoJy9hc3NldHMvZ2x0Zi9mbHlpbmdfaXNsYW5kL3NjZW5lLmdsdGYnLCAobG9hZGVkT2JqZWN0KSA9PiB7XG4gICAgLy8gdGhlIG5lc3RlZFxuICAgIGNvbnN0IGxvYWRlZFNjZW5lID0gbG9hZGVkT2JqZWN0LnNjZW5lLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdXG4gICAgdmlzaXRDaGlsZHJlbihsb2FkZWRTY2VuZSwgKGMpID0+IHtcbiAgICAgIGMucmVjZWl2ZVNoYWRvdyA9IHRydWVcbiAgICAgIGMuY2FzdFNoYWRvdyA9IHRydWVcbiAgICB9KVxuICAgIGxvYWRlZFNjZW5lLnNjYWxlLnNldCgwLjAyMiwgMC4wMjIsIDAuMDIyKVxuICAgIGxvYWRlZFNjZW5lLnRyYW5zbGF0ZVkoLTcpXG4gICAgc2NlbmUuYWRkKGxvYWRlZFNjZW5lKVxuICB9KVxufVxuXG5jb25zdCBsb2FkQ3ViZU1hcCA9IChyZW5kZXJlciwgc2NlbmUpID0+IHtcbiAgY29uc3QgYmFzZSA9ICdkcmFjaGVuZmVscydcbiAgY29uc3QgZXh0ID0gJ3BuZydcbiAgY29uc3QgdXJscyA9IFtcbiAgICAnL2Fzc2V0cy9wYW5vcmFtYS8nICsgYmFzZSArICcvcG9zeC4nICsgZXh0LFxuICAgICcvYXNzZXRzL3Bhbm9yYW1hLycgKyBiYXNlICsgJy9uZWd4LicgKyBleHQsXG4gICAgJy9hc3NldHMvcGFub3JhbWEvJyArIGJhc2UgKyAnL3Bvc3kuJyArIGV4dCxcbiAgICAnL2Fzc2V0cy9wYW5vcmFtYS8nICsgYmFzZSArICcvbmVneS4nICsgZXh0LFxuICAgICcvYXNzZXRzL3Bhbm9yYW1hLycgKyBiYXNlICsgJy9wb3N6LicgKyBleHQsXG4gICAgJy9hc3NldHMvcGFub3JhbWEvJyArIGJhc2UgKyAnL25lZ3ouJyArIGV4dFxuICBdXG5cbiAgbmV3IFRIUkVFLkN1YmVUZXh0dXJlTG9hZGVyKCkubG9hZCh1cmxzLCBmdW5jdGlvbiAoY3ViZVRleHR1cmUpIHtcbiAgICBjdWJlVGV4dHVyZS5lbmNvZGluZyA9IFRIUkVFLnNSR0JFbmNvZGluZ1xuICAgIHNjZW5lLmJhY2tncm91bmQgPSBjdWJlVGV4dHVyZVxuICAgIGNvbnN0IGxwID0gTGlnaHRQcm9iZUdlbmVyYXRvci5mcm9tQ3ViZVRleHR1cmUoY3ViZVRleHR1cmUpXG4gICAgbHAuaW50ZW5zaXR5ID0gMTVcbiAgICBzY2VuZS5hZGQobHApXG4gIH0pXG59XG5cbmluaXRTY2VuZShwcm9wcykoKHsgc2NlbmUsIGNhbWVyYSwgcmVuZGVyZXIsIG9yYml0Q29udHJvbHMgfSkgPT4ge1xuICBjYW1lcmEucG9zaXRpb24uc2V0KC03LCAyLCA1KVxuICBvcmJpdENvbnRyb2xzLnVwZGF0ZSgpXG5cbiAgbG9hZElzbGFuZChzY2VuZSlcblxuICBsb2FkQ3ViZU1hcChyZW5kZXJlciwgc2NlbmUpXG5cbiAgY29uc3QgbGlnaHRQcm9iZSA9IG5ldyBUSFJFRS5MaWdodFByb2JlKClcbiAgc2NlbmUuYWRkKGxpZ2h0UHJvYmUpXG5cbiAgZnVuY3Rpb24gYW5pbWF0ZSgpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSlcbiAgICByZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSlcbiAgICBzdGF0cy51cGRhdGUoKVxuXG4gICAgb3JiaXRDb250cm9scy51cGRhdGUoKVxuICB9XG5cbiAgYW5pbWF0ZSgpXG59KVxuIiwiaW1wb3J0IHsgT3JiaXRDb250cm9scyB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9jb250cm9scy9PcmJpdENvbnRyb2xzJ1xuXG5leHBvcnQgY29uc3QgaW5pdE9yYml0Q29udHJvbHMgPSAoY2FtZXJhLCByZW5kZXJlcikgPT4ge1xuICBjb25zdCBjb250cm9sbGVyID0gbmV3IE9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlci5kb21FbGVtZW50KVxuICBjb250cm9sbGVyLmVuYWJsZURhbXBpbmcgPSB0cnVlXG4gIGNvbnRyb2xsZXIuZGFtcGluZ0ZhY3RvciA9IDAuMDVcbiAgY29udHJvbGxlci5taW5EaXN0YW5jZSA9IDFcbiAgY29udHJvbGxlci5tYXhEaXN0YW5jZSA9IDEwMFxuICBjb250cm9sbGVyLm1pblBvbGFyQW5nbGUgPSBNYXRoLlBJIC8gNFxuICBjb250cm9sbGVyLm1heFBvbGFyQW5nbGUgPSAoMyAqIE1hdGguUEkpIC8gNFxuXG4gIHJldHVybiBjb250cm9sbGVyXG59XG4iLCJleHBvcnQgY29uc3QgdmlzaXRDaGlsZHJlbiA9IChvYmplY3QsIGZuKSA9PiB7XG4gIGlmIChvYmplY3QuY2hpbGRyZW4gJiYgb2JqZWN0LmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIG9iamVjdC5jaGlsZHJlbikge1xuICAgICAgdmlzaXRDaGlsZHJlbihjaGlsZCwgZm4pXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZuKG9iamVjdClcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgYXBwbHlTaGFkb3dzQW5kRGVwdGhXcml0ZSA9IChvYmplY3QpID0+IHtcbiAgdmlzaXRDaGlsZHJlbihvYmplY3QsIChjaGlsZCkgPT4ge1xuICAgIGlmIChjaGlsZC5tYXRlcmlhbCkge1xuICAgICAgY2hpbGQubWF0ZXJpYWwuZGVwdGhXcml0ZSA9IHRydWVcbiAgICAgIGNoaWxkLmNhc3RTaGFkb3cgPSB0cnVlXG4gICAgICBjaGlsZC5yZWNlaXZlU2hhZG93ID0gdHJ1ZVxuICAgIH1cbiAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IGZpbmRDaGlsZCA9IChvYmplY3QsIG5hbWUpID0+IHtcbiAgaWYgKG9iamVjdC5jaGlsZHJlbiAmJiBvYmplY3QuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgIGZvciAoY29uc3QgY2hpbGQgb2Ygb2JqZWN0LmNoaWxkcmVuKSB7XG4gICAgICBpZiAobmFtZSA9PT0gY2hpbGQubmFtZSkge1xuICAgICAgICByZXR1cm4gY2hpbGRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGZpbmRDaGlsZChjaGlsZCwgbmFtZSlcbiAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgIHJldHVybiByZXNcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAobmFtZSA9PT0gb2JqZWN0Lm5hbWUpIHtcbiAgICAgIHJldHVybiBvYmplY3RcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFN0YXRzIGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9saWJzL3N0YXRzLm1vZHVsZSdcblxuY29uc3Qgc3RhdHMgPSBTdGF0cygpXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHN0YXRzLmRvbSlcblxuZXhwb3J0IHsgc3RhdHMgfVxuIiwiZXhwb3J0IGNvbnN0IG9uUmVzaXplID0gKGNhbWVyYSwgcmVuZGVyZXIpID0+IHtcbiAgY29uc3QgcmVzaXplciA9ICgpID0+IHtcbiAgICBjYW1lcmEuYXNwZWN0ID0gd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICBjYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpXG4gICAgcmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KVxuICB9XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemVyLCBmYWxzZSlcbn1cbiIsInZhciBTdGF0cyA9IGZ1bmN0aW9uICgpIHtcblxuXHR2YXIgbW9kZSA9IDA7XG5cblx0dmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XG5cdGNvbnRhaW5lci5zdHlsZS5jc3NUZXh0ID0gJ3Bvc2l0aW9uOmZpeGVkO3RvcDowO2xlZnQ6MDtjdXJzb3I6cG9pbnRlcjtvcGFjaXR5OjAuOTt6LWluZGV4OjEwMDAwJztcblx0Y29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoICdjbGljaycsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG5cblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHNob3dQYW5lbCggKysgbW9kZSAlIGNvbnRhaW5lci5jaGlsZHJlbi5sZW5ndGggKTtcblxuXHR9LCBmYWxzZSApO1xuXG5cdC8vXG5cblx0ZnVuY3Rpb24gYWRkUGFuZWwoIHBhbmVsICkge1xuXG5cdFx0Y29udGFpbmVyLmFwcGVuZENoaWxkKCBwYW5lbC5kb20gKTtcblx0XHRyZXR1cm4gcGFuZWw7XG5cblx0fVxuXG5cdGZ1bmN0aW9uIHNob3dQYW5lbCggaWQgKSB7XG5cblx0XHRmb3IgKCB2YXIgaSA9IDA7IGkgPCBjb250YWluZXIuY2hpbGRyZW4ubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0XHRjb250YWluZXIuY2hpbGRyZW5bIGkgXS5zdHlsZS5kaXNwbGF5ID0gaSA9PT0gaWQgPyAnYmxvY2snIDogJ25vbmUnO1xuXG5cdFx0fVxuXG5cdFx0bW9kZSA9IGlkO1xuXG5cdH1cblxuXHQvL1xuXG5cdHZhciBiZWdpblRpbWUgPSAoIHBlcmZvcm1hbmNlIHx8IERhdGUgKS5ub3coKSwgcHJldlRpbWUgPSBiZWdpblRpbWUsIGZyYW1lcyA9IDA7XG5cblx0dmFyIGZwc1BhbmVsID0gYWRkUGFuZWwoIG5ldyBTdGF0cy5QYW5lbCggJ0ZQUycsICcjMGZmJywgJyMwMDInICkgKTtcblx0dmFyIG1zUGFuZWwgPSBhZGRQYW5lbCggbmV3IFN0YXRzLlBhbmVsKCAnTVMnLCAnIzBmMCcsICcjMDIwJyApICk7XG5cblx0aWYgKCBzZWxmLnBlcmZvcm1hbmNlICYmIHNlbGYucGVyZm9ybWFuY2UubWVtb3J5ICkge1xuXG5cdFx0dmFyIG1lbVBhbmVsID0gYWRkUGFuZWwoIG5ldyBTdGF0cy5QYW5lbCggJ01CJywgJyNmMDgnLCAnIzIwMScgKSApO1xuXG5cdH1cblxuXHRzaG93UGFuZWwoIDAgKTtcblxuXHRyZXR1cm4ge1xuXG5cdFx0UkVWSVNJT046IDE2LFxuXG5cdFx0ZG9tOiBjb250YWluZXIsXG5cblx0XHRhZGRQYW5lbDogYWRkUGFuZWwsXG5cdFx0c2hvd1BhbmVsOiBzaG93UGFuZWwsXG5cblx0XHRiZWdpbjogZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRiZWdpblRpbWUgPSAoIHBlcmZvcm1hbmNlIHx8IERhdGUgKS5ub3coKTtcblxuXHRcdH0sXG5cblx0XHRlbmQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0ZnJhbWVzICsrO1xuXG5cdFx0XHR2YXIgdGltZSA9ICggcGVyZm9ybWFuY2UgfHwgRGF0ZSApLm5vdygpO1xuXG5cdFx0XHRtc1BhbmVsLnVwZGF0ZSggdGltZSAtIGJlZ2luVGltZSwgMjAwICk7XG5cblx0XHRcdGlmICggdGltZSA+PSBwcmV2VGltZSArIDEwMDAgKSB7XG5cblx0XHRcdFx0ZnBzUGFuZWwudXBkYXRlKCAoIGZyYW1lcyAqIDEwMDAgKSAvICggdGltZSAtIHByZXZUaW1lICksIDEwMCApO1xuXG5cdFx0XHRcdHByZXZUaW1lID0gdGltZTtcblx0XHRcdFx0ZnJhbWVzID0gMDtcblxuXHRcdFx0XHRpZiAoIG1lbVBhbmVsICkge1xuXG5cdFx0XHRcdFx0dmFyIG1lbW9yeSA9IHBlcmZvcm1hbmNlLm1lbW9yeTtcblx0XHRcdFx0XHRtZW1QYW5lbC51cGRhdGUoIG1lbW9yeS51c2VkSlNIZWFwU2l6ZSAvIDEwNDg1NzYsIG1lbW9yeS5qc0hlYXBTaXplTGltaXQgLyAxMDQ4NTc2ICk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0aW1lO1xuXG5cdFx0fSxcblxuXHRcdHVwZGF0ZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRiZWdpblRpbWUgPSB0aGlzLmVuZCgpO1xuXG5cdFx0fSxcblxuXHRcdC8vIEJhY2t3YXJkcyBDb21wYXRpYmlsaXR5XG5cblx0XHRkb21FbGVtZW50OiBjb250YWluZXIsXG5cdFx0c2V0TW9kZTogc2hvd1BhbmVsXG5cblx0fTtcblxufTtcblxuU3RhdHMuUGFuZWwgPSBmdW5jdGlvbiAoIG5hbWUsIGZnLCBiZyApIHtcblxuXHR2YXIgbWluID0gSW5maW5pdHksIG1heCA9IDAsIHJvdW5kID0gTWF0aC5yb3VuZDtcblx0dmFyIFBSID0gcm91bmQoIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDEgKTtcblxuXHR2YXIgV0lEVEggPSA4MCAqIFBSLCBIRUlHSFQgPSA0OCAqIFBSLFxuXHRcdFRFWFRfWCA9IDMgKiBQUiwgVEVYVF9ZID0gMiAqIFBSLFxuXHRcdEdSQVBIX1ggPSAzICogUFIsIEdSQVBIX1kgPSAxNSAqIFBSLFxuXHRcdEdSQVBIX1dJRFRIID0gNzQgKiBQUiwgR1JBUEhfSEVJR0hUID0gMzAgKiBQUjtcblxuXHR2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2NhbnZhcycgKTtcblx0Y2FudmFzLndpZHRoID0gV0lEVEg7XG5cdGNhbnZhcy5oZWlnaHQgPSBIRUlHSFQ7XG5cdGNhbnZhcy5zdHlsZS5jc3NUZXh0ID0gJ3dpZHRoOjgwcHg7aGVpZ2h0OjQ4cHgnO1xuXG5cdHZhciBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoICcyZCcgKTtcblx0Y29udGV4dC5mb250ID0gJ2JvbGQgJyArICggOSAqIFBSICkgKyAncHggSGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWYnO1xuXHRjb250ZXh0LnRleHRCYXNlbGluZSA9ICd0b3AnO1xuXG5cdGNvbnRleHQuZmlsbFN0eWxlID0gYmc7XG5cdGNvbnRleHQuZmlsbFJlY3QoIDAsIDAsIFdJRFRILCBIRUlHSFQgKTtcblxuXHRjb250ZXh0LmZpbGxTdHlsZSA9IGZnO1xuXHRjb250ZXh0LmZpbGxUZXh0KCBuYW1lLCBURVhUX1gsIFRFWFRfWSApO1xuXHRjb250ZXh0LmZpbGxSZWN0KCBHUkFQSF9YLCBHUkFQSF9ZLCBHUkFQSF9XSURUSCwgR1JBUEhfSEVJR0hUICk7XG5cblx0Y29udGV4dC5maWxsU3R5bGUgPSBiZztcblx0Y29udGV4dC5nbG9iYWxBbHBoYSA9IDAuOTtcblx0Y29udGV4dC5maWxsUmVjdCggR1JBUEhfWCwgR1JBUEhfWSwgR1JBUEhfV0lEVEgsIEdSQVBIX0hFSUdIVCApO1xuXG5cdHJldHVybiB7XG5cblx0XHRkb206IGNhbnZhcyxcblxuXHRcdHVwZGF0ZTogZnVuY3Rpb24gKCB2YWx1ZSwgbWF4VmFsdWUgKSB7XG5cblx0XHRcdG1pbiA9IE1hdGgubWluKCBtaW4sIHZhbHVlICk7XG5cdFx0XHRtYXggPSBNYXRoLm1heCggbWF4LCB2YWx1ZSApO1xuXG5cdFx0XHRjb250ZXh0LmZpbGxTdHlsZSA9IGJnO1xuXHRcdFx0Y29udGV4dC5nbG9iYWxBbHBoYSA9IDE7XG5cdFx0XHRjb250ZXh0LmZpbGxSZWN0KCAwLCAwLCBXSURUSCwgR1JBUEhfWSApO1xuXHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSBmZztcblx0XHRcdGNvbnRleHQuZmlsbFRleHQoIHJvdW5kKCB2YWx1ZSApICsgJyAnICsgbmFtZSArICcgKCcgKyByb3VuZCggbWluICkgKyAnLScgKyByb3VuZCggbWF4ICkgKyAnKScsIFRFWFRfWCwgVEVYVF9ZICk7XG5cblx0XHRcdGNvbnRleHQuZHJhd0ltYWdlKCBjYW52YXMsIEdSQVBIX1ggKyBQUiwgR1JBUEhfWSwgR1JBUEhfV0lEVEggLSBQUiwgR1JBUEhfSEVJR0hULCBHUkFQSF9YLCBHUkFQSF9ZLCBHUkFQSF9XSURUSCAtIFBSLCBHUkFQSF9IRUlHSFQgKTtcblxuXHRcdFx0Y29udGV4dC5maWxsUmVjdCggR1JBUEhfWCArIEdSQVBIX1dJRFRIIC0gUFIsIEdSQVBIX1ksIFBSLCBHUkFQSF9IRUlHSFQgKTtcblxuXHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSBiZztcblx0XHRcdGNvbnRleHQuZ2xvYmFsQWxwaGEgPSAwLjk7XG5cdFx0XHRjb250ZXh0LmZpbGxSZWN0KCBHUkFQSF9YICsgR1JBUEhfV0lEVEggLSBQUiwgR1JBUEhfWSwgUFIsIHJvdW5kKCAoIDEgLSAoIHZhbHVlIC8gbWF4VmFsdWUgKSApICogR1JBUEhfSEVJR0hUICkgKTtcblxuXHRcdH1cblxuXHR9O1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTdGF0cztcbiIsImltcG9ydCB7XG5cdENvbG9yLFxuXHRMaWdodFByb2JlLFxuXHRMaW5lYXJFbmNvZGluZyxcblx0U3BoZXJpY2FsSGFybW9uaWNzMyxcblx0VmVjdG9yMyxcblx0c1JHQkVuY29kaW5nXG59IGZyb20gJ3RocmVlJztcblxuY2xhc3MgTGlnaHRQcm9iZUdlbmVyYXRvciB7XG5cblx0Ly8gaHR0cHM6Ly93d3cucHBzbG9hbi5vcmcvcHVibGljYXRpb25zL1N0dXBpZFNIMzYucGRmXG5cdHN0YXRpYyBmcm9tQ3ViZVRleHR1cmUoIGN1YmVUZXh0dXJlICkge1xuXG5cdFx0bGV0IHRvdGFsV2VpZ2h0ID0gMDtcblxuXHRcdGNvbnN0IGNvb3JkID0gbmV3IFZlY3RvcjMoKTtcblxuXHRcdGNvbnN0IGRpciA9IG5ldyBWZWN0b3IzKCk7XG5cblx0XHRjb25zdCBjb2xvciA9IG5ldyBDb2xvcigpO1xuXG5cdFx0Y29uc3Qgc2hCYXNpcyA9IFsgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCBdO1xuXG5cdFx0Y29uc3Qgc2ggPSBuZXcgU3BoZXJpY2FsSGFybW9uaWNzMygpO1xuXHRcdGNvbnN0IHNoQ29lZmZpY2llbnRzID0gc2guY29lZmZpY2llbnRzO1xuXG5cdFx0Zm9yICggbGV0IGZhY2VJbmRleCA9IDA7IGZhY2VJbmRleCA8IDY7IGZhY2VJbmRleCArKyApIHtcblxuXHRcdFx0Y29uc3QgaW1hZ2UgPSBjdWJlVGV4dHVyZS5pbWFnZVsgZmFjZUluZGV4IF07XG5cblx0XHRcdGNvbnN0IHdpZHRoID0gaW1hZ2Uud2lkdGg7XG5cdFx0XHRjb25zdCBoZWlnaHQgPSBpbWFnZS5oZWlnaHQ7XG5cblx0XHRcdGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdjYW52YXMnICk7XG5cblx0XHRcdGNhbnZhcy53aWR0aCA9IHdpZHRoO1xuXHRcdFx0Y2FudmFzLmhlaWdodCA9IGhlaWdodDtcblxuXHRcdFx0Y29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCAnMmQnICk7XG5cblx0XHRcdGNvbnRleHQuZHJhd0ltYWdlKCBpbWFnZSwgMCwgMCwgd2lkdGgsIGhlaWdodCApO1xuXG5cdFx0XHRjb25zdCBpbWFnZURhdGEgPSBjb250ZXh0LmdldEltYWdlRGF0YSggMCwgMCwgd2lkdGgsIGhlaWdodCApO1xuXG5cdFx0XHRjb25zdCBkYXRhID0gaW1hZ2VEYXRhLmRhdGE7XG5cblx0XHRcdGNvbnN0IGltYWdlV2lkdGggPSBpbWFnZURhdGEud2lkdGg7IC8vIGFzc3VtZWQgdG8gYmUgc3F1YXJlXG5cblx0XHRcdGNvbnN0IHBpeGVsU2l6ZSA9IDIgLyBpbWFnZVdpZHRoO1xuXG5cdFx0XHRmb3IgKCBsZXQgaSA9IDAsIGlsID0gZGF0YS5sZW5ndGg7IGkgPCBpbDsgaSArPSA0ICkgeyAvLyBSR0JBIGFzc3VtZWRcblxuXHRcdFx0XHQvLyBwaXhlbCBjb2xvclxuXHRcdFx0XHRjb2xvci5zZXRSR0IoIGRhdGFbIGkgXSAvIDI1NSwgZGF0YVsgaSArIDEgXSAvIDI1NSwgZGF0YVsgaSArIDIgXSAvIDI1NSApO1xuXG5cdFx0XHRcdC8vIGNvbnZlcnQgdG8gbGluZWFyIGNvbG9yIHNwYWNlXG5cdFx0XHRcdGNvbnZlcnRDb2xvclRvTGluZWFyKCBjb2xvciwgY3ViZVRleHR1cmUuZW5jb2RpbmcgKTtcblxuXHRcdFx0XHQvLyBwaXhlbCBjb29yZGluYXRlIG9uIHVuaXQgY3ViZVxuXG5cdFx0XHRcdGNvbnN0IHBpeGVsSW5kZXggPSBpIC8gNDtcblxuXHRcdFx0XHRjb25zdCBjb2wgPSAtIDEgKyAoIHBpeGVsSW5kZXggJSBpbWFnZVdpZHRoICsgMC41ICkgKiBwaXhlbFNpemU7XG5cblx0XHRcdFx0Y29uc3Qgcm93ID0gMSAtICggTWF0aC5mbG9vciggcGl4ZWxJbmRleCAvIGltYWdlV2lkdGggKSArIDAuNSApICogcGl4ZWxTaXplO1xuXG5cdFx0XHRcdHN3aXRjaCAoIGZhY2VJbmRleCApIHtcblxuXHRcdFx0XHRcdGNhc2UgMDogY29vcmQuc2V0KCAtIDEsIHJvdywgLSBjb2wgKTsgYnJlYWs7XG5cblx0XHRcdFx0XHRjYXNlIDE6IGNvb3JkLnNldCggMSwgcm93LCBjb2wgKTsgYnJlYWs7XG5cblx0XHRcdFx0XHRjYXNlIDI6IGNvb3JkLnNldCggLSBjb2wsIDEsIC0gcm93ICk7IGJyZWFrO1xuXG5cdFx0XHRcdFx0Y2FzZSAzOiBjb29yZC5zZXQoIC0gY29sLCAtIDEsIHJvdyApOyBicmVhaztcblxuXHRcdFx0XHRcdGNhc2UgNDogY29vcmQuc2V0KCAtIGNvbCwgcm93LCAxICk7IGJyZWFrO1xuXG5cdFx0XHRcdFx0Y2FzZSA1OiBjb29yZC5zZXQoIGNvbCwgcm93LCAtIDEgKTsgYnJlYWs7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIHdlaWdodCBhc3NpZ25lZCB0byB0aGlzIHBpeGVsXG5cblx0XHRcdFx0Y29uc3QgbGVuZ3RoU3EgPSBjb29yZC5sZW5ndGhTcSgpO1xuXG5cdFx0XHRcdGNvbnN0IHdlaWdodCA9IDQgLyAoIE1hdGguc3FydCggbGVuZ3RoU3EgKSAqIGxlbmd0aFNxICk7XG5cblx0XHRcdFx0dG90YWxXZWlnaHQgKz0gd2VpZ2h0O1xuXG5cdFx0XHRcdC8vIGRpcmVjdGlvbiB2ZWN0b3IgdG8gdGhpcyBwaXhlbFxuXHRcdFx0XHRkaXIuY29weSggY29vcmQgKS5ub3JtYWxpemUoKTtcblxuXHRcdFx0XHQvLyBldmFsdWF0ZSBTSCBiYXNpcyBmdW5jdGlvbnMgaW4gZGlyZWN0aW9uIGRpclxuXHRcdFx0XHRTcGhlcmljYWxIYXJtb25pY3MzLmdldEJhc2lzQXQoIGRpciwgc2hCYXNpcyApO1xuXG5cdFx0XHRcdC8vIGFjY3VtbXV1bGF0ZVxuXHRcdFx0XHRmb3IgKCBsZXQgaiA9IDA7IGogPCA5OyBqICsrICkge1xuXG5cdFx0XHRcdFx0c2hDb2VmZmljaWVudHNbIGogXS54ICs9IHNoQmFzaXNbIGogXSAqIGNvbG9yLnIgKiB3ZWlnaHQ7XG5cdFx0XHRcdFx0c2hDb2VmZmljaWVudHNbIGogXS55ICs9IHNoQmFzaXNbIGogXSAqIGNvbG9yLmcgKiB3ZWlnaHQ7XG5cdFx0XHRcdFx0c2hDb2VmZmljaWVudHNbIGogXS56ICs9IHNoQmFzaXNbIGogXSAqIGNvbG9yLmIgKiB3ZWlnaHQ7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHQvLyBub3JtYWxpemVcblx0XHRjb25zdCBub3JtID0gKCA0ICogTWF0aC5QSSApIC8gdG90YWxXZWlnaHQ7XG5cblx0XHRmb3IgKCBsZXQgaiA9IDA7IGogPCA5OyBqICsrICkge1xuXG5cdFx0XHRzaENvZWZmaWNpZW50c1sgaiBdLnggKj0gbm9ybTtcblx0XHRcdHNoQ29lZmZpY2llbnRzWyBqIF0ueSAqPSBub3JtO1xuXHRcdFx0c2hDb2VmZmljaWVudHNbIGogXS56ICo9IG5vcm07XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gbmV3IExpZ2h0UHJvYmUoIHNoICk7XG5cblx0fVxuXG5cdHN0YXRpYyBmcm9tQ3ViZVJlbmRlclRhcmdldCggcmVuZGVyZXIsIGN1YmVSZW5kZXJUYXJnZXQgKSB7XG5cblx0XHQvLyBUaGUgcmVuZGVyVGFyZ2V0IG11c3QgYmUgc2V0IHRvIFJHQkEgaW4gb3JkZXIgdG8gbWFrZSByZWFkUmVuZGVyVGFyZ2V0UGl4ZWxzIHdvcmtzXG5cdFx0bGV0IHRvdGFsV2VpZ2h0ID0gMDtcblxuXHRcdGNvbnN0IGNvb3JkID0gbmV3IFZlY3RvcjMoKTtcblxuXHRcdGNvbnN0IGRpciA9IG5ldyBWZWN0b3IzKCk7XG5cblx0XHRjb25zdCBjb2xvciA9IG5ldyBDb2xvcigpO1xuXG5cdFx0Y29uc3Qgc2hCYXNpcyA9IFsgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCBdO1xuXG5cdFx0Y29uc3Qgc2ggPSBuZXcgU3BoZXJpY2FsSGFybW9uaWNzMygpO1xuXHRcdGNvbnN0IHNoQ29lZmZpY2llbnRzID0gc2guY29lZmZpY2llbnRzO1xuXG5cdFx0Zm9yICggbGV0IGZhY2VJbmRleCA9IDA7IGZhY2VJbmRleCA8IDY7IGZhY2VJbmRleCArKyApIHtcblxuXHRcdFx0Y29uc3QgaW1hZ2VXaWR0aCA9IGN1YmVSZW5kZXJUYXJnZXQud2lkdGg7IC8vIGFzc3VtZWQgdG8gYmUgc3F1YXJlXG5cdFx0XHRjb25zdCBkYXRhID0gbmV3IFVpbnQ4QXJyYXkoIGltYWdlV2lkdGggKiBpbWFnZVdpZHRoICogNCApO1xuXHRcdFx0cmVuZGVyZXIucmVhZFJlbmRlclRhcmdldFBpeGVscyggY3ViZVJlbmRlclRhcmdldCwgMCwgMCwgaW1hZ2VXaWR0aCwgaW1hZ2VXaWR0aCwgZGF0YSwgZmFjZUluZGV4ICk7XG5cblx0XHRcdGNvbnN0IHBpeGVsU2l6ZSA9IDIgLyBpbWFnZVdpZHRoO1xuXG5cdFx0XHRmb3IgKCBsZXQgaSA9IDAsIGlsID0gZGF0YS5sZW5ndGg7IGkgPCBpbDsgaSArPSA0ICkgeyAvLyBSR0JBIGFzc3VtZWRcblxuXHRcdFx0XHQvLyBwaXhlbCBjb2xvclxuXHRcdFx0XHRjb2xvci5zZXRSR0IoIGRhdGFbIGkgXSAvIDI1NSwgZGF0YVsgaSArIDEgXSAvIDI1NSwgZGF0YVsgaSArIDIgXSAvIDI1NSApO1xuXG5cdFx0XHRcdC8vIGNvbnZlcnQgdG8gbGluZWFyIGNvbG9yIHNwYWNlXG5cdFx0XHRcdGNvbnZlcnRDb2xvclRvTGluZWFyKCBjb2xvciwgY3ViZVJlbmRlclRhcmdldC50ZXh0dXJlLmVuY29kaW5nICk7XG5cblx0XHRcdFx0Ly8gcGl4ZWwgY29vcmRpbmF0ZSBvbiB1bml0IGN1YmVcblxuXHRcdFx0XHRjb25zdCBwaXhlbEluZGV4ID0gaSAvIDQ7XG5cblx0XHRcdFx0Y29uc3QgY29sID0gLSAxICsgKCBwaXhlbEluZGV4ICUgaW1hZ2VXaWR0aCArIDAuNSApICogcGl4ZWxTaXplO1xuXG5cdFx0XHRcdGNvbnN0IHJvdyA9IDEgLSAoIE1hdGguZmxvb3IoIHBpeGVsSW5kZXggLyBpbWFnZVdpZHRoICkgKyAwLjUgKSAqIHBpeGVsU2l6ZTtcblxuXHRcdFx0XHRzd2l0Y2ggKCBmYWNlSW5kZXggKSB7XG5cblx0XHRcdFx0XHRjYXNlIDA6IGNvb3JkLnNldCggMSwgcm93LCAtIGNvbCApOyBicmVhaztcblxuXHRcdFx0XHRcdGNhc2UgMTogY29vcmQuc2V0KCAtIDEsIHJvdywgY29sICk7IGJyZWFrO1xuXG5cdFx0XHRcdFx0Y2FzZSAyOiBjb29yZC5zZXQoIGNvbCwgMSwgLSByb3cgKTsgYnJlYWs7XG5cblx0XHRcdFx0XHRjYXNlIDM6IGNvb3JkLnNldCggY29sLCAtIDEsIHJvdyApOyBicmVhaztcblxuXHRcdFx0XHRcdGNhc2UgNDogY29vcmQuc2V0KCBjb2wsIHJvdywgMSApOyBicmVhaztcblxuXHRcdFx0XHRcdGNhc2UgNTogY29vcmQuc2V0KCAtIGNvbCwgcm93LCAtIDEgKTsgYnJlYWs7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIHdlaWdodCBhc3NpZ25lZCB0byB0aGlzIHBpeGVsXG5cblx0XHRcdFx0Y29uc3QgbGVuZ3RoU3EgPSBjb29yZC5sZW5ndGhTcSgpO1xuXG5cdFx0XHRcdGNvbnN0IHdlaWdodCA9IDQgLyAoIE1hdGguc3FydCggbGVuZ3RoU3EgKSAqIGxlbmd0aFNxICk7XG5cblx0XHRcdFx0dG90YWxXZWlnaHQgKz0gd2VpZ2h0O1xuXG5cdFx0XHRcdC8vIGRpcmVjdGlvbiB2ZWN0b3IgdG8gdGhpcyBwaXhlbFxuXHRcdFx0XHRkaXIuY29weSggY29vcmQgKS5ub3JtYWxpemUoKTtcblxuXHRcdFx0XHQvLyBldmFsdWF0ZSBTSCBiYXNpcyBmdW5jdGlvbnMgaW4gZGlyZWN0aW9uIGRpclxuXHRcdFx0XHRTcGhlcmljYWxIYXJtb25pY3MzLmdldEJhc2lzQXQoIGRpciwgc2hCYXNpcyApO1xuXG5cdFx0XHRcdC8vIGFjY3VtbXV1bGF0ZVxuXHRcdFx0XHRmb3IgKCBsZXQgaiA9IDA7IGogPCA5OyBqICsrICkge1xuXG5cdFx0XHRcdFx0c2hDb2VmZmljaWVudHNbIGogXS54ICs9IHNoQmFzaXNbIGogXSAqIGNvbG9yLnIgKiB3ZWlnaHQ7XG5cdFx0XHRcdFx0c2hDb2VmZmljaWVudHNbIGogXS55ICs9IHNoQmFzaXNbIGogXSAqIGNvbG9yLmcgKiB3ZWlnaHQ7XG5cdFx0XHRcdFx0c2hDb2VmZmljaWVudHNbIGogXS56ICs9IHNoQmFzaXNbIGogXSAqIGNvbG9yLmIgKiB3ZWlnaHQ7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHQvLyBub3JtYWxpemVcblx0XHRjb25zdCBub3JtID0gKCA0ICogTWF0aC5QSSApIC8gdG90YWxXZWlnaHQ7XG5cblx0XHRmb3IgKCBsZXQgaiA9IDA7IGogPCA5OyBqICsrICkge1xuXG5cdFx0XHRzaENvZWZmaWNpZW50c1sgaiBdLnggKj0gbm9ybTtcblx0XHRcdHNoQ29lZmZpY2llbnRzWyBqIF0ueSAqPSBub3JtO1xuXHRcdFx0c2hDb2VmZmljaWVudHNbIGogXS56ICo9IG5vcm07XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gbmV3IExpZ2h0UHJvYmUoIHNoICk7XG5cblx0fVxuXG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRDb2xvclRvTGluZWFyKCBjb2xvciwgZW5jb2RpbmcgKSB7XG5cblx0c3dpdGNoICggZW5jb2RpbmcgKSB7XG5cblx0XHRjYXNlIHNSR0JFbmNvZGluZzpcblxuXHRcdFx0Y29sb3IuY29udmVydFNSR0JUb0xpbmVhcigpO1xuXHRcdFx0YnJlYWs7XG5cblx0XHRjYXNlIExpbmVhckVuY29kaW5nOlxuXG5cdFx0XHRicmVhaztcblxuXHRcdGRlZmF1bHQ6XG5cblx0XHRcdGNvbnNvbGUud2FybiggJ1dBUk5JTkc6IExpZ2h0UHJvYmVHZW5lcmF0b3IgY29udmVydENvbG9yVG9MaW5lYXIoKSBlbmNvdW50ZXJlZCBhbiB1bnN1cHBvcnRlZCBlbmNvZGluZy4nICk7XG5cdFx0XHRicmVhaztcblxuXHR9XG5cblx0cmV0dXJuIGNvbG9yO1xuXG59XG5cbmV4cG9ydCB7IExpZ2h0UHJvYmVHZW5lcmF0b3IgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibGlnaHQtcHJvYmVcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rbHRqc19mb3VydGhcIl0gPSBzZWxmW1wid2VicGFja0NodW5rbHRqc19mb3VydGhcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2J1aWxkX3RocmVlX21vZHVsZV9qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX2NvbnRyb2xzX09yYml0Q29udHJvbHNfanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9sb2FkZXJzX0dMVEZMb2FkZXJfanNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItMy9saWdodC1wcm9iZS5qc1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
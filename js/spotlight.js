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

/***/ "./samples/chapters/chapter-3/spotlight.js"
/*!*************************************************!*\
  !*** ./samples/chapters/chapter-3/spotlight.js ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var lil_gui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lil-gui */ "./node_modules/lil-gui/dist/lil-gui.esm.js");
/* harmony import */ var three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/loaders/GLTFLoader.js */ "./node_modules/three/examples/jsm/loaders/GLTFLoader.js");
/* harmony import */ var _bootstrap_bootstrap_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../bootstrap/bootstrap.js */ "./samples/bootstrap/bootstrap.js");
/* harmony import */ var _controls_renderer_control_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../controls/renderer-control.js */ "./samples/controls/renderer-control.js");
/* harmony import */ var _util_stats__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../util/stats */ "./samples/util/stats.js");
/* harmony import */ var _util_modelUtil_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../util/modelUtil.js */ "./samples/util/modelUtil.js");








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
    ;(0,_util_modelUtil_js__WEBPACK_IMPORTED_MODULE_6__.visitChildren)(loadedScene, (c) => {
      c.receiveShadow = true
      c.castShadow = true
    })
    loadedScene.rotateX(-0.5 * Math.PI)
    scene.add(loadedScene)
  })
}

;(0,_bootstrap_bootstrap_js__WEBPACK_IMPORTED_MODULE_3__.initScene)(props)(({ scene, camera, renderer, orbitControls }) => {
  renderer.shadowMap.type = three__WEBPACK_IMPORTED_MODULE_0__.PCFSoftShadowMap
  camera.position.set(-4, 14, 4)
  orbitControls.update()

  loadWaterfall(scene)

  const spotLight = new three__WEBPACK_IMPORTED_MODULE_0__.SpotLight()
  const spotLightHelper = new three__WEBPACK_IMPORTED_MODULE_0__.SpotLightHelper(spotLight)
  const shadowCameraHelper = new three__WEBPACK_IMPORTED_MODULE_0__.CameraHelper(spotLight.shadow.camera)
  spotLightHelper.visible = false
  shadowCameraHelper.visible = false

  scene.add(spotLightHelper)
  scene.add(shadowCameraHelper)

  function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    _util_stats__WEBPACK_IMPORTED_MODULE_5__.stats.update()
    spotLightHelper.update()
    shadowCameraHelper.update()
    orbitControls.update()
    spotLight.shadow.camera.updateProjectionMatrix()
    spotLight.shadow.camera.matrixWorldNeedsUpdate = true
  }

  const colorHolder = new three__WEBPACK_IMPORTED_MODULE_0__.Color(0xffffff)
  const light = new three__WEBPACK_IMPORTED_MODULE_0__.AmbientLight(0x222222)
  scene.add(light)
  scene.add(spotLight.target)

  spotLight.penumbra = 0.4
  spotLight.position.set(10, 14, 5)
  spotLight.distance = 0
  spotLight.castShadow = true
  spotLight.intensity = 1
  spotLight.shadow.camera.near = 10
  spotLight.shadow.camera.far = 25
  spotLight.shadow.camera.right = 10
  spotLight.shadow.camera.left = -10
  spotLight.shadow.camera.top = 10
  spotLight.shadow.camera.bottom = -10
  spotLight.shadow.mapSize.width = 2048
  spotLight.shadow.mapSize.height = 2048
  spotLight.shadow.bias = -0.01

  const props = {
    color: colorHolder.getStyle()
  }

  const spotLightFolder = gui.addFolder('Spotlight')
  spotLightFolder.addColor(props, 'color').onChange((c) => spotLight.color.setStyle(c))
  spotLightFolder.add(spotLight, 'intensity', 0, 5, 0.1)
  spotLightFolder.add(spotLight, 'distance', 0, 100, 0.1)
  spotLightFolder.add(spotLight, 'angle', 0, Math.PI / 2, 0.01)
  spotLightFolder.add(spotLight, 'decay', 0, 5, 0.01)
  spotLightFolder.add(spotLight, 'penumbra', 0, 1, 0.01)
  spotLightFolder.add(spotLight.position, 'x', -30, 30, 0.1).name('positionX')
  spotLightFolder.add(spotLight.position, 'y', -30, 30, 0.1).name('positionY')
  spotLightFolder.add(spotLight.position, 'z', -30, 30, 0.1).name('positionZ')
  spotLightFolder.add(spotLight.target.position, 'x', -30, 30, 0.1).name('targetX')
  spotLightFolder.add(spotLight.target.position, 'y', -30, 30, 0.1).name('targetY')
  spotLightFolder.add(spotLight.target.position, 'z', -30, 30, 0.1).name('targetZ')

  spotLightFolder.add(spotLight, 'castShadow')
  spotLightFolder.add(spotLightHelper, 'visible').name('spotlight-helper')

  const shadowCameraFolder = gui.addFolder('ShadowCamera')
  shadowCameraFolder.add(shadowCameraHelper, 'visible').name('shadow-helper')
  shadowCameraFolder.add(spotLight.shadow.camera, 'far', 0, 100, 0.1)
  shadowCameraFolder.add(spotLight.shadow.camera, 'near', 0, 20, 0.1)

  scene.add(spotLight)

  ;(0,_controls_renderer_control_js__WEBPACK_IMPORTED_MODULE_4__.intializeRendererControls)(gui, renderer)

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

/***/ "./samples/controls/renderer-control.js"
/*!**********************************************!*\
  !*** ./samples/controls/renderer-control.js ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   intializeRendererControls: () => (/* binding */ intializeRendererControls)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");


const enums = {
  toneMappingOptions: {
    None: three__WEBPACK_IMPORTED_MODULE_0__.NoToneMapping,
    Linear: three__WEBPACK_IMPORTED_MODULE_0__.LinearToneMapping,
    Reinhard: three__WEBPACK_IMPORTED_MODULE_0__.ReinhardToneMapping,
    Cineon: three__WEBPACK_IMPORTED_MODULE_0__.CineonToneMapping,
    ACESFilmic: three__WEBPACK_IMPORTED_MODULE_0__.ACESFilmicToneMapping,
    Custom: three__WEBPACK_IMPORTED_MODULE_0__.CustomToneMapping,
  },
  shadowMapping: {
    Basic: three__WEBPACK_IMPORTED_MODULE_0__.BasicShadowMap,
    PCFS: three__WEBPACK_IMPORTED_MODULE_0__.PCFShadowMap,
    PCFSoft: three__WEBPACK_IMPORTED_MODULE_0__.PCFSoftShadowMap,
    VSM: three__WEBPACK_IMPORTED_MODULE_0__.VSMShadowMap,
  },
  outputEncodings: {
    Linear: three__WEBPACK_IMPORTED_MODULE_0__.LinearEncoding,
    sRGB: three__WEBPACK_IMPORTED_MODULE_0__.sRGBEncoding,
  },
};

const getPropertyHolder = (webGLRenderer) => {
  const clearColorHolder = new three__WEBPACK_IMPORTED_MODULE_0__.Color();
  webGLRenderer.getClearColor(clearColorHolder);

  const holder = {
    main: {
      outputEncoding: webGLRenderer.outputEncoding,
    },
    shadowMap: {
      enabled: webGLRenderer.shadowMap.enabled,
      autoUpdate: webGLRenderer.shadowMap.autoUpdate,
      needsUpdate: () => (webGLRenderer.shadowMap.needsUpdate = true),
      type: webGLRenderer.shadowMap.type,
    },
    toneMapping: {
      exposure: webGLRenderer.toneMappingExposure,
      toneMapping: webGLRenderer.toneMapping,
    },
    clearSettings: {
      autoClear: webGLRenderer.autoClear,
      clearColor: clearColorHolder.getStyle(),
    },
    advanced: {
      autoClearDepth: webGLRenderer.autoClearDepth,
      autoClearStencil: webGLRenderer.autoClearStencil,
      checkShaderErrors: webGLRenderer.debug.checkShaderErrors,
      sortObjects: webGLRenderer.sortObjects,
      localClippingEnabled: webGLRenderer.localClippingEnabled,
      physicallyCorrectLights: webGLRenderer.physicallyCorrectLights,
    },
  };

  return holder;
};

const intializeRendererControls = (gui, webGLRenderer) => {
  const propertiesObject = getPropertyHolder(webGLRenderer);
  const rendererFolder = gui.addFolder("WebGLRenderer");

  rendererFolder.onChange((_) => {
    updateWebGLRendererProperties(webGLRenderer, propertiesObject);
  });

  rendererFolder.add(
    propertiesObject.main,
    "outputEncoding",
    enums.outputEncodings
  );

  const shadowFolder = rendererFolder.addFolder("Shadow");
  shadowFolder.add(propertiesObject.shadowMap, "enabled");
  shadowFolder.add(propertiesObject.shadowMap, "autoUpdate");
  shadowFolder.add(propertiesObject.shadowMap, "needsUpdate");
  shadowFolder
    .add(propertiesObject.shadowMap, "type", enums.shadowMapping)
    .enable(false); // can't update the shadow mapping type in runtime

  const toneMappingFolder = rendererFolder.addFolder("ToneMapping");
  toneMappingFolder.add(propertiesObject.toneMapping, "exposure", 0, 2);
  toneMappingFolder.add(
    propertiesObject.toneMapping,
    "toneMapping",
    enums.toneMappingOptions
  );

  const clearSettingsFolder = rendererFolder.addFolder("clearSettings");
  clearSettingsFolder.add(propertiesObject.clearSettings, "autoClear");
  clearSettingsFolder.addColor(propertiesObject.clearSettings, "clearColor");

  rendererFolder.close();
};

const updateWebGLRendererProperties = (webGLRenderer, propertyHolder) => {
  webGLRenderer.shadowMap.enabled = propertyHolder.shadowMap.enabled;
  webGLRenderer.shadowMap.autoUpdate = propertyHolder.shadowMap.autoUpdate;
  webGLRenderer.shadowMap.needsUpdate = propertyHolder.shadowMap.needsUpdate;
  webGLRenderer.toneMapping = propertyHolder.toneMapping.toneMapping;
  webGLRenderer.toneMappingExposure = propertyHolder.toneMapping.exposure;
  webGLRenderer.autoClear = propertyHolder.clearSettings.autoClear;
  webGLRenderer.setClearColor(propertyHolder.clearSettings.clearColor);
  webGLRenderer.outputEncoding = propertyHolder.main.outputEncoding;

  webGLRenderer.needsUpdate = true;
};


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
/******/ 			"spotlight": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","vendors-node_modules_three_examples_jsm_loaders_GLTFLoader_js"], () => (__webpack_require__("./samples/chapters/chapter-3/spotlight.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QzdELEU7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBLDRHOzs7OztVRWhEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2Jvb3RzdHJhcC9ib290c3RyYXAuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2Jvb3RzdHJhcC9saWdodGluZy5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci0zL3Nwb3RsaWdodC5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY29udHJvbGxlci9vcmJpdC1jb250cm9sbGVyLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jb250cm9scy9yZW5kZXJlci1jb250cm9sLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy91dGlsL21vZGVsVXRpbC5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvdXRpbC9zdGF0cy5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvdXRpbC91cGRhdGUtb24tcmVzaXplLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vbm9kZV9tb2R1bGVzL3RocmVlL2V4YW1wbGVzL2pzbS9saWJzL3N0YXRzLm1vZHVsZS5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuaW1wb3J0IHsgaW5pdE9yYml0Q29udHJvbHMgfSBmcm9tICcuLi9jb250cm9sbGVyL29yYml0LWNvbnRyb2xsZXInXG5pbXBvcnQgeyBpbml0TGlnaHRpbmcgfSBmcm9tICcuL2xpZ2h0aW5nJ1xuaW1wb3J0IHsgb25SZXNpemUgfSBmcm9tICcuLi91dGlsL3VwZGF0ZS1vbi1yZXNpemUnXG5cbmV4cG9ydCBjb25zdCBpbml0U2NlbmUgPSAoeyBiYWNrZ3JvdW5kQ29sb3IsIGZvZ0NvbG9yLCBkaXNhYmxlU2hhZG93cywgZGlzYWJsZUxpZ2h0cywgZGlzYWJsZURlZmF1bHRDb250cm9scyB9KSA9PiB7XG4gIGNvbnN0IGluaXQgPSAoZm4pID0+IHtcbiAgICAvLyBiYXNpYyBzY2VuZSBzZXR1cFxuICAgIGNvbnN0IHNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKClcbiAgICBpZiAoYmFja2dyb3VuZENvbG9yKSB7XG4gICAgICBzY2VuZS5iYWNrZ3JvdW5kQ29sb3IgPSBiYWNrZ3JvdW5kQ29sb3JcbiAgICB9XG5cbiAgICBpZiAoZm9nQ29sb3IpIHtcbiAgICAgIHNjZW5lLmZvZyA9IG5ldyBUSFJFRS5Gb2coZm9nQ29sb3IsIDAuMDAyNSwgNTApXG4gICAgfVxuXG4gICAgLy8gc2V0dXAgY2FtZXJhIGFuZCBiYXNpYyByZW5kZXJlclxuICAgIGNvbnN0IGNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg3NSwgd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQsIDAuMSwgMTAwMClcbiAgICBjb25zdCByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHsgYW50aWFsaWFzOiB0cnVlIH0pXG4gICAgcmVuZGVyZXIub3V0cHV0RW5jb2RpbmcgPSBUSFJFRS5zUkdCRW5jb2RpbmdcbiAgICByZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IHRydWVcbiAgICByZW5kZXJlci5zaGFkb3dNYXAudHlwZSA9IFRIUkVFLlZTTVNoYWRvd01hcFxuICAgIHJlbmRlcmVyLnNldENsZWFyQ29sb3IoYmFja2dyb3VuZENvbG9yKVxuXG4gICAgb25SZXNpemUoY2FtZXJhLCByZW5kZXJlcilcbiAgICByZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci5kb21FbGVtZW50KVxuXG4gICAgLy8gaW5pdGlhbGl6ZSBvcmJpdCBjb250cm9sc1xuICAgIGxldCBvcmJpdENvbnRyb2xzXG4gICAgaWYgKCFkaXNhYmxlRGVmYXVsdENvbnRyb2xzKSB7XG4gICAgICBvcmJpdENvbnRyb2xzID0gaW5pdE9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlcilcbiAgICB9XG5cbiAgICAvLyBhZGQgc29tZSBiYXNpYyBsaWdodGluZyB0byB0aGUgc2NlbmVcbiAgICBpZiAoIWRpc2FibGVMaWdodHMgPz8gZmFsc2UpIHtcbiAgICAgIGluaXRMaWdodGluZyhzY2VuZSwgeyBkaXNhYmxlU2hhZG93cyB9KVxuICAgIH1cblxuICAgIGZuKHsgc2NlbmUsIGNhbWVyYSwgcmVuZGVyZXIsIG9yYml0Q29udHJvbHMgfSlcbiAgfVxuXG4gIHJldHVybiBpbml0XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcblxuZXhwb3J0IGNvbnN0IGluaXRMaWdodGluZyA9IChzY2VuZSwgeyBkaXNhYmxlU2hhZG93cyB9KSA9PiB7XG4gIC8vIGh0dHBzOi8vdGhyZWVqcy5vcmcvZXhhbXBsZXMvP3E9c2hhZG8jd2ViZ2xfc2hhZG93bWFwX3ZzbVxuICBzY2VuZS5hZGQobmV3IFRIUkVFLkFtYmllbnRMaWdodCgweDY2NjY2NikpXG5cbiAgLy8gY29uc3QgZGlyTGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGFhYWFhYSlcbiAgY29uc3QgZGlyTGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGFhYWFhYSlcbiAgZGlyTGlnaHQucG9zaXRpb24uc2V0KDUsIDEyLCA4KVxuICBkaXJMaWdodC5jYXN0U2hhZG93ID0gIWRpc2FibGVTaGFkb3dzID8gdHJ1ZSA6IGZhbHNlXG4gIGRpckxpZ2h0LmludGVuc2l0eSA9IDFcbiAgZGlyTGlnaHQuc2hhZG93LmNhbWVyYS5uZWFyID0gMC4xXG4gIGRpckxpZ2h0LnNoYWRvdy5jYW1lcmEuZmFyID0gMjAwXG4gIGRpckxpZ2h0LnNoYWRvdy5jYW1lcmEucmlnaHQgPSAxMFxuICBkaXJMaWdodC5zaGFkb3cuY2FtZXJhLmxlZnQgPSAtMTBcbiAgZGlyTGlnaHQuc2hhZG93LmNhbWVyYS50b3AgPSAxMFxuICBkaXJMaWdodC5zaGFkb3cuY2FtZXJhLmJvdHRvbSA9IC0xMFxuICBkaXJMaWdodC5zaGFkb3cubWFwU2l6ZS53aWR0aCA9IDIwNDhcbiAgZGlyTGlnaHQuc2hhZG93Lm1hcFNpemUuaGVpZ2h0ID0gMjA0OFxuICBkaXJMaWdodC5zaGFkb3cucmFkaXVzID0gNFxuICBkaXJMaWdodC5zaGFkb3cuYmlhcyA9IC0wLjAwMDA1XG5cbiAgc2NlbmUuYWRkKGRpckxpZ2h0KVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5pbXBvcnQgR1VJIGZyb20gJ2xpbC1ndWknXG5pbXBvcnQgeyBHTFRGTG9hZGVyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcydcbmltcG9ydCB7IGluaXRTY2VuZSB9IGZyb20gJy4uLy4uL2Jvb3RzdHJhcC9ib290c3RyYXAuanMnXG5pbXBvcnQgeyBpbnRpYWxpemVSZW5kZXJlckNvbnRyb2xzIH0gZnJvbSAnLi4vLi4vY29udHJvbHMvcmVuZGVyZXItY29udHJvbC5qcydcbmltcG9ydCB7IHN0YXRzIH0gZnJvbSAnLi4vLi4vdXRpbC9zdGF0cydcbmltcG9ydCB7IHZpc2l0Q2hpbGRyZW4gfSBmcm9tICcuLi8uLi91dGlsL21vZGVsVXRpbC5qcydcblxuY29uc3QgcHJvcHMgPSB7XG4gIGJhY2tncm91bmRDb2xvcjogMHhjY2NjY2MsXG4gIGRpc2FibGVMaWdodHM6IHRydWVcbn1cbmNvbnN0IGd1aSA9IG5ldyBHVUkoKVxuXG5jb25zdCBsb2FkV2F0ZXJmYWxsID0gKHNjZW5lKSA9PiB7XG4gIGNvbnN0IGxvYWRlciA9IG5ldyBHTFRGTG9hZGVyKClcbiAgbG9hZGVyLmxvYWQoJy9hc3NldHMvZ2x0Zi93YXRlcmZhbGwvc2NlbmUuZ2x0ZicsIChsb2FkZWRPYmplY3QpID0+IHtcbiAgICAvLyB0aGUgbmVzdGVkXG4gICAgY29uc3QgbG9hZGVkU2NlbmUgPSBsb2FkZWRPYmplY3Quc2NlbmUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF1cbiAgICB2aXNpdENoaWxkcmVuKGxvYWRlZFNjZW5lLCAoYykgPT4ge1xuICAgICAgYy5yZWNlaXZlU2hhZG93ID0gdHJ1ZVxuICAgICAgYy5jYXN0U2hhZG93ID0gdHJ1ZVxuICAgIH0pXG4gICAgbG9hZGVkU2NlbmUucm90YXRlWCgtMC41ICogTWF0aC5QSSlcbiAgICBzY2VuZS5hZGQobG9hZGVkU2NlbmUpXG4gIH0pXG59XG5cbmluaXRTY2VuZShwcm9wcykoKHsgc2NlbmUsIGNhbWVyYSwgcmVuZGVyZXIsIG9yYml0Q29udHJvbHMgfSkgPT4ge1xuICByZW5kZXJlci5zaGFkb3dNYXAudHlwZSA9IFRIUkVFLlBDRlNvZnRTaGFkb3dNYXBcbiAgY2FtZXJhLnBvc2l0aW9uLnNldCgtNCwgMTQsIDQpXG4gIG9yYml0Q29udHJvbHMudXBkYXRlKClcblxuICBsb2FkV2F0ZXJmYWxsKHNjZW5lKVxuXG4gIGNvbnN0IHNwb3RMaWdodCA9IG5ldyBUSFJFRS5TcG90TGlnaHQoKVxuICBjb25zdCBzcG90TGlnaHRIZWxwZXIgPSBuZXcgVEhSRUUuU3BvdExpZ2h0SGVscGVyKHNwb3RMaWdodClcbiAgY29uc3Qgc2hhZG93Q2FtZXJhSGVscGVyID0gbmV3IFRIUkVFLkNhbWVyYUhlbHBlcihzcG90TGlnaHQuc2hhZG93LmNhbWVyYSlcbiAgc3BvdExpZ2h0SGVscGVyLnZpc2libGUgPSBmYWxzZVxuICBzaGFkb3dDYW1lcmFIZWxwZXIudmlzaWJsZSA9IGZhbHNlXG5cbiAgc2NlbmUuYWRkKHNwb3RMaWdodEhlbHBlcilcbiAgc2NlbmUuYWRkKHNoYWRvd0NhbWVyYUhlbHBlcilcblxuICBmdW5jdGlvbiBhbmltYXRlKCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKVxuICAgIHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhKVxuICAgIHN0YXRzLnVwZGF0ZSgpXG4gICAgc3BvdExpZ2h0SGVscGVyLnVwZGF0ZSgpXG4gICAgc2hhZG93Q2FtZXJhSGVscGVyLnVwZGF0ZSgpXG4gICAgb3JiaXRDb250cm9scy51cGRhdGUoKVxuICAgIHNwb3RMaWdodC5zaGFkb3cuY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKVxuICAgIHNwb3RMaWdodC5zaGFkb3cuY2FtZXJhLm1hdHJpeFdvcmxkTmVlZHNVcGRhdGUgPSB0cnVlXG4gIH1cblxuICBjb25zdCBjb2xvckhvbGRlciA9IG5ldyBUSFJFRS5Db2xvcigweGZmZmZmZilcbiAgY29uc3QgbGlnaHQgPSBuZXcgVEhSRUUuQW1iaWVudExpZ2h0KDB4MjIyMjIyKVxuICBzY2VuZS5hZGQobGlnaHQpXG4gIHNjZW5lLmFkZChzcG90TGlnaHQudGFyZ2V0KVxuXG4gIHNwb3RMaWdodC5wZW51bWJyYSA9IDAuNFxuICBzcG90TGlnaHQucG9zaXRpb24uc2V0KDEwLCAxNCwgNSlcbiAgc3BvdExpZ2h0LmRpc3RhbmNlID0gMFxuICBzcG90TGlnaHQuY2FzdFNoYWRvdyA9IHRydWVcbiAgc3BvdExpZ2h0LmludGVuc2l0eSA9IDFcbiAgc3BvdExpZ2h0LnNoYWRvdy5jYW1lcmEubmVhciA9IDEwXG4gIHNwb3RMaWdodC5zaGFkb3cuY2FtZXJhLmZhciA9IDI1XG4gIHNwb3RMaWdodC5zaGFkb3cuY2FtZXJhLnJpZ2h0ID0gMTBcbiAgc3BvdExpZ2h0LnNoYWRvdy5jYW1lcmEubGVmdCA9IC0xMFxuICBzcG90TGlnaHQuc2hhZG93LmNhbWVyYS50b3AgPSAxMFxuICBzcG90TGlnaHQuc2hhZG93LmNhbWVyYS5ib3R0b20gPSAtMTBcbiAgc3BvdExpZ2h0LnNoYWRvdy5tYXBTaXplLndpZHRoID0gMjA0OFxuICBzcG90TGlnaHQuc2hhZG93Lm1hcFNpemUuaGVpZ2h0ID0gMjA0OFxuICBzcG90TGlnaHQuc2hhZG93LmJpYXMgPSAtMC4wMVxuXG4gIGNvbnN0IHByb3BzID0ge1xuICAgIGNvbG9yOiBjb2xvckhvbGRlci5nZXRTdHlsZSgpXG4gIH1cblxuICBjb25zdCBzcG90TGlnaHRGb2xkZXIgPSBndWkuYWRkRm9sZGVyKCdTcG90bGlnaHQnKVxuICBzcG90TGlnaHRGb2xkZXIuYWRkQ29sb3IocHJvcHMsICdjb2xvcicpLm9uQ2hhbmdlKChjKSA9PiBzcG90TGlnaHQuY29sb3Iuc2V0U3R5bGUoYykpXG4gIHNwb3RMaWdodEZvbGRlci5hZGQoc3BvdExpZ2h0LCAnaW50ZW5zaXR5JywgMCwgNSwgMC4xKVxuICBzcG90TGlnaHRGb2xkZXIuYWRkKHNwb3RMaWdodCwgJ2Rpc3RhbmNlJywgMCwgMTAwLCAwLjEpXG4gIHNwb3RMaWdodEZvbGRlci5hZGQoc3BvdExpZ2h0LCAnYW5nbGUnLCAwLCBNYXRoLlBJIC8gMiwgMC4wMSlcbiAgc3BvdExpZ2h0Rm9sZGVyLmFkZChzcG90TGlnaHQsICdkZWNheScsIDAsIDUsIDAuMDEpXG4gIHNwb3RMaWdodEZvbGRlci5hZGQoc3BvdExpZ2h0LCAncGVudW1icmEnLCAwLCAxLCAwLjAxKVxuICBzcG90TGlnaHRGb2xkZXIuYWRkKHNwb3RMaWdodC5wb3NpdGlvbiwgJ3gnLCAtMzAsIDMwLCAwLjEpLm5hbWUoJ3Bvc2l0aW9uWCcpXG4gIHNwb3RMaWdodEZvbGRlci5hZGQoc3BvdExpZ2h0LnBvc2l0aW9uLCAneScsIC0zMCwgMzAsIDAuMSkubmFtZSgncG9zaXRpb25ZJylcbiAgc3BvdExpZ2h0Rm9sZGVyLmFkZChzcG90TGlnaHQucG9zaXRpb24sICd6JywgLTMwLCAzMCwgMC4xKS5uYW1lKCdwb3NpdGlvblonKVxuICBzcG90TGlnaHRGb2xkZXIuYWRkKHNwb3RMaWdodC50YXJnZXQucG9zaXRpb24sICd4JywgLTMwLCAzMCwgMC4xKS5uYW1lKCd0YXJnZXRYJylcbiAgc3BvdExpZ2h0Rm9sZGVyLmFkZChzcG90TGlnaHQudGFyZ2V0LnBvc2l0aW9uLCAneScsIC0zMCwgMzAsIDAuMSkubmFtZSgndGFyZ2V0WScpXG4gIHNwb3RMaWdodEZvbGRlci5hZGQoc3BvdExpZ2h0LnRhcmdldC5wb3NpdGlvbiwgJ3onLCAtMzAsIDMwLCAwLjEpLm5hbWUoJ3RhcmdldFonKVxuXG4gIHNwb3RMaWdodEZvbGRlci5hZGQoc3BvdExpZ2h0LCAnY2FzdFNoYWRvdycpXG4gIHNwb3RMaWdodEZvbGRlci5hZGQoc3BvdExpZ2h0SGVscGVyLCAndmlzaWJsZScpLm5hbWUoJ3Nwb3RsaWdodC1oZWxwZXInKVxuXG4gIGNvbnN0IHNoYWRvd0NhbWVyYUZvbGRlciA9IGd1aS5hZGRGb2xkZXIoJ1NoYWRvd0NhbWVyYScpXG4gIHNoYWRvd0NhbWVyYUZvbGRlci5hZGQoc2hhZG93Q2FtZXJhSGVscGVyLCAndmlzaWJsZScpLm5hbWUoJ3NoYWRvdy1oZWxwZXInKVxuICBzaGFkb3dDYW1lcmFGb2xkZXIuYWRkKHNwb3RMaWdodC5zaGFkb3cuY2FtZXJhLCAnZmFyJywgMCwgMTAwLCAwLjEpXG4gIHNoYWRvd0NhbWVyYUZvbGRlci5hZGQoc3BvdExpZ2h0LnNoYWRvdy5jYW1lcmEsICduZWFyJywgMCwgMjAsIDAuMSlcblxuICBzY2VuZS5hZGQoc3BvdExpZ2h0KVxuXG4gIGludGlhbGl6ZVJlbmRlcmVyQ29udHJvbHMoZ3VpLCByZW5kZXJlcilcblxuICBhbmltYXRlKClcbn0pXG4iLCJpbXBvcnQgeyBPcmJpdENvbnRyb2xzIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2NvbnRyb2xzL09yYml0Q29udHJvbHMnXG5cbmV4cG9ydCBjb25zdCBpbml0T3JiaXRDb250cm9scyA9IChjYW1lcmEsIHJlbmRlcmVyKSA9PiB7XG4gIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgT3JiaXRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLmRvbUVsZW1lbnQpXG4gIGNvbnRyb2xsZXIuZW5hYmxlRGFtcGluZyA9IHRydWVcbiAgY29udHJvbGxlci5kYW1waW5nRmFjdG9yID0gMC4wNVxuICBjb250cm9sbGVyLm1pbkRpc3RhbmNlID0gMVxuICBjb250cm9sbGVyLm1heERpc3RhbmNlID0gMTAwXG4gIGNvbnRyb2xsZXIubWluUG9sYXJBbmdsZSA9IE1hdGguUEkgLyA0XG4gIGNvbnRyb2xsZXIubWF4UG9sYXJBbmdsZSA9ICgzICogTWF0aC5QSSkgLyA0XG5cbiAgcmV0dXJuIGNvbnRyb2xsZXJcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuXG5jb25zdCBlbnVtcyA9IHtcbiAgdG9uZU1hcHBpbmdPcHRpb25zOiB7XG4gICAgTm9uZTogVEhSRUUuTm9Ub25lTWFwcGluZyxcbiAgICBMaW5lYXI6IFRIUkVFLkxpbmVhclRvbmVNYXBwaW5nLFxuICAgIFJlaW5oYXJkOiBUSFJFRS5SZWluaGFyZFRvbmVNYXBwaW5nLFxuICAgIENpbmVvbjogVEhSRUUuQ2luZW9uVG9uZU1hcHBpbmcsXG4gICAgQUNFU0ZpbG1pYzogVEhSRUUuQUNFU0ZpbG1pY1RvbmVNYXBwaW5nLFxuICAgIEN1c3RvbTogVEhSRUUuQ3VzdG9tVG9uZU1hcHBpbmcsXG4gIH0sXG4gIHNoYWRvd01hcHBpbmc6IHtcbiAgICBCYXNpYzogVEhSRUUuQmFzaWNTaGFkb3dNYXAsXG4gICAgUENGUzogVEhSRUUuUENGU2hhZG93TWFwLFxuICAgIFBDRlNvZnQ6IFRIUkVFLlBDRlNvZnRTaGFkb3dNYXAsXG4gICAgVlNNOiBUSFJFRS5WU01TaGFkb3dNYXAsXG4gIH0sXG4gIG91dHB1dEVuY29kaW5nczoge1xuICAgIExpbmVhcjogVEhSRUUuTGluZWFyRW5jb2RpbmcsXG4gICAgc1JHQjogVEhSRUUuc1JHQkVuY29kaW5nLFxuICB9LFxufTtcblxuY29uc3QgZ2V0UHJvcGVydHlIb2xkZXIgPSAod2ViR0xSZW5kZXJlcikgPT4ge1xuICBjb25zdCBjbGVhckNvbG9ySG9sZGVyID0gbmV3IFRIUkVFLkNvbG9yKCk7XG4gIHdlYkdMUmVuZGVyZXIuZ2V0Q2xlYXJDb2xvcihjbGVhckNvbG9ySG9sZGVyKTtcblxuICBjb25zdCBob2xkZXIgPSB7XG4gICAgbWFpbjoge1xuICAgICAgb3V0cHV0RW5jb2Rpbmc6IHdlYkdMUmVuZGVyZXIub3V0cHV0RW5jb2RpbmcsXG4gICAgfSxcbiAgICBzaGFkb3dNYXA6IHtcbiAgICAgIGVuYWJsZWQ6IHdlYkdMUmVuZGVyZXIuc2hhZG93TWFwLmVuYWJsZWQsXG4gICAgICBhdXRvVXBkYXRlOiB3ZWJHTFJlbmRlcmVyLnNoYWRvd01hcC5hdXRvVXBkYXRlLFxuICAgICAgbmVlZHNVcGRhdGU6ICgpID0+ICh3ZWJHTFJlbmRlcmVyLnNoYWRvd01hcC5uZWVkc1VwZGF0ZSA9IHRydWUpLFxuICAgICAgdHlwZTogd2ViR0xSZW5kZXJlci5zaGFkb3dNYXAudHlwZSxcbiAgICB9LFxuICAgIHRvbmVNYXBwaW5nOiB7XG4gICAgICBleHBvc3VyZTogd2ViR0xSZW5kZXJlci50b25lTWFwcGluZ0V4cG9zdXJlLFxuICAgICAgdG9uZU1hcHBpbmc6IHdlYkdMUmVuZGVyZXIudG9uZU1hcHBpbmcsXG4gICAgfSxcbiAgICBjbGVhclNldHRpbmdzOiB7XG4gICAgICBhdXRvQ2xlYXI6IHdlYkdMUmVuZGVyZXIuYXV0b0NsZWFyLFxuICAgICAgY2xlYXJDb2xvcjogY2xlYXJDb2xvckhvbGRlci5nZXRTdHlsZSgpLFxuICAgIH0sXG4gICAgYWR2YW5jZWQ6IHtcbiAgICAgIGF1dG9DbGVhckRlcHRoOiB3ZWJHTFJlbmRlcmVyLmF1dG9DbGVhckRlcHRoLFxuICAgICAgYXV0b0NsZWFyU3RlbmNpbDogd2ViR0xSZW5kZXJlci5hdXRvQ2xlYXJTdGVuY2lsLFxuICAgICAgY2hlY2tTaGFkZXJFcnJvcnM6IHdlYkdMUmVuZGVyZXIuZGVidWcuY2hlY2tTaGFkZXJFcnJvcnMsXG4gICAgICBzb3J0T2JqZWN0czogd2ViR0xSZW5kZXJlci5zb3J0T2JqZWN0cyxcbiAgICAgIGxvY2FsQ2xpcHBpbmdFbmFibGVkOiB3ZWJHTFJlbmRlcmVyLmxvY2FsQ2xpcHBpbmdFbmFibGVkLFxuICAgICAgcGh5c2ljYWxseUNvcnJlY3RMaWdodHM6IHdlYkdMUmVuZGVyZXIucGh5c2ljYWxseUNvcnJlY3RMaWdodHMsXG4gICAgfSxcbiAgfTtcblxuICByZXR1cm4gaG9sZGVyO1xufTtcblxuZXhwb3J0IGNvbnN0IGludGlhbGl6ZVJlbmRlcmVyQ29udHJvbHMgPSAoZ3VpLCB3ZWJHTFJlbmRlcmVyKSA9PiB7XG4gIGNvbnN0IHByb3BlcnRpZXNPYmplY3QgPSBnZXRQcm9wZXJ0eUhvbGRlcih3ZWJHTFJlbmRlcmVyKTtcbiAgY29uc3QgcmVuZGVyZXJGb2xkZXIgPSBndWkuYWRkRm9sZGVyKFwiV2ViR0xSZW5kZXJlclwiKTtcblxuICByZW5kZXJlckZvbGRlci5vbkNoYW5nZSgoXykgPT4ge1xuICAgIHVwZGF0ZVdlYkdMUmVuZGVyZXJQcm9wZXJ0aWVzKHdlYkdMUmVuZGVyZXIsIHByb3BlcnRpZXNPYmplY3QpO1xuICB9KTtcblxuICByZW5kZXJlckZvbGRlci5hZGQoXG4gICAgcHJvcGVydGllc09iamVjdC5tYWluLFxuICAgIFwib3V0cHV0RW5jb2RpbmdcIixcbiAgICBlbnVtcy5vdXRwdXRFbmNvZGluZ3NcbiAgKTtcblxuICBjb25zdCBzaGFkb3dGb2xkZXIgPSByZW5kZXJlckZvbGRlci5hZGRGb2xkZXIoXCJTaGFkb3dcIik7XG4gIHNoYWRvd0ZvbGRlci5hZGQocHJvcGVydGllc09iamVjdC5zaGFkb3dNYXAsIFwiZW5hYmxlZFwiKTtcbiAgc2hhZG93Rm9sZGVyLmFkZChwcm9wZXJ0aWVzT2JqZWN0LnNoYWRvd01hcCwgXCJhdXRvVXBkYXRlXCIpO1xuICBzaGFkb3dGb2xkZXIuYWRkKHByb3BlcnRpZXNPYmplY3Quc2hhZG93TWFwLCBcIm5lZWRzVXBkYXRlXCIpO1xuICBzaGFkb3dGb2xkZXJcbiAgICAuYWRkKHByb3BlcnRpZXNPYmplY3Quc2hhZG93TWFwLCBcInR5cGVcIiwgZW51bXMuc2hhZG93TWFwcGluZylcbiAgICAuZW5hYmxlKGZhbHNlKTsgLy8gY2FuJ3QgdXBkYXRlIHRoZSBzaGFkb3cgbWFwcGluZyB0eXBlIGluIHJ1bnRpbWVcblxuICBjb25zdCB0b25lTWFwcGluZ0ZvbGRlciA9IHJlbmRlcmVyRm9sZGVyLmFkZEZvbGRlcihcIlRvbmVNYXBwaW5nXCIpO1xuICB0b25lTWFwcGluZ0ZvbGRlci5hZGQocHJvcGVydGllc09iamVjdC50b25lTWFwcGluZywgXCJleHBvc3VyZVwiLCAwLCAyKTtcbiAgdG9uZU1hcHBpbmdGb2xkZXIuYWRkKFxuICAgIHByb3BlcnRpZXNPYmplY3QudG9uZU1hcHBpbmcsXG4gICAgXCJ0b25lTWFwcGluZ1wiLFxuICAgIGVudW1zLnRvbmVNYXBwaW5nT3B0aW9uc1xuICApO1xuXG4gIGNvbnN0IGNsZWFyU2V0dGluZ3NGb2xkZXIgPSByZW5kZXJlckZvbGRlci5hZGRGb2xkZXIoXCJjbGVhclNldHRpbmdzXCIpO1xuICBjbGVhclNldHRpbmdzRm9sZGVyLmFkZChwcm9wZXJ0aWVzT2JqZWN0LmNsZWFyU2V0dGluZ3MsIFwiYXV0b0NsZWFyXCIpO1xuICBjbGVhclNldHRpbmdzRm9sZGVyLmFkZENvbG9yKHByb3BlcnRpZXNPYmplY3QuY2xlYXJTZXR0aW5ncywgXCJjbGVhckNvbG9yXCIpO1xuXG4gIHJlbmRlcmVyRm9sZGVyLmNsb3NlKCk7XG59O1xuXG5jb25zdCB1cGRhdGVXZWJHTFJlbmRlcmVyUHJvcGVydGllcyA9ICh3ZWJHTFJlbmRlcmVyLCBwcm9wZXJ0eUhvbGRlcikgPT4ge1xuICB3ZWJHTFJlbmRlcmVyLnNoYWRvd01hcC5lbmFibGVkID0gcHJvcGVydHlIb2xkZXIuc2hhZG93TWFwLmVuYWJsZWQ7XG4gIHdlYkdMUmVuZGVyZXIuc2hhZG93TWFwLmF1dG9VcGRhdGUgPSBwcm9wZXJ0eUhvbGRlci5zaGFkb3dNYXAuYXV0b1VwZGF0ZTtcbiAgd2ViR0xSZW5kZXJlci5zaGFkb3dNYXAubmVlZHNVcGRhdGUgPSBwcm9wZXJ0eUhvbGRlci5zaGFkb3dNYXAubmVlZHNVcGRhdGU7XG4gIHdlYkdMUmVuZGVyZXIudG9uZU1hcHBpbmcgPSBwcm9wZXJ0eUhvbGRlci50b25lTWFwcGluZy50b25lTWFwcGluZztcbiAgd2ViR0xSZW5kZXJlci50b25lTWFwcGluZ0V4cG9zdXJlID0gcHJvcGVydHlIb2xkZXIudG9uZU1hcHBpbmcuZXhwb3N1cmU7XG4gIHdlYkdMUmVuZGVyZXIuYXV0b0NsZWFyID0gcHJvcGVydHlIb2xkZXIuY2xlYXJTZXR0aW5ncy5hdXRvQ2xlYXI7XG4gIHdlYkdMUmVuZGVyZXIuc2V0Q2xlYXJDb2xvcihwcm9wZXJ0eUhvbGRlci5jbGVhclNldHRpbmdzLmNsZWFyQ29sb3IpO1xuICB3ZWJHTFJlbmRlcmVyLm91dHB1dEVuY29kaW5nID0gcHJvcGVydHlIb2xkZXIubWFpbi5vdXRwdXRFbmNvZGluZztcblxuICB3ZWJHTFJlbmRlcmVyLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbn07XG4iLCJleHBvcnQgY29uc3QgdmlzaXRDaGlsZHJlbiA9IChvYmplY3QsIGZuKSA9PiB7XG4gIGlmIChvYmplY3QuY2hpbGRyZW4gJiYgb2JqZWN0LmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIG9iamVjdC5jaGlsZHJlbikge1xuICAgICAgdmlzaXRDaGlsZHJlbihjaGlsZCwgZm4pXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZuKG9iamVjdClcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgYXBwbHlTaGFkb3dzQW5kRGVwdGhXcml0ZSA9IChvYmplY3QpID0+IHtcbiAgdmlzaXRDaGlsZHJlbihvYmplY3QsIChjaGlsZCkgPT4ge1xuICAgIGlmIChjaGlsZC5tYXRlcmlhbCkge1xuICAgICAgY2hpbGQubWF0ZXJpYWwuZGVwdGhXcml0ZSA9IHRydWVcbiAgICAgIGNoaWxkLmNhc3RTaGFkb3cgPSB0cnVlXG4gICAgICBjaGlsZC5yZWNlaXZlU2hhZG93ID0gdHJ1ZVxuICAgIH1cbiAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IGZpbmRDaGlsZCA9IChvYmplY3QsIG5hbWUpID0+IHtcbiAgaWYgKG9iamVjdC5jaGlsZHJlbiAmJiBvYmplY3QuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgIGZvciAoY29uc3QgY2hpbGQgb2Ygb2JqZWN0LmNoaWxkcmVuKSB7XG4gICAgICBpZiAobmFtZSA9PT0gY2hpbGQubmFtZSkge1xuICAgICAgICByZXR1cm4gY2hpbGRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGZpbmRDaGlsZChjaGlsZCwgbmFtZSlcbiAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgIHJldHVybiByZXNcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAobmFtZSA9PT0gb2JqZWN0Lm5hbWUpIHtcbiAgICAgIHJldHVybiBvYmplY3RcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFN0YXRzIGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9saWJzL3N0YXRzLm1vZHVsZSdcblxuY29uc3Qgc3RhdHMgPSBTdGF0cygpXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHN0YXRzLmRvbSlcblxuZXhwb3J0IHsgc3RhdHMgfVxuIiwiZXhwb3J0IGNvbnN0IG9uUmVzaXplID0gKGNhbWVyYSwgcmVuZGVyZXIpID0+IHtcbiAgY29uc3QgcmVzaXplciA9ICgpID0+IHtcbiAgICBjYW1lcmEuYXNwZWN0ID0gd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICBjYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpXG4gICAgcmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KVxuICB9XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemVyLCBmYWxzZSlcbn1cbiIsInZhciBTdGF0cyA9IGZ1bmN0aW9uICgpIHtcblxuXHR2YXIgbW9kZSA9IDA7XG5cblx0dmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XG5cdGNvbnRhaW5lci5zdHlsZS5jc3NUZXh0ID0gJ3Bvc2l0aW9uOmZpeGVkO3RvcDowO2xlZnQ6MDtjdXJzb3I6cG9pbnRlcjtvcGFjaXR5OjAuOTt6LWluZGV4OjEwMDAwJztcblx0Y29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoICdjbGljaycsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG5cblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHNob3dQYW5lbCggKysgbW9kZSAlIGNvbnRhaW5lci5jaGlsZHJlbi5sZW5ndGggKTtcblxuXHR9LCBmYWxzZSApO1xuXG5cdC8vXG5cblx0ZnVuY3Rpb24gYWRkUGFuZWwoIHBhbmVsICkge1xuXG5cdFx0Y29udGFpbmVyLmFwcGVuZENoaWxkKCBwYW5lbC5kb20gKTtcblx0XHRyZXR1cm4gcGFuZWw7XG5cblx0fVxuXG5cdGZ1bmN0aW9uIHNob3dQYW5lbCggaWQgKSB7XG5cblx0XHRmb3IgKCB2YXIgaSA9IDA7IGkgPCBjb250YWluZXIuY2hpbGRyZW4ubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0XHRjb250YWluZXIuY2hpbGRyZW5bIGkgXS5zdHlsZS5kaXNwbGF5ID0gaSA9PT0gaWQgPyAnYmxvY2snIDogJ25vbmUnO1xuXG5cdFx0fVxuXG5cdFx0bW9kZSA9IGlkO1xuXG5cdH1cblxuXHQvL1xuXG5cdHZhciBiZWdpblRpbWUgPSAoIHBlcmZvcm1hbmNlIHx8IERhdGUgKS5ub3coKSwgcHJldlRpbWUgPSBiZWdpblRpbWUsIGZyYW1lcyA9IDA7XG5cblx0dmFyIGZwc1BhbmVsID0gYWRkUGFuZWwoIG5ldyBTdGF0cy5QYW5lbCggJ0ZQUycsICcjMGZmJywgJyMwMDInICkgKTtcblx0dmFyIG1zUGFuZWwgPSBhZGRQYW5lbCggbmV3IFN0YXRzLlBhbmVsKCAnTVMnLCAnIzBmMCcsICcjMDIwJyApICk7XG5cblx0aWYgKCBzZWxmLnBlcmZvcm1hbmNlICYmIHNlbGYucGVyZm9ybWFuY2UubWVtb3J5ICkge1xuXG5cdFx0dmFyIG1lbVBhbmVsID0gYWRkUGFuZWwoIG5ldyBTdGF0cy5QYW5lbCggJ01CJywgJyNmMDgnLCAnIzIwMScgKSApO1xuXG5cdH1cblxuXHRzaG93UGFuZWwoIDAgKTtcblxuXHRyZXR1cm4ge1xuXG5cdFx0UkVWSVNJT046IDE2LFxuXG5cdFx0ZG9tOiBjb250YWluZXIsXG5cblx0XHRhZGRQYW5lbDogYWRkUGFuZWwsXG5cdFx0c2hvd1BhbmVsOiBzaG93UGFuZWwsXG5cblx0XHRiZWdpbjogZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRiZWdpblRpbWUgPSAoIHBlcmZvcm1hbmNlIHx8IERhdGUgKS5ub3coKTtcblxuXHRcdH0sXG5cblx0XHRlbmQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0ZnJhbWVzICsrO1xuXG5cdFx0XHR2YXIgdGltZSA9ICggcGVyZm9ybWFuY2UgfHwgRGF0ZSApLm5vdygpO1xuXG5cdFx0XHRtc1BhbmVsLnVwZGF0ZSggdGltZSAtIGJlZ2luVGltZSwgMjAwICk7XG5cblx0XHRcdGlmICggdGltZSA+PSBwcmV2VGltZSArIDEwMDAgKSB7XG5cblx0XHRcdFx0ZnBzUGFuZWwudXBkYXRlKCAoIGZyYW1lcyAqIDEwMDAgKSAvICggdGltZSAtIHByZXZUaW1lICksIDEwMCApO1xuXG5cdFx0XHRcdHByZXZUaW1lID0gdGltZTtcblx0XHRcdFx0ZnJhbWVzID0gMDtcblxuXHRcdFx0XHRpZiAoIG1lbVBhbmVsICkge1xuXG5cdFx0XHRcdFx0dmFyIG1lbW9yeSA9IHBlcmZvcm1hbmNlLm1lbW9yeTtcblx0XHRcdFx0XHRtZW1QYW5lbC51cGRhdGUoIG1lbW9yeS51c2VkSlNIZWFwU2l6ZSAvIDEwNDg1NzYsIG1lbW9yeS5qc0hlYXBTaXplTGltaXQgLyAxMDQ4NTc2ICk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0aW1lO1xuXG5cdFx0fSxcblxuXHRcdHVwZGF0ZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRiZWdpblRpbWUgPSB0aGlzLmVuZCgpO1xuXG5cdFx0fSxcblxuXHRcdC8vIEJhY2t3YXJkcyBDb21wYXRpYmlsaXR5XG5cblx0XHRkb21FbGVtZW50OiBjb250YWluZXIsXG5cdFx0c2V0TW9kZTogc2hvd1BhbmVsXG5cblx0fTtcblxufTtcblxuU3RhdHMuUGFuZWwgPSBmdW5jdGlvbiAoIG5hbWUsIGZnLCBiZyApIHtcblxuXHR2YXIgbWluID0gSW5maW5pdHksIG1heCA9IDAsIHJvdW5kID0gTWF0aC5yb3VuZDtcblx0dmFyIFBSID0gcm91bmQoIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDEgKTtcblxuXHR2YXIgV0lEVEggPSA4MCAqIFBSLCBIRUlHSFQgPSA0OCAqIFBSLFxuXHRcdFRFWFRfWCA9IDMgKiBQUiwgVEVYVF9ZID0gMiAqIFBSLFxuXHRcdEdSQVBIX1ggPSAzICogUFIsIEdSQVBIX1kgPSAxNSAqIFBSLFxuXHRcdEdSQVBIX1dJRFRIID0gNzQgKiBQUiwgR1JBUEhfSEVJR0hUID0gMzAgKiBQUjtcblxuXHR2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2NhbnZhcycgKTtcblx0Y2FudmFzLndpZHRoID0gV0lEVEg7XG5cdGNhbnZhcy5oZWlnaHQgPSBIRUlHSFQ7XG5cdGNhbnZhcy5zdHlsZS5jc3NUZXh0ID0gJ3dpZHRoOjgwcHg7aGVpZ2h0OjQ4cHgnO1xuXG5cdHZhciBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoICcyZCcgKTtcblx0Y29udGV4dC5mb250ID0gJ2JvbGQgJyArICggOSAqIFBSICkgKyAncHggSGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWYnO1xuXHRjb250ZXh0LnRleHRCYXNlbGluZSA9ICd0b3AnO1xuXG5cdGNvbnRleHQuZmlsbFN0eWxlID0gYmc7XG5cdGNvbnRleHQuZmlsbFJlY3QoIDAsIDAsIFdJRFRILCBIRUlHSFQgKTtcblxuXHRjb250ZXh0LmZpbGxTdHlsZSA9IGZnO1xuXHRjb250ZXh0LmZpbGxUZXh0KCBuYW1lLCBURVhUX1gsIFRFWFRfWSApO1xuXHRjb250ZXh0LmZpbGxSZWN0KCBHUkFQSF9YLCBHUkFQSF9ZLCBHUkFQSF9XSURUSCwgR1JBUEhfSEVJR0hUICk7XG5cblx0Y29udGV4dC5maWxsU3R5bGUgPSBiZztcblx0Y29udGV4dC5nbG9iYWxBbHBoYSA9IDAuOTtcblx0Y29udGV4dC5maWxsUmVjdCggR1JBUEhfWCwgR1JBUEhfWSwgR1JBUEhfV0lEVEgsIEdSQVBIX0hFSUdIVCApO1xuXG5cdHJldHVybiB7XG5cblx0XHRkb206IGNhbnZhcyxcblxuXHRcdHVwZGF0ZTogZnVuY3Rpb24gKCB2YWx1ZSwgbWF4VmFsdWUgKSB7XG5cblx0XHRcdG1pbiA9IE1hdGgubWluKCBtaW4sIHZhbHVlICk7XG5cdFx0XHRtYXggPSBNYXRoLm1heCggbWF4LCB2YWx1ZSApO1xuXG5cdFx0XHRjb250ZXh0LmZpbGxTdHlsZSA9IGJnO1xuXHRcdFx0Y29udGV4dC5nbG9iYWxBbHBoYSA9IDE7XG5cdFx0XHRjb250ZXh0LmZpbGxSZWN0KCAwLCAwLCBXSURUSCwgR1JBUEhfWSApO1xuXHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSBmZztcblx0XHRcdGNvbnRleHQuZmlsbFRleHQoIHJvdW5kKCB2YWx1ZSApICsgJyAnICsgbmFtZSArICcgKCcgKyByb3VuZCggbWluICkgKyAnLScgKyByb3VuZCggbWF4ICkgKyAnKScsIFRFWFRfWCwgVEVYVF9ZICk7XG5cblx0XHRcdGNvbnRleHQuZHJhd0ltYWdlKCBjYW52YXMsIEdSQVBIX1ggKyBQUiwgR1JBUEhfWSwgR1JBUEhfV0lEVEggLSBQUiwgR1JBUEhfSEVJR0hULCBHUkFQSF9YLCBHUkFQSF9ZLCBHUkFQSF9XSURUSCAtIFBSLCBHUkFQSF9IRUlHSFQgKTtcblxuXHRcdFx0Y29udGV4dC5maWxsUmVjdCggR1JBUEhfWCArIEdSQVBIX1dJRFRIIC0gUFIsIEdSQVBIX1ksIFBSLCBHUkFQSF9IRUlHSFQgKTtcblxuXHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSBiZztcblx0XHRcdGNvbnRleHQuZ2xvYmFsQWxwaGEgPSAwLjk7XG5cdFx0XHRjb250ZXh0LmZpbGxSZWN0KCBHUkFQSF9YICsgR1JBUEhfV0lEVEggLSBQUiwgR1JBUEhfWSwgUFIsIHJvdW5kKCAoIDEgLSAoIHZhbHVlIC8gbWF4VmFsdWUgKSApICogR1JBUEhfSEVJR0hUICkgKTtcblxuXHRcdH1cblxuXHR9O1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTdGF0cztcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwic3BvdGxpZ2h0XCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2x0anNfZm91cnRoXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2x0anNfZm91cnRoXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9idWlsZF90aHJlZV9tb2R1bGVfanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9jb250cm9sc19PcmJpdENvbnRyb2xzX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc19saWwtZ3VpX2Rpc3RfbGlsLWd1aV9lc21fanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9sb2FkZXJzX0dMVEZMb2FkZXJfanNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItMy9zcG90bGlnaHQuanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
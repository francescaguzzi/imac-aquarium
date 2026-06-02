/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./samples/bootstrap/floor.js"
/*!************************************!*\
  !*** ./samples/bootstrap/floor.js ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   floatingFloor: () => (/* binding */ floatingFloor),
/* harmony export */   foreverPlane: () => (/* binding */ foreverPlane)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");


const foreverPlane = (scene) => {
  const geo = new three__WEBPACK_IMPORTED_MODULE_0__.PlaneBufferGeometry(10000, 10000)
  const mat = new three__WEBPACK_IMPORTED_MODULE_0__.MeshLambertMaterial({
    color: 0xffffff
  })
  const mesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(geo, mat)
  mesh.position.set(0, -2, 0)
  mesh.rotation.set(Math.PI / -2, 0, 0)
  mesh.receiveShadow = true
  mesh.name = 'forever-floor'
  scene.add(mesh)

  return mesh
}

const floatingFloor = (scene, size) => {
  const s = size ? size : 6
  const geo = new three__WEBPACK_IMPORTED_MODULE_0__.BoxBufferGeometry(s, 0.25, s, 10, 10, 10)
  const mat = new three__WEBPACK_IMPORTED_MODULE_0__.MeshStandardMaterial({
    color: 0xdddddd
  })
  const mesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(geo, mat)
  mesh.position.set(0, -2, -1)
  mesh.receiveShadow = true
  mesh.name = 'floating-floor'
  scene.add(mesh)

  return mesh
}


/***/ },

/***/ "./samples/chapters/chapter-11/custom-shader.js"
/*!******************************************************!*\
  !*** ./samples/chapters/chapter-11/custom-shader.js ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomBitShader: () => (/* binding */ CustomBitShader),
/* harmony export */   CustomGrayScaleShader: () => (/* binding */ CustomGrayScaleShader)
/* harmony export */ });
const CustomGrayScaleShader = {
  uniforms: {
    tDiffuse: { type: 't', value: null },
    rPower: { type: 'f', value: 0.2126 },
    gPower: { type: 'f', value: 0.7152 },
    bPower: { type: 'f', value: 0.0722 }
  },

  // 0.2126 R + 0.7152 G + 0.0722 B
  // vertexshader is always the same for postprocessing steps
  vertexShader: [
    'varying vec2 vUv;',

    'void main() {',

    'vUv = uv;',
    'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',

    '}'
  ].join('\n'),

  fragmentShader: [
    // pass in our custom uniforms
    'uniform float rPower;',
    'uniform float gPower;',
    'uniform float bPower;',

    // pass in the image/texture we'll be modifying
    'uniform sampler2D tDiffuse;',

    // used to determine the correct texel we're working on
    'varying vec2 vUv;',

    // executed, in parallel, for each pixel
    'void main() {',

    // get the pixel from the texture we're working with (called a texel)
    'vec4 texel = texture2D( tDiffuse, vUv );',

    // calculate the new color
    'float gray = texel.r*rPower + texel.g*gPower + texel.b*bPower;',

    // return this new color
    'gl_FragColor = vec4( vec3(gray), texel.w );',

    '}'
  ].join('\n')
}

const CustomBitShader = {
  uniforms: {
    tDiffuse: { type: 't', value: null },
    bitSize: { type: 'i', value: 4 }
  },

  vertexShader: [
    'varying vec2 vUv;',

    'void main() {',

    'vUv = uv;',
    'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',

    '}'
  ].join('\n'),

  fragmentShader: [
    'uniform int bitSize;',

    'uniform sampler2D tDiffuse;',

    'varying vec2 vUv;',

    'void main() {',

    'vec4 texel = texture2D( tDiffuse, vUv );',
    'float n = pow(float(bitSize),2.0);',
    'float newR = floor(texel.r*n)/n;',
    'float newG = floor(texel.g*n)/n;',
    'float newB = floor(texel.b*n)/n;',

    'gl_FragColor = vec4( vec3(newR,newG,newB), 1.0);',

    '}'
  ].join('\n')
}


/***/ },

/***/ "./samples/chapters/chapter-11/custom-shaders-scene.js"
/*!*************************************************************!*\
  !*** ./samples/chapters/chapter-11/custom-shaders-scene.js ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_standard_scene_mushroom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/standard-scene-mushroom */ "./samples/chapters/chapter-11/util/standard-scene-mushroom.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var three_examples_jsm_postprocessing_EffectComposer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/postprocessing/EffectComposer */ "./node_modules/three/examples/jsm/postprocessing/EffectComposer.js");
/* harmony import */ var three_examples_jsm_postprocessing_RenderPass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/jsm/postprocessing/RenderPass */ "./node_modules/three/examples/jsm/postprocessing/RenderPass.js");
/* harmony import */ var three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three/examples/jsm/postprocessing/ShaderPass */ "./node_modules/three/examples/jsm/postprocessing/ShaderPass.js");
/* harmony import */ var three_examples_jsm_shaders_CopyShader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! three/examples/jsm/shaders/CopyShader */ "./node_modules/three/examples/jsm/shaders/CopyShader.js");
/* harmony import */ var _util_pass_controls__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./util/pass-controls */ "./samples/chapters/chapter-11/util/pass-controls.js");
/* harmony import */ var _custom_shader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./custom-shader */ "./samples/chapters/chapter-11/custom-shader.js");
/* harmony import */ var three_examples_jsm_shaders_GammaCorrectionShader__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! three/examples/jsm/shaders/GammaCorrectionShader */ "./node_modules/three/examples/jsm/shaders/GammaCorrectionShader.js");













const effectCopy = new three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_4__.ShaderPass(three_examples_jsm_shaders_CopyShader__WEBPACK_IMPORTED_MODULE_5__.CopyShader)
effectCopy.renderToScreen = true
const grayScaleShader = new three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_4__.ShaderPass(_custom_shader__WEBPACK_IMPORTED_MODULE_7__.CustomGrayScaleShader)
const gammaCorrectionShader = new three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_4__.ShaderPass(three_examples_jsm_shaders_GammaCorrectionShader__WEBPACK_IMPORTED_MODULE_8__.GammaCorrectionShader)
const customBitShader = new three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_4__.ShaderPass(_custom_shader__WEBPACK_IMPORTED_MODULE_7__.CustomBitShader)

const setupComposer = (renderer, scene, camera) => {
  const composer = new three_examples_jsm_postprocessing_EffectComposer__WEBPACK_IMPORTED_MODULE_2__.EffectComposer(renderer)
  composer.addPass(new three_examples_jsm_postprocessing_RenderPass__WEBPACK_IMPORTED_MODULE_3__.RenderPass(scene, camera))
  composer.addPass(grayScaleShader)
  composer.addPass(customBitShader)
  composer.addPass(gammaCorrectionShader)
  composer.addPass(effectCopy)
  return composer
}

const animate = (renderer, composer) => {
  renderer.autoClear = false
  requestAnimationFrame(() => animate(renderer, composer))
  composer.render()
}

;(0,_util_standard_scene_mushroom__WEBPACK_IMPORTED_MODULE_0__.bootstrapMeshScene)({
  addControls: (camera, renderer, scene, gui) => {
    new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1__.OrbitControls(camera, renderer.domElement)
    ;(0,_util_pass_controls__WEBPACK_IMPORTED_MODULE_6__.addShaderControl)(gui, 'grayScaleShader', grayScaleShader, {
      floats: [
        { key: 'rPower', from: 0, to: 2, step: 0.01 },
        { key: 'gPower', from: 0, to: 2, step: 0.01 },
        { key: 'bPower', from: 0, to: 2, step: 0.01 }
      ]
    })
    ;(0,_util_pass_controls__WEBPACK_IMPORTED_MODULE_6__.addShaderControl)(gui, 'customBitShader', customBitShader, {
      floats: [{ key: 'bitSize', from: 1, to: 24, step: 1 }]
    })
    return gui
  },
  initializeComposer: (renderer, scene, camera) => setupComposer(renderer, scene, camera),
  animate: (renderer, composer, mixer, clock) => animate(renderer, composer, mixer, clock)
}).then()


/***/ },

/***/ "./samples/chapters/chapter-11/util/standard-scene-mushroom.js"
/*!*********************************************************************!*\
  !*** ./samples/chapters/chapter-11/util/standard-scene-mushroom.js ***!
  \*********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bootstrapMeshScene: () => (/* binding */ bootstrapMeshScene)
/* harmony export */ });
/* harmony import */ var _bootstrap_bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../bootstrap/bootstrap */ "./samples/bootstrap/bootstrap.js");
/* harmony import */ var _controls_renderer_control__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../controls/renderer-control */ "./samples/controls/renderer-control.js");
/* harmony import */ var lil_gui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lil-gui */ "./node_modules/lil-gui/dist/lil-gui.esm.js");
/* harmony import */ var _controls_scene_controls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../controls/scene-controls */ "./samples/controls/scene-controls.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _bootstrap_floor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../bootstrap/floor */ "./samples/bootstrap/floor.js");
/* harmony import */ var three_examples_jsm_loaders_GLTFLoader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! three/examples/jsm/loaders/GLTFLoader */ "./node_modules/three/examples/jsm/loaders/GLTFLoader.js");
/* harmony import */ var _util_modelUtil__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../util/modelUtil */ "./samples/util/modelUtil.js");
/* harmony import */ var _controls_animation_controls__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../controls/animation-controls */ "./samples/controls/animation-controls.js");











const bootstrapMeshScene = async ({
  provideGui,
  hidefloor,
  floorSize,
  backgroundColor,
  onRender,
  addControls,
  initializeComposer,
  animate
}) => {
  const props = {
    backgroundColor: backgroundColor ?? 0xffffff,
    disableDefaultControls: true
  }

  const clock = new three__WEBPACK_IMPORTED_MODULE_4__.Clock()
  const loader = new three_examples_jsm_loaders_GLTFLoader__WEBPACK_IMPORTED_MODULE_6__.GLTFLoader()
  const mesh = await loader.loadAsync('/assets/models/truffle_man/scene.gltf').then((container) => {
    container.scene.scale.setScalar(4)
    container.scene.translateY(-2)
    ;(0,_util_modelUtil__WEBPACK_IMPORTED_MODULE_7__.applyShadowsAndDepthWrite)(container.scene)
    container.scene.name = 'mushroom-man'
    return container.scene
  })

  const gui = new lil_gui__WEBPACK_IMPORTED_MODULE_2__["default"]()

  const init = async () => {
    ;(0,_bootstrap_bootstrap__WEBPACK_IMPORTED_MODULE_0__.initScene)(props)(({ scene, camera, renderer }) => {
      renderer.shadowMap.type = three__WEBPACK_IMPORTED_MODULE_4__.PCFSoftShadowMap
      camera.position.x = -3
      camera.position.z = 8
      camera.position.y = 2

      hidefloor ?? (0,_bootstrap_floor__WEBPACK_IMPORTED_MODULE_5__.floatingFloor)(scene, floorSize ?? 8)

      if (mesh) scene.add(mesh)

      ;(0,_controls_renderer_control__WEBPACK_IMPORTED_MODULE_1__.intializeRendererControls)(gui, renderer)
      ;(0,_controls_scene_controls__WEBPACK_IMPORTED_MODULE_3__.initializeSceneControls)(gui, scene, false)

      const composer = initializeComposer(renderer, scene, camera, mesh)

      if (provideGui) provideGui(gui, mesh, scene)
      if (addControls) {
        addControls(camera, renderer, scene, gui, mesh)
      }

      animate(renderer, composer, clock)
    })
  }

  init().then()
}


/***/ },

/***/ "./samples/controls/animation-controls.js"
/*!************************************************!*\
  !*** ./samples/controls/animation-controls.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initializeAnimationControls: () => (/* binding */ initializeAnimationControls)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");


const initializeAnimationControls = (mixer, action, clip, gui) => {
  const props = {
    repetitions: Infinity,
    // warp
    warpStartTimeScale: 1,
    warpEndTimeScale: 1,
    warpDurationInSeconds: 2,
    warp: function () {
      action.warp(props.warpStartTimeScale, props.warpEndTimeScale, props.warpDurationInSeconds)
    },
    fadeDurationInSeconds: 2,
    fadeIn: function () {
      action.fadeIn(props.fadeDurationInSeconds)
    },
    fadeOut: function () {
      action.fadeOut(props.fadeDurationInSeconds)
    }
  }

  const mixerFolder = gui.addFolder('AnimationMixer')
  mixerFolder.add(mixer, 'time').listen()
  mixerFolder.add(mixer, 'timeScale', 0, 5)
  mixerFolder.add(mixer, 'stopAllAction')

  const actionFolder = gui.addFolder('AnimationAction')

  actionFolder.add(action, 'clampWhenFinished').listen()
  actionFolder.add(action, 'enabled').listen()
  actionFolder.add(action, 'paused').listen()
  actionFolder
    .add(action, 'loop', {
      LoopRepeat: three__WEBPACK_IMPORTED_MODULE_0__.LoopRepeat,
      LoopOnce: three__WEBPACK_IMPORTED_MODULE_0__.LoopOnce,
      LoopPingPong: three__WEBPACK_IMPORTED_MODULE_0__.LoopPingPong
    })
    .onChange((e) => {
      if (e == three__WEBPACK_IMPORTED_MODULE_0__.LoopOnce || e == three__WEBPACK_IMPORTED_MODULE_0__.LoopPingPong) {
        action.reset()
        action.repetitions = undefined
        action.setLoop(parseInt(e), undefined)
      } else {
        action.setLoop(parseInt(e), action.repetitions)
      }
    })
  actionFolder
    .add(action, 'repetitions', 0, 100, 1)
    .listen()
    .onChange(function (e) {
      if (action.loop == three__WEBPACK_IMPORTED_MODULE_0__.LoopOnce || action.loop == three__WEBPACK_IMPORTED_MODULE_0__.LoopPingPong) {
        action.reset()
        action.repetitions = undefined
        action.setLoop(parseInt(action.loop), undefined)
      } else {
        action.setLoop(parseInt(e), action.repetitions)
      }
    })
  actionFolder.add(action, 'time', 0, clip.duration, 0.001).listen()
  actionFolder.add(action, 'timeScale', 0, 5, 0.1).listen()
  actionFolder.add(action, 'weight', 0, 1, 0.01).listen()
  actionFolder.add(action, 'zeroSlopeAtEnd').listen()
  actionFolder.add(action, 'zeroSlopeAtStart').listen()
  actionFolder.add(action, 'stop')
  actionFolder.add(action, 'play')
  actionFolder.add(action, 'reset')
  actionFolder.add(props, 'warpStartTimeScale', 0, 10, 0.01)
  actionFolder.add(props, 'warpEndTimeScale', 0, 10, 0.01)
  actionFolder.add(props, 'warpDurationInSeconds', 0, 10, 0.01)
  actionFolder.add(props, 'warp')
  actionFolder.add(props, 'fadeDurationInSeconds', 0, 10, 0.01)
  actionFolder.add(props, 'fadeIn')
  actionFolder.add(props, 'fadeOut')

  return {
    actionFolder,
    mixerFolder
  }
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

/***/ "./node_modules/three/examples/jsm/shaders/GammaCorrectionShader.js"
/*!**************************************************************************!*\
  !*** ./node_modules/three/examples/jsm/shaders/GammaCorrectionShader.js ***!
  \**************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GammaCorrectionShader: () => (/* binding */ GammaCorrectionShader)
/* harmony export */ });
/**
 * Gamma Correction Shader
 * http://en.wikipedia.org/wiki/gamma_correction
 */

const GammaCorrectionShader = {

	uniforms: {

		'tDiffuse': { value: null }

	},

	vertexShader: /* glsl */`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

	fragmentShader: /* glsl */`

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 tex = texture2D( tDiffuse, vUv );

			gl_FragColor = LinearTosRGB( tex );

		}`

};




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
/******/ 			"custom-shaders-scene": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","vendors-node_modules_three_examples_jsm_loaders_GLTFLoader_js","vendors-node_modules_three_examples_jsm_postprocessing_EffectComposer_js-node_modules_three_e-dd9777","vendors-node_modules_three_examples_jsm_postprocessing_UnrealBloomPass_js","vendors-node_modules_three_examples_jsm_postprocessing_BloomPass_js-node_modules_three_exampl-9bde57","samples_bootstrap_bootstrap_js-samples_chapters_chapter-11_util_pass-controls_js-samples_cont-b2fed1"], () => (__webpack_require__("./samples/chapters/chapter-11/custom-shaders-scene.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvY3VzdG9tLXNoYWRlcnMtc2NlbmUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUE4Qjs7QUFFdkI7QUFDUCxrQkFBa0Isc0RBQXlCO0FBQzNDLGtCQUFrQixzREFBeUI7QUFDM0M7QUFDQSxHQUFHO0FBQ0gsbUJBQW1CLHVDQUFVO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFTztBQUNQO0FBQ0Esa0JBQWtCLG9EQUF1QjtBQUN6QyxrQkFBa0IsdURBQTBCO0FBQzVDO0FBQ0EsR0FBRztBQUNILG1CQUFtQix1Q0FBVTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDOUJPO0FBQ1A7QUFDQSxnQkFBZ0Isd0JBQXdCO0FBQ3hDLGNBQWMsMEJBQTBCO0FBQ3hDLGNBQWMsMEJBQTBCO0FBQ3hDLGNBQWM7QUFDZCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjs7QUFFdEIsa0JBQWtCOztBQUVsQixjQUFjO0FBQ2QsOEVBQThFOztBQUU5RSxNQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQiwwQkFBMEI7QUFDMUIsMEJBQTBCOztBQUUxQjtBQUNBLGdDQUFnQzs7QUFFaEM7QUFDQSxzQkFBc0I7O0FBRXRCO0FBQ0Esa0JBQWtCOztBQUVsQjtBQUNBLDZDQUE2Qzs7QUFFN0M7QUFDQSxtRUFBbUU7O0FBRW5FO0FBQ0EsZ0RBQWdEOztBQUVoRCxNQUFNO0FBQ047QUFDQTs7QUFFTztBQUNQO0FBQ0EsZ0JBQWdCLHdCQUF3QjtBQUN4QyxlQUFlO0FBQ2YsR0FBRzs7QUFFSDtBQUNBLHNCQUFzQjs7QUFFdEIsa0JBQWtCOztBQUVsQixjQUFjO0FBQ2QsOEVBQThFOztBQUU5RSxNQUFNO0FBQ047O0FBRUE7QUFDQSx5QkFBeUI7O0FBRXpCLGdDQUFnQzs7QUFFaEMsc0JBQXNCOztBQUV0QixrQkFBa0I7O0FBRWxCLDZDQUE2QztBQUM3Qyx1Q0FBdUM7QUFDdkMscUNBQXFDO0FBQ3JDLHFDQUFxQztBQUNyQyxxQ0FBcUM7O0FBRXJDLHFEQUFxRDs7QUFFckQsTUFBTTtBQUNOO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JGbUU7QUFDTTs7QUFFUTtBQUNSO0FBQ0E7O0FBRVA7O0FBRVg7QUFDaUI7QUFDZ0I7O0FBRXhGLHVCQUF1QixvRkFBVSxDQUFDLDZFQUFVO0FBQzVDO0FBQ0EsNEJBQTRCLG9GQUFVLENBQUMsaUVBQXFCO0FBQzVELGtDQUFrQyxvRkFBVSxDQUFDLG1HQUFxQjtBQUNsRSw0QkFBNEIsb0ZBQVUsQ0FBQywyREFBZTs7QUFFdEQ7QUFDQSx1QkFBdUIsNEZBQWM7QUFDckMsdUJBQXVCLG9GQUFVO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtGQUFrQjtBQUNsQjtBQUNBLFFBQVEsb0ZBQWE7QUFDckIsSUFBSSxzRUFBZ0I7QUFDcEI7QUFDQSxVQUFVLDJDQUEyQztBQUNyRCxVQUFVLDJDQUEyQztBQUNyRCxVQUFVO0FBQ1Y7QUFDQSxLQUFLO0FBQ0wsSUFBSSxzRUFBZ0I7QUFDcEIsaUJBQWlCLDBDQUEwQztBQUMzRCxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BEdUQ7QUFDc0I7O0FBRXJEO0FBQ2lEO0FBQzVDO0FBQzBCO0FBQ1U7QUFDQztBQUNlOztBQUUzRTtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLHdDQUFXO0FBQy9CLHFCQUFxQiw2RUFBVTtBQUMvQjtBQUNBO0FBQ0E7QUFDQSxJQUFJLDJFQUF5QjtBQUM3QjtBQUNBO0FBQ0EsR0FBRzs7QUFFSCxrQkFBa0IsK0NBQUc7O0FBRXJCO0FBQ0EsSUFBSSxnRUFBUyxXQUFXLHlCQUF5QjtBQUNqRCxnQ0FBZ0MsbURBQXNCO0FBQ3REO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsK0RBQWE7O0FBRWhDOztBQUVBLE1BQU0sc0ZBQXlCO0FBQy9CLE1BQU0sa0ZBQXVCOztBQUU3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDaEU4Qjs7QUFFdkI7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLDZDQUFnQjtBQUNsQyxnQkFBZ0IsMkNBQWM7QUFDOUIsb0JBQW9CLCtDQUFrQjtBQUN0QyxLQUFLO0FBQ0w7QUFDQSxlQUFlLDJDQUFjLFNBQVMsK0NBQWtCO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLDJDQUFjLG1CQUFtQiwrQ0FBa0I7QUFDNUU7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxnQkFBZ0I7O0FBRWhCLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRWlDOzs7Ozs7O1VDeENqQztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOztVQUVBO1VBQ0E7Ozs7O1dDL0JBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsK0JBQStCLHdDQUF3QztXQUN2RTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlCQUFpQixxQkFBcUI7V0FDdEM7V0FDQTtXQUNBLGtCQUFrQixxQkFBcUI7V0FDdkM7V0FDQTtXQUNBLEtBQUs7V0FDTDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRTs7Ozs7V0MzQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQSw0Rzs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9ib290c3RyYXAvZmxvb3IuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItMTEvY3VzdG9tLXNoYWRlci5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci0xMS9jdXN0b20tc2hhZGVycy1zY2VuZS5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci0xMS91dGlsL3N0YW5kYXJkLXNjZW5lLW11c2hyb29tLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jb250cm9scy9hbmltYXRpb24tY29udHJvbHMuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL3V0aWwvbW9kZWxVdGlsLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vbm9kZV9tb2R1bGVzL3RocmVlL2V4YW1wbGVzL2pzbS9zaGFkZXJzL0dhbW1hQ29ycmVjdGlvblNoYWRlci5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuXG5leHBvcnQgY29uc3QgZm9yZXZlclBsYW5lID0gKHNjZW5lKSA9PiB7XG4gIGNvbnN0IGdlbyA9IG5ldyBUSFJFRS5QbGFuZUJ1ZmZlckdlb21ldHJ5KDEwMDAwLCAxMDAwMClcbiAgY29uc3QgbWF0ID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoe1xuICAgIGNvbG9yOiAweGZmZmZmZlxuICB9KVxuICBjb25zdCBtZXNoID0gbmV3IFRIUkVFLk1lc2goZ2VvLCBtYXQpXG4gIG1lc2gucG9zaXRpb24uc2V0KDAsIC0yLCAwKVxuICBtZXNoLnJvdGF0aW9uLnNldChNYXRoLlBJIC8gLTIsIDAsIDApXG4gIG1lc2gucmVjZWl2ZVNoYWRvdyA9IHRydWVcbiAgbWVzaC5uYW1lID0gJ2ZvcmV2ZXItZmxvb3InXG4gIHNjZW5lLmFkZChtZXNoKVxuXG4gIHJldHVybiBtZXNoXG59XG5cbmV4cG9ydCBjb25zdCBmbG9hdGluZ0Zsb29yID0gKHNjZW5lLCBzaXplKSA9PiB7XG4gIGNvbnN0IHMgPSBzaXplID8gc2l6ZSA6IDZcbiAgY29uc3QgZ2VvID0gbmV3IFRIUkVFLkJveEJ1ZmZlckdlb21ldHJ5KHMsIDAuMjUsIHMsIDEwLCAxMCwgMTApXG4gIGNvbnN0IG1hdCA9IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7XG4gICAgY29sb3I6IDB4ZGRkZGRkXG4gIH0pXG4gIGNvbnN0IG1lc2ggPSBuZXcgVEhSRUUuTWVzaChnZW8sIG1hdClcbiAgbWVzaC5wb3NpdGlvbi5zZXQoMCwgLTIsIC0xKVxuICBtZXNoLnJlY2VpdmVTaGFkb3cgPSB0cnVlXG4gIG1lc2gubmFtZSA9ICdmbG9hdGluZy1mbG9vcidcbiAgc2NlbmUuYWRkKG1lc2gpXG5cbiAgcmV0dXJuIG1lc2hcbn1cbiIsImV4cG9ydCBjb25zdCBDdXN0b21HcmF5U2NhbGVTaGFkZXIgPSB7XG4gIHVuaWZvcm1zOiB7XG4gICAgdERpZmZ1c2U6IHsgdHlwZTogJ3QnLCB2YWx1ZTogbnVsbCB9LFxuICAgIHJQb3dlcjogeyB0eXBlOiAnZicsIHZhbHVlOiAwLjIxMjYgfSxcbiAgICBnUG93ZXI6IHsgdHlwZTogJ2YnLCB2YWx1ZTogMC43MTUyIH0sXG4gICAgYlBvd2VyOiB7IHR5cGU6ICdmJywgdmFsdWU6IDAuMDcyMiB9XG4gIH0sXG5cbiAgLy8gMC4yMTI2IFIgKyAwLjcxNTIgRyArIDAuMDcyMiBCXG4gIC8vIHZlcnRleHNoYWRlciBpcyBhbHdheXMgdGhlIHNhbWUgZm9yIHBvc3Rwcm9jZXNzaW5nIHN0ZXBzXG4gIHZlcnRleFNoYWRlcjogW1xuICAgICd2YXJ5aW5nIHZlYzIgdlV2OycsXG5cbiAgICAndm9pZCBtYWluKCkgeycsXG5cbiAgICAndlV2ID0gdXY7JyxcbiAgICAnZ2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogbW9kZWxWaWV3TWF0cml4ICogdmVjNCggcG9zaXRpb24sIDEuMCApOycsXG5cbiAgICAnfSdcbiAgXS5qb2luKCdcXG4nKSxcblxuICBmcmFnbWVudFNoYWRlcjogW1xuICAgIC8vIHBhc3MgaW4gb3VyIGN1c3RvbSB1bmlmb3Jtc1xuICAgICd1bmlmb3JtIGZsb2F0IHJQb3dlcjsnLFxuICAgICd1bmlmb3JtIGZsb2F0IGdQb3dlcjsnLFxuICAgICd1bmlmb3JtIGZsb2F0IGJQb3dlcjsnLFxuXG4gICAgLy8gcGFzcyBpbiB0aGUgaW1hZ2UvdGV4dHVyZSB3ZSdsbCBiZSBtb2RpZnlpbmdcbiAgICAndW5pZm9ybSBzYW1wbGVyMkQgdERpZmZ1c2U7JyxcblxuICAgIC8vIHVzZWQgdG8gZGV0ZXJtaW5lIHRoZSBjb3JyZWN0IHRleGVsIHdlJ3JlIHdvcmtpbmcgb25cbiAgICAndmFyeWluZyB2ZWMyIHZVdjsnLFxuXG4gICAgLy8gZXhlY3V0ZWQsIGluIHBhcmFsbGVsLCBmb3IgZWFjaCBwaXhlbFxuICAgICd2b2lkIG1haW4oKSB7JyxcblxuICAgIC8vIGdldCB0aGUgcGl4ZWwgZnJvbSB0aGUgdGV4dHVyZSB3ZSdyZSB3b3JraW5nIHdpdGggKGNhbGxlZCBhIHRleGVsKVxuICAgICd2ZWM0IHRleGVsID0gdGV4dHVyZTJEKCB0RGlmZnVzZSwgdlV2ICk7JyxcblxuICAgIC8vIGNhbGN1bGF0ZSB0aGUgbmV3IGNvbG9yXG4gICAgJ2Zsb2F0IGdyYXkgPSB0ZXhlbC5yKnJQb3dlciArIHRleGVsLmcqZ1Bvd2VyICsgdGV4ZWwuYipiUG93ZXI7JyxcblxuICAgIC8vIHJldHVybiB0aGlzIG5ldyBjb2xvclxuICAgICdnbF9GcmFnQ29sb3IgPSB2ZWM0KCB2ZWMzKGdyYXkpLCB0ZXhlbC53ICk7JyxcblxuICAgICd9J1xuICBdLmpvaW4oJ1xcbicpXG59XG5cbmV4cG9ydCBjb25zdCBDdXN0b21CaXRTaGFkZXIgPSB7XG4gIHVuaWZvcm1zOiB7XG4gICAgdERpZmZ1c2U6IHsgdHlwZTogJ3QnLCB2YWx1ZTogbnVsbCB9LFxuICAgIGJpdFNpemU6IHsgdHlwZTogJ2knLCB2YWx1ZTogNCB9XG4gIH0sXG5cbiAgdmVydGV4U2hhZGVyOiBbXG4gICAgJ3ZhcnlpbmcgdmVjMiB2VXY7JyxcblxuICAgICd2b2lkIG1haW4oKSB7JyxcblxuICAgICd2VXYgPSB1djsnLFxuICAgICdnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiBtb2RlbFZpZXdNYXRyaXggKiB2ZWM0KCBwb3NpdGlvbiwgMS4wICk7JyxcblxuICAgICd9J1xuICBdLmpvaW4oJ1xcbicpLFxuXG4gIGZyYWdtZW50U2hhZGVyOiBbXG4gICAgJ3VuaWZvcm0gaW50IGJpdFNpemU7JyxcblxuICAgICd1bmlmb3JtIHNhbXBsZXIyRCB0RGlmZnVzZTsnLFxuXG4gICAgJ3ZhcnlpbmcgdmVjMiB2VXY7JyxcblxuICAgICd2b2lkIG1haW4oKSB7JyxcblxuICAgICd2ZWM0IHRleGVsID0gdGV4dHVyZTJEKCB0RGlmZnVzZSwgdlV2ICk7JyxcbiAgICAnZmxvYXQgbiA9IHBvdyhmbG9hdChiaXRTaXplKSwyLjApOycsXG4gICAgJ2Zsb2F0IG5ld1IgPSBmbG9vcih0ZXhlbC5yKm4pL247JyxcbiAgICAnZmxvYXQgbmV3RyA9IGZsb29yKHRleGVsLmcqbikvbjsnLFxuICAgICdmbG9hdCBuZXdCID0gZmxvb3IodGV4ZWwuYipuKS9uOycsXG5cbiAgICAnZ2xfRnJhZ0NvbG9yID0gdmVjNCggdmVjMyhuZXdSLG5ld0csbmV3QiksIDEuMCk7JyxcblxuICAgICd9J1xuICBdLmpvaW4oJ1xcbicpXG59XG4iLCJpbXBvcnQgeyBib290c3RyYXBNZXNoU2NlbmUgfSBmcm9tICcuL3V0aWwvc3RhbmRhcmQtc2NlbmUtbXVzaHJvb20nXG5pbXBvcnQgeyBPcmJpdENvbnRyb2xzIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2NvbnRyb2xzL09yYml0Q29udHJvbHMnXG5cbmltcG9ydCB7IEVmZmVjdENvbXBvc2VyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL3Bvc3Rwcm9jZXNzaW5nL0VmZmVjdENvbXBvc2VyJ1xuaW1wb3J0IHsgUmVuZGVyUGFzcyB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9wb3N0cHJvY2Vzc2luZy9SZW5kZXJQYXNzJ1xuaW1wb3J0IHsgU2hhZGVyUGFzcyB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9wb3N0cHJvY2Vzc2luZy9TaGFkZXJQYXNzJ1xuXG5pbXBvcnQgeyBDb3B5U2hhZGVyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL3NoYWRlcnMvQ29weVNoYWRlcidcblxuaW1wb3J0IHsgYWRkU2hhZGVyQ29udHJvbCB9IGZyb20gJy4vdXRpbC9wYXNzLWNvbnRyb2xzJ1xuaW1wb3J0IHsgQ3VzdG9tQml0U2hhZGVyLCBDdXN0b21HcmF5U2NhbGVTaGFkZXIgfSBmcm9tICcuL2N1c3RvbS1zaGFkZXInXG5pbXBvcnQgeyBHYW1tYUNvcnJlY3Rpb25TaGFkZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vc2hhZGVycy9HYW1tYUNvcnJlY3Rpb25TaGFkZXInXG5cbmNvbnN0IGVmZmVjdENvcHkgPSBuZXcgU2hhZGVyUGFzcyhDb3B5U2hhZGVyKVxuZWZmZWN0Q29weS5yZW5kZXJUb1NjcmVlbiA9IHRydWVcbmNvbnN0IGdyYXlTY2FsZVNoYWRlciA9IG5ldyBTaGFkZXJQYXNzKEN1c3RvbUdyYXlTY2FsZVNoYWRlcilcbmNvbnN0IGdhbW1hQ29ycmVjdGlvblNoYWRlciA9IG5ldyBTaGFkZXJQYXNzKEdhbW1hQ29ycmVjdGlvblNoYWRlcilcbmNvbnN0IGN1c3RvbUJpdFNoYWRlciA9IG5ldyBTaGFkZXJQYXNzKEN1c3RvbUJpdFNoYWRlcilcblxuY29uc3Qgc2V0dXBDb21wb3NlciA9IChyZW5kZXJlciwgc2NlbmUsIGNhbWVyYSkgPT4ge1xuICBjb25zdCBjb21wb3NlciA9IG5ldyBFZmZlY3RDb21wb3NlcihyZW5kZXJlcilcbiAgY29tcG9zZXIuYWRkUGFzcyhuZXcgUmVuZGVyUGFzcyhzY2VuZSwgY2FtZXJhKSlcbiAgY29tcG9zZXIuYWRkUGFzcyhncmF5U2NhbGVTaGFkZXIpXG4gIGNvbXBvc2VyLmFkZFBhc3MoY3VzdG9tQml0U2hhZGVyKVxuICBjb21wb3Nlci5hZGRQYXNzKGdhbW1hQ29ycmVjdGlvblNoYWRlcilcbiAgY29tcG9zZXIuYWRkUGFzcyhlZmZlY3RDb3B5KVxuICByZXR1cm4gY29tcG9zZXJcbn1cblxuY29uc3QgYW5pbWF0ZSA9IChyZW5kZXJlciwgY29tcG9zZXIpID0+IHtcbiAgcmVuZGVyZXIuYXV0b0NsZWFyID0gZmFsc2VcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IGFuaW1hdGUocmVuZGVyZXIsIGNvbXBvc2VyKSlcbiAgY29tcG9zZXIucmVuZGVyKClcbn1cblxuYm9vdHN0cmFwTWVzaFNjZW5lKHtcbiAgYWRkQ29udHJvbHM6IChjYW1lcmEsIHJlbmRlcmVyLCBzY2VuZSwgZ3VpKSA9PiB7XG4gICAgbmV3IE9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlci5kb21FbGVtZW50KVxuICAgIGFkZFNoYWRlckNvbnRyb2woZ3VpLCAnZ3JheVNjYWxlU2hhZGVyJywgZ3JheVNjYWxlU2hhZGVyLCB7XG4gICAgICBmbG9hdHM6IFtcbiAgICAgICAgeyBrZXk6ICdyUG93ZXInLCBmcm9tOiAwLCB0bzogMiwgc3RlcDogMC4wMSB9LFxuICAgICAgICB7IGtleTogJ2dQb3dlcicsIGZyb206IDAsIHRvOiAyLCBzdGVwOiAwLjAxIH0sXG4gICAgICAgIHsga2V5OiAnYlBvd2VyJywgZnJvbTogMCwgdG86IDIsIHN0ZXA6IDAuMDEgfVxuICAgICAgXVxuICAgIH0pXG4gICAgYWRkU2hhZGVyQ29udHJvbChndWksICdjdXN0b21CaXRTaGFkZXInLCBjdXN0b21CaXRTaGFkZXIsIHtcbiAgICAgIGZsb2F0czogW3sga2V5OiAnYml0U2l6ZScsIGZyb206IDEsIHRvOiAyNCwgc3RlcDogMSB9XVxuICAgIH0pXG4gICAgcmV0dXJuIGd1aVxuICB9LFxuICBpbml0aWFsaXplQ29tcG9zZXI6IChyZW5kZXJlciwgc2NlbmUsIGNhbWVyYSkgPT4gc2V0dXBDb21wb3NlcihyZW5kZXJlciwgc2NlbmUsIGNhbWVyYSksXG4gIGFuaW1hdGU6IChyZW5kZXJlciwgY29tcG9zZXIsIG1peGVyLCBjbG9jaykgPT4gYW5pbWF0ZShyZW5kZXJlciwgY29tcG9zZXIsIG1peGVyLCBjbG9jaylcbn0pLnRoZW4oKVxuIiwiaW1wb3J0IHsgaW5pdFNjZW5lIH0gZnJvbSAnLi4vLi4vLi4vYm9vdHN0cmFwL2Jvb3RzdHJhcCdcbmltcG9ydCB7IGludGlhbGl6ZVJlbmRlcmVyQ29udHJvbHMgfSBmcm9tICcuLi8uLi8uLi9jb250cm9scy9yZW5kZXJlci1jb250cm9sJ1xuXG5pbXBvcnQgR1VJIGZyb20gJ2xpbC1ndWknXG5pbXBvcnQgeyBpbml0aWFsaXplU2NlbmVDb250cm9scyB9IGZyb20gJy4uLy4uLy4uL2NvbnRyb2xzL3NjZW5lLWNvbnRyb2xzJ1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5pbXBvcnQgeyBmbG9hdGluZ0Zsb29yIH0gZnJvbSAnLi4vLi4vLi4vYm9vdHN0cmFwL2Zsb29yJ1xuaW1wb3J0IHsgR0xURkxvYWRlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXInXG5pbXBvcnQgeyBhcHBseVNoYWRvd3NBbmREZXB0aFdyaXRlIH0gZnJvbSAnLi4vLi4vLi4vdXRpbC9tb2RlbFV0aWwnXG5pbXBvcnQgeyBpbml0aWFsaXplQW5pbWF0aW9uQ29udHJvbHMgfSBmcm9tICcuLi8uLi8uLi9jb250cm9scy9hbmltYXRpb24tY29udHJvbHMnXG5cbmV4cG9ydCBjb25zdCBib290c3RyYXBNZXNoU2NlbmUgPSBhc3luYyAoe1xuICBwcm92aWRlR3VpLFxuICBoaWRlZmxvb3IsXG4gIGZsb29yU2l6ZSxcbiAgYmFja2dyb3VuZENvbG9yLFxuICBvblJlbmRlcixcbiAgYWRkQ29udHJvbHMsXG4gIGluaXRpYWxpemVDb21wb3NlcixcbiAgYW5pbWF0ZVxufSkgPT4ge1xuICBjb25zdCBwcm9wcyA9IHtcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IGJhY2tncm91bmRDb2xvciA/PyAweGZmZmZmZixcbiAgICBkaXNhYmxlRGVmYXVsdENvbnRyb2xzOiB0cnVlXG4gIH1cblxuICBjb25zdCBjbG9jayA9IG5ldyBUSFJFRS5DbG9jaygpXG4gIGNvbnN0IGxvYWRlciA9IG5ldyBHTFRGTG9hZGVyKClcbiAgY29uc3QgbWVzaCA9IGF3YWl0IGxvYWRlci5sb2FkQXN5bmMoJy9hc3NldHMvbW9kZWxzL3RydWZmbGVfbWFuL3NjZW5lLmdsdGYnKS50aGVuKChjb250YWluZXIpID0+IHtcbiAgICBjb250YWluZXIuc2NlbmUuc2NhbGUuc2V0U2NhbGFyKDQpXG4gICAgY29udGFpbmVyLnNjZW5lLnRyYW5zbGF0ZVkoLTIpXG4gICAgYXBwbHlTaGFkb3dzQW5kRGVwdGhXcml0ZShjb250YWluZXIuc2NlbmUpXG4gICAgY29udGFpbmVyLnNjZW5lLm5hbWUgPSAnbXVzaHJvb20tbWFuJ1xuICAgIHJldHVybiBjb250YWluZXIuc2NlbmVcbiAgfSlcblxuICBjb25zdCBndWkgPSBuZXcgR1VJKClcblxuICBjb25zdCBpbml0ID0gYXN5bmMgKCkgPT4ge1xuICAgIGluaXRTY2VuZShwcm9wcykoKHsgc2NlbmUsIGNhbWVyYSwgcmVuZGVyZXIgfSkgPT4ge1xuICAgICAgcmVuZGVyZXIuc2hhZG93TWFwLnR5cGUgPSBUSFJFRS5QQ0ZTb2Z0U2hhZG93TWFwXG4gICAgICBjYW1lcmEucG9zaXRpb24ueCA9IC0zXG4gICAgICBjYW1lcmEucG9zaXRpb24ueiA9IDhcbiAgICAgIGNhbWVyYS5wb3NpdGlvbi55ID0gMlxuXG4gICAgICBoaWRlZmxvb3IgPz8gZmxvYXRpbmdGbG9vcihzY2VuZSwgZmxvb3JTaXplID8/IDgpXG5cbiAgICAgIGlmIChtZXNoKSBzY2VuZS5hZGQobWVzaClcblxuICAgICAgaW50aWFsaXplUmVuZGVyZXJDb250cm9scyhndWksIHJlbmRlcmVyKVxuICAgICAgaW5pdGlhbGl6ZVNjZW5lQ29udHJvbHMoZ3VpLCBzY2VuZSwgZmFsc2UpXG5cbiAgICAgIGNvbnN0IGNvbXBvc2VyID0gaW5pdGlhbGl6ZUNvbXBvc2VyKHJlbmRlcmVyLCBzY2VuZSwgY2FtZXJhLCBtZXNoKVxuXG4gICAgICBpZiAocHJvdmlkZUd1aSkgcHJvdmlkZUd1aShndWksIG1lc2gsIHNjZW5lKVxuICAgICAgaWYgKGFkZENvbnRyb2xzKSB7XG4gICAgICAgIGFkZENvbnRyb2xzKGNhbWVyYSwgcmVuZGVyZXIsIHNjZW5lLCBndWksIG1lc2gpXG4gICAgICB9XG5cbiAgICAgIGFuaW1hdGUocmVuZGVyZXIsIGNvbXBvc2VyLCBjbG9jaylcbiAgICB9KVxuICB9XG5cbiAgaW5pdCgpLnRoZW4oKVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5cbmV4cG9ydCBjb25zdCBpbml0aWFsaXplQW5pbWF0aW9uQ29udHJvbHMgPSAobWl4ZXIsIGFjdGlvbiwgY2xpcCwgZ3VpKSA9PiB7XG4gIGNvbnN0IHByb3BzID0ge1xuICAgIHJlcGV0aXRpb25zOiBJbmZpbml0eSxcbiAgICAvLyB3YXJwXG4gICAgd2FycFN0YXJ0VGltZVNjYWxlOiAxLFxuICAgIHdhcnBFbmRUaW1lU2NhbGU6IDEsXG4gICAgd2FycER1cmF0aW9uSW5TZWNvbmRzOiAyLFxuICAgIHdhcnA6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGFjdGlvbi53YXJwKHByb3BzLndhcnBTdGFydFRpbWVTY2FsZSwgcHJvcHMud2FycEVuZFRpbWVTY2FsZSwgcHJvcHMud2FycER1cmF0aW9uSW5TZWNvbmRzKVxuICAgIH0sXG4gICAgZmFkZUR1cmF0aW9uSW5TZWNvbmRzOiAyLFxuICAgIGZhZGVJbjogZnVuY3Rpb24gKCkge1xuICAgICAgYWN0aW9uLmZhZGVJbihwcm9wcy5mYWRlRHVyYXRpb25JblNlY29uZHMpXG4gICAgfSxcbiAgICBmYWRlT3V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICBhY3Rpb24uZmFkZU91dChwcm9wcy5mYWRlRHVyYXRpb25JblNlY29uZHMpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgbWl4ZXJGb2xkZXIgPSBndWkuYWRkRm9sZGVyKCdBbmltYXRpb25NaXhlcicpXG4gIG1peGVyRm9sZGVyLmFkZChtaXhlciwgJ3RpbWUnKS5saXN0ZW4oKVxuICBtaXhlckZvbGRlci5hZGQobWl4ZXIsICd0aW1lU2NhbGUnLCAwLCA1KVxuICBtaXhlckZvbGRlci5hZGQobWl4ZXIsICdzdG9wQWxsQWN0aW9uJylcblxuICBjb25zdCBhY3Rpb25Gb2xkZXIgPSBndWkuYWRkRm9sZGVyKCdBbmltYXRpb25BY3Rpb24nKVxuXG4gIGFjdGlvbkZvbGRlci5hZGQoYWN0aW9uLCAnY2xhbXBXaGVuRmluaXNoZWQnKS5saXN0ZW4oKVxuICBhY3Rpb25Gb2xkZXIuYWRkKGFjdGlvbiwgJ2VuYWJsZWQnKS5saXN0ZW4oKVxuICBhY3Rpb25Gb2xkZXIuYWRkKGFjdGlvbiwgJ3BhdXNlZCcpLmxpc3RlbigpXG4gIGFjdGlvbkZvbGRlclxuICAgIC5hZGQoYWN0aW9uLCAnbG9vcCcsIHtcbiAgICAgIExvb3BSZXBlYXQ6IFRIUkVFLkxvb3BSZXBlYXQsXG4gICAgICBMb29wT25jZTogVEhSRUUuTG9vcE9uY2UsXG4gICAgICBMb29wUGluZ1Bvbmc6IFRIUkVFLkxvb3BQaW5nUG9uZ1xuICAgIH0pXG4gICAgLm9uQ2hhbmdlKChlKSA9PiB7XG4gICAgICBpZiAoZSA9PSBUSFJFRS5Mb29wT25jZSB8fCBlID09IFRIUkVFLkxvb3BQaW5nUG9uZykge1xuICAgICAgICBhY3Rpb24ucmVzZXQoKVxuICAgICAgICBhY3Rpb24ucmVwZXRpdGlvbnMgPSB1bmRlZmluZWRcbiAgICAgICAgYWN0aW9uLnNldExvb3AocGFyc2VJbnQoZSksIHVuZGVmaW5lZClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFjdGlvbi5zZXRMb29wKHBhcnNlSW50KGUpLCBhY3Rpb24ucmVwZXRpdGlvbnMpXG4gICAgICB9XG4gICAgfSlcbiAgYWN0aW9uRm9sZGVyXG4gICAgLmFkZChhY3Rpb24sICdyZXBldGl0aW9ucycsIDAsIDEwMCwgMSlcbiAgICAubGlzdGVuKClcbiAgICAub25DaGFuZ2UoZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmIChhY3Rpb24ubG9vcCA9PSBUSFJFRS5Mb29wT25jZSB8fCBhY3Rpb24ubG9vcCA9PSBUSFJFRS5Mb29wUGluZ1BvbmcpIHtcbiAgICAgICAgYWN0aW9uLnJlc2V0KClcbiAgICAgICAgYWN0aW9uLnJlcGV0aXRpb25zID0gdW5kZWZpbmVkXG4gICAgICAgIGFjdGlvbi5zZXRMb29wKHBhcnNlSW50KGFjdGlvbi5sb29wKSwgdW5kZWZpbmVkKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWN0aW9uLnNldExvb3AocGFyc2VJbnQoZSksIGFjdGlvbi5yZXBldGl0aW9ucylcbiAgICAgIH1cbiAgICB9KVxuICBhY3Rpb25Gb2xkZXIuYWRkKGFjdGlvbiwgJ3RpbWUnLCAwLCBjbGlwLmR1cmF0aW9uLCAwLjAwMSkubGlzdGVuKClcbiAgYWN0aW9uRm9sZGVyLmFkZChhY3Rpb24sICd0aW1lU2NhbGUnLCAwLCA1LCAwLjEpLmxpc3RlbigpXG4gIGFjdGlvbkZvbGRlci5hZGQoYWN0aW9uLCAnd2VpZ2h0JywgMCwgMSwgMC4wMSkubGlzdGVuKClcbiAgYWN0aW9uRm9sZGVyLmFkZChhY3Rpb24sICd6ZXJvU2xvcGVBdEVuZCcpLmxpc3RlbigpXG4gIGFjdGlvbkZvbGRlci5hZGQoYWN0aW9uLCAnemVyb1Nsb3BlQXRTdGFydCcpLmxpc3RlbigpXG4gIGFjdGlvbkZvbGRlci5hZGQoYWN0aW9uLCAnc3RvcCcpXG4gIGFjdGlvbkZvbGRlci5hZGQoYWN0aW9uLCAncGxheScpXG4gIGFjdGlvbkZvbGRlci5hZGQoYWN0aW9uLCAncmVzZXQnKVxuICBhY3Rpb25Gb2xkZXIuYWRkKHByb3BzLCAnd2FycFN0YXJ0VGltZVNjYWxlJywgMCwgMTAsIDAuMDEpXG4gIGFjdGlvbkZvbGRlci5hZGQocHJvcHMsICd3YXJwRW5kVGltZVNjYWxlJywgMCwgMTAsIDAuMDEpXG4gIGFjdGlvbkZvbGRlci5hZGQocHJvcHMsICd3YXJwRHVyYXRpb25JblNlY29uZHMnLCAwLCAxMCwgMC4wMSlcbiAgYWN0aW9uRm9sZGVyLmFkZChwcm9wcywgJ3dhcnAnKVxuICBhY3Rpb25Gb2xkZXIuYWRkKHByb3BzLCAnZmFkZUR1cmF0aW9uSW5TZWNvbmRzJywgMCwgMTAsIDAuMDEpXG4gIGFjdGlvbkZvbGRlci5hZGQocHJvcHMsICdmYWRlSW4nKVxuICBhY3Rpb25Gb2xkZXIuYWRkKHByb3BzLCAnZmFkZU91dCcpXG5cbiAgcmV0dXJuIHtcbiAgICBhY3Rpb25Gb2xkZXIsXG4gICAgbWl4ZXJGb2xkZXJcbiAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IHZpc2l0Q2hpbGRyZW4gPSAob2JqZWN0LCBmbikgPT4ge1xuICBpZiAob2JqZWN0LmNoaWxkcmVuICYmIG9iamVjdC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgZm9yIChjb25zdCBjaGlsZCBvZiBvYmplY3QuY2hpbGRyZW4pIHtcbiAgICAgIHZpc2l0Q2hpbGRyZW4oY2hpbGQsIGZuKVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBmbihvYmplY3QpXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGFwcGx5U2hhZG93c0FuZERlcHRoV3JpdGUgPSAob2JqZWN0KSA9PiB7XG4gIHZpc2l0Q2hpbGRyZW4ob2JqZWN0LCAoY2hpbGQpID0+IHtcbiAgICBpZiAoY2hpbGQubWF0ZXJpYWwpIHtcbiAgICAgIGNoaWxkLm1hdGVyaWFsLmRlcHRoV3JpdGUgPSB0cnVlXG4gICAgICBjaGlsZC5jYXN0U2hhZG93ID0gdHJ1ZVxuICAgICAgY2hpbGQucmVjZWl2ZVNoYWRvdyA9IHRydWVcbiAgICB9XG4gIH0pXG59XG5cbmV4cG9ydCBjb25zdCBmaW5kQ2hpbGQgPSAob2JqZWN0LCBuYW1lKSA9PiB7XG4gIGlmIChvYmplY3QuY2hpbGRyZW4gJiYgb2JqZWN0LmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIG9iamVjdC5jaGlsZHJlbikge1xuICAgICAgaWYgKG5hbWUgPT09IGNoaWxkLm5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGNoaWxkXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCByZXMgPSBmaW5kQ2hpbGQoY2hpbGQsIG5hbWUpXG4gICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICByZXR1cm4gcmVzXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKG5hbWUgPT09IG9iamVjdC5uYW1lKSB7XG4gICAgICByZXR1cm4gb2JqZWN0XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICB9XG4gIH1cbn1cbiIsIi8qKlxuICogR2FtbWEgQ29ycmVjdGlvbiBTaGFkZXJcbiAqIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvZ2FtbWFfY29ycmVjdGlvblxuICovXG5cbmNvbnN0IEdhbW1hQ29ycmVjdGlvblNoYWRlciA9IHtcblxuXHR1bmlmb3Jtczoge1xuXG5cdFx0J3REaWZmdXNlJzogeyB2YWx1ZTogbnVsbCB9XG5cblx0fSxcblxuXHR2ZXJ0ZXhTaGFkZXI6IC8qIGdsc2wgKi9gXG5cblx0XHR2YXJ5aW5nIHZlYzIgdlV2O1xuXG5cdFx0dm9pZCBtYWluKCkge1xuXG5cdFx0XHR2VXYgPSB1djtcblx0XHRcdGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIG1vZGVsVmlld01hdHJpeCAqIHZlYzQoIHBvc2l0aW9uLCAxLjAgKTtcblxuXHRcdH1gLFxuXG5cdGZyYWdtZW50U2hhZGVyOiAvKiBnbHNsICovYFxuXG5cdFx0dW5pZm9ybSBzYW1wbGVyMkQgdERpZmZ1c2U7XG5cblx0XHR2YXJ5aW5nIHZlYzIgdlV2O1xuXG5cdFx0dm9pZCBtYWluKCkge1xuXG5cdFx0XHR2ZWM0IHRleCA9IHRleHR1cmUyRCggdERpZmZ1c2UsIHZVdiApO1xuXG5cdFx0XHRnbF9GcmFnQ29sb3IgPSBMaW5lYXJUb3NSR0IoIHRleCApO1xuXG5cdFx0fWBcblxufTtcblxuZXhwb3J0IHsgR2FtbWFDb3JyZWN0aW9uU2hhZGVyIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImN1c3RvbS1zaGFkZXJzLXNjZW5lXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2x0anNfZm91cnRoXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2x0anNfZm91cnRoXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9idWlsZF90aHJlZV9tb2R1bGVfanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9jb250cm9sc19PcmJpdENvbnRyb2xzX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc19saWwtZ3VpX2Rpc3RfbGlsLWd1aV9lc21fanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9sb2FkZXJzX0dMVEZMb2FkZXJfanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9wb3N0cHJvY2Vzc2luZ19FZmZlY3RDb21wb3Nlcl9qcy1ub2RlX21vZHVsZXNfdGhyZWVfZS1kZDk3NzdcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9wb3N0cHJvY2Vzc2luZ19VbnJlYWxCbG9vbVBhc3NfanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9wb3N0cHJvY2Vzc2luZ19CbG9vbVBhc3NfanMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbC05YmRlNTdcIixcInNhbXBsZXNfYm9vdHN0cmFwX2Jvb3RzdHJhcF9qcy1zYW1wbGVzX2NoYXB0ZXJzX2NoYXB0ZXItMTFfdXRpbF9wYXNzLWNvbnRyb2xzX2pzLXNhbXBsZXNfY29udC1iMmZlZDFcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItMTEvY3VzdG9tLXNoYWRlcnMtc2NlbmUuanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
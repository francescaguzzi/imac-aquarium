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

/***/ "./samples/chapters/chapter-11/bokeh.js"
/*!**********************************************!*\
  !*** ./samples/chapters/chapter-11/bokeh.js ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_standard_scene_empty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/standard-scene-empty */ "./samples/chapters/chapter-11/util/standard-scene-empty.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var three_examples_jsm_postprocessing_EffectComposer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/postprocessing/EffectComposer */ "./node_modules/three/examples/jsm/postprocessing/EffectComposer.js");
/* harmony import */ var three_examples_jsm_postprocessing_RenderPass_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/jsm/postprocessing/RenderPass.js */ "./node_modules/three/examples/jsm/postprocessing/RenderPass.js");
/* harmony import */ var three_examples_jsm_postprocessing_BokehPass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three/examples/jsm/postprocessing/BokehPass */ "./node_modules/three/examples/jsm/postprocessing/BokehPass.js");
/* harmony import */ var _util_pass_controls__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util/pass-controls */ "./samples/chapters/chapter-11/util/pass-controls.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _bootstrap_floor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../bootstrap/floor */ "./samples/bootstrap/floor.js");










const animate = (renderer, composer) => {
  renderer.autoClear = false
  requestAnimationFrame(() => animate(renderer, composer))
  composer.render()
}

let bokehPass = undefined

const setupComposer = (renderer, scene, camera) => {
  bokehPass = new three_examples_jsm_postprocessing_BokehPass__WEBPACK_IMPORTED_MODULE_4__.BokehPass(scene, camera, {
    focus: 6,
    aspect: camera.aspect,
    aperture: 0.025,
    maxblur: 1.0,
    width: window.width,
    height: window.height
  })
  const composer = new three_examples_jsm_postprocessing_EffectComposer__WEBPACK_IMPORTED_MODULE_2__.EffectComposer(renderer)
  composer.addPass(new three_examples_jsm_postprocessing_RenderPass_js__WEBPACK_IMPORTED_MODULE_3__.RenderPass(scene, camera))
  composer.addPass(bokehPass)
  return composer
}

const addElementsToScene = (scene) => {
  const totalWidth = 20
  const nBoxes = 15
  for (let i = 0; i < nBoxes; i++) {
    const box = new three__WEBPACK_IMPORTED_MODULE_6__.BoxGeometry(1, 1, 1)
    const mat = new three__WEBPACK_IMPORTED_MODULE_6__.MeshStandardMaterial({ color: 0x00ff00 })
    const mesh = new three__WEBPACK_IMPORTED_MODULE_6__.Mesh(box, mat)
    mesh.position.z = -10
    mesh.position.x = -(totalWidth / 2) + (totalWidth / nBoxes) * i
    mesh.position.y = -1.5
    scene.add(mesh)
  }

  for (let i = 0; i < nBoxes; i++) {
    const box = new three__WEBPACK_IMPORTED_MODULE_6__.BoxGeometry(1, 1, 1)
    const mat = new three__WEBPACK_IMPORTED_MODULE_6__.MeshStandardMaterial({ color: 0xff0000 })
    const mesh = new three__WEBPACK_IMPORTED_MODULE_6__.Mesh(box, mat)
    mesh.position.z = -5
    mesh.position.x = -(totalWidth / 2) + (totalWidth / nBoxes) * i
    mesh.position.y = -1.5
    scene.add(mesh)
  }

  for (let i = 0; i < nBoxes; i++) {
    const box = new three__WEBPACK_IMPORTED_MODULE_6__.BoxGeometry(1, 1, 1)
    const mat = new three__WEBPACK_IMPORTED_MODULE_6__.MeshStandardMaterial({ color: 0x000066 })
    const mesh = new three__WEBPACK_IMPORTED_MODULE_6__.Mesh(box, mat)
    mesh.position.z = 2
    mesh.position.x = -(totalWidth / 2) + (totalWidth / nBoxes) * i
    scene.add(mesh)
    mesh.position.y = -1.5
  }

  const texture = new three__WEBPACK_IMPORTED_MODULE_6__.TextureLoader().load('/assets/textures/wood/floor-parquet-pattern-172292.jpg')
  ;(0,_bootstrap_floor__WEBPACK_IMPORTED_MODULE_7__.floatingFloor)(scene, 40).material = new three__WEBPACK_IMPORTED_MODULE_6__.MeshBasicMaterial({ map: texture })
}

;(0,_util_standard_scene_empty__WEBPACK_IMPORTED_MODULE_0__.bootstrapMeshScene)({
  initializeScene: (scene) => addElementsToScene(scene),
  addControls: (camera, renderer, scene, gui) => {
    new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1__.OrbitControls(camera, renderer.domElement)
    ;(0,_util_pass_controls__WEBPACK_IMPORTED_MODULE_5__.addShaderControl)(gui, 'Bokeh', bokehPass.materialBokeh, {
      floats: [
        { key: 'focus', from: 0, to: 20, step: 0.01 },
        { key: 'aperture', from: 0, to: 0.2, step: 0.000001 },
        { key: 'maxblur', from: 0, to: 1, step: 0.001 }
      ]
    })
  },
  initializeComposer: (renderer, scene, camera) => setupComposer(renderer, scene, camera),
  animate: (renderer, composer) => animate(renderer, composer)
}).then()


/***/ },

/***/ "./samples/chapters/chapter-11/util/standard-scene-empty.js"
/*!******************************************************************!*\
  !*** ./samples/chapters/chapter-11/util/standard-scene-empty.js ***!
  \******************************************************************/
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








const bootstrapMeshScene = async ({
  provideGui,
  backgroundColor,
  addControls,
  initializeComposer,
  animate,
  initializeScene
}) => {
  const props = {
    backgroundColor: backgroundColor ?? 0xffffff,
    disableDefaultControls: true
  }

  const gui = new lil_gui__WEBPACK_IMPORTED_MODULE_2__["default"]()

  const init = async () => {
    ;(0,_bootstrap_bootstrap__WEBPACK_IMPORTED_MODULE_0__.initScene)(props)(({ scene, camera, renderer }) => {
      renderer.shadowMap.type = three__WEBPACK_IMPORTED_MODULE_4__.PCFSoftShadowMap
      camera.position.x = -3
      camera.position.z = 8
      camera.position.y = 2

      if (initializeScene) initializeScene(scene)
      ;(0,_controls_renderer_control__WEBPACK_IMPORTED_MODULE_1__.intializeRendererControls)(gui, renderer)
      ;(0,_controls_scene_controls__WEBPACK_IMPORTED_MODULE_3__.initializeSceneControls)(gui, scene, false)

      let composer
      if (initializeComposer) {
        composer = initializeComposer(renderer, scene, camera)
      }

      if (provideGui) provideGui(gui)
      if (addControls) {
        addControls(camera, renderer, scene, gui)
      }

      animate(renderer, composer)
    })
  }

  init().then()
}


/***/ },

/***/ "./node_modules/three/examples/jsm/postprocessing/BokehPass.js"
/*!*********************************************************************!*\
  !*** ./node_modules/three/examples/jsm/postprocessing/BokehPass.js ***!
  \*********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BokehPass: () => (/* binding */ BokehPass)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _Pass_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Pass.js */ "./node_modules/three/examples/jsm/postprocessing/Pass.js");
/* harmony import */ var _shaders_BokehShader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shaders/BokehShader.js */ "./node_modules/three/examples/jsm/shaders/BokehShader.js");




/**
 * Depth-of-field post-process with bokeh shader
 */

class BokehPass extends _Pass_js__WEBPACK_IMPORTED_MODULE_1__.Pass {

	constructor( scene, camera, params ) {

		super();

		this.scene = scene;
		this.camera = camera;

		const focus = ( params.focus !== undefined ) ? params.focus : 1.0;
		const aspect = ( params.aspect !== undefined ) ? params.aspect : camera.aspect;
		const aperture = ( params.aperture !== undefined ) ? params.aperture : 0.025;
		const maxblur = ( params.maxblur !== undefined ) ? params.maxblur : 1.0;

		// render targets

		const width = params.width || window.innerWidth || 1;
		const height = params.height || window.innerHeight || 1;

		this.renderTargetDepth = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderTarget( width, height, {
			minFilter: three__WEBPACK_IMPORTED_MODULE_0__.NearestFilter,
			magFilter: three__WEBPACK_IMPORTED_MODULE_0__.NearestFilter
		} );

		this.renderTargetDepth.texture.name = 'BokehPass.depth';

		// depth material

		this.materialDepth = new three__WEBPACK_IMPORTED_MODULE_0__.MeshDepthMaterial();
		this.materialDepth.depthPacking = three__WEBPACK_IMPORTED_MODULE_0__.RGBADepthPacking;
		this.materialDepth.blending = three__WEBPACK_IMPORTED_MODULE_0__.NoBlending;

		// bokeh material

		if ( _shaders_BokehShader_js__WEBPACK_IMPORTED_MODULE_2__.BokehShader === undefined ) {

			console.error( 'THREE.BokehPass relies on BokehShader' );

		}

		const bokehShader = _shaders_BokehShader_js__WEBPACK_IMPORTED_MODULE_2__.BokehShader;
		const bokehUniforms = three__WEBPACK_IMPORTED_MODULE_0__.UniformsUtils.clone( bokehShader.uniforms );

		bokehUniforms[ 'tDepth' ].value = this.renderTargetDepth.texture;

		bokehUniforms[ 'focus' ].value = focus;
		bokehUniforms[ 'aspect' ].value = aspect;
		bokehUniforms[ 'aperture' ].value = aperture;
		bokehUniforms[ 'maxblur' ].value = maxblur;
		bokehUniforms[ 'nearClip' ].value = camera.near;
		bokehUniforms[ 'farClip' ].value = camera.far;

		this.materialBokeh = new three__WEBPACK_IMPORTED_MODULE_0__.ShaderMaterial( {
			defines: Object.assign( {}, bokehShader.defines ),
			uniforms: bokehUniforms,
			vertexShader: bokehShader.vertexShader,
			fragmentShader: bokehShader.fragmentShader
		} );

		this.uniforms = bokehUniforms;
		this.needsSwap = false;

		this.fsQuad = new _Pass_js__WEBPACK_IMPORTED_MODULE_1__.FullScreenQuad( this.materialBokeh );

		this._oldClearColor = new three__WEBPACK_IMPORTED_MODULE_0__.Color();

	}

	render( renderer, writeBuffer, readBuffer/*, deltaTime, maskActive*/ ) {

		// Render depth into texture

		this.scene.overrideMaterial = this.materialDepth;

		renderer.getClearColor( this._oldClearColor );
		const oldClearAlpha = renderer.getClearAlpha();
		const oldAutoClear = renderer.autoClear;
		renderer.autoClear = false;

		renderer.setClearColor( 0xffffff );
		renderer.setClearAlpha( 1.0 );
		renderer.setRenderTarget( this.renderTargetDepth );
		renderer.clear();
		renderer.render( this.scene, this.camera );

		// Render bokeh composite

		this.uniforms[ 'tColor' ].value = readBuffer.texture;
		this.uniforms[ 'nearClip' ].value = this.camera.near;
		this.uniforms[ 'farClip' ].value = this.camera.far;

		if ( this.renderToScreen ) {

			renderer.setRenderTarget( null );
			this.fsQuad.render( renderer );

		} else {

			renderer.setRenderTarget( writeBuffer );
			renderer.clear();
			this.fsQuad.render( renderer );

		}

		this.scene.overrideMaterial = null;
		renderer.setClearColor( this._oldClearColor );
		renderer.setClearAlpha( oldClearAlpha );
		renderer.autoClear = oldAutoClear;

	}

}




/***/ },

/***/ "./node_modules/three/examples/jsm/shaders/BokehShader.js"
/*!****************************************************************!*\
  !*** ./node_modules/three/examples/jsm/shaders/BokehShader.js ***!
  \****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BokehShader: () => (/* binding */ BokehShader)
/* harmony export */ });
/**
 * Depth-of-field shader with bokeh
 * ported from GLSL shader by Martins Upitis
 * http://artmartinsh.blogspot.com/2010/02/glsl-lens-blur-filter-with-bokeh.html
 */

const BokehShader = {

	defines: {
		'DEPTH_PACKING': 1,
		'PERSPECTIVE_CAMERA': 1,
	},

	uniforms: {

		'tColor': { value: null },
		'tDepth': { value: null },
		'focus': { value: 1.0 },
		'aspect': { value: 1.0 },
		'aperture': { value: 0.025 },
		'maxblur': { value: 0.01 },
		'nearClip': { value: 1.0 },
		'farClip': { value: 1000.0 },

	},

	vertexShader: /* glsl */`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

	fragmentShader: /* glsl */`

		#include <common>

		varying vec2 vUv;

		uniform sampler2D tColor;
		uniform sampler2D tDepth;

		uniform float maxblur; // max blur amount
		uniform float aperture; // aperture - bigger values for shallower depth of field

		uniform float nearClip;
		uniform float farClip;

		uniform float focus;
		uniform float aspect;

		#include <packing>

		float getDepth( const in vec2 screenPosition ) {
			#if DEPTH_PACKING == 1
			return unpackRGBAToDepth( texture2D( tDepth, screenPosition ) );
			#else
			return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		float getViewZ( const in float depth ) {
			#if PERSPECTIVE_CAMERA == 1
			return perspectiveDepthToViewZ( depth, nearClip, farClip );
			#else
			return orthographicDepthToViewZ( depth, nearClip, farClip );
			#endif
		}


		void main() {

			vec2 aspectcorrect = vec2( 1.0, aspect );

			float viewZ = getViewZ( getDepth( vUv ) );

			float factor = ( focus + viewZ ); // viewZ is <= 0, so this is a difference equation

			vec2 dofblur = vec2 ( clamp( factor * aperture, -maxblur, maxblur ) );

			vec2 dofblur9 = dofblur * 0.9;
			vec2 dofblur7 = dofblur * 0.7;
			vec2 dofblur4 = dofblur * 0.4;

			vec4 col = vec4( 0.0 );

			col += texture2D( tColor, vUv.xy );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur9 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur7 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur4 );

			gl_FragColor = col / 41.0;
			gl_FragColor.a = 1.0;

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
/******/ 			"bokeh": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","vendors-node_modules_three_examples_jsm_postprocessing_EffectComposer_js-node_modules_three_e-dd9777","vendors-node_modules_three_examples_jsm_postprocessing_UnrealBloomPass_js","vendors-node_modules_three_examples_jsm_postprocessing_BloomPass_js-node_modules_three_exampl-9bde57","samples_bootstrap_bootstrap_js-samples_chapters_chapter-11_util_pass-controls_js-samples_cont-b2fed1"], () => (__webpack_require__("./samples/chapters/chapter-11/bokeh.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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L2x0anMtZm91cnRoLy4vc2FtcGxlcy9ib290c3RyYXAvZmxvb3IuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItMTEvYm9rZWguanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItMTEvdXRpbC9zdGFuZGFyZC1zY2VuZS1lbXB0eS5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL25vZGVfbW9kdWxlcy90aHJlZS9leGFtcGxlcy9qc20vcG9zdHByb2Nlc3NpbmcvQm9rZWhQYXNzLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vbm9kZV9tb2R1bGVzL3RocmVlL2V4YW1wbGVzL2pzbS9zaGFkZXJzL0Jva2VoU2hhZGVyLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5cbmV4cG9ydCBjb25zdCBmb3JldmVyUGxhbmUgPSAoc2NlbmUpID0+IHtcbiAgY29uc3QgZ2VvID0gbmV3IFRIUkVFLlBsYW5lQnVmZmVyR2VvbWV0cnkoMTAwMDAsIDEwMDAwKVxuICBjb25zdCBtYXQgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7XG4gICAgY29sb3I6IDB4ZmZmZmZmXG4gIH0pXG4gIGNvbnN0IG1lc2ggPSBuZXcgVEhSRUUuTWVzaChnZW8sIG1hdClcbiAgbWVzaC5wb3NpdGlvbi5zZXQoMCwgLTIsIDApXG4gIG1lc2gucm90YXRpb24uc2V0KE1hdGguUEkgLyAtMiwgMCwgMClcbiAgbWVzaC5yZWNlaXZlU2hhZG93ID0gdHJ1ZVxuICBtZXNoLm5hbWUgPSAnZm9yZXZlci1mbG9vcidcbiAgc2NlbmUuYWRkKG1lc2gpXG5cbiAgcmV0dXJuIG1lc2hcbn1cblxuZXhwb3J0IGNvbnN0IGZsb2F0aW5nRmxvb3IgPSAoc2NlbmUsIHNpemUpID0+IHtcbiAgY29uc3QgcyA9IHNpemUgPyBzaXplIDogNlxuICBjb25zdCBnZW8gPSBuZXcgVEhSRUUuQm94QnVmZmVyR2VvbWV0cnkocywgMC4yNSwgcywgMTAsIDEwLCAxMClcbiAgY29uc3QgbWF0ID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcbiAgICBjb2xvcjogMHhkZGRkZGRcbiAgfSlcbiAgY29uc3QgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlbywgbWF0KVxuICBtZXNoLnBvc2l0aW9uLnNldCgwLCAtMiwgLTEpXG4gIG1lc2gucmVjZWl2ZVNoYWRvdyA9IHRydWVcbiAgbWVzaC5uYW1lID0gJ2Zsb2F0aW5nLWZsb29yJ1xuICBzY2VuZS5hZGQobWVzaClcblxuICByZXR1cm4gbWVzaFxufVxuIiwiaW1wb3J0IHsgYm9vdHN0cmFwTWVzaFNjZW5lIH0gZnJvbSAnLi91dGlsL3N0YW5kYXJkLXNjZW5lLWVtcHR5J1xuaW1wb3J0IHsgT3JiaXRDb250cm9scyB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9jb250cm9scy9PcmJpdENvbnRyb2xzJ1xuXG5pbXBvcnQgeyBFZmZlY3RDb21wb3NlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9wb3N0cHJvY2Vzc2luZy9FZmZlY3RDb21wb3NlcidcbmltcG9ydCB7IFJlbmRlclBhc3MgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vcG9zdHByb2Nlc3NpbmcvUmVuZGVyUGFzcy5qcydcbmltcG9ydCB7IEJva2VoUGFzcyB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9wb3N0cHJvY2Vzc2luZy9Cb2tlaFBhc3MnXG5pbXBvcnQgeyBhZGRTaGFkZXJDb250cm9sIH0gZnJvbSAnLi91dGlsL3Bhc3MtY29udHJvbHMnXG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcbmltcG9ydCB7IGZsb2F0aW5nRmxvb3IsIGZvcmV2ZXJQbGFuZSB9IGZyb20gJy4uLy4uL2Jvb3RzdHJhcC9mbG9vcidcblxuY29uc3QgYW5pbWF0ZSA9IChyZW5kZXJlciwgY29tcG9zZXIpID0+IHtcbiAgcmVuZGVyZXIuYXV0b0NsZWFyID0gZmFsc2VcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IGFuaW1hdGUocmVuZGVyZXIsIGNvbXBvc2VyKSlcbiAgY29tcG9zZXIucmVuZGVyKClcbn1cblxubGV0IGJva2VoUGFzcyA9IHVuZGVmaW5lZFxuXG5jb25zdCBzZXR1cENvbXBvc2VyID0gKHJlbmRlcmVyLCBzY2VuZSwgY2FtZXJhKSA9PiB7XG4gIGJva2VoUGFzcyA9IG5ldyBCb2tlaFBhc3Moc2NlbmUsIGNhbWVyYSwge1xuICAgIGZvY3VzOiA2LFxuICAgIGFzcGVjdDogY2FtZXJhLmFzcGVjdCxcbiAgICBhcGVydHVyZTogMC4wMjUsXG4gICAgbWF4Ymx1cjogMS4wLFxuICAgIHdpZHRoOiB3aW5kb3cud2lkdGgsXG4gICAgaGVpZ2h0OiB3aW5kb3cuaGVpZ2h0XG4gIH0pXG4gIGNvbnN0IGNvbXBvc2VyID0gbmV3IEVmZmVjdENvbXBvc2VyKHJlbmRlcmVyKVxuICBjb21wb3Nlci5hZGRQYXNzKG5ldyBSZW5kZXJQYXNzKHNjZW5lLCBjYW1lcmEpKVxuICBjb21wb3Nlci5hZGRQYXNzKGJva2VoUGFzcylcbiAgcmV0dXJuIGNvbXBvc2VyXG59XG5cbmNvbnN0IGFkZEVsZW1lbnRzVG9TY2VuZSA9IChzY2VuZSkgPT4ge1xuICBjb25zdCB0b3RhbFdpZHRoID0gMjBcbiAgY29uc3QgbkJveGVzID0gMTVcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBuQm94ZXM7IGkrKykge1xuICAgIGNvbnN0IGJveCA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSgxLCAxLCAxKVxuICAgIGNvbnN0IG1hdCA9IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7IGNvbG9yOiAweDAwZmYwMCB9KVxuICAgIGNvbnN0IG1lc2ggPSBuZXcgVEhSRUUuTWVzaChib3gsIG1hdClcbiAgICBtZXNoLnBvc2l0aW9uLnogPSAtMTBcbiAgICBtZXNoLnBvc2l0aW9uLnggPSAtKHRvdGFsV2lkdGggLyAyKSArICh0b3RhbFdpZHRoIC8gbkJveGVzKSAqIGlcbiAgICBtZXNoLnBvc2l0aW9uLnkgPSAtMS41XG4gICAgc2NlbmUuYWRkKG1lc2gpXG4gIH1cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IG5Cb3hlczsgaSsrKSB7XG4gICAgY29uc3QgYm94ID0gbmV3IFRIUkVFLkJveEdlb21ldHJ5KDEsIDEsIDEpXG4gICAgY29uc3QgbWF0ID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHsgY29sb3I6IDB4ZmYwMDAwIH0pXG4gICAgY29uc3QgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGJveCwgbWF0KVxuICAgIG1lc2gucG9zaXRpb24ueiA9IC01XG4gICAgbWVzaC5wb3NpdGlvbi54ID0gLSh0b3RhbFdpZHRoIC8gMikgKyAodG90YWxXaWR0aCAvIG5Cb3hlcykgKiBpXG4gICAgbWVzaC5wb3NpdGlvbi55ID0gLTEuNVxuICAgIHNjZW5lLmFkZChtZXNoKVxuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBuQm94ZXM7IGkrKykge1xuICAgIGNvbnN0IGJveCA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSgxLCAxLCAxKVxuICAgIGNvbnN0IG1hdCA9IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7IGNvbG9yOiAweDAwMDA2NiB9KVxuICAgIGNvbnN0IG1lc2ggPSBuZXcgVEhSRUUuTWVzaChib3gsIG1hdClcbiAgICBtZXNoLnBvc2l0aW9uLnogPSAyXG4gICAgbWVzaC5wb3NpdGlvbi54ID0gLSh0b3RhbFdpZHRoIC8gMikgKyAodG90YWxXaWR0aCAvIG5Cb3hlcykgKiBpXG4gICAgc2NlbmUuYWRkKG1lc2gpXG4gICAgbWVzaC5wb3NpdGlvbi55ID0gLTEuNVxuICB9XG5cbiAgY29uc3QgdGV4dHVyZSA9IG5ldyBUSFJFRS5UZXh0dXJlTG9hZGVyKCkubG9hZCgnL2Fzc2V0cy90ZXh0dXJlcy93b29kL2Zsb29yLXBhcnF1ZXQtcGF0dGVybi0xNzIyOTIuanBnJylcbiAgZmxvYXRpbmdGbG9vcihzY2VuZSwgNDApLm1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgbWFwOiB0ZXh0dXJlIH0pXG59XG5cbmJvb3RzdHJhcE1lc2hTY2VuZSh7XG4gIGluaXRpYWxpemVTY2VuZTogKHNjZW5lKSA9PiBhZGRFbGVtZW50c1RvU2NlbmUoc2NlbmUpLFxuICBhZGRDb250cm9sczogKGNhbWVyYSwgcmVuZGVyZXIsIHNjZW5lLCBndWkpID0+IHtcbiAgICBuZXcgT3JiaXRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLmRvbUVsZW1lbnQpXG4gICAgYWRkU2hhZGVyQ29udHJvbChndWksICdCb2tlaCcsIGJva2VoUGFzcy5tYXRlcmlhbEJva2VoLCB7XG4gICAgICBmbG9hdHM6IFtcbiAgICAgICAgeyBrZXk6ICdmb2N1cycsIGZyb206IDAsIHRvOiAyMCwgc3RlcDogMC4wMSB9LFxuICAgICAgICB7IGtleTogJ2FwZXJ0dXJlJywgZnJvbTogMCwgdG86IDAuMiwgc3RlcDogMC4wMDAwMDEgfSxcbiAgICAgICAgeyBrZXk6ICdtYXhibHVyJywgZnJvbTogMCwgdG86IDEsIHN0ZXA6IDAuMDAxIH1cbiAgICAgIF1cbiAgICB9KVxuICB9LFxuICBpbml0aWFsaXplQ29tcG9zZXI6IChyZW5kZXJlciwgc2NlbmUsIGNhbWVyYSkgPT4gc2V0dXBDb21wb3NlcihyZW5kZXJlciwgc2NlbmUsIGNhbWVyYSksXG4gIGFuaW1hdGU6IChyZW5kZXJlciwgY29tcG9zZXIpID0+IGFuaW1hdGUocmVuZGVyZXIsIGNvbXBvc2VyKVxufSkudGhlbigpXG4iLCJpbXBvcnQgeyBpbml0U2NlbmUgfSBmcm9tICcuLi8uLi8uLi9ib290c3RyYXAvYm9vdHN0cmFwJ1xuaW1wb3J0IHsgaW50aWFsaXplUmVuZGVyZXJDb250cm9scyB9IGZyb20gJy4uLy4uLy4uL2NvbnRyb2xzL3JlbmRlcmVyLWNvbnRyb2wnXG5cbmltcG9ydCBHVUkgZnJvbSAnbGlsLWd1aSdcbmltcG9ydCB7IGluaXRpYWxpemVTY2VuZUNvbnRyb2xzIH0gZnJvbSAnLi4vLi4vLi4vY29udHJvbHMvc2NlbmUtY29udHJvbHMnXG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcbmltcG9ydCB7IGZsb2F0aW5nRmxvb3IgfSBmcm9tICcuLi8uLi8uLi9ib290c3RyYXAvZmxvb3InXG5cbmV4cG9ydCBjb25zdCBib290c3RyYXBNZXNoU2NlbmUgPSBhc3luYyAoe1xuICBwcm92aWRlR3VpLFxuICBiYWNrZ3JvdW5kQ29sb3IsXG4gIGFkZENvbnRyb2xzLFxuICBpbml0aWFsaXplQ29tcG9zZXIsXG4gIGFuaW1hdGUsXG4gIGluaXRpYWxpemVTY2VuZVxufSkgPT4ge1xuICBjb25zdCBwcm9wcyA9IHtcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IGJhY2tncm91bmRDb2xvciA/PyAweGZmZmZmZixcbiAgICBkaXNhYmxlRGVmYXVsdENvbnRyb2xzOiB0cnVlXG4gIH1cblxuICBjb25zdCBndWkgPSBuZXcgR1VJKClcblxuICBjb25zdCBpbml0ID0gYXN5bmMgKCkgPT4ge1xuICAgIGluaXRTY2VuZShwcm9wcykoKHsgc2NlbmUsIGNhbWVyYSwgcmVuZGVyZXIgfSkgPT4ge1xuICAgICAgcmVuZGVyZXIuc2hhZG93TWFwLnR5cGUgPSBUSFJFRS5QQ0ZTb2Z0U2hhZG93TWFwXG4gICAgICBjYW1lcmEucG9zaXRpb24ueCA9IC0zXG4gICAgICBjYW1lcmEucG9zaXRpb24ueiA9IDhcbiAgICAgIGNhbWVyYS5wb3NpdGlvbi55ID0gMlxuXG4gICAgICBpZiAoaW5pdGlhbGl6ZVNjZW5lKSBpbml0aWFsaXplU2NlbmUoc2NlbmUpXG4gICAgICBpbnRpYWxpemVSZW5kZXJlckNvbnRyb2xzKGd1aSwgcmVuZGVyZXIpXG4gICAgICBpbml0aWFsaXplU2NlbmVDb250cm9scyhndWksIHNjZW5lLCBmYWxzZSlcblxuICAgICAgbGV0IGNvbXBvc2VyXG4gICAgICBpZiAoaW5pdGlhbGl6ZUNvbXBvc2VyKSB7XG4gICAgICAgIGNvbXBvc2VyID0gaW5pdGlhbGl6ZUNvbXBvc2VyKHJlbmRlcmVyLCBzY2VuZSwgY2FtZXJhKVxuICAgICAgfVxuXG4gICAgICBpZiAocHJvdmlkZUd1aSkgcHJvdmlkZUd1aShndWkpXG4gICAgICBpZiAoYWRkQ29udHJvbHMpIHtcbiAgICAgICAgYWRkQ29udHJvbHMoY2FtZXJhLCByZW5kZXJlciwgc2NlbmUsIGd1aSlcbiAgICAgIH1cblxuICAgICAgYW5pbWF0ZShyZW5kZXJlciwgY29tcG9zZXIpXG4gICAgfSlcbiAgfVxuXG4gIGluaXQoKS50aGVuKClcbn1cbiIsImltcG9ydCB7XG5cdENvbG9yLFxuXHRNZXNoRGVwdGhNYXRlcmlhbCxcblx0TmVhcmVzdEZpbHRlcixcblx0Tm9CbGVuZGluZyxcblx0UkdCQURlcHRoUGFja2luZyxcblx0U2hhZGVyTWF0ZXJpYWwsXG5cdFVuaWZvcm1zVXRpbHMsXG5cdFdlYkdMUmVuZGVyVGFyZ2V0XG59IGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFBhc3MsIEZ1bGxTY3JlZW5RdWFkIH0gZnJvbSAnLi9QYXNzLmpzJztcbmltcG9ydCB7IEJva2VoU2hhZGVyIH0gZnJvbSAnLi4vc2hhZGVycy9Cb2tlaFNoYWRlci5qcyc7XG5cbi8qKlxuICogRGVwdGgtb2YtZmllbGQgcG9zdC1wcm9jZXNzIHdpdGggYm9rZWggc2hhZGVyXG4gKi9cblxuY2xhc3MgQm9rZWhQYXNzIGV4dGVuZHMgUGFzcyB7XG5cblx0Y29uc3RydWN0b3IoIHNjZW5lLCBjYW1lcmEsIHBhcmFtcyApIHtcblxuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLnNjZW5lID0gc2NlbmU7XG5cdFx0dGhpcy5jYW1lcmEgPSBjYW1lcmE7XG5cblx0XHRjb25zdCBmb2N1cyA9ICggcGFyYW1zLmZvY3VzICE9PSB1bmRlZmluZWQgKSA/IHBhcmFtcy5mb2N1cyA6IDEuMDtcblx0XHRjb25zdCBhc3BlY3QgPSAoIHBhcmFtcy5hc3BlY3QgIT09IHVuZGVmaW5lZCApID8gcGFyYW1zLmFzcGVjdCA6IGNhbWVyYS5hc3BlY3Q7XG5cdFx0Y29uc3QgYXBlcnR1cmUgPSAoIHBhcmFtcy5hcGVydHVyZSAhPT0gdW5kZWZpbmVkICkgPyBwYXJhbXMuYXBlcnR1cmUgOiAwLjAyNTtcblx0XHRjb25zdCBtYXhibHVyID0gKCBwYXJhbXMubWF4Ymx1ciAhPT0gdW5kZWZpbmVkICkgPyBwYXJhbXMubWF4Ymx1ciA6IDEuMDtcblxuXHRcdC8vIHJlbmRlciB0YXJnZXRzXG5cblx0XHRjb25zdCB3aWR0aCA9IHBhcmFtcy53aWR0aCB8fCB3aW5kb3cuaW5uZXJXaWR0aCB8fCAxO1xuXHRcdGNvbnN0IGhlaWdodCA9IHBhcmFtcy5oZWlnaHQgfHwgd2luZG93LmlubmVySGVpZ2h0IHx8IDE7XG5cblx0XHR0aGlzLnJlbmRlclRhcmdldERlcHRoID0gbmV3IFdlYkdMUmVuZGVyVGFyZ2V0KCB3aWR0aCwgaGVpZ2h0LCB7XG5cdFx0XHRtaW5GaWx0ZXI6IE5lYXJlc3RGaWx0ZXIsXG5cdFx0XHRtYWdGaWx0ZXI6IE5lYXJlc3RGaWx0ZXJcblx0XHR9ICk7XG5cblx0XHR0aGlzLnJlbmRlclRhcmdldERlcHRoLnRleHR1cmUubmFtZSA9ICdCb2tlaFBhc3MuZGVwdGgnO1xuXG5cdFx0Ly8gZGVwdGggbWF0ZXJpYWxcblxuXHRcdHRoaXMubWF0ZXJpYWxEZXB0aCA9IG5ldyBNZXNoRGVwdGhNYXRlcmlhbCgpO1xuXHRcdHRoaXMubWF0ZXJpYWxEZXB0aC5kZXB0aFBhY2tpbmcgPSBSR0JBRGVwdGhQYWNraW5nO1xuXHRcdHRoaXMubWF0ZXJpYWxEZXB0aC5ibGVuZGluZyA9IE5vQmxlbmRpbmc7XG5cblx0XHQvLyBib2tlaCBtYXRlcmlhbFxuXG5cdFx0aWYgKCBCb2tlaFNoYWRlciA9PT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRjb25zb2xlLmVycm9yKCAnVEhSRUUuQm9rZWhQYXNzIHJlbGllcyBvbiBCb2tlaFNoYWRlcicgKTtcblxuXHRcdH1cblxuXHRcdGNvbnN0IGJva2VoU2hhZGVyID0gQm9rZWhTaGFkZXI7XG5cdFx0Y29uc3QgYm9rZWhVbmlmb3JtcyA9IFVuaWZvcm1zVXRpbHMuY2xvbmUoIGJva2VoU2hhZGVyLnVuaWZvcm1zICk7XG5cblx0XHRib2tlaFVuaWZvcm1zWyAndERlcHRoJyBdLnZhbHVlID0gdGhpcy5yZW5kZXJUYXJnZXREZXB0aC50ZXh0dXJlO1xuXG5cdFx0Ym9rZWhVbmlmb3Jtc1sgJ2ZvY3VzJyBdLnZhbHVlID0gZm9jdXM7XG5cdFx0Ym9rZWhVbmlmb3Jtc1sgJ2FzcGVjdCcgXS52YWx1ZSA9IGFzcGVjdDtcblx0XHRib2tlaFVuaWZvcm1zWyAnYXBlcnR1cmUnIF0udmFsdWUgPSBhcGVydHVyZTtcblx0XHRib2tlaFVuaWZvcm1zWyAnbWF4Ymx1cicgXS52YWx1ZSA9IG1heGJsdXI7XG5cdFx0Ym9rZWhVbmlmb3Jtc1sgJ25lYXJDbGlwJyBdLnZhbHVlID0gY2FtZXJhLm5lYXI7XG5cdFx0Ym9rZWhVbmlmb3Jtc1sgJ2ZhckNsaXAnIF0udmFsdWUgPSBjYW1lcmEuZmFyO1xuXG5cdFx0dGhpcy5tYXRlcmlhbEJva2VoID0gbmV3IFNoYWRlck1hdGVyaWFsKCB7XG5cdFx0XHRkZWZpbmVzOiBPYmplY3QuYXNzaWduKCB7fSwgYm9rZWhTaGFkZXIuZGVmaW5lcyApLFxuXHRcdFx0dW5pZm9ybXM6IGJva2VoVW5pZm9ybXMsXG5cdFx0XHR2ZXJ0ZXhTaGFkZXI6IGJva2VoU2hhZGVyLnZlcnRleFNoYWRlcixcblx0XHRcdGZyYWdtZW50U2hhZGVyOiBib2tlaFNoYWRlci5mcmFnbWVudFNoYWRlclxuXHRcdH0gKTtcblxuXHRcdHRoaXMudW5pZm9ybXMgPSBib2tlaFVuaWZvcm1zO1xuXHRcdHRoaXMubmVlZHNTd2FwID0gZmFsc2U7XG5cblx0XHR0aGlzLmZzUXVhZCA9IG5ldyBGdWxsU2NyZWVuUXVhZCggdGhpcy5tYXRlcmlhbEJva2VoICk7XG5cblx0XHR0aGlzLl9vbGRDbGVhckNvbG9yID0gbmV3IENvbG9yKCk7XG5cblx0fVxuXG5cdHJlbmRlciggcmVuZGVyZXIsIHdyaXRlQnVmZmVyLCByZWFkQnVmZmVyLyosIGRlbHRhVGltZSwgbWFza0FjdGl2ZSovICkge1xuXG5cdFx0Ly8gUmVuZGVyIGRlcHRoIGludG8gdGV4dHVyZVxuXG5cdFx0dGhpcy5zY2VuZS5vdmVycmlkZU1hdGVyaWFsID0gdGhpcy5tYXRlcmlhbERlcHRoO1xuXG5cdFx0cmVuZGVyZXIuZ2V0Q2xlYXJDb2xvciggdGhpcy5fb2xkQ2xlYXJDb2xvciApO1xuXHRcdGNvbnN0IG9sZENsZWFyQWxwaGEgPSByZW5kZXJlci5nZXRDbGVhckFscGhhKCk7XG5cdFx0Y29uc3Qgb2xkQXV0b0NsZWFyID0gcmVuZGVyZXIuYXV0b0NsZWFyO1xuXHRcdHJlbmRlcmVyLmF1dG9DbGVhciA9IGZhbHNlO1xuXG5cdFx0cmVuZGVyZXIuc2V0Q2xlYXJDb2xvciggMHhmZmZmZmYgKTtcblx0XHRyZW5kZXJlci5zZXRDbGVhckFscGhhKCAxLjAgKTtcblx0XHRyZW5kZXJlci5zZXRSZW5kZXJUYXJnZXQoIHRoaXMucmVuZGVyVGFyZ2V0RGVwdGggKTtcblx0XHRyZW5kZXJlci5jbGVhcigpO1xuXHRcdHJlbmRlcmVyLnJlbmRlciggdGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEgKTtcblxuXHRcdC8vIFJlbmRlciBib2tlaCBjb21wb3NpdGVcblxuXHRcdHRoaXMudW5pZm9ybXNbICd0Q29sb3InIF0udmFsdWUgPSByZWFkQnVmZmVyLnRleHR1cmU7XG5cdFx0dGhpcy51bmlmb3Jtc1sgJ25lYXJDbGlwJyBdLnZhbHVlID0gdGhpcy5jYW1lcmEubmVhcjtcblx0XHR0aGlzLnVuaWZvcm1zWyAnZmFyQ2xpcCcgXS52YWx1ZSA9IHRoaXMuY2FtZXJhLmZhcjtcblxuXHRcdGlmICggdGhpcy5yZW5kZXJUb1NjcmVlbiApIHtcblxuXHRcdFx0cmVuZGVyZXIuc2V0UmVuZGVyVGFyZ2V0KCBudWxsICk7XG5cdFx0XHR0aGlzLmZzUXVhZC5yZW5kZXIoIHJlbmRlcmVyICk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRyZW5kZXJlci5zZXRSZW5kZXJUYXJnZXQoIHdyaXRlQnVmZmVyICk7XG5cdFx0XHRyZW5kZXJlci5jbGVhcigpO1xuXHRcdFx0dGhpcy5mc1F1YWQucmVuZGVyKCByZW5kZXJlciApO1xuXG5cdFx0fVxuXG5cdFx0dGhpcy5zY2VuZS5vdmVycmlkZU1hdGVyaWFsID0gbnVsbDtcblx0XHRyZW5kZXJlci5zZXRDbGVhckNvbG9yKCB0aGlzLl9vbGRDbGVhckNvbG9yICk7XG5cdFx0cmVuZGVyZXIuc2V0Q2xlYXJBbHBoYSggb2xkQ2xlYXJBbHBoYSApO1xuXHRcdHJlbmRlcmVyLmF1dG9DbGVhciA9IG9sZEF1dG9DbGVhcjtcblxuXHR9XG5cbn1cblxuZXhwb3J0IHsgQm9rZWhQYXNzIH07XG4iLCIvKipcbiAqIERlcHRoLW9mLWZpZWxkIHNoYWRlciB3aXRoIGJva2VoXG4gKiBwb3J0ZWQgZnJvbSBHTFNMIHNoYWRlciBieSBNYXJ0aW5zIFVwaXRpc1xuICogaHR0cDovL2FydG1hcnRpbnNoLmJsb2dzcG90LmNvbS8yMDEwLzAyL2dsc2wtbGVucy1ibHVyLWZpbHRlci13aXRoLWJva2VoLmh0bWxcbiAqL1xuXG5jb25zdCBCb2tlaFNoYWRlciA9IHtcblxuXHRkZWZpbmVzOiB7XG5cdFx0J0RFUFRIX1BBQ0tJTkcnOiAxLFxuXHRcdCdQRVJTUEVDVElWRV9DQU1FUkEnOiAxLFxuXHR9LFxuXG5cdHVuaWZvcm1zOiB7XG5cblx0XHQndENvbG9yJzogeyB2YWx1ZTogbnVsbCB9LFxuXHRcdCd0RGVwdGgnOiB7IHZhbHVlOiBudWxsIH0sXG5cdFx0J2ZvY3VzJzogeyB2YWx1ZTogMS4wIH0sXG5cdFx0J2FzcGVjdCc6IHsgdmFsdWU6IDEuMCB9LFxuXHRcdCdhcGVydHVyZSc6IHsgdmFsdWU6IDAuMDI1IH0sXG5cdFx0J21heGJsdXInOiB7IHZhbHVlOiAwLjAxIH0sXG5cdFx0J25lYXJDbGlwJzogeyB2YWx1ZTogMS4wIH0sXG5cdFx0J2ZhckNsaXAnOiB7IHZhbHVlOiAxMDAwLjAgfSxcblxuXHR9LFxuXG5cdHZlcnRleFNoYWRlcjogLyogZ2xzbCAqL2BcblxuXHRcdHZhcnlpbmcgdmVjMiB2VXY7XG5cblx0XHR2b2lkIG1haW4oKSB7XG5cblx0XHRcdHZVdiA9IHV2O1xuXHRcdFx0Z2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogbW9kZWxWaWV3TWF0cml4ICogdmVjNCggcG9zaXRpb24sIDEuMCApO1xuXG5cdFx0fWAsXG5cblx0ZnJhZ21lbnRTaGFkZXI6IC8qIGdsc2wgKi9gXG5cblx0XHQjaW5jbHVkZSA8Y29tbW9uPlxuXG5cdFx0dmFyeWluZyB2ZWMyIHZVdjtcblxuXHRcdHVuaWZvcm0gc2FtcGxlcjJEIHRDb2xvcjtcblx0XHR1bmlmb3JtIHNhbXBsZXIyRCB0RGVwdGg7XG5cblx0XHR1bmlmb3JtIGZsb2F0IG1heGJsdXI7IC8vIG1heCBibHVyIGFtb3VudFxuXHRcdHVuaWZvcm0gZmxvYXQgYXBlcnR1cmU7IC8vIGFwZXJ0dXJlIC0gYmlnZ2VyIHZhbHVlcyBmb3Igc2hhbGxvd2VyIGRlcHRoIG9mIGZpZWxkXG5cblx0XHR1bmlmb3JtIGZsb2F0IG5lYXJDbGlwO1xuXHRcdHVuaWZvcm0gZmxvYXQgZmFyQ2xpcDtcblxuXHRcdHVuaWZvcm0gZmxvYXQgZm9jdXM7XG5cdFx0dW5pZm9ybSBmbG9hdCBhc3BlY3Q7XG5cblx0XHQjaW5jbHVkZSA8cGFja2luZz5cblxuXHRcdGZsb2F0IGdldERlcHRoKCBjb25zdCBpbiB2ZWMyIHNjcmVlblBvc2l0aW9uICkge1xuXHRcdFx0I2lmIERFUFRIX1BBQ0tJTkcgPT0gMVxuXHRcdFx0cmV0dXJuIHVucGFja1JHQkFUb0RlcHRoKCB0ZXh0dXJlMkQoIHREZXB0aCwgc2NyZWVuUG9zaXRpb24gKSApO1xuXHRcdFx0I2Vsc2Vcblx0XHRcdHJldHVybiB0ZXh0dXJlMkQoIHREZXB0aCwgc2NyZWVuUG9zaXRpb24gKS54O1xuXHRcdFx0I2VuZGlmXG5cdFx0fVxuXG5cdFx0ZmxvYXQgZ2V0Vmlld1ooIGNvbnN0IGluIGZsb2F0IGRlcHRoICkge1xuXHRcdFx0I2lmIFBFUlNQRUNUSVZFX0NBTUVSQSA9PSAxXG5cdFx0XHRyZXR1cm4gcGVyc3BlY3RpdmVEZXB0aFRvVmlld1ooIGRlcHRoLCBuZWFyQ2xpcCwgZmFyQ2xpcCApO1xuXHRcdFx0I2Vsc2Vcblx0XHRcdHJldHVybiBvcnRob2dyYXBoaWNEZXB0aFRvVmlld1ooIGRlcHRoLCBuZWFyQ2xpcCwgZmFyQ2xpcCApO1xuXHRcdFx0I2VuZGlmXG5cdFx0fVxuXG5cblx0XHR2b2lkIG1haW4oKSB7XG5cblx0XHRcdHZlYzIgYXNwZWN0Y29ycmVjdCA9IHZlYzIoIDEuMCwgYXNwZWN0ICk7XG5cblx0XHRcdGZsb2F0IHZpZXdaID0gZ2V0Vmlld1ooIGdldERlcHRoKCB2VXYgKSApO1xuXG5cdFx0XHRmbG9hdCBmYWN0b3IgPSAoIGZvY3VzICsgdmlld1ogKTsgLy8gdmlld1ogaXMgPD0gMCwgc28gdGhpcyBpcyBhIGRpZmZlcmVuY2UgZXF1YXRpb25cblxuXHRcdFx0dmVjMiBkb2ZibHVyID0gdmVjMiAoIGNsYW1wKCBmYWN0b3IgKiBhcGVydHVyZSwgLW1heGJsdXIsIG1heGJsdXIgKSApO1xuXG5cdFx0XHR2ZWMyIGRvZmJsdXI5ID0gZG9mYmx1ciAqIDAuOTtcblx0XHRcdHZlYzIgZG9mYmx1cjcgPSBkb2ZibHVyICogMC43O1xuXHRcdFx0dmVjMiBkb2ZibHVyNCA9IGRvZmJsdXIgKiAwLjQ7XG5cblx0XHRcdHZlYzQgY29sID0gdmVjNCggMC4wICk7XG5cblx0XHRcdGNvbCArPSB0ZXh0dXJlMkQoIHRDb2xvciwgdlV2Lnh5ICk7XG5cdFx0XHRjb2wgKz0gdGV4dHVyZTJEKCB0Q29sb3IsIHZVdi54eSArICggdmVjMiggIDAuMCwgICAwLjQgICkgKiBhc3BlY3Rjb3JyZWN0ICkgKiBkb2ZibHVyICk7XG5cdFx0XHRjb2wgKz0gdGV4dHVyZTJEKCB0Q29sb3IsIHZVdi54eSArICggdmVjMiggIDAuMTUsICAwLjM3ICkgKiBhc3BlY3Rjb3JyZWN0ICkgKiBkb2ZibHVyICk7XG5cdFx0XHRjb2wgKz0gdGV4dHVyZTJEKCB0Q29sb3IsIHZVdi54eSArICggdmVjMiggIDAuMjksICAwLjI5ICkgKiBhc3BlY3Rjb3JyZWN0ICkgKiBkb2ZibHVyICk7XG5cdFx0XHRjb2wgKz0gdGV4dHVyZTJEKCB0Q29sb3IsIHZVdi54eSArICggdmVjMiggLTAuMzcsICAwLjE1ICkgKiBhc3BlY3Rjb3JyZWN0ICkgKiBkb2ZibHVyICk7XG5cdFx0XHRjb2wgKz0gdGV4dHVyZTJEKCB0Q29sb3IsIHZVdi54eSArICggdmVjMiggIDAuNDAsICAwLjAgICkgKiBhc3BlY3Rjb3JyZWN0ICkgKiBkb2ZibHVyICk7XG5cdFx0XHRjb2wgKz0gdGV4dHVyZTJEKCB0Q29sb3IsIHZVdi54eSArICggdmVjMiggIDAuMzcsIC0wLjE1ICkgKiBhc3BlY3Rjb3JyZWN0ICkgKiBkb2ZibHVyICk7XG5cdFx0XHRjb2wgKz0gdGV4dHVyZTJEKCB0Q29sb3IsIHZVdi54eSArICggdmVjMiggIDAuMjksIC0wLjI5ICkgKiBhc3BlY3Rjb3JyZWN0ICkgKiBkb2ZibHVyICk7XG5cdFx0XHRjb2wgKz0gdGV4dHVyZTJEKCB0Q29sb3IsIHZVdi54eSArICggdmVjMiggLTAuMTUsIC0wLjM3ICkgKiBhc3BlY3Rjb3JyZWN0ICkgKiBkb2ZibHVyICk7XG5cdFx0XHRjb2wgKz0gdGV4dHVyZTJEKCB0Q29sb3IsIHZVdi54eSArICggdmVjMiggIDAuMCwgIC0wLjQgICkgKiBhc3BlY3Rjb3JyZWN0ICkgKiBkb2ZibHVyICk7XG5cdFx0XHRjb2wgKz0gdGV4dHVyZTJEKCB0Q29sb3IsIHZVdi54eSArICggdmVjMiggLTAuMTUsICAwLjM3ICkgKiBhc3BlY3Rjb3JyZWN0ICkgKiBkb2ZibHVyICk7XG5cdFx0XHRjb2wgKz0gdGV4dHVyZTJEKCB0Q29sb3IsIHZVdi54eSArICggdmVjMiggLTAuMjksICAwLjI5ICkgKiBhc3BlY3Rjb3JyZWN0ICkgKiBkb2ZibHVyICk7XG5cdFx0XHRjb2wgKz0gdGV4dHVyZTJEKCB0Q29sb3IsIHZVdi54eSArICggdmVjMiggIDAuMzcsICAwLjE1ICkgKiBhc3BlY3Rjb3JyZWN0ICkgKiBkb2ZibHVyICk7XG5cdFx0XHRjb2wgKz0gdGV4dHVyZTJEKCB0Q29sb3IsIHZVdi54eSArICggdmVjMiggLTAuNCwgICAwLjAgICkgKiBhc3BlY3Rjb3JyZWN0ICkgKiBkb2ZibHVyICk7XG5cdFx0XHRjb2wgKz0gdGV4dHVyZTJEKCB0Q29sb3IsIHZVdi54eSArICggdmVjMiggLTAuMzcsIC0wLjE1ICkgKiBhc3BlY3Rjb3JyZWN0ICkgKiBkb2ZibHVyICk7XG5cdFx0XHRjb2wgKz0gdGV4dHVyZTJEKCB0Q29sb3IsIHZVdi54eSArICggdmVjMiggLTAuMjksIC0wLjI5ICkgKiBhc3BlY3Rjb3JyZWN0ICkgKiBkb2ZibHVyICk7XG5cdFx0XHRjb2wgKz0gdGV4dHVyZTJEKCB0Q29sb3IsIHZVdi54eSArICggdmVjMiggIDAuMTUsIC0wLjM3ICkgKiBhc3BlY3Rjb3JyZWN0ICkgKiBkb2ZibHVyICk7XG5cblx0XHRcdGNvbCArPSB0ZXh0dXJlMkQoIHRDb2xvciwgdlV2Lnh5ICsgKCB2ZWMyKCAgMC4xNSwgIDAuMzcgKSAqIGFzcGVjdGNvcnJlY3QgKSAqIGRvZmJsdXI5ICk7XG5cdFx0XHRjb2wgKz0gdGV4dHVyZTJEKCB0Q29sb3IsIHZVdi54eSArICggdmVjMiggLTAuMzcsICAwLjE1ICkgKiBhc3BlY3Rjb3JyZWN0ICkgKiBkb2ZibHVyOSApO1xuXHRcdFx0Y29sICs9IHRleHR1cmUyRCggdENvbG9yLCB2VXYueHkgKyAoIHZlYzIoICAwLjM3LCAtMC4xNSApICogYXNwZWN0Y29ycmVjdCApICogZG9mYmx1cjkgKTtcblx0XHRcdGNvbCArPSB0ZXh0dXJlMkQoIHRDb2xvciwgdlV2Lnh5ICsgKCB2ZWMyKCAtMC4xNSwgLTAuMzcgKSAqIGFzcGVjdGNvcnJlY3QgKSAqIGRvZmJsdXI5ICk7XG5cdFx0XHRjb2wgKz0gdGV4dHVyZTJEKCB0Q29sb3IsIHZVdi54eSArICggdmVjMiggLTAuMTUsICAwLjM3ICkgKiBhc3BlY3Rjb3JyZWN0ICkgKiBkb2ZibHVyOSApO1xuXHRcdFx0Y29sICs9IHRleHR1cmUyRCggdENvbG9yLCB2VXYueHkgKyAoIHZlYzIoICAwLjM3LCAgMC4xNSApICogYXNwZWN0Y29ycmVjdCApICogZG9mYmx1cjkgKTtcblx0XHRcdGNvbCArPSB0ZXh0dXJlMkQoIHRDb2xvciwgdlV2Lnh5ICsgKCB2ZWMyKCAtMC4zNywgLTAuMTUgKSAqIGFzcGVjdGNvcnJlY3QgKSAqIGRvZmJsdXI5ICk7XG5cdFx0XHRjb2wgKz0gdGV4dHVyZTJEKCB0Q29sb3IsIHZVdi54eSArICggdmVjMiggIDAuMTUsIC0wLjM3ICkgKiBhc3BlY3Rjb3JyZWN0ICkgKiBkb2ZibHVyOSApO1xuXG5cdFx0XHRjb2wgKz0gdGV4dHVyZTJEKCB0Q29sb3IsIHZVdi54eSArICggdmVjMiggIDAuMjksICAwLjI5ICkgKiBhc3BlY3Rjb3JyZWN0ICkgKiBkb2ZibHVyNyApO1xuXHRcdFx0Y29sICs9IHRleHR1cmUyRCggdENvbG9yLCB2VXYueHkgKyAoIHZlYzIoICAwLjQwLCAgMC4wICApICogYXNwZWN0Y29ycmVjdCApICogZG9mYmx1cjcgKTtcblx0XHRcdGNvbCArPSB0ZXh0dXJlMkQoIHRDb2xvciwgdlV2Lnh5ICsgKCB2ZWMyKCAgMC4yOSwgLTAuMjkgKSAqIGFzcGVjdGNvcnJlY3QgKSAqIGRvZmJsdXI3ICk7XG5cdFx0XHRjb2wgKz0gdGV4dHVyZTJEKCB0Q29sb3IsIHZVdi54eSArICggdmVjMiggIDAuMCwgIC0wLjQgICkgKiBhc3BlY3Rjb3JyZWN0ICkgKiBkb2ZibHVyNyApO1xuXHRcdFx0Y29sICs9IHRleHR1cmUyRCggdENvbG9yLCB2VXYueHkgKyAoIHZlYzIoIC0wLjI5LCAgMC4yOSApICogYXNwZWN0Y29ycmVjdCApICogZG9mYmx1cjcgKTtcblx0XHRcdGNvbCArPSB0ZXh0dXJlMkQoIHRDb2xvciwgdlV2Lnh5ICsgKCB2ZWMyKCAtMC40LCAgIDAuMCAgKSAqIGFzcGVjdGNvcnJlY3QgKSAqIGRvZmJsdXI3ICk7XG5cdFx0XHRjb2wgKz0gdGV4dHVyZTJEKCB0Q29sb3IsIHZVdi54eSArICggdmVjMiggLTAuMjksIC0wLjI5ICkgKiBhc3BlY3Rjb3JyZWN0ICkgKiBkb2ZibHVyNyApO1xuXHRcdFx0Y29sICs9IHRleHR1cmUyRCggdENvbG9yLCB2VXYueHkgKyAoIHZlYzIoICAwLjAsICAgMC40ICApICogYXNwZWN0Y29ycmVjdCApICogZG9mYmx1cjcgKTtcblxuXHRcdFx0Y29sICs9IHRleHR1cmUyRCggdENvbG9yLCB2VXYueHkgKyAoIHZlYzIoICAwLjI5LCAgMC4yOSApICogYXNwZWN0Y29ycmVjdCApICogZG9mYmx1cjQgKTtcblx0XHRcdGNvbCArPSB0ZXh0dXJlMkQoIHRDb2xvciwgdlV2Lnh5ICsgKCB2ZWMyKCAgMC40LCAgIDAuMCAgKSAqIGFzcGVjdGNvcnJlY3QgKSAqIGRvZmJsdXI0ICk7XG5cdFx0XHRjb2wgKz0gdGV4dHVyZTJEKCB0Q29sb3IsIHZVdi54eSArICggdmVjMiggIDAuMjksIC0wLjI5ICkgKiBhc3BlY3Rjb3JyZWN0ICkgKiBkb2ZibHVyNCApO1xuXHRcdFx0Y29sICs9IHRleHR1cmUyRCggdENvbG9yLCB2VXYueHkgKyAoIHZlYzIoICAwLjAsICAtMC40ICApICogYXNwZWN0Y29ycmVjdCApICogZG9mYmx1cjQgKTtcblx0XHRcdGNvbCArPSB0ZXh0dXJlMkQoIHRDb2xvciwgdlV2Lnh5ICsgKCB2ZWMyKCAtMC4yOSwgIDAuMjkgKSAqIGFzcGVjdGNvcnJlY3QgKSAqIGRvZmJsdXI0ICk7XG5cdFx0XHRjb2wgKz0gdGV4dHVyZTJEKCB0Q29sb3IsIHZVdi54eSArICggdmVjMiggLTAuNCwgICAwLjAgICkgKiBhc3BlY3Rjb3JyZWN0ICkgKiBkb2ZibHVyNCApO1xuXHRcdFx0Y29sICs9IHRleHR1cmUyRCggdENvbG9yLCB2VXYueHkgKyAoIHZlYzIoIC0wLjI5LCAtMC4yOSApICogYXNwZWN0Y29ycmVjdCApICogZG9mYmx1cjQgKTtcblx0XHRcdGNvbCArPSB0ZXh0dXJlMkQoIHRDb2xvciwgdlV2Lnh5ICsgKCB2ZWMyKCAgMC4wLCAgIDAuNCAgKSAqIGFzcGVjdGNvcnJlY3QgKSAqIGRvZmJsdXI0ICk7XG5cblx0XHRcdGdsX0ZyYWdDb2xvciA9IGNvbCAvIDQxLjA7XG5cdFx0XHRnbF9GcmFnQ29sb3IuYSA9IDEuMDtcblxuXHRcdH1gXG5cbn07XG5cbmV4cG9ydCB7IEJva2VoU2hhZGVyIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImJva2VoXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2x0anNfZm91cnRoXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2x0anNfZm91cnRoXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9idWlsZF90aHJlZV9tb2R1bGVfanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9jb250cm9sc19PcmJpdENvbnRyb2xzX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc19saWwtZ3VpX2Rpc3RfbGlsLWd1aV9lc21fanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9wb3N0cHJvY2Vzc2luZ19FZmZlY3RDb21wb3Nlcl9qcy1ub2RlX21vZHVsZXNfdGhyZWVfZS1kZDk3NzdcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9wb3N0cHJvY2Vzc2luZ19VbnJlYWxCbG9vbVBhc3NfanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9wb3N0cHJvY2Vzc2luZ19CbG9vbVBhc3NfanMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbC05YmRlNTdcIixcInNhbXBsZXNfYm9vdHN0cmFwX2Jvb3RzdHJhcF9qcy1zYW1wbGVzX2NoYXB0ZXJzX2NoYXB0ZXItMTFfdXRpbF9wYXNzLWNvbnRyb2xzX2pzLXNhbXBsZXNfY29udC1iMmZlZDFcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItMTEvYm9rZWguanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
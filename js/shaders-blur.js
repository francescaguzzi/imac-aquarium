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

/***/ "./samples/chapters/chapter-11/shaders-blur.js"
/*!*****************************************************!*\
  !*** ./samples/chapters/chapter-11/shaders-blur.js ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_standard_scene_empty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/standard-scene-empty */ "./samples/chapters/chapter-11/util/standard-scene-empty.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var three_examples_jsm_postprocessing_EffectComposer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/postprocessing/EffectComposer */ "./node_modules/three/examples/jsm/postprocessing/EffectComposer.js");
/* harmony import */ var three_examples_jsm_postprocessing_RenderPass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/jsm/postprocessing/RenderPass */ "./node_modules/three/examples/jsm/postprocessing/RenderPass.js");
/* harmony import */ var three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three/examples/jsm/postprocessing/ShaderPass */ "./node_modules/three/examples/jsm/postprocessing/ShaderPass.js");
/* harmony import */ var three_examples_jsm_shaders_CopyShader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! three/examples/jsm/shaders/CopyShader */ "./node_modules/three/examples/jsm/shaders/CopyShader.js");
/* harmony import */ var three_examples_jsm_shaders_HorizontalBlurShader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! three/examples/jsm/shaders/HorizontalBlurShader */ "./node_modules/three/examples/jsm/shaders/HorizontalBlurShader.js");
/* harmony import */ var three_examples_jsm_shaders_VerticalBlurShader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! three/examples/jsm/shaders/VerticalBlurShader */ "./node_modules/three/examples/jsm/shaders/VerticalBlurShader.js");
/* harmony import */ var three_examples_jsm_shaders_HorizontalTiltShiftShader__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! three/examples/jsm/shaders/HorizontalTiltShiftShader */ "./node_modules/three/examples/jsm/shaders/HorizontalTiltShiftShader.js");
/* harmony import */ var three_examples_jsm_shaders_VerticalTiltShiftShader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! three/examples/jsm/shaders/VerticalTiltShiftShader */ "./node_modules/three/examples/jsm/shaders/VerticalTiltShiftShader.js");
/* harmony import */ var three_examples_jsm_shaders_TriangleBlurShader__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! three/examples/jsm/shaders/TriangleBlurShader */ "./node_modules/three/examples/jsm/shaders/TriangleBlurShader.js");
/* harmony import */ var three_examples_jsm_shaders_FocusShader__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! three/examples/jsm/shaders/FocusShader */ "./node_modules/three/examples/jsm/shaders/FocusShader.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _util_pass_controls__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./util/pass-controls */ "./samples/chapters/chapter-11/util/pass-controls.js");
/* harmony import */ var _bootstrap_floor__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../bootstrap/floor */ "./samples/bootstrap/floor.js");



















const effectCopy = new three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_4__.ShaderPass(three_examples_jsm_shaders_CopyShader__WEBPACK_IMPORTED_MODULE_5__.CopyShader)
effectCopy.renderToScreen = true
const horBlurShader = new three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_4__.ShaderPass(three_examples_jsm_shaders_HorizontalBlurShader__WEBPACK_IMPORTED_MODULE_6__.HorizontalBlurShader)
const verBlurShader = new three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_4__.ShaderPass(three_examples_jsm_shaders_VerticalBlurShader__WEBPACK_IMPORTED_MODULE_7__.VerticalBlurShader)
const horTiltShiftShader = new three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_4__.ShaderPass(three_examples_jsm_shaders_HorizontalTiltShiftShader__WEBPACK_IMPORTED_MODULE_8__.HorizontalTiltShiftShader)
const verTiltShiftShader = new three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_4__.ShaderPass(three_examples_jsm_shaders_VerticalTiltShiftShader__WEBPACK_IMPORTED_MODULE_9__.VerticalTiltShiftShader)
const focusShader = new three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_4__.ShaderPass(three_examples_jsm_shaders_FocusShader__WEBPACK_IMPORTED_MODULE_11__.FocusShader)

const setupComposer = (renderer, scene, camera) => {
  const composer = new three_examples_jsm_postprocessing_EffectComposer__WEBPACK_IMPORTED_MODULE_2__.EffectComposer(renderer)
  composer.addPass(new three_examples_jsm_postprocessing_RenderPass__WEBPACK_IMPORTED_MODULE_3__.RenderPass(scene, camera))
  composer.addPass(effectCopy)
  composer.addPass(horBlurShader)
  composer.addPass(verBlurShader)
  composer.addPass(horTiltShiftShader)
  composer.addPass(verTiltShiftShader)
  composer.addPass(focusShader)
  composer.addPass(effectCopy)
  return composer
}

const animate = (renderer, composer) => {
  requestAnimationFrame(() => animate(renderer, composer))
  composer.render()
}

;(0,_util_standard_scene_empty__WEBPACK_IMPORTED_MODULE_0__.bootstrapMeshScene)({
  initializeScene: (scene) => {
    ;(0,_bootstrap_floor__WEBPACK_IMPORTED_MODULE_14__.foreverPlane)(scene)
    // add a whole lot of boxes
    const totalWidth = 20
    const totalDepth = 20
    const nBoxes = 51
    const mBoxes = 51
    const colors = [0x66ff00, 0x6600ff, 0x0066ff, 0xff6600, 0xff0066]
    for (let i = 0; i < nBoxes; i++) {
      for (let j = 0; j < mBoxes; j++) {
        const box = new three__WEBPACK_IMPORTED_MODULE_12__.BoxGeometry(0.3, 0.3, 0.3)
        const mat = new three__WEBPACK_IMPORTED_MODULE_12__.MeshStandardMaterial({
          color: colors[Math.round(Math.random() * 100) % 5],
          roughness: 0.6
        })
        const mesh = new three__WEBPACK_IMPORTED_MODULE_12__.Mesh(box, mat)
        mesh.position.z = -(totalDepth / 2) + (totalDepth / mBoxes) * j
        mesh.position.x = -(totalWidth / 2) + (totalWidth / nBoxes) * i
        mesh.position.y = -2
        mesh.castShadow = true
        scene.add(mesh)
      }
    }
  },
  addControls: (camera, renderer, scene, gui) => {
    camera.position.y = 3
    camera.position.x = 0
    camera.position.z = 1

    ;(0,_util_pass_controls__WEBPACK_IMPORTED_MODULE_13__.addShaderControl)(gui, 'horizontalBlur', horBlurShader, { floats: [{ key: 'h', from: 0, to: 0.01, step: 0.0001 }] })
    ;(0,_util_pass_controls__WEBPACK_IMPORTED_MODULE_13__.addShaderControl)(gui, 'verticalBlur', verBlurShader, { floats: [{ key: 'v', from: 0, to: 0.01, step: 0.0001 }] })
    ;(0,_util_pass_controls__WEBPACK_IMPORTED_MODULE_13__.addShaderControl)(gui, 'horizontalTiltShift', horTiltShiftShader, {
      floats: [
        { key: 'r', from: 0, to: 1, step: 0.01 },
        { key: 'h', from: 0, to: 0.01, step: 0.0001 }
      ]
    })
    ;(0,_util_pass_controls__WEBPACK_IMPORTED_MODULE_13__.addShaderControl)(gui, 'verticalTiltShift', verTiltShiftShader, {
      floats: [
        { key: 'r', from: 0, to: 1, step: 0.01 },
        { key: 'v', from: 0, to: 0.01, step: 0.0001 }
      ]
    })
    ;(0,_util_pass_controls__WEBPACK_IMPORTED_MODULE_13__.addShaderControl)(gui, 'focus', focusShader, {
      floats: [
        { key: 'sampleDistance', from: 0, to: 10, step: 0.01 },
        { key: 'waveFactor', from: 0, to: 0.005, step: 0.0001 }
      ]
    })

    new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1__.OrbitControls(camera, renderer.domElement)
  },
  initializeComposer: (renderer, scene, camera) => setupComposer(renderer, scene, camera),
  animate: (renderer, composer, mixer, clock) => animate(renderer, composer, mixer, clock)
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

/***/ "./node_modules/three/examples/jsm/shaders/FocusShader.js"
/*!****************************************************************!*\
  !*** ./node_modules/three/examples/jsm/shaders/FocusShader.js ***!
  \****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FocusShader: () => (/* binding */ FocusShader)
/* harmony export */ });
/**
 * Focus shader
 * based on PaintEffect postprocess from ro.me
 * http://code.google.com/p/3-dreams-of-black/source/browse/deploy/js/effects/PaintEffect.js
 */

const FocusShader = {

	uniforms: {

		'tDiffuse': { value: null },
		'screenWidth': { value: 1024 },
		'screenHeight': { value: 1024 },
		'sampleDistance': { value: 0.94 },
		'waveFactor': { value: 0.00125 }

	},

	vertexShader: /* glsl */`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

	fragmentShader: /* glsl */`

		uniform float screenWidth;
		uniform float screenHeight;
		uniform float sampleDistance;
		uniform float waveFactor;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 color, org, tmp, add;
			float sample_dist, f;
			vec2 vin;
			vec2 uv = vUv;

			add = color = org = texture2D( tDiffuse, uv );

			vin = ( uv - vec2( 0.5 ) ) * vec2( 1.4 );
			sample_dist = dot( vin, vin ) * 2.0;

			f = ( waveFactor * 100.0 + sample_dist ) * sampleDistance * 4.0;

			vec2 sampleSize = vec2(  1.0 / screenWidth, 1.0 / screenHeight ) * vec2( f );

			add += tmp = texture2D( tDiffuse, uv + vec2( 0.111964, 0.993712 ) * sampleSize );
			if( tmp.b < color.b ) color = tmp;

			add += tmp = texture2D( tDiffuse, uv + vec2( 0.846724, 0.532032 ) * sampleSize );
			if( tmp.b < color.b ) color = tmp;

			add += tmp = texture2D( tDiffuse, uv + vec2( 0.943883, -0.330279 ) * sampleSize );
			if( tmp.b < color.b ) color = tmp;

			add += tmp = texture2D( tDiffuse, uv + vec2( 0.330279, -0.943883 ) * sampleSize );
			if( tmp.b < color.b ) color = tmp;

			add += tmp = texture2D( tDiffuse, uv + vec2( -0.532032, -0.846724 ) * sampleSize );
			if( tmp.b < color.b ) color = tmp;

			add += tmp = texture2D( tDiffuse, uv + vec2( -0.993712, -0.111964 ) * sampleSize );
			if( tmp.b < color.b ) color = tmp;

			add += tmp = texture2D( tDiffuse, uv + vec2( -0.707107, 0.707107 ) * sampleSize );
			if( tmp.b < color.b ) color = tmp;

			color = color * vec4( 2.0 ) - ( add / vec4( 8.0 ) );
			color = color + ( add / vec4( 8.0 ) - color ) * ( vec4( 1.0 ) - vec4( sample_dist * 0.5 ) );

			gl_FragColor = vec4( color.rgb * color.rgb * vec3( 0.95 ) + color.rgb, 1.0 );

		}`

};




/***/ },

/***/ "./node_modules/three/examples/jsm/shaders/HorizontalBlurShader.js"
/*!*************************************************************************!*\
  !*** ./node_modules/three/examples/jsm/shaders/HorizontalBlurShader.js ***!
  \*************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HorizontalBlurShader: () => (/* binding */ HorizontalBlurShader)
/* harmony export */ });
/**
 * Two pass Gaussian blur filter (horizontal and vertical blur shaders)
 * - see http://www.cake23.de/traveling-wavefronts-lit-up.html
 *
 * - 9 samples per pass
 * - standard deviation 2.7
 * - "h" and "v" parameters should be set to "1 / width" and "1 / height"
 */

const HorizontalBlurShader = {

	uniforms: {

		'tDiffuse': { value: null },
		'h': { value: 1.0 / 512.0 }

	},

	vertexShader: /* glsl */`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

	fragmentShader: /* glsl */`

		uniform sampler2D tDiffuse;
		uniform float h;

		varying vec2 vUv;

		void main() {

			vec4 sum = vec4( 0.0 );

			sum += texture2D( tDiffuse, vec2( vUv.x - 4.0 * h, vUv.y ) ) * 0.051;
			sum += texture2D( tDiffuse, vec2( vUv.x - 3.0 * h, vUv.y ) ) * 0.0918;
			sum += texture2D( tDiffuse, vec2( vUv.x - 2.0 * h, vUv.y ) ) * 0.12245;
			sum += texture2D( tDiffuse, vec2( vUv.x - 1.0 * h, vUv.y ) ) * 0.1531;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
			sum += texture2D( tDiffuse, vec2( vUv.x + 1.0 * h, vUv.y ) ) * 0.1531;
			sum += texture2D( tDiffuse, vec2( vUv.x + 2.0 * h, vUv.y ) ) * 0.12245;
			sum += texture2D( tDiffuse, vec2( vUv.x + 3.0 * h, vUv.y ) ) * 0.0918;
			sum += texture2D( tDiffuse, vec2( vUv.x + 4.0 * h, vUv.y ) ) * 0.051;

			gl_FragColor = sum;

		}`

};




/***/ },

/***/ "./node_modules/three/examples/jsm/shaders/HorizontalTiltShiftShader.js"
/*!******************************************************************************!*\
  !*** ./node_modules/three/examples/jsm/shaders/HorizontalTiltShiftShader.js ***!
  \******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HorizontalTiltShiftShader: () => (/* binding */ HorizontalTiltShiftShader)
/* harmony export */ });
/**
 * Simple fake tilt-shift effect, modulating two pass Gaussian blur (see above) by vertical position
 *
 * - 9 samples per pass
 * - standard deviation 2.7
 * - "h" and "v" parameters should be set to "1 / width" and "1 / height"
 * - "r" parameter control where "focused" horizontal line lies
 */

const HorizontalTiltShiftShader = {

	uniforms: {

		'tDiffuse': { value: null },
		'h': { value: 1.0 / 512.0 },
		'r': { value: 0.35 }

	},

	vertexShader: /* glsl */`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

	fragmentShader: /* glsl */`

		uniform sampler2D tDiffuse;
		uniform float h;
		uniform float r;

		varying vec2 vUv;

		void main() {

			vec4 sum = vec4( 0.0 );

			float hh = h * abs( r - vUv.y );

			sum += texture2D( tDiffuse, vec2( vUv.x - 4.0 * hh, vUv.y ) ) * 0.051;
			sum += texture2D( tDiffuse, vec2( vUv.x - 3.0 * hh, vUv.y ) ) * 0.0918;
			sum += texture2D( tDiffuse, vec2( vUv.x - 2.0 * hh, vUv.y ) ) * 0.12245;
			sum += texture2D( tDiffuse, vec2( vUv.x - 1.0 * hh, vUv.y ) ) * 0.1531;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
			sum += texture2D( tDiffuse, vec2( vUv.x + 1.0 * hh, vUv.y ) ) * 0.1531;
			sum += texture2D( tDiffuse, vec2( vUv.x + 2.0 * hh, vUv.y ) ) * 0.12245;
			sum += texture2D( tDiffuse, vec2( vUv.x + 3.0 * hh, vUv.y ) ) * 0.0918;
			sum += texture2D( tDiffuse, vec2( vUv.x + 4.0 * hh, vUv.y ) ) * 0.051;

			gl_FragColor = sum;

		}`

};




/***/ },

/***/ "./node_modules/three/examples/jsm/shaders/TriangleBlurShader.js"
/*!***********************************************************************!*\
  !*** ./node_modules/three/examples/jsm/shaders/TriangleBlurShader.js ***!
  \***********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TriangleBlurShader: () => (/* binding */ TriangleBlurShader)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");


/**
 * Triangle blur shader
 * based on glfx.js triangle blur shader
 * https://github.com/evanw/glfx.js
 *
 * A basic blur filter, which convolves the image with a
 * pyramid filter. The pyramid filter is separable and is applied as two
 * perpendicular triangle filters.
 */

const TriangleBlurShader = {

	uniforms: {

		'texture': { value: null },
		'delta': { value: new three__WEBPACK_IMPORTED_MODULE_0__.Vector2( 1, 1 ) }

	},

	vertexShader: /* glsl */`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

	fragmentShader: /* glsl */`

		#include <common>

		#define ITERATIONS 10.0

		uniform sampler2D texture;
		uniform vec2 delta;

		varying vec2 vUv;

		void main() {

			vec4 color = vec4( 0.0 );

			float total = 0.0;

		// randomize the lookup values to hide the fixed number of samples

			float offset = rand( vUv );

			for ( float t = -ITERATIONS; t <= ITERATIONS; t ++ ) {

				float percent = ( t + offset - 0.5 ) / ITERATIONS;
				float weight = 1.0 - abs( percent );

				color += texture2D( texture, vUv + delta * percent ) * weight;
				total += weight;

			}

			gl_FragColor = color / total;

		}`

};




/***/ },

/***/ "./node_modules/three/examples/jsm/shaders/VerticalBlurShader.js"
/*!***********************************************************************!*\
  !*** ./node_modules/three/examples/jsm/shaders/VerticalBlurShader.js ***!
  \***********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VerticalBlurShader: () => (/* binding */ VerticalBlurShader)
/* harmony export */ });
/**
 * Two pass Gaussian blur filter (horizontal and vertical blur shaders)
 * - see http://www.cake23.de/traveling-wavefronts-lit-up.html
 *
 * - 9 samples per pass
 * - standard deviation 2.7
 * - "h" and "v" parameters should be set to "1 / width" and "1 / height"
 */

const VerticalBlurShader = {

	uniforms: {

		'tDiffuse': { value: null },
		'v': { value: 1.0 / 512.0 }

	},

	vertexShader: /* glsl */`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

	fragmentShader: /* glsl */`

		uniform sampler2D tDiffuse;
		uniform float v;

		varying vec2 vUv;

		void main() {

			vec4 sum = vec4( 0.0 );

			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * v ) ) * 0.051;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * v ) ) * 0.0918;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * v ) ) * 0.12245;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * v ) ) * 0.1531;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * v ) ) * 0.1531;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * v ) ) * 0.12245;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * v ) ) * 0.0918;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * v ) ) * 0.051;

			gl_FragColor = sum;

		}`

};




/***/ },

/***/ "./node_modules/three/examples/jsm/shaders/VerticalTiltShiftShader.js"
/*!****************************************************************************!*\
  !*** ./node_modules/three/examples/jsm/shaders/VerticalTiltShiftShader.js ***!
  \****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VerticalTiltShiftShader: () => (/* binding */ VerticalTiltShiftShader)
/* harmony export */ });
/**
 * Simple fake tilt-shift effect, modulating two pass Gaussian blur (see above) by vertical position
 *
 * - 9 samples per pass
 * - standard deviation 2.7
 * - "h" and "v" parameters should be set to "1 / width" and "1 / height"
 * - "r" parameter control where "focused" horizontal line lies
 */

const VerticalTiltShiftShader = {

	uniforms: {

		'tDiffuse': { value: null },
		'v': { value: 1.0 / 512.0 },
		'r': { value: 0.35 }

	},

	vertexShader: /* glsl */`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

	fragmentShader: /* glsl */`

		uniform sampler2D tDiffuse;
		uniform float v;
		uniform float r;

		varying vec2 vUv;

		void main() {

			vec4 sum = vec4( 0.0 );

			float vv = v * abs( r - vUv.y );

			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * vv ) ) * 0.051;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * vv ) ) * 0.0918;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * vv ) ) * 0.12245;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * vv ) ) * 0.1531;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * vv ) ) * 0.1531;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * vv ) ) * 0.12245;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * vv ) ) * 0.0918;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * vv ) ) * 0.051;

			gl_FragColor = sum;

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
/******/ 			"shaders-blur": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","vendors-node_modules_three_examples_jsm_postprocessing_EffectComposer_js-node_modules_three_e-dd9777","vendors-node_modules_three_examples_jsm_postprocessing_UnrealBloomPass_js","vendors-node_modules_three_examples_jsm_postprocessing_BloomPass_js-node_modules_three_exampl-9bde57","samples_bootstrap_bootstrap_js-samples_chapters_chapter-11_util_pass-controls_js-samples_cont-b2fed1"], () => (__webpack_require__("./samples/chapters/chapter-11/shaders-blur.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7V0FDQTtXQUNBO1dBQ0EsK0JBQStCLHdDQUF3QztXQUN2RTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlCQUFpQixxQkFBcUI7V0FDdEM7V0FDQTtXQUNBLGtCQUFrQixxQkFBcUI7V0FDdkM7V0FDQTtXQUNBLEtBQUs7V0FDTDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRTs7Ozs7V0MzQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQSw0Rzs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9ib290c3RyYXAvZmxvb3IuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItMTEvc2hhZGVycy1ibHVyLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTExL3V0aWwvc3RhbmRhcmQtc2NlbmUtZW1wdHkuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9ub2RlX21vZHVsZXMvdGhyZWUvZXhhbXBsZXMvanNtL3NoYWRlcnMvRm9jdXNTaGFkZXIuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9ub2RlX21vZHVsZXMvdGhyZWUvZXhhbXBsZXMvanNtL3NoYWRlcnMvSG9yaXpvbnRhbEJsdXJTaGFkZXIuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9ub2RlX21vZHVsZXMvdGhyZWUvZXhhbXBsZXMvanNtL3NoYWRlcnMvSG9yaXpvbnRhbFRpbHRTaGlmdFNoYWRlci5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL25vZGVfbW9kdWxlcy90aHJlZS9leGFtcGxlcy9qc20vc2hhZGVycy9UcmlhbmdsZUJsdXJTaGFkZXIuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9ub2RlX21vZHVsZXMvdGhyZWUvZXhhbXBsZXMvanNtL3NoYWRlcnMvVmVydGljYWxCbHVyU2hhZGVyLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vbm9kZV9tb2R1bGVzL3RocmVlL2V4YW1wbGVzL2pzbS9zaGFkZXJzL1ZlcnRpY2FsVGlsdFNoaWZ0U2hhZGVyLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5cbmV4cG9ydCBjb25zdCBmb3JldmVyUGxhbmUgPSAoc2NlbmUpID0+IHtcbiAgY29uc3QgZ2VvID0gbmV3IFRIUkVFLlBsYW5lQnVmZmVyR2VvbWV0cnkoMTAwMDAsIDEwMDAwKVxuICBjb25zdCBtYXQgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7XG4gICAgY29sb3I6IDB4ZmZmZmZmXG4gIH0pXG4gIGNvbnN0IG1lc2ggPSBuZXcgVEhSRUUuTWVzaChnZW8sIG1hdClcbiAgbWVzaC5wb3NpdGlvbi5zZXQoMCwgLTIsIDApXG4gIG1lc2gucm90YXRpb24uc2V0KE1hdGguUEkgLyAtMiwgMCwgMClcbiAgbWVzaC5yZWNlaXZlU2hhZG93ID0gdHJ1ZVxuICBtZXNoLm5hbWUgPSAnZm9yZXZlci1mbG9vcidcbiAgc2NlbmUuYWRkKG1lc2gpXG5cbiAgcmV0dXJuIG1lc2hcbn1cblxuZXhwb3J0IGNvbnN0IGZsb2F0aW5nRmxvb3IgPSAoc2NlbmUsIHNpemUpID0+IHtcbiAgY29uc3QgcyA9IHNpemUgPyBzaXplIDogNlxuICBjb25zdCBnZW8gPSBuZXcgVEhSRUUuQm94QnVmZmVyR2VvbWV0cnkocywgMC4yNSwgcywgMTAsIDEwLCAxMClcbiAgY29uc3QgbWF0ID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcbiAgICBjb2xvcjogMHhkZGRkZGRcbiAgfSlcbiAgY29uc3QgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlbywgbWF0KVxuICBtZXNoLnBvc2l0aW9uLnNldCgwLCAtMiwgLTEpXG4gIG1lc2gucmVjZWl2ZVNoYWRvdyA9IHRydWVcbiAgbWVzaC5uYW1lID0gJ2Zsb2F0aW5nLWZsb29yJ1xuICBzY2VuZS5hZGQobWVzaClcblxuICByZXR1cm4gbWVzaFxufVxuIiwiaW1wb3J0IHsgYm9vdHN0cmFwTWVzaFNjZW5lIH0gZnJvbSAnLi91dGlsL3N0YW5kYXJkLXNjZW5lLWVtcHR5J1xuaW1wb3J0IHsgT3JiaXRDb250cm9scyB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9jb250cm9scy9PcmJpdENvbnRyb2xzJ1xuXG5pbXBvcnQgeyBFZmZlY3RDb21wb3NlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9wb3N0cHJvY2Vzc2luZy9FZmZlY3RDb21wb3NlcidcbmltcG9ydCB7IFJlbmRlclBhc3MgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vcG9zdHByb2Nlc3NpbmcvUmVuZGVyUGFzcydcbmltcG9ydCB7IFNoYWRlclBhc3MgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vcG9zdHByb2Nlc3NpbmcvU2hhZGVyUGFzcydcbmltcG9ydCB7IENvcHlTaGFkZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vc2hhZGVycy9Db3B5U2hhZGVyJ1xuXG5pbXBvcnQgeyBIb3Jpem9udGFsQmx1clNoYWRlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9zaGFkZXJzL0hvcml6b250YWxCbHVyU2hhZGVyJ1xuaW1wb3J0IHsgVmVydGljYWxCbHVyU2hhZGVyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL3NoYWRlcnMvVmVydGljYWxCbHVyU2hhZGVyJ1xuaW1wb3J0IHsgSG9yaXpvbnRhbFRpbHRTaGlmdFNoYWRlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9zaGFkZXJzL0hvcml6b250YWxUaWx0U2hpZnRTaGFkZXInXG5pbXBvcnQgeyBWZXJ0aWNhbFRpbHRTaGlmdFNoYWRlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9zaGFkZXJzL1ZlcnRpY2FsVGlsdFNoaWZ0U2hhZGVyJ1xuaW1wb3J0IHsgVHJpYW5nbGVCbHVyU2hhZGVyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL3NoYWRlcnMvVHJpYW5nbGVCbHVyU2hhZGVyJ1xuaW1wb3J0IHsgRm9jdXNTaGFkZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vc2hhZGVycy9Gb2N1c1NoYWRlcidcblxuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5pbXBvcnQgeyBhZGRTaGFkZXJDb250cm9sIH0gZnJvbSAnLi91dGlsL3Bhc3MtY29udHJvbHMnXG5pbXBvcnQgeyBmbG9hdGluZ0Zsb29yLCBmb3JldmVyUGxhbmUgfSBmcm9tICcuLi8uLi9ib290c3RyYXAvZmxvb3InXG5cbmNvbnN0IGVmZmVjdENvcHkgPSBuZXcgU2hhZGVyUGFzcyhDb3B5U2hhZGVyKVxuZWZmZWN0Q29weS5yZW5kZXJUb1NjcmVlbiA9IHRydWVcbmNvbnN0IGhvckJsdXJTaGFkZXIgPSBuZXcgU2hhZGVyUGFzcyhIb3Jpem9udGFsQmx1clNoYWRlcilcbmNvbnN0IHZlckJsdXJTaGFkZXIgPSBuZXcgU2hhZGVyUGFzcyhWZXJ0aWNhbEJsdXJTaGFkZXIpXG5jb25zdCBob3JUaWx0U2hpZnRTaGFkZXIgPSBuZXcgU2hhZGVyUGFzcyhIb3Jpem9udGFsVGlsdFNoaWZ0U2hhZGVyKVxuY29uc3QgdmVyVGlsdFNoaWZ0U2hhZGVyID0gbmV3IFNoYWRlclBhc3MoVmVydGljYWxUaWx0U2hpZnRTaGFkZXIpXG5jb25zdCBmb2N1c1NoYWRlciA9IG5ldyBTaGFkZXJQYXNzKEZvY3VzU2hhZGVyKVxuXG5jb25zdCBzZXR1cENvbXBvc2VyID0gKHJlbmRlcmVyLCBzY2VuZSwgY2FtZXJhKSA9PiB7XG4gIGNvbnN0IGNvbXBvc2VyID0gbmV3IEVmZmVjdENvbXBvc2VyKHJlbmRlcmVyKVxuICBjb21wb3Nlci5hZGRQYXNzKG5ldyBSZW5kZXJQYXNzKHNjZW5lLCBjYW1lcmEpKVxuICBjb21wb3Nlci5hZGRQYXNzKGVmZmVjdENvcHkpXG4gIGNvbXBvc2VyLmFkZFBhc3MoaG9yQmx1clNoYWRlcilcbiAgY29tcG9zZXIuYWRkUGFzcyh2ZXJCbHVyU2hhZGVyKVxuICBjb21wb3Nlci5hZGRQYXNzKGhvclRpbHRTaGlmdFNoYWRlcilcbiAgY29tcG9zZXIuYWRkUGFzcyh2ZXJUaWx0U2hpZnRTaGFkZXIpXG4gIGNvbXBvc2VyLmFkZFBhc3MoZm9jdXNTaGFkZXIpXG4gIGNvbXBvc2VyLmFkZFBhc3MoZWZmZWN0Q29weSlcbiAgcmV0dXJuIGNvbXBvc2VyXG59XG5cbmNvbnN0IGFuaW1hdGUgPSAocmVuZGVyZXIsIGNvbXBvc2VyKSA9PiB7XG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBhbmltYXRlKHJlbmRlcmVyLCBjb21wb3NlcikpXG4gIGNvbXBvc2VyLnJlbmRlcigpXG59XG5cbmJvb3RzdHJhcE1lc2hTY2VuZSh7XG4gIGluaXRpYWxpemVTY2VuZTogKHNjZW5lKSA9PiB7XG4gICAgZm9yZXZlclBsYW5lKHNjZW5lKVxuICAgIC8vIGFkZCBhIHdob2xlIGxvdCBvZiBib3hlc1xuICAgIGNvbnN0IHRvdGFsV2lkdGggPSAyMFxuICAgIGNvbnN0IHRvdGFsRGVwdGggPSAyMFxuICAgIGNvbnN0IG5Cb3hlcyA9IDUxXG4gICAgY29uc3QgbUJveGVzID0gNTFcbiAgICBjb25zdCBjb2xvcnMgPSBbMHg2NmZmMDAsIDB4NjYwMGZmLCAweDAwNjZmZiwgMHhmZjY2MDAsIDB4ZmYwMDY2XVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbkJveGVzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbUJveGVzOyBqKyspIHtcbiAgICAgICAgY29uc3QgYm94ID0gbmV3IFRIUkVFLkJveEdlb21ldHJ5KDAuMywgMC4zLCAwLjMpXG4gICAgICAgIGNvbnN0IG1hdCA9IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7XG4gICAgICAgICAgY29sb3I6IGNvbG9yc1tNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAxMDApICUgNV0sXG4gICAgICAgICAgcm91Z2huZXNzOiAwLjZcbiAgICAgICAgfSlcbiAgICAgICAgY29uc3QgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGJveCwgbWF0KVxuICAgICAgICBtZXNoLnBvc2l0aW9uLnogPSAtKHRvdGFsRGVwdGggLyAyKSArICh0b3RhbERlcHRoIC8gbUJveGVzKSAqIGpcbiAgICAgICAgbWVzaC5wb3NpdGlvbi54ID0gLSh0b3RhbFdpZHRoIC8gMikgKyAodG90YWxXaWR0aCAvIG5Cb3hlcykgKiBpXG4gICAgICAgIG1lc2gucG9zaXRpb24ueSA9IC0yXG4gICAgICAgIG1lc2guY2FzdFNoYWRvdyA9IHRydWVcbiAgICAgICAgc2NlbmUuYWRkKG1lc2gpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBhZGRDb250cm9sczogKGNhbWVyYSwgcmVuZGVyZXIsIHNjZW5lLCBndWkpID0+IHtcbiAgICBjYW1lcmEucG9zaXRpb24ueSA9IDNcbiAgICBjYW1lcmEucG9zaXRpb24ueCA9IDBcbiAgICBjYW1lcmEucG9zaXRpb24ueiA9IDFcblxuICAgIGFkZFNoYWRlckNvbnRyb2woZ3VpLCAnaG9yaXpvbnRhbEJsdXInLCBob3JCbHVyU2hhZGVyLCB7IGZsb2F0czogW3sga2V5OiAnaCcsIGZyb206IDAsIHRvOiAwLjAxLCBzdGVwOiAwLjAwMDEgfV0gfSlcbiAgICBhZGRTaGFkZXJDb250cm9sKGd1aSwgJ3ZlcnRpY2FsQmx1cicsIHZlckJsdXJTaGFkZXIsIHsgZmxvYXRzOiBbeyBrZXk6ICd2JywgZnJvbTogMCwgdG86IDAuMDEsIHN0ZXA6IDAuMDAwMSB9XSB9KVxuICAgIGFkZFNoYWRlckNvbnRyb2woZ3VpLCAnaG9yaXpvbnRhbFRpbHRTaGlmdCcsIGhvclRpbHRTaGlmdFNoYWRlciwge1xuICAgICAgZmxvYXRzOiBbXG4gICAgICAgIHsga2V5OiAncicsIGZyb206IDAsIHRvOiAxLCBzdGVwOiAwLjAxIH0sXG4gICAgICAgIHsga2V5OiAnaCcsIGZyb206IDAsIHRvOiAwLjAxLCBzdGVwOiAwLjAwMDEgfVxuICAgICAgXVxuICAgIH0pXG4gICAgYWRkU2hhZGVyQ29udHJvbChndWksICd2ZXJ0aWNhbFRpbHRTaGlmdCcsIHZlclRpbHRTaGlmdFNoYWRlciwge1xuICAgICAgZmxvYXRzOiBbXG4gICAgICAgIHsga2V5OiAncicsIGZyb206IDAsIHRvOiAxLCBzdGVwOiAwLjAxIH0sXG4gICAgICAgIHsga2V5OiAndicsIGZyb206IDAsIHRvOiAwLjAxLCBzdGVwOiAwLjAwMDEgfVxuICAgICAgXVxuICAgIH0pXG4gICAgYWRkU2hhZGVyQ29udHJvbChndWksICdmb2N1cycsIGZvY3VzU2hhZGVyLCB7XG4gICAgICBmbG9hdHM6IFtcbiAgICAgICAgeyBrZXk6ICdzYW1wbGVEaXN0YW5jZScsIGZyb206IDAsIHRvOiAxMCwgc3RlcDogMC4wMSB9LFxuICAgICAgICB7IGtleTogJ3dhdmVGYWN0b3InLCBmcm9tOiAwLCB0bzogMC4wMDUsIHN0ZXA6IDAuMDAwMSB9XG4gICAgICBdXG4gICAgfSlcblxuICAgIG5ldyBPcmJpdENvbnRyb2xzKGNhbWVyYSwgcmVuZGVyZXIuZG9tRWxlbWVudClcbiAgfSxcbiAgaW5pdGlhbGl6ZUNvbXBvc2VyOiAocmVuZGVyZXIsIHNjZW5lLCBjYW1lcmEpID0+IHNldHVwQ29tcG9zZXIocmVuZGVyZXIsIHNjZW5lLCBjYW1lcmEpLFxuICBhbmltYXRlOiAocmVuZGVyZXIsIGNvbXBvc2VyLCBtaXhlciwgY2xvY2spID0+IGFuaW1hdGUocmVuZGVyZXIsIGNvbXBvc2VyLCBtaXhlciwgY2xvY2spXG59KS50aGVuKClcbiIsImltcG9ydCB7IGluaXRTY2VuZSB9IGZyb20gJy4uLy4uLy4uL2Jvb3RzdHJhcC9ib290c3RyYXAnXG5pbXBvcnQgeyBpbnRpYWxpemVSZW5kZXJlckNvbnRyb2xzIH0gZnJvbSAnLi4vLi4vLi4vY29udHJvbHMvcmVuZGVyZXItY29udHJvbCdcblxuaW1wb3J0IEdVSSBmcm9tICdsaWwtZ3VpJ1xuaW1wb3J0IHsgaW5pdGlhbGl6ZVNjZW5lQ29udHJvbHMgfSBmcm9tICcuLi8uLi8uLi9jb250cm9scy9zY2VuZS1jb250cm9scydcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuaW1wb3J0IHsgZmxvYXRpbmdGbG9vciB9IGZyb20gJy4uLy4uLy4uL2Jvb3RzdHJhcC9mbG9vcidcblxuZXhwb3J0IGNvbnN0IGJvb3RzdHJhcE1lc2hTY2VuZSA9IGFzeW5jICh7XG4gIHByb3ZpZGVHdWksXG4gIGJhY2tncm91bmRDb2xvcixcbiAgYWRkQ29udHJvbHMsXG4gIGluaXRpYWxpemVDb21wb3NlcixcbiAgYW5pbWF0ZSxcbiAgaW5pdGlhbGl6ZVNjZW5lXG59KSA9PiB7XG4gIGNvbnN0IHByb3BzID0ge1xuICAgIGJhY2tncm91bmRDb2xvcjogYmFja2dyb3VuZENvbG9yID8/IDB4ZmZmZmZmLFxuICAgIGRpc2FibGVEZWZhdWx0Q29udHJvbHM6IHRydWVcbiAgfVxuXG4gIGNvbnN0IGd1aSA9IG5ldyBHVUkoKVxuXG4gIGNvbnN0IGluaXQgPSBhc3luYyAoKSA9PiB7XG4gICAgaW5pdFNjZW5lKHByb3BzKSgoeyBzY2VuZSwgY2FtZXJhLCByZW5kZXJlciB9KSA9PiB7XG4gICAgICByZW5kZXJlci5zaGFkb3dNYXAudHlwZSA9IFRIUkVFLlBDRlNvZnRTaGFkb3dNYXBcbiAgICAgIGNhbWVyYS5wb3NpdGlvbi54ID0gLTNcbiAgICAgIGNhbWVyYS5wb3NpdGlvbi56ID0gOFxuICAgICAgY2FtZXJhLnBvc2l0aW9uLnkgPSAyXG5cbiAgICAgIGlmIChpbml0aWFsaXplU2NlbmUpIGluaXRpYWxpemVTY2VuZShzY2VuZSlcbiAgICAgIGludGlhbGl6ZVJlbmRlcmVyQ29udHJvbHMoZ3VpLCByZW5kZXJlcilcbiAgICAgIGluaXRpYWxpemVTY2VuZUNvbnRyb2xzKGd1aSwgc2NlbmUsIGZhbHNlKVxuXG4gICAgICBsZXQgY29tcG9zZXJcbiAgICAgIGlmIChpbml0aWFsaXplQ29tcG9zZXIpIHtcbiAgICAgICAgY29tcG9zZXIgPSBpbml0aWFsaXplQ29tcG9zZXIocmVuZGVyZXIsIHNjZW5lLCBjYW1lcmEpXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm92aWRlR3VpKSBwcm92aWRlR3VpKGd1aSlcbiAgICAgIGlmIChhZGRDb250cm9scykge1xuICAgICAgICBhZGRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLCBzY2VuZSwgZ3VpKVxuICAgICAgfVxuXG4gICAgICBhbmltYXRlKHJlbmRlcmVyLCBjb21wb3NlcilcbiAgICB9KVxuICB9XG5cbiAgaW5pdCgpLnRoZW4oKVxufVxuIiwiLyoqXG4gKiBGb2N1cyBzaGFkZXJcbiAqIGJhc2VkIG9uIFBhaW50RWZmZWN0IHBvc3Rwcm9jZXNzIGZyb20gcm8ubWVcbiAqIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC8zLWRyZWFtcy1vZi1ibGFjay9zb3VyY2UvYnJvd3NlL2RlcGxveS9qcy9lZmZlY3RzL1BhaW50RWZmZWN0LmpzXG4gKi9cblxuY29uc3QgRm9jdXNTaGFkZXIgPSB7XG5cblx0dW5pZm9ybXM6IHtcblxuXHRcdCd0RGlmZnVzZSc6IHsgdmFsdWU6IG51bGwgfSxcblx0XHQnc2NyZWVuV2lkdGgnOiB7IHZhbHVlOiAxMDI0IH0sXG5cdFx0J3NjcmVlbkhlaWdodCc6IHsgdmFsdWU6IDEwMjQgfSxcblx0XHQnc2FtcGxlRGlzdGFuY2UnOiB7IHZhbHVlOiAwLjk0IH0sXG5cdFx0J3dhdmVGYWN0b3InOiB7IHZhbHVlOiAwLjAwMTI1IH1cblxuXHR9LFxuXG5cdHZlcnRleFNoYWRlcjogLyogZ2xzbCAqL2BcblxuXHRcdHZhcnlpbmcgdmVjMiB2VXY7XG5cblx0XHR2b2lkIG1haW4oKSB7XG5cblx0XHRcdHZVdiA9IHV2O1xuXHRcdFx0Z2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogbW9kZWxWaWV3TWF0cml4ICogdmVjNCggcG9zaXRpb24sIDEuMCApO1xuXG5cdFx0fWAsXG5cblx0ZnJhZ21lbnRTaGFkZXI6IC8qIGdsc2wgKi9gXG5cblx0XHR1bmlmb3JtIGZsb2F0IHNjcmVlbldpZHRoO1xuXHRcdHVuaWZvcm0gZmxvYXQgc2NyZWVuSGVpZ2h0O1xuXHRcdHVuaWZvcm0gZmxvYXQgc2FtcGxlRGlzdGFuY2U7XG5cdFx0dW5pZm9ybSBmbG9hdCB3YXZlRmFjdG9yO1xuXG5cdFx0dW5pZm9ybSBzYW1wbGVyMkQgdERpZmZ1c2U7XG5cblx0XHR2YXJ5aW5nIHZlYzIgdlV2O1xuXG5cdFx0dm9pZCBtYWluKCkge1xuXG5cdFx0XHR2ZWM0IGNvbG9yLCBvcmcsIHRtcCwgYWRkO1xuXHRcdFx0ZmxvYXQgc2FtcGxlX2Rpc3QsIGY7XG5cdFx0XHR2ZWMyIHZpbjtcblx0XHRcdHZlYzIgdXYgPSB2VXY7XG5cblx0XHRcdGFkZCA9IGNvbG9yID0gb3JnID0gdGV4dHVyZTJEKCB0RGlmZnVzZSwgdXYgKTtcblxuXHRcdFx0dmluID0gKCB1diAtIHZlYzIoIDAuNSApICkgKiB2ZWMyKCAxLjQgKTtcblx0XHRcdHNhbXBsZV9kaXN0ID0gZG90KCB2aW4sIHZpbiApICogMi4wO1xuXG5cdFx0XHRmID0gKCB3YXZlRmFjdG9yICogMTAwLjAgKyBzYW1wbGVfZGlzdCApICogc2FtcGxlRGlzdGFuY2UgKiA0LjA7XG5cblx0XHRcdHZlYzIgc2FtcGxlU2l6ZSA9IHZlYzIoICAxLjAgLyBzY3JlZW5XaWR0aCwgMS4wIC8gc2NyZWVuSGVpZ2h0ICkgKiB2ZWMyKCBmICk7XG5cblx0XHRcdGFkZCArPSB0bXAgPSB0ZXh0dXJlMkQoIHREaWZmdXNlLCB1diArIHZlYzIoIDAuMTExOTY0LCAwLjk5MzcxMiApICogc2FtcGxlU2l6ZSApO1xuXHRcdFx0aWYoIHRtcC5iIDwgY29sb3IuYiApIGNvbG9yID0gdG1wO1xuXG5cdFx0XHRhZGQgKz0gdG1wID0gdGV4dHVyZTJEKCB0RGlmZnVzZSwgdXYgKyB2ZWMyKCAwLjg0NjcyNCwgMC41MzIwMzIgKSAqIHNhbXBsZVNpemUgKTtcblx0XHRcdGlmKCB0bXAuYiA8IGNvbG9yLmIgKSBjb2xvciA9IHRtcDtcblxuXHRcdFx0YWRkICs9IHRtcCA9IHRleHR1cmUyRCggdERpZmZ1c2UsIHV2ICsgdmVjMiggMC45NDM4ODMsIC0wLjMzMDI3OSApICogc2FtcGxlU2l6ZSApO1xuXHRcdFx0aWYoIHRtcC5iIDwgY29sb3IuYiApIGNvbG9yID0gdG1wO1xuXG5cdFx0XHRhZGQgKz0gdG1wID0gdGV4dHVyZTJEKCB0RGlmZnVzZSwgdXYgKyB2ZWMyKCAwLjMzMDI3OSwgLTAuOTQzODgzICkgKiBzYW1wbGVTaXplICk7XG5cdFx0XHRpZiggdG1wLmIgPCBjb2xvci5iICkgY29sb3IgPSB0bXA7XG5cblx0XHRcdGFkZCArPSB0bXAgPSB0ZXh0dXJlMkQoIHREaWZmdXNlLCB1diArIHZlYzIoIC0wLjUzMjAzMiwgLTAuODQ2NzI0ICkgKiBzYW1wbGVTaXplICk7XG5cdFx0XHRpZiggdG1wLmIgPCBjb2xvci5iICkgY29sb3IgPSB0bXA7XG5cblx0XHRcdGFkZCArPSB0bXAgPSB0ZXh0dXJlMkQoIHREaWZmdXNlLCB1diArIHZlYzIoIC0wLjk5MzcxMiwgLTAuMTExOTY0ICkgKiBzYW1wbGVTaXplICk7XG5cdFx0XHRpZiggdG1wLmIgPCBjb2xvci5iICkgY29sb3IgPSB0bXA7XG5cblx0XHRcdGFkZCArPSB0bXAgPSB0ZXh0dXJlMkQoIHREaWZmdXNlLCB1diArIHZlYzIoIC0wLjcwNzEwNywgMC43MDcxMDcgKSAqIHNhbXBsZVNpemUgKTtcblx0XHRcdGlmKCB0bXAuYiA8IGNvbG9yLmIgKSBjb2xvciA9IHRtcDtcblxuXHRcdFx0Y29sb3IgPSBjb2xvciAqIHZlYzQoIDIuMCApIC0gKCBhZGQgLyB2ZWM0KCA4LjAgKSApO1xuXHRcdFx0Y29sb3IgPSBjb2xvciArICggYWRkIC8gdmVjNCggOC4wICkgLSBjb2xvciApICogKCB2ZWM0KCAxLjAgKSAtIHZlYzQoIHNhbXBsZV9kaXN0ICogMC41ICkgKTtcblxuXHRcdFx0Z2xfRnJhZ0NvbG9yID0gdmVjNCggY29sb3IucmdiICogY29sb3IucmdiICogdmVjMyggMC45NSApICsgY29sb3IucmdiLCAxLjAgKTtcblxuXHRcdH1gXG5cbn07XG5cbmV4cG9ydCB7IEZvY3VzU2hhZGVyIH07XG4iLCIvKipcbiAqIFR3byBwYXNzIEdhdXNzaWFuIGJsdXIgZmlsdGVyIChob3Jpem9udGFsIGFuZCB2ZXJ0aWNhbCBibHVyIHNoYWRlcnMpXG4gKiAtIHNlZSBodHRwOi8vd3d3LmNha2UyMy5kZS90cmF2ZWxpbmctd2F2ZWZyb250cy1saXQtdXAuaHRtbFxuICpcbiAqIC0gOSBzYW1wbGVzIHBlciBwYXNzXG4gKiAtIHN0YW5kYXJkIGRldmlhdGlvbiAyLjdcbiAqIC0gXCJoXCIgYW5kIFwidlwiIHBhcmFtZXRlcnMgc2hvdWxkIGJlIHNldCB0byBcIjEgLyB3aWR0aFwiIGFuZCBcIjEgLyBoZWlnaHRcIlxuICovXG5cbmNvbnN0IEhvcml6b250YWxCbHVyU2hhZGVyID0ge1xuXG5cdHVuaWZvcm1zOiB7XG5cblx0XHQndERpZmZ1c2UnOiB7IHZhbHVlOiBudWxsIH0sXG5cdFx0J2gnOiB7IHZhbHVlOiAxLjAgLyA1MTIuMCB9XG5cblx0fSxcblxuXHR2ZXJ0ZXhTaGFkZXI6IC8qIGdsc2wgKi9gXG5cblx0XHR2YXJ5aW5nIHZlYzIgdlV2O1xuXG5cdFx0dm9pZCBtYWluKCkge1xuXG5cdFx0XHR2VXYgPSB1djtcblx0XHRcdGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIG1vZGVsVmlld01hdHJpeCAqIHZlYzQoIHBvc2l0aW9uLCAxLjAgKTtcblxuXHRcdH1gLFxuXG5cdGZyYWdtZW50U2hhZGVyOiAvKiBnbHNsICovYFxuXG5cdFx0dW5pZm9ybSBzYW1wbGVyMkQgdERpZmZ1c2U7XG5cdFx0dW5pZm9ybSBmbG9hdCBoO1xuXG5cdFx0dmFyeWluZyB2ZWMyIHZVdjtcblxuXHRcdHZvaWQgbWFpbigpIHtcblxuXHRcdFx0dmVjNCBzdW0gPSB2ZWM0KCAwLjAgKTtcblxuXHRcdFx0c3VtICs9IHRleHR1cmUyRCggdERpZmZ1c2UsIHZlYzIoIHZVdi54IC0gNC4wICogaCwgdlV2LnkgKSApICogMC4wNTE7XG5cdFx0XHRzdW0gKz0gdGV4dHVyZTJEKCB0RGlmZnVzZSwgdmVjMiggdlV2LnggLSAzLjAgKiBoLCB2VXYueSApICkgKiAwLjA5MTg7XG5cdFx0XHRzdW0gKz0gdGV4dHVyZTJEKCB0RGlmZnVzZSwgdmVjMiggdlV2LnggLSAyLjAgKiBoLCB2VXYueSApICkgKiAwLjEyMjQ1O1xuXHRcdFx0c3VtICs9IHRleHR1cmUyRCggdERpZmZ1c2UsIHZlYzIoIHZVdi54IC0gMS4wICogaCwgdlV2LnkgKSApICogMC4xNTMxO1xuXHRcdFx0c3VtICs9IHRleHR1cmUyRCggdERpZmZ1c2UsIHZlYzIoIHZVdi54LCB2VXYueSApICkgKiAwLjE2MzM7XG5cdFx0XHRzdW0gKz0gdGV4dHVyZTJEKCB0RGlmZnVzZSwgdmVjMiggdlV2LnggKyAxLjAgKiBoLCB2VXYueSApICkgKiAwLjE1MzE7XG5cdFx0XHRzdW0gKz0gdGV4dHVyZTJEKCB0RGlmZnVzZSwgdmVjMiggdlV2LnggKyAyLjAgKiBoLCB2VXYueSApICkgKiAwLjEyMjQ1O1xuXHRcdFx0c3VtICs9IHRleHR1cmUyRCggdERpZmZ1c2UsIHZlYzIoIHZVdi54ICsgMy4wICogaCwgdlV2LnkgKSApICogMC4wOTE4O1xuXHRcdFx0c3VtICs9IHRleHR1cmUyRCggdERpZmZ1c2UsIHZlYzIoIHZVdi54ICsgNC4wICogaCwgdlV2LnkgKSApICogMC4wNTE7XG5cblx0XHRcdGdsX0ZyYWdDb2xvciA9IHN1bTtcblxuXHRcdH1gXG5cbn07XG5cbmV4cG9ydCB7IEhvcml6b250YWxCbHVyU2hhZGVyIH07XG4iLCIvKipcbiAqIFNpbXBsZSBmYWtlIHRpbHQtc2hpZnQgZWZmZWN0LCBtb2R1bGF0aW5nIHR3byBwYXNzIEdhdXNzaWFuIGJsdXIgKHNlZSBhYm92ZSkgYnkgdmVydGljYWwgcG9zaXRpb25cbiAqXG4gKiAtIDkgc2FtcGxlcyBwZXIgcGFzc1xuICogLSBzdGFuZGFyZCBkZXZpYXRpb24gMi43XG4gKiAtIFwiaFwiIGFuZCBcInZcIiBwYXJhbWV0ZXJzIHNob3VsZCBiZSBzZXQgdG8gXCIxIC8gd2lkdGhcIiBhbmQgXCIxIC8gaGVpZ2h0XCJcbiAqIC0gXCJyXCIgcGFyYW1ldGVyIGNvbnRyb2wgd2hlcmUgXCJmb2N1c2VkXCIgaG9yaXpvbnRhbCBsaW5lIGxpZXNcbiAqL1xuXG5jb25zdCBIb3Jpem9udGFsVGlsdFNoaWZ0U2hhZGVyID0ge1xuXG5cdHVuaWZvcm1zOiB7XG5cblx0XHQndERpZmZ1c2UnOiB7IHZhbHVlOiBudWxsIH0sXG5cdFx0J2gnOiB7IHZhbHVlOiAxLjAgLyA1MTIuMCB9LFxuXHRcdCdyJzogeyB2YWx1ZTogMC4zNSB9XG5cblx0fSxcblxuXHR2ZXJ0ZXhTaGFkZXI6IC8qIGdsc2wgKi9gXG5cblx0XHR2YXJ5aW5nIHZlYzIgdlV2O1xuXG5cdFx0dm9pZCBtYWluKCkge1xuXG5cdFx0XHR2VXYgPSB1djtcblx0XHRcdGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIG1vZGVsVmlld01hdHJpeCAqIHZlYzQoIHBvc2l0aW9uLCAxLjAgKTtcblxuXHRcdH1gLFxuXG5cdGZyYWdtZW50U2hhZGVyOiAvKiBnbHNsICovYFxuXG5cdFx0dW5pZm9ybSBzYW1wbGVyMkQgdERpZmZ1c2U7XG5cdFx0dW5pZm9ybSBmbG9hdCBoO1xuXHRcdHVuaWZvcm0gZmxvYXQgcjtcblxuXHRcdHZhcnlpbmcgdmVjMiB2VXY7XG5cblx0XHR2b2lkIG1haW4oKSB7XG5cblx0XHRcdHZlYzQgc3VtID0gdmVjNCggMC4wICk7XG5cblx0XHRcdGZsb2F0IGhoID0gaCAqIGFicyggciAtIHZVdi55ICk7XG5cblx0XHRcdHN1bSArPSB0ZXh0dXJlMkQoIHREaWZmdXNlLCB2ZWMyKCB2VXYueCAtIDQuMCAqIGhoLCB2VXYueSApICkgKiAwLjA1MTtcblx0XHRcdHN1bSArPSB0ZXh0dXJlMkQoIHREaWZmdXNlLCB2ZWMyKCB2VXYueCAtIDMuMCAqIGhoLCB2VXYueSApICkgKiAwLjA5MTg7XG5cdFx0XHRzdW0gKz0gdGV4dHVyZTJEKCB0RGlmZnVzZSwgdmVjMiggdlV2LnggLSAyLjAgKiBoaCwgdlV2LnkgKSApICogMC4xMjI0NTtcblx0XHRcdHN1bSArPSB0ZXh0dXJlMkQoIHREaWZmdXNlLCB2ZWMyKCB2VXYueCAtIDEuMCAqIGhoLCB2VXYueSApICkgKiAwLjE1MzE7XG5cdFx0XHRzdW0gKz0gdGV4dHVyZTJEKCB0RGlmZnVzZSwgdmVjMiggdlV2LngsIHZVdi55ICkgKSAqIDAuMTYzMztcblx0XHRcdHN1bSArPSB0ZXh0dXJlMkQoIHREaWZmdXNlLCB2ZWMyKCB2VXYueCArIDEuMCAqIGhoLCB2VXYueSApICkgKiAwLjE1MzE7XG5cdFx0XHRzdW0gKz0gdGV4dHVyZTJEKCB0RGlmZnVzZSwgdmVjMiggdlV2LnggKyAyLjAgKiBoaCwgdlV2LnkgKSApICogMC4xMjI0NTtcblx0XHRcdHN1bSArPSB0ZXh0dXJlMkQoIHREaWZmdXNlLCB2ZWMyKCB2VXYueCArIDMuMCAqIGhoLCB2VXYueSApICkgKiAwLjA5MTg7XG5cdFx0XHRzdW0gKz0gdGV4dHVyZTJEKCB0RGlmZnVzZSwgdmVjMiggdlV2LnggKyA0LjAgKiBoaCwgdlV2LnkgKSApICogMC4wNTE7XG5cblx0XHRcdGdsX0ZyYWdDb2xvciA9IHN1bTtcblxuXHRcdH1gXG5cbn07XG5cbmV4cG9ydCB7IEhvcml6b250YWxUaWx0U2hpZnRTaGFkZXIgfTtcbiIsImltcG9ydCB7XG5cdFZlY3RvcjJcbn0gZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIFRyaWFuZ2xlIGJsdXIgc2hhZGVyXG4gKiBiYXNlZCBvbiBnbGZ4LmpzIHRyaWFuZ2xlIGJsdXIgc2hhZGVyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vZXZhbncvZ2xmeC5qc1xuICpcbiAqIEEgYmFzaWMgYmx1ciBmaWx0ZXIsIHdoaWNoIGNvbnZvbHZlcyB0aGUgaW1hZ2Ugd2l0aCBhXG4gKiBweXJhbWlkIGZpbHRlci4gVGhlIHB5cmFtaWQgZmlsdGVyIGlzIHNlcGFyYWJsZSBhbmQgaXMgYXBwbGllZCBhcyB0d29cbiAqIHBlcnBlbmRpY3VsYXIgdHJpYW5nbGUgZmlsdGVycy5cbiAqL1xuXG5jb25zdCBUcmlhbmdsZUJsdXJTaGFkZXIgPSB7XG5cblx0dW5pZm9ybXM6IHtcblxuXHRcdCd0ZXh0dXJlJzogeyB2YWx1ZTogbnVsbCB9LFxuXHRcdCdkZWx0YSc6IHsgdmFsdWU6IG5ldyBWZWN0b3IyKCAxLCAxICkgfVxuXG5cdH0sXG5cblx0dmVydGV4U2hhZGVyOiAvKiBnbHNsICovYFxuXG5cdFx0dmFyeWluZyB2ZWMyIHZVdjtcblxuXHRcdHZvaWQgbWFpbigpIHtcblxuXHRcdFx0dlV2ID0gdXY7XG5cdFx0XHRnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiBtb2RlbFZpZXdNYXRyaXggKiB2ZWM0KCBwb3NpdGlvbiwgMS4wICk7XG5cblx0XHR9YCxcblxuXHRmcmFnbWVudFNoYWRlcjogLyogZ2xzbCAqL2BcblxuXHRcdCNpbmNsdWRlIDxjb21tb24+XG5cblx0XHQjZGVmaW5lIElURVJBVElPTlMgMTAuMFxuXG5cdFx0dW5pZm9ybSBzYW1wbGVyMkQgdGV4dHVyZTtcblx0XHR1bmlmb3JtIHZlYzIgZGVsdGE7XG5cblx0XHR2YXJ5aW5nIHZlYzIgdlV2O1xuXG5cdFx0dm9pZCBtYWluKCkge1xuXG5cdFx0XHR2ZWM0IGNvbG9yID0gdmVjNCggMC4wICk7XG5cblx0XHRcdGZsb2F0IHRvdGFsID0gMC4wO1xuXG5cdFx0Ly8gcmFuZG9taXplIHRoZSBsb29rdXAgdmFsdWVzIHRvIGhpZGUgdGhlIGZpeGVkIG51bWJlciBvZiBzYW1wbGVzXG5cblx0XHRcdGZsb2F0IG9mZnNldCA9IHJhbmQoIHZVdiApO1xuXG5cdFx0XHRmb3IgKCBmbG9hdCB0ID0gLUlURVJBVElPTlM7IHQgPD0gSVRFUkFUSU9OUzsgdCArKyApIHtcblxuXHRcdFx0XHRmbG9hdCBwZXJjZW50ID0gKCB0ICsgb2Zmc2V0IC0gMC41ICkgLyBJVEVSQVRJT05TO1xuXHRcdFx0XHRmbG9hdCB3ZWlnaHQgPSAxLjAgLSBhYnMoIHBlcmNlbnQgKTtcblxuXHRcdFx0XHRjb2xvciArPSB0ZXh0dXJlMkQoIHRleHR1cmUsIHZVdiArIGRlbHRhICogcGVyY2VudCApICogd2VpZ2h0O1xuXHRcdFx0XHR0b3RhbCArPSB3ZWlnaHQ7XG5cblx0XHRcdH1cblxuXHRcdFx0Z2xfRnJhZ0NvbG9yID0gY29sb3IgLyB0b3RhbDtcblxuXHRcdH1gXG5cbn07XG5cbmV4cG9ydCB7IFRyaWFuZ2xlQmx1clNoYWRlciB9O1xuIiwiLyoqXG4gKiBUd28gcGFzcyBHYXVzc2lhbiBibHVyIGZpbHRlciAoaG9yaXpvbnRhbCBhbmQgdmVydGljYWwgYmx1ciBzaGFkZXJzKVxuICogLSBzZWUgaHR0cDovL3d3dy5jYWtlMjMuZGUvdHJhdmVsaW5nLXdhdmVmcm9udHMtbGl0LXVwLmh0bWxcbiAqXG4gKiAtIDkgc2FtcGxlcyBwZXIgcGFzc1xuICogLSBzdGFuZGFyZCBkZXZpYXRpb24gMi43XG4gKiAtIFwiaFwiIGFuZCBcInZcIiBwYXJhbWV0ZXJzIHNob3VsZCBiZSBzZXQgdG8gXCIxIC8gd2lkdGhcIiBhbmQgXCIxIC8gaGVpZ2h0XCJcbiAqL1xuXG5jb25zdCBWZXJ0aWNhbEJsdXJTaGFkZXIgPSB7XG5cblx0dW5pZm9ybXM6IHtcblxuXHRcdCd0RGlmZnVzZSc6IHsgdmFsdWU6IG51bGwgfSxcblx0XHQndic6IHsgdmFsdWU6IDEuMCAvIDUxMi4wIH1cblxuXHR9LFxuXG5cdHZlcnRleFNoYWRlcjogLyogZ2xzbCAqL2BcblxuXHRcdHZhcnlpbmcgdmVjMiB2VXY7XG5cblx0XHR2b2lkIG1haW4oKSB7XG5cblx0XHRcdHZVdiA9IHV2O1xuXHRcdFx0Z2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogbW9kZWxWaWV3TWF0cml4ICogdmVjNCggcG9zaXRpb24sIDEuMCApO1xuXG5cdFx0fWAsXG5cblx0ZnJhZ21lbnRTaGFkZXI6IC8qIGdsc2wgKi9gXG5cblx0XHR1bmlmb3JtIHNhbXBsZXIyRCB0RGlmZnVzZTtcblx0XHR1bmlmb3JtIGZsb2F0IHY7XG5cblx0XHR2YXJ5aW5nIHZlYzIgdlV2O1xuXG5cdFx0dm9pZCBtYWluKCkge1xuXG5cdFx0XHR2ZWM0IHN1bSA9IHZlYzQoIDAuMCApO1xuXG5cdFx0XHRzdW0gKz0gdGV4dHVyZTJEKCB0RGlmZnVzZSwgdmVjMiggdlV2LngsIHZVdi55IC0gNC4wICogdiApICkgKiAwLjA1MTtcblx0XHRcdHN1bSArPSB0ZXh0dXJlMkQoIHREaWZmdXNlLCB2ZWMyKCB2VXYueCwgdlV2LnkgLSAzLjAgKiB2ICkgKSAqIDAuMDkxODtcblx0XHRcdHN1bSArPSB0ZXh0dXJlMkQoIHREaWZmdXNlLCB2ZWMyKCB2VXYueCwgdlV2LnkgLSAyLjAgKiB2ICkgKSAqIDAuMTIyNDU7XG5cdFx0XHRzdW0gKz0gdGV4dHVyZTJEKCB0RGlmZnVzZSwgdmVjMiggdlV2LngsIHZVdi55IC0gMS4wICogdiApICkgKiAwLjE1MzE7XG5cdFx0XHRzdW0gKz0gdGV4dHVyZTJEKCB0RGlmZnVzZSwgdmVjMiggdlV2LngsIHZVdi55ICkgKSAqIDAuMTYzMztcblx0XHRcdHN1bSArPSB0ZXh0dXJlMkQoIHREaWZmdXNlLCB2ZWMyKCB2VXYueCwgdlV2LnkgKyAxLjAgKiB2ICkgKSAqIDAuMTUzMTtcblx0XHRcdHN1bSArPSB0ZXh0dXJlMkQoIHREaWZmdXNlLCB2ZWMyKCB2VXYueCwgdlV2LnkgKyAyLjAgKiB2ICkgKSAqIDAuMTIyNDU7XG5cdFx0XHRzdW0gKz0gdGV4dHVyZTJEKCB0RGlmZnVzZSwgdmVjMiggdlV2LngsIHZVdi55ICsgMy4wICogdiApICkgKiAwLjA5MTg7XG5cdFx0XHRzdW0gKz0gdGV4dHVyZTJEKCB0RGlmZnVzZSwgdmVjMiggdlV2LngsIHZVdi55ICsgNC4wICogdiApICkgKiAwLjA1MTtcblxuXHRcdFx0Z2xfRnJhZ0NvbG9yID0gc3VtO1xuXG5cdFx0fWBcblxufTtcblxuZXhwb3J0IHsgVmVydGljYWxCbHVyU2hhZGVyIH07XG4iLCIvKipcbiAqIFNpbXBsZSBmYWtlIHRpbHQtc2hpZnQgZWZmZWN0LCBtb2R1bGF0aW5nIHR3byBwYXNzIEdhdXNzaWFuIGJsdXIgKHNlZSBhYm92ZSkgYnkgdmVydGljYWwgcG9zaXRpb25cbiAqXG4gKiAtIDkgc2FtcGxlcyBwZXIgcGFzc1xuICogLSBzdGFuZGFyZCBkZXZpYXRpb24gMi43XG4gKiAtIFwiaFwiIGFuZCBcInZcIiBwYXJhbWV0ZXJzIHNob3VsZCBiZSBzZXQgdG8gXCIxIC8gd2lkdGhcIiBhbmQgXCIxIC8gaGVpZ2h0XCJcbiAqIC0gXCJyXCIgcGFyYW1ldGVyIGNvbnRyb2wgd2hlcmUgXCJmb2N1c2VkXCIgaG9yaXpvbnRhbCBsaW5lIGxpZXNcbiAqL1xuXG5jb25zdCBWZXJ0aWNhbFRpbHRTaGlmdFNoYWRlciA9IHtcblxuXHR1bmlmb3Jtczoge1xuXG5cdFx0J3REaWZmdXNlJzogeyB2YWx1ZTogbnVsbCB9LFxuXHRcdCd2JzogeyB2YWx1ZTogMS4wIC8gNTEyLjAgfSxcblx0XHQncic6IHsgdmFsdWU6IDAuMzUgfVxuXG5cdH0sXG5cblx0dmVydGV4U2hhZGVyOiAvKiBnbHNsICovYFxuXG5cdFx0dmFyeWluZyB2ZWMyIHZVdjtcblxuXHRcdHZvaWQgbWFpbigpIHtcblxuXHRcdFx0dlV2ID0gdXY7XG5cdFx0XHRnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiBtb2RlbFZpZXdNYXRyaXggKiB2ZWM0KCBwb3NpdGlvbiwgMS4wICk7XG5cblx0XHR9YCxcblxuXHRmcmFnbWVudFNoYWRlcjogLyogZ2xzbCAqL2BcblxuXHRcdHVuaWZvcm0gc2FtcGxlcjJEIHREaWZmdXNlO1xuXHRcdHVuaWZvcm0gZmxvYXQgdjtcblx0XHR1bmlmb3JtIGZsb2F0IHI7XG5cblx0XHR2YXJ5aW5nIHZlYzIgdlV2O1xuXG5cdFx0dm9pZCBtYWluKCkge1xuXG5cdFx0XHR2ZWM0IHN1bSA9IHZlYzQoIDAuMCApO1xuXG5cdFx0XHRmbG9hdCB2diA9IHYgKiBhYnMoIHIgLSB2VXYueSApO1xuXG5cdFx0XHRzdW0gKz0gdGV4dHVyZTJEKCB0RGlmZnVzZSwgdmVjMiggdlV2LngsIHZVdi55IC0gNC4wICogdnYgKSApICogMC4wNTE7XG5cdFx0XHRzdW0gKz0gdGV4dHVyZTJEKCB0RGlmZnVzZSwgdmVjMiggdlV2LngsIHZVdi55IC0gMy4wICogdnYgKSApICogMC4wOTE4O1xuXHRcdFx0c3VtICs9IHRleHR1cmUyRCggdERpZmZ1c2UsIHZlYzIoIHZVdi54LCB2VXYueSAtIDIuMCAqIHZ2ICkgKSAqIDAuMTIyNDU7XG5cdFx0XHRzdW0gKz0gdGV4dHVyZTJEKCB0RGlmZnVzZSwgdmVjMiggdlV2LngsIHZVdi55IC0gMS4wICogdnYgKSApICogMC4xNTMxO1xuXHRcdFx0c3VtICs9IHRleHR1cmUyRCggdERpZmZ1c2UsIHZlYzIoIHZVdi54LCB2VXYueSApICkgKiAwLjE2MzM7XG5cdFx0XHRzdW0gKz0gdGV4dHVyZTJEKCB0RGlmZnVzZSwgdmVjMiggdlV2LngsIHZVdi55ICsgMS4wICogdnYgKSApICogMC4xNTMxO1xuXHRcdFx0c3VtICs9IHRleHR1cmUyRCggdERpZmZ1c2UsIHZlYzIoIHZVdi54LCB2VXYueSArIDIuMCAqIHZ2ICkgKSAqIDAuMTIyNDU7XG5cdFx0XHRzdW0gKz0gdGV4dHVyZTJEKCB0RGlmZnVzZSwgdmVjMiggdlV2LngsIHZVdi55ICsgMy4wICogdnYgKSApICogMC4wOTE4O1xuXHRcdFx0c3VtICs9IHRleHR1cmUyRCggdERpZmZ1c2UsIHZlYzIoIHZVdi54LCB2VXYueSArIDQuMCAqIHZ2ICkgKSAqIDAuMDUxO1xuXG5cdFx0XHRnbF9GcmFnQ29sb3IgPSBzdW07XG5cblx0XHR9YFxuXG59O1xuXG5leHBvcnQgeyBWZXJ0aWNhbFRpbHRTaGlmdFNoYWRlciB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJzaGFkZXJzLWJsdXJcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rbHRqc19mb3VydGhcIl0gPSBzZWxmW1wid2VicGFja0NodW5rbHRqc19mb3VydGhcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2J1aWxkX3RocmVlX21vZHVsZV9qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX2NvbnRyb2xzX09yYml0Q29udHJvbHNfanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX2xpbC1ndWlfZGlzdF9saWwtZ3VpX2VzbV9qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX3Bvc3Rwcm9jZXNzaW5nX0VmZmVjdENvbXBvc2VyX2pzLW5vZGVfbW9kdWxlc190aHJlZV9lLWRkOTc3N1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX3Bvc3Rwcm9jZXNzaW5nX1VucmVhbEJsb29tUGFzc19qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX3Bvc3Rwcm9jZXNzaW5nX0Jsb29tUGFzc19qcy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsLTliZGU1N1wiLFwic2FtcGxlc19ib290c3RyYXBfYm9vdHN0cmFwX2pzLXNhbXBsZXNfY2hhcHRlcnNfY2hhcHRlci0xMV91dGlsX3Bhc3MtY29udHJvbHNfanMtc2FtcGxlc19jb250LWIyZmVkMVwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci0xMS9zaGFkZXJzLWJsdXIuanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./samples/chapters/chapter-11/multi-passes.js"
/*!*****************************************************!*\
  !*** ./samples/chapters/chapter-11/multi-passes.js ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_standard_scene_seahouse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/standard-scene-seahouse */ "./samples/chapters/chapter-11/util/standard-scene-seahouse.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var three_examples_jsm_postprocessing_EffectComposer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/postprocessing/EffectComposer */ "./node_modules/three/examples/jsm/postprocessing/EffectComposer.js");
/* harmony import */ var three_examples_jsm_postprocessing_FilmPass_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/jsm/postprocessing/FilmPass.js */ "./node_modules/three/examples/jsm/postprocessing/FilmPass.js");
/* harmony import */ var three_examples_jsm_postprocessing_RenderPass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three/examples/jsm/postprocessing/RenderPass */ "./node_modules/three/examples/jsm/postprocessing/RenderPass.js");
/* harmony import */ var three_examples_jsm_postprocessing_DotScreenPass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! three/examples/jsm/postprocessing/DotScreenPass */ "./node_modules/three/examples/jsm/postprocessing/DotScreenPass.js");
/* harmony import */ var three_examples_jsm_postprocessing_BloomPass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! three/examples/jsm/postprocessing/BloomPass */ "./node_modules/three/examples/jsm/postprocessing/BloomPass.js");
/* harmony import */ var three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! three/examples/jsm/postprocessing/ShaderPass */ "./node_modules/three/examples/jsm/postprocessing/ShaderPass.js");
/* harmony import */ var three_examples_jsm_shaders_CopyShader_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! three/examples/jsm/shaders/CopyShader.js */ "./node_modules/three/examples/jsm/shaders/CopyShader.js");
/* harmony import */ var three_examples_jsm_shaders_GammaCorrectionShader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! three/examples/jsm/shaders/GammaCorrectionShader */ "./node_modules/three/examples/jsm/shaders/GammaCorrectionShader.js");
/* harmony import */ var three_examples_jsm_postprocessing_TexturePass__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! three/examples/jsm/postprocessing/TexturePass */ "./node_modules/three/examples/jsm/postprocessing/TexturePass.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _util_pass_controls__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./util/pass-controls */ "./samples/chapters/chapter-11/util/pass-controls.js");















const width = window.innerWidth || 2
const height = window.innerHeight || 2
const halfWidth = width / 2
const halfHeight = height / 2

const clock = new three__WEBPACK_IMPORTED_MODULE_11__.Clock()

const animate = (renderer, composers, mixer) => {
  renderer.clear()
  renderer.autoClear = false
  const delta = clock.getDelta()

  composers.renderedSceneComposer.render()

  renderer.setViewport(0, 0, halfWidth, halfHeight)
  composers.filmpassComposer.render(delta)

  renderer.setViewport(halfWidth, 0, halfWidth, halfHeight)
  composers.dotScreenPassComposer.render(delta)

  renderer.setViewport(0, halfHeight, halfWidth, halfHeight)
  composers.bloomPassComposer.render(delta)

  renderer.setViewport(halfWidth, halfHeight, halfWidth, halfHeight)
  composers.copyComposer.render(delta)

  requestAnimationFrame(() => animate(renderer, composers, mixer))
}

const filmpass = new three_examples_jsm_postprocessing_FilmPass_js__WEBPACK_IMPORTED_MODULE_3__.FilmPass()
const dotScreenPass = new three_examples_jsm_postprocessing_DotScreenPass__WEBPACK_IMPORTED_MODULE_5__.DotScreenPass()
const bloomPass = new three_examples_jsm_postprocessing_BloomPass__WEBPACK_IMPORTED_MODULE_6__.BloomPass()

let bloomPassComposer = undefined

const setupComposer = (renderer, scene, camera) => {
  const effectCopy = new three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_7__.ShaderPass(three_examples_jsm_shaders_CopyShader_js__WEBPACK_IMPORTED_MODULE_8__.CopyShader)
  const renderedSceneComposer = new three_examples_jsm_postprocessing_EffectComposer__WEBPACK_IMPORTED_MODULE_2__.EffectComposer(renderer)
  renderedSceneComposer.addPass(new three_examples_jsm_postprocessing_RenderPass__WEBPACK_IMPORTED_MODULE_4__.RenderPass(scene, camera))
  renderedSceneComposer.addPass(new three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_7__.ShaderPass(three_examples_jsm_shaders_GammaCorrectionShader__WEBPACK_IMPORTED_MODULE_9__.GammaCorrectionShader))
  renderedSceneComposer.addPass(effectCopy)
  renderedSceneComposer.renderToScreen = false
  const texturePass = new three_examples_jsm_postprocessing_TexturePass__WEBPACK_IMPORTED_MODULE_10__.TexturePass(renderedSceneComposer.renderTarget2.texture)

  const filmpassComposer = new three_examples_jsm_postprocessing_EffectComposer__WEBPACK_IMPORTED_MODULE_2__.EffectComposer(renderer)
  filmpassComposer.addPass(texturePass)
  filmpassComposer.addPass(filmpass)

  const dotScreenPassComposer = new three_examples_jsm_postprocessing_EffectComposer__WEBPACK_IMPORTED_MODULE_2__.EffectComposer(renderer)
  dotScreenPassComposer.addPass(texturePass)
  dotScreenPassComposer.addPass(dotScreenPass)

  bloomPassComposer = new three_examples_jsm_postprocessing_EffectComposer__WEBPACK_IMPORTED_MODULE_2__.EffectComposer(renderer)
  bloomPassComposer.addPass(texturePass)
  bloomPassComposer.addPass(bloomPass)
  bloomPassComposer.addPass(effectCopy)

  const copyComposer = new three_examples_jsm_postprocessing_EffectComposer__WEBPACK_IMPORTED_MODULE_2__.EffectComposer(renderer)
  copyComposer.addPass(texturePass)
  copyComposer.addPass(effectCopy)

  return { renderedSceneComposer, filmpassComposer, dotScreenPassComposer, bloomPassComposer, copyComposer }
}

;(0,_util_standard_scene_seahouse__WEBPACK_IMPORTED_MODULE_0__.bootstrapMeshScene)({
  addControls: (camera, renderer, scene, gui) => {
    const controls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1__.OrbitControls(camera, renderer.domElement)

    const filmPassFolder = gui.addFolder('Filmpass')
    const filmPassProps = {
      noiseIntensity: 0.5,
      scanlinesIntensity: 0.05,
      scanlinesCount: 4096,
      grayscale: true
    }

    filmPassFolder
      .add(filmPassProps, 'noiseIntensity', 0, 1, 0.1)
      .onChange((v) => (filmpass.uniforms.nIntensity.value = v))
    filmPassFolder
      .add(filmPassProps, 'scanlinesIntensity', 0, 1, 0.001)
      .onChange((v) => (filmpass.uniforms.sIntensity.value = v))
    filmPassFolder
      .add(filmPassProps, 'scanlinesCount', 0, 10000, 10)
      .onChange((v) => (filmpass.uniforms.sCount.value = v))
    filmPassFolder.add(filmPassProps, 'grayscale').onChange((v) => (filmpass.uniforms.grayscale.value = v))

    const dotScreenEffectFolder = gui.addFolder('DotScreenPass')
    const dotScreenEffectFolderProps = {
      scale: 10
    }
    dotScreenEffectFolder
      .add(dotScreenEffectFolderProps, 'scale', 1, 100, 1)
      .onChange((v) => (dotScreenPass.uniforms['scale'].value = v))

    ;(0,_util_pass_controls__WEBPACK_IMPORTED_MODULE_12__.addBloomPassControls)(gui, controls, (updated) => {
      bloomPassComposer.passes[1] = updated
    })
    return controls
  },
  initializeComposer: (renderer, scene, camera) => setupComposer(renderer, scene, camera),
  animate: (renderer, composer, mixer, clock) => animate(renderer, composer, mixer, clock)
}).then()


/***/ },

/***/ "./samples/chapters/chapter-11/util/standard-scene-seahouse.js"
/*!*********************************************************************!*\
  !*** ./samples/chapters/chapter-11/util/standard-scene-seahouse.js ***!
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
/* harmony import */ var three_examples_jsm_loaders_GLTFLoader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! three/examples/jsm/loaders/GLTFLoader */ "./node_modules/three/examples/jsm/loaders/GLTFLoader.js");
/* harmony import */ var _util_modelUtil__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../util/modelUtil */ "./samples/util/modelUtil.js");









const bootstrapMeshScene = async ({ provideGui, backgroundColor, addControls, initializeComposer, animate }) => {
  const props = {
    backgroundColor: backgroundColor ?? 0xffffff,
    disableDefaultControls: true
  }

  const loader = new three_examples_jsm_loaders_GLTFLoader__WEBPACK_IMPORTED_MODULE_5__.GLTFLoader()
  const mesh = await loader.loadAsync('/assets/models/sea_house/scene.gltf').then((structure) => {
    structure.scene.scale.setScalar(0.03, 0.03, 0.03)
    ;(0,_util_modelUtil__WEBPACK_IMPORTED_MODULE_6__.visitChildren)(structure.scene, (child) => {
      if (child.material) {
        child.material.depthWrite = true
      }
    })
    return structure.scene
  })

  const gui = new lil_gui__WEBPACK_IMPORTED_MODULE_2__["default"]()

  const init = async () => {
    ;(0,_bootstrap_bootstrap__WEBPACK_IMPORTED_MODULE_0__.initScene)(props)(({ scene, camera, renderer }) => {
      renderer.shadowMap.type = three__WEBPACK_IMPORTED_MODULE_4__.PCFSoftShadowMap
      camera.position.x = -3
      camera.position.z = 8
      camera.position.y = 4

      if (mesh) scene.add(mesh)

      ;(0,_controls_renderer_control__WEBPACK_IMPORTED_MODULE_1__.intializeRendererControls)(gui, renderer)
      ;(0,_controls_scene_controls__WEBPACK_IMPORTED_MODULE_3__.initializeSceneControls)(gui, scene, false)

      const composer = initializeComposer(renderer, scene, camera, mesh)

      if (provideGui) provideGui(gui, mesh, scene)
      let controls = undefined
      if (addControls) {
        controls = addControls(camera, renderer, scene, gui, mesh)
      }

      animate(renderer, composer)
    })
  }

  init().then()
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

/***/ "./node_modules/three/examples/jsm/postprocessing/DotScreenPass.js"
/*!*************************************************************************!*\
  !*** ./node_modules/three/examples/jsm/postprocessing/DotScreenPass.js ***!
  \*************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DotScreenPass: () => (/* binding */ DotScreenPass)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _Pass_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Pass.js */ "./node_modules/three/examples/jsm/postprocessing/Pass.js");
/* harmony import */ var _shaders_DotScreenShader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shaders/DotScreenShader.js */ "./node_modules/three/examples/jsm/shaders/DotScreenShader.js");




class DotScreenPass extends _Pass_js__WEBPACK_IMPORTED_MODULE_1__.Pass {

	constructor( center, angle, scale ) {

		super();

		if ( _shaders_DotScreenShader_js__WEBPACK_IMPORTED_MODULE_2__.DotScreenShader === undefined ) console.error( 'THREE.DotScreenPass relies on DotScreenShader' );

		const shader = _shaders_DotScreenShader_js__WEBPACK_IMPORTED_MODULE_2__.DotScreenShader;

		this.uniforms = three__WEBPACK_IMPORTED_MODULE_0__.UniformsUtils.clone( shader.uniforms );

		if ( center !== undefined ) this.uniforms[ 'center' ].value.copy( center );
		if ( angle !== undefined ) this.uniforms[ 'angle' ].value = angle;
		if ( scale !== undefined ) this.uniforms[ 'scale' ].value = scale;

		this.material = new three__WEBPACK_IMPORTED_MODULE_0__.ShaderMaterial( {

			uniforms: this.uniforms,
			vertexShader: shader.vertexShader,
			fragmentShader: shader.fragmentShader

		} );

		this.fsQuad = new _Pass_js__WEBPACK_IMPORTED_MODULE_1__.FullScreenQuad( this.material );

	}

	render( renderer, writeBuffer, readBuffer /*, deltaTime, maskActive */ ) {

		this.uniforms[ 'tDiffuse' ].value = readBuffer.texture;
		this.uniforms[ 'tSize' ].value.set( readBuffer.width, readBuffer.height );

		if ( this.renderToScreen ) {

			renderer.setRenderTarget( null );
			this.fsQuad.render( renderer );

		} else {

			renderer.setRenderTarget( writeBuffer );
			if ( this.clear ) renderer.clear();
			this.fsQuad.render( renderer );

		}

	}

}




/***/ },

/***/ "./node_modules/three/examples/jsm/postprocessing/FilmPass.js"
/*!********************************************************************!*\
  !*** ./node_modules/three/examples/jsm/postprocessing/FilmPass.js ***!
  \********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FilmPass: () => (/* binding */ FilmPass)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _Pass_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Pass.js */ "./node_modules/three/examples/jsm/postprocessing/Pass.js");
/* harmony import */ var _shaders_FilmShader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shaders/FilmShader.js */ "./node_modules/three/examples/jsm/shaders/FilmShader.js");




class FilmPass extends _Pass_js__WEBPACK_IMPORTED_MODULE_1__.Pass {

	constructor( noiseIntensity, scanlinesIntensity, scanlinesCount, grayscale ) {

		super();

		if ( _shaders_FilmShader_js__WEBPACK_IMPORTED_MODULE_2__.FilmShader === undefined ) console.error( 'THREE.FilmPass relies on FilmShader' );

		const shader = _shaders_FilmShader_js__WEBPACK_IMPORTED_MODULE_2__.FilmShader;

		this.uniforms = three__WEBPACK_IMPORTED_MODULE_0__.UniformsUtils.clone( shader.uniforms );

		this.material = new three__WEBPACK_IMPORTED_MODULE_0__.ShaderMaterial( {

			uniforms: this.uniforms,
			vertexShader: shader.vertexShader,
			fragmentShader: shader.fragmentShader

		} );

		if ( grayscale !== undefined )	this.uniforms.grayscale.value = grayscale;
		if ( noiseIntensity !== undefined ) this.uniforms.nIntensity.value = noiseIntensity;
		if ( scanlinesIntensity !== undefined ) this.uniforms.sIntensity.value = scanlinesIntensity;
		if ( scanlinesCount !== undefined ) this.uniforms.sCount.value = scanlinesCount;

		this.fsQuad = new _Pass_js__WEBPACK_IMPORTED_MODULE_1__.FullScreenQuad( this.material );

	}

	render( renderer, writeBuffer, readBuffer, deltaTime /*, maskActive */ ) {

		this.uniforms[ 'tDiffuse' ].value = readBuffer.texture;
		this.uniforms[ 'time' ].value += deltaTime;

		if ( this.renderToScreen ) {

			renderer.setRenderTarget( null );
			this.fsQuad.render( renderer );

		} else {

			renderer.setRenderTarget( writeBuffer );
			if ( this.clear ) renderer.clear();
			this.fsQuad.render( renderer );

		}

	}

}




/***/ },

/***/ "./node_modules/three/examples/jsm/postprocessing/TexturePass.js"
/*!***********************************************************************!*\
  !*** ./node_modules/three/examples/jsm/postprocessing/TexturePass.js ***!
  \***********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TexturePass: () => (/* binding */ TexturePass)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _Pass_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Pass.js */ "./node_modules/three/examples/jsm/postprocessing/Pass.js");
/* harmony import */ var _shaders_CopyShader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shaders/CopyShader.js */ "./node_modules/three/examples/jsm/shaders/CopyShader.js");




class TexturePass extends _Pass_js__WEBPACK_IMPORTED_MODULE_1__.Pass {

	constructor( map, opacity ) {

		super();

		if ( _shaders_CopyShader_js__WEBPACK_IMPORTED_MODULE_2__.CopyShader === undefined ) console.error( 'THREE.TexturePass relies on CopyShader' );

		const shader = _shaders_CopyShader_js__WEBPACK_IMPORTED_MODULE_2__.CopyShader;

		this.map = map;
		this.opacity = ( opacity !== undefined ) ? opacity : 1.0;

		this.uniforms = three__WEBPACK_IMPORTED_MODULE_0__.UniformsUtils.clone( shader.uniforms );

		this.material = new three__WEBPACK_IMPORTED_MODULE_0__.ShaderMaterial( {

			uniforms: this.uniforms,
			vertexShader: shader.vertexShader,
			fragmentShader: shader.fragmentShader,
			depthTest: false,
			depthWrite: false

		} );

		this.needsSwap = false;

		this.fsQuad = new _Pass_js__WEBPACK_IMPORTED_MODULE_1__.FullScreenQuad( null );

	}

	render( renderer, writeBuffer, readBuffer /*, deltaTime, maskActive */ ) {

		const oldAutoClear = renderer.autoClear;
		renderer.autoClear = false;

		this.fsQuad.material = this.material;

		this.uniforms[ 'opacity' ].value = this.opacity;
		this.uniforms[ 'tDiffuse' ].value = this.map;
		this.material.transparent = ( this.opacity < 1.0 );

		renderer.setRenderTarget( this.renderToScreen ? null : readBuffer );
		if ( this.clear ) renderer.clear();
		this.fsQuad.render( renderer );

		renderer.autoClear = oldAutoClear;

	}

}




/***/ },

/***/ "./node_modules/three/examples/jsm/shaders/DotScreenShader.js"
/*!********************************************************************!*\
  !*** ./node_modules/three/examples/jsm/shaders/DotScreenShader.js ***!
  \********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DotScreenShader: () => (/* binding */ DotScreenShader)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");


/**
 * Dot screen shader
 * based on glfx.js sepia shader
 * https://github.com/evanw/glfx.js
 */

const DotScreenShader = {

	uniforms: {

		'tDiffuse': { value: null },
		'tSize': { value: new three__WEBPACK_IMPORTED_MODULE_0__.Vector2( 256, 256 ) },
		'center': { value: new three__WEBPACK_IMPORTED_MODULE_0__.Vector2( 0.5, 0.5 ) },
		'angle': { value: 1.57 },
		'scale': { value: 1.0 }

	},

	vertexShader: /* glsl */`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

	fragmentShader: /* glsl */`

		uniform vec2 center;
		uniform float angle;
		uniform float scale;
		uniform vec2 tSize;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		float pattern() {

			float s = sin( angle ), c = cos( angle );

			vec2 tex = vUv * tSize - center;
			vec2 point = vec2( c * tex.x - s * tex.y, s * tex.x + c * tex.y ) * scale;

			return ( sin( point.x ) * sin( point.y ) ) * 4.0;

		}

		void main() {

			vec4 color = texture2D( tDiffuse, vUv );

			float average = ( color.r + color.g + color.b ) / 3.0;

			gl_FragColor = vec4( vec3( average * 10.0 - 5.0 + pattern() ), color.a );

		}`

};




/***/ },

/***/ "./node_modules/three/examples/jsm/shaders/FilmShader.js"
/*!***************************************************************!*\
  !*** ./node_modules/three/examples/jsm/shaders/FilmShader.js ***!
  \***************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FilmShader: () => (/* binding */ FilmShader)
/* harmony export */ });
/**
 * Film grain & scanlines shader
 *
 * - ported from HLSL to WebGL / GLSL
 * https://web.archive.org/web/20210226214859/http://www.truevision3d.com/forums/showcase/staticnoise_colorblackwhite_scanline_shaders-t18698.0.html
 *
 * Screen Space Static Postprocessor
 *
 * Produces an analogue noise overlay similar to a film grain / TV static
 *
 * Original implementation and noise algorithm
 * Pat 'Hawthorne' Shearon
 *
 * Optimized scanlines + noise version with intensity scaling
 * Georg 'Leviathan' Steinrohder
 *
 * This version is provided under a Creative Commons Attribution 3.0 License
 * http://creativecommons.org/licenses/by/3.0/
 */

const FilmShader = {

	uniforms: {

		'tDiffuse': { value: null },
		'time': { value: 0.0 },
		'nIntensity': { value: 0.5 },
		'sIntensity': { value: 0.05 },
		'sCount': { value: 4096 },
		'grayscale': { value: 1 }

	},

	vertexShader: /* glsl */`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

	fragmentShader: /* glsl */`

		#include <common>

		// control parameter
		uniform float time;

		uniform bool grayscale;

		// noise effect intensity value (0 = no effect, 1 = full effect)
		uniform float nIntensity;

		// scanlines effect intensity value (0 = no effect, 1 = full effect)
		uniform float sIntensity;

		// scanlines effect count value (0 = no effect, 4096 = full effect)
		uniform float sCount;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

		// sample the source
			vec4 cTextureScreen = texture2D( tDiffuse, vUv );

		// make some noise
			float dx = rand( vUv + time );

		// add noise
			vec3 cResult = cTextureScreen.rgb + cTextureScreen.rgb * clamp( 0.1 + dx, 0.0, 1.0 );

		// get us a sine and cosine
			vec2 sc = vec2( sin( vUv.y * sCount ), cos( vUv.y * sCount ) );

		// add scanlines
			cResult += cTextureScreen.rgb * vec3( sc.x, sc.y, sc.x ) * sIntensity;

		// interpolate between source and result by intensity
			cResult = cTextureScreen.rgb + clamp( nIntensity, 0.0,1.0 ) * ( cResult - cTextureScreen.rgb );

		// convert to grayscale if desired
			if( grayscale ) {

				cResult = vec3( cResult.r * 0.3 + cResult.g * 0.59 + cResult.b * 0.11 );

			}

			gl_FragColor =  vec4( cResult, cTextureScreen.a );

		}`,

};




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
/******/ 			"multi-passes": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","vendors-node_modules_three_examples_jsm_loaders_GLTFLoader_js","vendors-node_modules_three_examples_jsm_postprocessing_EffectComposer_js-node_modules_three_e-dd9777","vendors-node_modules_three_examples_jsm_postprocessing_UnrealBloomPass_js","vendors-node_modules_three_examples_jsm_postprocessing_BloomPass_js-node_modules_three_exampl-9bde57","samples_bootstrap_bootstrap_js-samples_chapters_chapter-11_util_pass-controls_js-samples_cont-b2fed1"], () => (__webpack_require__("./samples/chapters/chapter-11/multi-passes.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0Esa0JBQWtCLHFCQUFxQjtXQUN2QztXQUNBO1dBQ0EsS0FBSztXQUNMO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFOzs7OztXQzNCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdELEU7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBLDRHOzs7OztVRWhEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItMTEvbXVsdGktcGFzc2VzLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTExL3V0aWwvc3RhbmRhcmQtc2NlbmUtc2VhaG91c2UuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL3V0aWwvbW9kZWxVdGlsLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vbm9kZV9tb2R1bGVzL3RocmVlL2V4YW1wbGVzL2pzbS9wb3N0cHJvY2Vzc2luZy9Eb3RTY3JlZW5QYXNzLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vbm9kZV9tb2R1bGVzL3RocmVlL2V4YW1wbGVzL2pzbS9wb3N0cHJvY2Vzc2luZy9GaWxtUGFzcy5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL25vZGVfbW9kdWxlcy90aHJlZS9leGFtcGxlcy9qc20vcG9zdHByb2Nlc3NpbmcvVGV4dHVyZVBhc3MuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9ub2RlX21vZHVsZXMvdGhyZWUvZXhhbXBsZXMvanNtL3NoYWRlcnMvRG90U2NyZWVuU2hhZGVyLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vbm9kZV9tb2R1bGVzL3RocmVlL2V4YW1wbGVzL2pzbS9zaGFkZXJzL0ZpbG1TaGFkZXIuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9ub2RlX21vZHVsZXMvdGhyZWUvZXhhbXBsZXMvanNtL3NoYWRlcnMvR2FtbWFDb3JyZWN0aW9uU2hhZGVyLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYm9vdHN0cmFwTWVzaFNjZW5lIH0gZnJvbSAnLi91dGlsL3N0YW5kYXJkLXNjZW5lLXNlYWhvdXNlJ1xuaW1wb3J0IHsgT3JiaXRDb250cm9scyB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9jb250cm9scy9PcmJpdENvbnRyb2xzJ1xuXG5pbXBvcnQgeyBFZmZlY3RDb21wb3NlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9wb3N0cHJvY2Vzc2luZy9FZmZlY3RDb21wb3NlcidcbmltcG9ydCB7IEZpbG1QYXNzIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL3Bvc3Rwcm9jZXNzaW5nL0ZpbG1QYXNzLmpzJ1xuaW1wb3J0IHsgUmVuZGVyUGFzcyB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9wb3N0cHJvY2Vzc2luZy9SZW5kZXJQYXNzJ1xuaW1wb3J0IHsgRG90U2NyZWVuUGFzcyB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9wb3N0cHJvY2Vzc2luZy9Eb3RTY3JlZW5QYXNzJ1xuaW1wb3J0IHsgQmxvb21QYXNzIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL3Bvc3Rwcm9jZXNzaW5nL0Jsb29tUGFzcydcbmltcG9ydCB7IFNoYWRlclBhc3MgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vcG9zdHByb2Nlc3NpbmcvU2hhZGVyUGFzcydcbmltcG9ydCB7IENvcHlTaGFkZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vc2hhZGVycy9Db3B5U2hhZGVyLmpzJ1xuaW1wb3J0IHsgR2FtbWFDb3JyZWN0aW9uU2hhZGVyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL3NoYWRlcnMvR2FtbWFDb3JyZWN0aW9uU2hhZGVyJ1xuaW1wb3J0IHsgVGV4dHVyZVBhc3MgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vcG9zdHByb2Nlc3NpbmcvVGV4dHVyZVBhc3MnXG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcbmltcG9ydCB7IGFkZEJsb29tUGFzc0NvbnRyb2xzIH0gZnJvbSAnLi91dGlsL3Bhc3MtY29udHJvbHMnXG5cbmNvbnN0IHdpZHRoID0gd2luZG93LmlubmVyV2lkdGggfHwgMlxuY29uc3QgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IHx8IDJcbmNvbnN0IGhhbGZXaWR0aCA9IHdpZHRoIC8gMlxuY29uc3QgaGFsZkhlaWdodCA9IGhlaWdodCAvIDJcblxuY29uc3QgY2xvY2sgPSBuZXcgVEhSRUUuQ2xvY2soKVxuXG5jb25zdCBhbmltYXRlID0gKHJlbmRlcmVyLCBjb21wb3NlcnMsIG1peGVyKSA9PiB7XG4gIHJlbmRlcmVyLmNsZWFyKClcbiAgcmVuZGVyZXIuYXV0b0NsZWFyID0gZmFsc2VcbiAgY29uc3QgZGVsdGEgPSBjbG9jay5nZXREZWx0YSgpXG5cbiAgY29tcG9zZXJzLnJlbmRlcmVkU2NlbmVDb21wb3Nlci5yZW5kZXIoKVxuXG4gIHJlbmRlcmVyLnNldFZpZXdwb3J0KDAsIDAsIGhhbGZXaWR0aCwgaGFsZkhlaWdodClcbiAgY29tcG9zZXJzLmZpbG1wYXNzQ29tcG9zZXIucmVuZGVyKGRlbHRhKVxuXG4gIHJlbmRlcmVyLnNldFZpZXdwb3J0KGhhbGZXaWR0aCwgMCwgaGFsZldpZHRoLCBoYWxmSGVpZ2h0KVxuICBjb21wb3NlcnMuZG90U2NyZWVuUGFzc0NvbXBvc2VyLnJlbmRlcihkZWx0YSlcblxuICByZW5kZXJlci5zZXRWaWV3cG9ydCgwLCBoYWxmSGVpZ2h0LCBoYWxmV2lkdGgsIGhhbGZIZWlnaHQpXG4gIGNvbXBvc2Vycy5ibG9vbVBhc3NDb21wb3Nlci5yZW5kZXIoZGVsdGEpXG5cbiAgcmVuZGVyZXIuc2V0Vmlld3BvcnQoaGFsZldpZHRoLCBoYWxmSGVpZ2h0LCBoYWxmV2lkdGgsIGhhbGZIZWlnaHQpXG4gIGNvbXBvc2Vycy5jb3B5Q29tcG9zZXIucmVuZGVyKGRlbHRhKVxuXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBhbmltYXRlKHJlbmRlcmVyLCBjb21wb3NlcnMsIG1peGVyKSlcbn1cblxuY29uc3QgZmlsbXBhc3MgPSBuZXcgRmlsbVBhc3MoKVxuY29uc3QgZG90U2NyZWVuUGFzcyA9IG5ldyBEb3RTY3JlZW5QYXNzKClcbmNvbnN0IGJsb29tUGFzcyA9IG5ldyBCbG9vbVBhc3MoKVxuXG5sZXQgYmxvb21QYXNzQ29tcG9zZXIgPSB1bmRlZmluZWRcblxuY29uc3Qgc2V0dXBDb21wb3NlciA9IChyZW5kZXJlciwgc2NlbmUsIGNhbWVyYSkgPT4ge1xuICBjb25zdCBlZmZlY3RDb3B5ID0gbmV3IFNoYWRlclBhc3MoQ29weVNoYWRlcilcbiAgY29uc3QgcmVuZGVyZWRTY2VuZUNvbXBvc2VyID0gbmV3IEVmZmVjdENvbXBvc2VyKHJlbmRlcmVyKVxuICByZW5kZXJlZFNjZW5lQ29tcG9zZXIuYWRkUGFzcyhuZXcgUmVuZGVyUGFzcyhzY2VuZSwgY2FtZXJhKSlcbiAgcmVuZGVyZWRTY2VuZUNvbXBvc2VyLmFkZFBhc3MobmV3IFNoYWRlclBhc3MoR2FtbWFDb3JyZWN0aW9uU2hhZGVyKSlcbiAgcmVuZGVyZWRTY2VuZUNvbXBvc2VyLmFkZFBhc3MoZWZmZWN0Q29weSlcbiAgcmVuZGVyZWRTY2VuZUNvbXBvc2VyLnJlbmRlclRvU2NyZWVuID0gZmFsc2VcbiAgY29uc3QgdGV4dHVyZVBhc3MgPSBuZXcgVGV4dHVyZVBhc3MocmVuZGVyZWRTY2VuZUNvbXBvc2VyLnJlbmRlclRhcmdldDIudGV4dHVyZSlcblxuICBjb25zdCBmaWxtcGFzc0NvbXBvc2VyID0gbmV3IEVmZmVjdENvbXBvc2VyKHJlbmRlcmVyKVxuICBmaWxtcGFzc0NvbXBvc2VyLmFkZFBhc3ModGV4dHVyZVBhc3MpXG4gIGZpbG1wYXNzQ29tcG9zZXIuYWRkUGFzcyhmaWxtcGFzcylcblxuICBjb25zdCBkb3RTY3JlZW5QYXNzQ29tcG9zZXIgPSBuZXcgRWZmZWN0Q29tcG9zZXIocmVuZGVyZXIpXG4gIGRvdFNjcmVlblBhc3NDb21wb3Nlci5hZGRQYXNzKHRleHR1cmVQYXNzKVxuICBkb3RTY3JlZW5QYXNzQ29tcG9zZXIuYWRkUGFzcyhkb3RTY3JlZW5QYXNzKVxuXG4gIGJsb29tUGFzc0NvbXBvc2VyID0gbmV3IEVmZmVjdENvbXBvc2VyKHJlbmRlcmVyKVxuICBibG9vbVBhc3NDb21wb3Nlci5hZGRQYXNzKHRleHR1cmVQYXNzKVxuICBibG9vbVBhc3NDb21wb3Nlci5hZGRQYXNzKGJsb29tUGFzcylcbiAgYmxvb21QYXNzQ29tcG9zZXIuYWRkUGFzcyhlZmZlY3RDb3B5KVxuXG4gIGNvbnN0IGNvcHlDb21wb3NlciA9IG5ldyBFZmZlY3RDb21wb3NlcihyZW5kZXJlcilcbiAgY29weUNvbXBvc2VyLmFkZFBhc3ModGV4dHVyZVBhc3MpXG4gIGNvcHlDb21wb3Nlci5hZGRQYXNzKGVmZmVjdENvcHkpXG5cbiAgcmV0dXJuIHsgcmVuZGVyZWRTY2VuZUNvbXBvc2VyLCBmaWxtcGFzc0NvbXBvc2VyLCBkb3RTY3JlZW5QYXNzQ29tcG9zZXIsIGJsb29tUGFzc0NvbXBvc2VyLCBjb3B5Q29tcG9zZXIgfVxufVxuXG5ib290c3RyYXBNZXNoU2NlbmUoe1xuICBhZGRDb250cm9sczogKGNhbWVyYSwgcmVuZGVyZXIsIHNjZW5lLCBndWkpID0+IHtcbiAgICBjb25zdCBjb250cm9scyA9IG5ldyBPcmJpdENvbnRyb2xzKGNhbWVyYSwgcmVuZGVyZXIuZG9tRWxlbWVudClcblxuICAgIGNvbnN0IGZpbG1QYXNzRm9sZGVyID0gZ3VpLmFkZEZvbGRlcignRmlsbXBhc3MnKVxuICAgIGNvbnN0IGZpbG1QYXNzUHJvcHMgPSB7XG4gICAgICBub2lzZUludGVuc2l0eTogMC41LFxuICAgICAgc2NhbmxpbmVzSW50ZW5zaXR5OiAwLjA1LFxuICAgICAgc2NhbmxpbmVzQ291bnQ6IDQwOTYsXG4gICAgICBncmF5c2NhbGU6IHRydWVcbiAgICB9XG5cbiAgICBmaWxtUGFzc0ZvbGRlclxuICAgICAgLmFkZChmaWxtUGFzc1Byb3BzLCAnbm9pc2VJbnRlbnNpdHknLCAwLCAxLCAwLjEpXG4gICAgICAub25DaGFuZ2UoKHYpID0+IChmaWxtcGFzcy51bmlmb3Jtcy5uSW50ZW5zaXR5LnZhbHVlID0gdikpXG4gICAgZmlsbVBhc3NGb2xkZXJcbiAgICAgIC5hZGQoZmlsbVBhc3NQcm9wcywgJ3NjYW5saW5lc0ludGVuc2l0eScsIDAsIDEsIDAuMDAxKVxuICAgICAgLm9uQ2hhbmdlKCh2KSA9PiAoZmlsbXBhc3MudW5pZm9ybXMuc0ludGVuc2l0eS52YWx1ZSA9IHYpKVxuICAgIGZpbG1QYXNzRm9sZGVyXG4gICAgICAuYWRkKGZpbG1QYXNzUHJvcHMsICdzY2FubGluZXNDb3VudCcsIDAsIDEwMDAwLCAxMClcbiAgICAgIC5vbkNoYW5nZSgodikgPT4gKGZpbG1wYXNzLnVuaWZvcm1zLnNDb3VudC52YWx1ZSA9IHYpKVxuICAgIGZpbG1QYXNzRm9sZGVyLmFkZChmaWxtUGFzc1Byb3BzLCAnZ3JheXNjYWxlJykub25DaGFuZ2UoKHYpID0+IChmaWxtcGFzcy51bmlmb3Jtcy5ncmF5c2NhbGUudmFsdWUgPSB2KSlcblxuICAgIGNvbnN0IGRvdFNjcmVlbkVmZmVjdEZvbGRlciA9IGd1aS5hZGRGb2xkZXIoJ0RvdFNjcmVlblBhc3MnKVxuICAgIGNvbnN0IGRvdFNjcmVlbkVmZmVjdEZvbGRlclByb3BzID0ge1xuICAgICAgc2NhbGU6IDEwXG4gICAgfVxuICAgIGRvdFNjcmVlbkVmZmVjdEZvbGRlclxuICAgICAgLmFkZChkb3RTY3JlZW5FZmZlY3RGb2xkZXJQcm9wcywgJ3NjYWxlJywgMSwgMTAwLCAxKVxuICAgICAgLm9uQ2hhbmdlKCh2KSA9PiAoZG90U2NyZWVuUGFzcy51bmlmb3Jtc1snc2NhbGUnXS52YWx1ZSA9IHYpKVxuXG4gICAgYWRkQmxvb21QYXNzQ29udHJvbHMoZ3VpLCBjb250cm9scywgKHVwZGF0ZWQpID0+IHtcbiAgICAgIGJsb29tUGFzc0NvbXBvc2VyLnBhc3Nlc1sxXSA9IHVwZGF0ZWRcbiAgICB9KVxuICAgIHJldHVybiBjb250cm9sc1xuICB9LFxuICBpbml0aWFsaXplQ29tcG9zZXI6IChyZW5kZXJlciwgc2NlbmUsIGNhbWVyYSkgPT4gc2V0dXBDb21wb3NlcihyZW5kZXJlciwgc2NlbmUsIGNhbWVyYSksXG4gIGFuaW1hdGU6IChyZW5kZXJlciwgY29tcG9zZXIsIG1peGVyLCBjbG9jaykgPT4gYW5pbWF0ZShyZW5kZXJlciwgY29tcG9zZXIsIG1peGVyLCBjbG9jaylcbn0pLnRoZW4oKVxuIiwiaW1wb3J0IHsgaW5pdFNjZW5lIH0gZnJvbSAnLi4vLi4vLi4vYm9vdHN0cmFwL2Jvb3RzdHJhcCdcbmltcG9ydCB7IGludGlhbGl6ZVJlbmRlcmVyQ29udHJvbHMgfSBmcm9tICcuLi8uLi8uLi9jb250cm9scy9yZW5kZXJlci1jb250cm9sJ1xuXG5pbXBvcnQgR1VJIGZyb20gJ2xpbC1ndWknXG5pbXBvcnQgeyBpbml0aWFsaXplU2NlbmVDb250cm9scyB9IGZyb20gJy4uLy4uLy4uL2NvbnRyb2xzL3NjZW5lLWNvbnRyb2xzJ1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5pbXBvcnQgeyBHTFRGTG9hZGVyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlcidcbmltcG9ydCB7IHZpc2l0Q2hpbGRyZW4gfSBmcm9tICcuLi8uLi8uLi91dGlsL21vZGVsVXRpbCdcblxuZXhwb3J0IGNvbnN0IGJvb3RzdHJhcE1lc2hTY2VuZSA9IGFzeW5jICh7IHByb3ZpZGVHdWksIGJhY2tncm91bmRDb2xvciwgYWRkQ29udHJvbHMsIGluaXRpYWxpemVDb21wb3NlciwgYW5pbWF0ZSB9KSA9PiB7XG4gIGNvbnN0IHByb3BzID0ge1xuICAgIGJhY2tncm91bmRDb2xvcjogYmFja2dyb3VuZENvbG9yID8/IDB4ZmZmZmZmLFxuICAgIGRpc2FibGVEZWZhdWx0Q29udHJvbHM6IHRydWVcbiAgfVxuXG4gIGNvbnN0IGxvYWRlciA9IG5ldyBHTFRGTG9hZGVyKClcbiAgY29uc3QgbWVzaCA9IGF3YWl0IGxvYWRlci5sb2FkQXN5bmMoJy9hc3NldHMvbW9kZWxzL3NlYV9ob3VzZS9zY2VuZS5nbHRmJykudGhlbigoc3RydWN0dXJlKSA9PiB7XG4gICAgc3RydWN0dXJlLnNjZW5lLnNjYWxlLnNldFNjYWxhcigwLjAzLCAwLjAzLCAwLjAzKVxuICAgIHZpc2l0Q2hpbGRyZW4oc3RydWN0dXJlLnNjZW5lLCAoY2hpbGQpID0+IHtcbiAgICAgIGlmIChjaGlsZC5tYXRlcmlhbCkge1xuICAgICAgICBjaGlsZC5tYXRlcmlhbC5kZXB0aFdyaXRlID0gdHJ1ZVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHN0cnVjdHVyZS5zY2VuZVxuICB9KVxuXG4gIGNvbnN0IGd1aSA9IG5ldyBHVUkoKVxuXG4gIGNvbnN0IGluaXQgPSBhc3luYyAoKSA9PiB7XG4gICAgaW5pdFNjZW5lKHByb3BzKSgoeyBzY2VuZSwgY2FtZXJhLCByZW5kZXJlciB9KSA9PiB7XG4gICAgICByZW5kZXJlci5zaGFkb3dNYXAudHlwZSA9IFRIUkVFLlBDRlNvZnRTaGFkb3dNYXBcbiAgICAgIGNhbWVyYS5wb3NpdGlvbi54ID0gLTNcbiAgICAgIGNhbWVyYS5wb3NpdGlvbi56ID0gOFxuICAgICAgY2FtZXJhLnBvc2l0aW9uLnkgPSA0XG5cbiAgICAgIGlmIChtZXNoKSBzY2VuZS5hZGQobWVzaClcblxuICAgICAgaW50aWFsaXplUmVuZGVyZXJDb250cm9scyhndWksIHJlbmRlcmVyKVxuICAgICAgaW5pdGlhbGl6ZVNjZW5lQ29udHJvbHMoZ3VpLCBzY2VuZSwgZmFsc2UpXG5cbiAgICAgIGNvbnN0IGNvbXBvc2VyID0gaW5pdGlhbGl6ZUNvbXBvc2VyKHJlbmRlcmVyLCBzY2VuZSwgY2FtZXJhLCBtZXNoKVxuXG4gICAgICBpZiAocHJvdmlkZUd1aSkgcHJvdmlkZUd1aShndWksIG1lc2gsIHNjZW5lKVxuICAgICAgbGV0IGNvbnRyb2xzID0gdW5kZWZpbmVkXG4gICAgICBpZiAoYWRkQ29udHJvbHMpIHtcbiAgICAgICAgY29udHJvbHMgPSBhZGRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLCBzY2VuZSwgZ3VpLCBtZXNoKVxuICAgICAgfVxuXG4gICAgICBhbmltYXRlKHJlbmRlcmVyLCBjb21wb3NlcilcbiAgICB9KVxuICB9XG5cbiAgaW5pdCgpLnRoZW4oKVxufVxuIiwiZXhwb3J0IGNvbnN0IHZpc2l0Q2hpbGRyZW4gPSAob2JqZWN0LCBmbikgPT4ge1xuICBpZiAob2JqZWN0LmNoaWxkcmVuICYmIG9iamVjdC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgZm9yIChjb25zdCBjaGlsZCBvZiBvYmplY3QuY2hpbGRyZW4pIHtcbiAgICAgIHZpc2l0Q2hpbGRyZW4oY2hpbGQsIGZuKVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBmbihvYmplY3QpXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGFwcGx5U2hhZG93c0FuZERlcHRoV3JpdGUgPSAob2JqZWN0KSA9PiB7XG4gIHZpc2l0Q2hpbGRyZW4ob2JqZWN0LCAoY2hpbGQpID0+IHtcbiAgICBpZiAoY2hpbGQubWF0ZXJpYWwpIHtcbiAgICAgIGNoaWxkLm1hdGVyaWFsLmRlcHRoV3JpdGUgPSB0cnVlXG4gICAgICBjaGlsZC5jYXN0U2hhZG93ID0gdHJ1ZVxuICAgICAgY2hpbGQucmVjZWl2ZVNoYWRvdyA9IHRydWVcbiAgICB9XG4gIH0pXG59XG5cbmV4cG9ydCBjb25zdCBmaW5kQ2hpbGQgPSAob2JqZWN0LCBuYW1lKSA9PiB7XG4gIGlmIChvYmplY3QuY2hpbGRyZW4gJiYgb2JqZWN0LmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIG9iamVjdC5jaGlsZHJlbikge1xuICAgICAgaWYgKG5hbWUgPT09IGNoaWxkLm5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGNoaWxkXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCByZXMgPSBmaW5kQ2hpbGQoY2hpbGQsIG5hbWUpXG4gICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICByZXR1cm4gcmVzXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKG5hbWUgPT09IG9iamVjdC5uYW1lKSB7XG4gICAgICByZXR1cm4gb2JqZWN0XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7XG5cdFNoYWRlck1hdGVyaWFsLFxuXHRVbmlmb3Jtc1V0aWxzXG59IGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFBhc3MsIEZ1bGxTY3JlZW5RdWFkIH0gZnJvbSAnLi9QYXNzLmpzJztcbmltcG9ydCB7IERvdFNjcmVlblNoYWRlciB9IGZyb20gJy4uL3NoYWRlcnMvRG90U2NyZWVuU2hhZGVyLmpzJztcblxuY2xhc3MgRG90U2NyZWVuUGFzcyBleHRlbmRzIFBhc3Mge1xuXG5cdGNvbnN0cnVjdG9yKCBjZW50ZXIsIGFuZ2xlLCBzY2FsZSApIHtcblxuXHRcdHN1cGVyKCk7XG5cblx0XHRpZiAoIERvdFNjcmVlblNoYWRlciA9PT0gdW5kZWZpbmVkICkgY29uc29sZS5lcnJvciggJ1RIUkVFLkRvdFNjcmVlblBhc3MgcmVsaWVzIG9uIERvdFNjcmVlblNoYWRlcicgKTtcblxuXHRcdGNvbnN0IHNoYWRlciA9IERvdFNjcmVlblNoYWRlcjtcblxuXHRcdHRoaXMudW5pZm9ybXMgPSBVbmlmb3Jtc1V0aWxzLmNsb25lKCBzaGFkZXIudW5pZm9ybXMgKTtcblxuXHRcdGlmICggY2VudGVyICE9PSB1bmRlZmluZWQgKSB0aGlzLnVuaWZvcm1zWyAnY2VudGVyJyBdLnZhbHVlLmNvcHkoIGNlbnRlciApO1xuXHRcdGlmICggYW5nbGUgIT09IHVuZGVmaW5lZCApIHRoaXMudW5pZm9ybXNbICdhbmdsZScgXS52YWx1ZSA9IGFuZ2xlO1xuXHRcdGlmICggc2NhbGUgIT09IHVuZGVmaW5lZCApIHRoaXMudW5pZm9ybXNbICdzY2FsZScgXS52YWx1ZSA9IHNjYWxlO1xuXG5cdFx0dGhpcy5tYXRlcmlhbCA9IG5ldyBTaGFkZXJNYXRlcmlhbCgge1xuXG5cdFx0XHR1bmlmb3JtczogdGhpcy51bmlmb3Jtcyxcblx0XHRcdHZlcnRleFNoYWRlcjogc2hhZGVyLnZlcnRleFNoYWRlcixcblx0XHRcdGZyYWdtZW50U2hhZGVyOiBzaGFkZXIuZnJhZ21lbnRTaGFkZXJcblxuXHRcdH0gKTtcblxuXHRcdHRoaXMuZnNRdWFkID0gbmV3IEZ1bGxTY3JlZW5RdWFkKCB0aGlzLm1hdGVyaWFsICk7XG5cblx0fVxuXG5cdHJlbmRlciggcmVuZGVyZXIsIHdyaXRlQnVmZmVyLCByZWFkQnVmZmVyIC8qLCBkZWx0YVRpbWUsIG1hc2tBY3RpdmUgKi8gKSB7XG5cblx0XHR0aGlzLnVuaWZvcm1zWyAndERpZmZ1c2UnIF0udmFsdWUgPSByZWFkQnVmZmVyLnRleHR1cmU7XG5cdFx0dGhpcy51bmlmb3Jtc1sgJ3RTaXplJyBdLnZhbHVlLnNldCggcmVhZEJ1ZmZlci53aWR0aCwgcmVhZEJ1ZmZlci5oZWlnaHQgKTtcblxuXHRcdGlmICggdGhpcy5yZW5kZXJUb1NjcmVlbiApIHtcblxuXHRcdFx0cmVuZGVyZXIuc2V0UmVuZGVyVGFyZ2V0KCBudWxsICk7XG5cdFx0XHR0aGlzLmZzUXVhZC5yZW5kZXIoIHJlbmRlcmVyICk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRyZW5kZXJlci5zZXRSZW5kZXJUYXJnZXQoIHdyaXRlQnVmZmVyICk7XG5cdFx0XHRpZiAoIHRoaXMuY2xlYXIgKSByZW5kZXJlci5jbGVhcigpO1xuXHRcdFx0dGhpcy5mc1F1YWQucmVuZGVyKCByZW5kZXJlciApO1xuXG5cdFx0fVxuXG5cdH1cblxufVxuXG5leHBvcnQgeyBEb3RTY3JlZW5QYXNzIH07XG4iLCJpbXBvcnQge1xuXHRTaGFkZXJNYXRlcmlhbCxcblx0VW5pZm9ybXNVdGlsc1xufSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBQYXNzLCBGdWxsU2NyZWVuUXVhZCB9IGZyb20gJy4vUGFzcy5qcyc7XG5pbXBvcnQgeyBGaWxtU2hhZGVyIH0gZnJvbSAnLi4vc2hhZGVycy9GaWxtU2hhZGVyLmpzJztcblxuY2xhc3MgRmlsbVBhc3MgZXh0ZW5kcyBQYXNzIHtcblxuXHRjb25zdHJ1Y3Rvciggbm9pc2VJbnRlbnNpdHksIHNjYW5saW5lc0ludGVuc2l0eSwgc2NhbmxpbmVzQ291bnQsIGdyYXlzY2FsZSApIHtcblxuXHRcdHN1cGVyKCk7XG5cblx0XHRpZiAoIEZpbG1TaGFkZXIgPT09IHVuZGVmaW5lZCApIGNvbnNvbGUuZXJyb3IoICdUSFJFRS5GaWxtUGFzcyByZWxpZXMgb24gRmlsbVNoYWRlcicgKTtcblxuXHRcdGNvbnN0IHNoYWRlciA9IEZpbG1TaGFkZXI7XG5cblx0XHR0aGlzLnVuaWZvcm1zID0gVW5pZm9ybXNVdGlscy5jbG9uZSggc2hhZGVyLnVuaWZvcm1zICk7XG5cblx0XHR0aGlzLm1hdGVyaWFsID0gbmV3IFNoYWRlck1hdGVyaWFsKCB7XG5cblx0XHRcdHVuaWZvcm1zOiB0aGlzLnVuaWZvcm1zLFxuXHRcdFx0dmVydGV4U2hhZGVyOiBzaGFkZXIudmVydGV4U2hhZGVyLFxuXHRcdFx0ZnJhZ21lbnRTaGFkZXI6IHNoYWRlci5mcmFnbWVudFNoYWRlclxuXG5cdFx0fSApO1xuXG5cdFx0aWYgKCBncmF5c2NhbGUgIT09IHVuZGVmaW5lZCApXHR0aGlzLnVuaWZvcm1zLmdyYXlzY2FsZS52YWx1ZSA9IGdyYXlzY2FsZTtcblx0XHRpZiAoIG5vaXNlSW50ZW5zaXR5ICE9PSB1bmRlZmluZWQgKSB0aGlzLnVuaWZvcm1zLm5JbnRlbnNpdHkudmFsdWUgPSBub2lzZUludGVuc2l0eTtcblx0XHRpZiAoIHNjYW5saW5lc0ludGVuc2l0eSAhPT0gdW5kZWZpbmVkICkgdGhpcy51bmlmb3Jtcy5zSW50ZW5zaXR5LnZhbHVlID0gc2NhbmxpbmVzSW50ZW5zaXR5O1xuXHRcdGlmICggc2NhbmxpbmVzQ291bnQgIT09IHVuZGVmaW5lZCApIHRoaXMudW5pZm9ybXMuc0NvdW50LnZhbHVlID0gc2NhbmxpbmVzQ291bnQ7XG5cblx0XHR0aGlzLmZzUXVhZCA9IG5ldyBGdWxsU2NyZWVuUXVhZCggdGhpcy5tYXRlcmlhbCApO1xuXG5cdH1cblxuXHRyZW5kZXIoIHJlbmRlcmVyLCB3cml0ZUJ1ZmZlciwgcmVhZEJ1ZmZlciwgZGVsdGFUaW1lIC8qLCBtYXNrQWN0aXZlICovICkge1xuXG5cdFx0dGhpcy51bmlmb3Jtc1sgJ3REaWZmdXNlJyBdLnZhbHVlID0gcmVhZEJ1ZmZlci50ZXh0dXJlO1xuXHRcdHRoaXMudW5pZm9ybXNbICd0aW1lJyBdLnZhbHVlICs9IGRlbHRhVGltZTtcblxuXHRcdGlmICggdGhpcy5yZW5kZXJUb1NjcmVlbiApIHtcblxuXHRcdFx0cmVuZGVyZXIuc2V0UmVuZGVyVGFyZ2V0KCBudWxsICk7XG5cdFx0XHR0aGlzLmZzUXVhZC5yZW5kZXIoIHJlbmRlcmVyICk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRyZW5kZXJlci5zZXRSZW5kZXJUYXJnZXQoIHdyaXRlQnVmZmVyICk7XG5cdFx0XHRpZiAoIHRoaXMuY2xlYXIgKSByZW5kZXJlci5jbGVhcigpO1xuXHRcdFx0dGhpcy5mc1F1YWQucmVuZGVyKCByZW5kZXJlciApO1xuXG5cdFx0fVxuXG5cdH1cblxufVxuXG5leHBvcnQgeyBGaWxtUGFzcyB9O1xuIiwiaW1wb3J0IHtcblx0U2hhZGVyTWF0ZXJpYWwsXG5cdFVuaWZvcm1zVXRpbHNcbn0gZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgUGFzcywgRnVsbFNjcmVlblF1YWQgfSBmcm9tICcuL1Bhc3MuanMnO1xuaW1wb3J0IHsgQ29weVNoYWRlciB9IGZyb20gJy4uL3NoYWRlcnMvQ29weVNoYWRlci5qcyc7XG5cbmNsYXNzIFRleHR1cmVQYXNzIGV4dGVuZHMgUGFzcyB7XG5cblx0Y29uc3RydWN0b3IoIG1hcCwgb3BhY2l0eSApIHtcblxuXHRcdHN1cGVyKCk7XG5cblx0XHRpZiAoIENvcHlTaGFkZXIgPT09IHVuZGVmaW5lZCApIGNvbnNvbGUuZXJyb3IoICdUSFJFRS5UZXh0dXJlUGFzcyByZWxpZXMgb24gQ29weVNoYWRlcicgKTtcblxuXHRcdGNvbnN0IHNoYWRlciA9IENvcHlTaGFkZXI7XG5cblx0XHR0aGlzLm1hcCA9IG1hcDtcblx0XHR0aGlzLm9wYWNpdHkgPSAoIG9wYWNpdHkgIT09IHVuZGVmaW5lZCApID8gb3BhY2l0eSA6IDEuMDtcblxuXHRcdHRoaXMudW5pZm9ybXMgPSBVbmlmb3Jtc1V0aWxzLmNsb25lKCBzaGFkZXIudW5pZm9ybXMgKTtcblxuXHRcdHRoaXMubWF0ZXJpYWwgPSBuZXcgU2hhZGVyTWF0ZXJpYWwoIHtcblxuXHRcdFx0dW5pZm9ybXM6IHRoaXMudW5pZm9ybXMsXG5cdFx0XHR2ZXJ0ZXhTaGFkZXI6IHNoYWRlci52ZXJ0ZXhTaGFkZXIsXG5cdFx0XHRmcmFnbWVudFNoYWRlcjogc2hhZGVyLmZyYWdtZW50U2hhZGVyLFxuXHRcdFx0ZGVwdGhUZXN0OiBmYWxzZSxcblx0XHRcdGRlcHRoV3JpdGU6IGZhbHNlXG5cblx0XHR9ICk7XG5cblx0XHR0aGlzLm5lZWRzU3dhcCA9IGZhbHNlO1xuXG5cdFx0dGhpcy5mc1F1YWQgPSBuZXcgRnVsbFNjcmVlblF1YWQoIG51bGwgKTtcblxuXHR9XG5cblx0cmVuZGVyKCByZW5kZXJlciwgd3JpdGVCdWZmZXIsIHJlYWRCdWZmZXIgLyosIGRlbHRhVGltZSwgbWFza0FjdGl2ZSAqLyApIHtcblxuXHRcdGNvbnN0IG9sZEF1dG9DbGVhciA9IHJlbmRlcmVyLmF1dG9DbGVhcjtcblx0XHRyZW5kZXJlci5hdXRvQ2xlYXIgPSBmYWxzZTtcblxuXHRcdHRoaXMuZnNRdWFkLm1hdGVyaWFsID0gdGhpcy5tYXRlcmlhbDtcblxuXHRcdHRoaXMudW5pZm9ybXNbICdvcGFjaXR5JyBdLnZhbHVlID0gdGhpcy5vcGFjaXR5O1xuXHRcdHRoaXMudW5pZm9ybXNbICd0RGlmZnVzZScgXS52YWx1ZSA9IHRoaXMubWFwO1xuXHRcdHRoaXMubWF0ZXJpYWwudHJhbnNwYXJlbnQgPSAoIHRoaXMub3BhY2l0eSA8IDEuMCApO1xuXG5cdFx0cmVuZGVyZXIuc2V0UmVuZGVyVGFyZ2V0KCB0aGlzLnJlbmRlclRvU2NyZWVuID8gbnVsbCA6IHJlYWRCdWZmZXIgKTtcblx0XHRpZiAoIHRoaXMuY2xlYXIgKSByZW5kZXJlci5jbGVhcigpO1xuXHRcdHRoaXMuZnNRdWFkLnJlbmRlciggcmVuZGVyZXIgKTtcblxuXHRcdHJlbmRlcmVyLmF1dG9DbGVhciA9IG9sZEF1dG9DbGVhcjtcblxuXHR9XG5cbn1cblxuZXhwb3J0IHsgVGV4dHVyZVBhc3MgfTtcbiIsImltcG9ydCB7XG5cdFZlY3RvcjJcbn0gZnJvbSAndGhyZWUnO1xuXG4vKipcbiAqIERvdCBzY3JlZW4gc2hhZGVyXG4gKiBiYXNlZCBvbiBnbGZ4LmpzIHNlcGlhIHNoYWRlclxuICogaHR0cHM6Ly9naXRodWIuY29tL2V2YW53L2dsZnguanNcbiAqL1xuXG5jb25zdCBEb3RTY3JlZW5TaGFkZXIgPSB7XG5cblx0dW5pZm9ybXM6IHtcblxuXHRcdCd0RGlmZnVzZSc6IHsgdmFsdWU6IG51bGwgfSxcblx0XHQndFNpemUnOiB7IHZhbHVlOiBuZXcgVmVjdG9yMiggMjU2LCAyNTYgKSB9LFxuXHRcdCdjZW50ZXInOiB7IHZhbHVlOiBuZXcgVmVjdG9yMiggMC41LCAwLjUgKSB9LFxuXHRcdCdhbmdsZSc6IHsgdmFsdWU6IDEuNTcgfSxcblx0XHQnc2NhbGUnOiB7IHZhbHVlOiAxLjAgfVxuXG5cdH0sXG5cblx0dmVydGV4U2hhZGVyOiAvKiBnbHNsICovYFxuXG5cdFx0dmFyeWluZyB2ZWMyIHZVdjtcblxuXHRcdHZvaWQgbWFpbigpIHtcblxuXHRcdFx0dlV2ID0gdXY7XG5cdFx0XHRnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiBtb2RlbFZpZXdNYXRyaXggKiB2ZWM0KCBwb3NpdGlvbiwgMS4wICk7XG5cblx0XHR9YCxcblxuXHRmcmFnbWVudFNoYWRlcjogLyogZ2xzbCAqL2BcblxuXHRcdHVuaWZvcm0gdmVjMiBjZW50ZXI7XG5cdFx0dW5pZm9ybSBmbG9hdCBhbmdsZTtcblx0XHR1bmlmb3JtIGZsb2F0IHNjYWxlO1xuXHRcdHVuaWZvcm0gdmVjMiB0U2l6ZTtcblxuXHRcdHVuaWZvcm0gc2FtcGxlcjJEIHREaWZmdXNlO1xuXG5cdFx0dmFyeWluZyB2ZWMyIHZVdjtcblxuXHRcdGZsb2F0IHBhdHRlcm4oKSB7XG5cblx0XHRcdGZsb2F0IHMgPSBzaW4oIGFuZ2xlICksIGMgPSBjb3MoIGFuZ2xlICk7XG5cblx0XHRcdHZlYzIgdGV4ID0gdlV2ICogdFNpemUgLSBjZW50ZXI7XG5cdFx0XHR2ZWMyIHBvaW50ID0gdmVjMiggYyAqIHRleC54IC0gcyAqIHRleC55LCBzICogdGV4LnggKyBjICogdGV4LnkgKSAqIHNjYWxlO1xuXG5cdFx0XHRyZXR1cm4gKCBzaW4oIHBvaW50LnggKSAqIHNpbiggcG9pbnQueSApICkgKiA0LjA7XG5cblx0XHR9XG5cblx0XHR2b2lkIG1haW4oKSB7XG5cblx0XHRcdHZlYzQgY29sb3IgPSB0ZXh0dXJlMkQoIHREaWZmdXNlLCB2VXYgKTtcblxuXHRcdFx0ZmxvYXQgYXZlcmFnZSA9ICggY29sb3IuciArIGNvbG9yLmcgKyBjb2xvci5iICkgLyAzLjA7XG5cblx0XHRcdGdsX0ZyYWdDb2xvciA9IHZlYzQoIHZlYzMoIGF2ZXJhZ2UgKiAxMC4wIC0gNS4wICsgcGF0dGVybigpICksIGNvbG9yLmEgKTtcblxuXHRcdH1gXG5cbn07XG5cbmV4cG9ydCB7IERvdFNjcmVlblNoYWRlciB9O1xuIiwiLyoqXG4gKiBGaWxtIGdyYWluICYgc2NhbmxpbmVzIHNoYWRlclxuICpcbiAqIC0gcG9ydGVkIGZyb20gSExTTCB0byBXZWJHTCAvIEdMU0xcbiAqIGh0dHBzOi8vd2ViLmFyY2hpdmUub3JnL3dlYi8yMDIxMDIyNjIxNDg1OS9odHRwOi8vd3d3LnRydWV2aXNpb24zZC5jb20vZm9ydW1zL3Nob3djYXNlL3N0YXRpY25vaXNlX2NvbG9yYmxhY2t3aGl0ZV9zY2FubGluZV9zaGFkZXJzLXQxODY5OC4wLmh0bWxcbiAqXG4gKiBTY3JlZW4gU3BhY2UgU3RhdGljIFBvc3Rwcm9jZXNzb3JcbiAqXG4gKiBQcm9kdWNlcyBhbiBhbmFsb2d1ZSBub2lzZSBvdmVybGF5IHNpbWlsYXIgdG8gYSBmaWxtIGdyYWluIC8gVFYgc3RhdGljXG4gKlxuICogT3JpZ2luYWwgaW1wbGVtZW50YXRpb24gYW5kIG5vaXNlIGFsZ29yaXRobVxuICogUGF0ICdIYXd0aG9ybmUnIFNoZWFyb25cbiAqXG4gKiBPcHRpbWl6ZWQgc2NhbmxpbmVzICsgbm9pc2UgdmVyc2lvbiB3aXRoIGludGVuc2l0eSBzY2FsaW5nXG4gKiBHZW9yZyAnTGV2aWF0aGFuJyBTdGVpbnJvaGRlclxuICpcbiAqIFRoaXMgdmVyc2lvbiBpcyBwcm92aWRlZCB1bmRlciBhIENyZWF0aXZlIENvbW1vbnMgQXR0cmlidXRpb24gMy4wIExpY2Vuc2VcbiAqIGh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL2J5LzMuMC9cbiAqL1xuXG5jb25zdCBGaWxtU2hhZGVyID0ge1xuXG5cdHVuaWZvcm1zOiB7XG5cblx0XHQndERpZmZ1c2UnOiB7IHZhbHVlOiBudWxsIH0sXG5cdFx0J3RpbWUnOiB7IHZhbHVlOiAwLjAgfSxcblx0XHQnbkludGVuc2l0eSc6IHsgdmFsdWU6IDAuNSB9LFxuXHRcdCdzSW50ZW5zaXR5JzogeyB2YWx1ZTogMC4wNSB9LFxuXHRcdCdzQ291bnQnOiB7IHZhbHVlOiA0MDk2IH0sXG5cdFx0J2dyYXlzY2FsZSc6IHsgdmFsdWU6IDEgfVxuXG5cdH0sXG5cblx0dmVydGV4U2hhZGVyOiAvKiBnbHNsICovYFxuXG5cdFx0dmFyeWluZyB2ZWMyIHZVdjtcblxuXHRcdHZvaWQgbWFpbigpIHtcblxuXHRcdFx0dlV2ID0gdXY7XG5cdFx0XHRnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiBtb2RlbFZpZXdNYXRyaXggKiB2ZWM0KCBwb3NpdGlvbiwgMS4wICk7XG5cblx0XHR9YCxcblxuXHRmcmFnbWVudFNoYWRlcjogLyogZ2xzbCAqL2BcblxuXHRcdCNpbmNsdWRlIDxjb21tb24+XG5cblx0XHQvLyBjb250cm9sIHBhcmFtZXRlclxuXHRcdHVuaWZvcm0gZmxvYXQgdGltZTtcblxuXHRcdHVuaWZvcm0gYm9vbCBncmF5c2NhbGU7XG5cblx0XHQvLyBub2lzZSBlZmZlY3QgaW50ZW5zaXR5IHZhbHVlICgwID0gbm8gZWZmZWN0LCAxID0gZnVsbCBlZmZlY3QpXG5cdFx0dW5pZm9ybSBmbG9hdCBuSW50ZW5zaXR5O1xuXG5cdFx0Ly8gc2NhbmxpbmVzIGVmZmVjdCBpbnRlbnNpdHkgdmFsdWUgKDAgPSBubyBlZmZlY3QsIDEgPSBmdWxsIGVmZmVjdClcblx0XHR1bmlmb3JtIGZsb2F0IHNJbnRlbnNpdHk7XG5cblx0XHQvLyBzY2FubGluZXMgZWZmZWN0IGNvdW50IHZhbHVlICgwID0gbm8gZWZmZWN0LCA0MDk2ID0gZnVsbCBlZmZlY3QpXG5cdFx0dW5pZm9ybSBmbG9hdCBzQ291bnQ7XG5cblx0XHR1bmlmb3JtIHNhbXBsZXIyRCB0RGlmZnVzZTtcblxuXHRcdHZhcnlpbmcgdmVjMiB2VXY7XG5cblx0XHR2b2lkIG1haW4oKSB7XG5cblx0XHQvLyBzYW1wbGUgdGhlIHNvdXJjZVxuXHRcdFx0dmVjNCBjVGV4dHVyZVNjcmVlbiA9IHRleHR1cmUyRCggdERpZmZ1c2UsIHZVdiApO1xuXG5cdFx0Ly8gbWFrZSBzb21lIG5vaXNlXG5cdFx0XHRmbG9hdCBkeCA9IHJhbmQoIHZVdiArIHRpbWUgKTtcblxuXHRcdC8vIGFkZCBub2lzZVxuXHRcdFx0dmVjMyBjUmVzdWx0ID0gY1RleHR1cmVTY3JlZW4ucmdiICsgY1RleHR1cmVTY3JlZW4ucmdiICogY2xhbXAoIDAuMSArIGR4LCAwLjAsIDEuMCApO1xuXG5cdFx0Ly8gZ2V0IHVzIGEgc2luZSBhbmQgY29zaW5lXG5cdFx0XHR2ZWMyIHNjID0gdmVjMiggc2luKCB2VXYueSAqIHNDb3VudCApLCBjb3MoIHZVdi55ICogc0NvdW50ICkgKTtcblxuXHRcdC8vIGFkZCBzY2FubGluZXNcblx0XHRcdGNSZXN1bHQgKz0gY1RleHR1cmVTY3JlZW4ucmdiICogdmVjMyggc2MueCwgc2MueSwgc2MueCApICogc0ludGVuc2l0eTtcblxuXHRcdC8vIGludGVycG9sYXRlIGJldHdlZW4gc291cmNlIGFuZCByZXN1bHQgYnkgaW50ZW5zaXR5XG5cdFx0XHRjUmVzdWx0ID0gY1RleHR1cmVTY3JlZW4ucmdiICsgY2xhbXAoIG5JbnRlbnNpdHksIDAuMCwxLjAgKSAqICggY1Jlc3VsdCAtIGNUZXh0dXJlU2NyZWVuLnJnYiApO1xuXG5cdFx0Ly8gY29udmVydCB0byBncmF5c2NhbGUgaWYgZGVzaXJlZFxuXHRcdFx0aWYoIGdyYXlzY2FsZSApIHtcblxuXHRcdFx0XHRjUmVzdWx0ID0gdmVjMyggY1Jlc3VsdC5yICogMC4zICsgY1Jlc3VsdC5nICogMC41OSArIGNSZXN1bHQuYiAqIDAuMTEgKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRnbF9GcmFnQ29sb3IgPSAgdmVjNCggY1Jlc3VsdCwgY1RleHR1cmVTY3JlZW4uYSApO1xuXG5cdFx0fWAsXG5cbn07XG5cbmV4cG9ydCB7IEZpbG1TaGFkZXIgfTtcbiIsIi8qKlxuICogR2FtbWEgQ29ycmVjdGlvbiBTaGFkZXJcbiAqIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvZ2FtbWFfY29ycmVjdGlvblxuICovXG5cbmNvbnN0IEdhbW1hQ29ycmVjdGlvblNoYWRlciA9IHtcblxuXHR1bmlmb3Jtczoge1xuXG5cdFx0J3REaWZmdXNlJzogeyB2YWx1ZTogbnVsbCB9XG5cblx0fSxcblxuXHR2ZXJ0ZXhTaGFkZXI6IC8qIGdsc2wgKi9gXG5cblx0XHR2YXJ5aW5nIHZlYzIgdlV2O1xuXG5cdFx0dm9pZCBtYWluKCkge1xuXG5cdFx0XHR2VXYgPSB1djtcblx0XHRcdGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIG1vZGVsVmlld01hdHJpeCAqIHZlYzQoIHBvc2l0aW9uLCAxLjAgKTtcblxuXHRcdH1gLFxuXG5cdGZyYWdtZW50U2hhZGVyOiAvKiBnbHNsICovYFxuXG5cdFx0dW5pZm9ybSBzYW1wbGVyMkQgdERpZmZ1c2U7XG5cblx0XHR2YXJ5aW5nIHZlYzIgdlV2O1xuXG5cdFx0dm9pZCBtYWluKCkge1xuXG5cdFx0XHR2ZWM0IHRleCA9IHRleHR1cmUyRCggdERpZmZ1c2UsIHZVdiApO1xuXG5cdFx0XHRnbF9GcmFnQ29sb3IgPSBMaW5lYXJUb3NSR0IoIHRleCApO1xuXG5cdFx0fWBcblxufTtcblxuZXhwb3J0IHsgR2FtbWFDb3JyZWN0aW9uU2hhZGVyIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm11bHRpLXBhc3Nlc1wiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtsdGpzX2ZvdXJ0aFwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtsdGpzX2ZvdXJ0aFwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfYnVpbGRfdGhyZWVfbW9kdWxlX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fY29udHJvbHNfT3JiaXRDb250cm9sc19qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfbGlsLWd1aV9kaXN0X2xpbC1ndWlfZXNtX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fbG9hZGVyc19HTFRGTG9hZGVyX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fcG9zdHByb2Nlc3NpbmdfRWZmZWN0Q29tcG9zZXJfanMtbm9kZV9tb2R1bGVzX3RocmVlX2UtZGQ5Nzc3XCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fcG9zdHByb2Nlc3NpbmdfVW5yZWFsQmxvb21QYXNzX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fcG9zdHByb2Nlc3NpbmdfQmxvb21QYXNzX2pzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGwtOWJkZTU3XCIsXCJzYW1wbGVzX2Jvb3RzdHJhcF9ib290c3RyYXBfanMtc2FtcGxlc19jaGFwdGVyc19jaGFwdGVyLTExX3V0aWxfcGFzcy1jb250cm9sc19qcy1zYW1wbGVzX2NvbnQtYjJmZWQxXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTExL211bHRpLXBhc3Nlcy5qc1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
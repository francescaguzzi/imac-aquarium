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

/***/ "./samples/chapters/chapter-11/shaders.js"
/*!************************************************!*\
  !*** ./samples/chapters/chapter-11/shaders.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_standard_scene_mushroom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/standard-scene-mushroom */ "./samples/chapters/chapter-11/util/standard-scene-mushroom.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var three_examples_jsm_postprocessing_EffectComposer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/postprocessing/EffectComposer */ "./node_modules/three/examples/jsm/postprocessing/EffectComposer.js");
/* harmony import */ var three_examples_jsm_postprocessing_RenderPass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/jsm/postprocessing/RenderPass */ "./node_modules/three/examples/jsm/postprocessing/RenderPass.js");
/* harmony import */ var three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three/examples/jsm/postprocessing/ShaderPass */ "./node_modules/three/examples/jsm/postprocessing/ShaderPass.js");
/* harmony import */ var three_examples_jsm_shaders_CopyShader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! three/examples/jsm/shaders/CopyShader */ "./node_modules/three/examples/jsm/shaders/CopyShader.js");
/* harmony import */ var three_examples_jsm_shaders_ColorifyShader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! three/examples/jsm/shaders/ColorifyShader */ "./node_modules/three/examples/jsm/shaders/ColorifyShader.js");
/* harmony import */ var three_examples_jsm_shaders_BleachBypassShader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! three/examples/jsm/shaders/BleachBypassShader */ "./node_modules/three/examples/jsm/shaders/BleachBypassShader.js");
/* harmony import */ var three_examples_jsm_shaders_BrightnessContrastShader__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! three/examples/jsm/shaders/BrightnessContrastShader */ "./node_modules/three/examples/jsm/shaders/BrightnessContrastShader.js");
/* harmony import */ var three_examples_jsm_shaders_ColorCorrectionShader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! three/examples/jsm/shaders/ColorCorrectionShader */ "./node_modules/three/examples/jsm/shaders/ColorCorrectionShader.js");
/* harmony import */ var three_examples_jsm_shaders_GammaCorrectionShader__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! three/examples/jsm/shaders/GammaCorrectionShader */ "./node_modules/three/examples/jsm/shaders/GammaCorrectionShader.js");
/* harmony import */ var three_examples_jsm_shaders_HueSaturationShader__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! three/examples/jsm/shaders/HueSaturationShader */ "./node_modules/three/examples/jsm/shaders/HueSaturationShader.js");
/* harmony import */ var three_examples_jsm_shaders_KaleidoShader__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! three/examples/jsm/shaders/KaleidoShader */ "./node_modules/three/examples/jsm/shaders/KaleidoShader.js");
/* harmony import */ var three_examples_jsm_shaders_LuminosityHighPassShader__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! three/examples/jsm/shaders/LuminosityHighPassShader */ "./node_modules/three/examples/jsm/shaders/LuminosityHighPassShader.js");
/* harmony import */ var three_examples_jsm_shaders_LuminosityShader__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! three/examples/jsm/shaders/LuminosityShader */ "./node_modules/three/examples/jsm/shaders/LuminosityShader.js");
/* harmony import */ var three_examples_jsm_shaders_MirrorShader__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! three/examples/jsm/shaders/MirrorShader */ "./node_modules/three/examples/jsm/shaders/MirrorShader.js");
/* harmony import */ var three_examples_jsm_shaders_PixelShader__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! three/examples/jsm/shaders/PixelShader */ "./node_modules/three/examples/jsm/shaders/PixelShader.js");
/* harmony import */ var three_examples_jsm_shaders_RGBShiftShader__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! three/examples/jsm/shaders/RGBShiftShader */ "./node_modules/three/examples/jsm/shaders/RGBShiftShader.js");
/* harmony import */ var three_examples_jsm_shaders_SepiaShader__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! three/examples/jsm/shaders/SepiaShader */ "./node_modules/three/examples/jsm/shaders/SepiaShader.js");
/* harmony import */ var three_examples_jsm_shaders_SobelOperatorShader__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! three/examples/jsm/shaders/SobelOperatorShader */ "./node_modules/three/examples/jsm/shaders/SobelOperatorShader.js");
/* harmony import */ var three_examples_jsm_shaders_VignetteShader__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! three/examples/jsm/shaders/VignetteShader */ "./node_modules/three/examples/jsm/shaders/VignetteShader.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _util_pass_controls__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./util/pass-controls */ "./samples/chapters/chapter-11/util/pass-controls.js");



























const effectCopy = new three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_4__.ShaderPass(three_examples_jsm_shaders_CopyShader__WEBPACK_IMPORTED_MODULE_5__.CopyShader)
effectCopy.renderToScreen = true
const bleachByPassFilter = new three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_4__.ShaderPass(three_examples_jsm_shaders_BleachBypassShader__WEBPACK_IMPORTED_MODULE_7__.BleachBypassShader)
const brightnessContrastShader = new three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_4__.ShaderPass(three_examples_jsm_shaders_BrightnessContrastShader__WEBPACK_IMPORTED_MODULE_8__.BrightnessContrastShader)
const colorifyShader = new three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_4__.ShaderPass(three_examples_jsm_shaders_ColorifyShader__WEBPACK_IMPORTED_MODULE_6__.ColorifyShader)
const colorCorrectionShader = new three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_4__.ShaderPass(three_examples_jsm_shaders_ColorCorrectionShader__WEBPACK_IMPORTED_MODULE_9__.ColorCorrectionShader)
const gammaCorrectionShader = new three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_4__.ShaderPass(three_examples_jsm_shaders_GammaCorrectionShader__WEBPACK_IMPORTED_MODULE_10__.GammaCorrectionShader)
const hueSaturationShader = new three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_4__.ShaderPass(three_examples_jsm_shaders_HueSaturationShader__WEBPACK_IMPORTED_MODULE_11__.HueSaturationShader)
const kaleidoShader = new three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_4__.ShaderPass(three_examples_jsm_shaders_KaleidoShader__WEBPACK_IMPORTED_MODULE_12__.KaleidoShader)
const luminosityHighPassShader = new three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_4__.ShaderPass(three_examples_jsm_shaders_LuminosityHighPassShader__WEBPACK_IMPORTED_MODULE_13__.LuminosityHighPassShader)
const luminosityShader = new three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_4__.ShaderPass(three_examples_jsm_shaders_LuminosityShader__WEBPACK_IMPORTED_MODULE_14__.LuminosityShader)
const mirrorShader = new three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_4__.ShaderPass(three_examples_jsm_shaders_MirrorShader__WEBPACK_IMPORTED_MODULE_15__.MirrorShader)
const pixelShader = new three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_4__.ShaderPass(three_examples_jsm_shaders_PixelShader__WEBPACK_IMPORTED_MODULE_16__.PixelShader)
pixelShader.uniforms.resolution.value = new three__WEBPACK_IMPORTED_MODULE_21__.Vector2(256, 256)
const rgbShiftShader = new three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_4__.ShaderPass(three_examples_jsm_shaders_RGBShiftShader__WEBPACK_IMPORTED_MODULE_17__.RGBShiftShader)
const sepiaShader = new three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_4__.ShaderPass(three_examples_jsm_shaders_SepiaShader__WEBPACK_IMPORTED_MODULE_18__.SepiaShader)
const sobelOperatorShader = new three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_4__.ShaderPass(three_examples_jsm_shaders_SobelOperatorShader__WEBPACK_IMPORTED_MODULE_19__.SobelOperatorShader)
sobelOperatorShader.uniforms.resolution.value = new three__WEBPACK_IMPORTED_MODULE_21__.Vector2(256, 256)
const vignetteShader = new three_examples_jsm_postprocessing_ShaderPass__WEBPACK_IMPORTED_MODULE_4__.ShaderPass(three_examples_jsm_shaders_VignetteShader__WEBPACK_IMPORTED_MODULE_20__.VignetteShader)

const setupComposer = (renderer, scene, camera) => {
  const composer = new three_examples_jsm_postprocessing_EffectComposer__WEBPACK_IMPORTED_MODULE_2__.EffectComposer(renderer)
  composer.addPass(new three_examples_jsm_postprocessing_RenderPass__WEBPACK_IMPORTED_MODULE_3__.RenderPass(scene, camera))
  composer.addPass(bleachByPassFilter)
  composer.addPass(brightnessContrastShader)
  composer.addPass(colorifyShader)
  composer.addPass(colorCorrectionShader)
  composer.addPass(hueSaturationShader)
  composer.addPass(kaleidoShader)
  composer.addPass(luminosityHighPassShader)
  composer.addPass(luminosityShader)
  composer.addPass(mirrorShader)
  composer.addPass(pixelShader)
  composer.addPass(rgbShiftShader)
  composer.addPass(sepiaShader)
  composer.addPass(sobelOperatorShader)
  composer.addPass(vignetteShader)
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
    ;(0,_util_pass_controls__WEBPACK_IMPORTED_MODULE_22__.addShaderControl)(gui, 'BleachBypass', bleachByPassFilter, {
      floats: [{ key: 'opacity', from: 0, to: 2, step: 0.01 }]
    })
    ;(0,_util_pass_controls__WEBPACK_IMPORTED_MODULE_22__.addShaderControl)(gui, 'BrightnessContrast', brightnessContrastShader, {
      floats: [
        { key: 'brightness', from: 0, to: 1, step: 0.01 },
        { key: 'contrast', from: 0, to: 1, step: 0.01 }
      ]
    })
    ;(0,_util_pass_controls__WEBPACK_IMPORTED_MODULE_22__.addShaderControl)(gui, 'Colorify', colorifyShader, { colors: [{ key: 'color' }] })
    ;(0,_util_pass_controls__WEBPACK_IMPORTED_MODULE_22__.addShaderControl)(gui, 'ColorCorrection', colorCorrectionShader, {
      vector3: [
        { key: 'powRGB', from: { x: 0, y: 0, z: 0 }, to: { x: 5, y: 5, z: 5 }, step: { x: 0.01, y: 0.01, z: 0.01 } },
        { key: 'mulRGB', from: { x: 0, y: 0, z: 0 }, to: { x: 5, y: 5, z: 5 }, step: { x: 0.01, y: 0.01, z: 0.01 } },
        { key: 'addRGB', from: { x: 0, y: 0, z: 0 }, to: { x: 1, y: 1, z: 1 }, step: { x: 0.01, y: 0.01, z: 0.01 } }
      ]
    })
    ;(0,_util_pass_controls__WEBPACK_IMPORTED_MODULE_22__.addShaderControl)(gui, 'GammaCorrection', gammaCorrectionShader, {}, true)
    ;(0,_util_pass_controls__WEBPACK_IMPORTED_MODULE_22__.addShaderControl)(gui, 'HueSaturation', hueSaturationShader, {
      floats: [
        { key: 'hue', from: -1, to: 1, step: 0.01 },
        { key: 'saturation', from: -1, to: 1, step: 0.01 }
      ]
    })
    ;(0,_util_pass_controls__WEBPACK_IMPORTED_MODULE_22__.addShaderControl)(gui, 'Kaleido', kaleidoShader, {
      floats: [
        { key: 'sides', from: 0, to: 20, step: 1 },
        { key: 'angle', from: 0, to: 6.28, step: 0.01 }
      ]
    })
    ;(0,_util_pass_controls__WEBPACK_IMPORTED_MODULE_22__.addShaderControl)(gui, 'LuminosityHighPass', luminosityHighPassShader, {
      colors: [{ key: 'defaultColor' }],
      floats: [
        { key: 'luminosityThreshold', from: 0, to: 0.5, step: 0.0001 },
        { key: 'smoothWidth', from: 0, to: 1, step: 0.001 },
        { key: 'defaultOpacity', from: 0, to: 1, step: 0.01 }
      ]
    })
    ;(0,_util_pass_controls__WEBPACK_IMPORTED_MODULE_22__.addShaderControl)(gui, 'Luminosity', luminosityShader, {})
    ;(0,_util_pass_controls__WEBPACK_IMPORTED_MODULE_22__.addShaderControl)(gui, 'Mirror', mirrorShader, { floats: [{ key: 'side', from: 0, to: 3, step: 1 }] })
    ;(0,_util_pass_controls__WEBPACK_IMPORTED_MODULE_22__.addShaderControl)(gui, 'Pixel', pixelShader, {
      vector2: [{ key: 'resolution', from: { x: 2, y: 2 }, to: { x: 512, y: 512 }, step: { x: 1, y: 1 } }],
      floats: [{ key: 'pixelSize', from: 0, to: 10, step: 1 }]
    })
    ;(0,_util_pass_controls__WEBPACK_IMPORTED_MODULE_22__.addShaderControl)(gui, 'rgbShift', rgbShiftShader, {
      floats: [
        { key: 'angle', from: 0, to: 6.28, step: 0.001 },
        { key: 'amount', from: 0, to: 0.5, step: 0.001 }
      ]
    })
    ;(0,_util_pass_controls__WEBPACK_IMPORTED_MODULE_22__.addShaderControl)(gui, 'sepia', sepiaShader, { floats: [{ key: 'amount', from: 0, to: 10, step: 0.01 }] })
    ;(0,_util_pass_controls__WEBPACK_IMPORTED_MODULE_22__.addShaderControl)(gui, 'sobelOperator', sobelOperatorShader, {
      vector2: [{ key: 'resolution', from: { x: 2, y: 2 }, to: { x: 512, y: 512 }, step: { x: 1, y: 1 } }]
    })
    ;(0,_util_pass_controls__WEBPACK_IMPORTED_MODULE_22__.addShaderControl)(gui, 'vignette', vignetteShader, {
      floats: [
        { key: 'offset', from: 0, to: 10, step: 0.01 },
        { key: 'darkness', from: 0, to: 10, step: 0.01 }
      ]
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
/******/ 			"shaders": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","vendors-node_modules_three_examples_jsm_loaders_GLTFLoader_js","vendors-node_modules_three_examples_jsm_postprocessing_EffectComposer_js-node_modules_three_e-dd9777","vendors-node_modules_three_examples_jsm_postprocessing_UnrealBloomPass_js","vendors-node_modules_three_examples_jsm_postprocessing_BloomPass_js-node_modules_three_exampl-9bde57","vendors-node_modules_three_examples_jsm_shaders_BleachBypassShader_js-node_modules_three_exam-7f4b66","samples_bootstrap_bootstrap_js-samples_chapters_chapter-11_util_pass-controls_js-samples_cont-b2fed1"], () => (__webpack_require__("./samples/chapters/chapter-11/shaders.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0MvQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSwrQkFBK0Isd0NBQXdDO1dBQ3ZFO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUJBQWlCLHFCQUFxQjtXQUN0QztXQUNBO1dBQ0Esa0JBQWtCLHFCQUFxQjtXQUN2QztXQUNBO1dBQ0EsS0FBSztXQUNMO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFOzs7OztXQzNCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdELEU7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBLDRHOzs7OztVRWhEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2Jvb3RzdHJhcC9mbG9vci5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci0xMS9zaGFkZXJzLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTExL3V0aWwvc3RhbmRhcmQtc2NlbmUtbXVzaHJvb20uanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NvbnRyb2xzL2FuaW1hdGlvbi1jb250cm9scy5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvdXRpbC9tb2RlbFV0aWwuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcblxuZXhwb3J0IGNvbnN0IGZvcmV2ZXJQbGFuZSA9IChzY2VuZSkgPT4ge1xuICBjb25zdCBnZW8gPSBuZXcgVEhSRUUuUGxhbmVCdWZmZXJHZW9tZXRyeSgxMDAwMCwgMTAwMDApXG4gIGNvbnN0IG1hdCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHtcbiAgICBjb2xvcjogMHhmZmZmZmZcbiAgfSlcbiAgY29uc3QgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlbywgbWF0KVxuICBtZXNoLnBvc2l0aW9uLnNldCgwLCAtMiwgMClcbiAgbWVzaC5yb3RhdGlvbi5zZXQoTWF0aC5QSSAvIC0yLCAwLCAwKVxuICBtZXNoLnJlY2VpdmVTaGFkb3cgPSB0cnVlXG4gIG1lc2gubmFtZSA9ICdmb3JldmVyLWZsb29yJ1xuICBzY2VuZS5hZGQobWVzaClcblxuICByZXR1cm4gbWVzaFxufVxuXG5leHBvcnQgY29uc3QgZmxvYXRpbmdGbG9vciA9IChzY2VuZSwgc2l6ZSkgPT4ge1xuICBjb25zdCBzID0gc2l6ZSA/IHNpemUgOiA2XG4gIGNvbnN0IGdlbyA9IG5ldyBUSFJFRS5Cb3hCdWZmZXJHZW9tZXRyeShzLCAwLjI1LCBzLCAxMCwgMTAsIDEwKVxuICBjb25zdCBtYXQgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoe1xuICAgIGNvbG9yOiAweGRkZGRkZFxuICB9KVxuICBjb25zdCBtZXNoID0gbmV3IFRIUkVFLk1lc2goZ2VvLCBtYXQpXG4gIG1lc2gucG9zaXRpb24uc2V0KDAsIC0yLCAtMSlcbiAgbWVzaC5yZWNlaXZlU2hhZG93ID0gdHJ1ZVxuICBtZXNoLm5hbWUgPSAnZmxvYXRpbmctZmxvb3InXG4gIHNjZW5lLmFkZChtZXNoKVxuXG4gIHJldHVybiBtZXNoXG59XG4iLCJpbXBvcnQgeyBib290c3RyYXBNZXNoU2NlbmUgfSBmcm9tICcuL3V0aWwvc3RhbmRhcmQtc2NlbmUtbXVzaHJvb20nXG5pbXBvcnQgeyBPcmJpdENvbnRyb2xzIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2NvbnRyb2xzL09yYml0Q29udHJvbHMnXG5cbmltcG9ydCB7IEVmZmVjdENvbXBvc2VyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL3Bvc3Rwcm9jZXNzaW5nL0VmZmVjdENvbXBvc2VyJ1xuaW1wb3J0IHsgUmVuZGVyUGFzcyB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9wb3N0cHJvY2Vzc2luZy9SZW5kZXJQYXNzJ1xuaW1wb3J0IHsgU2hhZGVyUGFzcyB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9wb3N0cHJvY2Vzc2luZy9TaGFkZXJQYXNzJ1xuXG5pbXBvcnQgeyBDb3B5U2hhZGVyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL3NoYWRlcnMvQ29weVNoYWRlcidcbmltcG9ydCB7IENvbG9yaWZ5U2hhZGVyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL3NoYWRlcnMvQ29sb3JpZnlTaGFkZXInXG5pbXBvcnQgeyBCbGVhY2hCeXBhc3NTaGFkZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vc2hhZGVycy9CbGVhY2hCeXBhc3NTaGFkZXInXG5pbXBvcnQgeyBCcmlnaHRuZXNzQ29udHJhc3RTaGFkZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vc2hhZGVycy9CcmlnaHRuZXNzQ29udHJhc3RTaGFkZXInXG5pbXBvcnQgeyBDb2xvckNvcnJlY3Rpb25TaGFkZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vc2hhZGVycy9Db2xvckNvcnJlY3Rpb25TaGFkZXInXG5pbXBvcnQgeyBHYW1tYUNvcnJlY3Rpb25TaGFkZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vc2hhZGVycy9HYW1tYUNvcnJlY3Rpb25TaGFkZXInXG5pbXBvcnQgeyBIdWVTYXR1cmF0aW9uU2hhZGVyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL3NoYWRlcnMvSHVlU2F0dXJhdGlvblNoYWRlcidcbmltcG9ydCB7IEthbGVpZG9TaGFkZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vc2hhZGVycy9LYWxlaWRvU2hhZGVyJ1xuaW1wb3J0IHsgTHVtaW5vc2l0eUhpZ2hQYXNzU2hhZGVyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL3NoYWRlcnMvTHVtaW5vc2l0eUhpZ2hQYXNzU2hhZGVyJ1xuaW1wb3J0IHsgTHVtaW5vc2l0eVNoYWRlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9zaGFkZXJzL0x1bWlub3NpdHlTaGFkZXInXG5pbXBvcnQgeyBNaXJyb3JTaGFkZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vc2hhZGVycy9NaXJyb3JTaGFkZXInXG5pbXBvcnQgeyBQaXhlbFNoYWRlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9zaGFkZXJzL1BpeGVsU2hhZGVyJ1xuaW1wb3J0IHsgUkdCU2hpZnRTaGFkZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vc2hhZGVycy9SR0JTaGlmdFNoYWRlcidcbmltcG9ydCB7IFNlcGlhU2hhZGVyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL3NoYWRlcnMvU2VwaWFTaGFkZXInXG5pbXBvcnQgeyBTb2JlbE9wZXJhdG9yU2hhZGVyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL3NoYWRlcnMvU29iZWxPcGVyYXRvclNoYWRlcidcbmltcG9ydCB7IFZpZ25ldHRlU2hhZGVyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL3NoYWRlcnMvVmlnbmV0dGVTaGFkZXInXG5cbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuaW1wb3J0IHsgYWRkU2hhZGVyQ29udHJvbCB9IGZyb20gJy4vdXRpbC9wYXNzLWNvbnRyb2xzJ1xuXG5jb25zdCBlZmZlY3RDb3B5ID0gbmV3IFNoYWRlclBhc3MoQ29weVNoYWRlcilcbmVmZmVjdENvcHkucmVuZGVyVG9TY3JlZW4gPSB0cnVlXG5jb25zdCBibGVhY2hCeVBhc3NGaWx0ZXIgPSBuZXcgU2hhZGVyUGFzcyhCbGVhY2hCeXBhc3NTaGFkZXIpXG5jb25zdCBicmlnaHRuZXNzQ29udHJhc3RTaGFkZXIgPSBuZXcgU2hhZGVyUGFzcyhCcmlnaHRuZXNzQ29udHJhc3RTaGFkZXIpXG5jb25zdCBjb2xvcmlmeVNoYWRlciA9IG5ldyBTaGFkZXJQYXNzKENvbG9yaWZ5U2hhZGVyKVxuY29uc3QgY29sb3JDb3JyZWN0aW9uU2hhZGVyID0gbmV3IFNoYWRlclBhc3MoQ29sb3JDb3JyZWN0aW9uU2hhZGVyKVxuY29uc3QgZ2FtbWFDb3JyZWN0aW9uU2hhZGVyID0gbmV3IFNoYWRlclBhc3MoR2FtbWFDb3JyZWN0aW9uU2hhZGVyKVxuY29uc3QgaHVlU2F0dXJhdGlvblNoYWRlciA9IG5ldyBTaGFkZXJQYXNzKEh1ZVNhdHVyYXRpb25TaGFkZXIpXG5jb25zdCBrYWxlaWRvU2hhZGVyID0gbmV3IFNoYWRlclBhc3MoS2FsZWlkb1NoYWRlcilcbmNvbnN0IGx1bWlub3NpdHlIaWdoUGFzc1NoYWRlciA9IG5ldyBTaGFkZXJQYXNzKEx1bWlub3NpdHlIaWdoUGFzc1NoYWRlcilcbmNvbnN0IGx1bWlub3NpdHlTaGFkZXIgPSBuZXcgU2hhZGVyUGFzcyhMdW1pbm9zaXR5U2hhZGVyKVxuY29uc3QgbWlycm9yU2hhZGVyID0gbmV3IFNoYWRlclBhc3MoTWlycm9yU2hhZGVyKVxuY29uc3QgcGl4ZWxTaGFkZXIgPSBuZXcgU2hhZGVyUGFzcyhQaXhlbFNoYWRlcilcbnBpeGVsU2hhZGVyLnVuaWZvcm1zLnJlc29sdXRpb24udmFsdWUgPSBuZXcgVEhSRUUuVmVjdG9yMigyNTYsIDI1NilcbmNvbnN0IHJnYlNoaWZ0U2hhZGVyID0gbmV3IFNoYWRlclBhc3MoUkdCU2hpZnRTaGFkZXIpXG5jb25zdCBzZXBpYVNoYWRlciA9IG5ldyBTaGFkZXJQYXNzKFNlcGlhU2hhZGVyKVxuY29uc3Qgc29iZWxPcGVyYXRvclNoYWRlciA9IG5ldyBTaGFkZXJQYXNzKFNvYmVsT3BlcmF0b3JTaGFkZXIpXG5zb2JlbE9wZXJhdG9yU2hhZGVyLnVuaWZvcm1zLnJlc29sdXRpb24udmFsdWUgPSBuZXcgVEhSRUUuVmVjdG9yMigyNTYsIDI1NilcbmNvbnN0IHZpZ25ldHRlU2hhZGVyID0gbmV3IFNoYWRlclBhc3MoVmlnbmV0dGVTaGFkZXIpXG5cbmNvbnN0IHNldHVwQ29tcG9zZXIgPSAocmVuZGVyZXIsIHNjZW5lLCBjYW1lcmEpID0+IHtcbiAgY29uc3QgY29tcG9zZXIgPSBuZXcgRWZmZWN0Q29tcG9zZXIocmVuZGVyZXIpXG4gIGNvbXBvc2VyLmFkZFBhc3MobmV3IFJlbmRlclBhc3Moc2NlbmUsIGNhbWVyYSkpXG4gIGNvbXBvc2VyLmFkZFBhc3MoYmxlYWNoQnlQYXNzRmlsdGVyKVxuICBjb21wb3Nlci5hZGRQYXNzKGJyaWdodG5lc3NDb250cmFzdFNoYWRlcilcbiAgY29tcG9zZXIuYWRkUGFzcyhjb2xvcmlmeVNoYWRlcilcbiAgY29tcG9zZXIuYWRkUGFzcyhjb2xvckNvcnJlY3Rpb25TaGFkZXIpXG4gIGNvbXBvc2VyLmFkZFBhc3MoaHVlU2F0dXJhdGlvblNoYWRlcilcbiAgY29tcG9zZXIuYWRkUGFzcyhrYWxlaWRvU2hhZGVyKVxuICBjb21wb3Nlci5hZGRQYXNzKGx1bWlub3NpdHlIaWdoUGFzc1NoYWRlcilcbiAgY29tcG9zZXIuYWRkUGFzcyhsdW1pbm9zaXR5U2hhZGVyKVxuICBjb21wb3Nlci5hZGRQYXNzKG1pcnJvclNoYWRlcilcbiAgY29tcG9zZXIuYWRkUGFzcyhwaXhlbFNoYWRlcilcbiAgY29tcG9zZXIuYWRkUGFzcyhyZ2JTaGlmdFNoYWRlcilcbiAgY29tcG9zZXIuYWRkUGFzcyhzZXBpYVNoYWRlcilcbiAgY29tcG9zZXIuYWRkUGFzcyhzb2JlbE9wZXJhdG9yU2hhZGVyKVxuICBjb21wb3Nlci5hZGRQYXNzKHZpZ25ldHRlU2hhZGVyKVxuICBjb21wb3Nlci5hZGRQYXNzKGdhbW1hQ29ycmVjdGlvblNoYWRlcilcbiAgY29tcG9zZXIuYWRkUGFzcyhlZmZlY3RDb3B5KVxuICByZXR1cm4gY29tcG9zZXJcbn1cblxuY29uc3QgYW5pbWF0ZSA9IChyZW5kZXJlciwgY29tcG9zZXIpID0+IHtcbiAgcmVuZGVyZXIuYXV0b0NsZWFyID0gZmFsc2VcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IGFuaW1hdGUocmVuZGVyZXIsIGNvbXBvc2VyKSlcbiAgY29tcG9zZXIucmVuZGVyKClcbn1cblxuYm9vdHN0cmFwTWVzaFNjZW5lKHtcbiAgYWRkQ29udHJvbHM6IChjYW1lcmEsIHJlbmRlcmVyLCBzY2VuZSwgZ3VpKSA9PiB7XG4gICAgbmV3IE9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlci5kb21FbGVtZW50KVxuICAgIGFkZFNoYWRlckNvbnRyb2woZ3VpLCAnQmxlYWNoQnlwYXNzJywgYmxlYWNoQnlQYXNzRmlsdGVyLCB7XG4gICAgICBmbG9hdHM6IFt7IGtleTogJ29wYWNpdHknLCBmcm9tOiAwLCB0bzogMiwgc3RlcDogMC4wMSB9XVxuICAgIH0pXG4gICAgYWRkU2hhZGVyQ29udHJvbChndWksICdCcmlnaHRuZXNzQ29udHJhc3QnLCBicmlnaHRuZXNzQ29udHJhc3RTaGFkZXIsIHtcbiAgICAgIGZsb2F0czogW1xuICAgICAgICB7IGtleTogJ2JyaWdodG5lc3MnLCBmcm9tOiAwLCB0bzogMSwgc3RlcDogMC4wMSB9LFxuICAgICAgICB7IGtleTogJ2NvbnRyYXN0JywgZnJvbTogMCwgdG86IDEsIHN0ZXA6IDAuMDEgfVxuICAgICAgXVxuICAgIH0pXG4gICAgYWRkU2hhZGVyQ29udHJvbChndWksICdDb2xvcmlmeScsIGNvbG9yaWZ5U2hhZGVyLCB7IGNvbG9yczogW3sga2V5OiAnY29sb3InIH1dIH0pXG4gICAgYWRkU2hhZGVyQ29udHJvbChndWksICdDb2xvckNvcnJlY3Rpb24nLCBjb2xvckNvcnJlY3Rpb25TaGFkZXIsIHtcbiAgICAgIHZlY3RvcjM6IFtcbiAgICAgICAgeyBrZXk6ICdwb3dSR0InLCBmcm9tOiB7IHg6IDAsIHk6IDAsIHo6IDAgfSwgdG86IHsgeDogNSwgeTogNSwgejogNSB9LCBzdGVwOiB7IHg6IDAuMDEsIHk6IDAuMDEsIHo6IDAuMDEgfSB9LFxuICAgICAgICB7IGtleTogJ211bFJHQicsIGZyb206IHsgeDogMCwgeTogMCwgejogMCB9LCB0bzogeyB4OiA1LCB5OiA1LCB6OiA1IH0sIHN0ZXA6IHsgeDogMC4wMSwgeTogMC4wMSwgejogMC4wMSB9IH0sXG4gICAgICAgIHsga2V5OiAnYWRkUkdCJywgZnJvbTogeyB4OiAwLCB5OiAwLCB6OiAwIH0sIHRvOiB7IHg6IDEsIHk6IDEsIHo6IDEgfSwgc3RlcDogeyB4OiAwLjAxLCB5OiAwLjAxLCB6OiAwLjAxIH0gfVxuICAgICAgXVxuICAgIH0pXG4gICAgYWRkU2hhZGVyQ29udHJvbChndWksICdHYW1tYUNvcnJlY3Rpb24nLCBnYW1tYUNvcnJlY3Rpb25TaGFkZXIsIHt9LCB0cnVlKVxuICAgIGFkZFNoYWRlckNvbnRyb2woZ3VpLCAnSHVlU2F0dXJhdGlvbicsIGh1ZVNhdHVyYXRpb25TaGFkZXIsIHtcbiAgICAgIGZsb2F0czogW1xuICAgICAgICB7IGtleTogJ2h1ZScsIGZyb206IC0xLCB0bzogMSwgc3RlcDogMC4wMSB9LFxuICAgICAgICB7IGtleTogJ3NhdHVyYXRpb24nLCBmcm9tOiAtMSwgdG86IDEsIHN0ZXA6IDAuMDEgfVxuICAgICAgXVxuICAgIH0pXG4gICAgYWRkU2hhZGVyQ29udHJvbChndWksICdLYWxlaWRvJywga2FsZWlkb1NoYWRlciwge1xuICAgICAgZmxvYXRzOiBbXG4gICAgICAgIHsga2V5OiAnc2lkZXMnLCBmcm9tOiAwLCB0bzogMjAsIHN0ZXA6IDEgfSxcbiAgICAgICAgeyBrZXk6ICdhbmdsZScsIGZyb206IDAsIHRvOiA2LjI4LCBzdGVwOiAwLjAxIH1cbiAgICAgIF1cbiAgICB9KVxuICAgIGFkZFNoYWRlckNvbnRyb2woZ3VpLCAnTHVtaW5vc2l0eUhpZ2hQYXNzJywgbHVtaW5vc2l0eUhpZ2hQYXNzU2hhZGVyLCB7XG4gICAgICBjb2xvcnM6IFt7IGtleTogJ2RlZmF1bHRDb2xvcicgfV0sXG4gICAgICBmbG9hdHM6IFtcbiAgICAgICAgeyBrZXk6ICdsdW1pbm9zaXR5VGhyZXNob2xkJywgZnJvbTogMCwgdG86IDAuNSwgc3RlcDogMC4wMDAxIH0sXG4gICAgICAgIHsga2V5OiAnc21vb3RoV2lkdGgnLCBmcm9tOiAwLCB0bzogMSwgc3RlcDogMC4wMDEgfSxcbiAgICAgICAgeyBrZXk6ICdkZWZhdWx0T3BhY2l0eScsIGZyb206IDAsIHRvOiAxLCBzdGVwOiAwLjAxIH1cbiAgICAgIF1cbiAgICB9KVxuICAgIGFkZFNoYWRlckNvbnRyb2woZ3VpLCAnTHVtaW5vc2l0eScsIGx1bWlub3NpdHlTaGFkZXIsIHt9KVxuICAgIGFkZFNoYWRlckNvbnRyb2woZ3VpLCAnTWlycm9yJywgbWlycm9yU2hhZGVyLCB7IGZsb2F0czogW3sga2V5OiAnc2lkZScsIGZyb206IDAsIHRvOiAzLCBzdGVwOiAxIH1dIH0pXG4gICAgYWRkU2hhZGVyQ29udHJvbChndWksICdQaXhlbCcsIHBpeGVsU2hhZGVyLCB7XG4gICAgICB2ZWN0b3IyOiBbeyBrZXk6ICdyZXNvbHV0aW9uJywgZnJvbTogeyB4OiAyLCB5OiAyIH0sIHRvOiB7IHg6IDUxMiwgeTogNTEyIH0sIHN0ZXA6IHsgeDogMSwgeTogMSB9IH1dLFxuICAgICAgZmxvYXRzOiBbeyBrZXk6ICdwaXhlbFNpemUnLCBmcm9tOiAwLCB0bzogMTAsIHN0ZXA6IDEgfV1cbiAgICB9KVxuICAgIGFkZFNoYWRlckNvbnRyb2woZ3VpLCAncmdiU2hpZnQnLCByZ2JTaGlmdFNoYWRlciwge1xuICAgICAgZmxvYXRzOiBbXG4gICAgICAgIHsga2V5OiAnYW5nbGUnLCBmcm9tOiAwLCB0bzogNi4yOCwgc3RlcDogMC4wMDEgfSxcbiAgICAgICAgeyBrZXk6ICdhbW91bnQnLCBmcm9tOiAwLCB0bzogMC41LCBzdGVwOiAwLjAwMSB9XG4gICAgICBdXG4gICAgfSlcbiAgICBhZGRTaGFkZXJDb250cm9sKGd1aSwgJ3NlcGlhJywgc2VwaWFTaGFkZXIsIHsgZmxvYXRzOiBbeyBrZXk6ICdhbW91bnQnLCBmcm9tOiAwLCB0bzogMTAsIHN0ZXA6IDAuMDEgfV0gfSlcbiAgICBhZGRTaGFkZXJDb250cm9sKGd1aSwgJ3NvYmVsT3BlcmF0b3InLCBzb2JlbE9wZXJhdG9yU2hhZGVyLCB7XG4gICAgICB2ZWN0b3IyOiBbeyBrZXk6ICdyZXNvbHV0aW9uJywgZnJvbTogeyB4OiAyLCB5OiAyIH0sIHRvOiB7IHg6IDUxMiwgeTogNTEyIH0sIHN0ZXA6IHsgeDogMSwgeTogMSB9IH1dXG4gICAgfSlcbiAgICBhZGRTaGFkZXJDb250cm9sKGd1aSwgJ3ZpZ25ldHRlJywgdmlnbmV0dGVTaGFkZXIsIHtcbiAgICAgIGZsb2F0czogW1xuICAgICAgICB7IGtleTogJ29mZnNldCcsIGZyb206IDAsIHRvOiAxMCwgc3RlcDogMC4wMSB9LFxuICAgICAgICB7IGtleTogJ2RhcmtuZXNzJywgZnJvbTogMCwgdG86IDEwLCBzdGVwOiAwLjAxIH1cbiAgICAgIF1cbiAgICB9KVxuICAgIHJldHVybiBndWlcbiAgfSxcbiAgaW5pdGlhbGl6ZUNvbXBvc2VyOiAocmVuZGVyZXIsIHNjZW5lLCBjYW1lcmEpID0+IHNldHVwQ29tcG9zZXIocmVuZGVyZXIsIHNjZW5lLCBjYW1lcmEpLFxuICBhbmltYXRlOiAocmVuZGVyZXIsIGNvbXBvc2VyLCBtaXhlciwgY2xvY2spID0+IGFuaW1hdGUocmVuZGVyZXIsIGNvbXBvc2VyLCBtaXhlciwgY2xvY2spXG59KS50aGVuKClcbiIsImltcG9ydCB7IGluaXRTY2VuZSB9IGZyb20gJy4uLy4uLy4uL2Jvb3RzdHJhcC9ib290c3RyYXAnXG5pbXBvcnQgeyBpbnRpYWxpemVSZW5kZXJlckNvbnRyb2xzIH0gZnJvbSAnLi4vLi4vLi4vY29udHJvbHMvcmVuZGVyZXItY29udHJvbCdcblxuaW1wb3J0IEdVSSBmcm9tICdsaWwtZ3VpJ1xuaW1wb3J0IHsgaW5pdGlhbGl6ZVNjZW5lQ29udHJvbHMgfSBmcm9tICcuLi8uLi8uLi9jb250cm9scy9zY2VuZS1jb250cm9scydcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuaW1wb3J0IHsgZmxvYXRpbmdGbG9vciB9IGZyb20gJy4uLy4uLy4uL2Jvb3RzdHJhcC9mbG9vcidcbmltcG9ydCB7IEdMVEZMb2FkZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyJ1xuaW1wb3J0IHsgYXBwbHlTaGFkb3dzQW5kRGVwdGhXcml0ZSB9IGZyb20gJy4uLy4uLy4uL3V0aWwvbW9kZWxVdGlsJ1xuaW1wb3J0IHsgaW5pdGlhbGl6ZUFuaW1hdGlvbkNvbnRyb2xzIH0gZnJvbSAnLi4vLi4vLi4vY29udHJvbHMvYW5pbWF0aW9uLWNvbnRyb2xzJ1xuXG5leHBvcnQgY29uc3QgYm9vdHN0cmFwTWVzaFNjZW5lID0gYXN5bmMgKHtcbiAgcHJvdmlkZUd1aSxcbiAgaGlkZWZsb29yLFxuICBmbG9vclNpemUsXG4gIGJhY2tncm91bmRDb2xvcixcbiAgb25SZW5kZXIsXG4gIGFkZENvbnRyb2xzLFxuICBpbml0aWFsaXplQ29tcG9zZXIsXG4gIGFuaW1hdGVcbn0pID0+IHtcbiAgY29uc3QgcHJvcHMgPSB7XG4gICAgYmFja2dyb3VuZENvbG9yOiBiYWNrZ3JvdW5kQ29sb3IgPz8gMHhmZmZmZmYsXG4gICAgZGlzYWJsZURlZmF1bHRDb250cm9sczogdHJ1ZVxuICB9XG5cbiAgY29uc3QgY2xvY2sgPSBuZXcgVEhSRUUuQ2xvY2soKVxuICBjb25zdCBsb2FkZXIgPSBuZXcgR0xURkxvYWRlcigpXG4gIGNvbnN0IG1lc2ggPSBhd2FpdCBsb2FkZXIubG9hZEFzeW5jKCcvYXNzZXRzL21vZGVscy90cnVmZmxlX21hbi9zY2VuZS5nbHRmJykudGhlbigoY29udGFpbmVyKSA9PiB7XG4gICAgY29udGFpbmVyLnNjZW5lLnNjYWxlLnNldFNjYWxhcig0KVxuICAgIGNvbnRhaW5lci5zY2VuZS50cmFuc2xhdGVZKC0yKVxuICAgIGFwcGx5U2hhZG93c0FuZERlcHRoV3JpdGUoY29udGFpbmVyLnNjZW5lKVxuICAgIGNvbnRhaW5lci5zY2VuZS5uYW1lID0gJ211c2hyb29tLW1hbidcbiAgICByZXR1cm4gY29udGFpbmVyLnNjZW5lXG4gIH0pXG5cbiAgY29uc3QgZ3VpID0gbmV3IEdVSSgpXG5cbiAgY29uc3QgaW5pdCA9IGFzeW5jICgpID0+IHtcbiAgICBpbml0U2NlbmUocHJvcHMpKCh7IHNjZW5lLCBjYW1lcmEsIHJlbmRlcmVyIH0pID0+IHtcbiAgICAgIHJlbmRlcmVyLnNoYWRvd01hcC50eXBlID0gVEhSRUUuUENGU29mdFNoYWRvd01hcFxuICAgICAgY2FtZXJhLnBvc2l0aW9uLnggPSAtM1xuICAgICAgY2FtZXJhLnBvc2l0aW9uLnogPSA4XG4gICAgICBjYW1lcmEucG9zaXRpb24ueSA9IDJcblxuICAgICAgaGlkZWZsb29yID8/IGZsb2F0aW5nRmxvb3Ioc2NlbmUsIGZsb29yU2l6ZSA/PyA4KVxuXG4gICAgICBpZiAobWVzaCkgc2NlbmUuYWRkKG1lc2gpXG5cbiAgICAgIGludGlhbGl6ZVJlbmRlcmVyQ29udHJvbHMoZ3VpLCByZW5kZXJlcilcbiAgICAgIGluaXRpYWxpemVTY2VuZUNvbnRyb2xzKGd1aSwgc2NlbmUsIGZhbHNlKVxuXG4gICAgICBjb25zdCBjb21wb3NlciA9IGluaXRpYWxpemVDb21wb3NlcihyZW5kZXJlciwgc2NlbmUsIGNhbWVyYSwgbWVzaClcblxuICAgICAgaWYgKHByb3ZpZGVHdWkpIHByb3ZpZGVHdWkoZ3VpLCBtZXNoLCBzY2VuZSlcbiAgICAgIGlmIChhZGRDb250cm9scykge1xuICAgICAgICBhZGRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLCBzY2VuZSwgZ3VpLCBtZXNoKVxuICAgICAgfVxuXG4gICAgICBhbmltYXRlKHJlbmRlcmVyLCBjb21wb3NlciwgY2xvY2spXG4gICAgfSlcbiAgfVxuXG4gIGluaXQoKS50aGVuKClcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZUFuaW1hdGlvbkNvbnRyb2xzID0gKG1peGVyLCBhY3Rpb24sIGNsaXAsIGd1aSkgPT4ge1xuICBjb25zdCBwcm9wcyA9IHtcbiAgICByZXBldGl0aW9uczogSW5maW5pdHksXG4gICAgLy8gd2FycFxuICAgIHdhcnBTdGFydFRpbWVTY2FsZTogMSxcbiAgICB3YXJwRW5kVGltZVNjYWxlOiAxLFxuICAgIHdhcnBEdXJhdGlvbkluU2Vjb25kczogMixcbiAgICB3YXJwOiBmdW5jdGlvbiAoKSB7XG4gICAgICBhY3Rpb24ud2FycChwcm9wcy53YXJwU3RhcnRUaW1lU2NhbGUsIHByb3BzLndhcnBFbmRUaW1lU2NhbGUsIHByb3BzLndhcnBEdXJhdGlvbkluU2Vjb25kcylcbiAgICB9LFxuICAgIGZhZGVEdXJhdGlvbkluU2Vjb25kczogMixcbiAgICBmYWRlSW46IGZ1bmN0aW9uICgpIHtcbiAgICAgIGFjdGlvbi5mYWRlSW4ocHJvcHMuZmFkZUR1cmF0aW9uSW5TZWNvbmRzKVxuICAgIH0sXG4gICAgZmFkZU91dDogZnVuY3Rpb24gKCkge1xuICAgICAgYWN0aW9uLmZhZGVPdXQocHJvcHMuZmFkZUR1cmF0aW9uSW5TZWNvbmRzKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG1peGVyRm9sZGVyID0gZ3VpLmFkZEZvbGRlcignQW5pbWF0aW9uTWl4ZXInKVxuICBtaXhlckZvbGRlci5hZGQobWl4ZXIsICd0aW1lJykubGlzdGVuKClcbiAgbWl4ZXJGb2xkZXIuYWRkKG1peGVyLCAndGltZVNjYWxlJywgMCwgNSlcbiAgbWl4ZXJGb2xkZXIuYWRkKG1peGVyLCAnc3RvcEFsbEFjdGlvbicpXG5cbiAgY29uc3QgYWN0aW9uRm9sZGVyID0gZ3VpLmFkZEZvbGRlcignQW5pbWF0aW9uQWN0aW9uJylcblxuICBhY3Rpb25Gb2xkZXIuYWRkKGFjdGlvbiwgJ2NsYW1wV2hlbkZpbmlzaGVkJykubGlzdGVuKClcbiAgYWN0aW9uRm9sZGVyLmFkZChhY3Rpb24sICdlbmFibGVkJykubGlzdGVuKClcbiAgYWN0aW9uRm9sZGVyLmFkZChhY3Rpb24sICdwYXVzZWQnKS5saXN0ZW4oKVxuICBhY3Rpb25Gb2xkZXJcbiAgICAuYWRkKGFjdGlvbiwgJ2xvb3AnLCB7XG4gICAgICBMb29wUmVwZWF0OiBUSFJFRS5Mb29wUmVwZWF0LFxuICAgICAgTG9vcE9uY2U6IFRIUkVFLkxvb3BPbmNlLFxuICAgICAgTG9vcFBpbmdQb25nOiBUSFJFRS5Mb29wUGluZ1BvbmdcbiAgICB9KVxuICAgIC5vbkNoYW5nZSgoZSkgPT4ge1xuICAgICAgaWYgKGUgPT0gVEhSRUUuTG9vcE9uY2UgfHwgZSA9PSBUSFJFRS5Mb29wUGluZ1BvbmcpIHtcbiAgICAgICAgYWN0aW9uLnJlc2V0KClcbiAgICAgICAgYWN0aW9uLnJlcGV0aXRpb25zID0gdW5kZWZpbmVkXG4gICAgICAgIGFjdGlvbi5zZXRMb29wKHBhcnNlSW50KGUpLCB1bmRlZmluZWQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhY3Rpb24uc2V0TG9vcChwYXJzZUludChlKSwgYWN0aW9uLnJlcGV0aXRpb25zKVxuICAgICAgfVxuICAgIH0pXG4gIGFjdGlvbkZvbGRlclxuICAgIC5hZGQoYWN0aW9uLCAncmVwZXRpdGlvbnMnLCAwLCAxMDAsIDEpXG4gICAgLmxpc3RlbigpXG4gICAgLm9uQ2hhbmdlKGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoYWN0aW9uLmxvb3AgPT0gVEhSRUUuTG9vcE9uY2UgfHwgYWN0aW9uLmxvb3AgPT0gVEhSRUUuTG9vcFBpbmdQb25nKSB7XG4gICAgICAgIGFjdGlvbi5yZXNldCgpXG4gICAgICAgIGFjdGlvbi5yZXBldGl0aW9ucyA9IHVuZGVmaW5lZFxuICAgICAgICBhY3Rpb24uc2V0TG9vcChwYXJzZUludChhY3Rpb24ubG9vcCksIHVuZGVmaW5lZClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFjdGlvbi5zZXRMb29wKHBhcnNlSW50KGUpLCBhY3Rpb24ucmVwZXRpdGlvbnMpXG4gICAgICB9XG4gICAgfSlcbiAgYWN0aW9uRm9sZGVyLmFkZChhY3Rpb24sICd0aW1lJywgMCwgY2xpcC5kdXJhdGlvbiwgMC4wMDEpLmxpc3RlbigpXG4gIGFjdGlvbkZvbGRlci5hZGQoYWN0aW9uLCAndGltZVNjYWxlJywgMCwgNSwgMC4xKS5saXN0ZW4oKVxuICBhY3Rpb25Gb2xkZXIuYWRkKGFjdGlvbiwgJ3dlaWdodCcsIDAsIDEsIDAuMDEpLmxpc3RlbigpXG4gIGFjdGlvbkZvbGRlci5hZGQoYWN0aW9uLCAnemVyb1Nsb3BlQXRFbmQnKS5saXN0ZW4oKVxuICBhY3Rpb25Gb2xkZXIuYWRkKGFjdGlvbiwgJ3plcm9TbG9wZUF0U3RhcnQnKS5saXN0ZW4oKVxuICBhY3Rpb25Gb2xkZXIuYWRkKGFjdGlvbiwgJ3N0b3AnKVxuICBhY3Rpb25Gb2xkZXIuYWRkKGFjdGlvbiwgJ3BsYXknKVxuICBhY3Rpb25Gb2xkZXIuYWRkKGFjdGlvbiwgJ3Jlc2V0JylcbiAgYWN0aW9uRm9sZGVyLmFkZChwcm9wcywgJ3dhcnBTdGFydFRpbWVTY2FsZScsIDAsIDEwLCAwLjAxKVxuICBhY3Rpb25Gb2xkZXIuYWRkKHByb3BzLCAnd2FycEVuZFRpbWVTY2FsZScsIDAsIDEwLCAwLjAxKVxuICBhY3Rpb25Gb2xkZXIuYWRkKHByb3BzLCAnd2FycER1cmF0aW9uSW5TZWNvbmRzJywgMCwgMTAsIDAuMDEpXG4gIGFjdGlvbkZvbGRlci5hZGQocHJvcHMsICd3YXJwJylcbiAgYWN0aW9uRm9sZGVyLmFkZChwcm9wcywgJ2ZhZGVEdXJhdGlvbkluU2Vjb25kcycsIDAsIDEwLCAwLjAxKVxuICBhY3Rpb25Gb2xkZXIuYWRkKHByb3BzLCAnZmFkZUluJylcbiAgYWN0aW9uRm9sZGVyLmFkZChwcm9wcywgJ2ZhZGVPdXQnKVxuXG4gIHJldHVybiB7XG4gICAgYWN0aW9uRm9sZGVyLFxuICAgIG1peGVyRm9sZGVyXG4gIH1cbn1cbiIsImV4cG9ydCBjb25zdCB2aXNpdENoaWxkcmVuID0gKG9iamVjdCwgZm4pID0+IHtcbiAgaWYgKG9iamVjdC5jaGlsZHJlbiAmJiBvYmplY3QuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgIGZvciAoY29uc3QgY2hpbGQgb2Ygb2JqZWN0LmNoaWxkcmVuKSB7XG4gICAgICB2aXNpdENoaWxkcmVuKGNoaWxkLCBmbilcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZm4ob2JqZWN0KVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBhcHBseVNoYWRvd3NBbmREZXB0aFdyaXRlID0gKG9iamVjdCkgPT4ge1xuICB2aXNpdENoaWxkcmVuKG9iamVjdCwgKGNoaWxkKSA9PiB7XG4gICAgaWYgKGNoaWxkLm1hdGVyaWFsKSB7XG4gICAgICBjaGlsZC5tYXRlcmlhbC5kZXB0aFdyaXRlID0gdHJ1ZVxuICAgICAgY2hpbGQuY2FzdFNoYWRvdyA9IHRydWVcbiAgICAgIGNoaWxkLnJlY2VpdmVTaGFkb3cgPSB0cnVlXG4gICAgfVxuICB9KVxufVxuXG5leHBvcnQgY29uc3QgZmluZENoaWxkID0gKG9iamVjdCwgbmFtZSkgPT4ge1xuICBpZiAob2JqZWN0LmNoaWxkcmVuICYmIG9iamVjdC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgZm9yIChjb25zdCBjaGlsZCBvZiBvYmplY3QuY2hpbGRyZW4pIHtcbiAgICAgIGlmIChuYW1lID09PSBjaGlsZC5uYW1lKSB7XG4gICAgICAgIHJldHVybiBjaGlsZFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcmVzID0gZmluZENoaWxkKGNoaWxkLCBuYW1lKVxuICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChuYW1lID09PSBvYmplY3QubmFtZSkge1xuICAgICAgcmV0dXJuIG9iamVjdFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfVxuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcInNoYWRlcnNcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rbHRqc19mb3VydGhcIl0gPSBzZWxmW1wid2VicGFja0NodW5rbHRqc19mb3VydGhcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2J1aWxkX3RocmVlX21vZHVsZV9qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX2NvbnRyb2xzX09yYml0Q29udHJvbHNfanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX2xpbC1ndWlfZGlzdF9saWwtZ3VpX2VzbV9qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX2xvYWRlcnNfR0xURkxvYWRlcl9qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX3Bvc3Rwcm9jZXNzaW5nX0VmZmVjdENvbXBvc2VyX2pzLW5vZGVfbW9kdWxlc190aHJlZV9lLWRkOTc3N1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX3Bvc3Rwcm9jZXNzaW5nX1VucmVhbEJsb29tUGFzc19qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX3Bvc3Rwcm9jZXNzaW5nX0Jsb29tUGFzc19qcy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsLTliZGU1N1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX3NoYWRlcnNfQmxlYWNoQnlwYXNzU2hhZGVyX2pzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtLTdmNGI2NlwiLFwic2FtcGxlc19ib290c3RyYXBfYm9vdHN0cmFwX2pzLXNhbXBsZXNfY2hhcHRlcnNfY2hhcHRlci0xMV91dGlsX3Bhc3MtY29udHJvbHNfanMtc2FtcGxlc19jb250LWIyZmVkMVwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci0xMS9zaGFkZXJzLmpzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
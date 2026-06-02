/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./samples/chapters/chapter-4/glsl/fs-color-shift-basic.glsl"
/*!*******************************************************************!*\
  !*** ./samples/chapters/chapter-4/glsl/fs-color-shift-basic.glsl ***!
  \*******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("precision highp float;\nuniform float time;\nvarying vec2 vUv;\n\nvec3 vary(vec3 y)\n{\n  y=y+sin(time)*y.r;\n  return y;\n}\n\nvoid main(){\n  vec2 st=vUv;\n  vec3 color=vary(vec3(st.x*.5,st.y*1.,.5));\n  gl_FragColor=vec4(color,1.);\n}");

/***/ },

/***/ "./samples/chapters/chapter-4/glsl/fs-night-sky-basic.glsl"
/*!*****************************************************************!*\
  !*** ./samples/chapters/chapter-4/glsl/fs-night-sky-basic.glsl ***!
  \*****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("// https://www.shadertoy.com/view/Nlffzj\n// 3D Gradient noise from: https://www.shadertoy.com/view/Xsl3Dl\nuniform float time;\nuniform vec3 resolution;\nvarying vec2 vUv;\n\nvec3 hash(vec3 p)// replace this by something better\n{\n  p=vec3(dot(p,vec3(127.1,311.7,74.7)),\n  dot(p,vec3(269.5,183.3,246.1)),\n  dot(p,vec3(113.5,271.9,124.6)));\n  \n  return-1.+2.*fract(sin(p)*43758.5453123);\n}\nfloat noise(in vec3 p)\n{\n  vec3 i=floor(p);\n  vec3 f=fract(p);\n  \n  vec3 u=f*f*(3.-2.*f);\n  \n  return mix(mix(mix(dot(hash(i+vec3(0.,0.,0.)),f-vec3(0.,0.,0.)),\n  dot(hash(i+vec3(1.,0.,0.)),f-vec3(1.,0.,0.)),u.x),\n  mix(dot(hash(i+vec3(0.,1.,0.)),f-vec3(0.,1.,0.)),\n  dot(hash(i+vec3(1.,1.,0.)),f-vec3(1.,1.,0.)),u.x),u.y),\n  mix(mix(dot(hash(i+vec3(0.,0.,1.)),f-vec3(0.,0.,1.)),\n  dot(hash(i+vec3(1.,0.,1.)),f-vec3(1.,0.,1.)),u.x),\n  mix(dot(hash(i+vec3(0.,1.,1.)),f-vec3(0.,1.,1.)),\n  dot(hash(i+vec3(1.,1.,1.)),f-vec3(1.,1.,1.)),u.x),u.y),u.z);\n}\n\n// from Unity's black body Shader Graph node\nvec3 Unity_Blackbody_float(float Temperature)\n{\n  vec3 color=vec3(255.,255.,255.);\n  color.x=56100000.*pow(Temperature,(-3./2.))+148.;\n  color.y=100.04*log(Temperature)-623.6;\n  if(Temperature>6500.)color.y=35200000.*pow(Temperature,(-3./2.))+184.;\n  color.z=194.18*log(Temperature)-1448.6;\n  color=clamp(color,0.,255.)/255.;\n  if(Temperature<1000.)color*=Temperature/1000.;\n  return color;\n}\n\nvoid main()\n{\n  // Normalized pixel coordinates (from 0 to 1)\n  // vec2 uv=vUv/resolution.xy;\n  vec2 uv=vUv;\n  \n  // Stars computation:\n  vec3 stars_direction=normalize(vec3(uv*2.f-1.f,1.f));// could be view vector for example\n  float stars_threshold=8.f;// modifies the number of stars that are visible\n  float stars_exposure=200.f;// modifies the overall strength of the stars\n  float stars=pow(clamp(noise(stars_direction*200.f),0.f,1.f),stars_threshold)*stars_exposure;\n  stars*=mix(.4,1.4,noise(stars_direction*100.f+vec3(time)));// time based flickering\n  \n  // star color by randomized temperature\n  float stars_temperature=noise(stars_direction*150.)*.5+.5;\n  vec3 stars_color=Unity_Blackbody_float(mix(1500.,65000.,pow(stars_temperature,4.)));\n  \n  // Output to screen\n  gl_FragColor=vec4(stars_color*stars,1.);\n}");

/***/ },

/***/ "./samples/chapters/chapter-4/glsl/fs-simple-basic.glsl"
/*!**************************************************************!*\
  !*** ./samples/chapters/chapter-4/glsl/fs-simple-basic.glsl ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("uniform float time;\nuniform vec2 resolution;\n\nvoid main(){\n  \n  float c1=mod(time,.5);\n  float c2=mod(time,.7);\n  float c3=mod(time,.9);\n\n  gl_FragColor=vec4(c1,c2,c3,1.);\n}");

/***/ },

/***/ "./samples/chapters/chapter-4/glsl/vs-noop.glsl"
/*!******************************************************!*\
  !*** ./samples/chapters/chapter-4/glsl/vs-noop.glsl ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("varying vec2 vUv;\n\nvoid main(){\n  vUv=uv;\n  \n  vec4 modelViewPosition=modelViewMatrix*vec4(position,1.);\n  gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);\n}");

/***/ },

/***/ "./samples/chapters/chapter-4/glsl/vs-simple-basic.glsl"
/*!**************************************************************!*\
  !*** ./samples/chapters/chapter-4/glsl/vs-simple-basic.glsl ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("uniform float time;\nvarying vec2 vUv;\n\nvoid main(){\n\n  vUv=uv;\n  vec3 posChanged=position;\n  posChanged.x=posChanged.x*(abs(sin(time*2.)));\n  posChanged.y=posChanged.y*(abs(sin(time*1.)));\n  posChanged.z=posChanged.z*(abs(cos(time*.5)));\n  \n  gl_Position=projectionMatrix*modelViewMatrix*vec4(posChanged,1.);\n}");

/***/ },

/***/ "./samples/chapters/chapter-4/glsl/vs-simple-ripple-basic.glsl"
/*!*********************************************************************!*\
  !*** ./samples/chapters/chapter-4/glsl/vs-simple-ripple-basic.glsl ***!
  \*********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("uniform float time;\n\nvarying vec2 vUv;\nvoid main(){\n  vUv=uv;\n  \n  vec3 transformed=vec3(position);\n  float freq=3.;\n  float amp=.2;\n  float angle=(time+position.y)*freq;\n  transformed.z+=sin(angle)*amp;\n  \n  gl_Position=projectionMatrix*modelViewMatrix*vec4(transformed,1.);\n}");

/***/ },

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

/***/ "./samples/chapters/chapter-4/shader-material-vertex.js"
/*!**************************************************************!*\
  !*** ./samples/chapters/chapter-4/shader-material-vertex.js ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _bootstrap_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../bootstrap/bootstrap */ "./samples/bootstrap/bootstrap.js");
/* harmony import */ var _controls_renderer_control__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../controls/renderer-control */ "./samples/controls/renderer-control.js");
/* harmony import */ var lil_gui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lil-gui */ "./node_modules/lil-gui/dist/lil-gui.esm.js");
/* harmony import */ var _glsl_fs_simple_basic_glsl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./glsl/fs-simple-basic.glsl */ "./samples/chapters/chapter-4/glsl/fs-simple-basic.glsl");
/* harmony import */ var _glsl_vs_simple_basic_glsl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./glsl/vs-simple-basic.glsl */ "./samples/chapters/chapter-4/glsl/vs-simple-basic.glsl");
/* harmony import */ var _glsl_fs_night_sky_basic_glsl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./glsl/fs-night-sky-basic.glsl */ "./samples/chapters/chapter-4/glsl/fs-night-sky-basic.glsl");
/* harmony import */ var _glsl_vs_noop_glsl__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./glsl/vs-noop.glsl */ "./samples/chapters/chapter-4/glsl/vs-noop.glsl");
/* harmony import */ var _glsl_fs_color_shift_basic_glsl__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./glsl/fs-color-shift-basic.glsl */ "./samples/chapters/chapter-4/glsl/fs-color-shift-basic.glsl");
/* harmony import */ var _glsl_vs_simple_ripple_basic_glsl__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./glsl/vs-simple-ripple-basic.glsl */ "./samples/chapters/chapter-4/glsl/vs-simple-ripple-basic.glsl");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../util */ "./samples/util/index.js");















const props = {
  backgroundColor: 0xffffff,
  fogColor: 0xffffff
}
const gui = new lil_gui__WEBPACK_IMPORTED_MODULE_3__["default"]()

const getVertexShaderPlane = () => {
  const geometry = new three__WEBPACK_IMPORTED_MODULE_0__.PlaneGeometry(10, 10, 100, 100)
  const material = new three__WEBPACK_IMPORTED_MODULE_0__.ShaderMaterial({
    uniforms: {
      time: { value: 1.0 },
      resolution: { value: new three__WEBPACK_IMPORTED_MODULE_0__.Vector2() } // TODO: we should add a value here
    },
    vertexShader: _glsl_vs_simple_basic_glsl__WEBPACK_IMPORTED_MODULE_5__["default"],
    fragmentShader: _glsl_fs_simple_basic_glsl__WEBPACK_IMPORTED_MODULE_4__["default"]
  })

  return { geometry, material }
}

;(0,_bootstrap_bootstrap__WEBPACK_IMPORTED_MODULE_1__.initScene)(props)(({ scene, camera, renderer, orbitControls }) => {
  camera.position.set(-3, 8, 2)
  camera.near = 4
  camera.far = 20

  camera.updateProjectionMatrix()
  orbitControls.update()

  const props = {
    vertexShader: 'vs_simple',
    fragmentShader: 'fs_simple',
    timeIncrement: 0.005
  }

  const { geometry, material } = getVertexShaderPlane()

  const shaderFolder = gui.addFolder('Shaders')
  const vertexShaders = { vs_simple: _glsl_vs_simple_basic_glsl__WEBPACK_IMPORTED_MODULE_5__["default"], vs_noop: _glsl_vs_noop_glsl__WEBPACK_IMPORTED_MODULE_7__["default"], vs_ripple: _glsl_vs_simple_ripple_basic_glsl__WEBPACK_IMPORTED_MODULE_9__["default"] }
  const fragmentShaders = { fs_simple: _glsl_fs_simple_basic_glsl__WEBPACK_IMPORTED_MODULE_4__["default"], fs_night_sky: _glsl_fs_night_sky_basic_glsl__WEBPACK_IMPORTED_MODULE_6__["default"], fs_color_shift: _glsl_fs_color_shift_basic_glsl__WEBPACK_IMPORTED_MODULE_8__["default"] }

  shaderFolder.add(props, 'fragmentShader', (0,_util__WEBPACK_IMPORTED_MODULE_10__.getObjectsKeys)(fragmentShaders)).onChange((changed) => {
    material.fragmentShader = fragmentShaders[changed]
    material.needsUpdate = true
  })
  shaderFolder.add(props, 'vertexShader', (0,_util__WEBPACK_IMPORTED_MODULE_10__.getObjectsKeys)(vertexShaders)).onChange((changed) => {
    material.vertexShader = vertexShaders[changed]
    material.needsUpdate = true
  })
  shaderFolder.add(props, 'timeIncrement', -0.01, 0.01, 0.001)

  const mesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(geometry, material)
  scene.add(mesh)

  function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    orbitControls.update()
    material.uniforms.time.value += props.timeIncrement
  }
  animate()

  ;(0,_controls_renderer_control__WEBPACK_IMPORTED_MODULE_2__.intializeRendererControls)(gui, renderer)
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

/***/ "./samples/util/index.js"
/*!*******************************!*\
  !*** ./samples/util/index.js ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getObjectsKeys: () => (/* binding */ getObjectsKeys)
/* harmony export */ });
const getObjectsKeys = (obj) => {
  const keys = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      keys.push(key);
    }
  }

  return keys;
};


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
/******/ 			"shader-material-vertex": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js"], () => (__webpack_require__("./samples/chapters/chapter-4/shader-material-vertex.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQSw0Rzs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTQvZ2xzbC9mcy1jb2xvci1zaGlmdC1iYXNpYy5nbHNsIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTQvZ2xzbC9mcy1uaWdodC1za3ktYmFzaWMuZ2xzbCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci00L2dsc2wvZnMtc2ltcGxlLWJhc2ljLmdsc2wiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItNC9nbHNsL3ZzLW5vb3AuZ2xzbCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci00L2dsc2wvdnMtc2ltcGxlLWJhc2ljLmdsc2wiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItNC9nbHNsL3ZzLXNpbXBsZS1yaXBwbGUtYmFzaWMuZ2xzbCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvYm9vdHN0cmFwL2Jvb3RzdHJhcC5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvYm9vdHN0cmFwL2xpZ2h0aW5nLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTQvc2hhZGVyLW1hdGVyaWFsLXZlcnRleC5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY29udHJvbGxlci9vcmJpdC1jb250cm9sbGVyLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jb250cm9scy9yZW5kZXJlci1jb250cm9sLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy91dGlsL2luZGV4LmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy91dGlsL3VwZGF0ZS1vbi1yZXNpemUuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBcInByZWNpc2lvbiBoaWdocCBmbG9hdDtcXG51bmlmb3JtIGZsb2F0IHRpbWU7XFxudmFyeWluZyB2ZWMyIHZVdjtcXG5cXG52ZWMzIHZhcnkodmVjMyB5KVxcbntcXG4gIHk9eStzaW4odGltZSkqeS5yO1xcbiAgcmV0dXJuIHk7XFxufVxcblxcbnZvaWQgbWFpbigpe1xcbiAgdmVjMiBzdD12VXY7XFxuICB2ZWMzIGNvbG9yPXZhcnkodmVjMyhzdC54Ki41LHN0LnkqMS4sLjUpKTtcXG4gIGdsX0ZyYWdDb2xvcj12ZWM0KGNvbG9yLDEuKTtcXG59XCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIvLyBodHRwczovL3d3dy5zaGFkZXJ0b3kuY29tL3ZpZXcvTmxmZnpqXFxuLy8gM0QgR3JhZGllbnQgbm9pc2UgZnJvbTogaHR0cHM6Ly93d3cuc2hhZGVydG95LmNvbS92aWV3L1hzbDNEbFxcbnVuaWZvcm0gZmxvYXQgdGltZTtcXG51bmlmb3JtIHZlYzMgcmVzb2x1dGlvbjtcXG52YXJ5aW5nIHZlYzIgdlV2O1xcblxcbnZlYzMgaGFzaCh2ZWMzIHApLy8gcmVwbGFjZSB0aGlzIGJ5IHNvbWV0aGluZyBiZXR0ZXJcXG57XFxuICBwPXZlYzMoZG90KHAsdmVjMygxMjcuMSwzMTEuNyw3NC43KSksXFxuICBkb3QocCx2ZWMzKDI2OS41LDE4My4zLDI0Ni4xKSksXFxuICBkb3QocCx2ZWMzKDExMy41LDI3MS45LDEyNC42KSkpO1xcbiAgXFxuICByZXR1cm4tMS4rMi4qZnJhY3Qoc2luKHApKjQzNzU4LjU0NTMxMjMpO1xcbn1cXG5mbG9hdCBub2lzZShpbiB2ZWMzIHApXFxue1xcbiAgdmVjMyBpPWZsb29yKHApO1xcbiAgdmVjMyBmPWZyYWN0KHApO1xcbiAgXFxuICB2ZWMzIHU9ZipmKigzLi0yLipmKTtcXG4gIFxcbiAgcmV0dXJuIG1peChtaXgobWl4KGRvdChoYXNoKGkrdmVjMygwLiwwLiwwLikpLGYtdmVjMygwLiwwLiwwLikpLFxcbiAgZG90KGhhc2goaSt2ZWMzKDEuLDAuLDAuKSksZi12ZWMzKDEuLDAuLDAuKSksdS54KSxcXG4gIG1peChkb3QoaGFzaChpK3ZlYzMoMC4sMS4sMC4pKSxmLXZlYzMoMC4sMS4sMC4pKSxcXG4gIGRvdChoYXNoKGkrdmVjMygxLiwxLiwwLikpLGYtdmVjMygxLiwxLiwwLikpLHUueCksdS55KSxcXG4gIG1peChtaXgoZG90KGhhc2goaSt2ZWMzKDAuLDAuLDEuKSksZi12ZWMzKDAuLDAuLDEuKSksXFxuICBkb3QoaGFzaChpK3ZlYzMoMS4sMC4sMS4pKSxmLXZlYzMoMS4sMC4sMS4pKSx1LngpLFxcbiAgbWl4KGRvdChoYXNoKGkrdmVjMygwLiwxLiwxLikpLGYtdmVjMygwLiwxLiwxLikpLFxcbiAgZG90KGhhc2goaSt2ZWMzKDEuLDEuLDEuKSksZi12ZWMzKDEuLDEuLDEuKSksdS54KSx1LnkpLHUueik7XFxufVxcblxcbi8vIGZyb20gVW5pdHkncyBibGFjayBib2R5IFNoYWRlciBHcmFwaCBub2RlXFxudmVjMyBVbml0eV9CbGFja2JvZHlfZmxvYXQoZmxvYXQgVGVtcGVyYXR1cmUpXFxue1xcbiAgdmVjMyBjb2xvcj12ZWMzKDI1NS4sMjU1LiwyNTUuKTtcXG4gIGNvbG9yLng9NTYxMDAwMDAuKnBvdyhUZW1wZXJhdHVyZSwoLTMuLzIuKSkrMTQ4LjtcXG4gIGNvbG9yLnk9MTAwLjA0KmxvZyhUZW1wZXJhdHVyZSktNjIzLjY7XFxuICBpZihUZW1wZXJhdHVyZT42NTAwLiljb2xvci55PTM1MjAwMDAwLipwb3coVGVtcGVyYXR1cmUsKC0zLi8yLikpKzE4NC47XFxuICBjb2xvci56PTE5NC4xOCpsb2coVGVtcGVyYXR1cmUpLTE0NDguNjtcXG4gIGNvbG9yPWNsYW1wKGNvbG9yLDAuLDI1NS4pLzI1NS47XFxuICBpZihUZW1wZXJhdHVyZTwxMDAwLiljb2xvcio9VGVtcGVyYXR1cmUvMTAwMC47XFxuICByZXR1cm4gY29sb3I7XFxufVxcblxcbnZvaWQgbWFpbigpXFxue1xcbiAgLy8gTm9ybWFsaXplZCBwaXhlbCBjb29yZGluYXRlcyAoZnJvbSAwIHRvIDEpXFxuICAvLyB2ZWMyIHV2PXZVdi9yZXNvbHV0aW9uLnh5O1xcbiAgdmVjMiB1dj12VXY7XFxuICBcXG4gIC8vIFN0YXJzIGNvbXB1dGF0aW9uOlxcbiAgdmVjMyBzdGFyc19kaXJlY3Rpb249bm9ybWFsaXplKHZlYzModXYqMi5mLTEuZiwxLmYpKTsvLyBjb3VsZCBiZSB2aWV3IHZlY3RvciBmb3IgZXhhbXBsZVxcbiAgZmxvYXQgc3RhcnNfdGhyZXNob2xkPTguZjsvLyBtb2RpZmllcyB0aGUgbnVtYmVyIG9mIHN0YXJzIHRoYXQgYXJlIHZpc2libGVcXG4gIGZsb2F0IHN0YXJzX2V4cG9zdXJlPTIwMC5mOy8vIG1vZGlmaWVzIHRoZSBvdmVyYWxsIHN0cmVuZ3RoIG9mIHRoZSBzdGFyc1xcbiAgZmxvYXQgc3RhcnM9cG93KGNsYW1wKG5vaXNlKHN0YXJzX2RpcmVjdGlvbioyMDAuZiksMC5mLDEuZiksc3RhcnNfdGhyZXNob2xkKSpzdGFyc19leHBvc3VyZTtcXG4gIHN0YXJzKj1taXgoLjQsMS40LG5vaXNlKHN0YXJzX2RpcmVjdGlvbioxMDAuZit2ZWMzKHRpbWUpKSk7Ly8gdGltZSBiYXNlZCBmbGlja2VyaW5nXFxuICBcXG4gIC8vIHN0YXIgY29sb3IgYnkgcmFuZG9taXplZCB0ZW1wZXJhdHVyZVxcbiAgZmxvYXQgc3RhcnNfdGVtcGVyYXR1cmU9bm9pc2Uoc3RhcnNfZGlyZWN0aW9uKjE1MC4pKi41Ky41O1xcbiAgdmVjMyBzdGFyc19jb2xvcj1Vbml0eV9CbGFja2JvZHlfZmxvYXQobWl4KDE1MDAuLDY1MDAwLixwb3coc3RhcnNfdGVtcGVyYXR1cmUsNC4pKSk7XFxuICBcXG4gIC8vIE91dHB1dCB0byBzY3JlZW5cXG4gIGdsX0ZyYWdDb2xvcj12ZWM0KHN0YXJzX2NvbG9yKnN0YXJzLDEuKTtcXG59XCI7IiwiZXhwb3J0IGRlZmF1bHQgXCJ1bmlmb3JtIGZsb2F0IHRpbWU7XFxudW5pZm9ybSB2ZWMyIHJlc29sdXRpb247XFxuXFxudm9pZCBtYWluKCl7XFxuICBcXG4gIGZsb2F0IGMxPW1vZCh0aW1lLC41KTtcXG4gIGZsb2F0IGMyPW1vZCh0aW1lLC43KTtcXG4gIGZsb2F0IGMzPW1vZCh0aW1lLC45KTtcXG5cXG4gIGdsX0ZyYWdDb2xvcj12ZWM0KGMxLGMyLGMzLDEuKTtcXG59XCI7IiwiZXhwb3J0IGRlZmF1bHQgXCJ2YXJ5aW5nIHZlYzIgdlV2O1xcblxcbnZvaWQgbWFpbigpe1xcbiAgdlV2PXV2O1xcbiAgXFxuICB2ZWM0IG1vZGVsVmlld1Bvc2l0aW9uPW1vZGVsVmlld01hdHJpeCp2ZWM0KHBvc2l0aW9uLDEuKTtcXG4gIGdsX1Bvc2l0aW9uPXByb2plY3Rpb25NYXRyaXgqbW9kZWxWaWV3TWF0cml4KnZlYzQocG9zaXRpb24sMS4pO1xcbn1cIjsiLCJleHBvcnQgZGVmYXVsdCBcInVuaWZvcm0gZmxvYXQgdGltZTtcXG52YXJ5aW5nIHZlYzIgdlV2O1xcblxcbnZvaWQgbWFpbigpe1xcblxcbiAgdlV2PXV2O1xcbiAgdmVjMyBwb3NDaGFuZ2VkPXBvc2l0aW9uO1xcbiAgcG9zQ2hhbmdlZC54PXBvc0NoYW5nZWQueCooYWJzKHNpbih0aW1lKjIuKSkpO1xcbiAgcG9zQ2hhbmdlZC55PXBvc0NoYW5nZWQueSooYWJzKHNpbih0aW1lKjEuKSkpO1xcbiAgcG9zQ2hhbmdlZC56PXBvc0NoYW5nZWQueiooYWJzKGNvcyh0aW1lKi41KSkpO1xcbiAgXFxuICBnbF9Qb3NpdGlvbj1wcm9qZWN0aW9uTWF0cml4Km1vZGVsVmlld01hdHJpeCp2ZWM0KHBvc0NoYW5nZWQsMS4pO1xcbn1cIjsiLCJleHBvcnQgZGVmYXVsdCBcInVuaWZvcm0gZmxvYXQgdGltZTtcXG5cXG52YXJ5aW5nIHZlYzIgdlV2O1xcbnZvaWQgbWFpbigpe1xcbiAgdlV2PXV2O1xcbiAgXFxuICB2ZWMzIHRyYW5zZm9ybWVkPXZlYzMocG9zaXRpb24pO1xcbiAgZmxvYXQgZnJlcT0zLjtcXG4gIGZsb2F0IGFtcD0uMjtcXG4gIGZsb2F0IGFuZ2xlPSh0aW1lK3Bvc2l0aW9uLnkpKmZyZXE7XFxuICB0cmFuc2Zvcm1lZC56Kz1zaW4oYW5nbGUpKmFtcDtcXG4gIFxcbiAgZ2xfUG9zaXRpb249cHJvamVjdGlvbk1hdHJpeCptb2RlbFZpZXdNYXRyaXgqdmVjNCh0cmFuc2Zvcm1lZCwxLik7XFxufVwiOyIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuaW1wb3J0IHsgaW5pdE9yYml0Q29udHJvbHMgfSBmcm9tICcuLi9jb250cm9sbGVyL29yYml0LWNvbnRyb2xsZXInXG5pbXBvcnQgeyBpbml0TGlnaHRpbmcgfSBmcm9tICcuL2xpZ2h0aW5nJ1xuaW1wb3J0IHsgb25SZXNpemUgfSBmcm9tICcuLi91dGlsL3VwZGF0ZS1vbi1yZXNpemUnXG5cbmV4cG9ydCBjb25zdCBpbml0U2NlbmUgPSAoeyBiYWNrZ3JvdW5kQ29sb3IsIGZvZ0NvbG9yLCBkaXNhYmxlU2hhZG93cywgZGlzYWJsZUxpZ2h0cywgZGlzYWJsZURlZmF1bHRDb250cm9scyB9KSA9PiB7XG4gIGNvbnN0IGluaXQgPSAoZm4pID0+IHtcbiAgICAvLyBiYXNpYyBzY2VuZSBzZXR1cFxuICAgIGNvbnN0IHNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKClcbiAgICBpZiAoYmFja2dyb3VuZENvbG9yKSB7XG4gICAgICBzY2VuZS5iYWNrZ3JvdW5kQ29sb3IgPSBiYWNrZ3JvdW5kQ29sb3JcbiAgICB9XG5cbiAgICBpZiAoZm9nQ29sb3IpIHtcbiAgICAgIHNjZW5lLmZvZyA9IG5ldyBUSFJFRS5Gb2coZm9nQ29sb3IsIDAuMDAyNSwgNTApXG4gICAgfVxuXG4gICAgLy8gc2V0dXAgY2FtZXJhIGFuZCBiYXNpYyByZW5kZXJlclxuICAgIGNvbnN0IGNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg3NSwgd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQsIDAuMSwgMTAwMClcbiAgICBjb25zdCByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHsgYW50aWFsaWFzOiB0cnVlIH0pXG4gICAgcmVuZGVyZXIub3V0cHV0RW5jb2RpbmcgPSBUSFJFRS5zUkdCRW5jb2RpbmdcbiAgICByZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IHRydWVcbiAgICByZW5kZXJlci5zaGFkb3dNYXAudHlwZSA9IFRIUkVFLlZTTVNoYWRvd01hcFxuICAgIHJlbmRlcmVyLnNldENsZWFyQ29sb3IoYmFja2dyb3VuZENvbG9yKVxuXG4gICAgb25SZXNpemUoY2FtZXJhLCByZW5kZXJlcilcbiAgICByZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci5kb21FbGVtZW50KVxuXG4gICAgLy8gaW5pdGlhbGl6ZSBvcmJpdCBjb250cm9sc1xuICAgIGxldCBvcmJpdENvbnRyb2xzXG4gICAgaWYgKCFkaXNhYmxlRGVmYXVsdENvbnRyb2xzKSB7XG4gICAgICBvcmJpdENvbnRyb2xzID0gaW5pdE9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlcilcbiAgICB9XG5cbiAgICAvLyBhZGQgc29tZSBiYXNpYyBsaWdodGluZyB0byB0aGUgc2NlbmVcbiAgICBpZiAoIWRpc2FibGVMaWdodHMgPz8gZmFsc2UpIHtcbiAgICAgIGluaXRMaWdodGluZyhzY2VuZSwgeyBkaXNhYmxlU2hhZG93cyB9KVxuICAgIH1cblxuICAgIGZuKHsgc2NlbmUsIGNhbWVyYSwgcmVuZGVyZXIsIG9yYml0Q29udHJvbHMgfSlcbiAgfVxuXG4gIHJldHVybiBpbml0XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcblxuZXhwb3J0IGNvbnN0IGluaXRMaWdodGluZyA9IChzY2VuZSwgeyBkaXNhYmxlU2hhZG93cyB9KSA9PiB7XG4gIC8vIGh0dHBzOi8vdGhyZWVqcy5vcmcvZXhhbXBsZXMvP3E9c2hhZG8jd2ViZ2xfc2hhZG93bWFwX3ZzbVxuICBzY2VuZS5hZGQobmV3IFRIUkVFLkFtYmllbnRMaWdodCgweDY2NjY2NikpXG5cbiAgLy8gY29uc3QgZGlyTGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGFhYWFhYSlcbiAgY29uc3QgZGlyTGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGFhYWFhYSlcbiAgZGlyTGlnaHQucG9zaXRpb24uc2V0KDUsIDEyLCA4KVxuICBkaXJMaWdodC5jYXN0U2hhZG93ID0gIWRpc2FibGVTaGFkb3dzID8gdHJ1ZSA6IGZhbHNlXG4gIGRpckxpZ2h0LmludGVuc2l0eSA9IDFcbiAgZGlyTGlnaHQuc2hhZG93LmNhbWVyYS5uZWFyID0gMC4xXG4gIGRpckxpZ2h0LnNoYWRvdy5jYW1lcmEuZmFyID0gMjAwXG4gIGRpckxpZ2h0LnNoYWRvdy5jYW1lcmEucmlnaHQgPSAxMFxuICBkaXJMaWdodC5zaGFkb3cuY2FtZXJhLmxlZnQgPSAtMTBcbiAgZGlyTGlnaHQuc2hhZG93LmNhbWVyYS50b3AgPSAxMFxuICBkaXJMaWdodC5zaGFkb3cuY2FtZXJhLmJvdHRvbSA9IC0xMFxuICBkaXJMaWdodC5zaGFkb3cubWFwU2l6ZS53aWR0aCA9IDIwNDhcbiAgZGlyTGlnaHQuc2hhZG93Lm1hcFNpemUuaGVpZ2h0ID0gMjA0OFxuICBkaXJMaWdodC5zaGFkb3cucmFkaXVzID0gNFxuICBkaXJMaWdodC5zaGFkb3cuYmlhcyA9IC0wLjAwMDA1XG5cbiAgc2NlbmUuYWRkKGRpckxpZ2h0KVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5pbXBvcnQgeyBpbml0U2NlbmUgfSBmcm9tICcuLi8uLi9ib290c3RyYXAvYm9vdHN0cmFwJ1xuaW1wb3J0IHsgaW50aWFsaXplUmVuZGVyZXJDb250cm9scyB9IGZyb20gJy4uLy4uL2NvbnRyb2xzL3JlbmRlcmVyLWNvbnRyb2wnXG5cbmltcG9ydCBHVUkgZnJvbSAnbGlsLWd1aSdcblxuaW1wb3J0IGZzX3NpbXBsZSBmcm9tICcuL2dsc2wvZnMtc2ltcGxlLWJhc2ljLmdsc2wnXG5pbXBvcnQgdnNfc2ltcGxlIGZyb20gJy4vZ2xzbC92cy1zaW1wbGUtYmFzaWMuZ2xzbCdcbmltcG9ydCBmc19uaWdodF9za3kgZnJvbSAnLi9nbHNsL2ZzLW5pZ2h0LXNreS1iYXNpYy5nbHNsJ1xuaW1wb3J0IHZzX25vb3AgZnJvbSAnLi9nbHNsL3ZzLW5vb3AuZ2xzbCdcbmltcG9ydCBmc19jb2xvcl9zaGlmdCBmcm9tICcuL2dsc2wvZnMtY29sb3Itc2hpZnQtYmFzaWMuZ2xzbCdcbmltcG9ydCB2c19yaXBwbGUgZnJvbSAnLi9nbHNsL3ZzLXNpbXBsZS1yaXBwbGUtYmFzaWMuZ2xzbCdcblxuaW1wb3J0IHsgZ2V0T2JqZWN0c0tleXMgfSBmcm9tICcuLi8uLi91dGlsJ1xuXG5jb25zdCBwcm9wcyA9IHtcbiAgYmFja2dyb3VuZENvbG9yOiAweGZmZmZmZixcbiAgZm9nQ29sb3I6IDB4ZmZmZmZmXG59XG5jb25zdCBndWkgPSBuZXcgR1VJKClcblxuY29uc3QgZ2V0VmVydGV4U2hhZGVyUGxhbmUgPSAoKSA9PiB7XG4gIGNvbnN0IGdlb21ldHJ5ID0gbmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkoMTAsIDEwLCAxMDAsIDEwMClcbiAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuU2hhZGVyTWF0ZXJpYWwoe1xuICAgIHVuaWZvcm1zOiB7XG4gICAgICB0aW1lOiB7IHZhbHVlOiAxLjAgfSxcbiAgICAgIHJlc29sdXRpb246IHsgdmFsdWU6IG5ldyBUSFJFRS5WZWN0b3IyKCkgfSAvLyBUT0RPOiB3ZSBzaG91bGQgYWRkIGEgdmFsdWUgaGVyZVxuICAgIH0sXG4gICAgdmVydGV4U2hhZGVyOiB2c19zaW1wbGUsXG4gICAgZnJhZ21lbnRTaGFkZXI6IGZzX3NpbXBsZVxuICB9KVxuXG4gIHJldHVybiB7IGdlb21ldHJ5LCBtYXRlcmlhbCB9XG59XG5cbmluaXRTY2VuZShwcm9wcykoKHsgc2NlbmUsIGNhbWVyYSwgcmVuZGVyZXIsIG9yYml0Q29udHJvbHMgfSkgPT4ge1xuICBjYW1lcmEucG9zaXRpb24uc2V0KC0zLCA4LCAyKVxuICBjYW1lcmEubmVhciA9IDRcbiAgY2FtZXJhLmZhciA9IDIwXG5cbiAgY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKVxuICBvcmJpdENvbnRyb2xzLnVwZGF0ZSgpXG5cbiAgY29uc3QgcHJvcHMgPSB7XG4gICAgdmVydGV4U2hhZGVyOiAndnNfc2ltcGxlJyxcbiAgICBmcmFnbWVudFNoYWRlcjogJ2ZzX3NpbXBsZScsXG4gICAgdGltZUluY3JlbWVudDogMC4wMDVcbiAgfVxuXG4gIGNvbnN0IHsgZ2VvbWV0cnksIG1hdGVyaWFsIH0gPSBnZXRWZXJ0ZXhTaGFkZXJQbGFuZSgpXG5cbiAgY29uc3Qgc2hhZGVyRm9sZGVyID0gZ3VpLmFkZEZvbGRlcignU2hhZGVycycpXG4gIGNvbnN0IHZlcnRleFNoYWRlcnMgPSB7IHZzX3NpbXBsZTogdnNfc2ltcGxlLCB2c19ub29wOiB2c19ub29wLCB2c19yaXBwbGU6IHZzX3JpcHBsZSB9XG4gIGNvbnN0IGZyYWdtZW50U2hhZGVycyA9IHsgZnNfc2ltcGxlOiBmc19zaW1wbGUsIGZzX25pZ2h0X3NreTogZnNfbmlnaHRfc2t5LCBmc19jb2xvcl9zaGlmdDogZnNfY29sb3Jfc2hpZnQgfVxuXG4gIHNoYWRlckZvbGRlci5hZGQocHJvcHMsICdmcmFnbWVudFNoYWRlcicsIGdldE9iamVjdHNLZXlzKGZyYWdtZW50U2hhZGVycykpLm9uQ2hhbmdlKChjaGFuZ2VkKSA9PiB7XG4gICAgbWF0ZXJpYWwuZnJhZ21lbnRTaGFkZXIgPSBmcmFnbWVudFNoYWRlcnNbY2hhbmdlZF1cbiAgICBtYXRlcmlhbC5uZWVkc1VwZGF0ZSA9IHRydWVcbiAgfSlcbiAgc2hhZGVyRm9sZGVyLmFkZChwcm9wcywgJ3ZlcnRleFNoYWRlcicsIGdldE9iamVjdHNLZXlzKHZlcnRleFNoYWRlcnMpKS5vbkNoYW5nZSgoY2hhbmdlZCkgPT4ge1xuICAgIG1hdGVyaWFsLnZlcnRleFNoYWRlciA9IHZlcnRleFNoYWRlcnNbY2hhbmdlZF1cbiAgICBtYXRlcmlhbC5uZWVkc1VwZGF0ZSA9IHRydWVcbiAgfSlcbiAgc2hhZGVyRm9sZGVyLmFkZChwcm9wcywgJ3RpbWVJbmNyZW1lbnQnLCAtMC4wMSwgMC4wMSwgMC4wMDEpXG5cbiAgY29uc3QgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbClcbiAgc2NlbmUuYWRkKG1lc2gpXG5cbiAgZnVuY3Rpb24gYW5pbWF0ZSgpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSlcbiAgICByZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSlcbiAgICBvcmJpdENvbnRyb2xzLnVwZGF0ZSgpXG4gICAgbWF0ZXJpYWwudW5pZm9ybXMudGltZS52YWx1ZSArPSBwcm9wcy50aW1lSW5jcmVtZW50XG4gIH1cbiAgYW5pbWF0ZSgpXG5cbiAgaW50aWFsaXplUmVuZGVyZXJDb250cm9scyhndWksIHJlbmRlcmVyKVxufSlcbiIsImltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vY29udHJvbHMvT3JiaXRDb250cm9scydcblxuZXhwb3J0IGNvbnN0IGluaXRPcmJpdENvbnRyb2xzID0gKGNhbWVyYSwgcmVuZGVyZXIpID0+IHtcbiAgY29uc3QgY29udHJvbGxlciA9IG5ldyBPcmJpdENvbnRyb2xzKGNhbWVyYSwgcmVuZGVyZXIuZG9tRWxlbWVudClcbiAgY29udHJvbGxlci5lbmFibGVEYW1waW5nID0gdHJ1ZVxuICBjb250cm9sbGVyLmRhbXBpbmdGYWN0b3IgPSAwLjA1XG4gIGNvbnRyb2xsZXIubWluRGlzdGFuY2UgPSAxXG4gIGNvbnRyb2xsZXIubWF4RGlzdGFuY2UgPSAxMDBcbiAgY29udHJvbGxlci5taW5Qb2xhckFuZ2xlID0gTWF0aC5QSSAvIDRcbiAgY29udHJvbGxlci5tYXhQb2xhckFuZ2xlID0gKDMgKiBNYXRoLlBJKSAvIDRcblxuICByZXR1cm4gY29udHJvbGxlclxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5cbmNvbnN0IGVudW1zID0ge1xuICB0b25lTWFwcGluZ09wdGlvbnM6IHtcbiAgICBOb25lOiBUSFJFRS5Ob1RvbmVNYXBwaW5nLFxuICAgIExpbmVhcjogVEhSRUUuTGluZWFyVG9uZU1hcHBpbmcsXG4gICAgUmVpbmhhcmQ6IFRIUkVFLlJlaW5oYXJkVG9uZU1hcHBpbmcsXG4gICAgQ2luZW9uOiBUSFJFRS5DaW5lb25Ub25lTWFwcGluZyxcbiAgICBBQ0VTRmlsbWljOiBUSFJFRS5BQ0VTRmlsbWljVG9uZU1hcHBpbmcsXG4gICAgQ3VzdG9tOiBUSFJFRS5DdXN0b21Ub25lTWFwcGluZyxcbiAgfSxcbiAgc2hhZG93TWFwcGluZzoge1xuICAgIEJhc2ljOiBUSFJFRS5CYXNpY1NoYWRvd01hcCxcbiAgICBQQ0ZTOiBUSFJFRS5QQ0ZTaGFkb3dNYXAsXG4gICAgUENGU29mdDogVEhSRUUuUENGU29mdFNoYWRvd01hcCxcbiAgICBWU006IFRIUkVFLlZTTVNoYWRvd01hcCxcbiAgfSxcbiAgb3V0cHV0RW5jb2RpbmdzOiB7XG4gICAgTGluZWFyOiBUSFJFRS5MaW5lYXJFbmNvZGluZyxcbiAgICBzUkdCOiBUSFJFRS5zUkdCRW5jb2RpbmcsXG4gIH0sXG59O1xuXG5jb25zdCBnZXRQcm9wZXJ0eUhvbGRlciA9ICh3ZWJHTFJlbmRlcmVyKSA9PiB7XG4gIGNvbnN0IGNsZWFyQ29sb3JIb2xkZXIgPSBuZXcgVEhSRUUuQ29sb3IoKTtcbiAgd2ViR0xSZW5kZXJlci5nZXRDbGVhckNvbG9yKGNsZWFyQ29sb3JIb2xkZXIpO1xuXG4gIGNvbnN0IGhvbGRlciA9IHtcbiAgICBtYWluOiB7XG4gICAgICBvdXRwdXRFbmNvZGluZzogd2ViR0xSZW5kZXJlci5vdXRwdXRFbmNvZGluZyxcbiAgICB9LFxuICAgIHNoYWRvd01hcDoge1xuICAgICAgZW5hYmxlZDogd2ViR0xSZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCxcbiAgICAgIGF1dG9VcGRhdGU6IHdlYkdMUmVuZGVyZXIuc2hhZG93TWFwLmF1dG9VcGRhdGUsXG4gICAgICBuZWVkc1VwZGF0ZTogKCkgPT4gKHdlYkdMUmVuZGVyZXIuc2hhZG93TWFwLm5lZWRzVXBkYXRlID0gdHJ1ZSksXG4gICAgICB0eXBlOiB3ZWJHTFJlbmRlcmVyLnNoYWRvd01hcC50eXBlLFxuICAgIH0sXG4gICAgdG9uZU1hcHBpbmc6IHtcbiAgICAgIGV4cG9zdXJlOiB3ZWJHTFJlbmRlcmVyLnRvbmVNYXBwaW5nRXhwb3N1cmUsXG4gICAgICB0b25lTWFwcGluZzogd2ViR0xSZW5kZXJlci50b25lTWFwcGluZyxcbiAgICB9LFxuICAgIGNsZWFyU2V0dGluZ3M6IHtcbiAgICAgIGF1dG9DbGVhcjogd2ViR0xSZW5kZXJlci5hdXRvQ2xlYXIsXG4gICAgICBjbGVhckNvbG9yOiBjbGVhckNvbG9ySG9sZGVyLmdldFN0eWxlKCksXG4gICAgfSxcbiAgICBhZHZhbmNlZDoge1xuICAgICAgYXV0b0NsZWFyRGVwdGg6IHdlYkdMUmVuZGVyZXIuYXV0b0NsZWFyRGVwdGgsXG4gICAgICBhdXRvQ2xlYXJTdGVuY2lsOiB3ZWJHTFJlbmRlcmVyLmF1dG9DbGVhclN0ZW5jaWwsXG4gICAgICBjaGVja1NoYWRlckVycm9yczogd2ViR0xSZW5kZXJlci5kZWJ1Zy5jaGVja1NoYWRlckVycm9ycyxcbiAgICAgIHNvcnRPYmplY3RzOiB3ZWJHTFJlbmRlcmVyLnNvcnRPYmplY3RzLFxuICAgICAgbG9jYWxDbGlwcGluZ0VuYWJsZWQ6IHdlYkdMUmVuZGVyZXIubG9jYWxDbGlwcGluZ0VuYWJsZWQsXG4gICAgICBwaHlzaWNhbGx5Q29ycmVjdExpZ2h0czogd2ViR0xSZW5kZXJlci5waHlzaWNhbGx5Q29ycmVjdExpZ2h0cyxcbiAgICB9LFxuICB9O1xuXG4gIHJldHVybiBob2xkZXI7XG59O1xuXG5leHBvcnQgY29uc3QgaW50aWFsaXplUmVuZGVyZXJDb250cm9scyA9IChndWksIHdlYkdMUmVuZGVyZXIpID0+IHtcbiAgY29uc3QgcHJvcGVydGllc09iamVjdCA9IGdldFByb3BlcnR5SG9sZGVyKHdlYkdMUmVuZGVyZXIpO1xuICBjb25zdCByZW5kZXJlckZvbGRlciA9IGd1aS5hZGRGb2xkZXIoXCJXZWJHTFJlbmRlcmVyXCIpO1xuXG4gIHJlbmRlcmVyRm9sZGVyLm9uQ2hhbmdlKChfKSA9PiB7XG4gICAgdXBkYXRlV2ViR0xSZW5kZXJlclByb3BlcnRpZXMod2ViR0xSZW5kZXJlciwgcHJvcGVydGllc09iamVjdCk7XG4gIH0pO1xuXG4gIHJlbmRlcmVyRm9sZGVyLmFkZChcbiAgICBwcm9wZXJ0aWVzT2JqZWN0Lm1haW4sXG4gICAgXCJvdXRwdXRFbmNvZGluZ1wiLFxuICAgIGVudW1zLm91dHB1dEVuY29kaW5nc1xuICApO1xuXG4gIGNvbnN0IHNoYWRvd0ZvbGRlciA9IHJlbmRlcmVyRm9sZGVyLmFkZEZvbGRlcihcIlNoYWRvd1wiKTtcbiAgc2hhZG93Rm9sZGVyLmFkZChwcm9wZXJ0aWVzT2JqZWN0LnNoYWRvd01hcCwgXCJlbmFibGVkXCIpO1xuICBzaGFkb3dGb2xkZXIuYWRkKHByb3BlcnRpZXNPYmplY3Quc2hhZG93TWFwLCBcImF1dG9VcGRhdGVcIik7XG4gIHNoYWRvd0ZvbGRlci5hZGQocHJvcGVydGllc09iamVjdC5zaGFkb3dNYXAsIFwibmVlZHNVcGRhdGVcIik7XG4gIHNoYWRvd0ZvbGRlclxuICAgIC5hZGQocHJvcGVydGllc09iamVjdC5zaGFkb3dNYXAsIFwidHlwZVwiLCBlbnVtcy5zaGFkb3dNYXBwaW5nKVxuICAgIC5lbmFibGUoZmFsc2UpOyAvLyBjYW4ndCB1cGRhdGUgdGhlIHNoYWRvdyBtYXBwaW5nIHR5cGUgaW4gcnVudGltZVxuXG4gIGNvbnN0IHRvbmVNYXBwaW5nRm9sZGVyID0gcmVuZGVyZXJGb2xkZXIuYWRkRm9sZGVyKFwiVG9uZU1hcHBpbmdcIik7XG4gIHRvbmVNYXBwaW5nRm9sZGVyLmFkZChwcm9wZXJ0aWVzT2JqZWN0LnRvbmVNYXBwaW5nLCBcImV4cG9zdXJlXCIsIDAsIDIpO1xuICB0b25lTWFwcGluZ0ZvbGRlci5hZGQoXG4gICAgcHJvcGVydGllc09iamVjdC50b25lTWFwcGluZyxcbiAgICBcInRvbmVNYXBwaW5nXCIsXG4gICAgZW51bXMudG9uZU1hcHBpbmdPcHRpb25zXG4gICk7XG5cbiAgY29uc3QgY2xlYXJTZXR0aW5nc0ZvbGRlciA9IHJlbmRlcmVyRm9sZGVyLmFkZEZvbGRlcihcImNsZWFyU2V0dGluZ3NcIik7XG4gIGNsZWFyU2V0dGluZ3NGb2xkZXIuYWRkKHByb3BlcnRpZXNPYmplY3QuY2xlYXJTZXR0aW5ncywgXCJhdXRvQ2xlYXJcIik7XG4gIGNsZWFyU2V0dGluZ3NGb2xkZXIuYWRkQ29sb3IocHJvcGVydGllc09iamVjdC5jbGVhclNldHRpbmdzLCBcImNsZWFyQ29sb3JcIik7XG5cbiAgcmVuZGVyZXJGb2xkZXIuY2xvc2UoKTtcbn07XG5cbmNvbnN0IHVwZGF0ZVdlYkdMUmVuZGVyZXJQcm9wZXJ0aWVzID0gKHdlYkdMUmVuZGVyZXIsIHByb3BlcnR5SG9sZGVyKSA9PiB7XG4gIHdlYkdMUmVuZGVyZXIuc2hhZG93TWFwLmVuYWJsZWQgPSBwcm9wZXJ0eUhvbGRlci5zaGFkb3dNYXAuZW5hYmxlZDtcbiAgd2ViR0xSZW5kZXJlci5zaGFkb3dNYXAuYXV0b1VwZGF0ZSA9IHByb3BlcnR5SG9sZGVyLnNoYWRvd01hcC5hdXRvVXBkYXRlO1xuICB3ZWJHTFJlbmRlcmVyLnNoYWRvd01hcC5uZWVkc1VwZGF0ZSA9IHByb3BlcnR5SG9sZGVyLnNoYWRvd01hcC5uZWVkc1VwZGF0ZTtcbiAgd2ViR0xSZW5kZXJlci50b25lTWFwcGluZyA9IHByb3BlcnR5SG9sZGVyLnRvbmVNYXBwaW5nLnRvbmVNYXBwaW5nO1xuICB3ZWJHTFJlbmRlcmVyLnRvbmVNYXBwaW5nRXhwb3N1cmUgPSBwcm9wZXJ0eUhvbGRlci50b25lTWFwcGluZy5leHBvc3VyZTtcbiAgd2ViR0xSZW5kZXJlci5hdXRvQ2xlYXIgPSBwcm9wZXJ0eUhvbGRlci5jbGVhclNldHRpbmdzLmF1dG9DbGVhcjtcbiAgd2ViR0xSZW5kZXJlci5zZXRDbGVhckNvbG9yKHByb3BlcnR5SG9sZGVyLmNsZWFyU2V0dGluZ3MuY2xlYXJDb2xvcik7XG4gIHdlYkdMUmVuZGVyZXIub3V0cHV0RW5jb2RpbmcgPSBwcm9wZXJ0eUhvbGRlci5tYWluLm91dHB1dEVuY29kaW5nO1xuXG4gIHdlYkdMUmVuZGVyZXIubmVlZHNVcGRhdGUgPSB0cnVlO1xufTtcbiIsImV4cG9ydCBjb25zdCBnZXRPYmplY3RzS2V5cyA9IChvYmopID0+IHtcbiAgY29uc3Qga2V5cyA9IFtdO1xuXG4gIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGtleXM7XG59O1xuIiwiZXhwb3J0IGNvbnN0IG9uUmVzaXplID0gKGNhbWVyYSwgcmVuZGVyZXIpID0+IHtcbiAgY29uc3QgcmVzaXplciA9ICgpID0+IHtcbiAgICBjYW1lcmEuYXNwZWN0ID0gd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICBjYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpXG4gICAgcmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KVxuICB9XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemVyLCBmYWxzZSlcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwic2hhZGVyLW1hdGVyaWFsLXZlcnRleFwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtsdGpzX2ZvdXJ0aFwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtsdGpzX2ZvdXJ0aFwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfYnVpbGRfdGhyZWVfbW9kdWxlX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fY29udHJvbHNfT3JiaXRDb250cm9sc19qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfbGlsLWd1aV9kaXN0X2xpbC1ndWlfZXNtX2pzXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTQvc2hhZGVyLW1hdGVyaWFsLXZlcnRleC5qc1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
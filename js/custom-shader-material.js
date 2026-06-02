/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./samples/chapters/chapter-4/glsl/fs-color-shift.glsl"
/*!*************************************************************!*\
  !*** ./samples/chapters/chapter-4/glsl/fs-color-shift.glsl ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("precision highp float;\nuniform float time;\nvarying vec2 vUv;\n\nvec3 vary(vec3 y)\n{\n  y=y+sin(time)*y.r;\n  return y;\n}\n\nvoid main(){\n  vec2 st=vUv;\n  vec3 color=vary(vec3(st.x*.5,st.y*1.,.5));\n  gl_FragColor=vec4(color,1.);\n  csm_DiffuseColor=gl_FragColor;\n}");

/***/ },

/***/ "./samples/chapters/chapter-4/glsl/fs-night-sky.glsl"
/*!***********************************************************!*\
  !*** ./samples/chapters/chapter-4/glsl/fs-night-sky.glsl ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("// https://www.shadertoy.com/view/Nlffzj\n// 3D Gradient noise from: https://www.shadertoy.com/view/Xsl3Dl\nuniform float time;\nuniform vec3 resolution;\nvarying vec2 vUv;\n\nvec3 hash(vec3 p)// replace this by something better\n{\n  p=vec3(dot(p,vec3(127.1,311.7,74.7)),\n  dot(p,vec3(269.5,183.3,246.1)),\n  dot(p,vec3(113.5,271.9,124.6)));\n  \n  return-1.+2.*fract(sin(p)*43758.5453123);\n}\nfloat noise(in vec3 p)\n{\n  vec3 i=floor(p);\n  vec3 f=fract(p);\n  \n  vec3 u=f*f*(3.-2.*f);\n  \n  return mix(mix(mix(dot(hash(i+vec3(0.,0.,0.)),f-vec3(0.,0.,0.)),\n  dot(hash(i+vec3(1.,0.,0.)),f-vec3(1.,0.,0.)),u.x),\n  mix(dot(hash(i+vec3(0.,1.,0.)),f-vec3(0.,1.,0.)),\n  dot(hash(i+vec3(1.,1.,0.)),f-vec3(1.,1.,0.)),u.x),u.y),\n  mix(mix(dot(hash(i+vec3(0.,0.,1.)),f-vec3(0.,0.,1.)),\n  dot(hash(i+vec3(1.,0.,1.)),f-vec3(1.,0.,1.)),u.x),\n  mix(dot(hash(i+vec3(0.,1.,1.)),f-vec3(0.,1.,1.)),\n  dot(hash(i+vec3(1.,1.,1.)),f-vec3(1.,1.,1.)),u.x),u.y),u.z);\n}\n\n// from Unity's black body Shader Graph node\nvec3 Unity_Blackbody_float(float Temperature)\n{\n  vec3 color=vec3(255.,255.,255.);\n  color.x=56100000.*pow(Temperature,(-3./2.))+148.;\n  color.y=100.04*log(Temperature)-623.6;\n  if(Temperature>6500.)color.y=35200000.*pow(Temperature,(-3./2.))+184.;\n  color.z=194.18*log(Temperature)-1448.6;\n  color=clamp(color,0.,255.)/255.;\n  if(Temperature<1000.)color*=Temperature/1000.;\n  return color;\n}\n\nvoid main()\n{\n  // Normalized pixel coordinates (from 0 to 1)\n  // vec2 uv=vUv/resolution.xy;\n  vec2 uv=vUv;\n  \n  // Stars computation:\n  vec3 stars_direction=normalize(vec3(uv*2.f-1.f,1.f));// could be view vector for example\n  float stars_threshold=8.f;// modifies the number of stars that are visible\n  float stars_exposure=200.f;// modifies the overall strength of the stars\n  float stars=pow(clamp(noise(stars_direction*200.f),0.f,1.f),stars_threshold)*stars_exposure;\n  stars*=mix(.4,1.4,noise(stars_direction*100.f+vec3(time)));// time based flickering\n  \n  // star color by randomized temperature\n  float stars_temperature=noise(stars_direction*150.)*.5+.5;\n  vec3 stars_color=Unity_Blackbody_float(mix(1500.,65000.,pow(stars_temperature,4.)));\n  \n  // Output to screen\n  gl_FragColor=vec4(stars_color*stars,1.);\n  csm_DiffuseColor=gl_FragColor;\n}");

/***/ },

/***/ "./samples/chapters/chapter-4/glsl/fs-simple.glsl"
/*!********************************************************!*\
  !*** ./samples/chapters/chapter-4/glsl/fs-simple.glsl ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("uniform float time;\nuniform vec2 resolution;\n\nvoid main(){\n  \n  float c1=mod(time,.5);\n  float c2=mod(time,.7);\n  float c3=mod(time,.9);\n\n  gl_FragColor=vec4(c1,c2,c3,1.);\n  csm_DiffuseColor=vec4(c1,c2,c3,1.);\n}");

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

/***/ "./samples/chapters/chapter-4/glsl/vs-simple-ripple.glsl"
/*!***************************************************************!*\
  !*** ./samples/chapters/chapter-4/glsl/vs-simple-ripple.glsl ***!
  \***************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("uniform float time;\n\nvarying vec2 vUv;\nvoid main(){\n  vUv=uv;\n  \n  vec3 transformedRipple=vec3(position);\n  float freq=3.;\n  float amp=.2;\n  float angle=(time+position.y)*freq;\n  transformedRipple.z+=sin(angle)*amp;\n  \n  gl_Position=projectionMatrix*modelViewMatrix*vec4(transformedRipple,1.);\n  csm_Position=transformedRipple;\n}");

/***/ },

/***/ "./samples/chapters/chapter-4/glsl/vs-simple.glsl"
/*!********************************************************!*\
  !*** ./samples/chapters/chapter-4/glsl/vs-simple.glsl ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("uniform float time;\nvarying vec2 vUv;\n\nvoid main(){\n\n  vUv=uv;\n  vec3 posChanged=position;\n  posChanged.x=posChanged.x*(abs(sin(time*2.)));\n  posChanged.y=posChanged.y*(abs(sin(time*1.)));\n  posChanged.z=posChanged.z*(abs(cos(time*.5)));\n  \n  gl_Position=projectionMatrix*modelViewMatrix*vec4(posChanged,1.);\n  csm_Position=posChanged;\n}");

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

/***/ "./samples/chapters/chapter-4/custom-shader-material.js"
/*!**************************************************************!*\
  !*** ./samples/chapters/chapter-4/custom-shader-material.js ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _bootstrap_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../bootstrap/bootstrap */ "./samples/bootstrap/bootstrap.js");
/* harmony import */ var _controls_renderer_control__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../controls/renderer-control */ "./samples/controls/renderer-control.js");
/* harmony import */ var lil_gui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lil-gui */ "./node_modules/lil-gui/dist/lil-gui.esm.js");
/* harmony import */ var three_custom_shader_material_vanilla__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three-custom-shader-material/vanilla */ "./node_modules/three-custom-shader-material/vanilla.js");
/* harmony import */ var _glsl_fs_simple_glsl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./glsl/fs-simple.glsl */ "./samples/chapters/chapter-4/glsl/fs-simple.glsl");
/* harmony import */ var _glsl_vs_simple_glsl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./glsl/vs-simple.glsl */ "./samples/chapters/chapter-4/glsl/vs-simple.glsl");
/* harmony import */ var _glsl_fs_night_sky_glsl__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./glsl/fs-night-sky.glsl */ "./samples/chapters/chapter-4/glsl/fs-night-sky.glsl");
/* harmony import */ var _glsl_vs_noop_glsl__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./glsl/vs-noop.glsl */ "./samples/chapters/chapter-4/glsl/vs-noop.glsl");
/* harmony import */ var _glsl_fs_color_shift_glsl__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./glsl/fs-color-shift.glsl */ "./samples/chapters/chapter-4/glsl/fs-color-shift.glsl");
/* harmony import */ var _glsl_vs_simple_ripple_glsl__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./glsl/vs-simple-ripple.glsl */ "./samples/chapters/chapter-4/glsl/vs-simple-ripple.glsl");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../util */ "./samples/util/index.js");
/* harmony import */ var _controls_scene_controls__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../controls/scene-controls */ "./samples/controls/scene-controls.js");

















const props = {
  backgroundColor: 0xffffff,
  fogColor: 0xffffff
}

const gui = new lil_gui__WEBPACK_IMPORTED_MODULE_3__["default"]()

const getVertexShaderPlane = (vertexShader, fragmentShader) => {
  const geometry = new three__WEBPACK_IMPORTED_MODULE_0__.TorusKnotBufferGeometry(2, 0.5, 200, 20)
  const material = new three_custom_shader_material_vanilla__WEBPACK_IMPORTED_MODULE_4__["default"]({
    baseMaterial: three__WEBPACK_IMPORTED_MODULE_0__.MeshStandardMaterial,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
      time: { value: 0.2 },
      resolution: { value: new three__WEBPACK_IMPORTED_MODULE_0__.Vector2() }
    },
    flatShading: false,
    color: 0xffffff,
    roughness: 0.1,
    metalness: 0.9
  })

  return { geometry, material }
}

;(0,_bootstrap_bootstrap__WEBPACK_IMPORTED_MODULE_1__.initScene)(props)(({ scene, camera, renderer, orbitControls }) => {
  camera.position.set(-3, 8, 2)
  camera.near = 1
  camera.far = 100

  camera.updateProjectionMatrix()
  orbitControls.update()

  const props = {
    vertexShader: 'vs_simple',
    fragmentShader: 'fs_simple',
    timeIncrement: 0.005
  }

  let { geometry, material } = getVertexShaderPlane(_glsl_vs_simple_glsl__WEBPACK_IMPORTED_MODULE_6__["default"], _glsl_fs_simple_glsl__WEBPACK_IMPORTED_MODULE_5__["default"])
  let mesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(geometry, material)
  mesh.receiveShadow = true

  const shaderFolder = gui.addFolder('Shaders')
  const vertexShaders = { vs_simple: _glsl_vs_simple_glsl__WEBPACK_IMPORTED_MODULE_6__["default"], vs_noop: _glsl_vs_noop_glsl__WEBPACK_IMPORTED_MODULE_8__["default"], vs_ripple: _glsl_vs_simple_ripple_glsl__WEBPACK_IMPORTED_MODULE_10__["default"] }
  const fragmentShaders = { fs_simple: _glsl_fs_simple_glsl__WEBPACK_IMPORTED_MODULE_5__["default"], fs_night_sky: _glsl_fs_night_sky_glsl__WEBPACK_IMPORTED_MODULE_7__["default"], fs_color_shift: _glsl_fs_color_shift_glsl__WEBPACK_IMPORTED_MODULE_9__["default"] }

  shaderFolder.add(props, 'fragmentShader', (0,_util__WEBPACK_IMPORTED_MODULE_11__.getObjectsKeys)(fragmentShaders)).onChange(() => {
    scene.remove(mesh)
    ;({ geometry, material } = getVertexShaderPlane(
      vertexShaders[props.vertexShader],
      fragmentShaders[props.fragmentShader]
    ))
    mesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(geometry, material)
    mesh.receiveShadow = true
    scene.add(mesh)
  })
  shaderFolder.add(props, 'vertexShader', (0,_util__WEBPACK_IMPORTED_MODULE_11__.getObjectsKeys)(vertexShaders)).onChange(() => {
    scene.remove(mesh)
    ;({ geometry, material } = getVertexShaderPlane(
      vertexShaders[props.vertexShader],
      fragmentShaders[props.fragmentShader]
    ))
    mesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(geometry, material)
    mesh.receiveShadow = true
    scene.add(mesh)
  })
  shaderFolder.add(props, 'timeIncrement', -0.01, 0.01, 0.001)

  scene.add(mesh)

  function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    orbitControls.update()
    material.uniforms.time.value += props.timeIncrement
  }
  animate()

  console.log(material)

  ;(0,_controls_renderer_control__WEBPACK_IMPORTED_MODULE_2__.intializeRendererControls)(gui, renderer)
  ;(0,_controls_scene_controls__WEBPACK_IMPORTED_MODULE_12__.initializeSceneControls)(gui, scene, false, false)
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

/***/ "./samples/controls/scene-controls.js"
/*!********************************************!*\
  !*** ./samples/controls/scene-controls.js ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initializeSceneControls: () => (/* binding */ initializeSceneControls)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");


const textureLoader = new three__WEBPACK_IMPORTED_MODULE_0__.TextureLoader()

const propertiesObject = (scene) => ({
  overrideMaterial: {
    toggle: () => {
      if (scene.overrideMaterial !== null) {
        scene.overrideMaterial = null
      } else {
        scene.overrideMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.MeshNormalMaterial()
      }
    }
  },
  backGround: 'White',
  environment: {
    toggle: () => {
      if (scene.environment !== null) {
        scene.environment = null
      } else {
        textureLoader.load('/assets/equi.jpeg', (loaded) => {
          loaded.mapping = three__WEBPACK_IMPORTED_MODULE_0__.EquirectangularReflectionMapping
          scene.environment = loaded
        })
      }
    }
  }
})

const fogProperties = (fog) => ({
  color: 0xffffff,
  near: fog.near,
  far: fog.far
})

const initializeSceneControls = (gui, scene, fogEnabled, isOpen) => {
  const props = propertiesObject(scene)
  const sceneControls = gui.addFolder('Scene')

  sceneControls
    .add(props, 'backGround', ['White', 'Black', 'Null', 'Color', 'Texture', 'Cubemap'])
    .onChange((event) => handleBackgroundChange(event, scene))
  sceneControls.add(props.overrideMaterial, 'toggle').name('Toggle Override Material')
  sceneControls.add(props.environment, 'toggle').name('Toggle Environment')

  if (fogEnabled) {
    const fogColor = new three__WEBPACK_IMPORTED_MODULE_0__.Color(0xffffff)
    const fog = new three__WEBPACK_IMPORTED_MODULE_0__.Fog(fogColor, 1, 20)
    scene.fog = fog
    const fogProps = fogProperties(fog)
    const fogControls = sceneControls.addFolder('Fog')
    fogControls.addColor(fogProps, 'color')
    fogControls.add(fogProps, 'near', 0, 10, 0.1)
    fogControls.add(fogProps, 'far', 0, 100, 0.1)

    fogControls.onChange(() => {
      fog.color = fogColor.setHex(fogProps.color)
      fog.near = fogProps.near
      fog.far = fogProps.far
    })
  }

  isOpen ? sceneControls.open() : sceneControls.close()
}

const handleBackgroundChange = (setting, scene) => {
  switch (setting) {
    case 'White':
      scene.background = new three__WEBPACK_IMPORTED_MODULE_0__.Color(0xffffff)
      break
    case 'Black':
      scene.background = new three__WEBPACK_IMPORTED_MODULE_0__.Color(0x000000)
      break
    case 'Null':
      scene.background = null
      break
    case 'Color':
      scene.background = new three__WEBPACK_IMPORTED_MODULE_0__.Color(0x44ff44)
      break
    case 'Texture':
      textureLoader.load('/assets/textures/wood/abstract-antique-backdrop-164005.jpg', (loaded) => {
        loaded.encoding = three__WEBPACK_IMPORTED_MODULE_0__.sRGBEncoding
        scene.background = loaded
        scene.environment = null
      })
      break
    case 'Cubemap':
      textureLoader.load('/assets/equi.jpeg', (loaded) => {
        loaded.mapping = three__WEBPACK_IMPORTED_MODULE_0__.EquirectangularReflectionMapping
        scene.background = loaded
        scene.environment = loaded
      })

      break
    default:
      break
  }
}


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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
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
/******/ 			"custom-shader-material": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","vendors-node_modules_three-custom-shader-material_vanilla_js"], () => (__webpack_require__("./samples/chapters/chapter-4/custom-shader-material.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQSw0Rzs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTQvZ2xzbC9mcy1jb2xvci1zaGlmdC5nbHNsIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTQvZ2xzbC9mcy1uaWdodC1za3kuZ2xzbCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci00L2dsc2wvZnMtc2ltcGxlLmdsc2wiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItNC9nbHNsL3ZzLW5vb3AuZ2xzbCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci00L2dsc2wvdnMtc2ltcGxlLXJpcHBsZS5nbHNsIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTQvZ2xzbC92cy1zaW1wbGUuZ2xzbCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvYm9vdHN0cmFwL2Jvb3RzdHJhcC5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvYm9vdHN0cmFwL2xpZ2h0aW5nLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTQvY3VzdG9tLXNoYWRlci1tYXRlcmlhbC5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY29udHJvbGxlci9vcmJpdC1jb250cm9sbGVyLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jb250cm9scy9yZW5kZXJlci1jb250cm9sLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jb250cm9scy9zY2VuZS1jb250cm9scy5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvdXRpbC9pbmRleC5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvdXRpbC91cGRhdGUtb24tcmVzaXplLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgXCJwcmVjaXNpb24gaGlnaHAgZmxvYXQ7XFxudW5pZm9ybSBmbG9hdCB0aW1lO1xcbnZhcnlpbmcgdmVjMiB2VXY7XFxuXFxudmVjMyB2YXJ5KHZlYzMgeSlcXG57XFxuICB5PXkrc2luKHRpbWUpKnkucjtcXG4gIHJldHVybiB5O1xcbn1cXG5cXG52b2lkIG1haW4oKXtcXG4gIHZlYzIgc3Q9dlV2O1xcbiAgdmVjMyBjb2xvcj12YXJ5KHZlYzMoc3QueCouNSxzdC55KjEuLC41KSk7XFxuICBnbF9GcmFnQ29sb3I9dmVjNChjb2xvciwxLik7XFxuICBjc21fRGlmZnVzZUNvbG9yPWdsX0ZyYWdDb2xvcjtcXG59XCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIvLyBodHRwczovL3d3dy5zaGFkZXJ0b3kuY29tL3ZpZXcvTmxmZnpqXFxuLy8gM0QgR3JhZGllbnQgbm9pc2UgZnJvbTogaHR0cHM6Ly93d3cuc2hhZGVydG95LmNvbS92aWV3L1hzbDNEbFxcbnVuaWZvcm0gZmxvYXQgdGltZTtcXG51bmlmb3JtIHZlYzMgcmVzb2x1dGlvbjtcXG52YXJ5aW5nIHZlYzIgdlV2O1xcblxcbnZlYzMgaGFzaCh2ZWMzIHApLy8gcmVwbGFjZSB0aGlzIGJ5IHNvbWV0aGluZyBiZXR0ZXJcXG57XFxuICBwPXZlYzMoZG90KHAsdmVjMygxMjcuMSwzMTEuNyw3NC43KSksXFxuICBkb3QocCx2ZWMzKDI2OS41LDE4My4zLDI0Ni4xKSksXFxuICBkb3QocCx2ZWMzKDExMy41LDI3MS45LDEyNC42KSkpO1xcbiAgXFxuICByZXR1cm4tMS4rMi4qZnJhY3Qoc2luKHApKjQzNzU4LjU0NTMxMjMpO1xcbn1cXG5mbG9hdCBub2lzZShpbiB2ZWMzIHApXFxue1xcbiAgdmVjMyBpPWZsb29yKHApO1xcbiAgdmVjMyBmPWZyYWN0KHApO1xcbiAgXFxuICB2ZWMzIHU9ZipmKigzLi0yLipmKTtcXG4gIFxcbiAgcmV0dXJuIG1peChtaXgobWl4KGRvdChoYXNoKGkrdmVjMygwLiwwLiwwLikpLGYtdmVjMygwLiwwLiwwLikpLFxcbiAgZG90KGhhc2goaSt2ZWMzKDEuLDAuLDAuKSksZi12ZWMzKDEuLDAuLDAuKSksdS54KSxcXG4gIG1peChkb3QoaGFzaChpK3ZlYzMoMC4sMS4sMC4pKSxmLXZlYzMoMC4sMS4sMC4pKSxcXG4gIGRvdChoYXNoKGkrdmVjMygxLiwxLiwwLikpLGYtdmVjMygxLiwxLiwwLikpLHUueCksdS55KSxcXG4gIG1peChtaXgoZG90KGhhc2goaSt2ZWMzKDAuLDAuLDEuKSksZi12ZWMzKDAuLDAuLDEuKSksXFxuICBkb3QoaGFzaChpK3ZlYzMoMS4sMC4sMS4pKSxmLXZlYzMoMS4sMC4sMS4pKSx1LngpLFxcbiAgbWl4KGRvdChoYXNoKGkrdmVjMygwLiwxLiwxLikpLGYtdmVjMygwLiwxLiwxLikpLFxcbiAgZG90KGhhc2goaSt2ZWMzKDEuLDEuLDEuKSksZi12ZWMzKDEuLDEuLDEuKSksdS54KSx1LnkpLHUueik7XFxufVxcblxcbi8vIGZyb20gVW5pdHkncyBibGFjayBib2R5IFNoYWRlciBHcmFwaCBub2RlXFxudmVjMyBVbml0eV9CbGFja2JvZHlfZmxvYXQoZmxvYXQgVGVtcGVyYXR1cmUpXFxue1xcbiAgdmVjMyBjb2xvcj12ZWMzKDI1NS4sMjU1LiwyNTUuKTtcXG4gIGNvbG9yLng9NTYxMDAwMDAuKnBvdyhUZW1wZXJhdHVyZSwoLTMuLzIuKSkrMTQ4LjtcXG4gIGNvbG9yLnk9MTAwLjA0KmxvZyhUZW1wZXJhdHVyZSktNjIzLjY7XFxuICBpZihUZW1wZXJhdHVyZT42NTAwLiljb2xvci55PTM1MjAwMDAwLipwb3coVGVtcGVyYXR1cmUsKC0zLi8yLikpKzE4NC47XFxuICBjb2xvci56PTE5NC4xOCpsb2coVGVtcGVyYXR1cmUpLTE0NDguNjtcXG4gIGNvbG9yPWNsYW1wKGNvbG9yLDAuLDI1NS4pLzI1NS47XFxuICBpZihUZW1wZXJhdHVyZTwxMDAwLiljb2xvcio9VGVtcGVyYXR1cmUvMTAwMC47XFxuICByZXR1cm4gY29sb3I7XFxufVxcblxcbnZvaWQgbWFpbigpXFxue1xcbiAgLy8gTm9ybWFsaXplZCBwaXhlbCBjb29yZGluYXRlcyAoZnJvbSAwIHRvIDEpXFxuICAvLyB2ZWMyIHV2PXZVdi9yZXNvbHV0aW9uLnh5O1xcbiAgdmVjMiB1dj12VXY7XFxuICBcXG4gIC8vIFN0YXJzIGNvbXB1dGF0aW9uOlxcbiAgdmVjMyBzdGFyc19kaXJlY3Rpb249bm9ybWFsaXplKHZlYzModXYqMi5mLTEuZiwxLmYpKTsvLyBjb3VsZCBiZSB2aWV3IHZlY3RvciBmb3IgZXhhbXBsZVxcbiAgZmxvYXQgc3RhcnNfdGhyZXNob2xkPTguZjsvLyBtb2RpZmllcyB0aGUgbnVtYmVyIG9mIHN0YXJzIHRoYXQgYXJlIHZpc2libGVcXG4gIGZsb2F0IHN0YXJzX2V4cG9zdXJlPTIwMC5mOy8vIG1vZGlmaWVzIHRoZSBvdmVyYWxsIHN0cmVuZ3RoIG9mIHRoZSBzdGFyc1xcbiAgZmxvYXQgc3RhcnM9cG93KGNsYW1wKG5vaXNlKHN0YXJzX2RpcmVjdGlvbioyMDAuZiksMC5mLDEuZiksc3RhcnNfdGhyZXNob2xkKSpzdGFyc19leHBvc3VyZTtcXG4gIHN0YXJzKj1taXgoLjQsMS40LG5vaXNlKHN0YXJzX2RpcmVjdGlvbioxMDAuZit2ZWMzKHRpbWUpKSk7Ly8gdGltZSBiYXNlZCBmbGlja2VyaW5nXFxuICBcXG4gIC8vIHN0YXIgY29sb3IgYnkgcmFuZG9taXplZCB0ZW1wZXJhdHVyZVxcbiAgZmxvYXQgc3RhcnNfdGVtcGVyYXR1cmU9bm9pc2Uoc3RhcnNfZGlyZWN0aW9uKjE1MC4pKi41Ky41O1xcbiAgdmVjMyBzdGFyc19jb2xvcj1Vbml0eV9CbGFja2JvZHlfZmxvYXQobWl4KDE1MDAuLDY1MDAwLixwb3coc3RhcnNfdGVtcGVyYXR1cmUsNC4pKSk7XFxuICBcXG4gIC8vIE91dHB1dCB0byBzY3JlZW5cXG4gIGdsX0ZyYWdDb2xvcj12ZWM0KHN0YXJzX2NvbG9yKnN0YXJzLDEuKTtcXG4gIGNzbV9EaWZmdXNlQ29sb3I9Z2xfRnJhZ0NvbG9yO1xcbn1cIjsiLCJleHBvcnQgZGVmYXVsdCBcInVuaWZvcm0gZmxvYXQgdGltZTtcXG51bmlmb3JtIHZlYzIgcmVzb2x1dGlvbjtcXG5cXG52b2lkIG1haW4oKXtcXG4gIFxcbiAgZmxvYXQgYzE9bW9kKHRpbWUsLjUpO1xcbiAgZmxvYXQgYzI9bW9kKHRpbWUsLjcpO1xcbiAgZmxvYXQgYzM9bW9kKHRpbWUsLjkpO1xcblxcbiAgZ2xfRnJhZ0NvbG9yPXZlYzQoYzEsYzIsYzMsMS4pO1xcbiAgY3NtX0RpZmZ1c2VDb2xvcj12ZWM0KGMxLGMyLGMzLDEuKTtcXG59XCI7IiwiZXhwb3J0IGRlZmF1bHQgXCJ2YXJ5aW5nIHZlYzIgdlV2O1xcblxcbnZvaWQgbWFpbigpe1xcbiAgdlV2PXV2O1xcbiAgXFxuICB2ZWM0IG1vZGVsVmlld1Bvc2l0aW9uPW1vZGVsVmlld01hdHJpeCp2ZWM0KHBvc2l0aW9uLDEuKTtcXG4gIGdsX1Bvc2l0aW9uPXByb2plY3Rpb25NYXRyaXgqbW9kZWxWaWV3TWF0cml4KnZlYzQocG9zaXRpb24sMS4pO1xcbn1cIjsiLCJleHBvcnQgZGVmYXVsdCBcInVuaWZvcm0gZmxvYXQgdGltZTtcXG5cXG52YXJ5aW5nIHZlYzIgdlV2O1xcbnZvaWQgbWFpbigpe1xcbiAgdlV2PXV2O1xcbiAgXFxuICB2ZWMzIHRyYW5zZm9ybWVkUmlwcGxlPXZlYzMocG9zaXRpb24pO1xcbiAgZmxvYXQgZnJlcT0zLjtcXG4gIGZsb2F0IGFtcD0uMjtcXG4gIGZsb2F0IGFuZ2xlPSh0aW1lK3Bvc2l0aW9uLnkpKmZyZXE7XFxuICB0cmFuc2Zvcm1lZFJpcHBsZS56Kz1zaW4oYW5nbGUpKmFtcDtcXG4gIFxcbiAgZ2xfUG9zaXRpb249cHJvamVjdGlvbk1hdHJpeCptb2RlbFZpZXdNYXRyaXgqdmVjNCh0cmFuc2Zvcm1lZFJpcHBsZSwxLik7XFxuICBjc21fUG9zaXRpb249dHJhbnNmb3JtZWRSaXBwbGU7XFxufVwiOyIsImV4cG9ydCBkZWZhdWx0IFwidW5pZm9ybSBmbG9hdCB0aW1lO1xcbnZhcnlpbmcgdmVjMiB2VXY7XFxuXFxudm9pZCBtYWluKCl7XFxuXFxuICB2VXY9dXY7XFxuICB2ZWMzIHBvc0NoYW5nZWQ9cG9zaXRpb247XFxuICBwb3NDaGFuZ2VkLng9cG9zQ2hhbmdlZC54KihhYnMoc2luKHRpbWUqMi4pKSk7XFxuICBwb3NDaGFuZ2VkLnk9cG9zQ2hhbmdlZC55KihhYnMoc2luKHRpbWUqMS4pKSk7XFxuICBwb3NDaGFuZ2VkLno9cG9zQ2hhbmdlZC56KihhYnMoY29zKHRpbWUqLjUpKSk7XFxuICBcXG4gIGdsX1Bvc2l0aW9uPXByb2plY3Rpb25NYXRyaXgqbW9kZWxWaWV3TWF0cml4KnZlYzQocG9zQ2hhbmdlZCwxLik7XFxuICBjc21fUG9zaXRpb249cG9zQ2hhbmdlZDtcXG59XCI7IiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5pbXBvcnQgeyBpbml0T3JiaXRDb250cm9scyB9IGZyb20gJy4uL2NvbnRyb2xsZXIvb3JiaXQtY29udHJvbGxlcidcbmltcG9ydCB7IGluaXRMaWdodGluZyB9IGZyb20gJy4vbGlnaHRpbmcnXG5pbXBvcnQgeyBvblJlc2l6ZSB9IGZyb20gJy4uL3V0aWwvdXBkYXRlLW9uLXJlc2l6ZSdcblxuZXhwb3J0IGNvbnN0IGluaXRTY2VuZSA9ICh7IGJhY2tncm91bmRDb2xvciwgZm9nQ29sb3IsIGRpc2FibGVTaGFkb3dzLCBkaXNhYmxlTGlnaHRzLCBkaXNhYmxlRGVmYXVsdENvbnRyb2xzIH0pID0+IHtcbiAgY29uc3QgaW5pdCA9IChmbikgPT4ge1xuICAgIC8vIGJhc2ljIHNjZW5lIHNldHVwXG4gICAgY29uc3Qgc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKVxuICAgIGlmIChiYWNrZ3JvdW5kQ29sb3IpIHtcbiAgICAgIHNjZW5lLmJhY2tncm91bmRDb2xvciA9IGJhY2tncm91bmRDb2xvclxuICAgIH1cblxuICAgIGlmIChmb2dDb2xvcikge1xuICAgICAgc2NlbmUuZm9nID0gbmV3IFRIUkVFLkZvZyhmb2dDb2xvciwgMC4wMDI1LCA1MClcbiAgICB9XG5cbiAgICAvLyBzZXR1cCBjYW1lcmEgYW5kIGJhc2ljIHJlbmRlcmVyXG4gICAgY29uc3QgY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKDc1LCB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodCwgMC4xLCAxMDAwKVxuICAgIGNvbnN0IHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoeyBhbnRpYWxpYXM6IHRydWUgfSlcbiAgICByZW5kZXJlci5vdXRwdXRFbmNvZGluZyA9IFRIUkVFLnNSR0JFbmNvZGluZ1xuICAgIHJlbmRlcmVyLnNoYWRvd01hcC5lbmFibGVkID0gdHJ1ZVxuICAgIHJlbmRlcmVyLnNoYWRvd01hcC50eXBlID0gVEhSRUUuVlNNU2hhZG93TWFwXG4gICAgcmVuZGVyZXIuc2V0Q2xlYXJDb2xvcihiYWNrZ3JvdW5kQ29sb3IpXG5cbiAgICBvblJlc2l6ZShjYW1lcmEsIHJlbmRlcmVyKVxuICAgIHJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodClcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHJlbmRlcmVyLmRvbUVsZW1lbnQpXG5cbiAgICAvLyBpbml0aWFsaXplIG9yYml0IGNvbnRyb2xzXG4gICAgbGV0IG9yYml0Q29udHJvbHNcbiAgICBpZiAoIWRpc2FibGVEZWZhdWx0Q29udHJvbHMpIHtcbiAgICAgIG9yYml0Q29udHJvbHMgPSBpbml0T3JiaXRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyKVxuICAgIH1cblxuICAgIC8vIGFkZCBzb21lIGJhc2ljIGxpZ2h0aW5nIHRvIHRoZSBzY2VuZVxuICAgIGlmICghZGlzYWJsZUxpZ2h0cyA/PyBmYWxzZSkge1xuICAgICAgaW5pdExpZ2h0aW5nKHNjZW5lLCB7IGRpc2FibGVTaGFkb3dzIH0pXG4gICAgfVxuXG4gICAgZm4oeyBzY2VuZSwgY2FtZXJhLCByZW5kZXJlciwgb3JiaXRDb250cm9scyB9KVxuICB9XG5cbiAgcmV0dXJuIGluaXRcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuXG5leHBvcnQgY29uc3QgaW5pdExpZ2h0aW5nID0gKHNjZW5lLCB7IGRpc2FibGVTaGFkb3dzIH0pID0+IHtcbiAgLy8gaHR0cHM6Ly90aHJlZWpzLm9yZy9leGFtcGxlcy8/cT1zaGFkbyN3ZWJnbF9zaGFkb3dtYXBfdnNtXG4gIHNjZW5lLmFkZChuZXcgVEhSRUUuQW1iaWVudExpZ2h0KDB4NjY2NjY2KSlcblxuICAvLyBjb25zdCBkaXJMaWdodCA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4YWFhYWFhKVxuICBjb25zdCBkaXJMaWdodCA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4YWFhYWFhKVxuICBkaXJMaWdodC5wb3NpdGlvbi5zZXQoNSwgMTIsIDgpXG4gIGRpckxpZ2h0LmNhc3RTaGFkb3cgPSAhZGlzYWJsZVNoYWRvd3MgPyB0cnVlIDogZmFsc2VcbiAgZGlyTGlnaHQuaW50ZW5zaXR5ID0gMVxuICBkaXJMaWdodC5zaGFkb3cuY2FtZXJhLm5lYXIgPSAwLjFcbiAgZGlyTGlnaHQuc2hhZG93LmNhbWVyYS5mYXIgPSAyMDBcbiAgZGlyTGlnaHQuc2hhZG93LmNhbWVyYS5yaWdodCA9IDEwXG4gIGRpckxpZ2h0LnNoYWRvdy5jYW1lcmEubGVmdCA9IC0xMFxuICBkaXJMaWdodC5zaGFkb3cuY2FtZXJhLnRvcCA9IDEwXG4gIGRpckxpZ2h0LnNoYWRvdy5jYW1lcmEuYm90dG9tID0gLTEwXG4gIGRpckxpZ2h0LnNoYWRvdy5tYXBTaXplLndpZHRoID0gMjA0OFxuICBkaXJMaWdodC5zaGFkb3cubWFwU2l6ZS5oZWlnaHQgPSAyMDQ4XG4gIGRpckxpZ2h0LnNoYWRvdy5yYWRpdXMgPSA0XG4gIGRpckxpZ2h0LnNoYWRvdy5iaWFzID0gLTAuMDAwMDVcblxuICBzY2VuZS5hZGQoZGlyTGlnaHQpXG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcbmltcG9ydCB7IGluaXRTY2VuZSB9IGZyb20gJy4uLy4uL2Jvb3RzdHJhcC9ib290c3RyYXAnXG5pbXBvcnQgeyBpbnRpYWxpemVSZW5kZXJlckNvbnRyb2xzIH0gZnJvbSAnLi4vLi4vY29udHJvbHMvcmVuZGVyZXItY29udHJvbCdcblxuaW1wb3J0IEdVSSBmcm9tICdsaWwtZ3VpJ1xuaW1wb3J0IEN1c3RvbVNoYWRlck1hdGVyaWFsIGZyb20gJ3RocmVlLWN1c3RvbS1zaGFkZXItbWF0ZXJpYWwvdmFuaWxsYSdcblxuaW1wb3J0IGZzX3NpbXBsZSBmcm9tICcuL2dsc2wvZnMtc2ltcGxlLmdsc2wnXG5pbXBvcnQgdnNfc2ltcGxlIGZyb20gJy4vZ2xzbC92cy1zaW1wbGUuZ2xzbCdcbmltcG9ydCBmc19uaWdodF9za3kgZnJvbSAnLi9nbHNsL2ZzLW5pZ2h0LXNreS5nbHNsJ1xuaW1wb3J0IHZzX25vb3AgZnJvbSAnLi9nbHNsL3ZzLW5vb3AuZ2xzbCdcbmltcG9ydCBmc19jb2xvcl9zaGlmdCBmcm9tICcuL2dsc2wvZnMtY29sb3Itc2hpZnQuZ2xzbCdcbmltcG9ydCB2c19yaXBwbGUgZnJvbSAnLi9nbHNsL3ZzLXNpbXBsZS1yaXBwbGUuZ2xzbCdcblxuaW1wb3J0IHsgZ2V0T2JqZWN0c0tleXMgfSBmcm9tICcuLi8uLi91dGlsJ1xuaW1wb3J0IHsgaW5pdGlhbGl6ZVNjZW5lQ29udHJvbHMgfSBmcm9tICcuLi8uLi9jb250cm9scy9zY2VuZS1jb250cm9scydcblxuY29uc3QgcHJvcHMgPSB7XG4gIGJhY2tncm91bmRDb2xvcjogMHhmZmZmZmYsXG4gIGZvZ0NvbG9yOiAweGZmZmZmZlxufVxuXG5jb25zdCBndWkgPSBuZXcgR1VJKClcblxuY29uc3QgZ2V0VmVydGV4U2hhZGVyUGxhbmUgPSAodmVydGV4U2hhZGVyLCBmcmFnbWVudFNoYWRlcikgPT4ge1xuICBjb25zdCBnZW9tZXRyeSA9IG5ldyBUSFJFRS5Ub3J1c0tub3RCdWZmZXJHZW9tZXRyeSgyLCAwLjUsIDIwMCwgMjApXG4gIGNvbnN0IG1hdGVyaWFsID0gbmV3IEN1c3RvbVNoYWRlck1hdGVyaWFsKHtcbiAgICBiYXNlTWF0ZXJpYWw6IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsLFxuICAgIHZlcnRleFNoYWRlcjogdmVydGV4U2hhZGVyLFxuICAgIGZyYWdtZW50U2hhZGVyOiBmcmFnbWVudFNoYWRlcixcbiAgICB1bmlmb3Jtczoge1xuICAgICAgdGltZTogeyB2YWx1ZTogMC4yIH0sXG4gICAgICByZXNvbHV0aW9uOiB7IHZhbHVlOiBuZXcgVEhSRUUuVmVjdG9yMigpIH1cbiAgICB9LFxuICAgIGZsYXRTaGFkaW5nOiBmYWxzZSxcbiAgICBjb2xvcjogMHhmZmZmZmYsXG4gICAgcm91Z2huZXNzOiAwLjEsXG4gICAgbWV0YWxuZXNzOiAwLjlcbiAgfSlcblxuICByZXR1cm4geyBnZW9tZXRyeSwgbWF0ZXJpYWwgfVxufVxuXG5pbml0U2NlbmUocHJvcHMpKCh7IHNjZW5lLCBjYW1lcmEsIHJlbmRlcmVyLCBvcmJpdENvbnRyb2xzIH0pID0+IHtcbiAgY2FtZXJhLnBvc2l0aW9uLnNldCgtMywgOCwgMilcbiAgY2FtZXJhLm5lYXIgPSAxXG4gIGNhbWVyYS5mYXIgPSAxMDBcblxuICBjYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpXG4gIG9yYml0Q29udHJvbHMudXBkYXRlKClcblxuICBjb25zdCBwcm9wcyA9IHtcbiAgICB2ZXJ0ZXhTaGFkZXI6ICd2c19zaW1wbGUnLFxuICAgIGZyYWdtZW50U2hhZGVyOiAnZnNfc2ltcGxlJyxcbiAgICB0aW1lSW5jcmVtZW50OiAwLjAwNVxuICB9XG5cbiAgbGV0IHsgZ2VvbWV0cnksIG1hdGVyaWFsIH0gPSBnZXRWZXJ0ZXhTaGFkZXJQbGFuZSh2c19zaW1wbGUsIGZzX3NpbXBsZSlcbiAgbGV0IG1lc2ggPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpXG4gIG1lc2gucmVjZWl2ZVNoYWRvdyA9IHRydWVcblxuICBjb25zdCBzaGFkZXJGb2xkZXIgPSBndWkuYWRkRm9sZGVyKCdTaGFkZXJzJylcbiAgY29uc3QgdmVydGV4U2hhZGVycyA9IHsgdnNfc2ltcGxlOiB2c19zaW1wbGUsIHZzX25vb3A6IHZzX25vb3AsIHZzX3JpcHBsZTogdnNfcmlwcGxlIH1cbiAgY29uc3QgZnJhZ21lbnRTaGFkZXJzID0geyBmc19zaW1wbGU6IGZzX3NpbXBsZSwgZnNfbmlnaHRfc2t5OiBmc19uaWdodF9za3ksIGZzX2NvbG9yX3NoaWZ0OiBmc19jb2xvcl9zaGlmdCB9XG5cbiAgc2hhZGVyRm9sZGVyLmFkZChwcm9wcywgJ2ZyYWdtZW50U2hhZGVyJywgZ2V0T2JqZWN0c0tleXMoZnJhZ21lbnRTaGFkZXJzKSkub25DaGFuZ2UoKCkgPT4ge1xuICAgIHNjZW5lLnJlbW92ZShtZXNoKVxuICAgIDsoeyBnZW9tZXRyeSwgbWF0ZXJpYWwgfSA9IGdldFZlcnRleFNoYWRlclBsYW5lKFxuICAgICAgdmVydGV4U2hhZGVyc1twcm9wcy52ZXJ0ZXhTaGFkZXJdLFxuICAgICAgZnJhZ21lbnRTaGFkZXJzW3Byb3BzLmZyYWdtZW50U2hhZGVyXVxuICAgICkpXG4gICAgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbClcbiAgICBtZXNoLnJlY2VpdmVTaGFkb3cgPSB0cnVlXG4gICAgc2NlbmUuYWRkKG1lc2gpXG4gIH0pXG4gIHNoYWRlckZvbGRlci5hZGQocHJvcHMsICd2ZXJ0ZXhTaGFkZXInLCBnZXRPYmplY3RzS2V5cyh2ZXJ0ZXhTaGFkZXJzKSkub25DaGFuZ2UoKCkgPT4ge1xuICAgIHNjZW5lLnJlbW92ZShtZXNoKVxuICAgIDsoeyBnZW9tZXRyeSwgbWF0ZXJpYWwgfSA9IGdldFZlcnRleFNoYWRlclBsYW5lKFxuICAgICAgdmVydGV4U2hhZGVyc1twcm9wcy52ZXJ0ZXhTaGFkZXJdLFxuICAgICAgZnJhZ21lbnRTaGFkZXJzW3Byb3BzLmZyYWdtZW50U2hhZGVyXVxuICAgICkpXG4gICAgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbClcbiAgICBtZXNoLnJlY2VpdmVTaGFkb3cgPSB0cnVlXG4gICAgc2NlbmUuYWRkKG1lc2gpXG4gIH0pXG4gIHNoYWRlckZvbGRlci5hZGQocHJvcHMsICd0aW1lSW5jcmVtZW50JywgLTAuMDEsIDAuMDEsIDAuMDAxKVxuXG4gIHNjZW5lLmFkZChtZXNoKVxuXG4gIGZ1bmN0aW9uIGFuaW1hdGUoKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpXG4gICAgcmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEpXG4gICAgb3JiaXRDb250cm9scy51cGRhdGUoKVxuICAgIG1hdGVyaWFsLnVuaWZvcm1zLnRpbWUudmFsdWUgKz0gcHJvcHMudGltZUluY3JlbWVudFxuICB9XG4gIGFuaW1hdGUoKVxuXG4gIGNvbnNvbGUubG9nKG1hdGVyaWFsKVxuXG4gIGludGlhbGl6ZVJlbmRlcmVyQ29udHJvbHMoZ3VpLCByZW5kZXJlcilcbiAgaW5pdGlhbGl6ZVNjZW5lQ29udHJvbHMoZ3VpLCBzY2VuZSwgZmFsc2UsIGZhbHNlKVxufSlcbiIsImltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vY29udHJvbHMvT3JiaXRDb250cm9scydcblxuZXhwb3J0IGNvbnN0IGluaXRPcmJpdENvbnRyb2xzID0gKGNhbWVyYSwgcmVuZGVyZXIpID0+IHtcbiAgY29uc3QgY29udHJvbGxlciA9IG5ldyBPcmJpdENvbnRyb2xzKGNhbWVyYSwgcmVuZGVyZXIuZG9tRWxlbWVudClcbiAgY29udHJvbGxlci5lbmFibGVEYW1waW5nID0gdHJ1ZVxuICBjb250cm9sbGVyLmRhbXBpbmdGYWN0b3IgPSAwLjA1XG4gIGNvbnRyb2xsZXIubWluRGlzdGFuY2UgPSAxXG4gIGNvbnRyb2xsZXIubWF4RGlzdGFuY2UgPSAxMDBcbiAgY29udHJvbGxlci5taW5Qb2xhckFuZ2xlID0gTWF0aC5QSSAvIDRcbiAgY29udHJvbGxlci5tYXhQb2xhckFuZ2xlID0gKDMgKiBNYXRoLlBJKSAvIDRcblxuICByZXR1cm4gY29udHJvbGxlclxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5cbmNvbnN0IGVudW1zID0ge1xuICB0b25lTWFwcGluZ09wdGlvbnM6IHtcbiAgICBOb25lOiBUSFJFRS5Ob1RvbmVNYXBwaW5nLFxuICAgIExpbmVhcjogVEhSRUUuTGluZWFyVG9uZU1hcHBpbmcsXG4gICAgUmVpbmhhcmQ6IFRIUkVFLlJlaW5oYXJkVG9uZU1hcHBpbmcsXG4gICAgQ2luZW9uOiBUSFJFRS5DaW5lb25Ub25lTWFwcGluZyxcbiAgICBBQ0VTRmlsbWljOiBUSFJFRS5BQ0VTRmlsbWljVG9uZU1hcHBpbmcsXG4gICAgQ3VzdG9tOiBUSFJFRS5DdXN0b21Ub25lTWFwcGluZyxcbiAgfSxcbiAgc2hhZG93TWFwcGluZzoge1xuICAgIEJhc2ljOiBUSFJFRS5CYXNpY1NoYWRvd01hcCxcbiAgICBQQ0ZTOiBUSFJFRS5QQ0ZTaGFkb3dNYXAsXG4gICAgUENGU29mdDogVEhSRUUuUENGU29mdFNoYWRvd01hcCxcbiAgICBWU006IFRIUkVFLlZTTVNoYWRvd01hcCxcbiAgfSxcbiAgb3V0cHV0RW5jb2RpbmdzOiB7XG4gICAgTGluZWFyOiBUSFJFRS5MaW5lYXJFbmNvZGluZyxcbiAgICBzUkdCOiBUSFJFRS5zUkdCRW5jb2RpbmcsXG4gIH0sXG59O1xuXG5jb25zdCBnZXRQcm9wZXJ0eUhvbGRlciA9ICh3ZWJHTFJlbmRlcmVyKSA9PiB7XG4gIGNvbnN0IGNsZWFyQ29sb3JIb2xkZXIgPSBuZXcgVEhSRUUuQ29sb3IoKTtcbiAgd2ViR0xSZW5kZXJlci5nZXRDbGVhckNvbG9yKGNsZWFyQ29sb3JIb2xkZXIpO1xuXG4gIGNvbnN0IGhvbGRlciA9IHtcbiAgICBtYWluOiB7XG4gICAgICBvdXRwdXRFbmNvZGluZzogd2ViR0xSZW5kZXJlci5vdXRwdXRFbmNvZGluZyxcbiAgICB9LFxuICAgIHNoYWRvd01hcDoge1xuICAgICAgZW5hYmxlZDogd2ViR0xSZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCxcbiAgICAgIGF1dG9VcGRhdGU6IHdlYkdMUmVuZGVyZXIuc2hhZG93TWFwLmF1dG9VcGRhdGUsXG4gICAgICBuZWVkc1VwZGF0ZTogKCkgPT4gKHdlYkdMUmVuZGVyZXIuc2hhZG93TWFwLm5lZWRzVXBkYXRlID0gdHJ1ZSksXG4gICAgICB0eXBlOiB3ZWJHTFJlbmRlcmVyLnNoYWRvd01hcC50eXBlLFxuICAgIH0sXG4gICAgdG9uZU1hcHBpbmc6IHtcbiAgICAgIGV4cG9zdXJlOiB3ZWJHTFJlbmRlcmVyLnRvbmVNYXBwaW5nRXhwb3N1cmUsXG4gICAgICB0b25lTWFwcGluZzogd2ViR0xSZW5kZXJlci50b25lTWFwcGluZyxcbiAgICB9LFxuICAgIGNsZWFyU2V0dGluZ3M6IHtcbiAgICAgIGF1dG9DbGVhcjogd2ViR0xSZW5kZXJlci5hdXRvQ2xlYXIsXG4gICAgICBjbGVhckNvbG9yOiBjbGVhckNvbG9ySG9sZGVyLmdldFN0eWxlKCksXG4gICAgfSxcbiAgICBhZHZhbmNlZDoge1xuICAgICAgYXV0b0NsZWFyRGVwdGg6IHdlYkdMUmVuZGVyZXIuYXV0b0NsZWFyRGVwdGgsXG4gICAgICBhdXRvQ2xlYXJTdGVuY2lsOiB3ZWJHTFJlbmRlcmVyLmF1dG9DbGVhclN0ZW5jaWwsXG4gICAgICBjaGVja1NoYWRlckVycm9yczogd2ViR0xSZW5kZXJlci5kZWJ1Zy5jaGVja1NoYWRlckVycm9ycyxcbiAgICAgIHNvcnRPYmplY3RzOiB3ZWJHTFJlbmRlcmVyLnNvcnRPYmplY3RzLFxuICAgICAgbG9jYWxDbGlwcGluZ0VuYWJsZWQ6IHdlYkdMUmVuZGVyZXIubG9jYWxDbGlwcGluZ0VuYWJsZWQsXG4gICAgICBwaHlzaWNhbGx5Q29ycmVjdExpZ2h0czogd2ViR0xSZW5kZXJlci5waHlzaWNhbGx5Q29ycmVjdExpZ2h0cyxcbiAgICB9LFxuICB9O1xuXG4gIHJldHVybiBob2xkZXI7XG59O1xuXG5leHBvcnQgY29uc3QgaW50aWFsaXplUmVuZGVyZXJDb250cm9scyA9IChndWksIHdlYkdMUmVuZGVyZXIpID0+IHtcbiAgY29uc3QgcHJvcGVydGllc09iamVjdCA9IGdldFByb3BlcnR5SG9sZGVyKHdlYkdMUmVuZGVyZXIpO1xuICBjb25zdCByZW5kZXJlckZvbGRlciA9IGd1aS5hZGRGb2xkZXIoXCJXZWJHTFJlbmRlcmVyXCIpO1xuXG4gIHJlbmRlcmVyRm9sZGVyLm9uQ2hhbmdlKChfKSA9PiB7XG4gICAgdXBkYXRlV2ViR0xSZW5kZXJlclByb3BlcnRpZXMod2ViR0xSZW5kZXJlciwgcHJvcGVydGllc09iamVjdCk7XG4gIH0pO1xuXG4gIHJlbmRlcmVyRm9sZGVyLmFkZChcbiAgICBwcm9wZXJ0aWVzT2JqZWN0Lm1haW4sXG4gICAgXCJvdXRwdXRFbmNvZGluZ1wiLFxuICAgIGVudW1zLm91dHB1dEVuY29kaW5nc1xuICApO1xuXG4gIGNvbnN0IHNoYWRvd0ZvbGRlciA9IHJlbmRlcmVyRm9sZGVyLmFkZEZvbGRlcihcIlNoYWRvd1wiKTtcbiAgc2hhZG93Rm9sZGVyLmFkZChwcm9wZXJ0aWVzT2JqZWN0LnNoYWRvd01hcCwgXCJlbmFibGVkXCIpO1xuICBzaGFkb3dGb2xkZXIuYWRkKHByb3BlcnRpZXNPYmplY3Quc2hhZG93TWFwLCBcImF1dG9VcGRhdGVcIik7XG4gIHNoYWRvd0ZvbGRlci5hZGQocHJvcGVydGllc09iamVjdC5zaGFkb3dNYXAsIFwibmVlZHNVcGRhdGVcIik7XG4gIHNoYWRvd0ZvbGRlclxuICAgIC5hZGQocHJvcGVydGllc09iamVjdC5zaGFkb3dNYXAsIFwidHlwZVwiLCBlbnVtcy5zaGFkb3dNYXBwaW5nKVxuICAgIC5lbmFibGUoZmFsc2UpOyAvLyBjYW4ndCB1cGRhdGUgdGhlIHNoYWRvdyBtYXBwaW5nIHR5cGUgaW4gcnVudGltZVxuXG4gIGNvbnN0IHRvbmVNYXBwaW5nRm9sZGVyID0gcmVuZGVyZXJGb2xkZXIuYWRkRm9sZGVyKFwiVG9uZU1hcHBpbmdcIik7XG4gIHRvbmVNYXBwaW5nRm9sZGVyLmFkZChwcm9wZXJ0aWVzT2JqZWN0LnRvbmVNYXBwaW5nLCBcImV4cG9zdXJlXCIsIDAsIDIpO1xuICB0b25lTWFwcGluZ0ZvbGRlci5hZGQoXG4gICAgcHJvcGVydGllc09iamVjdC50b25lTWFwcGluZyxcbiAgICBcInRvbmVNYXBwaW5nXCIsXG4gICAgZW51bXMudG9uZU1hcHBpbmdPcHRpb25zXG4gICk7XG5cbiAgY29uc3QgY2xlYXJTZXR0aW5nc0ZvbGRlciA9IHJlbmRlcmVyRm9sZGVyLmFkZEZvbGRlcihcImNsZWFyU2V0dGluZ3NcIik7XG4gIGNsZWFyU2V0dGluZ3NGb2xkZXIuYWRkKHByb3BlcnRpZXNPYmplY3QuY2xlYXJTZXR0aW5ncywgXCJhdXRvQ2xlYXJcIik7XG4gIGNsZWFyU2V0dGluZ3NGb2xkZXIuYWRkQ29sb3IocHJvcGVydGllc09iamVjdC5jbGVhclNldHRpbmdzLCBcImNsZWFyQ29sb3JcIik7XG5cbiAgcmVuZGVyZXJGb2xkZXIuY2xvc2UoKTtcbn07XG5cbmNvbnN0IHVwZGF0ZVdlYkdMUmVuZGVyZXJQcm9wZXJ0aWVzID0gKHdlYkdMUmVuZGVyZXIsIHByb3BlcnR5SG9sZGVyKSA9PiB7XG4gIHdlYkdMUmVuZGVyZXIuc2hhZG93TWFwLmVuYWJsZWQgPSBwcm9wZXJ0eUhvbGRlci5zaGFkb3dNYXAuZW5hYmxlZDtcbiAgd2ViR0xSZW5kZXJlci5zaGFkb3dNYXAuYXV0b1VwZGF0ZSA9IHByb3BlcnR5SG9sZGVyLnNoYWRvd01hcC5hdXRvVXBkYXRlO1xuICB3ZWJHTFJlbmRlcmVyLnNoYWRvd01hcC5uZWVkc1VwZGF0ZSA9IHByb3BlcnR5SG9sZGVyLnNoYWRvd01hcC5uZWVkc1VwZGF0ZTtcbiAgd2ViR0xSZW5kZXJlci50b25lTWFwcGluZyA9IHByb3BlcnR5SG9sZGVyLnRvbmVNYXBwaW5nLnRvbmVNYXBwaW5nO1xuICB3ZWJHTFJlbmRlcmVyLnRvbmVNYXBwaW5nRXhwb3N1cmUgPSBwcm9wZXJ0eUhvbGRlci50b25lTWFwcGluZy5leHBvc3VyZTtcbiAgd2ViR0xSZW5kZXJlci5hdXRvQ2xlYXIgPSBwcm9wZXJ0eUhvbGRlci5jbGVhclNldHRpbmdzLmF1dG9DbGVhcjtcbiAgd2ViR0xSZW5kZXJlci5zZXRDbGVhckNvbG9yKHByb3BlcnR5SG9sZGVyLmNsZWFyU2V0dGluZ3MuY2xlYXJDb2xvcik7XG4gIHdlYkdMUmVuZGVyZXIub3V0cHV0RW5jb2RpbmcgPSBwcm9wZXJ0eUhvbGRlci5tYWluLm91dHB1dEVuY29kaW5nO1xuXG4gIHdlYkdMUmVuZGVyZXIubmVlZHNVcGRhdGUgPSB0cnVlO1xufTtcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuXG5jb25zdCB0ZXh0dXJlTG9hZGVyID0gbmV3IFRIUkVFLlRleHR1cmVMb2FkZXIoKVxuXG5jb25zdCBwcm9wZXJ0aWVzT2JqZWN0ID0gKHNjZW5lKSA9PiAoe1xuICBvdmVycmlkZU1hdGVyaWFsOiB7XG4gICAgdG9nZ2xlOiAoKSA9PiB7XG4gICAgICBpZiAoc2NlbmUub3ZlcnJpZGVNYXRlcmlhbCAhPT0gbnVsbCkge1xuICAgICAgICBzY2VuZS5vdmVycmlkZU1hdGVyaWFsID0gbnVsbFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2NlbmUub3ZlcnJpZGVNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTm9ybWFsTWF0ZXJpYWwoKVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgYmFja0dyb3VuZDogJ1doaXRlJyxcbiAgZW52aXJvbm1lbnQ6IHtcbiAgICB0b2dnbGU6ICgpID0+IHtcbiAgICAgIGlmIChzY2VuZS5lbnZpcm9ubWVudCAhPT0gbnVsbCkge1xuICAgICAgICBzY2VuZS5lbnZpcm9ubWVudCA9IG51bGxcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRleHR1cmVMb2FkZXIubG9hZCgnL2Fzc2V0cy9lcXVpLmpwZWcnLCAobG9hZGVkKSA9PiB7XG4gICAgICAgICAgbG9hZGVkLm1hcHBpbmcgPSBUSFJFRS5FcXVpcmVjdGFuZ3VsYXJSZWZsZWN0aW9uTWFwcGluZ1xuICAgICAgICAgIHNjZW5lLmVudmlyb25tZW50ID0gbG9hZGVkXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuXG5jb25zdCBmb2dQcm9wZXJ0aWVzID0gKGZvZykgPT4gKHtcbiAgY29sb3I6IDB4ZmZmZmZmLFxuICBuZWFyOiBmb2cubmVhcixcbiAgZmFyOiBmb2cuZmFyXG59KVxuXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZVNjZW5lQ29udHJvbHMgPSAoZ3VpLCBzY2VuZSwgZm9nRW5hYmxlZCwgaXNPcGVuKSA9PiB7XG4gIGNvbnN0IHByb3BzID0gcHJvcGVydGllc09iamVjdChzY2VuZSlcbiAgY29uc3Qgc2NlbmVDb250cm9scyA9IGd1aS5hZGRGb2xkZXIoJ1NjZW5lJylcblxuICBzY2VuZUNvbnRyb2xzXG4gICAgLmFkZChwcm9wcywgJ2JhY2tHcm91bmQnLCBbJ1doaXRlJywgJ0JsYWNrJywgJ051bGwnLCAnQ29sb3InLCAnVGV4dHVyZScsICdDdWJlbWFwJ10pXG4gICAgLm9uQ2hhbmdlKChldmVudCkgPT4gaGFuZGxlQmFja2dyb3VuZENoYW5nZShldmVudCwgc2NlbmUpKVxuICBzY2VuZUNvbnRyb2xzLmFkZChwcm9wcy5vdmVycmlkZU1hdGVyaWFsLCAndG9nZ2xlJykubmFtZSgnVG9nZ2xlIE92ZXJyaWRlIE1hdGVyaWFsJylcbiAgc2NlbmVDb250cm9scy5hZGQocHJvcHMuZW52aXJvbm1lbnQsICd0b2dnbGUnKS5uYW1lKCdUb2dnbGUgRW52aXJvbm1lbnQnKVxuXG4gIGlmIChmb2dFbmFibGVkKSB7XG4gICAgY29uc3QgZm9nQ29sb3IgPSBuZXcgVEhSRUUuQ29sb3IoMHhmZmZmZmYpXG4gICAgY29uc3QgZm9nID0gbmV3IFRIUkVFLkZvZyhmb2dDb2xvciwgMSwgMjApXG4gICAgc2NlbmUuZm9nID0gZm9nXG4gICAgY29uc3QgZm9nUHJvcHMgPSBmb2dQcm9wZXJ0aWVzKGZvZylcbiAgICBjb25zdCBmb2dDb250cm9scyA9IHNjZW5lQ29udHJvbHMuYWRkRm9sZGVyKCdGb2cnKVxuICAgIGZvZ0NvbnRyb2xzLmFkZENvbG9yKGZvZ1Byb3BzLCAnY29sb3InKVxuICAgIGZvZ0NvbnRyb2xzLmFkZChmb2dQcm9wcywgJ25lYXInLCAwLCAxMCwgMC4xKVxuICAgIGZvZ0NvbnRyb2xzLmFkZChmb2dQcm9wcywgJ2ZhcicsIDAsIDEwMCwgMC4xKVxuXG4gICAgZm9nQ29udHJvbHMub25DaGFuZ2UoKCkgPT4ge1xuICAgICAgZm9nLmNvbG9yID0gZm9nQ29sb3Iuc2V0SGV4KGZvZ1Byb3BzLmNvbG9yKVxuICAgICAgZm9nLm5lYXIgPSBmb2dQcm9wcy5uZWFyXG4gICAgICBmb2cuZmFyID0gZm9nUHJvcHMuZmFyXG4gICAgfSlcbiAgfVxuXG4gIGlzT3BlbiA/IHNjZW5lQ29udHJvbHMub3BlbigpIDogc2NlbmVDb250cm9scy5jbG9zZSgpXG59XG5cbmNvbnN0IGhhbmRsZUJhY2tncm91bmRDaGFuZ2UgPSAoc2V0dGluZywgc2NlbmUpID0+IHtcbiAgc3dpdGNoIChzZXR0aW5nKSB7XG4gICAgY2FzZSAnV2hpdGUnOlxuICAgICAgc2NlbmUuYmFja2dyb3VuZCA9IG5ldyBUSFJFRS5Db2xvcigweGZmZmZmZilcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnQmxhY2snOlxuICAgICAgc2NlbmUuYmFja2dyb3VuZCA9IG5ldyBUSFJFRS5Db2xvcigweDAwMDAwMClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnTnVsbCc6XG4gICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbnVsbFxuICAgICAgYnJlYWtcbiAgICBjYXNlICdDb2xvcic6XG4gICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbmV3IFRIUkVFLkNvbG9yKDB4NDRmZjQ0KVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdUZXh0dXJlJzpcbiAgICAgIHRleHR1cmVMb2FkZXIubG9hZCgnL2Fzc2V0cy90ZXh0dXJlcy93b29kL2Fic3RyYWN0LWFudGlxdWUtYmFja2Ryb3AtMTY0MDA1LmpwZycsIChsb2FkZWQpID0+IHtcbiAgICAgICAgbG9hZGVkLmVuY29kaW5nID0gVEhSRUUuc1JHQkVuY29kaW5nXG4gICAgICAgIHNjZW5lLmJhY2tncm91bmQgPSBsb2FkZWRcbiAgICAgICAgc2NlbmUuZW52aXJvbm1lbnQgPSBudWxsXG4gICAgICB9KVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdDdWJlbWFwJzpcbiAgICAgIHRleHR1cmVMb2FkZXIubG9hZCgnL2Fzc2V0cy9lcXVpLmpwZWcnLCAobG9hZGVkKSA9PiB7XG4gICAgICAgIGxvYWRlZC5tYXBwaW5nID0gVEhSRUUuRXF1aXJlY3Rhbmd1bGFyUmVmbGVjdGlvbk1hcHBpbmdcbiAgICAgICAgc2NlbmUuYmFja2dyb3VuZCA9IGxvYWRlZFxuICAgICAgICBzY2VuZS5lbnZpcm9ubWVudCA9IGxvYWRlZFxuICAgICAgfSlcblxuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgYnJlYWtcbiAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IGdldE9iamVjdHNLZXlzID0gKG9iaikgPT4ge1xuICBjb25zdCBrZXlzID0gW107XG5cbiAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ga2V5cztcbn07XG4iLCJleHBvcnQgY29uc3Qgb25SZXNpemUgPSAoY2FtZXJhLCByZW5kZXJlcikgPT4ge1xuICBjb25zdCByZXNpemVyID0gKCkgPT4ge1xuICAgIGNhbWVyYS5hc3BlY3QgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodFxuICAgIGNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KClcbiAgICByZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpXG4gIH1cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZXIsIGZhbHNlKVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImN1c3RvbS1zaGFkZXItbWF0ZXJpYWxcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rbHRqc19mb3VydGhcIl0gPSBzZWxmW1wid2VicGFja0NodW5rbHRqc19mb3VydGhcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2J1aWxkX3RocmVlX21vZHVsZV9qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX2NvbnRyb2xzX09yYml0Q29udHJvbHNfanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX2xpbC1ndWlfZGlzdF9saWwtZ3VpX2VzbV9qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWUtY3VzdG9tLXNoYWRlci1tYXRlcmlhbF92YW5pbGxhX2pzXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTQvY3VzdG9tLXNoYWRlci1tYXRlcmlhbC5qc1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
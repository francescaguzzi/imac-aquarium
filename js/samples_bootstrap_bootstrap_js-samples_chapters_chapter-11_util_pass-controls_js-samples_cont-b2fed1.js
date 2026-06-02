"use strict";
(self["webpackChunkltjs_fourth"] = self["webpackChunkltjs_fourth"] || []).push([["samples_bootstrap_bootstrap_js-samples_chapters_chapter-11_util_pass-controls_js-samples_cont-b2fed1"],{

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

/***/ "./samples/chapters/chapter-11/util/pass-controls.js"
/*!***********************************************************!*\
  !*** ./samples/chapters/chapter-11/util/pass-controls.js ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addBloomPassControls: () => (/* binding */ addBloomPassControls),
/* harmony export */   addGlitchPassControls: () => (/* binding */ addGlitchPassControls),
/* harmony export */   addHalftonePassControls: () => (/* binding */ addHalftonePassControls),
/* harmony export */   addOutlinePassControls: () => (/* binding */ addOutlinePassControls),
/* harmony export */   addShaderControl: () => (/* binding */ addShaderControl),
/* harmony export */   addUnrealBloomPassControls: () => (/* binding */ addUnrealBloomPassControls)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_postprocessing_BloomPass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/postprocessing/BloomPass */ "./node_modules/three/examples/jsm/postprocessing/BloomPass.js");
/* harmony import */ var three_examples_jsm_postprocessing_GlitchPass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/postprocessing/GlitchPass */ "./node_modules/three/examples/jsm/postprocessing/GlitchPass.js");
/* harmony import */ var three_examples_jsm_postprocessing_HalftonePass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/jsm/postprocessing/HalftonePass */ "./node_modules/three/examples/jsm/postprocessing/HalftonePass.js");
/* harmony import */ var three_examples_jsm_postprocessing_UnrealBloomPass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three/examples/jsm/postprocessing/UnrealBloomPass */ "./node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js");






const addBloomPassControls = (gui, controls, callback) => {
  controls.strength = 3
  controls.kernelSize = 25
  controls.sigma = 5.0
  controls.resolution = 256

  controls.updateBloomPass = () => {
    const bloomPass = new three_examples_jsm_postprocessing_BloomPass__WEBPACK_IMPORTED_MODULE_1__.BloomPass(controls.strength, controls.kernelSize, controls.sigma, controls.resolution)
    callback(bloomPass)
  }

  const bloomFolder = gui.addFolder('BloomPass')
  bloomFolder.add(controls, 'strength', 0, 5, 0.01).onChange(controls.updateBloomPass)
  bloomFolder.add(controls, 'kernelSize', 10, 100, 1).onChange(controls.updateBloomPass)
  bloomFolder.add(controls, 'sigma', 1, 8, 0.1).onChange(controls.updateBloomPass)
  bloomFolder.add(controls, 'resolution', 100, 256, 10).onChange(controls.updateBloomPass)
}

const addGlitchPassControls = (gui, controls, callback) => {
  controls.dtsize = 64
  const gpFolder = gui.addFolder('GlitchPass')
  gpFolder.add(controls, 'dtsize', 0, 1024).onChange(function (e) {
    callback(new three_examples_jsm_postprocessing_GlitchPass__WEBPACK_IMPORTED_MODULE_2__.GlitchPass(e))
  })
}

const addHalftonePassControls = (gui, controls, callback) => {
  controls.shape = 1
  controls.radius = 4
  controls.rotateR = (Math.PI / 12) * 1
  controls.rotateG = (Math.PI / 12) * 2
  controls.rotateB = (Math.PI / 12) * 2
  controls.scatter = 0
  controls.blending = 0.4
  controls.blendingMode = 1
  controls.greyscale = false

  const applyParams = () => {
    const newPass = new three_examples_jsm_postprocessing_HalftonePass__WEBPACK_IMPORTED_MODULE_3__.HalftonePass(controls.width, controls.height, controls)
    callback(newPass)
  }

  const htFolder = gui.addFolder('HalfTonePass')
  htFolder.add(controls, 'shape', { dot: 1, ellipse: 2, line: 3, square: 4 }).onChange(applyParams)
  htFolder.add(controls, 'radius', 0, 40, 0.1).onChange(applyParams)
  htFolder.add(controls, 'rotateR', 0, Math.PI * 2, 0.1).onChange(applyParams)
  htFolder.add(controls, 'rotateG', 0, Math.PI * 2, 0.1).onChange(applyParams)
  htFolder.add(controls, 'rotateB', 0, Math.PI * 2, 0.1).onChange(applyParams)
  htFolder.add(controls, 'scatter', 0, 2, 0.1).onChange(applyParams)
  htFolder.add(controls, 'blending', 0, 2, 0.01).onChange(applyParams)
  htFolder
    .add(controls, 'blendingMode', { linear: 1, multiply: 2, add: 3, lighter: 4, darker: 5 })
    .onChange(applyParams)
  htFolder.add(controls, 'greyscale').onChange(applyParams)
}

const addOutlinePassControls = (gui, controls, outlinePass) => {
  controls.edgeStrength = 3.0
  controls.edgeGlow = 0.0
  controls.edgeThickness = 1.0
  controls.pulsePeriod = 0
  controls.usePatternTexture = false

  var folder = gui.addFolder('OutlinePass')
  folder.add(controls, 'edgeStrength', 0.01, 10).onChange(function (value) {
    outlinePass.edgeStrength = Number(value)
  })
  folder.add(controls, 'edgeGlow', 0.0, 1).onChange(function (value) {
    outlinePass.edgeGlow = Number(value)
  })
  folder.add(controls, 'edgeThickness', 1, 4).onChange(function (value) {
    outlinePass.edgeThickness = Number(value)
  })
  folder.add(controls, 'pulsePeriod', 0.0, 5).onChange(function (value) {
    outlinePass.pulsePeriod = Number(value)
  })

  var colors = {
    visibleEdgeColor: '#ffffff',
    hiddenEdgeColor: '#190a05'
  }

  folder.addColor(colors, 'visibleEdgeColor').onChange(function (value) {
    outlinePass.visibleEdgeColor.set(value)
  })
  folder.addColor(colors, 'hiddenEdgeColor').onChange(function (value) {
    outlinePass.hiddenEdgeColor.set(value)
  })
}

const addUnrealBloomPassControls = (gui, controls, callback) => {
  controls.resolution = 256
  controls.strength = 0.5
  controls.radius = 0.1
  controls.threshold = 0.1

  function newBloom() {
    var newPass = new three_examples_jsm_postprocessing_UnrealBloomPass__WEBPACK_IMPORTED_MODULE_4__.UnrealBloomPass(
      new three__WEBPACK_IMPORTED_MODULE_0__.Vector2(controls.resolution, controls.resolution),
      controls.strength,
      controls.radius,
      controls.threshold
    )
    callback(newPass)
  }

  var folder = gui.addFolder('UnrealBloom')
  folder.add(controls, 'resolution', 2, 1024, 2).onChange(newBloom)
  folder.add(controls, 'strength', 0, 1, 0.01).onChange(newBloom)
  folder.add(controls, 'radius', 0, 10, 0.01).onChange(newBloom)
  folder.add(controls, 'threshold', 0, 0.2, 0.01).onChange(newBloom)
}

const addShaderControl = (gui, folderName, shaderPass, toSet, enabled) => {
  function uniformOrDefault(uniforms, key, def) {
    return uniforms[key].value !== undefined && uniforms[key].value !== null ? uniforms[key].value : def
  }

  function addUniformBool(folder, key, shader) {
    var localControls = {}
    localControls[key] = uniformOrDefault(shader.uniforms, key, 0)
    folder.add(localControls, key).onChange(function (v) {
      shader.uniforms[key].value = v
    })
  }

  function addUniformFloat(folder, key, from, to, step, shader) {
    var localControls = {}
    localControls[key] = uniformOrDefault(shader.uniforms, key, 0)
    folder.add(localControls, key, from, to, step).onChange(function (v) {
      shader.uniforms[key].value = v
    })
  }

  function addUniformColor(folder, key, shader) {
    var localControls = {}
    localControls[key] = uniformOrDefault(shader.uniforms, key, new three__WEBPACK_IMPORTED_MODULE_0__.Color(0xffffff))
    folder.addColor(localControls, key).onChange(function (value) {
      shader.uniforms[key].value = new three__WEBPACK_IMPORTED_MODULE_0__.Color().setRGB(value.r, value.g, value.b)
    })
  }

  function addUniformVector3(folder, key, shader, from, to, step) {
    var startValue = uniformOrDefault(shader.uniforms, key, new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, 0))
    var keyX = key + '_x'
    var keyY = key + '_y'
    var keyZ = key + '_z'

    var localControls = {}
    localControls[keyX] = startValue.x
    localControls[keyY] = startValue.y
    localControls[keyZ] = startValue.z

    folder.add(localControls, keyX, from.x, to.x, step.x).onChange(function (v) {
      shader.uniforms[key].value.x = v
    })
    folder.add(localControls, keyY, from.x, to.x, step.x).onChange(function (v) {
      shader.uniforms[key].value.y = v
    })
    folder.add(localControls, keyZ, from.x, to.x, step.x).onChange(function (v) {
      shader.uniforms[key].value.z = v
    })
  }

  function addUniformVector2(folder, key, shader, from, to, step) {
    var startValue = uniformOrDefault(shader.uniforms, key, new three__WEBPACK_IMPORTED_MODULE_0__.Vector2(0.0, 0.0))
    shader.uniforms[key].value = startValue

    var keyX = key + '_x'
    var keyY = key + '_y'

    var localControls = {}
    localControls[keyX] = startValue.x
    localControls[keyY] = startValue.y

    folder.add(localControls, keyX, from.x, to.x, step.x).onChange(function (v) {
      shader.uniforms[key].value.x = v
    })
    folder.add(localControls, keyY, from.x, to.x, step.x).onChange(function (v) {
      shader.uniforms[key].value.y = v
    })
  }

  // create the folder and set enabled
  var folder = gui.addFolder(folderName)
  if (toSet.setEnabled !== undefined ? toSet.setEnabled : true) {
    shaderPass.enabled = enabled !== undefined ? enabled : false
    folder.add(shaderPass, 'enabled')
  }

  if (toSet.floats !== undefined) {
    toSet.floats.forEach(function (p) {
      var from = p.from !== undefined ? p.from : 0
      var to = p.from !== undefined ? p.to : 1
      var step = p.from !== undefined ? p.step : 0.01
      addUniformFloat(folder, p.key, from, to, step, shaderPass)
    })
  }

  if (toSet.colors !== undefined) {
    toSet.colors.forEach(function (p) {
      console.log('Sfdsd')
      addUniformColor(folder, p.key, shaderPass)
    })
  }

  if (toSet.vector3 !== undefined) {
    toSet.vector3.forEach(function (p) {
      addUniformVector3(folder, p.key, shaderPass, p.from, p.to, p.step)
    })
  }

  if (toSet.vector2 !== undefined) {
    toSet.vector2.forEach(function (p) {
      addUniformVector2(folder, p.key, shaderPass, p.from, p.to, p.step)
    })
  }

  if (toSet.booleans !== undefined) {
    toSet.booleans.forEach(function (p) {
      addUniformBool(folder, p.key, shaderPass)
    })
  }
}


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

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvc2FtcGxlc19ib290c3RyYXBfYm9vdHN0cmFwX2pzLXNhbXBsZXNfY2hhcHRlcnNfY2hhcHRlci0xMV91dGlsX3Bhc3MtY29udHJvbHNfanMtc2FtcGxlc19jb250LWIyZmVkMS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUE4QjtBQUNvQztBQUN6QjtBQUNVOztBQUU1QyxxQkFBcUIsa0ZBQWtGO0FBQzlHO0FBQ0E7QUFDQSxzQkFBc0Isd0NBQVc7QUFDakM7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0JBQXNCLHNDQUFTO0FBQy9COztBQUVBO0FBQ0EsdUJBQXVCLG9EQUF1QjtBQUM5Qyx5QkFBeUIsZ0RBQW1CLEdBQUcsaUJBQWlCO0FBQ2hFLDhCQUE4QiwrQ0FBa0I7QUFDaEQ7QUFDQSw4QkFBOEIsK0NBQWtCO0FBQ2hEOztBQUVBLElBQUksaUVBQVE7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiwrRUFBaUI7QUFDdkM7O0FBRUE7QUFDQTtBQUNBLE1BQU0sdURBQVksVUFBVSxnQkFBZ0I7QUFDNUM7O0FBRUEsU0FBUyx3Q0FBd0M7QUFDakQ7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzVDOEI7O0FBRXZCLCtCQUErQixnQkFBZ0I7QUFDdEQ7QUFDQSxnQkFBZ0IsK0NBQWtCOztBQUVsQztBQUNBLHVCQUF1QixtREFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZCOEI7QUFDeUM7QUFDRTtBQUNJO0FBQ007O0FBRTVFO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEIsa0ZBQVM7QUFDbkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsb0ZBQVU7QUFDM0IsR0FBRztBQUNIOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCLHdGQUFZO0FBQ3BDO0FBQ0E7O0FBRUE7QUFDQSxvQ0FBb0Msd0NBQXdDO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHVEQUF1RDtBQUM1RjtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsOEZBQWU7QUFDckMsVUFBVSwwQ0FBYTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0Esb0VBQW9FLHdDQUFXO0FBQy9FO0FBQ0EsdUNBQXVDLHdDQUFXO0FBQ2xELEtBQUs7QUFDTDs7QUFFQTtBQUNBLGdFQUFnRSwwQ0FBYTtBQUM3RTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxnRUFBZ0UsMENBQWE7QUFDN0U7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3JPeUU7O0FBRWxFO0FBQ1AseUJBQXlCLG9GQUFhO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDWitCOztBQUUvQjtBQUNBO0FBQ0EsVUFBVSxnREFBbUI7QUFDN0IsWUFBWSxvREFBdUI7QUFDbkMsY0FBYyxzREFBeUI7QUFDdkMsWUFBWSxvREFBdUI7QUFDbkMsZ0JBQWdCLHdEQUEyQjtBQUMzQyxZQUFZLG9EQUF1QjtBQUNuQyxHQUFHO0FBQ0g7QUFDQSxXQUFXLGlEQUFvQjtBQUMvQixVQUFVLCtDQUFrQjtBQUM1QixhQUFhLG1EQUFzQjtBQUNuQyxTQUFTLCtDQUFrQjtBQUMzQixHQUFHO0FBQ0g7QUFDQSxZQUFZLGlEQUFvQjtBQUNoQyxVQUFVLCtDQUFrQjtBQUM1QixHQUFHO0FBQ0g7O0FBRUE7QUFDQSwrQkFBK0Isd0NBQVc7QUFDMUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjs7QUFFcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxRzhCOztBQUU5QiwwQkFBMEIsZ0RBQW1COztBQUU3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSLHFDQUFxQyxxREFBd0I7QUFDN0Q7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsMkJBQTJCLG1FQUFzQztBQUNqRTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFTTtBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlCQUF5Qix3Q0FBVztBQUNwQyxvQkFBb0Isc0NBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLHdDQUFXO0FBQ3hDO0FBQ0E7QUFDQSw2QkFBNkIsd0NBQVc7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qix3Q0FBVztBQUN4QztBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsK0NBQWtCO0FBQzVDO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLG1FQUFzQztBQUMvRDtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNqR087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9ib290c3RyYXAvYm9vdHN0cmFwLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9ib290c3RyYXAvbGlnaHRpbmcuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItMTEvdXRpbC9wYXNzLWNvbnRyb2xzLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jb250cm9sbGVyL29yYml0LWNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NvbnRyb2xzL3JlbmRlcmVyLWNvbnRyb2wuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NvbnRyb2xzL3NjZW5lLWNvbnRyb2xzLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy91dGlsL3VwZGF0ZS1vbi1yZXNpemUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5pbXBvcnQgeyBpbml0T3JiaXRDb250cm9scyB9IGZyb20gJy4uL2NvbnRyb2xsZXIvb3JiaXQtY29udHJvbGxlcidcbmltcG9ydCB7IGluaXRMaWdodGluZyB9IGZyb20gJy4vbGlnaHRpbmcnXG5pbXBvcnQgeyBvblJlc2l6ZSB9IGZyb20gJy4uL3V0aWwvdXBkYXRlLW9uLXJlc2l6ZSdcblxuZXhwb3J0IGNvbnN0IGluaXRTY2VuZSA9ICh7IGJhY2tncm91bmRDb2xvciwgZm9nQ29sb3IsIGRpc2FibGVTaGFkb3dzLCBkaXNhYmxlTGlnaHRzLCBkaXNhYmxlRGVmYXVsdENvbnRyb2xzIH0pID0+IHtcbiAgY29uc3QgaW5pdCA9IChmbikgPT4ge1xuICAgIC8vIGJhc2ljIHNjZW5lIHNldHVwXG4gICAgY29uc3Qgc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKVxuICAgIGlmIChiYWNrZ3JvdW5kQ29sb3IpIHtcbiAgICAgIHNjZW5lLmJhY2tncm91bmRDb2xvciA9IGJhY2tncm91bmRDb2xvclxuICAgIH1cblxuICAgIGlmIChmb2dDb2xvcikge1xuICAgICAgc2NlbmUuZm9nID0gbmV3IFRIUkVFLkZvZyhmb2dDb2xvciwgMC4wMDI1LCA1MClcbiAgICB9XG5cbiAgICAvLyBzZXR1cCBjYW1lcmEgYW5kIGJhc2ljIHJlbmRlcmVyXG4gICAgY29uc3QgY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKDc1LCB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodCwgMC4xLCAxMDAwKVxuICAgIGNvbnN0IHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoeyBhbnRpYWxpYXM6IHRydWUgfSlcbiAgICByZW5kZXJlci5vdXRwdXRFbmNvZGluZyA9IFRIUkVFLnNSR0JFbmNvZGluZ1xuICAgIHJlbmRlcmVyLnNoYWRvd01hcC5lbmFibGVkID0gdHJ1ZVxuICAgIHJlbmRlcmVyLnNoYWRvd01hcC50eXBlID0gVEhSRUUuVlNNU2hhZG93TWFwXG4gICAgcmVuZGVyZXIuc2V0Q2xlYXJDb2xvcihiYWNrZ3JvdW5kQ29sb3IpXG5cbiAgICBvblJlc2l6ZShjYW1lcmEsIHJlbmRlcmVyKVxuICAgIHJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodClcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHJlbmRlcmVyLmRvbUVsZW1lbnQpXG5cbiAgICAvLyBpbml0aWFsaXplIG9yYml0IGNvbnRyb2xzXG4gICAgbGV0IG9yYml0Q29udHJvbHNcbiAgICBpZiAoIWRpc2FibGVEZWZhdWx0Q29udHJvbHMpIHtcbiAgICAgIG9yYml0Q29udHJvbHMgPSBpbml0T3JiaXRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyKVxuICAgIH1cblxuICAgIC8vIGFkZCBzb21lIGJhc2ljIGxpZ2h0aW5nIHRvIHRoZSBzY2VuZVxuICAgIGlmICghZGlzYWJsZUxpZ2h0cyA/PyBmYWxzZSkge1xuICAgICAgaW5pdExpZ2h0aW5nKHNjZW5lLCB7IGRpc2FibGVTaGFkb3dzIH0pXG4gICAgfVxuXG4gICAgZm4oeyBzY2VuZSwgY2FtZXJhLCByZW5kZXJlciwgb3JiaXRDb250cm9scyB9KVxuICB9XG5cbiAgcmV0dXJuIGluaXRcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuXG5leHBvcnQgY29uc3QgaW5pdExpZ2h0aW5nID0gKHNjZW5lLCB7IGRpc2FibGVTaGFkb3dzIH0pID0+IHtcbiAgLy8gaHR0cHM6Ly90aHJlZWpzLm9yZy9leGFtcGxlcy8/cT1zaGFkbyN3ZWJnbF9zaGFkb3dtYXBfdnNtXG4gIHNjZW5lLmFkZChuZXcgVEhSRUUuQW1iaWVudExpZ2h0KDB4NjY2NjY2KSlcblxuICAvLyBjb25zdCBkaXJMaWdodCA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4YWFhYWFhKVxuICBjb25zdCBkaXJMaWdodCA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4YWFhYWFhKVxuICBkaXJMaWdodC5wb3NpdGlvbi5zZXQoNSwgMTIsIDgpXG4gIGRpckxpZ2h0LmNhc3RTaGFkb3cgPSAhZGlzYWJsZVNoYWRvd3MgPyB0cnVlIDogZmFsc2VcbiAgZGlyTGlnaHQuaW50ZW5zaXR5ID0gMVxuICBkaXJMaWdodC5zaGFkb3cuY2FtZXJhLm5lYXIgPSAwLjFcbiAgZGlyTGlnaHQuc2hhZG93LmNhbWVyYS5mYXIgPSAyMDBcbiAgZGlyTGlnaHQuc2hhZG93LmNhbWVyYS5yaWdodCA9IDEwXG4gIGRpckxpZ2h0LnNoYWRvdy5jYW1lcmEubGVmdCA9IC0xMFxuICBkaXJMaWdodC5zaGFkb3cuY2FtZXJhLnRvcCA9IDEwXG4gIGRpckxpZ2h0LnNoYWRvdy5jYW1lcmEuYm90dG9tID0gLTEwXG4gIGRpckxpZ2h0LnNoYWRvdy5tYXBTaXplLndpZHRoID0gMjA0OFxuICBkaXJMaWdodC5zaGFkb3cubWFwU2l6ZS5oZWlnaHQgPSAyMDQ4XG4gIGRpckxpZ2h0LnNoYWRvdy5yYWRpdXMgPSA0XG4gIGRpckxpZ2h0LnNoYWRvdy5iaWFzID0gLTAuMDAwMDVcblxuICBzY2VuZS5hZGQoZGlyTGlnaHQpXG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcbmltcG9ydCB7IEJsb29tUGFzcyB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9wb3N0cHJvY2Vzc2luZy9CbG9vbVBhc3MnXG5pbXBvcnQgeyBHbGl0Y2hQYXNzIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL3Bvc3Rwcm9jZXNzaW5nL0dsaXRjaFBhc3MnXG5pbXBvcnQgeyBIYWxmdG9uZVBhc3MgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vcG9zdHByb2Nlc3NpbmcvSGFsZnRvbmVQYXNzJ1xuaW1wb3J0IHsgVW5yZWFsQmxvb21QYXNzIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL3Bvc3Rwcm9jZXNzaW5nL1VucmVhbEJsb29tUGFzcydcblxuZXhwb3J0IGNvbnN0IGFkZEJsb29tUGFzc0NvbnRyb2xzID0gKGd1aSwgY29udHJvbHMsIGNhbGxiYWNrKSA9PiB7XG4gIGNvbnRyb2xzLnN0cmVuZ3RoID0gM1xuICBjb250cm9scy5rZXJuZWxTaXplID0gMjVcbiAgY29udHJvbHMuc2lnbWEgPSA1LjBcbiAgY29udHJvbHMucmVzb2x1dGlvbiA9IDI1NlxuXG4gIGNvbnRyb2xzLnVwZGF0ZUJsb29tUGFzcyA9ICgpID0+IHtcbiAgICBjb25zdCBibG9vbVBhc3MgPSBuZXcgQmxvb21QYXNzKGNvbnRyb2xzLnN0cmVuZ3RoLCBjb250cm9scy5rZXJuZWxTaXplLCBjb250cm9scy5zaWdtYSwgY29udHJvbHMucmVzb2x1dGlvbilcbiAgICBjYWxsYmFjayhibG9vbVBhc3MpXG4gIH1cblxuICBjb25zdCBibG9vbUZvbGRlciA9IGd1aS5hZGRGb2xkZXIoJ0Jsb29tUGFzcycpXG4gIGJsb29tRm9sZGVyLmFkZChjb250cm9scywgJ3N0cmVuZ3RoJywgMCwgNSwgMC4wMSkub25DaGFuZ2UoY29udHJvbHMudXBkYXRlQmxvb21QYXNzKVxuICBibG9vbUZvbGRlci5hZGQoY29udHJvbHMsICdrZXJuZWxTaXplJywgMTAsIDEwMCwgMSkub25DaGFuZ2UoY29udHJvbHMudXBkYXRlQmxvb21QYXNzKVxuICBibG9vbUZvbGRlci5hZGQoY29udHJvbHMsICdzaWdtYScsIDEsIDgsIDAuMSkub25DaGFuZ2UoY29udHJvbHMudXBkYXRlQmxvb21QYXNzKVxuICBibG9vbUZvbGRlci5hZGQoY29udHJvbHMsICdyZXNvbHV0aW9uJywgMTAwLCAyNTYsIDEwKS5vbkNoYW5nZShjb250cm9scy51cGRhdGVCbG9vbVBhc3MpXG59XG5cbmV4cG9ydCBjb25zdCBhZGRHbGl0Y2hQYXNzQ29udHJvbHMgPSAoZ3VpLCBjb250cm9scywgY2FsbGJhY2spID0+IHtcbiAgY29udHJvbHMuZHRzaXplID0gNjRcbiAgY29uc3QgZ3BGb2xkZXIgPSBndWkuYWRkRm9sZGVyKCdHbGl0Y2hQYXNzJylcbiAgZ3BGb2xkZXIuYWRkKGNvbnRyb2xzLCAnZHRzaXplJywgMCwgMTAyNCkub25DaGFuZ2UoZnVuY3Rpb24gKGUpIHtcbiAgICBjYWxsYmFjayhuZXcgR2xpdGNoUGFzcyhlKSlcbiAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IGFkZEhhbGZ0b25lUGFzc0NvbnRyb2xzID0gKGd1aSwgY29udHJvbHMsIGNhbGxiYWNrKSA9PiB7XG4gIGNvbnRyb2xzLnNoYXBlID0gMVxuICBjb250cm9scy5yYWRpdXMgPSA0XG4gIGNvbnRyb2xzLnJvdGF0ZVIgPSAoTWF0aC5QSSAvIDEyKSAqIDFcbiAgY29udHJvbHMucm90YXRlRyA9IChNYXRoLlBJIC8gMTIpICogMlxuICBjb250cm9scy5yb3RhdGVCID0gKE1hdGguUEkgLyAxMikgKiAyXG4gIGNvbnRyb2xzLnNjYXR0ZXIgPSAwXG4gIGNvbnRyb2xzLmJsZW5kaW5nID0gMC40XG4gIGNvbnRyb2xzLmJsZW5kaW5nTW9kZSA9IDFcbiAgY29udHJvbHMuZ3JleXNjYWxlID0gZmFsc2VcblxuICBjb25zdCBhcHBseVBhcmFtcyA9ICgpID0+IHtcbiAgICBjb25zdCBuZXdQYXNzID0gbmV3IEhhbGZ0b25lUGFzcyhjb250cm9scy53aWR0aCwgY29udHJvbHMuaGVpZ2h0LCBjb250cm9scylcbiAgICBjYWxsYmFjayhuZXdQYXNzKVxuICB9XG5cbiAgY29uc3QgaHRGb2xkZXIgPSBndWkuYWRkRm9sZGVyKCdIYWxmVG9uZVBhc3MnKVxuICBodEZvbGRlci5hZGQoY29udHJvbHMsICdzaGFwZScsIHsgZG90OiAxLCBlbGxpcHNlOiAyLCBsaW5lOiAzLCBzcXVhcmU6IDQgfSkub25DaGFuZ2UoYXBwbHlQYXJhbXMpXG4gIGh0Rm9sZGVyLmFkZChjb250cm9scywgJ3JhZGl1cycsIDAsIDQwLCAwLjEpLm9uQ2hhbmdlKGFwcGx5UGFyYW1zKVxuICBodEZvbGRlci5hZGQoY29udHJvbHMsICdyb3RhdGVSJywgMCwgTWF0aC5QSSAqIDIsIDAuMSkub25DaGFuZ2UoYXBwbHlQYXJhbXMpXG4gIGh0Rm9sZGVyLmFkZChjb250cm9scywgJ3JvdGF0ZUcnLCAwLCBNYXRoLlBJICogMiwgMC4xKS5vbkNoYW5nZShhcHBseVBhcmFtcylcbiAgaHRGb2xkZXIuYWRkKGNvbnRyb2xzLCAncm90YXRlQicsIDAsIE1hdGguUEkgKiAyLCAwLjEpLm9uQ2hhbmdlKGFwcGx5UGFyYW1zKVxuICBodEZvbGRlci5hZGQoY29udHJvbHMsICdzY2F0dGVyJywgMCwgMiwgMC4xKS5vbkNoYW5nZShhcHBseVBhcmFtcylcbiAgaHRGb2xkZXIuYWRkKGNvbnRyb2xzLCAnYmxlbmRpbmcnLCAwLCAyLCAwLjAxKS5vbkNoYW5nZShhcHBseVBhcmFtcylcbiAgaHRGb2xkZXJcbiAgICAuYWRkKGNvbnRyb2xzLCAnYmxlbmRpbmdNb2RlJywgeyBsaW5lYXI6IDEsIG11bHRpcGx5OiAyLCBhZGQ6IDMsIGxpZ2h0ZXI6IDQsIGRhcmtlcjogNSB9KVxuICAgIC5vbkNoYW5nZShhcHBseVBhcmFtcylcbiAgaHRGb2xkZXIuYWRkKGNvbnRyb2xzLCAnZ3JleXNjYWxlJykub25DaGFuZ2UoYXBwbHlQYXJhbXMpXG59XG5cbmV4cG9ydCBjb25zdCBhZGRPdXRsaW5lUGFzc0NvbnRyb2xzID0gKGd1aSwgY29udHJvbHMsIG91dGxpbmVQYXNzKSA9PiB7XG4gIGNvbnRyb2xzLmVkZ2VTdHJlbmd0aCA9IDMuMFxuICBjb250cm9scy5lZGdlR2xvdyA9IDAuMFxuICBjb250cm9scy5lZGdlVGhpY2tuZXNzID0gMS4wXG4gIGNvbnRyb2xzLnB1bHNlUGVyaW9kID0gMFxuICBjb250cm9scy51c2VQYXR0ZXJuVGV4dHVyZSA9IGZhbHNlXG5cbiAgdmFyIGZvbGRlciA9IGd1aS5hZGRGb2xkZXIoJ091dGxpbmVQYXNzJylcbiAgZm9sZGVyLmFkZChjb250cm9scywgJ2VkZ2VTdHJlbmd0aCcsIDAuMDEsIDEwKS5vbkNoYW5nZShmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBvdXRsaW5lUGFzcy5lZGdlU3RyZW5ndGggPSBOdW1iZXIodmFsdWUpXG4gIH0pXG4gIGZvbGRlci5hZGQoY29udHJvbHMsICdlZGdlR2xvdycsIDAuMCwgMSkub25DaGFuZ2UoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgb3V0bGluZVBhc3MuZWRnZUdsb3cgPSBOdW1iZXIodmFsdWUpXG4gIH0pXG4gIGZvbGRlci5hZGQoY29udHJvbHMsICdlZGdlVGhpY2tuZXNzJywgMSwgNCkub25DaGFuZ2UoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgb3V0bGluZVBhc3MuZWRnZVRoaWNrbmVzcyA9IE51bWJlcih2YWx1ZSlcbiAgfSlcbiAgZm9sZGVyLmFkZChjb250cm9scywgJ3B1bHNlUGVyaW9kJywgMC4wLCA1KS5vbkNoYW5nZShmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBvdXRsaW5lUGFzcy5wdWxzZVBlcmlvZCA9IE51bWJlcih2YWx1ZSlcbiAgfSlcblxuICB2YXIgY29sb3JzID0ge1xuICAgIHZpc2libGVFZGdlQ29sb3I6ICcjZmZmZmZmJyxcbiAgICBoaWRkZW5FZGdlQ29sb3I6ICcjMTkwYTA1J1xuICB9XG5cbiAgZm9sZGVyLmFkZENvbG9yKGNvbG9ycywgJ3Zpc2libGVFZGdlQ29sb3InKS5vbkNoYW5nZShmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBvdXRsaW5lUGFzcy52aXNpYmxlRWRnZUNvbG9yLnNldCh2YWx1ZSlcbiAgfSlcbiAgZm9sZGVyLmFkZENvbG9yKGNvbG9ycywgJ2hpZGRlbkVkZ2VDb2xvcicpLm9uQ2hhbmdlKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIG91dGxpbmVQYXNzLmhpZGRlbkVkZ2VDb2xvci5zZXQodmFsdWUpXG4gIH0pXG59XG5cbmV4cG9ydCBjb25zdCBhZGRVbnJlYWxCbG9vbVBhc3NDb250cm9scyA9IChndWksIGNvbnRyb2xzLCBjYWxsYmFjaykgPT4ge1xuICBjb250cm9scy5yZXNvbHV0aW9uID0gMjU2XG4gIGNvbnRyb2xzLnN0cmVuZ3RoID0gMC41XG4gIGNvbnRyb2xzLnJhZGl1cyA9IDAuMVxuICBjb250cm9scy50aHJlc2hvbGQgPSAwLjFcblxuICBmdW5jdGlvbiBuZXdCbG9vbSgpIHtcbiAgICB2YXIgbmV3UGFzcyA9IG5ldyBVbnJlYWxCbG9vbVBhc3MoXG4gICAgICBuZXcgVEhSRUUuVmVjdG9yMihjb250cm9scy5yZXNvbHV0aW9uLCBjb250cm9scy5yZXNvbHV0aW9uKSxcbiAgICAgIGNvbnRyb2xzLnN0cmVuZ3RoLFxuICAgICAgY29udHJvbHMucmFkaXVzLFxuICAgICAgY29udHJvbHMudGhyZXNob2xkXG4gICAgKVxuICAgIGNhbGxiYWNrKG5ld1Bhc3MpXG4gIH1cblxuICB2YXIgZm9sZGVyID0gZ3VpLmFkZEZvbGRlcignVW5yZWFsQmxvb20nKVxuICBmb2xkZXIuYWRkKGNvbnRyb2xzLCAncmVzb2x1dGlvbicsIDIsIDEwMjQsIDIpLm9uQ2hhbmdlKG5ld0Jsb29tKVxuICBmb2xkZXIuYWRkKGNvbnRyb2xzLCAnc3RyZW5ndGgnLCAwLCAxLCAwLjAxKS5vbkNoYW5nZShuZXdCbG9vbSlcbiAgZm9sZGVyLmFkZChjb250cm9scywgJ3JhZGl1cycsIDAsIDEwLCAwLjAxKS5vbkNoYW5nZShuZXdCbG9vbSlcbiAgZm9sZGVyLmFkZChjb250cm9scywgJ3RocmVzaG9sZCcsIDAsIDAuMiwgMC4wMSkub25DaGFuZ2UobmV3Qmxvb20pXG59XG5cbmV4cG9ydCBjb25zdCBhZGRTaGFkZXJDb250cm9sID0gKGd1aSwgZm9sZGVyTmFtZSwgc2hhZGVyUGFzcywgdG9TZXQsIGVuYWJsZWQpID0+IHtcbiAgZnVuY3Rpb24gdW5pZm9ybU9yRGVmYXVsdCh1bmlmb3Jtcywga2V5LCBkZWYpIHtcbiAgICByZXR1cm4gdW5pZm9ybXNba2V5XS52YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHVuaWZvcm1zW2tleV0udmFsdWUgIT09IG51bGwgPyB1bmlmb3Jtc1trZXldLnZhbHVlIDogZGVmXG4gIH1cblxuICBmdW5jdGlvbiBhZGRVbmlmb3JtQm9vbChmb2xkZXIsIGtleSwgc2hhZGVyKSB7XG4gICAgdmFyIGxvY2FsQ29udHJvbHMgPSB7fVxuICAgIGxvY2FsQ29udHJvbHNba2V5XSA9IHVuaWZvcm1PckRlZmF1bHQoc2hhZGVyLnVuaWZvcm1zLCBrZXksIDApXG4gICAgZm9sZGVyLmFkZChsb2NhbENvbnRyb2xzLCBrZXkpLm9uQ2hhbmdlKGZ1bmN0aW9uICh2KSB7XG4gICAgICBzaGFkZXIudW5pZm9ybXNba2V5XS52YWx1ZSA9IHZcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkVW5pZm9ybUZsb2F0KGZvbGRlciwga2V5LCBmcm9tLCB0bywgc3RlcCwgc2hhZGVyKSB7XG4gICAgdmFyIGxvY2FsQ29udHJvbHMgPSB7fVxuICAgIGxvY2FsQ29udHJvbHNba2V5XSA9IHVuaWZvcm1PckRlZmF1bHQoc2hhZGVyLnVuaWZvcm1zLCBrZXksIDApXG4gICAgZm9sZGVyLmFkZChsb2NhbENvbnRyb2xzLCBrZXksIGZyb20sIHRvLCBzdGVwKS5vbkNoYW5nZShmdW5jdGlvbiAodikge1xuICAgICAgc2hhZGVyLnVuaWZvcm1zW2tleV0udmFsdWUgPSB2XG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFVuaWZvcm1Db2xvcihmb2xkZXIsIGtleSwgc2hhZGVyKSB7XG4gICAgdmFyIGxvY2FsQ29udHJvbHMgPSB7fVxuICAgIGxvY2FsQ29udHJvbHNba2V5XSA9IHVuaWZvcm1PckRlZmF1bHQoc2hhZGVyLnVuaWZvcm1zLCBrZXksIG5ldyBUSFJFRS5Db2xvcigweGZmZmZmZikpXG4gICAgZm9sZGVyLmFkZENvbG9yKGxvY2FsQ29udHJvbHMsIGtleSkub25DaGFuZ2UoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBzaGFkZXIudW5pZm9ybXNba2V5XS52YWx1ZSA9IG5ldyBUSFJFRS5Db2xvcigpLnNldFJHQih2YWx1ZS5yLCB2YWx1ZS5nLCB2YWx1ZS5iKVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBhZGRVbmlmb3JtVmVjdG9yMyhmb2xkZXIsIGtleSwgc2hhZGVyLCBmcm9tLCB0bywgc3RlcCkge1xuICAgIHZhciBzdGFydFZhbHVlID0gdW5pZm9ybU9yRGVmYXVsdChzaGFkZXIudW5pZm9ybXMsIGtleSwgbmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMCkpXG4gICAgdmFyIGtleVggPSBrZXkgKyAnX3gnXG4gICAgdmFyIGtleVkgPSBrZXkgKyAnX3knXG4gICAgdmFyIGtleVogPSBrZXkgKyAnX3onXG5cbiAgICB2YXIgbG9jYWxDb250cm9scyA9IHt9XG4gICAgbG9jYWxDb250cm9sc1trZXlYXSA9IHN0YXJ0VmFsdWUueFxuICAgIGxvY2FsQ29udHJvbHNba2V5WV0gPSBzdGFydFZhbHVlLnlcbiAgICBsb2NhbENvbnRyb2xzW2tleVpdID0gc3RhcnRWYWx1ZS56XG5cbiAgICBmb2xkZXIuYWRkKGxvY2FsQ29udHJvbHMsIGtleVgsIGZyb20ueCwgdG8ueCwgc3RlcC54KS5vbkNoYW5nZShmdW5jdGlvbiAodikge1xuICAgICAgc2hhZGVyLnVuaWZvcm1zW2tleV0udmFsdWUueCA9IHZcbiAgICB9KVxuICAgIGZvbGRlci5hZGQobG9jYWxDb250cm9scywga2V5WSwgZnJvbS54LCB0by54LCBzdGVwLngpLm9uQ2hhbmdlKGZ1bmN0aW9uICh2KSB7XG4gICAgICBzaGFkZXIudW5pZm9ybXNba2V5XS52YWx1ZS55ID0gdlxuICAgIH0pXG4gICAgZm9sZGVyLmFkZChsb2NhbENvbnRyb2xzLCBrZXlaLCBmcm9tLngsIHRvLngsIHN0ZXAueCkub25DaGFuZ2UoZnVuY3Rpb24gKHYpIHtcbiAgICAgIHNoYWRlci51bmlmb3Jtc1trZXldLnZhbHVlLnogPSB2XG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFVuaWZvcm1WZWN0b3IyKGZvbGRlciwga2V5LCBzaGFkZXIsIGZyb20sIHRvLCBzdGVwKSB7XG4gICAgdmFyIHN0YXJ0VmFsdWUgPSB1bmlmb3JtT3JEZWZhdWx0KHNoYWRlci51bmlmb3Jtcywga2V5LCBuZXcgVEhSRUUuVmVjdG9yMigwLjAsIDAuMCkpXG4gICAgc2hhZGVyLnVuaWZvcm1zW2tleV0udmFsdWUgPSBzdGFydFZhbHVlXG5cbiAgICB2YXIga2V5WCA9IGtleSArICdfeCdcbiAgICB2YXIga2V5WSA9IGtleSArICdfeSdcblxuICAgIHZhciBsb2NhbENvbnRyb2xzID0ge31cbiAgICBsb2NhbENvbnRyb2xzW2tleVhdID0gc3RhcnRWYWx1ZS54XG4gICAgbG9jYWxDb250cm9sc1trZXlZXSA9IHN0YXJ0VmFsdWUueVxuXG4gICAgZm9sZGVyLmFkZChsb2NhbENvbnRyb2xzLCBrZXlYLCBmcm9tLngsIHRvLngsIHN0ZXAueCkub25DaGFuZ2UoZnVuY3Rpb24gKHYpIHtcbiAgICAgIHNoYWRlci51bmlmb3Jtc1trZXldLnZhbHVlLnggPSB2XG4gICAgfSlcbiAgICBmb2xkZXIuYWRkKGxvY2FsQ29udHJvbHMsIGtleVksIGZyb20ueCwgdG8ueCwgc3RlcC54KS5vbkNoYW5nZShmdW5jdGlvbiAodikge1xuICAgICAgc2hhZGVyLnVuaWZvcm1zW2tleV0udmFsdWUueSA9IHZcbiAgICB9KVxuICB9XG5cbiAgLy8gY3JlYXRlIHRoZSBmb2xkZXIgYW5kIHNldCBlbmFibGVkXG4gIHZhciBmb2xkZXIgPSBndWkuYWRkRm9sZGVyKGZvbGRlck5hbWUpXG4gIGlmICh0b1NldC5zZXRFbmFibGVkICE9PSB1bmRlZmluZWQgPyB0b1NldC5zZXRFbmFibGVkIDogdHJ1ZSkge1xuICAgIHNoYWRlclBhc3MuZW5hYmxlZCA9IGVuYWJsZWQgIT09IHVuZGVmaW5lZCA/IGVuYWJsZWQgOiBmYWxzZVxuICAgIGZvbGRlci5hZGQoc2hhZGVyUGFzcywgJ2VuYWJsZWQnKVxuICB9XG5cbiAgaWYgKHRvU2V0LmZsb2F0cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdG9TZXQuZmxvYXRzLmZvckVhY2goZnVuY3Rpb24gKHApIHtcbiAgICAgIHZhciBmcm9tID0gcC5mcm9tICE9PSB1bmRlZmluZWQgPyBwLmZyb20gOiAwXG4gICAgICB2YXIgdG8gPSBwLmZyb20gIT09IHVuZGVmaW5lZCA/IHAudG8gOiAxXG4gICAgICB2YXIgc3RlcCA9IHAuZnJvbSAhPT0gdW5kZWZpbmVkID8gcC5zdGVwIDogMC4wMVxuICAgICAgYWRkVW5pZm9ybUZsb2F0KGZvbGRlciwgcC5rZXksIGZyb20sIHRvLCBzdGVwLCBzaGFkZXJQYXNzKVxuICAgIH0pXG4gIH1cblxuICBpZiAodG9TZXQuY29sb3JzICE9PSB1bmRlZmluZWQpIHtcbiAgICB0b1NldC5jb2xvcnMuZm9yRWFjaChmdW5jdGlvbiAocCkge1xuICAgICAgY29uc29sZS5sb2coJ1NmZHNkJylcbiAgICAgIGFkZFVuaWZvcm1Db2xvcihmb2xkZXIsIHAua2V5LCBzaGFkZXJQYXNzKVxuICAgIH0pXG4gIH1cblxuICBpZiAodG9TZXQudmVjdG9yMyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdG9TZXQudmVjdG9yMy5mb3JFYWNoKGZ1bmN0aW9uIChwKSB7XG4gICAgICBhZGRVbmlmb3JtVmVjdG9yMyhmb2xkZXIsIHAua2V5LCBzaGFkZXJQYXNzLCBwLmZyb20sIHAudG8sIHAuc3RlcClcbiAgICB9KVxuICB9XG5cbiAgaWYgKHRvU2V0LnZlY3RvcjIgIT09IHVuZGVmaW5lZCkge1xuICAgIHRvU2V0LnZlY3RvcjIuZm9yRWFjaChmdW5jdGlvbiAocCkge1xuICAgICAgYWRkVW5pZm9ybVZlY3RvcjIoZm9sZGVyLCBwLmtleSwgc2hhZGVyUGFzcywgcC5mcm9tLCBwLnRvLCBwLnN0ZXApXG4gICAgfSlcbiAgfVxuXG4gIGlmICh0b1NldC5ib29sZWFucyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdG9TZXQuYm9vbGVhbnMuZm9yRWFjaChmdW5jdGlvbiAocCkge1xuICAgICAgYWRkVW5pZm9ybUJvb2woZm9sZGVyLCBwLmtleSwgc2hhZGVyUGFzcylcbiAgICB9KVxuICB9XG59XG4iLCJpbXBvcnQgeyBPcmJpdENvbnRyb2xzIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2NvbnRyb2xzL09yYml0Q29udHJvbHMnXG5cbmV4cG9ydCBjb25zdCBpbml0T3JiaXRDb250cm9scyA9IChjYW1lcmEsIHJlbmRlcmVyKSA9PiB7XG4gIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgT3JiaXRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLmRvbUVsZW1lbnQpXG4gIGNvbnRyb2xsZXIuZW5hYmxlRGFtcGluZyA9IHRydWVcbiAgY29udHJvbGxlci5kYW1waW5nRmFjdG9yID0gMC4wNVxuICBjb250cm9sbGVyLm1pbkRpc3RhbmNlID0gMVxuICBjb250cm9sbGVyLm1heERpc3RhbmNlID0gMTAwXG4gIGNvbnRyb2xsZXIubWluUG9sYXJBbmdsZSA9IE1hdGguUEkgLyA0XG4gIGNvbnRyb2xsZXIubWF4UG9sYXJBbmdsZSA9ICgzICogTWF0aC5QSSkgLyA0XG5cbiAgcmV0dXJuIGNvbnRyb2xsZXJcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuXG5jb25zdCBlbnVtcyA9IHtcbiAgdG9uZU1hcHBpbmdPcHRpb25zOiB7XG4gICAgTm9uZTogVEhSRUUuTm9Ub25lTWFwcGluZyxcbiAgICBMaW5lYXI6IFRIUkVFLkxpbmVhclRvbmVNYXBwaW5nLFxuICAgIFJlaW5oYXJkOiBUSFJFRS5SZWluaGFyZFRvbmVNYXBwaW5nLFxuICAgIENpbmVvbjogVEhSRUUuQ2luZW9uVG9uZU1hcHBpbmcsXG4gICAgQUNFU0ZpbG1pYzogVEhSRUUuQUNFU0ZpbG1pY1RvbmVNYXBwaW5nLFxuICAgIEN1c3RvbTogVEhSRUUuQ3VzdG9tVG9uZU1hcHBpbmcsXG4gIH0sXG4gIHNoYWRvd01hcHBpbmc6IHtcbiAgICBCYXNpYzogVEhSRUUuQmFzaWNTaGFkb3dNYXAsXG4gICAgUENGUzogVEhSRUUuUENGU2hhZG93TWFwLFxuICAgIFBDRlNvZnQ6IFRIUkVFLlBDRlNvZnRTaGFkb3dNYXAsXG4gICAgVlNNOiBUSFJFRS5WU01TaGFkb3dNYXAsXG4gIH0sXG4gIG91dHB1dEVuY29kaW5nczoge1xuICAgIExpbmVhcjogVEhSRUUuTGluZWFyRW5jb2RpbmcsXG4gICAgc1JHQjogVEhSRUUuc1JHQkVuY29kaW5nLFxuICB9LFxufTtcblxuY29uc3QgZ2V0UHJvcGVydHlIb2xkZXIgPSAod2ViR0xSZW5kZXJlcikgPT4ge1xuICBjb25zdCBjbGVhckNvbG9ySG9sZGVyID0gbmV3IFRIUkVFLkNvbG9yKCk7XG4gIHdlYkdMUmVuZGVyZXIuZ2V0Q2xlYXJDb2xvcihjbGVhckNvbG9ySG9sZGVyKTtcblxuICBjb25zdCBob2xkZXIgPSB7XG4gICAgbWFpbjoge1xuICAgICAgb3V0cHV0RW5jb2Rpbmc6IHdlYkdMUmVuZGVyZXIub3V0cHV0RW5jb2RpbmcsXG4gICAgfSxcbiAgICBzaGFkb3dNYXA6IHtcbiAgICAgIGVuYWJsZWQ6IHdlYkdMUmVuZGVyZXIuc2hhZG93TWFwLmVuYWJsZWQsXG4gICAgICBhdXRvVXBkYXRlOiB3ZWJHTFJlbmRlcmVyLnNoYWRvd01hcC5hdXRvVXBkYXRlLFxuICAgICAgbmVlZHNVcGRhdGU6ICgpID0+ICh3ZWJHTFJlbmRlcmVyLnNoYWRvd01hcC5uZWVkc1VwZGF0ZSA9IHRydWUpLFxuICAgICAgdHlwZTogd2ViR0xSZW5kZXJlci5zaGFkb3dNYXAudHlwZSxcbiAgICB9LFxuICAgIHRvbmVNYXBwaW5nOiB7XG4gICAgICBleHBvc3VyZTogd2ViR0xSZW5kZXJlci50b25lTWFwcGluZ0V4cG9zdXJlLFxuICAgICAgdG9uZU1hcHBpbmc6IHdlYkdMUmVuZGVyZXIudG9uZU1hcHBpbmcsXG4gICAgfSxcbiAgICBjbGVhclNldHRpbmdzOiB7XG4gICAgICBhdXRvQ2xlYXI6IHdlYkdMUmVuZGVyZXIuYXV0b0NsZWFyLFxuICAgICAgY2xlYXJDb2xvcjogY2xlYXJDb2xvckhvbGRlci5nZXRTdHlsZSgpLFxuICAgIH0sXG4gICAgYWR2YW5jZWQ6IHtcbiAgICAgIGF1dG9DbGVhckRlcHRoOiB3ZWJHTFJlbmRlcmVyLmF1dG9DbGVhckRlcHRoLFxuICAgICAgYXV0b0NsZWFyU3RlbmNpbDogd2ViR0xSZW5kZXJlci5hdXRvQ2xlYXJTdGVuY2lsLFxuICAgICAgY2hlY2tTaGFkZXJFcnJvcnM6IHdlYkdMUmVuZGVyZXIuZGVidWcuY2hlY2tTaGFkZXJFcnJvcnMsXG4gICAgICBzb3J0T2JqZWN0czogd2ViR0xSZW5kZXJlci5zb3J0T2JqZWN0cyxcbiAgICAgIGxvY2FsQ2xpcHBpbmdFbmFibGVkOiB3ZWJHTFJlbmRlcmVyLmxvY2FsQ2xpcHBpbmdFbmFibGVkLFxuICAgICAgcGh5c2ljYWxseUNvcnJlY3RMaWdodHM6IHdlYkdMUmVuZGVyZXIucGh5c2ljYWxseUNvcnJlY3RMaWdodHMsXG4gICAgfSxcbiAgfTtcblxuICByZXR1cm4gaG9sZGVyO1xufTtcblxuZXhwb3J0IGNvbnN0IGludGlhbGl6ZVJlbmRlcmVyQ29udHJvbHMgPSAoZ3VpLCB3ZWJHTFJlbmRlcmVyKSA9PiB7XG4gIGNvbnN0IHByb3BlcnRpZXNPYmplY3QgPSBnZXRQcm9wZXJ0eUhvbGRlcih3ZWJHTFJlbmRlcmVyKTtcbiAgY29uc3QgcmVuZGVyZXJGb2xkZXIgPSBndWkuYWRkRm9sZGVyKFwiV2ViR0xSZW5kZXJlclwiKTtcblxuICByZW5kZXJlckZvbGRlci5vbkNoYW5nZSgoXykgPT4ge1xuICAgIHVwZGF0ZVdlYkdMUmVuZGVyZXJQcm9wZXJ0aWVzKHdlYkdMUmVuZGVyZXIsIHByb3BlcnRpZXNPYmplY3QpO1xuICB9KTtcblxuICByZW5kZXJlckZvbGRlci5hZGQoXG4gICAgcHJvcGVydGllc09iamVjdC5tYWluLFxuICAgIFwib3V0cHV0RW5jb2RpbmdcIixcbiAgICBlbnVtcy5vdXRwdXRFbmNvZGluZ3NcbiAgKTtcblxuICBjb25zdCBzaGFkb3dGb2xkZXIgPSByZW5kZXJlckZvbGRlci5hZGRGb2xkZXIoXCJTaGFkb3dcIik7XG4gIHNoYWRvd0ZvbGRlci5hZGQocHJvcGVydGllc09iamVjdC5zaGFkb3dNYXAsIFwiZW5hYmxlZFwiKTtcbiAgc2hhZG93Rm9sZGVyLmFkZChwcm9wZXJ0aWVzT2JqZWN0LnNoYWRvd01hcCwgXCJhdXRvVXBkYXRlXCIpO1xuICBzaGFkb3dGb2xkZXIuYWRkKHByb3BlcnRpZXNPYmplY3Quc2hhZG93TWFwLCBcIm5lZWRzVXBkYXRlXCIpO1xuICBzaGFkb3dGb2xkZXJcbiAgICAuYWRkKHByb3BlcnRpZXNPYmplY3Quc2hhZG93TWFwLCBcInR5cGVcIiwgZW51bXMuc2hhZG93TWFwcGluZylcbiAgICAuZW5hYmxlKGZhbHNlKTsgLy8gY2FuJ3QgdXBkYXRlIHRoZSBzaGFkb3cgbWFwcGluZyB0eXBlIGluIHJ1bnRpbWVcblxuICBjb25zdCB0b25lTWFwcGluZ0ZvbGRlciA9IHJlbmRlcmVyRm9sZGVyLmFkZEZvbGRlcihcIlRvbmVNYXBwaW5nXCIpO1xuICB0b25lTWFwcGluZ0ZvbGRlci5hZGQocHJvcGVydGllc09iamVjdC50b25lTWFwcGluZywgXCJleHBvc3VyZVwiLCAwLCAyKTtcbiAgdG9uZU1hcHBpbmdGb2xkZXIuYWRkKFxuICAgIHByb3BlcnRpZXNPYmplY3QudG9uZU1hcHBpbmcsXG4gICAgXCJ0b25lTWFwcGluZ1wiLFxuICAgIGVudW1zLnRvbmVNYXBwaW5nT3B0aW9uc1xuICApO1xuXG4gIGNvbnN0IGNsZWFyU2V0dGluZ3NGb2xkZXIgPSByZW5kZXJlckZvbGRlci5hZGRGb2xkZXIoXCJjbGVhclNldHRpbmdzXCIpO1xuICBjbGVhclNldHRpbmdzRm9sZGVyLmFkZChwcm9wZXJ0aWVzT2JqZWN0LmNsZWFyU2V0dGluZ3MsIFwiYXV0b0NsZWFyXCIpO1xuICBjbGVhclNldHRpbmdzRm9sZGVyLmFkZENvbG9yKHByb3BlcnRpZXNPYmplY3QuY2xlYXJTZXR0aW5ncywgXCJjbGVhckNvbG9yXCIpO1xuXG4gIHJlbmRlcmVyRm9sZGVyLmNsb3NlKCk7XG59O1xuXG5jb25zdCB1cGRhdGVXZWJHTFJlbmRlcmVyUHJvcGVydGllcyA9ICh3ZWJHTFJlbmRlcmVyLCBwcm9wZXJ0eUhvbGRlcikgPT4ge1xuICB3ZWJHTFJlbmRlcmVyLnNoYWRvd01hcC5lbmFibGVkID0gcHJvcGVydHlIb2xkZXIuc2hhZG93TWFwLmVuYWJsZWQ7XG4gIHdlYkdMUmVuZGVyZXIuc2hhZG93TWFwLmF1dG9VcGRhdGUgPSBwcm9wZXJ0eUhvbGRlci5zaGFkb3dNYXAuYXV0b1VwZGF0ZTtcbiAgd2ViR0xSZW5kZXJlci5zaGFkb3dNYXAubmVlZHNVcGRhdGUgPSBwcm9wZXJ0eUhvbGRlci5zaGFkb3dNYXAubmVlZHNVcGRhdGU7XG4gIHdlYkdMUmVuZGVyZXIudG9uZU1hcHBpbmcgPSBwcm9wZXJ0eUhvbGRlci50b25lTWFwcGluZy50b25lTWFwcGluZztcbiAgd2ViR0xSZW5kZXJlci50b25lTWFwcGluZ0V4cG9zdXJlID0gcHJvcGVydHlIb2xkZXIudG9uZU1hcHBpbmcuZXhwb3N1cmU7XG4gIHdlYkdMUmVuZGVyZXIuYXV0b0NsZWFyID0gcHJvcGVydHlIb2xkZXIuY2xlYXJTZXR0aW5ncy5hdXRvQ2xlYXI7XG4gIHdlYkdMUmVuZGVyZXIuc2V0Q2xlYXJDb2xvcihwcm9wZXJ0eUhvbGRlci5jbGVhclNldHRpbmdzLmNsZWFyQ29sb3IpO1xuICB3ZWJHTFJlbmRlcmVyLm91dHB1dEVuY29kaW5nID0gcHJvcGVydHlIb2xkZXIubWFpbi5vdXRwdXRFbmNvZGluZztcblxuICB3ZWJHTFJlbmRlcmVyLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbn07XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcblxuY29uc3QgdGV4dHVyZUxvYWRlciA9IG5ldyBUSFJFRS5UZXh0dXJlTG9hZGVyKClcblxuY29uc3QgcHJvcGVydGllc09iamVjdCA9IChzY2VuZSkgPT4gKHtcbiAgb3ZlcnJpZGVNYXRlcmlhbDoge1xuICAgIHRvZ2dsZTogKCkgPT4ge1xuICAgICAgaWYgKHNjZW5lLm92ZXJyaWRlTWF0ZXJpYWwgIT09IG51bGwpIHtcbiAgICAgICAgc2NlbmUub3ZlcnJpZGVNYXRlcmlhbCA9IG51bGxcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNjZW5lLm92ZXJyaWRlTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaE5vcm1hbE1hdGVyaWFsKClcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGJhY2tHcm91bmQ6ICdXaGl0ZScsXG4gIGVudmlyb25tZW50OiB7XG4gICAgdG9nZ2xlOiAoKSA9PiB7XG4gICAgICBpZiAoc2NlbmUuZW52aXJvbm1lbnQgIT09IG51bGwpIHtcbiAgICAgICAgc2NlbmUuZW52aXJvbm1lbnQgPSBudWxsXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZXh0dXJlTG9hZGVyLmxvYWQoJy9hc3NldHMvZXF1aS5qcGVnJywgKGxvYWRlZCkgPT4ge1xuICAgICAgICAgIGxvYWRlZC5tYXBwaW5nID0gVEhSRUUuRXF1aXJlY3Rhbmd1bGFyUmVmbGVjdGlvbk1hcHBpbmdcbiAgICAgICAgICBzY2VuZS5lbnZpcm9ubWVudCA9IGxvYWRlZFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxufSlcblxuY29uc3QgZm9nUHJvcGVydGllcyA9IChmb2cpID0+ICh7XG4gIGNvbG9yOiAweGZmZmZmZixcbiAgbmVhcjogZm9nLm5lYXIsXG4gIGZhcjogZm9nLmZhclxufSlcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVTY2VuZUNvbnRyb2xzID0gKGd1aSwgc2NlbmUsIGZvZ0VuYWJsZWQsIGlzT3BlbikgPT4ge1xuICBjb25zdCBwcm9wcyA9IHByb3BlcnRpZXNPYmplY3Qoc2NlbmUpXG4gIGNvbnN0IHNjZW5lQ29udHJvbHMgPSBndWkuYWRkRm9sZGVyKCdTY2VuZScpXG5cbiAgc2NlbmVDb250cm9sc1xuICAgIC5hZGQocHJvcHMsICdiYWNrR3JvdW5kJywgWydXaGl0ZScsICdCbGFjaycsICdOdWxsJywgJ0NvbG9yJywgJ1RleHR1cmUnLCAnQ3ViZW1hcCddKVxuICAgIC5vbkNoYW5nZSgoZXZlbnQpID0+IGhhbmRsZUJhY2tncm91bmRDaGFuZ2UoZXZlbnQsIHNjZW5lKSlcbiAgc2NlbmVDb250cm9scy5hZGQocHJvcHMub3ZlcnJpZGVNYXRlcmlhbCwgJ3RvZ2dsZScpLm5hbWUoJ1RvZ2dsZSBPdmVycmlkZSBNYXRlcmlhbCcpXG4gIHNjZW5lQ29udHJvbHMuYWRkKHByb3BzLmVudmlyb25tZW50LCAndG9nZ2xlJykubmFtZSgnVG9nZ2xlIEVudmlyb25tZW50JylcblxuICBpZiAoZm9nRW5hYmxlZCkge1xuICAgIGNvbnN0IGZvZ0NvbG9yID0gbmV3IFRIUkVFLkNvbG9yKDB4ZmZmZmZmKVxuICAgIGNvbnN0IGZvZyA9IG5ldyBUSFJFRS5Gb2coZm9nQ29sb3IsIDEsIDIwKVxuICAgIHNjZW5lLmZvZyA9IGZvZ1xuICAgIGNvbnN0IGZvZ1Byb3BzID0gZm9nUHJvcGVydGllcyhmb2cpXG4gICAgY29uc3QgZm9nQ29udHJvbHMgPSBzY2VuZUNvbnRyb2xzLmFkZEZvbGRlcignRm9nJylcbiAgICBmb2dDb250cm9scy5hZGRDb2xvcihmb2dQcm9wcywgJ2NvbG9yJylcbiAgICBmb2dDb250cm9scy5hZGQoZm9nUHJvcHMsICduZWFyJywgMCwgMTAsIDAuMSlcbiAgICBmb2dDb250cm9scy5hZGQoZm9nUHJvcHMsICdmYXInLCAwLCAxMDAsIDAuMSlcblxuICAgIGZvZ0NvbnRyb2xzLm9uQ2hhbmdlKCgpID0+IHtcbiAgICAgIGZvZy5jb2xvciA9IGZvZ0NvbG9yLnNldEhleChmb2dQcm9wcy5jb2xvcilcbiAgICAgIGZvZy5uZWFyID0gZm9nUHJvcHMubmVhclxuICAgICAgZm9nLmZhciA9IGZvZ1Byb3BzLmZhclxuICAgIH0pXG4gIH1cblxuICBpc09wZW4gPyBzY2VuZUNvbnRyb2xzLm9wZW4oKSA6IHNjZW5lQ29udHJvbHMuY2xvc2UoKVxufVxuXG5jb25zdCBoYW5kbGVCYWNrZ3JvdW5kQ2hhbmdlID0gKHNldHRpbmcsIHNjZW5lKSA9PiB7XG4gIHN3aXRjaCAoc2V0dGluZykge1xuICAgIGNhc2UgJ1doaXRlJzpcbiAgICAgIHNjZW5lLmJhY2tncm91bmQgPSBuZXcgVEhSRUUuQ29sb3IoMHhmZmZmZmYpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ0JsYWNrJzpcbiAgICAgIHNjZW5lLmJhY2tncm91bmQgPSBuZXcgVEhSRUUuQ29sb3IoMHgwMDAwMDApXG4gICAgICBicmVha1xuICAgIGNhc2UgJ051bGwnOlxuICAgICAgc2NlbmUuYmFja2dyb3VuZCA9IG51bGxcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnQ29sb3InOlxuICAgICAgc2NlbmUuYmFja2dyb3VuZCA9IG5ldyBUSFJFRS5Db2xvcigweDQ0ZmY0NClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnVGV4dHVyZSc6XG4gICAgICB0ZXh0dXJlTG9hZGVyLmxvYWQoJy9hc3NldHMvdGV4dHVyZXMvd29vZC9hYnN0cmFjdC1hbnRpcXVlLWJhY2tkcm9wLTE2NDAwNS5qcGcnLCAobG9hZGVkKSA9PiB7XG4gICAgICAgIGxvYWRlZC5lbmNvZGluZyA9IFRIUkVFLnNSR0JFbmNvZGluZ1xuICAgICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbG9hZGVkXG4gICAgICAgIHNjZW5lLmVudmlyb25tZW50ID0gbnVsbFxuICAgICAgfSlcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnQ3ViZW1hcCc6XG4gICAgICB0ZXh0dXJlTG9hZGVyLmxvYWQoJy9hc3NldHMvZXF1aS5qcGVnJywgKGxvYWRlZCkgPT4ge1xuICAgICAgICBsb2FkZWQubWFwcGluZyA9IFRIUkVFLkVxdWlyZWN0YW5ndWxhclJlZmxlY3Rpb25NYXBwaW5nXG4gICAgICAgIHNjZW5lLmJhY2tncm91bmQgPSBsb2FkZWRcbiAgICAgICAgc2NlbmUuZW52aXJvbm1lbnQgPSBsb2FkZWRcbiAgICAgIH0pXG5cbiAgICAgIGJyZWFrXG4gICAgZGVmYXVsdDpcbiAgICAgIGJyZWFrXG4gIH1cbn1cbiIsImV4cG9ydCBjb25zdCBvblJlc2l6ZSA9IChjYW1lcmEsIHJlbmRlcmVyKSA9PiB7XG4gIGNvbnN0IHJlc2l6ZXIgPSAoKSA9PiB7XG4gICAgY2FtZXJhLmFzcGVjdCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0XG4gICAgY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKVxuICAgIHJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodClcbiAgfVxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzaXplciwgZmFsc2UpXG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
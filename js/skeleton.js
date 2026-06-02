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

/***/ "./samples/chapters/chapter-9/skeleton.js"
/*!************************************************!*\
  !*** ./samples/chapters/chapter-9/skeleton.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_standard_scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/standard-scene */ "./samples/chapters/chapter-9/util/standard-scene.js");
/* harmony import */ var three_examples_jsm_loaders_GLTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/loaders/GLTFLoader */ "./node_modules/three/examples/jsm/loaders/GLTFLoader.js");
/* harmony import */ var _util_modelUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/modelUtil */ "./samples/util/modelUtil.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _controls_mesh_controls__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../controls/mesh-controls */ "./samples/controls/mesh-controls.js");







let animations = []
const loadModel = () => {
  const loader = new three_examples_jsm_loaders_GLTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader()
  return loader.loadAsync('/assets/models/blender-skeleton/lpp-rigging.gltf').then((container) => {
    container.scene.translateY(-2)
    ;(0,_util_modelUtil__WEBPACK_IMPORTED_MODULE_2__.applyShadowsAndDepthWrite)(container.scene)
    ;(0,_util_modelUtil__WEBPACK_IMPORTED_MODULE_2__.visitChildren)(container.scene, (c) => {
      if (c.material) {
        c.material.opacity = 0.4
        c.material.transparent = true
      }
    })
    animations = container.animations
    return container.scene
  })
}

let mixer = undefined

;(0,_util_standard_scene__WEBPACK_IMPORTED_MODULE_0__.bootstrapMeshScene)({
  loadMesh: loadModel,
  addControls: (camera, renderer, scene, gui, mesh) => {
    const controls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_3__.OrbitControls(camera, renderer.domElement)
    const props = {
      animationIsPlaying: false,
      toggleSkeletonHelper: () => {
        const sh = scene.getObjectByName('skeletonHelper')
        if (sh) scene.remove(sh)

        const helper = new three__WEBPACK_IMPORTED_MODULE_4__.SkeletonHelper(mesh)
        helper.name = 'skeletonHelper'
        console.log(helper)
        scene.add(helper)
      }
    }

    mixer = new three__WEBPACK_IMPORTED_MODULE_4__.AnimationMixer(mesh)
    const action = mixer.clipAction(animations[0]).setEffectiveTimeScale(4)

    const centerBone = (0,_util_modelUtil__WEBPACK_IMPORTED_MODULE_2__.findChild)(mesh, 'Bone')
    const neckBone = (0,_util_modelUtil__WEBPACK_IMPORTED_MODULE_2__.findChild)(mesh, 'Bone003')
    const legBone = (0,_util_modelUtil__WEBPACK_IMPORTED_MODULE_2__.findChild)(mesh, 'Bone015')
    const armBone = (0,_util_modelUtil__WEBPACK_IMPORTED_MODULE_2__.findChild)(mesh, 'Bone006')

    const folder = gui.addFolder('Bones')
    ;(0,_controls_mesh_controls__WEBPACK_IMPORTED_MODULE_5__.addMeshProperties)(gui, centerBone, 'centerBone')
    ;(0,_controls_mesh_controls__WEBPACK_IMPORTED_MODULE_5__.addMeshProperties)(gui, neckBone, 'neckBone')
    ;(0,_controls_mesh_controls__WEBPACK_IMPORTED_MODULE_5__.addMeshProperties)(gui, legBone, 'legBone')
    ;(0,_controls_mesh_controls__WEBPACK_IMPORTED_MODULE_5__.addMeshProperties)(gui, armBone, 'armBone')

    folder.add(props, 'animationIsPlaying').onChange((ev) => (ev ? action.play() : action.stop()))
    folder.add(props, 'toggleSkeletonHelper')

    return controls
  },
  onRender: (clock) => {
    if (mixer) {
      mixer.update(clock.getDelta())
    }
  }
}).then()


/***/ },

/***/ "./samples/chapters/chapter-9/util/standard-scene.js"
/*!***********************************************************!*\
  !*** ./samples/chapters/chapter-9/util/standard-scene.js ***!
  \***********************************************************/
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
  loadMesh,
  provideGui,
  hidefloor,
  floorSize,
  backgroundColor,
  onRender,
  addControls
}) => {
  const props = {
    backgroundColor: backgroundColor ?? 0xffffff,
    disableDefaultControls: true
  }

  const mesh = await loadMesh()

  const gui = new lil_gui__WEBPACK_IMPORTED_MODULE_2__["default"]()
  const clock = new three__WEBPACK_IMPORTED_MODULE_4__.Clock()

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

      if (provideGui) provideGui(gui, mesh, scene)
      let controls = undefined
      if (addControls) {
        controls = addControls(camera, renderer, scene, gui, mesh)
      }

      animate()

      function animate() {
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
        if (onRender) onRender(clock, controls, camera, scene)
      }
    })
  }

  init().then()
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

/***/ "./samples/controls/mesh-controls.js"
/*!*******************************************!*\
  !*** ./samples/controls/mesh-controls.js ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addMeshProperties: () => (/* binding */ addMeshProperties)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");


const addMeshProperties = (gui, mesh, title) => {
  const props = {
    scaleX: mesh.scale.x,
    scaleY: mesh.scale.y,
    scaleZ: mesh.scale.z,
    rotationX: mesh.rotation.x,
    rotationY: mesh.rotation.y,
    rotationZ: mesh.rotation.z,
    positionX: mesh.position.x,
    positionY: mesh.position.y,
    positionZ: mesh.position.z,
    translateX: 0,
    translateY: 0,
    translateZ: 0,
    translate: () => {
      mesh.translateX(props.translateX)
      mesh.translateY(props.translateY)
      mesh.translateZ(props.translateZ)
      props.positionX = mesh.position.x
      props.positionY = mesh.position.y
      props.positionZ = mesh.position.z
    },
    lookAtX: 0,
    lookAtY: 0,
    lookAtZ: 0,
    lookAt: () => {
      mesh.lookAt(props.lookAtX, props.lookAtY, props.lookAtZ)
    },
    visible: mesh.visible,
    castShadow: mesh.castShadow,
    rotateOnWorldAxisX: () => {
      mesh.rotateOnWorldAxis(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(1, 0, 0), Math.PI / 4)
    },
    rotateOnWorldAxisY: () => {
      mesh.rotateOnWorldAxis(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 1, 0), Math.PI / 4)
    },
    rotateOnWorldAxisZ: () => {
      mesh.rotateOnWorldAxis(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, 1), Math.PI / 4)
    }
  }

  const meshFolder = gui.addFolder(title)
  meshFolder.add(props, 'scaleX', 0, 5, 0.1)
  meshFolder.add(props, 'scaleY', 0, 5, 0.1)
  meshFolder.add(props, 'scaleZ', 0, 5, 0.1)
  meshFolder.add(props, 'rotationX', -Math.PI, Math.PI, 0.1)
  meshFolder.add(props, 'rotationY', -Math.PI, Math.PI, 0.1)
  meshFolder.add(props, 'rotationZ', -Math.PI, Math.PI, 0.1)
  meshFolder.add(props, 'positionX', -3, 3, 0.1).listen()
  meshFolder.add(props, 'positionY', -3, 3, 0.1).listen()
  meshFolder.add(props, 'positionZ', -3, 3, 0.1).listen()
  meshFolder.add(props, 'translateX', -3, 3, 0.1)
  meshFolder.add(props, 'translateY', -3, 3, 0.1)
  meshFolder.add(props, 'translateZ', -3, 3, 0.1)
  meshFolder.add(props, 'translate')
  meshFolder.add(props, 'lookAtX', -3, 3, 0.1)
  meshFolder.add(props, 'lookAtY', -3, 3, 0.1)
  meshFolder.add(props, 'lookAtZ', -3, 3, 0.1)
  meshFolder.add(props, 'lookAt')
  meshFolder.add(props, 'visible')
  meshFolder.add(props, 'castShadow')
  // TODO, we could add more here, or just show the axis.
  //       or just create a simple example with a parent object
  //       where we show the three different axis.
  // Also determine here if Three.js really uses object space as parent
  // https://javascript.tutorialink.com/rotate-object-on-specific-axis-anywhere-in-three-js-including-outside-of-mesh/
  meshFolder.add(props, 'rotateOnWorldAxisX')
  meshFolder.add(props, 'rotateOnWorldAxisY')
  meshFolder.add(props, 'rotateOnWorldAxisZ')
  meshFolder.onChange(() => {
    mesh.scale.set(props.scaleX, props.scaleY, props.scaleZ)
    mesh.rotation.set(props.rotationX, props.rotationY, props.rotationZ)
    mesh.position.set(props.positionX, props.positionY, props.positionZ)
    mesh.visible = props.visible
    mesh.castShadow = props.castShadow
  })
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
/******/ 			"skeleton": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","vendors-node_modules_three_examples_jsm_loaders_GLTFLoader_js"], () => (__webpack_require__("./samples/chapters/chapter-9/skeleton.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQSw0Rzs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9ib290c3RyYXAvYm9vdHN0cmFwLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9ib290c3RyYXAvZmxvb3IuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2Jvb3RzdHJhcC9saWdodGluZy5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci05L3NrZWxldG9uLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTkvdXRpbC9zdGFuZGFyZC1zY2VuZS5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY29udHJvbGxlci9vcmJpdC1jb250cm9sbGVyLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jb250cm9scy9tZXNoLWNvbnRyb2xzLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jb250cm9scy9yZW5kZXJlci1jb250cm9sLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jb250cm9scy9zY2VuZS1jb250cm9scy5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvdXRpbC9tb2RlbFV0aWwuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL3V0aWwvdXBkYXRlLW9uLXJlc2l6ZS5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuaW1wb3J0IHsgaW5pdE9yYml0Q29udHJvbHMgfSBmcm9tICcuLi9jb250cm9sbGVyL29yYml0LWNvbnRyb2xsZXInXG5pbXBvcnQgeyBpbml0TGlnaHRpbmcgfSBmcm9tICcuL2xpZ2h0aW5nJ1xuaW1wb3J0IHsgb25SZXNpemUgfSBmcm9tICcuLi91dGlsL3VwZGF0ZS1vbi1yZXNpemUnXG5cbmV4cG9ydCBjb25zdCBpbml0U2NlbmUgPSAoeyBiYWNrZ3JvdW5kQ29sb3IsIGZvZ0NvbG9yLCBkaXNhYmxlU2hhZG93cywgZGlzYWJsZUxpZ2h0cywgZGlzYWJsZURlZmF1bHRDb250cm9scyB9KSA9PiB7XG4gIGNvbnN0IGluaXQgPSAoZm4pID0+IHtcbiAgICAvLyBiYXNpYyBzY2VuZSBzZXR1cFxuICAgIGNvbnN0IHNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKClcbiAgICBpZiAoYmFja2dyb3VuZENvbG9yKSB7XG4gICAgICBzY2VuZS5iYWNrZ3JvdW5kQ29sb3IgPSBiYWNrZ3JvdW5kQ29sb3JcbiAgICB9XG5cbiAgICBpZiAoZm9nQ29sb3IpIHtcbiAgICAgIHNjZW5lLmZvZyA9IG5ldyBUSFJFRS5Gb2coZm9nQ29sb3IsIDAuMDAyNSwgNTApXG4gICAgfVxuXG4gICAgLy8gc2V0dXAgY2FtZXJhIGFuZCBiYXNpYyByZW5kZXJlclxuICAgIGNvbnN0IGNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg3NSwgd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQsIDAuMSwgMTAwMClcbiAgICBjb25zdCByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHsgYW50aWFsaWFzOiB0cnVlIH0pXG4gICAgcmVuZGVyZXIub3V0cHV0RW5jb2RpbmcgPSBUSFJFRS5zUkdCRW5jb2RpbmdcbiAgICByZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IHRydWVcbiAgICByZW5kZXJlci5zaGFkb3dNYXAudHlwZSA9IFRIUkVFLlZTTVNoYWRvd01hcFxuICAgIHJlbmRlcmVyLnNldENsZWFyQ29sb3IoYmFja2dyb3VuZENvbG9yKVxuXG4gICAgb25SZXNpemUoY2FtZXJhLCByZW5kZXJlcilcbiAgICByZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci5kb21FbGVtZW50KVxuXG4gICAgLy8gaW5pdGlhbGl6ZSBvcmJpdCBjb250cm9sc1xuICAgIGxldCBvcmJpdENvbnRyb2xzXG4gICAgaWYgKCFkaXNhYmxlRGVmYXVsdENvbnRyb2xzKSB7XG4gICAgICBvcmJpdENvbnRyb2xzID0gaW5pdE9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlcilcbiAgICB9XG5cbiAgICAvLyBhZGQgc29tZSBiYXNpYyBsaWdodGluZyB0byB0aGUgc2NlbmVcbiAgICBpZiAoIWRpc2FibGVMaWdodHMgPz8gZmFsc2UpIHtcbiAgICAgIGluaXRMaWdodGluZyhzY2VuZSwgeyBkaXNhYmxlU2hhZG93cyB9KVxuICAgIH1cblxuICAgIGZuKHsgc2NlbmUsIGNhbWVyYSwgcmVuZGVyZXIsIG9yYml0Q29udHJvbHMgfSlcbiAgfVxuXG4gIHJldHVybiBpbml0XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcblxuZXhwb3J0IGNvbnN0IGZvcmV2ZXJQbGFuZSA9IChzY2VuZSkgPT4ge1xuICBjb25zdCBnZW8gPSBuZXcgVEhSRUUuUGxhbmVCdWZmZXJHZW9tZXRyeSgxMDAwMCwgMTAwMDApXG4gIGNvbnN0IG1hdCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHtcbiAgICBjb2xvcjogMHhmZmZmZmZcbiAgfSlcbiAgY29uc3QgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlbywgbWF0KVxuICBtZXNoLnBvc2l0aW9uLnNldCgwLCAtMiwgMClcbiAgbWVzaC5yb3RhdGlvbi5zZXQoTWF0aC5QSSAvIC0yLCAwLCAwKVxuICBtZXNoLnJlY2VpdmVTaGFkb3cgPSB0cnVlXG4gIG1lc2gubmFtZSA9ICdmb3JldmVyLWZsb29yJ1xuICBzY2VuZS5hZGQobWVzaClcblxuICByZXR1cm4gbWVzaFxufVxuXG5leHBvcnQgY29uc3QgZmxvYXRpbmdGbG9vciA9IChzY2VuZSwgc2l6ZSkgPT4ge1xuICBjb25zdCBzID0gc2l6ZSA/IHNpemUgOiA2XG4gIGNvbnN0IGdlbyA9IG5ldyBUSFJFRS5Cb3hCdWZmZXJHZW9tZXRyeShzLCAwLjI1LCBzLCAxMCwgMTAsIDEwKVxuICBjb25zdCBtYXQgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoe1xuICAgIGNvbG9yOiAweGRkZGRkZFxuICB9KVxuICBjb25zdCBtZXNoID0gbmV3IFRIUkVFLk1lc2goZ2VvLCBtYXQpXG4gIG1lc2gucG9zaXRpb24uc2V0KDAsIC0yLCAtMSlcbiAgbWVzaC5yZWNlaXZlU2hhZG93ID0gdHJ1ZVxuICBtZXNoLm5hbWUgPSAnZmxvYXRpbmctZmxvb3InXG4gIHNjZW5lLmFkZChtZXNoKVxuXG4gIHJldHVybiBtZXNoXG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcblxuZXhwb3J0IGNvbnN0IGluaXRMaWdodGluZyA9IChzY2VuZSwgeyBkaXNhYmxlU2hhZG93cyB9KSA9PiB7XG4gIC8vIGh0dHBzOi8vdGhyZWVqcy5vcmcvZXhhbXBsZXMvP3E9c2hhZG8jd2ViZ2xfc2hhZG93bWFwX3ZzbVxuICBzY2VuZS5hZGQobmV3IFRIUkVFLkFtYmllbnRMaWdodCgweDY2NjY2NikpXG5cbiAgLy8gY29uc3QgZGlyTGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGFhYWFhYSlcbiAgY29uc3QgZGlyTGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGFhYWFhYSlcbiAgZGlyTGlnaHQucG9zaXRpb24uc2V0KDUsIDEyLCA4KVxuICBkaXJMaWdodC5jYXN0U2hhZG93ID0gIWRpc2FibGVTaGFkb3dzID8gdHJ1ZSA6IGZhbHNlXG4gIGRpckxpZ2h0LmludGVuc2l0eSA9IDFcbiAgZGlyTGlnaHQuc2hhZG93LmNhbWVyYS5uZWFyID0gMC4xXG4gIGRpckxpZ2h0LnNoYWRvdy5jYW1lcmEuZmFyID0gMjAwXG4gIGRpckxpZ2h0LnNoYWRvdy5jYW1lcmEucmlnaHQgPSAxMFxuICBkaXJMaWdodC5zaGFkb3cuY2FtZXJhLmxlZnQgPSAtMTBcbiAgZGlyTGlnaHQuc2hhZG93LmNhbWVyYS50b3AgPSAxMFxuICBkaXJMaWdodC5zaGFkb3cuY2FtZXJhLmJvdHRvbSA9IC0xMFxuICBkaXJMaWdodC5zaGFkb3cubWFwU2l6ZS53aWR0aCA9IDIwNDhcbiAgZGlyTGlnaHQuc2hhZG93Lm1hcFNpemUuaGVpZ2h0ID0gMjA0OFxuICBkaXJMaWdodC5zaGFkb3cucmFkaXVzID0gNFxuICBkaXJMaWdodC5zaGFkb3cuYmlhcyA9IC0wLjAwMDA1XG5cbiAgc2NlbmUuYWRkKGRpckxpZ2h0KVxufVxuIiwiaW1wb3J0IHsgYm9vdHN0cmFwTWVzaFNjZW5lIH0gZnJvbSAnLi91dGlsL3N0YW5kYXJkLXNjZW5lJ1xuaW1wb3J0IHsgR0xURkxvYWRlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXInXG5pbXBvcnQgeyBhcHBseVNoYWRvd3NBbmREZXB0aFdyaXRlLCBmaW5kQ2hpbGQsIHZpc2l0Q2hpbGRyZW4gfSBmcm9tICcuLi8uLi91dGlsL21vZGVsVXRpbCdcbmltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vY29udHJvbHMvT3JiaXRDb250cm9scydcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuaW1wb3J0IHsgYWRkTWVzaFByb3BlcnRpZXMgfSBmcm9tICcuLi8uLi9jb250cm9scy9tZXNoLWNvbnRyb2xzJ1xuXG5sZXQgYW5pbWF0aW9ucyA9IFtdXG5jb25zdCBsb2FkTW9kZWwgPSAoKSA9PiB7XG4gIGNvbnN0IGxvYWRlciA9IG5ldyBHTFRGTG9hZGVyKClcbiAgcmV0dXJuIGxvYWRlci5sb2FkQXN5bmMoJy9hc3NldHMvbW9kZWxzL2JsZW5kZXItc2tlbGV0b24vbHBwLXJpZ2dpbmcuZ2x0ZicpLnRoZW4oKGNvbnRhaW5lcikgPT4ge1xuICAgIGNvbnRhaW5lci5zY2VuZS50cmFuc2xhdGVZKC0yKVxuICAgIGFwcGx5U2hhZG93c0FuZERlcHRoV3JpdGUoY29udGFpbmVyLnNjZW5lKVxuICAgIHZpc2l0Q2hpbGRyZW4oY29udGFpbmVyLnNjZW5lLCAoYykgPT4ge1xuICAgICAgaWYgKGMubWF0ZXJpYWwpIHtcbiAgICAgICAgYy5tYXRlcmlhbC5vcGFjaXR5ID0gMC40XG4gICAgICAgIGMubWF0ZXJpYWwudHJhbnNwYXJlbnQgPSB0cnVlXG4gICAgICB9XG4gICAgfSlcbiAgICBhbmltYXRpb25zID0gY29udGFpbmVyLmFuaW1hdGlvbnNcbiAgICByZXR1cm4gY29udGFpbmVyLnNjZW5lXG4gIH0pXG59XG5cbmxldCBtaXhlciA9IHVuZGVmaW5lZFxuXG5ib290c3RyYXBNZXNoU2NlbmUoe1xuICBsb2FkTWVzaDogbG9hZE1vZGVsLFxuICBhZGRDb250cm9sczogKGNhbWVyYSwgcmVuZGVyZXIsIHNjZW5lLCBndWksIG1lc2gpID0+IHtcbiAgICBjb25zdCBjb250cm9scyA9IG5ldyBPcmJpdENvbnRyb2xzKGNhbWVyYSwgcmVuZGVyZXIuZG9tRWxlbWVudClcbiAgICBjb25zdCBwcm9wcyA9IHtcbiAgICAgIGFuaW1hdGlvbklzUGxheWluZzogZmFsc2UsXG4gICAgICB0b2dnbGVTa2VsZXRvbkhlbHBlcjogKCkgPT4ge1xuICAgICAgICBjb25zdCBzaCA9IHNjZW5lLmdldE9iamVjdEJ5TmFtZSgnc2tlbGV0b25IZWxwZXInKVxuICAgICAgICBpZiAoc2gpIHNjZW5lLnJlbW92ZShzaClcblxuICAgICAgICBjb25zdCBoZWxwZXIgPSBuZXcgVEhSRUUuU2tlbGV0b25IZWxwZXIobWVzaClcbiAgICAgICAgaGVscGVyLm5hbWUgPSAnc2tlbGV0b25IZWxwZXInXG4gICAgICAgIGNvbnNvbGUubG9nKGhlbHBlcilcbiAgICAgICAgc2NlbmUuYWRkKGhlbHBlcilcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtaXhlciA9IG5ldyBUSFJFRS5BbmltYXRpb25NaXhlcihtZXNoKVxuICAgIGNvbnN0IGFjdGlvbiA9IG1peGVyLmNsaXBBY3Rpb24oYW5pbWF0aW9uc1swXSkuc2V0RWZmZWN0aXZlVGltZVNjYWxlKDQpXG5cbiAgICBjb25zdCBjZW50ZXJCb25lID0gZmluZENoaWxkKG1lc2gsICdCb25lJylcbiAgICBjb25zdCBuZWNrQm9uZSA9IGZpbmRDaGlsZChtZXNoLCAnQm9uZTAwMycpXG4gICAgY29uc3QgbGVnQm9uZSA9IGZpbmRDaGlsZChtZXNoLCAnQm9uZTAxNScpXG4gICAgY29uc3QgYXJtQm9uZSA9IGZpbmRDaGlsZChtZXNoLCAnQm9uZTAwNicpXG5cbiAgICBjb25zdCBmb2xkZXIgPSBndWkuYWRkRm9sZGVyKCdCb25lcycpXG4gICAgYWRkTWVzaFByb3BlcnRpZXMoZ3VpLCBjZW50ZXJCb25lLCAnY2VudGVyQm9uZScpXG4gICAgYWRkTWVzaFByb3BlcnRpZXMoZ3VpLCBuZWNrQm9uZSwgJ25lY2tCb25lJylcbiAgICBhZGRNZXNoUHJvcGVydGllcyhndWksIGxlZ0JvbmUsICdsZWdCb25lJylcbiAgICBhZGRNZXNoUHJvcGVydGllcyhndWksIGFybUJvbmUsICdhcm1Cb25lJylcblxuICAgIGZvbGRlci5hZGQocHJvcHMsICdhbmltYXRpb25Jc1BsYXlpbmcnKS5vbkNoYW5nZSgoZXYpID0+IChldiA/IGFjdGlvbi5wbGF5KCkgOiBhY3Rpb24uc3RvcCgpKSlcbiAgICBmb2xkZXIuYWRkKHByb3BzLCAndG9nZ2xlU2tlbGV0b25IZWxwZXInKVxuXG4gICAgcmV0dXJuIGNvbnRyb2xzXG4gIH0sXG4gIG9uUmVuZGVyOiAoY2xvY2spID0+IHtcbiAgICBpZiAobWl4ZXIpIHtcbiAgICAgIG1peGVyLnVwZGF0ZShjbG9jay5nZXREZWx0YSgpKVxuICAgIH1cbiAgfVxufSkudGhlbigpXG4iLCJpbXBvcnQgeyBpbml0U2NlbmUgfSBmcm9tICcuLi8uLi8uLi9ib290c3RyYXAvYm9vdHN0cmFwJ1xuaW1wb3J0IHsgaW50aWFsaXplUmVuZGVyZXJDb250cm9scyB9IGZyb20gJy4uLy4uLy4uL2NvbnRyb2xzL3JlbmRlcmVyLWNvbnRyb2wnXG5cbmltcG9ydCBHVUkgZnJvbSAnbGlsLWd1aSdcbmltcG9ydCB7IGluaXRpYWxpemVTY2VuZUNvbnRyb2xzIH0gZnJvbSAnLi4vLi4vLi4vY29udHJvbHMvc2NlbmUtY29udHJvbHMnXG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcbmltcG9ydCB7IGZsb2F0aW5nRmxvb3IgfSBmcm9tICcuLi8uLi8uLi9ib290c3RyYXAvZmxvb3InXG5cbmV4cG9ydCBjb25zdCBib290c3RyYXBNZXNoU2NlbmUgPSBhc3luYyAoe1xuICBsb2FkTWVzaCxcbiAgcHJvdmlkZUd1aSxcbiAgaGlkZWZsb29yLFxuICBmbG9vclNpemUsXG4gIGJhY2tncm91bmRDb2xvcixcbiAgb25SZW5kZXIsXG4gIGFkZENvbnRyb2xzXG59KSA9PiB7XG4gIGNvbnN0IHByb3BzID0ge1xuICAgIGJhY2tncm91bmRDb2xvcjogYmFja2dyb3VuZENvbG9yID8/IDB4ZmZmZmZmLFxuICAgIGRpc2FibGVEZWZhdWx0Q29udHJvbHM6IHRydWVcbiAgfVxuXG4gIGNvbnN0IG1lc2ggPSBhd2FpdCBsb2FkTWVzaCgpXG5cbiAgY29uc3QgZ3VpID0gbmV3IEdVSSgpXG4gIGNvbnN0IGNsb2NrID0gbmV3IFRIUkVFLkNsb2NrKClcblxuICBjb25zdCBpbml0ID0gYXN5bmMgKCkgPT4ge1xuICAgIGluaXRTY2VuZShwcm9wcykoKHsgc2NlbmUsIGNhbWVyYSwgcmVuZGVyZXIgfSkgPT4ge1xuICAgICAgcmVuZGVyZXIuc2hhZG93TWFwLnR5cGUgPSBUSFJFRS5QQ0ZTb2Z0U2hhZG93TWFwXG4gICAgICBjYW1lcmEucG9zaXRpb24ueCA9IC0zXG4gICAgICBjYW1lcmEucG9zaXRpb24ueiA9IDhcbiAgICAgIGNhbWVyYS5wb3NpdGlvbi55ID0gMlxuXG4gICAgICBoaWRlZmxvb3IgPz8gZmxvYXRpbmdGbG9vcihzY2VuZSwgZmxvb3JTaXplID8/IDgpXG5cbiAgICAgIGlmIChtZXNoKSBzY2VuZS5hZGQobWVzaClcblxuICAgICAgaW50aWFsaXplUmVuZGVyZXJDb250cm9scyhndWksIHJlbmRlcmVyKVxuICAgICAgaW5pdGlhbGl6ZVNjZW5lQ29udHJvbHMoZ3VpLCBzY2VuZSwgZmFsc2UpXG5cbiAgICAgIGlmIChwcm92aWRlR3VpKSBwcm92aWRlR3VpKGd1aSwgbWVzaCwgc2NlbmUpXG4gICAgICBsZXQgY29udHJvbHMgPSB1bmRlZmluZWRcbiAgICAgIGlmIChhZGRDb250cm9scykge1xuICAgICAgICBjb250cm9scyA9IGFkZENvbnRyb2xzKGNhbWVyYSwgcmVuZGVyZXIsIHNjZW5lLCBndWksIG1lc2gpXG4gICAgICB9XG5cbiAgICAgIGFuaW1hdGUoKVxuXG4gICAgICBmdW5jdGlvbiBhbmltYXRlKCkge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSlcbiAgICAgICAgcmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEpXG4gICAgICAgIGlmIChvblJlbmRlcikgb25SZW5kZXIoY2xvY2ssIGNvbnRyb2xzLCBjYW1lcmEsIHNjZW5lKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBpbml0KCkudGhlbigpXG59XG4iLCJpbXBvcnQgeyBPcmJpdENvbnRyb2xzIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2NvbnRyb2xzL09yYml0Q29udHJvbHMnXG5cbmV4cG9ydCBjb25zdCBpbml0T3JiaXRDb250cm9scyA9IChjYW1lcmEsIHJlbmRlcmVyKSA9PiB7XG4gIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgT3JiaXRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLmRvbUVsZW1lbnQpXG4gIGNvbnRyb2xsZXIuZW5hYmxlRGFtcGluZyA9IHRydWVcbiAgY29udHJvbGxlci5kYW1waW5nRmFjdG9yID0gMC4wNVxuICBjb250cm9sbGVyLm1pbkRpc3RhbmNlID0gMVxuICBjb250cm9sbGVyLm1heERpc3RhbmNlID0gMTAwXG4gIGNvbnRyb2xsZXIubWluUG9sYXJBbmdsZSA9IE1hdGguUEkgLyA0XG4gIGNvbnRyb2xsZXIubWF4UG9sYXJBbmdsZSA9ICgzICogTWF0aC5QSSkgLyA0XG5cbiAgcmV0dXJuIGNvbnRyb2xsZXJcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuXG5leHBvcnQgY29uc3QgYWRkTWVzaFByb3BlcnRpZXMgPSAoZ3VpLCBtZXNoLCB0aXRsZSkgPT4ge1xuICBjb25zdCBwcm9wcyA9IHtcbiAgICBzY2FsZVg6IG1lc2guc2NhbGUueCxcbiAgICBzY2FsZVk6IG1lc2guc2NhbGUueSxcbiAgICBzY2FsZVo6IG1lc2guc2NhbGUueixcbiAgICByb3RhdGlvblg6IG1lc2gucm90YXRpb24ueCxcbiAgICByb3RhdGlvblk6IG1lc2gucm90YXRpb24ueSxcbiAgICByb3RhdGlvblo6IG1lc2gucm90YXRpb24ueixcbiAgICBwb3NpdGlvblg6IG1lc2gucG9zaXRpb24ueCxcbiAgICBwb3NpdGlvblk6IG1lc2gucG9zaXRpb24ueSxcbiAgICBwb3NpdGlvblo6IG1lc2gucG9zaXRpb24ueixcbiAgICB0cmFuc2xhdGVYOiAwLFxuICAgIHRyYW5zbGF0ZVk6IDAsXG4gICAgdHJhbnNsYXRlWjogMCxcbiAgICB0cmFuc2xhdGU6ICgpID0+IHtcbiAgICAgIG1lc2gudHJhbnNsYXRlWChwcm9wcy50cmFuc2xhdGVYKVxuICAgICAgbWVzaC50cmFuc2xhdGVZKHByb3BzLnRyYW5zbGF0ZVkpXG4gICAgICBtZXNoLnRyYW5zbGF0ZVoocHJvcHMudHJhbnNsYXRlWilcbiAgICAgIHByb3BzLnBvc2l0aW9uWCA9IG1lc2gucG9zaXRpb24ueFxuICAgICAgcHJvcHMucG9zaXRpb25ZID0gbWVzaC5wb3NpdGlvbi55XG4gICAgICBwcm9wcy5wb3NpdGlvblogPSBtZXNoLnBvc2l0aW9uLnpcbiAgICB9LFxuICAgIGxvb2tBdFg6IDAsXG4gICAgbG9va0F0WTogMCxcbiAgICBsb29rQXRaOiAwLFxuICAgIGxvb2tBdDogKCkgPT4ge1xuICAgICAgbWVzaC5sb29rQXQocHJvcHMubG9va0F0WCwgcHJvcHMubG9va0F0WSwgcHJvcHMubG9va0F0WilcbiAgICB9LFxuICAgIHZpc2libGU6IG1lc2gudmlzaWJsZSxcbiAgICBjYXN0U2hhZG93OiBtZXNoLmNhc3RTaGFkb3csXG4gICAgcm90YXRlT25Xb3JsZEF4aXNYOiAoKSA9PiB7XG4gICAgICBtZXNoLnJvdGF0ZU9uV29ybGRBeGlzKG5ldyBUSFJFRS5WZWN0b3IzKDEsIDAsIDApLCBNYXRoLlBJIC8gNClcbiAgICB9LFxuICAgIHJvdGF0ZU9uV29ybGRBeGlzWTogKCkgPT4ge1xuICAgICAgbWVzaC5yb3RhdGVPbldvcmxkQXhpcyhuZXcgVEhSRUUuVmVjdG9yMygwLCAxLCAwKSwgTWF0aC5QSSAvIDQpXG4gICAgfSxcbiAgICByb3RhdGVPbldvcmxkQXhpc1o6ICgpID0+IHtcbiAgICAgIG1lc2gucm90YXRlT25Xb3JsZEF4aXMobmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMSksIE1hdGguUEkgLyA0KVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG1lc2hGb2xkZXIgPSBndWkuYWRkRm9sZGVyKHRpdGxlKVxuICBtZXNoRm9sZGVyLmFkZChwcm9wcywgJ3NjYWxlWCcsIDAsIDUsIDAuMSlcbiAgbWVzaEZvbGRlci5hZGQocHJvcHMsICdzY2FsZVknLCAwLCA1LCAwLjEpXG4gIG1lc2hGb2xkZXIuYWRkKHByb3BzLCAnc2NhbGVaJywgMCwgNSwgMC4xKVxuICBtZXNoRm9sZGVyLmFkZChwcm9wcywgJ3JvdGF0aW9uWCcsIC1NYXRoLlBJLCBNYXRoLlBJLCAwLjEpXG4gIG1lc2hGb2xkZXIuYWRkKHByb3BzLCAncm90YXRpb25ZJywgLU1hdGguUEksIE1hdGguUEksIDAuMSlcbiAgbWVzaEZvbGRlci5hZGQocHJvcHMsICdyb3RhdGlvblonLCAtTWF0aC5QSSwgTWF0aC5QSSwgMC4xKVxuICBtZXNoRm9sZGVyLmFkZChwcm9wcywgJ3Bvc2l0aW9uWCcsIC0zLCAzLCAwLjEpLmxpc3RlbigpXG4gIG1lc2hGb2xkZXIuYWRkKHByb3BzLCAncG9zaXRpb25ZJywgLTMsIDMsIDAuMSkubGlzdGVuKClcbiAgbWVzaEZvbGRlci5hZGQocHJvcHMsICdwb3NpdGlvblonLCAtMywgMywgMC4xKS5saXN0ZW4oKVxuICBtZXNoRm9sZGVyLmFkZChwcm9wcywgJ3RyYW5zbGF0ZVgnLCAtMywgMywgMC4xKVxuICBtZXNoRm9sZGVyLmFkZChwcm9wcywgJ3RyYW5zbGF0ZVknLCAtMywgMywgMC4xKVxuICBtZXNoRm9sZGVyLmFkZChwcm9wcywgJ3RyYW5zbGF0ZVonLCAtMywgMywgMC4xKVxuICBtZXNoRm9sZGVyLmFkZChwcm9wcywgJ3RyYW5zbGF0ZScpXG4gIG1lc2hGb2xkZXIuYWRkKHByb3BzLCAnbG9va0F0WCcsIC0zLCAzLCAwLjEpXG4gIG1lc2hGb2xkZXIuYWRkKHByb3BzLCAnbG9va0F0WScsIC0zLCAzLCAwLjEpXG4gIG1lc2hGb2xkZXIuYWRkKHByb3BzLCAnbG9va0F0WicsIC0zLCAzLCAwLjEpXG4gIG1lc2hGb2xkZXIuYWRkKHByb3BzLCAnbG9va0F0JylcbiAgbWVzaEZvbGRlci5hZGQocHJvcHMsICd2aXNpYmxlJylcbiAgbWVzaEZvbGRlci5hZGQocHJvcHMsICdjYXN0U2hhZG93JylcbiAgLy8gVE9ETywgd2UgY291bGQgYWRkIG1vcmUgaGVyZSwgb3IganVzdCBzaG93IHRoZSBheGlzLlxuICAvLyAgICAgICBvciBqdXN0IGNyZWF0ZSBhIHNpbXBsZSBleGFtcGxlIHdpdGggYSBwYXJlbnQgb2JqZWN0XG4gIC8vICAgICAgIHdoZXJlIHdlIHNob3cgdGhlIHRocmVlIGRpZmZlcmVudCBheGlzLlxuICAvLyBBbHNvIGRldGVybWluZSBoZXJlIGlmIFRocmVlLmpzIHJlYWxseSB1c2VzIG9iamVjdCBzcGFjZSBhcyBwYXJlbnRcbiAgLy8gaHR0cHM6Ly9qYXZhc2NyaXB0LnR1dG9yaWFsaW5rLmNvbS9yb3RhdGUtb2JqZWN0LW9uLXNwZWNpZmljLWF4aXMtYW55d2hlcmUtaW4tdGhyZWUtanMtaW5jbHVkaW5nLW91dHNpZGUtb2YtbWVzaC9cbiAgbWVzaEZvbGRlci5hZGQocHJvcHMsICdyb3RhdGVPbldvcmxkQXhpc1gnKVxuICBtZXNoRm9sZGVyLmFkZChwcm9wcywgJ3JvdGF0ZU9uV29ybGRBeGlzWScpXG4gIG1lc2hGb2xkZXIuYWRkKHByb3BzLCAncm90YXRlT25Xb3JsZEF4aXNaJylcbiAgbWVzaEZvbGRlci5vbkNoYW5nZSgoKSA9PiB7XG4gICAgbWVzaC5zY2FsZS5zZXQocHJvcHMuc2NhbGVYLCBwcm9wcy5zY2FsZVksIHByb3BzLnNjYWxlWilcbiAgICBtZXNoLnJvdGF0aW9uLnNldChwcm9wcy5yb3RhdGlvblgsIHByb3BzLnJvdGF0aW9uWSwgcHJvcHMucm90YXRpb25aKVxuICAgIG1lc2gucG9zaXRpb24uc2V0KHByb3BzLnBvc2l0aW9uWCwgcHJvcHMucG9zaXRpb25ZLCBwcm9wcy5wb3NpdGlvblopXG4gICAgbWVzaC52aXNpYmxlID0gcHJvcHMudmlzaWJsZVxuICAgIG1lc2guY2FzdFNoYWRvdyA9IHByb3BzLmNhc3RTaGFkb3dcbiAgfSlcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuXG5jb25zdCBlbnVtcyA9IHtcbiAgdG9uZU1hcHBpbmdPcHRpb25zOiB7XG4gICAgTm9uZTogVEhSRUUuTm9Ub25lTWFwcGluZyxcbiAgICBMaW5lYXI6IFRIUkVFLkxpbmVhclRvbmVNYXBwaW5nLFxuICAgIFJlaW5oYXJkOiBUSFJFRS5SZWluaGFyZFRvbmVNYXBwaW5nLFxuICAgIENpbmVvbjogVEhSRUUuQ2luZW9uVG9uZU1hcHBpbmcsXG4gICAgQUNFU0ZpbG1pYzogVEhSRUUuQUNFU0ZpbG1pY1RvbmVNYXBwaW5nLFxuICAgIEN1c3RvbTogVEhSRUUuQ3VzdG9tVG9uZU1hcHBpbmcsXG4gIH0sXG4gIHNoYWRvd01hcHBpbmc6IHtcbiAgICBCYXNpYzogVEhSRUUuQmFzaWNTaGFkb3dNYXAsXG4gICAgUENGUzogVEhSRUUuUENGU2hhZG93TWFwLFxuICAgIFBDRlNvZnQ6IFRIUkVFLlBDRlNvZnRTaGFkb3dNYXAsXG4gICAgVlNNOiBUSFJFRS5WU01TaGFkb3dNYXAsXG4gIH0sXG4gIG91dHB1dEVuY29kaW5nczoge1xuICAgIExpbmVhcjogVEhSRUUuTGluZWFyRW5jb2RpbmcsXG4gICAgc1JHQjogVEhSRUUuc1JHQkVuY29kaW5nLFxuICB9LFxufTtcblxuY29uc3QgZ2V0UHJvcGVydHlIb2xkZXIgPSAod2ViR0xSZW5kZXJlcikgPT4ge1xuICBjb25zdCBjbGVhckNvbG9ySG9sZGVyID0gbmV3IFRIUkVFLkNvbG9yKCk7XG4gIHdlYkdMUmVuZGVyZXIuZ2V0Q2xlYXJDb2xvcihjbGVhckNvbG9ySG9sZGVyKTtcblxuICBjb25zdCBob2xkZXIgPSB7XG4gICAgbWFpbjoge1xuICAgICAgb3V0cHV0RW5jb2Rpbmc6IHdlYkdMUmVuZGVyZXIub3V0cHV0RW5jb2RpbmcsXG4gICAgfSxcbiAgICBzaGFkb3dNYXA6IHtcbiAgICAgIGVuYWJsZWQ6IHdlYkdMUmVuZGVyZXIuc2hhZG93TWFwLmVuYWJsZWQsXG4gICAgICBhdXRvVXBkYXRlOiB3ZWJHTFJlbmRlcmVyLnNoYWRvd01hcC5hdXRvVXBkYXRlLFxuICAgICAgbmVlZHNVcGRhdGU6ICgpID0+ICh3ZWJHTFJlbmRlcmVyLnNoYWRvd01hcC5uZWVkc1VwZGF0ZSA9IHRydWUpLFxuICAgICAgdHlwZTogd2ViR0xSZW5kZXJlci5zaGFkb3dNYXAudHlwZSxcbiAgICB9LFxuICAgIHRvbmVNYXBwaW5nOiB7XG4gICAgICBleHBvc3VyZTogd2ViR0xSZW5kZXJlci50b25lTWFwcGluZ0V4cG9zdXJlLFxuICAgICAgdG9uZU1hcHBpbmc6IHdlYkdMUmVuZGVyZXIudG9uZU1hcHBpbmcsXG4gICAgfSxcbiAgICBjbGVhclNldHRpbmdzOiB7XG4gICAgICBhdXRvQ2xlYXI6IHdlYkdMUmVuZGVyZXIuYXV0b0NsZWFyLFxuICAgICAgY2xlYXJDb2xvcjogY2xlYXJDb2xvckhvbGRlci5nZXRTdHlsZSgpLFxuICAgIH0sXG4gICAgYWR2YW5jZWQ6IHtcbiAgICAgIGF1dG9DbGVhckRlcHRoOiB3ZWJHTFJlbmRlcmVyLmF1dG9DbGVhckRlcHRoLFxuICAgICAgYXV0b0NsZWFyU3RlbmNpbDogd2ViR0xSZW5kZXJlci5hdXRvQ2xlYXJTdGVuY2lsLFxuICAgICAgY2hlY2tTaGFkZXJFcnJvcnM6IHdlYkdMUmVuZGVyZXIuZGVidWcuY2hlY2tTaGFkZXJFcnJvcnMsXG4gICAgICBzb3J0T2JqZWN0czogd2ViR0xSZW5kZXJlci5zb3J0T2JqZWN0cyxcbiAgICAgIGxvY2FsQ2xpcHBpbmdFbmFibGVkOiB3ZWJHTFJlbmRlcmVyLmxvY2FsQ2xpcHBpbmdFbmFibGVkLFxuICAgICAgcGh5c2ljYWxseUNvcnJlY3RMaWdodHM6IHdlYkdMUmVuZGVyZXIucGh5c2ljYWxseUNvcnJlY3RMaWdodHMsXG4gICAgfSxcbiAgfTtcblxuICByZXR1cm4gaG9sZGVyO1xufTtcblxuZXhwb3J0IGNvbnN0IGludGlhbGl6ZVJlbmRlcmVyQ29udHJvbHMgPSAoZ3VpLCB3ZWJHTFJlbmRlcmVyKSA9PiB7XG4gIGNvbnN0IHByb3BlcnRpZXNPYmplY3QgPSBnZXRQcm9wZXJ0eUhvbGRlcih3ZWJHTFJlbmRlcmVyKTtcbiAgY29uc3QgcmVuZGVyZXJGb2xkZXIgPSBndWkuYWRkRm9sZGVyKFwiV2ViR0xSZW5kZXJlclwiKTtcblxuICByZW5kZXJlckZvbGRlci5vbkNoYW5nZSgoXykgPT4ge1xuICAgIHVwZGF0ZVdlYkdMUmVuZGVyZXJQcm9wZXJ0aWVzKHdlYkdMUmVuZGVyZXIsIHByb3BlcnRpZXNPYmplY3QpO1xuICB9KTtcblxuICByZW5kZXJlckZvbGRlci5hZGQoXG4gICAgcHJvcGVydGllc09iamVjdC5tYWluLFxuICAgIFwib3V0cHV0RW5jb2RpbmdcIixcbiAgICBlbnVtcy5vdXRwdXRFbmNvZGluZ3NcbiAgKTtcblxuICBjb25zdCBzaGFkb3dGb2xkZXIgPSByZW5kZXJlckZvbGRlci5hZGRGb2xkZXIoXCJTaGFkb3dcIik7XG4gIHNoYWRvd0ZvbGRlci5hZGQocHJvcGVydGllc09iamVjdC5zaGFkb3dNYXAsIFwiZW5hYmxlZFwiKTtcbiAgc2hhZG93Rm9sZGVyLmFkZChwcm9wZXJ0aWVzT2JqZWN0LnNoYWRvd01hcCwgXCJhdXRvVXBkYXRlXCIpO1xuICBzaGFkb3dGb2xkZXIuYWRkKHByb3BlcnRpZXNPYmplY3Quc2hhZG93TWFwLCBcIm5lZWRzVXBkYXRlXCIpO1xuICBzaGFkb3dGb2xkZXJcbiAgICAuYWRkKHByb3BlcnRpZXNPYmplY3Quc2hhZG93TWFwLCBcInR5cGVcIiwgZW51bXMuc2hhZG93TWFwcGluZylcbiAgICAuZW5hYmxlKGZhbHNlKTsgLy8gY2FuJ3QgdXBkYXRlIHRoZSBzaGFkb3cgbWFwcGluZyB0eXBlIGluIHJ1bnRpbWVcblxuICBjb25zdCB0b25lTWFwcGluZ0ZvbGRlciA9IHJlbmRlcmVyRm9sZGVyLmFkZEZvbGRlcihcIlRvbmVNYXBwaW5nXCIpO1xuICB0b25lTWFwcGluZ0ZvbGRlci5hZGQocHJvcGVydGllc09iamVjdC50b25lTWFwcGluZywgXCJleHBvc3VyZVwiLCAwLCAyKTtcbiAgdG9uZU1hcHBpbmdGb2xkZXIuYWRkKFxuICAgIHByb3BlcnRpZXNPYmplY3QudG9uZU1hcHBpbmcsXG4gICAgXCJ0b25lTWFwcGluZ1wiLFxuICAgIGVudW1zLnRvbmVNYXBwaW5nT3B0aW9uc1xuICApO1xuXG4gIGNvbnN0IGNsZWFyU2V0dGluZ3NGb2xkZXIgPSByZW5kZXJlckZvbGRlci5hZGRGb2xkZXIoXCJjbGVhclNldHRpbmdzXCIpO1xuICBjbGVhclNldHRpbmdzRm9sZGVyLmFkZChwcm9wZXJ0aWVzT2JqZWN0LmNsZWFyU2V0dGluZ3MsIFwiYXV0b0NsZWFyXCIpO1xuICBjbGVhclNldHRpbmdzRm9sZGVyLmFkZENvbG9yKHByb3BlcnRpZXNPYmplY3QuY2xlYXJTZXR0aW5ncywgXCJjbGVhckNvbG9yXCIpO1xuXG4gIHJlbmRlcmVyRm9sZGVyLmNsb3NlKCk7XG59O1xuXG5jb25zdCB1cGRhdGVXZWJHTFJlbmRlcmVyUHJvcGVydGllcyA9ICh3ZWJHTFJlbmRlcmVyLCBwcm9wZXJ0eUhvbGRlcikgPT4ge1xuICB3ZWJHTFJlbmRlcmVyLnNoYWRvd01hcC5lbmFibGVkID0gcHJvcGVydHlIb2xkZXIuc2hhZG93TWFwLmVuYWJsZWQ7XG4gIHdlYkdMUmVuZGVyZXIuc2hhZG93TWFwLmF1dG9VcGRhdGUgPSBwcm9wZXJ0eUhvbGRlci5zaGFkb3dNYXAuYXV0b1VwZGF0ZTtcbiAgd2ViR0xSZW5kZXJlci5zaGFkb3dNYXAubmVlZHNVcGRhdGUgPSBwcm9wZXJ0eUhvbGRlci5zaGFkb3dNYXAubmVlZHNVcGRhdGU7XG4gIHdlYkdMUmVuZGVyZXIudG9uZU1hcHBpbmcgPSBwcm9wZXJ0eUhvbGRlci50b25lTWFwcGluZy50b25lTWFwcGluZztcbiAgd2ViR0xSZW5kZXJlci50b25lTWFwcGluZ0V4cG9zdXJlID0gcHJvcGVydHlIb2xkZXIudG9uZU1hcHBpbmcuZXhwb3N1cmU7XG4gIHdlYkdMUmVuZGVyZXIuYXV0b0NsZWFyID0gcHJvcGVydHlIb2xkZXIuY2xlYXJTZXR0aW5ncy5hdXRvQ2xlYXI7XG4gIHdlYkdMUmVuZGVyZXIuc2V0Q2xlYXJDb2xvcihwcm9wZXJ0eUhvbGRlci5jbGVhclNldHRpbmdzLmNsZWFyQ29sb3IpO1xuICB3ZWJHTFJlbmRlcmVyLm91dHB1dEVuY29kaW5nID0gcHJvcGVydHlIb2xkZXIubWFpbi5vdXRwdXRFbmNvZGluZztcblxuICB3ZWJHTFJlbmRlcmVyLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbn07XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcblxuY29uc3QgdGV4dHVyZUxvYWRlciA9IG5ldyBUSFJFRS5UZXh0dXJlTG9hZGVyKClcblxuY29uc3QgcHJvcGVydGllc09iamVjdCA9IChzY2VuZSkgPT4gKHtcbiAgb3ZlcnJpZGVNYXRlcmlhbDoge1xuICAgIHRvZ2dsZTogKCkgPT4ge1xuICAgICAgaWYgKHNjZW5lLm92ZXJyaWRlTWF0ZXJpYWwgIT09IG51bGwpIHtcbiAgICAgICAgc2NlbmUub3ZlcnJpZGVNYXRlcmlhbCA9IG51bGxcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNjZW5lLm92ZXJyaWRlTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaE5vcm1hbE1hdGVyaWFsKClcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGJhY2tHcm91bmQ6ICdXaGl0ZScsXG4gIGVudmlyb25tZW50OiB7XG4gICAgdG9nZ2xlOiAoKSA9PiB7XG4gICAgICBpZiAoc2NlbmUuZW52aXJvbm1lbnQgIT09IG51bGwpIHtcbiAgICAgICAgc2NlbmUuZW52aXJvbm1lbnQgPSBudWxsXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZXh0dXJlTG9hZGVyLmxvYWQoJy9hc3NldHMvZXF1aS5qcGVnJywgKGxvYWRlZCkgPT4ge1xuICAgICAgICAgIGxvYWRlZC5tYXBwaW5nID0gVEhSRUUuRXF1aXJlY3Rhbmd1bGFyUmVmbGVjdGlvbk1hcHBpbmdcbiAgICAgICAgICBzY2VuZS5lbnZpcm9ubWVudCA9IGxvYWRlZFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxufSlcblxuY29uc3QgZm9nUHJvcGVydGllcyA9IChmb2cpID0+ICh7XG4gIGNvbG9yOiAweGZmZmZmZixcbiAgbmVhcjogZm9nLm5lYXIsXG4gIGZhcjogZm9nLmZhclxufSlcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVTY2VuZUNvbnRyb2xzID0gKGd1aSwgc2NlbmUsIGZvZ0VuYWJsZWQsIGlzT3BlbikgPT4ge1xuICBjb25zdCBwcm9wcyA9IHByb3BlcnRpZXNPYmplY3Qoc2NlbmUpXG4gIGNvbnN0IHNjZW5lQ29udHJvbHMgPSBndWkuYWRkRm9sZGVyKCdTY2VuZScpXG5cbiAgc2NlbmVDb250cm9sc1xuICAgIC5hZGQocHJvcHMsICdiYWNrR3JvdW5kJywgWydXaGl0ZScsICdCbGFjaycsICdOdWxsJywgJ0NvbG9yJywgJ1RleHR1cmUnLCAnQ3ViZW1hcCddKVxuICAgIC5vbkNoYW5nZSgoZXZlbnQpID0+IGhhbmRsZUJhY2tncm91bmRDaGFuZ2UoZXZlbnQsIHNjZW5lKSlcbiAgc2NlbmVDb250cm9scy5hZGQocHJvcHMub3ZlcnJpZGVNYXRlcmlhbCwgJ3RvZ2dsZScpLm5hbWUoJ1RvZ2dsZSBPdmVycmlkZSBNYXRlcmlhbCcpXG4gIHNjZW5lQ29udHJvbHMuYWRkKHByb3BzLmVudmlyb25tZW50LCAndG9nZ2xlJykubmFtZSgnVG9nZ2xlIEVudmlyb25tZW50JylcblxuICBpZiAoZm9nRW5hYmxlZCkge1xuICAgIGNvbnN0IGZvZ0NvbG9yID0gbmV3IFRIUkVFLkNvbG9yKDB4ZmZmZmZmKVxuICAgIGNvbnN0IGZvZyA9IG5ldyBUSFJFRS5Gb2coZm9nQ29sb3IsIDEsIDIwKVxuICAgIHNjZW5lLmZvZyA9IGZvZ1xuICAgIGNvbnN0IGZvZ1Byb3BzID0gZm9nUHJvcGVydGllcyhmb2cpXG4gICAgY29uc3QgZm9nQ29udHJvbHMgPSBzY2VuZUNvbnRyb2xzLmFkZEZvbGRlcignRm9nJylcbiAgICBmb2dDb250cm9scy5hZGRDb2xvcihmb2dQcm9wcywgJ2NvbG9yJylcbiAgICBmb2dDb250cm9scy5hZGQoZm9nUHJvcHMsICduZWFyJywgMCwgMTAsIDAuMSlcbiAgICBmb2dDb250cm9scy5hZGQoZm9nUHJvcHMsICdmYXInLCAwLCAxMDAsIDAuMSlcblxuICAgIGZvZ0NvbnRyb2xzLm9uQ2hhbmdlKCgpID0+IHtcbiAgICAgIGZvZy5jb2xvciA9IGZvZ0NvbG9yLnNldEhleChmb2dQcm9wcy5jb2xvcilcbiAgICAgIGZvZy5uZWFyID0gZm9nUHJvcHMubmVhclxuICAgICAgZm9nLmZhciA9IGZvZ1Byb3BzLmZhclxuICAgIH0pXG4gIH1cblxuICBpc09wZW4gPyBzY2VuZUNvbnRyb2xzLm9wZW4oKSA6IHNjZW5lQ29udHJvbHMuY2xvc2UoKVxufVxuXG5jb25zdCBoYW5kbGVCYWNrZ3JvdW5kQ2hhbmdlID0gKHNldHRpbmcsIHNjZW5lKSA9PiB7XG4gIHN3aXRjaCAoc2V0dGluZykge1xuICAgIGNhc2UgJ1doaXRlJzpcbiAgICAgIHNjZW5lLmJhY2tncm91bmQgPSBuZXcgVEhSRUUuQ29sb3IoMHhmZmZmZmYpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ0JsYWNrJzpcbiAgICAgIHNjZW5lLmJhY2tncm91bmQgPSBuZXcgVEhSRUUuQ29sb3IoMHgwMDAwMDApXG4gICAgICBicmVha1xuICAgIGNhc2UgJ051bGwnOlxuICAgICAgc2NlbmUuYmFja2dyb3VuZCA9IG51bGxcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnQ29sb3InOlxuICAgICAgc2NlbmUuYmFja2dyb3VuZCA9IG5ldyBUSFJFRS5Db2xvcigweDQ0ZmY0NClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnVGV4dHVyZSc6XG4gICAgICB0ZXh0dXJlTG9hZGVyLmxvYWQoJy9hc3NldHMvdGV4dHVyZXMvd29vZC9hYnN0cmFjdC1hbnRpcXVlLWJhY2tkcm9wLTE2NDAwNS5qcGcnLCAobG9hZGVkKSA9PiB7XG4gICAgICAgIGxvYWRlZC5lbmNvZGluZyA9IFRIUkVFLnNSR0JFbmNvZGluZ1xuICAgICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbG9hZGVkXG4gICAgICAgIHNjZW5lLmVudmlyb25tZW50ID0gbnVsbFxuICAgICAgfSlcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnQ3ViZW1hcCc6XG4gICAgICB0ZXh0dXJlTG9hZGVyLmxvYWQoJy9hc3NldHMvZXF1aS5qcGVnJywgKGxvYWRlZCkgPT4ge1xuICAgICAgICBsb2FkZWQubWFwcGluZyA9IFRIUkVFLkVxdWlyZWN0YW5ndWxhclJlZmxlY3Rpb25NYXBwaW5nXG4gICAgICAgIHNjZW5lLmJhY2tncm91bmQgPSBsb2FkZWRcbiAgICAgICAgc2NlbmUuZW52aXJvbm1lbnQgPSBsb2FkZWRcbiAgICAgIH0pXG5cbiAgICAgIGJyZWFrXG4gICAgZGVmYXVsdDpcbiAgICAgIGJyZWFrXG4gIH1cbn1cbiIsImV4cG9ydCBjb25zdCB2aXNpdENoaWxkcmVuID0gKG9iamVjdCwgZm4pID0+IHtcbiAgaWYgKG9iamVjdC5jaGlsZHJlbiAmJiBvYmplY3QuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgIGZvciAoY29uc3QgY2hpbGQgb2Ygb2JqZWN0LmNoaWxkcmVuKSB7XG4gICAgICB2aXNpdENoaWxkcmVuKGNoaWxkLCBmbilcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZm4ob2JqZWN0KVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBhcHBseVNoYWRvd3NBbmREZXB0aFdyaXRlID0gKG9iamVjdCkgPT4ge1xuICB2aXNpdENoaWxkcmVuKG9iamVjdCwgKGNoaWxkKSA9PiB7XG4gICAgaWYgKGNoaWxkLm1hdGVyaWFsKSB7XG4gICAgICBjaGlsZC5tYXRlcmlhbC5kZXB0aFdyaXRlID0gdHJ1ZVxuICAgICAgY2hpbGQuY2FzdFNoYWRvdyA9IHRydWVcbiAgICAgIGNoaWxkLnJlY2VpdmVTaGFkb3cgPSB0cnVlXG4gICAgfVxuICB9KVxufVxuXG5leHBvcnQgY29uc3QgZmluZENoaWxkID0gKG9iamVjdCwgbmFtZSkgPT4ge1xuICBpZiAob2JqZWN0LmNoaWxkcmVuICYmIG9iamVjdC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgZm9yIChjb25zdCBjaGlsZCBvZiBvYmplY3QuY2hpbGRyZW4pIHtcbiAgICAgIGlmIChuYW1lID09PSBjaGlsZC5uYW1lKSB7XG4gICAgICAgIHJldHVybiBjaGlsZFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcmVzID0gZmluZENoaWxkKGNoaWxkLCBuYW1lKVxuICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChuYW1lID09PSBvYmplY3QubmFtZSkge1xuICAgICAgcmV0dXJuIG9iamVjdFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgY29uc3Qgb25SZXNpemUgPSAoY2FtZXJhLCByZW5kZXJlcikgPT4ge1xuICBjb25zdCByZXNpemVyID0gKCkgPT4ge1xuICAgIGNhbWVyYS5hc3BlY3QgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodFxuICAgIGNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KClcbiAgICByZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpXG4gIH1cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZXIsIGZhbHNlKVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJza2VsZXRvblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtsdGpzX2ZvdXJ0aFwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtsdGpzX2ZvdXJ0aFwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfYnVpbGRfdGhyZWVfbW9kdWxlX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fY29udHJvbHNfT3JiaXRDb250cm9sc19qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfbGlsLWd1aV9kaXN0X2xpbC1ndWlfZXNtX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fbG9hZGVyc19HTFRGTG9hZGVyX2pzXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTkvc2tlbGV0b24uanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
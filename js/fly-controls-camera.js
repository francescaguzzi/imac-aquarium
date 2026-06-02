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

/***/ "./samples/chapters/chapter-9/fly-controls-camera.js"
/*!***********************************************************!*\
  !*** ./samples/chapters/chapter-9/fly-controls-camera.js ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_standard_scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/standard-scene */ "./samples/chapters/chapter-9/util/standard-scene.js");
/* harmony import */ var three_examples_jsm_loaders_GLTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/loaders/GLTFLoader */ "./node_modules/three/examples/jsm/loaders/GLTFLoader.js");
/* harmony import */ var _util_modelUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/modelUtil */ "./samples/util/modelUtil.js");
/* harmony import */ var three_examples_jsm_controls_FlyControls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/jsm/controls/FlyControls */ "./node_modules/three/examples/jsm/controls/FlyControls.js");





const modelAsync = () => {
  const loader = new three_examples_jsm_loaders_GLTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader()
  return loader.loadAsync('/assets/models/new_york_city_manhattan/scene.gltf').then((structure) => {
    // position scene
    structure.scene.scale.setScalar(5, 5, 5)

    // make sure all cast shadows
    ;(0,_util_modelUtil__WEBPACK_IMPORTED_MODULE_2__.applyShadowsAndDepthWrite)(structure.scene)
    return structure.scene
  })
}

;(0,_util_standard_scene__WEBPACK_IMPORTED_MODULE_0__.bootstrapMeshScene)({
  loadMesh: modelAsync,
  hidefloor: true,
  addControls: (camera, renderer, scene, gui) => {
    const controls = new three_examples_jsm_controls_FlyControls__WEBPACK_IMPORTED_MODULE_3__.FlyControls(camera, renderer.domElement)

    const folder = gui.addFolder('First Person Controls')
    folder.add(controls, 'dragToLook')
    folder.add(controls, 'autoForward')
    folder.add(controls, 'movementSpeed', 0, 10, 0.1)
    folder.add(controls, 'rollSpeed', 0, 1, 0.1)
    return controls
  },
  onRender: (clock, controls) => {
    controls.update(clock.getDelta())
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


/***/ },

/***/ "./node_modules/three/examples/jsm/controls/FlyControls.js"
/*!*****************************************************************!*\
  !*** ./node_modules/three/examples/jsm/controls/FlyControls.js ***!
  \*****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FlyControls: () => (/* binding */ FlyControls)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");


const _changeEvent = { type: 'change' };

class FlyControls extends three__WEBPACK_IMPORTED_MODULE_0__.EventDispatcher {

	constructor( object, domElement ) {

		super();

		if ( domElement === undefined ) {

			console.warn( 'THREE.FlyControls: The second parameter "domElement" is now mandatory.' );
			domElement = document;

		}

		this.object = object;
		this.domElement = domElement;

		// API

		this.movementSpeed = 1.0;
		this.rollSpeed = 0.005;

		this.dragToLook = false;
		this.autoForward = false;

		// disable default target object behavior

		// internals

		const scope = this;

		const EPS = 0.000001;

		const lastQuaternion = new three__WEBPACK_IMPORTED_MODULE_0__.Quaternion();
		const lastPosition = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();

		this.tmpQuaternion = new three__WEBPACK_IMPORTED_MODULE_0__.Quaternion();

		this.mouseStatus = 0;

		this.moveState = { up: 0, down: 0, left: 0, right: 0, forward: 0, back: 0, pitchUp: 0, pitchDown: 0, yawLeft: 0, yawRight: 0, rollLeft: 0, rollRight: 0 };
		this.moveVector = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3( 0, 0, 0 );
		this.rotationVector = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3( 0, 0, 0 );

		this.keydown = function ( event ) {

			if ( event.altKey ) {

				return;

			}

			switch ( event.code ) {

				case 'ShiftLeft':
				case 'ShiftRight': this.movementSpeedMultiplier = .1; break;

				case 'KeyW': this.moveState.forward = 1; break;
				case 'KeyS': this.moveState.back = 1; break;

				case 'KeyA': this.moveState.left = 1; break;
				case 'KeyD': this.moveState.right = 1; break;

				case 'KeyR': this.moveState.up = 1; break;
				case 'KeyF': this.moveState.down = 1; break;

				case 'ArrowUp': this.moveState.pitchUp = 1; break;
				case 'ArrowDown': this.moveState.pitchDown = 1; break;

				case 'ArrowLeft': this.moveState.yawLeft = 1; break;
				case 'ArrowRight': this.moveState.yawRight = 1; break;

				case 'KeyQ': this.moveState.rollLeft = 1; break;
				case 'KeyE': this.moveState.rollRight = 1; break;

			}

			this.updateMovementVector();
			this.updateRotationVector();

		};

		this.keyup = function ( event ) {

			switch ( event.code ) {

				case 'ShiftLeft':
				case 'ShiftRight': this.movementSpeedMultiplier = 1; break;

				case 'KeyW': this.moveState.forward = 0; break;
				case 'KeyS': this.moveState.back = 0; break;

				case 'KeyA': this.moveState.left = 0; break;
				case 'KeyD': this.moveState.right = 0; break;

				case 'KeyR': this.moveState.up = 0; break;
				case 'KeyF': this.moveState.down = 0; break;

				case 'ArrowUp': this.moveState.pitchUp = 0; break;
				case 'ArrowDown': this.moveState.pitchDown = 0; break;

				case 'ArrowLeft': this.moveState.yawLeft = 0; break;
				case 'ArrowRight': this.moveState.yawRight = 0; break;

				case 'KeyQ': this.moveState.rollLeft = 0; break;
				case 'KeyE': this.moveState.rollRight = 0; break;

			}

			this.updateMovementVector();
			this.updateRotationVector();

		};

		this.mousedown = function ( event ) {

			if ( this.dragToLook ) {

				this.mouseStatus ++;

			} else {

				switch ( event.button ) {

					case 0: this.moveState.forward = 1; break;
					case 2: this.moveState.back = 1; break;

				}

				this.updateMovementVector();

			}

		};

		this.mousemove = function ( event ) {

			if ( ! this.dragToLook || this.mouseStatus > 0 ) {

				const container = this.getContainerDimensions();
				const halfWidth = container.size[ 0 ] / 2;
				const halfHeight = container.size[ 1 ] / 2;

				this.moveState.yawLeft = - ( ( event.pageX - container.offset[ 0 ] ) - halfWidth ) / halfWidth;
				this.moveState.pitchDown = ( ( event.pageY - container.offset[ 1 ] ) - halfHeight ) / halfHeight;

				this.updateRotationVector();

			}

		};

		this.mouseup = function ( event ) {

			if ( this.dragToLook ) {

				this.mouseStatus --;

				this.moveState.yawLeft = this.moveState.pitchDown = 0;

			} else {

				switch ( event.button ) {

					case 0: this.moveState.forward = 0; break;
					case 2: this.moveState.back = 0; break;

				}

				this.updateMovementVector();

			}

			this.updateRotationVector();

		};

		this.update = function ( delta ) {

			const moveMult = delta * scope.movementSpeed;
			const rotMult = delta * scope.rollSpeed;

			scope.object.translateX( scope.moveVector.x * moveMult );
			scope.object.translateY( scope.moveVector.y * moveMult );
			scope.object.translateZ( scope.moveVector.z * moveMult );

			scope.tmpQuaternion.set( scope.rotationVector.x * rotMult, scope.rotationVector.y * rotMult, scope.rotationVector.z * rotMult, 1 ).normalize();
			scope.object.quaternion.multiply( scope.tmpQuaternion );

			if (
				lastPosition.distanceToSquared( scope.object.position ) > EPS ||
				8 * ( 1 - lastQuaternion.dot( scope.object.quaternion ) ) > EPS
			) {

				scope.dispatchEvent( _changeEvent );
				lastQuaternion.copy( scope.object.quaternion );
				lastPosition.copy( scope.object.position );

			}

		};

		this.updateMovementVector = function () {

			const forward = ( this.moveState.forward || ( this.autoForward && ! this.moveState.back ) ) ? 1 : 0;

			this.moveVector.x = ( - this.moveState.left + this.moveState.right );
			this.moveVector.y = ( - this.moveState.down + this.moveState.up );
			this.moveVector.z = ( - forward + this.moveState.back );

			//console.log( 'move:', [ this.moveVector.x, this.moveVector.y, this.moveVector.z ] );

		};

		this.updateRotationVector = function () {

			this.rotationVector.x = ( - this.moveState.pitchDown + this.moveState.pitchUp );
			this.rotationVector.y = ( - this.moveState.yawRight + this.moveState.yawLeft );
			this.rotationVector.z = ( - this.moveState.rollRight + this.moveState.rollLeft );

			//console.log( 'rotate:', [ this.rotationVector.x, this.rotationVector.y, this.rotationVector.z ] );

		};

		this.getContainerDimensions = function () {

			if ( this.domElement != document ) {

				return {
					size: [ this.domElement.offsetWidth, this.domElement.offsetHeight ],
					offset: [ this.domElement.offsetLeft, this.domElement.offsetTop ]
				};

			} else {

				return {
					size: [ window.innerWidth, window.innerHeight ],
					offset: [ 0, 0 ]
				};

			}

		};

		this.dispose = function () {

			this.domElement.removeEventListener( 'contextmenu', contextmenu );
			this.domElement.removeEventListener( 'mousedown', _mousedown );
			this.domElement.removeEventListener( 'mousemove', _mousemove );
			this.domElement.removeEventListener( 'mouseup', _mouseup );

			window.removeEventListener( 'keydown', _keydown );
			window.removeEventListener( 'keyup', _keyup );

		};

		const _mousemove = this.mousemove.bind( this );
		const _mousedown = this.mousedown.bind( this );
		const _mouseup = this.mouseup.bind( this );
		const _keydown = this.keydown.bind( this );
		const _keyup = this.keyup.bind( this );

		this.domElement.addEventListener( 'contextmenu', contextmenu );

		this.domElement.addEventListener( 'mousemove', _mousemove );
		this.domElement.addEventListener( 'mousedown', _mousedown );
		this.domElement.addEventListener( 'mouseup', _mouseup );

		window.addEventListener( 'keydown', _keydown );
		window.addEventListener( 'keyup', _keyup );

		this.updateMovementVector();
		this.updateRotationVector();

	}

}

function contextmenu( event ) {

	event.preventDefault();

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
/******/ 			"fly-controls-camera": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","vendors-node_modules_three_examples_jsm_loaders_GLTFLoader_js"], () => (__webpack_require__("./samples/chapters/chapter-9/fly-controls-camera.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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anMtZm91cnRoLy4vc2FtcGxlcy9ib290c3RyYXAvYm9vdHN0cmFwLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9ib290c3RyYXAvZmxvb3IuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2Jvb3RzdHJhcC9saWdodGluZy5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci05L2ZseS1jb250cm9scy1jYW1lcmEuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItOS91dGlsL3N0YW5kYXJkLXNjZW5lLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jb250cm9sbGVyL29yYml0LWNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NvbnRyb2xzL3JlbmRlcmVyLWNvbnRyb2wuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NvbnRyb2xzL3NjZW5lLWNvbnRyb2xzLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy91dGlsL21vZGVsVXRpbC5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvdXRpbC91cGRhdGUtb24tcmVzaXplLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vbm9kZV9tb2R1bGVzL3RocmVlL2V4YW1wbGVzL2pzbS9jb250cm9scy9GbHlDb250cm9scy5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuaW1wb3J0IHsgaW5pdE9yYml0Q29udHJvbHMgfSBmcm9tICcuLi9jb250cm9sbGVyL29yYml0LWNvbnRyb2xsZXInXG5pbXBvcnQgeyBpbml0TGlnaHRpbmcgfSBmcm9tICcuL2xpZ2h0aW5nJ1xuaW1wb3J0IHsgb25SZXNpemUgfSBmcm9tICcuLi91dGlsL3VwZGF0ZS1vbi1yZXNpemUnXG5cbmV4cG9ydCBjb25zdCBpbml0U2NlbmUgPSAoeyBiYWNrZ3JvdW5kQ29sb3IsIGZvZ0NvbG9yLCBkaXNhYmxlU2hhZG93cywgZGlzYWJsZUxpZ2h0cywgZGlzYWJsZURlZmF1bHRDb250cm9scyB9KSA9PiB7XG4gIGNvbnN0IGluaXQgPSAoZm4pID0+IHtcbiAgICAvLyBiYXNpYyBzY2VuZSBzZXR1cFxuICAgIGNvbnN0IHNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKClcbiAgICBpZiAoYmFja2dyb3VuZENvbG9yKSB7XG4gICAgICBzY2VuZS5iYWNrZ3JvdW5kQ29sb3IgPSBiYWNrZ3JvdW5kQ29sb3JcbiAgICB9XG5cbiAgICBpZiAoZm9nQ29sb3IpIHtcbiAgICAgIHNjZW5lLmZvZyA9IG5ldyBUSFJFRS5Gb2coZm9nQ29sb3IsIDAuMDAyNSwgNTApXG4gICAgfVxuXG4gICAgLy8gc2V0dXAgY2FtZXJhIGFuZCBiYXNpYyByZW5kZXJlclxuICAgIGNvbnN0IGNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg3NSwgd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQsIDAuMSwgMTAwMClcbiAgICBjb25zdCByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHsgYW50aWFsaWFzOiB0cnVlIH0pXG4gICAgcmVuZGVyZXIub3V0cHV0RW5jb2RpbmcgPSBUSFJFRS5zUkdCRW5jb2RpbmdcbiAgICByZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IHRydWVcbiAgICByZW5kZXJlci5zaGFkb3dNYXAudHlwZSA9IFRIUkVFLlZTTVNoYWRvd01hcFxuICAgIHJlbmRlcmVyLnNldENsZWFyQ29sb3IoYmFja2dyb3VuZENvbG9yKVxuXG4gICAgb25SZXNpemUoY2FtZXJhLCByZW5kZXJlcilcbiAgICByZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci5kb21FbGVtZW50KVxuXG4gICAgLy8gaW5pdGlhbGl6ZSBvcmJpdCBjb250cm9sc1xuICAgIGxldCBvcmJpdENvbnRyb2xzXG4gICAgaWYgKCFkaXNhYmxlRGVmYXVsdENvbnRyb2xzKSB7XG4gICAgICBvcmJpdENvbnRyb2xzID0gaW5pdE9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlcilcbiAgICB9XG5cbiAgICAvLyBhZGQgc29tZSBiYXNpYyBsaWdodGluZyB0byB0aGUgc2NlbmVcbiAgICBpZiAoIWRpc2FibGVMaWdodHMgPz8gZmFsc2UpIHtcbiAgICAgIGluaXRMaWdodGluZyhzY2VuZSwgeyBkaXNhYmxlU2hhZG93cyB9KVxuICAgIH1cblxuICAgIGZuKHsgc2NlbmUsIGNhbWVyYSwgcmVuZGVyZXIsIG9yYml0Q29udHJvbHMgfSlcbiAgfVxuXG4gIHJldHVybiBpbml0XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcblxuZXhwb3J0IGNvbnN0IGZvcmV2ZXJQbGFuZSA9IChzY2VuZSkgPT4ge1xuICBjb25zdCBnZW8gPSBuZXcgVEhSRUUuUGxhbmVCdWZmZXJHZW9tZXRyeSgxMDAwMCwgMTAwMDApXG4gIGNvbnN0IG1hdCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHtcbiAgICBjb2xvcjogMHhmZmZmZmZcbiAgfSlcbiAgY29uc3QgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlbywgbWF0KVxuICBtZXNoLnBvc2l0aW9uLnNldCgwLCAtMiwgMClcbiAgbWVzaC5yb3RhdGlvbi5zZXQoTWF0aC5QSSAvIC0yLCAwLCAwKVxuICBtZXNoLnJlY2VpdmVTaGFkb3cgPSB0cnVlXG4gIG1lc2gubmFtZSA9ICdmb3JldmVyLWZsb29yJ1xuICBzY2VuZS5hZGQobWVzaClcblxuICByZXR1cm4gbWVzaFxufVxuXG5leHBvcnQgY29uc3QgZmxvYXRpbmdGbG9vciA9IChzY2VuZSwgc2l6ZSkgPT4ge1xuICBjb25zdCBzID0gc2l6ZSA/IHNpemUgOiA2XG4gIGNvbnN0IGdlbyA9IG5ldyBUSFJFRS5Cb3hCdWZmZXJHZW9tZXRyeShzLCAwLjI1LCBzLCAxMCwgMTAsIDEwKVxuICBjb25zdCBtYXQgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoe1xuICAgIGNvbG9yOiAweGRkZGRkZFxuICB9KVxuICBjb25zdCBtZXNoID0gbmV3IFRIUkVFLk1lc2goZ2VvLCBtYXQpXG4gIG1lc2gucG9zaXRpb24uc2V0KDAsIC0yLCAtMSlcbiAgbWVzaC5yZWNlaXZlU2hhZG93ID0gdHJ1ZVxuICBtZXNoLm5hbWUgPSAnZmxvYXRpbmctZmxvb3InXG4gIHNjZW5lLmFkZChtZXNoKVxuXG4gIHJldHVybiBtZXNoXG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcblxuZXhwb3J0IGNvbnN0IGluaXRMaWdodGluZyA9IChzY2VuZSwgeyBkaXNhYmxlU2hhZG93cyB9KSA9PiB7XG4gIC8vIGh0dHBzOi8vdGhyZWVqcy5vcmcvZXhhbXBsZXMvP3E9c2hhZG8jd2ViZ2xfc2hhZG93bWFwX3ZzbVxuICBzY2VuZS5hZGQobmV3IFRIUkVFLkFtYmllbnRMaWdodCgweDY2NjY2NikpXG5cbiAgLy8gY29uc3QgZGlyTGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGFhYWFhYSlcbiAgY29uc3QgZGlyTGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGFhYWFhYSlcbiAgZGlyTGlnaHQucG9zaXRpb24uc2V0KDUsIDEyLCA4KVxuICBkaXJMaWdodC5jYXN0U2hhZG93ID0gIWRpc2FibGVTaGFkb3dzID8gdHJ1ZSA6IGZhbHNlXG4gIGRpckxpZ2h0LmludGVuc2l0eSA9IDFcbiAgZGlyTGlnaHQuc2hhZG93LmNhbWVyYS5uZWFyID0gMC4xXG4gIGRpckxpZ2h0LnNoYWRvdy5jYW1lcmEuZmFyID0gMjAwXG4gIGRpckxpZ2h0LnNoYWRvdy5jYW1lcmEucmlnaHQgPSAxMFxuICBkaXJMaWdodC5zaGFkb3cuY2FtZXJhLmxlZnQgPSAtMTBcbiAgZGlyTGlnaHQuc2hhZG93LmNhbWVyYS50b3AgPSAxMFxuICBkaXJMaWdodC5zaGFkb3cuY2FtZXJhLmJvdHRvbSA9IC0xMFxuICBkaXJMaWdodC5zaGFkb3cubWFwU2l6ZS53aWR0aCA9IDIwNDhcbiAgZGlyTGlnaHQuc2hhZG93Lm1hcFNpemUuaGVpZ2h0ID0gMjA0OFxuICBkaXJMaWdodC5zaGFkb3cucmFkaXVzID0gNFxuICBkaXJMaWdodC5zaGFkb3cuYmlhcyA9IC0wLjAwMDA1XG5cbiAgc2NlbmUuYWRkKGRpckxpZ2h0KVxufVxuIiwiaW1wb3J0IHsgYm9vdHN0cmFwTWVzaFNjZW5lIH0gZnJvbSAnLi91dGlsL3N0YW5kYXJkLXNjZW5lJ1xuaW1wb3J0IHsgR0xURkxvYWRlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0dMVEZMb2FkZXInXG5pbXBvcnQgeyBhcHBseVNoYWRvd3NBbmREZXB0aFdyaXRlIH0gZnJvbSAnLi4vLi4vdXRpbC9tb2RlbFV0aWwnXG5pbXBvcnQgeyBGbHlDb250cm9scyB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9jb250cm9scy9GbHlDb250cm9scydcblxuY29uc3QgbW9kZWxBc3luYyA9ICgpID0+IHtcbiAgY29uc3QgbG9hZGVyID0gbmV3IEdMVEZMb2FkZXIoKVxuICByZXR1cm4gbG9hZGVyLmxvYWRBc3luYygnL2Fzc2V0cy9tb2RlbHMvbmV3X3lvcmtfY2l0eV9tYW5oYXR0YW4vc2NlbmUuZ2x0ZicpLnRoZW4oKHN0cnVjdHVyZSkgPT4ge1xuICAgIC8vIHBvc2l0aW9uIHNjZW5lXG4gICAgc3RydWN0dXJlLnNjZW5lLnNjYWxlLnNldFNjYWxhcig1LCA1LCA1KVxuXG4gICAgLy8gbWFrZSBzdXJlIGFsbCBjYXN0IHNoYWRvd3NcbiAgICBhcHBseVNoYWRvd3NBbmREZXB0aFdyaXRlKHN0cnVjdHVyZS5zY2VuZSlcbiAgICByZXR1cm4gc3RydWN0dXJlLnNjZW5lXG4gIH0pXG59XG5cbmJvb3RzdHJhcE1lc2hTY2VuZSh7XG4gIGxvYWRNZXNoOiBtb2RlbEFzeW5jLFxuICBoaWRlZmxvb3I6IHRydWUsXG4gIGFkZENvbnRyb2xzOiAoY2FtZXJhLCByZW5kZXJlciwgc2NlbmUsIGd1aSkgPT4ge1xuICAgIGNvbnN0IGNvbnRyb2xzID0gbmV3IEZseUNvbnRyb2xzKGNhbWVyYSwgcmVuZGVyZXIuZG9tRWxlbWVudClcblxuICAgIGNvbnN0IGZvbGRlciA9IGd1aS5hZGRGb2xkZXIoJ0ZpcnN0IFBlcnNvbiBDb250cm9scycpXG4gICAgZm9sZGVyLmFkZChjb250cm9scywgJ2RyYWdUb0xvb2snKVxuICAgIGZvbGRlci5hZGQoY29udHJvbHMsICdhdXRvRm9yd2FyZCcpXG4gICAgZm9sZGVyLmFkZChjb250cm9scywgJ21vdmVtZW50U3BlZWQnLCAwLCAxMCwgMC4xKVxuICAgIGZvbGRlci5hZGQoY29udHJvbHMsICdyb2xsU3BlZWQnLCAwLCAxLCAwLjEpXG4gICAgcmV0dXJuIGNvbnRyb2xzXG4gIH0sXG4gIG9uUmVuZGVyOiAoY2xvY2ssIGNvbnRyb2xzKSA9PiB7XG4gICAgY29udHJvbHMudXBkYXRlKGNsb2NrLmdldERlbHRhKCkpXG4gIH1cbn0pLnRoZW4oKVxuIiwiaW1wb3J0IHsgaW5pdFNjZW5lIH0gZnJvbSAnLi4vLi4vLi4vYm9vdHN0cmFwL2Jvb3RzdHJhcCdcbmltcG9ydCB7IGludGlhbGl6ZVJlbmRlcmVyQ29udHJvbHMgfSBmcm9tICcuLi8uLi8uLi9jb250cm9scy9yZW5kZXJlci1jb250cm9sJ1xuXG5pbXBvcnQgR1VJIGZyb20gJ2xpbC1ndWknXG5pbXBvcnQgeyBpbml0aWFsaXplU2NlbmVDb250cm9scyB9IGZyb20gJy4uLy4uLy4uL2NvbnRyb2xzL3NjZW5lLWNvbnRyb2xzJ1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5pbXBvcnQgeyBmbG9hdGluZ0Zsb29yIH0gZnJvbSAnLi4vLi4vLi4vYm9vdHN0cmFwL2Zsb29yJ1xuXG5leHBvcnQgY29uc3QgYm9vdHN0cmFwTWVzaFNjZW5lID0gYXN5bmMgKHtcbiAgbG9hZE1lc2gsXG4gIHByb3ZpZGVHdWksXG4gIGhpZGVmbG9vcixcbiAgZmxvb3JTaXplLFxuICBiYWNrZ3JvdW5kQ29sb3IsXG4gIG9uUmVuZGVyLFxuICBhZGRDb250cm9sc1xufSkgPT4ge1xuICBjb25zdCBwcm9wcyA9IHtcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IGJhY2tncm91bmRDb2xvciA/PyAweGZmZmZmZixcbiAgICBkaXNhYmxlRGVmYXVsdENvbnRyb2xzOiB0cnVlXG4gIH1cblxuICBjb25zdCBtZXNoID0gYXdhaXQgbG9hZE1lc2goKVxuXG4gIGNvbnN0IGd1aSA9IG5ldyBHVUkoKVxuICBjb25zdCBjbG9jayA9IG5ldyBUSFJFRS5DbG9jaygpXG5cbiAgY29uc3QgaW5pdCA9IGFzeW5jICgpID0+IHtcbiAgICBpbml0U2NlbmUocHJvcHMpKCh7IHNjZW5lLCBjYW1lcmEsIHJlbmRlcmVyIH0pID0+IHtcbiAgICAgIHJlbmRlcmVyLnNoYWRvd01hcC50eXBlID0gVEhSRUUuUENGU29mdFNoYWRvd01hcFxuICAgICAgY2FtZXJhLnBvc2l0aW9uLnggPSAtM1xuICAgICAgY2FtZXJhLnBvc2l0aW9uLnogPSA4XG4gICAgICBjYW1lcmEucG9zaXRpb24ueSA9IDJcblxuICAgICAgaGlkZWZsb29yID8/IGZsb2F0aW5nRmxvb3Ioc2NlbmUsIGZsb29yU2l6ZSA/PyA4KVxuXG4gICAgICBpZiAobWVzaCkgc2NlbmUuYWRkKG1lc2gpXG5cbiAgICAgIGludGlhbGl6ZVJlbmRlcmVyQ29udHJvbHMoZ3VpLCByZW5kZXJlcilcbiAgICAgIGluaXRpYWxpemVTY2VuZUNvbnRyb2xzKGd1aSwgc2NlbmUsIGZhbHNlKVxuXG4gICAgICBpZiAocHJvdmlkZUd1aSkgcHJvdmlkZUd1aShndWksIG1lc2gsIHNjZW5lKVxuICAgICAgbGV0IGNvbnRyb2xzID0gdW5kZWZpbmVkXG4gICAgICBpZiAoYWRkQ29udHJvbHMpIHtcbiAgICAgICAgY29udHJvbHMgPSBhZGRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLCBzY2VuZSwgZ3VpLCBtZXNoKVxuICAgICAgfVxuXG4gICAgICBhbmltYXRlKClcblxuICAgICAgZnVuY3Rpb24gYW5pbWF0ZSgpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpXG4gICAgICAgIHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhKVxuICAgICAgICBpZiAob25SZW5kZXIpIG9uUmVuZGVyKGNsb2NrLCBjb250cm9scywgY2FtZXJhLCBzY2VuZSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgaW5pdCgpLnRoZW4oKVxufVxuIiwiaW1wb3J0IHsgT3JiaXRDb250cm9scyB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9jb250cm9scy9PcmJpdENvbnRyb2xzJ1xuXG5leHBvcnQgY29uc3QgaW5pdE9yYml0Q29udHJvbHMgPSAoY2FtZXJhLCByZW5kZXJlcikgPT4ge1xuICBjb25zdCBjb250cm9sbGVyID0gbmV3IE9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlci5kb21FbGVtZW50KVxuICBjb250cm9sbGVyLmVuYWJsZURhbXBpbmcgPSB0cnVlXG4gIGNvbnRyb2xsZXIuZGFtcGluZ0ZhY3RvciA9IDAuMDVcbiAgY29udHJvbGxlci5taW5EaXN0YW5jZSA9IDFcbiAgY29udHJvbGxlci5tYXhEaXN0YW5jZSA9IDEwMFxuICBjb250cm9sbGVyLm1pblBvbGFyQW5nbGUgPSBNYXRoLlBJIC8gNFxuICBjb250cm9sbGVyLm1heFBvbGFyQW5nbGUgPSAoMyAqIE1hdGguUEkpIC8gNFxuXG4gIHJldHVybiBjb250cm9sbGVyXG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcblxuY29uc3QgZW51bXMgPSB7XG4gIHRvbmVNYXBwaW5nT3B0aW9uczoge1xuICAgIE5vbmU6IFRIUkVFLk5vVG9uZU1hcHBpbmcsXG4gICAgTGluZWFyOiBUSFJFRS5MaW5lYXJUb25lTWFwcGluZyxcbiAgICBSZWluaGFyZDogVEhSRUUuUmVpbmhhcmRUb25lTWFwcGluZyxcbiAgICBDaW5lb246IFRIUkVFLkNpbmVvblRvbmVNYXBwaW5nLFxuICAgIEFDRVNGaWxtaWM6IFRIUkVFLkFDRVNGaWxtaWNUb25lTWFwcGluZyxcbiAgICBDdXN0b206IFRIUkVFLkN1c3RvbVRvbmVNYXBwaW5nLFxuICB9LFxuICBzaGFkb3dNYXBwaW5nOiB7XG4gICAgQmFzaWM6IFRIUkVFLkJhc2ljU2hhZG93TWFwLFxuICAgIFBDRlM6IFRIUkVFLlBDRlNoYWRvd01hcCxcbiAgICBQQ0ZTb2Z0OiBUSFJFRS5QQ0ZTb2Z0U2hhZG93TWFwLFxuICAgIFZTTTogVEhSRUUuVlNNU2hhZG93TWFwLFxuICB9LFxuICBvdXRwdXRFbmNvZGluZ3M6IHtcbiAgICBMaW5lYXI6IFRIUkVFLkxpbmVhckVuY29kaW5nLFxuICAgIHNSR0I6IFRIUkVFLnNSR0JFbmNvZGluZyxcbiAgfSxcbn07XG5cbmNvbnN0IGdldFByb3BlcnR5SG9sZGVyID0gKHdlYkdMUmVuZGVyZXIpID0+IHtcbiAgY29uc3QgY2xlYXJDb2xvckhvbGRlciA9IG5ldyBUSFJFRS5Db2xvcigpO1xuICB3ZWJHTFJlbmRlcmVyLmdldENsZWFyQ29sb3IoY2xlYXJDb2xvckhvbGRlcik7XG5cbiAgY29uc3QgaG9sZGVyID0ge1xuICAgIG1haW46IHtcbiAgICAgIG91dHB1dEVuY29kaW5nOiB3ZWJHTFJlbmRlcmVyLm91dHB1dEVuY29kaW5nLFxuICAgIH0sXG4gICAgc2hhZG93TWFwOiB7XG4gICAgICBlbmFibGVkOiB3ZWJHTFJlbmRlcmVyLnNoYWRvd01hcC5lbmFibGVkLFxuICAgICAgYXV0b1VwZGF0ZTogd2ViR0xSZW5kZXJlci5zaGFkb3dNYXAuYXV0b1VwZGF0ZSxcbiAgICAgIG5lZWRzVXBkYXRlOiAoKSA9PiAod2ViR0xSZW5kZXJlci5zaGFkb3dNYXAubmVlZHNVcGRhdGUgPSB0cnVlKSxcbiAgICAgIHR5cGU6IHdlYkdMUmVuZGVyZXIuc2hhZG93TWFwLnR5cGUsXG4gICAgfSxcbiAgICB0b25lTWFwcGluZzoge1xuICAgICAgZXhwb3N1cmU6IHdlYkdMUmVuZGVyZXIudG9uZU1hcHBpbmdFeHBvc3VyZSxcbiAgICAgIHRvbmVNYXBwaW5nOiB3ZWJHTFJlbmRlcmVyLnRvbmVNYXBwaW5nLFxuICAgIH0sXG4gICAgY2xlYXJTZXR0aW5nczoge1xuICAgICAgYXV0b0NsZWFyOiB3ZWJHTFJlbmRlcmVyLmF1dG9DbGVhcixcbiAgICAgIGNsZWFyQ29sb3I6IGNsZWFyQ29sb3JIb2xkZXIuZ2V0U3R5bGUoKSxcbiAgICB9LFxuICAgIGFkdmFuY2VkOiB7XG4gICAgICBhdXRvQ2xlYXJEZXB0aDogd2ViR0xSZW5kZXJlci5hdXRvQ2xlYXJEZXB0aCxcbiAgICAgIGF1dG9DbGVhclN0ZW5jaWw6IHdlYkdMUmVuZGVyZXIuYXV0b0NsZWFyU3RlbmNpbCxcbiAgICAgIGNoZWNrU2hhZGVyRXJyb3JzOiB3ZWJHTFJlbmRlcmVyLmRlYnVnLmNoZWNrU2hhZGVyRXJyb3JzLFxuICAgICAgc29ydE9iamVjdHM6IHdlYkdMUmVuZGVyZXIuc29ydE9iamVjdHMsXG4gICAgICBsb2NhbENsaXBwaW5nRW5hYmxlZDogd2ViR0xSZW5kZXJlci5sb2NhbENsaXBwaW5nRW5hYmxlZCxcbiAgICAgIHBoeXNpY2FsbHlDb3JyZWN0TGlnaHRzOiB3ZWJHTFJlbmRlcmVyLnBoeXNpY2FsbHlDb3JyZWN0TGlnaHRzLFxuICAgIH0sXG4gIH07XG5cbiAgcmV0dXJuIGhvbGRlcjtcbn07XG5cbmV4cG9ydCBjb25zdCBpbnRpYWxpemVSZW5kZXJlckNvbnRyb2xzID0gKGd1aSwgd2ViR0xSZW5kZXJlcikgPT4ge1xuICBjb25zdCBwcm9wZXJ0aWVzT2JqZWN0ID0gZ2V0UHJvcGVydHlIb2xkZXIod2ViR0xSZW5kZXJlcik7XG4gIGNvbnN0IHJlbmRlcmVyRm9sZGVyID0gZ3VpLmFkZEZvbGRlcihcIldlYkdMUmVuZGVyZXJcIik7XG5cbiAgcmVuZGVyZXJGb2xkZXIub25DaGFuZ2UoKF8pID0+IHtcbiAgICB1cGRhdGVXZWJHTFJlbmRlcmVyUHJvcGVydGllcyh3ZWJHTFJlbmRlcmVyLCBwcm9wZXJ0aWVzT2JqZWN0KTtcbiAgfSk7XG5cbiAgcmVuZGVyZXJGb2xkZXIuYWRkKFxuICAgIHByb3BlcnRpZXNPYmplY3QubWFpbixcbiAgICBcIm91dHB1dEVuY29kaW5nXCIsXG4gICAgZW51bXMub3V0cHV0RW5jb2RpbmdzXG4gICk7XG5cbiAgY29uc3Qgc2hhZG93Rm9sZGVyID0gcmVuZGVyZXJGb2xkZXIuYWRkRm9sZGVyKFwiU2hhZG93XCIpO1xuICBzaGFkb3dGb2xkZXIuYWRkKHByb3BlcnRpZXNPYmplY3Quc2hhZG93TWFwLCBcImVuYWJsZWRcIik7XG4gIHNoYWRvd0ZvbGRlci5hZGQocHJvcGVydGllc09iamVjdC5zaGFkb3dNYXAsIFwiYXV0b1VwZGF0ZVwiKTtcbiAgc2hhZG93Rm9sZGVyLmFkZChwcm9wZXJ0aWVzT2JqZWN0LnNoYWRvd01hcCwgXCJuZWVkc1VwZGF0ZVwiKTtcbiAgc2hhZG93Rm9sZGVyXG4gICAgLmFkZChwcm9wZXJ0aWVzT2JqZWN0LnNoYWRvd01hcCwgXCJ0eXBlXCIsIGVudW1zLnNoYWRvd01hcHBpbmcpXG4gICAgLmVuYWJsZShmYWxzZSk7IC8vIGNhbid0IHVwZGF0ZSB0aGUgc2hhZG93IG1hcHBpbmcgdHlwZSBpbiBydW50aW1lXG5cbiAgY29uc3QgdG9uZU1hcHBpbmdGb2xkZXIgPSByZW5kZXJlckZvbGRlci5hZGRGb2xkZXIoXCJUb25lTWFwcGluZ1wiKTtcbiAgdG9uZU1hcHBpbmdGb2xkZXIuYWRkKHByb3BlcnRpZXNPYmplY3QudG9uZU1hcHBpbmcsIFwiZXhwb3N1cmVcIiwgMCwgMik7XG4gIHRvbmVNYXBwaW5nRm9sZGVyLmFkZChcbiAgICBwcm9wZXJ0aWVzT2JqZWN0LnRvbmVNYXBwaW5nLFxuICAgIFwidG9uZU1hcHBpbmdcIixcbiAgICBlbnVtcy50b25lTWFwcGluZ09wdGlvbnNcbiAgKTtcblxuICBjb25zdCBjbGVhclNldHRpbmdzRm9sZGVyID0gcmVuZGVyZXJGb2xkZXIuYWRkRm9sZGVyKFwiY2xlYXJTZXR0aW5nc1wiKTtcbiAgY2xlYXJTZXR0aW5nc0ZvbGRlci5hZGQocHJvcGVydGllc09iamVjdC5jbGVhclNldHRpbmdzLCBcImF1dG9DbGVhclwiKTtcbiAgY2xlYXJTZXR0aW5nc0ZvbGRlci5hZGRDb2xvcihwcm9wZXJ0aWVzT2JqZWN0LmNsZWFyU2V0dGluZ3MsIFwiY2xlYXJDb2xvclwiKTtcblxuICByZW5kZXJlckZvbGRlci5jbG9zZSgpO1xufTtcblxuY29uc3QgdXBkYXRlV2ViR0xSZW5kZXJlclByb3BlcnRpZXMgPSAod2ViR0xSZW5kZXJlciwgcHJvcGVydHlIb2xkZXIpID0+IHtcbiAgd2ViR0xSZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IHByb3BlcnR5SG9sZGVyLnNoYWRvd01hcC5lbmFibGVkO1xuICB3ZWJHTFJlbmRlcmVyLnNoYWRvd01hcC5hdXRvVXBkYXRlID0gcHJvcGVydHlIb2xkZXIuc2hhZG93TWFwLmF1dG9VcGRhdGU7XG4gIHdlYkdMUmVuZGVyZXIuc2hhZG93TWFwLm5lZWRzVXBkYXRlID0gcHJvcGVydHlIb2xkZXIuc2hhZG93TWFwLm5lZWRzVXBkYXRlO1xuICB3ZWJHTFJlbmRlcmVyLnRvbmVNYXBwaW5nID0gcHJvcGVydHlIb2xkZXIudG9uZU1hcHBpbmcudG9uZU1hcHBpbmc7XG4gIHdlYkdMUmVuZGVyZXIudG9uZU1hcHBpbmdFeHBvc3VyZSA9IHByb3BlcnR5SG9sZGVyLnRvbmVNYXBwaW5nLmV4cG9zdXJlO1xuICB3ZWJHTFJlbmRlcmVyLmF1dG9DbGVhciA9IHByb3BlcnR5SG9sZGVyLmNsZWFyU2V0dGluZ3MuYXV0b0NsZWFyO1xuICB3ZWJHTFJlbmRlcmVyLnNldENsZWFyQ29sb3IocHJvcGVydHlIb2xkZXIuY2xlYXJTZXR0aW5ncy5jbGVhckNvbG9yKTtcbiAgd2ViR0xSZW5kZXJlci5vdXRwdXRFbmNvZGluZyA9IHByb3BlcnR5SG9sZGVyLm1haW4ub3V0cHV0RW5jb2Rpbmc7XG5cbiAgd2ViR0xSZW5kZXJlci5uZWVkc1VwZGF0ZSA9IHRydWU7XG59O1xuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5cbmNvbnN0IHRleHR1cmVMb2FkZXIgPSBuZXcgVEhSRUUuVGV4dHVyZUxvYWRlcigpXG5cbmNvbnN0IHByb3BlcnRpZXNPYmplY3QgPSAoc2NlbmUpID0+ICh7XG4gIG92ZXJyaWRlTWF0ZXJpYWw6IHtcbiAgICB0b2dnbGU6ICgpID0+IHtcbiAgICAgIGlmIChzY2VuZS5vdmVycmlkZU1hdGVyaWFsICE9PSBudWxsKSB7XG4gICAgICAgIHNjZW5lLm92ZXJyaWRlTWF0ZXJpYWwgPSBudWxsXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY2VuZS5vdmVycmlkZU1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hOb3JtYWxNYXRlcmlhbCgpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBiYWNrR3JvdW5kOiAnV2hpdGUnLFxuICBlbnZpcm9ubWVudDoge1xuICAgIHRvZ2dsZTogKCkgPT4ge1xuICAgICAgaWYgKHNjZW5lLmVudmlyb25tZW50ICE9PSBudWxsKSB7XG4gICAgICAgIHNjZW5lLmVudmlyb25tZW50ID0gbnVsbFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGV4dHVyZUxvYWRlci5sb2FkKCcvYXNzZXRzL2VxdWkuanBlZycsIChsb2FkZWQpID0+IHtcbiAgICAgICAgICBsb2FkZWQubWFwcGluZyA9IFRIUkVFLkVxdWlyZWN0YW5ndWxhclJlZmxlY3Rpb25NYXBwaW5nXG4gICAgICAgICAgc2NlbmUuZW52aXJvbm1lbnQgPSBsb2FkZWRcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pXG5cbmNvbnN0IGZvZ1Byb3BlcnRpZXMgPSAoZm9nKSA9PiAoe1xuICBjb2xvcjogMHhmZmZmZmYsXG4gIG5lYXI6IGZvZy5uZWFyLFxuICBmYXI6IGZvZy5mYXJcbn0pXG5cbmV4cG9ydCBjb25zdCBpbml0aWFsaXplU2NlbmVDb250cm9scyA9IChndWksIHNjZW5lLCBmb2dFbmFibGVkLCBpc09wZW4pID0+IHtcbiAgY29uc3QgcHJvcHMgPSBwcm9wZXJ0aWVzT2JqZWN0KHNjZW5lKVxuICBjb25zdCBzY2VuZUNvbnRyb2xzID0gZ3VpLmFkZEZvbGRlcignU2NlbmUnKVxuXG4gIHNjZW5lQ29udHJvbHNcbiAgICAuYWRkKHByb3BzLCAnYmFja0dyb3VuZCcsIFsnV2hpdGUnLCAnQmxhY2snLCAnTnVsbCcsICdDb2xvcicsICdUZXh0dXJlJywgJ0N1YmVtYXAnXSlcbiAgICAub25DaGFuZ2UoKGV2ZW50KSA9PiBoYW5kbGVCYWNrZ3JvdW5kQ2hhbmdlKGV2ZW50LCBzY2VuZSkpXG4gIHNjZW5lQ29udHJvbHMuYWRkKHByb3BzLm92ZXJyaWRlTWF0ZXJpYWwsICd0b2dnbGUnKS5uYW1lKCdUb2dnbGUgT3ZlcnJpZGUgTWF0ZXJpYWwnKVxuICBzY2VuZUNvbnRyb2xzLmFkZChwcm9wcy5lbnZpcm9ubWVudCwgJ3RvZ2dsZScpLm5hbWUoJ1RvZ2dsZSBFbnZpcm9ubWVudCcpXG5cbiAgaWYgKGZvZ0VuYWJsZWQpIHtcbiAgICBjb25zdCBmb2dDb2xvciA9IG5ldyBUSFJFRS5Db2xvcigweGZmZmZmZilcbiAgICBjb25zdCBmb2cgPSBuZXcgVEhSRUUuRm9nKGZvZ0NvbG9yLCAxLCAyMClcbiAgICBzY2VuZS5mb2cgPSBmb2dcbiAgICBjb25zdCBmb2dQcm9wcyA9IGZvZ1Byb3BlcnRpZXMoZm9nKVxuICAgIGNvbnN0IGZvZ0NvbnRyb2xzID0gc2NlbmVDb250cm9scy5hZGRGb2xkZXIoJ0ZvZycpXG4gICAgZm9nQ29udHJvbHMuYWRkQ29sb3IoZm9nUHJvcHMsICdjb2xvcicpXG4gICAgZm9nQ29udHJvbHMuYWRkKGZvZ1Byb3BzLCAnbmVhcicsIDAsIDEwLCAwLjEpXG4gICAgZm9nQ29udHJvbHMuYWRkKGZvZ1Byb3BzLCAnZmFyJywgMCwgMTAwLCAwLjEpXG5cbiAgICBmb2dDb250cm9scy5vbkNoYW5nZSgoKSA9PiB7XG4gICAgICBmb2cuY29sb3IgPSBmb2dDb2xvci5zZXRIZXgoZm9nUHJvcHMuY29sb3IpXG4gICAgICBmb2cubmVhciA9IGZvZ1Byb3BzLm5lYXJcbiAgICAgIGZvZy5mYXIgPSBmb2dQcm9wcy5mYXJcbiAgICB9KVxuICB9XG5cbiAgaXNPcGVuID8gc2NlbmVDb250cm9scy5vcGVuKCkgOiBzY2VuZUNvbnRyb2xzLmNsb3NlKClcbn1cblxuY29uc3QgaGFuZGxlQmFja2dyb3VuZENoYW5nZSA9IChzZXR0aW5nLCBzY2VuZSkgPT4ge1xuICBzd2l0Y2ggKHNldHRpbmcpIHtcbiAgICBjYXNlICdXaGl0ZSc6XG4gICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbmV3IFRIUkVFLkNvbG9yKDB4ZmZmZmZmKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdCbGFjayc6XG4gICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbmV3IFRIUkVFLkNvbG9yKDB4MDAwMDAwKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdOdWxsJzpcbiAgICAgIHNjZW5lLmJhY2tncm91bmQgPSBudWxsXG4gICAgICBicmVha1xuICAgIGNhc2UgJ0NvbG9yJzpcbiAgICAgIHNjZW5lLmJhY2tncm91bmQgPSBuZXcgVEhSRUUuQ29sb3IoMHg0NGZmNDQpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ1RleHR1cmUnOlxuICAgICAgdGV4dHVyZUxvYWRlci5sb2FkKCcvYXNzZXRzL3RleHR1cmVzL3dvb2QvYWJzdHJhY3QtYW50aXF1ZS1iYWNrZHJvcC0xNjQwMDUuanBnJywgKGxvYWRlZCkgPT4ge1xuICAgICAgICBsb2FkZWQuZW5jb2RpbmcgPSBUSFJFRS5zUkdCRW5jb2RpbmdcbiAgICAgICAgc2NlbmUuYmFja2dyb3VuZCA9IGxvYWRlZFxuICAgICAgICBzY2VuZS5lbnZpcm9ubWVudCA9IG51bGxcbiAgICAgIH0pXG4gICAgICBicmVha1xuICAgIGNhc2UgJ0N1YmVtYXAnOlxuICAgICAgdGV4dHVyZUxvYWRlci5sb2FkKCcvYXNzZXRzL2VxdWkuanBlZycsIChsb2FkZWQpID0+IHtcbiAgICAgICAgbG9hZGVkLm1hcHBpbmcgPSBUSFJFRS5FcXVpcmVjdGFuZ3VsYXJSZWZsZWN0aW9uTWFwcGluZ1xuICAgICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbG9hZGVkXG4gICAgICAgIHNjZW5lLmVudmlyb25tZW50ID0gbG9hZGVkXG4gICAgICB9KVxuXG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICBicmVha1xuICB9XG59XG4iLCJleHBvcnQgY29uc3QgdmlzaXRDaGlsZHJlbiA9IChvYmplY3QsIGZuKSA9PiB7XG4gIGlmIChvYmplY3QuY2hpbGRyZW4gJiYgb2JqZWN0LmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIG9iamVjdC5jaGlsZHJlbikge1xuICAgICAgdmlzaXRDaGlsZHJlbihjaGlsZCwgZm4pXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZuKG9iamVjdClcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgYXBwbHlTaGFkb3dzQW5kRGVwdGhXcml0ZSA9IChvYmplY3QpID0+IHtcbiAgdmlzaXRDaGlsZHJlbihvYmplY3QsIChjaGlsZCkgPT4ge1xuICAgIGlmIChjaGlsZC5tYXRlcmlhbCkge1xuICAgICAgY2hpbGQubWF0ZXJpYWwuZGVwdGhXcml0ZSA9IHRydWVcbiAgICAgIGNoaWxkLmNhc3RTaGFkb3cgPSB0cnVlXG4gICAgICBjaGlsZC5yZWNlaXZlU2hhZG93ID0gdHJ1ZVxuICAgIH1cbiAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IGZpbmRDaGlsZCA9IChvYmplY3QsIG5hbWUpID0+IHtcbiAgaWYgKG9iamVjdC5jaGlsZHJlbiAmJiBvYmplY3QuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgIGZvciAoY29uc3QgY2hpbGQgb2Ygb2JqZWN0LmNoaWxkcmVuKSB7XG4gICAgICBpZiAobmFtZSA9PT0gY2hpbGQubmFtZSkge1xuICAgICAgICByZXR1cm4gY2hpbGRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGZpbmRDaGlsZChjaGlsZCwgbmFtZSlcbiAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgIHJldHVybiByZXNcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAobmFtZSA9PT0gb2JqZWN0Lm5hbWUpIHtcbiAgICAgIHJldHVybiBvYmplY3RcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IG9uUmVzaXplID0gKGNhbWVyYSwgcmVuZGVyZXIpID0+IHtcbiAgY29uc3QgcmVzaXplciA9ICgpID0+IHtcbiAgICBjYW1lcmEuYXNwZWN0ID0gd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICBjYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpXG4gICAgcmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KVxuICB9XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemVyLCBmYWxzZSlcbn1cbiIsImltcG9ydCB7XG5cdEV2ZW50RGlzcGF0Y2hlcixcblx0UXVhdGVybmlvbixcblx0VmVjdG9yM1xufSBmcm9tICd0aHJlZSc7XG5cbmNvbnN0IF9jaGFuZ2VFdmVudCA9IHsgdHlwZTogJ2NoYW5nZScgfTtcblxuY2xhc3MgRmx5Q29udHJvbHMgZXh0ZW5kcyBFdmVudERpc3BhdGNoZXIge1xuXG5cdGNvbnN0cnVjdG9yKCBvYmplY3QsIGRvbUVsZW1lbnQgKSB7XG5cblx0XHRzdXBlcigpO1xuXG5cdFx0aWYgKCBkb21FbGVtZW50ID09PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLkZseUNvbnRyb2xzOiBUaGUgc2Vjb25kIHBhcmFtZXRlciBcImRvbUVsZW1lbnRcIiBpcyBub3cgbWFuZGF0b3J5LicgKTtcblx0XHRcdGRvbUVsZW1lbnQgPSBkb2N1bWVudDtcblxuXHRcdH1cblxuXHRcdHRoaXMub2JqZWN0ID0gb2JqZWN0O1xuXHRcdHRoaXMuZG9tRWxlbWVudCA9IGRvbUVsZW1lbnQ7XG5cblx0XHQvLyBBUElcblxuXHRcdHRoaXMubW92ZW1lbnRTcGVlZCA9IDEuMDtcblx0XHR0aGlzLnJvbGxTcGVlZCA9IDAuMDA1O1xuXG5cdFx0dGhpcy5kcmFnVG9Mb29rID0gZmFsc2U7XG5cdFx0dGhpcy5hdXRvRm9yd2FyZCA9IGZhbHNlO1xuXG5cdFx0Ly8gZGlzYWJsZSBkZWZhdWx0IHRhcmdldCBvYmplY3QgYmVoYXZpb3JcblxuXHRcdC8vIGludGVybmFsc1xuXG5cdFx0Y29uc3Qgc2NvcGUgPSB0aGlzO1xuXG5cdFx0Y29uc3QgRVBTID0gMC4wMDAwMDE7XG5cblx0XHRjb25zdCBsYXN0UXVhdGVybmlvbiA9IG5ldyBRdWF0ZXJuaW9uKCk7XG5cdFx0Y29uc3QgbGFzdFBvc2l0aW9uID0gbmV3IFZlY3RvcjMoKTtcblxuXHRcdHRoaXMudG1wUXVhdGVybmlvbiA9IG5ldyBRdWF0ZXJuaW9uKCk7XG5cblx0XHR0aGlzLm1vdXNlU3RhdHVzID0gMDtcblxuXHRcdHRoaXMubW92ZVN0YXRlID0geyB1cDogMCwgZG93bjogMCwgbGVmdDogMCwgcmlnaHQ6IDAsIGZvcndhcmQ6IDAsIGJhY2s6IDAsIHBpdGNoVXA6IDAsIHBpdGNoRG93bjogMCwgeWF3TGVmdDogMCwgeWF3UmlnaHQ6IDAsIHJvbGxMZWZ0OiAwLCByb2xsUmlnaHQ6IDAgfTtcblx0XHR0aGlzLm1vdmVWZWN0b3IgPSBuZXcgVmVjdG9yMyggMCwgMCwgMCApO1xuXHRcdHRoaXMucm90YXRpb25WZWN0b3IgPSBuZXcgVmVjdG9yMyggMCwgMCwgMCApO1xuXG5cdFx0dGhpcy5rZXlkb3duID0gZnVuY3Rpb24gKCBldmVudCApIHtcblxuXHRcdFx0aWYgKCBldmVudC5hbHRLZXkgKSB7XG5cblx0XHRcdFx0cmV0dXJuO1xuXG5cdFx0XHR9XG5cblx0XHRcdHN3aXRjaCAoIGV2ZW50LmNvZGUgKSB7XG5cblx0XHRcdFx0Y2FzZSAnU2hpZnRMZWZ0Jzpcblx0XHRcdFx0Y2FzZSAnU2hpZnRSaWdodCc6IHRoaXMubW92ZW1lbnRTcGVlZE11bHRpcGxpZXIgPSAuMTsgYnJlYWs7XG5cblx0XHRcdFx0Y2FzZSAnS2V5Vyc6IHRoaXMubW92ZVN0YXRlLmZvcndhcmQgPSAxOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnS2V5Uyc6IHRoaXMubW92ZVN0YXRlLmJhY2sgPSAxOyBicmVhaztcblxuXHRcdFx0XHRjYXNlICdLZXlBJzogdGhpcy5tb3ZlU3RhdGUubGVmdCA9IDE7IGJyZWFrO1xuXHRcdFx0XHRjYXNlICdLZXlEJzogdGhpcy5tb3ZlU3RhdGUucmlnaHQgPSAxOyBicmVhaztcblxuXHRcdFx0XHRjYXNlICdLZXlSJzogdGhpcy5tb3ZlU3RhdGUudXAgPSAxOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnS2V5Ric6IHRoaXMubW92ZVN0YXRlLmRvd24gPSAxOyBicmVhaztcblxuXHRcdFx0XHRjYXNlICdBcnJvd1VwJzogdGhpcy5tb3ZlU3RhdGUucGl0Y2hVcCA9IDE7IGJyZWFrO1xuXHRcdFx0XHRjYXNlICdBcnJvd0Rvd24nOiB0aGlzLm1vdmVTdGF0ZS5waXRjaERvd24gPSAxOyBicmVhaztcblxuXHRcdFx0XHRjYXNlICdBcnJvd0xlZnQnOiB0aGlzLm1vdmVTdGF0ZS55YXdMZWZ0ID0gMTsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ0Fycm93UmlnaHQnOiB0aGlzLm1vdmVTdGF0ZS55YXdSaWdodCA9IDE7IGJyZWFrO1xuXG5cdFx0XHRcdGNhc2UgJ0tleVEnOiB0aGlzLm1vdmVTdGF0ZS5yb2xsTGVmdCA9IDE7IGJyZWFrO1xuXHRcdFx0XHRjYXNlICdLZXlFJzogdGhpcy5tb3ZlU3RhdGUucm9sbFJpZ2h0ID0gMTsgYnJlYWs7XG5cblx0XHRcdH1cblxuXHRcdFx0dGhpcy51cGRhdGVNb3ZlbWVudFZlY3RvcigpO1xuXHRcdFx0dGhpcy51cGRhdGVSb3RhdGlvblZlY3RvcigpO1xuXG5cdFx0fTtcblxuXHRcdHRoaXMua2V5dXAgPSBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXG5cdFx0XHRzd2l0Y2ggKCBldmVudC5jb2RlICkge1xuXG5cdFx0XHRcdGNhc2UgJ1NoaWZ0TGVmdCc6XG5cdFx0XHRcdGNhc2UgJ1NoaWZ0UmlnaHQnOiB0aGlzLm1vdmVtZW50U3BlZWRNdWx0aXBsaWVyID0gMTsgYnJlYWs7XG5cblx0XHRcdFx0Y2FzZSAnS2V5Vyc6IHRoaXMubW92ZVN0YXRlLmZvcndhcmQgPSAwOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnS2V5Uyc6IHRoaXMubW92ZVN0YXRlLmJhY2sgPSAwOyBicmVhaztcblxuXHRcdFx0XHRjYXNlICdLZXlBJzogdGhpcy5tb3ZlU3RhdGUubGVmdCA9IDA7IGJyZWFrO1xuXHRcdFx0XHRjYXNlICdLZXlEJzogdGhpcy5tb3ZlU3RhdGUucmlnaHQgPSAwOyBicmVhaztcblxuXHRcdFx0XHRjYXNlICdLZXlSJzogdGhpcy5tb3ZlU3RhdGUudXAgPSAwOyBicmVhaztcblx0XHRcdFx0Y2FzZSAnS2V5Ric6IHRoaXMubW92ZVN0YXRlLmRvd24gPSAwOyBicmVhaztcblxuXHRcdFx0XHRjYXNlICdBcnJvd1VwJzogdGhpcy5tb3ZlU3RhdGUucGl0Y2hVcCA9IDA7IGJyZWFrO1xuXHRcdFx0XHRjYXNlICdBcnJvd0Rvd24nOiB0aGlzLm1vdmVTdGF0ZS5waXRjaERvd24gPSAwOyBicmVhaztcblxuXHRcdFx0XHRjYXNlICdBcnJvd0xlZnQnOiB0aGlzLm1vdmVTdGF0ZS55YXdMZWZ0ID0gMDsgYnJlYWs7XG5cdFx0XHRcdGNhc2UgJ0Fycm93UmlnaHQnOiB0aGlzLm1vdmVTdGF0ZS55YXdSaWdodCA9IDA7IGJyZWFrO1xuXG5cdFx0XHRcdGNhc2UgJ0tleVEnOiB0aGlzLm1vdmVTdGF0ZS5yb2xsTGVmdCA9IDA7IGJyZWFrO1xuXHRcdFx0XHRjYXNlICdLZXlFJzogdGhpcy5tb3ZlU3RhdGUucm9sbFJpZ2h0ID0gMDsgYnJlYWs7XG5cblx0XHRcdH1cblxuXHRcdFx0dGhpcy51cGRhdGVNb3ZlbWVudFZlY3RvcigpO1xuXHRcdFx0dGhpcy51cGRhdGVSb3RhdGlvblZlY3RvcigpO1xuXG5cdFx0fTtcblxuXHRcdHRoaXMubW91c2Vkb3duID0gZnVuY3Rpb24gKCBldmVudCApIHtcblxuXHRcdFx0aWYgKCB0aGlzLmRyYWdUb0xvb2sgKSB7XG5cblx0XHRcdFx0dGhpcy5tb3VzZVN0YXR1cyArKztcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRzd2l0Y2ggKCBldmVudC5idXR0b24gKSB7XG5cblx0XHRcdFx0XHRjYXNlIDA6IHRoaXMubW92ZVN0YXRlLmZvcndhcmQgPSAxOyBicmVhaztcblx0XHRcdFx0XHRjYXNlIDI6IHRoaXMubW92ZVN0YXRlLmJhY2sgPSAxOyBicmVhaztcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy51cGRhdGVNb3ZlbWVudFZlY3RvcigpO1xuXG5cdFx0XHR9XG5cblx0XHR9O1xuXG5cdFx0dGhpcy5tb3VzZW1vdmUgPSBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXG5cdFx0XHRpZiAoICEgdGhpcy5kcmFnVG9Mb29rIHx8IHRoaXMubW91c2VTdGF0dXMgPiAwICkge1xuXG5cdFx0XHRcdGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuZ2V0Q29udGFpbmVyRGltZW5zaW9ucygpO1xuXHRcdFx0XHRjb25zdCBoYWxmV2lkdGggPSBjb250YWluZXIuc2l6ZVsgMCBdIC8gMjtcblx0XHRcdFx0Y29uc3QgaGFsZkhlaWdodCA9IGNvbnRhaW5lci5zaXplWyAxIF0gLyAyO1xuXG5cdFx0XHRcdHRoaXMubW92ZVN0YXRlLnlhd0xlZnQgPSAtICggKCBldmVudC5wYWdlWCAtIGNvbnRhaW5lci5vZmZzZXRbIDAgXSApIC0gaGFsZldpZHRoICkgLyBoYWxmV2lkdGg7XG5cdFx0XHRcdHRoaXMubW92ZVN0YXRlLnBpdGNoRG93biA9ICggKCBldmVudC5wYWdlWSAtIGNvbnRhaW5lci5vZmZzZXRbIDEgXSApIC0gaGFsZkhlaWdodCApIC8gaGFsZkhlaWdodDtcblxuXHRcdFx0XHR0aGlzLnVwZGF0ZVJvdGF0aW9uVmVjdG9yKCk7XG5cblx0XHRcdH1cblxuXHRcdH07XG5cblx0XHR0aGlzLm1vdXNldXAgPSBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXG5cdFx0XHRpZiAoIHRoaXMuZHJhZ1RvTG9vayApIHtcblxuXHRcdFx0XHR0aGlzLm1vdXNlU3RhdHVzIC0tO1xuXG5cdFx0XHRcdHRoaXMubW92ZVN0YXRlLnlhd0xlZnQgPSB0aGlzLm1vdmVTdGF0ZS5waXRjaERvd24gPSAwO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdHN3aXRjaCAoIGV2ZW50LmJ1dHRvbiApIHtcblxuXHRcdFx0XHRcdGNhc2UgMDogdGhpcy5tb3ZlU3RhdGUuZm9yd2FyZCA9IDA7IGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgMjogdGhpcy5tb3ZlU3RhdGUuYmFjayA9IDA7IGJyZWFrO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLnVwZGF0ZU1vdmVtZW50VmVjdG9yKCk7XG5cblx0XHRcdH1cblxuXHRcdFx0dGhpcy51cGRhdGVSb3RhdGlvblZlY3RvcigpO1xuXG5cdFx0fTtcblxuXHRcdHRoaXMudXBkYXRlID0gZnVuY3Rpb24gKCBkZWx0YSApIHtcblxuXHRcdFx0Y29uc3QgbW92ZU11bHQgPSBkZWx0YSAqIHNjb3BlLm1vdmVtZW50U3BlZWQ7XG5cdFx0XHRjb25zdCByb3RNdWx0ID0gZGVsdGEgKiBzY29wZS5yb2xsU3BlZWQ7XG5cblx0XHRcdHNjb3BlLm9iamVjdC50cmFuc2xhdGVYKCBzY29wZS5tb3ZlVmVjdG9yLnggKiBtb3ZlTXVsdCApO1xuXHRcdFx0c2NvcGUub2JqZWN0LnRyYW5zbGF0ZVkoIHNjb3BlLm1vdmVWZWN0b3IueSAqIG1vdmVNdWx0ICk7XG5cdFx0XHRzY29wZS5vYmplY3QudHJhbnNsYXRlWiggc2NvcGUubW92ZVZlY3Rvci56ICogbW92ZU11bHQgKTtcblxuXHRcdFx0c2NvcGUudG1wUXVhdGVybmlvbi5zZXQoIHNjb3BlLnJvdGF0aW9uVmVjdG9yLnggKiByb3RNdWx0LCBzY29wZS5yb3RhdGlvblZlY3Rvci55ICogcm90TXVsdCwgc2NvcGUucm90YXRpb25WZWN0b3IueiAqIHJvdE11bHQsIDEgKS5ub3JtYWxpemUoKTtcblx0XHRcdHNjb3BlLm9iamVjdC5xdWF0ZXJuaW9uLm11bHRpcGx5KCBzY29wZS50bXBRdWF0ZXJuaW9uICk7XG5cblx0XHRcdGlmIChcblx0XHRcdFx0bGFzdFBvc2l0aW9uLmRpc3RhbmNlVG9TcXVhcmVkKCBzY29wZS5vYmplY3QucG9zaXRpb24gKSA+IEVQUyB8fFxuXHRcdFx0XHQ4ICogKCAxIC0gbGFzdFF1YXRlcm5pb24uZG90KCBzY29wZS5vYmplY3QucXVhdGVybmlvbiApICkgPiBFUFNcblx0XHRcdCkge1xuXG5cdFx0XHRcdHNjb3BlLmRpc3BhdGNoRXZlbnQoIF9jaGFuZ2VFdmVudCApO1xuXHRcdFx0XHRsYXN0UXVhdGVybmlvbi5jb3B5KCBzY29wZS5vYmplY3QucXVhdGVybmlvbiApO1xuXHRcdFx0XHRsYXN0UG9zaXRpb24uY29weSggc2NvcGUub2JqZWN0LnBvc2l0aW9uICk7XG5cblx0XHRcdH1cblxuXHRcdH07XG5cblx0XHR0aGlzLnVwZGF0ZU1vdmVtZW50VmVjdG9yID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRjb25zdCBmb3J3YXJkID0gKCB0aGlzLm1vdmVTdGF0ZS5mb3J3YXJkIHx8ICggdGhpcy5hdXRvRm9yd2FyZCAmJiAhIHRoaXMubW92ZVN0YXRlLmJhY2sgKSApID8gMSA6IDA7XG5cblx0XHRcdHRoaXMubW92ZVZlY3Rvci54ID0gKCAtIHRoaXMubW92ZVN0YXRlLmxlZnQgKyB0aGlzLm1vdmVTdGF0ZS5yaWdodCApO1xuXHRcdFx0dGhpcy5tb3ZlVmVjdG9yLnkgPSAoIC0gdGhpcy5tb3ZlU3RhdGUuZG93biArIHRoaXMubW92ZVN0YXRlLnVwICk7XG5cdFx0XHR0aGlzLm1vdmVWZWN0b3IueiA9ICggLSBmb3J3YXJkICsgdGhpcy5tb3ZlU3RhdGUuYmFjayApO1xuXG5cdFx0XHQvL2NvbnNvbGUubG9nKCAnbW92ZTonLCBbIHRoaXMubW92ZVZlY3Rvci54LCB0aGlzLm1vdmVWZWN0b3IueSwgdGhpcy5tb3ZlVmVjdG9yLnogXSApO1xuXG5cdFx0fTtcblxuXHRcdHRoaXMudXBkYXRlUm90YXRpb25WZWN0b3IgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdHRoaXMucm90YXRpb25WZWN0b3IueCA9ICggLSB0aGlzLm1vdmVTdGF0ZS5waXRjaERvd24gKyB0aGlzLm1vdmVTdGF0ZS5waXRjaFVwICk7XG5cdFx0XHR0aGlzLnJvdGF0aW9uVmVjdG9yLnkgPSAoIC0gdGhpcy5tb3ZlU3RhdGUueWF3UmlnaHQgKyB0aGlzLm1vdmVTdGF0ZS55YXdMZWZ0ICk7XG5cdFx0XHR0aGlzLnJvdGF0aW9uVmVjdG9yLnogPSAoIC0gdGhpcy5tb3ZlU3RhdGUucm9sbFJpZ2h0ICsgdGhpcy5tb3ZlU3RhdGUucm9sbExlZnQgKTtcblxuXHRcdFx0Ly9jb25zb2xlLmxvZyggJ3JvdGF0ZTonLCBbIHRoaXMucm90YXRpb25WZWN0b3IueCwgdGhpcy5yb3RhdGlvblZlY3Rvci55LCB0aGlzLnJvdGF0aW9uVmVjdG9yLnogXSApO1xuXG5cdFx0fTtcblxuXHRcdHRoaXMuZ2V0Q29udGFpbmVyRGltZW5zaW9ucyA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0aWYgKCB0aGlzLmRvbUVsZW1lbnQgIT0gZG9jdW1lbnQgKSB7XG5cblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRzaXplOiBbIHRoaXMuZG9tRWxlbWVudC5vZmZzZXRXaWR0aCwgdGhpcy5kb21FbGVtZW50Lm9mZnNldEhlaWdodCBdLFxuXHRcdFx0XHRcdG9mZnNldDogWyB0aGlzLmRvbUVsZW1lbnQub2Zmc2V0TGVmdCwgdGhpcy5kb21FbGVtZW50Lm9mZnNldFRvcCBdXG5cdFx0XHRcdH07XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRzaXplOiBbIHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQgXSxcblx0XHRcdFx0XHRvZmZzZXQ6IFsgMCwgMCBdXG5cdFx0XHRcdH07XG5cblx0XHRcdH1cblxuXHRcdH07XG5cblx0XHR0aGlzLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdHRoaXMuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCAnY29udGV4dG1lbnUnLCBjb250ZXh0bWVudSApO1xuXHRcdFx0dGhpcy5kb21FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdtb3VzZWRvd24nLCBfbW91c2Vkb3duICk7XG5cdFx0XHR0aGlzLmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ21vdXNlbW92ZScsIF9tb3VzZW1vdmUgKTtcblx0XHRcdHRoaXMuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCAnbW91c2V1cCcsIF9tb3VzZXVwICk7XG5cblx0XHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCAna2V5ZG93bicsIF9rZXlkb3duICk7XG5cdFx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2tleXVwJywgX2tleXVwICk7XG5cblx0XHR9O1xuXG5cdFx0Y29uc3QgX21vdXNlbW92ZSA9IHRoaXMubW91c2Vtb3ZlLmJpbmQoIHRoaXMgKTtcblx0XHRjb25zdCBfbW91c2Vkb3duID0gdGhpcy5tb3VzZWRvd24uYmluZCggdGhpcyApO1xuXHRcdGNvbnN0IF9tb3VzZXVwID0gdGhpcy5tb3VzZXVwLmJpbmQoIHRoaXMgKTtcblx0XHRjb25zdCBfa2V5ZG93biA9IHRoaXMua2V5ZG93bi5iaW5kKCB0aGlzICk7XG5cdFx0Y29uc3QgX2tleXVwID0gdGhpcy5rZXl1cC5iaW5kKCB0aGlzICk7XG5cblx0XHR0aGlzLmRvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2NvbnRleHRtZW51JywgY29udGV4dG1lbnUgKTtcblxuXHRcdHRoaXMuZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCAnbW91c2Vtb3ZlJywgX21vdXNlbW92ZSApO1xuXHRcdHRoaXMuZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCAnbW91c2Vkb3duJywgX21vdXNlZG93biApO1xuXHRcdHRoaXMuZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCAnbW91c2V1cCcsIF9tb3VzZXVwICk7XG5cblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ2tleWRvd24nLCBfa2V5ZG93biApO1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAna2V5dXAnLCBfa2V5dXAgKTtcblxuXHRcdHRoaXMudXBkYXRlTW92ZW1lbnRWZWN0b3IoKTtcblx0XHR0aGlzLnVwZGF0ZVJvdGF0aW9uVmVjdG9yKCk7XG5cblx0fVxuXG59XG5cbmZ1bmN0aW9uIGNvbnRleHRtZW51KCBldmVudCApIHtcblxuXHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG59XG5cbmV4cG9ydCB7IEZseUNvbnRyb2xzIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImZseS1jb250cm9scy1jYW1lcmFcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rbHRqc19mb3VydGhcIl0gPSBzZWxmW1wid2VicGFja0NodW5rbHRqc19mb3VydGhcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2J1aWxkX3RocmVlX21vZHVsZV9qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX2NvbnRyb2xzX09yYml0Q29udHJvbHNfanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX2xpbC1ndWlfZGlzdF9saWwtZ3VpX2VzbV9qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX2xvYWRlcnNfR0xURkxvYWRlcl9qc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci05L2ZseS1jb250cm9scy1jYW1lcmEuanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
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

/***/ "./samples/chapters/chapter-9/load-bvh.js"
/*!************************************************!*\
  !*** ./samples/chapters/chapter-9/load-bvh.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_standard_scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/standard-scene */ "./samples/chapters/chapter-9/util/standard-scene.js");
/* harmony import */ var three_examples_jsm_loaders_BVHLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/loaders/BVHLoader */ "./node_modules/three/examples/jsm/loaders/BVHLoader.js");
/* harmony import */ var _util_modelUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/modelUtil */ "./samples/util/modelUtil.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");






let animation = undefined
const loadModel = () => {
  const loader = new three_examples_jsm_loaders_BVHLoader__WEBPACK_IMPORTED_MODULE_1__.BVHLoader()
  return loader.loadAsync('/assets/models//amelia-dance/DanceNightClub7_t1.bvh').then((result) => {
    const skeletonHelper = new three__WEBPACK_IMPORTED_MODULE_4__.SkeletonHelper(result.skeleton.bones[0])
    skeletonHelper.skeleton = result.skeleton
    skeletonHelper.name = 'skeletonHelper'
    const boneContainer = new three__WEBPACK_IMPORTED_MODULE_4__.Group()
    boneContainer.add(result.skeleton.bones[0])
    boneContainer.name = 'boneContainer'
    animation = result.clip

    const group = new three__WEBPACK_IMPORTED_MODULE_4__.Group()
    group.add(skeletonHelper)
    group.add(boneContainer)
    group.scale.setScalar(0.2)
    group.translateY(-1.6)
    group.translateX(-3)
    ;(0,_util_modelUtil__WEBPACK_IMPORTED_MODULE_2__.applyShadowsAndDepthWrite)(group)

    return group
  })
}

let mixer = undefined

;(0,_util_standard_scene__WEBPACK_IMPORTED_MODULE_0__.bootstrapMeshScene)({
  loadMesh: loadModel,
  addControls: (camera, renderer, scene, gui, mesh) => {
    const controls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_3__.OrbitControls(camera, renderer.domElement)

    // play animation
    mixer = new three__WEBPACK_IMPORTED_MODULE_4__.AnimationMixer(mesh.getObjectByName('skeletonHelper'))
    mixer.clipAction(animation).play()
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

/***/ "./node_modules/three/examples/jsm/loaders/BVHLoader.js"
/*!**************************************************************!*\
  !*** ./node_modules/three/examples/jsm/loaders/BVHLoader.js ***!
  \**************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BVHLoader: () => (/* binding */ BVHLoader)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");


/**
 * Description: reads BVH files and outputs a single Skeleton and an AnimationClip
 *
 * Currently only supports bvh files containing a single root.
 *
 */

class BVHLoader extends three__WEBPACK_IMPORTED_MODULE_0__.Loader {

	constructor( manager ) {

		super( manager );

		this.animateBonePositions = true;
		this.animateBoneRotations = true;

	}

	load( url, onLoad, onProgress, onError ) {

		const scope = this;

		const loader = new three__WEBPACK_IMPORTED_MODULE_0__.FileLoader( scope.manager );
		loader.setPath( scope.path );
		loader.setRequestHeader( scope.requestHeader );
		loader.setWithCredentials( scope.withCredentials );
		loader.load( url, function ( text ) {

			try {

				onLoad( scope.parse( text ) );

			} catch ( e ) {

				if ( onError ) {

					onError( e );

				} else {

					console.error( e );

				}

				scope.manager.itemError( url );

			}

		}, onProgress, onError );

	}

	parse( text ) {

		/*
			reads a string array (lines) from a BVH file
			and outputs a skeleton structure including motion data

			returns thee root node:
			{ name: '', channels: [], children: [] }
		*/
		function readBvh( lines ) {

			// read model structure

			if ( nextLine( lines ) !== 'HIERARCHY' ) {

				console.error( 'THREE.BVHLoader: HIERARCHY expected.' );

			}

			const list = []; // collects flat array of all bones
			const root = readNode( lines, nextLine( lines ), list );

			// read motion data

			if ( nextLine( lines ) !== 'MOTION' ) {

				console.error( 'THREE.BVHLoader: MOTION expected.' );

			}

			// number of frames

			let tokens = nextLine( lines ).split( /[\s]+/ );
			const numFrames = parseInt( tokens[ 1 ] );

			if ( isNaN( numFrames ) ) {

				console.error( 'THREE.BVHLoader: Failed to read number of frames.' );

			}

			// frame time

			tokens = nextLine( lines ).split( /[\s]+/ );
			const frameTime = parseFloat( tokens[ 2 ] );

			if ( isNaN( frameTime ) ) {

				console.error( 'THREE.BVHLoader: Failed to read frame time.' );

			}

			// read frame data line by line

			for ( let i = 0; i < numFrames; i ++ ) {

				tokens = nextLine( lines ).split( /[\s]+/ );
				readFrameData( tokens, i * frameTime, root );

			}

			return list;

		}

		/*
			Recursively reads data from a single frame into the bone hierarchy.
			The passed bone hierarchy has to be structured in the same order as the BVH file.
			keyframe data is stored in bone.frames.

			- data: splitted string array (frame values), values are shift()ed so
			this should be empty after parsing the whole hierarchy.
			- frameTime: playback time for this keyframe.
			- bone: the bone to read frame data from.
		*/
		function readFrameData( data, frameTime, bone ) {

			// end sites have no motion data

			if ( bone.type === 'ENDSITE' ) return;

			// add keyframe

			const keyframe = {
				time: frameTime,
				position: new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(),
				rotation: new three__WEBPACK_IMPORTED_MODULE_0__.Quaternion()
			};

			bone.frames.push( keyframe );

			const quat = new three__WEBPACK_IMPORTED_MODULE_0__.Quaternion();

			const vx = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3( 1, 0, 0 );
			const vy = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3( 0, 1, 0 );
			const vz = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3( 0, 0, 1 );

			// parse values for each channel in node

			for ( let i = 0; i < bone.channels.length; i ++ ) {

				switch ( bone.channels[ i ] ) {

					case 'Xposition':
						keyframe.position.x = parseFloat( data.shift().trim() );
						break;
					case 'Yposition':
						keyframe.position.y = parseFloat( data.shift().trim() );
						break;
					case 'Zposition':
						keyframe.position.z = parseFloat( data.shift().trim() );
						break;
					case 'Xrotation':
						quat.setFromAxisAngle( vx, parseFloat( data.shift().trim() ) * Math.PI / 180 );
						keyframe.rotation.multiply( quat );
						break;
					case 'Yrotation':
						quat.setFromAxisAngle( vy, parseFloat( data.shift().trim() ) * Math.PI / 180 );
						keyframe.rotation.multiply( quat );
						break;
					case 'Zrotation':
						quat.setFromAxisAngle( vz, parseFloat( data.shift().trim() ) * Math.PI / 180 );
						keyframe.rotation.multiply( quat );
						break;
					default:
						console.warn( 'THREE.BVHLoader: Invalid channel type.' );

				}

			}

			// parse child nodes

			for ( let i = 0; i < bone.children.length; i ++ ) {

				readFrameData( data, frameTime, bone.children[ i ] );

			}

		}

		/*
		 Recursively parses the HIERACHY section of the BVH file

		 - lines: all lines of the file. lines are consumed as we go along.
		 - firstline: line containing the node type and name e.g. 'JOINT hip'
		 - list: collects a flat list of nodes

		 returns: a BVH node including children
		*/
		function readNode( lines, firstline, list ) {

			const node = { name: '', type: '', frames: [] };
			list.push( node );

			// parse node type and name

			let tokens = firstline.split( /[\s]+/ );

			if ( tokens[ 0 ].toUpperCase() === 'END' && tokens[ 1 ].toUpperCase() === 'SITE' ) {

				node.type = 'ENDSITE';
				node.name = 'ENDSITE'; // bvh end sites have no name

			} else {

				node.name = tokens[ 1 ];
				node.type = tokens[ 0 ].toUpperCase();

			}

			if ( nextLine( lines ) !== '{' ) {

				console.error( 'THREE.BVHLoader: Expected opening { after type & name' );

			}

			// parse OFFSET

			tokens = nextLine( lines ).split( /[\s]+/ );

			if ( tokens[ 0 ] !== 'OFFSET' ) {

				console.error( 'THREE.BVHLoader: Expected OFFSET but got: ' + tokens[ 0 ] );

			}

			if ( tokens.length !== 4 ) {

				console.error( 'THREE.BVHLoader: Invalid number of values for OFFSET.' );

			}

			const offset = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(
				parseFloat( tokens[ 1 ] ),
				parseFloat( tokens[ 2 ] ),
				parseFloat( tokens[ 3 ] )
			);

			if ( isNaN( offset.x ) || isNaN( offset.y ) || isNaN( offset.z ) ) {

				console.error( 'THREE.BVHLoader: Invalid values of OFFSET.' );

			}

			node.offset = offset;

			// parse CHANNELS definitions

			if ( node.type !== 'ENDSITE' ) {

				tokens = nextLine( lines ).split( /[\s]+/ );

				if ( tokens[ 0 ] !== 'CHANNELS' ) {

					console.error( 'THREE.BVHLoader: Expected CHANNELS definition.' );

				}

				const numChannels = parseInt( tokens[ 1 ] );
				node.channels = tokens.splice( 2, numChannels );
				node.children = [];

			}

			// read children

			while ( true ) {

				const line = nextLine( lines );

				if ( line === '}' ) {

					return node;

				} else {

					node.children.push( readNode( lines, line, list ) );

				}

			}

		}

		/*
			recursively converts the internal bvh node structure to a Bone hierarchy

			source: the bvh root node
			list: pass an empty array, collects a flat list of all converted THREE.Bones

			returns the root Bone
		*/
		function toTHREEBone( source, list ) {

			const bone = new three__WEBPACK_IMPORTED_MODULE_0__.Bone();
			list.push( bone );

			bone.position.add( source.offset );
			bone.name = source.name;

			if ( source.type !== 'ENDSITE' ) {

				for ( let i = 0; i < source.children.length; i ++ ) {

					bone.add( toTHREEBone( source.children[ i ], list ) );

				}

			}

			return bone;

		}

		/*
			builds a AnimationClip from the keyframe data saved in each bone.

			bone: bvh root node

			returns: a AnimationClip containing position and quaternion tracks
		*/
		function toTHREEAnimation( bones ) {

			const tracks = [];

			// create a position and quaternion animation track for each node

			for ( let i = 0; i < bones.length; i ++ ) {

				const bone = bones[ i ];

				if ( bone.type === 'ENDSITE' )
					continue;

				// track data

				const times = [];
				const positions = [];
				const rotations = [];

				for ( let j = 0; j < bone.frames.length; j ++ ) {

					const frame = bone.frames[ j ];

					times.push( frame.time );

					// the animation system animates the position property,
					// so we have to add the joint offset to all values

					positions.push( frame.position.x + bone.offset.x );
					positions.push( frame.position.y + bone.offset.y );
					positions.push( frame.position.z + bone.offset.z );

					rotations.push( frame.rotation.x );
					rotations.push( frame.rotation.y );
					rotations.push( frame.rotation.z );
					rotations.push( frame.rotation.w );

				}

				if ( scope.animateBonePositions ) {

					tracks.push( new three__WEBPACK_IMPORTED_MODULE_0__.VectorKeyframeTrack( '.bones[' + bone.name + '].position', times, positions ) );

				}

				if ( scope.animateBoneRotations ) {

					tracks.push( new three__WEBPACK_IMPORTED_MODULE_0__.QuaternionKeyframeTrack( '.bones[' + bone.name + '].quaternion', times, rotations ) );

				}

			}

			return new three__WEBPACK_IMPORTED_MODULE_0__.AnimationClip( 'animation', - 1, tracks );

		}

		/*
			returns the next non-empty line in lines
		*/
		function nextLine( lines ) {

			let line;
			// skip empty lines
			while ( ( line = lines.shift().trim() ).length === 0 ) { }

			return line;

		}

		const scope = this;

		const lines = text.split( /[\r\n]+/g );

		const bones = readBvh( lines );

		const threeBones = [];
		toTHREEBone( bones[ 0 ], threeBones );

		const threeClip = toTHREEAnimation( bones );

		return {
			skeleton: new three__WEBPACK_IMPORTED_MODULE_0__.Skeleton( threeBones ),
			clip: threeClip
		};

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
/******/ 			"load-bvh": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js"], () => (__webpack_require__("./samples/chapters/chapter-9/load-bvh.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDQTtXQUNBO1dBQ0EsK0JBQStCLHdDQUF3QztXQUN2RTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlCQUFpQixxQkFBcUI7V0FDdEM7V0FDQTtXQUNBLGtCQUFrQixxQkFBcUI7V0FDdkM7V0FDQTtXQUNBLEtBQUs7V0FDTDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRTs7Ozs7V0MzQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQSw0Rzs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9ib290c3RyYXAvYm9vdHN0cmFwLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9ib290c3RyYXAvZmxvb3IuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2Jvb3RzdHJhcC9saWdodGluZy5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci05L2xvYWQtYnZoLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTkvdXRpbC9zdGFuZGFyZC1zY2VuZS5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY29udHJvbGxlci9vcmJpdC1jb250cm9sbGVyLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jb250cm9scy9yZW5kZXJlci1jb250cm9sLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jb250cm9scy9zY2VuZS1jb250cm9scy5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvdXRpbC9tb2RlbFV0aWwuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL3V0aWwvdXBkYXRlLW9uLXJlc2l6ZS5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL25vZGVfbW9kdWxlcy90aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9CVkhMb2FkZXIuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcbmltcG9ydCB7IGluaXRPcmJpdENvbnRyb2xzIH0gZnJvbSAnLi4vY29udHJvbGxlci9vcmJpdC1jb250cm9sbGVyJ1xuaW1wb3J0IHsgaW5pdExpZ2h0aW5nIH0gZnJvbSAnLi9saWdodGluZydcbmltcG9ydCB7IG9uUmVzaXplIH0gZnJvbSAnLi4vdXRpbC91cGRhdGUtb24tcmVzaXplJ1xuXG5leHBvcnQgY29uc3QgaW5pdFNjZW5lID0gKHsgYmFja2dyb3VuZENvbG9yLCBmb2dDb2xvciwgZGlzYWJsZVNoYWRvd3MsIGRpc2FibGVMaWdodHMsIGRpc2FibGVEZWZhdWx0Q29udHJvbHMgfSkgPT4ge1xuICBjb25zdCBpbml0ID0gKGZuKSA9PiB7XG4gICAgLy8gYmFzaWMgc2NlbmUgc2V0dXBcbiAgICBjb25zdCBzY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpXG4gICAgaWYgKGJhY2tncm91bmRDb2xvcikge1xuICAgICAgc2NlbmUuYmFja2dyb3VuZENvbG9yID0gYmFja2dyb3VuZENvbG9yXG4gICAgfVxuXG4gICAgaWYgKGZvZ0NvbG9yKSB7XG4gICAgICBzY2VuZS5mb2cgPSBuZXcgVEhSRUUuRm9nKGZvZ0NvbG9yLCAwLjAwMjUsIDUwKVxuICAgIH1cblxuICAgIC8vIHNldHVwIGNhbWVyYSBhbmQgYmFzaWMgcmVuZGVyZXJcbiAgICBjb25zdCBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNzUsIHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0LCAwLjEsIDEwMDApXG4gICAgY29uc3QgcmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcih7IGFudGlhbGlhczogdHJ1ZSB9KVxuICAgIHJlbmRlcmVyLm91dHB1dEVuY29kaW5nID0gVEhSRUUuc1JHQkVuY29kaW5nXG4gICAgcmVuZGVyZXIuc2hhZG93TWFwLmVuYWJsZWQgPSB0cnVlXG4gICAgcmVuZGVyZXIuc2hhZG93TWFwLnR5cGUgPSBUSFJFRS5WU01TaGFkb3dNYXBcbiAgICByZW5kZXJlci5zZXRDbGVhckNvbG9yKGJhY2tncm91bmRDb2xvcilcblxuICAgIG9uUmVzaXplKGNhbWVyYSwgcmVuZGVyZXIpXG4gICAgcmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocmVuZGVyZXIuZG9tRWxlbWVudClcblxuICAgIC8vIGluaXRpYWxpemUgb3JiaXQgY29udHJvbHNcbiAgICBsZXQgb3JiaXRDb250cm9sc1xuICAgIGlmICghZGlzYWJsZURlZmF1bHRDb250cm9scykge1xuICAgICAgb3JiaXRDb250cm9scyA9IGluaXRPcmJpdENvbnRyb2xzKGNhbWVyYSwgcmVuZGVyZXIpXG4gICAgfVxuXG4gICAgLy8gYWRkIHNvbWUgYmFzaWMgbGlnaHRpbmcgdG8gdGhlIHNjZW5lXG4gICAgaWYgKCFkaXNhYmxlTGlnaHRzID8/IGZhbHNlKSB7XG4gICAgICBpbml0TGlnaHRpbmcoc2NlbmUsIHsgZGlzYWJsZVNoYWRvd3MgfSlcbiAgICB9XG5cbiAgICBmbih7IHNjZW5lLCBjYW1lcmEsIHJlbmRlcmVyLCBvcmJpdENvbnRyb2xzIH0pXG4gIH1cblxuICByZXR1cm4gaW5pdFxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5cbmV4cG9ydCBjb25zdCBmb3JldmVyUGxhbmUgPSAoc2NlbmUpID0+IHtcbiAgY29uc3QgZ2VvID0gbmV3IFRIUkVFLlBsYW5lQnVmZmVyR2VvbWV0cnkoMTAwMDAsIDEwMDAwKVxuICBjb25zdCBtYXQgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7XG4gICAgY29sb3I6IDB4ZmZmZmZmXG4gIH0pXG4gIGNvbnN0IG1lc2ggPSBuZXcgVEhSRUUuTWVzaChnZW8sIG1hdClcbiAgbWVzaC5wb3NpdGlvbi5zZXQoMCwgLTIsIDApXG4gIG1lc2gucm90YXRpb24uc2V0KE1hdGguUEkgLyAtMiwgMCwgMClcbiAgbWVzaC5yZWNlaXZlU2hhZG93ID0gdHJ1ZVxuICBtZXNoLm5hbWUgPSAnZm9yZXZlci1mbG9vcidcbiAgc2NlbmUuYWRkKG1lc2gpXG5cbiAgcmV0dXJuIG1lc2hcbn1cblxuZXhwb3J0IGNvbnN0IGZsb2F0aW5nRmxvb3IgPSAoc2NlbmUsIHNpemUpID0+IHtcbiAgY29uc3QgcyA9IHNpemUgPyBzaXplIDogNlxuICBjb25zdCBnZW8gPSBuZXcgVEhSRUUuQm94QnVmZmVyR2VvbWV0cnkocywgMC4yNSwgcywgMTAsIDEwLCAxMClcbiAgY29uc3QgbWF0ID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcbiAgICBjb2xvcjogMHhkZGRkZGRcbiAgfSlcbiAgY29uc3QgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlbywgbWF0KVxuICBtZXNoLnBvc2l0aW9uLnNldCgwLCAtMiwgLTEpXG4gIG1lc2gucmVjZWl2ZVNoYWRvdyA9IHRydWVcbiAgbWVzaC5uYW1lID0gJ2Zsb2F0aW5nLWZsb29yJ1xuICBzY2VuZS5hZGQobWVzaClcblxuICByZXR1cm4gbWVzaFxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5cbmV4cG9ydCBjb25zdCBpbml0TGlnaHRpbmcgPSAoc2NlbmUsIHsgZGlzYWJsZVNoYWRvd3MgfSkgPT4ge1xuICAvLyBodHRwczovL3RocmVlanMub3JnL2V4YW1wbGVzLz9xPXNoYWRvI3dlYmdsX3NoYWRvd21hcF92c21cbiAgc2NlbmUuYWRkKG5ldyBUSFJFRS5BbWJpZW50TGlnaHQoMHg2NjY2NjYpKVxuXG4gIC8vIGNvbnN0IGRpckxpZ2h0ID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoMHhhYWFhYWEpXG4gIGNvbnN0IGRpckxpZ2h0ID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoMHhhYWFhYWEpXG4gIGRpckxpZ2h0LnBvc2l0aW9uLnNldCg1LCAxMiwgOClcbiAgZGlyTGlnaHQuY2FzdFNoYWRvdyA9ICFkaXNhYmxlU2hhZG93cyA/IHRydWUgOiBmYWxzZVxuICBkaXJMaWdodC5pbnRlbnNpdHkgPSAxXG4gIGRpckxpZ2h0LnNoYWRvdy5jYW1lcmEubmVhciA9IDAuMVxuICBkaXJMaWdodC5zaGFkb3cuY2FtZXJhLmZhciA9IDIwMFxuICBkaXJMaWdodC5zaGFkb3cuY2FtZXJhLnJpZ2h0ID0gMTBcbiAgZGlyTGlnaHQuc2hhZG93LmNhbWVyYS5sZWZ0ID0gLTEwXG4gIGRpckxpZ2h0LnNoYWRvdy5jYW1lcmEudG9wID0gMTBcbiAgZGlyTGlnaHQuc2hhZG93LmNhbWVyYS5ib3R0b20gPSAtMTBcbiAgZGlyTGlnaHQuc2hhZG93Lm1hcFNpemUud2lkdGggPSAyMDQ4XG4gIGRpckxpZ2h0LnNoYWRvdy5tYXBTaXplLmhlaWdodCA9IDIwNDhcbiAgZGlyTGlnaHQuc2hhZG93LnJhZGl1cyA9IDRcbiAgZGlyTGlnaHQuc2hhZG93LmJpYXMgPSAtMC4wMDAwNVxuXG4gIHNjZW5lLmFkZChkaXJMaWdodClcbn1cbiIsImltcG9ydCB7IGJvb3RzdHJhcE1lc2hTY2VuZSB9IGZyb20gJy4vdXRpbC9zdGFuZGFyZC1zY2VuZSdcbmltcG9ydCB7IEJWSExvYWRlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0JWSExvYWRlcidcbmltcG9ydCB7IGFwcGx5U2hhZG93c0FuZERlcHRoV3JpdGUgfSBmcm9tICcuLi8uLi91dGlsL21vZGVsVXRpbCdcbmltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vY29udHJvbHMvT3JiaXRDb250cm9scydcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuXG5sZXQgYW5pbWF0aW9uID0gdW5kZWZpbmVkXG5jb25zdCBsb2FkTW9kZWwgPSAoKSA9PiB7XG4gIGNvbnN0IGxvYWRlciA9IG5ldyBCVkhMb2FkZXIoKVxuICByZXR1cm4gbG9hZGVyLmxvYWRBc3luYygnL2Fzc2V0cy9tb2RlbHMvL2FtZWxpYS1kYW5jZS9EYW5jZU5pZ2h0Q2x1YjdfdDEuYnZoJykudGhlbigocmVzdWx0KSA9PiB7XG4gICAgY29uc3Qgc2tlbGV0b25IZWxwZXIgPSBuZXcgVEhSRUUuU2tlbGV0b25IZWxwZXIocmVzdWx0LnNrZWxldG9uLmJvbmVzWzBdKVxuICAgIHNrZWxldG9uSGVscGVyLnNrZWxldG9uID0gcmVzdWx0LnNrZWxldG9uXG4gICAgc2tlbGV0b25IZWxwZXIubmFtZSA9ICdza2VsZXRvbkhlbHBlcidcbiAgICBjb25zdCBib25lQ29udGFpbmVyID0gbmV3IFRIUkVFLkdyb3VwKClcbiAgICBib25lQ29udGFpbmVyLmFkZChyZXN1bHQuc2tlbGV0b24uYm9uZXNbMF0pXG4gICAgYm9uZUNvbnRhaW5lci5uYW1lID0gJ2JvbmVDb250YWluZXInXG4gICAgYW5pbWF0aW9uID0gcmVzdWx0LmNsaXBcblxuICAgIGNvbnN0IGdyb3VwID0gbmV3IFRIUkVFLkdyb3VwKClcbiAgICBncm91cC5hZGQoc2tlbGV0b25IZWxwZXIpXG4gICAgZ3JvdXAuYWRkKGJvbmVDb250YWluZXIpXG4gICAgZ3JvdXAuc2NhbGUuc2V0U2NhbGFyKDAuMilcbiAgICBncm91cC50cmFuc2xhdGVZKC0xLjYpXG4gICAgZ3JvdXAudHJhbnNsYXRlWCgtMylcbiAgICBhcHBseVNoYWRvd3NBbmREZXB0aFdyaXRlKGdyb3VwKVxuXG4gICAgcmV0dXJuIGdyb3VwXG4gIH0pXG59XG5cbmxldCBtaXhlciA9IHVuZGVmaW5lZFxuXG5ib290c3RyYXBNZXNoU2NlbmUoe1xuICBsb2FkTWVzaDogbG9hZE1vZGVsLFxuICBhZGRDb250cm9sczogKGNhbWVyYSwgcmVuZGVyZXIsIHNjZW5lLCBndWksIG1lc2gpID0+IHtcbiAgICBjb25zdCBjb250cm9scyA9IG5ldyBPcmJpdENvbnRyb2xzKGNhbWVyYSwgcmVuZGVyZXIuZG9tRWxlbWVudClcblxuICAgIC8vIHBsYXkgYW5pbWF0aW9uXG4gICAgbWl4ZXIgPSBuZXcgVEhSRUUuQW5pbWF0aW9uTWl4ZXIobWVzaC5nZXRPYmplY3RCeU5hbWUoJ3NrZWxldG9uSGVscGVyJykpXG4gICAgbWl4ZXIuY2xpcEFjdGlvbihhbmltYXRpb24pLnBsYXkoKVxuICAgIHJldHVybiBjb250cm9sc1xuICB9LFxuICBvblJlbmRlcjogKGNsb2NrKSA9PiB7XG4gICAgaWYgKG1peGVyKSB7XG4gICAgICBtaXhlci51cGRhdGUoY2xvY2suZ2V0RGVsdGEoKSlcbiAgICB9XG4gIH1cbn0pLnRoZW4oKVxuIiwiaW1wb3J0IHsgaW5pdFNjZW5lIH0gZnJvbSAnLi4vLi4vLi4vYm9vdHN0cmFwL2Jvb3RzdHJhcCdcbmltcG9ydCB7IGludGlhbGl6ZVJlbmRlcmVyQ29udHJvbHMgfSBmcm9tICcuLi8uLi8uLi9jb250cm9scy9yZW5kZXJlci1jb250cm9sJ1xuXG5pbXBvcnQgR1VJIGZyb20gJ2xpbC1ndWknXG5pbXBvcnQgeyBpbml0aWFsaXplU2NlbmVDb250cm9scyB9IGZyb20gJy4uLy4uLy4uL2NvbnRyb2xzL3NjZW5lLWNvbnRyb2xzJ1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5pbXBvcnQgeyBmbG9hdGluZ0Zsb29yIH0gZnJvbSAnLi4vLi4vLi4vYm9vdHN0cmFwL2Zsb29yJ1xuXG5leHBvcnQgY29uc3QgYm9vdHN0cmFwTWVzaFNjZW5lID0gYXN5bmMgKHtcbiAgbG9hZE1lc2gsXG4gIHByb3ZpZGVHdWksXG4gIGhpZGVmbG9vcixcbiAgZmxvb3JTaXplLFxuICBiYWNrZ3JvdW5kQ29sb3IsXG4gIG9uUmVuZGVyLFxuICBhZGRDb250cm9sc1xufSkgPT4ge1xuICBjb25zdCBwcm9wcyA9IHtcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IGJhY2tncm91bmRDb2xvciA/PyAweGZmZmZmZixcbiAgICBkaXNhYmxlRGVmYXVsdENvbnRyb2xzOiB0cnVlXG4gIH1cblxuICBjb25zdCBtZXNoID0gYXdhaXQgbG9hZE1lc2goKVxuXG4gIGNvbnN0IGd1aSA9IG5ldyBHVUkoKVxuICBjb25zdCBjbG9jayA9IG5ldyBUSFJFRS5DbG9jaygpXG5cbiAgY29uc3QgaW5pdCA9IGFzeW5jICgpID0+IHtcbiAgICBpbml0U2NlbmUocHJvcHMpKCh7IHNjZW5lLCBjYW1lcmEsIHJlbmRlcmVyIH0pID0+IHtcbiAgICAgIHJlbmRlcmVyLnNoYWRvd01hcC50eXBlID0gVEhSRUUuUENGU29mdFNoYWRvd01hcFxuICAgICAgY2FtZXJhLnBvc2l0aW9uLnggPSAtM1xuICAgICAgY2FtZXJhLnBvc2l0aW9uLnogPSA4XG4gICAgICBjYW1lcmEucG9zaXRpb24ueSA9IDJcblxuICAgICAgaGlkZWZsb29yID8/IGZsb2F0aW5nRmxvb3Ioc2NlbmUsIGZsb29yU2l6ZSA/PyA4KVxuXG4gICAgICBpZiAobWVzaCkgc2NlbmUuYWRkKG1lc2gpXG5cbiAgICAgIGludGlhbGl6ZVJlbmRlcmVyQ29udHJvbHMoZ3VpLCByZW5kZXJlcilcbiAgICAgIGluaXRpYWxpemVTY2VuZUNvbnRyb2xzKGd1aSwgc2NlbmUsIGZhbHNlKVxuXG4gICAgICBpZiAocHJvdmlkZUd1aSkgcHJvdmlkZUd1aShndWksIG1lc2gsIHNjZW5lKVxuICAgICAgbGV0IGNvbnRyb2xzID0gdW5kZWZpbmVkXG4gICAgICBpZiAoYWRkQ29udHJvbHMpIHtcbiAgICAgICAgY29udHJvbHMgPSBhZGRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLCBzY2VuZSwgZ3VpLCBtZXNoKVxuICAgICAgfVxuXG4gICAgICBhbmltYXRlKClcblxuICAgICAgZnVuY3Rpb24gYW5pbWF0ZSgpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpXG4gICAgICAgIHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhKVxuICAgICAgICBpZiAob25SZW5kZXIpIG9uUmVuZGVyKGNsb2NrLCBjb250cm9scywgY2FtZXJhLCBzY2VuZSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgaW5pdCgpLnRoZW4oKVxufVxuIiwiaW1wb3J0IHsgT3JiaXRDb250cm9scyB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9jb250cm9scy9PcmJpdENvbnRyb2xzJ1xuXG5leHBvcnQgY29uc3QgaW5pdE9yYml0Q29udHJvbHMgPSAoY2FtZXJhLCByZW5kZXJlcikgPT4ge1xuICBjb25zdCBjb250cm9sbGVyID0gbmV3IE9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlci5kb21FbGVtZW50KVxuICBjb250cm9sbGVyLmVuYWJsZURhbXBpbmcgPSB0cnVlXG4gIGNvbnRyb2xsZXIuZGFtcGluZ0ZhY3RvciA9IDAuMDVcbiAgY29udHJvbGxlci5taW5EaXN0YW5jZSA9IDFcbiAgY29udHJvbGxlci5tYXhEaXN0YW5jZSA9IDEwMFxuICBjb250cm9sbGVyLm1pblBvbGFyQW5nbGUgPSBNYXRoLlBJIC8gNFxuICBjb250cm9sbGVyLm1heFBvbGFyQW5nbGUgPSAoMyAqIE1hdGguUEkpIC8gNFxuXG4gIHJldHVybiBjb250cm9sbGVyXG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcblxuY29uc3QgZW51bXMgPSB7XG4gIHRvbmVNYXBwaW5nT3B0aW9uczoge1xuICAgIE5vbmU6IFRIUkVFLk5vVG9uZU1hcHBpbmcsXG4gICAgTGluZWFyOiBUSFJFRS5MaW5lYXJUb25lTWFwcGluZyxcbiAgICBSZWluaGFyZDogVEhSRUUuUmVpbmhhcmRUb25lTWFwcGluZyxcbiAgICBDaW5lb246IFRIUkVFLkNpbmVvblRvbmVNYXBwaW5nLFxuICAgIEFDRVNGaWxtaWM6IFRIUkVFLkFDRVNGaWxtaWNUb25lTWFwcGluZyxcbiAgICBDdXN0b206IFRIUkVFLkN1c3RvbVRvbmVNYXBwaW5nLFxuICB9LFxuICBzaGFkb3dNYXBwaW5nOiB7XG4gICAgQmFzaWM6IFRIUkVFLkJhc2ljU2hhZG93TWFwLFxuICAgIFBDRlM6IFRIUkVFLlBDRlNoYWRvd01hcCxcbiAgICBQQ0ZTb2Z0OiBUSFJFRS5QQ0ZTb2Z0U2hhZG93TWFwLFxuICAgIFZTTTogVEhSRUUuVlNNU2hhZG93TWFwLFxuICB9LFxuICBvdXRwdXRFbmNvZGluZ3M6IHtcbiAgICBMaW5lYXI6IFRIUkVFLkxpbmVhckVuY29kaW5nLFxuICAgIHNSR0I6IFRIUkVFLnNSR0JFbmNvZGluZyxcbiAgfSxcbn07XG5cbmNvbnN0IGdldFByb3BlcnR5SG9sZGVyID0gKHdlYkdMUmVuZGVyZXIpID0+IHtcbiAgY29uc3QgY2xlYXJDb2xvckhvbGRlciA9IG5ldyBUSFJFRS5Db2xvcigpO1xuICB3ZWJHTFJlbmRlcmVyLmdldENsZWFyQ29sb3IoY2xlYXJDb2xvckhvbGRlcik7XG5cbiAgY29uc3QgaG9sZGVyID0ge1xuICAgIG1haW46IHtcbiAgICAgIG91dHB1dEVuY29kaW5nOiB3ZWJHTFJlbmRlcmVyLm91dHB1dEVuY29kaW5nLFxuICAgIH0sXG4gICAgc2hhZG93TWFwOiB7XG4gICAgICBlbmFibGVkOiB3ZWJHTFJlbmRlcmVyLnNoYWRvd01hcC5lbmFibGVkLFxuICAgICAgYXV0b1VwZGF0ZTogd2ViR0xSZW5kZXJlci5zaGFkb3dNYXAuYXV0b1VwZGF0ZSxcbiAgICAgIG5lZWRzVXBkYXRlOiAoKSA9PiAod2ViR0xSZW5kZXJlci5zaGFkb3dNYXAubmVlZHNVcGRhdGUgPSB0cnVlKSxcbiAgICAgIHR5cGU6IHdlYkdMUmVuZGVyZXIuc2hhZG93TWFwLnR5cGUsXG4gICAgfSxcbiAgICB0b25lTWFwcGluZzoge1xuICAgICAgZXhwb3N1cmU6IHdlYkdMUmVuZGVyZXIudG9uZU1hcHBpbmdFeHBvc3VyZSxcbiAgICAgIHRvbmVNYXBwaW5nOiB3ZWJHTFJlbmRlcmVyLnRvbmVNYXBwaW5nLFxuICAgIH0sXG4gICAgY2xlYXJTZXR0aW5nczoge1xuICAgICAgYXV0b0NsZWFyOiB3ZWJHTFJlbmRlcmVyLmF1dG9DbGVhcixcbiAgICAgIGNsZWFyQ29sb3I6IGNsZWFyQ29sb3JIb2xkZXIuZ2V0U3R5bGUoKSxcbiAgICB9LFxuICAgIGFkdmFuY2VkOiB7XG4gICAgICBhdXRvQ2xlYXJEZXB0aDogd2ViR0xSZW5kZXJlci5hdXRvQ2xlYXJEZXB0aCxcbiAgICAgIGF1dG9DbGVhclN0ZW5jaWw6IHdlYkdMUmVuZGVyZXIuYXV0b0NsZWFyU3RlbmNpbCxcbiAgICAgIGNoZWNrU2hhZGVyRXJyb3JzOiB3ZWJHTFJlbmRlcmVyLmRlYnVnLmNoZWNrU2hhZGVyRXJyb3JzLFxuICAgICAgc29ydE9iamVjdHM6IHdlYkdMUmVuZGVyZXIuc29ydE9iamVjdHMsXG4gICAgICBsb2NhbENsaXBwaW5nRW5hYmxlZDogd2ViR0xSZW5kZXJlci5sb2NhbENsaXBwaW5nRW5hYmxlZCxcbiAgICAgIHBoeXNpY2FsbHlDb3JyZWN0TGlnaHRzOiB3ZWJHTFJlbmRlcmVyLnBoeXNpY2FsbHlDb3JyZWN0TGlnaHRzLFxuICAgIH0sXG4gIH07XG5cbiAgcmV0dXJuIGhvbGRlcjtcbn07XG5cbmV4cG9ydCBjb25zdCBpbnRpYWxpemVSZW5kZXJlckNvbnRyb2xzID0gKGd1aSwgd2ViR0xSZW5kZXJlcikgPT4ge1xuICBjb25zdCBwcm9wZXJ0aWVzT2JqZWN0ID0gZ2V0UHJvcGVydHlIb2xkZXIod2ViR0xSZW5kZXJlcik7XG4gIGNvbnN0IHJlbmRlcmVyRm9sZGVyID0gZ3VpLmFkZEZvbGRlcihcIldlYkdMUmVuZGVyZXJcIik7XG5cbiAgcmVuZGVyZXJGb2xkZXIub25DaGFuZ2UoKF8pID0+IHtcbiAgICB1cGRhdGVXZWJHTFJlbmRlcmVyUHJvcGVydGllcyh3ZWJHTFJlbmRlcmVyLCBwcm9wZXJ0aWVzT2JqZWN0KTtcbiAgfSk7XG5cbiAgcmVuZGVyZXJGb2xkZXIuYWRkKFxuICAgIHByb3BlcnRpZXNPYmplY3QubWFpbixcbiAgICBcIm91dHB1dEVuY29kaW5nXCIsXG4gICAgZW51bXMub3V0cHV0RW5jb2RpbmdzXG4gICk7XG5cbiAgY29uc3Qgc2hhZG93Rm9sZGVyID0gcmVuZGVyZXJGb2xkZXIuYWRkRm9sZGVyKFwiU2hhZG93XCIpO1xuICBzaGFkb3dGb2xkZXIuYWRkKHByb3BlcnRpZXNPYmplY3Quc2hhZG93TWFwLCBcImVuYWJsZWRcIik7XG4gIHNoYWRvd0ZvbGRlci5hZGQocHJvcGVydGllc09iamVjdC5zaGFkb3dNYXAsIFwiYXV0b1VwZGF0ZVwiKTtcbiAgc2hhZG93Rm9sZGVyLmFkZChwcm9wZXJ0aWVzT2JqZWN0LnNoYWRvd01hcCwgXCJuZWVkc1VwZGF0ZVwiKTtcbiAgc2hhZG93Rm9sZGVyXG4gICAgLmFkZChwcm9wZXJ0aWVzT2JqZWN0LnNoYWRvd01hcCwgXCJ0eXBlXCIsIGVudW1zLnNoYWRvd01hcHBpbmcpXG4gICAgLmVuYWJsZShmYWxzZSk7IC8vIGNhbid0IHVwZGF0ZSB0aGUgc2hhZG93IG1hcHBpbmcgdHlwZSBpbiBydW50aW1lXG5cbiAgY29uc3QgdG9uZU1hcHBpbmdGb2xkZXIgPSByZW5kZXJlckZvbGRlci5hZGRGb2xkZXIoXCJUb25lTWFwcGluZ1wiKTtcbiAgdG9uZU1hcHBpbmdGb2xkZXIuYWRkKHByb3BlcnRpZXNPYmplY3QudG9uZU1hcHBpbmcsIFwiZXhwb3N1cmVcIiwgMCwgMik7XG4gIHRvbmVNYXBwaW5nRm9sZGVyLmFkZChcbiAgICBwcm9wZXJ0aWVzT2JqZWN0LnRvbmVNYXBwaW5nLFxuICAgIFwidG9uZU1hcHBpbmdcIixcbiAgICBlbnVtcy50b25lTWFwcGluZ09wdGlvbnNcbiAgKTtcblxuICBjb25zdCBjbGVhclNldHRpbmdzRm9sZGVyID0gcmVuZGVyZXJGb2xkZXIuYWRkRm9sZGVyKFwiY2xlYXJTZXR0aW5nc1wiKTtcbiAgY2xlYXJTZXR0aW5nc0ZvbGRlci5hZGQocHJvcGVydGllc09iamVjdC5jbGVhclNldHRpbmdzLCBcImF1dG9DbGVhclwiKTtcbiAgY2xlYXJTZXR0aW5nc0ZvbGRlci5hZGRDb2xvcihwcm9wZXJ0aWVzT2JqZWN0LmNsZWFyU2V0dGluZ3MsIFwiY2xlYXJDb2xvclwiKTtcblxuICByZW5kZXJlckZvbGRlci5jbG9zZSgpO1xufTtcblxuY29uc3QgdXBkYXRlV2ViR0xSZW5kZXJlclByb3BlcnRpZXMgPSAod2ViR0xSZW5kZXJlciwgcHJvcGVydHlIb2xkZXIpID0+IHtcbiAgd2ViR0xSZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IHByb3BlcnR5SG9sZGVyLnNoYWRvd01hcC5lbmFibGVkO1xuICB3ZWJHTFJlbmRlcmVyLnNoYWRvd01hcC5hdXRvVXBkYXRlID0gcHJvcGVydHlIb2xkZXIuc2hhZG93TWFwLmF1dG9VcGRhdGU7XG4gIHdlYkdMUmVuZGVyZXIuc2hhZG93TWFwLm5lZWRzVXBkYXRlID0gcHJvcGVydHlIb2xkZXIuc2hhZG93TWFwLm5lZWRzVXBkYXRlO1xuICB3ZWJHTFJlbmRlcmVyLnRvbmVNYXBwaW5nID0gcHJvcGVydHlIb2xkZXIudG9uZU1hcHBpbmcudG9uZU1hcHBpbmc7XG4gIHdlYkdMUmVuZGVyZXIudG9uZU1hcHBpbmdFeHBvc3VyZSA9IHByb3BlcnR5SG9sZGVyLnRvbmVNYXBwaW5nLmV4cG9zdXJlO1xuICB3ZWJHTFJlbmRlcmVyLmF1dG9DbGVhciA9IHByb3BlcnR5SG9sZGVyLmNsZWFyU2V0dGluZ3MuYXV0b0NsZWFyO1xuICB3ZWJHTFJlbmRlcmVyLnNldENsZWFyQ29sb3IocHJvcGVydHlIb2xkZXIuY2xlYXJTZXR0aW5ncy5jbGVhckNvbG9yKTtcbiAgd2ViR0xSZW5kZXJlci5vdXRwdXRFbmNvZGluZyA9IHByb3BlcnR5SG9sZGVyLm1haW4ub3V0cHV0RW5jb2Rpbmc7XG5cbiAgd2ViR0xSZW5kZXJlci5uZWVkc1VwZGF0ZSA9IHRydWU7XG59O1xuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5cbmNvbnN0IHRleHR1cmVMb2FkZXIgPSBuZXcgVEhSRUUuVGV4dHVyZUxvYWRlcigpXG5cbmNvbnN0IHByb3BlcnRpZXNPYmplY3QgPSAoc2NlbmUpID0+ICh7XG4gIG92ZXJyaWRlTWF0ZXJpYWw6IHtcbiAgICB0b2dnbGU6ICgpID0+IHtcbiAgICAgIGlmIChzY2VuZS5vdmVycmlkZU1hdGVyaWFsICE9PSBudWxsKSB7XG4gICAgICAgIHNjZW5lLm92ZXJyaWRlTWF0ZXJpYWwgPSBudWxsXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY2VuZS5vdmVycmlkZU1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hOb3JtYWxNYXRlcmlhbCgpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBiYWNrR3JvdW5kOiAnV2hpdGUnLFxuICBlbnZpcm9ubWVudDoge1xuICAgIHRvZ2dsZTogKCkgPT4ge1xuICAgICAgaWYgKHNjZW5lLmVudmlyb25tZW50ICE9PSBudWxsKSB7XG4gICAgICAgIHNjZW5lLmVudmlyb25tZW50ID0gbnVsbFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGV4dHVyZUxvYWRlci5sb2FkKCcvYXNzZXRzL2VxdWkuanBlZycsIChsb2FkZWQpID0+IHtcbiAgICAgICAgICBsb2FkZWQubWFwcGluZyA9IFRIUkVFLkVxdWlyZWN0YW5ndWxhclJlZmxlY3Rpb25NYXBwaW5nXG4gICAgICAgICAgc2NlbmUuZW52aXJvbm1lbnQgPSBsb2FkZWRcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pXG5cbmNvbnN0IGZvZ1Byb3BlcnRpZXMgPSAoZm9nKSA9PiAoe1xuICBjb2xvcjogMHhmZmZmZmYsXG4gIG5lYXI6IGZvZy5uZWFyLFxuICBmYXI6IGZvZy5mYXJcbn0pXG5cbmV4cG9ydCBjb25zdCBpbml0aWFsaXplU2NlbmVDb250cm9scyA9IChndWksIHNjZW5lLCBmb2dFbmFibGVkLCBpc09wZW4pID0+IHtcbiAgY29uc3QgcHJvcHMgPSBwcm9wZXJ0aWVzT2JqZWN0KHNjZW5lKVxuICBjb25zdCBzY2VuZUNvbnRyb2xzID0gZ3VpLmFkZEZvbGRlcignU2NlbmUnKVxuXG4gIHNjZW5lQ29udHJvbHNcbiAgICAuYWRkKHByb3BzLCAnYmFja0dyb3VuZCcsIFsnV2hpdGUnLCAnQmxhY2snLCAnTnVsbCcsICdDb2xvcicsICdUZXh0dXJlJywgJ0N1YmVtYXAnXSlcbiAgICAub25DaGFuZ2UoKGV2ZW50KSA9PiBoYW5kbGVCYWNrZ3JvdW5kQ2hhbmdlKGV2ZW50LCBzY2VuZSkpXG4gIHNjZW5lQ29udHJvbHMuYWRkKHByb3BzLm92ZXJyaWRlTWF0ZXJpYWwsICd0b2dnbGUnKS5uYW1lKCdUb2dnbGUgT3ZlcnJpZGUgTWF0ZXJpYWwnKVxuICBzY2VuZUNvbnRyb2xzLmFkZChwcm9wcy5lbnZpcm9ubWVudCwgJ3RvZ2dsZScpLm5hbWUoJ1RvZ2dsZSBFbnZpcm9ubWVudCcpXG5cbiAgaWYgKGZvZ0VuYWJsZWQpIHtcbiAgICBjb25zdCBmb2dDb2xvciA9IG5ldyBUSFJFRS5Db2xvcigweGZmZmZmZilcbiAgICBjb25zdCBmb2cgPSBuZXcgVEhSRUUuRm9nKGZvZ0NvbG9yLCAxLCAyMClcbiAgICBzY2VuZS5mb2cgPSBmb2dcbiAgICBjb25zdCBmb2dQcm9wcyA9IGZvZ1Byb3BlcnRpZXMoZm9nKVxuICAgIGNvbnN0IGZvZ0NvbnRyb2xzID0gc2NlbmVDb250cm9scy5hZGRGb2xkZXIoJ0ZvZycpXG4gICAgZm9nQ29udHJvbHMuYWRkQ29sb3IoZm9nUHJvcHMsICdjb2xvcicpXG4gICAgZm9nQ29udHJvbHMuYWRkKGZvZ1Byb3BzLCAnbmVhcicsIDAsIDEwLCAwLjEpXG4gICAgZm9nQ29udHJvbHMuYWRkKGZvZ1Byb3BzLCAnZmFyJywgMCwgMTAwLCAwLjEpXG5cbiAgICBmb2dDb250cm9scy5vbkNoYW5nZSgoKSA9PiB7XG4gICAgICBmb2cuY29sb3IgPSBmb2dDb2xvci5zZXRIZXgoZm9nUHJvcHMuY29sb3IpXG4gICAgICBmb2cubmVhciA9IGZvZ1Byb3BzLm5lYXJcbiAgICAgIGZvZy5mYXIgPSBmb2dQcm9wcy5mYXJcbiAgICB9KVxuICB9XG5cbiAgaXNPcGVuID8gc2NlbmVDb250cm9scy5vcGVuKCkgOiBzY2VuZUNvbnRyb2xzLmNsb3NlKClcbn1cblxuY29uc3QgaGFuZGxlQmFja2dyb3VuZENoYW5nZSA9IChzZXR0aW5nLCBzY2VuZSkgPT4ge1xuICBzd2l0Y2ggKHNldHRpbmcpIHtcbiAgICBjYXNlICdXaGl0ZSc6XG4gICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbmV3IFRIUkVFLkNvbG9yKDB4ZmZmZmZmKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdCbGFjayc6XG4gICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbmV3IFRIUkVFLkNvbG9yKDB4MDAwMDAwKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdOdWxsJzpcbiAgICAgIHNjZW5lLmJhY2tncm91bmQgPSBudWxsXG4gICAgICBicmVha1xuICAgIGNhc2UgJ0NvbG9yJzpcbiAgICAgIHNjZW5lLmJhY2tncm91bmQgPSBuZXcgVEhSRUUuQ29sb3IoMHg0NGZmNDQpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ1RleHR1cmUnOlxuICAgICAgdGV4dHVyZUxvYWRlci5sb2FkKCcvYXNzZXRzL3RleHR1cmVzL3dvb2QvYWJzdHJhY3QtYW50aXF1ZS1iYWNrZHJvcC0xNjQwMDUuanBnJywgKGxvYWRlZCkgPT4ge1xuICAgICAgICBsb2FkZWQuZW5jb2RpbmcgPSBUSFJFRS5zUkdCRW5jb2RpbmdcbiAgICAgICAgc2NlbmUuYmFja2dyb3VuZCA9IGxvYWRlZFxuICAgICAgICBzY2VuZS5lbnZpcm9ubWVudCA9IG51bGxcbiAgICAgIH0pXG4gICAgICBicmVha1xuICAgIGNhc2UgJ0N1YmVtYXAnOlxuICAgICAgdGV4dHVyZUxvYWRlci5sb2FkKCcvYXNzZXRzL2VxdWkuanBlZycsIChsb2FkZWQpID0+IHtcbiAgICAgICAgbG9hZGVkLm1hcHBpbmcgPSBUSFJFRS5FcXVpcmVjdGFuZ3VsYXJSZWZsZWN0aW9uTWFwcGluZ1xuICAgICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbG9hZGVkXG4gICAgICAgIHNjZW5lLmVudmlyb25tZW50ID0gbG9hZGVkXG4gICAgICB9KVxuXG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICBicmVha1xuICB9XG59XG4iLCJleHBvcnQgY29uc3QgdmlzaXRDaGlsZHJlbiA9IChvYmplY3QsIGZuKSA9PiB7XG4gIGlmIChvYmplY3QuY2hpbGRyZW4gJiYgb2JqZWN0LmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIG9iamVjdC5jaGlsZHJlbikge1xuICAgICAgdmlzaXRDaGlsZHJlbihjaGlsZCwgZm4pXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZuKG9iamVjdClcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgYXBwbHlTaGFkb3dzQW5kRGVwdGhXcml0ZSA9IChvYmplY3QpID0+IHtcbiAgdmlzaXRDaGlsZHJlbihvYmplY3QsIChjaGlsZCkgPT4ge1xuICAgIGlmIChjaGlsZC5tYXRlcmlhbCkge1xuICAgICAgY2hpbGQubWF0ZXJpYWwuZGVwdGhXcml0ZSA9IHRydWVcbiAgICAgIGNoaWxkLmNhc3RTaGFkb3cgPSB0cnVlXG4gICAgICBjaGlsZC5yZWNlaXZlU2hhZG93ID0gdHJ1ZVxuICAgIH1cbiAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IGZpbmRDaGlsZCA9IChvYmplY3QsIG5hbWUpID0+IHtcbiAgaWYgKG9iamVjdC5jaGlsZHJlbiAmJiBvYmplY3QuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgIGZvciAoY29uc3QgY2hpbGQgb2Ygb2JqZWN0LmNoaWxkcmVuKSB7XG4gICAgICBpZiAobmFtZSA9PT0gY2hpbGQubmFtZSkge1xuICAgICAgICByZXR1cm4gY2hpbGRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGZpbmRDaGlsZChjaGlsZCwgbmFtZSlcbiAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgIHJldHVybiByZXNcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAobmFtZSA9PT0gb2JqZWN0Lm5hbWUpIHtcbiAgICAgIHJldHVybiBvYmplY3RcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IG9uUmVzaXplID0gKGNhbWVyYSwgcmVuZGVyZXIpID0+IHtcbiAgY29uc3QgcmVzaXplciA9ICgpID0+IHtcbiAgICBjYW1lcmEuYXNwZWN0ID0gd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICBjYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpXG4gICAgcmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KVxuICB9XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemVyLCBmYWxzZSlcbn1cbiIsImltcG9ydCB7XG5cdEFuaW1hdGlvbkNsaXAsXG5cdEJvbmUsXG5cdEZpbGVMb2FkZXIsXG5cdExvYWRlcixcblx0UXVhdGVybmlvbixcblx0UXVhdGVybmlvbktleWZyYW1lVHJhY2ssXG5cdFNrZWxldG9uLFxuXHRWZWN0b3IzLFxuXHRWZWN0b3JLZXlmcmFtZVRyYWNrXG59IGZyb20gJ3RocmVlJztcblxuLyoqXG4gKiBEZXNjcmlwdGlvbjogcmVhZHMgQlZIIGZpbGVzIGFuZCBvdXRwdXRzIGEgc2luZ2xlIFNrZWxldG9uIGFuZCBhbiBBbmltYXRpb25DbGlwXG4gKlxuICogQ3VycmVudGx5IG9ubHkgc3VwcG9ydHMgYnZoIGZpbGVzIGNvbnRhaW5pbmcgYSBzaW5nbGUgcm9vdC5cbiAqXG4gKi9cblxuY2xhc3MgQlZITG9hZGVyIGV4dGVuZHMgTG9hZGVyIHtcblxuXHRjb25zdHJ1Y3RvciggbWFuYWdlciApIHtcblxuXHRcdHN1cGVyKCBtYW5hZ2VyICk7XG5cblx0XHR0aGlzLmFuaW1hdGVCb25lUG9zaXRpb25zID0gdHJ1ZTtcblx0XHR0aGlzLmFuaW1hdGVCb25lUm90YXRpb25zID0gdHJ1ZTtcblxuXHR9XG5cblx0bG9hZCggdXJsLCBvbkxvYWQsIG9uUHJvZ3Jlc3MsIG9uRXJyb3IgKSB7XG5cblx0XHRjb25zdCBzY29wZSA9IHRoaXM7XG5cblx0XHRjb25zdCBsb2FkZXIgPSBuZXcgRmlsZUxvYWRlciggc2NvcGUubWFuYWdlciApO1xuXHRcdGxvYWRlci5zZXRQYXRoKCBzY29wZS5wYXRoICk7XG5cdFx0bG9hZGVyLnNldFJlcXVlc3RIZWFkZXIoIHNjb3BlLnJlcXVlc3RIZWFkZXIgKTtcblx0XHRsb2FkZXIuc2V0V2l0aENyZWRlbnRpYWxzKCBzY29wZS53aXRoQ3JlZGVudGlhbHMgKTtcblx0XHRsb2FkZXIubG9hZCggdXJsLCBmdW5jdGlvbiAoIHRleHQgKSB7XG5cblx0XHRcdHRyeSB7XG5cblx0XHRcdFx0b25Mb2FkKCBzY29wZS5wYXJzZSggdGV4dCApICk7XG5cblx0XHRcdH0gY2F0Y2ggKCBlICkge1xuXG5cdFx0XHRcdGlmICggb25FcnJvciApIHtcblxuXHRcdFx0XHRcdG9uRXJyb3IoIGUgKTtcblxuXHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvciggZSApO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRzY29wZS5tYW5hZ2VyLml0ZW1FcnJvciggdXJsICk7XG5cblx0XHRcdH1cblxuXHRcdH0sIG9uUHJvZ3Jlc3MsIG9uRXJyb3IgKTtcblxuXHR9XG5cblx0cGFyc2UoIHRleHQgKSB7XG5cblx0XHQvKlxuXHRcdFx0cmVhZHMgYSBzdHJpbmcgYXJyYXkgKGxpbmVzKSBmcm9tIGEgQlZIIGZpbGVcblx0XHRcdGFuZCBvdXRwdXRzIGEgc2tlbGV0b24gc3RydWN0dXJlIGluY2x1ZGluZyBtb3Rpb24gZGF0YVxuXG5cdFx0XHRyZXR1cm5zIHRoZWUgcm9vdCBub2RlOlxuXHRcdFx0eyBuYW1lOiAnJywgY2hhbm5lbHM6IFtdLCBjaGlsZHJlbjogW10gfVxuXHRcdCovXG5cdFx0ZnVuY3Rpb24gcmVhZEJ2aCggbGluZXMgKSB7XG5cblx0XHRcdC8vIHJlYWQgbW9kZWwgc3RydWN0dXJlXG5cblx0XHRcdGlmICggbmV4dExpbmUoIGxpbmVzICkgIT09ICdISUVSQVJDSFknICkge1xuXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoICdUSFJFRS5CVkhMb2FkZXI6IEhJRVJBUkNIWSBleHBlY3RlZC4nICk7XG5cblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgbGlzdCA9IFtdOyAvLyBjb2xsZWN0cyBmbGF0IGFycmF5IG9mIGFsbCBib25lc1xuXHRcdFx0Y29uc3Qgcm9vdCA9IHJlYWROb2RlKCBsaW5lcywgbmV4dExpbmUoIGxpbmVzICksIGxpc3QgKTtcblxuXHRcdFx0Ly8gcmVhZCBtb3Rpb24gZGF0YVxuXG5cdFx0XHRpZiAoIG5leHRMaW5lKCBsaW5lcyApICE9PSAnTU9USU9OJyApIHtcblxuXHRcdFx0XHRjb25zb2xlLmVycm9yKCAnVEhSRUUuQlZITG9hZGVyOiBNT1RJT04gZXhwZWN0ZWQuJyApO1xuXG5cdFx0XHR9XG5cblx0XHRcdC8vIG51bWJlciBvZiBmcmFtZXNcblxuXHRcdFx0bGV0IHRva2VucyA9IG5leHRMaW5lKCBsaW5lcyApLnNwbGl0KCAvW1xcc10rLyApO1xuXHRcdFx0Y29uc3QgbnVtRnJhbWVzID0gcGFyc2VJbnQoIHRva2Vuc1sgMSBdICk7XG5cblx0XHRcdGlmICggaXNOYU4oIG51bUZyYW1lcyApICkge1xuXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoICdUSFJFRS5CVkhMb2FkZXI6IEZhaWxlZCB0byByZWFkIG51bWJlciBvZiBmcmFtZXMuJyApO1xuXG5cdFx0XHR9XG5cblx0XHRcdC8vIGZyYW1lIHRpbWVcblxuXHRcdFx0dG9rZW5zID0gbmV4dExpbmUoIGxpbmVzICkuc3BsaXQoIC9bXFxzXSsvICk7XG5cdFx0XHRjb25zdCBmcmFtZVRpbWUgPSBwYXJzZUZsb2F0KCB0b2tlbnNbIDIgXSApO1xuXG5cdFx0XHRpZiAoIGlzTmFOKCBmcmFtZVRpbWUgKSApIHtcblxuXHRcdFx0XHRjb25zb2xlLmVycm9yKCAnVEhSRUUuQlZITG9hZGVyOiBGYWlsZWQgdG8gcmVhZCBmcmFtZSB0aW1lLicgKTtcblxuXHRcdFx0fVxuXG5cdFx0XHQvLyByZWFkIGZyYW1lIGRhdGEgbGluZSBieSBsaW5lXG5cblx0XHRcdGZvciAoIGxldCBpID0gMDsgaSA8IG51bUZyYW1lczsgaSArKyApIHtcblxuXHRcdFx0XHR0b2tlbnMgPSBuZXh0TGluZSggbGluZXMgKS5zcGxpdCggL1tcXHNdKy8gKTtcblx0XHRcdFx0cmVhZEZyYW1lRGF0YSggdG9rZW5zLCBpICogZnJhbWVUaW1lLCByb290ICk7XG5cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGxpc3Q7XG5cblx0XHR9XG5cblx0XHQvKlxuXHRcdFx0UmVjdXJzaXZlbHkgcmVhZHMgZGF0YSBmcm9tIGEgc2luZ2xlIGZyYW1lIGludG8gdGhlIGJvbmUgaGllcmFyY2h5LlxuXHRcdFx0VGhlIHBhc3NlZCBib25lIGhpZXJhcmNoeSBoYXMgdG8gYmUgc3RydWN0dXJlZCBpbiB0aGUgc2FtZSBvcmRlciBhcyB0aGUgQlZIIGZpbGUuXG5cdFx0XHRrZXlmcmFtZSBkYXRhIGlzIHN0b3JlZCBpbiBib25lLmZyYW1lcy5cblxuXHRcdFx0LSBkYXRhOiBzcGxpdHRlZCBzdHJpbmcgYXJyYXkgKGZyYW1lIHZhbHVlcyksIHZhbHVlcyBhcmUgc2hpZnQoKWVkIHNvXG5cdFx0XHR0aGlzIHNob3VsZCBiZSBlbXB0eSBhZnRlciBwYXJzaW5nIHRoZSB3aG9sZSBoaWVyYXJjaHkuXG5cdFx0XHQtIGZyYW1lVGltZTogcGxheWJhY2sgdGltZSBmb3IgdGhpcyBrZXlmcmFtZS5cblx0XHRcdC0gYm9uZTogdGhlIGJvbmUgdG8gcmVhZCBmcmFtZSBkYXRhIGZyb20uXG5cdFx0Ki9cblx0XHRmdW5jdGlvbiByZWFkRnJhbWVEYXRhKCBkYXRhLCBmcmFtZVRpbWUsIGJvbmUgKSB7XG5cblx0XHRcdC8vIGVuZCBzaXRlcyBoYXZlIG5vIG1vdGlvbiBkYXRhXG5cblx0XHRcdGlmICggYm9uZS50eXBlID09PSAnRU5EU0lURScgKSByZXR1cm47XG5cblx0XHRcdC8vIGFkZCBrZXlmcmFtZVxuXG5cdFx0XHRjb25zdCBrZXlmcmFtZSA9IHtcblx0XHRcdFx0dGltZTogZnJhbWVUaW1lLFxuXHRcdFx0XHRwb3NpdGlvbjogbmV3IFZlY3RvcjMoKSxcblx0XHRcdFx0cm90YXRpb246IG5ldyBRdWF0ZXJuaW9uKClcblx0XHRcdH07XG5cblx0XHRcdGJvbmUuZnJhbWVzLnB1c2goIGtleWZyYW1lICk7XG5cblx0XHRcdGNvbnN0IHF1YXQgPSBuZXcgUXVhdGVybmlvbigpO1xuXG5cdFx0XHRjb25zdCB2eCA9IG5ldyBWZWN0b3IzKCAxLCAwLCAwICk7XG5cdFx0XHRjb25zdCB2eSA9IG5ldyBWZWN0b3IzKCAwLCAxLCAwICk7XG5cdFx0XHRjb25zdCB2eiA9IG5ldyBWZWN0b3IzKCAwLCAwLCAxICk7XG5cblx0XHRcdC8vIHBhcnNlIHZhbHVlcyBmb3IgZWFjaCBjaGFubmVsIGluIG5vZGVcblxuXHRcdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgYm9uZS5jaGFubmVscy5sZW5ndGg7IGkgKysgKSB7XG5cblx0XHRcdFx0c3dpdGNoICggYm9uZS5jaGFubmVsc1sgaSBdICkge1xuXG5cdFx0XHRcdFx0Y2FzZSAnWHBvc2l0aW9uJzpcblx0XHRcdFx0XHRcdGtleWZyYW1lLnBvc2l0aW9uLnggPSBwYXJzZUZsb2F0KCBkYXRhLnNoaWZ0KCkudHJpbSgpICk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlICdZcG9zaXRpb24nOlxuXHRcdFx0XHRcdFx0a2V5ZnJhbWUucG9zaXRpb24ueSA9IHBhcnNlRmxvYXQoIGRhdGEuc2hpZnQoKS50cmltKCkgKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ1pwb3NpdGlvbic6XG5cdFx0XHRcdFx0XHRrZXlmcmFtZS5wb3NpdGlvbi56ID0gcGFyc2VGbG9hdCggZGF0YS5zaGlmdCgpLnRyaW0oKSApO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnWHJvdGF0aW9uJzpcblx0XHRcdFx0XHRcdHF1YXQuc2V0RnJvbUF4aXNBbmdsZSggdngsIHBhcnNlRmxvYXQoIGRhdGEuc2hpZnQoKS50cmltKCkgKSAqIE1hdGguUEkgLyAxODAgKTtcblx0XHRcdFx0XHRcdGtleWZyYW1lLnJvdGF0aW9uLm11bHRpcGx5KCBxdWF0ICk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlICdZcm90YXRpb24nOlxuXHRcdFx0XHRcdFx0cXVhdC5zZXRGcm9tQXhpc0FuZ2xlKCB2eSwgcGFyc2VGbG9hdCggZGF0YS5zaGlmdCgpLnRyaW0oKSApICogTWF0aC5QSSAvIDE4MCApO1xuXHRcdFx0XHRcdFx0a2V5ZnJhbWUucm90YXRpb24ubXVsdGlwbHkoIHF1YXQgKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ1pyb3RhdGlvbic6XG5cdFx0XHRcdFx0XHRxdWF0LnNldEZyb21BeGlzQW5nbGUoIHZ6LCBwYXJzZUZsb2F0KCBkYXRhLnNoaWZ0KCkudHJpbSgpICkgKiBNYXRoLlBJIC8gMTgwICk7XG5cdFx0XHRcdFx0XHRrZXlmcmFtZS5yb3RhdGlvbi5tdWx0aXBseSggcXVhdCApO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLkJWSExvYWRlcjogSW52YWxpZCBjaGFubmVsIHR5cGUuJyApO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cdFx0XHQvLyBwYXJzZSBjaGlsZCBub2Rlc1xuXG5cdFx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBib25lLmNoaWxkcmVuLmxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0XHRyZWFkRnJhbWVEYXRhKCBkYXRhLCBmcmFtZVRpbWUsIGJvbmUuY2hpbGRyZW5bIGkgXSApO1xuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHQvKlxuXHRcdCBSZWN1cnNpdmVseSBwYXJzZXMgdGhlIEhJRVJBQ0hZIHNlY3Rpb24gb2YgdGhlIEJWSCBmaWxlXG5cblx0XHQgLSBsaW5lczogYWxsIGxpbmVzIG9mIHRoZSBmaWxlLiBsaW5lcyBhcmUgY29uc3VtZWQgYXMgd2UgZ28gYWxvbmcuXG5cdFx0IC0gZmlyc3RsaW5lOiBsaW5lIGNvbnRhaW5pbmcgdGhlIG5vZGUgdHlwZSBhbmQgbmFtZSBlLmcuICdKT0lOVCBoaXAnXG5cdFx0IC0gbGlzdDogY29sbGVjdHMgYSBmbGF0IGxpc3Qgb2Ygbm9kZXNcblxuXHRcdCByZXR1cm5zOiBhIEJWSCBub2RlIGluY2x1ZGluZyBjaGlsZHJlblxuXHRcdCovXG5cdFx0ZnVuY3Rpb24gcmVhZE5vZGUoIGxpbmVzLCBmaXJzdGxpbmUsIGxpc3QgKSB7XG5cblx0XHRcdGNvbnN0IG5vZGUgPSB7IG5hbWU6ICcnLCB0eXBlOiAnJywgZnJhbWVzOiBbXSB9O1xuXHRcdFx0bGlzdC5wdXNoKCBub2RlICk7XG5cblx0XHRcdC8vIHBhcnNlIG5vZGUgdHlwZSBhbmQgbmFtZVxuXG5cdFx0XHRsZXQgdG9rZW5zID0gZmlyc3RsaW5lLnNwbGl0KCAvW1xcc10rLyApO1xuXG5cdFx0XHRpZiAoIHRva2Vuc1sgMCBdLnRvVXBwZXJDYXNlKCkgPT09ICdFTkQnICYmIHRva2Vuc1sgMSBdLnRvVXBwZXJDYXNlKCkgPT09ICdTSVRFJyApIHtcblxuXHRcdFx0XHRub2RlLnR5cGUgPSAnRU5EU0lURSc7XG5cdFx0XHRcdG5vZGUubmFtZSA9ICdFTkRTSVRFJzsgLy8gYnZoIGVuZCBzaXRlcyBoYXZlIG5vIG5hbWVcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRub2RlLm5hbWUgPSB0b2tlbnNbIDEgXTtcblx0XHRcdFx0bm9kZS50eXBlID0gdG9rZW5zWyAwIF0udG9VcHBlckNhc2UoKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIG5leHRMaW5lKCBsaW5lcyApICE9PSAneycgKSB7XG5cblx0XHRcdFx0Y29uc29sZS5lcnJvciggJ1RIUkVFLkJWSExvYWRlcjogRXhwZWN0ZWQgb3BlbmluZyB7IGFmdGVyIHR5cGUgJiBuYW1lJyApO1xuXG5cdFx0XHR9XG5cblx0XHRcdC8vIHBhcnNlIE9GRlNFVFxuXG5cdFx0XHR0b2tlbnMgPSBuZXh0TGluZSggbGluZXMgKS5zcGxpdCggL1tcXHNdKy8gKTtcblxuXHRcdFx0aWYgKCB0b2tlbnNbIDAgXSAhPT0gJ09GRlNFVCcgKSB7XG5cblx0XHRcdFx0Y29uc29sZS5lcnJvciggJ1RIUkVFLkJWSExvYWRlcjogRXhwZWN0ZWQgT0ZGU0VUIGJ1dCBnb3Q6ICcgKyB0b2tlbnNbIDAgXSApO1xuXG5cdFx0XHR9XG5cblx0XHRcdGlmICggdG9rZW5zLmxlbmd0aCAhPT0gNCApIHtcblxuXHRcdFx0XHRjb25zb2xlLmVycm9yKCAnVEhSRUUuQlZITG9hZGVyOiBJbnZhbGlkIG51bWJlciBvZiB2YWx1ZXMgZm9yIE9GRlNFVC4nICk7XG5cblx0XHRcdH1cblxuXHRcdFx0Y29uc3Qgb2Zmc2V0ID0gbmV3IFZlY3RvcjMoXG5cdFx0XHRcdHBhcnNlRmxvYXQoIHRva2Vuc1sgMSBdICksXG5cdFx0XHRcdHBhcnNlRmxvYXQoIHRva2Vuc1sgMiBdICksXG5cdFx0XHRcdHBhcnNlRmxvYXQoIHRva2Vuc1sgMyBdIClcblx0XHRcdCk7XG5cblx0XHRcdGlmICggaXNOYU4oIG9mZnNldC54ICkgfHwgaXNOYU4oIG9mZnNldC55ICkgfHwgaXNOYU4oIG9mZnNldC56ICkgKSB7XG5cblx0XHRcdFx0Y29uc29sZS5lcnJvciggJ1RIUkVFLkJWSExvYWRlcjogSW52YWxpZCB2YWx1ZXMgb2YgT0ZGU0VULicgKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRub2RlLm9mZnNldCA9IG9mZnNldDtcblxuXHRcdFx0Ly8gcGFyc2UgQ0hBTk5FTFMgZGVmaW5pdGlvbnNcblxuXHRcdFx0aWYgKCBub2RlLnR5cGUgIT09ICdFTkRTSVRFJyApIHtcblxuXHRcdFx0XHR0b2tlbnMgPSBuZXh0TGluZSggbGluZXMgKS5zcGxpdCggL1tcXHNdKy8gKTtcblxuXHRcdFx0XHRpZiAoIHRva2Vuc1sgMCBdICE9PSAnQ0hBTk5FTFMnICkge1xuXG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvciggJ1RIUkVFLkJWSExvYWRlcjogRXhwZWN0ZWQgQ0hBTk5FTFMgZGVmaW5pdGlvbi4nICk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnN0IG51bUNoYW5uZWxzID0gcGFyc2VJbnQoIHRva2Vuc1sgMSBdICk7XG5cdFx0XHRcdG5vZGUuY2hhbm5lbHMgPSB0b2tlbnMuc3BsaWNlKCAyLCBudW1DaGFubmVscyApO1xuXHRcdFx0XHRub2RlLmNoaWxkcmVuID0gW107XG5cblx0XHRcdH1cblxuXHRcdFx0Ly8gcmVhZCBjaGlsZHJlblxuXG5cdFx0XHR3aGlsZSAoIHRydWUgKSB7XG5cblx0XHRcdFx0Y29uc3QgbGluZSA9IG5leHRMaW5lKCBsaW5lcyApO1xuXG5cdFx0XHRcdGlmICggbGluZSA9PT0gJ30nICkge1xuXG5cdFx0XHRcdFx0cmV0dXJuIG5vZGU7XG5cblx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdG5vZGUuY2hpbGRyZW4ucHVzaCggcmVhZE5vZGUoIGxpbmVzLCBsaW5lLCBsaXN0ICkgKTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdC8qXG5cdFx0XHRyZWN1cnNpdmVseSBjb252ZXJ0cyB0aGUgaW50ZXJuYWwgYnZoIG5vZGUgc3RydWN0dXJlIHRvIGEgQm9uZSBoaWVyYXJjaHlcblxuXHRcdFx0c291cmNlOiB0aGUgYnZoIHJvb3Qgbm9kZVxuXHRcdFx0bGlzdDogcGFzcyBhbiBlbXB0eSBhcnJheSwgY29sbGVjdHMgYSBmbGF0IGxpc3Qgb2YgYWxsIGNvbnZlcnRlZCBUSFJFRS5Cb25lc1xuXG5cdFx0XHRyZXR1cm5zIHRoZSByb290IEJvbmVcblx0XHQqL1xuXHRcdGZ1bmN0aW9uIHRvVEhSRUVCb25lKCBzb3VyY2UsIGxpc3QgKSB7XG5cblx0XHRcdGNvbnN0IGJvbmUgPSBuZXcgQm9uZSgpO1xuXHRcdFx0bGlzdC5wdXNoKCBib25lICk7XG5cblx0XHRcdGJvbmUucG9zaXRpb24uYWRkKCBzb3VyY2Uub2Zmc2V0ICk7XG5cdFx0XHRib25lLm5hbWUgPSBzb3VyY2UubmFtZTtcblxuXHRcdFx0aWYgKCBzb3VyY2UudHlwZSAhPT0gJ0VORFNJVEUnICkge1xuXG5cdFx0XHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHNvdXJjZS5jaGlsZHJlbi5sZW5ndGg7IGkgKysgKSB7XG5cblx0XHRcdFx0XHRib25lLmFkZCggdG9USFJFRUJvbmUoIHNvdXJjZS5jaGlsZHJlblsgaSBdLCBsaXN0ICkgKTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGJvbmU7XG5cblx0XHR9XG5cblx0XHQvKlxuXHRcdFx0YnVpbGRzIGEgQW5pbWF0aW9uQ2xpcCBmcm9tIHRoZSBrZXlmcmFtZSBkYXRhIHNhdmVkIGluIGVhY2ggYm9uZS5cblxuXHRcdFx0Ym9uZTogYnZoIHJvb3Qgbm9kZVxuXG5cdFx0XHRyZXR1cm5zOiBhIEFuaW1hdGlvbkNsaXAgY29udGFpbmluZyBwb3NpdGlvbiBhbmQgcXVhdGVybmlvbiB0cmFja3Ncblx0XHQqL1xuXHRcdGZ1bmN0aW9uIHRvVEhSRUVBbmltYXRpb24oIGJvbmVzICkge1xuXG5cdFx0XHRjb25zdCB0cmFja3MgPSBbXTtcblxuXHRcdFx0Ly8gY3JlYXRlIGEgcG9zaXRpb24gYW5kIHF1YXRlcm5pb24gYW5pbWF0aW9uIHRyYWNrIGZvciBlYWNoIG5vZGVcblxuXHRcdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgYm9uZXMubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0XHRcdGNvbnN0IGJvbmUgPSBib25lc1sgaSBdO1xuXG5cdFx0XHRcdGlmICggYm9uZS50eXBlID09PSAnRU5EU0lURScgKVxuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXG5cdFx0XHRcdC8vIHRyYWNrIGRhdGFcblxuXHRcdFx0XHRjb25zdCB0aW1lcyA9IFtdO1xuXHRcdFx0XHRjb25zdCBwb3NpdGlvbnMgPSBbXTtcblx0XHRcdFx0Y29uc3Qgcm90YXRpb25zID0gW107XG5cblx0XHRcdFx0Zm9yICggbGV0IGogPSAwOyBqIDwgYm9uZS5mcmFtZXMubGVuZ3RoOyBqICsrICkge1xuXG5cdFx0XHRcdFx0Y29uc3QgZnJhbWUgPSBib25lLmZyYW1lc1sgaiBdO1xuXG5cdFx0XHRcdFx0dGltZXMucHVzaCggZnJhbWUudGltZSApO1xuXG5cdFx0XHRcdFx0Ly8gdGhlIGFuaW1hdGlvbiBzeXN0ZW0gYW5pbWF0ZXMgdGhlIHBvc2l0aW9uIHByb3BlcnR5LFxuXHRcdFx0XHRcdC8vIHNvIHdlIGhhdmUgdG8gYWRkIHRoZSBqb2ludCBvZmZzZXQgdG8gYWxsIHZhbHVlc1xuXG5cdFx0XHRcdFx0cG9zaXRpb25zLnB1c2goIGZyYW1lLnBvc2l0aW9uLnggKyBib25lLm9mZnNldC54ICk7XG5cdFx0XHRcdFx0cG9zaXRpb25zLnB1c2goIGZyYW1lLnBvc2l0aW9uLnkgKyBib25lLm9mZnNldC55ICk7XG5cdFx0XHRcdFx0cG9zaXRpb25zLnB1c2goIGZyYW1lLnBvc2l0aW9uLnogKyBib25lLm9mZnNldC56ICk7XG5cblx0XHRcdFx0XHRyb3RhdGlvbnMucHVzaCggZnJhbWUucm90YXRpb24ueCApO1xuXHRcdFx0XHRcdHJvdGF0aW9ucy5wdXNoKCBmcmFtZS5yb3RhdGlvbi55ICk7XG5cdFx0XHRcdFx0cm90YXRpb25zLnB1c2goIGZyYW1lLnJvdGF0aW9uLnogKTtcblx0XHRcdFx0XHRyb3RhdGlvbnMucHVzaCggZnJhbWUucm90YXRpb24udyApO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIHNjb3BlLmFuaW1hdGVCb25lUG9zaXRpb25zICkge1xuXG5cdFx0XHRcdFx0dHJhY2tzLnB1c2goIG5ldyBWZWN0b3JLZXlmcmFtZVRyYWNrKCAnLmJvbmVzWycgKyBib25lLm5hbWUgKyAnXS5wb3NpdGlvbicsIHRpbWVzLCBwb3NpdGlvbnMgKSApO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIHNjb3BlLmFuaW1hdGVCb25lUm90YXRpb25zICkge1xuXG5cdFx0XHRcdFx0dHJhY2tzLnB1c2goIG5ldyBRdWF0ZXJuaW9uS2V5ZnJhbWVUcmFjayggJy5ib25lc1snICsgYm9uZS5uYW1lICsgJ10ucXVhdGVybmlvbicsIHRpbWVzLCByb3RhdGlvbnMgKSApO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbmV3IEFuaW1hdGlvbkNsaXAoICdhbmltYXRpb24nLCAtIDEsIHRyYWNrcyApO1xuXG5cdFx0fVxuXG5cdFx0Lypcblx0XHRcdHJldHVybnMgdGhlIG5leHQgbm9uLWVtcHR5IGxpbmUgaW4gbGluZXNcblx0XHQqL1xuXHRcdGZ1bmN0aW9uIG5leHRMaW5lKCBsaW5lcyApIHtcblxuXHRcdFx0bGV0IGxpbmU7XG5cdFx0XHQvLyBza2lwIGVtcHR5IGxpbmVzXG5cdFx0XHR3aGlsZSAoICggbGluZSA9IGxpbmVzLnNoaWZ0KCkudHJpbSgpICkubGVuZ3RoID09PSAwICkgeyB9XG5cblx0XHRcdHJldHVybiBsaW5lO1xuXG5cdFx0fVxuXG5cdFx0Y29uc3Qgc2NvcGUgPSB0aGlzO1xuXG5cdFx0Y29uc3QgbGluZXMgPSB0ZXh0LnNwbGl0KCAvW1xcclxcbl0rL2cgKTtcblxuXHRcdGNvbnN0IGJvbmVzID0gcmVhZEJ2aCggbGluZXMgKTtcblxuXHRcdGNvbnN0IHRocmVlQm9uZXMgPSBbXTtcblx0XHR0b1RIUkVFQm9uZSggYm9uZXNbIDAgXSwgdGhyZWVCb25lcyApO1xuXG5cdFx0Y29uc3QgdGhyZWVDbGlwID0gdG9USFJFRUFuaW1hdGlvbiggYm9uZXMgKTtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRza2VsZXRvbjogbmV3IFNrZWxldG9uKCB0aHJlZUJvbmVzICksXG5cdFx0XHRjbGlwOiB0aHJlZUNsaXBcblx0XHR9O1xuXG5cdH1cblxufVxuXG5leHBvcnQgeyBCVkhMb2FkZXIgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibG9hZC1idmhcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rbHRqc19mb3VydGhcIl0gPSBzZWxmW1wid2VicGFja0NodW5rbHRqc19mb3VydGhcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2J1aWxkX3RocmVlX21vZHVsZV9qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX2NvbnRyb2xzX09yYml0Q29udHJvbHNfanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX2xpbC1ndWlfZGlzdF9saWwtZ3VpX2VzbV9qc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci05L2xvYWQtYnZoLmpzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
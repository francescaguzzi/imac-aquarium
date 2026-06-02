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

/***/ "./samples/chapters/chapter-9/multiple-morph-targets.js"
/*!**************************************************************!*\
  !*** ./samples/chapters/chapter-9/multiple-morph-targets.js ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_standard_scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/standard-scene */ "./samples/chapters/chapter-9/util/standard-scene.js");
/* harmony import */ var three_examples_jsm_loaders_GLTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/loaders/GLTFLoader */ "./node_modules/three/examples/jsm/loaders/GLTFLoader.js");
/* harmony import */ var _util_modelUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/modelUtil */ "./samples/util/modelUtil.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _controls_material_controls__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../controls/material-controls */ "./samples/controls/material-controls.js");
/* harmony import */ var _controls_animation_controls__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../controls/animation-controls */ "./samples/controls/animation-controls.js");








let animations = []

const loadModel = () => {
  const loader = new three_examples_jsm_loaders_GLTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader()
  return loader.loadAsync('/assets/models/blender-morph-targets/morph-targets.gltf').then((container) => {
    ;(0,_util_modelUtil__WEBPACK_IMPORTED_MODULE_2__.applyShadowsAndDepthWrite)(container.scene)
    animations = container.animations
    return container.scene
  })
}

let mixer = undefined

;(0,_util_standard_scene__WEBPACK_IMPORTED_MODULE_0__.bootstrapMeshScene)({
  loadMesh: loadModel,
  addControls: (camera, renderer, scene, gui, mesh) => {
    const controls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_3__.OrbitControls(camera, renderer.domElement)
    ;(0,_controls_material_controls__WEBPACK_IMPORTED_MODULE_5__.initializeGuiMaterial)(gui, mesh.children[0], mesh.children[0].material).close()
    ;(0,_controls_material_controls__WEBPACK_IMPORTED_MODULE_5__.initializeGuiMeshStandardMaterial)(gui, mesh.children[0], mesh.children[0].material).close()

    mixer = new three__WEBPACK_IMPORTED_MODULE_4__.AnimationMixer(mesh)
    const action = mixer.clipAction(animations[0])

    // the first object is the mesh we want to work with
    const morphTargets = mesh.children[0].morphTargetInfluences

    const props = {
      cubeTarget: 0,
      coneTarget: 0
    }

    const folder = gui.addFolder('MorphTargets')
    folder.add(props, 'cubeTarget', 0, 1, 0.01).onChange((ev) => (morphTargets[0] = ev))
    folder.add(props, 'coneTarget', 0, 1, 0.01).onChange((ev) => (morphTargets[1] = ev))

    ;(0,_controls_animation_controls__WEBPACK_IMPORTED_MODULE_6__.initializeAnimationControls)(mixer, action, animations[0], gui)

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

/***/ "./node_modules/three/examples/jsm/helpers/VertexNormalsHelper.js"
/*!************************************************************************!*\
  !*** ./node_modules/three/examples/jsm/helpers/VertexNormalsHelper.js ***!
  \************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VertexNormalsHelper: () => (/* binding */ VertexNormalsHelper)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");


const _v1 = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();
const _v2 = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();
const _normalMatrix = new three__WEBPACK_IMPORTED_MODULE_0__.Matrix3();

class VertexNormalsHelper extends three__WEBPACK_IMPORTED_MODULE_0__.LineSegments {

	constructor( object, size = 1, color = 0xff0000 ) {

		const geometry = new three__WEBPACK_IMPORTED_MODULE_0__.BufferGeometry();

		const nNormals = object.geometry.attributes.normal.count;
		const positions = new three__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute( nNormals * 2 * 3, 3 );

		geometry.setAttribute( 'position', positions );

		super( geometry, new three__WEBPACK_IMPORTED_MODULE_0__.LineBasicMaterial( { color, toneMapped: false } ) );

		this.object = object;
		this.size = size;
		this.type = 'VertexNormalsHelper';

		//

		this.matrixAutoUpdate = false;

		this.update();

	}

	update() {

		this.object.updateMatrixWorld( true );

		_normalMatrix.getNormalMatrix( this.object.matrixWorld );

		const matrixWorld = this.object.matrixWorld;

		const position = this.geometry.attributes.position;

		//

		const objGeometry = this.object.geometry;

		if ( objGeometry ) {

			const objPos = objGeometry.attributes.position;

			const objNorm = objGeometry.attributes.normal;

			let idx = 0;

			// for simplicity, ignore index and drawcalls, and render every normal

			for ( let j = 0, jl = objPos.count; j < jl; j ++ ) {

				_v1.fromBufferAttribute( objPos, j ).applyMatrix4( matrixWorld );

				_v2.fromBufferAttribute( objNorm, j );

				_v2.applyMatrix3( _normalMatrix ).normalize().multiplyScalar( this.size ).add( _v1 );

				position.setXYZ( idx, _v1.x, _v1.y, _v1.z );

				idx = idx + 1;

				position.setXYZ( idx, _v2.x, _v2.y, _v2.z );

				idx = idx + 1;

			}

		}

		position.needsUpdate = true;

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
/******/ 			"multiple-morph-targets": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","vendors-node_modules_three_examples_jsm_loaders_GLTFLoader_js","samples_bootstrap_bootstrap_js-samples_controls_material-controls_js-samples_controls_rendere-c87d8a"], () => (__webpack_require__("./samples/chapters/chapter-9/multiple-morph-targets.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQy9CQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLCtCQUErQix3Q0FBd0M7V0FDdkU7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQkFBaUIscUJBQXFCO1dBQ3RDO1dBQ0E7V0FDQSxrQkFBa0IscUJBQXFCO1dBQ3ZDO1dBQ0E7V0FDQSxLQUFLO1dBQ0w7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEU7Ozs7O1dDM0JBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QsRTs7Ozs7V0NOQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0EsNEc7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvYm9vdHN0cmFwL2Zsb29yLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTkvbXVsdGlwbGUtbW9ycGgtdGFyZ2V0cy5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci05L3V0aWwvc3RhbmRhcmQtc2NlbmUuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NvbnRyb2xzL2FuaW1hdGlvbi1jb250cm9scy5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY29udHJvbHMvc2NlbmUtY29udHJvbHMuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9ub2RlX21vZHVsZXMvdGhyZWUvZXhhbXBsZXMvanNtL2hlbHBlcnMvVmVydGV4Tm9ybWFsc0hlbHBlci5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuXG5leHBvcnQgY29uc3QgZm9yZXZlclBsYW5lID0gKHNjZW5lKSA9PiB7XG4gIGNvbnN0IGdlbyA9IG5ldyBUSFJFRS5QbGFuZUJ1ZmZlckdlb21ldHJ5KDEwMDAwLCAxMDAwMClcbiAgY29uc3QgbWF0ID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoe1xuICAgIGNvbG9yOiAweGZmZmZmZlxuICB9KVxuICBjb25zdCBtZXNoID0gbmV3IFRIUkVFLk1lc2goZ2VvLCBtYXQpXG4gIG1lc2gucG9zaXRpb24uc2V0KDAsIC0yLCAwKVxuICBtZXNoLnJvdGF0aW9uLnNldChNYXRoLlBJIC8gLTIsIDAsIDApXG4gIG1lc2gucmVjZWl2ZVNoYWRvdyA9IHRydWVcbiAgbWVzaC5uYW1lID0gJ2ZvcmV2ZXItZmxvb3InXG4gIHNjZW5lLmFkZChtZXNoKVxuXG4gIHJldHVybiBtZXNoXG59XG5cbmV4cG9ydCBjb25zdCBmbG9hdGluZ0Zsb29yID0gKHNjZW5lLCBzaXplKSA9PiB7XG4gIGNvbnN0IHMgPSBzaXplID8gc2l6ZSA6IDZcbiAgY29uc3QgZ2VvID0gbmV3IFRIUkVFLkJveEJ1ZmZlckdlb21ldHJ5KHMsIDAuMjUsIHMsIDEwLCAxMCwgMTApXG4gIGNvbnN0IG1hdCA9IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7XG4gICAgY29sb3I6IDB4ZGRkZGRkXG4gIH0pXG4gIGNvbnN0IG1lc2ggPSBuZXcgVEhSRUUuTWVzaChnZW8sIG1hdClcbiAgbWVzaC5wb3NpdGlvbi5zZXQoMCwgLTIsIC0xKVxuICBtZXNoLnJlY2VpdmVTaGFkb3cgPSB0cnVlXG4gIG1lc2gubmFtZSA9ICdmbG9hdGluZy1mbG9vcidcbiAgc2NlbmUuYWRkKG1lc2gpXG5cbiAgcmV0dXJuIG1lc2hcbn1cbiIsImltcG9ydCB7IGJvb3RzdHJhcE1lc2hTY2VuZSB9IGZyb20gJy4vdXRpbC9zdGFuZGFyZC1zY2VuZSdcbmltcG9ydCB7IEdMVEZMb2FkZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyJ1xuaW1wb3J0IHsgYXBwbHlTaGFkb3dzQW5kRGVwdGhXcml0ZSwgdmlzaXRDaGlsZHJlbiB9IGZyb20gJy4uLy4uL3V0aWwvbW9kZWxVdGlsJ1xuaW1wb3J0IHsgT3JiaXRDb250cm9scyB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9jb250cm9scy9PcmJpdENvbnRyb2xzJ1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5pbXBvcnQgeyBpbml0aWFsaXplR3VpTWF0ZXJpYWwsIGluaXRpYWxpemVHdWlNZXNoU3RhbmRhcmRNYXRlcmlhbCB9IGZyb20gJy4uLy4uL2NvbnRyb2xzL21hdGVyaWFsLWNvbnRyb2xzJ1xuaW1wb3J0IHsgaW5pdGlhbGl6ZUFuaW1hdGlvbkNvbnRyb2xzIH0gZnJvbSAnLi4vLi4vY29udHJvbHMvYW5pbWF0aW9uLWNvbnRyb2xzJ1xuXG5sZXQgYW5pbWF0aW9ucyA9IFtdXG5cbmNvbnN0IGxvYWRNb2RlbCA9ICgpID0+IHtcbiAgY29uc3QgbG9hZGVyID0gbmV3IEdMVEZMb2FkZXIoKVxuICByZXR1cm4gbG9hZGVyLmxvYWRBc3luYygnL2Fzc2V0cy9tb2RlbHMvYmxlbmRlci1tb3JwaC10YXJnZXRzL21vcnBoLXRhcmdldHMuZ2x0ZicpLnRoZW4oKGNvbnRhaW5lcikgPT4ge1xuICAgIGFwcGx5U2hhZG93c0FuZERlcHRoV3JpdGUoY29udGFpbmVyLnNjZW5lKVxuICAgIGFuaW1hdGlvbnMgPSBjb250YWluZXIuYW5pbWF0aW9uc1xuICAgIHJldHVybiBjb250YWluZXIuc2NlbmVcbiAgfSlcbn1cblxubGV0IG1peGVyID0gdW5kZWZpbmVkXG5cbmJvb3RzdHJhcE1lc2hTY2VuZSh7XG4gIGxvYWRNZXNoOiBsb2FkTW9kZWwsXG4gIGFkZENvbnRyb2xzOiAoY2FtZXJhLCByZW5kZXJlciwgc2NlbmUsIGd1aSwgbWVzaCkgPT4ge1xuICAgIGNvbnN0IGNvbnRyb2xzID0gbmV3IE9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlci5kb21FbGVtZW50KVxuICAgIGluaXRpYWxpemVHdWlNYXRlcmlhbChndWksIG1lc2guY2hpbGRyZW5bMF0sIG1lc2guY2hpbGRyZW5bMF0ubWF0ZXJpYWwpLmNsb3NlKClcbiAgICBpbml0aWFsaXplR3VpTWVzaFN0YW5kYXJkTWF0ZXJpYWwoZ3VpLCBtZXNoLmNoaWxkcmVuWzBdLCBtZXNoLmNoaWxkcmVuWzBdLm1hdGVyaWFsKS5jbG9zZSgpXG5cbiAgICBtaXhlciA9IG5ldyBUSFJFRS5BbmltYXRpb25NaXhlcihtZXNoKVxuICAgIGNvbnN0IGFjdGlvbiA9IG1peGVyLmNsaXBBY3Rpb24oYW5pbWF0aW9uc1swXSlcblxuICAgIC8vIHRoZSBmaXJzdCBvYmplY3QgaXMgdGhlIG1lc2ggd2Ugd2FudCB0byB3b3JrIHdpdGhcbiAgICBjb25zdCBtb3JwaFRhcmdldHMgPSBtZXNoLmNoaWxkcmVuWzBdLm1vcnBoVGFyZ2V0SW5mbHVlbmNlc1xuXG4gICAgY29uc3QgcHJvcHMgPSB7XG4gICAgICBjdWJlVGFyZ2V0OiAwLFxuICAgICAgY29uZVRhcmdldDogMFxuICAgIH1cblxuICAgIGNvbnN0IGZvbGRlciA9IGd1aS5hZGRGb2xkZXIoJ01vcnBoVGFyZ2V0cycpXG4gICAgZm9sZGVyLmFkZChwcm9wcywgJ2N1YmVUYXJnZXQnLCAwLCAxLCAwLjAxKS5vbkNoYW5nZSgoZXYpID0+IChtb3JwaFRhcmdldHNbMF0gPSBldikpXG4gICAgZm9sZGVyLmFkZChwcm9wcywgJ2NvbmVUYXJnZXQnLCAwLCAxLCAwLjAxKS5vbkNoYW5nZSgoZXYpID0+IChtb3JwaFRhcmdldHNbMV0gPSBldikpXG5cbiAgICBpbml0aWFsaXplQW5pbWF0aW9uQ29udHJvbHMobWl4ZXIsIGFjdGlvbiwgYW5pbWF0aW9uc1swXSwgZ3VpKVxuXG4gICAgcmV0dXJuIGNvbnRyb2xzXG4gIH0sXG4gIG9uUmVuZGVyOiAoY2xvY2spID0+IHtcbiAgICBpZiAobWl4ZXIpIHtcbiAgICAgIG1peGVyLnVwZGF0ZShjbG9jay5nZXREZWx0YSgpKVxuICAgIH1cbiAgfVxufSkudGhlbigpXG4iLCJpbXBvcnQgeyBpbml0U2NlbmUgfSBmcm9tICcuLi8uLi8uLi9ib290c3RyYXAvYm9vdHN0cmFwJ1xuaW1wb3J0IHsgaW50aWFsaXplUmVuZGVyZXJDb250cm9scyB9IGZyb20gJy4uLy4uLy4uL2NvbnRyb2xzL3JlbmRlcmVyLWNvbnRyb2wnXG5cbmltcG9ydCBHVUkgZnJvbSAnbGlsLWd1aSdcbmltcG9ydCB7IGluaXRpYWxpemVTY2VuZUNvbnRyb2xzIH0gZnJvbSAnLi4vLi4vLi4vY29udHJvbHMvc2NlbmUtY29udHJvbHMnXG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcbmltcG9ydCB7IGZsb2F0aW5nRmxvb3IgfSBmcm9tICcuLi8uLi8uLi9ib290c3RyYXAvZmxvb3InXG5cbmV4cG9ydCBjb25zdCBib290c3RyYXBNZXNoU2NlbmUgPSBhc3luYyAoe1xuICBsb2FkTWVzaCxcbiAgcHJvdmlkZUd1aSxcbiAgaGlkZWZsb29yLFxuICBmbG9vclNpemUsXG4gIGJhY2tncm91bmRDb2xvcixcbiAgb25SZW5kZXIsXG4gIGFkZENvbnRyb2xzXG59KSA9PiB7XG4gIGNvbnN0IHByb3BzID0ge1xuICAgIGJhY2tncm91bmRDb2xvcjogYmFja2dyb3VuZENvbG9yID8/IDB4ZmZmZmZmLFxuICAgIGRpc2FibGVEZWZhdWx0Q29udHJvbHM6IHRydWVcbiAgfVxuXG4gIGNvbnN0IG1lc2ggPSBhd2FpdCBsb2FkTWVzaCgpXG5cbiAgY29uc3QgZ3VpID0gbmV3IEdVSSgpXG4gIGNvbnN0IGNsb2NrID0gbmV3IFRIUkVFLkNsb2NrKClcblxuICBjb25zdCBpbml0ID0gYXN5bmMgKCkgPT4ge1xuICAgIGluaXRTY2VuZShwcm9wcykoKHsgc2NlbmUsIGNhbWVyYSwgcmVuZGVyZXIgfSkgPT4ge1xuICAgICAgcmVuZGVyZXIuc2hhZG93TWFwLnR5cGUgPSBUSFJFRS5QQ0ZTb2Z0U2hhZG93TWFwXG4gICAgICBjYW1lcmEucG9zaXRpb24ueCA9IC0zXG4gICAgICBjYW1lcmEucG9zaXRpb24ueiA9IDhcbiAgICAgIGNhbWVyYS5wb3NpdGlvbi55ID0gMlxuXG4gICAgICBoaWRlZmxvb3IgPz8gZmxvYXRpbmdGbG9vcihzY2VuZSwgZmxvb3JTaXplID8/IDgpXG5cbiAgICAgIGlmIChtZXNoKSBzY2VuZS5hZGQobWVzaClcblxuICAgICAgaW50aWFsaXplUmVuZGVyZXJDb250cm9scyhndWksIHJlbmRlcmVyKVxuICAgICAgaW5pdGlhbGl6ZVNjZW5lQ29udHJvbHMoZ3VpLCBzY2VuZSwgZmFsc2UpXG5cbiAgICAgIGlmIChwcm92aWRlR3VpKSBwcm92aWRlR3VpKGd1aSwgbWVzaCwgc2NlbmUpXG4gICAgICBsZXQgY29udHJvbHMgPSB1bmRlZmluZWRcbiAgICAgIGlmIChhZGRDb250cm9scykge1xuICAgICAgICBjb250cm9scyA9IGFkZENvbnRyb2xzKGNhbWVyYSwgcmVuZGVyZXIsIHNjZW5lLCBndWksIG1lc2gpXG4gICAgICB9XG5cbiAgICAgIGFuaW1hdGUoKVxuXG4gICAgICBmdW5jdGlvbiBhbmltYXRlKCkge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSlcbiAgICAgICAgcmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEpXG4gICAgICAgIGlmIChvblJlbmRlcikgb25SZW5kZXIoY2xvY2ssIGNvbnRyb2xzLCBjYW1lcmEsIHNjZW5lKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBpbml0KCkudGhlbigpXG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVBbmltYXRpb25Db250cm9scyA9IChtaXhlciwgYWN0aW9uLCBjbGlwLCBndWkpID0+IHtcbiAgY29uc3QgcHJvcHMgPSB7XG4gICAgcmVwZXRpdGlvbnM6IEluZmluaXR5LFxuICAgIC8vIHdhcnBcbiAgICB3YXJwU3RhcnRUaW1lU2NhbGU6IDEsXG4gICAgd2FycEVuZFRpbWVTY2FsZTogMSxcbiAgICB3YXJwRHVyYXRpb25JblNlY29uZHM6IDIsXG4gICAgd2FycDogZnVuY3Rpb24gKCkge1xuICAgICAgYWN0aW9uLndhcnAocHJvcHMud2FycFN0YXJ0VGltZVNjYWxlLCBwcm9wcy53YXJwRW5kVGltZVNjYWxlLCBwcm9wcy53YXJwRHVyYXRpb25JblNlY29uZHMpXG4gICAgfSxcbiAgICBmYWRlRHVyYXRpb25JblNlY29uZHM6IDIsXG4gICAgZmFkZUluOiBmdW5jdGlvbiAoKSB7XG4gICAgICBhY3Rpb24uZmFkZUluKHByb3BzLmZhZGVEdXJhdGlvbkluU2Vjb25kcylcbiAgICB9LFxuICAgIGZhZGVPdXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGFjdGlvbi5mYWRlT3V0KHByb3BzLmZhZGVEdXJhdGlvbkluU2Vjb25kcylcbiAgICB9XG4gIH1cblxuICBjb25zdCBtaXhlckZvbGRlciA9IGd1aS5hZGRGb2xkZXIoJ0FuaW1hdGlvbk1peGVyJylcbiAgbWl4ZXJGb2xkZXIuYWRkKG1peGVyLCAndGltZScpLmxpc3RlbigpXG4gIG1peGVyRm9sZGVyLmFkZChtaXhlciwgJ3RpbWVTY2FsZScsIDAsIDUpXG4gIG1peGVyRm9sZGVyLmFkZChtaXhlciwgJ3N0b3BBbGxBY3Rpb24nKVxuXG4gIGNvbnN0IGFjdGlvbkZvbGRlciA9IGd1aS5hZGRGb2xkZXIoJ0FuaW1hdGlvbkFjdGlvbicpXG5cbiAgYWN0aW9uRm9sZGVyLmFkZChhY3Rpb24sICdjbGFtcFdoZW5GaW5pc2hlZCcpLmxpc3RlbigpXG4gIGFjdGlvbkZvbGRlci5hZGQoYWN0aW9uLCAnZW5hYmxlZCcpLmxpc3RlbigpXG4gIGFjdGlvbkZvbGRlci5hZGQoYWN0aW9uLCAncGF1c2VkJykubGlzdGVuKClcbiAgYWN0aW9uRm9sZGVyXG4gICAgLmFkZChhY3Rpb24sICdsb29wJywge1xuICAgICAgTG9vcFJlcGVhdDogVEhSRUUuTG9vcFJlcGVhdCxcbiAgICAgIExvb3BPbmNlOiBUSFJFRS5Mb29wT25jZSxcbiAgICAgIExvb3BQaW5nUG9uZzogVEhSRUUuTG9vcFBpbmdQb25nXG4gICAgfSlcbiAgICAub25DaGFuZ2UoKGUpID0+IHtcbiAgICAgIGlmIChlID09IFRIUkVFLkxvb3BPbmNlIHx8IGUgPT0gVEhSRUUuTG9vcFBpbmdQb25nKSB7XG4gICAgICAgIGFjdGlvbi5yZXNldCgpXG4gICAgICAgIGFjdGlvbi5yZXBldGl0aW9ucyA9IHVuZGVmaW5lZFxuICAgICAgICBhY3Rpb24uc2V0TG9vcChwYXJzZUludChlKSwgdW5kZWZpbmVkKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWN0aW9uLnNldExvb3AocGFyc2VJbnQoZSksIGFjdGlvbi5yZXBldGl0aW9ucylcbiAgICAgIH1cbiAgICB9KVxuICBhY3Rpb25Gb2xkZXJcbiAgICAuYWRkKGFjdGlvbiwgJ3JlcGV0aXRpb25zJywgMCwgMTAwLCAxKVxuICAgIC5saXN0ZW4oKVxuICAgIC5vbkNoYW5nZShmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKGFjdGlvbi5sb29wID09IFRIUkVFLkxvb3BPbmNlIHx8IGFjdGlvbi5sb29wID09IFRIUkVFLkxvb3BQaW5nUG9uZykge1xuICAgICAgICBhY3Rpb24ucmVzZXQoKVxuICAgICAgICBhY3Rpb24ucmVwZXRpdGlvbnMgPSB1bmRlZmluZWRcbiAgICAgICAgYWN0aW9uLnNldExvb3AocGFyc2VJbnQoYWN0aW9uLmxvb3ApLCB1bmRlZmluZWQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhY3Rpb24uc2V0TG9vcChwYXJzZUludChlKSwgYWN0aW9uLnJlcGV0aXRpb25zKVxuICAgICAgfVxuICAgIH0pXG4gIGFjdGlvbkZvbGRlci5hZGQoYWN0aW9uLCAndGltZScsIDAsIGNsaXAuZHVyYXRpb24sIDAuMDAxKS5saXN0ZW4oKVxuICBhY3Rpb25Gb2xkZXIuYWRkKGFjdGlvbiwgJ3RpbWVTY2FsZScsIDAsIDUsIDAuMSkubGlzdGVuKClcbiAgYWN0aW9uRm9sZGVyLmFkZChhY3Rpb24sICd3ZWlnaHQnLCAwLCAxLCAwLjAxKS5saXN0ZW4oKVxuICBhY3Rpb25Gb2xkZXIuYWRkKGFjdGlvbiwgJ3plcm9TbG9wZUF0RW5kJykubGlzdGVuKClcbiAgYWN0aW9uRm9sZGVyLmFkZChhY3Rpb24sICd6ZXJvU2xvcGVBdFN0YXJ0JykubGlzdGVuKClcbiAgYWN0aW9uRm9sZGVyLmFkZChhY3Rpb24sICdzdG9wJylcbiAgYWN0aW9uRm9sZGVyLmFkZChhY3Rpb24sICdwbGF5JylcbiAgYWN0aW9uRm9sZGVyLmFkZChhY3Rpb24sICdyZXNldCcpXG4gIGFjdGlvbkZvbGRlci5hZGQocHJvcHMsICd3YXJwU3RhcnRUaW1lU2NhbGUnLCAwLCAxMCwgMC4wMSlcbiAgYWN0aW9uRm9sZGVyLmFkZChwcm9wcywgJ3dhcnBFbmRUaW1lU2NhbGUnLCAwLCAxMCwgMC4wMSlcbiAgYWN0aW9uRm9sZGVyLmFkZChwcm9wcywgJ3dhcnBEdXJhdGlvbkluU2Vjb25kcycsIDAsIDEwLCAwLjAxKVxuICBhY3Rpb25Gb2xkZXIuYWRkKHByb3BzLCAnd2FycCcpXG4gIGFjdGlvbkZvbGRlci5hZGQocHJvcHMsICdmYWRlRHVyYXRpb25JblNlY29uZHMnLCAwLCAxMCwgMC4wMSlcbiAgYWN0aW9uRm9sZGVyLmFkZChwcm9wcywgJ2ZhZGVJbicpXG4gIGFjdGlvbkZvbGRlci5hZGQocHJvcHMsICdmYWRlT3V0JylcblxuICByZXR1cm4ge1xuICAgIGFjdGlvbkZvbGRlcixcbiAgICBtaXhlckZvbGRlclxuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcblxuY29uc3QgdGV4dHVyZUxvYWRlciA9IG5ldyBUSFJFRS5UZXh0dXJlTG9hZGVyKClcblxuY29uc3QgcHJvcGVydGllc09iamVjdCA9IChzY2VuZSkgPT4gKHtcbiAgb3ZlcnJpZGVNYXRlcmlhbDoge1xuICAgIHRvZ2dsZTogKCkgPT4ge1xuICAgICAgaWYgKHNjZW5lLm92ZXJyaWRlTWF0ZXJpYWwgIT09IG51bGwpIHtcbiAgICAgICAgc2NlbmUub3ZlcnJpZGVNYXRlcmlhbCA9IG51bGxcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNjZW5lLm92ZXJyaWRlTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaE5vcm1hbE1hdGVyaWFsKClcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGJhY2tHcm91bmQ6ICdXaGl0ZScsXG4gIGVudmlyb25tZW50OiB7XG4gICAgdG9nZ2xlOiAoKSA9PiB7XG4gICAgICBpZiAoc2NlbmUuZW52aXJvbm1lbnQgIT09IG51bGwpIHtcbiAgICAgICAgc2NlbmUuZW52aXJvbm1lbnQgPSBudWxsXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZXh0dXJlTG9hZGVyLmxvYWQoJy9hc3NldHMvZXF1aS5qcGVnJywgKGxvYWRlZCkgPT4ge1xuICAgICAgICAgIGxvYWRlZC5tYXBwaW5nID0gVEhSRUUuRXF1aXJlY3Rhbmd1bGFyUmVmbGVjdGlvbk1hcHBpbmdcbiAgICAgICAgICBzY2VuZS5lbnZpcm9ubWVudCA9IGxvYWRlZFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxufSlcblxuY29uc3QgZm9nUHJvcGVydGllcyA9IChmb2cpID0+ICh7XG4gIGNvbG9yOiAweGZmZmZmZixcbiAgbmVhcjogZm9nLm5lYXIsXG4gIGZhcjogZm9nLmZhclxufSlcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVTY2VuZUNvbnRyb2xzID0gKGd1aSwgc2NlbmUsIGZvZ0VuYWJsZWQsIGlzT3BlbikgPT4ge1xuICBjb25zdCBwcm9wcyA9IHByb3BlcnRpZXNPYmplY3Qoc2NlbmUpXG4gIGNvbnN0IHNjZW5lQ29udHJvbHMgPSBndWkuYWRkRm9sZGVyKCdTY2VuZScpXG5cbiAgc2NlbmVDb250cm9sc1xuICAgIC5hZGQocHJvcHMsICdiYWNrR3JvdW5kJywgWydXaGl0ZScsICdCbGFjaycsICdOdWxsJywgJ0NvbG9yJywgJ1RleHR1cmUnLCAnQ3ViZW1hcCddKVxuICAgIC5vbkNoYW5nZSgoZXZlbnQpID0+IGhhbmRsZUJhY2tncm91bmRDaGFuZ2UoZXZlbnQsIHNjZW5lKSlcbiAgc2NlbmVDb250cm9scy5hZGQocHJvcHMub3ZlcnJpZGVNYXRlcmlhbCwgJ3RvZ2dsZScpLm5hbWUoJ1RvZ2dsZSBPdmVycmlkZSBNYXRlcmlhbCcpXG4gIHNjZW5lQ29udHJvbHMuYWRkKHByb3BzLmVudmlyb25tZW50LCAndG9nZ2xlJykubmFtZSgnVG9nZ2xlIEVudmlyb25tZW50JylcblxuICBpZiAoZm9nRW5hYmxlZCkge1xuICAgIGNvbnN0IGZvZ0NvbG9yID0gbmV3IFRIUkVFLkNvbG9yKDB4ZmZmZmZmKVxuICAgIGNvbnN0IGZvZyA9IG5ldyBUSFJFRS5Gb2coZm9nQ29sb3IsIDEsIDIwKVxuICAgIHNjZW5lLmZvZyA9IGZvZ1xuICAgIGNvbnN0IGZvZ1Byb3BzID0gZm9nUHJvcGVydGllcyhmb2cpXG4gICAgY29uc3QgZm9nQ29udHJvbHMgPSBzY2VuZUNvbnRyb2xzLmFkZEZvbGRlcignRm9nJylcbiAgICBmb2dDb250cm9scy5hZGRDb2xvcihmb2dQcm9wcywgJ2NvbG9yJylcbiAgICBmb2dDb250cm9scy5hZGQoZm9nUHJvcHMsICduZWFyJywgMCwgMTAsIDAuMSlcbiAgICBmb2dDb250cm9scy5hZGQoZm9nUHJvcHMsICdmYXInLCAwLCAxMDAsIDAuMSlcblxuICAgIGZvZ0NvbnRyb2xzLm9uQ2hhbmdlKCgpID0+IHtcbiAgICAgIGZvZy5jb2xvciA9IGZvZ0NvbG9yLnNldEhleChmb2dQcm9wcy5jb2xvcilcbiAgICAgIGZvZy5uZWFyID0gZm9nUHJvcHMubmVhclxuICAgICAgZm9nLmZhciA9IGZvZ1Byb3BzLmZhclxuICAgIH0pXG4gIH1cblxuICBpc09wZW4gPyBzY2VuZUNvbnRyb2xzLm9wZW4oKSA6IHNjZW5lQ29udHJvbHMuY2xvc2UoKVxufVxuXG5jb25zdCBoYW5kbGVCYWNrZ3JvdW5kQ2hhbmdlID0gKHNldHRpbmcsIHNjZW5lKSA9PiB7XG4gIHN3aXRjaCAoc2V0dGluZykge1xuICAgIGNhc2UgJ1doaXRlJzpcbiAgICAgIHNjZW5lLmJhY2tncm91bmQgPSBuZXcgVEhSRUUuQ29sb3IoMHhmZmZmZmYpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ0JsYWNrJzpcbiAgICAgIHNjZW5lLmJhY2tncm91bmQgPSBuZXcgVEhSRUUuQ29sb3IoMHgwMDAwMDApXG4gICAgICBicmVha1xuICAgIGNhc2UgJ051bGwnOlxuICAgICAgc2NlbmUuYmFja2dyb3VuZCA9IG51bGxcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnQ29sb3InOlxuICAgICAgc2NlbmUuYmFja2dyb3VuZCA9IG5ldyBUSFJFRS5Db2xvcigweDQ0ZmY0NClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnVGV4dHVyZSc6XG4gICAgICB0ZXh0dXJlTG9hZGVyLmxvYWQoJy9hc3NldHMvdGV4dHVyZXMvd29vZC9hYnN0cmFjdC1hbnRpcXVlLWJhY2tkcm9wLTE2NDAwNS5qcGcnLCAobG9hZGVkKSA9PiB7XG4gICAgICAgIGxvYWRlZC5lbmNvZGluZyA9IFRIUkVFLnNSR0JFbmNvZGluZ1xuICAgICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbG9hZGVkXG4gICAgICAgIHNjZW5lLmVudmlyb25tZW50ID0gbnVsbFxuICAgICAgfSlcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnQ3ViZW1hcCc6XG4gICAgICB0ZXh0dXJlTG9hZGVyLmxvYWQoJy9hc3NldHMvZXF1aS5qcGVnJywgKGxvYWRlZCkgPT4ge1xuICAgICAgICBsb2FkZWQubWFwcGluZyA9IFRIUkVFLkVxdWlyZWN0YW5ndWxhclJlZmxlY3Rpb25NYXBwaW5nXG4gICAgICAgIHNjZW5lLmJhY2tncm91bmQgPSBsb2FkZWRcbiAgICAgICAgc2NlbmUuZW52aXJvbm1lbnQgPSBsb2FkZWRcbiAgICAgIH0pXG5cbiAgICAgIGJyZWFrXG4gICAgZGVmYXVsdDpcbiAgICAgIGJyZWFrXG4gIH1cbn1cbiIsImltcG9ydCB7XG5cdEJ1ZmZlckdlb21ldHJ5LFxuXHRGbG9hdDMyQnVmZmVyQXR0cmlidXRlLFxuXHRMaW5lU2VnbWVudHMsXG5cdExpbmVCYXNpY01hdGVyaWFsLFxuXHRNYXRyaXgzLFxuXHRWZWN0b3IzXG59IGZyb20gJ3RocmVlJztcblxuY29uc3QgX3YxID0gbmV3IFZlY3RvcjMoKTtcbmNvbnN0IF92MiA9IG5ldyBWZWN0b3IzKCk7XG5jb25zdCBfbm9ybWFsTWF0cml4ID0gbmV3IE1hdHJpeDMoKTtcblxuY2xhc3MgVmVydGV4Tm9ybWFsc0hlbHBlciBleHRlbmRzIExpbmVTZWdtZW50cyB7XG5cblx0Y29uc3RydWN0b3IoIG9iamVjdCwgc2l6ZSA9IDEsIGNvbG9yID0gMHhmZjAwMDAgKSB7XG5cblx0XHRjb25zdCBnZW9tZXRyeSA9IG5ldyBCdWZmZXJHZW9tZXRyeSgpO1xuXG5cdFx0Y29uc3Qgbk5vcm1hbHMgPSBvYmplY3QuZ2VvbWV0cnkuYXR0cmlidXRlcy5ub3JtYWwuY291bnQ7XG5cdFx0Y29uc3QgcG9zaXRpb25zID0gbmV3IEZsb2F0MzJCdWZmZXJBdHRyaWJ1dGUoIG5Ob3JtYWxzICogMiAqIDMsIDMgKTtcblxuXHRcdGdlb21ldHJ5LnNldEF0dHJpYnV0ZSggJ3Bvc2l0aW9uJywgcG9zaXRpb25zICk7XG5cblx0XHRzdXBlciggZ2VvbWV0cnksIG5ldyBMaW5lQmFzaWNNYXRlcmlhbCggeyBjb2xvciwgdG9uZU1hcHBlZDogZmFsc2UgfSApICk7XG5cblx0XHR0aGlzLm9iamVjdCA9IG9iamVjdDtcblx0XHR0aGlzLnNpemUgPSBzaXplO1xuXHRcdHRoaXMudHlwZSA9ICdWZXJ0ZXhOb3JtYWxzSGVscGVyJztcblxuXHRcdC8vXG5cblx0XHR0aGlzLm1hdHJpeEF1dG9VcGRhdGUgPSBmYWxzZTtcblxuXHRcdHRoaXMudXBkYXRlKCk7XG5cblx0fVxuXG5cdHVwZGF0ZSgpIHtcblxuXHRcdHRoaXMub2JqZWN0LnVwZGF0ZU1hdHJpeFdvcmxkKCB0cnVlICk7XG5cblx0XHRfbm9ybWFsTWF0cml4LmdldE5vcm1hbE1hdHJpeCggdGhpcy5vYmplY3QubWF0cml4V29ybGQgKTtcblxuXHRcdGNvbnN0IG1hdHJpeFdvcmxkID0gdGhpcy5vYmplY3QubWF0cml4V29ybGQ7XG5cblx0XHRjb25zdCBwb3NpdGlvbiA9IHRoaXMuZ2VvbWV0cnkuYXR0cmlidXRlcy5wb3NpdGlvbjtcblxuXHRcdC8vXG5cblx0XHRjb25zdCBvYmpHZW9tZXRyeSA9IHRoaXMub2JqZWN0Lmdlb21ldHJ5O1xuXG5cdFx0aWYgKCBvYmpHZW9tZXRyeSApIHtcblxuXHRcdFx0Y29uc3Qgb2JqUG9zID0gb2JqR2VvbWV0cnkuYXR0cmlidXRlcy5wb3NpdGlvbjtcblxuXHRcdFx0Y29uc3Qgb2JqTm9ybSA9IG9iakdlb21ldHJ5LmF0dHJpYnV0ZXMubm9ybWFsO1xuXG5cdFx0XHRsZXQgaWR4ID0gMDtcblxuXHRcdFx0Ly8gZm9yIHNpbXBsaWNpdHksIGlnbm9yZSBpbmRleCBhbmQgZHJhd2NhbGxzLCBhbmQgcmVuZGVyIGV2ZXJ5IG5vcm1hbFxuXG5cdFx0XHRmb3IgKCBsZXQgaiA9IDAsIGpsID0gb2JqUG9zLmNvdW50OyBqIDwgamw7IGogKysgKSB7XG5cblx0XHRcdFx0X3YxLmZyb21CdWZmZXJBdHRyaWJ1dGUoIG9ialBvcywgaiApLmFwcGx5TWF0cml4NCggbWF0cml4V29ybGQgKTtcblxuXHRcdFx0XHRfdjIuZnJvbUJ1ZmZlckF0dHJpYnV0ZSggb2JqTm9ybSwgaiApO1xuXG5cdFx0XHRcdF92Mi5hcHBseU1hdHJpeDMoIF9ub3JtYWxNYXRyaXggKS5ub3JtYWxpemUoKS5tdWx0aXBseVNjYWxhciggdGhpcy5zaXplICkuYWRkKCBfdjEgKTtcblxuXHRcdFx0XHRwb3NpdGlvbi5zZXRYWVooIGlkeCwgX3YxLngsIF92MS55LCBfdjEueiApO1xuXG5cdFx0XHRcdGlkeCA9IGlkeCArIDE7XG5cblx0XHRcdFx0cG9zaXRpb24uc2V0WFlaKCBpZHgsIF92Mi54LCBfdjIueSwgX3YyLnogKTtcblxuXHRcdFx0XHRpZHggPSBpZHggKyAxO1xuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRwb3NpdGlvbi5uZWVkc1VwZGF0ZSA9IHRydWU7XG5cblx0fVxuXG59XG5cblxuZXhwb3J0IHsgVmVydGV4Tm9ybWFsc0hlbHBlciB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtdWx0aXBsZS1tb3JwaC10YXJnZXRzXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2x0anNfZm91cnRoXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2x0anNfZm91cnRoXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9idWlsZF90aHJlZV9tb2R1bGVfanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9jb250cm9sc19PcmJpdENvbnRyb2xzX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc19saWwtZ3VpX2Rpc3RfbGlsLWd1aV9lc21fanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9sb2FkZXJzX0dMVEZMb2FkZXJfanNcIixcInNhbXBsZXNfYm9vdHN0cmFwX2Jvb3RzdHJhcF9qcy1zYW1wbGVzX2NvbnRyb2xzX21hdGVyaWFsLWNvbnRyb2xzX2pzLXNhbXBsZXNfY29udHJvbHNfcmVuZGVyZS1jODdkOGFcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItOS9tdWx0aXBsZS1tb3JwaC10YXJnZXRzLmpzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
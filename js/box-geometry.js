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

/***/ "./samples/chapters/chapter-5/box-geometry.js"
/*!****************************************************!*\
  !*** ./samples/chapters/chapter-5/box-geometry.js ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _util_standard_scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/standard-scene */ "./samples/chapters/chapter-5/util/standard-scene.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ "./samples/chapters/chapter-5/util/index.js");




const props = {
  width: 3,
  height: 1,
  depth: 2,
  widthSegments: 10,
  heightSegments: 10,
  depthSegments: 10
}

const updateGeometry = ({ width, height, depth, widthSegments, heightSegments, depthSegments }) => {
  return new three__WEBPACK_IMPORTED_MODULE_0__.BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments)
}

const geometry = updateGeometry(props)

;(0,_util_standard_scene__WEBPACK_IMPORTED_MODULE_1__.bootstrapGeometryScene)({
  geometry,
  provideGui: (gui, mesh) => {
    const folder = gui.addFolder('THREE.RingGeometry')
    folder.add(props, 'width', 0, 10, 0.01).onChange(() => (0,_util__WEBPACK_IMPORTED_MODULE_2__.updateMesh)(mesh, updateGeometry(props)))
    folder.add(props, 'height', 0, 10, 0.01).onChange(() => (0,_util__WEBPACK_IMPORTED_MODULE_2__.updateMesh)(mesh, updateGeometry(props)))
    folder.add(props, 'depth', 0, 10, 0.01).onChange(() => (0,_util__WEBPACK_IMPORTED_MODULE_2__.updateMesh)(mesh, updateGeometry(props)))
    folder.add(props, 'widthSegments', 1, 20, 1).onChange(() => (0,_util__WEBPACK_IMPORTED_MODULE_2__.updateMesh)(mesh, updateGeometry(props)))
    folder.add(props, 'heightSegments', 1, 20, 1).onChange(() => (0,_util__WEBPACK_IMPORTED_MODULE_2__.updateMesh)(mesh, updateGeometry(props)))
    folder.add(props, 'depthSegments', 1, 20, 1).onChange(() => (0,_util__WEBPACK_IMPORTED_MODULE_2__.updateMesh)(mesh, updateGeometry(props)))
  }
}).then()


/***/ },

/***/ "./samples/chapters/chapter-5/util/index.js"
/*!**************************************************!*\
  !*** ./samples/chapters/chapter-5/util/index.js ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updateMesh: () => (/* binding */ updateMesh)
/* harmony export */ });
const updateMesh = (mesh, geometry) => {
  mesh.geometry.dispose()
  mesh.geometry = geometry
}


/***/ },

/***/ "./samples/chapters/chapter-5/util/standard-scene.js"
/*!***********************************************************!*\
  !*** ./samples/chapters/chapter-5/util/standard-scene.js ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bootstrapGeometryScene: () => (/* binding */ bootstrapGeometryScene)
/* harmony export */ });
/* harmony import */ var _bootstrap_bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../bootstrap/bootstrap */ "./samples/bootstrap/bootstrap.js");
/* harmony import */ var _controls_renderer_control__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../controls/renderer-control */ "./samples/controls/renderer-control.js");
/* harmony import */ var lil_gui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lil-gui */ "./node_modules/lil-gui/dist/lil-gui.esm.js");
/* harmony import */ var _controls_material_controls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../controls/material-controls */ "./samples/controls/material-controls.js");
/* harmony import */ var _controls_scene_controls__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../controls/scene-controls */ "./samples/controls/scene-controls.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _bootstrap_floor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../bootstrap/floor */ "./samples/bootstrap/floor.js");
/* harmony import */ var _controls_mesh_visible_controls__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../controls/mesh-visible-controls */ "./samples/controls/mesh-visible-controls.js");










const bootstrapGeometryScene = async ({ geometry, provideGui, hidefloor }) => {
  const props = {
    backgroundColor: 0xffffff,
    fogColor: 0xffffff
  }

  const gui = new lil_gui__WEBPACK_IMPORTED_MODULE_2__["default"]()

  const init = async () => {
    const material = new three__WEBPACK_IMPORTED_MODULE_5__.MeshStandardMaterial({
      color: 0xffaa88
    })
    const mesh = new three__WEBPACK_IMPORTED_MODULE_5__.Mesh(geometry, material)
    mesh.castShadow = true
    ;(0,_bootstrap_bootstrap__WEBPACK_IMPORTED_MODULE_0__.initScene)(props)(({ scene, camera, renderer, orbitControls }) => {
      renderer.shadowMap.type = three__WEBPACK_IMPORTED_MODULE_5__.PCFSoftShadowMap
      camera.position.x = -3
      camera.position.z = 8
      camera.position.y = 2
      orbitControls.update()

      function animate() {
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
        orbitControls.update()
      }

      animate()

      const plane = hidefloor ?? (0,_bootstrap_floor__WEBPACK_IMPORTED_MODULE_6__.foreverPlane)(scene)
      scene.add(mesh)
      ;(0,_controls_renderer_control__WEBPACK_IMPORTED_MODULE_1__.intializeRendererControls)(gui, renderer)
      ;(0,_controls_scene_controls__WEBPACK_IMPORTED_MODULE_4__.initializeSceneControls)(gui, scene, false)

      ;(0,_controls_material_controls__WEBPACK_IMPORTED_MODULE_3__.initializeGuiMaterial)(gui, mesh, material).close()
      ;(0,_controls_material_controls__WEBPACK_IMPORTED_MODULE_3__.initializeGuiMeshStandardMaterial)(gui, mesh, material).close()
      hidefloor ?? (0,_controls_mesh_visible_controls__WEBPACK_IMPORTED_MODULE_7__.initializeMeshVisibleControls)(gui, plane, 'Floor')
      provideGui(gui, mesh)
    })
  }

  init().then()
}


/***/ },

/***/ "./samples/controls/mesh-visible-controls.js"
/*!***************************************************!*\
  !*** ./samples/controls/mesh-visible-controls.js ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initializeMeshVisibleControls: () => (/* binding */ initializeMeshVisibleControls)
/* harmony export */ });
const initializeMeshVisibleControls = (gui, mesh, title) => {
  const folder = gui.addFolder(title)
  folder.add(mesh, 'visible')
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
/******/ 			"box-geometry": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","samples_bootstrap_bootstrap_js-samples_controls_material-controls_js-samples_controls_rendere-c87d8a"], () => (__webpack_require__("./samples/chapters/chapter-5/box-geometry.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvYm94LWdlb21ldHJ5LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBOEI7O0FBRXZCO0FBQ1Asa0JBQWtCLHNEQUF5QjtBQUMzQyxrQkFBa0Isc0RBQXlCO0FBQzNDO0FBQ0EsR0FBRztBQUNILG1CQUFtQix1Q0FBVTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRU87QUFDUDtBQUNBLGtCQUFrQixvREFBdUI7QUFDekMsa0JBQWtCLHVEQUEwQjtBQUM1QztBQUNBLEdBQUc7QUFDSCxtQkFBbUIsdUNBQVU7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDOUI4QjtBQUNnQztBQUMzQjs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwwQkFBMEIsb0VBQW9FO0FBQzlGLGFBQWEsOENBQWlCO0FBQzlCOztBQUVBOztBQUVBLDZFQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQSwyREFBMkQsaURBQVU7QUFDckUsNERBQTRELGlEQUFVO0FBQ3RFLDJEQUEyRCxpREFBVTtBQUNyRSxnRUFBZ0UsaURBQVU7QUFDMUUsaUVBQWlFLGlEQUFVO0FBQzNFLGdFQUFnRSxpREFBVTtBQUMxRTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzlCTTtBQUNQO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNId0Q7QUFDc0I7O0FBRXJEO0FBQ3FGO0FBQ3BDO0FBQzVDO0FBQ3lCO0FBQ2dDOztBQUVoRix3Q0FBd0MsaUNBQWlDO0FBQ2hGO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQiwrQ0FBRzs7QUFFckI7QUFDQSx5QkFBeUIsdURBQTBCO0FBQ25EO0FBQ0EsS0FBSztBQUNMLHFCQUFxQix1Q0FBVTtBQUMvQjtBQUNBLElBQUksZ0VBQVMsV0FBVyx3Q0FBd0M7QUFDaEUsZ0NBQWdDLG1EQUFzQjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGlDQUFpQyw4REFBWTtBQUM3QztBQUNBLE1BQU0sc0ZBQXlCO0FBQy9CLE1BQU0sa0ZBQXVCOztBQUU3QixNQUFNLG1GQUFxQjtBQUMzQixNQUFNLCtGQUFpQztBQUN2QyxtQkFBbUIsOEZBQTZCO0FBQ2hEO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3BETztBQUNQO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ0g4Qjs7QUFFOUIsMEJBQTBCLGdEQUFtQjs7QUFFN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUixxQ0FBcUMscURBQXdCO0FBQzdEO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBLDJCQUEyQixtRUFBc0M7QUFDakU7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRU07QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5QkFBeUIsd0NBQVc7QUFDcEMsb0JBQW9CLHNDQUFTO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qix3Q0FBVztBQUN4QztBQUNBO0FBQ0EsNkJBQTZCLHdDQUFXO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsd0NBQVc7QUFDeEM7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLCtDQUFrQjtBQUM1QztBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixtRUFBc0M7QUFDL0Q7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzFGZTs7QUFFZixnQkFBZ0IsMENBQU87QUFDdkIsZ0JBQWdCLDBDQUFPO0FBQ3ZCLDBCQUEwQiwwQ0FBTzs7QUFFakMsa0NBQWtDLCtDQUFZOztBQUU5Qzs7QUFFQSx1QkFBdUIsaURBQWM7O0FBRXJDO0FBQ0Esd0JBQXdCLHlEQUFzQjs7QUFFOUM7O0FBRUEsdUJBQXVCLG9EQUFpQixJQUFJLDJCQUEyQjs7QUFFdkU7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHVDQUF1QyxRQUFROztBQUUvQzs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7O0FBRytCOzs7Ozs7O1VDekYvQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOztVQUVBO1VBQ0E7Ozs7O1dDL0JBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsK0JBQStCLHdDQUF3QztXQUN2RTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlCQUFpQixxQkFBcUI7V0FDdEM7V0FDQTtXQUNBLGtCQUFrQixxQkFBcUI7V0FDdkM7V0FDQTtXQUNBLEtBQUs7V0FDTDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRTs7Ozs7V0MzQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQSw0Rzs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9ib290c3RyYXAvZmxvb3IuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItNS9ib3gtZ2VvbWV0cnkuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItNS91dGlsL2luZGV4LmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTUvdXRpbC9zdGFuZGFyZC1zY2VuZS5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY29udHJvbHMvbWVzaC12aXNpYmxlLWNvbnRyb2xzLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jb250cm9scy9zY2VuZS1jb250cm9scy5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL25vZGVfbW9kdWxlcy90aHJlZS9leGFtcGxlcy9qc20vaGVscGVycy9WZXJ0ZXhOb3JtYWxzSGVscGVyLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5cbmV4cG9ydCBjb25zdCBmb3JldmVyUGxhbmUgPSAoc2NlbmUpID0+IHtcbiAgY29uc3QgZ2VvID0gbmV3IFRIUkVFLlBsYW5lQnVmZmVyR2VvbWV0cnkoMTAwMDAsIDEwMDAwKVxuICBjb25zdCBtYXQgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7XG4gICAgY29sb3I6IDB4ZmZmZmZmXG4gIH0pXG4gIGNvbnN0IG1lc2ggPSBuZXcgVEhSRUUuTWVzaChnZW8sIG1hdClcbiAgbWVzaC5wb3NpdGlvbi5zZXQoMCwgLTIsIDApXG4gIG1lc2gucm90YXRpb24uc2V0KE1hdGguUEkgLyAtMiwgMCwgMClcbiAgbWVzaC5yZWNlaXZlU2hhZG93ID0gdHJ1ZVxuICBtZXNoLm5hbWUgPSAnZm9yZXZlci1mbG9vcidcbiAgc2NlbmUuYWRkKG1lc2gpXG5cbiAgcmV0dXJuIG1lc2hcbn1cblxuZXhwb3J0IGNvbnN0IGZsb2F0aW5nRmxvb3IgPSAoc2NlbmUsIHNpemUpID0+IHtcbiAgY29uc3QgcyA9IHNpemUgPyBzaXplIDogNlxuICBjb25zdCBnZW8gPSBuZXcgVEhSRUUuQm94QnVmZmVyR2VvbWV0cnkocywgMC4yNSwgcywgMTAsIDEwLCAxMClcbiAgY29uc3QgbWF0ID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcbiAgICBjb2xvcjogMHhkZGRkZGRcbiAgfSlcbiAgY29uc3QgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlbywgbWF0KVxuICBtZXNoLnBvc2l0aW9uLnNldCgwLCAtMiwgLTEpXG4gIG1lc2gucmVjZWl2ZVNoYWRvdyA9IHRydWVcbiAgbWVzaC5uYW1lID0gJ2Zsb2F0aW5nLWZsb29yJ1xuICBzY2VuZS5hZGQobWVzaClcblxuICByZXR1cm4gbWVzaFxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5pbXBvcnQgeyBib290c3RyYXBHZW9tZXRyeVNjZW5lIH0gZnJvbSAnLi91dGlsL3N0YW5kYXJkLXNjZW5lJ1xuaW1wb3J0IHsgdXBkYXRlTWVzaCB9IGZyb20gJy4vdXRpbCdcblxuY29uc3QgcHJvcHMgPSB7XG4gIHdpZHRoOiAzLFxuICBoZWlnaHQ6IDEsXG4gIGRlcHRoOiAyLFxuICB3aWR0aFNlZ21lbnRzOiAxMCxcbiAgaGVpZ2h0U2VnbWVudHM6IDEwLFxuICBkZXB0aFNlZ21lbnRzOiAxMFxufVxuXG5jb25zdCB1cGRhdGVHZW9tZXRyeSA9ICh7IHdpZHRoLCBoZWlnaHQsIGRlcHRoLCB3aWR0aFNlZ21lbnRzLCBoZWlnaHRTZWdtZW50cywgZGVwdGhTZWdtZW50cyB9KSA9PiB7XG4gIHJldHVybiBuZXcgVEhSRUUuQm94R2VvbWV0cnkod2lkdGgsIGhlaWdodCwgZGVwdGgsIHdpZHRoU2VnbWVudHMsIGhlaWdodFNlZ21lbnRzLCBkZXB0aFNlZ21lbnRzKVxufVxuXG5jb25zdCBnZW9tZXRyeSA9IHVwZGF0ZUdlb21ldHJ5KHByb3BzKVxuXG5ib290c3RyYXBHZW9tZXRyeVNjZW5lKHtcbiAgZ2VvbWV0cnksXG4gIHByb3ZpZGVHdWk6IChndWksIG1lc2gpID0+IHtcbiAgICBjb25zdCBmb2xkZXIgPSBndWkuYWRkRm9sZGVyKCdUSFJFRS5SaW5nR2VvbWV0cnknKVxuICAgIGZvbGRlci5hZGQocHJvcHMsICd3aWR0aCcsIDAsIDEwLCAwLjAxKS5vbkNoYW5nZSgoKSA9PiB1cGRhdGVNZXNoKG1lc2gsIHVwZGF0ZUdlb21ldHJ5KHByb3BzKSkpXG4gICAgZm9sZGVyLmFkZChwcm9wcywgJ2hlaWdodCcsIDAsIDEwLCAwLjAxKS5vbkNoYW5nZSgoKSA9PiB1cGRhdGVNZXNoKG1lc2gsIHVwZGF0ZUdlb21ldHJ5KHByb3BzKSkpXG4gICAgZm9sZGVyLmFkZChwcm9wcywgJ2RlcHRoJywgMCwgMTAsIDAuMDEpLm9uQ2hhbmdlKCgpID0+IHVwZGF0ZU1lc2gobWVzaCwgdXBkYXRlR2VvbWV0cnkocHJvcHMpKSlcbiAgICBmb2xkZXIuYWRkKHByb3BzLCAnd2lkdGhTZWdtZW50cycsIDEsIDIwLCAxKS5vbkNoYW5nZSgoKSA9PiB1cGRhdGVNZXNoKG1lc2gsIHVwZGF0ZUdlb21ldHJ5KHByb3BzKSkpXG4gICAgZm9sZGVyLmFkZChwcm9wcywgJ2hlaWdodFNlZ21lbnRzJywgMSwgMjAsIDEpLm9uQ2hhbmdlKCgpID0+IHVwZGF0ZU1lc2gobWVzaCwgdXBkYXRlR2VvbWV0cnkocHJvcHMpKSlcbiAgICBmb2xkZXIuYWRkKHByb3BzLCAnZGVwdGhTZWdtZW50cycsIDEsIDIwLCAxKS5vbkNoYW5nZSgoKSA9PiB1cGRhdGVNZXNoKG1lc2gsIHVwZGF0ZUdlb21ldHJ5KHByb3BzKSkpXG4gIH1cbn0pLnRoZW4oKVxuIiwiZXhwb3J0IGNvbnN0IHVwZGF0ZU1lc2ggPSAobWVzaCwgZ2VvbWV0cnkpID0+IHtcbiAgbWVzaC5nZW9tZXRyeS5kaXNwb3NlKClcbiAgbWVzaC5nZW9tZXRyeSA9IGdlb21ldHJ5XG59XG4iLCJpbXBvcnQgeyBpbml0U2NlbmUgfSBmcm9tICcuLi8uLi8uLi9ib290c3RyYXAvYm9vdHN0cmFwJ1xuaW1wb3J0IHsgaW50aWFsaXplUmVuZGVyZXJDb250cm9scyB9IGZyb20gJy4uLy4uLy4uL2NvbnRyb2xzL3JlbmRlcmVyLWNvbnRyb2wnXG5cbmltcG9ydCBHVUkgZnJvbSAnbGlsLWd1aSdcbmltcG9ydCB7IGluaXRpYWxpemVHdWlNYXRlcmlhbCwgaW5pdGlhbGl6ZUd1aU1lc2hTdGFuZGFyZE1hdGVyaWFsIH0gZnJvbSAnLi4vLi4vLi4vY29udHJvbHMvbWF0ZXJpYWwtY29udHJvbHMnXG5pbXBvcnQgeyBpbml0aWFsaXplU2NlbmVDb250cm9scyB9IGZyb20gJy4uLy4uLy4uL2NvbnRyb2xzL3NjZW5lLWNvbnRyb2xzJ1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5pbXBvcnQgeyBmb3JldmVyUGxhbmUgfSBmcm9tICcuLi8uLi8uLi9ib290c3RyYXAvZmxvb3InXG5pbXBvcnQgeyBpbml0aWFsaXplTWVzaFZpc2libGVDb250cm9scyB9IGZyb20gJy4uLy4uLy4uL2NvbnRyb2xzL21lc2gtdmlzaWJsZS1jb250cm9scydcblxuZXhwb3J0IGNvbnN0IGJvb3RzdHJhcEdlb21ldHJ5U2NlbmUgPSBhc3luYyAoeyBnZW9tZXRyeSwgcHJvdmlkZUd1aSwgaGlkZWZsb29yIH0pID0+IHtcbiAgY29uc3QgcHJvcHMgPSB7XG4gICAgYmFja2dyb3VuZENvbG9yOiAweGZmZmZmZixcbiAgICBmb2dDb2xvcjogMHhmZmZmZmZcbiAgfVxuXG4gIGNvbnN0IGd1aSA9IG5ldyBHVUkoKVxuXG4gIGNvbnN0IGluaXQgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoe1xuICAgICAgY29sb3I6IDB4ZmZhYTg4XG4gICAgfSlcbiAgICBjb25zdCBtZXNoID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKVxuICAgIG1lc2guY2FzdFNoYWRvdyA9IHRydWVcbiAgICBpbml0U2NlbmUocHJvcHMpKCh7IHNjZW5lLCBjYW1lcmEsIHJlbmRlcmVyLCBvcmJpdENvbnRyb2xzIH0pID0+IHtcbiAgICAgIHJlbmRlcmVyLnNoYWRvd01hcC50eXBlID0gVEhSRUUuUENGU29mdFNoYWRvd01hcFxuICAgICAgY2FtZXJhLnBvc2l0aW9uLnggPSAtM1xuICAgICAgY2FtZXJhLnBvc2l0aW9uLnogPSA4XG4gICAgICBjYW1lcmEucG9zaXRpb24ueSA9IDJcbiAgICAgIG9yYml0Q29udHJvbHMudXBkYXRlKClcblxuICAgICAgZnVuY3Rpb24gYW5pbWF0ZSgpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpXG4gICAgICAgIHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhKVxuICAgICAgICBvcmJpdENvbnRyb2xzLnVwZGF0ZSgpXG4gICAgICB9XG5cbiAgICAgIGFuaW1hdGUoKVxuXG4gICAgICBjb25zdCBwbGFuZSA9IGhpZGVmbG9vciA/PyBmb3JldmVyUGxhbmUoc2NlbmUpXG4gICAgICBzY2VuZS5hZGQobWVzaClcbiAgICAgIGludGlhbGl6ZVJlbmRlcmVyQ29udHJvbHMoZ3VpLCByZW5kZXJlcilcbiAgICAgIGluaXRpYWxpemVTY2VuZUNvbnRyb2xzKGd1aSwgc2NlbmUsIGZhbHNlKVxuXG4gICAgICBpbml0aWFsaXplR3VpTWF0ZXJpYWwoZ3VpLCBtZXNoLCBtYXRlcmlhbCkuY2xvc2UoKVxuICAgICAgaW5pdGlhbGl6ZUd1aU1lc2hTdGFuZGFyZE1hdGVyaWFsKGd1aSwgbWVzaCwgbWF0ZXJpYWwpLmNsb3NlKClcbiAgICAgIGhpZGVmbG9vciA/PyBpbml0aWFsaXplTWVzaFZpc2libGVDb250cm9scyhndWksIHBsYW5lLCAnRmxvb3InKVxuICAgICAgcHJvdmlkZUd1aShndWksIG1lc2gpXG4gICAgfSlcbiAgfVxuXG4gIGluaXQoKS50aGVuKClcbn1cbiIsImV4cG9ydCBjb25zdCBpbml0aWFsaXplTWVzaFZpc2libGVDb250cm9scyA9IChndWksIG1lc2gsIHRpdGxlKSA9PiB7XG4gIGNvbnN0IGZvbGRlciA9IGd1aS5hZGRGb2xkZXIodGl0bGUpXG4gIGZvbGRlci5hZGQobWVzaCwgJ3Zpc2libGUnKVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5cbmNvbnN0IHRleHR1cmVMb2FkZXIgPSBuZXcgVEhSRUUuVGV4dHVyZUxvYWRlcigpXG5cbmNvbnN0IHByb3BlcnRpZXNPYmplY3QgPSAoc2NlbmUpID0+ICh7XG4gIG92ZXJyaWRlTWF0ZXJpYWw6IHtcbiAgICB0b2dnbGU6ICgpID0+IHtcbiAgICAgIGlmIChzY2VuZS5vdmVycmlkZU1hdGVyaWFsICE9PSBudWxsKSB7XG4gICAgICAgIHNjZW5lLm92ZXJyaWRlTWF0ZXJpYWwgPSBudWxsXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY2VuZS5vdmVycmlkZU1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hOb3JtYWxNYXRlcmlhbCgpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBiYWNrR3JvdW5kOiAnV2hpdGUnLFxuICBlbnZpcm9ubWVudDoge1xuICAgIHRvZ2dsZTogKCkgPT4ge1xuICAgICAgaWYgKHNjZW5lLmVudmlyb25tZW50ICE9PSBudWxsKSB7XG4gICAgICAgIHNjZW5lLmVudmlyb25tZW50ID0gbnVsbFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGV4dHVyZUxvYWRlci5sb2FkKCcvYXNzZXRzL2VxdWkuanBlZycsIChsb2FkZWQpID0+IHtcbiAgICAgICAgICBsb2FkZWQubWFwcGluZyA9IFRIUkVFLkVxdWlyZWN0YW5ndWxhclJlZmxlY3Rpb25NYXBwaW5nXG4gICAgICAgICAgc2NlbmUuZW52aXJvbm1lbnQgPSBsb2FkZWRcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pXG5cbmNvbnN0IGZvZ1Byb3BlcnRpZXMgPSAoZm9nKSA9PiAoe1xuICBjb2xvcjogMHhmZmZmZmYsXG4gIG5lYXI6IGZvZy5uZWFyLFxuICBmYXI6IGZvZy5mYXJcbn0pXG5cbmV4cG9ydCBjb25zdCBpbml0aWFsaXplU2NlbmVDb250cm9scyA9IChndWksIHNjZW5lLCBmb2dFbmFibGVkLCBpc09wZW4pID0+IHtcbiAgY29uc3QgcHJvcHMgPSBwcm9wZXJ0aWVzT2JqZWN0KHNjZW5lKVxuICBjb25zdCBzY2VuZUNvbnRyb2xzID0gZ3VpLmFkZEZvbGRlcignU2NlbmUnKVxuXG4gIHNjZW5lQ29udHJvbHNcbiAgICAuYWRkKHByb3BzLCAnYmFja0dyb3VuZCcsIFsnV2hpdGUnLCAnQmxhY2snLCAnTnVsbCcsICdDb2xvcicsICdUZXh0dXJlJywgJ0N1YmVtYXAnXSlcbiAgICAub25DaGFuZ2UoKGV2ZW50KSA9PiBoYW5kbGVCYWNrZ3JvdW5kQ2hhbmdlKGV2ZW50LCBzY2VuZSkpXG4gIHNjZW5lQ29udHJvbHMuYWRkKHByb3BzLm92ZXJyaWRlTWF0ZXJpYWwsICd0b2dnbGUnKS5uYW1lKCdUb2dnbGUgT3ZlcnJpZGUgTWF0ZXJpYWwnKVxuICBzY2VuZUNvbnRyb2xzLmFkZChwcm9wcy5lbnZpcm9ubWVudCwgJ3RvZ2dsZScpLm5hbWUoJ1RvZ2dsZSBFbnZpcm9ubWVudCcpXG5cbiAgaWYgKGZvZ0VuYWJsZWQpIHtcbiAgICBjb25zdCBmb2dDb2xvciA9IG5ldyBUSFJFRS5Db2xvcigweGZmZmZmZilcbiAgICBjb25zdCBmb2cgPSBuZXcgVEhSRUUuRm9nKGZvZ0NvbG9yLCAxLCAyMClcbiAgICBzY2VuZS5mb2cgPSBmb2dcbiAgICBjb25zdCBmb2dQcm9wcyA9IGZvZ1Byb3BlcnRpZXMoZm9nKVxuICAgIGNvbnN0IGZvZ0NvbnRyb2xzID0gc2NlbmVDb250cm9scy5hZGRGb2xkZXIoJ0ZvZycpXG4gICAgZm9nQ29udHJvbHMuYWRkQ29sb3IoZm9nUHJvcHMsICdjb2xvcicpXG4gICAgZm9nQ29udHJvbHMuYWRkKGZvZ1Byb3BzLCAnbmVhcicsIDAsIDEwLCAwLjEpXG4gICAgZm9nQ29udHJvbHMuYWRkKGZvZ1Byb3BzLCAnZmFyJywgMCwgMTAwLCAwLjEpXG5cbiAgICBmb2dDb250cm9scy5vbkNoYW5nZSgoKSA9PiB7XG4gICAgICBmb2cuY29sb3IgPSBmb2dDb2xvci5zZXRIZXgoZm9nUHJvcHMuY29sb3IpXG4gICAgICBmb2cubmVhciA9IGZvZ1Byb3BzLm5lYXJcbiAgICAgIGZvZy5mYXIgPSBmb2dQcm9wcy5mYXJcbiAgICB9KVxuICB9XG5cbiAgaXNPcGVuID8gc2NlbmVDb250cm9scy5vcGVuKCkgOiBzY2VuZUNvbnRyb2xzLmNsb3NlKClcbn1cblxuY29uc3QgaGFuZGxlQmFja2dyb3VuZENoYW5nZSA9IChzZXR0aW5nLCBzY2VuZSkgPT4ge1xuICBzd2l0Y2ggKHNldHRpbmcpIHtcbiAgICBjYXNlICdXaGl0ZSc6XG4gICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbmV3IFRIUkVFLkNvbG9yKDB4ZmZmZmZmKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdCbGFjayc6XG4gICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbmV3IFRIUkVFLkNvbG9yKDB4MDAwMDAwKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdOdWxsJzpcbiAgICAgIHNjZW5lLmJhY2tncm91bmQgPSBudWxsXG4gICAgICBicmVha1xuICAgIGNhc2UgJ0NvbG9yJzpcbiAgICAgIHNjZW5lLmJhY2tncm91bmQgPSBuZXcgVEhSRUUuQ29sb3IoMHg0NGZmNDQpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ1RleHR1cmUnOlxuICAgICAgdGV4dHVyZUxvYWRlci5sb2FkKCcvYXNzZXRzL3RleHR1cmVzL3dvb2QvYWJzdHJhY3QtYW50aXF1ZS1iYWNrZHJvcC0xNjQwMDUuanBnJywgKGxvYWRlZCkgPT4ge1xuICAgICAgICBsb2FkZWQuZW5jb2RpbmcgPSBUSFJFRS5zUkdCRW5jb2RpbmdcbiAgICAgICAgc2NlbmUuYmFja2dyb3VuZCA9IGxvYWRlZFxuICAgICAgICBzY2VuZS5lbnZpcm9ubWVudCA9IG51bGxcbiAgICAgIH0pXG4gICAgICBicmVha1xuICAgIGNhc2UgJ0N1YmVtYXAnOlxuICAgICAgdGV4dHVyZUxvYWRlci5sb2FkKCcvYXNzZXRzL2VxdWkuanBlZycsIChsb2FkZWQpID0+IHtcbiAgICAgICAgbG9hZGVkLm1hcHBpbmcgPSBUSFJFRS5FcXVpcmVjdGFuZ3VsYXJSZWZsZWN0aW9uTWFwcGluZ1xuICAgICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbG9hZGVkXG4gICAgICAgIHNjZW5lLmVudmlyb25tZW50ID0gbG9hZGVkXG4gICAgICB9KVxuXG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICBicmVha1xuICB9XG59XG4iLCJpbXBvcnQge1xuXHRCdWZmZXJHZW9tZXRyeSxcblx0RmxvYXQzMkJ1ZmZlckF0dHJpYnV0ZSxcblx0TGluZVNlZ21lbnRzLFxuXHRMaW5lQmFzaWNNYXRlcmlhbCxcblx0TWF0cml4Myxcblx0VmVjdG9yM1xufSBmcm9tICd0aHJlZSc7XG5cbmNvbnN0IF92MSA9IG5ldyBWZWN0b3IzKCk7XG5jb25zdCBfdjIgPSBuZXcgVmVjdG9yMygpO1xuY29uc3QgX25vcm1hbE1hdHJpeCA9IG5ldyBNYXRyaXgzKCk7XG5cbmNsYXNzIFZlcnRleE5vcm1hbHNIZWxwZXIgZXh0ZW5kcyBMaW5lU2VnbWVudHMge1xuXG5cdGNvbnN0cnVjdG9yKCBvYmplY3QsIHNpemUgPSAxLCBjb2xvciA9IDB4ZmYwMDAwICkge1xuXG5cdFx0Y29uc3QgZ2VvbWV0cnkgPSBuZXcgQnVmZmVyR2VvbWV0cnkoKTtcblxuXHRcdGNvbnN0IG5Ob3JtYWxzID0gb2JqZWN0Lmdlb21ldHJ5LmF0dHJpYnV0ZXMubm9ybWFsLmNvdW50O1xuXHRcdGNvbnN0IHBvc2l0aW9ucyA9IG5ldyBGbG9hdDMyQnVmZmVyQXR0cmlidXRlKCBuTm9ybWFscyAqIDIgKiAzLCAzICk7XG5cblx0XHRnZW9tZXRyeS5zZXRBdHRyaWJ1dGUoICdwb3NpdGlvbicsIHBvc2l0aW9ucyApO1xuXG5cdFx0c3VwZXIoIGdlb21ldHJ5LCBuZXcgTGluZUJhc2ljTWF0ZXJpYWwoIHsgY29sb3IsIHRvbmVNYXBwZWQ6IGZhbHNlIH0gKSApO1xuXG5cdFx0dGhpcy5vYmplY3QgPSBvYmplY3Q7XG5cdFx0dGhpcy5zaXplID0gc2l6ZTtcblx0XHR0aGlzLnR5cGUgPSAnVmVydGV4Tm9ybWFsc0hlbHBlcic7XG5cblx0XHQvL1xuXG5cdFx0dGhpcy5tYXRyaXhBdXRvVXBkYXRlID0gZmFsc2U7XG5cblx0XHR0aGlzLnVwZGF0ZSgpO1xuXG5cdH1cblxuXHR1cGRhdGUoKSB7XG5cblx0XHR0aGlzLm9iamVjdC51cGRhdGVNYXRyaXhXb3JsZCggdHJ1ZSApO1xuXG5cdFx0X25vcm1hbE1hdHJpeC5nZXROb3JtYWxNYXRyaXgoIHRoaXMub2JqZWN0Lm1hdHJpeFdvcmxkICk7XG5cblx0XHRjb25zdCBtYXRyaXhXb3JsZCA9IHRoaXMub2JqZWN0Lm1hdHJpeFdvcmxkO1xuXG5cdFx0Y29uc3QgcG9zaXRpb24gPSB0aGlzLmdlb21ldHJ5LmF0dHJpYnV0ZXMucG9zaXRpb247XG5cblx0XHQvL1xuXG5cdFx0Y29uc3Qgb2JqR2VvbWV0cnkgPSB0aGlzLm9iamVjdC5nZW9tZXRyeTtcblxuXHRcdGlmICggb2JqR2VvbWV0cnkgKSB7XG5cblx0XHRcdGNvbnN0IG9ialBvcyA9IG9iakdlb21ldHJ5LmF0dHJpYnV0ZXMucG9zaXRpb247XG5cblx0XHRcdGNvbnN0IG9iak5vcm0gPSBvYmpHZW9tZXRyeS5hdHRyaWJ1dGVzLm5vcm1hbDtcblxuXHRcdFx0bGV0IGlkeCA9IDA7XG5cblx0XHRcdC8vIGZvciBzaW1wbGljaXR5LCBpZ25vcmUgaW5kZXggYW5kIGRyYXdjYWxscywgYW5kIHJlbmRlciBldmVyeSBub3JtYWxcblxuXHRcdFx0Zm9yICggbGV0IGogPSAwLCBqbCA9IG9ialBvcy5jb3VudDsgaiA8IGpsOyBqICsrICkge1xuXG5cdFx0XHRcdF92MS5mcm9tQnVmZmVyQXR0cmlidXRlKCBvYmpQb3MsIGogKS5hcHBseU1hdHJpeDQoIG1hdHJpeFdvcmxkICk7XG5cblx0XHRcdFx0X3YyLmZyb21CdWZmZXJBdHRyaWJ1dGUoIG9iak5vcm0sIGogKTtcblxuXHRcdFx0XHRfdjIuYXBwbHlNYXRyaXgzKCBfbm9ybWFsTWF0cml4ICkubm9ybWFsaXplKCkubXVsdGlwbHlTY2FsYXIoIHRoaXMuc2l6ZSApLmFkZCggX3YxICk7XG5cblx0XHRcdFx0cG9zaXRpb24uc2V0WFlaKCBpZHgsIF92MS54LCBfdjEueSwgX3YxLnogKTtcblxuXHRcdFx0XHRpZHggPSBpZHggKyAxO1xuXG5cdFx0XHRcdHBvc2l0aW9uLnNldFhZWiggaWR4LCBfdjIueCwgX3YyLnksIF92Mi56ICk7XG5cblx0XHRcdFx0aWR4ID0gaWR4ICsgMTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0cG9zaXRpb24ubmVlZHNVcGRhdGUgPSB0cnVlO1xuXG5cdH1cblxufVxuXG5cbmV4cG9ydCB7IFZlcnRleE5vcm1hbHNIZWxwZXIgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiYm94LWdlb21ldHJ5XCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2x0anNfZm91cnRoXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2x0anNfZm91cnRoXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9idWlsZF90aHJlZV9tb2R1bGVfanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9jb250cm9sc19PcmJpdENvbnRyb2xzX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc19saWwtZ3VpX2Rpc3RfbGlsLWd1aV9lc21fanNcIixcInNhbXBsZXNfYm9vdHN0cmFwX2Jvb3RzdHJhcF9qcy1zYW1wbGVzX2NvbnRyb2xzX21hdGVyaWFsLWNvbnRyb2xzX2pzLXNhbXBsZXNfY29udHJvbHNfcmVuZGVyZS1jODdkOGFcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItNS9ib3gtZ2VvbWV0cnkuanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
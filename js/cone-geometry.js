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

/***/ "./samples/chapters/chapter-5/cone-geometry.js"
/*!*****************************************************!*\
  !*** ./samples/chapters/chapter-5/cone-geometry.js ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _util_standard_scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/standard-scene */ "./samples/chapters/chapter-5/util/standard-scene.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ "./samples/chapters/chapter-5/util/index.js");




const props = {
  radius: 1,
  height: 3,
  radialSegments: 30,
  heightSegments: 30,
  openEnded: true,
  thetaStart: 0,
  thetaLength: 2 * Math.PI
}

const updateGeometry = ({ radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength }) => {
  return new three__WEBPACK_IMPORTED_MODULE_0__.ConeGeometry(radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength)
}

const geometry = updateGeometry(props)

;(0,_util_standard_scene__WEBPACK_IMPORTED_MODULE_1__.bootstrapGeometryScene)({
  geometry,
  provideGui: (gui, mesh) => {
    const folder = gui.addFolder('THREE.ConeGeometry')
    folder.add(props, 'radius', -10, 10, 0.01).onChange(() => (0,_util__WEBPACK_IMPORTED_MODULE_2__.updateMesh)(mesh, updateGeometry(props)))
    folder.add(props, 'height', 0, 10, 0.01).onChange(() => (0,_util__WEBPACK_IMPORTED_MODULE_2__.updateMesh)(mesh, updateGeometry(props)))
    folder.add(props, 'radialSegments', 1, 100, 1).onChange(() => (0,_util__WEBPACK_IMPORTED_MODULE_2__.updateMesh)(mesh, updateGeometry(props)))
    folder.add(props, 'heightSegments', 1, 100, 1).onChange(() => (0,_util__WEBPACK_IMPORTED_MODULE_2__.updateMesh)(mesh, updateGeometry(props)))
    folder.add(props, 'openEnded').onChange(() => (0,_util__WEBPACK_IMPORTED_MODULE_2__.updateMesh)(mesh, updateGeometry(props)))
    folder.add(props, 'thetaStart', 0, Math.PI, 0.01).onChange(() => (0,_util__WEBPACK_IMPORTED_MODULE_2__.updateMesh)(mesh, updateGeometry(props)))
    folder.add(props, 'thetaLength', 0, 2 * Math.PI, 0.01).onChange(() => (0,_util__WEBPACK_IMPORTED_MODULE_2__.updateMesh)(mesh, updateGeometry(props)))
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
/******/ 			"cone-geometry": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","samples_bootstrap_bootstrap_js-samples_controls_material-controls_js-samples_controls_rendere-c87d8a"], () => (__webpack_require__("./samples/chapters/chapter-5/cone-geometry.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0EsNEc7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvYm9vdHN0cmFwL2Zsb29yLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTUvY29uZS1nZW9tZXRyeS5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci01L3V0aWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItNS91dGlsL3N0YW5kYXJkLXNjZW5lLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jb250cm9scy9tZXNoLXZpc2libGUtY29udHJvbHMuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NvbnRyb2xzL3NjZW5lLWNvbnRyb2xzLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vbm9kZV9tb2R1bGVzL3RocmVlL2V4YW1wbGVzL2pzbS9oZWxwZXJzL1ZlcnRleE5vcm1hbHNIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcblxuZXhwb3J0IGNvbnN0IGZvcmV2ZXJQbGFuZSA9IChzY2VuZSkgPT4ge1xuICBjb25zdCBnZW8gPSBuZXcgVEhSRUUuUGxhbmVCdWZmZXJHZW9tZXRyeSgxMDAwMCwgMTAwMDApXG4gIGNvbnN0IG1hdCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHtcbiAgICBjb2xvcjogMHhmZmZmZmZcbiAgfSlcbiAgY29uc3QgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlbywgbWF0KVxuICBtZXNoLnBvc2l0aW9uLnNldCgwLCAtMiwgMClcbiAgbWVzaC5yb3RhdGlvbi5zZXQoTWF0aC5QSSAvIC0yLCAwLCAwKVxuICBtZXNoLnJlY2VpdmVTaGFkb3cgPSB0cnVlXG4gIG1lc2gubmFtZSA9ICdmb3JldmVyLWZsb29yJ1xuICBzY2VuZS5hZGQobWVzaClcblxuICByZXR1cm4gbWVzaFxufVxuXG5leHBvcnQgY29uc3QgZmxvYXRpbmdGbG9vciA9IChzY2VuZSwgc2l6ZSkgPT4ge1xuICBjb25zdCBzID0gc2l6ZSA/IHNpemUgOiA2XG4gIGNvbnN0IGdlbyA9IG5ldyBUSFJFRS5Cb3hCdWZmZXJHZW9tZXRyeShzLCAwLjI1LCBzLCAxMCwgMTAsIDEwKVxuICBjb25zdCBtYXQgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoe1xuICAgIGNvbG9yOiAweGRkZGRkZFxuICB9KVxuICBjb25zdCBtZXNoID0gbmV3IFRIUkVFLk1lc2goZ2VvLCBtYXQpXG4gIG1lc2gucG9zaXRpb24uc2V0KDAsIC0yLCAtMSlcbiAgbWVzaC5yZWNlaXZlU2hhZG93ID0gdHJ1ZVxuICBtZXNoLm5hbWUgPSAnZmxvYXRpbmctZmxvb3InXG4gIHNjZW5lLmFkZChtZXNoKVxuXG4gIHJldHVybiBtZXNoXG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcbmltcG9ydCB7IGJvb3RzdHJhcEdlb21ldHJ5U2NlbmUgfSBmcm9tICcuL3V0aWwvc3RhbmRhcmQtc2NlbmUnXG5pbXBvcnQgeyB1cGRhdGVNZXNoIH0gZnJvbSAnLi91dGlsJ1xuXG5jb25zdCBwcm9wcyA9IHtcbiAgcmFkaXVzOiAxLFxuICBoZWlnaHQ6IDMsXG4gIHJhZGlhbFNlZ21lbnRzOiAzMCxcbiAgaGVpZ2h0U2VnbWVudHM6IDMwLFxuICBvcGVuRW5kZWQ6IHRydWUsXG4gIHRoZXRhU3RhcnQ6IDAsXG4gIHRoZXRhTGVuZ3RoOiAyICogTWF0aC5QSVxufVxuXG5jb25zdCB1cGRhdGVHZW9tZXRyeSA9ICh7IHJhZGl1cywgaGVpZ2h0LCByYWRpYWxTZWdtZW50cywgaGVpZ2h0U2VnbWVudHMsIG9wZW5FbmRlZCwgdGhldGFTdGFydCwgdGhldGFMZW5ndGggfSkgPT4ge1xuICByZXR1cm4gbmV3IFRIUkVFLkNvbmVHZW9tZXRyeShyYWRpdXMsIGhlaWdodCwgcmFkaWFsU2VnbWVudHMsIGhlaWdodFNlZ21lbnRzLCBvcGVuRW5kZWQsIHRoZXRhU3RhcnQsIHRoZXRhTGVuZ3RoKVxufVxuXG5jb25zdCBnZW9tZXRyeSA9IHVwZGF0ZUdlb21ldHJ5KHByb3BzKVxuXG5ib290c3RyYXBHZW9tZXRyeVNjZW5lKHtcbiAgZ2VvbWV0cnksXG4gIHByb3ZpZGVHdWk6IChndWksIG1lc2gpID0+IHtcbiAgICBjb25zdCBmb2xkZXIgPSBndWkuYWRkRm9sZGVyKCdUSFJFRS5Db25lR2VvbWV0cnknKVxuICAgIGZvbGRlci5hZGQocHJvcHMsICdyYWRpdXMnLCAtMTAsIDEwLCAwLjAxKS5vbkNoYW5nZSgoKSA9PiB1cGRhdGVNZXNoKG1lc2gsIHVwZGF0ZUdlb21ldHJ5KHByb3BzKSkpXG4gICAgZm9sZGVyLmFkZChwcm9wcywgJ2hlaWdodCcsIDAsIDEwLCAwLjAxKS5vbkNoYW5nZSgoKSA9PiB1cGRhdGVNZXNoKG1lc2gsIHVwZGF0ZUdlb21ldHJ5KHByb3BzKSkpXG4gICAgZm9sZGVyLmFkZChwcm9wcywgJ3JhZGlhbFNlZ21lbnRzJywgMSwgMTAwLCAxKS5vbkNoYW5nZSgoKSA9PiB1cGRhdGVNZXNoKG1lc2gsIHVwZGF0ZUdlb21ldHJ5KHByb3BzKSkpXG4gICAgZm9sZGVyLmFkZChwcm9wcywgJ2hlaWdodFNlZ21lbnRzJywgMSwgMTAwLCAxKS5vbkNoYW5nZSgoKSA9PiB1cGRhdGVNZXNoKG1lc2gsIHVwZGF0ZUdlb21ldHJ5KHByb3BzKSkpXG4gICAgZm9sZGVyLmFkZChwcm9wcywgJ29wZW5FbmRlZCcpLm9uQ2hhbmdlKCgpID0+IHVwZGF0ZU1lc2gobWVzaCwgdXBkYXRlR2VvbWV0cnkocHJvcHMpKSlcbiAgICBmb2xkZXIuYWRkKHByb3BzLCAndGhldGFTdGFydCcsIDAsIE1hdGguUEksIDAuMDEpLm9uQ2hhbmdlKCgpID0+IHVwZGF0ZU1lc2gobWVzaCwgdXBkYXRlR2VvbWV0cnkocHJvcHMpKSlcbiAgICBmb2xkZXIuYWRkKHByb3BzLCAndGhldGFMZW5ndGgnLCAwLCAyICogTWF0aC5QSSwgMC4wMSkub25DaGFuZ2UoKCkgPT4gdXBkYXRlTWVzaChtZXNoLCB1cGRhdGVHZW9tZXRyeShwcm9wcykpKVxuICB9XG59KS50aGVuKClcbiIsImV4cG9ydCBjb25zdCB1cGRhdGVNZXNoID0gKG1lc2gsIGdlb21ldHJ5KSA9PiB7XG4gIG1lc2guZ2VvbWV0cnkuZGlzcG9zZSgpXG4gIG1lc2guZ2VvbWV0cnkgPSBnZW9tZXRyeVxufVxuIiwiaW1wb3J0IHsgaW5pdFNjZW5lIH0gZnJvbSAnLi4vLi4vLi4vYm9vdHN0cmFwL2Jvb3RzdHJhcCdcbmltcG9ydCB7IGludGlhbGl6ZVJlbmRlcmVyQ29udHJvbHMgfSBmcm9tICcuLi8uLi8uLi9jb250cm9scy9yZW5kZXJlci1jb250cm9sJ1xuXG5pbXBvcnQgR1VJIGZyb20gJ2xpbC1ndWknXG5pbXBvcnQgeyBpbml0aWFsaXplR3VpTWF0ZXJpYWwsIGluaXRpYWxpemVHdWlNZXNoU3RhbmRhcmRNYXRlcmlhbCB9IGZyb20gJy4uLy4uLy4uL2NvbnRyb2xzL21hdGVyaWFsLWNvbnRyb2xzJ1xuaW1wb3J0IHsgaW5pdGlhbGl6ZVNjZW5lQ29udHJvbHMgfSBmcm9tICcuLi8uLi8uLi9jb250cm9scy9zY2VuZS1jb250cm9scydcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuaW1wb3J0IHsgZm9yZXZlclBsYW5lIH0gZnJvbSAnLi4vLi4vLi4vYm9vdHN0cmFwL2Zsb29yJ1xuaW1wb3J0IHsgaW5pdGlhbGl6ZU1lc2hWaXNpYmxlQ29udHJvbHMgfSBmcm9tICcuLi8uLi8uLi9jb250cm9scy9tZXNoLXZpc2libGUtY29udHJvbHMnXG5cbmV4cG9ydCBjb25zdCBib290c3RyYXBHZW9tZXRyeVNjZW5lID0gYXN5bmMgKHsgZ2VvbWV0cnksIHByb3ZpZGVHdWksIGhpZGVmbG9vciB9KSA9PiB7XG4gIGNvbnN0IHByb3BzID0ge1xuICAgIGJhY2tncm91bmRDb2xvcjogMHhmZmZmZmYsXG4gICAgZm9nQ29sb3I6IDB4ZmZmZmZmXG4gIH1cblxuICBjb25zdCBndWkgPSBuZXcgR1VJKClcblxuICBjb25zdCBpbml0ID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcbiAgICAgIGNvbG9yOiAweGZmYWE4OFxuICAgIH0pXG4gICAgY29uc3QgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbClcbiAgICBtZXNoLmNhc3RTaGFkb3cgPSB0cnVlXG4gICAgaW5pdFNjZW5lKHByb3BzKSgoeyBzY2VuZSwgY2FtZXJhLCByZW5kZXJlciwgb3JiaXRDb250cm9scyB9KSA9PiB7XG4gICAgICByZW5kZXJlci5zaGFkb3dNYXAudHlwZSA9IFRIUkVFLlBDRlNvZnRTaGFkb3dNYXBcbiAgICAgIGNhbWVyYS5wb3NpdGlvbi54ID0gLTNcbiAgICAgIGNhbWVyYS5wb3NpdGlvbi56ID0gOFxuICAgICAgY2FtZXJhLnBvc2l0aW9uLnkgPSAyXG4gICAgICBvcmJpdENvbnRyb2xzLnVwZGF0ZSgpXG5cbiAgICAgIGZ1bmN0aW9uIGFuaW1hdGUoKSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKVxuICAgICAgICByZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSlcbiAgICAgICAgb3JiaXRDb250cm9scy51cGRhdGUoKVxuICAgICAgfVxuXG4gICAgICBhbmltYXRlKClcblxuICAgICAgY29uc3QgcGxhbmUgPSBoaWRlZmxvb3IgPz8gZm9yZXZlclBsYW5lKHNjZW5lKVxuICAgICAgc2NlbmUuYWRkKG1lc2gpXG4gICAgICBpbnRpYWxpemVSZW5kZXJlckNvbnRyb2xzKGd1aSwgcmVuZGVyZXIpXG4gICAgICBpbml0aWFsaXplU2NlbmVDb250cm9scyhndWksIHNjZW5lLCBmYWxzZSlcblxuICAgICAgaW5pdGlhbGl6ZUd1aU1hdGVyaWFsKGd1aSwgbWVzaCwgbWF0ZXJpYWwpLmNsb3NlKClcbiAgICAgIGluaXRpYWxpemVHdWlNZXNoU3RhbmRhcmRNYXRlcmlhbChndWksIG1lc2gsIG1hdGVyaWFsKS5jbG9zZSgpXG4gICAgICBoaWRlZmxvb3IgPz8gaW5pdGlhbGl6ZU1lc2hWaXNpYmxlQ29udHJvbHMoZ3VpLCBwbGFuZSwgJ0Zsb29yJylcbiAgICAgIHByb3ZpZGVHdWkoZ3VpLCBtZXNoKVxuICAgIH0pXG4gIH1cblxuICBpbml0KCkudGhlbigpXG59XG4iLCJleHBvcnQgY29uc3QgaW5pdGlhbGl6ZU1lc2hWaXNpYmxlQ29udHJvbHMgPSAoZ3VpLCBtZXNoLCB0aXRsZSkgPT4ge1xuICBjb25zdCBmb2xkZXIgPSBndWkuYWRkRm9sZGVyKHRpdGxlKVxuICBmb2xkZXIuYWRkKG1lc2gsICd2aXNpYmxlJylcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuXG5jb25zdCB0ZXh0dXJlTG9hZGVyID0gbmV3IFRIUkVFLlRleHR1cmVMb2FkZXIoKVxuXG5jb25zdCBwcm9wZXJ0aWVzT2JqZWN0ID0gKHNjZW5lKSA9PiAoe1xuICBvdmVycmlkZU1hdGVyaWFsOiB7XG4gICAgdG9nZ2xlOiAoKSA9PiB7XG4gICAgICBpZiAoc2NlbmUub3ZlcnJpZGVNYXRlcmlhbCAhPT0gbnVsbCkge1xuICAgICAgICBzY2VuZS5vdmVycmlkZU1hdGVyaWFsID0gbnVsbFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2NlbmUub3ZlcnJpZGVNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTm9ybWFsTWF0ZXJpYWwoKVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgYmFja0dyb3VuZDogJ1doaXRlJyxcbiAgZW52aXJvbm1lbnQ6IHtcbiAgICB0b2dnbGU6ICgpID0+IHtcbiAgICAgIGlmIChzY2VuZS5lbnZpcm9ubWVudCAhPT0gbnVsbCkge1xuICAgICAgICBzY2VuZS5lbnZpcm9ubWVudCA9IG51bGxcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRleHR1cmVMb2FkZXIubG9hZCgnL2Fzc2V0cy9lcXVpLmpwZWcnLCAobG9hZGVkKSA9PiB7XG4gICAgICAgICAgbG9hZGVkLm1hcHBpbmcgPSBUSFJFRS5FcXVpcmVjdGFuZ3VsYXJSZWZsZWN0aW9uTWFwcGluZ1xuICAgICAgICAgIHNjZW5lLmVudmlyb25tZW50ID0gbG9hZGVkXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuXG5jb25zdCBmb2dQcm9wZXJ0aWVzID0gKGZvZykgPT4gKHtcbiAgY29sb3I6IDB4ZmZmZmZmLFxuICBuZWFyOiBmb2cubmVhcixcbiAgZmFyOiBmb2cuZmFyXG59KVxuXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZVNjZW5lQ29udHJvbHMgPSAoZ3VpLCBzY2VuZSwgZm9nRW5hYmxlZCwgaXNPcGVuKSA9PiB7XG4gIGNvbnN0IHByb3BzID0gcHJvcGVydGllc09iamVjdChzY2VuZSlcbiAgY29uc3Qgc2NlbmVDb250cm9scyA9IGd1aS5hZGRGb2xkZXIoJ1NjZW5lJylcblxuICBzY2VuZUNvbnRyb2xzXG4gICAgLmFkZChwcm9wcywgJ2JhY2tHcm91bmQnLCBbJ1doaXRlJywgJ0JsYWNrJywgJ051bGwnLCAnQ29sb3InLCAnVGV4dHVyZScsICdDdWJlbWFwJ10pXG4gICAgLm9uQ2hhbmdlKChldmVudCkgPT4gaGFuZGxlQmFja2dyb3VuZENoYW5nZShldmVudCwgc2NlbmUpKVxuICBzY2VuZUNvbnRyb2xzLmFkZChwcm9wcy5vdmVycmlkZU1hdGVyaWFsLCAndG9nZ2xlJykubmFtZSgnVG9nZ2xlIE92ZXJyaWRlIE1hdGVyaWFsJylcbiAgc2NlbmVDb250cm9scy5hZGQocHJvcHMuZW52aXJvbm1lbnQsICd0b2dnbGUnKS5uYW1lKCdUb2dnbGUgRW52aXJvbm1lbnQnKVxuXG4gIGlmIChmb2dFbmFibGVkKSB7XG4gICAgY29uc3QgZm9nQ29sb3IgPSBuZXcgVEhSRUUuQ29sb3IoMHhmZmZmZmYpXG4gICAgY29uc3QgZm9nID0gbmV3IFRIUkVFLkZvZyhmb2dDb2xvciwgMSwgMjApXG4gICAgc2NlbmUuZm9nID0gZm9nXG4gICAgY29uc3QgZm9nUHJvcHMgPSBmb2dQcm9wZXJ0aWVzKGZvZylcbiAgICBjb25zdCBmb2dDb250cm9scyA9IHNjZW5lQ29udHJvbHMuYWRkRm9sZGVyKCdGb2cnKVxuICAgIGZvZ0NvbnRyb2xzLmFkZENvbG9yKGZvZ1Byb3BzLCAnY29sb3InKVxuICAgIGZvZ0NvbnRyb2xzLmFkZChmb2dQcm9wcywgJ25lYXInLCAwLCAxMCwgMC4xKVxuICAgIGZvZ0NvbnRyb2xzLmFkZChmb2dQcm9wcywgJ2ZhcicsIDAsIDEwMCwgMC4xKVxuXG4gICAgZm9nQ29udHJvbHMub25DaGFuZ2UoKCkgPT4ge1xuICAgICAgZm9nLmNvbG9yID0gZm9nQ29sb3Iuc2V0SGV4KGZvZ1Byb3BzLmNvbG9yKVxuICAgICAgZm9nLm5lYXIgPSBmb2dQcm9wcy5uZWFyXG4gICAgICBmb2cuZmFyID0gZm9nUHJvcHMuZmFyXG4gICAgfSlcbiAgfVxuXG4gIGlzT3BlbiA/IHNjZW5lQ29udHJvbHMub3BlbigpIDogc2NlbmVDb250cm9scy5jbG9zZSgpXG59XG5cbmNvbnN0IGhhbmRsZUJhY2tncm91bmRDaGFuZ2UgPSAoc2V0dGluZywgc2NlbmUpID0+IHtcbiAgc3dpdGNoIChzZXR0aW5nKSB7XG4gICAgY2FzZSAnV2hpdGUnOlxuICAgICAgc2NlbmUuYmFja2dyb3VuZCA9IG5ldyBUSFJFRS5Db2xvcigweGZmZmZmZilcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnQmxhY2snOlxuICAgICAgc2NlbmUuYmFja2dyb3VuZCA9IG5ldyBUSFJFRS5Db2xvcigweDAwMDAwMClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnTnVsbCc6XG4gICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbnVsbFxuICAgICAgYnJlYWtcbiAgICBjYXNlICdDb2xvcic6XG4gICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbmV3IFRIUkVFLkNvbG9yKDB4NDRmZjQ0KVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdUZXh0dXJlJzpcbiAgICAgIHRleHR1cmVMb2FkZXIubG9hZCgnL2Fzc2V0cy90ZXh0dXJlcy93b29kL2Fic3RyYWN0LWFudGlxdWUtYmFja2Ryb3AtMTY0MDA1LmpwZycsIChsb2FkZWQpID0+IHtcbiAgICAgICAgbG9hZGVkLmVuY29kaW5nID0gVEhSRUUuc1JHQkVuY29kaW5nXG4gICAgICAgIHNjZW5lLmJhY2tncm91bmQgPSBsb2FkZWRcbiAgICAgICAgc2NlbmUuZW52aXJvbm1lbnQgPSBudWxsXG4gICAgICB9KVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdDdWJlbWFwJzpcbiAgICAgIHRleHR1cmVMb2FkZXIubG9hZCgnL2Fzc2V0cy9lcXVpLmpwZWcnLCAobG9hZGVkKSA9PiB7XG4gICAgICAgIGxvYWRlZC5tYXBwaW5nID0gVEhSRUUuRXF1aXJlY3Rhbmd1bGFyUmVmbGVjdGlvbk1hcHBpbmdcbiAgICAgICAgc2NlbmUuYmFja2dyb3VuZCA9IGxvYWRlZFxuICAgICAgICBzY2VuZS5lbnZpcm9ubWVudCA9IGxvYWRlZFxuICAgICAgfSlcblxuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgYnJlYWtcbiAgfVxufVxuIiwiaW1wb3J0IHtcblx0QnVmZmVyR2VvbWV0cnksXG5cdEZsb2F0MzJCdWZmZXJBdHRyaWJ1dGUsXG5cdExpbmVTZWdtZW50cyxcblx0TGluZUJhc2ljTWF0ZXJpYWwsXG5cdE1hdHJpeDMsXG5cdFZlY3RvcjNcbn0gZnJvbSAndGhyZWUnO1xuXG5jb25zdCBfdjEgPSBuZXcgVmVjdG9yMygpO1xuY29uc3QgX3YyID0gbmV3IFZlY3RvcjMoKTtcbmNvbnN0IF9ub3JtYWxNYXRyaXggPSBuZXcgTWF0cml4MygpO1xuXG5jbGFzcyBWZXJ0ZXhOb3JtYWxzSGVscGVyIGV4dGVuZHMgTGluZVNlZ21lbnRzIHtcblxuXHRjb25zdHJ1Y3Rvciggb2JqZWN0LCBzaXplID0gMSwgY29sb3IgPSAweGZmMDAwMCApIHtcblxuXHRcdGNvbnN0IGdlb21ldHJ5ID0gbmV3IEJ1ZmZlckdlb21ldHJ5KCk7XG5cblx0XHRjb25zdCBuTm9ybWFscyA9IG9iamVjdC5nZW9tZXRyeS5hdHRyaWJ1dGVzLm5vcm1hbC5jb3VudDtcblx0XHRjb25zdCBwb3NpdGlvbnMgPSBuZXcgRmxvYXQzMkJ1ZmZlckF0dHJpYnV0ZSggbk5vcm1hbHMgKiAyICogMywgMyApO1xuXG5cdFx0Z2VvbWV0cnkuc2V0QXR0cmlidXRlKCAncG9zaXRpb24nLCBwb3NpdGlvbnMgKTtcblxuXHRcdHN1cGVyKCBnZW9tZXRyeSwgbmV3IExpbmVCYXNpY01hdGVyaWFsKCB7IGNvbG9yLCB0b25lTWFwcGVkOiBmYWxzZSB9ICkgKTtcblxuXHRcdHRoaXMub2JqZWN0ID0gb2JqZWN0O1xuXHRcdHRoaXMuc2l6ZSA9IHNpemU7XG5cdFx0dGhpcy50eXBlID0gJ1ZlcnRleE5vcm1hbHNIZWxwZXInO1xuXG5cdFx0Ly9cblxuXHRcdHRoaXMubWF0cml4QXV0b1VwZGF0ZSA9IGZhbHNlO1xuXG5cdFx0dGhpcy51cGRhdGUoKTtcblxuXHR9XG5cblx0dXBkYXRlKCkge1xuXG5cdFx0dGhpcy5vYmplY3QudXBkYXRlTWF0cml4V29ybGQoIHRydWUgKTtcblxuXHRcdF9ub3JtYWxNYXRyaXguZ2V0Tm9ybWFsTWF0cml4KCB0aGlzLm9iamVjdC5tYXRyaXhXb3JsZCApO1xuXG5cdFx0Y29uc3QgbWF0cml4V29ybGQgPSB0aGlzLm9iamVjdC5tYXRyaXhXb3JsZDtcblxuXHRcdGNvbnN0IHBvc2l0aW9uID0gdGhpcy5nZW9tZXRyeS5hdHRyaWJ1dGVzLnBvc2l0aW9uO1xuXG5cdFx0Ly9cblxuXHRcdGNvbnN0IG9iakdlb21ldHJ5ID0gdGhpcy5vYmplY3QuZ2VvbWV0cnk7XG5cblx0XHRpZiAoIG9iakdlb21ldHJ5ICkge1xuXG5cdFx0XHRjb25zdCBvYmpQb3MgPSBvYmpHZW9tZXRyeS5hdHRyaWJ1dGVzLnBvc2l0aW9uO1xuXG5cdFx0XHRjb25zdCBvYmpOb3JtID0gb2JqR2VvbWV0cnkuYXR0cmlidXRlcy5ub3JtYWw7XG5cblx0XHRcdGxldCBpZHggPSAwO1xuXG5cdFx0XHQvLyBmb3Igc2ltcGxpY2l0eSwgaWdub3JlIGluZGV4IGFuZCBkcmF3Y2FsbHMsIGFuZCByZW5kZXIgZXZlcnkgbm9ybWFsXG5cblx0XHRcdGZvciAoIGxldCBqID0gMCwgamwgPSBvYmpQb3MuY291bnQ7IGogPCBqbDsgaiArKyApIHtcblxuXHRcdFx0XHRfdjEuZnJvbUJ1ZmZlckF0dHJpYnV0ZSggb2JqUG9zLCBqICkuYXBwbHlNYXRyaXg0KCBtYXRyaXhXb3JsZCApO1xuXG5cdFx0XHRcdF92Mi5mcm9tQnVmZmVyQXR0cmlidXRlKCBvYmpOb3JtLCBqICk7XG5cblx0XHRcdFx0X3YyLmFwcGx5TWF0cml4MyggX25vcm1hbE1hdHJpeCApLm5vcm1hbGl6ZSgpLm11bHRpcGx5U2NhbGFyKCB0aGlzLnNpemUgKS5hZGQoIF92MSApO1xuXG5cdFx0XHRcdHBvc2l0aW9uLnNldFhZWiggaWR4LCBfdjEueCwgX3YxLnksIF92MS56ICk7XG5cblx0XHRcdFx0aWR4ID0gaWR4ICsgMTtcblxuXHRcdFx0XHRwb3NpdGlvbi5zZXRYWVooIGlkeCwgX3YyLngsIF92Mi55LCBfdjIueiApO1xuXG5cdFx0XHRcdGlkeCA9IGlkeCArIDE7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdHBvc2l0aW9uLm5lZWRzVXBkYXRlID0gdHJ1ZTtcblxuXHR9XG5cbn1cblxuXG5leHBvcnQgeyBWZXJ0ZXhOb3JtYWxzSGVscGVyIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImNvbmUtZ2VvbWV0cnlcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rbHRqc19mb3VydGhcIl0gPSBzZWxmW1wid2VicGFja0NodW5rbHRqc19mb3VydGhcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2J1aWxkX3RocmVlX21vZHVsZV9qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX2NvbnRyb2xzX09yYml0Q29udHJvbHNfanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX2xpbC1ndWlfZGlzdF9saWwtZ3VpX2VzbV9qc1wiLFwic2FtcGxlc19ib290c3RyYXBfYm9vdHN0cmFwX2pzLXNhbXBsZXNfY29udHJvbHNfbWF0ZXJpYWwtY29udHJvbHNfanMtc2FtcGxlc19jb250cm9sc19yZW5kZXJlLWM4N2Q4YVwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci01L2NvbmUtZ2VvbWV0cnkuanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
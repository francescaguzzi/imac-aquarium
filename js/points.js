/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./samples/chapters/chapter-7/points.js"
/*!**********************************************!*\
  !*** ./samples/chapters/chapter-7/points.js ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_standard_scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/standard-scene */ "./samples/chapters/chapter-7/util/standard-scene.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
// Use sprites and sprite material for a simple rendering



const createPoints = () => {
  const points = []

  for (let x = -15; x < 15; x++) {
    for (let y = -10; y < 10; y++) {
      let point = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(x / 4, y / 4, 0)
      points.push(point)
    }
  }

  const colors = new Float32Array(points.length * 3)
  points.forEach((e, i) => {
    const c = new three__WEBPACK_IMPORTED_MODULE_1__.Color(Math.random() * 0xffffff)
    colors[i * 3] = c.r
    colors[i * 3 + 1] = c.g
    colors[i * 3 + 2] = c.b
  })

  const geom = new three__WEBPACK_IMPORTED_MODULE_1__.BufferGeometry().setFromPoints(points)
  geom.setAttribute('color', new three__WEBPACK_IMPORTED_MODULE_1__.BufferAttribute(colors, 3, true))

  return geom
}

;(0,_util_standard_scene__WEBPACK_IMPORTED_MODULE_0__.bootstrapGeometryScene)({
  geometry: createPoints(),
  provideGui: () => {},
  material: new three__WEBPACK_IMPORTED_MODULE_1__.PointsMaterial({ size: 0.1, vertexColors: true, color: 0xffffff }),
  hidefloor: true
}).then()


/***/ },

/***/ "./samples/chapters/chapter-7/util/standard-scene.js"
/*!***********************************************************!*\
  !*** ./samples/chapters/chapter-7/util/standard-scene.js ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bootstrapGeometryScene: () => (/* binding */ bootstrapGeometryScene)
/* harmony export */ });
/* harmony import */ var _bootstrap_bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../bootstrap/bootstrap */ "./samples/bootstrap/bootstrap.js");
/* harmony import */ var _controls_renderer_control__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../controls/renderer-control */ "./samples/controls/renderer-control.js");
/* harmony import */ var lil_gui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lil-gui */ "./node_modules/lil-gui/dist/lil-gui.esm.js");
/* harmony import */ var _controls_scene_controls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../controls/scene-controls */ "./samples/controls/scene-controls.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _controls_material_controls__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../controls/material-controls */ "./samples/controls/material-controls.js");








const bootstrapGeometryScene = async ({
  geometry,
  provideGui,
  material,
  isSprite,
  spritePosition,
  onRender,
  provideMesh,
  backgroundColor
}) => {
  const props = {
    backgroundColor: backgroundColor ?? 0xffffff,
    fogColor: 0xffffff
  }

  const gui = new lil_gui__WEBPACK_IMPORTED_MODULE_2__["default"]()
  const points = provideMesh
    ? provideMesh(geometry)
    : isSprite
    ? new three__WEBPACK_IMPORTED_MODULE_4__.Sprite(material)
    : new three__WEBPACK_IMPORTED_MODULE_4__.Points(geometry, material)

  if (spritePosition) points.position.copy(spritePosition)

  const init = async () => {
    ;(0,_bootstrap_bootstrap__WEBPACK_IMPORTED_MODULE_0__.initScene)(props)(({ scene, camera, renderer, orbitControls }) => {
      renderer.shadowMap.type = three__WEBPACK_IMPORTED_MODULE_4__.PCFSoftShadowMap
      camera.position.x = -3
      camera.position.z = 8
      camera.position.y = 2
      orbitControls.update()

      function animate() {
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
        orbitControls.update()
        if (onRender) onRender(points)
      }

      animate()

      scene.add(points)
      ;(0,_controls_renderer_control__WEBPACK_IMPORTED_MODULE_1__.intializeRendererControls)(gui, renderer)
      ;(0,_controls_scene_controls__WEBPACK_IMPORTED_MODULE_3__.initializeSceneControls)(gui, scene, false)
      if (material) (0,_controls_material_controls__WEBPACK_IMPORTED_MODULE_5__.initializeGuiMaterial)(gui, scene, material)
      if (material)
        isSprite ? (0,_controls_material_controls__WEBPACK_IMPORTED_MODULE_5__.initializeSpriteMaterial)(gui, scene, material) : (0,_controls_material_controls__WEBPACK_IMPORTED_MODULE_5__.initializePointsMaterial)(gui, scene, material)
      provideGui(gui, points, scene)
    })
  }

  init().then()
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
/******/ 			"points": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","samples_bootstrap_bootstrap_js-samples_controls_material-controls_js-samples_controls_rendere-c87d8a"], () => (__webpack_require__("./samples/chapters/chapter-7/points.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7O0FBRytCOzs7Ozs7O1VDekYvQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOztVQUVBO1VBQ0E7Ozs7O1dDL0JBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsK0JBQStCLHdDQUF3QztXQUN2RTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlCQUFpQixxQkFBcUI7V0FDdEM7V0FDQTtXQUNBLGtCQUFrQixxQkFBcUI7V0FDdkM7V0FDQTtXQUNBLEtBQUs7V0FDTDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRTs7Ozs7V0MzQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQSw0Rzs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTcvcG9pbnRzLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTcvdXRpbC9zdGFuZGFyZC1zY2VuZS5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY29udHJvbHMvc2NlbmUtY29udHJvbHMuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9ub2RlX21vZHVsZXMvdGhyZWUvZXhhbXBsZXMvanNtL2hlbHBlcnMvVmVydGV4Tm9ybWFsc0hlbHBlci5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFVzZSBzcHJpdGVzIGFuZCBzcHJpdGUgbWF0ZXJpYWwgZm9yIGEgc2ltcGxlIHJlbmRlcmluZ1xuaW1wb3J0IHsgYm9vdHN0cmFwR2VvbWV0cnlTY2VuZSB9IGZyb20gJy4vdXRpbC9zdGFuZGFyZC1zY2VuZSdcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuXG5jb25zdCBjcmVhdGVQb2ludHMgPSAoKSA9PiB7XG4gIGNvbnN0IHBvaW50cyA9IFtdXG5cbiAgZm9yIChsZXQgeCA9IC0xNTsgeCA8IDE1OyB4KyspIHtcbiAgICBmb3IgKGxldCB5ID0gLTEwOyB5IDwgMTA7IHkrKykge1xuICAgICAgbGV0IHBvaW50ID0gbmV3IFRIUkVFLlZlY3RvcjMoeCAvIDQsIHkgLyA0LCAwKVxuICAgICAgcG9pbnRzLnB1c2gocG9pbnQpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgY29sb3JzID0gbmV3IEZsb2F0MzJBcnJheShwb2ludHMubGVuZ3RoICogMylcbiAgcG9pbnRzLmZvckVhY2goKGUsIGkpID0+IHtcbiAgICBjb25zdCBjID0gbmV3IFRIUkVFLkNvbG9yKE1hdGgucmFuZG9tKCkgKiAweGZmZmZmZilcbiAgICBjb2xvcnNbaSAqIDNdID0gYy5yXG4gICAgY29sb3JzW2kgKiAzICsgMV0gPSBjLmdcbiAgICBjb2xvcnNbaSAqIDMgKyAyXSA9IGMuYlxuICB9KVxuXG4gIGNvbnN0IGdlb20gPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKS5zZXRGcm9tUG9pbnRzKHBvaW50cylcbiAgZ2VvbS5zZXRBdHRyaWJ1dGUoJ2NvbG9yJywgbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShjb2xvcnMsIDMsIHRydWUpKVxuXG4gIHJldHVybiBnZW9tXG59XG5cbmJvb3RzdHJhcEdlb21ldHJ5U2NlbmUoe1xuICBnZW9tZXRyeTogY3JlYXRlUG9pbnRzKCksXG4gIHByb3ZpZGVHdWk6ICgpID0+IHt9LFxuICBtYXRlcmlhbDogbmV3IFRIUkVFLlBvaW50c01hdGVyaWFsKHsgc2l6ZTogMC4xLCB2ZXJ0ZXhDb2xvcnM6IHRydWUsIGNvbG9yOiAweGZmZmZmZiB9KSxcbiAgaGlkZWZsb29yOiB0cnVlXG59KS50aGVuKClcbiIsImltcG9ydCB7IGluaXRTY2VuZSB9IGZyb20gJy4uLy4uLy4uL2Jvb3RzdHJhcC9ib290c3RyYXAnXG5pbXBvcnQgeyBpbnRpYWxpemVSZW5kZXJlckNvbnRyb2xzIH0gZnJvbSAnLi4vLi4vLi4vY29udHJvbHMvcmVuZGVyZXItY29udHJvbCdcblxuaW1wb3J0IEdVSSBmcm9tICdsaWwtZ3VpJ1xuaW1wb3J0IHsgaW5pdGlhbGl6ZVNjZW5lQ29udHJvbHMgfSBmcm9tICcuLi8uLi8uLi9jb250cm9scy9zY2VuZS1jb250cm9scydcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuaW1wb3J0IHtcbiAgaW5pdGlhbGl6ZUd1aU1hdGVyaWFsLFxuICBpbml0aWFsaXplUG9pbnRzTWF0ZXJpYWwsXG4gIGluaXRpYWxpemVTcHJpdGVNYXRlcmlhbFxufSBmcm9tICcuLi8uLi8uLi9jb250cm9scy9tYXRlcmlhbC1jb250cm9scydcblxuZXhwb3J0IGNvbnN0IGJvb3RzdHJhcEdlb21ldHJ5U2NlbmUgPSBhc3luYyAoe1xuICBnZW9tZXRyeSxcbiAgcHJvdmlkZUd1aSxcbiAgbWF0ZXJpYWwsXG4gIGlzU3ByaXRlLFxuICBzcHJpdGVQb3NpdGlvbixcbiAgb25SZW5kZXIsXG4gIHByb3ZpZGVNZXNoLFxuICBiYWNrZ3JvdW5kQ29sb3Jcbn0pID0+IHtcbiAgY29uc3QgcHJvcHMgPSB7XG4gICAgYmFja2dyb3VuZENvbG9yOiBiYWNrZ3JvdW5kQ29sb3IgPz8gMHhmZmZmZmYsXG4gICAgZm9nQ29sb3I6IDB4ZmZmZmZmXG4gIH1cblxuICBjb25zdCBndWkgPSBuZXcgR1VJKClcbiAgY29uc3QgcG9pbnRzID0gcHJvdmlkZU1lc2hcbiAgICA/IHByb3ZpZGVNZXNoKGdlb21ldHJ5KVxuICAgIDogaXNTcHJpdGVcbiAgICA/IG5ldyBUSFJFRS5TcHJpdGUobWF0ZXJpYWwpXG4gICAgOiBuZXcgVEhSRUUuUG9pbnRzKGdlb21ldHJ5LCBtYXRlcmlhbClcblxuICBpZiAoc3ByaXRlUG9zaXRpb24pIHBvaW50cy5wb3NpdGlvbi5jb3B5KHNwcml0ZVBvc2l0aW9uKVxuXG4gIGNvbnN0IGluaXQgPSBhc3luYyAoKSA9PiB7XG4gICAgaW5pdFNjZW5lKHByb3BzKSgoeyBzY2VuZSwgY2FtZXJhLCByZW5kZXJlciwgb3JiaXRDb250cm9scyB9KSA9PiB7XG4gICAgICByZW5kZXJlci5zaGFkb3dNYXAudHlwZSA9IFRIUkVFLlBDRlNvZnRTaGFkb3dNYXBcbiAgICAgIGNhbWVyYS5wb3NpdGlvbi54ID0gLTNcbiAgICAgIGNhbWVyYS5wb3NpdGlvbi56ID0gOFxuICAgICAgY2FtZXJhLnBvc2l0aW9uLnkgPSAyXG4gICAgICBvcmJpdENvbnRyb2xzLnVwZGF0ZSgpXG5cbiAgICAgIGZ1bmN0aW9uIGFuaW1hdGUoKSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKVxuICAgICAgICByZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSlcbiAgICAgICAgb3JiaXRDb250cm9scy51cGRhdGUoKVxuICAgICAgICBpZiAob25SZW5kZXIpIG9uUmVuZGVyKHBvaW50cylcbiAgICAgIH1cblxuICAgICAgYW5pbWF0ZSgpXG5cbiAgICAgIHNjZW5lLmFkZChwb2ludHMpXG4gICAgICBpbnRpYWxpemVSZW5kZXJlckNvbnRyb2xzKGd1aSwgcmVuZGVyZXIpXG4gICAgICBpbml0aWFsaXplU2NlbmVDb250cm9scyhndWksIHNjZW5lLCBmYWxzZSlcbiAgICAgIGlmIChtYXRlcmlhbCkgaW5pdGlhbGl6ZUd1aU1hdGVyaWFsKGd1aSwgc2NlbmUsIG1hdGVyaWFsKVxuICAgICAgaWYgKG1hdGVyaWFsKVxuICAgICAgICBpc1Nwcml0ZSA/IGluaXRpYWxpemVTcHJpdGVNYXRlcmlhbChndWksIHNjZW5lLCBtYXRlcmlhbCkgOiBpbml0aWFsaXplUG9pbnRzTWF0ZXJpYWwoZ3VpLCBzY2VuZSwgbWF0ZXJpYWwpXG4gICAgICBwcm92aWRlR3VpKGd1aSwgcG9pbnRzLCBzY2VuZSlcbiAgICB9KVxuICB9XG5cbiAgaW5pdCgpLnRoZW4oKVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5cbmNvbnN0IHRleHR1cmVMb2FkZXIgPSBuZXcgVEhSRUUuVGV4dHVyZUxvYWRlcigpXG5cbmNvbnN0IHByb3BlcnRpZXNPYmplY3QgPSAoc2NlbmUpID0+ICh7XG4gIG92ZXJyaWRlTWF0ZXJpYWw6IHtcbiAgICB0b2dnbGU6ICgpID0+IHtcbiAgICAgIGlmIChzY2VuZS5vdmVycmlkZU1hdGVyaWFsICE9PSBudWxsKSB7XG4gICAgICAgIHNjZW5lLm92ZXJyaWRlTWF0ZXJpYWwgPSBudWxsXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY2VuZS5vdmVycmlkZU1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hOb3JtYWxNYXRlcmlhbCgpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBiYWNrR3JvdW5kOiAnV2hpdGUnLFxuICBlbnZpcm9ubWVudDoge1xuICAgIHRvZ2dsZTogKCkgPT4ge1xuICAgICAgaWYgKHNjZW5lLmVudmlyb25tZW50ICE9PSBudWxsKSB7XG4gICAgICAgIHNjZW5lLmVudmlyb25tZW50ID0gbnVsbFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGV4dHVyZUxvYWRlci5sb2FkKCcvYXNzZXRzL2VxdWkuanBlZycsIChsb2FkZWQpID0+IHtcbiAgICAgICAgICBsb2FkZWQubWFwcGluZyA9IFRIUkVFLkVxdWlyZWN0YW5ndWxhclJlZmxlY3Rpb25NYXBwaW5nXG4gICAgICAgICAgc2NlbmUuZW52aXJvbm1lbnQgPSBsb2FkZWRcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pXG5cbmNvbnN0IGZvZ1Byb3BlcnRpZXMgPSAoZm9nKSA9PiAoe1xuICBjb2xvcjogMHhmZmZmZmYsXG4gIG5lYXI6IGZvZy5uZWFyLFxuICBmYXI6IGZvZy5mYXJcbn0pXG5cbmV4cG9ydCBjb25zdCBpbml0aWFsaXplU2NlbmVDb250cm9scyA9IChndWksIHNjZW5lLCBmb2dFbmFibGVkLCBpc09wZW4pID0+IHtcbiAgY29uc3QgcHJvcHMgPSBwcm9wZXJ0aWVzT2JqZWN0KHNjZW5lKVxuICBjb25zdCBzY2VuZUNvbnRyb2xzID0gZ3VpLmFkZEZvbGRlcignU2NlbmUnKVxuXG4gIHNjZW5lQ29udHJvbHNcbiAgICAuYWRkKHByb3BzLCAnYmFja0dyb3VuZCcsIFsnV2hpdGUnLCAnQmxhY2snLCAnTnVsbCcsICdDb2xvcicsICdUZXh0dXJlJywgJ0N1YmVtYXAnXSlcbiAgICAub25DaGFuZ2UoKGV2ZW50KSA9PiBoYW5kbGVCYWNrZ3JvdW5kQ2hhbmdlKGV2ZW50LCBzY2VuZSkpXG4gIHNjZW5lQ29udHJvbHMuYWRkKHByb3BzLm92ZXJyaWRlTWF0ZXJpYWwsICd0b2dnbGUnKS5uYW1lKCdUb2dnbGUgT3ZlcnJpZGUgTWF0ZXJpYWwnKVxuICBzY2VuZUNvbnRyb2xzLmFkZChwcm9wcy5lbnZpcm9ubWVudCwgJ3RvZ2dsZScpLm5hbWUoJ1RvZ2dsZSBFbnZpcm9ubWVudCcpXG5cbiAgaWYgKGZvZ0VuYWJsZWQpIHtcbiAgICBjb25zdCBmb2dDb2xvciA9IG5ldyBUSFJFRS5Db2xvcigweGZmZmZmZilcbiAgICBjb25zdCBmb2cgPSBuZXcgVEhSRUUuRm9nKGZvZ0NvbG9yLCAxLCAyMClcbiAgICBzY2VuZS5mb2cgPSBmb2dcbiAgICBjb25zdCBmb2dQcm9wcyA9IGZvZ1Byb3BlcnRpZXMoZm9nKVxuICAgIGNvbnN0IGZvZ0NvbnRyb2xzID0gc2NlbmVDb250cm9scy5hZGRGb2xkZXIoJ0ZvZycpXG4gICAgZm9nQ29udHJvbHMuYWRkQ29sb3IoZm9nUHJvcHMsICdjb2xvcicpXG4gICAgZm9nQ29udHJvbHMuYWRkKGZvZ1Byb3BzLCAnbmVhcicsIDAsIDEwLCAwLjEpXG4gICAgZm9nQ29udHJvbHMuYWRkKGZvZ1Byb3BzLCAnZmFyJywgMCwgMTAwLCAwLjEpXG5cbiAgICBmb2dDb250cm9scy5vbkNoYW5nZSgoKSA9PiB7XG4gICAgICBmb2cuY29sb3IgPSBmb2dDb2xvci5zZXRIZXgoZm9nUHJvcHMuY29sb3IpXG4gICAgICBmb2cubmVhciA9IGZvZ1Byb3BzLm5lYXJcbiAgICAgIGZvZy5mYXIgPSBmb2dQcm9wcy5mYXJcbiAgICB9KVxuICB9XG5cbiAgaXNPcGVuID8gc2NlbmVDb250cm9scy5vcGVuKCkgOiBzY2VuZUNvbnRyb2xzLmNsb3NlKClcbn1cblxuY29uc3QgaGFuZGxlQmFja2dyb3VuZENoYW5nZSA9IChzZXR0aW5nLCBzY2VuZSkgPT4ge1xuICBzd2l0Y2ggKHNldHRpbmcpIHtcbiAgICBjYXNlICdXaGl0ZSc6XG4gICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbmV3IFRIUkVFLkNvbG9yKDB4ZmZmZmZmKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdCbGFjayc6XG4gICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbmV3IFRIUkVFLkNvbG9yKDB4MDAwMDAwKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdOdWxsJzpcbiAgICAgIHNjZW5lLmJhY2tncm91bmQgPSBudWxsXG4gICAgICBicmVha1xuICAgIGNhc2UgJ0NvbG9yJzpcbiAgICAgIHNjZW5lLmJhY2tncm91bmQgPSBuZXcgVEhSRUUuQ29sb3IoMHg0NGZmNDQpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ1RleHR1cmUnOlxuICAgICAgdGV4dHVyZUxvYWRlci5sb2FkKCcvYXNzZXRzL3RleHR1cmVzL3dvb2QvYWJzdHJhY3QtYW50aXF1ZS1iYWNrZHJvcC0xNjQwMDUuanBnJywgKGxvYWRlZCkgPT4ge1xuICAgICAgICBsb2FkZWQuZW5jb2RpbmcgPSBUSFJFRS5zUkdCRW5jb2RpbmdcbiAgICAgICAgc2NlbmUuYmFja2dyb3VuZCA9IGxvYWRlZFxuICAgICAgICBzY2VuZS5lbnZpcm9ubWVudCA9IG51bGxcbiAgICAgIH0pXG4gICAgICBicmVha1xuICAgIGNhc2UgJ0N1YmVtYXAnOlxuICAgICAgdGV4dHVyZUxvYWRlci5sb2FkKCcvYXNzZXRzL2VxdWkuanBlZycsIChsb2FkZWQpID0+IHtcbiAgICAgICAgbG9hZGVkLm1hcHBpbmcgPSBUSFJFRS5FcXVpcmVjdGFuZ3VsYXJSZWZsZWN0aW9uTWFwcGluZ1xuICAgICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbG9hZGVkXG4gICAgICAgIHNjZW5lLmVudmlyb25tZW50ID0gbG9hZGVkXG4gICAgICB9KVxuXG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICBicmVha1xuICB9XG59XG4iLCJpbXBvcnQge1xuXHRCdWZmZXJHZW9tZXRyeSxcblx0RmxvYXQzMkJ1ZmZlckF0dHJpYnV0ZSxcblx0TGluZVNlZ21lbnRzLFxuXHRMaW5lQmFzaWNNYXRlcmlhbCxcblx0TWF0cml4Myxcblx0VmVjdG9yM1xufSBmcm9tICd0aHJlZSc7XG5cbmNvbnN0IF92MSA9IG5ldyBWZWN0b3IzKCk7XG5jb25zdCBfdjIgPSBuZXcgVmVjdG9yMygpO1xuY29uc3QgX25vcm1hbE1hdHJpeCA9IG5ldyBNYXRyaXgzKCk7XG5cbmNsYXNzIFZlcnRleE5vcm1hbHNIZWxwZXIgZXh0ZW5kcyBMaW5lU2VnbWVudHMge1xuXG5cdGNvbnN0cnVjdG9yKCBvYmplY3QsIHNpemUgPSAxLCBjb2xvciA9IDB4ZmYwMDAwICkge1xuXG5cdFx0Y29uc3QgZ2VvbWV0cnkgPSBuZXcgQnVmZmVyR2VvbWV0cnkoKTtcblxuXHRcdGNvbnN0IG5Ob3JtYWxzID0gb2JqZWN0Lmdlb21ldHJ5LmF0dHJpYnV0ZXMubm9ybWFsLmNvdW50O1xuXHRcdGNvbnN0IHBvc2l0aW9ucyA9IG5ldyBGbG9hdDMyQnVmZmVyQXR0cmlidXRlKCBuTm9ybWFscyAqIDIgKiAzLCAzICk7XG5cblx0XHRnZW9tZXRyeS5zZXRBdHRyaWJ1dGUoICdwb3NpdGlvbicsIHBvc2l0aW9ucyApO1xuXG5cdFx0c3VwZXIoIGdlb21ldHJ5LCBuZXcgTGluZUJhc2ljTWF0ZXJpYWwoIHsgY29sb3IsIHRvbmVNYXBwZWQ6IGZhbHNlIH0gKSApO1xuXG5cdFx0dGhpcy5vYmplY3QgPSBvYmplY3Q7XG5cdFx0dGhpcy5zaXplID0gc2l6ZTtcblx0XHR0aGlzLnR5cGUgPSAnVmVydGV4Tm9ybWFsc0hlbHBlcic7XG5cblx0XHQvL1xuXG5cdFx0dGhpcy5tYXRyaXhBdXRvVXBkYXRlID0gZmFsc2U7XG5cblx0XHR0aGlzLnVwZGF0ZSgpO1xuXG5cdH1cblxuXHR1cGRhdGUoKSB7XG5cblx0XHR0aGlzLm9iamVjdC51cGRhdGVNYXRyaXhXb3JsZCggdHJ1ZSApO1xuXG5cdFx0X25vcm1hbE1hdHJpeC5nZXROb3JtYWxNYXRyaXgoIHRoaXMub2JqZWN0Lm1hdHJpeFdvcmxkICk7XG5cblx0XHRjb25zdCBtYXRyaXhXb3JsZCA9IHRoaXMub2JqZWN0Lm1hdHJpeFdvcmxkO1xuXG5cdFx0Y29uc3QgcG9zaXRpb24gPSB0aGlzLmdlb21ldHJ5LmF0dHJpYnV0ZXMucG9zaXRpb247XG5cblx0XHQvL1xuXG5cdFx0Y29uc3Qgb2JqR2VvbWV0cnkgPSB0aGlzLm9iamVjdC5nZW9tZXRyeTtcblxuXHRcdGlmICggb2JqR2VvbWV0cnkgKSB7XG5cblx0XHRcdGNvbnN0IG9ialBvcyA9IG9iakdlb21ldHJ5LmF0dHJpYnV0ZXMucG9zaXRpb247XG5cblx0XHRcdGNvbnN0IG9iak5vcm0gPSBvYmpHZW9tZXRyeS5hdHRyaWJ1dGVzLm5vcm1hbDtcblxuXHRcdFx0bGV0IGlkeCA9IDA7XG5cblx0XHRcdC8vIGZvciBzaW1wbGljaXR5LCBpZ25vcmUgaW5kZXggYW5kIGRyYXdjYWxscywgYW5kIHJlbmRlciBldmVyeSBub3JtYWxcblxuXHRcdFx0Zm9yICggbGV0IGogPSAwLCBqbCA9IG9ialBvcy5jb3VudDsgaiA8IGpsOyBqICsrICkge1xuXG5cdFx0XHRcdF92MS5mcm9tQnVmZmVyQXR0cmlidXRlKCBvYmpQb3MsIGogKS5hcHBseU1hdHJpeDQoIG1hdHJpeFdvcmxkICk7XG5cblx0XHRcdFx0X3YyLmZyb21CdWZmZXJBdHRyaWJ1dGUoIG9iak5vcm0sIGogKTtcblxuXHRcdFx0XHRfdjIuYXBwbHlNYXRyaXgzKCBfbm9ybWFsTWF0cml4ICkubm9ybWFsaXplKCkubXVsdGlwbHlTY2FsYXIoIHRoaXMuc2l6ZSApLmFkZCggX3YxICk7XG5cblx0XHRcdFx0cG9zaXRpb24uc2V0WFlaKCBpZHgsIF92MS54LCBfdjEueSwgX3YxLnogKTtcblxuXHRcdFx0XHRpZHggPSBpZHggKyAxO1xuXG5cdFx0XHRcdHBvc2l0aW9uLnNldFhZWiggaWR4LCBfdjIueCwgX3YyLnksIF92Mi56ICk7XG5cblx0XHRcdFx0aWR4ID0gaWR4ICsgMTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0cG9zaXRpb24ubmVlZHNVcGRhdGUgPSB0cnVlO1xuXG5cdH1cblxufVxuXG5cbmV4cG9ydCB7IFZlcnRleE5vcm1hbHNIZWxwZXIgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwicG9pbnRzXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2x0anNfZm91cnRoXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2x0anNfZm91cnRoXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9idWlsZF90aHJlZV9tb2R1bGVfanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9jb250cm9sc19PcmJpdENvbnRyb2xzX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc19saWwtZ3VpX2Rpc3RfbGlsLWd1aV9lc21fanNcIixcInNhbXBsZXNfYm9vdHN0cmFwX2Jvb3RzdHJhcF9qcy1zYW1wbGVzX2NvbnRyb2xzX21hdGVyaWFsLWNvbnRyb2xzX2pzLXNhbXBsZXNfY29udHJvbHNfcmVuZGVyZS1jODdkOGFcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItNy9wb2ludHMuanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
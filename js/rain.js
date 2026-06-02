/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./samples/chapters/chapter-7/rain.js"
/*!********************************************!*\
  !*** ./samples/chapters/chapter-7/rain.js ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_standard_scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/standard-scene */ "./samples/chapters/chapter-7/util/standard-scene.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");



const count = 25000
const range = 20
const createPoints = () => {
  const points = []
  for (let i = 0; i < count; i++) {
    let particle = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(
      Math.random() * range - range / 2,
      Math.random() * range - range / 2,
      Math.random() * range - range / 1.5
    )

    points.push(particle)
  }

  const velocityArray = new Float32Array(count * 2)
  for (let i = 0; i < count * 2; i += 2) {
    velocityArray[i] = ((Math.random() - 0.5) / 5) * 0.1
    velocityArray[i + 1] = (Math.random() / 5) * 0.1 + 0.01
  }

  const geom = new three__WEBPACK_IMPORTED_MODULE_1__.BufferGeometry().setFromPoints(points)
  geom.setAttribute('velocity', new three__WEBPACK_IMPORTED_MODULE_1__.BufferAttribute(velocityArray, 2))
  return geom
}

const texture = new three__WEBPACK_IMPORTED_MODULE_1__.TextureLoader().load('/assets/textures/particles/raindrop-3t.png')

;(0,_util_standard_scene__WEBPACK_IMPORTED_MODULE_0__.bootstrapGeometryScene)({
  backgroundColor: 0x000000,
  geometry: createPoints(),
  provideGui: () => {},
  material: new three__WEBPACK_IMPORTED_MODULE_1__.PointsMaterial({
    size: 0.1,
    vertexColors: false,
    color: 0xffffff,
    map: texture,
    transparent: true,
    opacity: 0.8,
    alphaTest: 0.01
  }),
  hidefloor: true,
  onRender: (points) => {
    const positionArray = points.geometry.attributes.position.array
    const velocityArray = points.geometry.attributes.velocity.array

    for (let i = 0; i < points.geometry.attributes.position.count; i++) {
      const velocityX = velocityArray[i * 2]
      const velocityY = velocityArray[i * 2 + 1]

      positionArray[i * 3] += velocityX
      positionArray[i * 3 + 1] -= velocityY

      if (positionArray[i * 3] <= -(range / 2) || positionArray[i * 3] >= range / 2)
        positionArray[i * 3] = positionArray[i * 3] * -1
      if (positionArray[i * 3 + 1] <= -(range / 2) || positionArray[i * 3 + 1] >= range / 2)
        positionArray[i * 3 + 1] = positionArray[i * 3 + 1] * -1
    }
    points.geometry.attributes.position.needsUpdate = true
  }
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
/******/ 			"rain": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","samples_bootstrap_bootstrap_js-samples_controls_material-controls_js-samples_controls_rendere-c87d8a"], () => (__webpack_require__("./samples/chapters/chapter-7/rain.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0E7V0FDQSw0Rzs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTcvcmFpbi5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci03L3V0aWwvc3RhbmRhcmQtc2NlbmUuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NvbnRyb2xzL3NjZW5lLWNvbnRyb2xzLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vbm9kZV9tb2R1bGVzL3RocmVlL2V4YW1wbGVzL2pzbS9oZWxwZXJzL1ZlcnRleE5vcm1hbHNIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBib290c3RyYXBHZW9tZXRyeVNjZW5lIH0gZnJvbSAnLi91dGlsL3N0YW5kYXJkLXNjZW5lJ1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5cbmNvbnN0IGNvdW50ID0gMjUwMDBcbmNvbnN0IHJhbmdlID0gMjBcbmNvbnN0IGNyZWF0ZVBvaW50cyA9ICgpID0+IHtcbiAgY29uc3QgcG9pbnRzID0gW11cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgbGV0IHBhcnRpY2xlID0gbmV3IFRIUkVFLlZlY3RvcjMoXG4gICAgICBNYXRoLnJhbmRvbSgpICogcmFuZ2UgLSByYW5nZSAvIDIsXG4gICAgICBNYXRoLnJhbmRvbSgpICogcmFuZ2UgLSByYW5nZSAvIDIsXG4gICAgICBNYXRoLnJhbmRvbSgpICogcmFuZ2UgLSByYW5nZSAvIDEuNVxuICAgIClcblxuICAgIHBvaW50cy5wdXNoKHBhcnRpY2xlKVxuICB9XG5cbiAgY29uc3QgdmVsb2NpdHlBcnJheSA9IG5ldyBGbG9hdDMyQXJyYXkoY291bnQgKiAyKVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50ICogMjsgaSArPSAyKSB7XG4gICAgdmVsb2NpdHlBcnJheVtpXSA9ICgoTWF0aC5yYW5kb20oKSAtIDAuNSkgLyA1KSAqIDAuMVxuICAgIHZlbG9jaXR5QXJyYXlbaSArIDFdID0gKE1hdGgucmFuZG9tKCkgLyA1KSAqIDAuMSArIDAuMDFcbiAgfVxuXG4gIGNvbnN0IGdlb20gPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKS5zZXRGcm9tUG9pbnRzKHBvaW50cylcbiAgZ2VvbS5zZXRBdHRyaWJ1dGUoJ3ZlbG9jaXR5JywgbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZSh2ZWxvY2l0eUFycmF5LCAyKSlcbiAgcmV0dXJuIGdlb21cbn1cblxuY29uc3QgdGV4dHVyZSA9IG5ldyBUSFJFRS5UZXh0dXJlTG9hZGVyKCkubG9hZCgnL2Fzc2V0cy90ZXh0dXJlcy9wYXJ0aWNsZXMvcmFpbmRyb3AtM3QucG5nJylcblxuYm9vdHN0cmFwR2VvbWV0cnlTY2VuZSh7XG4gIGJhY2tncm91bmRDb2xvcjogMHgwMDAwMDAsXG4gIGdlb21ldHJ5OiBjcmVhdGVQb2ludHMoKSxcbiAgcHJvdmlkZUd1aTogKCkgPT4ge30sXG4gIG1hdGVyaWFsOiBuZXcgVEhSRUUuUG9pbnRzTWF0ZXJpYWwoe1xuICAgIHNpemU6IDAuMSxcbiAgICB2ZXJ0ZXhDb2xvcnM6IGZhbHNlLFxuICAgIGNvbG9yOiAweGZmZmZmZixcbiAgICBtYXA6IHRleHR1cmUsXG4gICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgb3BhY2l0eTogMC44LFxuICAgIGFscGhhVGVzdDogMC4wMVxuICB9KSxcbiAgaGlkZWZsb29yOiB0cnVlLFxuICBvblJlbmRlcjogKHBvaW50cykgPT4ge1xuICAgIGNvbnN0IHBvc2l0aW9uQXJyYXkgPSBwb2ludHMuZ2VvbWV0cnkuYXR0cmlidXRlcy5wb3NpdGlvbi5hcnJheVxuICAgIGNvbnN0IHZlbG9jaXR5QXJyYXkgPSBwb2ludHMuZ2VvbWV0cnkuYXR0cmlidXRlcy52ZWxvY2l0eS5hcnJheVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb2ludHMuZ2VvbWV0cnkuYXR0cmlidXRlcy5wb3NpdGlvbi5jb3VudDsgaSsrKSB7XG4gICAgICBjb25zdCB2ZWxvY2l0eVggPSB2ZWxvY2l0eUFycmF5W2kgKiAyXVxuICAgICAgY29uc3QgdmVsb2NpdHlZID0gdmVsb2NpdHlBcnJheVtpICogMiArIDFdXG5cbiAgICAgIHBvc2l0aW9uQXJyYXlbaSAqIDNdICs9IHZlbG9jaXR5WFxuICAgICAgcG9zaXRpb25BcnJheVtpICogMyArIDFdIC09IHZlbG9jaXR5WVxuXG4gICAgICBpZiAocG9zaXRpb25BcnJheVtpICogM10gPD0gLShyYW5nZSAvIDIpIHx8IHBvc2l0aW9uQXJyYXlbaSAqIDNdID49IHJhbmdlIC8gMilcbiAgICAgICAgcG9zaXRpb25BcnJheVtpICogM10gPSBwb3NpdGlvbkFycmF5W2kgKiAzXSAqIC0xXG4gICAgICBpZiAocG9zaXRpb25BcnJheVtpICogMyArIDFdIDw9IC0ocmFuZ2UgLyAyKSB8fCBwb3NpdGlvbkFycmF5W2kgKiAzICsgMV0gPj0gcmFuZ2UgLyAyKVxuICAgICAgICBwb3NpdGlvbkFycmF5W2kgKiAzICsgMV0gPSBwb3NpdGlvbkFycmF5W2kgKiAzICsgMV0gKiAtMVxuICAgIH1cbiAgICBwb2ludHMuZ2VvbWV0cnkuYXR0cmlidXRlcy5wb3NpdGlvbi5uZWVkc1VwZGF0ZSA9IHRydWVcbiAgfVxufSkudGhlbigpXG4iLCJpbXBvcnQgeyBpbml0U2NlbmUgfSBmcm9tICcuLi8uLi8uLi9ib290c3RyYXAvYm9vdHN0cmFwJ1xuaW1wb3J0IHsgaW50aWFsaXplUmVuZGVyZXJDb250cm9scyB9IGZyb20gJy4uLy4uLy4uL2NvbnRyb2xzL3JlbmRlcmVyLWNvbnRyb2wnXG5cbmltcG9ydCBHVUkgZnJvbSAnbGlsLWd1aSdcbmltcG9ydCB7IGluaXRpYWxpemVTY2VuZUNvbnRyb2xzIH0gZnJvbSAnLi4vLi4vLi4vY29udHJvbHMvc2NlbmUtY29udHJvbHMnXG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcbmltcG9ydCB7XG4gIGluaXRpYWxpemVHdWlNYXRlcmlhbCxcbiAgaW5pdGlhbGl6ZVBvaW50c01hdGVyaWFsLFxuICBpbml0aWFsaXplU3ByaXRlTWF0ZXJpYWxcbn0gZnJvbSAnLi4vLi4vLi4vY29udHJvbHMvbWF0ZXJpYWwtY29udHJvbHMnXG5cbmV4cG9ydCBjb25zdCBib290c3RyYXBHZW9tZXRyeVNjZW5lID0gYXN5bmMgKHtcbiAgZ2VvbWV0cnksXG4gIHByb3ZpZGVHdWksXG4gIG1hdGVyaWFsLFxuICBpc1Nwcml0ZSxcbiAgc3ByaXRlUG9zaXRpb24sXG4gIG9uUmVuZGVyLFxuICBwcm92aWRlTWVzaCxcbiAgYmFja2dyb3VuZENvbG9yXG59KSA9PiB7XG4gIGNvbnN0IHByb3BzID0ge1xuICAgIGJhY2tncm91bmRDb2xvcjogYmFja2dyb3VuZENvbG9yID8/IDB4ZmZmZmZmLFxuICAgIGZvZ0NvbG9yOiAweGZmZmZmZlxuICB9XG5cbiAgY29uc3QgZ3VpID0gbmV3IEdVSSgpXG4gIGNvbnN0IHBvaW50cyA9IHByb3ZpZGVNZXNoXG4gICAgPyBwcm92aWRlTWVzaChnZW9tZXRyeSlcbiAgICA6IGlzU3ByaXRlXG4gICAgPyBuZXcgVEhSRUUuU3ByaXRlKG1hdGVyaWFsKVxuICAgIDogbmV3IFRIUkVFLlBvaW50cyhnZW9tZXRyeSwgbWF0ZXJpYWwpXG5cbiAgaWYgKHNwcml0ZVBvc2l0aW9uKSBwb2ludHMucG9zaXRpb24uY29weShzcHJpdGVQb3NpdGlvbilcblxuICBjb25zdCBpbml0ID0gYXN5bmMgKCkgPT4ge1xuICAgIGluaXRTY2VuZShwcm9wcykoKHsgc2NlbmUsIGNhbWVyYSwgcmVuZGVyZXIsIG9yYml0Q29udHJvbHMgfSkgPT4ge1xuICAgICAgcmVuZGVyZXIuc2hhZG93TWFwLnR5cGUgPSBUSFJFRS5QQ0ZTb2Z0U2hhZG93TWFwXG4gICAgICBjYW1lcmEucG9zaXRpb24ueCA9IC0zXG4gICAgICBjYW1lcmEucG9zaXRpb24ueiA9IDhcbiAgICAgIGNhbWVyYS5wb3NpdGlvbi55ID0gMlxuICAgICAgb3JiaXRDb250cm9scy51cGRhdGUoKVxuXG4gICAgICBmdW5jdGlvbiBhbmltYXRlKCkge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSlcbiAgICAgICAgcmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEpXG4gICAgICAgIG9yYml0Q29udHJvbHMudXBkYXRlKClcbiAgICAgICAgaWYgKG9uUmVuZGVyKSBvblJlbmRlcihwb2ludHMpXG4gICAgICB9XG5cbiAgICAgIGFuaW1hdGUoKVxuXG4gICAgICBzY2VuZS5hZGQocG9pbnRzKVxuICAgICAgaW50aWFsaXplUmVuZGVyZXJDb250cm9scyhndWksIHJlbmRlcmVyKVxuICAgICAgaW5pdGlhbGl6ZVNjZW5lQ29udHJvbHMoZ3VpLCBzY2VuZSwgZmFsc2UpXG4gICAgICBpZiAobWF0ZXJpYWwpIGluaXRpYWxpemVHdWlNYXRlcmlhbChndWksIHNjZW5lLCBtYXRlcmlhbClcbiAgICAgIGlmIChtYXRlcmlhbClcbiAgICAgICAgaXNTcHJpdGUgPyBpbml0aWFsaXplU3ByaXRlTWF0ZXJpYWwoZ3VpLCBzY2VuZSwgbWF0ZXJpYWwpIDogaW5pdGlhbGl6ZVBvaW50c01hdGVyaWFsKGd1aSwgc2NlbmUsIG1hdGVyaWFsKVxuICAgICAgcHJvdmlkZUd1aShndWksIHBvaW50cywgc2NlbmUpXG4gICAgfSlcbiAgfVxuXG4gIGluaXQoKS50aGVuKClcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuXG5jb25zdCB0ZXh0dXJlTG9hZGVyID0gbmV3IFRIUkVFLlRleHR1cmVMb2FkZXIoKVxuXG5jb25zdCBwcm9wZXJ0aWVzT2JqZWN0ID0gKHNjZW5lKSA9PiAoe1xuICBvdmVycmlkZU1hdGVyaWFsOiB7XG4gICAgdG9nZ2xlOiAoKSA9PiB7XG4gICAgICBpZiAoc2NlbmUub3ZlcnJpZGVNYXRlcmlhbCAhPT0gbnVsbCkge1xuICAgICAgICBzY2VuZS5vdmVycmlkZU1hdGVyaWFsID0gbnVsbFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2NlbmUub3ZlcnJpZGVNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTm9ybWFsTWF0ZXJpYWwoKVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgYmFja0dyb3VuZDogJ1doaXRlJyxcbiAgZW52aXJvbm1lbnQ6IHtcbiAgICB0b2dnbGU6ICgpID0+IHtcbiAgICAgIGlmIChzY2VuZS5lbnZpcm9ubWVudCAhPT0gbnVsbCkge1xuICAgICAgICBzY2VuZS5lbnZpcm9ubWVudCA9IG51bGxcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRleHR1cmVMb2FkZXIubG9hZCgnL2Fzc2V0cy9lcXVpLmpwZWcnLCAobG9hZGVkKSA9PiB7XG4gICAgICAgICAgbG9hZGVkLm1hcHBpbmcgPSBUSFJFRS5FcXVpcmVjdGFuZ3VsYXJSZWZsZWN0aW9uTWFwcGluZ1xuICAgICAgICAgIHNjZW5lLmVudmlyb25tZW50ID0gbG9hZGVkXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuXG5jb25zdCBmb2dQcm9wZXJ0aWVzID0gKGZvZykgPT4gKHtcbiAgY29sb3I6IDB4ZmZmZmZmLFxuICBuZWFyOiBmb2cubmVhcixcbiAgZmFyOiBmb2cuZmFyXG59KVxuXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZVNjZW5lQ29udHJvbHMgPSAoZ3VpLCBzY2VuZSwgZm9nRW5hYmxlZCwgaXNPcGVuKSA9PiB7XG4gIGNvbnN0IHByb3BzID0gcHJvcGVydGllc09iamVjdChzY2VuZSlcbiAgY29uc3Qgc2NlbmVDb250cm9scyA9IGd1aS5hZGRGb2xkZXIoJ1NjZW5lJylcblxuICBzY2VuZUNvbnRyb2xzXG4gICAgLmFkZChwcm9wcywgJ2JhY2tHcm91bmQnLCBbJ1doaXRlJywgJ0JsYWNrJywgJ051bGwnLCAnQ29sb3InLCAnVGV4dHVyZScsICdDdWJlbWFwJ10pXG4gICAgLm9uQ2hhbmdlKChldmVudCkgPT4gaGFuZGxlQmFja2dyb3VuZENoYW5nZShldmVudCwgc2NlbmUpKVxuICBzY2VuZUNvbnRyb2xzLmFkZChwcm9wcy5vdmVycmlkZU1hdGVyaWFsLCAndG9nZ2xlJykubmFtZSgnVG9nZ2xlIE92ZXJyaWRlIE1hdGVyaWFsJylcbiAgc2NlbmVDb250cm9scy5hZGQocHJvcHMuZW52aXJvbm1lbnQsICd0b2dnbGUnKS5uYW1lKCdUb2dnbGUgRW52aXJvbm1lbnQnKVxuXG4gIGlmIChmb2dFbmFibGVkKSB7XG4gICAgY29uc3QgZm9nQ29sb3IgPSBuZXcgVEhSRUUuQ29sb3IoMHhmZmZmZmYpXG4gICAgY29uc3QgZm9nID0gbmV3IFRIUkVFLkZvZyhmb2dDb2xvciwgMSwgMjApXG4gICAgc2NlbmUuZm9nID0gZm9nXG4gICAgY29uc3QgZm9nUHJvcHMgPSBmb2dQcm9wZXJ0aWVzKGZvZylcbiAgICBjb25zdCBmb2dDb250cm9scyA9IHNjZW5lQ29udHJvbHMuYWRkRm9sZGVyKCdGb2cnKVxuICAgIGZvZ0NvbnRyb2xzLmFkZENvbG9yKGZvZ1Byb3BzLCAnY29sb3InKVxuICAgIGZvZ0NvbnRyb2xzLmFkZChmb2dQcm9wcywgJ25lYXInLCAwLCAxMCwgMC4xKVxuICAgIGZvZ0NvbnRyb2xzLmFkZChmb2dQcm9wcywgJ2ZhcicsIDAsIDEwMCwgMC4xKVxuXG4gICAgZm9nQ29udHJvbHMub25DaGFuZ2UoKCkgPT4ge1xuICAgICAgZm9nLmNvbG9yID0gZm9nQ29sb3Iuc2V0SGV4KGZvZ1Byb3BzLmNvbG9yKVxuICAgICAgZm9nLm5lYXIgPSBmb2dQcm9wcy5uZWFyXG4gICAgICBmb2cuZmFyID0gZm9nUHJvcHMuZmFyXG4gICAgfSlcbiAgfVxuXG4gIGlzT3BlbiA/IHNjZW5lQ29udHJvbHMub3BlbigpIDogc2NlbmVDb250cm9scy5jbG9zZSgpXG59XG5cbmNvbnN0IGhhbmRsZUJhY2tncm91bmRDaGFuZ2UgPSAoc2V0dGluZywgc2NlbmUpID0+IHtcbiAgc3dpdGNoIChzZXR0aW5nKSB7XG4gICAgY2FzZSAnV2hpdGUnOlxuICAgICAgc2NlbmUuYmFja2dyb3VuZCA9IG5ldyBUSFJFRS5Db2xvcigweGZmZmZmZilcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnQmxhY2snOlxuICAgICAgc2NlbmUuYmFja2dyb3VuZCA9IG5ldyBUSFJFRS5Db2xvcigweDAwMDAwMClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnTnVsbCc6XG4gICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbnVsbFxuICAgICAgYnJlYWtcbiAgICBjYXNlICdDb2xvcic6XG4gICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbmV3IFRIUkVFLkNvbG9yKDB4NDRmZjQ0KVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdUZXh0dXJlJzpcbiAgICAgIHRleHR1cmVMb2FkZXIubG9hZCgnL2Fzc2V0cy90ZXh0dXJlcy93b29kL2Fic3RyYWN0LWFudGlxdWUtYmFja2Ryb3AtMTY0MDA1LmpwZycsIChsb2FkZWQpID0+IHtcbiAgICAgICAgbG9hZGVkLmVuY29kaW5nID0gVEhSRUUuc1JHQkVuY29kaW5nXG4gICAgICAgIHNjZW5lLmJhY2tncm91bmQgPSBsb2FkZWRcbiAgICAgICAgc2NlbmUuZW52aXJvbm1lbnQgPSBudWxsXG4gICAgICB9KVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdDdWJlbWFwJzpcbiAgICAgIHRleHR1cmVMb2FkZXIubG9hZCgnL2Fzc2V0cy9lcXVpLmpwZWcnLCAobG9hZGVkKSA9PiB7XG4gICAgICAgIGxvYWRlZC5tYXBwaW5nID0gVEhSRUUuRXF1aXJlY3Rhbmd1bGFyUmVmbGVjdGlvbk1hcHBpbmdcbiAgICAgICAgc2NlbmUuYmFja2dyb3VuZCA9IGxvYWRlZFxuICAgICAgICBzY2VuZS5lbnZpcm9ubWVudCA9IGxvYWRlZFxuICAgICAgfSlcblxuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgYnJlYWtcbiAgfVxufVxuIiwiaW1wb3J0IHtcblx0QnVmZmVyR2VvbWV0cnksXG5cdEZsb2F0MzJCdWZmZXJBdHRyaWJ1dGUsXG5cdExpbmVTZWdtZW50cyxcblx0TGluZUJhc2ljTWF0ZXJpYWwsXG5cdE1hdHJpeDMsXG5cdFZlY3RvcjNcbn0gZnJvbSAndGhyZWUnO1xuXG5jb25zdCBfdjEgPSBuZXcgVmVjdG9yMygpO1xuY29uc3QgX3YyID0gbmV3IFZlY3RvcjMoKTtcbmNvbnN0IF9ub3JtYWxNYXRyaXggPSBuZXcgTWF0cml4MygpO1xuXG5jbGFzcyBWZXJ0ZXhOb3JtYWxzSGVscGVyIGV4dGVuZHMgTGluZVNlZ21lbnRzIHtcblxuXHRjb25zdHJ1Y3Rvciggb2JqZWN0LCBzaXplID0gMSwgY29sb3IgPSAweGZmMDAwMCApIHtcblxuXHRcdGNvbnN0IGdlb21ldHJ5ID0gbmV3IEJ1ZmZlckdlb21ldHJ5KCk7XG5cblx0XHRjb25zdCBuTm9ybWFscyA9IG9iamVjdC5nZW9tZXRyeS5hdHRyaWJ1dGVzLm5vcm1hbC5jb3VudDtcblx0XHRjb25zdCBwb3NpdGlvbnMgPSBuZXcgRmxvYXQzMkJ1ZmZlckF0dHJpYnV0ZSggbk5vcm1hbHMgKiAyICogMywgMyApO1xuXG5cdFx0Z2VvbWV0cnkuc2V0QXR0cmlidXRlKCAncG9zaXRpb24nLCBwb3NpdGlvbnMgKTtcblxuXHRcdHN1cGVyKCBnZW9tZXRyeSwgbmV3IExpbmVCYXNpY01hdGVyaWFsKCB7IGNvbG9yLCB0b25lTWFwcGVkOiBmYWxzZSB9ICkgKTtcblxuXHRcdHRoaXMub2JqZWN0ID0gb2JqZWN0O1xuXHRcdHRoaXMuc2l6ZSA9IHNpemU7XG5cdFx0dGhpcy50eXBlID0gJ1ZlcnRleE5vcm1hbHNIZWxwZXInO1xuXG5cdFx0Ly9cblxuXHRcdHRoaXMubWF0cml4QXV0b1VwZGF0ZSA9IGZhbHNlO1xuXG5cdFx0dGhpcy51cGRhdGUoKTtcblxuXHR9XG5cblx0dXBkYXRlKCkge1xuXG5cdFx0dGhpcy5vYmplY3QudXBkYXRlTWF0cml4V29ybGQoIHRydWUgKTtcblxuXHRcdF9ub3JtYWxNYXRyaXguZ2V0Tm9ybWFsTWF0cml4KCB0aGlzLm9iamVjdC5tYXRyaXhXb3JsZCApO1xuXG5cdFx0Y29uc3QgbWF0cml4V29ybGQgPSB0aGlzLm9iamVjdC5tYXRyaXhXb3JsZDtcblxuXHRcdGNvbnN0IHBvc2l0aW9uID0gdGhpcy5nZW9tZXRyeS5hdHRyaWJ1dGVzLnBvc2l0aW9uO1xuXG5cdFx0Ly9cblxuXHRcdGNvbnN0IG9iakdlb21ldHJ5ID0gdGhpcy5vYmplY3QuZ2VvbWV0cnk7XG5cblx0XHRpZiAoIG9iakdlb21ldHJ5ICkge1xuXG5cdFx0XHRjb25zdCBvYmpQb3MgPSBvYmpHZW9tZXRyeS5hdHRyaWJ1dGVzLnBvc2l0aW9uO1xuXG5cdFx0XHRjb25zdCBvYmpOb3JtID0gb2JqR2VvbWV0cnkuYXR0cmlidXRlcy5ub3JtYWw7XG5cblx0XHRcdGxldCBpZHggPSAwO1xuXG5cdFx0XHQvLyBmb3Igc2ltcGxpY2l0eSwgaWdub3JlIGluZGV4IGFuZCBkcmF3Y2FsbHMsIGFuZCByZW5kZXIgZXZlcnkgbm9ybWFsXG5cblx0XHRcdGZvciAoIGxldCBqID0gMCwgamwgPSBvYmpQb3MuY291bnQ7IGogPCBqbDsgaiArKyApIHtcblxuXHRcdFx0XHRfdjEuZnJvbUJ1ZmZlckF0dHJpYnV0ZSggb2JqUG9zLCBqICkuYXBwbHlNYXRyaXg0KCBtYXRyaXhXb3JsZCApO1xuXG5cdFx0XHRcdF92Mi5mcm9tQnVmZmVyQXR0cmlidXRlKCBvYmpOb3JtLCBqICk7XG5cblx0XHRcdFx0X3YyLmFwcGx5TWF0cml4MyggX25vcm1hbE1hdHJpeCApLm5vcm1hbGl6ZSgpLm11bHRpcGx5U2NhbGFyKCB0aGlzLnNpemUgKS5hZGQoIF92MSApO1xuXG5cdFx0XHRcdHBvc2l0aW9uLnNldFhZWiggaWR4LCBfdjEueCwgX3YxLnksIF92MS56ICk7XG5cblx0XHRcdFx0aWR4ID0gaWR4ICsgMTtcblxuXHRcdFx0XHRwb3NpdGlvbi5zZXRYWVooIGlkeCwgX3YyLngsIF92Mi55LCBfdjIueiApO1xuXG5cdFx0XHRcdGlkeCA9IGlkeCArIDE7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdHBvc2l0aW9uLm5lZWRzVXBkYXRlID0gdHJ1ZTtcblxuXHR9XG5cbn1cblxuXG5leHBvcnQgeyBWZXJ0ZXhOb3JtYWxzSGVscGVyIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcInJhaW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rbHRqc19mb3VydGhcIl0gPSBzZWxmW1wid2VicGFja0NodW5rbHRqc19mb3VydGhcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2J1aWxkX3RocmVlX21vZHVsZV9qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX2NvbnRyb2xzX09yYml0Q29udHJvbHNfanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX2xpbC1ndWlfZGlzdF9saWwtZ3VpX2VzbV9qc1wiLFwic2FtcGxlc19ib290c3RyYXBfYm9vdHN0cmFwX2pzLXNhbXBsZXNfY29udHJvbHNfbWF0ZXJpYWwtY29udHJvbHNfanMtc2FtcGxlc19jb250cm9sc19yZW5kZXJlLWM4N2Q4YVwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci03L3JhaW4uanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
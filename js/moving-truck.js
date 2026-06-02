/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./samples/moving-truck.js"
/*!*********************************!*\
  !*** ./samples/moving-truck.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _util_update_on_resize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/update-on-resize */ "./samples/util/update-on-resize.js");
/* harmony import */ var three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/loaders/GLTFLoader.js */ "./node_modules/three/examples/jsm/loaders/GLTFLoader.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");


// import { checkWebGL } from './util/webgl-check'




// checkWebGL()

const textureLoader = new three__WEBPACK_IMPORTED_MODULE_0__.TextureLoader()

const scene = new three__WEBPACK_IMPORTED_MODULE_0__.Scene()
scene.background = new three__WEBPACK_IMPORTED_MODULE_0__.Color(0x222244)
scene.fog = new three__WEBPACK_IMPORTED_MODULE_0__.Fog(0x222244, 50, 100)

const camera = new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderConfig = { antialias: true, alpha: true }
const renderer = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer(renderConfig)

renderer.shadowMap.enabled = true
// renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.shadowMap.type = three__WEBPACK_IMPORTED_MODULE_0__.VSMShadowMap
renderer.setClearColor(0x89bbff, 1)

const pmremGenerator = new three__WEBPACK_IMPORTED_MODULE_0__.PMREMGenerator(renderer)
// pmremGenerator.compileEquirectangularShader()

;(0,_util_update_on_resize__WEBPACK_IMPORTED_MODULE_1__.onResize)(camera, renderer)

const controls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_3__.OrbitControls(camera, renderer.domElement)

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)

camera.position.z = 10
camera.position.x = -3
camera.position.y = 5

addGroundPlane(scene)
addCar(scene)
addLighting(scene, camera)
controls.update()

function animate () {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}
animate()

function addGroundPlane (scene) {
  let pngCubeRenderTarget
  const planeGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.PlaneGeometry(200, 200)
  const planeMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.MeshStandardMaterial({
    color: 0x999999,
    // shininess: 0,
    // reflectivity: 0.1,
    roughness: 0.1,
    metalness: 0.5
  })

  textureLoader.load('./assets/equi.jpeg', textureEquirec => {
    // textureEquirec.mapping = THREE.EquirectangularReflectionMapping
    // textureEquirec.encoding = THREE.sRGBEncoding
    // scene.background = textureEquirec
    // planeMaterial.envMap = textureEquirec
    pngCubeRenderTarget = pmremGenerator.fromEquirectangular(textureEquirec)
    console.log(pngCubeRenderTarget)
    planeMaterial.envMap = pngCubeRenderTarget.texture
    planeMaterial.needsUpdate = true
    scene.background = pngCubeRenderTarget.texture
  })

  const ground = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(planeGeometry, planeMaterial)
  ground.rotation.x = -Math.PI / 2
  ground.position.y = -3.45
  ground.scale.multiplyScalar(3)
  ground.castShadow = false
  ground.receiveShadow = true
  scene.add(ground)
}

function addCar (scene) {
  const loader = new three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_2__.GLTFLoader()
  loader.load('./assets/blender-truck-groups.glb', loadedObject => {
    for (const child of loadedObject.scene.children) {
      child.receiveShadow = true
      child.castShadow = true
      switch (child.name) {
        case 'CarBody':

          child.material.metalness = 0.9
          child.material.roughnesss = 0.2

          console.log(child.material)
          console.log(child)
          break
        default:
          break
      }
    }
    scene.add(loadedObject.scene)
  })
}

// function traverseChildren (object, fn) {
//   if (object.children && object.children.length > 0) {
//     for (const child of object.children) {
//       traverseChildren(child, fn)
//     }
//   } else {
//     fn(object)
//   }
// }

// function setAllMaterialProps (object, fn) {
//   if (object.material) {
//     fn(object.material)
//   } else {
//     if (object.children) {
//       for (const child of object.children) {
//         setAllMaterialProps(child, fn)
//       }
//     }
//   }
// }

function addLighting (scene, camera) {
  // const directionalLight1 = new THREE.PointLight(0xffffff, 0.8)
  // directionalLight1.position.set(10, 10, 10)
  // directionalLight1.lookAt(camera.lookAt)
  // directionalLight1.castShadow = true
  // scene.add(directionalLight1)
  // const directionalLight2 = new DirectionalLight(0xffffff, 0.4)
  // directionalLight2.position.copy(new THREE.Vector3(camera.position.x * -1, camera.position.y, camera.position.z))
  // directionalLight2.lookAt(camera.lookAt)
  // scene.add(directionalLight2)
  // // const directionalLight3 = new DirectionalLight(0xffffff, 0.1)
  // // directionalLight3.position.copy(new THREE.Vector3(camera.position.x * -1, camera.position.y, camera.position.z * -1))
  // // directionalLight3.lookAt(camera.lookAt)
  // // scene.add(directionalLight3)
  // const hemiLight = new THREE.HemisphereLight(0x4882ff, 0x502718, 0.7)
  // scene.add(hemiLight)

  // https://threejs.org/examples/?q=shado#webgl_shadowmap_vsm
  // rather nice lights
  scene.add(new three__WEBPACK_IMPORTED_MODULE_0__.AmbientLight(0x666666))

  const spotLight = new three__WEBPACK_IMPORTED_MODULE_0__.SpotLight(0xff8888)
  spotLight.angle = Math.PI / 5
  spotLight.penumbra = 0.3
  spotLight.position.set(8, 10, 5)
  spotLight.castShadow = true
  spotLight.shadow.camera.near = 8
  spotLight.shadow.camera.far = 200
  spotLight.shadow.mapSize.width = 256
  spotLight.shadow.mapSize.height = 256
  spotLight.shadow.bias = -0.002
  spotLight.shadow.radius = 4
  scene.add(spotLight)

  const dirLight = new three__WEBPACK_IMPORTED_MODULE_0__.DirectionalLight(0x8888ff)
  dirLight.position.set(5, 10, 8)
  dirLight.castShadow = true
  dirLight.shadow.camera.near = 0.1
  dirLight.shadow.camera.far = 500
  dirLight.shadow.camera.right = 17
  dirLight.shadow.camera.left = -17
  dirLight.shadow.camera.top = 17
  dirLight.shadow.camera.bottom = -17
  dirLight.shadow.mapSize.width = 512
  dirLight.shadow.mapSize.height = 512
  dirLight.shadow.radius = 4
  dirLight.shadow.bias = -0.0005

  scene.add(dirLight)
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
/******/ 			"moving-truck": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_three_examples_jsm_loaders_GLTFLoader_js"], () => (__webpack_require__("./samples/moving-truck.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0EsNEc7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvbW92aW5nLXRydWNrLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy91dGlsL3VwZGF0ZS1vbi1yZXNpemUuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcbmltcG9ydCB7IG9uUmVzaXplIH0gZnJvbSAnLi91dGlsL3VwZGF0ZS1vbi1yZXNpemUnXG4vLyBpbXBvcnQgeyBjaGVja1dlYkdMIH0gZnJvbSAnLi91dGlsL3dlYmdsLWNoZWNrJ1xuaW1wb3J0IHsgQW1iaWVudExpZ2h0LCBCb3hHZW9tZXRyeSwgRGlyZWN0aW9uYWxMaWdodCwgT2JqZWN0M0QsIFBNUkVNR2VuZXJhdG9yLCBUZXh0dXJlTG9hZGVyIH0gZnJvbSAndGhyZWUnXG5pbXBvcnQgeyBHTFRGTG9hZGVyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvR0xURkxvYWRlci5qcydcbmltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vY29udHJvbHMvT3JiaXRDb250cm9scydcblxuLy8gY2hlY2tXZWJHTCgpXG5cbmNvbnN0IHRleHR1cmVMb2FkZXIgPSBuZXcgVEhSRUUuVGV4dHVyZUxvYWRlcigpXG5cbmNvbnN0IHNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKClcbnNjZW5lLmJhY2tncm91bmQgPSBuZXcgVEhSRUUuQ29sb3IoMHgyMjIyNDQpXG5zY2VuZS5mb2cgPSBuZXcgVEhSRUUuRm9nKDB4MjIyMjQ0LCA1MCwgMTAwKVxuXG5jb25zdCBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNzUsIHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0LCAwLjEsIDEwMDApXG5jb25zdCByZW5kZXJDb25maWcgPSB7IGFudGlhbGlhczogdHJ1ZSwgYWxwaGE6IHRydWUgfVxuY29uc3QgcmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcihyZW5kZXJDb25maWcpXG5cbnJlbmRlcmVyLnNoYWRvd01hcC5lbmFibGVkID0gdHJ1ZVxuLy8gcmVuZGVyZXIuc2hhZG93TWFwLnR5cGUgPSBUSFJFRS5QQ0ZTb2Z0U2hhZG93TWFwXG5yZW5kZXJlci5zaGFkb3dNYXAudHlwZSA9IFRIUkVFLlZTTVNoYWRvd01hcFxucmVuZGVyZXIuc2V0Q2xlYXJDb2xvcigweDg5YmJmZiwgMSlcblxuY29uc3QgcG1yZW1HZW5lcmF0b3IgPSBuZXcgVEhSRUUuUE1SRU1HZW5lcmF0b3IocmVuZGVyZXIpXG4vLyBwbXJlbUdlbmVyYXRvci5jb21waWxlRXF1aXJlY3Rhbmd1bGFyU2hhZGVyKClcblxub25SZXNpemUoY2FtZXJhLCByZW5kZXJlcilcblxuY29uc3QgY29udHJvbHMgPSBuZXcgT3JiaXRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLmRvbUVsZW1lbnQpXG5cbnJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodClcbnJlbmRlcmVyLnNldFBpeGVsUmF0aW8od2luZG93LmRldmljZVBpeGVsUmF0aW8pXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHJlbmRlcmVyLmRvbUVsZW1lbnQpXG5cbmNhbWVyYS5wb3NpdGlvbi56ID0gMTBcbmNhbWVyYS5wb3NpdGlvbi54ID0gLTNcbmNhbWVyYS5wb3NpdGlvbi55ID0gNVxuXG5hZGRHcm91bmRQbGFuZShzY2VuZSlcbmFkZENhcihzY2VuZSlcbmFkZExpZ2h0aW5nKHNjZW5lLCBjYW1lcmEpXG5jb250cm9scy51cGRhdGUoKVxuXG5mdW5jdGlvbiBhbmltYXRlICgpIHtcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpXG4gIGNvbnRyb2xzLnVwZGF0ZSgpXG4gIHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhKVxufVxuYW5pbWF0ZSgpXG5cbmZ1bmN0aW9uIGFkZEdyb3VuZFBsYW5lIChzY2VuZSkge1xuICBsZXQgcG5nQ3ViZVJlbmRlclRhcmdldFxuICBjb25zdCBwbGFuZUdlb21ldHJ5ID0gbmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkoMjAwLCAyMDApXG4gIGNvbnN0IHBsYW5lTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoe1xuICAgIGNvbG9yOiAweDk5OTk5OSxcbiAgICAvLyBzaGluaW5lc3M6IDAsXG4gICAgLy8gcmVmbGVjdGl2aXR5OiAwLjEsXG4gICAgcm91Z2huZXNzOiAwLjEsXG4gICAgbWV0YWxuZXNzOiAwLjVcbiAgfSlcblxuICB0ZXh0dXJlTG9hZGVyLmxvYWQoJy4vYXNzZXRzL2VxdWkuanBlZycsIHRleHR1cmVFcXVpcmVjID0+IHtcbiAgICAvLyB0ZXh0dXJlRXF1aXJlYy5tYXBwaW5nID0gVEhSRUUuRXF1aXJlY3Rhbmd1bGFyUmVmbGVjdGlvbk1hcHBpbmdcbiAgICAvLyB0ZXh0dXJlRXF1aXJlYy5lbmNvZGluZyA9IFRIUkVFLnNSR0JFbmNvZGluZ1xuICAgIC8vIHNjZW5lLmJhY2tncm91bmQgPSB0ZXh0dXJlRXF1aXJlY1xuICAgIC8vIHBsYW5lTWF0ZXJpYWwuZW52TWFwID0gdGV4dHVyZUVxdWlyZWNcbiAgICBwbmdDdWJlUmVuZGVyVGFyZ2V0ID0gcG1yZW1HZW5lcmF0b3IuZnJvbUVxdWlyZWN0YW5ndWxhcih0ZXh0dXJlRXF1aXJlYylcbiAgICBjb25zb2xlLmxvZyhwbmdDdWJlUmVuZGVyVGFyZ2V0KVxuICAgIHBsYW5lTWF0ZXJpYWwuZW52TWFwID0gcG5nQ3ViZVJlbmRlclRhcmdldC50ZXh0dXJlXG4gICAgcGxhbmVNYXRlcmlhbC5uZWVkc1VwZGF0ZSA9IHRydWVcbiAgICBzY2VuZS5iYWNrZ3JvdW5kID0gcG5nQ3ViZVJlbmRlclRhcmdldC50ZXh0dXJlXG4gIH0pXG5cbiAgY29uc3QgZ3JvdW5kID0gbmV3IFRIUkVFLk1lc2gocGxhbmVHZW9tZXRyeSwgcGxhbmVNYXRlcmlhbClcbiAgZ3JvdW5kLnJvdGF0aW9uLnggPSAtTWF0aC5QSSAvIDJcbiAgZ3JvdW5kLnBvc2l0aW9uLnkgPSAtMy40NVxuICBncm91bmQuc2NhbGUubXVsdGlwbHlTY2FsYXIoMylcbiAgZ3JvdW5kLmNhc3RTaGFkb3cgPSBmYWxzZVxuICBncm91bmQucmVjZWl2ZVNoYWRvdyA9IHRydWVcbiAgc2NlbmUuYWRkKGdyb3VuZClcbn1cblxuZnVuY3Rpb24gYWRkQ2FyIChzY2VuZSkge1xuICBjb25zdCBsb2FkZXIgPSBuZXcgR0xURkxvYWRlcigpXG4gIGxvYWRlci5sb2FkKCcuL2Fzc2V0cy9ibGVuZGVyLXRydWNrLWdyb3Vwcy5nbGInLCBsb2FkZWRPYmplY3QgPT4ge1xuICAgIGZvciAoY29uc3QgY2hpbGQgb2YgbG9hZGVkT2JqZWN0LnNjZW5lLmNoaWxkcmVuKSB7XG4gICAgICBjaGlsZC5yZWNlaXZlU2hhZG93ID0gdHJ1ZVxuICAgICAgY2hpbGQuY2FzdFNoYWRvdyA9IHRydWVcbiAgICAgIHN3aXRjaCAoY2hpbGQubmFtZSkge1xuICAgICAgICBjYXNlICdDYXJCb2R5JzpcblxuICAgICAgICAgIGNoaWxkLm1hdGVyaWFsLm1ldGFsbmVzcyA9IDAuOVxuICAgICAgICAgIGNoaWxkLm1hdGVyaWFsLnJvdWdobmVzc3MgPSAwLjJcblxuICAgICAgICAgIGNvbnNvbGUubG9nKGNoaWxkLm1hdGVyaWFsKVxuICAgICAgICAgIGNvbnNvbGUubG9nKGNoaWxkKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gICAgc2NlbmUuYWRkKGxvYWRlZE9iamVjdC5zY2VuZSlcbiAgfSlcbn1cblxuLy8gZnVuY3Rpb24gdHJhdmVyc2VDaGlsZHJlbiAob2JqZWN0LCBmbikge1xuLy8gICBpZiAob2JqZWN0LmNoaWxkcmVuICYmIG9iamVjdC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4vLyAgICAgZm9yIChjb25zdCBjaGlsZCBvZiBvYmplY3QuY2hpbGRyZW4pIHtcbi8vICAgICAgIHRyYXZlcnNlQ2hpbGRyZW4oY2hpbGQsIGZuKVxuLy8gICAgIH1cbi8vICAgfSBlbHNlIHtcbi8vICAgICBmbihvYmplY3QpXG4vLyAgIH1cbi8vIH1cblxuLy8gZnVuY3Rpb24gc2V0QWxsTWF0ZXJpYWxQcm9wcyAob2JqZWN0LCBmbikge1xuLy8gICBpZiAob2JqZWN0Lm1hdGVyaWFsKSB7XG4vLyAgICAgZm4ob2JqZWN0Lm1hdGVyaWFsKVxuLy8gICB9IGVsc2Uge1xuLy8gICAgIGlmIChvYmplY3QuY2hpbGRyZW4pIHtcbi8vICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2Ygb2JqZWN0LmNoaWxkcmVuKSB7XG4vLyAgICAgICAgIHNldEFsbE1hdGVyaWFsUHJvcHMoY2hpbGQsIGZuKVxuLy8gICAgICAgfVxuLy8gICAgIH1cbi8vICAgfVxuLy8gfVxuXG5mdW5jdGlvbiBhZGRMaWdodGluZyAoc2NlbmUsIGNhbWVyYSkge1xuICAvLyBjb25zdCBkaXJlY3Rpb25hbExpZ2h0MSA9IG5ldyBUSFJFRS5Qb2ludExpZ2h0KDB4ZmZmZmZmLCAwLjgpXG4gIC8vIGRpcmVjdGlvbmFsTGlnaHQxLnBvc2l0aW9uLnNldCgxMCwgMTAsIDEwKVxuICAvLyBkaXJlY3Rpb25hbExpZ2h0MS5sb29rQXQoY2FtZXJhLmxvb2tBdClcbiAgLy8gZGlyZWN0aW9uYWxMaWdodDEuY2FzdFNoYWRvdyA9IHRydWVcbiAgLy8gc2NlbmUuYWRkKGRpcmVjdGlvbmFsTGlnaHQxKVxuICAvLyBjb25zdCBkaXJlY3Rpb25hbExpZ2h0MiA9IG5ldyBEaXJlY3Rpb25hbExpZ2h0KDB4ZmZmZmZmLCAwLjQpXG4gIC8vIGRpcmVjdGlvbmFsTGlnaHQyLnBvc2l0aW9uLmNvcHkobmV3IFRIUkVFLlZlY3RvcjMoY2FtZXJhLnBvc2l0aW9uLnggKiAtMSwgY2FtZXJhLnBvc2l0aW9uLnksIGNhbWVyYS5wb3NpdGlvbi56KSlcbiAgLy8gZGlyZWN0aW9uYWxMaWdodDIubG9va0F0KGNhbWVyYS5sb29rQXQpXG4gIC8vIHNjZW5lLmFkZChkaXJlY3Rpb25hbExpZ2h0MilcbiAgLy8gLy8gY29uc3QgZGlyZWN0aW9uYWxMaWdodDMgPSBuZXcgRGlyZWN0aW9uYWxMaWdodCgweGZmZmZmZiwgMC4xKVxuICAvLyAvLyBkaXJlY3Rpb25hbExpZ2h0My5wb3NpdGlvbi5jb3B5KG5ldyBUSFJFRS5WZWN0b3IzKGNhbWVyYS5wb3NpdGlvbi54ICogLTEsIGNhbWVyYS5wb3NpdGlvbi55LCBjYW1lcmEucG9zaXRpb24ueiAqIC0xKSlcbiAgLy8gLy8gZGlyZWN0aW9uYWxMaWdodDMubG9va0F0KGNhbWVyYS5sb29rQXQpXG4gIC8vIC8vIHNjZW5lLmFkZChkaXJlY3Rpb25hbExpZ2h0MylcbiAgLy8gY29uc3QgaGVtaUxpZ2h0ID0gbmV3IFRIUkVFLkhlbWlzcGhlcmVMaWdodCgweDQ4ODJmZiwgMHg1MDI3MTgsIDAuNylcbiAgLy8gc2NlbmUuYWRkKGhlbWlMaWdodClcblxuICAvLyBodHRwczovL3RocmVlanMub3JnL2V4YW1wbGVzLz9xPXNoYWRvI3dlYmdsX3NoYWRvd21hcF92c21cbiAgLy8gcmF0aGVyIG5pY2UgbGlnaHRzXG4gIHNjZW5lLmFkZChuZXcgVEhSRUUuQW1iaWVudExpZ2h0KDB4NjY2NjY2KSlcblxuICBjb25zdCBzcG90TGlnaHQgPSBuZXcgVEhSRUUuU3BvdExpZ2h0KDB4ZmY4ODg4KVxuICBzcG90TGlnaHQuYW5nbGUgPSBNYXRoLlBJIC8gNVxuICBzcG90TGlnaHQucGVudW1icmEgPSAwLjNcbiAgc3BvdExpZ2h0LnBvc2l0aW9uLnNldCg4LCAxMCwgNSlcbiAgc3BvdExpZ2h0LmNhc3RTaGFkb3cgPSB0cnVlXG4gIHNwb3RMaWdodC5zaGFkb3cuY2FtZXJhLm5lYXIgPSA4XG4gIHNwb3RMaWdodC5zaGFkb3cuY2FtZXJhLmZhciA9IDIwMFxuICBzcG90TGlnaHQuc2hhZG93Lm1hcFNpemUud2lkdGggPSAyNTZcbiAgc3BvdExpZ2h0LnNoYWRvdy5tYXBTaXplLmhlaWdodCA9IDI1NlxuICBzcG90TGlnaHQuc2hhZG93LmJpYXMgPSAtMC4wMDJcbiAgc3BvdExpZ2h0LnNoYWRvdy5yYWRpdXMgPSA0XG4gIHNjZW5lLmFkZChzcG90TGlnaHQpXG5cbiAgY29uc3QgZGlyTGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweDg4ODhmZilcbiAgZGlyTGlnaHQucG9zaXRpb24uc2V0KDUsIDEwLCA4KVxuICBkaXJMaWdodC5jYXN0U2hhZG93ID0gdHJ1ZVxuICBkaXJMaWdodC5zaGFkb3cuY2FtZXJhLm5lYXIgPSAwLjFcbiAgZGlyTGlnaHQuc2hhZG93LmNhbWVyYS5mYXIgPSA1MDBcbiAgZGlyTGlnaHQuc2hhZG93LmNhbWVyYS5yaWdodCA9IDE3XG4gIGRpckxpZ2h0LnNoYWRvdy5jYW1lcmEubGVmdCA9IC0xN1xuICBkaXJMaWdodC5zaGFkb3cuY2FtZXJhLnRvcCA9IDE3XG4gIGRpckxpZ2h0LnNoYWRvdy5jYW1lcmEuYm90dG9tID0gLTE3XG4gIGRpckxpZ2h0LnNoYWRvdy5tYXBTaXplLndpZHRoID0gNTEyXG4gIGRpckxpZ2h0LnNoYWRvdy5tYXBTaXplLmhlaWdodCA9IDUxMlxuICBkaXJMaWdodC5zaGFkb3cucmFkaXVzID0gNFxuICBkaXJMaWdodC5zaGFkb3cuYmlhcyA9IC0wLjAwMDVcblxuICBzY2VuZS5hZGQoZGlyTGlnaHQpXG59XG4iLCJleHBvcnQgY29uc3Qgb25SZXNpemUgPSAoY2FtZXJhLCByZW5kZXJlcikgPT4ge1xuICBjb25zdCByZXNpemVyID0gKCkgPT4ge1xuICAgIGNhbWVyYS5hc3BlY3QgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodFxuICAgIGNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KClcbiAgICByZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpXG4gIH1cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZXIsIGZhbHNlKVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtb3ZpbmctdHJ1Y2tcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rbHRqc19mb3VydGhcIl0gPSBzZWxmW1wid2VicGFja0NodW5rbHRqc19mb3VydGhcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2J1aWxkX3RocmVlX21vZHVsZV9qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX2NvbnRyb2xzX09yYml0Q29udHJvbHNfanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9sb2FkZXJzX0dMVEZMb2FkZXJfanNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zYW1wbGVzL21vdmluZy10cnVjay5qc1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
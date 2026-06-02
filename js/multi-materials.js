/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./samples/chapters/chapter-4/multi-materials.js"
/*!*******************************************************!*\
  !*** ./samples/chapters/chapter-4/multi-materials.js ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _bootstrap_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../bootstrap/bootstrap */ "./samples/bootstrap/bootstrap.js");
/* harmony import */ var _controls_renderer_control__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../controls/renderer-control */ "./samples/controls/renderer-control.js");
/* harmony import */ var lil_gui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lil-gui */ "./node_modules/lil-gui/dist/lil-gui.esm.js");
/* harmony import */ var _controls_material_controls__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../controls/material-controls */ "./samples/controls/material-controls.js");
/* harmony import */ var _controls_scene_controls__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../controls/scene-controls */ "./samples/controls/scene-controls.js");
/* harmony import */ var _models_models__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../models/models */ "./samples/models/models.js");









const props = {
  backgroundColor: 0xffffff
}

const gui = new lil_gui__WEBPACK_IMPORTED_MODULE_3__["default"]()

const init = async () => {
  const mat1 = new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({ color: 0x777777 })
  const mat2 = new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({ color: 0xff0000 })
  const mat3 = new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({ color: 0x00ff00 })
  const mat4 = new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({ color: 0x0000ff })
  const mat5 = new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({ color: 0x66aaff })
  const mat6 = new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({ color: 0xffaa66 })

  const group = new three__WEBPACK_IMPORTED_MODULE_0__.Group()
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      for (let z = 0; z < 3; z++) {
        const cubeMesh = (0,_models_models__WEBPACK_IMPORTED_MODULE_6__.sampleCube)([mat1, mat2, mat3, mat4, mat5, mat6], 0.95)
        cubeMesh.position.set(x - 1.5, y - 1.5, z - 1.5)
        group.add(cubeMesh)
      }
    }
  }

  (0,_bootstrap_bootstrap__WEBPACK_IMPORTED_MODULE_1__.initScene)(props)(({ scene, camera, renderer, orbitControls }) => {
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

    scene.add(group)

    ;(0,_controls_renderer_control__WEBPACK_IMPORTED_MODULE_2__.intializeRendererControls)(gui, renderer)
    ;(0,_controls_scene_controls__WEBPACK_IMPORTED_MODULE_5__.initializeSceneControls)(gui, scene, false)
    ;(0,_controls_material_controls__WEBPACK_IMPORTED_MODULE_4__.initializeGuiMeshBasicMaterial)(gui, group, mat1, 'mat1')
    ;(0,_controls_material_controls__WEBPACK_IMPORTED_MODULE_4__.initializeGuiMeshBasicMaterial)(gui, group, mat2, 'mat2')
    ;(0,_controls_material_controls__WEBPACK_IMPORTED_MODULE_4__.initializeGuiMeshBasicMaterial)(gui, group, mat3, 'mat3')
    ;(0,_controls_material_controls__WEBPACK_IMPORTED_MODULE_4__.initializeGuiMeshBasicMaterial)(gui, group, mat4, 'mat4')
    ;(0,_controls_material_controls__WEBPACK_IMPORTED_MODULE_4__.initializeGuiMeshBasicMaterial)(gui, group, mat5, 'mat5')
    ;(0,_controls_material_controls__WEBPACK_IMPORTED_MODULE_4__.initializeGuiMeshBasicMaterial)(gui, group, mat6, 'mat6')
  })
}

init().then()


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

/***/ "./samples/models/models.js"
/*!**********************************!*\
  !*** ./samples/models/models.js ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   sampleCube: () => (/* binding */ sampleCube),
/* harmony export */   sampleFox: () => (/* binding */ sampleFox),
/* harmony export */   sampleGosper: () => (/* binding */ sampleGosper),
/* harmony export */   sampleKnot: () => (/* binding */ sampleKnot),
/* harmony export */   sampleMaterialBall: () => (/* binding */ sampleMaterialBall),
/* harmony export */   sampleSphere: () => (/* binding */ sampleSphere),
/* harmony export */   sampleVertexColors: () => (/* binding */ sampleVertexColors)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/loaders/GLTFLoader.js */ "./node_modules/three/examples/jsm/loaders/GLTFLoader.js");
/* harmony import */ var _util_modelUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/modelUtil */ "./samples/util/modelUtil.js");
/* harmony import */ var three_examples_jsm_utils_BufferGeometryUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/jsm/utils/BufferGeometryUtils */ "./node_modules/three/examples/jsm/utils/BufferGeometryUtils.js");





const loader = new three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader()

const sampleCube = (material, size) => {
  const s = size ?? 1
  const cubeGeom = new three__WEBPACK_IMPORTED_MODULE_0__.BoxGeometry(s, s, s, 10, 10, 10)
  const cubeMesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(cubeGeom, material)

  return cubeMesh
}

const sampleSphere = (material) => {
  const floatingSphereGeom = new three__WEBPACK_IMPORTED_MODULE_0__.SphereBufferGeometry(1, 16, 12)
  const floatingSphereMesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(floatingSphereGeom, material)

  return floatingSphereMesh
}

const sampleGosper = (material) => {
  const points = gosper(4, 50)
  const colors = new Float32Array(points.length * 3)
  const lineGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.BufferGeometry().setFromPoints(points)
  points.forEach((e, i) => {
    const color = new three__WEBPACK_IMPORTED_MODULE_0__.Color(0xffffff)
    color.setHSL(e.x / 100 + 0.5, (e.y * 20) / 400, 0.2)
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b
  })

  lineGeometry.setAttribute('color', new three__WEBPACK_IMPORTED_MODULE_0__.BufferAttribute(colors, 3, true))
  const mesh = new three__WEBPACK_IMPORTED_MODULE_0__.Line(lineGeometry, material)

  mesh.computeLineDistances()
  mesh.scale.set(0.1, 0.1, 0.1)
  mesh.translateY(-2)

  return mesh
}

const sampleKnot = (material) => {
  const knotGeom = new three__WEBPACK_IMPORTED_MODULE_0__.TorusKnotBufferGeometry(2, 0.4, 200, 30, 2, 3)
  const knotMesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(knotGeom, material)

  knotMesh.receiveShadow = true
  knotMesh.castShadow = true

  return knotMesh
}

const sampleFox = async (material) => {
  const loadedObject = await loader.loadAsync('/assets/gltf/fox/fox.glb')
  ;(0,_util_modelUtil__WEBPACK_IMPORTED_MODULE_2__.visitChildren)(loadedObject.scene, (c) => {
    c.receiveShadow = true
    c.castShadow = true

    if (material) {
      c.material = material
    }
    if (c.geometry) {
      // for smooth models
      c.geometry = three_examples_jsm_utils_BufferGeometryUtils__WEBPACK_IMPORTED_MODULE_3__.mergeVertices(c.geometry)
      c.geometry.computeVertexNormals()
    }
  })
  loadedObject.scene.scale.set(0.07, 0.07, 0.07)
  loadedObject.scene.translateY(-1)

  return loadedObject.scene
}

const sampleVertexColors = async (material) => {
  const loadedObject = await loader.loadAsync('/assets/gltf/vertex-colors/vertex-colors.glb')

  ;(0,_util_modelUtil__WEBPACK_IMPORTED_MODULE_2__.visitChildren)(loadedObject.scene, (c) => {
    c.receiveShadow = true
    c.castShadow = true
    if (material) c.material = material
    if (c.geometry) {
      c.geometry.deleteAttribute('normal')
      c.geometry = three_examples_jsm_utils_BufferGeometryUtils__WEBPACK_IMPORTED_MODULE_3__.mergeVertices(c.geometry)
      c.geometry.computeVertexNormals()
    }
  })
  loadedObject.scene.scale.set(1.7, 1.7, 1.7)
  loadedObject.scene.translateY(1)

  return loadedObject.scene
}

const sampleMaterialBall = async (material) => {
  // const loadedObject = await loader.loadAsync('/assets/gltf/material_ball/material_ball_v2.glb')
  const loadedObject = await loader.loadAsync('/assets/gltf/material_ball_in_3d-coat/scene.gltf')

  ;(0,_util_modelUtil__WEBPACK_IMPORTED_MODULE_2__.visitChildren)(loadedObject.scene, (c) => {
    c.receiveShadow = true
    c.castShadow = true
    if (material) c.material = material
    if (c.geometry) {
      c.geometry.computeVertexNormals()
    }
  })
  loadedObject.scene.scale.set(0.5, 0.5, 0.5)

  return loadedObject.scene
}

function gosper(a, b) {
  var turtle = [0, 0, 0]
  var points = []
  var count = 0
  rg(a, b, turtle)
  return points

  function rt(x) {
    turtle[2] += x
  }

  function lt(x) {
    turtle[2] -= x
  }

  function fd(dist) {
    points.push({
      x: turtle[0],
      y: turtle[1],
      z: Math.sin(count) * 5
    })
    var dir = turtle[2] * (Math.PI / 180)
    turtle[0] += Math.cos(dir) * dist
    turtle[1] += Math.sin(dir) * dist

    points.push({
      x: turtle[0],
      y: turtle[1],
      z: Math.sin(count) * 5
    })
  }

  function rg(st, ln, turtle) {
    st--
    ln = ln / 2.6457
    if (st > 0) {
      rg(st, ln, turtle)
      rt(60)
      gl(st, ln, turtle)
      rt(120)
      gl(st, ln, turtle)
      lt(60)
      rg(st, ln, turtle)
      lt(120)
      rg(st, ln, turtle)
      rg(st, ln, turtle)
      lt(60)
      gl(st, ln, turtle)
      rt(60)
    }
    if (st == 0) {
      fd(ln)
      rt(60)
      fd(ln)
      rt(120)
      fd(ln)
      lt(60)
      fd(ln)
      lt(120)
      fd(ln)
      fd(ln)
      lt(60)
      fd(ln)
      rt(60)
    }
  }

  function gl(st, ln, turtle) {
    st--
    ln = ln / 2.6457
    if (st > 0) {
      lt(60)
      rg(st, ln, turtle)
      rt(60)
      gl(st, ln, turtle)
      gl(st, ln, turtle)
      rt(120)
      gl(st, ln, turtle)
      rt(60)
      rg(st, ln, turtle)
      lt(120)
      rg(st, ln, turtle)
      lt(60)
      gl(st, ln, turtle)
    }
    if (st == 0) {
      lt(60)
      fd(ln)
      rt(60)
      fd(ln)
      fd(ln)
      rt(120)
      fd(ln)
      rt(60)
      fd(ln)
      lt(120)
      fd(ln)
      lt(60)
      fd(ln)
    }
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
/******/ 			"multi-materials": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","vendors-node_modules_three_examples_jsm_loaders_GLTFLoader_js","vendors-node_modules_three_examples_jsm_utils_BufferGeometryUtils_js","samples_bootstrap_bootstrap_js-samples_controls_material-controls_js-samples_controls_rendere-c87d8a"], () => (__webpack_require__("./samples/chapters/chapter-4/multi-materials.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0EsNEc7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci00L211bHRpLW1hdGVyaWFscy5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY29udHJvbHMvc2NlbmUtY29udHJvbHMuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL21vZGVscy9tb2RlbHMuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9ub2RlX21vZHVsZXMvdGhyZWUvZXhhbXBsZXMvanNtL2hlbHBlcnMvVmVydGV4Tm9ybWFsc0hlbHBlci5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuaW1wb3J0IHsgaW5pdFNjZW5lIH0gZnJvbSAnLi4vLi4vYm9vdHN0cmFwL2Jvb3RzdHJhcCdcbmltcG9ydCB7IGludGlhbGl6ZVJlbmRlcmVyQ29udHJvbHMgfSBmcm9tICcuLi8uLi9jb250cm9scy9yZW5kZXJlci1jb250cm9sJ1xuXG5pbXBvcnQgR1VJIGZyb20gJ2xpbC1ndWknXG5pbXBvcnQgeyBpbml0aWFsaXplR3VpTWVzaEJhc2ljTWF0ZXJpYWwgfSBmcm9tICcuLi8uLi9jb250cm9scy9tYXRlcmlhbC1jb250cm9scydcbmltcG9ydCB7IGluaXRpYWxpemVTY2VuZUNvbnRyb2xzIH0gZnJvbSAnLi4vLi4vY29udHJvbHMvc2NlbmUtY29udHJvbHMnXG5pbXBvcnQgeyBzYW1wbGVDdWJlIH0gZnJvbSAnLi4vLi4vbW9kZWxzL21vZGVscydcblxuY29uc3QgcHJvcHMgPSB7XG4gIGJhY2tncm91bmRDb2xvcjogMHhmZmZmZmZcbn1cblxuY29uc3QgZ3VpID0gbmV3IEdVSSgpXG5cbmNvbnN0IGluaXQgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IG1hdDEgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoeyBjb2xvcjogMHg3Nzc3NzcgfSlcbiAgY29uc3QgbWF0MiA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IGNvbG9yOiAweGZmMDAwMCB9KVxuICBjb25zdCBtYXQzID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgY29sb3I6IDB4MDBmZjAwIH0pXG4gIGNvbnN0IG1hdDQgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoeyBjb2xvcjogMHgwMDAwZmYgfSlcbiAgY29uc3QgbWF0NSA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IGNvbG9yOiAweDY2YWFmZiB9KVxuICBjb25zdCBtYXQ2ID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgY29sb3I6IDB4ZmZhYTY2IH0pXG5cbiAgY29uc3QgZ3JvdXAgPSBuZXcgVEhSRUUuR3JvdXAoKVxuICBmb3IgKGxldCB4ID0gMDsgeCA8IDM7IHgrKykge1xuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgMzsgeSsrKSB7XG4gICAgICBmb3IgKGxldCB6ID0gMDsgeiA8IDM7IHorKykge1xuICAgICAgICBjb25zdCBjdWJlTWVzaCA9IHNhbXBsZUN1YmUoW21hdDEsIG1hdDIsIG1hdDMsIG1hdDQsIG1hdDUsIG1hdDZdLCAwLjk1KVxuICAgICAgICBjdWJlTWVzaC5wb3NpdGlvbi5zZXQoeCAtIDEuNSwgeSAtIDEuNSwgeiAtIDEuNSlcbiAgICAgICAgZ3JvdXAuYWRkKGN1YmVNZXNoKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGluaXRTY2VuZShwcm9wcykoKHsgc2NlbmUsIGNhbWVyYSwgcmVuZGVyZXIsIG9yYml0Q29udHJvbHMgfSkgPT4ge1xuICAgIGNhbWVyYS5wb3NpdGlvbi54ID0gLTNcbiAgICBjYW1lcmEucG9zaXRpb24ueiA9IDhcbiAgICBjYW1lcmEucG9zaXRpb24ueSA9IDJcbiAgICBvcmJpdENvbnRyb2xzLnVwZGF0ZSgpXG5cbiAgICBmdW5jdGlvbiBhbmltYXRlKCkge1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpXG4gICAgICByZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSlcbiAgICAgIG9yYml0Q29udHJvbHMudXBkYXRlKClcbiAgICB9XG5cbiAgICBhbmltYXRlKClcblxuICAgIHNjZW5lLmFkZChncm91cClcblxuICAgIGludGlhbGl6ZVJlbmRlcmVyQ29udHJvbHMoZ3VpLCByZW5kZXJlcilcbiAgICBpbml0aWFsaXplU2NlbmVDb250cm9scyhndWksIHNjZW5lLCBmYWxzZSlcbiAgICBpbml0aWFsaXplR3VpTWVzaEJhc2ljTWF0ZXJpYWwoZ3VpLCBncm91cCwgbWF0MSwgJ21hdDEnKVxuICAgIGluaXRpYWxpemVHdWlNZXNoQmFzaWNNYXRlcmlhbChndWksIGdyb3VwLCBtYXQyLCAnbWF0MicpXG4gICAgaW5pdGlhbGl6ZUd1aU1lc2hCYXNpY01hdGVyaWFsKGd1aSwgZ3JvdXAsIG1hdDMsICdtYXQzJylcbiAgICBpbml0aWFsaXplR3VpTWVzaEJhc2ljTWF0ZXJpYWwoZ3VpLCBncm91cCwgbWF0NCwgJ21hdDQnKVxuICAgIGluaXRpYWxpemVHdWlNZXNoQmFzaWNNYXRlcmlhbChndWksIGdyb3VwLCBtYXQ1LCAnbWF0NScpXG4gICAgaW5pdGlhbGl6ZUd1aU1lc2hCYXNpY01hdGVyaWFsKGd1aSwgZ3JvdXAsIG1hdDYsICdtYXQ2JylcbiAgfSlcbn1cblxuaW5pdCgpLnRoZW4oKVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5cbmNvbnN0IHRleHR1cmVMb2FkZXIgPSBuZXcgVEhSRUUuVGV4dHVyZUxvYWRlcigpXG5cbmNvbnN0IHByb3BlcnRpZXNPYmplY3QgPSAoc2NlbmUpID0+ICh7XG4gIG92ZXJyaWRlTWF0ZXJpYWw6IHtcbiAgICB0b2dnbGU6ICgpID0+IHtcbiAgICAgIGlmIChzY2VuZS5vdmVycmlkZU1hdGVyaWFsICE9PSBudWxsKSB7XG4gICAgICAgIHNjZW5lLm92ZXJyaWRlTWF0ZXJpYWwgPSBudWxsXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY2VuZS5vdmVycmlkZU1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hOb3JtYWxNYXRlcmlhbCgpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBiYWNrR3JvdW5kOiAnV2hpdGUnLFxuICBlbnZpcm9ubWVudDoge1xuICAgIHRvZ2dsZTogKCkgPT4ge1xuICAgICAgaWYgKHNjZW5lLmVudmlyb25tZW50ICE9PSBudWxsKSB7XG4gICAgICAgIHNjZW5lLmVudmlyb25tZW50ID0gbnVsbFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGV4dHVyZUxvYWRlci5sb2FkKCcvYXNzZXRzL2VxdWkuanBlZycsIChsb2FkZWQpID0+IHtcbiAgICAgICAgICBsb2FkZWQubWFwcGluZyA9IFRIUkVFLkVxdWlyZWN0YW5ndWxhclJlZmxlY3Rpb25NYXBwaW5nXG4gICAgICAgICAgc2NlbmUuZW52aXJvbm1lbnQgPSBsb2FkZWRcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pXG5cbmNvbnN0IGZvZ1Byb3BlcnRpZXMgPSAoZm9nKSA9PiAoe1xuICBjb2xvcjogMHhmZmZmZmYsXG4gIG5lYXI6IGZvZy5uZWFyLFxuICBmYXI6IGZvZy5mYXJcbn0pXG5cbmV4cG9ydCBjb25zdCBpbml0aWFsaXplU2NlbmVDb250cm9scyA9IChndWksIHNjZW5lLCBmb2dFbmFibGVkLCBpc09wZW4pID0+IHtcbiAgY29uc3QgcHJvcHMgPSBwcm9wZXJ0aWVzT2JqZWN0KHNjZW5lKVxuICBjb25zdCBzY2VuZUNvbnRyb2xzID0gZ3VpLmFkZEZvbGRlcignU2NlbmUnKVxuXG4gIHNjZW5lQ29udHJvbHNcbiAgICAuYWRkKHByb3BzLCAnYmFja0dyb3VuZCcsIFsnV2hpdGUnLCAnQmxhY2snLCAnTnVsbCcsICdDb2xvcicsICdUZXh0dXJlJywgJ0N1YmVtYXAnXSlcbiAgICAub25DaGFuZ2UoKGV2ZW50KSA9PiBoYW5kbGVCYWNrZ3JvdW5kQ2hhbmdlKGV2ZW50LCBzY2VuZSkpXG4gIHNjZW5lQ29udHJvbHMuYWRkKHByb3BzLm92ZXJyaWRlTWF0ZXJpYWwsICd0b2dnbGUnKS5uYW1lKCdUb2dnbGUgT3ZlcnJpZGUgTWF0ZXJpYWwnKVxuICBzY2VuZUNvbnRyb2xzLmFkZChwcm9wcy5lbnZpcm9ubWVudCwgJ3RvZ2dsZScpLm5hbWUoJ1RvZ2dsZSBFbnZpcm9ubWVudCcpXG5cbiAgaWYgKGZvZ0VuYWJsZWQpIHtcbiAgICBjb25zdCBmb2dDb2xvciA9IG5ldyBUSFJFRS5Db2xvcigweGZmZmZmZilcbiAgICBjb25zdCBmb2cgPSBuZXcgVEhSRUUuRm9nKGZvZ0NvbG9yLCAxLCAyMClcbiAgICBzY2VuZS5mb2cgPSBmb2dcbiAgICBjb25zdCBmb2dQcm9wcyA9IGZvZ1Byb3BlcnRpZXMoZm9nKVxuICAgIGNvbnN0IGZvZ0NvbnRyb2xzID0gc2NlbmVDb250cm9scy5hZGRGb2xkZXIoJ0ZvZycpXG4gICAgZm9nQ29udHJvbHMuYWRkQ29sb3IoZm9nUHJvcHMsICdjb2xvcicpXG4gICAgZm9nQ29udHJvbHMuYWRkKGZvZ1Byb3BzLCAnbmVhcicsIDAsIDEwLCAwLjEpXG4gICAgZm9nQ29udHJvbHMuYWRkKGZvZ1Byb3BzLCAnZmFyJywgMCwgMTAwLCAwLjEpXG5cbiAgICBmb2dDb250cm9scy5vbkNoYW5nZSgoKSA9PiB7XG4gICAgICBmb2cuY29sb3IgPSBmb2dDb2xvci5zZXRIZXgoZm9nUHJvcHMuY29sb3IpXG4gICAgICBmb2cubmVhciA9IGZvZ1Byb3BzLm5lYXJcbiAgICAgIGZvZy5mYXIgPSBmb2dQcm9wcy5mYXJcbiAgICB9KVxuICB9XG5cbiAgaXNPcGVuID8gc2NlbmVDb250cm9scy5vcGVuKCkgOiBzY2VuZUNvbnRyb2xzLmNsb3NlKClcbn1cblxuY29uc3QgaGFuZGxlQmFja2dyb3VuZENoYW5nZSA9IChzZXR0aW5nLCBzY2VuZSkgPT4ge1xuICBzd2l0Y2ggKHNldHRpbmcpIHtcbiAgICBjYXNlICdXaGl0ZSc6XG4gICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbmV3IFRIUkVFLkNvbG9yKDB4ZmZmZmZmKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdCbGFjayc6XG4gICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbmV3IFRIUkVFLkNvbG9yKDB4MDAwMDAwKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdOdWxsJzpcbiAgICAgIHNjZW5lLmJhY2tncm91bmQgPSBudWxsXG4gICAgICBicmVha1xuICAgIGNhc2UgJ0NvbG9yJzpcbiAgICAgIHNjZW5lLmJhY2tncm91bmQgPSBuZXcgVEhSRUUuQ29sb3IoMHg0NGZmNDQpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ1RleHR1cmUnOlxuICAgICAgdGV4dHVyZUxvYWRlci5sb2FkKCcvYXNzZXRzL3RleHR1cmVzL3dvb2QvYWJzdHJhY3QtYW50aXF1ZS1iYWNrZHJvcC0xNjQwMDUuanBnJywgKGxvYWRlZCkgPT4ge1xuICAgICAgICBsb2FkZWQuZW5jb2RpbmcgPSBUSFJFRS5zUkdCRW5jb2RpbmdcbiAgICAgICAgc2NlbmUuYmFja2dyb3VuZCA9IGxvYWRlZFxuICAgICAgICBzY2VuZS5lbnZpcm9ubWVudCA9IG51bGxcbiAgICAgIH0pXG4gICAgICBicmVha1xuICAgIGNhc2UgJ0N1YmVtYXAnOlxuICAgICAgdGV4dHVyZUxvYWRlci5sb2FkKCcvYXNzZXRzL2VxdWkuanBlZycsIChsb2FkZWQpID0+IHtcbiAgICAgICAgbG9hZGVkLm1hcHBpbmcgPSBUSFJFRS5FcXVpcmVjdGFuZ3VsYXJSZWZsZWN0aW9uTWFwcGluZ1xuICAgICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbG9hZGVkXG4gICAgICAgIHNjZW5lLmVudmlyb25tZW50ID0gbG9hZGVkXG4gICAgICB9KVxuXG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICBicmVha1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcbmltcG9ydCB7IEdMVEZMb2FkZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyLmpzJ1xuaW1wb3J0IHsgdmlzaXRDaGlsZHJlbiB9IGZyb20gJy4uL3V0aWwvbW9kZWxVdGlsJ1xuaW1wb3J0ICogYXMgQnVmZmVyR2VvbWV0cnlVdGlscyBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vdXRpbHMvQnVmZmVyR2VvbWV0cnlVdGlscydcblxuY29uc3QgbG9hZGVyID0gbmV3IEdMVEZMb2FkZXIoKVxuXG5leHBvcnQgY29uc3Qgc2FtcGxlQ3ViZSA9IChtYXRlcmlhbCwgc2l6ZSkgPT4ge1xuICBjb25zdCBzID0gc2l6ZSA/PyAxXG4gIGNvbnN0IGN1YmVHZW9tID0gbmV3IFRIUkVFLkJveEdlb21ldHJ5KHMsIHMsIHMsIDEwLCAxMCwgMTApXG4gIGNvbnN0IGN1YmVNZXNoID0gbmV3IFRIUkVFLk1lc2goY3ViZUdlb20sIG1hdGVyaWFsKVxuXG4gIHJldHVybiBjdWJlTWVzaFxufVxuXG5leHBvcnQgY29uc3Qgc2FtcGxlU3BoZXJlID0gKG1hdGVyaWFsKSA9PiB7XG4gIGNvbnN0IGZsb2F0aW5nU3BoZXJlR2VvbSA9IG5ldyBUSFJFRS5TcGhlcmVCdWZmZXJHZW9tZXRyeSgxLCAxNiwgMTIpXG4gIGNvbnN0IGZsb2F0aW5nU3BoZXJlTWVzaCA9IG5ldyBUSFJFRS5NZXNoKGZsb2F0aW5nU3BoZXJlR2VvbSwgbWF0ZXJpYWwpXG5cbiAgcmV0dXJuIGZsb2F0aW5nU3BoZXJlTWVzaFxufVxuXG5leHBvcnQgY29uc3Qgc2FtcGxlR29zcGVyID0gKG1hdGVyaWFsKSA9PiB7XG4gIGNvbnN0IHBvaW50cyA9IGdvc3Blcig0LCA1MClcbiAgY29uc3QgY29sb3JzID0gbmV3IEZsb2F0MzJBcnJheShwb2ludHMubGVuZ3RoICogMylcbiAgY29uc3QgbGluZUdlb21ldHJ5ID0gbmV3IFRIUkVFLkJ1ZmZlckdlb21ldHJ5KCkuc2V0RnJvbVBvaW50cyhwb2ludHMpXG4gIHBvaW50cy5mb3JFYWNoKChlLCBpKSA9PiB7XG4gICAgY29uc3QgY29sb3IgPSBuZXcgVEhSRUUuQ29sb3IoMHhmZmZmZmYpXG4gICAgY29sb3Iuc2V0SFNMKGUueCAvIDEwMCArIDAuNSwgKGUueSAqIDIwKSAvIDQwMCwgMC4yKVxuICAgIGNvbG9yc1tpICogM10gPSBjb2xvci5yXG4gICAgY29sb3JzW2kgKiAzICsgMV0gPSBjb2xvci5nXG4gICAgY29sb3JzW2kgKiAzICsgMl0gPSBjb2xvci5iXG4gIH0pXG5cbiAgbGluZUdlb21ldHJ5LnNldEF0dHJpYnV0ZSgnY29sb3InLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKGNvbG9ycywgMywgdHJ1ZSkpXG4gIGNvbnN0IG1lc2ggPSBuZXcgVEhSRUUuTGluZShsaW5lR2VvbWV0cnksIG1hdGVyaWFsKVxuXG4gIG1lc2guY29tcHV0ZUxpbmVEaXN0YW5jZXMoKVxuICBtZXNoLnNjYWxlLnNldCgwLjEsIDAuMSwgMC4xKVxuICBtZXNoLnRyYW5zbGF0ZVkoLTIpXG5cbiAgcmV0dXJuIG1lc2hcbn1cblxuZXhwb3J0IGNvbnN0IHNhbXBsZUtub3QgPSAobWF0ZXJpYWwpID0+IHtcbiAgY29uc3Qga25vdEdlb20gPSBuZXcgVEhSRUUuVG9ydXNLbm90QnVmZmVyR2VvbWV0cnkoMiwgMC40LCAyMDAsIDMwLCAyLCAzKVxuICBjb25zdCBrbm90TWVzaCA9IG5ldyBUSFJFRS5NZXNoKGtub3RHZW9tLCBtYXRlcmlhbClcblxuICBrbm90TWVzaC5yZWNlaXZlU2hhZG93ID0gdHJ1ZVxuICBrbm90TWVzaC5jYXN0U2hhZG93ID0gdHJ1ZVxuXG4gIHJldHVybiBrbm90TWVzaFxufVxuXG5leHBvcnQgY29uc3Qgc2FtcGxlRm94ID0gYXN5bmMgKG1hdGVyaWFsKSA9PiB7XG4gIGNvbnN0IGxvYWRlZE9iamVjdCA9IGF3YWl0IGxvYWRlci5sb2FkQXN5bmMoJy9hc3NldHMvZ2x0Zi9mb3gvZm94LmdsYicpXG4gIHZpc2l0Q2hpbGRyZW4obG9hZGVkT2JqZWN0LnNjZW5lLCAoYykgPT4ge1xuICAgIGMucmVjZWl2ZVNoYWRvdyA9IHRydWVcbiAgICBjLmNhc3RTaGFkb3cgPSB0cnVlXG5cbiAgICBpZiAobWF0ZXJpYWwpIHtcbiAgICAgIGMubWF0ZXJpYWwgPSBtYXRlcmlhbFxuICAgIH1cbiAgICBpZiAoYy5nZW9tZXRyeSkge1xuICAgICAgLy8gZm9yIHNtb290aCBtb2RlbHNcbiAgICAgIGMuZ2VvbWV0cnkgPSBCdWZmZXJHZW9tZXRyeVV0aWxzLm1lcmdlVmVydGljZXMoYy5nZW9tZXRyeSlcbiAgICAgIGMuZ2VvbWV0cnkuY29tcHV0ZVZlcnRleE5vcm1hbHMoKVxuICAgIH1cbiAgfSlcbiAgbG9hZGVkT2JqZWN0LnNjZW5lLnNjYWxlLnNldCgwLjA3LCAwLjA3LCAwLjA3KVxuICBsb2FkZWRPYmplY3Quc2NlbmUudHJhbnNsYXRlWSgtMSlcblxuICByZXR1cm4gbG9hZGVkT2JqZWN0LnNjZW5lXG59XG5cbmV4cG9ydCBjb25zdCBzYW1wbGVWZXJ0ZXhDb2xvcnMgPSBhc3luYyAobWF0ZXJpYWwpID0+IHtcbiAgY29uc3QgbG9hZGVkT2JqZWN0ID0gYXdhaXQgbG9hZGVyLmxvYWRBc3luYygnL2Fzc2V0cy9nbHRmL3ZlcnRleC1jb2xvcnMvdmVydGV4LWNvbG9ycy5nbGInKVxuXG4gIHZpc2l0Q2hpbGRyZW4obG9hZGVkT2JqZWN0LnNjZW5lLCAoYykgPT4ge1xuICAgIGMucmVjZWl2ZVNoYWRvdyA9IHRydWVcbiAgICBjLmNhc3RTaGFkb3cgPSB0cnVlXG4gICAgaWYgKG1hdGVyaWFsKSBjLm1hdGVyaWFsID0gbWF0ZXJpYWxcbiAgICBpZiAoYy5nZW9tZXRyeSkge1xuICAgICAgYy5nZW9tZXRyeS5kZWxldGVBdHRyaWJ1dGUoJ25vcm1hbCcpXG4gICAgICBjLmdlb21ldHJ5ID0gQnVmZmVyR2VvbWV0cnlVdGlscy5tZXJnZVZlcnRpY2VzKGMuZ2VvbWV0cnkpXG4gICAgICBjLmdlb21ldHJ5LmNvbXB1dGVWZXJ0ZXhOb3JtYWxzKClcbiAgICB9XG4gIH0pXG4gIGxvYWRlZE9iamVjdC5zY2VuZS5zY2FsZS5zZXQoMS43LCAxLjcsIDEuNylcbiAgbG9hZGVkT2JqZWN0LnNjZW5lLnRyYW5zbGF0ZVkoMSlcblxuICByZXR1cm4gbG9hZGVkT2JqZWN0LnNjZW5lXG59XG5cbmV4cG9ydCBjb25zdCBzYW1wbGVNYXRlcmlhbEJhbGwgPSBhc3luYyAobWF0ZXJpYWwpID0+IHtcbiAgLy8gY29uc3QgbG9hZGVkT2JqZWN0ID0gYXdhaXQgbG9hZGVyLmxvYWRBc3luYygnL2Fzc2V0cy9nbHRmL21hdGVyaWFsX2JhbGwvbWF0ZXJpYWxfYmFsbF92Mi5nbGInKVxuICBjb25zdCBsb2FkZWRPYmplY3QgPSBhd2FpdCBsb2FkZXIubG9hZEFzeW5jKCcvYXNzZXRzL2dsdGYvbWF0ZXJpYWxfYmFsbF9pbl8zZC1jb2F0L3NjZW5lLmdsdGYnKVxuXG4gIHZpc2l0Q2hpbGRyZW4obG9hZGVkT2JqZWN0LnNjZW5lLCAoYykgPT4ge1xuICAgIGMucmVjZWl2ZVNoYWRvdyA9IHRydWVcbiAgICBjLmNhc3RTaGFkb3cgPSB0cnVlXG4gICAgaWYgKG1hdGVyaWFsKSBjLm1hdGVyaWFsID0gbWF0ZXJpYWxcbiAgICBpZiAoYy5nZW9tZXRyeSkge1xuICAgICAgYy5nZW9tZXRyeS5jb21wdXRlVmVydGV4Tm9ybWFscygpXG4gICAgfVxuICB9KVxuICBsb2FkZWRPYmplY3Quc2NlbmUuc2NhbGUuc2V0KDAuNSwgMC41LCAwLjUpXG5cbiAgcmV0dXJuIGxvYWRlZE9iamVjdC5zY2VuZVxufVxuXG5mdW5jdGlvbiBnb3NwZXIoYSwgYikge1xuICB2YXIgdHVydGxlID0gWzAsIDAsIDBdXG4gIHZhciBwb2ludHMgPSBbXVxuICB2YXIgY291bnQgPSAwXG4gIHJnKGEsIGIsIHR1cnRsZSlcbiAgcmV0dXJuIHBvaW50c1xuXG4gIGZ1bmN0aW9uIHJ0KHgpIHtcbiAgICB0dXJ0bGVbMl0gKz0geFxuICB9XG5cbiAgZnVuY3Rpb24gbHQoeCkge1xuICAgIHR1cnRsZVsyXSAtPSB4XG4gIH1cblxuICBmdW5jdGlvbiBmZChkaXN0KSB7XG4gICAgcG9pbnRzLnB1c2goe1xuICAgICAgeDogdHVydGxlWzBdLFxuICAgICAgeTogdHVydGxlWzFdLFxuICAgICAgejogTWF0aC5zaW4oY291bnQpICogNVxuICAgIH0pXG4gICAgdmFyIGRpciA9IHR1cnRsZVsyXSAqIChNYXRoLlBJIC8gMTgwKVxuICAgIHR1cnRsZVswXSArPSBNYXRoLmNvcyhkaXIpICogZGlzdFxuICAgIHR1cnRsZVsxXSArPSBNYXRoLnNpbihkaXIpICogZGlzdFxuXG4gICAgcG9pbnRzLnB1c2goe1xuICAgICAgeDogdHVydGxlWzBdLFxuICAgICAgeTogdHVydGxlWzFdLFxuICAgICAgejogTWF0aC5zaW4oY291bnQpICogNVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiByZyhzdCwgbG4sIHR1cnRsZSkge1xuICAgIHN0LS1cbiAgICBsbiA9IGxuIC8gMi42NDU3XG4gICAgaWYgKHN0ID4gMCkge1xuICAgICAgcmcoc3QsIGxuLCB0dXJ0bGUpXG4gICAgICBydCg2MClcbiAgICAgIGdsKHN0LCBsbiwgdHVydGxlKVxuICAgICAgcnQoMTIwKVxuICAgICAgZ2woc3QsIGxuLCB0dXJ0bGUpXG4gICAgICBsdCg2MClcbiAgICAgIHJnKHN0LCBsbiwgdHVydGxlKVxuICAgICAgbHQoMTIwKVxuICAgICAgcmcoc3QsIGxuLCB0dXJ0bGUpXG4gICAgICByZyhzdCwgbG4sIHR1cnRsZSlcbiAgICAgIGx0KDYwKVxuICAgICAgZ2woc3QsIGxuLCB0dXJ0bGUpXG4gICAgICBydCg2MClcbiAgICB9XG4gICAgaWYgKHN0ID09IDApIHtcbiAgICAgIGZkKGxuKVxuICAgICAgcnQoNjApXG4gICAgICBmZChsbilcbiAgICAgIHJ0KDEyMClcbiAgICAgIGZkKGxuKVxuICAgICAgbHQoNjApXG4gICAgICBmZChsbilcbiAgICAgIGx0KDEyMClcbiAgICAgIGZkKGxuKVxuICAgICAgZmQobG4pXG4gICAgICBsdCg2MClcbiAgICAgIGZkKGxuKVxuICAgICAgcnQoNjApXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2woc3QsIGxuLCB0dXJ0bGUpIHtcbiAgICBzdC0tXG4gICAgbG4gPSBsbiAvIDIuNjQ1N1xuICAgIGlmIChzdCA+IDApIHtcbiAgICAgIGx0KDYwKVxuICAgICAgcmcoc3QsIGxuLCB0dXJ0bGUpXG4gICAgICBydCg2MClcbiAgICAgIGdsKHN0LCBsbiwgdHVydGxlKVxuICAgICAgZ2woc3QsIGxuLCB0dXJ0bGUpXG4gICAgICBydCgxMjApXG4gICAgICBnbChzdCwgbG4sIHR1cnRsZSlcbiAgICAgIHJ0KDYwKVxuICAgICAgcmcoc3QsIGxuLCB0dXJ0bGUpXG4gICAgICBsdCgxMjApXG4gICAgICByZyhzdCwgbG4sIHR1cnRsZSlcbiAgICAgIGx0KDYwKVxuICAgICAgZ2woc3QsIGxuLCB0dXJ0bGUpXG4gICAgfVxuICAgIGlmIChzdCA9PSAwKSB7XG4gICAgICBsdCg2MClcbiAgICAgIGZkKGxuKVxuICAgICAgcnQoNjApXG4gICAgICBmZChsbilcbiAgICAgIGZkKGxuKVxuICAgICAgcnQoMTIwKVxuICAgICAgZmQobG4pXG4gICAgICBydCg2MClcbiAgICAgIGZkKGxuKVxuICAgICAgbHQoMTIwKVxuICAgICAgZmQobG4pXG4gICAgICBsdCg2MClcbiAgICAgIGZkKGxuKVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtcblx0QnVmZmVyR2VvbWV0cnksXG5cdEZsb2F0MzJCdWZmZXJBdHRyaWJ1dGUsXG5cdExpbmVTZWdtZW50cyxcblx0TGluZUJhc2ljTWF0ZXJpYWwsXG5cdE1hdHJpeDMsXG5cdFZlY3RvcjNcbn0gZnJvbSAndGhyZWUnO1xuXG5jb25zdCBfdjEgPSBuZXcgVmVjdG9yMygpO1xuY29uc3QgX3YyID0gbmV3IFZlY3RvcjMoKTtcbmNvbnN0IF9ub3JtYWxNYXRyaXggPSBuZXcgTWF0cml4MygpO1xuXG5jbGFzcyBWZXJ0ZXhOb3JtYWxzSGVscGVyIGV4dGVuZHMgTGluZVNlZ21lbnRzIHtcblxuXHRjb25zdHJ1Y3Rvciggb2JqZWN0LCBzaXplID0gMSwgY29sb3IgPSAweGZmMDAwMCApIHtcblxuXHRcdGNvbnN0IGdlb21ldHJ5ID0gbmV3IEJ1ZmZlckdlb21ldHJ5KCk7XG5cblx0XHRjb25zdCBuTm9ybWFscyA9IG9iamVjdC5nZW9tZXRyeS5hdHRyaWJ1dGVzLm5vcm1hbC5jb3VudDtcblx0XHRjb25zdCBwb3NpdGlvbnMgPSBuZXcgRmxvYXQzMkJ1ZmZlckF0dHJpYnV0ZSggbk5vcm1hbHMgKiAyICogMywgMyApO1xuXG5cdFx0Z2VvbWV0cnkuc2V0QXR0cmlidXRlKCAncG9zaXRpb24nLCBwb3NpdGlvbnMgKTtcblxuXHRcdHN1cGVyKCBnZW9tZXRyeSwgbmV3IExpbmVCYXNpY01hdGVyaWFsKCB7IGNvbG9yLCB0b25lTWFwcGVkOiBmYWxzZSB9ICkgKTtcblxuXHRcdHRoaXMub2JqZWN0ID0gb2JqZWN0O1xuXHRcdHRoaXMuc2l6ZSA9IHNpemU7XG5cdFx0dGhpcy50eXBlID0gJ1ZlcnRleE5vcm1hbHNIZWxwZXInO1xuXG5cdFx0Ly9cblxuXHRcdHRoaXMubWF0cml4QXV0b1VwZGF0ZSA9IGZhbHNlO1xuXG5cdFx0dGhpcy51cGRhdGUoKTtcblxuXHR9XG5cblx0dXBkYXRlKCkge1xuXG5cdFx0dGhpcy5vYmplY3QudXBkYXRlTWF0cml4V29ybGQoIHRydWUgKTtcblxuXHRcdF9ub3JtYWxNYXRyaXguZ2V0Tm9ybWFsTWF0cml4KCB0aGlzLm9iamVjdC5tYXRyaXhXb3JsZCApO1xuXG5cdFx0Y29uc3QgbWF0cml4V29ybGQgPSB0aGlzLm9iamVjdC5tYXRyaXhXb3JsZDtcblxuXHRcdGNvbnN0IHBvc2l0aW9uID0gdGhpcy5nZW9tZXRyeS5hdHRyaWJ1dGVzLnBvc2l0aW9uO1xuXG5cdFx0Ly9cblxuXHRcdGNvbnN0IG9iakdlb21ldHJ5ID0gdGhpcy5vYmplY3QuZ2VvbWV0cnk7XG5cblx0XHRpZiAoIG9iakdlb21ldHJ5ICkge1xuXG5cdFx0XHRjb25zdCBvYmpQb3MgPSBvYmpHZW9tZXRyeS5hdHRyaWJ1dGVzLnBvc2l0aW9uO1xuXG5cdFx0XHRjb25zdCBvYmpOb3JtID0gb2JqR2VvbWV0cnkuYXR0cmlidXRlcy5ub3JtYWw7XG5cblx0XHRcdGxldCBpZHggPSAwO1xuXG5cdFx0XHQvLyBmb3Igc2ltcGxpY2l0eSwgaWdub3JlIGluZGV4IGFuZCBkcmF3Y2FsbHMsIGFuZCByZW5kZXIgZXZlcnkgbm9ybWFsXG5cblx0XHRcdGZvciAoIGxldCBqID0gMCwgamwgPSBvYmpQb3MuY291bnQ7IGogPCBqbDsgaiArKyApIHtcblxuXHRcdFx0XHRfdjEuZnJvbUJ1ZmZlckF0dHJpYnV0ZSggb2JqUG9zLCBqICkuYXBwbHlNYXRyaXg0KCBtYXRyaXhXb3JsZCApO1xuXG5cdFx0XHRcdF92Mi5mcm9tQnVmZmVyQXR0cmlidXRlKCBvYmpOb3JtLCBqICk7XG5cblx0XHRcdFx0X3YyLmFwcGx5TWF0cml4MyggX25vcm1hbE1hdHJpeCApLm5vcm1hbGl6ZSgpLm11bHRpcGx5U2NhbGFyKCB0aGlzLnNpemUgKS5hZGQoIF92MSApO1xuXG5cdFx0XHRcdHBvc2l0aW9uLnNldFhZWiggaWR4LCBfdjEueCwgX3YxLnksIF92MS56ICk7XG5cblx0XHRcdFx0aWR4ID0gaWR4ICsgMTtcblxuXHRcdFx0XHRwb3NpdGlvbi5zZXRYWVooIGlkeCwgX3YyLngsIF92Mi55LCBfdjIueiApO1xuXG5cdFx0XHRcdGlkeCA9IGlkeCArIDE7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdHBvc2l0aW9uLm5lZWRzVXBkYXRlID0gdHJ1ZTtcblxuXHR9XG5cbn1cblxuXG5leHBvcnQgeyBWZXJ0ZXhOb3JtYWxzSGVscGVyIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm11bHRpLW1hdGVyaWFsc1wiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtsdGpzX2ZvdXJ0aFwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtsdGpzX2ZvdXJ0aFwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfYnVpbGRfdGhyZWVfbW9kdWxlX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fY29udHJvbHNfT3JiaXRDb250cm9sc19qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfbGlsLWd1aV9kaXN0X2xpbC1ndWlfZXNtX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fbG9hZGVyc19HTFRGTG9hZGVyX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fdXRpbHNfQnVmZmVyR2VvbWV0cnlVdGlsc19qc1wiLFwic2FtcGxlc19ib290c3RyYXBfYm9vdHN0cmFwX2pzLXNhbXBsZXNfY29udHJvbHNfbWF0ZXJpYWwtY29udHJvbHNfanMtc2FtcGxlc19jb250cm9sc19yZW5kZXJlLWM4N2Q4YVwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci00L211bHRpLW1hdGVyaWFscy5qc1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
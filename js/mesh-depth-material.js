/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./samples/chapters/chapter-4/mesh-depth-material.js"
/*!***********************************************************!*\
  !*** ./samples/chapters/chapter-4/mesh-depth-material.js ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _bootstrap_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../bootstrap/bootstrap */ "./samples/bootstrap/bootstrap.js");
/* harmony import */ var _controls_renderer_control__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../controls/renderer-control */ "./samples/controls/renderer-control.js");
/* harmony import */ var lil_gui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lil-gui */ "./node_modules/lil-gui/dist/lil-gui.esm.js");
/* harmony import */ var _controls_add_remove_cube_controls__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../controls/add-remove-cube-controls */ "./samples/controls/add-remove-cube-controls.js");
/* harmony import */ var _controls_material_controls__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../controls/material-controls */ "./samples/controls/material-controls.js");
/* harmony import */ var _controls_camera_controls__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../controls/camera-controls */ "./samples/controls/camera-controls.js");









const props = {
  backgroundColor: 0xffffff,
  fogColor: 0xffffff
}

const gui = new lil_gui__WEBPACK_IMPORTED_MODULE_3__["default"]()

;(0,_bootstrap_bootstrap__WEBPACK_IMPORTED_MODULE_1__.initScene)(props)(({ scene, camera, renderer, orbitControls }) => {
  camera.position.set(-3, 8, 2)
  camera.near = 4
  camera.far = 20

  camera.updateProjectionMatrix()
  orbitControls.update()

  function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    orbitControls.update()
  }
  animate()

  const material = new three__WEBPACK_IMPORTED_MODULE_0__.MeshDepthMaterial()
  const group = new three__WEBPACK_IMPORTED_MODULE_0__.Group()
  scene.add(group)

  ;(0,_controls_renderer_control__WEBPACK_IMPORTED_MODULE_2__.intializeRendererControls)(gui, renderer)
  ;(0,_controls_camera_controls__WEBPACK_IMPORTED_MODULE_6__.initializePerspectiveCameraControls)(camera, gui, orbitControls)
  ;(0,_controls_add_remove_cube_controls__WEBPACK_IMPORTED_MODULE_4__.initializeAddRemoveCubeControls)(gui, group, material)
  ;(0,_controls_material_controls__WEBPACK_IMPORTED_MODULE_5__.initializeGuiMaterial)(gui, group, material)
  ;(0,_controls_material_controls__WEBPACK_IMPORTED_MODULE_5__.initializeMeshDepthMaterial)(gui, group, material)
})


/***/ },

/***/ "./samples/controls/add-remove-cube-controls.js"
/*!******************************************************!*\
  !*** ./samples/controls/add-remove-cube-controls.js ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initializeAddRemoveCubeControls: () => (/* binding */ initializeAddRemoveCubeControls)
/* harmony export */ });
/* harmony import */ var three_examples_jsm_utils_SceneUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/utils/SceneUtils */ "./node_modules/three/examples/jsm/utils/SceneUtils.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _util_colorUtil_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/colorUtil.js */ "./samples/util/colorUtil.js");
/* harmony import */ var _util_positionUtil_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/positionUtil.js */ "./samples/util/positionUtil.js");





const initializeAddRemoveCubeControls = (gui, parent, material) => {
  const addRemoveProps = {
    addCube: () => addCube(parent, material),
    removeCube: () => removeCube(parent)
  }

  gui.add(addRemoveProps, 'addCube')
  gui.add(addRemoveProps, 'removeCube')
}

const addCube = (parent, material) => {
  const color = (0,_util_colorUtil_js__WEBPACK_IMPORTED_MODULE_2__.randomColor)()
  const pos = (0,_util_positionUtil_js__WEBPACK_IMPORTED_MODULE_3__.randomVector)({
    xRange: { fromX: -4, toX: 4 },
    yRange: { fromY: -3, toY: 3 },
    zRange: { fromZ: -4, toZ: 4 }
  })

  const rotation = (0,_util_positionUtil_js__WEBPACK_IMPORTED_MODULE_3__.randomVector)({
    xRange: { fromX: 0, toX: Math.PI * 2 },
    yRange: { fromY: 0, toY: Math.PI * 2 },
    zRange: { fromZ: 0, toZ: Math.PI * 2 }
  })

  const geometry = new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(0.5, 0.5, 0.5)
  const cubeMaterial =
    material ??
    new three__WEBPACK_IMPORTED_MODULE_1__.MeshStandardMaterial({
      color: color,
      roughness: 0.1,
      metalness: 0.9
    })

  let cube

  if (Array.isArray(cubeMaterial)) {
    cube = three_examples_jsm_utils_SceneUtils__WEBPACK_IMPORTED_MODULE_0__.createMultiMaterialObject(geometry, cubeMaterial)
  } else {
    cube = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(geometry, cubeMaterial)
  }
  cube.name = 'cube-' + parent.children.length
  cube.position.copy(pos)
  cube.rotation.setFromVector3(rotation)
  cube.castShadow = true
  parent.add(cube)
}

const removeCube = (parent) => {
  parent.children.pop()
}


/***/ },

/***/ "./samples/controls/camera-controls.js"
/*!*********************************************!*\
  !*** ./samples/controls/camera-controls.js ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initializeOrthographicCameraControls: () => (/* binding */ initializeOrthographicCameraControls),
/* harmony export */   initializePerspectiveCameraControls: () => (/* binding */ initializePerspectiveCameraControls)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");


const perspectiveName = 'Perspective Camera'
const orthoName = 'Orthographic Camera'

// TODO: check the lookat
const lookAtProps = () => ({
  lookAtX: 0,
  lookAtY: 0,
  lookAtZ: 0
})

const initializePerspectiveCameraControls = (camera, gui, orbitControls, isOpen) => {
  const vectorProps = lookAtProps(camera)

  const props = {
    fov: camera.fov,
    aspect: camera.aspect,
    near: camera.near,
    far: camera.far,
    zoom: camera.zoom
  }

  removeIfPresent(gui, perspectiveName)
  removeIfPresent(gui, orthoName)

  const cameraFolder = gui.addFolder(perspectiveName)
  cameraFolder.add(props, 'fov', 0, 180, 1)
  cameraFolder.add(props, 'aspect', 0, 10, 0.1)
  cameraFolder.add(props, 'near', 0, 20, 0.1)
  cameraFolder.add(props, 'far', 5, 100, 0.1)
  cameraFolder.add(props, 'zoom', -1, 10, 0.1)

  cameraFolder.add(vectorProps, 'lookAtX', -10, 10, 0.1)
  cameraFolder.add(vectorProps, 'lookAtY', -10, 10, 0.1)
  cameraFolder.add(vectorProps, 'lookAtZ', -10, 10, 0.1)

  cameraFolder.onChange(() => {
    camera.fov = props.fov
    camera.aspect = props.aspect
    camera.near = props.near
    camera.far = props.far
    camera.zoom = props.zoom

    camera.updateProjectionMatrix()

    // since we're using a control, we also need to set that target
    orbitControls.target.set(vectorProps.lookAtX, vectorProps.lookAtY, vectorProps.lookAtZ)
    orbitControls.update()
  })

  isOpen ? cameraFolder.open() : cameraFolder.close()
}

const initializeOrthographicCameraControls = (camera, gui, orbitControls) => {
  const vectorProps = lookAtProps(camera)

  const props = {
    left: camera.left,
    right: camera.right,
    top: camera.top,
    bottom: camera.bottom,
    near: camera.near,
    far: camera.far,
    zoom: camera.zoom
  }

  removeIfPresent(gui, perspectiveName)
  removeIfPresent(gui, orthoName)

  const cameraFolder = gui.addFolder(orthoName)
  cameraFolder.add(props, 'left', -400, -10, 1)
  cameraFolder.add(props, 'right', 10, 400, 1)
  cameraFolder.add(props, 'top', 0, 200, 1)
  cameraFolder.add(props, 'bottom', -200, 0, 1)
  cameraFolder.add(props, 'near', -20, 10, 1)
  cameraFolder.add(props, 'far', 1, 100, 1)
  cameraFolder.add(props, 'zoom', 1, 100, 1)
  cameraFolder.add(vectorProps, 'lookAtX', -10, 10, 0.1)
  cameraFolder.add(vectorProps, 'lookAtY', -10, 10, 0.1)
  cameraFolder.add(vectorProps, 'lookAtZ', -10, 10, 0.1)

  cameraFolder.onChange(() => {
    camera.left = props.left
    camera.right = props.right
    camera.top = props.top
    camera.bottom = props.bottom
    camera.near = props.near
    camera.far = props.far
    camera.zoom = props.zoom
    camera.updateProjectionMatrix()

    camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(vectorProps.lookAtX, vectorProps.lookAtY, vectorProps.lookAtZ))

    // since we're using a control, we also need to set that target
    orbitControls.target.set(vectorProps.lookAtX, vectorProps.lookAtY, vectorProps.lookAtZ)

    orbitControls.update()
  })
}

const removeIfPresent = (gui, name) => {
  for (const folder of gui.foldersRecursive()) {
    if (folder._title === name) {
      folder.destroy()
    }
  }
}


/***/ },

/***/ "./samples/util/colorUtil.js"
/*!***********************************!*\
  !*** ./samples/util/colorUtil.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   randomColor: () => (/* binding */ randomColor)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");


const randomColor = () => {
  var r = Math.random(),
    g = Math.random(),
    b = Math.random()
  return new three__WEBPACK_IMPORTED_MODULE_0__.Color(r, g, b)
}


/***/ },

/***/ "./samples/util/positionUtil.js"
/*!**************************************!*\
  !*** ./samples/util/positionUtil.js ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   randomVector: () => (/* binding */ randomVector)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");


const randomVector = ({
  xRange: { fromX, toX },
  yRange: { fromY, toY },
  zRange: { fromZ, toZ },
}) => {
  const x = Math.random() * (toX - fromX) + fromX;
  const y = Math.random() * (toY - fromY) + fromY;
  const z = Math.random() * (toZ - fromZ) + fromZ;

  return new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(x, y, z);
};


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





/***/ },

/***/ "./node_modules/three/examples/jsm/utils/SceneUtils.js"
/*!*************************************************************!*\
  !*** ./node_modules/three/examples/jsm/utils/SceneUtils.js ***!
  \*************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   attach: () => (/* binding */ attach),
/* harmony export */   createMeshesFromInstancedMesh: () => (/* binding */ createMeshesFromInstancedMesh),
/* harmony export */   createMeshesFromMultiMaterialMesh: () => (/* binding */ createMeshesFromMultiMaterialMesh),
/* harmony export */   createMultiMaterialObject: () => (/* binding */ createMultiMaterialObject),
/* harmony export */   detach: () => (/* binding */ detach)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _BufferGeometryUtils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BufferGeometryUtils.js */ "./node_modules/three/examples/jsm/utils/BufferGeometryUtils.js");




function createMeshesFromInstancedMesh( instancedMesh ) {

	const group = new three__WEBPACK_IMPORTED_MODULE_0__.Group();

	const count = instancedMesh.count;
	const geometry = instancedMesh.geometry;
	const material = instancedMesh.material;

	for ( let i = 0; i < count; i ++ ) {

		const mesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh( geometry, material );

		instancedMesh.getMatrixAt( i, mesh.matrix );
		mesh.matrix.decompose( mesh.position, mesh.quaternion, mesh.scale );

		group.add( mesh );

	}

	group.copy( instancedMesh );
	group.updateMatrixWorld(); // ensure correct world matrices of meshes

	return group;

}

function createMeshesFromMultiMaterialMesh( mesh ) {

	if ( Array.isArray( mesh.material ) === false ) {

		console.warn( 'THREE.SceneUtils.createMeshesFromMultiMaterialMesh(): The given mesh has no multiple materials.' );
		return mesh;

	}

	const object = new three__WEBPACK_IMPORTED_MODULE_0__.Group();
	object.copy( mesh );

	// merge groups (which automatically sorts them)

	const geometry = (0,_BufferGeometryUtils_js__WEBPACK_IMPORTED_MODULE_1__.mergeGroups)( mesh.geometry );

	const index = geometry.index;
	const groups = geometry.groups;
	const attributeNames = Object.keys( geometry.attributes );

	// create a mesh for each group by extracting the buffer data into a new geometry

	for ( let i = 0; i < groups.length; i ++ ) {

		const group = groups[ i ];

		const start = group.start;
		const end = start + group.count;

		const newGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.BufferGeometry();
		const newMaterial = mesh.material[ group.materialIndex ];

		// process all buffer attributes

		for ( let j = 0; j < attributeNames.length; j ++ ) {

			const name = attributeNames[ j ];
			const attribute = geometry.attributes[ name ];
			const itemSize = attribute.itemSize;

			const newLength = group.count * itemSize;
			const type = attribute.array.constructor;

			const newArray = new type( newLength );
			const newAttribute = new three__WEBPACK_IMPORTED_MODULE_0__.BufferAttribute( newArray, itemSize );

			for ( let k = start, n = 0; k < end; k ++, n ++ ) {

				const ind = index.getX( k );

				if ( itemSize >= 1 ) newAttribute.setX( n, attribute.getX( ind ) );
				if ( itemSize >= 2 ) newAttribute.setY( n, attribute.getY( ind ) );
				if ( itemSize >= 3 ) newAttribute.setZ( n, attribute.getZ( ind ) );
				if ( itemSize >= 4 ) newAttribute.setW( n, attribute.getW( ind ) );

			}


			newGeometry.setAttribute( name, newAttribute );

		}

		const newMesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh( newGeometry, newMaterial );
		object.add( newMesh );

	}

	return object;

}

function createMultiMaterialObject( geometry, materials ) {

	const group = new three__WEBPACK_IMPORTED_MODULE_0__.Group();

	for ( let i = 0, l = materials.length; i < l; i ++ ) {

		group.add( new three__WEBPACK_IMPORTED_MODULE_0__.Mesh( geometry, materials[ i ] ) );

	}

	return group;

}

function detach( child, parent, scene ) {

	console.warn( 'THREE.SceneUtils: detach() has been deprecated. Use scene.attach( child ) instead.' );

	scene.attach( child );

}

function attach( child, scene, parent ) {

	console.warn( 'THREE.SceneUtils: attach() has been deprecated. Use parent.attach( child ) instead.' );

	parent.attach( child );

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
/******/ 			"mesh-depth-material": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","vendors-node_modules_three_examples_jsm_utils_BufferGeometryUtils_js","samples_bootstrap_bootstrap_js-samples_controls_material-controls_js-samples_controls_rendere-c87d8a"], () => (__webpack_require__("./samples/chapters/chapter-4/mesh-depth-material.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7Ozs7V0MvQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSwrQkFBK0Isd0NBQXdDO1dBQ3ZFO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUJBQWlCLHFCQUFxQjtXQUN0QztXQUNBO1dBQ0Esa0JBQWtCLHFCQUFxQjtXQUN2QztXQUNBO1dBQ0EsS0FBSztXQUNMO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFOzs7OztXQzNCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdELEU7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBLDRHOzs7OztVRWhEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItNC9tZXNoLWRlcHRoLW1hdGVyaWFsLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jb250cm9scy9hZGQtcmVtb3ZlLWN1YmUtY29udHJvbHMuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NvbnRyb2xzL2NhbWVyYS1jb250cm9scy5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvdXRpbC9jb2xvclV0aWwuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL3V0aWwvcG9zaXRpb25VdGlsLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vbm9kZV9tb2R1bGVzL3RocmVlL2V4YW1wbGVzL2pzbS9oZWxwZXJzL1ZlcnRleE5vcm1hbHNIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9ub2RlX21vZHVsZXMvdGhyZWUvZXhhbXBsZXMvanNtL3V0aWxzL1NjZW5lVXRpbHMuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcbmltcG9ydCB7IGluaXRTY2VuZSB9IGZyb20gJy4uLy4uL2Jvb3RzdHJhcC9ib290c3RyYXAnXG5pbXBvcnQgeyBpbnRpYWxpemVSZW5kZXJlckNvbnRyb2xzIH0gZnJvbSAnLi4vLi4vY29udHJvbHMvcmVuZGVyZXItY29udHJvbCdcblxuaW1wb3J0IEdVSSBmcm9tICdsaWwtZ3VpJ1xuaW1wb3J0IHsgaW5pdGlhbGl6ZUFkZFJlbW92ZUN1YmVDb250cm9scyB9IGZyb20gJy4uLy4uL2NvbnRyb2xzL2FkZC1yZW1vdmUtY3ViZS1jb250cm9scydcbmltcG9ydCB7IGluaXRpYWxpemVHdWlNYXRlcmlhbCwgaW5pdGlhbGl6ZU1lc2hEZXB0aE1hdGVyaWFsIH0gZnJvbSAnLi4vLi4vY29udHJvbHMvbWF0ZXJpYWwtY29udHJvbHMnXG5pbXBvcnQgeyBpbml0aWFsaXplUGVyc3BlY3RpdmVDYW1lcmFDb250cm9scyB9IGZyb20gJy4uLy4uL2NvbnRyb2xzL2NhbWVyYS1jb250cm9scydcblxuY29uc3QgcHJvcHMgPSB7XG4gIGJhY2tncm91bmRDb2xvcjogMHhmZmZmZmYsXG4gIGZvZ0NvbG9yOiAweGZmZmZmZlxufVxuXG5jb25zdCBndWkgPSBuZXcgR1VJKClcblxuaW5pdFNjZW5lKHByb3BzKSgoeyBzY2VuZSwgY2FtZXJhLCByZW5kZXJlciwgb3JiaXRDb250cm9scyB9KSA9PiB7XG4gIGNhbWVyYS5wb3NpdGlvbi5zZXQoLTMsIDgsIDIpXG4gIGNhbWVyYS5uZWFyID0gNFxuICBjYW1lcmEuZmFyID0gMjBcblxuICBjYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpXG4gIG9yYml0Q29udHJvbHMudXBkYXRlKClcblxuICBmdW5jdGlvbiBhbmltYXRlKCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKVxuICAgIHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhKVxuICAgIG9yYml0Q29udHJvbHMudXBkYXRlKClcbiAgfVxuICBhbmltYXRlKClcblxuICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoRGVwdGhNYXRlcmlhbCgpXG4gIGNvbnN0IGdyb3VwID0gbmV3IFRIUkVFLkdyb3VwKClcbiAgc2NlbmUuYWRkKGdyb3VwKVxuXG4gIGludGlhbGl6ZVJlbmRlcmVyQ29udHJvbHMoZ3VpLCByZW5kZXJlcilcbiAgaW5pdGlhbGl6ZVBlcnNwZWN0aXZlQ2FtZXJhQ29udHJvbHMoY2FtZXJhLCBndWksIG9yYml0Q29udHJvbHMpXG4gIGluaXRpYWxpemVBZGRSZW1vdmVDdWJlQ29udHJvbHMoZ3VpLCBncm91cCwgbWF0ZXJpYWwpXG4gIGluaXRpYWxpemVHdWlNYXRlcmlhbChndWksIGdyb3VwLCBtYXRlcmlhbClcbiAgaW5pdGlhbGl6ZU1lc2hEZXB0aE1hdGVyaWFsKGd1aSwgZ3JvdXAsIG1hdGVyaWFsKVxufSlcbiIsImltcG9ydCAqIGFzIFNjZW5lVXRpbHMgZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL3V0aWxzL1NjZW5lVXRpbHMnXG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcbmltcG9ydCB7IHJhbmRvbUNvbG9yIH0gZnJvbSAnLi4vdXRpbC9jb2xvclV0aWwuanMnXG5pbXBvcnQgeyByYW5kb21WZWN0b3IgfSBmcm9tICcuLi91dGlsL3Bvc2l0aW9uVXRpbC5qcydcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVBZGRSZW1vdmVDdWJlQ29udHJvbHMgPSAoZ3VpLCBwYXJlbnQsIG1hdGVyaWFsKSA9PiB7XG4gIGNvbnN0IGFkZFJlbW92ZVByb3BzID0ge1xuICAgIGFkZEN1YmU6ICgpID0+IGFkZEN1YmUocGFyZW50LCBtYXRlcmlhbCksXG4gICAgcmVtb3ZlQ3ViZTogKCkgPT4gcmVtb3ZlQ3ViZShwYXJlbnQpXG4gIH1cblxuICBndWkuYWRkKGFkZFJlbW92ZVByb3BzLCAnYWRkQ3ViZScpXG4gIGd1aS5hZGQoYWRkUmVtb3ZlUHJvcHMsICdyZW1vdmVDdWJlJylcbn1cblxuY29uc3QgYWRkQ3ViZSA9IChwYXJlbnQsIG1hdGVyaWFsKSA9PiB7XG4gIGNvbnN0IGNvbG9yID0gcmFuZG9tQ29sb3IoKVxuICBjb25zdCBwb3MgPSByYW5kb21WZWN0b3Ioe1xuICAgIHhSYW5nZTogeyBmcm9tWDogLTQsIHRvWDogNCB9LFxuICAgIHlSYW5nZTogeyBmcm9tWTogLTMsIHRvWTogMyB9LFxuICAgIHpSYW5nZTogeyBmcm9tWjogLTQsIHRvWjogNCB9XG4gIH0pXG5cbiAgY29uc3Qgcm90YXRpb24gPSByYW5kb21WZWN0b3Ioe1xuICAgIHhSYW5nZTogeyBmcm9tWDogMCwgdG9YOiBNYXRoLlBJICogMiB9LFxuICAgIHlSYW5nZTogeyBmcm9tWTogMCwgdG9ZOiBNYXRoLlBJICogMiB9LFxuICAgIHpSYW5nZTogeyBmcm9tWjogMCwgdG9aOiBNYXRoLlBJICogMiB9XG4gIH0pXG5cbiAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoMC41LCAwLjUsIDAuNSlcbiAgY29uc3QgY3ViZU1hdGVyaWFsID1cbiAgICBtYXRlcmlhbCA/P1xuICAgIG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7XG4gICAgICBjb2xvcjogY29sb3IsXG4gICAgICByb3VnaG5lc3M6IDAuMSxcbiAgICAgIG1ldGFsbmVzczogMC45XG4gICAgfSlcblxuICBsZXQgY3ViZVxuXG4gIGlmIChBcnJheS5pc0FycmF5KGN1YmVNYXRlcmlhbCkpIHtcbiAgICBjdWJlID0gU2NlbmVVdGlscy5jcmVhdGVNdWx0aU1hdGVyaWFsT2JqZWN0KGdlb21ldHJ5LCBjdWJlTWF0ZXJpYWwpXG4gIH0gZWxzZSB7XG4gICAgY3ViZSA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBjdWJlTWF0ZXJpYWwpXG4gIH1cbiAgY3ViZS5uYW1lID0gJ2N1YmUtJyArIHBhcmVudC5jaGlsZHJlbi5sZW5ndGhcbiAgY3ViZS5wb3NpdGlvbi5jb3B5KHBvcylcbiAgY3ViZS5yb3RhdGlvbi5zZXRGcm9tVmVjdG9yMyhyb3RhdGlvbilcbiAgY3ViZS5jYXN0U2hhZG93ID0gdHJ1ZVxuICBwYXJlbnQuYWRkKGN1YmUpXG59XG5cbmNvbnN0IHJlbW92ZUN1YmUgPSAocGFyZW50KSA9PiB7XG4gIHBhcmVudC5jaGlsZHJlbi5wb3AoKVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5cbmNvbnN0IHBlcnNwZWN0aXZlTmFtZSA9ICdQZXJzcGVjdGl2ZSBDYW1lcmEnXG5jb25zdCBvcnRob05hbWUgPSAnT3J0aG9ncmFwaGljIENhbWVyYSdcblxuLy8gVE9ETzogY2hlY2sgdGhlIGxvb2thdFxuY29uc3QgbG9va0F0UHJvcHMgPSAoKSA9PiAoe1xuICBsb29rQXRYOiAwLFxuICBsb29rQXRZOiAwLFxuICBsb29rQXRaOiAwXG59KVxuXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZVBlcnNwZWN0aXZlQ2FtZXJhQ29udHJvbHMgPSAoY2FtZXJhLCBndWksIG9yYml0Q29udHJvbHMsIGlzT3BlbikgPT4ge1xuICBjb25zdCB2ZWN0b3JQcm9wcyA9IGxvb2tBdFByb3BzKGNhbWVyYSlcblxuICBjb25zdCBwcm9wcyA9IHtcbiAgICBmb3Y6IGNhbWVyYS5mb3YsXG4gICAgYXNwZWN0OiBjYW1lcmEuYXNwZWN0LFxuICAgIG5lYXI6IGNhbWVyYS5uZWFyLFxuICAgIGZhcjogY2FtZXJhLmZhcixcbiAgICB6b29tOiBjYW1lcmEuem9vbVxuICB9XG5cbiAgcmVtb3ZlSWZQcmVzZW50KGd1aSwgcGVyc3BlY3RpdmVOYW1lKVxuICByZW1vdmVJZlByZXNlbnQoZ3VpLCBvcnRob05hbWUpXG5cbiAgY29uc3QgY2FtZXJhRm9sZGVyID0gZ3VpLmFkZEZvbGRlcihwZXJzcGVjdGl2ZU5hbWUpXG4gIGNhbWVyYUZvbGRlci5hZGQocHJvcHMsICdmb3YnLCAwLCAxODAsIDEpXG4gIGNhbWVyYUZvbGRlci5hZGQocHJvcHMsICdhc3BlY3QnLCAwLCAxMCwgMC4xKVxuICBjYW1lcmFGb2xkZXIuYWRkKHByb3BzLCAnbmVhcicsIDAsIDIwLCAwLjEpXG4gIGNhbWVyYUZvbGRlci5hZGQocHJvcHMsICdmYXInLCA1LCAxMDAsIDAuMSlcbiAgY2FtZXJhRm9sZGVyLmFkZChwcm9wcywgJ3pvb20nLCAtMSwgMTAsIDAuMSlcblxuICBjYW1lcmFGb2xkZXIuYWRkKHZlY3RvclByb3BzLCAnbG9va0F0WCcsIC0xMCwgMTAsIDAuMSlcbiAgY2FtZXJhRm9sZGVyLmFkZCh2ZWN0b3JQcm9wcywgJ2xvb2tBdFknLCAtMTAsIDEwLCAwLjEpXG4gIGNhbWVyYUZvbGRlci5hZGQodmVjdG9yUHJvcHMsICdsb29rQXRaJywgLTEwLCAxMCwgMC4xKVxuXG4gIGNhbWVyYUZvbGRlci5vbkNoYW5nZSgoKSA9PiB7XG4gICAgY2FtZXJhLmZvdiA9IHByb3BzLmZvdlxuICAgIGNhbWVyYS5hc3BlY3QgPSBwcm9wcy5hc3BlY3RcbiAgICBjYW1lcmEubmVhciA9IHByb3BzLm5lYXJcbiAgICBjYW1lcmEuZmFyID0gcHJvcHMuZmFyXG4gICAgY2FtZXJhLnpvb20gPSBwcm9wcy56b29tXG5cbiAgICBjYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpXG5cbiAgICAvLyBzaW5jZSB3ZSdyZSB1c2luZyBhIGNvbnRyb2wsIHdlIGFsc28gbmVlZCB0byBzZXQgdGhhdCB0YXJnZXRcbiAgICBvcmJpdENvbnRyb2xzLnRhcmdldC5zZXQodmVjdG9yUHJvcHMubG9va0F0WCwgdmVjdG9yUHJvcHMubG9va0F0WSwgdmVjdG9yUHJvcHMubG9va0F0WilcbiAgICBvcmJpdENvbnRyb2xzLnVwZGF0ZSgpXG4gIH0pXG5cbiAgaXNPcGVuID8gY2FtZXJhRm9sZGVyLm9wZW4oKSA6IGNhbWVyYUZvbGRlci5jbG9zZSgpXG59XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsaXplT3J0aG9ncmFwaGljQ2FtZXJhQ29udHJvbHMgPSAoY2FtZXJhLCBndWksIG9yYml0Q29udHJvbHMpID0+IHtcbiAgY29uc3QgdmVjdG9yUHJvcHMgPSBsb29rQXRQcm9wcyhjYW1lcmEpXG5cbiAgY29uc3QgcHJvcHMgPSB7XG4gICAgbGVmdDogY2FtZXJhLmxlZnQsXG4gICAgcmlnaHQ6IGNhbWVyYS5yaWdodCxcbiAgICB0b3A6IGNhbWVyYS50b3AsXG4gICAgYm90dG9tOiBjYW1lcmEuYm90dG9tLFxuICAgIG5lYXI6IGNhbWVyYS5uZWFyLFxuICAgIGZhcjogY2FtZXJhLmZhcixcbiAgICB6b29tOiBjYW1lcmEuem9vbVxuICB9XG5cbiAgcmVtb3ZlSWZQcmVzZW50KGd1aSwgcGVyc3BlY3RpdmVOYW1lKVxuICByZW1vdmVJZlByZXNlbnQoZ3VpLCBvcnRob05hbWUpXG5cbiAgY29uc3QgY2FtZXJhRm9sZGVyID0gZ3VpLmFkZEZvbGRlcihvcnRob05hbWUpXG4gIGNhbWVyYUZvbGRlci5hZGQocHJvcHMsICdsZWZ0JywgLTQwMCwgLTEwLCAxKVxuICBjYW1lcmFGb2xkZXIuYWRkKHByb3BzLCAncmlnaHQnLCAxMCwgNDAwLCAxKVxuICBjYW1lcmFGb2xkZXIuYWRkKHByb3BzLCAndG9wJywgMCwgMjAwLCAxKVxuICBjYW1lcmFGb2xkZXIuYWRkKHByb3BzLCAnYm90dG9tJywgLTIwMCwgMCwgMSlcbiAgY2FtZXJhRm9sZGVyLmFkZChwcm9wcywgJ25lYXInLCAtMjAsIDEwLCAxKVxuICBjYW1lcmFGb2xkZXIuYWRkKHByb3BzLCAnZmFyJywgMSwgMTAwLCAxKVxuICBjYW1lcmFGb2xkZXIuYWRkKHByb3BzLCAnem9vbScsIDEsIDEwMCwgMSlcbiAgY2FtZXJhRm9sZGVyLmFkZCh2ZWN0b3JQcm9wcywgJ2xvb2tBdFgnLCAtMTAsIDEwLCAwLjEpXG4gIGNhbWVyYUZvbGRlci5hZGQodmVjdG9yUHJvcHMsICdsb29rQXRZJywgLTEwLCAxMCwgMC4xKVxuICBjYW1lcmFGb2xkZXIuYWRkKHZlY3RvclByb3BzLCAnbG9va0F0WicsIC0xMCwgMTAsIDAuMSlcblxuICBjYW1lcmFGb2xkZXIub25DaGFuZ2UoKCkgPT4ge1xuICAgIGNhbWVyYS5sZWZ0ID0gcHJvcHMubGVmdFxuICAgIGNhbWVyYS5yaWdodCA9IHByb3BzLnJpZ2h0XG4gICAgY2FtZXJhLnRvcCA9IHByb3BzLnRvcFxuICAgIGNhbWVyYS5ib3R0b20gPSBwcm9wcy5ib3R0b21cbiAgICBjYW1lcmEubmVhciA9IHByb3BzLm5lYXJcbiAgICBjYW1lcmEuZmFyID0gcHJvcHMuZmFyXG4gICAgY2FtZXJhLnpvb20gPSBwcm9wcy56b29tXG4gICAgY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKVxuXG4gICAgY2FtZXJhLmxvb2tBdChuZXcgVEhSRUUuVmVjdG9yMyh2ZWN0b3JQcm9wcy5sb29rQXRYLCB2ZWN0b3JQcm9wcy5sb29rQXRZLCB2ZWN0b3JQcm9wcy5sb29rQXRaKSlcblxuICAgIC8vIHNpbmNlIHdlJ3JlIHVzaW5nIGEgY29udHJvbCwgd2UgYWxzbyBuZWVkIHRvIHNldCB0aGF0IHRhcmdldFxuICAgIG9yYml0Q29udHJvbHMudGFyZ2V0LnNldCh2ZWN0b3JQcm9wcy5sb29rQXRYLCB2ZWN0b3JQcm9wcy5sb29rQXRZLCB2ZWN0b3JQcm9wcy5sb29rQXRaKVxuXG4gICAgb3JiaXRDb250cm9scy51cGRhdGUoKVxuICB9KVxufVxuXG5jb25zdCByZW1vdmVJZlByZXNlbnQgPSAoZ3VpLCBuYW1lKSA9PiB7XG4gIGZvciAoY29uc3QgZm9sZGVyIG9mIGd1aS5mb2xkZXJzUmVjdXJzaXZlKCkpIHtcbiAgICBpZiAoZm9sZGVyLl90aXRsZSA9PT0gbmFtZSkge1xuICAgICAgZm9sZGVyLmRlc3Ryb3koKVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5cbmV4cG9ydCBjb25zdCByYW5kb21Db2xvciA9ICgpID0+IHtcbiAgdmFyIHIgPSBNYXRoLnJhbmRvbSgpLFxuICAgIGcgPSBNYXRoLnJhbmRvbSgpLFxuICAgIGIgPSBNYXRoLnJhbmRvbSgpXG4gIHJldHVybiBuZXcgVEhSRUUuQ29sb3IociwgZywgYilcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuXG5leHBvcnQgY29uc3QgcmFuZG9tVmVjdG9yID0gKHtcbiAgeFJhbmdlOiB7IGZyb21YLCB0b1ggfSxcbiAgeVJhbmdlOiB7IGZyb21ZLCB0b1kgfSxcbiAgelJhbmdlOiB7IGZyb21aLCB0b1ogfSxcbn0pID0+IHtcbiAgY29uc3QgeCA9IE1hdGgucmFuZG9tKCkgKiAodG9YIC0gZnJvbVgpICsgZnJvbVg7XG4gIGNvbnN0IHkgPSBNYXRoLnJhbmRvbSgpICogKHRvWSAtIGZyb21ZKSArIGZyb21ZO1xuICBjb25zdCB6ID0gTWF0aC5yYW5kb20oKSAqICh0b1ogLSBmcm9tWikgKyBmcm9tWjtcblxuICByZXR1cm4gbmV3IFRIUkVFLlZlY3RvcjMoeCwgeSwgeik7XG59O1xuIiwiaW1wb3J0IHtcblx0QnVmZmVyR2VvbWV0cnksXG5cdEZsb2F0MzJCdWZmZXJBdHRyaWJ1dGUsXG5cdExpbmVTZWdtZW50cyxcblx0TGluZUJhc2ljTWF0ZXJpYWwsXG5cdE1hdHJpeDMsXG5cdFZlY3RvcjNcbn0gZnJvbSAndGhyZWUnO1xuXG5jb25zdCBfdjEgPSBuZXcgVmVjdG9yMygpO1xuY29uc3QgX3YyID0gbmV3IFZlY3RvcjMoKTtcbmNvbnN0IF9ub3JtYWxNYXRyaXggPSBuZXcgTWF0cml4MygpO1xuXG5jbGFzcyBWZXJ0ZXhOb3JtYWxzSGVscGVyIGV4dGVuZHMgTGluZVNlZ21lbnRzIHtcblxuXHRjb25zdHJ1Y3Rvciggb2JqZWN0LCBzaXplID0gMSwgY29sb3IgPSAweGZmMDAwMCApIHtcblxuXHRcdGNvbnN0IGdlb21ldHJ5ID0gbmV3IEJ1ZmZlckdlb21ldHJ5KCk7XG5cblx0XHRjb25zdCBuTm9ybWFscyA9IG9iamVjdC5nZW9tZXRyeS5hdHRyaWJ1dGVzLm5vcm1hbC5jb3VudDtcblx0XHRjb25zdCBwb3NpdGlvbnMgPSBuZXcgRmxvYXQzMkJ1ZmZlckF0dHJpYnV0ZSggbk5vcm1hbHMgKiAyICogMywgMyApO1xuXG5cdFx0Z2VvbWV0cnkuc2V0QXR0cmlidXRlKCAncG9zaXRpb24nLCBwb3NpdGlvbnMgKTtcblxuXHRcdHN1cGVyKCBnZW9tZXRyeSwgbmV3IExpbmVCYXNpY01hdGVyaWFsKCB7IGNvbG9yLCB0b25lTWFwcGVkOiBmYWxzZSB9ICkgKTtcblxuXHRcdHRoaXMub2JqZWN0ID0gb2JqZWN0O1xuXHRcdHRoaXMuc2l6ZSA9IHNpemU7XG5cdFx0dGhpcy50eXBlID0gJ1ZlcnRleE5vcm1hbHNIZWxwZXInO1xuXG5cdFx0Ly9cblxuXHRcdHRoaXMubWF0cml4QXV0b1VwZGF0ZSA9IGZhbHNlO1xuXG5cdFx0dGhpcy51cGRhdGUoKTtcblxuXHR9XG5cblx0dXBkYXRlKCkge1xuXG5cdFx0dGhpcy5vYmplY3QudXBkYXRlTWF0cml4V29ybGQoIHRydWUgKTtcblxuXHRcdF9ub3JtYWxNYXRyaXguZ2V0Tm9ybWFsTWF0cml4KCB0aGlzLm9iamVjdC5tYXRyaXhXb3JsZCApO1xuXG5cdFx0Y29uc3QgbWF0cml4V29ybGQgPSB0aGlzLm9iamVjdC5tYXRyaXhXb3JsZDtcblxuXHRcdGNvbnN0IHBvc2l0aW9uID0gdGhpcy5nZW9tZXRyeS5hdHRyaWJ1dGVzLnBvc2l0aW9uO1xuXG5cdFx0Ly9cblxuXHRcdGNvbnN0IG9iakdlb21ldHJ5ID0gdGhpcy5vYmplY3QuZ2VvbWV0cnk7XG5cblx0XHRpZiAoIG9iakdlb21ldHJ5ICkge1xuXG5cdFx0XHRjb25zdCBvYmpQb3MgPSBvYmpHZW9tZXRyeS5hdHRyaWJ1dGVzLnBvc2l0aW9uO1xuXG5cdFx0XHRjb25zdCBvYmpOb3JtID0gb2JqR2VvbWV0cnkuYXR0cmlidXRlcy5ub3JtYWw7XG5cblx0XHRcdGxldCBpZHggPSAwO1xuXG5cdFx0XHQvLyBmb3Igc2ltcGxpY2l0eSwgaWdub3JlIGluZGV4IGFuZCBkcmF3Y2FsbHMsIGFuZCByZW5kZXIgZXZlcnkgbm9ybWFsXG5cblx0XHRcdGZvciAoIGxldCBqID0gMCwgamwgPSBvYmpQb3MuY291bnQ7IGogPCBqbDsgaiArKyApIHtcblxuXHRcdFx0XHRfdjEuZnJvbUJ1ZmZlckF0dHJpYnV0ZSggb2JqUG9zLCBqICkuYXBwbHlNYXRyaXg0KCBtYXRyaXhXb3JsZCApO1xuXG5cdFx0XHRcdF92Mi5mcm9tQnVmZmVyQXR0cmlidXRlKCBvYmpOb3JtLCBqICk7XG5cblx0XHRcdFx0X3YyLmFwcGx5TWF0cml4MyggX25vcm1hbE1hdHJpeCApLm5vcm1hbGl6ZSgpLm11bHRpcGx5U2NhbGFyKCB0aGlzLnNpemUgKS5hZGQoIF92MSApO1xuXG5cdFx0XHRcdHBvc2l0aW9uLnNldFhZWiggaWR4LCBfdjEueCwgX3YxLnksIF92MS56ICk7XG5cblx0XHRcdFx0aWR4ID0gaWR4ICsgMTtcblxuXHRcdFx0XHRwb3NpdGlvbi5zZXRYWVooIGlkeCwgX3YyLngsIF92Mi55LCBfdjIueiApO1xuXG5cdFx0XHRcdGlkeCA9IGlkeCArIDE7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdHBvc2l0aW9uLm5lZWRzVXBkYXRlID0gdHJ1ZTtcblxuXHR9XG5cbn1cblxuXG5leHBvcnQgeyBWZXJ0ZXhOb3JtYWxzSGVscGVyIH07XG4iLCJpbXBvcnQge1xuXHRHcm91cCxcblx0TWVzaCxcblx0QnVmZmVyQXR0cmlidXRlLFxuXHRCdWZmZXJHZW9tZXRyeVxufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7IG1lcmdlR3JvdXBzIH0gZnJvbSAnLi9CdWZmZXJHZW9tZXRyeVV0aWxzLmpzJztcblxuZnVuY3Rpb24gY3JlYXRlTWVzaGVzRnJvbUluc3RhbmNlZE1lc2goIGluc3RhbmNlZE1lc2ggKSB7XG5cblx0Y29uc3QgZ3JvdXAgPSBuZXcgR3JvdXAoKTtcblxuXHRjb25zdCBjb3VudCA9IGluc3RhbmNlZE1lc2guY291bnQ7XG5cdGNvbnN0IGdlb21ldHJ5ID0gaW5zdGFuY2VkTWVzaC5nZW9tZXRyeTtcblx0Y29uc3QgbWF0ZXJpYWwgPSBpbnN0YW5jZWRNZXNoLm1hdGVyaWFsO1xuXG5cdGZvciAoIGxldCBpID0gMDsgaSA8IGNvdW50OyBpICsrICkge1xuXG5cdFx0Y29uc3QgbWVzaCA9IG5ldyBNZXNoKCBnZW9tZXRyeSwgbWF0ZXJpYWwgKTtcblxuXHRcdGluc3RhbmNlZE1lc2guZ2V0TWF0cml4QXQoIGksIG1lc2gubWF0cml4ICk7XG5cdFx0bWVzaC5tYXRyaXguZGVjb21wb3NlKCBtZXNoLnBvc2l0aW9uLCBtZXNoLnF1YXRlcm5pb24sIG1lc2guc2NhbGUgKTtcblxuXHRcdGdyb3VwLmFkZCggbWVzaCApO1xuXG5cdH1cblxuXHRncm91cC5jb3B5KCBpbnN0YW5jZWRNZXNoICk7XG5cdGdyb3VwLnVwZGF0ZU1hdHJpeFdvcmxkKCk7IC8vIGVuc3VyZSBjb3JyZWN0IHdvcmxkIG1hdHJpY2VzIG9mIG1lc2hlc1xuXG5cdHJldHVybiBncm91cDtcblxufVxuXG5mdW5jdGlvbiBjcmVhdGVNZXNoZXNGcm9tTXVsdGlNYXRlcmlhbE1lc2goIG1lc2ggKSB7XG5cblx0aWYgKCBBcnJheS5pc0FycmF5KCBtZXNoLm1hdGVyaWFsICkgPT09IGZhbHNlICkge1xuXG5cdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuU2NlbmVVdGlscy5jcmVhdGVNZXNoZXNGcm9tTXVsdGlNYXRlcmlhbE1lc2goKTogVGhlIGdpdmVuIG1lc2ggaGFzIG5vIG11bHRpcGxlIG1hdGVyaWFscy4nICk7XG5cdFx0cmV0dXJuIG1lc2g7XG5cblx0fVxuXG5cdGNvbnN0IG9iamVjdCA9IG5ldyBHcm91cCgpO1xuXHRvYmplY3QuY29weSggbWVzaCApO1xuXG5cdC8vIG1lcmdlIGdyb3VwcyAod2hpY2ggYXV0b21hdGljYWxseSBzb3J0cyB0aGVtKVxuXG5cdGNvbnN0IGdlb21ldHJ5ID0gbWVyZ2VHcm91cHMoIG1lc2guZ2VvbWV0cnkgKTtcblxuXHRjb25zdCBpbmRleCA9IGdlb21ldHJ5LmluZGV4O1xuXHRjb25zdCBncm91cHMgPSBnZW9tZXRyeS5ncm91cHM7XG5cdGNvbnN0IGF0dHJpYnV0ZU5hbWVzID0gT2JqZWN0LmtleXMoIGdlb21ldHJ5LmF0dHJpYnV0ZXMgKTtcblxuXHQvLyBjcmVhdGUgYSBtZXNoIGZvciBlYWNoIGdyb3VwIGJ5IGV4dHJhY3RpbmcgdGhlIGJ1ZmZlciBkYXRhIGludG8gYSBuZXcgZ2VvbWV0cnlcblxuXHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBncm91cHMubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0Y29uc3QgZ3JvdXAgPSBncm91cHNbIGkgXTtcblxuXHRcdGNvbnN0IHN0YXJ0ID0gZ3JvdXAuc3RhcnQ7XG5cdFx0Y29uc3QgZW5kID0gc3RhcnQgKyBncm91cC5jb3VudDtcblxuXHRcdGNvbnN0IG5ld0dlb21ldHJ5ID0gbmV3IEJ1ZmZlckdlb21ldHJ5KCk7XG5cdFx0Y29uc3QgbmV3TWF0ZXJpYWwgPSBtZXNoLm1hdGVyaWFsWyBncm91cC5tYXRlcmlhbEluZGV4IF07XG5cblx0XHQvLyBwcm9jZXNzIGFsbCBidWZmZXIgYXR0cmlidXRlc1xuXG5cdFx0Zm9yICggbGV0IGogPSAwOyBqIDwgYXR0cmlidXRlTmFtZXMubGVuZ3RoOyBqICsrICkge1xuXG5cdFx0XHRjb25zdCBuYW1lID0gYXR0cmlidXRlTmFtZXNbIGogXTtcblx0XHRcdGNvbnN0IGF0dHJpYnV0ZSA9IGdlb21ldHJ5LmF0dHJpYnV0ZXNbIG5hbWUgXTtcblx0XHRcdGNvbnN0IGl0ZW1TaXplID0gYXR0cmlidXRlLml0ZW1TaXplO1xuXG5cdFx0XHRjb25zdCBuZXdMZW5ndGggPSBncm91cC5jb3VudCAqIGl0ZW1TaXplO1xuXHRcdFx0Y29uc3QgdHlwZSA9IGF0dHJpYnV0ZS5hcnJheS5jb25zdHJ1Y3RvcjtcblxuXHRcdFx0Y29uc3QgbmV3QXJyYXkgPSBuZXcgdHlwZSggbmV3TGVuZ3RoICk7XG5cdFx0XHRjb25zdCBuZXdBdHRyaWJ1dGUgPSBuZXcgQnVmZmVyQXR0cmlidXRlKCBuZXdBcnJheSwgaXRlbVNpemUgKTtcblxuXHRcdFx0Zm9yICggbGV0IGsgPSBzdGFydCwgbiA9IDA7IGsgPCBlbmQ7IGsgKyssIG4gKysgKSB7XG5cblx0XHRcdFx0Y29uc3QgaW5kID0gaW5kZXguZ2V0WCggayApO1xuXG5cdFx0XHRcdGlmICggaXRlbVNpemUgPj0gMSApIG5ld0F0dHJpYnV0ZS5zZXRYKCBuLCBhdHRyaWJ1dGUuZ2V0WCggaW5kICkgKTtcblx0XHRcdFx0aWYgKCBpdGVtU2l6ZSA+PSAyICkgbmV3QXR0cmlidXRlLnNldFkoIG4sIGF0dHJpYnV0ZS5nZXRZKCBpbmQgKSApO1xuXHRcdFx0XHRpZiAoIGl0ZW1TaXplID49IDMgKSBuZXdBdHRyaWJ1dGUuc2V0WiggbiwgYXR0cmlidXRlLmdldFooIGluZCApICk7XG5cdFx0XHRcdGlmICggaXRlbVNpemUgPj0gNCApIG5ld0F0dHJpYnV0ZS5zZXRXKCBuLCBhdHRyaWJ1dGUuZ2V0VyggaW5kICkgKTtcblxuXHRcdFx0fVxuXG5cblx0XHRcdG5ld0dlb21ldHJ5LnNldEF0dHJpYnV0ZSggbmFtZSwgbmV3QXR0cmlidXRlICk7XG5cblx0XHR9XG5cblx0XHRjb25zdCBuZXdNZXNoID0gbmV3IE1lc2goIG5ld0dlb21ldHJ5LCBuZXdNYXRlcmlhbCApO1xuXHRcdG9iamVjdC5hZGQoIG5ld01lc2ggKTtcblxuXHR9XG5cblx0cmV0dXJuIG9iamVjdDtcblxufVxuXG5mdW5jdGlvbiBjcmVhdGVNdWx0aU1hdGVyaWFsT2JqZWN0KCBnZW9tZXRyeSwgbWF0ZXJpYWxzICkge1xuXG5cdGNvbnN0IGdyb3VwID0gbmV3IEdyb3VwKCk7XG5cblx0Zm9yICggbGV0IGkgPSAwLCBsID0gbWF0ZXJpYWxzLmxlbmd0aDsgaSA8IGw7IGkgKysgKSB7XG5cblx0XHRncm91cC5hZGQoIG5ldyBNZXNoKCBnZW9tZXRyeSwgbWF0ZXJpYWxzWyBpIF0gKSApO1xuXG5cdH1cblxuXHRyZXR1cm4gZ3JvdXA7XG5cbn1cblxuZnVuY3Rpb24gZGV0YWNoKCBjaGlsZCwgcGFyZW50LCBzY2VuZSApIHtcblxuXHRjb25zb2xlLndhcm4oICdUSFJFRS5TY2VuZVV0aWxzOiBkZXRhY2goKSBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2Ugc2NlbmUuYXR0YWNoKCBjaGlsZCApIGluc3RlYWQuJyApO1xuXG5cdHNjZW5lLmF0dGFjaCggY2hpbGQgKTtcblxufVxuXG5mdW5jdGlvbiBhdHRhY2goIGNoaWxkLCBzY2VuZSwgcGFyZW50ICkge1xuXG5cdGNvbnNvbGUud2FybiggJ1RIUkVFLlNjZW5lVXRpbHM6IGF0dGFjaCgpIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFVzZSBwYXJlbnQuYXR0YWNoKCBjaGlsZCApIGluc3RlYWQuJyApO1xuXG5cdHBhcmVudC5hdHRhY2goIGNoaWxkICk7XG5cbn1cblxuXG5cbmV4cG9ydCB7XG5cdGNyZWF0ZU1lc2hlc0Zyb21JbnN0YW5jZWRNZXNoLFxuXHRjcmVhdGVNZXNoZXNGcm9tTXVsdGlNYXRlcmlhbE1lc2gsXG5cdGNyZWF0ZU11bHRpTWF0ZXJpYWxPYmplY3QsXG5cdGRldGFjaCxcblx0YXR0YWNoLFxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWVzaC1kZXB0aC1tYXRlcmlhbFwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtsdGpzX2ZvdXJ0aFwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtsdGpzX2ZvdXJ0aFwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfYnVpbGRfdGhyZWVfbW9kdWxlX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fY29udHJvbHNfT3JiaXRDb250cm9sc19qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfbGlsLWd1aV9kaXN0X2xpbC1ndWlfZXNtX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fdXRpbHNfQnVmZmVyR2VvbWV0cnlVdGlsc19qc1wiLFwic2FtcGxlc19ib290c3RyYXBfYm9vdHN0cmFwX2pzLXNhbXBsZXNfY29udHJvbHNfbWF0ZXJpYWwtY29udHJvbHNfanMtc2FtcGxlc19jb250cm9sc19yZW5kZXJlLWM4N2Q4YVwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci00L21lc2gtZGVwdGgtbWF0ZXJpYWwuanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
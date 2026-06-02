/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./samples/chapters/chapter-4/combining-materials.js"
/*!***********************************************************!*\
  !*** ./samples/chapters/chapter-4/combining-materials.js ***!
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
/* harmony import */ var _controls_scene_controls__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../controls/scene-controls */ "./samples/controls/scene-controls.js");










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

  const material1 = new three__WEBPACK_IMPORTED_MODULE_0__.MeshDepthMaterial()
  const material2 = new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({ color: 0xffff00 })
  const material = [material2, material1]
  const group = new three__WEBPACK_IMPORTED_MODULE_0__.Group()
  scene.add(group)

  ;(0,_controls_renderer_control__WEBPACK_IMPORTED_MODULE_2__.intializeRendererControls)(gui, renderer)
  ;(0,_controls_camera_controls__WEBPACK_IMPORTED_MODULE_6__.initializePerspectiveCameraControls)(camera, gui, orbitControls)
  ;(0,_controls_scene_controls__WEBPACK_IMPORTED_MODULE_7__.initializeSceneControls)(gui, scene, false, false)
  ;(0,_controls_add_remove_cube_controls__WEBPACK_IMPORTED_MODULE_4__.initializeAddRemoveCubeControls)(gui, group, material)
  ;(0,_controls_material_controls__WEBPACK_IMPORTED_MODULE_5__.initializeGuiMaterial)(gui, group, material2)
  ;(0,_controls_material_controls__WEBPACK_IMPORTED_MODULE_5__.initializeGuiMeshBasicMaterial)(gui, group, material2)
  ;(0,_controls_material_controls__WEBPACK_IMPORTED_MODULE_5__.initializeMeshDepthMaterial)(gui, group, material1)
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
/******/ 			"combining-materials": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","vendors-node_modules_three_examples_jsm_utils_BufferGeometryUtils_js","samples_bootstrap_bootstrap_js-samples_controls_material-controls_js-samples_controls_rendere-c87d8a"], () => (__webpack_require__("./samples/chapters/chapter-4/combining-materials.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1dBQ0EsS0FBSztXQUNMO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFOzs7OztXQzNCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdELEU7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBLDRHOzs7OztVRWhEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItNC9jb21iaW5pbmctbWF0ZXJpYWxzLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jb250cm9scy9hZGQtcmVtb3ZlLWN1YmUtY29udHJvbHMuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NvbnRyb2xzL2NhbWVyYS1jb250cm9scy5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY29udHJvbHMvc2NlbmUtY29udHJvbHMuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL3V0aWwvY29sb3JVdGlsLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy91dGlsL3Bvc2l0aW9uVXRpbC5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL25vZGVfbW9kdWxlcy90aHJlZS9leGFtcGxlcy9qc20vaGVscGVycy9WZXJ0ZXhOb3JtYWxzSGVscGVyLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vbm9kZV9tb2R1bGVzL3RocmVlL2V4YW1wbGVzL2pzbS91dGlscy9TY2VuZVV0aWxzLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5pbXBvcnQgeyBpbml0U2NlbmUgfSBmcm9tICcuLi8uLi9ib290c3RyYXAvYm9vdHN0cmFwJ1xuaW1wb3J0IHsgaW50aWFsaXplUmVuZGVyZXJDb250cm9scyB9IGZyb20gJy4uLy4uL2NvbnRyb2xzL3JlbmRlcmVyLWNvbnRyb2wnXG5cbmltcG9ydCBHVUkgZnJvbSAnbGlsLWd1aSdcbmltcG9ydCB7IGluaXRpYWxpemVBZGRSZW1vdmVDdWJlQ29udHJvbHMgfSBmcm9tICcuLi8uLi9jb250cm9scy9hZGQtcmVtb3ZlLWN1YmUtY29udHJvbHMnXG5pbXBvcnQge1xuICBpbml0aWFsaXplR3VpTWF0ZXJpYWwsXG4gIGluaXRpYWxpemVHdWlNZXNoQmFzaWNNYXRlcmlhbCxcbiAgaW5pdGlhbGl6ZU1lc2hEZXB0aE1hdGVyaWFsXG59IGZyb20gJy4uLy4uL2NvbnRyb2xzL21hdGVyaWFsLWNvbnRyb2xzJ1xuaW1wb3J0IHsgaW5pdGlhbGl6ZVBlcnNwZWN0aXZlQ2FtZXJhQ29udHJvbHMgfSBmcm9tICcuLi8uLi9jb250cm9scy9jYW1lcmEtY29udHJvbHMnXG5pbXBvcnQgeyBpbml0aWFsaXplU2NlbmVDb250cm9scyB9IGZyb20gJy4uLy4uL2NvbnRyb2xzL3NjZW5lLWNvbnRyb2xzJ1xuXG5jb25zdCBwcm9wcyA9IHtcbiAgYmFja2dyb3VuZENvbG9yOiAweGZmZmZmZixcbiAgZm9nQ29sb3I6IDB4ZmZmZmZmXG59XG5cbmNvbnN0IGd1aSA9IG5ldyBHVUkoKVxuXG5pbml0U2NlbmUocHJvcHMpKCh7IHNjZW5lLCBjYW1lcmEsIHJlbmRlcmVyLCBvcmJpdENvbnRyb2xzIH0pID0+IHtcbiAgY2FtZXJhLnBvc2l0aW9uLnNldCgtMywgOCwgMilcbiAgY2FtZXJhLm5lYXIgPSA0XG4gIGNhbWVyYS5mYXIgPSAyMFxuXG4gIGNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KClcbiAgb3JiaXRDb250cm9scy51cGRhdGUoKVxuXG4gIGZ1bmN0aW9uIGFuaW1hdGUoKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpXG4gICAgcmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEpXG4gICAgb3JiaXRDb250cm9scy51cGRhdGUoKVxuICB9XG4gIGFuaW1hdGUoKVxuXG4gIGNvbnN0IG1hdGVyaWFsMSA9IG5ldyBUSFJFRS5NZXNoRGVwdGhNYXRlcmlhbCgpXG4gIGNvbnN0IG1hdGVyaWFsMiA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IGNvbG9yOiAweGZmZmYwMCB9KVxuICBjb25zdCBtYXRlcmlhbCA9IFttYXRlcmlhbDIsIG1hdGVyaWFsMV1cbiAgY29uc3QgZ3JvdXAgPSBuZXcgVEhSRUUuR3JvdXAoKVxuICBzY2VuZS5hZGQoZ3JvdXApXG5cbiAgaW50aWFsaXplUmVuZGVyZXJDb250cm9scyhndWksIHJlbmRlcmVyKVxuICBpbml0aWFsaXplUGVyc3BlY3RpdmVDYW1lcmFDb250cm9scyhjYW1lcmEsIGd1aSwgb3JiaXRDb250cm9scylcbiAgaW5pdGlhbGl6ZVNjZW5lQ29udHJvbHMoZ3VpLCBzY2VuZSwgZmFsc2UsIGZhbHNlKVxuICBpbml0aWFsaXplQWRkUmVtb3ZlQ3ViZUNvbnRyb2xzKGd1aSwgZ3JvdXAsIG1hdGVyaWFsKVxuICBpbml0aWFsaXplR3VpTWF0ZXJpYWwoZ3VpLCBncm91cCwgbWF0ZXJpYWwyKVxuICBpbml0aWFsaXplR3VpTWVzaEJhc2ljTWF0ZXJpYWwoZ3VpLCBncm91cCwgbWF0ZXJpYWwyKVxuICBpbml0aWFsaXplTWVzaERlcHRoTWF0ZXJpYWwoZ3VpLCBncm91cCwgbWF0ZXJpYWwxKVxufSlcbiIsImltcG9ydCAqIGFzIFNjZW5lVXRpbHMgZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL3V0aWxzL1NjZW5lVXRpbHMnXG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcbmltcG9ydCB7IHJhbmRvbUNvbG9yIH0gZnJvbSAnLi4vdXRpbC9jb2xvclV0aWwuanMnXG5pbXBvcnQgeyByYW5kb21WZWN0b3IgfSBmcm9tICcuLi91dGlsL3Bvc2l0aW9uVXRpbC5qcydcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVBZGRSZW1vdmVDdWJlQ29udHJvbHMgPSAoZ3VpLCBwYXJlbnQsIG1hdGVyaWFsKSA9PiB7XG4gIGNvbnN0IGFkZFJlbW92ZVByb3BzID0ge1xuICAgIGFkZEN1YmU6ICgpID0+IGFkZEN1YmUocGFyZW50LCBtYXRlcmlhbCksXG4gICAgcmVtb3ZlQ3ViZTogKCkgPT4gcmVtb3ZlQ3ViZShwYXJlbnQpXG4gIH1cblxuICBndWkuYWRkKGFkZFJlbW92ZVByb3BzLCAnYWRkQ3ViZScpXG4gIGd1aS5hZGQoYWRkUmVtb3ZlUHJvcHMsICdyZW1vdmVDdWJlJylcbn1cblxuY29uc3QgYWRkQ3ViZSA9IChwYXJlbnQsIG1hdGVyaWFsKSA9PiB7XG4gIGNvbnN0IGNvbG9yID0gcmFuZG9tQ29sb3IoKVxuICBjb25zdCBwb3MgPSByYW5kb21WZWN0b3Ioe1xuICAgIHhSYW5nZTogeyBmcm9tWDogLTQsIHRvWDogNCB9LFxuICAgIHlSYW5nZTogeyBmcm9tWTogLTMsIHRvWTogMyB9LFxuICAgIHpSYW5nZTogeyBmcm9tWjogLTQsIHRvWjogNCB9XG4gIH0pXG5cbiAgY29uc3Qgcm90YXRpb24gPSByYW5kb21WZWN0b3Ioe1xuICAgIHhSYW5nZTogeyBmcm9tWDogMCwgdG9YOiBNYXRoLlBJICogMiB9LFxuICAgIHlSYW5nZTogeyBmcm9tWTogMCwgdG9ZOiBNYXRoLlBJICogMiB9LFxuICAgIHpSYW5nZTogeyBmcm9tWjogMCwgdG9aOiBNYXRoLlBJICogMiB9XG4gIH0pXG5cbiAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoMC41LCAwLjUsIDAuNSlcbiAgY29uc3QgY3ViZU1hdGVyaWFsID1cbiAgICBtYXRlcmlhbCA/P1xuICAgIG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7XG4gICAgICBjb2xvcjogY29sb3IsXG4gICAgICByb3VnaG5lc3M6IDAuMSxcbiAgICAgIG1ldGFsbmVzczogMC45XG4gICAgfSlcblxuICBsZXQgY3ViZVxuXG4gIGlmIChBcnJheS5pc0FycmF5KGN1YmVNYXRlcmlhbCkpIHtcbiAgICBjdWJlID0gU2NlbmVVdGlscy5jcmVhdGVNdWx0aU1hdGVyaWFsT2JqZWN0KGdlb21ldHJ5LCBjdWJlTWF0ZXJpYWwpXG4gIH0gZWxzZSB7XG4gICAgY3ViZSA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBjdWJlTWF0ZXJpYWwpXG4gIH1cbiAgY3ViZS5uYW1lID0gJ2N1YmUtJyArIHBhcmVudC5jaGlsZHJlbi5sZW5ndGhcbiAgY3ViZS5wb3NpdGlvbi5jb3B5KHBvcylcbiAgY3ViZS5yb3RhdGlvbi5zZXRGcm9tVmVjdG9yMyhyb3RhdGlvbilcbiAgY3ViZS5jYXN0U2hhZG93ID0gdHJ1ZVxuICBwYXJlbnQuYWRkKGN1YmUpXG59XG5cbmNvbnN0IHJlbW92ZUN1YmUgPSAocGFyZW50KSA9PiB7XG4gIHBhcmVudC5jaGlsZHJlbi5wb3AoKVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5cbmNvbnN0IHBlcnNwZWN0aXZlTmFtZSA9ICdQZXJzcGVjdGl2ZSBDYW1lcmEnXG5jb25zdCBvcnRob05hbWUgPSAnT3J0aG9ncmFwaGljIENhbWVyYSdcblxuLy8gVE9ETzogY2hlY2sgdGhlIGxvb2thdFxuY29uc3QgbG9va0F0UHJvcHMgPSAoKSA9PiAoe1xuICBsb29rQXRYOiAwLFxuICBsb29rQXRZOiAwLFxuICBsb29rQXRaOiAwXG59KVxuXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZVBlcnNwZWN0aXZlQ2FtZXJhQ29udHJvbHMgPSAoY2FtZXJhLCBndWksIG9yYml0Q29udHJvbHMsIGlzT3BlbikgPT4ge1xuICBjb25zdCB2ZWN0b3JQcm9wcyA9IGxvb2tBdFByb3BzKGNhbWVyYSlcblxuICBjb25zdCBwcm9wcyA9IHtcbiAgICBmb3Y6IGNhbWVyYS5mb3YsXG4gICAgYXNwZWN0OiBjYW1lcmEuYXNwZWN0LFxuICAgIG5lYXI6IGNhbWVyYS5uZWFyLFxuICAgIGZhcjogY2FtZXJhLmZhcixcbiAgICB6b29tOiBjYW1lcmEuem9vbVxuICB9XG5cbiAgcmVtb3ZlSWZQcmVzZW50KGd1aSwgcGVyc3BlY3RpdmVOYW1lKVxuICByZW1vdmVJZlByZXNlbnQoZ3VpLCBvcnRob05hbWUpXG5cbiAgY29uc3QgY2FtZXJhRm9sZGVyID0gZ3VpLmFkZEZvbGRlcihwZXJzcGVjdGl2ZU5hbWUpXG4gIGNhbWVyYUZvbGRlci5hZGQocHJvcHMsICdmb3YnLCAwLCAxODAsIDEpXG4gIGNhbWVyYUZvbGRlci5hZGQocHJvcHMsICdhc3BlY3QnLCAwLCAxMCwgMC4xKVxuICBjYW1lcmFGb2xkZXIuYWRkKHByb3BzLCAnbmVhcicsIDAsIDIwLCAwLjEpXG4gIGNhbWVyYUZvbGRlci5hZGQocHJvcHMsICdmYXInLCA1LCAxMDAsIDAuMSlcbiAgY2FtZXJhRm9sZGVyLmFkZChwcm9wcywgJ3pvb20nLCAtMSwgMTAsIDAuMSlcblxuICBjYW1lcmFGb2xkZXIuYWRkKHZlY3RvclByb3BzLCAnbG9va0F0WCcsIC0xMCwgMTAsIDAuMSlcbiAgY2FtZXJhRm9sZGVyLmFkZCh2ZWN0b3JQcm9wcywgJ2xvb2tBdFknLCAtMTAsIDEwLCAwLjEpXG4gIGNhbWVyYUZvbGRlci5hZGQodmVjdG9yUHJvcHMsICdsb29rQXRaJywgLTEwLCAxMCwgMC4xKVxuXG4gIGNhbWVyYUZvbGRlci5vbkNoYW5nZSgoKSA9PiB7XG4gICAgY2FtZXJhLmZvdiA9IHByb3BzLmZvdlxuICAgIGNhbWVyYS5hc3BlY3QgPSBwcm9wcy5hc3BlY3RcbiAgICBjYW1lcmEubmVhciA9IHByb3BzLm5lYXJcbiAgICBjYW1lcmEuZmFyID0gcHJvcHMuZmFyXG4gICAgY2FtZXJhLnpvb20gPSBwcm9wcy56b29tXG5cbiAgICBjYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpXG5cbiAgICAvLyBzaW5jZSB3ZSdyZSB1c2luZyBhIGNvbnRyb2wsIHdlIGFsc28gbmVlZCB0byBzZXQgdGhhdCB0YXJnZXRcbiAgICBvcmJpdENvbnRyb2xzLnRhcmdldC5zZXQodmVjdG9yUHJvcHMubG9va0F0WCwgdmVjdG9yUHJvcHMubG9va0F0WSwgdmVjdG9yUHJvcHMubG9va0F0WilcbiAgICBvcmJpdENvbnRyb2xzLnVwZGF0ZSgpXG4gIH0pXG5cbiAgaXNPcGVuID8gY2FtZXJhRm9sZGVyLm9wZW4oKSA6IGNhbWVyYUZvbGRlci5jbG9zZSgpXG59XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsaXplT3J0aG9ncmFwaGljQ2FtZXJhQ29udHJvbHMgPSAoY2FtZXJhLCBndWksIG9yYml0Q29udHJvbHMpID0+IHtcbiAgY29uc3QgdmVjdG9yUHJvcHMgPSBsb29rQXRQcm9wcyhjYW1lcmEpXG5cbiAgY29uc3QgcHJvcHMgPSB7XG4gICAgbGVmdDogY2FtZXJhLmxlZnQsXG4gICAgcmlnaHQ6IGNhbWVyYS5yaWdodCxcbiAgICB0b3A6IGNhbWVyYS50b3AsXG4gICAgYm90dG9tOiBjYW1lcmEuYm90dG9tLFxuICAgIG5lYXI6IGNhbWVyYS5uZWFyLFxuICAgIGZhcjogY2FtZXJhLmZhcixcbiAgICB6b29tOiBjYW1lcmEuem9vbVxuICB9XG5cbiAgcmVtb3ZlSWZQcmVzZW50KGd1aSwgcGVyc3BlY3RpdmVOYW1lKVxuICByZW1vdmVJZlByZXNlbnQoZ3VpLCBvcnRob05hbWUpXG5cbiAgY29uc3QgY2FtZXJhRm9sZGVyID0gZ3VpLmFkZEZvbGRlcihvcnRob05hbWUpXG4gIGNhbWVyYUZvbGRlci5hZGQocHJvcHMsICdsZWZ0JywgLTQwMCwgLTEwLCAxKVxuICBjYW1lcmFGb2xkZXIuYWRkKHByb3BzLCAncmlnaHQnLCAxMCwgNDAwLCAxKVxuICBjYW1lcmFGb2xkZXIuYWRkKHByb3BzLCAndG9wJywgMCwgMjAwLCAxKVxuICBjYW1lcmFGb2xkZXIuYWRkKHByb3BzLCAnYm90dG9tJywgLTIwMCwgMCwgMSlcbiAgY2FtZXJhRm9sZGVyLmFkZChwcm9wcywgJ25lYXInLCAtMjAsIDEwLCAxKVxuICBjYW1lcmFGb2xkZXIuYWRkKHByb3BzLCAnZmFyJywgMSwgMTAwLCAxKVxuICBjYW1lcmFGb2xkZXIuYWRkKHByb3BzLCAnem9vbScsIDEsIDEwMCwgMSlcbiAgY2FtZXJhRm9sZGVyLmFkZCh2ZWN0b3JQcm9wcywgJ2xvb2tBdFgnLCAtMTAsIDEwLCAwLjEpXG4gIGNhbWVyYUZvbGRlci5hZGQodmVjdG9yUHJvcHMsICdsb29rQXRZJywgLTEwLCAxMCwgMC4xKVxuICBjYW1lcmFGb2xkZXIuYWRkKHZlY3RvclByb3BzLCAnbG9va0F0WicsIC0xMCwgMTAsIDAuMSlcblxuICBjYW1lcmFGb2xkZXIub25DaGFuZ2UoKCkgPT4ge1xuICAgIGNhbWVyYS5sZWZ0ID0gcHJvcHMubGVmdFxuICAgIGNhbWVyYS5yaWdodCA9IHByb3BzLnJpZ2h0XG4gICAgY2FtZXJhLnRvcCA9IHByb3BzLnRvcFxuICAgIGNhbWVyYS5ib3R0b20gPSBwcm9wcy5ib3R0b21cbiAgICBjYW1lcmEubmVhciA9IHByb3BzLm5lYXJcbiAgICBjYW1lcmEuZmFyID0gcHJvcHMuZmFyXG4gICAgY2FtZXJhLnpvb20gPSBwcm9wcy56b29tXG4gICAgY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKVxuXG4gICAgY2FtZXJhLmxvb2tBdChuZXcgVEhSRUUuVmVjdG9yMyh2ZWN0b3JQcm9wcy5sb29rQXRYLCB2ZWN0b3JQcm9wcy5sb29rQXRZLCB2ZWN0b3JQcm9wcy5sb29rQXRaKSlcblxuICAgIC8vIHNpbmNlIHdlJ3JlIHVzaW5nIGEgY29udHJvbCwgd2UgYWxzbyBuZWVkIHRvIHNldCB0aGF0IHRhcmdldFxuICAgIG9yYml0Q29udHJvbHMudGFyZ2V0LnNldCh2ZWN0b3JQcm9wcy5sb29rQXRYLCB2ZWN0b3JQcm9wcy5sb29rQXRZLCB2ZWN0b3JQcm9wcy5sb29rQXRaKVxuXG4gICAgb3JiaXRDb250cm9scy51cGRhdGUoKVxuICB9KVxufVxuXG5jb25zdCByZW1vdmVJZlByZXNlbnQgPSAoZ3VpLCBuYW1lKSA9PiB7XG4gIGZvciAoY29uc3QgZm9sZGVyIG9mIGd1aS5mb2xkZXJzUmVjdXJzaXZlKCkpIHtcbiAgICBpZiAoZm9sZGVyLl90aXRsZSA9PT0gbmFtZSkge1xuICAgICAgZm9sZGVyLmRlc3Ryb3koKVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5cbmNvbnN0IHRleHR1cmVMb2FkZXIgPSBuZXcgVEhSRUUuVGV4dHVyZUxvYWRlcigpXG5cbmNvbnN0IHByb3BlcnRpZXNPYmplY3QgPSAoc2NlbmUpID0+ICh7XG4gIG92ZXJyaWRlTWF0ZXJpYWw6IHtcbiAgICB0b2dnbGU6ICgpID0+IHtcbiAgICAgIGlmIChzY2VuZS5vdmVycmlkZU1hdGVyaWFsICE9PSBudWxsKSB7XG4gICAgICAgIHNjZW5lLm92ZXJyaWRlTWF0ZXJpYWwgPSBudWxsXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY2VuZS5vdmVycmlkZU1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hOb3JtYWxNYXRlcmlhbCgpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBiYWNrR3JvdW5kOiAnV2hpdGUnLFxuICBlbnZpcm9ubWVudDoge1xuICAgIHRvZ2dsZTogKCkgPT4ge1xuICAgICAgaWYgKHNjZW5lLmVudmlyb25tZW50ICE9PSBudWxsKSB7XG4gICAgICAgIHNjZW5lLmVudmlyb25tZW50ID0gbnVsbFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGV4dHVyZUxvYWRlci5sb2FkKCcvYXNzZXRzL2VxdWkuanBlZycsIChsb2FkZWQpID0+IHtcbiAgICAgICAgICBsb2FkZWQubWFwcGluZyA9IFRIUkVFLkVxdWlyZWN0YW5ndWxhclJlZmxlY3Rpb25NYXBwaW5nXG4gICAgICAgICAgc2NlbmUuZW52aXJvbm1lbnQgPSBsb2FkZWRcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pXG5cbmNvbnN0IGZvZ1Byb3BlcnRpZXMgPSAoZm9nKSA9PiAoe1xuICBjb2xvcjogMHhmZmZmZmYsXG4gIG5lYXI6IGZvZy5uZWFyLFxuICBmYXI6IGZvZy5mYXJcbn0pXG5cbmV4cG9ydCBjb25zdCBpbml0aWFsaXplU2NlbmVDb250cm9scyA9IChndWksIHNjZW5lLCBmb2dFbmFibGVkLCBpc09wZW4pID0+IHtcbiAgY29uc3QgcHJvcHMgPSBwcm9wZXJ0aWVzT2JqZWN0KHNjZW5lKVxuICBjb25zdCBzY2VuZUNvbnRyb2xzID0gZ3VpLmFkZEZvbGRlcignU2NlbmUnKVxuXG4gIHNjZW5lQ29udHJvbHNcbiAgICAuYWRkKHByb3BzLCAnYmFja0dyb3VuZCcsIFsnV2hpdGUnLCAnQmxhY2snLCAnTnVsbCcsICdDb2xvcicsICdUZXh0dXJlJywgJ0N1YmVtYXAnXSlcbiAgICAub25DaGFuZ2UoKGV2ZW50KSA9PiBoYW5kbGVCYWNrZ3JvdW5kQ2hhbmdlKGV2ZW50LCBzY2VuZSkpXG4gIHNjZW5lQ29udHJvbHMuYWRkKHByb3BzLm92ZXJyaWRlTWF0ZXJpYWwsICd0b2dnbGUnKS5uYW1lKCdUb2dnbGUgT3ZlcnJpZGUgTWF0ZXJpYWwnKVxuICBzY2VuZUNvbnRyb2xzLmFkZChwcm9wcy5lbnZpcm9ubWVudCwgJ3RvZ2dsZScpLm5hbWUoJ1RvZ2dsZSBFbnZpcm9ubWVudCcpXG5cbiAgaWYgKGZvZ0VuYWJsZWQpIHtcbiAgICBjb25zdCBmb2dDb2xvciA9IG5ldyBUSFJFRS5Db2xvcigweGZmZmZmZilcbiAgICBjb25zdCBmb2cgPSBuZXcgVEhSRUUuRm9nKGZvZ0NvbG9yLCAxLCAyMClcbiAgICBzY2VuZS5mb2cgPSBmb2dcbiAgICBjb25zdCBmb2dQcm9wcyA9IGZvZ1Byb3BlcnRpZXMoZm9nKVxuICAgIGNvbnN0IGZvZ0NvbnRyb2xzID0gc2NlbmVDb250cm9scy5hZGRGb2xkZXIoJ0ZvZycpXG4gICAgZm9nQ29udHJvbHMuYWRkQ29sb3IoZm9nUHJvcHMsICdjb2xvcicpXG4gICAgZm9nQ29udHJvbHMuYWRkKGZvZ1Byb3BzLCAnbmVhcicsIDAsIDEwLCAwLjEpXG4gICAgZm9nQ29udHJvbHMuYWRkKGZvZ1Byb3BzLCAnZmFyJywgMCwgMTAwLCAwLjEpXG5cbiAgICBmb2dDb250cm9scy5vbkNoYW5nZSgoKSA9PiB7XG4gICAgICBmb2cuY29sb3IgPSBmb2dDb2xvci5zZXRIZXgoZm9nUHJvcHMuY29sb3IpXG4gICAgICBmb2cubmVhciA9IGZvZ1Byb3BzLm5lYXJcbiAgICAgIGZvZy5mYXIgPSBmb2dQcm9wcy5mYXJcbiAgICB9KVxuICB9XG5cbiAgaXNPcGVuID8gc2NlbmVDb250cm9scy5vcGVuKCkgOiBzY2VuZUNvbnRyb2xzLmNsb3NlKClcbn1cblxuY29uc3QgaGFuZGxlQmFja2dyb3VuZENoYW5nZSA9IChzZXR0aW5nLCBzY2VuZSkgPT4ge1xuICBzd2l0Y2ggKHNldHRpbmcpIHtcbiAgICBjYXNlICdXaGl0ZSc6XG4gICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbmV3IFRIUkVFLkNvbG9yKDB4ZmZmZmZmKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdCbGFjayc6XG4gICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbmV3IFRIUkVFLkNvbG9yKDB4MDAwMDAwKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdOdWxsJzpcbiAgICAgIHNjZW5lLmJhY2tncm91bmQgPSBudWxsXG4gICAgICBicmVha1xuICAgIGNhc2UgJ0NvbG9yJzpcbiAgICAgIHNjZW5lLmJhY2tncm91bmQgPSBuZXcgVEhSRUUuQ29sb3IoMHg0NGZmNDQpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ1RleHR1cmUnOlxuICAgICAgdGV4dHVyZUxvYWRlci5sb2FkKCcvYXNzZXRzL3RleHR1cmVzL3dvb2QvYWJzdHJhY3QtYW50aXF1ZS1iYWNrZHJvcC0xNjQwMDUuanBnJywgKGxvYWRlZCkgPT4ge1xuICAgICAgICBsb2FkZWQuZW5jb2RpbmcgPSBUSFJFRS5zUkdCRW5jb2RpbmdcbiAgICAgICAgc2NlbmUuYmFja2dyb3VuZCA9IGxvYWRlZFxuICAgICAgICBzY2VuZS5lbnZpcm9ubWVudCA9IG51bGxcbiAgICAgIH0pXG4gICAgICBicmVha1xuICAgIGNhc2UgJ0N1YmVtYXAnOlxuICAgICAgdGV4dHVyZUxvYWRlci5sb2FkKCcvYXNzZXRzL2VxdWkuanBlZycsIChsb2FkZWQpID0+IHtcbiAgICAgICAgbG9hZGVkLm1hcHBpbmcgPSBUSFJFRS5FcXVpcmVjdGFuZ3VsYXJSZWZsZWN0aW9uTWFwcGluZ1xuICAgICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbG9hZGVkXG4gICAgICAgIHNjZW5lLmVudmlyb25tZW50ID0gbG9hZGVkXG4gICAgICB9KVxuXG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICBicmVha1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcblxuZXhwb3J0IGNvbnN0IHJhbmRvbUNvbG9yID0gKCkgPT4ge1xuICB2YXIgciA9IE1hdGgucmFuZG9tKCksXG4gICAgZyA9IE1hdGgucmFuZG9tKCksXG4gICAgYiA9IE1hdGgucmFuZG9tKClcbiAgcmV0dXJuIG5ldyBUSFJFRS5Db2xvcihyLCBnLCBiKVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5cbmV4cG9ydCBjb25zdCByYW5kb21WZWN0b3IgPSAoe1xuICB4UmFuZ2U6IHsgZnJvbVgsIHRvWCB9LFxuICB5UmFuZ2U6IHsgZnJvbVksIHRvWSB9LFxuICB6UmFuZ2U6IHsgZnJvbVosIHRvWiB9LFxufSkgPT4ge1xuICBjb25zdCB4ID0gTWF0aC5yYW5kb20oKSAqICh0b1ggLSBmcm9tWCkgKyBmcm9tWDtcbiAgY29uc3QgeSA9IE1hdGgucmFuZG9tKCkgKiAodG9ZIC0gZnJvbVkpICsgZnJvbVk7XG4gIGNvbnN0IHogPSBNYXRoLnJhbmRvbSgpICogKHRvWiAtIGZyb21aKSArIGZyb21aO1xuXG4gIHJldHVybiBuZXcgVEhSRUUuVmVjdG9yMyh4LCB5LCB6KTtcbn07XG4iLCJpbXBvcnQge1xuXHRCdWZmZXJHZW9tZXRyeSxcblx0RmxvYXQzMkJ1ZmZlckF0dHJpYnV0ZSxcblx0TGluZVNlZ21lbnRzLFxuXHRMaW5lQmFzaWNNYXRlcmlhbCxcblx0TWF0cml4Myxcblx0VmVjdG9yM1xufSBmcm9tICd0aHJlZSc7XG5cbmNvbnN0IF92MSA9IG5ldyBWZWN0b3IzKCk7XG5jb25zdCBfdjIgPSBuZXcgVmVjdG9yMygpO1xuY29uc3QgX25vcm1hbE1hdHJpeCA9IG5ldyBNYXRyaXgzKCk7XG5cbmNsYXNzIFZlcnRleE5vcm1hbHNIZWxwZXIgZXh0ZW5kcyBMaW5lU2VnbWVudHMge1xuXG5cdGNvbnN0cnVjdG9yKCBvYmplY3QsIHNpemUgPSAxLCBjb2xvciA9IDB4ZmYwMDAwICkge1xuXG5cdFx0Y29uc3QgZ2VvbWV0cnkgPSBuZXcgQnVmZmVyR2VvbWV0cnkoKTtcblxuXHRcdGNvbnN0IG5Ob3JtYWxzID0gb2JqZWN0Lmdlb21ldHJ5LmF0dHJpYnV0ZXMubm9ybWFsLmNvdW50O1xuXHRcdGNvbnN0IHBvc2l0aW9ucyA9IG5ldyBGbG9hdDMyQnVmZmVyQXR0cmlidXRlKCBuTm9ybWFscyAqIDIgKiAzLCAzICk7XG5cblx0XHRnZW9tZXRyeS5zZXRBdHRyaWJ1dGUoICdwb3NpdGlvbicsIHBvc2l0aW9ucyApO1xuXG5cdFx0c3VwZXIoIGdlb21ldHJ5LCBuZXcgTGluZUJhc2ljTWF0ZXJpYWwoIHsgY29sb3IsIHRvbmVNYXBwZWQ6IGZhbHNlIH0gKSApO1xuXG5cdFx0dGhpcy5vYmplY3QgPSBvYmplY3Q7XG5cdFx0dGhpcy5zaXplID0gc2l6ZTtcblx0XHR0aGlzLnR5cGUgPSAnVmVydGV4Tm9ybWFsc0hlbHBlcic7XG5cblx0XHQvL1xuXG5cdFx0dGhpcy5tYXRyaXhBdXRvVXBkYXRlID0gZmFsc2U7XG5cblx0XHR0aGlzLnVwZGF0ZSgpO1xuXG5cdH1cblxuXHR1cGRhdGUoKSB7XG5cblx0XHR0aGlzLm9iamVjdC51cGRhdGVNYXRyaXhXb3JsZCggdHJ1ZSApO1xuXG5cdFx0X25vcm1hbE1hdHJpeC5nZXROb3JtYWxNYXRyaXgoIHRoaXMub2JqZWN0Lm1hdHJpeFdvcmxkICk7XG5cblx0XHRjb25zdCBtYXRyaXhXb3JsZCA9IHRoaXMub2JqZWN0Lm1hdHJpeFdvcmxkO1xuXG5cdFx0Y29uc3QgcG9zaXRpb24gPSB0aGlzLmdlb21ldHJ5LmF0dHJpYnV0ZXMucG9zaXRpb247XG5cblx0XHQvL1xuXG5cdFx0Y29uc3Qgb2JqR2VvbWV0cnkgPSB0aGlzLm9iamVjdC5nZW9tZXRyeTtcblxuXHRcdGlmICggb2JqR2VvbWV0cnkgKSB7XG5cblx0XHRcdGNvbnN0IG9ialBvcyA9IG9iakdlb21ldHJ5LmF0dHJpYnV0ZXMucG9zaXRpb247XG5cblx0XHRcdGNvbnN0IG9iak5vcm0gPSBvYmpHZW9tZXRyeS5hdHRyaWJ1dGVzLm5vcm1hbDtcblxuXHRcdFx0bGV0IGlkeCA9IDA7XG5cblx0XHRcdC8vIGZvciBzaW1wbGljaXR5LCBpZ25vcmUgaW5kZXggYW5kIGRyYXdjYWxscywgYW5kIHJlbmRlciBldmVyeSBub3JtYWxcblxuXHRcdFx0Zm9yICggbGV0IGogPSAwLCBqbCA9IG9ialBvcy5jb3VudDsgaiA8IGpsOyBqICsrICkge1xuXG5cdFx0XHRcdF92MS5mcm9tQnVmZmVyQXR0cmlidXRlKCBvYmpQb3MsIGogKS5hcHBseU1hdHJpeDQoIG1hdHJpeFdvcmxkICk7XG5cblx0XHRcdFx0X3YyLmZyb21CdWZmZXJBdHRyaWJ1dGUoIG9iak5vcm0sIGogKTtcblxuXHRcdFx0XHRfdjIuYXBwbHlNYXRyaXgzKCBfbm9ybWFsTWF0cml4ICkubm9ybWFsaXplKCkubXVsdGlwbHlTY2FsYXIoIHRoaXMuc2l6ZSApLmFkZCggX3YxICk7XG5cblx0XHRcdFx0cG9zaXRpb24uc2V0WFlaKCBpZHgsIF92MS54LCBfdjEueSwgX3YxLnogKTtcblxuXHRcdFx0XHRpZHggPSBpZHggKyAxO1xuXG5cdFx0XHRcdHBvc2l0aW9uLnNldFhZWiggaWR4LCBfdjIueCwgX3YyLnksIF92Mi56ICk7XG5cblx0XHRcdFx0aWR4ID0gaWR4ICsgMTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0cG9zaXRpb24ubmVlZHNVcGRhdGUgPSB0cnVlO1xuXG5cdH1cblxufVxuXG5cbmV4cG9ydCB7IFZlcnRleE5vcm1hbHNIZWxwZXIgfTtcbiIsImltcG9ydCB7XG5cdEdyb3VwLFxuXHRNZXNoLFxuXHRCdWZmZXJBdHRyaWJ1dGUsXG5cdEJ1ZmZlckdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHsgbWVyZ2VHcm91cHMgfSBmcm9tICcuL0J1ZmZlckdlb21ldHJ5VXRpbHMuanMnO1xuXG5mdW5jdGlvbiBjcmVhdGVNZXNoZXNGcm9tSW5zdGFuY2VkTWVzaCggaW5zdGFuY2VkTWVzaCApIHtcblxuXHRjb25zdCBncm91cCA9IG5ldyBHcm91cCgpO1xuXG5cdGNvbnN0IGNvdW50ID0gaW5zdGFuY2VkTWVzaC5jb3VudDtcblx0Y29uc3QgZ2VvbWV0cnkgPSBpbnN0YW5jZWRNZXNoLmdlb21ldHJ5O1xuXHRjb25zdCBtYXRlcmlhbCA9IGluc3RhbmNlZE1lc2gubWF0ZXJpYWw7XG5cblx0Zm9yICggbGV0IGkgPSAwOyBpIDwgY291bnQ7IGkgKysgKSB7XG5cblx0XHRjb25zdCBtZXNoID0gbmV3IE1lc2goIGdlb21ldHJ5LCBtYXRlcmlhbCApO1xuXG5cdFx0aW5zdGFuY2VkTWVzaC5nZXRNYXRyaXhBdCggaSwgbWVzaC5tYXRyaXggKTtcblx0XHRtZXNoLm1hdHJpeC5kZWNvbXBvc2UoIG1lc2gucG9zaXRpb24sIG1lc2gucXVhdGVybmlvbiwgbWVzaC5zY2FsZSApO1xuXG5cdFx0Z3JvdXAuYWRkKCBtZXNoICk7XG5cblx0fVxuXG5cdGdyb3VwLmNvcHkoIGluc3RhbmNlZE1lc2ggKTtcblx0Z3JvdXAudXBkYXRlTWF0cml4V29ybGQoKTsgLy8gZW5zdXJlIGNvcnJlY3Qgd29ybGQgbWF0cmljZXMgb2YgbWVzaGVzXG5cblx0cmV0dXJuIGdyb3VwO1xuXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU1lc2hlc0Zyb21NdWx0aU1hdGVyaWFsTWVzaCggbWVzaCApIHtcblxuXHRpZiAoIEFycmF5LmlzQXJyYXkoIG1lc2gubWF0ZXJpYWwgKSA9PT0gZmFsc2UgKSB7XG5cblx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5TY2VuZVV0aWxzLmNyZWF0ZU1lc2hlc0Zyb21NdWx0aU1hdGVyaWFsTWVzaCgpOiBUaGUgZ2l2ZW4gbWVzaCBoYXMgbm8gbXVsdGlwbGUgbWF0ZXJpYWxzLicgKTtcblx0XHRyZXR1cm4gbWVzaDtcblxuXHR9XG5cblx0Y29uc3Qgb2JqZWN0ID0gbmV3IEdyb3VwKCk7XG5cdG9iamVjdC5jb3B5KCBtZXNoICk7XG5cblx0Ly8gbWVyZ2UgZ3JvdXBzICh3aGljaCBhdXRvbWF0aWNhbGx5IHNvcnRzIHRoZW0pXG5cblx0Y29uc3QgZ2VvbWV0cnkgPSBtZXJnZUdyb3VwcyggbWVzaC5nZW9tZXRyeSApO1xuXG5cdGNvbnN0IGluZGV4ID0gZ2VvbWV0cnkuaW5kZXg7XG5cdGNvbnN0IGdyb3VwcyA9IGdlb21ldHJ5Lmdyb3Vwcztcblx0Y29uc3QgYXR0cmlidXRlTmFtZXMgPSBPYmplY3Qua2V5cyggZ2VvbWV0cnkuYXR0cmlidXRlcyApO1xuXG5cdC8vIGNyZWF0ZSBhIG1lc2ggZm9yIGVhY2ggZ3JvdXAgYnkgZXh0cmFjdGluZyB0aGUgYnVmZmVyIGRhdGEgaW50byBhIG5ldyBnZW9tZXRyeVxuXG5cdGZvciAoIGxldCBpID0gMDsgaSA8IGdyb3Vwcy5sZW5ndGg7IGkgKysgKSB7XG5cblx0XHRjb25zdCBncm91cCA9IGdyb3Vwc1sgaSBdO1xuXG5cdFx0Y29uc3Qgc3RhcnQgPSBncm91cC5zdGFydDtcblx0XHRjb25zdCBlbmQgPSBzdGFydCArIGdyb3VwLmNvdW50O1xuXG5cdFx0Y29uc3QgbmV3R2VvbWV0cnkgPSBuZXcgQnVmZmVyR2VvbWV0cnkoKTtcblx0XHRjb25zdCBuZXdNYXRlcmlhbCA9IG1lc2gubWF0ZXJpYWxbIGdyb3VwLm1hdGVyaWFsSW5kZXggXTtcblxuXHRcdC8vIHByb2Nlc3MgYWxsIGJ1ZmZlciBhdHRyaWJ1dGVzXG5cblx0XHRmb3IgKCBsZXQgaiA9IDA7IGogPCBhdHRyaWJ1dGVOYW1lcy5sZW5ndGg7IGogKysgKSB7XG5cblx0XHRcdGNvbnN0IG5hbWUgPSBhdHRyaWJ1dGVOYW1lc1sgaiBdO1xuXHRcdFx0Y29uc3QgYXR0cmlidXRlID0gZ2VvbWV0cnkuYXR0cmlidXRlc1sgbmFtZSBdO1xuXHRcdFx0Y29uc3QgaXRlbVNpemUgPSBhdHRyaWJ1dGUuaXRlbVNpemU7XG5cblx0XHRcdGNvbnN0IG5ld0xlbmd0aCA9IGdyb3VwLmNvdW50ICogaXRlbVNpemU7XG5cdFx0XHRjb25zdCB0eXBlID0gYXR0cmlidXRlLmFycmF5LmNvbnN0cnVjdG9yO1xuXG5cdFx0XHRjb25zdCBuZXdBcnJheSA9IG5ldyB0eXBlKCBuZXdMZW5ndGggKTtcblx0XHRcdGNvbnN0IG5ld0F0dHJpYnV0ZSA9IG5ldyBCdWZmZXJBdHRyaWJ1dGUoIG5ld0FycmF5LCBpdGVtU2l6ZSApO1xuXG5cdFx0XHRmb3IgKCBsZXQgayA9IHN0YXJ0LCBuID0gMDsgayA8IGVuZDsgayArKywgbiArKyApIHtcblxuXHRcdFx0XHRjb25zdCBpbmQgPSBpbmRleC5nZXRYKCBrICk7XG5cblx0XHRcdFx0aWYgKCBpdGVtU2l6ZSA+PSAxICkgbmV3QXR0cmlidXRlLnNldFgoIG4sIGF0dHJpYnV0ZS5nZXRYKCBpbmQgKSApO1xuXHRcdFx0XHRpZiAoIGl0ZW1TaXplID49IDIgKSBuZXdBdHRyaWJ1dGUuc2V0WSggbiwgYXR0cmlidXRlLmdldFkoIGluZCApICk7XG5cdFx0XHRcdGlmICggaXRlbVNpemUgPj0gMyApIG5ld0F0dHJpYnV0ZS5zZXRaKCBuLCBhdHRyaWJ1dGUuZ2V0WiggaW5kICkgKTtcblx0XHRcdFx0aWYgKCBpdGVtU2l6ZSA+PSA0ICkgbmV3QXR0cmlidXRlLnNldFcoIG4sIGF0dHJpYnV0ZS5nZXRXKCBpbmQgKSApO1xuXG5cdFx0XHR9XG5cblxuXHRcdFx0bmV3R2VvbWV0cnkuc2V0QXR0cmlidXRlKCBuYW1lLCBuZXdBdHRyaWJ1dGUgKTtcblxuXHRcdH1cblxuXHRcdGNvbnN0IG5ld01lc2ggPSBuZXcgTWVzaCggbmV3R2VvbWV0cnksIG5ld01hdGVyaWFsICk7XG5cdFx0b2JqZWN0LmFkZCggbmV3TWVzaCApO1xuXG5cdH1cblxuXHRyZXR1cm4gb2JqZWN0O1xuXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU11bHRpTWF0ZXJpYWxPYmplY3QoIGdlb21ldHJ5LCBtYXRlcmlhbHMgKSB7XG5cblx0Y29uc3QgZ3JvdXAgPSBuZXcgR3JvdXAoKTtcblxuXHRmb3IgKCBsZXQgaSA9IDAsIGwgPSBtYXRlcmlhbHMubGVuZ3RoOyBpIDwgbDsgaSArKyApIHtcblxuXHRcdGdyb3VwLmFkZCggbmV3IE1lc2goIGdlb21ldHJ5LCBtYXRlcmlhbHNbIGkgXSApICk7XG5cblx0fVxuXG5cdHJldHVybiBncm91cDtcblxufVxuXG5mdW5jdGlvbiBkZXRhY2goIGNoaWxkLCBwYXJlbnQsIHNjZW5lICkge1xuXG5cdGNvbnNvbGUud2FybiggJ1RIUkVFLlNjZW5lVXRpbHM6IGRldGFjaCgpIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFVzZSBzY2VuZS5hdHRhY2goIGNoaWxkICkgaW5zdGVhZC4nICk7XG5cblx0c2NlbmUuYXR0YWNoKCBjaGlsZCApO1xuXG59XG5cbmZ1bmN0aW9uIGF0dGFjaCggY2hpbGQsIHNjZW5lLCBwYXJlbnQgKSB7XG5cblx0Y29uc29sZS53YXJuKCAnVEhSRUUuU2NlbmVVdGlsczogYXR0YWNoKCkgaGFzIGJlZW4gZGVwcmVjYXRlZC4gVXNlIHBhcmVudC5hdHRhY2goIGNoaWxkICkgaW5zdGVhZC4nICk7XG5cblx0cGFyZW50LmF0dGFjaCggY2hpbGQgKTtcblxufVxuXG5cblxuZXhwb3J0IHtcblx0Y3JlYXRlTWVzaGVzRnJvbUluc3RhbmNlZE1lc2gsXG5cdGNyZWF0ZU1lc2hlc0Zyb21NdWx0aU1hdGVyaWFsTWVzaCxcblx0Y3JlYXRlTXVsdGlNYXRlcmlhbE9iamVjdCxcblx0ZGV0YWNoLFxuXHRhdHRhY2gsXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJjb21iaW5pbmctbWF0ZXJpYWxzXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2x0anNfZm91cnRoXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2x0anNfZm91cnRoXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9idWlsZF90aHJlZV9tb2R1bGVfanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9jb250cm9sc19PcmJpdENvbnRyb2xzX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc19saWwtZ3VpX2Rpc3RfbGlsLWd1aV9lc21fanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV91dGlsc19CdWZmZXJHZW9tZXRyeVV0aWxzX2pzXCIsXCJzYW1wbGVzX2Jvb3RzdHJhcF9ib290c3RyYXBfanMtc2FtcGxlc19jb250cm9sc19tYXRlcmlhbC1jb250cm9sc19qcy1zYW1wbGVzX2NvbnRyb2xzX3JlbmRlcmUtYzg3ZDhhXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTQvY29tYmluaW5nLW1hdGVyaWFscy5qc1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
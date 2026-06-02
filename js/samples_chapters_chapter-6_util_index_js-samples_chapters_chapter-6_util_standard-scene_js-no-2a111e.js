"use strict";
(self["webpackChunkltjs_fourth"] = self["webpackChunkltjs_fourth"] || []).push([["samples_chapters_chapter-6_util_index_js-samples_chapters_chapter-6_util_standard-scene_js-no-2a111e"],{

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

/***/ "./samples/chapters/chapter-6/util/index.js"
/*!**************************************************!*\
  !*** ./samples/chapters/chapter-6/util/index.js ***!
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

/***/ "./samples/chapters/chapter-6/util/standard-scene.js"
/*!***********************************************************!*\
  !*** ./samples/chapters/chapter-6/util/standard-scene.js ***!
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










const bootstrapGeometryScene = async ({ geometry, provideGui, hidefloor, overrideMaterial, useLine }) => {
  const props = {
    backgroundColor: 0xffffff,
    fogColor: 0xffffff
  }

  const gui = new lil_gui__WEBPACK_IMPORTED_MODULE_2__["default"]()

  const init = async () => {
    const material =
      overrideMaterial ??
      new three__WEBPACK_IMPORTED_MODULE_5__.MeshStandardMaterial({
        color: 0xffaa88
      })
    const mesh = useLine ? new three__WEBPACK_IMPORTED_MODULE_5__.LineSegments(geometry, material) : new three__WEBPACK_IMPORTED_MODULE_5__.Mesh(geometry, material)
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
      overrideMaterial ?? (0,_controls_material_controls__WEBPACK_IMPORTED_MODULE_3__.initializeGuiMeshStandardMaterial)(gui, mesh, material).close()
      hidefloor ?? (0,_controls_mesh_visible_controls__WEBPACK_IMPORTED_MODULE_7__.initializeMeshVisibleControls)(gui, plane, 'Floor')
      provideGui(gui, mesh, scene)
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

/***/ "./node_modules/three/examples/jsm/geometries/RoundedBoxGeometry.js"
/*!**************************************************************************!*\
  !*** ./node_modules/three/examples/jsm/geometries/RoundedBoxGeometry.js ***!
  \**************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RoundedBoxGeometry: () => (/* binding */ RoundedBoxGeometry)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");


const _tempNormal = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();

function getUv( faceDirVector, normal, uvAxis, projectionAxis, radius, sideLength ) {

	const totArcLength = 2 * Math.PI * radius / 4;

	// length of the planes between the arcs on each axis
	const centerLength = Math.max( sideLength - 2 * radius, 0 );
	const halfArc = Math.PI / 4;

	// Get the vector projected onto the Y plane
	_tempNormal.copy( normal );
	_tempNormal[ projectionAxis ] = 0;
	_tempNormal.normalize();

	// total amount of UV space alloted to a single arc
	const arcUvRatio = 0.5 * totArcLength / ( totArcLength + centerLength );

	// the distance along one arc the point is at
	const arcAngleRatio = 1.0 - ( _tempNormal.angleTo( faceDirVector ) / halfArc );

	if ( Math.sign( _tempNormal[ uvAxis ] ) === 1 ) {

		return arcAngleRatio * arcUvRatio;

	} else {

		// total amount of UV space alloted to the plane between the arcs
		const lenUv = centerLength / ( totArcLength + centerLength );
		return lenUv + arcUvRatio + arcUvRatio * ( 1.0 - arcAngleRatio );

	}

}

class RoundedBoxGeometry extends three__WEBPACK_IMPORTED_MODULE_0__.BoxGeometry {

	constructor( width = 1, height = 1, depth = 1, segments = 2, radius = 0.1 ) {

		// ensure segments is odd so we have a plane connecting the rounded corners
		segments = segments * 2 + 1;

		// ensure radius isn't bigger than shortest side
		radius = Math.min( width / 2, height / 2, depth / 2, radius );

		super( 1, 1, 1, segments, segments, segments );

		// if we just have one segment we're the same as a regular box
		if ( segments === 1 ) return;

		const geometry2 = this.toNonIndexed();

		this.index = null;
		this.attributes.position = geometry2.attributes.position;
		this.attributes.normal = geometry2.attributes.normal;
		this.attributes.uv = geometry2.attributes.uv;

		//

		const position = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();
		const normal = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();

		const box = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3( width, height, depth ).divideScalar( 2 ).subScalar( radius );

		const positions = this.attributes.position.array;
		const normals = this.attributes.normal.array;
		const uvs = this.attributes.uv.array;

		const faceTris = positions.length / 6;
		const faceDirVector = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();
		const halfSegmentSize = 0.5 / segments;

		for ( let i = 0, j = 0; i < positions.length; i += 3, j += 2 ) {

			position.fromArray( positions, i );
			normal.copy( position );
			normal.x -= Math.sign( normal.x ) * halfSegmentSize;
			normal.y -= Math.sign( normal.y ) * halfSegmentSize;
			normal.z -= Math.sign( normal.z ) * halfSegmentSize;
			normal.normalize();

			positions[ i + 0 ] = box.x * Math.sign( position.x ) + normal.x * radius;
			positions[ i + 1 ] = box.y * Math.sign( position.y ) + normal.y * radius;
			positions[ i + 2 ] = box.z * Math.sign( position.z ) + normal.z * radius;

			normals[ i + 0 ] = normal.x;
			normals[ i + 1 ] = normal.y;
			normals[ i + 2 ] = normal.z;

			const side = Math.floor( i / faceTris );

			switch ( side ) {

				case 0: // right

					// generate UVs along Z then Y
					faceDirVector.set( 1, 0, 0 );
					uvs[ j + 0 ] = getUv( faceDirVector, normal, 'z', 'y', radius, depth );
					uvs[ j + 1 ] = 1.0 - getUv( faceDirVector, normal, 'y', 'z', radius, height );
					break;

				case 1: // left

					// generate UVs along Z then Y
					faceDirVector.set( - 1, 0, 0 );
					uvs[ j + 0 ] = 1.0 - getUv( faceDirVector, normal, 'z', 'y', radius, depth );
					uvs[ j + 1 ] = 1.0 - getUv( faceDirVector, normal, 'y', 'z', radius, height );
					break;

				case 2: // top

					// generate UVs along X then Z
					faceDirVector.set( 0, 1, 0 );
					uvs[ j + 0 ] = 1.0 - getUv( faceDirVector, normal, 'x', 'z', radius, width );
					uvs[ j + 1 ] = getUv( faceDirVector, normal, 'z', 'x', radius, depth );
					break;

				case 3: // bottom

					// generate UVs along X then Z
					faceDirVector.set( 0, - 1, 0 );
					uvs[ j + 0 ] = 1.0 - getUv( faceDirVector, normal, 'x', 'z', radius, width );
					uvs[ j + 1 ] = 1.0 - getUv( faceDirVector, normal, 'z', 'x', radius, depth );
					break;

				case 4: // front

					// generate UVs along X then Y
					faceDirVector.set( 0, 0, 1 );
					uvs[ j + 0 ] = 1.0 - getUv( faceDirVector, normal, 'x', 'y', radius, width );
					uvs[ j + 1 ] = 1.0 - getUv( faceDirVector, normal, 'y', 'x', radius, height );
					break;

				case 5: // back

					// generate UVs along X then Y
					faceDirVector.set( 0, 0, - 1 );
					uvs[ j + 0 ] = getUv( faceDirVector, normal, 'x', 'y', radius, width );
					uvs[ j + 1 ] = 1.0 - getUv( faceDirVector, normal, 'y', 'x', radius, height );
					break;

			}

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

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvc2FtcGxlc19jaGFwdGVyc19jaGFwdGVyLTZfdXRpbF9pbmRleF9qcy1zYW1wbGVzX2NoYXB0ZXJzX2NoYXB0ZXItNl91dGlsX3N0YW5kYXJkLXNjZW5lX2pzLW5vLTJhMTExZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBOEI7O0FBRXZCO0FBQ1Asa0JBQWtCLHNEQUF5QjtBQUMzQyxrQkFBa0Isc0RBQXlCO0FBQzNDO0FBQ0EsR0FBRztBQUNILG1CQUFtQix1Q0FBVTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRU87QUFDUDtBQUNBLGtCQUFrQixvREFBdUI7QUFDekMsa0JBQWtCLHVEQUEwQjtBQUM1QztBQUNBLEdBQUc7QUFDSCxtQkFBbUIsdUNBQVU7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDOUJPO0FBQ1A7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0h3RDtBQUNzQjs7QUFFckQ7QUFDcUY7QUFDcEM7QUFDNUM7QUFDeUI7QUFDZ0M7O0FBRWhGLHdDQUF3Qyw0REFBNEQ7QUFDM0c7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLCtDQUFHOztBQUVyQjtBQUNBO0FBQ0E7QUFDQSxVQUFVLHVEQUEwQjtBQUNwQztBQUNBLE9BQU87QUFDUCwrQkFBK0IsK0NBQWtCLDJCQUEyQix1Q0FBVTtBQUN0RjtBQUNBLElBQUksZ0VBQVMsV0FBVyx3Q0FBd0M7QUFDaEUsZ0NBQWdDLG1EQUFzQjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGlDQUFpQyw4REFBWTtBQUM3QztBQUNBLE1BQU0sc0ZBQXlCO0FBQy9CLE1BQU0sa0ZBQXVCOztBQUU3QixNQUFNLG1GQUFxQjtBQUMzQiwwQkFBMEIsOEZBQWlDO0FBQzNELG1CQUFtQiw4RkFBNkI7QUFDaEQ7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDdERPO0FBQ1A7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDSDhCOztBQUU5QiwwQkFBMEIsZ0RBQW1COztBQUU3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSLHFDQUFxQyxxREFBd0I7QUFDN0Q7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsMkJBQTJCLG1FQUFzQztBQUNqRTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFTTtBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlCQUF5Qix3Q0FBVztBQUNwQyxvQkFBb0Isc0NBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLHdDQUFXO0FBQ3hDO0FBQ0E7QUFDQSw2QkFBNkIsd0NBQVc7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qix3Q0FBVztBQUN4QztBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsK0NBQWtCO0FBQzVDO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLG1FQUFzQztBQUMvRDtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDOUZlOztBQUVmLHdCQUF3QiwwQ0FBTzs7QUFFL0I7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxpQ0FBaUMsOENBQVc7O0FBRTVDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLHVCQUF1QiwwQ0FBTztBQUM5QixxQkFBcUIsMENBQU87O0FBRTVCLGtCQUFrQiwwQ0FBTzs7QUFFekI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNEJBQTRCLDBDQUFPO0FBQ25DOztBQUVBLDBCQUEwQixzQkFBc0I7O0FBRWhEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUU4Qjs7Ozs7Ozs7Ozs7Ozs7OztBQ25KZjs7QUFFZixnQkFBZ0IsMENBQU87QUFDdkIsZ0JBQWdCLDBDQUFPO0FBQ3ZCLDBCQUEwQiwwQ0FBTzs7QUFFakMsa0NBQWtDLCtDQUFZOztBQUU5Qzs7QUFFQSx1QkFBdUIsaURBQWM7O0FBRXJDO0FBQ0Esd0JBQXdCLHlEQUFzQjs7QUFFOUM7O0FBRUEsdUJBQXVCLG9EQUFpQixJQUFJLDJCQUEyQjs7QUFFdkU7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHVDQUF1QyxRQUFROztBQUUvQzs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7O0FBRytCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2Jvb3RzdHJhcC9mbG9vci5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci02L3V0aWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItNi91dGlsL3N0YW5kYXJkLXNjZW5lLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jb250cm9scy9tZXNoLXZpc2libGUtY29udHJvbHMuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NvbnRyb2xzL3NjZW5lLWNvbnRyb2xzLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vbm9kZV9tb2R1bGVzL3RocmVlL2V4YW1wbGVzL2pzbS9nZW9tZXRyaWVzL1JvdW5kZWRCb3hHZW9tZXRyeS5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL25vZGVfbW9kdWxlcy90aHJlZS9leGFtcGxlcy9qc20vaGVscGVycy9WZXJ0ZXhOb3JtYWxzSGVscGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuXG5leHBvcnQgY29uc3QgZm9yZXZlclBsYW5lID0gKHNjZW5lKSA9PiB7XG4gIGNvbnN0IGdlbyA9IG5ldyBUSFJFRS5QbGFuZUJ1ZmZlckdlb21ldHJ5KDEwMDAwLCAxMDAwMClcbiAgY29uc3QgbWF0ID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoe1xuICAgIGNvbG9yOiAweGZmZmZmZlxuICB9KVxuICBjb25zdCBtZXNoID0gbmV3IFRIUkVFLk1lc2goZ2VvLCBtYXQpXG4gIG1lc2gucG9zaXRpb24uc2V0KDAsIC0yLCAwKVxuICBtZXNoLnJvdGF0aW9uLnNldChNYXRoLlBJIC8gLTIsIDAsIDApXG4gIG1lc2gucmVjZWl2ZVNoYWRvdyA9IHRydWVcbiAgbWVzaC5uYW1lID0gJ2ZvcmV2ZXItZmxvb3InXG4gIHNjZW5lLmFkZChtZXNoKVxuXG4gIHJldHVybiBtZXNoXG59XG5cbmV4cG9ydCBjb25zdCBmbG9hdGluZ0Zsb29yID0gKHNjZW5lLCBzaXplKSA9PiB7XG4gIGNvbnN0IHMgPSBzaXplID8gc2l6ZSA6IDZcbiAgY29uc3QgZ2VvID0gbmV3IFRIUkVFLkJveEJ1ZmZlckdlb21ldHJ5KHMsIDAuMjUsIHMsIDEwLCAxMCwgMTApXG4gIGNvbnN0IG1hdCA9IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7XG4gICAgY29sb3I6IDB4ZGRkZGRkXG4gIH0pXG4gIGNvbnN0IG1lc2ggPSBuZXcgVEhSRUUuTWVzaChnZW8sIG1hdClcbiAgbWVzaC5wb3NpdGlvbi5zZXQoMCwgLTIsIC0xKVxuICBtZXNoLnJlY2VpdmVTaGFkb3cgPSB0cnVlXG4gIG1lc2gubmFtZSA9ICdmbG9hdGluZy1mbG9vcidcbiAgc2NlbmUuYWRkKG1lc2gpXG5cbiAgcmV0dXJuIG1lc2hcbn1cbiIsImV4cG9ydCBjb25zdCB1cGRhdGVNZXNoID0gKG1lc2gsIGdlb21ldHJ5KSA9PiB7XG4gIG1lc2guZ2VvbWV0cnkuZGlzcG9zZSgpXG4gIG1lc2guZ2VvbWV0cnkgPSBnZW9tZXRyeVxufVxuIiwiaW1wb3J0IHsgaW5pdFNjZW5lIH0gZnJvbSAnLi4vLi4vLi4vYm9vdHN0cmFwL2Jvb3RzdHJhcCdcbmltcG9ydCB7IGludGlhbGl6ZVJlbmRlcmVyQ29udHJvbHMgfSBmcm9tICcuLi8uLi8uLi9jb250cm9scy9yZW5kZXJlci1jb250cm9sJ1xuXG5pbXBvcnQgR1VJIGZyb20gJ2xpbC1ndWknXG5pbXBvcnQgeyBpbml0aWFsaXplR3VpTWF0ZXJpYWwsIGluaXRpYWxpemVHdWlNZXNoU3RhbmRhcmRNYXRlcmlhbCB9IGZyb20gJy4uLy4uLy4uL2NvbnRyb2xzL21hdGVyaWFsLWNvbnRyb2xzJ1xuaW1wb3J0IHsgaW5pdGlhbGl6ZVNjZW5lQ29udHJvbHMgfSBmcm9tICcuLi8uLi8uLi9jb250cm9scy9zY2VuZS1jb250cm9scydcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuaW1wb3J0IHsgZm9yZXZlclBsYW5lIH0gZnJvbSAnLi4vLi4vLi4vYm9vdHN0cmFwL2Zsb29yJ1xuaW1wb3J0IHsgaW5pdGlhbGl6ZU1lc2hWaXNpYmxlQ29udHJvbHMgfSBmcm9tICcuLi8uLi8uLi9jb250cm9scy9tZXNoLXZpc2libGUtY29udHJvbHMnXG5cbmV4cG9ydCBjb25zdCBib290c3RyYXBHZW9tZXRyeVNjZW5lID0gYXN5bmMgKHsgZ2VvbWV0cnksIHByb3ZpZGVHdWksIGhpZGVmbG9vciwgb3ZlcnJpZGVNYXRlcmlhbCwgdXNlTGluZSB9KSA9PiB7XG4gIGNvbnN0IHByb3BzID0ge1xuICAgIGJhY2tncm91bmRDb2xvcjogMHhmZmZmZmYsXG4gICAgZm9nQ29sb3I6IDB4ZmZmZmZmXG4gIH1cblxuICBjb25zdCBndWkgPSBuZXcgR1VJKClcblxuICBjb25zdCBpbml0ID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IG1hdGVyaWFsID1cbiAgICAgIG92ZXJyaWRlTWF0ZXJpYWwgPz9cbiAgICAgIG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7XG4gICAgICAgIGNvbG9yOiAweGZmYWE4OFxuICAgICAgfSlcbiAgICBjb25zdCBtZXNoID0gdXNlTGluZSA/IG5ldyBUSFJFRS5MaW5lU2VnbWVudHMoZ2VvbWV0cnksIG1hdGVyaWFsKSA6IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbClcbiAgICBtZXNoLmNhc3RTaGFkb3cgPSB0cnVlXG4gICAgaW5pdFNjZW5lKHByb3BzKSgoeyBzY2VuZSwgY2FtZXJhLCByZW5kZXJlciwgb3JiaXRDb250cm9scyB9KSA9PiB7XG4gICAgICByZW5kZXJlci5zaGFkb3dNYXAudHlwZSA9IFRIUkVFLlBDRlNvZnRTaGFkb3dNYXBcbiAgICAgIGNhbWVyYS5wb3NpdGlvbi54ID0gLTNcbiAgICAgIGNhbWVyYS5wb3NpdGlvbi56ID0gOFxuICAgICAgY2FtZXJhLnBvc2l0aW9uLnkgPSAyXG4gICAgICBvcmJpdENvbnRyb2xzLnVwZGF0ZSgpXG5cbiAgICAgIGZ1bmN0aW9uIGFuaW1hdGUoKSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKVxuICAgICAgICByZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSlcbiAgICAgICAgb3JiaXRDb250cm9scy51cGRhdGUoKVxuICAgICAgfVxuXG4gICAgICBhbmltYXRlKClcblxuICAgICAgY29uc3QgcGxhbmUgPSBoaWRlZmxvb3IgPz8gZm9yZXZlclBsYW5lKHNjZW5lKVxuICAgICAgc2NlbmUuYWRkKG1lc2gpXG4gICAgICBpbnRpYWxpemVSZW5kZXJlckNvbnRyb2xzKGd1aSwgcmVuZGVyZXIpXG4gICAgICBpbml0aWFsaXplU2NlbmVDb250cm9scyhndWksIHNjZW5lLCBmYWxzZSlcblxuICAgICAgaW5pdGlhbGl6ZUd1aU1hdGVyaWFsKGd1aSwgbWVzaCwgbWF0ZXJpYWwpLmNsb3NlKClcbiAgICAgIG92ZXJyaWRlTWF0ZXJpYWwgPz8gaW5pdGlhbGl6ZUd1aU1lc2hTdGFuZGFyZE1hdGVyaWFsKGd1aSwgbWVzaCwgbWF0ZXJpYWwpLmNsb3NlKClcbiAgICAgIGhpZGVmbG9vciA/PyBpbml0aWFsaXplTWVzaFZpc2libGVDb250cm9scyhndWksIHBsYW5lLCAnRmxvb3InKVxuICAgICAgcHJvdmlkZUd1aShndWksIG1lc2gsIHNjZW5lKVxuICAgIH0pXG4gIH1cblxuICBpbml0KCkudGhlbigpXG59XG4iLCJleHBvcnQgY29uc3QgaW5pdGlhbGl6ZU1lc2hWaXNpYmxlQ29udHJvbHMgPSAoZ3VpLCBtZXNoLCB0aXRsZSkgPT4ge1xuICBjb25zdCBmb2xkZXIgPSBndWkuYWRkRm9sZGVyKHRpdGxlKVxuICBmb2xkZXIuYWRkKG1lc2gsICd2aXNpYmxlJylcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuXG5jb25zdCB0ZXh0dXJlTG9hZGVyID0gbmV3IFRIUkVFLlRleHR1cmVMb2FkZXIoKVxuXG5jb25zdCBwcm9wZXJ0aWVzT2JqZWN0ID0gKHNjZW5lKSA9PiAoe1xuICBvdmVycmlkZU1hdGVyaWFsOiB7XG4gICAgdG9nZ2xlOiAoKSA9PiB7XG4gICAgICBpZiAoc2NlbmUub3ZlcnJpZGVNYXRlcmlhbCAhPT0gbnVsbCkge1xuICAgICAgICBzY2VuZS5vdmVycmlkZU1hdGVyaWFsID0gbnVsbFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2NlbmUub3ZlcnJpZGVNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTm9ybWFsTWF0ZXJpYWwoKVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgYmFja0dyb3VuZDogJ1doaXRlJyxcbiAgZW52aXJvbm1lbnQ6IHtcbiAgICB0b2dnbGU6ICgpID0+IHtcbiAgICAgIGlmIChzY2VuZS5lbnZpcm9ubWVudCAhPT0gbnVsbCkge1xuICAgICAgICBzY2VuZS5lbnZpcm9ubWVudCA9IG51bGxcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRleHR1cmVMb2FkZXIubG9hZCgnL2Fzc2V0cy9lcXVpLmpwZWcnLCAobG9hZGVkKSA9PiB7XG4gICAgICAgICAgbG9hZGVkLm1hcHBpbmcgPSBUSFJFRS5FcXVpcmVjdGFuZ3VsYXJSZWZsZWN0aW9uTWFwcGluZ1xuICAgICAgICAgIHNjZW5lLmVudmlyb25tZW50ID0gbG9hZGVkXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuXG5jb25zdCBmb2dQcm9wZXJ0aWVzID0gKGZvZykgPT4gKHtcbiAgY29sb3I6IDB4ZmZmZmZmLFxuICBuZWFyOiBmb2cubmVhcixcbiAgZmFyOiBmb2cuZmFyXG59KVxuXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZVNjZW5lQ29udHJvbHMgPSAoZ3VpLCBzY2VuZSwgZm9nRW5hYmxlZCwgaXNPcGVuKSA9PiB7XG4gIGNvbnN0IHByb3BzID0gcHJvcGVydGllc09iamVjdChzY2VuZSlcbiAgY29uc3Qgc2NlbmVDb250cm9scyA9IGd1aS5hZGRGb2xkZXIoJ1NjZW5lJylcblxuICBzY2VuZUNvbnRyb2xzXG4gICAgLmFkZChwcm9wcywgJ2JhY2tHcm91bmQnLCBbJ1doaXRlJywgJ0JsYWNrJywgJ051bGwnLCAnQ29sb3InLCAnVGV4dHVyZScsICdDdWJlbWFwJ10pXG4gICAgLm9uQ2hhbmdlKChldmVudCkgPT4gaGFuZGxlQmFja2dyb3VuZENoYW5nZShldmVudCwgc2NlbmUpKVxuICBzY2VuZUNvbnRyb2xzLmFkZChwcm9wcy5vdmVycmlkZU1hdGVyaWFsLCAndG9nZ2xlJykubmFtZSgnVG9nZ2xlIE92ZXJyaWRlIE1hdGVyaWFsJylcbiAgc2NlbmVDb250cm9scy5hZGQocHJvcHMuZW52aXJvbm1lbnQsICd0b2dnbGUnKS5uYW1lKCdUb2dnbGUgRW52aXJvbm1lbnQnKVxuXG4gIGlmIChmb2dFbmFibGVkKSB7XG4gICAgY29uc3QgZm9nQ29sb3IgPSBuZXcgVEhSRUUuQ29sb3IoMHhmZmZmZmYpXG4gICAgY29uc3QgZm9nID0gbmV3IFRIUkVFLkZvZyhmb2dDb2xvciwgMSwgMjApXG4gICAgc2NlbmUuZm9nID0gZm9nXG4gICAgY29uc3QgZm9nUHJvcHMgPSBmb2dQcm9wZXJ0aWVzKGZvZylcbiAgICBjb25zdCBmb2dDb250cm9scyA9IHNjZW5lQ29udHJvbHMuYWRkRm9sZGVyKCdGb2cnKVxuICAgIGZvZ0NvbnRyb2xzLmFkZENvbG9yKGZvZ1Byb3BzLCAnY29sb3InKVxuICAgIGZvZ0NvbnRyb2xzLmFkZChmb2dQcm9wcywgJ25lYXInLCAwLCAxMCwgMC4xKVxuICAgIGZvZ0NvbnRyb2xzLmFkZChmb2dQcm9wcywgJ2ZhcicsIDAsIDEwMCwgMC4xKVxuXG4gICAgZm9nQ29udHJvbHMub25DaGFuZ2UoKCkgPT4ge1xuICAgICAgZm9nLmNvbG9yID0gZm9nQ29sb3Iuc2V0SGV4KGZvZ1Byb3BzLmNvbG9yKVxuICAgICAgZm9nLm5lYXIgPSBmb2dQcm9wcy5uZWFyXG4gICAgICBmb2cuZmFyID0gZm9nUHJvcHMuZmFyXG4gICAgfSlcbiAgfVxuXG4gIGlzT3BlbiA/IHNjZW5lQ29udHJvbHMub3BlbigpIDogc2NlbmVDb250cm9scy5jbG9zZSgpXG59XG5cbmNvbnN0IGhhbmRsZUJhY2tncm91bmRDaGFuZ2UgPSAoc2V0dGluZywgc2NlbmUpID0+IHtcbiAgc3dpdGNoIChzZXR0aW5nKSB7XG4gICAgY2FzZSAnV2hpdGUnOlxuICAgICAgc2NlbmUuYmFja2dyb3VuZCA9IG5ldyBUSFJFRS5Db2xvcigweGZmZmZmZilcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnQmxhY2snOlxuICAgICAgc2NlbmUuYmFja2dyb3VuZCA9IG5ldyBUSFJFRS5Db2xvcigweDAwMDAwMClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnTnVsbCc6XG4gICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbnVsbFxuICAgICAgYnJlYWtcbiAgICBjYXNlICdDb2xvcic6XG4gICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbmV3IFRIUkVFLkNvbG9yKDB4NDRmZjQ0KVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdUZXh0dXJlJzpcbiAgICAgIHRleHR1cmVMb2FkZXIubG9hZCgnL2Fzc2V0cy90ZXh0dXJlcy93b29kL2Fic3RyYWN0LWFudGlxdWUtYmFja2Ryb3AtMTY0MDA1LmpwZycsIChsb2FkZWQpID0+IHtcbiAgICAgICAgbG9hZGVkLmVuY29kaW5nID0gVEhSRUUuc1JHQkVuY29kaW5nXG4gICAgICAgIHNjZW5lLmJhY2tncm91bmQgPSBsb2FkZWRcbiAgICAgICAgc2NlbmUuZW52aXJvbm1lbnQgPSBudWxsXG4gICAgICB9KVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdDdWJlbWFwJzpcbiAgICAgIHRleHR1cmVMb2FkZXIubG9hZCgnL2Fzc2V0cy9lcXVpLmpwZWcnLCAobG9hZGVkKSA9PiB7XG4gICAgICAgIGxvYWRlZC5tYXBwaW5nID0gVEhSRUUuRXF1aXJlY3Rhbmd1bGFyUmVmbGVjdGlvbk1hcHBpbmdcbiAgICAgICAgc2NlbmUuYmFja2dyb3VuZCA9IGxvYWRlZFxuICAgICAgICBzY2VuZS5lbnZpcm9ubWVudCA9IGxvYWRlZFxuICAgICAgfSlcblxuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgYnJlYWtcbiAgfVxufVxuIiwiaW1wb3J0IHtcblx0Qm94R2VvbWV0cnksXG5cdFZlY3RvcjNcbn0gZnJvbSAndGhyZWUnO1xuXG5jb25zdCBfdGVtcE5vcm1hbCA9IG5ldyBWZWN0b3IzKCk7XG5cbmZ1bmN0aW9uIGdldFV2KCBmYWNlRGlyVmVjdG9yLCBub3JtYWwsIHV2QXhpcywgcHJvamVjdGlvbkF4aXMsIHJhZGl1cywgc2lkZUxlbmd0aCApIHtcblxuXHRjb25zdCB0b3RBcmNMZW5ndGggPSAyICogTWF0aC5QSSAqIHJhZGl1cyAvIDQ7XG5cblx0Ly8gbGVuZ3RoIG9mIHRoZSBwbGFuZXMgYmV0d2VlbiB0aGUgYXJjcyBvbiBlYWNoIGF4aXNcblx0Y29uc3QgY2VudGVyTGVuZ3RoID0gTWF0aC5tYXgoIHNpZGVMZW5ndGggLSAyICogcmFkaXVzLCAwICk7XG5cdGNvbnN0IGhhbGZBcmMgPSBNYXRoLlBJIC8gNDtcblxuXHQvLyBHZXQgdGhlIHZlY3RvciBwcm9qZWN0ZWQgb250byB0aGUgWSBwbGFuZVxuXHRfdGVtcE5vcm1hbC5jb3B5KCBub3JtYWwgKTtcblx0X3RlbXBOb3JtYWxbIHByb2plY3Rpb25BeGlzIF0gPSAwO1xuXHRfdGVtcE5vcm1hbC5ub3JtYWxpemUoKTtcblxuXHQvLyB0b3RhbCBhbW91bnQgb2YgVVYgc3BhY2UgYWxsb3RlZCB0byBhIHNpbmdsZSBhcmNcblx0Y29uc3QgYXJjVXZSYXRpbyA9IDAuNSAqIHRvdEFyY0xlbmd0aCAvICggdG90QXJjTGVuZ3RoICsgY2VudGVyTGVuZ3RoICk7XG5cblx0Ly8gdGhlIGRpc3RhbmNlIGFsb25nIG9uZSBhcmMgdGhlIHBvaW50IGlzIGF0XG5cdGNvbnN0IGFyY0FuZ2xlUmF0aW8gPSAxLjAgLSAoIF90ZW1wTm9ybWFsLmFuZ2xlVG8oIGZhY2VEaXJWZWN0b3IgKSAvIGhhbGZBcmMgKTtcblxuXHRpZiAoIE1hdGguc2lnbiggX3RlbXBOb3JtYWxbIHV2QXhpcyBdICkgPT09IDEgKSB7XG5cblx0XHRyZXR1cm4gYXJjQW5nbGVSYXRpbyAqIGFyY1V2UmF0aW87XG5cblx0fSBlbHNlIHtcblxuXHRcdC8vIHRvdGFsIGFtb3VudCBvZiBVViBzcGFjZSBhbGxvdGVkIHRvIHRoZSBwbGFuZSBiZXR3ZWVuIHRoZSBhcmNzXG5cdFx0Y29uc3QgbGVuVXYgPSBjZW50ZXJMZW5ndGggLyAoIHRvdEFyY0xlbmd0aCArIGNlbnRlckxlbmd0aCApO1xuXHRcdHJldHVybiBsZW5VdiArIGFyY1V2UmF0aW8gKyBhcmNVdlJhdGlvICogKCAxLjAgLSBhcmNBbmdsZVJhdGlvICk7XG5cblx0fVxuXG59XG5cbmNsYXNzIFJvdW5kZWRCb3hHZW9tZXRyeSBleHRlbmRzIEJveEdlb21ldHJ5IHtcblxuXHRjb25zdHJ1Y3Rvciggd2lkdGggPSAxLCBoZWlnaHQgPSAxLCBkZXB0aCA9IDEsIHNlZ21lbnRzID0gMiwgcmFkaXVzID0gMC4xICkge1xuXG5cdFx0Ly8gZW5zdXJlIHNlZ21lbnRzIGlzIG9kZCBzbyB3ZSBoYXZlIGEgcGxhbmUgY29ubmVjdGluZyB0aGUgcm91bmRlZCBjb3JuZXJzXG5cdFx0c2VnbWVudHMgPSBzZWdtZW50cyAqIDIgKyAxO1xuXG5cdFx0Ly8gZW5zdXJlIHJhZGl1cyBpc24ndCBiaWdnZXIgdGhhbiBzaG9ydGVzdCBzaWRlXG5cdFx0cmFkaXVzID0gTWF0aC5taW4oIHdpZHRoIC8gMiwgaGVpZ2h0IC8gMiwgZGVwdGggLyAyLCByYWRpdXMgKTtcblxuXHRcdHN1cGVyKCAxLCAxLCAxLCBzZWdtZW50cywgc2VnbWVudHMsIHNlZ21lbnRzICk7XG5cblx0XHQvLyBpZiB3ZSBqdXN0IGhhdmUgb25lIHNlZ21lbnQgd2UncmUgdGhlIHNhbWUgYXMgYSByZWd1bGFyIGJveFxuXHRcdGlmICggc2VnbWVudHMgPT09IDEgKSByZXR1cm47XG5cblx0XHRjb25zdCBnZW9tZXRyeTIgPSB0aGlzLnRvTm9uSW5kZXhlZCgpO1xuXG5cdFx0dGhpcy5pbmRleCA9IG51bGw7XG5cdFx0dGhpcy5hdHRyaWJ1dGVzLnBvc2l0aW9uID0gZ2VvbWV0cnkyLmF0dHJpYnV0ZXMucG9zaXRpb247XG5cdFx0dGhpcy5hdHRyaWJ1dGVzLm5vcm1hbCA9IGdlb21ldHJ5Mi5hdHRyaWJ1dGVzLm5vcm1hbDtcblx0XHR0aGlzLmF0dHJpYnV0ZXMudXYgPSBnZW9tZXRyeTIuYXR0cmlidXRlcy51djtcblxuXHRcdC8vXG5cblx0XHRjb25zdCBwb3NpdGlvbiA9IG5ldyBWZWN0b3IzKCk7XG5cdFx0Y29uc3Qgbm9ybWFsID0gbmV3IFZlY3RvcjMoKTtcblxuXHRcdGNvbnN0IGJveCA9IG5ldyBWZWN0b3IzKCB3aWR0aCwgaGVpZ2h0LCBkZXB0aCApLmRpdmlkZVNjYWxhciggMiApLnN1YlNjYWxhciggcmFkaXVzICk7XG5cblx0XHRjb25zdCBwb3NpdGlvbnMgPSB0aGlzLmF0dHJpYnV0ZXMucG9zaXRpb24uYXJyYXk7XG5cdFx0Y29uc3Qgbm9ybWFscyA9IHRoaXMuYXR0cmlidXRlcy5ub3JtYWwuYXJyYXk7XG5cdFx0Y29uc3QgdXZzID0gdGhpcy5hdHRyaWJ1dGVzLnV2LmFycmF5O1xuXG5cdFx0Y29uc3QgZmFjZVRyaXMgPSBwb3NpdGlvbnMubGVuZ3RoIC8gNjtcblx0XHRjb25zdCBmYWNlRGlyVmVjdG9yID0gbmV3IFZlY3RvcjMoKTtcblx0XHRjb25zdCBoYWxmU2VnbWVudFNpemUgPSAwLjUgLyBzZWdtZW50cztcblxuXHRcdGZvciAoIGxldCBpID0gMCwgaiA9IDA7IGkgPCBwb3NpdGlvbnMubGVuZ3RoOyBpICs9IDMsIGogKz0gMiApIHtcblxuXHRcdFx0cG9zaXRpb24uZnJvbUFycmF5KCBwb3NpdGlvbnMsIGkgKTtcblx0XHRcdG5vcm1hbC5jb3B5KCBwb3NpdGlvbiApO1xuXHRcdFx0bm9ybWFsLnggLT0gTWF0aC5zaWduKCBub3JtYWwueCApICogaGFsZlNlZ21lbnRTaXplO1xuXHRcdFx0bm9ybWFsLnkgLT0gTWF0aC5zaWduKCBub3JtYWwueSApICogaGFsZlNlZ21lbnRTaXplO1xuXHRcdFx0bm9ybWFsLnogLT0gTWF0aC5zaWduKCBub3JtYWwueiApICogaGFsZlNlZ21lbnRTaXplO1xuXHRcdFx0bm9ybWFsLm5vcm1hbGl6ZSgpO1xuXG5cdFx0XHRwb3NpdGlvbnNbIGkgKyAwIF0gPSBib3gueCAqIE1hdGguc2lnbiggcG9zaXRpb24ueCApICsgbm9ybWFsLnggKiByYWRpdXM7XG5cdFx0XHRwb3NpdGlvbnNbIGkgKyAxIF0gPSBib3gueSAqIE1hdGguc2lnbiggcG9zaXRpb24ueSApICsgbm9ybWFsLnkgKiByYWRpdXM7XG5cdFx0XHRwb3NpdGlvbnNbIGkgKyAyIF0gPSBib3gueiAqIE1hdGguc2lnbiggcG9zaXRpb24ueiApICsgbm9ybWFsLnogKiByYWRpdXM7XG5cblx0XHRcdG5vcm1hbHNbIGkgKyAwIF0gPSBub3JtYWwueDtcblx0XHRcdG5vcm1hbHNbIGkgKyAxIF0gPSBub3JtYWwueTtcblx0XHRcdG5vcm1hbHNbIGkgKyAyIF0gPSBub3JtYWwuejtcblxuXHRcdFx0Y29uc3Qgc2lkZSA9IE1hdGguZmxvb3IoIGkgLyBmYWNlVHJpcyApO1xuXG5cdFx0XHRzd2l0Y2ggKCBzaWRlICkge1xuXG5cdFx0XHRcdGNhc2UgMDogLy8gcmlnaHRcblxuXHRcdFx0XHRcdC8vIGdlbmVyYXRlIFVWcyBhbG9uZyBaIHRoZW4gWVxuXHRcdFx0XHRcdGZhY2VEaXJWZWN0b3Iuc2V0KCAxLCAwLCAwICk7XG5cdFx0XHRcdFx0dXZzWyBqICsgMCBdID0gZ2V0VXYoIGZhY2VEaXJWZWN0b3IsIG5vcm1hbCwgJ3onLCAneScsIHJhZGl1cywgZGVwdGggKTtcblx0XHRcdFx0XHR1dnNbIGogKyAxIF0gPSAxLjAgLSBnZXRVdiggZmFjZURpclZlY3Rvciwgbm9ybWFsLCAneScsICd6JywgcmFkaXVzLCBoZWlnaHQgKTtcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlIDE6IC8vIGxlZnRcblxuXHRcdFx0XHRcdC8vIGdlbmVyYXRlIFVWcyBhbG9uZyBaIHRoZW4gWVxuXHRcdFx0XHRcdGZhY2VEaXJWZWN0b3Iuc2V0KCAtIDEsIDAsIDAgKTtcblx0XHRcdFx0XHR1dnNbIGogKyAwIF0gPSAxLjAgLSBnZXRVdiggZmFjZURpclZlY3Rvciwgbm9ybWFsLCAneicsICd5JywgcmFkaXVzLCBkZXB0aCApO1xuXHRcdFx0XHRcdHV2c1sgaiArIDEgXSA9IDEuMCAtIGdldFV2KCBmYWNlRGlyVmVjdG9yLCBub3JtYWwsICd5JywgJ3onLCByYWRpdXMsIGhlaWdodCApO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGNhc2UgMjogLy8gdG9wXG5cblx0XHRcdFx0XHQvLyBnZW5lcmF0ZSBVVnMgYWxvbmcgWCB0aGVuIFpcblx0XHRcdFx0XHRmYWNlRGlyVmVjdG9yLnNldCggMCwgMSwgMCApO1xuXHRcdFx0XHRcdHV2c1sgaiArIDAgXSA9IDEuMCAtIGdldFV2KCBmYWNlRGlyVmVjdG9yLCBub3JtYWwsICd4JywgJ3onLCByYWRpdXMsIHdpZHRoICk7XG5cdFx0XHRcdFx0dXZzWyBqICsgMSBdID0gZ2V0VXYoIGZhY2VEaXJWZWN0b3IsIG5vcm1hbCwgJ3onLCAneCcsIHJhZGl1cywgZGVwdGggKTtcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlIDM6IC8vIGJvdHRvbVxuXG5cdFx0XHRcdFx0Ly8gZ2VuZXJhdGUgVVZzIGFsb25nIFggdGhlbiBaXG5cdFx0XHRcdFx0ZmFjZURpclZlY3Rvci5zZXQoIDAsIC0gMSwgMCApO1xuXHRcdFx0XHRcdHV2c1sgaiArIDAgXSA9IDEuMCAtIGdldFV2KCBmYWNlRGlyVmVjdG9yLCBub3JtYWwsICd4JywgJ3onLCByYWRpdXMsIHdpZHRoICk7XG5cdFx0XHRcdFx0dXZzWyBqICsgMSBdID0gMS4wIC0gZ2V0VXYoIGZhY2VEaXJWZWN0b3IsIG5vcm1hbCwgJ3onLCAneCcsIHJhZGl1cywgZGVwdGggKTtcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlIDQ6IC8vIGZyb250XG5cblx0XHRcdFx0XHQvLyBnZW5lcmF0ZSBVVnMgYWxvbmcgWCB0aGVuIFlcblx0XHRcdFx0XHRmYWNlRGlyVmVjdG9yLnNldCggMCwgMCwgMSApO1xuXHRcdFx0XHRcdHV2c1sgaiArIDAgXSA9IDEuMCAtIGdldFV2KCBmYWNlRGlyVmVjdG9yLCBub3JtYWwsICd4JywgJ3knLCByYWRpdXMsIHdpZHRoICk7XG5cdFx0XHRcdFx0dXZzWyBqICsgMSBdID0gMS4wIC0gZ2V0VXYoIGZhY2VEaXJWZWN0b3IsIG5vcm1hbCwgJ3knLCAneCcsIHJhZGl1cywgaGVpZ2h0ICk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0Y2FzZSA1OiAvLyBiYWNrXG5cblx0XHRcdFx0XHQvLyBnZW5lcmF0ZSBVVnMgYWxvbmcgWCB0aGVuIFlcblx0XHRcdFx0XHRmYWNlRGlyVmVjdG9yLnNldCggMCwgMCwgLSAxICk7XG5cdFx0XHRcdFx0dXZzWyBqICsgMCBdID0gZ2V0VXYoIGZhY2VEaXJWZWN0b3IsIG5vcm1hbCwgJ3gnLCAneScsIHJhZGl1cywgd2lkdGggKTtcblx0XHRcdFx0XHR1dnNbIGogKyAxIF0gPSAxLjAgLSBnZXRVdiggZmFjZURpclZlY3Rvciwgbm9ybWFsLCAneScsICd4JywgcmFkaXVzLCBoZWlnaHQgKTtcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdH1cblxufVxuXG5leHBvcnQgeyBSb3VuZGVkQm94R2VvbWV0cnkgfTtcbiIsImltcG9ydCB7XG5cdEJ1ZmZlckdlb21ldHJ5LFxuXHRGbG9hdDMyQnVmZmVyQXR0cmlidXRlLFxuXHRMaW5lU2VnbWVudHMsXG5cdExpbmVCYXNpY01hdGVyaWFsLFxuXHRNYXRyaXgzLFxuXHRWZWN0b3IzXG59IGZyb20gJ3RocmVlJztcblxuY29uc3QgX3YxID0gbmV3IFZlY3RvcjMoKTtcbmNvbnN0IF92MiA9IG5ldyBWZWN0b3IzKCk7XG5jb25zdCBfbm9ybWFsTWF0cml4ID0gbmV3IE1hdHJpeDMoKTtcblxuY2xhc3MgVmVydGV4Tm9ybWFsc0hlbHBlciBleHRlbmRzIExpbmVTZWdtZW50cyB7XG5cblx0Y29uc3RydWN0b3IoIG9iamVjdCwgc2l6ZSA9IDEsIGNvbG9yID0gMHhmZjAwMDAgKSB7XG5cblx0XHRjb25zdCBnZW9tZXRyeSA9IG5ldyBCdWZmZXJHZW9tZXRyeSgpO1xuXG5cdFx0Y29uc3Qgbk5vcm1hbHMgPSBvYmplY3QuZ2VvbWV0cnkuYXR0cmlidXRlcy5ub3JtYWwuY291bnQ7XG5cdFx0Y29uc3QgcG9zaXRpb25zID0gbmV3IEZsb2F0MzJCdWZmZXJBdHRyaWJ1dGUoIG5Ob3JtYWxzICogMiAqIDMsIDMgKTtcblxuXHRcdGdlb21ldHJ5LnNldEF0dHJpYnV0ZSggJ3Bvc2l0aW9uJywgcG9zaXRpb25zICk7XG5cblx0XHRzdXBlciggZ2VvbWV0cnksIG5ldyBMaW5lQmFzaWNNYXRlcmlhbCggeyBjb2xvciwgdG9uZU1hcHBlZDogZmFsc2UgfSApICk7XG5cblx0XHR0aGlzLm9iamVjdCA9IG9iamVjdDtcblx0XHR0aGlzLnNpemUgPSBzaXplO1xuXHRcdHRoaXMudHlwZSA9ICdWZXJ0ZXhOb3JtYWxzSGVscGVyJztcblxuXHRcdC8vXG5cblx0XHR0aGlzLm1hdHJpeEF1dG9VcGRhdGUgPSBmYWxzZTtcblxuXHRcdHRoaXMudXBkYXRlKCk7XG5cblx0fVxuXG5cdHVwZGF0ZSgpIHtcblxuXHRcdHRoaXMub2JqZWN0LnVwZGF0ZU1hdHJpeFdvcmxkKCB0cnVlICk7XG5cblx0XHRfbm9ybWFsTWF0cml4LmdldE5vcm1hbE1hdHJpeCggdGhpcy5vYmplY3QubWF0cml4V29ybGQgKTtcblxuXHRcdGNvbnN0IG1hdHJpeFdvcmxkID0gdGhpcy5vYmplY3QubWF0cml4V29ybGQ7XG5cblx0XHRjb25zdCBwb3NpdGlvbiA9IHRoaXMuZ2VvbWV0cnkuYXR0cmlidXRlcy5wb3NpdGlvbjtcblxuXHRcdC8vXG5cblx0XHRjb25zdCBvYmpHZW9tZXRyeSA9IHRoaXMub2JqZWN0Lmdlb21ldHJ5O1xuXG5cdFx0aWYgKCBvYmpHZW9tZXRyeSApIHtcblxuXHRcdFx0Y29uc3Qgb2JqUG9zID0gb2JqR2VvbWV0cnkuYXR0cmlidXRlcy5wb3NpdGlvbjtcblxuXHRcdFx0Y29uc3Qgb2JqTm9ybSA9IG9iakdlb21ldHJ5LmF0dHJpYnV0ZXMubm9ybWFsO1xuXG5cdFx0XHRsZXQgaWR4ID0gMDtcblxuXHRcdFx0Ly8gZm9yIHNpbXBsaWNpdHksIGlnbm9yZSBpbmRleCBhbmQgZHJhd2NhbGxzLCBhbmQgcmVuZGVyIGV2ZXJ5IG5vcm1hbFxuXG5cdFx0XHRmb3IgKCBsZXQgaiA9IDAsIGpsID0gb2JqUG9zLmNvdW50OyBqIDwgamw7IGogKysgKSB7XG5cblx0XHRcdFx0X3YxLmZyb21CdWZmZXJBdHRyaWJ1dGUoIG9ialBvcywgaiApLmFwcGx5TWF0cml4NCggbWF0cml4V29ybGQgKTtcblxuXHRcdFx0XHRfdjIuZnJvbUJ1ZmZlckF0dHJpYnV0ZSggb2JqTm9ybSwgaiApO1xuXG5cdFx0XHRcdF92Mi5hcHBseU1hdHJpeDMoIF9ub3JtYWxNYXRyaXggKS5ub3JtYWxpemUoKS5tdWx0aXBseVNjYWxhciggdGhpcy5zaXplICkuYWRkKCBfdjEgKTtcblxuXHRcdFx0XHRwb3NpdGlvbi5zZXRYWVooIGlkeCwgX3YxLngsIF92MS55LCBfdjEueiApO1xuXG5cdFx0XHRcdGlkeCA9IGlkeCArIDE7XG5cblx0XHRcdFx0cG9zaXRpb24uc2V0WFlaKCBpZHgsIF92Mi54LCBfdjIueSwgX3YyLnogKTtcblxuXHRcdFx0XHRpZHggPSBpZHggKyAxO1xuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRwb3NpdGlvbi5uZWVkc1VwZGF0ZSA9IHRydWU7XG5cblx0fVxuXG59XG5cblxuZXhwb3J0IHsgVmVydGV4Tm9ybWFsc0hlbHBlciB9O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
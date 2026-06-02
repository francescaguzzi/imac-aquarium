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

/***/ "./samples/chapters/chapter-6/parametric-geometry.js"
/*!***********************************************************!*\
  !*** ./samples/chapters/chapter-6/parametric-geometry.js ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_standard_scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/standard-scene */ "./samples/chapters/chapter-6/util/standard-scene.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./samples/chapters/chapter-6/util/index.js");
/* harmony import */ var three_examples_jsm_geometries_ParametricGeometry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/geometries/ParametricGeometry */ "./node_modules/three/examples/jsm/geometries/ParametricGeometry.js");
/* harmony import */ var three_examples_jsm_geometries_ParametricGeometries__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/jsm/geometries/ParametricGeometries */ "./node_modules/three/examples/jsm/geometries/ParametricGeometries.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../util */ "./samples/util/index.js");







const plane = (width, height) => {
  return (u, v, optionalTarget) => {
    var result = optionalTarget || new three__WEBPACK_IMPORTED_MODULE_4__.Vector3()
    var x = u * width
    var y = 0
    var z = v * height
    return result.set(x, y, z)
  }
}

const radialWave = (u, v, optionalTarget) => {
  var result = optionalTarget || new three__WEBPACK_IMPORTED_MODULE_4__.Vector3()
  var r = 20

  var x = Math.sin(u) * r
  var z = Math.sin(v / 2) * 2 * r + -10
  var y = Math.sin(u * 4 * Math.PI) + Math.cos(v * 2 * Math.PI)

  return result.set(x, y, z)
}

const funcs = {
  plane: plane(10, 10),
  radialWave: radialWave,
  klein: three_examples_jsm_geometries_ParametricGeometries__WEBPACK_IMPORTED_MODULE_3__.ParametricGeometries.klein,
  mobius: three_examples_jsm_geometries_ParametricGeometries__WEBPACK_IMPORTED_MODULE_3__.ParametricGeometries.mobius,
  mobius3d: three_examples_jsm_geometries_ParametricGeometries__WEBPACK_IMPORTED_MODULE_3__.ParametricGeometries.mobius3d
}

const props = {
  slices: 20,
  stacks: 20,
  func: 'plane'
}

const updateGeometry = ({ func, slices, stacks }) => {
  return new three_examples_jsm_geometries_ParametricGeometry__WEBPACK_IMPORTED_MODULE_2__.ParametricGeometry(funcs[func], slices, stacks).scale(0.5, 0.5, 0.5).translate(-3, 0, 0)
}

const geometry = updateGeometry(props)

;(0,_util_standard_scene__WEBPACK_IMPORTED_MODULE_0__.bootstrapGeometryScene)({
  geometry,
  provideGui: (gui, mesh) => {
    mesh.material.side = three__WEBPACK_IMPORTED_MODULE_4__.DoubleSide
    const folder = gui.addFolder('THREE.ParametricGeometry')
    folder.add(props, 'slices', 1, 100, 1).onChange(() => (0,_util__WEBPACK_IMPORTED_MODULE_1__.updateMesh)(mesh, updateGeometry(props)))
    folder.add(props, 'stacks', 1, 100, 1).onChange(() => (0,_util__WEBPACK_IMPORTED_MODULE_1__.updateMesh)(mesh, updateGeometry(props)))
    folder.add(props, 'func', (0,_util__WEBPACK_IMPORTED_MODULE_5__.getObjectsKeys)(funcs)).onChange(() => (0,_util__WEBPACK_IMPORTED_MODULE_1__.updateMesh)(mesh, updateGeometry(props)))
  }
}).then()


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

/***/ "./node_modules/three/examples/jsm/geometries/ParametricGeometries.js"
/*!****************************************************************************!*\
  !*** ./node_modules/three/examples/jsm/geometries/ParametricGeometries.js ***!
  \****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ParametricGeometries: () => (/* binding */ ParametricGeometries)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _ParametricGeometry_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ParametricGeometry.js */ "./node_modules/three/examples/jsm/geometries/ParametricGeometry.js");




/**
 * Experimenting of primitive geometry creation using Surface Parametric equations
 */

const ParametricGeometries = {

	klein: function ( v, u, target ) {

		u *= Math.PI;
		v *= 2 * Math.PI;

		u = u * 2;
		let x, z;
		if ( u < Math.PI ) {

			x = 3 * Math.cos( u ) * ( 1 + Math.sin( u ) ) + ( 2 * ( 1 - Math.cos( u ) / 2 ) ) * Math.cos( u ) * Math.cos( v );
			z = - 8 * Math.sin( u ) - 2 * ( 1 - Math.cos( u ) / 2 ) * Math.sin( u ) * Math.cos( v );

		} else {

			x = 3 * Math.cos( u ) * ( 1 + Math.sin( u ) ) + ( 2 * ( 1 - Math.cos( u ) / 2 ) ) * Math.cos( v + Math.PI );
			z = - 8 * Math.sin( u );

		}

		const y = - 2 * ( 1 - Math.cos( u ) / 2 ) * Math.sin( v );

		target.set( x, y, z );

	},

	plane: function ( width, height ) {

		return function ( u, v, target ) {

			const x = u * width;
			const y = 0;
			const z = v * height;

			target.set( x, y, z );

		};

	},

	mobius: function ( u, t, target ) {

		// flat mobius strip
		// http://www.wolframalpha.com/input/?i=M%C3%B6bius+strip+parametric+equations&lk=1&a=ClashPrefs_*Surface.MoebiusStrip.SurfaceProperty.ParametricEquations-
		u = u - 0.5;
		const v = 2 * Math.PI * t;

		const a = 2;

		const x = Math.cos( v ) * ( a + u * Math.cos( v / 2 ) );
		const y = Math.sin( v ) * ( a + u * Math.cos( v / 2 ) );
		const z = u * Math.sin( v / 2 );

		target.set( x, y, z );

	},

	mobius3d: function ( u, t, target ) {

		// volumetric mobius strip

		u *= Math.PI;
		t *= 2 * Math.PI;

		u = u * 2;
		const phi = u / 2;
		const major = 2.25, a = 0.125, b = 0.65;

		let x = a * Math.cos( t ) * Math.cos( phi ) - b * Math.sin( t ) * Math.sin( phi );
		const z = a * Math.cos( t ) * Math.sin( phi ) + b * Math.sin( t ) * Math.cos( phi );
		const y = ( major + x ) * Math.sin( u );
		x = ( major + x ) * Math.cos( u );

		target.set( x, y, z );

	}

};


/*********************************************
 *
 * Parametric Replacement for TubeGeometry
 *
 *********************************************/

ParametricGeometries.TubeGeometry = class TubeGeometry extends _ParametricGeometry_js__WEBPACK_IMPORTED_MODULE_1__.ParametricGeometry {

	constructor( path, segments = 64, radius = 1, segmentsRadius = 8, closed = false ) {

		const numpoints = segments + 1;

		const frames = path.computeFrenetFrames( segments, closed ),
			tangents = frames.tangents,
			normals = frames.normals,
			binormals = frames.binormals;

		const position = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();

		function ParametricTube( u, v, target ) {

			v *= 2 * Math.PI;

			const i = Math.floor( u * ( numpoints - 1 ) );

			path.getPointAt( u, position );

			const normal = normals[ i ];
			const binormal = binormals[ i ];

			const cx = - radius * Math.cos( v ); // TODO: Hack: Negating it so it faces outside.
			const cy = radius * Math.sin( v );

			position.x += cx * normal.x + cy * binormal.x;
			position.y += cx * normal.y + cy * binormal.y;
			position.z += cx * normal.z + cy * binormal.z;

			target.copy( position );

		}

		super( ParametricTube, segments, segmentsRadius );

		// proxy internals

		this.tangents = tangents;
		this.normals = normals;
		this.binormals = binormals;

		this.path = path;
		this.segments = segments;
		this.radius = radius;
		this.segmentsRadius = segmentsRadius;
		this.closed = closed;

	}

};


/*********************************************
  *
  * Parametric Replacement for TorusKnotGeometry
  *
  *********************************************/
ParametricGeometries.TorusKnotGeometry = class TorusKnotGeometry extends ParametricGeometries.TubeGeometry {

	constructor( radius = 200, tube = 40, segmentsT = 64, segmentsR = 8, p = 2, q = 3 ) {

		class TorusKnotCurve extends three__WEBPACK_IMPORTED_MODULE_0__.Curve {

			getPoint( t, optionalTarget = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3() ) {

				const point = optionalTarget;

				t *= Math.PI * 2;

				const r = 0.5;

				const x = ( 1 + r * Math.cos( q * t ) ) * Math.cos( p * t );
				const y = ( 1 + r * Math.cos( q * t ) ) * Math.sin( p * t );
				const z = r * Math.sin( q * t );

				return point.set( x, y, z ).multiplyScalar( radius );

			}

		}

		const segments = segmentsT;
		const radiusSegments = segmentsR;
		const extrudePath = new TorusKnotCurve();

		super( extrudePath, segments, tube, radiusSegments, true, false );

		this.radius = radius;
		this.tube = tube;
		this.segmentsT = segmentsT;
		this.segmentsR = segmentsR;
		this.p = p;
		this.q = q;

	}

};

/*********************************************
  *
  * Parametric Replacement for SphereGeometry
  *
  *********************************************/
ParametricGeometries.SphereGeometry = class SphereGeometry extends _ParametricGeometry_js__WEBPACK_IMPORTED_MODULE_1__.ParametricGeometry {

	constructor( size, u, v ) {

		function sphere( u, v, target ) {

			u *= Math.PI;
			v *= 2 * Math.PI;

			const x = size * Math.sin( u ) * Math.cos( v );
			const y = size * Math.sin( u ) * Math.sin( v );
			const z = size * Math.cos( u );

			target.set( x, y, z );

		}

		super( sphere, u, v );

	}

};


/*********************************************
  *
  * Parametric Replacement for PlaneGeometry
  *
  *********************************************/

ParametricGeometries.PlaneGeometry = class PlaneGeometry extends _ParametricGeometry_js__WEBPACK_IMPORTED_MODULE_1__.ParametricGeometry {

	constructor( width, depth, segmentsWidth, segmentsDepth ) {

		function plane( u, v, target ) {

			const x = u * width;
			const y = 0;
			const z = v * depth;

			target.set( x, y, z );

		}

		super( plane, segmentsWidth, segmentsDepth );

	}

};




/***/ },

/***/ "./node_modules/three/examples/jsm/geometries/ParametricGeometry.js"
/*!**************************************************************************!*\
  !*** ./node_modules/three/examples/jsm/geometries/ParametricGeometry.js ***!
  \**************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ParametricGeometry: () => (/* binding */ ParametricGeometry)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/**
 * Parametric Surfaces Geometry
 * based on the brilliant article by @prideout https://prideout.net/blog/old/blog/index.html@p=44.html
 */



class ParametricGeometry extends three__WEBPACK_IMPORTED_MODULE_0__.BufferGeometry {

	constructor( func = ( u, v, target ) => target.set( u, v, Math.cos( u ) * Math.sin( v ) ), slices = 8, stacks = 8 ) {

		super();

		this.type = 'ParametricGeometry';

		this.parameters = {
			func: func,
			slices: slices,
			stacks: stacks
		};

		// buffers

		const indices = [];
		const vertices = [];
		const normals = [];
		const uvs = [];

		const EPS = 0.00001;

		const normal = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();

		const p0 = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(), p1 = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();
		const pu = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(), pv = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();

		if ( func.length < 3 ) {

			console.error( 'THREE.ParametricGeometry: Function must now modify a Vector3 as third parameter.' );

		}

		// generate vertices, normals and uvs

		const sliceCount = slices + 1;

		for ( let i = 0; i <= stacks; i ++ ) {

			const v = i / stacks;

			for ( let j = 0; j <= slices; j ++ ) {

				const u = j / slices;

				// vertex

				func( u, v, p0 );
				vertices.push( p0.x, p0.y, p0.z );

				// normal

				// approximate tangent vectors via finite differences

				if ( u - EPS >= 0 ) {

					func( u - EPS, v, p1 );
					pu.subVectors( p0, p1 );

				} else {

					func( u + EPS, v, p1 );
					pu.subVectors( p1, p0 );

				}

				if ( v - EPS >= 0 ) {

					func( u, v - EPS, p1 );
					pv.subVectors( p0, p1 );

				} else {

					func( u, v + EPS, p1 );
					pv.subVectors( p1, p0 );

				}

				// cross product of tangent vectors returns surface normal

				normal.crossVectors( pu, pv ).normalize();
				normals.push( normal.x, normal.y, normal.z );

				// uv

				uvs.push( u, v );

			}

		}

		// generate indices

		for ( let i = 0; i < stacks; i ++ ) {

			for ( let j = 0; j < slices; j ++ ) {

				const a = i * sliceCount + j;
				const b = i * sliceCount + j + 1;
				const c = ( i + 1 ) * sliceCount + j + 1;
				const d = ( i + 1 ) * sliceCount + j;

				// faces one and two

				indices.push( a, b, d );
				indices.push( b, c, d );

			}

		}

		// build geometry

		this.setIndex( indices );
		this.setAttribute( 'position', new three__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute( vertices, 3 ) );
		this.setAttribute( 'normal', new three__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute( normals, 3 ) );
		this.setAttribute( 'uv', new three__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute( uvs, 2 ) );

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
/******/ 			"parametric-geometry": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","samples_bootstrap_bootstrap_js-samples_controls_material-controls_js-samples_controls_rendere-c87d8a"], () => (__webpack_require__("./samples/chapters/chapter-6/parametric-geometry.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQSw0Rzs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9ib290c3RyYXAvZmxvb3IuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItNi9wYXJhbWV0cmljLWdlb21ldHJ5LmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTYvdXRpbC9pbmRleC5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci02L3V0aWwvc3RhbmRhcmQtc2NlbmUuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NvbnRyb2xzL21lc2gtdmlzaWJsZS1jb250cm9scy5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY29udHJvbHMvc2NlbmUtY29udHJvbHMuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9ub2RlX21vZHVsZXMvdGhyZWUvZXhhbXBsZXMvanNtL2dlb21ldHJpZXMvUGFyYW1ldHJpY0dlb21ldHJpZXMuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9ub2RlX21vZHVsZXMvdGhyZWUvZXhhbXBsZXMvanNtL2dlb21ldHJpZXMvUGFyYW1ldHJpY0dlb21ldHJ5LmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vbm9kZV9tb2R1bGVzL3RocmVlL2V4YW1wbGVzL2pzbS9oZWxwZXJzL1ZlcnRleE5vcm1hbHNIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcblxuZXhwb3J0IGNvbnN0IGZvcmV2ZXJQbGFuZSA9IChzY2VuZSkgPT4ge1xuICBjb25zdCBnZW8gPSBuZXcgVEhSRUUuUGxhbmVCdWZmZXJHZW9tZXRyeSgxMDAwMCwgMTAwMDApXG4gIGNvbnN0IG1hdCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHtcbiAgICBjb2xvcjogMHhmZmZmZmZcbiAgfSlcbiAgY29uc3QgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlbywgbWF0KVxuICBtZXNoLnBvc2l0aW9uLnNldCgwLCAtMiwgMClcbiAgbWVzaC5yb3RhdGlvbi5zZXQoTWF0aC5QSSAvIC0yLCAwLCAwKVxuICBtZXNoLnJlY2VpdmVTaGFkb3cgPSB0cnVlXG4gIG1lc2gubmFtZSA9ICdmb3JldmVyLWZsb29yJ1xuICBzY2VuZS5hZGQobWVzaClcblxuICByZXR1cm4gbWVzaFxufVxuXG5leHBvcnQgY29uc3QgZmxvYXRpbmdGbG9vciA9IChzY2VuZSwgc2l6ZSkgPT4ge1xuICBjb25zdCBzID0gc2l6ZSA/IHNpemUgOiA2XG4gIGNvbnN0IGdlbyA9IG5ldyBUSFJFRS5Cb3hCdWZmZXJHZW9tZXRyeShzLCAwLjI1LCBzLCAxMCwgMTAsIDEwKVxuICBjb25zdCBtYXQgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoe1xuICAgIGNvbG9yOiAweGRkZGRkZFxuICB9KVxuICBjb25zdCBtZXNoID0gbmV3IFRIUkVFLk1lc2goZ2VvLCBtYXQpXG4gIG1lc2gucG9zaXRpb24uc2V0KDAsIC0yLCAtMSlcbiAgbWVzaC5yZWNlaXZlU2hhZG93ID0gdHJ1ZVxuICBtZXNoLm5hbWUgPSAnZmxvYXRpbmctZmxvb3InXG4gIHNjZW5lLmFkZChtZXNoKVxuXG4gIHJldHVybiBtZXNoXG59XG4iLCJpbXBvcnQgeyBib290c3RyYXBHZW9tZXRyeVNjZW5lIH0gZnJvbSAnLi91dGlsL3N0YW5kYXJkLXNjZW5lJ1xuaW1wb3J0IHsgdXBkYXRlTWVzaCB9IGZyb20gJy4vdXRpbCdcbmltcG9ydCB7IFBhcmFtZXRyaWNHZW9tZXRyeSB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9nZW9tZXRyaWVzL1BhcmFtZXRyaWNHZW9tZXRyeSdcbmltcG9ydCB7IFBhcmFtZXRyaWNHZW9tZXRyaWVzIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2dlb21ldHJpZXMvUGFyYW1ldHJpY0dlb21ldHJpZXMnXG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcbmltcG9ydCB7IGdldE9iamVjdHNLZXlzIH0gZnJvbSAnLi4vLi4vdXRpbCdcblxuY29uc3QgcGxhbmUgPSAod2lkdGgsIGhlaWdodCkgPT4ge1xuICByZXR1cm4gKHUsIHYsIG9wdGlvbmFsVGFyZ2V0KSA9PiB7XG4gICAgdmFyIHJlc3VsdCA9IG9wdGlvbmFsVGFyZ2V0IHx8IG5ldyBUSFJFRS5WZWN0b3IzKClcbiAgICB2YXIgeCA9IHUgKiB3aWR0aFxuICAgIHZhciB5ID0gMFxuICAgIHZhciB6ID0gdiAqIGhlaWdodFxuICAgIHJldHVybiByZXN1bHQuc2V0KHgsIHksIHopXG4gIH1cbn1cblxuY29uc3QgcmFkaWFsV2F2ZSA9ICh1LCB2LCBvcHRpb25hbFRhcmdldCkgPT4ge1xuICB2YXIgcmVzdWx0ID0gb3B0aW9uYWxUYXJnZXQgfHwgbmV3IFRIUkVFLlZlY3RvcjMoKVxuICB2YXIgciA9IDIwXG5cbiAgdmFyIHggPSBNYXRoLnNpbih1KSAqIHJcbiAgdmFyIHogPSBNYXRoLnNpbih2IC8gMikgKiAyICogciArIC0xMFxuICB2YXIgeSA9IE1hdGguc2luKHUgKiA0ICogTWF0aC5QSSkgKyBNYXRoLmNvcyh2ICogMiAqIE1hdGguUEkpXG5cbiAgcmV0dXJuIHJlc3VsdC5zZXQoeCwgeSwgeilcbn1cblxuY29uc3QgZnVuY3MgPSB7XG4gIHBsYW5lOiBwbGFuZSgxMCwgMTApLFxuICByYWRpYWxXYXZlOiByYWRpYWxXYXZlLFxuICBrbGVpbjogUGFyYW1ldHJpY0dlb21ldHJpZXMua2xlaW4sXG4gIG1vYml1czogUGFyYW1ldHJpY0dlb21ldHJpZXMubW9iaXVzLFxuICBtb2JpdXMzZDogUGFyYW1ldHJpY0dlb21ldHJpZXMubW9iaXVzM2Rcbn1cblxuY29uc3QgcHJvcHMgPSB7XG4gIHNsaWNlczogMjAsXG4gIHN0YWNrczogMjAsXG4gIGZ1bmM6ICdwbGFuZSdcbn1cblxuY29uc3QgdXBkYXRlR2VvbWV0cnkgPSAoeyBmdW5jLCBzbGljZXMsIHN0YWNrcyB9KSA9PiB7XG4gIHJldHVybiBuZXcgUGFyYW1ldHJpY0dlb21ldHJ5KGZ1bmNzW2Z1bmNdLCBzbGljZXMsIHN0YWNrcykuc2NhbGUoMC41LCAwLjUsIDAuNSkudHJhbnNsYXRlKC0zLCAwLCAwKVxufVxuXG5jb25zdCBnZW9tZXRyeSA9IHVwZGF0ZUdlb21ldHJ5KHByb3BzKVxuXG5ib290c3RyYXBHZW9tZXRyeVNjZW5lKHtcbiAgZ2VvbWV0cnksXG4gIHByb3ZpZGVHdWk6IChndWksIG1lc2gpID0+IHtcbiAgICBtZXNoLm1hdGVyaWFsLnNpZGUgPSBUSFJFRS5Eb3VibGVTaWRlXG4gICAgY29uc3QgZm9sZGVyID0gZ3VpLmFkZEZvbGRlcignVEhSRUUuUGFyYW1ldHJpY0dlb21ldHJ5JylcbiAgICBmb2xkZXIuYWRkKHByb3BzLCAnc2xpY2VzJywgMSwgMTAwLCAxKS5vbkNoYW5nZSgoKSA9PiB1cGRhdGVNZXNoKG1lc2gsIHVwZGF0ZUdlb21ldHJ5KHByb3BzKSkpXG4gICAgZm9sZGVyLmFkZChwcm9wcywgJ3N0YWNrcycsIDEsIDEwMCwgMSkub25DaGFuZ2UoKCkgPT4gdXBkYXRlTWVzaChtZXNoLCB1cGRhdGVHZW9tZXRyeShwcm9wcykpKVxuICAgIGZvbGRlci5hZGQocHJvcHMsICdmdW5jJywgZ2V0T2JqZWN0c0tleXMoZnVuY3MpKS5vbkNoYW5nZSgoKSA9PiB1cGRhdGVNZXNoKG1lc2gsIHVwZGF0ZUdlb21ldHJ5KHByb3BzKSkpXG4gIH1cbn0pLnRoZW4oKVxuIiwiZXhwb3J0IGNvbnN0IHVwZGF0ZU1lc2ggPSAobWVzaCwgZ2VvbWV0cnkpID0+IHtcbiAgbWVzaC5nZW9tZXRyeS5kaXNwb3NlKClcbiAgbWVzaC5nZW9tZXRyeSA9IGdlb21ldHJ5XG59XG4iLCJpbXBvcnQgeyBpbml0U2NlbmUgfSBmcm9tICcuLi8uLi8uLi9ib290c3RyYXAvYm9vdHN0cmFwJ1xuaW1wb3J0IHsgaW50aWFsaXplUmVuZGVyZXJDb250cm9scyB9IGZyb20gJy4uLy4uLy4uL2NvbnRyb2xzL3JlbmRlcmVyLWNvbnRyb2wnXG5cbmltcG9ydCBHVUkgZnJvbSAnbGlsLWd1aSdcbmltcG9ydCB7IGluaXRpYWxpemVHdWlNYXRlcmlhbCwgaW5pdGlhbGl6ZUd1aU1lc2hTdGFuZGFyZE1hdGVyaWFsIH0gZnJvbSAnLi4vLi4vLi4vY29udHJvbHMvbWF0ZXJpYWwtY29udHJvbHMnXG5pbXBvcnQgeyBpbml0aWFsaXplU2NlbmVDb250cm9scyB9IGZyb20gJy4uLy4uLy4uL2NvbnRyb2xzL3NjZW5lLWNvbnRyb2xzJ1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5pbXBvcnQgeyBmb3JldmVyUGxhbmUgfSBmcm9tICcuLi8uLi8uLi9ib290c3RyYXAvZmxvb3InXG5pbXBvcnQgeyBpbml0aWFsaXplTWVzaFZpc2libGVDb250cm9scyB9IGZyb20gJy4uLy4uLy4uL2NvbnRyb2xzL21lc2gtdmlzaWJsZS1jb250cm9scydcblxuZXhwb3J0IGNvbnN0IGJvb3RzdHJhcEdlb21ldHJ5U2NlbmUgPSBhc3luYyAoeyBnZW9tZXRyeSwgcHJvdmlkZUd1aSwgaGlkZWZsb29yLCBvdmVycmlkZU1hdGVyaWFsLCB1c2VMaW5lIH0pID0+IHtcbiAgY29uc3QgcHJvcHMgPSB7XG4gICAgYmFja2dyb3VuZENvbG9yOiAweGZmZmZmZixcbiAgICBmb2dDb2xvcjogMHhmZmZmZmZcbiAgfVxuXG4gIGNvbnN0IGd1aSA9IG5ldyBHVUkoKVxuXG4gIGNvbnN0IGluaXQgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgbWF0ZXJpYWwgPVxuICAgICAgb3ZlcnJpZGVNYXRlcmlhbCA/P1xuICAgICAgbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcbiAgICAgICAgY29sb3I6IDB4ZmZhYTg4XG4gICAgICB9KVxuICAgIGNvbnN0IG1lc2ggPSB1c2VMaW5lID8gbmV3IFRIUkVFLkxpbmVTZWdtZW50cyhnZW9tZXRyeSwgbWF0ZXJpYWwpIDogbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKVxuICAgIG1lc2guY2FzdFNoYWRvdyA9IHRydWVcbiAgICBpbml0U2NlbmUocHJvcHMpKCh7IHNjZW5lLCBjYW1lcmEsIHJlbmRlcmVyLCBvcmJpdENvbnRyb2xzIH0pID0+IHtcbiAgICAgIHJlbmRlcmVyLnNoYWRvd01hcC50eXBlID0gVEhSRUUuUENGU29mdFNoYWRvd01hcFxuICAgICAgY2FtZXJhLnBvc2l0aW9uLnggPSAtM1xuICAgICAgY2FtZXJhLnBvc2l0aW9uLnogPSA4XG4gICAgICBjYW1lcmEucG9zaXRpb24ueSA9IDJcbiAgICAgIG9yYml0Q29udHJvbHMudXBkYXRlKClcblxuICAgICAgZnVuY3Rpb24gYW5pbWF0ZSgpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpXG4gICAgICAgIHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhKVxuICAgICAgICBvcmJpdENvbnRyb2xzLnVwZGF0ZSgpXG4gICAgICB9XG5cbiAgICAgIGFuaW1hdGUoKVxuXG4gICAgICBjb25zdCBwbGFuZSA9IGhpZGVmbG9vciA/PyBmb3JldmVyUGxhbmUoc2NlbmUpXG4gICAgICBzY2VuZS5hZGQobWVzaClcbiAgICAgIGludGlhbGl6ZVJlbmRlcmVyQ29udHJvbHMoZ3VpLCByZW5kZXJlcilcbiAgICAgIGluaXRpYWxpemVTY2VuZUNvbnRyb2xzKGd1aSwgc2NlbmUsIGZhbHNlKVxuXG4gICAgICBpbml0aWFsaXplR3VpTWF0ZXJpYWwoZ3VpLCBtZXNoLCBtYXRlcmlhbCkuY2xvc2UoKVxuICAgICAgb3ZlcnJpZGVNYXRlcmlhbCA/PyBpbml0aWFsaXplR3VpTWVzaFN0YW5kYXJkTWF0ZXJpYWwoZ3VpLCBtZXNoLCBtYXRlcmlhbCkuY2xvc2UoKVxuICAgICAgaGlkZWZsb29yID8/IGluaXRpYWxpemVNZXNoVmlzaWJsZUNvbnRyb2xzKGd1aSwgcGxhbmUsICdGbG9vcicpXG4gICAgICBwcm92aWRlR3VpKGd1aSwgbWVzaCwgc2NlbmUpXG4gICAgfSlcbiAgfVxuXG4gIGluaXQoKS50aGVuKClcbn1cbiIsImV4cG9ydCBjb25zdCBpbml0aWFsaXplTWVzaFZpc2libGVDb250cm9scyA9IChndWksIG1lc2gsIHRpdGxlKSA9PiB7XG4gIGNvbnN0IGZvbGRlciA9IGd1aS5hZGRGb2xkZXIodGl0bGUpXG4gIGZvbGRlci5hZGQobWVzaCwgJ3Zpc2libGUnKVxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5cbmNvbnN0IHRleHR1cmVMb2FkZXIgPSBuZXcgVEhSRUUuVGV4dHVyZUxvYWRlcigpXG5cbmNvbnN0IHByb3BlcnRpZXNPYmplY3QgPSAoc2NlbmUpID0+ICh7XG4gIG92ZXJyaWRlTWF0ZXJpYWw6IHtcbiAgICB0b2dnbGU6ICgpID0+IHtcbiAgICAgIGlmIChzY2VuZS5vdmVycmlkZU1hdGVyaWFsICE9PSBudWxsKSB7XG4gICAgICAgIHNjZW5lLm92ZXJyaWRlTWF0ZXJpYWwgPSBudWxsXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY2VuZS5vdmVycmlkZU1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hOb3JtYWxNYXRlcmlhbCgpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBiYWNrR3JvdW5kOiAnV2hpdGUnLFxuICBlbnZpcm9ubWVudDoge1xuICAgIHRvZ2dsZTogKCkgPT4ge1xuICAgICAgaWYgKHNjZW5lLmVudmlyb25tZW50ICE9PSBudWxsKSB7XG4gICAgICAgIHNjZW5lLmVudmlyb25tZW50ID0gbnVsbFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGV4dHVyZUxvYWRlci5sb2FkKCcvYXNzZXRzL2VxdWkuanBlZycsIChsb2FkZWQpID0+IHtcbiAgICAgICAgICBsb2FkZWQubWFwcGluZyA9IFRIUkVFLkVxdWlyZWN0YW5ndWxhclJlZmxlY3Rpb25NYXBwaW5nXG4gICAgICAgICAgc2NlbmUuZW52aXJvbm1lbnQgPSBsb2FkZWRcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pXG5cbmNvbnN0IGZvZ1Byb3BlcnRpZXMgPSAoZm9nKSA9PiAoe1xuICBjb2xvcjogMHhmZmZmZmYsXG4gIG5lYXI6IGZvZy5uZWFyLFxuICBmYXI6IGZvZy5mYXJcbn0pXG5cbmV4cG9ydCBjb25zdCBpbml0aWFsaXplU2NlbmVDb250cm9scyA9IChndWksIHNjZW5lLCBmb2dFbmFibGVkLCBpc09wZW4pID0+IHtcbiAgY29uc3QgcHJvcHMgPSBwcm9wZXJ0aWVzT2JqZWN0KHNjZW5lKVxuICBjb25zdCBzY2VuZUNvbnRyb2xzID0gZ3VpLmFkZEZvbGRlcignU2NlbmUnKVxuXG4gIHNjZW5lQ29udHJvbHNcbiAgICAuYWRkKHByb3BzLCAnYmFja0dyb3VuZCcsIFsnV2hpdGUnLCAnQmxhY2snLCAnTnVsbCcsICdDb2xvcicsICdUZXh0dXJlJywgJ0N1YmVtYXAnXSlcbiAgICAub25DaGFuZ2UoKGV2ZW50KSA9PiBoYW5kbGVCYWNrZ3JvdW5kQ2hhbmdlKGV2ZW50LCBzY2VuZSkpXG4gIHNjZW5lQ29udHJvbHMuYWRkKHByb3BzLm92ZXJyaWRlTWF0ZXJpYWwsICd0b2dnbGUnKS5uYW1lKCdUb2dnbGUgT3ZlcnJpZGUgTWF0ZXJpYWwnKVxuICBzY2VuZUNvbnRyb2xzLmFkZChwcm9wcy5lbnZpcm9ubWVudCwgJ3RvZ2dsZScpLm5hbWUoJ1RvZ2dsZSBFbnZpcm9ubWVudCcpXG5cbiAgaWYgKGZvZ0VuYWJsZWQpIHtcbiAgICBjb25zdCBmb2dDb2xvciA9IG5ldyBUSFJFRS5Db2xvcigweGZmZmZmZilcbiAgICBjb25zdCBmb2cgPSBuZXcgVEhSRUUuRm9nKGZvZ0NvbG9yLCAxLCAyMClcbiAgICBzY2VuZS5mb2cgPSBmb2dcbiAgICBjb25zdCBmb2dQcm9wcyA9IGZvZ1Byb3BlcnRpZXMoZm9nKVxuICAgIGNvbnN0IGZvZ0NvbnRyb2xzID0gc2NlbmVDb250cm9scy5hZGRGb2xkZXIoJ0ZvZycpXG4gICAgZm9nQ29udHJvbHMuYWRkQ29sb3IoZm9nUHJvcHMsICdjb2xvcicpXG4gICAgZm9nQ29udHJvbHMuYWRkKGZvZ1Byb3BzLCAnbmVhcicsIDAsIDEwLCAwLjEpXG4gICAgZm9nQ29udHJvbHMuYWRkKGZvZ1Byb3BzLCAnZmFyJywgMCwgMTAwLCAwLjEpXG5cbiAgICBmb2dDb250cm9scy5vbkNoYW5nZSgoKSA9PiB7XG4gICAgICBmb2cuY29sb3IgPSBmb2dDb2xvci5zZXRIZXgoZm9nUHJvcHMuY29sb3IpXG4gICAgICBmb2cubmVhciA9IGZvZ1Byb3BzLm5lYXJcbiAgICAgIGZvZy5mYXIgPSBmb2dQcm9wcy5mYXJcbiAgICB9KVxuICB9XG5cbiAgaXNPcGVuID8gc2NlbmVDb250cm9scy5vcGVuKCkgOiBzY2VuZUNvbnRyb2xzLmNsb3NlKClcbn1cblxuY29uc3QgaGFuZGxlQmFja2dyb3VuZENoYW5nZSA9IChzZXR0aW5nLCBzY2VuZSkgPT4ge1xuICBzd2l0Y2ggKHNldHRpbmcpIHtcbiAgICBjYXNlICdXaGl0ZSc6XG4gICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbmV3IFRIUkVFLkNvbG9yKDB4ZmZmZmZmKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdCbGFjayc6XG4gICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbmV3IFRIUkVFLkNvbG9yKDB4MDAwMDAwKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdOdWxsJzpcbiAgICAgIHNjZW5lLmJhY2tncm91bmQgPSBudWxsXG4gICAgICBicmVha1xuICAgIGNhc2UgJ0NvbG9yJzpcbiAgICAgIHNjZW5lLmJhY2tncm91bmQgPSBuZXcgVEhSRUUuQ29sb3IoMHg0NGZmNDQpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ1RleHR1cmUnOlxuICAgICAgdGV4dHVyZUxvYWRlci5sb2FkKCcvYXNzZXRzL3RleHR1cmVzL3dvb2QvYWJzdHJhY3QtYW50aXF1ZS1iYWNrZHJvcC0xNjQwMDUuanBnJywgKGxvYWRlZCkgPT4ge1xuICAgICAgICBsb2FkZWQuZW5jb2RpbmcgPSBUSFJFRS5zUkdCRW5jb2RpbmdcbiAgICAgICAgc2NlbmUuYmFja2dyb3VuZCA9IGxvYWRlZFxuICAgICAgICBzY2VuZS5lbnZpcm9ubWVudCA9IG51bGxcbiAgICAgIH0pXG4gICAgICBicmVha1xuICAgIGNhc2UgJ0N1YmVtYXAnOlxuICAgICAgdGV4dHVyZUxvYWRlci5sb2FkKCcvYXNzZXRzL2VxdWkuanBlZycsIChsb2FkZWQpID0+IHtcbiAgICAgICAgbG9hZGVkLm1hcHBpbmcgPSBUSFJFRS5FcXVpcmVjdGFuZ3VsYXJSZWZsZWN0aW9uTWFwcGluZ1xuICAgICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbG9hZGVkXG4gICAgICAgIHNjZW5lLmVudmlyb25tZW50ID0gbG9hZGVkXG4gICAgICB9KVxuXG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICBicmVha1xuICB9XG59XG4iLCJpbXBvcnQge1xuXHRDdXJ2ZSxcblx0VmVjdG9yM1xufSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7IFBhcmFtZXRyaWNHZW9tZXRyeSB9IGZyb20gJy4vUGFyYW1ldHJpY0dlb21ldHJ5LmpzJztcblxuLyoqXG4gKiBFeHBlcmltZW50aW5nIG9mIHByaW1pdGl2ZSBnZW9tZXRyeSBjcmVhdGlvbiB1c2luZyBTdXJmYWNlIFBhcmFtZXRyaWMgZXF1YXRpb25zXG4gKi9cblxuY29uc3QgUGFyYW1ldHJpY0dlb21ldHJpZXMgPSB7XG5cblx0a2xlaW46IGZ1bmN0aW9uICggdiwgdSwgdGFyZ2V0ICkge1xuXG5cdFx0dSAqPSBNYXRoLlBJO1xuXHRcdHYgKj0gMiAqIE1hdGguUEk7XG5cblx0XHR1ID0gdSAqIDI7XG5cdFx0bGV0IHgsIHo7XG5cdFx0aWYgKCB1IDwgTWF0aC5QSSApIHtcblxuXHRcdFx0eCA9IDMgKiBNYXRoLmNvcyggdSApICogKCAxICsgTWF0aC5zaW4oIHUgKSApICsgKCAyICogKCAxIC0gTWF0aC5jb3MoIHUgKSAvIDIgKSApICogTWF0aC5jb3MoIHUgKSAqIE1hdGguY29zKCB2ICk7XG5cdFx0XHR6ID0gLSA4ICogTWF0aC5zaW4oIHUgKSAtIDIgKiAoIDEgLSBNYXRoLmNvcyggdSApIC8gMiApICogTWF0aC5zaW4oIHUgKSAqIE1hdGguY29zKCB2ICk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHR4ID0gMyAqIE1hdGguY29zKCB1ICkgKiAoIDEgKyBNYXRoLnNpbiggdSApICkgKyAoIDIgKiAoIDEgLSBNYXRoLmNvcyggdSApIC8gMiApICkgKiBNYXRoLmNvcyggdiArIE1hdGguUEkgKTtcblx0XHRcdHogPSAtIDggKiBNYXRoLnNpbiggdSApO1xuXG5cdFx0fVxuXG5cdFx0Y29uc3QgeSA9IC0gMiAqICggMSAtIE1hdGguY29zKCB1ICkgLyAyICkgKiBNYXRoLnNpbiggdiApO1xuXG5cdFx0dGFyZ2V0LnNldCggeCwgeSwgeiApO1xuXG5cdH0sXG5cblx0cGxhbmU6IGZ1bmN0aW9uICggd2lkdGgsIGhlaWdodCApIHtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIHUsIHYsIHRhcmdldCApIHtcblxuXHRcdFx0Y29uc3QgeCA9IHUgKiB3aWR0aDtcblx0XHRcdGNvbnN0IHkgPSAwO1xuXHRcdFx0Y29uc3QgeiA9IHYgKiBoZWlnaHQ7XG5cblx0XHRcdHRhcmdldC5zZXQoIHgsIHksIHogKTtcblxuXHRcdH07XG5cblx0fSxcblxuXHRtb2JpdXM6IGZ1bmN0aW9uICggdSwgdCwgdGFyZ2V0ICkge1xuXG5cdFx0Ly8gZmxhdCBtb2JpdXMgc3RyaXBcblx0XHQvLyBodHRwOi8vd3d3LndvbGZyYW1hbHBoYS5jb20vaW5wdXQvP2k9TSVDMyVCNmJpdXMrc3RyaXArcGFyYW1ldHJpYytlcXVhdGlvbnMmbGs9MSZhPUNsYXNoUHJlZnNfKlN1cmZhY2UuTW9lYml1c1N0cmlwLlN1cmZhY2VQcm9wZXJ0eS5QYXJhbWV0cmljRXF1YXRpb25zLVxuXHRcdHUgPSB1IC0gMC41O1xuXHRcdGNvbnN0IHYgPSAyICogTWF0aC5QSSAqIHQ7XG5cblx0XHRjb25zdCBhID0gMjtcblxuXHRcdGNvbnN0IHggPSBNYXRoLmNvcyggdiApICogKCBhICsgdSAqIE1hdGguY29zKCB2IC8gMiApICk7XG5cdFx0Y29uc3QgeSA9IE1hdGguc2luKCB2ICkgKiAoIGEgKyB1ICogTWF0aC5jb3MoIHYgLyAyICkgKTtcblx0XHRjb25zdCB6ID0gdSAqIE1hdGguc2luKCB2IC8gMiApO1xuXG5cdFx0dGFyZ2V0LnNldCggeCwgeSwgeiApO1xuXG5cdH0sXG5cblx0bW9iaXVzM2Q6IGZ1bmN0aW9uICggdSwgdCwgdGFyZ2V0ICkge1xuXG5cdFx0Ly8gdm9sdW1ldHJpYyBtb2JpdXMgc3RyaXBcblxuXHRcdHUgKj0gTWF0aC5QSTtcblx0XHR0ICo9IDIgKiBNYXRoLlBJO1xuXG5cdFx0dSA9IHUgKiAyO1xuXHRcdGNvbnN0IHBoaSA9IHUgLyAyO1xuXHRcdGNvbnN0IG1ham9yID0gMi4yNSwgYSA9IDAuMTI1LCBiID0gMC42NTtcblxuXHRcdGxldCB4ID0gYSAqIE1hdGguY29zKCB0ICkgKiBNYXRoLmNvcyggcGhpICkgLSBiICogTWF0aC5zaW4oIHQgKSAqIE1hdGguc2luKCBwaGkgKTtcblx0XHRjb25zdCB6ID0gYSAqIE1hdGguY29zKCB0ICkgKiBNYXRoLnNpbiggcGhpICkgKyBiICogTWF0aC5zaW4oIHQgKSAqIE1hdGguY29zKCBwaGkgKTtcblx0XHRjb25zdCB5ID0gKCBtYWpvciArIHggKSAqIE1hdGguc2luKCB1ICk7XG5cdFx0eCA9ICggbWFqb3IgKyB4ICkgKiBNYXRoLmNvcyggdSApO1xuXG5cdFx0dGFyZ2V0LnNldCggeCwgeSwgeiApO1xuXG5cdH1cblxufTtcblxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKlxuICogUGFyYW1ldHJpYyBSZXBsYWNlbWVudCBmb3IgVHViZUdlb21ldHJ5XG4gKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuUGFyYW1ldHJpY0dlb21ldHJpZXMuVHViZUdlb21ldHJ5ID0gY2xhc3MgVHViZUdlb21ldHJ5IGV4dGVuZHMgUGFyYW1ldHJpY0dlb21ldHJ5IHtcblxuXHRjb25zdHJ1Y3RvciggcGF0aCwgc2VnbWVudHMgPSA2NCwgcmFkaXVzID0gMSwgc2VnbWVudHNSYWRpdXMgPSA4LCBjbG9zZWQgPSBmYWxzZSApIHtcblxuXHRcdGNvbnN0IG51bXBvaW50cyA9IHNlZ21lbnRzICsgMTtcblxuXHRcdGNvbnN0IGZyYW1lcyA9IHBhdGguY29tcHV0ZUZyZW5ldEZyYW1lcyggc2VnbWVudHMsIGNsb3NlZCApLFxuXHRcdFx0dGFuZ2VudHMgPSBmcmFtZXMudGFuZ2VudHMsXG5cdFx0XHRub3JtYWxzID0gZnJhbWVzLm5vcm1hbHMsXG5cdFx0XHRiaW5vcm1hbHMgPSBmcmFtZXMuYmlub3JtYWxzO1xuXG5cdFx0Y29uc3QgcG9zaXRpb24gPSBuZXcgVmVjdG9yMygpO1xuXG5cdFx0ZnVuY3Rpb24gUGFyYW1ldHJpY1R1YmUoIHUsIHYsIHRhcmdldCApIHtcblxuXHRcdFx0diAqPSAyICogTWF0aC5QSTtcblxuXHRcdFx0Y29uc3QgaSA9IE1hdGguZmxvb3IoIHUgKiAoIG51bXBvaW50cyAtIDEgKSApO1xuXG5cdFx0XHRwYXRoLmdldFBvaW50QXQoIHUsIHBvc2l0aW9uICk7XG5cblx0XHRcdGNvbnN0IG5vcm1hbCA9IG5vcm1hbHNbIGkgXTtcblx0XHRcdGNvbnN0IGJpbm9ybWFsID0gYmlub3JtYWxzWyBpIF07XG5cblx0XHRcdGNvbnN0IGN4ID0gLSByYWRpdXMgKiBNYXRoLmNvcyggdiApOyAvLyBUT0RPOiBIYWNrOiBOZWdhdGluZyBpdCBzbyBpdCBmYWNlcyBvdXRzaWRlLlxuXHRcdFx0Y29uc3QgY3kgPSByYWRpdXMgKiBNYXRoLnNpbiggdiApO1xuXG5cdFx0XHRwb3NpdGlvbi54ICs9IGN4ICogbm9ybWFsLnggKyBjeSAqIGJpbm9ybWFsLng7XG5cdFx0XHRwb3NpdGlvbi55ICs9IGN4ICogbm9ybWFsLnkgKyBjeSAqIGJpbm9ybWFsLnk7XG5cdFx0XHRwb3NpdGlvbi56ICs9IGN4ICogbm9ybWFsLnogKyBjeSAqIGJpbm9ybWFsLno7XG5cblx0XHRcdHRhcmdldC5jb3B5KCBwb3NpdGlvbiApO1xuXG5cdFx0fVxuXG5cdFx0c3VwZXIoIFBhcmFtZXRyaWNUdWJlLCBzZWdtZW50cywgc2VnbWVudHNSYWRpdXMgKTtcblxuXHRcdC8vIHByb3h5IGludGVybmFsc1xuXG5cdFx0dGhpcy50YW5nZW50cyA9IHRhbmdlbnRzO1xuXHRcdHRoaXMubm9ybWFscyA9IG5vcm1hbHM7XG5cdFx0dGhpcy5iaW5vcm1hbHMgPSBiaW5vcm1hbHM7XG5cblx0XHR0aGlzLnBhdGggPSBwYXRoO1xuXHRcdHRoaXMuc2VnbWVudHMgPSBzZWdtZW50cztcblx0XHR0aGlzLnJhZGl1cyA9IHJhZGl1cztcblx0XHR0aGlzLnNlZ21lbnRzUmFkaXVzID0gc2VnbWVudHNSYWRpdXM7XG5cdFx0dGhpcy5jbG9zZWQgPSBjbG9zZWQ7XG5cblx0fVxuXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgKlxuICAqIFBhcmFtZXRyaWMgUmVwbGFjZW1lbnQgZm9yIFRvcnVzS25vdEdlb21ldHJ5XG4gICpcbiAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuUGFyYW1ldHJpY0dlb21ldHJpZXMuVG9ydXNLbm90R2VvbWV0cnkgPSBjbGFzcyBUb3J1c0tub3RHZW9tZXRyeSBleHRlbmRzIFBhcmFtZXRyaWNHZW9tZXRyaWVzLlR1YmVHZW9tZXRyeSB7XG5cblx0Y29uc3RydWN0b3IoIHJhZGl1cyA9IDIwMCwgdHViZSA9IDQwLCBzZWdtZW50c1QgPSA2NCwgc2VnbWVudHNSID0gOCwgcCA9IDIsIHEgPSAzICkge1xuXG5cdFx0Y2xhc3MgVG9ydXNLbm90Q3VydmUgZXh0ZW5kcyBDdXJ2ZSB7XG5cblx0XHRcdGdldFBvaW50KCB0LCBvcHRpb25hbFRhcmdldCA9IG5ldyBWZWN0b3IzKCkgKSB7XG5cblx0XHRcdFx0Y29uc3QgcG9pbnQgPSBvcHRpb25hbFRhcmdldDtcblxuXHRcdFx0XHR0ICo9IE1hdGguUEkgKiAyO1xuXG5cdFx0XHRcdGNvbnN0IHIgPSAwLjU7XG5cblx0XHRcdFx0Y29uc3QgeCA9ICggMSArIHIgKiBNYXRoLmNvcyggcSAqIHQgKSApICogTWF0aC5jb3MoIHAgKiB0ICk7XG5cdFx0XHRcdGNvbnN0IHkgPSAoIDEgKyByICogTWF0aC5jb3MoIHEgKiB0ICkgKSAqIE1hdGguc2luKCBwICogdCApO1xuXHRcdFx0XHRjb25zdCB6ID0gciAqIE1hdGguc2luKCBxICogdCApO1xuXG5cdFx0XHRcdHJldHVybiBwb2ludC5zZXQoIHgsIHksIHogKS5tdWx0aXBseVNjYWxhciggcmFkaXVzICk7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdGNvbnN0IHNlZ21lbnRzID0gc2VnbWVudHNUO1xuXHRcdGNvbnN0IHJhZGl1c1NlZ21lbnRzID0gc2VnbWVudHNSO1xuXHRcdGNvbnN0IGV4dHJ1ZGVQYXRoID0gbmV3IFRvcnVzS25vdEN1cnZlKCk7XG5cblx0XHRzdXBlciggZXh0cnVkZVBhdGgsIHNlZ21lbnRzLCB0dWJlLCByYWRpdXNTZWdtZW50cywgdHJ1ZSwgZmFsc2UgKTtcblxuXHRcdHRoaXMucmFkaXVzID0gcmFkaXVzO1xuXHRcdHRoaXMudHViZSA9IHR1YmU7XG5cdFx0dGhpcy5zZWdtZW50c1QgPSBzZWdtZW50c1Q7XG5cdFx0dGhpcy5zZWdtZW50c1IgPSBzZWdtZW50c1I7XG5cdFx0dGhpcy5wID0gcDtcblx0XHR0aGlzLnEgPSBxO1xuXG5cdH1cblxufTtcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAqXG4gICogUGFyYW1ldHJpYyBSZXBsYWNlbWVudCBmb3IgU3BoZXJlR2VvbWV0cnlcbiAgKlxuICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5QYXJhbWV0cmljR2VvbWV0cmllcy5TcGhlcmVHZW9tZXRyeSA9IGNsYXNzIFNwaGVyZUdlb21ldHJ5IGV4dGVuZHMgUGFyYW1ldHJpY0dlb21ldHJ5IHtcblxuXHRjb25zdHJ1Y3Rvciggc2l6ZSwgdSwgdiApIHtcblxuXHRcdGZ1bmN0aW9uIHNwaGVyZSggdSwgdiwgdGFyZ2V0ICkge1xuXG5cdFx0XHR1ICo9IE1hdGguUEk7XG5cdFx0XHR2ICo9IDIgKiBNYXRoLlBJO1xuXG5cdFx0XHRjb25zdCB4ID0gc2l6ZSAqIE1hdGguc2luKCB1ICkgKiBNYXRoLmNvcyggdiApO1xuXHRcdFx0Y29uc3QgeSA9IHNpemUgKiBNYXRoLnNpbiggdSApICogTWF0aC5zaW4oIHYgKTtcblx0XHRcdGNvbnN0IHogPSBzaXplICogTWF0aC5jb3MoIHUgKTtcblxuXHRcdFx0dGFyZ2V0LnNldCggeCwgeSwgeiApO1xuXG5cdFx0fVxuXG5cdFx0c3VwZXIoIHNwaGVyZSwgdSwgdiApO1xuXG5cdH1cblxufTtcblxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICpcbiAgKiBQYXJhbWV0cmljIFJlcGxhY2VtZW50IGZvciBQbGFuZUdlb21ldHJ5XG4gICpcbiAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5QYXJhbWV0cmljR2VvbWV0cmllcy5QbGFuZUdlb21ldHJ5ID0gY2xhc3MgUGxhbmVHZW9tZXRyeSBleHRlbmRzIFBhcmFtZXRyaWNHZW9tZXRyeSB7XG5cblx0Y29uc3RydWN0b3IoIHdpZHRoLCBkZXB0aCwgc2VnbWVudHNXaWR0aCwgc2VnbWVudHNEZXB0aCApIHtcblxuXHRcdGZ1bmN0aW9uIHBsYW5lKCB1LCB2LCB0YXJnZXQgKSB7XG5cblx0XHRcdGNvbnN0IHggPSB1ICogd2lkdGg7XG5cdFx0XHRjb25zdCB5ID0gMDtcblx0XHRcdGNvbnN0IHogPSB2ICogZGVwdGg7XG5cblx0XHRcdHRhcmdldC5zZXQoIHgsIHksIHogKTtcblxuXHRcdH1cblxuXHRcdHN1cGVyKCBwbGFuZSwgc2VnbWVudHNXaWR0aCwgc2VnbWVudHNEZXB0aCApO1xuXG5cdH1cblxufTtcblxuZXhwb3J0IHsgUGFyYW1ldHJpY0dlb21ldHJpZXMgfTtcbiIsIi8qKlxuICogUGFyYW1ldHJpYyBTdXJmYWNlcyBHZW9tZXRyeVxuICogYmFzZWQgb24gdGhlIGJyaWxsaWFudCBhcnRpY2xlIGJ5IEBwcmlkZW91dCBodHRwczovL3ByaWRlb3V0Lm5ldC9ibG9nL29sZC9ibG9nL2luZGV4Lmh0bWxAcD00NC5odG1sXG4gKi9cblxuaW1wb3J0IHtcblx0QnVmZmVyR2VvbWV0cnksXG5cdEZsb2F0MzJCdWZmZXJBdHRyaWJ1dGUsXG5cdFZlY3RvcjNcbn0gZnJvbSAndGhyZWUnO1xuXG5jbGFzcyBQYXJhbWV0cmljR2VvbWV0cnkgZXh0ZW5kcyBCdWZmZXJHZW9tZXRyeSB7XG5cblx0Y29uc3RydWN0b3IoIGZ1bmMgPSAoIHUsIHYsIHRhcmdldCApID0+IHRhcmdldC5zZXQoIHUsIHYsIE1hdGguY29zKCB1ICkgKiBNYXRoLnNpbiggdiApICksIHNsaWNlcyA9IDgsIHN0YWNrcyA9IDggKSB7XG5cblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy50eXBlID0gJ1BhcmFtZXRyaWNHZW9tZXRyeSc7XG5cblx0XHR0aGlzLnBhcmFtZXRlcnMgPSB7XG5cdFx0XHRmdW5jOiBmdW5jLFxuXHRcdFx0c2xpY2VzOiBzbGljZXMsXG5cdFx0XHRzdGFja3M6IHN0YWNrc1xuXHRcdH07XG5cblx0XHQvLyBidWZmZXJzXG5cblx0XHRjb25zdCBpbmRpY2VzID0gW107XG5cdFx0Y29uc3QgdmVydGljZXMgPSBbXTtcblx0XHRjb25zdCBub3JtYWxzID0gW107XG5cdFx0Y29uc3QgdXZzID0gW107XG5cblx0XHRjb25zdCBFUFMgPSAwLjAwMDAxO1xuXG5cdFx0Y29uc3Qgbm9ybWFsID0gbmV3IFZlY3RvcjMoKTtcblxuXHRcdGNvbnN0IHAwID0gbmV3IFZlY3RvcjMoKSwgcDEgPSBuZXcgVmVjdG9yMygpO1xuXHRcdGNvbnN0IHB1ID0gbmV3IFZlY3RvcjMoKSwgcHYgPSBuZXcgVmVjdG9yMygpO1xuXG5cdFx0aWYgKCBmdW5jLmxlbmd0aCA8IDMgKSB7XG5cblx0XHRcdGNvbnNvbGUuZXJyb3IoICdUSFJFRS5QYXJhbWV0cmljR2VvbWV0cnk6IEZ1bmN0aW9uIG11c3Qgbm93IG1vZGlmeSBhIFZlY3RvcjMgYXMgdGhpcmQgcGFyYW1ldGVyLicgKTtcblxuXHRcdH1cblxuXHRcdC8vIGdlbmVyYXRlIHZlcnRpY2VzLCBub3JtYWxzIGFuZCB1dnNcblxuXHRcdGNvbnN0IHNsaWNlQ291bnQgPSBzbGljZXMgKyAxO1xuXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDw9IHN0YWNrczsgaSArKyApIHtcblxuXHRcdFx0Y29uc3QgdiA9IGkgLyBzdGFja3M7XG5cblx0XHRcdGZvciAoIGxldCBqID0gMDsgaiA8PSBzbGljZXM7IGogKysgKSB7XG5cblx0XHRcdFx0Y29uc3QgdSA9IGogLyBzbGljZXM7XG5cblx0XHRcdFx0Ly8gdmVydGV4XG5cblx0XHRcdFx0ZnVuYyggdSwgdiwgcDAgKTtcblx0XHRcdFx0dmVydGljZXMucHVzaCggcDAueCwgcDAueSwgcDAueiApO1xuXG5cdFx0XHRcdC8vIG5vcm1hbFxuXG5cdFx0XHRcdC8vIGFwcHJveGltYXRlIHRhbmdlbnQgdmVjdG9ycyB2aWEgZmluaXRlIGRpZmZlcmVuY2VzXG5cblx0XHRcdFx0aWYgKCB1IC0gRVBTID49IDAgKSB7XG5cblx0XHRcdFx0XHRmdW5jKCB1IC0gRVBTLCB2LCBwMSApO1xuXHRcdFx0XHRcdHB1LnN1YlZlY3RvcnMoIHAwLCBwMSApO1xuXG5cdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRmdW5jKCB1ICsgRVBTLCB2LCBwMSApO1xuXHRcdFx0XHRcdHB1LnN1YlZlY3RvcnMoIHAxLCBwMCApO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIHYgLSBFUFMgPj0gMCApIHtcblxuXHRcdFx0XHRcdGZ1bmMoIHUsIHYgLSBFUFMsIHAxICk7XG5cdFx0XHRcdFx0cHYuc3ViVmVjdG9ycyggcDAsIHAxICk7XG5cblx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdGZ1bmMoIHUsIHYgKyBFUFMsIHAxICk7XG5cdFx0XHRcdFx0cHYuc3ViVmVjdG9ycyggcDEsIHAwICk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIGNyb3NzIHByb2R1Y3Qgb2YgdGFuZ2VudCB2ZWN0b3JzIHJldHVybnMgc3VyZmFjZSBub3JtYWxcblxuXHRcdFx0XHRub3JtYWwuY3Jvc3NWZWN0b3JzKCBwdSwgcHYgKS5ub3JtYWxpemUoKTtcblx0XHRcdFx0bm9ybWFscy5wdXNoKCBub3JtYWwueCwgbm9ybWFsLnksIG5vcm1hbC56ICk7XG5cblx0XHRcdFx0Ly8gdXZcblxuXHRcdFx0XHR1dnMucHVzaCggdSwgdiApO1xuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHQvLyBnZW5lcmF0ZSBpbmRpY2VzXG5cblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBzdGFja3M7IGkgKysgKSB7XG5cblx0XHRcdGZvciAoIGxldCBqID0gMDsgaiA8IHNsaWNlczsgaiArKyApIHtcblxuXHRcdFx0XHRjb25zdCBhID0gaSAqIHNsaWNlQ291bnQgKyBqO1xuXHRcdFx0XHRjb25zdCBiID0gaSAqIHNsaWNlQ291bnQgKyBqICsgMTtcblx0XHRcdFx0Y29uc3QgYyA9ICggaSArIDEgKSAqIHNsaWNlQ291bnQgKyBqICsgMTtcblx0XHRcdFx0Y29uc3QgZCA9ICggaSArIDEgKSAqIHNsaWNlQ291bnQgKyBqO1xuXG5cdFx0XHRcdC8vIGZhY2VzIG9uZSBhbmQgdHdvXG5cblx0XHRcdFx0aW5kaWNlcy5wdXNoKCBhLCBiLCBkICk7XG5cdFx0XHRcdGluZGljZXMucHVzaCggYiwgYywgZCApO1xuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHQvLyBidWlsZCBnZW9tZXRyeVxuXG5cdFx0dGhpcy5zZXRJbmRleCggaW5kaWNlcyApO1xuXHRcdHRoaXMuc2V0QXR0cmlidXRlKCAncG9zaXRpb24nLCBuZXcgRmxvYXQzMkJ1ZmZlckF0dHJpYnV0ZSggdmVydGljZXMsIDMgKSApO1xuXHRcdHRoaXMuc2V0QXR0cmlidXRlKCAnbm9ybWFsJywgbmV3IEZsb2F0MzJCdWZmZXJBdHRyaWJ1dGUoIG5vcm1hbHMsIDMgKSApO1xuXHRcdHRoaXMuc2V0QXR0cmlidXRlKCAndXYnLCBuZXcgRmxvYXQzMkJ1ZmZlckF0dHJpYnV0ZSggdXZzLCAyICkgKTtcblxuXHR9XG5cbn1cblxuZXhwb3J0IHsgUGFyYW1ldHJpY0dlb21ldHJ5IH07XG4iLCJpbXBvcnQge1xuXHRCdWZmZXJHZW9tZXRyeSxcblx0RmxvYXQzMkJ1ZmZlckF0dHJpYnV0ZSxcblx0TGluZVNlZ21lbnRzLFxuXHRMaW5lQmFzaWNNYXRlcmlhbCxcblx0TWF0cml4Myxcblx0VmVjdG9yM1xufSBmcm9tICd0aHJlZSc7XG5cbmNvbnN0IF92MSA9IG5ldyBWZWN0b3IzKCk7XG5jb25zdCBfdjIgPSBuZXcgVmVjdG9yMygpO1xuY29uc3QgX25vcm1hbE1hdHJpeCA9IG5ldyBNYXRyaXgzKCk7XG5cbmNsYXNzIFZlcnRleE5vcm1hbHNIZWxwZXIgZXh0ZW5kcyBMaW5lU2VnbWVudHMge1xuXG5cdGNvbnN0cnVjdG9yKCBvYmplY3QsIHNpemUgPSAxLCBjb2xvciA9IDB4ZmYwMDAwICkge1xuXG5cdFx0Y29uc3QgZ2VvbWV0cnkgPSBuZXcgQnVmZmVyR2VvbWV0cnkoKTtcblxuXHRcdGNvbnN0IG5Ob3JtYWxzID0gb2JqZWN0Lmdlb21ldHJ5LmF0dHJpYnV0ZXMubm9ybWFsLmNvdW50O1xuXHRcdGNvbnN0IHBvc2l0aW9ucyA9IG5ldyBGbG9hdDMyQnVmZmVyQXR0cmlidXRlKCBuTm9ybWFscyAqIDIgKiAzLCAzICk7XG5cblx0XHRnZW9tZXRyeS5zZXRBdHRyaWJ1dGUoICdwb3NpdGlvbicsIHBvc2l0aW9ucyApO1xuXG5cdFx0c3VwZXIoIGdlb21ldHJ5LCBuZXcgTGluZUJhc2ljTWF0ZXJpYWwoIHsgY29sb3IsIHRvbmVNYXBwZWQ6IGZhbHNlIH0gKSApO1xuXG5cdFx0dGhpcy5vYmplY3QgPSBvYmplY3Q7XG5cdFx0dGhpcy5zaXplID0gc2l6ZTtcblx0XHR0aGlzLnR5cGUgPSAnVmVydGV4Tm9ybWFsc0hlbHBlcic7XG5cblx0XHQvL1xuXG5cdFx0dGhpcy5tYXRyaXhBdXRvVXBkYXRlID0gZmFsc2U7XG5cblx0XHR0aGlzLnVwZGF0ZSgpO1xuXG5cdH1cblxuXHR1cGRhdGUoKSB7XG5cblx0XHR0aGlzLm9iamVjdC51cGRhdGVNYXRyaXhXb3JsZCggdHJ1ZSApO1xuXG5cdFx0X25vcm1hbE1hdHJpeC5nZXROb3JtYWxNYXRyaXgoIHRoaXMub2JqZWN0Lm1hdHJpeFdvcmxkICk7XG5cblx0XHRjb25zdCBtYXRyaXhXb3JsZCA9IHRoaXMub2JqZWN0Lm1hdHJpeFdvcmxkO1xuXG5cdFx0Y29uc3QgcG9zaXRpb24gPSB0aGlzLmdlb21ldHJ5LmF0dHJpYnV0ZXMucG9zaXRpb247XG5cblx0XHQvL1xuXG5cdFx0Y29uc3Qgb2JqR2VvbWV0cnkgPSB0aGlzLm9iamVjdC5nZW9tZXRyeTtcblxuXHRcdGlmICggb2JqR2VvbWV0cnkgKSB7XG5cblx0XHRcdGNvbnN0IG9ialBvcyA9IG9iakdlb21ldHJ5LmF0dHJpYnV0ZXMucG9zaXRpb247XG5cblx0XHRcdGNvbnN0IG9iak5vcm0gPSBvYmpHZW9tZXRyeS5hdHRyaWJ1dGVzLm5vcm1hbDtcblxuXHRcdFx0bGV0IGlkeCA9IDA7XG5cblx0XHRcdC8vIGZvciBzaW1wbGljaXR5LCBpZ25vcmUgaW5kZXggYW5kIGRyYXdjYWxscywgYW5kIHJlbmRlciBldmVyeSBub3JtYWxcblxuXHRcdFx0Zm9yICggbGV0IGogPSAwLCBqbCA9IG9ialBvcy5jb3VudDsgaiA8IGpsOyBqICsrICkge1xuXG5cdFx0XHRcdF92MS5mcm9tQnVmZmVyQXR0cmlidXRlKCBvYmpQb3MsIGogKS5hcHBseU1hdHJpeDQoIG1hdHJpeFdvcmxkICk7XG5cblx0XHRcdFx0X3YyLmZyb21CdWZmZXJBdHRyaWJ1dGUoIG9iak5vcm0sIGogKTtcblxuXHRcdFx0XHRfdjIuYXBwbHlNYXRyaXgzKCBfbm9ybWFsTWF0cml4ICkubm9ybWFsaXplKCkubXVsdGlwbHlTY2FsYXIoIHRoaXMuc2l6ZSApLmFkZCggX3YxICk7XG5cblx0XHRcdFx0cG9zaXRpb24uc2V0WFlaKCBpZHgsIF92MS54LCBfdjEueSwgX3YxLnogKTtcblxuXHRcdFx0XHRpZHggPSBpZHggKyAxO1xuXG5cdFx0XHRcdHBvc2l0aW9uLnNldFhZWiggaWR4LCBfdjIueCwgX3YyLnksIF92Mi56ICk7XG5cblx0XHRcdFx0aWR4ID0gaWR4ICsgMTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0cG9zaXRpb24ubmVlZHNVcGRhdGUgPSB0cnVlO1xuXG5cdH1cblxufVxuXG5cbmV4cG9ydCB7IFZlcnRleE5vcm1hbHNIZWxwZXIgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwicGFyYW1ldHJpYy1nZW9tZXRyeVwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtsdGpzX2ZvdXJ0aFwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtsdGpzX2ZvdXJ0aFwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfYnVpbGRfdGhyZWVfbW9kdWxlX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fY29udHJvbHNfT3JiaXRDb250cm9sc19qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfbGlsLWd1aV9kaXN0X2xpbC1ndWlfZXNtX2pzXCIsXCJzYW1wbGVzX2Jvb3RzdHJhcF9ib290c3RyYXBfanMtc2FtcGxlc19jb250cm9sc19tYXRlcmlhbC1jb250cm9sc19qcy1zYW1wbGVzX2NvbnRyb2xzX3JlbmRlcmUtYzg3ZDhhXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTYvcGFyYW1ldHJpYy1nZW9tZXRyeS5qc1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
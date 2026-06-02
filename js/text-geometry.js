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

/***/ "./samples/chapters/chapter-6/text-geometry.js"
/*!*****************************************************!*\
  !*** ./samples/chapters/chapter-6/text-geometry.js ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_standard_scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/standard-scene */ "./samples/chapters/chapter-6/util/standard-scene.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./samples/chapters/chapter-6/util/index.js");
/* harmony import */ var three_examples_jsm_geometries_TextGeometry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/geometries/TextGeometry */ "./node_modules/three/examples/jsm/geometries/TextGeometry.js");
/* harmony import */ var three_examples_jsm_loaders_FontLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/jsm/loaders/FontLoader */ "./node_modules/three/examples/jsm/loaders/FontLoader.js");





const props = {
  size: 10,
  height: 10,
  curveSegments: 12,
  bevelEnabled: false,
  bevelThickness: 0,
  bevelSize: 0,
  bevelOffset: 0,
  bevelSegments: 10
}

const updateGeometry = ({
  font,
  size,
  height,
  curveSegments,
  bevelEnabled,
  bevelThickness,
  bevelSize,
  bevelOffset,
  bevelSegments,
  amount
}) => {
  return new three_examples_jsm_geometries_TextGeometry__WEBPACK_IMPORTED_MODULE_2__.TextGeometry('Some Text', {
    font,
    size,
    height,
    curveSegments,
    bevelEnabled,
    bevelThickness,
    bevelSize,
    bevelOffset,
    bevelSegments,
    amount
  })
    .scale(0.2, 0.2, 0.2)
    .translate(-3, 0, 0)
}

new three_examples_jsm_loaders_FontLoader__WEBPACK_IMPORTED_MODULE_3__.FontLoader()
  .loadAsync('/assets/fonts/helvetiker_regular.typeface.json')
  .then((font) => {
    // we can also create 2D shapes instead using  font.generateShapes
    ;(0,_util_standard_scene__WEBPACK_IMPORTED_MODULE_0__.bootstrapGeometryScene)({
      geometry: updateGeometry({ font, ...props }),
      provideGui: (gui, mesh) => {
        const folder = gui.addFolder('THREE.TextGeometry')
        folder.add(props, 'size', 1, 30, 1).onChange(() => (0,_util__WEBPACK_IMPORTED_MODULE_1__.updateMesh)(mesh, updateGeometry({ font, ...props })))
        folder.add(props, 'height', 1, 30, 1).onChange(() => (0,_util__WEBPACK_IMPORTED_MODULE_1__.updateMesh)(mesh, updateGeometry({ font, ...props })))
        folder
          .add(props, 'curveSegments', 1, 30, 1)
          .onChange(() => (0,_util__WEBPACK_IMPORTED_MODULE_1__.updateMesh)(mesh, updateGeometry({ font, ...props })))
        folder.add(props, 'bevelEnabled').onChange(() => (0,_util__WEBPACK_IMPORTED_MODULE_1__.updateMesh)(mesh, updateGeometry({ font, ...props })))
        folder
          .add(props, 'bevelThickness', 0, 1, 0.01)
          .onChange(() => (0,_util__WEBPACK_IMPORTED_MODULE_1__.updateMesh)(mesh, updateGeometry({ font, ...props })))
        folder.add(props, 'bevelSize', 0, 3, 0.01).onChange(() => (0,_util__WEBPACK_IMPORTED_MODULE_1__.updateMesh)(mesh, updateGeometry({ font, ...props })))
        folder
          .add(props, 'bevelOffset', 0, 3, 0.01)
          .onChange(() => (0,_util__WEBPACK_IMPORTED_MODULE_1__.updateMesh)(mesh, updateGeometry({ font, ...props })))
        folder
          .add(props, 'bevelSegments', 1, 30, 1)
          .onChange(() => (0,_util__WEBPACK_IMPORTED_MODULE_1__.updateMesh)(mesh, updateGeometry({ font, ...props })))
      }
    })
  })
  .then()


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

/***/ "./node_modules/three/examples/jsm/geometries/TextGeometry.js"
/*!********************************************************************!*\
  !*** ./node_modules/three/examples/jsm/geometries/TextGeometry.js ***!
  \********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TextGeometry: () => (/* binding */ TextGeometry)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/**
 * Text = 3D Text
 *
 * parameters = {
 *  font: <THREE.Font>, // font
 *
 *  size: <float>, // size of the text
 *  height: <float>, // thickness to extrude text
 *  curveSegments: <int>, // number of points on the curves
 *
 *  bevelEnabled: <bool>, // turn on bevel
 *  bevelThickness: <float>, // how deep into text bevel goes
 *  bevelSize: <float>, // how far from text outline (including bevelOffset) is bevel
 *  bevelOffset: <float> // how far from text outline does bevel start
 * }
 */



class TextGeometry extends three__WEBPACK_IMPORTED_MODULE_0__.ExtrudeGeometry {

	constructor( text, parameters = {} ) {

		const font = parameters.font;

		if ( font === undefined ) {

			super(); // generate default extrude geometry

		} else {

			const shapes = font.generateShapes( text, parameters.size );

			// translate parameters to ExtrudeGeometry API

			parameters.depth = parameters.height !== undefined ? parameters.height : 50;

			// defaults

			if ( parameters.bevelThickness === undefined ) parameters.bevelThickness = 10;
			if ( parameters.bevelSize === undefined ) parameters.bevelSize = 8;
			if ( parameters.bevelEnabled === undefined ) parameters.bevelEnabled = false;

			super( shapes, parameters );

		}

		this.type = 'TextGeometry';

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





/***/ },

/***/ "./node_modules/three/examples/jsm/loaders/FontLoader.js"
/*!***************************************************************!*\
  !*** ./node_modules/three/examples/jsm/loaders/FontLoader.js ***!
  \***************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Font: () => (/* binding */ Font),
/* harmony export */   FontLoader: () => (/* binding */ FontLoader)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");


class FontLoader extends three__WEBPACK_IMPORTED_MODULE_0__.Loader {

	constructor( manager ) {

		super( manager );

	}

	load( url, onLoad, onProgress, onError ) {

		const scope = this;

		const loader = new three__WEBPACK_IMPORTED_MODULE_0__.FileLoader( this.manager );
		loader.setPath( this.path );
		loader.setRequestHeader( this.requestHeader );
		loader.setWithCredentials( scope.withCredentials );
		loader.load( url, function ( text ) {

			let json;

			try {

				json = JSON.parse( text );

			} catch ( e ) {

				console.warn( 'THREE.FontLoader: typeface.js support is being deprecated. Use typeface.json instead.' );
				json = JSON.parse( text.substring( 65, text.length - 2 ) );

			}

			const font = scope.parse( json );

			if ( onLoad ) onLoad( font );

		}, onProgress, onError );

	}

	parse( json ) {

		return new Font( json );

	}

}

//

class Font {

	constructor( data ) {

		this.isFont = true;

		this.type = 'Font';

		this.data = data;

	}

	generateShapes( text, size = 100 ) {

		const shapes = [];
		const paths = createPaths( text, size, this.data );

		for ( let p = 0, pl = paths.length; p < pl; p ++ ) {

			shapes.push( ...paths[ p ].toShapes() );

		}

		return shapes;

	}

}

function createPaths( text, size, data ) {

	const chars = Array.from( text );
	const scale = size / data.resolution;
	const line_height = ( data.boundingBox.yMax - data.boundingBox.yMin + data.underlineThickness ) * scale;

	const paths = [];

	let offsetX = 0, offsetY = 0;

	for ( let i = 0; i < chars.length; i ++ ) {

		const char = chars[ i ];

		if ( char === '\n' ) {

			offsetX = 0;
			offsetY -= line_height;

		} else {

			const ret = createPath( char, scale, offsetX, offsetY, data );
			offsetX += ret.offsetX;
			paths.push( ret.path );

		}

	}

	return paths;

}

function createPath( char, scale, offsetX, offsetY, data ) {

	const glyph = data.glyphs[ char ] || data.glyphs[ '?' ];

	if ( ! glyph ) {

		console.error( 'THREE.Font: character "' + char + '" does not exists in font family ' + data.familyName + '.' );

		return;

	}

	const path = new three__WEBPACK_IMPORTED_MODULE_0__.ShapePath();

	let x, y, cpx, cpy, cpx1, cpy1, cpx2, cpy2;

	if ( glyph.o ) {

		const outline = glyph._cachedOutline || ( glyph._cachedOutline = glyph.o.split( ' ' ) );

		for ( let i = 0, l = outline.length; i < l; ) {

			const action = outline[ i ++ ];

			switch ( action ) {

				case 'm': // moveTo

					x = outline[ i ++ ] * scale + offsetX;
					y = outline[ i ++ ] * scale + offsetY;

					path.moveTo( x, y );

					break;

				case 'l': // lineTo

					x = outline[ i ++ ] * scale + offsetX;
					y = outline[ i ++ ] * scale + offsetY;

					path.lineTo( x, y );

					break;

				case 'q': // quadraticCurveTo

					cpx = outline[ i ++ ] * scale + offsetX;
					cpy = outline[ i ++ ] * scale + offsetY;
					cpx1 = outline[ i ++ ] * scale + offsetX;
					cpy1 = outline[ i ++ ] * scale + offsetY;

					path.quadraticCurveTo( cpx1, cpy1, cpx, cpy );

					break;

				case 'b': // bezierCurveTo

					cpx = outline[ i ++ ] * scale + offsetX;
					cpy = outline[ i ++ ] * scale + offsetY;
					cpx1 = outline[ i ++ ] * scale + offsetX;
					cpy1 = outline[ i ++ ] * scale + offsetY;
					cpx2 = outline[ i ++ ] * scale + offsetX;
					cpy2 = outline[ i ++ ] * scale + offsetY;

					path.bezierCurveTo( cpx1, cpy1, cpx2, cpy2, cpx, cpy );

					break;

			}

		}

	}

	return { offsetX: glyph.ha * scale, path: path };

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
/******/ 			"text-geometry": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","samples_bootstrap_bootstrap_js-samples_controls_material-controls_js-samples_controls_rendere-c87d8a"], () => (__webpack_require__("./samples/chapters/chapter-6/text-geometry.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOztVQUVBO1VBQ0E7Ozs7O1dDL0JBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsK0JBQStCLHdDQUF3QztXQUN2RTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlCQUFpQixxQkFBcUI7V0FDdEM7V0FDQTtXQUNBLGtCQUFrQixxQkFBcUI7V0FDdkM7V0FDQTtXQUNBLEtBQUs7V0FDTDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRTs7Ozs7V0MzQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQSw0Rzs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9ib290c3RyYXAvZmxvb3IuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItNi90ZXh0LWdlb21ldHJ5LmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTYvdXRpbC9pbmRleC5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci02L3V0aWwvc3RhbmRhcmQtc2NlbmUuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NvbnRyb2xzL21lc2gtdmlzaWJsZS1jb250cm9scy5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL3NhbXBsZXMvY29udHJvbHMvc2NlbmUtY29udHJvbHMuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9ub2RlX21vZHVsZXMvdGhyZWUvZXhhbXBsZXMvanNtL2dlb21ldHJpZXMvVGV4dEdlb21ldHJ5LmpzIiwid2VicGFjazovL2x0anMtZm91cnRoLy4vbm9kZV9tb2R1bGVzL3RocmVlL2V4YW1wbGVzL2pzbS9oZWxwZXJzL1ZlcnRleE5vcm1hbHNIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9ub2RlX21vZHVsZXMvdGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvRm9udExvYWRlci5qcyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuXG5leHBvcnQgY29uc3QgZm9yZXZlclBsYW5lID0gKHNjZW5lKSA9PiB7XG4gIGNvbnN0IGdlbyA9IG5ldyBUSFJFRS5QbGFuZUJ1ZmZlckdlb21ldHJ5KDEwMDAwLCAxMDAwMClcbiAgY29uc3QgbWF0ID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoe1xuICAgIGNvbG9yOiAweGZmZmZmZlxuICB9KVxuICBjb25zdCBtZXNoID0gbmV3IFRIUkVFLk1lc2goZ2VvLCBtYXQpXG4gIG1lc2gucG9zaXRpb24uc2V0KDAsIC0yLCAwKVxuICBtZXNoLnJvdGF0aW9uLnNldChNYXRoLlBJIC8gLTIsIDAsIDApXG4gIG1lc2gucmVjZWl2ZVNoYWRvdyA9IHRydWVcbiAgbWVzaC5uYW1lID0gJ2ZvcmV2ZXItZmxvb3InXG4gIHNjZW5lLmFkZChtZXNoKVxuXG4gIHJldHVybiBtZXNoXG59XG5cbmV4cG9ydCBjb25zdCBmbG9hdGluZ0Zsb29yID0gKHNjZW5lLCBzaXplKSA9PiB7XG4gIGNvbnN0IHMgPSBzaXplID8gc2l6ZSA6IDZcbiAgY29uc3QgZ2VvID0gbmV3IFRIUkVFLkJveEJ1ZmZlckdlb21ldHJ5KHMsIDAuMjUsIHMsIDEwLCAxMCwgMTApXG4gIGNvbnN0IG1hdCA9IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7XG4gICAgY29sb3I6IDB4ZGRkZGRkXG4gIH0pXG4gIGNvbnN0IG1lc2ggPSBuZXcgVEhSRUUuTWVzaChnZW8sIG1hdClcbiAgbWVzaC5wb3NpdGlvbi5zZXQoMCwgLTIsIC0xKVxuICBtZXNoLnJlY2VpdmVTaGFkb3cgPSB0cnVlXG4gIG1lc2gubmFtZSA9ICdmbG9hdGluZy1mbG9vcidcbiAgc2NlbmUuYWRkKG1lc2gpXG5cbiAgcmV0dXJuIG1lc2hcbn1cbiIsImltcG9ydCB7IGJvb3RzdHJhcEdlb21ldHJ5U2NlbmUgfSBmcm9tICcuL3V0aWwvc3RhbmRhcmQtc2NlbmUnXG5pbXBvcnQgeyB1cGRhdGVNZXNoIH0gZnJvbSAnLi91dGlsJ1xuaW1wb3J0IHsgVGV4dEdlb21ldHJ5IH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2dlb21ldHJpZXMvVGV4dEdlb21ldHJ5J1xuaW1wb3J0IHsgRm9udExvYWRlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL0ZvbnRMb2FkZXInXG5cbmNvbnN0IHByb3BzID0ge1xuICBzaXplOiAxMCxcbiAgaGVpZ2h0OiAxMCxcbiAgY3VydmVTZWdtZW50czogMTIsXG4gIGJldmVsRW5hYmxlZDogZmFsc2UsXG4gIGJldmVsVGhpY2tuZXNzOiAwLFxuICBiZXZlbFNpemU6IDAsXG4gIGJldmVsT2Zmc2V0OiAwLFxuICBiZXZlbFNlZ21lbnRzOiAxMFxufVxuXG5jb25zdCB1cGRhdGVHZW9tZXRyeSA9ICh7XG4gIGZvbnQsXG4gIHNpemUsXG4gIGhlaWdodCxcbiAgY3VydmVTZWdtZW50cyxcbiAgYmV2ZWxFbmFibGVkLFxuICBiZXZlbFRoaWNrbmVzcyxcbiAgYmV2ZWxTaXplLFxuICBiZXZlbE9mZnNldCxcbiAgYmV2ZWxTZWdtZW50cyxcbiAgYW1vdW50XG59KSA9PiB7XG4gIHJldHVybiBuZXcgVGV4dEdlb21ldHJ5KCdTb21lIFRleHQnLCB7XG4gICAgZm9udCxcbiAgICBzaXplLFxuICAgIGhlaWdodCxcbiAgICBjdXJ2ZVNlZ21lbnRzLFxuICAgIGJldmVsRW5hYmxlZCxcbiAgICBiZXZlbFRoaWNrbmVzcyxcbiAgICBiZXZlbFNpemUsXG4gICAgYmV2ZWxPZmZzZXQsXG4gICAgYmV2ZWxTZWdtZW50cyxcbiAgICBhbW91bnRcbiAgfSlcbiAgICAuc2NhbGUoMC4yLCAwLjIsIDAuMilcbiAgICAudHJhbnNsYXRlKC0zLCAwLCAwKVxufVxuXG5uZXcgRm9udExvYWRlcigpXG4gIC5sb2FkQXN5bmMoJy9hc3NldHMvZm9udHMvaGVsdmV0aWtlcl9yZWd1bGFyLnR5cGVmYWNlLmpzb24nKVxuICAudGhlbigoZm9udCkgPT4ge1xuICAgIC8vIHdlIGNhbiBhbHNvIGNyZWF0ZSAyRCBzaGFwZXMgaW5zdGVhZCB1c2luZyAgZm9udC5nZW5lcmF0ZVNoYXBlc1xuICAgIGJvb3RzdHJhcEdlb21ldHJ5U2NlbmUoe1xuICAgICAgZ2VvbWV0cnk6IHVwZGF0ZUdlb21ldHJ5KHsgZm9udCwgLi4ucHJvcHMgfSksXG4gICAgICBwcm92aWRlR3VpOiAoZ3VpLCBtZXNoKSA9PiB7XG4gICAgICAgIGNvbnN0IGZvbGRlciA9IGd1aS5hZGRGb2xkZXIoJ1RIUkVFLlRleHRHZW9tZXRyeScpXG4gICAgICAgIGZvbGRlci5hZGQocHJvcHMsICdzaXplJywgMSwgMzAsIDEpLm9uQ2hhbmdlKCgpID0+IHVwZGF0ZU1lc2gobWVzaCwgdXBkYXRlR2VvbWV0cnkoeyBmb250LCAuLi5wcm9wcyB9KSkpXG4gICAgICAgIGZvbGRlci5hZGQocHJvcHMsICdoZWlnaHQnLCAxLCAzMCwgMSkub25DaGFuZ2UoKCkgPT4gdXBkYXRlTWVzaChtZXNoLCB1cGRhdGVHZW9tZXRyeSh7IGZvbnQsIC4uLnByb3BzIH0pKSlcbiAgICAgICAgZm9sZGVyXG4gICAgICAgICAgLmFkZChwcm9wcywgJ2N1cnZlU2VnbWVudHMnLCAxLCAzMCwgMSlcbiAgICAgICAgICAub25DaGFuZ2UoKCkgPT4gdXBkYXRlTWVzaChtZXNoLCB1cGRhdGVHZW9tZXRyeSh7IGZvbnQsIC4uLnByb3BzIH0pKSlcbiAgICAgICAgZm9sZGVyLmFkZChwcm9wcywgJ2JldmVsRW5hYmxlZCcpLm9uQ2hhbmdlKCgpID0+IHVwZGF0ZU1lc2gobWVzaCwgdXBkYXRlR2VvbWV0cnkoeyBmb250LCAuLi5wcm9wcyB9KSkpXG4gICAgICAgIGZvbGRlclxuICAgICAgICAgIC5hZGQocHJvcHMsICdiZXZlbFRoaWNrbmVzcycsIDAsIDEsIDAuMDEpXG4gICAgICAgICAgLm9uQ2hhbmdlKCgpID0+IHVwZGF0ZU1lc2gobWVzaCwgdXBkYXRlR2VvbWV0cnkoeyBmb250LCAuLi5wcm9wcyB9KSkpXG4gICAgICAgIGZvbGRlci5hZGQocHJvcHMsICdiZXZlbFNpemUnLCAwLCAzLCAwLjAxKS5vbkNoYW5nZSgoKSA9PiB1cGRhdGVNZXNoKG1lc2gsIHVwZGF0ZUdlb21ldHJ5KHsgZm9udCwgLi4ucHJvcHMgfSkpKVxuICAgICAgICBmb2xkZXJcbiAgICAgICAgICAuYWRkKHByb3BzLCAnYmV2ZWxPZmZzZXQnLCAwLCAzLCAwLjAxKVxuICAgICAgICAgIC5vbkNoYW5nZSgoKSA9PiB1cGRhdGVNZXNoKG1lc2gsIHVwZGF0ZUdlb21ldHJ5KHsgZm9udCwgLi4ucHJvcHMgfSkpKVxuICAgICAgICBmb2xkZXJcbiAgICAgICAgICAuYWRkKHByb3BzLCAnYmV2ZWxTZWdtZW50cycsIDEsIDMwLCAxKVxuICAgICAgICAgIC5vbkNoYW5nZSgoKSA9PiB1cGRhdGVNZXNoKG1lc2gsIHVwZGF0ZUdlb21ldHJ5KHsgZm9udCwgLi4ucHJvcHMgfSkpKVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG4gIC50aGVuKClcbiIsImV4cG9ydCBjb25zdCB1cGRhdGVNZXNoID0gKG1lc2gsIGdlb21ldHJ5KSA9PiB7XG4gIG1lc2guZ2VvbWV0cnkuZGlzcG9zZSgpXG4gIG1lc2guZ2VvbWV0cnkgPSBnZW9tZXRyeVxufVxuIiwiaW1wb3J0IHsgaW5pdFNjZW5lIH0gZnJvbSAnLi4vLi4vLi4vYm9vdHN0cmFwL2Jvb3RzdHJhcCdcbmltcG9ydCB7IGludGlhbGl6ZVJlbmRlcmVyQ29udHJvbHMgfSBmcm9tICcuLi8uLi8uLi9jb250cm9scy9yZW5kZXJlci1jb250cm9sJ1xuXG5pbXBvcnQgR1VJIGZyb20gJ2xpbC1ndWknXG5pbXBvcnQgeyBpbml0aWFsaXplR3VpTWF0ZXJpYWwsIGluaXRpYWxpemVHdWlNZXNoU3RhbmRhcmRNYXRlcmlhbCB9IGZyb20gJy4uLy4uLy4uL2NvbnRyb2xzL21hdGVyaWFsLWNvbnRyb2xzJ1xuaW1wb3J0IHsgaW5pdGlhbGl6ZVNjZW5lQ29udHJvbHMgfSBmcm9tICcuLi8uLi8uLi9jb250cm9scy9zY2VuZS1jb250cm9scydcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuaW1wb3J0IHsgZm9yZXZlclBsYW5lIH0gZnJvbSAnLi4vLi4vLi4vYm9vdHN0cmFwL2Zsb29yJ1xuaW1wb3J0IHsgaW5pdGlhbGl6ZU1lc2hWaXNpYmxlQ29udHJvbHMgfSBmcm9tICcuLi8uLi8uLi9jb250cm9scy9tZXNoLXZpc2libGUtY29udHJvbHMnXG5cbmV4cG9ydCBjb25zdCBib290c3RyYXBHZW9tZXRyeVNjZW5lID0gYXN5bmMgKHsgZ2VvbWV0cnksIHByb3ZpZGVHdWksIGhpZGVmbG9vciwgb3ZlcnJpZGVNYXRlcmlhbCwgdXNlTGluZSB9KSA9PiB7XG4gIGNvbnN0IHByb3BzID0ge1xuICAgIGJhY2tncm91bmRDb2xvcjogMHhmZmZmZmYsXG4gICAgZm9nQ29sb3I6IDB4ZmZmZmZmXG4gIH1cblxuICBjb25zdCBndWkgPSBuZXcgR1VJKClcblxuICBjb25zdCBpbml0ID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IG1hdGVyaWFsID1cbiAgICAgIG92ZXJyaWRlTWF0ZXJpYWwgPz9cbiAgICAgIG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7XG4gICAgICAgIGNvbG9yOiAweGZmYWE4OFxuICAgICAgfSlcbiAgICBjb25zdCBtZXNoID0gdXNlTGluZSA/IG5ldyBUSFJFRS5MaW5lU2VnbWVudHMoZ2VvbWV0cnksIG1hdGVyaWFsKSA6IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbClcbiAgICBtZXNoLmNhc3RTaGFkb3cgPSB0cnVlXG4gICAgaW5pdFNjZW5lKHByb3BzKSgoeyBzY2VuZSwgY2FtZXJhLCByZW5kZXJlciwgb3JiaXRDb250cm9scyB9KSA9PiB7XG4gICAgICByZW5kZXJlci5zaGFkb3dNYXAudHlwZSA9IFRIUkVFLlBDRlNvZnRTaGFkb3dNYXBcbiAgICAgIGNhbWVyYS5wb3NpdGlvbi54ID0gLTNcbiAgICAgIGNhbWVyYS5wb3NpdGlvbi56ID0gOFxuICAgICAgY2FtZXJhLnBvc2l0aW9uLnkgPSAyXG4gICAgICBvcmJpdENvbnRyb2xzLnVwZGF0ZSgpXG5cbiAgICAgIGZ1bmN0aW9uIGFuaW1hdGUoKSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKVxuICAgICAgICByZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSlcbiAgICAgICAgb3JiaXRDb250cm9scy51cGRhdGUoKVxuICAgICAgfVxuXG4gICAgICBhbmltYXRlKClcblxuICAgICAgY29uc3QgcGxhbmUgPSBoaWRlZmxvb3IgPz8gZm9yZXZlclBsYW5lKHNjZW5lKVxuICAgICAgc2NlbmUuYWRkKG1lc2gpXG4gICAgICBpbnRpYWxpemVSZW5kZXJlckNvbnRyb2xzKGd1aSwgcmVuZGVyZXIpXG4gICAgICBpbml0aWFsaXplU2NlbmVDb250cm9scyhndWksIHNjZW5lLCBmYWxzZSlcblxuICAgICAgaW5pdGlhbGl6ZUd1aU1hdGVyaWFsKGd1aSwgbWVzaCwgbWF0ZXJpYWwpLmNsb3NlKClcbiAgICAgIG92ZXJyaWRlTWF0ZXJpYWwgPz8gaW5pdGlhbGl6ZUd1aU1lc2hTdGFuZGFyZE1hdGVyaWFsKGd1aSwgbWVzaCwgbWF0ZXJpYWwpLmNsb3NlKClcbiAgICAgIGhpZGVmbG9vciA/PyBpbml0aWFsaXplTWVzaFZpc2libGVDb250cm9scyhndWksIHBsYW5lLCAnRmxvb3InKVxuICAgICAgcHJvdmlkZUd1aShndWksIG1lc2gsIHNjZW5lKVxuICAgIH0pXG4gIH1cblxuICBpbml0KCkudGhlbigpXG59XG4iLCJleHBvcnQgY29uc3QgaW5pdGlhbGl6ZU1lc2hWaXNpYmxlQ29udHJvbHMgPSAoZ3VpLCBtZXNoLCB0aXRsZSkgPT4ge1xuICBjb25zdCBmb2xkZXIgPSBndWkuYWRkRm9sZGVyKHRpdGxlKVxuICBmb2xkZXIuYWRkKG1lc2gsICd2aXNpYmxlJylcbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuXG5jb25zdCB0ZXh0dXJlTG9hZGVyID0gbmV3IFRIUkVFLlRleHR1cmVMb2FkZXIoKVxuXG5jb25zdCBwcm9wZXJ0aWVzT2JqZWN0ID0gKHNjZW5lKSA9PiAoe1xuICBvdmVycmlkZU1hdGVyaWFsOiB7XG4gICAgdG9nZ2xlOiAoKSA9PiB7XG4gICAgICBpZiAoc2NlbmUub3ZlcnJpZGVNYXRlcmlhbCAhPT0gbnVsbCkge1xuICAgICAgICBzY2VuZS5vdmVycmlkZU1hdGVyaWFsID0gbnVsbFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2NlbmUub3ZlcnJpZGVNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTm9ybWFsTWF0ZXJpYWwoKVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgYmFja0dyb3VuZDogJ1doaXRlJyxcbiAgZW52aXJvbm1lbnQ6IHtcbiAgICB0b2dnbGU6ICgpID0+IHtcbiAgICAgIGlmIChzY2VuZS5lbnZpcm9ubWVudCAhPT0gbnVsbCkge1xuICAgICAgICBzY2VuZS5lbnZpcm9ubWVudCA9IG51bGxcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRleHR1cmVMb2FkZXIubG9hZCgnL2Fzc2V0cy9lcXVpLmpwZWcnLCAobG9hZGVkKSA9PiB7XG4gICAgICAgICAgbG9hZGVkLm1hcHBpbmcgPSBUSFJFRS5FcXVpcmVjdGFuZ3VsYXJSZWZsZWN0aW9uTWFwcGluZ1xuICAgICAgICAgIHNjZW5lLmVudmlyb25tZW50ID0gbG9hZGVkXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuXG5jb25zdCBmb2dQcm9wZXJ0aWVzID0gKGZvZykgPT4gKHtcbiAgY29sb3I6IDB4ZmZmZmZmLFxuICBuZWFyOiBmb2cubmVhcixcbiAgZmFyOiBmb2cuZmFyXG59KVxuXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZVNjZW5lQ29udHJvbHMgPSAoZ3VpLCBzY2VuZSwgZm9nRW5hYmxlZCwgaXNPcGVuKSA9PiB7XG4gIGNvbnN0IHByb3BzID0gcHJvcGVydGllc09iamVjdChzY2VuZSlcbiAgY29uc3Qgc2NlbmVDb250cm9scyA9IGd1aS5hZGRGb2xkZXIoJ1NjZW5lJylcblxuICBzY2VuZUNvbnRyb2xzXG4gICAgLmFkZChwcm9wcywgJ2JhY2tHcm91bmQnLCBbJ1doaXRlJywgJ0JsYWNrJywgJ051bGwnLCAnQ29sb3InLCAnVGV4dHVyZScsICdDdWJlbWFwJ10pXG4gICAgLm9uQ2hhbmdlKChldmVudCkgPT4gaGFuZGxlQmFja2dyb3VuZENoYW5nZShldmVudCwgc2NlbmUpKVxuICBzY2VuZUNvbnRyb2xzLmFkZChwcm9wcy5vdmVycmlkZU1hdGVyaWFsLCAndG9nZ2xlJykubmFtZSgnVG9nZ2xlIE92ZXJyaWRlIE1hdGVyaWFsJylcbiAgc2NlbmVDb250cm9scy5hZGQocHJvcHMuZW52aXJvbm1lbnQsICd0b2dnbGUnKS5uYW1lKCdUb2dnbGUgRW52aXJvbm1lbnQnKVxuXG4gIGlmIChmb2dFbmFibGVkKSB7XG4gICAgY29uc3QgZm9nQ29sb3IgPSBuZXcgVEhSRUUuQ29sb3IoMHhmZmZmZmYpXG4gICAgY29uc3QgZm9nID0gbmV3IFRIUkVFLkZvZyhmb2dDb2xvciwgMSwgMjApXG4gICAgc2NlbmUuZm9nID0gZm9nXG4gICAgY29uc3QgZm9nUHJvcHMgPSBmb2dQcm9wZXJ0aWVzKGZvZylcbiAgICBjb25zdCBmb2dDb250cm9scyA9IHNjZW5lQ29udHJvbHMuYWRkRm9sZGVyKCdGb2cnKVxuICAgIGZvZ0NvbnRyb2xzLmFkZENvbG9yKGZvZ1Byb3BzLCAnY29sb3InKVxuICAgIGZvZ0NvbnRyb2xzLmFkZChmb2dQcm9wcywgJ25lYXInLCAwLCAxMCwgMC4xKVxuICAgIGZvZ0NvbnRyb2xzLmFkZChmb2dQcm9wcywgJ2ZhcicsIDAsIDEwMCwgMC4xKVxuXG4gICAgZm9nQ29udHJvbHMub25DaGFuZ2UoKCkgPT4ge1xuICAgICAgZm9nLmNvbG9yID0gZm9nQ29sb3Iuc2V0SGV4KGZvZ1Byb3BzLmNvbG9yKVxuICAgICAgZm9nLm5lYXIgPSBmb2dQcm9wcy5uZWFyXG4gICAgICBmb2cuZmFyID0gZm9nUHJvcHMuZmFyXG4gICAgfSlcbiAgfVxuXG4gIGlzT3BlbiA/IHNjZW5lQ29udHJvbHMub3BlbigpIDogc2NlbmVDb250cm9scy5jbG9zZSgpXG59XG5cbmNvbnN0IGhhbmRsZUJhY2tncm91bmRDaGFuZ2UgPSAoc2V0dGluZywgc2NlbmUpID0+IHtcbiAgc3dpdGNoIChzZXR0aW5nKSB7XG4gICAgY2FzZSAnV2hpdGUnOlxuICAgICAgc2NlbmUuYmFja2dyb3VuZCA9IG5ldyBUSFJFRS5Db2xvcigweGZmZmZmZilcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnQmxhY2snOlxuICAgICAgc2NlbmUuYmFja2dyb3VuZCA9IG5ldyBUSFJFRS5Db2xvcigweDAwMDAwMClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnTnVsbCc6XG4gICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbnVsbFxuICAgICAgYnJlYWtcbiAgICBjYXNlICdDb2xvcic6XG4gICAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbmV3IFRIUkVFLkNvbG9yKDB4NDRmZjQ0KVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdUZXh0dXJlJzpcbiAgICAgIHRleHR1cmVMb2FkZXIubG9hZCgnL2Fzc2V0cy90ZXh0dXJlcy93b29kL2Fic3RyYWN0LWFudGlxdWUtYmFja2Ryb3AtMTY0MDA1LmpwZycsIChsb2FkZWQpID0+IHtcbiAgICAgICAgbG9hZGVkLmVuY29kaW5nID0gVEhSRUUuc1JHQkVuY29kaW5nXG4gICAgICAgIHNjZW5lLmJhY2tncm91bmQgPSBsb2FkZWRcbiAgICAgICAgc2NlbmUuZW52aXJvbm1lbnQgPSBudWxsXG4gICAgICB9KVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdDdWJlbWFwJzpcbiAgICAgIHRleHR1cmVMb2FkZXIubG9hZCgnL2Fzc2V0cy9lcXVpLmpwZWcnLCAobG9hZGVkKSA9PiB7XG4gICAgICAgIGxvYWRlZC5tYXBwaW5nID0gVEhSRUUuRXF1aXJlY3Rhbmd1bGFyUmVmbGVjdGlvbk1hcHBpbmdcbiAgICAgICAgc2NlbmUuYmFja2dyb3VuZCA9IGxvYWRlZFxuICAgICAgICBzY2VuZS5lbnZpcm9ubWVudCA9IGxvYWRlZFxuICAgICAgfSlcblxuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgYnJlYWtcbiAgfVxufVxuIiwiLyoqXG4gKiBUZXh0ID0gM0QgVGV4dFxuICpcbiAqIHBhcmFtZXRlcnMgPSB7XG4gKiAgZm9udDogPFRIUkVFLkZvbnQ+LCAvLyBmb250XG4gKlxuICogIHNpemU6IDxmbG9hdD4sIC8vIHNpemUgb2YgdGhlIHRleHRcbiAqICBoZWlnaHQ6IDxmbG9hdD4sIC8vIHRoaWNrbmVzcyB0byBleHRydWRlIHRleHRcbiAqICBjdXJ2ZVNlZ21lbnRzOiA8aW50PiwgLy8gbnVtYmVyIG9mIHBvaW50cyBvbiB0aGUgY3VydmVzXG4gKlxuICogIGJldmVsRW5hYmxlZDogPGJvb2w+LCAvLyB0dXJuIG9uIGJldmVsXG4gKiAgYmV2ZWxUaGlja25lc3M6IDxmbG9hdD4sIC8vIGhvdyBkZWVwIGludG8gdGV4dCBiZXZlbCBnb2VzXG4gKiAgYmV2ZWxTaXplOiA8ZmxvYXQ+LCAvLyBob3cgZmFyIGZyb20gdGV4dCBvdXRsaW5lIChpbmNsdWRpbmcgYmV2ZWxPZmZzZXQpIGlzIGJldmVsXG4gKiAgYmV2ZWxPZmZzZXQ6IDxmbG9hdD4gLy8gaG93IGZhciBmcm9tIHRleHQgb3V0bGluZSBkb2VzIGJldmVsIHN0YXJ0XG4gKiB9XG4gKi9cblxuaW1wb3J0IHtcblx0RXh0cnVkZUdlb21ldHJ5XG59IGZyb20gJ3RocmVlJztcblxuY2xhc3MgVGV4dEdlb21ldHJ5IGV4dGVuZHMgRXh0cnVkZUdlb21ldHJ5IHtcblxuXHRjb25zdHJ1Y3RvciggdGV4dCwgcGFyYW1ldGVycyA9IHt9ICkge1xuXG5cdFx0Y29uc3QgZm9udCA9IHBhcmFtZXRlcnMuZm9udDtcblxuXHRcdGlmICggZm9udCA9PT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRzdXBlcigpOyAvLyBnZW5lcmF0ZSBkZWZhdWx0IGV4dHJ1ZGUgZ2VvbWV0cnlcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGNvbnN0IHNoYXBlcyA9IGZvbnQuZ2VuZXJhdGVTaGFwZXMoIHRleHQsIHBhcmFtZXRlcnMuc2l6ZSApO1xuXG5cdFx0XHQvLyB0cmFuc2xhdGUgcGFyYW1ldGVycyB0byBFeHRydWRlR2VvbWV0cnkgQVBJXG5cblx0XHRcdHBhcmFtZXRlcnMuZGVwdGggPSBwYXJhbWV0ZXJzLmhlaWdodCAhPT0gdW5kZWZpbmVkID8gcGFyYW1ldGVycy5oZWlnaHQgOiA1MDtcblxuXHRcdFx0Ly8gZGVmYXVsdHNcblxuXHRcdFx0aWYgKCBwYXJhbWV0ZXJzLmJldmVsVGhpY2tuZXNzID09PSB1bmRlZmluZWQgKSBwYXJhbWV0ZXJzLmJldmVsVGhpY2tuZXNzID0gMTA7XG5cdFx0XHRpZiAoIHBhcmFtZXRlcnMuYmV2ZWxTaXplID09PSB1bmRlZmluZWQgKSBwYXJhbWV0ZXJzLmJldmVsU2l6ZSA9IDg7XG5cdFx0XHRpZiAoIHBhcmFtZXRlcnMuYmV2ZWxFbmFibGVkID09PSB1bmRlZmluZWQgKSBwYXJhbWV0ZXJzLmJldmVsRW5hYmxlZCA9IGZhbHNlO1xuXG5cdFx0XHRzdXBlciggc2hhcGVzLCBwYXJhbWV0ZXJzICk7XG5cblx0XHR9XG5cblx0XHR0aGlzLnR5cGUgPSAnVGV4dEdlb21ldHJ5JztcblxuXHR9XG5cbn1cblxuXG5leHBvcnQgeyBUZXh0R2VvbWV0cnkgfTtcbiIsImltcG9ydCB7XG5cdEJ1ZmZlckdlb21ldHJ5LFxuXHRGbG9hdDMyQnVmZmVyQXR0cmlidXRlLFxuXHRMaW5lU2VnbWVudHMsXG5cdExpbmVCYXNpY01hdGVyaWFsLFxuXHRNYXRyaXgzLFxuXHRWZWN0b3IzXG59IGZyb20gJ3RocmVlJztcblxuY29uc3QgX3YxID0gbmV3IFZlY3RvcjMoKTtcbmNvbnN0IF92MiA9IG5ldyBWZWN0b3IzKCk7XG5jb25zdCBfbm9ybWFsTWF0cml4ID0gbmV3IE1hdHJpeDMoKTtcblxuY2xhc3MgVmVydGV4Tm9ybWFsc0hlbHBlciBleHRlbmRzIExpbmVTZWdtZW50cyB7XG5cblx0Y29uc3RydWN0b3IoIG9iamVjdCwgc2l6ZSA9IDEsIGNvbG9yID0gMHhmZjAwMDAgKSB7XG5cblx0XHRjb25zdCBnZW9tZXRyeSA9IG5ldyBCdWZmZXJHZW9tZXRyeSgpO1xuXG5cdFx0Y29uc3Qgbk5vcm1hbHMgPSBvYmplY3QuZ2VvbWV0cnkuYXR0cmlidXRlcy5ub3JtYWwuY291bnQ7XG5cdFx0Y29uc3QgcG9zaXRpb25zID0gbmV3IEZsb2F0MzJCdWZmZXJBdHRyaWJ1dGUoIG5Ob3JtYWxzICogMiAqIDMsIDMgKTtcblxuXHRcdGdlb21ldHJ5LnNldEF0dHJpYnV0ZSggJ3Bvc2l0aW9uJywgcG9zaXRpb25zICk7XG5cblx0XHRzdXBlciggZ2VvbWV0cnksIG5ldyBMaW5lQmFzaWNNYXRlcmlhbCggeyBjb2xvciwgdG9uZU1hcHBlZDogZmFsc2UgfSApICk7XG5cblx0XHR0aGlzLm9iamVjdCA9IG9iamVjdDtcblx0XHR0aGlzLnNpemUgPSBzaXplO1xuXHRcdHRoaXMudHlwZSA9ICdWZXJ0ZXhOb3JtYWxzSGVscGVyJztcblxuXHRcdC8vXG5cblx0XHR0aGlzLm1hdHJpeEF1dG9VcGRhdGUgPSBmYWxzZTtcblxuXHRcdHRoaXMudXBkYXRlKCk7XG5cblx0fVxuXG5cdHVwZGF0ZSgpIHtcblxuXHRcdHRoaXMub2JqZWN0LnVwZGF0ZU1hdHJpeFdvcmxkKCB0cnVlICk7XG5cblx0XHRfbm9ybWFsTWF0cml4LmdldE5vcm1hbE1hdHJpeCggdGhpcy5vYmplY3QubWF0cml4V29ybGQgKTtcblxuXHRcdGNvbnN0IG1hdHJpeFdvcmxkID0gdGhpcy5vYmplY3QubWF0cml4V29ybGQ7XG5cblx0XHRjb25zdCBwb3NpdGlvbiA9IHRoaXMuZ2VvbWV0cnkuYXR0cmlidXRlcy5wb3NpdGlvbjtcblxuXHRcdC8vXG5cblx0XHRjb25zdCBvYmpHZW9tZXRyeSA9IHRoaXMub2JqZWN0Lmdlb21ldHJ5O1xuXG5cdFx0aWYgKCBvYmpHZW9tZXRyeSApIHtcblxuXHRcdFx0Y29uc3Qgb2JqUG9zID0gb2JqR2VvbWV0cnkuYXR0cmlidXRlcy5wb3NpdGlvbjtcblxuXHRcdFx0Y29uc3Qgb2JqTm9ybSA9IG9iakdlb21ldHJ5LmF0dHJpYnV0ZXMubm9ybWFsO1xuXG5cdFx0XHRsZXQgaWR4ID0gMDtcblxuXHRcdFx0Ly8gZm9yIHNpbXBsaWNpdHksIGlnbm9yZSBpbmRleCBhbmQgZHJhd2NhbGxzLCBhbmQgcmVuZGVyIGV2ZXJ5IG5vcm1hbFxuXG5cdFx0XHRmb3IgKCBsZXQgaiA9IDAsIGpsID0gb2JqUG9zLmNvdW50OyBqIDwgamw7IGogKysgKSB7XG5cblx0XHRcdFx0X3YxLmZyb21CdWZmZXJBdHRyaWJ1dGUoIG9ialBvcywgaiApLmFwcGx5TWF0cml4NCggbWF0cml4V29ybGQgKTtcblxuXHRcdFx0XHRfdjIuZnJvbUJ1ZmZlckF0dHJpYnV0ZSggb2JqTm9ybSwgaiApO1xuXG5cdFx0XHRcdF92Mi5hcHBseU1hdHJpeDMoIF9ub3JtYWxNYXRyaXggKS5ub3JtYWxpemUoKS5tdWx0aXBseVNjYWxhciggdGhpcy5zaXplICkuYWRkKCBfdjEgKTtcblxuXHRcdFx0XHRwb3NpdGlvbi5zZXRYWVooIGlkeCwgX3YxLngsIF92MS55LCBfdjEueiApO1xuXG5cdFx0XHRcdGlkeCA9IGlkeCArIDE7XG5cblx0XHRcdFx0cG9zaXRpb24uc2V0WFlaKCBpZHgsIF92Mi54LCBfdjIueSwgX3YyLnogKTtcblxuXHRcdFx0XHRpZHggPSBpZHggKyAxO1xuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRwb3NpdGlvbi5uZWVkc1VwZGF0ZSA9IHRydWU7XG5cblx0fVxuXG59XG5cblxuZXhwb3J0IHsgVmVydGV4Tm9ybWFsc0hlbHBlciB9O1xuIiwiaW1wb3J0IHtcblx0RmlsZUxvYWRlcixcblx0TG9hZGVyLFxuXHRTaGFwZVBhdGhcbn0gZnJvbSAndGhyZWUnO1xuXG5jbGFzcyBGb250TG9hZGVyIGV4dGVuZHMgTG9hZGVyIHtcblxuXHRjb25zdHJ1Y3RvciggbWFuYWdlciApIHtcblxuXHRcdHN1cGVyKCBtYW5hZ2VyICk7XG5cblx0fVxuXG5cdGxvYWQoIHVybCwgb25Mb2FkLCBvblByb2dyZXNzLCBvbkVycm9yICkge1xuXG5cdFx0Y29uc3Qgc2NvcGUgPSB0aGlzO1xuXG5cdFx0Y29uc3QgbG9hZGVyID0gbmV3IEZpbGVMb2FkZXIoIHRoaXMubWFuYWdlciApO1xuXHRcdGxvYWRlci5zZXRQYXRoKCB0aGlzLnBhdGggKTtcblx0XHRsb2FkZXIuc2V0UmVxdWVzdEhlYWRlciggdGhpcy5yZXF1ZXN0SGVhZGVyICk7XG5cdFx0bG9hZGVyLnNldFdpdGhDcmVkZW50aWFscyggc2NvcGUud2l0aENyZWRlbnRpYWxzICk7XG5cdFx0bG9hZGVyLmxvYWQoIHVybCwgZnVuY3Rpb24gKCB0ZXh0ICkge1xuXG5cdFx0XHRsZXQganNvbjtcblxuXHRcdFx0dHJ5IHtcblxuXHRcdFx0XHRqc29uID0gSlNPTi5wYXJzZSggdGV4dCApO1xuXG5cdFx0XHR9IGNhdGNoICggZSApIHtcblxuXHRcdFx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5Gb250TG9hZGVyOiB0eXBlZmFjZS5qcyBzdXBwb3J0IGlzIGJlaW5nIGRlcHJlY2F0ZWQuIFVzZSB0eXBlZmFjZS5qc29uIGluc3RlYWQuJyApO1xuXHRcdFx0XHRqc29uID0gSlNPTi5wYXJzZSggdGV4dC5zdWJzdHJpbmcoIDY1LCB0ZXh0Lmxlbmd0aCAtIDIgKSApO1xuXG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGZvbnQgPSBzY29wZS5wYXJzZSgganNvbiApO1xuXG5cdFx0XHRpZiAoIG9uTG9hZCApIG9uTG9hZCggZm9udCApO1xuXG5cdFx0fSwgb25Qcm9ncmVzcywgb25FcnJvciApO1xuXG5cdH1cblxuXHRwYXJzZSgganNvbiApIHtcblxuXHRcdHJldHVybiBuZXcgRm9udCgganNvbiApO1xuXG5cdH1cblxufVxuXG4vL1xuXG5jbGFzcyBGb250IHtcblxuXHRjb25zdHJ1Y3RvciggZGF0YSApIHtcblxuXHRcdHRoaXMuaXNGb250ID0gdHJ1ZTtcblxuXHRcdHRoaXMudHlwZSA9ICdGb250JztcblxuXHRcdHRoaXMuZGF0YSA9IGRhdGE7XG5cblx0fVxuXG5cdGdlbmVyYXRlU2hhcGVzKCB0ZXh0LCBzaXplID0gMTAwICkge1xuXG5cdFx0Y29uc3Qgc2hhcGVzID0gW107XG5cdFx0Y29uc3QgcGF0aHMgPSBjcmVhdGVQYXRocyggdGV4dCwgc2l6ZSwgdGhpcy5kYXRhICk7XG5cblx0XHRmb3IgKCBsZXQgcCA9IDAsIHBsID0gcGF0aHMubGVuZ3RoOyBwIDwgcGw7IHAgKysgKSB7XG5cblx0XHRcdHNoYXBlcy5wdXNoKCAuLi5wYXRoc1sgcCBdLnRvU2hhcGVzKCkgKTtcblxuXHRcdH1cblxuXHRcdHJldHVybiBzaGFwZXM7XG5cblx0fVxuXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVBhdGhzKCB0ZXh0LCBzaXplLCBkYXRhICkge1xuXG5cdGNvbnN0IGNoYXJzID0gQXJyYXkuZnJvbSggdGV4dCApO1xuXHRjb25zdCBzY2FsZSA9IHNpemUgLyBkYXRhLnJlc29sdXRpb247XG5cdGNvbnN0IGxpbmVfaGVpZ2h0ID0gKCBkYXRhLmJvdW5kaW5nQm94LnlNYXggLSBkYXRhLmJvdW5kaW5nQm94LnlNaW4gKyBkYXRhLnVuZGVybGluZVRoaWNrbmVzcyApICogc2NhbGU7XG5cblx0Y29uc3QgcGF0aHMgPSBbXTtcblxuXHRsZXQgb2Zmc2V0WCA9IDAsIG9mZnNldFkgPSAwO1xuXG5cdGZvciAoIGxldCBpID0gMDsgaSA8IGNoYXJzLmxlbmd0aDsgaSArKyApIHtcblxuXHRcdGNvbnN0IGNoYXIgPSBjaGFyc1sgaSBdO1xuXG5cdFx0aWYgKCBjaGFyID09PSAnXFxuJyApIHtcblxuXHRcdFx0b2Zmc2V0WCA9IDA7XG5cdFx0XHRvZmZzZXRZIC09IGxpbmVfaGVpZ2h0O1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Y29uc3QgcmV0ID0gY3JlYXRlUGF0aCggY2hhciwgc2NhbGUsIG9mZnNldFgsIG9mZnNldFksIGRhdGEgKTtcblx0XHRcdG9mZnNldFggKz0gcmV0Lm9mZnNldFg7XG5cdFx0XHRwYXRocy5wdXNoKCByZXQucGF0aCApO1xuXG5cdFx0fVxuXG5cdH1cblxuXHRyZXR1cm4gcGF0aHM7XG5cbn1cblxuZnVuY3Rpb24gY3JlYXRlUGF0aCggY2hhciwgc2NhbGUsIG9mZnNldFgsIG9mZnNldFksIGRhdGEgKSB7XG5cblx0Y29uc3QgZ2x5cGggPSBkYXRhLmdseXBoc1sgY2hhciBdIHx8IGRhdGEuZ2x5cGhzWyAnPycgXTtcblxuXHRpZiAoICEgZ2x5cGggKSB7XG5cblx0XHRjb25zb2xlLmVycm9yKCAnVEhSRUUuRm9udDogY2hhcmFjdGVyIFwiJyArIGNoYXIgKyAnXCIgZG9lcyBub3QgZXhpc3RzIGluIGZvbnQgZmFtaWx5ICcgKyBkYXRhLmZhbWlseU5hbWUgKyAnLicgKTtcblxuXHRcdHJldHVybjtcblxuXHR9XG5cblx0Y29uc3QgcGF0aCA9IG5ldyBTaGFwZVBhdGgoKTtcblxuXHRsZXQgeCwgeSwgY3B4LCBjcHksIGNweDEsIGNweTEsIGNweDIsIGNweTI7XG5cblx0aWYgKCBnbHlwaC5vICkge1xuXG5cdFx0Y29uc3Qgb3V0bGluZSA9IGdseXBoLl9jYWNoZWRPdXRsaW5lIHx8ICggZ2x5cGguX2NhY2hlZE91dGxpbmUgPSBnbHlwaC5vLnNwbGl0KCAnICcgKSApO1xuXG5cdFx0Zm9yICggbGV0IGkgPSAwLCBsID0gb3V0bGluZS5sZW5ndGg7IGkgPCBsOyApIHtcblxuXHRcdFx0Y29uc3QgYWN0aW9uID0gb3V0bGluZVsgaSArKyBdO1xuXG5cdFx0XHRzd2l0Y2ggKCBhY3Rpb24gKSB7XG5cblx0XHRcdFx0Y2FzZSAnbSc6IC8vIG1vdmVUb1xuXG5cdFx0XHRcdFx0eCA9IG91dGxpbmVbIGkgKysgXSAqIHNjYWxlICsgb2Zmc2V0WDtcblx0XHRcdFx0XHR5ID0gb3V0bGluZVsgaSArKyBdICogc2NhbGUgKyBvZmZzZXRZO1xuXG5cdFx0XHRcdFx0cGF0aC5tb3ZlVG8oIHgsIHkgKTtcblxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGNhc2UgJ2wnOiAvLyBsaW5lVG9cblxuXHRcdFx0XHRcdHggPSBvdXRsaW5lWyBpICsrIF0gKiBzY2FsZSArIG9mZnNldFg7XG5cdFx0XHRcdFx0eSA9IG91dGxpbmVbIGkgKysgXSAqIHNjYWxlICsgb2Zmc2V0WTtcblxuXHRcdFx0XHRcdHBhdGgubGluZVRvKCB4LCB5ICk7XG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlICdxJzogLy8gcXVhZHJhdGljQ3VydmVUb1xuXG5cdFx0XHRcdFx0Y3B4ID0gb3V0bGluZVsgaSArKyBdICogc2NhbGUgKyBvZmZzZXRYO1xuXHRcdFx0XHRcdGNweSA9IG91dGxpbmVbIGkgKysgXSAqIHNjYWxlICsgb2Zmc2V0WTtcblx0XHRcdFx0XHRjcHgxID0gb3V0bGluZVsgaSArKyBdICogc2NhbGUgKyBvZmZzZXRYO1xuXHRcdFx0XHRcdGNweTEgPSBvdXRsaW5lWyBpICsrIF0gKiBzY2FsZSArIG9mZnNldFk7XG5cblx0XHRcdFx0XHRwYXRoLnF1YWRyYXRpY0N1cnZlVG8oIGNweDEsIGNweTEsIGNweCwgY3B5ICk7XG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlICdiJzogLy8gYmV6aWVyQ3VydmVUb1xuXG5cdFx0XHRcdFx0Y3B4ID0gb3V0bGluZVsgaSArKyBdICogc2NhbGUgKyBvZmZzZXRYO1xuXHRcdFx0XHRcdGNweSA9IG91dGxpbmVbIGkgKysgXSAqIHNjYWxlICsgb2Zmc2V0WTtcblx0XHRcdFx0XHRjcHgxID0gb3V0bGluZVsgaSArKyBdICogc2NhbGUgKyBvZmZzZXRYO1xuXHRcdFx0XHRcdGNweTEgPSBvdXRsaW5lWyBpICsrIF0gKiBzY2FsZSArIG9mZnNldFk7XG5cdFx0XHRcdFx0Y3B4MiA9IG91dGxpbmVbIGkgKysgXSAqIHNjYWxlICsgb2Zmc2V0WDtcblx0XHRcdFx0XHRjcHkyID0gb3V0bGluZVsgaSArKyBdICogc2NhbGUgKyBvZmZzZXRZO1xuXG5cdFx0XHRcdFx0cGF0aC5iZXppZXJDdXJ2ZVRvKCBjcHgxLCBjcHkxLCBjcHgyLCBjcHkyLCBjcHgsIGNweSApO1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHR9XG5cblx0cmV0dXJuIHsgb2Zmc2V0WDogZ2x5cGguaGEgKiBzY2FsZSwgcGF0aDogcGF0aCB9O1xuXG59XG5cbmV4cG9ydCB7IEZvbnRMb2FkZXIsIEZvbnQgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwidGV4dC1nZW9tZXRyeVwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtsdGpzX2ZvdXJ0aFwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtsdGpzX2ZvdXJ0aFwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfYnVpbGRfdGhyZWVfbW9kdWxlX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fY29udHJvbHNfT3JiaXRDb250cm9sc19qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfbGlsLWd1aV9kaXN0X2xpbC1ndWlfZXNtX2pzXCIsXCJzYW1wbGVzX2Jvb3RzdHJhcF9ib290c3RyYXBfanMtc2FtcGxlc19jb250cm9sc19tYXRlcmlhbC1jb250cm9sc19qcy1zYW1wbGVzX2NvbnRyb2xzX3JlbmRlcmUtYzg3ZDhhXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTYvdGV4dC1nZW9tZXRyeS5qc1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
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

/***/ "./samples/chapters/chapter-12/shapes.js"
/*!***********************************************!*\
  !*** ./samples/chapters/chapter-12/shapes.js ***!
  \***********************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_standard_scene_empty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/standard-scene-empty */ "./samples/chapters/chapter-12/util/standard-scene-empty.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _dimforge_rapier3d__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @dimforge/rapier3d */ "./node_modules/@dimforge/rapier3d/dynamics/rigid_body.js");
/* harmony import */ var _bootstrap_floor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../bootstrap/floor */ "./samples/bootstrap/floor.js");
/* harmony import */ var lil_gui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lil-gui */ "./node_modules/lil-gui/dist/lil-gui.esm.js");
/* harmony import */ var three_examples_jsm_geometries_ConvexGeometry__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! three/examples/jsm/geometries/ConvexGeometry */ "./node_modules/three/examples/jsm/geometries/ConvexGeometry.js");
/* harmony import */ var perlin__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! perlin */ "./node_modules/perlin/index.js");
/* harmony import */ var perlin__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(perlin__WEBPACK_IMPORTED_MODULE_7__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_dimforge_rapier3d__WEBPACK_IMPORTED_MODULE_3__]);
var __webpack_async_dependencies_result__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
_dimforge_rapier3d__WEBPACK_IMPORTED_MODULE_3__ = __webpack_async_dependencies_result__[0];











__webpack_require__.e(/*! import() */ "vendors-node_modules_dimforge_rapier3d_rapier_js").then(__webpack_require__.bind(__webpack_require__, /*! @dimforge/rapier3d */ "./node_modules/@dimforge/rapier3d/rapier.js")).then((RAPIER) => {
  const gravity = { x: 0.0, y: -10.0, z: 0.0 }
  const world = new RAPIER.World(gravity)

  const animate = (renderer, scene, camera) => {
    requestAnimationFrame(() => animate(renderer, scene, camera))
    renderer.render(scene, camera)

    // get the group containing all the objects
    scene.getObjectByName('addedMeshes').children.forEach((child) => {
      const childRigidBody = child.userData.rigidBody
      const position = childRigidBody.translation()
      const rotation = childRigidBody.rotation()

      child.position.set(position.x, position.y, position.z)
      child.rotation.setFromQuaternion(new three__WEBPACK_IMPORTED_MODULE_2__.Quaternion(rotation.x, rotation.y, rotation.z, rotation.w))
    })

    world.step()
  }

  const setupScene = (scene) => {}

  const addRapierCube = (group, friction, restitution) => {
    const cubeMesh = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(
      new three__WEBPACK_IMPORTED_MODULE_2__.BoxGeometry(0.4, 0.4, 0.4),
      new three__WEBPACK_IMPORTED_MODULE_2__.MeshStandardMaterial({ color: new three__WEBPACK_IMPORTED_MODULE_2__.Color(Math.random(), 0.4, 0.1) })
    )
    cubeMesh.position.set(0, 4, 0)
    cubeMesh.castShadow = true

    const rigidBodyDesc = new RAPIER.RigidBodyDesc(_dimforge_rapier3d__WEBPACK_IMPORTED_MODULE_3__.RigidBodyType.Dynamic)
      .setTranslation(0.0, 4, 0)
      .setCanSleep(false)
      .setCcdEnabled(false)
    const rigidBody = world.createRigidBody(rigidBodyDesc)

    const rigidBodyColliderDesc = RAPIER.ColliderDesc.cuboid(0.2, 0.2, 0.2)
    const rigidBodyCollider = world.createCollider(rigidBodyColliderDesc, rigidBody)

    rigidBodyCollider.setRestitution(restitution)
    rigidBodyCollider.setFriction(friction)

    cubeMesh.userData.rigidBody = rigidBody
    cubeMesh.userData.collider = rigidBodyCollider

    group.add(cubeMesh)
  }

  const addRapierSphere = (group, friction, restitution) => {
    const sphereMesh = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(
      new three__WEBPACK_IMPORTED_MODULE_2__.SphereGeometry(0.2, 6, 6),
      new three__WEBPACK_IMPORTED_MODULE_2__.MeshStandardMaterial({ color: new three__WEBPACK_IMPORTED_MODULE_2__.Color(0.4, 0.4, Math.random()) })
    )
    sphereMesh.castShadow = true
    sphereMesh.position.set(0, 4, 0)

    const rigidBodyDesc = new RAPIER.RigidBodyDesc(_dimforge_rapier3d__WEBPACK_IMPORTED_MODULE_3__.RigidBodyType.Dynamic)
      .setTranslation(0.0, 4, 0)
      .setCanSleep(false)
      .setCcdEnabled(false)
    const rigidBody = world.createRigidBody(rigidBodyDesc)

    const rigidBodyColliderDesc = RAPIER.ColliderDesc.ball(0.2)
    const rigidBodyCollider = world.createCollider(rigidBodyColliderDesc, rigidBody)
    rigidBodyCollider.setRestitution(restitution)
    rigidBodyCollider.setFriction(friction)

    sphereMesh.userData.rigidBody = rigidBody
    sphereMesh.userData.collider = rigidBodyCollider

    group.add(sphereMesh)
  }

  const addRapierCylinder = (group, friction, restitution) => {
    const cylinderMesh = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(
      new three__WEBPACK_IMPORTED_MODULE_2__.CylinderGeometry(0.2, 0.2, 0.6),
      new three__WEBPACK_IMPORTED_MODULE_2__.MeshStandardMaterial({ color: new three__WEBPACK_IMPORTED_MODULE_2__.Color(0.9, 0.2, Math.random()) })
    )
    cylinderMesh.castShadow = true
    cylinderMesh.position.set(0, 4, 0)

    const rigidBodyDesc = new RAPIER.RigidBodyDesc(_dimforge_rapier3d__WEBPACK_IMPORTED_MODULE_3__.RigidBodyType.Dynamic)
      .setTranslation(0.0, 4, 0)
      .setCanSleep(false)
      .setCcdEnabled(false)
    const rigidBody = world.createRigidBody(rigidBodyDesc)

    const rigidBodyColliderDesc = RAPIER.ColliderDesc.cylinder(0.3, 0.2)
    const rigidBodyCollider = world.createCollider(rigidBodyColliderDesc, rigidBody)
    rigidBodyCollider.setRestitution(restitution)
    rigidBodyCollider.setFriction(friction)

    cylinderMesh.userData.rigidBody = rigidBody
    cylinderMesh.userData.collider = rigidBodyCollider

    group.add(cylinderMesh)
  }

  const addRapierCone = (group, friction, restitution) => {
    const coneMesh = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(
      new three__WEBPACK_IMPORTED_MODULE_2__.CylinderGeometry(0, 0.2, 0.6),
      new three__WEBPACK_IMPORTED_MODULE_2__.MeshStandardMaterial({ color: new three__WEBPACK_IMPORTED_MODULE_2__.Color(0.2, 0.9, Math.random()) })
    )
    coneMesh.castShadow = true
    coneMesh.position.set(0, 4, 0)

    const rigidBodyDesc = new RAPIER.RigidBodyDesc(_dimforge_rapier3d__WEBPACK_IMPORTED_MODULE_3__.RigidBodyType.Dynamic)
      .setTranslation(0.0, 4, 0)
      .setCanSleep(false)
      .setCcdEnabled(false)
    const rigidBody = world.createRigidBody(rigidBodyDesc)

    const rigidBodyColliderDesc = RAPIER.ColliderDesc.cone(0.3, 0.2)
    const rigidBodyCollider = world.createCollider(rigidBodyColliderDesc, rigidBody)
    rigidBodyCollider.setRestitution(restitution)
    rigidBodyCollider.setFriction(friction)

    coneMesh.userData.rigidBody = rigidBody
    coneMesh.userData.collider = rigidBodyCollider

    group.add(coneMesh)
  }

  const addRapierCapsule = (group, friction, restitution) => {
    const mat = new three__WEBPACK_IMPORTED_MODULE_2__.MeshStandardMaterial({ color: new three__WEBPACK_IMPORTED_MODULE_2__.Color(0.4, 0.4, Math.random()) })

    const merged = new three__WEBPACK_IMPORTED_MODULE_2__.Group()
    const cyl = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.CylinderGeometry(0.2, 0.2, 0.6), mat)
    const top = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.SphereGeometry(0.2), mat)
    top.translateY(0.3)
    const bot = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.SphereGeometry(0.2), mat)
    bot.translateY(-0.3)
    cyl.castShadow = true
    top.castShadow = true
    bot.castShadow = true
    merged.add(cyl)
    merged.add(top)
    merged.add(bot)

    const rigidBodyDesc = new RAPIER.RigidBodyDesc(_dimforge_rapier3d__WEBPACK_IMPORTED_MODULE_3__.RigidBodyType.Dynamic)
      .setTranslation(0.0, 4, 0)
      .setCanSleep(false)
      .setCcdEnabled(false)
    const rigidBody = world.createRigidBody(rigidBodyDesc)

    const rigidBodyColliderDesc = RAPIER.ColliderDesc.capsule(0, 0.3, 0.2)
    const rigidBodyCollider = world.createCollider(rigidBodyColliderDesc, rigidBody)
    rigidBodyCollider.setRestitution(restitution)
    rigidBodyCollider.setFriction(friction)

    merged.userData.rigidBody = rigidBody
    merged.userData.collider = rigidBodyCollider

    group.add(merged)
  }

  const addRapierConvex = (group, friction, restitution) => {
    const generatePoints = () => {
      const spGroup = new three__WEBPACK_IMPORTED_MODULE_2__.Object3D()
      spGroup.name = 'spGroup'
      const points = []

      for (let i = 0; i < 30; i++) {
        const randomX = -0.5 + Math.random()
        const randomY = -0.5 + Math.random()
        const randomZ = -0.5 + Math.random()
        points.push(new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(randomX, randomY, randomZ))
      }
      return points
    }
    const points = generatePoints()

    const convexGeometry = new three_examples_jsm_geometries_ConvexGeometry__WEBPACK_IMPORTED_MODULE_6__.ConvexGeometry(points)
    const convexMesh = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(
      convexGeometry,
      new three__WEBPACK_IMPORTED_MODULE_2__.MeshStandardMaterial({ color: new three__WEBPACK_IMPORTED_MODULE_2__.Color(Math.random(), 0.9, 0.2) })
    )

    convexMesh.castShadow = true
    convexMesh.position.set(0, 4, 0)

    const rigidBodyDesc = new RAPIER.RigidBodyDesc(_dimforge_rapier3d__WEBPACK_IMPORTED_MODULE_3__.RigidBodyType.Dynamic)
      .setTranslation(0.0, 4, 0)
      .setCanSleep(false)
      .setCcdEnabled(false)
    const rigidBody = world.createRigidBody(rigidBodyDesc)

    const rigidBodyColliderDesc = RAPIER.ColliderDesc.convexHull(convexGeometry.getAttribute('position').array)
    const rigidBodyCollider = world.createCollider(rigidBodyColliderDesc, rigidBody)
    rigidBodyCollider.setRestitution(restitution)
    rigidBodyCollider.setFriction(friction)

    convexMesh.userData.rigidBody = rigidBody
    convexMesh.userData.collider = rigidBodyCollider

    group.add(convexMesh)
  }

  const createHeightMap = () => {
    const width = 20
    const height = 20

    const points = []
    for (let x = 1; x <= width * 2; x++) {
      for (let y = 1; y <= height * 2; y++) {
        const v1 = perlin__WEBPACK_IMPORTED_MODULE_7___default().noise.perlin3(255 / x, 255 / y, 255 / (x * y))
        points.push(v1)
      }
    }

    const planeBufferGeometry = new three__WEBPACK_IMPORTED_MODULE_2__.PlaneGeometry(width, height, width * 2 - 1, height * 2 - 1)
    const floats = planeBufferGeometry.getAttribute('position').array

    points.forEach((point, index) => {
      floats[index * 3 + 2] = point
    })

    planeBufferGeometry.computeVertexNormals()
    const texture = new three__WEBPACK_IMPORTED_MODULE_2__.TextureLoader().load('/assets/textures/wood/abstract-antique-backdrop-164005.jpg')
    const heightMesh = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(
      planeBufferGeometry,
      new three__WEBPACK_IMPORTED_MODULE_2__.MeshStandardMaterial({ side: three__WEBPACK_IMPORTED_MODULE_2__.DoubleSide, color: 0xffffff, flatShading: false, map: texture })
    )
    heightMesh.translateY(0)
    heightMesh.rotateX(-0.5 * Math.PI - 0.5)
    heightMesh.receiveShadow = true
    heightMesh.castShadow = true

    const rapierArray = new Float32Array(width * 2 * height * 2)
    for (let x = 0; x < width * 2; x++) {
      for (let y = 0; y < height * 2; y++) {
        rapierArray[y * width * 2 + x] = floats[(x * height * 2 + y) * 3 + 2]
      }
    }

    const rigidBodyDesc = new RAPIER.RigidBodyDesc(_dimforge_rapier3d__WEBPACK_IMPORTED_MODULE_3__.RigidBodyType.Fixed)
      .setTranslation(0.0, 0, 0)
      .setCanSleep(false)
      .setCcdEnabled(false)
      .setRotation(new three__WEBPACK_IMPORTED_MODULE_2__.Quaternion().setFromEuler(new three__WEBPACK_IMPORTED_MODULE_2__.Euler(-0.5, 0, 0)))
    const rigidBody = world.createRigidBody(rigidBodyDesc)
    const rigidBodyColliderDesc = RAPIER.ColliderDesc.heightfield(height * 2 - 1, width * 2 - 1, rapierArray, {
      x: width,
      y: 1,
      z: height
    })
    const collider = world.createCollider(rigidBodyColliderDesc, rigidBody)

    heightMesh.userData.rigidBody = rigidBody
    heightMesh.userData.collider = collider
    return heightMesh
  }

  ;(0,_util_standard_scene_empty__WEBPACK_IMPORTED_MODULE_0__.bootstrapMeshScene)({
    initializeScene: setupScene,
    addControls: (camera, renderer, scene, gui) => {
      const heightMesh = createHeightMap()
      scene.add(heightMesh)

      const group = new three__WEBPACK_IMPORTED_MODULE_2__.Group()
      group.name = 'addedMeshes'
      scene.add(group)

      camera.position.set(-0.5, 6, -10)
      const gravityFolder = gui.addFolder('Gravity')
      gravityFolder.add(gravity, 'x', -10, 10, 0.1)
      gravityFolder.add(gravity, 'y', -10, 10, 0.1)
      gravityFolder.add(gravity, 'z', -10, 10, 0.1)

      const sphereControls = {
        friction: 0.5,
        restitution: 0.5,
        addSphere: () => {
          addRapierSphere(group, sphereControls.friction, sphereControls.restitution)
        }
      }
      const sphereFolder = gui.addFolder('Sphere Settings')
      sphereFolder.add(sphereControls, 'friction', 0, 5, 0.01)
      sphereFolder.add(sphereControls, 'restitution', 0, 5, 0.01)
      sphereFolder.add(sphereControls, 'addSphere')

      const cubeControls = {
        friction: 0.5,
        restitution: 0.5,
        addCube: () => {
          addRapierCube(group, cubeControls.friction, cubeControls.restitution)
        }
      }
      const cubeFolder = gui.addFolder('Cube Settings')
      cubeFolder.add(cubeControls, 'friction', 0, 5, 0.01)
      cubeFolder.add(cubeControls, 'restitution', 0, 5, 0.01)
      cubeFolder.add(cubeControls, 'addCube')

      const capsuleControls = {
        friction: 0.5,
        restitution: 0.5,
        addCapsule: () => {
          addRapierCapsule(group, capsuleControls.friction, capsuleControls.restitution)
        }
      }
      const capsuleFolder = gui.addFolder('Capsule Settings')
      capsuleFolder.add(capsuleControls, 'friction', 0, 5, 0.01)
      capsuleFolder.add(capsuleControls, 'restitution', 0, 5, 0.01)
      capsuleFolder.add(capsuleControls, 'addCapsule')

      const cylinderControls = {
        friction: 0.5,
        restitution: 0.5,
        addCylinder: () => {
          addRapierCylinder(group, capsuleControls.friction, capsuleControls.restitution)
        }
      }
      const cylinderFolder = gui.addFolder('Cylinder Settings')
      cylinderFolder.add(cylinderControls, 'friction', 0, 5, 0.01)
      cylinderFolder.add(cylinderControls, 'restitution', 0, 5, 0.01)
      cylinderFolder.add(cylinderControls, 'addCylinder')

      const coneControls = {
        friction: 0.5,
        restitution: 0.5,
        addCone: () => {
          addRapierCone(group, coneControls.friction, coneControls.restitution)
        }
      }
      const coneFolder = gui.addFolder('Cone Settings')
      coneFolder.add(coneControls, 'friction', 0, 5, 0.01)
      coneFolder.add(coneControls, 'restitution', 0, 5, 0.01)
      coneFolder.add(coneControls, 'addCone')

      const convexControls = {
        friction: 0.5,
        restitution: 0.5,
        addConvex: () => {
          addRapierConvex(group, convexControls.friction, convexControls.restitution)
        }
      }
      const convexFolder = gui.addFolder('Convex Settings')
      convexFolder.add(convexControls, 'friction', 0, 5, 0.01)
      convexFolder.add(convexControls, 'restitution', 0, 5, 0.01)
      convexFolder.add(convexControls, 'addConvex')

      new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1__.OrbitControls(camera, renderer.domElement)
    },
    animate: (renderer, scene, camera) => {
      animate(renderer, scene, camera)
    }
  }).then()
})

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

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
/******/ 			id: moduleId,
/******/ 			loaded: false,
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
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var hasSymbol = typeof Symbol === "function";
/******/ 		var webpackQueues = hasSymbol ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = hasSymbol ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = hasSymbol ? Symbol("webpack error") : "__webpack_error__";
/******/ 		
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && queue.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 		
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 		
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			var handle = (deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 		
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}
/******/ 			var done = (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue))
/******/ 			body(handle, done);
/******/ 			queue && queue.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
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
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "js/" + chunkId + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "ltjs-fourth:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
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
/******/ 	/* webpack/runtime/wasm loading */
/******/ 	(() => {
/******/ 		__webpack_require__.v = (exports, wasmModuleId, wasmModuleHash, importsObj) => {
/******/ 		
/******/ 			var req = fetch(__webpack_require__.p + "" + wasmModuleHash + ".module.wasm");
/******/ 			var fallback = () => (req
/******/ 				.then((x) => (x.arrayBuffer()))
/******/ 				.then((bytes) => (WebAssembly.instantiate(bytes, importsObj)))
/******/ 				.then((res) => (Object.assign(exports, res.instance.exports))));
/******/ 			return req.then((res) => {
/******/ 				if (typeof WebAssembly.instantiateStreaming === "function") {
/******/ 		
/******/ 					return WebAssembly.instantiateStreaming(res, importsObj)
/******/ 						.then(
/******/ 							(res) => (Object.assign(exports, res.instance.exports)),
/******/ 							(e) => {
/******/ 								if(res.headers.get("Content-Type") !== "application/wasm") {
/******/ 									console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
/******/ 									return fallback();
/******/ 								}
/******/ 								throw e;
/******/ 							}
/******/ 						);
/******/ 				}
/******/ 				return fallback();
/******/ 			});
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl + "../";
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
/******/ 			"shapes": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","vendors-node_modules_dimforge_rapier3d_dynamics_rigid_body_js","vendors-node_modules_three_examples_jsm_geometries_ConvexGeometry_js","vendors-node_modules_perlin_index_js","samples_chapters_chapter-12_util_standard-scene-empty_js"], () => (__webpack_require__("./samples/chapters/chapter-12/shapes.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvc2hhcGVzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBOEI7O0FBRXZCO0FBQ1Asa0JBQWtCLHNEQUF5QjtBQUMzQyxrQkFBa0Isc0RBQXlCO0FBQzNDO0FBQ0EsR0FBRztBQUNILG1CQUFtQix1Q0FBVTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRU87QUFDUDtBQUNBLGtCQUFrQixvREFBdUI7QUFDekMsa0JBQWtCLHVEQUEwQjtBQUM1QztBQUNBLEdBQUc7QUFDSCxtQkFBbUIsdUNBQVU7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlCZ0U7QUFDUzs7QUFFM0M7QUFDbUM7QUFDRTtBQUNkO0FBQzVCO0FBQ29EO0FBQy9DOztBQUU5QixzTkFBNEI7QUFDNUIsb0JBQW9CO0FBQ3BCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkNBQTJDLDZDQUFnQjtBQUMzRCxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSx5QkFBeUIsdUNBQVU7QUFDbkMsVUFBVSw4Q0FBaUI7QUFDM0IsVUFBVSx1REFBMEIsR0FBRyxXQUFXLHdDQUFXLDJCQUEyQjtBQUN4RjtBQUNBO0FBQ0E7O0FBRUEsbURBQW1ELDZEQUFhO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBMkIsdUNBQVU7QUFDckMsVUFBVSxpREFBb0I7QUFDOUIsVUFBVSx1REFBMEIsR0FBRyxXQUFXLHdDQUFXLDJCQUEyQjtBQUN4RjtBQUNBO0FBQ0E7O0FBRUEsbURBQW1ELDZEQUFhO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDZCQUE2Qix1Q0FBVTtBQUN2QyxVQUFVLG1EQUFzQjtBQUNoQyxVQUFVLHVEQUEwQixHQUFHLFdBQVcsd0NBQVcsMkJBQTJCO0FBQ3hGO0FBQ0E7QUFDQTs7QUFFQSxtREFBbUQsNkRBQWE7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EseUJBQXlCLHVDQUFVO0FBQ25DLFVBQVUsbURBQXNCO0FBQ2hDLFVBQVUsdURBQTBCLEdBQUcsV0FBVyx3Q0FBVywyQkFBMkI7QUFDeEY7QUFDQTtBQUNBOztBQUVBLG1EQUFtRCw2REFBYTtBQUNoRTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsdURBQTBCLEdBQUcsV0FBVyx3Q0FBVywyQkFBMkI7O0FBRWxHLHVCQUF1Qix3Q0FBVztBQUNsQyxvQkFBb0IsdUNBQVUsS0FBSyxtREFBc0I7QUFDekQsb0JBQW9CLHVDQUFVLEtBQUssaURBQW9CO0FBQ3ZEO0FBQ0Esb0JBQW9CLHVDQUFVLEtBQUssaURBQW9CO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1EQUFtRCw2REFBYTtBQUNoRTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBCQUEwQiwyQ0FBYztBQUN4QztBQUNBOztBQUVBLHNCQUFzQixRQUFRO0FBQzlCO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QiwwQ0FBYTtBQUNyQztBQUNBO0FBQ0E7QUFDQTs7QUFFQSwrQkFBK0Isd0ZBQWM7QUFDN0MsMkJBQTJCLHVDQUFVO0FBQ3JDO0FBQ0EsVUFBVSx1REFBMEIsR0FBRyxXQUFXLHdDQUFXLDJCQUEyQjtBQUN4Rjs7QUFFQTtBQUNBOztBQUVBLG1EQUFtRCw2REFBYTtBQUNoRTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLGdCQUFnQjtBQUNwQyxzQkFBc0IsaUJBQWlCO0FBQ3ZDLG1CQUFtQixtREFBZTtBQUNsQztBQUNBO0FBQ0E7O0FBRUEsb0NBQW9DLGdEQUFtQjtBQUN2RDs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLHdCQUF3QixnREFBbUI7QUFDM0MsMkJBQTJCLHVDQUFVO0FBQ3JDO0FBQ0EsVUFBVSx1REFBMEIsR0FBRyxNQUFNLDZDQUFVLHFEQUFxRDtBQUM1RztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLGVBQWU7QUFDbkMsc0JBQXNCLGdCQUFnQjtBQUN0QztBQUNBO0FBQ0E7O0FBRUEsbURBQW1ELDZEQUFhO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qiw2Q0FBZ0Isb0JBQW9CLHdDQUFXO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsRUFBRSwrRUFBa0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0JBQXdCLHdDQUFXO0FBQ25DO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUFVLG9GQUFhO0FBQ3ZCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7Ozs7Ozs7O1VDdldEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQ2xDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxJQUFJO1dBQ0o7V0FDQTtXQUNBLElBQUk7V0FDSjs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsQ0FBQztXQUNEO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFQUFFO1dBQ0Y7V0FDQSxzR0FBc0c7V0FDdEc7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEU7Ozs7O1dDdkVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsK0JBQStCLHdDQUF3QztXQUN2RTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlCQUFpQixxQkFBcUI7V0FDdEM7V0FDQTtXQUNBLGtCQUFrQixxQkFBcUI7V0FDdkM7V0FDQTtXQUNBLEtBQUs7V0FDTDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRTs7Ozs7V0MzQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0EsRTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFQUFFO1dBQ0YsRTs7Ozs7V0NSQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEU7Ozs7O1dDSkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUMsSTs7Ozs7V0NQRDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRUFBRTtXQUNGO1dBQ0EsRTs7Ozs7V0NWQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHVCQUF1Qiw0QkFBNEI7V0FDbkQ7V0FDQTtXQUNBO1dBQ0EsaUJBQWlCLG9CQUFvQjtXQUNyQztXQUNBLG1HQUFtRyxZQUFZO1dBQy9HO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLG1FQUFtRSxpQ0FBaUM7V0FDcEc7V0FDQTtXQUNBO1dBQ0EsRTs7Ozs7V0N4Q0E7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdELEU7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFQUFFO1dBQ0YsRTs7Ozs7V0N4QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsMEM7Ozs7O1dDbEJBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUM7O1dBRWpDO1dBQ0E7V0FDQTtXQUNBLEtBQUs7V0FDTCxlQUFlO1dBQ2Y7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQSw0Rzs7Ozs7VUVyRkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9ib290c3RyYXAvZmxvb3IuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItMTIvc2hhcGVzLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9hc3luYyBtb2R1bGUiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2Vuc3VyZSBjaHVuayIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvZ2V0IGphdmFzY3JpcHQgY2h1bmsgZmlsZW5hbWUiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvaGFybW9ueSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2xvYWQgc2NyaXB0Iiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL3dhc20gbG9hZGluZyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5cbmV4cG9ydCBjb25zdCBmb3JldmVyUGxhbmUgPSAoc2NlbmUpID0+IHtcbiAgY29uc3QgZ2VvID0gbmV3IFRIUkVFLlBsYW5lQnVmZmVyR2VvbWV0cnkoMTAwMDAsIDEwMDAwKVxuICBjb25zdCBtYXQgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7XG4gICAgY29sb3I6IDB4ZmZmZmZmXG4gIH0pXG4gIGNvbnN0IG1lc2ggPSBuZXcgVEhSRUUuTWVzaChnZW8sIG1hdClcbiAgbWVzaC5wb3NpdGlvbi5zZXQoMCwgLTIsIDApXG4gIG1lc2gucm90YXRpb24uc2V0KE1hdGguUEkgLyAtMiwgMCwgMClcbiAgbWVzaC5yZWNlaXZlU2hhZG93ID0gdHJ1ZVxuICBtZXNoLm5hbWUgPSAnZm9yZXZlci1mbG9vcidcbiAgc2NlbmUuYWRkKG1lc2gpXG5cbiAgcmV0dXJuIG1lc2hcbn1cblxuZXhwb3J0IGNvbnN0IGZsb2F0aW5nRmxvb3IgPSAoc2NlbmUsIHNpemUpID0+IHtcbiAgY29uc3QgcyA9IHNpemUgPyBzaXplIDogNlxuICBjb25zdCBnZW8gPSBuZXcgVEhSRUUuQm94QnVmZmVyR2VvbWV0cnkocywgMC4yNSwgcywgMTAsIDEwLCAxMClcbiAgY29uc3QgbWF0ID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcbiAgICBjb2xvcjogMHhkZGRkZGRcbiAgfSlcbiAgY29uc3QgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlbywgbWF0KVxuICBtZXNoLnBvc2l0aW9uLnNldCgwLCAtMiwgLTEpXG4gIG1lc2gucmVjZWl2ZVNoYWRvdyA9IHRydWVcbiAgbWVzaC5uYW1lID0gJ2Zsb2F0aW5nLWZsb29yJ1xuICBzY2VuZS5hZGQobWVzaClcblxuICByZXR1cm4gbWVzaFxufVxuIiwiaW1wb3J0IHsgYm9vdHN0cmFwTWVzaFNjZW5lIH0gZnJvbSAnLi91dGlsL3N0YW5kYXJkLXNjZW5lLWVtcHR5J1xuaW1wb3J0IHsgT3JiaXRDb250cm9scyB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9jb250cm9scy9PcmJpdENvbnRyb2xzJ1xuXG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcbmltcG9ydCB7IFJpZ2lkQm9keURlc2MsIFJpZ2lkQm9keVR5cGUgfSBmcm9tICdAZGltZm9yZ2UvcmFwaWVyM2QnXG5pbXBvcnQgeyBmbG9hdGluZ0Zsb29yLCBmb3JldmVyUGxhbmUgfSBmcm9tICcuLi8uLi9ib290c3RyYXAvZmxvb3InXG5pbXBvcnQgeyBEb3VibGVTaWRlLCBHcm91cCwgUXVhdGVybmlvbiB9IGZyb20gJ3RocmVlJ1xuaW1wb3J0IEdVSSBmcm9tICdsaWwtZ3VpJ1xuaW1wb3J0IHsgQ29udmV4R2VvbWV0cnkgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vZ2VvbWV0cmllcy9Db252ZXhHZW9tZXRyeSdcbmltcG9ydCBnZW5lcmF0b3IgZnJvbSAncGVybGluJ1xuXG5pbXBvcnQoJ0BkaW1mb3JnZS9yYXBpZXIzZCcpLnRoZW4oKFJBUElFUikgPT4ge1xuICBjb25zdCBncmF2aXR5ID0geyB4OiAwLjAsIHk6IC0xMC4wLCB6OiAwLjAgfVxuICBjb25zdCB3b3JsZCA9IG5ldyBSQVBJRVIuV29ybGQoZ3Jhdml0eSlcblxuICBjb25zdCBhbmltYXRlID0gKHJlbmRlcmVyLCBzY2VuZSwgY2FtZXJhKSA9PiB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IGFuaW1hdGUocmVuZGVyZXIsIHNjZW5lLCBjYW1lcmEpKVxuICAgIHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhKVxuXG4gICAgLy8gZ2V0IHRoZSBncm91cCBjb250YWluaW5nIGFsbCB0aGUgb2JqZWN0c1xuICAgIHNjZW5lLmdldE9iamVjdEJ5TmFtZSgnYWRkZWRNZXNoZXMnKS5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGRSaWdpZEJvZHkgPSBjaGlsZC51c2VyRGF0YS5yaWdpZEJvZHlcbiAgICAgIGNvbnN0IHBvc2l0aW9uID0gY2hpbGRSaWdpZEJvZHkudHJhbnNsYXRpb24oKVxuICAgICAgY29uc3Qgcm90YXRpb24gPSBjaGlsZFJpZ2lkQm9keS5yb3RhdGlvbigpXG5cbiAgICAgIGNoaWxkLnBvc2l0aW9uLnNldChwb3NpdGlvbi54LCBwb3NpdGlvbi55LCBwb3NpdGlvbi56KVxuICAgICAgY2hpbGQucm90YXRpb24uc2V0RnJvbVF1YXRlcm5pb24obmV3IFRIUkVFLlF1YXRlcm5pb24ocm90YXRpb24ueCwgcm90YXRpb24ueSwgcm90YXRpb24ueiwgcm90YXRpb24udykpXG4gICAgfSlcblxuICAgIHdvcmxkLnN0ZXAoKVxuICB9XG5cbiAgY29uc3Qgc2V0dXBTY2VuZSA9IChzY2VuZSkgPT4ge31cblxuICBjb25zdCBhZGRSYXBpZXJDdWJlID0gKGdyb3VwLCBmcmljdGlvbiwgcmVzdGl0dXRpb24pID0+IHtcbiAgICBjb25zdCBjdWJlTWVzaCA9IG5ldyBUSFJFRS5NZXNoKFxuICAgICAgbmV3IFRIUkVFLkJveEdlb21ldHJ5KDAuNCwgMC40LCAwLjQpLFxuICAgICAgbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHsgY29sb3I6IG5ldyBUSFJFRS5Db2xvcihNYXRoLnJhbmRvbSgpLCAwLjQsIDAuMSkgfSlcbiAgICApXG4gICAgY3ViZU1lc2gucG9zaXRpb24uc2V0KDAsIDQsIDApXG4gICAgY3ViZU1lc2guY2FzdFNoYWRvdyA9IHRydWVcblxuICAgIGNvbnN0IHJpZ2lkQm9keURlc2MgPSBuZXcgUkFQSUVSLlJpZ2lkQm9keURlc2MoUmlnaWRCb2R5VHlwZS5EeW5hbWljKVxuICAgICAgLnNldFRyYW5zbGF0aW9uKDAuMCwgNCwgMClcbiAgICAgIC5zZXRDYW5TbGVlcChmYWxzZSlcbiAgICAgIC5zZXRDY2RFbmFibGVkKGZhbHNlKVxuICAgIGNvbnN0IHJpZ2lkQm9keSA9IHdvcmxkLmNyZWF0ZVJpZ2lkQm9keShyaWdpZEJvZHlEZXNjKVxuXG4gICAgY29uc3QgcmlnaWRCb2R5Q29sbGlkZXJEZXNjID0gUkFQSUVSLkNvbGxpZGVyRGVzYy5jdWJvaWQoMC4yLCAwLjIsIDAuMilcbiAgICBjb25zdCByaWdpZEJvZHlDb2xsaWRlciA9IHdvcmxkLmNyZWF0ZUNvbGxpZGVyKHJpZ2lkQm9keUNvbGxpZGVyRGVzYywgcmlnaWRCb2R5KVxuXG4gICAgcmlnaWRCb2R5Q29sbGlkZXIuc2V0UmVzdGl0dXRpb24ocmVzdGl0dXRpb24pXG4gICAgcmlnaWRCb2R5Q29sbGlkZXIuc2V0RnJpY3Rpb24oZnJpY3Rpb24pXG5cbiAgICBjdWJlTWVzaC51c2VyRGF0YS5yaWdpZEJvZHkgPSByaWdpZEJvZHlcbiAgICBjdWJlTWVzaC51c2VyRGF0YS5jb2xsaWRlciA9IHJpZ2lkQm9keUNvbGxpZGVyXG5cbiAgICBncm91cC5hZGQoY3ViZU1lc2gpXG4gIH1cblxuICBjb25zdCBhZGRSYXBpZXJTcGhlcmUgPSAoZ3JvdXAsIGZyaWN0aW9uLCByZXN0aXR1dGlvbikgPT4ge1xuICAgIGNvbnN0IHNwaGVyZU1lc2ggPSBuZXcgVEhSRUUuTWVzaChcbiAgICAgIG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSgwLjIsIDYsIDYpLFxuICAgICAgbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHsgY29sb3I6IG5ldyBUSFJFRS5Db2xvcigwLjQsIDAuNCwgTWF0aC5yYW5kb20oKSkgfSlcbiAgICApXG4gICAgc3BoZXJlTWVzaC5jYXN0U2hhZG93ID0gdHJ1ZVxuICAgIHNwaGVyZU1lc2gucG9zaXRpb24uc2V0KDAsIDQsIDApXG5cbiAgICBjb25zdCByaWdpZEJvZHlEZXNjID0gbmV3IFJBUElFUi5SaWdpZEJvZHlEZXNjKFJpZ2lkQm9keVR5cGUuRHluYW1pYylcbiAgICAgIC5zZXRUcmFuc2xhdGlvbigwLjAsIDQsIDApXG4gICAgICAuc2V0Q2FuU2xlZXAoZmFsc2UpXG4gICAgICAuc2V0Q2NkRW5hYmxlZChmYWxzZSlcbiAgICBjb25zdCByaWdpZEJvZHkgPSB3b3JsZC5jcmVhdGVSaWdpZEJvZHkocmlnaWRCb2R5RGVzYylcblxuICAgIGNvbnN0IHJpZ2lkQm9keUNvbGxpZGVyRGVzYyA9IFJBUElFUi5Db2xsaWRlckRlc2MuYmFsbCgwLjIpXG4gICAgY29uc3QgcmlnaWRCb2R5Q29sbGlkZXIgPSB3b3JsZC5jcmVhdGVDb2xsaWRlcihyaWdpZEJvZHlDb2xsaWRlckRlc2MsIHJpZ2lkQm9keSlcbiAgICByaWdpZEJvZHlDb2xsaWRlci5zZXRSZXN0aXR1dGlvbihyZXN0aXR1dGlvbilcbiAgICByaWdpZEJvZHlDb2xsaWRlci5zZXRGcmljdGlvbihmcmljdGlvbilcblxuICAgIHNwaGVyZU1lc2gudXNlckRhdGEucmlnaWRCb2R5ID0gcmlnaWRCb2R5XG4gICAgc3BoZXJlTWVzaC51c2VyRGF0YS5jb2xsaWRlciA9IHJpZ2lkQm9keUNvbGxpZGVyXG5cbiAgICBncm91cC5hZGQoc3BoZXJlTWVzaClcbiAgfVxuXG4gIGNvbnN0IGFkZFJhcGllckN5bGluZGVyID0gKGdyb3VwLCBmcmljdGlvbiwgcmVzdGl0dXRpb24pID0+IHtcbiAgICBjb25zdCBjeWxpbmRlck1lc2ggPSBuZXcgVEhSRUUuTWVzaChcbiAgICAgIG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDAuMiwgMC4yLCAwLjYpLFxuICAgICAgbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHsgY29sb3I6IG5ldyBUSFJFRS5Db2xvcigwLjksIDAuMiwgTWF0aC5yYW5kb20oKSkgfSlcbiAgICApXG4gICAgY3lsaW5kZXJNZXNoLmNhc3RTaGFkb3cgPSB0cnVlXG4gICAgY3lsaW5kZXJNZXNoLnBvc2l0aW9uLnNldCgwLCA0LCAwKVxuXG4gICAgY29uc3QgcmlnaWRCb2R5RGVzYyA9IG5ldyBSQVBJRVIuUmlnaWRCb2R5RGVzYyhSaWdpZEJvZHlUeXBlLkR5bmFtaWMpXG4gICAgICAuc2V0VHJhbnNsYXRpb24oMC4wLCA0LCAwKVxuICAgICAgLnNldENhblNsZWVwKGZhbHNlKVxuICAgICAgLnNldENjZEVuYWJsZWQoZmFsc2UpXG4gICAgY29uc3QgcmlnaWRCb2R5ID0gd29ybGQuY3JlYXRlUmlnaWRCb2R5KHJpZ2lkQm9keURlc2MpXG5cbiAgICBjb25zdCByaWdpZEJvZHlDb2xsaWRlckRlc2MgPSBSQVBJRVIuQ29sbGlkZXJEZXNjLmN5bGluZGVyKDAuMywgMC4yKVxuICAgIGNvbnN0IHJpZ2lkQm9keUNvbGxpZGVyID0gd29ybGQuY3JlYXRlQ29sbGlkZXIocmlnaWRCb2R5Q29sbGlkZXJEZXNjLCByaWdpZEJvZHkpXG4gICAgcmlnaWRCb2R5Q29sbGlkZXIuc2V0UmVzdGl0dXRpb24ocmVzdGl0dXRpb24pXG4gICAgcmlnaWRCb2R5Q29sbGlkZXIuc2V0RnJpY3Rpb24oZnJpY3Rpb24pXG5cbiAgICBjeWxpbmRlck1lc2gudXNlckRhdGEucmlnaWRCb2R5ID0gcmlnaWRCb2R5XG4gICAgY3lsaW5kZXJNZXNoLnVzZXJEYXRhLmNvbGxpZGVyID0gcmlnaWRCb2R5Q29sbGlkZXJcblxuICAgIGdyb3VwLmFkZChjeWxpbmRlck1lc2gpXG4gIH1cblxuICBjb25zdCBhZGRSYXBpZXJDb25lID0gKGdyb3VwLCBmcmljdGlvbiwgcmVzdGl0dXRpb24pID0+IHtcbiAgICBjb25zdCBjb25lTWVzaCA9IG5ldyBUSFJFRS5NZXNoKFxuICAgICAgbmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkoMCwgMC4yLCAwLjYpLFxuICAgICAgbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHsgY29sb3I6IG5ldyBUSFJFRS5Db2xvcigwLjIsIDAuOSwgTWF0aC5yYW5kb20oKSkgfSlcbiAgICApXG4gICAgY29uZU1lc2guY2FzdFNoYWRvdyA9IHRydWVcbiAgICBjb25lTWVzaC5wb3NpdGlvbi5zZXQoMCwgNCwgMClcblxuICAgIGNvbnN0IHJpZ2lkQm9keURlc2MgPSBuZXcgUkFQSUVSLlJpZ2lkQm9keURlc2MoUmlnaWRCb2R5VHlwZS5EeW5hbWljKVxuICAgICAgLnNldFRyYW5zbGF0aW9uKDAuMCwgNCwgMClcbiAgICAgIC5zZXRDYW5TbGVlcChmYWxzZSlcbiAgICAgIC5zZXRDY2RFbmFibGVkKGZhbHNlKVxuICAgIGNvbnN0IHJpZ2lkQm9keSA9IHdvcmxkLmNyZWF0ZVJpZ2lkQm9keShyaWdpZEJvZHlEZXNjKVxuXG4gICAgY29uc3QgcmlnaWRCb2R5Q29sbGlkZXJEZXNjID0gUkFQSUVSLkNvbGxpZGVyRGVzYy5jb25lKDAuMywgMC4yKVxuICAgIGNvbnN0IHJpZ2lkQm9keUNvbGxpZGVyID0gd29ybGQuY3JlYXRlQ29sbGlkZXIocmlnaWRCb2R5Q29sbGlkZXJEZXNjLCByaWdpZEJvZHkpXG4gICAgcmlnaWRCb2R5Q29sbGlkZXIuc2V0UmVzdGl0dXRpb24ocmVzdGl0dXRpb24pXG4gICAgcmlnaWRCb2R5Q29sbGlkZXIuc2V0RnJpY3Rpb24oZnJpY3Rpb24pXG5cbiAgICBjb25lTWVzaC51c2VyRGF0YS5yaWdpZEJvZHkgPSByaWdpZEJvZHlcbiAgICBjb25lTWVzaC51c2VyRGF0YS5jb2xsaWRlciA9IHJpZ2lkQm9keUNvbGxpZGVyXG5cbiAgICBncm91cC5hZGQoY29uZU1lc2gpXG4gIH1cblxuICBjb25zdCBhZGRSYXBpZXJDYXBzdWxlID0gKGdyb3VwLCBmcmljdGlvbiwgcmVzdGl0dXRpb24pID0+IHtcbiAgICBjb25zdCBtYXQgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoeyBjb2xvcjogbmV3IFRIUkVFLkNvbG9yKDAuNCwgMC40LCBNYXRoLnJhbmRvbSgpKSB9KVxuXG4gICAgY29uc3QgbWVyZ2VkID0gbmV3IFRIUkVFLkdyb3VwKClcbiAgICBjb25zdCBjeWwgPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuQ3lsaW5kZXJHZW9tZXRyeSgwLjIsIDAuMiwgMC42KSwgbWF0KVxuICAgIGNvbnN0IHRvcCA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSgwLjIpLCBtYXQpXG4gICAgdG9wLnRyYW5zbGF0ZVkoMC4zKVxuICAgIGNvbnN0IGJvdCA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSgwLjIpLCBtYXQpXG4gICAgYm90LnRyYW5zbGF0ZVkoLTAuMylcbiAgICBjeWwuY2FzdFNoYWRvdyA9IHRydWVcbiAgICB0b3AuY2FzdFNoYWRvdyA9IHRydWVcbiAgICBib3QuY2FzdFNoYWRvdyA9IHRydWVcbiAgICBtZXJnZWQuYWRkKGN5bClcbiAgICBtZXJnZWQuYWRkKHRvcClcbiAgICBtZXJnZWQuYWRkKGJvdClcblxuICAgIGNvbnN0IHJpZ2lkQm9keURlc2MgPSBuZXcgUkFQSUVSLlJpZ2lkQm9keURlc2MoUmlnaWRCb2R5VHlwZS5EeW5hbWljKVxuICAgICAgLnNldFRyYW5zbGF0aW9uKDAuMCwgNCwgMClcbiAgICAgIC5zZXRDYW5TbGVlcChmYWxzZSlcbiAgICAgIC5zZXRDY2RFbmFibGVkKGZhbHNlKVxuICAgIGNvbnN0IHJpZ2lkQm9keSA9IHdvcmxkLmNyZWF0ZVJpZ2lkQm9keShyaWdpZEJvZHlEZXNjKVxuXG4gICAgY29uc3QgcmlnaWRCb2R5Q29sbGlkZXJEZXNjID0gUkFQSUVSLkNvbGxpZGVyRGVzYy5jYXBzdWxlKDAsIDAuMywgMC4yKVxuICAgIGNvbnN0IHJpZ2lkQm9keUNvbGxpZGVyID0gd29ybGQuY3JlYXRlQ29sbGlkZXIocmlnaWRCb2R5Q29sbGlkZXJEZXNjLCByaWdpZEJvZHkpXG4gICAgcmlnaWRCb2R5Q29sbGlkZXIuc2V0UmVzdGl0dXRpb24ocmVzdGl0dXRpb24pXG4gICAgcmlnaWRCb2R5Q29sbGlkZXIuc2V0RnJpY3Rpb24oZnJpY3Rpb24pXG5cbiAgICBtZXJnZWQudXNlckRhdGEucmlnaWRCb2R5ID0gcmlnaWRCb2R5XG4gICAgbWVyZ2VkLnVzZXJEYXRhLmNvbGxpZGVyID0gcmlnaWRCb2R5Q29sbGlkZXJcblxuICAgIGdyb3VwLmFkZChtZXJnZWQpXG4gIH1cblxuICBjb25zdCBhZGRSYXBpZXJDb252ZXggPSAoZ3JvdXAsIGZyaWN0aW9uLCByZXN0aXR1dGlvbikgPT4ge1xuICAgIGNvbnN0IGdlbmVyYXRlUG9pbnRzID0gKCkgPT4ge1xuICAgICAgY29uc3Qgc3BHcm91cCA9IG5ldyBUSFJFRS5PYmplY3QzRCgpXG4gICAgICBzcEdyb3VwLm5hbWUgPSAnc3BHcm91cCdcbiAgICAgIGNvbnN0IHBvaW50cyA9IFtdXG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzA7IGkrKykge1xuICAgICAgICBjb25zdCByYW5kb21YID0gLTAuNSArIE1hdGgucmFuZG9tKClcbiAgICAgICAgY29uc3QgcmFuZG9tWSA9IC0wLjUgKyBNYXRoLnJhbmRvbSgpXG4gICAgICAgIGNvbnN0IHJhbmRvbVogPSAtMC41ICsgTWF0aC5yYW5kb20oKVxuICAgICAgICBwb2ludHMucHVzaChuZXcgVEhSRUUuVmVjdG9yMyhyYW5kb21YLCByYW5kb21ZLCByYW5kb21aKSlcbiAgICAgIH1cbiAgICAgIHJldHVybiBwb2ludHNcbiAgICB9XG4gICAgY29uc3QgcG9pbnRzID0gZ2VuZXJhdGVQb2ludHMoKVxuXG4gICAgY29uc3QgY29udmV4R2VvbWV0cnkgPSBuZXcgQ29udmV4R2VvbWV0cnkocG9pbnRzKVxuICAgIGNvbnN0IGNvbnZleE1lc2ggPSBuZXcgVEhSRUUuTWVzaChcbiAgICAgIGNvbnZleEdlb21ldHJ5LFxuICAgICAgbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHsgY29sb3I6IG5ldyBUSFJFRS5Db2xvcihNYXRoLnJhbmRvbSgpLCAwLjksIDAuMikgfSlcbiAgICApXG5cbiAgICBjb252ZXhNZXNoLmNhc3RTaGFkb3cgPSB0cnVlXG4gICAgY29udmV4TWVzaC5wb3NpdGlvbi5zZXQoMCwgNCwgMClcblxuICAgIGNvbnN0IHJpZ2lkQm9keURlc2MgPSBuZXcgUkFQSUVSLlJpZ2lkQm9keURlc2MoUmlnaWRCb2R5VHlwZS5EeW5hbWljKVxuICAgICAgLnNldFRyYW5zbGF0aW9uKDAuMCwgNCwgMClcbiAgICAgIC5zZXRDYW5TbGVlcChmYWxzZSlcbiAgICAgIC5zZXRDY2RFbmFibGVkKGZhbHNlKVxuICAgIGNvbnN0IHJpZ2lkQm9keSA9IHdvcmxkLmNyZWF0ZVJpZ2lkQm9keShyaWdpZEJvZHlEZXNjKVxuXG4gICAgY29uc3QgcmlnaWRCb2R5Q29sbGlkZXJEZXNjID0gUkFQSUVSLkNvbGxpZGVyRGVzYy5jb252ZXhIdWxsKGNvbnZleEdlb21ldHJ5LmdldEF0dHJpYnV0ZSgncG9zaXRpb24nKS5hcnJheSlcbiAgICBjb25zdCByaWdpZEJvZHlDb2xsaWRlciA9IHdvcmxkLmNyZWF0ZUNvbGxpZGVyKHJpZ2lkQm9keUNvbGxpZGVyRGVzYywgcmlnaWRCb2R5KVxuICAgIHJpZ2lkQm9keUNvbGxpZGVyLnNldFJlc3RpdHV0aW9uKHJlc3RpdHV0aW9uKVxuICAgIHJpZ2lkQm9keUNvbGxpZGVyLnNldEZyaWN0aW9uKGZyaWN0aW9uKVxuXG4gICAgY29udmV4TWVzaC51c2VyRGF0YS5yaWdpZEJvZHkgPSByaWdpZEJvZHlcbiAgICBjb252ZXhNZXNoLnVzZXJEYXRhLmNvbGxpZGVyID0gcmlnaWRCb2R5Q29sbGlkZXJcblxuICAgIGdyb3VwLmFkZChjb252ZXhNZXNoKVxuICB9XG5cbiAgY29uc3QgY3JlYXRlSGVpZ2h0TWFwID0gKCkgPT4ge1xuICAgIGNvbnN0IHdpZHRoID0gMjBcbiAgICBjb25zdCBoZWlnaHQgPSAyMFxuXG4gICAgY29uc3QgcG9pbnRzID0gW11cbiAgICBmb3IgKGxldCB4ID0gMTsgeCA8PSB3aWR0aCAqIDI7IHgrKykge1xuICAgICAgZm9yIChsZXQgeSA9IDE7IHkgPD0gaGVpZ2h0ICogMjsgeSsrKSB7XG4gICAgICAgIGNvbnN0IHYxID0gZ2VuZXJhdG9yLm5vaXNlLnBlcmxpbjMoMjU1IC8geCwgMjU1IC8geSwgMjU1IC8gKHggKiB5KSlcbiAgICAgICAgcG9pbnRzLnB1c2godjEpXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcGxhbmVCdWZmZXJHZW9tZXRyeSA9IG5ldyBUSFJFRS5QbGFuZUdlb21ldHJ5KHdpZHRoLCBoZWlnaHQsIHdpZHRoICogMiAtIDEsIGhlaWdodCAqIDIgLSAxKVxuICAgIGNvbnN0IGZsb2F0cyA9IHBsYW5lQnVmZmVyR2VvbWV0cnkuZ2V0QXR0cmlidXRlKCdwb3NpdGlvbicpLmFycmF5XG5cbiAgICBwb2ludHMuZm9yRWFjaCgocG9pbnQsIGluZGV4KSA9PiB7XG4gICAgICBmbG9hdHNbaW5kZXggKiAzICsgMl0gPSBwb2ludFxuICAgIH0pXG5cbiAgICBwbGFuZUJ1ZmZlckdlb21ldHJ5LmNvbXB1dGVWZXJ0ZXhOb3JtYWxzKClcbiAgICBjb25zdCB0ZXh0dXJlID0gbmV3IFRIUkVFLlRleHR1cmVMb2FkZXIoKS5sb2FkKCcvYXNzZXRzL3RleHR1cmVzL3dvb2QvYWJzdHJhY3QtYW50aXF1ZS1iYWNrZHJvcC0xNjQwMDUuanBnJylcbiAgICBjb25zdCBoZWlnaHRNZXNoID0gbmV3IFRIUkVFLk1lc2goXG4gICAgICBwbGFuZUJ1ZmZlckdlb21ldHJ5LFxuICAgICAgbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHsgc2lkZTogRG91YmxlU2lkZSwgY29sb3I6IDB4ZmZmZmZmLCBmbGF0U2hhZGluZzogZmFsc2UsIG1hcDogdGV4dHVyZSB9KVxuICAgIClcbiAgICBoZWlnaHRNZXNoLnRyYW5zbGF0ZVkoMClcbiAgICBoZWlnaHRNZXNoLnJvdGF0ZVgoLTAuNSAqIE1hdGguUEkgLSAwLjUpXG4gICAgaGVpZ2h0TWVzaC5yZWNlaXZlU2hhZG93ID0gdHJ1ZVxuICAgIGhlaWdodE1lc2guY2FzdFNoYWRvdyA9IHRydWVcblxuICAgIGNvbnN0IHJhcGllckFycmF5ID0gbmV3IEZsb2F0MzJBcnJheSh3aWR0aCAqIDIgKiBoZWlnaHQgKiAyKVxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgd2lkdGggKiAyOyB4KyspIHtcbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgaGVpZ2h0ICogMjsgeSsrKSB7XG4gICAgICAgIHJhcGllckFycmF5W3kgKiB3aWR0aCAqIDIgKyB4XSA9IGZsb2F0c1soeCAqIGhlaWdodCAqIDIgKyB5KSAqIDMgKyAyXVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHJpZ2lkQm9keURlc2MgPSBuZXcgUkFQSUVSLlJpZ2lkQm9keURlc2MoUmlnaWRCb2R5VHlwZS5GaXhlZClcbiAgICAgIC5zZXRUcmFuc2xhdGlvbigwLjAsIDAsIDApXG4gICAgICAuc2V0Q2FuU2xlZXAoZmFsc2UpXG4gICAgICAuc2V0Q2NkRW5hYmxlZChmYWxzZSlcbiAgICAgIC5zZXRSb3RhdGlvbihuZXcgVEhSRUUuUXVhdGVybmlvbigpLnNldEZyb21FdWxlcihuZXcgVEhSRUUuRXVsZXIoLTAuNSwgMCwgMCkpKVxuICAgIGNvbnN0IHJpZ2lkQm9keSA9IHdvcmxkLmNyZWF0ZVJpZ2lkQm9keShyaWdpZEJvZHlEZXNjKVxuICAgIGNvbnN0IHJpZ2lkQm9keUNvbGxpZGVyRGVzYyA9IFJBUElFUi5Db2xsaWRlckRlc2MuaGVpZ2h0ZmllbGQoaGVpZ2h0ICogMiAtIDEsIHdpZHRoICogMiAtIDEsIHJhcGllckFycmF5LCB7XG4gICAgICB4OiB3aWR0aCxcbiAgICAgIHk6IDEsXG4gICAgICB6OiBoZWlnaHRcbiAgICB9KVxuICAgIGNvbnN0IGNvbGxpZGVyID0gd29ybGQuY3JlYXRlQ29sbGlkZXIocmlnaWRCb2R5Q29sbGlkZXJEZXNjLCByaWdpZEJvZHkpXG5cbiAgICBoZWlnaHRNZXNoLnVzZXJEYXRhLnJpZ2lkQm9keSA9IHJpZ2lkQm9keVxuICAgIGhlaWdodE1lc2gudXNlckRhdGEuY29sbGlkZXIgPSBjb2xsaWRlclxuICAgIHJldHVybiBoZWlnaHRNZXNoXG4gIH1cblxuICBib290c3RyYXBNZXNoU2NlbmUoe1xuICAgIGluaXRpYWxpemVTY2VuZTogc2V0dXBTY2VuZSxcbiAgICBhZGRDb250cm9sczogKGNhbWVyYSwgcmVuZGVyZXIsIHNjZW5lLCBndWkpID0+IHtcbiAgICAgIGNvbnN0IGhlaWdodE1lc2ggPSBjcmVhdGVIZWlnaHRNYXAoKVxuICAgICAgc2NlbmUuYWRkKGhlaWdodE1lc2gpXG5cbiAgICAgIGNvbnN0IGdyb3VwID0gbmV3IFRIUkVFLkdyb3VwKClcbiAgICAgIGdyb3VwLm5hbWUgPSAnYWRkZWRNZXNoZXMnXG4gICAgICBzY2VuZS5hZGQoZ3JvdXApXG5cbiAgICAgIGNhbWVyYS5wb3NpdGlvbi5zZXQoLTAuNSwgNiwgLTEwKVxuICAgICAgY29uc3QgZ3Jhdml0eUZvbGRlciA9IGd1aS5hZGRGb2xkZXIoJ0dyYXZpdHknKVxuICAgICAgZ3Jhdml0eUZvbGRlci5hZGQoZ3Jhdml0eSwgJ3gnLCAtMTAsIDEwLCAwLjEpXG4gICAgICBncmF2aXR5Rm9sZGVyLmFkZChncmF2aXR5LCAneScsIC0xMCwgMTAsIDAuMSlcbiAgICAgIGdyYXZpdHlGb2xkZXIuYWRkKGdyYXZpdHksICd6JywgLTEwLCAxMCwgMC4xKVxuXG4gICAgICBjb25zdCBzcGhlcmVDb250cm9scyA9IHtcbiAgICAgICAgZnJpY3Rpb246IDAuNSxcbiAgICAgICAgcmVzdGl0dXRpb246IDAuNSxcbiAgICAgICAgYWRkU3BoZXJlOiAoKSA9PiB7XG4gICAgICAgICAgYWRkUmFwaWVyU3BoZXJlKGdyb3VwLCBzcGhlcmVDb250cm9scy5mcmljdGlvbiwgc3BoZXJlQ29udHJvbHMucmVzdGl0dXRpb24pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0IHNwaGVyZUZvbGRlciA9IGd1aS5hZGRGb2xkZXIoJ1NwaGVyZSBTZXR0aW5ncycpXG4gICAgICBzcGhlcmVGb2xkZXIuYWRkKHNwaGVyZUNvbnRyb2xzLCAnZnJpY3Rpb24nLCAwLCA1LCAwLjAxKVxuICAgICAgc3BoZXJlRm9sZGVyLmFkZChzcGhlcmVDb250cm9scywgJ3Jlc3RpdHV0aW9uJywgMCwgNSwgMC4wMSlcbiAgICAgIHNwaGVyZUZvbGRlci5hZGQoc3BoZXJlQ29udHJvbHMsICdhZGRTcGhlcmUnKVxuXG4gICAgICBjb25zdCBjdWJlQ29udHJvbHMgPSB7XG4gICAgICAgIGZyaWN0aW9uOiAwLjUsXG4gICAgICAgIHJlc3RpdHV0aW9uOiAwLjUsXG4gICAgICAgIGFkZEN1YmU6ICgpID0+IHtcbiAgICAgICAgICBhZGRSYXBpZXJDdWJlKGdyb3VwLCBjdWJlQ29udHJvbHMuZnJpY3Rpb24sIGN1YmVDb250cm9scy5yZXN0aXR1dGlvbilcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgY3ViZUZvbGRlciA9IGd1aS5hZGRGb2xkZXIoJ0N1YmUgU2V0dGluZ3MnKVxuICAgICAgY3ViZUZvbGRlci5hZGQoY3ViZUNvbnRyb2xzLCAnZnJpY3Rpb24nLCAwLCA1LCAwLjAxKVxuICAgICAgY3ViZUZvbGRlci5hZGQoY3ViZUNvbnRyb2xzLCAncmVzdGl0dXRpb24nLCAwLCA1LCAwLjAxKVxuICAgICAgY3ViZUZvbGRlci5hZGQoY3ViZUNvbnRyb2xzLCAnYWRkQ3ViZScpXG5cbiAgICAgIGNvbnN0IGNhcHN1bGVDb250cm9scyA9IHtcbiAgICAgICAgZnJpY3Rpb246IDAuNSxcbiAgICAgICAgcmVzdGl0dXRpb246IDAuNSxcbiAgICAgICAgYWRkQ2Fwc3VsZTogKCkgPT4ge1xuICAgICAgICAgIGFkZFJhcGllckNhcHN1bGUoZ3JvdXAsIGNhcHN1bGVDb250cm9scy5mcmljdGlvbiwgY2Fwc3VsZUNvbnRyb2xzLnJlc3RpdHV0aW9uKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCBjYXBzdWxlRm9sZGVyID0gZ3VpLmFkZEZvbGRlcignQ2Fwc3VsZSBTZXR0aW5ncycpXG4gICAgICBjYXBzdWxlRm9sZGVyLmFkZChjYXBzdWxlQ29udHJvbHMsICdmcmljdGlvbicsIDAsIDUsIDAuMDEpXG4gICAgICBjYXBzdWxlRm9sZGVyLmFkZChjYXBzdWxlQ29udHJvbHMsICdyZXN0aXR1dGlvbicsIDAsIDUsIDAuMDEpXG4gICAgICBjYXBzdWxlRm9sZGVyLmFkZChjYXBzdWxlQ29udHJvbHMsICdhZGRDYXBzdWxlJylcblxuICAgICAgY29uc3QgY3lsaW5kZXJDb250cm9scyA9IHtcbiAgICAgICAgZnJpY3Rpb246IDAuNSxcbiAgICAgICAgcmVzdGl0dXRpb246IDAuNSxcbiAgICAgICAgYWRkQ3lsaW5kZXI6ICgpID0+IHtcbiAgICAgICAgICBhZGRSYXBpZXJDeWxpbmRlcihncm91cCwgY2Fwc3VsZUNvbnRyb2xzLmZyaWN0aW9uLCBjYXBzdWxlQ29udHJvbHMucmVzdGl0dXRpb24pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0IGN5bGluZGVyRm9sZGVyID0gZ3VpLmFkZEZvbGRlcignQ3lsaW5kZXIgU2V0dGluZ3MnKVxuICAgICAgY3lsaW5kZXJGb2xkZXIuYWRkKGN5bGluZGVyQ29udHJvbHMsICdmcmljdGlvbicsIDAsIDUsIDAuMDEpXG4gICAgICBjeWxpbmRlckZvbGRlci5hZGQoY3lsaW5kZXJDb250cm9scywgJ3Jlc3RpdHV0aW9uJywgMCwgNSwgMC4wMSlcbiAgICAgIGN5bGluZGVyRm9sZGVyLmFkZChjeWxpbmRlckNvbnRyb2xzLCAnYWRkQ3lsaW5kZXInKVxuXG4gICAgICBjb25zdCBjb25lQ29udHJvbHMgPSB7XG4gICAgICAgIGZyaWN0aW9uOiAwLjUsXG4gICAgICAgIHJlc3RpdHV0aW9uOiAwLjUsXG4gICAgICAgIGFkZENvbmU6ICgpID0+IHtcbiAgICAgICAgICBhZGRSYXBpZXJDb25lKGdyb3VwLCBjb25lQ29udHJvbHMuZnJpY3Rpb24sIGNvbmVDb250cm9scy5yZXN0aXR1dGlvbilcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgY29uZUZvbGRlciA9IGd1aS5hZGRGb2xkZXIoJ0NvbmUgU2V0dGluZ3MnKVxuICAgICAgY29uZUZvbGRlci5hZGQoY29uZUNvbnRyb2xzLCAnZnJpY3Rpb24nLCAwLCA1LCAwLjAxKVxuICAgICAgY29uZUZvbGRlci5hZGQoY29uZUNvbnRyb2xzLCAncmVzdGl0dXRpb24nLCAwLCA1LCAwLjAxKVxuICAgICAgY29uZUZvbGRlci5hZGQoY29uZUNvbnRyb2xzLCAnYWRkQ29uZScpXG5cbiAgICAgIGNvbnN0IGNvbnZleENvbnRyb2xzID0ge1xuICAgICAgICBmcmljdGlvbjogMC41LFxuICAgICAgICByZXN0aXR1dGlvbjogMC41LFxuICAgICAgICBhZGRDb252ZXg6ICgpID0+IHtcbiAgICAgICAgICBhZGRSYXBpZXJDb252ZXgoZ3JvdXAsIGNvbnZleENvbnRyb2xzLmZyaWN0aW9uLCBjb252ZXhDb250cm9scy5yZXN0aXR1dGlvbilcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgY29udmV4Rm9sZGVyID0gZ3VpLmFkZEZvbGRlcignQ29udmV4IFNldHRpbmdzJylcbiAgICAgIGNvbnZleEZvbGRlci5hZGQoY29udmV4Q29udHJvbHMsICdmcmljdGlvbicsIDAsIDUsIDAuMDEpXG4gICAgICBjb252ZXhGb2xkZXIuYWRkKGNvbnZleENvbnRyb2xzLCAncmVzdGl0dXRpb24nLCAwLCA1LCAwLjAxKVxuICAgICAgY29udmV4Rm9sZGVyLmFkZChjb252ZXhDb250cm9scywgJ2FkZENvbnZleCcpXG5cbiAgICAgIG5ldyBPcmJpdENvbnRyb2xzKGNhbWVyYSwgcmVuZGVyZXIuZG9tRWxlbWVudClcbiAgICB9LFxuICAgIGFuaW1hdGU6IChyZW5kZXJlciwgc2NlbmUsIGNhbWVyYSkgPT4ge1xuICAgICAgYW5pbWF0ZShyZW5kZXJlciwgc2NlbmUsIGNhbWVyYSlcbiAgICB9XG4gIH0pLnRoZW4oKVxufSlcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBoYXNTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCI7XG52YXIgd2VicGFja1F1ZXVlcyA9IGhhc1N5bWJvbCA/IFN5bWJvbChcIndlYnBhY2sgcXVldWVzXCIpIDogXCJfX3dlYnBhY2tfcXVldWVzX19cIjtcbnZhciB3ZWJwYWNrRXhwb3J0cyA9IGhhc1N5bWJvbCA/IFN5bWJvbChcIndlYnBhY2sgZXhwb3J0c1wiKSA6IFwiX193ZWJwYWNrX2V4cG9ydHNfX1wiO1xudmFyIHdlYnBhY2tFcnJvciA9IGhhc1N5bWJvbCA/IFN5bWJvbChcIndlYnBhY2sgZXJyb3JcIikgOiBcIl9fd2VicGFja19lcnJvcl9fXCI7XG5cbnZhciByZXNvbHZlUXVldWUgPSAocXVldWUpID0+IHtcblx0aWYocXVldWUgJiYgcXVldWUuZCA8IDEpIHtcblx0XHRxdWV1ZS5kID0gMTtcblx0XHRxdWV1ZS5mb3JFYWNoKChmbikgPT4gKGZuLnItLSkpO1xuXHRcdHF1ZXVlLmZvckVhY2goKGZuKSA9PiAoZm4uci0tID8gZm4ucisrIDogZm4oKSkpO1xuXHR9XG59XG52YXIgd3JhcERlcHMgPSAoZGVwcykgPT4gKGRlcHMubWFwKChkZXApID0+IHtcblx0aWYoZGVwICE9PSBudWxsICYmIHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpIHtcblxuXHRcdGlmKGRlcFt3ZWJwYWNrUXVldWVzXSkgcmV0dXJuIGRlcDtcblx0XHRpZihkZXAudGhlbikge1xuXHRcdFx0dmFyIHF1ZXVlID0gW107XG5cdFx0XHRxdWV1ZS5kID0gMDtcblx0XHRcdGRlcC50aGVuKChyKSA9PiB7XG5cdFx0XHRcdG9ialt3ZWJwYWNrRXhwb3J0c10gPSByO1xuXHRcdFx0XHRyZXNvbHZlUXVldWUocXVldWUpO1xuXHRcdFx0fSwgKGUpID0+IHtcblx0XHRcdFx0b2JqW3dlYnBhY2tFcnJvcl0gPSBlO1xuXHRcdFx0XHRyZXNvbHZlUXVldWUocXVldWUpO1xuXHRcdFx0fSk7XG5cdFx0XHR2YXIgb2JqID0ge307XG5cblx0XHRcdG9ialt3ZWJwYWNrUXVldWVzXSA9IChmbikgPT4gKGZuKHF1ZXVlKSk7XG5cdFx0XHRyZXR1cm4gb2JqO1xuXHRcdH1cblx0fVxuXHR2YXIgcmV0ID0ge307XG5cdHJldFt3ZWJwYWNrUXVldWVzXSA9IHggPT4ge307XG5cdHJldFt3ZWJwYWNrRXhwb3J0c10gPSBkZXA7XG5cdHJldHVybiByZXQ7XG59KSk7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLmEgPSAobW9kdWxlLCBib2R5LCBoYXNBd2FpdCkgPT4ge1xuXHR2YXIgcXVldWU7XG5cdGhhc0F3YWl0ICYmICgocXVldWUgPSBbXSkuZCA9IC0xKTtcblx0dmFyIGRlcFF1ZXVlcyA9IG5ldyBTZXQoKTtcblx0dmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cztcblx0dmFyIGN1cnJlbnREZXBzO1xuXHR2YXIgb3V0ZXJSZXNvbHZlO1xuXHR2YXIgcmVqZWN0O1xuXHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWopID0+IHtcblx0XHRyZWplY3QgPSByZWo7XG5cdFx0b3V0ZXJSZXNvbHZlID0gcmVzb2x2ZTtcblx0fSk7XG5cdHByb21pc2Vbd2VicGFja0V4cG9ydHNdID0gZXhwb3J0cztcblx0cHJvbWlzZVt3ZWJwYWNrUXVldWVzXSA9IChmbikgPT4gKHF1ZXVlICYmIGZuKHF1ZXVlKSwgZGVwUXVldWVzLmZvckVhY2goZm4pLCBwcm9taXNlW1wiY2F0Y2hcIl0oeCA9PiB7fSkpO1xuXHRtb2R1bGUuZXhwb3J0cyA9IHByb21pc2U7XG5cdHZhciBoYW5kbGUgPSAoZGVwcykgPT4ge1xuXHRcdGN1cnJlbnREZXBzID0gd3JhcERlcHMoZGVwcyk7XG5cdFx0dmFyIGZuO1xuXHRcdHZhciBnZXRSZXN1bHQgPSAoKSA9PiAoY3VycmVudERlcHMubWFwKChkKSA9PiB7XG5cblx0XHRcdGlmKGRbd2VicGFja0Vycm9yXSkgdGhyb3cgZFt3ZWJwYWNrRXJyb3JdO1xuXHRcdFx0cmV0dXJuIGRbd2VicGFja0V4cG9ydHNdO1xuXHRcdH0pKVxuXHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcblx0XHRcdGZuID0gKCkgPT4gKHJlc29sdmUoZ2V0UmVzdWx0KSk7XG5cdFx0XHRmbi5yID0gMDtcblx0XHRcdHZhciBmblF1ZXVlID0gKHEpID0+IChxICE9PSBxdWV1ZSAmJiAhZGVwUXVldWVzLmhhcyhxKSAmJiAoZGVwUXVldWVzLmFkZChxKSwgcSAmJiAhcS5kICYmIChmbi5yKyssIHEucHVzaChmbikpKSk7XG5cdFx0XHRjdXJyZW50RGVwcy5tYXAoKGRlcCkgPT4gKGRlcFt3ZWJwYWNrUXVldWVzXShmblF1ZXVlKSkpO1xuXHRcdH0pO1xuXHRcdHJldHVybiBmbi5yID8gcHJvbWlzZSA6IGdldFJlc3VsdCgpO1xuXHR9XG5cdHZhciBkb25lID0gKGVycikgPT4gKChlcnIgPyByZWplY3QocHJvbWlzZVt3ZWJwYWNrRXJyb3JdID0gZXJyKSA6IG91dGVyUmVzb2x2ZShleHBvcnRzKSksIHJlc29sdmVRdWV1ZShxdWV1ZSkpXG5cdGJvZHkoaGFuZGxlLCBkb25lKTtcblx0cXVldWUgJiYgcXVldWUuZCA8IDAgJiYgKHF1ZXVlLmQgPSAwKTtcbn07IiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmYgPSB7fTtcbi8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbi8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5lID0gKGNodW5rSWQpID0+IHtcblx0cmV0dXJuIFByb21pc2UuYWxsKE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uZikucmVkdWNlKChwcm9taXNlcywga2V5KSA9PiB7XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5mW2tleV0oY2h1bmtJZCwgcHJvbWlzZXMpO1xuXHRcdHJldHVybiBwcm9taXNlcztcblx0fSwgW10pKTtcbn07IiwiLy8gVGhpcyBmdW5jdGlvbiBhbGxvdyB0byByZWZlcmVuY2UgYXN5bmMgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnUgPSAoY2h1bmtJZCkgPT4ge1xuXHQvLyByZXR1cm4gdXJsIGZvciBmaWxlbmFtZXMgYmFzZWQgb24gdGVtcGxhdGVcblx0cmV0dXJuIFwianMvXCIgKyBjaHVua0lkICsgXCIuanNcIjtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmhtZCA9IChtb2R1bGUpID0+IHtcblx0bW9kdWxlID0gT2JqZWN0LmNyZWF0ZShtb2R1bGUpO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsICdleHBvcnRzJywge1xuXHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0c2V0OiAoKSA9PiB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0VTIE1vZHVsZXMgbWF5IG5vdCBhc3NpZ24gbW9kdWxlLmV4cG9ydHMgb3IgZXhwb3J0cy4qLCBVc2UgRVNNIGV4cG9ydCBzeW50YXgsIGluc3RlYWQ6ICcgKyBtb2R1bGUuaWQpO1xuXHRcdH1cblx0fSk7XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCJ2YXIgaW5Qcm9ncmVzcyA9IHt9O1xudmFyIGRhdGFXZWJwYWNrUHJlZml4ID0gXCJsdGpzLWZvdXJ0aDpcIjtcbi8vIGxvYWRTY3JpcHQgZnVuY3Rpb24gdG8gbG9hZCBhIHNjcmlwdCB2aWEgc2NyaXB0IHRhZ1xuX193ZWJwYWNrX3JlcXVpcmVfXy5sID0gKHVybCwgZG9uZSwga2V5LCBjaHVua0lkKSA9PiB7XG5cdGlmKGluUHJvZ3Jlc3NbdXJsXSkgeyBpblByb2dyZXNzW3VybF0ucHVzaChkb25lKTsgcmV0dXJuOyB9XG5cdHZhciBzY3JpcHQsIG5lZWRBdHRhY2g7XG5cdGlmKGtleSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc2NyaXB0cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIHMgPSBzY3JpcHRzW2ldO1xuXHRcdFx0aWYocy5nZXRBdHRyaWJ1dGUoXCJzcmNcIikgPT0gdXJsIHx8IHMuZ2V0QXR0cmlidXRlKFwiZGF0YS13ZWJwYWNrXCIpID09IGRhdGFXZWJwYWNrUHJlZml4ICsga2V5KSB7IHNjcmlwdCA9IHM7IGJyZWFrOyB9XG5cdFx0fVxuXHR9XG5cdGlmKCFzY3JpcHQpIHtcblx0XHRuZWVkQXR0YWNoID0gdHJ1ZTtcblx0XHRzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblxuXHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04Jztcblx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuXHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuXHRcdH1cblx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwiZGF0YS13ZWJwYWNrXCIsIGRhdGFXZWJwYWNrUHJlZml4ICsga2V5KTtcblxuXHRcdHNjcmlwdC5zcmMgPSB1cmw7XG5cdH1cblx0aW5Qcm9ncmVzc1t1cmxdID0gW2RvbmVdO1xuXHR2YXIgb25TY3JpcHRDb21wbGV0ZSA9IChwcmV2LCBldmVudCkgPT4ge1xuXHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cblx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHR2YXIgZG9uZUZucyA9IGluUHJvZ3Jlc3NbdXJsXTtcblx0XHRkZWxldGUgaW5Qcm9ncmVzc1t1cmxdO1xuXHRcdHNjcmlwdC5wYXJlbnROb2RlICYmIHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG5cdFx0ZG9uZUZucyAmJiBkb25lRm5zLmZvckVhY2goKGZuKSA9PiAoZm4oZXZlbnQpKSk7XG5cdFx0aWYocHJldikgcmV0dXJuIHByZXYoZXZlbnQpO1xuXHR9XG5cdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgdW5kZWZpbmVkLCB7IHR5cGU6ICd0aW1lb3V0JywgdGFyZ2V0OiBzY3JpcHQgfSksIDEyMDAwMCk7XG5cdHNjcmlwdC5vbmVycm9yID0gb25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHNjcmlwdC5vbmVycm9yKTtcblx0c2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCBzY3JpcHQub25sb2FkKTtcblx0bmVlZEF0dGFjaCAmJiBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG59OyIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18udiA9IChleHBvcnRzLCB3YXNtTW9kdWxlSWQsIHdhc21Nb2R1bGVIYXNoLCBpbXBvcnRzT2JqKSA9PiB7XG5cblx0dmFyIHJlcSA9IGZldGNoKF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyB3YXNtTW9kdWxlSGFzaCArIFwiLm1vZHVsZS53YXNtXCIpO1xuXHR2YXIgZmFsbGJhY2sgPSAoKSA9PiAocmVxXG5cdFx0LnRoZW4oKHgpID0+ICh4LmFycmF5QnVmZmVyKCkpKVxuXHRcdC50aGVuKChieXRlcykgPT4gKFdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlKGJ5dGVzLCBpbXBvcnRzT2JqKSkpXG5cdFx0LnRoZW4oKHJlcykgPT4gKE9iamVjdC5hc3NpZ24oZXhwb3J0cywgcmVzLmluc3RhbmNlLmV4cG9ydHMpKSkpO1xuXHRyZXR1cm4gcmVxLnRoZW4oKHJlcykgPT4ge1xuXHRcdGlmICh0eXBlb2YgV2ViQXNzZW1ibHkuaW5zdGFudGlhdGVTdHJlYW1pbmcgPT09IFwiZnVuY3Rpb25cIikge1xuXG5cdFx0XHRyZXR1cm4gV2ViQXNzZW1ibHkuaW5zdGFudGlhdGVTdHJlYW1pbmcocmVzLCBpbXBvcnRzT2JqKVxuXHRcdFx0XHQudGhlbihcblx0XHRcdFx0XHQocmVzKSA9PiAoT2JqZWN0LmFzc2lnbihleHBvcnRzLCByZXMuaW5zdGFuY2UuZXhwb3J0cykpLFxuXHRcdFx0XHRcdChlKSA9PiB7XG5cdFx0XHRcdFx0XHRpZihyZXMuaGVhZGVycy5nZXQoXCJDb250ZW50LVR5cGVcIikgIT09IFwiYXBwbGljYXRpb24vd2FzbVwiKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUud2FybihcImBXZWJBc3NlbWJseS5pbnN0YW50aWF0ZVN0cmVhbWluZ2AgZmFpbGVkIGJlY2F1c2UgeW91ciBzZXJ2ZXIgZG9lcyBub3Qgc2VydmUgd2FzbSB3aXRoIGBhcHBsaWNhdGlvbi93YXNtYCBNSU1FIHR5cGUuIEZhbGxpbmcgYmFjayB0byBgV2ViQXNzZW1ibHkuaW5zdGFudGlhdGVgIHdoaWNoIGlzIHNsb3dlci4gT3JpZ2luYWwgZXJyb3I6XFxuXCIsIGUpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsbGJhY2soKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHRocm93IGU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsbGJhY2soKTtcblx0fSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdCAmJiBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gJ1NDUklQVCcpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICghc2NyaXB0VXJsIHx8ICEvXmh0dHAocz8pOi8udGVzdChzY3JpcHRVcmwpKSkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvXmJsb2I6LywgXCJcIikucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsICsgXCIuLi9cIjsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJzaGFwZXNcIjogMFxufTtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5mLmogPSAoY2h1bmtJZCwgcHJvbWlzZXMpID0+IHtcblx0XHQvLyBKU09OUCBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cdFx0dmFyIGluc3RhbGxlZENodW5rRGF0YSA9IF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpID8gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdIDogdW5kZWZpbmVkO1xuXHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgeyAvLyAwIG1lYW5zIFwiYWxyZWFkeSBpbnN0YWxsZWRcIi5cblxuXHRcdFx0Ly8gYSBQcm9taXNlIG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cblx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZih0cnVlKSB7IC8vIGFsbCBjaHVua3MgaGF2ZSBKU1xuXHRcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcblx0XHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IChpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XSkpO1xuXHRcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdID0gcHJvbWlzZSk7XG5cblx0XHRcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG5cdFx0XHRcdFx0dmFyIHVybCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIF9fd2VicGFja19yZXF1aXJlX18udShjaHVua0lkKTtcblx0XHRcdFx0XHQvLyBjcmVhdGUgZXJyb3IgYmVmb3JlIHN0YWNrIHVud291bmQgdG8gZ2V0IHVzZWZ1bCBzdGFja3RyYWNlIGxhdGVyXG5cdFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCk7XG5cdFx0XHRcdFx0dmFyIGxvYWRpbmdFbmRlZCA9IChldmVudCkgPT4ge1xuXHRcdFx0XHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkpIHtcblx0XHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuXHRcdFx0XHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcblx0XHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLm1lc3NhZ2UgPSAnTG9hZGluZyBjaHVuayAnICsgY2h1bmtJZCArICcgZmFpbGVkLlxcbignICsgZXJyb3JUeXBlICsgJzogJyArIHJlYWxTcmMgKyAnKSc7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IubmFtZSA9ICdDaHVua0xvYWRFcnJvcic7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcblx0XHRcdFx0XHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcblx0XHRcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGFbMV0oZXJyb3IpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmwodXJsLCBsb2FkaW5nRW5kZWQsIFwiY2h1bmstXCIgKyBjaHVua0lkLCBjaHVua0lkKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cbn07XG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2x0anNfZm91cnRoXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2x0anNfZm91cnRoXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9idWlsZF90aHJlZV9tb2R1bGVfanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9jb250cm9sc19PcmJpdENvbnRyb2xzX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc19saWwtZ3VpX2Rpc3RfbGlsLWd1aV9lc21fanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX2RpbWZvcmdlX3JhcGllcjNkX2R5bmFtaWNzX3JpZ2lkX2JvZHlfanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9nZW9tZXRyaWVzX0NvbnZleEdlb21ldHJ5X2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc19wZXJsaW5faW5kZXhfanNcIixcInNhbXBsZXNfY2hhcHRlcnNfY2hhcHRlci0xMl91dGlsX3N0YW5kYXJkLXNjZW5lLWVtcHR5X2pzXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTEyL3NoYXBlcy5qc1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
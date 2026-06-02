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

/***/ "./samples/chapters/chapter-12/colliders-properties.js"
/*!*************************************************************!*\
  !*** ./samples/chapters/chapter-12/colliders-properties.js ***!
  \*************************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_standard_scene_empty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/standard-scene-empty */ "./samples/chapters/chapter-12/util/standard-scene-empty.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _dimforge_rapier3d__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @dimforge/rapier3d */ "./node_modules/@dimforge/rapier3d/dynamics/rigid_body.js");
/* harmony import */ var _bootstrap_floor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../bootstrap/floor */ "./samples/bootstrap/floor.js");
/* harmony import */ var lil_gui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lil-gui */ "./node_modules/lil-gui/dist/lil-gui.esm.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_dimforge_rapier3d__WEBPACK_IMPORTED_MODULE_3__]);
var __webpack_async_dependencies_result__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
_dimforge_rapier3d__WEBPACK_IMPORTED_MODULE_3__ = __webpack_async_dependencies_result__[0];









__webpack_require__.e(/*! import() */ "vendors-node_modules_dimforge_rapier3d_rapier_js").then(__webpack_require__.bind(__webpack_require__, /*! @dimforge/rapier3d */ "./node_modules/@dimforge/rapier3d/rapier.js")).then((RAPIER) => {
  const gravity = { x: 0.0, y: -10.0, z: 0.0 }
  const world = new RAPIER.World(gravity)

  let currentRotation = 0
  let currentRotationDirection = 1
  const animate = (renderer, scene, camera) => {
    requestAnimationFrame(() => animate(renderer, scene, camera))
    renderer.render(scene, camera)
    const arena = scene.getObjectByName('arena')
    const arenaRigidBody = arena.userData.rigidBody

    // update the rotation of the rigidbody
    currentRotation += 0.005 * currentRotationDirection
    if (currentRotation > 0.6) currentRotationDirection = -1
    if (currentRotation < -0.6) currentRotationDirection = 1
    const q = new three__WEBPACK_IMPORTED_MODULE_2__.Quaternion().setFromEuler(new three__WEBPACK_IMPORTED_MODULE_2__.Euler(currentRotation, 0, 0))
    arenaRigidBody.setRotation(q)

    // update the rotation of the assigned group
    const position = arenaRigidBody.translation()
    const rotation = arenaRigidBody.rotation()
    arena.position.set(position.x, position.y, position.z)
    arena.rotation.setFromQuaternion(new three__WEBPACK_IMPORTED_MODULE_2__.Quaternion(rotation.x, rotation.y, rotation.z, rotation.w))

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

  const setupScene = (scene) => {
    const arena = createArena()
    const mainFloorRigidBodyDesc = new RAPIER.RigidBodyDesc(_dimforge_rapier3d__WEBPACK_IMPORTED_MODULE_3__.RigidBodyType.KinematicPositionBased).setTranslation(
      arena.position.x,
      arena.position.y,
      arena.position.z
    )

    const arenaRigidBody = world.createRigidBody(mainFloorRigidBodyDesc)

    arena.userData.rigidBody = arenaRigidBody
    arena.children.forEach((floor) => rapierFloor(floor, arenaRigidBody))
    scene.add(arena)
  }

  const addRapierCube = (group, friction, restitution) => {
    const cubeMesh = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(
      new three__WEBPACK_IMPORTED_MODULE_2__.BoxGeometry(0.4, 0.4, 0.4),
      new three__WEBPACK_IMPORTED_MODULE_2__.MeshStandardMaterial({ color: new three__WEBPACK_IMPORTED_MODULE_2__.Color(Math.random(), 0.4, 0.1) })
    )
    cubeMesh.name = 'sample'
    cubeMesh.position.set(0, 4, 0)
    cubeMesh.castShadow = true

    const rigidBodyDesc = new RAPIER.RigidBodyDesc(_dimforge_rapier3d__WEBPACK_IMPORTED_MODULE_3__.RigidBodyType.Dynamic)
      .setTranslation(0.0, 4, 0)
      .setCanSleep(false)
      .setCcdEnabled(false)
    const rigidBody = world.createRigidBody(rigidBodyDesc)

    const rigidBodyColliderDesc = RAPIER.ColliderDesc.cuboid(0.2, 0.2, 0.2)
    const rigidBodyCollider = world.createCollider(rigidBodyColliderDesc, rigidBody)

    console.log(restitution)
    console.log(friction)

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
    sphereMesh.name = 'sample'
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

  const rapierFloor = (mesh, arenaRigidBody) => {
    const floorPosition = mesh.position

    const geometryParameters = mesh.geometry.parameters
    const floorColliderDesc = RAPIER.ColliderDesc.cuboid(
      geometryParameters.width / 2,
      geometryParameters.height / 2,
      geometryParameters.depth / 2
    ).setTranslation(floorPosition.x, floorPosition.y, floorPosition.z)

    const floorCollider = world.createCollider(floorColliderDesc, arenaRigidBody)
    mesh.userData.rigidBody = arenaRigidBody
    mesh.userData.collider = floorCollider
  }

  const createArena = () => {
    const textureLoader = new three__WEBPACK_IMPORTED_MODULE_2__.TextureLoader()
    const ground_material = new three__WEBPACK_IMPORTED_MODULE_2__.MeshStandardMaterial({
      map: textureLoader.load('/assets/textures/wood/floor-parquet-pattern-172292.jpg')
    })

    const arena = new three__WEBPACK_IMPORTED_MODULE_2__.Group()
    arena.name = 'arena'
    const ground = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.BoxGeometry(6, 0.2, 10), ground_material)
    ground.castShadow = true
    ground.receiveShadow = true
    arena.add(ground)

    const borderLeft = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.BoxGeometry(0.2, 2.3, 10), ground_material)
    borderLeft.position.x = -3.1
    borderLeft.position.y = 0.2
    borderLeft.castShadow = true
    borderLeft.receiveShadow = true
    arena.add(borderLeft)

    const borderRight = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.BoxGeometry(0.2, 2.3, 10), ground_material)
    borderRight.position.x = 3.1
    borderRight.position.y = 0.2
    borderRight.castShadow = true
    borderRight.receiveShadow = true
    arena.add(borderRight)

    const borderBottom = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.BoxGeometry(6.4, 2.3, 0.2), ground_material)
    borderBottom.position.z = 5
    borderBottom.position.y = 0.2
    borderBottom.castShadow = true
    borderBottom.receiveShadow = true
    arena.add(borderBottom)

    const borderTop = new three__WEBPACK_IMPORTED_MODULE_2__.Mesh(new three__WEBPACK_IMPORTED_MODULE_2__.BoxGeometry(6.4, 2.3, 0.2), ground_material)
    borderTop.position.z = -5
    borderTop.position.y = 0.22
    borderTop.castShadow = true
    borderTop.receiveShadow = true
    arena.add(borderTop)

    return arena
  }

  ;(0,_util_standard_scene_empty__WEBPACK_IMPORTED_MODULE_0__.bootstrapMeshScene)({
    initializeScene: setupScene,
    addControls: (camera, renderer, scene, gui) => {
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
/******/ 			"colliders-properties": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","vendors-node_modules_dimforge_rapier3d_dynamics_rigid_body_js","samples_chapters_chapter-12_util_standard-scene-empty_js"], () => (__webpack_require__("./samples/chapters/chapter-12/colliders-properties.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQSw0Rzs7Ozs7VUVyRkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2x0anMtZm91cnRoLy4vc2FtcGxlcy9ib290c3RyYXAvZmxvb3IuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItMTIvY29sbGlkZXJzLXByb3BlcnRpZXMuanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2FzeW5jIG1vZHVsZSIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvZW5zdXJlIGNodW5rIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9nZXQgamF2YXNjcmlwdCBjaHVuayBmaWxlbmFtZSIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9oYXJtb255IG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvbG9hZCBzY3JpcHQiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvd2FzbSBsb2FkaW5nIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSdcblxuZXhwb3J0IGNvbnN0IGZvcmV2ZXJQbGFuZSA9IChzY2VuZSkgPT4ge1xuICBjb25zdCBnZW8gPSBuZXcgVEhSRUUuUGxhbmVCdWZmZXJHZW9tZXRyeSgxMDAwMCwgMTAwMDApXG4gIGNvbnN0IG1hdCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHtcbiAgICBjb2xvcjogMHhmZmZmZmZcbiAgfSlcbiAgY29uc3QgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlbywgbWF0KVxuICBtZXNoLnBvc2l0aW9uLnNldCgwLCAtMiwgMClcbiAgbWVzaC5yb3RhdGlvbi5zZXQoTWF0aC5QSSAvIC0yLCAwLCAwKVxuICBtZXNoLnJlY2VpdmVTaGFkb3cgPSB0cnVlXG4gIG1lc2gubmFtZSA9ICdmb3JldmVyLWZsb29yJ1xuICBzY2VuZS5hZGQobWVzaClcblxuICByZXR1cm4gbWVzaFxufVxuXG5leHBvcnQgY29uc3QgZmxvYXRpbmdGbG9vciA9IChzY2VuZSwgc2l6ZSkgPT4ge1xuICBjb25zdCBzID0gc2l6ZSA/IHNpemUgOiA2XG4gIGNvbnN0IGdlbyA9IG5ldyBUSFJFRS5Cb3hCdWZmZXJHZW9tZXRyeShzLCAwLjI1LCBzLCAxMCwgMTAsIDEwKVxuICBjb25zdCBtYXQgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoe1xuICAgIGNvbG9yOiAweGRkZGRkZFxuICB9KVxuICBjb25zdCBtZXNoID0gbmV3IFRIUkVFLk1lc2goZ2VvLCBtYXQpXG4gIG1lc2gucG9zaXRpb24uc2V0KDAsIC0yLCAtMSlcbiAgbWVzaC5yZWNlaXZlU2hhZG93ID0gdHJ1ZVxuICBtZXNoLm5hbWUgPSAnZmxvYXRpbmctZmxvb3InXG4gIHNjZW5lLmFkZChtZXNoKVxuXG4gIHJldHVybiBtZXNoXG59XG4iLCJpbXBvcnQgeyBib290c3RyYXBNZXNoU2NlbmUgfSBmcm9tICcuL3V0aWwvc3RhbmRhcmQtc2NlbmUtZW1wdHknXG5pbXBvcnQgeyBPcmJpdENvbnRyb2xzIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2NvbnRyb2xzL09yYml0Q29udHJvbHMnXG5cbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuaW1wb3J0IHsgUmlnaWRCb2R5RGVzYywgUmlnaWRCb2R5VHlwZSB9IGZyb20gJ0BkaW1mb3JnZS9yYXBpZXIzZCdcbmltcG9ydCB7IGZsb2F0aW5nRmxvb3IsIGZvcmV2ZXJQbGFuZSB9IGZyb20gJy4uLy4uL2Jvb3RzdHJhcC9mbG9vcidcbmltcG9ydCB7IEdyb3VwLCBRdWF0ZXJuaW9uIH0gZnJvbSAndGhyZWUnXG5pbXBvcnQgR1VJIGZyb20gJ2xpbC1ndWknXG5cbmltcG9ydCgnQGRpbWZvcmdlL3JhcGllcjNkJykudGhlbigoUkFQSUVSKSA9PiB7XG4gIGNvbnN0IGdyYXZpdHkgPSB7IHg6IDAuMCwgeTogLTEwLjAsIHo6IDAuMCB9XG4gIGNvbnN0IHdvcmxkID0gbmV3IFJBUElFUi5Xb3JsZChncmF2aXR5KVxuXG4gIGxldCBjdXJyZW50Um90YXRpb24gPSAwXG4gIGxldCBjdXJyZW50Um90YXRpb25EaXJlY3Rpb24gPSAxXG4gIGNvbnN0IGFuaW1hdGUgPSAocmVuZGVyZXIsIHNjZW5lLCBjYW1lcmEpID0+IHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gYW5pbWF0ZShyZW5kZXJlciwgc2NlbmUsIGNhbWVyYSkpXG4gICAgcmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEpXG4gICAgY29uc3QgYXJlbmEgPSBzY2VuZS5nZXRPYmplY3RCeU5hbWUoJ2FyZW5hJylcbiAgICBjb25zdCBhcmVuYVJpZ2lkQm9keSA9IGFyZW5hLnVzZXJEYXRhLnJpZ2lkQm9keVxuXG4gICAgLy8gdXBkYXRlIHRoZSByb3RhdGlvbiBvZiB0aGUgcmlnaWRib2R5XG4gICAgY3VycmVudFJvdGF0aW9uICs9IDAuMDA1ICogY3VycmVudFJvdGF0aW9uRGlyZWN0aW9uXG4gICAgaWYgKGN1cnJlbnRSb3RhdGlvbiA+IDAuNikgY3VycmVudFJvdGF0aW9uRGlyZWN0aW9uID0gLTFcbiAgICBpZiAoY3VycmVudFJvdGF0aW9uIDwgLTAuNikgY3VycmVudFJvdGF0aW9uRGlyZWN0aW9uID0gMVxuICAgIGNvbnN0IHEgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpLnNldEZyb21FdWxlcihuZXcgVEhSRUUuRXVsZXIoY3VycmVudFJvdGF0aW9uLCAwLCAwKSlcbiAgICBhcmVuYVJpZ2lkQm9keS5zZXRSb3RhdGlvbihxKVxuXG4gICAgLy8gdXBkYXRlIHRoZSByb3RhdGlvbiBvZiB0aGUgYXNzaWduZWQgZ3JvdXBcbiAgICBjb25zdCBwb3NpdGlvbiA9IGFyZW5hUmlnaWRCb2R5LnRyYW5zbGF0aW9uKClcbiAgICBjb25zdCByb3RhdGlvbiA9IGFyZW5hUmlnaWRCb2R5LnJvdGF0aW9uKClcbiAgICBhcmVuYS5wb3NpdGlvbi5zZXQocG9zaXRpb24ueCwgcG9zaXRpb24ueSwgcG9zaXRpb24ueilcbiAgICBhcmVuYS5yb3RhdGlvbi5zZXRGcm9tUXVhdGVybmlvbihuZXcgVEhSRUUuUXVhdGVybmlvbihyb3RhdGlvbi54LCByb3RhdGlvbi55LCByb3RhdGlvbi56LCByb3RhdGlvbi53KSlcblxuICAgIC8vIGdldCB0aGUgZ3JvdXAgY29udGFpbmluZyBhbGwgdGhlIG9iamVjdHNcbiAgICBzY2VuZS5nZXRPYmplY3RCeU5hbWUoJ2FkZGVkTWVzaGVzJykuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkUmlnaWRCb2R5ID0gY2hpbGQudXNlckRhdGEucmlnaWRCb2R5XG4gICAgICBjb25zdCBwb3NpdGlvbiA9IGNoaWxkUmlnaWRCb2R5LnRyYW5zbGF0aW9uKClcbiAgICAgIGNvbnN0IHJvdGF0aW9uID0gY2hpbGRSaWdpZEJvZHkucm90YXRpb24oKVxuXG4gICAgICBjaGlsZC5wb3NpdGlvbi5zZXQocG9zaXRpb24ueCwgcG9zaXRpb24ueSwgcG9zaXRpb24ueilcbiAgICAgIGNoaWxkLnJvdGF0aW9uLnNldEZyb21RdWF0ZXJuaW9uKG5ldyBUSFJFRS5RdWF0ZXJuaW9uKHJvdGF0aW9uLngsIHJvdGF0aW9uLnksIHJvdGF0aW9uLnosIHJvdGF0aW9uLncpKVxuICAgIH0pXG5cbiAgICB3b3JsZC5zdGVwKClcbiAgfVxuXG4gIGNvbnN0IHNldHVwU2NlbmUgPSAoc2NlbmUpID0+IHtcbiAgICBjb25zdCBhcmVuYSA9IGNyZWF0ZUFyZW5hKClcbiAgICBjb25zdCBtYWluRmxvb3JSaWdpZEJvZHlEZXNjID0gbmV3IFJBUElFUi5SaWdpZEJvZHlEZXNjKFJpZ2lkQm9keVR5cGUuS2luZW1hdGljUG9zaXRpb25CYXNlZCkuc2V0VHJhbnNsYXRpb24oXG4gICAgICBhcmVuYS5wb3NpdGlvbi54LFxuICAgICAgYXJlbmEucG9zaXRpb24ueSxcbiAgICAgIGFyZW5hLnBvc2l0aW9uLnpcbiAgICApXG5cbiAgICBjb25zdCBhcmVuYVJpZ2lkQm9keSA9IHdvcmxkLmNyZWF0ZVJpZ2lkQm9keShtYWluRmxvb3JSaWdpZEJvZHlEZXNjKVxuXG4gICAgYXJlbmEudXNlckRhdGEucmlnaWRCb2R5ID0gYXJlbmFSaWdpZEJvZHlcbiAgICBhcmVuYS5jaGlsZHJlbi5mb3JFYWNoKChmbG9vcikgPT4gcmFwaWVyRmxvb3IoZmxvb3IsIGFyZW5hUmlnaWRCb2R5KSlcbiAgICBzY2VuZS5hZGQoYXJlbmEpXG4gIH1cblxuICBjb25zdCBhZGRSYXBpZXJDdWJlID0gKGdyb3VwLCBmcmljdGlvbiwgcmVzdGl0dXRpb24pID0+IHtcbiAgICBjb25zdCBjdWJlTWVzaCA9IG5ldyBUSFJFRS5NZXNoKFxuICAgICAgbmV3IFRIUkVFLkJveEdlb21ldHJ5KDAuNCwgMC40LCAwLjQpLFxuICAgICAgbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHsgY29sb3I6IG5ldyBUSFJFRS5Db2xvcihNYXRoLnJhbmRvbSgpLCAwLjQsIDAuMSkgfSlcbiAgICApXG4gICAgY3ViZU1lc2gubmFtZSA9ICdzYW1wbGUnXG4gICAgY3ViZU1lc2gucG9zaXRpb24uc2V0KDAsIDQsIDApXG4gICAgY3ViZU1lc2guY2FzdFNoYWRvdyA9IHRydWVcblxuICAgIGNvbnN0IHJpZ2lkQm9keURlc2MgPSBuZXcgUkFQSUVSLlJpZ2lkQm9keURlc2MoUmlnaWRCb2R5VHlwZS5EeW5hbWljKVxuICAgICAgLnNldFRyYW5zbGF0aW9uKDAuMCwgNCwgMClcbiAgICAgIC5zZXRDYW5TbGVlcChmYWxzZSlcbiAgICAgIC5zZXRDY2RFbmFibGVkKGZhbHNlKVxuICAgIGNvbnN0IHJpZ2lkQm9keSA9IHdvcmxkLmNyZWF0ZVJpZ2lkQm9keShyaWdpZEJvZHlEZXNjKVxuXG4gICAgY29uc3QgcmlnaWRCb2R5Q29sbGlkZXJEZXNjID0gUkFQSUVSLkNvbGxpZGVyRGVzYy5jdWJvaWQoMC4yLCAwLjIsIDAuMilcbiAgICBjb25zdCByaWdpZEJvZHlDb2xsaWRlciA9IHdvcmxkLmNyZWF0ZUNvbGxpZGVyKHJpZ2lkQm9keUNvbGxpZGVyRGVzYywgcmlnaWRCb2R5KVxuXG4gICAgY29uc29sZS5sb2cocmVzdGl0dXRpb24pXG4gICAgY29uc29sZS5sb2coZnJpY3Rpb24pXG5cbiAgICByaWdpZEJvZHlDb2xsaWRlci5zZXRSZXN0aXR1dGlvbihyZXN0aXR1dGlvbilcbiAgICByaWdpZEJvZHlDb2xsaWRlci5zZXRGcmljdGlvbihmcmljdGlvbilcblxuICAgIGN1YmVNZXNoLnVzZXJEYXRhLnJpZ2lkQm9keSA9IHJpZ2lkQm9keVxuICAgIGN1YmVNZXNoLnVzZXJEYXRhLmNvbGxpZGVyID0gcmlnaWRCb2R5Q29sbGlkZXJcblxuICAgIGdyb3VwLmFkZChjdWJlTWVzaClcbiAgfVxuXG4gIGNvbnN0IGFkZFJhcGllclNwaGVyZSA9IChncm91cCwgZnJpY3Rpb24sIHJlc3RpdHV0aW9uKSA9PiB7XG4gICAgY29uc3Qgc3BoZXJlTWVzaCA9IG5ldyBUSFJFRS5NZXNoKFxuICAgICAgbmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KDAuMiwgNiwgNiksXG4gICAgICBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoeyBjb2xvcjogbmV3IFRIUkVFLkNvbG9yKDAuNCwgMC40LCBNYXRoLnJhbmRvbSgpKSB9KVxuICAgIClcbiAgICBzcGhlcmVNZXNoLmNhc3RTaGFkb3cgPSB0cnVlXG4gICAgc3BoZXJlTWVzaC5uYW1lID0gJ3NhbXBsZSdcbiAgICBzcGhlcmVNZXNoLnBvc2l0aW9uLnNldCgwLCA0LCAwKVxuXG4gICAgY29uc3QgcmlnaWRCb2R5RGVzYyA9IG5ldyBSQVBJRVIuUmlnaWRCb2R5RGVzYyhSaWdpZEJvZHlUeXBlLkR5bmFtaWMpXG4gICAgICAuc2V0VHJhbnNsYXRpb24oMC4wLCA0LCAwKVxuICAgICAgLnNldENhblNsZWVwKGZhbHNlKVxuICAgICAgLnNldENjZEVuYWJsZWQoZmFsc2UpXG4gICAgY29uc3QgcmlnaWRCb2R5ID0gd29ybGQuY3JlYXRlUmlnaWRCb2R5KHJpZ2lkQm9keURlc2MpXG5cbiAgICBjb25zdCByaWdpZEJvZHlDb2xsaWRlckRlc2MgPSBSQVBJRVIuQ29sbGlkZXJEZXNjLmJhbGwoMC4yKVxuICAgIGNvbnN0IHJpZ2lkQm9keUNvbGxpZGVyID0gd29ybGQuY3JlYXRlQ29sbGlkZXIocmlnaWRCb2R5Q29sbGlkZXJEZXNjLCByaWdpZEJvZHkpXG4gICAgcmlnaWRCb2R5Q29sbGlkZXIuc2V0UmVzdGl0dXRpb24ocmVzdGl0dXRpb24pXG4gICAgcmlnaWRCb2R5Q29sbGlkZXIuc2V0RnJpY3Rpb24oZnJpY3Rpb24pXG5cbiAgICBzcGhlcmVNZXNoLnVzZXJEYXRhLnJpZ2lkQm9keSA9IHJpZ2lkQm9keVxuICAgIHNwaGVyZU1lc2gudXNlckRhdGEuY29sbGlkZXIgPSByaWdpZEJvZHlDb2xsaWRlclxuXG4gICAgZ3JvdXAuYWRkKHNwaGVyZU1lc2gpXG4gIH1cblxuICBjb25zdCByYXBpZXJGbG9vciA9IChtZXNoLCBhcmVuYVJpZ2lkQm9keSkgPT4ge1xuICAgIGNvbnN0IGZsb29yUG9zaXRpb24gPSBtZXNoLnBvc2l0aW9uXG5cbiAgICBjb25zdCBnZW9tZXRyeVBhcmFtZXRlcnMgPSBtZXNoLmdlb21ldHJ5LnBhcmFtZXRlcnNcbiAgICBjb25zdCBmbG9vckNvbGxpZGVyRGVzYyA9IFJBUElFUi5Db2xsaWRlckRlc2MuY3Vib2lkKFxuICAgICAgZ2VvbWV0cnlQYXJhbWV0ZXJzLndpZHRoIC8gMixcbiAgICAgIGdlb21ldHJ5UGFyYW1ldGVycy5oZWlnaHQgLyAyLFxuICAgICAgZ2VvbWV0cnlQYXJhbWV0ZXJzLmRlcHRoIC8gMlxuICAgICkuc2V0VHJhbnNsYXRpb24oZmxvb3JQb3NpdGlvbi54LCBmbG9vclBvc2l0aW9uLnksIGZsb29yUG9zaXRpb24ueilcblxuICAgIGNvbnN0IGZsb29yQ29sbGlkZXIgPSB3b3JsZC5jcmVhdGVDb2xsaWRlcihmbG9vckNvbGxpZGVyRGVzYywgYXJlbmFSaWdpZEJvZHkpXG4gICAgbWVzaC51c2VyRGF0YS5yaWdpZEJvZHkgPSBhcmVuYVJpZ2lkQm9keVxuICAgIG1lc2gudXNlckRhdGEuY29sbGlkZXIgPSBmbG9vckNvbGxpZGVyXG4gIH1cblxuICBjb25zdCBjcmVhdGVBcmVuYSA9ICgpID0+IHtcbiAgICBjb25zdCB0ZXh0dXJlTG9hZGVyID0gbmV3IFRIUkVFLlRleHR1cmVMb2FkZXIoKVxuICAgIGNvbnN0IGdyb3VuZF9tYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7XG4gICAgICBtYXA6IHRleHR1cmVMb2FkZXIubG9hZCgnL2Fzc2V0cy90ZXh0dXJlcy93b29kL2Zsb29yLXBhcnF1ZXQtcGF0dGVybi0xNzIyOTIuanBnJylcbiAgICB9KVxuXG4gICAgY29uc3QgYXJlbmEgPSBuZXcgVEhSRUUuR3JvdXAoKVxuICAgIGFyZW5hLm5hbWUgPSAnYXJlbmEnXG4gICAgY29uc3QgZ3JvdW5kID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLkJveEdlb21ldHJ5KDYsIDAuMiwgMTApLCBncm91bmRfbWF0ZXJpYWwpXG4gICAgZ3JvdW5kLmNhc3RTaGFkb3cgPSB0cnVlXG4gICAgZ3JvdW5kLnJlY2VpdmVTaGFkb3cgPSB0cnVlXG4gICAgYXJlbmEuYWRkKGdyb3VuZClcblxuICAgIGNvbnN0IGJvcmRlckxlZnQgPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuQm94R2VvbWV0cnkoMC4yLCAyLjMsIDEwKSwgZ3JvdW5kX21hdGVyaWFsKVxuICAgIGJvcmRlckxlZnQucG9zaXRpb24ueCA9IC0zLjFcbiAgICBib3JkZXJMZWZ0LnBvc2l0aW9uLnkgPSAwLjJcbiAgICBib3JkZXJMZWZ0LmNhc3RTaGFkb3cgPSB0cnVlXG4gICAgYm9yZGVyTGVmdC5yZWNlaXZlU2hhZG93ID0gdHJ1ZVxuICAgIGFyZW5hLmFkZChib3JkZXJMZWZ0KVxuXG4gICAgY29uc3QgYm9yZGVyUmlnaHQgPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuQm94R2VvbWV0cnkoMC4yLCAyLjMsIDEwKSwgZ3JvdW5kX21hdGVyaWFsKVxuICAgIGJvcmRlclJpZ2h0LnBvc2l0aW9uLnggPSAzLjFcbiAgICBib3JkZXJSaWdodC5wb3NpdGlvbi55ID0gMC4yXG4gICAgYm9yZGVyUmlnaHQuY2FzdFNoYWRvdyA9IHRydWVcbiAgICBib3JkZXJSaWdodC5yZWNlaXZlU2hhZG93ID0gdHJ1ZVxuICAgIGFyZW5hLmFkZChib3JkZXJSaWdodClcblxuICAgIGNvbnN0IGJvcmRlckJvdHRvbSA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSg2LjQsIDIuMywgMC4yKSwgZ3JvdW5kX21hdGVyaWFsKVxuICAgIGJvcmRlckJvdHRvbS5wb3NpdGlvbi56ID0gNVxuICAgIGJvcmRlckJvdHRvbS5wb3NpdGlvbi55ID0gMC4yXG4gICAgYm9yZGVyQm90dG9tLmNhc3RTaGFkb3cgPSB0cnVlXG4gICAgYm9yZGVyQm90dG9tLnJlY2VpdmVTaGFkb3cgPSB0cnVlXG4gICAgYXJlbmEuYWRkKGJvcmRlckJvdHRvbSlcblxuICAgIGNvbnN0IGJvcmRlclRvcCA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSg2LjQsIDIuMywgMC4yKSwgZ3JvdW5kX21hdGVyaWFsKVxuICAgIGJvcmRlclRvcC5wb3NpdGlvbi56ID0gLTVcbiAgICBib3JkZXJUb3AucG9zaXRpb24ueSA9IDAuMjJcbiAgICBib3JkZXJUb3AuY2FzdFNoYWRvdyA9IHRydWVcbiAgICBib3JkZXJUb3AucmVjZWl2ZVNoYWRvdyA9IHRydWVcbiAgICBhcmVuYS5hZGQoYm9yZGVyVG9wKVxuXG4gICAgcmV0dXJuIGFyZW5hXG4gIH1cblxuICBib290c3RyYXBNZXNoU2NlbmUoe1xuICAgIGluaXRpYWxpemVTY2VuZTogc2V0dXBTY2VuZSxcbiAgICBhZGRDb250cm9sczogKGNhbWVyYSwgcmVuZGVyZXIsIHNjZW5lLCBndWkpID0+IHtcbiAgICAgIGNvbnN0IGdyb3VwID0gbmV3IFRIUkVFLkdyb3VwKClcbiAgICAgIGdyb3VwLm5hbWUgPSAnYWRkZWRNZXNoZXMnXG4gICAgICBzY2VuZS5hZGQoZ3JvdXApXG5cbiAgICAgIGNhbWVyYS5wb3NpdGlvbi5zZXQoLTAuNSwgNiwgLTEwKVxuICAgICAgY29uc3QgZ3Jhdml0eUZvbGRlciA9IGd1aS5hZGRGb2xkZXIoJ0dyYXZpdHknKVxuICAgICAgZ3Jhdml0eUZvbGRlci5hZGQoZ3Jhdml0eSwgJ3gnLCAtMTAsIDEwLCAwLjEpXG4gICAgICBncmF2aXR5Rm9sZGVyLmFkZChncmF2aXR5LCAneScsIC0xMCwgMTAsIDAuMSlcbiAgICAgIGdyYXZpdHlGb2xkZXIuYWRkKGdyYXZpdHksICd6JywgLTEwLCAxMCwgMC4xKVxuXG4gICAgICBjb25zdCBzcGhlcmVDb250cm9scyA9IHtcbiAgICAgICAgZnJpY3Rpb246IDAuNSxcbiAgICAgICAgcmVzdGl0dXRpb246IDAuNSxcbiAgICAgICAgYWRkU3BoZXJlOiAoKSA9PiB7XG4gICAgICAgICAgYWRkUmFwaWVyU3BoZXJlKGdyb3VwLCBzcGhlcmVDb250cm9scy5mcmljdGlvbiwgc3BoZXJlQ29udHJvbHMucmVzdGl0dXRpb24pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0IHNwaGVyZUZvbGRlciA9IGd1aS5hZGRGb2xkZXIoJ1NwaGVyZSBTZXR0aW5ncycpXG4gICAgICBzcGhlcmVGb2xkZXIuYWRkKHNwaGVyZUNvbnRyb2xzLCAnZnJpY3Rpb24nLCAwLCA1LCAwLjAxKVxuICAgICAgc3BoZXJlRm9sZGVyLmFkZChzcGhlcmVDb250cm9scywgJ3Jlc3RpdHV0aW9uJywgMCwgNSwgMC4wMSlcbiAgICAgIHNwaGVyZUZvbGRlci5hZGQoc3BoZXJlQ29udHJvbHMsICdhZGRTcGhlcmUnKVxuXG4gICAgICBjb25zdCBjdWJlQ29udHJvbHMgPSB7XG4gICAgICAgIGZyaWN0aW9uOiAwLjUsXG4gICAgICAgIHJlc3RpdHV0aW9uOiAwLjUsXG4gICAgICAgIGFkZEN1YmU6ICgpID0+IHtcbiAgICAgICAgICBhZGRSYXBpZXJDdWJlKGdyb3VwLCBjdWJlQ29udHJvbHMuZnJpY3Rpb24sIGN1YmVDb250cm9scy5yZXN0aXR1dGlvbilcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgY3ViZUZvbGRlciA9IGd1aS5hZGRGb2xkZXIoJ0N1YmUgU2V0dGluZ3MnKVxuICAgICAgY3ViZUZvbGRlci5hZGQoY3ViZUNvbnRyb2xzLCAnZnJpY3Rpb24nLCAwLCA1LCAwLjAxKVxuICAgICAgY3ViZUZvbGRlci5hZGQoY3ViZUNvbnRyb2xzLCAncmVzdGl0dXRpb24nLCAwLCA1LCAwLjAxKVxuICAgICAgY3ViZUZvbGRlci5hZGQoY3ViZUNvbnRyb2xzLCAnYWRkQ3ViZScpXG5cbiAgICAgIG5ldyBPcmJpdENvbnRyb2xzKGNhbWVyYSwgcmVuZGVyZXIuZG9tRWxlbWVudClcbiAgICB9LFxuICAgIGFuaW1hdGU6IChyZW5kZXJlciwgc2NlbmUsIGNhbWVyYSkgPT4ge1xuICAgICAgYW5pbWF0ZShyZW5kZXJlciwgc2NlbmUsIGNhbWVyYSlcbiAgICB9XG4gIH0pLnRoZW4oKVxufSlcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBoYXNTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCI7XG52YXIgd2VicGFja1F1ZXVlcyA9IGhhc1N5bWJvbCA/IFN5bWJvbChcIndlYnBhY2sgcXVldWVzXCIpIDogXCJfX3dlYnBhY2tfcXVldWVzX19cIjtcbnZhciB3ZWJwYWNrRXhwb3J0cyA9IGhhc1N5bWJvbCA/IFN5bWJvbChcIndlYnBhY2sgZXhwb3J0c1wiKSA6IFwiX193ZWJwYWNrX2V4cG9ydHNfX1wiO1xudmFyIHdlYnBhY2tFcnJvciA9IGhhc1N5bWJvbCA/IFN5bWJvbChcIndlYnBhY2sgZXJyb3JcIikgOiBcIl9fd2VicGFja19lcnJvcl9fXCI7XG5cbnZhciByZXNvbHZlUXVldWUgPSAocXVldWUpID0+IHtcblx0aWYocXVldWUgJiYgcXVldWUuZCA8IDEpIHtcblx0XHRxdWV1ZS5kID0gMTtcblx0XHRxdWV1ZS5mb3JFYWNoKChmbikgPT4gKGZuLnItLSkpO1xuXHRcdHF1ZXVlLmZvckVhY2goKGZuKSA9PiAoZm4uci0tID8gZm4ucisrIDogZm4oKSkpO1xuXHR9XG59XG52YXIgd3JhcERlcHMgPSAoZGVwcykgPT4gKGRlcHMubWFwKChkZXApID0+IHtcblx0aWYoZGVwICE9PSBudWxsICYmIHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpIHtcblxuXHRcdGlmKGRlcFt3ZWJwYWNrUXVldWVzXSkgcmV0dXJuIGRlcDtcblx0XHRpZihkZXAudGhlbikge1xuXHRcdFx0dmFyIHF1ZXVlID0gW107XG5cdFx0XHRxdWV1ZS5kID0gMDtcblx0XHRcdGRlcC50aGVuKChyKSA9PiB7XG5cdFx0XHRcdG9ialt3ZWJwYWNrRXhwb3J0c10gPSByO1xuXHRcdFx0XHRyZXNvbHZlUXVldWUocXVldWUpO1xuXHRcdFx0fSwgKGUpID0+IHtcblx0XHRcdFx0b2JqW3dlYnBhY2tFcnJvcl0gPSBlO1xuXHRcdFx0XHRyZXNvbHZlUXVldWUocXVldWUpO1xuXHRcdFx0fSk7XG5cdFx0XHR2YXIgb2JqID0ge307XG5cblx0XHRcdG9ialt3ZWJwYWNrUXVldWVzXSA9IChmbikgPT4gKGZuKHF1ZXVlKSk7XG5cdFx0XHRyZXR1cm4gb2JqO1xuXHRcdH1cblx0fVxuXHR2YXIgcmV0ID0ge307XG5cdHJldFt3ZWJwYWNrUXVldWVzXSA9IHggPT4ge307XG5cdHJldFt3ZWJwYWNrRXhwb3J0c10gPSBkZXA7XG5cdHJldHVybiByZXQ7XG59KSk7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLmEgPSAobW9kdWxlLCBib2R5LCBoYXNBd2FpdCkgPT4ge1xuXHR2YXIgcXVldWU7XG5cdGhhc0F3YWl0ICYmICgocXVldWUgPSBbXSkuZCA9IC0xKTtcblx0dmFyIGRlcFF1ZXVlcyA9IG5ldyBTZXQoKTtcblx0dmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cztcblx0dmFyIGN1cnJlbnREZXBzO1xuXHR2YXIgb3V0ZXJSZXNvbHZlO1xuXHR2YXIgcmVqZWN0O1xuXHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWopID0+IHtcblx0XHRyZWplY3QgPSByZWo7XG5cdFx0b3V0ZXJSZXNvbHZlID0gcmVzb2x2ZTtcblx0fSk7XG5cdHByb21pc2Vbd2VicGFja0V4cG9ydHNdID0gZXhwb3J0cztcblx0cHJvbWlzZVt3ZWJwYWNrUXVldWVzXSA9IChmbikgPT4gKHF1ZXVlICYmIGZuKHF1ZXVlKSwgZGVwUXVldWVzLmZvckVhY2goZm4pLCBwcm9taXNlW1wiY2F0Y2hcIl0oeCA9PiB7fSkpO1xuXHRtb2R1bGUuZXhwb3J0cyA9IHByb21pc2U7XG5cdHZhciBoYW5kbGUgPSAoZGVwcykgPT4ge1xuXHRcdGN1cnJlbnREZXBzID0gd3JhcERlcHMoZGVwcyk7XG5cdFx0dmFyIGZuO1xuXHRcdHZhciBnZXRSZXN1bHQgPSAoKSA9PiAoY3VycmVudERlcHMubWFwKChkKSA9PiB7XG5cblx0XHRcdGlmKGRbd2VicGFja0Vycm9yXSkgdGhyb3cgZFt3ZWJwYWNrRXJyb3JdO1xuXHRcdFx0cmV0dXJuIGRbd2VicGFja0V4cG9ydHNdO1xuXHRcdH0pKVxuXHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcblx0XHRcdGZuID0gKCkgPT4gKHJlc29sdmUoZ2V0UmVzdWx0KSk7XG5cdFx0XHRmbi5yID0gMDtcblx0XHRcdHZhciBmblF1ZXVlID0gKHEpID0+IChxICE9PSBxdWV1ZSAmJiAhZGVwUXVldWVzLmhhcyhxKSAmJiAoZGVwUXVldWVzLmFkZChxKSwgcSAmJiAhcS5kICYmIChmbi5yKyssIHEucHVzaChmbikpKSk7XG5cdFx0XHRjdXJyZW50RGVwcy5tYXAoKGRlcCkgPT4gKGRlcFt3ZWJwYWNrUXVldWVzXShmblF1ZXVlKSkpO1xuXHRcdH0pO1xuXHRcdHJldHVybiBmbi5yID8gcHJvbWlzZSA6IGdldFJlc3VsdCgpO1xuXHR9XG5cdHZhciBkb25lID0gKGVycikgPT4gKChlcnIgPyByZWplY3QocHJvbWlzZVt3ZWJwYWNrRXJyb3JdID0gZXJyKSA6IG91dGVyUmVzb2x2ZShleHBvcnRzKSksIHJlc29sdmVRdWV1ZShxdWV1ZSkpXG5cdGJvZHkoaGFuZGxlLCBkb25lKTtcblx0cXVldWUgJiYgcXVldWUuZCA8IDAgJiYgKHF1ZXVlLmQgPSAwKTtcbn07IiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5mID0ge307XG4vLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4vLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3Ncbl9fd2VicGFja19yZXF1aXJlX18uZSA9IChjaHVua0lkKSA9PiB7XG5cdHJldHVybiBQcm9taXNlLmFsbChPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLmYpLnJlZHVjZSgocHJvbWlzZXMsIGtleSkgPT4ge1xuXHRcdF9fd2VicGFja19yZXF1aXJlX18uZltrZXldKGNodW5rSWQsIHByb21pc2VzKTtcblx0XHRyZXR1cm4gcHJvbWlzZXM7XG5cdH0sIFtdKSk7XG59OyIsIi8vIFRoaXMgZnVuY3Rpb24gYWxsb3cgdG8gcmVmZXJlbmNlIGFzeW5jIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy51ID0gKGNodW5rSWQpID0+IHtcblx0Ly8gcmV0dXJuIHVybCBmb3IgZmlsZW5hbWVzIGJhc2VkIG9uIHRlbXBsYXRlXG5cdHJldHVybiBcImpzL1wiICsgY2h1bmtJZCArIFwiLmpzXCI7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5obWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZSA9IE9iamVjdC5jcmVhdGUobW9kdWxlKTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCAnZXhwb3J0cycsIHtcblx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdHNldDogKCkgPT4ge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdFUyBNb2R1bGVzIG1heSBub3QgYXNzaWduIG1vZHVsZS5leHBvcnRzIG9yIGV4cG9ydHMuKiwgVXNlIEVTTSBleHBvcnQgc3ludGF4LCBpbnN0ZWFkOiAnICsgbW9kdWxlLmlkKTtcblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwidmFyIGluUHJvZ3Jlc3MgPSB7fTtcbnZhciBkYXRhV2VicGFja1ByZWZpeCA9IFwibHRqcy1mb3VydGg6XCI7XG4vLyBsb2FkU2NyaXB0IGZ1bmN0aW9uIHRvIGxvYWQgYSBzY3JpcHQgdmlhIHNjcmlwdCB0YWdcbl9fd2VicGFja19yZXF1aXJlX18ubCA9ICh1cmwsIGRvbmUsIGtleSwgY2h1bmtJZCkgPT4ge1xuXHRpZihpblByb2dyZXNzW3VybF0pIHsgaW5Qcm9ncmVzc1t1cmxdLnB1c2goZG9uZSk7IHJldHVybjsgfVxuXHR2YXIgc2NyaXB0LCBuZWVkQXR0YWNoO1xuXHRpZihrZXkgIT09IHVuZGVmaW5lZCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHNjcmlwdHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBzID0gc2NyaXB0c1tpXTtcblx0XHRcdGlmKHMuZ2V0QXR0cmlidXRlKFwic3JjXCIpID09IHVybCB8fCBzLmdldEF0dHJpYnV0ZShcImRhdGEtd2VicGFja1wiKSA9PSBkYXRhV2VicGFja1ByZWZpeCArIGtleSkgeyBzY3JpcHQgPSBzOyBicmVhazsgfVxuXHRcdH1cblx0fVxuXHRpZighc2NyaXB0KSB7XG5cdFx0bmVlZEF0dGFjaCA9IHRydWU7XG5cdFx0c2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cblx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG5cdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcblx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcblx0XHR9XG5cdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcImRhdGEtd2VicGFja1wiLCBkYXRhV2VicGFja1ByZWZpeCArIGtleSk7XG5cblx0XHRzY3JpcHQuc3JjID0gdXJsO1xuXHR9XG5cdGluUHJvZ3Jlc3NbdXJsXSA9IFtkb25lXTtcblx0dmFyIG9uU2NyaXB0Q29tcGxldGUgPSAocHJldiwgZXZlbnQpID0+IHtcblx0XHQvLyBhdm9pZCBtZW0gbGVha3MgaW4gSUUuXG5cdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcblx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0dmFyIGRvbmVGbnMgPSBpblByb2dyZXNzW3VybF07XG5cdFx0ZGVsZXRlIGluUHJvZ3Jlc3NbdXJsXTtcblx0XHRzY3JpcHQucGFyZW50Tm9kZSAmJiBzY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzY3JpcHQpO1xuXHRcdGRvbmVGbnMgJiYgZG9uZUZucy5mb3JFYWNoKChmbikgPT4gKGZuKGV2ZW50KSkpO1xuXHRcdGlmKHByZXYpIHJldHVybiBwcmV2KGV2ZW50KTtcblx0fVxuXHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQob25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHVuZGVmaW5lZCwgeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pLCAxMjAwMDApO1xuXHRzY3JpcHQub25lcnJvciA9IG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCBzY3JpcHQub25lcnJvcik7XG5cdHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgc2NyaXB0Lm9ubG9hZCk7XG5cdG5lZWRBdHRhY2ggJiYgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xufTsiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLnYgPSAoZXhwb3J0cywgd2FzbU1vZHVsZUlkLCB3YXNtTW9kdWxlSGFzaCwgaW1wb3J0c09iaikgPT4ge1xuXG5cdHZhciByZXEgPSBmZXRjaChfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgd2FzbU1vZHVsZUhhc2ggKyBcIi5tb2R1bGUud2FzbVwiKTtcblx0dmFyIGZhbGxiYWNrID0gKCkgPT4gKHJlcVxuXHRcdC50aGVuKCh4KSA9PiAoeC5hcnJheUJ1ZmZlcigpKSlcblx0XHQudGhlbigoYnl0ZXMpID0+IChXZWJBc3NlbWJseS5pbnN0YW50aWF0ZShieXRlcywgaW1wb3J0c09iaikpKVxuXHRcdC50aGVuKChyZXMpID0+IChPYmplY3QuYXNzaWduKGV4cG9ydHMsIHJlcy5pbnN0YW5jZS5leHBvcnRzKSkpKTtcblx0cmV0dXJuIHJlcS50aGVuKChyZXMpID0+IHtcblx0XHRpZiAodHlwZW9mIFdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlU3RyZWFtaW5nID09PSBcImZ1bmN0aW9uXCIpIHtcblxuXHRcdFx0cmV0dXJuIFdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlU3RyZWFtaW5nKHJlcywgaW1wb3J0c09iailcblx0XHRcdFx0LnRoZW4oXG5cdFx0XHRcdFx0KHJlcykgPT4gKE9iamVjdC5hc3NpZ24oZXhwb3J0cywgcmVzLmluc3RhbmNlLmV4cG9ydHMpKSxcblx0XHRcdFx0XHQoZSkgPT4ge1xuXHRcdFx0XHRcdFx0aWYocmVzLmhlYWRlcnMuZ2V0KFwiQ29udGVudC1UeXBlXCIpICE9PSBcImFwcGxpY2F0aW9uL3dhc21cIikge1xuXHRcdFx0XHRcdFx0XHRjb25zb2xlLndhcm4oXCJgV2ViQXNzZW1ibHkuaW5zdGFudGlhdGVTdHJlYW1pbmdgIGZhaWxlZCBiZWNhdXNlIHlvdXIgc2VydmVyIGRvZXMgbm90IHNlcnZlIHdhc20gd2l0aCBgYXBwbGljYXRpb24vd2FzbWAgTUlNRSB0eXBlLiBGYWxsaW5nIGJhY2sgdG8gYFdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlYCB3aGljaCBpcyBzbG93ZXIuIE9yaWdpbmFsIGVycm9yOlxcblwiLCBlKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbGxiYWNrKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR0aHJvdyBlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbGxiYWNrKCk7XG5cdH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQgJiYgZG9jdW1lbnQuY3VycmVudFNjcmlwdC50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdTQ1JJUFQnKVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAoIXNjcmlwdFVybCB8fCAhL15odHRwKHM/KTovLnRlc3Qoc2NyaXB0VXJsKSkpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoL15ibG9iOi8sIFwiXCIpLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybCArIFwiLi4vXCI7IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiY29sbGlkZXJzLXByb3BlcnRpZXNcIjogMFxufTtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5mLmogPSAoY2h1bmtJZCwgcHJvbWlzZXMpID0+IHtcblx0XHQvLyBKU09OUCBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cdFx0dmFyIGluc3RhbGxlZENodW5rRGF0YSA9IF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpID8gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdIDogdW5kZWZpbmVkO1xuXHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgeyAvLyAwIG1lYW5zIFwiYWxyZWFkeSBpbnN0YWxsZWRcIi5cblxuXHRcdFx0Ly8gYSBQcm9taXNlIG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cblx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZih0cnVlKSB7IC8vIGFsbCBjaHVua3MgaGF2ZSBKU1xuXHRcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcblx0XHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IChpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XSkpO1xuXHRcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdID0gcHJvbWlzZSk7XG5cblx0XHRcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG5cdFx0XHRcdFx0dmFyIHVybCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIF9fd2VicGFja19yZXF1aXJlX18udShjaHVua0lkKTtcblx0XHRcdFx0XHQvLyBjcmVhdGUgZXJyb3IgYmVmb3JlIHN0YWNrIHVud291bmQgdG8gZ2V0IHVzZWZ1bCBzdGFja3RyYWNlIGxhdGVyXG5cdFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCk7XG5cdFx0XHRcdFx0dmFyIGxvYWRpbmdFbmRlZCA9IChldmVudCkgPT4ge1xuXHRcdFx0XHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkpIHtcblx0XHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuXHRcdFx0XHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcblx0XHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLm1lc3NhZ2UgPSAnTG9hZGluZyBjaHVuayAnICsgY2h1bmtJZCArICcgZmFpbGVkLlxcbignICsgZXJyb3JUeXBlICsgJzogJyArIHJlYWxTcmMgKyAnKSc7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IubmFtZSA9ICdDaHVua0xvYWRFcnJvcic7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcblx0XHRcdFx0XHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcblx0XHRcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGFbMV0oZXJyb3IpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmwodXJsLCBsb2FkaW5nRW5kZWQsIFwiY2h1bmstXCIgKyBjaHVua0lkLCBjaHVua0lkKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cbn07XG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2x0anNfZm91cnRoXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2x0anNfZm91cnRoXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9idWlsZF90aHJlZV9tb2R1bGVfanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9jb250cm9sc19PcmJpdENvbnRyb2xzX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc19saWwtZ3VpX2Rpc3RfbGlsLWd1aV9lc21fanNcIixcInZlbmRvcnMtbm9kZV9tb2R1bGVzX2RpbWZvcmdlX3JhcGllcjNkX2R5bmFtaWNzX3JpZ2lkX2JvZHlfanNcIixcInNhbXBsZXNfY2hhcHRlcnNfY2hhcHRlci0xMl91dGlsX3N0YW5kYXJkLXNjZW5lLWVtcHR5X2pzXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc2FtcGxlcy9jaGFwdGVycy9jaGFwdGVyLTEyL2NvbGxpZGVycy1wcm9wZXJ0aWVzLmpzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
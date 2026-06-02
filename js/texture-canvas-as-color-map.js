/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/mandelbrot-canvas/lib/index.js"
/*!*****************************************************!*\
  !*** ./node_modules/mandelbrot-canvas/lib/index.js ***!
  \*****************************************************/
(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Mandelbrot {
  constructor(element = document.getElementById('mandelbrot'), state) {
    _defineProperty(this, "mouseState", {
      down: null
    });

    _defineProperty(this, "state", {
      calibration: 5,
      height: 600,
      hue: 0,
      detail: 100,
      magnification: 200,
      panX: 2,
      panY: 1.5,
      width: 600
    });

    this.state = _objectSpread({}, this.state, state);
    this.element = element;
    this.canvas = document.createElement('canvas');
    this.canvas.height = this.state.height;
    this.canvas.onmousedown = this.handleMouseDown.bind(this);
    this.canvas.onmousemove = this.handleMouseMove.bind(this);
    this.canvas.onmouseup = this.handleMouseUp.bind(this);
    this.canvas.onmousewheel = this.handleMouseWheel.bind(this);
    this.canvas.width = this.state.width;
    this.ctx = this.canvas.getContext('2d');
    element.appendChild(this.canvas);
  }

  handleMouseDown(e) {
    this.mouseState = {
      down: e
    };
  }

  handleMouseUp() {
    this.setState(this.mouseState.newState);
    this.mouseState = {
      down: null
    };
  }

  handleMouseWheel(e) {
    const magnification = this.state.magnification;
    this.setState({
      magnification: magnification - e.deltaY >= 50 ? magnification - e.deltaY : 50
    });
  }

  handleMouseMove(e) {
    var _this$mouseState;

    if ((_this$mouseState = this.mouseState) === null || _this$mouseState === void 0 ? void 0 : _this$mouseState.down) {
      const _this$state = this.state,
            panX = _this$state.panX,
            panY = _this$state.panY;
      this.mouseState = _objectSpread({}, this.mouseState, {
        newState: {
          panX: panX + (e.screenX - this.mouseState.down.screenX) / this.state.magnification,
          panY: panY + (e.screenY - this.mouseState.down.screenY) / this.state.magnification
        }
      });
    }
  }

  belongsToSet(x, y) {
    let X = x;
    let Y = y;

    for (let i = 0; i < this.state.detail; i++) {
      const newX = X * X - Y * Y + x;
      const newY = 2 * Y * X + y;
      X = newX;
      Y = newY;

      if (X * Y > this.state.calibration) {
        return i / this.state.detail * 100;
      }
    }

    return 0;
  }

  setState(state) {
    this.state = _objectSpread({}, this.state, state);
    this.render();
  }

  render() {
    this.canvas.width = this.state.width;
    this.canvas.height = this.state.height;

    for (let x = 0; x < this.canvas.width; x++) {
      for (let y = 0; y < this.canvas.height; y++) {
        const belongsToSet = this.belongsToSet(x / this.state.magnification - this.state.panX, y / this.state.magnification - this.state.panY);

        if (belongsToSet === 0) {
          this.ctx.fillStyle = '#000';
          this.ctx.fillRect(x, y, 1, 1);
        } else {
          this.ctx.fillStyle = `hsl(${this.state.hue}, 100%, ${belongsToSet}%)`;
          this.ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  }

}

exports["default"] = Mandelbrot;

/***/ },

/***/ "./samples/chapters/chapter-10/texture-canvas-as-color-map.js"
/*!********************************************************************!*\
  !*** ./samples/chapters/chapter-10/texture-canvas-as-color-map.js ***!
  \********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _util_standard_scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/standard-scene */ "./samples/chapters/chapter-10/util/standard-scene.js");
/* harmony import */ var _controls_material_controls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../controls/material-controls */ "./samples/controls/material-controls.js");
/* harmony import */ var mandelbrot_canvas__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! mandelbrot-canvas */ "./node_modules/mandelbrot-canvas/lib/index.js");





const div = document.createElement('div')
div.id = 'mandelbrot'
div.style = 'position: absolute'
document.body.append(div)

const mandelbrot = new mandelbrot_canvas__WEBPACK_IMPORTED_MODULE_3__["default"](document.getElementById('mandelbrot'), {
  height: 300,
  width: 300,
  magnification: 100
})
mandelbrot.render()

const material = new three__WEBPACK_IMPORTED_MODULE_0__.MeshPhongMaterial({
  color: 0xffffff,
  map: new three__WEBPACK_IMPORTED_MODULE_0__.Texture(document.querySelector('#mandelbrot canvas'))
})

material.map.needsUpdate = true

const props = {
  material: material,
  withMaterialGui: true,
  provideGui: (gui, mesh, material) => {
    ;(0,_controls_material_controls__WEBPACK_IMPORTED_MODULE_2__.initializeGuiMeshPhongMaterial)(gui, mesh, material)

    gui.folders.map((f) => {
      if (f._title === 'Textures') {
        f.destroy()
      }
    })

    const wrappingTypes = {
      repeatWrapping: three__WEBPACK_IMPORTED_MODULE_0__.RepeatWrapping,
      clampToEdgeWrapping: three__WEBPACK_IMPORTED_MODULE_0__.ClampToEdgeWrapping,
      mirroredRepeatWrapping: three__WEBPACK_IMPORTED_MODULE_0__.MirroredRepeatWrapping
    }

    const props = {
      normalScaleX: 1,
      normalScaleY: 1,
      repeatX: 1,
      repeatY: 1,
      wrappingType: three__WEBPACK_IMPORTED_MODULE_0__.RepeatWrapping
    }
    const textureFolder = gui.addFolder('Textures')
    textureFolder.add(props, 'repeatX', 1, 10, 1).onChange(() => {
      material.map.repeat.set(props.repeatX, props.repeatY)
    })
    textureFolder.add(props, 'repeatY', 1, 10, 1).onChange(() => {
      material.map.repeat.set(props.repeatX, props.repeatY)
    })
    textureFolder.add(props, 'wrappingType', wrappingTypes).onChange(() => {
      material.map.wrapS = props.wrappingType
      material.map.wrapT = props.wrappingType
      material.map.needsUpdate = true
    })
  }
}

;(0,_util_standard_scene__WEBPACK_IMPORTED_MODULE_1__.bootstrapMaterialScene)(props).then()

// mention the other loaders in the text, and also explain RGBe and EXR. Don't show
// the loaders, but mention that we'll see them further down in the examples.


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
/******/ 			"texture-canvas-as-color-map": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_build_three_module_js","vendors-node_modules_three_examples_jsm_controls_OrbitControls_js","vendors-node_modules_lil-gui_dist_lil-gui_esm_js","vendors-node_modules_three_examples_jsm_loaders_GLTFLoader_js","vendors-node_modules_three_examples_jsm_utils_BufferGeometryUtils_js","samples_bootstrap_bootstrap_js-samples_controls_material-controls_js-samples_controls_rendere-c87d8a","samples_chapters_chapter-10_util_standard-scene_js-node_modules_three_examples_jsm_helpers_Ve-fddbcb"], () => (__webpack_require__("./samples/chapters/chapter-10/texture-canvas-as-color-map.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QsRTs7Ozs7V0NOQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0EsNEc7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC8uL25vZGVfbW9kdWxlcy9tYW5kZWxicm90LWNhbnZhcy9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItMTAvdGV4dHVyZS1jYW52YXMtYXMtY29sb3ItbWFwLmpzIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9OyB2YXIgb3duS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7IGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gJ2Z1bmN0aW9uJykgeyBvd25LZXlzID0gb3duS2V5cy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2UpLmZpbHRlcihmdW5jdGlvbiAoc3ltKSB7IHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgc3ltKS5lbnVtZXJhYmxlOyB9KSk7IH0gb3duS2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgX2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7IH0pOyB9IHJldHVybiB0YXJnZXQ7IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cblxuY2xhc3MgTWFuZGVsYnJvdCB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFuZGVsYnJvdCcpLCBzdGF0ZSkge1xuICAgIF9kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcIm1vdXNlU3RhdGVcIiwge1xuICAgICAgZG93bjogbnVsbFxuICAgIH0pO1xuXG4gICAgX2RlZmluZVByb3BlcnR5KHRoaXMsIFwic3RhdGVcIiwge1xuICAgICAgY2FsaWJyYXRpb246IDUsXG4gICAgICBoZWlnaHQ6IDYwMCxcbiAgICAgIGh1ZTogMCxcbiAgICAgIGRldGFpbDogMTAwLFxuICAgICAgbWFnbmlmaWNhdGlvbjogMjAwLFxuICAgICAgcGFuWDogMixcbiAgICAgIHBhblk6IDEuNSxcbiAgICAgIHdpZHRoOiA2MDBcbiAgICB9KTtcblxuICAgIHRoaXMuc3RhdGUgPSBfb2JqZWN0U3ByZWFkKHt9LCB0aGlzLnN0YXRlLCBzdGF0ZSk7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHRoaXMuc3RhdGUuaGVpZ2h0O1xuICAgIHRoaXMuY2FudmFzLm9ubW91c2Vkb3duID0gdGhpcy5oYW5kbGVNb3VzZURvd24uYmluZCh0aGlzKTtcbiAgICB0aGlzLmNhbnZhcy5vbm1vdXNlbW92ZSA9IHRoaXMuaGFuZGxlTW91c2VNb3ZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5jYW52YXMub25tb3VzZXVwID0gdGhpcy5oYW5kbGVNb3VzZVVwLmJpbmQodGhpcyk7XG4gICAgdGhpcy5jYW52YXMub25tb3VzZXdoZWVsID0gdGhpcy5oYW5kbGVNb3VzZVdoZWVsLmJpbmQodGhpcyk7XG4gICAgdGhpcy5jYW52YXMud2lkdGggPSB0aGlzLnN0YXRlLndpZHRoO1xuICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuY2FudmFzKTtcbiAgfVxuXG4gIGhhbmRsZU1vdXNlRG93bihlKSB7XG4gICAgdGhpcy5tb3VzZVN0YXRlID0ge1xuICAgICAgZG93bjogZVxuICAgIH07XG4gIH1cblxuICBoYW5kbGVNb3VzZVVwKCkge1xuICAgIHRoaXMuc2V0U3RhdGUodGhpcy5tb3VzZVN0YXRlLm5ld1N0YXRlKTtcbiAgICB0aGlzLm1vdXNlU3RhdGUgPSB7XG4gICAgICBkb3duOiBudWxsXG4gICAgfTtcbiAgfVxuXG4gIGhhbmRsZU1vdXNlV2hlZWwoZSkge1xuICAgIGNvbnN0IG1hZ25pZmljYXRpb24gPSB0aGlzLnN0YXRlLm1hZ25pZmljYXRpb247XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBtYWduaWZpY2F0aW9uOiBtYWduaWZpY2F0aW9uIC0gZS5kZWx0YVkgPj0gNTAgPyBtYWduaWZpY2F0aW9uIC0gZS5kZWx0YVkgOiA1MFxuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlTW91c2VNb3ZlKGUpIHtcbiAgICB2YXIgX3RoaXMkbW91c2VTdGF0ZTtcblxuICAgIGlmICgoX3RoaXMkbW91c2VTdGF0ZSA9IHRoaXMubW91c2VTdGF0ZSkgPT09IG51bGwgfHwgX3RoaXMkbW91c2VTdGF0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3RoaXMkbW91c2VTdGF0ZS5kb3duKSB7XG4gICAgICBjb25zdCBfdGhpcyRzdGF0ZSA9IHRoaXMuc3RhdGUsXG4gICAgICAgICAgICBwYW5YID0gX3RoaXMkc3RhdGUucGFuWCxcbiAgICAgICAgICAgIHBhblkgPSBfdGhpcyRzdGF0ZS5wYW5ZO1xuICAgICAgdGhpcy5tb3VzZVN0YXRlID0gX29iamVjdFNwcmVhZCh7fSwgdGhpcy5tb3VzZVN0YXRlLCB7XG4gICAgICAgIG5ld1N0YXRlOiB7XG4gICAgICAgICAgcGFuWDogcGFuWCArIChlLnNjcmVlblggLSB0aGlzLm1vdXNlU3RhdGUuZG93bi5zY3JlZW5YKSAvIHRoaXMuc3RhdGUubWFnbmlmaWNhdGlvbixcbiAgICAgICAgICBwYW5ZOiBwYW5ZICsgKGUuc2NyZWVuWSAtIHRoaXMubW91c2VTdGF0ZS5kb3duLnNjcmVlblkpIC8gdGhpcy5zdGF0ZS5tYWduaWZpY2F0aW9uXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGJlbG9uZ3NUb1NldCh4LCB5KSB7XG4gICAgbGV0IFggPSB4O1xuICAgIGxldCBZID0geTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGF0ZS5kZXRhaWw7IGkrKykge1xuICAgICAgY29uc3QgbmV3WCA9IFggKiBYIC0gWSAqIFkgKyB4O1xuICAgICAgY29uc3QgbmV3WSA9IDIgKiBZICogWCArIHk7XG4gICAgICBYID0gbmV3WDtcbiAgICAgIFkgPSBuZXdZO1xuXG4gICAgICBpZiAoWCAqIFkgPiB0aGlzLnN0YXRlLmNhbGlicmF0aW9uKSB7XG4gICAgICAgIHJldHVybiBpIC8gdGhpcy5zdGF0ZS5kZXRhaWwgKiAxMDA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBzZXRTdGF0ZShzdGF0ZSkge1xuICAgIHRoaXMuc3RhdGUgPSBfb2JqZWN0U3ByZWFkKHt9LCB0aGlzLnN0YXRlLCBzdGF0ZSk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHRoaXMuc3RhdGUud2lkdGg7XG4gICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gdGhpcy5zdGF0ZS5oZWlnaHQ7XG5cbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMuY2FudmFzLndpZHRoOyB4KyspIHtcbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5jYW52YXMuaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgY29uc3QgYmVsb25nc1RvU2V0ID0gdGhpcy5iZWxvbmdzVG9TZXQoeCAvIHRoaXMuc3RhdGUubWFnbmlmaWNhdGlvbiAtIHRoaXMuc3RhdGUucGFuWCwgeSAvIHRoaXMuc3RhdGUubWFnbmlmaWNhdGlvbiAtIHRoaXMuc3RhdGUucGFuWSk7XG5cbiAgICAgICAgaWYgKGJlbG9uZ3NUb1NldCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjMDAwJztcbiAgICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCh4LCB5LCAxLCAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBgaHNsKCR7dGhpcy5zdGF0ZS5odWV9LCAxMDAlLCAke2JlbG9uZ3NUb1NldH0lKWA7XG4gICAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoeCwgeSwgMSwgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxufVxuXG5leHBvcnRzLmRlZmF1bHQgPSBNYW5kZWxicm90OyIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuaW1wb3J0IHsgYm9vdHN0cmFwTWF0ZXJpYWxTY2VuZSB9IGZyb20gJy4vdXRpbC9zdGFuZGFyZC1zY2VuZSdcbmltcG9ydCB7IGluaXRpYWxpemVHdWlNZXNoUGhvbmdNYXRlcmlhbCB9IGZyb20gJy4uLy4uL2NvbnRyb2xzL21hdGVyaWFsLWNvbnRyb2xzJ1xuaW1wb3J0IE1hbmRlbGJyb3QgZnJvbSAnbWFuZGVsYnJvdC1jYW52YXMnXG5cbmNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5kaXYuaWQgPSAnbWFuZGVsYnJvdCdcbmRpdi5zdHlsZSA9ICdwb3NpdGlvbjogYWJzb2x1dGUnXG5kb2N1bWVudC5ib2R5LmFwcGVuZChkaXYpXG5cbmNvbnN0IG1hbmRlbGJyb3QgPSBuZXcgTWFuZGVsYnJvdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFuZGVsYnJvdCcpLCB7XG4gIGhlaWdodDogMzAwLFxuICB3aWR0aDogMzAwLFxuICBtYWduaWZpY2F0aW9uOiAxMDBcbn0pXG5tYW5kZWxicm90LnJlbmRlcigpXG5cbmNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKHtcbiAgY29sb3I6IDB4ZmZmZmZmLFxuICBtYXA6IG5ldyBUSFJFRS5UZXh0dXJlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYW5kZWxicm90IGNhbnZhcycpKVxufSlcblxubWF0ZXJpYWwubWFwLm5lZWRzVXBkYXRlID0gdHJ1ZVxuXG5jb25zdCBwcm9wcyA9IHtcbiAgbWF0ZXJpYWw6IG1hdGVyaWFsLFxuICB3aXRoTWF0ZXJpYWxHdWk6IHRydWUsXG4gIHByb3ZpZGVHdWk6IChndWksIG1lc2gsIG1hdGVyaWFsKSA9PiB7XG4gICAgaW5pdGlhbGl6ZUd1aU1lc2hQaG9uZ01hdGVyaWFsKGd1aSwgbWVzaCwgbWF0ZXJpYWwpXG5cbiAgICBndWkuZm9sZGVycy5tYXAoKGYpID0+IHtcbiAgICAgIGlmIChmLl90aXRsZSA9PT0gJ1RleHR1cmVzJykge1xuICAgICAgICBmLmRlc3Ryb3koKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCB3cmFwcGluZ1R5cGVzID0ge1xuICAgICAgcmVwZWF0V3JhcHBpbmc6IFRIUkVFLlJlcGVhdFdyYXBwaW5nLFxuICAgICAgY2xhbXBUb0VkZ2VXcmFwcGluZzogVEhSRUUuQ2xhbXBUb0VkZ2VXcmFwcGluZyxcbiAgICAgIG1pcnJvcmVkUmVwZWF0V3JhcHBpbmc6IFRIUkVFLk1pcnJvcmVkUmVwZWF0V3JhcHBpbmdcbiAgICB9XG5cbiAgICBjb25zdCBwcm9wcyA9IHtcbiAgICAgIG5vcm1hbFNjYWxlWDogMSxcbiAgICAgIG5vcm1hbFNjYWxlWTogMSxcbiAgICAgIHJlcGVhdFg6IDEsXG4gICAgICByZXBlYXRZOiAxLFxuICAgICAgd3JhcHBpbmdUeXBlOiBUSFJFRS5SZXBlYXRXcmFwcGluZ1xuICAgIH1cbiAgICBjb25zdCB0ZXh0dXJlRm9sZGVyID0gZ3VpLmFkZEZvbGRlcignVGV4dHVyZXMnKVxuICAgIHRleHR1cmVGb2xkZXIuYWRkKHByb3BzLCAncmVwZWF0WCcsIDEsIDEwLCAxKS5vbkNoYW5nZSgoKSA9PiB7XG4gICAgICBtYXRlcmlhbC5tYXAucmVwZWF0LnNldChwcm9wcy5yZXBlYXRYLCBwcm9wcy5yZXBlYXRZKVxuICAgIH0pXG4gICAgdGV4dHVyZUZvbGRlci5hZGQocHJvcHMsICdyZXBlYXRZJywgMSwgMTAsIDEpLm9uQ2hhbmdlKCgpID0+IHtcbiAgICAgIG1hdGVyaWFsLm1hcC5yZXBlYXQuc2V0KHByb3BzLnJlcGVhdFgsIHByb3BzLnJlcGVhdFkpXG4gICAgfSlcbiAgICB0ZXh0dXJlRm9sZGVyLmFkZChwcm9wcywgJ3dyYXBwaW5nVHlwZScsIHdyYXBwaW5nVHlwZXMpLm9uQ2hhbmdlKCgpID0+IHtcbiAgICAgIG1hdGVyaWFsLm1hcC53cmFwUyA9IHByb3BzLndyYXBwaW5nVHlwZVxuICAgICAgbWF0ZXJpYWwubWFwLndyYXBUID0gcHJvcHMud3JhcHBpbmdUeXBlXG4gICAgICBtYXRlcmlhbC5tYXAubmVlZHNVcGRhdGUgPSB0cnVlXG4gICAgfSlcbiAgfVxufVxuXG5ib290c3RyYXBNYXRlcmlhbFNjZW5lKHByb3BzKS50aGVuKClcblxuLy8gbWVudGlvbiB0aGUgb3RoZXIgbG9hZGVycyBpbiB0aGUgdGV4dCwgYW5kIGFsc28gZXhwbGFpbiBSR0JlIGFuZCBFWFIuIERvbid0IHNob3dcbi8vIHRoZSBsb2FkZXJzLCBidXQgbWVudGlvbiB0aGF0IHdlJ2xsIHNlZSB0aGVtIGZ1cnRoZXIgZG93biBpbiB0aGUgZXhhbXBsZXMuXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcInRleHR1cmUtY2FudmFzLWFzLWNvbG9yLW1hcFwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtsdGpzX2ZvdXJ0aFwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtsdGpzX2ZvdXJ0aFwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfdGhyZWVfYnVpbGRfdGhyZWVfbW9kdWxlX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fY29udHJvbHNfT3JiaXRDb250cm9sc19qc1wiLFwidmVuZG9ycy1ub2RlX21vZHVsZXNfbGlsLWd1aV9kaXN0X2xpbC1ndWlfZXNtX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fbG9hZGVyc19HTFRGTG9hZGVyX2pzXCIsXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fdXRpbHNfQnVmZmVyR2VvbWV0cnlVdGlsc19qc1wiLFwic2FtcGxlc19ib290c3RyYXBfYm9vdHN0cmFwX2pzLXNhbXBsZXNfY29udHJvbHNfbWF0ZXJpYWwtY29udHJvbHNfanMtc2FtcGxlc19jb250cm9sc19yZW5kZXJlLWM4N2Q4YVwiLFwic2FtcGxlc19jaGFwdGVyc19jaGFwdGVyLTEwX3V0aWxfc3RhbmRhcmQtc2NlbmVfanMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9oZWxwZXJzX1ZlLWZkZGJjYlwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NhbXBsZXMvY2hhcHRlcnMvY2hhcHRlci0xMC90ZXh0dXJlLWNhbnZhcy1hcy1jb2xvci1tYXAuanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
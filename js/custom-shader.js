/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
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
/************************************************************************/
var __webpack_exports__ = {};
/*!******************************************************!*\
  !*** ./samples/chapters/chapter-11/custom-shader.js ***!
  \******************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomBitShader: () => (/* binding */ CustomBitShader),
/* harmony export */   CustomGrayScaleShader: () => (/* binding */ CustomGrayScaleShader)
/* harmony export */ });
const CustomGrayScaleShader = {
  uniforms: {
    tDiffuse: { type: 't', value: null },
    rPower: { type: 'f', value: 0.2126 },
    gPower: { type: 'f', value: 0.7152 },
    bPower: { type: 'f', value: 0.0722 }
  },

  // 0.2126 R + 0.7152 G + 0.0722 B
  // vertexshader is always the same for postprocessing steps
  vertexShader: [
    'varying vec2 vUv;',

    'void main() {',

    'vUv = uv;',
    'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',

    '}'
  ].join('\n'),

  fragmentShader: [
    // pass in our custom uniforms
    'uniform float rPower;',
    'uniform float gPower;',
    'uniform float bPower;',

    // pass in the image/texture we'll be modifying
    'uniform sampler2D tDiffuse;',

    // used to determine the correct texel we're working on
    'varying vec2 vUv;',

    // executed, in parallel, for each pixel
    'void main() {',

    // get the pixel from the texture we're working with (called a texel)
    'vec4 texel = texture2D( tDiffuse, vUv );',

    // calculate the new color
    'float gray = texel.r*rPower + texel.g*gPower + texel.b*bPower;',

    // return this new color
    'gl_FragColor = vec4( vec3(gray), texel.w );',

    '}'
  ].join('\n')
}

const CustomBitShader = {
  uniforms: {
    tDiffuse: { type: 't', value: null },
    bitSize: { type: 'i', value: 4 }
  },

  vertexShader: [
    'varying vec2 vUv;',

    'void main() {',

    'vUv = uv;',
    'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',

    '}'
  ].join('\n'),

  fragmentShader: [
    'uniform int bitSize;',

    'uniform sampler2D tDiffuse;',

    'varying vec2 vUv;',

    'void main() {',

    'vec4 texel = texture2D( tDiffuse, vUv );',
    'float n = pow(float(bitSize),2.0);',
    'float newR = floor(texel.r*n)/n;',
    'float newG = floor(texel.g*n)/n;',
    'float newB = floor(texel.b*n)/n;',

    'gl_FragColor = vec4( vec3(newR,newG,newB), 1.0);',

    '}'
  ].join('\n')
}

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvY3VzdG9tLXNoYWRlci5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7Ozs7Ozs7Ozs7O0FDTk87QUFDUDtBQUNBLGdCQUFnQix3QkFBd0I7QUFDeEMsY0FBYywwQkFBMEI7QUFDeEMsY0FBYywwQkFBMEI7QUFDeEMsY0FBYztBQUNkLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCOztBQUV0QixrQkFBa0I7O0FBRWxCLGNBQWM7QUFDZCw4RUFBOEU7O0FBRTlFLE1BQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCLDBCQUEwQjtBQUMxQiwwQkFBMEI7O0FBRTFCO0FBQ0EsZ0NBQWdDOztBQUVoQztBQUNBLHNCQUFzQjs7QUFFdEI7QUFDQSxrQkFBa0I7O0FBRWxCO0FBQ0EsNkNBQTZDOztBQUU3QztBQUNBLG1FQUFtRTs7QUFFbkU7QUFDQSxnREFBZ0Q7O0FBRWhELE1BQU07QUFDTjtBQUNBOztBQUVPO0FBQ1A7QUFDQSxnQkFBZ0Isd0JBQXdCO0FBQ3hDLGVBQWU7QUFDZixHQUFHOztBQUVIO0FBQ0Esc0JBQXNCOztBQUV0QixrQkFBa0I7O0FBRWxCLGNBQWM7QUFDZCw4RUFBOEU7O0FBRTlFLE1BQU07QUFDTjs7QUFFQTtBQUNBLHlCQUF5Qjs7QUFFekIsZ0NBQWdDOztBQUVoQyxzQkFBc0I7O0FBRXRCLGtCQUFrQjs7QUFFbEIsNkNBQTZDO0FBQzdDLHVDQUF1QztBQUN2QyxxQ0FBcUM7QUFDckMscUNBQXFDO0FBQ3JDLHFDQUFxQzs7QUFFckMscURBQXFEOztBQUVyRCxNQUFNO0FBQ047QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9sdGpzLWZvdXJ0aC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2x0anMtZm91cnRoL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItMTEvY3VzdG9tLXNoYWRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImV4cG9ydCBjb25zdCBDdXN0b21HcmF5U2NhbGVTaGFkZXIgPSB7XG4gIHVuaWZvcm1zOiB7XG4gICAgdERpZmZ1c2U6IHsgdHlwZTogJ3QnLCB2YWx1ZTogbnVsbCB9LFxuICAgIHJQb3dlcjogeyB0eXBlOiAnZicsIHZhbHVlOiAwLjIxMjYgfSxcbiAgICBnUG93ZXI6IHsgdHlwZTogJ2YnLCB2YWx1ZTogMC43MTUyIH0sXG4gICAgYlBvd2VyOiB7IHR5cGU6ICdmJywgdmFsdWU6IDAuMDcyMiB9XG4gIH0sXG5cbiAgLy8gMC4yMTI2IFIgKyAwLjcxNTIgRyArIDAuMDcyMiBCXG4gIC8vIHZlcnRleHNoYWRlciBpcyBhbHdheXMgdGhlIHNhbWUgZm9yIHBvc3Rwcm9jZXNzaW5nIHN0ZXBzXG4gIHZlcnRleFNoYWRlcjogW1xuICAgICd2YXJ5aW5nIHZlYzIgdlV2OycsXG5cbiAgICAndm9pZCBtYWluKCkgeycsXG5cbiAgICAndlV2ID0gdXY7JyxcbiAgICAnZ2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogbW9kZWxWaWV3TWF0cml4ICogdmVjNCggcG9zaXRpb24sIDEuMCApOycsXG5cbiAgICAnfSdcbiAgXS5qb2luKCdcXG4nKSxcblxuICBmcmFnbWVudFNoYWRlcjogW1xuICAgIC8vIHBhc3MgaW4gb3VyIGN1c3RvbSB1bmlmb3Jtc1xuICAgICd1bmlmb3JtIGZsb2F0IHJQb3dlcjsnLFxuICAgICd1bmlmb3JtIGZsb2F0IGdQb3dlcjsnLFxuICAgICd1bmlmb3JtIGZsb2F0IGJQb3dlcjsnLFxuXG4gICAgLy8gcGFzcyBpbiB0aGUgaW1hZ2UvdGV4dHVyZSB3ZSdsbCBiZSBtb2RpZnlpbmdcbiAgICAndW5pZm9ybSBzYW1wbGVyMkQgdERpZmZ1c2U7JyxcblxuICAgIC8vIHVzZWQgdG8gZGV0ZXJtaW5lIHRoZSBjb3JyZWN0IHRleGVsIHdlJ3JlIHdvcmtpbmcgb25cbiAgICAndmFyeWluZyB2ZWMyIHZVdjsnLFxuXG4gICAgLy8gZXhlY3V0ZWQsIGluIHBhcmFsbGVsLCBmb3IgZWFjaCBwaXhlbFxuICAgICd2b2lkIG1haW4oKSB7JyxcblxuICAgIC8vIGdldCB0aGUgcGl4ZWwgZnJvbSB0aGUgdGV4dHVyZSB3ZSdyZSB3b3JraW5nIHdpdGggKGNhbGxlZCBhIHRleGVsKVxuICAgICd2ZWM0IHRleGVsID0gdGV4dHVyZTJEKCB0RGlmZnVzZSwgdlV2ICk7JyxcblxuICAgIC8vIGNhbGN1bGF0ZSB0aGUgbmV3IGNvbG9yXG4gICAgJ2Zsb2F0IGdyYXkgPSB0ZXhlbC5yKnJQb3dlciArIHRleGVsLmcqZ1Bvd2VyICsgdGV4ZWwuYipiUG93ZXI7JyxcblxuICAgIC8vIHJldHVybiB0aGlzIG5ldyBjb2xvclxuICAgICdnbF9GcmFnQ29sb3IgPSB2ZWM0KCB2ZWMzKGdyYXkpLCB0ZXhlbC53ICk7JyxcblxuICAgICd9J1xuICBdLmpvaW4oJ1xcbicpXG59XG5cbmV4cG9ydCBjb25zdCBDdXN0b21CaXRTaGFkZXIgPSB7XG4gIHVuaWZvcm1zOiB7XG4gICAgdERpZmZ1c2U6IHsgdHlwZTogJ3QnLCB2YWx1ZTogbnVsbCB9LFxuICAgIGJpdFNpemU6IHsgdHlwZTogJ2knLCB2YWx1ZTogNCB9XG4gIH0sXG5cbiAgdmVydGV4U2hhZGVyOiBbXG4gICAgJ3ZhcnlpbmcgdmVjMiB2VXY7JyxcblxuICAgICd2b2lkIG1haW4oKSB7JyxcblxuICAgICd2VXYgPSB1djsnLFxuICAgICdnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiBtb2RlbFZpZXdNYXRyaXggKiB2ZWM0KCBwb3NpdGlvbiwgMS4wICk7JyxcblxuICAgICd9J1xuICBdLmpvaW4oJ1xcbicpLFxuXG4gIGZyYWdtZW50U2hhZGVyOiBbXG4gICAgJ3VuaWZvcm0gaW50IGJpdFNpemU7JyxcblxuICAgICd1bmlmb3JtIHNhbXBsZXIyRCB0RGlmZnVzZTsnLFxuXG4gICAgJ3ZhcnlpbmcgdmVjMiB2VXY7JyxcblxuICAgICd2b2lkIG1haW4oKSB7JyxcblxuICAgICd2ZWM0IHRleGVsID0gdGV4dHVyZTJEKCB0RGlmZnVzZSwgdlV2ICk7JyxcbiAgICAnZmxvYXQgbiA9IHBvdyhmbG9hdChiaXRTaXplKSwyLjApOycsXG4gICAgJ2Zsb2F0IG5ld1IgPSBmbG9vcih0ZXhlbC5yKm4pL247JyxcbiAgICAnZmxvYXQgbmV3RyA9IGZsb29yKHRleGVsLmcqbikvbjsnLFxuICAgICdmbG9hdCBuZXdCID0gZmxvb3IodGV4ZWwuYipuKS9uOycsXG5cbiAgICAnZ2xfRnJhZ0NvbG9yID0gdmVjNCggdmVjMyhuZXdSLG5ld0csbmV3QiksIDEuMCk7JyxcblxuICAgICd9J1xuICBdLmpvaW4oJ1xcbicpXG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
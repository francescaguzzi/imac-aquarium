/******/ (() => { // webpackBootstrap
/*!***********************************************************!*\
  !*** ./samples/chapters/chapter-11/load-gltf-mushroom.js ***!
  \***********************************************************/
// import { bootstrapMeshScene } from './util/standard-scene'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { applyShadowsAndDepthWrite } from '../../util/modelUtil'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import * as THREE from 'three'
// import { initializeAnimationControls } from '../../controls/animation-controls'

// let animations = []
// const loadModel = () => {
//   const loader = new GLTFLoader()
//   return loader.loadAsync('/assets/models/truffle_man/scene.gltf').then((container) => {
//     container.scene.scale.setScalar(4)
//     container.scene.translateY(-2)
//     applyShadowsAndDepthWrite(container.scene)
//     animations = container.animations
//     return container.scene
//   })
// }

// let mixer = undefined

// bootstrapMeshScene({
//   loadMesh: loadModel,
//   addControls: (camera, renderer, scene, gui, mesh) => {
//     const controls = new OrbitControls(camera, renderer.domElement)
//     mixer = new THREE.AnimationMixer(mesh)
//     const action = mixer.clipAction(animations[0])
//     action.play()

//     initializeAnimationControls(mixer, action, animations[0], gui)

//     return controls
//   },
//   onRender: (clock) => {
//     if (mixer) {
//       mixer.update(clock.getDelta())
//     }
//   }
// }).then()

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvbG9hZC1nbHRmLW11c2hyb29tLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQSxZQUFZLHFCQUFxQjtBQUNqQyxZQUFZLGFBQWE7QUFDekIsWUFBWSw0QkFBNEI7QUFDeEMsWUFBWSxnQkFBZ0I7QUFDNUI7QUFDQSxZQUFZLDhCQUE4Qjs7QUFFMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbHRqcy1mb3VydGgvLi9zYW1wbGVzL2NoYXB0ZXJzL2NoYXB0ZXItMTEvbG9hZC1nbHRmLW11c2hyb29tLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IGJvb3RzdHJhcE1lc2hTY2VuZSB9IGZyb20gJy4vdXRpbC9zdGFuZGFyZC1zY2VuZSdcbi8vIGltcG9ydCB7IEdMVEZMb2FkZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9HTFRGTG9hZGVyJ1xuLy8gaW1wb3J0IHsgYXBwbHlTaGFkb3dzQW5kRGVwdGhXcml0ZSB9IGZyb20gJy4uLy4uL3V0aWwvbW9kZWxVdGlsJ1xuLy8gaW1wb3J0IHsgT3JiaXRDb250cm9scyB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9jb250cm9scy9PcmJpdENvbnRyb2xzJ1xuLy8gaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG4vLyBpbXBvcnQgeyBpbml0aWFsaXplQW5pbWF0aW9uQ29udHJvbHMgfSBmcm9tICcuLi8uLi9jb250cm9scy9hbmltYXRpb24tY29udHJvbHMnXG5cbi8vIGxldCBhbmltYXRpb25zID0gW11cbi8vIGNvbnN0IGxvYWRNb2RlbCA9ICgpID0+IHtcbi8vICAgY29uc3QgbG9hZGVyID0gbmV3IEdMVEZMb2FkZXIoKVxuLy8gICByZXR1cm4gbG9hZGVyLmxvYWRBc3luYygnL2Fzc2V0cy9tb2RlbHMvdHJ1ZmZsZV9tYW4vc2NlbmUuZ2x0ZicpLnRoZW4oKGNvbnRhaW5lcikgPT4ge1xuLy8gICAgIGNvbnRhaW5lci5zY2VuZS5zY2FsZS5zZXRTY2FsYXIoNClcbi8vICAgICBjb250YWluZXIuc2NlbmUudHJhbnNsYXRlWSgtMilcbi8vICAgICBhcHBseVNoYWRvd3NBbmREZXB0aFdyaXRlKGNvbnRhaW5lci5zY2VuZSlcbi8vICAgICBhbmltYXRpb25zID0gY29udGFpbmVyLmFuaW1hdGlvbnNcbi8vICAgICByZXR1cm4gY29udGFpbmVyLnNjZW5lXG4vLyAgIH0pXG4vLyB9XG5cbi8vIGxldCBtaXhlciA9IHVuZGVmaW5lZFxuXG4vLyBib290c3RyYXBNZXNoU2NlbmUoe1xuLy8gICBsb2FkTWVzaDogbG9hZE1vZGVsLFxuLy8gICBhZGRDb250cm9sczogKGNhbWVyYSwgcmVuZGVyZXIsIHNjZW5lLCBndWksIG1lc2gpID0+IHtcbi8vICAgICBjb25zdCBjb250cm9scyA9IG5ldyBPcmJpdENvbnRyb2xzKGNhbWVyYSwgcmVuZGVyZXIuZG9tRWxlbWVudClcbi8vICAgICBtaXhlciA9IG5ldyBUSFJFRS5BbmltYXRpb25NaXhlcihtZXNoKVxuLy8gICAgIGNvbnN0IGFjdGlvbiA9IG1peGVyLmNsaXBBY3Rpb24oYW5pbWF0aW9uc1swXSlcbi8vICAgICBhY3Rpb24ucGxheSgpXG5cbi8vICAgICBpbml0aWFsaXplQW5pbWF0aW9uQ29udHJvbHMobWl4ZXIsIGFjdGlvbiwgYW5pbWF0aW9uc1swXSwgZ3VpKVxuXG4vLyAgICAgcmV0dXJuIGNvbnRyb2xzXG4vLyAgIH0sXG4vLyAgIG9uUmVuZGVyOiAoY2xvY2spID0+IHtcbi8vICAgICBpZiAobWl4ZXIpIHtcbi8vICAgICAgIG1peGVyLnVwZGF0ZShjbG9jay5nZXREZWx0YSgpKVxuLy8gICAgIH1cbi8vICAgfVxuLy8gfSkudGhlbigpXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
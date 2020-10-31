<template>
  <main>
    <div ref="container" class="js-root"></div>
  </main>
</template>

<script>
import * as THREE from 'three'
import SceneInit from './js/Scene.init'

export default {
  mounted() {
    const rootElement = this.$el.querySelector('.js-root')
    this.scene = SceneInit(rootElement)
    // this.setupScene()
  },

  methods: {
    setupScene() {
      let scene, camera, renderer

      // Setup environment
      // initialize scene camera, objects and renderer

      const init = function () {
        // Create scene
        scene = new THREE.Scene()
        scene.background = new THREE.Color(0xababab) // eslint-disable-line

        // Create and locate camera
        camera = new THREE.PerspectiveCamera(
          30,
          window.innerWidth / window.innerHeight,
          1,
          1000
        )
        camera.position.z = 5

        // Create renderer
        renderer = new THREE.WebGLRenderer()
        renderer.setSize(window.innerWidth, window.innerHeight)

        document.body.appendChild(renderer.domElement)
      }

      const mainLoop = function () {
        renderer.render(scene, camera)
        requestAnimationFrame(mainLoop)
      }

      init()
      mainLoop()
    },
  },
}
</script>

<style>
canvas,
div {
  width: 100vw;
  height: 100vh;
}
</style>

<template>
  <main>
    <div ref="container" class="js-root"></div>
  </main>
</template>

<script>
import SceneInit from './js/Scene.init'

export default {
  mounted() {
    const rootElement = this.$el.querySelector('.js-root')
    this.scene = SceneInit(rootElement)
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

import * as THREE from 'three'

/* eslint-disable unicorn/number-literal-case */
class SceneInit {
  constructor(rootEl) {
    this.root = rootEl

    this.width = rootEl.clientWidth
    this.height = rootEl.clientHeight

    this.background = 0x000000

    this.canvas = document.createElement('canvas')

    // Declare globe properties
    this.radius = 0.5
    this.segments = 32
    this.rotation = 1
    this.sphere = null
    this.clouds = null
    this.stars = null

    // Declare textures
    this.globeMapTexturePath = 'images/globe_texture.jpg'
    this.bumpMapPath = 'images/elev_bump_4k.jpg'
    this.specularMapPath = 'images/water_4k.png'
    this.cloudTexturePath = 'images/fair_clouds_4k.png'
    this.starsTexturePath = 'images/galaxy_starfield.png'

    this.init()
    this.update()
    this.bindEvents()
  }

  init() {
    this.initScene()
    this.initCamera()
    this.initRenderer()

    this.root.appendChild(this.canvas)
  }

  initScene() {
    // Handle scene
    this.scene = new THREE.Scene()
    this.scene.add(new THREE.AmbientLight(0x333333))

    // Handle lighting
    this.light = new THREE.DirectionalLight(0xffffff, 1)
    this.light.position.set(5, 3, 5)

    // Import Objects
    this.sphere = this.createSphere(this.radius, this.segments)
    this.clouds = this.createClouds(this.radius, this.segments)
    this.stars = this.createStars(90, 64)

    // Set rotation values for globe and stars
    this.sphere.rotation.y = this.rotation
    this.clouds.rotation.y = this.rotation

    this.scene.add(this.light)
    this.scene.add(this.sphere)
    this.scene.add(this.clouds)
    this.scene.add(this.stars)
  }

  initCamera() {
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.width / this.height,
      0.01,
      1000
    )
    this.camera.position.z = 3
  }

  createSphere(radius, segments) {
    const textureLoader = new THREE.TextureLoader()
    const globeMapTexture = textureLoader.load(this.globeMapTexturePath)
    const bumpMapTexture = textureLoader.load(this.bumpMapPath)
    const specularMapTexture = textureLoader.load(this.specularMapPath)

    return new THREE.Mesh(
      new THREE.SphereGeometry(radius, segments, segments),
      new THREE.MeshPhongMaterial({
        map: globeMapTexture,
        bumpMap: bumpMapTexture,
        bumpScale: 0.005,
        specularMap: specularMapTexture,
        specular: new THREE.Color('grey'),
      })
    )
  }

  createClouds(radius, segments) {
    const textureLoader = new THREE.TextureLoader()
    const cloudTexture = textureLoader.load(this.cloudTexturePath)

    return new THREE.Mesh(
      new THREE.SphereGeometry(radius + 0.003, segments, segments),
      new THREE.MeshPhongMaterial({
        map: cloudTexture,
        transparent: true,
      })
    )
  }

  createStars(radius, segments) {
    const textureLoader = new THREE.TextureLoader()
    const starsTexture = textureLoader.load(this.starsTexturePath)

    return new THREE.Mesh(
      new THREE.SphereGeometry(radius, segments, segments),
      new THREE.MeshBasicMaterial({
        map: starsTexture,
        side: THREE.BackSide,
      })
    )
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(this.width, this.height)
    this.canvas = this.renderer.domElement
  }

  render() {
    this.sphere.rotation.y += 0.00075
    this.clouds.rotation.y += 0.00075
    this.camera.lookAt(this.scene.position)
    this.renderer.render(this.scene, this.camera)
  }

  update() {
    requestAnimationFrame(() => this.update())
    this.render()
  }

  bindEvents() {
    window.addEventListener('resize', () => this.onResize())
  }

  onResize() {
    this.width = this.root.clientWidth
    this.height = this.root.clientHeight

    this.renderer.setSize(this.width, this.height)

    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()
  }
}

// To call our class as a function
const sceneInit = (args) => new SceneInit(args)

export default sceneInit

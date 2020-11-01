import * as THREE from 'three'

/* eslint-disable unicorn/number-literal-case */
class SceneInit {
  constructor(rootEl) {
    this.root = rootEl

    this.width = rootEl.clientWidth
    this.height = rootEl.clientHeight

    this.background = 0x000000

    this.canvas = document.createElement('canvas')

    this.init()
    this.update()
    this.bindEvents()
  }

  init() {
    this.initScene()
    // this.initLights()
    this.initCamera()
    this.initGeometry()
    this.initRenderer()

    this.root.appendChild(this.canvas)
  }

  initScene() {
    this.scene = new THREE.Scene()
  }

  initLights() {
    const ambient = new THREE.AmbientLight(0xffffff, 0.9)
    const point = new THREE.PointLight(0xcccccc, 0.1, 10)
    const directional = new THREE.DirectionalLight(0xffffff, 0.5)

    this.scene.add(ambient)
    this.scene.add(point)
    this.scene.add(directional)
  }

  initCamera() {
    const aspect = this.width / this.height
    this.camera = new THREE.PerspectiveCamera(75, aspect, 1, 1000)
    this.camera.position.z = 20

    // Next line originates from example
    // this.camera = new THREE.PerspectiveCamera(45, aspect, 1, 1000)

    // this.camera.position.x = 2
    // this.camera.position.y = 2
    // this.camera.aspect = aspect
    // this.camera.updateProjectionMatrix()
  }

  initGeometry() {
    const globeTextureURI =
      'https://2.bp.blogspot.com/-Jfw4jY6vBWM/UkbwZhdKxuI/AAAAAAAAK94/QTmtnuDFlC8/s1600/2_no_clouds_4k.jpg'
    this.loader = new THREE.TextureLoader()
    this.loader.load(globeTextureURI, function (texture) {
      const geometry = new THREE.SphereGeometry(5, 30, 30)
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        overdraw: 0.5,
      })
      const mesh = new THREE.Mesh(geometry, material)
      const group = new THREE.Group()
      group.add(mesh)
    })

    // this.material = new THREE.MeshBasicMaterial({
    //   color: 0xffffff,
    //   wireframe: true,
    // })
    // this.sphere = new THREE.Mesh(this.geometry, this.material)
    // this.scene.add(this.sphere)
    this.add = 0
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(this.width, this.height)
    this.renderer.setClearColor(this.background, 1)

    this.canvas = this.renderer.domElement
  }

  render() {
    // this.sphere.rotation.y = this.add
    // this.add += 0.02

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

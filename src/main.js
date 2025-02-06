import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import Paddle from './Paddle'
import Ball from './Ball'
import Arena from './Arena'

const game = {
	height: window.innerHeight - 20,
	width: window.innerWidth - 20,
	mode: "PVE", // "PVP",
	cam: "LARGE", // "SOLO", // "DOUBLE",
}

const camI = {
	left: new THREE.Vector3(0, 20, 45),
	right: new THREE.Vector3(0, 20, -45),
	all: new THREE.Vector3(50, 35, 0),
}

const key = {}

document.addEventListener("keydown", (event) => {
	key[event.code] = true
})
document.addEventListener("keyup", (event) => {
	key[event.code] = false
	if (event.code == "KeyP") pong.switchCamera()
})

class Pong
{
	constructor(scene, camera, renderer) {
		this.scene = scene
		this.camera = camera
		this.renderer = renderer
		this.cam = game.cam

		this.arena = new Arena(this.scene)
		this.paddle1 = new Paddle(this.scene, 0)
		this.paddle2 = new Paddle(this.scene, 1)
		this.ball = new Ball(this.scene)

		requestAnimationFrame(this.animate.bind(this))
	}

	switchCamera() {
		if (game.mode == "PVP") {
			if (this.cam == "LARGE") this.cam = "DOUBLE"
			else if (this.cam == "DOUBLE") this.cam = "LARGE"
		}
		else if (game.mode == "PVE") {
			if (this.cam == "LARGE") this.cam = "SOLO"
			else if (this.cam == "SOLO") this.cam = "LARGE"
		}
	}

	animate() {
		this.renderer.clear()
		if (game.mode == "PVP") {
			if (this.cam == "LARGE") {
				this.renderer.setViewport(0, 0, game.width, game.height)
				this.renderer.render(this.scene, this.camera[0])
			}
			else if (this.cam == "DOUBLE") {
				this.renderer.setScissorTest(true)
				this.renderer.setViewport(0, 0, game.width / 2, game.height)
				this.renderer.setScissor(0, 0, game.width / 2, game.height)
				this.renderer.render(this.scene, this.camera[1])
				this.renderer.setViewport(game.width / 2, 0, game.width / 2, game.height)
				this.renderer.setScissor(game.width / 2, 0, game.width / 2, game.height)
				this.renderer.render(this.scene, this.camera[2])
				this.renderer.setScissorTest(false)
			}
		}
		else if (game.mode == "PVE")
		{
			if (this.cam == "LARGE") this.renderer.render(this.scene, this.camera[0])
			else if (this.cam == "SOLO") this.renderer.render(this.scene, this.camera[1])
		}
		requestAnimationFrame(this.animate.bind(this))
	}
}

/*function collision(obj1, obj2) {
	const elem1 = new THREE.Box3().setFromObject(obj1)
	const elem2 = new THREE.Box3().setFromObject(obj2)
	if (elem1.intersectsBox(elem2)) return true
	else return false
}*/

const scene = new THREE.Scene()

const camera = []
let cam

for (let i = 0; i < 3; i++) {
	if (!i) cam = new THREE.PerspectiveCamera(60, game.width / game.height, 0.1)
	else cam = new THREE.PerspectiveCamera(60, game.width / game.height, 0.1)
	if (!i) cam.position.copy(camI.all);
	else if (i == 1) cam.position.copy(camI.left);
	else cam.position.copy(camI.right);
	cam.lookAt(0, 0, 0)
	camera.push(cam)
}

/*const camera = new THREE.PerspectiveCamera(60, game.width / game.height, 0.1)
camera.position.set(50, 35, 0)
camera.lookAt(0, 0, 0)*/

/*const renderer = []
let rend

for (let i = 0; i < 3; i++) {
	rend = new THREE.WebGLRenderer({antialias: window.devicePixelRatio < 2})
	rend.shadowMap.enabled = true
	rend.toneMapping = THREE.ACESFilmicToneMapping
	rend.toneMappingExposure = 1.2
	rend.shadowMap.type = THREE.VSMShadowMap
	if (!i) rend.setSize(game.width, game.height)
	else rend.setSize(game.width / 2, game.height)
	renderer.push(rend)
}*/

const renderer = new THREE.WebGLRenderer({antialias: window.devicePixelRatio < 2})
renderer.shadowMap.enabled = true
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.2
renderer.shadowMap.type = THREE.VSMShadowMap
renderer.setSize(game.width, game.height)

document.getElementById("all").appendChild(renderer.domElement)
//document.getElementById("left").appendChild(renderer[1].domElement)
//document.getElementById("right").appendChild(renderer[2].domElement)

//window.addEventListener('resize', resize, false)

//const control = new OrbitControls(camera1, renderer.domElement)
//control.enableDamping = true

const pong = new Pong(scene, camera, renderer)

/*function resize() {
	game.width = window.innerWidth - 20
	game.height = window.innerHeight - 20
	renderer.setSize(game.width, game.height)
	if (game.mode == "PVP")
	{
		camera1.aspect = game.width / 2 / game.height
		camera1.updateProjectionMatrix()
		camera2.aspect = game.width / 2 / game.height
		camera2.updateProjectionMatrix()
		camera3.aspect = game.width / game.height
		camera3.updateProjectionMatrix()
	}
	else
	{
		camera1.aspect = game.width / game.height
		camera1.updateProjectionMatrix()
		camera3.aspect = game.width / game.height
		camera3.updateProjectionMatrix()
	}

}*/
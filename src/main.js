import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import Paddle from './Paddle'
import Ball from './Ball'
import Arena from './Arena'

const game = {
	height: window.innerHeight - 20,
	width: window.innerWidth - 20,
	mode: "PVP", // "PVE",
	cam: "LARGE", // "SOLO", // "DOUBLE",
}

const cam = {
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
	constructor() {
		this.scene = scene
		this.renderer = renderer
		this.cam = game.cam

		this.arena = new Arena(scene)
		this.paddle1 = new Paddle(scene, 0)
		this.paddle2 = new Paddle(scene, 1)
		this.ball = new Ball(scene)

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
				this.renderer.render(this.scene, camera3)
			}
			else if (this.cam == "DOUBLE") {
				
				this.renderer.setViewport(0, 0, game.width / 2, game.height)
				this.renderer.render(this.scene, camera1)
				this.renderer.setViewport(game.width / 2 + 200, 0, game.width / 2, game.height)
				this.renderer.render(this.scene, camera2)
			}
		}
		else if (game.mode == "PVE")
		{
			if (this.cam == "LARGE") this.renderer.render(this.scene, camera3)
			else if (this.cam == "SOLO") this.renderer.render(this.scene, camera1)
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

const camera1 = new THREE.PerspectiveCamera(60, game.width / game.height, 0.1)
camera1.position.set(0, 20, 45)

const camera2 = new THREE.PerspectiveCamera(60, game.width / game.height, 0.1)
camera2.position.set(0, 20, -45)

const camera3 = new THREE.PerspectiveCamera(60, game.width / game.height, 0.1)
camera3.position.set(50, 35, 0)

const renderer = new THREE.WebGLRenderer({
	antialias: window.devicePixelRatio < 2,
})
renderer.setSize(game.width, game.height)
renderer.shadowMap.enabled = true
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.2
renderer.shadowMap.type = THREE.VSMShadowMap

document.body.appendChild(renderer.domElement)

window.addEventListener('resize', resize, false)

//const control = new OrbitControls(camera1, renderer.domElement)
//control.enableDamping = true

const pong = new Pong(scene)

function resize() {
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

}
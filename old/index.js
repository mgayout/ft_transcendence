import * as THREE from 'three';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import Paddle from './Paddle'
import Ball from './Ball'
import Arena from './Arena'

const game = {
	height: window.innerHeight - 20,
	width: window.innerWidth - 20,
	mode: "PVP", // "PVP",
	cam: "LARGE", // "SOLO", // "DOUBLE",
	player1: 0,
	player2: 0,
}

const camI = {
	PVEL: new THREE.Vector3(0, 20, 45),
	PVER: new THREE.Vector3(0, 20, -45),
	PVPL: new THREE.Vector3(0, 20, 40),
	PVPR: new THREE.Vector3(0, 20, -40),
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
			else if (this.cam == "DOUBLE") {
				this.cam = "LARGE"
				this.renderer.setViewport(0, 0, game.width, game.height)
			}
		}
		else if (game.mode == "PVE") {
			this.renderer.setViewport(0, 0, game.width, game.height)
			if (this.cam == "LARGE") this.cam = "SOLO"
			else if (this.cam == "SOLO") this.cam = "LARGE"
		}
	}

	splitScreen() {
		this.renderer.setScissorTest(true)
		this.renderer.setViewport(0, 0, game.width / 2, game.height)
		this.renderer.setScissor(0, 0, game.width / 2, game.height)
		this.renderer.render(this.scene, this.camera[1])
		this.renderer.setViewport(game.width / 2, 0, game.width / 2, game.height)
		this.renderer.setScissor(game.width / 2, 0, game.width / 2, game.height)
		this.renderer.render(this.scene, this.camera[2])
		this.renderer.setScissorTest(false)
	}

	animate() {
	
		this.playerUpdate()
		if (game.mode == "PVE") this.aiUpdate()
		this.ballUpdate()

		//this.renderer.clear()
		if (game.mode == "PVP" && this.cam == "LARGE") this.renderer.render(this.scene, this.camera[0])
		else if (game.mode == "PVP" && this.cam == "DOUBLE") this.splitScreen()
		else if (game.mode == "PVE" && this.cam == "LARGE") this.renderer.render(this.scene, this.camera[0])
		else if (game.mode == "PVE" && this.cam == "SOLO") this.renderer.render(this.scene, this.camera[1])

		requestAnimationFrame(this.animate.bind(this))
	}

	playerUpdate() {
		if (((this.cam == "LARGE" && key["KeyW"]) || (this.cam != "LARGE" && key["KeyA"]))
			&& !collision(this.paddle1.paddle, this.arena.walls[1])) this.paddle1.up()
		if (((this.cam == "LARGE" && key["KeyS"]) || (this.cam != "LARGE" && key["KeyD"]))
			&& !collision(this.paddle1.paddle, this.arena.walls[0])) this.paddle1.down()
		if (game.mode == "PVP" && (((this.cam == "LARGE" && key["ArrowUp"]) || (this.cam != "LARGE"
			&& key["ArrowRight"])) && !collision(this.paddle2.paddle, this.arena.walls[1]))) this.paddle2.up()
		if (game.mode == "PVP" && (((this.cam == "LARGE" && key["ArrowDown"]) || (this.cam != "LARGE"
			&& key["ArrowLeft"])) && !collision(this.paddle2.paddle, this.arena.walls[0]))) this.paddle2.down()
	}

	aiUpdate() {
		if (this.ball.ball.position.x < this.paddle2.paddle.position.x && !collision(this.paddle2.paddle, this.arena.walls[1])) this.paddle2.up()
		if (this.ball.ball.position.x > this.paddle2.paddle.position.x && !collision(this.paddle2.paddle, this.arena.walls[0])) this.paddle2.down()
	}

	ballUpdate() {
		if (collision(this.ball.ball, this.arena.delimiters[0])) this.reset("player1")
		else if (collision(this.ball.ball, this.arena.delimiters[1])) this.reset("player2")
		if (collision(this.ball.ball, this.arena.walls[0]) || collision(this.ball.ball, this.arena.walls[1])) this.ball.ball.velocity.x *= -1
		if (collision(this.ball.ball, this.paddle1.paddle) || collision(this.ball.ball, this.paddle2.paddle)) {
			this.ball.ball.velocity.z *= -1.05
		}
		this.ball.ball.position.add(this.ball.ball.velocity)
	}

	reset (winner) {
		if (winner == "player1") game.player1 += 1
		else if (winner == "player2") game.player2 += 1
		this.ball.reset()
		for (let i = 0; i < 2; i++)
			this.scene.remove(this.arena.scores[i])
		this.arena.setScore(game.player1, game.player2)
	}
}

function collision(obj1, obj2) {
	const elem1 = new THREE.Box3().setFromObject(obj1)
	const elem2 = new THREE.Box3().setFromObject(obj2)
	if (elem1.intersectsBox(elem2)) return true
	else return false
}

const scene = new THREE.Scene()

const camera = []
let cam

for (let i = 0; i < 3; i++) {
	if (!i) cam = new THREE.PerspectiveCamera(60, game.width / game.height, 0.1)
	else cam = new THREE.PerspectiveCamera(60, game.width / game.height, 0.1)
	if (!i) cam.position.copy(camI.all)
	if (i == 1 && game.mode == "PVP") cam.position.copy(camI.PVPL)
	else if (i == 1 && game.mode == "PVE") cam.position.copy(camI.PVEL)
	if (i == 2 && game.mode == "PVP") cam.position.copy(camI.PVPR)
	else if (i == 2 && game.mode == "PVE") cam.position.copy(camI.PVER)
	cam.lookAt(0, 0, 0)
	camera.push(cam)
}

const renderer = new THREE.WebGLRenderer({antialias: window.devicePixelRatio < 2})
renderer.shadowMap.enabled = true
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.2
renderer.shadowMap.type = THREE.VSMShadowMap
renderer.setSize(game.width, game.height)

const container = document.getElementById('threejs-container');
container.appendChild(renderer.domElement);


//document.getElementById("all").appendChild(renderer.domElement)

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
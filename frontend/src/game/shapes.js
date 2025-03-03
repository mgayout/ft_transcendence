import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { AmbientLight, DirectionalLight } from 'three'

export const setFloor = (scene) => {
	const geometry = new THREE.PlaneGeometry(300, 300)
	const material = new THREE.MeshStandardMaterial({color: 0x7fdce2})
	const floor = new THREE.Mesh(geometry, material)
	floor.position.set(0, -1.5, 0)
	floor.rotateX(-Math.PI * 0.5)
	floor.receiveShadow = true
	scene.add(floor)
	return floor
}

export const setFog = (scene) => {
	const bg = new THREE.Color(0x326e72)
	const fog = new THREE.Fog(0x326e72, 15, 150)
	scene.background = bg
	scene.fog = fog
	return {bg, fog}
}

export const setLine = (scene) => {
	let lines = [], geometry, material, line, n = 20
	for (let i = 1; i < n; i++) {
		geometry = new THREE.PlaneGeometry(0.8, 0.5)
		material = new THREE.MeshBasicMaterial({color: 0x2a484a})
		line = new THREE.Mesh(geometry, material)
		line.position.set(17 - (i * ((17 * 2) / n)), -1.4, 0)
		line.rotateX(-Math.PI * 0.5)
		scene.add(line)
		lines.push(line)
	}
	return {lines, n}
}

export const setPilar = (scene, splitScreen) => {
	const geometry = new THREE.TubeGeometry( new THREE.CatmullRomCurve3([
		new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(0, 15, 0),
		new THREE.Vector3(-11, 18, 0),
	], false), 64, 0.5, 16, false)
	const material = new THREE.MeshStandardMaterial({color: 0xDDDDDD})
	const pilarL = new THREE.Mesh(geometry, material)
	pilarL.castShadow = true
	pilarL.receiveShadow = true
	const pilarR = pilarL.clone()
	if (splitScreen) {
		pilarL.position.set(17, 0, 0)
		pilarR.position.set(-17, 0, 0)
		pilarR.rotateY(-Math.PI)
	}
	else {
		pilarL.position.set(-17, 0, 17)
		pilarR.position.set(-17, 0, -17)
		pilarL.rotateY(-Math.PI / 2)
		pilarR.rotateY(Math.PI / 2)
	}
	scene.add(pilarL)
	scene.add(pilarR)
	return {pilarL, pilarR}
}

export const setBorder = (scene, splitScreen) => {
	const geometry = new THREE.TubeGeometry( new THREE.CatmullRomCurve3([
		new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(5, 0, 0),
		new THREE.Vector3(5, 5, 0),
		new THREE.Vector3(-5, 5, 0),
		new THREE.Vector3(-5, 0, 0),
	], true), 64, 0.5, 16, true)
	const material = new THREE.MeshStandardMaterial({color: 0xDDDDDD})
	const border = new THREE.Mesh(geometry, material)
	border.castShadow = true
	border.receiveShadow = true
	if (splitScreen)
		border.position.set(0, 15, 0)
	else {
		border.position.set(-17, 15, 0)
		border.rotateY(-Math.PI / 2)
	}
	scene.add(border)
	return border
}

export const setBScreen = (scene, splitScreen) => {
	const geometry = new THREE.PlaneGeometry(10.5, 6)
	const material = new THREE.MeshStandardMaterial({color: 0x000000})
	const bscreenL = new THREE.Mesh(geometry, material)
	bscreenL.castShadow = true
	bscreenL.receiveShadow = true
	if (splitScreen ? bscreenL.position.set(0, 17.6, 0) : bscreenL.position.set(-17, 17.6, 0)) {}
	const bscreenR = bscreenL.clone()
	if (splitScreen)
		bscreenR.rotateY(Math.PI)
	else {
		bscreenL.rotateY(-Math.PI / 2)
		bscreenR.rotateY(Math.PI / 2)
	}
	scene.add(bscreenL)
	scene.add(bscreenR)
	return {bscreenL, bscreenR}
}

export const setLight = (scene) => {
	const ambientLight = new AmbientLight(0xffffff, 0.6)
	const dirLight = new DirectionalLight(0xffffff, 0.7)

	dirLight.position.set(0, 20, 0)
	dirLight.castShadow = true
	dirLight.shadow.mapSize.set(1024, 1024)
	dirLight.shadow.camera.top = 35
	dirLight.shadow.camera.bottom = -35
	dirLight.shadow.camera.left = -30
	dirLight.shadow.camera.right = 30
	dirLight.shadow.radius = 10
	dirLight.shadow.blurSamples = 20
	scene.add(ambientLight, dirLight)
	return {ambientLight, dirLight}
}

export const setPaddle = (scene, type) => {
	const geometry = new RoundedBoxGeometry(5, 1, 1, 5, 0.1)
	const material = new THREE.MeshStandardMaterial({color: 0x2a484a})
	const paddle = new THREE.Mesh(geometry, material)
	paddle.castShadow = true
	paddle.receiveShadow = true
	paddle.position.set(0, 1, (type == "left" ? -30 : 30))
	scene.add(paddle)
	return paddle
}

export const setWall = (scene, type) => {
	const geometry = new RoundedBoxGeometry(1, 2, 62, 5, 0.5)
	const material = new THREE.MeshStandardMaterial({color: 0xDDDDDD})
	const wall = new THREE.Mesh(geometry, material)
	wall.castShadow = true
	wall.receiveShadow = true
	wall.position.set((type == "left" ? 17 : -17), 0, 0)
	scene.add(wall)
	return wall
}

export const setDelimiter = (scene, type) => {
	const geometry = new RoundedBoxGeometry(68, 2, 1, 5, 0.5)
	//const material = new THREE.MeshStandardMaterial({color: 0xFFFFFF})
	const material = new THREE.MeshStandardMaterial({
		transparent: true,
		opacity: 0
	})
	const delimiter = new THREE.Mesh(geometry, material)
	delimiter.position.set(0, 0, (type == "left" ? 35 : -35))
	scene.add(delimiter)
	return delimiter
}

export const setBall = (scene) => {
	const geometry = new RoundedBoxGeometry(1, 1, 1, 5, 0.5)
	const material = new THREE.MeshStandardMaterial({color: 0xffaa00})
	const ball = new THREE.Mesh(geometry, material)
	ball.castShadow = true
	ball.receiveShadow = true
	ball.position.set(0, 1, 0)
    ball.velocity = new THREE.Vector3((Math.random() > 0.5 ? 1 : -1) * 0.1, 0, (Math.random() > 0.5 ? 1 : -1) * 0.1)
	scene.add(ball)
	return ball
}

export const setScore = (scene) => {
	return score
}
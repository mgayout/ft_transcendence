import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

const padI = {
	size: new THREE.Vector3(5, 1, 1),
	pos: new THREE.Vector3(0, 1, -20),
	color: 0x2a484a,
	speed: 0.1,
}

export default class Paddle {
	constructor(scene, type) {
		let geometry, material, paddle
		geometry = new RoundedBoxGeometry(padI.size.x, padI.size.y, padI.size.z, 5, 0.1)
		material = new THREE.MeshStandardMaterial({color: padI.color})
		paddle = new THREE.Mesh(geometry, material)
		paddle.castShadow = true
		paddle.receiveShadow = true
		if (type) paddle.position.copy(padI.pos)
		else paddle.position.copy(new THREE.Vector3(padI.pos.x, padI.pos.y, -padI.pos.z))
		scene.add(paddle)
		this.paddle = paddle;
	}

	up() {
		this.paddle.position.x -= padI.speed
	}

	down() {
		this.paddle.position.x += padI.speed
	}
}
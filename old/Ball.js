import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

const balI = {
	size: new THREE.Vector3(1, 1, 1),
	pos: new THREE.Vector3(0, 1, 0),
	color: 0xffaa00,
	speed: 0.1,
}

export default class Ball {
	constructor(scene) {
		let geometry, material, ball
		geometry = new RoundedBoxGeometry(balI.size.x, balI.size.y, balI.size.z, 5, 0.5)
		material = new THREE.MeshStandardMaterial({color: balI.color})
		ball = new THREE.Mesh(geometry, material)
		ball.castShadow = true
		ball.receiveShadow = true
		ball.position.copy(balI.pos)
    	ball.velocity = new THREE.Vector3((Math.random() > 0.5 ? 1 : -1) * balI.speed, 0, (Math.random() > 0.5 ? 1 : -1) * balI.speed)
		scene.add(ball)
		this.ball = ball
	}

	reset() {
		this.ball.position.x = balI.pos.x
		this.ball.position.z = balI.pos.z
		this.ball.velocity.x = (Math.random() > 0.5 ? 1 : -1) * balI.speed
		this.ball.velocity.z = (Math.random() > 0.5 ? 1 : -1) * balI.speed
	}
}
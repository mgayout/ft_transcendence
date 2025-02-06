import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry'

const balI = {
	size: new THREE.Vector3(1, 1, 1),
	pos: new THREE.Vector3(0, 1, 0),
	color: 0xffaa00,
	speed: 0.05,
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
		let angle = (Math.random() * Math.PI / 2) - Math.PI / 4;
    	let directionX = Math.random() < 0.5 ? -1 : 1;
    	ball.velocity = new THREE.Vector2(
        	Math.cos(angle) * balI.speed * directionX,
        	Math.sin(angle) * balI.speed
    	);
		scene.add(ball)
		this.ball = ball
	}
}
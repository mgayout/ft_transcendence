import { useEffect } from 'react'
import * as THREE from 'three'
import { setFloor, setFog, setLine, setPilar, setBorder, setBScreen, setLight, setPaddle, setWall, setBall } from './shapes'

const setAll = (scene, state) => {

	const floor = setFloor(scene)
	const fog = setFog(scene)
	const line = setLine()
	//const pilar = setPilar()
	//const border = setBorder()
	//const bscreen = setBScreen()
	const light = setLight(scene)
	const paddle1 = setPaddle("left")
	const paddle2 = setPaddle("right")
	//const wall1 = setWall("left")
	//const wall2 = setWall("right")
	const ball = setBall()

	if (state == "play") {
		/*for (let i = 0; i < line.n; i++)
			scene.add(line.cubes[i])*/
		//scene.add(pilar.pilarL, pilar.pilarR, border, bscreen)
		scene.add(paddle1, paddle2/*, wall1, wall2*/, ball)
	}
	return {floor, fog, line, /*pilar, border, bscreen,*/ light, paddle1, paddle2, /*wall1, wall2,*/ ball}
}

const createCanva = (canva, state, lastPongMessage) => {
	
	const scene = new THREE.Scene()

	const camera = new THREE.PerspectiveCamera(60, canva.width / canva.height, 0.1)
	camera.position.set(35, 55, 20) //
	camera.lookAt(35, 0, 0) //
	camera.rotation.z = Math.PI
	
	const renderer = new THREE.WebGLRenderer({ canvas: canva, antialias: true })
	renderer.shadowMap.enabled = true
	renderer.shadowMap.type = THREE.VSMShadowMap
	renderer.toneMapping = THREE.ACESFilmicToneMapping
	renderer.toneMappingExposure = 1.2
	renderer.setSize(canva.width, canva.height)

	const objects = setAll(scene, state)

	let animationFrameId

	const animate = () => {
		
		objects.paddle1.position.set(0, lastPongMessage ? lastPongMessage.paddleL : 15, 1)
		objects.paddle2.position.set(70, lastPongMessage ? lastPongMessage.paddleR : 15, 1)
		objects.ball.position.set(lastPongMessage ? lastPongMessage.x : 35, lastPongMessage ? lastPongMessage.y : 15, 1)

		renderer.render(scene, camera)
		animationFrameId = requestAnimationFrame(animate)
	}

	animate()

	const dispose = () => {
		cancelAnimationFrame(animationFrameId);
		if (objects.floor.current) {
			objects.floor.current.geometry.dispose()
			objects.floor.current.material.dispose()
			scene.remove(objects.floor.current)
		}
		if (objects.fog.current) {
			objects.fog.current.geometry.dispose()
			objects.fog.current.material.dispose()
			scene.remove(objects.fog.current)
		}
		if (objects.line.current) {
			for (let i = 0; i < objects.line.current.n; i++) {
				objects.line.current.cubes[i].geometry.dispose()
				objects.line.current.cubes[i].material.dispose()
				scene.remove(objects.line.current.cubes[i])
			}
		}
		/*if (objects.pilar.current) {
			objects.pilar.current.pilarL.geometry.dispose()
			objects.pilar.current.pilarR.geometry.dispose()
			objects.pilar.current.pilarL.material.dispose()
			objects.pilar.current.pilarR.material.dispose()
			scene.remove(objects.pilar.current.pilarL)
			scene.remove(objects.pilar.current.pilarR)
		}
		if (objects.border.current) {
			objects.border.current.geometry.dispose()
			objects.border.current.material.dispose()
			scene.remove(objects.border.current)
		}
		if (objects.bscreen.current) {
			objects.bscreen.current.geometry.dispose()
			objects.bscreen.current.material.dispose()
			scene.remove(objects.bscreen.current)
		}*/
		if (objects.light.current) {
			scene.remove(objects.light.ambientLight)
			objects.light.ambientLight.dispose()
			objects.light.current.material.dispose()
			scene.remove(objects.light.current)
			objects.light.cornerLights.forEach(light => {
				scene.remove(objects.light)
				objects.light.dispose()
			})
		}
		if (objects.paddle1.current) {
			objects.paddle1.current.geometry.dispose()
			objects.paddle1.current.material.dispose()
			scene.remove(objects.paddle1.current)
		}
		if (objects.paddle2.current) {
			objects.paddle2.current.geometry.dispose()
			objects.paddle2.current.material.dispose()
			scene.remove(objects.paddle2.current)
		}
		if (objects.ball.current) {
			objects.ball.current.geometry.dispose()
			objects.ball.current.material.dispose()
			scene.remove(objects.ball.current)
		}
		renderer.dispose()
		//ajouter les walls
	}

	return {dispose, renderer, camera};
};

export default createCanva
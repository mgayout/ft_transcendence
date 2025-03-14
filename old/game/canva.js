import * as THREE from 'three';
import { setFloor, setFog, setLine, setPilar, setBorder, setBScreen, setLight, setPaddle, setWall, setDelimiter, setBall/*, setScore*/ } from './shapes';

const setCameras = () => {
	const wd = new THREE.Vector2(800, 650)
	const camL = new THREE.PerspectiveCamera(60, wd.x / wd.y, 0.1)
	const camR = new THREE.PerspectiveCamera(60, wd.x / wd.y, 0.1)
	camL.position.set(0, 20, 45)
	camR.position.set(0, 20, -45)
	camL.lookAt(0, 0, 0)
	camR.lookAt(0, 0, 0)
	return {camL, camR}
}

const setCamera = () => {
	const wd = new THREE.Vector2(1500, 650)
	const camT = new THREE.PerspectiveCamera(60, wd.x / wd.y, 0.1)
	camT.position.set(40, 20, 0)
	camT.lookAt(0, 5, 0)
	return camT
}

const setRenderers = (canvaL, canvaR) => {
	const wd = new THREE.Vector2(800, 650)
	const rdrL = new THREE.WebGLRenderer({ canvas: canvaL.current, antialias: true })
	const rdrR = new THREE.WebGLRenderer({ canvas: canvaR.current, antialias: true })
	rdrL.shadowMap.enabled = true
	rdrR.shadowMap.enabled = true
	rdrL.toneMapping = THREE.ACESFilmicToneMapping
	rdrR.toneMapping = THREE.ACESFilmicToneMapping
	rdrL.toneMappingExposure = 1.2
	rdrR.toneMappingExposure = 1.2
	rdrL.shadowMap.type = THREE.VSMShadowMap
	rdrR.shadowMap.type = THREE.VSMShadowMap
	rdrL.setSize(wd.x, wd.y)
	rdrR.setSize(wd.x, wd.y)
	return {rdrL, rdrR}
}

const setRenderer = (canvaT) => {
	const wd = new THREE.Vector2(1500, 650)
	const rdrT = new THREE.WebGLRenderer({ canvas: canvaT.current, antialias: true })
	rdrT.shadowMap.enabled = true
	rdrT.toneMapping = THREE.ACESFilmicToneMapping
	rdrT.toneMappingExposure = 1.2
	rdrT.shadowMap.type = THREE.VSMShadowMap
	rdrT.setSize(wd.x, wd.y)
	return rdrT
}

const setArena = (scene, splitScreen) => {

	const floor = setFloor(scene)
	const fog = setFog(scene)
	const line = setLine(scene)
	const pilar = setPilar(scene, splitScreen)
	const border = setBorder(scene, splitScreen)
	const bscreen = setBScreen(scene, splitScreen)
	const light = setLight(scene)

	return {floor, fog, line, pilar, border, bscreen, light}
}

const setAll = (scene, paddles, walls, delimiters, ball) => {

	paddles.pad1.mesh = setPaddle(scene, "left")
	paddles.pad2.mesh = setPaddle(scene, "right")
	walls.wall1 = setWall(scene, "left")
	walls.wall2 = setWall(scene, "right")
	delimiters.delim1 = setDelimiter(scene, "left")
	delimiters.delim2 = setDelimiter(scene, "right")
	ball = setBall(scene)
	//score = setScore(scene)
}

const createCanva = (canvas, splitScreen, paddles, walls, delimiters, ball) => {
	
	const scene = new THREE.Scene()

	const camera = (splitScreen ? setCameras() : setCamera())
	const renderer = (splitScreen ? setRenderers(canvas.canvaL, canvas.canvaR) : setRenderer(canvas.canvaT))

	const tab = setArena(scene, splitScreen)
	setAll(scene, paddles.current, walls.current, delimiters.current, ball);

	let animationFrameId;

	const animate = () => {
		if (splitScreen) {
			renderer.rdrL.render(scene, camera.camL)
			renderer.rdrR.render(scene, camera.camR)
		}
		else
			renderer.render(scene, camera)
		animationFrameId = requestAnimationFrame(animate)
	};

	animationFrameId = requestAnimationFrame(animate);

	/*const dispose = () => {
		cancelAnimationFrame(animationFrameId);
		if (paddle1.current) {
			paddle1.current.geometry.dispose();
			paddle1.current.material.dispose();
			scene.remove(paddle1.current);
		}
		if (paddle2.current) {
			paddle2.current.geometry.dispose();
			paddle2.current.material.dispose();
			scene.remove(paddle2.current);
		}
		if (ball.current) {
			ball.current.geometry.dispose();
			ball.current.material.dispose();
			scene.remove(ball.current);
		}

		walls.forEach(wall => {
			wall.geometry.dispose();
			wall.material.dispose();
			scene.remove(wall);
		});

		scene.remove(lights.ambientLight);
		lights.ambientLight.dispose();
		lights.cornerLights.forEach(light => {
			scene.remove(light);
			light.dispose();
		});
		renderer.dispose();
	}*/

	return {renderer, camera/*, dispose*/};
};

export default createCanva
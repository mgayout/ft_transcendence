import React, { useEffect, useRef, useState } from "react"
import createCanva from "./canva";
import {
	BackGround,
	Canva,
} from "../../styles/Game";

const Game = () => {

	const canvas = {
		canvaL: useRef(null),
		canvaR: useRef(null),
		canvaT: useRef(null)}
	const paddles = useRef({
		pad1: {mesh: useRef(null), key: {up: false, down: false}},
		pad2: {mesh: useRef(null), key: {up: false, down: false}}})
	const walls = useRef({
		wall1: null,
		wall2: null})
	const delimiters = useRef({
		delim1: null,
		delim2: null})
	const ball = useRef(null)

	const [started, setStarted] = useState(false);
	const [splitScreen, setSplitScreen] = useState(false);

	useEffect(() => {
		const { renderer, camera/*, dispose*/ } = createCanva(canvas, splitScreen, paddles, walls, delimiters, ball)
		/*const handleResize = () => {
			renderer.setSize(terrain.WIDTH, terrain.HEIGHT);
			camera.aspect = terrain.WIDTH / terrain.HEIGHT;
			camera.updateProjectionMatrix();
		}
		
		window.addEventListener('resize', handleResize);*/
		setStarted(true)
		//console.log("hello")
		return () => {
			//window.removeEventListener('resize', handleResize);
			//dispose();
		}
	}, [])

	useEffect(() => {
		const keyPressed = event => {
			if ((event.key === 'ArrowUp' && !splitScreen)
				|| (event.key == 'ArrowLeft' && splitScreen))
				paddles.current.pad1.key.up = true
			if ((event.key === 'ArrowDown' && !splitScreen)
				|| (event.key == 'ArrowRight' && splitScreen))
				paddles.current.pad1.key.down = true
			if ((event.key === 'z' && !splitScreen)
				|| (event.key == 'q' && splitScreen))
				paddles.current.pad2.key.up = true
			if ((event.key === 's' && !splitScreen)
				|| (event.key == 'd' && splitScreen))
				paddles.current.pad2.key.down = true
		}

		const keyReleased = event => {
			if ((event.key === 'ArrowUp' && !splitScreen)
				|| (event.key == 'ArrowLeft' && splitScreen))
				paddles.current.pad1.key.up = false
			if ((event.key === 'ArrowDown' && !splitScreen)
				|| (event.key == 'ArrowRight' && splitScreen))
				paddles.current.pad1.key.down = false
			if ((event.key === 'z' && !splitScreen)
				|| (event.key == 'q' && splitScreen))
				paddles.current.pad2.key.up = false
			if ((event.key === 's' && !splitScreen)
				|| (event.key == 'd' && splitScreen))
				paddles.current.pad2.key.down = false
		}

		window.addEventListener("keydown", keyPressed)
		window.addEventListener("keyup", keyReleased)

		return () => {
			window.removeEventListener("keydown", keyPressed)
			window.removeEventListener("keyup", keyReleased)
		}
	}, [started])

	useEffect(() => {
		let animationFrameId
		let lastTime = 0

		const gameLoop = time => {
			const delta = time - lastTime
			lastTime = time
			if (paddles.current.pad1.key.up)
				paddles.current.pad1.mesh.position.x -= 0.5
			if (paddles.current.pad1.key.down)
				paddles.current.pad1.mesh.position.x += 0.5
			if (paddles.current.pad2.key.up)
				paddles.current.pad2.mesh.position.x -= 0.5
			if (paddles.current.pad2.key.down)
				paddles.current.pad2.mesh.position.x += 0.5

			animationFrameId = requestAnimationFrame(gameLoop)
		}
		animationFrameId = requestAnimationFrame(gameLoop)

		return () => cancelAnimationFrame(animationFrameId)
	}, [started])

	return (
		<BackGround>
			<test>
				{splitScreen ? (
				<>
					<Canva ref={canvas.canvaL}/>
					<Canva ref={canvas.canvaR}/>
				</>
				) : (
					<Canva ref={canvas.canvaT}/>
				)}
			</test>
		</BackGround>
	);
}

export default Game
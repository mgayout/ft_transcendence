import React, { useEffect, useRef } from "react"
import { useGame } from "../../websockets/game"
import createCanva from "./canva";

const BGprivate = ({ state, type }) => {

	const canva = useRef(null)
	const { getSocket, PongMessages } = useGame()

	useEffect(() => {

		if (!canva.current) return
		if (state != "play") canva.current.style.filter = 'blur(5px)'
		else canva.current.style.filter = ""

		const handleKeyDown = (e) => {
			const socket = getSocket()
			let action = ""
			if (e.key == "ArrowUp") action = "move_up"
			if (e.key == "ArrowDown") action = "move_down"
			if (action && type && socket.readyState === WebSocket.OPEN) {
				socket.send(JSON.stringify({ action: action, type: type}))
			}
		}

		const handleKeyUp = (e) => {
			const socket = getSocket()
			let action = ""
			if (e.key == "ArrowUp") action = "up"
			if (e.key == "ArrowDown") action = "down"
			if (action && type && socket.readyState === WebSocket.OPEN) {
				socket.send(JSON.stringify({ action: "key_up", type: action}))
			}
		}

		const resizeCanva = () => {
			
			canva.current.width = window.innerWidth
			canva.current.height = window.innerHeight

			if (renderer)
				renderer.setSize(window.innerWidth, window.innerHeight)
			if (camera) {
				camera.aspect = window.innerWidth / window.innerHeight
				camera.updateProjectionMatrix()
			}
		}

		const lastPongMessage = PongMessages[PongMessages.length - 1]
	
		const { dispose, renderer, camera } = createCanva(canva.current, state, lastPongMessage)

		window.addEventListener("resize", resizeCanva)
		window.addEventListener('keydown', handleKeyDown)
		window.addEventListener('keyup', handleKeyUp)

		resizeCanva()

		return () => {
			window.removeEventListener("resize", resizeCanva)
			window.removeEventListener('keydown', handleKeyDown)
			window.removeEventListener('keyup', handleKeyUp)
			dispose()
		}
	}, [canva, state, PongMessages])

	return (
			<div className="position-fixed top-0">
				<canvas ref={canva}/>
			</div>)
}

export default BGprivate
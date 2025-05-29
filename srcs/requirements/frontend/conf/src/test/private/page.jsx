import React, { useEffect, useRef, useState } from "react"
import { useGame } from "../../websockets/game"
import { useNotification } from "../../websockets/notification"
import * as THREE from 'three'
import createCanva from "./canva"
import animate from "./animate"
import dispose from "./dispose"

const BGprivate = ({ state, type }) => {

	const { getSocket, PongMessages } = useGame()
	const { NotifMessages } = useNotification()
	const [groupName, setGroupName] = useState({name1: "...", name2: "..."})
	const [groupScore, setGroupScore] = useState({score1: "0", score2: "0"})

	const groupNameRef = useRef(groupName)
	const groupScoreRef = useRef(groupScore)
	const stateRef = useRef(state)
	const MessageRef = useRef(PongMessages)
	
	const canva = useRef(null)

	useEffect(() => {
		if (canva.current) canva.current.style.filter = state !== "play" ? 'blur(5px)' : ''
		else return

		const scene = new THREE.Scene()
		
		const { renderer, camera, objects } = createCanva(canva.current, state, groupName, groupScore, scene)
		const { animationFrameId } = animate(stateRef, objects, MessageRef, renderer, scene, camera,
			setGroupScore, setGroupName, groupScoreRef, groupNameRef)

		const resizeCanva = () => {
			canva.current.width = window.innerWidth
			canva.current.height = window.innerHeight
			renderer.setSize(window.innerWidth, window.innerHeight)
			camera.aspect = window.innerWidth / window.innerHeight
			camera.updateProjectionMatrix()
		}

		window.addEventListener("resize", resizeCanva)
		window.addEventListener('keydown', handleKeyDown)
		window.addEventListener('keyup', handleKeyUp)
		resizeCanva()

		return () => {
			window.removeEventListener("resize", resizeCanva)
			window.removeEventListener('keydown', handleKeyDown)
			window.removeEventListener('keyup', handleKeyUp)
			dispose(objects, scene, renderer, animationFrameId)
		}
	}, [state])

	useEffect(() => {
		if (NotifMessages.type == "match_created") {
			setGroupName({name1: "...", name2: "..."})
			setGroupScore({score1: "0", score2: "0"})
		}
	}, [NotifMessages])

	useEffect(() => { groupNameRef.current = groupName }, [groupName])

	useEffect(() => { groupScoreRef.current = groupScore }, [groupScore])

	useEffect(() => { stateRef.current = state }, [state])

	useEffect(() => { MessageRef.current = PongMessages }, [PongMessages])

	const handleKeyDown = (e) => {
		const socket = getSocket()
		let action = ""
		if (e.key == "ArrowUp") action = "move_down"
		if (e.key == "ArrowDown") action = "move_up"
		if (action && type && socket.readyState === WebSocket.OPEN) socket.send(JSON.stringify({ action: action, type: type}))
	}
	
	const handleKeyUp = (e) => {
		const socket = getSocket()
		let action = ""
		if (e.key == "ArrowUp") action = "down"
		if (e.key == "ArrowDown") action = "up"
		if (action && type && socket.readyState === WebSocket.OPEN) socket.send(JSON.stringify({ action: "key_up", type: action}))
	}

	return (
		<div className="position-fixed top-0">
			<canvas ref={canva}/>
		</div>
	)
}

export default BGprivate
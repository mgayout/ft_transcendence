import React, { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useGame } from "../websockets/game"
import { Modal, Button } from "react-bootstrap"
import { confetti } from "dom-confetti"

function WinnerModal({ winnerName, show, onClose }) {

	const confettiRef = useRef(null)
	const navigate = useNavigate()

	useEffect(() => {
		if (show && confettiRef.current) {
			confetti(confettiRef.current, {
				elementCount: 100,
				angle: 90,
				spread: 90
			})
		}
	}, [show])

	const backToMenu = () => {
		onClose()
		navigate("/home")
	}

	return (
		<Modal show={show} onHide={onClose} centered>
			<Modal.Body className="text-center">
				<div ref={confettiRef} />
				<h2 className="fw-bold">🏆 {winnerName} wins!</h2>
				<p>Congratulations!</p>
				<Button variant="primary" onClick={() => backToMenu()}>Back to Menu</Button>
			</Modal.Body>
		</Modal>
	)
}

function PlayMatch() {

	const { getSocket, messages } = useGame()
	const [paused, setPaused] = useState(false)
	const [end, setEnd] = useState(false)
	const closeEnd = () => setEnd(false)
	const [winner, setWinner] = useState("")
	const [timer, setTimer] = useState(0)
	const socket = getSocket()

	useEffect(() => {
		if (!messages.length) return
		const lastMessage = messages[messages.length - 1]
		console.log(lastMessage)
		if (lastMessage.type == "match_ended") {
			socket.close()
			setWinner(lastMessage.winner)
			setPaused(false)
			setEnd(true)
		}
		if (lastMessage.type == "game_paused") {
			setPaused(true)
		}
		if (lastMessage.type == "forfeit_not_available") {
			setTimer(lastMessage.remaining_seconds)
		}
		if (lastMessage.type == "player_count" && lastMessage.player_count == 2) {
			setPaused(false)
		}
	}, [messages])

	useEffect(() => {
		if (paused == false || !socket || socket.readyState != WebSocket.OPEN) return

		const interval = setInterval(() => {
			socket.send(JSON.stringify({ action: "declare_win" }))
		}, 1000)

		const timeout = setTimeout(() => {
			clearInterval(interval)
		}, 90000)

		return () => {
			clearInterval(interval)
			clearTimeout(timeout)
		}
	}, [paused])

	return (
		<>
		{paused ? 
		<div className="position-absolute top-0 d-flex flex-column justify-content-center align-items-center vh-100 w-100">
  			<div className="fs-2 text-white mb-4">
				Timer : {timer}s
			</div>
  			<i className="bi bi-pause-circle" style={{ fontSize: "10rem", color: "white" }} />
		</div> : <></> }
		<WinnerModal winnerName={ winner } show={ end } onClose={ closeEnd }/>
		</>
	)
}

export default PlayMatch
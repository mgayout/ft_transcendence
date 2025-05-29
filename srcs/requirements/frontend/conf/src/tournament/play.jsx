import React, { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useGame } from "../websockets/game"
import { useNotification } from "../websockets/notification"
import { Modal, Button } from "react-bootstrap"
import { confetti } from "dom-confetti"
import { useAuth } from "../auth/context"
import axiosInstance from "../auth/instance"

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
		<Modal show={show} onHide={ backToMenu } centered>
			<Modal.Body className="text-center">
				<div ref={confettiRef} />
				<h2 className="fw-bold">🏆 {winnerName} wins!</h2>
				<p>Congratulations!</p>
					<Button variant="primary" onClick={() => backToMenu()}>Back to Menu</Button>
			</Modal.Body>
		</Modal>
	)
}

function PlayMatch({ setState, setType }) {

	const { getSocket, closeSocket, messages } = useGame()
	const { user } = useAuth()
	const [paused, setPaused] = useState(false)
	const [end, setEnd] = useState(false)
	const closeEnd = () => setEnd(false)
	const [winner, setWinner] = useState("")
	const [timer, setTimer] = useState(60)
	const socket = getSocket()

	const declareWin = async () => {socket.send(JSON.stringify({ action: "declare_win" }))}

	useEffect(() => {
		if (!messages.length) return
		const lastMessage = messages[messages.length - 1]

		const startFinal = async () => {
			try {
				let final
				const idData = await axiosInstance.get("/pong/tournament/get-id/")
				if (idData && idData.data.finalist1 != null && idData.data.finalist2 != null) {
					final = await axiosInstance.put(`/pong/tournament/${idData.data.tournament_id}/start-final/`)
					await axiosInstance.post("/live_chat/general/send/", {content: `#Time for final : ${idData.data.finalist1} vs ${idData.data.finalist2}`})
				}
			}
			catch(error) {
				if (error && error.response && error.response.data && error.response.data.message) {
					setInfo(error.response.data.message)
					setShow(true)
				}
			}
		}

		const handleMessage = async () => {
			if (lastMessage.type == "match_ended" || lastMessage.type == "forfeit_success") {
				closeSocket()
				if (lastMessage.type == "match_ended") {
					setWinner(lastMessage.winner)
					if (lastMessage.winner == user.name && lastMessage.match_number == 2)
						startFinal()
				}
				else {
					setWinner(user.name)
					if (lastMessage.match_number == 2)
						startFinal()
				}
				setPaused(false)
				setEnd(true)
			}
			if (lastMessage.type == "game_paused" || (lastMessage.type == "player_count" && lastMessage.player_count == 1))
				setPaused(true)
			if (lastMessage.type == "forfeit_not_available")
				setTimer(lastMessage.remaining_seconds)
			if (lastMessage.type == "player_count" && lastMessage.player_count == 2) {
				setPaused(false)
				setTimer(60)
			}
		}
		handleMessage()
	}, [messages])

	return (
		<>
		{paused ?
		<div className="position-absolute top-0 d-flex flex-column justify-content-center align-items-center vh-100 w-100">
			<i className="bi bi-pause-circle" style={{ fontSize: "20rem", color: "white" }} />
			<div className="fs-1 mb-5">
				<Button className="" onClick={() => declareWin()}>Declare win in {timer}s</Button>
			</div>
		</div> : <></> }
		<WinnerModal winnerName={ winner } show={ end } onClose={ closeEnd }/>
		</>
	)
}

export default PlayMatch
import React from "react"
import { Button } from "react-bootstrap"
import { useGame } from "../../websockets/game"

function PlayMatch() {

	const { getSocket, setUrl } = useGame()

	const closeWS = () => {
		setUrl('')
		const socket = getSocket()
		socket.close()
	}

	return (<></>)

	return (
		<div className="position-absolute top-0 d-flex justify-content-center align-items-center vh-100 w-100">
			<div className="rounded border border-black border-2 px-3 px-lg-5 pt-2 pt-lg-4 pb-3 pb-lg-4"
				style={{background: "rgba(0, 0, 0, 0.7)"}}>
				<Button type="button" className="btn btn-secondary rounded fw-bolder" onClick={() => closeWS()}>Close</Button>
			</div>
		</div>
	)
}

export default PlayMatch
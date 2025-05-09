import React, { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useAuth } from "../../auth/context"
import { useNotification } from "../../websockets/notification"
import { useGame } from "../../websockets/game"

function WaitMatch({ setState }) {

	const { user } = useAuth()
	const { messages } = useNotification()
	const { setUrl } = useGame()
	const [ready, setReady] = useState(false)

	useEffect(() => {
		if (!messages.length) return
		if (messages[0].type == "match_created") setReady(true)
		console.log(messages[0])
	}, [messages])

	const play = () => {
		if (ready) {
			console.log("yo")
			setUrl(messages[0].ws_url)
			setState("play")
		}
	}

	return (
		<div className="position-absolute top-0 d-flex justify-content-center align-items-center vh-100 w-100">
			<div className="rounded border border-black border-2 px-3 px-lg-5 pt-2 pt-lg-4 pb-3 pb-lg-4"
				style={{background: "rgba(0, 0, 0, 0.7)"}}>
				<img src={user.avatar} alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }}/>
				<img src={user.avatar} alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }}/>
				<Button type="button" className="btn btn-secondary rounded fw-bolder" onClick={() => play()}>Play</Button>
			</div>
		</div>
	)
}

export default WaitMatch
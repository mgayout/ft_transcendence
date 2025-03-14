import React, { useState, useEffect } from "react"
import { Form, FloatingLabel } from "react-bootstrap"
import './style.css'

function Settings({starting}) {

	const speed = ["Slow", "Normal", "Fast"]
	const [rounds, setRounds] = useState(5)
	const [paddleSpeed, setPaddleSpeed] = useState(1)
	const [ballSpeed, setBallSpeed] = useState(1)

	const [nickname1, setNickname1] = useState("")
	const [nickname2, setNickname2] = useState("")

	useEffect(() => {
		if (!starting) return
		//send infos
	}, [starting])

	return (
		<Form className="local-settings-container">
			<Form.Group className="local-settings-range">
				<Form.Label className="local-settings-label">Number of rounds : {rounds}</Form.Label>
				<Form.Range min={1} max={9} value={rounds} onChange={(e) => setRounds(e.target.value)}/>
				<Form.Label className="local-settings-label">Paddle Speed : {speed[paddleSpeed]}</Form.Label>
				<Form.Range min={0} max={2} value={paddleSpeed} onChange={(e) => setPaddleSpeed(e.target.value)}/>
				<Form.Label className="local-settings-label">Ball Speed : {speed[ballSpeed]}</Form.Label>
				<Form.Range min={0} max={2} value={ballSpeed} onChange={(e) => setBallSpeed(e.target.value)}/>
			</Form.Group>
			<Form.Group className="local-settings-name">
				<FloatingLabel label="Player 1" className="">
					<Form.Control type="text" placeholder="" value={nickname1}
					onChange={(e) => setNickname1(e.target.value)}/>
				</FloatingLabel>
				<FloatingLabel label="Player 2">
					<Form.Control type="text" placeholder="" value={nickname2}
					onChange={(e) => setNickname2(e.target.value)}/>
				</FloatingLabel>
			</Form.Group>
		</Form>
	  )
}

export default Settings
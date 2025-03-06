import React, { useState } from "react"
import { Button, Form, FloatingLabel } from "react-bootstrap"
import './style.css'

function Settings({setSetting}) {

	const speed = ["Slow", "Normal", "Fast"]
	const [rounds, setRounds] = useState(5)
	const [paddleSpeed, setPaddleSpeed] = useState(1)
	const [ballSpeed, setBallSpeed] = useState(1)

	return (
		<Form>
			<Form.Group className="rangeFormLvs labelFormLvs">
				<Form.Label className="">Number of rounds : {rounds}</Form.Label>
				<Form.Range
					min={1}
					max={9}
					value={rounds}
					onChange={(e) => setRounds(e.target.value)}/>
				<Form.Label className="">Paddle Speed : {speed[paddleSpeed]}</Form.Label>
				<Form.Range
					min={0}
					max={2}
					value={paddleSpeed}
					onChange={(e) => setPaddleSpeed(e.target.value)}/>
				<Form.Label className="">Ball Speed : {speed[ballSpeed]}</Form.Label>
				<Form.Range
					min={0}
					max={2}
					value={ballSpeed}
					onChange={(e) => setBallSpeed(e.target.value)}/>
			</Form.Group>
			<Form.Group className="controlFormLvs">
				<FloatingLabel
					label="Player 1"
					className="mb-3">
					<Form.Control
						type="text"
						placeholder=""/>
				</FloatingLabel>
				<FloatingLabel
					label="Player 2">
					<Form.Control
						type="text"
						placeholder=""/>
				</FloatingLabel>
			</Form.Group>
			<Button
				type="button"
				onClick={() => setSetting(true)}
				className="nextButtonLvs">Next
			</Button>
		</Form>
	  )
}

export default Settings

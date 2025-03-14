import React, { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap"
import Gameplay from "../../gameplay/settings/page"
import ResizeScreen from "../../global/resize-screen.jsx"
import ResizeModal from "../../global/resize-modal.jsx"
import Settings from './settings/page'
import Skin from './skin/page'
import './style.css'

function Local() {

	const navigate = useNavigate()

	const canva = useRef(null)

	const { resize } = ResizeScreen()

	const [starting, setStarting] = useState(false)
	const goPlay = () => setStarting(true)

	const elem = [ "Player 1", "Player 2", "Ball"]
	const [n, setN] = useState(-1)
	const [color, setColor] = useState(-1)

	const goHome = () => {
		//remove la partie
		navigate("/home")
	}

	return (
		<div className="local-page">
			<Gameplay canva={ canva } className="backgroud-canvas"
			elem={ n } color={ color }/>
			{resize ?	<div>
							<h1 className="title" onClick={ goHome }>Pong.</h1>
							<Settings/>
							<Skin elem={ n } color={ color } setN={ setN } setColor={ setColor }/>
							<Button onClick={goPlay} className="local-submit">PLAY</Button>
						</div>
					 : <></>}
			<ResizeModal resize={ resize }/>
		</div>
	)
}

export default Local
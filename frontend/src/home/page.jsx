import React, { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap"
import Gameplay from '../gameplay/settings/page'
import GameMenu from "./gamemenu/page"
import ResizeScreen from "../global/resize-screen.jsx"
import ResizeModal from "../global/resize-modal.jsx"
import './style.css'

function Home() {

	const navigate = useNavigate()

	const canva = useRef(null)

	const { resize } = ResizeScreen()

	//verif login

	const disconnect = () => {
		localStorage.removeItem("jwt")
		navigate("/")
	}

	return (
		<div className="home-page">
			<Gameplay canva={canva} className="background-canvas"/>
			{resize ?	<div>
							<h1 className="title">Pong.</h1><GameMenu/>
							<Button type="submit" onClick={() => disconnect()}
							className="home-login btn btn-secondary">DISCONNECT</Button>
						</div>
					: 	<></>}
			<ResizeModal resize={ resize }/>
		</div>
	  )
}

export default Home
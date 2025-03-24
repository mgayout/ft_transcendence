import React, { useRef, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap"
import Gameplay from '../gameplay/settings/page'
import GameMenu from "./gamemenu/page"
import ResizeScreen from "../global/resize-screen.jsx"
import ResizeModal from "../global/resize-modal.jsx"
import FriendModal from "../global/friend-modal.jsx"
import QuitModal from "../global/quit-modal.jsx"
import './style.css'

function Home() {

	const navigate = useNavigate()

	const canva = useRef(null)

	const { resize } = ResizeScreen()
	const [friend, setFriend] = useState(false)
	const [quit, setQuit] = useState(false)

	useEffect(() => {

		const token = localStorage.getItem('jwt')

		if (!token)
		  navigate('/')
	  }, [navigate])

	return (
		<div className="home-page">
			<Gameplay canva={canva} className="background-canvas"/>
			{resize ?	<div>
							<h1 className="title">Pong.</h1><GameMenu/>
							<div className="home-options">
								<Button className="home-profile"><i className="home-icon bi bi-house-fill"></i></Button>
								<Button className="home-friend" onClick={() => setFriend(true)}><i className="home-icon bi bi-people-fill"></i></Button>
								<Button className="home-quit" onClick={() => setQuit(true)}><i className="home-icon bi bi-power"></i></Button>
							</div>
						</div>
					: 	<></>}
			<ResizeModal resize={ resize }/>
			<FriendModal friend={ friend } setFriend={ setFriend }/>
			<QuitModal quit={ quit } setQuit={ setQuit }/>
		</div>
	  )
}

export default Home
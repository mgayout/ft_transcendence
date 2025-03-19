import React, { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import Gameplay from "../gameplay/menu/page.jsx"
import UserPass from "./UserPass.jsx"
import ResizeScreen from "../global/resize-screen.jsx"
import ResizeModal from "../global/resize-modal.jsx"
import './style.css'

function Login() {

	const canva = useRef(null)

	const navigate = useNavigate()

	const { resize } = ResizeScreen()

	useEffect(() => {

		const token = localStorage.getItem('jwt')

		if (token)
		  navigate('/home')
	  }, [navigate])

	useEffect(() => {

		if (canva.current)
			canva.current.style.filter = 'blur(5px)'
	}, [])

	return (
		<div className="login-page">
			<Gameplay canva={canva} className="background-canvas"/>
			
			{resize	?	<div>
							<h1 className="title">Pong.</h1><UserPass/>
						</div>
					: 	<></>}
			<ResizeModal resize={ resize } />
		</div>
	)
}

export default Login
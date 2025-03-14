import React, { useEffect, useRef } from "react"
import Gameplay from "../gameplay/menu/page.jsx"
import UserPass from "./UserPass.jsx"
import ResizeScreen from "../global/resize-screen.jsx"
import ResizeModal from "../global/resize-modal.jsx"
import './style.css'

function Register() {

	const canva = useRef(null)

	const { resize } = ResizeScreen()

	useEffect(() => {

		if (canva.current) {
			canva.current.style.filter = 'blur(5px)'
		}

	}, [])

	return (
		<div className="register-page">
			<Gameplay canva={canva} className="background-canvas"/>
			{resize ?	<div className="register-container">
							<h1 className="title">Pong.</h1><UserPass/>
						</div>
					: 	<></>}
			<ResizeModal resize={ resize } />
		</div>
	  )
}

export default Register
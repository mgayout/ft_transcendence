import React, { useRef } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import Gameplay from "../gameplay/menu/page.jsx"
import UserPass from "./UserPass.jsx"
import './style.css'

function Register() {

	const canva = useRef(null)

	return (
		<div className="containerRegister">
			<Gameplay canva={canva} />
			<div className="flouFilterRegister">
				<canvas ref={canva} className="flouCanvaRegister" />
			</div>
			<p className="TitleRegister">Pong.</p>
			<div className="transpBoxRegister">
				<UserPass/>
			</div>
		</div>
	  )
}

export default Register
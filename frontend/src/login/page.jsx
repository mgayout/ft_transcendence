import React, { useRef } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import Gameplay from "../gameplay/menu/page.jsx"
import UserPass from "./UserPass.jsx"
import './style.css'

function Login() {

	const canva = useRef(null)

	return (
		<div className="containerLogin">
			<Gameplay canva={canva} />
			<div className="flouFilterLogin">
				<canvas ref={canva} className="flouCanvaLogin" />
			</div>
			<p className="TitleLogin">Pong.</p>
			<div className="transpBoxLogin">
				<UserPass/>
			</div>
		</div>
	)
}

export default Login
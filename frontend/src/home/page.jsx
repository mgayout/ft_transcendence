import React, { useRef } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import Gameplay from '../gameplay/menu/page'
import GameMenu from "./GameMenu"
import './style.css'

function Home() {

	const canva = useRef(null)

	return (
		<div className="containerHome">
			<Gameplay canva={canva} />
			<div className="flouFilterHome">
				<canvas ref={canva} className="flouCanvaHome" />
			</div>
			<p className="TitleHome">Pong.</p>
			<div className="transpBoxHome">
				<GameMenu/>
			</div>
		</div>
	  )
}

export default Home
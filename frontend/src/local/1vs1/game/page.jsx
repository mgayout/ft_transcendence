import React, { useRef } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import Gameplay from "../../../gameplay/page.jsx"
import '../style.css'

function Game() {

	const canva = useRef(null)

	return (<Gameplay canva={canva} />)
}

export default Game
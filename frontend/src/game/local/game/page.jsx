import React, { useRef } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import Gameplay from "../../../gameplay/menu/page.jsx"
import '../style.css'

function LocalGame() {

	const canva = useRef(null)

	return (<Gameplay canva={canva} />)
}

export default LocalGame
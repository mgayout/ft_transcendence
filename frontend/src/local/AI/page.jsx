import React, { useRef, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import Game from './game/page'
import Settings from './settings/page'
import './style.css'

function Localai() {

	const [starting, setStarting] = useState(false)

	return (<>{starting ? (<Game />) : (<Settings setStarting={setStarting} />)}</>)
}

export default Localai
import React, { useState, useRef } from "react"
import Gameplay from "../../gameplay/settings/page"
import Settings from './settings/page'
import Skin from './skin/page'
import './style.css'

function Localvs() {

	const canva = useRef(null)

	const [setting, setSetting] = useState(false)

	const elem = [ "Player 1", "Player 2", "Ball"]
	const [n, setN] = useState(-1)
	const [color, setColor] = useState(-1)

	return (
		<div className="containerLvs">
			<Gameplay canva={canva} elem={n} color={color} />
			<div className="filterLvs">
				<canvas ref={canva}/>
			</div>
			<p className="titleLvs">Pong.</p>
			<div className={setting ? "skinBoxLvs" : "settingsBoxLvs"}>
				{ setting	? (<Skin elem={elem} n={n} setN={setN} setColor={setColor} />)
							: (<Settings setSetting={setSetting} />)
				}
			</div>
		</div>
	)
}

export default Localvs
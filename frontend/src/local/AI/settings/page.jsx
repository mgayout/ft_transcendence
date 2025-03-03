import React, { useRef, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import SkinView from './SkinView.jsx'
import '../style.css'

function Settings({setStarting}) {

	const canva = useRef(null)
	const elem = [ "Player 1", "AI", "Ball"]
	const [n, setN] = useState(0)
	const [color, setColor] = useState(0)

	const setArrow = (type) => {
		setColor(0)
		if (type) {
			setN((n - 1 + elem.length) % elem.length)
		}
		else {
			setN((n + 1) % elem.length)
		}
	}

	return (
		<div className="containerLvs">
			<p className="titleLvs"> { elem[n] } </p>
			<SkinView canva={canva} elem={n} color={color} />
			<div className="filterLvs">
				<canvas ref={canva}/>
			</div>
			
			<div className="transpBoxLvs">
				<button
					type="button"
					class="leftArrowLvs bi-arrow-left"
					onClick={() => setArrow(true)} />
				<button
					type="button"
					onClick={() => setArrow(false)}
					className="rightArrowLvs bi-arrow-right" />
				<button
					type="button"
					onClick={() => setColor(0)}
					className="whiteSkinLvs" />
				<button
					type="button"
					onClick={() => setColor(1)}
					className="darkSkinLvs" />
				<button
					type="button"
					onClick={() => setColor(2)}
					className="blueSkinLvs" />
				<button
					type="button"
					onClick={() => setColor(3)}
					className="redSkinLvs" />
				<button
					type="button"
					onClick={() => setColor(4)}
					className="yellowSkinLvs" />
				<button
					type="button"
					onClick={() => setColor(5)}
					className="greenSkinLvs" />
				<button
					type="button"
					onClick={() => setColor(6)}
					className="orangeSkinLvs" />
				<button
					type="button"
					onClick={() => setColor(7)}
					className="purpleSkinLvs" />
				<button
					type="button"
					onClick={() => setStarting(true)}
					className="playButtonLvs">Play !</button>
			</div>
		</div>
	  )
}

export default Settings

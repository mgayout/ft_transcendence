import React, {useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { Button, Form } from "react-bootstrap"
import './style.css'

function Skin({elem, n ,setN, setColor}) {

	const navigate = useNavigate()

	useEffect(() => {
		setN(0)
		setColor(0)
		return () => {}
	}, [])

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
		<Form>
			<p className="groupFormLvs">{elem[n]}</p>
			<Form.Group className="">
				<Button
					type="button"
					className="leftArrowLvs bi-arrow-left"
					onClick={() => setArrow(true)}/>
			</Form.Group>
			<Button
				type="button"
				onClick={() => setArrow(false)}
				className="rightArrowLvs bi-arrow-right"/>
			<Button
				type="button"
				onClick={() => setColor(0)}
				className="whiteSkinLvs" />
			<Button
				type="button"
				onClick={() => setColor(1)}
				className="darkSkinLvs" />
			<Button
				type="button"
				onClick={() => setColor(2)}
				className="blueSkinLvs" />
			<Button
				type="button"
				onClick={() => setColor(3)}
				className="redSkinLvs" />
			<Button
				type="button"
				onClick={() => setColor(4)}
				className="yellowSkinLvs" />
			<Button
				type="button"
				onClick={() => setColor(5)}
				className="greenSkinLvs" />
			<Button
				type="button"
				onClick={() => setColor(6)}
				className="orangeSkinLvs" />
			<Button
				type="button"
				onClick={() => setColor(7)}
				className="purpleSkinLvs" />
			<Button
				type="button"
				onClick={() => navigate("/localvs/game")}
				className="playButtonLvs">Play !
			</Button>
		</Form>
	  )
}

export default Skin

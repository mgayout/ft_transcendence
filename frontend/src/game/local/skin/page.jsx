import React, {useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { Button, Form } from "react-bootstrap"
import './style.css'

function Skin({elem, n ,setN, setColor}) {

	const navigate = useNavigate()

	const skins = ["whiteSkinLvs",
					"darkSkinLvs",
					"blueSkinLvs",
					"redSkinLvs",
					"yellowSkinLvs",
					"greenSkinLvs",
					"orangeSkinLvs",
					"purpleSkinLvs"]

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
		<Form className="local-skin-container">
			
		</Form>
	  )
}

export default Skin

/*<p className="titleLabelLvs">{elem[n]}</p>
			<Button
				type="button"
				onClick={() => setArrow(true)}
				className="leftArrowLvs">
					<i class="bi bi-arrow-left"></i>
			</Button>
			<Button
				type="button"
				onClick={() => setArrow(false)}
				className="rightArrowLvs">
					<i class="bi bi-arrow-right"></i>
			</Button>
			<Form.Group>
  				{skins.map((skinClass, index) => (
      			<Button
        			type="button"
        			onClick={() => setColor(index)}
        			className={`${skinClass}`}/>))}
			</Form.Group>
			<Button
				type="button"
				onClick={() => navigate("/localvs/game")}
				className="playButtonLvs">Play !
			</Button>*/
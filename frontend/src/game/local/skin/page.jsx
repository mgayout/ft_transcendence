import React from "react"
import { Button, Form, Dropdown } from "react-bootstrap"
import './style.css'

function Skin({elem, color ,setN, setColor}) {

	const skins = ["white", "dark",	"blue", "red",
					"yellow", "green", "orange", "purple"]

	const updateObject = (id) => {
		//envoie de color à elem
		setN(id)
		setColor(0)
	}

	return (
		<Form className="local-skin-container">
			<Dropdown className="local-skin-dropdown">
				<Dropdown.Toggle className="local-skin-dropdown-toogle">Select an Object</Dropdown.Toggle>
				<Dropdown.Menu>
					<Dropdown.Item onClick={() => updateObject(0)}>Player 1</Dropdown.Item>
					<Dropdown.Item onClick={() => updateObject(1)}>Player 2</Dropdown.Item>
					<Dropdown.Item onClick={() => updateObject(2)}>Ball</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
			<Form.Group>
  				{skins.map((color, index) => (
      			<Button
					key={color}
        			type="button"
        			onClick={() => setColor(index)}
        			className={`local-skin-btn local-skin-btn-${color}`}/>))}
			</Form.Group>
		</Form>
	  )
}

export default Skin
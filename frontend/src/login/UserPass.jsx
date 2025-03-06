import React, { useState } from "react"
import { Button, Form } from "react-bootstrap"
import './style.css'
import { useNavigate } from "react-router-dom"

function UserPass() {

	const navigate = useNavigate()

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [passShow, setPassShow] = useState(false)

	const handlePassShow = () => {
		setPassShow(!passShow)
	}

	const sendAuth = () => {

		if (username && password)
			navigate("/home")
	}

	return (
		<Form>
			<Form.Group className="userFormLogin">
				<Form.Label className="userTitleLogin">Username</Form.Label>
				<Form.Control
					type="text"
					placeholder="Insert username"
					onChange={(e) => setUsername(e.target.value)}
					className="textLogin"
				/>
			</Form.Group>
			<Form.Group className="passFormLogin">
				<Form.Label className="passTitleLogin">Password</Form.Label>
				<Form.Control
					type={passShow ? "text" : "password"}
					placeholder="Insert password"
					onChange={(e) => setPassword(e.target.value)}
					className="textLogin"
				/>
			</Form.Group>
			<Button
				type="button"
				className="passShowButtonLogin btn btn-secondary"
				onClick={handlePassShow}>
					{!passShow ? <i class="bi bi-eye-fill"></i> : <i class="bi bi-eye-slash-fill"></i>}
			</Button>
			<Button
				type="submit"
				className="loginButtonLogin btn btn-secondary"
				onClick={sendAuth}>LOGIN
			</Button>
			<Button
				type="button"
				className="registerButtonLogin btn btn-secondary"
				onClick={() => navigate("/register")}>REGISTER
			</Button>
		</Form>
	)
}

export default UserPass
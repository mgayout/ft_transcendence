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
		<div>
			<Form>
				<p className="userTitleLogin">Username</p>
				<Form.Group className="userInputLogin">
					<Form.Control
						type="text"
						placeholder="Insert username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						maxLength={30}
						className="textLogin" />
				</Form.Group>
				
				<p className="passTitleLogin">Password</p>
				<Form.Group className="passInputLogin">
					<Form.Control
						type={passShow ? "text" : "password"}
						placeholder="Insert password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						maxLength={30}
						className="textLogin" />
				</Form.Group>
				<Button
					onClick={handlePassShow}
					className="passShowButtonLogin"
				/>

				<Button
					onClick={() => navigate("/register")}
					className="registerButtonLogin"
				>REGISTER</Button>

				<Button
					type="submit"
					onClick={sendAuth}
					className="loginButtonLogin"
				>LOGIN</Button>
			</Form>
		</div>
	)
}

export default UserPass
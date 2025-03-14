import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Form } from "react-bootstrap"
import axios from 'axios'
import './style.css'

function UserPass() {

	const navigate = useNavigate()

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const [passShow, setPassShow] = useState(false)
	const showPass = () => setPassShow(true)
	const hidePass = () => setPassShow(false)


	const sendAuth = async (e) => {
		e.preventDefault()
		try {
			const response = await axios.post('http://127.0.0.1:8000/api/login/', {
				username: username,
				password: password
			})
			//console.log("Connexion réussie :", response.data)
			if (response.request.statusText == "OK") {
				if (response.data.tokens) {
					localStorage.setItem('jwt', response.data.tokens)
					if (localStorage.getItem("jwt"))
						navigate("/home")
				}
			}
		}
		catch (error) {
			console.log("Erreur de connexion :", error)
			setUsername("")
			setPassword("")
		}
	}

	return (
		<Form>
			<Form.Group className="login-username">
				<Form.Label className="login-label">Username</Form.Label>
				<Form.Control
					type="text"
					value={username}
					placeholder="Insert username"
					onChange={(e) => setUsername(e.target.value)}
					className="login-text"
				/>
			</Form.Group>
			<Form.Group className="login-password">
  				<Form.Label className="login-label">Password</Form.Label>
  				<div className="input-container">
    				<Form.Control
      					type={passShow ? "text" : "password"}
    					value={password}
						placeholder="Insert password"
						onChange={(e) => setPassword(e.target.value)}
						className="login-text"
    				/>
    				<Button
      					type="button"
      					className="login-showpass btn btn-light"
      					onClick={(passShow ? hidePass : showPass) }
    				>
     					{passShow	? <i className="eye bi-eye-slash-fill" style={{ color: '#000000'}}></i>
									: <i className="eye bi-eye-fill" style={{ color: '#000000'}}></i>}
    				</Button>
  				</div>
			</Form.Group>
			<Button
				type="submit"
				className="login-submit btn btn-secondary"
				onClick={sendAuth}>LOGIN
			</Button>
			<Button
				type="button"
				className="login-register btn btn-secondary"
				onClick={() => navigate("/register")}>REGISTER
			</Button>
		</Form>
	)
}

export default UserPass
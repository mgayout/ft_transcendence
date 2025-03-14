import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Form } from "react-bootstrap"
import axios from 'axios'
import './style.css'

function UserPass() {

	const navigate = useNavigate()

	const [username, setUsername] = useState('')
	const [password1, setPassword1] = useState('')
	const [password2, setPassword2] = useState('')

	const [passShow1, setPassShow1] = useState(false)
	const showPass1 = () => setPassShow1(true)
	const hidePass1 = () => setPassShow1(false)

	const [passShow2, setPassShow2] = useState(false)
	const showPass2 = () => setPassShow2(true)
	const hidePass2 = () => setPassShow2(false)

	const sendAuth = async (e) => {
		e.preventDefault()
		try {
			const response = await axios.post('http://127.0.0.1:8000/api/register/', {
				username: username,
				password1: password1,
				password2: password2
			})
			//console.log(response)
			if (response.request.statusText == "Created") {
				navigate("/")
			}
		}
		catch (error) {
			console.log(error)
			setUsername("")
			setPassword1("")
			setPassword2("")
		}
	}

	return (
		<Form>
			<Form.Group className="register-username">
				<Form.Label className="register-label">Username</Form.Label>
				<Form.Control
					type="text"
					value={username}
					placeholder="Insert username"
					onChange={(e) => setUsername(e.target.value)}
					className="register-text"
				/>
			</Form.Group>
			<Form.Group className="register-password">
				<Form.Label className="register-label">Password</Form.Label>
				<div className="input-container">
					<Form.Control
						type={passShow1 ? "text" : "password"}
						value={password1}
						placeholder="Insert password"
						onChange={(e) => setPassword1(e.target.value)}
						className="register-text"
					/>
					<Button
						type="button"
						className="register-showpass1 btn btn-light"
						onClick={(passShow1 ? hidePass1 : showPass1)}>
							{passShow1	? <i className="bi bi-eye-slash-fill" style={{ color: '#000000'}}></i>
										: <i className="bi bi-eye-fill" style={{ color: '#000000'}}></i>}
					</Button>
				</div>
				<div className="input-container">
					<Form.Control
						type={passShow2 ? "text" : "password"}
						value={password2}
						placeholder="Confirm password"
						onChange={(e) => setPassword2(e.target.value)}
						className="register-text"
					/>
					<Button
						type="button"
						className="register-showpass2 btn btn-light"
						onClick={(passShow2 ? hidePass2 : showPass2)}>
							{passShow2	? <i className="bi bi-eye-slash-fill" style={{ color: '#000000'}}></i>
										: <i className="bi bi-eye-fill" style={{ color: '#000000'}}></i>}
					</Button>
				</div>
			</Form.Group>
			<Button
				type="button"
				className="register-submit btn btn-secondary"
				onClick={sendAuth}>REGISTER
			</Button>
			<Button
				type="submit"
				className="register-login btn btn-secondary"
				onClick={() => navigate("/")}>LOGIN
			</Button>
		</Form>
	)
}

export default UserPass
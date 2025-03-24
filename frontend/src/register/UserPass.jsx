import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Form, Modal } from "react-bootstrap"
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

	const [show, setShow] = useState(false)
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	const error = [ "",
				"Passwords are not similar.",
				"Username is already taken.",
				"Password is not strong enough.\nPassword must contain at least 8 characters.",
				"Password is not strong enough.\nPassword must contain at least one number.",
				"Password is not strong enough.\nPassword must contain at least one lowercase letter.",
				"Password is not strong enough.\nPassword must contain at least one capital letter.",
				"Password is not strong enough.\nPassword must contain at least one special character (!@#$%^&*...).",
				"Username required.",
				"Password required.",
				"Second password required."]

	const [errorId, setErrorId] = useState(0)

	const sendAuth = async (e) => {
		e.preventDefault()
		try {
			const response = await axios.post('http://127.0.0.1:8000/api/register/', {
				username: username,
				password: password1,
				password2: password2
			})
			if (response.request.response == "{\"code\":1000}") {
				navigate("/")
			}
		}
		catch (error) {
			//console.log(error)
			setUsername("")
			setPassword1("")
			setPassword2("")
			if (error.response.request.response == "{\"code\":1001}")
				setErrorId(1);
			else if (error.response.request.response == "{\"code\":1002}")
				setErrorId(2);
			else if (error.response.request.response == "{\"code\":1003}")
				setErrorId(3);
			else if (error.response.request.response == "{\"code\":1004}")
				setErrorId(4);
			else if (error.response.request.response == "{\"code\":1005}")
				setErrorId(5);
			else if (error.response.request.response == "{\"code\":1006}")
				setErrorId(6);
			else if (error.response.request.response == "{\"code\":1007}")
				setErrorId(7);
			else if (error.response.request.response == "{\"code\":1009}")
				setErrorId(8);
			else if (error.response.request.response == "{\"code\":1010}")
				setErrorId(9);
			else if (error.response.request.response == "{\"code\":1011}")
				setErrorId(10);
			else
				setErrorId(0);
			handleShow()
		}
	}

	return (
		<Form className="register-container">
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
				type="submit"
				className="register-submit btn btn-secondary"
				onClick={sendAuth}>REGISTER
			</Button>
			<Button
				type="button"
				className="register-login btn btn-secondary"
				onClick={() => navigate("/")}>LOGIN
			</Button>
			<Modal show={show} onHide={handleClose} className="login-modal">
				<Modal.Header closeButton>
					<Modal.Title>Registration error</Modal.Title>
				</Modal.Header>
				<Modal.Body>{error[errorId]}</Modal.Body>
			</Modal>
		</Form>
	)
}

export default UserPass
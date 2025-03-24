import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Form, Modal } from "react-bootstrap"
import axios from 'axios'
import './style.css'

function UserPass() {

	const navigate = useNavigate()

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const [passShow, setPassShow] = useState(false)
	const showPass = () => setPassShow(true)
	const hidePass = () => setPassShow(false)

	const [show, setShow] = useState(false)
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	const error = [ "",
			"Username required.",
			"Password required.",
			"Username or Password incorrect."]

		const [errorId, setErrorId] = useState(0)

	const sendAuth = async (e) => {
		e.preventDefault()
		try {
			const response = await axios.post('http://127.0.0.1:8000/api/login/', {
				username: username,
				password: password
			})
			console.log(response)
			if (response.request.response.includes("\"code\":1000")) {
				if (response.data.tokens) {
					localStorage.setItem('jwt', response.data.tokens)
					if (localStorage.getItem("jwt"))
						navigate("/home")
				}
			}
		}
		catch (error) {
			//console.log(error)
			setUsername("")
			setPassword("")
			if (error.response.request.response == "{\"code\":1009}")
				setErrorId(1)
			else if (error.response.request.response == "{\"code\":1010}")
				setErrorId(2)
			else if (error.response.request.response == "{\"code\":1013}")
				setErrorId(3)
			else
				setErrorId(0)
				handleShow()
		}
	}

	return (
		<Form className="login-container">
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
			<Modal show={show} onHide={handleClose} className="login-modal">
				<Modal.Header closeButton>
					<Modal.Title>Connection error</Modal.Title>
				</Modal.Header>
				<Modal.Body>{error[errorId]}</Modal.Body>
			</Modal>
		</Form>
	)
}

export default UserPass
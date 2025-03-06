import React, { useState } from "react"
import { Button, Form} from "react-bootstrap"
import './style.css'
import { useNavigate } from "react-router-dom"

function UserPass() {

	const navigate = useNavigate()

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [password2, setPassword2] = useState('')
	const [passShow, setPassShow] = useState(false)
	const [passShow2, setPassShow2] = useState(false)

	const handlePassShow = () => {
		setPassShow(!passShow)
	}

	const handlePassShow2 = () => {
		setPassShow2(!passShow2)
	}

	const sendAuth = () => {
		if (username && password && password2 && password == password2)
			navigate("/")
	}

	return (
		<Form>
			<Form.Group className="userFormRegister">
				<Form.Label className="userTitleRegister">Username</Form.Label>
				<Form.Control
					type="text"
					placeholder="Insert username"
					onChange={(e) => setUsername(e.target.value)}
					className="textRegister"
				/>
			</Form.Group>
			<Form.Group className="passFormRegister">
				<Form.Label className="passTitleRegister">Password</Form.Label>
				<Form.Control
					type={passShow ? "text" : "password"}
					placeholder="Insert password"
					onChange={(e) => setPassword(e.target.value)}
					className="textRegister"
				/>
				<Form.Control
					type={passShow2 ? "text" : "password"}
					placeholder="Confirm password"
					onChange={(e) => setPassword2(e.target.value)}
					className="textRegister"
				/>
			</Form.Group>
			<Button
				type="button"
				className="passShowButtonRegister btn btn-secondary"
				onClick={handlePassShow}>
					{!passShow ? <i class="bi bi-eye-fill"></i> : <i class="bi bi-eye-slash-fill"></i>}
			</Button>
			<Button
				type="button"
				className="passShowButtonRegister2 btn btn-secondary"
				onClick={handlePassShow2}>
					{!passShow2 ? <i class="bi bi-eye-fill"></i> : <i class="bi bi-eye-slash-fill"></i>}
			</Button>
			<Button
				type="button"
				className="registerButtonRegister btn btn-secondary"
				onClick={sendAuth}>REGISTER
			</Button>
			<Button
				type="submit"
				className="loginButtonRegister btn btn-secondary"
				onClick={() => navigate("/")}>LOGIN
			</Button>
		</Form>
	)
}

export default UserPass
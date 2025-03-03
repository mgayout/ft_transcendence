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

	}

	return (
		<div>
			<Form>
				<p className="userTitleRegister">Username</p>
				<Form.Group className="userInputRegister">
					<Form.Control
						type="text"
						placeholder="Insert username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						maxLength={30}
						className="textRegister" />
				</Form.Group>
				
				<p className="passTitleRegister">Password</p>
				<Form.Group className="passInputRegister">
					<Form.Control
						type={passShow ? "text" : "password"}
						placeholder="Insert password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						maxLength={30}
						className="textRegister" />
				</Form.Group>
				<Button
					onClick={handlePassShow}
					className="passShowButtonRegister"
				/>

				<Form.Group className="passInput2Register">
					<Form.Control
						type={passShow2 ? "text" : "password"}
						placeholder="Confirm password"
						value={password2}
						onChange={(e) => setPassword2(e.target.value)}
						maxLength={30}
						className="textRegister" />
				</Form.Group>
				<Button
					onClick={handlePassShow2}
					className="passShowButton2Register"
				/>

				<Button
					type="submit"
					onClick={sendAuth}
					className="registerButtonRegister"
				>REGISTER</Button>

				<Button
					onClick={() => navigate("/")}
					className="loginButtonRegister"
				>LOGIN</Button>
			</Form>
		</div>
	)
}

export default UserPass
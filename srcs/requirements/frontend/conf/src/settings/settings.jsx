import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Form } from "react-bootstrap"
import axiosInstance from '../auth/instance'
import { useAuth } from "../auth/context"

function Settings() {

	const navigate = useNavigate()

	const [nUsername, setNUsername] = useState('')
	const [password1, setPassword1] = useState('')
	const [passShow1, setPassShow1] = useState(false)

	const [password2, setPassword2] = useState('')
	const [passShow2, setPassShow2] = useState(false)
	const [nPassword1, setNPassword1] = useState('')
	const [nPassShow1, setNPassShow1] = useState(false)
	const [nPassword2, setNPassword2] = useState('')
	const [nPassShow2, setNPassShow2] = useState(false)

	const [show, setShow] = useState(false)

	const { logout } = useAuth()

	const changeUsername = async () => {
		try {
			const response = await axiosInstance.put(`/users/api/player/update-name/`,
				{name: nUsername, current_password: password1},
				{headers: {Authorization: `Bearer ${localStorage.getItem("Atoken")}`}})
			navigate("/home")
		}
		catch(error) {
			console.log(error)
		}
	}

	const changePassword = async () => {
		try {
			const response = await axiosInstance.put(`/users/api/player/update-PWD/`,
				{current_password: password2, password1: nPassword1, password2: nPassword2},
				{headers: {Authorization: `Bearer ${localStorage.getItem("Atoken")}`}})
			navigate("/home")
		}
		catch(error) {
			console.log(error)
		}
	}

	const removeProfile = async () => {
		try {
			const response = await axiosInstance.delete(`/users/api/player/delete/`,
				{headers: {Authorization: `Bearer ${localStorage.getItem("Atoken")}`}})
			logout()
		}
		catch(error) {
			console.log(error)
		}
		
	}

	return (
		<>
			<div className="rounded border border-black border-2 px-3 px-lg-5 pt-2 pt-lg-4 pb-3 pb-lg-4 mx-4"
				style={{background: "rgba(0, 0, 0, 0.7)"}}>
				<h1 className="mb-2 text-light">Change your username</h1>
				<Form>
					<Form.Group className="fs-5 fs-lg-4 mb-2 mb-lg-4">
						<Form.Label className="mb-2 text-light">New Username</Form.Label>
						<Form.Control type="text" value={nUsername} placeholder="Insert new username" 
							onChange={(e) => setNUsername(e.target.value)} name="username" id="username"/>
					</Form.Group>
					<Form.Group className="fs-5 fs-lg-4 mb-2 mb-lg-4">
						<Form.Label className="mb-2 text-light">Password</Form.Label>
						<div className="d-flex">
							<Form.Control type={passShow1 ? "text" : "password"} onChange={(e) => setPassword1(e.target.value)}
								id="password1" className="rounded-0 rounded-start"
								value={password1} placeholder="Insert password" name="password"/>
							<Button type="button" className="rounded-0 rounded-end btn btn-light"
								aria-label="show" onClick={() => setPassShow1(!passShow1)}>
								{passShow1
									? <i className="eye bi-eye-fill"></i>
									: <i className="eye bi-eye-slash-fill"></i>}
							</Button>
						</div>
					</Form.Group>
					<div className="d-flex justify-content-center mt-4">
						<Button type="button" className="btn btn-secondary rounded fw-bolder"
							onClick={() => changeUsername()}>UPDATE</Button>
					</div>
				</Form>
			</div>
			<div className="rounded border border-black border-2 px-3 px-lg-5 pt-2 pt-lg-4 pb-3 pb-lg-4 mx-4"
				style={{background: "rgba(0, 0, 0, 0.7)"}}>
				<h1 className="mb-2 text-light">Change your password</h1>
				<Form>
					<Form.Group className="fs-5 fs-lg-4 mb-2 mb-lg-4">
						<Form.Label className="mb-2 text-light">Password</Form.Label>
						<div className="d-flex">
							<Form.Control type={passShow2 ? "text" : "password"} onChange={(e) => setPassword2(e.target.value)}
								id="password2" className="rounded-0 rounded-start"
								value={password2} placeholder="Insert password" name="password"/>
							<Button type="button" className="rounded-0 rounded-end btn btn-light"
									aria-label="show" onClick={() => setPassShow2(!passShow2)}>
								{passShow2
									? <i className="eye bi-eye-fill"></i>
									: <i className="eye bi-eye-slash-fill"></i>}
							</Button>
						</div>
					</Form.Group>
					<Form.Group className="fs-5 fs-lg-4 mb-2 mb-lg-4">
						<Form.Label className="mb-2 text-light">New password</Form.Label>
						<div className="d-flex">
							<Form.Control type={nPassShow1 ? "text" : "password"} onChange={(e) => setNPassword1(e.target.value)}
								id="npassword1" className="rounded-0 rounded-start" name="password"
								value={nPassword1} placeholder="Insert new password"/>
							<Button type="button" className="rounded-0 rounded-end btn btn-light"
									aria-label="show" onClick={() => setNPassShow1(!nPassShow1)}>
								{nPassShow1
									? <i className="eye bi-eye-fill"></i>
									: <i className="eye bi-eye-slash-fill"></i>}
							</Button>
						</div>
						<div className="d-flex">
							<Form.Control type={nPassShow2 ? "text" : "password"} onChange={(e) => setNPassword2(e.target.value)}
								id="npassword2" className="rounded-0 rounded-start" name="password"
								value={nPassword2} placeholder="Confirm new password"/>
							<Button type="button" className="rounded-0 rounded-end btn btn-light"
									aria-label="show" onClick={() => setNPassShow2(!nPassShow2)}>
								{nPassShow2
									? <i className="eye bi-eye-fill"></i>
									: <i className="eye bi-eye-slash-fill"></i>}
							</Button>
						</div>
					</Form.Group>
					<div className="d-flex justify-content-center mt-4">
						<Button type="button" className="btn btn-secondary rounded fw-bolder"
							onClick={() => changePassword()}>UPDATE</Button>
					</div>
				</Form>
			</div>
			<div className="rounded border border-black border-2 px-3 px-lg-5 pt-2 pt-lg-4 pb-3 pb-lg-4 mx-4"
				style={{background: "rgba(0, 0, 0, 0.7)"}}>
				<h1 className="mb-2 text-light">Delete your profile</h1>
				<div className="d-flex justify-content-center mt-4">
					<Button type="button" onClick={() => removeProfile()}
						className="btn btn-secondary rounded fw-bolder">DELETE</Button>
				</div>
			</div>
		</>
	)
}

export default Settings
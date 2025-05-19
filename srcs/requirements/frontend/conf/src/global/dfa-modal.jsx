import React, { useEffect, useState } from "react"
import { Modal, Button } from "react-bootstrap"
import axiosInstance from "../auth/instance"


function DFAModal({ show, hide, status }) {

	const [qrCode, setQrCode] = useState("")
	const [code, setCode] = useState("")

	const fonction = async () => {
		try {
			const response = await axiosInstance.put("/users/api/2fa-enable/")
			console.log(response)
			if (response.data.code == "1000")
				setQrCode(response.data.qr_code_image)
		}
		catch(error) {console.log(error)}
	}

	const fonction2 = async (code) => {
		try {
			const response = await axiosInstance.put("/users/api/2fa-enable/", {otp_code: code})
			console.log(response)
			if (response.data.code == "1000") {
				hide()
				window.location.reload()
			}
		}
		catch(error) {console.log(error)}
	}

	useEffect(() => {
		if (show)
			fonction()
	}, [show])

	return (
		<Modal show={show} onHide={hide}>
			<Modal.Header closeButton>
				<Modal.Title></Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{qrCode && (
				<div className="text-center mb-3">
					<img src={qrCode} alt="QR Code" style={{ maxWidth: "100%" }} />
				</div>)}
				<input type="text" className="form-control mb-3" placeholder="Enter 2FA code"
					value={code} onChange={(e) => setCode(e.target.value)}/>
				<Button type="button" className="btn btn-secondary rounded fw-bolder"
					onClick={() => fonction2()}>{status ? "Remove" : "Add"}</Button>
			</Modal.Body>
		</Modal>
	)
}

export default DFAModal
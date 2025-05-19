import React, { useEffect, useState } from "react"
import { Modal, Button } from "react-bootstrap"
import { useAuth } from "../auth/context"


function DFAModal({ dfaShow, hideDFA, status }) {

	const { axios } = useAuth()

	const [qrCode, setQrCode] = useState("")
	const [code, setCode] = useState("")

	const fonction = async () => {
		try {
			const response = await axios.put("/users/api/2fa-enable/")
			console.log(response)
			if (response.data.code == "1000")
				setQrCode(response.data.qr_code_url)
		}
		catch(error) {console.log(error)}
	}

	const fonction2 = async (code) => {
		try {
			const response = await axios.put("/users/api/2fa-enable/", {otp_code: code})
			console.log(response)
			if (response.data.code == "1000") {
				hideDFA()
				window.location.reload()
			}
		}
		catch(error) {console.log(error)}
	}

	useEffect(() => {
		if (dfaShow)
			fonction()
	}, [dfaShow])

	//if (!qrUrl) return(<></>)

	return (
		<Modal show={dfaShow} onHide={hideDFA}>
			<Modal.Header closeButton>
				<Modal.Title></Modal.Title>
			</Modal.Header>
			<Modal.Body>
				
				
				<Button type="button" className="btn btn-secondary rounded fw-bolder"
					onClick={() => fonction2()}>{status ? "Remove" : "Add"}</Button>
			</Modal.Body>
		</Modal>
	)
}

export default DFAModal

/*<div className="text-center mb-3">
					<QRCode value={qrUrl} size={256}/>
				</div>*/

				/*<Form.Group className="fs-5 fs-lg-4 mb-2 mb-lg-4">
					<Form.Label className="mb-2 text-light">Password</Form.Label>
						<div className="d-flex">
							<Form.Control type="text" onChange={(e) => setCode(e.target.value)}
								id="2FAcode" className="rounded-0 rounded-start"
								value={code} placeholder="Insert code" name="code"/>
						</div>
					</Form.Group>*/
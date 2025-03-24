import React from "react"
import { useNavigate } from "react-router-dom"
import { Modal, Button } from "react-bootstrap"
import "./style.css"

function QuitModal({ quit, setQuit }) {

	const navigate = useNavigate()

	const handleClose = () => setQuit(false)

	const disconnect = () => {

		handleClose()
		localStorage.removeItem("jwt")
		navigate("/")
	}

	return (
		<Modal show={quit} onHide={handleClose} className="global-modal">
			<Modal.Header closeButton>
				<Modal.Title>Are you sure you want to log out ?</Modal.Title>
			</Modal.Header>
			<Modal.Body className="global-quit-button">
				<Button onClick={disconnect} className="global-quit-yes">Yes</Button>
				<Button onClick={handleClose} className="global-quit-no">No</Button>
			</Modal.Body>
		</Modal>
	)
}

export default QuitModal
import React from "react"
import { Modal } from "react-bootstrap"

function ChatModal({ chat, setChat }) {

	const handleClose = () => setChat(false)

	return (
		<Modal show={chat} onHide={handleClose}>
			<Modal.Header closeButton/>
			<Modal.Body>
			</Modal.Body>
		</Modal>
	)
}

export default ChatModal
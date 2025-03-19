import React, { useEffect, useState } from "react"
import { Modal } from "react-bootstrap"
import "./style.css"

function ResizeModal({ resize }) {

	const [show, setShow] = useState(false)

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	useEffect(() => {
	
		if (resize == false) {
			handleShow()
		}
		else {
			handleClose()
		}
	}, [resize])

	return (
		<Modal show={show} onHide={handleClose} className="global-modal">
			<Modal.Header closeButton>
				<Modal.Title>Warning</Modal.Title>
			</Modal.Header>
			<Modal.Body>Below certain resolutions, page content may not be displayed.
			<br/>Please resize the window.</Modal.Body>
		</Modal>
	)
}

export default ResizeModal

/*{
	position: absolute;
	top: 100%;
}  */
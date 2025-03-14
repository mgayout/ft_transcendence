import React, { useEffect, useState } from "react"
import { Modal } from "react-bootstrap"

function ResizeModal({ resize }) {

	const [show, setShow] = useState(false)

	const handleCLose = () => setShow(false)
	const handleShow = () => setShow(true)

	useEffect(() => {
	
		if (resize == false) {
			handleShow()
		}
		else {
			handleCLose()
		}
	}, [resize])

	return (
		<Modal show={show} onHide={handleCLose}>
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
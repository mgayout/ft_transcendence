import React from "react"
import { useNavigate } from "react-router-dom"
import { Modal, Tabs, Tab } from "react-bootstrap"
import "./style.css"

function FriendModal({ friend, setFriend }) {

	const navigate = useNavigate()

	const handleClose = () => setFriend(false)


	return (
		<Modal show={friend} onHide={handleClose} className="global-modal">
			<Modal.Header closeButton />
			<Modal.Body className="">
				<Tabs defaultActiveKey="friendlist" className="" fill>
      				<Tab className="global-friend-tab" eventKey="friendlist" title="Friend List">
						<div className="global-friend-searchbar">
    						<input type="text" className="" placeholder="Search for a friend..." /*onkeyup={filterList()}*//>
  						</div>
      				</Tab>
      				<Tab className="global-friend-tab" eventKey="addfriend" title="Add Friend">
						<div className="global-friend-searchbar">
    						<input type="text" className="" placeholder="Search for a friend..." /*onkeyup={filterList()}*//>
  						</div>
      				</Tab>
    			</Tabs>
			</Modal.Body>
		</Modal>
	)
}

export default FriendModal
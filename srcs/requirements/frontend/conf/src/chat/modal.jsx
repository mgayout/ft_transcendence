import React, { useEffect, useState, useRef } from "react"
import { Modal } from "react-bootstrap"
import axiosInstance from '../auth/instance'
import { useChat } from "../websockets/chat"
import { useAuth } from "../auth/context"
import { usePrivateChat } from "../websockets/privateChat.jsx"
import { updateTime, updateSender, updateContent} from "./string.js"

function ChatModal({ chat, setChat }) {

	const handleClose = () => setChat(false)
	const [chats, setChats] = useState([])
	const [message, setMessage] = useState("")
	const { user } = useAuth()
	const { messages } = useChat()
	const { privMessages } = usePrivateChat()
	const bottomRefs = useRef([])

	const fonction = async () => {
		try {
			const a = await axiosInstance.get("/live_chat/general/messages/")
			const b = await axiosInstance.get("/live_chat/private/list/")
			const c = await axiosInstance.get('/users/api/friend/list/')
			const d = c.data
				.filter(c => c.player_1 == user.name && c.status == "accepted")
			const temp = []

			temp.push({
				lower : "general",
				groupNAME: "General",
				groupID: 0,
				id: 0,
				active: true,
				data: a.data.data
			})

			async function getId(friendname) {
				try {
					const e = await axiosInstance.get('/users/api/player/')
					const player = e.data.find(e => e.name == friendname)
					return player ? player.id : 0
				}
				catch (error) {
					console.log(error)
					return 0
				}
			}

			for (let i = 0; i < d.length; i++) {
				const groupNAME = d[i].player_2
				const groupID = await getId(d[i].player_2)
				const lower = d[i].player_2.toLowerCase()
				const id = i + 1
				const data = b.data.data
					.filter(b => b.sender_name == d[i].player_2 || b.receiver_name == d[i].player_2)
				temp.push({lower: lower, groupNAME: groupNAME, groupID: groupID, id: id, active: false, data: data ? data : []})
			}
			setChats(temp)
		}
		catch(error) {
			console.log(error)
		}
	}

	const send = async (id) => {
		if (!message) return
		try {
			if (id)
				await axiosInstance.post(`/live_chat/private/send/${id}/`, {content: message})
			else
				await axiosInstance.post("/live_chat/general/send/", {content: message})}
		catch(error) {console.log(error)}
		finally {setMessage("")}
	}

	useEffect(() => {
		if (chat == true)
			fonction()
	}, [chat, messages, privMessages])

	useEffect(() => {
		const activeChat = chats.find(c => c.active)
		if (activeChat && bottomRefs.current[activeChat.id]?.current) {
			setTimeout(() => {
				bottomRefs.current[activeChat.id].current.scrollIntoView({ behavior: "smooth" })
			}, 50)
		}
	}, [chats])

	const renderChatTab = (lower, active, groupID, id, data) => {
		
		if (!bottomRefs.current[id])
			bottomRefs.current[id] = React.createRef()
		return (
			<div id={`v-pills-${lower}`} role="tabpanel" style={{ flex: 1 }} aria-labelledby={`v-pills-${lower}-tab`} tabIndex="0"
				className={`tab-pane fade ${active ? "show active" : ""}`}>
				<div style={{ height: '70vh', border: '1px solid #ccc', borderRadius: '8px' }}
					className="d-flex flex-column bg-white p-3 w-100">
					<div style={{ border: '1px solid #ddd', borderRadius: '4px', padding: '10px', backgroundColor: '#f8f9fa' }}
						className="flex-grow-1 overflow-auto mb-3">
   						{[...data].reverse().map((chatItem) => (
							<p style={{ whiteSpace: "pre-wrap" }}>
								{"["}{updateTime(chatItem.timestamp)}{"]"} | {updateSender(chatItem.sender_name)} | {updateContent(chatItem.content)}
							</p>
						))}
						<div ref={bottomRefs.current[id]} />
					</div>
					<div className="input-group">
						<input type="text" value={ message } className="form-control" placeholder="Write something..."
							onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => {if (e.key === "Enter") {
								e.preventDefault()
								send(groupID)}}}/>
						<button className="btn btn-primary" type="button" onClick={() => send(groupID)}>Send</button>
					</div>
				</div>
			</div>
		)
	}

	return (
		<Modal show={chat} onHide={handleClose} size="xl">
			<Modal.Header closeButton />
			<Modal.Body>
				<div className="d-flex align-items-start w-100">
  					<div className="nav flex-column nav-pills me-3" role="tablist" aria-orientation="vertical">
					{chats.map((chatItem) => (
						<button	key={chatItem.lower}
								className={`nav-link ${chatItem.active ? "active" : ""}`}
								id={`v-pills-${chatItem.lower}-tab`}
								data-bs-toggle="pill"
								data-bs-target={`#v-pills-${chatItem.lower}`}
								type="button"
								role="tab"
								aria-controls={`v-pills-${chatItem.lower}`}
								aria-selected="true"
						>{chatItem.groupNAME}</button>))}
					</div>
					<div className="tab-content flex-grow-1 w-100">
					{chats.map((chatItem) => (
						renderChatTab(chatItem.lower, chatItem.active, chatItem.groupID, chatItem.id, chatItem.data)))}
					</div>
				</div>
			</Modal.Body>
		</Modal>
	)
}

export default ChatModal
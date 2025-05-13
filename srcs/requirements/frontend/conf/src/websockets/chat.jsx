import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useAuth } from '../auth/context'

const ChatContext = createContext(null)

export const useChat = () => useContext(ChatContext)

export const Chat = ({ children }) => {
	const navigate = useNavigate()
	const socketRef = useRef(null)
	const [messages, setMessages] = useState([])
	const { isAuth } = useAuth()

	useEffect(() => {
		if (!isAuth) return
		const Atoken = localStorage.getItem('Atoken')
		const id = localStorage.getItem("id")
		const ws = new WebSocket(`ws://${id}/live_chat/ws/chat/general/?token=${Atoken}`)
		//const ws = new WebSocket(`wss://transcendence.fr/live_chat/ws/chat/general/?token=${Atoken}`)
		socketRef.current = ws

		ws.onopen = () => {
			console.log("Chat WebSocket is open.")
		}

		ws.onmessage = (event) => {
			const data = JSON.parse(event.data)
			console.log(data)
		}

		ws.onclose = () => {
			setMessages([])
			console.log("Chat WebSocket closed")
		}

		ws.onerror = (err) => {
			console.error("Chat WebSocket error", err)
		}

		return () => {
			ws.close()
		}
		
	}, [isAuth])

	return (
		<ChatContext.Provider value={{ getSocket: () => socketRef.current, messages }}>
			{children}
		</ChatContext.Provider>
	)
}
import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useAuth } from '../auth/context'

const PrivateChatContext = createContext(null)

export const usePrivateChat = () => useContext(PrivateChatContext)

export const PrivateChat = ({ children }) => {

	const socketRef = useRef(null)
	const [privMessages, setMessages] = useState([])
	const { user } = useAuth()

	useEffect(() => {
		if (!user) return
		const Atoken = localStorage.getItem('Atoken')
		const ws = new WebSocket(`wss://${location.host}/live_chat/ws/chat/private/${user.id}/?token=${Atoken}`)
		socketRef.current = ws

		ws.onopen = () => {
			console.log("PrivateChat WebSocket is open.")
		}

		ws.onmessage = (event) => {
			const data = JSON.parse(event.data)
			if (data && data.code != "1000") {
				console.log("PrivateChat notif => ", data)
				setMessages(data)
			}
		}

		ws.onclose = () => {
			setMessages([])
			console.log("PrivateChat WebSocket closed")
		}

		ws.onerror = (err) => {
			console.error("PrivateChat WebSocket error", err)
		}

		return () => {
			ws.close()
		}
		
	}, [user])

	return (
		<PrivateChatContext.Provider value={{ getSocket: () => socketRef.current, privMessages }}>
			{children}
		</PrivateChatContext.Provider>
	)
}

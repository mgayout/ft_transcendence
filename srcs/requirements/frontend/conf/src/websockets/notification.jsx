import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useAuth } from "../auth/context.jsx"

const NotificationContext = createContext(null)

export const useNotification = () => useContext(NotificationContext)

export const Notification = ({ children }) => {
	const socketRef = useRef(null)
	const [messages, setMessages] = useState([])
	const { isAuth } = useAuth()

	useEffect(() => {
		if (!isAuth) return
		const Atoken = localStorage.getItem('Atoken')
		const ws = new WebSocket(`wss://${location.host}/pong/ws/notifications/?token=${Atoken}`)
		socketRef.current = ws

		ws.onopen = () => {
			console.log("Notification WebSocket is open.")
		}

		ws.onmessage = (event) => {
			const data = JSON.parse(event.data)
			if (data.type == "invitation_declined") {
				console.log(`${data.to_player} declined your invitation.`)
				setMessages(data)
			}
			else if (data.type == "invitation_received")
				console.log(`${data.from_player} invited you.`)
			else if (data.type == "match_created") {
				console.log(`Match [${data.match_id}] has been created.`)
				setMessages(data)
			}
			else
				console.log(data)
		}

		ws.onclose = () => {
			console.log("Notification WebSocket closed")
		}

		ws.onerror = (err) => {
			console.error("Notification WebSocket error", err)
		}

		return () => {
			ws.close()
		}
	}, [isAuth])

	return (
		<NotificationContext.Provider value={{ socket: socketRef.current, messages, setMessages }}>
			{children}
		</NotificationContext.Provider>
	)
}

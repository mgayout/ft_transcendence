import React, { createContext, useContext, useEffect, useRef, useState } from 'react'

const GameContext = createContext(null)

export const useGame = () => useContext(GameContext)

export const Game = ({ children }) => {
	const socketRef = useRef(null)
	const [messages, setMessages] = useState([])
	const [url, setUrl] = useState('')

	useEffect(() => {
		if (!url) return
		const Atoken = localStorage.getItem('Atoken')
		const ws = new WebSocket(`${url}?token=${Atoken}`)
		socketRef.current = ws

		ws.onopen = () => {
			console.log("Game WebSocket is open.")
		}

		ws.onmessage = (event) => {
			const data = JSON.parse(event.data)
			setMessages(data)
		}

		ws.onclose = () => {
			console.log("Game WebSocket closed")
		}

		ws.onerror = (err) => {
			console.error("Game WebSocket error", err)
		}

		return () => {
			ws.close()
			localStorage.removeItem("online")
		}
	}, [url])

	return (
		<GameContext.Provider value={{ getSocket: () => socketRef.current, messages, setUrl }}>
			{children}
		</GameContext.Provider>
	)
}
import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom"

const GameContext = createContext(null)

export const useGame = () => useContext(GameContext)

export const Game = ({ children }) => {
	const navigate = useNavigate()
	const socketRef = useRef(null)
	const [messages, setMessages] = useState([])
	const [PongMessages, setPongMessages] = useState([])
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
			if (data.type == "match_created")
				setMessages(data)
			if (data.type == "data_pong")
				setPongMessages((prev) => [...prev, data])
			else if (data.type)
				setMessages((prev) => [...prev, data])
			else
				console.log(data)
		}

		ws.onclose = () => {
			setUrl("")
			setMessages([])
			setPongMessages([])
			console.log("Game WebSocket closed")
		}

		ws.onerror = (err) => {
			console.error("Game WebSocket error", err)
			if (socketRef.current?.readyState === WebSocket.OPEN)
				socketRef.current.close()
			navigate("/home")
		}

		return () => {
			ws.close()
		}
		
	}, [url])

	useEffect(() => {
		const handleBeforeUnload = () => {
			if (socketRef.current?.readyState === WebSocket.OPEN)
				socketRef.current.close()
		}
		window.addEventListener('beforeunload', handleBeforeUnload)
		return () => {window.removeEventListener('beforeunload', handleBeforeUnload)}
	}, [])

	return (
		<GameContext.Provider value={{ getSocket: () => socketRef.current, messages, PongMessages, setUrl }}>
			{children}
		</GameContext.Provider>
	)
}
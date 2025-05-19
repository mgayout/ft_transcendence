import React, { useEffect, useState } from "react"
import { Button, Spinner } from "react-bootstrap"
import { useNotification } from "../websockets/notification"
import { useGame } from "../websockets/game"
import axiosInstance from "../auth/instance"

function WaitMatch({ setState, type, setType }) {

	const { messages } = useNotification()
	const { setUrl } = useGame()
	const [ready, setReady] = useState(false)
	const [data, setData] = useState({})

	const fonction = async () => {
		try {
			const playerData = await axiosInstance.get('/users/api/player/')
			const tournamentData = await axiosInstance.get("/pong/tournament/list/")
			//console.log(tournamentData)
			const getName = (id) => {
				if (!id || id == null) return "..."
				const Name = playerData.data.find(player => player.id === id)
				return Name.name
			}
			const getAvatar = (id) => {
				if (!id || id == null) return "null"
				const Avatar = playerData.data.find(player => player.id === id)
				return Avatar.avatar
			}
			const getPlayers = (p1, p2, p3, p4) => {
				let players = 0
				if (p1) players++
				if (p2)	players++
				if (p3) players++
				if (p4) players++
				return players
			}
			const a = tournamentData.data
				.map(tourn => ({
					name: tourn.name,
					id: tourn.id,
					p1: {name: getName(tourn.player_1), avatar: getAvatar(tourn.player_1)},
					p2: {name: getName(tourn.player_2), avatar: getAvatar(tourn.player_2)},
					p3: {name: getName(tourn.player_3), avatar: getAvatar(tourn.player_3)},
					p4: {name: getName(tourn.player_4), avatar: getAvatar(tourn.player_4)},
					players: getPlayers(tourn.player_1, tourn.player_2, tourn.player_3, tourn.player_4)}))
			if (a.length > 0)
				setData(a[0])
		}
		catch(error) {console.log(error)}
	}

	const play = async (id) => {
		if (ready == false) return
		try {
			const response = await axiosInstance.put(`/pong/tournament/${id}/start/`)
			console.log(response)
		}
		catch(error) {console.log(error)}
	}


	const cancel = async (id) => {
		try {await axiosInstance.delete(`/pong/tournament/${id}/cancel/`)}
		catch(error) {console.log(error)}
	}

	const leave = async (id) => {
		try {
			await axiosInstance.put(`/pong/tournament/${id}/leave/`)
			setType("")
			setState("")
		}
		catch(error) {console.log(error)}
	}

	useEffect(() => {
		if (messages.type == "tournament_created" || messages.type == "player_joined" || messages.type == "player_leave")
			fonction()
		if (messages.type == "tournament_cancelled") {
			setState("")
			setType("")
		}
	}, [messages])

	useEffect(() => {
		if (data && data.players == 4)
			setReady(true)
		else
			setReady(false)
	}, [data])

	return (
		<div className="position-absolute top-0 d-flex justify-content-center align-items-center vh-100 w-100">
			<div className="rounded border border-black border-2 px-3 px-lg-5 pt-2 pt-lg-4 pb-3 pb-lg-4"
				style={{background: "rgba(0, 0, 0, 0.7)"}}>
				<div className="d-flex flex-column align-items-center">
				{data && data.p1 && data.p2 && data.p3 && data.p4 ?
				<>
					<span className="text-white mb-3">{data.name}</span>
					{data.p1.avatar != "null" ?
					<img src={data.p1.avatar} className="mb-1" style={{ width: '80px', height: '80px', borderRadius: '50%' }}/> :
					<Spinner animation="border" style={{ width: '3rem', height: '3rem' }} className="mb-2"/>}
					<div className="text-white mb-3">{data.p1.name}</div>
					{data.p2.avatar != "null" ?
					<img src={data.p2.avatar} className="mb-1" style={{ width: '80px', height: '80px', borderRadius: '50%' }}/> :
					<Spinner animation="border" style={{ width: '3rem', height: '3rem' }} className="mb-2"/>}
					<div className="text-white mb-3">{data.p2.name}</div>
					{data.p3.avatar != "null" ?
					<img src={data.p3.avatar} className="mb-1" style={{ width: '80px', height: '80px', borderRadius: '50%' }}/> :
					<Spinner animation="border" style={{ width: '3rem', height: '3rem' }} className="mb-2"/>}
					<div className="text-white mb-3">{data.p3.name}</div>
					{data.p4.avatar != "null" ?
					<img src={data.p4.avatar} className="mb-1" style={{ width: '80px', height: '80px', borderRadius: '50%' }}/> :
					<Spinner animation="border" style={{ width: '3rem', height: '3rem' }} className="mb-2"/>}
					<div className="text-white mb-3">{data.p4.name}</div>
					<Button type="button" variant={ready ? "success" : "danger" } className="btn btn-secondary rounded fw-bolder mt-3" onClick={() => play(data.id)}>Play</Button>
					{type == "host" ?
					<Button type="button" className="btn btn-secondary rounded fw-bolder mt-3" onClick={() => cancel(data.id)}>Cancel</Button> :
					<Button type="button" className="btn btn-secondary rounded fw-bolder mt-3" onClick={() => leave(data.id)}>Leave</Button>}
				</>	
				: <></>}
				</div>
			</div>
		</div>
	)
}

export default WaitMatch
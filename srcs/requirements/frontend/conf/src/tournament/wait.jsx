import React, { useEffect, useState } from "react"
import { Button, Spinner } from "react-bootstrap"
import { useAuth } from "../auth/context"
import { useNotification } from "../websockets/notification"
import { useGame } from "../websockets/game"
import axiosInstance from "../auth/instance"

function WaitMatch({ setState, type }) {

	const { user } = useAuth()
	const [friendName, setFriendName] = useState("")
	const [friend, setFriend] = useState(null)
	const { messages, setMessages } = useNotification()
	const { setUrl } = useGame()
	const [ready, setReady] = useState(false)
	const [data, setData] = useState({})

	/*const play = () => {
		setUrl(messages.ws_url)
		setMessages([])
		setState("play")
	}*/

	/*const cancel = async () => {
		try {
			const invitations = await axiosInstance.get("/pong/invitations/")
			const a = invitations.data.find(invite => invite.from_player.name == user.name)
			await axiosInstance.put(`/pong/invitations/${a.id}/cancel/`)
			setState("")
		}
		catch(error) {
			console.log(error)
		}
	}*/

	/*const getFriend = async () => {
		try {
			const playerData = await axiosInstance.get('/users/api/player/')
			const a = playerData.data
				.find(player => player.name == friendName)
			setFriend({name: a.name, avatar: a.avatar})
			setReady(true)
		}
		catch(error) {
			console.log(error)
		}
	}*/

	/*useEffect(() => {
		if (friendName)
			getFriend()
	}, [friendName])*/

	/*useEffect(() => {
		if (messages.type == "match_created") setFriendName(user.name == messages.player_1 ? messages.player_2 : messages.player_1)
		if (messages.type == "invitation_declined") {
			setState("")
			setMessages([])
		}
	}, [messages])*/

	const fonction = async () => {
		try {
			const playerData = await axiosInstance.get('/users/api/player/')
			const tournamentData = await axiosInstance.get("/pong/tournament/list/")
			console.log(tournamentData)
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
			const a = tournamentData.data
				.map(tourn => ({
					name: tourn.name,
					id: tourn.id,
					p1: {name: getName(tourn.player_1), avatar: getAvatar(tourn.player_1)},
					p2: {name: getName(tourn.player_2), avatar: getAvatar(tourn.player_2)},
					p3: {name: getName(tourn.player_3), avatar: getAvatar(tourn.player_3)},
					p4: {name: getName(tourn.player_4), avatar: getAvatar(tourn.player_4)}}))
			if (a.length > 0)
				setData(a[0])
		}
		catch(error) {console.log(error)}
	}

	const cancel = async (id) => {
		try {
			await axiosInstance.delete(`/pong/tournament/${id}/cancel/`)
		}
		catch(error) {console.log(error)}
	}

	const leave = async (id) => {
		try {
			await axiosInstance.put(`/pong/tournament/${id}/leave/`)
		}
		catch(error) {console.log(error)}
	}

	useEffect(() => {
		if (messages.type == "tournament_created" || messages.type == "player_joined")
			fonction()
	}, [messages])

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
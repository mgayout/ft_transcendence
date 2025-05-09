import React, { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import axiosInstance from '../../auth/instance'
import { useAuth } from "../../auth/context"

function JoinMatch({ setState, setType }) {

	const [data, setData] = useState(null)
	const { user } = useAuth()
	const Atoken = localStorage.getItem('Atoken')
	const Rtoken = localStorage.getItem('Rtoken')
	const config = {headers: {Authorization: `Bearer ${Atoken}`}}
	const params = { token: Rtoken }

	const fonction = async () => {
		try {
			const playerData = await axiosInstance.get('/users/api/player/', {headers: config.headers, param: params})
			const invitations = await axiosInstance.get("pong/invitations/")
			const getAvatar = (name) => {
				const Avatar = playerData.data.find(player => player.name === name)
				return Avatar.avatar
			}
			const a = invitations.data
				.filter(player => player.to_player.id == user.id)
				.map(player => ({name: player.from_player.name, id: player.id, avatar: getAvatar(player.from_player.name)}))
			setData(a)
		}
		catch(error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fonction()
	}, [])

	const accept = async (id) => {
		try {
			await axiosInstance.put(`pong/invitations/${id}/accept/`)
			setType("paddle_r")
			setState("wait")
		}
		catch(error) {
			console.log(error)
		}
	}

	const decline = async (id) => {
		try {
			await axiosInstance.put(`pong/invitations/${id}/decline/`)
			setState("")
		}
		catch(error) {
			console.log(error)
		}
	}

	return (
		<div className="position-absolute top-0 d-flex justify-content-center align-items-center vh-100 w-100">
			<div className="rounded border border-black border-2 px-3 px-lg-5 pt-2 pt-lg-4 pb-3 pb-lg-4"
				style={{background: "rgba(0, 0, 0, 0.7)"}}>
				<h1>Who would you want to join ?</h1>
				<ul>
				{data && data.length > 0 
					? (data.map((player, index) => (
					<li key={index}>
						<img src={player.avatar} alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }}/>
						{player.name}
						<Button type="button" onClick={() => accept(player.id)}>Accept</Button>
						<Button type="button" onClick={() => decline(player.id)}>Decline</Button>
					</li>)))
					: <li>No invitation found</li>}
				</ul>
			</div>
		</div>
	)
}

export default JoinMatch
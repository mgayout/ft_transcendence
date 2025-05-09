import React, { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import axiosInstance from '../../auth/instance'
import { useAuth } from "../../auth/context"

function CreateMatch({ setState, setType }) {

	const [data, setData] = useState(null)
	const { user } = useAuth()
	const Atoken = localStorage.getItem('Atoken')
	const Rtoken = localStorage.getItem('Rtoken')
	const config = {headers: {Authorization: `Bearer ${Atoken}`}}
	const params = { token: Rtoken }

	const fonction = async () => {
		try {
			const playerData = await axiosInstance.get('users/api/player/', {headers: config.headers, param: params})
			const friendData = await axiosInstance.get('users/api/friend/list/', {headers: config.headers, param: params})
			const a = playerData.data
				.filter(player => friendData.data.some(friend => friend.status == "accepted" && friend.player_1 == player.name) && player.name != user.name)
				.filter(player => ({name: player.name, id: player.id, avatar: player.avatar}))
			setData(a)
		}
		catch(error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fonction()
	}, [])

	const invite = async (id) => {
		try {
			console.log(id)
			await axiosInstance.post("pong/invitations/create/", {player_2_id: id})
			setType("paddle_l")
			setState("wait")
		}
		catch(error) {
			console.log(error)
		}
	}

	return (
		<div className="position-absolute top-0 d-flex justify-content-center align-items-center vh-100 w-100">
			<div className="rounded border border-black border-2 px-3 px-lg-5 pt-2 pt-lg-4 pb-3 pb-lg-4"
				style={{background: "rgba(0, 0, 0, 0.7)"}}>
				<h1>Who would you want to invite ?</h1>
				<ul>
				{data && data.length > 0 
					? (data.map((player, index) => (
					<li key={index}>
						<img src={player.avatar} alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }}/>
						{player.name}
						<Button type="button" onClick={() => invite(player.id)}>Invite</Button>
					</li>)))
					: <li>No friends found</li>}
				</ul>
			</div>
		</div>
	)
}

export default CreateMatch
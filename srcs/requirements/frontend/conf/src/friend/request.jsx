import React, { useState, useEffect } from "react"
import { useAuth } from "../auth/context"
import axiosInstance from '../auth/instance'

function RequestModal({ tab }) {

	const { user } = useAuth()
	const [data, setData] = useState([])
	const [search, setSearch] = useState('')
	const [filteredFriends, setFilteredFriends] = useState([])

	const list = async () => {
		try {
			const playerData = await axiosInstance.get('/users/api/player/')
			const friendData = await axiosInstance.get('/users/api/friend/list/')
			let temp

			const pendingFriends = friendData.data.filter(friend => friend.status == "pending")

			temp = playerData.data
				.filter(player => player.name == user.name && pendingFriends
					.some(friend => friend.player_1 == player.name || friend.player_2 == player.name))
				.map(player => ({
					id: pendingFriends
						.find(friend => friend.player_1 == player.name || friend.player_2 == player.name)?.id,
					avatar: player.avatar,
					sender: pendingFriends
						.find(friend => friend.player_1 == player.name || friend.player_2 == player.name)?.player_1,
					receiver: pendingFriends
						.find(friend => friend.player_1 == player.name || friend.player_2 == player.name)?.player_2}))

			setData(temp)
			setFilteredFriends(temp)
		}
		catch(error) {
			console.log(error)
		}
	}

	const cancelRequest = async (playerID) => {
		try {await axiosInstance.delete(`/users/api/friend-request/cancel/${playerID}/`)}
		catch(error) {console.log(error)}
		finally {list()}
	}

	const acceptRequest = async (playerID) => {
		try {await axiosInstance.put(`/users/api/friend-request/accept/${playerID}/`, { player_2: playerID })}
		catch(error) {console.log(error)}
		finally {list()}
	}

	const rejectRequest = async (playerID) => {
		try {await axiosInstance.delete(`/users/api/friend-request/reject/${playerID}/`)}
		catch(error) {console.log(error)}
		finally {list()}
	}

	const filterList = (e) => {
		const query = e.target.value
		setSearch(query)	
		const filtered = data.filter(player =>player.name.toLowerCase().includes(query.toLowerCase()))
		setFilteredFriends(filtered)
	}
	
	useEffect(() => {
		if (tab == "friendrequest")
			list()
	}, [tab])

	return (
		<>
			<div className="d-flex justify-content-center mb-3">
				<input type="text" className="form-control w-50" placeholder="Search for a friend..." value={search} onChange={filterList} id="searchfriendRequest"/>
			</div>
			<div className="d-flex flex-column align-items-center">
				<ul className="list-unstyled w-100 d-flex flex-column align-items-center gap-3">
				{filteredFriends && filteredFriends.length > 0 
					? (filteredFriends.map((player, index) => (
					<li key={index} className="d-flex align-items-center justify-content-between bg-light rounded p-2 w-50 border-bottom">
						<div className="d-flex align-items-center gap-2">
							<img src={player.avatar} alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }}/>
							<span className="fw-bold">{player.sender == user.name ? player.receiver : player.sender}</span>
						</div>
						<div className="d-flex gap-3">
						{player.sender == user.name
							? (<><i className="bi bi-hourglass-split fs-4" />
							<i className="bi bi-x fs-4" onClick={() => cancelRequest(player.id)}/></>)
							: (<><i className="bi bi-check-lg fs-4" onClick={() => acceptRequest(player.id)}/>
							<i className="bi bi-x fs-4" onClick={() => rejectRequest(player.id)}/></>)}
						</div>
					</li>)))
					: <li>No friends found</li> }
				</ul>
			</div>
		</>
	)
}

export default RequestModal
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Card, Image, Button } from "react-bootstrap"
import axiosInstance from "../auth/instance"

function Profile({ user, profile }) {

	const navigate = useNavigate()
	const [online, setOnline] = useState([])
	
	const fonction = async () => {
		try {
			const response = await axiosInstance.get("/pong/matches/")
			const matches = []
			let tournament, state, other
			for (let i = response.data.length - 1; i >= response.data.length - 5; i--) {
				if (i >= 0) {
					tournament = response.data[i].tournament
					if (response.data[i].winner && response.data[i].winner.name == profile.name)
						state = "Victory"
					else
						state = "Defeat"
					if (response.data[i].player_1 && response.data[i].player_1.name == profile.name) {
						if (response.data[i].player_2)
							other = response.data[i].player_2.name
						else
							other = "..."
					}
					else {
						if (response.data[i].player_1)
							other = response.data[i].player_1.name
						else
							other = "..."
					}
				}
				else {
					tournament = ""
					state = ""
					other = ""
				}
				matches.push({
					tournament: tournament,
					state: state,
					other: other})
			}
			setOnline(matches)
		}
		catch(error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fonction()
		return() => setOnline([])
	},[profile])
	
	function CardItem({ card }) {
		let cardColor

		if (!card.state)
			cardColor = "bg-secondary"
		else if (card.state == "Victory")
			cardColor = "bg-success"
		else
			cardColor = "bg-danger"

		return (
			<div className="d-flex" style={{ flex: "1 1 250px", maxWidth: "300px" }}>
				<Card className={`d-flex flex-row align-items-center rounded-0 text-white ${cardColor} w-100`} style={{ maxWidth: "500px" }}>
					{card.state
						? <>
							<div className="p-2 d-flex align-items-center">
								<Card.Img className="img-fluid" style={{ width: "40px", height: "40px", objectFit: "contain" }}
									src={!card.tournament ? "Online.svg" : "Crown.svg"}/>
							</div>
							<Card.Body className="py-2 px-2">
								<Card.Title className="m-0 text-start fs-6">
								{card.state}<br />
									<small>vs {card.other}</small>
								</Card.Title>
							</Card.Body></> : <></>}
				</Card>
			</div>
		)
	}
	if (!online) return (<></>)
	
	return (
		<div className="container">
			{user.name == profile.name ?
			<Button className="position-absolute top-0 end-0 m-2 rounded-0 btn btn-dark fw-bolder" onClick={() => navigate("edit")}>
				<i className="bi bi-pencil" style={{fontSize: "20px"}}/>
			</Button> : <></>}
			<div className="container d-flex flex-column justify-content-center align-items-center">
				<Image src={profile.avatar} className={`${ profile.online
						? "border border-success"
						: "border border-danger"} border-3 rounded-circle`}
					style={{ width: "150px", height: "150px", objectFit: "cover" }}/>
				<h1 className="mt-3 text-light text-center user-select-none">{profile.name}</h1>
				{profile.description && (<h4 className="fst-italic text-light text-center mt-2 user-select-none">"{profile.description}"</h4>)}
				<div className="container py-5">
					<div className="d-flex flex-row justify-content-between align-items-start gap-3 flex-nowrap">
						<div className="d-flex flex-row flex-wrap gap-3" style={{ maxWidth: "75%" }}>
						{online.map((card, idx) => (<CardItem card={card} key={idx}/>))}
						</div>
						<div className="d-flex flex-column align-items-center text-light text-center">
							<h1 className="fs-4">Victory : {profile.victory}<br/>Defeat : {profile.defeat}</h1>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Profile
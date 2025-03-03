import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import './style.css'
import { useNavigate } from "react-router-dom"

function GameMenu() {

	const navigate = useNavigate()

	return (
		<div>
			<p className="localTitleGM">LOCAL</p>
			<p className="onlineTitleGM">ONLINE</p>
			<div className="midlineGM"/>
			<button
				type="button"
				onClick={() => navigate("/localvs")}
				className="local1vs1GM">1vs1</button>
			<button
				type="button"
				onClick={() => navigate("/localtrnm")}
				className="localTournamentGM">Tournament</button>
			<button
				type="button"
				onClick={() => navigate("/localai")}
				className="localvsAIGM">vsAI</button>
			<button
				type="button"
				onClick={() => navigate("")}
				className="online1vs1GM">1vs1</button>
			<button
				type="button"
				onClick={() => navigate("")}
				className="onlineTournamentGM">Tournament</button>
			<button
				type="button"
				onClick={() => navigate("")}
				className="onlineMultiGM">Multiplayer</button>
			<button
				type="button"
				onClick={() => navigate("/")}
				className="discoButtonGM">Disconnect</button>
		</div>
	)
}

export default GameMenu
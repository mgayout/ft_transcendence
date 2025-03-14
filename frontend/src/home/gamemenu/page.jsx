import React from "react"
import { useNavigate } from "react-router-dom"
import { Card } from "react-bootstrap"
import './style.css'

function GameMenu() {

	const navigate = useNavigate()

	return(
		<div className="home-container">
			<Card className="home-card">
      			<Card.Img
					variant="top"
					src="Local.png"
					onClick={() => navigate("/local")}
					className="home-img"/>
      			<Card.Body>
        			<Card.Title className="home-title-card">Local</Card.Title>
      			</Card.Body>
    		</Card>
			<Card className="home-card">
      			<Card.Img
					variant="top"
					src="AI.png"
					onClick={() => navigate("/home")}
					className="home-img"/>
      			<Card.Body>
        			<Card.Title className="home-title-card">AI</Card.Title>
      			</Card.Body>
    		</Card>
			<Card className="home-card">
      			<Card.Img
					variant="top"
					src="Crown.png"
					onClick={() => navigate("/home")}
					className="home-img"/>
      			<Card.Body>
        			<Card.Title className="home-title-card">Tournament</Card.Title>
      			</Card.Body>
    		</Card>
			<Card className="home-card">
      			<Card.Img
					variant="top"
					src="Online.png"
					onClick={() => navigate("/home")}
					className="home-img"/>
      			<Card.Body>
        			<Card.Title className="home-title-card">Online</Card.Title>
      			</Card.Body>
    		</Card>
			<Card className="home-card">
      			<Card.Img
					variant="top"
					src="Multiplayer.png"
					onClick={() => navigate("/home")}
					className="home-img"/>
      			<Card.Body>
        			<Card.Title className="home-title-card">Multiplayer</Card.Title>
      			</Card.Body>
    		</Card>
		</div>
	)
}

export default GameMenu
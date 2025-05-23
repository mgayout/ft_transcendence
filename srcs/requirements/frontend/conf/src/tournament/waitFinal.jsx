import React, { useEffect, useState } from "react"
import { Button, Spinner } from "react-bootstrap"
import { useAuth } from "../auth/context"
import { useNotification } from "../websockets/notification"
import { useGame } from "../websockets/game"
import axiosInstance from "../auth/instance"

function WaitFinal({ setState }) {

	const { user } = useAuth()
	const { NotifMessages } = useNotification()

	const startFinal = async () => {
		try {
			let final
			const idData = await axiosInstance.get("/pong/tournament/get-id/")
			console.log(idData)
			if (idData && idData.finalist1 != null && idData.finalist2 != null)
				final = await axiosInstance.put(`/pong/tournament/${idData.data.tournament_id}/start-final/`)
			
		}
		catch(error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (NotifMessages.type == "match_created") {
			console.log(NotifMessages)
			setState("play")
		}
	}, [NotifMessages])

	useEffect(() => {
		startFinal()
	}, [])

	return (
		<div className="position-absolute top-0 d-flex justify-content-center align-items-center vh-100 w-100">
			<div className="rounded border border-black border-2 px-3 px-lg-5 pt-2 pt-lg-4 pb-3 pb-lg-4"
				style={{background: "rgba(0, 0, 0, 0.7)"}}>
				<div className="d-flex flex-column align-items-center">
					<img src={user.avatar} className="mb-1" style={{ width: '80px', height: '80px', borderRadius: '50%' }}/>
					<div className="text-white mb-3">{user.name}</div>
						<Spinner animation="border" style={{ width: '3rem', height: '3rem' }} className="mb-2"/>
					<div className="text-white mb-3">...</div>
				</div>
			</div>
		</div>
	)
}

export default WaitFinal
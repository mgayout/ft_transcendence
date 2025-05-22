import React, { useEffect, useState } from "react"
import { Button, Spinner } from "react-bootstrap"
import { useAuth } from "../auth/context"
import { useNotification } from "../websockets/notification"
import { useGame } from "../websockets/game"
import axiosInstance from "../auth/instance"

function WaitFinal({ setState }) {

	const { user } = useAuth()
	const { NotifMessages } = useNotification()
	const [ready, setReady] = useState(false)

	useEffect(() => {

	}, [NotifMessages])

	return (
		<div className="position-absolute top-0 d-flex justify-content-center align-items-center vh-100 w-100">
			<div className="rounded border border-black border-2 px-3 px-lg-5 pt-2 pt-lg-4 pb-3 pb-lg-4"
				style={{background: "rgba(0, 0, 0, 0.7)"}}>
				<div className="d-flex flex-column align-items-center">
					<img src={user.avatar} className="mb-1" style={{ width: '80px', height: '80px', borderRadius: '50%' }}/>
					<div className="text-white mb-3">{user.name}</div>
					{ready ? (
					<>
						<img src={friend.avatar} className="mb-1" style={{ width: '80px', height: '80px', borderRadius: '50%' }}/>
						<div className="text-white mb-3">{friend.name}</div>
						<Button type="button" className="btn btn-secondary rounded fw-bolder mt-3" onClick={() => play()}>Play</Button>
					</> ) : (
					<>
						<Spinner animation="border" style={{ width: '3rem', height: '3rem' }} className="mb-2"/>
						<div className="text-white mb-3">...</div>
						<Button type="button" className="btn btn-secondary rounded fw-bolder mt-3" onClick={() => cancel()}>Cancel</Button>
					</> )}
					
				</div>
			</div>
		</div>
	)
}

export default WaitFinal
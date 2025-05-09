import React, { useState } from "react"
import { Button } from "react-bootstrap"
import Header from "../../global/header"
import BGprivate from "../../test/private/page.jsx"
import CreateMatch from "./create.jsx"
import JoinMatch from "./join.jsx"
import WaitMatch from "./wait.jsx"
import PlayMatch from "./play.jsx"

function Online({ user }) {

	const [state, setState] = useState("")
	const [type, setType] = useState("")

	return (
		<>
			<Header user={ user }/>
			<main>
				<BGprivate state={ state } type={ type }/>
				{state == "" ?
				<div className="position-absolute top-0 d-flex justify-content-center align-items-center vh-100 w-100">
					<div className="rounded border border-black border-2 px-3 px-lg-5 pt-2 pt-lg-4 pb-3 pb-lg-4"
						style={{background: "rgba(0, 0, 0, 0.7)"}}>
						<Button type="button" className="btn btn-secondary rounded fw-bolder" onClick={() => setState("create")}>Invite</Button>
						<Button type="button" className="btn btn-secondary rounded fw-bolder" onClick={() => setState("join")}>Join</Button>
					</div>
				</div> : <></>}
				{state == "create" ?
				<CreateMatch setState={ setState } setType={ setType }/> : <></>}
				{state == "join" ?
				<JoinMatch setState={ setState } setType={ setType }/> : <></>}
				{state == "wait" ?
				<WaitMatch setState={ setState }/> : <></>}
				{state == "play" ?
				<PlayMatch/> : <></>}
			</main>
		</>
	)
}

export default Online

/*<Button type="button" className="btn btn-secondary rounded fw-bolder" onClick={() => setState("wait")}>Wait</Button>
						<Button type="button" className="btn btn-secondary rounded fw-bolder" onClick={() => setState("play")}>Play</Button>*/
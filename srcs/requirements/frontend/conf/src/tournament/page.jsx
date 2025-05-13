import React, { useState } from "react"
import { Button } from "react-bootstrap"
import Header from "../global/header"
import BGprivate from "../test/private/page.jsx"

function Tournament({ user }) {

	const [state, setState] = useState("")
	const [type, setType] = useState("")

	return (
		<>
			<Header user={ user }/>
			<main>
				<BGprivate state={ state } type={ type }/>
			</main>
		</>
	)
}

export default Tournament
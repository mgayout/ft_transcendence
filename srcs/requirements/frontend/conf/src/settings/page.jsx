import React from "react"
import Background from "../background/background.jsx"
import Settings from "./settings.jsx"
import Header from "../global/header.jsx"

function SettingsPage({ user }) {

	return (
		<>
			<Header user={ user }/>
			<main>
				<Background type={"private"} />
				<div className="position-absolute top-0 d-flex justify-content-center align-items-center vh-100 w-100">
					<Settings/>
				</div>
			</main>
		</>
	)
}

export default SettingsPage
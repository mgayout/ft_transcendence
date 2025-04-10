import React, { useRef, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { Image, Dropdown } from "react-bootstrap"
import axios from 'axios'
import Header from "../global/header.jsx"
import Gameplay from '../gameplay/settings/page'

function Profile() {

	const canva = useRef(null)

	const [user, setUser] = useState(null)
	const url = useLocation()

	const checkURL = async () => {

		try {
			const username = url.pathname.split('/')[2]
			const Atoken = localStorage.getItem('accessToken')
			const Rtoken = localStorage.getItem('refreshToken')
			const config = {headers: {Authorization: `Bearer ${Atoken}`}}
			const params = { token: Rtoken }
			const playerData = await axios.get('http://127.0.0.1:8000/api/player/', {headers: config.headers, param: params})
			const data = playerData.data.filter(player => player.name == username)
			if (data.length == 1)
				setUser(data[0])
		}
		catch(error) {
			console.log(error)
		}
	}

	useEffect(() => {
		checkURL()
	}, [url.pathname])

	if (!user)
		return (<></>)
	console.log(user)
	
	return (
		<>
		  <Header />
		  <main>
			<div className="position-fixed top-0 w-100">
			  <Gameplay canva={canva} />
			</div>
			<div className="d-flex flex-column justify-content-center align-items-center w-100 position-relative" style={{top: '120px'}}> 
			  <Image
				src={user.avatar}
				className={`${user.online ? `border border-success` : `border border-danger`} border-3`}
				style={{ width: '150px', height: '150px' }}
				roundedCircle
			  />
			  <div className="mt-3 text-light">
				<h2>{user.name}</h2>
				{user.description ? <h2>{user.description}</h2> : <></> /*mettre en italique*/}
			  </div>
			</div>
		  </main>
		</>
	  );

	return (
		<>
		  <Header />
		  <main>
			<div className="position-fixed top-0">
			  <Gameplay canva={canva} />
			  <div className="position-absolute top-0 d-flex justify-content-center align-items-center vh-100 w-100">
				<div className="rounded border border-black border-2 px-3 px-lg-5 pt-2 pt-lg-4 pb-3 pb-lg-4 d-flex align-items-center user-select-none" style={{ background: "rgba(0, 0, 0, 0.7)" }}>
				  <div className="d-flex flex-column align-items-center w-50">
					<Image src={user.avatar} className={`${user.online ? `border border-success` : `border border-danger`} border-3 w-50 h-auto`} roundedCircle />
					<h1 className="mt-3 text-center text-light">{user.name}</h1>
				  </div>
				  <div className="d-flex justify-content-center align-items-center w-50">
					<Dropdown className="d-flex justify-content-center pt-3 mb-3 mb-lg-5">
					  <Dropdown.Toggle className="btn btn-light rounded fw-bolder">Select an Object</Dropdown.Toggle>
					  <Dropdown.Menu>
						<Dropdown.Item onClick={() => updateObject(0)}>Player 1</Dropdown.Item>
						<Dropdown.Item onClick={() => updateObject(1)}>Player 2</Dropdown.Item>
						<Dropdown.Item onClick={() => updateObject(2)}>Ball</Dropdown.Item>
					  </Dropdown.Menu>
					</Dropdown>
				  </div>
				</div>
			  </div>
			</div>
		  </main>
		</>
	  )
}
export default Profile
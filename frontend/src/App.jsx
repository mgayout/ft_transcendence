import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Login from './login/page'
import Register from './register/page'
import Home from './home/page'
import Local from './game/local/page'
import LocalGame from './game/local/game/page'

const App = () => {

	const location = useLocation()
	const publicPath = ["/", "/register"]
	const isPublicRoute = publicPath.includes(location.pathname)

	return (
		<>
		{isPublicRoute ? (
			<Routes>
				<Route path="/" element={ <Login/> }/>
				<Route path="/register" element={ <Register/> }/>
			</Routes>) :
			<Routes>
				<Route path="/home" element={ <Home/> }/>
				<Route path="/local" element={ <Local/> }/>
				<Route path="/local/game" element={ <LocalGame/> }/>
			</Routes>}
		</>
	)
}


export default App;

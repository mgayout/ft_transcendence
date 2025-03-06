import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Login from '../login/page'
import Register from '../register/page'
import Home from '../home/page'
import Localvs from '../local/vs/page'
import LocalvsGame from '../local/vs/game/page'
//import Localai from '../local/AI/page'
//import Localtrnm from '../local/Tournament/page'

const Router = createBrowserRouter(createRoutesFromElements(
	<>
		<Route path="/" element={ <Login/> }/>
		<Route path="/register" element={ <Register/> }/>
		<Route path="/home" element={ <Home/> }/>
		<Route path="/localvs" element={ <Localvs/> }/>
		<Route path="/localvs/game" element={ <LocalvsGame/> }/>
	</>
))

export default Router;

//<Route path="/localai" element={ <Localai/> }/>
//<Route path="/localtrnm" element={ <Localtrnm/> }/>
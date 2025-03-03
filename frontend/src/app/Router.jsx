import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Login from '../login/page'
import Register from '../register/page'
import Home from '../home/page'
import Localvs from '../local/1vs1/page'
import Localai from '../local/AI/page'

const Router = createBrowserRouter(createRoutesFromElements(
	<>
		<Route path="/" element={ <Login/> }/>
		<Route path="/register" element={ <Register/> }/>
		<Route path="/home" element={ <Home/> }/>
		<Route path="/localvs" element={ <Localvs/> }/>
		<Route path="/localai" element={ <Localai/> }/>
	</>
))

export default Router;
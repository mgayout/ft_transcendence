import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

async function refreshAccessToken(Rtoken) {
    try {
        localStorage.removeItem("accessToken")
        const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', { refresh: Rtoken })
		console.log(response)
        if (response.statusText == "OK") {
            localStorage.setItem("accessToken", response.data.access)
            return true
        }
        return false
    }
	catch (error) {
        console.log(error)
        return false
    }
}

async function isTokenExpired(Atoken) {
    if (!Atoken || !Atoken.includes('.'))
		return true
    const payload = JSON.parse(atob(Atoken.split('.')[1]))
    const expiryTime = payload.exp * 1000
    const currentTime = Date.now()
    return currentTime >= expiryTime
}

async function isAuthenticated() {
    const Atoken = localStorage.getItem("accessToken")
    const Rtoken = localStorage.getItem("refreshToken")
    if (!Atoken || !Rtoken)
		return false
    if (await isTokenExpired(Atoken))
        return await refreshAccessToken(Rtoken)
    return true
}

function PrivateRoute({ element }) {
    const [authChecked, setAuthChecked] = useState(false)
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        const checkAuth = async () => {
            const authStatus = await isAuthenticated()
            setIsAuth(authStatus)
            setAuthChecked(true)
        }
        checkAuth()
    }, [])

    if (!authChecked)
        return <div>Loading...</div>
    return isAuth ? element : <Navigate to="/" />
}

function PublicRoute({ element }) {
	const [authChecked, setAuthChecked] = useState(false)
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        const checkAuth = async () => {
            const authStatus = await isAuthenticated()
            setIsAuth(authStatus)
            setAuthChecked(true)
        }
        checkAuth()
    }, [])

    if (!authChecked)
        return <div>Loading...</div>
    return isAuth ? <Navigate to={"/home"}/> : element
}

export { PrivateRoute, PublicRoute }
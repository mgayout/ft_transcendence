import React, { createContext, useContext, useState, useEffect } from 'react'
import { refreshData, getData, removeData } from './data.js'
import axiosInstance from './instance'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuth, setIsAuth] = useState(false)

  const refreshAtoken = async (Rtoken) => {
    try {
      // Utilisation de l'instance axios personnalisée pour la requête de rafraîchissement du token
      const response = await axiosInstance.post('/users/api/token/refresh/', { refresh: Rtoken })
		console.log(response)
	  if (response.data.access) {
        localStorage.setItem('Atoken', response.data.access)
        return true
      }
      return false
    }
    catch (err) {
      console.error(err)
      removeData()
      return false
    }
  }

  const isTokenExpired = async (Atoken) => {
    if (!Atoken || !Atoken.includes('.')) return true
    const payload = JSON.parse(atob(Atoken.split('.')[1]))
    const expiryTime = payload.exp * 1000
    const currentTime = Date.now()
    return currentTime >= expiryTime
  }

  const checkAuth = async () => {
    const Atoken = localStorage.getItem('Atoken')
    const Rtoken = localStorage.getItem('Rtoken')
    if (!Atoken || !Rtoken) return false
    if (await isTokenExpired(Atoken)) return await refreshAtoken(Rtoken)
    return true
  }

  const refreshUser = async () => {
    try {
      const auth = await checkAuth()
      setIsAuth(auth)
      if (auth) {
        await refreshData()
        const updatedUser = await getData()
        setUser(updatedUser)
      }
      else
        setUser(null)
    }
    catch (err) {
      console.error(err)
      setUser(null)
      setIsAuth(false)
    }
  }

  const logout = () => {
    removeData()
    setUser(null)
    setIsAuth(false)
  }

  useEffect(() => {
    const init = async () => {
      await refreshUser()
      setLoading(false)
    }
    init()
  }, [])

  useEffect(() => {
	const startTokenRefreshInterval = () => {
	  const interval = setInterval(async () => {
		const Atoken = localStorage.getItem('Atoken')
		const Rtoken = localStorage.getItem('Rtoken')

		if (!Atoken || !Rtoken) return
  
		const payload = JSON.parse(atob(Atoken.split('.')[1]))
		const expiryTime = payload.exp * 1000
		const currentTime = Date.now()
  
		if (expiryTime - currentTime < 60000) {
		  await refreshAtoken(Rtoken)
		}
	  }, 30000)
  
	  return () => clearInterval(interval)
	};
  
	const cleanup = startTokenRefreshInterval()
	return cleanup
  }, [])  

  return (
    <AuthContext.Provider value={ { user, isAuth, loading, refreshUser, logout } }>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

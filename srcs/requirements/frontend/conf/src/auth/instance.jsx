import axios from 'axios'
import { removeData } from './data.js'

const id = localStorage.getItem('id')

const axiosInstance = axios.create({
	baseURL: `https://${id}`,
	withCredentials: true,
})

const rawAxios = axios.create({
	baseURL: `https://${id}`,
	withCredentials: true,
})


let isRefreshing = false
let refreshPromise = null

export const refreshAtoken = async (Rtoken) => {
	if (!Rtoken) return false
	if (isRefreshing) return refreshPromise
	isRefreshing = true
	refreshPromise = (async () => {
		try {
			const response = await rawAxios.post('/users/api/token/refresh/', { refresh: Rtoken })
			if (response.data.access) {
				console.log("Token is refreshed")
				localStorage.setItem('Atoken', response.data.access)
				return true
			}
			return false
		}
		catch (error) {
			console.error('Error refreshing token:', error)
			return false
		}
		finally {
			isRefreshing = false
		}
	})()
	return refreshPromise
}

axiosInstance.interceptors.request.use(async (config) => {

	let Atoken = localStorage.getItem('Atoken')
	const Rtoken = localStorage.getItem('Rtoken')
	const isAuthAPI = config.url && config.url.includes("/users/api/login/")

	if (isAuthAPI)
		return config
	if (!Rtoken) {
		window.location.reload()
		return config
	}

	const isRtokenExpired = (() => {
		if (!Rtoken || !Rtoken.includes('.')) return true
		try {
			const payload = JSON.parse(atob(Rtoken.split('.')[1]))
			const expiry = payload.exp * 1000
			return Date.now() >= expiry
		}
		catch {return true}
	})()

	if (isRtokenExpired) {
		removeData()
		window.location.reload()
		return config
	}

	const isAtokenExpired = (() => {
		if (!Atoken || !Atoken.includes('.')) return true
		try {
			const payload = JSON.parse(atob(Atoken.split('.')[1]))
			const expiry = payload.exp * 1000
			return Date.now() >= expiry
		}
		catch {return true}
	})()

	if (isAtokenExpired) {
		console.log("Access token expired, attempting refresh.")
		const success = await refreshAtoken(Rtoken)
		if (!success) {
			removeData()
			return Promise.reject(new axios.Cancel("Access token refresh failed"))
		}
		Atoken = localStorage.getItem('Atoken')
	}
	if (Atoken)
		config.headers['Authorization'] = `Bearer ${Atoken}`

	return config
}, (error) => Promise.reject(error))

axiosInstance.interceptors.response.use((response) => response, async (error) => {
	const originalRequest = error.config

	if (error.response?.status === 401 && !originalRequest._retry) {
		originalRequest._retry = true
		
		const Rtoken = localStorage.getItem('Rtoken')
		const refreshed = await refreshAtoken(Rtoken)
		
		if (refreshed) {
			const newAtoken = localStorage.getItem('Atoken')
			originalRequest.headers['Authorization'] = `Bearer ${newAtoken}`
			return axiosInstance(originalRequest)
		}
		else {
			removeData()
			window.location.reload()
			return Promise.reject(error)
		}
	}
    if (error.response?.status === 403 && originalRequest._retry) {
		removeData()
		window.location.reload()
	}
	return Promise.reject(error)
}
)

export default axiosInstance
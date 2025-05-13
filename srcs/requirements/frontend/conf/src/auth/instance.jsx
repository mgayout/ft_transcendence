import axios from 'axios'
import { removeData } from './data.js'

const id = localStorage.getItem('id')

const axiosInstance = axios.create({
  baseURL: `http://${id}`,
  withCredentials: true,
})

const refreshAtoken = async (Rtoken) => {
	try {
		const response = await axiosInstance.post('/users/api/token/refresh/', { refresh: Rtoken })
		if (response.data.access) {
			console.log(response.data)
			localStorage.setItem('Atoken', response.data.access)
			return true
	  	}
		return false
	}
	catch (error) {
		console.error('Error refreshing token:', error)
		removeData()
		return false
	}
}

axiosInstance.interceptors.request.use(async (config) => {
    const Atoken = localStorage.getItem('Atoken')
    if (Atoken)
    	config.headers['Authorization'] = `Bearer ${Atoken}`
    return config
},
	(error) => {
    	return Promise.reject(error)
	}
)

axiosInstance.interceptors.response.use((response) => {
    return response
},
	async (error) => {
    	const originalRequest = error.config

		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true
			
			const Rtoken = localStorage.getItem('Rtoken')
			const isRefreshed = await refreshAtoken(Rtoken)

			if (isRefreshed) {
				const newAtoken = localStorage.getItem('Atoken')
				axios.defaults.headers['Authorization'] = `Bearer ${newAtoken}`
				return axiosInstance(originalRequest)
			}
			else {
				removeData()
				return Promise.reject(error)
			}
		}
    return Promise.reject(error)
	}
)

export default axiosInstance
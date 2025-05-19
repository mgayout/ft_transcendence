import { useAuth } from './context'

const refreshData = async () => {
	const { axios } = useAuth()
	try {
		const rawData = localStorage.getItem("data")
		if (!rawData) return
		const data = JSON.parse(rawData)
		if (!data?.id) return
		const params = { token: localStorage.getItem("Rtoken") }
		const response = await axios.get(`/users/api/player/${data.id}`, { params: params })
		if (response.data)
			localStorage.setItem("data", JSON.stringify(response.data))
	}
	catch(error) {
		console.log(error)
	}
}

const getData = () => {
	try {
		const rawData = localStorage.getItem("data")
		return rawData ? JSON.parse(rawData) : null
	}
	catch(error) {
		console.log(error)
		return null
	}
}

const removeData = () => {
	localStorage.removeItem("data")
	localStorage.removeItem("Atoken")
	localStorage.removeItem("Rtoken")
}

export { refreshData, getData, removeData }
import axiosInstance from './instance'

const refreshData = async () => {
	try {
		const rawData = localStorage.getItem("data")
		const data = JSON.parse(rawData)
		const config = {headers: {Authorization: `Bearer ${localStorage.getItem("Atoken")}`}}
		const params = { token: localStorage.getItem("Rtoken") }
		const response = await axiosInstance.get(`/users/api/player/${data.id}`, {headers: config.headers, param: params})
		if (response.data)
			localStorage.setItem("data", JSON.stringify(response.data))
	}
	catch(error) {
		console.log(error)
	}
}

const getData = () => {
	const rawData = localStorage.getItem("data")
	const data = JSON.parse(rawData)
	return (data)
}

const removeData = async () => {
	localStorage.removeItem("data")
	localStorage.removeItem("Atoken")
	localStorage.removeItem("Rtoken")
}

export { refreshData, getData, removeData }
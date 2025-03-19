import axios from 'axios';

export const getUser = async () => {
	try {
		const token = localStorage.getItem('jwt')
		
		const response = await axios.get('http://127.0.0.1:8000/api/player/id/')

		console.log(response)

		return response.data
	}
	catch (error) {
		console.error(`Error fetching user data:`, error)
		throw error
	}
}

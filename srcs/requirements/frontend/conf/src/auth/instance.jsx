import axios from 'axios'
import { removeData } from './data.js'

// Créer une instance Axios personnalisée
const axiosInstance = axios.create({
  baseURL: 'http://transcendence.fr',
  withCredentials: true,
})

const refreshAtoken = async (Rtoken) => {
	try {
	  const response = await axiosInstance.post('/users/api/token/refresh/', { refresh: Rtoken })
	  console.log(response)
	  if (response.data.access) {
		localStorage.setItem('Atoken', response.data.access);
		return true;
	  }
	  return false;
	} catch (err) {
	  console.error('Error refreshing token:', err);
	  removeData();
	  return false;
	}
};

// Ajouter un intercepteur de requêtes pour ajouter le token d'accès à chaque requête
axiosInstance.interceptors.request.use(
  async (config) => {
    const Atoken = localStorage.getItem('Atoken');
    if (Atoken) {
      // Ajouter l'Atoken dans les en-têtes
      config.headers['Authorization'] = `Bearer ${Atoken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Ajouter un intercepteur de réponses pour gérer les tokens expirés
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Si l'erreur est une erreur 401 (non autorisé, token expiré)
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Rafraîchir le token
      const Rtoken = localStorage.getItem('Rtoken');
      const isRefreshed = await refreshAtoken(Rtoken);
      
      if (isRefreshed) {
        // Si le token est rafraîchi avec succès, réessayer la requête
        const newAtoken = localStorage.getItem('Atoken');
        axios.defaults.headers['Authorization'] = `Bearer ${newAtoken}`;
        return axiosInstance(originalRequest); // Réessayer la requête originale
      } else {
        // Si le rafraîchissement échoue, se déconnecter
        removeData();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
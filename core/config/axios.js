import axios from 'axios';
import { localStorage } from '../helper';

const getAxiosInstance = () => {
	const defaultOptions = {
		baseURL: process.env.NEXT_PUBLIC_API_URL,
		//   headers: {
		//     'Content-Type': 'application/json',
		//   },
	};

	// Create instance
	let instance = axios.create(defaultOptions);

	// Set the AUTH token for any request
	instance.interceptors.request.use(function (config) { 
		const token = localStorage.getAuthToken();
		config.headers.Authorization = token ? `Bearer ${token}` : '';
		return config;
	});

	return instance
};

export default getAxiosInstance();

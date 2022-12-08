import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
	headers: {
		'content-type': 'application/json',
	},
	baseURL: 'http://localhost:8000',
	// paramsSerializer: (params: any) => queryString.stringify(params),
});

axiosClient.defaults.timeout = 10000;

axiosClient.interceptors.request.use(async (config) => {
	return config;
});

axiosClient.interceptors.response.use(
	(response) => {
		if (response && response.data) {
			return response.data;
		}

		return response;
	},
	(error) => {
		if (error.response && error.response.data) {
			throw error.response.data;
		}

		if (!axios.isCancel(error)) throw error;
	}
);

export default axiosClient;

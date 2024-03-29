import axiosClient from '.';

const routeName = '/auth';

const authService = {
	login: (
		data: {
			acc: string;
			password: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`${routeName}/login`, data, {
			cancelToken: tokenAxios,
		});
	},
	register: (
		data: {
			username: string;
			password: string;
			name: string;
			email: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`${routeName}/register`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default authService;

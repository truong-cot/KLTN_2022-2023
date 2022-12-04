import axiosClient from '.';

const routeName = '/auth';

const authService = {
	login: (
		data: {
			acc: String;
			password: String;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`${routeName}/login-admin`, data, {
			cancelToken: tokenAxios,
			headers: {},
		});
	},
};

export default authService;

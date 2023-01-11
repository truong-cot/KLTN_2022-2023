import axiosClient from '.';

const routeName = '/user';

const userService = {
	getCurrentUser: (data: {token: string; idUser: string}, tokenAxios?: any) => {
		return axiosClient.get(`${routeName}/current-user/${data.idUser}`, {
			cancelToken: tokenAxios,
			headers: {
				token: 'Bearer ' + data.token,
			},
		});
	},
	changeUser: (
		data: {
			token: String;
			idUser: String;
			name: String;
			phone: Number;
			email: String;
			dateBirth: Number;
			monthBirth: Number;
			yearBirth: Number;
			sex: Number;
		},
		tokenAxios?: any
	) => {
		return axiosClient.put(`${routeName}/update-user?idUser=${data.idUser}`, data, {
			cancelToken: tokenAxios,
			headers: {
				token: 'Bearer ' + data.token,
			},
		});
	},
	getAllUser: (
		data: {token: string; keyword: string; limit: Number; page: number; type: Number},
		tokenAxios?: any
	) => {
		return axiosClient.get(
			`${routeName}/all-user?keyword=${data.keyword}&limit=${data.limit}&page=${data.page}&type=${data.type}`,
			{
				cancelToken: tokenAxios,
				headers: {
					token: 'Bearer ' + data.token,
				},
			}
		);
	},
	deleteUser: (data: {token: string; idUser: String}, tokenAxios?: any) => {
		return axiosClient.delete(`${routeName}/delete-user?idUser=${data.idUser}`, {
			cancelToken: tokenAxios,
			headers: {
				token: 'Bearer ' + data.token,
			},
		});
	},

	changeRoleUser: (
		data: {
			token: String;
			idUser: String;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`${routeName}/change-role?idUser=${data.idUser}`, data, {
			cancelToken: tokenAxios,
			headers: {
				token: 'Bearer ' + data.token,
			},
		});
	},
	changeAvatarUser: (data: any, tokenAxios?: any) => {
		return axiosClient.post(`${routeName}/change-avatar`, data.formdata, {
			cancelToken: tokenAxios,
			headers: {
				token: 'Bearer ' + data.token,
			},
		});
	},
};

export default userService;

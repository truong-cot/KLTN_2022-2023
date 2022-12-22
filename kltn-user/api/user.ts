import axiosClient from '.';

const routeName = '/user';

const userService = {
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

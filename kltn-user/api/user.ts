import axiosClient from '.';

const routeName = '/user';

const userService = {
	changeUser: (
		data: {
			token: string;
			idUser: string;
			name: string;
			phone: number;
			email: string;
			dateBirth: number;
			monthBirth: number;
			yearBirth: number;
			sex: number;
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
	addAddress: (
		data: {
			token: string;
			idUser: string;
			name: string;
			phone: number;
			city: string;
			district: string;
			ward: string;
			specifically: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`${routeName}/add-address`, data, {
			cancelToken: tokenAxios,
			headers: {
				token: 'Bearer ' + data.token,
			},
		});
	},

	changeDefaultAddress: (
		data: {
			token: string;
			idUser: string;
			idAddress: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`${routeName}/default-address`, data, {
			cancelToken: tokenAxios,
			headers: {
				token: 'Bearer ' + data.token,
			},
		});
	},

	deleteAddress: (
		data: {
			token: string;
			idUser: string;
			idAddress: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.delete(
			`${routeName}/delete-address/${data.idUser}?idAddress=${data.idAddress}`,
			{
				cancelToken: tokenAxios,
				headers: {
					token: 'Bearer ' + data.token,
				},
			}
		);
	},
};

export default userService;

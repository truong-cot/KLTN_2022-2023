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
	// changeRoleUser: (data: {}, tokenAxios?: any) => {
	// 	return axiosClient.post(`${routeName}/change-role?idUser=638dfa0f46dbd752f3e7b32c`, {
	// 		cancelToken: tokenAxios,
	// 		headers: {
	// 			token:
	// 				'Bearer ' +
	// 				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzhkZmEwZjQ2ZGJkNzUyZjNlN2IzMmMiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjcwMjQ5MjEzLCJleHAiOjE2NzAyNTY0MTN9.J9KnNCpQ47_4HcIJ6v_N6OMn9tE45f5IYlgUF6RW6EI',
	// 		},
	// 	});
	// },
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
};

export default userService;

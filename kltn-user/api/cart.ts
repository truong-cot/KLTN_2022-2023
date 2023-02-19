import axiosClient from '.';

const routeName = '/cart';

const cartService = {
	addToCart: (
		data: {
			token: string;
			idUser: string;
			idProduct: string;
			price: number;
			sale: number;
			amount: number;
			size: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`${routeName}/add-to-cart`, data, {
			cancelToken: tokenAxios,
			headers: {
				token: 'Bearer ' + data.token,
			},
		});
	},
	getCart: (
		data: {
			token: string;
			idUser: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(`${routeName}/get-cart?idUser=${data.idUser}`, {
			cancelToken: tokenAxios,
			headers: {
				token: 'Bearer ' + data.token,
			},
		});
	},

	deleteCart: (data: {token: string; idCart: string}, tokenAxios?: any) => {
		return axiosClient.delete(`${routeName}/delete-cart?idCart=${data.idCart}`, {
			cancelToken: tokenAxios,
			headers: {
				token: 'Bearer ' + data.token,
			},
		});
	},
};

export default cartService;

import axiosClient from '.';

const routeName = '/cart';

const cartService = {
	addToCart: (
		data: {
			token: String;
			idUser: String;
			idProduct: String;
			price: Number;
			sale: Number;
			amount: Number;
			size: String;
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
			token: String;
			idUser: String;
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

	deleteCart: (data: {token: string; idCart: String}, tokenAxios?: any) => {
		return axiosClient.delete(`${routeName}/delete-cart?idCart=${data.idCart}`, {
			cancelToken: tokenAxios,
			headers: {
				token: 'Bearer ' + data.token,
			},
		});
	},
};

export default cartService;

import axiosClient from '.';

const routeName = '/order';

const orderService = {
	createOrder: (
		data: {
			token: String;
			idUser: String;
			nameUser: String;
			nameReceiver: String;
			phone: Number;
			address: String;
			shippingMethod: Number;
			note: String;
			products: any;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`${routeName}/create-order`, data, {
			cancelToken: tokenAxios,
		});
	},

	getOrderUser: (
		data: {
			token: String;
			idUser: String;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(`${routeName}/get-order-user?idUser=${data.idUser}`, {
			cancelToken: tokenAxios,
			headers: {
				token: 'Bearer ' + data.token,
			},
		});
	},
};

export default orderService;

import axiosClient from '.';

const routeName = '/order';

const orderService = {
	createOrder: (
		data: {
			token: string;
			idUser: string;
			nameUser: string;
			nameReceiver: string;
			phone: number;
			address: string;
			shippingMethod: number;
			note: string;
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
			token: string;
			idUser: string;
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

	cancelOrder: (
		data: {
			token: string;
			idOrder: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`${routeName}/cancel-order`, data, {
			cancelToken: tokenAxios,
			headers: {
				token: 'Bearer ' + data.token,
			},
		});
	},

	confirmationDelivery: (
		data: {
			token: string;
			idOrder: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`${routeName}/confirmation-delivery`, data, {
			cancelToken: tokenAxios,
			headers: {
				token: 'Bearer ' + data.token,
			},
		});
	},
};

export default orderService;

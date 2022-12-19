import axiosClient from '.';

const routeName = '/order';

const orderService = {
	getAllOrder: (
		data: {
			token: String;
			keyword: String;
			statusOrder: Number;
			limit: Number;
			page: Number;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(
			`${routeName}/get-all-order?keyword=${data.keyword}&statusOrder=${data.statusOrder}&limit=${data.limit}&page=${data.page}`,
			{
				cancelToken: tokenAxios,
				headers: {
					token: 'Bearer ' + data.token,
				},
			}
		);
	},

	getDetailOrder: (
		data: {
			token: String;
			idOrder: String;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(`${routeName}/get-detail-order?idOrder=${data.idOrder}`, {
			cancelToken: tokenAxios,
			headers: {
				token: 'Bearer ' + data.token,
			},
		});
	},

	confirmationOrder: (
		data: {
			token: String;
			idOrder: String;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`${routeName}/confirmation-order`, data, {
			cancelToken: tokenAxios,
			headers: {
				token: 'Bearer ' + data.token,
			},
		});
	},
	confirmationDelivery: (
		data: {
			token: String;
			idOrder: String;
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

	cancelOrder: (
		data: {
			token: String;
			idOrder: String;
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
};

export default orderService;

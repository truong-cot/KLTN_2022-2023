import axiosClient from '.';

const routeName = '/order';

const orderService = {
	getAllOrder: (
		data: {
			token: string;
			keyword: string;
			statusOrder: number;
			limit: number;
			page: number;
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
			token: string;
			idOrder: string;
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
			token: string;
			idOrder: string;
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
};

export default orderService;

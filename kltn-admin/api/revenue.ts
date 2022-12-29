import axiosClient from '.';

const routeName = '/revenue';

const revenueService = {
	getAllRevenue: (
		data: {
			token: String;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(`${routeName}/get-order-revenue`, {
			cancelToken: tokenAxios,
			headers: {
				token: 'Bearer ' + data.token,
			},
		});
	},
	getProductOutStock: (
		data: {
			token: String;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(`${routeName}/get-product-out-stock`, {
			cancelToken: tokenAxios,
			headers: {
				token: 'Bearer ' + data.token,
			},
		});
	},

	getProductInStock: (
		data: {
			token: String;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(`${routeName}/get-product-in-stock`, {
			cancelToken: tokenAxios,
			headers: {
				token: 'Bearer ' + data.token,
			},
		});
	},

	getTotalRevenue: (
		data: {
			token: String;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(`${routeName}/get-total-revenue`, {
			cancelToken: tokenAxios,
			headers: {
				token: 'Bearer ' + data.token,
			},
		});
	},
	getRevenueMonthToYear: (
		data: {
			token: String;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(`${routeName}/get-revenue-month-to-year`, {
			cancelToken: tokenAxios,
			headers: {
				token: 'Bearer ' + data.token,
			},
		});
	},
};

export default revenueService;

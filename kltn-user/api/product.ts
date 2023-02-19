import axiosClient from '.';

const routeName = '/product';

const productService = {
	getAllProduct: (
		data: {
			token: string;
			keyword: string;
			category: number;
			status: number;
			priceMin: number;
			priceMax: number;
			limit: number;
			page: number;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(
			`${routeName}/get-all-product?keyword=${data.keyword}&category=${data.category}&status=${data.status}&priceMin=${data.priceMin}&priceMax=${data.priceMax}&limit=${data.limit}&page=${data.page}`,
			{
				cancelToken: tokenAxios,
				headers: {
					token: 'Bearer ' + data.token,
				},
			}
		);
	},
	getDetailProduct: (
		data: {
			token: string;
			idProduct: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.get(`${routeName}/get-detail-product/${data.idProduct}`, {
			cancelToken: tokenAxios,
			headers: {
				token: 'Bearer ' + data.token,
			},
		});
	},

	createReview: (
		data: {
			token: string;
			idUser: string;
			idProduct: string;
			numberStart: number;
			content: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`${routeName}/create-review`, data, {
			cancelToken: tokenAxios,
			headers: {
				token: 'Bearer ' + data.token,
			},
		});
	},
};

export default productService;

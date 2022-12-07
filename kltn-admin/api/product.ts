import axiosClient from '.';

const routeName = '/product';

const productService = {
	getAllProduct: (
		data: {
			token: String;
			keyword: String;
			category: Number;
			status: Number;
			priceMin: Number;
			priceMax: Number;
			limit: Number;
			page: Number;
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
	deleteProduct: (data: {token: string; idProduct: String}, tokenAxios?: any) => {
		return axiosClient.delete(`${routeName}/delete-product?idProduct=${data.idProduct}`, {
			cancelToken: tokenAxios,
			headers: {
				token: 'Bearer ' + data.token,
			},
		});
	},
	createProduct: (
		data: {
			token: String;
			name: String;
			price: String;
			amount_size_S: Number;
			amount_size_M: Number;
			amount_size_L: Number;
			amount_size_XL: Number;
			sale: Number;
			category: String;
			main_des: String;
			general_des: String;
			detail_des: any;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`${routeName}/create`, data, {
			cancelToken: tokenAxios,
			headers: {
				token: 'Bearer ' + data.token,
			},
		});
	},
};

export default productService;

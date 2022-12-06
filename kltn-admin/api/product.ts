import axiosClient from '.';

const routeName = '/product';

const productService = {
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

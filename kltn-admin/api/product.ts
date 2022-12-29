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
			isHot: String;
			trending: String;
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
	getDetailProduct: (
		data: {
			token: String;
			idProduct: String;
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
	deleteImageProduct: (
		data: {token: string; idProduct: String; idImage: String},
		tokenAxios?: any
	) => {
		return axiosClient.delete(
			`${routeName}/delete-image/${data.idProduct}?idImage=${data.idImage}`,
			{
				cancelToken: tokenAxios,
				headers: {
					token: 'Bearer ' + data.token,
				},
			}
		);
	},
	addImageProduct: (data: any, tokenAxios?: any) => {
		return axiosClient.post(`${routeName}/add-images`, data.formdata, {
			cancelToken: tokenAxios,
			headers: {
				token: 'Bearer ' + data.token,
			},
		});
	},
	updateProduct: (
		data: {
			token: String;
			idProduct: String;
			name: String;
			price: String;
			amount_size_S: Number;
			amount_size_M: Number;
			amount_size_L: Number;
			amount_size_XL: Number;
			sale: Number;
			isHot: String;
			trending: String;
			category: String;
			main_des: String;
			general_des: String;
			detail_des: any;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`${routeName}/update-product?idProduct=${data.idProduct}`, data, {
			cancelToken: tokenAxios,
			headers: {
				token: 'Bearer ' + data.token,
			},
		});
	},

	addAmountProduct: (
		data: {
			token: String;
			idProduct: String;
			amount_size_S: Number;
			amount_size_M: Number;
			amount_size_L: Number;
			amount_size_XL: Number;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`${routeName}/add-amount`, data, {
			cancelToken: tokenAxios,
			headers: {
				token: 'Bearer ' + data.token,
			},
		});
	},
};

export default productService;

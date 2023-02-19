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

	deleteProduct: (data: {token: string; idProduct: string}, tokenAxios?: any) => {
		return axiosClient.delete(`${routeName}/delete-product?idProduct=${data.idProduct}`, {
			cancelToken: tokenAxios,
			headers: {
				token: 'Bearer ' + data.token,
			},
		});
	},
	createProduct: (
		data: {
			token: string;
			name: string;
			price: string;
			amount_size_S: number;
			amount_size_M: number;
			amount_size_L: number;
			amount_size_XL: number;
			sale: number;
			isHot: string;
			trending: string;
			category: string;
			main_des: string;
			general_des: string;
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
	deleteImageProduct: (
		data: {token: string; idProduct: string; idImage: string},
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
			token: string;
			idProduct: string;
			name: string;
			price: string;
			amount_size_S: number;
			amount_size_M: number;
			amount_size_L: number;
			amount_size_XL: number;
			sale: number;
			isHot: string;
			trending: string;
			category: string;
			main_des: string;
			general_des: string;
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
			token: string;
			idProduct: string;
			amount_size_S: number;
			amount_size_M: number;
			amount_size_L: number;
			amount_size_XL: number;
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

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
};

export default productService;

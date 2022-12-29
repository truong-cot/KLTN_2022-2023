export interface TypeData {
	allUser: Number;
	allAdmin: Number;
	allUserMonth: Number;
	allProduct: Number;
	saleProduct: Number;
	hotProduct: Number;
	trendingProduct: Number;
	orderPending: Number;
	orderConfirm: Number;
	orderComplete: Number;
	orderCancelled: Number;
}

export interface TypeProduct {
	_id: String;
	name: String;
	price: Number;
	category: Number;
	sale: Number;
	amount_size_S: Number;
	amount_size_M: Number;
	amount_size_L: Number;
	amount_size_XL: Number;
}

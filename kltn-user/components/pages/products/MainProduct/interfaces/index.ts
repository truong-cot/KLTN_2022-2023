export interface TypeProduct {
	amount_size_L: Number;
	amount_size_S: Number;
	amount_size_XL: Number;
	category: Number;
	createdAt: String | null;
	detail_des: String;
	general_des: String;
	images: Array<TypeImage>;
	isHot: Boolean;
	main_des: String;
	name: String;
	price: Number;
	reviews: Array<any>;
	sale: Boolean;
	star: Number;
	trending: Boolean;
	updatedAt: String | null;
	_id: String;
}

export interface TypeImage {
	id: String;
	url: String;
}

export interface TypeCart {
	idProduct: String;
	nameProduct: String;
	image: String;
	size: String;
	amount: Number;
	price: Number;
}

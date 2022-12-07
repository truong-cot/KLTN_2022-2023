export interface TypeImage {
	id: String;
	url: String;
}

export interface TypeProduct {
	trending: boolean;
	_id: String;
	name: String;
	price: Number;
	category: Number;
	sale: Number;
	images: Array<TypeImage>;
	amount_size_s: Number;
	amount_size_M: Number;
	amount_size_L: Number;
	amount_size_XL: Number;
	main_des: String;
	general_des: String;
	detail_des: String;
	isHot: boolean;
	star: Number;
	reviews: Array<any>;
	createdAt: String | null;
	updatedAt: String | null;
}

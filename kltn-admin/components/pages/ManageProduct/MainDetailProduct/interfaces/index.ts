export interface TypeImage {
	id: string;
	url: string;
}

export interface TypeProduct {
	trending: boolean;
	_id: string;
	name: string;
	price: number;
	category: number;
	sale: number;
	images: Array<TypeImage>;
	amount_size_S: number;
	amount_size_M: number;
	amount_size_L: number;
	amount_size_XL: number;
	main_des: string;
	general_des: string;
	detail_des: string;
	isHot: boolean;
	star: number;
	reviews: Array<any>;
	createdAt: string | null;
	updatedAt: string | null;
}

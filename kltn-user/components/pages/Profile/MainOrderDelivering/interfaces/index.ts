export interface TypeOrder {
	address: string;
	createdAt: string | null;
	idUser: string;
	nameReceiver: string;
	nameUser: string;
	note: string;
	phone: number;
	products: Array<TypeProductOrder>;
	shippingMethod: number;
	statusOrder: number;
	totalPrice: number;
	transportFee: number;
	updatedAt: string | null;
	_id: string;
}

export interface TypeProductOrder {
	amount: number;
	idProduct: string;
	image: string;
	nameProduct: string;
	orderPrice: number;
	price: number;
	sale: number;
	size: string;
}

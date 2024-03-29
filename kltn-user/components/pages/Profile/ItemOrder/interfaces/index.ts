export interface TypeOrder {
	address: String;
	createdAt: String | null;
	idUser: String;
	nameReceiver: String;
	nameUser: String;
	note: String;
	phone: Number;
	products: Array<TypeProductOrder>;
	shippingMethod: Number;
	statusOrder: Number;
	totalPrice: Number;
	transportFee: Number;
	updatedAt: String | null;
	_id: String;
}

export interface TypeProductOrder {
	data: {
		amount: Number;
		idProduct: String;
		image: String;
		nameProduct: String;
		price: Number;
		orderPrice: Number;
		sale: Number;
		size: String;
	};
	check?: boolean;
}

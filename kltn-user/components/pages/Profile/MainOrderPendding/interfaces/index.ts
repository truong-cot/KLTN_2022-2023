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
	amount: Number;
	idProduct: String;
	image: String;
	nameProduct: String;
	orderPrice: Number;
	price: Number;
	sale: Number;
	size: String;
}

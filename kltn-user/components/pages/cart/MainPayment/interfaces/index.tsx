export interface TypeCart {
	_id: String;
	idUser: String;
	nameUser: String;
	idProduct: String;
	nameProduct: String;
	size: String;
	price: Number;
	amount: Number;
	sale: Number;
	totalPrice: Number;
	image: String;
	createdAt: String | null;
	updatedAt: String | null;
}

export interface TypeFrom {
	name: string;
	phone: string;
	city: string;
	district: string;
	ward: string;
	specific: string;
	note: string;
}

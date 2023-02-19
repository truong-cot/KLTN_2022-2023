export interface TypeCart {
	_id: string;
	idUser: string;
	nameUser: string;
	idProduct: string;
	nameProduct: string;
	size: string;
	price: number;
	amount: number;
	sale: number;
	totalPrice: number;
	image: string;
	createdAt: string | null;
	updatedAt: string | null;
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

export interface TypeItemAddress {
	id: string;
	name: string;
	phone: number;
	city: string;
	district: string;
	ward: string;
	specifically: string;
	isDefault: boolean;
}

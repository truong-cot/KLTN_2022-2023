export interface TypeItemCart {
	data: {
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
	};
	onClose: () => void;
}

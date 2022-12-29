export interface TypeUser {
	_id: String;
	name: String;
	username: String;
	email: String;
	isAdmin: boolean;
	phone: Number;
	dateBirth: Number;
	monthBirth: Number;
	yearBirth: Number;
	avatar: String;
	address: Array<TypeAddress>;
	sex: Number;
	createdAt: String;
	updatedAt: String;
}

export interface TypeAddress {
	id: String;
	name: String;
	phone: Number;
	city: String;
	district: String;
	ward: String;
	specifically: String;
	isDefault: boolean;
}

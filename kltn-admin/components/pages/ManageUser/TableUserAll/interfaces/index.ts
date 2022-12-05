export interface User {
	_id: String;
	name: String;
	username: String;
	email: String;
	isAdmin: boolean;
	phone: String;
	datebBirth: number;
	monthBirth: number;
	yearBirth: number;
	avatar: String;
	address: String;
	sex: number;
	createdAt: String | null;
	updatedAt: String | null;
}

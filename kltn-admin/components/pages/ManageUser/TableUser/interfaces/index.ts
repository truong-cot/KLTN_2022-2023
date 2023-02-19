export interface User {
	_id: string;
	name: string;
	username: string;
	email: string;
	isAdmin: boolean;
	phone: string;
	datebBirth: number;
	monthBirth: number;
	yearBirth: number;
	avatar: string;
	address: string;
	sex: number;
	createdAt: string | null;
	updatedAt: string | null;
}

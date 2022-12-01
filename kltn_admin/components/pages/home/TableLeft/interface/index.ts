export interface TypeFormData {
	language: string;
	token: string;
}

export interface Data {
	id: number;
	userName: string;
	warning: 0 | 1 | 2 | 3;
	amount: number;
	timeCreated: string | null;
}

export interface PropsSearch {
	placeholder: string;
	Filter?: any;
	formData: any;
	nameSave?: string;
	select?: Array<any>;
	onSetFormData: (any: any) => void;
	keyword: string;
	onSetKeyword: (keyword: string) => void;
}

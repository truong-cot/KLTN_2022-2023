export interface PropsFilter {
	onClose: () => void;
	attrs: any;
	formData: any;
	nameSave?: string;
	onSetFormData: (data: any) => void;
	select?: Array<{title: string; key: string; options: Array<{id: number; name: string}>}>;
}

export interface TypeFormFilter {
	from: string | null;
	to: string | null;
}

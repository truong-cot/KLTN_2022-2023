export interface Columns {
	title: string;
	template: any;
	isCheckBox?: boolean;
	disableHref?: boolean;
}

export interface PropsDataTable {
	data: Array<any>;
	columns: Array<Columns>;
	onSetData?: (data: any) => void;
	href?: (data: any) => string;
	className?: string;
	Tab?: ({data}: any) => any;
}

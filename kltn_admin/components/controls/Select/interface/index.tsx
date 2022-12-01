export interface PropsSelect {
	placeholder: string;
	options?: Array<{id: number; name: string}>;
	value: {id: number; name: string};
	onSetValue(any: any): void;
}

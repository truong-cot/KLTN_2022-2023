export const setQuery = (data: any, name: string, defaultValue?: any) => {
	return data ? `&${name}=${defaultValue ? defaultValue : data}` : '';
};

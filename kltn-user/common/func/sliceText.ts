const sliceText = (text: string, n: number): string => {
	return `${text.slice(0, n)}${text.length > n ? '...' : ''}`;
};

export default sliceText;

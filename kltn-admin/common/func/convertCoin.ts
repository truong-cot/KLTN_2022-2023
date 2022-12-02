export const convertCoin = (coin: number | null) => {
	return coin ? coin.toLocaleString('en-GB', {maximumFractionDigits: 4}) : 0;
};

export const convertCoinUSD = (coin: number | null) => {
	return coin
		? coin > 0
			? `+$${coin.toLocaleString('en-GB', {maximumFractionDigits: 4})}`
			: `-$${Math.abs(coin).toLocaleString('en-GB', {
					maximumFractionDigits: 4,
			  })}`
		: 0;
};

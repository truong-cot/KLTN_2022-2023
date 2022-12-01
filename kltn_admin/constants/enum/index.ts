export enum edClientVersion {
	VERSION_0_0_1,
}
export enum edWallet {
	MAIN_WALLET,
}
export enum edMethodWallet {
	USDT = 1,
	BANK,
	MOMO,
}
export enum edPaymentMethod {
	BANK,
	MOMO,
	VIETTEL_PAY,
	TEL_CARD,
	USDT,
}
export enum edPaymentProvider {
	TCM,
}
export enum edPlatform {
	UNDEFINED,
	CLIENT,
	BROWSER,
}
export enum edOperation {
	UNDEFINED,
	IOS,
	ANDROID,
	PC_LAPTOP,
}
export enum edPosition {
	USER,
	ADMIN,
}
export enum edRequestWithdrawState {
	PENDING,
	DENIED,
	WAIT_PROCESS,
	SUCCESS,
	FAILED,
}
export enum edSessionState {
	ACTIVE,
}
export enum edTransactionAction {}

// -- edTransaction is not necessary
export enum eLiveCasino {
	CMD = 16,
	WBET,
	WM,
	AESEXY,
	BBIN,
	ALLBET,
	EVOLUTION,
	AG,
}

export enum eGameTYpe {
	SPORT,
	LIVE,
}

export enum edWallet {
	MAINWALLET = 0,
	CMD = 16,
	WBET,
	WM,
	AESEXY,
	BBIN,
	ALLBET,
	EVOLUTION,
	AG,
}

export enum edTransferType {
	SENT,
	RECEIVED,
}

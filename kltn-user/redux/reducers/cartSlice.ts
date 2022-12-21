import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface TypeCart {
	carts: Array<any>;
}

const initialState: TypeCart = {
	carts: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		updateCart: (state: any, action: PayloadAction<{data: any}>) => {
			state.carts = action.payload;
		},
		deleteCart: (state: any) => {
			state.carts = [];
		},
	},
});

// Action creators are generated for each case reducer function
export const {updateCart, deleteCart} = cartSlice.actions;
export default cartSlice.reducer;

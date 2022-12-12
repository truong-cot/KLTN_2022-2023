import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: any = {};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addtoCart: (state, action: PayloadAction<{data: any}>) => {
			state.userData = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const {addtoCart} = cartSlice.actions;
export default cartSlice.reducer;

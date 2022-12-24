import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface InterfaceState {
	isLoading: boolean;
	showTabBar: boolean;
	// routerPrev: string;
}

const initialState: InterfaceState = {
	isLoading: true,
	showTabBar: true,
	// routerPrev: '',
};

export const interfaceSlice = createSlice({
	name: 'interface',
	initialState,
	reducers: {
		// updateRouterPrev: (state, action: PayloadAction<string>) => {
		// 	state.routerPrev = action?.payload;
		// },
		loadingComplete: (state) => {
			state.isLoading = false;
		},
		toogleTabBar: (state) => {
			state.showTabBar = !state.showTabBar;
		},
	},
});

// Action creators are generated for each case reducer function
export const {loadingComplete, toogleTabBar} = interfaceSlice.actions;
export default interfaceSlice.reducer;

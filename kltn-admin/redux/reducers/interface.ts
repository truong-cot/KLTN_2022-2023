import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface InterfaceState {
	isLoading: boolean;
	showTabBar: boolean;
}

const initialState: InterfaceState = {
	isLoading: true,
	showTabBar: true,
};

export const interfaceSlice = createSlice({
	name: 'interface',
	initialState,
	reducers: {
		loadingComplete: (state: any) => {
			state.isLoading = false;
		},
		toogleTabBar: (state: any) => {
			state.showTabBar = !state.showTabBar;
		},
	},
});

// Action creators are generated for each case reducer function
export const {loadingComplete, toogleTabBar} = interfaceSlice.actions;
export default interfaceSlice.reducer;

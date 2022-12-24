import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface SiteState {
	routerPrev: string;
	activeTour: boolean;
}

const initialState: SiteState = {
	routerPrev: '/',
	activeTour: false,
};

export const siteSlice = createSlice({
	name: 'site',
	initialState,
	reducers: {
		updateRouterPrev: (state, action: PayloadAction<string>) => {
			state.routerPrev = action?.payload;
		},
		updateActiveTour: (state, action: PayloadAction<boolean>) => {
			state.activeTour = action?.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const {updateRouterPrev, updateActiveTour} = siteSlice.actions;
export default siteSlice.reducer;

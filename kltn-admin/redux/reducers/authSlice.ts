import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface AuthState {
	token: string | null;
	isLogged: boolean;
}

const initialState: AuthState = {
	token: null,
	isLogged: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<{token: string}>) => {
			state.token = action.payload.token;
			state.isLogged = true;
		},
		logout: (state) => {
			state.token = null;
			state.isLogged = false;
		},
	},
});

// Action creators are generated for each case reducer function
export const {login, logout} = authSlice.actions;
export default authSlice.reducer;

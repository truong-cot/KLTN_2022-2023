import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {deleteItemStorage, setItemStorage} from '~/common/func/localStorage';

export interface AuthState {
	token: string | null;
	isLogged: boolean;
	isRemember: boolean;
	dataSavePass: {userStr: string; passStr: string};
}

const initialState: AuthState = {
	token: null,
	isLogged: false,
	isRemember: false,
	dataSavePass: {userStr: '', passStr: ''},
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			state.token = null;
			state.isLogged = false;
		},
		login: (state, action: PayloadAction<{token: string}>) => {
			state.token = action.payload.token;
			state.isLogged = true;
		},
		toggleRememberPass: (state, action: PayloadAction<boolean>) => {
			if (action.payload) {
				state.isRemember = true;
			} else {
				deleteItemStorage('userStr');
				deleteItemStorage('passStr');
				state.isRemember = false;
			}
		},
		savePass: (state, action: PayloadAction<{userStr: string; passStr: string}>) => {
			if (state.isRemember) {
				const {userStr, passStr} = action.payload;
				setItemStorage('userStr', userStr);
				setItemStorage('passStr', passStr);
				state.dataSavePass.userStr = userStr;
				state.dataSavePass.passStr = passStr;
			}
		},
	},
});

// Action creators are generated for each case reducer function
export const {login, logout, toggleRememberPass, savePass} = authSlice.actions;
export default authSlice.reducer;

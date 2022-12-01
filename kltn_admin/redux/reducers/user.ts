import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface UserState {
	userData: any;
}

const initialState: UserState = {
	userData: null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		updateDataUser: (state, action: PayloadAction<{data: any}>) => {
			state.userData = action.payload.data;
		},
	},
});

// Action creators are generated for each case reducer function
export const {updateDataUser} = userSlice.actions;
export default userSlice.reducer;

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface UserState {
	userData: any;
}

const initialState: UserState = {
	userData: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		updateDataUser: (state, action: PayloadAction<{data: any}>) => {
			state.userData = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const {updateDataUser} = userSlice.actions;
export default userSlice.reducer;

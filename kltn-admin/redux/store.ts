import {configureStore} from '@reduxjs/toolkit';
import interfaceReducer from './reducers/interface';
import authReducer from './reducers/authSlice';
import userReducer from './reducers/userSlice';

export const store = configureStore({
	reducer: {
		interface: interfaceReducer,
		auth: authReducer,
		user: userReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

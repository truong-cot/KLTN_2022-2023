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

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

import {persistReducer, persistStore} from 'redux-persist';
import {combineReducers} from 'redux';

import {configureStore} from '@reduxjs/toolkit';
import interfaceReducer from './reducers/interface';
import authReducer from './reducers/authSlice';
import userReducer from './reducers/userSlice';
import cartReducer from './reducers/cartSlice';
import siteReducer from './reducers/siteSlice';
import storage from 'redux-persist/lib/storage/session';
import thunk from 'redux-thunk';

const persistConfig = {
	key: 'auth',
	storage,
	whitelist: ['interface', 'auth', 'user'],
};

const reducers = combineReducers({
	interface: interfaceReducer,
	auth: authReducer,
	user: userReducer,
	cart: cartReducer,
	site: siteReducer,
});

export const store = configureStore({
	reducer: persistReducer(persistConfig, reducers),
	devTools: process.env.NODE_ENV !== 'production',
	middleware: [thunk],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

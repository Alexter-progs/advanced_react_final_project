import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authApi } from '~shared/store';
import { userSlice } from '~entities/user';
import { cartSlice } from '~features/Cart';
import { productsSlice, productsApi } from '~entities/product';

const persistConfig = {
	key: 'user_storage',
	version: 1,
	storage,
	whitelist: ['user', 'cart'],
};

const rootReducer = combineReducers({
	[userSlice.name]: userSlice.reducer,
	[cartSlice.name]: cartSlice.reducer,
	[productsSlice.name]: productsSlice.reducer,
	[authApi.reducerPath]: authApi.reducer,
	[productsApi.reducerPath]: productsApi.reducer,
});

export const store = configureStore({
	reducer: persistReducer(persistConfig, rootReducer),
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat([authApi.middleware, productsApi.middleware]),
});

export const persistor = persistStore(store);

declare global {
	type RootState = ReturnType<typeof rootReducer>;
	type AppDispatch = typeof store.dispatch;
}

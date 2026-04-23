import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductsState } from '../model/types';
const initialState: ProductsState = {
	searchText: '',
	sort: 'newest',
	page: 1,
	perPage: 6,
};

export const productsSlice = createSlice({
	name: 'products',
	initialState: initialState,
	reducers: {
		setSort: (state, action: PayloadAction<Sort>) => ({
			...state,
			sort: action.payload,
		}),
		setSearchText: (state, action: PayloadAction<string>) => ({
			...state,
			searchText: action.payload,
		}),
		setPage: (state, action: PayloadAction<number>) => ({
			...state,
			page: action.payload,
		}),
	},
	selectors: {
		getSort: (state: ProductsState) => state.sort,
		getSearchText: (state: ProductsState) => state.searchText,
		getPage: (state: ProductsState) => state.page,
		getPerPage: (state: ProductsState) => state.perPage,
	},
});

export const productsActions = { ...productsSlice.actions };
export const productsSelectors = productsSlice.selectors;

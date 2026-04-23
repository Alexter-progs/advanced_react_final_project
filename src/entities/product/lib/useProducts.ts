import { createSelector } from '@reduxjs/toolkit';
import { useGetProductsQuery } from '../api/productsApi';
import { productsSelectors } from '../store/productsSlice';
import { useAppSelector } from '~shared/store';

const productState = createSelector(
	[
		productsSelectors.getSort,
		productsSelectors.getPage,
		productsSelectors.getPerPage,
		productsSelectors.getSearchText,
	],
	(sort, page, perPage, searchText) => ({
		sort,
		page,
		perPage,
		searchText,
	})
);

export const useProducts = () => {
	const { page, perPage, sort, searchText } = useAppSelector(productState);

	const { isLoading, isError, error, data, isFetching } = useGetProductsQuery({
		searchText,
		sort,
		page,
		perPage,
	});

	const products = data?.products || [];
	const productsCount = data?.length || 0;

	return {
		products,
		isLoading,
		isError,
		isFetching,
		error,
		productsCount,
	};
};

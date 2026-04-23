import { useMemo } from 'react';
import { useGetProductsQuery } from '~entities/product';
import { useAppSelector } from '~shared/store';
import { userSelectors } from '~entities/user';

import { isLiked } from '~shared/utils';

export const useFavoriteProducts = () => {
	const { isLoading, isError, error, data, isFetching } = useGetProductsQuery({
		page: 1,
		perPage: undefined,
	});

	const products = data?.products || [];
	const user = useAppSelector(userSelectors.getUser);

	const memoizedProducts = useMemo(
		() => products.filter((product) => isLiked(product.likes, user?.id)),
		[products]
	);

	const productsCount = data?.length || 0;

	return {
		products: memoizedProducts,
		isLoading,
		isError,
		isFetching,
		error,
		productsCount,
	};
};

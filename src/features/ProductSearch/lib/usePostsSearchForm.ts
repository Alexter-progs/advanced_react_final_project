import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productsActions } from '~entities/product';
import { useAppDispatch } from '~shared/store';

import { useDebounce } from '~shared/hooks';

const QUERY_SEARCH_PHRASE = 'q';

export const useProductsSearchForm = () => {
	const dispatch = useAppDispatch();

	const [searchParams, setSearchParams] = useSearchParams();
	const [searchValue, setSearchValue] = useState(
		() => searchParams.get(QUERY_SEARCH_PHRASE) ?? ''
	);

	const optimizedValue = useDebounce(searchValue, 500);

	useEffect(() => {
		dispatch(productsActions.setSearchText(optimizedValue));

		if (optimizedValue) {
			searchParams.set(QUERY_SEARCH_PHRASE, optimizedValue);
		} else {
			searchParams.delete(QUERY_SEARCH_PHRASE);
		}

		setSearchParams(searchParams);
	}, [optimizedValue, dispatch, searchParams, setSearchParams]);

	return {
		searchValue,
		setSearchValue,
	};
};

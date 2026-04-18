import { Sort } from '~features/Sort';
import { WithProtection, WithQuery } from '~shared/store/HOCs';

import { LoadMore } from '~shared/ui/LoadMore';
import { CardList } from '~widgets/CardList';
import { useProducts } from '~shared/store';

const CardListWithQuery = WithQuery(CardList);

export const HomePage = WithProtection(() => {
	const { products, isLoading, isError, error } = useProducts();

	return (
		<>
			<Sort />
			<CardListWithQuery
				title='Лакомства'
				isLoading={isLoading}
				isError={isError}
				products={products}
				error={error}
			/>
			<LoadMore />
		</>
	);
});

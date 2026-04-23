import { ProductsSort } from '~features/ProductsSort';
import { WithQuery } from '~shared/store/HOCs';
import { WithProtection } from '~features/Auth';
import { LoadMore } from '~features/LoadMore';
import { CardList } from '~widgets/CardList';
import { useProducts } from '~entities/product';
const CardListWithQuery = WithQuery(CardList);

export const HomePage = WithProtection(() => {
	const { products, isLoading, isError, error } = useProducts();

	return (
		<>
			<ProductsSort />
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

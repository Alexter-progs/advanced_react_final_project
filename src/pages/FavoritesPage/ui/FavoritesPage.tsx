import { useFavoriteProducts } from '../lib/useFavoriteProducts';
import { WithQuery } from '~shared/store/HOCs';
import { WithProtection } from '~features/Auth';
import { ButtonBack } from '~shared/ui/ButtonBack';
import { CardList } from '~widgets/CardList';

const CardListWithQuery = WithQuery(CardList);

export const FavoritesPage = WithProtection(() => {
	const { isLoading, isError, products, error } = useFavoriteProducts();

	return (
		<>
			<br />
			<ButtonBack />
			<CardListWithQuery
				title='Избранные'
				isLoading={isLoading}
				isError={isError}
				products={products}
				error={error}
			/>
		</>
	);
});

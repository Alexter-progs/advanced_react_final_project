import { useCallback } from 'react';
import s from './CardList.module.css';
import { Card } from '~entities/product';
import { cartActions, CartCounter } from '~features/Cart';
import { LikeProductButton } from '~features/LikeProductButton';

import { useAppDispatch } from '~shared/store';

type CardListProps = {
	title: string;
	products: Product[];
};

export const CardList = ({ title, products }: CardListProps) => {
	const dispatch = useAppDispatch();

	const handleAddToCart = useCallback(
		(product: Product) =>
			dispatch(cartActions.addCartProduct({ ...product, count: 1 })),
		[dispatch]
	);

	if (!products.length) {
		return <h1 className='header-title'>Товар не найден</h1>;
	}

	return (
		<div className={s['card-list']}>
			<div className={s['card-list__header']}>
				<h2 className={s['card-list__title']}>{title}</h2>
			</div>
			<div className={s['card-list__items']}>
				{products.map((product) => (
					<Card
						key={product.id}
						product={product}
						onAddToCart={handleAddToCart}
						likeButtonSlot={<LikeProductButton product={product} />}
						cartCounterSlot={<CartCounter product={product} />}
					/>
				))}
			</div>
		</div>
	);
};

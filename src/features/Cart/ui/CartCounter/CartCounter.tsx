import classNames from 'classnames';
import { memo } from 'react';
import { useCartProductCounter } from '../../lib/useCartProductCounter';
import s from './CartCounter.module.css';
import { cartActions } from '~features/Cart';
import { useAppDispatch } from '~shared/store';

type TCartCounter = {
	product: Product;
	enableCountBeforeAddingToCart?: boolean;
};
export const CartCounter = memo(
	({ product, enableCountBeforeAddingToCart }: TCartCounter) => {
		const dispatch = useAppDispatch();
		const {
			decrement,
			increment,
			count,
			handleInputChange,
			isMin,
			isMax,
			isInCart,
		} = useCartProductCounter({ product });

		const handleAddToCart = () =>
			dispatch(cartActions.addCartProduct({ ...product, count }));

		return (
			<div className={classNames('product__btn-wrap')}>
				{(isInCart || enableCountBeforeAddingToCart) && (
					<div className={classNames(s['button-count'])}>
						<button
							onClick={decrement}
							className={classNames(s['button-count__minus'])}
							disabled={isMin}>
							-
						</button>
						<input
							onChange={handleInputChange}
							type='number'
							className={classNames(s['button-count__num'])}
							value={count}
						/>
						<button
							onClick={increment}
							className={classNames(s['button-count__plus'])}
							disabled={isMax}>
							+
						</button>
					</div>
				)}
				{!isInCart && (
					<button
						onClick={handleAddToCart}
						className={classNames(s['button'], s['button_type_primary'])}>
						В корзину
					</button>
				)}
			</div>
		);
	}
);

CartCounter.displayName = 'CartCounter';

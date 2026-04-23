import classNames from 'classnames';
import { useCallback } from 'react';
import { CartItem } from '../../CartItem';
import s from '../../CartPage.module.css';
import { useAppDispatch, useAppSelector } from '~shared/store';
import { cartActions, cartSelectors } from '~features/Cart';

export const CartList = () => {
	const dispatch = useAppDispatch();
	const products = useAppSelector(cartSelectors.getCartProducts);

	const handleRemoveCartItem = useCallback(
		(id: CartProduct['id']) => {
			dispatch(cartActions.deleteCartProduct(id));
		},
		[dispatch, cartActions]
	);

	return (
		<div className={classNames(s['cart-list'])}>
			{products.map((p) => (
				<CartItem product={p} key={p.id} onRemove={handleRemoveCartItem} />
			))}
		</div>
	);
};

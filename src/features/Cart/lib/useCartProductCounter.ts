import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { cartActions, cartSelectors } from '../store/cart';
import { useAppSelector } from '~shared/store';
import { useCount } from '~shared/hooks';

interface UseCartProductCounterOptions {
	product: Product;
}

export const useCartProductCounter = ({
	product,
}: UseCartProductCounterOptions) => {
	const dispatch = useDispatch();
	const isInCart = useAppSelector((state) =>
		cartSelectors.isInCart(state, product.id)
	);
	const cartProduct = useAppSelector((state) =>
		cartSelectors.getCartProduct(state, product.id)
	);
	const productStock = useAppSelector((state) =>
		cartSelectors.getProductStock(state, product.id)
	) as number;

	const onCountUpdate = useCallback(
		(count: number) => {
			if (isInCart) {
				console.log('On count update. Count: ', count);
				dispatch(cartActions.setCartProductCount({ id: product.id, count }));
			}
		},
		[dispatch, product, isInCart]
	);

	const { decrement, increment, setCount, count, isMin, isMax } = useCount({
		initialCount: !!cartProduct ? cartProduct.count : 1,
		MAX_COUNT: productStock,
		onCountUpdate,
	});

	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setCount(+e.target.value);
		},
		[setCount]
	);

	return {
		decrement,
		increment,
		count,
		handleInputChange,
		isMin,
		isMax,
		isInCart,
	};
};

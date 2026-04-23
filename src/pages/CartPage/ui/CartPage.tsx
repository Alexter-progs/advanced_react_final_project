import classNames from 'classnames';
import s from './CartPage.module.css';
import { CartList } from './CartList';
import { CartCheckout } from './CartCheckout';
import { useAppSelector } from '~shared/store';
import { cartSelectors } from '~features/Cart';

export const CartPage = () => {
	const cartSize = useAppSelector(cartSelectors.getCartSize);

	if (cartSize < 1) {
		return <h1 className='header-title'>Товаров нет корзине</h1>;
	}

	return (
		<div className={classNames(s['content'], s['container'])}>
			<div className={classNames(s['content-cart'])}>
				<div className={classNames(s['cart-title'])}>
					<span>{cartSize}</span> в корзине
				</div>
				<CartList />
				<CartCheckout />
			</div>
		</div>
	);
};

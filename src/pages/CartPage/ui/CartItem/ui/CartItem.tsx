import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { memo } from 'react';
import s from '../../CartPage.module.css';
import { ReactComponent as TrashIcon } from '~static/icons/trash.svg';
import { CartCounter } from '~features/Cart';
import { Price } from '~shared/ui/Price';

type CartItemProps = {
	product: CartProduct;
	onRemove: (productId: CartProduct['id']) => void;
};

export const CartItem = memo(({ product, onRemove }: CartItemProps) => {
	const { id, name, images, price, discount } = product;

	return (
		<div className={classNames(s['cart-item'])}>
			<div className={classNames(s['cart-item__desc'])}>
				<img
					src={images}
					alt={name}
					className={classNames(s['cart-item__image'])}
				/>

				<div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
					<div style={{ display: 'flex', gap: '20px', flexGrow: 1 }}>
						<Link
							className={classNames(s['cart-item__title'])}
							to={`/products/${id}`}>
							<h2>{name}</h2>
						</Link>

						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<CartCounter product={product} />
							<Price price={price} discountPrice={discount} />
						</div>
						<button className={classNames(s['cart-item__bnt-trash'])}>
							<TrashIcon onClick={() => onRemove(id)} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
});

CartItem.displayName = 'CartItem';

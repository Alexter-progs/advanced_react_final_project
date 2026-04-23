import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { memo } from 'react';
import s from './Card.module.css';
import { Price } from '~shared/ui/Price';
import { useAppSelector } from '~shared/store';
import { cartSelectors } from '~features/Cart';

type CardProps = {
	product: Product;
	onAddToCart: (product: Product) => void;
	likeButtonSlot: React.ReactNode;
	cartCounterSlot: React.ReactNode;
};

export const Card: React.ComponentType<CardProps> = memo(
	({ product, onAddToCart, likeButtonSlot, cartCounterSlot }) => {
		const isInCart = useAppSelector((state) =>
			cartSelectors.isInCart(state, product.id)
		);
		const { discount, price, name, tags, id, images } = product;

		return (
			<article className={s['card']}>
				<div
					className={classNames(
						s['card__sticky'],
						s['card__sticky_type_top-left']
					)}>
					<span className={s['card__discount']}>{discount}</span>
					{tags.length > 0 &&
						tags.map((t) => (
							<span key={t} className={classNames(s['tag'], s['tag_type_new'])}>
								{t}
							</span>
						))}
				</div>
				<div
					className={classNames(
						s['card__sticky'],
						s['card__sticky_type_top-right']
					)}>
					{likeButtonSlot}
				</div>
				<Link className={s['card__link']} to={`/products/${id}`}>
					<img
						src={images}
						alt={name}
						className={s['card__image']}
						loading='lazy'
					/>
					<div className={s['card__desc']}>
						<Price price={price} discountPrice={discount} />
						<h3 className={s['card__name']}>{name}</h3>
					</div>
				</Link>
				{cartCounterSlot}
			</article>
		);
	}
);

Card.displayName = 'Card';

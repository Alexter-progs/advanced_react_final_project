import classNames from 'classnames';
import { memo } from 'react';
import s from './Price.module.css';

type TPriceProps = {
	price: number;
	discountPrice: number;
};

export const Price = memo(({ price, discountPrice }: TPriceProps) => {
	return (
		<div className={classNames(s['price-small'], s['price-wrap'])}>
			<span
				className={classNames(
					{ [s['price_old']]: discountPrice > 0 },
					{ [s['price']]: discountPrice < 1 },
					s['price_left']
				)}>
				{`${price}₽`}
			</span>
			{discountPrice > 0 && (
				<span className={classNames(s['price_discount'], s['price'])}>
					{`${price - discountPrice}₽`}
				</span>
			)}
		</div>
	);
});

Price.displayName = 'Price';

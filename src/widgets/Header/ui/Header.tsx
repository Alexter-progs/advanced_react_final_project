import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { memo, useCallback, useMemo } from 'react';
import FavouriteIcon from '@mui/icons-material/FavoriteBorder';
import CartIcon from '@mui/icons-material/ShoppingBagOutlined';
import ProfileIcon from '@mui/icons-material/Person2Outlined';
import Button from '@mui/material/Button';
import s from './Header.module.css';
import { DogFoodLogo } from '~shared/ui/DogFoodLogo';
import { ProductSearch } from '~features/ProductSearch';
import {
	useAppSelector,
	useLogoutMutation,
	useAppDispatch,
} from '~shared/store';
import { userSelectors, userActions } from '~entities/user';
import { cartSelectors } from '~features/Cart';
import { useProducts } from '~entities/product';
import { isLiked } from '~shared/utils';

export const Header = () => {
	const { products } = useProducts();
	const user = useAppSelector(userSelectors.getUser);
	const cartSize = useAppSelector(cartSelectors.getCartSize);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [logoutRequestFn] = useLogoutMutation();

	const handleLogout = useCallback(() => {
		logoutRequestFn({});
		dispatch(userActions.clearUser());
		navigate('/');
	}, [logoutRequestFn, dispatch, navigate]);

	const likeCount = useMemo(
		() => products.filter((product) => isLiked(product.likes, user?.id)).length,
		[products, user]
	);

	const accessToken = useAppSelector(userSelectors.getAccessToken);

	return (
		<header className={s.header}>
			<div className={classNames('container', s.header__wrapper)}>
				<DogFoodLogo />
				{accessToken && <ProductSearch />}
				<div className={s['header__icons-menu']}>
					<Link
						className={s['header__favorites-link']}
						to='/favorites'
						title='Избранное'>
						<FavouriteIcon
							sx={{ color: 'black', currentColor: 'black', fill: 'black' }}
						/>
						<span className={s['header__icon-bubble']}>{likeCount}</span>
					</Link>
					<Link
						className={s['header__favorites-link']}
						to='/cart'
						title='Корзина'>
						<CartIcon
							sx={{ color: 'black', currentColor: 'black', fill: 'black' }}
						/>
						<span className={s['header__icon-bubble']}>{cartSize}</span>
					</Link>
					{accessToken && (
						<>
							<Link className={s['header__icons-menu-item']} to='/profile'>
								<ProfileIcon fontSize='large' />
							</Link>
							<Button
								className={s['header__icons-menu-item']}
								onClick={handleLogout}>
								Выйти
							</Button>
						</>
					)}
				</div>
			</div>
		</header>
	);
};

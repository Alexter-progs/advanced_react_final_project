import { Link } from 'react-router-dom';
import s from './DogFoodLogo.module.css';
import LogoIcon from '~static/icons/logo.svg';

export const DogFoodLogo = () => {
	return (
		<Link to='/'>
			<img className={s['logo__pic']} src={LogoIcon} alt='Логотип DogFood' />
		</Link>
	);
};

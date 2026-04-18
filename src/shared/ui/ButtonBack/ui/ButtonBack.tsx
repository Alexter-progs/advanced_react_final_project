import { useNavigate } from 'react-router-dom';
import { ReactComponent as BackSvg } from '~static/icons/back.svg';

export const ButtonBack = () => {
	const navigate = useNavigate();
	return (
		<button onClick={() => navigate(-1)}>
			<BackSvg />
		</button>
	);
};

import CloseIcon from '@mui/icons-material/Close';
import { useProductsSearchForm } from '../lib/usePostsSearchForm';
import s from './ProductSearch.module.css';

export const ProductSearch = () => {
	const { searchValue, setSearchValue } = useProductsSearchForm();

	const handleClearSearchText = () => {
		setSearchValue('');
	};

	return (
		<form className={s['search']}>
			<input
				type='text'
				className={s['search__input']}
				placeholder='Поиск'
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
			/>
			{searchValue.length > 0 && (
				<button className={s['search__btn']} onClick={handleClearSearchText}>
					<CloseIcon />
				</button>
			)}
		</form>
	);
};

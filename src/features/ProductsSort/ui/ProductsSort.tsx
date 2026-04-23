import { ChangeEvent, memo } from 'react';
import { useProductsSort } from '../hooks/useProductsSort';

export const ProductsSort = memo(() => {
	const { sort, setSort, sortParams } = useProductsSort();

	const handleSortSelect = (e: ChangeEvent<HTMLSelectElement>) => {
		const newSort = e.target.value as Sort;
		setSort(newSort);
	};

	return (
		<select value={sort} onChange={handleSortSelect}>
			{sortParams.map((p) => (
				<option key={p.title} value={p.value}>
					{p.title}
				</option>
			))}
		</select>
	);
});

ProductsSort.displayName = 'ProductsSort';

import { useCallback, useState } from 'react';

interface UseCountOptions {
	MIN_COUNT?: number;
	MAX_COUNT?: number;
	onCountUpdate?: (count: number) => void;
	initialCount?: number;
}

export const useCount = ({
	MIN_COUNT = 1,
	MAX_COUNT = 99,
	initialCount = 1,
	onCountUpdate,
}: UseCountOptions) => {
	const [count, setCount] = useState(
		initialCount > MAX_COUNT
			? MAX_COUNT
			: initialCount < MIN_COUNT
			? MIN_COUNT
			: initialCount
	);

	const changeCount = useCallback(
		(newCount: number) => {
			setCount(
				newCount > MAX_COUNT
					? MAX_COUNT
					: newCount < MIN_COUNT
					? MIN_COUNT
					: newCount
			);
			if (onCountUpdate) {
				onCountUpdate(newCount);
			}
		},
		[MAX_COUNT, MIN_COUNT, onCountUpdate]
	);

	const decrement = useCallback(() => {
		changeCount(count - 1);
	}, [changeCount, count]);

	const increment = useCallback(() => {
		changeCount(count + 1);
	}, [changeCount, count]);

	return {
		count,
		setCount: changeCount,
		decrement,
		increment,
		isMax: count === MAX_COUNT,
		isMin: count === MIN_COUNT,
	};
};

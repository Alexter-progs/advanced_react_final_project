import { useEffect, useState, useRef } from 'react';

export const useDebounce = <V>(outerValue: V, ms: number) => {
	const [optimizedValue, setOptimizedValue] = useState<V>(outerValue);
	const timerRef = useRef<number>(null);

	useEffect(() => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}

		timerRef.current = window.setTimeout(() => {
			setOptimizedValue(outerValue);
		}, ms);
	}, [ms, outerValue]);

	return optimizedValue;
};

import { CircularProgress, Stack } from '@mui/material';
import { memo, RefObject, useRef } from 'react';
import { useLoadMore } from '../hooks/useLoadMore';

export const LoadMore = memo(() => {
	const ref = useRef<HTMLDivElement>(null);
	const { isFetching } = useLoadMore({ ref: ref as RefObject<HTMLDivElement> });

	return (
		<Stack
			ref={ref}
			sx={{
				direction: 'row',
				justifyContent: 'center',
				alignItems: 'center',
				my: 5,
			}}>
			{isFetching && <CircularProgress />}
		</Stack>
	);
});

LoadMore.displayName = 'LoadMore';

import { Alert, CircularProgress, Stack } from '@mui/material';
import { useRef } from 'react';
import { useLoadMore } from '../hooks/useLoadMore';

export const LoadMore = () => {
	const ref = useRef<HTMLDivElement>(null);
	const { isEndOfList, isFetching } = useLoadMore({ ref });

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
			{isEndOfList && <Alert severity='success'>End of list!</Alert>}
		</Stack>
	);
};

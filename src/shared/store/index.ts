export {
	useSignInMutation,
	useSignUpMutation,
	useLogoutMutation,
} from './api/authApi';
export { baseQuery } from './api/baseQuery';
export { authApi } from './api/authApi';

import { useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

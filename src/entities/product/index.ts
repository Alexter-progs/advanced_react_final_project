export { Card } from './ui/Card';
export {
	productsSlice,
	productsActions,
	productsSelectors,
} from './store/productsSlice';
export {
	productsApi,
	useGetProductQuery,
	useDeleteLikeProductMutation,
	useSetLikeProductMutation,
	useGetProductsQuery,
	type IErrorResponse,
} from './api/productsApi';
export { useProducts } from './lib/useProducts';

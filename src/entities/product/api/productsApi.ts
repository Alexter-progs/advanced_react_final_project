import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '~shared/store';

export interface IErrorResponse {
	data: { statusCode: number; message: string; error: string };
	status: number;
}

interface ProductsResponse {
	products: Product[];
	length: number;
}

interface SetLikeResponse {
	like: {
		id: string;
		userId: string;
		productId: string;
	};
	message: string;
}
interface DeleteLikeResponse {
	product: {
		id: string;
		userId: string;
		productId: string;
	};
	message: string;
}
interface ProductRequest {
	page: number;
	perPage?: number;
	sort?: Sort;
	searchText?: string;
}

export const productsApi = createApi({
	reducerPath: 'productsApi',
	baseQuery: baseQuery,
	tagTypes: ['Products'],
	endpoints: (builder) => ({
		getProducts: builder.query<ProductsResponse, ProductRequest>({
			query: ({ searchText: searchTerm, sort, page, perPage }) => {
				return {
					url: '/products',
					params: {
						sort: !!sort ? sort : undefined,
						searchTerm: searchTerm?.length ? searchTerm : undefined,
						perPage: perPage ? page * perPage : undefined,
					},
				};
			},
			providesTags: [{ type: 'Products', id: 'list' }],
		}),
		getProduct: builder.query<Product, Pick<Product, 'id'>>({
			query: ({ id }) => ({ url: `/products/${id}` }),
			providesTags: (productFromBE) => [
				{ type: 'Products', id: productFromBE?.id },
			],
		}),

		createProduct: builder.mutation<Product, Product>({
			query: (product) => ({
				url: '/products',
				method: 'POST',
				body: product,
			}),
			invalidatesTags: [{ type: 'Products', id: 'list' }],
		}),

		deleteProduct: builder.mutation<Product, Pick<Product, 'id'>>({
			query: ({ id }) => ({
				url: `/products/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: (productFromBE) => [
				{ type: 'Products', id: 'list' },
				{ type: 'Products', id: productFromBE?.id },
			],
		}),
		setLikeProduct: builder.mutation<SetLikeResponse, Pick<Product, 'id'>>({
			query: ({ id }) => ({
				url: `/products/${id}/likes`,
				method: 'PUT',
			}),
			// invalidatesTags: (productFromBE) => [
			// 	{ type: 'Products', id: productFromBE?.like?.productId },
			// ],
			onQueryStarted: async (
				{ id },
				{ dispatch, queryFulfilled, getState }
			) => {
				try {
					const { data } = await queryFulfilled;

					const endpoints = productsApi.util.selectInvalidatedBy(getState(), [
						{ type: 'Products', id: 'list' },
					]);

					for (const { endpointName, originalArgs } of endpoints) {
						if (endpointName !== 'getProducts') continue;
						dispatch(
							productsApi.util.updateQueryData(
								endpointName,
								originalArgs,
								(draft) => {
									const productId = data.like.productId;
									const productIndex = draft.products.findIndex(
										(p) => p.id === productId
									);

									if (productIndex !== -1) {
										draft.products[productIndex].likes.push({ ...data.like });
									}
								}
							)
						);
					}
				} catch (e) {
					console.error(e);
				}
			},
		}),
		deleteLikeProduct: builder.mutation<
			DeleteLikeResponse,
			Pick<Product, 'id'>
		>({
			query: ({ id }) => ({
				url: `/products/${id}/likes`,
				method: 'DELETE',
			}),
			// invalidatesTags: (productFromBE) => [
			// 	{ type: 'Products', id: productFromBE?.product?.id },
			// ],
			onQueryStarted: async (
				{ id },
				{ dispatch, queryFulfilled, getState }
			) => {
				try {
					const { data } = await queryFulfilled;

					for (const {
						endpointName,
						originalArgs,
					} of productsApi.util.selectInvalidatedBy(getState(), [
						{ type: 'Products', id: 'list' },
					])) {
						if (endpointName !== 'getProducts') continue;
						dispatch(
							productsApi.util.updateQueryData(
								endpointName,
								originalArgs,
								(draft) => {
									const productId = data.product.productId;
									const unlikedProduct = draft.products.find(
										(p) => p.id === productId
									);
									if (unlikedProduct) {
										const removedLikeIndex = unlikedProduct.likes.findIndex(
											(l) => l.userId === data.product.userId
										);
										if (removedLikeIndex !== -1) {
											unlikedProduct.likes.splice(removedLikeIndex, 1);
										}
									}
								}
							)
						);
					}
				} catch (e) {
					console.error(e);
				}
			},
		}),
	}),
});

export const {
	useGetProductQuery,
	useGetProductsQuery,
	useSetLikeProductMutation,
	useDeleteLikeProductMutation,
} = productsApi;

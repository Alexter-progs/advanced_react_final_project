import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
	products: CartProduct[];
}

const createInitState = (): CartState => ({
	products: [],
});

export const cartSlice = createSlice({
	name: 'cart',
	initialState: createInitState(),
	reducers: {
		addCartProduct(state, action: PayloadAction<CartProduct>) {
			state.products = [...state.products, action.payload];
		},
		deleteCartProduct(state, action: PayloadAction<CartProduct['id']>) {
			state.products = state.products.filter((p) => p.id !== action.payload);
		},
		setCartProductCount(
			state,
			action: PayloadAction<Pick<CartProduct, 'id' | 'count'>>
		) {
			const productIndex = state.products.findIndex(
				(p) => p.id === action.payload.id
			);

			if (productIndex !== -1) {
				state.products[productIndex].count = action.payload.count;
			}
		},
	},
	selectors: {
		getCartProducts: (state: CartState) => state.products,
		getCartSize: (state: CartState) => state.products.length,
		getProductStock: (state: CartState, productId: CartProduct['id']) =>
			state.products.find((p) => p.id === productId)?.stock,
		getTotalCartPrice: (state: CartState) =>
			state.products.reduce((acc, p) => p.price * p.count + acc, 0),
		getTotalCartDiscount: (state: CartState) =>
			state.products.reduce((acc, p) => p.discount * p.count + acc, 0),
		isInCart: (state: CartState, productId: CartProduct['id']) =>
			state.products.some((p) => p.id === productId),
		getCartProduct: (state: CartState, productId: CartProduct['id']) =>
			state.products.find((p) => p.id === productId),
	},
});

export const cartActions = { ...cartSlice.actions };
export const cartSelectors = cartSlice.selectors;

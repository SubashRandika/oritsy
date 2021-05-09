import { createSlice, current } from '@reduxjs/toolkit';
import { addToCart } from '../actions/cartActions';

const initialState = {
	cartItems: []
};

const cartSlice = createSlice({
	name: 'cartItems',
	initialState,
	extraReducers: {
		[addToCart.fulfilled]: (state, { payload }) => {
			const itemToAdd = payload;

			const existItem = current(state.cartItems).find(
				(item) => item.product === itemToAdd.product
			);

			if (existItem) {
				state.cartItems = state.cartItems.map((item) => {
					if (item.product === existItem.product) {
						return {
							...existItem,
							quantity: Number(itemToAdd.quantity)
						};
					}

					return item;
				});
			} else {
				state.cartItems.push(itemToAdd);
			}

			localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
		}
	}
});

export const cartSelector = (state) => state.cart;

export default cartSlice.reducer;

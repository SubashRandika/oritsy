import { createSlice, current } from '@reduxjs/toolkit';
import { addToCart } from '../actions/cartActions';

const initialState = {
	cartItems: [],
	shippingAddress: {},
	paymentMethod: ''
};

const cartSlice = createSlice({
	name: 'cartItems',
	initialState,
	reducers: {
		removeFromCart: (state, actions) => {
			const updateCartItems = current(state).cartItems.filter(
				(item) => item.product !== actions.payload
			);

			state.cartItems = updateCartItems;
			localStorage.setItem('cartItems', JSON.stringify(updateCartItems));
		},
		storeShippingAddressDetails: (state, actions) => {
			state.shippingAddress = actions.payload;
			localStorage.setItem('shippingAddress', JSON.stringify(actions.payload));
		},
		storePaymentMethod: (state, actions) => {
			console.log(actions.payload);
			state.paymentMethod = actions.payload;
			localStorage.setItem('paymentMethod', JSON.stringify(actions.payload));
		}
	},
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

export const {
	removeFromCart,
	storeShippingAddressDetails,
	storePaymentMethod
} = cartSlice.actions;

export default cartSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './slices/productsSlice';
import productDetailsSlice from './slices/productDetailsSlice';
import cartSlice from './slices/cartSlice';

const cartItemsFromLocalStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];

export default configureStore({
	reducer: {
		productsList: productsSlice,
		productDetails: productDetailsSlice,
		cart: cartSlice
	},
	preloadedState: {
		cart: {
			cartItems: cartItemsFromLocalStorage
		}
	}
});

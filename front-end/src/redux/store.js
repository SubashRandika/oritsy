import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './slices/productsSlice';
import productDetailsSlice from './slices/productDetailsSlice';
import cartSlice from './slices/cartSlice';
import userSlice from './slices/userSlice';

const cartItemsFromLocalStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];

const userInfoFromLocalStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

export default configureStore({
	reducer: {
		productsList: productsSlice,
		productDetails: productDetailsSlice,
		cart: cartSlice,
		userLogin: userSlice
	},
	preloadedState: {
		cart: {
			cartItems: cartItemsFromLocalStorage
		},
		userLogin: {
			userInfo: userInfoFromLocalStorage
		}
	}
});

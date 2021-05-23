import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import productsSlice from './slices/productsSlice';
import productDetailsSlice from './slices/productDetailsSlice';
import cartSlice from './slices/cartSlice';
import userLoginSlice from './slices/userLoginSlice';
import userRegisterSlice from './slices/userRegisterSlice';
import userProfileSlice from './slices/userProfileSlice';
import userProfileUpdateSlice from './slices/userProfileUpdateSlice';

const cartItemsFromLocalStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];

const userInfoFromLocalStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
	? JSON.parse(localStorage.getItem('shippingAddress'))
	: {};

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
	? JSON.parse(localStorage.getItem('paymentMethod'))
	: '';

export default configureStore({
	reducer: {
		productsList: productsSlice,
		productDetails: productDetailsSlice,
		cart: cartSlice,
		userLogin: userLoginSlice,
		userRegister: userRegisterSlice,
		userDetails: userProfileSlice,
		userProfileUpdate: userProfileUpdateSlice
	},
	preloadedState: {
		cart: {
			cartItems: cartItemsFromLocalStorage,
			shippingAddress: shippingAddressFromStorage,
			paymentMethod: paymentMethodFromStorage
		},
		userLogin: {
			userInfo: userInfoFromLocalStorage
		}
	},
	middleware: getDefaultMiddleware({
		serializableCheck: false
	})
});

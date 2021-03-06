import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import productsSlice from './slices/productsSlice';
import productsTopSlice from './slices/productsTopSlice';
import productDetailsSlice from './slices/productDetailsSlice';
import productDeleteSlice from './slices/productDeleteSlice';
import productCreateSlice from './slices/productCreateSlice';
import productUpdateSlice from './slices/productUpdateSlice';
import productReviewSlice from './slices/productReviewSlice';
import cartSlice from './slices/cartSlice';
import userLoginSlice from './slices/userLoginSlice';
import userRegisterSlice from './slices/userRegisterSlice';
import userDetailsSlice from './slices/userDetailsSlice';
import userProfileUpdateSlice from './slices/userProfileUpdateSlice';
import userListSlice from './slices/userListSlice';
import userDeleteSlice from './slices/userDeleteSlice';
import userUpdateSlice from './slices/userUpdateSlice';
import createOrderSlice from './slices/createOrderSlice';
import orderDetailsSlice from './slices/orderDetailsSlice';
import orderPaymentSlice from './slices/orderPaymentSlice';
import orderDeliverSlice from './slices/orderDeliverSlice';
import selfOrdersListSlice from './slices/selfOrdersListSlice';
import orderListSlice from './slices/orderListSlice';

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
		productsTop: productsTopSlice,
		productDetails: productDetailsSlice,
		productDelete: productDeleteSlice,
		productCreate: productCreateSlice,
		productUpdate: productUpdateSlice,
		productReview: productReviewSlice,
		cart: cartSlice,
		userLogin: userLoginSlice,
		userRegister: userRegisterSlice,
		userDetails: userDetailsSlice,
		userProfileUpdate: userProfileUpdateSlice,
		userList: userListSlice,
		userDelete: userDeleteSlice,
		userUpdate: userUpdateSlice,
		createOrder: createOrderSlice,
		orderDetails: orderDetailsSlice,
		orderPayment: orderPaymentSlice,
		orderDeliver: orderDeliverSlice,
		selfOrders: selfOrdersListSlice,
		orderList: orderListSlice
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

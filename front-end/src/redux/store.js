import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './slices/productsSlice';
import productDetailsSlice from './slices/productDetailsSlice';

export default configureStore({
	reducer: {
		productsList: productsSlice,
		productDetails: productDetailsSlice
	}
});

import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from '../actions/productActions';

const initialState = {
	products: [],
	loading: false,
	error: null
};

const productsSlice = createSlice({
	name: 'products',
	initialState,
	extraReducers: {
		[fetchProducts.pending]: (state) => {
			state.loading = true;
			state.products = [];
			state.error = null;
		},
		[fetchProducts.fulfilled]: (state, { payload }) => {
			state.products = payload;
			state.loading = false;
			state.error = null;
		},
		[fetchProducts.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload.message;
		}
	}
});

export const productsSelector = (state) => state.productsList;

export default productsSlice.reducer;

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
		[fetchProducts.rejected]: (state, { message }) => {
			state.loading = false;
			state.error = message;
		}
	}
});

export const productsSelector = (state) => state;

export default productsSlice.reducer;

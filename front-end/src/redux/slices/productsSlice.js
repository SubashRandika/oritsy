import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from '../actions/productActions';

const initialState = {
	products: []
};

const productsSlice = createSlice({
	name: 'products',
	initialState,
	extraReducers: {
		[fetchProducts.pending]: (state) => {
			state.loading = true;
			state.products = [];
		},
		[fetchProducts.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.products = payload.products;
			state.page = payload.page;
			state.pages = payload.pages;
		},
		[fetchProducts.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload?.message;
		}
	}
});

export const productsSelector = (state) => state.productsList;

export default productsSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { getTopRatedProducts } from '../actions/productActions';

const initialState = {
	products: []
};

const productsTopSlice = createSlice({
	name: 'productsTop',
	initialState,
	extraReducers: {
		[getTopRatedProducts.pending]: (state) => {
			state.loading = true;
			state.products = [];
		},
		[getTopRatedProducts.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.products = payload;
		},
		[getTopRatedProducts.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload?.message;
		}
	}
});

export const productsTopSelector = (state) => state.productsTop;

export default productsTopSlice.reducer;

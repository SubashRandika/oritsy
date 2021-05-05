import { createSlice } from '@reduxjs/toolkit';
import { fetchProductDetails } from '../actions/productActions';

const initialState = {
	product: {
		reviews: []
	},
	loading: false,
	error: null
};

const productDetailsSlice = createSlice({
	name: 'product',
	initialState,
	extraReducers: {
		[fetchProductDetails.pending]: (state) => {
			state.loading = true;
			state.product = { ...state.product };
			state.error = null;
		},
		[fetchProductDetails.fulfilled]: (state, { payload }) => {
			state.product = payload;
			state.loading = false;
			state.error = null;
		},
		[fetchProductDetails.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload.message;
		}
	}
});

export const productDetailsSelector = (state) => state.productDetails;

export default productDetailsSlice.reducer;

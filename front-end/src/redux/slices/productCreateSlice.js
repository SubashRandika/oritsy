import { createSlice } from '@reduxjs/toolkit';
import { createProduct } from '../actions/productActions';

const initialState = {};

const productCreateSlice = createSlice({
	name: 'productCreate',
	initialState,
	reducers: {
		resetProductCreate: (state) => initialState
	},
	extraReducers: {
		[createProduct.pending]: (state) => {
			state.loading = true;
		},
		[createProduct.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.success = true;
			state.product = payload;
		},
		[createProduct.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload?.message;
		}
	}
});

export const productCreateSelector = (state) => state.productCreate;

export const { resetProductCreate } = productCreateSlice.actions;

export default productCreateSlice.reducer;

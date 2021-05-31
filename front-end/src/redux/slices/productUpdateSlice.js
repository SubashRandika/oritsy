import { createSlice } from '@reduxjs/toolkit';
import { updateProduct } from '../actions/productActions';

const initialState = {
	product: {}
};

const productUpdateSlice = createSlice({
	name: 'productUpdate',
	initialState,
	reducers: {
		resetProductUpdate: (state) => initialState
	},
	extraReducers: {
		[updateProduct.pending]: (state) => {
			state.loading = true;
		},
		[updateProduct.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.product = payload;
			state.success = true;
		},
		[updateProduct.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload?.message;
		}
	}
});

export const productUpdateSelector = (state) => state.productUpdate;

export const { resetProductUpdate } = productUpdateSlice.actions;

export default productUpdateSlice.reducer;

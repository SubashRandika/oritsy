import { createSlice } from '@reduxjs/toolkit';
import { deleteProduct } from '../actions/productActions';

const initialState = {};

const productDeleteSlice = createSlice({
	name: 'productDelete',
	initialState,
	extraReducers: {
		[deleteProduct.pending]: (state) => {
			state.loading = true;
		},
		[deleteProduct.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.success = true;
		},
		[deleteProduct.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload?.message;
		}
	}
});

export const productDeleteSelector = (state) => state.productDelete;

export default productDeleteSlice.reducer;

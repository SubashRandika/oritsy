import { createSlice } from '@reduxjs/toolkit';
import { reviewProduct } from '../actions/productActions';

const initialState = {};

const productReviewSlice = createSlice({
	name: 'productReview',
	initialState,
	reducers: {
		resetProductReview: (state) => initialState
	},
	extraReducers: {
		[reviewProduct.pending]: (state) => {
			state.loading = true;
		},
		[reviewProduct.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.isSuccess = true;
			state.success = payload?.message;
		},
		[reviewProduct.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload?.message;
		}
	}
});

export const productReviewSelector = (state) => state.productReview;

export const { resetProductReview } = productReviewSlice.actions;

export default productReviewSlice.reducer;

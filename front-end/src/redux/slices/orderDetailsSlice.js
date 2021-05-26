import { createSlice } from '@reduxjs/toolkit';
import { getOrderDetails } from '../actions/orderActions.js';

const initialState = {
	orderItems: [],
	shippingAddress: {},
	loading: true
};

const orderDetailsSlice = createSlice({
	name: 'orderDetails',
	initialState,
	extraReducers: {
		[getOrderDetails.pending]: (state) => {
			state.orderItems = [];
			state.shippingAddress = {};
			state.loading = true;
		},
		[getOrderDetails.fulfilled]: (state, { payload }) => {
			state.order = payload;
			state.loading = false;
		},
		[getOrderDetails.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload.message;
		}
	}
});

export const orderDetailsSelector = (state) => state.orderDetails;

export default orderDetailsSlice.reducer;

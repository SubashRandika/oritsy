import { createSlice } from '@reduxjs/toolkit';
import { deliverOrder } from '../actions/orderActions.js';

const initialState = {};

const orderDeliverSlice = createSlice({
	name: 'orderDeliver',
	initialState,
	reducers: {
		resetDeliverOrder: (state) => initialState
	},
	extraReducers: {
		[deliverOrder.pending]: (state) => {
			state.isDeliver = true;
		},
		[deliverOrder.fulfilled]: (state, { payload }) => {
			state.isDeliver = false;
			state.deliverSuccess = true;
		},
		[deliverOrder.rejected]: (state, { payload }) => {
			state.isDeliver = false;
			state.error = payload?.message;
		}
	}
});

export const orderDeliverSelector = (state) => state.orderDeliver;

export const { resetDeliverOrder } = orderDeliverSlice.actions;

export default orderDeliverSlice.reducer;

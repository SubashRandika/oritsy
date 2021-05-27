import { createSlice } from '@reduxjs/toolkit';
import { getAuthUserOrders } from '../actions/orderActions.js';

const initialState = {
	orders: [],
	loading: true
};

const selfOrdersListSlice = createSlice({
	name: 'orderDetails',
	initialState,
	extraReducers: {
		[getAuthUserOrders.pending]: (state) => {
			state.loading = true;
		},
		[getAuthUserOrders.fulfilled]: (state, { payload }) => {
			state.orders = payload;
			state.loading = false;
		},
		[getAuthUserOrders.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload?.message;
		}
	}
});

export const selfOrdersSelector = (state) => state.selfOrders;

export default selfOrdersListSlice.reducer;

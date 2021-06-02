import { createSlice } from '@reduxjs/toolkit';
import { listOrders } from '../actions/orderActions';

const initialState = {
	orders: []
};

const orderListSlice = createSlice({
	name: 'orderList',
	initialState,
	extraReducers: {
		[listOrders.pending]: (state) => {
			state.loading = true;
		},
		[listOrders.fulfilled]: (state, { payload }) => {
			state.orders = payload;
			state.loading = false;
		},
		[listOrders.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload?.message;
		}
	}
});

export const orderListSelector = (state) => state.orderList;

export default orderListSlice.reducer;

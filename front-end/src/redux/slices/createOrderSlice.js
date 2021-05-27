import { createSlice } from '@reduxjs/toolkit';
import { createOrder } from '../actions/orderActions.js';

const initialState = {};

const createOrderSlice = createSlice({
	name: 'createOrder',
	initialState,
	extraReducers: {
		[createOrder.pending]: (state) => {
			state.loading = true;
		},
		[createOrder.fulfilled]: (state, { payload }) => {
			state.order = payload;
			state.loading = false;
			state.error = null;
			state.success = true;
		},
		[createOrder.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload?.message;
		}
	}
});

export const createOrderSelector = (state) => state.createOrder;

export default createOrderSlice.reducer;

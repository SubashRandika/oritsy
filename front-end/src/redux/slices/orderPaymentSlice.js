import { createSlice } from '@reduxjs/toolkit';
import { payOrder } from '../actions/orderActions.js';

const initialState = {};

const payOrderSlice = createSlice({
	name: 'payOrder',
	initialState,
	extraReducers: {
		[payOrder.pending]: (state) => {
			state.loading = true;
		},
		[payOrder.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.success = true;
		},
		[payOrder.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload.message;
		}
	}
});

export const payOrderSelector = (state) => state.payOrder;

export default payOrderSlice.reducer;

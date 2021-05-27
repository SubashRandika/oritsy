import { createSlice } from '@reduxjs/toolkit';
import { payOrder } from '../actions/orderActions.js';

const initialState = {};

const orderPaymentSlice = createSlice({
	name: 'payOrder',
	initialState,
	reducers: {
		clearPayOrder: (state, actions) => {
			state = {};
		}
	},
	extraReducers: {
		[payOrder.pending]: (state) => {
			state.isPaying = true;
		},
		[payOrder.fulfilled]: (state, { payload }) => {
			state.isPaying = false;
			state.paySuccess = true;
		},
		[payOrder.rejected]: (state, { payload }) => {
			state.isPaying = false;
			state.error = payload.message;
		}
	}
});

export const orderPaymentSelector = (state) => state.orderPayment;

export const { clearPayOrder } = orderPaymentSlice.actions;

export default orderPaymentSlice.reducer;

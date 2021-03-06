import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { clearCartItems } from '../slices/cartSlice';

const tostSuccessOptions = {
	position: 'top-center',
	autoClose: '10000',
	type: 'success'
};

const tostErrorOptions = {
	position: 'top-center',
	autoClose: '10000',
	type: 'error'
};

export const createOrder = createAsyncThunk(
	'orders/createOrder',
	async (order, { rejectWithValue, getState, dispatch }) => {
		const {
			userLogin: { userInfo }
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`
			}
		};

		try {
			const { data } = await axios.post('/api/orders', order, config);
			dispatch(clearCartItems());

			toast('Your order is successfully created', tostSuccessOptions);

			return data;
		} catch (error) {
			const { message } = error.response.data;

			toast(message, tostErrorOptions);

			return rejectWithValue({ message });
		}
	}
);

export const getOrderDetails = createAsyncThunk(
	'orders/getOrderDetails',
	async (id, { rejectWithValue, getState }) => {
		const {
			userLogin: { userInfo }
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`
			}
		};

		try {
			const { data } = await axios.get(`/api/orders/${id}`, config);

			return data;
		} catch (error) {
			const { message } = error.response.data;

			toast(message, tostErrorOptions);

			return rejectWithValue({ message });
		}
	}
);

export const payOrder = createAsyncThunk(
	'orders/payOrder',
	async ({ orderId, paymentResult }, { rejectWithValue, getState }) => {
		const {
			userLogin: { userInfo }
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`
			}
		};

		try {
			const { data } = await axios.put(
				`/api/orders/${orderId}/pay`,
				paymentResult,
				config
			);

			return data;
		} catch (error) {
			const { message } = error.response.data;

			toast(message, tostErrorOptions);

			return rejectWithValue({ message });
		}
	}
);

export const deliverOrder = createAsyncThunk(
	'orders/deliverOrder',
	async (orderId, { rejectWithValue, getState }) => {
		const {
			userLogin: { userInfo }
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`
			}
		};

		try {
			const { data } = await axios.put(
				`/api/orders/${orderId}/deliver`,
				{},
				config
			);

			return data;
		} catch (error) {
			const { message } = error.response.data;

			toast(message, tostErrorOptions);

			return rejectWithValue({ message });
		}
	}
);

export const getAuthUserOrders = createAsyncThunk(
	'orders/getAuthUserOrders',
	async (_, { rejectWithValue, getState }) => {
		const {
			userLogin: { userInfo }
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`
			}
		};

		try {
			const { data } = await axios.get('/api/orders/self', config);

			return data;
		} catch (error) {
			const { message } = error.response.data;

			toast(message, tostErrorOptions);

			return rejectWithValue({ message });
		}
	}
);

export const listOrders = createAsyncThunk(
	'users/listOrders',
	async (_, { rejectWithValue, getState }) => {
		const {
			userLogin: { userInfo }
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`
			}
		};

		try {
			const { data } = await axios.get('/api/orders', config);

			return data;
		} catch (error) {
			const { message } = error.response.data;

			toast(message, tostErrorOptions);

			return rejectWithValue({ message });
		}
	}
);

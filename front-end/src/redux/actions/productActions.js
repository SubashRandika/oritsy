import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const tostErrorOptions = {
	position: 'top-center',
	autoClose: '10000',
	type: 'error'
};

const tostSuccessOptions = {
	position: 'top-center',
	autoClose: '10000',
	type: 'success'
};

export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	async ({ keyword, pageNumber }, { rejectWithValue }) => {
		try {
			const { data } = await axios.get(
				`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
			);
			return data;
		} catch (error) {
			const { message } = error.response.data;

			toast(message, tostErrorOptions);

			return rejectWithValue(error.response.data);
		}
	}
);

export const getTopRatedProducts = createAsyncThunk(
	'products/getTopRatedProducts',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await axios.get('/api/products/top');
			return data;
		} catch (error) {
			const { message } = error.response.data;

			toast(message, tostErrorOptions);

			return rejectWithValue(error.response.data);
		}
	}
);

export const fetchProductDetails = createAsyncThunk(
	'products/fetchProductDetails',
	async (productId, { rejectWithValue }) => {
		try {
			const { data } = await axios.get(`/api/products/${productId}`);
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const deleteProduct = createAsyncThunk(
	'products/deleteProduct',
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
			const { data } = await axios.delete(`/api/products/${id}`, config);

			return data;
		} catch (error) {
			const { message } = error.response.data;

			toast(message, tostErrorOptions);

			return rejectWithValue({ message });
		}
	}
);

export const createProduct = createAsyncThunk(
	'products/createProduct',
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
			const { data } = await axios.post('/api/products', {}, config);

			return data;
		} catch (error) {
			const { message } = error.response.data;

			toast(message, tostErrorOptions);

			return rejectWithValue({ message });
		}
	}
);

export const updateProduct = createAsyncThunk(
	'products/updateProduct',
	async (product, { rejectWithValue, getState }) => {
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
				`/api/products/${product._id}`,
				product,
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

export const reviewProduct = createAsyncThunk(
	'products/reviewProduct',
	async ({ productId, review }, { rejectWithValue, getState }) => {
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
			const { data } = await axios.post(
				`/api/products/${productId}/reviews`,
				review,
				config
			);

			toast(data.message, tostSuccessOptions);

			return data;
		} catch (error) {
			const { message } = error.response.data;

			toast(message, tostErrorOptions);

			return rejectWithValue({ message });
		}
	}
);

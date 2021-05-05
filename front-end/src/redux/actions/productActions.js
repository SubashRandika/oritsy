import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await axios.get('/api/products');
			return data;
		} catch (error) {
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

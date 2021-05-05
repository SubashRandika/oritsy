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

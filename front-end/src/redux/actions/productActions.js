import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	async (_, thunkAPI) => {
		try {
			const { data } = await axios.get('/api/products');
			return data;
		} catch (error) {
			thunkAPI.rejectWithValue(error);
		}
	}
);

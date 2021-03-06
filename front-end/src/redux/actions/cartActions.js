import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addToCart = createAsyncThunk(
	'cart/addToCart',
	async ({ id, quantity }, { getState }) => {
		const { data } = await axios.get(`/api/products/${id}`);

		return {
			product: data._id,
			name: data.name,
			image: data.image,
			price: data.price,
			countInStock: data.countInStock,
			quantity
		};
	}
);

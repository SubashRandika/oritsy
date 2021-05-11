import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk(
	'users/login',
	async ({ email, password }, { rejectWithValue }) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		try {
			const { data } = await axios.post(
				'/api/users/login',
				{
					email,
					password
				},
				config
			);

			return data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

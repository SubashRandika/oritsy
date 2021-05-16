import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { logout } from '../slices/userLoginSlice';

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

export const register = createAsyncThunk(
	'users/register',
	async ({ name, email, password }, { rejectWithValue, dispatch }) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		try {
			const { data } = await axios.post(
				'/api/users',
				{
					name,
					email,
					password
				},
				config
			);

			dispatch(login({ email, password }));

			return data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const getUserDetails = createAsyncThunk(
	'users/profile',
	async ({ id }, { rejectWithValue, getState, dispatch }) => {
		const {
			userLogin: { userInfo }
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`
			}
		};

		try {
			const { data } = await axios.get(`/api/users/${id}`, config);

			return data;
		} catch (error) {
			const { message } = error.response.data;

			if (message === 'Not authorized, Token verification failed') {
				dispatch(logout());
			}

			return rejectWithValue({ message });
		}
	}
);

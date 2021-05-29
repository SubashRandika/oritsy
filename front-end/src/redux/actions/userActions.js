import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

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
	async ({ id }, { rejectWithValue, getState }) => {
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
			return rejectWithValue(error.response.data);
		}
	}
);

export const updateUserProfile = createAsyncThunk(
	'users/profile/update',
	async (user, { rejectWithValue, getState }) => {
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
				'/api/users/profile',
				{ ...user },
				config
			);

			toast('Your profile has been successfully updated', tostSuccessOptions);

			return data;
		} catch (error) {
			const { message } = error.response.data;

			toast(message, tostErrorOptions);

			return rejectWithValue({ message });
		}
	}
);

export const listUsers = createAsyncThunk(
	'users/list',
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
			const { data } = await axios.get('/api/users', config);

			return data;
		} catch (error) {
			const { message } = error.response.data;

			toast(message, tostErrorOptions);

			return rejectWithValue({ message });
		}
	}
);

export const deleteUser = createAsyncThunk(
	'users/delete',
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
			const { data } = await axios.delete(`/api/users/${id}`, config);

			return data;
		} catch (error) {
			const { message } = error.response.data;

			toast(message, tostErrorOptions);

			return rejectWithValue({ message });
		}
	}
);

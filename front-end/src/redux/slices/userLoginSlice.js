import { createSlice } from '@reduxjs/toolkit';
import { login } from '../actions/userActions';

const initialState = {};

const userLoginSlice = createSlice({
	name: 'userLogin',
	initialState,
	reducers: {
		logout: (state, { payload }) => {
			localStorage.removeItem('userInfo');
			state.userInfo = null;
			payload.push('/');
		}
	},
	extraReducers: {
		[login.pending]: (state) => {
			state.loading = true;
		},
		[login.fulfilled]: (state, { payload }) => {
			state.userInfo = payload;
			state.loading = false;
			state.error = null;
			localStorage.setItem('userInfo', JSON.stringify(payload));
		},
		[login.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload?.message;
		}
	}
});

export const userLoginSelector = (state) => state.userLogin;

export const { logout } = userLoginSlice.actions;

export default userLoginSlice.reducer;

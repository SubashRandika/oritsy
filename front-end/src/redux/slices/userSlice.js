import { createSlice } from '@reduxjs/toolkit';
import { login } from '../actions/userActions';

const initialState = {};

const userSlice = createSlice({
	name: 'user',
	initialState,
	extraReducers: {
		[login.pending]: (state) => {
			state.loading = true;
		},
		[login.fulfilled]: (state, { payload }) => {
			state.userInfo = payload;
			state.loading = false;
			localStorage.setItem('userInfo', JSON.stringify(payload));
		},
		[login.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload.message;
		}
	}
});

export const userSelector = (state) => state.userInfo;

export default userSlice.reducer;

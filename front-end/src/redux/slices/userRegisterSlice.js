import { createSlice } from '@reduxjs/toolkit';
import { register } from '../actions/userActions';

const initialState = {};

const userRegisterSlice = createSlice({
	name: 'userRegister',
	initialState,
	extraReducers: {
		[register.pending]: (state) => {
			state.loading = true;
		},
		[register.fulfilled]: (state, { payload }) => {
			state.userInfo = payload;
			state.loading = false;
			state.error = null;
			localStorage.setItem('userInfo', JSON.stringify(payload));
		},
		[register.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload.message;
		}
	}
});

export const userRegisterSelector = (state) => state.userRegister;

export default userRegisterSlice.reducer;

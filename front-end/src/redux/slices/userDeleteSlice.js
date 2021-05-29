import { createSlice } from '@reduxjs/toolkit';
import { deleteUser } from '../actions/userActions';

const initialState = {};

const userDeleteSlice = createSlice({
	name: 'userDelete',
	initialState,
	extraReducers: {
		[deleteUser.pending]: (state) => {
			state.loading = true;
		},
		[deleteUser.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.success = true;
		},
		[deleteUser.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload?.message;
		}
	}
});

export const userDeleteSelector = (state) => state.userDelete;

export default userDeleteSlice.reducer;

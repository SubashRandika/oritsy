import { createSlice } from '@reduxjs/toolkit';
import { listUsers } from '../actions/userActions';

const initialState = {
	users: []
};

const userListSlice = createSlice({
	name: 'userList',
	initialState,
	extraReducers: {
		[listUsers.pending]: (state) => {
			state.loading = true;
		},
		[listUsers.fulfilled]: (state, { payload }) => {
			state.users = payload;
			state.loading = false;
		},
		[listUsers.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload?.message;
		}
	}
});

export const userListSelector = (state) => state.userList;

export default userListSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { updateUser } from '../actions/userActions';

const initialState = {
	user: {}
};

const userUpdateSlice = createSlice({
	name: 'userRegister',
	initialState,
	reducers: {
		resetUserUpdate: (state) => initialState
	},
	extraReducers: {
		[updateUser.pending]: (state) => {
			state.loading = true;
		},
		[updateUser.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.success = true;
		},
		[updateUser.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload?.message;
		}
	}
});

export const userUpdateSelector = (state) => state.userUpdate;

export const { resetUserUpdate } = userUpdateSlice.actions;

export default userUpdateSlice.reducer;

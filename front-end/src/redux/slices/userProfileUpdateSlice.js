import { createSlice } from '@reduxjs/toolkit';
import { updateUserProfile } from '../actions/userActions';

const initialState = {};

const userProfileUpdateSlice = createSlice({
	name: 'userProfileUpdate',
	initialState,
	extraReducers: {
		[updateUserProfile.pending]: (state) => {
			state.loading = true;
		},
		[updateUserProfile.fulfilled]: (state, { payload }) => {
			state.userInfo = payload;
			state.loading = false;
			state.error = null;
			state.success = true;
		},
		[updateUserProfile.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload?.message;
		}
	}
});

export const userProfileUpdateSelector = (state) => state.userProfileUpdate;

export default userProfileUpdateSlice.reducer;

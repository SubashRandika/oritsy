import { createSlice } from '@reduxjs/toolkit';
import { getUserDetails } from '../actions/userActions';

const initialState = {
	user: null,
	loading: false
};

const userDetailsSlice = createSlice({
	name: 'userDetails',
	initialState,
	extraReducers: {
		[getUserDetails.pending]: (state) => {
			state.loading = true;
		},
		[getUserDetails.fulfilled]: (state, { payload }) => {
			state.user = payload;
			state.loading = false;
		},
		[getUserDetails.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload?.message;
		}
	}
});

export const userDetailsSelector = (state) => state.userDetails;

export default userDetailsSlice.reducer;

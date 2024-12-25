import { createSlice } from '@reduxjs/toolkit';
import { getUsersData, putUserData } from './actions';
import { User as FireUser } from 'firebase/auth';
import { UserData, UserStatuses } from '@/@types/user';

interface UserState {
  user: FireUser | null;
  users: UserData[];
  status: UserStatuses;
  error: string | null;
}

// Define the initial state
const initialState: UserState = {
  user: null,
  users: [],
  status: 'idle',
  error: null as string | null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile(state, action) {
      state.user = action.payload as FireUser;
    },
    clearProfile(state) {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getUsersData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload as UserData[];
      })
      .addCase(getUsersData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(putUserData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(putUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log('debug putUserData:', { data: action.payload });
        // state.users = action.payload as User[];
      })
      .addCase(putUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  }
});

export const { setProfile, clearProfile } = userSlice.actions;
export default userSlice.reducer;

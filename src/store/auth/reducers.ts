import { createSlice } from '@reduxjs/toolkit';
import { userLogin } from './actions';

const token = localStorage ? localStorage.getItem('token') : null;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: token || null
  },
  reducers: {
    setToken(state, action) {
      const newToken = action.payload;
      localStorage.setItem('token', newToken);
      state.token = newToken;
    },
    clearToken(state) {
      state.token = null;
      localStorage.clear();
    }
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      // Save the token
      const newToken = action.payload;
      localStorage.setItem('token', newToken);
      state.token = newToken;
    });
  }
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;

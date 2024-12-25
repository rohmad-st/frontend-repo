import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  login as firebaseLogin,
  logout as firebaseLogout
} from '@/apis/firebase/auth';

export const userLogin = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }) => {
    const user = await firebaseLogin(credentials.email, credentials.password);
    // Replace with actual token fetching if needed
    const token = await user.getIdToken();
    return token;
  }
);

export const userLogout = createAsyncThunk('auth/logout', async () => {
  return await firebaseLogout();
});

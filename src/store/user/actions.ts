import { fetchUserData, fetchUsersData, updateUserData } from '@/apis/user';
import { createAsyncThunk } from '@reduxjs/toolkit';

// get list of users
export const getUsersData = createAsyncThunk(
  'user/getUsersData',
  fetchUsersData
);
// update user
export const putUserData = createAsyncThunk(
  'user/updateUserData',
  updateUserData
);

// get single user by id
export const getUserData = createAsyncThunk('user/getUserData', fetchUserData);

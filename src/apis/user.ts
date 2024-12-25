import { UserData } from '@/@types/user';
import apiClient from './apiClient';

export const fetchUsersData = async () => {
  const response = await apiClient.get('api/fetch-user-data');
  return response;
};

export const updateUserData = async (payload: UserData) => {
  const { _id: id, ...data } = payload;
  const response = await apiClient.put('api/update-user-data', {
    id,
    data
  });
  return response;
};

export const fetchUserData = async (id: string) => {
  const response = await apiClient.get(`api/fetch-user-data/${id}`);
  return response;
};

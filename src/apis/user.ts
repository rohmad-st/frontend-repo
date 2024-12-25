import { UserData } from '@/@types/user';
import apiClient from './apiClient';

export const fetchUsersData = async () => {
  const response = apiClient.get('api/fetch-user-data');
  return response;
};

export const updateUserData = async (payload: UserData) => {
  const { _id: id, ...data } = payload;
  const response = apiClient.put('api/update-user-data', {
    id,
    data
  });
  return response;
};

export const fetchUserData = async (id: string) => {
  const response = apiClient.get(`api/fetch-user-data/${id}`);
  return response;
};

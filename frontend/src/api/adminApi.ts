import api from './axiosInstance';
import type { UserProfile, UserListItem } from '../types/profile';

export const getUsers = () =>
  api.get<UserListItem[]>('/api/admin/users');

export const getUserCard = (userId: string) =>
  api.get<UserProfile>(`/api/admin/users/${userId}`);

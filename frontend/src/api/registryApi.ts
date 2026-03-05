import api from './axiosInstance';
import type { UserProfile, AddRatingRequest } from '../types/profile';

export const searchSpecialists = (query?: string) => {
  const params = query ? { query } : {};
  return api.get<UserProfile[]>('/api/registry/specialists', { params });
};

export const getSpecialist = (userId: string) => {
  return api.get<UserProfile>(`/api/registry/specialists/${userId}`);
};

export const addRating = (userId: string, data: AddRatingRequest) => {
  return api.post(`/api/registry/specialists/${userId}/rating`, data);
};

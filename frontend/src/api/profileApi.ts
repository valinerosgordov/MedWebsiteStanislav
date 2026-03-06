import api from './axiosInstance';
import type { UserProfile, UpdateProfileRequest, EducationEntry, AddEducationRequest } from '../types/profile';

export const getProfile = () =>
  api.get<UserProfile>('/api/profile');

export const updateProfile = (data: UpdateProfileRequest) =>
  api.put<UserProfile>('/api/profile', data);

export const uploadPhoto = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post<{ photoUrl: string }>('/api/profile/photo', formData);
};

export const addEducation = (data: AddEducationRequest) =>
  api.post<EducationEntry>('/api/profile/education', data);

export const deleteEducation = (id: string) =>
  api.delete(`/api/profile/education/${id}`);

export const uploadDiploma = (educationId: string, file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post<{ diplomaUrl: string }>(`/api/profile/education/${educationId}/diploma`, formData);
};

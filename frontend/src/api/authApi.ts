import api from './axiosInstance';
import type { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth';

export const login = (data: LoginRequest) =>
  api.post<AuthResponse>('/api/auth/login', data);

export const register = (data: RegisterRequest) =>
  api.post<AuthResponse>('/api/auth/register', data);

export const forgotPassword = (email: string) =>
  api.post<{ message: string }>('/api/auth/forgot-password', { email });

export const resetPassword = (email: string, token: string, newPassword: string) =>
  api.post<{ message: string }>('/api/auth/reset-password', { email, token, newPassword });

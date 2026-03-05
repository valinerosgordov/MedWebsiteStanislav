import api from './axiosInstance';
import type { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth';

export const login = (data: LoginRequest) =>
  api.post<AuthResponse>('/api/auth/login', data);

export const register = (data: RegisterRequest) =>
  api.post<AuthResponse>('/api/auth/register', data);

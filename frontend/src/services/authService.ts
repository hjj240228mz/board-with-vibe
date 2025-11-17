import api from '../utils/api';
import { SignupRequest, LoginRequest, AuthResponse } from '../types/user';

export const authService = {
  signup: async (data: SignupRequest): Promise<void> => {
    await api.post('/auth/signup', data);
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },
};

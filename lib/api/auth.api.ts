import { AxiosError } from 'axios';
import { axiosInstance } from '@/lib/axios';
import { RegisterDto } from '@/lib/schemas/auth.schema';
import type { User } from '@/components/providers/auth-provider';

interface ApiError {
  code: number;
  message: string;
}

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
  timestamp?: string;
}

export const authApi = {
  register: async (data: RegisterDto): Promise<ApiResponse<User>> => {
    try {
      const response = await axiosInstance.post<ApiResponse<User>>('/auth/register', data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError.response?.data?.error?.message || 'Registration failed';
      throw new Error(errorMessage);
    }
  },

  login: async (email: string, password: string): Promise<ApiResponse<User>> => {
    try {
      const response = await axiosInstance.post<ApiResponse<User>>('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError.response?.data?.error?.message || 'Login failed';
      throw new Error(errorMessage);
    }
  },

  // Get current user info
  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    try {
      const response = await axiosInstance.get<ApiResponse<User>>('/auth/me');
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError.response?.data?.error?.message || 'Failed to get user info';
      throw new Error(errorMessage);
    }
  },

  // Logout - server will clear HttpOnly cookies
  logout: async (): Promise<void> => {
    try {
      await axiosInstance.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    }
  },
};

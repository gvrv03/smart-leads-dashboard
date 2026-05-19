import apiClient from './axios';
import { ILoginDTO, IRegisterDTO, IAuthResponse, IUser } from '@/types/auth.types';
import { ApiSuccessResponse } from '@/types/api.types';

export const loginApi = async (data: ILoginDTO): Promise<IAuthResponse> => {
  const response = await apiClient.post<ApiSuccessResponse<IAuthResponse>>('/auth/login', data);
  return response.data.data;
};

export const registerApi = async (data: IRegisterDTO): Promise<IAuthResponse> => {
  const response = await apiClient.post<ApiSuccessResponse<IAuthResponse>>('/auth/register', data);
  return response.data.data;
};

export const getMeApi = async (): Promise<IUser> => {
  const response = await apiClient.get<ApiSuccessResponse<IUser>>('/auth/me');
  return response.data.data;
};

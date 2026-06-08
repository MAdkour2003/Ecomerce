import axios from 'axios';

export interface AuthUser {
  id: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

const authApi = axios.create({ timeout: 10000 });

export const login = (email: string, password: string): Promise<AuthResponse> =>
  authApi.post<AuthResponse>('/api/users/login', { email, password }).then((r) => r.data);

export const signup = (email: string, password: string): Promise<AuthResponse> =>
  authApi.post<AuthResponse>('/api/users/signup', { email, password }).then((r) => r.data);

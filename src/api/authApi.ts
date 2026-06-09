import api from './api';

export interface AuthUser {
  id: number;
  username: string;
  email: string;
}

export const login = (username: string, password: string): Promise<{ token: string }> =>
  api.post<{ token: string }>('/auth/login', { username, password }).then((r) => r.data);

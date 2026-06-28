import api from './api';

export interface DummyUser {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  image: string;
}

export type CreateUserPayload = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  phone?: string;
  image?: string;
};

export const addUser = (payload: CreateUserPayload): Promise<DummyUser> =>
  api.post<DummyUser>('/users/add', payload).then((r) => r.data);

export const getUserById = (id: number): Promise<DummyUser> =>
  api.get<DummyUser>(`/users/${id}`).then((r) => r.data);

export const updateUser = (
  id: number,
  payload: Partial<CreateUserPayload>
): Promise<DummyUser> =>
  api.put<DummyUser>(`/users/${id}`, payload).then((r) => r.data);

export const deleteUser = (id: number): Promise<DummyUser> =>
  api.delete<DummyUser>(`/users/${id}`).then((r) => r.data);

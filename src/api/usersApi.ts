import api from './api';

export interface FakeStoreUser {
  id: number;
  username: string;
  email: string;
  password: string;
  name: { firstname: string; lastname: string };
  phone: string;
}

export type CreateUserPayload = {
  username: string;
  email: string;
  password: string;
  name?: { firstname: string; lastname: string };
};

export const addUser = (payload: CreateUserPayload): Promise<FakeStoreUser> =>
  api.post<FakeStoreUser>('/users', payload).then((r) => r.data);

export const getUserById = (id: number): Promise<FakeStoreUser> =>
  api.get<FakeStoreUser>(`/users/${id}`).then((r) => r.data);

export const updateUser = (
  id: number,
  payload: Partial<CreateUserPayload>
): Promise<FakeStoreUser> =>
  api.put<FakeStoreUser>(`/users/${id}`, payload).then((r) => r.data);

export const deleteUser = (id: number): Promise<FakeStoreUser> =>
  api.delete<FakeStoreUser>(`/users/${id}`).then((r) => r.data);

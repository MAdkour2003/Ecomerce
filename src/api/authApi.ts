import type { AuthUser } from '../store/authStore';

interface LocalUser {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
}

const USERS_KEY = 'local-users';

const getLocalUsers = (): LocalUser[] => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? '[]');
  } catch {
    return [];
  }
};

const hashPassword = async (password: string): Promise<string> => {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

export const isUsernameTaken = (username: string): boolean =>
  getLocalUsers().some((u) => u.username === username);

export const saveLocalUser = async (
  id: number,
  username: string,
  email: string,
  password: string
): Promise<void> => {
  const users = getLocalUsers();
  if (users.find((u) => u.username === username)) throw new Error('Username already taken');
  const passwordHash = await hashPassword(password);
  users.push({ id, username, email, passwordHash });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const updateLocalUser = async (
  oldUsername: string,
  newUsername: string,
  newPassword?: string
): Promise<void> => {
  const users = getLocalUsers();
  const idx = users.findIndex((u) => u.username === oldUsername);
  if (idx === -1) throw new Error('User not found');
  const passwordHash = newPassword
    ? await hashPassword(newPassword)
    : users[idx].passwordHash;
  users[idx] = { ...users[idx], username: newUsername, passwordHash };
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const login = async (
  username: string,
  password: string
): Promise<{ token: string; user: AuthUser }> => {
  const passwordHash = await hashPassword(password);
  const found = getLocalUsers().find(
    (u) => u.username === username && u.passwordHash === passwordHash
  );
  if (!found) return Promise.reject(new Error('Invalid username or password'));
  return {
    token: crypto.randomUUID(),
    user: { id: found.id, username: found.username, email: found.email },
  };
};

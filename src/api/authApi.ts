export interface AuthUser {
  id: number;
  username: string;
  email: string;
}

interface LocalUser {
  username: string;
  password: string;
}

const USERS_KEY = 'local-users';

const getLocalUsers = (): LocalUser[] => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? '[]');
  } catch {
    return [];
  }
};

export const saveLocalUser = (username: string, password: string): void => {
  const users = getLocalUsers();
  if (users.find((u) => u.username === username)) return;
  users.push({ username, password });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const makeToken = (username: string): string =>
  btoa(JSON.stringify({ sub: username, iat: Date.now() }));

export const login = (username: string, password: string): Promise<{ token: string }> => {
  const user = getLocalUsers().find(
    (u) => u.username === username && u.password === password
  );
  if (!user) return Promise.reject(new Error('Invalid username or password'));
  return Promise.resolve({ token: makeToken(username) });
};

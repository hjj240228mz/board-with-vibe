const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_info';

export const saveToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const saveUser = (username: string, nickname: string): void => {
  localStorage.setItem(USER_KEY, JSON.stringify({ username, nickname }));
};

export const getUser = (): { username: string; nickname: string } | null => {
  const userStr = localStorage.getItem(USER_KEY);
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

const USER_KEY = 'eduportal_session';

export const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY));
  } catch {
    return null;
  }
};

export const storeUser = (user) => localStorage.setItem(USER_KEY, JSON.stringify(user));

export const clearUser = () => localStorage.removeItem(USER_KEY);
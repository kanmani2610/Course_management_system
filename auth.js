import { registerUser, loginUser } from './api.js';
import { getState, setUser, setSelectedCourse } from './state.js';

export const isLoggedIn = () => Boolean(getState().user);

export const currentUser = () => getState().user;

export const register = (data) => registerUser(data);

export async function login(email, password) {
  const user = await loginUser(email, password);
  setUser(user);
  return user;
}

export function logout() {
  setUser(null);
  setSelectedCourse(null);
}

export function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

export function redirectIfLoggedIn() {
  if (isLoggedIn()) {
    window.location.href = 'dashboard.html';
    return true;
  }
  return false;
}

const USERS_KEY = 'eduportal_users';
const USER_KEY = 'eduportal_user';

const wait = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

const readUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
};

const sanitize = ({ password, ...user }) => user;

export const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY));
  } catch {
    return null;
  }
};

export const storeUser = (user) => localStorage.setItem(USER_KEY, JSON.stringify(user));

export const clearUser = () => localStorage.removeItem(USER_KEY);

export async function registerUser(data) {
  await wait();
  const users = readUsers();
  const email = data.email.trim().toLowerCase();
  if (users.some((u) => u.email === email)) {
    throw new Error('An account with this email already exists');
  }
  const user = {
    id: Date.now(),
    name: data.name.trim(),
    email,
    phone: data.phone.trim(),
    department: data.department,
    year: data.year,
    password: data.password,
    enrolled: []
  };
  localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]));
  return sanitize(user);
}

export async function loginUser(email, password) {
  await wait();
  const user = readUsers().find(
    (u) => u.email === email.trim().toLowerCase() && u.password === password
  );
  if (!user) {
    throw new Error('Invalid email or password');
  }
  return sanitize(user);
}

export async function enrollInCourse(userId, courseId) {
  await wait(200);
  const users = readUsers();
  const user = users.find((u) => u.id === userId);
  if (!user) {
    throw new Error('User not found');
  }
  if (user.enrolled.includes(courseId)) {
    throw new Error('You are already enrolled in this course');
  }
  user.enrolled.push(courseId);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return sanitize(user);
}
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  timeout: 8000
});

const stripPassword = ({ password, ...user }) => user;

export const getErrorMessage = (error) => {
  if (error.response) return error.response.data?.message || error.message;
  if (error.request) return 'Cannot reach the server. Start the mock API with "npm run api".';
  return error.message;
};

export const fetchCourses = async () => (await api.get('/courses')).data;

export const fetchEnrollments = async (studentId) =>
  (await api.get('/enrollments', { params: { studentId } })).data;

export const registerStudent = async (data) => {
  const email = data.email.trim().toLowerCase();
  const { data: existing } = await api.get('/users', { params: { email } });
  if (existing.length) throw new Error('An account with this email already exists');
  const { data: created } = await api.post('/users', {
    name: data.name.trim(),
    email,
    phone: data.phone.trim(),
    department: data.department,
    year: data.year,
    password: data.password,
    role: 'student'
  });
  return stripPassword(created);
};

export const loginStudent = async (email, password) => {
  const { data } = await api.get('/users', {
    params: { email: email.trim().toLowerCase(), password }
  });
  if (!data.length) throw new Error('Invalid email or password');
  return stripPassword(data[0]);
};

export const enrollStudent = async (studentId, courseId) => {
  const { data: existing } = await api.get('/enrollments', { params: { studentId, courseId } });
  if (existing.length) throw new Error('You are already enrolled in this course');
  const { data } = await api.post('/enrollments', {
    studentId,
    courseId,
    date: new Date().toISOString(),
    status: 'Enrolled'
  });
  return data;
};

export default api;
const USERS_KEY = 'eduportal_users';

const COURSES = [
  { id: 1, title: 'Full Stack Web Development', description: 'Build complete web apps with HTML, CSS, JavaScript, React, Node.js and MongoDB.', duration: '16 Weeks', level: 'Intermediate', instructor: 'Dr. Anitha Raj' },
  { id: 2, title: 'Python for Data Science', description: 'Learn Python, NumPy, Pandas and visualization to analyse real-world datasets.', duration: '10 Weeks', level: 'Beginner', instructor: 'Prof. Karthik S' },
  { id: 3, title: 'Machine Learning Foundations', description: 'Supervised and unsupervised learning, model evaluation and deployment basics.', duration: '12 Weeks', level: 'Intermediate', instructor: 'Dr. Meera Nair' },
  { id: 4, title: 'Data Structures & Algorithms', description: 'Master arrays, trees, graphs and dynamic programming for interviews.', duration: '14 Weeks', level: 'Advanced', instructor: 'Prof. Rahul V' },
  { id: 5, title: 'UI/UX Design Essentials', description: 'Design thinking, wireframing and prototyping for modern interfaces.', duration: '8 Weeks', level: 'Beginner', instructor: 'Ms. Divya P' },
  { id: 6, title: 'Cloud Computing Basics', description: 'Core cloud concepts, virtual machines, storage and serverless deployment.', duration: '9 Weeks', level: 'Beginner', instructor: 'Mr. Suresh K' }
];

const wait = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

const readUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
};

const writeUsers = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users));

const sanitize = ({ password, ...user }) => user;

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
  users.push(user);
  writeUsers(users);
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

export async function fetchCourses() {
  await wait(200);
  return COURSES.map((c) => ({ ...c }));
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
  writeUsers(users);
  return sanitize(user);
}

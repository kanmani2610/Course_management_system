const USER_KEY = 'eduportal_user';
const COURSE_KEY = 'eduportal_selected_course';

const read = (storage, key) => {
  try {
    return JSON.parse(storage.getItem(key));
  } catch {
    return null;
  }
};

const state = {
  user: read(localStorage, USER_KEY),
  selectedCourse: read(sessionStorage, COURSE_KEY)
};

const listeners = new Set();

const notify = () => listeners.forEach((fn) => fn({ ...state }));

export const getState = () => ({ ...state });

export const subscribe = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

export const setUser = (user) => {
  state.user = user;
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_KEY);
  }
  notify();
};

export const setSelectedCourse = (course) => {
  state.selectedCourse = course;
  if (course) {
    sessionStorage.setItem(COURSE_KEY, JSON.stringify(course));
  } else {
    sessionStorage.removeItem(COURSE_KEY);
  }
  notify();
};

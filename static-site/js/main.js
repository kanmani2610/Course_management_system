import { getState, subscribe, setUser, setSelectedCourse } from './state.js';
import { login, register, logout, requireAuth, redirectIfLoggedIn } from './auth.js';
import { validateField, validateForm } from './validation.js';
import { fetchCourses, enrollInCourse } from './api.js';
import * as ui from './ui.js';

const formValues = (form) => Object.fromEntries(new FormData(form).entries());

const hasState = (input) => {
  const group = input.closest('.form-group');
  return group.classList.contains('valid') || group.classList.contains('invalid');
};

const bindLiveValidation = (form, mode) => {
  const check = (input) =>
    ui.setFieldState(input, validateField(mode, input.name, input.value, formValues(form)));

  form.querySelectorAll('input, select').forEach((input) => {
    input.addEventListener('blur', () => check(input));
    input.addEventListener('input', () => {
      if (hasState(input)) check(input);
      if (input.name === 'password') {
        const confirm = form.querySelector('[name="confirmPassword"]');
        if (confirm && hasState(confirm)) check(confirm);
      }
    });
    input.addEventListener('change', () => check(input));
  });
};

const setupForm = (form, mode, onValid) => {
  const alertBox = form.querySelector('.alert');
  const button = form.querySelector('button[type="submit"]');
  bindLiveValidation(form, mode);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    ui.hideAlert(alertBox);

    const values = formValues(form);
    const errors = validateForm(mode, values);

    form.querySelectorAll('input, select').forEach((input) => {
      ui.setFieldState(input, errors[input.name] || '');
    });

    if (Object.keys(errors).length) {
      ui.showAlert(alertBox, 'Please fix the highlighted fields and try again.');
      const firstInvalid = form.querySelector('.invalid input, .invalid select');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    ui.setLoading(button, true);
    try {
      await onValid(values, alertBox);
    } catch (error) {
      ui.showAlert(alertBox, error.message);
      ui.setLoading(button, false);
    }
  });
};

const initLogin = () => {
  if (redirectIfLoggedIn()) return;
  const form = document.getElementById('loginForm');
  setupForm(form, 'login', async (values, alertBox) => {
    await login(values.email, values.password);
    ui.showAlert(alertBox, 'Login successful! Redirecting to your dashboard...', 'success');
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 700);
  });
};

const initRegister = () => {
  if (redirectIfLoggedIn()) return;
  const form = document.getElementById('registerForm');
  setupForm(form, 'register', async (values, alertBox) => {
    await register(values);
    ui.showAlert(alertBox, 'Registration successful! Redirecting to login...', 'success');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 900);
  });
};

const initDashboard = async () => {
  if (!requireAuth()) return;

  const info = document.getElementById('studentInfo');
  const stats = document.getElementById('stats');
  const grid = document.getElementById('courseGrid');
  const table = document.getElementById('enrolledTable');
  const alertBox = document.getElementById('dashAlert');
  const welcome = document.getElementById('welcome');

  grid.innerHTML = '<p class="muted">Loading courses...</p>';

  let courses = [];
  try {
    courses = await fetchCourses();
  } catch (error) {
    ui.showAlert(alertBox, error.message);
    return;
  }

  const render = () => {
    const { user, selectedCourse } = getState();
    welcome.textContent = `Welcome back, ${user.name.split(' ')[0]}`;
    ui.renderStudentInfo(info, user);
    ui.renderStats(stats, courses.length, user.enrolled.length);
    ui.renderCourseCards(grid, courses, user.enrolled, selectedCourse ? selectedCourse.id : null, handleEnroll);
    ui.renderEnrolledTable(table, courses, user.enrolled);
  };

  async function handleEnroll(course) {
    setSelectedCourse(course);
    try {
      const updated = await enrollInCourse(getState().user.id, course.id);
      setUser(updated);
      ui.showAlert(alertBox, `You have enrolled in ${course.title}`, 'success');
    } catch (error) {
      ui.showAlert(alertBox, error.message);
    }
    render();
  }

  render();
};

const init = () => {
  ui.updateNav();
  ui.setupNavToggle();
  subscribe(ui.updateNav);

  document.querySelectorAll('[data-logout]').forEach((button) => {
    button.addEventListener('click', () => {
      logout();
      window.location.href = 'index.html';
    });
  });

  const page = document.body.dataset.page;
  if (page === 'login') initLogin();
  if (page === 'register') initRegister();
  if (page === 'dashboard') initDashboard();
};

init();

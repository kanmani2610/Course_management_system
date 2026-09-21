import { getState } from './state.js';

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));

export function updateNav() {
  const loggedIn = Boolean(getState().user);
  document.querySelectorAll('[data-auth="user"]').forEach((el) => {
    el.hidden = !loggedIn;
  });
  document.querySelectorAll('[data-auth="guest"]').forEach((el) => {
    el.hidden = loggedIn;
  });
}

export function setupNavToggle() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

export function setFieldState(input, message) {
  const group = input.closest('.form-group');
  const note = group.querySelector('.field-msg');
  group.classList.remove('valid', 'invalid');
  if (message) {
    group.classList.add('invalid');
    note.textContent = message;
  } else {
    group.classList.add('valid');
    note.textContent = 'Looks good';
  }
}

export function showAlert(box, message, type = 'error') {
  box.textContent = message;
  box.className = `alert alert-${type}`;
  box.hidden = false;
}

export function hideAlert(box) {
  box.hidden = true;
  box.textContent = '';
}

export function setLoading(button, loading) {
  if (loading) {
    button.dataset.label = button.textContent;
    button.textContent = 'Please wait...';
  } else if (button.dataset.label) {
    button.textContent = button.dataset.label;
  }
  button.disabled = loading;
}

export function renderStudentInfo(container, user) {
  container.innerHTML = `
    <div class="avatar">${escapeHtml(user.name.charAt(0).toUpperCase())}</div>
    <h2>${escapeHtml(user.name)}</h2>
    <p class="muted">${escapeHtml(user.email)}</p>
    <ul class="info-list">
      <li><span>Phone</span><strong>${escapeHtml(user.phone)}</strong></li>
      <li><span>Department</span><strong>${escapeHtml(user.department)}</strong></li>
      <li><span>Year</span><strong>${escapeHtml(user.year)}</strong></li>
      <li><span>Enrolled</span><strong>${user.enrolled.length}</strong></li>
    </ul>
  `;
}

export function renderStats(container, total, enrolled) {
  container.innerHTML = `
    <div class="stat"><strong>${total}</strong><span>Available Courses</span></div>
    <div class="stat"><strong>${enrolled}</strong><span>Enrolled</span></div>
    <div class="stat"><strong>${total - enrolled}</strong><span>Remaining</span></div>
  `;
}

export function renderCourseCards(container, courses, enrolledIds, selectedId, onEnroll) {
  container.innerHTML = courses
    .map((course) => {
      const enrolled = enrolledIds.includes(course.id);
      return `
        <article class="card course-card${course.id === selectedId ? ' selected' : ''}">
          <span class="badge">${escapeHtml(course.level)}</span>
          <h3>${escapeHtml(course.title)}</h3>
          <p>${escapeHtml(course.description)}</p>
          <div class="course-meta">
            <span class="badge">${escapeHtml(course.duration)}</span>
            <span class="badge">${escapeHtml(course.instructor)}</span>
          </div>
          <button type="button" class="btn btn-small${enrolled ? ' btn-outline' : ''}" data-course-id="${course.id}" ${enrolled ? 'disabled' : ''}>
            ${enrolled ? 'Enrolled' : 'Enroll Now'}
          </button>
        </article>
      `;
    })
    .join('');

  container.querySelectorAll('button[data-course-id]').forEach((button) => {
    button.addEventListener('click', () => {
      const course = courses.find((c) => c.id === Number(button.dataset.courseId));
      onEnroll(course);
    });
  });
}

export function renderEnrolledTable(container, courses, enrolledIds) {
  const rows = courses.filter((c) => enrolledIds.includes(c.id));
  if (!rows.length) {
    container.innerHTML = '<p class="empty">You have not enrolled in any course yet.</p>';
    return;
  }
  container.innerHTML = `
    <table>
      <thead>
        <tr><th>#</th><th>Course</th><th>Duration</th><th>Instructor</th><th>Status</th></tr>
      </thead>
      <tbody>
        ${rows
          .map(
            (c, i) => `
          <tr>
            <td>${i + 1}</td>
            <td>${escapeHtml(c.title)}</td>
            <td>${escapeHtml(c.duration)}</td>
            <td>${escapeHtml(c.instructor)}</td>
            <td><span class="badge success">Enrolled</span></td>
          </tr>`
          )
          .join('')}
      </tbody>
    </table>
  `;
}

import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function buildCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startOffset; i += 1) cells.push(null);
  for (let d = 1; d <= daysInMonth; d += 1) cells.push(d);
  return cells;
}

export default function RightPanel() {
  const { user } = useAuth();
  const { enrolledCourses } = useCourses();
  const today = new Date();
  const cells = buildCalendar(today);
  const monthLabel = today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <aside className="right-panel">
      <div className="profile-card">
        <div className="profile-avatar">{user.name.charAt(0).toUpperCase()}</div>
        <h3>{user.name}</h3>
        <p>Student</p>
        <button type="button" className="btn btn-small btn-outline">Profile</button>
      </div>
      <div className="calendar-widget">
        <div className="calendar-head">{monthLabel}</div>
        <div className="calendar-grid">
          {WEEKDAYS.map((day) => (
            <span key={day} className="calendar-weekday">{day}</span>
          ))}
          {cells.map((day, index) => (
            <span
              key={index}
              className={`calendar-day${day === today.getDate() ? ' today' : ''}${day ? '' : ' empty'}`}
            >
              {day || ''}
            </span>
          ))}
        </div>
      </div>
      <div className="reminders">
        <h4>Reminders</h4>
        {enrolledCourses.length === 0 && <p className="muted">No enrollments yet.</p>}
        {enrolledCourses.slice(0, 4).map((item) => (
          <div className="reminder-item" key={item.id}>
            <span>🔔</span>
            <div>
              <strong>{item.course.title}</strong>
              <p>{new Date(item.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
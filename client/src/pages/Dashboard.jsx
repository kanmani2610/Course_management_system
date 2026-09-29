import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import RightPanel from '../components/RightPanel';
import Alert from '../components/Alert';
import EnrollButton from '../components/EnrollButton';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';

const CARD_THEMES = ['card-theme-blue', 'card-theme-purple', 'card-theme-pink', 'card-theme-teal'];

export default function Dashboard() {
  const { user } = useAuth();
  const { courses, enrolledCourses, loading, error, reload } = useCourses();
  const [search, setSearch] = useState('');

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  const today = new Date().toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    weekday: 'long'
  });

  return (
    <div className="dashboard-shell">
      <Sidebar />
      <main className="main-panel">
        <div className="main-topbar">
          <div className="search-box">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search courses"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <span className="today-label">{today}</span>
        </div>

        <section className="welcome-card">
          <div>
            <h1>Welcome back, {user.name.split(' ')[0]}!</h1>
            <p>You have {enrolledCourses.length} active enrollments out of {courses.length} available courses.</p>
          </div>
          <div className="welcome-stats">
            <div className="stat"><strong>{courses.length}</strong><span>Available</span></div>
            <div className="stat"><strong>{enrolledCourses.length}</strong><span>Enrolled</span></div>
          </div>
        </section>

        {error && (
          <>
            <Alert alert={{ type: 'error', message: error }} />
            <button type="button" className="btn btn-small" onClick={reload}>Retry</button>
          </>
        )}

        <div className="panel-heading">
          <h2>Classes</h2>
        </div>
        {loading ? (
          <p className="empty">Loading courses...</p>
        ) : (
          <div className="classes-grid">
            {filteredCourses.map((course, index) => (
              <article key={course.id} className={`class-card ${CARD_THEMES[index % CARD_THEMES.length]}`}>
                <span className="badge">{course.level}</span>
                <h3>{course.title}</h3>
                <p>{course.duration} · {course.instructor}</p>
                <EnrollButton courseId={course.id} />
              </article>
            ))}
          </div>
        )}

        <div className="panel-heading spaced">
          <h2>Lessons</h2>
        </div>
        <div className="table-wrap">
          {enrolledCourses.length === 0 ? (
            <p className="empty">You have not enrolled in any course yet.</p>
          ) : (
            <table>
              <thead>
                <tr><th>Course</th><th>Instructor</th><th>Duration</th><th>Enrolled On</th><th>Status</th></tr>
              </thead>
              <tbody>
                {enrolledCourses.map((item) => (
                  <tr key={item.id}>
                    <td>{item.course.title}</td>
                    <td>{item.course.instructor}</td>
                    <td>{item.course.duration}</td>
                    <td>{new Date(item.date).toLocaleDateString()}</td>
                    <td><span className="badge success">{item.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
      <RightPanel />
    </div>
  );
}
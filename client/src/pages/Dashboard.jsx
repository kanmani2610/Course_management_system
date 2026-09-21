import CourseCard from '../components/CourseCard';
import EnrollButton from '../components/EnrollButton';
import { courses } from '../data/courses';

export default function Dashboard({ user, onUpdate }) {
  const enrolledIds = user.enrolled || [];
  const enrolledCourses = courses.filter((course) => enrolledIds.includes(course.id));

  return (
    <main className="dashboard">
      <div className="container">
        <div className="dash-head">
          <h1>Welcome back, {user.name.split(' ')[0]}</h1>
          <p>Manage your profile and explore available courses.</p>
        </div>
        <div className="dash-layout">
          <aside className="card profile">
            <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
            <h2>{user.name}</h2>
            <p className="muted">{user.email}</p>
            <ul className="info-list">
              <li><span>Phone</span><strong>{user.phone}</strong></li>
              <li><span>Department</span><strong>{user.department}</strong></li>
              <li><span>Year</span><strong>{user.year}</strong></li>
              <li><span>Enrolled</span><strong>{enrolledCourses.length}</strong></li>
            </ul>
          </aside>
          <section>
            <div className="stats">
              <div className="stat"><strong>{courses.length}</strong><span>Available Courses</span></div>
              <div className="stat"><strong>{enrolledCourses.length}</strong><span>Enrolled</span></div>
              <div className="stat"><strong>{courses.length - enrolledCourses.length}</strong><span>Remaining</span></div>
            </div>
            <h2 className="panel-title">Available Courses</h2>
            <div className="course-grid">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course}>
                  <EnrollButton user={user} courseId={course.id} onUpdate={onUpdate} />
                </CourseCard>
              ))}
            </div>
            <h2 className="panel-title spaced">My Enrolled Courses</h2>
            <div className="table-wrap">
              {enrolledCourses.length === 0 ? (
                <p className="empty">You have not enrolled in any course yet.</p>
              ) : (
                <table>
                  <thead>
                    <tr><th>#</th><th>Course</th><th>Duration</th><th>Instructor</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    {enrolledCourses.map((course, index) => (
                      <tr key={course.id}>
                        <td>{index + 1}</td>
                        <td>{course.title}</td>
                        <td>{course.duration}</td>
                        <td>{course.instructor}</td>
                        <td><span className="badge success">Enrolled</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
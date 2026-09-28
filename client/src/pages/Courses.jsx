import CourseCard from '../components/CourseCard';
import EnrollButton from '../components/EnrollButton';
import Alert from '../components/Alert';
import { useCourses } from '../context/CourseContext';

export default function Courses() {
  const { courses, loading, error, reload } = useCourses();

  return (
    <main>
      <div className="container">
        <div className="page-head">
          <h1>Explore Courses</h1>
          <p>Pick a course and start learning today.</p>
        </div>
        <div className="page-body">
          {loading && <p className="empty">Loading courses...</p>}
          {error && (
            <>
              <Alert alert={{ type: 'error', message: error }} />
              <button type="button" className="btn btn-small" onClick={reload}>Retry</button>
            </>
          )}
          {!loading && !error && (
            <div className="course-grid">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course}>
                  <EnrollButton courseId={course.id} />
                </CourseCard>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
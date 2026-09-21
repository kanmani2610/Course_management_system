import CourseCard from '../components/CourseCard';
import EnrollButton from '../components/EnrollButton';
import { courses } from '../data/courses';

export default function Courses({ user, onUpdate }) {
  return (
    <main>
      <div className="container">
        <div className="page-head">
          <h1>Explore Courses</h1>
          <p>Pick a course and start learning today.</p>
        </div>
        <div className="page-body">
          <div className="course-grid">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course}>
                <EnrollButton user={user} courseId={course.id} onUpdate={onUpdate} />
              </CourseCard>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
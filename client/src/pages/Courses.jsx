import CourseCard from '../components/CourseCard';
import { courses } from '../data/courses';

export default function Courses() {
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
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

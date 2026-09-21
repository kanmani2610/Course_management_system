export default function CourseCard({ course, children }) {
  return (
    <article className="card course-card">
      <span className="badge">{course.level}</span>
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <div className="course-meta">
        <span className="badge">{course.duration}</span>
        <span className="badge">{course.instructor}</span>
      </div>
      {children}
    </article>
  );
}

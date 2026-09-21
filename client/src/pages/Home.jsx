import { Link } from 'react-router-dom';

const features = [
  { icon: '📝', title: 'Easy Registration', text: 'Create your student account in under a minute with instant validation.' },
  { icon: '📚', title: 'Course Catalog', text: 'Browse available courses with duration, level and instructor details.' },
  { icon: '🎯', title: 'One-Click Enrollment', text: 'Enroll in courses and track everything from your personal dashboard.' }
];

export default function Home({ user }) {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <h1>Learn Smarter with EduPortal</h1>
          <p>One place to register, explore courses, enroll instantly, and track your learning journey.</p>
          <div className="hero-actions">
            {user ? (
              <Link to="/dashboard" className="btn btn-light">Go to Dashboard</Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-light">Get Started</Link>
                <Link to="/login" className="btn btn-ghost-light">Login</Link>
              </>
            )}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2 className="section-title">Everything You Need</h2>
          <p className="section-sub">A simple, fast and secure portal built for students.</p>
          <div className="grid grid-3">
            {features.map((feature) => (
              <article className="card" key={feature.title}>
                <div className="icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { enrollInCourse } from '../utils/auth';

export default function EnrollButton({ user, courseId, onUpdate }) {
  const [loading, setLoading] = useState(false);

  if (!user) {
    return <Link to="/login" className="btn btn-small">Login to Enroll</Link>;
  }

  const enrolled = (user.enrolled || []).includes(courseId);

  const handleClick = async () => {
    setLoading(true);
    try {
      const updated = await enrollInCourse(user.id, courseId);
      onUpdate(updated);
    } catch (error) {
      window.alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      className={`btn btn-small${enrolled ? ' btn-outline' : ''}`}
      disabled={enrolled || loading}
      onClick={handleClick}
    >
      {enrolled ? 'Enrolled' : loading ? 'Please wait...' : 'Enroll Now'}
    </button>
  );
}
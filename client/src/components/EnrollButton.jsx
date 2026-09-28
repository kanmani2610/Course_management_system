import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';
import { getErrorMessage } from '../services/api';

export default function EnrollButton({ courseId }) {
  const { user } = useAuth();
  const { isEnrolled, enroll } = useCourses();
  const [loading, setLoading] = useState(false);

  if (!user) {
    return <Link to="/login" className="btn btn-small">Login to Enroll</Link>;
  }

  const enrolled = isEnrolled(courseId);

  const handleClick = async () => {
    setLoading(true);
    try {
      await enroll(courseId);
    } catch (error) {
      window.alert(getErrorMessage(error));
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
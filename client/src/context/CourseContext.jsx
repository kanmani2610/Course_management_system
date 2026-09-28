import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { enrollStudent, fetchCourses, fetchEnrollments, getErrorMessage } from '../services/api';
import { useAuth } from './AuthContext';

const CourseContext = createContext(null);

export function CourseProvider({ children }) {
  const { user } = useAuth();
  const userId = user?.id;
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCourses = useCallback(async () => {
    setLoading(true);
    try {
      setCourses(await fetchCourses());
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  useEffect(() => {
    if (!userId) {
      setEnrollments([]);
      return undefined;
    }
    let active = true;
    fetchEnrollments(userId)
      .then((data) => active && setEnrollments(data))
      .catch((err) => active && setError(getErrorMessage(err)));
    return () => {
      active = false;
    };
  }, [userId]);

  const enroll = useCallback(
    async (courseId) => {
      const created = await enrollStudent(userId, courseId);
      setEnrollments((prev) => [...prev, created]);
      return created;
    },
    [userId]
  );

  const isEnrolled = useCallback(
    (courseId) => enrollments.some((item) => item.courseId === courseId),
    [enrollments]
  );

  const enrolledCourses = useMemo(
    () =>
      enrollments
        .map((item) => ({ ...item, course: courses.find((c) => c.id === item.courseId) }))
        .filter((item) => item.course),
    [enrollments, courses]
  );

  const value = useMemo(
    () => ({ courses, enrollments, enrolledCourses, loading, error, reload: loadCourses, enroll, isEnrolled }),
    [courses, enrollments, enrolledCourses, loading, error, loadCourses, enroll, isEnrolled]
  );

  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
}

export const useCourses = () => useContext(CourseContext);
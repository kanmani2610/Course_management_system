const courseService = require("../services/course.service");

const getCourses = (req, res, next) => {
  try {
    const courses = courseService.getAllCourses();
    res.status(200).json({ success: true, count: courses.length, data: courses });
  } catch (err) {
    next(err);
  }
};

const getCourse = (req, res, next) => {
  try {
    const course = courseService.getCourseById(req.params.id);
    res.status(200).json({ success: true, data: course });
  } catch (err) {
    next(err);
  }
};

const addCourse = (req, res, next) => {
  try {
    const course = courseService.createCourse(req.body);
    res.status(201).json({ success: true, data: course });
  } catch (err) {
    next(err);
  }
};

module.exports = { getCourses, getCourse, addCourse };
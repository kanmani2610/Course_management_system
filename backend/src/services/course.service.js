const Course = require("../models/course.model");

const createError = (message, statusCode) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
};

const getAllCourses = () => Course.findAll();

const getCourseById = (id) => {
  const course = Course.findById(Number(id));
  if (!course) throw createError("Course not found", 404);
  return course;
};

const createCourse = (data) => {
  const { title, instructor, duration } = data;
  if (!title || !instructor || !duration) {
    throw createError("title, instructor and duration are required", 400);
  }
  return Course.create({ title, instructor, duration });
};

module.exports = { getAllCourses, getCourseById, createCourse };
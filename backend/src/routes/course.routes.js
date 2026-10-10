const express = require("express");
const {
  getCourses,
  getCourse,
  addCourse,
} = require("../controllers/course.controller");

const router = express.Router();

router.route("/").get(getCourses).post(addCourse);
router.route("/:id").get(getCourse);

module.exports = router;
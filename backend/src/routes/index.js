const express = require("express");
const healthRoutes = require("./health.routes");
const courseRoutes = require("./course.routes");

const router = express.Router();

router.use("/health", healthRoutes);
router.use("/courses", courseRoutes);

module.exports = router;
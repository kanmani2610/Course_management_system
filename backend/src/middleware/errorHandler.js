const config = require("../config");

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: config.env === "development" ? err.stack : undefined,
  });
};

module.exports = errorHandler;
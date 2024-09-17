const logger = require('../utils/logger');

function errorHandler(err, req, res, next) {
  logger.error(err.stack);

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: {
      message: err.message,
      status: statusCode
    }
  });
}

module.exports = errorHandler;
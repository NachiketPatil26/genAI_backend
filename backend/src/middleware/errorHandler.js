
const logger = require('../config/logger');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  logger.error(
    {
      requestId: req.id,
      statusCode,
      message,
      stack: err.stack,
      // Optionally include more context from the request
      path: req.path,
      method: req.method,
    },
    'An unhandled error occurred',
  );

  // Avoid leaking stack trace in production
  const responseError = {
    error: {
      message,
      ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
    },
  };

  res.status(statusCode).json(responseError);
};

module.exports = errorHandler;

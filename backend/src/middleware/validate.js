const { validationResult } = require('express-validator');
const logger = require('../config/logger');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  logger.warn(
    { requestId: req.id, errors: extractedErrors },
    'Input validation failed',
  );

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = validate;

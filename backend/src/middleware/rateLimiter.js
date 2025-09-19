
const rateLimit = require('express-rate-limit');
const logger = require('../config/logger');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res, next, options) => {
    logger.warn(
      {
        requestId: req.id,
        ip: req.ip,
      },
      `Rate limit exceeded for path: ${req.path}`,
    );
    res.status(options.statusCode).json({ message: options.message });
  },
});

module.exports = limiter;

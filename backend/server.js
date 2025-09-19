// server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
// const mongoose = require('mongoose');
// const redis = require('redis');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const logger = require('./src/config/logger');

const connectDB = require('./src/config/database');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(
  fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    abortOnLimit: true,
  }),
);

// Database connections
// mongoose.connect(process.env.MONGODB_URI);
// const redisClient = redis.createClient({ url: process.env.REDIS_URL });

// Apply rate limiter to all API requests
app.use('/api', require('./src/middleware/rateLimiter'));

// Routes
app.use('/api', require('./src/routes/api'));

// Error handling
app.use(require('./src/middleware/errorHandler'));

const PORT = process.env.PORT || 3001;

if (require.main === module) {
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
}

module.exports = app;

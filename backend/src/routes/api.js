// backend/src/routes/api.js
const express = require('express');

const router = express.Router();

const validate = require('../middleware/validate');
const {
  textValidation,
  translateValidation,
  chatValidation,
} = require('../validators/aiValidators');

// const auth = require('../middleware/auth');
// const rateLimiter = require('../middleware/rateLimiter');

// Controllers
const documentController = require('../controllers/documentController');
const jargonController = require('../controllers/jargonController');
const riskController = require('../controllers/riskController');
const translateController = require('../controllers/translateController');
const visualizeController = require('../controllers/visualizeController');
const chatController = require('../controllers/chatController');
const naturalLanguageController = require('../controllers/naturalLanguageController'); // New import - RE-ENABLED

// Document endpoints
router.post('/upload', documentController.upload);
router.get('/document/:id', documentController.getDocument);

// AI processing endpoints
router.post('/jargon', textValidation, validate, jargonController.detectJargon);
router.post(
  '/risk-radar',
  textValidation,
  validate,
  riskController.analyzeRisk,
);
router.post(
  '/translate',
  translateValidation,
  validate,
  translateController.translate,
);
router.post(
  '/visualize',
  textValidation,
  validate,
  visualizeController.generateChartData,
);
router.post('/chat', chatValidation, validate, chatController.chat);

// Natural Language API endpoints (New)
router.get(
  '/document/:documentId/sentiment',
  naturalLanguageController.analyzeSentiment,
);

module.exports = router;

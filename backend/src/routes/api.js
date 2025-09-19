// backend/src/routes/api.js
const express = require('express');

const router = express.Router();

// const auth = require('../middleware/auth');
// const rateLimiter = require('../middleware/rateLimiter');

// Controllers
const documentController = require('../controllers/documentController');
const jargonController = require('../controllers/jargonController');
const riskController = require('../controllers/riskController');
const translateController = require('../controllers/translateController');
const visualizeController = require('../controllers/visualizeController');
const chatController = require('../controllers/chatController');

// Document endpoints
router.post('/upload', documentController.upload);
router.get('/document/:id', documentController.getDocument);

// AI processing endpoints
router.post('/jargon', jargonController.detectJargon);
router.post('/risk-radar', riskController.analyzeRisk);
router.post('/translate', translateController.translate);
router.post('/visualize', visualizeController.generateChartData);
router.post('/chat', chatController.chat);

module.exports = router;

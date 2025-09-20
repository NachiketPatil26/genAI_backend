// backend/src/controllers/naturalLanguageController.js
const naturalLanguageService = require('../services/naturalLanguageService');
const Document = require('../models/Document');
const logger = require('../config/logger');

const naturalLanguageController = {
  analyzeSentiment: async (req, res, next) => {
    logger.info(
      { requestId: req.id },
      '[NaturalLanguageController] Received request for sentiment analysis',
    );
    try {
      const { documentId } = req.params;
      const document = await Document.findById(documentId);

      if (!document || !document.extractedText) {
        logger.warn(
          { requestId: req.id, documentId },
          'Document or extracted text not found for sentiment analysis',
        );
        return res
          .status(404)
          .json({ error: 'Document or extracted text not found.' });
      }

      const sentiment = await naturalLanguageService.analyzeSentiment(
        document.extractedText,
      );
      return res.json({ documentId, sentiment });
    } catch (error) {
      logger.error(
        { requestId: req.id, err: error },
        'Error during sentiment analysis',
      );
      return next(error);
    }
  },
};

module.exports = naturalLanguageController;

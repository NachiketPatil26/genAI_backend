const logger = require('../config/logger');
const geminiService = require('../services/geminiService');

const jargonController = {
  detectJargon: async (req, res, next) => {
    logger.info({ requestId: req.id }, '[JargonController] Received request for jargon detection');
    try {
      const { text } = req.body;
      const jargon = await geminiService.detectJargon(text, req.id);
      return res.json(jargon);
    } catch (error) {
      logger.error({ requestId: req.id, err: error }, 'Error in jargon detection');
      return next(error);
    }
  },
};

module.exports = jargonController;

const logger = require('../config/logger');
const geminiService = require('../services/geminiService');

const riskController = {
  analyzeRisk: async (req, res, next) => {
    logger.info(
      { requestId: req.id },
      '[RiskController] Received request for risk analysis',
    );
    try {
      const { text } = req.body;
      const risks = await geminiService.analyzeRisk(text, req.id);
      return res.json(risks);
    } catch (error) {
      logger.error({ requestId: req.id, err: error }, 'Error in risk analysis');
      return next(error);
    }
  },
};

module.exports = riskController;

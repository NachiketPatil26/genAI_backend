const logger = require('../config/logger');
const geminiService = require('../services/geminiService');

const visualizeController = {
  generateChartData: async (req, res, next) => {
    logger.info({ requestId: req.id }, '[VisualizeController] Received request for visualization data');
    try {
      const { text } = req.body;
      const visualizationData = await geminiService.generateVisualizationData(
        text,
        req.id,
      );
      return res.json(visualizationData);
    } catch (error) {
      logger.error({ requestId: req.id, err: error }, 'Error generating visualization data');
      return next(error);
    }
  },
};

module.exports = visualizeController;

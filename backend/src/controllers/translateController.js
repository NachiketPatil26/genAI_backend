const logger = require('../config/logger');
const geminiService = require('../services/geminiService');

const translateController = {
  translate: async (req, res, next) => {
    logger.info(
      { requestId: req.id },
      '[TranslateController] Received request for translation',
    );
    try {
      const { text, targetLanguage } = req.body;
      const translatedText = await geminiService.translateAndSimplify(
        text,
        targetLanguage,
        req.id,
      );
      return res.json({ translatedText });
    } catch (error) {
      logger.error({ requestId: req.id, err: error }, 'Error in translation');
      return next(error);
    }
  },
};

module.exports = translateController;

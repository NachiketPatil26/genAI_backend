const logger = require('../config/logger');
const geminiService = require('../services/geminiService');

const chatController = {
  chat: async (req, res, next) => {
    logger.info(
      { requestId: req.id },
      '[ChatController] Received request for chat',
    );
    try {
      const { documentContext, question } = req.body;
      const answer = await geminiService.chatWithDocument(
        documentContext,
        question,
        req.id,
      );
      return res.json({ answer });
    } catch (error) {
      logger.error({ requestId: req.id, err: error }, 'Error in chat');
      return next(error);
    }
  },
};

module.exports = chatController;

const geminiService = require('../services/geminiService');

const chatController = {
  chat: async (req, res) => {
    console.log('[ChatController] Received request for chat');
    try {
      const { documentContext, question } = req.body;
      if (!documentContext || !question) {
        return res
          .status(400)
          .json({ error: 'Document context and question are required' });
      }
      const answer = await geminiService.chatWithDocument(
        documentContext,
        question,
      );
      return res.json({ answer });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to get chat response' });
    }
  },
};

module.exports = chatController;

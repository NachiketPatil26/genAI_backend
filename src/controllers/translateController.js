const geminiService = require('../services/geminiService');

const translateController = {
  translate: async (req, res) => {
    console.log('[TranslateController] Received request for translation');
    try {
      const { text, targetLanguage } = req.body;
      if (!text || !targetLanguage) {
        return res
          .status(400)
          .json({ error: 'Text and target language are required' });
      }
      const translatedText = await geminiService.translateAndSimplify(
        text,
        targetLanguage,
      );
      return res.json({ translatedText });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to translate text' });
    }
  },
};

module.exports = translateController;

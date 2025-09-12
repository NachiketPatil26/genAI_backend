const geminiService = require('../services/geminiService');

const jargonController = {
  detectJargon: async (req, res) => {
    console.log('[JargonController] Received request for jargon detection');
    try {
      const { text } = req.body;
      if (!text) {
        return res.status(400).json({ error: 'Text is required' });
      }
      const jargon = await geminiService.detectJargon(text);
      return res.json(jargon);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to detect jargon' });
    }
  },
};

module.exports = jargonController;

const geminiService = require('../services/geminiService');

const riskController = {
  analyzeRisk: async (req, res) => {
    console.log('[RiskController] Received request for risk analysis');
    try {
      const { text } = req.body;
      if (!text) {
        return res.status(400).json({ error: 'Text is required' });
      }
      const risks = await geminiService.analyzeRisk(text);
      return res.json(risks);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to analyze risk' });
    }
  },
};

module.exports = riskController;

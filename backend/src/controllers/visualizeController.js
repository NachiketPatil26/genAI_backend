const geminiService = require('../services/geminiService');

const visualizeController = {
  generateChartData: async (req, res) => {
    console.log(
      '[VisualizeController] Received request for visualization data',
    );
    try {
      const { text } = req.body;
      if (!text) {
        return res.status(400).json({ error: 'Text is required' });
      }
      const visualizationData =
        await geminiService.generateVisualizationData(text);
      return res.json(visualizationData);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: 'Failed to generate visualization data' });
    }
  },
};

module.exports = visualizeController;

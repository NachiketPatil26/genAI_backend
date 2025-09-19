const { GoogleGenerativeAI } = require('@google/generative-ai');
const logger = require('../config/logger');

class GeminiService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  static extractJson(text) {
    const match = text.match(/```json\n([\s\S]*?)\n```/);
    if (match && match[1]) {
      return match[1];
    }
    const jsonMatch = text.match(/(\{[\s\S]*\})/);
    if (jsonMatch && jsonMatch[1]) {
      return jsonMatch[1];
    }
    return text;
  }

  async detectJargon(text, requestId) {
    logger.info({ requestId }, '[GeminiService] Detecting jargon');
    const prompt = `
      Analyze this legal text and identify all legal jargon terms.
      Return JSON with format:
      {
        "jargon": [
          {
            "term": "identified term",
            "startPosition": 0,
            "endPosition": 10,
            "explanation": "plain English explanation"
          }
        ]
      }
      
      Text: ${text}
    `;

    logger.debug({ requestId }, 'Sending prompt for jargon detection');
    const result = await this.model.generateContent(prompt);
    const responseText = result.response.text();
    logger.debug({ requestId }, 'Received response for jargon detection');

    const jsonText = GeminiService.extractJson(responseText);
    return JSON.parse(jsonText);
  }

  async analyzeRisk(text, requestId) {
    logger.info({ requestId }, '[GeminiService] Analyzing risk');
    const prompt = `
      Identify risky clauses in this legal document.
      Return JSON with format:
      {
        "risks": [
          {
            "clause": "clause text",
            "startPosition": 0,
            "endPosition": 100,
            "riskLevel": "HIGH|MEDIUM|LOW",
            "reason": "explanation of risk"
          }
        ]
      }
      
      Document: ${text}
    `;

    logger.debug({ requestId }, 'Sending prompt for risk analysis');
    const result = await this.model.generateContent(prompt);
    const responseText = result.response.text();
    logger.debug({ requestId }, 'Received response for risk analysis');

    const jsonText = GeminiService.extractJson(responseText);
    return JSON.parse(jsonText);
  }

  async translateAndSimplify(text, targetLanguage, requestId) {
    logger.info({ requestId }, '[GeminiService] Translating and simplifying text');
    const prompt = `
      Translate this legal text to ${targetLanguage} and simplify it to plain language.
      Remove all legal jargon and make it understandable for a layperson.
      
      Text: ${text}
    `;

    logger.debug({ requestId }, 'Sending prompt for translation');
    const result = await this.model.generateContent(prompt);
    const responseText = result.response.text();
    logger.debug({ requestId }, 'Received response for translation');

    return responseText;
  }

  async generateVisualizationData(text, requestId) {
    logger.info({ requestId }, '[GeminiService] Generating visualization data');
    const prompt = `
      Analyze this legal document and provide data for visualization.
      Return JSON with:
      {
        "clauseCategories": [
          {"name": "category", "value": count}
        ],
        "riskDistribution": [
          {"level": "HIGH", "count": 0},
          {"level": "MEDIUM", "count": 0},
          {"level": "LOW", "count": 0}
        ],
        "complexity": {
          "score": 0-100,
          "readabilityLevel": "grade level"
        }
      }
      
      Document: ${text}
    `;

    logger.debug({ requestId }, 'Sending prompt for visualization');
    const result = await this.model.generateContent(prompt);
    const responseText = result.response.text();
    logger.debug({ requestId }, 'Received response for visualization');

    const jsonText = GeminiService.extractJson(responseText);
    return JSON.parse(jsonText);
  }

  async chatWithDocument(documentContext, question, requestId) {
    logger.info({ requestId }, '[GeminiService] Chatting with document');
    const prompt = `
      Based ONLY on this document context, answer the user's question.
      If the answer is not in the document, say so.
      
      Document: ${documentContext}
      Question: ${question}
    `;

    logger.debug({ requestId }, 'Sending prompt for chat');
    const result = await this.model.generateContent(prompt);
    const responseText = result.response.text();
    logger.debug({ requestId }, 'Received response for chat');

    return responseText;
  }
}

module.exports = new GeminiService();
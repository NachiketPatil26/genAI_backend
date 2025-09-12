// src/services/geminiService.js
const { GoogleGenerativeAI } = require('@google/generative-ai');

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
    // Fallback for cases where the markdown is not present
    const jsonMatch = text.match(/(\{[\s\S]*\})/);
    if (jsonMatch && jsonMatch[1]) {
      return jsonMatch[1];
    }
    return text;
  }

  async detectJargon(text) {
    console.log('[GeminiService] Detecting jargon');
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

    console.log('[GeminiService] Sending prompt for jargon detection:', prompt);
    const result = await this.model.generateContent(prompt);
    const responseText = result.response.text();
    console.log(
      '[GeminiService] Received response for jargon detection:',
      responseText,
    );
    const jsonText = GeminiService.extractJson(responseText);
    return JSON.parse(jsonText);
  }

  async analyzeRisk(text) {
    console.log('[GeminiService] Analyzing risk');
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

    console.log('[GeminiService] Sending prompt for risk analysis:', prompt);
    const result = await this.model.generateContent(prompt);
    const responseText = result.response.text();
    console.log(
      '[GeminiService] Received response for risk analysis:',
      responseText,
    );
    const jsonText = GeminiService.extractJson(responseText);
    return JSON.parse(jsonText);
  }

  async translateAndSimplify(text, targetLanguage) {
    console.log('[GeminiService] Translating and simplifying text');
    const prompt = `
      Translate this legal text to ${targetLanguage} and simplify it to plain language.
      Remove all legal jargon and make it understandable for a layperson.
      
      Text: ${text}
    `;

    console.log(
      '[GeminiService] Sending prompt for translation and simplification:',
      prompt,
    );
    const result = await this.model.generateContent(prompt);
    const responseText = result.response.text();
    console.log(
      '[GeminiService] Received response for translation and simplification:',
      responseText,
    );
    return responseText;
  }

  async generateVisualizationData(text) {
    console.log('[GeminiService] Generating visualization data');
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

    console.log(
      '[GeminiService] Sending prompt for visualization data:',
      prompt,
    );
    const result = await this.model.generateContent(prompt);
    const responseText = result.response.text();
    console.log(
      '[GeminiService] Received response for visualization data:',
      responseText,
    );
    const jsonText = GeminiService.extractJson(responseText);
    return JSON.parse(jsonText);
  }

  async chatWithDocument(documentContext, question) {
    console.log('[GeminiService] Chatting with document');
    const prompt = `
      Based ONLY on this document context, answer the user's question.
      If the answer is not in the document, say so.
      
      Document: ${documentContext}
      Question: ${question}
    `;

    console.log('[GeminiService] Sending prompt for chat:', prompt);
    const result = await this.model.generateContent(prompt);
    const responseText = result.response.text();
    console.log('[GeminiService] Received response for chat:', responseText);
    return responseText;
  }
}

module.exports = new GeminiService();

// backend/src/services/naturalLanguageService.js
const { LanguageServiceClient } = require('@google-cloud/language');
const { getGoogleAuthClient } = require('../config/googleCloud');
const logger = require('../config/logger');

class NaturalLanguageService {
  constructor() {
    this.client = null;
  }

  async initializeClient() {
    if (!this.client) {
      try {
        const authClient = await getGoogleAuthClient();
        this.client = new LanguageServiceClient({ authClient });
        logger.info('Cloud Natural Language API client initialized.');
      } catch (error) {
        logger.error(
          { err: error },
          'Failed to initialize Cloud Natural Language API client.',
        );
        throw error;
      }
    }
  }

  async analyzeSentiment(text) {
    await this.initializeClient();
    const document = { content: text, type: 'PLAIN_TEXT' };

    try {
      logger.info(
        '[NaturalLanguageService] Making Cloud Natural Language API call for sentiment analysis.',
      );
      // IMPORTANT: Monitor your Google Cloud billing dashboard and set up budget alerts
      // to stay within free tier limits. Application-level quota enforcement is not reliable.
      const [result] = await this.client.analyzeSentiment({ document });
      logger.info(
        '[NaturalLanguageService] Sentiment analysis completed successfully.',
      );
      return result.documentSentiment;
    } catch (error) {
      logger.error(
        { err: error },
        '[NaturalLanguageService] Error during sentiment analysis.',
      );
      throw error;
    }
  }
}

module.exports = new NaturalLanguageService();

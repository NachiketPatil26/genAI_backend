// backend/src/services/documentAIService.js
const { DocumentProcessorServiceClient } = require('@google-cloud/documentai');
const { getGoogleAuthClient } = require('../config/googleCloud');
const logger = require('../config/logger');

class DocumentAIService {
  constructor() {
    this.client = null;
    this.projectId = process.env.GOOGLE_CLOUD_PROJECT_ID; // Ensure this is set in .env
    this.location = process.env.GOOGLE_CLOUD_LOCATION || 'us'; // e.g., 'us' or 'eu'
    this.processorId = process.env.DOCUMENT_AI_PROCESSOR_ID; // Specific processor for contracts
  }

  async initializeClient() {
    if (!this.client) {
      try {
        const authClient = await getGoogleAuthClient();
        this.client = new DocumentProcessorServiceClient({ authClient });
        logger.info('Document AI client initialized.');
      } catch (error) {
        logger.error(
          { err: error },
          'Failed to initialize Document AI client.',
        );
        throw error;
      }
    }
  }

  async processDocument(fileBuffer, mimeType) {
    await this.initializeClient();

    if (!this.projectId || !this.location || !this.processorId) {
      logger.error(
        'Missing Document AI configuration: projectId, location, or processorId.',
      );
      throw new Error('Document AI configuration is incomplete.');
    }

    const name = `projects/${this.projectId}/locations/${this.location}/processors/${this.processorId}`;

    const request = {
      name,
      rawDocument: {
        content: fileBuffer.toString('base64'),
        mimeType,
      },
    };

    try {
      logger.info(
        `[DocumentAIService] Making Document AI API call to processor: ${name}`,
      );
      // IMPORTANT: Monitor your Google Cloud billing dashboard and set up budget alerts
      // to stay within free tier limits. Application-level quota enforcement is not reliable.
      const [result] = await this.client.processDocument(request);
      logger.info(
        '[DocumentAIService] Document AI processing completed successfully.',
      );
      return result.document;
    } catch (error) {
      logger.error(
        { err: error },
        '[DocumentAIService] Error processing document with Document AI.',
      );
      throw error;
    }
  }

  // Future methods for parsing specific entities from the Document AI response
  // For now, we'll focus on getting the full text and basic structure.
}

module.exports = new DocumentAIService();

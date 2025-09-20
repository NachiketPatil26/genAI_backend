/* eslint-disable class-methods-use-this, no-underscore-dangle */
const fs = require('fs');
const logger = require('../config/logger');
const documentAIService = require('./documentAIService'); // Import the new service
const visionService = require('./visionService'); // Import the new Vision service

class DocumentService {
  async extractText(document) {
    logger.info({ documentId: document._id }, 'Starting text extraction');
    try {
      const dataBuffer = fs.readFileSync(document.storagePath);

      let text;
      if (document.mimeType === 'application/pdf') {
        logger.info({ documentId: document._id }, 'Processing PDF with Document AI');
        const docAiResult = await documentAIService.processDocument(
          dataBuffer,
          document.mimeType,
        );
        text = docAiResult.text; // Document AI result has a .text property for full text
        // Future: Store structured data from docAiResult if needed
      } else if (document.mimeType.startsWith('image/')) {
        logger.info({ documentId: document._id }, 'Processing image with Cloud Vision API');
        text = await visionService.detectTextFromImage(dataBuffer);
      } else if (document.mimeType === 'text/plain') {
        text = dataBuffer.toString('utf8');
      } else {
        logger.warn(
          { documentId: document._id, mimeType: document.mimeType },
          'Unsupported file type for text extraction (supported: PDF, images, plain text)',
        );
        throw new Error(`Unsupported file type: ${document.mimeType}`);
      }

      // Update the document in the database with the extracted text
      // eslint-disable-next-line no-param-reassign
      document.extractedText = text;
      // eslint-disable-next-line no-param-reassign
      document.processingStatus = 'completed';
      await document.save();

      logger.info(
        { documentId: document._id },
        'Text extraction completed successfully',
      );
      return text;
    } catch (error) {
      logger.error(
        { documentId: document._id, err: error },
        'Error during text extraction',
      );
      // Update the document status to failed
      // eslint-disable-next-line no-param-reassign
      document.processingStatus = 'failed';
      await document.save();
      throw error; // Re-throw the error to be handled by the controller
    }
  }
}

module.exports = new DocumentService();
/* eslint-enable class-methods-use-this, no-underscore-dangle */

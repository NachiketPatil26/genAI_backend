const fs = require('fs');
const pdf = require('pdf-parse');
const logger = require('../config/logger');

class DocumentService {
  async extractText(document) {
    logger.info({ documentId: document._id }, 'Starting text extraction');
    try {
      const dataBuffer = fs.readFileSync(document.storagePath);

      let text;
      if (document.mimeType === 'application/pdf') {
        const data = await pdf(dataBuffer);
        text = data.text;
      } else if (document.mimeType === 'text/plain') {
        text = dataBuffer.toString('utf8');
      } else {
        logger.warn(
          { documentId: document._id, mimeType: document.mimeType },
          'Unsupported file type for text extraction',
        );
        throw new Error(`Unsupported file type: ${document.mimeType}`);
      }

      // Update the document in the database with the extracted text
      document.extractedText = text;
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
      document.processingStatus = 'failed';
      await document.save();
      throw error; // Re-throw the error to be handled by the controller
    }
  }
}

module.exports = new DocumentService();

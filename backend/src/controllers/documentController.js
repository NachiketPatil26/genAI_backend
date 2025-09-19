const logger = require('../config/logger');
const documentService = require('../services/documentService');
const storageService = require('../services/storageService');
const Document = require('../models/Document');

const documentController = {
  upload: async (req, res, next) => {
    logger.info({ requestId: req.id }, '[DocumentController] Received request for document upload');
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        logger.warn({ requestId: req.id }, 'Validation error: No files were uploaded.');
        return res.status(400).json({ error: 'No files were uploaded.' });
      }

      const uploadedFile = req.files.document; // 'document' is the name of the form field

      // Save the file using the storage service
      const { path: storagePath } = await storageService.save(uploadedFile);

      // Create a document record in the database
      const document = await Document.create({
        originalName: uploadedFile.name,
        storagePath,
        fileSize: uploadedFile.size,
        mimeType: uploadedFile.mimetype,
      });

      logger.info({ requestId: req.id, documentId: document._id }, 'Document uploaded successfully');

      // Update status to 'processing' and trigger text extraction asynchronously
      document.processingStatus = 'processing';
      await document.save();

      // Don't wait for extraction to finish to send the response
      documentService.extractText(document);

      logger.info({ requestId: req.id, documentId: document._id }, 'Document upload accepted and processing started');

      return res.status(202).json(document); // 202 Accepted
    } catch (error) {
      logger.error({ requestId: req.id, err: error }, 'Error during document upload');
      return next(error);
    }
  },

  getDocument: async (req, res, next) => {
    logger.info(
      { requestId: req.id, documentId: req.params.id },
      `[DocumentController] Received request to get document`,
    );
    try {
      const document = await Document.findById(req.params.id);
      if (!document) {
        logger.warn({ requestId: req.id, documentId: req.params.id }, 'Document not found');
        return res.status(404).json({ error: 'Document not found' });
      }
      return res.json(document);
    } catch (error) {
      logger.error({ requestId: req.id, err: error }, 'Error retrieving document');
      return next(error);
    }
  },
};

module.exports = documentController;

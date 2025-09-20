// backend/src/services/cloudinaryService.js
const cloudinary = require('cloudinary').v2;
const logger = require('../config/logger');

class CloudinaryService {
  constructor() {
    // The CLOUDINARY_URL environment variable contains all config details.
    // The Cloudinary SDK automatically uses it if it's set.
    if (process.env.CLOUDINARY_URL) {
      logger.info('Cloudinary service configured via CLOUDINARY_URL.');
    } else {
      logger.warn('CLOUDINARY_URL not set. File uploads will fail in production.');
    }
  }

  async uploadFile(file) {
    // Cloudinary needs the file path to upload.
    // The express-fileupload middleware provides a temporary path.
    if (!file || !file.tempFilePath) {
      throw new Error('No file or temporary file path provided for upload.');
    }

    try {
      logger.info(`[CloudinaryService] Uploading file: ${file.name}`);
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        resource_type: 'auto', // Automatically detect the file type (image, pdf, raw)
        folder: 'legal_documents', // Optional: store files in a specific folder
      });
      logger.info(`[CloudinaryService] File uploaded successfully to Cloudinary. Public ID: ${result.public_id}`);
      return result;
    } catch (error) {
      logger.error({ err: error }, '[CloudinaryService] Error uploading file to Cloudinary.');
      throw error;
    }
  }
}

module.exports = new CloudinaryService();

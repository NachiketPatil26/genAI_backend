/* eslint-disable class-methods-use-this */
const logger = require('../config/logger');
const cloudinaryService = require('./cloudinaryService');

class StorageService {
  async save(file) {
    try {
      // Upload the file to Cloudinary
      const result = await cloudinaryService.uploadFile(file);

      // The `storagePath` will now be the secure URL from Cloudinary
      const storagePath = result.secure_url;
      const fileName = result.original_filename;

      logger.info(`File stored in Cloudinary. URL: ${storagePath}`);

      // Return the path and name, consistent with the previous implementation
      return { path: storagePath, name: fileName };
    } catch (error) {
      logger.error({ err: error }, 'Error saving file via StorageService.');
      throw error;
    }
  }

  // In the future, you could add methods here to interact with other storage providers.
  // async get(fileName) { ... }
  // async delete(fileName) { ... }
}

module.exports = new StorageService();
/* eslint-enable class-methods-use-this */

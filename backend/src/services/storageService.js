
const fs = require('fs');
const path = require('path');
const logger = require('../config/logger');

const uploadDir = path.join(__dirname, '../../uploads');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  logger.info(`Created upload directory at: ${uploadDir}`);
}

class StorageService {
  async save(file) {
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);

    return new Promise((resolve, reject) => {
      file.mv(filePath, (err) => {
        if (err) {
          logger.error({ err }, 'Error saving file to local storage');
          return reject(err);
        }
        logger.info(`File saved to ${filePath}`);
        resolve({ path: filePath, name: fileName });
      });
    });
  }

  // In the future, you could add methods here to interact with S3, GCS, etc.
  // async get(fileName) { ... }
  // async delete(fileName) { ... }
}

module.exports = new StorageService();

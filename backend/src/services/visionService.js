// backend/src/services/visionService.js
const vision = require('@google-cloud/vision');
const { getGoogleAuthClient } = require('../config/googleCloud');
const logger = require('../config/logger');

class VisionService {
  constructor() {
    this.client = null;
  }

  async initializeClient() {
    if (!this.client) {
      try {
        const authClient = await getGoogleAuthClient();
        this.client = new vision.ImageAnnotatorClient({ authClient });
        logger.info('Cloud Vision API client initialized.');
      } catch (error) {
        logger.error(
          { err: error },
          'Failed to initialize Cloud Vision API client.',
        );
        throw error;
      }
    }
  }

  async detectTextFromImage(imageBuffer) {
    await this.initializeClient();

    const request = {
      image: { content: imageBuffer.toString('base64') },
    };

    try {
      logger.info(
        '[VisionService] Making Cloud Vision API call for text detection.',
      );
      // IMPORTANT: Monitor your Google Cloud billing dashboard and set up budget alerts
      // to stay within free tier limits. Application-level quota enforcement is not reliable.
      const [result] = await this.client.textDetection(request);
      const detections = result.textAnnotations;
      if (detections && detections.length > 0) {
        logger.info('[VisionService] Text detection completed successfully.');
        return detections[0].description; // The first annotation is usually the full text
      }
      logger.warn('[VisionService] No text detected in the image.');
      return '';
    } catch (error) {
      logger.error(
        { err: error },
        '[VisionService] Error detecting text from image.',
      );
      throw error;
    }
  }
}

module.exports = new VisionService();

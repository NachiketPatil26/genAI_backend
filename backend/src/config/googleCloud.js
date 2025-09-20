// backend/src/config/googleCloud.js
const { GoogleAuth } = require('google-auth-library');
const logger = require('./logger');

let authClient;

const getGoogleAuthClient = async () => {
  if (!authClient) {
    try {
      let authConfig;

      // In a production environment like Render, we use a multi-line environment variable.
      if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
        logger.info('Initializing Google Auth with JSON from environment variable.');
        const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
        authConfig = { credentials, scopes: ['https://www.googleapis.com/auth/cloud-platform'] };
      } else {
        // For local development, we use the key file path.
        logger.info('Initializing Google Auth with key file from GOOGLE_APPLICATION_CREDENTIALS.');
        authConfig = { scopes: ['https://www.googleapis.com/auth/cloud-platform'] };
      }

      authClient = new GoogleAuth(authConfig);
      // Attempt to get credentials to verify setup
      await authClient.getCredentials();
      logger.info('Google Cloud authentication client initialized successfully.');
    } catch (error) {
      logger.error(
        { err: error },
        'Failed to initialize Google Cloud authentication client. Check your credentials configuration.',
      );
      throw new Error('Google Cloud authentication failed.');
    }
  }
  return authClient;
};

module.exports = { getGoogleAuthClient };

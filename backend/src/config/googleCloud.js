// backend/src/config/googleCloud.js
const { GoogleAuth } = require('google-auth-library');
const logger = require('./logger');

let authClient;

const getGoogleAuthClient = async () => {
  if (!authClient) {
    try {
      authClient = new GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/cloud-platform'],
      });
      // Attempt to get credentials to verify setup
      await authClient.getCredentials();
      logger.info(
        'Google Cloud authentication client initialized successfully.',
      );
    } catch (error) {
      logger.error(
        { err: error },
        'Failed to initialize Google Cloud authentication client.',
      );
      throw new Error('Google Cloud authentication failed.');
    }
  }
  return authClient;
};

module.exports = { getGoogleAuthClient };

const admin = require('firebase-admin');

// Initialize Firebase (if not already initialized)
if (!admin.apps.length) {
  const serviceAccount = require('./path/to/serviceAccountKey.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

/**
 * Send a push notification using Firebase Cloud Messaging (FCM)
 * @param {string} token - The FCM token of the target device
 * @param {string} title - The title of the notification
 * @param {string} body - The body of the notification
 * @returns {Promise} - Resolves with the FCM response or rejects with an error
 */
const sendNotification = async (token, title, body) => {
  const message = {
    notification: {
      title,
      body
    },
    token
  };

  try {
    const response = await admin.messaging().send(message);
    return response;
  } catch (error) {
    throw new Error(`Failed to send notification: ${error.message}`);
  }
};

module.exports = { sendNotification };
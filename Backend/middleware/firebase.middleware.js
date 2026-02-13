import admin from '../config/firebase.js';
import User from '../models/model.user.js';

/**
 * Middleware to verify Firebase ID token
 * Extracts token from Authorization header and verifies it
 */
export const verifyFirebaseToken = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Please login.'
      });
    }

    const token = authHeader.split('Bearer ')[1];

    // Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Attach decoded token to request
    req.firebaseUser = decodedToken;
    req.firebaseUid = decodedToken.uid;
    
    next();
  } catch (error) {
    console.error('Firebase token verification error:', error);
    
    let message = 'Invalid or expired token';
    
    if (error.code === 'auth/id-token-expired') {
      message = 'Token has expired. Please login again.';
    } else if (error.code === 'auth/argument-error') {
      message = 'Invalid token format';
    }
    
    return res.status(401).json({
      success: false,
      message: message
    });
  }
};

/**
 * Middleware to verify Firebase token and attach user from database
 */
export const verifyFirebaseAndGetUser = async (req, res, next) => {
  try {
    // First verify the Firebase token
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Please login.'
      });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Find user in database by firebaseUid
    const user = await User.findOne({ firebaseUid: decodedToken.uid });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found. Please sign up first.'
      });
    }
    
    // Attach user and firebase data to request
    req.user = user;
    req.firebaseUser = decodedToken;
    req.firebaseUid = decodedToken.uid;
    
    next();
  } catch (error) {
    console.error('Firebase authentication error:', error);
    
    return res.status(401).json({
      success: false,
      message: 'Authentication failed. Please login again.'
    });
  }
};

export default { verifyFirebaseToken, verifyFirebaseAndGetUser };

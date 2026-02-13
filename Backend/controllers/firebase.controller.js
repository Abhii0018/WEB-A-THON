import User from '../models/model.user.js';
import { verifyFirebaseToken } from '../middleware/firebase.middleware.js';

/**
 * @route   POST /api/auth/firebase-signup
 * @desc    Create user in MongoDB after Firebase signup
 * @access  Public (with Firebase token)
 */
export const firebaseSignup = async (req, res) => {
  try {
    const { name, email, firebaseUid } = req.body;

    // Validate required fields
    if (!name || !email || !firebaseUid) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and firebaseUid are required'
      });
    }

    // Check if user already exists with this email or firebaseUid
    const existingUser = await User.findOne({
      $or: [{ email }, { firebaseUid }]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email or Firebase account'
      });
    }

    // Create new user in MongoDB
    const user = await User.create({
      name,
      email,
      firebaseUid,
      authProvider: 'firebase',
      role: 'user'
    });

    // Return user data (without password)
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      firebaseUid: user.firebaseUid,
      role: user.role,
      authProvider: user.authProvider,
      createdAt: user.createdAt
    };

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      user: userResponse
    });
  } catch (error) {
    console.error('Firebase signup error:', error);
    
    res.status(500).json({
      success: false,
      message: 'Error creating user account',
      error: error.message
    });
  }
};

/**
 * @route   POST /api/auth/firebase-login
 * @desc    Login user with Firebase token and get user data from MongoDB
 * @access  Public (with Firebase token)
 */
export const firebaseLogin = async (req, res) => {
  try {
    const { firebaseUid } = req.body;

    if (!firebaseUid) {
      return res.status(400).json({
        success: false,
        message: 'Firebase UID is required'
      });
    }

    // Find user in MongoDB
    const user = await User.findOne({ firebaseUid });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found. Please sign up first.'
      });
    }

    // Return user data
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      firebaseUid: user.firebaseUid,
      role: user.role,
      authProvider: user.authProvider,
      photoURL: user.photoURL
    };

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: userResponse
    });
  } catch (error) {
    console.error('Firebase login error:', error);
    
    res.status(500).json({
      success: false,
      message: 'Error during login',
      error: error.message
    });
  }
};

/**
 * @route   POST /api/auth/firebase-google
 * @desc    Google sign-in (create or login user)
 * @access  Public (with Firebase token)
 */
export const firebaseGoogleAuth = async (req, res) => {
  try {
    const { name, email, firebaseUid, photoURL } = req.body;
    
    console.log('Google Auth Request:', { name, email, firebaseUid, photoURL });

    // Validate required fields
    if (!email || !firebaseUid) {
      console.log('Validation failed: Missing email or firebaseUid');
      return res.status(400).json({
        success: false,
        message: 'Email and firebaseUid are required'
      });
    }

    // Check if user exists
    let user = await User.findOne({ firebaseUid });
    
    console.log('Existing user found:', user ? 'Yes' : 'No');

    if (user) {
      // User exists, update if needed
      if (photoURL && user.photoURL !== photoURL) {
        user.photoURL = photoURL;
        await user.save();
        console.log('Updated user photoURL');
      }

      const userResponse = {
        id: user._id,
        name: user.name,
        email: user.email,
        firebaseUid: user.firebaseUid,
        role: user.role,
        authProvider: user.authProvider,
        photoURL: user.photoURL
      };

      return res.status(200).json({
        success: true,
        message: 'Login successful',
        user: userResponse
      });
    }

    // User doesn't exist, create new user
    console.log('Creating new user with Google auth');
    user = await User.create({
      name: name || email.split('@')[0], // Use email prefix if name not provided
      email,
      firebaseUid,
      photoURL: photoURL || null,
      authProvider: 'google',
      role: 'user'
    });
    
    console.log('New user created:', user._id);

    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      firebaseUid: user.firebaseUid,
      role: user.role,
      authProvider: user.authProvider,
      photoURL: user.photoURL
    };

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      user: userResponse
    });
  } catch (error) {
    console.error('Firebase Google auth error:', error);
    
    res.status(500).json({
      success: false,
      message: 'Error during Google authentication',
      error: error.message
    });
  }
};

export default {
  firebaseSignup,
  firebaseLogin,
  firebaseGoogleAuth
};

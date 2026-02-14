import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from 'firebase/auth';
import { auth } from '../config/firebase';
import api from '../config/api';

/**
 * Sign up with email and password using Firebase
 * Then send ID token to backend to create user in MongoDB
 * User must login manually after signup
 */
export const signUpWithEmail = async (email, password, name, role = 'user') => {
  try {
    // Create user in Firebase
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Get Firebase ID token
    const idToken = await user.getIdToken();
    
    // Temporarily store token for backend request
    const tempToken = idToken;
    
    // Send to backend to create user in MongoDB
    const response = await api.post('/auth/firebase-signup', {
      name: name,
      email: email,
      firebaseUid: user.uid,
      role: role
    }, {
      headers: {
        'Authorization': `Bearer ${tempToken}`
      }
    });
    
    // Sign out the user after successful signup
    await signOut(auth);
    
    // Clear any stored tokens
    localStorage.removeItem('firebaseToken');
    localStorage.removeItem('user');
    
    return { 
      success: true, 
      user: response.data.user,
      message: 'Account created successfully! Please login to continue.'
    };
  } catch (error) {
    console.error('Signup error:', error);
    
    // If signup failed, try to clean up Firebase user
    try {
      if (auth.currentUser) {
        await signOut(auth);
        localStorage.removeItem('firebaseToken');
        localStorage.removeItem('user');
      }
    } catch (cleanupError) {
      console.error('Cleanup error:', cleanupError);
    }
    
    let errorMessage = 'An error occurred during signup';
    
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'This email is already registered';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'Password should be at least 6 characters';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address';
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }
    
    return { success: false, error: errorMessage };
  }
};

/**
 * Sign in with email and password using Firebase
 * Then send ID token to backend for verification
 */
export const signInWithEmail = async (email, password) => {
  try {
    // Sign in with Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Get Firebase ID token
    const idToken = await user.getIdToken();
    
    // Store token in localStorage
    localStorage.setItem('firebaseToken', idToken);
    
    // Send to backend for verification and get user data
    const response = await api.post('/auth/firebase-login', {
      firebaseUid: user.uid
    });
    
    // Store user data
    localStorage.setItem('user', JSON.stringify(response.data.user));
    
    // Dispatch login event for UI updates
    window.dispatchEvent(new Event('userLoggedIn'));
    
    return { 
      success: true, 
      user: response.data.user,
      token: idToken 
    };
  } catch (error) {
    console.error('Login error:', error);
    
    let errorMessage = 'An error occurred during login';
    
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      errorMessage = 'Invalid email or password';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address';
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = 'Too many failed login attempts. Please try again later';
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }
    
    return { success: false, error: errorMessage };
  }
};

/**
 * Sign in with Google using Firebase popup
 * Then send ID token to backend
 */
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    
    // Sign in with Google popup
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    
    // Get Firebase ID token
    const idToken = await user.getIdToken();
    
    // Store token in localStorage
    localStorage.setItem('firebaseToken', idToken);
    
    // Send to backend (will create user if doesn't exist)
    const response = await api.post('/auth/firebase-google', {
      name: user.displayName,
      email: user.email,
      firebaseUid: user.uid,
      photoURL: user.photoURL
    });
    
    // Store user data
    localStorage.setItem('user', JSON.stringify(response.data.user));
    
    // Dispatch login event for UI updates
    window.dispatchEvent(new Event('userLoggedIn'));
    
    return { 
      success: true, 
      user: response.data.user,
      token: idToken 
    };
  } catch (error) {
    console.error('Google login error:', error);
    
    let errorMessage = 'An error occurred during Google login';
    
    if (error.code === 'auth/popup-closed-by-user') {
      errorMessage = 'Login popup was closed';
    } else if (error.code === 'auth/cancelled-popup-request') {
      errorMessage = 'Login was cancelled';
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }
    
    return { success: false, error: errorMessage };
  }
};

/**
 * Sign out user
 */
export const logOut = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem('firebaseToken');
    localStorage.removeItem('user');
    
    // Dispatch logout event for UI updates
    window.dispatchEvent(new Event('userLoggedOut'));
    
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false, error: 'Failed to logout' };
  }
};

/**
 * Get current user from localStorage
 */
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }
  return null;
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem('firebaseToken');
};

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkV4ubmKUFg6r0b1bVpnaxk66BGkOx2-I",
  authDomain: "helpzo-e41b3.firebaseapp.com",
  projectId: "helpzo-e41b3",
  storageBucket: "helpzo-e41b3.firebasestorage.app",
  messagingSenderId: "378400111608",
  appId: "1:378400111608:web:9405542b522a9c128c340d",
  measurementId: "G-MWJ95934TY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics (optional)
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export { analytics };
export default app;

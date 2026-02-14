// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
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

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;

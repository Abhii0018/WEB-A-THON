import admin from 'firebase-admin';

// Initialize Firebase Admin SDK
// For development, we'll use the Firebase project credentials
// In production, you should use a service account key file

const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID || 'helpzo-e41b3',
};

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: firebaseConfig.projectId,
  });
}

export const firebaseAdmin = admin;
export default admin;

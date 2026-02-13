# Firebase Backend Integration

This document explains the Firebase Admin SDK integration on the backend for authentication.

## Overview

The backend uses Firebase Admin SDK to:
- Verify Firebase ID tokens sent from the frontend
- Create/manage users in MongoDB after Firebase authentication
- Support hybrid authentication (both Firebase and traditional OTP-based)

## Setup

### 1. Dependencies
```bash
npm install firebase-admin
```

### 2. Environment Variables
Add to `Backend/.env`:
```
FIREBASE_PROJECT_ID=helpzo-e41b3
```

### 3. Firebase Admin Configuration
File: `Backend/config/firebase.js`

Initializes Firebase Admin SDK with application default credentials.

## Authentication Flow

### Firebase Email/Password Signup
1. Frontend creates user in Firebase (`createUserWithEmailAndPassword`)
2. Frontend receives Firebase ID token
3. Frontend sends POST to `/api/auth/firebase-signup` with:
   - `name`: User's full name
   - `email`: User's email
   - `firebaseUid`: Firebase user ID
4. Backend verifies token (optional) and creates user in MongoDB
5. Backend returns user data

### Firebase Email/Password Login
1. Frontend signs in with Firebase (`signInWithEmailAndPassword`)
2. Frontend receives Firebase ID token
3. Frontend sends POST to `/api/auth/firebase-login` with:
   - `firebaseUid`: Firebase user ID
4. Backend finds user in MongoDB and returns user data

### Google Sign-In
1. Frontend authenticates with Google via Firebase (`signInWithPopup`)
2. Frontend receives Firebase ID token and user profile
3. Frontend sends POST to `/api/auth/firebase-google` with:
   - `name`: User's name from Google
   - `email`: User's email
   - `firebaseUid`: Firebase user ID
   - `photoURL`: User's profile photo (optional)
4. Backend checks if user exists:
   - If exists: Returns user data
   - If new: Creates user in MongoDB and returns user data

## User Model Updates

The User schema (`Backend/models/model.user.js`) supports dual authentication:

```javascript
{
  firebaseUid: { type: String, unique: true, sparse: true, index: true },
  photoURL: { type: String, default: null },
  authProvider: { type: String, enum: ["email", "google", "firebase"], default: "email" },
  password: { 
    type: String, 
    required: function() { return !this.firebaseUid; } // Only required for non-Firebase auth
  }
}
```

## API Endpoints

### POST /api/auth/firebase-signup
Create user in MongoDB after Firebase signup.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "firebaseUid": "firebase-uid-here"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Account created successfully",
  "user": {
    "id": "mongodb-id",
    "name": "John Doe",
    "email": "john@example.com",
    "firebaseUid": "firebase-uid-here",
    "role": "user",
    "authProvider": "firebase",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
```

### POST /api/auth/firebase-login
Login with Firebase and get user data from MongoDB.

**Request Body:**
```json
{
  "firebaseUid": "firebase-uid-here"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "mongodb-id",
    "name": "John Doe",
    "email": "john@example.com",
    "firebaseUid": "firebase-uid-here",
    "role": "user",
    "authProvider": "firebase",
    "photoURL": null
  }
}
```

### POST /api/auth/firebase-google
Google OAuth via Firebase (create or login).

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "firebaseUid": "firebase-uid-here",
  "photoURL": "https://lh3.googleusercontent.com/..."
}
```

**Response (New User):**
```json
{
  "success": true,
  "message": "Account created successfully",
  "user": {
    "id": "mongodb-id",
    "name": "John Doe",
    "email": "john@example.com",
    "firebaseUid": "firebase-uid-here",
    "role": "user",
    "authProvider": "google",
    "photoURL": "https://lh3.googleusercontent.com/..."
  }
}
```

## Middleware

### verifyFirebaseToken
Basic Firebase token verification (optional use).

```javascript
import { verifyFirebaseToken } from '../middleware/firebase.middleware.js';

router.get('/protected', verifyFirebaseToken, (req, res) => {
  // req.user contains decoded Firebase token
});
```

### verifyFirebaseAndGetUser
Verifies token AND fetches user from MongoDB.

```javascript
import { verifyFirebaseAndGetUser } from '../middleware/firebase.middleware.js';

router.get('/profile', verifyFirebaseAndGetUser, (req, res) => {
  // req.user contains MongoDB user document
});
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error message here",
  "error": "Detailed error (in development)"
}
```

Common error codes:
- `400`: Missing required fields or user already exists
- `404`: User not found (firebase-login endpoint)
- `401`: Invalid or expired Firebase token (when using middleware)
- `500`: Server error

## Testing

### Test Firebase Signup
```bash
curl -X POST http://localhost:3000/api/auth/firebase-signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "firebaseUid": "test-firebase-uid"
  }'
```

### Test Firebase Login
```bash
curl -X POST http://localhost:3000/api/auth/firebase-login \
  -H "Content-Type: application/json" \
  -d '{
    "firebaseUid": "test-firebase-uid"
  }'
```

## Security Notes

1. **Token Verification**: Currently, the endpoints trust the `firebaseUid` sent from the frontend. For production, add Firebase token verification using the middleware.

2. **CORS**: Ensure CORS is configured to accept requests from your frontend URL.

3. **HTTPS**: Use HTTPS in production for secure token transmission.

4. **Environment Variables**: Never commit `.env` file to version control.

## Next Steps

1. Enable Email/Password authentication in Firebase Console
2. Enable Google Sign-In in Firebase Console
3. Add Firebase token verification middleware to endpoints (recommended for production)
4. Test complete authentication flow
5. Add user profile update endpoints
6. Implement role-based access control

## Troubleshooting

### "User not found" error
- Ensure user signed up via `/firebase-signup` or `/firebase-google` before logging in
- Check that `firebaseUid` matches between Firebase and MongoDB

### "Firebase Admin not initialized" error
- Verify `FIREBASE_PROJECT_ID` is set in `.env`
- Ensure Firebase Admin SDK is installed: `npm install firebase-admin`

### MongoDB connection errors
- Check `MONGO_URI` in `.env`
- Verify MongoDB Atlas network access allows your IP
- Ensure database user has correct permissions

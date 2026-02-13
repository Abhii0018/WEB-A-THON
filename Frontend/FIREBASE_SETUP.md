# Firebase Authentication Setup - Helpzo

## ✅ Frontend Setup Complete

### What's Been Configured:

1. **Firebase SDK Installed**
   - `firebase` v11+ (modular SDK)
   - `axios` for API calls

2. **Firebase Configuration**
   - Project: helpzo-e41b3
   - Authentication enabled with Email/Password and Google Sign-in

3. **Files Created/Updated:**
   - `/src/config/firebase.js` - Firebase initialization
   - `/src/config/api.js` - Axios instance with auth interceptors
   - `/src/services/authService.js` - Firebase auth functions
   - `/src/components/Auth/Auth.jsx` - Updated with Firebase logic
   - `.env` - Environment variables

---

## 🔑 Authentication Flow

### Sign Up (Email/Password)
1. User fills signup form
2. Firebase creates account
3. Gets Firebase ID token
4. Sends token to backend → `POST /api/auth/firebase-signup`
5. Backend creates user in MongoDB
6. Returns user data

### Sign In (Email/Password)
1. User fills login form
2. Firebase authenticates
3. Gets Firebase ID token
4. Sends token to backend → `POST /api/auth/firebase-login`
5. Backend verifies and returns user data

### Google Sign In
1. User clicks "Sign in with Google"
2. Firebase popup authentication
3. Gets Firebase ID token
4. Sends token to backend → `POST /api/auth/firebase-google`
5. Backend creates/updates user in MongoDB

---

## 🚨 Required Backend Routes

You need to create these routes in your backend:

### 1. Firebase Signup
```javascript
POST /api/auth/firebase-signup
Body: {
  name: string,
  email: string,
  firebaseUid: string
}
Response: {
  success: true,
  user: { id, name, email, firebaseUid }
}
```

### 2. Firebase Login
```javascript
POST /api/auth/firebase-login
Body: {
  firebaseUid: string
}
Response: {
  success: true,
  user: { id, name, email, firebaseUid }
}
```

### 3. Firebase Google Auth
```javascript
POST /api/auth/firebase-google
Body: {
  name: string,
  email: string,
  firebaseUid: string,
  photoURL: string (optional)
}
Response: {
  success: true,
  user: { id, name, email, firebaseUid }
}
```

---

## 📝 Backend Implementation Steps

1. **Install Firebase Admin SDK** (backend):
   ```bash
   npm install firebase-admin
   ```

2. **Verify ID Tokens** (backend middleware):
   ```javascript
   import admin from 'firebase-admin';
   
   // Verify Firebase token
   const token = req.headers.authorization?.split('Bearer ')[1];
   const decodedToken = await admin.auth().verifyIdToken(token);
   ```

3. **Create User Schema** with firebaseUid field:
   ```javascript
   const userSchema = new Schema({
     name: String,
     email: String,
     firebaseUid: { type: String, unique: true, required: true },
     photoURL: String,
     createdAt: { type: Date, default: Date.now }
   });
   ```

---

## 🔒 Token Storage

- Firebase ID token stored in `localStorage.firebaseToken`
- User data stored in `localStorage.user`
- Token automatically added to all API requests via axios interceptor
- Auto-logout on 401 (unauthorized) responses

---

## 🎯 Usage in Components

```javascript
import { getCurrentUser, isAuthenticated, logOut } from '../services/authService';

// Check if user is logged in
if (isAuthenticated()) {
  const user = getCurrentUser();
  console.log(user);
}

// Logout
await logOut();
```

---

## 🔥 Firebase Console Setup Required

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: **helpzo-e41b3**
3. Enable Authentication:
   - Email/Password ✅
   - Google Sign-in ✅
4. Add authorized domain: `localhost` (for development)

---

## 🚀 Next Steps

1. ✅ Frontend Firebase integration complete
2. ⏳ Create backend Firebase routes (see above)
3. ⏳ Test signup flow
4. ⏳ Test login flow
5. ⏳ Test Google sign-in

---

## 📦 Environment Variables

All Firebase config is in `.env`:
```
VITE_API_URL=http://localhost:3000/api
VITE_FIREBASE_API_KEY=AIzaSyBkV4ubmKUFg6r0b1bVpnaxk66BGkOx2-I
VITE_FIREBASE_AUTH_DOMAIN=helpzo-e41b3.firebaseapp.com
...
```

**Note:** Don't commit `.env` to git. It's already in `.gitignore`.

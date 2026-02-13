# 🚀 Instant Service Booking System - API Documentation

## 📋 Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
- [User Roles](#user-roles)

---

## 🎯 Overview

A production-ready RESTful API for an Instant Service Booking System with role-based access control, JWT authentication, and automated employee assignment.

## ⚙️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT + HTTP-only Cookies
- **Password Hashing**: bcrypt
- **Module System**: ES Modules (import/export)

## ✨ Features

- ✅ JWT-based authentication with HTTP-only cookies
- ✅ Role-based access control (Admin, User, Employee)
- ✅ Password reset via email
- ✅ Automatic employee assignment for bookings
- ✅ ETA generation (5-15 minutes)
- ✅ Centralized error handling
- ✅ Input validation
- ✅ Security best practices

---

## 🛠 Setup Instructions

### 1. Install Dependencies
```bash
cd Backend
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the Backend directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGO_URI=your_mongodb_connection_string

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Frontend URL (for password reset links)
FRONTEND_URL=http://localhost:5173
```

### 3. Start the Server

**Development Mode:**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

Server will run on: `http://localhost:3000`

---

## 🔐 Authentication

### Cookie-based Authentication
- JWT tokens are stored in HTTP-only cookies
- Automatically sent with each request
- Maximum security against XSS attacks

### Header-based Authentication (Alternative)
```
Authorization: Bearer <your-jwt-token>
```

---

## 👥 User Roles

| Role | Permissions |
|------|-------------|
| **admin** | Manage services, view all bookings, update booking status |
| **user** | Create bookings, view own bookings |
| **employee** | View assigned bookings, update booking status |

---

## 📡 API Endpoints

### Quick Reference

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| **Authentication** |
| POST | `/api/auth/signup/initiate` | Public | Initiate signup (send OTP) |
| POST | `/api/auth/signup/verify` | Public | Verify OTP & create account |
| POST | `/api/auth/login` | Public | Login user |
| POST | `/api/auth/logout` | Private | Logout user |
| POST | `/api/auth/forgot-password` | Public | Request password reset |
| PUT | `/api/auth/reset-password/:token` | Public | Reset password |
| GET | `/api/auth/me` | Private | Get current user |
| **Services** |
| GET | `/api/services` | Public | Get all services |
| GET | `/api/services/:id` | Public | Get service by ID |
| POST | `/api/services` | Admin | Create service |
| PUT | `/api/services/:id` | Admin | Update service |
| DELETE | `/api/services/:id` | Admin | Delete service |
| **Bookings** |
| POST | `/api/bookings` | User | Create booking |
| GET | `/api/bookings/my` | User | Get user's bookings |
| GET | `/api/bookings` | Admin | Get all bookings |
| GET | `/api/bookings/employee/assigned` | Employee | Get employee's bookings |
| GET | `/api/bookings/:id` | Private | Get booking by ID |
| PATCH | `/api/bookings/:id/status` | Employee/Admin | Update booking status |
| DELETE | `/api/bookings/:id` | User/Admin | Delete booking |

---

### 🔐 Authentication Routes

#### Step 1: Initiate Signup (Send OTP)
```http
POST /api/auth/signup/initiate
Content-Type: application/json

{
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP sent to your email",
  "expiresIn": "5 minutes"
}
```

**Error Response (400 - User Exists):**
```json
{
  "success": false,
  "message": "User already exists with this email"
}
```

**Error Response (400 - Missing Email):**
```json
{
  "success": false,
  "message": "Email is required"
}
```

**Error Response (500 - Email Failed):**
```json
{
  "success": false,
  "message": "Failed to send OTP email. Please try again."
}
```

---

#### Step 2: Verify OTP and Create Account
```http
POST /api/auth/signup/verify
Content-Type: application/json

{
  "email": "john@example.com",
  "otp": "123456",
  "name": "John Doe",
  "password": "securepass123",
  "role": "user"  // Optional: "admin", "user", "employee" (default: "user")
}
```

**Response:**
```json
{
  "success": true,
  "message": "Account created successfully",
  "user": {
    "id": "66abc123...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Error Response (400 - Invalid OTP):**
```json
{
  "success": false,
  "message": "Invalid OTP. Please try again."
}
```

**Error Response (400 - Expired OTP):**
```json
{
  "success": false,
  "message": "OTP has expired. Please request a new OTP."
}
```

**Error Response (400 - Missing Fields):**
```json
{
  "success": false,
  "message": "All fields are required (email, otp, name, password)"
}
```

---

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "66abc123...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Error Response (401 - Invalid Credentials):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

**Error Response (400 - Missing Fields):**
```json
{
  "success": false,
  "message": "Please provide email and password"
}
```

---

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

#### Forgot Password
```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset email sent successfully"
}
```

---

#### Reset Password
```http
PUT /api/auth/reset-password/:token
Content-Type: application/json

{
  "password": "newSecurePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset successful. You can now login with your new password."
}
```

**Error Response (400 - Invalid/Expired Token):**
```json
{
  "success": false,
  "message": "Invalid or expired reset token"
}
```

**Error Response (400 - Missing Password):**
```json
{
  "success": false,
  "message": "Please provide new password"
}
```

---

#### Get Current User Profile
```http
GET /api/auth/me
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "66abc123...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2026-02-13T10:30:00.000Z"
  }
}
```

---

### 🛠 Service Routes

#### Get All Services (Public)
```http
GET /api/services
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "services": [
    {
      "_id": "66abc456...",
      "title": "Plumbing",
      "description": "Professional plumbing services",
      "price": 500,
      "isActive": true,
      "createdAt": "2026-02-13T10:00:00.000Z"
    }
  ]
}
```

---

#### Get Service by ID (Public)
```http
GET /api/services/:id
```

**Response:**
```json
{
  "success": true,
  "service": {
    "_id": "66abc456...",
    "title": "Plumbing",
    "description": "Professional plumbing services",
    "price": 500,
    "isActive": true,
    "createdAt": "2026-02-13T10:00:00.000Z",
    "updatedAt": "2026-02-13T10:00:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Service not found"
}
```

---

#### Create Service (Admin Only)
```http
POST /api/services
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "title": "Electrician",
  "description": "Expert electrical services",
  "price": 600
}
```

**Response:**
```json
{
  "success": true,
  "message": "Service created successfully",
  "service": {
    "_id": "66abc789...",
    "title": "Electrician",
    "description": "Expert electrical services",
    "price": 600,
    "isActive": true
  }
}
```

---

#### Update Service (Admin Only)
```http
PUT /api/services/:id
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "price": 700,
  "description": "Updated description"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Service updated successfully",
  "service": {
    "_id": "66abc789...",
    "title": "Electrician",
    "description": "Updated description",
    "price": 700,
    "isActive": true,
    "createdAt": "2026-02-13T10:00:00.000Z",
    "updatedAt": "2026-02-13T11:30:00.000Z"
  }
}
```

---

#### Delete Service (Admin Only)
```http
DELETE /api/services/:id
Authorization: Bearer <admin-token>
```

**Response:**
```json
{
  "success": true,
  "message": "Service deleted successfully"
}
```

**Error Response (403 - Non-admin):**
```json
{
  "success": false,
  "message": "Access denied. Required role: admin"
}
```

---

### 📦 Booking Routes

#### Create Booking (User Only)
```http
POST /api/bookings
Authorization: Bearer <user-token>
Content-Type: application/json

{
  "serviceId": "66abc456...",
  "address": "123 Main St, City",
  "notes": "Please arrive before 5 PM"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "booking": {
    "_id": "66abc999...",
    "bookingId": "BK202602131A2B3C",
    "user": {
      "_id": "66abc123...",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "service": {
      "_id": "66abc456...",
      "title": "Plumbing",
      "description": "Professional plumbing services",
      "price": 500
    },
    "employee": {
      "_id": "66abc777...",
      "name": "Mike Worker",
      "email": "mike@example.com"
    },
    "status": "pending",
    "eta": 12,
    "address": "123 Main St, City",
    "notes": "Please arrive before 5 PM",
    "createdAt": "2026-02-13T11:00:00.000Z"
  }
}
```

---

#### Get My Bookings (User Only)
```http
GET /api/bookings/my
Authorization: Bearer <user-token>
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "bookings": [...]
}
```

---

#### Get All Bookings (Admin Only)
```http
GET /api/bookings?status=pending&page=1&limit=10
Authorization: Bearer <admin-token>
```

**Query Parameters:**
- `status` (optional): Filter by status (pending, confirmed, on_the_way, completed, cancelled)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**
```json
{
  "success": true,
  "count": 10,
  "total": 25,
  "totalPages": 3,
  "currentPage": 1,
  "bookings": [...]
}
```

---

#### Get Employee's Assigned Bookings (Employee Only)
```http
GET /api/bookings/employee/assigned
Authorization: Bearer <employee-token>
```

---

#### Update Booking Status (Employee/Admin Only)
```http
PATCH /api/bookings/:id/status
Authorization: Bearer <employee-token>
Content-Type: application/json

{
  "status": "confirmed"
}
```

**Valid Status Values:**
- `pending`
- `confirmed`
- `on_the_way`
- `completed`
- `cancelled`

**Response:**
```json
{
  "success": true,
  "message": "Booking status updated successfully",
  "booking": {...}
}
```

---

#### Get Booking by ID
```http
GET /api/bookings/:id
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "booking": {
    "_id": "66abc999...",
    "bookingId": "BK202602131A2B3C",
    "user": {
      "_id": "66abc123...",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "service": {
      "_id": "66abc456...",
      "title": "Plumbing",
      "description": "Professional plumbing services",
      "price": 500
    },
    "employee": {
      "_id": "66abc777...",
      "name": "Mike Worker",
      "email": "mike@example.com"
    },
    "status": "confirmed",
    "eta": 12,
    "address": "123 Main St, City",
    "notes": "Please arrive before 5 PM",
    "createdAt": "2026-02-13T11:00:00.000Z",
    "updatedAt": "2026-02-13T11:15:00.000Z"
  }
}
```

---

#### Delete Booking
```http
DELETE /api/bookings/:id
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Booking deleted successfully"
}
```

**Error Response (403 - Unauthorized):**
```json
{
  "success": false,
  "message": "Not authorized to delete this booking"
}
```

---

## 🔒 Security Features

1. **Password Hashing**: bcrypt with salt rounds
2. **JWT Authentication**: Secure token-based auth
3. **HTTP-only Cookies**: Protection against XSS
4. **Role-based Access Control**: Fine-grained permissions
5. **Input Validation**: Mongoose schema validation
6. **Error Handling**: Centralized error middleware
7. **Rate Limiting**: Ready to implement (express-rate-limit included)

---

## 📧 Email Templates

The system sends professional HTML emails for:
- Password reset requests with secure tokens
- Token expiry: 10 minutes

---

## 🧪 Testing the API

### Quick Start Testing

**1. Initiate Signup (Request OTP):**
```bash
curl -X POST http://localhost:3000/api/auth/signup/initiate \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com"}'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "OTP sent to your email",
  "expiresIn": "5 minutes"
}
```

**Note:** Check your email for the 6-digit OTP code.

---

**2. Verify OTP and Complete Signup:**
```bash
curl -X POST http://localhost:3000/api/auth/signup/verify \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "otp": "123456",
    "name": "John Doe",
    "password": "test123",
    "role": "user"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Account created successfully",
  "user": {
    "id": "67d1a2b3c4d5e6f7g8h9i0j1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

**3. Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"test123"}' \
  -c cookies.txt -v
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "67d1a2b3c4d5e6f7g8h9i0j1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

**3. Get Current User Profile:**
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -b cookies.txt
```

**Expected Response:**
```json
{
  "success": true,
  "user": {
    "id": "67d1a2b3c4d5e6f7g8h9i0j1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2026-02-13T10:30:00.000Z"
  }
}
```

---

### Complete Testing Workflow

#### Step 1: Create Test Users

**Create Admin:**
```bash
# Step 1: Request OTP
curl -X POST http://localhost:3000/api/auth/signup/initiate \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com"}'

# Step 2: Verify OTP and create account (check email for OTP)
curl -X POST http://localhost:3000/api/auth/signup/verify \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "otp": "YOUR_OTP_HERE",
    "name": "Admin User",
    "password": "admin123",
    "role": "admin"
  }'
```

**Create Employee:**
```bash
# Step 1: Request OTP
curl -X POST http://localhost:3000/api/auth/signup/initiate \
  -H "Content-Type: application/json" \
  -d '{"email":"worker@test.com"}'

# Step 2: Verify OTP and create account
curl -X POST http://localhost:3000/api/auth/signup/verify \
  -H "Content-Type: application/json" \
  -d '{
    "email": "worker@test.com",
    "otp": "YOUR_OTP_HERE",
    "name": "John Worker",
    "password": "worker123",
    "role": "employee"
  }'
```

**Create Second Employee:**
```bash
# Step 1: Request OTP
curl -X POST http://localhost:3000/api/auth/signup/initiate \
  -H "Content-Type: application/json" \
  -d '{"email":"sarah@test.com"}'

# Step 2: Verify OTP and create account
curl -X POST http://localhost:3000/api/auth/signup/verify \
  -H "Content-Type: application/json" \
  -d '{
    "email": "sarah@test.com",
    "otp": "YOUR_OTP_HERE",
    "name": "Sarah Employee",
    "password": "worker123",
    "role": "employee"
  }'
```

**Create Regular User:**
```bash
# Step 1: Request OTP
curl -X POST http://localhost:3000/api/auth/signup/initiate \
  -H "Content-Type: application/json" \
  -d '{"email":"customer@test.com"}'

# Step 2: Verify OTP and create account
curl -X POST http://localhost:3000/api/auth/signup/verify \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer@test.com",
    "otp": "YOUR_OTP_HERE",
    "name": "Jane Customer",
    "password": "customer123",
    "role": "user"
  }'
```

**Note:** You must check your email inbox for the OTP after each `/signup/initiate` request and replace `YOUR_OTP_HERE` with the actual 6-digit code.

---

#### Step 2: Admin Creates Services

**Login as Admin:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"admin123"}' \
  -c admin.txt
```

**Create Plumbing Service:**
```bash
curl -X POST http://localhost:3000/api/services \
  -H "Content-Type: application/json" \
  -b admin.txt \
  -d '{
    "title": "Plumbing",
    "description": "Professional plumbing services including repairs, installations, and maintenance",
    "price": 500
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Service created successfully",
  "service": {
    "_id": "67d2a3b4c5d6e7f8g9h0i1j2",
    "title": "Plumbing",
    "description": "Professional plumbing services including repairs, installations, and maintenance",
    "price": 500,
    "isActive": true,
    "createdAt": "2026-02-13T12:00:00.000Z",
    "updatedAt": "2026-02-13T12:00:00.000Z"
  }
}
```

**Create More Services:**
```bash
# Electrician Service
curl -X POST http://localhost:3000/api/services \
  -H "Content-Type: application/json" \
  -b admin.txt \
  -d '{
    "title": "Electrician",
    "description": "Expert electrical services for home and office installations",
    "price": 600
  }'

# Cleaning Service
curl -X POST http://localhost:3000/api/services \
  -H "Content-Type: application/json" \
  -b admin.txt \
  -d '{
    "title": "House Cleaning",
    "description": "Comprehensive house cleaning and sanitization",
    "price": 300
  }'

# AC Repair Service
curl -X POST http://localhost:3000/api/services \
  -H "Content-Type: application/json" \
  -b admin.txt \
  -d '{
    "title": "AC Repair",
    "description": "Air conditioning repair and maintenance services",
    "price": 450
  }'
```

**Get All Services (Public):**
```bash
curl -X GET http://localhost:3000/api/services
```

**Expected Response:**
```json
{
  "success": true,
  "count": 4,
  "services": [
    {
      "_id": "67d2a3b4c5d6e7f8g9h0i1j2",
      "title": "Plumbing",
      "description": "Professional plumbing services including repairs, installations, and maintenance",
      "price": 500,
      "isActive": true,
      "createdAt": "2026-02-13T12:00:00.000Z",
      "updatedAt": "2026-02-13T12:00:00.000Z"
    },
    {
      "_id": "67d2a3b4c5d6e7f8g9h0i1j3",
      "title": "Electrician",
      "description": "Expert electrical services for home and office installations",
      "price": 600,
      "isActive": true,
      "createdAt": "2026-02-13T12:01:00.000Z",
      "updatedAt": "2026-02-13T12:01:00.000Z"
    },
    {
      "_id": "67d2a3b4c5d6e7f8g9h0i1j4",
      "title": "House Cleaning",
      "description": "Comprehensive house cleaning and sanitization",
      "price": 300,
      "isActive": true,
      "createdAt": "2026-02-13T12:02:00.000Z",
      "updatedAt": "2026-02-13T12:02:00.000Z"
    },
    {
      "_id": "67d2a3b4c5d6e7f8g9h0i1j5",
      "title": "AC Repair",
      "description": "Air conditioning repair and maintenance services",
      "price": 450,
      "isActive": true,
      "createdAt": "2026-02-13T12:03:00.000Z",
      "updatedAt": "2026-02-13T12:03:00.000Z"
    }
  ]
}
```

---

#### Step 3: User Creates Bookings

**Login as User:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"customer@test.com","password":"customer123"}' \
  -c customer.txt
```

**Create First Booking (use actual service ID from step 2):**
```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -b customer.txt \
  -d '{
    "serviceId": "67d2a3b4c5d6e7f8g9h0i1j2",
    "address": "456 Oak Avenue, Apartment 3B, New York, NY 10001",
    "notes": "Kitchen sink is leaking. Please bring necessary tools."
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "booking": {
    "_id": "67d3a4b5c6d7e8f9g0h1i2j3",
    "bookingId": "BK20260213A1B2C3",
    "user": {
      "_id": "67d1a2b3c4d5e6f7g8h9i0j1",
      "name": "Jane Customer",
      "email": "customer@test.com"
    },
    "service": {
      "_id": "67d2a3b4c5d6e7f8g9h0i1j2",
      "title": "Plumbing",
      "description": "Professional plumbing services including repairs, installations, and maintenance",
      "price": 500
    },
    "employee": {
      "_id": "67d0a1b2c3d4e5f6g7h8i9j0",
      "name": "John Worker",
      "email": "worker@test.com"
    },
    "status": "pending",
    "eta": 12,
    "address": "456 Oak Avenue, Apartment 3B, New York, NY 10001",
    "notes": "Kitchen sink is leaking. Please bring necessary tools.",
    "createdAt": "2026-02-13T13:00:00.000Z",
    "updatedAt": "2026-02-13T13:00:00.000Z"
  }
}
```

**Create More Bookings:**
```bash
# Electrician Booking
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -b customer.txt \
  -d '{
    "serviceId": "67d2a3b4c5d6e7f8g9h0i1j3",
    "address": "789 Maple Street, Suite 5",
    "notes": "Need to install new light fixtures"
  }'

# Cleaning Booking
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -b customer.txt \
  -d '{
    "serviceId": "67d2a3b4c5d6e7f8g9h0i1j4",
    "address": "456 Oak Avenue, Apartment 3B"
  }'
```

**Get My Bookings:**
```bash
curl -X GET http://localhost:3000/api/bookings/my \
  -b customer.txt
```

**Expected Response:**
```json
{
  "success": true,
  "count": 3,
  "bookings": [
    {
      "_id": "67d3a4b5c6d7e8f9g0h1i2j5",
      "bookingId": "BK20260213X9Y8Z7",
      "service": {
        "_id": "67d2a3b4c5d6e7f8g9h0i1j4",
        "title": "House Cleaning",
        "description": "Comprehensive house cleaning and sanitization",
        "price": 300
      },
      "employee": {
        "_id": "67d0a1b2c3d4e5f6g7h8i9j1",
        "name": "Sarah Employee",
        "email": "sarah@test.com"
      },
      "status": "pending",
      "eta": 8,
      "address": "456 Oak Avenue, Apartment 3B",
      "createdAt": "2026-02-13T13:15:00.000Z",
      "updatedAt": "2026-02-13T13:15:00.000Z"
    },
    {
      "_id": "67d3a4b5c6d7e8f9g0h1i2j4",
      "bookingId": "BK20260213D4E5F6",
      "service": {
        "_id": "67d2a3b4c5d6e7f8g9h0i1j3",
        "title": "Electrician",
        "description": "Expert electrical services for home and office installations",
        "price": 600
      },
      "employee": {
        "_id": "67d0a1b2c3d4e5f6g7h8i9j0",
        "name": "John Worker",
        "email": "worker@test.com"
      },
      "status": "pending",
      "eta": 15,
      "address": "789 Maple Street, Suite 5",
      "notes": "Need to install new light fixtures",
      "createdAt": "2026-02-13T13:10:00.000Z",
      "updatedAt": "2026-02-13T13:10:00.000Z"
    },
    {
      "_id": "67d3a4b5c6d7e8f9g0h1i2j3",
      "bookingId": "BK20260213A1B2C3",
      "service": {
        "_id": "67d2a3b4c5d6e7f8g9h0i1j2",
        "title": "Plumbing",
        "description": "Professional plumbing services including repairs, installations, and maintenance",
        "price": 500
      },
      "employee": {
        "_id": "67d0a1b2c3d4e5f6g7h8i9j0",
        "name": "John Worker",
        "email": "worker@test.com"
      },
      "status": "pending",
      "eta": 12,
      "address": "456 Oak Avenue, Apartment 3B, New York, NY 10001",
      "notes": "Kitchen sink is leaking. Please bring necessary tools.",
      "createdAt": "2026-02-13T13:00:00.000Z",
      "updatedAt": "2026-02-13T13:00:00.000Z"
    }
  ]
}
```

---

#### Step 4: Employee Manages Bookings

**Login as Employee:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"worker@test.com","password":"worker123"}' \
  -c worker.txt
```

**Get Assigned Bookings:**
```bash
curl -X GET http://localhost:3000/api/bookings/employee/assigned \
  -b worker.txt
```

**Expected Response:**
```json
{
  "success": true,
  "count": 2,
  "bookings": [
    {
      "_id": "67d3a4b5c6d7e8f9g0h1i2j4",
      "bookingId": "BK20260213D4E5F6",
      "user": {
        "_id": "67d1a2b3c4d5e6f7g8h9i0j1",
        "name": "Jane Customer",
        "email": "customer@test.com"
      },
      "service": {
        "_id": "67d2a3b4c5d6e7f8g9h0i1j3",
        "title": "Electrician",
        "description": "Expert electrical services for home and office installations",
        "price": 600
      },
      "status": "pending",
      "eta": 15,
      "address": "789 Maple Street, Suite 5",
      "notes": "Need to install new light fixtures",
      "createdAt": "2026-02-13T13:10:00.000Z",
      "updatedAt": "2026-02-13T13:10:00.000Z"
    },
    {
      "_id": "67d3a4b5c6d7e8f9g0h1i2j3",
      "bookingId": "BK20260213A1B2C3",
      "user": {
        "_id": "67d1a2b3c4d5e6f7g8h9i0j1",
        "name": "Jane Customer",
        "email": "customer@test.com"
      },
      "service": {
        "_id": "67d2a3b4c5d6e7f8g9h0i1j2",
        "title": "Plumbing",
        "description": "Professional plumbing services including repairs, installations, and maintenance",
        "price": 500
      },
      "status": "pending",
      "eta": 12,
      "address": "456 Oak Avenue, Apartment 3B, New York, NY 10001",
      "notes": "Kitchen sink is leaking. Please bring necessary tools.",
      "createdAt": "2026-02-13T13:00:00.000Z",
      "updatedAt": "2026-02-13T13:00:00.000Z"
    }
  ]
}
```

**Update Booking to Confirmed:**
```bash
# Replace BOOKING_ID with actual ID
curl -X PATCH http://localhost:3000/api/bookings/67d3a4b5c6d7e8f9g0h1i2j3/status \
  -H "Content-Type: application/json" \
  -b worker.txt \
  -d '{"status":"confirmed"}'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Booking status updated successfully",
  "booking": {
    "_id": "67d3a4b5c6d7e8f9g0h1i2j3",
    "bookingId": "BK20260213A1B2C3",
    "user": {
      "_id": "67d1a2b3c4d5e6f7g8h9i0j1",
      "name": "Jane Customer",
      "email": "customer@test.com"
    },
    "service": {
      "_id": "67d2a3b4c5d6e7f8g9h0i1j2",
      "title": "Plumbing",
      "description": "Professional plumbing services including repairs, installations, and maintenance",
      "price": 500
    },
    "employee": {
      "_id": "67d0a1b2c3d4e5f6g7h8i9j0",
      "name": "John Worker",
      "email": "worker@test.com"
    },
    "status": "confirmed",
    "eta": 12,
    "address": "456 Oak Avenue, Apartment 3B, New York, NY 10001",
    "notes": "Kitchen sink is leaking. Please bring necessary tools.",
    "createdAt": "2026-02-13T13:00:00.000Z",
    "updatedAt": "2026-02-13T13:20:00.000Z"
  }
}
```

**Update Status Flow:**
```bash
# Update to on_the_way
curl -X PATCH http://localhost:3000/api/bookings/67d3a4b5c6d7e8f9g0h1i2j3/status \
  -H "Content-Type: application/json" \
  -b worker.txt \
  -d '{"status":"on_the_way"}'

# Update to completed
curl -X PATCH http://localhost:3000/api/bookings/67d3a4b5c6d7e8f9g0h1i2j3/status \
  -H "Content-Type: application/json" \
  -b worker.txt \
  -d '{"status":"completed"}'
```

---

#### Step 5: Admin Views All Data

**Get All Bookings (Admin):**
```bash
curl -X GET "http://localhost:3000/api/bookings?page=1&limit=10" \
  -b admin.txt
```

**Filter by Status:**
```bash
# Get pending bookings
curl -X GET "http://localhost:3000/api/bookings?status=pending" \
  -b admin.txt

# Get completed bookings
curl -X GET "http://localhost:3000/api/bookings?status=completed" \
  -b admin.txt
```

**Expected Response:**
```json
{
  "success": true,
  "count": 3,
  "total": 3,
  "totalPages": 1,
  "currentPage": 1,
  "bookings": [
    {
      "_id": "67d3a4b5c6d7e8f9g0h1i2j5",
      "bookingId": "BK20260213X9Y8Z7",
      "user": {
        "_id": "67d1a2b3c4d5e6f7g8h9i0j1",
        "name": "Jane Customer",
        "email": "customer@test.com"
      },
      "service": {
        "_id": "67d2a3b4c5d6e7f8g9h0i1j4",
        "title": "House Cleaning",
        "description": "Comprehensive house cleaning and sanitization",
        "price": 300
      },
      "employee": {
        "_id": "67d0a1b2c3d4e5f6g7h8i9j1",
        "name": "Sarah Employee",
        "email": "sarah@test.com"
      },
      "status": "pending",
      "eta": 8,
      "address": "456 Oak Avenue, Apartment 3B",
      "createdAt": "2026-02-13T13:15:00.000Z",
      "updatedAt": "2026-02-13T13:15:00.000Z"
    },
    {
      "_id": "67d3a4b5c6d7e8f9g0h1i2j4",
      "bookingId": "BK20260213D4E5F6",
      "user": {
        "_id": "67d1a2b3c4d5e6f7g8h9i0j1",
        "name": "Jane Customer",
        "email": "customer@test.com"
      },
      "service": {
        "_id": "67d2a3b4c5d6e7f8g9h0i1j3",
        "title": "Electrician",
        "description": "Expert electrical services for home and office installations",
        "price": 600
      },
      "employee": {
        "_id": "67d0a1b2c3d4e5f6g7h8i9j0",
        "name": "John Worker",
        "email": "worker@test.com"
      },
      "status": "pending",
      "eta": 15,
      "address": "789 Maple Street, Suite 5",
      "notes": "Need to install new light fixtures",
      "createdAt": "2026-02-13T13:10:00.000Z",
      "updatedAt": "2026-02-13T13:10:00.000Z"
    },
    {
      "_id": "67d3a4b5c6d7e8f9g0h1i2j3",
      "bookingId": "BK20260213A1B2C3",
      "user": {
        "_id": "67d1a2b3c4d5e6f7g8h9i0j1",
        "name": "Jane Customer",
        "email": "customer@test.com"
      },
      "service": {
        "_id": "67d2a3b4c5d6e7f8g9h0i1j2",
        "title": "Plumbing",
        "description": "Professional plumbing services including repairs, installations, and maintenance",
        "price": 500
      },
      "employee": {
        "_id": "67d0a1b2c3d4e5f6g7h8i9j0",
        "name": "John Worker",
        "email": "worker@test.com"
      },
      "status": "completed",
      "eta": 12,
      "address": "456 Oak Avenue, Apartment 3B, New York, NY 10001",
      "notes": "Kitchen sink is leaking. Please bring necessary tools.",
      "createdAt": "2026-02-13T13:00:00.000Z",
      "updatedAt": "2026-02-13T14:30:00.000Z"
    }
  ]
}
```

**Update Service (Admin):**
```bash
curl -X PUT http://localhost:3000/api/services/67d2a3b4c5d6e7f8g9h0i1j2 \
  -H "Content-Type: application/json" \
  -b admin.txt \
  -d '{
    "price": 550,
    "description": "Premium plumbing services with 24/7 support"
  }'
```

**Delete Service (Admin):**
```bash
curl -X DELETE http://localhost:3000/api/services/67d2a3b4c5d6e7f8g9h0i1j5 \
  -b admin.txt
```

---

### Error Response Examples

**401 Unauthorized (No Token):**
```json
{
  "success": false,
  "message": "Authentication token is required"
}
```

**403 Forbidden (Wrong Role):**
```json
{
  "success": false,
  "message": "Access denied. Required role: admin"
}
```

**404 Not Found:**
```json
{
  "success": false,
  "message": "Resource not found"
}
```

**400 Bad Request (Validation Error):**
```json
{
  "success": false,
  "message": "Email already exists"
}
```

**500 Server Error:**
```json
{
  "success": false,
  "message": "Server Error"
}
```

---

### Using Postman

1. Import the endpoints from this documentation
2. Use the Postman cookie manager for authentication
3. Or set `Authorization: Bearer <token>` header

**Postman Collection Structure:**
```
Instant Service Booking API
├── Auth
│   ├── Register User
│   ├── Register Admin
│   ├── Register Employee
│   ├── Login
│   ├── Logout
│   ├── Get Me
│   ├── Forgot Password
│   └── Reset Password
├── Services
│   ├── Get All Services
│   ├── Get Service by ID
│   ├── Create Service (Admin)
│   ├── Update Service (Admin)
│   └── Delete Service (Admin)
└── Bookings
    ├── Create Booking (User)
    ├── Get My Bookings (User)
    ├── Get All Bookings (Admin)
    ├── Get Employee Bookings (Employee)
    ├── Get Booking by ID
    ├── Update Booking Status (Employee)
    └── Delete Booking
```

---

## 📝 Database Models

### User Model
- name (String, required)
- email (String, unique, required)
- password (String, hashed, required)
- role (enum: admin, user, employee)
- resetPasswordToken (String)
- resetPasswordExpire (Date)
- timestamps

### Service Model
- title (String, unique, required)
- description (String)
- price (Number)
- isActive (Boolean)
- timestamps

### Booking Model
- bookingId (String, unique, uppercase)
- user (ObjectId → User)
- service (ObjectId → Service)
- employee (ObjectId → User with role=employee)
- status (enum: pending, confirmed, on_the_way, completed, cancelled)
- eta (Number, in minutes)
- address (String)
- notes (String)
- timestamps

---

## 🚀 Deployment Checklist

- [ ] Set `NODE_ENV=production` in .env
- [ ] Use strong JWT_SECRET
- [ ] Configure proper CORS origins
- [ ] Set up MongoDB Atlas or production DB
- [ ] Configure email service (Gmail, SendGrid, etc.)
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Set up logging (e.g., Winston)
- [ ] Add API documentation (Swagger)
- [ ] Configure monitoring (e.g., PM2)

---

## 📞 Support

For issues or questions, please contact the development team.

---

**Built with ❤️ using Node.js, Express, and MongoDB**

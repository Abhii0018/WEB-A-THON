# 🚀 Instant Service Booking System - Backend

A production-ready Node.js/Express backend for an instant service booking platform with JWT authentication, role-based access control, and automated employee assignment.

## ✨ Features

- ✅ **JWT Authentication** with HTTP-only cookies
- ✅ **Role-Based Access Control** (Admin, User, Employee)
- ✅ **Password Reset** via email with secure tokens
- ✅ **Automated Employee Assignment** for bookings
- ✅ **ETA Generation** (5-15 minutes)
- ✅ **Bcrypt Password Hashing**
- ✅ **Centralized Error Handling**
- ✅ **Input Validation** with Mongoose
- ✅ **ES Modules** (import/export)

## 🛠 Tech Stack

- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT** + **cookie-parser**
- **bcryptjs** for password hashing
- **Morgan** for logging

## 📦 Installation

```bash
# Install dependencies
npm install
```

## ⚙️ Configuration

The `.env` file is already configured. Update if needed:

```env
PORT=3000
NODE_ENV=development
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=http://localhost:5173
```

## 🚀 Running the Server

```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

Server runs on: **http://localhost:3000**

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/forgot-password` - Request password reset
- `PUT /api/auth/reset-password/:token` - Reset password
- `GET /api/auth/me` - Get current user profile

### Services
- `GET /api/services` - Get all services (Public)
- `GET /api/services/:id` - Get service by ID (Public)
- `POST /api/services` - Create service (Admin only)
- `PUT /api/services/:id` - Update service (Admin only)
- `DELETE /api/services/:id` - Delete service (Admin only)

### Bookings
- `POST /api/bookings` - Create booking (User only)
- `GET /api/bookings/my` - Get user's bookings (User only)
- `GET /api/bookings` - Get all bookings (Admin only)
- `GET /api/bookings/employee/assigned` - Get employee bookings (Employee only)
- `PATCH /api/bookings/:id/status` - Update booking status (Employee/Admin)
- `GET /api/bookings/:id` - Get booking by ID
- `DELETE /api/bookings/:id` - Delete booking

## 🧪 Quick Test

```bash
# Test server health
curl http://localhost:3000/

# Register a user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"test123","role":"user"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"test123"}' \
  -c cookies.txt

# Get services
curl http://localhost:3000/api/services
```

## 👥 User Roles

| Role | Description |
|------|-------------|
| **user** | Can create and view own bookings |
| **employee** | Can view assigned bookings and update status |
| **admin** | Full access to all features |

## 📖 Full Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete API documentation with examples.

## 🔒 Security Features

- Passwords hashed with bcrypt (10 salt rounds)
- JWT tokens stored in HTTP-only cookies
- Password reset tokens expire in 10 minutes
- Role-based route protection
- Mongoose schema validation

## 📝 Database Models

### User
- name, email (unique), password (hashed), role (admin/user/employee)
- resetPasswordToken, resetPasswordExpire

### Service
- title (unique), description, price, isActive

### Booking
- bookingId (unique), user, service, employee
- status (pending/confirmed/on_the_way/completed/cancelled)
- eta, address, notes

## 🐛 Troubleshooting

**Mail Server Error:**
The email warning is non-blocking. Update `EMAIL_USER` and `EMAIL_PASS` in `.env` with valid Gmail App Password (without spaces) to enable password reset emails.

**MongoDB Connection:**
Ensure your MongoDB URI is correct and your IP is whitelisted in MongoDB Atlas.

## 📄 License

ISC

---

**Built with ❤️ for WEB-A-THON 2026**

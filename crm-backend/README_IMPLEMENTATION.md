# CRM Backend - Implementation Guide

## Project Structure

```
crm-backend/
├── src/
│   ├── server.js                 # Express app entry point
│   ├── config/
│   │   ├── database.js           # Database configuration
│   │   └── constants.js          # Application constants
│   ├── routes/
│   │   └── auth.routes.js        # Authentication routes
│   ├── controllers/
│   │   └── auth.controller.js     # Authentication controllers
│   ├── services/
│   │   ├── auth.service.js       # Authentication business logic
│   │   ├── token.service.js      # JWT token generation/verification
│   │   └── encryption.service.js # Token encryption/decryption
│   ├── middleware/
│   │   ├── auth.middleware.js    # JWT authentication middleware
│   │   ├── validation.middleware.js # Request validation
│   │   └── error.middleware.js   # Error handling
│   └── models/
│       └── user.model.js         # User data model
├── package.json
├── .env.example
└── .gitignore
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd crm-backend
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

**Important:** Update these values in `.env`:
- `JWT_SECRET`: Generate a strong random secret key
- `ENCRYPTION_KEY`: Generate a 32-character key (or use the helper function)
- `PORT`: Server port (default: 3000)
- `CORS_ORIGIN`: Frontend URL

### 3. Generate Encryption Key (Optional)

You can generate a secure encryption key using Node.js:

```javascript
const crypto = require('crypto');
console.log(crypto.randomBytes(32).toString('base64'));
```

### 4. Start the Server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3000` (or your configured PORT).

## API Endpoints

### 1. Health Check
- **GET** `/health`
- Returns server status

### 2. Login
- **POST** `/auth/login`
- **Body:**
  ```json
  {
    "username": "admin",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "user": {
        "id": "1",
        "username": "admin",
        "email": "admin@pydahsoft.in",
        "role": "admin",
        "portals": ["admissions-crm", "student-portal", ...]
      },
      "tokens": {
        "accessToken": "eyJhbGc...",
        "refreshToken": "eyJhbGc..."
      }
    }
  }
  ```

### 3. Generate SSO Token
- **POST** `/auth/generate-token`
- **Headers:** `Authorization: Bearer <accessToken>`
- **Body:**
  ```json
  {
    "portalId": "admissions-crm"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Token generated successfully",
    "data": {
      "encryptedToken": "base64-encrypted-token",
      "portalId": "admissions-crm",
      "expiresIn": "15m"
    }
  }
  ```

### 4. Validate Credentials
- **POST** `/auth/validate-credentials`
- **Body:**
  ```json
  {
    "username": "admin",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Credentials are valid",
    "valid": true,
    "data": {
      "userId": "1",
      "username": "admin",
      "role": "admin"
    }
  }
  ```

### 5. Verify Token (for external portals)
- **POST** `/auth/verify-token`
- **Body:**
  ```json
  {
    "encryptedToken": "base64-encrypted-token"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "valid": true,
    "data": {
      "userId": "1",
      "portalId": "admissions-crm",
      "role": "admin",
      "expiresAt": "2026-01-27T13:00:00.000Z"
    }
  }
  ```

## Authentication Flow

1. **User Login:**
   - User sends credentials to `/auth/login`
   - Backend validates credentials
   - Returns access token and refresh token

2. **Portal Access:**
   - User clicks on a portal in CRM frontend
   - Frontend calls `/auth/generate-token` with portalId (requires access token)
   - Backend generates SSO token and encrypts it
   - Frontend receives encrypted token

3. **Portal Authentication:**
   - Frontend redirects to portal with encrypted token
   - Portal calls `/auth/verify-token` to decrypt and validate
   - Portal creates local session for user

## Security Features

- **JWT Tokens:** Secure token-based authentication
- **Token Encryption:** AES-256-GCM encryption for SSO tokens
- **Helmet:** Security headers
- **CORS:** Configured for frontend origin
- **Input Validation:** Express-validator for request validation
- **Error Handling:** Centralized error handling

## Development Notes

### Current Implementation Status

- ✅ Project structure created
- ✅ All routes implemented
- ✅ Authentication logic implemented
- ✅ Token generation and encryption
- ⚠️ **User model uses in-memory storage** (needs database integration)
- ⚠️ **Password validation is simplified** (needs bcrypt integration)

### Next Steps for Production

1. **Database Integration:**
   - Replace in-memory user storage with actual database
   - Implement proper user model with database queries
   - Add user management endpoints

2. **Password Security:**
   - Implement proper bcrypt password hashing
   - Remove temporary password validation

3. **Token Management:**
   - Implement token refresh mechanism
   - Add token revocation/blacklist (Redis recommended)
   - Add token rotation

4. **Logging:**
   - Add comprehensive logging (Winston/Pino)
   - Add audit logs for authentication attempts

5. **Testing:**
   - Add unit tests
   - Add integration tests
   - Add API endpoint tests

6. **Documentation:**
   - Add Swagger/OpenAPI documentation
   - Add API usage examples

## Testing the API

### Using cURL

**Login:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password123"}'
```

**Generate SSO Token:**
```bash
curl -X POST http://localhost:3000/auth/generate-token \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{"portalId":"admissions-crm"}'
```

### Using Postman

1. Import the endpoints
2. Set up environment variables
3. Test the authentication flow

## Troubleshooting

### Common Issues

1. **"JWT_SECRET is not configured"**
   - Make sure `.env` file exists and contains `JWT_SECRET`

2. **"Failed to encrypt token"**
   - Check `ENCRYPTION_KEY` in `.env` (should be 32 characters or base64 encoded)

3. **CORS errors**
   - Update `CORS_ORIGIN` in `.env` to match your frontend URL

4. **Port already in use**
   - Change `PORT` in `.env` or stop the process using the port

## Support

For issues or questions, refer to the main `readme.md` for project overview.

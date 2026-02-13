# Backend Assignment - User Management API

A RESTful API backend built with Node.js, Express, and MongoDB for managing user data with validation and error handling.

---

## Project Overview

This is a User Management API that provides CRUD operations for users with the following features:
- Create, Read, Update, and Delete users
- Input validation using Joi
- MongoDB integration with Mongoose
- Error handling middleware
- CORS support for frontend communication
- Structured response format

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.2.1
- **Database**: MongoDB with Mongoose 9.2.1
- **Validation**: Joi 18.0.2
- **CORS**: cors 2.8.6
- **Environment Management**: dotenv 17.3.1
- **Type**: ES Module

---

## Project Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation Steps

1. **Clone/Navigate to the project directory**
   ```bash
   cd Backend-Assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file in the root directory**
   ```bash
   touch .env
   ```

4. **Configure environment variables** (see [Environment Configuration](#environment-configuration))

5. **Start the server**
   ```bash
   node server.js
   ```
   The server will run on the configured PORT (default: check your .env)

---

## Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
MONGO_URI=mongodb://localhost:27017/your-database-name
PORT=5000
FRONTEND_URL=http://localhost:3000
```

**Configuration Details:**

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/users-db` or MongoDB Atlas URI |
| `PORT` | Server port number | `5000` |
| `FRONTEND_URL` | Frontend origin URL for CORS | `http://localhost:3000` |

---

## Database Schema

### User Model

The User model is stored in `models/user.models.js` with the following structure:

```javascript
{
  name: String (required, trimmed),
  email: String (required, unique, lowercase),
  phone: String (required),
  company: String (required),
  address: {
    city: String (required, trimmed),
    zipcode: String (required),
    geo: {
      lat: Number (required),
      lng: Number (required)
    }
  },
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Validation Rules

All user fields are validated using Joi schema:
- **name**: String, minimum 2 characters, trimmed
- **email**: Valid email format, lowercase
- **phone**: String, minimum 10 characters
- **company**: String, trimmed
- **address.city**: String, trimmed
- **address.zipcode**: String
- **address.geo.lat**: Number
- **address.geo.lng**: Number

---

## API Endpoints

All endpoints are prefixed with `/api/users`

### 1. Get All Users

**Endpoint:** `GET /api/users`

**Description:** Fetch all users from the database

**Request:**
```http
GET /api/users HTTP/1.1
Host: localhost:5000
```

**Response (200 - Success):**
```json
{
  "success": true,
  "message": "Users fetched successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "company": "Tech Corp",
      "address": {
        "city": "New York",
        "zipcode": "10001",
        "geo": {
          "lat": 40.7128,
          "lng": -74.0060
        }
      },
      "createdAt": "2024-02-13T10:30:00.000Z",
      "updatedAt": "2024-02-13T10:30:00.000Z"
    }
  ]
}
```

**Error Response (500 - Server Error):**
```json
{
  "success": false,
  "message": "Error message details",
  "data": null
}
```

---

### 2. Get User By ID

**Endpoint:** `GET /api/users/:id`

**Description:** Fetch a single user by their ID

**Request Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | ObjectId | MongoDB user ID |

**Request:**
```http
GET /api/users/507f1f77bcf86cd799439011 HTTP/1.1
Host: localhost:5000
```

**Response (200 - Success):**
```json
{
  "success": true,
  "message": "User fetched successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "company": "Tech Corp",
    "address": {
      "city": "New York",
      "zipcode": "10001",
      "geo": {
        "lat": 40.7128,
        "lng": -74.0060
      }
    },
    "createdAt": "2024-02-13T10:30:00.000Z",
    "updatedAt": "2024-02-13T10:30:00.000Z"
  }
}
```

**Error Response (400 - Invalid ID):**
```json
{
  "success": false,
  "message": "Invalid ID format",
  "data": null
}
```

**Error Response (404 - Not Found):**
```json
{
  "success": false,
  "message": "User not found",
  "data": null
}
```

**Error Response (500 - Server Error):**
```json
{
  "success": false,
  "message": "Error message details",
  "data": null
}
```

---

### 3. Create User

**Endpoint:** `POST /api/users`

**Description:** Create a new user with validation

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "9876543210",
  "company": "Innovation Inc",
  "address": {
    "city": "Los Angeles",
    "zipcode": "90001",
    "geo": {
      "lat": 34.0522,
      "lng": -118.2437
    }
  }
}
```

**Request:**
```http
POST /api/users HTTP/1.1
Host: localhost:5000
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "9876543210",
  "company": "Innovation Inc",
  "address": {
    "city": "Los Angeles",
    "zipcode": "90001",
    "geo": {
      "lat": 34.0522,
      "lng": -118.2437
    }
  }
}
```

**Response (201 - Created):**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "9876543210",
    "company": "Innovation Inc",
    "address": {
      "city": "Los Angeles",
      "zipcode": "90001",
      "geo": {
        "lat": 34.0522,
        "lng": -118.2437
      }
    },
    "createdAt": "2024-02-13T11:45:00.000Z",
    "updatedAt": "2024-02-13T11:45:00.000Z"
  }
}
```

**Error Response (400 - Validation Failed):**
```json
{
  "success": false,
  "message": "Validation failed",
  "data": [
    "\"name\" is required",
    "\"email\" must be a valid email",
    "\"address.city\" is required"
  ]
}
```

**Error Response (500 - Server Error):**
```json
{
  "success": false,
  "message": "Error message details",
  "data": null
}
```

---

### 4. Update User

**Endpoint:** `PUT /api/users/:id`

**Description:** Update an existing user by ID

**Request Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | ObjectId | MongoDB user ID |

**Request Body:** (All fields are optional, but if provided must be valid)
```json
{
  "name": "Jane Doe",
  "phone": "1111111111",
  "company": "Updated Company"
}
```

**Request:**
```http
PUT /api/users/507f1f77bcf86cd799439011 HTTP/1.1
Host: localhost:5000
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "phone": "1111111111",
  "company": "Updated Company",
  "address": {
    "city": "Chicago",
    "zipcode": "60601",
    "geo": {
      "lat": 41.8781,
      "lng": -87.6298
    }
  }
}
```

**Response (200 - Success):**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "phone": "1111111111",
    "company": "Updated Company",
    "address": {
      "city": "Chicago",
      "zipcode": "60601",
      "geo": {
        "lat": 41.8781,
        "lng": -87.6298
      }
    },
    "createdAt": "2024-02-13T10:30:00.000Z",
    "updatedAt": "2024-02-13T12:00:00.000Z"
  }
}
```

**Error Response (400 - Invalid ID):**
```json
{
  "success": false,
  "message": "Invalid ID format",
  "data": null
}
```

**Error Response (400 - Validation Failed):**
```json
{
  "success": false,
  "message": "Validation failed",
  "data": [
    "\"email\" must be a valid email",
    "\"phone\" length must be at least 7 characters long"
  ]
}
```

**Error Response (404 - Not Found):**
```json
{
  "success": false,
  "message": "User not found",
  "data": null
}
```

**Error Response (500 - Server Error):**
```json
{
  "success": false,
  "message": "Error message details",
  "data": null
}
```

---

### 5. Delete User

**Endpoint:** `DELETE /api/users/:id`

**Description:** Delete a user by ID

**Request Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | ObjectId | MongoDB user ID |

**Request:**
```http
DELETE /api/users/507f1f77bcf86cd799439011 HTTP/1.1
Host: localhost:5000
```

**Response (200 - Success):**
```json
{
  "success": true,
  "message": "User deleted successfully",
  "data": null
}
```

**Error Response (400 - Invalid ID):**
```json
{
  "success": false,
  "message": "Invalid ID format",
  "data": null
}
```

**Error Response (404 - Not Found):**
```json
{
  "success": false,
  "message": "User not found",
  "data": null
}
```

**Error Response (500 - Server Error):**
```json
{
  "success": false,
  "message": "Error message details",
  "data": null
}
```

---

## Error Handling

The API implements comprehensive error handling with the following status codes:

| Status Code | Description |
|------------|-------------|
| **200** | OK - Request successful |
| **201** | Created - User successfully created |
| **400** | Bad Request - Invalid ID format or validation failed |
| **404** | Not Found - User does not exist |
| **500** | Internal Server Error - Server-side error |

### Global Error Handler

All errors are handled by the global error handler middleware (`middlewares/globalErrorHandler.js`) which ensures consistent error responses across the API.

### Error Response Format

All error responses follow this structure:
```json
{
  "success": false,
  "message": "Error description",
  "data": null
}
```

For validation errors, the `data` field contains an array of detailed error messages:
```json
{
  "success": false,
  "message": "Validation failed",
  "data": [
    "error message 1",
    "error message 2"
  ]
}
```

---

## Project Structure

```
Backend-Assignment/
├── config/
│   ├── connectDB.js          # MongoDB connection setup
│   └── server.config.js      # Server configuration (PORT, MONGO_URI, FRONTEND_URL)
├── controllers/
│   └── user.contrllers.js    # User CRUD controller functions
├── middlewares/
│   └── globalErrorHandler.js # Global error handling middleware
├── models/
│   └── user.models.js        # User Mongoose schema
├── routes/
│   └── user.routes.js        # User API routes
├── utils/
│   ├── sendResponse.js       # Response formatting utility
│   └── validateUser.js       # Joi validation schema
├── .env                      # Environment variables (create this)
├── server.js                 # Express server setup and startup
├── package.json              # Project dependencies
└── README.md                 # Documentation
```

---

## Usage Example

### Using cURL

```bash
# Get all users
curl -X GET http://localhost:5000/api/users

# Get user by ID
curl -X GET http://localhost:5000/api/users/507f1f77bcf86cd799439011

# Create user
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "company": "Tech Corp",
    "address": {
      "city": "New York",
      "zipcode": "10001",
      "geo": {
        "lat": 40.7128,
        "lng": -74.0060
      }
    }
  }'

# Update user
curl -X PUT http://localhost:5000/api/users/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "phone": "9876543210"
  }'

# Delete user
curl -X DELETE http://localhost:5000/api/users/507f1f77bcf86cd799439011
```


## Additional Notes

- The API uses **Express.js middleware** for JSON parsing and CORS support
- **Validation** is performed using Joi schema on all POST and PUT requests
- **MongoDB ObjectId validation** is performed before database queries
- **Unique email constraint** is enforced at the database level
- **Timestamps** (createdAt, updatedAt) are automatically added by Mongoose

---


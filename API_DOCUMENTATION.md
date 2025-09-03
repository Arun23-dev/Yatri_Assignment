Assignment: NestJS Monorepo with Hub and Wallet Apps
Objective
Build a NestJS monorepo containing two applications:
Hub App – handles authentication, customers, bikes, assigning bikes to customers, and
basic charging sessions and transactions flow.
Wallet App – manages customer wallets, wallet queries, and transactions.
Both applications must use separate databases (via Prisma) and communicate using gRPC.
Requirements
1. Monorepo Setup
Use NestJS monorepo structure with two apps:
apps/hub
apps/wallet
Use Prisma ORM for database access.
Configure two separate databases, one for hub and one for wallet.
2. Hub App
Authentication:
Implement independent login flows for customers and sta

/admins using JWT.

Entities and APIs:
Customer Management (admin only) – create, view, update customers.
Bike Management (admin only) – create, view, update bikes.
Bike Assignment (admin only) – assign bikes to customers.
Wallet Creation:
On customer creation, automatically create a wallet for that customer by calling the
wallet app using gRPC.
Charging Flow (Simplified):
Instead of integrating real charging logic, seed sample charging sessions and
transactions.
Rest API to fetch charging sessions and transactions with pagination, filters and other
necessary things
Use gRPC to fetch wallet balance and transactions to show them via Hub APIs.
3. Wallet App
Entities and APIs:
Wallet – create wallet for a new customer (via gRPC).
Transactions – store and retrieve transactions (can be seeded).
Functionality:
Handle wallet balance updates and transaction recording.
Expose gRPC methods for:

1.

2.

Creating wallet
Deducting wallet balance
Fetching wallet details, transactions, and charging session data

4. Communication
Hub ↔ Wallet:
Use gRPC for all cross-app communication (wallet creation, fetching wallet info,
retrieving seeded charging sessions or transactions).
5. Customer Features
Customers should be able to:
Login and view their wallet balance, transactions, and charging sessions (from seeded
data via gRPC).
Technical Expectations
Use TypeScript, NestJS, Prisma, JWT Auth, and gRPC.
Maintain a clean folder structure, modular services, and follow best practices.
Use DTOs and Validation Pipes to validate input.
Seed sample data where appropriate.
Add basic API documentation using Swagger or similar.# 📚 YatriTask Hub API Documentation

## 🚀 Overview

The YatriTask Hub API is a comprehensive REST API for bike rental management. It provides authentication, user management, bike operations, and integrates with a Wallet microservice via gRPC.

## 🔗 Base URL

- **Development**: `http://localhost:3001`
- **Production**: `https://api.yatritask.com`

## 📖 Interactive Documentation

Visit our interactive Swagger documentation at: `http://localhost:3001/api`

## 🔐 Authentication

Most endpoints require JWT authentication. Include your JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Getting a JWT Token

1. **Register a new user**: `POST /auth/register`
2. **Login as user**: `POST /auth/login`
3. **Login as admin**: `POST /auth/login/admin`

## 👥 User Roles

- **CUSTOMER**: Can view own wallet, transactions, and charging sessions
- **ADMIN**: Full access to all APIs and user management
- **STAFF**: Limited admin access

## 📊 API Endpoints

### 🔐 Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "role": "CUSTOMER"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "role": "CUSTOMER",
    "createdAt": "2024-01-09T16:30:00.000Z",
    "updatedAt": "2024-01-09T16:30:00.000Z"
  },
  "statusCode": 201,
  "timestamp": "2024-01-09T16:30:00.000Z"
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "role": "CUSTOMER",
    "createdAt": "2024-01-09T16:30:00.000Z",
    "updatedAt": "2024-01-09T16:30:00.000Z"
  }
}
```

#### Login Admin
```http
POST /auth/login/admin
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "admin123"
}
```

#### Logout
```http
POST /auth/logout
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 👥 User Management Endpoints (Admin Only)

#### Create User
```http
POST /users
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@example.com",
  "password": "password123",
  "role": "CUSTOMER"
}
```

#### Get All Users (Paginated)
```http
GET /users?page=1&limit=10
Authorization: Bearer <admin_token>
```

#### Get User by ID
```http
GET /users/507f1f77bcf86cd799439011
Authorization: Bearer <admin_token>
```

#### Update User
```http
PATCH /users/507f1f77bcf86cd799439011
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "firstName": "Jane Updated",
  "email": "jane.updated@example.com"
}
```

#### Delete User
```http
DELETE /users/507f1f77bcf86cd799439011
Authorization: Bearer <admin_token>
```

### 🚴 Bike Management Endpoints

#### Create Bike (Admin Only)
```http
POST /bikes
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "serialNumber": "BIKE001",
  "model": "Mountain Bike Pro",
  "status": "AVAILABLE"
}
```

#### Get All Bikes
```http
GET /bikes
```

#### Get Bike by ID
```http
GET /bikes/507f1f77bcf86cd799439011
```

#### Update Bike Status (Admin Only)
```http
PUT /bikes/507f1f77bcf86cd799439011/status
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "MAINTENANCE"
}
```

#### Assign Bike to User (Admin Only)
```http
POST /bikes/507f1f77bcf86cd799439011/assign
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "userId": "507f1f77bcf86cd799439011"
}
```

#### Return Bike from User (Admin Only)
```http
POST /bikes/507f1f77bcf86cd799439011/return
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "userId": "507f1f77bcf86cd799439011"
}
```

#### Get Bikes by Status
```http
GET /bikes/status/AVAILABLE
```

### 💰 Wallet Operations

#### Get User Wallet
```http
GET /users/507f1f77bcf86cd799439011/wallet
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "walletId": "507f1f77bcf86cd799439011",
  "balance": 100.50,
  "userId": "507f1f77bcf86cd799439011",
  "customerName": "John Doe",
  "customerEmail": "john.doe@example.com",
  "message": "Wallet retrieved successfully"
}
```

#### Get User Transactions (Paginated)
```http
GET /users/507f1f77bcf86cd799439011/transactions?page=1&limit=10
Authorization: Bearer <token>
```

#### Get User Charging Sessions (Paginated)
```http
GET /users/507f1f77bcf86cd799439011/charging-sessions?page=1&limit=10
Authorization: Bearer <token>
```

### 👨‍💼 Admin Dashboard Endpoints

#### Get Admin Dashboard
```http
GET /admins/dashboard
Authorization: Bearer <admin_token>
```

#### List All Users
```http
GET /admins/users
Authorization: Bearer <admin_token>
```

#### Get User Details
```http
GET /admins/users/507f1f77bcf86cd799439011
Authorization: Bearer <admin_token>
```

## 🚨 Error Responses

### 400 Bad Request
```json
{
  "message": "Bad Request",
  "error": "Validation failed",
  "statusCode": 400,
  "timestamp": "2024-01-09T16:30:00.000Z"
}
```

### 401 Unauthorized
```json
{
  "message": "Unauthorized",
  "statusCode": 401,
  "timestamp": "2024-01-09T16:30:00.000Z"
}
```

### 403 Forbidden
```json
{
  "message": "Forbidden - Insufficient permissions",
  "statusCode": 403,
  "timestamp": "2024-01-09T16:30:00.000Z"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found",
  "statusCode": 404,
  "timestamp": "2024-01-09T16:30:00.000Z"
}
```

### 409 Conflict
```json
{
  "message": "User with this email already exists",
  "statusCode": 409,
  "timestamp": "2024-01-09T16:30:00.000Z"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error",
  "statusCode": 500,
  "timestamp": "2024-01-09T16:30:00.000Z"
}
```

## 📋 Data Models

### User Model
```typescript
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'CUSTOMER' | 'ADMIN' | 'STAFF';
  createdAt: Date;
  updatedAt: Date;
}
```

### Bike Model
```typescript
interface Bike {
  id: string;
  serialNumber: string;
  model: string;
  status: 'AVAILABLE' | 'ASSIGNED' | 'MAINTENANCE' | 'RETIRED';
  createdAt: Date;
  updatedAt: Date;
}
```

### Wallet Model
```typescript
interface Wallet {
  walletId: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  balance: number;
}
```

### Transaction Model
```typescript
interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: string;
  description: string;
  timestamp: Date;
}
```

### Charging Session Model
```typescript
interface ChargingSession {
  id: string;
  userId: string;
  bikeId: string;
  amount: number;
  startTime: Date;
  endTime: Date | null;
  status: string;
}
```

## 🔧 Pagination

Most list endpoints support pagination with the following query parameters:

- `page` (default: 1) - Page number
- `limit` (default: 10) - Items per page

**Example:**
```http
GET /users?page=2&limit=20
```

**Response:**
```json
{
  "users": [...],
  "total": 100,
  "page": 2,
  "limit": 20,
  "totalPages": 5,
  "hasNext": true,
  "hasPrev": true
}
```

## 🔌 gRPC Integration

The Hub API communicates with the Wallet microservice via gRPC for wallet operations:

- **Wallet Service**: `localhost:5000`
- **Protocol**: Protocol Buffers
- **Methods**: CreateWallet, GetWallet, DeductBalance, GetTransactions, GetChargingSessions

## 🧪 Testing

### Using cURL

#### Register a user:
```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Login and get token:
```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Use token for authenticated requests:
```bash
curl -X GET http://localhost:3001/users \
  -H "Authorization: Bearer <your_jwt_token>"
```

### Using Postman

1. Import the API collection from the Swagger documentation
2. Set up environment variables for base URL and tokens
3. Use the pre-request scripts to automatically handle authentication

## 🚀 Quick Start Examples

### 1. Create Admin User
```bash
# Register admin
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Admin",
    "lastName": "User",
    "email": "admin@example.com",
    "password": "admin123",
    "role": "ADMIN"
  }'
```

### 2. Login as Admin
```bash
curl -X POST http://localhost:3001/auth/login/admin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

### 3. Create a Bike
```bash
curl -X POST http://localhost:3001/bikes \
  -H "Authorization: Bearer <admin_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "serialNumber": "BIKE001",
    "model": "Mountain Bike Pro"
  }'
```

### 4. Create a Customer
```bash
curl -X POST http://localhost:3001/users \
  -H "Authorization: Bearer <admin_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Customer",
    "email": "customer@example.com",
    "password": "password123",
    "role": "CUSTOMER"
  }'
```

### 5. Assign Bike to Customer
```bash
curl -X POST http://localhost:3001/bikes/BIKE_ID/assign \
  -H "Authorization: Bearer <admin_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "CUSTOMER_ID"
  }'
```

## 📞 Support

For API support and questions:
- **Documentation**: http://localhost:3001/api
- **GitHub Issues**: [Repository Issues](https://github.com/your-repo/issues)
- **Email**: api-support@yatritask.com

---

**Note**: This documentation is for the Hub API. For Wallet microservice documentation, refer to the gRPC protocol definitions.

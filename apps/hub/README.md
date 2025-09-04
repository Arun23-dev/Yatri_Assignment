# 🚴‍♂️ YatriTask Hub App

A comprehensive NestJS application for bike rental management, customer authentication, and admin operations. This is the main application that handles all business logic and communicates with the Wallet microservice via gRPC.

## 📋 Features

### 🔐 Authentication & Authorization
- **Customer Authentication**: JWT-based login/registration for customers
- **Admin Authentication**: Separate admin login with full system access
- **Role-Based Access**: Different permissions for customers, admins, and staff
- **Token Management**: Secure JWT tokens with type-specific validation

### 👥 Customer Management
- **Customer Registration**: Create new customer accounts
- **Profile Management**: View and update customer profiles
- **Customer Search**: Search customers by name, email, or phone
- **Customer Analytics**: View customer activity and statistics

### 🚴 Bike Management
- **Bike Inventory**: Create, view, and manage bike inventory
- **Bike Status Tracking**: Track bikes (AVAILABLE, ASSIGNED, MAINTENANCE, RETIRED)
- **Bike Assignment**: Assign bikes to customers (admin only)
- **Bike Returns**: Process bike returns and update status

### ⚡ Charging Sessions
- **Session Management**: Start, end, and cancel charging sessions
- **Session Tracking**: Track active sessions per customer
- **Session Analytics**: Comprehensive reporting and statistics
- **Cost Calculation**: Automatic cost calculation based on duration

### 💰 Wallet Integration
- **Automatic Wallet Creation**: Creates wallet when customer registers
- **Balance Management**: View customer wallet balance via gRPC
- **Transaction History**: Fetch transaction history from Wallet service
- **Payment Processing**: Handle charging session payments

### 📊 Analytics & Reporting
- **Session Analytics**: Daily/monthly session statistics
- **Customer Analytics**: Customer activity and usage patterns
- **Bike Analytics**: Bike utilization and performance metrics
- **Financial Reports**: Revenue and transaction reports

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB database
- npm or yarn

### 1. Environment Setup

Create `.env` file in `apps/hub/`:
```env
DATABASE_URL="mongodb://localhost:27017/yatritask_hub"
JWT_SECRET="yatritask-super-secret-jwt-key-2024"
WALLET_GRPC_URL="localhost:5000"
```

### 2. Install Dependencies
```bash
cd apps/hub
npm install
```

### 3. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Create initial admin user
npx ts-node scripts/create-admin.ts

# Seed sample data
npx ts-node scripts/index.ts
```

### 4. Start the Application
```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

### 5. Access the Application
- **API Base URL**: http://localhost:3001
- **Swagger Documentation**: http://localhost:3001/api
- **Health Check**: http://localhost:3001/health

## 📚 API Documentation

### 🔐 Authentication Endpoints

#### Customer Authentication
```http
POST /auth/customer/login
Content-Type: application/json

{
  "email": "customer@example.com",
  "password": "password123"
}
```

#### Admin Authentication
```http
POST /auth/admin/login
Content-Type: application/json

{
  "email": "admin@yatritask.com",
  "password": "admin123"
}
```

### 👥 Customer Management (Admin Only)

#### Create Customer
```http
POST /customers
Authorization: Bearer <admin-jwt-token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "address": "123 Main St"
}
```

#### Get All Customers
```http
GET /customers?page=1&limit=10
Authorization: Bearer <admin-jwt-token>
```

#### Get Customer by ID
```http
GET /customers/:id
Authorization: Bearer <admin-jwt-token>
```

#### Update Customer
```http
PUT /customers/:id
Authorization: Bearer <admin-jwt-token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Smith",
  "phone": "+1234567890"
}
```

### 🚴 Bike Management (Admin Only)

#### Create Bike
```http
POST /bikes
Authorization: Bearer <admin-jwt-token>
Content-Type: application/json

{
  "serialNumber": "BIKE001",
  "model": "Mountain Bike",
  "status": "AVAILABLE"
}
```

#### Get All Bikes
```http
GET /bikes?page=1&limit=10
Authorization: Bearer <admin-jwt-token>
```

#### Assign Bike to Customer
```http
POST /bikes/assign
Authorization: Bearer <admin-jwt-token>
Content-Type: application/json

{
  "bikeId": "bike-id",
  "customerId": "customer-id"
}
```

#### Return Bike
```http
POST /bikes/return
Authorization: Bearer <admin-jwt-token>
Content-Type: application/json

{
  "bikeId": "bike-id"
}
```

### ⚡ Charging Sessions

#### Start Charging Session
```http
POST /charging-sessions/start
Authorization: Bearer <customer-jwt-token>
Content-Type: application/json

{
  "stationId": "station001",
  "connectorId": "connA"
}
```

#### End Charging Session
```http
POST /charging-sessions/:id/end
Authorization: Bearer <customer-jwt-token>
```

#### Get My Sessions (Customer)
```http
GET /charging-sessions/my-sessions
Authorization: Bearer <customer-jwt-token>
```

#### Get All Sessions (Admin)
```http
GET /charging-sessions/admin/all
Authorization: Bearer <admin-jwt-token>
```

#### Get Session Analytics
```http
GET /charging-sessions/analytics/summary
Authorization: Bearer <admin-jwt-token>
```

### 💰 Wallet Integration

#### Get Customer Wallet Info
```http
GET /customers/:id/wallet
Authorization: Bearer <admin-jwt-token>
```

## 🔧 Configuration

### Environment Variables
- `DATABASE_URL`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token signing
- `WALLET_GRPC_URL`: Wallet microservice gRPC URL

### Database Schema
- **Admin**: Admin user accounts
- **Customer**: Customer accounts and profiles
- **Bike**: Bike inventory and status
- **BikeAssignment**: Bike assignment tracking
- **ChargingSession**: Charging session records

## 🧪 Testing

### Default Credentials
- **Admin**: admin@yatritask.com / admin123
- **Customer**: john.customer@example.com / customer123

### Test Endpoints
```bash
# Test customer login
curl -X POST http://localhost:3001/auth/customer/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john.customer@example.com", "password": "customer123"}'

# Test admin login
curl -X POST http://localhost:3001/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@yatritask.com", "password": "admin123"}'
```

## 🚨 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   ```bash
   # Start MongoDB
   sudo systemctl start mongod
   sudo systemctl status mongod
   ```

2. **Port Already in Use**
   ```bash
   # Kill processes on port 3001
   sudo lsof -ti:3001 | xargs kill -9
   ```

3. **JWT Token Issues**
   - Ensure both Hub and Wallet apps use the same JWT_SECRET
   - Check token expiration (default: 24 hours)

4. **gRPC Connection Issues**
   - Ensure Wallet app is running on port 5000
   - Check WALLET_GRPC_URL environment variable

## 📊 Monitoring

The application includes comprehensive logging for:
- Authentication attempts
- Database operations
- gRPC communication
- Error handling
- Performance metrics

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt password encryption
- **Input Validation**: Comprehensive DTO validation
- **CORS Protection**: Cross-origin request protection
- **Rate Limiting**: API rate limiting (configurable)
- **SQL Injection Protection**: Prisma ORM protection

## 🤝 Contributing

1. Follow NestJS coding standards
2. Add tests for new features
3. Update documentation
4. Use conventional commits

## 📄 License

This project is part of the YatriTask bike rental management system.

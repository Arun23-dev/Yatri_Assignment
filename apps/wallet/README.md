# 💰 YatriTask Wallet App

A NestJS microservice for managing customer wallets, transactions, and financial operations. This service provides both REST API endpoints and gRPC services for seamless integration with the Hub application.

## 📋 Features

### 💳 Wallet Management
- **Wallet Creation**: Automatic wallet creation for new customers
- **Balance Management**: Real-time balance tracking and updates
- **Wallet Operations**: Credit, debit, and balance queries
- **Wallet Analytics**: Comprehensive wallet statistics and reporting

### 💰 Transaction Management
- **Transaction Recording**: Log all financial transactions
- **Transaction History**: Detailed transaction history with filtering
- **Transaction Types**: Support for credit, debit, and various payment methods
- **Transaction Linking**: Link transactions to charging sessions

### 🔐 Authentication & Security
- **JWT Authentication**: Secure token-based authentication
- **Customer Authorization**: Customer-specific wallet access
- **Admin Authorization**: Full admin control over all wallets
- **Token Validation**: Cross-service token verification

### 🌐 API Services
- **REST API**: HTTP endpoints for customer and admin operations
- **gRPC Service**: High-performance microservice communication
- **Swagger Documentation**: Interactive API documentation
- **Health Checks**: Service health monitoring

### 📊 Analytics & Reporting
- **Wallet Analytics**: Balance trends and transaction patterns
- **Customer Analytics**: Individual customer financial insights
- **Admin Dashboard**: Comprehensive financial reporting
- **Transaction Analytics**: Transaction volume and type analysis

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB database
- npm or yarn

### 1. Environment Setup

Create `.env` file in `apps/wallet/`:
```env
DATABASE_URL="mongodb://localhost:27017/yatritask_wallet"
JWT_SECRET="yatritask-super-secret-jwt-key-2024"
WALLET_GRPC_URL="localhost:5000"
WALLET_HTTP_PORT="3002"
```

### 2. Install Dependencies
```bash
cd apps/wallet
npm install
```

### 3. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed sample data
npm run seed
```

### 4. Start the Application
```bash
# Development mode (HTTP + gRPC)
npm run start:dev

# HTTP only
npm run start:http

# gRPC only
npm run start:grpc
```

### 5. Access the Application
- **HTTP API Base URL**: http://localhost:3002
- **Swagger Documentation**: http://localhost:3002/api
- **gRPC Service**: localhost:5000
- **Health Check**: http://localhost:3002/health

## 📚 API Documentation

### 🔐 Authentication

All customer endpoints require JWT authentication. Get a token from the Hub app:
```http
POST http://localhost:3001/auth/customer/login
Content-Type: application/json

{
  "email": "customer@example.com",
  "password": "password123"
}
```

### 💳 Customer Wallet APIs

#### Get Wallet Balance
```http
GET /customer/wallet/balance
Authorization: Bearer <customer-jwt-token>
```

**Response:**
```json
{
  "success": true,
  "balance": 150.75,
  "message": "Wallet balance retrieved successfully"
}
```

#### Get Wallet Summary
```http
GET /customer/wallet/summary
Authorization: Bearer <customer-jwt-token>
```

**Response:**
```json
{
  "success": true,
  "summary": {
    "walletId": "wallet_12345",
    "customerId": "customer_123",
    "balance": 150.75,
    "totalTransactions": 15,
    "totalCredits": 500.00,
    "totalDebits": 349.25,
    "lastTransactionDate": "2025-09-04T10:30:00Z"
  },
  "message": "Wallet summary retrieved successfully"
}
```

#### Add Funds to Wallet
```http
POST /customer/add-funds
Authorization: Bearer <customer-jwt-token>
Content-Type: application/json

{
  "amount": 100.00,
  "paymentMethod": "credit_card",
  "description": "Monthly top-up"
}
```

**Response:**
```json
{
  "success": true,
  "newBalance": 250.75,
  "transactionId": "txn_12345",
  "message": "Successfully added $100.00 via credit_card",
  "paymentMethod": "credit_card",
  "reference": "payment_credit_card_1756959928525"
}
```

#### Get Transaction History
```http
GET /customer/wallet/transactions?page=1&limit=10&type=debit
Authorization: Bearer <customer-jwt-token>
```

**Response:**
```json
{
  "success": true,
  "transactions": [
    {
      "id": "txn_12345",
      "amount": 25.50,
      "type": "debit",
      "description": "Charging session payment",
      "timestamp": "2025-09-04T10:30:00Z",
      "reference": "charging_session_001"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 15,
    "totalPages": 2
  }
}
```

#### Get Full Wallet Details
```http
GET /customer/wallet
Authorization: Bearer <customer-jwt-token>
```

### 👨‍💼 Admin Wallet APIs

#### Get All Wallets (Admin)
```http
GET /admin/wallets?page=1&limit=10
Authorization: Bearer <admin-jwt-token>
```

#### Get Customer Wallet (Admin)
```http
GET /admin/wallets/:customerId
Authorization: Bearer <admin-jwt-token>
```

#### Credit Customer Wallet (Admin)
```http
POST /admin/wallets/:customerId/credit
Authorization: Bearer <admin-jwt-token>
Content-Type: application/json

{
  "amount": 50.00,
  "description": "Admin credit",
  "reference": "admin_credit_001"
}
```

#### Debit Customer Wallet (Admin)
```http
POST /admin/wallets/:customerId/debit
Authorization: Bearer <admin-jwt-token>
Content-Type: application/json

{
  "amount": 25.00,
  "description": "Admin debit",
  "reference": "admin_debit_001"
}
```

#### Get All Transactions (Admin)
```http
GET /admin/transactions?page=1&limit=20&customerId=customer_123&type=credit
Authorization: Bearer <admin-jwt-token>
```

#### Delete Customer Wallet (Admin)
```http
DELETE /admin/wallets/:customerId
Authorization: Bearer <admin-jwt-token>
```

### 🔌 gRPC Service

The Wallet app exposes gRPC services for integration with the Hub app:

#### Create Wallet
```protobuf
rpc CreateWallet(CreateWalletRequest) returns (CreateWalletResponse);
```

#### Get Wallet Balance
```protobuf
rpc GetWalletBalance(GetWalletBalanceRequest) returns (GetWalletBalanceResponse);
```

#### Deduct Balance
```protobuf
rpc DeductBalance(DeductBalanceRequest) returns (DeductBalanceResponse);
```

#### Get Transactions
```protobuf
rpc GetTransactions(GetTransactionsRequest) returns (GetTransactionsResponse);
```

## 🔧 Configuration

### Environment Variables
- `DATABASE_URL`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token signing
- `WALLET_GRPC_URL`: gRPC service URL
- `WALLET_HTTP_PORT`: HTTP server port

### Database Schema
- **Wallet**: Customer wallet information
- **Transaction**: Financial transaction records

### Wallet Model
```typescript
{
  id: string;
  customerId: string; // Links to Hub Customer
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Transaction Model
```typescript
{
  id: string;
  walletId: string;
  customerId: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  reference?: string;
  chargingSessionId?: string; // Links to Hub charging session
  timestamp: Date;
}
```

## 🧪 Testing

### Test Customer APIs
```bash
# Get JWT token from Hub
TOKEN=$(curl -s -X POST http://localhost:3001/auth/customer/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john.customer@example.com", "password": "customer123"}' \
  | jq -r '.token')

# Test wallet balance
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3002/customer/wallet/balance

# Test add funds
curl -X POST http://localhost:3002/customer/add-funds \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"amount": 100, "paymentMethod": "credit_card", "description": "Test deposit"}'
```

### Test Admin APIs
```bash
# Get admin JWT token from Hub
ADMIN_TOKEN=$(curl -s -X POST http://localhost:3001/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@yatritask.com", "password": "admin123"}' \
  | jq -r '.token')

# Test admin wallet operations
curl -H "Authorization: Bearer $ADMIN_TOKEN" \
  http://localhost:3002/admin/wallets
```

## 🚨 Troubleshooting

### Common Issues

1. **JWT Token Required Error**
   ```bash
   # Ensure you're using a valid JWT token from Hub app
   # Check that both apps use the same JWT_SECRET
   ```

2. **MongoDB Connection Error**
   ```bash
   # Start MongoDB
   sudo systemctl start mongod
   sudo systemctl status mongod
   ```

3. **Port Already in Use**
   ```bash
   # Kill processes on ports 3002 and 5000
   sudo lsof -ti:3002 | xargs kill -9
   sudo lsof -ti:5000 | xargs kill -9
   ```

4. **gRPC Connection Issues**
   ```bash
   # Ensure gRPC service is running
   # Check WALLET_GRPC_URL environment variable
   ```

5. **Wallet Not Found**
   ```bash
   # Create wallet for customer
   npm run seed
   # Or use the create-wallet.js script
   node create-wallet.js
   ```

## 📊 Monitoring

The application includes comprehensive logging for:
- Wallet operations (create, update, delete)
- Transaction processing
- Authentication attempts
- gRPC communication
- Error handling
- Performance metrics

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Comprehensive DTO validation
- **CORS Protection**: Cross-origin request protection
- **Rate Limiting**: API rate limiting (configurable)
- **SQL Injection Protection**: Prisma ORM protection
- **Token Type Validation**: Customer vs Admin token validation

## 🔄 Integration with Hub App

The Wallet app integrates with the Hub app through:

1. **Automatic Wallet Creation**: Hub creates wallets when customers register
2. **Balance Deduction**: Hub deducts balance for charging sessions
3. **Balance Queries**: Hub fetches wallet balance and transaction history
4. **Transaction Linking**: Hub links charging sessions to wallet transactions

## 🤝 Contributing

1. Follow NestJS coding standards
2. Add tests for new features
3. Update documentation
4. Use conventional commits

## 📄 License

This project is part of the YatriTask bike rental management system.

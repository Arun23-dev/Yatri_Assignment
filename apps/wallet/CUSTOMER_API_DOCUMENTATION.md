# 🏦 Wallet App - Customer API Documentation

## Overview

The Customer API provides endpoints for customers to manage their wallets, add funds from third-party sources, and view their transaction history. This API is designed to be used by customers directly or by the Hub App via gRPC communication.

## 🔑 Role Permissions

| API | Customer | Admin |
|-----|----------|-------|
| AddFunds | ✅ (self) | ❌ |
| GetWallet | ✅ (self) | ❌ |
| GetWalletBalance | ✅ (self) | ❌ |
| GetTransactions | ✅ (self) | ❌ |
| GetWalletSummary | ✅ (self) | ❌ |

## 📋 API Endpoints

### 1. Add Funds to Wallet

**Endpoint:** `POST /customer/add-funds`

**Description:** Allows customers to add funds to their wallet from third-party sources like bank transfers, credit cards, etc.

**Request Body:**
```json
{
  "userId": "user123",
  "amount": 100.50,
  "paymentMethod": "credit_card",
  "reference": "bank_transfer_12345",
  "description": "Monthly top-up"
}
```

**Response:**
```json
{
  "success": true,
  "newBalance": 150.75,
  "transactionId": "txn_12345",
  "message": "Successfully added $100.50 via credit_card",
  "paymentMethod": "credit_card",
  "reference": "payment_credit_card_1703123456789"
}
```

**Payment Methods Supported:**
- `credit_card` - Credit card payments
- `bank_transfer` - Bank transfers
- `cash` - Cash deposits
- `upi` - UPI payments
- `paypal` - PayPal transfers
- `stripe` - Stripe payments

### 2. Get Wallet Balance

**Endpoint:** `GET /customer/wallet/:userId/balance`

**Description:** Retrieves the current balance of a customer wallet.

**Response:**
```json
{
  "success": true,
  "balance": 150.75,
  "message": "Wallet balance retrieved successfully"
}
```

### 3. Get Transaction History

**Endpoint:** `GET /customer/wallet/:userId/transactions`

**Query Parameters:**
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of transactions per page (default: 10)
- `type` (optional): Filter by transaction type (`credit` or `debit`)

**Response:**
```json
{
  "success": true,
  "transactions": [
    {
      "id": "txn_12345",
      "userId": "user123",
      "amount": 100.50,
      "type": "credit",
      "description": "Funds added via credit_card",
      "reference": "payment_credit_card_1703123456789",
      "timestamp": "2023-12-21T10:30:00.000Z"
    }
  ],
  "total": 25,
  "page": 1,
  "limit": 10,
  "message": "Transactions retrieved successfully"
}
```

### 4. Get Wallet Summary

**Endpoint:** `GET /customer/wallet/:userId/summary`

**Description:** Retrieves comprehensive wallet summary including balance, transaction statistics, and customer details.

**Response:**
```json
{
  "success": true,
  "summary": {
    "walletId": "wallet_12345",
    "userId": "user123",
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "balance": 150.75,
    "totalTransactions": 25,
    "totalCredits": 500.00,
    "totalDebits": 349.25,
    "lastTransactionDate": "2023-12-21T10:30:00.000Z"
  },
  "message": "Wallet summary retrieved successfully"
}
```

### 5. Get Wallet Details

**Endpoint:** `GET /customer/wallet/:userId`

**Description:** Retrieves basic wallet information for a customer.

**Response:**
```json
{
  "success": true,
  "walletId": "wallet_12345",
  "balance": 150.75,
  "userId": "user123",
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "message": "Wallet retrieved successfully"
}
```

## 🔧 gRPC Service

The Customer API also exposes gRPC methods for internal communication with the Hub App:

### CustomerService

```protobuf
service CustomerService {
  rpc AddFunds(AddFundsRequest) returns (AddFundsResponse);
  rpc GetWalletBalance(GetWalletBalanceRequest) returns (GetWalletBalanceResponse);
  rpc GetTransactions(GetTransactionsRequest) returns (GetTransactionsResponse);
  rpc GetWalletSummary(GetWalletSummaryRequest) returns (GetWalletSummaryResponse);
  rpc GetWallet(GetWalletRequest) returns (GetWalletResponse);
}
```

## 💰 Business Rules

### Fund Addition Rules:
1. **Amount Validation:** Amount must be greater than zero
2. **Wallet Existence:** Customer wallet must exist
3. **Transaction Recording:** All fund additions are recorded as credit transactions
4. **Reference Generation:** Automatic reference generation if not provided
5. **Payment Method Tracking:** Payment method is stored for audit purposes

### Security Rules:
1. **Self-Access Only:** Customers can only access their own wallet data
2. **Input Validation:** All inputs are validated using DTOs
3. **Error Handling:** Comprehensive error handling with meaningful messages

## 🚀 Usage Examples

### Adding Funds via Credit Card
```bash
curl -X POST http://localhost:3002/customer/add-funds \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "amount": 100.50,
    "paymentMethod": "credit_card",
    "description": "Monthly top-up"
  }'
```

### Getting Wallet Balance
```bash
curl http://localhost:3002/customer/wallet/user123/balance
```

### Getting Transaction History
```bash
curl "http://localhost:3002/customer/wallet/user123/transactions?page=1&limit=10&type=credit"
```

### Getting Wallet Summary
```bash
curl http://localhost:3002/customer/wallet/user123/summary
```

## 🔄 Integration with Hub App

The Customer API is designed to work seamlessly with the Hub App:

1. **Wallet Creation:** When a customer registers in the Hub App, a wallet is automatically created
2. **Fund Addition:** Customers can add funds through the Hub App's customer interface
3. **Balance Checking:** Hub App can check customer wallet balance before allowing services
4. **Transaction History:** Hub App can display customer transaction history
5. **Payment Processing:** Hub App can process payments and update wallet balance

## 📊 Error Responses

### Common Error Responses:

**Wallet Not Found (404):**
```json
{
  "success": false,
  "balance": 0,
  "message": "Wallet not found"
}
```

**Invalid Amount (400):**
```json
{
  "success": false,
  "newBalance": 0,
  "transactionId": "",
  "message": "Amount must be greater than zero"
}
```

**Failed Operation (500):**
```json
{
  "success": false,
  "message": "Failed to add funds"
}
```

## 🛠️ Setup and Configuration

### Prerequisites:
- Node.js 18+
- MongoDB
- Prisma CLI

### Installation:
```bash
cd apps/wallet
npm install
```

### Database Setup:
```bash
npx prisma generate
npx prisma db push
```

### Running the Service:
```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

### Seeding Sample Data:
```bash
npm run seed
```

## 🔍 Monitoring and Logging

The Customer API includes comprehensive logging:
- All API requests and responses
- Error details with stack traces
- Transaction creation logs
- Performance metrics

## 🔐 Security Considerations

1. **Authentication:** Implement JWT authentication for customer endpoints
2. **Authorization:** Ensure customers can only access their own data
3. **Input Sanitization:** All inputs are validated and sanitized
4. **Rate Limiting:** Implement rate limiting to prevent abuse
5. **Audit Trail:** All transactions are logged with timestamps

## 📈 Performance Optimization

1. **Database Indexing:** Proper indexes on userId and timestamp fields
2. **Pagination:** Efficient pagination for large transaction lists
3. **Caching:** Consider caching frequently accessed wallet balances
4. **Connection Pooling:** Optimized database connection management

---

**Note:** This API is designed to be secure, scalable, and maintainable. All endpoints follow RESTful conventions and include comprehensive error handling.

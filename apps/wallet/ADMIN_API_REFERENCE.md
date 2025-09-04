# 🏦 Wallet App - Complete Admin API Reference

## 📋 **ADMIN API SUMMARY**

The Wallet App provides **8 Admin APIs** for complete wallet and transaction management:

---

## 🔐 **1. WALLET MANAGEMENT APIs**

### **CreateWallet**
- **Purpose**: Create new wallet for any customer
- **Access**: Admin only
- **Parameters**: `userId`, `customerName`, `customerEmail`, `initialBalance`
- **Returns**: `walletId`, `balance`, `success`, `message`

### **GetWallet**
- **Purpose**: Retrieve wallet details for any customer
- **Access**: Admin only
- **Parameters**: `userId`
- **Returns**: Complete wallet details with customer info

### **DeleteWallet**
- **Purpose**: Delete wallet (only if balance is zero)
- **Access**: Admin only
- **Parameters**: `userId`
- **Returns**: `success`, `balance`, `canDelete`, `message`

---

## 💰 **2. BALANCE MANAGEMENT APIs**

### **CreditBalance**
- **Purpose**: Add funds to customer wallet
- **Access**: Admin only
- **Parameters**: `userId`, `amount`, `description`, `reference`
- **Returns**: `newBalance`, `transactionId`, `success`, `message`

### **DeductBalance**
- **Purpose**: Remove funds from customer wallet
- **Access**: Admin only
- **Parameters**: `userId`, `amount`, `description`, `reference`
- **Returns**: `newBalance`, `transactionId`, `success`, `message`

---

## 📊 **3. TRANSACTION MANAGEMENT APIs**

### **GetTransactions**
- **Purpose**: Get transaction history with filtering
- **Access**: Admin only
- **Parameters**: `userId`, `page`, `limit`, `type`
- **Returns**: `transactions[]`, `total`, `page`, `limit`, `success`

---

## 📈 **4. ANALYTICS & REPORTING APIs**

### **GetWalletBalance**
- **Purpose**: Get current balance for any customer
- **Access**: Admin only
- **Parameters**: `userId`
- **Returns**: `balance`, `success`, `message`

### **GetWalletSummary**
- **Purpose**: Get comprehensive wallet statistics
- **Access**: Admin only
- **Parameters**: `userId`
- **Returns**: Complete analytics with transaction counts and totals

---

## 🚀 **HOW TO IMPLEMENT**

### **1. Full Control Implementation**

```typescript
// Admin can create, view, modify, delete any wallet
const adminWalletControl = {
  // Create wallet for any customer
  createWallet: async (customerData) => {
    return await walletService.createWallet(customerData);
  },

  // View any customer's wallet
  getWallet: async (userId) => {
    return await walletService.getWallet({ userId });
  },

  // Delete wallet (with validation)
  deleteWallet: async (userId) => {
    return await walletService.deleteWallet({ userId });
  }
};
```

### **2. Balance Management Implementation**

```typescript
// Admin can credit/debit any customer's balance
const adminBalanceControl = {
  // Add funds to any customer
  creditBalance: async (userId, amount, description, reference) => {
    return await walletService.creditBalance({
      userId, amount, description, reference
    });
  },

  // Remove funds from any customer
  deductBalance: async (userId, amount, description, reference) => {
    return await walletService.deductBalance({
      userId, amount, description, reference
    });
  }
};
```

### **3. Transaction History Implementation**

```typescript
// Admin can view all transactions with filtering
const adminTransactionControl = {
  // Get all transactions for any customer
  getTransactions: async (userId, page = 1, limit = 10, type = null) => {
    return await walletService.getTransactions({
      userId, page, limit, type
    });
  },

  // Filter by transaction type
  getCreditTransactions: async (userId) => {
    return await walletService.getTransactions({
      userId, type: 'credit'
    });
  },

  getDebitTransactions: async (userId) => {
    return await walletService.getTransactions({
      userId, type: 'debit'
    });
  }
};
```

### **4. Analytics Implementation**

```typescript
// Admin can access comprehensive analytics
const adminAnalytics = {
  // Get balance for any customer
  getBalance: async (userId) => {
    return await walletService.getWalletBalance({ userId });
  },

  // Get complete wallet summary
  getSummary: async (userId) => {
    return await walletService.getWalletSummary({ userId });
  },

  // System-wide analytics
  getSystemAnalytics: async () => {
    // Custom implementation for system-wide stats
    const wallets = await prisma.wallet.findMany();
    const transactions = await prisma.transaction.findMany();
    
    return {
      totalWallets: wallets.length,
      totalBalance: wallets.reduce((sum, w) => sum + w.balance, 0),
      totalTransactions: transactions.length,
      // ... more analytics
    };
  }
};
```

### **5. Bulk Operations Implementation**

```typescript
// Admin can perform bulk operations
const adminBulkOperations = {
  // Bulk wallet creation
  bulkCreateWallets: async (customers) => {
    const results = [];
    for (const customer of customers) {
      const result = await walletService.createWallet(customer);
      results.push({ userId: customer.userId, ...result });
    }
    return results;
  },

  // Bulk balance operations
  bulkCreditBalance: async (operations) => {
    const results = [];
    for (const operation of operations) {
      const result = await walletService.creditBalance(operation);
      results.push({ userId: operation.userId, ...result });
    }
    return results;
  },

  // Bulk balance deductions
  bulkDeductBalance: async (operations) => {
    const results = [];
    for (const operation of operations) {
      const result = await walletService.deductBalance(operation);
      results.push({ userId: operation.userId, ...result });
    }
    return results;
  }
};
```

---

## 📋 **API DOCUMENTATION FORMAT**

### **Standard API Documentation Template**

```markdown
## [API Name]

### **Endpoint**
- **Method**: `[gRPC Method Name]`
- **Service**: `WalletService`
- **Access**: Admin Only

### **Purpose**
[Brief description of what the API does]

### **Request Parameters**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | string | ✅ | Customer's unique identifier |
| `amount` | number | ✅ | Amount for balance operations |
| `description` | string | ✅ | Transaction description |
| `reference` | string | ❌ | External reference ID |

### **Response Format**
```json
{
  "success": true,
  "walletId": "68b82a54fd677a77b25ab5ea",
  "balance": 150.0,
  "message": "Operation completed successfully"
}
```

### **Usage Examples**

#### **Basic Usage**
```typescript
const response = await walletService.methodName({
  userId: 'customer_123',
  amount: 50.0,
  description: 'Manual operation'
});
```

#### **Advanced Usage**
```typescript
const response = await walletService.methodName({
  userId: 'customer_123',
  amount: 25.0,
  description: 'Refund for cancelled session',
  reference: 'refund_session_001'
});
```

### **Error Responses**
| Error Code | Description | HTTP Status |
|------------|-------------|-------------|
| `WALLET_NOT_FOUND` | Customer wallet doesn't exist | 404 |
| `INSUFFICIENT_BALANCE` | Not enough balance for deduction | 400 |
| `INVALID_AMOUNT` | Amount must be positive | 400 |
| `WALLET_EXISTS` | Wallet already exists for customer | 409 |

### **Business Rules**
- ✅ Amount must be positive
- ✅ Wallet must exist for customer
- ✅ Transaction is recorded with timestamp
- ✅ Balance is updated atomically
- ✅ Reference is optional but recommended for tracking
```

---

## 🎯 **IMPLEMENTATION CHECKLIST**

### **✅ Admin Features Implemented**
- [x] **Full Control**: Create, view, modify, delete any wallet
- [x] **Balance Management**: Credit/debit any customer's balance
- [x] **Transaction History**: View all transactions with filtering
- [x] **Analytics**: Comprehensive reporting and statistics
- [x] **Bulk Operations**: Manage multiple customers efficiently

### **✅ Security Features**
- [x] Admin authentication required
- [x] Input validation for all parameters
- [x] Transaction logging for audit trails
- [x] Balance validation for deletions
- [x] Error handling and rollback mechanisms

### **✅ Business Rules**
- [x] Wallets can only be deleted if balance is zero
- [x] All balance operations create transaction records
- [x] External references for transaction tracking
- [x] Pagination for large transaction lists
- [x] Type filtering for transactions

---

## 🚀 **READY TO USE**

The Wallet App provides complete admin control with:

- **8 Admin APIs** for full system management
- **Bulk operations** for efficient customer management
- **Comprehensive analytics** for business insights
- **Transaction tracking** with external references
- **Security controls** ensuring proper access levels
- **Complete documentation** with examples and templates

All APIs are exposed via **gRPC protocol** and ready for integration! 🎉

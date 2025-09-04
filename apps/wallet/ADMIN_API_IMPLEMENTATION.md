# 🏦 Wallet App - Admin API Implementation Guide

## Overview

This guide shows how to implement **Admin APIs** for full wallet control, including bulk operations and comprehensive analytics.

---

## 🔐 **ADMIN API ENDPOINTS**

### **1. Wallet Management APIs**

#### **Create Wallet**
```typescript
// gRPC Method: CreateWallet
const createWallet = async (data: {
  userId: string;
  customerName: string;
  customerEmail: string;
  initialBalance?: number;
}) => {
  const response = await walletService.createWallet(data);
  return response;
};

// Usage Example
const newWallet = await createWallet({
  userId: 'customer_123',
  customerName: 'John Doe',
  customerEmail: 'john@example.com',
  initialBalance: 100.0
});
```

#### **Get Wallet Details**
```typescript
// gRPC Method: GetWallet
const getWallet = async (userId: string) => {
  const response = await walletService.getWallet({ userId });
  return response;
};

// Usage Example
const wallet = await getWallet('customer_123');
console.log('Wallet Balance:', wallet.balance);
console.log('Customer Name:', wallet.customerName);
```

#### **Delete Wallet**
```typescript
// gRPC Method: DeleteWallet
const deleteWallet = async (userId: string) => {
  const response = await walletService.deleteWallet({ userId });
  return response;
};

// Usage Example
const result = await deleteWallet('customer_123');
if (result.success) {
  console.log('Wallet deleted successfully');
} else {
  console.log('Cannot delete - balance not zero:', result.balance);
}
```

### **2. Balance Management APIs**

#### **Credit Balance**
```typescript
// gRPC Method: CreditBalance
const creditBalance = async (data: {
  userId: string;
  amount: number;
  description: string;
  reference?: string;
}) => {
  const response = await walletService.creditBalance(data);
  return response;
};

// Usage Examples
// Top-up customer balance
await creditBalance({
  userId: 'customer_123',
  amount: 50.0,
  description: 'Manual top-up',
  reference: 'admin_topup_001'
});

// Refund customer
await creditBalance({
  userId: 'customer_123',
  amount: 25.0,
  description: 'Service refund',
  reference: 'refund_001'
});
```

#### **Deduct Balance**
```typescript
// gRPC Method: DeductBalance
const deductBalance = async (data: {
  userId: string;
  amount: number;
  description: string;
  reference?: string;
}) => {
  const response = await walletService.deductBalance(data);
  return response;
};

// Usage Examples
// Service fee
await deductBalance({
  userId: 'customer_123',
  amount: 5.0,
  description: 'Service fee',
  reference: 'service_fee_001'
});

// Penalty
await deductBalance({
  userId: 'customer_123',
  amount: 10.0,
  description: 'Late return penalty',
  reference: 'penalty_001'
});
```

### **3. Transaction Management APIs**

#### **Get Transactions with Filtering**
```typescript
// gRPC Method: GetTransactions
const getTransactions = async (data: {
  userId: string;
  page?: number;
  limit?: number;
  type?: string; // 'credit' or 'debit'
}) => {
  const response = await walletService.getTransactions(data);
  return response;
};

// Usage Examples
// Get all transactions
const allTransactions = await getTransactions({
  userId: 'customer_123',
  page: 1,
  limit: 20
});

// Get only credit transactions
const creditTransactions = await getTransactions({
  userId: 'customer_123',
  type: 'credit',
  page: 1,
  limit: 10
});

// Get only debit transactions
const debitTransactions = await getTransactions({
  userId: 'customer_123',
  type: 'debit',
  page: 1,
  limit: 10
});
```

### **4. Analytics & Reporting APIs**

#### **Get Wallet Balance**
```typescript
// gRPC Method: GetWalletBalance
const getWalletBalance = async (userId: string) => {
  const response = await walletService.getWalletBalance({ userId });
  return response;
};

// Usage Example
const balance = await getWalletBalance('customer_123');
console.log('Current Balance:', balance.balance);
```

#### **Get Wallet Summary**
```typescript
// gRPC Method: GetWalletSummary
const getWalletSummary = async (userId: string) => {
  const response = await walletService.getWalletSummary({ userId });
  return response;
};

// Usage Example
const summary = await getWalletSummary('customer_123');
console.log('Total Transactions:', summary.summary.totalTransactions);
console.log('Total Credits:', summary.summary.totalCredits);
console.log('Total Debits:', summary.summary.totalDebits);
console.log('Last Transaction:', summary.summary.lastTransactionDate);
```

---

## 📊 **BULK OPERATIONS**

### **Bulk Wallet Creation**
```typescript
const bulkCreateWallets = async (customers: Array<{
  userId: string;
  customerName: string;
  customerEmail: string;
  initialBalance?: number;
}>) => {
  const results = [];
  
  for (const customer of customers) {
    try {
      const result = await walletService.createWallet(customer);
      results.push({
        userId: customer.userId,
        success: result.success,
        walletId: result.walletId,
        message: result.message
      });
    } catch (error) {
      results.push({
        userId: customer.userId,
        success: false,
        walletId: '',
        message: error.message
      });
    }
  }
  
  return results;
};

// Usage Example
const customers = [
  { userId: 'cust_001', customerName: 'Alice', customerEmail: 'alice@example.com', initialBalance: 50.0 },
  { userId: 'cust_002', customerName: 'Bob', customerEmail: 'bob@example.com', initialBalance: 100.0 },
  { userId: 'cust_003', customerName: 'Charlie', customerEmail: 'charlie@example.com', initialBalance: 75.0 }
];

const bulkResults = await bulkCreateWallets(customers);
console.log('Bulk creation results:', bulkResults);
```

### **Bulk Balance Operations**
```typescript
const bulkCreditBalance = async (operations: Array<{
  userId: string;
  amount: number;
  description: string;
  reference?: string;
}>) => {
  const results = [];
  
  for (const operation of operations) {
    try {
      const result = await walletService.creditBalance(operation);
      results.push({
        userId: operation.userId,
        success: result.success,
        newBalance: result.newBalance,
        transactionId: result.transactionId,
        message: result.message
      });
    } catch (error) {
      results.push({
        userId: operation.userId,
        success: false,
        newBalance: 0,
        transactionId: '',
        message: error.message
      });
    }
  }
  
  return results;
};

// Usage Example
const creditOperations = [
  { userId: 'cust_001', amount: 25.0, description: 'Bonus credit', reference: 'bonus_001' },
  { userId: 'cust_002', amount: 50.0, description: 'Top-up', reference: 'topup_001' }
];

const bulkCreditResults = await bulkCreditBalance(creditOperations);
console.log('Bulk credit results:', bulkCreditResults);
```

---

## 📈 **COMPREHENSIVE ANALYTICS**

### **System-Wide Analytics**
```typescript
const getSystemAnalytics = async () => {
  // Get all wallets
  const wallets = await prisma.wallet.findMany();
  
  // Calculate system statistics
  const totalWallets = wallets.length;
  const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.balance, 0);
  const averageBalance = totalBalance / totalWallets;
  
  // Get transaction statistics
  const [totalTransactions, totalCredits, totalDebits] = await Promise.all([
    prisma.transaction.count(),
    prisma.transaction.aggregate({
      where: { type: 'credit' },
      _sum: { amount: true }
    }),
    prisma.transaction.aggregate({
      where: { type: 'debit' },
      _sum: { amount: true }
    })
  ]);
  
  return {
    totalWallets,
    totalBalance,
    averageBalance,
    totalTransactions,
    totalCredits: totalCredits._sum.amount || 0,
    totalDebits: totalDebits._sum.amount || 0,
    netFlow: (totalCredits._sum.amount || 0) - (totalDebits._sum.amount || 0)
  };
};

// Usage Example
const systemStats = await getSystemAnalytics();
console.log('System Analytics:', systemStats);
```

### **Customer Analytics Dashboard**
```typescript
const getCustomerAnalytics = async (userId: string) => {
  const wallet = await prisma.wallet.findUnique({
    where: { userId },
    include: {
      transactions: {
        orderBy: { timestamp: 'desc' }
      }
    }
  });
  
  if (!wallet) {
    throw new Error('Wallet not found');
  }
  
  // Calculate transaction statistics
  const transactions = wallet.transactions;
  const creditTransactions = transactions.filter(t => t.type === 'credit');
  const debitTransactions = transactions.filter(t => t.type === 'debit');
  
  // Calculate monthly trends
  const monthlyStats = await prisma.transaction.groupBy({
    by: ['type'],
    where: { userId },
    _sum: { amount: true },
    _count: { id: true }
  });
  
  return {
    walletId: wallet.id,
    customerName: wallet.customerName,
    currentBalance: wallet.balance,
    totalTransactions: transactions.length,
    creditTransactions: creditTransactions.length,
    debitTransactions: debitTransactions.length,
    totalCredits: creditTransactions.reduce((sum, t) => sum + t.amount, 0),
    totalDebits: debitTransactions.reduce((sum, t) => sum + t.amount, 0),
    monthlyStats,
    recentTransactions: transactions.slice(0, 10)
  };
};

// Usage Example
const customerAnalytics = await getCustomerAnalytics('customer_123');
console.log('Customer Analytics:', customerAnalytics);
```

---

## 📋 **ADMIN API DOCUMENTATION FORMAT**

### **API Endpoint Template**
```markdown
## [API Name]

### **Endpoint**
- **Method**: `[gRPC Method Name]`
- **Service**: `WalletService`
- **Access**: Admin Only

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

### **Usage Example**
```typescript
const response = await walletService.methodName({
  userId: 'customer_123',
  amount: 50.0,
  description: 'Manual top-up'
});
```

### **Error Responses**
| Error Code | Description |
|------------|-------------|
| `WALLET_NOT_FOUND` | Customer wallet doesn't exist |
| `INSUFFICIENT_BALANCE` | Not enough balance for deduction |
| `INVALID_AMOUNT` | Amount must be positive |
| `WALLET_EXISTS` | Wallet already exists for customer |
```

### **Complete API Documentation Example**
```markdown
## Credit Balance

### **Endpoint**
- **Method**: `CreditBalance`
- **Service**: `WalletService`
- **Access**: Admin Only

### **Purpose**
Add funds to a customer's wallet balance.

### **Request Parameters**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | string | ✅ | Customer's unique identifier |
| `amount` | number | ✅ | Amount to credit (must be positive) |
| `description` | string | ✅ | Transaction description |
| `reference` | string | ❌ | External reference for tracking |

### **Response Format**
```json
{
  "success": true,
  "newBalance": 175.0,
  "transactionId": "68b82a54fd677a77b25ab5eb",
  "message": "Balance credited successfully"
}
```

### **Usage Examples**

#### **Basic Credit**
```typescript
const response = await walletService.creditBalance({
  userId: 'customer_123',
  amount: 50.0,
  description: 'Manual top-up'
});
```

#### **Credit with Reference**
```typescript
const response = await walletService.creditBalance({
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
| `INVALID_AMOUNT` | Amount must be positive | 400 |
| `DATABASE_ERROR` | Database operation failed | 500 |

### **Business Rules**
- ✅ Amount must be positive
- ✅ Wallet must exist for customer
- ✅ Transaction is recorded with timestamp
- ✅ Balance is updated atomically
- ✅ Reference is optional but recommended for tracking
```

---

## 🚀 **IMPLEMENTATION CHECKLIST**

### **Admin Features to Implement**
- [ ] **Wallet Management**
  - [ ] Create wallet for any customer
  - [ ] View wallet details
  - [ ] Delete wallet (with balance validation)
- [ ] **Balance Management**
  - [ ] Credit balance with transaction tracking
  - [ ] Deduct balance with validation
  - [ ] Bulk balance operations
- [ ] **Transaction Management**
  - [ ] View all transactions with filtering
  - [ ] Pagination support
  - [ ] Transaction type filtering
- [ ] **Analytics & Reporting**
  - [ ] Individual customer analytics
  - [ ] System-wide statistics
  - [ ] Monthly/quarterly reports
- [ ] **Bulk Operations**
  - [ ] Bulk wallet creation
  - [ ] Bulk balance operations
  - [ ] Batch transaction processing

### **Security Considerations**
- [ ] Admin authentication required
- [ ] Input validation for all parameters
- [ ] Transaction logging for audit trails
- [ ] Rate limiting for bulk operations
- [ ] Error handling and rollback mechanisms

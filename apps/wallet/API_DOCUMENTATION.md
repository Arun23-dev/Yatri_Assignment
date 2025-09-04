# 🏦 Wallet App API Documentation

## Overview

The Wallet App provides **gRPC microservices** for wallet and transaction management. All APIs are exposed via gRPC protocol, not REST endpoints.

---

## 📋 **API Categories**

### 🔐 **Admin APIs** (System Management)
*For administrators managing the wallet system*

### 👤 **Customer APIs** (Self-Service)
*For customers managing their own wallets*

### 🔗 **Integration APIs** (Hub App Integration)
*For the Hub App to interact with wallet services*

---

## 🔐 **ADMIN APIs**

### **1. Wallet Management (Admin)**

#### `CreateWallet`
- **Purpose**: Create a new wallet for a customer
- **Access**: Admin only
- **Request**:
  ```proto
  message CreateWalletRequest {
    string userId = 1;           // Customer's unique ID
    string customerName = 2;     // Customer's full name
    string customerEmail = 3;    // Customer's email
    double initialBalance = 4;   // Initial wallet balance (optional)
  }
  ```
- **Response**:
  ```proto
  message CreateWalletResponse {
    bool success = 1;            // Operation success status
    string walletId = 2;         // Generated wallet ID
    double balance = 3;          // Current balance
    string message = 4;          // Status message
  }
  ```

#### `GetWallet`
- **Purpose**: Retrieve wallet details for any customer
- **Access**: Admin only
- **Request**:
  ```proto
  message GetWalletRequest {
    string userId = 1;           // Customer's unique ID
  }
  ```
- **Response**:
  ```proto
  message GetWalletResponse {
    bool success = 1;            // Operation success status
    string walletId = 2;         // Wallet ID
    double balance = 3;          // Current balance
    string userId = 4;           // Customer ID
    string customerName = 5;     // Customer name
    string customerEmail = 6;    // Customer email
    string message = 7;          // Status message
  }
  ```

#### `DeleteWallet`
- **Purpose**: Delete a customer's wallet (only if balance is zero)
- **Access**: Admin only
- **Request**:
  ```proto
  message DeleteWalletRequest {
    string userId = 1;           // Customer's unique ID
  }
  ```
- **Response**:
  ```proto
  message DeleteWalletResponse {
    bool success = 1;            // Operation success status
    string message = 2;          // Status message
    double balance = 3;          // Final balance before deletion
    bool canDelete = 4;          // Whether deletion was allowed
  }
  ```

### **2. Balance Management (Admin)**

#### `CreditBalance`
- **Purpose**: Add funds to a customer's wallet
- **Access**: Admin only
- **Request**:
  ```proto
  message CreditBalanceRequest {
    string userId = 1;           // Customer's unique ID
    double amount = 2;           // Amount to credit
    string description = 3;      // Transaction description
    string reference = 4;       // External reference (optional)
  }
  ```
- **Response**:
  ```proto
  message CreditBalanceResponse {
    bool success = 1;            // Operation success status
    double newBalance = 2;       // Updated balance
    string transactionId = 3;    // Generated transaction ID
    string message = 4;          // Status message
  }
  ```

#### `DeductBalance`
- **Purpose**: Remove funds from a customer's wallet
- **Access**: Admin only
- **Request**:
  ```proto
  message DeductBalanceRequest {
    string userId = 1;           // Customer's unique ID
    double amount = 2;           // Amount to deduct
    string description = 3;     // Transaction description
    string reference = 4;       // External reference (optional)
  }
  ```
- **Response**:
  ```proto
  message DeductBalanceResponse {
    bool success = 1;            // Operation success status
    double newBalance = 2;       // Updated balance
    string transactionId = 3;    // Generated transaction ID
    string message = 4;          // Status message
  }
  ```

### **3. Transaction Management (Admin)**

#### `GetTransactions`
- **Purpose**: Retrieve transaction history for any customer
- **Access**: Admin only
- **Request**:
  ```proto
  message GetTransactionsRequest {
    string userId = 1;           // Customer's unique ID
    int32 page = 2;             // Page number (default: 1)
    int32 limit = 3;            // Items per page (default: 10)
    string type = 4;            // Filter by type: "credit" or "debit" (optional)
  }
  ```
- **Response**:
  ```proto
  message GetTransactionsResponse {
    bool success = 1;            // Operation success status
    repeated Transaction transactions = 2;  // Transaction list
    int32 total = 3;            // Total transaction count
    int32 page = 4;             // Current page
    int32 limit = 5;            // Items per page
    string message = 6;         // Status message
  }
  ```

### **4. Analytics & Reporting (Admin)**

#### `GetWalletBalance`
- **Purpose**: Get current balance for any customer
- **Access**: Admin only
- **Request**:
  ```proto
  message GetWalletBalanceRequest {
    string userId = 1;           // Customer's unique ID
  }
  ```
- **Response**:
  ```proto
  message GetWalletBalanceResponse {
    bool success = 1;            // Operation success status
    double balance = 2;          // Current balance
    string message = 3;          // Status message
  }
  ```

#### `GetWalletSummary`
- **Purpose**: Get comprehensive wallet statistics for any customer
- **Access**: Admin only
- **Request**:
  ```proto
  message GetWalletSummaryRequest {
    string userId = 1;           // Customer's unique ID
  }
  ```
- **Response**:
  ```proto
  message GetWalletSummaryResponse {
    bool success = 1;            // Operation success status
    WalletSummary summary = 2;    // Detailed summary
    string message = 3;          // Status message
  }
  ```

**WalletSummary Details**:
```proto
message WalletSummary {
  string walletId = 1;           // Wallet ID
  string userId = 2;             // Customer ID
  string customerName = 3;       // Customer name
  string customerEmail = 4;      // Customer email
  double balance = 5;            // Current balance
  int32 totalTransactions = 6;   // Total transaction count
  double totalCredits = 7;       // Total credits received
  double totalDebits = 8;        // Total debits made
  string lastTransactionDate = 9; // Last transaction timestamp
}
```

---

## 👤 **CUSTOMER APIs**

### **Self-Service Wallet Operations**

#### `GetWallet` (Customer View)
- **Purpose**: Customer views their own wallet details
- **Access**: Customer (own wallet only)
- **Request**: Same as admin version
- **Response**: Same as admin version
- **Security**: Customer can only access their own wallet

#### `GetWalletBalance` (Customer View)
- **Purpose**: Customer checks their current balance
- **Access**: Customer (own wallet only)
- **Request**: Same as admin version
- **Response**: Same as admin version
- **Security**: Customer can only access their own balance

#### `GetTransactions` (Customer View)
- **Purpose**: Customer views their transaction history
- **Access**: Customer (own transactions only)
- **Request**: Same as admin version
- **Response**: Same as admin version
- **Security**: Customer can only access their own transactions

#### `GetWalletSummary` (Customer View)
- **Purpose**: Customer gets their wallet statistics
- **Access**: Customer (own wallet only)
- **Request**: Same as admin version
- **Response**: Same as admin version
- **Security**: Customer can only access their own summary

---

## 🔗 **INTEGRATION APIs (Hub App)**

### **Automated Wallet Operations**

#### `CreateWallet` (Hub Integration)
- **Purpose**: Hub automatically creates wallet when customer registers
- **Trigger**: Customer registration in Hub App
- **Parameters**: Customer details from Hub registration

#### `DeductBalance` (Hub Integration)
- **Purpose**: Hub deducts balance when charging session ends
- **Trigger**: Charging session completion
- **Parameters**: 
  - `userId`: Customer ID
  - `amount`: Charging session cost
  - `description`: "Bike charging session"
  - `reference`: Charging session ID

#### `GetWalletBalance` (Hub Integration)
- **Purpose**: Hub checks customer balance before starting charging session
- **Trigger**: Before starting charging session
- **Parameters**: Customer ID

#### `GetTransactions` (Hub Integration)
- **Purpose**: Hub displays customer's transaction history
- **Trigger**: Customer views their profile in Hub App
- **Parameters**: Customer ID with pagination

---

## 📊 **Transaction Types**

### **Credit Transactions**
- **Initial Balance**: When wallet is created with initial funds
- **Top-up**: Manual balance addition by admin
- **Refund**: Money returned to customer
- **Bonus**: Promotional credits

### **Debit Transactions**
- **Charging Session**: Bike charging costs
- **Service Fee**: Administrative fees
- **Penalty**: Late fees or violations
- **Manual Deduction**: Admin-initiated deductions

---

## 🔒 **Security & Access Control**

### **Admin Access**
- ✅ Create wallets for any customer
- ✅ View any customer's wallet details
- ✅ Credit/debit any customer's balance
- ✅ View any customer's transaction history
- ✅ Delete wallets (with balance validation)
- ✅ Access comprehensive analytics

### **Customer Access**
- ✅ View own wallet details
- ✅ Check own balance
- ✅ View own transaction history
- ✅ Access own wallet summary
- ❌ Cannot modify balance
- ❌ Cannot access other customers' data

### **Hub App Integration**
- ✅ Create wallets automatically
- ✅ Deduct balance for charging sessions
- ✅ Query balance and transactions
- ✅ Link transactions to charging sessions

---

## 📝 **Usage Examples**

### **Admin Creating a Wallet**
```typescript
const response = await walletService.createWallet({
  userId: 'customer123',
  customerName: 'John Doe',
  customerEmail: 'john@example.com',
  initialBalance: 100.0
});
```

### **Admin Crediting Balance**
```typescript
const response = await walletService.creditBalance({
  userId: 'customer123',
  amount: 50.0,
  description: 'Top-up payment',
  reference: 'payment_001'
});
```

### **Hub Deducting Balance for Charging**
```typescript
const response = await walletService.deductBalance({
  userId: 'customer123',
  amount: 15.50,
  description: 'Bike charging session',
  reference: 'session_68b730014756d6bf9a7f3e91'
});
```

### **Customer Viewing Transactions**
```typescript
const response = await walletService.getTransactions({
  userId: 'customer123',
  page: 1,
  limit: 10,
  type: 'debit' // Optional filter
});
```

---

## 🚀 **Next Steps**

1. **Start Wallet App**: `npm run start:dev`
2. **Seed Sample Data**: `npm run seed`
3. **Integrate with Hub**: Add gRPC client to Hub App
4. **Test End-to-End**: Verify wallet operations work with charging sessions

# 💰 YatriTask Wallet App

A NestJS microservice that manages customer wallets and transactions. It exposes both **REST** and **gRPC** APIs and is designed to be used from the **Hub** app in a NestJS monorepo.

> **Tech:** TypeScript, NestJS, Prisma (MongoDB), JWT Auth, gRPC, Swagger

---

## ✨ Features

### 💳 Wallet Management

* Automatic wallet creation for new customers (via Hub → gRPC)
* Real‑time balance updates (credit/debit)
* Balance inquiries and wallet summary

### 💰 Transactions

* Full transaction ledger (credit/debit)
* Filters + pagination for history
* Link transactions to charging sessions

### 🔐 Auth & Security

* JWT auth (Customer/Admin)
* DTOs + Validation Pipe
* Role‑based access for admin endpoints

### 🌐 APIs

* REST endpoints for customer/admin
* gRPC service for Hub ↔ Wallet comms
* Swagger at `/api`
* Health check at `/health`

---

## 🗂 Monorepo Layout (example)

```
.
├── apps
│   ├── hub
│   │   ├── analytics-response-debug.json
│   │   ├── analytics-response-test.json
│   │   ├── eslint.config.mjs
│   │   ├── nest-cli.json
│   │   ├── package.json
│   │   ├── package-lock.json
│   │   ├── prisma
│   │   ├── README.md
│   │   ├── scripts
│   │   ├── src
│   │   ├── test-wallet-integration.js
│   │   ├── tsconfig.app.json
│   │   ├── tsconfig.build.json
│   │   └── tsconfig.json
│   └── wallet
│       ├── ADMIN_API_IMPLEMENTATION.md
│       ├── ADMIN_API_REFERENCE.md
│       ├── API_DOCUMENTATION.md
│       ├── create-wallet.js
│       ├── CUSTOMER_API_DOCUMENTATION.md
│       ├── eslint.config.mjs
│       ├── mock-wallet-data.json
│       ├── nest-cli.json
│       ├── package.json
│       ├── package-lock.json
│       ├── prisma
│       ├── README.md
│       ├── scripts
│       ├── src
│       ├── test-customer-api.js
│       ├── test-customer-wallet-apis.js
│       ├── test-wallet-simple.js
│       ├── tsconfig.app.json
│       ├── tsconfig.build.json
│       └── tsconfig.json
├── eslint.config.mjs
├── folder-structure.txt
├── nest-cli.json
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── start-apps.sh
├── start-yatritask.sh
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── test.json
├── tsconfig.build.json
└── tsconfig.json

11 directories, 46 files

```

> Adjust paths if your repo differs; the commands below assume `apps/wallet` holds the Prisma schema for the wallet DB.

---

## 🚀 Quick Start

### Prerequisites

* Node.js 18+
* MongoDB (local or Atlas)
* npm or yarn

### 1) Environment Variables

Create `apps/wallet/.env`:

```env
DATABASE_URL="mongodb://localhost:27017/yatritask_wallet"
JWT_SECRET="yatritask-super-secret-jwt-key-2024"
WALLET_GRPC_URL="0.0.0.0:5000"  # server bind address
WALLET_HTTP_PORT="3002"
```

> Ensure **Hub** and **Wallet** agree on `JWT_SECRET` (or use a shared public key for RS256).

### 2) Install Dependencies (monorepo root)

```bash
npm install
```

### 3) Prisma (Wallet DB)

From repo root or `apps/wallet` (depending on your `prisma` script path):

```bash
# Generate Prisma client
npx prisma generate --schema=apps/wallet/prisma/schema.prisma

# Push schema to MongoDB
npx prisma db push --schema=apps/wallet/prisma/schema.prisma

# Seed sample data
npm run seed:wallet
```

**package.json (scripts) suggestion:**

```json
{
  "scripts": {
    "start:wallet": "nest start wallet",
    "start:wallet:dev": "nest start wallet --watch",
    "start:wallet:http": "NODE_OPTIONS= -- ts-node apps/wallet/src/http-only.ts",
    "start:wallet:grpc": "NODE_OPTIONS= -- ts-node apps/wallet/src/grpc-only.ts",
    "prisma:wallet:generate": "prisma generate --schema=apps/wallet/prisma/schema.prisma",
    "prisma:wallet:push": "prisma db push --schema=apps/wallet/prisma/schema.prisma",
    "seed:wallet": "ts-node apps/wallet/prisma/seed.ts"
  }
}
```

### 4) Run the Wallet app

```bash
# Dev (HTTP + gRPC)
npm run start:wallet:dev

# Or run specific modes if you split bootstrap files
npm run start:wallet:http
npm run start:wallet:grpc
```

### 5) Endpoints

* **HTTP Base:** `http://localhost:3002`
* **Swagger:** `http://localhost:3002/api`
* **Health:** `http://localhost:3002/health`
* **gRPC:** `0.0.0.0:5000`

---

## 📚 REST API (examples)

### 🔐 Auth

Customer tokens are issued by **Hub**. Example:

```http
POST http://localhost:3001/auth/customer/login
Content-Type: application/json
{
  "email": "customer@example.com",
  "password": "password123"
}
```

> Use `Authorization: Bearer <token>` for protected wallet endpoints.

### 👤 Customer

* `GET /customer/wallet/balance`
* `GET /customer/wallet/summary`
* `GET /customer/wallet/transactions?page=1&limit=10&type=debit`
* `POST /customer/add-funds` `{ amount, paymentMethod, description? }`

### 👨‍💼 Admin

* `GET /admin/wallets?page=1&limit=10`
* `GET /admin/wallets/:customerId`
* `POST /admin/wallets/:customerId/credit` `{ amount, description?, reference? }`
* `POST /admin/wallets/:customerId/debit` `{ amount, description?, reference? }`
* `GET /admin/transactions?page=1&limit=20&customerId=...&type=credit`
* `DELETE /admin/wallets/:customerId`

> All admin endpoints require an **admin JWT**.

---

## 🔌 gRPC API

**Service:** `WalletService`

```proto
rpc CreateWallet(CreateWalletRequest) returns (CreateWalletResponse);
rpc GetWallet(GetWalletRequest) returns (GetWalletResponse);
rpc GetWalletBalance(GetWalletBalanceRequest) returns (GetWalletBalanceResponse);
rpc DeductBalance(DeductBalanceRequest) returns (DeductBalanceResponse);
rpc GetTransactions(GetTransactionsRequest) returns (GetTransactionsResponse);
rpc CreditBalance(CreditBalanceRequest) returns (CreditBalanceResponse);
rpc GetWalletSummary(GetWalletSummaryRequest) returns (GetWalletSummaryResponse);
rpc DeleteCustomer(DeleteCustomerRequest) returns (DeleteCustomerResponse);
```

> The Hub app should call **CreateWallet** after customer creation and can read balances/transactions via gRPC.

---

## 🔧 Seeding

Run once to create sample customers/wallets/transactions in the wallet DB:

```bash
npm run seed:wallet
```

> The seed script checks for existing wallets and won’t duplicate them.

---

## 🧪 Postman

Import the files in the `postman/` folder:

* `YatriTask-Wallet.postman_collection.json`
* `YatriTask.postman_environment.json`

**Environment variables** (example):

```
{{hub_url}} = http://localhost:3001
{{wallet_url}} = http://localhost:3002
{{admin_token}} = <paste admin JWT>
{{customer_token}} = <paste customer JWT>
```

Organized folders:

* **Auth** (Hub): admin/customer login
* **Customer (Wallet)**: balance, summary, transactions, add‑funds
* **Admin (Wallet)**: list wallets, get wallet, credit/debit, transactions, delete

---

## 🧩 Integration Notes (Hub ↔ Wallet)

1. **On customer creation** (Hub): call `CreateWallet(customerId)` over gRPC.
2. **Charging sessions**: Hub deducts via `DeductBalance(customerId, amount, chargingSessionId)`.
3. **Customer portal**: Hub fetches balance/transactions via gRPC and exposes them via REST to the UI.

---

## 🛠 Troubleshooting

* **JWT errors**: Ensure Hub and Wallet agree on algorithm + secret/public key.
* **Mongo connection**: verify `DATABASE_URL`, DB is running, and `prisma db push` succeeded.
* **gRPC connection**: confirm bind address/port and that Hub points to `WALLET_GRPC_URL`.
* **Ports busy**:

  * macOS/Linux: `lsof -ti:3002,5000 | xargs kill -9`
* **Seed not visible**: check you are connecting to the **same DB** in app and seed; log counts with Prisma after seeding.

---

## 🔒 Security

* JWT auth (customer/admin) with role checks
* DTO validation & sanitization
* CORS config
* Rate limiting (optional)

---

## ✅ What’s Implemented vs Pending

* ✅ Wallet CRUD, credit/debit, summaries, transactions, seeding
* ✅ gRPC methods exposed for Hub integration
* ✅ REST + Swagger + health checks
* ⏳ (If pending) finalize wallet balance retrieval wiring in Hub via gRPC and E2E tests

---

## 🤝 Contributing

* Follow NestJS style (modules, providers, controllers)
* Add tests and update docs for new features
* Use conventional commits

---

## 📄 License

Part of the **YatriTask** bike‑rental management system (for assessment/demo).

# 🚴‍♂️ YatriTask - Bike Rental Management System

A comprehensive NestJS monorepo for managing bike rentals, customer accounts, and wallet operations with separate Admin and Customer authentication flows.

## 📋 System Overview

YatriTask consists of two microservices:

- **Hub App** (Port 3001): Main application handling authentication, customer management, bike operations, and admin functions
- **Wallet App** (Port 5000): gRPC microservice for wallet and transaction management

## 🏗️ Architecture

### Database Schema
- **Admin Table**: Separate entity for admin users with full management capabilities
- **Customer Table**: Customer accounts with personal information
- **Bike Table**: Bike inventory with status tracking (AVAILABLE, ASSIGNED, MAINTENANCE, RETIRED)
- **BikeAssignment Table**: Tracks bike assignments with admin assignment tracking
- **ChargingSession Table**: Records charging sessions for customers (in Hub)
- **Wallet Table**: Customer wallet information (in Wallet app)
- **Transaction Table**: Financial transactions for wallet operations (in Wallet app)

### Authentication Flow
- **Admin Authentication**: Separate login/registration for admin users
- **Customer Authentication**: Independent customer login/registration
- **JWT Tokens**: Type-specific tokens (`admin` vs `customer`) for proper authorization
- **Role-Based Access**: Admin-only endpoints for management operations

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB database
- npm or yarn

### 1. Clone and Install Dependencies
```bash
git clone <repository-url>
cd YatriTask
npm install
```

### 2. Environment Setup

#### Hub App (.env in apps/hub/)
```env
DATABASE_URL="mongodb://localhost:27017/yatritask_hub"
JWT_SECRET="your-super-secret-jwt-key"
```

#### Wallet App (.env in apps/wallet/)
```env
DATABASE_URL="mongodb://localhost:27017/yatritask_wallet"
WALLET_GRPC_URL="localhost:5000"
```

### 3. Database Setup
```bash
# Generate Prisma clients
cd apps/hub && npx prisma generate
cd ../wallet && npx prisma generate

# Push schema to database
cd ../hub && npx prisma db push
cd ../wallet && npx prisma db push
```

### 4. Seed Initial Data
```bash
# Create initial admin
cd apps/hub && npx ts-node scripts/create-admin.ts

# Seed sample data
npx ts-node scripts/index.ts
```

### 5. Start Applications

#### Option A: Start Both Apps Simultaneously
```bash
# From root directory
npm run start:both
```

#### Option B: Start Apps Individually
```bash
# Terminal 1 - Start Wallet (gRPC)
npm run start:wallet

# Terminal 2 - Start Hub (REST API)
npm run start:hub
```

#### Option C: Development Mode
```bash
# Terminal 1
npm run start:dev:wallet

# Terminal 2  
npm run start:dev:hub
```

## 🌐 Application URLs

- **Hub API**: http://localhost:3001
- **Swagger Documentation**: http://localhost:3001/api
- **Wallet gRPC**: localhost:5000

## 👤 Default Credentials

### Admin Account
- **Email**: admin@yatritask.com
- **Password**: admin123

### Sample Customer Account
- **Email**: john.customer@example.com  
- **Password**: customer123

## 📚 API Documentation

### Authentication Endpoints

#### Admin Authentication
- `POST /auth/admin/register/first` - Register first admin (Public)
- `POST /auth/admin/register` - Register new admin (Admin only)
- `POST /auth/admin/login` - Admin login (Public)
- `POST /auth/logout` - Logout (works for both admin and customer)

#### Customer Authentication  
- `POST /auth/customer/login` - Customer login (Public)

### Customer Management (Admin Only)
- `POST /customers` - Create customer
- `GET /customers` - List all customers (paginated)
- `GET /customers/search?q=<query>` - Search customers
- `GET /customers/:id` - Get customer by ID
- `PUT /customers/:id` - Update customer
- `DELETE /customers/:id` - Delete customer

### Bike Management
- `POST /bikes` - Create bike (admin only)
- `GET /bikes` - List all bikes (paginated)
- `GET /bikes/:id` - Get bike by ID
- `PUT /bikes/:id/status` - Update bike status (admin only)

### Bike Assignment (Admin Only)
- `POST /bikes/assign` - Assign bike to customer
- `POST /bikes/return` - Return bike from customer
- `GET /bikes/assignments` - List all assignments
- `GET /bikes/assignments/active` - List active assignments

### Charging Sessions
- `POST /charging-sessions` - Create charging session (Admin only)
- `GET /charging-sessions` - List all charging sessions (Admin only)
- `GET /charging-sessions/active` - List active charging sessions (Admin only)
- `GET /charging-sessions/my-sessions` - Get customer's own sessions (Customer only)
- `GET /charging-sessions/:id` - Get charging session by ID
- `PUT /charging-sessions/:id/status` - Update charging session status (Admin only)

## 🔧 Available Scripts

### Root Level
```bash
npm run build:hub          # Build Hub app
npm run build:wallet       # Build Wallet app
npm run start:hub          # Start Hub app
npm run start:wallet       # Start Wallet app
npm run start:both         # Start both apps
npm run start:dev:hub      # Start Hub in dev mode
npm run start:dev:wallet   # Start Wallet in dev mode
```

### Hub App (apps/hub/)
```bash
npm run build             # Build application
npm run start             # Start application
npm run start:dev         # Start in development mode
npm run test              # Run tests
npm run test:e2e          # Run e2e tests
```

### Wallet App (apps/wallet/)
```bash
npm run build             # Build application
npm run start             # Start application
npm run start:dev         # Start in development mode
npm run seed              # Seed sample data
```

## 🛠️ Development Workflow

### 1. Admin Workflow
1. **Login as Admin**: `POST /auth/admin/login`
2. **Create Customers**: `POST /customers`
3. **Manage Bikes**: Create, update status, assign to customers
4. **Monitor Assignments**: View active and historical assignments

### 2. Customer Workflow
1. **Register/Login**: `POST /auth/customer/register` or `POST /auth/customer/login`
2. **View Own Data**: Access personal information and history
3. **Wallet Operations**: Check balance, view transactions (via gRPC)

### 3. Bike Assignment Flow
1. **Admin assigns bike** to customer via `POST /bikes/assign`
2. **Bike status changes** from AVAILABLE to ASSIGNED
3. **Customer can use bike** for rental period
4. **Admin returns bike** via `POST /bikes/return`
5. **Bike status reverts** to AVAILABLE

## 🔒 Security Features

- **Separate Authentication**: Admin and Customer have independent auth flows
- **JWT Token Types**: Different token types prevent cross-access
- **Role-Based Guards**: AdminAuthGuard and CustomerAuthGuard
- **Input Validation**: Comprehensive DTO validation with class-validator
- **Error Handling**: Proper HTTP status codes and error messages

## 📊 Database Models

### Admin
```typescript
{
  id: string;
  firstName: string;
  lastName: string;
  email: string; // unique
  password: string; // hashed
  createdAt: Date;
  updatedAt: Date;
}
```

### Customer
```typescript
{
  id: string;
  firstName: string;
  lastName: string;
  email: string; // unique
  password: string; // hashed
  phone?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Bike
```typescript
{
  id: string;
  serialNumber: string; // unique
  model: string;
  status: 'AVAILABLE' | 'ASSIGNED' | 'MAINTENANCE' | 'RETIRED';
  createdAt: Date;
  updatedAt: Date;
}
```

## 🚨 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Kill processes on ports 3001 and 5000
   sudo lsof -ti:3001 | xargs kill -9
   sudo lsof -ti:5000 | xargs kill -9
   ```

2. **Database Connection Issues**
   ```bash
   # Check MongoDB is running
   sudo systemctl status mongod
   
   # Restart MongoDB if needed
   sudo systemctl restart mongod
   ```

3. **Prisma Issues**
   ```bash
   # Regenerate Prisma client
   npx prisma generate
   
   # Reset database
   npx prisma db push --force-reset
   ```

4. **Build Errors**
   ```bash
   # Clean and rebuild
   rm -rf dist node_modules
   npm install
   npm run build
   ```

### Logs and Debugging
- **Hub App Logs**: Check console output for detailed error messages
- **Wallet App Logs**: gRPC server logs in console
- **Database Logs**: MongoDB logs for connection issues

## 📈 Monitoring and Maintenance

### Health Checks
- **Hub API**: `GET http://localhost:3001/health`
- **Wallet gRPC**: Check if port 5000 is listening

### Database Maintenance
```bash
# Backup database
mongodump --db yatritask_hub --out ./backup/hub
mongodump --db yatritask_wallet --out ./backup/wallet

# Restore database
mongorestore --db yatritask_hub ./backup/hub/yatritask_hub
mongorestore --db yatritask_wallet ./backup/wallet/yatritask_wallet
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**🎉 Congratulations!** Your YatriTask bike rental management system is now fully operational with separate Admin and Customer authentication flows, comprehensive bike management, and secure API endpoints.

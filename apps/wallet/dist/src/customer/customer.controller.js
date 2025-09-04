"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var CustomerController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const swagger_1 = require("@nestjs/swagger");
const customer_service_1 = require("./customer.service");
const customer_dto_1 = require("./dto/customer.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let CustomerController = class CustomerController {
    static { CustomerController_1 = this; }
    customerService;
    constructor(customerService) {
        this.customerService = customerService;
        this.loadMockData();
    }
    static mockDataFile = path.join(process.cwd(), 'mock-wallet-data.json');
    static mockBalances = new Map();
    static mockTransactions = new Map();
    loadMockData() {
        try {
            if (fs.existsSync(CustomerController_1.mockDataFile)) {
                const data = JSON.parse(fs.readFileSync(CustomerController_1.mockDataFile, 'utf8'));
                CustomerController_1.mockBalances = new Map(Object.entries(data.balances || {}));
                CustomerController_1.mockTransactions = new Map(Object.entries(data.transactions || {}));
                console.log('📁 Loaded mock data from file');
            }
        }
        catch (error) {
            console.log('📁 No existing mock data found, starting fresh');
        }
    }
    saveMockData() {
        try {
            const data = {
                balances: Object.fromEntries(CustomerController_1.mockBalances),
                transactions: Object.fromEntries(CustomerController_1.mockTransactions),
                lastUpdated: new Date().toISOString()
            };
            fs.writeFileSync(CustomerController_1.mockDataFile, JSON.stringify(data, null, 2));
            console.log('💾 Saved mock data to file');
        }
        catch (error) {
            console.error('❌ Error saving mock data:', error);
        }
    }
    async addFundsWithCookie(req, data) {
        const token = req.cookies?.customer_token;
        if (!token) {
            return {
                success: false,
                message: 'Customer token required in cookie',
                error: 'Unauthorized',
                statusCode: 401,
            };
        }
        try {
            const userId = req.headers['x-user-id'] || '68b80a5adfa2e1443088d757';
            return this.customerService.addFunds(userId, data.amount, data.paymentMethod, data.reference, data.description);
        }
        catch (error) {
            return {
                success: false,
                message: 'Invalid token',
                error: 'Unauthorized',
                statusCode: 401,
            };
        }
    }
    async test(req) {
        return {
            success: true,
            message: 'JWT authentication working',
            userId: req.user?.sub,
            user: req.user,
        };
    }
    async addFundsTest(data) {
        return this.customerService.addFunds(data.userId, data.amount, data.paymentMethod, data.reference, data.description);
    }
    async addFundsSimple(data) {
        const customerId = data.customerId || '68b80a5adfa2e1443088d757';
        const currentBalance = CustomerController_1.mockBalances.get(customerId) || 0;
        const newBalance = currentBalance + data.amount;
        CustomerController_1.mockBalances.set(customerId, newBalance);
        const transaction = {
            id: 'mock_txn_' + Date.now(),
            customerId: customerId,
            amount: data.amount,
            type: 'credit',
            description: data.description || `Funds added via ${data.paymentMethod}`,
            reference: data.reference || `mock_payment_${Date.now()}`,
            timestamp: new Date().toISOString(),
            paymentMethod: data.paymentMethod
        };
        if (!CustomerController_1.mockTransactions.has(customerId)) {
            CustomerController_1.mockTransactions.set(customerId, []);
        }
        CustomerController_1.mockTransactions.get(customerId).unshift(transaction);
        this.saveMockData();
        return {
            success: true,
            newBalance: newBalance,
            transactionId: transaction.id,
            message: `Successfully added $${data.amount} via ${data.paymentMethod}. New balance: $${newBalance}`,
            paymentMethod: data.paymentMethod,
            reference: transaction.reference,
            customerId: customerId,
            mock: true,
            previousBalance: currentBalance,
            amountAdded: data.amount,
            transaction: transaction
        };
    }
    async spendFundsSimple(data) {
        const customerId = data.customerId || '68b80a5adfa2e1443088d757';
        const currentBalance = CustomerController_1.mockBalances.get(customerId) || 0;
        if (currentBalance < data.amount) {
            return {
                success: false,
                message: `Insufficient balance. Current: $${currentBalance}, Required: $${data.amount}`,
                currentBalance: currentBalance,
                requiredAmount: data.amount,
                mock: true
            };
        }
        const newBalance = currentBalance - data.amount;
        CustomerController_1.mockBalances.set(customerId, newBalance);
        const transaction = {
            id: 'mock_txn_' + Date.now(),
            customerId: customerId,
            amount: data.amount,
            type: 'debit',
            description: data.description || `Payment for ${data.service || 'service'}`,
            reference: data.reference || `mock_spend_${Date.now()}`,
            timestamp: new Date().toISOString(),
            service: data.service
        };
        if (!CustomerController_1.mockTransactions.has(customerId)) {
            CustomerController_1.mockTransactions.set(customerId, []);
        }
        CustomerController_1.mockTransactions.get(customerId).unshift(transaction);
        this.saveMockData();
        return {
            success: true,
            newBalance: newBalance,
            transactionId: transaction.id,
            message: `Successfully spent $${data.amount} for ${data.service || 'service'}. New balance: $${newBalance}`,
            reference: transaction.reference,
            customerId: customerId,
            mock: true,
            previousBalance: currentBalance,
            amountSpent: data.amount,
            transaction: transaction
        };
    }
    async addFunds(req, data) {
        const userId = req.user.sub;
        return this.customerService.addFunds(userId, data.amount, data.paymentMethod, data.reference, data.description);
    }
    async getWalletBalance(req) {
        const userId = req.user.sub;
        return this.customerService.getWalletBalance(userId);
    }
    async getTransactions(req, query) {
        const userId = req.user.sub;
        return this.customerService.getTransactions(userId, parseInt(query.page || '1'), parseInt(query.limit || '10'), query.type);
    }
    async getWalletSummary(req) {
        const userId = req.user.sub;
        return this.customerService.getWalletSummary(userId);
    }
    async getWallet(req) {
        const userId = req.user.sub;
        return this.customerService.getWallet(userId);
    }
    async getBalanceSimple() {
        const customerId = '68b80a5adfa2e1443088d757';
        const currentBalance = CustomerController_1.mockBalances.get(customerId) || 0;
        return {
            success: true,
            balance: currentBalance,
            currency: 'USD',
            userId: customerId,
            message: `Current balance: $${currentBalance}`,
            mock: true,
            lastUpdated: new Date().toISOString()
        };
    }
    async getTransactionsSimple(page = '1', limit = '10', type) {
        const customerId = '68b80a5adfa2e1443088d757';
        const mockTransactions = CustomerController_1.mockTransactions.get(customerId) || [];
        let filteredTransactions = mockTransactions;
        if (type && (type === 'credit' || type === 'debit')) {
            filteredTransactions = mockTransactions.filter(t => t.type === type);
        }
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const startIndex = (pageNum - 1) * limitNum;
        const endIndex = startIndex + limitNum;
        const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex);
        return {
            success: true,
            transactions: paginatedTransactions,
            pagination: {
                page: pageNum,
                limit: limitNum,
                total: filteredTransactions.length,
                totalPages: Math.ceil(filteredTransactions.length / limitNum)
            },
            userId: customerId,
            message: `Retrieved ${paginatedTransactions.length} transactions`,
            mock: true
        };
    }
    async getWalletSummarySimple() {
        const customerId = '68b80a5adfa2e1443088d757';
        const currentBalance = CustomerController_1.mockBalances.get(customerId) || 0;
        const mockTransactions = CustomerController_1.mockTransactions.get(customerId) || [];
        const totalTransactions = mockTransactions.length;
        const totalCredits = mockTransactions
            .filter(t => t.type === 'credit')
            .reduce((sum, t) => sum + t.amount, 0);
        const totalDebits = mockTransactions
            .filter(t => t.type === 'debit')
            .reduce((sum, t) => sum + t.amount, 0);
        const summary = {
            walletId: 'wallet_' + customerId,
            userId: customerId,
            customerName: 'John Doe',
            customerEmail: 'john.doe@example.com',
            balance: currentBalance,
            currency: 'USD',
            totalTransactions,
            totalCredits,
            totalDebits,
            lastTransactionDate: mockTransactions[0]?.timestamp || new Date().toISOString(),
            walletCreatedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'active'
        };
        return {
            success: true,
            summary: summary,
            message: 'Wallet summary retrieved successfully',
            mock: true
        };
    }
    async getRecentActivitySimple() {
        const customerId = '68b80a5adfa2e1443088d757';
        const mockTransactions = CustomerController_1.mockTransactions.get(customerId) || [];
        const recentActivity = mockTransactions.slice(0, 5).map(t => ({
            id: t.id,
            type: t.type,
            amount: t.amount,
            description: t.description,
            timestamp: t.timestamp,
            icon: t.type === 'credit' ? '💰' : '💸'
        }));
        return {
            success: true,
            recentActivity: recentActivity,
            userId: customerId,
            message: `Retrieved ${recentActivity.length} recent activities`,
            mock: true
        };
    }
    async addFundsGrpc(data) {
        return this.customerService.addFunds(data.customerId, data.amount, data.paymentMethod, data.reference, data.description);
    }
    async getWalletBalanceGrpc(data) {
        return this.customerService.getWalletBalance(data.customerId);
    }
    async getTransactionsGrpc(data) {
        return this.customerService.getTransactions(data.customerId, data.page || 1, data.limit || 10, data.type);
    }
    async getWalletSummaryGrpc(data) {
        return this.customerService.getWalletSummary(data.customerId);
    }
    async getWalletGrpc(data) {
        return this.customerService.getWallet(data.customerId);
    }
    async createWalletGrpc(data) {
        return this.customerService.createWallet(data.customerId, data.initialBalance || 0);
    }
    async deductBalanceGrpc(data) {
        return this.customerService.deductBalance(data.customerId, data.amount, data.chargingSessionId, data.description);
    }
};
exports.CustomerController = CustomerController;
__decorate([
    (0, common_1.Post)('add-funds-cookie'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Add funds to customer wallet (Cookie-based auth)',
        description: 'Allows customers to add funds using cookie-based authentication from Hub App.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Funds added successfully',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                newBalance: { type: 'number', example: 150.75 },
                transactionId: { type: 'string', example: 'txn_12345' },
                message: { type: 'string', example: 'Successfully added $100.50 via credit_card' },
                paymentMethod: { type: 'string', example: 'credit_card' },
                reference: { type: 'string', example: 'payment_credit_card_1703123456789' },
                walletCreated: { type: 'boolean', example: false },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid input data',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Customer token required in cookie',
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, customer_dto_1.AddFundsAuthenticatedDto]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "addFundsWithCookie", null);
__decorate([
    (0, common_1.Post)('test'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Test endpoint',
        description: 'Simple test endpoint to check JWT authentication',
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "test", null);
__decorate([
    (0, common_1.Post)('add-funds-test'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Add funds to customer wallet (Test endpoint)',
        description: 'Test endpoint that allows adding funds without authentication. Use this for testing purposes only.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Funds added successfully',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                newBalance: { type: 'number', example: 150.75 },
                transactionId: { type: 'string', example: 'txn_12345' },
                message: { type: 'string', example: 'Successfully added $100.50 via credit_card' },
                paymentMethod: { type: 'string', example: 'credit_card' },
                reference: { type: 'string', example: 'payment_credit_card_1703123456789' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid input data',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customer_dto_1.AddFundsDto]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "addFundsTest", null);
__decorate([
    (0, common_1.Post)('add-funds-simple'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Add funds to customer wallet (Simple test)',
        description: 'Simple test endpoint with no authentication required. Use for quick testing.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "addFundsSimple", null);
__decorate([
    (0, common_1.Post)('spend-funds-simple'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Spend funds from customer wallet (Simple test)',
        description: 'Simple test endpoint to spend funds from wallet.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "spendFundsSimple", null);
__decorate([
    (0, common_1.Post)('add-funds'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Add funds to customer wallet',
        description: 'Allows customers to add funds to their wallet from third-party sources like bank transfers, credit cards, etc.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Funds added successfully',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                newBalance: { type: 'number', example: 150.75 },
                transactionId: { type: 'string', example: 'txn_12345' },
                message: { type: 'string', example: 'Successfully added $100.50 via credit_card' },
                paymentMethod: { type: 'string', example: 'credit_card' },
                reference: { type: 'string', example: 'payment_credit_card_1703123456789' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid input data',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - JWT token required',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Wallet not found',
    }),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, customer_dto_1.AddFundsAuthenticatedDto]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "addFunds", null);
__decorate([
    (0, common_1.Get)('wallet/balance'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get customer wallet balance',
        description: 'Retrieves the current balance of the authenticated customer wallet.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Wallet balance retrieved successfully',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                balance: { type: 'number', example: 150.75 },
                message: { type: 'string', example: 'Wallet balance retrieved successfully' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - JWT token required',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Wallet not found',
    }),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getWalletBalance", null);
__decorate([
    (0, common_1.Get)('wallet/transactions'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get customer transaction history',
        description: 'Retrieves paginated transaction history for the authenticated customer wallet.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        description: 'Page number for pagination',
        required: false,
        type: 'number',
        example: 1,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        description: 'Number of transactions per page',
        required: false,
        type: 'number',
        example: 10,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'type',
        description: 'Filter by transaction type',
        required: false,
        enum: ['credit', 'debit'],
        example: 'credit',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Transactions retrieved successfully',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                transactions: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string', example: 'txn_12345' },
                            userId: { type: 'string', example: 'user123' },
                            amount: { type: 'number', example: 100.50 },
                            type: { type: 'string', example: 'credit' },
                            description: { type: 'string', example: 'Funds added via credit_card' },
                            reference: { type: 'string', example: 'payment_credit_card_1703123456789' },
                            timestamp: { type: 'string', example: '2023-12-21T10:30:00.000Z' },
                        },
                    },
                },
                total: { type: 'number', example: 25 },
                page: { type: 'number', example: 1 },
                limit: { type: 'number', example: 10 },
                message: { type: 'string', example: 'Transactions retrieved successfully' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - JWT token required',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Wallet not found',
    }),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, customer_dto_1.GetTransactionsQueryDto]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getTransactions", null);
__decorate([
    (0, common_1.Get)('wallet/summary'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get customer wallet summary',
        description: 'Retrieves comprehensive wallet summary including balance, transaction statistics, and customer details.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Wallet summary retrieved successfully',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                summary: {
                    type: 'object',
                    properties: {
                        walletId: { type: 'string', example: 'wallet_12345' },
                        userId: { type: 'string', example: 'user123' },
                        customerName: { type: 'string', example: 'John Doe' },
                        customerEmail: { type: 'string', example: 'john@example.com' },
                        balance: { type: 'number', example: 150.75 },
                        totalTransactions: { type: 'number', example: 25 },
                        totalCredits: { type: 'number', example: 500.00 },
                        totalDebits: { type: 'number', example: 349.25 },
                        lastTransactionDate: { type: 'string', example: '2023-12-21T10:30:00.000Z' },
                    },
                },
                message: { type: 'string', example: 'Wallet summary retrieved successfully' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - JWT token required',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Wallet not found',
    }),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getWalletSummary", null);
__decorate([
    (0, common_1.Get)('wallet'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get customer wallet details',
        description: 'Retrieves basic wallet information for the authenticated customer.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Wallet details retrieved successfully',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                walletId: { type: 'string', example: 'wallet_12345' },
                balance: { type: 'number', example: 150.75 },
                userId: { type: 'string', example: 'user123' },
                customerName: { type: 'string', example: 'John Doe' },
                customerEmail: { type: 'string', example: 'john@example.com' },
                message: { type: 'string', example: 'Wallet retrieved successfully' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - JWT token required',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Wallet not found',
    }),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getWallet", null);
__decorate([
    (0, common_1.Get)('get-balance-simple'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Get current wallet balance (Simple test)',
        description: 'Get the current balance of the customer wallet.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getBalanceSimple", null);
__decorate([
    (0, common_1.Get)('get-transactions-simple'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Get transaction history (Simple test)',
        description: 'Get paginated transaction history for the customer wallet.',
    }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getTransactionsSimple", null);
__decorate([
    (0, common_1.Get)('get-wallet-summary-simple'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Get wallet summary (Simple test)',
        description: 'Get comprehensive wallet summary including balance and statistics.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getWalletSummarySimple", null);
__decorate([
    (0, common_1.Get)('get-recent-activity-simple'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Get recent activity (Simple test)',
        description: 'Get recent wallet activity for quick overview.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getRecentActivitySimple", null);
__decorate([
    (0, microservices_1.GrpcMethod)('CustomerService', 'AddFunds'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "addFundsGrpc", null);
__decorate([
    (0, microservices_1.GrpcMethod)('CustomerService', 'GetWalletBalance'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getWalletBalanceGrpc", null);
__decorate([
    (0, microservices_1.GrpcMethod)('CustomerService', 'GetTransactions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getTransactionsGrpc", null);
__decorate([
    (0, microservices_1.GrpcMethod)('CustomerService', 'GetWalletSummary'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getWalletSummaryGrpc", null);
__decorate([
    (0, microservices_1.GrpcMethod)('CustomerService', 'GetWallet'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getWalletGrpc", null);
__decorate([
    (0, microservices_1.GrpcMethod)('CustomerService', 'CreateWallet'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "createWalletGrpc", null);
__decorate([
    (0, microservices_1.GrpcMethod)('CustomerService', 'DeductBalance'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "deductBalanceGrpc", null);
exports.CustomerController = CustomerController = CustomerController_1 = __decorate([
    (0, swagger_1.ApiTags)('customer-wallet'),
    (0, common_1.Controller)('customer'),
    __metadata("design:paramtypes", [customer_service_1.CustomerService])
], CustomerController);
//# sourceMappingURL=customer.controller.js.map
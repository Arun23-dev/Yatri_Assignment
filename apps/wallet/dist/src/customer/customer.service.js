"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CustomerService = class CustomerService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addFunds(customerId, amount, paymentMethod, reference, description) {
        try {
            if (amount <= 0) {
                return {
                    success: false,
                    newBalance: 0,
                    transactionId: '',
                    message: 'Amount must be greater than zero',
                };
            }
            const wallet = await this.prisma.wallet.findUnique({
                where: { customerId },
            });
            if (!wallet) {
                return {
                    success: false,
                    newBalance: 0,
                    transactionId: '',
                    message: 'Wallet not found',
                };
            }
            const updatedWallet = await this.prisma.wallet.update({
                where: { customerId },
                data: { balance: wallet.balance + amount },
            });
            const transaction = await this.prisma.transaction.create({
                data: {
                    walletId: wallet.id,
                    customerId,
                    amount,
                    type: 'credit',
                    description: description || `Funds added via ${paymentMethod}`,
                    reference: reference || `payment_${paymentMethod}_${Date.now()}`,
                },
            });
            return {
                success: true,
                newBalance: updatedWallet.balance,
                transactionId: transaction.id,
                message: `Successfully added $${amount.toFixed(2)} via ${paymentMethod}`,
                paymentMethod,
                reference: transaction.reference,
            };
        }
        catch (error) {
            console.error('Error adding funds:', error);
            if (error.code === 'P1001' || error.message?.includes('connect')) {
                return {
                    success: false,
                    newBalance: 0,
                    transactionId: '',
                    message: 'Database connection error. Please try again later.',
                    error: 'Database unavailable',
                };
            }
            return {
                success: false,
                newBalance: 0,
                transactionId: '',
                message: 'Failed to add funds',
                error: error.message,
            };
        }
    }
    async getWalletBalance(customerId) {
        try {
            const wallet = await this.prisma.wallet.findUnique({
                where: { customerId },
            });
            if (!wallet) {
                return {
                    success: false,
                    balance: 0,
                    message: 'Wallet not found',
                };
            }
            return {
                success: true,
                balance: wallet.balance,
                message: 'Wallet balance retrieved successfully',
            };
        }
        catch (error) {
            console.error('Error retrieving wallet balance:', error);
            if (error.code === 'P1001' || error.message?.includes('connect')) {
                return {
                    success: false,
                    balance: 0,
                    message: 'Database connection error. Please try again later.',
                    error: 'Database unavailable',
                };
            }
            return {
                success: false,
                balance: 0,
                message: 'Failed to retrieve wallet balance',
                error: error.message,
            };
        }
    }
    async getTransactions(customerId, page = 1, limit = 10, type) {
        try {
            const wallet = await this.prisma.wallet.findUnique({
                where: { customerId },
            });
            if (!wallet) {
                return {
                    success: false,
                    transactions: [],
                    total: 0,
                    page,
                    limit,
                    message: 'Wallet not found',
                };
            }
            const skip = (page - 1) * limit;
            const whereConditions = { customerId };
            if (type) {
                whereConditions.type = type;
            }
            const [transactions, total] = await Promise.all([
                this.prisma.transaction.findMany({
                    where: whereConditions,
                    skip,
                    take: limit,
                    orderBy: { timestamp: 'desc' },
                }),
                this.prisma.transaction.count({
                    where: whereConditions,
                }),
            ]);
            return {
                success: true,
                transactions: transactions.map(t => ({
                    id: t.id,
                    customerId: t.customerId,
                    amount: t.amount,
                    type: t.type,
                    description: t.description,
                    reference: t.reference || '',
                    chargingSessionId: t.chargingSessionId || '',
                    timestamp: t.timestamp.toISOString(),
                })),
                total,
                page,
                limit,
                message: 'Transactions retrieved successfully',
            };
        }
        catch (error) {
            console.error('Error retrieving transactions:', error);
            if (error.code === 'P1001' || error.message?.includes('connect')) {
                return {
                    success: false,
                    transactions: [],
                    total: 0,
                    page,
                    limit,
                    message: 'Database connection error. Please try again later.',
                    error: 'Database unavailable',
                };
            }
            return {
                success: false,
                transactions: [],
                total: 0,
                page,
                limit,
                message: 'Failed to retrieve transactions',
                error: error.message,
            };
        }
    }
    async getWalletSummary(customerId) {
        try {
            const wallet = await this.prisma.wallet.findUnique({
                where: { customerId },
                include: {
                    transactions: {
                        orderBy: { timestamp: 'desc' },
                        take: 1,
                    },
                },
            });
            if (!wallet) {
                return {
                    success: false,
                    summary: null,
                    message: 'Wallet not found',
                };
            }
            const [totalTransactions, totalCredits, totalDebits] = await Promise.all([
                this.prisma.transaction.count({ where: { customerId } }),
                this.prisma.transaction.aggregate({
                    where: { customerId, type: 'credit' },
                    _sum: { amount: true },
                }),
                this.prisma.transaction.aggregate({
                    where: { customerId, type: 'debit' },
                    _sum: { amount: true },
                }),
            ]);
            const summary = {
                walletId: wallet.id,
                customerId: wallet.customerId,
                balance: wallet.balance,
                totalTransactions,
                totalCredits: totalCredits._sum.amount || 0,
                totalDebits: totalDebits._sum.amount || 0,
                lastTransactionDate: wallet.transactions[0]?.timestamp.toISOString() || '',
            };
            return {
                success: true,
                summary,
                message: 'Wallet summary retrieved successfully',
            };
        }
        catch (error) {
            console.error('Error retrieving wallet summary:', error);
            if (error.code === 'P1001' || error.message?.includes('connect')) {
                return {
                    success: false,
                    summary: null,
                    message: 'Database connection error. Please try again later.',
                    error: 'Database unavailable',
                };
            }
            return {
                success: false,
                summary: null,
                message: 'Failed to retrieve wallet summary',
                error: error.message,
            };
        }
    }
    async getWallet(customerId) {
        try {
            const wallet = await this.prisma.wallet.findUnique({
                where: { customerId },
            });
            if (!wallet) {
                return {
                    success: false,
                    walletId: '',
                    balance: 0,
                    customerId: '',
                    message: 'Wallet not found',
                };
            }
            return {
                success: true,
                walletId: wallet.id,
                balance: wallet.balance,
                customerId: wallet.customerId,
                message: 'Wallet retrieved successfully',
            };
        }
        catch (error) {
            console.error('Error retrieving wallet:', error);
            if (error.code === 'P1001' || error.message?.includes('connect')) {
                return {
                    success: false,
                    walletId: '',
                    balance: 0,
                    customerId: '',
                    message: 'Database connection error. Please try again later.',
                    error: 'Database unavailable',
                };
            }
            return {
                success: false,
                walletId: '',
                balance: 0,
                customerId: '',
                message: 'Failed to retrieve wallet',
                error: error.message,
            };
        }
    }
    async createWallet(customerId, initialBalance = 0) {
        try {
            const existingWallet = await this.prisma.wallet.findUnique({
                where: { customerId },
            });
            if (existingWallet) {
                return {
                    success: false,
                    walletId: '',
                    message: 'Wallet already exists for this customer',
                };
            }
            const wallet = await this.prisma.wallet.create({
                data: {
                    customerId,
                    balance: initialBalance,
                },
            });
            if (initialBalance > 0) {
                await this.prisma.transaction.create({
                    data: {
                        walletId: wallet.id,
                        customerId,
                        amount: initialBalance,
                        type: 'credit',
                        description: 'Initial wallet balance',
                        reference: `initial_balance_${Date.now()}`,
                    },
                });
            }
            return {
                success: true,
                walletId: wallet.id,
                balance: wallet.balance,
                message: 'Wallet created successfully',
            };
        }
        catch (error) {
            console.error('Error creating wallet:', error);
            return {
                success: false,
                walletId: '',
                message: 'Failed to create wallet',
                error: error.message,
            };
        }
    }
    async deductBalance(customerId, amount, chargingSessionId, description) {
        try {
            if (amount <= 0) {
                return {
                    success: false,
                    newBalance: 0,
                    transactionId: '',
                    message: 'Amount must be greater than zero',
                };
            }
            const wallet = await this.prisma.wallet.findUnique({
                where: { customerId },
            });
            if (!wallet) {
                return {
                    success: false,
                    newBalance: 0,
                    transactionId: '',
                    message: 'Wallet not found',
                };
            }
            if (wallet.balance < amount) {
                return {
                    success: false,
                    newBalance: wallet.balance,
                    transactionId: '',
                    message: 'Insufficient balance',
                    requiredAmount: amount,
                    currentBalance: wallet.balance,
                };
            }
            const updatedWallet = await this.prisma.wallet.update({
                where: { customerId },
                data: { balance: wallet.balance - amount },
            });
            const transaction = await this.prisma.transaction.create({
                data: {
                    walletId: wallet.id,
                    customerId,
                    amount,
                    type: 'debit',
                    description: description || `Charging session payment`,
                    reference: `charging_session_${chargingSessionId}`,
                    chargingSessionId,
                },
            });
            return {
                success: true,
                newBalance: updatedWallet.balance,
                transactionId: transaction.id,
                message: `Successfully deducted $${amount.toFixed(2)} for charging session`,
                chargingSessionId,
            };
        }
        catch (error) {
            console.error('Error deducting balance:', error);
            return {
                success: false,
                newBalance: 0,
                transactionId: '',
                message: 'Failed to deduct balance',
                error: error.message,
            };
        }
    }
};
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CustomerService);
//# sourceMappingURL=customer.service.js.map
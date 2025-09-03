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
exports.WalletService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let WalletService = class WalletService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createWallet(userId, customerName, customerEmail) {
        try {
            const existingWallet = await this.prisma.wallet.findUnique({
                where: { userId },
            });
            if (existingWallet) {
                return {
                    success: false,
                    walletId: '',
                    message: 'Wallet already exists for this user',
                };
            }
            const wallet = await this.prisma.wallet.create({
                data: {
                    userId,
                    customerName,
                    customerEmail,
                    balance: 0,
                },
            });
            return {
                success: true,
                walletId: wallet.id,
                message: 'Wallet created successfully',
            };
        }
        catch (error) {
            console.error('Error creating wallet:', error);
            return {
                success: false,
                walletId: '',
                message: 'Failed to create wallet',
            };
        }
    }
    async getWallet(userId) {
        try {
            const wallet = await this.prisma.wallet.findUnique({
                where: { userId },
            });
            if (!wallet) {
                return {
                    success: false,
                    walletId: '',
                    balance: 0,
                    userId: '',
                    customerName: '',
                    message: 'Wallet not found',
                };
            }
            return {
                success: true,
                walletId: wallet.id,
                balance: wallet.balance,
                userId: wallet.userId,
                customerName: wallet.customerName,
                message: 'Wallet retrieved successfully',
            };
        }
        catch (error) {
            console.error('Error retrieving wallet:', error);
            return {
                success: false,
                walletId: '',
                balance: 0,
                userId: '',
                customerName: '',
                message: 'Failed to retrieve wallet',
            };
        }
    }
    async deductBalance(userId, amount, description) {
        try {
            const wallet = await this.prisma.wallet.findUnique({
                where: { userId },
            });
            if (!wallet) {
                return {
                    success: false,
                    newBalance: 0,
                    message: 'Wallet not found',
                };
            }
            if (wallet.balance < amount) {
                return {
                    success: false,
                    newBalance: wallet.balance,
                    message: 'Insufficient balance',
                };
            }
            const updatedWallet = await this.prisma.wallet.update({
                where: { userId },
                data: { balance: wallet.balance - amount },
            });
            await this.prisma.transaction.create({
                data: {
                    walletId: wallet.id,
                    userId,
                    amount,
                    type: 'debit',
                    description,
                },
            });
            return {
                success: true,
                newBalance: updatedWallet.balance,
                message: 'Balance deducted successfully',
            };
        }
        catch (error) {
            console.error('Error deducting balance:', error);
            return {
                success: false,
                newBalance: 0,
                message: 'Failed to deduct balance',
            };
        }
    }
    async getTransactions(userId, page = 1, limit = 10) {
        try {
            const wallet = await this.prisma.wallet.findUnique({
                where: { userId },
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
            const [transactions, total] = await Promise.all([
                this.prisma.transaction.findMany({
                    where: { userId },
                    skip,
                    take: limit,
                    orderBy: { timestamp: 'desc' },
                }),
                this.prisma.transaction.count({
                    where: { userId },
                }),
            ]);
            return {
                success: true,
                transactions: transactions.map(t => ({
                    id: t.id,
                    userId: t.userId,
                    amount: t.amount,
                    type: t.type,
                    description: t.description,
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
            return {
                success: false,
                transactions: [],
                total: 0,
                page,
                limit,
                message: 'Failed to retrieve transactions',
            };
        }
    }
    async getChargingSessions(userId, page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;
            const [sessions, total] = await Promise.all([
                this.prisma.chargingSession.findMany({
                    where: { userId },
                    skip,
                    take: limit,
                    orderBy: { startTime: 'desc' },
                }),
                this.prisma.chargingSession.count({
                    where: { userId },
                }),
            ]);
            return {
                success: true,
                sessions: sessions.map(s => ({
                    id: s.id,
                    userId: s.userId,
                    bikeId: s.bikeId,
                    amount: s.amount,
                    startTime: s.startTime.toISOString(),
                    endTime: s.endTime?.toISOString() || '',
                    status: s.status,
                })),
                total,
                page,
                limit,
                message: 'Charging sessions retrieved successfully',
            };
        }
        catch (error) {
            console.error('Error retrieving charging sessions:', error);
            return {
                success: false,
                sessions: [],
                total: 0,
                page,
                limit,
                message: 'Failed to retrieve charging sessions',
            };
        }
    }
    async deleteWallet(userId) {
        try {
            const wallet = await this.prisma.wallet.findUnique({
                where: { userId },
            });
            if (!wallet) {
                return {
                    success: false,
                    message: 'Wallet not found',
                    balance: 0,
                    canDelete: false,
                };
            }
            if (wallet.balance > 0) {
                return {
                    success: false,
                    message: `Cannot delete wallet with remaining balance of $${wallet.balance.toFixed(2)}`,
                    balance: wallet.balance,
                    canDelete: false,
                };
            }
            await this.prisma.transaction.deleteMany({
                where: { userId },
            });
            await this.prisma.wallet.delete({
                where: { userId },
            });
            return {
                success: true,
                message: 'Wallet and all associated transactions deleted successfully',
                balance: 0,
                canDelete: true,
            };
        }
        catch (error) {
            console.error('Error deleting wallet:', error);
            return {
                success: false,
                message: 'Failed to delete wallet',
                balance: 0,
                canDelete: false,
            };
        }
    }
};
exports.WalletService = WalletService;
exports.WalletService = WalletService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WalletService);
//# sourceMappingURL=wallet.service.js.map
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
var CustomersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const wallet_grpc_service_1 = require("../common/grpc/wallet-grpc.service");
const bcrypt = __importStar(require("bcrypt"));
const rxjs_1 = require("rxjs");
let CustomersService = CustomersService_1 = class CustomersService {
    prisma;
    walletGrpcService;
    logger = new common_1.Logger(CustomersService_1.name);
    constructor(prisma, walletGrpcService) {
        this.prisma = prisma;
        this.walletGrpcService = walletGrpcService;
    }
    async createCustomer(data) {
        const existingCustomer = await this.prisma.customer.findUnique({
            where: { email: data.email },
        });
        if (existingCustomer) {
            throw new common_1.ConflictException('Customer with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(data.password, 5);
        const customer = await this.prisma.customer.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hashedPassword,
                phone: data.phone,
                address: data.address,
            },
        });
        try {
            this.logger.log(`Creating wallet for customer: ${customer.email}`);
            const walletResponse = await (0, rxjs_1.firstValueFrom)(this.walletGrpcService.createWallet({
                userId: customer.id,
                customerName: `${customer.firstName} ${customer.lastName}`,
                customerEmail: customer.email,
            }));
            if (walletResponse.success) {
                this.logger.log(`Wallet created successfully for customer: ${customer.email}, Wallet ID: ${walletResponse.walletId}`);
            }
            else {
                this.logger.error(`Failed to create wallet for customer: ${customer.email}, Error: ${walletResponse.message}`);
            }
        }
        catch (error) {
            this.logger.error(`Error creating wallet for customer ${customer.email}:`, error);
        }
        const { password, ...customerWithoutPassword } = customer;
        return customerWithoutPassword;
    }
    async getAllCustomers(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [customers, total] = await Promise.all([
            this.prisma.customer.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true,
                    address: true,
                    createdAt: true,
                    updatedAt: true,
                },
            }),
            this.prisma.customer.count(),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            items: customers,
            total,
            page,
            limit,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
        };
    }
    async getCustomerById(id) {
        const cleanId = id.replace(/[{}]/g, '');
        if (!/^[0-9a-fA-F]{24}$/.test(cleanId)) {
            throw new common_1.BadRequestException('Invalid customer ID format');
        }
        const customer = await this.prisma.customer.findUnique({
            where: { id: cleanId },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                address: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!customer) {
            throw new common_1.NotFoundException('Customer not found');
        }
        return customer;
    }
    async updateCustomer(id, data) {
        const cleanId = id.replace(/[{}]/g, '');
        if (!/^[0-9a-fA-F]{24}$/.test(cleanId)) {
            throw new common_1.BadRequestException('Invalid customer ID format');
        }
        const existingCustomer = await this.prisma.customer.findUnique({
            where: { id: cleanId },
        });
        if (!existingCustomer) {
            throw new common_1.NotFoundException('Customer not found');
        }
        if (data.email && data.email !== existingCustomer.email) {
            const emailConflict = await this.prisma.customer.findUnique({
                where: { email: data.email },
            });
            if (emailConflict) {
                throw new common_1.ConflictException('Customer with this email already exists');
            }
        }
        const customer = await this.prisma.customer.update({
            where: { id: cleanId },
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                address: data.address,
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                address: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return customer;
    }
    async deleteCustomer(id) {
        const cleanId = id.replace(/[{}]/g, '');
        if (!/^[0-9a-fA-F]{24}$/.test(cleanId)) {
            throw new common_1.BadRequestException('Invalid customer ID format');
        }
        const existingCustomer = await this.prisma.customer.findUnique({
            where: { id: cleanId },
        });
        if (!existingCustomer) {
            throw new common_1.NotFoundException('Customer not found');
        }
        const activeAssignments = await this.prisma.bikeAssignment.findFirst({
            where: {
                customerId: cleanId,
                returnedAt: undefined,
            },
        });
        if (activeAssignments) {
            throw new common_1.ConflictException('Cannot delete customer with active bike assignments');
        }
        const customerInfo = {
            id: existingCustomer.id,
            email: existingCustomer.email,
            name: `${existingCustomer.firstName} ${existingCustomer.lastName}`,
        };
        let walletBalance = 0;
        let walletMessage = '';
        try {
            this.logger.log(`Checking wallet balance for customer: ${existingCustomer.email}`);
            const walletResponse = await (0, rxjs_1.firstValueFrom)(this.walletGrpcService.getWallet({
                userId: cleanId,
            }));
            if (walletResponse.success) {
                walletBalance = walletResponse.balance;
                this.logger.log(`Wallet balance for customer ${existingCustomer.email}: $${walletBalance}`);
            }
            else {
                this.logger.warn(`Failed to retrieve wallet for customer: ${existingCustomer.email}, Error: ${walletResponse.message}`);
                walletMessage = walletResponse.message;
            }
        }
        catch (error) {
            this.logger.error(`Error checking wallet balance for customer ${existingCustomer.email}:`, error);
            throw new common_1.BadRequestException('Unable to verify wallet balance. Please try again.');
        }
        if (walletBalance > 0) {
            throw new common_1.BadRequestException(`Customer cannot be deleted because wallet balance is not zero. Current balance: $${walletBalance.toFixed(2)}`);
        }
        let walletDeleted = false;
        let finalWalletMessage = 'Wallet not found or already deleted';
        try {
            this.logger.log(`Attempting to delete wallet for customer: ${existingCustomer.email}`);
            const deleteWalletResponse = await (0, rxjs_1.firstValueFrom)(this.walletGrpcService.deleteWallet({
                userId: cleanId,
            }));
            if (deleteWalletResponse.success) {
                walletDeleted = true;
                finalWalletMessage = deleteWalletResponse.message;
                this.logger.log(`Wallet deleted successfully for customer: ${existingCustomer.email}`);
            }
            else {
                finalWalletMessage = deleteWalletResponse.message;
                this.logger.warn(`Failed to delete wallet for customer: ${existingCustomer.email}, Error: ${deleteWalletResponse.message}`);
            }
        }
        catch (error) {
            this.logger.error(`Error deleting wallet for customer ${existingCustomer.email}:`, error);
            finalWalletMessage = 'Error deleting wallet - wallet may still exist';
        }
        await this.prisma.customer.delete({
            where: { id: cleanId },
        });
        this.logger.log(`Customer deleted successfully: ${existingCustomer.email}`);
        return {
            message: 'Customer and wallet deleted successfully',
            customerId: customerInfo.id,
            customerEmail: customerInfo.email,
            customerName: customerInfo.name,
            walletDeleted,
            walletBalance,
            walletMessage: finalWalletMessage,
        };
    }
    async searchCustomers(query, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [customers, total] = await Promise.all([
            this.prisma.customer.findMany({
                where: {
                    OR: [
                        { firstName: { contains: query, mode: 'insensitive' } },
                        { lastName: { contains: query, mode: 'insensitive' } },
                        { email: { contains: query, mode: 'insensitive' } },
                    ],
                },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true,
                    address: true,
                    createdAt: true,
                    updatedAt: true,
                },
            }),
            this.prisma.customer.count({
                where: {
                    OR: [
                        { firstName: { contains: query, mode: 'insensitive' } },
                        { lastName: { contains: query, mode: 'insensitive' } },
                        { email: { contains: query, mode: 'insensitive' } },
                    ],
                },
            }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            items: customers,
            total,
            page,
            limit,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
        };
    }
    async getCustomerWallet(customerId) {
        const cleanId = customerId.replace(/[{}]/g, '');
        if (!/^[0-9a-fA-F]{24}$/.test(cleanId)) {
            throw new common_1.BadRequestException('Invalid customer ID format');
        }
        try {
            this.logger.log(`Fetching wallet for customer: ${cleanId}`);
            const walletResponse = await (0, rxjs_1.firstValueFrom)(this.walletGrpcService.getWallet({
                userId: cleanId,
            }));
            if (walletResponse.success) {
                this.logger.log(`Wallet retrieved successfully for customer: ${cleanId}`);
                return walletResponse;
            }
            else {
                this.logger.error(`Failed to retrieve wallet for customer: ${cleanId}, Error: ${walletResponse.message}`);
                return walletResponse;
            }
        }
        catch (error) {
            this.logger.error(`Error retrieving wallet for customer ${cleanId}:`, error);
            return {
                success: false,
                walletId: '',
                balance: 0,
                userId: '',
                customerName: '',
                message: 'Failed to retrieve wallet due to gRPC error'
            };
        }
    }
};
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = CustomersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        wallet_grpc_service_1.WalletGrpcService])
], CustomersService);
//# sourceMappingURL=customers.service.js.map
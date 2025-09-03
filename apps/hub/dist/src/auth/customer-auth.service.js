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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerAuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
let CustomerAuthService = class CustomerAuthService {
    prisma;
    jwtService;
    blockedTokens = new Set();
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async registerCustomer(data) {
        const existingCustomer = await this.prisma.customer.findUnique({
            where: { email: data.email },
        });
        if (existingCustomer) {
            throw new common_1.UnauthorizedException('Customer with this email already exists');
        }
        const hashed = await bcrypt.hash(data.password, 5);
        const customer = await this.prisma.customer.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hashed,
                phone: data.phone,
                address: data.address,
            },
        });
        return customer;
    }
    async loginCustomer(email, password) {
        const customer = await this.prisma.customer.findUnique({
            where: { email },
        });
        if (!customer)
            throw new common_1.UnauthorizedException('Invalid customer credentials');
        const match = await bcrypt.compare(password, customer.password);
        if (!match)
            throw new common_1.UnauthorizedException('Invalid customer credentials');
        const token = this.jwtService.sign({
            sub: customer.id,
            type: 'customer',
            email: customer.email
        });
        return { token, customer };
    }
    async logoutWithCredentials(email, password) {
        const customer = await this.prisma.customer.findUnique({
            where: { email },
        });
        if (!customer) {
            throw new common_1.UnauthorizedException('Invalid customer credentials');
        }
        const match = await bcrypt.compare(password, customer.password);
        if (!match) {
            throw new common_1.UnauthorizedException('Invalid customer credentials');
        }
        return { message: 'Customer logged out successfully' };
    }
    async logout(token) {
        this.blockedTokens.add(token);
        if (this.blockedTokens.size > 1000) {
            this.blockedTokens.clear();
        }
    }
    async validateToken(token) {
        if (this.blockedTokens.has(token)) {
            throw new common_1.UnauthorizedException('Token blocked');
        }
        try {
            const payload = this.jwtService.verify(token);
            if (payload.type !== 'customer') {
                throw new common_1.UnauthorizedException('Invalid token type');
            }
            return payload;
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
    async getCustomerById(id) {
        const customer = await this.prisma.customer.findUnique({
            where: { id },
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
    async updateCustomer(customerId, data) {
        const existingCustomer = await this.prisma.customer.findUnique({
            where: { id: customerId },
        });
        if (!existingCustomer) {
            throw new common_1.NotFoundException('Customer not found');
        }
        if (data.email && data.email !== existingCustomer.email) {
            const emailExists = await this.prisma.customer.findUnique({
                where: { email: data.email },
            });
            if (emailExists) {
                throw new common_1.ConflictException('Email already exists');
            }
        }
        const updatedCustomer = await this.prisma.customer.update({
            where: { id: customerId },
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
        return updatedCustomer;
    }
    async changePassword(customerId, currentPassword, newPassword) {
        const customer = await this.prisma.customer.findUnique({
            where: { id: customerId },
        });
        if (!customer) {
            throw new common_1.NotFoundException('Customer not found');
        }
        const match = await bcrypt.compare(currentPassword, customer.password);
        if (!match) {
            throw new common_1.BadRequestException('Current password is incorrect');
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await this.prisma.customer.update({
            where: { id: customerId },
            data: { password: hashedNewPassword },
        });
        return { message: 'Password changed successfully' };
    }
};
exports.CustomerAuthService = CustomerAuthService;
exports.CustomerAuthService = CustomerAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], CustomerAuthService);
//# sourceMappingURL=customer-auth.service.js.map
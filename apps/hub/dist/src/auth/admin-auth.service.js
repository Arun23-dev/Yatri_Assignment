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
exports.AdminAuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
let AdminAuthService = class AdminAuthService {
    prisma;
    jwtService;
    blockedTokens = new Set();
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async registerAdmin(data) {
        const existingAdmin = await this.prisma.admin.findUnique({
            where: { email: data.email },
        });
        if (existingAdmin) {
            throw new common_1.UnauthorizedException('Admin with this email already exists');
        }
        const hashed = await bcrypt.hash(data.password, 5);
        const admin = await this.prisma.admin.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hashed,
            },
        });
        return admin;
    }
    async registerFirstAdmin(data) {
        const adminCount = await this.prisma.admin.count();
        if (adminCount > 0) {
            throw new common_1.UnauthorizedException('Admin already exists in the system. Use regular admin registration.');
        }
        const existingAdmin = await this.prisma.admin.findUnique({
            where: { email: data.email },
        });
        if (existingAdmin) {
            throw new common_1.UnauthorizedException('Admin with this email already exists');
        }
        const hashed = await bcrypt.hash(data.password, 5);
        const admin = await this.prisma.admin.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hashed,
            },
        });
        return admin;
    }
    async loginAdmin(email, password) {
        const admin = await this.prisma.admin.findUnique({
            where: { email },
        });
        if (!admin)
            throw new common_1.UnauthorizedException('Invalid admin credentials');
        const match = await bcrypt.compare(password, admin.password);
        if (!match)
            throw new common_1.UnauthorizedException('Invalid admin credentials');
        const token = this.jwtService.sign({
            sub: admin.id,
            type: 'admin',
            email: admin.email,
        });
        return { token, admin };
    }
    async logoutWithCredentials(email, password) {
        const admin = await this.prisma.admin.findUnique({
            where: { email },
        });
        if (!admin) {
            throw new common_1.UnauthorizedException('Invalid admin credentials');
        }
        const match = await bcrypt.compare(password, admin.password);
        if (!match) {
            throw new common_1.UnauthorizedException('Invalid admin credentials');
        }
        return { message: 'Admin logged out successfully' };
    }
    async logout(token) {
        this.blockedTokens.add(token);
        if (this.blockedTokens.size > 1000) {
            this.blockedTokens.clear();
        }
    }
    validateToken(token) {
        if (this.blockedTokens.has(token)) {
            throw new common_1.UnauthorizedException('Token blocked');
        }
        try {
            const payload = this.jwtService.verify(token);
            if (payload.type !== 'admin') {
                throw new common_1.UnauthorizedException('Invalid token type');
            }
            return payload;
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
    async getAdminById(id) {
        return this.prisma.admin.findUnique({
            where: { id },
        });
    }
};
exports.AdminAuthService = AdminAuthService;
exports.AdminAuthService = AdminAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AdminAuthService);
//# sourceMappingURL=admin-auth.service.js.map
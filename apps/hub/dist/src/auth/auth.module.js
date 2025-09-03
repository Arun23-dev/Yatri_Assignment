"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const auth_controller_1 = require("./auth.controller");
const admin_auth_service_1 = require("./admin-auth.service");
const customer_auth_service_1 = require("./customer-auth.service");
const admin_auth_guard_1 = require("./guards/admin-auth.guard");
const customer_auth_guard_1 = require("./guards/customer-auth.guard");
const prisma_module_1 = require("../prisma/prisma.module");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'your-secret-key',
                signOptions: { expiresIn: '24h' },
            }),
            prisma_module_1.PrismaModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            admin_auth_service_1.AdminAuthService,
            customer_auth_service_1.CustomerAuthService,
            admin_auth_guard_1.AdminAuthGuard,
            customer_auth_guard_1.CustomerAuthGuard,
        ],
        exports: [
            admin_auth_service_1.AdminAuthService,
            customer_auth_service_1.CustomerAuthService,
            admin_auth_guard_1.AdminAuthGuard,
            customer_auth_guard_1.CustomerAuthGuard,
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map
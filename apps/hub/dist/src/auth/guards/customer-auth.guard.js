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
exports.CustomerAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const customer_auth_service_1 = require("../customer-auth.service");
let CustomerAuthGuard = class CustomerAuthGuard {
    customerAuthService;
    constructor(customerAuthService) {
        this.customerAuthService = customerAuthService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromRequest(request);
        if (!token) {
            throw new common_1.UnauthorizedException('No token provided');
        }
        try {
            const payload = await this.customerAuthService.validateToken(token);
            request.customer = payload;
            return true;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
    extractTokenFromRequest(request) {
        const authHeader = request.headers.authorization;
        if (authHeader) {
            const [type, token] = authHeader.split(' ');
            if (type === 'Bearer') {
                return token;
            }
        }
        const cookieToken = request.cookies?.customer_token;
        if (cookieToken) {
            return cookieToken;
        }
        return undefined;
    }
};
exports.CustomerAuthGuard = CustomerAuthGuard;
exports.CustomerAuthGuard = CustomerAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [customer_auth_service_1.CustomerAuthService])
], CustomerAuthGuard);
//# sourceMappingURL=customer-auth.guard.js.map
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtVerificationService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const axios_1 = __importDefault(require("axios"));
let JwtVerificationService = class JwtVerificationService {
    jwtService;
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async verifyTokenFromHub(token) {
        try {
            const response = await axios_1.default.post('http://localhost:3001/auth/verify-token', {
                token
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        }
        catch (error) {
            try {
                const payload = this.jwtService.verify(token);
                if (payload.type !== 'customer') {
                    throw new common_1.UnauthorizedException('Invalid token type');
                }
                return payload;
            }
            catch (jwtError) {
                throw new common_1.UnauthorizedException('Invalid or expired token');
            }
        }
    }
    async getCustomerInfo(customerId) {
        try {
            const response = await axios_1.default.get(`http://localhost:3001/customers/${customerId}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Customer not found');
        }
    }
};
exports.JwtVerificationService = JwtVerificationService;
exports.JwtVerificationService = JwtVerificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], JwtVerificationService);
//# sourceMappingURL=jwt-verification.service.js.map
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
exports.WalletController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const wallet_service_1 = require("./wallet.service");
let WalletController = class WalletController {
    walletService;
    constructor(walletService) {
        this.walletService = walletService;
    }
    async createWallet(data) {
        return this.walletService.createWallet(data.customerId, data.initialBalance || 0);
    }
    async getWallet(data) {
        return this.walletService.getWallet(data.customerId);
    }
    async deductBalance(data) {
        return this.walletService.deductBalance(data.customerId, data.amount, data.chargingSessionId || '', data.reference);
    }
    async getTransactions(data) {
        return this.walletService.getTransactions(data.customerId, data.page || 1, data.limit || 10, data.type);
    }
    async creditBalance(data) {
        return this.walletService.addFunds(data.customerId, data.amount, data.paymentMethod, data.reference, data.description);
    }
    async getWalletBalance(data) {
        return this.walletService.getWalletBalance(data.customerId);
    }
    async getWalletSummary(data) {
        return this.walletService.getWalletSummary(data.customerId);
    }
    async deleteCustomer(data) {
        return this.walletService.deleteCustomer(data.customerId);
    }
};
exports.WalletController = WalletController;
__decorate([
    (0, microservices_1.GrpcMethod)('WalletService', 'CreateWallet'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "createWallet", null);
__decorate([
    (0, microservices_1.GrpcMethod)('WalletService', 'GetWallet'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "getWallet", null);
__decorate([
    (0, microservices_1.GrpcMethod)('WalletService', 'DeductBalance'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "deductBalance", null);
__decorate([
    (0, microservices_1.GrpcMethod)('WalletService', 'GetTransactions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "getTransactions", null);
__decorate([
    (0, microservices_1.GrpcMethod)('WalletService', 'CreditBalance'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "creditBalance", null);
__decorate([
    (0, microservices_1.GrpcMethod)('WalletService', 'GetWalletBalance'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "getWalletBalance", null);
__decorate([
    (0, microservices_1.GrpcMethod)('WalletService', 'GetWalletSummary'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "getWalletSummary", null);
__decorate([
    (0, microservices_1.GrpcMethod)('WalletService', 'DeleteCustomer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "deleteCustomer", null);
exports.WalletController = WalletController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [wallet_service_1.WalletService])
], WalletController);
//# sourceMappingURL=wallet.controller.js.map
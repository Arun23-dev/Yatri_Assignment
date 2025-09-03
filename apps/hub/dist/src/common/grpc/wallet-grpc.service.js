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
exports.WalletGrpcService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const path_1 = require("path");
let WalletGrpcService = class WalletGrpcService {
    client;
    walletService;
    onModuleInit() {
        this.walletService = this.client.getService('WalletService');
    }
    createWallet(data) {
        return this.walletService.createWallet(data);
    }
    getWallet(data) {
        return this.walletService.getWallet(data);
    }
    deductBalance(data) {
        return this.walletService.deductBalance(data);
    }
    deleteWallet(data) {
        return this.walletService.deleteWallet(data);
    }
    getTransactions(data) {
        return this.walletService.getTransactions(data);
    }
    getChargingSessions(data) {
        return this.walletService.getChargingSessions(data);
    }
};
exports.WalletGrpcService = WalletGrpcService;
__decorate([
    (0, microservices_1.Client)({
        transport: microservices_1.Transport.GRPC,
        options: {
            package: 'wallet',
            protoPath: (0, path_1.join)(__dirname, '../../proto/wallet.proto'),
            url: process.env.WALLET_GRPC_URL || 'localhost:5000',
        },
    }),
    __metadata("design:type", Object)
], WalletGrpcService.prototype, "client", void 0);
exports.WalletGrpcService = WalletGrpcService = __decorate([
    (0, common_1.Injectable)()
], WalletGrpcService);
//# sourceMappingURL=wallet-grpc.service.js.map
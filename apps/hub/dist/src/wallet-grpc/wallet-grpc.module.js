"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletGrpcModule = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const path_1 = require("path");
const wallet_grpc_service_1 = require("./wallet-grpc.service");
let WalletGrpcModule = class WalletGrpcModule {
};
exports.WalletGrpcModule = WalletGrpcModule;
exports.WalletGrpcModule = WalletGrpcModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'WALLET_PACKAGE',
                    transport: microservices_1.Transport.GRPC,
                    options: {
                        package: 'wallet',
                        protoPath: (0, path_1.join)(__dirname, '../../../apps/wallet/src/proto/wallet.proto'),
                        url: process.env.WALLET_GRPC_URL || 'localhost:5000',
                    },
                },
            ]),
        ],
        providers: [wallet_grpc_service_1.WalletGrpcService],
        exports: [wallet_grpc_service_1.WalletGrpcService],
    })
], WalletGrpcModule);
//# sourceMappingURL=wallet-grpc.module.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const path_1 = require("path");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const grpcApp = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.GRPC,
        options: {
            package: 'wallet',
            protoPath: (0, path_1.join)(__dirname, '../src/proto/wallet.proto'),
            url: process.env.WALLET_GRPC_URL || 'localhost:5000',
        },
    });
    await grpcApp.listen();
    console.log('Wallet gRPC microservice is running on:', process.env.WALLET_GRPC_URL || 'localhost:5000');
}
bootstrap();
//# sourceMappingURL=grpc-main.js.map
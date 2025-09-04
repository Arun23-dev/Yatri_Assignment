"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const path_1 = require("path");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
async function bootstrap() {
    const httpApp = await core_1.NestFactory.create(app_module_1.AppModule);
    httpApp.enableCors();
    httpApp.use((0, cookie_parser_1.default)());
    httpApp.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: false,
        forbidNonWhitelisted: false,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Wallet App API')
        .setDescription('Wallet management API for customers and admins')
        .setVersion('1.0')
        .addTag('customer-wallet', 'Customer wallet operations')
        .addTag('admin-wallet', 'Admin wallet operations')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(httpApp, config);
    swagger_1.SwaggerModule.setup('api', httpApp, document);
    const httpPort = process.env.WALLET_HTTP_PORT || 3002;
    await httpApp.listen(httpPort);
    console.log('Wallet HTTP server is running on port:', httpPort);
    console.log('Swagger documentation available at: http://localhost:' + httpPort + '/api');
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
    console.log('✅ Wallet App (HTTP + gRPC) is now running!');
}
bootstrap();
//# sourceMappingURL=main.js.map
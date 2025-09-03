"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.use((0, cookie_parser_1.default)());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('YatriTask Hub API')
        .setDescription(`
      # 🚀 YatriTask Hub API Documentation
      
      ## Overview
      This is the main REST API for the YatriTask bike rental management system. 
      It handles authentication, user management, bike operations, and communicates with the Wallet microservice via gRPC.
      
      ## 🔐 Authentication
      Most endpoints require JWT authentication. Include your JWT token in the Authorization header:
      \`Authorization: Bearer <your_jwt_token>\`
      
      ## 👥 User Roles
      - **CUSTOMER**: Can view own wallet, transactions, and charging sessions
      - **ADMIN**: Full access to all APIs and user management
      - **STAFF**: Limited admin access
      
      ## 🚴 Bike Management
      - Create, view, and manage bikes
      - Assign bikes to users
      - Return bikes from users
      - Track bike status
      
      ## 💰 Wallet Operations
      - View wallet balance and transactions
      - Access charging session history
      - All wallet operations are handled via gRPC communication with the Wallet microservice
      
      ## 📊 API Endpoints
      - **Authentication**: Register, login, logout
      - **Users**: CRUD operations for user management
      - **Bikes**: Bike inventory and assignment management
      - **Admins**: Admin-specific operations and dashboard
      
      ## 🔗 Related Services
      - **Wallet Microservice**: Runs on localhost:5000 (gRPC)
      - **Swagger UI**: Interactive API documentation
      
      ## 🚨 Error Codes
      - **400**: Bad Request - Invalid input data
      - **401**: Unauthorized - Missing or invalid JWT token
      - **403**: Forbidden - Insufficient permissions
      - **404**: Not Found - Resource not found
      - **409**: Conflict - Resource already exists (e.g., duplicate email)
      - **500**: Internal Server Error - Server-side error
    `)
        .setVersion('1.0.0')
        .addTag('auth', 'Authentication endpoints for user registration and login')
        .addTag('users', 'User management operations (Admin only)')
        .addTag('bikes', 'Bike inventory and assignment management')
        .addTag('admins', 'Admin-specific operations and dashboard')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
    }, 'JWT-auth')
        .addServer('http://localhost:3001', 'Development server')
        .addServer('https://api.yatritask.com', 'Production server')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
            docExpansion: 'none',
            filter: true,
            showRequestDuration: true,
            syntaxHighlight: {
                activate: true,
                theme: 'monokai',
            },
        },
        customSiteTitle: 'YatriTask Hub API Documentation',
        customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info .title { color: #2c3e50; font-size: 36px; }
      .swagger-ui .info .description { font-size: 16px; line-height: 1.6; }
      .swagger-ui .scheme-container { background: #f8f9fa; padding: 20px; border-radius: 8px; }
    `,
    });
    await app.listen(3001);
    console.log(`🚀 Hub application is running on: http://localhost:3001`);
    console.log(`📚 Swagger documentation: http://localhost:3001/api`);
}
bootstrap();
//# sourceMappingURL=main.js.map
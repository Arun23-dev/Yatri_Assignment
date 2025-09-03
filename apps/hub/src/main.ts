import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors();

  // Enable cookie parser
  app.use(cookieParser());

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Enhanced Swagger documentation
  const config = new DocumentBuilder()
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
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for references
    )
    .addServer('http://localhost:3001', 'Development server')
    .addServer('https://api.yatritask.com', 'Production server')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
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

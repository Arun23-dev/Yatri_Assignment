import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  // Create HTTP app for REST APIs
  const httpApp = await NestFactory.create(AppModule);
  
  // Enable CORS
  httpApp.enableCors();
  
  // Enable cookie parser
  httpApp.use(cookieParser());
  
  // Global validation pipe
  httpApp.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: false,
    forbidNonWhitelisted: false,
  }));

  // Swagger documentation setup
  const config = new DocumentBuilder()
    .setTitle('Wallet App API')
    .setDescription('Wallet management API for customers and admins')
    .setVersion('1.0')
    .addTag('customer-wallet', 'Customer wallet operations')
    .addTag('admin-wallet', 'Admin wallet operations')
    .build();
  
  const document = SwaggerModule.createDocument(httpApp, config);
  SwaggerModule.setup('api', httpApp, document);

  // Start HTTP server
  const httpPort = process.env.WALLET_HTTP_PORT || 3002;
  await httpApp.listen(httpPort);
  console.log('Wallet HTTP server is running on port:', httpPort);
  console.log('Swagger documentation available at: http://localhost:' + httpPort + '/api');

  // Create gRPC microservice in the same app
  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'wallet',
        protoPath: join(__dirname, '../src/proto/wallet.proto'),
        url: process.env.WALLET_GRPC_URL || 'localhost:5000',
      },
    },
  );

  await grpcApp.listen();
  console.log('Wallet gRPC microservice is running on:', process.env.WALLET_GRPC_URL || 'localhost:5000');
  console.log('✅ Wallet App (HTTP + gRPC) is now running!');
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  // Create gRPC microservice only
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
}
bootstrap();

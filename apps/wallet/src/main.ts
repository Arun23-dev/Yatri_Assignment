import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
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

  await app.listen();
  console.log('Wallet microservice is running on:', process.env.WALLET_GRPC_URL || 'localhost:5000');
}
bootstrap();

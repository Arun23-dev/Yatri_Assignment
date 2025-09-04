import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { WalletGrpcService } from './wallet-grpc/wallet-grpc.service';

async function testWalletCreation() {
  console.log('🧪 Testing Wallet Creation via gRPC...');
  
  try {
    // Create a simple NestJS app for testing
    const app = await NestFactory.createMicroservice<MicroserviceOptions>({
      transport: Transport.GRPC,
      options: {
        package: 'wallet',
        protoPath: join(__dirname, '../../../apps/wallet/src/proto/wallet.proto'),
        url: 'localhost:5000',
      },
    });

    // Get the wallet service
    const walletService = app.get(WalletGrpcService);
    
    // Test wallet creation
    const result = await walletService.createWallet(
      'test-user-123',
      'Test Customer',
      'test@example.com',
      100
    );
    
    console.log('✅ Wallet creation result:', result);
    
    await app.close();
  } catch (error) {
    console.error('❌ Error testing wallet creation:', error);
  }
}

// Run the test
testWalletCreation();

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { WalletGrpcService } from './wallet-grpc.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'WALLET_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'wallet',
          protoPath: join(__dirname, '../../../apps/wallet/src/proto/wallet.proto'),
          url: process.env.WALLET_GRPC_URL || 'localhost:5000',
        },
      },
    ]),
  ],
  providers: [WalletGrpcService],
  exports: [WalletGrpcService],
})
export class WalletGrpcModule {}

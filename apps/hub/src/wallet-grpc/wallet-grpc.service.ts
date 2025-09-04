import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, Transport } from '@nestjs/microservices';
import type { ClientGrpc } from '@nestjs/microservices';
import { join } from 'path';

interface WalletService {
  CreateWallet(data: {
    userId: string;
    customerName: string;
    customerEmail: string;
    initialBalance?: number;
  }): Promise<{
    success: boolean;
    walletId: string;
    balance: number;
    message: string;
  }>;
}

@Injectable()
export class WalletGrpcService implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'wallet',
      protoPath: join(__dirname, '../../../apps/wallet/src/proto/wallet.proto'),
      url: process.env.WALLET_GRPC_URL || 'localhost:5000',
    },
  })
  private client: ClientGrpc;

  private walletService: WalletService;

  onModuleInit() {
    this.walletService = this.client.getService<WalletService>('WalletService');
  }

  async createWallet(userId: string, customerName: string, customerEmail: string, initialBalance: number = 0) {
    try {
      return await this.walletService.CreateWallet({
        userId,
        customerName,
        customerEmail,
        initialBalance,
      });
    } catch (error) {
      console.error('Error creating wallet via gRPC:', error);
      return {
        success: false,
        walletId: '',
        balance: 0,
        message: 'Failed to create wallet',
      };
    }
  }
}

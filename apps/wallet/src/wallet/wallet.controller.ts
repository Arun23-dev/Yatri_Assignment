import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { WalletService } from './wallet.service';

@Controller()
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @GrpcMethod('WalletService', 'CreateWallet')
  async createWallet(data: {
    userId: string;
    customerName: string;
    customerEmail: string;
  }) {
    return this.walletService.createWallet(
      data.userId,
      data.customerName,
      data.customerEmail,
    );
  }

  @GrpcMethod('WalletService', 'GetWallet')
  async getWallet(data: { userId: string }) {
    return this.walletService.getWallet(data.userId);
  }

  @GrpcMethod('WalletService', 'DeductBalance')
  async deductBalance(data: {
    userId: string;
    amount: number;
    description: string;
  }) {
    return this.walletService.deductBalance(
      data.userId,
      data.amount,
      data.description,
    );
  }

  @GrpcMethod('WalletService', 'DeleteWallet')
  async deleteWallet(data: { userId: string }) {
    return this.walletService.deleteWallet(data.userId);
  }

  @GrpcMethod('WalletService', 'GetTransactions')
  async getTransactions(data: {
    userId: string;
    page: number;
    limit: number;
  }) {
    return this.walletService.getTransactions(
      data.userId,
      data.page,
      data.limit,
    );
  }

  @GrpcMethod('WalletService', 'GetChargingSessions')
  async getChargingSessions(data: {
    userId: string;
    page: number;
    limit: number;
  }) {
    return this.walletService.getChargingSessions(
      data.userId,
      data.page,
      data.limit,
    );
  }
}

import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { WalletService } from './wallet.service';

@Controller()
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @GrpcMethod('WalletService', 'CreateWallet')
  async createWallet(data: {
    customerId: string;
    initialBalance?: number;
  }) {
    return this.walletService.createWallet(
      data.customerId,
      data.initialBalance || 0,
    );
  }

  @GrpcMethod('WalletService', 'GetWallet')
  async getWallet(data: { customerId: string }) {
    return this.walletService.getWallet(data.customerId);
  }

  @GrpcMethod('WalletService', 'DeductBalance')
  async deductBalance(data: {
    customerId: string;
    amount: number;
    reference?: string;
    chargingSessionId?: string;
  }) {
    return this.walletService.deductBalance(
      data.customerId,
      data.amount,
      data.chargingSessionId || '',
      data.reference,
    );
  }

  @GrpcMethod('WalletService', 'GetTransactions')
  async getTransactions(data: {
    customerId: string;
    page?: number;
    limit?: number;
    type?: string;
  }) {
    return this.walletService.getTransactions(
      data.customerId,
      data.page || 1,
      data.limit || 10,
      data.type,
    );
  }

  @GrpcMethod('WalletService', 'CreditBalance')
  async creditBalance(data: {
    customerId: string;
    amount: number;
    paymentMethod: string;
    reference?: string;
    description?: string;
  }) {
    return this.walletService.addFunds(
      data.customerId,
      data.amount,
      data.paymentMethod,
      data.reference,
      data.description,
    );
  }

  @GrpcMethod('WalletService', 'GetWalletBalance')
  async getWalletBalance(data: { customerId: string }) {
    return this.walletService.getWalletBalance(data.customerId);
  }

  @GrpcMethod('WalletService', 'GetWalletSummary')
  async getWalletSummary(data: { customerId: string }) {
    return this.walletService.getWalletSummary(data.customerId);
  }

  @GrpcMethod('WalletService', 'DeleteCustomer')
  async deleteCustomer(data: { customerId: string }) {
    return this.walletService.deleteCustomer(data.customerId);
  }
}

import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, Transport } from '@nestjs/microservices';
import type { ClientGrpc } from '@nestjs/microservices';
import { join } from 'path';
import { Observable } from 'rxjs';

// gRPC interfaces
export interface CreateWalletRequest {
  userId: string;
  customerName: string;
  customerEmail: string;
}

export interface CreateWalletResponse {
  success: boolean;
  walletId: string;
  message: string;
}

export interface GetWalletRequest {
  userId: string;
}

export interface GetWalletResponse {
  success: boolean;
  walletId: string;
  balance: number;
  userId: string;
  customerName: string;
  message: string;
}

export interface DeductBalanceRequest {
  userId: string;
  amount: number;
  description: string;
}

export interface DeductBalanceResponse {
  success: boolean;
  newBalance: number;
  message: string;
}

export interface DeleteWalletRequest {
  userId: string;
}

export interface DeleteWalletResponse {
  success: boolean;
  message: string;
  balance: number;
  canDelete: boolean;
}

export interface GetTransactionsRequest {
  userId: string;
  page: number;
  limit: number;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: string;
  description: string;
  timestamp: string;
}

export interface GetTransactionsResponse {
  success: boolean;
  transactions: Transaction[];
  total: number;
  page: number;
  limit: number;
  message: string;
}

export interface GetChargingSessionsRequest {
  userId: string;
  page: number;
  limit: number;
}

export interface ChargingSession {
  id: string;
  userId: string;
  bikeId: string;
  amount: number;
  startTime: string;
  endTime: string;
  status: string;
}

export interface GetChargingSessionsResponse {
  success: boolean;
  sessions: ChargingSession[];
  total: number;
  page: number;
  limit: number;
  message: string;
}

interface WalletService {
  createWallet(data: CreateWalletRequest): Observable<CreateWalletResponse>;
  getWallet(data: GetWalletRequest): Observable<GetWalletResponse>;
  deductBalance(data: DeductBalanceRequest): Observable<DeductBalanceResponse>;
  deleteWallet(data: DeleteWalletRequest): Observable<DeleteWalletResponse>;
  getTransactions(data: GetTransactionsRequest): Observable<GetTransactionsResponse>;
  getChargingSessions(data: GetChargingSessionsRequest): Observable<GetChargingSessionsResponse>;
}

@Injectable()
export class WalletGrpcService implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'wallet',
      protoPath: join(__dirname, '../../proto/wallet.proto'),
      url: process.env.WALLET_GRPC_URL || 'localhost:5000',
    },
  })
  private client: ClientGrpc;

  private walletService: WalletService;

  onModuleInit() {
    this.walletService = this.client.getService<WalletService>('WalletService');
  }

  createWallet(data: CreateWalletRequest): Observable<CreateWalletResponse> {
    return this.walletService.createWallet(data);
  }

  getWallet(data: GetWalletRequest): Observable<GetWalletResponse> {
    return this.walletService.getWallet(data);
  }

  deductBalance(data: DeductBalanceRequest): Observable<DeductBalanceResponse> {
    return this.walletService.deductBalance(data);
  }

  deleteWallet(data: DeleteWalletRequest): Observable<DeleteWalletResponse> {
    return this.walletService.deleteWallet(data);
  }

  getTransactions(data: GetTransactionsRequest): Observable<GetTransactionsResponse> {
    return this.walletService.getTransactions(data);
  }

  getChargingSessions(data: GetChargingSessionsRequest): Observable<GetChargingSessionsResponse> {
    return this.walletService.getChargingSessions(data);
  }
}

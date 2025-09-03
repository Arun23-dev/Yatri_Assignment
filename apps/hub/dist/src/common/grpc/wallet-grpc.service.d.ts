import { OnModuleInit } from '@nestjs/common';
import { Observable } from 'rxjs';
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
export declare class WalletGrpcService implements OnModuleInit {
    private client;
    private walletService;
    onModuleInit(): void;
    createWallet(data: CreateWalletRequest): Observable<CreateWalletResponse>;
    getWallet(data: GetWalletRequest): Observable<GetWalletResponse>;
    deductBalance(data: DeductBalanceRequest): Observable<DeductBalanceResponse>;
    deleteWallet(data: DeleteWalletRequest): Observable<DeleteWalletResponse>;
    getTransactions(data: GetTransactionsRequest): Observable<GetTransactionsResponse>;
    getChargingSessions(data: GetChargingSessionsRequest): Observable<GetChargingSessionsResponse>;
}

import { OnModuleInit } from '@nestjs/common';
export declare class WalletGrpcService implements OnModuleInit {
    private client;
    private walletService;
    onModuleInit(): void;
    createWallet(userId: string, customerName: string, customerEmail: string, initialBalance?: number): Promise<{
        success: boolean;
        walletId: string;
        balance: number;
        message: string;
    }>;
}

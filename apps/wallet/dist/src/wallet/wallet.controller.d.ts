import { WalletService } from './wallet.service';
export declare class WalletController {
    private readonly walletService;
    constructor(walletService: WalletService);
    createWallet(data: {
        userId: string;
        customerName: string;
        customerEmail: string;
    }): Promise<{
        success: boolean;
        walletId: string;
        message: string;
    }>;
    getWallet(data: {
        userId: string;
    }): Promise<{
        success: boolean;
        walletId: string;
        balance: number;
        userId: string;
        customerName: string;
        message: string;
    }>;
    deductBalance(data: {
        userId: string;
        amount: number;
        description: string;
    }): Promise<{
        success: boolean;
        newBalance: number;
        message: string;
    }>;
    deleteWallet(data: {
        userId: string;
    }): Promise<{
        success: boolean;
        message: string;
        balance: number;
        canDelete: boolean;
    }>;
    getTransactions(data: {
        userId: string;
        page: number;
        limit: number;
    }): Promise<{
        success: boolean;
        transactions: {
            id: string;
            userId: string;
            amount: number;
            type: string;
            description: string;
            timestamp: string;
        }[];
        total: number;
        page: number;
        limit: number;
        message: string;
    }>;
    getChargingSessions(data: {
        userId: string;
        page: number;
        limit: number;
    }): Promise<{
        success: boolean;
        sessions: {
            id: string;
            userId: string;
            bikeId: string;
            amount: number;
            startTime: string;
            endTime: string;
            status: string;
        }[];
        total: number;
        page: number;
        limit: number;
        message: string;
    }>;
}

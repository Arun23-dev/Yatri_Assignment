import { PrismaService } from '../prisma/prisma.service';
export declare class WalletService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createWallet(userId: string, customerName: string, customerEmail: string): Promise<{
        success: boolean;
        walletId: string;
        message: string;
    }>;
    getWallet(userId: string): Promise<{
        success: boolean;
        walletId: string;
        balance: number;
        userId: string;
        customerName: string;
        message: string;
    }>;
    deductBalance(userId: string, amount: number, description: string): Promise<{
        success: boolean;
        newBalance: number;
        message: string;
    }>;
    getTransactions(userId: string, page?: number, limit?: number): Promise<{
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
    getChargingSessions(userId: string, page?: number, limit?: number): Promise<{
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
    deleteWallet(userId: string): Promise<{
        success: boolean;
        message: string;
        balance: number;
        canDelete: boolean;
    }>;
}

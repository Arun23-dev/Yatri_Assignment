import { PrismaService } from '../prisma/prisma.service';
export declare class CustomerService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    addFunds(customerId: string, amount: number, paymentMethod: string, reference?: string, description?: string): Promise<{
        success: boolean;
        newBalance: number;
        transactionId: string;
        message: string;
        paymentMethod?: undefined;
        reference?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        newBalance: number;
        transactionId: string;
        message: string;
        paymentMethod: string;
        reference: string | null;
        error?: undefined;
    } | {
        success: boolean;
        newBalance: number;
        transactionId: string;
        message: string;
        error: any;
        paymentMethod?: undefined;
        reference?: undefined;
    }>;
    getWalletBalance(customerId: string): Promise<{
        success: boolean;
        balance: number;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        balance: number;
        message: string;
        error: any;
    }>;
    getTransactions(customerId: string, page?: number, limit?: number, type?: string): Promise<{
        success: boolean;
        transactions: {
            id: string;
            customerId: string;
            amount: number;
            type: string;
            description: string;
            reference: string;
            chargingSessionId: string;
            timestamp: string;
        }[];
        total: number;
        page: number;
        limit: number;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        transactions: never[];
        total: number;
        page: number;
        limit: number;
        message: string;
        error: any;
    }>;
    getWalletSummary(customerId: string): Promise<{
        success: boolean;
        summary: null;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        summary: {
            walletId: string;
            customerId: string;
            balance: number;
            totalTransactions: number;
            totalCredits: number;
            totalDebits: number;
            lastTransactionDate: string;
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        summary: null;
        message: string;
        error: any;
    }>;
    getWallet(customerId: string): Promise<{
        success: boolean;
        walletId: string;
        balance: number;
        customerId: string;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        walletId: string;
        balance: number;
        customerId: string;
        message: string;
        error: any;
    }>;
    createWallet(customerId: string, initialBalance?: number): Promise<{
        success: boolean;
        walletId: string;
        message: string;
        balance?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        walletId: string;
        balance: number;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        walletId: string;
        message: string;
        error: any;
        balance?: undefined;
    }>;
    deductBalance(customerId: string, amount: number, chargingSessionId: string, description?: string): Promise<{
        success: boolean;
        newBalance: number;
        transactionId: string;
        message: string;
        requiredAmount?: undefined;
        currentBalance?: undefined;
        chargingSessionId?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        newBalance: number;
        transactionId: string;
        message: string;
        requiredAmount: number;
        currentBalance: number;
        chargingSessionId?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        newBalance: number;
        transactionId: string;
        message: string;
        chargingSessionId: string;
        requiredAmount?: undefined;
        currentBalance?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        newBalance: number;
        transactionId: string;
        message: string;
        error: any;
        requiredAmount?: undefined;
        currentBalance?: undefined;
        chargingSessionId?: undefined;
    }>;
}

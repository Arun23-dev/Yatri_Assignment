import { CustomerService } from './customer.service';
import { AddFundsDto, AddFundsAuthenticatedDto, GetTransactionsQueryDto } from './dto/customer.dto';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    private static mockDataFile;
    private static mockBalances;
    private static mockTransactions;
    private loadMockData;
    private saveMockData;
    addFundsWithCookie(req: any, data: AddFundsAuthenticatedDto): Promise<{
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
    } | {
        success: boolean;
        message: string;
        error: string;
        statusCode: number;
    }>;
    test(req: any): Promise<{
        success: boolean;
        message: string;
        userId: any;
        user: any;
    }>;
    addFundsTest(data: AddFundsDto): Promise<{
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
    addFundsSimple(data: any): Promise<{
        success: boolean;
        newBalance: any;
        transactionId: string;
        message: string;
        paymentMethod: any;
        reference: any;
        customerId: any;
        mock: boolean;
        previousBalance: number;
        amountAdded: any;
        transaction: {
            id: string;
            customerId: any;
            amount: any;
            type: string;
            description: any;
            reference: any;
            timestamp: string;
            paymentMethod: any;
        };
    }>;
    spendFundsSimple(data: any): Promise<{
        success: boolean;
        message: string;
        currentBalance: number;
        requiredAmount: any;
        mock: boolean;
        newBalance?: undefined;
        transactionId?: undefined;
        reference?: undefined;
        customerId?: undefined;
        previousBalance?: undefined;
        amountSpent?: undefined;
        transaction?: undefined;
    } | {
        success: boolean;
        newBalance: number;
        transactionId: string;
        message: string;
        reference: any;
        customerId: any;
        mock: boolean;
        previousBalance: number;
        amountSpent: any;
        transaction: {
            id: string;
            customerId: any;
            amount: any;
            type: string;
            description: any;
            reference: any;
            timestamp: string;
            service: any;
        };
        currentBalance?: undefined;
        requiredAmount?: undefined;
    }>;
    addFunds(req: any, data: AddFundsAuthenticatedDto): Promise<{
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
    getWalletBalance(req: any): Promise<{
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
    getTransactions(req: any, query: GetTransactionsQueryDto): Promise<{
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
    getWalletSummary(req: any): Promise<{
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
    getWallet(req: any): Promise<{
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
    getBalanceSimple(): Promise<{
        success: boolean;
        balance: number;
        currency: string;
        userId: string;
        message: string;
        mock: boolean;
        lastUpdated: string;
    }>;
    getTransactionsSimple(page: string | undefined, limit: string | undefined, type: string): Promise<{
        success: boolean;
        transactions: any[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
        userId: string;
        message: string;
        mock: boolean;
    }>;
    getWalletSummarySimple(): Promise<{
        success: boolean;
        summary: {
            walletId: string;
            userId: string;
            customerName: string;
            customerEmail: string;
            balance: number;
            currency: string;
            totalTransactions: number;
            totalCredits: any;
            totalDebits: any;
            lastTransactionDate: any;
            walletCreatedDate: string;
            status: string;
        };
        message: string;
        mock: boolean;
    }>;
    getRecentActivitySimple(): Promise<{
        success: boolean;
        recentActivity: {
            id: any;
            type: any;
            amount: any;
            description: any;
            timestamp: any;
            icon: string;
        }[];
        userId: string;
        message: string;
        mock: boolean;
    }>;
    addFundsGrpc(data: {
        customerId: string;
        amount: number;
        paymentMethod: string;
        reference?: string;
        description?: string;
    }): Promise<{
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
    getWalletBalanceGrpc(data: {
        customerId: string;
    }): Promise<{
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
    getTransactionsGrpc(data: {
        customerId: string;
        page?: number;
        limit?: number;
        type?: string;
    }): Promise<{
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
    getWalletSummaryGrpc(data: {
        customerId: string;
    }): Promise<{
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
    getWalletGrpc(data: {
        customerId: string;
    }): Promise<{
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
    createWalletGrpc(data: {
        customerId: string;
        initialBalance?: number;
    }): Promise<{
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
    deductBalanceGrpc(data: {
        customerId: string;
        amount: number;
        chargingSessionId: string;
        description?: string;
    }): Promise<{
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

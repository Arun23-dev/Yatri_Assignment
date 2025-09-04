export declare class AddFundsDto {
    userId: string;
    amount: number;
    paymentMethod: string;
    reference?: string;
    description?: string;
}
export declare class AddFundsAuthenticatedDto {
    amount: number;
    paymentMethod: string;
    reference?: string;
    description?: string;
}
export declare class GetTransactionsQueryDto {
    page?: string;
    limit?: string;
    type?: string;
}

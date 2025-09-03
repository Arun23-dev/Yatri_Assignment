export declare class AdminResponseDto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class CustomerResponseDto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    address: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare class AdminAuthResponseDto {
    token: string;
    admin: AdminResponseDto;
}
export declare class CustomerAuthResponseDto {
    token: string;
    customer: CustomerResponseDto;
}
export declare class BikeResponseDto {
    id: string;
    serialNumber: string;
    model: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class BikeAssignmentResponseDto {
    id: string;
    bike: BikeResponseDto;
    customer: CustomerResponseDto;
    admin: AdminResponseDto;
    assignedAt: Date;
    returnedAt: Date | null;
}
export declare class WalletResponseDto {
    walletId: string;
    customerId: string;
    customerName: string;
    customerEmail: string;
    balance: number;
}
export declare class TransactionResponseDto {
    id: string;
    customerId: string;
    amount: number;
    type: string;
    description: string;
    timestamp: Date;
}
export declare class ChargingSessionResponseDto {
    id: string;
    customerId: string;
    bikeId: string;
    amount: number;
    startTime: Date;
    endTime: Date | null;
    status: string;
}
export declare class PaginatedResponseDto<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}
export declare class ApiResponseDto<T> {
    message: string;
    data?: T;
    statusCode: number;
    timestamp: Date;
}
export declare class DeleteCustomerResponseDto {
    message: string;
    customerId: string;
    customerEmail: string;
    customerName: string;
    walletDeleted: boolean;
    walletBalance: number;
    walletMessage?: string;
}

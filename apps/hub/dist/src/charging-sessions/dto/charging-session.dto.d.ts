export declare enum ChargingSessionStatus {
    ACTIVE = "ACTIVE",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}
export declare class CreateChargingSessionDto {
    bikeId: string;
    amount: number;
    startTime: string;
    endTime?: string;
    status?: ChargingSessionStatus;
}
export declare class UpdateChargingSessionDto {
    status: ChargingSessionStatus;
    endTime?: string;
}
export declare class SearchChargingSessionsDto {
    q?: string;
    status?: ChargingSessionStatus;
    customerId?: string;
    bikeId?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
}
export declare class StartChargingSessionDto {
    bikeId: string;
    amount: number;
}
export declare class EndChargingSessionDto {
    endTime?: string;
}
export declare class ChargingSessionResponseDto {
    id: string;
    customerId: string;
    bikeId: string;
    amount: number;
    startTime: Date;
    endTime?: Date | null;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    customer?: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
    };
    bike?: {
        id: string;
        serialNumber: string;
        brand: string;
        model: string;
    };
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

export declare enum BikeStatus {
    AVAILABLE = "AVAILABLE",
    ASSIGNED = "ASSIGNED",
    MAINTENANCE = "MAINTENANCE",
    RETIRED = "RETIRED"
}
export declare class CreateBikeDto {
    serialNumber: string;
    brand: string;
    model: string;
    status?: BikeStatus;
}
export declare class UpdateBikeStatusDto {
    status: BikeStatus;
}
export declare class AssignBikeDto {
    bikeId: string;
    customerId: string;
}
export declare class ReturnBikeDto {
    bikeId: string;
    customerId: string;
}
export declare class SearchBikesDto {
    q?: string;
    status?: BikeStatus;
    page?: number;
    limit?: number;
}

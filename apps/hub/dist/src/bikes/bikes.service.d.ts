import { PrismaService } from '../prisma/prisma.service';
import { CreateBikeDto, UpdateBikeStatusDto, AssignBikeDto, ReturnBikeDto } from './dto/bike.dto';
import { BikeResponseDto, BikeAssignmentResponseDto } from '../common/dto/response.dto';
export declare class BikesService {
    private prisma;
    constructor(prisma: PrismaService);
    createBike(data: CreateBikeDto): Promise<BikeResponseDto>;
    getAllBikes(page?: number, limit?: number): Promise<{
        items: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            serialNumber: string;
            brand: string;
            model: string;
            status: string;
        }[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }>;
    searchBikes(query: string, status?: string, page?: number, limit?: number): Promise<{
        items: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            serialNumber: string;
            brand: string;
            model: string;
            status: string;
        }[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }>;
    getAvailableBikes(page?: number, limit?: number): Promise<{
        items: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            serialNumber: string;
            brand: string;
            model: string;
            status: string;
        }[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }>;
    getBikeById(id: string): Promise<BikeResponseDto>;
    updateBikeStatus(id: string, data: UpdateBikeStatusDto): Promise<BikeResponseDto>;
    assignBike(data: AssignBikeDto, adminId: string): Promise<BikeAssignmentResponseDto>;
    returnBike(data: ReturnBikeDto): Promise<BikeAssignmentResponseDto>;
    getBikeAssignments(page?: number, limit?: number): Promise<{
        items: ({
            admin: {
                id: string;
                firstName: string;
                lastName: string;
                email: string;
                createdAt: Date;
                updatedAt: Date;
            };
            customer: {
                id: string;
                firstName: string;
                lastName: string;
                email: string;
                createdAt: Date;
                updatedAt: Date;
                phone: string | null;
                address: string | null;
            };
            bike: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                serialNumber: string;
                brand: string;
                model: string;
                status: string;
            };
        } & {
            id: string;
            assignedAt: Date;
            returnedAt: Date | null;
            assignedBy: string;
            bikeId: string;
            customerId: string;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }>;
    getActiveAssignments(page?: number, limit?: number): Promise<{
        items: ({
            admin: {
                id: string;
                firstName: string;
                lastName: string;
                email: string;
                createdAt: Date;
                updatedAt: Date;
            };
            customer: {
                id: string;
                firstName: string;
                lastName: string;
                email: string;
                createdAt: Date;
                updatedAt: Date;
                phone: string | null;
                address: string | null;
            };
            bike: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                serialNumber: string;
                brand: string;
                model: string;
                status: string;
            };
        } & {
            id: string;
            assignedAt: Date;
            returnedAt: Date | null;
            assignedBy: string;
            bikeId: string;
            customerId: string;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }>;
}

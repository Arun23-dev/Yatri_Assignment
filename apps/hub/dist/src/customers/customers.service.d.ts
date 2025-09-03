import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
import { CustomerResponseDto, DeleteCustomerResponseDto } from '../common/dto/response.dto';
import { WalletGrpcService } from '../common/grpc/wallet-grpc.service';
export declare class CustomersService {
    private prisma;
    private walletGrpcService;
    private readonly logger;
    constructor(prisma: PrismaService, walletGrpcService: WalletGrpcService);
    createCustomer(data: CreateCustomerDto): Promise<CustomerResponseDto>;
    getAllCustomers(page?: number, limit?: number): Promise<{
        items: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            createdAt: Date;
            updatedAt: Date;
            phone: string | null;
            address: string | null;
        }[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }>;
    getCustomerById(id: string): Promise<CustomerResponseDto>;
    updateCustomer(id: string, data: UpdateCustomerDto): Promise<CustomerResponseDto>;
    deleteCustomer(id: string): Promise<DeleteCustomerResponseDto>;
    searchCustomers(query: string, page?: number, limit?: number): Promise<{
        items: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            createdAt: Date;
            updatedAt: Date;
            phone: string | null;
            address: string | null;
        }[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }>;
    getCustomerWallet(customerId: string): Promise<import("../common/grpc/wallet-grpc.service").GetWalletResponse>;
}

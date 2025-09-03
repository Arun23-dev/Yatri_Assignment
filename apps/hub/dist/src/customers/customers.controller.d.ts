import { HttpStatus } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
import { CustomerResponseDto, ApiResponseDto, DeleteCustomerResponseDto } from '../common/dto/response.dto';
export declare class CustomersController {
    private customersService;
    constructor(customersService: CustomersService);
    createCustomer(body: CreateCustomerDto): Promise<ApiResponseDto<CustomerResponseDto>>;
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
    getCustomerById(id: string): Promise<CustomerResponseDto>;
    updateCustomer(id: string, body: UpdateCustomerDto): Promise<CustomerResponseDto>;
    deleteCustomer(id: string): Promise<DeleteCustomerResponseDto>;
    getCustomerWallet(id: string): Promise<{
        message: string;
        data: {
            customer: CustomerResponseDto;
            wallet: import("../common/grpc/wallet-grpc.service").GetWalletResponse;
        };
        statusCode: HttpStatus;
        timestamp: Date;
    }>;
}

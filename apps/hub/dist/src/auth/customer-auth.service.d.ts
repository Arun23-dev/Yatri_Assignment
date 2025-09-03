import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from '../customers/dto/customer.dto';
export declare class CustomerAuthService {
    private prisma;
    private jwtService;
    private blockedTokens;
    constructor(prisma: PrismaService, jwtService: JwtService);
    registerCustomer(data: CreateCustomerDto): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        address: string | null;
    }>;
    loginCustomer(email: string, password: string): Promise<{
        token: string;
        customer: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            password: string;
            createdAt: Date;
            updatedAt: Date;
            phone: string | null;
            address: string | null;
        };
    }>;
    logoutWithCredentials(email: string, password: string): Promise<{
        message: string;
    }>;
    logout(token: string): Promise<void>;
    validateToken(token: string): Promise<{
        sub: string;
        type: string;
        email: string;
    }>;
    getCustomerById(id: string): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        address: string | null;
    }>;
    updateCustomer(customerId: string, data: any): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        address: string | null;
    }>;
    changePassword(customerId: string, currentPassword: string, newPassword: string): Promise<{
        message: string;
    }>;
}

import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdminDto } from '../customers/dto/customer.dto';
export declare class AdminAuthService {
    private prisma;
    private jwtService;
    private blockedTokens;
    constructor(prisma: PrismaService, jwtService: JwtService);
    registerAdmin(data: CreateAdminDto): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    registerFirstAdmin(data: CreateAdminDto): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    loginAdmin(email: string, password: string): Promise<{
        token: string;
        admin: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            password: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    logoutWithCredentials(email: string, password: string): Promise<{
        message: string;
    }>;
    logout(token: string): Promise<void>;
    validateToken(token: string): {
        sub: string;
        type: string;
        email: string;
    };
    getAdminById(id: string): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
}

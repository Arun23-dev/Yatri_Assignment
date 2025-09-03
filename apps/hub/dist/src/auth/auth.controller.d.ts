import type { Response } from 'express';
import { AdminAuthService } from './admin-auth.service';
import { CustomerAuthService } from './customer-auth.service';
import { CreateAdminDto, CreateCustomerDto } from '../customers/dto/customer.dto';
import { LoginAdminDto, LoginCustomerDto, LogoutDto } from './dto/auth.dto';
import { AdminResponseDto, CustomerResponseDto, AdminAuthResponseDto, CustomerAuthResponseDto, ApiResponseDto } from '../common/dto/response.dto';
export declare class AuthController {
    private adminAuthService;
    private customerAuthService;
    constructor(adminAuthService: AdminAuthService, customerAuthService: CustomerAuthService);
    registerAdmin(body: CreateAdminDto): Promise<ApiResponseDto<AdminResponseDto>>;
    registerFirstAdmin(body: CreateAdminDto): Promise<ApiResponseDto<AdminResponseDto>>;
    loginAdmin(body: LoginAdminDto, res: Response): Promise<AdminAuthResponseDto>;
    registerCustomer(body: CreateCustomerDto): Promise<ApiResponseDto<CustomerResponseDto>>;
    loginCustomer(body: LoginCustomerDto, res: Response): Promise<CustomerAuthResponseDto>;
    logoutCustomer(body: LogoutDto, res: Response): Promise<ApiResponseDto<void>>;
    logout(body: LogoutDto, res: Response): Promise<ApiResponseDto<void>>;
}

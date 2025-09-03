"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_auth_service_1 = require("./admin-auth.service");
const customer_auth_service_1 = require("./customer-auth.service");
const customer_dto_1 = require("../customers/dto/customer.dto");
const auth_dto_1 = require("./dto/auth.dto");
const response_dto_1 = require("../common/dto/response.dto");
let AuthController = class AuthController {
    adminAuthService;
    customerAuthService;
    constructor(adminAuthService, customerAuthService) {
        this.adminAuthService = adminAuthService;
        this.customerAuthService = customerAuthService;
    }
    async registerAdmin(body) {
        const admin = await this.adminAuthService.registerAdmin(body);
        return {
            message: 'Admin registered successfully',
            data: admin,
            statusCode: common_1.HttpStatus.CREATED,
            timestamp: new Date()
        };
    }
    async registerFirstAdmin(body) {
        const admin = await this.adminAuthService.registerFirstAdmin(body);
        return {
            message: 'First admin registered successfully',
            data: admin,
            statusCode: common_1.HttpStatus.CREATED,
            timestamp: new Date()
        };
    }
    async loginAdmin(body, res) {
        const result = await this.adminAuthService.loginAdmin(body.email, body.password);
        res.cookie('admin_token', result.token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
            path: '/'
        });
        return result;
    }
    async registerCustomer(body) {
        const customer = await this.customerAuthService.registerCustomer(body);
        return {
            message: 'Customer registered successfully',
            data: customer,
            statusCode: common_1.HttpStatus.CREATED,
            timestamp: new Date()
        };
    }
    async loginCustomer(body, res) {
        const result = await this.customerAuthService.loginCustomer(body.email, body.password);
        res.cookie('customer_token', result.token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
            path: '/'
        });
        return result;
    }
    async logoutCustomer(body, res) {
        await this.customerAuthService.logoutWithCredentials(body.email, body.password);
        res.clearCookie('customer_token', { path: '/' });
        return {
            message: 'Customer logged out successfully',
            statusCode: common_1.HttpStatus.OK,
            timestamp: new Date()
        };
    }
    async logout(body, res) {
        try {
            await this.adminAuthService.logoutWithCredentials(body.email, body.password);
        }
        catch (error) {
            await this.customerAuthService.logoutWithCredentials(body.email, body.password);
        }
        res.clearCookie('admin_token', { path: '/' });
        res.clearCookie('customer_token', { path: '/' });
        return {
            message: 'Logged out successfully',
            statusCode: common_1.HttpStatus.OK,
            timestamp: new Date()
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('admin/register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Register a new admin',
        description: 'Creates a new admin account. Only existing admins should be able to create new admins.'
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Admin registered successfully',
        type: (response_dto_1.ApiResponseDto),
        schema: {
            example: {
                message: 'Admin registered successfully',
                data: {
                    id: '507f1f77bcf86cd799439011',
                    firstName: 'John',
                    lastName: 'Admin',
                    email: 'admin@yatritask.com',
                    createdAt: '2024-01-09T16:30:00.000Z',
                    updatedAt: '2024-01-09T16:30:00.000Z'
                },
                statusCode: 201,
                timestamp: '2024-01-09T16:30:00.000Z'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid input data'
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Conflict - Admin with this email already exists'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customer_dto_1.CreateAdminDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerAdmin", null);
__decorate([
    (0, common_1.Post)('admin/register/first'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Register the first admin (Public)',
        description: 'Creates the first admin account. This endpoint is only available when no admins exist in the system.'
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'First admin registered successfully',
        type: (response_dto_1.ApiResponseDto)
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid input data'
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Conflict - Admin already exists in the system'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customer_dto_1.CreateAdminDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerFirstAdmin", null);
__decorate([
    (0, common_1.Post)('admin/login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Login as an admin',
        description: 'Authenticates an admin with email and password, sets authentication cookie and returns JWT token.'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Admin login successful',
        type: response_dto_1.AdminAuthResponseDto,
        schema: {
            example: {
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                admin: {
                    id: '507f1f77bcf86cd799439011',
                    firstName: 'John',
                    lastName: 'Admin',
                    email: 'admin@yatritask.com',
                    createdAt: '2024-01-09T16:30:00.000Z',
                    updatedAt: '2024-01-09T16:30:00.000Z'
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Invalid admin credentials'
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LoginAdminDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginAdmin", null);
__decorate([
    (0, common_1.Post)('customer/register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Register a new customer',
        description: 'Creates a new customer account. This endpoint is public and allows anyone to register as a customer.'
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Customer registered successfully',
        type: (response_dto_1.ApiResponseDto),
        schema: {
            example: {
                message: 'Customer registered successfully',
                data: {
                    id: '507f1f77bcf86cd799439011',
                    firstName: 'Jane',
                    lastName: 'Doe',
                    email: 'jane.doe@example.com',
                    phone: '+1234567890',
                    address: '123 Main St, City, State 12345',
                    createdAt: '2024-01-09T16:30:00.000Z',
                    updatedAt: '2024-01-09T16:30:00.000Z'
                },
                statusCode: 201,
                timestamp: '2024-01-09T16:30:00.000Z'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid input data'
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Conflict - Customer with this email already exists'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customer_dto_1.CreateCustomerDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerCustomer", null);
__decorate([
    (0, common_1.Post)('customer/login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Login as a customer',
        description: 'Authenticates a customer with email and password, returns JWT token for subsequent API calls.'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Customer login successful',
        type: response_dto_1.CustomerAuthResponseDto,
        schema: {
            example: {
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                customer: {
                    id: '507f1f77bcf86cd799439011',
                    firstName: 'Jane',
                    lastName: 'Doe',
                    email: 'jane.doe@example.com',
                    phone: '+1234567890',
                    address: '123 Main St, City, State 12345',
                    createdAt: '2024-01-09T16:30:00.000Z',
                    updatedAt: '2024-01-09T16:30:00.000Z'
                }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Invalid customer credentials'
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LoginCustomerDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginCustomer", null);
__decorate([
    (0, common_1.Post)('customer/logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Logout as a customer',
        description: 'Logs out a customer by validating their credentials and invalidating any active sessions.'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Customer logged out successfully',
        type: (response_dto_1.ApiResponseDto)
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid credentials'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Invalid email or password'
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LogoutDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logoutCustomer", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Logout (both admin and customer)',
        description: 'Logs out the user by validating their credentials and invalidating any active sessions. Works for both admin and customer accounts.'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Logged out successfully',
        type: (response_dto_1.ApiResponseDto)
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid credentials'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Invalid email or password'
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LogoutDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [admin_auth_service_1.AdminAuthService,
        customer_auth_service_1.CustomerAuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map
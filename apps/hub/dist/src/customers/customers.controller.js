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
exports.CustomersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const customers_service_1 = require("./customers.service");
const customer_dto_1 = require("./dto/customer.dto");
const response_dto_1 = require("../common/dto/response.dto");
const admin_auth_guard_1 = require("../auth/guards/admin-auth.guard");
let CustomersController = class CustomersController {
    customersService;
    constructor(customersService) {
        this.customersService = customersService;
    }
    async createCustomer(body) {
        const customer = await this.customersService.createCustomer(body);
        return {
            message: 'Customer created successfully',
            data: customer,
            statusCode: common_1.HttpStatus.CREATED,
            timestamp: new Date()
        };
    }
    async getAllCustomers(page = 1, limit = 5) {
        return this.customersService.getAllCustomers(page, limit);
    }
    async searchCustomers(query, page = 1, limit = 5) {
        return this.customersService.searchCustomers(query, page, limit);
    }
    async getCustomerById(id) {
        return this.customersService.getCustomerById(id);
    }
    async updateCustomer(id, body) {
        return this.customersService.updateCustomer(id, body);
    }
    async deleteCustomer(id) {
        return this.customersService.deleteCustomer(id);
    }
    async getCustomerWallet(id) {
        const customer = await this.customersService.getCustomerById(id);
        const walletInfo = await this.customersService.getCustomerWallet(id);
        return {
            message: 'Customer wallet information retrieved successfully',
            data: {
                customer,
                wallet: walletInfo
            },
            statusCode: common_1.HttpStatus.OK,
            timestamp: new Date()
        };
    }
};
exports.CustomersController = CustomersController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new customer (Admin only)',
        description: 'Creates a new customer account. Only admins can create customers.'
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Customer created successfully',
        type: (response_dto_1.ApiResponseDto),
        schema: {
            example: {
                message: 'Customer created successfully',
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
        status: 401,
        description: 'Unauthorized - Admin token required'
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Conflict - Customer with this email already exists'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customer_dto_1.CreateCustomerDto]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "createCustomer", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all customers (Admin only)',
        description: 'Retrieves a paginated list of all customers. Only admins can access this endpoint.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 5)' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Customers retrieved successfully',
        type: (response_dto_1.PaginatedResponseDto)
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required'
    }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "getAllCustomers", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({
        summary: 'Search customers (Admin only)',
        description: 'Search customers by name or email. Only admins can access this endpoint.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'q', required: true, type: String, description: 'Search query' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 5)' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Search results retrieved successfully',
        type: (response_dto_1.PaginatedResponseDto)
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required'
    }),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "searchCustomers", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get customer by ID (Admin only)',
        description: 'Retrieves a specific customer by their ID. Only admins can access this endpoint.'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Customer retrieved successfully',
        type: response_dto_1.CustomerResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Not found - Customer not found'
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "getCustomerById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update customer (Admin only)',
        description: 'Partially updates a customer\'s information. Only admins can update customers. Only send the fields you want to update.'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Customer updated successfully',
        type: response_dto_1.CustomerResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid input data'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Not found - Customer not found'
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Conflict - Email already exists'
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, customer_dto_1.UpdateCustomerDto]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "updateCustomer", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete customer (Admin only)',
        description: 'Deletes a customer and their associated wallet. Cannot delete customers with active bike assignments.'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Customer and wallet deleted successfully',
        type: response_dto_1.DeleteCustomerResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid customer ID format'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Not found - Customer not found'
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Conflict - Customer has active bike assignments'
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "deleteCustomer", null);
__decorate([
    (0, common_1.Get)(':id/wallet'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get customer wallet information',
        description: 'Retrieves wallet information for a specific customer via gRPC call to Wallet service.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Customer ID', example: '507f1f77bcf86cd799439011' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Customer wallet information retrieved successfully',
        type: response_dto_1.ApiResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Customer not found'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin authentication required'
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "getCustomerWallet", null);
exports.CustomersController = CustomersController = __decorate([
    (0, swagger_1.ApiTags)('customers'),
    (0, common_1.Controller)('customers'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [customers_service_1.CustomersService])
], CustomersController);
//# sourceMappingURL=customers.controller.js.map
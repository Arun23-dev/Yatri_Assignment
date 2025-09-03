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
exports.BikesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const bikes_service_1 = require("./bikes.service");
const bike_dto_1 = require("./dto/bike.dto");
const response_dto_1 = require("../common/dto/response.dto");
const admin_auth_guard_1 = require("../auth/guards/admin-auth.guard");
let BikesController = class BikesController {
    bikesService;
    constructor(bikesService) {
        this.bikesService = bikesService;
    }
    async createBike(body) {
        return this.bikesService.createBike(body);
    }
    async getAllBikes(page = 1, limit = 10) {
        return this.bikesService.getAllBikes(page, limit);
    }
    async searchBikes(query, status, page = 1, limit = 10) {
        return this.bikesService.searchBikes(query || '', status, page, limit);
    }
    async getAvailableBikes(page = 1, limit = 10) {
        return this.bikesService.getAvailableBikes(page, limit);
    }
    async getBikeAssignments(page = 1, limit = 10) {
        return this.bikesService.getBikeAssignments(page, limit);
    }
    async getActiveAssignments(page = 1, limit = 10) {
        return this.bikesService.getActiveAssignments(page, limit);
    }
    async getBikeById(id) {
        return this.bikesService.getBikeById(id);
    }
    async updateBikeStatus(id, body) {
        return this.bikesService.updateBikeStatus(id, body);
    }
    async assignBike(body, req) {
        return this.bikesService.assignBike(body, req.admin.sub);
    }
    async returnBike(body) {
        return this.bikesService.returnBike(body);
    }
};
exports.BikesController = BikesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new bike (Admin only)',
        description: 'Creates a new bike with the specified serial number and model. Only admins can create bikes.',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Bike created successfully',
        type: response_dto_1.BikeResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid input data or serial number already exists',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bike_dto_1.CreateBikeDto]),
    __metadata("design:returntype", Promise)
], BikesController.prototype, "createBike", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all bikes (Admin only)',
        description: 'Retrieves a paginated list of all bikes in the system. Only admins can access this endpoint.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number (default: 1)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Items per page (default: 10)',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Bikes retrieved successfully',
        type: (response_dto_1.PaginatedResponseDto),
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required',
    }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], BikesController.prototype, "getAllBikes", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Search bikes (Admin only)',
        description: 'Search bikes by model, serial number, or status. Only admins can access this endpoint.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'q',
        required: false,
        type: String,
        description: 'Search query (bike model or serial number)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'status',
        required: false,
        enum: ['AVAILABLE', 'ASSIGNED', 'MAINTENANCE', 'RETIRED'],
        description: 'Filter by bike status',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number (default: 1)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Items per page (default: 10)',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Bikes search results',
        type: (response_dto_1.PaginatedResponseDto),
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required',
    }),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], BikesController.prototype, "searchBikes", null);
__decorate([
    (0, common_1.Get)('available'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get available bikes (Admin only)',
        description: 'Retrieves a paginated list of all available bikes. Only admins can access this endpoint.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number (default: 1)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Items per page (default: 10)',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Available bikes retrieved successfully',
        type: (response_dto_1.PaginatedResponseDto),
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required',
    }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], BikesController.prototype, "getAvailableBikes", null);
__decorate([
    (0, common_1.Get)('assignments'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all bike assignments (Admin only)',
        description: 'Retrieves a paginated list of all bike assignments. Only admins can access this endpoint.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number (default: 1)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Items per page (default: 10)',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Bike assignments retrieved successfully',
        type: (response_dto_1.PaginatedResponseDto),
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required',
    }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], BikesController.prototype, "getBikeAssignments", null);
__decorate([
    (0, common_1.Get)('assignments/active'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get active bike assignments (Admin only)',
        description: 'Retrieves a paginated list of all active bike assignments (not returned). Only admins can access this endpoint.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number (default: 1)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Items per page (default: 10)',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Active bike assignments retrieved successfully',
        type: (response_dto_1.PaginatedResponseDto),
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required',
    }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], BikesController.prototype, "getActiveAssignments", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get bike by ID (Admin only)',
        description: 'Retrieves a specific bike by its ID. Only admins can access this endpoint.',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Bike retrieved successfully',
        type: response_dto_1.BikeResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Not found - Bike not found',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BikesController.prototype, "getBikeById", null);
__decorate([
    (0, common_1.Put)(':id/status'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Update bike status (Admin only)',
        description: 'Updates the status of a bike. Only admins can update bike status.',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Bike status updated successfully',
        type: response_dto_1.BikeResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid status',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Not found - Bike not found',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, bike_dto_1.UpdateBikeStatusDto]),
    __metadata("design:returntype", Promise)
], BikesController.prototype, "updateBikeStatus", null);
__decorate([
    (0, common_1.Post)('assign'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Assign bike to customer (Admin only)',
        description: 'Assigns a bike to a customer. Only admins can assign bikes.',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Bike assigned successfully',
        type: response_dto_1.BikeAssignmentResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Bike not available or customer has active assignment',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Not found - Bike or customer not found',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bike_dto_1.AssignBikeDto, Object]),
    __metadata("design:returntype", Promise)
], BikesController.prototype, "assignBike", null);
__decorate([
    (0, common_1.Post)('return'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Return bike from customer (Admin only)',
        description: 'Returns a bike from a customer. Only admins can return bikes.',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Bike returned successfully',
        type: response_dto_1.BikeAssignmentResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid return data',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Not found - Active assignment not found',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bike_dto_1.ReturnBikeDto]),
    __metadata("design:returntype", Promise)
], BikesController.prototype, "returnBike", null);
exports.BikesController = BikesController = __decorate([
    (0, swagger_1.ApiTags)('bikes'),
    (0, common_1.Controller)('bikes'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [bikes_service_1.BikesService])
], BikesController);
//# sourceMappingURL=bikes.controller.js.map
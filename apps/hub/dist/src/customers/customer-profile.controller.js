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
exports.CustomerProfileController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const customer_auth_guard_1 = require("../auth/guards/customer-auth.guard");
const customer_auth_service_1 = require("../auth/customer-auth.service");
const customer_dto_1 = require("./dto/customer.dto");
const auth_dto_1 = require("../auth/dto/auth.dto");
const response_dto_1 = require("../common/dto/response.dto");
let CustomerProfileController = class CustomerProfileController {
    customerAuthService;
    constructor(customerAuthService) {
        this.customerAuthService = customerAuthService;
    }
    async getMyProfile(req) {
        const customer = await this.customerAuthService.getCustomerById(req.customer.sub);
        return {
            message: 'Customer profile retrieved successfully',
            data: customer,
            statusCode: common_1.HttpStatus.OK,
            timestamp: new Date()
        };
    }
    async updateMyProfile(req, body) {
        const customer = await this.customerAuthService.updateCustomer(req.customer.sub, body);
        return {
            message: 'Customer profile updated successfully',
            data: customer,
            statusCode: common_1.HttpStatus.OK,
            timestamp: new Date()
        };
    }
    async changePassword(req, body) {
        await this.customerAuthService.changePassword(req.customer.sub, body.currentPassword, body.newPassword);
        return {
            message: 'Password changed successfully',
            statusCode: common_1.HttpStatus.OK,
            timestamp: new Date()
        };
    }
};
exports.CustomerProfileController = CustomerProfileController;
__decorate([
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get current customer profile',
        description: 'Retrieves the profile information of the authenticated customer.'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Customer profile retrieved successfully',
        type: (response_dto_1.ApiResponseDto)
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Customer token required'
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomerProfileController.prototype, "getMyProfile", null);
__decorate([
    (0, common_1.Put)('me'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Update current customer profile',
        description: 'Updates the profile information of the authenticated customer.'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Customer profile updated successfully',
        type: (response_dto_1.ApiResponseDto)
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid input data'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Customer token required'
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Conflict - Email already exists'
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, customer_dto_1.UpdateCustomerDto]),
    __metadata("design:returntype", Promise)
], CustomerProfileController.prototype, "updateMyProfile", null);
__decorate([
    (0, common_1.Put)('me/change-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Change customer password',
        description: 'Changes the password of the authenticated customer.'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Password changed successfully',
        type: (response_dto_1.ApiResponseDto)
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid current password or new password'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Customer token required'
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, auth_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], CustomerProfileController.prototype, "changePassword", null);
exports.CustomerProfileController = CustomerProfileController = __decorate([
    (0, swagger_1.ApiTags)('customer-profile'),
    (0, common_1.Controller)('customer-profile'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(customer_auth_guard_1.CustomerAuthGuard),
    __metadata("design:paramtypes", [customer_auth_service_1.CustomerAuthService])
], CustomerProfileController);
//# sourceMappingURL=customer-profile.controller.js.map
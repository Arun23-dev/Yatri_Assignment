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
exports.ChargingSessionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const charging_sessions_service_1 = require("./charging-sessions.service");
const admin_auth_guard_1 = require("../auth/guards/admin-auth.guard");
const customer_auth_guard_1 = require("../auth/guards/customer-auth.guard");
const charging_session_dto_1 = require("./dto/charging-session.dto");
let ChargingSessionsController = class ChargingSessionsController {
    chargingSessionsService;
    constructor(chargingSessionsService) {
        this.chargingSessionsService = chargingSessionsService;
    }
    async getAllSessions(page = 1, limit = 10) {
        return this.chargingSessionsService.findAll(page, limit);
    }
    async searchChargingSessions(filters) {
        return this.chargingSessionsService.searchChargingSessions(filters);
    }
    async getChargingSessionStats(period, startDate, endDate) {
        return this.chargingSessionsService.getChargingSessionStats(period, startDate, endDate);
    }
    async getRevenueAnalytics(period = 'month', groupBy = 'day') {
        return this.chargingSessionsService.getRevenueAnalytics(period, groupBy);
    }
    async getChargingSessionsByCustomer(customerId, page = 1, limit = 10) {
        return this.chargingSessionsService.getChargingSessionsByCustomer(customerId, page, limit);
    }
    async getChargingSessionsByBike(bikeId, page = 1, limit = 10) {
        return this.chargingSessionsService.getChargingSessionsByBike(bikeId, page, limit);
    }
    async getChargingSessionReports(filters) {
        return this.chargingSessionsService.getChargingSessionReports(filters);
    }
    async getAllSessionsAdmin(customerId, bikeId, status, dateRangeStart, dateRangeEnd, page = 1, limit = 10) {
        return this.chargingSessionsService.getAllSessions({
            customerId,
            bikeId,
            status,
            dateRangeStart,
            dateRangeEnd,
            page,
            limit,
        });
    }
    async adminEndSession(id, body) {
        return this.chargingSessionsService.adminEndSession(id, body.endTime ? new Date(body.endTime) : undefined);
    }
    async adminGetSessionDetails(id) {
        return this.chargingSessionsService.adminGetSessionDetails(id);
    }
    async getAdminAnalyticsSummary(dateRangeStart, dateRangeEnd) {
        return this.chargingSessionsService.getAdminAnalyticsSummary(dateRangeStart, dateRangeEnd);
    }
    async startChargingSession(req, body) {
        return this.chargingSessionsService.startChargingSession(req.customer.sub, body);
    }
    async endChargingSession(id, req, body) {
        return this.chargingSessionsService.endChargingSession(req.customer.sub, id, body.endTime ? new Date(body.endTime) : undefined);
    }
    async cancelChargingSession(id, req) {
        return this.chargingSessionsService.cancelChargingSession(req.customer.sub, id);
    }
    async getActiveSessions(req) {
        return this.chargingSessionsService.getActiveSessionsByCustomer(req.customer.sub);
    }
    async getMySessions(req, bikeId, page = 1, limit = 10, dateRangeStart, dateRangeEnd) {
        return this.chargingSessionsService.getMySessions(req.customer.sub, { bikeId, page, limit, dateRangeStart, dateRangeEnd });
    }
    async getSessionDetails(id, req) {
        return this.chargingSessionsService.getSessionDetails(req.customer.sub, id);
    }
    async getCustomerAnalytics(req, dateRangeStart, dateRangeEnd) {
        return this.chargingSessionsService.getCustomerAnalytics(req.customer.sub, dateRangeStart, dateRangeEnd);
    }
};
exports.ChargingSessionsController = ChargingSessionsController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all charging sessions (Admin)',
        description: 'Get all charging sessions with pagination. Only admins can access this endpoint.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'All charging sessions retrieved successfully',
        type: (charging_session_dto_1.PaginatedResponseDto)
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
], ChargingSessionsController.prototype, "getAllSessions", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Search charging sessions (Admin)',
        description: 'Search charging sessions with advanced filters. Only admins can access this endpoint.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'q', required: false, type: String, description: 'Search query' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, type: String, description: 'Filter by status' }),
    (0, swagger_1.ApiQuery)({ name: 'customerId', required: false, type: String, description: 'Filter by customer ID' }),
    (0, swagger_1.ApiQuery)({ name: 'bikeId', required: false, type: String, description: 'Filter by bike ID' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, type: String, description: 'Start date filter' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, type: String, description: 'End date filter' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Page number' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Items per page' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Charging sessions search results',
        type: (charging_session_dto_1.PaginatedResponseDto)
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required'
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [charging_session_dto_1.SearchChargingSessionsDto]),
    __metadata("design:returntype", Promise)
], ChargingSessionsController.prototype, "searchChargingSessions", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get charging session statistics (Admin)',
        description: 'Get charging session statistics and analytics. Only admins can access this endpoint.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'period', required: false, type: String, description: 'Time period (today, week, month, year)' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, type: String, description: 'Start date for custom period' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, type: String, description: 'End date for custom period' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Charging session statistics retrieved successfully'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required'
    }),
    __param(0, (0, common_1.Query)('period')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ChargingSessionsController.prototype, "getChargingSessionStats", null);
__decorate([
    (0, common_1.Get)('revenue'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get revenue analytics (Admin)',
        description: 'Get revenue analytics with time-based grouping. Only admins can access this endpoint.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'period', required: false, type: String, description: 'Time period (week, month, year)' }),
    (0, swagger_1.ApiQuery)({ name: 'groupBy', required: false, type: String, description: 'Group by (day, week, month)' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Revenue analytics retrieved successfully'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required'
    }),
    __param(0, (0, common_1.Query)('period')),
    __param(1, (0, common_1.Query)('groupBy')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ChargingSessionsController.prototype, "getRevenueAnalytics", null);
__decorate([
    (0, common_1.Get)('customer/:customerId'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get charging sessions by customer (Admin)',
        description: 'Get all charging sessions for a specific customer. Only admins can access this endpoint.'
    }),
    (0, swagger_1.ApiParam)({ name: 'customerId', description: 'Customer ID' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Page number' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Items per page' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Customer charging sessions retrieved successfully',
        type: (charging_session_dto_1.PaginatedResponseDto)
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required'
    }),
    __param(0, (0, common_1.Param)('customerId')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], ChargingSessionsController.prototype, "getChargingSessionsByCustomer", null);
__decorate([
    (0, common_1.Get)('bike/:bikeId'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get charging sessions by bike (Admin)',
        description: 'Get all charging sessions for a specific bike. Only admins can access this endpoint.'
    }),
    (0, swagger_1.ApiParam)({ name: 'bikeId', description: 'Bike ID' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Page number' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Items per page' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Bike charging sessions retrieved successfully',
        type: (charging_session_dto_1.PaginatedResponseDto)
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required'
    }),
    __param(0, (0, common_1.Param)('bikeId')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], ChargingSessionsController.prototype, "getChargingSessionsByBike", null);
__decorate([
    (0, common_1.Get)('reports'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get charging session reports (Admin)',
        description: 'Generate charging session reports with filters. Only admins can access this endpoint.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, type: String, description: 'Start date filter' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, type: String, description: 'End date filter' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, type: String, description: 'Filter by status' }),
    (0, swagger_1.ApiQuery)({ name: 'customerId', required: false, type: String, description: 'Filter by customer ID' }),
    (0, swagger_1.ApiQuery)({ name: 'bikeId', required: false, type: String, description: 'Filter by bike ID' }),
    (0, swagger_1.ApiQuery)({ name: 'format', required: false, type: String, description: 'Report format' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Charging session report generated successfully'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required'
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChargingSessionsController.prototype, "getChargingSessionReports", null);
__decorate([
    (0, common_1.Get)('admin/all'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'View all charging sessions (Admin)',
        description: 'Get all charging sessions with advanced filtering options. Only admins can access this endpoint.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'customerId', required: false, type: String, description: 'Filter by customer ID' }),
    (0, swagger_1.ApiQuery)({ name: 'bikeId', required: false, type: String, description: 'Filter by bike ID' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, type: String, description: 'Filter by session status' }),
    (0, swagger_1.ApiQuery)({ name: 'dateRangeStart', required: false, type: String, description: 'Start date filter (ISO string)' }),
    (0, swagger_1.ApiQuery)({ name: 'dateRangeEnd', required: false, type: String, description: 'End date filter (ISO string)' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'All charging sessions retrieved successfully',
        type: (charging_session_dto_1.PaginatedResponseDto)
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required'
    }),
    __param(0, (0, common_1.Query)('customerId')),
    __param(1, (0, common_1.Query)('bikeId')),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, common_1.Query)('dateRangeStart')),
    __param(4, (0, common_1.Query)('dateRangeEnd')),
    __param(5, (0, common_1.Query)('page')),
    __param(6, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], ChargingSessionsController.prototype, "getAllSessionsAdmin", null);
__decorate([
    (0, common_1.Post)('admin/end/:id'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'End any charging session (Admin)',
        description: 'Admin can force-end any charging session. Only admins can access this endpoint.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Charging session ID' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Charging session ended successfully',
        type: charging_session_dto_1.ChargingSessionResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid session ID or session already ended'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Not found - Charging session not found'
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, charging_session_dto_1.EndChargingSessionDto]),
    __metadata("design:returntype", Promise)
], ChargingSessionsController.prototype, "adminEndSession", null);
__decorate([
    (0, common_1.Get)('admin/:id'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get charging session details (Admin)',
        description: 'Get full details of any charging session. Only admins can access this endpoint.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Charging session ID' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Charging session details retrieved successfully',
        type: charging_session_dto_1.ChargingSessionResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Not found - Charging session not found'
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChargingSessionsController.prototype, "adminGetSessionDetails", null);
__decorate([
    (0, common_1.Get)('admin/analytics/summary'),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get charging analytics summary (Admin)',
        description: 'Get aggregated charging session analytics including total sessions, energy delivered, and revenue.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'dateRangeStart', required: false, type: String, description: 'Start date filter (ISO string)' }),
    (0, swagger_1.ApiQuery)({ name: 'dateRangeEnd', required: false, type: String, description: 'End date filter (ISO string)' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Charging analytics summary retrieved successfully'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Admin token required'
    }),
    __param(0, (0, common_1.Query)('dateRangeStart')),
    __param(1, (0, common_1.Query)('dateRangeEnd')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ChargingSessionsController.prototype, "getAdminAnalyticsSummary", null);
__decorate([
    (0, common_1.Post)('start'),
    (0, common_1.UseGuards)(customer_auth_guard_1.CustomerAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Start a charging session (Customer)',
        description: 'Start a new charging session for the authenticated customer with a specific bike.'
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Charging session started successfully',
        type: charging_session_dto_1.ChargingSessionResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid input data or customer already has active session for this bike'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Customer token required'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Not found - Bike not found'
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, charging_session_dto_1.StartChargingSessionDto]),
    __metadata("design:returntype", Promise)
], ChargingSessionsController.prototype, "startChargingSession", null);
__decorate([
    (0, common_1.Post)(':id/end'),
    (0, common_1.UseGuards)(customer_auth_guard_1.CustomerAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'End a charging session (Customer)',
        description: 'End a specific charging session by providing the session ID. Only the session owner can end their session.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Charging session ID' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Charging session ended successfully',
        type: charging_session_dto_1.ChargingSessionResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid session ID or session already ended'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Customer token required'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Not found - Charging session not found'
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, charging_session_dto_1.EndChargingSessionDto]),
    __metadata("design:returntype", Promise)
], ChargingSessionsController.prototype, "endChargingSession", null);
__decorate([
    (0, common_1.Post)(':id/cancel'),
    (0, common_1.UseGuards)(customer_auth_guard_1.CustomerAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Cancel a charging session (Customer)',
        description: 'Cancel a specific charging session by providing the session ID. Only the session owner can cancel their session.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Charging session ID' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Charging session cancelled successfully',
        type: charging_session_dto_1.ChargingSessionResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid session ID or session already ended'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Customer token required'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Not found - Charging session not found'
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ChargingSessionsController.prototype, "cancelChargingSession", null);
__decorate([
    (0, common_1.Get)('active'),
    (0, common_1.UseGuards)(customer_auth_guard_1.CustomerAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get active charging sessions (Customer)',
        description: 'Get all active charging sessions for the authenticated customer across all their bikes.'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Active charging sessions retrieved successfully',
        type: [charging_session_dto_1.ChargingSessionResponseDto]
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Customer token required'
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChargingSessionsController.prototype, "getActiveSessions", null);
__decorate([
    (0, common_1.Get)('my-sessions'),
    (0, common_1.UseGuards)(customer_auth_guard_1.CustomerAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get past charging sessions (Customer)',
        description: 'Get completed charging sessions for the authenticated customer with pagination and filters.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'bikeId', required: false, type: String, description: 'Filter by specific bike ID' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' }),
    (0, swagger_1.ApiQuery)({ name: 'dateRangeStart', required: false, type: String, description: 'Start date filter (ISO string)' }),
    (0, swagger_1.ApiQuery)({ name: 'dateRangeEnd', required: false, type: String, description: 'End date filter (ISO string)' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Past charging sessions retrieved successfully',
        type: (charging_session_dto_1.PaginatedResponseDto)
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Customer token required'
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('bikeId')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __param(4, (0, common_1.Query)('dateRangeStart')),
    __param(5, (0, common_1.Query)('dateRangeEnd')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], ChargingSessionsController.prototype, "getMySessions", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(customer_auth_guard_1.CustomerAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get charging session details (Customer)',
        description: 'Get full details of a specific charging session. Only the session owner can view their session.'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Charging session ID' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Charging session details retrieved successfully',
        type: charging_session_dto_1.ChargingSessionResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Customer token required'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Not found - Charging session not found'
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ChargingSessionsController.prototype, "getSessionDetails", null);
__decorate([
    (0, common_1.Get)('analytics/summary'),
    (0, common_1.UseGuards)(customer_auth_guard_1.CustomerAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get customer charging analytics (Customer)',
        description: 'Get charging session analytics for the authenticated customer including sessions per day/month and duration statistics.'
    }),
    (0, swagger_1.ApiQuery)({ name: 'dateRangeStart', required: false, type: String, description: 'Start date filter (ISO string)' }),
    (0, swagger_1.ApiQuery)({ name: 'dateRangeEnd', required: false, type: String, description: 'End date filter (ISO string)' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Customer charging analytics retrieved successfully'
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - Customer token required'
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('dateRangeStart')),
    __param(2, (0, common_1.Query)('dateRangeEnd')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], ChargingSessionsController.prototype, "getCustomerAnalytics", null);
exports.ChargingSessionsController = ChargingSessionsController = __decorate([
    (0, swagger_1.ApiTags)('Charging Sessions'),
    (0, common_1.Controller)('charging-sessions'),
    __metadata("design:paramtypes", [charging_sessions_service_1.ChargingSessionsService])
], ChargingSessionsController);
//# sourceMappingURL=charging-sessions.controller.js.map
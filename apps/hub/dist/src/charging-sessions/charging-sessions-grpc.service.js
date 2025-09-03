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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChargingSessionsGrpcService = void 0;
const common_1 = require("@nestjs/common");
const charging_sessions_service_1 = require("./charging-sessions.service");
let ChargingSessionsGrpcService = class ChargingSessionsGrpcService {
    chargingSessionsService;
    constructor(chargingSessionsService) {
        this.chargingSessionsService = chargingSessionsService;
    }
    async getChargingSessions(request) {
        const result = await this.chargingSessionsService.searchChargingSessions({
            q: request.query,
            status: request.status,
            customerId: request.customer_id,
            bikeId: request.bike_id,
            startDate: request.start_date,
            endDate: request.end_date,
            minAmount: request.min_amount,
            maxAmount: request.max_amount,
            page: request.page,
            limit: request.limit,
            sortBy: request.sort_by,
            sortOrder: request.sort_order,
        });
        return {
            sessions: result.items.map(session => this.mapChargingSession(session)),
            total: result.total,
            page: result.page,
            limit: result.limit,
            total_pages: result.totalPages,
            has_next: result.hasNext,
            has_prev: result.hasPrev,
        };
    }
    async getChargingSession(request) {
        const session = await this.chargingSessionsService.getChargingSessionById(request.session_id);
        return this.mapChargingSession(session);
    }
    async getChargingSessionsByCustomer(request) {
        const result = await this.chargingSessionsService.getChargingSessionsByCustomer(request.customer_id, request.page, request.limit);
        return {
            sessions: result.items.map(session => this.mapChargingSession(session)),
            total: result.total,
            page: result.page,
            limit: result.limit,
            total_pages: result.totalPages,
            has_next: result.hasNext,
            has_prev: result.hasPrev,
        };
    }
    async getChargingSessionsByBike(request) {
        const result = await this.chargingSessionsService.getChargingSessionsByBike(request.bike_id, request.page, request.limit);
        return {
            sessions: result.items.map(session => this.mapChargingSession(session)),
            total: result.total,
            page: result.page,
            limit: result.limit,
            total_pages: result.totalPages,
            has_next: result.hasNext,
            has_prev: result.hasPrev,
        };
    }
    async getChargingSessionStats(request) {
        const stats = await this.chargingSessionsService.getChargingSessionStats(request.period, request.start_date, request.end_date);
        return {
            total_sessions: stats.totalSessions,
            active_sessions: stats.activeSessions,
            completed_sessions: stats.completedSessions,
            cancelled_sessions: stats.cancelledSessions,
            total_revenue: stats.totalRevenue,
            average_amount: 0,
            average_duration_minutes: 0,
            period: stats.period,
        };
    }
    async getRevenueAnalytics(request) {
        const analytics = await this.chargingSessionsService.getRevenueAnalytics(request.period, request.group_by);
        return {
            period: analytics.period,
            group_by: analytics.groupBy,
            data: analytics.data.map(point => ({
                date: point.date,
                revenue: point.revenue,
            })),
            total_revenue: analytics.totalRevenue,
        };
    }
    async getCurrentActiveSession(request) {
        const session = await this.chargingSessionsService.getCurrentActiveSession(request.customer_id);
        return this.mapChargingSession(session);
    }
    mapChargingSession(session) {
        const durationMinutes = session.endTime
            ? Math.round((new Date(session.endTime).getTime() - new Date(session.startTime).getTime()) / (1000 * 60))
            : 0;
        return {
            id: session.id,
            customer_id: session.customerId,
            bike_id: session.bikeId,
            amount: session.amount,
            start_time: session.startTime.toISOString(),
            end_time: session.endTime ? session.endTime.toISOString() : '',
            status: session.status,
            created_at: session.createdAt.toISOString(),
            updated_at: session.updatedAt.toISOString(),
            customer: session.customer ? {
                id: session.customer.id,
                first_name: session.customer.firstName,
                last_name: session.customer.lastName,
                email: session.customer.email,
                phone: session.customer.phone || '',
            } : null,
            bike: session.bike ? {
                id: session.bike.id,
                serial_number: session.bike.serialNumber,
                brand: session.bike.brand,
                model: session.bike.model,
                status: session.bike.status,
            } : null,
            duration_minutes: durationMinutes,
            energy_consumed_kwh: this.calculateEnergyConsumption(durationMinutes),
            cost: session.amount,
        };
    }
    calculateEnergyConsumption(durationMinutes) {
        const hours = durationMinutes / 60;
        return parseFloat((hours * 0.5).toFixed(2));
    }
};
exports.ChargingSessionsGrpcService = ChargingSessionsGrpcService;
exports.ChargingSessionsGrpcService = ChargingSessionsGrpcService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [charging_sessions_service_1.ChargingSessionsService])
], ChargingSessionsGrpcService);
//# sourceMappingURL=charging-sessions-grpc.service.js.map
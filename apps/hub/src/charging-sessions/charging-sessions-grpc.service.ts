import { Injectable } from '@nestjs/common';
import { ChargingSessionsService } from './charging-sessions.service';

@Injectable()
export class ChargingSessionsGrpcService {
  constructor(private chargingSessionsService: ChargingSessionsService) {}

  async getChargingSessions(request: any) {
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

  async getChargingSession(request: any) {
    const session = await this.chargingSessionsService.getChargingSessionById(request.session_id);
    return this.mapChargingSession(session);
  }

  async getChargingSessionsByCustomer(request: any) {
    const result = await this.chargingSessionsService.getChargingSessionsByCustomer(
      request.customer_id,
      request.page,
      request.limit
    );

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

  async getChargingSessionsByBike(request: any) {
    const result = await this.chargingSessionsService.getChargingSessionsByBike(
      request.bike_id,
      request.page,
      request.limit
    );

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

  async getChargingSessionStats(request: any) {
    const stats = await this.chargingSessionsService.getChargingSessionStats(
      request.period,
      request.start_date,
      request.end_date
    );

    return {
      total_sessions: stats.totalSessions,
      active_sessions: stats.activeSessions,
      completed_sessions: stats.completedSessions,
      cancelled_sessions: stats.cancelledSessions,
      total_revenue: stats.totalRevenue,
      average_amount: 0, // TODO: Add to stats
      average_duration_minutes: 0, // TODO: Add to stats
      period: stats.period,
    };
  }

  async getRevenueAnalytics(request: any) {
    const analytics = await this.chargingSessionsService.getRevenueAnalytics(
      request.period,
      request.group_by
    );

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

  async getCurrentActiveSession(request: any) {
    const session = await this.chargingSessionsService.getCurrentActiveSession(request.customer_id);
    return this.mapChargingSession(session);
  }

  private mapChargingSession(session: any) {
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

  private calculateEnergyConsumption(durationMinutes: number): number {
    const hours = durationMinutes / 60;
    return parseFloat((hours * 0.5).toFixed(2));
  }
}

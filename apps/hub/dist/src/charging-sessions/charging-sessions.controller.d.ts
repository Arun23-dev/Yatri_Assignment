import { ChargingSessionsService } from './charging-sessions.service';
import { StartChargingSessionDto, EndChargingSessionDto, SearchChargingSessionsDto, ChargingSessionResponseDto } from './dto/charging-session.dto';
export declare class ChargingSessionsController {
    private readonly chargingSessionsService;
    constructor(chargingSessionsService: ChargingSessionsService);
    getAllSessions(page?: number, limit?: number): Promise<{
        items: ({
            customer: {
                id: string;
                firstName: string;
                lastName: string;
                email: string;
            };
            bike: {
                id: string;
                serialNumber: string;
                brand: string;
                model: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            bikeId: string;
            customerId: string;
            amount: number;
            startTime: Date;
            endTime: Date | null;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }>;
    searchChargingSessions(filters: SearchChargingSessionsDto): Promise<{
        items: ({
            customer: {
                id: string;
                firstName: string;
                lastName: string;
                email: string;
                phone: string | null;
            };
            bike: {
                id: string;
                serialNumber: string;
                brand: string;
                model: string;
                status: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            bikeId: string;
            customerId: string;
            amount: number;
            startTime: Date;
            endTime: Date | null;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }>;
    getChargingSessionStats(period?: string, startDate?: string, endDate?: string): Promise<{
        totalSessions: number;
        activeSessions: number;
        completedSessions: number;
        cancelledSessions: number;
        totalRevenue: number;
        period: string;
    }>;
    getRevenueAnalytics(period?: string, groupBy?: string): Promise<{
        period: string;
        groupBy: string;
        data: {
            date: string;
            revenue: number;
        }[];
        totalRevenue: number;
    }>;
    getChargingSessionsByCustomer(customerId: string, page?: number, limit?: number): Promise<{
        items: ({
            bike: {
                id: string;
                serialNumber: string;
                brand: string;
                model: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            bikeId: string;
            customerId: string;
            amount: number;
            startTime: Date;
            endTime: Date | null;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }>;
    getChargingSessionsByBike(bikeId: string, page?: number, limit?: number): Promise<{
        items: ({
            customer: {
                id: string;
                firstName: string;
                lastName: string;
                email: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            bikeId: string;
            customerId: string;
            amount: number;
            startTime: Date;
            endTime: Date | null;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }>;
    getChargingSessionReports(filters: any): Promise<{
        sessions: {
            transaction: {
                id: string;
                amount: number;
                status: string;
                paymentMethod: string;
                transactionTime: Date;
                reference: string;
            };
            customer: {
                id: string;
                firstName: string;
                lastName: string;
                email: string;
            };
            bike: {
                id: string;
                serialNumber: string;
                brand: string;
                model: string;
            };
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            bikeId: string;
            customerId: string;
            amount: number;
            startTime: Date;
            endTime: Date | null;
        }[];
        total: number;
        filters: {
            startDate?: string;
            endDate?: string;
            status?: string;
            customerId?: string;
            bikeId?: string;
            format?: string;
        };
        generatedAt: Date;
    }>;
    getAllSessionsAdmin(customerId?: string, bikeId?: string, status?: string, dateRangeStart?: string, dateRangeEnd?: string, page?: number, limit?: number): Promise<{
        items: ({
            customer: {
                id: string;
                firstName: string;
                lastName: string;
                email: string;
            };
            bike: {
                id: string;
                serialNumber: string;
                brand: string;
                model: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            bikeId: string;
            customerId: string;
            amount: number;
            startTime: Date;
            endTime: Date | null;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }>;
    adminEndSession(id: string, body: EndChargingSessionDto): Promise<ChargingSessionResponseDto>;
    adminGetSessionDetails(id: string): Promise<ChargingSessionResponseDto>;
    getAdminAnalyticsSummary(dateRangeStart?: string, dateRangeEnd?: string): Promise<{
        totalSessions: number;
        activeSessions: number;
        completedSessions: number;
        cancelledSessions: number;
        totalRevenue: number;
        totalEnergyDelivered: number;
        averageRevenuePerSession: number;
    }>;
    startChargingSession(req: any, body: StartChargingSessionDto): Promise<ChargingSessionResponseDto>;
    endChargingSession(id: string, req: any, body: EndChargingSessionDto): Promise<ChargingSessionResponseDto>;
    cancelChargingSession(id: string, req: any): Promise<ChargingSessionResponseDto>;
    getActiveSessions(req: any): Promise<({
        customer: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
        };
        bike: {
            id: string;
            serialNumber: string;
            brand: string;
            model: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        bikeId: string;
        customerId: string;
        amount: number;
        startTime: Date;
        endTime: Date | null;
    })[]>;
    getMySessions(req: any, bikeId?: string, page?: number, limit?: number, dateRangeStart?: string, dateRangeEnd?: string): Promise<{
        items: ({
            bike: {
                id: string;
                serialNumber: string;
                brand: string;
                model: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            bikeId: string;
            customerId: string;
            amount: number;
            startTime: Date;
            endTime: Date | null;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }>;
    getSessionDetails(id: string, req: any): Promise<ChargingSessionResponseDto>;
    getCustomerAnalytics(req: any, dateRangeStart?: string, dateRangeEnd?: string): Promise<{
        totalSessions: number;
        completedSessions: number;
        activeSessions: number;
        cancelledSessions: number;
        totalRevenue: number;
        totalDurationMinutes: number;
        totalDurationHours: number;
        averageDurationMinutes: number;
        averageDurationHours: number;
        dailyStats: {
            averageSessionsPerDay: number;
            averageRevenuePerDay: number;
            mostActiveDay: string;
            mostActiveDayCount: number;
        };
        sessionsPerDay: {
            date: Date;
            count: number;
            revenue: number;
        }[];
        sessionsPerMonth: {
            date: Date;
            count: number;
            revenue: number;
        }[];
        hourlyDistribution: {
            hour: number;
            count: number;
            percentage: number;
        }[];
        recentSessions: any[];
        summary: {
            totalSessions: number;
            completedSessions: number;
            activeSessions: number;
            cancelledSessions: number;
            totalRevenue: number;
            averageRevenuePerSession: number;
            averageDurationMinutes: number;
            totalDurationHours: number;
        };
    }>;
}

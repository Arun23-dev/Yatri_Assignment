import { PrismaService } from '../prisma/prisma.service';
export declare class ChargingSessionsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(page?: number, limit?: number): Promise<{
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
    getChargingSessionById(id: string): Promise<{
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
    }>;
    searchChargingSessions(filters: {
        q?: string;
        status?: string;
        customerId?: string;
        bikeId?: string;
        startDate?: string;
        endDate?: string;
        minAmount?: number;
        maxAmount?: number;
        page?: number;
        limit?: number;
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
    }): Promise<{
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
    startChargingSession(customerId: string, data: {
        bikeId: string;
        amount: number;
    }): Promise<{
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
    }>;
    endChargingSession(customerId: string, sessionId: string, endTime?: Date): Promise<{
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
    }>;
    cancelChargingSession(customerId: string, sessionId: string): Promise<{
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
    }>;
    getActiveSessionsByCustomer(customerId: string): Promise<({
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
    getMySessions(customerId: string, filters: {
        bikeId?: string;
        page?: number;
        limit?: number;
        dateRangeStart?: string;
        dateRangeEnd?: string;
    }): Promise<{
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
    getSessionDetails(customerId: string, sessionId: string): Promise<{
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
    }>;
    getCurrentActiveSession(customerId: string): Promise<{
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
    }>;
    getCustomerAnalytics(customerId: string, dateRangeStart?: string, dateRangeEnd?: string): Promise<{
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
    private formatDuration;
    private calculateHourlyDistribution;
    private calculateDailyStats;
    getAllSessions(filters: {
        customerId?: string;
        bikeId?: string;
        status?: string;
        dateRangeStart?: string;
        dateRangeEnd?: string;
        page?: number;
        limit?: number;
    }): Promise<{
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
    adminEndSession(sessionId: string, endTime?: Date): Promise<{
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
    }>;
    adminGetSessionDetails(sessionId: string): Promise<{
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
    }>;
    getAdminAnalyticsSummary(dateRangeStart?: string, dateRangeEnd?: string): Promise<{
        totalSessions: number;
        activeSessions: number;
        completedSessions: number;
        cancelledSessions: number;
        totalRevenue: number;
        totalEnergyDelivered: number;
        averageRevenuePerSession: number;
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
    getChargingSessionReports(filters: {
        startDate?: string;
        endDate?: string;
        status?: string;
        customerId?: string;
        bikeId?: string;
        format?: string;
    }): Promise<{
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
}

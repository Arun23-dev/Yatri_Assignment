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
exports.ChargingSessionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ChargingSessionsService = class ChargingSessionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [sessions, total] = await Promise.all([
            this.prisma.chargingSession.findMany({
                skip,
                take: limit,
                orderBy: { startTime: 'desc' },
                include: {
                    customer: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                        },
                    },
                    bike: {
                        select: {
                            id: true,
                            serialNumber: true,
                            brand: true,
                            model: true,
                        },
                    },
                },
            }),
            this.prisma.chargingSession.count(),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            items: sessions,
            total,
            page,
            limit,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
        };
    }
    async getChargingSessionById(id) {
        const session = await this.prisma.chargingSession.findUnique({
            where: { id },
            include: {
                customer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                bike: {
                    select: {
                        id: true,
                        serialNumber: true,
                        brand: true,
                        model: true,
                    },
                },
            },
        });
        if (!session) {
            throw new common_1.NotFoundException('Charging session not found');
        }
        return session;
    }
    async searchChargingSessions(filters) {
        const page = filters.page || 1;
        const limit = filters.limit || 10;
        const skip = (page - 1) * limit;
        const whereConditions = {};
        if (filters.q && filters.q.trim() !== '') {
            whereConditions.OR = [
                { customer: { firstName: { contains: filters.q } } },
                { customer: { lastName: { contains: filters.q } } },
                { customer: { email: { contains: filters.q } } },
                { bike: { serialNumber: { contains: filters.q } } },
                { bike: { model: { contains: filters.q } } },
                { bike: { brand: { contains: filters.q } } },
            ];
        }
        if (filters.status && filters.status.trim() !== '') {
            whereConditions.status = filters.status;
        }
        if (filters.customerId && filters.customerId.trim() !== '') {
            whereConditions.customerId = filters.customerId;
        }
        if (filters.bikeId && filters.bikeId.trim() !== '') {
            whereConditions.bikeId = filters.bikeId;
        }
        if (filters.startDate || filters.endDate) {
            whereConditions.startTime = {};
            if (filters.startDate) {
                whereConditions.startTime.gte = new Date(filters.startDate);
            }
            if (filters.endDate) {
                whereConditions.startTime.lte = new Date(filters.endDate);
            }
        }
        if (filters.minAmount !== undefined || filters.maxAmount !== undefined) {
            whereConditions.amount = {};
            if (filters.minAmount !== undefined) {
                whereConditions.amount.gte = filters.minAmount;
            }
            if (filters.maxAmount !== undefined) {
                whereConditions.amount.lte = filters.maxAmount;
            }
        }
        const orderBy = {};
        if (filters.sortBy) {
            orderBy[filters.sortBy] = filters.sortOrder || 'desc';
        }
        else {
            orderBy.startTime = 'desc';
        }
        const [sessions, total] = await Promise.all([
            this.prisma.chargingSession.findMany({
                where: whereConditions,
                skip,
                take: limit,
                orderBy,
                include: {
                    customer: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                            phone: true,
                        },
                    },
                    bike: {
                        select: {
                            id: true,
                            serialNumber: true,
                            brand: true,
                            model: true,
                            status: true,
                        },
                    },
                },
            }),
            this.prisma.chargingSession.count({
                where: whereConditions,
            }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            items: sessions,
            total,
            page,
            limit,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
        };
    }
    async startChargingSession(customerId, data) {
        const existingActiveSession = await this.prisma.chargingSession.findFirst({
            where: {
                customerId,
                bikeId: data.bikeId,
                status: 'ACTIVE',
            },
        });
        if (existingActiveSession) {
            throw new common_1.BadRequestException('Customer already has an active charging session for this bike');
        }
        const bike = await this.prisma.bike.findUnique({
            where: { id: data.bikeId },
        });
        if (!bike) {
            throw new common_1.NotFoundException('Bike not found');
        }
        if (bike.status !== 'AVAILABLE') {
            throw new common_1.BadRequestException('Bike is not available for charging');
        }
        const chargingSession = await this.prisma.chargingSession.create({
            data: {
                customerId: customerId,
                bikeId: data.bikeId,
                amount: data.amount,
                startTime: new Date(),
                status: 'ACTIVE',
            },
            include: {
                customer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                bike: {
                    select: {
                        id: true,
                        serialNumber: true,
                        brand: true,
                        model: true,
                    },
                },
            },
        });
        return chargingSession;
    }
    async endChargingSession(customerId, sessionId, endTime) {
        const session = await this.prisma.chargingSession.findUnique({
            where: { id: sessionId },
            include: {
                customer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                bike: {
                    select: {
                        id: true,
                        serialNumber: true,
                        brand: true,
                        model: true,
                    },
                },
            },
        });
        if (!session) {
            throw new common_1.NotFoundException('Charging session not found');
        }
        if (session.customerId !== customerId) {
            throw new common_1.BadRequestException('This charging session does not belong to you');
        }
        if (session.status !== 'ACTIVE') {
            throw new common_1.BadRequestException(`Charging session is not active. Current status: ${session.status}`);
        }
        if (session.endTime) {
            throw new common_1.BadRequestException('Charging session has already ended');
        }
        const actualEndTime = endTime || new Date();
        if (actualEndTime < session.startTime) {
            throw new common_1.BadRequestException('End time cannot be before start time');
        }
        const updatedSession = await this.prisma.chargingSession.update({
            where: { id: sessionId },
            data: {
                endTime: actualEndTime,
                status: 'COMPLETED',
            },
            include: {
                customer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                bike: {
                    select: {
                        id: true,
                        serialNumber: true,
                        brand: true,
                        model: true,
                    },
                },
            },
        });
        return updatedSession;
    }
    async cancelChargingSession(customerId, sessionId) {
        const session = await this.prisma.chargingSession.findUnique({
            where: { id: sessionId },
            include: {
                customer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                bike: {
                    select: {
                        id: true,
                        serialNumber: true,
                        brand: true,
                        model: true,
                    },
                },
            },
        });
        if (!session) {
            throw new common_1.NotFoundException('Charging session not found');
        }
        if (session.customerId !== customerId) {
            throw new common_1.BadRequestException('This charging session does not belong to you');
        }
        if (session.status !== 'ACTIVE') {
            throw new common_1.BadRequestException(`Charging session is not active. Current status: ${session.status}`);
        }
        if (session.endTime) {
            throw new common_1.BadRequestException('Charging session has already ended');
        }
        const endTime = new Date();
        const updatedSession = await this.prisma.chargingSession.update({
            where: { id: sessionId },
            data: {
                endTime,
                status: 'CANCELLED',
            },
            include: {
                customer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                bike: {
                    select: {
                        id: true,
                        serialNumber: true,
                        brand: true,
                        model: true,
                    },
                },
            },
        });
        return updatedSession;
    }
    async getActiveSessionsByCustomer(customerId) {
        return this.prisma.chargingSession.findMany({
            where: {
                customerId,
                status: 'ACTIVE',
            },
            include: {
                customer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                bike: {
                    select: {
                        id: true,
                        serialNumber: true,
                        brand: true,
                        model: true,
                    },
                },
            },
            orderBy: { startTime: 'desc' },
        });
    }
    async getMySessions(customerId, filters) {
        const page = filters.page || 1;
        const limit = filters.limit || 10;
        const skip = (page - 1) * limit;
        const whereConditions = {
            customerId,
            status: { in: ['COMPLETED', 'CANCELLED'] },
        };
        if (filters.bikeId) {
            whereConditions.bikeId = filters.bikeId;
        }
        if (filters.dateRangeStart || filters.dateRangeEnd) {
            whereConditions.startTime = {};
            if (filters.dateRangeStart) {
                whereConditions.startTime.gte = new Date(filters.dateRangeStart);
            }
            if (filters.dateRangeEnd) {
                whereConditions.startTime.lte = new Date(filters.dateRangeEnd);
            }
        }
        const [sessions, total] = await Promise.all([
            this.prisma.chargingSession.findMany({
                where: whereConditions,
                skip,
                take: limit,
                orderBy: { startTime: 'desc' },
                include: {
                    bike: {
                        select: {
                            id: true,
                            serialNumber: true,
                            brand: true,
                            model: true,
                        },
                    },
                },
            }),
            this.prisma.chargingSession.count({
                where: whereConditions,
            }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            items: sessions,
            total,
            page,
            limit,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
        };
    }
    async getSessionDetails(customerId, sessionId) {
        const session = await this.prisma.chargingSession.findFirst({
            where: {
                id: sessionId,
                customerId,
            },
            include: {
                customer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                bike: {
                    select: {
                        id: true,
                        serialNumber: true,
                        brand: true,
                        model: true,
                    },
                },
            },
        });
        if (!session) {
            throw new common_1.NotFoundException('Charging session not found');
        }
        return session;
    }
    async getCurrentActiveSession(customerId) {
        const session = await this.prisma.chargingSession.findFirst({
            where: {
                customerId,
                status: 'ACTIVE',
            },
            include: {
                customer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                bike: {
                    select: {
                        id: true,
                        serialNumber: true,
                        brand: true,
                        model: true,
                    },
                },
            },
        });
        if (!session) {
            throw new common_1.NotFoundException('No active charging session found');
        }
        return session;
    }
    async getCustomerAnalytics(customerId, dateRangeStart, dateRangeEnd) {
        console.log('🔍 Service: getCustomerAnalytics called with customerId:', customerId);
        const whereConditions = { customerId };
        if (dateRangeStart || dateRangeEnd) {
            whereConditions.startTime = {};
            if (dateRangeStart) {
                whereConditions.startTime.gte = new Date(dateRangeStart);
            }
            if (dateRangeEnd) {
                whereConditions.startTime.lte = new Date(dateRangeEnd);
            }
        }
        const allSessions = await this.prisma.chargingSession.findMany({
            where: whereConditions,
            orderBy: { startTime: 'desc' },
            include: {
                bike: {
                    select: {
                        id: true,
                        serialNumber: true,
                        brand: true,
                        model: true,
                    },
                },
            },
        });
        console.log('🔍 Found sessions:', allSessions.length);
        const totalSessions = allSessions.length;
        const completedSessions = allSessions.filter(s => s.status === 'COMPLETED').length;
        const activeSessions = allSessions.filter(s => s.status === 'ACTIVE').length;
        const cancelledSessions = allSessions.filter(s => s.status === 'CANCELLED').length;
        const totalRevenue = allSessions
            .filter(s => s.status === 'COMPLETED')
            .reduce((sum, session) => sum + session.amount, 0);
        const sessionsWithDuration = allSessions
            .filter(s => s.endTime && s.status !== 'ACTIVE')
            .map(session => {
            const durationMs = session.endTime.getTime() - session.startTime.getTime();
            const durationMinutes = Math.round(durationMs / (1000 * 60));
            const durationHours = durationMinutes / 60;
            return {
                ...session,
                durationMinutes,
                durationHours,
            };
        });
        const totalDurationMinutes = sessionsWithDuration.reduce((sum, s) => sum + s.durationMinutes, 0);
        const averageDurationMinutes = sessionsWithDuration.length > 0 ? totalDurationMinutes / sessionsWithDuration.length : 0;
        const sessionsPerDay = await this.prisma.chargingSession.groupBy({
            by: ['startTime'],
            where: whereConditions,
            _count: {
                id: true,
            },
            _sum: {
                amount: true,
            },
            orderBy: {
                startTime: 'desc',
            },
            take: 30,
        });
        const sessionsPerMonth = await this.prisma.chargingSession.groupBy({
            by: ['startTime'],
            where: whereConditions,
            _count: {
                id: true,
            },
            _sum: {
                amount: true,
            },
            orderBy: {
                startTime: 'desc',
            },
            take: 12,
        });
        const recentSessions = allSessions.slice(0, 10).map(session => {
            const sessionData = {
                id: session.id,
                startTime: session.startTime,
                endTime: session.endTime,
                status: session.status,
                amount: session.amount,
                bike: session.bike,
            };
            if (session.endTime && session.status !== 'ACTIVE') {
                const durationMs = session.endTime.getTime() - session.startTime.getTime();
                sessionData.durationMinutes = Math.round(durationMs / (1000 * 60));
                sessionData.durationHours = sessionData.durationMinutes / 60;
                sessionData.durationFormatted = this.formatDuration(sessionData.durationMinutes);
            }
            else if (session.status === 'ACTIVE') {
                const durationMs = new Date().getTime() - session.startTime.getTime();
                sessionData.durationMinutes = Math.round(durationMs / (1000 * 60));
                sessionData.durationHours = sessionData.durationMinutes / 60;
                sessionData.durationFormatted = this.formatDuration(sessionData.durationMinutes);
                sessionData.isActive = true;
            }
            return sessionData;
        });
        const hourlyDistribution = this.calculateHourlyDistribution(allSessions);
        const dailyStats = this.calculateDailyStats(sessionsPerDay);
        const enhancedResponse = {
            totalSessions,
            completedSessions,
            activeSessions,
            cancelledSessions,
            totalRevenue,
            totalDurationMinutes,
            totalDurationHours: totalDurationMinutes / 60,
            averageDurationMinutes,
            averageDurationHours: averageDurationMinutes / 60,
            dailyStats,
            sessionsPerDay: sessionsPerDay.map(day => ({
                date: day.startTime,
                count: day._count.id,
                revenue: day._sum.amount || 0,
            })),
            sessionsPerMonth: sessionsPerMonth.map(month => ({
                date: month.startTime,
                count: month._count.id,
                revenue: month._sum.amount || 0,
            })),
            hourlyDistribution,
            recentSessions,
            summary: {
                totalSessions,
                completedSessions,
                activeSessions,
                cancelledSessions,
                totalRevenue,
                averageRevenuePerSession: completedSessions > 0 ? totalRevenue / completedSessions : 0,
                averageDurationMinutes,
                totalDurationHours: totalDurationMinutes / 60,
            }
        };
        console.log('🔍 Enhanced response keys:', Object.keys(enhancedResponse));
        console.log('🔍 Enhanced response has totalDurationMinutes:', 'totalDurationMinutes' in enhancedResponse);
        console.log('🔍 Enhanced response has recentSessions:', 'recentSessions' in enhancedResponse);
        return enhancedResponse;
    }
    formatDuration(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hours > 0) {
            return `${hours}h ${mins}m`;
        }
        return `${mins}m`;
    }
    calculateHourlyDistribution(sessions) {
        const hourlyCounts = new Array(24).fill(0);
        sessions.forEach(session => {
            const hour = session.startTime.getHours();
            hourlyCounts[hour]++;
        });
        const total = sessions.length;
        return hourlyCounts.map((count, hour) => ({
            hour,
            count,
            percentage: total > 0 ? Math.round((count / total) * 100) : 0,
        }));
    }
    calculateDailyStats(sessionsPerDay) {
        if (sessionsPerDay.length === 0) {
            return {
                averageSessionsPerDay: 0,
                averageRevenuePerDay: 0,
                mostActiveDay: '',
                mostActiveDayCount: 0,
            };
        }
        const totalSessions = sessionsPerDay.reduce((sum, day) => sum + day._count.id, 0);
        const totalRevenue = sessionsPerDay.reduce((sum, day) => sum + (day._sum.amount || 0), 0);
        const mostActiveDay = sessionsPerDay.reduce((max, day) => day._count.id > max._count.id ? day : max);
        return {
            averageSessionsPerDay: Math.round((totalSessions / sessionsPerDay.length) * 100) / 100,
            averageRevenuePerDay: Math.round((totalRevenue / sessionsPerDay.length) * 100) / 100,
            mostActiveDay: mostActiveDay.startTime.toISOString().split('T')[0],
            mostActiveDayCount: mostActiveDay._count.id,
        };
    }
    async getAllSessions(filters) {
        const page = filters.page || 1;
        const limit = filters.limit || 10;
        const skip = (page - 1) * limit;
        const whereConditions = {};
        if (filters.customerId) {
            whereConditions.customerId = filters.customerId;
        }
        if (filters.bikeId) {
            whereConditions.bikeId = filters.bikeId;
        }
        if (filters.status) {
            whereConditions.status = filters.status;
        }
        if (filters.dateRangeStart || filters.dateRangeEnd) {
            whereConditions.startTime = {};
            if (filters.dateRangeStart) {
                whereConditions.startTime.gte = new Date(filters.dateRangeStart);
            }
            if (filters.dateRangeEnd) {
                whereConditions.startTime.lte = new Date(filters.dateRangeEnd);
            }
        }
        const [sessions, total] = await Promise.all([
            this.prisma.chargingSession.findMany({
                where: whereConditions,
                skip,
                take: limit,
                orderBy: { startTime: 'desc' },
                include: {
                    customer: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                        },
                    },
                    bike: {
                        select: {
                            id: true,
                            serialNumber: true,
                            brand: true,
                            model: true,
                        },
                    },
                },
            }),
            this.prisma.chargingSession.count({
                where: whereConditions,
            }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            items: sessions,
            total,
            page,
            limit,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
        };
    }
    async adminEndSession(sessionId, endTime) {
        const session = await this.prisma.chargingSession.findUnique({
            where: { id: sessionId },
            include: {
                customer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                bike: {
                    select: {
                        id: true,
                        serialNumber: true,
                        brand: true,
                        model: true,
                    },
                },
            },
        });
        if (!session) {
            throw new common_1.NotFoundException('Charging session not found');
        }
        if (session.status !== 'ACTIVE') {
            throw new common_1.BadRequestException('Charging session is not active');
        }
        const actualEndTime = endTime || new Date();
        const updatedSession = await this.prisma.chargingSession.update({
            where: { id: sessionId },
            data: {
                endTime: actualEndTime,
                status: 'COMPLETED',
            },
            include: {
                customer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                bike: {
                    select: {
                        id: true,
                        serialNumber: true,
                        brand: true,
                        model: true,
                    },
                },
            },
        });
        return updatedSession;
    }
    async adminGetSessionDetails(sessionId) {
        const session = await this.prisma.chargingSession.findUnique({
            where: { id: sessionId },
            include: {
                customer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                bike: {
                    select: {
                        id: true,
                        serialNumber: true,
                        brand: true,
                        model: true,
                    },
                },
            },
        });
        if (!session) {
            throw new common_1.NotFoundException('Charging session not found');
        }
        return session;
    }
    async getAdminAnalyticsSummary(dateRangeStart, dateRangeEnd) {
        const whereConditions = {};
        if (dateRangeStart || dateRangeEnd) {
            whereConditions.startTime = {};
            if (dateRangeStart) {
                whereConditions.startTime.gte = new Date(dateRangeStart);
            }
            if (dateRangeEnd) {
                whereConditions.startTime.lte = new Date(dateRangeEnd);
            }
        }
        const [totalSessions, activeSessions, completedSessions, totalRevenue] = await Promise.all([
            this.prisma.chargingSession.count({ where: whereConditions }),
            this.prisma.chargingSession.count({ where: { ...whereConditions, status: 'ACTIVE' } }),
            this.prisma.chargingSession.count({ where: { ...whereConditions, status: 'COMPLETED' } }),
            this.prisma.chargingSession.aggregate({
                where: { ...whereConditions, status: 'COMPLETED' },
                _sum: { amount: true },
            }),
        ]);
        return {
            totalSessions,
            activeSessions,
            completedSessions,
            cancelledSessions: totalSessions - activeSessions - completedSessions,
            totalRevenue: totalRevenue._sum.amount || 0,
            totalEnergyDelivered: totalRevenue._sum.amount || 0,
            averageRevenuePerSession: completedSessions > 0 ? (totalRevenue._sum.amount || 0) / completedSessions : 0,
        };
    }
    async getChargingSessionStats(period, startDate, endDate) {
        let dateFilter = {};
        if (startDate && endDate) {
            dateFilter = {
                startTime: {
                    gte: new Date(startDate),
                    lte: new Date(endDate),
                },
            };
        }
        else if (period) {
            const now = new Date();
            let start;
            switch (period) {
                case 'today':
                    start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    break;
                case 'week':
                    start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                    break;
                case 'month':
                    start = new Date(now.getFullYear(), now.getMonth(), 1);
                    break;
                case 'year':
                    start = new Date(now.getFullYear(), 0, 1);
                    break;
                default:
                    start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            }
            dateFilter = {
                startTime: {
                    gte: start,
                },
            };
        }
        const [totalSessions, activeSessions, completedSessions, cancelledSessions, totalRevenue] = await Promise.all([
            this.prisma.chargingSession.count({
                where: dateFilter,
            }),
            this.prisma.chargingSession.count({
                where: { ...dateFilter, status: 'ACTIVE' },
            }),
            this.prisma.chargingSession.count({
                where: { ...dateFilter, status: 'COMPLETED' },
            }),
            this.prisma.chargingSession.count({
                where: { ...dateFilter, status: 'CANCELLED' },
            }),
            this.prisma.chargingSession.aggregate({
                where: { ...dateFilter, status: 'COMPLETED' },
                _sum: {
                    amount: true,
                },
            }),
        ]);
        return {
            totalSessions,
            activeSessions,
            completedSessions,
            cancelledSessions,
            totalRevenue: totalRevenue._sum.amount || 0,
            period: period || 'custom',
        };
    }
    async getRevenueAnalytics(period = 'month', groupBy = 'day') {
        const now = new Date();
        let start;
        switch (period) {
            case 'week':
                start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                break;
            case 'month':
                start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                break;
            case 'year':
                start = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
                break;
            default:
                start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        }
        const sessions = await this.prisma.chargingSession.findMany({
            where: {
                status: 'COMPLETED',
                startTime: {
                    gte: start,
                },
            },
            select: {
                amount: true,
                startTime: true,
            },
            orderBy: {
                startTime: 'asc',
            },
        });
        const groupedData = {};
        sessions.forEach(session => {
            let key;
            switch (groupBy) {
                case 'day':
                    key = session.startTime.toISOString().split('T')[0];
                    break;
                case 'week':
                    const weekStart = new Date(session.startTime);
                    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
                    key = weekStart.toISOString().split('T')[0];
                    break;
                case 'month':
                    key = `${session.startTime.getFullYear()}-${String(session.startTime.getMonth() + 1).padStart(2, '0')}`;
                    break;
                default:
                    key = session.startTime.toISOString().split('T')[0];
            }
            groupedData[key] = (groupedData[key] || 0) + session.amount;
        });
        return {
            period,
            groupBy,
            data: Object.entries(groupedData).map(([date, revenue]) => ({
                date,
                revenue: parseFloat(revenue.toFixed(2)),
            })),
            totalRevenue: sessions.reduce((sum, session) => sum + session.amount, 0),
        };
    }
    async getChargingSessionsByCustomer(customerId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [sessions, total] = await Promise.all([
            this.prisma.chargingSession.findMany({
                where: { customerId },
                skip,
                take: limit,
                orderBy: { startTime: 'desc' },
                include: {
                    bike: {
                        select: {
                            id: true,
                            serialNumber: true,
                            brand: true,
                            model: true,
                        },
                    },
                },
            }),
            this.prisma.chargingSession.count({
                where: { customerId },
            }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            items: sessions,
            total,
            page,
            limit,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
        };
    }
    async getChargingSessionsByBike(bikeId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [sessions, total] = await Promise.all([
            this.prisma.chargingSession.findMany({
                where: { bikeId },
                skip,
                take: limit,
                orderBy: { startTime: 'desc' },
                include: {
                    customer: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                        },
                    },
                },
            }),
            this.prisma.chargingSession.count({
                where: { bikeId },
            }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            items: sessions,
            total,
            page,
            limit,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
        };
    }
    async getChargingSessionReports(filters) {
        const whereConditions = {};
        if (filters.startDate || filters.endDate) {
            whereConditions.startTime = {};
            if (filters.startDate) {
                whereConditions.startTime.gte = new Date(filters.startDate);
            }
            if (filters.endDate) {
                whereConditions.startTime.lte = new Date(filters.endDate);
            }
        }
        if (filters.status) {
            whereConditions.status = filters.status;
        }
        if (filters.customerId) {
            whereConditions.customerId = filters.customerId;
        }
        if (filters.bikeId) {
            whereConditions.bikeId = filters.bikeId;
        }
        const sessions = await this.prisma.chargingSession.findMany({
            where: whereConditions,
            include: {
                customer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                bike: {
                    select: {
                        id: true,
                        serialNumber: true,
                        brand: true,
                        model: true,
                    },
                },
            },
            orderBy: { startTime: 'desc' },
        });
        const sessionsWithTransactions = sessions.map(session => ({
            ...session,
            transaction: {
                id: `txn_${session.id}`,
                amount: session.amount,
                status: session.status === 'COMPLETED' ? 'SUCCESS' : session.status === 'CANCELLED' ? 'FAILED' : 'PENDING',
                paymentMethod: 'WALLET',
                transactionTime: session.endTime || session.startTime,
                reference: `CHG_${session.id}`,
            }
        }));
        return {
            sessions: sessionsWithTransactions,
            total: sessions.length,
            filters,
            generatedAt: new Date(),
        };
    }
};
exports.ChargingSessionsService = ChargingSessionsService;
exports.ChargingSessionsService = ChargingSessionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChargingSessionsService);
//# sourceMappingURL=charging-sessions.service.js.map
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
exports.BikesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BikesService = class BikesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createBike(data) {
        const existingBike = await this.prisma.bike.findUnique({
            where: { serialNumber: data.serialNumber },
        });
        if (existingBike) {
            throw new common_1.BadRequestException('Bike with this serial number already exists');
        }
        const bike = await this.prisma.bike.create({
            data: {
                serialNumber: data.serialNumber,
                brand: data.brand,
                model: data.model,
                status: data.status || 'AVAILABLE',
            },
        });
        return bike;
    }
    async getAllBikes(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [bikes, total] = await Promise.all([
            this.prisma.bike.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.bike.count(),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            items: bikes,
            total,
            page,
            limit,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
        };
    }
    async searchBikes(query, status, page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;
            const whereConditions = {};
            if (query && query.trim() !== '') {
                whereConditions.OR = [
                    { model: { contains: query } },
                    { brand: { contains: query } },
                    { serialNumber: { contains: query } },
                ];
            }
            if (status && status.trim() !== '') {
                whereConditions.status = status;
            }
            const [bikes, total] = await Promise.all([
                this.prisma.bike.findMany({
                    where: whereConditions,
                    skip,
                    take: limit,
                    orderBy: { createdAt: 'desc' },
                }),
                this.prisma.bike.count({
                    where: whereConditions,
                }),
            ]);
            const totalPages = Math.ceil(total / limit);
            return {
                items: bikes,
                total,
                page,
                limit,
                totalPages,
                hasNext: page < totalPages,
                hasPrev: page > 1,
            };
        }
        catch (error) {
            console.error('Search bikes error:', error);
            throw error;
        }
    }
    async getAvailableBikes(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [bikes, total] = await Promise.all([
            this.prisma.bike.findMany({
                where: { status: 'AVAILABLE' },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.bike.count({
                where: { status: 'AVAILABLE' },
            }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            items: bikes,
            total,
            page,
            limit,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
        };
    }
    async getBikeById(id) {
        const bike = await this.prisma.bike.findUnique({
            where: { id },
        });
        if (!bike) {
            throw new common_1.NotFoundException('Bike not found');
        }
        return bike;
    }
    async updateBikeStatus(id, data) {
        const bike = await this.prisma.bike.findUnique({
            where: { id },
        });
        if (!bike) {
            throw new common_1.NotFoundException('Bike not found');
        }
        const updatedBike = await this.prisma.bike.update({
            where: { id },
            data: { status: data.status },
        });
        return updatedBike;
    }
    async assignBike(data, adminId) {
        const bike = await this.prisma.bike.findUnique({
            where: { id: data.bikeId },
        });
        if (!bike) {
            throw new common_1.NotFoundException('Bike not found');
        }
        if (bike.status !== 'AVAILABLE') {
            throw new common_1.BadRequestException('Bike is not available for assignment');
        }
        const customer = await this.prisma.customer.findUnique({
            where: { id: data.customerId },
        });
        if (!customer) {
            throw new common_1.NotFoundException('Customer not found');
        }
        const activeAssignment = await this.prisma.bikeAssignment.findFirst({
            where: {
                customerId: data.customerId,
                returnedAt: undefined,
            },
        });
        if (activeAssignment) {
            throw new common_1.BadRequestException('Customer already has an active bike assignment');
        }
        const assignment = await this.prisma.bikeAssignment.create({
            data: {
                bikeId: data.bikeId,
                customerId: data.customerId,
                assignedBy: adminId,
            },
            include: {
                bike: true,
                customer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true,
                        address: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
                admin: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
            },
        });
        await this.prisma.bike.update({
            where: { id: data.bikeId },
            data: { status: 'ASSIGNED' },
        });
        return assignment;
    }
    async returnBike(data) {
        const bike = await this.prisma.bike.findUnique({
            where: { id: data.bikeId },
        });
        if (!bike) {
            throw new common_1.NotFoundException('Bike not found');
        }
        if (bike.status !== 'ASSIGNED') {
            throw new common_1.BadRequestException('Bike is not currently assigned');
        }
        const assignment = await this.prisma.bikeAssignment.findFirst({
            where: {
                bikeId: data.bikeId,
                returnedAt: undefined,
            },
            include: {
                bike: true,
                customer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true,
                        address: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
                admin: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
            },
        });
        if (!assignment) {
            throw new common_1.NotFoundException('Active bike assignment not found');
        }
        if (assignment.customerId !== data.customerId) {
            throw new common_1.BadRequestException('This bike is not assigned to the specified customer');
        }
        const updatedAssignment = await this.prisma.bikeAssignment.update({
            where: { id: assignment.id },
            data: { returnedAt: new Date() },
            include: {
                bike: true,
                customer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true,
                        address: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
                admin: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
            },
        });
        await this.prisma.bike.update({
            where: { id: data.bikeId },
            data: { status: 'AVAILABLE' },
        });
        return updatedAssignment;
    }
    async getBikeAssignments(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [assignments, total] = await Promise.all([
            this.prisma.bikeAssignment.findMany({
                skip,
                take: limit,
                orderBy: { assignedAt: 'desc' },
                include: {
                    bike: true,
                    customer: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                            phone: true,
                            address: true,
                            createdAt: true,
                            updatedAt: true,
                        },
                    },
                    admin: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                            createdAt: true,
                            updatedAt: true,
                        },
                    },
                },
            }),
            this.prisma.bikeAssignment.count(),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            items: assignments,
            total,
            page,
            limit,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
        };
    }
    async getActiveAssignments(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [assignments, total] = await Promise.all([
            this.prisma.bikeAssignment.findMany({
                where: { returnedAt: undefined },
                skip,
                take: limit,
                orderBy: { assignedAt: 'desc' },
                include: {
                    bike: true,
                    customer: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                            phone: true,
                            address: true,
                            createdAt: true,
                            updatedAt: true,
                        },
                    },
                    admin: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                            createdAt: true,
                            updatedAt: true,
                        },
                    },
                },
            }),
            this.prisma.bikeAssignment.count({
                where: { returnedAt: undefined },
            }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            items: assignments,
            total,
            page,
            limit,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
        };
    }
};
exports.BikesService = BikesService;
exports.BikesService = BikesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BikesService);
//# sourceMappingURL=bikes.service.js.map
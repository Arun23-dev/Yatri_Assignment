import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateBikeDto,
  UpdateBikeStatusDto,
  AssignBikeDto,
  ReturnBikeDto,
} from './dto/bike.dto';
import {
  BikeResponseDto,
  BikeAssignmentResponseDto,
} from '../common/dto/response.dto';

@Injectable()
export class BikesService {
  constructor(private prisma: PrismaService) {}

  // ----------------------------
  // CREATE BIKE (Admin Only)
  // ----------------------------
  async createBike(data: CreateBikeDto): Promise<BikeResponseDto> {
    // Check if bike with this serial number already exists
    const existingBike = await this.prisma.bike.findUnique({
      where: { serialNumber: data.serialNumber },
    });

    if (existingBike) {
      throw new BadRequestException(
        'Bike with this serial number already exists',
      );
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

  // ----------------------------
  // GET ALL BIKES (Admin Only)
  // ----------------------------
  async getAllBikes(page: number = 1, limit: number = 10) {
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

  // ----------------------------
  // SEARCH BIKES (Admin Only)
  // ----------------------------
  async searchBikes(query: string, status?: string, page: number = 1, limit: number = 10) {
    try {
      const skip = (page - 1) * limit;

      // Build search conditions
      const whereConditions: any = {};

      // Add search query conditions
      if (query && query.trim() !== '') {
        whereConditions.OR = [
          { model: { contains: query } },
          { brand: { contains: query } },
          { serialNumber: { contains: query } },
        ];
      }

      // Add status filter
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
    } catch (error) {
      console.error('Search bikes error:', error);
      throw error;
    }
  }

  // ----------------------------
  // GET AVAILABLE BIKES (Admin Only)
  // ----------------------------
  async getAvailableBikes(page: number = 1, limit: number = 10) {
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

  // ----------------------------
  // GET BIKE BY ID (Admin Only)
  // ----------------------------
  async getBikeById(id: string): Promise<BikeResponseDto> {
    const bike = await this.prisma.bike.findUnique({
      where: { id },
    });

    if (!bike) {
      throw new NotFoundException('Bike not found');
    }

    return bike;
  }

  // ----------------------------
  // UPDATE BIKE STATUS (Admin Only)
  // ----------------------------
  async updateBikeStatus(
    id: string,
    data: UpdateBikeStatusDto,
  ): Promise<BikeResponseDto> {
    const bike = await this.prisma.bike.findUnique({
      where: { id },
    });

    if (!bike) {
      throw new NotFoundException('Bike not found');
    }

    const updatedBike = await this.prisma.bike.update({
      where: { id },
      data: { status: data.status },
    });

    return updatedBike;
  }

  // ----------------------------
  // ASSIGN BIKE TO CUSTOMER (Admin Only)
  // ----------------------------
  async assignBike(
    data: AssignBikeDto,
    adminId: string,
  ): Promise<BikeAssignmentResponseDto> {
    // Check if bike exists and is available
    const bike = await this.prisma.bike.findUnique({
      where: { id: data.bikeId },
    });

    if (!bike) {
      throw new NotFoundException('Bike not found');
    }

    if (bike.status !== 'AVAILABLE') {
      throw new BadRequestException('Bike is not available for assignment');
    }

    // Check if customer exists
    const customer = await this.prisma.customer.findUnique({
      where: { id: data.customerId },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    // Check if customer already has an active assignment
    const activeAssignment = await this.prisma.bikeAssignment.findFirst({
      where: {
        customerId: data.customerId,
        returnedAt: undefined, // Use undefined instead of null for MongoDB
      },
    });

    if (activeAssignment) {
      throw new BadRequestException(
        'Customer already has an active bike assignment',
      );
    }

    // Create assignment
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

    // Update bike status
    await this.prisma.bike.update({
      where: { id: data.bikeId },
      data: { status: 'ASSIGNED' },
    });

    return assignment;
  }

  // ----------------------------
  // RETURN BIKE (Admin Only)
  // ----------------------------
  async returnBike(data: ReturnBikeDto): Promise<BikeAssignmentResponseDto> {
    // First check if the bike exists and is currently assigned
    const bike = await this.prisma.bike.findUnique({
      where: { id: data.bikeId },
    });

    if (!bike) {
      throw new NotFoundException('Bike not found');
    }

    if (bike.status !== 'ASSIGNED') {
      throw new BadRequestException('Bike is not currently assigned');
    }

    // Find the active assignment for this bike
    const assignment = await this.prisma.bikeAssignment.findFirst({
      where: {
        bikeId: data.bikeId,
        returnedAt: undefined, // Use undefined instead of null for MongoDB
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
      throw new NotFoundException('Active bike assignment not found');
    }

    // Validate that the customer returning the bike is the one who has it
    if (assignment.customerId !== data.customerId) {
      throw new BadRequestException('This bike is not assigned to the specified customer');
    }

    // Update assignment with return time
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

    // Update bike status back to available
    await this.prisma.bike.update({
      where: { id: data.bikeId },
      data: { status: 'AVAILABLE' },
    });

    return updatedAssignment;
  }

  // ----------------------------
  // GET BIKE ASSIGNMENTS
  // ----------------------------
  async getBikeAssignments(page: number = 1, limit: number = 10) {
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

  // ----------------------------
  // GET ACTIVE ASSIGNMENTS
  // ----------------------------
  async getActiveAssignments(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [assignments, total] = await Promise.all([
      this.prisma.bikeAssignment.findMany({
        where: { returnedAt: undefined }, // Use undefined instead of null for MongoDB
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
        where: { returnedAt: undefined }, // Use undefined instead of null for MongoDB
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
}

import { Injectable, NotFoundException, ConflictException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
import { CustomerResponseDto, DeleteCustomerResponseDto } from '../common/dto/response.dto';
import { WalletGrpcService } from '../common/grpc/wallet-grpc.service';
import * as bcrypt from 'bcrypt';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CustomersService {
  private readonly logger = new Logger(CustomersService.name);

  constructor(
    private prisma: PrismaService,
    private walletGrpcService: WalletGrpcService,
  ) {}

  // ----------------------------
  // CREATE CUSTOMER (Admin Only)
  // ----------------------------
  async createCustomer(data: CreateCustomerDto): Promise<CustomerResponseDto> {
    // Check if customer already exists
    const existingCustomer = await this.prisma.customer.findUnique({
      where: { email: data.email },
    });

    if (existingCustomer) {
      throw new ConflictException('Customer with this email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password, 5);

    // Create customer in database
    const customer = await this.prisma.customer.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword, // Use hashed password
        phone: data.phone,
        address: data.address,
      },
    });

    // Automatically create wallet for the customer via gRPC
    try {
      this.logger.log(`Creating wallet for customer: ${customer.email}`);
      
      const walletResponse = await firstValueFrom(
        this.walletGrpcService.createWallet({
          userId: customer.id,
          customerName: `${customer.firstName} ${customer.lastName}`,
          customerEmail: customer.email,
        })
      );

      if (walletResponse.success) {
        this.logger.log(`Wallet created successfully for customer: ${customer.email}, Wallet ID: ${walletResponse.walletId}`);
      } else {
        this.logger.error(`Failed to create wallet for customer: ${customer.email}, Error: ${walletResponse.message}`);
      }
    } catch (error) {
      this.logger.error(`Error creating wallet for customer ${customer.email}:`, error);
      // Don't throw error here - customer creation should succeed even if wallet creation fails
      // The wallet can be created later manually if needed
    }

    // Return customer without password
    const { password, ...customerWithoutPassword } = customer;
    return customerWithoutPassword;
  }

  // ----------------------------
  // GET ALL CUSTOMERS (Admin Only)
  // ----------------------------
  async getAllCustomers(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [customers, total] = await Promise.all([
      this.prisma.customer.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
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
      }),
      this.prisma.customer.count(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      items: customers,
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };
  }

  // ----------------------------
  // GET CUSTOMER BY ID (Admin Only)
  // ----------------------------
  async getCustomerById(id: string): Promise<CustomerResponseDto> {
    // Clean the ID - remove any curly braces or extra characters
    const cleanId = id.replace(/[{}]/g, '');
    
    // Validate ObjectId format
    if (!/^[0-9a-fA-F]{24}$/.test(cleanId)) {
      throw new BadRequestException('Invalid customer ID format');
    }

    const customer = await this.prisma.customer.findUnique({
      where: { id: cleanId },
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
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return customer;
  }

  // ----------------------------
  // UPDATE CUSTOMER (Admin Only)
  // ----------------------------
  async updateCustomer(id: string, data: UpdateCustomerDto): Promise<CustomerResponseDto> {
    // Clean the ID - remove any curly braces or extra characters
    const cleanId = id.replace(/[{}]/g, '');
    
    // Validate ObjectId format
    if (!/^[0-9a-fA-F]{24}$/.test(cleanId)) {
      throw new BadRequestException('Invalid customer ID format');
    }

    // Check if customer exists
    const existingCustomer = await this.prisma.customer.findUnique({
      where: { id: cleanId },
    });

    if (!existingCustomer) {
      throw new NotFoundException('Customer not found');
    }

    // Check if email is being updated and if it conflicts
    if (data.email && data.email !== existingCustomer.email) {
      const emailConflict = await this.prisma.customer.findUnique({
        where: { email: data.email },
      });

      if (emailConflict) {
        throw new ConflictException('Customer with this email already exists');
      }
    }

    const customer = await this.prisma.customer.update({
      where: { id: cleanId },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
      },
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
    });

    return customer;
  }

  // ----------------------------
  // DELETE CUSTOMER (Admin Only)
  // ----------------------------
  async deleteCustomer(id: string): Promise<DeleteCustomerResponseDto> {
    // Clean the ID - remove any curly braces or extra characters
    const cleanId = id.replace(/[{}]/g, '');
    
    // Validate ObjectId format
    if (!/^[0-9a-fA-F]{24}$/.test(cleanId)) {
      throw new BadRequestException('Invalid customer ID format');
    }

    // Check if customer exists
    const existingCustomer = await this.prisma.customer.findUnique({
      where: { id: cleanId },
    });

    if (!existingCustomer) {
      throw new NotFoundException('Customer not found');
    }

    // Check if customer has active bike assignments
    const activeAssignments = await this.prisma.bikeAssignment.findFirst({
      where: {
        customerId: cleanId,
        returnedAt: undefined, // Use undefined instead of null for MongoDB
      },
    });

    if (activeAssignments) {
      throw new ConflictException('Cannot delete customer with active bike assignments');
    }

    // Store customer info for response
    const customerInfo = {
      id: existingCustomer.id,
      email: existingCustomer.email,
      name: `${existingCustomer.firstName} ${existingCustomer.lastName}`,
    };

    // Check wallet balance before attempting deletion
    let walletBalance = 0;
    let walletMessage = '';

    try {
      this.logger.log(`Checking wallet balance for customer: ${existingCustomer.email}`);
      
      const walletResponse = await firstValueFrom(
        this.walletGrpcService.getWallet({
          userId: cleanId,
        })
      );

      if (walletResponse.success) {
        walletBalance = walletResponse.balance;
        this.logger.log(`Wallet balance for customer ${existingCustomer.email}: $${walletBalance}`);
      } else {
        this.logger.warn(`Failed to retrieve wallet for customer: ${existingCustomer.email}, Error: ${walletResponse.message}`);
        walletMessage = walletResponse.message;
      }
    } catch (error) {
      this.logger.error(`Error checking wallet balance for customer ${existingCustomer.email}:`, error);
      throw new BadRequestException('Unable to verify wallet balance. Please try again.');
    }

    // Check if wallet balance is zero
    if (walletBalance > 0) {
      throw new BadRequestException(`Customer cannot be deleted because wallet balance is not zero. Current balance: $${walletBalance.toFixed(2)}`);
    }

    // If balance is zero, proceed with deletion
    let walletDeleted = false;
    let finalWalletMessage = 'Wallet not found or already deleted';

    try {
      this.logger.log(`Attempting to delete wallet for customer: ${existingCustomer.email}`);
      
      const deleteWalletResponse = await firstValueFrom(
        this.walletGrpcService.deleteWallet({
          userId: cleanId,
        })
      );

      if (deleteWalletResponse.success) {
        walletDeleted = true;
        finalWalletMessage = deleteWalletResponse.message;
        this.logger.log(`Wallet deleted successfully for customer: ${existingCustomer.email}`);
      } else {
        finalWalletMessage = deleteWalletResponse.message;
        this.logger.warn(`Failed to delete wallet for customer: ${existingCustomer.email}, Error: ${deleteWalletResponse.message}`);
      }
    } catch (error) {
      this.logger.error(`Error deleting wallet for customer ${existingCustomer.email}:`, error);
      finalWalletMessage = 'Error deleting wallet - wallet may still exist';
    }

    // Delete customer from database
    await this.prisma.customer.delete({
      where: { id: cleanId },
    });

    this.logger.log(`Customer deleted successfully: ${existingCustomer.email}`);

    // Return detailed response
    return {
      message: 'Customer and wallet deleted successfully',
      customerId: customerInfo.id,
      customerEmail: customerInfo.email,
      customerName: customerInfo.name,
      walletDeleted,
      walletBalance,
      walletMessage: finalWalletMessage,
    };
  }

  // ----------------------------
  // SEARCH CUSTOMERS (Admin Only)
  // ----------------------------
  async searchCustomers(query: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [customers, total] = await Promise.all([
      this.prisma.customer.findMany({
        where: {
          OR: [
            { firstName: { contains: query, mode: 'insensitive' } },
            { lastName: { contains: query, mode: 'insensitive' } },
            { email: { contains: query, mode: 'insensitive' } },
          ],
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
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
      }),
      this.prisma.customer.count({
        where: {
          OR: [
            { firstName: { contains: query, mode: 'insensitive' } },
            { lastName: { contains: query, mode: 'insensitive' } },
            { email: { contains: query, mode: 'insensitive' } },
          ],
        },
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      items: customers,
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };
  }

  // ----------------------------
  // GET CUSTOMER WALLET INFO (Admin Only)
  // ----------------------------
  async getCustomerWallet(customerId: string) {
    // Clean the ID - remove any curly braces or extra characters
    const cleanId = customerId.replace(/[{}]/g, '');
    
    // Validate ObjectId format
    if (!/^[0-9a-fA-F]{24}$/.test(cleanId)) {
      throw new BadRequestException('Invalid customer ID format');
    }

    try {
      this.logger.log(`Fetching wallet for customer: ${cleanId}`);
      
      const walletResponse = await firstValueFrom(
        this.walletGrpcService.getWallet({
          userId: cleanId,
        })
      );

      if (walletResponse.success) {
        this.logger.log(`Wallet retrieved successfully for customer: ${cleanId}`);
        return walletResponse;
      } else {
        this.logger.error(`Failed to retrieve wallet for customer: ${cleanId}, Error: ${walletResponse.message}`);
        return walletResponse;
      }
    } catch (error) {
      this.logger.error(`Error retrieving wallet for customer ${cleanId}:`, error);
      return {
        success: false,
        walletId: '',
        balance: 0,
        userId: '',
        customerName: '',
        message: 'Failed to retrieve wallet due to gRPC error'
      };
    }
  }
}

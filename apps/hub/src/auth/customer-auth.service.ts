import { Injectable, UnauthorizedException, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateCustomerDto } from '../customers/dto/customer.dto';

@Injectable()
export class CustomerAuthService {
  private blockedTokens = new Set<string>();

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // ----------------------------
  // CUSTOMER REGISTRATION
  // ----------------------------
  async registerCustomer(data: CreateCustomerDto) {
    // Check if customer already exists
    const existingCustomer = await this.prisma.customer.findUnique({
      where: { email: data.email },
    });

    if (existingCustomer) {
      throw new UnauthorizedException('Customer with this email already exists');
    }

    const hashed = await bcrypt.hash(data.password, 5);

    const customer = await this.prisma.customer.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashed,
        phone: data.phone,
        address: data.address,
      },
    });

    return customer;
  }

  // ----------------------------
  // CUSTOMER LOGIN
  // ----------------------------
  async loginCustomer(email: string, password: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { email },
    });

    if (!customer) throw new UnauthorizedException('Invalid customer credentials');

    const match = await bcrypt.compare(password, customer.password);
    if (!match) throw new UnauthorizedException('Invalid customer credentials');

    const token = this.jwtService.sign({ 
      sub: customer.id, 
      type: 'customer',
      email: customer.email 
    });

    return { token, customer };
  }

  // ----------------------------
  // LOGOUT WITH CREDENTIALS
  // ----------------------------
  async logoutWithCredentials(email: string, password: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { email },
    });

    if (!customer) {
      throw new UnauthorizedException('Invalid customer credentials');
    }

    const match = await bcrypt.compare(password, customer.password);
    if (!match) {
      throw new UnauthorizedException('Invalid customer credentials');
    }

    // Logout successful - credentials are valid
    // In a real application, you might want to:
    // 1. Add the customer's ID to a logout list
    // 2. Invalidate all tokens for this customer
    // 3. Log the logout event
    
    return { message: 'Customer logged out successfully' };
  }

  // ----------------------------
  // LOGOUT (Token-based - kept for backward compatibility)
  // ----------------------------
  async logout(token: string) {
    // Add token to blocked tokens set
    this.blockedTokens.add(token);
    
    // Clean up old blocked tokens periodically (simple cleanup)
    if (this.blockedTokens.size > 1000) {
      this.blockedTokens.clear();
    }
  }

  // ----------------------------
  // VALIDATE TOKEN
  // ----------------------------
  async validateToken(token: string) {
    // Check if token is blocked
    if (this.blockedTokens.has(token)) {
      throw new UnauthorizedException('Token blocked');
    }

    try {
      const payload = this.jwtService.verify<{ 
        sub: string; 
        type: string;
        email: string;
      }>(token);

      // Verify it's a customer token
      if (payload.type !== 'customer') {
        throw new UnauthorizedException('Invalid token type');
      }

      return payload;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  // ----------------------------
  // GET CUSTOMER BY ID
  // ----------------------------
  async getCustomerById(id: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
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
  // UPDATE CUSTOMER
  // ----------------------------
  async updateCustomer(customerId: string, data: any) {
    // Check if customer exists
    const existingCustomer = await this.prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!existingCustomer) {
      throw new NotFoundException('Customer not found');
    }

    // Check if email is being changed and if it already exists
    if (data.email && data.email !== existingCustomer.email) {
      const emailExists = await this.prisma.customer.findUnique({
        where: { email: data.email },
      });

      if (emailExists) {
        throw new ConflictException('Email already exists');
      }
    }

    const updatedCustomer = await this.prisma.customer.update({
      where: { id: customerId },
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

    return updatedCustomer;
  }

  // ----------------------------
  // CHANGE PASSWORD
  // ----------------------------
  async changePassword(customerId: string, currentPassword: string, newPassword: string) {
    // Get customer with password
    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    // Verify current password
    const match = await bcrypt.compare(currentPassword, customer.password);
    if (!match) {
      throw new BadRequestException('Current password is incorrect');
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await this.prisma.customer.update({
      where: { id: customerId },
      data: { password: hashedNewPassword },
    });

    return { message: 'Password changed successfully' };
  }
}

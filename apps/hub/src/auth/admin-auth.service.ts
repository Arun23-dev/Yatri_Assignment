import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateAdminDto } from '../customers/dto/customer.dto';
import { CreateCustomerDto } from '../customers/dto/customer.dto';

@Injectable()
export class AdminAuthService {
  private blockedTokens = new Set<string>();

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // ----------------------------
  // ADMIN REGISTRATION
  // ----------------------------
  async registerAdmin(data: CreateAdminDto) {
    // Check if admin already exists
    const existingAdmin = await this.prisma.admin.findUnique({
      where: { email: data.email },
    });

    if (existingAdmin) {
      throw new UnauthorizedException('Admin with this email already exists');
    }

    const hashed = await bcrypt.hash(data.password, 5);

    const admin = await this.prisma.admin.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashed,
      },
    });

    return admin;
  }

  // ----------------------------
  // FIRST ADMIN REGISTRATION (Public)
  // ----------------------------
  async registerFirstAdmin(data: CreateAdminDto) {
    // Check if any admin exists in the system
    const adminCount = await this.prisma.admin.count();

    if (adminCount > 0) {
      throw new UnauthorizedException(
        'Admin already exists in the system. Use regular admin registration.',
      );
    }

    // Check if admin with this email already exists
    const existingAdmin = await this.prisma.admin.findUnique({
      where: { email: data.email },
    });

    if (existingAdmin) {
      throw new UnauthorizedException('Admin with this email already exists');
    }

    const hashed = await bcrypt.hash(data.password, 5);

    const admin = await this.prisma.admin.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashed,
      },
    });

    return admin;
  }

  // ----------------------------
  // ADMIN LOGIN
  // ----------------------------
  async loginAdmin(email: string, password: string) {
    const admin = await this.prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) throw new UnauthorizedException('Invalid admin credentials');

    const match = await bcrypt.compare(password, admin.password);
    if (!match) throw new UnauthorizedException('Invalid admin credentials');

    const token = this.jwtService.sign({
      sub: admin.id,
      type: 'admin',
      email: admin.email,
    });

    return { token, admin };
  }

  // ----------------------------
  // LOGOUT WITH CREDENTIALS
  // ----------------------------
  async logoutWithCredentials(email: string, password: string) {
    const admin = await this.prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      throw new UnauthorizedException('Invalid admin credentials');
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      throw new UnauthorizedException('Invalid admin credentials');
    }

    // Logout successful - credentials are valid
    // In a real application, you might want to:
    // 1. Add the admin's ID to a logout list
    // 2. Invalidate all tokens for this admin
    // 3. Log the logout event
    
    return { message: 'Admin logged out successfully' };
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
  validateToken(token: string) {
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

      // Verify it's an admin token
      if (payload.type !== 'admin') {
        throw new UnauthorizedException('Invalid token type');
      }

      return payload;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  // ----------------------------
  // GET ADMIN BY ID
  // ----------------------------
  async getAdminById(id: string) {
    return this.prisma.admin.findUnique({
      where: { id },
    });
  }
}

import { Controller, Post, Body, HttpCode, HttpStatus, Res, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import type { Response, Request } from 'express';
import { AdminAuthService } from './admin-auth.service';
import { CustomerAuthService } from './customer-auth.service';
import { CreateAdminDto, CreateCustomerDto } from '../customers/dto/customer.dto';
import { LoginAdminDto, LoginCustomerDto, LogoutDto } from './dto/auth.dto';
import { 
  AdminResponseDto, 
  CustomerResponseDto, 
  AdminAuthResponseDto, 
  CustomerAuthResponseDto, 
  ApiResponseDto 
} from '../common/dto/response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private adminAuthService: AdminAuthService,
    private customerAuthService: CustomerAuthService,
  ) {}

  @Post('admin/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Register a new admin',
    description: 'Creates a new admin account. Only existing admins should be able to create new admins.'
  })
  @ApiCreatedResponse({
    description: 'Admin registered successfully',
    type: ApiResponseDto<AdminResponseDto>,
    schema: {
      example: {
        message: 'Admin registered successfully',
        data: {
          id: '507f1f77bcf86cd799439011',
          firstName: 'John',
          lastName: 'Admin',
          email: 'admin@yatritask.com',
          createdAt: '2024-01-09T16:30:00.000Z',
          updatedAt: '2024-01-09T16:30:00.000Z'
        },
        statusCode: 201,
        timestamp: '2024-01-09T16:30:00.000Z'
      }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request - Invalid input data'
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Conflict - Admin with this email already exists'
  })
  async registerAdmin(@Body() body: CreateAdminDto): Promise<ApiResponseDto<AdminResponseDto>> {
    const admin = await this.adminAuthService.registerAdmin(body);
    return {
      message: 'Admin registered successfully',
      data: admin,
      statusCode: HttpStatus.CREATED,
      timestamp: new Date()
    };
  }

  @Post('admin/register/first')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Register the first admin (Public)',
    description: 'Creates the first admin account. This endpoint is only available when no admins exist in the system.'
  })
  @ApiCreatedResponse({
    description: 'First admin registered successfully',
    type: ApiResponseDto<AdminResponseDto>
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request - Invalid input data'
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Conflict - Admin already exists in the system'
  })
  async registerFirstAdmin(@Body() body: CreateAdminDto): Promise<ApiResponseDto<AdminResponseDto>> {
    const admin = await this.adminAuthService.registerFirstAdmin(body);
    return {
      message: 'First admin registered successfully',
      data: admin,
      statusCode: HttpStatus.CREATED,
      timestamp: new Date()
    };
  }

  @Post('admin/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Login as an admin',
    description: 'Authenticates an admin with email and password, sets authentication cookie and returns JWT token.'
  })
  @ApiOkResponse({
    description: 'Admin login successful',
    type: AdminAuthResponseDto,
    schema: {
      example: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        admin: {
          id: '507f1f77bcf86cd799439011',
          firstName: 'John',
          lastName: 'Admin',
          email: 'admin@yatritask.com',
          createdAt: '2024-01-09T16:30:00.000Z',
          updatedAt: '2024-01-09T16:30:00.000Z'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Invalid admin credentials'
  })
  async loginAdmin(@Body() body: LoginAdminDto, @Res({ passthrough: true }) res: Response): Promise<AdminAuthResponseDto> {
    const result = await this.adminAuthService.loginAdmin(body.email, body.password);
    
    
    
    // Set HTTP-only cookie with the token
    res.cookie('admin_token', result.token, {
      httpOnly: true,
      secure: false, // Set to false for development (localhost)
      sameSite: 'lax', // More permissive for development
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      path: '/'
    });

    return result;
  }

  @Post('customer/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Register a new customer',
    description: 'Creates a new customer account. This endpoint is public and allows anyone to register as a customer.'
  })
  @ApiCreatedResponse({
    description: 'Customer registered successfully',
    type: ApiResponseDto<CustomerResponseDto>,
    schema: {
      example: {
        message: 'Customer registered successfully',
        data: {
          id: '507f1f77bcf86cd799439011',
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane.doe@example.com',
          phone: '+1234567890',
          address: '123 Main St, City, State 12345',
          createdAt: '2024-01-09T16:30:00.000Z',
          updatedAt: '2024-01-09T16:30:00.000Z'
        },
        statusCode: 201,
        timestamp: '2024-01-09T16:30:00.000Z'
      }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request - Invalid input data'
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Conflict - Customer with this email already exists'
  })
  async registerCustomer(@Body() body: CreateCustomerDto): Promise<ApiResponseDto<CustomerResponseDto>> {
    const customer = await this.customerAuthService.registerCustomer(body);
    return {
      message: 'Customer registered successfully',
      data: customer,
      statusCode: HttpStatus.CREATED,
      timestamp: new Date()
    };
  }

  @Post('customer/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Login as a customer',
    description: 'Authenticates a customer with email and password, returns JWT token for subsequent API calls.'
  })
  @ApiOkResponse({
    description: 'Customer login successful',
    type: CustomerAuthResponseDto,
    schema: {
      example: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        customer: {
          id: '507f1f77bcf86cd799439011',
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane.doe@example.com',
          phone: '+1234567890',
          address: '123 Main St, City, State 12345',
          createdAt: '2024-01-09T16:30:00.000Z',
          updatedAt: '2024-01-09T16:30:00.000Z'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Invalid customer credentials'
  })
  async loginCustomer(@Body() body: LoginCustomerDto, @Res({ passthrough: true }) res: Response): Promise<CustomerAuthResponseDto> {
    const result = await this.customerAuthService.loginCustomer(body.email, body.password);
    
    // Set HTTP-only cookie with the token
    res.cookie('customer_token', result.token, {
      httpOnly: true,
      secure: false, // Set to false for development (localhost)
      sameSite: 'lax', // More permissive for development
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      path: '/'
    });
    
    return result;
  }

  @Post('customer/logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Logout as a customer',
    description: 'Logs out a customer by validating their credentials and invalidating any active sessions.'
  })
  @ApiOkResponse({
    description: 'Customer logged out successfully',
    type: ApiResponseDto<void>
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request - Invalid credentials'
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Invalid email or password'
  })
  async logoutCustomer(@Body() body: LogoutDto, @Res({ passthrough: true }) res: Response): Promise<ApiResponseDto<void>> {
    await this.customerAuthService.logoutWithCredentials(body.email, body.password);
    
    // Clear customer authentication cookie
    res.clearCookie('customer_token', { path: '/' });
    
    return {
      message: 'Customer logged out successfully',
      statusCode: HttpStatus.OK,
      timestamp: new Date()
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Logout (both admin and customer)',
    description: 'Logs out the user by validating their credentials and invalidating any active sessions. Works for both admin and customer accounts.'
  })
  @ApiOkResponse({
    description: 'Logged out successfully',
    type: ApiResponseDto<void>
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request - Invalid credentials'
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Invalid email or password'
  })
  async logout(@Body() body: LogoutDto, @Res({ passthrough: true }) res: Response): Promise<ApiResponseDto<void>> {
    // Try to logout from both services (one will succeed based on user type)
    try {
      // First try admin logout
      await this.adminAuthService.logoutWithCredentials(body.email, body.password);
    } catch (error) {
      // If admin logout fails, try customer logout
      await this.customerAuthService.logoutWithCredentials(body.email, body.password);
    }
    
    // Clear authentication cookies
    res.clearCookie('admin_token', { path: '/' });
    res.clearCookie('customer_token', { path: '/' });
    
    return {
      message: 'Logged out successfully',
      statusCode: HttpStatus.OK,
      timestamp: new Date()
    };
  }
}

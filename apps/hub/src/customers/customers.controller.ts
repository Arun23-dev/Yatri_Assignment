import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Patch,
  Delete, 
  Body, 
  Param, 
  Query, 
  UseGuards,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiCreatedResponse, 
  ApiOkResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiParam
} from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
import { 
  CustomerResponseDto, 
  ApiResponseDto, 
  PaginatedResponseDto,
  DeleteCustomerResponseDto
} from '../common/dto/response.dto';
import { AdminAuthGuard } from '../auth/guards/admin-auth.guard';

@ApiTags('customers')
@Controller('customers')
@UseGuards(AdminAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Create a new customer (Admin only)',
    description: 'Creates a new customer account. Only admins can create customers.'
  })
  @ApiCreatedResponse({
    description: 'Customer created successfully',
    type: ApiResponseDto<CustomerResponseDto>,
    schema: {
      example: {
        message: 'Customer created successfully',
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
    status: 401, 
    description: 'Unauthorized - Admin token required'
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Conflict - Customer with this email already exists'
  })
  async createCustomer(@Body() body: CreateCustomerDto): Promise<ApiResponseDto<CustomerResponseDto>> {
    const customer = await this.customersService.createCustomer(body);
    return {
      message: 'Customer created successfully',
      data: customer,
      statusCode: HttpStatus.CREATED,
      timestamp: new Date()
    };
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all customers (Admin only)',
    description: 'Retrieves a paginated list of all customers. Only admins can access this endpoint.'
  })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 5)' })
  @ApiOkResponse({
    description: 'Customers retrieved successfully',
    type: PaginatedResponseDto<CustomerResponseDto>
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Admin token required'
  })
  async getAllCustomers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5
  ) {
    return this.customersService.getAllCustomers(page, limit);
  }

  @Get('search')
  @ApiOperation({ 
    summary: 'Search customers (Admin only)',
    description: 'Search customers by name or email. Only admins can access this endpoint.'
  })
  @ApiQuery({ name: 'q', required: true, type: String, description: 'Search query' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 5)' })
  @ApiOkResponse({
    description: 'Search results retrieved successfully',
    type: PaginatedResponseDto<CustomerResponseDto>
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Admin token required'
  })
  async searchCustomers(
    @Query('q') query: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5
  ) {
    return this.customersService.searchCustomers(query, page, limit);
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get customer by ID (Admin only)',
    description: 'Retrieves a specific customer by their ID. Only admins can access this endpoint.'
  })
  @ApiOkResponse({
    description: 'Customer retrieved successfully',
    type: CustomerResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Admin token required'
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Not found - Customer not found'
  })
  async getCustomerById(@Param('id') id: string): Promise<CustomerResponseDto> {
    return this.customersService.getCustomerById(id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Update customer (Admin only)',
    description: 'Partially updates a customer\'s information. Only admins can update customers. Only send the fields you want to update.'
  })
  @ApiOkResponse({
    description: 'Customer updated successfully',
    type: CustomerResponseDto
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request - Invalid input data'
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Admin token required'
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Not found - Customer not found'
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Conflict - Email already exists'
  })
  async updateCustomer(
    @Param('id') id: string,
    @Body() body: UpdateCustomerDto
  ): Promise<CustomerResponseDto> {
    return this.customersService.updateCustomer(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Delete customer (Admin only)',
    description: 'Deletes a customer and their associated wallet. Cannot delete customers with active bike assignments.'
  })
  @ApiOkResponse({
    description: 'Customer and wallet deleted successfully',
    type: DeleteCustomerResponseDto
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request - Invalid customer ID format'
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Admin token required'
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Not found - Customer not found'
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Conflict - Customer has active bike assignments'
  })
  async deleteCustomer(@Param('id') id: string): Promise<DeleteCustomerResponseDto> {
    return this.customersService.deleteCustomer(id);
  }

  // ----------------------------
  // GET CUSTOMER WALLET INFO (Admin Only)
  // ----------------------------
  @Get(':id/wallet')
  @ApiOperation({ 
    summary: 'Get customer wallet information',
    description: 'Retrieves wallet information for a specific customer via gRPC call to Wallet service.'
  })
  @ApiParam({ name: 'id', description: 'Customer ID', example: '507f1f77bcf86cd799439011' })
  @ApiOkResponse({
    description: 'Customer wallet information retrieved successfully',
    type: ApiResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Customer not found'
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Admin authentication required'
  })
  async getCustomerWallet(@Param('id') id: string) {
    const customer = await this.customersService.getCustomerById(id);
    const walletInfo = await this.customersService.getCustomerWallet(id);
    
    return {
      message: 'Customer wallet information retrieved successfully',
      data: {
        customer,
        wallet: walletInfo
      },
      statusCode: HttpStatus.OK,
      timestamp: new Date()
    };
  }
}

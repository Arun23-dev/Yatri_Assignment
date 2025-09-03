import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { BikesService } from './bikes.service';
import {
  CreateBikeDto,
  UpdateBikeStatusDto,
  AssignBikeDto,
  ReturnBikeDto,
} from './dto/bike.dto';
import {
  BikeResponseDto,
  BikeAssignmentResponseDto,
  ApiResponseDto,
  PaginatedResponseDto,
} from '../common/dto/response.dto';
import { AdminAuthGuard } from '../auth/guards/admin-auth.guard';

@ApiTags('bikes')
@Controller('bikes')
@ApiBearerAuth('JWT-auth')
export class BikesController {
  constructor(private bikesService: BikesService) {}

  @Post()
  @UseGuards(AdminAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new bike (Admin only)',
    description:
      'Creates a new bike with the specified serial number and model. Only admins can create bikes.',
  })
  @ApiCreatedResponse({
    description: 'Bike created successfully',
    type: BikeResponseDto,
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad request - Invalid input data or serial number already exists',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Admin token required',
  })
  async createBike(@Body() body: CreateBikeDto): Promise<BikeResponseDto> {
    return this.bikesService.createBike(body);
  }

  @Get()
  @UseGuards(AdminAuthGuard)
  @ApiOperation({
    summary: 'Get all bikes (Admin only)',
    description: 'Retrieves a paginated list of all bikes in the system. Only admins can access this endpoint.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page (default: 10)',
  })
  @ApiOkResponse({
    description: 'Bikes retrieved successfully',
    type: PaginatedResponseDto<BikeResponseDto>,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Admin token required',
  })
  async getAllBikes(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.bikesService.getAllBikes(page, limit);
  }

  @Get('search')
  @UseGuards(AdminAuthGuard)
  @ApiOperation({
    summary: 'Search bikes (Admin only)',
    description: 'Search bikes by model, serial number, or status. Only admins can access this endpoint.',
  })
  @ApiQuery({
    name: 'q',
    required: false,
    type: String,
    description: 'Search query (bike model or serial number)',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: ['AVAILABLE', 'ASSIGNED', 'MAINTENANCE', 'RETIRED'],
    description: 'Filter by bike status',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page (default: 10)',
  })
  @ApiOkResponse({
    description: 'Bikes search results',
    type: PaginatedResponseDto<BikeResponseDto>,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Admin token required',
  })
  async searchBikes(
    @Query('q') query?: string,
    @Query('status') status?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.bikesService.searchBikes(query || '', status, page, limit);
  }

  @Get('available')
  @UseGuards(AdminAuthGuard)
  @ApiOperation({
    summary: 'Get available bikes (Admin only)',
    description: 'Retrieves a paginated list of all available bikes. Only admins can access this endpoint.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page (default: 10)',
  })
  @ApiOkResponse({
    description: 'Available bikes retrieved successfully',
    type: PaginatedResponseDto<BikeResponseDto>,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Admin token required',
  })
  async getAvailableBikes(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.bikesService.getAvailableBikes(page, limit);
  }

  @Get('assignments')
  @UseGuards(AdminAuthGuard)
  @ApiOperation({
    summary: 'Get all bike assignments (Admin only)',
    description:
      'Retrieves a paginated list of all bike assignments. Only admins can access this endpoint.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page (default: 10)',
  })
  @ApiOkResponse({
    description: 'Bike assignments retrieved successfully',
    type: PaginatedResponseDto<BikeAssignmentResponseDto>,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Admin token required',
  })
  async getBikeAssignments(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.bikesService.getBikeAssignments(page, limit);
  }

  @Get('assignments/active')
  @UseGuards(AdminAuthGuard)
  @ApiOperation({
    summary: 'Get active bike assignments (Admin only)',
    description:
      'Retrieves a paginated list of all active bike assignments (not returned). Only admins can access this endpoint.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page (default: 10)',
  })
  @ApiOkResponse({
    description: 'Active bike assignments retrieved successfully',
    type: PaginatedResponseDto<BikeAssignmentResponseDto>,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Admin token required',
  })
  async getActiveAssignments(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.bikesService.getActiveAssignments(page, limit);
  }

  @Get(':id')
  @UseGuards(AdminAuthGuard)
  @ApiOperation({
    summary: 'Get bike by ID (Admin only)',
    description: 'Retrieves a specific bike by its ID. Only admins can access this endpoint.',
  })
  @ApiOkResponse({
    description: 'Bike retrieved successfully',
    type: BikeResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Admin token required',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found - Bike not found',
  })
  async getBikeById(@Param('id') id: string): Promise<BikeResponseDto> {
    return this.bikesService.getBikeById(id);
  }

  @Put(':id/status')
  @UseGuards(AdminAuthGuard)
  @ApiOperation({
    summary: 'Update bike status (Admin only)',
    description:
      'Updates the status of a bike. Only admins can update bike status.',
  })
  @ApiOkResponse({
    description: 'Bike status updated successfully',
    type: BikeResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid status',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Admin token required',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found - Bike not found',
  })
  async updateBikeStatus(
    @Param('id') id: string,
    @Body() body: UpdateBikeStatusDto,
  ): Promise<BikeResponseDto> {
    return this.bikesService.updateBikeStatus(id, body);
  }

  @Post('assign')
  @UseGuards(AdminAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Assign bike to customer (Admin only)',
    description: 'Assigns a bike to a customer. Only admins can assign bikes.',
  })
  @ApiCreatedResponse({
    description: 'Bike assigned successfully',
    type: BikeAssignmentResponseDto,
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad request - Bike not available or customer has active assignment',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Admin token required',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found - Bike or customer not found',
  })
  async assignBike(
    @Body() body: AssignBikeDto,
    @Request() req: any,
  ): Promise<BikeAssignmentResponseDto> {
    return this.bikesService.assignBike(body, req.admin.sub);
  }

  @Post('return')
  @UseGuards(AdminAuthGuard)
  @ApiOperation({
    summary: 'Return bike from customer (Admin only)',
    description:
      'Returns a bike from a customer. Only admins can return bikes.',
  })
  @ApiOkResponse({
    description: 'Bike returned successfully',
    type: BikeAssignmentResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid return data',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Admin token required',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found - Active assignment not found',
  })
  async returnBike(
    @Body() body: ReturnBikeDto,
  ): Promise<BikeAssignmentResponseDto> {
    return this.bikesService.returnBike(body);
  }
}

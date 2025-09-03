import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ChargingSessionsService } from './charging-sessions.service';
import { AdminAuthGuard } from '../auth/guards/admin-auth.guard';
import { CustomerAuthGuard } from '../auth/guards/customer-auth.guard';
import {
  StartChargingSessionDto,
  EndChargingSessionDto,
  SearchChargingSessionsDto,
  ChargingSessionResponseDto,
  PaginatedResponseDto,
} from './dto/charging-session.dto';

@ApiTags('Charging Sessions')
@Controller('charging-sessions')
export class ChargingSessionsController {
  constructor(private readonly chargingSessionsService: ChargingSessionsService) {}

  // ----------------------------
  // ADMIN ENDPOINTS
  // ----------------------------

  @Get()
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ 
    summary: 'Get all charging sessions (Admin)',
    description: 'Get all charging sessions with pagination. Only admins can access this endpoint.'
  })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' })
  @ApiOkResponse({
    description: 'All charging sessions retrieved successfully',
    type: PaginatedResponseDto<ChargingSessionResponseDto>
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Admin token required'
  })
  async getAllSessions(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    return this.chargingSessionsService.findAll(page, limit);
  }

  @Get('search')
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ 
    summary: 'Search charging sessions (Admin)',
    description: 'Search charging sessions with advanced filters. Only admins can access this endpoint.'
  })
  @ApiQuery({ name: 'q', required: false, type: String, description: 'Search query' })
  @ApiQuery({ name: 'status', required: false, type: String, description: 'Filter by status' })
  @ApiQuery({ name: 'customerId', required: false, type: String, description: 'Filter by customer ID' })
  @ApiQuery({ name: 'bikeId', required: false, type: String, description: 'Filter by bike ID' })
  @ApiQuery({ name: 'startDate', required: false, type: String, description: 'Start date filter' })
  @ApiQuery({ name: 'endDate', required: false, type: String, description: 'End date filter' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page' })
  @ApiOkResponse({
    description: 'Charging sessions search results',
    type: PaginatedResponseDto<ChargingSessionResponseDto>
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Admin token required'
  })
  async searchChargingSessions(@Query() filters: SearchChargingSessionsDto) {
    return this.chargingSessionsService.searchChargingSessions(filters);
  }

  @Get('stats')
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ 
    summary: 'Get charging session statistics (Admin)',
    description: 'Get charging session statistics and analytics. Only admins can access this endpoint.'
  })
  @ApiQuery({ name: 'period', required: false, type: String, description: 'Time period (today, week, month, year)' })
  @ApiQuery({ name: 'startDate', required: false, type: String, description: 'Start date for custom period' })
  @ApiQuery({ name: 'endDate', required: false, type: String, description: 'End date for custom period' })
  @ApiOkResponse({
    description: 'Charging session statistics retrieved successfully'
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Admin token required'
  })
  async getChargingSessionStats(
    @Query('period') period?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ) {
    return this.chargingSessionsService.getChargingSessionStats(period, startDate, endDate);
  }

  @Get('revenue')
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ 
    summary: 'Get revenue analytics (Admin)',
    description: 'Get revenue analytics with time-based grouping. Only admins can access this endpoint.'
  })
  @ApiQuery({ name: 'period', required: false, type: String, description: 'Time period (week, month, year)' })
  @ApiQuery({ name: 'groupBy', required: false, type: String, description: 'Group by (day, week, month)' })
  @ApiOkResponse({
    description: 'Revenue analytics retrieved successfully'
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Admin token required'
  })
  async getRevenueAnalytics(
    @Query('period') period: string = 'month',
    @Query('groupBy') groupBy: string = 'day'
  ) {
    return this.chargingSessionsService.getRevenueAnalytics(period, groupBy);
  }

  @Get('customer/:customerId')
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ 
    summary: 'Get charging sessions by customer (Admin)',
    description: 'Get all charging sessions for a specific customer. Only admins can access this endpoint.'
  })
  @ApiParam({ name: 'customerId', description: 'Customer ID' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page' })
  @ApiOkResponse({
    description: 'Customer charging sessions retrieved successfully',
    type: PaginatedResponseDto<ChargingSessionResponseDto>
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Admin token required'
  })
  async getChargingSessionsByCustomer(
    @Param('customerId') customerId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    return this.chargingSessionsService.getChargingSessionsByCustomer(customerId, page, limit);
  }

  @Get('bike/:bikeId')
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ 
    summary: 'Get charging sessions by bike (Admin)',
    description: 'Get all charging sessions for a specific bike. Only admins can access this endpoint.'
  })
  @ApiParam({ name: 'bikeId', description: 'Bike ID' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page' })
  @ApiOkResponse({
    description: 'Bike charging sessions retrieved successfully',
    type: PaginatedResponseDto<ChargingSessionResponseDto>
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Admin token required'
  })
  async getChargingSessionsByBike(
    @Param('bikeId') bikeId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    return this.chargingSessionsService.getChargingSessionsByBike(bikeId, page, limit);
  }

  @Get('reports')
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ 
    summary: 'Get charging session reports (Admin)',
    description: 'Generate charging session reports with filters. Only admins can access this endpoint.'
  })
  @ApiQuery({ name: 'startDate', required: false, type: String, description: 'Start date filter' })
  @ApiQuery({ name: 'endDate', required: false, type: String, description: 'End date filter' })
  @ApiQuery({ name: 'status', required: false, type: String, description: 'Filter by status' })
  @ApiQuery({ name: 'customerId', required: false, type: String, description: 'Filter by customer ID' })
  @ApiQuery({ name: 'bikeId', required: false, type: String, description: 'Filter by bike ID' })
  @ApiQuery({ name: 'format', required: false, type: String, description: 'Report format' })
  @ApiOkResponse({
    description: 'Charging session report generated successfully'
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Admin token required'
  })
  async getChargingSessionReports(@Query() filters: any) {
    return this.chargingSessionsService.getChargingSessionReports(filters);
  }

  @Get('admin/all')
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ 
    summary: 'View all charging sessions (Admin)',
    description: 'Get all charging sessions with advanced filtering options. Only admins can access this endpoint.'
  })
  @ApiQuery({ name: 'customerId', required: false, type: String, description: 'Filter by customer ID' })
  @ApiQuery({ name: 'bikeId', required: false, type: String, description: 'Filter by bike ID' })
  @ApiQuery({ name: 'status', required: false, type: String, description: 'Filter by session status' })
  @ApiQuery({ name: 'dateRangeStart', required: false, type: String, description: 'Start date filter (ISO string)' })
  @ApiQuery({ name: 'dateRangeEnd', required: false, type: String, description: 'End date filter (ISO string)' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' })
  @ApiOkResponse({
    description: 'All charging sessions retrieved successfully',
    type: PaginatedResponseDto<ChargingSessionResponseDto>
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Admin token required'
  })
  async getAllSessionsAdmin(
    @Query('customerId') customerId?: string,
    @Query('bikeId') bikeId?: string,
    @Query('status') status?: string,
    @Query('dateRangeStart') dateRangeStart?: string,
    @Query('dateRangeEnd') dateRangeEnd?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    return this.chargingSessionsService.getAllSessions({
      customerId,
      bikeId,
      status,
      dateRangeStart,
      dateRangeEnd,
      page,
      limit,
    });
  }

  @Post('admin/end/:id')
  @UseGuards(AdminAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'End any charging session (Admin)', 
    description: 'Admin can force-end any charging session. Only admins can access this endpoint.'
  })
  @ApiParam({ name: 'id', description: 'Charging session ID' })
  @ApiOkResponse({ 
    description: 'Charging session ended successfully', 
    type: ChargingSessionResponseDto 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request - Invalid session ID or session already ended' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Admin token required' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Not found - Charging session not found' 
  })
  async adminEndSession(
    @Param('id') id: string,
    @Body() body: EndChargingSessionDto
  ): Promise<ChargingSessionResponseDto> {
    return this.chargingSessionsService.adminEndSession(
      id, 
      body.endTime ? new Date(body.endTime) : undefined
    );
  }

  @Get('admin/:id')
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ 
    summary: 'Get charging session details (Admin)',
    description: 'Get full details of any charging session. Only admins can access this endpoint.'
  })
  @ApiParam({ name: 'id', description: 'Charging session ID' })
  @ApiOkResponse({
    description: 'Charging session details retrieved successfully',
    type: ChargingSessionResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Admin token required'
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Not found - Charging session not found'
  })
  async adminGetSessionDetails(
    @Param('id') id: string
  ): Promise<ChargingSessionResponseDto> {
    return this.chargingSessionsService.adminGetSessionDetails(id);
  }

  @Get('admin/analytics/summary')
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ 
    summary: 'Get charging analytics summary (Admin)',
    description: 'Get aggregated charging session analytics including total sessions, energy delivered, and revenue.'
  })
  @ApiQuery({ name: 'dateRangeStart', required: false, type: String, description: 'Start date filter (ISO string)' })
  @ApiQuery({ name: 'dateRangeEnd', required: false, type: String, description: 'End date filter (ISO string)' })
  @ApiOkResponse({
    description: 'Charging analytics summary retrieved successfully'
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Admin token required'
  })
  async getAdminAnalyticsSummary(
    @Query('dateRangeStart') dateRangeStart?: string,
    @Query('dateRangeEnd') dateRangeEnd?: string
  ) {
    return this.chargingSessionsService.getAdminAnalyticsSummary(
      dateRangeStart,
      dateRangeEnd
    );
  }

  // ----------------------------
  // CUSTOMER ENDPOINTS
  // ----------------------------

  @Post('start')
  @UseGuards(CustomerAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Start a charging session (Customer)',
    description: 'Start a new charging session for the authenticated customer with a specific bike.'
  })
  @ApiCreatedResponse({
    description: 'Charging session started successfully',
    type: ChargingSessionResponseDto
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request - Invalid input data or customer already has active session for this bike'
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Customer token required'
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Not found - Bike not found'
  })
  async startChargingSession(
    @Request() req: any,
    @Body() body: StartChargingSessionDto
  ): Promise<ChargingSessionResponseDto> {
    return this.chargingSessionsService.startChargingSession(req.customer.sub, body);
  }

  @Post(':id/end')
  @UseGuards(CustomerAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'End a charging session (Customer)', 
    description: 'End a specific charging session by providing the session ID. Only the session owner can end their session.'
  })
  @ApiParam({ name: 'id', description: 'Charging session ID' })
  @ApiOkResponse({ 
    description: 'Charging session ended successfully', 
    type: ChargingSessionResponseDto 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request - Invalid session ID or session already ended' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Customer token required' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Not found - Charging session not found' 
  })
  async endChargingSession(
    @Param('id') id: string,
    @Request() req: any,
    @Body() body: EndChargingSessionDto
  ): Promise<ChargingSessionResponseDto> {
    return this.chargingSessionsService.endChargingSession(
      req.customer.sub, 
      id, 
      body.endTime ? new Date(body.endTime) : undefined
    );
  }

  @Post(':id/cancel')
  @UseGuards(CustomerAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Cancel a charging session (Customer)', 
    description: 'Cancel a specific charging session by providing the session ID. Only the session owner can cancel their session.'
  })
  @ApiParam({ name: 'id', description: 'Charging session ID' })
  @ApiOkResponse({ 
    description: 'Charging session cancelled successfully', 
    type: ChargingSessionResponseDto 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request - Invalid session ID or session already ended' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Customer token required'
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Not found - Charging session not found'
  })
  async cancelChargingSession(
    @Param('id') id: string,
    @Request() req: any
  ): Promise<ChargingSessionResponseDto> {
    return this.chargingSessionsService.cancelChargingSession(req.customer.sub, id);
  }

  @Get('active')
  @UseGuards(CustomerAuthGuard)
  @ApiOperation({ 
    summary: 'Get active charging sessions (Customer)',
    description: 'Get all active charging sessions for the authenticated customer across all their bikes.'
  })
  @ApiOkResponse({
    description: 'Active charging sessions retrieved successfully',
    type: [ChargingSessionResponseDto]
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Customer token required'
  })
  async getActiveSessions(@Request() req: any) {
    return this.chargingSessionsService.getActiveSessionsByCustomer(req.customer.sub);
  }

  @Get('my-sessions')
  @UseGuards(CustomerAuthGuard)
  @ApiOperation({ 
    summary: 'Get past charging sessions (Customer)',
    description: 'Get completed charging sessions for the authenticated customer with pagination and filters.'
  })
  @ApiQuery({ name: 'bikeId', required: false, type: String, description: 'Filter by specific bike ID' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' })
  @ApiQuery({ name: 'dateRangeStart', required: false, type: String, description: 'Start date filter (ISO string)' })
  @ApiQuery({ name: 'dateRangeEnd', required: false, type: String, description: 'End date filter (ISO string)' })
  @ApiOkResponse({
    description: 'Past charging sessions retrieved successfully',
    type: PaginatedResponseDto<ChargingSessionResponseDto>
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Customer token required'
  })
  async getMySessions(
    @Request() req: any,
    @Query('bikeId') bikeId?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('dateRangeStart') dateRangeStart?: string,
    @Query('dateRangeEnd') dateRangeEnd?: string
  ) {
    return this.chargingSessionsService.getMySessions(
      req.customer.sub,
      { bikeId, page, limit, dateRangeStart, dateRangeEnd }
    );
  }

  @Get(':id')
  @UseGuards(CustomerAuthGuard)
  @ApiOperation({ 
    summary: 'Get charging session details (Customer)',
    description: 'Get full details of a specific charging session. Only the session owner can view their session.'
  })
  @ApiParam({ name: 'id', description: 'Charging session ID' })
  @ApiOkResponse({
    description: 'Charging session details retrieved successfully',
    type: ChargingSessionResponseDto
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Customer token required'
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Not found - Charging session not found'
  })
  async getSessionDetails(
    @Param('id') id: string,
    @Request() req: any
  ): Promise<ChargingSessionResponseDto> {
    return this.chargingSessionsService.getSessionDetails(req.customer.sub, id);
  }

  @Get('analytics/summary')
  @UseGuards(CustomerAuthGuard)
  @ApiOperation({ 
    summary: 'Get customer charging analytics (Customer)',
    description: 'Get charging session analytics for the authenticated customer including sessions per day/month and duration statistics.'
  })
  @ApiQuery({ name: 'dateRangeStart', required: false, type: String, description: 'Start date filter (ISO string)' })
  @ApiQuery({ name: 'dateRangeEnd', required: false, type: String, description: 'End date filter (ISO string)' })
  @ApiOkResponse({
    description: 'Customer charging analytics retrieved successfully'
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Customer token required'
  })
  async getCustomerAnalytics(
    @Request() req: any,
    @Query('dateRangeStart') dateRangeStart?: string,
    @Query('dateRangeEnd') dateRangeEnd?: string
  ) {
    return this.chargingSessionsService.getCustomerAnalytics(
      req.customer.sub,
      dateRangeStart,
      dateRangeEnd
    );
  }
}

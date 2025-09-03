import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum ChargingSessionStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export class CreateChargingSessionDto {
  @ApiProperty({
    description: 'Bike ID for the charging session',
    example: '507f1f77bcf86cd799439011'
  })
  @IsNotEmpty({ message: 'Bike ID is required' })
  @IsString({ message: 'Bike ID must be a string' })
  bikeId: string;

  @ApiProperty({
    description: 'Charging session amount',
    example: 5.50
  })
  @IsNotEmpty({ message: 'Amount is required' })
  @IsNumber({}, { message: 'Amount must be a number' })
  amount: number;

  @ApiProperty({
    description: 'Charging session start time',
    example: '2024-01-09T10:00:00Z'
  })
  @IsNotEmpty({ message: 'Start time is required' })
  @IsDateString({}, { message: 'Start time must be a valid date string' })
  startTime: string;

  @ApiProperty({
    description: 'Charging session end time (optional)',
    example: '2024-01-09T11:30:00Z',
    required: false
  })
  @IsOptional()
  @IsDateString({}, { message: 'End time must be a valid date string' })
  endTime?: string;

  @ApiProperty({
    description: 'Charging session status',
    enum: ChargingSessionStatus,
    default: ChargingSessionStatus.ACTIVE,
    required: false
  })
  @IsOptional()
  @IsEnum(ChargingSessionStatus, { message: 'Status must be one of: ACTIVE, COMPLETED, CANCELLED' })
  status?: ChargingSessionStatus;
}

export class UpdateChargingSessionDto {
  @ApiProperty({
    description: 'Charging session status',
    enum: ChargingSessionStatus
  })
  @IsNotEmpty({ message: 'Status is required' })
  @IsEnum(ChargingSessionStatus, { message: 'Status must be one of: ACTIVE, COMPLETED, CANCELLED' })
  status: ChargingSessionStatus;

  @ApiProperty({
    description: 'Charging session end time (optional)',
    example: '2024-01-09T11:30:00Z',
    required: false
  })
  @IsOptional()
  @IsDateString({}, { message: 'End time must be a valid date string' })
  endTime?: string;
}

export class SearchChargingSessionsDto {
  @ApiProperty({
    description: 'Search query (customer name, email, bike serial number)',
    example: 'John',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Search query must be a string' })
  q?: string;

  @ApiProperty({
    description: 'Filter by charging session status',
    enum: ChargingSessionStatus,
    required: false
  })
  @IsOptional()
  @IsEnum(ChargingSessionStatus, { message: 'Status must be one of: ACTIVE, COMPLETED, CANCELLED' })
  status?: ChargingSessionStatus;

  @ApiProperty({
    description: 'Filter by customer ID',
    example: '507f1f77bcf86cd799439011',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Customer ID must be a string' })
  customerId?: string;

  @ApiProperty({
    description: 'Filter by bike ID',
    example: '507f1f77bcf86cd799439011',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Bike ID must be a string' })
  bikeId?: string;

  @ApiProperty({
    description: 'Start date filter (ISO string)',
    example: '2024-01-01T00:00:00Z',
    required: false
  })
  @IsOptional()
  @IsDateString({}, { message: 'Start date must be a valid date string' })
  startDate?: string;

  @ApiProperty({
    description: 'End date filter (ISO string)',
    example: '2024-01-31T23:59:59Z',
    required: false
  })
  @IsOptional()
  @IsDateString({}, { message: 'End date must be a valid date string' })
  endDate?: string;

  @ApiProperty({
    description: 'Page number',
    example: 1,
    default: 1,
    required: false
  })
  @IsOptional()
  page?: number;

  @ApiProperty({
    description: 'Items per page',
    example: 10,
    default: 10,
    required: false
  })
  @IsOptional()
  limit?: number;
}

export class StartChargingSessionDto {
  @ApiProperty({
    description: 'Bike ID for the charging session',
    example: '507f1f77bcf86cd799439011'
  })
  @IsNotEmpty({ message: 'Bike ID is required' })
  @IsString({ message: 'Bike ID must be a string' })
  bikeId: string;

  @ApiProperty({
    description: 'Charging session amount',
    example: 5.50
  })
  @IsNotEmpty({ message: 'Amount is required' })
  @IsNumber({}, { message: 'Amount must be a number' })
  amount: number;
}

export class EndChargingSessionDto {
  @ApiProperty({
    description: 'Charging session end time (optional, defaults to current time)',
    example: '2024-01-09T11:30:00Z',
    required: false
  })
  @IsOptional()
  @IsDateString({}, { message: 'End time must be a valid date string' })
  endTime?: string;
}

export class ChargingSessionResponseDto {
  @ApiProperty({ description: 'Charging session ID' })
  id: string;

  @ApiProperty({ description: 'Customer ID' })
  customerId: string;

  @ApiProperty({ description: 'Bike ID' })
  bikeId: string;

  @ApiProperty({ description: 'Charging session amount' })
  amount: number;

  @ApiProperty({ description: 'Charging session start time' })
  startTime: Date;

  @ApiProperty({ description: 'Charging session end time' })
  endTime?: Date | null;

  @ApiProperty({ description: 'Charging session status' })
  status: string;

  @ApiProperty({ description: 'Charging session creation time' })
  createdAt: Date;

  @ApiProperty({ description: 'Charging session last update time' })
  updatedAt: Date;

  @ApiProperty({ description: 'Customer information' })
  customer?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };

  @ApiProperty({ description: 'Bike information' })
  bike?: {
    id: string;
    serialNumber: string;
    brand: string;
    model: string;
  };
}

export class PaginatedResponseDto<T> {
  @ApiProperty({ description: 'List of items' })
  items: T[];

  @ApiProperty({ description: 'Total number of items' })
  total: number;

  @ApiProperty({ description: 'Current page number' })
  page: number;

  @ApiProperty({ description: 'Items per page' })
  limit: number;

  @ApiProperty({ description: 'Total number of pages' })
  totalPages: number;

  @ApiProperty({ description: 'Whether there is a next page' })
  hasNext: boolean;

  @ApiProperty({ description: 'Whether there is a previous page' })
  hasPrev: boolean;
}

import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum BikeStatus {
  AVAILABLE = 'AVAILABLE',
  ASSIGNED = 'ASSIGNED',
  MAINTENANCE = 'MAINTENANCE',
  RETIRED = 'RETIRED'
}

export class CreateBikeDto {
  @ApiProperty({
    description: 'Bike serial number (required, must be unique)',
    example: 'BIKE001',
    minLength: 3,
    maxLength: 20,
    pattern: '^[A-Z0-9]+$'
  })
  @IsNotEmpty({ message: 'Serial number is required' })
  @IsString({ message: 'Serial number must be a string' })
  serialNumber: string;

  @ApiProperty({
    description: 'Bike brand name',
    example: 'Trek',
    minLength: 2,
    maxLength: 50
  })
  @IsNotEmpty({ message: 'Brand is required' })
  @IsString({ message: 'Brand must be a string' })
  brand: string;

  @ApiProperty({
    description: 'Bike model name',
    example: 'Mountain Bike Pro',
    minLength: 2,
    maxLength: 100
  })
  @IsNotEmpty({ message: 'Model is required' })
  @IsString({ message: 'Model must be a string' })
  model: string;

  @ApiProperty({
    description: 'Bike status (optional, defaults to AVAILABLE)',
    enum: BikeStatus,
    enumName: 'BikeStatus',
    default: BikeStatus.AVAILABLE,
    example: BikeStatus.AVAILABLE,
    required: false
  })
  @IsOptional()
  @IsEnum(BikeStatus, { message: 'Status must be one of: AVAILABLE, ASSIGNED, MAINTENANCE, RETIRED' })
  status?: BikeStatus;
}

export class UpdateBikeStatusDto {
  @ApiProperty({
    description: 'New bike status',
    enum: BikeStatus,
    enumName: 'BikeStatus',
    example: BikeStatus.AVAILABLE
  })
  @IsNotEmpty({ message: 'Status is required' })
  @IsEnum(BikeStatus, { message: 'Status must be one of: AVAILABLE, ASSIGNED, MAINTENANCE, RETIRED' })
  status: BikeStatus;
}

export class AssignBikeDto {
  @ApiProperty({
    description: 'Bike ID to assign',
    example: '507f1f77bcf86cd799439011'
  })
  @IsNotEmpty({ message: 'Bike ID is required' })
  @IsString({ message: 'Bike ID must be a string' })
  bikeId: string;

  @ApiProperty({
    description: 'Customer ID to assign the bike to',
    example: '507f1f77bcf86cd799439011'
  })
  @IsNotEmpty({ message: 'Customer ID is required' })
  @IsString({ message: 'Customer ID must be a string' })
  customerId: string;
}

export class ReturnBikeDto {
  @ApiProperty({
    description: 'Bike ID to return',
    example: '507f1f77bcf86cd799439011'
  })
  @IsNotEmpty({ message: 'Bike ID is required' })
  @IsString({ message: 'Bike ID must be a string' })
  bikeId: string;

  @ApiProperty({
    description: 'Customer ID returning the bike',
    example: '507f1f77bcf86cd799439011'
  })
  @IsNotEmpty({ message: 'Customer ID is required' })
  @IsString({ message: 'Customer ID must be a string' })
  customerId: string;
}

export class SearchBikesDto {
  @ApiProperty({
    description: 'Search query (bike brand, model, or serial number)',
    example: 'Trek',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Search query must be a string' })
  q?: string;

  @ApiProperty({
    description: 'Filter by bike status',
    enum: BikeStatus,
    enumName: 'BikeStatus',
    required: false
  })
  @IsOptional()
  @IsEnum(BikeStatus, { message: 'Status must be one of: AVAILABLE, ASSIGNED, MAINTENANCE, RETIRED' })
  status?: BikeStatus;

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

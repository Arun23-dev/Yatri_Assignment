import { ApiProperty } from '@nestjs/swagger';

export class AdminResponseDto {
  @ApiProperty({
    description: 'Admin unique identifier',
    example: '507f1f77bcf86cd799439011'
  })
  id: string;

  @ApiProperty({
    description: 'Admin first name',
    example: 'John'
  })
  firstName: string;

  @ApiProperty({
    description: 'Admin last name',
    example: 'Admin'
  })
  lastName: string;

  @ApiProperty({
    description: 'Admin email address',
    example: 'admin@yatritask.com'
  })
  email: string;

  @ApiProperty({
    description: 'Admin creation timestamp',
    example: '2024-01-09T16:30:00.000Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Admin last update timestamp',
    example: '2024-01-09T16:30:00.000Z'
  })
  updatedAt: Date;
}

export class CustomerResponseDto {
  @ApiProperty({
    description: 'Customer unique identifier',
    example: '507f1f77bcf86cd799439011'
  })
  id: string;

  @ApiProperty({
    description: 'Customer first name',
    example: 'Jane'
  })
  firstName: string;

  @ApiProperty({
    description: 'Customer last name',
    example: 'Doe'
  })
  lastName: string;

  @ApiProperty({
    description: 'Customer email address',
    example: 'jane.doe@example.com'
  })
  email: string;

  @ApiProperty({
    description: 'Customer phone number',
    example: '+1234567890',
    nullable: true
  })
  phone: string | null;

  @ApiProperty({
    description: 'Customer address',
    example: '123 Main St, City, State 12345',
    nullable: true
  })
  address: string | null;

  @ApiProperty({
    description: 'Customer creation timestamp',
    example: '2024-01-09T16:30:00.000Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Customer last update timestamp',
    example: '2024-01-09T16:30:00.000Z'
  })
  updatedAt: Date;
}

export class AdminAuthResponseDto {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  token: string;

  @ApiProperty({
    description: 'Admin information',
    type: AdminResponseDto
  })
  admin: AdminResponseDto;
}

export class CustomerAuthResponseDto {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  token: string;

  @ApiProperty({
    description: 'Customer information',
    type: CustomerResponseDto
  })
  customer: CustomerResponseDto;
}

export class BikeResponseDto {
  @ApiProperty({
    description: 'Bike unique identifier',
    example: '507f1f77bcf86cd799439011'
  })
  id: string;

  @ApiProperty({
    description: 'Bike serial number',
    example: 'BIKE001'
  })
  serialNumber: string;

  @ApiProperty({
    description: 'Bike model',
    example: 'Mountain Bike Pro'
  })
  model: string;

  @ApiProperty({
    description: 'Bike status',
    enum: ['AVAILABLE', 'ASSIGNED', 'MAINTENANCE', 'RETIRED'],
    example: 'AVAILABLE'
  })
  status: string;

  @ApiProperty({
    description: 'Bike creation timestamp',
    example: '2024-01-09T16:30:00.000Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Bike last update timestamp',
    example: '2024-01-09T16:30:00.000Z'
  })
  updatedAt: Date;
}

export class BikeAssignmentResponseDto {
  @ApiProperty({
    description: 'Assignment unique identifier',
    example: '507f1f77bcf86cd799439011'
  })
  id: string;

  @ApiProperty({
    description: 'Bike information',
    type: BikeResponseDto
  })
  bike: BikeResponseDto;

  @ApiProperty({
    description: 'Customer information',
    type: CustomerResponseDto
  })
  customer: CustomerResponseDto;

  @ApiProperty({
    description: 'Admin who assigned the bike',
    type: AdminResponseDto
  })
  admin: AdminResponseDto;

  @ApiProperty({
    description: 'Assignment timestamp',
    example: '2024-01-09T16:30:00.000Z'
  })
  assignedAt: Date;

  @ApiProperty({
    description: 'Return timestamp (null if not returned)',
    example: '2024-01-09T17:30:00.000Z',
    nullable: true
  })
  returnedAt: Date | null;
}

export class WalletResponseDto {
  @ApiProperty({
    description: 'Wallet unique identifier',
    example: '507f1f77bcf86cd799439011'
  })
  walletId: string;

  @ApiProperty({
    description: 'Customer ID associated with the wallet',
    example: '507f1f77bcf86cd799439011'
  })
  customerId: string;

  @ApiProperty({
    description: 'Customer name',
    example: 'Jane Doe'
  })
  customerName: string;

  @ApiProperty({
    description: 'Customer email',
    example: 'jane.doe@example.com'
  })
  customerEmail: string;

  @ApiProperty({
    description: 'Current wallet balance',
    example: 100.50
  })
  balance: number;
}

export class TransactionResponseDto {
  @ApiProperty({
    description: 'Transaction unique identifier',
    example: '507f1f77bcf86cd799439011'
  })
  id: string;

  @ApiProperty({
    description: 'Customer ID associated with the transaction',
    example: '507f1f77bcf86cd799439011'
  })
  customerId: string;

  @ApiProperty({
    description: 'Transaction amount',
    example: 10.50
  })
  amount: number;

  @ApiProperty({
    description: 'Transaction type',
    enum: ['CREDIT', 'DEBIT'],
    example: 'DEBIT'
  })
  type: string;

  @ApiProperty({
    description: 'Transaction description',
    example: 'Bike rental charge'
  })
  description: string;

  @ApiProperty({
    description: 'Transaction timestamp',
    example: '2024-01-09T16:30:00.000Z'
  })
  timestamp: Date;
}

export class ChargingSessionResponseDto {
  @ApiProperty({
    description: 'Charging session unique identifier',
    example: '507f1f77bcf86cd799439011'
  })
  id: string;

  @ApiProperty({
    description: 'Customer ID associated with the charging session',
    example: '507f1f77bcf86cd799439011'
  })
  customerId: string;

  @ApiProperty({
    description: 'Bike ID associated with the charging session',
    example: '507f1f77bcf86cd799439011'
  })
  bikeId: string;

  @ApiProperty({
    description: 'Charging session amount',
    example: 5.25
  })
  amount: number;

  @ApiProperty({
    description: 'Charging session start time',
    example: '2024-01-09T16:30:00.000Z'
  })
  startTime: Date;

  @ApiProperty({
    description: 'Charging session end time (null if ongoing)',
    example: '2024-01-09T17:30:00.000Z',
    nullable: true
  })
  endTime: Date | null;

  @ApiProperty({
    description: 'Charging session status',
    enum: ['ACTIVE', 'COMPLETED', 'CANCELLED'],
    example: 'COMPLETED'
  })
  status: string;
}

export class PaginatedResponseDto<T> {
  @ApiProperty({
    description: 'Array of items',
    isArray: true
  })
  items: T[];

  @ApiProperty({
    description: 'Total number of items',
    example: 100
  })
  total: number;

  @ApiProperty({
    description: 'Current page number',
    example: 1
  })
  page: number;

  @ApiProperty({
    description: 'Number of items per page',
    example: 10
  })
  limit: number;

  @ApiProperty({
    description: 'Total number of pages',
    example: 10
  })
  totalPages: number;

  @ApiProperty({
    description: 'Whether there is a next page',
    example: true
  })
  hasNext: boolean;

  @ApiProperty({
    description: 'Whether there is a previous page',
    example: false
  })
  hasPrev: boolean;
}

export class ApiResponseDto<T> {
  @ApiProperty({
    description: 'Response message',
    example: 'Operation completed successfully'
  })
  message: string;

  @ApiProperty({
    description: 'Response data',
    required: false
  })
  data?: T;

  @ApiProperty({
    description: 'Response status code',
    example: 200
  })
  statusCode: number;

  @ApiProperty({
    description: 'Response timestamp',
    example: '2024-01-09T16:30:00.000Z'
  })
  timestamp: Date;
}

export class DeleteCustomerResponseDto {
  @ApiProperty({
    description: 'Response message',
    example: 'Customer deleted successfully'
  })
  message: string;

  @ApiProperty({
    description: 'Customer ID that was deleted',
    example: '507f1f77bcf86cd799439011'
  })
  customerId: string;

  @ApiProperty({
    description: 'Customer email that was deleted',
    example: 'jane.doe@example.com'
  })
  customerEmail: string;

  @ApiProperty({
    description: 'Customer name that was deleted',
    example: 'Jane Doe'
  })
  customerName: string;

  @ApiProperty({
    description: 'Whether wallet was also deleted',
    example: true
  })
  walletDeleted: boolean;

  @ApiProperty({
    description: 'Wallet balance at time of deletion',
    example: 0.00
  })
  walletBalance: number;

  @ApiProperty({
    description: 'Wallet deletion message',
    example: 'Wallet deleted successfully',
    required: false
  })
  walletMessage?: string;
}

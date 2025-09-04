import { IsNotEmpty, IsNumber, IsString, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddFundsDto {
  @ApiProperty({
    description: 'User ID of the customer',
    example: 'user123',
  })
  @IsNotEmpty({ message: 'User ID is required' })
  @IsString({ message: 'User ID must be a string' })
  userId: string;

  @ApiProperty({
    description: 'Amount to add to wallet',
    example: 100.50,
    minimum: 0.01,
  })
  @IsNotEmpty({ message: 'Amount is required' })
  @IsNumber({}, { message: 'Amount must be a number' })
  @Min(0.01, { message: 'Amount must be greater than zero' })
  amount: number;

  @ApiProperty({
    description: 'Payment method used (e.g., credit_card, bank_transfer, cash)',
    example: 'credit_card',
  })
  @IsNotEmpty({ message: 'Payment method is required' })
  @IsString({ message: 'Payment method must be a string' })
  paymentMethod: string;

  @ApiProperty({
    description: 'Optional reference for the transaction',
    example: 'bank_transfer_12345',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Reference must be a string' })
  reference?: string;

  @ApiProperty({
    description: 'Optional description for the transaction',
    example: 'Monthly top-up',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;
}

export class AddFundsAuthenticatedDto {
  @ApiProperty({
    description: 'Amount to add to wallet',
    example: 100.50,
    minimum: 0.01,
  })
  @IsNotEmpty({ message: 'Amount is required' })
  @IsNumber({}, { message: 'Amount must be a number' })
  @Min(0.01, { message: 'Amount must be greater than zero' })
  amount: number;

  @ApiProperty({
    description: 'Payment method used (e.g., credit_card, bank_transfer, cash)',
    example: 'credit_card',
  })
  @IsNotEmpty({ message: 'Payment method is required' })
  @IsString({ message: 'Payment method must be a string' })
  paymentMethod: string;

  @ApiProperty({
    description: 'Optional reference for the transaction',
    example: 'bank_transfer_12345',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Reference must be a string' })
  reference?: string;

  @ApiProperty({
    description: 'Optional description for the transaction',
    example: 'Monthly top-up',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;
}

export class GetTransactionsQueryDto {
  @ApiProperty({
    description: 'Page number for pagination',
    example: 1,
    required: false,
    default: 1,
  })
  @IsOptional()
  page?: string;

  @ApiProperty({
    description: 'Number of transactions per page',
    example: 10,
    required: false,
    default: 10,
  })
  @IsOptional()
  limit?: string;

  @ApiProperty({
    description: 'Filter by transaction type (credit/debit)',
    example: 'credit',
    required: false,
    enum: ['credit', 'debit'],
  })
  @IsOptional()
  @IsString({ message: 'Type must be a string' })
  type?: string;
}

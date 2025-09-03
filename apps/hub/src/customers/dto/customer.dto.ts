import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty({
    description: 'Admin first name (required)',
    example: 'John',
    minLength: 1,
    maxLength: 50,
    pattern: '^[a-zA-Z\\s]+$'
  })
  @IsNotEmpty({ message: 'First name is required' })
  @IsString({ message: 'First name must be a string' })
  firstName: string;

  @ApiProperty({
    description: 'Admin last name (required)',
    example: 'Admin',
    minLength: 1,
    maxLength: 50,
    pattern: '^[a-zA-Z\\s]+$'
  })
  @IsNotEmpty({ message: 'Last name is required' })
  @IsString({ message: 'Last name must be a string' })
  lastName: string;

  @ApiProperty({
    description: 'Admin email address (required, must be unique)',
    example: 'admin@yatritask.com',
    format: 'email',
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty({
    description: 'Admin password (required, minimum 6 characters)',
    example: 'admin123',
    minLength: 6,
    maxLength: 100,
    pattern: '^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{6,}$'
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}

export class CreateCustomerDto {
  @ApiProperty({
    description: 'Customer first name (required)',
    example: 'Jane',
    minLength: 1,
    maxLength: 50,
    pattern: '^[a-zA-Z\\s]+$'
  })
  @IsNotEmpty({ message: 'First name is required' })
  @IsString({ message: 'First name must be a string' })
  firstName: string;

  @ApiProperty({
    description: 'Customer last name (required)',
    example: 'Doe',
    minLength: 1,
    maxLength: 50,
    pattern: '^[a-zA-Z\\s]+$'
  })
  @IsNotEmpty({ message: 'Last name is required' })
  @IsString({ message: 'Last name must be a string' })
  lastName: string;

  @ApiProperty({
    description: 'Customer email address (required, must be unique)',
    example: 'jane.doe@example.com',
    format: 'email',
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty({
    description: 'Customer password (required, minimum 6 characters)',
    example: 'password123',
    minLength: 6,
    maxLength: 100,
    pattern: '^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{6,}$'
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @ApiProperty({
    description: 'Customer phone number (optional)',
    example: '+1234567890',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Phone must be a string' })
  phone?: string;

  @ApiProperty({
    description: 'Customer address (optional)',
    example: '123 Main St, City, State 12345',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Address must be a string' })
  address?: string;
}

export class UpdateCustomerDto {
  @ApiProperty({
    description: 'Customer first name (optional)',
    example: 'Jane',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'First name must be a string' })
  firstName?: string;

  @ApiProperty({
    description: 'Customer last name (optional)',
    example: 'Doe',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Last name must be a string' })
  lastName?: string;

  @ApiProperty({
    description: 'Customer email address (optional)',
    example: 'jane.doe@example.com',
    required: false
  })
  @IsOptional()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email?: string;

  @ApiProperty({
    description: 'Customer phone number (optional)',
    example: '+1234567890',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Phone must be a string' })
  phone?: string;

  @ApiProperty({
    description: 'Customer address (optional)',
    example: '123 Main St, City, State 12345',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Address must be a string' })
  address?: string;
}

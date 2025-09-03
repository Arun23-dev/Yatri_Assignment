import { 
  Controller, 
  Get, 
  Put, 
  Body, 
  UseGuards,
  Request,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiOkResponse,
  ApiBearerAuth
} from '@nestjs/swagger';
import { CustomerAuthGuard } from '../auth/guards/customer-auth.guard';
import { CustomerAuthService } from '../auth/customer-auth.service';
import { UpdateCustomerDto } from './dto/customer.dto';
import { ChangePasswordDto } from '../auth/dto/auth.dto';
import { 
  CustomerResponseDto, 
  ApiResponseDto 
} from '../common/dto/response.dto';

@ApiTags('customer-profile')
@Controller('customer-profile')
@ApiBearerAuth('JWT-auth')
@UseGuards(CustomerAuthGuard)
export class CustomerProfileController {
  constructor(private customerAuthService: CustomerAuthService) {}

  @Get('me')
  @ApiOperation({ 
    summary: 'Get current customer profile',
    description: 'Retrieves the profile information of the authenticated customer.'
  })
  @ApiOkResponse({
    description: 'Customer profile retrieved successfully',
    type: ApiResponseDto<CustomerResponseDto>
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Customer token required'
  })
  async getMyProfile(@Request() req: any): Promise<ApiResponseDto<CustomerResponseDto>> {
    const customer = await this.customerAuthService.getCustomerById(req.customer.sub);
    return {
      message: 'Customer profile retrieved successfully',
      data: customer,
      statusCode: HttpStatus.OK,
      timestamp: new Date()
    };
  }

  @Put('me')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Update current customer profile',
    description: 'Updates the profile information of the authenticated customer.'
  })
  @ApiOkResponse({
    description: 'Customer profile updated successfully',
    type: ApiResponseDto<CustomerResponseDto>
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request - Invalid input data'
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Customer token required'
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Conflict - Email already exists'
  })
  async updateMyProfile(
    @Request() req: any,
    @Body() body: UpdateCustomerDto
  ): Promise<ApiResponseDto<CustomerResponseDto>> {
    const customer = await this.customerAuthService.updateCustomer(req.customer.sub, body);
    return {
      message: 'Customer profile updated successfully',
      data: customer,
      statusCode: HttpStatus.OK,
      timestamp: new Date()
    };
  }

  @Put('me/change-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Change customer password',
    description: 'Changes the password of the authenticated customer.'
  })
  @ApiOkResponse({
    description: 'Password changed successfully',
    type: ApiResponseDto<void>
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request - Invalid current password or new password'
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Customer token required'
  })
  async changePassword(
    @Request() req: any,
    @Body() body: ChangePasswordDto
  ): Promise<ApiResponseDto<void>> {
    await this.customerAuthService.changePassword(req.customer.sub, body.currentPassword, body.newPassword);
    return {
      message: 'Password changed successfully',
      statusCode: HttpStatus.OK,
      timestamp: new Date()
    };
  }
}

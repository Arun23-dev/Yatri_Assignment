import { CustomerAuthService } from '../auth/customer-auth.service';
import { UpdateCustomerDto } from './dto/customer.dto';
import { ChangePasswordDto } from '../auth/dto/auth.dto';
import { CustomerResponseDto, ApiResponseDto } from '../common/dto/response.dto';
export declare class CustomerProfileController {
    private customerAuthService;
    constructor(customerAuthService: CustomerAuthService);
    getMyProfile(req: any): Promise<ApiResponseDto<CustomerResponseDto>>;
    updateMyProfile(req: any, body: UpdateCustomerDto): Promise<ApiResponseDto<CustomerResponseDto>>;
    changePassword(req: any, body: ChangePasswordDto): Promise<ApiResponseDto<void>>;
}

import { CanActivate, ExecutionContext } from '@nestjs/common';
import { CustomerAuthService } from '../customer-auth.service';
export declare class CustomerAuthGuard implements CanActivate {
    private customerAuthService;
    constructor(customerAuthService: CustomerAuthService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromRequest;
}

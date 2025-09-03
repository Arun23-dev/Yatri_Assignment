import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AdminAuthService } from '../admin-auth.service';
export declare class AdminAuthGuard implements CanActivate {
    private adminAuthService;
    constructor(adminAuthService: AdminAuthService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromRequest;
}

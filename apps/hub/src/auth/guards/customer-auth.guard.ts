import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { CustomerAuthService } from '../customer-auth.service';

@Injectable()
export class CustomerAuthGuard implements CanActivate {
  constructor(private customerAuthService: CustomerAuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromRequest(request);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = await this.customerAuthService.validateToken(token);
      request.customer = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private extractTokenFromRequest(request: any): string | undefined {
    // First check for Authorization header
    const authHeader = request.headers.authorization;
    if (authHeader) {
      const [type, token] = authHeader.split(' ');
      if (type === 'Bearer') {
        return token;
      }
    }

    // Then check for customer_token cookie
    const cookieToken = request.cookies?.customer_token;
    if (cookieToken) {
      return cookieToken;
    }

    return undefined;
  }
}

import { JwtService } from '@nestjs/jwt';
export declare class JwtVerificationService {
    private jwtService;
    constructor(jwtService: JwtService);
    verifyTokenFromHub(token: string): Promise<any>;
    getCustomerInfo(customerId: string): Promise<any>;
}

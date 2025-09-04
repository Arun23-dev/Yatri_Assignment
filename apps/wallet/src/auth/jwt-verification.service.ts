import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';

@Injectable()
export class JwtVerificationService {
  constructor(private jwtService: JwtService) {}

  async verifyTokenFromHub(token: string) {
    try {
      // Option 1: Call Hub's token verification endpoint
      const response = await axios.post('http://localhost:3001/auth/verify-token', {
        token
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      return response.data;
    } catch (error) {
      // Option 2: Fallback to local verification with shared secret
      try {
        const payload = this.jwtService.verify(token);
        
        // Verify it's a customer token
        if (payload.type !== 'customer') {
          throw new UnauthorizedException('Invalid token type');
        }
        
        return payload;
      } catch (jwtError) {
        throw new UnauthorizedException('Invalid or expired token');
      }
    }
  }

  async getCustomerInfo(customerId: string) {
    try {
      // Call Hub's customer info endpoint
      const response = await axios.get(`http://localhost:3001/customers/${customerId}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      return response.data;
    } catch (error) {
      throw new UnauthorizedException('Customer not found');
    }
  }
}

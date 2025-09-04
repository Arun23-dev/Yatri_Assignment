import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Extract JWT from Authorization header as Bearer token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Reject expired tokens
      secretOrKey: process.env.JWT_SECRET || 'yatritask-super-secret-jwt-key-2024', // Secret key
    });
  }

  /**
   * Called automatically after JWT is verified
   * The payload is the object you signed in AuthService
   * Example: { sub: userId, role: 'customer' | 'admin' }
   */
  validate(payload: { sub: string; role: 'customer' | 'admin' }) {
    return {
      id: payload.sub,
      role: payload.role,
    };
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly configService:ConfigService) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: configService.get<string>('JWT_SECRET','default-secret'),
      })
    }

    async validate(payload: JwtPayload) {

        /**
         * Optional:
         * Query database to ensure user still exists
         * and is active.
         */
    
        return {
          user_id: payload.sub,
          email: payload.email,
          role_id: payload.role_id,
          role: payload.roles,

        };
        
    }
      
}
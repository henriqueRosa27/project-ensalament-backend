import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { Reflector } from '@nestjs/core';

interface PayloadRequest {
  user: {
    id: string;
    email: string;
  };
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private _reflector: Reflector) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(
    payload: PayloadRequest,
  ): Promise<{
    userId: any;
    username: any;
  }> {
    return { userId: payload.user.id, username: payload.user.email };
  }
}

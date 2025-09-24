import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  validateUser(username: string, password: string) {
    if (username === 'admin' && password === 'password') {
      return { userId: 1, username: 'admin' };
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  login(user: { userId: number; username: string }) {
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

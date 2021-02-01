import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './dto/login.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(dto: LoginDTO): Promise<{ token: string }> {
    const user = await this.userService.validateUser(dto.email, dto.password);

    if (!user) {
      throw new HttpException(
        { error: 'E-mail e/ou senha incorretos' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload = {
      user: {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role.name,
      },
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}

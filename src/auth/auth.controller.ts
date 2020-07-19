import {
  Controller,
  Get,
  UseGuards,
  SetMetadata,
  Post,
  UsePipes,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { LoginDTO } from './dto/login.dto';
import { JoiValidationPipe } from 'src/app/shared/pipe/validation.pipe';
import { loginValidation } from './dto/auth.validation';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  // @SetMetadata('roles', ['admin'])
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Get()
  // get(): string {
  //   return 'olá';
  // }

  @Post('login')
  @UsePipes(new JoiValidationPipe(loginValidation))
  async login(@Body() dto: LoginDTO): Promise<any> {
    return this.service.login(dto);
  }
}

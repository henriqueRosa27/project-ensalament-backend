import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { CreateUserDTO } from './dto/createUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  async get(): Promise<UserDTO[]> {
    return await this.service.get();
  }

  @Post()
  async create(@Body() createDTO: CreateUserDTO): Promise<UserDTO> {
    return await this.service.create(createDTO);
  }
}

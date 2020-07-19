import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { CreateUserDTO } from './dto/createUser.dto';
import { JoiValidationPipe } from 'src/app/shared/pipe/validation.pipe';
import { createUserValidation } from './dto/user.validation';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createUserValidation))
  async create(@Body() createDTO: CreateUserDTO): Promise<UserDTO> {
    return await this.service.create(createDTO);
  }
}

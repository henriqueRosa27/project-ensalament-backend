import { Exclude } from 'class-transformer';
import { UserEntity } from '../user.entity';

export class CreateUserDTO {
  name: string;

  surname: string;

  email: string;

  password: string;

  confirm_password: string;
}

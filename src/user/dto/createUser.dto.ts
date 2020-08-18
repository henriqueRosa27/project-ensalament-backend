import { Exclude } from 'class-transformer';

export class CreateUserDTO {
  name: string;

  surname: string;

  email: string;

  password: string;

  @Exclude()
  confirm_password: string;
}

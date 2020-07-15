import { RoleDTO } from 'src/auth/dto/role.dto';

export class UserDTO {
  id: number;

  name: string;

  surname: string;

  email: string;

  role: RoleDTO;
}

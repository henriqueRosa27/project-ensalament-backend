import { UserDTO } from 'src/user/dto/user.dto';

export class RoleDTO {
  id: string;

  name: string;

  user: UserDTO[];
}

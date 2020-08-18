import { UserDTO } from 'src/user/dto/user.dto';

export class RoleDTO {
  id: number;

  name: string;

  user: UserDTO[];
}

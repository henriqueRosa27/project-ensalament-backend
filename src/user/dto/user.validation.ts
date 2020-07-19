import * as Yup from 'yup';
import { UserService } from '../user.service';
import { UserEntity } from '../user.entity';
import { Repository } from 'typeorm';

export const createUserValidation = Yup.object({
  name: Yup.string()
    .required()
    .min(4)
    .max(20),
  surname: Yup.string()
    .required()
    .min(4)
    .max(50),
  email: Yup.string()
    .required()
    .email()
    .max(100)
    .test('unique', 'E-mail já cadastrado', async value => {
      if (value) {
        const userService = new UserService(new Repository<UserEntity>());
        const user = await userService.getUserByEmail(value);
        return !user;
      }
      return true;
    }),
  password: Yup.string()
    .required()
    .min(8)
    .max(16),
  confirm_password: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Senha diferentes',
  ),
});

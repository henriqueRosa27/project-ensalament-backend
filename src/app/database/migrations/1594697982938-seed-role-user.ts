import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { RoleEntity } from 'src/auth/roles.entity';
import { UserEntity } from 'src/user/user.entity';

export class seedRoleUser1594697982938 implements MigrationInterface {
  name = 'seedRoleUser1594697982938';
  public async up(queryRunner: QueryRunner): Promise<void> {
    const role = new RoleEntity();
    role.name = 'admin';

    const savedRole = await queryRunner.connection.manager.save(role);

    const user = new UserEntity();

    user.role = savedRole;
    user.name = 'admin';
    user.surname = 'admin';
    user.email = 't@t.com';
    user.password = '123456798!';
    user.active = true;

    await queryRunner.connection.manager.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //not implemented
  }
}

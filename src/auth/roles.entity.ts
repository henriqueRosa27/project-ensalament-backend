import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';

@Entity('role')
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name' })
  name: string;

  @OneToMany(
    () => UserEntity,
    user => user.role,
  )
  users: UserEntity[];
}

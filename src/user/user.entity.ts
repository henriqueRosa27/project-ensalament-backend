import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as argon2 from 'argon2';
import { Exclude } from 'class-transformer';
import { OneToMany } from 'typeorm';
import { RoleEntity } from 'src/auth/roles.entity';
import { JoinColumn } from 'typeorm';
import { ManyToOne } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'surname' })
  surname: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'password' })
  @Exclude()
  password: string;

  @ManyToOne(
    type => RoleEntity,
    role => role.user,
  )
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await argon2.hash(this.password);
  }
}

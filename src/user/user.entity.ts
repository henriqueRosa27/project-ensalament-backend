import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as argon2 from 'argon2';
import { Exclude } from 'class-transformer';
import { RoleEntity } from 'src/auth/roles.entity';
import { JoinColumn } from 'typeorm';
import { ManyToOne } from 'typeorm';
import { BeforeUpdate } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'surname' })
  surname: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'password' })
  @Exclude()
  password: string;

  @Column({ name: 'active' })
  active: boolean;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updateAt: Date;

  @ManyToOne(
    () => RoleEntity,
    role => role.users,
  )
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await argon2.hash(this.password);
  }

  @BeforeInsert()
  updateCreatedAt(): void {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  updateUpdatedDate(): void {
    this.updateAt = new Date();
  }
}

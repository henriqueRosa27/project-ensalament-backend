import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as argon2 from 'argon2';
import { Exclude } from 'class-transformer';

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

  @Column({ name: 'password', select: false })
  @Exclude({ toPlainOnly: true })
  password: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await argon2.hash(this.password);
  }
}

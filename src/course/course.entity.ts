import { TeamEntity } from 'src/team/team.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';

@Entity('course')
export class CourseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'active' })
  active: boolean;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updateAt: Date;

  @OneToMany(
    () => TeamEntity,
    room => room.course,
  )
  teams: TeamEntity[];

  @BeforeInsert()
  updateCreatedAt(): void {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  updateUpdatedDate(): void {
    this.updateAt = new Date();
  }
}

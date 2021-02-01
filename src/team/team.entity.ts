import { CourseEntity } from 'src/course/course.entity';
import { EnsalamentEntity } from 'src/ensalament/ensalament.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('team')
export class TeamEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'pref_lab' })
  prefLab: boolean;

  @Column({ name: 'number_students' })
  numberStudents: number;

  @Column({ name: 'active' })
  active: boolean;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updateAt: Date;

  @ManyToOne(
    () => CourseEntity,
    course => course.teams,
  )
  @JoinColumn({ name: 'course_id' })
  course: CourseEntity;

  @Column({ name: 'course_id', select: false })
  courseId: string;

  @BeforeInsert()
  updateCreatedAt(): void {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  updateUpdatedDate(): void {
    this.updateAt = new Date();
  }
}

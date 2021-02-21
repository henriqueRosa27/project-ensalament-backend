import { CourseEntity } from 'src/course/course.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
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

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    name: 'updated_at',
  })
  updateAt: Date;

  @ManyToOne(
    () => CourseEntity,
    course => course.teams,
  )
  @JoinColumn({ name: 'course_id' })
  course: CourseEntity;

  @Column({ name: 'course_id', select: false })
  courseId: string;
}

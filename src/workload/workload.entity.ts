import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity('workload')
export class WorkloadEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'value' })
  value: number;

  @Column({ name: 'active' })
  active: boolean;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updateAt: Date;

  @BeforeInsert()
  updateCreatedAt(): void {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  updateUpdatedDate(): void {
    this.updateAt = new Date();
  }
}

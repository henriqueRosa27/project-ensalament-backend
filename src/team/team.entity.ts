import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity('team')
export class TeamEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

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

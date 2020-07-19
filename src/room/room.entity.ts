import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { BuildingEntity } from 'src/building/building.entity';

@Entity('room')
export class RoomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'active' })
  active: boolean;

  @ManyToOne(
    type => BuildingEntity,
    building => building.rooms,
  )
  @JoinColumn({ name: 'building_id' })
  building: BuildingEntity;

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

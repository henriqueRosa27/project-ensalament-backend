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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'capacity' })
  capacity: number;

  @Column({ name: 'is_lab' })
  isLab: boolean;

  @Column({ name: 'active' })
  active: boolean;

  @ManyToOne(
    () => BuildingEntity,
    building => building.rooms,
  )
  @JoinColumn({ name: 'building_id' })
  building: BuildingEntity;

  @Column({ name: 'building_id', select: false })
  buildingId: string;

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

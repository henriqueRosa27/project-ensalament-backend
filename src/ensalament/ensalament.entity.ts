import { RoomEntity } from 'src/room/room.entity';
import { TeamEntity } from 'src/team/team.entity';
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
import { EnsalamentRoomEntity } from './virtual/ensalament-room.entity';

@Entity('ensalament')
export class EnsalamentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'week_day' })
  week: number;

  @Column({ name: 'shift' })
  shift: number;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updateAt: Date;

  @Column({ name: 'active' })
  active: boolean;

  @OneToMany(
    () => EnsalamentRoomEntity,
    ensalamentRoom => ensalamentRoom.ensalament,
    { cascade: true, eager: true },
  )
  ensalamentRooms: EnsalamentRoomEntity[];

  @BeforeInsert()
  updateCreatedAt(): void {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  updateUpdatedDate(): void {
    this.updateAt = new Date();
  }
}

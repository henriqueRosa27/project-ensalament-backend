import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
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

  @Column({ name: 'active' })
  active: boolean;

  @OneToMany(
    () => EnsalamentRoomEntity,
    ensalamentRoom => ensalamentRoom.ensalament,
    { cascade: true, eager: true },
  )
  ensalamentRooms: EnsalamentRoomEntity[];

  number: number;
  teams: number;
}

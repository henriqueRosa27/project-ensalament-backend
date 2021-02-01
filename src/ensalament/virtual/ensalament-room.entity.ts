import { RoomEntity } from 'src/room/room.entity';
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
import { EnsalamentEntity } from '../ensalament.entity';
import { EnsalamentRoomTeamEntity } from './ensalament-room-team.entity';

@Entity('ensalament_room')
export class EnsalamentRoomEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => EnsalamentEntity,
    ensalament => ensalament.ensalamentRooms,
    {primary: true}
  )
  @JoinColumn({ name: 'ensalament_id' })
  ensalament: EnsalamentEntity;

  @Column({ name: 'ensalament_id', select: false })
  ensalamentId: string;

  @ManyToOne(() => RoomEntity)
  @JoinColumn({ name: 'room_id' })
  room: RoomEntity;

  @Column({ name: 'room_id', select: false })
  roomId: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updateAt: Date;

  @OneToMany(
    () => EnsalamentRoomTeamEntity,
    ensalamentRoomTeam => ensalamentRoomTeam.ensalamentRoom,
    { cascade: true, eager: true },
  )
  ensalamentRoomTeams: EnsalamentRoomTeamEntity[];

  @BeforeInsert()
  updateCreatedAt(): void {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  updateUpdatedDate(): void {
    this.updateAt = new Date();
  }
}

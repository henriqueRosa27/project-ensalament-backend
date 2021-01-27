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
} from 'typeorm';

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

  @ManyToOne(
    () => TeamEntity,
    team => team.ensalements,
  )
  @JoinColumn({ name: 'team_id' })
  team: TeamEntity;

  @Column({ name: 'team_id', select: false })
  teamId: string;

  @ManyToOne(
    () => RoomEntity,
    room => room.ensalements,
  )
  @JoinColumn({ name: 'room_id' })
  room: RoomEntity;

  @Column({ name: 'room_id', select: false })
  roomId: string;

  @BeforeInsert()
  updateCreatedAt(): void {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  updateUpdatedDate(): void {
    this.updateAt = new Date();
  }
}

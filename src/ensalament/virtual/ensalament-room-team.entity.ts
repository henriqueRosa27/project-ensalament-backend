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
import { EnsalamentRoomEntity } from './ensalament-room.entity';

@Entity('ensalament_room_team')
export class EnsalamentRoomTeamEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => EnsalamentRoomEntity,
    ensalamentRoom => ensalamentRoom.ensalamentRoomTeams,
    { primary: true },
  )
  @JoinColumn({ name: 'ensalament_room_id' })
  ensalamentRoom: EnsalamentRoomEntity;

  @Column({ name: 'ensalament_room_id', select: false })
  ensalamentRoomId: string;

  @ManyToOne(() => TeamEntity)
  @JoinColumn({ name: 'team_id' })
  team: TeamEntity;

  @Column({ name: 'team_id' })
  teamId: string;

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

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEnsalamentDTO } from '../dto/create-ensalament.dto';
import { EnsalamentEntity } from '../ensalament.entity';
import { EnsalamentRoomTeamEntity } from '../virtual/ensalament-room-team.entity';
import { EnsalamentRoomEntity } from '../virtual/ensalament-room.entity';

export class CreateEnsalamentService {
  constructor(
    @InjectRepository(EnsalamentEntity)
    private readonly repEnsalament: Repository<EnsalamentEntity>,
  ) {}

  dto: CreateEnsalamentDTO;
  ensalament: EnsalamentEntity;

  async create(dto: CreateEnsalamentDTO): Promise<EnsalamentEntity> {
    this.dto = dto;
    this.ensalament = await this.repEnsalament.findOne({
      where: { week: dto.week, shift: dto.shift },
    });

    if (!this.ensalament) {
      this.ensalament = new EnsalamentEntity();
      this.ensalament.week = dto.week;
      this.ensalament.shift = dto.shift;
      this.ensalament.active = true;

      this.ensalament.ensalamentRooms = this.converToNewRoom();
    } else {
      const newRooms = this.converToNewRoom();
      this.ensalament.ensalamentRooms = [
        ...this.ensalament.ensalamentRooms,
        ...newRooms,
      ];
    }

    return this.repEnsalament.save(this.ensalament);
  }

  converToNewRoom(): EnsalamentRoomEntity[] {
    return this.dto.rooms.map(room => {
      const ensalamentRoom = new EnsalamentRoomEntity();
      ensalamentRoom.roomId = room.id;

      if (
        this.ensalament &&
        this.ensalament.ensalamentRooms.some(({ id }) => id === room.id)
      ) {
        this.ensalament.ensalamentRooms.filter(({ id }) => id != room.id);
      }

      ensalamentRoom.ensalamentRoomTeams = room.teams.map(team => {
        const ensalamentRoomTeam = new EnsalamentRoomTeamEntity();

        ensalamentRoomTeam.teamId = team;

        return ensalamentRoomTeam;
      });

      return ensalamentRoom;
    });
  }
}

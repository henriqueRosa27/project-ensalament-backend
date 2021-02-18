import { InjectRepository } from '@nestjs/typeorm';
import { BuildingEntity } from 'src/building/building.entity';
import { TeamEntity } from 'src/team/team.entity';
import { Repository } from 'typeorm';
import { Ensalament } from '../dto/ensalament.dto';
import { EnsalamentEntity } from '../ensalament.entity';

export class GetByIdEnsalamentService {
  constructor(
    @InjectRepository(EnsalamentEntity)
    private readonly repEnsalament: Repository<EnsalamentEntity>,
    @InjectRepository(BuildingEntity)
    private readonly repBuilding: Repository<BuildingEntity>,
    @InjectRepository(TeamEntity)
    private readonly repTeam: Repository<TeamEntity>,
  ) {}

  async getById(id: string): Promise<Ensalament> {
    const data = await this.repEnsalament.findOne(id);

    const roomIdSql = this.getsqlRoom(id);

    const buildings = await this.repBuilding
      .createQueryBuilder('building')
      .innerJoinAndSelect('building.rooms', 'rooms')
      .where(`rooms.id IN (${roomIdSql})`)
      .orderBy('building.createdAt', 'ASC')
      .getMany();

    const teamsidsSql = this.getsqlTeam(id);

    const teams = await this.repTeam
      .createQueryBuilder('team')
      .innerJoinAndSelect('team.course', 'course')
      .where(`team.id IN (${teamsidsSql})`)
      .orderBy('team.createdAt', 'ASC')
      .getMany();

    const ensalament = new Ensalament();

    ensalament.shift = data.shift;
    ensalament.week = data.week;

    ensalament.buildings = buildings.map(({ rooms, ...building }) => ({
      ...building,
      rooms: rooms.map(room => {
        const teamsId = data.ensalamentRooms
          .filter(({ roomId }) => roomId == room.id)
          .map(({ ensalamentRoomTeams }) => ensalamentRoomTeams)
          .flat()
          .map(({ teamId }) => teamId);
          
        return {
          ...room,
          teams: teams.filter(team => teamsId.some(t => t === team.id)),
        };
      }),
    })) as any;

    return ensalament;
  }

  getsqlRoom(id: string): string {
    return `select er.room_id 
              from ensalament e 
                inner join ensalament_room er on er.ensalament_id = e.id 
              where e.id = '${id}'`;
  }

  getsqlTeam(id: string): string {
    return `select ert.team_id 
              from ensalament e 
                inner join ensalament_room er on er.ensalament_id = e.id
                inner join ensalament_room_team ert on ert.ensalament_room_id  = er.id 
              where e.id = '${id}'`;
  }
}

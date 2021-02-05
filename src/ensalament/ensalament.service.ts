import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuildingDTO } from 'src/building/dto/building.dto';
import { CourseDTO } from 'src/course/dto/course.dto';
import { RoomEntity } from 'src/room/room.entity';
import { TeamEntity } from 'src/team/team.entity';
import { Repository } from 'typeorm';
import { CreateEnsalamentDTO } from './dto/create-ensalament.dto';
import { GenerateEnsalament } from './dto/ensalament.dto';
import { EnsalamentEntity } from './ensalament.entity';
import { CreateEnsalamentService } from './services/create.service';
import { GenerateEnsalamentService } from './services/generate.service';
import { GetDatasService } from './services/get-datas.service';

@Injectable()
export class EnsalamentService {
  constructor(
    @InjectRepository(EnsalamentEntity)
    private readonly repEnsalament: Repository<EnsalamentEntity>,
    @InjectRepository(RoomEntity)
    private readonly repRoom: Repository<RoomEntity>,
    @InjectRepository(TeamEntity)
    private readonly repTeam: Repository<TeamEntity>,
    private readonly serviceDatas: GetDatasService,
  ) {}

  async get(): Promise<EnsalamentEntity[]> {
    let result = await this.repEnsalament.find();

    result = result.map(data => ({
      ...data,
      ensalamentRooms: null,
      rooms: data.ensalamentRooms.length,
      teams: data.ensalamentRooms
        .map(({ ensalamentRoomTeams }) => ensalamentRoomTeams)
        .flat().length,
    }));

    return result;
  }

  async getAlBuildings(week: number, shift: number): Promise<BuildingDTO[]> {
    return this.serviceDatas.getAlBuildings(week, shift);
  }

  async getAllCourses(week: number, shift: number): Promise<CourseDTO[]> {
    return this.serviceDatas.getAllCourses(week, shift);
  }

  async generate(
    roomsIds: string[],
    teamsIds: string[],
  ): Promise<GenerateEnsalament> {
    const rooms = await this.repRoom
      .createQueryBuilder('room')
      .innerJoinAndSelect('room.building', 'building')
      .where('room.active = true')
      .andWhere('building.active = true')
      .andWhereInIds(roomsIds)
      .getMany();

    const teams = await this.repTeam
      .createQueryBuilder('team')
      .whereInIds(teamsIds)
      .innerJoinAndSelect('team.course', 'course')
      .andWhere('team.active = true')
      .andWhere('course.active = true')
      .getMany();

    const ensalamentService = new GenerateEnsalamentService(rooms, teams);

    return ensalamentService.generate();
  }

  async create(dto: CreateEnsalamentDTO): Promise<EnsalamentEntity> {
    const createService = new CreateEnsalamentService(this.repEnsalament);
    return createService.create(dto);
  }
}

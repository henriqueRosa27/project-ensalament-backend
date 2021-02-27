import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { TeamEntity } from './team.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { TeamDTO } from './dto/team.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamEntity)
    private readonly rep: Repository<TeamEntity>,
  ) {}

  async getAll(): Promise<TeamDTO[]> {
    const teams = await this.rep.find({
      relations: ['course'],
      order: { createdAt: 'ASC' },
    });
    return plainToClass(TeamDTO, teams);
  }

  async findById(id: string): Promise<TeamDTO> {
    const team = await this.rep.findOne({
      where: { id, active: true },
      relations: ['course'],
    });

    if (!team)
      throw new HttpException(
        { error: 'Turma não existe' },
        HttpStatus.NOT_FOUND,
      );
    return plainToClass(TeamDTO, team);
  }

  async findByIdActive(id: string): Promise<TeamDTO> {
    const qb = await getRepository(TeamEntity);

    const team = await qb.findOne({ where: { id, active: true } });

    return plainToClass(TeamDTO, team);
  }

  async create(dto: TeamDTO): Promise<TeamDTO> {
    const team = new TeamEntity();

    team.name = dto.name;
    team.active = true;
    team.numberStudents = dto.number_students;
    team.prefLab = dto.prefLab ? dto.prefLab : false;
    team.courseId = dto.course_id;
    team.createdAt = new Date();

    const entity = await this.rep.save(team);

    return plainToClass(TeamDTO, entity);
  }

  async update(dto: TeamDTO, id: string): Promise<TeamDTO> {
    const team = await plainToClass(TeamEntity, await this.findById(id));

    team.name = dto.name;
    team.courseId = dto.course_id;
    team.numberStudents = dto.number_students;

    const entity = await this.rep.save(team);

    return plainToClass(TeamDTO, entity);
  }

  async delete(id: string): Promise<null> {
    const team = await plainToClass(TeamEntity, await this.findById(id));

    team.active = false;

    await this.rep.save(team);

    return null;
  }

  async reactive(id: string): Promise<TeamDTO> {
    const team = await this.rep.findOne({ where: { id } });

    if (!team)
      throw new HttpException(
        { error: 'Turma não existe' },
        HttpStatus.NOT_FOUND,
      );

    team.active = true;

    await this.rep.save(team);

    return plainToClass(TeamDTO, team);
  }
}

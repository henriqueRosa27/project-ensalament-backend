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
    const teams = await this.rep.find();
    return plainToClass(TeamDTO, teams);
  }

  async findById(id: number): Promise<TeamDTO> {
    const team = await this.rep.findOne({ where: { id, active: true } });

    if (!team)
      throw new HttpException(
        { error: 'Turma não existe' },
        HttpStatus.NOT_FOUND,
      );
    return plainToClass(TeamDTO, team);
  }

  async findByIdActive(id: number): Promise<TeamDTO> {
    const qb = await getRepository(TeamEntity);

    const team = await qb.findOne({ where: { id, active: true } });

    return plainToClass(TeamDTO, team);
  }

  async create(dto: TeamDTO): Promise<TeamDTO> {
    // const team = new TeamEntity();

    // team.name = dto.name;
    // team.active = true;
    // team.prefLab = dto.prefLab? dto.prefLab: false;

    // const entity = await this.rep.save(team);

    // return plainToClass(TeamDTO, entity);
    return dto
  }

  async update(dto: TeamDTO, id: number): Promise<TeamDTO> {
    const team = await plainToClass(
      TeamEntity,
      await this.findById(id),
    );

    team.name = dto.name;

    const entity = await this.rep.save(team);

    return plainToClass(TeamDTO, entity);
  }

  async delete(id: number): Promise<null> {
    const team = await plainToClass(
      TeamEntity,
      await this.findById(id),
    );

    team.active = false;

    await this.rep.save(team);

    return null;
  }

  async reactive(id: number): Promise<TeamDTO> {
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

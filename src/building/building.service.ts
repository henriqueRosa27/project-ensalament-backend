import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuildingEntity } from './building.entity';
import { Repository, getRepository } from 'typeorm';
import { BuildingDTO } from './dto/building.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class BuildingService {
  constructor(
    @InjectRepository(BuildingEntity)
    private readonly rep: Repository<BuildingEntity>,
  ) {}

  async getAll(): Promise<BuildingDTO[]> {
    const building = await this.rep.find({ order: { createdAt: 'ASC' } });
    return plainToClass(BuildingDTO, building);
  }

  async getAllActive(): Promise<BuildingDTO[]> {
    const building = await this.rep.find({
      where: {
        active: true,
      },
    });
    return plainToClass(BuildingDTO, building);
  }

  async findById(id: string): Promise<BuildingDTO> {
    const building = await this.rep.findOne({ where: { id, active: true } });

    if (!building)
      throw new HttpException(
        { error: 'Prédio não existe' },
        HttpStatus.NOT_FOUND,
      );
    return plainToClass(BuildingDTO, building);
  }

  async findByIdActive(id: string): Promise<BuildingDTO> {
    const qb = await getRepository(BuildingEntity);

    const building = await qb.findOne({ where: { id, active: true } });

    return plainToClass(BuildingDTO, building);
  }

  async create(dto: BuildingDTO): Promise<BuildingDTO> {
    const building = new BuildingEntity();

    building.name = dto.name;
    building.active = true;

    const entity = await this.rep.save(building);

    return plainToClass(BuildingDTO, entity);
  }

  async update(dto: BuildingDTO, id: string): Promise<BuildingDTO> {
    const building = await plainToClass(
      BuildingEntity,
      await this.findById(id),
    );

    building.name = dto.name;

    const entity = await this.rep.save(building);

    return plainToClass(BuildingDTO, entity);
  }

  async delete(id: string): Promise<null> {
    const building = await plainToClass(
      BuildingEntity,
      await this.findById(id),
    );

    building.active = false;

    await this.rep.save(building);

    return null;
  }

  async reactive(id: string): Promise<BuildingDTO> {
    const building = await this.rep.findOne({ where: { id } });

    if (!building)
      throw new HttpException(
        { error: 'Prédio não existe' },
        HttpStatus.NOT_FOUND,
      );

    building.active = true;

    await this.rep.save(building);

    return plainToClass(BuildingDTO, building);
  }
}

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuildingEntity } from './building.entity';
import { Repository } from 'typeorm';
import { BuildingDTO } from './dto/building.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class BuildingService {
  constructor(
    @InjectRepository(BuildingEntity)
    private readonly rep: Repository<BuildingEntity>,
  ) {}

  async getAll(): Promise<BuildingDTO[]> {
    const building = await this.rep.find();
    return plainToClass(BuildingDTO, building);
  }

  async create(dto: BuildingDTO): Promise<BuildingDTO> {
    const building = new BuildingEntity();

    building.name = dto.name;
    building.active = true;

    const entity = await this.rep.save(building);

    return plainToClass(BuildingDTO, entity);
  }

  async update(dto: BuildingDTO, id: number): Promise<BuildingDTO> {
    const building = await this.rep.findOne({ where: { id } });

    if (!building)
      throw new HttpException(
        { error: 'Building não existe' },
        HttpStatus.NOT_FOUND,
      );

    building.name = dto.name;

    const entity = await this.rep.save(building);

    return plainToClass(BuildingDTO, entity);
  }

  async delete(id: number): Promise<null> {
    const building = await this.rep.findOne({ where: { id, active: true } });

    if (!building)
      throw new HttpException(
        { error: 'Building não existe' },
        HttpStatus.NOT_FOUND,
      );

    building.active = false;

    await this.rep.save(building);

    return null;
  }

  async reactive(id: number): Promise<BuildingDTO> {
    const building = await this.rep.findOne({ where: { id } });

    if (!building)
      throw new HttpException(
        { error: 'Building não existe' },
        HttpStatus.NOT_FOUND,
      );

    building.active = true;

    await this.rep.save(building);

    return null;
  }
}

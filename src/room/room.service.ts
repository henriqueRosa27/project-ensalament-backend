import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from './room.entity';
import { Repository } from 'typeorm';
import { RoomDTO } from './dto/room.dto';
import { plainToClass } from 'class-transformer';
import { CreateUpdateRoomDTO } from './dto/create-update-room.dto';
import { BuildingEntity } from 'src/building/building.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly rep: Repository<RoomEntity>,
  ) {}

  async getAll(): Promise<RoomDTO[]> {
    const rooms = await this.rep.find({ relations: ['building'] });
    return plainToClass(RoomDTO, rooms);
  }

  async findById(id: number): Promise<RoomDTO> {
    const room = await this.rep.findOne({
      where: { id, active: true },
      relations: ['building'],
    });

    if (!room)
      throw new HttpException(
        { error: 'Sala não existe' },
        HttpStatus.NOT_FOUND,
      );
    return plainToClass(RoomDTO, room);
  }

  async create(dto: CreateUpdateRoomDTO): Promise<RoomDTO> {
    const room = new RoomEntity();
    const building = new BuildingEntity();

    building.id = dto.building_id;

    room.name = dto.name;
    room.active = true;
    room.isLab = dto.is_lab ? dto.is_lab : false;
    room.building = building;

    const entity = await this.rep.save(room);

    return plainToClass(RoomDTO, entity);
  }

  async update(dto: CreateUpdateRoomDTO, id: number): Promise<RoomDTO> {
    const room = plainToClass(RoomEntity, await this.findById(id));
    room.name = dto.name;

    const building = new BuildingEntity();

    building.id = dto.building_id;

    room.building = building;

    const entity = await this.rep.save(room);

    return plainToClass(RoomDTO, entity);
  }

  async delete(id: number): Promise<null> {
    const room = plainToClass(RoomEntity, await this.findById(id));

    room.active = false;

    await this.rep.save(room);

    return null;
  }

  async reactive(id: number): Promise<RoomDTO> {
    const room = await this.rep.findOne({ where: { id } });

    if (!room)
      throw new HttpException(
        { error: 'Sala não existe' },
        HttpStatus.NOT_FOUND,
      );

    room.active = true;

    await this.rep.save(room);

    return plainToClass(RoomDTO, room);
  }
}

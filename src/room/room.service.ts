import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from './room.entity';
import { Repository } from 'typeorm';
import { RoomDTO } from './dto/room.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly rep: Repository<RoomEntity>,
  ) {}

  async getAll(): Promise<RoomDTO[]> {
    const rooms = await this.rep.find();
    return plainToClass(RoomDTO, rooms);
  }
}

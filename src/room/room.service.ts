import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from './room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly rep: Repository<RoomEntity>,
  ) {}

  async getAll(): Promise<any> {
    //const building = await this.rep.find();
    //return plainToClass(BuildingDTO, building);
    return await this.rep.find();
  }
}

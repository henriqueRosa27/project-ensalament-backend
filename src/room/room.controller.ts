import { Controller, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { RoomDTO } from './dto/room.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly service: RoomService) {}

  @SetMetadata('roles', ['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getAll(): Promise<RoomDTO[]> {
    return this.service.getAll();
  }
}

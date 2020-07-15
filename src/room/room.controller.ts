import { Controller, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('room')
export class RoomController {
  constructor(private readonly service: RoomService) {}

  @SetMetadata('roles', ['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getAll(): Promise<any> {
    return this.service.getAll();
  }
}

import {
  Controller,
  Get,
  SetMetadata,
  UseGuards,
  UsePipes,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoomService } from './room.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { RoomDTO } from './dto/room.dto';
import { CreateUpdateRoomDTO } from './dto/create-update-room.dto';
import { JoiValidationPipe } from 'src/app/shared/pipe/validation.pipe';
import { createUpdateBuildingValidation } from './dto/room.validation';

@ApiTags('room')
@Controller('room')
export class RoomController {
  constructor(private readonly service: RoomService) {}

  @SetMetadata('roles', ['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getAll(): Promise<RoomDTO[]> {
    return this.service.getAll();
  }

  @SetMetadata('roles', ['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async finById(@Param('id') id: string): Promise<RoomDTO> {
    return await this.service.findById(id);
  }

  @SetMetadata('roles', ['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new JoiValidationPipe(createUpdateBuildingValidation))
  @Post()
  async create(@Body() dto: CreateUpdateRoomDTO): Promise<RoomDTO> {
    return await this.service.create(dto);
  }

  @SetMetadata('roles', ['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new JoiValidationPipe(createUpdateBuildingValidation))
  @Put(':id')
  async update(
    @Body() dto: CreateUpdateRoomDTO,
    @Param('id') id: string,
  ): Promise<RoomDTO> {
    return await this.service.update(dto, id);
  }

  @SetMetadata('roles', ['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<null> {
    return await this.service.delete(id);
  }

  @SetMetadata('roles', ['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async reactive(@Param('id') id: string): Promise<RoomDTO> {
    return await this.service.reactive(id);
  }
}

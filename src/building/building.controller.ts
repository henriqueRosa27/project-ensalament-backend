import {
  Controller,
  Get,
  Post,
  Body,
  SetMetadata,
  UseGuards,
  UsePipes,
  Param,
  Put,
  ParseIntPipe,
  Delete,
  Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BuildingService } from './building.service';
import { BuildingDTO } from './dto/building.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { JoiValidationPipe } from 'src/app/shared/pipe/validation.pipe';
import { buildingValidation } from './dto/building.validation';

@ApiTags('building')
@Controller('building')
export class BuildingController {
  constructor(private readonly service: BuildingService) {}

  @SetMetadata('roles', ['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getAll(): Promise<BuildingDTO[]> {
    return this.service.getAll();
  }

  @SetMetadata('roles', ['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("/active")
  async getAllActivies(): Promise<BuildingDTO[]> {
    return this.service.getAllActive();
  }

  @SetMetadata('roles', ['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async finById(@Param('id', ParseIntPipe) id: number): Promise<BuildingDTO> {
    return await this.service.findById(id);
  }

  @SetMetadata('roles', ['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new JoiValidationPipe(buildingValidation))
  @Post()
  async create(@Body() dto: BuildingDTO): Promise<BuildingDTO> {
    return await this.service.create(dto);
  }

  @SetMetadata('roles', ['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new JoiValidationPipe(buildingValidation))
  @Put(':id')
  async update(
    @Body() dto: BuildingDTO,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BuildingDTO> {
    return await this.service.update(dto, id);
  }

  @SetMetadata('roles', ['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<null> {
    return await this.service.delete(id);
  }

  @SetMetadata('roles', ['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async reactive(@Param('id', ParseIntPipe) id: number): Promise<BuildingDTO> {
    return await this.service.reactive(id);
  }
}

import { Controller, SetMetadata, UseGuards, Get, UsePipes, Post, Body, Put, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { TeamService } from './team.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { TeamDTO } from './dto/team.dto';
import { JoiValidationPipe } from 'src/app/shared/pipe/validation.pipe';
import { teamValidation } from './dto/team.validation';

@Controller('team')
export class TeamController {
  constructor(private readonly service: TeamService) {}

  @SetMetadata('roles', ['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getAll(): Promise<TeamDTO[]> {
    return this.service.getAll();
  }

  @SetMetadata('roles', ['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new JoiValidationPipe(teamValidation))
  @Post()
  async create(@Body() dto: TeamDTO): Promise<TeamDTO> {
    return await this.service.create(dto);
  }

  @SetMetadata('roles', ['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new JoiValidationPipe(teamValidation))
  @Put(':id')
  async update(
    @Body() dto: TeamDTO,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TeamDTO> {
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
  async reactive(@Param('id', ParseIntPipe) id: number): Promise<TeamDTO> {
    return await this.service.reactive(id);
  }
}

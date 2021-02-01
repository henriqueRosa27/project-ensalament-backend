import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  SetMetadata,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JoiValidationPipe } from 'src/app/shared/pipe/validation.pipe';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { BuildingDTO } from 'src/building/dto/building.dto';
import { CourseDTO } from 'src/course/dto/course.dto';
import { CreateEnsalamentDTO } from './dto/create-ensalament.dto';
import {
  GenerateEnsalament,
  RequestGenerateEnsalament,
} from './dto/ensalament.dto';
import {
  createEnsalamentValidation,
  generateEnsalamentValidation,
} from './dto/ensalament.validation';
import { EnsalamentService } from './ensalament.service';

@Controller('ensalament')
export class EnsalamentController {
  constructor(private readonly service: EnsalamentService) {}

  @SetMetadata('roles', ['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/buildings/:week?/:shift?')
  async getAllBuildings(
    @Param('week') week: number,
    @Param('shift') shift: number,
  ): Promise<BuildingDTO[]> {
    return this.service.getAlBuildings(week, shift);
  }

  @SetMetadata('roles', ['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/courses/:week/:shift')
  async getAllCourses(
    @Param('week') week: number,
    @Param('shift') shift: number,
  ): Promise<CourseDTO[]> {
    return this.service.getAllCourses(week, shift);
  }

  // @SetMetadata('roles', ['admin'])
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new JoiValidationPipe(generateEnsalamentValidation))
  @Post('/generate')
  async generate(
    @Body() dto: RequestGenerateEnsalament,
  ): Promise<GenerateEnsalament> {
    return this.service.generate(dto.roomsIds, dto.teamsIds);
  }

  // @SetMetadata('roles', ['admin'])
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new JoiValidationPipe(createEnsalamentValidation))
  @Post('/')
  async create(@Body() dto: CreateEnsalamentDTO) {
    return this.service.create(dto);
  }
}

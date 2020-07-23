import { Controller, SetMetadata, UseGuards, Get, UsePipes, Post, Body, Put, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { CourseService } from './course.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { CourseDTO } from './dto/course.dto';
import { courseValidation } from './dto/course.validation';
import { JoiValidationPipe } from 'src/app/shared/pipe/validation.pipe';

@Controller('course')
export class CourseController {
  constructor(private readonly service: CourseService) {}

  @SetMetadata('roles', ['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getAll(): Promise<CourseDTO[]> {
    return this.service.getAll();
  }

  @SetMetadata('roles', ['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new JoiValidationPipe(courseValidation))
  @Post()
  async create(@Body() dto: CourseDTO): Promise<CourseDTO> {
    return await this.service.create(dto);
  }

  @SetMetadata('roles', ['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new JoiValidationPipe(courseValidation))
  @Put(':id')
  async update(
    @Body() dto: CourseDTO,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CourseDTO> {
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
  async reactive(@Param('id', ParseIntPipe) id: number): Promise<CourseDTO> {
    return await this.service.reactive(id);
  }
}

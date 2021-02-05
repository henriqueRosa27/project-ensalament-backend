import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CourseEntity } from './course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { CourseDTO } from './dto/course.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly rep: Repository<CourseEntity>,
  ) {}

  async getAll(): Promise<CourseDTO[]> {
    const courses = await this.rep.find({ order: { createdAt: 'ASC' } });
    return plainToClass(CourseDTO, courses);
  }

  async getAllActive(): Promise<CourseDTO[]> {
    const courses = await this.rep.find({
      where: {
        active: true,
      },
    });
    return plainToClass(CourseDTO, courses);
  }

  async findById(id: string): Promise<CourseDTO> {
    const course = await this.rep.findOne({ where: { id, active: true } });

    if (!course)
      throw new HttpException(
        { error: 'Curso não existe' },
        HttpStatus.NOT_FOUND,
      );
    return plainToClass(CourseDTO, course);
  }

  async findByIdActive(id: string): Promise<CourseDTO> {
    const qb = await getRepository(CourseEntity);

    const course = await qb.findOne({ where: { id, active: true } });

    return plainToClass(CourseDTO, course);
  }

  async create(dto: CourseDTO): Promise<CourseDTO> {
    const course = new CourseEntity();

    course.name = dto.name;
    course.active = true;

    const entity = await this.rep.save(course);

    return plainToClass(CourseDTO, entity);
  }

  async update(dto: CourseDTO, id: string): Promise<CourseDTO> {
    const course = await plainToClass(CourseEntity, await this.findById(id));

    course.name = dto.name;

    const entity = await this.rep.save(course);

    return plainToClass(CourseDTO, entity);
  }

  async delete(id: string): Promise<null> {
    const course = await plainToClass(CourseEntity, await this.findById(id));

    course.active = false;

    await this.rep.save(course);

    return null;
  }

  async reactive(id: string): Promise<CourseDTO> {
    const course = await this.rep.findOne({ where: { id } });

    if (!course)
      throw new HttpException(
        { error: 'Prédio não existe' },
        HttpStatus.NOT_FOUND,
      );

    course.active = true;

    await this.rep.save(course);

    return plainToClass(CourseDTO, course);
  }
}

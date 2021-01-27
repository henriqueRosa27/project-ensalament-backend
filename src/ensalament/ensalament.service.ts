import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { BuildingEntity } from 'src/building/building.entity';
import { BuildingDTO } from 'src/building/dto/building.dto';
import { CourseEntity } from 'src/course/course.entity';
import { CourseDTO } from 'src/course/dto/course.dto';
import { RoomEntity } from 'src/room/room.entity';
import { TeamEntity } from 'src/team/team.entity';
import { Repository } from 'typeorm';
import { uuid } from 'uuidv4';
import { GenerateEnsalament } from './dto/ensalament.dto';
import { EnsalamentEntity } from './ensalament.entity';
import { GenerateEnsalamentService } from './generate.service';

@Injectable()
export class EnsalamentService {
  constructor(
    @InjectRepository(EnsalamentEntity)
    private readonly repEnsalament: Repository<EnsalamentEntity>,
    @InjectRepository(BuildingEntity)
    private readonly repBuilding: Repository<BuildingEntity>,
    @InjectRepository(CourseEntity)
    private readonly repCourse: Repository<CourseEntity>,
    @InjectRepository(RoomEntity)
    private readonly repRoom: Repository<RoomEntity>,
    @InjectRepository(TeamEntity)
    private readonly repTeam: Repository<TeamEntity>,
  ) {}

  async getAlBuildings(week: number, shift: number): Promise<BuildingDTO[]> {
    const buildingsDB = await this.repBuilding
      .createQueryBuilder('building')
      .where('building.active = true')
      .orderBy('building.createdAt', 'ASC')
      .getMany();

    const sqlEnsalament = this.getEnsalemntSql(week, shift, 'room_id');

    const buildings = new Array<BuildingEntity>();
    for (const building of buildingsDB) {
      building.rooms = await this.repRoom
        .createQueryBuilder('room')
        .where('room.active = true')
        .andWhere('room.building_id = :ID', { ID: building.id })
        .andWhere(`room.id NOT IN (${sqlEnsalament})`)
        .orderBy('room.createdAt', 'ASC')
        .getMany();

      buildings.push(building);
    }

    return plainToClass(BuildingDTO, buildings);
  }

  async getAllCourses(week: number, shift: number): Promise<CourseDTO[]> {
    const coursesDB = await this.repCourse
      .createQueryBuilder('course')
      .where('course.active = true')
      .orderBy('course.createdAt', 'ASC')
      .getMany();

    const sqlEnsalament = this.getEnsalemntSql(week, shift, 'team_id');

    const courses = new Array<CourseEntity>();

    for (const course of coursesDB) {
      course.teams = await this.repTeam
        .createQueryBuilder('team')
        .where('team.active = true')
        .andWhere('team.course_id = :ID', { ID: course.id })
        .andWhere(`team.id NOT IN (${sqlEnsalament})`)
        .orderBy('team.createdAt', 'ASC')
        .getMany();

      courses.push(course);
    }
    return plainToClass(CourseDTO, courses);
  }

  async generate(
    roomsIds: string[],
    teamsIds: string[],
  ): Promise<GenerateEnsalament> {
    const rooms = await this.repRoom
      .createQueryBuilder('room')
      .innerJoinAndSelect('room.building', 'building')
      .where('room.active = true')
      .andWhere('building.active = true')
      .andWhereInIds(roomsIds)
      .getMany();

    const teams = await this.repTeam
      .createQueryBuilder('team')
      .whereInIds(teamsIds)
      .innerJoinAndSelect('team.course', 'course')
      .andWhere('team.active = true')
      .andWhere('course.active = true')
      .getMany();

    const ensalamentService = new GenerateEnsalamentService(rooms, teams);

    return ensalamentService.generate();
  }

  getEnsalemntSql(week: number, shift: number, paremeter: string): string {
    let sqlEnsalament = this.repEnsalament.createQueryBuilder('ensalament');

    if (week) {
      sqlEnsalament = sqlEnsalament.where(`week_day = ${week} `);
    }

    if (week && shift) {
      sqlEnsalament = sqlEnsalament.andWhere(`shift = ${shift}`);
    } else if (shift) {
      sqlEnsalament = sqlEnsalament.where(`shift = ${shift}`);
    }

    return sqlEnsalament.select(paremeter).getSql();
  }
}

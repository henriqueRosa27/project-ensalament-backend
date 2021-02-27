import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from 'src/course/course.entity';
import { RoomEntity } from 'src/room/room.entity';
import { TeamEntity } from 'src/team/team.entity';
import { In, Repository } from 'typeorm';
import {
  EnsalamentDetail,
  RoomToDetail,
  TeamToDetail,
} from '../dto/ensalament.dto';
import { EnsalamentEntity } from '../ensalament.entity';

export class GetDetailsEnsalamentService {
  constructor(
    @InjectRepository(EnsalamentEntity)
    private readonly repEnsalament: Repository<EnsalamentEntity>,
    @InjectRepository(RoomEntity)
    private readonly repRoom: Repository<RoomEntity>,
    @InjectRepository(CourseEntity)
    private readonly repCourse: Repository<CourseEntity>,
  ) {
    this.ensalaments = new Array<EnsalamentDetail>();
  }

  private ensalaments: EnsalamentDetail[];
  private dataEnsalament: EnsalamentEntity[];
  private rooms: RoomEntity[];
  private courses: CourseEntity[];

  async getDetails(): Promise<EnsalamentDetail[]> {
    this.dataEnsalament = await this.repEnsalament.find({
      order: { week: 'ASC', shift: 'ASC' },
    });

    this.courses = await this.repCourse
      .createQueryBuilder('course')
      .innerJoinAndMapMany(
        'course.teams',
        TeamEntity,
        'team',
        'team.course_id = course.id',
      )
      .where(`team.id IN (${this.getsqlTeam()})`)
      .getMany();

    const roomsIds = this.dataEnsalament
      .map(({ ensalamentRooms }) => ensalamentRooms)
      .flat()
      .map(({ roomId }) => roomId);

    this.rooms = await this.repRoom.find({
      relations: ['building'],
      where: { id: In(roomsIds) },
    });

    this.mountEnsalamentDetail();

    return this.ensalaments;
  }

  mountEnsalamentDetail(): void {
    this.dataEnsalament.forEach(ensalamentData => {
      ensalamentData.ensalamentRooms.forEach(ensalamentRoom => {
        const room = this.rooms.find(r => r.id === ensalamentRoom.roomId);

        ensalamentRoom.ensalamentRoomTeams.forEach(ensalamentRoomTeam => {
          const course = this.courses.find(({ teams }) =>
            teams.some(t => t.id === ensalamentRoomTeam.teamId),
          );

          const team: CourseToSave = {
            ...course,
            team: course.teams.find(
              team => team.id === ensalamentRoomTeam.teamId,
            ),
          };

          if (team) {
            this.setEnsalamentData({
              course: team,
              room,
              week: ensalamentData.week,
              shift: ensalamentData.shift,
              ensalamentId: ensalamentData.id,
            });
          }
        });
      });
    });
  }

  setEnsalamentData({
    course,
    room,
    week,
    shift,
    ensalamentId,
  }: SetEnsalamentProp): void {
    if (this.ensalaments.length === 0) {
      const data = this.convertToEnsalament({
        course,
        room,
        week,
        shift,
        ensalamentId,
      });
      this.ensalaments.push(data);
    } else if (this.ensalaments.some(d => d.id === course.id)) {
      this.ensalaments = this.ensalaments.map(e => {
        if (e.id === course.id) {
          const data = this.convertToEnsalament({
            course,
            room,
            week,
            shift,
            ensalamentId,
          });

          return {
            ...e,
            teams: data.teams,
          };
        }
        return e;
      });
    } else {
      const data = this.convertToEnsalament({
        course,
        room,
        week,
        shift,
        ensalamentId,
      });
      this.ensalaments.push(data);
    }
  }

  convertToEnsalament({
    course,
    room,
    week,
    shift,
    ensalamentId,
  }: ConvertToEnsalamentProp): EnsalamentDetail {
    const team = this.ensalaments
      .map(({ teams }) => teams)
      ?.flat()
      .find(team => team.id === course.team.id);

    if (team) {
      team.rooms.push({ room, week, shift });
      const ensalament = this.ensalaments.find(ensalament =>
        ensalament.teams.some(t => t.id === team.id),
      );

      return {
        ...ensalament,
        teams: ensalament.teams.map(t => {
          if (t.id === team.id) return team;
          return t;
        }),
      };
    }

    const oldRooms =
      this.ensalaments
        .find(e => e.id === course.id)
        ?.teams?.find(t => t.id == course.team.id)?.rooms || [];

    const oldTeams =
      this.ensalaments.find(e => e.id === course.id)?.teams || [];

    const rooms: RoomToDetail[] = [...oldRooms, { room, week, shift }];
    const teams: TeamToDetail[] = [
      ...oldTeams,
      { ...course.team, rooms, ensalamentId },
    ];

    const ensalamentoDetail = {
      ...course,
      teams,
    };

    delete ensalamentoDetail.team;

    return ensalamentoDetail;
  }

  getsqlRoom(): string {
    return `select er.room_id 
              from ensalament e 
                inner join ensalament_room er on er.ensalament_id = e.id `;
  }

  getsqlTeam(): string {
    return `select ert.team_id 
              from ensalament e 
                inner join ensalament_room er on er.ensalament_id = e.id
                inner join ensalament_room_team ert on ert.ensalament_room_id  = er.id `;
  }

  validateToSetTeam(ensalament: EnsalamentDetail): boolean {
    return ensalament && !ensalament.teams && ensalament.teams.length > 0;
  }
}

class CourseToSave {
  team: TeamEntity;
  id: string;
  name: string;
  active: boolean;
  createdAt: Date;
  updateAt: Date;
}

type SetEnsalamentProp = {
  course: CourseToSave;
  room: RoomEntity;
  week: number;
  shift: number;
  ensalamentId: string;
};

type ConvertToEnsalamentProp = {
  course: CourseToSave;
  room: RoomEntity;
  week: number;
  shift: number;
  ensalamentId: string;
};

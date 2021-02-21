import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from 'src/course/course.entity';
import { RoomEntity } from 'src/room/room.entity';
import { TeamEntity } from 'src/team/team.entity';
import { In, Repository } from 'typeorm';
import { EnsalamentDetail } from '../dto/ensalament.dto';
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
          const team: CourseToSave = this.courses.map(
            ({ teams, ...course }) => {
              if (teams.some(t => t.id === ensalamentRoomTeam.teamId)) {
                return {
                  ...course,
                  team: teams.find(
                    team => team.id === ensalamentRoomTeam.teamId,
                  ),
                };
              }
            },
          )[0];

          this.setEnsalamentData(team, room);
        });
      });
    });
  }

  setEnsalamentData(course: CourseToSave, room: RoomEntity): void {
    if (this.ensalaments.length === 0) {
      const newData = {
        ...course,
        teams: [{ ...course.team, room, week: 0, shift: 0 }],
      };

      delete newData.team;
      this.ensalaments.push(newData);
    } else if (this.ensalaments.filter(d => d.id === course.id)) {
      this.ensalaments = this.ensalaments.map(e => {
        if (e.id === course.id) {
          return {
            ...e,
            teams: [...e.teams, { ...course.team, room }],
          };
        }
        return e;
      }) as any;
    } else {
      const newData = {
        ...course,
        teams: [{ ...course.team, room }],
      } as any;

      delete newData.team;
      this.ensalaments.push(newData);
    }
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
}

class CourseToSave {
  team: TeamEntity;
  id: string;
  name: string;
  active: boolean;
  createdAt: Date;
  updateAt: Date;
}

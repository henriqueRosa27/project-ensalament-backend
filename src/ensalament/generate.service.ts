import { RoomEntity } from 'src/room/room.entity';
import { TeamEntity } from 'src/team/team.entity';
import { GenerateEnsalament } from './dto/ensalament.dto';

export class GenerateEnsalamentService {
  constructor(rooms: RoomEntity[], teams: TeamEntity[]) {
    this.rooms = rooms;
    this.teams = teams;
    this.ensalament = new GenerateEnsalament();

    this.formatDataToEnsalament();
  }

  ensalament: GenerateEnsalament;
  rooms: RoomEntity[];
  teams: TeamEntity[];

  generate() {
    this.excludeMaxCapacity();

    if (this.checkToCallFunctions()) this.setPreferencials();

    if (this.checkToCallFunctions()) this.setDatas();

    this.ensalament.notEnsalate = [
      ...this.ensalament.notEnsalate,
      ...this.teams,
    ];

    return this.ensalament;
  }

  checkToCallFunctions(): boolean {
    return this.rooms.length > 0 && this.teams.length > 0;
  }

  excludeMaxCapacity() {
    for (const team of this.teams) {
      if (this.rooms.every(room => room.capacity < team.numberStudents)) {
        this.setTeamOnNoEnsalate(team);
      }
    }
  }

  setPreferencials() {
    let preferencialsRooms = this.rooms
      .filter(room => room.isLab)
      .sort((a, b) => this.compare(a, b, 'capacity'));
    const preferencialsTeams = this.teams
      .filter(team => team.prefLab)
      .sort((a, b) => this.compare(a, b, 'numberStudents'));

    for (const team of preferencialsTeams) {
      if (!!preferencialsRooms) break;
      const roomMaxCapacity = preferencialsRooms.reduce((prev, current) => {
        {
          return prev.capacity > current.capacity ? prev : current;
        }
      });

      if (team.numberStudents <= roomMaxCapacity.capacity) {
        this.setTeamOnRoom(roomMaxCapacity, team);
        preferencialsRooms = preferencialsRooms.filter(
          rooms => rooms.id !== roomMaxCapacity.id,
        );
      }
    }
  }

  setDatas() {
    for (const team of this.teams) {
      const roomMaxCapacity = this.rooms.reduce((prev, current) => {
        {
          return prev.capacity > current.capacity ? prev : current;
        }
      });

      if (team.numberStudents <= roomMaxCapacity.capacity) {
        this.setTeamOnRoom(roomMaxCapacity, team);
      } else {
        this.setTeamOnNoEnsalate(team);
      }
    }
  }

  compare<T>(a: T, b: T, property: string) {
    if (a[property] > b[property]) {
      return -1;
    }
    if (a[property] < b[property]) {
      return 1;
    }
    return 0;
  }

  setTeamOnRoom(room: RoomEntity, team: TeamEntity) {
    this.ensalament.data.forEach(data => {
      if (room.building.id === data.id) {
        const { building, ...rest } = { ...room };
        data.rooms.forEach(r => {
          if (r.id === room.id) {
            console.log(team);
            r.team = team;
          }
        });
        this.excludeRoom(rest.id);
        this.excludeTeam(team.id);
      }
    });
  }

  setTeamOnNoEnsalate(team: TeamEntity) {
    this.ensalament.notEnsalate.push(team);

    this.excludeTeam(team.id);
  }

  formatDataToEnsalament() {
    this.rooms
      .map(({ building }) => building)
      .forEach(building => {
        if (!this.ensalament.data.some(data => data.id === building.id)) {
          const rooms = this.formatToSetRoom(
            this.rooms.filter(r => r.building.id === building.id),
          );
          this.ensalament.data.push({ ...building, rooms: rooms });
        }
      });
  }

  excludeRoom(id: string) {
    this.rooms = this.rooms.filter(r => r.id !== id);
  }
  excludeTeam(id: string) {
    this.teams = this.teams.filter(t => t.id !== id);
  }

  formatToSetRoom(rooms: RoomEntity[]) {
    const newRooms = rooms.map(({ building, ...rest }) => ({
      ...rest,
      team: null,
    }));
    return newRooms;
  }
}

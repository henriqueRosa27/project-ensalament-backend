export class RequestGenerateEnsalament {
  roomsIds: string[];

  teamsIds: string[];
}

export class GenerateEnsalament {
  constructor() {
    this.data = new Array<Building>();
    this.notEnsalate = new Array<Team>();
  }

  data: Building[];

  notEnsalate: Team[];
}

class Room {
  id: string;

  name: string;

  capacity: number;

  isLab: boolean;

  team: Team;
}

class Building {
  constructor() {
    this.rooms = Array<Room>();
  }

  id: string;

  name: string;

  rooms: Room[];
}

class Team {
  id: string;

  name: string;

  prefLab: boolean;

  numberStudents: number;
}

export class Ensalament {
  constructor() {
    this.buildings = new Array<BuildingEnsalament>();
  }
  id: string;

  week: number;

  shift: number;

  buildings: BuildingEnsalament[];
}

class BuildingEnsalament {
  constructor() {
    this.rooms = Array<RoomEnsalement>();
  }

  id: string;

  name: string;

  rooms: RoomEnsalement[];
}

class RoomEnsalement {
  id: string;

  name: string;

  capacity: number;

  isLab: boolean;

  team: Team[];
}

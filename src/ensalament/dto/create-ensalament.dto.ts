export class CreateEnsalamentDTO {
  week: number;

  shift: number;

  rooms: Room[];
}

class Room {
  id: string;

  teams: string[];
}

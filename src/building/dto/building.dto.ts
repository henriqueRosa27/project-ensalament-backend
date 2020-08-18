import { RoomDTO } from "src/room/dto/room.dto";

export class BuildingDTO {
  id: number;

  name: string;

  active: boolean;

  rooms: RoomDTO[]
}

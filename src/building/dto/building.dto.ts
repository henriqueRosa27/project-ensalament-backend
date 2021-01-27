import { RoomDTO } from "src/room/dto/room.dto";

export class BuildingDTO {
  id: string;

  name: string;

  active: boolean;

  rooms: RoomDTO[]
}

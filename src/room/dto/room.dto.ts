import { BuildingDTO } from "src/building/dto/building.dto";

export class RoomDTO {
    id: number;
  
    name: string;
  
    active: boolean;

    building: BuildingDTO;
  }
  
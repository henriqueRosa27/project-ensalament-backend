import { BuildingDTO } from "src/building/dto/building.dto";

export class RoomDTO {
    id: string;
  
    name: string;
  
    active: boolean;

    capacity: boolean;
    
    building: BuildingDTO;
  }
  
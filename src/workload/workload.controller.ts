import { Controller, SetMetadata, UseGuards, Get } from '@nestjs/common';
import { WorkloadService } from './workload.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { WorkloadDTO } from './dto/workload.dto';

@Controller('workload')
export class WorkloadController {
  constructor(private readonly service: WorkloadService) {}

  @SetMetadata('roles', ['admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getAll(): Promise<WorkloadDTO[]> {
    return this.service.getAll();
  }
}

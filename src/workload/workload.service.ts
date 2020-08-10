import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { WorkloadEntity } from './workload.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { WorkloadDTO } from './dto/workload.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class WorkloadService {
  constructor(
    @InjectRepository(WorkloadEntity)
    private readonly rep: Repository<WorkloadEntity>,
  ) {}

  async getAll(): Promise<WorkloadDTO[]> {
    const workloads = await this.rep.find();
    return plainToClass(WorkloadDTO, workloads);
  }

//   async findById(id: number): Promise<WorkloadDTO> {
//     const workload = await this.rep.findOne({ where: { id, active: true } });

//     if (!workload)
//       throw new HttpException(
//         { error: 'Carga Horária não existe' },
//         HttpStatus.NOT_FOUND,
//       );
//     return plainToClass(WorkloadDTO, workload);
//   }

//   async findByIdActive(id: number): Promise<WorkloadDTO> {
//     const qb = await getRepository(WorkloadEntity);

//     const workload = await qb.findOne({ where: { id, active: true } });

//     return plainToClass(WorkloadDTO, workload);
//   }

//   async create(dto: WorkloadDTO): Promise<WorkloadDTO> {
//     const workload = new WorkloadEntity();

//     workload.value = dto.value;
//     workload.active = true;

//     const entity = await this.rep.save(workload);

//     return plainToClass(WorkloadDTO, entity);
//   }

//   async update(dto: WorkloadDTO, id: number): Promise<WorkloadDTO> {
//     const workload = await plainToClass(
//       WorkloadEntity,
//       await this.findById(id),
//     );

//     workload.value = dto.value;

//     const entity = await this.rep.save(workload);

//     return plainToClass(WorkloadDTO, entity);
//   }

//   async delete(id: number): Promise<null> {
//     const workload = await plainToClass(
//       WorkloadEntity,
//       await this.findById(id),
//     );

//     workload.active = false;

//     await this.rep.save(workload);

//     return null;
//   }

//   async reactive(id: number): Promise<WorkloadDTO> {
//     const workload = await this.rep.findOne({ where: { id } });

//     if (!workload)
//       throw new HttpException(
//         { error: 'Carga Horária não existe' },
//         HttpStatus.NOT_FOUND,
//       );

//     workload.active = true;

//     await this.rep.save(workload);

//     return plainToClass(WorkloadDTO, workload);
//   }
}

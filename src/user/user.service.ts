import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository, getRepository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { UserDTO } from './dto/user.dto';
import { CreateUserDTO } from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly rep: Repository<UserEntity>,
  ) {}

  async get(): Promise<UserDTO[]> {
    return await this.rep.find();
  }

  async create(createDTO: CreateUserDTO): Promise<UserDTO> {
    delete createDTO.confirm_password;
    const entity = plainToClass(UserEntity, createDTO);
    const user = await this.rep.save(entity);
    delete user.password;
    return plainToClass(UserDTO, user);
  }

  async getUserByEmail(email: string): Promise<UserDTO> {
    const qb = await getRepository(UserEntity)
      .createQueryBuilder('user')
      .where('LOWER(user.email) = LOWER(:email)', { email });

    const user = await qb.getOne();

    return plainToClass(UserDTO, user);
  }
}

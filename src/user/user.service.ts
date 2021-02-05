import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository, getRepository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { UserDTO } from './dto/user.dto';
import { CreateUserDTO } from './dto/createUser.dto';
import * as argon2 from 'argon2';
import { RoleEntity } from 'src/auth/roles.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly rep: Repository<UserEntity>,
  ) {}

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
      .addSelect('role')
      .innerJoin(RoleEntity, 'role', 'role.id = user.role_id')
      .where('LOWER(user.email) = LOWER(:email)', { email });

    const user = await qb.getOne();

    return plainToClass(UserDTO, user);
  }

  async validateUser(email: string, password: string): Promise<UserDTO> {
    const user = await getRepository(UserEntity).findOne({
      where: { email },
      relations: ['role'],
    });

    if (!user || !(await argon2.verify(user.password, password))) {
      return null;
    }

    return plainToClass(UserDTO, user);
  }

  async findById(id: string): Promise<UserDTO> {
    const user = await this.rep.findOne({ where: { id }, relations: ['role'] });

    delete user.password;

    return plainToClass(UserDTO, user);
  }
}

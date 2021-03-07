import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create.user.dto';
import { UpdateUserDto } from './dtos/update.user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  getAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  createUser(createUser: CreateUserDto): Promise<UserEntity> {
    const newUser = this.userRepository.create(createUser);
    return this.userRepository.save(newUser);
  }

  updateUser(updateUser: UpdateUserDto) {
    return this.userRepository.update(updateUser.id, { ...updateUser.data });
  }
}

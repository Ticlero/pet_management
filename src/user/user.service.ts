import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create.user.dto';
import { EditUserInput } from './dtos/edit.user.dto';
import { LoginInputDto } from './dtos/login.user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async getAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async createUser({
    email,
    role,
    userPassword,
  }: CreateUserDto): Promise<{ ok: boolean; error?: string }> {
    try {
      const isExist = await this.userRepository.findOne({ email });
      if (isExist) {
        return {
          ok: false,
          error: 'Already Existed Email',
        };
      }
      const newUser = await this.userRepository.create({
        email,
        userPassword,
        role,
      });
      this.userRepository.save(newUser);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: "Couldn't create account",
      };
    }
  }

  async login({
    email,
    userPassword,
  }: LoginInputDto): Promise<{ ok: boolean; error?: string; token?: string }> {
    try {
      const check = await this.userRepository.findOne({ email });
      if (!check) {
        return {
          ok: false,
          error: 'Not Found Account',
        };
      }
      const correctPwd = await check.checkPassword(userPassword);
      if (!correctPwd) {
        return {
          ok: false,
          error: 'Worng Password',
        };
      }
      const token = this.jwtService.sign(check.id);
      return {
        ok: true,
        token,
      };
    } catch (e) {
      return {
        error: e,
        ok: false,
      };
    }
  }

  async findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ id });
  }

  async editProfile(
    userId: number,
    { email, userPassword, role }: EditUserInput,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ id: userId });
    if (email) {
      user.email = email;
    }
    if (userPassword) {
      user.userPassword = userPassword;
    }
    if (role) {
      user.role = role;
    }
    return this.userRepository.save(user);
  }
}

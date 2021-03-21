import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create.user.dto';
import { EditUserInput, EditUserOutput } from './dtos/edit.user.dto';
import { LoginInputDto } from './dtos/login.user.dto';
import { UserProfileOutput } from './dtos/profile.user.dto';
import {
  VerificationEmailInput,
  VerificationEmailOutput,
} from './dtos/verify-emai.dto';
import { UserEntity } from './entities/user.entity';
import { VerificationsEntity } from './entities/user.verification.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(VerificationsEntity)
    private verificationRepository: Repository<VerificationsEntity>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
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
      const user = await this.userRepository.save(
        this.userRepository.create({
          email,
          userPassword,
          role,
        }),
      );
      const verification = await this.verificationRepository.save(
        this.verificationRepository.create({ user }),
      );
      this.mailService.sendVerificationEmail(email, verification.code);
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
      const check = await this.userRepository.findOne(
        { email },
        { select: ['id', 'userPassword'] },
      );
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

  async findById(id: number): Promise<UserProfileOutput> {
    try {
      const user = await this.userRepository.findOne({ id });
      if (!user) {
        return {
          ok: false,
          error: 'Not Found User',
        };
      }
      return {
        ok: true,
        user,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: error,
      };
    }
  }

  async editProfile(
    userId: number,
    { email, userPassword, role }: EditUserInput,
  ): Promise<EditUserOutput> {
    try {
      const user = await this.userRepository.findOne({ id: userId });
      if (email) {
        const checkEmail = await this.userRepository.findOne({ email });
        if (checkEmail) {
          return {
            ok: false,
            error: 'Already Exist Email',
          };
        }
        user.email = email;
        user.verified = false;
        //this.verificationRepository.delete({ id: user.id });
        const verification = await this.verificationRepository.save(
          this.verificationRepository.create(user),
        );
        this.mailService.sendVerificationEmail(email, verification.code);
      }
      if (userPassword) {
        user.userPassword = userPassword;
      }
      if (role) {
        user.role = role;
      }
      await this.userRepository.save(user);
      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: e,
      };
    }
  }

  async verifyEmail({
    code,
  }: VerificationEmailInput): Promise<VerificationEmailOutput> {
    try {
      const verification = await this.verificationRepository.findOne(
        { code },
        { relations: ['user'] },
      );
      if (verification) {
        verification.user.verified = true;
        await this.userRepository.save(verification.user);
        await this.verificationRepository.delete(verification.id);
        return {
          ok: true,
        };
      }
      return {
        ok: false,
        error: 'Verification Faile',
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}

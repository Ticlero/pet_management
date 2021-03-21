import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { VerificationsEntity } from './entities/user.verification.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, VerificationsEntity])],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}

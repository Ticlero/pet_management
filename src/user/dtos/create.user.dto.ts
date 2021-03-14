import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { UserEntity } from '../entities/user.entity';

@InputType()
export class CreateUserDto extends PickType(
  UserEntity,
  ['email', 'userPassword', 'role'],
  InputType,
) {}

@ObjectType()
export class CreateUserOutputDto extends CoreOutput {}

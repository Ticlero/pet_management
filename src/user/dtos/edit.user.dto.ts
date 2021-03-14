import { InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { UserEntity } from '../entities/user.entity';

@InputType()
export class EditUserInput extends PartialType(
  PickType(UserEntity, ['email', 'userPassword', 'role'], InputType),
) {}

@ObjectType()
export class EditUserOutput extends CoreOutput {}

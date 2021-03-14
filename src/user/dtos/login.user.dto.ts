import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { string } from 'joi';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { UserEntity } from '../entities/user.entity';

@InputType()
export class LoginInputDto extends PickType(
  UserEntity,
  ['email', 'userPassword'],
  InputType,
) {}

@ObjectType()
export class LoginOutput extends CoreOutput {
  @Field((type) => String, { nullable: true })
  token?: string;
}

import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { UserEntity } from '../entities/user.entity';

@ArgsType()
export class UserProfileInput {
  @Field((type) => Number)
  id: number;
}

@ObjectType()
export class UserProfileOutput extends CoreOutput {
  @Field((type) => UserEntity, { nullable: true })
  user?: UserEntity;
}

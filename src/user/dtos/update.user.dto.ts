import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateUserDto } from './create.user.dto';

@InputType()
class UpdateChangeData extends PartialType(CreateUserDto) {}

@InputType()
export class UpdateUserDto {
  @Field((type) => Number)
  id: number;

  @Field((type) => UpdateChangeData)
  data: UpdateChangeData;
}

import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateDogDto } from './create.dog';

@InputType()
class UpdateChangeDog extends PartialType(CreateDogDto) {}

@InputType()
export class UpdateDogDto {
  @Field((type) => Number)
  id: number;

  @Field((type) => UpdateChangeDog)
  data: UpdateChangeDog;
}

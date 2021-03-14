import { InputType, OmitType, PartialType, PickType } from '@nestjs/graphql';
import { DogEntity } from '../entities/dog.entity';

// @InputType()
// export class CreateDogDto extends PartialType(DogEntity, InputType) {}

@InputType()
export class CreateDogDto extends PickType(
  DogEntity,
  ['dog_name', 'dog_age', 'breed', 'owner'],
  InputType,
) {}

import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { DogEntity } from '../entities/dog.entity';

// @InputType()
// export class CreateDogDto extends PartialType(DogEntity, InputType) {}

@InputType()
export class CreateDogDto extends OmitType(
  DogEntity,
  ['id', 'created'],
  InputType,
) {}
